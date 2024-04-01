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

## 六、直播间列表操作按钮处理，并对弹出框做处理
> 控制器 `app/controller/admin/live.js` 完整代码
```javascript
'use strict';
const Controller = require('egg').Controller;
class LiveController extends Controller {
    //创建直播功能中的直播间列表页面
    async index() {
        ...
        //渲染公共模版
        await ctx.renderTemplate({
            ...
                //表头
                columns: [
                    ...
                    {
                        title: '操作',
                        class: 'text-right',//可选
                        // action: {
                        //     //修改
                        //     // edit: function (id) {
                        //     //     return `/admin/live/edit/${id}`;
                        //     // },
                        //     //删除
                        //     delete: function (id) {
                        //         return `/admin/live/delete/${id}`;
                        //     }
                        // },
                        render(item) {
                            return `
                            <div class="btn-group btn-group-sm">
                                <button class="btn btn-primary" @click="openInfo('/admin/live/look/${item.id}','观看记录')">观看记录</button>
                                <button class="btn btn-success" >礼物记录</button>
                                <button class="btn btn-info" >弹幕记录</button>
                                <button class="btn btn-warning" >关闭直播</button>
                                <button class="btn btn-danger">删除</button>
                            </div>
                            `;
                        }
                    },
                ],
            ...
        });
    }
}

module.exports = LiveController;

```
> 表格模版 `app/view/admin/layout/_table.html`
```html
...
<script>
    Vueapp = new Vue({
        el:'#vueapp',
        methods:{
            ...
            //弹出框
            openInfo(url,title){
                Vueapp.$refs.confirm.show({
                    title:title,
                    isconfirm:false,
                    ths:[ //表头数据
                        {fieldname:'username', title:'用户名'},
                        {fieldname:'create_time',title:'观看时间'},
                    ],
                    data:[//数据
                        {username:'王菲',create_time:'2019-01-01'},
                        {username:'张杰',create_time:'2019-01-02'},
                    ],
                });
            },
        }
    });
</script>
```

> 弹出组件 `app/public/admin/assets/js/vue.component.js`
```javascript
...
//弹出确认框组件
Vue.component('confirm', {
  template:  `
  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        ...
        <div class="modal-body" v-if="isconfirm">
          {{ content }}
        </div>
        <div class="modal-body" v-else>
          <table class="table table-striped">
              <thead>
                <tr>
                  <th v-for="(item,index) in ths" :key="index">{{item.title}}</th>
                </tr>
              </thead>
              <tbody> 
                <tr v-for="(item,index) in data" :key="index"> 
                  <td v-for="(k,ki) in ths" :key="ki">{{item[k.fieldname]}}</td>
                </tr>
              </tbody>
          </table>
        </div>
        <div class="modal-footer" v-if="isconfirm">
          ...
        </div>
      </div>
    </div>
  </div>
  `,
  data(){
      return {
         ...
         isconfirm:true,//是否显示隐藏 确认取消按钮
        //  ths:[ //表头数据
        //     {fieldname:'username', title:'用户名'},
        //     {fieldname:'create_time',title:'观看时间'},
        //  ],
        //  data:[//数据
        //    {username:'王菲',create_time:'2019-01-01'},
        //    {username:'张杰',create_time:'2019-01-02'},
        //  ],
         ths:[],
         data:[]
      }
  },
  methods:{
      show(options){
          ...
          this.isconfirm = options.isconfirm === false ? false : true;
          this.ths = options.ths || [];
          this.data = options.data || [];
          ...
      },
      ...
  }
});
```

## 关联模型升级：多模型关联
## 七、直播间观看记录表 live_liveuser
>### ① 分析直播间观看记录表字段
> 说明：直播间观看记录最好还是用一张表来记录，当用户进入直播间，就给这个直播间总的观看数+1，并把用户进入的痕迹记录在观看记录表当中，目的是：一个用户保证进入直播间只记录一次，可以防止直播间刷人气的情况。<br/><br/>
> 分析：既然要记录直播间观看记录，那么最起码有的字段：直播间是哪个（关联直播表live）(live_id表示)、谁进入过直播间（关联用户表liveuser）(liveuser_id表示)<br/>
><br/>
>
>| 字段名                 |  数据类型   | 描述                              |   空     |         默认值                       | <p style="width:100px;">字段含义 </p>     |
>| :---:                 | :---:       | :---:                            | :---:    |         :---:                           |        :---:                           |
>| <b>id </b>            | <span>int(20) </span>     | <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>      |   否      |         <span style="font-size:12px">无  </span>                             |                                        |
>| <b>live_id </b>      | int(20) |                                  |    否    |      0                                    |   直播间是哪个（关联直播表live）--直播间id     |
>| <b>liveuser_id </b>      | int(20) |                                  |    否    |      0                                    |   谁进入过直播间（关联用户表liveuser）--用户id              |
>| <b> create_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据创建时间                         |
>| <b> update_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据更新时间                         |
> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`
> <br/><br/>
>### ② 创建迁移文件、执行迁移命令创建数据表 live_liveuser
> 在数据库创建数据表的方式很多，在上面定义了表字段之后，可以使用`phpmyAdmin`、`数据库插件执行sql语句创建`等等方式，但是建议大家通过：创建迁移文件、执行迁移命令创建数据表。
>> 涉及的知识点：
>> 1. 章节2：egg.js基础-五、<a href="/secondless/w-c/Egg.js.html#五、eggjs项目中sequelize模型创建mysql数据库" target="_blank">eggjs项目中sequelize模型创建mysql数据库</a>
>>
>> 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=init-live_liveuser
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
>>     await queryInterface.createTable('live_liveuser', {
>>       id: {
>>         type: INTEGER(20).UNSIGNED,
>>         primaryKey: true,
>>         autoIncrement: true,
>>         comment: '直播间观看记录表主键id'
>>       },
>>       live_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '直播间是哪个--直播间id',
>>         references: { //关联关系
>>           model: 'live', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>>       liveuser_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '谁进入过直播间--用户id',
>>         references: { //关联关系
>>           model: 'liveuser', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>>       
>>       create_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
>>       update_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
>>     });
>>   },
>> 
>>   async down(queryInterface, Sequelize) {
>>     await queryInterface.dropTable('live_liveuser')
>>   }
>> };
>> 
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
> <br/><br/>
> ### ③ 创建直播功能中的 直播间观看记录表 live_liveuser 的模型
> 模型文件主要是用于处理数据库表的增删改查等操作 `app/model/live_liveuser.js`
```javascript
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const LiveLiveuser = app.model.define('live_liveuser', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '直播间观看记录表主键id'
        },
        //直播间是哪个--直播间id
        live_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '直播间是哪个--直播间id',
            references: { //关联关系
                model: 'live', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        //谁进入过直播间--用户id
        liveuser_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '谁进入过直播间--用户id',
            references: { //关联关系
                model: 'liveuser', //关联的表
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

    // 模型关联关系
    LiveLiveuser.associate = function (models) {
        // 关联直播间 反向一对多(一个直播间可以有很多观看记录，直播间对于观看记录是一对多的关系，反过来观看记录属于直播间belongsTo，就是反向一对多)
        LiveLiveuser.belongsTo(app.model.Live);
        // 关联用户 反向一对多(一个用户可以对应多个直播间观看记录，因为他可以进入多个直播间观看，用户对于观看记录就是一对多的关系，反过来观看记录属于用户belongsTo，就是反向一对多)
        LiveLiveuser.belongsTo(app.model.Liveuser);
    }

    return LiveLiveuser;
}
```

> ### ④ 创建直播间观看记录的控制器，获取观看记录数据
> `app/controller/admin/live_liveuser.js`
```javascript
'use strict';

const Controller = require('egg').Controller;

class Live_liveuserController extends Controller {
    
    //获取观看记录
    async look(){
        const {ctx,app} = this;
        //通过直播间id查看观看记录
        const id = ctx.params.id;
        console.log('直播间id',id);

        let res = await app.model.LiveLiveuser.findAll({
            where:{
                live_id:id,//哪个直播间的记录
            },
            //关联用户表
            include:[
                {
                    model:app.model.Liveuser,
                    attributes:['id','username','avatar']
                }
            ]
        });
        console.log('获取观看记录', JSON.parse(JSON.stringify(res)));
        ctx.apiSuccess({
            ths:[ //表头数据
                    {fieldname:'username', title:'用户名'},
                    {fieldname:'create_time',title:'观看时间'},
            ],
            data:res.map(item=>{
                return {
                    username:item.liveuser.username,
                    create_time:item.create_time
                }
            }),
        });

    }
}

module.exports = Live_liveuserController;

```
> ### ⑤ 注意路由控制器写法
```js
// 路由 `app/router/admin/admin.js`
// 控制器： `app/controller/admin/live_liveuser.js` live_liveuser.js 此时改成驼峰式：liveLiveuser
//直播间观看记录
router.get('/admin/live_liveuser/look/:id', controller.admin.liveLiveuser.look);
```

> ### ⑥ ajax请求获取的观看记录数据放到模版里面在弹出层展示数据
> `app/view/admin/layout/_table.html`
```html
...
<script>
    Vueapp = new Vue({
        el:'#vueapp',
        methods:{
            ...
            //弹出框数据
            openInfo(url,title){
                // console.log(url);
                $.ajax({
                    type: 'get', 
                    url: url + "?_csrf={{ctx.csrf|safe}}",
                    contentType:'application/json;charset=UTF-8;',
                    success: function (response, stutas, xhr) {
                        // console.log(response)
                        Vueapp.$refs.confirm.show({
                            title:title,
                            isconfirm:false,
                            ...response.data
                        }); 
                    },
                    error:function(e){
                        console.log(e)
                        Vueapp.$refs.toast.show({
                            msg:e.responseJSON.data,
                            type:'danger',
                            delay:3000
                        });
                    }
                });


                // Vueapp.$refs.confirm.show({
                //     title:title,
                //     isconfirm:false,
                //     ths:[ //表头数据
                //             {fieldname:'username', title:'用户名'},
                //             {fieldname:'create_time',title:'观看时间'},
                //     ],
                //     data:[//数据
                //         {username:'王菲',create_time:'2019-01-01'},
                //         {username:'张杰',create_time:'2019-01-02'},
                //     ],
                // });    
            },
        }
    });
</script>
```

## 八、直播间刷礼物记录表 live_livegift
>### ① 分析直播间刷礼物记录表字段
> 分析：既然要记录直播间刷的礼物，那么最起码有的字段：直播间是哪个（关联直播表live）(live_id表示)、哪个用户刷的（关联用户表liveuser）(liveuser_id表示)、刷的什么礼物（关联礼物表livegift）(livegift_id表示)<br/>
><br/>
>| 字段名                 |  数据类型   | 描述                              |   空     |         默认值                       | <p style="width:100px;">字段含义 </p>     |
>| :---:                 | :---:       | :---:                            | :---:    |         :---:                           |        :---:                           |
>| <b>id </b>            | <span>int(20) </span>     | <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>      |   否      |         <span style="font-size:12px">无  </span>                             |                                        |
>| <b>live_id </b>      | int(20) |                                  |    否    |      0                                    |   直播间是哪个（关联直播表live）--直播间id     |
>| <b>liveuser_id </b>      | int(20) |                                  |    否    |      0                                    |   哪个用户刷的（关联用户表liveuser）--用户id              |
>| <b>livegift_id </b>      | int(20) |                                  |    否    |      0                                    |   刷的什么礼物（关联礼物表livegift）--礼物id     |
>| <b> create_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据创建时间                         |
>| <b> update_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据更新时间                         |
> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`
> <br/><br/>
>### ② 创建迁移文件、执行迁移命令创建数据表 live_livegift
> 在数据库创建数据表的方式很多，在上面定义了表字段之后，可以使用`phpmyAdmin`、`数据库插件执行sql语句创建`等等方式，但是建议大家通过：创建迁移文件、执行迁移命令创建数据表。
>> 涉及的知识点：
>> 1. 章节2：egg.js基础-五、<a href="/secondless/w-c/Egg.js.html#五、eggjs项目中sequelize模型创建mysql数据库" target="_blank">eggjs项目中sequelize模型创建mysql数据库</a>
>>
>> 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=init-live_livegift
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
>>     await queryInterface.createTable('live_livegift', {
>>       id: {
>>         type: INTEGER(20).UNSIGNED,
>>         primaryKey: true,
>>         autoIncrement: true,
>>         comment: '直播间刷礼物记录表主键id'
>>       },
>>       //直播间是哪个（关联直播表live）--直播间id
>>       live_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '直播间是哪个--直播间id',
>>         references: { //关联关系
>>           model: 'live', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>>       //哪个用户刷的（关联用户表liveuser）--用户id
>>       liveuser_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '谁进入过直播间--用户id',
>>         references: { //关联关系
>>           model: 'liveuser', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>>       //刷的什么礼物（关联礼物表livegift）--礼物id
>>       livegift_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '刷的什么礼物--礼物id',
>>         references: { //关联关系
>>           model: 'livegift', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>> 
>>       create_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
>>       update_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
>>     });
>>   },
>> 
>>   async down(queryInterface, Sequelize) {
>>     await queryInterface.dropTable('live_livegift')
>>   }
>> };
>> 
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
> <br/><br/>
> ### ③ 创建直播功能中的 刷礼物记录表 live_livegift 的模型
> 模型文件主要是用于处理数据库表的增删改查等操作 `app/model/live_livegift.js`
```js
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const LiveLivegift = app.model.define('live_livegift', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '直播间刷礼物记录表主键id'
        },
        //直播间是哪个（关联直播表live）--直播间id
        live_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '直播间是哪个--直播间id',
            references: { //关联关系
                model: 'live', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        //哪个用户刷的（关联用户表liveuser）--用户id
        liveuser_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '谁进入过直播间--用户id',
            references: { //关联关系
                model: 'liveuser', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        //刷的什么礼物（关联礼物表livegift）--礼物id
        livegift_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '刷的什么礼物--礼物id',
            references: { //关联关系
                model: 'livegift', //关联的表
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

    // 模型关联关系
    LiveLivegift.associate = function (models) {
        // 关联直播间 反向一对多(一个直播间可以有很多礼物记录，直播间对于礼物记录是一对多的关系，反过来礼物记录属于直播间belongsTo，就是反向一对多)
        LiveLivegift.belongsTo(app.model.Live);
        // 关联用户 反向一对多(一个用户可以对应多个直播间礼物记录，因为他可以进入多个直播间刷礼物，用户对于礼物记录就是一对多的关系，反过来礼物记录属于用户belongsTo，就是反向一对多)
        LiveLivegift.belongsTo(app.model.Liveuser);
        // 关联礼物 反向一对多(刷的什么礼物，一个礼物可以在多个直播间进行刷，因为不同的直播间都可以刷飞机大炮，礼物对于礼物记录就是一对多的关系，反过来礼物记录属于礼物belongsTo，就是反向一对多)
        LiveLivegift.belongsTo(app.model.Livegift);
    }

    return LiveLivegift;
}
```

> ### ④ 创建直播间刷礼物记录的控制器（此处我们直接写在直播间控制器里面，就不额外创建控制器了），获取刷礼物记录数据
> `app/controller/admin/live.js`
```javascript
//获取直播间刷礼物的记录
    async gifts() {
        const { ctx,app } = this;
        //通过直播间id查看观看记录
        const id = ctx.params.id;

        let res = await app.model.LiveLivegift.findAll({
            where:{
                live_id:id
            },
            include:[
                {
                    model:app.model.Liveuser,//关联用户表
                    attributes:['id','username','avatar']
                },
                {
                    model:app.model.Livegift,//关联礼物表，拿礼物的具体信息
                }
            ]
        });
        console.log('获取刷礼物记录', JSON.parse(JSON.stringify(res)));

        ctx.apiSuccess({
            ths:[ //表头数据
                {fieldname:'gift_name', title:'礼物名称'},
                {fieldname:'image', title:'礼物图标',type:'image'},
                {fieldname:'coin',title:'礼物价值多少金币'},
                {fieldname:'username',title:'谁刷的'},
                {fieldname:'create_time',title:'刷的时间'},
            ],
            //数据
            data: res.map(item=>{
                return {
                    gift_name:item.livegift.name,
                    image:item.livegift.image,
                    coin:item.livegift.coin,
                    username:item.liveuser.username,
                    create_time:item.create_time,
                    // create_time:app.formatTime(item.create_time),
                }
            }),
        });
    }
```
> ### ⑤ 注意路由控制器写法
```js
// 路由 `app/router/admin/admin.js`
//获取直播间刷礼物的记录
router.get('/admin/live-/gifts/:id', controller.admin.live.gifts);
```

> ### ⑥ 显示弹出框列表里面的图片
> 弹出组件 `app/public/admin/assets/js/vue.component.js`
```js
//弹出确认框组件
Vue.component('confirm', {
  template: `
    ...
    <tr v-for="(item,index) in data" :key="index">
        <td v-for="(k,ki) in ths" :key="ki">
        <img v-if="k.type=='image'" :src="item[k.fieldname]" width="50" height="50">
        <span v-else>{{item[k.fieldname]}}</span>
        </td>
    </tr>
    ...  
              
  `,
  data() {
    ...    
```

## 九、查看直播间弹幕（评论）livecomment 表
>### ① 分析直播间弹幕（评论）livecomment 表字段
> 分析：直播间弹幕评论基本和我们上面的刷礼物类似，最基本的字段：直播间是哪个（关联直播表live）(live_id表示)、哪个用户评论发的弹幕（关联用户表liveuser）(liveuser_id表示)、弹幕（评论）内容 (content表示)<br/>
><br/>
>| 字段名                 |  数据类型   | 描述                              |   空     |         默认值                       | <p style="width:100px;">字段含义 </p>     |
>| :---:                 | :---:       | :---:                            | :---:    |         :---:                           |        :---:                           |
>| <b>id </b>            | <span>int(20) </span>     | <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>      |   否      |         <span style="font-size:12px">无  </span>                             |                                        |
>| <b>live_id </b>      | int(20) |                                  |    否    |      0                                    |   直播间是哪个（关联直播表live）--直播间id     |
>| <b>liveuser_id </b>      | int(20) |                                  |    否    |      0                                    |   哪个用户发的弹幕（关联用户表liveuser）--用户id              |
>| <b>content </b>      | text |                                  |    否    |                                         |   弹幕（评论）内容     |
>| <b> create_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据创建时间                         |
>| <b> update_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据更新时间                         |
> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`
> <br/><br/>
>### ② 创建迁移文件、执行迁移命令创建数据表 livecomment
> 在数据库创建数据表的方式很多，在上面定义了表字段之后，可以使用`phpmyAdmin`、`数据库插件执行sql语句创建`等等方式，但是建议大家通过：创建迁移文件、执行迁移命令创建数据表。
>> 涉及的知识点：
>> 1. 章节2：egg.js基础-五、<a href="/secondless/w-c/Egg.js.html#五、eggjs项目中sequelize模型创建mysql数据库" target="_blank">eggjs项目中sequelize模型创建mysql数据库</a>
>>
>> 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=init-livecomment
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
>>     await queryInterface.createTable('livecomment', {
>>       id: {
>>         type: INTEGER(20).UNSIGNED,
>>         primaryKey: true,
>>         autoIncrement: true,
>>         comment: '直播间弹幕（评论）表主键id'
>>       },
>>       //直播间是哪个（关联直播表live）--直播间id
>>       live_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '直播间是哪个--直播间id',
>>         references: { //关联关系
>>           model: 'live', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>>       //哪个用户评论的（关联用户表liveuser）--用户id
>>       liveuser_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '哪个用户评论的--用户id',
>>         references: { //关联关系
>>           model: 'liveuser', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>>       // 弹幕（评论）内容
>>       content: {
>>         type: TEXT,
>>         allowNull: false,
>>         defaultValue: '',
>>         comment: '弹幕（评论）内容'
>>       },
>>       create_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
>>       update_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
>>     });
>>   },
>> 
>>   async down(queryInterface, Sequelize) {
>>     await queryInterface.dropTable('livecomment')
>>   }
>> };
>> 
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
> <br/><br/>
> ### ③ 创建直播功能中的 弹幕（评论）表 livecomment 的模型
> 模型文件主要是用于处理数据库表的增删改查等操作 `app/model/livecomment.js`
```js
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const Livecomment = app.model.define('livecomment', {

        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '直播间弹幕（评论）表主键id'
        },
        //直播间是哪个（关联直播表live）--直播间id
        live_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '直播间是哪个--直播间id',
            references: { //关联关系
                model: 'live', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        //哪个用户评论的（关联用户表liveuser）--用户id
        liveuser_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '哪个用户评论的--用户id',
            references: { //关联关系
                model: 'liveuser', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        // 弹幕（评论）内容
        content: {
            type: TEXT,
            allowNull: false,
            defaultValue: '',
            comment: '弹幕（评论）内容'
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
    Livecomment.associate = function (models) {
        // 关联直播间 反向一对多(一个直播间可以有很多弹幕评论，直播间对于弹幕评论是一对多的关系，反过来弹幕评论属于直播间belongsTo，就是反向一对多)
        Livecomment.belongsTo(app.model.Live);
        // 关联用户 反向一对多(一个用户可以发很多弹幕评论，用户对于弹幕评论就是一对多的关系，反过来弹幕评论属于用户belongsTo，就是反向一对多)
        Livecomment.belongsTo(app.model.Liveuser);
        
    }

    return Livecomment;
}
```

> ### ④ 创建直播间弹幕（评论）表的控制器（此处我们直接写在直播间控制器里面，就不额外创建控制器了），获取弹幕（评论）数据
> `app/controller/admin/live.js`
```javascript
//获取直播间弹幕（评论）数据
    async comments() {
        const { ctx,app } = this;
        //通过直播间id查看观看记录
        const id = ctx.params.id;

        let res = await app.model.Livecomment.findAll({
            where:{
                live_id:id
            },
            include:[
                {
                    model:app.model.Liveuser,//关联用户表
                    attributes:['id','username','avatar']
                }
            ]
        });
        console.log('弹幕（评论）数据', JSON.parse(JSON.stringify(res)));

        ctx.apiSuccess({
            ths:[ //表头数据
                {fieldname:'username',title:'谁评论的'},
                {fieldname:'avatar',title:'用户头像', type:'image'},
                {fieldname:'content',title:'弹幕（评论）内容'},
                {fieldname:'create_time',title:'什么时候评论的'},
                
            ],
            //数据
            data: res.map(item=>{
                return {
                    // create_time:app.formatTime(item.create_time),
                    create_time:item.create_time,
                    content:item.content,
                    username:item.liveuser.username,
                    avatar:item.liveuser.avatar
                }
            }),
        });
    }
```
> ### ⑤ 注意路由控制器写法
```js
// 路由 `app/router/admin/admin.js`
//直播间弹幕（评论）信息
router.get('/admin/live-/comments/:id', controller.admin.live.comments);
```

## 十、关闭直播间和删除直播间功能完成
> `app/controller/admin/live.js`
```js
//创建直播功能中的直播间列表页面
async index() {
  ...
  {
        title: '操作',
        class: 'text-right',//可选
        render(item) {

            // 所有状态都有删除直播间的功能
            let close = `<button type="button" class="btn btn-danger" @click="del('/admin/live-/delete/${item.id}')">删除直播间</button>`;
            // 只要不是未开始的直播都应该观看记录、礼物记录、评论记录
            if(item.status != 0){
                close += `
                <button type="button" class="btn btn-primary" @click="openInfo('/admin/live_liveuser/look/${item.id}','观看记录')">观看记录</button>
                <button type="button" class="btn btn-success" @click="openInfo('/admin/live-/gifts/${item.id}','礼物记录')">礼物记录</button>
                <button type="button" class="btn btn-info" @click="openInfo('/admin/live-/comments/${item.id}','弹幕记录')">弹幕记录</button>
                `;
            }
            //正在直播的，和暂停直播的，可以关闭直播间
            if(item.status == 1 || item.status == 2){
                close += `<button type="button" class="btn btn-warning" @click="modal('/admin/live-/close/${item.id}','是否关闭该直播间？')">关闭直播间</button>`;
            }
            return `
            <div class="btn-group btn-group-sm">
                ${close}
            </div>
            `;
        }
    },
}
//关闭直播间 status=3
    async close(){
        const { ctx,app } = this;
        const id = ctx.params.id;

        let live = await app.model.Live.findOne({
            where:{
                id
            }
        })

        if(!live){
            ctx.toast('该直播间不存在', 'danger');
        }else if(live.status == 3){
            ctx.toast('该直播间已结束', 'danger');
        }else{
            live.status = 3;
            await live.save();
            ctx.toast('关闭成功', 'success');
        }
        ctx.redirect('/admin/live-/index');
    }

    //删除直播间
    async delete() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        await app.model.Live.destroy({
            where: {
                id
            }
        });
        //提示
        ctx.toast('删除直播间成功', 'success');
        //跳转
        ctx.redirect('/admin/live-/index');
    }
```
> 路由： `app/router/admin/admin.js`
```javascript
//关闭直播间
router.get('/admin/live-/close/:id', controller.admin.live.close);
//删除直播间
router.get('/admin/live-/delete/:id', controller.admin.live.delete);
```
> 模版： `app/view/admin/layout/_table.html`
```html
<script>
    Vueapp = new Vue({
        el:'#vueapp',
        methods:{
            modal(url,content){
                //调用弹出框
                Vueapp.$refs.confirm.show({
                    title:'提示',
                    content:content,
                    success:function(){
                        window.location.href=url;
                    }
                });
            },
    ...
```
