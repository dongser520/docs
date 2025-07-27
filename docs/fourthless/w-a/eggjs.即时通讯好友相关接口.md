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
                role:{
                    [this.app.Sequelize.Op.ne]: 'visitor', // role != 'visitor'
                },
                id:{
                    [this.app.Sequelize.Op.ne]: ctx.chat_user.id, // id != 自己的id
                },
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
>                      "nickname": "魂牵一梦",
>                      "uuid": "d8ffff3b-200d-4282-9e32-28e19a4fee71"
>                  }
>              }
>          ],
>          "pendingCount": 2
>      }
>  }
>  ```




## 五、处理好友的申请（对申请加我为好友的信息进行处理）
说明： `（登录用户才能处理好友的申请，（游客）不能处理好友的申请）`
### 1. 处理好友的申请（对申请加我为好友的信息进行处理）方法
此接口属于前端接口，在控制器 `app/controller/api/chat/goodfriendapply.js`
```js
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
            }
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
            return ctx.apiSuccess('ok');
        } catch (error) {
            // 失败则回滚
            await tansaction.rollback();
            // 反馈
            return ctx.apiFail('系统异常，请稍后再试');
        }
        
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
    ...
    // 对申请加我为好友的信息进行处理（登录用户才行，（游客）不能） 传一个申请表的id
    router.post('/api/chat/handleapply/:id', controller.api.chat.goodfriendapply.handleapply);
};
```

### 3. 接口测试
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/handleapply/:id`<br/> `:id`表示申请表`goodfriendapply`表的id值<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/handleapply/1> <br/> `1`表示申请表`goodfriendapply`第1条申请信息<br/>
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
> | id  |  是         |  int  |  int(11)       |   申请表`goodfriendapply`表的id值,即：处理哪一条申请信息  |
> | nickname   |  否  |  string |  1-50位     |   好友备注，如：`阿三`  |
> | status   |  是  |  枚举：`ENUM`['pending', 'refuse', 'agree', 'ignore'] |       |   处理状态（结果）  |
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": "ok"
>  }
>  ```


## 六、好友列表（联系人、通讯录）
说明： `（登录用户才有好友列表，（游客）没有好友列表）`
### 1. 好友列表（联系人、通讯录）方法
说明：查询出来的结果按照`昵称备注将首个中文字转成英文字母，然后进行分组排序`，需要安装插件 <br/>
插件地址： <https://www.npmjs.com/package/sort-word><br/>
1. 安装命令
```js
npm install sort-word -S
```
2. 插件示例
> 第三参数为true时 添加热门项，默认添加传入数组前10个 不需要热门项，则不需要传第三个参数 <br/>
> ```js
>   import SortWord from 'sort-word'
> 
>   let newList = new SortWord(list, value, true)
> 
>   //例如：
> 
>   let arr = [{name: '张三'}, {name: '李四'}]
>   let newArr = new SortWord(arr, 'name')
> 
>   //结果：
>   newArr {
>     newList:[
>       {title: 'L', list: [{name: '李'}]},
>       {title: 'Z', list: [{name: '张'}]}
>     ],
>     indexList: ['L', 'Z'],
>     total: 2
>   }
> ```

3. 此接口属于前端接口，新建控制器 `app/controller/api/chat/goodfriend.js`
```js
'use strict';

const Controller = require('egg').Controller;

// 引入昵称备注将首个中文字转成英文字母，然后进行分组排序的插件
const SortWord = require('sort-word');

class GoodfriendController extends Controller {
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
                    attributes:['id','username','avatar','nickname'],
                }
            ]
        });
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
}

module.exports = GoodfriendController;

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
    ...
    // 对申请加我为好友的信息进行处理（登录用户才行，（游客）不能） 传一个申请表的id
    ...

    // 好友列表（登录用户才行，（游客）不能）
    router.get('/api/chat/goodfriendlist/:page', controller.api.chat.goodfriend.goodfriendlist);
};
```

### 3. 模型关联
在模型 `app/model/goodfriend.js`
```js
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, TINYINT, ENUM } = app.Sequelize;

    const Goodfriend = app.model.define('goodfriend', {
        ...
    });

    // 模型关联
    Goodfriend.associate =  function (models) {
        // 一个用户可以申请多个好友，用户对申请表是一对多， 反过来申请表对于用户表就是反向一对多
        Goodfriend.belongsTo(app.model.User,{
            foreignKey: 'friend_id', //外键
            as:'friendinfo', //别名
        });
    };

    return Goodfriend;
}
```

### 4. 接口测试
> 1. 请求方式：`get` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/goodfriendlist/:page?limit=[:limit]`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/goodfriendlist/1?limit=1> <br/>
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
> | 参数   |  是否必填    |  类型  |  长度  |  默认值  | 说明     |
> | :---:  | :---:       |  :---: | :---: |:---:     |:---:     |
> | page   |  是         |  int  | int(11)|  1        |  页码，默认：`1`, 不填默认第一页  |
> | limit  |  否         |  int |         |  2000    |   每页多少条，可不填，不填默认每页2000条  |
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": {
>          "count": 1,
>          "rows": {
>              "newList": [
>                  {
>                      "title": "H",
>                      "list": [
>                          {
>                              "id": 5,
>                              "beizhu": "好友魂牵一梦",
>                              "username": "my01",
>                              "avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>                              "friend_nickname": "魂牵一梦",
>                              "friend_id": 1,
>                              "name": "好友魂牵一梦"
>                          }
>                      ]
>                  }
>              ],
>              "indexList": [
>                  "H"
>              ],
>              "total": 1
>          }
>      }
>  }
>  ```

## 七、查看好友资料信息
说明： `（登录用户才可以查看好友资料信息，（游客）没有这个功能）`
### 1. 查看好友资料信息方法
此接口属于前端接口，在控制器 `app/controller/api/chat/goodfriend.js`
```js
    // 查看好友资料信息（登录用户才可以查看好友资料信息，（游客）没有这个功能）
    async getgoodfriendinfo(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '好友id', //字段含义
                range:{
                    min:1,
                }
            },
        });
        // 拿参数
        const id = parseInt(ctx.params.id);
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 查看好友资料
        let data = await app.model.Goodfriend.findOne({
            where:{
                friend_id:id, // 好友id
                user_id:me_id,// 我
            },
            attributes:['id','user_id','friend_id','nickname'],
            include:[
                {
                    model:app.model.User,// 关联用户表
                    as:'friendinfo', //别名
                    attributes:['id','username','avatar','nickname','role','status'],
                    // 用户表自身去关联用户信息表
                    include:[
                        {
                            model:app.model.UserInfo,
                            as:'userinfo',
                            attributes:{
                                exclude: ['user_id','order','create_time','update_time'],
                            },
                        }
                    ],
                }
            ]
        });

        if(!data) {
            return ctx.apiFail('好友不存在');
        }

        ctx.apiSuccess(data);
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
    ...
    // 对申请加我为好友的信息进行处理（登录用户才行，（游客）不能） 传一个申请表的id
    ...

    // 好友列表（登录用户才行，（游客）不能）
    ...
    // 查看好友资料信息（登录用户才可以查看好友资料信息，（游客）没有这个功能）, 传好友id
    router.get('/api/chat/getgoodfriendinfo/:id', controller.api.chat.goodfriend.getgoodfriendinfo);
};
```

### 3. 模型关联(user表要关联user_info表信息)
在模型 `app/model/user.js`
```js
... 

module.exports = app => {
    const { INTEGER, STRING, DATE, TINYINT, ENUM } = app.Sequelize;

    const User = app.model.define('user', {
        ...
    });

    
    // 模型关联
    User.associate =  function (models) {
        // 一个用户对应一个用户信息 一对一
        User.hasOne(app.model.UserInfo,{
            foreignKey: 'user_id', //外键
            as:'userinfo', //别名
        });
    };

    return User;
}
```


### 4. 接口测试
> 1. 请求方式：`get` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/getgoodfriendinfo/:id`<br/> `id`表示好友的id值 <br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/getgoodfriendinfo/1> <br/> `1`表示好友的id值 <br/>
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
> | 参数   |  是否必填    |  类型  |  长度  |  默认值  | 说明     |
> | :---:  | :---:       |  :---: | :---: |:---:     |:---:     |
> | id   |  是         |  int  | int(11)|          |  好友的id值  |
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": {
>          "id": 5,
>          "user_id": 3,
>          "friend_id": 1,
>          "nickname": "好友魂牵一梦",
>          "friendinfo": {
>              "id": 1,
>              "username": "my01",
>              "avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>              "nickname": "魂牵一梦",
>              "role": "user",
>              "status": 1,
>              "userinfo": {
>                  "id": 1,
>                  "gender": "unknown",
>                  "birthday": null,
>                  "bio": null,
>                  "location": null,
>                  "website": null
>              }
>          }
>      }
>  }
>  ```


## 八、将好友移入移出黑名单
说明： `（登录用户有将好友移入移出黑名单功能，（游客）没有这个功能）`
### 1. 将好友移入移出黑名单方法
此接口属于前端接口，在控制器 `app/controller/api/chat/goodfriend.js`
```js
    //将好友移入移出黑名单（登录用户有将好友移入移出黑名单功能，（游客）没有这个功能）
    async setblackgoodfriend(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '好友id', //字段含义
                range:{
                    min:1,
                }
            },
        });
        // 拿参数
        const id = parseInt(ctx.params.id);
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 获取好友信息
        let data = await app.model.Goodfriend.findOne({
            where:{
                friend_id:id, // 好友id
                user_id:me_id,// 我
            },
        });
        if(!data){
            return ctx.apiFail('好友不存在');
        }
        // 修改好友拉黑状态
        data.isblack = data.isblack === 1 ? 0 : 1; // 1拉黑 0正常
        await data.save();
        ctx.apiSuccess('ok');
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
    ...
    // 对申请加我为好友的信息进行处理（登录用户才行，（游客）不能） 传一个申请表的id
    ...

    // 好友列表（登录用户才行，（游客）不能）
    ...
    // 查看好友资料信息（登录用户才可以查看好友资料信息，（游客）没有这个功能）, 传好友id
    ...
    //将好友移入移出黑名单（登录用户有将好友移入移出黑名单功能，（游客）没有这个功能），传好友id
    router.post('/api/chat/setblackgoodfriend/:id', controller.api.chat.goodfriend.setblackgoodfriend);
};
```

### 3. 接口测试
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/setblackgoodfriend/:id`<br/> `id`表示好友的id值 <br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/setblackgoodfriend/1> <br/> `1`表示好友的id值 <br/>
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
> | 参数   |  是否必填    |  类型  |  长度  |  默认值  | 说明     |
> | :---:  | :---:       |  :---: | :---: |:---:     |:---:     |
> | id   |  是         |  int  | int(11)|          |  好友的id值  |
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": "ok"
>  }
>  ```





## 九、将好友设置为星标好友或者取消
说明： `（登录用户有设置为星标好友或者取消功能，（游客）没有这个功能）`
### 1. 将好友设置为星标好友或者取消方法
此接口属于前端接口，在控制器 `app/controller/api/chat/goodfriend.js`
```js
    //将好友设置为星标好友或者取消（登录用户有设置为星标好友或者取消功能，（游客）没有这个功能）
    async setstargoodfriend(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '好友id', //字段含义
                range:{
                    min:1,
                }
            },
        });
        // 拿参数
        const id = parseInt(ctx.params.id);
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 获取好友信息
        let data = await app.model.Goodfriend.findOne({
            where:{
                friend_id:id, // 好友id
                user_id:me_id,// 我
                isblack:0, // 没有拉黑
            },
        });
        if(!data){
            return ctx.apiFail('好友不存在或者被拉黑，无法操作');
        }
        // 修改好友是否为星标好友
        data.ismystarfriend = data.ismystarfriend === 0 ? 1 : 0; // 1是星标好友 0不是
        await data.save();
        ctx.apiSuccess('ok');
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
    ...
    // 对申请加我为好友的信息进行处理（登录用户才行，（游客）不能） 传一个申请表的id
    ...

    // 好友列表（登录用户才行，（游客）不能）
    ...
    // 查看好友资料信息（登录用户才可以查看好友资料信息，（游客）没有这个功能）, 传好友id
    ...
    //将好友移入移出黑名单（登录用户有将好友移入移出黑名单功能，（游客）没有这个功能），传好友id
    ...
    //将好友设置为星标好友或者取消（登录用户有设置为星标好友或者取消功能，（游客）没有这个功能），传好友id
    router.post('/api/chat/setstargoodfriend/:id', controller.api.chat.goodfriend.setstargoodfriend);
};
```


### 3. 接口测试
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/setstargoodfriend/:id`<br/> `id`表示好友的id值 <br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/setstargoodfriend/1> <br/> `1`表示好友的id值 <br/>
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
> | 参数   |  是否必填    |  类型  |  长度  |  默认值  | 说明     |
> | :---:  | :---:       |  :---: | :---: |:---:     |:---:     |
> | id   |  是         |  int  | int(11)|          |  好友的id值  |
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": "ok"
>  }
>  ```

## 十、设置我和朋友是否可以互相查看对方发布的信息或者朋友圈
说明： `（登录用户有这个功能，（游客）没有这个功能）`
### 1. 设置我和朋友是否可以互相查看对方发布的信息或者朋友圈方法
此接口属于前端接口，在控制器 `app/controller/api/chat/goodfriend.js`
```js
    // 设置我和朋友是否可以互相查看对方发布的信息或者朋友圈（登录用户有这个功能，（游客）没有这个功能）
    async setmeOrfriendCanSee(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '朋友id', //字段含义
                range:{
                    min:1,
                }
            },
            friendlookme: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '朋友是否可以看我的动态', //字段含义
                range:{
                    in:[0,1],
                }
            },
            melookfriend: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '我的朋友圈是否出现朋友的信息（我是否看朋友的动态）', //字段含义
                range:{
                    in:[0,1],
                }
            },
        });
        // 拿参数
        const id = parseInt(ctx.params.id);
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 获取好友信息
        let data = await app.model.Goodfriend.findOne({
            where:{
                friend_id:id, // 好友id
                user_id:me_id,// 我
                isblack:0, // 没有拉黑
            },
        });
        if(!data){
            return ctx.apiFail('好友不存在或者被拉黑，无法操作');
        }
        // 修改
        let {friendlookme,melookfriend} = ctx.request.body;
        data.friendlookme = friendlookme;
        data.melookfriend = melookfriend;
        await data.save();
        ctx.apiSuccess('ok');
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
    ...
    // 对申请加我为好友的信息进行处理（登录用户才行，（游客）不能） 传一个申请表的id
    ...

    // 好友列表（登录用户才行，（游客）不能）
    ...
    // 查看好友资料信息（登录用户才可以查看好友资料信息，（游客）没有这个功能）, 传好友id
    ...
    //将好友移入移出黑名单（登录用户有将好友移入移出黑名单功能，（游客）没有这个功能），传好友id
    ...
    //将好友设置为星标好友或者取消（登录用户有设置为星标好友或者取消功能，（游客）没有这个功能），传好友id
    ...
    // 设置我和朋友是否可以互相查看对方发布的信息或者朋友圈（登录用户有这个功能，（游客）没有这个功能），传好友id
    router.post('/api/chat/setmeOrfriendCanSee/:id', controller.api.chat.goodfriend.setmeOrfriendCanSee);
};
```

### 3. 接口测试
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/setmeOrfriendCanSee/:id`<br/> `id`表示好友的id值 <br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/setmeOrfriendCanSee/1> <br/> `1`表示好友的id值 <br/>
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
> | 参数   |  是否必填    |  类型  |  长度  | 默认值| 说明     |
> | :---:  | :---:       |  :---: | :---: |:---:   |:---:     |
> | id   |  是         |  int  | int(11)|          |  好友的id值  |
> | friendlookme   |  是  |  int  | 范围[0,1]|     |  朋友是否可以看我的动态或者朋友圈：0-不可以看，1-可以看  |
> | melookfriend   |  是  |  int  | 范围[0,1]|     |  我的朋友圈是否出现朋友的信息（我是否看朋友的动态）：0-不出现，1-出现  |
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": "ok"
>  }
>  ```