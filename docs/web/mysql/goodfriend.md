---
navbar: true
sidebar: auto
title: 好友表、好友申请表相关说明
---
## 一、 `goodfriend`好友表字段设计
| 字段名  |  数据类型及描述    |   空    | <p >默认值 </p>  | <p>字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id</b>|<span>`INTEGER(20).UNSIGNED` </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |   无  |         主键id  |
| <b>user_id</b>|<span>`INTEGER(20).UNSIGNED` </span>   |    否      |   0  |    用户id，user表的id   |
| <b>friend_id</b>|<span>`INTEGER(20).UNSIGNED` </span>   |    否      |   0  |  用户的好友id，user表的id  |
| <b>nickname</b>   | <span>`STRING(50)`</span>   |    否      | `''`  |  <span style="font-size:12px">好友备注名称 </span> |
| <b>friendlookme </b>  | <span>`TINYINT(1)`</span>   |    否 | `1`  | <span style="font-size:12px"> 朋友是否可以看我发布的信息、朋友圈(0-不可以 1-可以)</span>  |
| <b>melookfriend </b>  | <span>`TINYINT(1)`</span>   |    否 | `1`  | <span style="font-size:12px"> 朋友发布的信息是否出现在我的朋友圈列表中(0-不出现 1-出现)</span>  |
| <b>ismystarfriend </b>  | <span>`TINYINT(1)`</span>   |    否 | `0`  | <span style="font-size:12px"> 朋友是不是我的星标好友(0-不是 1-是)</span>  |
| <b>isblack </b>  | <span>`TINYINT(1)`</span>   |    否 | `0`  | <span style="font-size:12px"> 是否将好友加入黑名单(0-否 1-是)</span>  |
| <b>...</b>  | <span>...</span>   |    ...      | ...  |  根据业务需求再增加字段 |
| <b>status </b>  | <span>`TINYINT(1)`</span>   |    否 | `1`  | <span style="font-size:12px"> 数据状态(0-禁用 1-正常 2-锁定)（给后台管理员用的）</span>  |
| <b>order </b>     | <span>`int(11)`</span>  |  是    |       50                 |  <span style="font-size:12px"> 排序，默认50  </span> |
| <b>create_time </b>  | <span>`DATE`</span>  |    否    |   `CURRENT_TIMESTAMP`|   <span style="font-size:12px">数据创建时间  </span>     |
| <b>update_time </b>  | <span>`DATE`</span>   |    否      | `CURRENT_TIMESTAMP`  |  <span style="font-size:12px"> 更新时间 </span> |

> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> ### 创建表迁移文件并生成表
> 2. 通过迁移命名创建`goodfriend`表：
>> 1. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=goodfriend
>> ```
>> 2. 创建迁移文件 `goodfriend.js`，内容如下：<br/>
```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE, TINYINT, ENUM } = Sequelize;
    await queryInterface.createTable('goodfriend', {
      id: {
        type: INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键ID'
      },
      user_id: {
          type: INTEGER(20).UNSIGNED,
          allowNull: true,
          defaultValue: 0,
          comment: '用户id',
          references: { //关联关系
              model: 'user', //关联的表
              key: 'id' //关联表的主键
          },
          onDelete: 'cascade', //删除时操作
          onUpdate: 'restrict', // 更新时操作
      },
      friend_id: {
          type: INTEGER(20).UNSIGNED,
          allowNull: true,
          defaultValue: 0,
          comment: '用户的好友id',
          references: { //关联关系
              model: 'user', //关联的表
              key: 'id' //关联表的主键
          },
          onDelete: 'cascade', //删除时操作
          onUpdate: 'restrict', // 更新时操作
      },
      nickname: {
          type: STRING(50),
          allowNull: false,
          defaultValue: '',
          comment: '好友备注名称'
      },
      friendlookme: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: '朋友是否可以看我发布的信息、朋友圈(0-不可以 1-可以)'
      },
      melookfriend: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: '朋友发布的信息是否出现在我的朋友圈列表中(0-不出现 1-出现)'
      },
      ismystarfriend: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '朋友是不是我的星标好友(0-不是 1-是)'
      },
      isblack: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '是否将好友加入黑名单(0-不加入 1-加入)'
      },
      status: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: '数据状态(0-禁用 1-正常 2-锁定)（给后台管理员用的）'
      },
      order: {
        type: INTEGER,//不限定长度.默认int(11)
        allowNull: true,
        defaultValue: 50,
        comment: '排序，默认50'
      },
      // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
      create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
      update_time: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        comment: '更新时间'
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('goodfriend');
  }
};

```

> 3. 执行迁移文件命令生成数据库表：
>> ```js
>> // 创建数据库
>> npx sequelize db:migrate
>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>> npx sequelize db:migrate:undo
>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>> npx sequelize db:migrate:undo:all
>> ```

### `goodfriend`表模型
新建 `app/model/goodfriend.js`
```js
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, TINYINT, ENUM } = app.Sequelize;

    const Goodfriend = app.model.define('goodfriend', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键ID'
        },
        user_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: true,
            defaultValue: 0,
            comment: '用户id',
            references: { //关联关系
                model: 'user', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        friend_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: true,
            defaultValue: 0,
            comment: '用户的好友id',
            references: { //关联关系
                model: 'user', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        nickname: {
            type: STRING(50),
            allowNull: false,
            defaultValue: '',
            comment: '好友备注名称'
        },
        friendlookme: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 1,
            comment: '朋友是否可以看我发布的信息、朋友圈(0-不可以 1-可以)'
        },
        melookfriend: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 1,
            comment: '朋友发布的信息是否出现在我的朋友圈列表中(0-不出现 1-出现)'
        },
        ismystarfriend: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 0,
            comment: '朋友是不是我的星标好友(0-不是 1-是)'
        },
        isblack: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 0,
            comment: '是否将好友加入黑名单(0-不加入 1-加入)'
        },
        status: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 1,
            comment: '数据状态(0-禁用 1-正常 2-锁定)（给后台管理员用的）'
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

    return Goodfriend;
}
```


## 二、 `goodfriendapply`好友申请表字段设计
| 字段名  |  数据类型及描述    |   空    | <p >默认值 </p>  | <p>字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id</b>|<span>`INTEGER(20).UNSIGNED` </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |   无  |         主键id  |
| <b>user_id</b>|<span>`INTEGER(20).UNSIGNED` </span>   |    否      |   0  |    申请用户id(我的id)，user表的id   |
| <b>friend_id</b>|<span>`INTEGER(20).UNSIGNED` </span>   |    否      |   0  |  我申请添加的好友id，user表的id  |
| <b>nickname</b>   | <span>`STRING(50)`</span>   |    否      | `''`  |  <span style="font-size:12px">我的昵称或者说明 </span> |
| <b>friendlookme </b>  | <span>`TINYINT(1)`</span>   |    否 | `1`  | <span style="font-size:12px"> 朋友是否可以看我发布的信息、朋友圈(0-不可以 1-可以)</span>  |
| <b>melookfriend </b>  | <span>`TINYINT(1)`</span>   |    否 | `1`  | <span style="font-size:12px"> 朋友发布的信息是否出现在我的朋友圈列表中(0-不出现 1-出现)</span>  |
| <b>ismystarfriend </b>  | <span>`TINYINT(1)`</span>   |    否 | `0`  | <span style="font-size:12px"> 朋友是不是我的星标好友(0-不是 1-是)</span>  |
| <b>isblack </b>  | <span>`TINYINT(1)`</span>   |    否 | `0`  | <span style="font-size:12px"> 是否将好友加入黑名单(0-否 1-是)</span>  |
| <b>...</b>  | <span>...</span>   |    ...      | ...  |  根据业务需求再增加字段 |
| <b>status </b>  | <span style="font-size:18px">`ENUM`</span><br/><span style="font-size:12px">('pending','refuse','agree','ignore')</span>   |    否 | `pending`  | <span style="font-size:12px"> 申请加好友状态(`pending`-申请中 `refuse`-拒绝 `agree`-同意 `ignore`-忽略) </span>  |
| <b>order </b>     | <span>`int(11)`</span>  |  是    |       50                 |  <span style="font-size:12px"> 排序，默认50  </span> |
| <b>create_time </b>  | <span>`DATE`</span>  |    否    |   `CURRENT_TIMESTAMP`|   <span style="font-size:12px">数据创建时间  </span>     |
| <b>update_time </b>  | <span>`DATE`</span>   |    否      | `CURRENT_TIMESTAMP`  |  <span style="font-size:12px"> 更新时间 </span> |

> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> ### 创建表迁移文件并生成表
> 2. 通过迁移命名创建`goodfriendapply`表：
>> 1. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=goodfriendapply
>> ```
>> 2. 创建迁移文件 `goodfriendapply.js`，内容如下：<br/>
```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE, TINYINT, ENUM } = Sequelize;
    await queryInterface.createTable('goodfriendapply', {
      id: {
        type: INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键ID'
      },
      user_id: {
          type: INTEGER(20).UNSIGNED,
          allowNull: true,
          defaultValue: 0,
          comment: '用户id(我的id)',
          references: { //关联关系
              model: 'user', //关联的表
              key: 'id' //关联表的主键
          },
          onDelete: 'cascade', //删除时操作
          onUpdate: 'restrict', // 更新时操作
      },
      friend_id: {
          type: INTEGER(20).UNSIGNED,
          allowNull: true,
          defaultValue: 0,
          comment: '我申请添加的好友id',
          references: { //关联关系
              model: 'user', //关联的表
              key: 'id' //关联表的主键
          },
          onDelete: 'cascade', //删除时操作
          onUpdate: 'restrict', // 更新时操作
      },
      nickname: {
          type: STRING(50),
          allowNull: false,
          defaultValue: '',
          comment: '我的昵称或者说明'
      },
      friendlookme: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: '朋友是否可以看我发布的信息、朋友圈(0-不可以 1-可以)'
      },
      melookfriend: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: '朋友发布的信息是否出现在我的朋友圈列表中(0-不出现 1-出现)'
      },
      ismystarfriend: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '朋友是不是我的星标好友(0-不是 1-是)'
      },
      isblack: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '是否将好友加入黑名单(0-不加入 1-加入)'
      },
      status: {
        type: ENUM,
        values: ["pending", "refuse", "agree", "ignore"],
        allowNull: false,
        defaultValue: "pending",
        comment: "申请加好友状态(pending-申请中 refuse-拒绝 agree-同意 ignore-忽略)",
      },
      order: {
        type: INTEGER,//不限定长度.默认int(11)
        allowNull: true,
        defaultValue: 50,
        comment: '排序，默认50'
      },
      // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
      create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
      update_time: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        comment: '更新时间'
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('goodfriendapply');
  }
};

```

> 3. 执行迁移文件命令生成数据库表：
>> ```js
>> // 创建数据库
>> npx sequelize db:migrate
>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>> npx sequelize db:migrate:undo
>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>> npx sequelize db:migrate:undo:all
>> ```

### `goodfriendapply`表模型
新建 `app/model/goodfriendapply.js`
```js
module.exports = app => {
    const { INTEGER, STRING, DATE, TINYINT, ENUM } = app.Sequelize;

    const Goodfriendapply = app.model.define('goodfriendapply', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键ID'
        },
        user_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: true,
            defaultValue: 0,
            comment: '用户id(我的id)',
            references: { //关联关系
                model: 'user', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        friend_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: true,
            defaultValue: 0,
            comment: '我申请添加的好友id',
            references: { //关联关系
                model: 'user', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        nickname: {
            type: STRING(50),
            allowNull: false,
            defaultValue: '',
            comment: '我的昵称或者说明'
        },
        friendlookme: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 1,
            comment: '朋友是否可以看我发布的信息、朋友圈(0-不可以 1-可以)'
        },
        melookfriend: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 1,
            comment: '朋友发布的信息是否出现在我的朋友圈列表中(0-不出现 1-出现)'
        },
        ismystarfriend: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 0,
            comment: '朋友是不是我的星标好友(0-不是 1-是)'
        },
        isblack: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 0,
            comment: '是否将好友加入黑名单(0-不加入 1-加入)'
        },
        status: {
            type: ENUM,
            values: ["pending", "refuse", "agree", "ignore"],
            allowNull: false,
            defaultValue: "pending",
            comment: "申请加好友状态(pending-申请中 refuse-拒绝 agree-同意 ignore-忽略)",
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
    Goodfriendapply.associate =  function (models) {
        // 一个用户可以申请多个好友，用户对申请表是一对多， 反过来申请表对于用户表就是反向一对多
        Goodfriendapply.belongsTo(app.model.User,{
            // foreignKey: 'user_id',
        });
    };
    
    return Goodfriendapply;
}
```