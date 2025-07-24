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

### 3. 配置websocket路由
说明：由于`websocket` 需要配合前端一起使用，大家暂时先讲下面大代码复制到项目，后面测试时候会讲这些代码。
1. 新建路由文件： `app/router/api/chat/websocket.js` 
```js
module.exports = app => {
    const { router, controller } = app;
    //配置websocket路由
    //配置websocket全局中间件
    app.ws.use(async (ctx, next) => {
        // 获取参数 ws://localhost:7001/ws?token=123456
        // ctx.query.token
        // 验证用户token
        let user = {};
        let token = ctx.query.token;
        try {
            user = ctx.checkToken(token);
            // 验证用户状态
            let userCheck = await app.model.User.findByPk(user.id);
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
                    data: '你已被管理员禁用了'
                }));
                return ctx.websocket.close();
            }
            // 用户上线
            app.ws.chatuser = app.ws.chatuser ? app.ws.chatuser : {};
            // 下线其他设备
            // if (app.ws.chatuser[user.id]) {
            //     app.ws.chatuser[user.id].send(JSON.stringify({
            //         msg: "fail",
            //         data: '你的账号在其他设备登录'
            //     }));
            //     app.ws.chatuser[user.id].close();
            // }
            // 记录当前用户id
            ctx.websocket.chatuser_id = user.id;
            app.ws.chatuser[user.id] = ctx.websocket;
    
            ctx.online(user.id);
            
            await next();
        } catch (err) {
            console.log(err);
            let fail = err.name === 'TokenExpiredError' ? 'token 已过期! 请重新获取令牌' : 'Token 令牌不合法!';
            ctx.websocket.send(JSON.stringify({
                msg: "fail",
                data: fail
            }))
            // 关闭连接
            ctx.websocket.close();
        }
      });
    // 链接websocket
    app.ws.route('/ws', controller.api.chat.chatwebsocket.connect);
    //发送消息
    // router.post('/chat/send', controller.api.chat.chatwebsocket.send);
    //获取离线消息
    // router.post('/chat/getmessage', controller.api.chat.chatwebsocket.getmessage);
    //上传文件
    // router.post('/upload', controller.api.chat.chatwebsocket.upload);
    //撤回消息
    // router.post('/chat/recall', controller.api.chat.chatwebsocket.recall);
    
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
        const { ctx, app, service} = this;
        // websocket链接不存在
        if(!ctx.websocket){
           return ctx.apiFail('非法访问');
        }
        // console.log(`clients链接数: ${app.ws.clients.size}`);

        // 监听接收消息和关闭socket
        ctx.websocket
        .on('message', msg => {
            // console.log('接收消息', msg);
        })
        .on('close', (code, reason) => {
            // 用户下线
            console.log('用户下线', code, reason);
            let user_id = ctx.websocket.chatuser_id;
            //移除redis中的用户上线记录
            service.cache.remove('online_' + user_id);
            if (app.ws.chatuser && app.ws.chatuser[user_id]) {
              delete app.ws.chatuser[user_id];
            }
        });
    }
}

module.exports = ChatwebsocketController;
```

### 5. 讲新内容前的说明
1. 我们在上节课补充了关于未登录注册的用户，我们给他注册一个游客身份（具体查看：<a href="/fourthless/w-a/eggjs.即时通讯后台.html#三、给未登录用户创建一个游客身份" target="_blank">三、给未登录用户创建一个游客身份</a>），来满足他和我们的客服进行即时通讯的需求。在数据库我们新增了几个字段，我们重点讲了 `devicefingeruuid 设备标识（游客标识）`，关于其他几个字段都是做统计用的，为可选字段，大家如果有需要可以通过前端传过来，然后在数据库更新这几个字段，具体看控制器代码 <a href="/fourthless/w-a/eggjs.即时通讯后台.html#_1-游客用户注册身份" target="_blank">① 游客用户注册身份</a>。
2. 游客用户实际上就走了一遍注册用户和登录用户的流程，实际上会在本地存储相关信息，其中就包括`token`，但是我们的很多接口游客是没有权限的，但是游客有`token`，那么他可以操作这些接口显然是不对的，因此我们需要在中间件中新增一个判断：<br/>
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
        let user = {};
        try {
            user = ctx.checkToken(token);
        } catch (error) {
            let fail = (error.name == 'TokenExpiredError') ? 'Token已过期！请重新获取令牌' : 'Token 令牌不合法！';
            ctx.throw(400, fail);
        }

        //3. 说明token解密正确，此时判断用户是否登录过
        // 根据当前解密的用户信息的id,去缓存拿一下该id的信息
        let t = await ctx.service.cache.get('chat_user_' + user.id);
        //console.log('打印t',user.id);
        if (!t || t != token) {
            ctx.throw(400, 'Token 令牌不合法！');
        }

        // 4. 说明当前用户之前登录过了，缓存里有他的数据，比如说已经登录过3天了
        // 但有一种情况，这三天内，他发了违规信息，已经被超级管理员禁用了或者被超级管理员把他从数据库删除了
        // 那么即使现在他传的token有效，也没有用，依旧不能让他操作
        user = await app.model.User.findByPk(user.id);
        if (!user || user.status == 0) {
            ctx.throw(400, '当前用户不存在或者已被禁用');
        }

        // 新增：针对游客的操作
        if(user.role == 'visitor'){
            ctx.throw(400, '您没有权限访问，请先注册或登录');  
        }

        // 5. 没什么问题了，把用户信息挂载到ctx上，方便调用
        ctx.chat_user = user;

        await next();
    }
}
```
