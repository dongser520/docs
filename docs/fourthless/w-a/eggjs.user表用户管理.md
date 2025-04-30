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
