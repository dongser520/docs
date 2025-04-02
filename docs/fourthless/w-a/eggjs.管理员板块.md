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


## 二、后台管理员登录生成商城超级管理员token
### 1. eggjs参数验证
<a href="/secondless/w-c/ValParams%20API%20说明.html#参数验证处理" target="_blank">点击查看 eggjs参数验证</a><br/>

### 2. 生成唯一token用到jwt加密鉴权
```js
  npm i egg-jwt --save
```

### 3. 配置jwt加密鉴权
`config/plugin.js`
```js
module.exports = {
  ...
  // 配置jwt加密鉴权
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};
```
### 4. 配置密钥
`config/config.default.js`
```js
...
//加密处理秘钥---随便定义：字母符号下划线数字等任意组合
config.crypto = {
  secret: 'qhdgw@45ncashdaksh2!#@3nxjdas*_672',
};

//jwt鉴权密钥，可以和上面crypto一样，也可以不一样，但一定要复杂
config.jwt = {
  secret: 'qhdgw@45ncashdaksh2!#@3nxjdas*_259',
};
...
```

### 5. 扩展context.js封装生成token和验证token的方法
`app/extend/context.js`
```js
...
// 生成token
getToken(value){
    return this.app.jwt.sign(value,this.app.config.jwt.secret);
},
//验证token
checkToken(token){
   return this.app.jwt.verify(token,this.app.config.jwt.secret);
},
```
### 6. 控制器代码
`app/controller/admin/home.js`
```js
...
  //管理员登录提交数据逻辑
  async loginevent() {
    const { ctx, app } = this;
    //1.参数验证
    this.ctx.validate({
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
    // 判断管理员是否存在
    const manager = await app.model.Manager.findOne({
      where: {
        username: username,
        status:1,
      },
    });
    if (!manager) {
      ctx.throw(400, '管理员不存在或者被禁用');
    }
    // 存在则验证密码
    await this.checkPassword(password, manager.password);
    //存储在session中，定义session中的一个属性auth存储登录信息
    ctx.session.auth = manager;

    // 同时登录商城系统，生成token(网站后台只支持超级管理员登录商城系统)
    // 普通管理员跟thinkphp框架一样，提供api接口
    if(manager.super == 1){
      await this.loginShopManager({
        username,
        password,
      });
    }

    return ctx.apiSuccess('ok');
  }

  // 登录商城系统，生成token(网站后台只支持超级管理员登录商城系统)
  async loginShopManager(obj){
    const { ctx, app } = this;
    //一般流程
    // 1.参数验证 ---上面已经验证过了
    // 2.验证用户是否存在 -- 和网站超级管理员一起生成的，存在
    // 3.验证用户状态是否启用 -- 超级管理员默认启用
    // 4.验证用户密码 
    // 5. 生成唯一token
    // 6. 加入到缓存中（保证用户提交验证的token来自我们服务器生成的）
    // 7. 返回用户信息和token

    // 拿参数
    // const { username, password } = ctx.request.body;
    // 判断管理员是否存在
    let shop_manager = await app.model.ShopManager.findOne({
      where: {
        username: obj.username,
        status:1,
      },
    });
    if (!shop_manager) {
      ctx.throw(400, '管理员不存在或者被禁用');
    }

    // 验证用户密码 
    const isMatch = bcrypt.compareSync(obj.password, shop_manager.password);
    if (!isMatch) {
       ctx.throw(400, '商城系统管理员密码错误');
    } 

    // 生成唯一token
    // 用到jwt加密鉴权： npm i egg-jwt --save 放到扩展中写一个公共方法
    shop_manager = JSON.parse(JSON.stringify(shop_manager));
    // console.log(shop_manager);
    //this.app.jwt.sign(shop_manager, this.app.config.jwt.secret);
    let token = ctx.getToken(shop_manager);
    shop_manager.token = token; //给用户信息加上token属性
    //删除密码
    delete shop_manager.password;
    console.log('商城登录的超级管理员', shop_manager);

    return true;

  }
```

## 三、商城系统管理员登录信息加入缓存redis中
### 1. 安装redis插件
```js
  npm i egg-redis --save
```
### 2. 配置redis插件
`config/plugin.js`
```js
  //配置redis插件
  redis: {
    enable: true,
    package: 'egg-redis',
  },
```
### 3. 配置redis存储服务器
`config/config.default.js`
```js
  ...
  //配置redis存储服务器
  config.redis = {
    client: {
      port: 6379, // Redis 默认端口
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0, // 默认为 0
    },
  };
```

### 4. 新建封装一个redis的缓存服务类
`app/service/cache.js`
```js
'use strict';

const Service = require('egg').Service;

class CacheService extends Service {
    /**
     * 获取列表
     * @param {string} key 键
     * @param {boolean} isChildObject 元素是否为对象
     * @return { array } 返回数组
     */
    async getList(key, isChildObject = false) {
        const { redis } = this.app
        let data = await redis.lrange(key, 0, -1)
        if (isChildObject) {
            data = data.map(item => {
                return JSON.parse(item);
            });
        }
        return data;
    }
    /**
     * 设置列表
     * @param {string} key 键
     * @param {object|string} value 值
     * @param {string} type 类型：push和unshift
     * @param {Number} expir 过期时间 单位秒
     * @return { Number } 返回索引
     */
    async setList(key, value, type = 'push', expir = 0) {
        const { redis } = this.app
        if (expir > 0) {
            await redis.expire(key, expir);
        }
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        if (type === 'push') {
            return await redis.rpush(key, value);
        }
        return await redis.lpush(key, value);
    }

    /**
     * 设置 redis 缓存
     * @param { String } key 键
     * @param {String | Object | array} value 值
     * @param { Number } expir 过期时间 单位秒
     * @return { String } 返回成功字符串OK
     */
    async set(key, value, expir = 0) {
        const { redis } = this.app
        if (expir === 0) {
            return await redis.set(key, JSON.stringify(value));
        } else {
            return await redis.set(key, JSON.stringify(value), 'EX', expir);
        }
    }

    /**
     * 获取 redis 缓存
     * @param { String } key 键
     * @return { String | array | Object } 返回获取的数据
     */
    async get(key) {
        const { redis } = this.app
        const result = await redis.get(key)
        return JSON.parse(result)
    }

    /**
     * redis 自增
     * @param { String } key 键
     * @param { Number } value 自增的值 
     * @return { Number } 返回递增值
     */
    async incr(key, number = 1) {
        const { redis } = this.app
        if (number === 1) {
            return await redis.incr(key)
        } else {
            return await redis.incrby(key, number)
        }
    }

    /**
     * 查询长度
     * @param { String } key
     * @return { Number } 返回数据长度
     */
    async strlen(key) {
        const { redis } = this.app
        return await redis.strlen(key)
    }

    /**
     * 删除指定key
     * @param {String} key 
     */
    async remove(key) {
        const { redis } = this.app
        return await redis.del(key)
    }

    /**
     * 清空缓存
     */
    async clear() {
        return await this.app.redis.flushall()
    }
}
module.exports = CacheService;
```

### 5. 控制器代码
`app/controller/admin/home.js`
```js
  //登录商城系统，生成token(网站后台只支持超级管理员登录商城系统)
  async loginShopManager(obj){
    const { ctx, app } = this;
    //一般流程
    // 1.参数验证 ---上面已经验证过了
    // 2.验证用户是否存在 -- 和网站超级管理员一起生成的，存在
    // 3.验证用户状态是否启用 -- 超级管理员默认启用
    // 4.验证用户密码 
    // 5. 生成唯一token
    // 6. 加入到缓存中（保证用户提交验证的token来自我们服务器生成的）
    // 7. 返回用户信息和token

    // 拿参数
    // const { username, password } = ctx.request.body;
    // 判断商城管理员是否存在
    let shop_manager = await app.model.ShopManager.findOne({
      where: {
        username: obj.username,
        status:1,
      },
    });
    if (!shop_manager) {
      ctx.throw(400, '商城管理员不存在或者被禁用');
    }

    // 4.验证用户密码
    const isMatch = bcrypt.compareSync(obj.password,shop_manager.password);
    if(!isMatch){
       ctx.throw(400, '商城管理员密码错误');
    }

    // 5. 生成唯一token
    shop_manager =  JSON.parse(JSON.stringify(shop_manager));
    // this.app.jwt.sign(shop_manager, this.app.config.jwt.secret);
    let token = ctx.getToken(shop_manager);
    shop_manager.token = token;
    console.log('商城超级管理员', shop_manager);

    // 6. 加入到缓存中（保证用户提交验证的token来自我们服务器生成的）
    let shop_manager_token = await this.service.cache.set('shop_manager_' + shop_manager.id, 
                                                          token, 60 * 60 * 24 * 365);
    if(!shop_manager_token){
      ctx.throw(400, '登录失败');
    }
  
  
    return true;
  }
```

## 四、清除缓存redis
以后台超级管理员退出登录为例，因为后台超级管理员登录的时候，一起登录了商城的超级管理员，所以，后台超级管理员退出登录，商城超级管理员也一样退出登录（清除缓存redis信息）。
`app/controller/admin/home.js`
```js
  ...
  // 管理员退出登录
  async logout() {
    const { ctx } = this;
    // 后台退出登录，商城管理员一样会退出登录(超级管理员有效)
    if(ctx.session.auth && ctx.session.auth.super == 1){
       // 商城系统超级管理员退出登录，并清除缓存
       await this.logoutShopManager();
    }
    // 清除session
    ctx.session.auth = null;
    ctx.toast('退出登录成功', 'success');
    ctx.redirect('/admin/login');
  }
  ...
  // 商城系统超级管理员退出登录清除缓存redis
  async logoutShopManager(){
    const { ctx, app } = this;
    //拿到商城系统超级管理员
    if(ctx.session.auth && ctx.session.auth.super == 1){
       let shop_manager = await app.model.ShopManager.findOne({
          where:{
             username: ctx.session.auth.username, //因为两个超级管理员账号一样
          }
       });
       console.log('商城超级管理员', shop_manager);
       let shop_manager_token =  await this.service.cache.get('shop_manager_' + shop_manager.id);
       console.log('商城超级管理员缓存信息', shop_manager_token);
       // 清除缓存redis
       if(shop_manager_token){
         await this.service.cache.remove('shop_manager_' + shop_manager.id);
       }
    }
    
  }
```

## 五、token权限验证中间件开发
### 1. 新建中间件 `app/middleware/shop_manager_auth.js`
```js
module.exports = (option, app) => {
    return async function shopManagerAuth(ctx, next) {
        // 1. 获取header头的token
        const { token } = ctx.header;
        // console.log('看一下header头',token);
        if (!token) {
            ctx.throw(400, '您没有权限访问商城接口');
        }

        //2. 根据token解密，换取用户信息，失败则要么Token已过期或者不合法，抛出错误，终止程序
        let shopmanager = {};
        try {
            shopmanager = ctx.checkToken(token);
        } catch (error) {
            let fail = error.name == 'TokenExpiredError'?
           'Token已过期！请重新获取令牌':'Token 令牌不合法！';
            ctx.throw(400,fail);
        }

        //3. 说明token解密正确，此时判断用户是否登录过
        // 根据当前解密的用户信息的id,去缓存拿一下该id的信息
        let t = await ctx.service.cache.get('shop_manager_' + shopmanager.id);
        if(!t || t != token){
            ctx.throw(400,'Token 令牌不合法！');
        }

        // 4. 说明当前用户之前登录过了，缓存里有他的数据，比如说已经登录过3天了
        // 但有一种情况，这三天内，他发了违规信息，已经被超级管理员禁用了或者被超级管理员把他从数据库删除了
        // 那么即使现在他传的token有效，也没有用，依旧不能让他操作
        shopmanager = await app.model.ShopManager.findByPk(shopmanager.id);
        if(!shopmanager || shopmanager.status == 0){
           ctx.throw(400,'用户不存在或已被禁用！');
        }

        // 5. 没什么问题了，把用户信息挂载到ctx上，方便调用
        ctx.auth_shop_manager = shopmanager;

        await next();
    }
}
```

### 2. 配置中间件 `config/config.default.js`
```js
...
config.middleware = ['errorHandler', 'adminAuth', 'adminMenu','shopManagerAuth'];
...
// 对中间件shopManagerAuth进一步配置
config.shopManagerAuth = {
  match:[
    '/shop/admin',//只要包含/shop/admin路由的任何页面都生效
  ],
};
...
```

