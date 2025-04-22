---
navbar: true
sidebar: auto
title: goods_class表接口
---

## 一、商品分类列表
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.商品管理板块.html#三、商品分类获取列表、新增、修改、修改状态、删除接口" target="_blank">点击查看具体文档：【三、商品分类获取列表、新增、修改、修改状态、删除接口】</a>  <br/>

> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/goodsclass/:page?limit=[:limit]` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/goodsclass/1?limit=100>  `1`代表第1页，`100`代表每页100条数据，由于本数据涉及无限极循环，可以不用分页的，就是列出全部数据即可。
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
        "totalCount": 3,
        "list": [
            {
                "id": 41,
                "pid": 39,
                "name": "手机",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-22 19:21:32",
                "update_time": "2025-04-22 19:21:32"
            },
            {
                "id": 40,
                "pid": 39,
                "name": "电脑",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-22 19:21:24",
                "update_time": "2025-04-22 19:21:24"
            },
            {
                "id": 39,
                "pid": 0,
                "name": "电子产品",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-22 19:21:16",
                "update_time": "2025-04-22 19:21:16"
            }
        ],
        "list_tree2": [
            {
                "id": 39,
                "pid": 0,
                "name": "电子产品",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-22 19:21:16",
                "update_time": "2025-04-22 19:21:16",
                "children": [
                    {
                        "id": 41,
                        "pid": 39,
                        "name": "手机",
                        "desc": "",
                        "order": 50,
                        "status": 1,
                        "create_time": "2025-04-22 19:21:32",
                        "update_time": "2025-04-22 19:21:32",
                        "children": []
                    },
                    {
                        "id": 40,
                        "pid": 39,
                        "name": "电脑",
                        "desc": "",
                        "order": 50,
                        "status": 1,
                        "create_time": "2025-04-22 19:21:24",
                        "update_time": "2025-04-22 19:21:24",
                        "children": []
                    }
                ]
            }
        ],
        "list_tree": [
            {
                "id": 39,
                "pid": 0,
                "name": "电子产品",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-22 19:21:16",
                "update_time": "2025-04-22 19:21:16",
                "level": 0
            },
            {
                "id": 41,
                "pid": 39,
                "name": "手机",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-22 19:21:32",
                "update_time": "2025-04-22 19:21:32",
                "level": 1
            },
            {
                "id": 40,
                "pid": 39,
                "name": "电脑",
                "desc": "",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-22 19:21:24",
                "update_time": "2025-04-22 19:21:24",
                "level": 1
            }
        ]
    }
}
```

### ② eggjs框架接口
<a href="/fourthless/w-a/eggjs.商品管理板块.html#三、商品分类列表数据、修改、修改状态、删除" target="_blank">点击查看具体文档：【三、商品分类列表数据、修改、修改状态、删除】</a>  <br/>

> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/goodsclass/:page?limit=[:limit]` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/goodsclass/1?limit=100>  `1`代表第1页，`100`代表每页100条数据，由于本数据涉及无限极循环，可以不用分页的，就是列出全部数据即可。
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
            "create_time": "2025-04-22 19:21:16",
            "id": 39,
            "pid": 0,
            "name": "电子产品",
            "desc": "",
            "order": 50,
            "status": 1,
            "update_time": "2025-04-22T11:21:16.000Z",
            "children": [
                {
                    "create_time": "2025-04-22 19:21:32",
                    "id": 41,
                    "pid": 39,
                    "name": "手机",
                    "desc": "",
                    "order": 50,
                    "status": 1,
                    "update_time": "2025-04-22T11:21:32.000Z",
                    "children": [],
                    "level": 1
                },
                {
                    "create_time": "2025-04-22 19:21:24",
                    "id": 40,
                    "pid": 39,
                    "name": "电脑",
                    "desc": "",
                    "order": 50,
                    "status": 1,
                    "update_time": "2025-04-22T11:21:24.000Z",
                    "children": [],
                    "level": 1
                }
            ],
            "level": 0
        }
    ]
}
```

## 二、创建商品分类
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.商品管理板块.html#三、商品分类获取列表、新增、修改、修改状态、删除接口" target="_blank">点击查看具体文档：【三、商品分类获取列表、新增、修改、修改状态、删除接口】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/goodsclass` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/goodsclass>  
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
> | name   |  是        |  string  |  商品分类，最多30个字符，必填   |
> | desc   |  否        |  string  |  商品分类描述，最多255个字符，可不填  |
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
<a href="/fourthless/w-a/eggjs.商品管理板块.html#二、创建商品分类" target="_blank">点击查看具体文档：【二、创建商品分类】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/goodsclass` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/goodsclass> 
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
> | name   |  是        |  string  |  商品分类，最多30个字符，必填   |
> | desc   |  否        |  string  |  商品分类描述，最多255个字符，可不填  |
> | order   |  否        |  int  |  排序，大于等于0，可不填，默认：50   |
> | status   |  否        |  int  |  可用状态，0不可用，1可用，可不填，默认：1   |
> 
> 5. 返回
> ```json
> {
>     "msg": "ok",
>     "data": "创建商品分类成功"
> }
> ```

## 三、修改商品分类
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.商品管理板块.html#三、商品分类获取列表、新增、修改、修改状态、删除接口" target="_blank">点击查看具体文档：【三、商品分类获取列表、新增、修改、修改状态、删除接口】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/goodsclass/:id` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/goodsclass/23>  `23`表示的是商品分类id
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
> | name   |  是        |  string  |  商品分类，最多30个字符，必填   |
> | desc   |  否        |  string  |  商品分类描述，最多255个字符，可不填  |
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
<a href="/fourthless/w-a/eggjs.商品管理板块.html#三、商品分类列表数据、修改、修改状态、删除" target="_blank">点击查看具体文档：【三、商品分类列表数据、修改、修改状态、删除】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/goodsclass/:id` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/goodsclass/23>  `23`表示的是商品分类id
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
> | name   |  是        |  string  |  商品分类，最多30个字符，必填   |
> | desc   |  否        |  string  |  商品分类描述，最多255个字符，可不填  |
> | order   |  否        |  int  |  排序，大于等于0，可不填，默认：50   |
> | status   |  否        |  int  |  可用状态，0不可用，1可用，可不填，默认：1   |
> 
> 5. 返回
> ```json
> {
>     "msg": "ok",
>     "data": "修改商品分类成功"
> }
> ```

## 四、修改商品分类可用状态
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.商品管理板块.html#三、商品分类获取列表、新增、修改、修改状态、删除接口" target="_blank">点击查看具体文档：【三、商品分类获取列表、新增、修改、修改状态、删除接口】</a>  <br/>

> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/goodsclass/:id/update_status` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/goodsclass/23/update_status>  `23`代表商品分类id
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
<a href="/fourthless/w-a/eggjs.商品管理板块.html#三、商品分类列表数据、修改、修改状态、删除" target="_blank">点击查看具体文档：【三、商品分类列表数据、修改、修改状态、删除】</a>  <br/>

> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/goodsclass/:id/update_status` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/goodsclass/23/update_status>  `23`代表商品分类id
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
>     "data": "修改商品分类状态成功"
> }
> ```

## 五、删除商品分类
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.商品管理板块.html#三、商品分类获取列表、新增、修改、修改状态、删除接口" target="_blank">点击查看具体文档：【三、商品分类获取列表、新增、修改、修改状态、删除接口】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由: `http://thinkphp.shop/admin/goodsclass/:id/delete` <br/>
> 本地路由地址：<http://thinkphp.shop/admin/goodsclass/6/delete> `6`为商品分类的id
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
<a href="/fourthless/w-a/eggjs.商品管理板块.html#三、商品分类列表数据、修改、修改状态、删除" target="_blank">点击查看具体文档：【三、商品分类列表数据、修改、修改状态、删除】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由: `http://127.0.0.1:7001/shop/admin/goodsclass/:id/delete` <br/>
> 本地路由地址：<http://127.0.0.1:7001/shop/admin/goodsclass/6/delete> `6`为商品分类的id
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
