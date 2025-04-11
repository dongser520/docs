---
navbar: true
sidebar: auto
title: shop_manager表说明
---

# shop_manager表说明
## 一、shop_manager 表字段设计
| 字段名  |  数据类型及描述    |   空    | <p style="width:150px;">默认值 </p>  | <p style="width:100px;">字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id </b>            | <span>int(20) </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |            |         主键id                               |
| <b>username </b>      | varchar(30) |     否    |              |   管理员账号                          |
| <b>password </b>      | varchar(255) |  否    |                |   管理员密码                          |
| <b>avatar </b>      | <span style="font-size:12px">varchar(1000) </span>|    <span style="font-size:12px"> 是  </span>  |    <p> <span style="font-size:12px">给一个默认图像地址：</span><br/><span style="font-size:12px">如：https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png</span>  </p>                                  |  <span style="font-size:12px"> 管理员头像（本地、网络图片地址）  </span>         |
| <b> create_time </b>  | datetime  |    否    |      CURRENT_TIMESTAMP	   |   数据创建时间                         |
| <b> update_time </b>  | datetime  |      否  |        CURRENT_TIMESTAMP	|   数据更新时间                         |
| <b> status </b>  | int(1)  |    否    |        1	 |   管理员可用状态：0禁用1启用                         |
| <b> 	super </b>  | int(1)  |   是    |      0	 |   是否是超级管理员：0否1是          |
| <b> role_id </b>  | int(11)  |   是    |      0	 |   角色id                         |
> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`

## 二、创建数据库表shop_manager
### 1、技术栈php(thinkphp)同学
> 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。

### 2、技术栈node(egg.js)同学
> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。
> 2. 创建数据库迁移文件，通过迁移命令创建表。
>> 创建迁移文件 命令：
>>> ```js
>>> npx sequelize migration:generate --name=shop_manager
>>> ```
>> 创建迁移文件：
>>> ```js
>>> 'use strict';
>>> 
>>> /** @type {import('sequelize-cli').Migration} */
>>> module.exports = {
>>>   async up (queryInterface, Sequelize) {
>>>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = Sequelize;
>>>     // 创建表 --- 类似我们sql语句定义表结构
>>>     await queryInterface.createTable('shop_manager', {
>>>       id: { 
>>>         type: INTEGER(20).UNSIGNED, 
>>>         primaryKey: true, 
>>>         autoIncrement: true,
>>>         comment: '管理员表主键id'
>>>       },
>>>       username: { 
>>>         type: STRING(30), 
>>>         allowNull: false, 
>>>         defaultValue: '', 
>>>         comment: '管理员账号'
>>>       },
>>>       password: { 
>>>         type: STRING(255), 
>>>         allowNull: false, 
>>>         defaultValue: '' , 
>>>         comment: '管理员密码'
>>>       },
>>>       avatar : { 
>>>         type: STRING(1000), 
>>>         allowNull: true, 
>>>         defaultValue: 'https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png', 
>>>         comment: '管理员头像（本地、网络图片地址）' 
>>>       },
>>>       status:{
>>>         type: INTEGER(1),
>>>         allowNull: false, 
>>>         defaultValue:1,
>>>         comment: '状态：1：启用，0：禁用'
>>>       },
>>>       super:{
>>>         type: INTEGER(1),
>>>         allowNull: true, 
>>>         defaultValue:0,
>>>         comment: '是否超级管理员 1是，0：否'
>>>       },
>>>       role_id:{
>>>         type: INTEGER(11),
>>>         allowNull: true, 
>>>         defaultValue:0,
>>>         comment: '角色id'
>>>       },
>>>       // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
>>>       create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
>>>       update_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')}
>>>     });
>>>   },
>>> 
>>>   async down (queryInterface, Sequelize) {
>>>     await queryInterface.dropTable('shop_manager')
>>>   }
>>> };
>>> 
>>> ```
>> 执行迁移文件命令生成数据库表：
>>> ```js
>>> // 创建数据库
>>> npx sequelize db:migrate
>>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>>> npx sequelize db:migrate:undo
>>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>>> npx sequelize db:migrate:undo:all
>>> ```

## 三、shop_manager 表 文档地址
### 1、技术栈php(thinkphp)文档地址
> 点击查看：<a href="/web/mysql/shop_manager表接口" target="_blank">文档说明</a>
### 2、技术栈node(egg.js)文档地址
> 点击查看：<a href="/fourthless/w-a/eggjs框架开发文档.html#一、管理员板块" target="_blank">文档说明</a>


## 四、shop_manager 表 所有接口
> 点击查看：<a href="/web/mysql/shop_manager表接口" target="_blank">shop_manager 表 所有接口</a>