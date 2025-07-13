---
navbar: true
sidebar: auto
title: eggjs即时通讯接口
---

## 一、用户注册
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯后台.html#二-即时通讯用户登录注册接口开发" target="_blank">用户注册</a>
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/regChat`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/regChat> <br/>
> 3. 请求参数 [body] -> [x-www-form-urlencoded]
>
> | 参数       |  是否必填    |  类型    |  长度                   | 说明     |
> | :---:      | :---:       |  :---:   | :---:                  |:---:     |
> | username   |  是         |  string  |  4-20位，字母数字下划线  |用户名（账号），如：`my01`  |
> | password   |  是         |  string  |  6-20位                 |密码，如：`123456`  |
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": {
>          "create_time": "2025-07-13 11:46:05",
>          "id": 6,
>          "uuid": "be047323-c8e3-4305-b014-3d8c7d24f300",
>          "username": "my01",
>          "nickname": "",
>          "avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>          "mobile": null,
>          "email": null,
>          "status": 1,
>          "last_login": null,
>          "last_login_ip": null,
>          "register_time": "2025-07-13T03:46:05.000Z",
>          "register_ip": null,
>          "is_deleted": 0,
>          "wechat_openid": null,
>          "qq_openid": null,
>          "weibo_uid": null,
>          "role": "user",
>          "is_email_verified": 0,
>          "is_mobile_verified": 0,
>          "order": 50,
>          "update_time": "2025-07-13T03:46:05.000Z",
>          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVfdGltZSI6IjIwMjUtMDctMTMgMTE6NDY6MDUiLCJpZCI6NiwidXVpZCI6ImJlMDQ3MzIzLWM4ZTMtNDMwNS1iMDE0LTNkOGM3ZDI0ZjMwMCIsInVzZXJuYW1lIjoibXkwNiIsInBhc3N3b3JkIjoiOGQ5NjllZWY2ZWNhZDNjMjlhM2E2MjkyODBlNjg2Y2YwYzNmNWQ1YTg2YWZmM2NhMTIwMjBjOTIzYWRjNmM5MiIsIm5pY2tuYW1lIjoiIiwiYXZhdGFyIjoiaHR0cHM6Ly90aGlua3BocC1hbGwub3NzLWNuLWhhbmd6aG91LmFsaXl1bmNzLmNvbS9wdWJsaWMvNjdiMzAwMWIyYWVkZC5wbmciLCJtb2JpbGUiOm51bGwsImVtYWlsIjpudWxsLCJzdGF0dXMiOjEsImxhc3RfbG9naW4iOm51bGwsImxhc3RfbG9naW5faXAiOm51bGwsInJlZ2lzdGVyX3RpbWUiOiIyMDI1LTA3LTEzVDAzOjQ2OjA1LjAwMFoiLCJyZWdpc3Rlcl9pcCI6bnVsbCwiaXNfZGVsZXRlZCI6MCwid2VjaGF0X29wZW5pZCI6bnVsbCwicXFfb3BlbmlkIjpudWxsLCJ3ZWlib191aWQiOm51bGwsInJvbGUiOiJ1c2VyIiwiaXNfZW1haWxfdmVyaWZpZWQiOjAsImlzX21vYmlsZV92ZXJpZmllZCI6MCwib3JkZXIiOjUwLCJ1cGRhdGVfdGltZSI6IjIwMjUtMDctMTNUMDM6NDY6MDUuMDAwWiIsImlhdCI6MTc1MjM3ODM2NX0.M7fae1gBTqQO4ewAELqz51blbv_0kh27UVgDOVImwkU"
>      }
>  }
>  ```


## 二、用户登录
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯后台.html#二-即时通讯用户登录注册接口开发" target="_blank">用户登录</a>
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/loginChat`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/loginChat> <br/>
> 3. 请求参数 [body] -> [x-www-form-urlencoded]
>
> | 参数       |  是否必填    |  类型    |  长度                   | 说明     |
> | :---:      | :---:       |  :---:   | :---:                  |:---:     |
> | username   |  是         |  string  |  4-20位，字母数字下划线  |用户名（账号），如：`my01`  |
> | password   |  是         |  string  |  6-20位                 |密码，如：`123456`  |
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": {
>          "create_time": "2025-07-13 11:46:05",
>          "id": 6,
>          "uuid": "be047323-c8e3-4305-b014-3d8c7d24f300",
>          "username": "my01",
>          "nickname": "",
>          "avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>          "mobile": null,
>          "email": null,
>          "status": 1,
>          "last_login": null,
>          "last_login_ip": null,
>          "register_time": "2025-07-13T03:46:05.000Z",
>          "register_ip": null,
>          "is_deleted": 0,
>          "wechat_openid": null,
>          "qq_openid": null,
>          "weibo_uid": null,
>          "role": "user",
>          "is_email_verified": 0,
>          "is_mobile_verified": 0,
>          "order": 50,
>          "update_time": "2025-07-13T03:46:05.000Z",
>          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVfdGltZSI6IjIwMjUtMDctMTMgMTE6NDY6MDUiLCJpZCI6NiwidXVpZCI6ImJlMDQ3MzIzLWM4ZTMtNDMwNS1iMDE0LTNkOGM3ZDI0ZjMwMCIsInVzZXJuYW1lIjoibXkwNiIsInBhc3N3b3JkIjoiOGQ5NjllZWY2ZWNhZDNjMjlhM2E2MjkyODBlNjg2Y2YwYzNmNWQ1YTg2YWZmM2NhMTIwMjBjOTIzYWRjNmM5MiIsIm5pY2tuYW1lIjoiIiwiYXZhdGFyIjoiaHR0cHM6Ly90aGlua3BocC1hbGwub3NzLWNuLWhhbmd6aG91LmFsaXl1bmNzLmNvbS9wdWJsaWMvNjdiMzAwMWIyYWVkZC5wbmciLCJtb2JpbGUiOm51bGwsImVtYWlsIjpudWxsLCJzdGF0dXMiOjEsImxhc3RfbG9naW4iOm51bGwsImxhc3RfbG9naW5faXAiOm51bGwsInJlZ2lzdGVyX3RpbWUiOiIyMDI1LTA3LTEzVDAzOjQ2OjA1LjAwMFoiLCJyZWdpc3Rlcl9pcCI6bnVsbCwiaXNfZGVsZXRlZCI6MCwid2VjaGF0X29wZW5pZCI6bnVsbCwicXFfb3BlbmlkIjpudWxsLCJ3ZWlib191aWQiOm51bGwsInJvbGUiOiJ1c2VyIiwiaXNfZW1haWxfdmVyaWZpZWQiOjAsImlzX21vYmlsZV92ZXJpZmllZCI6MCwib3JkZXIiOjUwLCJ1cGRhdGVfdGltZSI6IjIwMjUtMDctMTNUMDM6NDY6MDUuMDAwWiIsImlhdCI6MTc1MjM3ODg4MH0.HF-f4FirC8v3hfhGU2z9MB8NWOnNuILTOiVgrGZWVcI"
>      }
>  }
>  ```


## 三、用户退出
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯后台.html#二-即时通讯用户登录注册接口开发" target="_blank">用户退出</a>
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/logout`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/logout> <br/>
> 3. 请求参数 [body] -> [none]
> `无需传参`
> 4. header头传token
> 
> 请求参数 [Headers] -> [Key: `token`, Value: `token值`]
> 
> | 参数       |  是否必填    |  类型    |  长度                   | 说明     |
> | :---:      | :---:       |  :---:   | :---:                  |:---:     |
> | token      |  是         |  string  |  由服务器生成           | `token令牌`，如：`eyJhbGciO.....`  |
> 
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": true
>  }
>  ```

## 四、搜索用户
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯好友相关接口.html#一、-搜索用户-好友" target="_blank">搜索用户</a>
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