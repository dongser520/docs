---
navbar: true
sidebar: auto
title: eggjs即时通讯后台
---

## 一、 后台新增即时通讯栏目
字体图标查看 <https://fontawesome.dashgame.com/>
### 一. 后台即时通讯用户管理
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


### 二. 即时通讯用户登录注册接口开发
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
        //...
        
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

### 三、给未登录用户创建一个游客身份
由于客户提出存在以下的场景：<br/>
场景1：<br/>
有公司或者企业，希望他的系统H5（网页）、小程序或者App， 在用户打开或者浏览的时候，用户没有登录，但是用户有问题想咨询他的客服进行聊天，咨询他公司的业务，用户也是只想简单的咨询一下业务，不想为了咨询一下业务，还要去注册登录他们公司的系统，这样的需求场景，我们需要考虑：在用户不登录（游客）的情况下，如何发起聊天？<br/><br/>
场景2：<br/>
若有的公司系统想开放了客服群聊功能，那么不登录的用户可以进入这个客服群聊，进行咨询业务，也有这样的使用场景<br/><br/>

另外在讲这个之前，我们需要给大家补充说明一下 `user`表
### 1 `user`表有新增字段
大家打开`user`表说明：<a href="/web/mysql/user.html#一、-user表字段设计" target="_blank">一、 user表字段设计</a> ，表里面新增了一些字段，主要是为了处理`游客模式` 和 `统计`。
1. 大家看一下自己的数据库，`user`表有没有这几个字段，如果没有的话，去下载本节课的课件，课件里面有`数据库`，大家将最新的数据库导入到`phpMyadmin`中，覆盖掉现有的数据库。
2. 另外，大家看一下`user`表迁移文件和模型代码，有没有这几个新增的字段，没有的话，将代码覆盖一下。

### 2 在控制器 `app/controller/api/chat/chatuser.js`
### ① 游客用户注册身份
```js
    // 游客用户注册身份
    async visitorRegister() {
        const { ctx, app } = this;
        // 1. 签名验证
        const clientSign = ctx.get('X-Security-Sign');
        // return ctx.apiSuccess(clientSign);
        // 没有签名
        if (!clientSign) {
            return ctx.apiError('非法访问');
        }
        // 校验签名
        // 参数验证
        ctx.validate({
            deviceId: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '设备指纹', //字段含义
                range: {
                    min: 36,
                    max: 200
                }
            },
            timestamp: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '时间戳', //字段含义
            },
            uniplatform: {
                type: 'string',  
                required: false, 
                defValue: '', 
                desc: '平台类型', 
                range: {
                    min: 2,
                    max: 50
                }
            },
            devicemodel: {
                type: 'string',  
                required: false, 
                defValue: '', 
                desc: '设备型号', 
                range: {
                    min: 1,
                    max: 50
                }
            },
            deviceos: {
                type: 'string',  
                required: false, 
                defValue: '', 
                desc: '操作系统', 
                range: {
                    min: 1,
                    max: 50
                }
            },
            devicebrand: {
                type: 'string',  
                required: false, 
                defValue: '', 
                desc: '设备品牌', 
                range: {
                    min: 1,
                    max: 50
                }
            },
        });
        const { deviceId, timestamp,
            uniplatform, devicemodel, deviceos, devicebrand} = ctx.request.body;
        // 校验签名
        const serverSign = this.generateSign({
            deviceId,
            timestamp,
            salt: app.config.salt.secret, // 需与客户端盐值一致，存在配置中
        });

        if (clientSign !== serverSign) {
            return ctx.apiFail('非法签名');
        }

        // 2.请求时效验证（5分钟有效）
        if (Date.now() - timestamp > 300000) {
            return ctx.apiFail('请求已过期');
        }

        // 3. 设备ID格式校验
        if (!/^[\w-]{36}$/.test(deviceId)) {
            return ctx.apiFail('无效标识');
        }

        // 4. 限流策略（redis实现）
        const key = `chat_visitor_reg:${deviceId}`;
        const count = await ctx.app.redis.incr(key);
        await ctx.app.redis.expire(key, 3600); // 1小时过期

        if (count > 5) { // 1小时内最多5次
            //return ctx.throw(429, '请求过于频繁');
            return ctx.apiFail('请求过于频繁，请1个小时后再试');
        }

        // 5. 创建或更新游客用户
        /*
        let user = await ctx.model.User.findOrCreate({
            where: { devicefingeruuid: deviceId },
            defaults: {
                username: username,
                password: password,
                role: 'visitor',
                last_login: new Date()
            }
        });
        // 记得把user转一下, 注意返回的user是个数组
        user = JSON.parse(JSON.stringify(user));
        console.log('注意返回的user是个数组', user);
        */
        // 看一下这个deviceId标识下是否有账户
        let deviceIdUser = await this.app.model.User.findOne({ where: { devicefingeruuid: deviceId } });
        if (deviceIdUser) {
            // 如果有账户 - 一般返回客户端可以转一下
            // deviceIdUser = JSON.parse(JSON.stringify(deviceIdUser));
            // console.log('游客账户',deviceIdUser.toJSON());
            if(deviceIdUser.role == 'visitor'){
                // 如果是游客账户
                // 更新一下最近一次操作时间
                deviceIdUser.last_login = new Date();
                await deviceIdUser.save();
                // 游客账户自动登录，但不需要密码验证
                // 比对信息进行自动登录
                await this.compareData({
                    username: deviceIdUser.username,
                    role: deviceIdUser.role,
                });
            }else if(deviceIdUser.role == 'user'){
                // 如果是正常注册账户，退出登录后，用游客模式登录访问
                await this.compareData({
                    username: deviceIdUser.username,
                    role: 'visitor', // 注意这里改成了游客模式
                });
            }
            // 以下内容选择性更新（可采用异步更新，不用await）
            deviceIdUser.update({
                uniplatform, devicemodel, deviceos, devicebrand,
            });
        } else {
            // 没有账户则创建游客账户
            // 游客用户名：自定义
            let username = `VIS${deviceId.substr(0, 8)}`;
            // 游客密码:随机6位数，不足6位前面补0填充 即：000000-999999
            let password = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
            let user = await this.app.model.User.create({
                // 游客用户名：自定义
                username: username,
                // 游客密码:随机6位数，不足6位前面补0填充 即：000000-999999
                password: password,
                // 游客角色
                role: 'visitor',
                // 最近一次操作时间
                last_login: new Date(),
                // 设备指纹
                devicefingeruuid: deviceId,
                // 以下内容选择性写入
                uniplatform, devicemodel, deviceos, devicebrand,
            });
            user = JSON.parse(JSON.stringify(user));
            // 创建游客资料
            let userinfo = await this.ctx.model.UserInfo.findOne({ where: { user_id: user.id } });
            if (!userinfo) {
                //没有则创建
                await this.ctx.model.UserInfo.create({
                    user_id: user.id
                });
            }
            // 比对信息进行自动登录
            await this.compareData({
                username,
                password
            });
        }
    }
```

### ② 调整比对信息，自动登录
```js
    // 比对信息，自动登录
    async compareData(option) {
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
        // 如果比对传递了role, 且role = 'visitor' 则表示是游客登录，不需要验证密码
        if(!(option.role && option.role == 'visitor')){
            // 验证密码
            await this.checkPassword(option.password, user.password);
        }
        
        //存储在session中，定义session中的一个属性authuser存储用户登录信息
        // ctx.session.authuser = user; //存储到session

        // 根据业务需要，这里可以更新一些信息，比如：登录时间、登录ip等
        await user.update({
            last_login: Date.now(),//登录时间
        });
        // 把user转换成json对象，进行后续一些处理和返回给客户端
        user = JSON.parse(JSON.stringify(user));
        // 注意注册用户退出登录后，应该以游客模式返回前端访问
        if(option.role && option.role == 'visitor'){
            user.role = 'visitor'; // 给前端返回游客模式
        }
        //console.log('用户比对信息', user);
        // 生成唯一token
        let token = ctx.getToken(user);
        user.token = token;
        // console.log('即时通讯登录用户信息', user);
        // 加入到缓存中（保证用户提交验证的token来自我们服务器生成的）
        // 即加入redis中, 注意缓存时间的设置 60 * 60 * 24 * 365 * 100 为100年
        // 第三个参数为0，则是用不过期
        let user_token = await this.service.cache.set('chat_user_' + user.id,
            token, 60 * 60 * 24 * 365 * 100);
        if (!user_token) {
            ctx.throw(400, '登录失败');
        }
        // 返回
        delete user.password;
        return ctx.apiSuccess(user);
    }
```

### ③ 游客用户正式注册身份
```js
    // 游客用户正式注册身份
    async visitorregChat() {
        const { ctx, app } = this;
        // 1. 签名验证
        const clientSign = ctx.get('X-Security-Sign');
        // return ctx.apiSuccess(clientSign);
        // 没有签名
        if (!clientSign) {
            return ctx.apiError('非法访问');
        }
        // 校验签名
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
            deviceId: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '设备指纹', //字段含义
                range: {
                    min: 36,
                    max: 200
                }
            },
            timestamp: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '时间戳', //字段含义
            },
        });
        let { username, password, deviceId, timestamp } = this.ctx.request.body;
        // 校验签名
        const serverSign = this.generateSign({
            deviceId,
            timestamp,
            salt: app.config.salt.secret, // 需与客户端盐值一致，存在配置中
        });

        if (clientSign !== serverSign) {
            return ctx.apiFail('非法签名');
        }

        // 2.请求时效验证（5分钟有效）
        if (Date.now() - timestamp > 300000) {
            return ctx.apiFail('请求已过期');
        }

        // 3. 设备ID格式校验
        if (!/^[\w-]{36}$/.test(deviceId)) {
            return ctx.apiFail('无效标识');
        }

        // 4. 限流策略（redis实现）
        const key = `chat_visitor_reg:${deviceId}`;
        const count = await ctx.app.redis.incr(key);
        await ctx.app.redis.expire(key, 3600); // 1小时过期

        if (count > 5) { // 1小时内最多5次
            //return ctx.throw(429, '请求过于频繁');
            return ctx.apiFail('请求过于频繁，请1个小时后再试');
        }

        // 5. 注册账号或者更新账号
        // 账号之前都是以游客身份入驻的，账号和秘密都是随机的，现在正式注册，需要更新账号和密码
        // 先看一下注册的账号是否已经存在
        let user = await this.app.model.User.findOne({ where: { username } });
        if (user) {
            return this.ctx.apiFail('该账号已存在，请换一个账号注册');
        }
        // 再根据deviceId查询一下这个账户是否存在
        let deviceIdUser = await this.app.model.User.findOne({ where: { devicefingeruuid: deviceId } });
        if (deviceIdUser) {
            // 有则更新用户名密码
            deviceIdUser.username = username;
            deviceIdUser.password = password;
            // 重点：切换身份
            deviceIdUser.role = 'user';
            deviceIdUser.last_login = new Date();
            // 更新用户名密码
            await deviceIdUser.save();
        } else {
            //否则不存在账户则写入数据库
            let status = 1;
            let res = await this.app.model.User.create({
                username,
                password,
                status,
                last_login: new Date(),
            });
            // 创建用户资料
            await this.ctx.model.UserInfo.create({
                user_id: res.id
            });
            // 成功返回数据
            // res =  JSON.parse(JSON.stringify(res));
            // delete res.password;
            // this.ctx.apiSuccess(res);
        }
        // 逻辑： 注册成功后，自动登录，返回token
        // 比对信息,进行自动登录
        await this.compareData({
            username,
            password
        });
    }
```
### ④ 游客用户正式登录身份
```js
    // 游客用户正式登录身份
    async visitorloginChat() {
        const { ctx, app } = this;
        // 1. 签名验证
        const clientSign = ctx.get('X-Security-Sign');
        // return ctx.apiSuccess(clientSign);
        // 没有签名
        if (!clientSign) {
            return ctx.apiError('非法访问');
        }
        // 校验签名
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
            deviceId: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '设备指纹', //字段含义
                range: {
                    min: 36,
                    max: 200
                }
            },
            timestamp: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '时间戳', //字段含义
            },
        });
        let { username, password, deviceId, timestamp } = this.ctx.request.body;
        // 校验签名
        const serverSign = this.generateSign({
            deviceId,
            timestamp,
            salt: app.config.salt.secret, // 需与客户端盐值一致，存在配置中
        });

        if (clientSign !== serverSign) {
            return ctx.apiFail('非法签名');
        }

        // 2.请求时效验证（5分钟有效）
        if (Date.now() - timestamp > 300000) {
            return ctx.apiFail('请求已过期');
        }

        // 3. 设备ID格式校验
        if (!/^[\w-]{36}$/.test(deviceId)) {
            return ctx.apiFail('无效标识');
        }

        // 4. 限流策略（redis实现）
        const key = `chat_visitor_reg:${deviceId}`;
        const count = await ctx.app.redis.incr(key);
        await ctx.app.redis.expire(key, 3600); // 1小时过期

        if (count > 5) { // 1小时内最多5次
            //return ctx.throw(429, '请求过于频繁');
            return ctx.apiFail('请求过于频繁，请1个小时后再试');
        }

        // 5. 登录账号
        // 比对信息，自动登录
        await this.compareData({
            username,
            password
        });
    }
```

### 3 配置客户端签名的盐值
在 `config/config.default.js` 中配置
```js
...
// 客户端用户注册登录校验签名的盐值，用户登录模块
config.salt = {
    secret: '45ncashdaksh2!#@3nxjdas*_259',
};
...
```

### 4 定义路由 
在路由 `app/router/api/chat/router.js`
```js
module.exports = app => {
    const { router, controller } = app;
    //用户登录
    ...
    //用户注册
    ...
    //用户退出登录
    ...
    // 系统给游客用户注册身份
    router.post('/api/visitorRegister', controller.api.chat.chatuser.visitorRegister);
    // 游客用户正式注册身份
    router.post('/api/visitorregChat', controller.api.chat.chatuser.visitorregChat);
    // 游客用户正式登录身份
    router.post('/api/visitorloginChat', controller.api.chat.chatuser.visitorloginChat);
    //搜索用户（登录用户才能搜索用户，未登录用户（游客）不能搜索用户）
    ...

    //申请添加好友 （登录用户才能申请添加好友，（游客）不能申请添加好友）
    ...
};   

```

### 5 控制器完整代码
`app/controller/api/chat/chatuser.js`
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

    // 比对信息，自动登录
    async compareData(option) {
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
        // 如果比对传递了role, 且role = 'visitor' 则表示是游客登录，不需要验证密码
        if(!(option.role && option.role == 'visitor')){
            // 验证密码
            await this.checkPassword(option.password, user.password);
        }
        
        //存储在session中，定义session中的一个属性authuser存储用户登录信息
        // ctx.session.authuser = user; //存储到session

        // 根据业务需要，这里可以更新一些信息，比如：登录时间、登录ip等
        await user.update({
            last_login: Date.now(),//登录时间
        });
        // 把user转换成json对象，进行后续一些处理和返回给客户端
        user = JSON.parse(JSON.stringify(user));
        // 注意注册用户退出登录后，应该以游客模式返回前端访问
        if(option.role && option.role == 'visitor'){
            user.role = 'visitor'; // 给前端返回游客模式
        }
        //console.log('用户比对信息', user);
        // 生成唯一token
        let token = ctx.getToken(user);
        user.token = token;
        // console.log('即时通讯登录用户信息', user);
        // 加入到缓存中（保证用户提交验证的token来自我们服务器生成的）
        // 即加入redis中, 注意缓存时间的设置 60 * 60 * 24 * 365 * 100 为100年
        // 第三个参数为0，则是用不过期
        let user_token = await this.service.cache.set('chat_user_' + user.id,
            token, 60 * 60 * 24 * 365 * 100);
        if (!user_token) {
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

    // 搜索用户功能（登录用户才能搜索用户，未登录用户（游客）不能搜索用户）
    async searchUser(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            keyword: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '搜索关键词', //字段含义
                range: {
                    min: 1,
                    max: 50
                }
            },
        });
        // 获取搜索关键词
        let { keyword } = ctx.request.body;
        // 查询用户（模糊查询）
        const Op = app.Sequelize.Op;
        let users = await app.model.User.findAll({
            where: {
                username: {
                    [Op.like]: `%${keyword}%`,
                },
                status: 1,
                role:{
                    [this.app.Sequelize.Op.ne]: 'visitor', // role != 'visitor'
                },
                id:{
                    [this.app.Sequelize.Op.ne]: ctx.chat_user.id, // id != 自己的id
                },
            },
            // 读取某些字段
            attributes: ['id', 'username','avatar','role','uuid','nickname'],
            // 除了某些字段，其它都获取
            // attributes: { 
            //     exclude: ['password','uuid','mobile','email'], 
            // },
        });
        return ctx.apiSuccess(users);
    }


    // 游客用户注册身份
    async visitorRegister() {
        const { ctx, app } = this;
        // 1. 签名验证
        const clientSign = ctx.get('X-Security-Sign');
        // return ctx.apiSuccess(clientSign);
        // 没有签名
        if (!clientSign) {
            return ctx.apiError('非法访问');
        }
        // 校验签名
        // 参数验证
        ctx.validate({
            deviceId: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '设备指纹', //字段含义
                range: {
                    min: 36,
                    max: 200
                }
            },
            timestamp: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '时间戳', //字段含义
            },
            uniplatform: {
                type: 'string',  
                required: false, 
                defValue: '', 
                desc: '平台类型', 
                range: {
                    min: 2,
                    max: 50
                }
            },
            devicemodel: {
                type: 'string',  
                required: false, 
                defValue: '', 
                desc: '设备型号', 
                range: {
                    min: 1,
                    max: 50
                }
            },
            deviceos: {
                type: 'string',  
                required: false, 
                defValue: '', 
                desc: '操作系统', 
                range: {
                    min: 1,
                    max: 50
                }
            },
            devicebrand: {
                type: 'string',  
                required: false, 
                defValue: '', 
                desc: '设备品牌', 
                range: {
                    min: 1,
                    max: 50
                }
            },
        });
        const { deviceId, timestamp,
            uniplatform, devicemodel, deviceos, devicebrand} = ctx.request.body;
        // 校验签名
        const serverSign = this.generateSign({
            deviceId,
            timestamp,
            salt: app.config.salt.secret, // 需与客户端盐值一致，存在配置中
        });

        if (clientSign !== serverSign) {
            return ctx.apiFail('非法签名');
        }

        // 2.请求时效验证（5分钟有效）
        if (Date.now() - timestamp > 300000) {
            return ctx.apiFail('请求已过期');
        }

        // 3. 设备ID格式校验
        if (!/^[\w-]{36}$/.test(deviceId)) {
            return ctx.apiFail('无效标识');
        }

        // 4. 限流策略（redis实现）
        const key = `chat_visitor_reg:${deviceId}`;
        const count = await ctx.app.redis.incr(key);
        await ctx.app.redis.expire(key, 3600); // 1小时过期

        if (count > 5) { // 1小时内最多5次
            //return ctx.throw(429, '请求过于频繁');
            return ctx.apiFail('请求过于频繁，请1个小时后再试');
        }

        // 5. 创建或更新游客用户
        /*
        let user = await ctx.model.User.findOrCreate({
            where: { devicefingeruuid: deviceId },
            defaults: {
                username: username,
                password: password,
                role: 'visitor',
                last_login: new Date()
            }
        });
        // 记得把user转一下, 注意返回的user是个数组
        user = JSON.parse(JSON.stringify(user));
        console.log('注意返回的user是个数组', user);
        */
        // 看一下这个deviceId标识下是否有账户
        let deviceIdUser = await this.app.model.User.findOne({ where: { devicefingeruuid: deviceId } });
        if (deviceIdUser) {
            // 如果有账户 - 一般返回客户端可以转一下
            // deviceIdUser = JSON.parse(JSON.stringify(deviceIdUser));
            // console.log('游客账户',deviceIdUser.toJSON());
            if(deviceIdUser.role == 'visitor'){
                // 如果是游客账户
                // 更新一下最近一次操作时间
                deviceIdUser.last_login = new Date();
                await deviceIdUser.save();
                // 游客账户自动登录，但不需要密码验证
                // 比对信息进行自动登录
                await this.compareData({
                    username: deviceIdUser.username,
                    role: deviceIdUser.role,
                });
            }else if(deviceIdUser.role == 'user'){
                // 如果是正常注册账户，退出登录后，用游客模式登录访问
                await this.compareData({
                    username: deviceIdUser.username,
                    role: 'visitor', // 注意这里改成了游客模式
                });
            }
            // 以下内容选择性更新（可采用异步更新，不用await）
            deviceIdUser.update({
                uniplatform, devicemodel, deviceos, devicebrand,
            });
        } else {
            // 没有账户则创建游客账户
            // 游客用户名：自定义
            let username = `VIS${deviceId.substr(0, 8)}`;
            // 游客密码:随机6位数，不足6位前面补0填充 即：000000-999999
            let password = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
            let user = await this.app.model.User.create({
                // 游客用户名：自定义
                username: username,
                // 游客密码:随机6位数，不足6位前面补0填充 即：000000-999999
                password: password,
                // 游客角色
                role: 'visitor',
                // 最近一次操作时间
                last_login: new Date(),
                // 设备指纹
                devicefingeruuid: deviceId,
                // 以下内容选择性写入
                uniplatform, devicemodel, deviceos, devicebrand,
            });
            user = JSON.parse(JSON.stringify(user));
            // 创建游客资料
            let userinfo = await this.ctx.model.UserInfo.findOne({ where: { user_id: user.id } });
            if (!userinfo) {
                //没有则创建
                await this.ctx.model.UserInfo.create({
                    user_id: user.id
                });
            }
            // 比对信息进行自动登录
            await this.compareData({
                username,
                password
            });
        }
    }

    // 生成服务端签名
    generateSign(params) {
        const sortedStr = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&');
        // 2. （必须与前端的拼接方式一致）
        const fullString = sortedStr + 'APP_SECRET';

        return crypto
            //.createHmac('sha256', 'APP_SECRET') // 使用配置密钥
            .createHash('sha256') // 注意这里是 createHash 不是 createHmac
            .update(fullString)
            .digest('hex');
    }

    // 游客用户正式注册身份
    async visitorregChat() {
        const { ctx, app } = this;
        // 1. 签名验证
        const clientSign = ctx.get('X-Security-Sign');
        // return ctx.apiSuccess(clientSign);
        // 没有签名
        if (!clientSign) {
            return ctx.apiError('非法访问');
        }
        // 校验签名
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
            deviceId: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '设备指纹', //字段含义
                range: {
                    min: 36,
                    max: 200
                }
            },
            timestamp: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '时间戳', //字段含义
            },
        });
        let { username, password, deviceId, timestamp } = this.ctx.request.body;
        // 校验签名
        const serverSign = this.generateSign({
            deviceId,
            timestamp,
            salt: app.config.salt.secret, // 需与客户端盐值一致，存在配置中
        });

        if (clientSign !== serverSign) {
            return ctx.apiFail('非法签名');
        }

        // 2.请求时效验证（5分钟有效）
        if (Date.now() - timestamp > 300000) {
            return ctx.apiFail('请求已过期');
        }

        // 3. 设备ID格式校验
        if (!/^[\w-]{36}$/.test(deviceId)) {
            return ctx.apiFail('无效标识');
        }

        // 4. 限流策略（redis实现）
        const key = `chat_visitor_reg:${deviceId}`;
        const count = await ctx.app.redis.incr(key);
        await ctx.app.redis.expire(key, 3600); // 1小时过期

        if (count > 5) { // 1小时内最多5次
            //return ctx.throw(429, '请求过于频繁');
            return ctx.apiFail('请求过于频繁，请1个小时后再试');
        }

        // 5. 注册账号或者更新账号
        // 账号之前都是以游客身份入驻的，账号和秘密都是随机的，现在正式注册，需要更新账号和密码
        // 先看一下注册的账号是否已经存在
        let user = await this.app.model.User.findOne({ where: { username } });
        if (user) {
            return this.ctx.apiFail('该账号已存在，请换一个账号注册');
        }
        // 再根据deviceId查询一下这个账户是否存在
        let deviceIdUser = await this.app.model.User.findOne({ where: { devicefingeruuid: deviceId } });
        if (deviceIdUser) {
            // 有则更新用户名密码
            deviceIdUser.username = username;
            deviceIdUser.password = password;
            // 重点：切换身份
            deviceIdUser.role = 'user';
            deviceIdUser.last_login = new Date();
            // 更新用户名密码
            await deviceIdUser.save();
        } else {
            //否则不存在账户则写入数据库
            let status = 1;
            let res = await this.app.model.User.create({
                username,
                password,
                status,
                last_login: new Date(),
            });
            // 创建用户资料
            await this.ctx.model.UserInfo.create({
                user_id: res.id
            });
            // 成功返回数据
            // res =  JSON.parse(JSON.stringify(res));
            // delete res.password;
            // this.ctx.apiSuccess(res);
        }
        // 逻辑： 注册成功后，自动登录，返回token
        // 比对信息,进行自动登录
        await this.compareData({
            username,
            password
        });
    }

    // 游客用户正式登录身份
    async visitorloginChat() {
        const { ctx, app } = this;
        // 1. 签名验证
        const clientSign = ctx.get('X-Security-Sign');
        // return ctx.apiSuccess(clientSign);
        // 没有签名
        if (!clientSign) {
            return ctx.apiError('非法访问');
        }
        // 校验签名
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
            deviceId: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '设备指纹', //字段含义
                range: {
                    min: 36,
                    max: 200
                }
            },
            timestamp: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '时间戳', //字段含义
            },
        });
        let { username, password, deviceId, timestamp } = this.ctx.request.body;
        // 校验签名
        const serverSign = this.generateSign({
            deviceId,
            timestamp,
            salt: app.config.salt.secret, // 需与客户端盐值一致，存在配置中
        });

        if (clientSign !== serverSign) {
            return ctx.apiFail('非法签名');
        }

        // 2.请求时效验证（5分钟有效）
        if (Date.now() - timestamp > 300000) {
            return ctx.apiFail('请求已过期');
        }

        // 3. 设备ID格式校验
        if (!/^[\w-]{36}$/.test(deviceId)) {
            return ctx.apiFail('无效标识');
        }

        // 4. 限流策略（redis实现）
        const key = `chat_visitor_reg:${deviceId}`;
        const count = await ctx.app.redis.incr(key);
        await ctx.app.redis.expire(key, 3600); // 1小时过期

        if (count > 5) { // 1小时内最多5次
            //return ctx.throw(429, '请求过于频繁');
            return ctx.apiFail('请求过于频繁，请1个小时后再试');
        }

        // 5. 登录账号
        // 比对信息，自动登录
        await this.compareData({
            username,
            password
        });
    }

}

module.exports = ChatuserController;
```

### 6 接口说明
关于游客模式的接口，看文档：<a href="/fourthless/w-a/eggjs.即时通讯接口.html#十三、给游客用户注册身份" target="_blank">十三、给游客用户注册身份</a>

