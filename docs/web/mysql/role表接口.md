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
