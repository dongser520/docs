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