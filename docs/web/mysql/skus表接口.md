---
navbar: true
sidebar: auto
title: skus表接口
---

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
<a href="#" target="_blank">点击查看具体文档：【】</a>  <br/>

> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/skus/:page?limit=[:limit]&order=[:order]&keyword=[:keyword]` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/skus/1?limit=20&order=asc&keyword=尺寸> <br/>
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
```