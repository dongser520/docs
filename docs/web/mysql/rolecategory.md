---
navbar: true
sidebar: auto
title: rolecategory表说明
---

# rolecategory 表说明
## 一、rolecategory 表字段设计
| 字段名  |  数据类型及描述    |   空    | <p style="width:150px;">默认值 </p>  | <p style="width:100px;">字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id </b>            | <span>int(20) </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |            |         主键id                               |
| <b>name </b>      | varchar(30) |     否    |              |   角色名称                        |
| <b>desc </b>      | varchar(255) |  是    |                |   角色描述，对角色的简单介绍                          |
| <b>showurl </b>      | varchar(255) |  是    |                |   浏览地址                         |
| <b> create_time </b>  | datetime  |    否    |      CURRENT_TIMESTAMP	   |   数据创建时间                         |
| <b> update_time </b>  | datetime  |      否  |        CURRENT_TIMESTAMP	|   数据更新时间                         |
| <b> status </b>  | int(1)  |    否    |        1	 |   管理员可用状态：0禁用1启用                         |
> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`

## 二、创建角色表rolecategory
### 1、技术栈php(thinkphp)同学
> 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。

### 2、技术栈node(egg.js)同学
> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建rolecategory表：
>> <span style="text-decoration:underline;color:green;"> 注意：需要先将分类表 `category`先删除，`先创建rolecategory表`，`再创建管理员表category`。</span><br/><br/>
>> 为什么要先删除分类表 `category`？主要原因是，通过迁移命令创建，`会按照迁移文件创建顺序创建表`，如果先创建分类表 `category`，再创建角色表 `rolecategory`，那么在创建分类表 `category`时，会自动创建关联关系，而此时分类角色表 `rolecategory`还未创建，就会导致创建失败，大家大概知道一下就行，反正你只需要记住一点：`如果你是通过迁移命令创建表，如果这个表里面有外键关联另外一张表，那么关联的另外一张表，必须在它的前面创建，这样按照迁移文件创建顺序创建表就不会报错`，记住这个就行了，如果是在`phpMyAdmin`中根据表字段设计创建表，这个就无所谓了。
> 3. 具体步骤如下：
>> 1. 删除分类表 `category`，只需要执行一次回滚命令(很显然回退一次不够，我们直接回退到初始状态或者多回退几次)：
>> ```js
>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>> npx sequelize db:migrate:undo
>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>> npx sequelize db:migrate:undo:all
>> ```
>> `记得把迁移文件也删除掉`。<br/><br/>
>> 2. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=rolecategory
>> ```
>> 3. 创建迁移文件 `rolecategory.js`，内容如下：<br/>
>> ```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up (queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = Sequelize;
>>     // 创建表 --- 类似我们sql语句定义表结构
>>     await queryInterface.createTable('rolecategory', {
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
>>       showurl: { 
>>         type: STRING(255), 
>>         allowNull: true, 
>>         defaultValue: '' , 
>>         comment: '浏览地址'
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
>>     await queryInterface.dropTable('rolecategory')
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
说明：由于我们新增了分类表`category`的角色表 `rolecategory`，如果两个表要产生联系，那么应该在分类表`category`里面新增一个外键字段`rolecategory_id`，并写上模型关联，这个我们在后面讲这部分后台的时候再给大家统一讲一下，这里为了保证我们课程同步，照顾到通过迁移文件创建表的同学，我们本节课以创建这张表主要。