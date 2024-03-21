---
navbar: true
sidebar: auto
title: 直播功能中的礼物表livegift
---

## 一、创建数据库直播功能中的礼物表 livegift
> 分析：我们一般直播间观看直播的用户给你刷礼物，最基本的字段有：礼物名称（name）、礼物图标（image）、礼物价值多少金币数量（coin），当然这是最简单的礼物组成，我们先写这么多字段，后面随着业务扩展在扩充字段。<br/><br/>
> 直播功能中的礼物表 livegift 基本表字段设计
> 
| 字段名                 |  数据类型   | 描述                              |   空     |         默认值                       | <p style="width:100px;">字段含义 </p>     |
| :---:                 | :---:       | :---:                            | :---:    |         :---:                           |        :---:                           |
| <b>id </b>            | <span>int(20) </span>     | <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>      |   否      |         <span style="font-size:12px">无  </span>                             |                                        |
| <b>name </b>      | varchar(30) |                                  |    否    |                                         |   <span style="font-size:12px"> 礼物名称  </span>                        |
| <b>image </b>      | varchar(255) |                                  |    否    |                                         |   礼物图标                          |
| <b> coin </b>    | <span>int(9) </span>  |                            |    是    |  默认值：0 	               |   礼物价值多少金币                      |
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
>> npx sequelize migration:generate --name=init-livegift
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
>>     await queryInterface.createTable('livegift', {
>>       id: { 
>>         type: INTEGER(20).UNSIGNED, 
>>         primaryKey: true, 
>>         autoIncrement: true,
>>         comment: '礼物表主键id'
>>       },
>>       name: { 
>>         type: STRING(30), 
>>         allowNull: false, 
>>         defaultValue: '', 
>>         comment: '礼物名称'
>>       },
>>       image : { 
>>         type: STRING(1000), 
>>         allowNull: false, 
>>         defaultValue: '', 
>>         comment: '礼物图标' 
>>       },
>>       coin : { 
>>         type: INTEGER(9), 
>>         allowNull: true, 
>>         defaultValue: 0, 
>>         comment: '礼物价值多少金币' 
>>       },
>>       // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
>>       create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
>>       update_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')}
>>     });
>>   },
>> 
>>   async down (queryInterface, Sequelize) {
>>     await queryInterface.dropTable('livegift')
>>   }
>> };
>> ```
>> 执行迁移文件命令生成数据库表：
>> ```js
>> // 升级数据库
>> npx sequelize db:migrate
>> ```

## 三、创建直播功能中的礼物表 livegift 的模型
> 模型文件主要是用于处理数据库表的增删改查等操作 `app/model/livegift.js`
> ```js
> 'use strict';
> 
> module.exports = app => {
>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;
> 
>     const Livegift = app.model.define('livegift', {
>         id: {
>             type: INTEGER(20).UNSIGNED,
>             primaryKey: true,
>             autoIncrement: true,
>             comment: '礼物表主键id'
>         },
>         name: {
>             type: STRING(30),
>             allowNull: false,
>             defaultValue: '',
>             comment: '礼物名称'
>         },
>         image: {
>             type: STRING(1000),
>             allowNull: false,
>             defaultValue: '',
>             comment: '礼物图标'
>         },
>         coin: {
>             type: INTEGER(9),
>             allowNull: true,
>             defaultValue: 0,
>             comment: '礼物价值多少金币'
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
>     return Livegift;
> }
> ```

## 四、创建直播功能中的礼物表 livegift 的控制器、完成后台功能中新增礼物功能
> 创建控制器 `app/controller/admin/livegift.js` 完成功能
> ```js
> 'use strict';
> 
> const Controller = require('egg').Controller;
> 
> class LivegiftController extends Controller {
>     //创建直播功能中的礼物---创建页面表单
>     async create() {
>         const { ctx } = this;
>         //渲染公共模版
>         await ctx.renderTemplate({
>             title: '创建直播功能中的礼物',//现在网页title,面包屑导航title,页面标题
>             tempType: 'form', //模板类型：table表格模板 ，form表单模板
>             form: {
>                 //提交地址
>                 action: "/admin/livegift/save",
>                 //  字段
>                 fields: [
>                     {
>                         label: '礼物名称',
>                         type: 'text',
>                         name: 'name',
>                         placeholder: '请输入礼物名称',
>                         // default:'默认值测试', //新增时候默认值，可选
>                     },
>                     {
>                         label: '礼物图标',
>                         type: 'file',
>                         name: 'image',
>                     },
>                     {
>                         label: '礼物价值多少金币',
>                         type: 'number',
>                         name: 'coin',
>                         default: '0',
>                         placeholder: '礼物价值多少金币,可选，默认0',
>                     }
>                 ],
>             },
>             //新增成功之后跳转到哪个页面
>             successUrl: '/admin/livegift/index',
>         });
>     }
> 
>     //创建创建直播功能中的礼物提交数据
>     async save() {
>         //一般处理流程
>         //1.参数验证
>         this.ctx.validate({
>             name: {
>                 type: 'string',  //参数类型
>                 required: true, //是否必须
>                 // defValue: '', 
>                 desc: '礼物名称' //字段含义
>             },
>             image: {
>                 type: 'string',
>                 required: true,
>                 // defValue: '', 
>                 desc: '礼物图标'
>             },
>             coin: {
>                 type: 'int',
>                 required: false,
>                 defValue: 0,
>                 desc: '礼物价值多少金币'
>             },
>         });
>         //先判断一下直播功能中的礼物是否存在，不存在在写入数据库
>         //2.写入数据库
>         //3.成功之后给页面反馈
>         let { name, image, coin } = this.ctx.request.body;
>         if (await this.app.model.Livegift.findOne({ where: { name } })) {
>             return this.ctx.apiFail('礼物名称已存在');
>         }
>         //否则不存在则写入数据库
>         const res = await this.app.model.Livegift.create({
>             name,
>             image,
>             coin
>         });
>         this.ctx.apiSuccess('创建礼物成功');
>     }
> }
> 
> module.exports = LivegiftController;
> 
> ```

## 五、完成后台功能中礼物的列表展示、修改礼物、删除礼物
> 控制器 `app/controller/admin/livegift.js` 完成功能
> ```javascript
> //创建直播功能中的礼物列表页面
>     async index() {
>         const { ctx, app } = this;
>         //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
>         let data = await ctx.page('Livegift');
>         //渲染公共模版
>         await ctx.renderTemplate({
>             title: '直播功能中的礼物列表',//现在网页title,面包屑导航title,页面标题
>             data,
>             tempType: 'table', //模板类型：table表格模板 ，form表单模板
>             table: {
>                 //表格上方按钮,没有不要填buttons
>                 buttons: [
>                     {
>                         url: '/admin/livegift/create',//新增路径
>                         desc: '新增直播功能中的礼物',//新增 //按钮名称
>                         // icon: 'fa fa-plus fa-lg',//按钮图标
>                     }
>                 ],
>                 //表头
>                 columns: [
>                     {
>                         title: '直播功能中的礼物名称',
>                         // key: 'username',
>                         render(item) {
>                             return `
>                 <h2 class="table-avatar">
>                   <a href="#" class="avatar avatar-sm mr-2">
>                       <img
>                           class="avatar-img rounded-circle"
>                           src="${item.image}"
>                           alt="User Image"></a>
>                       <a href="#"> ${item.name}
>                       <span>直播功能中的礼物</span></a>
>                 </h2>
>                `;
>                         },
>                     },
>                     {
>                         title: '创建时间',
>                         key: 'create_time',
>                         width: 200,//可选
>                         class: 'text-center',//可选
>                     },
>                     {
>                         title: '操作',
>                         class: 'text-right',//可选
>                         action: {
>                             //修改
>                             edit: function (id) {
>                                 return `/admin/livegift/edit/${id}`;
>                             },
>                             //删除
>                             delete: function (id) {
>                                 return `/admin/livegift/delete/${id}`;
>                             }
>                         }
>                     },
>                 ],
>             },
>         });
>     }
> 
>     //删除直播功能中的礼物功能
>     async delete() {
>         const { ctx, app } = this;
>         const id = ctx.params.id;
>         await app.model.Livegift.destroy({
>             where: {
>                 id
>             }
>         });
>         //提示
>         ctx.toast('直播功能中的礼物删除成功', 'success');
>         //跳转
>         ctx.redirect('/admin/livegift/index');
>     }
> 
>     //修改直播功能中的礼物界面
>     async edit() {
>         const { ctx, app } = this;
>         const id = ctx.params.id;
>         let data = await app.model.Livegift.findOne({
>             where: {
>                 id
>             }
>         });
>         if (!data) {
>             return ctx.pageFail('该直播功能中的礼物不存在', 404);
>         }
>         // data = JSON.parse(JSON.stringify(data));
>         console.log(data);
>         //渲染公共模版
>         await ctx.renderTemplate({
>             id,
>             title: '修改直播功能中的礼物',//现在网页title,面包屑导航title,页面标题
>             tempType: 'form', //模板类型：table表格模板 ，form表单模板
>             form: {
>                 //修改直播功能中的礼物提交地址
>                 action: '/admin/livegift/update/' + id,
>                 //  字段
>                 fields: [
>                     {
>                         label: '礼物名称',
>                         type: 'text',
>                         name: 'name',
>                         placeholder: '请输入礼物名称',
>                         // default:'默认值测试', //新增时候默认值，可选
>                     },
>                     {
>                         label: '礼物图标',
>                         type: 'file',
>                         name: 'image',
>                     },
>                     {
>                         label: '礼物价值多少金币',
>                         type: 'number',
>                         name: 'coin',
>                         default: data.coin,
>                         placeholder: '礼物价值多少金币,可选，默认0',
>                     }
>                 ],
>                 //修改内容默认值
>                 data,
>             },
>             //修改成功之后跳转到哪个页面
>             successUrl: '/admin/livegift/index',
>         });
> 
>     }
>     //修改直播功能中的礼物数据功能
>     async update() {
>         const { ctx, app } = this;
>         //1.参数验证
>         this.ctx.validate({
>             id: {
>                 type: 'int',
>                 required: true,
>                 desc: '直播功能中的礼物id'
>             },
>             name: {
>                 type: 'string',  //参数类型
>                 required: true, //是否必须
>                 // defValue: '', 
>                 desc: '礼物名称' //字段含义
>             },
>             image: {
>                 type: 'string',
>                 required: true,
>                 // defValue: '', 
>                 desc: '礼物图标'
>             },
>             coin: {
>                 type: 'int',
>                 required: false,
>                 defValue: 0,
>                 desc: '礼物价值多少金币'
>             }
>         });
> 
>         // 参数
>         const id = ctx.params.id;
>         const { name, image, coin } = ctx.request.body;
>         // 先看一下直播功能中的礼物是否存在
>         const livegift = await app.model.Livegift.findOne({ where: { id } });
>         if (!livegift) {
>             return ctx.pageFail('该直播功能中的礼物记录不存在');
>         }
>         //存在，由于直播功能中的礼物的账号具有唯一性，你不能修改账号的时候，修改成存在的账号
>         const Op = this.app.Sequelize.Op;//拿Op,固定写法
>         if (await app.model.Livegift.findOne({
>             where: {
>                 name,
>                 id: {
>                     [Op.ne]: id
>                 }
>             }
>         })) {
>             return ctx.apiFail('该直播功能中的礼物名称已经存在，不能修改成该直播功能中的礼物名称');
>         }
>         // 修改数据
>         livegift.name = name;
>         livegift.image = image;
>         livegift.coin = coin;
>         await livegift.save();
>         // 给一个反馈
>         ctx.apiSuccess('修改礼物成功');
>     }
> ```
## 六、路由 `app/router/admin/admin.js`
> ```js
>    // 创建直播功能中的礼物界面
>    router.get('/admin/livegift/create', controller.admin.livegift.create);
>    //创建直播功能中的礼物提交数据
>    router.post('/admin/livegift/save', controller.admin.livegift.save);
>    //创建直播功能中的礼物列表页面
>    router.get('/admin/livegift/index', controller.admin.livegift.index);
>    //删除直播功能中的礼物功能
>    router.get('/admin/livegift/delete/:id', controller.admin.livegift.delete);
>    //修改直播功能中的礼物界面
>    router.get('/admin/livegift/edit/:id', controller.admin.livegift.edit);
>    //修改直播功能中的礼物数据功能
>    router.post('/admin/livegift/update/:id', controller.admin.livegift.update);
> ```