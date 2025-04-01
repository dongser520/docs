---
navbar: true
sidebar: auto
title: eggjs框架管理员板块
---

## 一、创建超级管理员
### 1. 新建角色表`role`的模型
`app/model/role.js`
```js
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const Role = app.model.define('role', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '角色表主键id'
        },
        name: {
            type: STRING(30),
            allowNull: false,
            defaultValue: '',
            comment: '角色名称'
        },
        desc: {
            type: STRING(255),
            allowNull: true,
            defaultValue: '',
            comment: '角色描述，对角色的简单介绍'
        },
        status: {
            type: INTEGER(1),
            allowNull: false,
            defaultValue: 1,
            comment: '状态：1：启用，0：禁用'
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
        update_time: { type: DATE, allowNull: false, defaultValue: app.Sequelize.fn('NOW') }
    });

    return Role;
}
```
### 2. 新建商城管理员`shop_manager`的模型 
`app/model/shop_manager.js`
```js
'use strict';
//哈希函数 
const crypto = require('node:crypto');
//实现与 PHP password_hash 函数（使用 PASSWORD_DEFAULT 选项）相同的加密结果
//采用 bcryptjs 库生成 BCrypt 哈希
//安装库：npm install bcryptjs
const bcrypt = require('bcryptjs');

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const ShopManager = app.model.define('shop_manager', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '管理员表主键id'
        },
        username: {
            type: STRING(30),
            allowNull: false,
            defaultValue: '',
            comment: '管理员账号'
        },
        password: {
            type: STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '管理员密码',
            set(val) {
                // 盐的轮数设为10，与PHP的PASSWORD_DEFAULT一致
                const saltRounds = 10;
                // 同步生成哈希
                const result = bcrypt.hashSync(val, saltRounds);
                // console.log(result);
                this.setDataValue('password', result);
            }
        },
        avatar: {
            type: STRING(1000),
            allowNull: true,
            defaultValue: 'https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png',
            comment: '管理员头像（本地、网络图片地址）'
        },
        status: {
            type: INTEGER(1),
            allowNull: false,
            defaultValue: 1,
            comment: '状态：1：启用，0：禁用'
        },
        super: {
            type: INTEGER(1),
            allowNull: true,
            defaultValue: 0,
            comment: '是否超级管理员 1是，0：否'
        },
        role_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: true,
            defaultValue: 0,
            comment: '角色id',
            references: { //关联关系
                model: 'role', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
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
        update_time: { type: DATE, allowNull: false, defaultValue: app.Sequelize.fn('NOW') }
    });

    return ShopManager;
}
```
### 3. 创建商城超级管理员
`app/controller/admin/home.js`
```js
  // 创建超级管理员账号
  async createSuperManager() {
    const { ctx, app } = this;
    let manager = await app.model.Manager.findAndCountAll();
    if(manager.count != 0){
       return ctx.apiFail('非法操作，系统拒绝您的请求');
    }
    //1.参数验证
    ctx.validate({
      username: {
        type: 'string',  //参数类型
        required: true, //是否必须
        // defValue: '', 
        desc: '管理员账号' //字段含义
      },
      password: {
        type: 'string',
        required: true,
        // defValue: '', 
        desc: '管理员密码'
      },
    });
    // 拿参数
    const { username, password } = ctx.request.body;
    await app.model.Manager.create({
      username,
      password,
      status:1,
      super:1, //超级管理员
    });
    // 创建商城的超级管理员
    await this.createSuperShopManager({
      username,
      password,
      status:1,
      super:1, //超级管理员
    });
    ctx.apiSuccess('ok');

  }

  // 创建商城超级管理员
  async createSuperShopManager(obj) {
    const { ctx, app } = this;
    //创建一个角色
    await app.model.Role.create({
      name: '超级管理员',
      desc: '拥有商城管理的所有权限',
    });
    //创建超级管理员
    await app.model.ShopManager.create({
      ...obj,
      role_id: 1,
    });
    return true;
  }
```
