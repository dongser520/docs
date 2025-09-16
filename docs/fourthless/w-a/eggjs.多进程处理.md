---
navbar: true
sidebar: auto
title: eggjs多进程处理
---

我们知道 JavaScript 代码是运行在单线程上的，换句话说，一个 Node.js 进程只能运行在一个 CPU 上。那么如果用 Node.js 来做 Web Server，就无法享受到多核运算的好处。因此我们考虑使用多进程。<br/>

具体查看官方文档说明： <https://eggjs.org/zh-CN/core/cluster-and-ipc> <br/>


## 一、定义多进程存储方式
在配置文件 `config/config.default.js` 中定义多进程存储方式
```js
  ...
  // 客户端用户注册登录校验签名的盐值，用户登录模块
  ...
  // 多进程处理 -- 针对websocket服务 -- 进程间通信 -- 对进程的存储方式设计
  // 用户上线 - 多进程处理
  // 具体查看根目录 `app/extend/context.js`文件中的`online`方法
  // 是否将信息存储在一个 Redis 哈希（Hash）结构中 --- 可自定义
  // 例如：你可以定义一个Redis 哈希（Hash）结构中，键为 chat_user_online
  // let Hash_key = 'chat_user_online'; // 自定义 -- 少量用户可以这么做，方便统计管理在线用户
  // 此处有个重要说明是作为架构师的基础素养：
  // 1. 如果在线用户超过1000万（根据存储容量），或者10M，10M 个字段的 Hash 很容易撑爆单个节点的内存
  // 2. 对这个 Hash 执行 HGETALL、HSCAN 等操作（例如，如果你想统计在线人数）会极度缓慢，并可能阻塞 Redis，导致其他命令超时
  // 3. 这个巨大的 Key 会成为集群环境下无法分割的热点 Key
  // 4. 扩展性极差
  // 5. 效率并非最优:
  // 5.1 - 你的操作主要是单个用户的读写（HSET online_1234 pid / HGET online_1234）。
  //       使用 Hash 结构为这种操作增加了不必要的开销，直接使用 String 键（SET online_1234 pid）效率更高
  // 5.2 - 推荐方案：使用 String 类型 + 分布式架构
  //       对于海量用户在线状态存储，最经典和高效的方案是使用 String 类型，并为每个用户分配一个独立的 Key。
  //       也就是简单存储，不要用Hash_key，简单存储的key是类似：'online_' + 用户id，这个值在redis客户端打开Keys就能看到

  //配置多进程存储方式hash_key
  // config.Hash_key = 'chat_user_online'; // 自定义 -- 少量用户可以这么做，方便统计管理在线用户
  config.Hash_key = null; // 考虑到将来的海量用户（百万用户以上），我们选择使用简单存储

  //配置session
  ...
```

## 二、多进程处理
由于多进程处理改动的源码地方较多，以下我给大家提供了完整的文件源码，每个文件会标明改动的地方 <br/>

### 1. 权限验证中间件 `app/middleware/chat_user_auth.js`
重点调整的地方是： `游客可访问的路由白名单`
```js
module.exports = (option, app) => {
    return async function chatUserAuth(ctx, next) {
        // 针对游客的操作
        //...
        
        // 即时通讯注册用户和游客的登录验证
        // 1. 获取header头的token
        const token = ctx.header.token || ctx.query.token || ctx.request.body.token;
        if (!token) {
            ctx.throw(400, '您没有权限访问即时通讯接口');
        }

        //2. 根据token解密，换取用户信息，失败则要么Token已过期或者不合法，抛出错误，终止程序
        let tokenUser = {};
        try {
            tokenUser = ctx.checkToken(token);
        } catch (error) {
            let fail = (error.name == 'TokenExpiredError') ? 'Token已过期！请重新获取令牌' : 'Token 令牌不合法！';
            ctx.throw(400, fail);
        }

        //3. 说明token解密正确，此时判断用户是否登录过
        // 根据当前解密的用户信息的id,去缓存拿一下该id的信息
        let t = await ctx.service.cache.get('chat_user_' + tokenUser.id);
        //console.log('打印t',tokenUser.id);
        if (!t || t != token) {
            // if (ctx.path !== '/ws'){
            //     ctx.throw(400, 'Token 令牌不合法！');
            // }else{
            //    // websocket链接在websocket中间件去处理
            //    console.log('websocket链接在websocket中间件去处理');
            // }
            ctx.throw(400, 'Token 令牌不合法！');
        }

        // 4. 说明当前用户之前登录过了，缓存里有他的数据，比如说已经登录过3天了
        // 但有一种情况，这三天内，他发了违规信息，已经被超级管理员禁用了或者被超级管理员把他从数据库删除了
        // 那么即使现在他传的token有效，也没有用，依旧不能让他操作
        let user = await app.model.User.findByPk(tokenUser.id);
        if (!user || user.status == 0) {
            ctx.throw(400, '当前用户不存在或者已被禁用');
        }

        // 新增：针对游客的操作
        //console.log('数据库的用户信息',JSON.parse(JSON.stringify(user)));
        //console.log('token的用户信息',JSON.parse(JSON.stringify(tokenUser)));
        if(tokenUser.role == 'visitor'){
            // 给游客开放一些接口
            // 根据接口设置：<https://docs.51yrc.com/fourthless/w-a/eggjs.即时通讯接口.html>
            // 获取接口地址做判断
            // ctx.throw(400, '您没有权限访问，请先注册或登录');  
            // 获取接口地址做判断
            const { path, method } = ctx;
            
            // 定义游客允许访问的接口白名单
            const visitorWhitelist = [
                { path: '/api/chat/socket/sendmessage', method: 'POST' },    // 给服务器发消息（单聊）
                { path: '/api/chat/chatGetmessageOffLine', method: 'POST' },    // 获取离线消息
                { path: '/api/chat/grouplist', method: 'GET' },    // 我的群聊列表
                { path: '/api/chat/groupinfo', method: 'GET' },    // 获取群资料信息
                { path: '/api/chat/groupnickname', method: 'POST' },    // 修改我在群里面的昵称
                { path: '/api/chat/groupDeleteOrQuit', method: 'POST' },    // 退出群
                { path: '/api/chat/groupQrcode', method: 'GET' },    // 生成获取群二维码
                { path: '/api/chat/uploadStreamSingleToServerDiy', method: 'POST' },    // uni-app项目上传文件[单文件]（图片视频等）到本地服务器（自定义文件路径）
                { path: '/api/chat/uploadAliyun', method: 'POST' },    // uni-app项目上传文件[单文件]（图片视频等）到阿里云存储OSS
                { path: '/api/chat/getVideoScreenshot', method: 'POST' },    //视频上传到服务器获取视频封面
                { path: '/api/chat/revokeMessage', method: 'POST' },    //撤回消息接口说明
                { path: '/api/chat/updateUserinfo', method: 'POST' },    //修改我的信息（修改我的头像昵称等信息）-游客根据情况有部分权限
                { path: '/api/chat/groupInviteUser', method: 'POST' },    //游客自己进群根据群设置来处理

            ];
            
            // 检查当前请求是否在白名单中
            const isAllowed = visitorWhitelist.some(item => 
                path.startsWith(item.path) && method === item.method
            );
            
            if (!isAllowed) {
                ctx.throw(400, '您没有权限访问，请先注册或登录');  
            }
        }

        // 5. 没什么问题了，把用户信息挂载到ctx上，方便调用
        ctx.chat_user = user;

        await next();
    }
}
```


### 2. websocket权限验证中间件 `app/middleware/chatwebsocket.js`
改动较大，核心放在:
> `4.检查是否已有同一用户的连接 - 防止异地登录同时在线` <br/>
```js
// 引入 uuid 库 `npm install uuid`
const { v4: uuidv4 } = require('uuid');

module.exports = () => {
    return async (ctx, next) => {
        console.log('WebSocket请求:', ctx.path, ctx.query);
        // 非websocket链接直接放行
        if (ctx.path !== '/ws') return next();
        // 处理websocket链接
        const token = ctx.query.token;
        if (!token) {
            ctx.websocket.send(JSON.stringify({
                msg: "fail",
                data: '缺少 token 参数'
            }));
            return ctx.websocket.close();
        }

        try {
            const user = ctx.checkToken(token);
            const userCheck = await ctx.app.model.User.findByPk(user.id);
            // 1. 判断用户是否存在
            if (!userCheck) {
                ctx.websocket.send(JSON.stringify({
                    msg: "fail",
                    data: '用户不存在'
                }));
                return ctx.websocket.close();
            }
            // 2. 判断用户是否被禁用
            if (!userCheck.status) {
                ctx.websocket.send(JSON.stringify({
                    msg: "fail",
                    data: '你已被管理员禁用'
                }));
                return ctx.websocket.close();
            }

            // 多进程
            // 3.存储连接
            ctx.app.ws.chatuser = ctx.app.ws.chatuser || {};
            // 4.检查是否已有同一用户的连接 - 防止异地登录同时在线
            if (ctx.app.ws.chatuser[user.id]) {
                // 给用户一个异地登录消息
                if(user.role == 'user'){
                    // 当前时间
                    const currentTime = ()=> {
                        const now = new Date();
                        const year = now.getFullYear();
                        const month = now.getMonth() + 1;
                        const date = now.getDate();
                        const hour = now.getHours();
                        const minute = now.getMinutes();
                        const second = now.getSeconds();
                        return `${year}年${month}月${date}日 ${hour}:${minute}:${second}`;
                    };
                    // 消息内容自定义
                    let data = `您的账号于 ${currentTime()} 尝试在其它设备上登录，如果不是您的操作，那么您的账号密码可能已泄露，请及时修改密码`;
                    // 定义一下通知消息 
                    const force_message = ctx.offlineMsg(user,user.id, {
                        from_avatar: `https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/kefu.png`,
                        from_name: `账号异常提示`,
                        // from_id: 0,
                        data: data,
                        showModel: {
                            showModelType: 'forceLogin',
                            content: data,
                        },
                    });
                    // 前端页面这个消息不要显示底部输入框
                    force_message.from_id = 0;
                    // 符合前端页面格式的消息推送 - 异地登录提示
                    ctx.app.ws.chatuser[user.id].send(JSON.stringify({
                        type: 'singleChat',
                        data: force_message,
                        timestamp: Date.now(),
                    }));
                }
            }
            // 5.存储新连接
            ctx.app.ws.chatuser[user.id] = ctx.websocket;
            ctx.websocket.chatuser_id = user.id;
  
            // 执行 `/app/extend/context.js`文件中的`online`方法
            // 6.用户上线 - 包含其它设备的下线通知(和4冲突，因此上线过程不在发消息通知)
            await ctx.online(userCheck, user.id, process.pid);   
            console.log(`用户 ${user.id} 连接成功-- 进程ID:${process.pid}--并上线`); 

            // 7.进入控制器
            await next();

        } catch (err) {
            console.error('WebSocket中间件错误:', err);
            const message = err.name === 'TokenExpiredError'
                ? 'token 已过期'
                : 'Token 不合法';

            ctx.websocket.send(JSON.stringify({
                msg: "fail",
                data: message
            }));
            ctx.websocket.close();
        }
    };
};
```


### 3. 扩展方法 `app/extend/context.js`
以下是完整的文件代码，重点说改动或者新增的几个地方：
> 1. 处理`单进程`和`多进程`发消息方法：`通用发送websocket消息方法:` `chatWebsocketSendOrSaveMessage`
> 2. 新增方法: `多进程处理 -  用户上线` `online`
> 3. 新增方法: `定义通知消息 -- 定义消息格式` `offlineMsg`
> 4. 新增方法: `多进程：根据进程存储方式获取用户之前的进程` `getOldProcessId`
> 5. 新增方法: `多进程：根据进程存储方式 - 移除redis中用户的上线记录` `removeOnlineProcessId`
> 6. 新增方法: `移除websocket用户记录` `UserWebsocketCloseAndDelete`

```js

/*
//通用文件上传到阿里云OSS方法--File模式
// 阿里云OSS SDK
const OSS = require('ali-oss');
// node系统模块
const path = require('path');
const fs = require('fs/promises');
const crypto = require('crypto');
*/

//通用文件上传到阿里云OSS方法--Stream 流模式
// 阿里云OSS SDK
const OSS = require('ali-oss');
// node系统模块
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
//使用 pump 确保流正确写入,必须写入临时文件后才能上传到 OSS
//内存管理优化,使用 pump 控制流式写入,每个文件单独处理，避免内存峰值,及时清理临时文件
const pump = require('mz-modules/pump');


// 引入二维码插件
var qr = require('qr-image');
// 引入uuid
const { v4: uuidv4 } = require('uuid');

module.exports = {
  // 分页
  async page(modelName, where = {}, options = {}) {
    let page = this.query.page ? parseInt(this.query.page) : 1;
    let limit = this.query.limit ? parseInt(this.query.limit) : 10;
    let offset = (page - 1) * limit;

    //options里面有limit，则以options.limit为准
    if (options.limit) {
      limit = parseInt(options.limit);
      offset = (page - 1) * limit;
    }

    //如果没有传排序规则，则默认给它id降序
    if (!options.order) {
      options.order = [
        ['id', 'desc']
      ]
    }

    let data = await this.app.model[modelName].findAndCountAll({
      limit: limit,
      offset: offset,
      where: where,
      ...options
    });

    //求得总分页数
    let totalPage = Math.ceil(data.count / limit);

    // 如果options有include关联查询，导致关联数据很多，分页错误，从新计算分页
    if (options && options.include) {
      let _data = await this.app.model[modelName].findAndCountAll({
        limit: limit,
        offset: offset,
        where: where,
        // ...options
      });
      totalPage = Math.ceil(_data.count / limit);
    }

    // -----------------------处理页面分页按钮网址上有其他参数的情况-----------------------------------
    //网址有其他参数，如：http://127.0.0.1:7001/admin/manager/index?page=1&limit=3&keyword=哈哈&cid=100
    // console.log(this.query);
    let query = { ...this.query };
    console.log(query);//{ page: '1', limit: '3', keyword: '哈哈', cid: '100' }
    if (query.hasOwnProperty('page')) {
      delete query.page;
    }
    if (query.hasOwnProperty('limit')) {
      delete query.limit;
    }
    console.log(query);//{ keyword: '哈哈', cid: '100' }
    // 对象转&拼接字符串
    //{ keyword: '哈哈', cid: '100'} 转成  &keyword=哈哈&cid=100
    const urlEncode = (param, key, encode) => {
      if (param == null) return '';
      var paramStr = '';
      var t = typeof (param);
      if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
      } else {
        for (var i in param) {
          var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
          paramStr += urlEncode(param[i], k, encode)
        }
      }
      return paramStr;
    }
    //调用urlEncode方法
    query = urlEncode(query);
    // console.log(query);//结果：&keyword=哈哈&cid=100 (转码后：&keyword=%E5%93%88%E5%93%88&cid=100)

    // -----------------------处理页面分页按钮网址上有其他参数的情况-----------------------------------



    //分页模版代码
    let pageEl = '';
    for (let i = 1; i <= totalPage; i++) {
      //判断当前页是否是active
      let active = '';
      if (i == page) {
        active = 'active';
      }
      pageEl += `<li class="page-item ${active}"><a class="page-link" href="?page=${i}&limit=${limit}${query}">${i}</a></li>`;
    }

    //如果当前就是第一页，就不存在上一页，禁用上一页按钮，下一页同理
    let prevDisabled = page <= 1 ? 'disabled' : '';
    let nextDisabled = page >= totalPage ? 'disabled' : '';

    //最后将所有模版代码组装一起
    let pageHtml = `
        <ul class="pagination">
          <li class="page-item ${prevDisabled}">
              <a class="page-link" href="?page=${page - 1}&limit=${limit}${query}" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                  <span class="sr-only">Previous</span>
              </a>
          </li>
          ${pageEl}
          <li class="page-item ${nextDisabled}">
              <a class="page-link" href="?page=${page + 1}&limit=${limit}${query}" aria-label="Next">
                  <span aria-hidden="true">»</span>
                  <span class="sr-only">Next</span>
              </a>
          </li>
        </ul>
    `;

    //如何将我们定义的这个pageHtml变量放在模版里面去？
    //egg.js框架给我们在context扩展里面提供了locals对象，可将变量挂载到这个对象里面，然后可在模版里面使用
    this.locals.pageHtml = pageHtml;


    return data.rows
  },

  // 前端数据模型 + 分页
  // 前端数据模型
  async apiModelData(modelName, where = {}, options = {}) {
    let page = this.query.page ? parseInt(this.query.page) : 1;
    let limit = this.query.limit ? parseInt(this.query.limit) : 10;
    let offset = (page - 1) * limit;

    //如果没有传排序规则，则默认给它id降序
    if (!options.order) {
      options.order = [
        ['id', 'desc']
      ]
    }

    let data = await this.app.model[modelName].findAndCountAll({
      limit: limit,
      offset: offset,
      where: where,
      ...options
    });

    //求得总分页数
    let totalPage = Math.ceil(data.count / limit);

    // -----------------------处理页面分页按钮网址上有其他参数的情况-----------------------------------
    //网址有其他参数，如：http://127.0.0.1:7001/admin/manager/index?page=1&limit=3&keyword=哈哈&cid=100
    // console.log(this.query);
    let query = { ...this.query };
    console.log(query);//{ page: '1', limit: '3', keyword: '哈哈', cid: '100' }
    if (query.hasOwnProperty('page')) {
      delete query.page;
    }
    if (query.hasOwnProperty('limit')) {
      delete query.limit;
    }
    console.log(query);//{ keyword: '哈哈', cid: '100' }
    // 对象转&拼接字符串
    //{ keyword: '哈哈', cid: '100'} 转成  &keyword=哈哈&cid=100
    const urlEncode = (param, key, encode) => {
      if (param == null) return '';
      var paramStr = '';
      var t = typeof (param);
      if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
      } else {
        for (var i in param) {
          var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
          paramStr += urlEncode(param[i], k, encode)
        }
      }
      return paramStr;
    }
    //调用urlEncode方法
    query = urlEncode(query);
    // console.log(query);//结果：&keyword=哈哈&cid=100 (转码后：&keyword=%E5%93%88%E5%93%88&cid=100)

    // -----------------------处理页面分页按钮网址上有其他参数的情况-----------------------------------

    return {
      page,
      limit,
      query,
      totalPage,
      data
    }


  },
  // 前端分页 -- 模版1分页样式
  async apiPage(modelName, where = {}, options = {}) {
    let modeldata = await this.apiModelData(modelName, where, options);
    console.log('modeldata的数据', modeldata);

    let page = modeldata.page;
    let limit = modeldata.limit;
    let query = modeldata.query;
    let totalPage = modeldata.totalPage;

    //分页模版代码
    let pageEl = '';
    for (let i = 1; i <= totalPage; i++) {
      //判断当前页是否是active
      let active = '';
      if (i == page) {
        active = 'active';
      }
      pageEl += `<li class="${active}"><a href="?page=${i}&limit=${limit}${query}">${i}</a></li>`;
    }

    //如果当前就是第一页，就不存在上一页，禁用上一页按钮，下一页同理
    let prevDisabled = (page <= 1) || (totalPage == 0) ? 'disabled' : '';
    let nextDisabled = (page >= totalPage) || (totalPage == 0) ? 'disabled' : '';
    let firstpage = (page == 1) || (totalPage == 0) ? 'disabled' : '';
    let lastpage = (page == totalPage) || (totalPage == 0) ? 'disabled' : '';

    //最后将所有模版代码组装一起
    let apipageHtml = `
    <style type="text/css">
    .pages li.disabled{
      background-color: #f5f5f5;
    }
    .pages li.disabled a{
      color:#aaaaaa;
    }
    .pages li.disabled{
      position:relative;
    }
    .pages li.disabled::before{
       content:'';
       display:'block';
       width:100%;
       height:100%;
       position:absolute;
       left:0;
       top:0;
    }
    </style>
    <div class="flex justify-center py-5 mt-5"
    style="flex:auto">
        <ul class="pages">
          <li class="${firstpage}"><a href="?page=1&limit=${limit}${query}">首页</a></li>
          <li class="${prevDisabled}">
              <a href="?page=${page - 1}&limit=${limit}${query}" >上一页</a>
          </li>
          ${pageEl}
          <li class="${nextDisabled}">
              <a href="?page=${page + 1}&limit=${limit}${query}">下一页</a>
          </li>
          <li class="${lastpage}"><a href="?page=${totalPage}&limit=${limit}${query}">尾页</a></li>
        </ul>
    </div>
    `;

    //如何将我们定义的这个apipageHtml变量放在模版里面去？
    //egg.js框架给我们在context扩展里面提供了locals对象，可将变量挂载到这个对象里面，然后可在模版里面使用
    this.locals.apipageHtml = apipageHtml;


    return modeldata.data;


  },
  //渲染公共模版
  async renderTemplate(params) {

    //获取cookie中的消息提示内容 toast
    let toast = this.cookies.get('toast', {
      encrypt: true //中文要加密
    });
    //合并参数到params里面
    params.toast = toast ? JSON.parse(toast) : null;
    await this.render('admin/common/template.html', params);
  },

  //渲染前端公共模版
  /**
   * 
   * @param {Object} params - 用于渲染模板的数据对象。应包含模板所需的所有键值对
   * @param {string} tplname - [tplname = 'api/template01/main_app.html'] -  模板文件的路径。默认为内置的基础API模板路径，可不填。
   * @returns {Promise<void>} - 返回一个Promise，表示渲染操作的完成状态。无具体返回值。
   * @throws {Error} - 如果模板加载或渲染过程中发生错误，可能会抛出异常。
   */
  async renderApi(params, tplname = 'api/template01/main_app.html') {
    await this.render(tplname, params);
  },

  //消息提示
  toast(msg, type = "danger") {
    this.cookies.set('toast', JSON.stringify({
      msg,
      type
    }), {
      maxAge: 1500, //1500毫秒之后失效
      encrypt: true //中文要加密
    });
  },

  //页面错误提示
  async pageFail(data = '', code = 404) {
    return await this.render('admin/common/404.html', {
      data,
      code
    });
  },
  //api接口形式成功提示
  apiSuccess(data, msg = 'ok', code = 200) {
    this.status = code;
    this.body = { msg, data };
  },
  //api接口形式失败提示
  apiFail(data, msg = 'fail', code = 400) {
    this.status = code;
    this.body = { msg, data };
  },

  //生成token
  getToken(value) {
    return this.app.jwt.sign(value, this.app.config.jwt.secret);
  },
  //验证token
  checkToken(token) {
    //return this.app.jwt.verify(token, this.app.config.jwt.secret);
    try {
      return this.app.jwt.verify(token, this.app.config.jwt.secret);
    } catch (e) {
      // 处理异常（如 token 过期/无效）
      console.error('Token 验证失败:', e.message);
      return null;
    }
  },

  /**
   * 通用数据转树形结构方法
   * @param {Array} data - 原始数据列表
   * @param {Object} options - 配置项
   * @param {string} [options.idKey='id'] - 节点唯一标识字段名
   * @param {string} [options.pidKey='pid'] - 父节点标识字段名
   * @param {string} [options.childrenKey='children'] - 子节点属性名
   * @param {number} [options.initialLevel=0] - 初始层级
   * @returns {Array} 树形结构数据
   */
  treeify(data, {
    idKey = 'id',
    pidKey = 'pid',
    childrenKey = 'children',
    initialLevel = 0
  } = {}) {
    const nodeMap = new Map(); // 节点映射表
    const roots = [];          // 根节点集合

    // 创建节点副本并初始化子节点
    data.forEach(item => {
      const node = {
        ...item,
        [childrenKey]: [],
        level: initialLevel // 初始化层级，后续会修正
      };
      nodeMap.set(node[idKey], node);
    });

    // 构建父子关系
    data.forEach(item => {
      const node = nodeMap.get(item[idKey]);
      const parent = nodeMap.get(item[pidKey]);

      if (parent) {
        parent[childrenKey].push(node);
      } else {
        roots.push(node);
      }
    });

    // 使用队列进行层级计算（BFS）
    const queue = [];
    roots.forEach(root => {
      root.level = initialLevel; // 设置根节点层级
      queue.push(root);
    });

    while (queue.length > 0) {
      const node = queue.shift();
      node[childrenKey].forEach(child => {
        child.level = node.level + 1; // 子节点层级 = 父节点层级 + 1
        queue.push(child);
      });
    }

    return roots;
  },

  // 通用文件上传到阿里云OSS方法--File模式
  /**
   * 通用文件上传到阿里云OSS方法--File模式
   * @param {string} fieldName - 上传文件的字段名
   * @param {number} imageClassId - 图片分类ID，默认为0
   * @param {string} prefix - 阿里云oss的Bucket中最外层文件夹名称，默认为'images'
   * @returns {Array} - 上传结果数组，每个元素对象包含上传文件的URL、路径、分类ID和创建时间
   */
  async uploadOSS_File(fieldName, imageClassId = 0, prefix = 'images') {
    const { app } = this;

    try {
      // 兼容 Egg 3.x 的文件结构
      if (!this.request.files || this.request.files.length === 0) {
        throw new Error('请选择要上传的文件');
      }

      // 筛选指定字段的文件
      const matchedFiles = this.request.files.filter(
        f => f.fieldname === fieldName
      );

      if (matchedFiles.length === 0) {
        throw new Error(`未找到 ${fieldName} 字段的上传文件`);
      }

      // 统一处理为数组
      const fileList = matchedFiles;

      // 创建 OSS 客户端
      const client = new OSS(app.config.oss.client);

      // 并行上传处理
      const results = await Promise.all(
        fileList.map(async file => {
          try {
            // 生成唯一文件名
            const timestamp = Date.now();
            const randomStr = crypto.randomBytes(6).toString('hex');
            const extname = path.extname(file.filename).toLowerCase();
            const filename = `${timestamp}_${randomStr}${extname}`;

            // 创建日期路径
            const now = new Date();
            const datePath = [
              now.getFullYear(),
              String(now.getMonth() + 1).padStart(2, '0'),
              String(now.getDate()).padStart(2, '0')
            ].join('');

            // 构造完整路径
            const ossPath = `${prefix}/${datePath}/${filename}`;

            // 读取文件内容
            const fileContent = await fs.readFile(file.filepath);

            // 上传到 OSS
            const ossRes = await client.put(ossPath, fileContent);

            return {
              url: ossRes.url,
              path: ossPath,
              image_class_id: Number(imageClassId),
              create_time: Math.floor(Date.now() / 1000)
            };
          } finally {
            // 清理临时文件
            await fs.unlink(file.filepath).catch(() => { });
          }
        })
      );

      return results;
    } catch (e) {
      // 全局异常清理
      if (this.request.files) {
        await this.cleanupRequestFiles();
      }
      throw e;
    }
  },

  // 通用文件上传到阿里云OSS方法--Stream 流模式
  /**
   * 通用文件上传到阿里云OSS方法--Stream 流模式
   * @param {string} fieldName - 上传文件的字段名
   * @param {number} imageClassId - 图片分类ID，默认为0
   * @param {string} prefix - 阿里云oss的Bucket中最外层文件夹名称，默认为'images'
   * @returns {Array} - 上传结果数组，每个元素对象包含上传文件的URL、路径、分类ID和创建时间
   */
  async uploadOSS_Stream(fieldName, imageClassId = 0, prefix = 'images') {
    const { app } = this;
    const client = new OSS(app.config.oss.client);
    const results = [];
    const tmpFiles = []; // 记录临时文件路径

    try {
      //通过 ctx.multipart() 创建迭代器,循环处理每个上传的文件流
      const multipart = this.multipart();
      let stream;

      // 流式迭代处理
      while ((stream = await multipart()) != null) {
        // 过滤非目标字段,精确过滤目标上传字段,支持与其他表单字段共存
        if (stream.fieldname !== fieldName) {
          continue;
        }

        // 生成唯一文件名
        const timestamp = Date.now();
        const randomStr = crypto.randomBytes(6).toString('hex');
        const extname = path.extname(stream.filename).toLowerCase();
        const filename = `${timestamp}_${randomStr}${extname}`;

        // 创建日期目录
        const now = new Date();
        const datePath = [
          now.getFullYear(),
          String(now.getMonth() + 1).padStart(2, '0'),
          String(now.getDate()).padStart(2, '0')
        ].join('');

        // 构造完整路径
        const ossPath = `${prefix}/${datePath}/${filename}`;

        // 创建临时文件路径
        const tmpFilePath = path.join(
          app.config.multipart.tmpdir,
          `${timestamp}_${randomStr}${extname}`
        );
        tmpFiles.push(tmpFilePath);

        // 写入临时文件,使用 pump 确保流正确写入,必须写入临时文件后才能上传到 OSS
        const writeStream = fs.createWriteStream(tmpFilePath);
        await pump(stream, writeStream);

        // 上传到OSS,直接从临时文件创建可读流上传,避免内存中缓存大文件
        const ossRes = await client.put(
          ossPath,
          fs.createReadStream(tmpFilePath)
        );

        results.push({
          url: ossRes.url,
          path: ossPath,
          image_class_id: Number(imageClassId),
          create_time: Math.floor(Date.now() / 1000)
        });
      }

      // 清理临时文件
      await Promise.all(
        tmpFiles.map(file => fs.promises.unlink(file))
      );

      return results;
    } catch (err) {
      // 异常时清理所有临时文件
      await Promise.all(
        tmpFiles.map(file =>
          fs.promises.unlink(file).catch(() => { })
        )
      );
      throw err;
    }
  },


  //通用网站后台栏目列表包分页和连表查询方法
  async datalistIndex(modelName, where = {}, options = {}) {
    //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
    let data = await this.page(modelName, where, options);
    // 转一下data处理
    let list = JSON.parse(JSON.stringify(data));
    // console.log('list', list);
    let rules = JSON.parse(JSON.stringify(data));
    // console.log('rules', rules);

    // 数据集组合分类树(一维数组) 带level
    let $rule = [];
    function list_to_tree($array, $field = 'pid', $pid = 0, $level = 0) {
      $array.forEach(($value, $index) => {
        // console.log($value);
        if ($value[$field] == $pid) {
          $value['level'] = $level;
          $rule.push($value);
          // unset($array[$key]);
          // console.log('看一下rule',$rule);
          // $array.splice($index, 1);
          list_to_tree($array, $field, $value['id'], $level + 1);
        }
      });
      return $rule;
    }

    return {
      totalCount: data.length,
      rules: list_to_tree(rules),
      list: list,
    }
  },



  // 针对即时通讯发送消息，用户不在线则将消息存储在消息队列，等用户上线再发
  /**
   * 通用发送websocket消息方法
   * @param {number} sendto_id - 要发送消息给谁的用户ID  - 必填
   * @param {Object} message - 消息内容 - 必填
   * @param {boolean} offlineSave - 对方不在线，是否保存到消息队列，等对方上线再发 - 默认：true
   * @param {boolean} saveLog_sendto_id - 是否把消息存储到对方的redis历史记录中 - 默认：true
   * @param {Object} options - 额外参数 - 可不填
   * @param {string} [options.offlineSaveKey = 'chat_getmessage_'] - 消息队列KEY值前缀- 默认：'chat_getmessage_'
   * @returns {void}  - 无返回值
   */
  async chatWebsocketSendOrSaveMessage(sendto_id, message, 
    offlineSave = true, saveLog_sendto_id = true, 
    options = {
      offlineSaveKey: 'chat_getmessage_', // 消息队列KEY值前缀
    }) {
    // 1. 注意此处的this指的是ctx
    const { app, service } = this;
    // 2. 我的信息
    const me = this.chat_user;
    const me_id = me.id;
    // 多进程处理
    // 3. 拿到要发消息的用户的进程
    let pid = await this.getOldProcessId(sendto_id);
    console.log(`多进程即时通讯发送消息处理，此时拿到用户（对方）id为：${sendto_id} 所在子进程`, pid);
    // 4. 看进程是否存在
    if (!pid) {
        // 不在线是否保存到消息队列，上线再发
        if(offlineSave){
            // 5. 进程不存在即当前用户没有登录，则将消息存储在消息队列，等用户上线再发
            // 放到reids，设置消息列表中， 等待对方上线时，再发送
            // this.service.cache.setList('chat_getmessage_' + sendto_id, message);
            this.service.cache.setList(options.offlineSaveKey + sendto_id, message);
        }
    }else{
         // 6. 进程存在即对方在线，消息推送
         // 跟单进程有些区别，需要指定子进程 - 
         // 在根目录 app.js中方法didReady() 进行监听进程再发消息
         app.messenger.sendTo(pid, 'send', {
            sendto_id,
            message
         });
         // 存储到对方redis历史记录中
         if(saveLog_sendto_id){
            // key: `chatlog_对方id_[single|group]_我的id`
            this.service.cache.setList(`chatlog_${sendto_id}_${message.chatType}_${me.id}`, message);
         }
         
    }

    /*
    // 单进程消息处理
    // 拿到对方的socket
    let you_socket = this.app.ws.chatuser[sendto_id];
    // 如果拿不到对方的socket， 则把消息放在redis队列中， 等待对方上线时，再发送
    if (!you_socket) {
      // 放到reids，设置消息列表中：key值是：'chat_getmessage_' + sendto_id（用户id）
      this.service.cache.setList('chat_getmessage_' + sendto_id, message);
    } else {
      // 如果对方在线，则直接推送给对方
      you_socket.send(JSON.stringify({
        type: 'singleChat',
        data: message,
        timestamp: Date.now(),
      }));
      // 存储到对方redis历史记录中
      // key: `chatlog_对方id_[single|group]_我的id`
      this.service.cache.setList(`chatlog_${sendto_id}_${message.chatType}_${me.id}`, message);
    }
    */
  },


  // 生成二维码
  createQrcode(url) {
    var img = qr.image(url, { size: 10 });
    // 类型：image/png | svg
    this.response.type = 'image/png';
    // img.pipe(this.response); 
    this.body = img;
  },


  // 针对uni-app项目上传文件到阿里云存储单文件处理
  // 针对uni-app项目通用单文件处理文件上传到阿里云OSS方法--Stream 流模式--单文件--写入本地临时文件--在上传
  /**
   * 通用文件上传到阿里云OSS方法--Stream 流模式
   * @param {string} fieldName - 上传文件的字段名
   * @param {number} imageClassId - 图片分类ID，默认为0
   * @param {string} prefix - 阿里云oss的Bucket中最外层文件夹名称，默认为'images'
   * @returns {Array} - 上传结果数组，每个元素对象包含上传文件的URL、路径、分类ID和创建时间
   */
  async uploadOSS_Stream_uniapp_singleFile_temp(fieldName, imageClassId = 0, prefix = 'images') {
    const { app } = this;
    const client = new OSS(app.config.oss.client);
    const results = [];

    try {
      // 获取文件流
      const stream = await this.getFileStream();

      // 检查是否是目标字段
      if (stream.fieldname !== fieldName) {
        throw new Error(`Expected field '${fieldName}', but got '${stream.fieldname}'`);
      }

      // 生成唯一文件名
      const timestamp = Date.now();
      const randomStr = crypto.randomBytes(6).toString('hex');
      const extname = path.extname(stream.filename).toLowerCase();
      const filename = `${timestamp}_${randomStr}${extname}`;

      // 创建日期目录
      const now = new Date();
      const datePath = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0')
      ].join('');

      // 构造完整路径
      const ossPath = `${prefix}/${datePath}/${filename}`;

      // 创建临时文件路径
      const tmpFilePath = path.join(
        app.config.multipart.tmpdir,
        `${timestamp}_${randomStr}${extname}`
      );

      // 写入临时文件
      const writeStream = fs.createWriteStream(tmpFilePath);
      await pump(stream, writeStream);

      // 上传到OSS
      const ossRes = await client.put(
        ossPath,
        fs.createReadStream(tmpFilePath)
      );

      // 清理临时文件
      await fs.promises.unlink(tmpFilePath).catch(() => { });

      results.push({
        url: ossRes.url,
        path: ossPath,
        image_class_id: Number(imageClassId),
        create_time: Math.floor(Date.now() / 1000)
      });

      return results;
    } catch (err) {
      // 异常时清理临时文件
      if (tmpFilePath) {
        await fs.promises.unlink(tmpFilePath).catch(() => { });
      }
      throw err;
    }
  },

  // 针对uni-app项目单文件处理通用文件上传到阿里云OSS方法--Stream 流模式--单文件--不写入本地临时文件--直接流上传
  /**
   * 通用文件上传到阿里云OSS方法--Stream 流模式
   * @param {string} fieldName - 上传文件的字段名
   * @param {number} imageClassId - 图片分类ID，默认为0
   * @param {string} prefix - 阿里云oss的Bucket中最外层文件夹名称，默认为'images'
   * @returns {Array} - 上传结果数组，每个元素对象包含上传文件的URL、路径、分类ID和创建时间
   */
  async uploadOSS_Stream_uniapp_singleFile(fieldName, imageClassId = 0, prefix = 'images') {
    const { app } = this;
    const client = new OSS(app.config.oss.client);
    const results = [];

    try {
      // 获取文件流
      const stream = await this.getFileStream();

      // 检查是否是目标字段
      if (stream.fieldname !== fieldName) {
        throw new Error(`Expected field '${fieldName}', but got '${stream.fieldname}'`);
      }

      // 生成唯一文件名
      const timestamp = Date.now();
      const randomStr = crypto.randomBytes(6).toString('hex');
      const extname = path.extname(stream.filename).toLowerCase();
      const filename = `${timestamp}_${randomStr}${extname}`;

      // 创建日期目录
      const now = new Date();
      const datePath = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0')
      ].join('');

      // 构造完整路径
      const ossPath = `${prefix}/${datePath}/${filename}`;

      // 直接使用putStream方法上传流
      const ossRes = await client.putStream(ossPath, stream);

      results.push({
        url: ossRes.url,
        path: ossPath,
        image_class_id: Number(imageClassId),
        create_time: Math.floor(Date.now() / 1000)
      });

      return results;
    } catch (err) {
      throw err;
    }
  },


  // 多进程处理 -  用户上线
  // 原理是：记录上线用户在哪个进程中，利用redis存储用户id和进程id
  // 传用户id及进程id
  async online(chatuser, chatuser_id, processId) {
    // 1.解构
    const { app, service } = this;
    // 处理多进程
    // 2.当前进程id, 没传则直接拿 process.pid
    processId = processId || process.pid;
    // 3.根据进程存储方式获取用户之前的进程
    let onlineProcessId = await this.getOldProcessId(chatuser_id);
    // 4. 如果用户已在其他设备登录，处理下线逻辑
    if (onlineProcessId) {
      console.log('之前登录的设备进程', onlineProcessId);
      console.log('当前登录的设备进程', processId);
      console.log('用户角色', chatuser.role);
      // 检查是否是同一进程
      if (onlineProcessId == processId) {
        // 同一进程内的设备下线处理
        console.log('同一进程内设备下线处理');
        /*
        // 定义一下通知消息 - 执行 `app/extend/context.js`中的方法 offlineMsg
        const force_message = this.offlineMsg(chatuser,chatuser_id, {});
        // 发送下线通知给旧设备
        if (app.ws.chatuser && app.ws.chatuser[chatuser_id]) {
            // 仅发给role = 'user'的用户，游客不需要
            if(chatuser.role = 'user'){
              console.log('websockt异地登录仅发给role = user的用户，游客不需要');
              app.ws.chatuser[chatuser_id].send(JSON.stringify({
                  type: 'singleChat',
                  data: force_message,
                  timestamp: Date.now(),
              }));
            }
            
            // 关闭旧连接
            app.ws.chatuser[chatuser_id].close();
            delete app.ws.chatuser[chatuser_id];
        }*/
        
        /*
        // 查找同一用户的其他连接
        // 获取当前进程中的所有连接
        const connections = app.ws.chatuser || {};
        for (const [userId, socket] of Object.entries(connections)) {
          console.log(`遍历同一个进程${processId}的所有链接：用户id：${userId} 链接：${socket}`);
          console.log(`遍历同一个进程${processId}的所有链接：socket链接id：${socket.id}`);
          if (parseInt(userId) === chatuser_id && socket !== this.websocket) {
            // 定义通知消息
            const force_message = this.offlineMsg(chatuser, chatuser_id, {});
            
            // 发送下线通知给旧设备
            if (chatuser.role === 'user') {
              console.log('websockt异地登录仅发给role = user的用户，游客不需要');
              socket.send(JSON.stringify({
                type: 'singleChat',
                data: force_message,
                timestamp: Date.now(),
              }));
              
              // 关闭旧连接
              socket.close();
              delete app.ws.chatuser[userId];
            }
          }
        }
        
        */
      }else {
        // 不同进程，发送IPC消息
        // 此时用到进程间的通讯：具体看文档<https://eggjs.org/zh-CN/core/cluster-and-ipc>
        // 用到：app.messenger.sendTo(pid, action, data): 向指定进程发送消息
        // 在根目录app.js文件didReady()方法中监听
        // 仅发给role == 'user'的用户，游客不需要
        /*
        if(chatuser.role === 'user'){
          console.log('发送IPC消息异地登录仅发给role = user的用户，游客不需要');
          app.messenger.sendTo(parseInt(onlineProcessId), 'offline', {
              chatuser_id,
              chatuser,
              Hash_key
          });
        }
        */
      }

    }
    // 5.获取多进程存储方式 - 从配置文件`config/config.default.js`中获取
    let Hash_key = this.app.config.Hash_key;
    // 6.根据多进程存储方式 - 更新用户在线状态为当前设备
    if (Hash_key) {
        // 将用户在线状态存储到 chat_user_online 哈希中
        // 字段名为 online_用户ID，值为进程ID
        await app.redis.hset(Hash_key, 'online_' + chatuser_id, processId);
        console.log('有Hash_key的存储方式，用户上线成功,上线新进程', chatuser_id, processId);
        // 设置过期时间，防止僵尸状态（例如连接异常断开未清理）
        await app.redis.expire(Hash_key, 86400); // 24小时
    } else {
        // 利用redis存储用户id和进程id - 即存储上线状态
        // 利用redis存储,调用service服务cache.js文件中的set方法
        // await service.cache.set('online_' + chatuser_id, processId);
        await app.redis.set('online_' + chatuser_id, processId);
        console.log('没有Hash_key的存储方式，用户上线成功,上线新进程', chatuser_id, processId);
        // 设置过期时间,防止僵尸状态（例如连接异常断开未清理）
        // 使用app.redis来设置过期时间
        await app.redis.expire('online_' + chatuser_id, 86400);// 24小时
    }
    
  },

  // 定义在其它设备登录的消息格式
  offlineMsg(chatuser,chatuser_id, args = {}){
    // 定义通知消息 -- 定义消息格式
    // from_id 初始化自定义
    let _from_id = `redirect-forceLogout-${chatuser.id}`;
    let force_message = { 
        id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
        from_avatar: args.from_avatar || 'https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/kefu.png', // 发送者头像
        from_name: args.from_name || '账号异地登录', // 发送者名称
        from_id: args.from_id || _from_id, // 发送者id 系统id或者类型
        to_id: chatuser_id, // id
        to_name: chatuser.nickname || chatuser.username, // 名称
        to_avatar: chatuser.avatar, // 头像
        chatType: 'single', // 聊天类型 
        type: 'text', // 消息类型 系统通知消息
        data: {
            data: args.data || `你的账号在其他设备登录了，您当前设备会下线` ,
            dataType: false, 
            otherData: null,
        }, // 消息内容
        // 新增处理链接
        // redirect: {
        //     url:'/pages/xx/xx', // 处理链接地址
        //     type: 'navigateTo', // 处理链接类型
        // }, // 处理链接
        redirect: args.redirect || null, // 处理链接
        options: {}, // 其它参数
        create_time: (new Date()).getTime(), // 创建时间
        isremove: 0, // 0未撤回 1已撤回
        // 群相关信息
        group: {}, 
        // 新增一个消息id的key
        msgidKey: _from_id, // 消息id(便于前端在消息页查找记录)
    };
    return force_message;
  },

  // 多进程：根据进程存储方式获取用户之前的进程
  async getOldProcessId(chatuser_id){
    // 1.解构
    const { app, service } = this;
    // 2.获取多进程存储方式 - 从配置文件`config/config.default.js`中获取
    let Hash_key = this.app.config.Hash_key;
    // console.log('多进程存储方式Hash_key是否有值, null为简单存储', Hash_key);
    // 3. 定义进程
    let onlineProcessId;
    // 4. 根据存储方式Hash_key获取设备进程
    if(Hash_key){
        // console.log('有Hash_key的存储方式',Hash_key);
        // 检查用户是否已在其他进程上线
        /*
        // 使用Redis事务确保原子操作
        const multi = app.redis.multi();
        multi.hget(Hash_key, 'online_' + chatuser_id);
        const [result] = await multi.exec();
        onlineProcessId = result;
        */
        onlineProcessId = await app.redis.hget(Hash_key, 'online_' + chatuser_id);
        
    }else{
        // console.log('简单存储null的方式');
        // 如果用户之前登录过，存在某个进程中，现在新设备登录
        // 下线其他设备 - 先找到用户在哪个进程
        // onlineProcessId = await service.cache.get('online_' + chatuser_id);
        onlineProcessId = await app.redis.get('online_' + chatuser_id); 
    } 
    console.log(`多进程处理：根据进程存储方式Hash_key获取用户之前的进程`, onlineProcessId);
    return onlineProcessId;
  },

  // 多进程：根据进程存储方式 - 移除redis中用户的上线记录
  async removeOnlineProcessId(chatuser_id){
    // 1.解构
    const { app, service } = this;
    // 2.获取多进程存储方式 - 从配置文件`config/config.default.js`中获取
    let Hash_key = this.app.config.Hash_key;
    // 3.根据是否使用Hash_key来处理
    if (Hash_key) {
      // 有Hash_key的处理方式
      // console.log(`有Hash_key的处理方式`);
      // 下线这个进程中的用户
      await app.redis.hdel(Hash_key, 'online_' + chatuser_id);
    } else {
      // 没有Hash_key的处理方式
      // console.log(`没有Hash_key的处理方式`);
      await app.redis.del('online_' + chatuser_id);
      // 移除redis记录 -- 上线记录
      // await service.cache.remove('online_' + user_id).catch(console.error);
    }
  },
  
  // 移除websocket用户记录
  async UserWebsocketCloseAndDelete(){
    // 1.解构
    const { app, service } = this;
    // 2. 有没有websocket用户记录 - this代表ctx
    const chatuser_id = this.websocket.chatuser_id;
    if (!chatuser_id) return;
    // 3. 拿到websocket用户链接记录
    let websocket_user_connect = this.app.ws.chatuser && this.app.ws.chatuser[chatuser_id];
    console.log(`移除websocket用户 ${chatuser_id} 记录, 此时链接信息是：${websocket_user_connect}`);
    // 4. 移除websocket用户链接记录
    if (websocket_user_connect) {
        // 关闭连接
        websocket_user_connect.close();
        // 删除链接信息
        delete websocket_user_connect;
    }
  }

  
}
```


### 4. 新增对多进程的处理，在根目录新增 `app.js` 文件
此文件主要是对多进程的处理，具体可查看文档 <https://eggjs.org/zh-CN/core/cluster-and-ipc#%E8%BF%9B%E7%A8%8B%E9%97%B4%E9%80%9A%E8%AE%AFipc> <br/>

说明：
1. 在 `app.js` 中处理进程通讯，目前主要在 `async didReady() 应用已启动完毕 监听进程通讯`


```js
// 监听多进程间的通讯：启动自定义，具体可参考文档：https://eggjs.org/zh-CN/basics/app-start
// app.js

const { v4: uuidv4 } = require('uuid');
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但还并未生效
    // 这是应用层修改配置的最后机会
    // 注意：此函数只支持同步调用

    /*
    // 例如：参数中的密码是加密的，在此处进行解密
    this.app.config.mysql.password = decrypt(this.app.config.mysql.password);
    // 例如：插入一个中间件到框架的 coreMiddleware 之间
    const statusIdx = this.app.config.coreMiddleware.indexOf('status');
    this.app.config.coreMiddleware.splice(statusIdx + 1, 0, 'limit');
    */
  }

  async didLoad() {
    // 所有配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义服务

    /*
    // 例如：创建自定义应用的实例
    this.app.queue = new Queue(this.app.config.queue);
    await this.app.queue.init();
 
    // 例如：加载自定义目录
    this.app.loader.loadToContext(path.join(__dirname, 'app/tasks'), 'tasks', {
      fieldClass: 'tasksClasses',
    });
    */
  }

  async willReady() {
    // 所有插件已启动完毕，但应用整体尚未 ready
    // 可进行数据初始化等操作，这些操作成功后才启动应用

    // 例如：从数据库加载数据到内存缓存
    // this.app.cacheData = await this.app.model.query(QUERY_CACHE_SQL);
  }

  async didReady() {
    // 应用已启动完毕
    // 拿app 实例
    const app = this.app;
    // 拿ctx 实例
    const ctx = await app.createAnonymousContext();

    // 监听多进程：具体看文档 <https://eggjs.org/zh-CN/core/cluster-and-ipc#%E6%8E%A5%E6%94%B6>
    // 接收: 监听 messenger 上的相应 action 事件可收到其他进程发送的消息。
    // 注意跟扩展 `app/extend/context.js`中的方法：online方法中的
    // online方法中的: app.messenger.sendTo(onlineProcessId, 'offline', {chatuser_id,chatuser}); 对应上


    // 1. 监听用户在其他进程下线
    app.messenger.on('offline', async ({ chatuser_id, chatuser, Hash_key }) => {
      console.log(`进程 ${process.pid} 收到用户 ${chatuser_id} 的下线通知`);
      // 2.处理本进程中的用户连接（旧设备）
      if (app.ws.chatuser && app.ws.chatuser[chatuser_id]) {
        // 定义一下通知消息 - 执行 `app/extend/context.js`中的方法 offlineMsg
        const force_message = ctx.offlineMsg(chatuser, chatuser_id, {});
        // 符合前端页面格式的消息推送
        app.ws.chatuser[chatuser_id].send(JSON.stringify({
          type: 'singleChat',
          data: force_message,
          timestamp: Date.now(),
        }));
        console.log(`后端推送旧设备${chatuser_id}下线通知及关闭旧设备${app.ws.chatuser[chatuser_id]}`);
        // 关闭连接
        app.ws.chatuser[chatuser_id].close();
        delete app.ws.chatuser[chatuser_id];
      }


      // 3. 多进程：根据进程存储方式 - 移除redis中用户的上线记录
      await ctx.removeOnlineProcessId(chatuser_id);

    });

    // 2. 监听处理websocket消息
    app.messenger.on('send', ({ sendto_id, message }) => {
      // 拿到对方的socket
      if (app.ws.chatuser && app.ws.chatuser[sendto_id]) {
        let you_socket = app.ws.chatuser[sendto_id];
        you_socket.send(JSON.stringify({
          type: 'singleChat',
          data: message,
          timestamp: Date.now(),
        }));
      }
    });

  }

  async serverDidReady() {
    // http/https 服务器已启动，开始接收外部请求
    // 此时可以从 app.server 获取 server 实例

    /*
    this.app.server.on('timeout', socket => {
      // 处理 socket 超时
    });
    */
  }
}

module.exports = AppBootHook;
```


### 5. 控制器 `/app/controller/api/chat/chatwebsocket.js` 代码调整
将里面的发websocket消息的方法换成文件 `app/extend/context.js` 中通用处理`单进程`和`多进程`发消息方法：`通用发送websocket消息方法:` `chatWebsocketSendOrSaveMessage` <br/>

以下是控制器完整代码：<br/>

```js
'use strict';

const Controller = require('egg').Controller;

// 引入 uuid 库 `npm install uuid`
const { v4: uuidv4 } = require('uuid');

class ChatwebsocketController extends Controller {
    // 链接websocket
    async connect() {
        const { ctx, app, service } = this;
        console.log('链接websocket用户的id', ctx.websocket.chatuser_id);
        // 确保连接存在
        if (!ctx.websocket) {
            return ctx.apiFail('非法访问');
        }
        console.log(`clients链接数: ${app.ws.clients.size}`);

        // 添加心跳机制
        let heartbeatInterval = setInterval(() => {
            try {
                if (ctx.websocket.readyState === 1) { // OPEN
                    ctx.websocket.send(JSON.stringify({ type: 'ping' }));
                }
            } catch (e) {
                clearInterval(heartbeatInterval);
            }
        }, 30000); // 每30秒发送一次心跳


        // 监听消息
        ctx.websocket.on('message', async msg => {
            console.log(`---------监听websocket用户的id: ${ctx.websocket.chatuser_id} 消息原始数据:`, msg);
            // 1. 添加消息类型检查
            let messageString;
            if (typeof msg !== 'string') {
                if (Buffer.isBuffer(msg)) {
                    messageString = msg.toString('utf-8'); // 转换二进制数据
                } else {
                    console.log('收到非文本消息，已忽略', msg);
                    return; // 忽略非文本消息
                }
            } else {
                messageString = msg;
            }

            console.log('监听消息字符串:', messageString);

            try {
                // 尝试解析JSON
                const data = JSON.parse(messageString);

                // 2. 添加对客户端心跳响应的处理
                if (data.type === 'pong') {
                    console.log('收到客户端心跳响应');
                    return;
                }

                // 3. 添加对客户端心跳请求的响应
                if (data.type === 'ping') {
                    console.log('收到客户端心跳请求，token:', data.token);
                    
                    // 验证token有效性
                    if (data.token) {
                        try {
                            const user = ctx.checkToken(data.token);
                            console.log('心跳token验证成功，用户ID:', user.id);
                            
                            // 响应心跳
                            ctx.websocket.send(JSON.stringify({
                                type: 'pong',
                                timestamp: Date.now()
                            }));
                        } catch (tokenError) {
                            console.log('心跳token验证失败:', tokenError.message);
                        }
                    } else {
                        console.log('心跳消息缺少token');
                        // 响应心跳但不验证
                        ctx.websocket.send(JSON.stringify({
                            type: 'pong',
                            timestamp: Date.now()
                        }));
                    }
                    return;
                }

                // 处理其他消息类型...
            } catch (e) {
                // 4. 增强错误处理
                if (messageString.includes('undefined')) {
                    console.warn('收到无效消息，可能来自连接断开事件');
                } else {
                    console.error('消息解析错误', e, '原始消息:', messageString);
                    
                    // 尝试处理非JSON格式的心跳消息
                    if (messageString === 'ping') {
                        console.log('收到简单ping消息');
                        ctx.websocket.send(JSON.stringify({
                            type: 'pong',
                            timestamp: Date.now()
                        }));
                        return;
                    }
                }
            }
        });

        // 监听关闭
        ctx.websocket.on('close', async (code, reason) => {
            console.log('可能因页面刷新长时间未连接等原因websocket关闭了-监听关闭状态码-原因', code, reason);
            // 清除心跳
            clearInterval(heartbeatInterval); 
            // 关闭进行下线处理-关闭socket链接-及用户下线处理
            console.log('监听关闭事件-下线处理-监听关闭状态码',code);
            // 1. 拿websocket用户记录
            const chatuser_id = ctx.websocket.chatuser_id;
            // 2. 移除websocket用户记录
            await ctx.UserWebsocketCloseAndDelete();  
            // 3. 多进程：根据进程存储方式 - 移除redis中用户的上线记录
            await ctx.removeOnlineProcessId(chatuser_id);
            
        });

        // 发送欢迎消息-所有人都发
        ctx.websocket.send(JSON.stringify({
            type: 'system',
            data: '欢迎您访问我们的系统！',
            timestamp: Date.now()
        }));
        
    }

    

    //发送消息
    async sendmessage() {
        const { ctx, app, service } = this;
        //参数验证
        ctx.validate({
            sendto_id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '接收人/群的id值', //字段含义
                range: {
                    min: 1,
                }
            },
            chatType: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '接收类型', // 单聊 single 群聊 group
                range: {
                    in: ['single', 'group'],
                }
            },
            type: {
                type: 'string',
                required: true,
                // defValue: '', 
                // 'text'|'iconMenus'|'image'|'audio'|'video' 等等
                desc: '消息类型',
            },
            data: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '消息内容',
            },
            options: {
                type: 'string',
                required: false, //选填
                defValue: '', 
                desc: '额外参数json字符串',
            },
        });
        // 获取参数
        const { sendto_id, chatType, type, data, options } = ctx.request.body;
        // 我的信息
        const me = ctx.chat_user;
        const me_id = me.id;
        // 单聊还是群聊chatType
        if (chatType == 'single') {
            // 单聊
            // 1. 看聊天的人是否存在(可以是游客可以是登录用户可以是好友)
            let chater = await app.model.User.findOne({
                where: {
                    id: sendto_id,
                    status: 1
                }
            });
            if (!chater) {
                return ctx.apiFail('对方不存在或者被禁用，不能发消息');
            }
            // 2. 看一下对方的设置是否容许聊天
            chater = JSON.parse(JSON.stringify(chater));
            console.log('聊天对象数据库信息', chater);
            // 信息设置大的对象
            let allset = {};
            // 用户设置信息
            let userset = chater.userset;
            // 对方没有任何设置
            if (!userset) {
                // 包括没有聊天设置，则对于聊天，给它默认聊天设置
                allset.chatset = {
                    visitor: {
                        sendCount: 1, //可以发一条
                        needFollow: false  // 无需关注
                    },
                    user: {
                        sendCount: 1, //可以发一条
                        needFollow: false // 无需关注
                    }
                };
                // 其它设置信息的初始默认值
                // ...
            } else {
                // 有设置信息 存储的是json字符串转对象
                allset = JSON.parse(userset);
                // 看一下有没有聊天设置信息
                if (!allset.chatset) {
                    // 没有聊天设置信息 则给它默认的聊天设置
                    allset.chatset = {
                        visitor: {
                            sendCount: 1, //可以发一条
                            needFollow: false  // 无需关注
                        },
                        user: {
                            sendCount: 1, //可以发一条
                            needFollow: false // 无需关注
                        }
                    };
                } else {
                    // 有聊天设置信息 用用户自己的设置
                    allset.chatset = allset.chatset;
                }
            }
            console.log('用户设置的信息包括默认值', allset);
            // 针对对方聊天设置做相应的判断
            // 是要求先登录、先成为好友，才能发送
            // 这个时候要看我的身份
            const me_role = me.role;
            // 定义一下昵称（主要针对我和对方是好友关系的时候各自拿备注昵称）
            let me_friend_nickname = ''; // 我在对方的好友备注
            let you_friend_nickname = ''; // 对方在我的好友备注
            // 如果我是游客，则看对方怎么设置的
            if (me_role == 'visitor') {
                // 关于关注方面
                if (allset.chatset.visitor.needFollow) {
                    //需要游客关注
                    //然后看一下我有没有关注他，没有关注则提示先关注
                }
                // 关于发送条数方面
                let sendCount = allset.chatset.visitor.sendCount;
                if (sendCount == 0) {
                    return ctx.apiFail('对方设置成：需要您先登录才能发消息');
                }else if(sendCount == 1){
                    // 查一下已经发了几条，如果已经发了一条则不能再发送了
                }else if(sendCount == 2){
                    // 随便发，没有限制
                }
            }else if(me_role == 'user'){
                // 如果我是登录用户
                // 如果对方是我的好友，可以拿一下对方在我的好友备注
                let mefriend = await app.model.Goodfriend.findOne({
                    where: {
                        user_id: me_id,  // 我
                        friend_id: sendto_id, //对方
                    }
                });
                if(mefriend){
                    you_friend_nickname = mefriend.nickname; // 对方在我的好友备注
                }
                // 看一下我是不是对方的好友
                let friend = await app.model.Goodfriend.findOne({
                    where: {
                        user_id: sendto_id,  // 对方
                        friend_id: me_id, //我
                    }
                });
                // 如果是好友，但是如果对方把我拉黑了，则不能发消息
                if(friend && friend.isblack == 1){
                    return ctx.apiFail('对方把你拉黑了，不能发送消息');
                }
                // 如果我是对方的好友，可以拿一下我在对方的好友昵称备注
                if(friend){
                    me_friend_nickname = friend.nickname; // 我在对方的好友备注
                }else{
                    // 不是对方好友，则按照对方聊天设置处理
                    // 关于关注方面
                    if (allset.chatset.user.needFollow) {
                        //需要用户关注
                        //然后看一下我有没有关注他，没有关注则提示先关注
                    }
                    // 关于发送条数方面
                    let sendCount = allset.chatset.user.sendCount;
                    if (sendCount == 0) {
                        return ctx.apiFail('对方设置成：需要您先成为他的好友才能发消息');
                    }else if(sendCount == 1){
                        // 查一下已经发了几条，如果已经发了一条则不能再发送了
                    }else if(sendCount == 2){
                        // 随便发，没有限制
                    }
                }
            }

            // 3. 过了聊天设置这一关, 则发送消息，构建消息格式
            let optionsObj = null;
            // 额外参数json字符串options
            try{
                optionsObj = JSON.parse(decodeURIComponent(options));
            } catch {
                optionsObj = null;
            }
            let message = { 
                id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
                from_avatar: me.avatar, // 发送者头像
                from_name: me_friend_nickname || me.nickname || me.username, // 发送者名称
                from_id: me.id, // 发送者id
                to_id: sendto_id, // 接收者id
                to_name: you_friend_nickname || chater.nickname || chater.username, // 接收者名称
                to_avatar: chater.avatar, // 接收者头像
                chatType: chatType, // 聊天类型 单聊
                type: type, // 消息类型
                data: data, // 消息内容
                options: optionsObj, // 其它参数
                create_time: (new Date()).getTime(), // 创建时间
                isremove: 0, // 0未撤回 1已撤回
            };

            
            /*
            // 单进程
            // 4. 拿到对方的socket
            let you_socket = ctx.app.ws.chatuser[sendto_id];
            // 如果拿不到对方的socket， 则把消息放在redis队列中， 等待对方上线时，再发送
            if(!you_socket){
                // 放到reids，设置消息列表中：key值是：'chat_getmessage_' + sendto_id（用户id）
                ctx.service.cache.setList('chat_getmessage_' + sendto_id, message);
            }else{
                // 如果对方在线，则直接推送给对方
                you_socket.send(JSON.stringify({
                    type: 'singleChat',
                    data: message,
                    timestamp: Date.now(),
                }));
                // 存储到对方redis历史记录中
                // key: `chatlog_对方id_[single|group]_我的id`
                ctx.service.cache.setList(`chatlog_${sendto_id}_${message.chatType}_${me.id}`, message);
            }
            */
            // 多进程
            // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
            ctx.chatWebsocketSendOrSaveMessage(sendto_id, message);

            // 存储到我的redis历史记录中
            // key: `chatlog_我的id_[single|group]_对方id`
            ctx.service.cache.setList(`chatlog_${me.id}_${message.chatType}_${sendto_id}`, message);
            
            // 返回
            return ctx.apiSuccess(message);

        } else if (chatType == 'group') {
            // 群聊
            // 1. 先判断这个群是否存在，并且我是否在群里
            let group = await app.model.Group.findOne({
                where:{
                    id: sendto_id, //群id
                    status: 1, // 群状态 1正常 2锁定 0解散
                },
                // 关联查询群成员
                include:[
                    {
                        // 关联模型
                        model: app.model.GroupUser,
                        // 关联条件
                        where: {
                            // 选取状态正常的群成员
                            status: 1, // 状态 1正常 2锁定 0禁言
                        },
                        // 读取字段
                        attributes: ['id', 'group_id', 'user_id', 'nickname', 'avatar', 'status', 'order'],
                    }
                ],
            });
            if(!group){
                return ctx.apiFail('群不存在或者已解散或者被封禁，无法发消息');
            }
            // 2. 存在看一下群信息，我在不在群里
            // group = JSON.parse(JSON.stringify(group));
            // console.log('存在看一下群信息', group);
            // 查一下我在不在群里
            let me_index = group.group_users.findIndex(item => item.user_id == me.id);
            if(me_index == -1){
                return ctx.apiFail('您不在群里，无法发消息');
            }
            // 3. 我在群里
            // 我在群里的昵称: 优先拿我在群里设置的昵称，没有则拿我自己的昵称，在没有则拿账号名
            let me_group_nickname = group.group_users[me_index].nickname || me.nickname || me.username;
            // 我在群聊的头像：优先拿我在群里的头像，没有则拿我自己的头像
            let me_group_avatar = group.group_users[me_index].avatar || me.avatar;

            // 4. 定义消息格式
            let optionsObj = null;
            // 额外参数json字符串options
            try{
                optionsObj = JSON.parse(decodeURIComponent(options));
            } catch {
                optionsObj = null;
            }
            let message = { 
                id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
                from_avatar: me_group_avatar || me.avatar, // 发送者头像
                from_name: me_group_nickname || me.nickname || me.username, // 发送者名称
                from_id: me.id, // 发送者id
                to_id: group.id, // 群id
                to_name: group.name, // 群名称
                to_avatar: group.avatar, // 群头像
                chatType: chatType, // 聊天类型 群聊
                type: type, // 消息类型 
                data: data, // 消息内容
                options: optionsObj, // 其它参数
                create_time: (new Date()).getTime(), // 创建时间
                isremove: 0, // 0未撤回 1已撤回
                // 群相关信息
                group: group, 
            };

            // 循环推送给群成员 不用推送给自己
            group.group_users.forEach(v => {
                if(v.user_id != me.id){
                   // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                   ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
                }
            });

            // 返回
            return ctx.apiSuccess(message);

        }

    }


    //用户(我)上线后获取离线消息（登录用户和游客都有这个功能）
    async chat_getmessage_OffLine() { 
        const { ctx, app, service } = this;
        // 我的信息
        const me = ctx.chat_user;
        const me_id = me.id;
        // 获取离线消息
        let key = `chat_getmessage_${me_id}`;
        let msgList = await service.cache.getList(key); // 获取离线消息
        // 推送离线消息给用户(我)
        msgList.forEach(async (msg) => {
            // 离线消息存的是字符串，需要转成对象
            msg = JSON.parse(msg);
            // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
            ctx.chatWebsocketSendOrSaveMessage(me_id, msg);
        });
        // 拿到之后则可以清除离线消息
        await service.cache.remove(key);

        // 返回
        return ctx.apiSuccess('ok');
    }
    
}

module.exports = ChatwebsocketController;

```


### 6. 控制器 `/app/controller/api/chat/chatuser.js` 代码调整
将里面的发websocket消息的方法换成文件 `app/extend/context.js` 中通用处理`单进程`和`多进程`发消息方法：`通用发送websocket消息方法:` `chatWebsocketSendOrSaveMessage` <br/>

以下是控制器完整代码：<br/>

```js
'use strict';
//哈希函数 
const crypto = require('node:crypto');
// 引入 uuid 库 `npm install uuid`
const { v4: uuidv4 } = require('uuid');

const Controller = require('egg').Controller;

class ChatuserController extends Controller {
    // 用户登录
    async userlogin() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '账号', //字段含义
                range: {
                    min: 4,
                    max: 20
                }
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '密码',
                range: {
                    min: 6,
                    max: 20
                }
            },
        });
        // 拿参数
        const { username, password } = ctx.request.body;
        // 比对信息
        await this.compareData({
            username,
            password
        });

    }
    // 验证密码
    async checkPassword(password, hash_password) {
        let hash = crypto.createHash('sha256', this.app.config.crypto.secret); //或者md5
        hash.update(password);
        password = hash.digest('hex');
        if (password !== hash_password) {
            this.ctx.throw(400, '账户或密码错误');
        }
        return true;
    }
    // 用户注册
    async userregister() {
        //1.参数验证
        this.ctx.validate({
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '账号', //字段含义
                range: {
                    min: 4,
                    max: 20
                }
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '密码',
                range: {
                    min: 6,
                    max: 20
                }
            },
        });
        let { username, password } = this.ctx.request.body;
        let user = await this.app.model.User.findOne({ where: { username } });
        if (user) {
            return this.ctx.apiFail('该账号已存在，请换一个账号注册');
        }
        //否则不存在则写入数据库
        let status = 1;
        let res = await this.app.model.User.create({
            username,
            password,
            status
        });
        // 创建用户资料
        await this.ctx.model.UserInfo.create({
            user_id: res.id
        });
        // 成功返回数据
        // res =  JSON.parse(JSON.stringify(res));
        // delete res.password;
        // this.ctx.apiSuccess(res);
        // 逻辑： 注册成功后，自动登录，返回token
        // 比对信息
        await this.compareData({
            username,
            password
        });
    }

    // 比对信息，自动登录
    async compareData(option) {
        const { ctx, app } = this;
        // 判断是否存在
        let user = await app.model.User.findOne({
            where: {
                username: option.username,
                status: 1,
            },
        });
        if (!user) {
            // ctx.throw(400, '账号不存在或者被禁用');
            return ctx.apiFail('账号不存在或者被禁用');
        }
        // 如果比对传递了role, 且role = 'visitor' 则表示是游客登录，不需要验证密码
        if (!(option.role && option.role == 'visitor')) {
            // 验证密码
            await this.checkPassword(option.password, user.password);
        }

        //存储在session中，定义session中的一个属性authuser存储用户登录信息
        // ctx.session.authuser = user; //存储到session

        // 根据业务需要，这里可以更新一些信息，比如：登录时间、登录ip等
        await user.update({
            last_login: Date.now(),//登录时间
        });
        // 把user转换成json对象，进行后续一些处理和返回给客户端
        user = JSON.parse(JSON.stringify(user));
        // 注意注册用户退出登录后，应该以游客模式返回前端访问
        if (option.role && option.role == 'visitor') {
            user.role = 'visitor'; // 给前端返回游客模式
        }
        //console.log('用户比对信息', user);
        // 生成唯一token
        let token = ctx.getToken(user);
        user.token = token;
        // console.log('即时通讯登录用户信息', user);
        // 加入到缓存中（保证用户提交验证的token来自我们服务器生成的）
        // 即加入redis中, 注意缓存时间的设置 60 * 60 * 24 * 365 * 100 为100年
        // 第三个参数为0，则是用不过期
        let user_token = await this.service.cache.set('chat_user_' + user.id,
            token, 60 * 60 * 24 * 365 * 100);
        if (!user_token) {
            ctx.throw(400, '登录失败');
        }


        // 如果比对传递了role, 且role = 'visitor' 则表示是游客
        if (option.role && option.role == 'visitor') {
            // 新增给当前游客用户，由系统发一个登录提醒
            const startTime = Date.now();
            const maxWait = 20000; // 20秒超时
            const checkInterval = 500; // 每500ms检查一次

            const checkWebSocket = () => {
                // 1. 检查WebSocket是否存在
                if (this.ctx.app.ws.chatuser && this.ctx.app.ws.chatuser[user.id]) {
                    // WebSocket已就绪，立即执行
                    this.systemSendLoginRemind(user);
                }
                // 2. 检查是否超时
                else if (Date.now() - startTime < maxWait) {
                    // 未超时则继续轮询
                    setTimeout(checkWebSocket, checkInterval);
                }
                // 超时后自动结束（不执行任何操作）
            };

            // 首次检查（立即开始）
            setTimeout(checkWebSocket, 0);
        }


        // 返回
        delete user.password;
        return ctx.apiSuccess(user);
    }

    // 用户退出登录
    async userlogout() {
        const { ctx, app } = this;
        // 获取当前用户信息 通过中间件chatUserAuth挂载到ctx.chat_user了
        let user = ctx.chat_user;
        if (user) {
            let user_token = await this.service.cache.get('chat_user_' + user.id);
            // console.log('即时通讯用户缓存信息', user_token);
            if (user_token) {
                //清除redis
                await this.service.cache.remove('chat_user_' + user.id);
            }
        }
        return ctx.apiSuccess(true);
    }

    // 搜索用户功能（登录用户才能搜索用户，未登录用户（游客）不能搜索用户）
    async searchUser() {
        const { ctx, app } = this;
        //1.参数验证
        ctx.validate({
            keyword: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '搜索关键词', //字段含义
                range: {
                    min: 1,
                    max: 50
                }
            },
        });
        // 获取搜索关键词
        let { keyword } = ctx.request.body;
        // 查询用户（模糊查询）
        const Op = app.Sequelize.Op;
        let users = await app.model.User.findAll({
            where: {
                username: {
                    [Op.like]: `%${keyword}%`,
                },
                status: 1,
                role: {
                    [this.app.Sequelize.Op.ne]: 'visitor', // role != 'visitor'
                },
                id: {
                    [this.app.Sequelize.Op.ne]: ctx.chat_user.id, // id != 自己的id
                },
            },
            // 读取某些字段
            attributes: ['id', 'username', 'avatar', 'role', 'uuid', 'nickname'],
            // 除了某些字段，其它都获取
            // attributes: { 
            //     exclude: ['password','uuid','mobile','email'], 
            // },
        });
        return ctx.apiSuccess(users);
    }


    // 游客用户注册身份
    async visitorRegister() {
        const { ctx, app } = this;
        // 1. 签名验证
        const clientSign = ctx.get('X-Security-Sign');
        // return ctx.apiSuccess(clientSign);
        // 没有签名
        if (!clientSign) {
            return ctx.apiError('非法访问');
        }
        // 校验签名
        // 参数验证
        ctx.validate({
            deviceId: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '设备指纹', //字段含义
                range: {
                    min: 36,
                    max: 200
                }
            },
            timestamp: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '时间戳', //字段含义
            },
            uniplatform: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '平台类型',
                range: {
                    min: 2,
                    max: 50
                }
            },
            devicemodel: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '设备型号',
                range: {
                    min: 1,
                    max: 50
                }
            },
            deviceos: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '操作系统',
                range: {
                    min: 1,
                    max: 50
                }
            },
            devicebrand: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '设备品牌',
                range: {
                    min: 1,
                    max: 50
                }
            },
        });
        const { deviceId, timestamp,
            uniplatform, devicemodel, deviceos, devicebrand } = ctx.request.body;
        // 校验签名
        const serverSign = this.generateSign({
            deviceId,
            timestamp,
            salt: app.config.salt.secret, // 需与客户端盐值一致，存在配置中
        });

        if (clientSign !== serverSign) {
            return ctx.apiFail('非法签名');
        }

        // 2.请求时效验证（5分钟有效）
        if (Date.now() - timestamp > 300000) {
            return ctx.apiFail('请求已过期');
        }

        // 3. 设备ID格式校验
        if (!/^[\w-]{36}$/.test(deviceId)) {
            return ctx.apiFail('无效标识');
        }

        // 4. 限流策略（redis实现）
        const key = `chat_visitor_reg:${deviceId}`;
        const count = await ctx.app.redis.incr(key);
        await ctx.app.redis.expire(key, 3600); // 1小时过期

        if (count > 5) { // 1小时内最多5次
            //return ctx.throw(429, '请求过于频繁');
            return ctx.apiFail('请求过于频繁，请1个小时后再试');
        }

        // 5. 创建或更新游客用户
        /*
        let user = await ctx.model.User.findOrCreate({
            where: { devicefingeruuid: deviceId },
            defaults: {
                username: username,
                password: password,
                role: 'visitor',
                last_login: new Date()
            }
        });
        // 记得把user转一下, 注意返回的user是个数组
        user = JSON.parse(JSON.stringify(user));
        console.log('注意返回的user是个数组', user);
        */
        // 看一下这个deviceId标识下是否有账户
        let deviceIdUser = await this.app.model.User.findOne({ where: { devicefingeruuid: deviceId } });
        if (deviceIdUser) {
            // 如果有账户 - 一般返回客户端可以转一下
            // deviceIdUser = JSON.parse(JSON.stringify(deviceIdUser));
            // console.log('游客账户',deviceIdUser.toJSON());
            if (deviceIdUser.role == 'visitor') {
                // 如果是游客账户
                // 更新一下最近一次操作时间
                deviceIdUser.last_login = new Date();
                await deviceIdUser.save();
                // 游客账户自动登录，但不需要密码验证
                // 比对信息进行自动登录
                await this.compareData({
                    username: deviceIdUser.username,
                    role: deviceIdUser.role,
                });
            } else if (deviceIdUser.role == 'user') {
                // 如果是正常注册账户，退出登录后，用游客模式登录访问
                await this.compareData({
                    username: deviceIdUser.username,
                    role: 'visitor', // 注意这里改成了游客模式
                });
            }
            // 以下内容选择性更新（可采用异步更新，不用await）
            deviceIdUser.update({
                uniplatform, devicemodel, deviceos, devicebrand,
            });
        } else {
            // 没有账户则创建游客账户
            // 游客用户名：自定义
            let username = `VIS${deviceId.substr(0, 8)}`;
            // 游客密码:随机6位数，不足6位前面补0填充 即：000000-999999
            let password = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
            let user = await this.app.model.User.create({
                // 游客用户名：自定义
                username: username,
                // 游客密码:随机6位数，不足6位前面补0填充 即：000000-999999
                password: password,
                // 游客角色
                role: 'visitor',
                // 最近一次操作时间
                last_login: new Date(),
                // 设备指纹
                devicefingeruuid: deviceId,
                // 以下内容选择性写入
                uniplatform, devicemodel, deviceos, devicebrand,
            });
            user = JSON.parse(JSON.stringify(user));
            // 创建游客资料
            let userinfo = await this.ctx.model.UserInfo.findOne({ where: { user_id: user.id } });
            if (!userinfo) {
                //没有则创建
                await this.ctx.model.UserInfo.create({
                    user_id: user.id
                });
            }
            // 比对信息进行自动登录
            await this.compareData({
                username,
                password
            });
        }
    }

    // 生成服务端签名
    generateSign(params) {
        const sortedStr = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&');
        // 2. （必须与前端的拼接方式一致）
        const fullString = sortedStr + 'APP_SECRET';

        return crypto
            //.createHmac('sha256', 'APP_SECRET') // 使用配置密钥
            .createHash('sha256') // 注意这里是 createHash 不是 createHmac
            .update(fullString)
            .digest('hex');
    }

    // 游客用户正式注册身份
    async visitorregChat() {
        const { ctx, app } = this;
        // 1. 签名验证
        const clientSign = ctx.get('X-Security-Sign');
        // return ctx.apiSuccess(clientSign);
        // 没有签名
        if (!clientSign) {
            return ctx.apiError('非法访问');
        }
        // 校验签名
        //1.参数验证
        this.ctx.validate({
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '账号', //字段含义
                range: {
                    min: 4,
                    max: 20
                }
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '密码',
                range: {
                    min: 6,
                    max: 20
                }
            },
            deviceId: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '设备指纹', //字段含义
                range: {
                    min: 36,
                    max: 200
                }
            },
            timestamp: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '时间戳', //字段含义
            },
        });
        let { username, password, deviceId, timestamp } = this.ctx.request.body;
        // 校验签名
        const serverSign = this.generateSign({
            deviceId,
            timestamp,
            salt: app.config.salt.secret, // 需与客户端盐值一致，存在配置中
        });

        if (clientSign !== serverSign) {
            return ctx.apiFail('非法签名');
        }

        // 2.请求时效验证（5分钟有效）
        if (Date.now() - timestamp > 300000) {
            return ctx.apiFail('请求已过期');
        }

        // 3. 设备ID格式校验
        if (!/^[\w-]{36}$/.test(deviceId)) {
            return ctx.apiFail('无效标识');
        }

        // 4. 限流策略（redis实现）
        const key = `chat_visitor_reg:${deviceId}`;
        const count = await ctx.app.redis.incr(key);
        await ctx.app.redis.expire(key, 3600); // 1小时过期

        if (count > 5) { // 1小时内最多5次
            //return ctx.throw(429, '请求过于频繁');
            return ctx.apiFail('请求过于频繁，请1个小时后再试');
        }

        // 5. 注册账号或者更新账号
        // 账号之前都是以游客身份入驻的，账号和秘密都是随机的，现在正式注册，需要更新账号和密码
        // 先看一下注册的账号是否已经存在
        let user = await this.app.model.User.findOne({ where: { username } });
        if (user) {
            return this.ctx.apiFail('该账号已存在，请换一个账号注册');
        }
        // 再根据deviceId查询一下这个账户是否存在
        let deviceIdUser = await this.app.model.User.findOne({ where: { devicefingeruuid: deviceId } });
        if (deviceIdUser) {
            // 有则更新用户名密码
            deviceIdUser.username = username;
            deviceIdUser.password = password;
            // 重点：切换身份
            deviceIdUser.role = 'user';
            deviceIdUser.last_login = new Date();
            // 更新用户名密码
            await deviceIdUser.save();
        } else {
            //否则不存在账户则写入数据库
            let status = 1;
            let res = await this.app.model.User.create({
                username,
                password,
                status,
                last_login: new Date(),
            });
            // 创建用户资料
            await this.ctx.model.UserInfo.create({
                user_id: res.id
            });
            // 成功返回数据
            // res =  JSON.parse(JSON.stringify(res));
            // delete res.password;
            // this.ctx.apiSuccess(res);
        }
        // 逻辑： 注册成功后，自动登录，返回token
        // 比对信息,进行自动登录
        await this.compareData({
            username,
            password
        });
    }

    // 游客用户正式登录身份
    async visitorloginChat() {
        const { ctx, app } = this;
        // 1. 签名验证
        const clientSign = ctx.get('X-Security-Sign');
        // return ctx.apiSuccess(clientSign);
        // 没有签名
        if (!clientSign) {
            return ctx.apiError('非法访问');
        }
        // 校验签名
        //1.参数验证
        this.ctx.validate({
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '账号', //字段含义
                range: {
                    min: 4,
                    max: 20
                }
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '密码',
                range: {
                    min: 6,
                    max: 20
                }
            },
            deviceId: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '设备指纹', //字段含义
                range: {
                    min: 36,
                    max: 200
                }
            },
            timestamp: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '时间戳', //字段含义
            },
        });
        let { username, password, deviceId, timestamp } = this.ctx.request.body;
        // 校验签名
        const serverSign = this.generateSign({
            deviceId,
            timestamp,
            salt: app.config.salt.secret, // 需与客户端盐值一致，存在配置中
        });

        if (clientSign !== serverSign) {
            return ctx.apiFail('非法签名');
        }

        // 2.请求时效验证（5分钟有效）
        if (Date.now() - timestamp > 300000) {
            return ctx.apiFail('请求已过期');
        }

        // 3. 设备ID格式校验
        if (!/^[\w-]{36}$/.test(deviceId)) {
            return ctx.apiFail('无效标识');
        }

        // 4. 限流策略（redis实现）
        const key = `chat_visitor_reg:${deviceId}`;
        const count = await ctx.app.redis.incr(key);
        await ctx.app.redis.expire(key, 3600); // 1小时过期

        if (count > 5) { // 1小时内最多5次
            //return ctx.throw(429, '请求过于频繁');
            return ctx.apiFail('请求过于频繁，请1个小时后再试');
        }

        // 5. 登录账号
        // 比对信息，自动登录
        await this.compareData({
            username,
            password
        });
    }

    // 查看用户信息(公共接口，游客和登录用户都可以访问)
    async userinfo() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            uuid: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: 'uuid值', //字段含义
                range: {
                    min: 36,
                    max: 36
                }
            },
        });
        const { uuid } = ctx.params;
        let user = await app.model.User.findOne({
            where: {
                uuid,
                status: 1,
            },
            attributes: ["id", "uuid", "username", "nickname", "avatar", "role", "userset"],
            include: [
                {
                    model: app.model.UserInfo,
                    as: 'userinfo',
                    attributes: {
                        exclude: ['user_id', 'order', 'create_time', 'update_time'],
                    },
                }
            ],
        });
        user = JSON.parse(JSON.stringify(user));
        /*
        // 看一下是不是我的好友：--- 需要这个字段那么这个方法要走中间件
        // 因为走了中间件 ctx.chat_user 才有值
        let me_id = ctx.chat_user ? ctx.chat_user.id : 0;
        // console.log('我的id', ctx.chat_user.id);
        // console.log('user的id', user.id);
        let goodfriend = await app.model.Goodfriend.findOne({
            where:{
                user_id:me_id,
                friend_id:user.id,
                isblack:0, //不是黑名单
            }
        });
        // 新增字段：是否是好友
        user.myfriend = goodfriend ? true : false;
        */
        //delete user.id;
        /*
        // 模拟用户对聊天的一些设置（会取自数据库userset字段）
        user.chatset = {
            // 对游客（未登录用户）聊天的设置
            visitor: {
                // 是否允许游客聊天
                // 0 禁止(需先登录) 1 可以发一条消息 2 可以聊天
                sendCount: 0,
                // 是否需要关注
                needFollow: true,
            },
            // 对user登录用户
            // 0 禁止(需先加为好友) 1 可以发一条消息 2 可以聊天
            user:{
                sendCount: 2,
                needFollow: true,
            },
        };
        */

        return ctx.apiSuccess(user);
    }

    // 查看用户是否申请加我为好友（登录用户有这个权限，游客无权限）
    async isApplyfriend() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            uuid: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: 'uuid值', //字段含义
                range: {
                    min: 36,
                    max: 36
                }
            },
        });
        const { uuid } = ctx.params;
        // 查用户
        let user = await app.model.User.findOne({
            where: {
                uuid,
                status: 1,
            },
            attributes: ["id"],
        });
        if (!user) {
            return this.ctx.apiFail('用户不存在');
        }
        // 查申请表, 为了判断我是否有权限处理这个申请
        let goodfriendapply = await app.model.Goodfriendapply.findOne({
            where: {
                friend_id: ctx.chat_user.id, // 加的我，朋友id是我
                user_id: user.id, // 谁：用户
                status: 'pending',
            },
            attributes: {
                exclude: ['order', 'create_time', 'update_time'],
            },
        });
        if (!goodfriendapply) {
            return this.ctx.apiFail('用户申请信息不存在');
        }
        return this.ctx.apiSuccess(goodfriendapply);
    }


    // 用户设置更新（登录用户有这个权限，游客无权限）
    async userset() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            userset: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '用户设置', //字段含义
                range: {
                    min: 2,
                }
            },
        });
        const { userset } = ctx.request.body;
        // 我
        let me = ctx.chat_user;
        let me_id = me.id;
        // 更新
        let user = await app.model.User.findOne({
            where: {
                id: me_id,
                status: 1,
            },
        });
        await user.update({
            userset
        });
        //返回
        return this.ctx.apiSuccess('ok');
    }


    // 系统给游客发送登录提醒消息
    async systemSendLoginRemind(user) {
        const { ctx, app, service } = this;
        // 消息格式
        // console.log('要发登录提示消息的用户user', user); return;
        let _from_id = 0; // 系统id
        let message = {
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: 'https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/kefu.png', // 发送者头像
            from_name: '系统消息', // 发送者名称
            from_id: _from_id, // 发送者id 系统id
            to_id: user.id, // 接收者id  
            to_name: user.nickname || user.username, // 接收者名称
            to_avatar: user.avatar, // 接收者头像
            chatType: 'single', // 聊天类型 单聊
            type: 'text', // 消息类型 系统通知消息
            data: {
                data: "欢迎您，登录可以获取更多功能！",
                dataType: false,
                otherData: null,
            }, // 消息内容
            // 新增处理链接
            redirect: {
                url:'/pages/loginCenter/loginCenter', // 处理链接地址
                type: 'navigateTo', // 处理链接类型
            }, // 处理链接
            options: {}, // 其它参数
            create_time: (new Date()).getTime(), // 创建时间
            isremove: 0, // 0未撤回 1已撤回
            // 群相关信息
            // group: {
            //     user_id: 'fromSystemId',
            //     remark: '',
            //     invite_confirm: 0,
            // }, 
            // 新增一个消息id的key
            msgidKey: _from_id, // 消息id(便于前端在消息页查找记录)
        };
        // 推送给游客
        /*
        // 单进程推送
        // 拿到游客的socket
        let you_socket = ctx.app.ws.chatuser[user.id];
        // 如果对方在线，则直接推送给对方
        you_socket.send(JSON.stringify({
            type: 'singleChat',
            data: message,
            timestamp: Date.now(),
        }));
        */
        // 多进程推送
        // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
        ctx.chatWebsocketSendOrSaveMessage(user.id, message, false, false);

    }

    // 撤回消息（游客和登录用户都有这个权限）
    async revokeMessage() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            to_id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '接收者id或者群id', //字段含义
                range: {
                    min: 1,
                }
            },
            to_name: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '接收者或者群名称',
                range: {
                    min: 1,
                    max: 50,
                },
            },
            to_avatar: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '接收者或者群头像',
                range: {
                    min: 10,
                    max: 1000,
                },
            },
            id: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '消息uuid',
            },
            chatType: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '聊天类型',
                range: {
                    in: ['single', 'group'],
                },
            },
            create_time: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '消息发送时间', //字段含义
                range: {
                    min: 1000000000000,
                    max: (new Date()).getTime(),
                }
            },
        });
        const { to_id, to_name, to_avatar, id, chatType, create_time } = ctx.request.body;
        // 首先验证消息是否过期，超过5分钟消息不能撤回
        if ((new Date()).getTime() - create_time >  5 * 60 * 1000 ) {
            return this.ctx.apiFail('消息超过5分钟，不能撤回');
        }
        // 我
        let me = ctx.chat_user;
        let me_id = me.id;
        // 消息格式
        let message = {
            id: id, // 撤回的消息id
            from_avatar: me.avatar, // 发送者头像
            from_name: me.nickname || me.username, // 发送者名称
            from_id: me.id, // 发送者id
            to_id: to_id, // 群id|接收者id
            to_name: to_name, // 群名称|接收者 名称
            to_avatar: to_avatar, // 群头像| 接收者头像
            chatType: chatType, // 聊天类型 群聊 | 单聊
            type: 'systemNotice', // 消息类型 系统通知消息
            actionType: 'revoke', // 操作类型 撤回
            data: {
                data: `${me.nickname || me.username}撤回了一条消息`,
                dataType: false,
                otherData: null,
            }, // 消息内容
            options: {}, // 其它参数
            create_time: (new Date()).getTime(), // 创建时间
            isremove: 0, // 0未撤回 1已撤回
            // 群相关信息
            group: null,
        };


        if (chatType == 'single') {
            // 单聊处理
            // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
            ctx.chatWebsocketSendOrSaveMessage(to_id, message);
            return ctx.apiSuccess(message);
        } else if (chatType == 'group') {
            // 群聊处理
            // 1. 看一下群是否存在
            let group = await app.model.Group.findOne({
                where: {
                    id: to_id, // 群id
                    status: 1, // 状态
                },
                attributes: {
                    exclude: ['update_time'],
                },
                include: [{
                    //关联群用户表
                    model: app.model.GroupUser,
                    attributes: {
                        exclude: ['update_time'],
                    },
                    // 根据user_id 关联用户表，因为可能GroupUser中没有设置昵称和头像
                    include: [{
                        model: app.model.User,
                        attributes: ['id', 'username', 'avatar', 'nickname'],
                    }],
                }],
            });
            if (!group) {
                return ctx.apiFail('群不存在');
            }

            // 2. 我是否在群里
            let me_index = group.group_users.findIndex(v => v.user_id == me_id);
            if (me_index == -1) {
                return ctx.apiFail('你不在该群聊中，操作失败');
            }

            // 拿一下我的昵称和头像
            // 我在群里的昵称: 优先拿我在群里设置的昵称，没有则拿我自己的昵称，在没有则拿账号名
            let me_group_nickname = group.group_users[me_index].nickname || me.nickname || me.username;
            // 我在群聊的头像：优先拿我在群里的头像，没有则拿我自己的头像
            let me_group_avatar = group.group_users[me_index].avatar || me.avatar;

            // 优化通知消息
            message.from_avatar = me_group_avatar;
            message.from_name = me_group_nickname;
            message.data.data = `${me_group_nickname} 撤回了一条消息`;

            // 发给群成员
            group.group_users.forEach(v => {
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
            });

            return ctx.apiSuccess(message);
        }

    }


    // 修改账号信息（登录用户都有这个权限，游客根据情况有部分权限）
    async updateUserinfo() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            fieldname: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '修改类型',
                range: {
                    max: 30,
                    min: 1,
                },
            },
            fieldValue: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '修改结果',
                range: {
                    min: 1,
                },
            },
        });
        const { fieldname, fieldValue } = ctx.request.body;
        // 我
        let me = ctx.chat_user;
        let me_id = me.id;

        // 获取我的信息
        let myinfo = await app.model.User.findByPk(me_id);
        if (!myinfo) {
            return ctx.apiFail('用户不存在，无法修改信息');
        }

        // 返回说明
        let returnMsg = ``;
        // 修改内容判断
        if(fieldname == 'username'){
            return ctx.apiFail('账号不可修改');
        }
        if(fieldname == 'nickname'){
            // 昵称（游客和登录用户都可以修改）
            if(fieldValue.length > 30) return ctx.apiFail('昵称长度不能超过30个字符');
            myinfo.nickname = fieldValue;
            returnMsg = '修改昵称成功';
        }
        if(fieldname == 'avatar'){
            // 昵称（游客和登录用户都可以修改）
            if(fieldValue.length > 1000) return ctx.apiFail('头像地址过长不能超过1000个字符');
            myinfo.avatar = fieldValue;
            returnMsg = '头像更新成功';
        }

        // 修改
        await myinfo.save();
        // 返回
        return ctx.apiSuccess(returnMsg);
    }

}

module.exports = ChatuserController;
```


### 7. 控制器 `/app/controller/api/chat/chatgroup.js` 代码调整
将里面的发websocket消息的方法换成文件 `app/extend/context.js` 中通用处理`单进程`和`多进程`发消息方法：`通用发送websocket消息方法:` `chatWebsocketSendOrSaveMessage` <br/>

以下是控制器完整代码：<br/>
```js
'use strict';

const Controller = require('egg').Controller;

// 引入 uuid 库 `npm install uuid`
const { v4: uuidv4 } = require('uuid');

class ChatgroupController extends Controller {
    // 创建群聊（登录用户有这个功能，（游客）没有这个功能）
    async creategroup() {
        const { ctx, app } = this;
        // 参数验证
        ctx.validate({
            userIds: {
                type: 'array',
                required: true,
            }
        });
        // 拿参数
        let { userIds } = ctx.request.body;
        // 起初这些id是从朋友表拿的，即朋友表的id主键
        let goodfriend = await app.model.Goodfriend.findAll({
            where: {
                id: {
                    [this.app.Sequelize.Op.in]: userIds,
                },
                status: 1, // 数据状态正常
                isblack: 0, //没有加入黑名单
            },
            attributes: ['friend_id','user_id'],
        });
        if(!goodfriend || !goodfriend.length){
            return ctx.apiFail('请选择加入群聊的用户');
        }
        goodfriend = JSON.parse(JSON.stringify(goodfriend));
        // console.log('看一下goodfriend', goodfriend); return;
        // 重新组装用户id
        userIds = goodfriend.map(v=>v.friend_id);
        // console.log('看一下用户id数组userIds', userIds); return;
        
        // 我的信息
        const me = ctx.chat_user;
        const me_id = me.id;
        const me_name = me.nickname || me.username;
        // 查询一下这些id是否存在
        let users = await app.model.User.findAll({
            where: {
                id: {
                    [this.app.Sequelize.Op.in]: userIds,
                },
                status: 1,
            },
            attributes: ['id', 'username','nickname', 'avatar'],
        });
        if(!users.length){
           return ctx.apiFail('用户不存在，无法加入群聊');
        }
        // 转成普通对象
        users = JSON.parse(JSON.stringify(users));
        // console.log('看一下users', users); return;

        // 把我加在数组头部
        users.unshift(JSON.parse(JSON.stringify(me)));
        // console.log('加为群的用户信息', users); return;

        // 创建群聊
        // 群名称（最多50字符- 默认由用户昵称或者账号组成）
        let name = '';
        for(let i=0; i < users.length; i++){
            if(users[i].nickname){
                name += users[i].nickname + '、';
            }else{
                name += users[i].username + '、';
            }
        }
        // 去掉最后一个 '、'
        name = name.substring(0, name.length - 1);
        // 截取前50个字符
        if(name.length > 50){
            name = name.substring(0, 50); 
        }

        // 群头像（默认由用户头像组成，最多9个头像）
        let avatar = '';
        let arr = [];
        if(users.length > 9){
            arr = users.slice(0, 9);
        }else{
            arr = users;
        }
        for(let i = 0; i < arr.length; i++){
            avatar += arr[i].avatar + ',';
        }
        // 去掉最后一个 ','
        avatar = avatar.substring(0, avatar.length - 1);

        // 创建群组
        let group = await app.model.Group.create({
            user_id: me_id, // 创建者id
            name:name,
            avatar:avatar,
        });

        // 创建群组用户
        // 循环插入
        /*
        for(let i = 0; i < users.length; i++){
            await app.model.GroupUser.create({
                group_id:group.id,
                user_id:users[i].id,
            });
        }
        */
        // 批量插入
        let groupUsers = users.map(v => {
            return {
                group_id:group.id,
                user_id:v.id,
            }
        });
        await app.model.GroupUser.bulkCreate(groupUsers);

        // 消息推送通知加入群聊的其他人
        // 消息格式
        let message = { 
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: me.avatar, // 发送者头像
            from_name: me.nickname || me.username, // 发送者名称
            from_id: me.id, // 发送者id
            to_id: group.id, // 群id
            to_name: group.name, // 群名称
            to_avatar: group.avatar, // 群头像
            chatType: 'group', // 聊天类型 群聊
            type: 'systemNotice', // 消息类型 系统通知消息
            data: {
                data: `${me.nickname || me.username}创建了一个群，大家可以开始聊天了`,
                dataType: false, 
                otherData: null,
            }, // 消息内容
            options: {}, // 其它参数
            create_time: (new Date()).getTime(), // 创建时间
            isremove: 0, // 0未撤回 1已撤回
            // 群相关信息
            group: group, 
        };
        // 循环推送给群成员
        users.forEach(v => {
            // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
            ctx.chatWebsocketSendOrSaveMessage(v.id, message);
        });

        // 返回
        ctx.apiSuccess('ok');
    }

    // 群聊列表（登录用户和游客都有这个功能）
    async grouplist(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            page: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '页码', //字段含义
                range:{
                    min:1,
                }
            },
            limit: {
                type: 'int',  //参数类型
                required: false, //是否必须
                defValue: 30, 
                desc: '每页多少条', //字段含义
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿页码
        let page = ctx.params.page ? parseInt(ctx.params.page) : 1;
        // 每页多少条
        let limit = ctx.query.limit ? parseInt(ctx.query.limit) : 30;
        // 偏移量
        let offset = (page - 1) * limit; 
        // 拿数据
        let data = await app.model.Group.findAll({
            where:{
                status:1,// 状态为1的群
            },
            attributes:{
                exclude:['update_time'],
            },
            offset,
            limit,
            include:[{
                //关联群用户表
                model:app.model.GroupUser,
                attributes:['group_id','user_id','nickname','avatar'],
                // 关联查询条件
                where:{
                    user_id: me_id, // 用户id
                    status:1, // 状态
                },
            }],
            order:[
                ['id','desc'], // 按id降序排列
            ],
        });

        // 返回
        ctx.apiSuccess(data);
    }

    // 获取群资料信息（登录用户和游客都有这个功能）
    async groupinfo(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿id
        let { id } = ctx.params;
        // 查看群是否存在并且我是否在群里
        let group = await app.model.Group.findOne({
            where:{
                id: id, // 群id
                status:1, // 状态
            },
            attributes:{
                exclude:['update_time'],
            },
            include:[{
                //关联群用户表
                model:app.model.GroupUser,
                attributes:{
                    exclude:['update_time'],
                },
                where:{
                    status:1, // 群用户状态
                },
                // 根据user_id 关联用户表，因为可能GroupUser中没有设置昵称和头像
                include:[{
                    model:app.model.User,
                    attributes:['id','username','avatar','nickname','uuid','role'],
                }],
            }],
        });

        if(!group){
            return ctx.apiFail('群不存在或被封禁');
        }

        // 查看群信息的用户是否在群里，不在群里则无权查看
        // 由于对游客开放，游客不在群里，所以下面的代码注释掉
        // let me_index = group.group_users.findIndex(v => v.user_id == me_id);
        // if(me_index == -1){
        //     return ctx.apiFail('您不在群里，无法查看群信息');
        // }

        // 返回
        ctx.apiSuccess(group);
    }

    // 修改群名称（群主才有这个功能）
    async groupUpdateName(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            name: {
                type: 'string', 
                required: true, 
                // defValue: '', 
                desc: '群名称', 
                range:{
                    min:1,
                    max:20,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿参数
        let { id,name } = ctx.request.body;
        // 只有群主才能修改群名称
        let group = await app.model.Group.findOne({
            where:{
                id: id, // 群id
                status:1, // 状态
                user_id: me_id, // 群主id
            },
            // 需要给群成员推送
            include:[{
                //关联群用户表
                model:app.model.GroupUser,
                attributes:['group_id','user_id','nickname','avatar'],
            }],
        });

        if(!group){
            return ctx.apiFail('只有群主才能修改群名称');
        }

        // 2. 修改群名称
        /*
        await group.update({
            name: name,
        });
        */
        group.name = name;
        await group.save();

        // 推送给群成员
        // 3. 我作为群主，查一下我在群里的昵称和头像
        let me_index = group.group_users.findIndex(item => item.user_id == me.id);
        if(me_index == -1){
            return ctx.apiFail('无法通知群成员');
        }
        // 我在群里的昵称: 优先拿我在群里设置的昵称，没有则拿我自己的昵称，在没有则拿账号名
        let me_group_nickname = group.group_users[me_index].nickname || me.nickname || me.username;
        // 我在群聊的头像：优先拿我在群里的头像，没有则拿我自己的头像
        let me_group_avatar = group.group_users[me_index].avatar || me.avatar;

        // 4. 定义消息格式
        let message = { 
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: me_group_avatar || me.avatar, // 发送者头像
            from_name: me_group_nickname || me.nickname || me.username, // 发送者名称
            from_id: me.id, // 发送者id
            to_id: group.id, // 群id
            to_name: group.name, // 群名称
            to_avatar: group.avatar, // 群头像
            chatType: 'group', // 聊天类型 群聊
            type: 'systemNotice', // 消息类型 系统通知消息
            data: {
                data: `群名称修改为：${name}`,
                dataType: false, 
                otherData: null,
            }, // 消息内容
            options: {}, // 其它参数
            create_time: (new Date()).getTime(), // 创建时间
            isremove: 0, // 0未撤回 1已撤回
            // 群相关信息
            group: group, 
        };

        // 循环推送给群成员
        group.group_users.forEach(v => {
            // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
            ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
        });

        // 返回
        ctx.apiSuccess('ok');
    }

    // 修改群公告（群主才有这个功能）
    async groupremark(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            remark: {
                type: 'string', 
                required: true, 
                // defValue: '', 
                desc: '群公告', 
                range:{
                    min:1,
                    max:500,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿参数
        let { id,remark } = ctx.request.body;
        // 只有群主才能修改群公告
        let group = await app.model.Group.findOne({
            where:{
                id: id, // 群id
                status:1, // 状态
                user_id: me_id, // 群主id
            },
            // 需要给群成员推送
            include:[{
                //关联群用户表
                model:app.model.GroupUser,
                attributes:['group_id','user_id','nickname','avatar'],
            }],
        });

        if(!group){
            return ctx.apiFail('只有群主才能修改群公告');
        }

        // 2. 修改群公告
        /*
        await group.update({
            remark: remark,
        });
        */
        group.remark = remark;
        await group.save();

        // 推送给群成员
        // 3. 我作为群主，查一下我在群里的昵称和头像
        let me_index = group.group_users.findIndex(item => item.user_id == me.id);
        if(me_index == -1){
            return ctx.apiFail('无法通知群成员');
        }
        // 我在群里的昵称: 优先拿我在群里设置的昵称，没有则拿我自己的昵称，在没有则拿账号名
        let me_group_nickname = group.group_users[me_index].nickname || me.nickname || me.username;
        // 我在群聊的头像：优先拿我在群里的头像，没有则拿我自己的头像
        let me_group_avatar = group.group_users[me_index].avatar || me.avatar;

        // 4. 定义消息格式
        let message = { 
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: me_group_avatar || me.avatar, // 发送者头像
            from_name: me_group_nickname || me.nickname || me.username, // 发送者名称
            from_id: me.id, // 发送者id
            to_id: group.id, // 群id
            to_name: group.name, // 群名称
            to_avatar: group.avatar, // 群头像
            chatType: 'group', // 聊天类型 群聊
            type: 'systemNotice', // 消息类型 系统通知消息
            data: {
                data: `[公告] \n\n ${remark}`,
                dataType: false, 
                otherData: null,
            }, // 消息内容
            options: {}, // 其它参数
            create_time: (new Date()).getTime(), // 创建时间
            isremove: 0, // 0未撤回 1已撤回
            // 群相关信息
            group: group, 
        };

        // 循环推送给群成员
        group.group_users.forEach(v => {
            // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
            ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
        });

        // 返回
        ctx.apiSuccess('ok');
    }


    // 删除群成员（群主才有这个功能）
    async groupDeleteUser(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            group_id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            user_id: {
                type: 'int', 
                required: true, 
                // defValue: '', 
                desc: '群成员id', 
                range:{
                    min:1,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿参数
        let { group_id,user_id } = ctx.request.body;
        // 只有群主才能删除群成员
        let group = await app.model.Group.findOne({
            where:{
                id: group_id, // 群id
                // status:1, // 状态
                user_id: me_id, // 群主id
            },
            attributes:['user_id','id'],
        });

        if(!group){
            return ctx.apiFail('只有群主才能操作');
        }

        if(user_id == me_id){
            return ctx.apiFail('群主不能删除自己');
        }

        // 2. 删除群成员
        await app.model.GroupUser.destroy({
            where:{
                user_id: user_id, // 用户id
                group_id: group_id, // 群id
                // status:1, // 状态
            },
        });

        // 3. 更新一下群头像
        let group_avatar = ''; // 群头像
        // 查一下头像，优先取用户在群里面设置的头像，没有则取用户自己的头像
        let group_users = await app.model.GroupUser.findAll({
            where:{
                group_id: group_id, // 群id
                status:1, // 状态
            },
            attributes:['avatar'],
            // 查一下用户表的头像
            include:[
                {
                    model:app.model.User,
                    attributes:['avatar'],
                }
            ],
        });
        if(group_users.length > 0){
            group_users = JSON.parse(JSON.stringify(group_users));
            // 如果群成员多于9个则取前9个用户
            if(group_users.length > 9){
                group_users = group_users.slice(0,9);
            }
            // 取前9个用户的头像, 优先取用户在群里面设置的头像，没有则取用户自己的头像
            group_avatar = group_users.map(v => v.avatar || v.user.avatar).join(',');
            // 更新群头像
            // 使用 update 方法直接更新群头像，避免 save() 问题
            await app.model.Group.update({
                avatar: group_avatar
            }, {
                where: { id: group_id } // 明确指定更新条件
            });
        }
        

        ctx.apiSuccess('删除群成员成功');
    }

    // 进群设置（群主才有这个功能）
    async groupAddUserSet(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            group_id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            addGroupSet: {
                type: 'int', 
                required: true, 
                // defValue: '', 
                desc: '进群设置属性值', 
                range:{
                    min:0,
                    max:10,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id; 
        // 拿参数
        let { group_id,addGroupSet } = ctx.request.body;
        // 群是否存在
        let group = await app.model.Group.findOne({
            where:{
                id: group_id, // 群id
                status:1, // 状态
                user_id: me_id, // 群主id
            },
            attributes:{
                exclude:['order','update_time'],
            },
        });
        if(!group){
            return ctx.apiFail('群不存在或者被封禁或者你无权操作');
        }
        // 修改进群设置
        group.invite_confirm = addGroupSet;
        await group.save();
        ctx.apiSuccess('设置成功');
    }

    // 同意或者拒绝用户进群（群主才有这个功能）
    async groupAgreeOrNo(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            group_id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            user_id: {
                type: 'int', 
                required: true, 
                // defValue: '', 
                desc: '进群的用户id', 
                range:{
                    min:1,
                }
            },
            type: {
                type: 'string', 
                required: true, 
                // defValue: '', 
                desc: '同意或者拒绝', 
                range:{
                    in:['agree','no'],
                }
            },
        });
        // （传token的用户）当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id; 
        // 2.拿参数
        let { group_id,user_id,type } = ctx.request.body;
        // 3.群是否存在,并且操作者（传token的用户）是群主
        let group = await app.model.Group.findOne({
            where:{
                id: group_id, // 群id
                status:1, // 状态
                user_id: me_id, // 群主id
            },
            attributes:{
                exclude:['order','update_time'],
            },
            // 获取群成员信息，后面要推送消息
            include:[
                {
                    model:app.model.GroupUser,
                    attributes:{
                        exclude:['order','update_time'],
                    },
                    where:{
                        status:1, // 状态
                    }
                }
            ],
        });
        if(!group){
            return ctx.apiFail('群不存在或者被封禁或者你无权操作');
        }

        // 4.查一下这个用户是否在群里面
        let group_user = await app.model.GroupUser.findOne({
            where:{
                group_id: group_id, // 群id
                user_id: user_id, // 用户id
                // status:1, // 状态--此处不用判断状态
            },
            attributes:{
                exclude:['order','update_time'],
            },
        });
        // 查不到则是非法操作 
        // 因为先有邀请或者加入群，写入了用户的数据，
        // 只不过它的状态是2，表示正在等待（或者锁定）, 需要群主同意或者拒绝
        if(!group_user || group_user.status != 2){
            return ctx.apiFail('非法操作');
        }
        // 5.查到了，则判断是同意还是拒绝
        if(type == 'agree'){
            // 1.同意 - 则直接修改状态为1
            group_user.status = 1;
            // 2.执行修改
            await group_user.save();
        }else if(type == 'no'){
            // 拒绝 - 则直接删除这条记录
            await app.model.GroupUser.destroy({
                where:{
                    id: group_user.id, // 记录id
                },
            });
        }
        // 6.返回响应
        ctx.apiSuccess('处理成功');

        // 7.申请入群的用户信息 -- 要发消息通知
        let user = await app.model.User.findOne({
            where:{
                id: user_id, // 用户id
                status:1, // 状态
            },
            attributes:{
                exclude:['order','update_time'],
            },
        });
        if(!user){
            // 可能在申请入群后，用户违法被管理删除或者禁用了
            return ctx.apiFail('用户不存在或者被封禁');
        }
        

        // 8.如果同意入群，则通知群里面所有成员，有新成员加入
        if(type == 'agree'){
            // 1.定义消息格式
            // from_id 初始化自定义
            let _from_id = `redirect-applyAddGroup${group.id}-${user_id}-${(new Date()).getTime()}`;
            let message = { 
                id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
                from_avatar: 'https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/group.png', // 发送者头像
                from_name: '加群申请提醒', // 发送者名称
                from_id: _from_id, // 发送者id 系统id或者类型
                to_id: group.id, // 群id
                to_name: group.name, // 群名称
                to_avatar: group.avatar, // 群头像
                chatType: 'group', // 聊天类型 群聊
                type: 'systemNotice', // 消息类型 系统通知消息
                data: {
                    data: `[${user.nickname || user.username}] 加入了群聊` ,
                    dataType: false, 
                    otherData: null,
                }, // 消息内容
                // 新增处理链接
                // redirect: {
                //     url:'/pages/applyMyfriend/applyMyfriend', // 处理链接地址
                //     type: 'navigateTo', // 处理链接类型
                // }, // 处理链接
                options: {}, // 其它参数
                create_time: (new Date()).getTime(), // 创建时间
                isremove: 0, // 0未撤回 1已撤回
                // 群相关信息
                group: group, 
            };
            // 2.给所有群成员发消息
            let allGroupUser = await app.model.GroupUser.findAll({
                where:{
                    group_id: group_id, // 群id
                    status:1, // 状态
                },
                attributes:['user_id','avatar'],
                // 查一下用户表的头像
                include:[
                    {
                        model:app.model.User,
                        attributes:['avatar'],
                    }
                ],
            });
            allGroupUser = JSON.parse(JSON.stringify(allGroupUser));
            // 发送给所有群成员
            allGroupUser.forEach(v => {
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
            });


            // 3. 更新一下群头像
            let group_avatar = ''; // 群头像
            // 查一下头像，优先取用户在群里面设置的头像，没有则取用户自己的头像
            let group_users = allGroupUser;
            if(group_users.length > 0){
                group_users = JSON.parse(JSON.stringify(group_users));
                // 如果群成员多于9个则取前9个用户
                if(group_users.length > 9){
                    group_users = group_users.slice(0,9);
                }
                // 取前9个用户的头像, 优先取用户在群里面设置的头像，没有则取用户自己的头像
                group_avatar = group_users.map(v => v.avatar || v.user.avatar).join(',');
                // 更新群头像
                // 使用 update 方法直接更新群头像，避免 save() 问题
                await app.model.Group.update({
                    avatar: group_avatar
                }, {
                    where: { id: group_id } // 明确指定更新条件
                });
            }

        }
        
    }

    // 邀请人进群(群主直接邀请，群成员邀请、游客自己进群根据群设置来处理)
    async groupInviteUser(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            group_id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            user_id: {
                type: 'int', 
                required: true, 
                // defValue: '', 
                desc: '用户id', 
                range:{
                    min:1,
                }
            },
            inviteuser_id:{
                type: 'int', 
                required: false, 
                defValue: 0, 
                desc: '邀请人的用户id', 
            },
            addGroupDesc:{
                type: 'string', 
                required: false, 
                defValue: '', 
                desc: '加群说明或者邀请说明', 
                range:{
                    max:500,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id; 
        // 拿参数
        let { group_id,user_id,inviteuser_id,addGroupDesc } = ctx.request.body;
        // 2.群是否存在
        let group = await app.model.Group.findOne({
            where:{
                id: group_id, // 群id
                status:1, // 状态
            },
            attributes:{
                exclude:['order','update_time'],
            },
            include:[
                // 获取群主信息
                {
                    model: app.model.User,
                    attributes: ['username','nickname','avatar'],
                },
                // 获取群成员信息
                {
                    model: app.model.GroupUser,
                    attributes: ['nickname','avatar','user_id','status'],
                    // 群成员用户信息
                    include:[
                        {
                            model: app.model.User,
                            attributes: ['username','nickname','avatar'],
                        },
                    ],
                },
            ],
        });
        if(!group){
            return ctx.apiFail('群不存在或者被封禁');
        }

        // console.log('群信息',JSON.parse(JSON.stringify(group))); return;

        let result_group = JSON.parse(JSON.stringify(group)); // 群信息简化
        // 3.加群的人是否在群里
        /*
        let group_user = await app.model.GroupUser.findOne({
            where:{
                group_id: group_id, // 群id
                user_id: user_id, // 用户id
                // status:1, // 状态
            },
        });

        if(group_user){
            return ctx.apiFail('用户已经在群里');
        }
        */
        let index = result_group.group_users.findIndex(v=> v.user_id == user_id);
        if(index > -1){
            let adduserInfo = result_group.group_users[index];
            if(adduserInfo.status == 2){
                return ctx.apiFail('已申请加入群聊，正在等待群主同意');
            }else{
                return ctx.apiFail('用户已经在群里');
            }
        }

        // 4.加群者是否合法(是否存在这个用户)
        let user = await app.model.User.findOne({
            where:{
                id: user_id, // 用户id
                status:1, // 状态
            },
        });
        if(!user){
            return ctx.apiFail('加群的用户不存在或已被封禁，无法加入群聊');
        }
        // 加群者头像
        let AdduserAvatar = user.avatar;
        // 加群者称呼
        let AdduserName = user.nickname || user.username;
        // 加群者uuid
        let Adduseruuid = user.uuid;

        // 5.如果有邀请者查一下邀请者信息
        // console.log('邀请者id',inviteuser_id);
        // 主要处理邀请者的称呼
        let inviteusername = '';
        if(inviteuser_id && inviteuser_id > 0){
            // 查邀请者在群里的信息
            let inviteuserGroup = await app.model.GroupUser.findOne({
                where:{
                    user_id: inviteuser_id, // 邀请者用户id
                    group_id: group_id, // 群id
                },
                attributes:['nickname'],
            });
            if(inviteuserGroup){
                inviteuserGroup = JSON.parse(JSON.stringify(inviteuserGroup));
                // console.log('邀请者在群中的用户信息',inviteuserGroup);
                inviteusername = inviteuserGroup.nickname;
            }
            // 查用户表
            let inviteuser = await app.model.User.findOne({
                where:{
                    id: inviteuser_id, // 邀请者用户id
                    status:1, // 状态
                },
                attributes:['nickname','username','role','id'],
            });
            if(inviteuser){
                inviteuser = JSON.parse(JSON.stringify(inviteuser));
                // console.log('邀请者用户信息',inviteuser);
                if(inviteuser.role == 'user'){
                    inviteusername = inviteusername || inviteuser.nickname || inviteuser.username;
                    inviteusername = `[${inviteusername}]邀请 `;
                }
            }
        }

        // 6. 获取群主相关信息
        // 获取群主id
        let group_user_id = group.user_id;
        // 群主称呼和头像
        let group_user_name = '';
        let group_user_avatar = '';
        // 先查一下群主在群里面的称呼和头像
        let group_user_index = result_group.group_users.findIndex(v=> v.user_id == group_user_id);
        if(group_user_index > -1){
            group_user_name = result_group.group_users[group_user_index].nickname;
            group_user_avatar = result_group.group_users[group_user_index].avatar;
        }
        // 群主称呼
        group_user_name = group_user_name || result_group.user.nickname || result_group.user.username;
        // 群主头像
        group_user_avatar = group_user_avatar || result_group.user.avatar;


        // 根据群设置group.invite_confirm字段进行处理
        // invite_confirm: 0  默认值，任何人都可以进群
        // invite_confirm: 1  群主同意了才能进群
        // invite_confirm: 2  需先登录在申请进群
        // invite_confirm: 3  其他情况，根据业务需求操作

        // 7. invite_confirm: 2  需先登录在申请进群的情况
        if(group.invite_confirm == 2){
            if(group_user_id !== inviteuser_id){
                // 邀请人不是群主，需要先登录才能进群
                return ctx.apiFail('请先登录再申请进群');
            }
        }

        // 8. 添加群成员
        let addGroupUser = await app.model.GroupUser.create({
            group_id: group_id, // 群id
            user_id: user_id, // 用户id
            status:1, // 状态
            nickname: '', // 群昵称
        });
        
        // 9.invite_confirm: 1  需要群主同意的情况
        if(group.invite_confirm == 1 && group_user_id !== inviteuser_id){
            // 如果不是群主邀请的，则需要群主同意了才能进群, 将刚加群的用户状态改成2
            addGroupUser.status = 2; // 锁定状态
            await addGroupUser.save();
            // 返回
            ctx.apiSuccess('等待群主同意');
        }else{
            // 返回
            ctx.apiSuccess('加群成功');
            // 更新群头像
            let group_avatar = ''; // 群头像
            // 查一下头像，优先取用户在群里面设置的头像，没有则取用户自己的头像
            let group_users = await app.model.GroupUser.findAll({
                where:{
                    group_id: group_id, // 群id
                    status:1, // 状态
                },
                attributes:['avatar'],
                // 查一下用户表的头像
                include:[
                    {
                        model:app.model.User,
                        attributes:['avatar'],
                    }
                ],
            });
            if(group_users.length > 0){
                group_users = JSON.parse(JSON.stringify(group_users));
                // 如果群成员多于9个则取前9个用户
                if(group_users.length > 9){
                    group_users = group_users.slice(0,9);
                }
                // 取前9个用户的头像, 优先取用户在群里面设置的头像，没有则取用户自己的头像
                group_avatar = group_users.map(v => v.avatar || v.user.avatar).join(',');
                // 更新群头像
                // 使用 update 方法直接更新群头像，避免 save() 问题
                await app.model.Group.update({
                    avatar: group_avatar
                }, {
                    where: { id: group_id } // 明确指定更新条件
                });
            }
        }


        // 发送websocket消息
        // 4. 定义消息格式
        // from_id 初始化自定义
        let _from_id = `redirect-applyAddGroup${group.id}-${user_id}-${(new Date()).getTime()}`;
        let message = { 
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: 'https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/group.png', // 发送者头像
            from_name: '加群申请提醒', // 发送者名称
            from_id: _from_id, // 发送者id 系统id或者类型
            to_id: group.id, // 群id
            to_name: group.name, // 群名称
            to_avatar: group.avatar, // 群头像
            chatType: 'group', // 聊天类型 群聊
            type: 'systemNotice', // 消息类型 系统通知消息
            data: {
                data: `${inviteusername}[${user.nickname || user.username}] 加入了群聊` ,
                dataType: false, 
                otherData: null,
            }, // 消息内容
            // 新增处理链接
            // redirect: {
            //     url:'/pages/applyMyfriend/applyMyfriend', // 处理链接地址
            //     type: 'navigateTo', // 处理链接类型
            // }, // 处理链接
            options: {}, // 其它参数
            create_time: (new Date()).getTime(), // 创建时间
            isremove: 0, // 0未撤回 1已撤回
            // 群相关信息
            group: group, 
        };

        // 根据进群设置group.invite_confirm发送消息
        if(group.invite_confirm == 0){
            // 任何人都可以进群，则消息由系统发送，发送给所有群成员
            let allGroupUser = await app.model.GroupUser.findAll({
                where:{
                    group_id: group_id, // 群id
                    status:1, // 状态
                },
                attributes:['user_id'],
            });
            allGroupUser = JSON.parse(JSON.stringify(allGroupUser));
            // 发送给所有群成员
            allGroupUser.forEach(v => {
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
            });

        }else if(group.invite_confirm == 1){
            // 需要群主确认才能进群：但如果是群主邀请的，则不需要群主确认，直接进群，通知给所有人
            if(group_user_id == inviteuser_id){
                // 是群主邀请的，直接进群，发送给所有群成员
                let allGroupUser = await app.model.GroupUser.findAll({
                    where:{
                        group_id: group_id, // 群id
                        status:1, // 状态
                    },
                    attributes:['user_id'],
                });
                allGroupUser = JSON.parse(JSON.stringify(allGroupUser));
                // 发送给所有群成员
                allGroupUser.forEach(v => {
                    // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                    ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
                });
            }else{
                // 如果不是群主邀请的，发送给群主一个人进行审批
                // 附加信息
                let _desc = {
                    // 进群方式: 邀请进群还是自主进群
                    addGroupUserType: inviteuser_id && inviteuser_id > 0 ? '邀请进群' : '用户自主进群', 
                    // 邀请者
                    inviteUser: inviteuser_id && inviteuser_id > 0 ? 
                               (inviteusername && inviteusername.replace('[','').replace(']','').replace('邀请','')) : '',
                    // 时间
                    addGroupTime: (new Date()).getTime(),
                    // 加群说明
                    addGroupDesc: addGroupDesc, 
                    // 新增一个消息id的key
                    msgidKey: _from_id, // 消息id(便于前端在消息页查找记录)
                };
                // 处理链接: 点击跳转到群成员进群审批页面
                message.redirect = {
                    url:`/pages/setpageInfo/setpageInfo?action=applyAddGroup&title=${encodeURIComponent('加群申请')}&id=${group_id}&name=${encodeURIComponent(group.name)}&avatar=${encodeURIComponent(group.avatar)}&chatType=group&applyUserid=${user_id}&applyUsername=${AdduserName}&applyUseruuid=${Adduseruuid}&applyUseravatar=${encodeURIComponent(AdduserAvatar)}&applydesc=${encodeURIComponent(JSON.stringify(_desc))}`, // 处理链接地址
                    type: 'navigateTo', // 处理链接类型
                    // 附加信息
                    desc:_desc,
                };
                // 在消息页作为新的通知消息处理，不要和群通知放一起
                // 这个消息仅发给群主即可
                message.to_id = group_user_id; // 群主id
                message.to_name = group_user_name; // 群主名称
                message.to_avatar = group_user_avatar; // 群主头像
                message.chatType = 'single'; // 聊天类型 
                message.type = 'text'; // 消息类型 系统通知消息
                message.from_name = '加群处理';
                message.data.data = `请处理申请 ${inviteusername}[${user.nickname || user.username}] 加入了群[${group.name}]` ;
                // 新增一个消息id的key
                message.msgidKey = _from_id; // 消息id(便于前端在消息页查找记录)

                // 推送
                /*
                // 单进程
                // 拿到群主的socket
                let you_socket = ctx.app.ws.chatuser[group_user_id];
                if (!you_socket) {
                    // 放到reids，设置消息列表中：key值是：'chat_getmessage_' + group_user_id（用户id）
                    this.service.cache.setList('chat_getmessage_' + group_user_id, message);
                } else {
                    // 如果群主在线，则直接推送给对方
                    you_socket.send(JSON.stringify({
                        type: 'singleChat',
                        data: message,
                        timestamp: Date.now(),
                    }));
                    // 存储到对方redis历史记录中【无需存储因为是系统发的】
                    // key: `chatlog_对方id_[single|group]_我的id`
                    // this.service.cache.setList(`chatlog_${group_user_id}_${message.chatType}_${me.id}`, message);
                }
                */
                // 多进程
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                ctx.chatWebsocketSendOrSaveMessage(group_user_id, message, true, false);
            }
        
        }else{
           // 其他情况，根据业务需求操作
        }

    }


    // 修改我在群里面的昵称（登录用户和游客都有这个功能）
    async groupnickname(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            nickname: {
                type: 'string', 
                required: true, 
                // defValue: '', 
                desc: '群昵称', 
                range:{
                    min:1,
                    max:20,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿参数
        let { id,nickname } = ctx.request.body;
        // 查我是否在这个群里面，并拿到我的信息
        let group_user = await app.model.GroupUser.findOne({
            where:{
                group_id: id, // 群id
                user_id: me_id, // 用户id
                status:1, // 状态
            },
        });

        if(!group_user){
            return ctx.apiFail('你不在该群聊中，无法修改昵称');
        }

        // 修改我的昵称
        group_user.nickname = nickname;
        await group_user.save();

        // 返回
        ctx.apiSuccess('ok');
    }

    // 删除群（群主可操作）或退出群（群成员可操作）
    async groupDeleteOrQuit(){ 
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿参数
        let { id } = ctx.request.body;
        // 1. 看一下群是否存在
        let group = await app.model.Group.findOne({
            where:{
                id: id, // 群id
                // status:1, // 状态
            },
            attributes:{
                exclude:['update_time'],
            },
            include:[{
                //关联群用户表
                model:app.model.GroupUser,
                attributes:{
                    exclude:['update_time'],
                },
                // 根据user_id 关联用户表，因为可能GroupUser中没有设置昵称和头像
                include:[{
                    model:app.model.User,
                    attributes:['id','username','avatar','nickname'],
                }],
            }],
        });
        if(!group){
            return ctx.apiFail('群不存在');
        }

        // 2. 我是否在群里
        let me_index = group.group_users.findIndex(v => v.user_id == me_id);
        if(me_index == -1){
            return ctx.apiFail('你不在该群聊中，操作失败');
        }

        // 3. 我是不是群主
        let is_group_owner = false;
        if(group.user_id == me_id){
            is_group_owner = true;
        }

        // 4. 处理及设置处理类型
        let dotype = '';
        if(is_group_owner){
            // 我是群主，删除群
            dotype = 'deleteGroup';
            await group.destroy();
        }else{
            // 我不是群主, 退出群
            dotype = 'quitGroup';
            let group_user = await app.model.GroupUser.findOne({
                where:{
                    group_id: id, // 群id
                    user_id: me_id, // 用户id
                    // status:1, // 状态
                },
            });
            // if(!group_user){
            //     return ctx.apiFail('你不在该群聊中，操作失败');
            // }
            await group_user.destroy();
        }

        // 5. 推送给群成员（删除群(解散群)推送给所有人，某个成员退群可通知群主）
        // 拿一下我的昵称和头像
        // 我在群里的昵称: 优先拿我在群里设置的昵称，没有则拿我自己的昵称，在没有则拿账号名
        let me_group_nickname = group.group_users[me_index].nickname || me.nickname || me.username;
        // 我在群聊的头像：优先拿我在群里的头像，没有则拿我自己的头像
        let me_group_avatar = group.group_users[me_index].avatar || me.avatar;

        // 6. 定义推送信息格式
        let message = { 
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: me_group_avatar || me.avatar, // 发送者头像
            from_name: me_group_nickname || me.nickname || me.username, // 发送者名称
            from_id: me.id, // 发送者id
            to_id: group.id, // 群id
            to_name: group.name, // 群名称
            to_avatar: group.avatar, // 群头像
            chatType: 'group', // 聊天类型 群聊
            type: 'systemNotice', // 消息类型 系统通知消息
            data: {
                data: ``, // 消息内容--根据情况自定义
                dataType: false, 
                otherData: null,
            }, // 消息内容
            options: {}, // 其它参数
            create_time: (new Date()).getTime(), // 创建时间
            isremove: 0, // 0未撤回 1已撤回
            // 群相关信息
            group: group, 
        };

        // 7. 根据处理情况自定义消息内容
        switch (dotype) {
            case 'deleteGroup':
                message.data.data = `群主于 ${(new Date()).toLocaleString()} 解散了该群`;
                break;
            case 'quitGroup':
                message.data.data = `${me_group_nickname}于 ${(new Date()).toLocaleString()} 已退出群聊`;
                break;
        }

        // 8. 根据处理情况自定义推送对象
        if(dotype == 'deleteGroup'){
            // 解散群，推送给群里面所有成员
            group.group_users.forEach(v => {
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
            });
        }else if(dotype == 'quitGroup'){
            // 退群， 只推送给群主
            // 拿到群主id
            let group_owner_id = group.user_id;
            // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
            ctx.chatWebsocketSendOrSaveMessage(group_owner_id, message);
        }

        // 9. 返回
        return ctx.apiSuccess('ok');
    }

    // 生成群二维码（登录用户和游客都有这个功能）
    async groupQrcode(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            type:{
                type: 'string',
                required: false,
                defValue: '',
                desc: '平台类型', // 针对h5端使用
            },
            http:{
                type: 'string',
                required: false,
                defValue: '',
                desc: '网址域名', // 针对h5端使用
            },
            chatType:{
                type: 'string',
                required: false,
                defValue: '',
                desc: '聊天类型', // 针对h5端使用
            }
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿id
        let { id } = ctx.params;
        let type = ctx.query.type ? ctx.query.type : '';
        let http = ctx.query.http ? ctx.query.http : '';
        let chatType = ctx.query.chatType ? ctx.query.chatType : '';
        // 查看群是否存在并且我是否在群里
        let group = await app.model.Group.findOne({
            where:{
                id: id, // 群id
                status:1, // 状态
            },
            attributes:{
                exclude:['update_time'],
            },
            include:[{
                //关联群用户表
                model:app.model.GroupUser,
                attributes:{
                    exclude:['update_time'],
                },
                where:{
                    user_id: me_id, // 用户id
                    group_id: id, // 群id
                    status:1, // 状态
                },
                // 根据user_id 关联用户表，因为可能GroupUser中没有设置昵称和头像
                include:[{
                    model:app.model.User,
                    attributes:['id','username','avatar','nickname'],
                }],
            }],
        });

        if(!group){
            return ctx.apiFail('群不存在或被封禁或者您不在该群聊中');
        }


        // 返回二维码
        if(type && type == 'H5' && http && chatType){
            // 生成H5端的二维码，即完整的网页地址
            if(chatType == 'group'){
               // 生成添加群的二维码地址
               let url = `${http}#/pages/setpageInfo/setpageInfo?action=autoAddGroup&title=${encodeURIComponent('群介绍')}&id=${group.id}&chatType=${chatType}`;
               console.log('生成添加群的二维码地址',url);
               ctx.createQrcode(url);
            }else if(chatType == 'single'){
               // 添加添加个人的二维码地址
            }
        }else{
            // 生成app和小程序端的二维码
            ctx.createQrcode(JSON.stringify({
                id: group.id,
                name: group.name,
            }));
        }
    }


}

module.exports = ChatgroupController;

```


### 8. 控制器 `/app/controller/api/chat/goodfriendapply.js` 代码调整
将里面的发websocket消息的方法换成文件 `app/extend/context.js` 中通用处理`单进程`和`多进程`发消息方法：`通用发送websocket消息方法:` `chatWebsocketSendOrSaveMessage` <br/>

以下是控制器完整代码：<br/>

```js
'use strict';

const Controller = require('egg').Controller;

// 引入 uuid 库 `npm install uuid`
const { v4: uuidv4 } = require('uuid');

class GoodfriendapplyController extends Controller {
    //申请添加好友 （登录用户才能申请添加好友，（游客）申请添加好友）
    async applyfriend() {
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            friend_id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '我申请添加的好友id', //字段含义
                range:{
                    min:1,
                }
            },
            nickname: {
                type: 'string',  //参数类型
                required: false, //是否必须
                defValue: '', 
                desc: '我的昵称或者说明', //字段含义
                range:{
                    min:1,
                    max:50,
                }
            },
        });
        // 拿数据
        let {friend_id,nickname} = ctx.request.body;
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 不能添加自己为好友
        if(me_id == friend_id){
            return ctx.apiFail('不能添加自己为好友');
        }
        // 添加的好友是否存在
        const friend = await app.model.User.findOne({
            where:{
                id:friend_id,
                status:1, // 用户状态 1正常 0禁用
            }
        });
        if(!friend){
            return ctx.apiFail('添加的好友不存在');
        }
        // 添加的申请记录是否存在
        const apply = await app.model.Goodfriendapply.findOne({
            where:{
                user_id:me_id,
                friend_id,
                // 正在申请的，和通过申请的没必要再次申请
                status:['pending','agree'], 
            }
        });
        if(apply){
            return ctx.apiFail('您已经申请过了，请勿重复申请');
        }
        // 创建申请记录
        await app.model.Goodfriendapply.create({
            user_id:me_id,
            friend_id,
            nickname,
            status:'pending',
        });
        // return ctx.apiSuccess('ok');
        ctx.apiSuccess('ok');

        // websocket 通知
        // 消息格式
        let _from_id = `redirect-applyFriend-${me_id}`;
        let message = {
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: 'https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/group.png', // 发送者头像
            from_name: '好友申请提醒', // 发送者名称
            from_id: _from_id, // 发送者id 系统id或者类型
            to_id: friend_id, // 接收者id  
            to_name: friend.nickname || friend.username, // 接收者名称
            to_avatar: friend.avatar, // 接收者头像
            chatType: 'single', // 聊天类型 单聊
            type: 'text', // 消息类型 系统通知消息
            data: {
                data: `用户[${me.nickname || me.username}]申请添加您为好友，请尽快处理`,
                dataType: false,
                otherData: null,
            }, // 消息内容
            // 新增处理链接
            redirect: {
                url:'/pages/applyMyfriend/applyMyfriend', // 处理链接地址
                type: 'navigateTo', // 处理链接类型
            }, // 处理链接
            options: {}, // 其它参数
            create_time: (new Date()).getTime(), // 创建时间
            isremove: 0, // 0未撤回 1已撤回
            // 群相关信息
            // group: {
            //     user_id: 'fromSystemId',
            //     remark: '',
            //     invite_confirm: 0,
            // }, 
            // 新增一个消息id的key
            msgidKey: _from_id, // 消息id(便于前端在消息页查找记录)
        };

        /*
        // 单进程发送消息
        // 拿到对方的socket
        let you_socket = ctx.app.ws.chatuser[friend_id];
        // 申请添加的好友正好在线  推送给对方
        // 如果拿不到对方的socket， 则把消息放在redis队列中， 等待对方上线时，再发送
        if (!you_socket) {
            // 放到reids，设置消息列表中：key值是：'chat_getmessage_' + friend_id（用户id）
            this.service.cache.setList('chat_getmessage_' + friend_id, message);
        } else {
            // 如果对方在线，则直接推送给对方
            you_socket.send(JSON.stringify({
                type: 'singleChat',
                data: message,
                timestamp: Date.now(),
            }));
            // 存储到对方redis历史记录中
            // key: `chatlog_对方id_[single|group]_我的id`
            // this.service.cache.setList(`chatlog_${friend_id}_${message.chatType}_${me.id}`, message);
        }
        */

        // 多进程发送消息
        // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
        ctx.chatWebsocketSendOrSaveMessage(friend_id, message, true, false);

    }

    // 获取别人申请我为好友的列表数据（登录用户才行，（游客）不能）
    async listapplyfriend(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            page: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '页码', //字段含义
                range:{
                    min:1,
                }
            },
            limit: {
                type: 'int',  //参数类型
                required: false, //是否必须
                defValue: 10, 
                desc: '每页多少条', //字段含义
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿页码
        let page = ctx.params.page ? parseInt(ctx.params.page) : 1;
        // 每页多少条
        let limit = ctx.query.limit ? parseInt(ctx.query.limit) : 10;
        // 偏移量
        let offset = (page - 1) * limit; 
        // 拿数据
        let data = await app.model.Goodfriendapply.findAll({
            where:{
                friend_id:me_id,// 别人申请我为好友
            },
            offset,
            limit,
            include:[
                {
                    model:app.model.User,// 关联用户表
                    attributes:['id','username','avatar','nickname','uuid'],
                }
            ],
            order:[
                ['id','desc'], // 按id降序排列
            ],
        });
        // 获取状态是'pending' 等待处理的数据条数
        let pendingCount = await app.model.Goodfriendapply.count({
            where:{
                friend_id:me_id,
                status:'pending',
            },
        });
        ctx.apiSuccess({
            alldata:data,
            pendingCount:pendingCount,
        });
    }

    // 对申请加我为好友的信息进行处理（登录用户才行，（游客）不能）
    // 实际是同意的情况下，向 goodfriend表插入数据
    async handleapply(){ 
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '申请表的id', //字段含义
                range:{
                    min:1,
                }
            },
            nickname: {
                type: 'string',  //参数类型
                required: false, //是否必须
                defValue: '', 
                desc: '好友备注', //字段含义
                range:{
                    min:1,
                    max:50,
                }
            },
            status: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '处理状态', //字段含义
                range:{
                    in:['pending', 'refuse', 'agree', 'ignore'],
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 当前申请id的数据是否存在
        let id = parseInt(ctx.params.id);
        let goodfriendapply = await app.model.Goodfriendapply.findOne({
            where:{
                id,
                friend_id:me_id,  // 谁可以处理：我
                status:'pending', // 状态需是 'pending'
            },
            include:[
                {
                    model:app.model.User,// 关联用户表，查的是申请加我为好友的用户信息user_id
                    attributes:['id','username','avatar','nickname','uuid'],
                }
            ],
        });
        if(!goodfriendapply){
            return ctx.apiFail('申请不存在或已处理');
        }
        // console.log('处理的申请信息',goodfriendapply);
        // 拿参数
        let { nickname, status} = ctx.request.body;
        // 接下来处理这么几步：
        // 1. 设置申请表`goodfriendapply`的状态
        // 2. 将同意状态下的信息写入我的好友表 `goodfriend`
        // 3. 同时将我的信息写入对方的好友表 `goodfriend`
        // 4. 上面三步要全部能够完成，如果其中一步出现错误，则应该回滚操作、
        // 因此上述操作，我们应该用事务进行处理
        // 定义事务
        let tansaction;
        try {
            // 开启事务
            tansaction = await app.model.transaction();
            // 事务处理逻辑
            // 1. 设置申请表`goodfriendapply`的状态
            //goodfriendapply.status = status; await goodfriendapply.save();
            await goodfriendapply.update({
                status:status,
            },{transaction:tansaction});
            // 2. 将同意状态下的对方信息写入我的好友表 `goodfriend`
            // 3. 同时将我的信息写入对方的好友表 `goodfriend`
            if(status == 'agree'){
                // 先判断一下我的好友表`goodfriend`中有没有对方
                let meHasHim = await app.model.Goodfriend.findOne({
                    where:{
                        user_id:me_id, // 我
                        friend_id: goodfriendapply.user_id, // 申请人
                    }
                });
                // 如果我的好友中没有对方
                if(!meHasHim){
                    // 则将对方的信息异步写入我的好友表
                    await app.model.Goodfriend.create({
                        user_id:me_id, // 我
                        friend_id: goodfriendapply.user_id, // 申请人
                        nickname:nickname, // 申请人昵称
                    },{transaction:tansaction});
                }

                // 先判断一下对方好友表`goodfriend`中有没有我
                let himHasMe = await app.model.Goodfriend.findOne({
                    where:{
                        user_id:goodfriendapply.user_id, // 申请人，对方好友
                        friend_id: me_id, // 我
                    }
                });
                // console.log('对方好友有没有我', himHasMe);
                // 如果对方好友没有我
                if(!himHasMe){
                    // 则将我的信息异步写入对方的好友表
                    await app.model.Goodfriend.create({
                        user_id:goodfriendapply.user_id, // 申请人，对方好友
                        friend_id: me_id, // 我
                        nickname:me.nickname, // 我的昵称
                    },{transaction:tansaction});
                }
            }

            //提交事务
            await tansaction.commit();
            // 反馈
            // return ctx.apiSuccess('ok');
            ctx.apiSuccess('ok');

            // websocket 通知
            if(status == 'agree'){
                // 消息格式 --- 先推给对方（申请加我的好友）
                let message = {
                    id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
                    from_avatar: me.avatar, // 发送者头像
                    from_name: me.nickname || me.username, // 发送者名称
                    from_id:  me_id, // 发送者id 系统id或者类型
                    to_id: goodfriendapply.user_id, // 接收者id  
                    to_name: nickname ||  goodfriendapply.user.nickname || goodfriendapply.user.username, // 接收者名称
                    to_avatar: goodfriendapply.user.avatar, // 接收者头像
                    chatType: 'single', // 聊天类型 单聊
                    type: 'systemNotice', // 消息类型 系统通知消息
                    data: {
                        data: `我们已经是好友了，可以开始聊天了`,
                        dataType: false,
                        otherData: null,
                    }, // 消息内容
                    options: {}, // 其它参数
                    create_time: (new Date()).getTime(), // 创建时间
                    isremove: 0, // 0未撤回 1已撤回
                    // 群相关信息
                    // group: {
                    //     user_id: 'fromSystemId',
                    //     remark: '',
                    //     invite_confirm: 0,
                    // }, 
                };
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                ctx.chatWebsocketSendOrSaveMessage(goodfriendapply.user_id, message);

                // 消息格式 --- 再推给我自己（跟上面刚好相反, 发送人成了对方，我成了接收方）
                message.from_avatar = goodfriendapply.user.avatar; // 发送者头像
                message.from_name = nickname ||  goodfriendapply.user.nickname || goodfriendapply.user.username; // 发送者名称
                message.from_id = goodfriendapply.user_id; // 发送者id 系统id或者类型
                message.to_id = me_id ; // 接收者id  
                message.to_name = me.nickname || me.username; // 接收者名称
                message.to_avatar = me.avatar; // 接收者头像
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                ctx.chatWebsocketSendOrSaveMessage(me_id, message);
            }
            
        } catch (error) {
            // 失败则回滚
            await tansaction.rollback();
            // 反馈
            return ctx.apiFail('系统异常，请稍后再试');
        }
        
    }
    
}

module.exports = GoodfriendapplyController;
```
































































































