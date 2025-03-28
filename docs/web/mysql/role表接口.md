---
navbar: true
sidebar: auto
title: role表接口
---

## 一、创建角色
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.角色管理.html" target="_blank">点击查看具体文档：【创建角色】</a>  <br/>

> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/role` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/role>  
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
> | name     |  是         |  string  |  角色名称，最多30个字符     |
> | desc     |  否         |  string  |  角色描述，最多255个字符     |
> 
> 5. 返回
> ```js
> {
>     "msg": "ok",
>     "data": true
> }
> ```

## 二、修改角色
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.角色管理.html#二、修改角色" target="_blank">点击查看具体文档：【修改角色】</a>  <br/>

> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/role/:id` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/role/7>  `7`代表角色id
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
> | name     |  是         |  string  |  角色名称，最多30个字符     |
> | desc     |  否         |  string  |  角色描述，最多255个字符     |
> 
> 5. 返回
> ```js
> {
>     "msg": "ok",
>     "data": true
> }
> ```

## 三、修改角色状态
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.角色管理.html#三、修改角色状态" target="_blank">点击查看具体文档：【修改角色状态】</a>  <br/>
> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/role/:id/update_status` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/role/1/update_status>  `1`代表角色id
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


## 四、删除角色
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.角色管理.html#四、删除角色" target="_blank">点击查看具体文档：【删除角色】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由: `http://thinkphp.shop/admin/role/:id/delete` <br/>
> 本地路由地址：<http://thinkphp.shop/admin/role/35/delete> `35`为角色的id
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数：<br/> `请求体body无需传递参数、只需传递id即可，已经在网址传递了id值`
> 5. 返回
>>```js
>> {
>>    "msg": "ok",
>>    "data": true
>> }
>> ```


## 五、给角色role配置权限rule
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.角色管理.html#五、给角色role配置权限rule" target="_blank">点击查看具体文档：【给角色role配置权限rule】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由: `http://thinkphp.shop/admin/role/set_rules` <br/>
> 本地路由地址：<http://thinkphp.shop/admin/role/set_rules>
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> |      |  是         |  JSON  |   权限表id集合及角色id的json数据    |
> 
> 在`postman`中，`Body` -> `raw` -> `JSON` -> 输入json数据:
> ```js
> {
>   "id":2, // 角色id
>   "rule_ids":[6,7,8,9] // 权限id集合
> }
> ```
> 5. 返回
> ```js
> {
>     "msg": "ok",
>     "data": true
> }
> ```