---
navbar: true
sidebar: auto
title: 直播功能中的订单表liveorder
---

## 一、创建数据库直播功能中的订单表 liveorder
> 分析：当你要给直播间的主播刷礼物的时候，我们上一节课说过了，礼物需要对应数量的金币购买，那么用金币购买礼物这个过程就会产生买礼物的订单，我们简单分析一下订单表的字段，最基本的字段有：订单号（no）、价格[值多少金币购买]（price）、订单支付状态（status-未支付-支付成功-支付失败等状态）、哪个用户下的订单（liveuser_id），当然这是最简单的订单组成，我们先写这么多字段，后面随着业务扩展在扩充字段。<br/><br/>
> 直播功能中的订单表 liveorder 基本表字段设计
> 
| 字段名                 |  数据类型   | 描述                              |   空     |         默认值                       | <p style="width:100px;">字段含义 </p>     |
| :---:                 | :---:       | :---:                            | :---:    |         :---:                           |        :---:                           |
| <b>id </b>            | <span>int(20) </span>     | <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>      |   否      |         <span style="font-size:12px">无  </span>                             |                                        |
| <b>no </b>      | varchar(100) |                                  |    否    |  <span style="font-size:12px"> 无、订单号一般字母数字等混合组成，具有唯一性  </span>   |   <span style="font-size:12px"> 订单号  </span>                        |
| <b>price </b>      | int(9) |                                  |    否    |      默认值：0                                    |   订单价格-多少金币买的                        |
| <b> status </b>    | <span>enum('pending', 'success', 'fail') </span>  |                            |    否     |  默认值：pending （未支付）	               |   订单支付状态    |
| <b>liveuser_id </b>      | int |                                  |    否    |      默认值：0                                    |   哪个用户下的订单              |
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
>> npx sequelize migration:generate --name=init-liveorder
>> ```
>> 创建迁移文件：
>> ### 重点理解关联关系的设置 references
>> ```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up (queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = Sequelize;
>>     // 创建表 --- 类似我们sql语句定义表结构
>>     await queryInterface.createTable('liveorder', {
>>       id: { 
>>         type: INTEGER(20).UNSIGNED, 
>>         primaryKey: true, 
>>         autoIncrement: true,
>>         comment: '订单主键id'
>>       },
>>       no: { 
>>         type: STRING(100), 
>>         allowNull: false, 
>>         defaultValue: '', 
>>         comment: '订单号',
>>         unique: true
>>       },
>>       price : { 
>>         type: INTEGER(9), 
>>         allowNull: false, 
>>         defaultValue: 0, 
>>         comment: '订单价格' 
>>       },
>>       status: { 
>>         type: ENUM, 
>>         values: ['pending', 'success', 'fail'], 
>>         allowNull: false, 
>>         defaultValue: 'pending', 
>>         comment: '订单支付状态'
>>       },
>>       liveuser_id:{
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '用户id',
>>         references: { //关联关系
>>           model: 'liveuser', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>>       create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
>>       update_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')}
>>     });
>>   },
>> 
>>   async down (queryInterface, Sequelize) {
>>     await queryInterface.dropTable('liveorder')
>>   }
>> };
>> ```
>> 执行迁移文件命令生成数据库表：
>> ```js
>> // 升级数据库-创建数据表
>> npx sequelize db:migrate
>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>> npx sequelize db:migrate:undo
>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>> npx sequelize db:migrate:undo:all
>> ```
表中的liveuser_id字段，我们称之为`外键`，外键是用来关联其他表的，比如上面我们关联了liveuser表，关联的liveuser表的主键id，我们通过外键来关联liveuser表的id，这样就实现了关联关系。

## 三、创建直播功能中的订单表 liveorder 的模型
> 模型文件主要是用于处理数据库表的增删改查等操作 `app/model/liveorder.js`
> ### 重点理解模型关联关系
> ```js
> 'use strict';
> 
> module.exports = app => {
>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;
> 
>     const Liveorder = app.model.define('liveorder', {
>         id: {
>             type: INTEGER(20).UNSIGNED,
>             primaryKey: true,
>             autoIncrement: true,
>             comment: '订单表主键id'
>         },
>         no: {
>             type: STRING(100),
>             allowNull: false,
>             defaultValue: '',
>             comment: '订单号',
>             unique: true
>         },
>         price: {
>             type: INTEGER(9),
>             allowNull: false,
>             defaultValue: 0,
>             comment: '订单价格'
>         },
>         status: {
>             type: ENUM,
>             values: ['pending', 'success', 'fail'],
>             allowNull: false,
>             defaultValue: 'pending',
>             comment: '订单支付状态'
>         },
>         liveuser_id: {
>             type: INTEGER(20).UNSIGNED,
>             allowNull: false,
>             defaultValue: 0,
>             comment: '哪个用户下的订单',
>             references: { //关联关系
>                 model: 'liveuser', //关联的表
>                 key: 'id' //关联表的主键
>             },
>             onDelete: 'cascade', //删除时操作
>             onUpdate: 'restrict', // 更新时操作
>         },
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
>     // 模型关联关系
>     Liveorder.associate = function (models) {
>         // 关联用户 反向一对多(用户对于订单是一个用户可以有多个订单，反过来订单属于用户belongsTo，就是反向一对多)
>         Liveorder.belongsTo(app.model.Liveuser);
>     }
> 
>     return Liveorder;
> }
> ```
说明：关于模型关联关系：<br/>
1. 搜索 `egg.js重要知识详细文档`，找到 `关联操作` 栏目 <br/>
2. 大家先用常识去理解这个一对多、反向一对多，多对多的这种关系，后面我们通过代码和sql数据让大家深入理解。

## 四、创建直播功能中的订单表 liveorder 的控制器、完成后台功能中订单列表功能
> 创建控制器 `app/controller/admin/liveorder.js` 完成功能
> ```js
> 'use strict';
> 
> const Controller = require('egg').Controller;
> 
> class LiveorderController extends Controller {
>     //创建直播功能中的订单列表页面
>     async index() {
>         const { ctx, app } = this;
>         //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
>         let data = await ctx.page('Liveorder',{},{
>             // 关联查询
>             include:[
>                 {
>                     model:app.model.Liveuser, // 需要查询的模型
>                     attributes:['id','username','avatar'], // 查询的字段
>                 },
>             ],
>         });
>         data = JSON.parse(JSON.stringify(data));
>         console.log(data);
>         // return;
>         //渲染公共模版
>         await ctx.renderTemplate({
>             title: '直播功能中的订单列表',//现在网页title,面包屑导航title,页面标题
>             data,
>             tempType: 'table', //模板类型：table表格模板 ，form表单模板
>             table: {
>                 //表格上方按钮,没有不要填buttons
>                 // buttons: [
>                 //     {
>                 //         url: '/admin/liveorder/create',//新增路径
>                 //         desc: '新增直播功能中的订单',//新增 //按钮名称
>                 //         // icon: 'fa fa-plus fa-lg',//按钮图标
>                 //     }
>                 // ],
>                 //表头
>                 columns: [
>                     {
>                         title: 'ID',
>                         key: 'id',
>                         class: 'text-center',//可选
>                     },
>                     {
>                         title: '订单号',
>                         key: 'no',
>                         class: 'text-center',//可选
>                     },
>                     {
>                         title: '哪个用户买的',
>                         // key: 'username',
>                         render(item) {
>                             return `
>             <h2 class="table-avatar">
>               <a href="#" class="avatar avatar-sm mr-2">
>                   <img
>                       class="avatar-img rounded-circle"
>                       src="${item.liveuser.avatar}"
>                       alt="User Image"></a>
>                   <a href="#"> ${item.liveuser.username}
>                   <span>id:${item.liveuser.id}</span></a>
>             </h2>
>            `;
>                         },
>                     },
>                     {
>                         title: '价格金币',
>                         key: 'price',
>                         class: 'text-center',//可选
>                     },
>                     {
>                         title: '订单状态',
>                         class: 'text-center',//可选
>                         // key: 'status',
>                         render(item) {
>                             const o = {
>                                 pending:{
>                                     text:'待支付',
>                                     color:'warning'
>                                 },
>                                 success:{
>                                     text:'支付成功',
>                                     color:'success'
>                                 },
>                                 fail:{
>                                     text:'支付失败',
>                                     color:'danger'
>                                 },
>                             }
>                             let v = o[item.status];
>                             return `<span class="badge badge-${v.color}">${v.text}</span>`;
>                         }
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
>                             // edit: function (id) {
>                             //     return `/admin/liveorder/edit/${id}`;
>                             // },
>                             //删除
>                             delete: function (id) {
>                                 return `/admin/liveorder/delete/${id}`;
>                             }
>                         }
>                     },
>                 ],
>             },
>         });
>     }
> }
> 
> module.exports = LiveorderController;
> 
> ```
> bootstrap4菜鸟教程  <a href="https://www.runoob.com/bootstrap4/bootstrap4-badges.html" target="_blank">bootstrap4菜鸟教程徽章</a> <br/>
