---
navbar: true
sidebar: auto
title: eggjs即时通讯websocket处理
---

即时通讯我们需要用到`websocket`。`websocket`是`html5`提供的一种在单个`TCP`连接上进行全双工通讯的协议。

## 一、安装websocket插件
我们的eggjs框架也可以使用`websocket`，但是需要安装一个插件，插件地址：<https://www.npmjs.com/package/egg-websocket-plugin>

### 1. 安装插件
```bash
npm i egg-websocket-plugin --save
```
或者 通过 `yarn`安装
```bash
yarn add egg-websocket-plugin
```

### 2. 配置插件
在 `config/plugin.js` 文件中添加如下内容：
```js
...
//配置websocket插件
websocket : {
    enable: true,
    package: 'egg-websocket-plugin',
},
```

### 3. 配置websocket路由和中间件
说明：由于`websocket` 需要配合前端一起使用，大家暂时先讲下面大代码复制到项目，后面测试时候会讲这些代码。
1. 新建路由文件： `app/router/api/chat/websocket.js` 
```js
module.exports = app => {
    const { router, controller } = app;
    //配置websocket路由
    //配置websocket全局中间件
    app.ws.use(async (ctx, next) => {
        if (ctx.path !== '/ws') return next();

        console.log('WebSocket连接请求:', ctx.path, ctx.query);
        // 获取参数 ws://localhost:7001/ws?token=123456
        // ctx.query.token
        // 验证用户token
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

            if (!userCheck) {
                ctx.websocket.send(JSON.stringify({
                    msg: "fail",
                    data: '用户不存在'
                }));
                return ctx.websocket.close();
            }

            if (!userCheck.status) {
                ctx.websocket.send(JSON.stringify({
                    msg: "fail",
                    data: '你已被管理员禁用'
                }));
                return ctx.websocket.close();
            }

            // 单设备登录逻辑
            if (ctx.app.ws.chatuser && ctx.app.ws.chatuser[user.id]) {
                ctx.app.ws.chatuser[user.id].send(JSON.stringify({
                    msg: "force_logout",
                    data: '你的账号在其他设备登录'
                }));
                ctx.app.ws.chatuser[user.id].close();
            }

            // 存储连接
            ctx.app.ws.chatuser = ctx.app.ws.chatuser || {};
            ctx.websocket.chatuser_id = user.id;
            ctx.app.ws.chatuser[user.id] = ctx.websocket;

            // ctx.online(user.id);
            console.log(`用户 ${user.id} 连接成功`);

            // 进入控制器
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
        
      });
    // 链接websocket
    app.ws.route('/ws', controller.api.chat.chatwebsocket.connect);
    //发送消息 (游客，登录用户均可，只要token是正确的就行)
    //router.post('/api/chat/socket/sendmessage', controller.api.chat.chatwebsocket.sendmessage);
    //获取离线消息 (游客，登录用户均可，只要token是正确的就行)
    // router.post('/api/chat/socket/getmessage', controller.api.chat.chatwebsocket.getmessage);
    //上传文件 (游客，登录用户均可，只要token是正确的就行)
    // router.post('/api/chat/socket/upload', controller.api.chat.chatwebsocket.upload);
    //撤回消息 (游客，登录用户均可，只要token是正确的就行)
    // router.post('/api/chat/socket/recall', controller.api.chat.chatwebsocket.recall);
    
};
```

2. 在`主路由`引入这个路由文件
在 `app/router.js` 文件中添加如下代码：
```js
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  //分组
  ...
  //即时通讯的websocket路由
  require('./router/api/chat/websocket')(app);
  //即时通讯前端路由
  ...
  //即时通讯后端路由
  ...
  
  
  // 上传单个文件流模式到本地服务器
  ...
  // 自定义上传路径上传单个文件流模式到本地服务器
  ...
};
```

### 4. 新建控制器链接websocket
说明：由于`websocket` 需要配合前端一起使用，大家暂时先讲下面大代码复制到项目，后面测试时候会讲这些代码。 <br/><br/>
新建控制器 `app/controller/api/chat/chatwebsocket.js`
```js
'use strict';

const Controller = require('egg').Controller;

class ChatwebsocketController extends Controller {
    // 链接websocket
    async connect() {
        const { ctx, app, service } = this;
        console.log('链接websocket方法', ctx.websocket.chatuser_id);
        // 确保连接存在
        if (!ctx.websocket) {
            return ctx.apiFail('非法访问');
        }
        // console.log(`clients链接数: ${app.ws.clients.size}`);

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
        ctx.websocket.on('message', msg => {
            // 1. 添加消息类型检查
            if (typeof msg !== 'string') {
                if (Buffer.isBuffer(msg)) {
                    msg = msg.toString('utf-8'); // 转换二进制数据
                } else {
                    console.log('收到非文本消息，已忽略', msg);
                    return; // 忽略非文本消息
                }
            }
        
            console.log('监听消息', msg);
            
            try {
                const data = JSON.parse(msg);
        
                // 2. 添加对客户端心跳响应的处理
                if (data.type === 'pong') {
                    console.log('收到客户端心跳响应');
                    return;
                }
        
                // 3. 添加对客户端心跳请求的响应
                if (data.type === 'ping') {
                    ctx.websocket.send(JSON.stringify({ type: 'pong' }));
                    console.log('响应客户端心跳请求');
                    return;
                }
        
                // 处理其他消息类型...
            } catch (e) {
                // 4. 增强错误处理
                if (msg.includes('undefined')) {
                    console.warn('收到无效消息，可能来自连接断开事件');
                } else {
                    console.error('消息解析错误', e, '原始消息:', msg);
                }
            }
        });

        // 监听关闭
        ctx.websocket.on('close', (code, reason) => {
            console.log('用户下线', code, reason);
            clearInterval(heartbeatInterval); // 清除心跳

            const user_id = ctx.websocket.chatuser_id;
            //移除redis中的用户上线记录
            if (!user_id) return;

            // 安全移除用户记录
            if (ctx.app.ws.chatuser && ctx.app.ws.chatuser[user_id]) {
                delete ctx.app.ws.chatuser[user_id];
            }

            // 异步移除redis记录
            service.cache.remove('online_' + user_id).catch(console.error);
        });

        // 发送欢迎消息
        ctx.websocket.send(JSON.stringify({
            type: 'system',
            data: '欢迎您，登录可获取更多功能！',
            timestamp: Date.now()
        }));
    }
}

module.exports = ChatwebsocketController;

```

### 5. 讲新内容前的说明
1. 我们在上节课补充了关于未登录注册的用户，我们给他注册一个游客身份（具体查看：<a href="/fourthless/w-a/eggjs.即时通讯后台.html#三、给未登录用户创建一个游客身份" target="_blank">三、给未登录用户创建一个游客身份</a>），来满足他和我们的客服进行即时通讯的需求。在数据库我们新增了几个字段，我们重点讲了 `devicefingeruuid 设备标识（游客标识）`，关于其他几个字段都是做统计用的，为可选字段，大家如果有需要可以通过前端传过来，然后在数据库更新这几个字段，具体看控制器代码 <a href="/fourthless/w-a/eggjs.即时通讯后台.html#_1-游客用户注册身份" target="_blank">① 游客用户注册身份</a>。
2. 游客用户实际上就走了一遍注册用户和登录用户的流程，实际上会在本地存储相关信息，其中就包括`token`，但是我们的很多接口游客是没有权限的，但是游客有`token`，那么他可以操作这些接口显然是不对的，因此我们需要在中间件中新增一个判断：<br/>

### ① 中间件调整
在中间件 `app/middleware/chat_user_auth.js` 代码
```js
module.exports = (option, app) => {
    return async function chatUserAuth(ctx, next) {
        // 针对游客的操作
        //...
        
        // 即时通讯注册用户的登录验证
        // 1. 获取header头的token
        const { token } = ctx.header;
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
            ctx.throw(400, '您没有权限访问，请先注册或登录');  
        }

        // 5. 没什么问题了，把用户信息挂载到ctx上，方便调用
        ctx.chat_user = user;

        await next();
    }
}
```


### ② 查看用户资料
> 说明：<br/>
> 1. 在进行即时通讯之前，有用户申请加你为好友，你可以查看用户资料（`查看用户资料属于公共接口，游客和登录用户都可以访问`）。
> 2. 关于`搜索用户`，我们搜索的结果应该去掉`游客`和`自己`，注意调整搜索用户的条件 <a href="/fourthless/w-a/eggjs.即时通讯好友相关接口.html#一、-搜索用户-好友" target="_blank">一、 搜索用户（好友）</a>
#### 1. 接口说明
具体查看接口说明： <a href="/fourthless/w-a/eggjs.即时通讯接口.html#十六、查看用户资料" target="_blank">十六、查看用户资料</a>
#### 2. 代码和路由
> 1. 在控制器 `app/controller/api/chat/chatuser.js`
> ```js
>     // 查看用户信息(公共接口，游客和登录用户都可以访问)
>     async userinfo(){
>         const { ctx, app } = this;
>         //1.参数验证
>         this.ctx.validate({
>             uuid: {
>                 type: 'string',  //参数类型
>                 required: true, //是否必须
>                 // defValue: '', 
>                 desc: 'uuid值', //字段含义
>                 range: {
>                     min: 36,
>                     max: 36
>                 }
>             },
>         });
>         const { uuid } = ctx.params;
>         let user = await app.model.User.findOne({
>             where: {
>                 uuid,
>                 status: 1,
>             },
>             attributes:["id","uuid","username","nickname","avatar","role","userset"],
>             include:[
>                 {
>                     model:app.model.UserInfo,
>                     as:'userinfo',
>                     attributes:{
>                         exclude: ['user_id','order','create_time','update_time'],
>                     },
>                 }
>             ],
>         });
>         user = JSON.parse(JSON.stringify(user));
>         /*
>         // 看一下是不是我的好友：--- 需要这个字段那么这个方法要走中间件
>         // 因为走了中间件 ctx.chat_user 才有值
>         let me_id = ctx.chat_user ? ctx.chat_user.id : 0;
>         // console.log('我的id', ctx.chat_user.id);
>         // console.log('user的id', user.id);
>         let goodfriend = await app.model.Goodfriend.findOne({
>             where:{
>                 user_id:me_id,
>                 friend_id:user.id,
>                 isblack:0, //不是黑名单
>             }
>         });
>         // 新增字段：是否是好友
>         user.myfriend = goodfriend ? true : false;
>         */
>         //delete user.id;
>         /*
>         // 模拟用户对聊天的一些设置（会取自数据库userset字段）
>         user.chatset = {
>             // 对游客（未登录用户）聊天的设置
>             visitor: {
>                 // 是否允许游客聊天
>                 // 0 禁止(需先登录) 1 可以发一条消息 2 可以聊天
>                 sendCount: 0,
>                 // 是否需要关注
>                 needFollow: true,
>             },
>             // 对user登录用户
>             // 0 禁止(需先加为好友) 1 可以发一条消息 2 可以聊天
>             user:{
>                 sendCount: 2,
>                 needFollow: true,
>             },
>         };
>         */
> 
>         return ctx.apiSuccess(user);
>     }
> ```

> 2. 路由 `app/router/api/chat/router.js`
> ```js
> module.exports = app => {
>     const { router, controller } = app;
>     ...
>     //搜索用户（登录用户才能搜索用户，未登录用户（游客）不能搜索用户）
>     ...
>     // 查看用户信息(公共接口，游客和登录用户都可以访问)
>     router.get('/api/userinfo/:uuid', controller.api.chat.chatuser.userinfo);
> 
>     //申请添加好友 （登录用户才能申请添加好友，（游客）不能申请添加好友）
>     ...
> };   
> 
> ```

### ③ 新增接口：查看用户是否申请加我为好友
在处理添加好友的过程中，我们需要新增加一个接口：`查看用户是否申请加我为好友(即我有没有权限处理这个申请)（登录用户有这个权限，游客无权限）`
#### 1. 接口说明
具体查看接口说明： <a href="/fourthless/w-a/eggjs.即时通讯接口.html#十七、查看用户是否申请加我为好友-即我有没有权限处理这个申请" target="_blank">十七、查看用户是否申请加我为好友(即我有没有权限处理这个申请)</a>
#### 2. 代码和路由
> 1. 在控制器 `app/controller/api/chat/chatuser.js`
```js
    // 查看用户是否申请加我为好友（登录用户有这个权限，游客无权限）
    async isApplyfriend(){
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
            attributes:["id"],
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
            attributes:{
                exclude:['order','create_time','update_time'],
            },
        });
        if (!goodfriendapply) {
            return this.ctx.apiFail('用户申请信息不存在');
        }
        return this.ctx.apiSuccess(goodfriendapply);
    }
```
> 2. 路由 `app/router/api/chat/router.js`
> ```js
> module.exports = app => {
>     const { router, controller } = app;
>     ...
>     //搜索用户（登录用户才能搜索用户，未登录用户（游客）不能搜索用户）
>     ...
>     // 查看用户信息(公共接口，游客和登录用户都可以访问)
>     router.get('/api/userinfo/:uuid', controller.api.chat.chatuser.userinfo);
>     // 查看用户是否申请加我为好友（登录用户有这个权限，游客无权限）
>     router.post('/api/chat/isApplyfriend/:uuid', controller.api.chat.chatuser.isApplyfriend);
> 
>     //申请添加好友 （登录用户才能申请添加好友，（游客）不能申请添加好友）
>     ...
> };   
> 
> ```


### ④ 获取好友列表转字母的判断
在前端开发中，发现如果用户没有好友会报错，原因是没有好友，无法转换好友昵称首字母，需要加个判断，并新增uuid的字段。<br/>
在 `app/controller/api/chat/goodfriend.js`控制器
```js
    //好友列表（登录用户才行，（游客）不能）
    async goodfriendlist() {
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
                defValue: 2000, 
                desc: '每页多少条', //字段含义
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿页码
        let page = ctx.params.page ? parseInt(ctx.params.page) : 1;
        // 每页多少条
        let limit = ctx.query.limit ? parseInt(ctx.query.limit) : 2000;
        // 偏移量
        let offset = (page - 1) * limit; 
        // 拿数据
        let data = await app.model.Goodfriend.findAll({
            where:{
                user_id:me_id,// 当事人
            },
            offset,
            limit,
            include:[
                {
                    model:app.model.User,// 关联用户表
                    as:'friendinfo', //别名
                    attributes:['id','username','avatar','nickname','uuid'],
                }
            ]
        });

        // ctx.apiSuccess(data);return;
        
        // 返回一些指定数据
        let rows = data.map(v=>{
            return {
               id:v.id,
               beizhu:v.nickname,
               username:v.friendinfo.username,
               avatar:v.friendinfo.avatar,
               friend_nickname:v.friendinfo.nickname,
               friend_id:v.friendinfo.id,
               name:v.nickname || v.friendinfo.nickname || v.friendinfo.username,
               uuid:v.friendinfo.uuid, //新增uuid字段
            }
        });

        // ctx.apiSuccess(rows);return;

        //昵称备注将首个中文字转成英文字母，然后进行分组排序
        let newArr = [];
        if(rows.length){
            newArr = new SortWord(rows, 'name');
        }
        
        ctx.apiSuccess({
            count:rows.length,
            rows:newArr,
        });
    }
```


### ⑤ 新增接口：用户设置更新
给数据库user表新增了一个字段：`userset`, 存储用户的设置信息，说明：`登录用户有这个权限，游客无权限`
#### 1. 接口说明
具体查看接口说明： <a href="/fourthless/w-a/eggjs.即时通讯接口.html#十八、用户设置更新" target="_blank">十八、用户设置更新</a>
#### 2. 代码和路由
> 1. 在控制器 `app/controller/api/chat/chatuser.js`
```js
    // 用户设置更新（登录用户有这个权限，游客无权限）
    async userset(){
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
```

> 2. 路由 `app/router/api/chat/router.js`
> ```js
> module.exports = app => {
>     const { router, controller } = app;
>     ...
>     //搜索用户（登录用户才能搜索用户，未登录用户（游客）不能搜索用户）
>     ...
>     // 查看用户信息(公共接口，游客和登录用户都可以访问)
>     router.get('/api/userinfo/:uuid', controller.api.chat.chatuser.userinfo);
>     // 查看用户是否申请加我为好友（登录用户有这个权限，游客无权限）
>     router.post('/api/chat/isApplyfriend/:uuid', controller.api.chat.chatuser.isApplyfriend);
>     // 用户设置更新（登录用户有这个权限，游客无权限）
>     router.post('/api/chat/userset', controller.api.chat.chatuser.userset);
> 
>     //申请添加好友 （登录用户才能申请添加好友，（游客）不能申请添加好友）
>     ...
> };   
> 
> ```


### ⑥ 新增接口：查询一下对方是否是我的好友
#### 1. 接口说明
具体查看接口说明： <a href="/fourthless/w-a/eggjs.即时通讯接口.html#十九、查询一下对方是否是我的好友" target="_blank">十九、查询一下对方是否是我的好友</a>

#### 2. 代码和路由
> 1. 在控制器 `app/controller/api/chat/goodfriend.js`
> ```js
>     // 查看对方是否是我的好友（登录用户才可以查看好友资料信息，（游客）没有这个功能）
>     async ismygoodfriend(){
>         const { ctx,app } = this;
>         //1.参数验证
>         ctx.validate({
>             id: {
>                 type: 'int',  //参数类型
>                 required: true, //是否必须
>                 // defValue: '', 
>                 desc: '朋友id', //字段含义
>                 range:{
>                     min:1,
>                 }
>             },
>         });
>         // 拿参数
>         const id = parseInt(ctx.params.id);
>         // 当前用户: 我
>         const me = ctx.chat_user;
>         const me_id = me.id;
>         // 获取好友信息
>         let data = await app.model.Goodfriend.findOne({
>             where:{
>                 friend_id:id, // 好友id
>                 user_id:me_id,// 我
>                 isblack:0, // 没有拉黑
>             },
>             attributes:{
>                 exclude:['order','create_time','update_time'],
>             },
>         });
>         if(!data){
>             return ctx.apiFail('不是好友');
>         }
>         // return ctx.apiSuccess('goodfriend');
>         return ctx.apiSuccess(data);
>     }
> ```

> 2. 路由 `app/router/api/chat/router.js`
> ```js
> module.exports = app => {
>     const { router, controller } = app;
>     ...
>     // 设置我和朋友是否可以互相查看对方发布的信息或者朋友圈（登录用户有这个功能，（游客）没有这个功能），传好友id
>     router.post('/api/chat/setmeOrfriendCanSee/:id', controller.api.chat.goodfriend.setmeOrfriendCanSee);
>     // 查看对方是否是我的好友（登录用户才可以查看好友资料信息，（游客）没有这个功能），传好友id
>     router.post('/api/chat/ismygoodfriend/:id', controller.api.chat.goodfriend.ismygoodfriend);
> };   
> 
> ```


## 二、连接websocket并测试websocket
考虑到后期我们的项目扩展，接下来大家跟着老师一次操作。
### 1. 将路由和中间件分开写
#### 1. 新建中间件 `app/middleware/chatwebsocket.js`
```js
module.exports = () => {
    return async (ctx, next) => {
        if (ctx.path !== '/ws') return next();

        console.log('WebSocket连接请求:', ctx.path, ctx.query);

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

            if (!userCheck) {
                ctx.websocket.send(JSON.stringify({
                    msg: "fail",
                    data: '用户不存在'
                }));
                return ctx.websocket.close();
            }

            if (!userCheck.status) {
                ctx.websocket.send(JSON.stringify({
                    msg: "fail",
                    data: '你已被管理员禁用'
                }));
                return ctx.websocket.close();
            }

            // 单设备登录逻辑
            if (ctx.app.ws.chatuser && ctx.app.ws.chatuser[user.id]) {
                ctx.app.ws.chatuser[user.id].send(JSON.stringify({
                    msg: "force_logout",
                    data: '你的账号在其他设备登录'
                }));
                ctx.app.ws.chatuser[user.id].close();
            }

            // 存储连接
            ctx.app.ws.chatuser = ctx.app.ws.chatuser || {};
            ctx.app.ws.chatuser[user.id] = ctx.websocket;
            ctx.websocket.chatuser_id = user.id;

            // ctx.online(user.id);
            console.log(`用户 ${user.id} 连接成功`);

            // 进入控制器
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

#### 2. 路由 `app/router/api/chat/websocket.js`
```js
module.exports = app => {
    const { router, controller } = app;
    //配置websocket路由
    //配置websocket全局中间件
    const WebSocketMiddleware = require('../../../middleware/chatwebsocket');
    // app.ws.use(WebSocketMiddleware());
    // 链接websocket
    // app.ws.route('/ws', controller.api.chat.chatwebsocket.connect);
    // 只应用中间件到特定路由
    app.ws.route('/ws', WebSocketMiddleware(), controller.api.chat.chatwebsocket.connect);


    //发送消息 (游客，登录用户均可，只要token是正确的就行)
    // router.post('/api/chat/socket/sendmessage', controller.api.chat.chatwebsocket.sendmessage);
    //获取离线消息 (游客，登录用户均可，只要token是正确的就行)
    // router.post('/api/chat/socket/getmessage', controller.api.chat.chatwebsocket.getmessage);
    //上传文件 (游客，登录用户均可，只要token是正确的就行)
    // router.post('/api/chat/socket/upload', controller.api.chat.chatwebsocket.upload);
    //撤回消息 (游客，登录用户均可，只要token是正确的就行)
    // router.post('/api/chat/socket/recall', controller.api.chat.chatwebsocket.recall);
    
};
```

### 2. [重要]在配置文件中对websocket通讯路径进行设置
在 `config/config.default.js` 中添加如下配置
```js
// 对中间件adminAuth进一步配置
  config.adminAuth = {
    ignore: [
      ...,
      "/ws",
    ],
  };
  // 对中间件adminMenu进一步配置
  config.adminMenu = {
    ignore: [
       ...,
      "/ws",
    ],
  };
```


### 3. 控制器代码
在文件 `app/controller/api/chat/chatwebsocket.js`
```js
'use strict';

const Controller = require('egg').Controller;

class ChatwebsocketController extends Controller {
    // 链接websocket
    async connect() {
        const { ctx, app, service } = this;
        console.log('链接websocket方法', ctx.websocket.chatuser_id);
        // 确保连接存在
        if (!ctx.websocket) {
            return ctx.apiFail('非法访问');
        }
        // console.log(`clients链接数: ${app.ws.clients.size}`);

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
        ctx.websocket.on('message', msg => {
            // 1. 添加消息类型检查
            if (typeof msg !== 'string') {
                if (Buffer.isBuffer(msg)) {
                    msg = msg.toString('utf-8'); // 转换二进制数据
                } else {
                    console.log('收到非文本消息，已忽略', msg);
                    return; // 忽略非文本消息
                }
            }
        
            console.log('监听消息', msg);
            
            try {
                const data = JSON.parse(msg);
        
                // 2. 添加对客户端心跳响应的处理
                if (data.type === 'pong') {
                    console.log('收到客户端心跳响应');
                    return;
                }
        
                // 3. 添加对客户端心跳请求的响应
                if (data.type === 'ping') {
                    ctx.websocket.send(JSON.stringify({ type: 'pong' }));
                    console.log('响应客户端心跳请求');
                    return;
                }
        
                // 处理其他消息类型...
            } catch (e) {
                // 4. 增强错误处理
                if (msg.includes('undefined')) {
                    console.warn('收到无效消息，可能来自连接断开事件');
                } else {
                    console.error('消息解析错误', e, '原始消息:', msg);
                }
            }
        });

        // 监听关闭
        ctx.websocket.on('close', (code, reason) => {
            console.log('用户下线', code, reason);
            clearInterval(heartbeatInterval); // 清除心跳

            const user_id = ctx.websocket.chatuser_id;
            //移除redis中的用户上线记录
            if (!user_id) return;

            // 安全移除用户记录
            if (ctx.app.ws.chatuser && ctx.app.ws.chatuser[user_id]) {
                delete ctx.app.ws.chatuser[user_id];
            }

            // 异步移除redis记录
            service.cache.remove('online_' + user_id).catch(console.error);
        });

        // 发送欢迎消息
        ctx.websocket.send(JSON.stringify({
            type: 'system',
            data: '欢迎您，登录可获取更多功能！',
            timestamp: Date.now()
        }));
    }
}

module.exports = ChatwebsocketController;

```


## 三、发送消息(单聊)
### 1. 服务端发送消息方法
在控制器 `app/controller/api/chat/chatwebsocket.js`
```js
'use strict';

const Controller = require('egg').Controller;

// 引入 uuid 库 `npm install uuid`
const { v4: uuidv4 } = require('uuid');

class ChatwebsocketController extends Controller {
    // 链接websocket
    async connect(){
        ...
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
                ctx.service.cache.setList(`chatlog_${sendto_id}_${message.chatType}_${me.id}`, 
                message);
            }
            // 存储到我的redis历史记录中
            // key: `chatlog_我的id_[single|group]_对方id`
            ctx.service.cache.setList(`chatlog_${me.id}_${message.chatType}_${sendto_id}`, 
            message);

            // 返回
            return ctx.apiSuccess(message);

        } else if (chatType == 'group') {
            // 群聊
        }

    }
}

module.exports = ChatwebsocketController;
```

### 2. 路由
在路由 `app/router/api/chat/websocket.js`
```js
module.exports = app => {
    const { router, controller } = app;
    //配置websocket路由
    //配置websocket全局中间件
    const WebSocketMiddleware = require('../../../middleware/chatwebsocket');
    // app.ws.use(WebSocketMiddleware());
    // 链接websocket
    // app.ws.route('/ws', controller.api.chat.chatwebsocket.connect);
    // 只应用中间件到特定路由
    app.ws.route('/ws', WebSocketMiddleware(), controller.api.chat.chatwebsocket.connect);
    
    //发送消息 (游客，登录用户均可，只要token是正确的就行)
    router.post('/api/chat/socket/sendmessage', controller.api.chat.chatwebsocket.sendmessage);
    //获取离线消息 (游客，登录用户均可，只要token是正确的就行)
    // router.post('/api/chat/socket/getmessage', controller.api.chat.chatwebsocket.getmessage);
    //上传文件 (游客，登录用户均可，只要token是正确的就行)
    // router.post('/api/chat/socket/upload', controller.api.chat.chatwebsocket.upload);
    //撤回消息 (游客，登录用户均可，只要token是正确的就行)
    // router.post('/api/chat/socket/recall', controller.api.chat.chatwebsocket.recall);
    
};
```

### 3. 接口说明
具体查看给服务器发消息（单聊）（发送消息给对方）的接口说明：<a href="/fourthless/w-a/eggjs.即时通讯接口.html#二十、给服务器发消息-单聊-发送消息给对方" target="_blank">二十、给服务器发消息（单聊）（发送消息给对方）</a> <br/>



## 四、创建群聊（成功后通过webSocket通知群聊用户）
### 1. 群聊相关表信息
具体查看文档： <a href="/web/mysql/group" target="_blank">群聊相关表信息</a> <br/>

### 2. 关于websocket发送消息并保存到redis中很多地方用到，将它封装到扩展中
实际是对控制器 `app/controller/api/chat/chatwebsocket.js`中方法 `发送消息 async sendmessage()` 部分代码做了封装 <br/>
在扩展 `app/extend/context.js`
```js
    ...
    // 针对即时通讯发送消息，用户不在线则将消息存储在消息队列，等用户上线再发
    chatWebsocketSendOrSaveMessage(sendto_id, message){
      // 注意此处的this指的是ctx
      const { app, service } = this;
      // 我的信息
      const me = this.chat_user;
      const me_id = me.id;
      // 拿到对方的socket
      let you_socket = this.app.ws.chatuser[sendto_id];
      // 如果拿不到对方的socket， 则把消息放在redis队列中， 等待对方上线时，再发送
      if(!you_socket){
          // 放到reids，设置消息列表中：key值是：'chat_getmessage_' + sendto_id（用户id）
          this.service.cache.setList('chat_getmessage_' + sendto_id, message);
      }else{
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
    },
```

### 3. 简化控制器`发送消息`代码(新增群聊发消息)
在控制器`app/controller/api/chat/chatwebsocket.js`中
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
        ctx.websocket.on('message', msg => {
            // 1. 添加消息类型检查
            if (typeof msg !== 'string') {
                if (Buffer.isBuffer(msg)) {
                    msg = msg.toString('utf-8'); // 转换二进制数据
                } else {
                    console.log('收到非文本消息，已忽略', msg);
                    return; // 忽略非文本消息
                }
            }

            console.log('监听消息', msg);

            try {
                const data = JSON.parse(msg);

                // 2. 添加对客户端心跳响应的处理
                if (data.type === 'pong') {
                    console.log('收到客户端心跳响应');
                    return;
                }

                // 3. 添加对客户端心跳请求的响应
                if (data.type === 'ping') {
                    ctx.websocket.send(JSON.stringify({ type: 'pong' }));
                    console.log('响应客户端心跳请求');
                    return;
                }

                // 处理其他消息类型...
            } catch (e) {
                // 4. 增强错误处理
                if (msg.includes('undefined')) {
                    console.warn('收到无效消息，可能来自连接断开事件');
                } else {
                    console.error('消息解析错误', e, '原始消息:', msg);
                }
            }
        });

        // 监听关闭
        ctx.websocket.on('close', (code, reason) => {
            console.log('用户下线', code, reason);
            clearInterval(heartbeatInterval); // 清除心跳

            const user_id = ctx.websocket.chatuser_id;
            //移除redis中的用户上线记录
            if (!user_id) return;

            // 安全移除用户记录
            if (ctx.app.ws.chatuser && ctx.app.ws.chatuser[user_id]) {
                delete ctx.app.ws.chatuser[user_id];
            }

            // 异步移除redis记录
            service.cache.remove('online_' + user_id).catch(console.error);
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

            // 注释内容已经封装到了 `/app/extend/context.js`
            /*
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




### 4. 群聊相关方法
新建控制器 `app/controller/api/chat/chatgroup.js`
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
                data: "我创建了一个群，大家可以开始聊天了",
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

}

module.exports = ChatgroupController;

```

### 5. 群聊相关路由及获取离线消息路由
在路由文件 `app/router/api/chat/router.js` 中添加
```js
module.exports = app => {
    const { router, controller } = app;
    //用户登录
    ...

    //申请添加好友 （登录用户才能申请添加好友，（游客）不能申请添加好友）
    ...

    // 好友列表（登录用户才行，（游客）不能）
    ...
    // 查看对方是否是我的好友（登录用户才可以查看好友资料信息，（游客）没有这个功能），传好友id
    ...

    // 创建群聊（登录用户有这个功能，（游客）没有这个功能）
    router.post('/api/chat/group/create', controller.api.chat.chatgroup.creategroup);

    // 用户(我)上线后获取离线消息（登录用户和游客都有这个功能）
    router.post('/api/chat/chatGetmessageOffLine', controller.api.chat.chatwebsocket.chat_getmessage_OffLine);

    // 群聊列表（登录用户和游客都有这个功能）
    router.get('/api/chat/grouplist/:page', controller.api.chat.chatgroup.grouplist);

};   

```

### 6. 群聊相关接口说明
1. 创建群聊接口，具体查看： <a href="/fourthless/w-a/eggjs.即时通讯接口.html#二十一、创建群聊-成功后通过websocket通知群聊用户" target="_blank">二十一、创建群聊（成功后通过webSocket通知群聊用户）</a>


### 7. 补充：对游客用户，系统发送一个登录提醒消息
### ① 在控制器 `app/controller/api/chat/chatuser.js` 中
```js
'use strict';
//哈希函数 
const crypto = require('node:crypto');
// 引入 uuid 库 `npm install uuid`
const { v4: uuidv4 } = require('uuid');

const Controller = require('egg').Controller;

class ChatuserController extends Controller {
    ...

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
        if(!(option.role && option.role == 'visitor')){
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
        if(option.role && option.role == 'visitor'){
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

    ...

    // 系统给游客发送登录提醒消息
    async systemSendLoginRemind(user) {
        const { ctx, app, service } = this;
        // 消息格式
        // console.log('要发登录提示消息的用户user', user); return;
        let message = { 
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: 'https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/kefu.png', // 发送者头像
            from_name: '系统消息', // 发送者名称
            from_id: 0, // 发送者id 系统id
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
        // 推送给游客
        // 拿到游客的socket
        let you_socket = ctx.app.ws.chatuser[user.id];
        // 如果对方在线，则直接推送给对方
        you_socket.send(JSON.stringify({
            type: 'singleChat',
            data: message,
            timestamp: Date.now(),
        }));
        
    }
    
}

module.exports = ChatuserController;
```


















