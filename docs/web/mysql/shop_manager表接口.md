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

## 五、管理员登录和退出登录
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.管理员登录退出.html" target="_blank">点击查看具体文档：【管理员登录和退出】</a>  <br/>

### ② 管理员登录
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
### ③ 管理员退出登录
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
> `无返回值`
