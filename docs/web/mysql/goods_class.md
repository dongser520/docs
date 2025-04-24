---
navbar: true
sidebar: auto
title:  商品管理板块表说明
---

# 商品管理板块表：<br/> `goods_class`[商品分类表]、`skus`[商品规格表]、`goods`[商品表] 说明
## 一、`goods_class`[商品分类表] 字段设计
| 字段名  |  数据类型及描述    |   空    | <p style="width:150px;">默认值 </p>  | <p style="width:100px;">字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id </b>  | <span>int(20) </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |    |         主键id  |
| <b>pid </b>      | int(20) | 否    |      0                          |   上一级(父级)id            |
| <b>name </b>      | varchar(30) |     否    |              |   商品分类名称                        |
| <b>desc </b>      | varchar(255) |  是    |                |   商品分类描述，对商品分类的简单介绍                          |
| <b>order </b>     | int(11) |  是    |       50                 |   排序，默认50            |
| <b> status </b>  | int(1)  |    否    |        1	 |   可用状态：0禁用1启用                         |
| <b> create_time </b>  | datetime  |    否    |      CURRENT_TIMESTAMP	   |   数据创建时间                         |
| <b> update_time </b>  | datetime  |      否  |        CURRENT_TIMESTAMP	|   数据更新时间                         |

> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`


## 二、创建[商品分类表] `goods_class`
### 1、技术栈php(thinkphp)同学
> 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> ### [商品分类表] `goods_class` 相关【文档】和【接口】
> <a href="/fourthless/w-a/thinkphp.商品管理板块.html" target="_blank">thinkphp框架【文档】</a> 和 <a href="/web/mysql/goods_class表接口.html" target="_blank">【接口】</a>

### 2、技术栈node(egg.js)同学
> ### [商品分类表] `goods_class` 相关【文档】和【接口】
> <a href="/fourthless/w-a/eggjs.商品管理板块.html" target="_blank">eggjs框架【文档】</a> 和 <a href="/web/mysql/goods_class表接口.html" target="_blank">【接口】</a>
> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建`goods_class`表：
>> 1. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=goods_class
>> ```
>> 2. 创建迁移文件 `goods_class.js`，内容如下：<br/>
>> ```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up (queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = Sequelize;
>>     // 创建表 --- 类似我们sql语句定义表结构
>>     await queryInterface.createTable('goods_class', {
>>       id: { 
>>         type: INTEGER(20).UNSIGNED, 
>>         primaryKey: true, 
>>         autoIncrement: true,
>>         comment: '主键id'
>>       },
>>       pid: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '上一级(父级)id',
>>       },
>>       name: { 
>>         type: STRING(30), 
>>         allowNull: false, 
>>         defaultValue: '', 
>>         comment: '商品分类名称'
>>       },
>>       desc: { 
>>         type: STRING(255), 
>>         allowNull: true, 
>>         defaultValue: '' , 
>>         comment: '商品分类描述，对商品分类的简单介绍'
>>       },
>>       order: {
>>         type: INTEGER,//不限定长度.默认int(11)
>>         allowNull: true,
>>         defaultValue: 50,
>>         comment: '排序，默认50'
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
>>     await queryInterface.dropTable('goods_class')
>>   }
>> };
>> ```
>> 3. 执行迁移文件命令生成数据库表：
>>> ```js
>>> // 创建数据库
>>> npx sequelize db:migrate
>>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>>> npx sequelize db:migrate:undo
>>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>>> npx sequelize db:migrate:undo:all
>>> ```

## 三、`skus`[商品规格表] 字段设计
| 字段名  |  数据类型及描述    |   空    | <p style="width:150px;">默认值 </p>  | <p style="width:100px;">字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id </b>  | <span>int(20) </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |    |         主键id  |
| <b>type </b>      | int(11) | 是    |      0    |   规格类型：0无限制，1颜色，2图片，3尺寸等等                          |
| <b>name </b>      | varchar(30) |     否    |              |   规格名称                        |
| <b>default </b>      | varchar(2000) |  是    |                |   规格值，用逗号隔开                         |
| <b>order </b>     | int(11) |  是    |       50                 |   排序，默认50            |
| <b> status </b>  | int(1)  |    否    |        1	 |   可用状态：0禁用1启用                         |
| <b> create_time </b>  | datetime  |    否    |      CURRENT_TIMESTAMP	   |   数据创建时间                         |
| <b> update_time </b>  | datetime  |      否  |        CURRENT_TIMESTAMP	|   数据更新时间                         |

> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`

## 四、创建[商品规格表] `skus`
### 1、技术栈php(thinkphp)同学
> 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> ### [商品规格表] `skus` 相关【文档】和【接口】
> <a href="/fourthless/w-a/thinkphp.商品管理板块.html#五、商品规格模块" target="_blank">thinkphp框架【文档】:五、商品规格模块</a> 和 <a href="/web/mysql/skus表接口.html" target="_blank">【接口】</a>

### 2、技术栈node(egg.js)同学
> ### [商品规格表] `skus` 相关【文档】和【接口】
> <a href="/fourthless/w-a/eggjs.商品管理板块.html#五、商品规格模块" target="_blank">eggjs框架【文档】:五、商品规格模块</a> 和 <a href="/web/mysql/skus表接口.html" target="_blank">【接口】</a>
> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建`skus`表：
>> 1. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=skus
>> ```
>> 2. 创建迁移文件 `skus.js`，内容如下：<br/>
>> ```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up (queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = Sequelize;
>>     // 创建表 --- 类似我们sql语句定义表结构
>>     await queryInterface.createTable('skus', {
>>       id: { 
>>         type: INTEGER(20).UNSIGNED, 
>>         primaryKey: true, 
>>         autoIncrement: true,
>>         comment: '主键id'
>>       },
>>       type: {
>>         type: INTEGER(11),
>>         allowNull: true,
>>         defaultValue: 0,
>>         comment: '规格类型：0无限制，1颜色，2图片，3尺寸等等',
>>       },
>>       name: { 
>>         type: STRING(30), 
>>         allowNull: false, 
>>         defaultValue: '', 
>>         comment: '规格名称'
>>       },
>>       default: { 
>>         type: STRING(2000), 
>>         allowNull: true, 
>>         defaultValue: '' , 
>>         comment: '规格值，用逗号隔开'
>>       },
>>       order: {
>>         type: INTEGER,//不限定长度.默认int(11)
>>         allowNull: true,
>>         defaultValue: 50,
>>         comment: '排序，默认50'
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
>>     await queryInterface.dropTable('skus')
>>   }
>> };
>> ```
>> 3. 执行迁移文件命令生成数据库表：
>>> ```js
>>> // 创建数据库
>>> npx sequelize db:migrate
>>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>>> npx sequelize db:migrate:undo
>>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>>> npx sequelize db:migrate:undo:all
>>> ```