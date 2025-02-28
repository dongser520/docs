---
navbar: true
sidebar: auto
title: shop_manager表接口
---

## 一、创建管理员
### ① thinkphp框架接口
> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由地址：<http://thinkphp.shop/admin/shopmanager>
> 3. 网络地址(需登录)：<http://lesson11.thinkphpshop.51yrc.com/admin/shopmanager>
> 4. 请求参数：<br/>`body请求体发送` , `x-www-form-urlencoded`格式
>> | 字段名（属性名） |  值（例如）    |   说明    |
>> | :---:           | :---:         |  :---:    |
>> | username |  admin1    |   必填，管理员账号    |
>> | password |  123456    |   必填，管理员密码(模型已自动加密)    |
>> | avatar |      |   选填，默认：https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png    |
>> | status |  1    |   选填，默认：1，管理员可用状态：0禁用1启用    |
>> | role_id |  1    |   必填，默认：0，角色role表的id    |
>> | super |  1    |   选填，默认：0，已采取过滤，填写无效，是否超级管理员：0否1是    |
> 5. 返回
>>```js
>> {
>>    "msg": "ok",
>>    "data": true
>> }
>>

