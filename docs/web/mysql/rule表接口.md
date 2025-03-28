---
navbar: true
sidebar: auto
title: rule表接口
---

## 一、权限列表
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.权限管理.html#一、权限列表" target="_blank">点击查看具体文档：【权限列表】</a>  <br/>

> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/rule/:page?limit=[:limit]` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/rule/1?limit=100>  `1`代表第1页，`100`代表每页100条数据，由于本数据涉及无限极循环，可以不用分页的，就是列出全部数据即可。
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | page     |  否         |  int  |  页码，默认1     |
> | limit     |  否         |  int  |  每页多少条数据，默认100    |
> 
> 5. 返回
>>  1. 关于数据返回的说明：
>>  原本查询的权限数据类似这样的数据：
>>  ```json
>> [
>>   {"id": 6,"pid": 0,"status": 1,"name": "管理员管理",...},
>>   {"id": 7, "pid": 6,"status": 1,"name": "删除管理员",...},
>>   {"id": 8, "pid": 6,"status": 1,"name": "管理员列表",...},
>>   {"id": 9, "pid": 0,"status": 1,"name": "角色管理",...},
>>   {"id": 10,"pid": 9,"status": 1,"name": "角色列表",...},
>> ]
>>  ```
>> 为了方便后续配置权限，需要将数据转成树形结构，方便前端使用
>> 1. 一维数组的树形结构，会增加一个level体现等级
>> ```json
>> [
>>     {"id": 6,"pid": 0,"status": 1,"name": "管理员管理",...,"level": 0},
>>     {"id": 7, "pid": 6,"status": 1,"name": "删除管理员",...,"level": 1},
>>     {"id": 8, "pid": 6,"status": 1,"name": "管理员列表",...,"level": 1},
>>     {"id": 9, "pid": 0,"status": 1,"name": "角色管理",...,"level": 0},
>>     {"id": 10,"pid": 9,"status": 1,"name": "角色列表",...,"level": 1},
>> ]
>> ```
>> 2. 二维数组的树形结构，增加一个children字段，体现子集
>> ```json
>> [
>>     {
>>         "id": 6,
>>         "pid": 0,
>>         "status": 1,
>>         "name": "管理员管理",
>>         ...
>>         "children": [
>>             {
>>                 "id": 7,
>>                 "pid": 6,
>>                 "status": 1,
>>                 "name": "删除管理员",
>>                 ...
>>                 "children": []
>>             },
>>             {
>>                 "id": 8,
>>                 "pid": 6,
>>                 "status": 1,
>>                 "name": "管理员列表",
>>                 ...
>>                 "children": []
>>             }
>>         ]
>>     },
>>     {
>>         "id": 9,
>>         "pid": 0,
>>         "status": 1,
>>         "name": "角色管理",
>>         ...
>>         "children": [
>>             {
>>                 "id": 10,
>>                 "pid": 9,
>>                 "status": 1,
>>                 "name": "角色列表",
>>                 ...
>>                 "children": []
>>             }
>>         ]
>>     }
>> ]
>> ```

## 二、创建权限
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.权限管理.html#二、创建权限" target="_blank">点击查看具体文档：【创建权限】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/rule` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/rule>  
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | pid     |  是         |  int  |  父级id，必填     |
> | status   |  否        |  int  |  可用状态，0不可用，1可用，可不填，默认：1   |
> | name   |  是        |  string  |  权限名称（后台栏目或者功能名称），最多100个字符，必填   |
> | frontname   |  否        |  string  |  前端路由name值，最多100个字符，可不填  |
> | frontpath   |  否        |  string  |  前端路由路径，最多100个字符，可不填   |
> | condition   |  否        |  string  |  路由方法，最多255个字符，可不填   |
> | menu   |  否        |  int  |  是否为菜单，0不是，1是，可不填，默认：1   |
> | order   |  否        |  int  |  排序，大于等于0，可不填，默认：50   |
> | icon   |  否        |  string  |  图标名称，最多100个字符，可不填   |
> | method   |  否        |  string  |  可不填，要填只能是：POST,GET,PUT,DELETE 中的一个   |
> 
> 5. 返回
> ```json
> {
>     "msg": "ok",
>     "data": true
> }
> ```

## 三、修改权限
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.权限管理.html#三、修改权限" target="_blank">点击查看具体文档：【修改权限】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/rule/:id` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/rule/23>  `23`表示的是权限id
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | pid     |  是         |  int  |  父级id，必填     |
> | status   |  否        |  int  |  可用状态，0不可用，1可用，可不填，默认：1   |
> | name   |  是        |  string  |  权限名称（后台栏目或者功能名称），最多100个字符，必填   |
> | frontname   |  否        |  string  |  前端路由name值，最多100个字符，可不填  |
> | frontpath   |  否        |  string  |  前端路由路径，最多100个字符，可不填   |
> | condition   |  否        |  string  |  路由方法，最多255个字符，可不填   |
> | menu   |  否        |  int  |  是否为菜单，0不是，1是，可不填，默认：1   |
> | order   |  否        |  int  |  排序，大于等于0，可不填，默认：50   |
> | icon   |  否        |  string  |  图标名称，最多100个字符，可不填   |
> | method   |  否        |  string  |  可不填，要填只能是：POST,GET,PUT,DELETE 中的一个   |
> 
> 5. 返回
> ```json
> {
>     "msg": "ok",
>     "data": true
> }
> ```

## 四、修改权限可用状态
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.权限管理.html#四、修改权限可用状态" target="_blank">点击查看具体文档：【修改权限可用状态】</a>  <br/>

> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/rule/:id/update_status` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/rule/23/update_status>  `23`代表权限id
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

## 五、删除权限
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.权限管理.html#五、删除权限" target="_blank">点击查看具体文档：【删除权限】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由: `http://thinkphp.shop/admin/rule/:id/delete` <br/>
> 本地路由地址：<http://thinkphp.shop/admin/rule/6/delete> `6`为权限的id
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