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
                { path: '/api/chat/getUserSetInfo', method: 'POST' },    // 获取用户一些设置信息如：加好友设置、聊天设置等
                { path: '/api/chat/applyfriend', method: 'POST' },    // 放开一步，游客可以添加好友
                { path: '/api/chat/autoAddFriendAndAgree', method: 'POST' },    //自动添加好友并通过（前提是invite_confirm：0）
                { path: '/api/chat/ismygoodfriend', method: 'POST' },    // 查对方是否是我的好友
                { path: '/api/chat/userset', method: 'POST' },    // 和我聊天设置-条数限制
                { path: '/api/chat/deletegoodfriend', method: 'POST' },    // 删除好友

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
                    // 检查redis中是否有标记 - 类似修改：昵称、头像、设置等不要推送消息、否则就是异地登录 
                    const redisKey = `user:modify:${user.id}`;
                    const isSelfModify = await ctx.app.redis.get(redisKey);
                    if (!isSelfModify) {
                        // 当前时间
                        const currentTime = ()=> {
                            const now = new Date();
                            const year = now.getFullYear();       
                            const month = now.getMonth() + 1;     
                            const day = now.getDate();            
                            const hh = now.getHours();            
                            const mm = now.getMinutes();          
                            const ss = now.getSeconds();
                            let clock = year + "年";
                            if(month < 10) clock += "0";
                            clock += month + "月";
                            if(day < 10) clock += "0";
                            clock += day + "日 ";
                            if(hh < 10) clock += "0";
                            clock += hh + ":";
                            if (mm < 10) clock += '0'; 
                            clock += mm + ":"; 
                            if (ss < 10) clock += '0';
                            clock += ss;
                            return(clock); 
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
                    }else {
                        console.log('用户修改账号昵称头像设置等一般信息，不发送异地登录提示');
                        // 删除redis标记，避免影响后续判断
                        await ctx.app.redis.del(redisKey);
                    }
                }
            }
            // 5.存储新连接
            ctx.app.ws.chatuser[user.id] = ctx.websocket;
            ctx.websocket.chatuser_id = user.id;
  
            // 执行 `/app/extend/context.js`文件中的`online`方法
            // 6.用户上线 - 包含其它设备的下线通知
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
> 7. 新增方法: `通用存储聊天消息记录到redis中的key值自定义：带文件夹存储` `setRedisChatlogKey`
> 8. 新增方法: `通用数据存储到redis自定义方法` `setRedisDiy`

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
   * @param {string} [options.chatlog = 'chatlog'] - 模拟文件夹名称(可以是其他名称) - 默认：'chatlog'
   * @param {boolean} [options.saveLog_you = true] - 是否把消息存储到对方的redis记录中 - 默认：true
   * @param {boolean} [options.saveLog_me = false] - 是否把消息存储到自己的redis记录中 - 默认：false
   * @returns {void}  - 无返回值
   */
  async chatWebsocketSendOrSaveMessage(sendto_id, message, 
    offlineSave = true, saveLog_sendto_id = true, options) {
    // 参数初始化
    let _saveLog_you = options && options.saveLog_you != undefined ? options.saveLog_you : true;
    let _saveLog_me = options && options.saveLog_me != undefined ? options.saveLog_me : false;
    options = {
      offlineSaveKey: (options && options.offlineSaveKey) || 'chat_getmessage_', // 消息队列KEY值前缀
      chatlog: (options && options.chatlog) ||  `chatlog`, // 模拟文件夹名称
      saveLog_you: _saveLog_you, // 是否把消息存储到对方的redis记录中 - 默认：true
      saveLog_me: _saveLog_me, // 是否把消息存储到自己的redis记录中 - 默认：false
    }
    // 1. 注意此处的this指的是ctx
    const { app, service } = this;
    // 2. 我的信息
    const me = this.chat_user;
    const me_id = me && me.id;
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
            // 可异步存储或者同步存储
            this.setRedisDiy(sendto_id, message, options.saveLog_you, options.saveLog_me, options.chatlog);
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
        /*
        console.log('同一进程内同一个账号下线不同socket链接设备');
        // 查找同一用户的其他连接 - 获取当前进程中的所有连接
        const connections = this.app.ws.chatuser || {};
        for (const [userId, socket] of Object.entries(connections)) {
          console.log(`同一个进程内的userId：${userId} 和 chatuser_id：${chatuser_id} 和socket信息：${socket}`);
          console.log(`同一个进程内的parseInt(userId) === chatuser_id`, parseInt(userId) === chatuser_id);
          console.log(`同一个进程内的socket !== this.websocket`, socket !== this.websocket);
          // if (parseInt(userId) === chatuser_id && socket !== this.websocket) {
          // 发现：parseInt(userId) === chatuser_id 时候 socket !== this.websocket 为false 即同一个socket链接
          // 所以if判断无法实现，这跟socket设计有关，所以代码做了注释，关于下线提示在前端完成
          //   if (chatuser.role === 'user') {
          //     // 关闭旧socket连接 - 但不能删除 this.app.ws.chatuser[userId];
          //     socket.close();
          //   }
          // }
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
        from_id: args.from_id !== undefined ? args.from_id : _from_id, // 发送者id 系统id或者类型
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
        msgidKey: args.from_id !== undefined ? args.from_id : _from_id, // 消息id(便于前端在消息页查找记录)
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
  },


  // 存储聊天消息记录到redis中的key值自定义
  /**
   * 通用存储聊天消息记录到redis中的key值自定义：带文件夹存储
   * @param {number} sendto_id - 要发送消息给谁的用户ID  - 必填
   * @param {Object} message - 消息内容 - 必填
   * @param {string} folder - 文件夹参数 - 可不填 - 默认：'chatlog'
   * @param {string} [message.chatType] - 从message中定义传过来，要是不传 - 默认：`TO`
   * @returns {Object}  - 返回我和对方的redis存储的key值
   */
  async setRedisChatlogKey(sendto_id, message, folder = 'chatlog'){
    // 1. 注意此处的this指的是ctx
    const { app, service } = this;
    // 2. 我的信息
    const me = this.chat_user;
    const me_id = me && me.id;
    // 3. 定义返回值
    let keyReturn = {};
    // 4. 根据message中是否有chatType来判断，均返回我和对方的key值
    // 如果没有message.chatType 则定义一个默认的chatType，如：`TO`
    message.chatType = message.chatType || 'TO';
    // 5. key值存储方式, 类似模拟文件夹： `文件夹/key值`
    let _folder = folder; // 模拟文件夹名称，不传则默认为 `chatlog`
    // 存储模式：使用冒号 : 作为分隔符来创建命名空间
    // 1. 对方的key值
    let you_key = `${_folder}_${sendto_id}_${message.chatType}_${me_id}`;
    let youKey = `${_folder}:${you_key}`;
    // 2. 我的key值
    let me_key = `${_folder}_${me_id}_${message.chatType}_${sendto_id}`;
    let meKey = `${_folder}:${me_key}`;
    // 3. 返回值
    keyReturn = {
        youKey,
        meKey,
        _folder
    };
    return keyReturn;
  },

  // 通用数据存储到redis自定义方法
  /**
   * 通用数据存储到redis自定义方法
   * @param {number} sendto_id - 要发送消息给谁的用户ID  - 必填
   * @param {Object} message - 消息内容 - 必填
   * @param {boolean} saveLog_you - 是否把消息存储到对方的redis中 - 可不填 - 默认：true
   * @param {boolean} saveLog_me - 是否把消息存储到我的redis中 - 可不填 - 默认：true
   * @param {string} folder - 存入redis的模拟文件夹名称 - 可不填 - 默认：'chatlog'
   * @returns {void}  - 无返回值
   */
  async setRedisDiy(sendto_id, message, saveLog_you = true, saveLog_me = true, folder = 'chatlog'){
      // key: `chatlog_对方id_[single|group]_我的id`
      // 第一种存储方式：直接存在 redis客户端Keys中，打开就能看见
      // this.service.cache.setList(`chatlog_${sendto_id}_${message.chatType}_${me.id}`, message);
      // 第二种存储方式, 类似： `文件夹/key值`
      // 获取Key值, 调用：setRedisChatlogKey(sendto_id, message, folder = 'chatlog')
      let {youKey, meKey, _folder} = await this.setRedisChatlogKey(sendto_id, message, folder);
      // 1. 存储对方的聊天记录
      if(saveLog_you){
        this.service.cache.setList(youKey, message);
      }
      // 第二种存储方式获取
      // const messages = await this.service.cache.getList(youKey, true);
      // 第二种存储方式删除
      // await this.service.cache.remove(youKey);
      // 第二种存储方式批量操作
      // 1. 如批量操作 - 可以使用 Redis 的 KEYS 或 SCAN 命令：
      /*
      // ①：获取所有聊天记录键 -- 实际就是获取文件夹名称，后面模糊匹配
      const allChatKeys = await this.app.redis.keys(`${_folder}:*`);
      // 如何进行删除：
      for (const key of allChatKeys) {
          await this.app.redis.del(key);
      }
      */
      /*
      // ②：删除某个用户（sendto_id）的所有聊天记录（与所有人单聊、与所有群聊记录）
      // 这个地方可以做匹配，如： `${_folder}:${_folder}_${sendto_id}:*`， 当然也可以精确指定 youKey
      const userChatKeys = await this.app.redis.keys(`${_folder}:${_folder}_${sendto_id}:*`);
      for (const key of userChatKeys) {
          await this.app.redis.del(key);
      }
      */
      // 2. 存储我的聊天记录
      if(saveLog_me){
        this.service.cache.setList(meKey, message);
      }
  },

  
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
1. 将里面的发websocket消息的方法换成文件 `app/extend/context.js` 中通用处理`单进程`和`多进程`发消息方法：`通用发送websocket消息方法:` `chatWebsocketSendOrSaveMessage` <br/>
2. 统一针对用户角色`visitor 游客` 和 `user 用户` 进行websocket消息发送来初始化消息页；<br/>

> 内容较多，去新页面查看：<br/>
<a href="/fourthless/w-a/eggjs.即时通讯webscoket发消息的控制器.html#一、websocket发消息的控制器方法汇总-控制器-app-controller-api-chat-chatwebsocket-js-完整代码" target="_blank">一、websocket发消息的控制器方法汇总</a><br/>



### 6. 控制器 `/app/controller/api/chat/chatuser.js` 代码调整
将里面的发websocket消息的方法换成文件 `app/extend/context.js` 中通用处理`单进程`和`多进程`发消息方法：`通用发送websocket消息方法:` `chatWebsocketSendOrSaveMessage` <br/>

> 内容较多，去新页面查看：<br/>
<a href="/fourthless/w-a/eggjs.即时通讯单聊相关方法.html#一、单聊相关方法汇总" target="_blank">一、单聊相关方法汇总(控制器 `/app/controller/api/chat/chatuser.js` 完整代码)</a><br/>







### 7. 控制器 `/app/controller/api/chat/chatgroup.js` 代码调整
将里面的发websocket消息的方法换成文件 `app/extend/context.js` 中通用处理`单进程`和`多进程`发消息方法：`通用发送websocket消息方法:` `chatWebsocketSendOrSaveMessage` <br/>

> 内容较多，去新页面查看：<br/>
<a href="/fourthless/w-a/eggjs.即时通讯群聊相关方法及路由.html#一、群聊相关方法汇总" target="_blank">一、群聊相关方法汇总(控制器 `/app/controller/api/chat/chatgroup.js` 完整代码)</a><br/>









### 8. 控制器 `/app/controller/api/chat/goodfriendapply.js` 代码调整
将里面的发websocket消息的方法换成文件 `app/extend/context.js` 中通用处理`单进程`和`多进程`发消息方法：`通用发送websocket消息方法:` `chatWebsocketSendOrSaveMessage` <br/>

> 内容较多，去新页面查看：<br/>
<a href="/fourthless/w-a/eggjs.goodfriendapply.js控制器完整代码.html#一、好友申请相关方法汇总-控制器-app-controller-api-chat-goodfriendapply-js-完整代码" target="_blank">一、好友申请相关方法汇总(控制器 /app/controller/api/chat/goodfriendapply.js 完整代码)</a><br/>







### 9. 关于各种api路由 `/app/router/api/chat/router.js` 汇总

```js
module.exports = app => {
    const { router, controller } = app;
    //用户登录
    router.post('/api/loginChat', controller.api.chat.chatuser.userlogin);
    //用户注册
    router.post('/api/regChat', controller.api.chat.chatuser.userregister);
    //用户退出登录
    router.post('/api/chat/logout', controller.api.chat.chatuser.userlogout);
    // 系统给游客用户注册身份
    router.post('/api/visitorRegister', controller.api.chat.chatuser.visitorRegister);
    // 游客用户正式注册身份
    router.post('/api/visitorregChat', controller.api.chat.chatuser.visitorregChat);
    // 游客用户正式登录身份
    router.post('/api/visitorloginChat', controller.api.chat.chatuser.visitorloginChat);
    //搜索用户（登录用户才能搜索用户，未登录用户（游客）不能搜索用户）
    router.post('/api/chat/searchUser', controller.api.chat.chatuser.searchUser);
    // 查看用户信息(公共接口，游客和登录用户都可以访问)
    router.get('/api/userinfo/:uuid', controller.api.chat.chatuser.userinfo);
    // 查看用户是否申请加我为好友（登录用户有这个权限，游客无权限）
    router.post('/api/chat/isApplyfriend/:uuid', controller.api.chat.chatuser.isApplyfriend);
    // 用户设置更新（登录用户有这个权限，游客无权限）
    router.post('/api/chat/userset', controller.api.chat.chatuser.userset);
    

    //申请添加好友 （登录用户才能申请添加好友，（游客）不能申请添加好友）
    router.post('/api/chat/applyfriend', controller.api.chat.goodfriendapply.applyfriend);
    // 获取别人申请我为好友的列表数据（登录用户才行，（游客）不能）
    router.get('/api/chat/listapplyfriend/:page', controller.api.chat.goodfriendapply.listapplyfriend);
    // 对申请加我为好友的信息进行处理（登录用户才行，（游客）不能） 传一个申请表的id
    router.post('/api/chat/handleapply/:id', controller.api.chat.goodfriendapply.handleapply);

    // 好友列表（登录用户才行，（游客）不能）
    router.get('/api/chat/goodfriendlist/:page', controller.api.chat.goodfriend.goodfriendlist);
    // 查看好友资料信息（登录用户才可以查看好友资料信息，（游客）没有这个功能）, 传好友id
    router.get('/api/chat/getgoodfriendinfo/:id', controller.api.chat.goodfriend.getgoodfriendinfo);
    //将好友移入移出黑名单（登录用户有将好友移入移出黑名单功能，（游客）没有这个功能），传好友id
    router.post('/api/chat/setblackgoodfriend/:id', controller.api.chat.goodfriend.setblackgoodfriend);
    //将好友设置为星标好友或者取消（登录用户有设置为星标好友或者取消功能，（游客）没有这个功能），传好友id
    router.post('/api/chat/setstargoodfriend/:id', controller.api.chat.goodfriend.setstargoodfriend);
    // 设置我和朋友是否可以互相查看对方发布的信息或者朋友圈（登录用户有这个功能，（游客）没有这个功能），传好友id
    router.post('/api/chat/setmeOrfriendCanSee/:id', controller.api.chat.goodfriend.setmeOrfriendCanSee);
    // 查看对方是否是我的好友（登录用户才可以查看好友资料信息，（游客）没有这个功能），传好友id
    router.post('/api/chat/ismygoodfriend/:id', controller.api.chat.goodfriend.ismygoodfriend);


    // 创建群聊（登录用户有这个功能，（游客）没有这个功能）
    router.post('/api/chat/group/create', controller.api.chat.chatgroup.creategroup);

    // 用户(我)上线后获取离线消息（登录用户和游客都有这个功能）
    router.post('/api/chat/chatGetmessageOffLine', controller.api.chat.chatwebsocket.chat_getmessage_OffLine);

    // 群聊列表（登录用户和游客都有这个功能）
    router.get('/api/chat/grouplist/:page', controller.api.chat.chatgroup.grouplist);

    // 获取群资料信息（登录用户和游客都有这个功能）
    router.get('/api/chat/groupinfo/:id', controller.api.chat.chatgroup.groupinfo);

    // 修改群名称（群主才有这个功能）
    router.post('/api/chat/groupUpdateName', controller.api.chat.chatgroup.groupUpdateName);

    // 修改群公告（群主才有这个功能）
    router.post('/api/chat/groupremark', controller.api.chat.chatgroup.groupremark);

    // 删除群成员（群主才有这个功能）
    router.post('/api/chat/groupDeleteUser', controller.api.chat.chatgroup.groupDeleteUser);

    // 进群设置  （群主才有这个功能）
    router.post('/api/chat/groupAddUserSet', controller.api.chat.chatgroup.groupAddUserSet);

    // 同意或者拒绝用户进群（群主才有这个功能）
    router.post('/api/chat/groupAgreeOrNo', controller.api.chat.chatgroup.groupAgreeOrNo);

    // 邀请人进群(群主直接邀请，群成员邀请、游客自己进群根据群设置来处理)
    router.post('/api/chat/groupInviteUser', controller.api.chat.chatgroup.groupInviteUser);

    // 修改我在群里面的昵称（登录用户和游客都有这个功能）
    router.post('/api/chat/groupnickname', controller.api.chat.chatgroup.groupnickname);

    // 删除群（群主可操作）或退出群（群成员可操作）
    router.post('/api/chat/groupDeleteOrQuit', controller.api.chat.chatgroup.groupDeleteOrQuit);

    // 生成群二维码（登录用户和游客都有这个功能）
    router.get('/api/chat/groupQrcode/:id', controller.api.chat.chatgroup.groupQrcode);

    // 上传文件（图片视频等）到本地服务器（自定义文件路径）（登录用户和游客都有这个功能）
    router.post('/api/chat/uploadStreamSingleToServerDiy/:diydir', controller.upload.uploadStreamSingleToServerDiy); 
    // 上传文件（图片视频等）到阿里云存储（登录用户和游客都有这个功能）
    router.post('/api/chat/uploadAliyun',controller.admin.image.uniapp_uploadAliyunOSS);

    // 根据视频地址获取视频截图
    router.post('/api/chat/getVideoScreenshot',controller.video.getVideoScreenshot);

    // 撤回消息（游客和登录用户都有这个权限）
    router.post('/api/chat/revokeMessage',controller.api.chat.chatuser.revokeMessage);

    // 删除好友（登录用户有这个功能，（游客）没有这个功能），传好友id
    router.post('/api/chat/deletegoodfriend/:id', controller.api.chat.goodfriend.deletegoodfriend);

    // 修改账号信息（登录用户都有这个权限，游客根据情况有部分权限）
    router.post('/api/chat/updateUserinfo', controller.api.chat.chatuser.updateUserinfo);

    // 获取用户一些设置信息如：加好友设置、聊天设置等（登录用户有这个权限，游客无权限）
    router.post('/api/chat/getUserSetInfo', controller.api.chat.chatuser.getUserSetInfo);

    // 自动添加好友并通过（申请加好友和审核的合并逻辑，前提是invite_confirm：0，登录用户和游客均可）
    router.post('/api/chat/autoAddFriendAndAgree', controller.api.chat.goodfriendapply.autoAddFriendAndAgree);

    
};   

```























































































