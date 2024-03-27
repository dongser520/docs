---
navbar: true
sidebar: auto
title: 直播功能中的直播间表live
---

## 一、创建数据库直播功能中的直播间表 live
> 分析：一般大家在抖音看直播的时候，最起码直播间有：主播是谁（谁在直播）（liveuser_id）、直播间名称（title）、直播间封面（cover）、总共多少人在看（look_count）、刷了多少礼物金币（coin）、直播间的唯一标识（key）和sign签名、主要是直播间推流拉流的时候用的（我们下个季度讲直播的时候会细讲）、直播间的状态（status 0未开播 1直播中 2暂停直播 3直播结束），当然这是最简单的订单组成，我们先写这么多字段，后面随着业务扩展在扩充字段。<br/><br/>
> 直播功能中的直播间表 live 基本表字段设计
> 
| 字段名                 |  数据类型   | 描述                              |   空     |         默认值                       | <p style="width:100px;">字段含义 </p>     |
| :---:                 | :---:       | :---:                            | :---:    |         :---:                           |        :---:                           |
| <b>id </b>            | <span>int(20) </span>     | <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>      |   否      |         <span style="font-size:12px">无  </span>                             |                                        |
| <b>liveuser_id </b>      | int(20) |                                  |    否    |      0                                    |   主播是谁（谁在直播）--主播id              |
| <b>title </b>     | varchar(100) |                                  |    否    |                                          |   直播间名称             |
| <b>cover </b>     | varchar(255) |                                  |    否    |                                          |   直播间封面             |
| <b>look_count </b>     | int(11) |                                  |    否    |       0                                   |   总观看人数             |
| <b>coin </b>     | int(11) |                                  |    否    |       0                                   |   刷礼物得到的总金币            |
| <b>key </b>     | varchar(255) |                                  |    否    |                                          |   直播间唯一标识            |
| <b>sign </b>     | varchar(255) |                                  |    否    |                                          |   直播间sign签名           |
| <b>status </b>     | int(1) |                                  |    否    |            0   |   直播间状态 0未开播 1直播中 2暂停直播 3直播结束 等等状态          |
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
>> npx sequelize migration:generate --name=init-live
>> ```
>> 创建迁移文件：
>> ```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up(queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = Sequelize;
>>     // 创建表 --- 类似我们sql语句定义表结构
>>     await queryInterface.createTable('live', {
>>       id: {
>>         type: INTEGER(20).UNSIGNED,
>>         primaryKey: true,
>>         autoIncrement: true,
>>         comment: '直播间主键id'
>>       },
>>       liveuser_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '主播id',
>>         references: { //关联关系
>>           model: 'liveuser', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>>       title: {
>>         type: STRING(100),
>>         allowNull: false,
>>         defaultValue: '',
>>         comment: '直播间名称'
>>       },
>>       cover: {
>>         type: STRING,
>>         allowNull: false,
>>         defaultValue: '',
>>         comment: '直播间封面'
>>       },
>>       look_count: {
>>         type: INTEGER,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '总观看人数'
>>       },
>>       coin: {
>>         type: INTEGER,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '总金币'
>>       },
>>       key: {
>>         type: STRING,
>>         allowNull: false,
>>         defaultValue: '',
>>         comment: '唯一标识',
>>       },
>>       sign: {
>>         type: STRING,
>>         allowNull: false,
>>         defaultValue: '',
>>         comment: 'sign签名',
>>       },
>>       status: {
>>         type: INTEGER(1),
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '直播间状态 0未开播 1直播中 2暂停直播 3直播结束'
>>       },
>>       create_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
>>       update_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
>>     });
>>   },
>> 
>>   async down(queryInterface, Sequelize) {
>>     await queryInterface.dropTable('live')
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

## 三、创建直播功能中的直播间表 live 的模型
> 模型文件主要是用于处理数据库表的增删改查等操作 `app/model/live.js`
```js
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const Live = app.model.define('live', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '直播间主键id'
        },
        liveuser_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '主播id',
            references: { //关联关系
                model: 'liveuser', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        title: {
            type: STRING(100),
            allowNull: false,
            defaultValue: '',
            comment: '直播间名称'
        },
        cover: {
            type: STRING,
            allowNull: false,
            defaultValue: '',
            comment: '直播间封面'
        },
        look_count: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '总观看人数'
        },
        coin: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '总金币'
        },
        key: {
            type: STRING,
            allowNull: false,
            defaultValue: '',
            comment: '唯一标识',
        },
        sign: {
            type: STRING,
            allowNull: false,
            defaultValue: '',
            comment: 'sign签名',
        },
        status: {
            type: INTEGER(1),
            allowNull: false,
            defaultValue: 0,
            comment: '直播间状态 0未开播 1直播中 2暂停直播 3直播结束'
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

    // 模型关联关系
    Live.associate = function (models) {
        // 关联主播用户 反向一对多(用户对于直播间是：一个用户可以开多次直播，反过来直播属于用户belongsTo，就是反向一对多)
        Live.belongsTo(app.model.Liveuser);
    }

    return Live;
}
```
说明：关于模型关联关系：<br/>
1. 搜索 `egg.js重要知识详细文档`，找到 `关联操作` 栏目 <br/>
2. 大家先用常识去理解这个一对多、反向一对多，多对多的这种关系，后面我们通过代码和sql数据让大家深入理解。

## 四、创建直播功能中的直播间表 live 的控制器、完成后台功能中直播间列表功能
> 创建控制器 `app/controller/admin/live.js` 完成功能
> ### 初步直播间列表功能
```js
'use strict';

const Controller = require('egg').Controller;

class LiveController extends Controller {
    //创建直播功能中的直播间列表页面
    async index() {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        let data = await ctx.page('Live', {}, {
            // 关联查询
            include: [
                {
                    model: app.model.Liveuser,// 需要查询的模型
                    attributes: ['id', 'username', 'avatar'],// 查询的字段 
                }
            ],
        });
        data = JSON.parse(JSON.stringify(data));
        // console.log(data);
        //渲染公共模版
        await ctx.renderTemplate({
            title: '直播功能中的直播间列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                // buttons: [
                //     {
                //         url: '/admin/liveorder/create',//新增路径
                //         desc: '新增直播功能中的直播间',//新增 //按钮名称
                //         // icon: 'fa fa-plus fa-lg',//按钮图标
                //     }
                // ],
                //表头
                columns: [
                    {
                        title: '直播间',
                        // key: 'username',
                        render(item) {
                            return `
        <h2 class="table-avatar">
          <a href="#" class="avatar avatar-sm mr-2">
              <img
                  class="avatar-img rounded-circle"
                  src="${item.cover}"
                  alt="User Image"></a>
              <a href="#"> ${item.title}
              <span>主播账号:${item.liveuser.username}</span></a>
        </h2>
       `;
                        },
                    },
                    {
                        title: '观看人数',
                        key: 'look_count',
                        class: 'text-center',//可选
                    },
                    {
                        title: '直播间获取礼物金币数',
                        key: 'coin',
                        class: 'text-center',//可选
                    },
                    {
                        title: '创建时间',
                        key: 'create_time',
                        width: 200,//可选
                        class: 'text-center',//可选
                    },
                    {
                        title: '操作',
                        class: 'text-right',//可选
                        action: {
                            //修改
                            // edit: function (id) {
                            //     return `/admin/live/edit/${id}`;
                            // },
                            //删除
                            delete: function (id) {
                                return `/admin/live/delete/${id}`;
                            }
                        }
                    },
                ],
            },
        });
    }
}

module.exports = LiveController;

```

## 五、对直播间列表进行分状态列表展示
> 控制器 `app/controller/admin/live.js` 完整代码
```js
'use strict';

const Controller = require('egg').Controller;

class LiveController extends Controller {
    //创建直播功能中的直播间列表页面
    async index() {
        const { ctx, app } = this;

        // 分状态展示
        let tabs = [
            { name: '全部', url: '/admin/live/index',active:false},
            { name: '直播中', url: '?status=1',active:false,status:1},
            { name: '暂停直播', url: '?status=2',active:false,status:2},
            { name: '未开播', url: '?status=0',active:false,status:0},
            { name: '已结束', url: '?status=3',active:false,status:3},
        ];
        // 获取栏目选中状态
        // console.log('网址获取状态', ctx.query.status);
        tabs = tabs.map(item=>{
            // console.log('遍历', item.status);
            if((item.status == ctx.query.status) ||
            (!ctx.query.status && ctx.query.status != 0 && item.url == '/admin/live/index')){
                item.active = true;
            }
            return item;
        });
        // console.log(tabs);



        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)

        // 给分页加上where条件：全部 就是读取所有直播间数据 即为{} 否则加上status给查询条件
        let where = (!ctx.query.status && ctx.query.status != 0) ? {} : { status: ctx.query.status };
        
        let data = await ctx.page('Live', where, {
            // 关联查询
            include: [
                {
                    model: app.model.Liveuser,// 需要查询的模型
                    attributes: ['id', 'username', 'avatar'],// 查询的字段 
                }
            ],
        });
        data = JSON.parse(JSON.stringify(data));
        // console.log(data);


        //渲染公共模版
        await ctx.renderTemplate({
            title: '直播功能中的直播间列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                tabs,//分状态展示
                //表格上方按钮,没有不要填buttons
                // buttons: [
                //     {
                //         url: '/admin/liveorder/create',//新增路径
                //         desc: '新增直播功能中的直播间',//新增 //按钮名称
                //         // icon: 'fa fa-plus fa-lg',//按钮图标
                //     }
                // ],
                //表头
                columns: [
                    {
                        title: '直播间',
                        // key: 'username',
                        render(item) {
                            return `
        <h2 class="table-avatar">
          <a href="#" class="avatar avatar-sm mr-2">
              <img
                  class="avatar-img rounded-circle"
                  src="${item.cover}"
                  alt="User Image"></a>
              <a href="#"> ${item.title}
              <span>用户账号:${item.liveuser.username}</span></a>
        </h2>
       `;
                        },
                    },
                    {
                        title: '观看人数',
                        key: 'look_count',
                        class: 'text-center',//可选
                    },
                    {
                        title: '直播间获取礼物金币数',
                        key: 'coin',
                        class: 'text-center',//可选
                    },
                    {
                        title: '创建时间',
                        key: 'create_time',
                        width: 200,//可选
                        class: 'text-center',//可选
                    },
                    {
                        title: '操作',
                        class: 'text-right',//可选
                        action: {
                            //修改
                            // edit: function (id) {
                            //     return `/admin/live/edit/${id}`;
                            // },
                            //删除
                            delete: function (id) {
                                return `/admin/live/delete/${id}`;
                            }
                        }
                    },
                ],
            },
        });
    }
}

module.exports = LiveController;

```
> 模版调整 `app/view/admin/layout/_table.html`
```html
...
<div class="card-body">

        {% if table.tabs %}
        <ul class="nav nav-tabs nav-tabs-top">
            {# <li class="nav-item"><a class="nav-link active" href="#top-tab1"
                    data-toggle="tab">全部</a></li>
            <li class="nav-item"><a class="nav-link" href="#top-tab2"
                    data-toggle="tab">直播中</a></li>
            <li class="nav-item"><a class="nav-link" href="#top-tab3"
                    data-toggle="tab">未开播</a></li>
            <li class="nav-item"><a class="nav-link" href="#top-tab4"
                    data-toggle="tab">已结束</a></li> #}
            {% for item in table.tabs %}
            <li class="nav-item">
                <a class="nav-link  {% if item.active %}active{% endif %}" href="{{item.url}}">
                   {{item.name}}
                </a>
            </li>
            {% endfor %}
        </ul>
        {% endif %}
...
```
