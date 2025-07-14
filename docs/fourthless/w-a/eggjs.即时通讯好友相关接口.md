---
navbar: true
sidebar: auto
title: eggjs即时通讯好友相关接口开发
---

## 一、 搜索用户（好友）
要求： `（登录用户才能搜索用户，未登录用户（游客）不能搜索用户）`
### 1. 搜索用户方法
此接口属于前端接口，在 `app/controller/api/chat/chatuser.js`
```js
    // 搜索用户功能（登录用户才能搜索用户，未登录用户（游客）不能搜索用户）
    async searchUser(){
        const { ctx,app } = this;
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
            },
            // 读取某些字段
            attributes: ['id', 'username','avatar','role','uuid','nickname'],
            // 除了某些字段，其它都获取
            // attributes: { 
            //     exclude: ['password','uuid','mobile','email'], 
            // },
        });
        return ctx.apiSuccess(users);
    }
```

### 2. 定义路由
在 `app/router/api/chat/router.js`
```js
module.exports = app => {
    const { router, controller } = app;
    ...
    //搜索用户
    router.post('/api/chat/searchUser', controller.api.chat.chatuser.searchUser);
};
```

### 3. 接口测试
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/searchUser`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/searchUser> <br/>
> 3. header头传token
> 
> 请求参数 [Headers] -> [Key: `token`, Value: `token值`]
> 
> | 参数       |  是否必填    |  类型    |  长度                   | 说明     |
> | :---:      | :---:       |  :---:   | :---:                  |:---:     |
> | token      |  是         |  string  |  由服务器生成           | `token令牌`，如：`eyJhbGciO.....`  |
> 
> 4. 请求参数 [body] -> [x-www-form-urlencoded]
>
> | 参数       |  是否必填    |  类型    |  长度         | 说明     |
> | :---:      | :---:       |  :---:   | :---:        |:---:     |
> | keyword   |  是         |  string  |  1-50位       |   搜索关键词，如：`my01`  |
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": [
>          {
>              "id": 1,
>              "username": "my01",
>              "avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>              "role": "user",
>              "uuid": "edda71aa-4a31-4ba8-9025-8fdc0dc3c0fa",
>              "nickname": "魂牵一梦"
>          }
>      ]
>  }
>  ```





## 二、定义和创建好友表和好友申请表
具体查看 <a href="/web/mysql/goodfriend.html" target="_blank">好友表和好友申请表说明</a>

## 三、添加好友（申请添加好友）
说明： `（登录用户才能添加好友，未登录用户（游客）不能添加好友）`
### 1. 添加好友方法
此接口属于前端接口，新建控制器 `app/controller/api/chat/goodfriendapply.js`
```js
'use strict';

const Controller = require('egg').Controller;

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
        return ctx.apiSuccess('ok');

    }
}

module.exports = GoodfriendapplyController;

```

### 2. 定义路由
在 `app/router/api/chat/router.js`
```js
module.exports = app => {
    const { router, controller } = app;
    ...
    //搜索用户（登录用户才能搜索用户，未登录用户（游客）不能搜索用户）
    router.post('/api/chat/searchUser', controller.api.chat.chatuser.searchUser);

    //申请添加好友 （登录用户才能申请添加好友，（游客）不能申请添加好友）
    router.post('/api/chat/applyfriend', controller.api.chat.goodfriendapply.applyfriend);
};
```

### 3. 接口测试
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/applyfriend`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/applyfriend> <br/>
> 3. header头传token
> 
> 请求参数 [Headers] -> [Key: `token`, Value: `token值`]
> 
> | 参数       |  是否必填    |  类型    |  长度                   | 说明     |
> | :---:      | :---:       |  :---:   | :---:                  |:---:     |
> | token      |  是         |  string  |  由服务器生成           | `token令牌`，如：`eyJhbGciO.....`  |
> 
> 4. 请求参数 [body] -> [x-www-form-urlencoded]
>
> | 参数       |  是否必填    |  类型    |  长度         | 说明     |
> | :---:      | :---:       |  :---:   | :---:        |:---:     |
> | friend_id   |  是         |  int  |  int(11)       |   我申请添加的好友id，如：`1`  |
> | nickname   |  否         |  string  |  1-50位       |   我的昵称或者说明，默认空字符串  |
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": "ok"
>  }
>  ```

## 四、查看好友申请列表（获取别人申请我为好友的列表数据）
说明： `（登录用户才能查看好友申请列表，（游客）不能查看好友申请列表）`
### 1. 查看好友申请列表方法
此接口属于前端接口，在控制器 `app/controller/api/chat/goodfriendapply.js`
```js
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
                    attributes:['id','username','avatar','nickname'],
                }
            ]
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
```

### 2. 定义路由
在 `app/router/api/chat/router.js`
```js
module.exports = app => {
    const { router, controller } = app;
    ...
    //搜索用户（登录用户才能搜索用户，未登录用户（游客）不能搜索用户）
    ...

    //申请添加好友 （登录用户才能申请添加好友，（游客）不能申请添加好友）
    ...
    // 获取别人申请我为好友的列表数据（登录用户才行，（游客）不能）
    router.get('/api/chat/listapplyfriend/:page', controller.api.chat.goodfriendapply.listapplyfriend);
};
```

### 3. 模型关联
在模型 `app/model/goodfriendapply.js`
```js
module.exports = app => {
    const { INTEGER, STRING, DATE, TINYINT, ENUM } = app.Sequelize;

    const Goodfriendapply = app.model.define('goodfriendapply', {
        ...
    });

    // 模型关联
    Goodfriendapply.associate =  function (models) {
        // 一个用户可以申请多个好友，用户对申请表是一对多， 反过来申请表对于用户表就是反向一对多
        Goodfriendapply.belongsTo(app.model.User,{
            // foreignKey: 'user_id',
        });
    };

    return Goodfriendapply;
}
```


### 4. 接口测试
> 1. 请求方式：`get` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/listapplyfriend/:page?limit=[:limit]`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/listapplyfriend/1?limit=1> <br/>
> 3. header头传token
> 
> 请求参数 [Headers] -> [Key: `token`, Value: `token值`]
> 
> | 参数       |  是否必填    |  类型    |  长度                   | 说明     |
> | :---:      | :---:       |  :---:   | :---:                  |:---:     |
> | token      |  是         |  string  |  由服务器生成           | `token令牌`，如：`eyJhbGciO.....`  |
> 
> 4. 请求参数 [body] -> [x-www-form-urlencoded]
>
> | 参数       |  是否必填    |  类型    |  长度         | 说明     |
> | :---:      | :---:       |  :---:   | :---:        |:---:     |
> | page   |  是         |  int  |  int(11)       |   页码，默认：`1`, 不填默认第一页  |
> | limit   |  否         |  int |       |   每页多少条，可不填，不填默认每页10条  |
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": {
>          "alldata": [
>              {
>                  "create_time": "2025-07-14 11:41:19",
>                  "id": 1,
>                  "user_id": 1,
>                  "friend_id": 3,
>                  "nickname": "",
>                  "friendlookme": 1,
>                  "melookfriend": 1,
>                  "ismystarfriend": 0,
>                  "isblack": 0,
>                  "status": "pending",
>                  "order": 50,
>                  "update_time": "2025-07-14T04:32:58.000Z",
>                  "userId": 1,
>                  "user": {
>                      "id": 1,
>                      "username": "my01",
>                      "avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>                      "nickname": "魂牵一梦"
>                  }
>              }
>          ],
>          "pendingCount": 2
>      }
>  }
>  ```


