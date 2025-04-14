---
navbar: true
sidebar: auto
title: image_class表接口
---

## 一、图片分类列表
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.图片管理板块.html#四、图片分类获取列表、新增、修改、修改状态、删除接口" target="_blank">点击查看具体文档：【四、图片分类获取列表、新增、修改、修改状态、删除接口】</a>  <br/>

> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/imageclass/:page?limit=[:limit]` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/imageclass/1?limit=100>  `1`代表第1页，`100`代表每页100条数据，由于本数据涉及无限极循环，可以不用分页的，就是列出全部数据即可。
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | page     |  是         |  int  |  页码，默认1     |
> | limit     |  否         |  int  |  每页多少条数据，默认100    |
> 
> 5. 返回
```js
{
    "msg": "ok",
    "data": {
        "totalCount": 4,
        "list": [
            {
                "id": 33,
                "pid": 32,
                "name": "丝袜",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-14 14:33:59",
                "update_time": "2025-04-14 14:33:59"
            },
            {
                "id": 32,
                "pid": 0,
                "name": "内衣服饰",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-14 14:33:51",
                "update_time": "2025-04-14 14:33:51"
            },
            {
                "id": 27,
                "pid": 26,
                "name": "平板电脑",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-14 12:01:42",
                "update_time": "2025-04-14 12:01:58"
            },
            {
                "id": 26,
                "pid": 0,
                "name": "电脑",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-14 12:01:33",
                "update_time": "2025-04-14 12:01:33"
            }
        ],
        "list_tree2": [
            {
                "id": 32,
                "pid": 0,
                "name": "内衣服饰",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-14 14:33:51",
                "update_time": "2025-04-14 14:33:51",
                "children": [
                    {
                        "id": 33,
                        "pid": 32,
                        "name": "丝袜",
                        "desc": "",
                        "order": 50,
                        "status": 1,
                        "create_time": "2025-04-14 14:33:59",
                        "update_time": "2025-04-14 14:33:59",
                        "children": []
                    }
                ]
            },
            {
                "id": 26,
                "pid": 0,
                "name": "电脑",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-14 12:01:33",
                "update_time": "2025-04-14 12:01:33",
                "children": [
                    {
                        "id": 27,
                        "pid": 26,
                        "name": "平板电脑",
                        "desc": "",
                        "order": 50,
                        "status": 1,
                        "create_time": "2025-04-14 12:01:42",
                        "update_time": "2025-04-14 12:01:58",
                        "children": []
                    }
                ]
            }
        ],
        "list_tree": [
            {
                "id": 32,
                "pid": 0,
                "name": "内衣服饰",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-14 14:33:51",
                "update_time": "2025-04-14 14:33:51",
                "level": 0
            },
            {
                "id": 33,
                "pid": 32,
                "name": "丝袜",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-14 14:33:59",
                "update_time": "2025-04-14 14:33:59",
                "level": 1
            },
            {
                "id": 26,
                "pid": 0,
                "name": "电脑",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-14 12:01:33",
                "update_time": "2025-04-14 12:01:33",
                "level": 0
            },
            {
                "id": 27,
                "pid": 26,
                "name": "平板电脑",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-14 12:01:42",
                "update_time": "2025-04-14 12:01:58",
                "level": 1
            }
        ]
    }
}
```


### ② eggjs框架接口
<a href="/fourthless/w-a/eggjs.图片管理板块.html#四、图片分类列表数据、修改、修改状态、删除" target="_blank">点击查看具体文档：【四、图片分类列表数据、修改、修改状态、删除】</a>  <br/>

> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/imageclass/:page?limit=[:limit]` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/imageclass/1?limit=100>  `1`代表第1页，`100`代表每页100条数据，由于本数据涉及无限极循环，可以不用分页的，就是列出全部数据即可。
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | page     |  是         |  int  |  页码，默认1     |
> | limit     |  否         |  int  |  每页多少条数据，默认100    |
> 
> 5. 返回
```js
{
    "msg": "ok",
    "data": [
        {
            "create_time": "2025-04-14 14:33:51",
            "id": 32,
            "pid": 0,
            "name": "内衣服饰",
            "desc": "",
            "order": 50,
            "status": 1,
            "update_time": "2025-04-14T06:33:51.000Z",
            "children": [
                {
                    "create_time": "2025-04-14 14:33:59",
                    "id": 33,
                    "pid": 32,
                    "name": "丝袜",
                    "desc": "",
                    "order": 50,
                    "status": 1,
                    "update_time": "2025-04-14T06:33:59.000Z",
                    "children": [],
                    "level": 1
                }
            ],
            "level": 0
        },
        {
            "create_time": "2025-04-14 12:01:33",
            "id": 26,
            "pid": 0,
            "name": "电脑",
            "desc": "",
            "order": 50,
            "status": 1,
            "update_time": "2025-04-14T04:01:33.000Z",
            "children": [
                {
                    "create_time": "2025-04-14 12:01:42",
                    "id": 27,
                    "pid": 26,
                    "name": "平板电脑",
                    "desc": "",
                    "order": 50,
                    "status": 1,
                    "update_time": "2025-04-14T04:01:58.000Z",
                    "children": [],
                    "level": 1
                }
            ],
            "level": 0
        }
    ]
}
```

## 二、创建图片分类
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.图片管理板块.html#四、图片分类获取列表、新增、修改、修改状态、删除接口" target="_blank">点击查看具体文档：【四、图片分类获取列表、新增、修改、修改状态、删除接口】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/imageclass` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/imageclass>  
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
> | name   |  是        |  string  |  图片分类，最多30个字符，必填   |
> | desc   |  否        |  string  |  图片分类描述，最多255个字符，可不填  |
> | order   |  否        |  int  |  排序，大于等于0，可不填，默认：50   |
> | status   |  否        |  int  |  可用状态，0不可用，1可用，可不填，默认：1   |
> 
> 5. 返回
> ```json
> {
>     "msg": "ok",
>     "data": true
> }
> ```

### ② eggjs框架接口
<a href="/fourthless/w-a/eggjs.图片管理板块.html#三、创建图片分类" target="_blank">点击查看具体文档：【三、创建图片分类】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/imageclass` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/imageclass> 
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
> | name   |  是        |  string  |  图片分类，最多30个字符，必填   |
> | desc   |  否        |  string  |  图片分类描述，最多255个字符，可不填  |
> | order   |  否        |  int  |  排序，大于等于0，可不填，默认：50   |
> | status   |  否        |  int  |  可用状态，0不可用，1可用，可不填，默认：1   |
> 
> 5. 返回
> ```json
> {
>     "msg": "ok",
>     "data": "创建图片分类成功"
> }
> ```

## 三、修改图片分类
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.图片管理板块.html#四、图片分类获取列表、新增、修改、修改状态、删除接口" target="_blank">点击查看具体文档：【四、图片分类获取列表、新增、修改、修改状态、删除接口】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/imageclass/:id` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/imageclass/23>  `23`表示的是图片分类id
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
> | name   |  是        |  string  |  图片分类，最多30个字符，必填   |
> | desc   |  否        |  string  |  图片分类描述，最多255个字符，可不填  |
> | order   |  否        |  int  |  排序，大于等于0，可不填，默认：50   |
> | status   |  否        |  int  |  可用状态，0不可用，1可用，可不填，默认：1   |
> 
> 5. 返回
> ```json
> {
>     "msg": "ok",
>     "data": true
> }
> ```

### ② eggjs框架接口
<a href="/fourthless/w-a/eggjs.图片管理板块.html#四、图片分类列表数据、修改、修改状态、删除" target="_blank">点击查看具体文档：【四、图片分类列表数据、修改、修改状态、删除】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/imageclass/:id` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/imageclass/23>  `23`表示的是图片分类id
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
> | name   |  是        |  string  |  图片分类，最多30个字符，必填   |
> | desc   |  否        |  string  |  图片分类描述，最多255个字符，可不填  |
> | order   |  否        |  int  |  排序，大于等于0，可不填，默认：50   |
> | status   |  否        |  int  |  可用状态，0不可用，1可用，可不填，默认：1   |
> 
> 5. 返回
> ```json
> {
>     "msg": "ok",
>     "data": "修改图片分类成功"
> }
> ```

## 四、修改图片分类可用状态
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.图片管理板块.html#四、图片分类获取列表、新增、修改、修改状态、删除接口" target="_blank">点击查看具体文档：【四、图片分类获取列表、新增、修改、修改状态、删除接口】</a>  <br/>

> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/imageclass/:id/update_status` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/imageclass/23/update_status>  `23`代表图片分类id
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

### ② eggjs框架接口
<a href="/fourthless/w-a/eggjs.图片管理板块.html#四、图片分类列表数据、修改、修改状态、删除" target="_blank">点击查看具体文档：【四、图片分类列表数据、修改、修改状态、删除】</a>  <br/>

> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/imageclass/:id/update_status` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/imageclass/23/update_status>  `23`代表图片分类id
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
>     "data": "修改图片分类状态成功"
> }
> ```

## 五、删除图片分类
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.图片管理板块.html#四、图片分类获取列表、新增、修改、修改状态、删除接口" target="_blank">点击查看具体文档：【四、图片分类获取列表、新增、修改、修改状态、删除接口】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由: `http://thinkphp.shop/admin/imageclass/:id/delete` <br/>
> 本地路由地址：<http://thinkphp.shop/admin/imageclass/6/delete> `6`为图片分类的id
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

### ② eggjs框架接口
<a href="/fourthless/w-a/eggjs.图片管理板块.html#四、图片分类列表数据、修改、修改状态、删除" target="_blank">点击查看具体文档：【四、图片分类列表数据、修改、修改状态、删除】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由: `http://127.0.0.1:7001/shop/admin/imageclass/:id/delete` <br/>
> 本地路由地址：<http://127.0.0.1:7001/shop/admin/imageclass/6/delete> `6`为图片分类的id
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



