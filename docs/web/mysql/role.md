---
navbar: true
sidebar: auto
title: role表说明
---

# role 表说明
## 一、role 表字段设计
| 字段名  |  数据类型及描述    |   空    | <p style="width:150px;">默认值 </p>  | <p style="width:100px;">字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id </b>            | <span>int(20) </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |            |         主键id                               |
| <b>name </b>      | varchar(30) |     否    |              |   角色名称                        |
| <b>desc </b>      | varchar(255) |  是    |                |   角色描述，对角色的简单介绍                          |
| <b> create_time </b>  | datetime  |    否    |      CURRENT_TIMESTAMP	   |   数据创建时间                         |
| <b> update_time </b>  | datetime  |      否  |        CURRENT_TIMESTAMP	|   数据更新时间                         |
| <b> status </b>  | int(1)  |    否    |        1	 |   管理员可用状态：0禁用1启用                         |
> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`

## 二、创建角色表role
### 1、技术栈php(thinkphp)同学
> 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。

### 2、技术栈node(egg.js)同学
> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建role表：
>> <span style="text-decoration:underline;color:green;"> 注意：需要先将管理员表 `shop_manager`先删除，`先创建role表`，`再创建管理员表shop_manager`。</span>
> 3. 具体步骤如下：
>> 1. 删除管理员表 `shop_manager`，只需要执行一次回滚命令：
>> ```js
>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>> npx sequelize db:migrate:undo
>> ```
>> `记得把迁移文件也删除掉`。<br/><br/>
>> 2. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=role
>> ```
>> 3. 创建迁移文件 `role.js`，内容如下：<br/>
>> ```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up (queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = Sequelize;
>>     // 创建表 --- 类似我们sql语句定义表结构
>>     await queryInterface.createTable('role', {
>>       id: { 
>>         type: INTEGER(20).UNSIGNED, 
>>         primaryKey: true, 
>>         autoIncrement: true,
>>         comment: '角色表主键id'
>>       },
>>       name: { 
>>         type: STRING(30), 
>>         allowNull: false, 
>>         defaultValue: '', 
>>         comment: '角色名称'
>>       },
>>       desc: { 
>>         type: STRING(255), 
>>         allowNull: true, 
>>         defaultValue: '' , 
>>         comment: '角色描述，对角色的简单介绍'
>>       },
>>       status:{
>>         type: INTEGER(1),
>>         allowNull: false, 
>>         defaultValue:1,
>>         comment: '状态：1：启用，0：禁用'
>>       },
>>       // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
>>       create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
>>       update_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')}
>>     });
>>   },
>> 
>>   async down (queryInterface, Sequelize) {
>>     await queryInterface.dropTable('role')
>>   }
>> };
>> ```
>> 执行迁移文件命令生成数据库表：
>>> ```js
>>> // 创建数据库
>>> npx sequelize db:migrate
>>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>>> npx sequelize db:migrate:undo
>>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>>> npx sequelize db:migrate:undo:all
>>> ```
