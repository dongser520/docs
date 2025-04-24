---
navbar: true
sidebar: auto
title: skus表接口
---

# skus[商品规格表] 所有接口
## 一、商品规格列表
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.商品规格模块.html#三、商品规格获取列表、新增、修改、修改状态、删除接口" target="_blank">点击查看具体文档：【三、商品规格获取列表、新增、修改、修改状态、删除接口】</a>  <br/>

> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/skus/:page?limit=[:limit]&order=[:order]&keyword=[:keyword]` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/skus/1?limit=20&order=asc&keyword=尺寸> <br/>
> `1`代表页码, `limit`代表每页多少条, `keyword`代表搜索关键字，搜商品规格名称name字段, `order`代表排序规则<br/>
> `limit`、`keyword`、`order` 是可选参数，`limit`默认为 `20`，`keyword`默认为 空字符串，`order` 默认为 `desc`<br/>
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
> | limit     |  否         |  int  |  每页多少条数据，选填，默认20    |
> | order     |  否         |  String  |  排序规则，选填，默认`desc`   |
> | keyword     |  否         |  String  |  搜索关键字，选填，搜商品规格名称name字段，默认为 空字符串    |
> 
> 5. 返回
```js
{
    "msg": "ok",
    "data": {
        "totalCount": 2,
        "list": [
            {
                "id": 4,
                "type": 3,
                "name": "尺寸",
                "default": "xl,xxl,xxxl,sl,xsl",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-24 12:36:12",
                "update_time": "2025-04-24 12:36:12"
            }
        ]
    }
}
```

### ② eggjs框架接口
<a href="/fourthless/w-a/eggjs.商品规格模块.html#三、商品规格列表数据、修改、修改状态、删除、批量删除" target="_blank">点击查看具体文档：【三、商品规格列表数据、修改、修改状态、删除、批量删除】</a>  <br/>

> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/skus/:page?limit=[:limit]&order=[:order]&keyword=[:keyword]` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/skus/1?limit=1&order=asc&keyword=单位> <br/>
> `1`代表页码, `limit`代表每页多少条, `keyword`代表搜索关键字，搜商品规格名称name字段, `order`代表排序规则<br/>
> `limit`、`keyword`、`order` 是可选参数，`limit`默认为 `20`，`keyword`默认为 空字符串，`order` 默认为 `desc`<br/>
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
> | limit     |  否         |  int  |  每页多少条数据，选填，默认20    |
> | order     |  否         |  String  |  排序规则，选填，默认`desc`   |
> | keyword     |  否         |  String  |  搜索关键字，选填，搜商品规格名称name字段，默认为 空字符串    |
> 
> 5. 返回
```js
{
    "msg": "ok",
    "data": {
        "list": [
            {
                "id": 18,
                "type": 0,
                "name": "单位",
                "default": "毫米，微米，纳米，厘米，米，千米",
                "order": 50,
                "status": 1
            }
        ],
        "totalCount": 2
    }
}
```

## 二、创建商品规格
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.商品规格模块.html#三、商品规格获取列表、新增、修改、修改状态、删除接口" target="_blank">点击查看具体文档：【三、商品规格获取列表、新增、修改、修改状态、删除接口】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/skus` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/skus>  
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | name   |  是        |  string  |  商品规格名称，最多30个字符，必填   |
> | default   |  是        |  string  |  规格值，用逗号隔开，最多2000个字符，必填  |
> | type     |  否         |  int  |  选填，规格类型：0无限制，1颜色，2图片，3尺寸等等，默认0     |
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
<a href="/fourthless/w-a/eggjs.商品规格模块.html#二、创建商品规格" target="_blank">点击查看具体文档：【二、创建商品规格】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/skus` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/skus> 
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | name   |  是        |  string  |  商品规格名称，最多30个字符，必填   |
> | default   |  是        |  string  |  规格值，用逗号隔开，最多2000个字符，必填  |
> | type     |  否         |  int  |  选填，规格类型：0无限制，1颜色，2图片，3尺寸等等，默认0     |
> | order   |  否        |  int  |  排序，大于等于0，可不填，默认：50   |
> | status   |  否        |  int  |  可用状态，0不可用，1可用，可不填，默认：1   |
> 
> 5. 返回
> ```json
> {
>     "msg": "ok",
>     "data": "创建商品规格成功"
> }
> ```

## 三、修改商品规格
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.商品规格模块.html#三、商品规格获取列表、新增、修改、修改状态、删除接口" target="_blank">点击查看具体文档：【三、商品规格获取列表、新增、修改、修改状态、删除接口】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/skus/:id` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/skus/23>  `23`表示的是商品规格id
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | name   |  是        |  string  |  商品规格名称，最多30个字符，必填   |
> | default   |  是        |  string  |  规格值，用逗号隔开，最多2000个字符，必填  |
> | type     |  否         |  int  |  选填，规格类型：0无限制，1颜色，2图片，3尺寸等等，默认0     |
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
<a href="/fourthless/w-a/eggjs.商品规格模块.html#三、商品规格列表数据、修改、修改状态、删除、批量删除" target="_blank">点击查看具体文档：【三、商品规格列表数据、修改、修改状态、删除、批量删除】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/skus/:id` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/skus/23>  `23`表示的是商品规格id
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | name   |  是        |  string  |  商品规格名称，最多30个字符，必填   |
> | default   |  是        |  string  |  规格值，用逗号隔开，最多2000个字符，必填  |
> | type     |  否         |  int  |  选填，规格类型：0无限制，1颜色，2图片，3尺寸等等，默认0     |
> | order   |  否        |  int  |  排序，大于等于0，可不填，默认：50   |
> | status   |  否        |  int  |  可用状态，0不可用，1可用，可不填，默认：1   |
> 
> 5. 返回
> ```json
> {
>     "msg": "ok",
>     "data": "修改商品规格成功"
> }
> ```

## 四、修改商品规格可用状态
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.商品规格模块.html#三、商品规格获取列表、新增、修改、修改状态、删除接口" target="_blank">点击查看具体文档：【三、商品规格获取列表、新增、修改、修改状态、删除接口】</a>  <br/>

> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/skus/:id/update_status` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/skus/23/update_status>  `23`代表商品规格id
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
<a href="/fourthless/w-a/eggjs.商品规格模块.html#三、商品规格列表数据、修改、修改状态、删除、批量删除" target="_blank">点击查看具体文档：【三、商品规格列表数据、修改、修改状态、删除、批量删除】</a>  <br/>

> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/skus/:id/update_status` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/skus/23/update_status>  `23`代表商品规格id
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
>     "data": "修改商品规格状态成功"
> }
> ```

## 五、删除商品规格
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.商品规格模块.html#三、商品规格获取列表、新增、修改、修改状态、删除接口" target="_blank">点击查看具体文档：【三、商品规格获取列表、新增、修改、修改状态、删除接口】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由: `http://thinkphp.shop/admin/skus/:id/delete` <br/>
> 本地路由地址：<http://thinkphp.shop/admin/skus/6/delete> `6`为商品规格的id
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
<a href="/fourthless/w-a/eggjs.商品规格模块.html#三、商品规格列表数据、修改、修改状态、删除、批量删除" target="_blank">点击查看具体文档：【三、商品规格列表数据、修改、修改状态、删除、批量删除】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由: `http://127.0.0.1:7001/shop/admin/skus/:id/delete` <br/>
> 本地路由地址：<http://127.0.0.1:7001/shop/admin/skus/6/delete> `6`为商品规格的id
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


## 六、批量删除商品规格
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.商品规格模块.html#四-批量删除商品规格" target="_blank">点击查看具体文档：【四. 批量删除商品规格】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/skus/deleteAll` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/skus/deleteAll>  
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | ids   |  是        |  array  |  商品规格id的集合数组，必填   |
>
> 5. `postman`测试：`Body`->`xxx-www-form-urlencoded`
>> 1. Key:`ids[]`, Value:6  `6`为商品规格的id
>> 2. Key:`ids[]`, Value:7  `7`为商品规格的id
> 
> 6. 返回
> ```json
> {
>     "msg": "ok",
>     "data": 2 // 2表示批量删除了2条数据
> }
> ```

### ② eggjs框架接口
<a href="/fourthless/w-a/eggjs.商品规格模块.html#三、商品规格列表数据、修改、修改状态、删除、批量删除" target="_blank">点击查看具体文档：【三、商品规格列表数据、修改、修改状态、删除、批量删除】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/skus/deleteAll` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/skus/deleteAll>  
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | ids   |  是        |  array  |  商品规格id的集合数组，必填   |
>
> 5. `postman`测试：`Body`->`xxx-www-form-urlencoded`
>> 1. Key:`ids`, Value:`[6,7,8]`  `6,7,8`为商品规格的id
> 
> 6. 返回
> ```json
> {
>     "msg": "ok",
>     "data": true
> }
> ```