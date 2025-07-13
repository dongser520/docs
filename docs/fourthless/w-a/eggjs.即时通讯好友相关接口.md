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

