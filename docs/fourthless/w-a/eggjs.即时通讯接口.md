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
说明：`搜索用户（登录用户才能搜索用户，未登录用户（游客）不能搜索用户）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯好友相关接口.html#一、-搜索用户-好友" target="_blank">一、 搜索用户（好友）</a>
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

## 五、申请添加好友
说明：`申请添加好友 （登录用户才能申请添加好友，（游客）不能申请添加好友）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯好友相关接口.html#三、添加好友-申请添加好友" target="_blank">三、添加好友（申请添加好友）</a>
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


## 六、查看好友申请列表（获取别人申请我为好友的列表数据）
说明：`（登录用户才能查看好友申请列表，（游客）不能查看好友申请列表）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯好友相关接口.html#四、查看好友申请列表-获取别人申请我为好友的列表数据" target="_blank">四、查看好友申请列表（获取别人申请我为好友的列表数据）</a>
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
> 4. 请求参数 [body] -> [x-www-form-urlencoded] -> 参数：`无` <br/>
> 
> 从网址上传递参数 <br/>
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

## 七、处理好友的申请（对申请加我为好友的信息进行处理）
说明：`（登录用户才能处理好友的申请，（游客）不能处理好友的申请）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯好友相关接口.html#五、处理好友的申请-对申请加我为好友的信息进行处理" target="_blank">五、处理好友的申请（对申请加我为好友的信息进行处理）</a>
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


## 八、好友列表（联系人、通讯录）
说明：`（登录用户才有好友列表，（游客）没有好友列表）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯好友相关接口.html#六、好友列表-联系人、通讯录" target="_blank">六、好友列表（联系人、通讯录）</a>
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
> 4. 请求参数 
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

## 九、查看好友资料信息
说明： `（登录用户才可以查看好友资料信息，（游客）没有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯好友相关接口.html#七、查看好友资料信息" target="_blank">七、查看好友资料信息</a>
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


## 十、将好友移入移出黑名单
说明：`（登录用户有将好友移入移出黑名单功能，（游客）没有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯好友相关接口.html#八、将好友移入移出黑名单" target="_blank">八、将好友移入移出黑名单</a>
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


## 十一、将好友设置为星标好友或者取消
说明：`（登录用户有设置为星标好友或者取消功能，（游客）没有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯好友相关接口.html#九、将好友设置为星标好友或者取消" target="_blank">九、将好友设置为星标好友或者取消</a>
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

## 十二、设置我和朋友是否可以互相查看对方发布的信息或者朋友圈
说明：`（登录用户有这个功能，（游客）没有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯好友相关接口.html#十、设置我和朋友是否可以互相查看对方发布的信息或者朋友圈" target="_blank">十、设置我和朋友是否可以互相查看对方发布的信息或者朋友圈</a>
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


## 十三、给游客用户注册身份
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯后台.html#三、给未登录用户创建一个游客身份" target="_blank">三、给未登录用户(游客)创建一个游客身份</a> <br/>
说明：服务端做了以下限制<br/>
1. 1个小时内，同一个设备只能请求5次
2. 客户端签名，5分钟内有效
3. 设备id必须符合指定标识 <br/>
以上设置主要为了服务请求安全和减轻服务器压力。<br/>
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/visitorRegister`<br/> 
> 本地路由地址：<http://127.0.0.1:7001/api/visitorRegister> <br/> 
> 3. header头传客户端签名
> 
> 请求参数 [Headers] -> [Key: `X-Security-Sign`, Value: `客户端签名值`]
> 
> | 参数       |  是否必填    |  类型    |  长度                   | 说明     |
> | :---:      | :---:       |  :---:   | :---:                  |:---:     |
> | `X-Security-Sign` |  是 |  string | 由客户端生成，服务端检验签名是否正确 | `客户端签名`，如：`12b4792d.....`  |
> 
> 4. 请求参数 [body] -> [x-www-form-urlencoded]
>
> | 参数   |  是否必填    |  类型  |  长度  | 默认值| 说明     |
> | :---:  | :---:       |  :---: | :---: |:---:   |:---:     |
> | deviceId   |  是  |  string  | |     |  客户端生成特定的标识符，到服务端进行校验，如 `"8d1a344c-bf16-5425-adbc-d12f49cfa332"`  |
> | timestamp   |  是  |  Date  | |     |  时间戳，校验签名时效性，5分钟内有效，如：`1752835449008`  |
> | uniplatform   |  否  |  string  | 2-50位 |     |  平台类型：（web/mp-weixin/app）统计用  |
> | devicemodel   |  否  |  string  | 1-50位 |     |  设备型号  统计用  |
> | deviceos      |  否  |  string  | 1-50位 |     |  操作系统  统计用  |
> | devicebrand   |  否  |  string  | 1-50位 |     |  设备品牌  统计用  |
> 5. 返回示例
> ```js
> {
>     "msg": "ok",
>     "data": {
>         "create_time": "2025-07-18 18:44:09",
>         "id": 47,
>         "uuid": "0d4e20a9-28b6-45d0-9dc6-18cf09d2aa1b",
>         "username": "VIS8d1a344c",
>         "nickname": "",
>         "avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>         "devicefingeruuid": "8d1a344c-bf16-5425-adbc-d12f49cfa332",
>         "uniplatform": "",
>         "devicemodel": "",
>         "deviceos": "",
>         "devicebrand": "",
>         "mobile": null,
>         "email": null,
>         "status": 1,
>         "last_login": "2025-07-18T10:44:09.000Z",
>         "last_login_ip": null,
>         "register_time": "2025-07-18T10:44:09.000Z",
>         "register_ip": null,
>         "is_deleted": 0,
>         "wechat_openid": null,
>         "qq_openid": null,
>         "weibo_uid": null,
>         "role": "visitor",
>         "is_email_verified": 0,
>         "is_mobile_verified": 0,
>         "order": 50,
>         "update_time": "2025-07-18T10:44:09.000Z",
>         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVfdGltZSI6IjIwMjUtMDctMTggMTg6NDQ6MDk..."
>     }
> }
> ```


## 十四、游客用户自己正式注册身份
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯后台.html#三、给未登录用户创建一个游客身份" target="_blank">三、给未登录用户(游客)创建一个游客身份</a> <br/>
说明：服务端做了以下限制<br/>
1. 1个小时内，同一个设备只能请求5次
2. 客户端签名，5分钟内有效
3. 设备id必须符合指定标识 <br/>
以上设置主要为了服务请求安全和减轻服务器压力。<br/>
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/visitorregChat`<br/> 
> 本地路由地址：<http://127.0.0.1:7001/api/visitorregChat> <br/> 
> 3. header头传客户端签名
> 
> 请求参数 [Headers] -> [Key: `X-Security-Sign`, Value: `客户端签名值`]
> 
> | 参数       |  是否必填    |  类型    |  长度                   | 说明     |
> | :---:      | :---:       |  :---:   | :---:                  |:---:     |
> | `X-Security-Sign` |  是 |  string | 由客户端生成，服务端检验签名是否正确 | `客户端签名`，如：`12b4792d.....`  |
> 
> 4. 请求参数 [body] -> [x-www-form-urlencoded]
>
> | 参数   |  是否必填    |  类型  |  长度  | 默认值| 说明     |
> | :---:  | :---:       |  :---: | :---: |:---:   |:---:     |
> | deviceId   |  是  |  string  | |     |  客户端生成特定的标识符，到服务端进行校验，如 `"8d1a344c-bf16-5425-adbc-d12f49cfa332"`  |
> | timestamp   |  是  |  Date  |         |     |  时间戳，校验签名时效性，5分钟内有效，如：`1752835449008`  |
> | username   |  是 |  string  |  4-20位，字母数字下划线  |    |用户名（账号），如：`my01`  |
> | password   |  是 |  string  |  6-20位                 |    |密码，如：`123456`  |
> 5. 返回示例
> ```js
> {
>     "msg": "ok",
>     "data": {
>         "create_time": "2025-07-18 18:44:09",
>         "id": 47,
>         "uuid": "0d4e20a9-28b6-45d0-9dc6-18cf09d2aa1b",
>         "username": "my01",
>         "nickname": "",
>         "avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>         "devicefingeruuid": "8d1a344c-bf16-5425-adbc-d12f49cfa332",
>         "uniplatform": "",
>         "devicemodel": "",
>         "deviceos": "",
>         "devicebrand": "",
>         "mobile": null,
>         "email": null,
>         "status": 1,
>         "last_login": "2025-07-18T10:44:09.000Z",
>         "last_login_ip": null,
>         "register_time": "2025-07-18T10:44:09.000Z",
>         "register_ip": null,
>         "is_deleted": 0,
>         "wechat_openid": null,
>         "qq_openid": null,
>         "weibo_uid": null,
>         "role": "user",
>         "is_email_verified": 0,
>         "is_mobile_verified": 0,
>         "order": 50,
>         "update_time": "2025-07-18T10:44:09.000Z",
>         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVfdGltZSI6IjIwMjUtMDctMTggMTg6NDQ6MDk..."
>     }
> }
> ```

## 十五、游客用户自己正式登录身份
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯后台.html#三、给未登录用户创建一个游客身份" target="_blank">三、给未登录用户(游客)创建一个游客身份</a> <br/>
说明：服务端做了以下限制<br/>
1. 1个小时内，同一个设备只能请求5次
2. 客户端签名，5分钟内有效
3. 设备id必须符合指定标识 <br/>
以上设置主要为了服务请求安全和减轻服务器压力。<br/>
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/visitorloginChat`<br/> 
> 本地路由地址：<http://127.0.0.1:7001/api/visitorloginChat> <br/> 
> 3. header头传客户端签名
> 
> 请求参数 [Headers] -> [Key: `X-Security-Sign`, Value: `客户端签名值`]
> 
> | 参数       |  是否必填    |  类型    |  长度                   | 说明     |
> | :---:      | :---:       |  :---:   | :---:                  |:---:     |
> | `X-Security-Sign` |  是 |  string | 由客户端生成，服务端检验签名是否正确 | `客户端签名`，如：`12b4792d.....`  |
> 
> 4. 请求参数 [body] -> [x-www-form-urlencoded]
>
> | 参数   |  是否必填    |  类型  |  长度  | 默认值| 说明     |
> | :---:  | :---:       |  :---: | :---: |:---:   |:---:     |
> | deviceId   |  是  |  string  | |     |  客户端生成特定的标识符，到服务端进行校验，如 `"8d1a344c-bf16-5425-adbc-d12f49cfa332"`  |
> | timestamp   |  是  |  Date  |         |     |  时间戳，校验签名时效性，5分钟内有效，如：`1752835449008`  |
> | username   |  是 |  string  |  4-20位，字母数字下划线  |    |用户名（账号），如：`my01`  |
> | password   |  是 |  string  |  6-20位                 |    |密码，如：`123456`  |
> 5. 返回示例
> ```js
> {
>     "msg": "ok",
>     "data": {
>         "create_time": "2025-07-18 18:44:09",
>         "id": 47,
>         "uuid": "0d4e20a9-28b6-45d0-9dc6-18cf09d2aa1b",
>         "username": "my01",
>         "nickname": "",
>         "avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>         "devicefingeruuid": "8d1a344c-bf16-5425-adbc-d12f49cfa332",
>         "uniplatform": "",
>         "devicemodel": "",
>         "deviceos": "",
>         "devicebrand": "",
>         "mobile": null,
>         "email": null,
>         "status": 1,
>         "last_login": "2025-07-18T10:44:09.000Z",
>         "last_login_ip": null,
>         "register_time": "2025-07-18T10:44:09.000Z",
>         "register_ip": null,
>         "is_deleted": 0,
>         "wechat_openid": null,
>         "qq_openid": null,
>         "weibo_uid": null,
>         "role": "user",
>         "is_email_verified": 0,
>         "is_mobile_verified": 0,
>         "order": 50,
>         "update_time": "2025-07-18T10:44:09.000Z",
>         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVfdGltZSI6IjIwMjUtMDctMTggMTg6NDQ6MDk..."
>     }
> }
> ```


## 十六、查看用户资料
说明：（`查看用户资料属于公共接口，游客和登录用户都可以访问`） <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#_2-查看用户资料" target="_blank">② 查看用户资料</a>
> 1. 请求方式：`get` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/userinfo/:uuid`  传用户`uuid`值 <br/>
> 本地路由地址：<http://127.0.0.1:7001/api/userinfo/edda71aa-4a31-4ba8-9025-8fdc0dc3c0fa> <br/>
> 3. 请求参数 [body] -> [x-www-form-urlencoded]
> 无需传参
>
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": {
>          "uuid": "edda71aa-4a31-4ba8-9025-8fdc0dc3c0fa",
>          "username": "my01",
>          "nickname": "魂牵一梦",
>          "avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>          "role": "user",
>          "userinfo": {
>              "id": 1,
>              "gender": "unknown",
>              "birthday": null,
>              "bio": null,
>              "location": "武汉",
>              "website": null
>          },
>          // 模拟数据（用户表没有userset字段以前的模式数据）
>          /*
>          "chatset": {
>              "visitor": {
>                   "sendCount": 0,
>                   "needFollow": true
>               },
>               "user": {
>                   "sendCount": 0,
>                   "needFollow": true
>               }
>          },
>          */
>          // 数据库用户设置的数据
>          "userset": "{\"chatset\":{\"visitor\":0,\"user\":0}}",
>      }
>  }
>  ```


## 十七、查看用户是否申请加我为好友(即我有没有权限处理这个申请)
说明：（`登录用户有这个权限，游客无权限`） <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#_3-新增接口-查看用户是否申请加我为好友" target="_blank">③ 新增接口：查看用户是否申请加我为好友</a>
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/isApplyfriend/:uuid`  传用户`uuid`值 <br/>
> 本地路由地址示例：<http://127.0.0.1:7001/api/chat/isApplyfriend/d8ffff3b-200d-4282-9e32-28e19a4fee71> <br/>
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
> 无需传参
>
> 5. 返回示例
> ```js
> {
>     "msg": "ok",
>     "data": {
>         "id": 16,
>         "user_id": 7,
>         "friend_id": 6,
>         "nickname": "我是my07,加你为好友，请通过一下，我有业务要咨询您",
>         "friendlookme": 1,
>         "melookfriend": 1,
>         "ismystarfriend": 0,
>         "isblack": 0,
>         "status": "pending",
>         "userId": 7
>     }
> }
> ```


## 十八、用户设置更新
说明：`（登录用户有这个权限，游客无权限）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#_5-新增接口-用户设置更新" target="_blank">⑤ 新增接口：用户设置更新</a>
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/userset`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/userset> <br/> 
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
> | userset   |  是         |  text  | |          |  设置的信息，转成json字符串后发送给服务器  |
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": "ok"
>  }
>  ```


## 十九、查询一下对方是否是我的好友
说明：`（登录用户有这个功能，（游客）没有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#_6-新增接口-查询一下对方是否是我的好友" target="_blank">⑥ 新增接口：查询一下对方是否是我的好友</a>
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/ismygoodfriend/:id`<br/> `id`表示好友的id值 <br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/ismygoodfriend/1> <br/> `1`表示好友的id值 <br/>
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
> 
> 请求体无需传参
> 
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": {
>          "id": 29,
>          "user_id": 6,
>          "friend_id": 1,
>          "nickname": "魂牵一梦",
>          "friendlookme": 1,
>          "melookfriend": 1,
>          "ismystarfriend": 0,
>          "isblack": 0,
>          "status": 1
>      }
>  }
>  ```


## 二十、给服务器发消息（单聊）（发送消息给对方）
说明：`(游客，登录用户均可，只要token是正确的就行)` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#三、发送消息-单聊" target="_blank">三、发送消息(单聊)</a>
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/socket/sendmessage`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/socket/sendmessage> <br/> 
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
> | sendto_id   |  是         |  int  | int(11) |          |  接收人/群的id值  |
> | chatType   |  是         |  string  |  |          |  接收类型: `['single', 'group']` 单聊 single 群聊 group  |
> | type   |  是         |  string  |  |          | 消息类型: `text、iconMenus、image、audio、video` 等等  |
> | data   |  是         |  string  |  |          |  消息内容  |
> | options   |  否      |  string  |  |          |  额外参数json字符串  |
> 5. 返回示例
>  ```js
>  // websocket 接收的消息
>  {
>    type: "singleChat", 
>    data: {…}, // 和页面接收服务器返回的结果data数据一样
>    timestamp: 1753934390663
>  }
>  // 页面接收服务器返回的结果
>  {
>    "msg": "ok",
>    "data": {
>        "id": "10d0c78a-0133-4be8-9b18-879f9682b246",
>        "from_avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>        "from_name": "my06",
>        "from_id": 6,
>        "to_id": 10,
>        "to_name": "my10",
>        "to_avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>        "chatType": "single",
>        "type": "text",
>        "data":  "{\"data\":\"你好，阿祖\",\"dataType\":false,\"otherData\":null}",
>        "options": {},
>        "create_time": 1753934390663,
>        "isremove": 0
>    }
>  }
>  ```


## 二十一、创建群聊（成功后通过webSocket通知群聊用户）
说明：`(登录用户有这个功能，（游客）没有这个功能)` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#四、创建群聊-成功后通过websocket通知群聊用户" target="_blank">四、创建群聊（成功后通过webSocket通知群聊用户）</a>
> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/group/create`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/group/create> <br/> 
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
> | userIds   |  是         |  array  |  |          |  通过好友列表选择的id（好友列表id）组成的数组  |
> 5. 返回示例
>  ```js
>  {
>    "msg": "ok",
>    "data": "ok",
>  }
>  ```



## 二十二、获取离线消息（不在线的时候别人给你发的或者群里面发的消息）
说明：`（登录用户和游客都有这个功能）（亮点：游客因为也有token, 所以他再次上线也可以接收客服给他发的消息）` <br/>
1. 接口文档查看：<a href="/thirdless/w-b/08聊天通讯群组.html#十三、获取离线消息-不在线的时候别人给你发的或者群里面发的消息" target="_blank">十三、获取离线消息（不在线的时候别人给你发的或者群里面发的消息）</a> <br/>
2. 此消息是通过服务器websocket推送的消息，页面无需额外处理 <br/>

> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/chatGetmessageOffLine`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/chatGetmessageOffLine> <br/> 
> 3. header头传token
> 
> 请求参数 [Headers] -> [Key: `token`, Value: `token值`]
> 
> | 参数       |  是否必填    |  类型    |  长度                   | 说明     |
> | :---:      | :---:       |  :---:   | :---:                  |:---:     |
> | token      |  是         |  string  |  由服务器生成           | `token令牌`，如：`eyJhbGciO.....`  |
> 
> 4. 请求参数 [body] -> [x-www-form-urlencoded]
> <br/> 
> 无
> 5. 返回示例
>  ```js
>  {
>    "msg": "ok",
>    "data": "ok",
>  }
>  ```


## 二十三、我的群聊列表
说明：`（登录用户和游客都有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#_4-群聊相关方法" target="_blank">4. 群聊相关方法(`群聊列表`)</a><br/>

> 1. 请求方式：`get` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/grouplist/:page&limit=[:limit]`<br/> 需要传页码，默认第1页, 每页多少条选填项，默认30条<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/grouplist/1&limit=3> <br/> 
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
> | limit   |  否         |  int |       |   每页多少条，可不填，不填默认每页30条  |
> 
> 5. 返回示例
>  ```js
>  {
>      "msg": "ok",
>      "data": [
>          {
>              "create_time": "2025-08-19 11:33:54",
>              "id": 33,
>              "uuid": "436937ea-ea54-4866-ae14-c87085219744",
>              "user_id": 6,
>              "name": "my06、魂牵一梦、老二、彦祖、my04、my05、my07、my08、my09、my10、my14",
>              "avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png,https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png,/public/uploads/Diy/adminImg/20250711/1752224185557_16178303.png,https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png,https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png,https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png,/public/uploads/Diy/adminImg/20250713/1752382886800_81488512.jpg,https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png,https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>              "remark": "",
>              "invite_confirm": 0,
>              "status": 1,
>              "order": 50,
>              "group_users": [
>                  {
>                      "group_id": 33,
>                      "user_id": 6,
>                      "nickname": "",
>                      "avatar": ""
>                  }
>              ]
>          },
>      ]
>  }
>  ```




## 二十四、获取群资料信息
说明：`（登录用户和游客都有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#_4-群聊相关方法" target="_blank">4. 群聊相关方法(`获取群资料信息`)</a><br/>

> 1. 请求方式：`get` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/groupinfo/:id`<br/> `id` 为群的id值<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/groupinfo/33> <br/> `33`为群的id值<br/>
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
> | id   |  是         |  int  |  int(20)       |    群的id值  |
> 
> 
> 5. 返回示例
> ```js
> {
>     "msg": "ok",
>     "data": {
>         "create_time": "2025-08-19 11:33:54",
>         "id": 33,
>         "uuid": "436937ea-ea54-4866-ae14-c87085219744",
>         "user_id": 6,
>         "name": "技术交流群22222",
>         "avatar": `https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png
>                    ,https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png`,
>         "remark": "",
>         "invite_confirm": 0,
>         "status": 1,
>         "order": 50,
>         "group_users": [
>             {
>                 "create_time": "2025-08-19 11:33:54",
>                 "id": 137,
>                 "group_id": 33,
>                 "user_id": 6,
>                 "nickname": "",
>                 "avatar": "",
>                 "status": 1,
>                 "order": 50,
>                 "groupId": 33,
>                 "user": {
>                     "id": 6,
>                     "username": "VS21250001",
>                     "avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>                     "nickname": "",
>                     "role": "visitor",
>                     "uuid": "fe047323-c8e3-4305-b014-3d8c7d24f001",
>                 }
>             },
>             {
>                 "create_time": "2025-08-19 11:33:54",
>                 "id": 138,
>                 "group_id": 33,
>                 "user_id": 1,
>                 "nickname": "",
>                 "avatar": "",
>                 "status": 1,
>                 "order": 50,
>                 "groupId": 33,
>                 "user": {
>                     "id": 1,
>                     "username": "my01",
>                     "avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>                     "nickname": "魂牵一梦",
>                     "role": "user",
>                     "uuid": "be047323-c8e3-4305-b014-3d8c7d24f300",
>                 }
>             },
>         ]
>     }
> }
> ```


## 二十五、修改群名称（成功后通过webSocket通知群聊用户）
说明：`（群主才有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#_4-群聊相关方法" target="_blank">4. 群聊相关方法(`修改群名称`)</a><br/>

> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/groupUpdateName`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/groupUpdateName> <br/> 
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
> | id   |  是         |  int  |  int(20)       |    群的id值  |
> | name   |  是         |  string  |  1-20之间的字符串       |    群名称  |
> 
> 
> 5. 返回示例
> ```js
> {
>     "msg": "ok",
>     "data": "ok"
> }
> ```


## 二十六、修改群公告（成功后通过webSocket通知群聊用户）
说明：`（群主才有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#_4-群聊相关方法" target="_blank">4. 群聊相关方法(`修改群公告`)</a><br/>

> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/groupremark`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/groupremark> <br/> 
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
> | id   |  是         |  int  |  int(20)       |    群的id值  |
> | remark   |  是         |  string  |  1-500之间的字符串       |    群公告  |
> 
> 
> 5. 返回示例
> ```js
> {
>     "msg": "ok",
>     "data": "ok"
> }
> ```


## 二十七、修改我在群里面的昵称
说明：`（登录用户和游客都有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#_4-群聊相关方法" target="_blank">4. 群聊相关方法(`修改我在群里面的昵称`)</a><br/>

> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/groupnickname`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/groupnickname> <br/> 
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
> | id   |  是         |  int  |  int(20)       |    群的id值  |
> | nickname   |  是         |  string  |  1-20之间的字符串       |    我在当前群里面的昵称  |
> 
> 
> 5. 返回示例
> ```js
> {
>     "msg": "ok",
>     "data": "ok"
> }
> ```


## 二十八、删除群（解散群）（群主可操作）或退出群（群成员可操作）
说明：`（登录用户和游客都有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#_4-群聊相关方法" target="_blank">4. 群聊相关方法(`删除群（群主可操作）或退出群（群成员可操作）`)</a><br/>


> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/groupDeleteOrQuit`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/groupDeleteOrQuit> <br/> 
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
> | id   |  是         |  int  |  int(20)       |    群的id值  |
> 
> 
> 5. 返回示例
> ```js
> {
>     "msg": "ok",
>     "data": "ok"
> }
> ```


## 二十九、生成获取群二维码
说明：`（登录用户和游客都有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#五、二维码-后端生成二维码-群二维码和个人二维码生成" target="_blank">五、二维码（后端生成二维码）(群二维码和个人二维码生成)</a><br/>

> 1. 请求方式：`get`
> 2. H5端说明
>> 1. 由于生成的二维码，uni-app在H5端不支持扫一扫（扫码）功能【查看官网：扫码功能<https://uniapp.dcloud.net.cn/api/system/barcode.html>】，所以H5端生成的二维码应该是一个完整的网址链接，通过微信或者手机浏览器扫码后，直接打开对应的H5端网页；<br/>
>> 2. H5端二维码接口：`http://127.0.0.1:7001或者192.168.2.6:7001/api/chat/groupQrcode/:id(群的id)?token=token值&type=H5&http=(http://域名或者ip地址:前端端口号（没有端口则为空）)&chatType=(类型：single|group)`<br/> 
>> 3. H5端生成的二维码示例：
>>> 二维码是一个网址，网址如：<http://192.168.2.6:8081/#/pages/setpageInfo/setpageInfo?action=autoAddGroup&title=%E7%BE%A4%E4%BB%8B%E7%BB%8D&id=33&chatType=group><br/>
> 3. 小程序和APP端说明
>> 1. 小程序和APP二维码接口：`http://127.0.0.1:7001或者192.168.2.6:7001/api/chat/groupQrcode/:id(群的id)?token=token值`<br/> 
>> 2. 小程序和APP端生成的二维码是一个文本对象信息，通过对应的小程序和APP扫码处理，扫二维码信息返回类似如下信息：<br/>
>>> ```js
>>> // 是一个json字符串
>>> {
>>>     id: 33, // 群的id
>>>     name: '睿晨网技术群', // 群名称
>>> }
>>> ```
> 4. 前端获取二维码（前端H5、小程序和APP如何生成获取群二维码）
>> 具体操作看文档：<a href="/thirdless/w-b/08聊天通讯群组更多内容.html#二十二、生成群二维码" target="_blank">二十二、生成群二维码</a><br/>


## 三十、上传图片等文件到服务器或者阿里云
说明：`（登录用户和游客都有这个功能）` <br/>

<b>关于上传文件的功能说明</b><br/>

1. `上传图片（文件）到服务器` ，这个内容在我们课程：<a href="/secondless/w-c.html#_1-第二学期第三季课程介绍" target="_blank">[第二学期第三季]</a>讲网站前后台开发的时候已经讲过了。<br/>
2. 对应的文档内容：<a href="/secondless/w-c/上传文件.html#一、stream-流模式上传文件-单个文件-文件存储在你自己的服务器上" target="_blank">[一、Stream 流模式上传文件（单个文件），文件存储在你自己的服务器上]</a>
3. `上传图片（文件）到阿里云` ，这个内容在我们课程：<a href="/fourthless/w-a.html" target="_blank">[第四学期第一季]</a>有讲，对应的文档内容：<a href="/secondless/w-c/上传文件.html#三、上传文件-图片-到阿里云存储oss" target="_blank">[三、上传文件（图片）到阿里云存储OSS]</a>

### 1. uni-app项目上传文件[单文件]（图片视频等）到本地服务器（自定义文件路径）
说明： `（登录用户和游客都有这个功能）`<br/>

> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/uploadStreamSingleToServerDiy/:diydir`<br/> 传一个文件夹名称，具体使用查看：<a href="/secondless/w-c/上传文件.html#_7、扩展-自定义上传文件路径" target="_blank">7、扩展： 自定义上传文件路径</a>
> <br/>
> 本地路由地址示例：<http://127.0.0.1:7001/api/chat/uploadStreamSingleToServerDiy/chatImgs> <br/> `chatImgs`代表图片放在服务器`chatImgs`这个文件夹里面
> 3. header头传token
> 
> 请求参数 [Headers] -> [Key: `token`, Value: `token值`]
> 
> | 参数       |  是否必填    |  类型    |  长度                   | 说明     |
> | :---:      | :---:       |  :---:   | :---:                  |:---:     |
> | token      |  是         |  string  |  由服务器生成           | `token令牌`，如：`eyJhbGciO.....`  |
> 
> 4. 请求参数 [body] -> [formData]
> 
> | 参数       |  是否必填    |  类型    |  长度         | 说明     |
> | :---:      | :---:       |  :---:   | :---:        |:---:     |
> | file   |  是         |  File  |         |    文件对象  |
> 
> 
> 5. 返回示例
> ```js
> {
>     "msg": "ok",
>     "data": {
>         "url": "/public/uploads/Diy/chatImgs/20250310/1710038202074_99501763.png"
>     }
> }
> ```

### 2. uni-app项目上传文件[单文件]（图片视频等）到阿里云存储OSS
说明： `（登录用户和游客都有这个功能）`<br/>

> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/uploadAliyun`<br/> 具体使用查看：<a href="/secondless/w-c/上传文件.html#五、上传文件-图片-到阿里云存储oss-stream-流模式-完整流程和代码" target="_blank">五、上传文件（图片）到阿里云存储OSS--Stream 流模式（完整流程和代码）</a>
> <br/>
> 本地路由地址示例：<http://127.0.0.1:7001/api/chat/uploadAliyun> <br/>
> 3. header头传token
> 
> 请求参数 [Headers] -> [Key: `token`, Value: `token值`]
> 
> | 参数       |  是否必填    |  类型    |  长度                   | 说明     |
> | :---:      | :---:       |  :---:   | :---:                  |:---:     |
> | token      |  是         |  string  |  由服务器生成           | `token令牌`，如：`eyJhbGciO.....`  |
> 
> 4. 请求参数 [body] -> [formData]
> 
> | 参数       |  是否必填    |  类型    |  长度  |  固定值          | 说明     |
> | :---:      | :---:       |  :---:   | :---:   | :---:     |:---:     |
> | name   |  是         |  string  |      |   img  |   文件标识，固定值：`img`  |
> | imageClassId   |  是         |  int  |      |     |   图片或者文件分类id, 没有则填：0  |
> 
> 
> 5. 返回示例
> ```js
> {
>     "code": 200,
>     "msg": "上传成功",
>     "data": [
>         {
>             "url": "http://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com/images/20250417/1744866732481_20f90b51544f.png",
>             "path": "images/20250417/1744866732481_20f90b51544f.png",
>             "image_class_id": 0,
>             "create_time": 1744866732
>         }
>     ]
> }
> ```


## 三十一、视频上传到服务器获取视频封面
说明：`（登录用户和游客都有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯发图片视频等交互处理.html#_6-视频上传到服务器获取视频封面" target="_blank">6. 视频上传到服务器获取视频封面</a><br/>

> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/getVideoScreenshot`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/getVideoScreenshot> <br/> 
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
> | 参数       |  是否必填    |  类型    |  长度   |  默认值             | 说明     |
> | :---:      | :---:       |  :---:   | :---:  |:---:               |:---:    |
> | videoUrl   |  是         |  string  |         |                   |    视频网络地址  |
> | time       |  是         |  int     |         |    20，单位：毫秒  |视频20毫秒处视频截图   |
> | width       |  是       |  int     |         |    260 ，单位：px |视频截图图片宽 px  |
> | format       |  是    |  string     |         |    png          |视频截图输出格式默认 png, 可选 jpg   |
> 
> 
> 5. 返回示例
> ```js
> {
>     "msg": "ok",
>     "data": {
>           "base64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ....ggg==",
>           "url": "/public/uploads/Diy/VideoScreenshot/screenshot_1756285153281_k7dz26.png",
>           "format": "png",
>           "time": 20,
>           "width": 260
>     }
> }
> ```


## 三十二、撤回消息接口说明
说明：`（登录用户和游客都有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯发图片视频等交互处理.html#二、撤回消息后端文档" target="_blank">二、撤回消息后端文档</a><br/>

<b>重点说明</b><br/>

服务器规定： `发出的消息超过5分钟，则不能撤回。`<br/>

> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/revokeMessage`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/revokeMessage> <br/> 
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
> | 参数       |  是否必填    |  类型    |  长度   |  默认值             | 说明     |
> | :---:      | :---:       |  :---:   | :---:  |:---:               |:---:    |
> | to_id   |  是         |  int  |         |                   |    接收者id或者群id  |
> | to_name |  是         |  string | 1-50个字符        |      |接收者或者群名称   |
> | to_avatar|  是       |  string  | 10-1000个字符     |     |接收者或者群头像  |
> | id       |  是    |  string     |         |         | 具体到群或者个人聊天中某一条消息uuid   |
> | chatType |  是    |  string     |         |         | 聊天类型 single:单聊，group:群聊   |
> | create_time |  是    |  timestamp     |         |         | 但是这条消息的发送（创建）时间戳  |
> 
> 
> 5. 返回示例
> ```js
> {
>   "msg": "ok",
>   "data": {
>     "id": 7,
>     "from_avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
>     "from_name": "my06",
>     "from_id": 6,
>     "to_id": 7,
>     "to_name": "欧泰",
>     "to_avatar": "http://192.168.2.6:7001/public/uploads/Diy/adminImg/20250713/1752382886800_81488512.jpg",
>     "chatType": "single",
>     "type": "systemNotice",
>     "actionType": "revoke",
>     "data": {
>         "data": "my06撤回了一条消息",
>         "dataType": false,
>         "otherData": null
>     },
>     "options": {},
>     "create_time": 1756799978402,
>     "isremove": 0,
>     "group": null
>   }
> }
> ```
> 另外这个方法会使用websocket推送给其他人，websocket推送的消息示例：
> ```js
> {
>     actionType: "revoke"
>     chatType: "single"
>     create_time: 1756799978402
>     data: {
>         data: "my06撤回了一条消息",
>         dataType: false,
>         otherData: null
>     },
>     from_avatar: "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png"
>     from_id: 6
>     from_name: "my06"
>     group: null
>     id: "594fe1bd-4943-466b-a787-8bb2e5e864ce"
>     isremove: 0
>     options: {}
>     to_avatar: "http://192.168.2.6:7001/public/uploads/Diy/adminImg/20250713/1752382886800_81488512.jpg"
>     to_id: 7
>     to_name: "欧泰"
>     type: "systemNotice"
> }
> ```



## 三十三、删除好友
说明：`（登录用户有这个功能，（游客）没有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯发图片视频等交互处理.html#五、删除好友后端文档" target="_blank">五、删除好友后端文档</a><br/>


> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/deletegoodfriend/:id`<br/> `id`指的好友id值<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/deletegoodfriend/2> <br/> `2`为好友id<br/>
> 3. header头传token
> 
> 请求参数 [Headers] -> [Key: `token`, Value: `token值`]
> 
> | 参数       |  是否必填    |  类型    |  长度                   | 说明     |
> | :---:      | :---:       |  :---:   | :---:                  |:---:     |
> | token      |  是         |  string  |  由服务器生成           | `token令牌`，如：`eyJhbGciO.....`  |
> 
> 4. 请求参数 [body] -> [x-www-form-urlencoded]
> <br/>
> 无
> 
> 
> 5. 返回示例
> ```js
> {
>   "msg": "ok",
>   "data": `删除好友成功`
> }
> ```


## 三十四、修改我的信息（修改我的头像昵称等信息）
说明：`（登录用户都有这个权限，游客根据情况有部分权限）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯发图片视频等交互处理.html#六、修改我的头像昵称等信息后端文档" target="_blank">六、修改我的头像昵称等信息后端文档</a><br/>


> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/updateUserinfo`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/updateUserinfo> <br/> 
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
> | 参数       |  是否必填    |  类型    |  长度   |  默认值             | 说明     |
> | :---:      | :---:       |  :---:   | :---:  |:---:               |:---:    |
> | fieldname   |  是         |  string  |   1-30个字符     |                   |   更新的字段  |
> | fieldValue   |  是         |  string  |         |                   |   更新的字段值  |
> 
> 
> 5. 返回示例
> ```js
> {
>   "msg": "ok",
>   "data": `更新成功`
> }
> ```


## 三十五、删除群成员
说明：`（群主才有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#_4-群聊相关方法" target="_blank">4. 群聊相关方法(`删除群成员（群主才有这个功能）`)</a><br/>

> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/groupDeleteUser`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/groupDeleteUser> <br/> 
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
> | group_id   |  是         |  int  |  int(20)       |    群的id值  |
> | user_id   |  是         |  int  |  int(20)        |    群成员的id值  |
> 
> 
> 5. 返回示例
> ```js
> {
>     "msg": "ok",
>     "data": "删除群成员成功"
> }
> ```


## 三十六、邀请人进群（会进行websocket通知）
说明：`(群主直接邀请，群成员邀请、游客自己进群根据群设置来处理)（游客和登录用户都有这个功能，但是需要根据群设置进行操作）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#_4-群聊相关方法" target="_blank">4. 群聊相关方法(`邀请人进群(群主直接邀请，群成员邀请、游客自己进群根据群设置来处理)`)</a><br/>

> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/groupInviteUser`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/groupInviteUser> <br/> 
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
> | group_id   |  是         |  int  |  int(20)       |    群的id值  |
> | user_id   |  是         |  int  |  int(20)        |    进群的用户id值  |
> | inviteuser_id   |  否         |  int  |  int(20)        |    邀请人的id值，可不填  |
> | addGroupDesc   |  否         |  string  |  0-500字符        |   加群说明或者邀请加群说明  |
> 
> 
> 5. 返回示例
> ```js
> {
>     "msg": "ok",
>     "data": "加群成功"
> }
> ```


## 三十七、进群设置
说明：`（群主才有这个功能）` <br/>
接口文档查看：<a href="/fourthless/w-a/eggjs.即时通讯websocket处理.html#_4-群聊相关方法" target="_blank">4. 群聊相关方法(`进群设置（群主才有这个功能）`)</a><br/>

> 1. 请求方式：`post` `[用postman测试]`或者`[用Apipost测试]`
> 2. 接口示例：`http://127.0.0.1:7001/api/chat/groupAddUserSet`<br/>
> 本地路由地址：<http://127.0.0.1:7001/api/chat/groupAddUserSet> <br/> 
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
> | group_id   |  是         |  int  |  int(20)       |    群的id值  |
> | addGroupSet   |  是         |  int  |  1-10之间的数字       |   进群属性设置值  |
> 
> 
> 5. 返回示例
> ```js
> {
>     "msg": "ok",
>     "data": "设置成功"
> }
> ```







































