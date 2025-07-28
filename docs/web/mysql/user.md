---
navbar: true
sidebar: auto
title: 用户管理user表相关表说明
---

## 一、 `user`表字段设计
| 字段名  |  数据类型及描述    |   空    | <p >默认值 </p>  | <p>字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id</b>|<span>`INTEGER(20).UNSIGNED` </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |   无  |         主键id  |
| <b>uuid</b>   | <span>`string(36)`唯一用户标识 </span>|否|无|<span style="font-size:12px">用户ID(UUID) </span> |
| <b>username</b>| <span>`STRING(50)`唯一登录账号 </span>|否 | 无|<span style="font-size:12px">  登录账号 </span> |
| <b>password</b>   | <span>`STRING(255)`</span>   |    否      | 无   | <span style="font-size:12px">加密密码 </span> |
| <b>nickname</b>   | <span>`STRING(50)`</span>   |    否      | `''`  |  <span style="font-size:12px">用户昵称 </span> |
| <b>avatar</b>| <span>`STRING(1000)`</span>   |    是      | <span style="font-size:10px">如：https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/</span><br/><span style="font-size:10px">public/67b3001b2aedd.png</span>   |  <span style="font-size:12px">头像地址（本地、网络图片地址）</span>  |
| <b>...</b>   |   |         |   | <span style="font-size:12px">随着业务需求增加字段</span> |
| <b>devicefingeruuid</b>   | <span>`STRING(200)`</span>   |    是      | `''`  | <span style="font-size:12px">设备标识（游客标识） </span> |
| <b>uniplatform</b>   | <span style="font-size:12px">`STRING(100)`</span>   | <span style="font-size:12px">是 </span> | `''`  | <span style="font-size:12px"> 平台类型（web/mp-weixin/app）） </span> |
| <b>devicemodel</b>   | <span>`STRING(100)`</span>   |    是      | `''`  | <span style="font-size:12px"> 设备型号（统计用） </span> |
| <b>deviceos</b>   | <span>`STRING(100)`</span>   |    是      | `''`  | <span style="font-size:12px"> 操作系统（统计用） </span> |
| <b>devicebrand</b>   | <span>`STRING(100)`</span>   |    是      | `''`  | <span style="font-size:12px"> 设备品牌（统计用） </span> |
| <b>userset</b>   | <span>`text`</span>   |    是      | `''`  | <span style="font-size:12px"> 用户设置 </span> |
| <b>...</b>   |   |         |   | <span style="font-size:12px">随着业务需求增加字段</span> |
| <b>mobile</b>   | <span>`STRING(20)`</span>   |    是      | `NULL`  | <span style="font-size:12px">手机号 </span> |
| <b>email</b>   | <span>`STRING(100)`</span>   |    是      | `NULL`  | <span style="font-size:12px">邮箱 </span> |
| <b>last_login</b>   | <span>`DATE`</span>   |    是      | `NULL`  |  <span style="font-size:12px">最后登录时间 </span> |
| <b>last_login_ip</b>   | <span>`STRING(45)`</span>   |    是      | `NULL`  | <span style="font-size:12px">最后登录IP </span> |
| <b>register_time </b>  | <span>`DATE`</span>   |    否      | `CURRENT_TIMESTAMP`  | <span style="font-size:12px">注册时间 </span> |
| <b>register_ip </b>  | <span>`STRING(45)`</span>   |    是      | `NULL`  | <span style="font-size:12px"> 注册IP</span>  |
| <b>is_deleted  </b> | <span>`TINYINT(1)`</span>  |    否    |   `0`|  <span style="font-size:12px"> 软删除标记</span>       |
| <b>wechat_openid </b>  | <span>`STRING(128)`</span>  |    是    |   `NULL`|  <span style="font-size:12px"> 微信OpenID </span>      |
| <b>qq_openid  </b> | <span>`STRING(128)`</span>  |    是    |   `NULL`|  <span style="font-size:12px"> QQ OpenID  </span>     |
| <b>weibo_uid  </b> | <span>`STRING(128)`</span>  |    是    |   `NULL`|  <span style="font-size:12px"> 微博UID </span>      |
| <b>role  </b> | <span>`STRING(20)`</span>  |    否    |   `'user'`|  <span style="font-size:12px">用户角色  </span>     |
| <b>is_email_verified </b>  | <span>`TINYINT(1)`</span>  |    否    |   `0`| <span style="font-size:12px"> 邮箱验证状态  </span>     |
| <b>is_mobile_verified </b>  | <span>`TINYINT(1)`</span>  |    否    |   `0`| <span style="font-size:12px"> 手机验证状态  </span>     |
| <b>status </b>  | <span>`TINYINT(1)`</span>   |    否 | `1`  | <span style="font-size:12px"> 用户状态(0-禁用 1-正常 2-锁定)</span>  |
| <b>order </b>     | <span>`int(11)`</span>  |  是    |       50                 |  <span style="font-size:12px"> 排序，默认50  </span> |
| <b>create_time </b>  | <span>`DATE`</span>  |    否    |   `CURRENT_TIMESTAMP`|   <span style="font-size:12px">数据创建时间  </span>     |
| <b>update_time </b>  | <span>`DATE`</span>   |    否      | `CURRENT_TIMESTAMP`  |  <span style="font-size:12px"> 更新时间 </span> |

> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建`user`表：
>> 1. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=user
>> ```
>> 2. 创建迁移文件 `user.js`，内容如下：<br/>
```js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE, TINYINT, ENUM, TEXT } = Sequelize;
    await queryInterface.createTable('user', {
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
        comment: '用户UUID'
      },
      username: {
        type: STRING(50),
        allowNull: false,
        unique: true,
        comment: '登录账号'
      },
      password: { 
        type: STRING(255),
        allowNull: false,
        comment: '加密密码'
      },
      nickname: {
        type: STRING(50),
        allowNull: false,
        defaultValue: '',
        comment: '用户昵称'
      },
      avatar : { 
        type: STRING(1000), 
        allowNull: true, 
        defaultValue: 'https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png', 
        comment: '管理员头像（本地、网络图片地址）' 
      },
      devicefingeruuid: {
        type: STRING(200),
        unique: true,
        allowNull: false,
        defaultValue: '',
        comment: '设备标识（游客标识）'
      },
      uniplatform: {
        type: STRING(100),
        allowNull: false,
        defaultValue: '',
        comment: '平台类型（web/mp-weixin/app）等'
      },
      devicemodel: {
        type: STRING(100),
        allowNull: false,
        defaultValue: '',
        comment: '设备型号'
      },
      deviceos: {
        type: STRING(100),
        allowNull: false,
        defaultValue: '',
        comment: '操作系统'
      },
      devicebrand: {
        type: STRING(100),
        allowNull: false,
        defaultValue: '',
        comment: '设备品牌'
      },
      userset: {
        type: TEXT,
        allowNull: false,
        defaultValue: '',
        comment: '用户设置'
      },
      mobile: {
        type: STRING(20),
        unique: true,
        comment: '手机号'
      },
      email: {
        type: STRING(100),
        unique: true,
        comment: '邮箱'
      },
      status: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: '用户状态 1：启用，0：禁用'
      },
      last_login: {
        type: DATE,
        comment: '最后登录时间'
      },
      last_login_ip: {
        type: STRING(45),
        comment: '最后登录IP'
      },
      register_time: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '注册时间'
      },
      register_ip: {
        type: STRING(45),
        comment: '注册IP'
      },
      is_deleted: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '软删除标记'
      },
      wechat_openid: {
        type: STRING(128),
        unique: true,
        comment: '微信OpenID'
      },
      qq_openid: {
        type: STRING(128),
        unique: true,
        comment: 'QQ OpenID'
      },
      weibo_uid: {
        type: STRING(128),
        unique: true,
        comment: '微博UID'
      },
      role: {
        type: STRING(20),
        allowNull: false,
        defaultValue: 'user',
        comment: '用户角色'
      },
      is_email_verified: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '邮箱验证'
      },
      is_mobile_verified: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '手机验证'
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

  async down(queryInterface) {
    await queryInterface.dropTable('user');
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

### `user`表模型
`app/model/user.js`
```js
'use strict';
//哈希函数 
const crypto = require('node:crypto');
// 引入 uuid 库 `npm install uuid`
const { v4: uuidv4 } = require('uuid'); 

module.exports = app => {
    const { INTEGER, STRING, DATE, TINYINT, ENUM, TEXT } = app.Sequelize;

    const User = app.model.define('user', {
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
            comment: '用户UUID',
            defaultValue: () => uuidv4(), // 自动生成 UUID
        },
        username: {
            type: STRING(50),
            allowNull: false,
            unique: true,
            comment: '登录账号'
        },
        password: {
            type: STRING(255),
            allowNull: false,
            comment: '加密密码',
            set(val) {
                //'sha256'加密
                let hash = crypto.createHash('sha256', app.config.crypto.secret); //或者md5
                hash.update(val);
                let result = hash.digest('hex');
                // console.log(result);
                this.setDataValue('password', result);
            }
        },
        nickname: {
            type: STRING(50),
            allowNull: false,
            defaultValue: '',
            comment: '用户昵称'
        },
        avatar: {
            type: STRING(1000),
            allowNull: true,
            defaultValue: 'https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png',
            comment: '管理员头像（本地、网络图片地址）'
        },
        devicefingeruuid: {
          type: STRING(200),
          unique: true,
          allowNull: false,
          defaultValue: '',
          comment: '设备标识（游客标识）'
        },
        uniplatform: {
          type: STRING(100),
          allowNull: false,
          defaultValue: '',
          comment: '平台类型（web/mp-weixin/app）等'
        },
        devicemodel: {
          type: STRING(100),
          allowNull: false,
          defaultValue: '',
          comment: '设备型号'
        },
        deviceos: {
          type: STRING(100),
          allowNull: false,
          defaultValue: '',
          comment: '操作系统'
        },
        devicebrand: {
          type: STRING(100),
          allowNull: false,
          defaultValue: '',
          comment: '设备品牌'
        },
        userset: {
          type: TEXT,
          allowNull: false,
          defaultValue: '',
          comment: '用户设置'
        },
        mobile: {
            type: STRING(20),
            unique: true,
            comment: '手机号'
        },
        email: {
            type: STRING(100),
            unique: true,
            comment: '邮箱'
        },
        status: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 1,
            comment: '用户状态 1：启用，0：禁用'
        },
        last_login: {
            type: DATE,
            comment: '最后登录时间'
        },
        last_login_ip: {
            type: STRING(45),
            comment: '最后登录IP'
        },
        register_time: {
            type: DATE,
            allowNull: false,
            defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: '注册时间'
        },
        register_ip: {
            type: STRING(45),
            comment: '注册IP'
        },
        is_deleted: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 0,
            comment: '软删除标记'
        },
        wechat_openid: {
            type: STRING(128),
            unique: true,
            comment: '微信OpenID'
        },
        qq_openid: {
            type: STRING(128),
            unique: true,
            comment: 'QQ OpenID'
        },
        weibo_uid: {
            type: STRING(128),
            unique: true,
            comment: '微博UID'
        },
        role: {
            type: STRING(20),
            allowNull: false,
            defaultValue: 'user',
            comment: '用户角色'
        },
        is_email_verified: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 0,
            comment: '邮箱验证'
        },
        is_mobile_verified: {
            type: TINYINT(1),
            allowNull: false,
            defaultValue: 0,
            comment: '手机验证'
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

    return User;
}
```





## 二、 `user_info`表字段设计
| 字段名  |  数据类型及描述    |   空    | <p >默认值 </p>  | <p>字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id</b>|<span>`INTEGER(20).UNSIGNED` </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |   `无`  |         主键id  |
| <b>user_id </b>  | <span>`INTEGER(20).UNSIGNED 外键关联user.id`</span>   |    否      | `无`  |  <span style="font-size:12px"> 用户ID </span> |
| <b>gender </b>  | <span>`ENUM('male','female','unknown')`</span>   |    否      | `'unknown'`  |  <span style="font-size:12px"> 性别 </span> |
| <b>birthday </b> | <span>`DATE`</span>   | 是 | `NULL`| <span style="font-size:12px"> 出生日期 </span> |
| <b>bio </b> | <span>`STRING(200)`</span>   | 是 | `NULL`| <span style="font-size:12px"> 个人简介 </span> |
| <b>location </b> | <span>`STRING(100)`</span>   | 是 | `NULL`| <span style="font-size:12px"> 所在地 </span> |
| <b>website </b> | <span>`STRING(255)`</span>   | 是 | `NULL`| <span style="font-size:12px"> 个人网站 </span> |
| <b>order </b>     | <span>`int(11)`</span>  |  是    |       50                 |  <span style="font-size:12px"> 排序，默认50  </span> |
| <b>create_time </b>  | <span>`DATE`</span>  |    否    |   `CURRENT_TIMESTAMP`|   <span style="font-size:12px">数据创建时间  </span>     |
| <b>update_time </b>  | <span>`DATE`</span>   |    否      | `CURRENT_TIMESTAMP`  |  <span style="font-size:12px"> 更新时间 </span> |

> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建`user_info`表：
>> 1. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=user_info
>> ```
>> 2. 创建迁移文件 `user_info.js`，内容如下：<br/>
```js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE, ENUM } = Sequelize;
    await queryInterface.createTable('user_info', {
      id: { 
        type: INTEGER(20).UNSIGNED, 
        primaryKey: true, 
        autoIncrement: true,
        comment: '主键id'
      },
      user_id:{
        type: INTEGER(20).UNSIGNED, 
        allowNull: true, 
        defaultValue:0,
        comment: '用户ID',
        references: { //关联关系
          model: 'user', //关联的表
          key: 'id' //关联表的主键
        },
        onDelete: 'cascade', //删除时操作
        onUpdate: 'restrict', // 更新时操作
      },
      gender: {
        type: ENUM('male', 'female', 'unknown'),
        allowNull: false,
        defaultValue: 'unknown',
        comment: '性别'
      },
      birthday: {
        type: DATE,
        comment: '出生日期'
      },
      bio: {
        type: STRING(200),
        comment: '个人简介'
      },
      location: {
        type: STRING(100),
        comment: '所在地'
      },
      website: {
        type: STRING(255),
        comment: '个人网站'
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
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_info');
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

### `user_info`表模型
`app/model/user_info.js`
```js
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM } = app.Sequelize;

    const UserInfo = app.model.define('user_info', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键id'
        },
        user_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: true,
            defaultValue: 0,
            comment: '用户ID',
            references: { //关联关系
                model: 'user', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        gender: {
            type: ENUM('male', 'female', 'unknown'),
            allowNull: false,
            defaultValue: 'unknown',
            comment: '性别'
        },
        birthday: {
            type: DATE,
            comment: '出生日期'
        },
        bio: {
            type: STRING(200),
            comment: '个人简介'
        },
        location: {
            type: STRING(100),
            comment: '所在地'
        },
        website: {
            type: STRING(255),
            comment: '个人网站'
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

    // 模型关联关系
    UserInfo.associate = function (models) {
        // 关联user 
        this.belongsTo(app.model.User, {
            foreignKey: 'user_id',  // 关联外键
            // as: 'UserInfo', // 别名（可选）
            
        });
    }

    return UserInfo;
}
```
