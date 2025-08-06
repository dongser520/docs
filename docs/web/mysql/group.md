---
navbar: true
sidebar: auto
title: 群聊管理group表相关表说明
---


## 一、 `group`表(群主表)字段设计

| 字段名  |  数据类型及描述    |   空    | <p >默认值 </p>  | <p>字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id</b>|<span>`INTEGER(20).UNSIGNED` </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |   无  |         主键id  |
| <b>uuid</b>   | <span>`string(36)`唯一群标识 </span>|否|无|<span style="font-size:12px">唯一群标识ID(UUID) </span> |
| <b>user_id</b>|<span>`INTEGER(20).UNSIGNED` </span>|否|无|<span style="font-size:12px">群主id（关联用户表user的id）</span>  |
| <b>name</b>| <span>`STRING(50)` </span>|否 | 无|<span style="font-size:12px">  群名称 </span> |
| <b>avatar</b>| <span>`STRING(1000)`</span>   |    是      | <span style="font-size:10px">如：https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/</span><br/><span style="font-size:10px">chat/group.png</span>   |  <span style="font-size:12px">群头像地址（本地、网络图片地址）</span>  |
| <b>remark</b>   | <span>`text`</span>   |    是      | `''`  | <span style="font-size:12px"> 群公告 </span> |
| <b>...</b>   |   |         |   | <span style="font-size:12px">随着业务需求增加字段</span> |
| <b>invite_confirm </b>  | <span>`TINYINT(1)`</span>   |    否 | `0`  | <span style="font-size:12px"> 是否需要管理员确认才能进群(0-不需要 1- 需要管理员确认 2-其他情况)</span>  |
| <b>...</b>   |   |         |   | <span style="font-size:12px">随着业务需求增加字段</span> |
| <b>status </b>  | <span>`TINYINT(1)`</span>   |    否 | `1`  | <span style="font-size:12px"> 群状态(0-禁用 1-正常 2-锁定)</span>  |
| <b>order </b>     | <span>`int(11)`</span>  |  是    |       50                 |  <span style="font-size:12px"> 排序，默认50  </span> |
| <b>create_time </b>  | <span>`DATE`</span>  |    否    |   `CURRENT_TIMESTAMP`|   <span style="font-size:12px">数据创建时间  </span>     |
| <b>update_time </b>  | <span>`DATE`</span>   |    否      | `CURRENT_TIMESTAMP`  |  <span style="font-size:12px"> 更新时间 </span> |


> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建`group`表：
>> 1. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=group
>> ```
>> 2. 创建迁移文件 `group.js`，内容如下：<br/>
>>```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up(queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, TEXT, TINYINT, ENUM, BOOLEAN } = Sequelize;
>>     await queryInterface.createTable('group', {
>>       id: {
>>         type: INTEGER(20).UNSIGNED,
>>         primaryKey: true,
>>         autoIncrement: true,
>>         comment: '主键id'
>>       },
>>       uuid: {
>>         type: STRING(36),
>>         allowNull: false,
>>         unique: true,
>>         comment: '唯一群标识ID(UUID)'
>>       },
>>       user_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         comment: '群主id',
>>         references: { //关联关系
>>           model: 'user', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'CASCADE', //删除时操作
>>         onUpdate: 'RESTRICT', // 更新时操作
>>       },
>>       name: {
>>         type: STRING(50),
>>         allowNull: false,
>>         unique: false, //群名称可以不唯一
>>         comment: '群名称'
>>       },
>>       avatar: {
>>         type: STRING(1000),
>>         allowNull: true,
>>         defaultValue: 'https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/group.png',
>>         comment: '群头像（本地、网络图片地址）'
>>       },
>>       remark: {
>>         type: TEXT,
>>         allowNull: true,
>>         defaultValue: '',
>>         comment: '群公告'
>>       },
>>       invite_confirm: {
>>         type: TINYINT(1),
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '是否需要管理员确认才能进群(0-不需要 1- 需要管理员确认 2-其他情况)'
>>       },
>>       status: {
>>         type: TINYINT(1),
>>         allowNull: false,
>>         defaultValue: 1,
>>         comment: '群状态(0-禁用 1-正常 2-锁定)'
>>       },
>>       order: {
>>         type: INTEGER,//不限定长度.默认int(11)
>>         allowNull: true,
>>         defaultValue: 50,
>>         comment: '排序，默认50'
>>       },
>>       // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
>>       create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
>>       update_time: {
>>         type: DATE,
>>         allowNull: false,
>>         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
>>         comment: '更新时间'
>>       },
>>     });
>>     // 添加索引优化查询
>>     await queryInterface.addIndex('group', ['uuid']);
>>     await queryInterface.addIndex('group', ['user_id']);
>> 
>>   },
>> 
>>   async down(queryInterface, Sequelize) {
>>     await queryInterface.dropTable('group');
>>   }
>> };
>> 
>>```
>>
> 3. 执行迁移文件命令生成数据库表：
>> ```js
>> // 创建数据库表
>> npx sequelize db:migrate
>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>> npx sequelize db:migrate:undo
>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>> npx sequelize db:migrate:undo:all
>> ```

### `group`表模型
`app/model/group.js`
```js
'use strict';
//哈希函数 
// const crypto = require('node:crypto');
// 引入 uuid 库 `npm install uuid`
const { v4: uuidv4 } = require('uuid');

module.exports = app => {
    const { INTEGER, STRING, DATE, TEXT, TINYINT, ENUM, BOOLEAN } = app.Sequelize;

    const Group = app.model.define('group', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键ID'
        },
        uuid: {
            type: STRING(36),
            allowNull: false,
            unique: true,
            comment: '唯一群标识ID(UUID)',
            defaultValue: () => uuidv4(), // 自动生成 UUID
        },
        user_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            comment: '群主id',
            references: { //关联关系
                model: 'user', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'CASCADE', //删除时操作
            onUpdate: 'RESTRICT', // 更新时操作
        },
        name: {
            type: STRING(50),
            allowNull: false,
            unique: false, //群名称可以不唯一
            comment: '群名称'
        },
        avatar: {
            type: STRING(1000),
            allowNull: true,
            defaultValue: 'https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/group.png',
            comment: '群头像（本地、网络图片地址）'
        },
        remark: {
            type: TEXT,
            allowNull: true,
            defaultValue: '',
            comment: '群公告'
        },
        invite_confirm: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 0,
            comment: '是否需要管理员确认才能进群(0-不需要 1- 需要管理员确认 2-其他情况)'
        },
        status: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 1,
            comment: '群状态(0-禁用 1-正常 2-锁定)'
        },
        order: {
            type: INTEGER,//不限定长度.默认int(11)
            allowNull: true,
            defaultValue: 50,
            comment: '排序，默认50'
        },
        // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
        create_time: {
            type: DATE,
            allowNull: false,
            defaultValue: app.Sequelize.fn('NOW'),
            get() {
                return app.formatTime(this.getDataValue('create_time'));
            }
        },
        update_time: { type: DATE, allowNull: false, defaultValue: app.Sequelize.fn('NOW') },
    });

    // 模型关联
    Group.associate = function (models) {
        // 关联user 反向一对多
        Group.belongsTo(app.model.User, {
            foreignKey: 'user_id', //外键
            //as: 'user', //别名
        });

        // 关联group_user 一对多
        Group.hasMany(app.model.GroupUser);
    };

    return Group;
}
```


## 二、 `group_user`表(群用户关联表)字段设计

| 字段名  |  数据类型及描述    |   空    | <p >默认值 </p>  | <p>字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id</b>|<span>`INTEGER(20).UNSIGNED` </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |     |         主键id  |
| <b>group_id</b>|<span>`INTEGER(20).UNSIGNED` </span>|否| |<span style="font-size:12px">群id（关联group表的id）</span>  |
| <b>user_id</b>|<span>`INTEGER(20).UNSIGNED` </span>|否| |<span style="font-size:12px">用户id（关联用户表user的id）</span>  |
| <b>nickname</b>| <span>`STRING(50)` </span>|是 | `''`|<span style="font-size:12px">  在群里的称呼（默认为空，则默认为用户账户昵称或者账号） </span> |
| <b>avatar</b>| <span>`STRING(1000)`</span>   |    是      | `''`  |  <span style="font-size:12px">在群里面的头像地址（本地、网络图片地址）（默认为空，则默认为用户账户头像）</span>  |
| <b>...</b>   |   |         |   | <span style="font-size:12px">随着业务需求增加字段</span> |
| <b>status </b>  | <span>`TINYINT(1)`</span>   |    否 | `1`  | <span style="font-size:12px"> 用户在群里面的状态(0-禁用 1-正常 2-锁定)</span>  |
| <b>order </b>     | <span>`int(11)`</span>  |  是    |       50                 |  <span style="font-size:12px"> 排序，默认50  </span> |
| <b>create_time </b>  | <span>`DATE`</span>  |    否    |   `CURRENT_TIMESTAMP`|   <span style="font-size:12px">数据创建时间  </span>     |
| <b>update_time </b>  | <span>`DATE`</span>   |    否      | `CURRENT_TIMESTAMP`  |  <span style="font-size:12px"> 更新时间 </span> |

> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建`group_user`表：
>> 1. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=group_user
>> ```
>> 2. 创建迁移文件 `group_user.js`，内容如下：<br/>
>> ```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up(queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, TEXT, TINYINT, ENUM, BOOLEAN } = Sequelize;
>>     await queryInterface.createTable('group_user', {
>>       id: {
>>         type: INTEGER(20).UNSIGNED,
>>         primaryKey: true,
>>         autoIncrement: true,
>>         comment: '主键id'
>>       },
>>       group_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         comment: '群id（关联group表的id）',
>>         references: { //关联关系
>>           model: 'group', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'CASCADE', //删除时操作
>>         onUpdate: 'RESTRICT', // 更新时操作
>>       },
>>       user_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         comment: '用户id',
>>         references: { //关联关系
>>           model: 'user', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'CASCADE', //删除时操作
>>         onUpdate: 'RESTRICT', // 更新时操作
>>       },
>>       nickname: {
>>         type: STRING(50),
>>         allowNull: true,
>>         unique: false, //群称呼可以不唯一
>>         comment: '在群里的称呼（默认为空，则默认为用户账户昵称或者账号）',
>>         defaultValue: '',
>>       },
>>       avatar: {
>>         type: STRING(1000),
>>         allowNull: true,
>>         defaultValue: '',
>>         comment: '在群里面的头像地址（本地、网络图片地址）（默认为空，则默认为用户账户头像）'
>>       },
>>       status: {
>>         type: TINYINT(1),
>>         allowNull: false,
>>         defaultValue: 1,
>>         comment: '用户在群里面的状态(0-禁用 1-正常 2-锁定)'
>>       },
>>       order: {
>>         type: INTEGER,//不限定长度.默认int(11)
>>         allowNull: true,
>>         defaultValue: 50,
>>         comment: '排序，默认50'
>>       },
>>       // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
>>       create_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
>>       update_time: {
>>         type: DATE,
>>         allowNull: false,
>>         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
>>         comment: '更新时间'
>>       },
>>     });
>> 
>>     // 添加索引优化查询
>>     await queryInterface.addIndex('group_user', ['group_id']);
>>     await queryInterface.addIndex('group_user', ['user_id']);
>>   },
>> 
>>   async down(queryInterface, Sequelize) {
>>     await queryInterface.dropTable('group_user');
>>   }
>> };
>> 
>> ```
> 3. 执行迁移文件命令生成数据库表：
>> ```js
>> // 创建数据库表
>> npx sequelize db:migrate
>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>> npx sequelize db:migrate:undo
>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>> npx sequelize db:migrate:undo:all
>> ```


### `group_user`表模型
`app/model/group_user.js`
```js
'use strict';
//哈希函数 
//const crypto = require('node:crypto');
// 引入 uuid 库 `npm install uuid`
//const { v4: uuidv4 } = require('uuid');

module.exports = app => {
    const { INTEGER, STRING, DATE, TEXT, TINYINT, ENUM, BOOLEAN } = app.Sequelize;

    const GroupUser = app.model.define('group_user', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键ID'
        },
        group_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            comment: '群id（关联group表的id）',
            references: { //关联关系
                model: 'group', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'CASCADE', //删除时操作
            onUpdate: 'RESTRICT', // 更新时操作
        },
        user_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            comment: '用户id',
            references: { //关联关系
                model: 'user', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'CASCADE', //删除时操作
            onUpdate: 'RESTRICT', // 更新时操作
        },
        nickname: {
            type: STRING(50),
            allowNull: true,
            unique: false, //群称呼可以不唯一
            comment: '在群里的称呼（默认为空，则默认为用户账户昵称或者账号）',
            defaultValue: '',
        },
        avatar: {
            type: STRING(1000),
            allowNull: true,
            defaultValue: '',
            comment: '在群里面的头像地址（本地、网络图片地址）（默认为空，则默认为用户账户头像）'
        },
        status: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 1,
            comment: '用户在群里面的状态(0-禁用 1-正常 2-锁定)'
        },
        order: {
            type: INTEGER,//不限定长度.默认int(11)
            allowNull: true,
            defaultValue: 50,
            comment: '排序，默认50'
        },
        // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
        create_time: {
            type: DATE,
            allowNull: false,
            defaultValue: app.Sequelize.fn('NOW'),
            get() {
                return app.formatTime(this.getDataValue('create_time'));
            }
        },
        update_time: { type: DATE, allowNull: false, defaultValue: app.Sequelize.fn('NOW') },
    });

    // 模型关联
    GroupUser.associate = function (models) {
        // 反向一对多belongsTo
        GroupUser.belongsTo(app.model.Group, {
            foreignKey: 'group_id', //外键
            //as: 'group', //别名
        });
        // 反向一对多belongsTo
        GroupUser.belongsTo(app.model.User, {
            foreignKey: 'user_id', //外键
            //as: 'user', //别名
        });
    };

    return GroupUser;
}
```





















































