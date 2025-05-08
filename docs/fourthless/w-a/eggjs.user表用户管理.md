---
navbar: true
sidebar: auto
title: eggjs用户管理user相关文档
---

## 一、用户管理user表相关表说明
> 具体查看，<a href="/web/mysql/user.html" target="_blank">用户管理user表相关表说明</a><br/>

## 二、`user`路由
### 1. `user`路由
`app/router/admin/admin.js`
```js
...
    //删除用户功能
    router.get('/admin/user/delete/:id', controller.admin.user.delete);
    //修改用户界面
    router.get('/admin/user/edit/:id', controller.admin.user.edit);
    //修改用户数据功能
    router.post('/admin/user/update/:id', controller.admin.user.update);
    // 创建用户界面
    router.get('/admin/user/create', controller.admin.user.create);
    //创建用户提交数据
    router.post('/admin/user/save', controller.admin.user.save);
    //用户列表页面
    router.get('/admin/user', controller.admin.user.index);
    

    // 公共方法，根据id修改某张表中的某个字段
    router.post('/admin/commonUpdateById', controller.admin.home.commonUpdateById);
    // 后台首页
    router.get('/admin', controller.admin.home.index);
```

### 2. 在后台左侧新增一个用户管理中心菜单
### 字体图标查看 <https://fontawesome.dashgame.com/>
`data/root.json`
```js
    ...
    {"id":20,"pid":0, "name": "用户管理中心", "icon": "fa fa-users", "url": "" },
    {"id":21,"pid":20, "name": "招商局人员管理", "icon": "fa fa-user-o", "url": "/admin/user" }
```


## 三、`user`模型
### 1. 模型自动写入 `uuid`
`app/model/user.js`
```js
'use strict';
//哈希函数 
const crypto = require('node:crypto');
// 引入 uuid 库 `npm install uuid`
const { v4: uuidv4 } = require('uuid'); 

module.exports = app => {
    const { INTEGER, STRING, DATE, TINYINT, ENUM } = app.Sequelize;

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

## 四、`user`控制器
`app/controller/admin/user.js`
```js
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    //创建用户---创建页面表单
    async create() {
        const { ctx } = this;

        // let data = fs.readFileSync('./data/root.json', {
        //   encoding: 'utf-8'
        // });
        // data = this.app.transformToTree(JSON.parse(data));
        // console.log('处理之后的data', JSON.stringify(data));
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            title: '创建招商局人员',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/admin/user/save",
                //  字段
                fields: [
                    {
                        label: '招商局人员登录账号',
                        type: 'text',
                        name: 'username',
                        placeholder: '请输入招商局人员登录账号',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '招商局人员登录密码',
                        type: 'password',
                        name: 'password',
                        placeholder: '请输入招商局人员登录密码',
                    },
                    {
                        label: '招商局人员头像',
                        type: 'file',
                        name: 'avatar',
                    },
                    //   {
                    //     label: '权限分配',
                    //     type: 'treeDataSelect',//树形结构数据选择
                    //     name: 'auth',
                    //     default: JSON.stringify(data),
                    //   }
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '/admin/user',
        });
    }
    //创建用户提交数据
    async save() {

        //超级用户的特殊权限
        // console.log(ctx.session.auth); 
        // if (this.ctx.session.auth.super != 1) {
        //   return this.ctx.apiFail('您无权操作此项功能');
        // }
        //一般处理流程
        //1.参数验证
        this.ctx.validate({
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '招商局人员账号' //字段含义
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '招商局人员密码'
            },
            avatar: {
                type: 'string',
                required: false,
                // defValue: '', 
                desc: '招商局人员头像'
            },
            //   auth: {
            //     type: 'string',
            //     required: false,
            //     defValue: '',
            //     desc: '权限id'
            //   },
        });
        //先判断一下账号是否存在，不存在在写入数据库
        //2.写入数据库
        //3.成功之后给页面反馈

        //  let params = this.ctx.request.body; 
        //  console.log(params); //{ username: 'admin', password: '123456', avatar: '' }
        let { username, password,
            avatar,
            // auth 
        } = this.ctx.request.body;
        // let manager = await this.app.model.Manager.findOne({where: {username}});
        if (await this.app.model.User.findOne({ where: { username } })) {
            return this.ctx.apiFail('招商局人员账号已存在');
        }
        //否则不存在则写入数据库
        const res = await this.app.model.User.create({
            username,
            password,
            avatar,
            //auth
        });
        this.ctx.apiSuccess('创建成功');
    }

    //创建列表页面
    async index() {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        let data = await ctx.page('User');

        //渲染公共模版
        await ctx.renderTemplate({
            title: '招商局人员列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/admin/user/create',//新增路径
                        desc: '新增招商局人员',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    }
                ],
                //表头
                columns: [
                    {
                        title: '招商局人员账号',
                        key: 'username',
                        class: 'text-center',
                    },
                    {
                        title: '可用状态',
                        key: 'status',
                        width: 200,//可选
                        class: 'text-center',//可选
                        hidekeyData: true,//是否隐藏key对应的数据
                        render(item) {
                            console.log('可用状态里面每个item', item);
                            let arr = [
                                { value: 1, name: '启用' },
                                { value: 0, name: '禁用' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.status}"
                      value="${arr[i].value}"
                      @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'user','User')">${arr[i].name}</button>`;
                            }
                            str += `</div>`;
                            return str;
                        }
                    },
                    {
                        title: '操作',
                        class: 'text-right',//可选
                        action: {
                            //修改
                            edit: function (id) {
                                return `/admin/user/edit/${id}`;
                            },
                            //删除
                            delete: function (id) {
                                return `/admin/user/delete/${id}`;
                            }
                        }
                    },
                ],
            },
        });
    }

    //删除功能
    async delete() {
        const { ctx, app } = this;
        const id = ctx.params.id;

        await app.model.User.destroy({
            where: {
                id
            }
        });
        //提示
        ctx.toast('删除成功', 'success');
        //跳转
        ctx.redirect('/admin/user');

    }

    //修改界面
    async edit() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let data = await app.model.User.findOne({
            where: {
                id
            }
        });
        if (!data) {
            return ctx.apiFail('该招商局人员不存在', 404);
        }
        data = JSON.parse(JSON.stringify(data));
        delete data.password;
        // console.log(data);

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改招商局人员',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改提交地址
                action: '/admin/user/update/' + id,
                //  字段
                fields: [
                    {
                        label: '招商局人员账号',
                        type: 'text',
                        name: 'username',
                        placeholder: '请输入招商局人员账号',
                    },
                    {
                        label: '招商局人员密码',
                        type: 'password',
                        name: 'password',
                        placeholder: '请输入招商局人员密码',
                    },
                    {
                        label: '招商局人员头像',
                        type: 'file',
                        name: 'avatar',
                    },
                ],
                //修改内容默认值
                data,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/admin/user',
        });

    }

    //修改数据功能
    async update() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '招商局人员id'
            },
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '招商局人员账号' //字段含义
            },
            password: {
                type: 'string',
                required: false,
                // defValue: '', 
                desc: '招商局人员密码'
            },
            avatar: {
                type: 'string',
                required: false,
                // defValue: '', 
                desc: '招商局人员头像'
            },
            // auth: {
            //     type: 'string',
            //     required: false,
            //     // defValue: '',
            //     desc: '权限id'
            // },
        });

        // 参数
        const id = ctx.params.id;
        const { username, password, 
            avatar, 
            // auth 
        } = ctx.request.body;
        // 先看一下是否存在
        let data = await app.model.User.findOne({ where: { id } });
        if (!data) {
            return ctx.pageFail('该招商局人员记录不存在');
        }
        //存在，由于的账号具有唯一性，你不能修改账号的时候，修改成存在的账号
        const Op = this.app.Sequelize.Op;//拿Op,固定写法
        if (await app.model.User.findOne({
            where: {
                username,
                id: {
                    [Op.ne]: id
                }
            }
        })) {
            // return ctx.pageFail('该账号已经存在，不能修改成该账号', 404);
            return ctx.apiFail('该招商局人员账号已经存在，不能修改成该招商局人员账号');
        }
        // 修改数据
        data.username = username;
        if (password) {
            data.password = password;
        }
        if (avatar) {
            data.avatar = avatar;
        }

        // if (auth) {
        //     data.auth = auth;
        // }

        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改成功');
    }
}

module.exports = UserController;

```

## 五、关于UUID(uuid)的生成说明
### 一、推荐方式：使用 uuid 库
### 1. 安装官方库
```bash
npm install uuid
```
### 2.生成 UUID v4（推荐）
```js
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4(); // 生成类似 '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```
### 3.生成 UUID v1（基于时间戳）
```js
const { v1: uuidv1 } = require('uuid');
const uuid = uuidv1(); // 生成类似 'c4abbabe-7234-11ec-90d6-0242ac120003'
```

### 二、在 Egg.js 中的具体应用
### 方式1：在 Model 层自动生成（推荐）
```js
// app/model/user.js
const { v4: uuidv4 } = require('uuid');

module.exports = app => {
  const { STRING, UUID } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER(20).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    uuid: {
      type: STRING(36),
      allowNull: false,
      unique: true,
      defaultValue: () => uuidv4() // ✨ 自动生成 UUID
    },
    // ...其他字段
  });

  return User;
};
```

### 方式2：在 Service 层手动生成
```js
// app/service/user.js
const { v4: uuidv4 } = require('uuid');

class UserService extends Service {
  async createUser(userData) {
    const { app } = this;
    
    return await app.model.User.create({
      uuid: uuidv4(), // ✨ 手动设置 UUID
      username: userData.username,
      // ...其他字段
    });
  }
}
```

### 三、不同 UUID (uuid) 版本对比

| 版本     |  特点      |   示例    | 适用场景     | 
| :---:   | :---:      |  :---:    | :---:       | 
| <b>v1 </b>  | 基于时间戳+MAC地址    |    `c4abbabe-7234-11ec-90d6-0242ac120003` |  需要可排序的场景  | 
| <b>v4 </b>  | 完全随机生成    |    `9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d` |  通用场景（推荐）  |
| <b>v5 </b>  | 基于命名空间+名称    |    需要提供命名空间 |  需要确定性生成的场景  |

### 四、重要注意事项
> 1. 存储长度：UUID 字符串固定为 36 字节（含连字符）
> 2. 性能优化：如果存储量极大，可考虑：
>     1. 使用 BINARY(16) 类型存储（需转换二进制）
>     2. 使用 Snowflake 等更紧凑的分布式ID方案
> 3. 安全场景：如需不可预测性，必须使用 UUID v4
> 4. 可视化显示：给用户展示时可截取部分字符（如前8位）

### 五、其他生成方式（不推荐用于生产）
> 建议始终使用标准 UUID 库以保证唯一性和兼容性。
```js
// 临时替代方案（非标准UUID）
const tempId = Math.random().toString(36).substr(2, 9); // 输出类似 '4f90d13a7'
```


## 六、在创建完用户之后，创建一条用户资料记录
### 1. 方式一：简单方式写在创建用户方法之后
在控制器 `app/controller/admin/user.js`
```js
    //创建用户提交数据
    async save() {

        //超级用户的特殊权限
        // console.log(ctx.session.auth); 
        // if (this.ctx.session.auth.super != 1) {
        //   return this.ctx.apiFail('您无权操作此项功能');
        // }
        //一般处理流程
        //1.参数验证
        this.ctx.validate({
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '招商局人员账号' //字段含义
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '招商局人员密码'
            },
            avatar: {
                type: 'string',
                required: false,
                // defValue: '', 
                desc: '招商局人员头像'
            },
            //   auth: {
            //     type: 'string',
            //     required: false,
            //     defValue: '',
            //     desc: '权限id'
            //   },
        });
        //先判断一下账号是否存在，不存在在写入数据库
        //2.写入数据库
        //3.成功之后给页面反馈

        //  let params = this.ctx.request.body; 
        //  console.log(params); //{ username: 'admin', password: '123456', avatar: '' }
        let { username, password,
            avatar,
            // auth 
        } = this.ctx.request.body;
        // let manager = await this.app.model.Manager.findOne({where: {username}});
        if (await this.app.model.User.findOne({ where: { username } })) {
            return this.ctx.apiFail('招商局人员账号已存在');
        }
        //否则不存在则写入数据库
        const res = await this.app.model.User.create({
            username,
            password,
            avatar,
            //auth
        });
        // 创建用户资料
        await this.ctx.model.UserInfo.create({
            user_id: res.id
        });
        this.ctx.apiSuccess('创建成功');
    }

```
<br/><br/>

有同学问，有没有类似`thinkphp`的`onAfterInsert` 的后置操作，在创建完用户之后，创建一条用户资料记录？<br/><br/>
答案是：`有的`，可以通过 `模型生命周期钩子` 或 `Service 层逻辑` 来实现类似 `onAfterInsert` 的后置操作，具体取决于你使用的 ORM（如 Sequelize 或 Mongoose）。讲这个知识的主要原因是带领大家更深入理解一下`Eggjs`的模型`model`和服务`service`用法。以下是两种常见实现方式：
### 2.方式二：`模型生命周期钩子`即使用 ORM 的钩子
以 Sequelize 为例，可以通过模型的生命周期钩子 `afterCreate` 实现插入后操作：
#### 1. `app/model/user.js`
```js
'use strict';
//哈希函数 
const crypto = require('node:crypto');
// 引入 uuid 库 `npm install uuid`
const { v4: uuidv4 } = require('uuid'); 

module.exports = app => {
    const { INTEGER, STRING, DATE, TINYINT, ENUM } = app.Sequelize;

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

    // 定义 afterCreate 钩子
    User.afterCreate(async (user, options) => {
        // 创建匿名上下文,这是因为：
        // 1. 模型层（Model） 通常不直接持有请求上下文（ctx）。
        // 2. Service 方法 需要 ctx 才能访问框架资源（如数据库、配置等）。
        // 3. app.createAnonymousContext() 会生成一个“匿名”的上下文（无真实请求来源），专门用于此类场景。
        const ctx = app.createAnonymousContext();  // 创建匿名上下文
        // 创建用户信息，调用用户信息服务的 create 方法
        // `app/service/user_info.js`
        await ctx.service.userInfo.create({ user_id: user.id });
    });

    return User;
}
```
#### 2. `app/service/user_info.js`
```js
'use strict';

const Service = require('egg').Service;

class User_infoService extends Service {
    // 定义一个 create 方法
    async create(data) {
        const { app } = this.ctx;
        // 插入用户资料到数据库
        return await app.model.UserInfo.create(data);
    }
}

module.exports = User_infoService;
```

### 3.方式三：`在 Service 层封装逻辑`
在 Service 中显式处理创建用户后的操作(和第一种方式在写入用户数据后，再创建用户资料类似，只是写法不一样)：
#### ① `app/controller/admin/user.js`
```js
    //创建用户提交数据
    async save() {
        //超级用户的特殊权限
        // console.log(ctx.session.auth); 
        // if (this.ctx.session.auth.super != 1) {
        //   return this.ctx.apiFail('您无权操作此项功能');
        // }
        //一般处理流程
        //1.参数验证
        this.ctx.validate({
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '招商局人员账号' //字段含义
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '招商局人员密码'
            },
            avatar: {
                type: 'string',
                required: false,
                // defValue: '', 
                desc: '招商局人员头像'
            },
            //   auth: {
            //     type: 'string',
            //     required: false,
            //     defValue: '',
            //     desc: '权限id'
            //   },
        });
        //先判断一下账号是否存在，不存在在写入数据库
        //2.写入数据库
        //3.成功之后给页面反馈

        //  let params = this.ctx.request.body; 
        //  console.log(params); //{ username: 'admin', password: '123456', avatar: '' }
        let { username, password,
            avatar,
            // auth 
        } = this.ctx.request.body;
        // let manager = await this.app.model.Manager.findOne({where: {username}});
        if (await this.app.model.User.findOne({ where: { username } })) {
            return this.ctx.apiFail('招商局人员账号已存在');
        }
        //否则不存在则写入数据库
        /*
        const res = await this.app.model.User.create({
            username,
            password,
            avatar,
            //auth
        });
        // 创建用户资料
        await this.app.model.UserInfo.create({
            user_id: res.id
        });
        */
        await this.ctx.service.user.createdata({
            username,
            password,
            avatar,
            //auth
        });
        this.ctx.apiSuccess('创建成功');
    }
```
#### ② `app/service/user.js`
```js
'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async createdata(userData) {
        const { app } = this.ctx;
        let user;
    
        // 使用事务确保原子性
        await app.model.transaction(async t => {
          user = await app.model.User.create(userData, { transaction: t });
          await app.model.UserInfo.create({ user_id: user.id }, { transaction: t });
        });
    
        return user;
    }
}

module.exports = UserService;

```


## 七、用户简单登录和注册（信息存储在客户端）
### 1. user路由
`app/router/admin/admin.js`
```js
    ...
    //删除用户功能
    router.get('/admin/user/delete/:id', controller.admin.user.delete);
    //修改用户界面
    router.get('/admin/user/edit/:id', controller.admin.user.edit);
    //修改用户数据功能
    router.post('/admin/user/update/:id', controller.admin.user.update);
    // 创建用户界面
    router.get('/admin/user/create', controller.admin.user.create);
    //创建用户提交数据
    router.post('/admin/user/save', controller.admin.user.save);
    //用户列表页面
    router.get('/admin/user/index', controller.admin.user.index);
    router.get('/admin/user', controller.admin.user.index);

    //用户登录
    router.post('/api/user/login', controller.admin.user.userlogin);
    //用户注册
    router.post('/api/user/userregister', controller.admin.user.userregister);

    // 公共方法，根据id修改某张表中的某个字段
    router.post('/admin/commonUpdateById', controller.admin.home.commonUpdateById);
    // 后台首页
    router.get('/admin', controller.admin.home.index);
```
### 2. 控制器
`app/controller/admin/user.js`
```js
'use strict';
//哈希函数 
const crypto = require('node:crypto');
const Controller = require('egg').Controller;
class UserController extends Controller {
    // 用户登录
    async userlogin() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '账号' //字段含义
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '密码'
            },
        });
        // 拿参数
        const { username, password } = ctx.request.body;
        // 判断是否存在
        const user = await app.model.User.findOne({
            where: {
                username: username,
                status: 1,
            },
        });
        if (!user) {
            ctx.throw(400, '账号不存在或者被禁用');
        }
        // 存在则验证密码
        await this.checkPassword(password, user.password);
        //存储在session中，定义session中的一个属性authuser存储用户登录信息
        // ctx.session.authuser = user; //存储到客户端
        return ctx.apiSuccess(user);
    }
    // 验证密码
    async checkPassword(password, hash_password) {
        let hash = crypto.createHash('sha256', this.app.config.crypto.secret); //或者md5
        hash.update(password);
        password = hash.digest('hex');
        if (password !== hash_password) {
            this.ctx.throw(400, '账户或密码错误');
        }
        return true;
    }
    // 用户注册
    async userregister() {
        //1.参数验证
        this.ctx.validate({
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '账号', //字段含义
                range:{
                    min: 2,
                    max: 50
                }
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '密码'
            },
            nickname: {
                type: 'string',
                required: true,
                defValue: '', 
                desc: '姓名',
                range:{
                    min: 2,
                    max: 50
                }
            },
            role: {
                type: 'string',
                required: true,
                defValue: '',
                desc: '所属招商局名称',
                range:{
                    min: 2,
                    max: 20
                }
            },
            mobile: {
                type: 'phone',
                required: true,
                defValue: '',
                desc: '手机号'
            },
            status: {
                type: 'number',
                required: false,
                defValue: 0,
                desc: '状态'
            },
        });
        let { username, password,
            nickname,role,mobile
            // auth 
        } = this.ctx.request.body;
        // let user = await this.app.model.User.findOne({where: {username}});
        if (await this.app.model.User.findOne({ where: { nickname, role,mobile} })) {
            return this.ctx.apiFail('当前姓名的工作人员已经注册过，可能在审核中，无需再次注册');
        }
        if (await this.app.model.User.findOne({ where: { username } })) {
            return this.ctx.apiFail('该账号已存在，请换一个账号注册');
        }
        //否则不存在则写入数据库
        let status = 0;
        const res = await this.app.model.User.create({
            username,
            password,
            nickname,
            role,mobile,status
        });
        // 创建用户资料
        await this.ctx.model.UserInfo.create({
            user_id: res.id
        });
        this.ctx.apiSuccess('创建成功，请等待审核');
    }
}
module.exports = UserController;
```

### 3. postman/Apipost登录测试
1. 路由地址： `http://127.0.0.1:7001/api/user/login`
2. 请求：`POST`
3. `body` -> `urlencoded`
> 1. key(参数名): username, value（值）: `张三|13945375408|769558989@qq.com` <br/>
> 2. key(参数名): password, value（值）: `123456`
4. 返回结果
```js
{
	"msg": "ok",
	"data": {
		"create_time": "2025-05-06 10:48:50",
		"id": 3,
		"uuid": "8540efaf-648a-4a4f-a930-9f247dd23375",
		"username": "张三",
		"password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
		"nickname": "",
		"avatar": "https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png",
		"mobile": null,
		"email": null,
		"status": 1,
		"last_login": null,
		"last_login_ip": null,
		"register_time": "2025-05-06T02:48:50.000Z",
		"register_ip": null,
		"is_deleted": 0,
		"wechat_openid": null,
		"qq_openid": null,
		"weibo_uid": null,
		"role": "user",
		"is_email_verified": 0,
		"is_mobile_verified": 0,
		"order": 50,
		"update_time": "2025-05-06T02:48:50.000Z"
	}
}
```

### 3. postman/Apipost注册测试
1. 路由地址： `http://127.0.0.1:7001/api/user/userregister`
2. 请求：`POST`
3. `body` -> `urlencoded`
> 1. key(参数名): `username`, value（值）: `zhangsan` <br/>
> 2. key(参数名): `password`, value（值）: `123456`<br/>
> 3. key(参数名): `nickname`, value（值）: `张三`<br/>
> 4. key(参数名): `role`, value（值）: `汉中市招商局`<br/>
> 5. key(参数名): `mobile`, value（值）: `13858585548`<br/>
4. 返回结果
```js
{
	"msg": "ok",
	"data": "创建成功，请等待审核"
}
```