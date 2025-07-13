---
navbar: true
sidebar: auto
title: eggjs即时通讯后台
---

## 一、 后台新增即时通讯栏目
字体图标查看 <https://fontawesome.dashgame.com/>
### 1. 后台即时通讯用户管理
### ① 新建控制器 `app/controller/admin/chatuser.js`
```js
'use strict';

const Controller = require('egg').Controller;

class ChatuserController extends Controller {
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
            title: '创建即时通讯用户',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/admin/chatuser/save",
                //  字段
                fields: [
                    {
                        label: '即时通讯用户登录账号',
                        type: 'text',
                        name: 'username',
                        placeholder: '请输入即时通讯用户登录账号',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '即时通讯用户登录密码',
                        type: 'password',
                        name: 'password',
                        placeholder: '请输入即时通讯用户登录密码',
                    },
                    {
                        label: '即时通讯用户头像',
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
            successUrl: '/admin/chatuser',
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
                desc: '即时通讯用户账号' //字段含义
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '即时通讯用户密码'
            },
            avatar: {
                type: 'string',
                required: false,
                // defValue: '', 
                desc: '即时通讯用户头像'
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
            return this.ctx.apiFail('即时通讯用户账号已存在');
        }
        //否则不存在则写入数据库 
        const res = await this.app.model.User.create({
            username,
            password,
            avatar,
            //auth
            // uuid: uuidv4(), // 手动设置 UUID
        });
        // 创建用户资料
        await this.ctx.model.UserInfo.create({
            user_id: res.id
        });

        /*
        await this.ctx.service.user.createdata({
            username,
            password,
            avatar,
            //auth
        });
        */

        this.ctx.apiSuccess('创建成功');
    }

    //创建列表页面
    async index() {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        let data = await ctx.page('User');

        //渲染公共模版
        await ctx.renderTemplate({
            title: '即时通讯用户列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/admin/chatuser/create',//新增路径
                        desc: '新增即时通讯用户',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    }
                ],
                //表头
                columns: [
                    {
                        title: '即时通讯用户账号',
                        // key: 'username',
                        // class: 'text-center',
                        render(item) {
                            let nickname = item.nickname;
                            if(nickname){
                                nickname = `昵称：${nickname}`;
                            }else{
                                nickname = '';
                            }
                            return `
                              <h2 class="table-avatar">
                                <a href="#" class="avatar avatar-sm mr-2">
                                    <img
                                        class="avatar-img rounded-circle"
                                        src="${item.avatar}"
                                        alt="User Image"></a>
                                    <a href="#"> ${item.username}
                                    <span>id:${item.id}</span>
                                    <span>${nickname}</span>
                                </a>
                              </h2>
                              `;
                        },
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
              @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'chatuser','User')">${arr[i].name}</button>`;
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
                                return `/admin/chatuser/edit/${id}`;
                            },
                            //删除
                            delete: function (id) {
                                return `/admin/chatuser/delete/${id}`;
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
        ctx.redirect('/admin/chatuser');

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
            return ctx.apiFail('该即时通讯用户不存在', 404);
        }
        data = JSON.parse(JSON.stringify(data));
        delete data.password;
        // console.log(data);

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改即时通讯用户',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改提交地址
                action: '/admin/chatuser/update/' + id,
                //  字段
                fields: [
                    {
                        label: '即时通讯用户账号',
                        type: 'text',
                        name: 'username',
                        placeholder: '请输入即时通讯用户账号',
                    },
                    {
                        label: '即时通讯用户密码',
                        type: 'password',
                        name: 'password',
                        placeholder: '请输入即时通讯用户密码',
                    },
                    {
                        label: '即时通讯用户头像',
                        type: 'file',
                        name: 'avatar',
                    },
                ],
                //修改内容默认值
                data,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/admin/chatuser',
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
                desc: '即时通讯用户id'
            },
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '即时通讯用户账号' //字段含义
            },
            password: {
                type: 'string',
                required: false,
                // defValue: '', 
                desc: '即时通讯用户密码'
            },
            avatar: {
                type: 'string',
                required: false,
                // defValue: '', 
                desc: '即时通讯用户头像'
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
            return ctx.pageFail('该即时通讯用户记录不存在');
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
            return ctx.apiFail('该即时通讯用户账号已经存在，不能修改成该即时通讯用户账号');
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

module.exports = ChatuserController;

```

### ② 定义路由 
新建路由 `app/router/admin/chat.js`
```js
module.exports = app => {
    const { router, controller } = app;
    //删除用户功能
    router.get('/admin/chatuser/delete/:id', controller.admin.chatuser.delete);
    //修改用户界面
    router.get('/admin/chatuser/edit/:id', controller.admin.chatuser.edit);
    //修改用户数据功能
    router.post('/admin/chatuser/update/:id', controller.admin.chatuser.update);
    // 创建用户界面
    router.get('/admin/chatuser/create', controller.admin.chatuser.create);
    //创建用户提交数据
    router.post('/admin/chatuser/save', controller.admin.chatuser.save);
    //用户列表页面
    router.get('/admin/chatuser/index', controller.admin.chatuser.index);
    router.get('/admin/chatuser', controller.admin.chatuser.index);
};
```


### ③ 引入路由 `app/router.js`
```js
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  //分组
  ...
  //引入后端路由
  require('./router/admin/chat')(app);


  // 上传单个文件流模式到本地服务器
  router.post('/uploadStreamSingleToServer', controller.upload.uploadStreamSingleToServer); 
  // 自定义上传路径上传单个文件流模式到本地服务器
  router.post('/uploadStreamSingleToServerDiy/:diydir', controller.upload.uploadStreamSingleToServerDiy); 
};

```

### ④ 在后台菜单新增即时通讯栏目
在 `data/root.json`中
```json
[
    ...
    {"id":28,"pid":0, "name": "即时通讯", "icon": "fa fa-weixin", "url": "" },
    {"id":29,"pid":28, "name": "即时通讯用户", "icon": "fa fa-comments", "url": "/admin/chatuser" }
]
```


### 2. 即时通讯用户登录注册接口开发
### ① 新建控制器 `app/controller/api/chat/chatuser.js`
```js
'use strict';
//哈希函数 
const crypto = require('node:crypto');

const Controller = require('egg').Controller;

class ChatuserController extends Controller {
    // 用户登录
    async userlogin() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '账号', //字段含义
                range: {
                    min: 4,
                    max: 20
                }
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '密码',
                range: {
                    min: 6,
                    max: 20
                }
            },
        });
        // 拿参数
        const { username, password } = ctx.request.body;
        // 比对信息
        await this.compareData({
            username,
            password
        });
        
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
                range: {
                    min: 4,
                    max: 20
                }
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '密码',
                range: {
                    min: 6,
                    max: 20
                }
            },
        });
        let { username, password } = this.ctx.request.body;
        let user = await this.app.model.User.findOne({where: {username}});
        if (user) {
            return this.ctx.apiFail('该账号已存在，请换一个账号注册');
        }
        //否则不存在则写入数据库
        let status = 1;
        let res = await this.app.model.User.create({
            username,
            password,
            status
        });
        // 创建用户资料
        await this.ctx.model.UserInfo.create({
            user_id: res.id
        });
        // 成功返回数据
        // res =  JSON.parse(JSON.stringify(res));
        // delete res.password;
        // this.ctx.apiSuccess(res);
        // 逻辑： 注册成功后，自动登录，返回token
        // 比对信息
        await this.compareData({
            username,
            password
        });
    }

    // 比对信息
    async compareData(option){
        const { ctx, app } = this;
        // 判断是否存在
        let user = await app.model.User.findOne({
            where: {
                username: option.username,
                status: 1,
            },
        });
        if (!user) {
            // ctx.throw(400, '账号不存在或者被禁用');
            return ctx.apiFail('账号不存在或者被禁用');
        }
        // 存在则验证密码
        await this.checkPassword(option.password, user.password);
        //存储在session中，定义session中的一个属性authuser存储用户登录信息
        // ctx.session.authuser = user; //存储到session
        // 生成唯一token
        user =  JSON.parse(JSON.stringify(user));
        let token = ctx.getToken(user);
        user.token = token;
        // console.log('即时通讯登录用户信息', user);
        // 加入到缓存中（保证用户提交验证的token来自我们服务器生成的）
        // 即加入redis中, 注意缓存时间的设置 60 * 60 * 24 * 365 * 100 为100年
        // 第三个参数为0，则是用不过期
        let user_token =  await this.service.cache.set('chat_user_' + user.id, 
                                token, 60 * 60 * 24 * 365 * 100);
        if(!user_token){
            ctx.throw(400, '登录失败');
        }
        // 返回
        delete user.password;
        return ctx.apiSuccess(user);
    }

    // 用户退出登录
    async userlogout(){
        const { ctx,app } = this;
        // 获取当前用户信息 通过中间件chatUserAuth挂载到ctx.chat_user了
        let user = ctx.chat_user;
        if(user){
            let user_token =  await this.service.cache.get('chat_user_' + user.id);
            // console.log('即时通讯用户缓存信息', user_token);
            if(user_token){
                //清除redis
                await this.service.cache.remove('chat_user_' + user.id);
            }
        }
        return ctx.apiSuccess(true);
    }
}

module.exports = ChatuserController;

```


### ② 定义路由 
新建路由 `app/router/api/chat/router.js`
```js
module.exports = app => {
    const { router, controller } = app;
    //用户登录
    router.post('/api/loginChat', controller.api.chat.chatuser.userlogin);
    //用户注册
    router.post('/api/regChat', controller.api.chat.chatuser.userregister);
    //用户退出登录
    router.post('/api/chat/logout', controller.api.chat.chatuser.userlogout);
};
```

### ③ 引入路由 `app/router.js`
```js
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  //分组
  ...
  //引入前端路由
  require('./router/api/chat/router')(app);
  require('./router/admin/chat')(app);


  // 上传单个文件流模式到本地服务器
  ...
  // 自定义上传路径上传单个文件流模式到本地服务器
  ...
};
```

### ④ 判断即时通讯用户登录的中间件 
新建中间件 `app/middleware/chat_user_auth.js`
```js
module.exports = (option, app) => {
    return async function chatUserAuth(ctx, next) {
        // 针对游客的操作
        ...
        
        // 即时通讯注册用户的登录验证
        // 1. 获取header头的token
        const { token } = ctx.header;
        if (!token) {
            ctx.throw(400, '您没有权限访问即时通讯接口');
        }

        //2. 根据token解密，换取用户信息，失败则要么Token已过期或者不合法，抛出错误，终止程序
        let user = {};
        try {
            user = ctx.checkToken(token);
        } catch (error) {
            let fail = (error.name == 'TokenExpiredError') ? 'Token已过期！请重新获取令牌' : 'Token 令牌不合法！';
            ctx.throw(400, fail);
        }

        //3. 说明token解密正确，此时判断用户是否登录过
        // 根据当前解密的用户信息的id,去缓存拿一下该id的信息
        let t = await ctx.service.cache.get('chat_user_' + user.id);
        //console.log('打印t',user.id);
        if (!t || t != token) {
            ctx.throw(400, 'Token 令牌不合法！');
        }

        // 4. 说明当前用户之前登录过了，缓存里有他的数据，比如说已经登录过3天了
        // 但有一种情况，这三天内，他发了违规信息，已经被超级管理员禁用了或者被超级管理员把他从数据库删除了
        // 那么即使现在他传的token有效，也没有用，依旧不能让他操作
        user = await app.model.User.findByPk(user.id);
        if (!user || user.status == 0) {
            ctx.throw(400, '当前用户不存在或者已被禁用');
        }

        // 5. 没什么问题了，把用户信息挂载到ctx上，方便调用
        ctx.chat_user = user;

        await next();
    }
}
```

### ⑤ 配置中间件 `app/config/config.default.js`
```js
/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1704440165151_308';

  // add your middleware config here
  config.middleware = ['errorHandler', 'adminAuth', 'adminMenu','shopManagerAuth','chatUserAuth'];
  // 对中间件errorHandler进一步配置
  config.errorHandler = {
    //  enable:false,//不开启中间件
    //指定走中间件的路由
    /*
    match:[
      '/message/delete',//只要包含/message/delete路由的任何页面都生效
      // '/message/readOne'
    ],
    */
    // ignore:["/message/delete"],//除了这个不走，其他都走中间件，match 和 ignore 只能配置一个
  };
  // 对中间件adminAuth进一步配置
  ...
  // 对中间件adminMenu进一步配置
  ...
  // 对中间件shopManagerAuth进一步配置
  ...
  // 对中间件chatUserAuth进一步配置
  config.chatUserAuth = {
    match:[
      '/api/chat',//只要包含/api/chat路由的任何页面都生效
    ],
  };

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

  return {
    ...config,
    ...userConfig,
  };
};

```