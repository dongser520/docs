---
navbar: true
sidebar: auto
title: shop_manager表接口
---

## 一、创建管理员
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.管理员板块.html" target="_blank">点击查看具体文档：【创建管理员】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由：`http://thinkphp.shop/admin/shopmanager` <br/>
> 本地路由地址示例：<http://thinkphp.shop/admin/shopmanager>
> 3. 网络地址(需登录)：<http://lesson11.thinkphpshop.51yrc.com/admin/shopmanager>
> 4. 请求参数：<br/>`body请求体发送` , `x-www-form-urlencoded`格式
>> | 字段名（属性名） |  值（例如）    |   说明    |
>> | :---:           | :---:         |  :---:    |
>> | username |  admin1    |   必填，管理员账号    |
>> | password |  123456    |   必填，管理员密码(模型已自动加密)    |
>> | avatar |      |   选填，默认：https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png    |
>> | status |  1    |   选填，默认：1，管理员可用状态：0禁用1启用    |
>> | role_id |  1    |   必填，默认：0，角色role表的id    |
>> | super |  1    |   选填，默认：0，已采取过滤，填写无效，是否超级管理员：0否1是    |
> 5. 返回
>>```js
>> {
>>    "msg": "ok",
>>    "data": true
>> }
>>

### ② eggjs框架接口
<a href="/fourthless/w-a/eggjs.商城管理员.html#一、创建商城管理员" target="_blank">点击查看具体文档：【一、创建商城管理员】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由：`http://127.0.0.1:7001/shop/admin/shopmanager` <br/>
> 本地路由地址示例：<http://127.0.0.1:7001/shop/admin/shopmanager>
> 3. 网络地址(需登录)：<http://lesson11.eggjsshop.51yrc.com/shop/admin/shopmanager>
> 4. 请求参数：<br/>`body请求体发送` , `x-www-form-urlencoded`格式
>> | 字段名（属性名） |  值（例如）    |   说明    |
>> | :---:           | :---:         |  :---:    |
>> | username |  admin1    |   必填，管理员账号    |
>> | password |  123456    |   必填，管理员密码(模型已自动加密)    |
>> | avatar |      |   选填，默认：https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png    |
>> | status |  1    |   选填，默认：1，管理员可用状态：0禁用1启用    |
>> | role_id |  1    |   必填，默认：0，角色role表的id    |
>> | super |  1    |   选填，默认：0，已采取过滤，填写无效，是否超级管理员：0否1是    |
> 5. 返回
>>```js
>> {
>>    "msg": "ok",
>>    "data": true
>> }
>>

## 二、修改管理员
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.修改管理员.html" target="_blank">点击查看具体文档：【修改管理员】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由地址：`http://thinkphp.shop/admin/shopmanager/:id` <br/>
>   本地路由地址示例：<http://thinkphp.shop/admin/shopmanager/35> `35`为id值，管理员的id
> 3. 网络地址(需登录)：<http://lesson11.thinkphpshop.51yrc.com/admin/shopmanager/35> `35`为id值，管理员的id
> 4. 请求参数：<br/>`body请求体发送` , `x-www-form-urlencoded`格式
>> | 字段名（属性名） |  值（例如）    |   说明    |
>> | :---:           | :---:         |  :---:    |
>> | username |  admin1    |   必填，管理员账号    |
>> | password |  123456    |   必填，管理员密码(模型已自动加密)    |
>> | avatar |      |   选填，默认：https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png    |
>> | status |  1    |   选填，默认：1，管理员可用状态：0禁用1启用    |
>> | role_id |  1    |   必填，默认：0，角色role表的id    |
>> | super |  1    |   选填，默认：0，已采取过滤，填写无效，是否超级管理员：0否1是    |
> 5. 返回
>>```js
>> {
>>    "msg": "ok",
>>    "data": true
>> }
>>```

### ② eggjs框架接口
<a href="/fourthless/w-a/eggjs.商城管理员.html#三、商城管理员修改、删除、修改可用状态" target="_blank">点击查看具体文档：【三、商城管理员修改、删除、修改可用状态】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由地址：`http://127.0.0.1:7001/shop/admin/shopmanager/:id` <br/>
>   本地路由地址示例：<http://127.0.0.1:7001/shop/admin/shopmanager/35> `35`为id值，管理员的id
> 3. 网络地址(需登录)：<http://lesson11.eggjsshop.51yrc.com/shop/admin/shopmanager/35> `35`为id值，管理员的id
> 4. 请求参数：<br/>`body请求体发送` , `x-www-form-urlencoded`格式
>> | 字段名（属性名） |  值（例如）    |   说明    |
>> | :---:           | :---:         |  :---:    |
>> | username |  admin1    |   必填，管理员账号    |
>> | password |  123456    |   必填，管理员密码(模型已自动加密)    |
>> | avatar |      |   选填，默认：https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png    |
>> | status |  1    |   选填，默认：1，管理员可用状态：0禁用1启用    |
>> | role_id |  1    |   必填，默认：0，角色role表的id    |
>> | super |  1    |   选填，默认：0，已采取过滤，填写无效，是否超级管理员：0否1是    |
> 5. 返回
>>```js
>> {
>>    "msg": "ok",
>>    "data": '修改成功'
>> }
>>```


## 三、删除管理员
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.修改管理员.html#五、删除管理员" target="_blank">点击查看具体文档：【删除管理员--页面文档第五点】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由: `http://thinkphp.shop/admin/shopmanager/:id/delete` <br/>
> 本地路由地址：<http://thinkphp.shop/admin/shopmanager/35/delete> `35`为id值，管理员的id
> 3. 网络地址(需登录)：<http://lesson11.thinkphpshop.51yrc.com/admin/shopmanager/35/delete> `35`为id值，管理员的id
> 4. 请求参数：<br/> `请求体body无需传递参数、只需传递id即可，已经在网址传递了id值`
> 5. 返回
>>```js
>> {
>>    "msg": "ok",
>>    "data": true
>> }
>> ```
### ② eggjs框架接口
<a href="/fourthless/w-a/eggjs.商城管理员.html#三、商城管理员修改、删除、修改可用状态" target="_blank">点击查看具体文档：【三、商城管理员修改、删除、修改可用状态】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由: `http://127.0.0.1:7001/shop/admin/shopmanager/:id/delete` <br/>
> 本地路由地址：<http://127.0.0.1:7001/shop/admin/shopmanager/35/delete> `35`为id值，管理员的id
> 3. 网络地址(需登录)：<http://lesson11.eggjsshop.51yrc.com/shop/admin/shopmanager/35/delete> `35`为id值，管理员的id
> 4. 请求参数：<br/> `请求体body无需传递参数、只需传递id即可，已经在网址传递了id值`
> 5. 返回
>>```js
>> {
>>    "msg": "ok",
>>    "data": true
>> }
>> ```


## 四、管理员列表
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.管理员列表.html" target="_blank">点击查看具体文档：【管理员列表】</a>  <br/>

> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由： `http://thinkphp.shop/admin/shopmanager/:page` <br/>
> 本地路由地址：<http://thinkphp.shop/admin/shopmanager/1> `1`代表第1页 <br/>
> 完整演示：<http://thinkphp.shop/admin/shopmanager/1?limit=10&keyword=admin1>
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
>
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | page     |  是         |  int  |  分页页码     |
> | limit    |  否         |  int  |  每页显示多少条数据     |
> | keyword  |  否         |  string  |  查询关键字，如：管理员的账号，admin1     |
> 5. 返回
>  ```js
> {
>     "msg": "ok",
>     "data": {
>         "list": [
>             {
>                 "id": 2,
>                 "username": "admin3",
>                 "avatar": "",
>                 "status": 1,
>                 "role_id": 1,
>                 "create_time": "2025-03-21 16:02:50",
>                 "update_time": "2025-03-21 16:02:50",
>                 "role": {
>                     "id": 1,
>                     "name": "普通管理员",
>                     "desc": "普通管理员角色",
>                     "status": 1,
>                     "create_time": "2025-03-21 17:43:25",
>                     "update_time": "2025-03-21 17:43:25"
>                 }
>             },
>             {
>                 "id": 1,
>                 "username": "admin2",
>                 "avatar": "",
>                 "status": 1,
>                 "role_id": 3,
>                 "create_time": "2025-03-21 12:29:52",
>                 "update_time": "2025-03-21 12:29:52",
>                 "role": {
>                     "id": 3,
>                     "name": "超级管理员",
>                     "desc": "超级管理员，角色最多，最高级",
>                     "status": 1,
>                     "create_time": "2025-03-21 18:24:08",
>                     "update_time": "2025-03-21 18:24:08"
>                 }
>             }
>         ],
>         "totalCount": 2,
>         "role": [
>             {
>                 "id": 1,
>                 "name": "普通管理员"
>             },
>             {
>                 "id": 2,
>                 "name": "销售人员"
>             },
>             {
>                 "id": 3,
>                 "name": "超级管理员"
>             },
>             {
>                 "id": 4,
>                 "name": "技术人员"
>             }
>         ]
>     }
> }
>```
### ② eggjs框架接口
<a href="/fourthless/w-a/eggjs.商城管理员.html#五、商城管理员列表-api接口" target="_blank">点击查看具体文档：【五、商城管理员列表（API接口）】</a>  <br/>

> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由： `http://127.0.0.1:7001/shop/admin/shopmanager/:page` <br/>
> 本地路由地址：<http://127.0.0.1:7001/shop/admin/shopmanager/1> `1`代表第1页 <br/>
> 完整演示：<http://127.0.0.1:7001/shop/admin/shopmanager/1?limit=5&keyword=admin1>
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
>
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | page     |  是         |  int  |  分页页码     |
> | limit    |  否         |  int  |  每页显示多少条数据     |
> | keyword  |  否         |  string  |  查询关键字，如：管理员的账号，admin1     |
> 5. 返回
>  ```js
> {
>     "msg": "ok",
>     "data": {
>         "list": [
>             {
>                 "create_time": "2025-04-08 16:04:27",
>                 "id": 13,
>                "username": "admin1",
>                "avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>                "status": 1,
>                "super": 1,
>                "role_id": 1,
>                "update_time": "2025-04-08T11:10:00.000Z",
>                "roleId": 1,
>                "role": {
>                    "create_time": "2025-04-01 12:17:54",
>                    "id": 1,
>                    "name": "超级管理员",
>                    "desc": "这是商城的超级管理员角色，它拥有最高权限，可以管理商城后台的所有功能，并且只有一个商城超级管理员",
>                    "status": 1,
>                    "update_time": "2025-04-08T11:08:53.000Z"
>                }
>            }
>        ],
>        "totalCount": 1,
>        "role": [
>            {
>                "id": 1,
>                "name": "超级管理员"
>            },
>            {
>                "id": 7,
>                "name": "库管"
>            },
>            {
>                "id": 8,
>                "name": "销售人员"
>            },
>            {
>                "id": 9,
>                "name": "普通管理人员"
>            }
>        ]
>    }
>}
> ```

## 五、管理员登录和退出登录
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.管理员登录退出.html" target="_blank">点击查看具体文档：【管理员登录和退出】</a>  <br/>

### ② 管理员登录（thinkphp）
> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：`http://thinkphp.shop/admin/login`<br/>
> 本地路由地址：<http://thinkphp.shop/admin/login> <br/>
> 3. 请求参数[body]
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | username   |  是         |  string  |  管理员账号，如：admin2    |
> | password    |  是         |  string  |  管理员密码，如：123456    |
> 5. 返回
>  ```js
>  {
>      "msg": "ok",
>      "data": {
>          "id": 1,
>          "username": "admin2",
>          "avatar": "",
>          "status": 1,
>          "super": 1,
>          "role_id": 3,
>          "create_time": "2025-03-21 12:29:52",
>          "update_time": "2025-03-21 12:29:52",
>          "token": "74ae7f62b4e6605806a6d03fee0d0e0645f86713"
>      }
>  }
>  ```
### ③ 管理员退出登录 （thinkphp）
> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：`http://thinkphp.shop/admin/logout` <br/>
> 本地路由地址：<http://thinkphp.shop/admin/logout> <br/>
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数[body]
> `无`
> 5. 返回
>  ```js
>  {
>      "msg": "ok",
>      "data": {
>          "id": 1,
>          "username": "admin2",
>          "avatar": "",
>          "status": 1,
>          "super": 1,
>          "role_id": 3,
>          "create_time": "2025-03-21 12:29:52",
>          "update_time": "2025-03-21 12:29:52"
>      }
>  }
>  ```

### ④ eggjs框架接口
<a href="/fourthless/w-a/eggjs.商城管理员.html#四、商城管理员登录和退出功能-api接口" target="_blank">点击查看具体文档：【四、商城管理员登录和退出功能（API接口）】</a>  <br/>

### ⑤ 管理员登录（eggjs）
> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：`http://127.0.0.1:7001/shop/login`<br/>
> 本地路由地址：<http://127.0.0.1:7001/shop/login> <br/>
> 3. 请求参数[body]
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | username   |  是         |  string  |  管理员账号，如：admin2    |
> | password    |  是         |  string  |  管理员密码，如：123456    |
> 5. 返回
>  ```js
>  {
>    "msg": "ok",
>    "data": {
>        "create_time": "2025-04-08 16:04:49",
>        "id": 14,
>        "username": "admin2",
>        "avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>        "status": 1,
>        "super": 0,
>        "role_id": 7,
>        "update_time": "2025-04-08T08:04:49.000Z",
>        "roleId": 7,
>        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVfdGltZSI6IjIwMjUtMDQtMDggMTY6MDQ6NDkiLCJpZCI6MTQsInVzZXJuYW1lIjoiYWRtaW4yIiwicGFzc3dvcmQiOiIkMmIkMTAkM3Z6S2gyRnZIQ085ekhlYjViVHY3T08xemlUV1hDWUt5RkFkV2t0NVI3NHVSdzJmdHRIZmUiLCJhdmF0YXIiOiJodHRwczovL3RoaW5rcGhwLWFsbC5vc3MtY24taGFuZ3pob3UuYWxpeXVuY3MuY29tL3B1YmxpYy82N2IzMDAxYjJhZWRkLnBuZyIsInN0YXR1cyI6MSwic3VwZXIiOjAsInJvbGVfaWQiOjcsInVwZGF0ZV90aW1lIjoiMjAyNS0wNC0wOFQwODowNDo0OS4wMDBaIiwicm9sZUlkIjo3LCJpYXQiOjE3NDQzMzc1NjF9.L9poOS4aKeOr9bSzNx9_doUymtZZ6zoAt7safbiKsLQ"
>    }
>  }
>  ```
### ③ 管理员退出登录 （eggjs）
> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：`http://127.0.0.1:7001/shop/logout` <br/>
> 本地路由地址：<http://127.0.0.1:7001/shop/logout> <br/>
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数[body]
> `无`
> 5. 返回
>  ```js
> {
>     "msg": "ok",
>     "data": true
> }
>  ```


## 六、修改管理员可用状态（status:0不可用，1可用）
### ① thinkphp框架接口文档
<a href="/fourthless/w-a/thinkphp.管理员角色管理和状态设置.html" target="_blank">点击查看具体文档：【修改管理员状态】</a>  <br/>
> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/shopmanager/:id/update_status` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/shopmanager/1/update_status>  `1`代表管理员id
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | status     |  是         |  int  |  状态值：0不可用，1可用     |
> 
> 5. 返回
> ```js
> {
>     "msg": "ok",
>     "data": true
> }
> ```

### ② eggjs框架接口文档
<a href="/fourthless/w-a/eggjs.商城管理员.html#三、商城管理员修改、删除、修改可用状态" target="_blank">点击查看具体文档：【三、商城管理员修改、删除、修改可用状态】</a>  <br/>

> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/shopmanager/:id/update_status` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/shopmanager/1/update_status>  `1`代表管理员id
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | status     |  是         |  int  |  状态值：0不可用，1可用     |
> 
> 5. 返回
> ```js
> {
>     "msg": "ok",
>     "data": true
> }
> ```

## 七、管理员(角色)权限列表
### ① thinkphp框架接口文档
<a href="/fourthless/w-a/thinkphp.管理员角色管理和状态设置.html#二、角色列表" target="_blank">点击查看具体文档：【角色列表（及第四点获取角色列表并包含角色的权限数据）】</a>  <br/>

> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/role/:page?limit=[:limit]` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/role/1?limit=5>  `1`代表第1页，`5`代表每页5条数据
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | page     |  是         |  int  |  页码     |
> | limit     |  否         |  int  |  每页多少条数据     |
> 
> 5. 返回
> ```js
> {
>     "msg": "ok",
>     "data": {
>         "list": [
>             {
>                 "id": 4,
>                 "name": "技术人员",
>                 "desc": "技术人员的一些权限",
>                 "status": 1,
>                 "create_time": "2025-03-21 18:47:35",
>                 "update_time": "2025-03-21 18:47:35",
>                 "rules": []
>             },
>             {
>                 "id": 1,
>                 "name": "普通管理员",
>                 "desc": "普通管理员角色",
>                 "status": 1,
>                 "create_time": "2025-03-21 17:43:25",
>                 "update_time": "2025-03-21 17:43:25",
>                 "rules": [
>                     {
>                         "id": 1,
>                         "pid": 0,
>                         "status": 1,
>                         "name": "管理员管理",
>                         "frontname": "",
>                         "frontpath": "",
>                         "condition": "",
>                         "menu": 1,
>                         "order": 50,
>                         "icon": "",
>                         "method": "POST",
>                         "create_time": "2025-03-26 17:09:21",
>                         "update_time": "2025-03-26 17:09:21",
>                         "pivot": {
>                             "id": 1,
>                             "role_id": 1,
>                             "rule_id": 1,
>                             "create_time": "2025-03-26 21:12:50",
>                             "update_time": "2025-03-26 21:12:50"
>                         }
>                     },
>                     {
>                         "id": 2,
>                         "pid": 1,
>                         "status": 1,
>                         "name": "删除管理员",
>                         "frontname": "",
>                         "frontpath": "",
>                         "condition": "admin.ShopManager/delete",
>                         "menu": 1,
>                         "order": 50,
>                         "icon": "",
>                         "method": "POST",
>                         "create_time": "2025-03-26 17:12:39",
>                         "update_time": "2025-03-26 17:12:39",
>                         "pivot": {
>                             "id": 2,
>                             "role_id": 1,
>                             "rule_id": 2,
>                             "create_time": "2025-03-26 21:12:50",
>                             "update_time": "2025-03-26 21:12:50"
>                         }
>                     },
>                     {
>                         "id": 4,
>                         "pid": 0,
>                         "status": 1,
>                         "name": "角色管理",
>                         "frontname": "",
>                         "frontpath": "",
>                         "condition": "",
>                         "menu": 1,
>                         "order": 50,
>                         "icon": "",
>                         "method": "POST",
>                         "create_time": "2025-03-26 17:14:25",
>                         "update_time": "2025-03-26 17:14:25",
>                         "pivot": {
>                             "id": 4,
>                             "role_id": 1,
>                             "rule_id": 4,
>                             "create_time": "2025-03-26 21:14:14",
>                             "update_time": "2025-03-26 21:14:14"
>                         }
>                     },
>                     {
>                         "id": 5,
>                         "pid": 4,
>                         "status": 1,
>                         "name": "角色列表",
>                         "frontname": "",
>                         "frontpath": "",
>                         "condition": "admin.Role/index",
>                         "menu": 1,
>                         "order": 50,
>                         "icon": "",
>                         "method": "POST",
>                         "create_time": "2025-03-26 17:15:21",
>                         "update_time": "2025-03-26 17:15:21",
>                         "pivot": {
>                             "id": 5,
>                             "role_id": 1,
>                             "rule_id": 5,
>                             "create_time": "2025-03-26 21:15:43",
>                             "update_time": "2025-03-26 21:15:43"
>                         }
>                     }
>                 ]
>             }
>         ],
>         "totalCount": 4
>     }
> }
> ```

### ② eggjs框架接口文档
<a href="/fourthless/w-a/eggjs.管理员板块.html#九、角色列表-包含角色对应的权限api接口" target="_blank">点击查看具体文档：【九、角色列表（包含角色对应的权限API接口）】</a>  <br/>

> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/role/:page?limit=[:limit]` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/role/1?limit=5>  `1`代表第1页，`5`代表每页5条数据
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | page     |  是         |  int  |  页码     |
> | limit     |  否         |  int  |  每页多少条数据     |
> 
> 5. 返回
```js
{
    "msg": "ok",
    "data": {
        "list": [
            {
                "create_time": "2025-04-09 16:47:28",
                "id": 9,
                "name": "普通管理人员",
                "desc": "对商城系统拥有一般的关联权限",
                "status": 1,
                "update_time": "2025-04-09T08:47:28.000Z",
                "rules": [
                    {
                        "create_time": "2025-04-10 17:15:10",
                        "id": 34,
                        "pid": 33,
                        "status": 1,
                        "name": "创建角色",
                        "frontname": "",
                        "frontpath": "",
                        "condition": "",
                        "menu": 0,
                        "order": 50,
                        "icon": "",
                        "method": "GET",
                        "update_time": "2025-04-10T09:15:10.000Z"
                    },
                    {
                        "create_time": "2025-04-10 17:14:21",
                        "id": 32,
                        "pid": 30,
                        "status": 1,
                        "name": "修改管理员",
                        "frontname": "",
                        "frontpath": "",
                        "condition": "",
                        "menu": 1,
                        "order": 50,
                        "icon": "",
                        "method": "POST",
                        "update_time": "2025-04-10T09:14:49.000Z"
                    },
                    {
                        "create_time": "2025-04-10 17:13:54",
                        "id": 30,
                        "pid": 0,
                        "status": 1,
                        "name": "管理员管理",
                        "frontname": "",
                        "frontpath": "",
                        "condition": "",
                        "menu": 1,
                        "order": 50,
                        "icon": "",
                        "method": "GET",
                        "update_time": "2025-04-10T09:13:54.000Z"
                    },
                    {
                        "create_time": "2025-04-10 17:14:37",
                        "id": 33,
                        "pid": 0,
                        "status": 1,
                        "name": "角色管理",
                        "frontname": "",
                        "frontpath": "",
                        "condition": "",
                        "menu": 1,
                        "order": 50,
                        "icon": "",
                        "method": "GET",
                        "update_time": "2025-04-10T09:14:37.000Z"
                    },
                    {
                        "create_time": "2025-04-10 17:14:07",
                        "id": 31,
                        "pid": 30,
                        "status": 1,
                        "name": "创建管理员",
                        "frontname": "",
                        "frontpath": "",
                        "condition": "",
                        "menu": 1,
                        "order": 50,
                        "icon": "",
                        "method": "POST",
                        "update_time": "2025-04-10T09:14:44.000Z"
                    }
                ]
            },
            {
                "create_time": "2025-04-07 17:48:53",
                "id": 8,
                "name": "销售人员",
                "desc": "对商城产品销售做一些统计等等",
                "status": 1,
                "update_time": "2025-04-07T09:48:53.000Z",
                "rules": [
                    {
                        "create_time": "2025-04-10 17:15:10",
                        "id": 34,
                        "pid": 33,
                        "status": 1,
                        "name": "创建角色",
                        "frontname": "",
                        "frontpath": "",
                        "condition": "",
                        "menu": 0,
                        "order": 50,
                        "icon": "",
                        "method": "GET",
                        "update_time": "2025-04-10T09:15:10.000Z"
                    },
                    {
                        "create_time": "2025-04-10 17:14:37",
                        "id": 33,
                        "pid": 0,
                        "status": 1,
                        "name": "角色管理",
                        "frontname": "",
                        "frontpath": "",
                        "condition": "",
                        "menu": 1,
                        "order": 50,
                        "icon": "",
                        "method": "GET",
                        "update_time": "2025-04-10T09:14:37.000Z"
                    }
                ]
            },
            {
                "create_time": "2025-04-02 17:52:13",
                "id": 7,
                "name": "库管",
                "desc": "管理商城日常库存，上架、下架商品",
                "status": 1,
                "update_time": "2025-04-08T11:09:00.000Z",
                "rules": []
            },
            {
                "create_time": "2025-04-01 12:17:54",
                "id": 1,
                "name": "超级管理员",
                "desc": "这是商城的超级管理员角色，它拥有最高权限，可以管理商城后台的所有功能，并且只有一个商城超级管理员",
                "status": 1,
                "update_time": "2025-04-08T11:08:53.000Z",
                "rules": []
            }
        ],
        "totalCount": 4
    }
}
```
