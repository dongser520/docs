---
navbar: true
sidebar: auto
title: 直播功能中的用户表liveuser
---

可直接参考前面讲的 <a href="/secondless/w-c/响应式后台用户留言板管理.html" target="_blank" title="点击查看课程文档"> 留言板管理 </a>  的整个开发流程。

## 一、创建数据库直播功能中的用户表 liveuser
> 分析：我们一般直播间观看直播的用户最基本的字段有：首先最起码这个用户必须先登录才能进直播间，因此最起码用户有用户名（username）、密码（password）、头像（avatar）、金币（coin）(用户要给你刷礼物得有金币来购买礼物)、状态（status）(如果用户违规可以立即禁用它)，这是最起码的字段，其他字段根据业务需求再增加<br/><br/>
> 直播功能中的用户表 liveuser 基本表字段设计
> 
| 字段名                 |  数据类型   | 描述                              |   空     |         默认值                       | <p style="width:100px;">字段含义 </p>     |
| :---:                 | :---:       | :---:                            | :---:    |         :---:                           |        :---:                           |
| <b>id </b>            | <span>int(20) </span>     | <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>      |   否      |         <span style="font-size:12px">无  </span>                             |                                        |
| <b>username </b>      | varchar(30) |                                  |    否    |                                         |   <span style="font-size:12px">用户账号、用户登录名  </span>                        |
| <b>password </b>      | varchar(255) |                                  |    否    |                                         |   用户密码                          |
| <b>avatar </b>      | <span style="font-size:12px">varchar(1000) </span>|                                  |   <span style="font-size:12px"> 是  </span>  |     <span style="font-size:12px">给一个默认图像地址：如：/public/assets/img/profiles/avatar-02.jpg</span>                                    |  <span style="font-size:12px"> 用户头像（本地、网络图片地址）  </span>         |
| <b> coin </b>    | <span>int(9) </span>  |                            |    是    |  默认值：0 	               |   用户金币数量                       |
| <b> status </b>  | <span>int(1) </span>  |                            |    是    |  默认值：1，说明：1启用，0禁用 	               |   用户状态                         |
| <b> create_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据创建时间                         |
| <b> update_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据更新时间                         |
> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`

## 二、创建迁移文件、执行迁移命令创建数据表
> 在数据库创建数据表的方式很多，在上面定义了表字段之后，可以使用`phpmyAdmin`、`数据库插件执行sql语句创建`等等方式，但是建议大家通过：创建迁移文件、执行迁移命令创建数据表。
>> 涉及的知识点：
>> 1. 章节2：egg.js基础-五、<a href="/secondless/w-c/Egg.js.html#五、eggjs项目中sequelize模型创建mysql数据库" target="_blank">eggjs项目中sequelize模型创建mysql数据库</a>
>>
>> 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=init-liveuser
>> ```
>> 创建迁移文件：
>> ```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up (queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = Sequelize;
>>     // 创建表 --- 类似我们sql语句定义表结构
>>     await queryInterface.createTable('liveuser', {
>>       id: { 
>>         type: INTEGER(20).UNSIGNED, 
>>         primaryKey: true, 
>>         autoIncrement: true,
>>         comment: '用户表主键id'
>>       },
>>       username: { 
>>         type: STRING(30), 
>>         allowNull: false, 
>>         defaultValue: '', 
>>         comment: '用户账号'
>>       },
>>       password: { 
>>         type: STRING(255), 
>>         allowNull: false, 
>>         defaultValue: '' , 
>>         comment: '用户密码'
>>       },
>>       avatar : { 
>>         type: STRING(1000), 
>>         allowNull: true, 
>>         defaultValue: '/public/admin/assets/img/profiles/avatar-02.jpg', 
>>         comment: '用户头像（本地、网络图片地址）' 
>>       },
>>       coin: {
>>         type: INTEGER(9),
>>         allowNull: true,
>>         defaultValue: 0,
>>         comment: '用户金币'
>>       },
>>       status: {
>>         type: INTEGER(1),
>>         allowNull: true,
>>         defaultValue: 1,
>>         comment: '状态：0禁用1启用'
>>       },
>>       // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
>>       create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
>>       update_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')}
>>     });
>>   },
>> 
>>   async down (queryInterface, Sequelize) {
>>     await queryInterface.dropTable('liveuser')
>>   }
>> };
>> 
>> ```
>> 执行迁移文件命令生成数据库表：
>> ```js
>> // 升级数据库
>> npx sequelize db:migrate
>> ```

## 三、创建直播功能中的用户表 liveuser 的模型
> 模型文件主要是用于处理数据库表的增删改查等操作 `app/model/liveuser.js`
> ```js
> 'use strict';
> //哈希函数 
> const crypto = require('node:crypto');
> module.exports = app => {
>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;
> 
>     const Liveuser = app.model.define('liveuser', {
>         id: {
>             type: INTEGER(20).UNSIGNED,
>             primaryKey: true,
>             autoIncrement: true,
>             comment: '用户表主键id'
>         },
>         username: {
>             type: STRING(30),
>             allowNull: false,
>             defaultValue: '',
>             comment: '用户账号'
>         },
>         password: {
>             type: STRING(255),
>             allowNull: false,
>             defaultValue: '',
>             comment: '用户密码',
>             set(val) {
>                //'sha256'加密
>                let hash = crypto.createHash('sha256', app.config.crypto.secret); //或者md5
>                hash.update(val);
>                let result = hash.digest('hex');
>                // console.log(result);
>                this.setDataValue('password', result);
>             }
>         },
>         avatar: {
>             type: STRING(1000),
>             allowNull: true,
>             defaultValue: '/public/admin/assets/img/profiles/avatar-02.jpg',
>             comment: '用户头像（本地、网络图片地址）'
>         },
>         coin: {
>             type: INTEGER(9),
>             allowNull: true,
>             defaultValue: 0,
>             comment: '用户金币'
>         },
>         status: {
>             type: INTEGER(1),
>             allowNull: true,
>             defaultValue: 1,
>             comment: '状态：0禁用1启用'
>         },
>         // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
>         create_time: {
>             type: DATE,
>             allowNull: false,
>             defaultValue: app.Sequelize.fn('NOW'),
>             get() {
>                 return app.formatTime(this.getDataValue('create_time'));
>             }
>         },
>         update_time: { type: DATE, allowNull: false, defaultValue: app.Sequelize.fn('NOW') }
>     });
> 
>     return Liveuser;
> }
> ```

## 四、创建直播功能中的用户表 liveuser 的控制器、完成后台功能中用户的新增用户功能
> 创建控制器 `app/controller/admin/liveuser.js` 完成功能
> ```javascript
> 'use strict';
> 
> const Controller = require('egg').Controller;
> 
> class LiveuserController extends Controller {
>     //创建直播功能用户---创建页面表单
>     async create() {
>         const { ctx } = this;
>         //渲染公共模版
>         await ctx.renderTemplate({
>             title: '创建直播功能用户',//现在网页title,面包屑导航title,页面标题
>             tempType: 'form', //模板类型：table表格模板 ，form表单模板
>             form: {
>                 //提交地址
>                 action: "/admin/liveuser/save",
>                 //  字段
>                 fields: [
>                     {
>                         label: '用户账号',
>                         type: 'text',
>                         name: 'username',
>                         placeholder: '请输入用户账号',
>                         // default:'默认值测试', //新增时候默认值，可选
>                     },
>                     {
>                         label: '用户密码',
>                         type: 'password',
>                         name: 'password',
>                         placeholder: '请输入用户密码',
>                     },
>                     {
>                         label: '用户头像',
>                         type: 'file',
>                         name: 'avatar',
>                     },
>                     {
>                         label: '用户金币',
>                         type: 'number',
>                         name: 'coin',
>                         default:'0', 
>                         placeholder: '用户金币，可选，默认0',
>                     },
>                     {
>                         label: '用户状态',
>                         type: 'number',
>                         name: 'status',
>                         default:'1', //新增时候默认值，可选
>                         placeholder: '0禁用1启用',
>                     }
>                 ],
>             },
>             //新增成功之后跳转到哪个页面
>             successUrl: '/admin/liveuser/index',
>         });
>     }
> 
>     //创建用户提交数据
>     async save() {
>         //一般处理流程
>         //1.参数验证
>         this.ctx.validate({
>             username: {
>                 type: 'string',  //参数类型
>                 required: true, //是否必须
>                 // defValue: '', 
>                 desc: '用户账号' //字段含义
>             },
>             password: {
>                 type: 'string',
>                 required: true,
>                 // defValue: '', 
>                 desc: '用户密码'
>             },
>             avatar: {
>                 type: 'string',
>                 required: false,
>                 // defValue: '', 
>                 desc: '用户头像'
>             },
>             coin: {
>                 type: 'int',
>                 required: false,
>                 defValue: 0, 
>                 desc: '用户金币'
>             },
>             status: {
>                 type: 'int',
>                 required: false,
>                 defValue: 1, 
>                 desc: '用户状态'
>             },
>         });
>         //先判断一下用户账号是否存在，不存在在写入数据库
>         //2.写入数据库
>         //3.成功之后给页面反馈
> 
>         //  let params = this.ctx.request.body; 
>         //  console.log(params); //{ username: 'admin', password: '123456', avatar: '' }
>         let { username, password, avatar,coin,status } = this.ctx.request.body;
>         // let manager = await this.app.model.Liveuser.findOne({where: {username}});
>         if (await this.app.model.Liveuser.findOne({ where: { username } })) {
>             return this.ctx.apiFail('用户账号已存在');
>         }
>         //否则不存在则写入数据库
>         const res = await this.app.model.Liveuser.create({
>             username,
>             password,
>             avatar,
>             coin,status
>         });
>        this.ctx.apiSuccess('创建成功');
>    }
> }
> 
> module.exports = LiveuserController;
> 
> ```

## 五、完成后台功能中用户的列表展示、修改用户、删除用户
> 控制器 `app/controller/admin/liveuser.js` 完成功能
> ```javascript
> //创建直播功能中的用户列表页面
>   async index() {
>     const { ctx, app } = this;
>     //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
>     let data = await ctx.page('Liveuser');
>     //渲染公共模版
>     await ctx.renderTemplate({
>       title: '直播功能中的用户列表',//现在网页title,面包屑导航title,页面标题
>       data,
>       tempType: 'table', //模板类型：table表格模板 ，form表单模板
>       table: {
>         //表格上方按钮,没有不要填buttons
>         buttons: [
>           {
>             url: '/admin/liveuser/create',//新增路径
>             desc: '新增直播功能中的用户',//新增 //按钮名称
>             // icon: 'fa fa-plus fa-lg',//按钮图标
>           }
>         ],
>         //表头
>         columns: [
>           {
>             title: '用户账号',
>             // key: 'username',
>             render(item) {
>               return `
>                 <h2 class="table-avatar">
>                   <a href="#" class="avatar avatar-sm mr-2">
>                       <img
>                           class="avatar-img rounded-circle"
>                           src="${item.avatar}"
>                           alt="User Image"></a>
>                       <a href="#"> ${item.username}
>                       <span>管理员</span></a>
>                 </h2>
>                `;
>             },
>           },
>           {
>             title: '创建时间',
>             key: 'create_time',
>             width: 200,//可选
>             class: 'text-center',//可选
>           },
>           {
>             title: '操作',
>             class: 'text-right',//可选
>             action: {
>               //修改
>               edit: function (id) {
>                 return `/admin/liveuser/edit/${id}`;
>               },
>               //删除
>               delete: function (id) {
>                 return `/admin/liveuser/delete/${id}`;
>               }
>             }
>           },
>         ],
>       },
>     });
>   }
> 
>   //删除直播功能中的用户功能
>   async delete() {
>     const { ctx, app } = this;
>     const id = ctx.params.id;
>     await app.model.Liveuser.destroy({
>       where: {
>         id
>       }
>     });
>     //提示
>     ctx.toast('用户删除成功', 'success');
>     //跳转
>     ctx.redirect('/admin/liveuser/index');
>   }
> 
>   //修改直播功能中的用户界面
>   async edit() {
>     const { ctx, app } = this;
>     const id = ctx.params.id;
>     let data = await app.model.Liveuser.findOne({
>       where: {
>         id
>       }
>     });
>     if (!data) {
>       return ctx.pageFail('该用户不存在', 404);
>     }
>     data = JSON.parse(JSON.stringify(data));
>     delete data.password;
>     //console.log(data);
>     //渲染公共模版
>     await ctx.renderTemplate({
>       id,
>       title: '修改直播功能中的用户',//现在网页title,面包屑导航title,页面标题
>       tempType: 'form', //模板类型：table表格模板 ，form表单模板
>       form: {
>         //修改直播功能中的用户提交地址
>         action: '/admin/liveuser/update/' + id,
>         //  字段
>         fields: [
>           {
>             label: '用户账号',
>             type: 'text',
>             name: 'username',
>             placeholder: '请输入用户账号',
>           },
>           {
>             label: '用户密码',
>             type: 'password',
>             name: 'password',
>             placeholder: '请输入用户密码',
>           },
>           {
>             label: '用户头像',
>             type: 'file',
>             name: 'avatar',
>           },
>           {
>             label: '用户金币',
>             type: 'number',
>             name: 'coin',
>             default: '0',
>             placeholder: '用户金币,可选，默认0',
>           },
>           {
>             label: '用户状态',
>             type: 'number',
>             name: 'status',
>             default: '1',
>             placeholder: '用户状态:0禁用1启用',
>           }
>         ],
>         //修改内容默认值
>         data,
>       },
>       //修改成功之后跳转到哪个页面
>       successUrl: '/admin/liveuser/index',
>     });
> 
>   }
>   //修改直播功能中的用户数据功能
>   async update() {
>     const { ctx, app } = this;
>     //1.参数验证
>     this.ctx.validate({
>       id: {
>         type: 'int',
>         required: true,
>         desc: '用户id'
>       },
>       username: {
>         type: 'string',  //参数类型
>         required: true, //是否必须
>         // defValue: '', 
>         desc: '用户账号' //字段含义
>       },
>       password: {
>         type: 'string',
>         // required: true,
>         // defValue: '', 
>         desc: '用户密码'
>       },
>       avatar: {
>         type: 'string',
>         required: false,
>         // defValue: '', 
>         desc: '用户头像'
>       },
>       coin: {
>         type: 'int',
>         required: false,
>         defValue: 0,
>         desc: '用户金币'
>       },
>       status: {
>         type: 'int',
>         required: false,
>         defValue: 1,
>         desc: '用户状态:0禁用1启用'
>       },
>     });
> 
>     // 参数
>     const id = ctx.params.id;
>     const { username, password, avatar, coin, status } = ctx.request.body;
>     // 先看一下是否存在
>     const liveuser = await app.model.Liveuser.findOne({ where: { id } });
>     if (!liveuser) {
>       return ctx.pageFail('该直播功能中的用户记录不存在');
>     }
>     //存在，由于直播功能中的用户的账号具有唯一性，你不能修改账号的时候，修改成存在的账号
>     const Op = this.app.Sequelize.Op;//拿Op,固定写法
>     if (await app.model.Liveuser.findOne({
>       where: {
>         username,
>         id: {
>           [Op.ne]: id
>         }
>       }
>     })) {
>       // return ctx.pageFail('该直播功能中的用户账号已经存在，不能修改成该直播功能中的用户账号', 404);
>       return ctx.apiFail('该直播功能中的用户账号已经存在，不能修改成该直播功能中的用户账号');
>     }
>     // 修改数据
>     liveuser.username = username;
>     if (password) {
>       liveuser.password = password;
>     }
>     if (avatar) {
>       liveuser.avatar = avatar;
>     }
>     liveuser.coin = coin;
>     liveuser.status = status;
>     await liveuser.save();
>     // 给一个反馈
>     ctx.apiSuccess('修改成功');
>   }
> ```
## 六、路由 `app/router/admin/admin.js`
> ```js
> // 创建直播功能中的用户界面
> router.get('/admin/liveuser/create', controller.admin.liveuser.create);
> //创建直播功能中的用户提交数据
> router.post('/admin/liveuser/save', controller.admin.liveuser.save);
> //创建直播功能中的用户列表页面
> router.get('/admin/liveuser/index', controller.admin.liveuser.index);
> //删除直播功能中的用户功能
> router.get('/admin/liveuser/delete/:id', controller.admin.liveuser.delete);
> //修改直播功能中的用户界面
> router.get('/admin/liveuser/edit/:id', controller.admin.liveuser.edit);
> //修改直播功能中的用户数据功能
> router.post('/admin/liveuser/update/:id', controller.admin.liveuser.update);
> ```