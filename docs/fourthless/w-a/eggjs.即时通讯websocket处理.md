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
            // 验证用户是否存在
            let userCheck = await app.model.User.findByPk(user.id);
            if (!userCheck) {
                ctx.websocket.send(JSON.stringify({
                    msg: "fail",
                    data: '用户不存在'
                }));
                // 关闭连接
                return ctx.websocket.close();
            }
            // 验证用户状态
            if (!userCheck.status) {
                ctx.websocket.send(JSON.stringify({
                    msg: "fail",
                    data: '你已被禁用'
                }));
                // 关闭连接
                return ctx.websocket.close();
            }
            // 用户上线
            app.ws.chat_user = app.ws.chat_user ? app.ws.chat_user : {};
            // 下线其他设备
            // if (app.ws.chat_user[user.id]) {
            //     app.ws.chat_user[user.id].send(JSON.stringify({
            //         msg: "fail",
            //         data: '你的账号在其他设备登录'
            //     }));
            //     app.ws.chat_user[user.id].close();
            // }
            // 记录当前用户id
            ctx.websocket.chat_user_id = user.id;
            app.ws.chat_user[user.id] = ctx.websocket;

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
            let user_id = ctx.websocket.chat_user_id;
            //移除redis中的用户上线记录
            service.cache.remove('online_' + user_id);
            if (app.ws.chat_user && app.ws.chat_user[user_id]) {
              delete app.ws.chat_user[user_id];
            }
        });
    }
}

module.exports = ChatwebsocketController;

```