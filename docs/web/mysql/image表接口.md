---
navbar: true
sidebar: auto
title: image表接口
---

## 一、某个图片分类下的图片列表
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.图片管理板块.html#六、某个图片分类下的图片列表" target="_blank">点击查看具体文档：【六、某个图片分类下的图片列表】</a>  <br/>

> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/imageclass/:id/image/:page?limit=[:limit]&order=[:order]&keyword=[:keyword]` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/imageclass/27/image/1?limit=20&order=asc&keyword=小米> <br/>
> `27`代表分类id, `1`代表页码, `limit`代表每页多少条, `keyword`代表搜索关键字，搜图片名称, `order`代表排序规则<br/>
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
> | keyword     |  否         |  String  |  搜索关键字，选填，搜图片名称，默认为 空字符串    |
> 
> 5. 返回
```js
{
    "msg": "ok",
    "data": {
        "totalCount": 2,
        "list": [
            {
                "id": 31,
                "image_class_id": 27,
                "path": "images/20250418/1744941928030_94aaa2f663ed.png",
                "name": "小米",
                "url": "http://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com/images/20250418/1744941928030_94aaa2f663ed.png",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-18 10:05:28",
                "update_time": "2025-04-18 10:05:28"
            },
            {
                "id": 32,
                "image_class_id": 27,
                "path": "images/20250418/1744941928229_1a4707bde697.jpg",
                "name": "小米",
                "url": "http://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com/images/20250418/1744941928229_1a4707bde697.jpg",
                "order": 50,
                "status": 1,
                "create_time": "2025-04-18 10:05:28",
                "update_time": "2025-04-18 10:05:28"
            }
        ]
    }
}
```

### ② eggjs框架接口
<a href="/fourthless/w-a/eggjs.图片管理板块.html#八、某个图片分类下的图片列表" target="_blank">点击查看具体文档：【八、某个图片分类下的图片列表】</a>  <br/>

> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/imageclass/:id/image/:page?limit=[:limit]&order=[:order]&keyword=[:keyword]` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/imageclass/27/image/1?limit=10&order=desc&keyword=小米> <br/>
> `27`代表分类id, `1`代表页码, `limit`代表每页多少条, `keyword`代表搜索关键字，搜图片名称, `order`代表排序规则<br/>
> `limit`、`keyword`、`order` 是可选参数，`limit`默认为 `10`，`keyword`默认为 空字符串，`order` 默认为 `asc`<br/>
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
> | limit     |  否         |  int  |  每页多少条数据，选填，默认10    |
> | order     |  否         |  String  |  排序规则，选填，默认`asc`   |
> | keyword     |  否         |  String  |  搜索关键字，选填，搜图片名称，默认为 空字符串    |
> 
> 5. 返回
```js
{
    "msg": "ok",
    "data": {
        "totalCount": 2,
        "list": [
            {
                "id": 31,
                "image_class_id": 27,
                "path": "images/20250418/1744941928030_94aaa2f663ed.png",
                "name": "小米",
                "url": "http://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com/images/20250418/1744941928030_94aaa2f663ed.png",
                "order": 50,
                "status": 1,
                "imageClassId": 27,
                "image_class": {
                    "name": "平板电脑"
                }
            },
            {
                "id": 32,
                "image_class_id": 27,
                "path": "images/20250418/1744941928229_1a4707bde697.jpg",
                "name": "小米",
                "url": "http://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com/images/20250418/1744941928229_1a4707bde697.jpg",
                "order": 50,
                "status": 1,
                "imageClassId": 27,
                "image_class": {
                    "name": "平板电脑"
                }
            }
        ],
    }
}
```

## 二、删除单个图片
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.图片管理板块.html#七、删除单个图片、自定义图片名称" target="_blank">点击查看具体文档：【七、删除单个图片、自定义图片名称】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由: `http://thinkphp.shop/admin/image/:id/delete` <br/>
> 本地路由地址：<http://thinkphp.shop/admin/image/6/delete> `6`为图片的id
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
<a href="/fourthless/w-a/eggjs.图片管理板块.html#九、删除单个图片、自定义图片名称" target="_blank">点击查看具体文档：【九、删除单个图片、自定义图片名称】</a>  <br/>

> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由: `http://127.0.0.1:7001/shop/admin/image/:id/delete` <br/>
> 本地路由地址：<http://127.0.0.1:7001/shop/admin/image/6/delete> `6`为图片的id
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


## 三、修改图片（给图片重命名）
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp.图片管理板块.html#七、删除单个图片、自定义图片名称" target="_blank">点击查看具体文档：【七、删除单个图片、自定义图片名称】</a>  <br/>

> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/image/:id` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/image/23>  `23`代表图片id
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | name     |  是         |  string  |  图片名称，最多30个字符     |
> 
> 5. 返回
> ```js
> {
>     "msg": "ok",
>     "data": true
> }
> ```


### ② eggjs框架接口
<a href="/fourthless/w-a/eggjs.图片管理板块.html#九、删除单个图片、自定义图片名称" target="_blank">点击查看具体文档：【九、删除单个图片、自定义图片名称】</a>  <br/>

> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/image/:id` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/image/23>  `23`代表图片id
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | name     |  是         |  string  |  图片名称，最多30个字符     |
> | status     |  否         |  int  |  可用状态[0,1]，选填，默认：1     |
> | order     |  否         |  int  |  排序，选填，默认：50     |
> | image_class_id     |  否     |  int  |  图片分类的id，选填，如果填写，该分类id必须存在     |
> 
> 5. 返回
> ```js
> {
>     "msg": "ok",
>     "data": "修改图片成功"
> }
> ```


## 四、图片上传到阿里云OSS
### ① thinkphp框架接口
<a href="/fourthless/w-a/thinkphp文件上传说明.html" target="_blank">点击查看具体文档：【二、 阿里云OSS图片上传功能实现】</a>  <br/>

> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/image/uploadAliyun` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/image/uploadAliyun> 
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
>
> 4. 请求参数
> 在`Postman`中，选择`Body`->`form-data`测试：<br/>
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | image_class_id     |  是         |  Text  |  图片分类的id值，必填, 如：27    |
> | img     |  是         |  File  |  单图传 img 作为key，选择一张图片    |
> | img[]     |  是         |  File  |  多图传 img[] 作为key，选择一张或者多张图片    |
> | img[]     |  是         |  File  |  单图传 img[] 作为key，选择一张或者多张图片    |
> 5. 返回 `注意图片数据同时写入了数据库表image`
> ```js
> {
>     "msg": "ok",
>     "data": [
>         {
>             "url": "https://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com/images/20250418/6801f624ee08e.png",
>             "path": "images/20250418/6801f624ee08e.png",
>             "image_class_id": "27",
>             "create_time": "2025-04-18 14:50:13",
>             "update_time": "2025-04-18 14:50:13",
>             "id": 36
>         },
>         {
>             "url": "https://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com/images/20250418/6801f62547056.jpg",
>             "path": "images/20250418/6801f62547056.jpg",
>             "image_class_id": "27",
>             "create_time": "2025-04-18 14:50:13",
>             "update_time": "2025-04-18 14:50:13",
>             "id": 37
>         }
>     ]
> }
> ```

### ② eggjs框架接口
<a href="/secondless/w-c/上传文件.html#三、上传文件-图片-到阿里云存储oss" target="_blank">点击查看具体文档：【三、上传文件（图片）到阿里云存储OSS】</a>  <br/>

### 1. 只返回阿里云反馈的图片信息，不写入数据库
> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/image/uploadAliyun` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/image/uploadAliyun> 
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
>
> 4. 请求参数
> 在`Postman`中，选择`Body`->`form-data`测试：<br/>
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | img     |  是         |  File  |  单图传 img 作为key，选择一张图片    |
> | img     |  是         |  File  |  多图传 img 作为key，选择一张图片或者多张图片    |
> | img     |  是         |  File  |  多图传 img 作为key，选择一张图片或者多张图片，可写多个img    |
> 5. 返回 `注意只返回阿里云反馈的图片信息，不写入数据库表image`
```js
{
    "msg": "ok",
    "data": [
        {
            "url": "http://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com/images/20250418/1744959663446_9167be00f9ae.png",
            "path": "images/20250418/1744959663446_9167be00f9ae.png",
            "image_class_id": 0,
            "create_time": 1744959663
        },
        {
            "url": "http://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com/images/20250418/1744959663484_273bcbacaa4c.jpg",
            "path": "images/20250418/1744959663484_273bcbacaa4c.jpg",
            "image_class_id": 0,
            "create_time": 1744959663
        },
        {
            "url": "http://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com/images/20250418/1744959663520_76eb4418c195.png",
            "path": "images/20250418/1744959663520_76eb4418c195.png",
            "image_class_id": 0,
            "create_time": 1744959663
        }
    ]
}
```

### 2. 上传阿里云并写入数据库
> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://127.0.0.1:7001/shop/admin/image/uploadAliyun?imageClassId=图片分类id` <br/>
> 本地路由示例：<http://127.0.0.1:7001/shop/admin/image/uploadAliyun?imageClassId=27> 
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
>
> 4. 网址传参
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | imageClassId     |  是         |  string  |  图片分类id,必须通过?问号传递，分类图片的id值，如27    |
>
> 5. 请求参数
> 在`Postman`中，选择`Body`->`form-data`测试：<br/>
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | img     |  是         |  File  |  单图传 img 作为key，选择一张图片    |
> | img     |  是         |  File  |  多图传 img 作为key，选择一张图片或者多张图片    |
> | img     |  是         |  File  |  多图传 img 作为key，选择一张图片或者多张图片，可写多个img    |
> 6. 返回 `注意上传阿里云并写入数据库`
```js
{
    "msg": "ok",
    "data": true
}
```