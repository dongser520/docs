---
navbar: true
sidebar: auto
title: role 表及其权限表 rule 表说明
---

# role 表及其权限表 rule 表说明
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

## 二、创建角色表 `role`
### 1、技术栈php(thinkphp)同学
> 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。
### 角色表 `role`相关【文档】和【接口】
<a href="/fourthless/w-a/thinkphp.角色管理.html" target="_blank">thinkphp【文档】</a> 和 <a href="/web/mysql/role表接口.html" target="_blank">【接口】</a>

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
### 角色表 `role`相关【文档】和【接口】
<a href="/fourthless/w-a/eggjs.管理员板块.html#六、角色管理" target="_blank">eggjs【文档】</a> 和 <a href="/web/mysql/role表接口.html" target="_blank">【接口】</a>


## 三、role表的权限表rule 字段设计

| 字段名  |  数据类型及描述  |   空  | <p style="width:150px;">默认值 </p>  | 字段含义   |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id </b> | <span>int(20) </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>|   否      |            |         主键id                               |
| <b>pid </b>      | int(20) | 否    |      0                          |   上一级(父级)id            |
| <b>status </b>     | int(1) |   是    |         1   |   分类状态 0不可用 1可用          |
| <b>name </b>     | varchar(100) |      否    |                       |   后台栏目或者功能名称            |
| <b>frontname </b>     | varchar(100) |      是    |                       |   前端路由name值            |
| <b>frontpath </b>     | varchar(100) |      是    |                       |   前端路由路径            |
| <b>condition </b>     | varchar(255) |      是    |                       |   路由方法            |
| <b>menu </b>     | int(1) |   否    |         1   |  是否显示为菜单：0不显示 1显示          |
| <b>order </b>     | int(11) |  是    |       50                 |   排序，默认50            |
| <b>icon </b>     | varchar(100) |      是    |                  |   图标            |
| <b>method </b>     | varchar(30) |      否    |     POST                  |   请求类型：GET POST PUT DELETE  |
| <b> create_time </b>  | datetime  |    否    |     CURRENT_TIMESTAMP	   |   数据创建时间            |
| <b> update_time </b>  | datetime  |  否    |        CURRENT_TIMESTAMP	  |   数据更新时间             |
> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`

## 四、创建角色表role的权限表 `rule`
### 1、技术栈php(thinkphp)同学
> 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。
### 权限表 `rule`相关【文档】和【接口】
<a href="/fourthless/w-a/thinkphp.权限管理.html" target="_blank">【文档】</a> 和 <a href="/web/mysql/rule表接口.html" target="_blank">【接口】</a>

### 2、技术栈node(egg.js)同学
### 权限表 `rule`相关【文档】和【接口】
<a href="/fourthless/w-a/eggjs框架开发文档.html#_9-权限管理" target="_blank">【文档】</a> 和 <a href="/web/mysql/rule表接口.html" target="_blank">【接口】</a>

> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建角色表role的权限表`rule`，具体步骤如下：
>> 1. 创建迁移文件命令：
>> ```js
>> npx sequelize migration:generate --name=rule
>> ```
>> 2. 创建迁移文件 `rule.js`，内容如下：<br/>
>> ```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up(queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = Sequelize;
>>     // 创建表 --- 类似我们sql语句定义表结构
>>     await queryInterface.createTable('rule', {
>>       id: {
>>         type: INTEGER(20).UNSIGNED,
>>         primaryKey: true,
>>         autoIncrement: true,
>>         comment: '分类主键id'
>>       },
>>       pid: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '上一级(父级)id',
>>       },
>>       status: {
>>         type: INTEGER(1),
>>         allowNull: false,
>>         defaultValue: 1,
>>         comment: '分类状态 0不可用 1可用'
>>       },
>>       name: {
>>         type: STRING(100),
>>         allowNull: false,
>>         defaultValue: '',
>>         comment: '后台栏目或者功能名称'
>>       },
>>       frontname: {
>>         type: STRING(100),
>>         allowNull: true,
>>         defaultValue: '',
>>         comment: '前端路由name值'
>>       },
>>       frontpath: {
>>         type: STRING(100),//不限定长度.默认varchar(255)
>>         allowNull: true,
>>         defaultValue: '',
>>         comment: '前端路由路径'
>>       },
>>       condition: {
>>         type: STRING,//不限定长度.默认varchar(255)
>>         allowNull: true,
>>         defaultValue: '',
>>         comment: '路由方法'
>>       },
>>       menu: {
>>         type: INTEGER(1),
>>         allowNull: false,
>>         defaultValue: 1,
>>         comment: '是否显示为菜单：0不显示 1显示'
>>       },
>>       order: {
>>         type: INTEGER,//不限定长度.默认int(11)
>>         allowNull: true,
>>         defaultValue: 50,
>>         comment: '分类排序，默认50'
>>       },
>>       icon: {
>>         type: STRING(100),
>>         allowNull: true,
>>         defaultValue: '',
>>         comment: '图标'
>>       },
>>       method: {
>>         type: STRING(30),//不限定长度.默认varchar(255)
>>         allowNull: false,
>>         defaultValue: 'POST',
>>         comment: '请求类型：GET POST PUT DELETE'
>>       },
>>       create_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
>>       update_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
>>     });
>>   },
>> 
>>   async down(queryInterface, Sequelize) {
>>     await queryInterface.dropTable('rule')
>>   }
>> };
>> 
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

## 五、角色表role和权限表rule的中间表 `role_rule` 表字段设计
说明：
> 我们前面讲`shop_manager`表的时候，是通过在表中设置外键字段 `role_id`来关联`role`表，那么这里我们换另外一种方式来做表的关联，就是这种中间表，比如 `role_rule`, 来关联角色表`role`和权限表`rule`, 让大家能够学习到更多关联关系的处理。
> 
`role_rule` 表字段设计

| 字段名  |  数据类型及描述  |   空  | <p style="width:150px;">默认值 </p>  | 字段含义   |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id </b> | <span>int(20) </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>|   否      |            |         主键id                               |
| <b>role_id </b> | <span>int(20) </span><br/> |   否      |     0       |         角色表id   |
| <b>rule_id </b> | <span>int(20) </span><br/> |   否      |      0      |         权限表id   |
| <b> create_time </b>  | datetime  |    否    |     CURRENT_TIMESTAMP	   |   数据创建时间            |
| <b> update_time </b>  | datetime  |  否    |        CURRENT_TIMESTAMP	  |   数据更新时间             |

## 六、创建中间表 `role_rule` 

### 1、技术栈php(thinkphp)同学
> 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。

### 角色权限中间表 `role_rule`相关【文档】和【接口】
<a href="/fourthless/w-a/thinkphp.管理员角色管理和状态设置.html#四、角色列表数据中-包含该角色对应的权限" target="_blank">【文档】</a> 和 <a href="/fourthless/w-a/thinkphp.角色管理.html#五、给角色role配置权限rule" target="_blank">【接口】</a>

### 2、技术栈node(egg.js)同学

### 角色权限中间表 `role_rule`相关【文档】和【接口】
<a href="/fourthless/w-a/eggjs框架开发文档.html#_10-给角色配置权限及删除权限" target="_blank">【文档】</a> 和 <a href="/fourthless/w-a/eggjs.管理员板块.html#九、角色列表-包含角色对应的权限api接口" target="_blank">【接口】</a>

> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建角色表role和权限表rule的中间表`role_rule`，具体步骤如下：
>> 1. 创建迁移文件命令：
>> ```js
>> npx sequelize migration:generate --name=role_rule
>> ```
>> 2. 创建迁移文件 `role_rule.js`，内容如下：<br/>
>> ```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up(queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = Sequelize;
>>     // 创建表 --- 类似我们sql语句定义表结构
>>     await queryInterface.createTable('role_rule', {
>>       id: {
>>         type: INTEGER(20).UNSIGNED,
>>         primaryKey: true,
>>         autoIncrement: true,
>>         comment: '分类主键id'
>>       },
>>       role_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '角色表id',
>>         references: { //关联关系
>>           model: 'role', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>>       rule_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '权限表id',
>>         references: { //关联关系
>>           model: 'rule', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>>       create_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
>>       update_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
>>     });
>>   },
>> 
>>   async down(queryInterface, Sequelize) {
>>     await queryInterface.dropTable('role_rule')
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