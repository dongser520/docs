---
navbar: true
sidebar: auto
title: eggjs后台 `rolecategory`、`category`、`news`表等补充功能说明
---

# 后台 `rolecategory`分类角色表（网站名称表）、`category`分类表（网站栏目表）、`news`表等补充功能说明

## 一、`rolecategory` 分类角色表（网站名称表）说明
> 这张表在前面我们讲过 <a href="/web/mysql/rolecategory.html#一、rolecategory-表字段设计" target="_blank">rolecategory表说明</a>，这里在回顾一下 <br/><br/>
> 我们当时说的是在`category`表创建一个外键字段`rolecategory_id`，并写上模型关联来和`rolecategory`做关联，这种方式应该现在大家都会了。由于考虑到讲到本节课的时候，我们已经在`category`的后面创建了15张表，并且后面的表有的有数据，因此我们可以考虑针对`rolecategory`分类角色表（网站名称表）、`category`分类表（网站栏目表）两张表，我们可以做一张中间表来关联他们，这样做主要是为了给大家复习一下中间表的处理方式，纵观我们整个数据库，只有 `role`、`rule`、`role_rule`是这种处理方式，其他的都是外键关联的方式（相比于中间表要简单一些），我们这里再次带大家回顾一下中间表的处理方式。

### 1. 先创建中间表 `rolecategory_category`字段设计及迁移文件
####  ① `rolecategory_category` 表字段设计
| 字段名  |  数据类型及描述    |   空    | <p style="width:150px;">默认值 </p>  | <p style="width:100px;">字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id </b> | <span>int(20) </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |   |   主键id  |
| <b>rolecategory_id </b> | <span>int(20) </span><br/> |   否      |     0       |         角色表（网站名称表）id   |
| <b>category_id </b> | <span>int(20) </span><br/> |   否      |      0      |         分类表（网站栏目分类）id   |
| <b> create_time </b>  | datetime  |    否    |     CURRENT_TIMESTAMP	   |   数据创建时间            |
| <b> update_time </b>  | datetime  |  否    |        CURRENT_TIMESTAMP	  |   数据更新时间             |
> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`

####  ② `rolecategory_category` 表迁移文件
>> 1. 创建迁移文件命令：
>> ```js
>> npx sequelize migration:generate --name=rolecategory_category
>> ```
>> 2. 创建迁移文件 `rolecategory_category.js`，内容如下：<br/>
>> ```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up(queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = Sequelize;
>>     // 创建表 --- 类似我们sql语句定义表结构
>>     await queryInterface.createTable('rolecategory_category', {
>>       id: {
>>         type: INTEGER(20).UNSIGNED,
>>         primaryKey: true,
>>         autoIncrement: true,
>>         comment: '主键id'
>>       },
>>       rolecategory_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '角色表（网站名称表）id',
>>         references: { //关联关系
>>           model: 'rolecategory', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>>       category_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '分类表（网站栏目表）id',
>>         references: { //关联关系
>>           model: 'category', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>>       create_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
>>       update_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
>>     });
>>   },
>> 
>>   async down(queryInterface, Sequelize) {
>>     await queryInterface.dropTable('rolecategory_category')
>>   }
>> };
>> ```
>> 3. 执行迁移文件命令生成数据库表：
>>> ```js
>>> // 创建数据库
>>> npx sequelize db:migrate
>>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>>> npx sequelize db:migrate:undo
>>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>>> npx sequelize db:migrate:undo:all
>>> ```

### 2. 中间表 `rolecategory_category` 模型 （重点查看模型关联）
`app/model/rolecategory_category.js`
```js
'use strict';
//哈希函数 
const crypto = require('node:crypto');
module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const RolecategoryCategory = app.model.define('rolecategory_category', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键id'
        },
        rolecategory_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '角色表（网站名称表）id',
            references: { //关联关系
                model: 'rolecategory', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        category_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '分类表（网站栏目表）id',
            references: { //关联关系
                model: 'category', //关联的表
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
    RolecategoryCategory.associate = function (models) {
        // 关联Rolecategory
        // RolecategoryCategory.belongsTo(app.model.Rolecategory);
        RolecategoryCategory.belongsTo(app.model.Rolecategory, { foreignKey: 'rolecategory_id' });
        // 关联Category
        // RolecategoryCategory.belongsTo(app.model.Category);
        RolecategoryCategory.belongsTo(app.model.Category, { foreignKey: 'category_id' });
    }

    return RolecategoryCategory;
}
```


### 3. `rolecategory` 分类角色表（网站名称表）模型 (重点关注模型关联)
`app/model/rolecategory.js`
```js
'use strict';
//哈希函数 
const crypto = require('node:crypto');
module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const Rolecategory = app.model.define('rolecategory', {
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
        showurl: { 
            type: STRING(255), 
            allowNull: true, 
            defaultValue: '' , 
            comment: '浏览地址'
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


    // 模型关联关系
    Rolecategory.associate = function (models) {
        // 多对多
        Rolecategory.belongsToMany(app.model.Category, {
            through: app.model.RolecategoryCategory, // 指定中间表模型
            // 中间表中关联Rolecategory的外键
            foreignKey: 'rolecategory_id',
            // 中间表中关联Category的外键
            otherKey: 'category_id'
        });
    };

    return Rolecategory;
}
```



### 4. 后台左侧栏目
字体图标查看 <https://fontawesome.dashgame.com/> <br/>
`data/root.json`
```json
[
    {"id":1,"pid":0, "name": "网站", "icon": "fa fa-chrome", "url": ""},
    {"id":2,"pid":1, "name": "主面板", "icon": "fa fa-pie-chart", "url": "/admin" },
    {"id":3,"pid":1,  "name": "管理员", "icon": "fe fe-user-plus", "url": "/admin/manager/index" },
    {"id":4,"pid":1, "name": "网站管理", "icon": "fa fa-internet-explorer", "url": "/admin/rolecategory/index" },
    {"id":5,"pid":1, "name": "网站栏目管理", "icon": "fa fa-list", "url": "/admin/category/index" },
    {"id":6,"pid":1, "name": "网站内容管理", "icon": "fa fa-file-text-o", "url": "/admin/news/index" },
    {"id":7,"pid":1, "name": "网站配置管理", "icon": "fa fa-wrench", "url": "/admin/config/index" },
    {"id":8,"pid":1,  "name": "留言板", "icon": "fe fe-document", "url": "/admin/message/index" },
    {"id":9,"pid":0, "name": "直播","icon": "fa fa-video-camera", "url": ""},
    {"id":10,"pid":9, "name": "直播用户", "icon": "fa fa-venus-mars", "url": "/admin/liveuser/index" },
    {"id":11,"pid":9, "name": "直播礼物管理", "icon": "fa fa-gift", "url": "/admin/livegift/index" },
    {"id":12,"pid":9, "name": "直播订单管理", "icon": "fa fa-credit-card", "url": "/admin/liveorder/index" },
    {"id":13,"pid":9, "name": "直播间管理", "icon": "fa fa-tv", "url": "/admin/live-/index" },
    {"id":14,"pid":0, "name": "H5-小程序-App", "icon": "fa fa-tablet", "url": "" },
    {"id":15,"pid":14, "name": "底部导航栏管理", "icon": "fa fa-sitemap", "url": "/admin/wapUTabbar/index" },
    {"id":16,"pid":14, "name": "主要分类管理", "icon": "fa fa-list", "url": "/admin/wapCategory/index" },
    {"id":17,"pid":14, "name": "移动端配置管理", "icon": "fa fa-wrench", "url": "/admin/wapConfig/index" },
    {"id":18,"pid":0, "name": "商城", "icon": "fa fa-shopping-cart", "url": "" },
    {"id":19,"pid":18, "name": "角色管理", "icon": "fa fa-users", "url": "/shop/admin/role" },
    {"id":20,"pid":18, "name": "管理员管理", "icon": "fa fa-user-circle-o", "url": "/shop/admin/shopmanager" },
    {"id":21,"pid":18, "name": "权限管理", "icon": "fa fa-legal", "url": "/shop/admin/rule" },
    {"id":22,"pid":18, "name": "图片分类管理", "icon": "fa fa-file-image-o", "url": "/shop/admin/imageclass" },
    {"id":23,"pid":18, "name": "商品分类管理", "icon": "fa fa-shopping-bag", "url": "/shop/admin/goodsclass" },
    {"id":24,"pid":18, "name": "商品规格管理", "icon": "fa fa-cubes", "url": "/shop/admin/skus" },
    {"id":25,"pid":18, "name": "商品管理", "icon": "fa fa-inbox", "url": "/shop/admin/goods-" },
    {"id":26,"pid":0, "name": "用户管理中心", "icon": "fa fa-users", "url": "" },
    {"id":27,"pid":26, "name": "普通人员管理", "icon": "fa fa-user-o", "url": "/admin/user" }
]
```


### 5. `rolecategory` 控制器
`app/controller/admin/rolecategory.js`
```js
'use strict';

const Controller = require('egg').Controller;

class RolecategoryController extends Controller {
    //创建网站界面
    async create() {
        const { ctx, app } = this;
        // 读取所有权限栏目
        // let rules = await app.model.Rule.findAll({
        //     where: {
        //         status: 1
        //     }
        // });
        let fields = [];
        // if (rules) {
        //     console.log('权限信息', JSON.parse(JSON.stringify(rules)));
        //     // rules = this.app.transformToTree(JSON.parse(JSON.stringify(rules)));
        //     rules = this.ctx.treeify(JSON.parse(JSON.stringify(rules)));
        //     fields = [
        //         {
        //             label: '分配权限',
        //             type: 'treeDataSelect',//树形结构数据选择
        //             name: 'rule_ids',
        //             default: JSON.stringify(rules),
        //         }
        //     ];
        // }

        //渲染公共模版
        await ctx.renderTemplate({
            title: '创建网站',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/admin/rolecategory",
                //  字段
                fields: [
                    {
                        label: '网站名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入网站名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '网站描述',
                        type: 'textarea',
                        name: 'desc',
                        //default: '',
                        placeholder: '网站的简单介绍，选填',
                    },
                    ...fields,
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '/admin/rolecategory',
        });
    }
    //创建网站提交数据
    async save() {
        const { ctx, app } = this;
        //一般处理流程
        //1.参数验证
        this.ctx.validate({
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '网站名称', //字段含义
                range: {
                    min: 2,
                    max: 30
                },
            },
            desc: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '网站描述',
                range: {
                    min: 0,
                    max: 255
                },
            },
            // rule_ids: {
            //     type: 'string',
            //     required: false,
            //     defValue: '',
            //     desc: '权限id集合',
            // }
        });
        //先判断一下直播功能中的是否存在，不存在在写入数据库
        //2.写入数据库
        //3.成功之后给页面反馈
        let { name, desc, 
            // rule_ids 
        } = this.ctx.request.body;
        if (await this.app.model.Rolecategory.findOne({ where: { name } })) {
            return this.ctx.apiFail('网站名称已存在');
        }
        //否则不存在则写入数据库
        const res = await this.app.model.Rolecategory.create({
            name,
            desc
        });

        /*
        // 给授权
        console.log('网站授权id集合', rule_ids);//终端输出：网站授权id集合 "4,5,6,7,8"
        if (rule_ids) {
            let id = res.id;
            rule_ids = rule_ids.split(',').map(v => parseInt(v));
            console.log('网站授权id集合数组', rule_ids); //终端输出：网站授权id集合数组 [ 4, 5, 6, 7, 8 ]
            // 授权以前，先看一下当前网站在role_rule表中有没有数据
            let rolerule = await app.model.RoleRule.findAll({
                where: {
                    role_id: id
                },
                // 主表查询字段限制
                attributes: ['rule_id'],
            });
            console.log('当前网站在role_rule表拥有的权限', JSON.parse(JSON.stringify(rolerule)));
            //终端输出：当前网站在role_rule表拥有的权限 [ { rule_id: 6 }, { rule_id: 7 } ]
            // 数据对象转换为数组，只要rule_id的值
            let has_ruleids = rolerule.map(item => item.rule_id);
            console.log('当前网站在role_rule表拥有的权限id数组', JSON.parse(JSON.stringify(has_ruleids)));
            //终端输出： 当前网站在role_rule表拥有的权限id数组 [ 6, 7 ]

            // 当前已拥有的权限id: [6,7], 当前传递过来的权限id: [4, 5, 6, 7, 8]，相当于增加 4, 5, 8
            // 还有情况，比如已经拥有[6,7], 传过来 [6] 相当于要删除7
            // 还有情况，比如已经拥有[6,7], 传过来 [6,8,10] 相当于要删除7，增加8,10

            //将权限加入到role_rule表中
            // 计算需要新增和删除的权限ID
            const needAdd = rule_ids.filter(id => !has_ruleids.includes(id));
            const needRemove = has_ruleids.filter(id => !rule_ids.includes(id));

            // 使用事务保证数据一致性：使用 Sequelize 的事务功能保证删除和新增操作的原子性
            await app.model.transaction(async t => {
                // 删除需要移除的权限
                if (needRemove.length > 0) {
                    await app.model.RoleRule.destroy({
                        where: {
                            role_id: id,
                            rule_id: needRemove, // 自动转换为 IN 查询 批量删除
                            //使用 WHERE IN 条件进行批量删除，比逐条删除更高效
                        },
                        transaction: t
                    });
                    console.log(`已删除权限ID：[${needRemove}]`);
                }
                // 添加新增的权限
                if (needAdd.length > 0) {
                    // 构造批量插入数据
                    const addData = needAdd.map(rule_id => ({
                        role_id: id,
                        rule_id
                    }));
                    //使用 bulkCreate 批量插入数据，减少数据库操作次数
                    await app.model.RoleRule.bulkCreate(addData, {
                        transaction: t
                    });
                    console.log(`已新增权限ID：[${needAdd}]`);
                }
            });
            console.log('权限更新完成');

        }
        */

        this.ctx.apiSuccess('创建网站成功');
    }
    //网站列表页面
    async index() {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        //1.参数验证
        this.ctx.validate({
            page: {
                type: 'int',
                required: false,
                desc: '页码',
                defValue: 1,
                range:{
                    min:1,
                }
            },
            limit: {
                type: 'int',
                required: false,
                desc: '每页显示数量',
                defValue: 10,
                range:{
                    min:1,
                }
            },
        });
        let data = await ctx.page('Rolecategory',{},{
            include: [
                {
                    model: app.model.Category,
                    attributes: {
                        exclude: ['create_time', 'update_time'],//除了这些字段，其他字段都显示
                    },
                },
            ],
        });
        // ctx.body = data;
        // return;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '网站列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/admin/rolecategory/create',//新增路径
                        desc: '新增网站',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    }
                ],
                //表头
                columns: [
                    {
                        title: '网站名称',
                        key: 'name',
                        class: 'text-center',//可选
                    },
                    {
                        title: '网站描述',
                        key: 'desc',
                        class: 'text-center',//可选
                    },
                    {
                        title: '网站栏目',
                        //key: '',
                        class: 'text-center',//可选
                        render(item){
                            return `
                              <a href="/admin/category/index?rolecategoryId=${item.id}">${item.categories.length}</a>
                            `;
                        }
                    },
                    {
                        title: '可用状态',
                        key: 'status',
                        width: 200,//可选
                        class: 'text-center',//可选
                        hidekeyData: true,//是否隐藏key对应的数据
                        render(item) {
                            // console.log('可用状态里面每个item', item);
                            let arr = [
                                { value: 1, name: '可用' },
                                { value: 0, name: '不可用' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.status}"
                            value="${arr[i].value}"
                            @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/admin/rolecategory','Rolecategory')">${arr[i].name}</button>`;
                            }
                            str += `</div>`;
                            return str;
                        }
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
                            edit: function (id) {
                                return `/admin/rolecategory/edit/${id}`;
                            },
                            //删除
                            delete: function (id) {
                                return `/admin/rolecategory/${id}/delete`;
                            }
                        }
                    },
                ],
            },
        });
    }
    //网站列表包含网站的权限信息API接口
    async indexlist() {
        const { ctx, app } = this;
        let limit = parseInt(ctx.query.limit) || 10;
        let role = await app.model.Rolecategory.findAll({
            where: {
                status: 1
            },
            order: [
                ['id', 'desc']
            ],
            limit,
            include: [
                {
                    model: app.model.Category, //关联
                    through: {
                        attributes: []  //不需要返回中间表的字段
                    },
                    /*
                    // 如果需要（如树形结构）category要有pid字段，可添加子关联
                    include:[
                        {
                            model:app.model.Category,
                            as:'ChildCategory',
                        }
                    ],
                    */
                }
            ],
        });
        let roleCount = await app.model.Rolecategory.count({
            where: {
                status: 1
            },
        });
        // ctx.body = roleCount;
        ctx.apiSuccess({
            list: role,
            totalCount: roleCount
        });
    }
    //修改网站界面
    async edit() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let data = await app.model.Rolecategory.findOne({
            where: {
                id
            }
        });
        if (!data) {
            return ctx.pageFail('网站不存在', 404);
        }
        // data = JSON.parse(JSON.stringify(data));
        // console.log(data);

        // 读取所有权限栏目
        // let rules = await app.model.Rule.findAll({
        //     where: {
        //         status: 1
        //     }
        // });
        let fields = [];
        // if (rules) {
        //     console.log('权限信息', JSON.parse(JSON.stringify(rules)));
        //     // rules = this.app.transformToTree(JSON.parse(JSON.stringify(rules)));
        //     rules = this.ctx.treeify(JSON.parse(JSON.stringify(rules)));
        //     fields = [
        //         {
        //             label: '分配权限',
        //             type: 'treeDataSelect',//树形结构数据选择
        //             name: 'rule_ids',
        //             default: JSON.stringify(rules),
        //         }
        //     ];
        // }


        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改网站',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: '/admin/rolecategory/' + id,
                //  字段
                fields: [
                    {
                        label: '网站名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入网站名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '网站描述',
                        type: 'textarea',
                        name: 'desc',
                        //default: '',
                        placeholder: '网站的简单介绍，选填',
                    },
                    ...fields,
                ],
                //修改内容默认值
                data,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/admin/rolecategory',
        });
    }
    //修改网站数据功能
    async update() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '网站id'
            },
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '网站名称', //字段含义
                range: {
                    min: 2,
                    max: 30
                },
            },
            desc: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '网站描述',
                range: {
                    min: 0,
                    max: 255
                },
            },
            // rule_ids: {
            //     type: 'string',
            //     required: false,
            //     defValue: '',
            //     desc: '权限id集合',
            // }
        });

        // 参数
        const id = ctx.params.id;
        let { name, desc, 
            // rule_ids 
        } = ctx.request.body;
        // 是否存在
        const role = await app.model.Rolecategory.findOne({ where: { id } });
        if (!role) {
            return ctx.pageFail('网站不存在');
        }
        //存在，网站具有唯一性，你不能修改网站的时候，修改成存在的网站
        // if (role && role.name == '超级管理员') {
        //     return ctx.apiFail('超级管理员网站不能修改');
        // }
        const Op = this.app.Sequelize.Op;//拿Op,固定写法
        if (await app.model.Rolecategory.findOne({
            where: {
                name,
                id: {
                    [Op.ne]: id
                }
            }
        })) {
            // return ctx.pageFail('该直播功能中的礼物账号已经存在，不能修改成该直播功能中的礼物账号', 404);
            return ctx.apiFail('网站已经存在，不能修改成' + name);
        }
        // 修改数据
        role.name = name;
        role.desc = desc;

        await role.save();

        /*
        // 给网站授权
        console.log('网站授权id集合', rule_ids);//终端输出：网站授权id集合 "4,5,6,7,8"
        if (rule_ids) {
            rule_ids = rule_ids.split(',').map(v => parseInt(v));
            console.log('网站授权id集合数组', rule_ids); //终端输出：网站授权id集合数组 [ 4, 5, 6, 7, 8 ]
            // 授权以前，先看一下当前网站在role_rule表中有没有数据
            let rolerule = await app.model.RoleRule.findAll({
                where: {
                    role_id: id
                },
                // 主表查询字段限制
                attributes: ['rule_id'],
            });
            console.log('当前网站在role_rule表拥有的权限', JSON.parse(JSON.stringify(rolerule)));
            //终端输出：当前网站在role_rule表拥有的权限 [ { rule_id: 6 }, { rule_id: 7 } ]
            // 数据对象转换为数组，只要rule_id的值
            let has_ruleids = rolerule.map(item => item.rule_id);
            console.log('当前网站在role_rule表拥有的权限id数组', JSON.parse(JSON.stringify(has_ruleids)));
            //终端输出： 当前网站在role_rule表拥有的权限id数组 [ 6, 7 ]

            // 当前已拥有的权限id: [6,7], 当前传递过来的权限id: [4, 5, 6, 7, 8]，相当于增加 4, 5, 8
            // 还有情况，比如已经拥有[6,7], 传过来 [6] 相当于要删除7
            // 还有情况，比如已经拥有[6,7], 传过来 [6,8,10] 相当于要删除7，增加8,10

            //将权限加入到role_rule表中
            // 计算需要新增和删除的权限ID
            const needAdd = rule_ids.filter(id => !has_ruleids.includes(id));
            const needRemove = has_ruleids.filter(id => !rule_ids.includes(id));

            // 使用事务保证数据一致性：使用 Sequelize 的事务功能保证删除和新增操作的原子性
            await app.model.transaction(async t => {
                // 删除需要移除的权限
                if (needRemove.length > 0) {
                    await app.model.RoleRule.destroy({
                        where: {
                            role_id: id,
                            rule_id: needRemove, // 自动转换为 IN 查询 批量删除
                            //使用 WHERE IN 条件进行批量删除，比逐条删除更高效
                        },
                        transaction: t
                    });
                    console.log(`已删除权限ID：[${needRemove}]`);
                }
                // 添加新增的权限
                if (needAdd.length > 0) {
                    // 构造批量插入数据
                    const addData = needAdd.map(rule_id => ({
                        role_id: id,
                        rule_id
                    }));
                    //使用 bulkCreate 批量插入数据，减少数据库操作次数
                    await app.model.RoleRule.bulkCreate(addData, {
                        transaction: t
                    });
                    console.log(`已新增权限ID：[${needAdd}]`);
                }
            });
            console.log('权限更新完成');

        }
        */

        // 给一个反馈
        ctx.apiSuccess('修改网站成功');
    }
    //修改网站状态功能
    async updateStatus() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '网站id'
            },
            status: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '网站状态', //字段含义
                range: {
                    in: [0, 1]
                },
            },
        });
        // 参数
        const id = ctx.params.id;
        const { status } = ctx.request.body;
        // 是否存在
        const role = await app.model.Rolecategory.findOne({ where: { id } });
        if (!role) {
            return ctx.apiFail('网站不存在');
        }
        // 修改数据
        role.status = status;

        await role.save();
        // 给一个反馈
        ctx.apiSuccess('修改网站状态成功');
    }
    //删除网站功能
    async delete() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        // const role = await app.model.Rolecategory.findOne({ where: { id } });
        // if (role && role.name == '超级管理员') {
        //     return ctx.apiFail('超级管理员网站不能删除');
        // }

        //要做一下提示
        // let shopmanager = await app.model.ShopManager.findAndCountAll({
        //     where: {
        //         role_id: id,
        //     }
        // });
        // console.log('管理员使用该网站',JSON.parse(JSON.stringify(shopmanager)));
        // return;
        // if (shopmanager.count > 0) {
        //     return ctx.apiFail('您删除的这个网站，有管理员在使用，请先删除这些管理员或修改这些管理员网站，在删除当前网站');
        // }

        await app.model.Rolecategory.destroy({
            where: {
                id
            }
        });
        //提示
        ctx.toast('网站删除成功', 'success');
        //跳转
        ctx.redirect('/admin/rolecategory');
    }
    //删除网站功能API接口
    async deleteAPI() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        // const role = await app.model.Role.findOne({ where: { id } });
        // if (role && role.name == '超级管理员') {
        //     return ctx.apiFail('超级管理员网站不能删除');
        // }

        //由于管理员配置了网站，删除网站，关联查询管理员缺乏网站会报错，要做一下提示
        // let shopmanager = await app.model.ShopManager.findAndCountAll({
        //     where: {
        //         role_id: id,
        //     }
        // });
        // console.log('管理员使用该网站',JSON.parse(JSON.stringify(shopmanager)));
        // return;
        // if (shopmanager.count > 0) {
        //     return ctx.apiFail('您删除的这个网站，有管理员在使用，请先删除这些管理员或修改这些管理员网站，在删除当前网站');
        // }

        await app.model.Rolecategory.destroy({
            where: {
                id
            }
        });
        ctx.apiSuccess(true);
    }
    
}

module.exports = RolecategoryController;

```



### 6. 路由
`app/router/admin/admin.js`
```js
    ...
    //关闭直播间功能
    router.get('/admin/live-/close/:id', controller.admin.live.close);


    //删除功能
    router.post('/admin/rolecategory/:id/delete', controller.admin.rolecategory.deleteAPI);
    router.get('/admin/rolecategory/:id/delete', controller.admin.rolecategory.delete);
    //修改状态功能
    router.post('/admin/rolecategory/:id/update_status',controller.admin.rolecategory.updateStatus);
    //修改界面
    router.get('/admin/rolecategory/edit/:id', controller.admin.rolecategory.edit);
    //修改数据功能
    router.post('/admin/rolecategory/:id', controller.admin.rolecategory.update);
    // 创建界面
    router.get('/admin/rolecategory/create', controller.admin.rolecategory.create);
    //创建提交数据
    router.post('/admin/rolecategory', controller.admin.rolecategory.save);
    //列表包含API接口
    // router.get('/admin/rolecategory/:page', controller.admin.rolecategory.indexlist);
    //列表页面
    router.get('/admin/rolecategory/index', controller.admin.rolecategory.index);
    router.get('/admin/rolecategory', controller.admin.rolecategory.index);
    

    // 创建分类界面
    router.get('/admin/category/create', controller.admin.category.create);
    ...
```



### 7. category 模型 （重点关注模型关联）
`app/model/category.js`
```js
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const Category = app.model.define('category', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '分类主键id'
        },
        pid: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '上一级(父级)id',
            index: true // 添加索引
        },
        name: {
            type: STRING(100),
            allowNull: false,
            defaultValue: '',
            comment: '分类名称'
        },
        enname: {
            type: STRING,
            allowNull: true,
            defaultValue: '',
            comment: '分类英文名称'
        },
        status: {
            type: INTEGER(1),
            allowNull: false,
            defaultValue: 1,
            comment: '分类状态 0不可用 1可用 等等状态'
        },
        description: {
            type: STRING,//不限定长度.默认varchar(255)
            allowNull: true,
            defaultValue: '',
            comment: '分类描述，分类简单介绍'
        },
        order: {
            type: INTEGER,//不限定长度.默认int(11)
            allowNull: true,
            defaultValue: 50,
            comment: '分类排序，默认50'
        },
        isnav: {
            type: INTEGER(1),
            allowNull: false,
            defaultValue: 1,
            comment: '该分类是否也是导航栏的栏目 0否 1是'
        },
        categoryurl: {
            type: STRING,//不限定长度.默认varchar(255)
            allowNull: true,
            defaultValue: '',
            comment: '分类链接地址'
        },
        wap_icon: {
            type: STRING(100),//不限定长度.默认varchar(255)
            allowNull: true,
            defaultValue: '',
            comment: '移动端分类图标'
        },
        wap_url: {
            type: STRING,//不限定长度.默认varchar(255)
            allowNull: true,
            defaultValue: '',
            comment: '移动端点击分类打开的页面'
        },
        wap_isnav: {
            type: INTEGER(1),
            allowNull: false,
            defaultValue: 0,
            comment: '该分类是否是移动端的主要栏目：0-否，1-是'
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
    Category.associate = function (models) {
        // 关联到自己 （通过pid关联,如果有pid字段的话）
        // this.hasMany(app.model.Category,{
        //     foreignKey: 'pid',
        //     as:'ChildCategory' // 别名（可选）
        // });

        // 多对多关联角色表Rolecategory
        Category.belongsToMany(app.model.Rolecategory,{
            through:app.model.RolecategoryCategory, // 指定中间表模型
            // 中间表中关联Category的外键
            foreignKey:'category_id',
            // 中间表中关联Rolecategory的外键
            otherKey:'rolecategory_id'
        });

        // 关联中间表RolecategoryCategory
        Category.hasMany(app.model.RolecategoryCategory,{
            foreignKey:'category_id',
        });
    }

    return Category;
}
```





### 8. 扩展新增一个通用方法
新增一个通用方法： `通用网站后台栏目列表包分页和连表查询方法` <br/>
`app/extend/context.js`
```js
//通用网站后台栏目列表包分页和连表查询方法
  async datalistIndex(modelName, where = {}, options = {}){
    //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
    // 此方法page已经写在了context.js的最上面，第一个方法
    let data = await this.page(modelName, where, options);
    // 转一下data处理
    let list = JSON.parse(JSON.stringify(data));
    console.log('list', list);
    let rules = JSON.parse(JSON.stringify(data));
    // console.log('rules', rules);

    // 数据集组合分类树(一维数组) 带level
    let $rule = [];
    function list_to_tree($array, $field = 'pid', $pid = 0, $level = 0) {
        $array.forEach(($value, $index) => {
            // console.log($value);
            if ($value[$field] == $pid) {
                $value['level'] = $level;
                $rule.push($value);
                // unset($array[$key]);
                // console.log('看一下rule',$rule);
                // $array.splice($index, 1);
                list_to_tree($array, $field, $value['id'], $level + 1);
            }
        });
        return $rule;
    }

    return {
        totalCount: data.length,
        rules: list_to_tree(rules),
        list:list,
    }
  },
```




### 9. category 控制器（重点学习index列表方法，采用的是模型关联查询，嵌套查询）
`app/controller/admin/category.js`
```js
'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
    //栏目列表页面
    async index() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            page: {
                type: 'int',
                required: false,
                desc: '页码',
                defValue: 1,
                range:{
                    min:1,
                }
            },
            limit: {
                type: 'int',
                required: false,
                desc: '每页显示数量',
                // defValue: 1000,
                range:{
                    min:1,
                }
            },
            rolecategoryId: {
                type: 'int',
                required: false,
                desc: '网站分类id',
                defValue: 0,
                range:{
                    min:1,
                }
            },
        });
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        // let data = await ctx.page('Category', {}, { 
        //     include: [
        //         {
        //             model: app.model.Rolecategory,
        //         }
        //     ]
        // });
        // data = JSON.parse(JSON.stringify(data));
        // data = ctx.treeify(data); //转树形结构此处用不上，一般用于下拉框
        
        //通用网站后台栏目列表包分页和连表查询方法
        let include_where = {};
        let rolecategoryId = ctx.query.rolecategoryId;
        // ctx.body = rolecategoryId;
        // return;
        //如果传了网站分类id
        if(rolecategoryId){
            include_where.where = {
                rolecategory_id:rolecategoryId
            };
        }

        let data = await ctx.datalistIndex('Category',{},{
            include: [
                {
                    model: app.model.Rolecategory,
                    attributes: {
                        exclude: ['create_time', 'update_time'],//除了这些字段，其他字段都显示
                    },
                },
                {
                    model: app.model.RolecategoryCategory,
                    attributes: {
                        exclude: ['create_time', 'update_time'],//除了这些字段，其他字段都显示
                    },
                    // where: {
                    //     rolecategory_id:rolecategoryId
                    // },
                    ...include_where,
                }
            ],
            attributes: {
                exclude: ['create_time', 'update_time'],//除了这些字段，其他字段都显示
            },
            order: [
                ['order', 'asc'],
                ['id', 'asc'],
            ],
        });
        data = data.rules;

        // let data = await ctx.service.category.datalist({ limit: 1000 });
        // data = data.rules;
        // console.log('栏目数据', data);
        // ctx.body = data;
        // return;
        
        //渲染公共模版
        await ctx.renderTemplate({
            title: '网站导航栏栏目列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/admin/category/create',//新增路径
                        desc: '新增栏目',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    }
                ],
                //表头
                columns: [
                    {
                        title: '网站及栏目名称',
                        key: 'name',
                        class: 'text-left',//可选
                        render(item) { //树形数据
                            // console.log('每个item',item);
                            let str = ``;
                            if (item.level) {
                                let w = item.level * 40;
                                str = `<span style="display:inline-block;width:${w}px"></span>`;
                            }
                            let rolecategory = ``;
                            if(item.rolecategories && item.rolecategories.length){
                                rolecategory = `
                                <span style="border:1px solid #ccc;padding:2px 5px;font-size:12px;color:#7C29FF;border-radius:5px;margin-right:15px;">
                                    ${item.rolecategories[0].name}
                                </span>`;
                            }
                            return `${str}${rolecategory}`;
                        }
                    },
                    {
                        title: '是否是导航栏栏目',
                        key: 'isnav',
                        width: 200,//可选
                        class: 'text-center',//可选
                        hidekeyData: true,//是否隐藏key对应的数据
                        render(item) {
                            console.log('可用状态里面每个item', item);
                            let arr = [
                                { value: 1, name: '是' },
                                { value: 0, name: '否' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.isnav}"
                                value="${arr[i].value}"
                                @click="changeBtnStatus('isnav','btn-group-${item.id}',${arr[i].value},${i},${item.id},'category','Category')">${arr[i].name}</button>`;
                            }
                            str += `</div>`;
                            return str;
                        }
                    },
                    {
                        title: '栏目链接地址',
                        key: 'categoryurl',
                        class: 'text-center',//可选
                    },
                    {
                        title: '栏目排序',
                        key: 'order',
                        class: 'text-center',//可选
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
                                { value: 1, name: '可用' },
                                { value: 0, name: '不可用' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.status}"
                                value="${arr[i].value}"
                                @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'category','Category')">${arr[i].name}</button>`;
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
                                return `/admin/category/edit/${id}`;
                            },
                            //删除
                            delete: function (id) {
                                return `/admin/category/delete/${id}`;
                            }
                        }
                    },
                ],
            },
        });
    }

    //创建栏目表单
    async create() {
        const { ctx, app } = this;

        // 为哪个网站创建栏目
        let rolecategory = await ctx.model.Rolecategory.findAll({
            where: {
                status: 1,
            },
        });
        let fields = [];
        // ctx.body = rolecategory; return;
        if(rolecategory.length){
            rolecategory = JSON.parse(JSON.stringify(rolecategory));
            // 给rolecategory数组里面每个对象加上一个pid属性值为0
            rolecategory.forEach(item => {
                item.pid = 0;
            });
            rolecategory = ctx.treeify(rolecategory);
            // ctx.body = rolecategory; return;
            fields = [
                // 如果一旦填写了网站，则就应该有选择网站这里栏目提示要选择网站
                {
                    label: '选择网站提示',
                    type: 'text', //下拉框
                    name: 'select_rolecategory_id',
                    default: 1,
                    // placeholder: '请选择网站',
                    hidekeyData: true,//隐藏这一项，但是值会提交过去
                },
                {
                    label: '放在哪个网站里面',
                    type: 'dropdown', //下拉框
                    name: 'rolecategory_id',
                    default: JSON.stringify(rolecategory),
                    placeholder: '请选择网站',
                },
            ];
        }
        

        // 渲染模版前先拿到所有栏目
        let data = await ctx.service.category.dropdown_Categorylist();
        //渲染公共模版
        await ctx.renderTemplate({
            title: '创建网站栏目表单',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/admin/category/save",
                //  字段
                fields: [
                    ...fields,
                    {
                        label: '放在哪个栏目里面',
                        type: 'dropdown', //下拉框
                        name: 'pid',
                        default: JSON.stringify(data),
                        placeholder: '',
                    },
                    {
                        label: '栏目名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入栏目名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '栏目英文名称',
                        type: 'text',
                        name: 'enname',
                        placeholder: '请输入栏目英文名称',
                    },
                    {
                        label: '栏目描述',
                        type: 'text',
                        name: 'description',
                        placeholder: '请输入栏目描述,选填',
                    },
                    {
                        label: '栏目链接地址',
                        type: 'text',
                        name: 'categoryurl',
                        placeholder: '请输入栏目链接地址,选填',
                    },
                    {
                        label: '栏目排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入栏目排序',
                        default:50,
                    },
                    {
                        label: '可用状态',
                        type: 'btncheck', //按钮组选择
                        name: 'status',
                        default: JSON.stringify([
                            { value: 1, name: '可用', checked: true },
                            { value: 0, name: '不可用' },
                        ]),
                        placeholder: '栏目状态 0不可用 1可用 等等状态',
                    },
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '/admin/category/index',
        });
    }

    //栏目表单提交数据
    async save() {
        //一般处理流程
        //1.参数验证
        this.ctx.validate({
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '栏目名称' //字段含义
            },
            enname: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '栏目英文名称'
            },
            status: {
                type: 'int',
                required: true,
                defValue: 1,
                desc: '栏目状态 0不可用 1可用 等等状态'
            },
            pid: {
                type: 'int',
                required: true,
                defValue: 0,
                desc: '上一级(父级)id'
            },
            description: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '栏目描述，栏目简单介绍'
            },
            categoryurl: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '栏目链接地址'
            },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '栏目排序'
            },
            rolecategory_id: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '网站id'
            },
            select_rolecategory_id: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '要选择一个网站提示'
            },
        });

        let { name, enname, status, pid,description,order,categoryurl,rolecategory_id,select_rolecategory_id } = this.ctx.request.body;

        // 处理中间表
        // this.ctx.body = {
        //     rolecategory_id:rolecategory_id,
        //     res: res,
        // };
        // console.log('select_rolecategory_id',select_rolecategory_id);
        // console.log('rolecategory_id',rolecategory_id);
        // console.log('res',res.id);
        // return;

        // 有rolecategory_id则写入中间表
        if(select_rolecategory_id && !rolecategory_id){
            return this.ctx.apiFail('请选择一个网站');
        }

        //先判断一下直播功能中的礼物账号是否存在，不存在在写入数据库
        //2.写入数据库
        //3.成功之后给页面反馈
        // if (await this.app.model.Category.findOne({ where: { name } })) {
        //     return this.ctx.apiFail('栏目名称已存在');
        // }
        //否则不存在则写入数据库
        const res = await this.app.model.Category.create({
            name,
            enname,
            status,
            pid,
            description,
            order,categoryurl
        });

        // 写入中间表
        if (rolecategory_id) {
            await this.app.model.RolecategoryCategory.create({
                rolecategory_id: rolecategory_id,
                category_id: res.id
            });
        }

        this.ctx.apiSuccess('创建栏目成功');
    }

    //根据id修改栏目状态
    async updateStatus() {
        const { id, status } = this.ctx.request.body;
        //1.参数验证
        this.ctx.validate({
            status: {
                type: 'int',
                required: true,
                // defValue: 1,
                desc: '栏目状态 0不可用 1可用 等等状态'
            },
            id: {
                type: 'int',
                required: true,
                // defValue: 0,
                desc: '栏目id'
            }
        });
        let data = await this.app.model.Category.findByPk(id);
        if (!data) {
            return this.ctx.apiFail('栏目数据不存在');
        }
        data.status = status;
        await data.save();
        this.ctx.apiSuccess('修改栏目状态成功');
    }

    //修改栏目界面
    async edit() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let currentdata = await app.model.Category.findOne({
            where: {
                id
            }
        });
        if (!currentdata) {
            return ctx.apiFail('该栏目不存在');
        }
        currentdata = JSON.parse(JSON.stringify(currentdata));
        console.log('当前栏目数据', currentdata);
        // return;

        // 渲染模版前先拿到所有栏目
        let data = await ctx.service.category.dropdown_Categorylist();
        console.log('下拉框显示的所有栏目', JSON.stringify(data));
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改栏目:' + currentdata.name,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改直播功能中的礼物提交地址
                action: '/admin/category/update/' + id,
                //  字段
                fields: [
                    {
                        label: '放在哪个栏目里面',
                        type: 'dropdown', //下拉框
                        name: 'pid',
                        default: JSON.stringify(data),
                        placeholder: '不调整（如需调整请选择）',
                    },
                    {
                        label: '栏目名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入栏目名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '栏目英文名称',
                        type: 'text',
                        name: 'enname',
                        placeholder: '请输入栏目英文名称',
                    },
                    {
                        label: '栏目描述',
                        type: 'text',
                        name: 'description',
                        placeholder: '请输入栏目描述,选填',
                    },
                    {
                        label: '栏目链接地址',
                        type: 'text',
                        name: 'categoryurl',
                        placeholder: '请输入栏目链接地址,选填',
                    },
                    {
                        label: '栏目排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入栏目排序',
                        default:50,
                    },
                    {
                        label: '可用状态',
                        type: 'btncheck', //按钮组选择
                        name: 'status',
                        default: JSON.stringify([
                            { value: 1, name: '可用', checked: true },
                            { value: 0, name: '不可用' },
                        ]),
                        placeholder: '栏目状态 0不可用 1可用 等等状态',
                    },
                ],
                //修改内容默认值
                data:currentdata,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/admin/category/index',
        });

    }

    //修改栏目提交数据
    async update() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '直播功能中的礼物id'
            },
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '栏目名称' //字段含义
            },
            enname: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '栏目英文名称'
            },
            status: {
                type: 'int',
                required: true,
                defValue: 1,
                desc: '栏目状态 0不可用 1可用 等等状态'
            },
            pid: {
                type: 'int',
                required: true,
                defValue: 0,
                desc: '上一级(父级)id'
            },
            description: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '栏目描述，栏目简单介绍'
            },
            categoryurl: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '栏目链接地址'
            },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '栏目排序'
            }
        });

        // 参数
        const id = ctx.params.id;
        const {  name, enname, status, pid,description,order,categoryurl } = ctx.request.body;
        // 先看一下是否存在
        const category = await app.model.Category.findOne({ where: { id } });
        if (!category) {
            return ctx.apiFail('该栏目记录不存在');
        }
        //存在，栏目名称可以一样，只要保证它在不同的栏目下面
        const Op = this.app.Sequelize.Op;//拿Op,固定写法
        //先查一下修改的栏目名称，是否已经存在，如果存在，但是只要不放在同一栏目下还是可以的
        const hasdata = await app.model.Category.findOne({
            where: {
                name,
                id: {
                    [Op.ne]: id
                }
            }
        });
        if (hasdata && hasdata.pid == pid) {
            return ctx.apiFail('同一个栏目下不能有相同的栏目名称');
        }
        // 修改数据
        category.name = name;
        category.enname = enname;
        category.status = status;
        category.pid = pid;
        category.description = description;
        category.order = order; 
        category.categoryurl = categoryurl; 

        await category.save();
        // 给一个反馈
        ctx.apiSuccess('修改栏目成功');
    }

    //删除栏目
    async delete() {
        const { ctx, app } = this;
        const id = ctx.params.id;

        let data = await ctx.service.category.categorylist();
        // console.log('所有栏目', data);
        let ids = app._collectNodeIds(data,Number(id));
        // console.log(ids);
        await app.model.Category.destroy({
            where: {
                id:{
                    [this.app.Sequelize.Op.in] : ids
                }
            }
        });
        //提示
        ctx.toast('栏目删除成功', 'success');
        //跳转
        ctx.redirect('/admin/category/index');
    }

}

module.exports = CategoryController;

```

### 10. 表格模版： 新增返回上一页
`app/view/admin/layout/_table.html`
```html
<div class="card card-table">
    {# 表格上面的按钮 #}
    {% if table.buttons %}
    <div class="card-header">
        {% for item in table.buttons %}
        <a href="{{ item.url}}" class="btn btn-outline-primary">{{item.desc}}</a>
        {% endfor %}
    </div>
    {% endif %}
    
    <div class="card-body">
        <div class="mb-4">
            <div class="bg-light">
                <button class="btn btn-default btn-sm" onclick="history.back()"
                title="点击返回上一页"><span class="fa fa-arrow-left"></span> 返回上一页</button>
            </div>
        </div>
        
        {% if table.tabs %}
        <ul class="nav nav-tabs nav-tabs-top">
            {# <li class="nav-item"><a class="nav-link " href="#top-tab1"
                    data-toggle="tab">全部</a></li>
            <li class="nav-item"><a class="nav-link active" href="#top-tab2"
                    data-toggle="tab">直播中</a></li>
            <li class="nav-item"><a class="nav-link" href="#top-tab3"
                    data-toggle="tab">未开播</a></li>
            <li class="nav-item"><a class="nav-link" href="#top-tab4"
                    data-toggle="tab">已结束</a></li> #}
            {% for item in table.tabs %}
               <li class="nav-item">
                   <a class="nav-link {{ 'active'  if item.active else '' }}" href="{{item.url}}">
                    {{item.name}}
                   </a>
               </li>
            {% endfor %}
        </ul>
        {% endif %}
        
        <div class="table-responsive">
            <table class="table table-hover table-center mb-0">
                <thead>
                    {# 表头 #}
                    <tr>
                        {# <th>管理员账号</th>
                        <th width="120">创建时间</th>
                        <th class="text-center" width="100">操作</th> #}
                        {% for item in table.columns %}
                            <th class="{{item.class}}" width="{{item.width}}">{{item.title}}</th>
                        {% endfor %}

                    </tr>
                </thead>
                <tbody>
                    {% for item in data %}
                    <tr>
                        {% for item2 in table.columns %}
                        {% if item2.key %}
                        {# 如果存在key，说明是渲染数据 #}    
                        <td class="{{item2.class}}" width="{{item2.width}}">
                            
                            {# {{ item[item2.key] == '[object Object]' }} #}
                            {% if item[item2.key] == '[object Object]' %}
                               {% if item2.render %}
                               {{ item2.render(item) | safe }}
                               {% else %}
                               <span style="color:#ff6600;font-size: 12px;;">是对象数据，请新建一个render函数处理展示这些数据</span>
                               {% endif %}
                               
                            {% else %}

                                {% if item2.render %}
                                {{ item2.render(item) | safe }}
                                {% endif %}
                                
                                {% if not item2.hidekeyData %}
                                <span>{{ item[item2.key] }}</span>
                                {% endif %}  

                            {% endif %}
                            
                        </td>
                        {# 如果存在render，说明是函数 #}
                        {% elif item2.render %}
                        <td class="{{item2.class}}" width="{{item2.width}}">{{ item2.render(item) | safe }}</td>
                        {% elif item2.action %}
                        {# 如果存在action 说明是操作 #}   
                        <td class="{{item2.class}}" width="{{item2.width}}">
                            <div class="actions">
                                {# 存在修改按钮 #}
                                {% if item2.action.edit %}
                                <a href="{{item2.action.edit(item.id)}}" 
                                    class="btn btn-sm bg-success-light mr-2">
                                    <i class="fe fe-pencil"></i> 修改
                                </a>    
                                {% endif %}
                                {# 存在修改删除 #}
                                {# href="{{item2.action.delete(item.id)}}"  #}
                                {% if item2.action.delete %}
                                <a class="btn btn-sm bg-danger-light"
                                @click="del('{{item2.action.delete(item.id)}}')">
                                    <i class="fe fe-trash"></i> 删除
                                </a>
                                {% endif %}
                            </div>
                        </td>
                        {% else %}
                        {# 其他情况 #}    
                        {% endif %}
                           
                        {% endfor %}
                        {# <td>
                            <h2 class="table-avatar">
                                <a href="#" class="avatar avatar-sm mr-2">
                                    <img
                                        class="avatar-img rounded-circle"
                                        src="{{item.avatar}}"
                                        alt="User Image"></a>
                                <a href="#">{{ item.username }}
                                    <span>管理员</span></a>
                            </h2>
                        </td>
                        <td>{{ item.create_time }}</td>
                        <td class="text-right">
                            <div class="actions">
                                <a href="#"
                                    class="btn btn-sm bg-success-light mr-2">
                                    <i class="fe fe-pencil"></i> 修改
                                </a>
                                <a href="#" class="btn btn-sm bg-danger-light">
                                    <i class="fe fe-trash"></i> 删除
                                </a>
                            </div>
                        </td> #}
                        
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
        </div>
    </div>

    <div class="card-footer d-flex justify-content-center">
         {# 安全起见，egg.js官方默认将代码过滤成字符串，这里我们采用过滤器进行解码 #}
        {{ ctx.locals.pageHtml | safe }}
    </div>
</div>

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
            del(url){
                //调用弹出框
                Vueapp.$refs.confirm.show({
                    title:'确认删除',
                    content:'确定要删除吗？',
                    success:function(){
                        window.location.href=url;
                        console.log('删除成功');
                    }
                });
            },
            //弹出框数据
            openInfo(url,title){
                // console.log(url);
                $.ajax({
                    type: 'get', 
                    url:url + "?_csrf={{ctx.csrf|safe}}",
                    contentType:'application/json;charset=UTF-8;',
                    success: function (response, stutas, xhr) {
                        console.log(response.data)
                        Vueapp.$refs.confirm.show({
                            title:title,
                            isconfirm:false,
                            // ...response.data,
                            ths:response.data.ths,
                            data:response.data.data,
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
            //点击按钮组
            changeBtnStatus(keyname,classname,btnValue,index,id,keytable,model){
                // console.log(keyname,classname,btnValue,index,id,keytable,model);
                // return;
                $.ajax({
                    type: 'POST', 
                    // url: "/admin/category/updateStatus?_csrf={{ctx.csrf|safe}}",
                    url: "/admin/commonUpdateById?_csrf={{ctx.csrf|safe}}",
                    contentType:'application/json;charset=UTF-8;',
                    data:JSON.stringify({
                        id:id,
                        // status:btnValue
                        keyname:keyname,
                        keyvalue:btnValue,
                        model:model
                    }),
                    success: function (response, stutas, xhr) {
                        console.log(response)
                        Vueapp.$refs.toast.show({
                            msg:"修改成功",
                            type:'success',
                            delay:1000,
                            success:function(){
                                // 跳转到某个页面
                                if(keytable.indexOf('/admin/') >= 0){
                                    window.location.href = keytable;
                                }else{
                                    window.location.href = `/admin/${keytable}/index`;
                                }
                                
                            }
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
            }
        },
        mounted(){
            $('.btn-group').each(function(index,element){
                $(element).find('button').each(function(i,ele){
                    // console.log('每一个button的data', $(ele).attr('data'));
                    // console.log('每一个button的value', $(ele).attr('value'));
                    if($(ele).attr('data') == $(ele).attr('value')){
                        $(ele).removeClass('btn-light').addClass('btn-success')
                    }
                });
            });
        }
    });
</script>
```

## 二、新增`news`、`category`表功能
### 1. 先创建中间表 `rolecategory_news`字段设计及迁移文件
####  ① `rolecategory_news` 表字段设计
| 字段名  |  数据类型及描述    |   空    | <p style="width:150px;">默认值 </p>  | <p style="width:100px;">字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id </b> | <span>int(20) </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |   |   主键id  |
| <b>rolecategory_id </b> | <span>int(20) </span><br/> |   否      |     0       |         角色表（网站名称表）id   |
| <b>news_id </b> | <span>int(20) </span><br/> |   否      |      0      |         内容表（网站新闻内容）id   |
| <b> create_time </b>  | datetime  |    否    |     CURRENT_TIMESTAMP	   |   数据创建时间            |
| <b> update_time </b>  | datetime  |  否    |        CURRENT_TIMESTAMP	  |   数据更新时间             |
> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`

####  ② `rolecategory_news` 表迁移文件
>> 1. 创建迁移文件命令：
>> ```js
>> npx sequelize migration:generate --name=rolecategory_news
>> ```
>> 2. 创建迁移文件 `rolecategory_news.js`，内容如下：<br/>
>> ```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up(queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = Sequelize;
>>     // 创建表 --- 类似我们sql语句定义表结构
>>     await queryInterface.createTable('rolecategory_news', {
>>       id: {
>>         type: INTEGER(20).UNSIGNED,
>>         primaryKey: true,
>>         autoIncrement: true,
>>         comment: '主键id'
>>       },
>>       rolecategory_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '角色表（网站名称表）id',
>>         references: { //关联关系
>>           model: 'rolecategory', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>>       news_id: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '新闻内容表id',
>>         references: { //关联关系
>>           model: 'news', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>>       create_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
>>       update_time: { type: DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
>>     });
>>   },
>> 
>>   async down(queryInterface, Sequelize) {
>>     await queryInterface.dropTable('rolecategory_news')
>>   }
>> };
>> ```
>> 3. 执行迁移文件命令生成数据库表：
>>> ```js
>>> // 创建数据库
>>> npx sequelize db:migrate
>>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>>> npx sequelize db:migrate:undo
>>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>>> npx sequelize db:migrate:undo:all
>>> ```

### 2. 中间表 `rolecategory_news` 模型 （重点查看模型关联）
`app/model/rolecategory_news.js`
```js
'use strict';
//哈希函数 
const crypto = require('node:crypto');
module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const RolecategoryNews = app.model.define('rolecategory_news', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键id'
        },
        rolecategory_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '角色表（网站名称表）id',
            references: { //关联关系
                model: 'rolecategory', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        news_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '网站内容id',
            references: { //关联关系
                model: 'news', //关联的表
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
    RolecategoryNews.associate = function (models) {
        // 关联Rolecategory
        // RolecategoryNews.belongsTo(app.model.Rolecategory);
        RolecategoryNews.belongsTo(app.model.Rolecategory, { foreignKey: 'rolecategory_id' });
        // 关联News
        // RolecategoryNews.belongsTo(app.model.News);
        RolecategoryNews.belongsTo(app.model.News, { foreignKey: 'news_id' });
    }

    return RolecategoryNews;
}

```


### 3. `news`表模型（重点模型关联）
`app/model/news.js`
```js
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const News = app.model.define('news', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '内容主键id'
        },
        category_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '分类id',
            references: { //关联关系
                model: 'category', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        name: {
            type: STRING(100),
            allowNull: false,
            defaultValue: '',
            comment: '内容标题、新闻标题、产品名称等'
        },
        enname: {
            type: STRING,
            allowNull: true,
            defaultValue: '',
            comment: '标题、名称等英文'
        },
        status: {
            type: INTEGER(1),
            allowNull: true,
            defaultValue: 1,
            comment: '内容显示状态 0不显示 1显示 等等状态'
        },
        order: {
            type: INTEGER,//不限定长度.默认int(11)
            allowNull: true,
            defaultValue: 50,
            comment: '文章、内容排序，默认50'
        },
        description: {
            type: STRING,//不限定长度.默认varchar(255)
            allowNull: true,
            defaultValue: '',
            comment: '内容摘要，同时也是百度等搜索引擎抓取的描述信息'
        },
        keywords: {
            type: STRING,//不限定长度.默认varchar(255)
            allowNull: true,
            defaultValue: '',
            comment: '百度等搜素引擎的关键字'
        },
        maincontent: {
            type: TEXT,
            allowNull: true,
            defaultValue: '',
            comment: '主体内容（可为空，比如当对产品描述时候仅仅说一下产品名称内容不想填）'
        },
        attachment: {
            type: STRING,//不限定长度.默认varchar(255)
            allowNull: true,
            defaultValue: '',
            comment: '内容附件，比如：封面图、文件等等，或者指明文章出自哪个网址链接，一般是网址'
        },
        lookcount: {
            type: INTEGER,//不限定长度.默认int(11)
            allowNull: true,
            defaultValue: 0,
            comment: '文章、内容点击量，默认0'
        },
        manager_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '哪个发布的内容，一般关联管理员表，外键',
            references: { //关联关系
                model: 'manager', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
        timestamp: {
            type: DATE,
            allowNull: false,
            defaultValue: app.Sequelize.fn('NOW'),
            get() {
                let data = this.getDataValue('timestamp');
                /*
                //如果想转换成年月日时分秒，可以使用moment.js库等其他时间库
                //我们这里带领大家回忆一下js基础，就手动拼接一下
                let year = data.getFullYear();
                let month = ("0" + (data.getMonth() + 1)).slice(-2);
                let day = ("0" + data.getDate()).slice(-2);
                let hours = ("0" + data.getHours()).slice(-2);
                let minutes = ("0" + data.getMinutes()).slice(-2);
                let seconds = ("0" + data.getSeconds()).slice(-2);
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                */
                //如果想转成时间戳
                return (new Date(data)).getTime();
            }
        },
        create_time: {
            type: DATE,
            allowNull: false,
            defaultValue: app.Sequelize.fn('NOW'),
            get() {
                return app.formatTime(this.getDataValue('create_time'));
            }
        },
        update_time: { type: DATE, allowNull: false, defaultValue: app.Sequelize.fn('NOW') }
        //   timestamp : DATE,
        //   create_time: DATE,
        //   update_time: DATE
    }, {
        // timestamps: true,//是否自动写入时间戳
        // tableName: 'message',//自定义数据表名称
    });

    // 模型关联关系
    News.associate = function (models) {
        // 关联分类 反向一对多(一个分类可以有多个新闻内容，分类对于新闻内容是一对多的关系，反过来新闻内容属于分类belongsTo，就是反向一对多)
        News.belongsTo(app.model.Category);
        // 关联管理员 反向一对多(一个管理员可以发布很多新闻，管理员对于新闻内容就是一对多的关系，反过来新闻内容属于管理员belongsTo，就是反向一对多)
        News.belongsTo(app.model.Manager);

        // 多对多关联角色表Rolecategory
        News.belongsToMany(app.model.Rolecategory,{
            through:app.model.RolecategoryNews, // 指定中间表模型
            // 中间表中关联News的外键
            foreignKey:'news_id',
            // 中间表中关联Rolecategory的外键
            otherKey:'rolecategory_id',
            as: 'roleCategories' // 显式设置别名（与 Rolecategory 模型中的别名对应）
        });

        // 关联中间表RolecategoryNews
        News.hasMany(app.model.RolecategoryNews,{
            foreignKey:'news_id',
            as: 'roleCategoryLinks' // 显式设置别名（可选）
        });
    }

    return News;
}
```


### 4. `rolecategory`表模型（重点模型关联）
`app/model/rolecategory.js`
```js
'use strict';
//哈希函数 
const crypto = require('node:crypto');
module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const Rolecategory = app.model.define('rolecategory', {
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


    // 模型关联关系
    Rolecategory.associate = function (models) {
        // 一个角色分类（网站）对应多个网站栏目category
        Rolecategory.belongsToMany(app.model.Category, {
            through: app.model.RolecategoryCategory, // 指定中间表模型
            // 中间表中关联Rolecategory的外键
            foreignKey: 'rolecategory_id',
            // 中间表中关联Category的外键
            otherKey: 'category_id',
            as: 'categories' // 显式设置别名
        });

        Rolecategory.belongsToMany(app.model.News, {
            through: app.model.RolecategoryNews, // 指定中间表模型
            // 中间表中关联Rolecategory的外键
            foreignKey: 'rolecategory_id',
            // 中间表中关联News的外键
            otherKey: 'news_id',
            as: 'newsList' // 显式设置别名（与 News 模型中的反向别名对应）
        });
    };

    return Rolecategory;
}
```


### 5. `rolecategory`表控制器（重点index、create、save方法）
`app/controller/admin/rolecategory.js`
```js
'use strict';

const Controller = require('egg').Controller;

class RolecategoryController extends Controller {
    //创建网站界面
    async create() {
        const { ctx, app } = this;
        // 读取所有权限栏目
        // let rules = await app.model.Rule.findAll({
        //     where: {
        //         status: 1
        //     }
        // });
        let fields = [];
        // if (rules) {
        //     console.log('权限信息', JSON.parse(JSON.stringify(rules)));
        //     // rules = this.app.transformToTree(JSON.parse(JSON.stringify(rules)));
        //     rules = this.ctx.treeify(JSON.parse(JSON.stringify(rules)));
        //     fields = [
        //         {
        //             label: '分配权限',
        //             type: 'treeDataSelect',//树形结构数据选择
        //             name: 'rule_ids',
        //             default: JSON.stringify(rules),
        //         }
        //     ];
        // }

        //渲染公共模版
        await ctx.renderTemplate({
            title: '创建网站',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/admin/rolecategory",
                //  字段
                fields: [
                    {
                        label: '网站名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入网站名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '网站描述',
                        type: 'textarea',
                        name: 'desc',
                        //default: '',
                        placeholder: '网站的简单介绍，选填',
                    },
                    ...fields,
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '/admin/rolecategory',
        });
    }
    //创建网站提交数据
    async save() {
        const { ctx, app } = this;
        //一般处理流程
        //1.参数验证
        this.ctx.validate({
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '网站名称', //字段含义
                range: {
                    min: 2,
                    max: 30
                },
            },
            desc: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '网站描述',
                range: {
                    min: 0,
                    max: 255
                },
            },
            // rule_ids: {
            //     type: 'string',
            //     required: false,
            //     defValue: '',
            //     desc: '权限id集合',
            // }
        });
        //先判断一下直播功能中的是否存在，不存在在写入数据库
        //2.写入数据库
        //3.成功之后给页面反馈
        let { name, desc, 
            // rule_ids 
        } = this.ctx.request.body;
        if (await this.app.model.Rolecategory.findOne({ where: { name } })) {
            return this.ctx.apiFail('网站名称已存在');
        }
        //否则不存在则写入数据库
        const res = await this.app.model.Rolecategory.create({
            name,
            desc
        });

        /*
        // 给授权
        console.log('网站授权id集合', rule_ids);//终端输出：网站授权id集合 "4,5,6,7,8"
        if (rule_ids) {
            let id = res.id;
            rule_ids = rule_ids.split(',').map(v => parseInt(v));
            console.log('网站授权id集合数组', rule_ids); //终端输出：网站授权id集合数组 [ 4, 5, 6, 7, 8 ]
            // 授权以前，先看一下当前网站在role_rule表中有没有数据
            let rolerule = await app.model.RoleRule.findAll({
                where: {
                    role_id: id
                },
                // 主表查询字段限制
                attributes: ['rule_id'],
            });
            console.log('当前网站在role_rule表拥有的权限', JSON.parse(JSON.stringify(rolerule)));
            //终端输出：当前网站在role_rule表拥有的权限 [ { rule_id: 6 }, { rule_id: 7 } ]
            // 数据对象转换为数组，只要rule_id的值
            let has_ruleids = rolerule.map(item => item.rule_id);
            console.log('当前网站在role_rule表拥有的权限id数组', JSON.parse(JSON.stringify(has_ruleids)));
            //终端输出： 当前网站在role_rule表拥有的权限id数组 [ 6, 7 ]

            // 当前已拥有的权限id: [6,7], 当前传递过来的权限id: [4, 5, 6, 7, 8]，相当于增加 4, 5, 8
            // 还有情况，比如已经拥有[6,7], 传过来 [6] 相当于要删除7
            // 还有情况，比如已经拥有[6,7], 传过来 [6,8,10] 相当于要删除7，增加8,10

            //将权限加入到role_rule表中
            // 计算需要新增和删除的权限ID
            const needAdd = rule_ids.filter(id => !has_ruleids.includes(id));
            const needRemove = has_ruleids.filter(id => !rule_ids.includes(id));

            // 使用事务保证数据一致性：使用 Sequelize 的事务功能保证删除和新增操作的原子性
            await app.model.transaction(async t => {
                // 删除需要移除的权限
                if (needRemove.length > 0) {
                    await app.model.RoleRule.destroy({
                        where: {
                            role_id: id,
                            rule_id: needRemove, // 自动转换为 IN 查询 批量删除
                            //使用 WHERE IN 条件进行批量删除，比逐条删除更高效
                        },
                        transaction: t
                    });
                    console.log(`已删除权限ID：[${needRemove}]`);
                }
                // 添加新增的权限
                if (needAdd.length > 0) {
                    // 构造批量插入数据
                    const addData = needAdd.map(rule_id => ({
                        role_id: id,
                        rule_id
                    }));
                    //使用 bulkCreate 批量插入数据，减少数据库操作次数
                    await app.model.RoleRule.bulkCreate(addData, {
                        transaction: t
                    });
                    console.log(`已新增权限ID：[${needAdd}]`);
                }
            });
            console.log('权限更新完成');

        }
        */

        this.ctx.apiSuccess('创建网站成功');
    }
    //网站列表页面
    async index() {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        //1.参数验证
        this.ctx.validate({
            page: {
                type: 'int',
                required: false,
                desc: '页码',
                defValue: 1,
                range:{
                    min:1,
                }
            },
            limit: {
                type: 'int',
                required: false,
                desc: '每页显示数量',
                defValue: 10,
                range:{
                    min:1,
                }
            },
        });
        let data = await ctx.page('Rolecategory',{},{
            include: [
                {
                    model: app.model.Category,
                    as: 'categories', // 与 Rolecategory 模型中的别名一致
                    attributes: {
                        exclude: ['create_time', 'update_time'],//除了这些字段，其他字段都显示
                    },
                },
                {
                    model: app.model.News,
                    as: 'newsList', // 与 Rolecategory 模型中的别名一致
                    attributes: {
                        exclude: ['create_time', 'update_time'],//除了这些字段，其他字段都显示
                    },
                },
            ],
        });
        // ctx.body = data;
        // return;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '网站列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/admin/rolecategory/create',//新增路径
                        desc: '新增网站',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    }
                ],
                //表头
                columns: [
                    {
                        title: '网站名称',
                        key: 'name',
                        class: 'text-center',//可选
                    },
                    {
                        title: '网站描述',
                        key: 'desc',
                        class: 'text-center',//可选
                    },
                    {
                        title: '网站栏目',
                        //key: '',
                        class: 'text-center',//可选
                        render(item){
                            return `
                              <a href="/admin/category/create?rolecategoryId=${item.id}">创建栏目</a>
                              <a href="/admin/category/index?rolecategoryId=${item.id}" style="color:#ff6600;margin-left:10px;">(已创建：${item.categories.length}个)</a>
                            `;
                        }
                    },
                    {
                        title: '网站内容',
                        //key: '',
                        class: 'text-center',//可选
                        render(item){
                            let str = ``;
                            if(item.categories.length){
                                str = `
                                   <a href="/admin/news/create?rolecategoryId=${item.id}">发布内容</a>
                                   <a href="/admin/news/index?rolecategoryId=${item.id}" style="color:#ff6600;margin-left:10px;">(已发布：${item.newsList.length}条)</a>
                                `;
                            }else{
                                str = `<span style="color:#9c9c9c;font-size:12px;">请先创建网站栏目，再来发布内容</span>`;
                            }
                            return `
                              ${str}
                            `;
                        }
                    },
                    {
                        title: '可用状态',
                        key: 'status',
                        width: 200,//可选
                        class: 'text-center',//可选
                        hidekeyData: true,//是否隐藏key对应的数据
                        render(item) {
                            // console.log('可用状态里面每个item', item);
                            let arr = [
                                { value: 1, name: '可用' },
                                { value: 0, name: '不可用' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.status}"
                            value="${arr[i].value}"
                            @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/admin/rolecategory','Rolecategory')">${arr[i].name}</button>`;
                            }
                            str += `</div>`;
                            return str;
                        }
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
                            edit: function (id) {
                                return `/admin/rolecategory/edit/${id}`;
                            },
                            //删除
                            delete: function (id) {
                                return `/admin/rolecategory/${id}/delete`;
                            }
                        }
                    },
                ],
            },
        });
    }
    //网站列表包含网站的权限信息API接口
    async indexlist() {
        const { ctx, app } = this;
        let limit = parseInt(ctx.query.limit) || 10;
        let role = await app.model.Rolecategory.findAll({
            where: {
                status: 1
            },
            order: [
                ['id', 'desc']
            ],
            limit,
            include: [
                {
                    model: app.model.Category, //关联
                    through: {
                        attributes: []  //不需要返回中间表的字段
                    },
                    /*
                    // 如果需要（如树形结构）category要有pid字段，可添加子关联
                    include:[
                        {
                            model:app.model.Category,
                            as:'ChildCategory',
                        }
                    ],
                    */
                }
            ],
        });
        let roleCount = await app.model.Rolecategory.count({
            where: {
                status: 1
            },
        });
        // ctx.body = roleCount;
        ctx.apiSuccess({
            list: role,
            totalCount: roleCount
        });
    }
    //修改网站界面
    async edit() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let data = await app.model.Rolecategory.findOne({
            where: {
                id
            }
        });
        if (!data) {
            return ctx.pageFail('网站不存在', 404);
        }
        // data = JSON.parse(JSON.stringify(data));
        // console.log(data);

        // 读取所有权限栏目
        // let rules = await app.model.Rule.findAll({
        //     where: {
        //         status: 1
        //     }
        // });
        let fields = [];
        // if (rules) {
        //     console.log('权限信息', JSON.parse(JSON.stringify(rules)));
        //     // rules = this.app.transformToTree(JSON.parse(JSON.stringify(rules)));
        //     rules = this.ctx.treeify(JSON.parse(JSON.stringify(rules)));
        //     fields = [
        //         {
        //             label: '分配权限',
        //             type: 'treeDataSelect',//树形结构数据选择
        //             name: 'rule_ids',
        //             default: JSON.stringify(rules),
        //         }
        //     ];
        // }


        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改网站',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: '/admin/rolecategory/' + id,
                //  字段
                fields: [
                    {
                        label: '网站名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入网站名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '网站描述',
                        type: 'textarea',
                        name: 'desc',
                        //default: '',
                        placeholder: '网站的简单介绍，选填',
                    },
                    ...fields,
                ],
                //修改内容默认值
                data,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/admin/rolecategory',
        });
    }
    //修改网站数据功能
    async update() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '网站id'
            },
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '网站名称', //字段含义
                range: {
                    min: 2,
                    max: 30
                },
            },
            desc: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '网站描述',
                range: {
                    min: 0,
                    max: 255
                },
            },
            // rule_ids: {
            //     type: 'string',
            //     required: false,
            //     defValue: '',
            //     desc: '权限id集合',
            // }
        });

        // 参数
        const id = ctx.params.id;
        let { name, desc, 
            // rule_ids 
        } = ctx.request.body;
        // 是否存在
        const role = await app.model.Rolecategory.findOne({ where: { id } });
        if (!role) {
            return ctx.pageFail('网站不存在');
        }
        //存在，网站具有唯一性，你不能修改网站的时候，修改成存在的网站
        // if (role && role.name == '超级管理员') {
        //     return ctx.apiFail('超级管理员网站不能修改');
        // }
        const Op = this.app.Sequelize.Op;//拿Op,固定写法
        if (await app.model.Rolecategory.findOne({
            where: {
                name,
                id: {
                    [Op.ne]: id
                }
            }
        })) {
            // return ctx.pageFail('该直播功能中的礼物账号已经存在，不能修改成该直播功能中的礼物账号', 404);
            return ctx.apiFail('网站已经存在，不能修改成' + name);
        }
        // 修改数据
        role.name = name;
        role.desc = desc;

        await role.save();

        /*
        // 给网站授权
        console.log('网站授权id集合', rule_ids);//终端输出：网站授权id集合 "4,5,6,7,8"
        if (rule_ids) {
            rule_ids = rule_ids.split(',').map(v => parseInt(v));
            console.log('网站授权id集合数组', rule_ids); //终端输出：网站授权id集合数组 [ 4, 5, 6, 7, 8 ]
            // 授权以前，先看一下当前网站在role_rule表中有没有数据
            let rolerule = await app.model.RoleRule.findAll({
                where: {
                    role_id: id
                },
                // 主表查询字段限制
                attributes: ['rule_id'],
            });
            console.log('当前网站在role_rule表拥有的权限', JSON.parse(JSON.stringify(rolerule)));
            //终端输出：当前网站在role_rule表拥有的权限 [ { rule_id: 6 }, { rule_id: 7 } ]
            // 数据对象转换为数组，只要rule_id的值
            let has_ruleids = rolerule.map(item => item.rule_id);
            console.log('当前网站在role_rule表拥有的权限id数组', JSON.parse(JSON.stringify(has_ruleids)));
            //终端输出： 当前网站在role_rule表拥有的权限id数组 [ 6, 7 ]

            // 当前已拥有的权限id: [6,7], 当前传递过来的权限id: [4, 5, 6, 7, 8]，相当于增加 4, 5, 8
            // 还有情况，比如已经拥有[6,7], 传过来 [6] 相当于要删除7
            // 还有情况，比如已经拥有[6,7], 传过来 [6,8,10] 相当于要删除7，增加8,10

            //将权限加入到role_rule表中
            // 计算需要新增和删除的权限ID
            const needAdd = rule_ids.filter(id => !has_ruleids.includes(id));
            const needRemove = has_ruleids.filter(id => !rule_ids.includes(id));

            // 使用事务保证数据一致性：使用 Sequelize 的事务功能保证删除和新增操作的原子性
            await app.model.transaction(async t => {
                // 删除需要移除的权限
                if (needRemove.length > 0) {
                    await app.model.RoleRule.destroy({
                        where: {
                            role_id: id,
                            rule_id: needRemove, // 自动转换为 IN 查询 批量删除
                            //使用 WHERE IN 条件进行批量删除，比逐条删除更高效
                        },
                        transaction: t
                    });
                    console.log(`已删除权限ID：[${needRemove}]`);
                }
                // 添加新增的权限
                if (needAdd.length > 0) {
                    // 构造批量插入数据
                    const addData = needAdd.map(rule_id => ({
                        role_id: id,
                        rule_id
                    }));
                    //使用 bulkCreate 批量插入数据，减少数据库操作次数
                    await app.model.RoleRule.bulkCreate(addData, {
                        transaction: t
                    });
                    console.log(`已新增权限ID：[${needAdd}]`);
                }
            });
            console.log('权限更新完成');

        }
        */

        // 给一个反馈
        ctx.apiSuccess('修改网站成功');
    }
    //修改网站状态功能
    async updateStatus() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '网站id'
            },
            status: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '网站状态', //字段含义
                range: {
                    in: [0, 1]
                },
            },
        });
        // 参数
        const id = ctx.params.id;
        const { status } = ctx.request.body;
        // 是否存在
        const role = await app.model.Rolecategory.findOne({ where: { id } });
        if (!role) {
            return ctx.apiFail('网站不存在');
        }
        // 修改数据
        role.status = status;

        await role.save();
        // 给一个反馈
        ctx.apiSuccess('修改网站状态成功');
    }
    //删除网站功能
    async delete() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        // const role = await app.model.Rolecategory.findOne({ where: { id } });
        // if (role && role.name == '超级管理员') {
        //     return ctx.apiFail('超级管理员网站不能删除');
        // }

        //要做一下提示
        // let shopmanager = await app.model.ShopManager.findAndCountAll({
        //     where: {
        //         role_id: id,
        //     }
        // });
        // console.log('管理员使用该网站',JSON.parse(JSON.stringify(shopmanager)));
        // return;
        // if (shopmanager.count > 0) {
        //     return ctx.apiFail('您删除的这个网站，有管理员在使用，请先删除这些管理员或修改这些管理员网站，在删除当前网站');
        // }

        await app.model.Rolecategory.destroy({
            where: {
                id
            }
        });
        //提示
        ctx.toast('网站删除成功', 'success');
        //跳转
        ctx.redirect('/admin/rolecategory');
    }
    //删除网站功能API接口
    async deleteAPI() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        // const role = await app.model.Role.findOne({ where: { id } });
        // if (role && role.name == '超级管理员') {
        //     return ctx.apiFail('超级管理员网站不能删除');
        // }

        //由于管理员配置了网站，删除网站，关联查询管理员缺乏网站会报错，要做一下提示
        // let shopmanager = await app.model.ShopManager.findAndCountAll({
        //     where: {
        //         role_id: id,
        //     }
        // });
        // console.log('管理员使用该网站',JSON.parse(JSON.stringify(shopmanager)));
        // return;
        // if (shopmanager.count > 0) {
        //     return ctx.apiFail('您删除的这个网站，有管理员在使用，请先删除这些管理员或修改这些管理员网站，在删除当前网站');
        // }

        await app.model.Rolecategory.destroy({
            where: {
                id
            }
        });
        ctx.apiSuccess(true);
    }
    
}

module.exports = RolecategoryController;

```

### 6.`category`表控制器（重点index、create、save方法）
`app/controller/admin/category.js`
```js
'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
    //栏目列表页面
    async index() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            page: {
                type: 'int',
                required: false,
                desc: '页码',
                defValue: 1,
                range:{
                    min:1,
                }
            },
            limit: {
                type: 'int',
                required: false,
                desc: '每页显示数量',
                // defValue: 1000,
                range:{
                    min:1,
                }
            },
            rolecategoryId: {
                type: 'int',
                required: false,
                desc: '网站分类id',
                defValue: 0,
                range:{
                    min:1,
                }
            },
        });
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        // let data = await ctx.page('Category', {}, { 
        //     include: [
        //         {
        //             model: app.model.Rolecategory,
        //         }
        //     ]
        // });
        // data = JSON.parse(JSON.stringify(data));
        // data = ctx.treeify(data); //转树形结构此处用不上，一般用于下拉框
        
        //通用网站后台栏目列表包分页和连表查询方法
        let include_where = {};
        let rolecategoryId = ctx.query.rolecategoryId;
        // ctx.body = rolecategoryId;
        // return;
        //如果传了网站分类id
        let siteName = ``; let buttons = {};
        if(rolecategoryId){
            include_where.where = {
                rolecategory_id:rolecategoryId
            };

            let rolecategory = await app.model.Rolecategory.findOne({
                where:{
                    id:rolecategoryId
                }
            });
            if(rolecategory){
                buttons.buttons = [
                    {
                        url: `/admin/category/create?rolecategoryId=${rolecategoryId}`,//新增路径
                        desc: '新增栏目',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    }
                ];
                siteName = rolecategory.name;
            }
        }

        let data = await ctx.datalistIndex('Category',{},{
            include: [
                {
                    model: app.model.Rolecategory,
                    attributes: {
                        exclude: ['create_time', 'update_time'],//除了这些字段，其他字段都显示
                    },
                },
                {
                    model: app.model.RolecategoryCategory,
                    attributes: {
                        exclude: ['create_time', 'update_time'],//除了这些字段，其他字段都显示
                    },
                    // where: {
                    //     rolecategory_id:rolecategoryId
                    // },
                    ...include_where,
                }
            ],
            attributes: {
                exclude: ['create_time', 'update_time'],//除了这些字段，其他字段都显示
            },
            order: [
                ['order', 'asc'],
                ['id', 'asc'],
            ],
        });
        data = data.rules;

        // let data = await ctx.service.category.datalist({ limit: 1000 });
        // data = data.rules;
        // console.log('栏目数据', data);
        // ctx.body = data;
        // return;
        
        //渲染公共模版
        await ctx.renderTemplate({
            title: `网站${siteName}栏目列表`,//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                // buttons: [
                //     {
                //         url: '/admin/category/create',//新增路径
                //         desc: '新增栏目',//新增 //按钮名称
                //         // icon: 'fa fa-plus fa-lg',//按钮图标
                //     }
                // ],
                ...buttons,
                //表头
                columns: [
                    {
                        title: '网站及栏目名称',
                        key: 'name',
                        class: 'text-left',//可选
                        render(item) { //树形数据
                            // console.log('每个item',item);
                            let str = ``;
                            if (item.level) {
                                let w = item.level * 40;
                                str = `<span style="display:inline-block;width:${w}px"></span>`;
                            }
                            let rolecategory = ``;
                            if(item.rolecategories && item.rolecategories.length){
                                rolecategory = `
                                <span style="border:1px solid #ccc;padding:2px 5px;font-size:12px;color:#7C29FF;border-radius:5px;margin-right:15px;">
                                    ${item.rolecategories[0].name}
                                </span>`;
                            }
                            return `${str}${rolecategory}`;
                        }
                    },
                    {
                        title: '是否是导航栏栏目',
                        key: 'isnav',
                        width: 200,//可选
                        class: 'text-center',//可选
                        hidekeyData: true,//是否隐藏key对应的数据
                        render(item) {
                            console.log('可用状态里面每个item', item);
                            let arr = [
                                { value: 1, name: '是' },
                                { value: 0, name: '否' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.isnav}"
                                value="${arr[i].value}"
                                @click="changeBtnStatus('isnav','btn-group-${item.id}',${arr[i].value},${i},${item.id},'category','Category')">${arr[i].name}</button>`;
                            }
                            str += `</div>`;
                            return str;
                        }
                    },
                    {
                        title: '栏目链接地址',
                        key: 'categoryurl',
                        class: 'text-center',//可选
                    },
                    {
                        title: '栏目排序',
                        key: 'order',
                        class: 'text-center',//可选
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
                                { value: 1, name: '可用' },
                                { value: 0, name: '不可用' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.status}"
                                value="${arr[i].value}"
                                @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'category','Category')">${arr[i].name}</button>`;
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
                                return `/admin/category/edit/${id}`;
                            },
                            //删除
                            delete: function (id) {
                                return `/admin/category/delete/${id}`;
                            }
                        }
                    },
                ],
            },
        });
    }

    //创建栏目表单
    async create() {
        const { ctx, app } = this;

        // 为哪个网站创建栏目
        let rolecategory = await ctx.model.Rolecategory.findAll({
            where: {
                status: 1,
            },
        });
        let fields = [];
        // ctx.body = rolecategory; return;
        if(rolecategory.length){
            rolecategory = JSON.parse(JSON.stringify(rolecategory));
            // 给rolecategory数组里面每个对象加上一个pid属性值为0
            rolecategory.forEach(item => {
                item.pid = 0;
            });
            rolecategory = ctx.treeify(rolecategory);
            // ctx.body = rolecategory; return;
            fields = [
                // 如果一旦填写了网站，则就应该有选择网站这里栏目提示要选择网站
                {
                    label: '选择网站提示',
                    type: 'text', //下拉框
                    name: 'select_rolecategory_id',
                    default: 1,
                    // placeholder: '请选择网站',
                    hidekeyData: true,//隐藏这一项，但是值会提交过去
                },
                {
                    label: '放在哪个网站里面',
                    type: 'dropdown', //下拉框
                    name: 'rolecategory_id',
                    default: JSON.stringify(rolecategory),
                    placeholder: '请选择网站',
                },
            ];
        }
        
        // 渲染模版前先拿到所有栏目
        let data = await ctx.service.category.dropdown_Categorylist();

        // 以上情况是读取所有内容
        // 下面是如果网址里面传递了网站id, 则只读取该网站下的分类
        let gourl = ``;let sitename = ``;
        let rolecategoryId = parseInt(ctx.query.rolecategoryId) || 0;
        // ctx.body = rolecategoryId; return;
        if(rolecategoryId){
            rolecategory = await app.model.Rolecategory.findOne({
                where: {
                    id: rolecategoryId
                },
            });
            if(!rolecategory){
                return this.ctx.apiFail('数据不存在');
            }
            // ctx.body = rolecategory; return;
            // 选择网站重新处理
            fields = [
                // 如果一旦填写了网站，则就应该有选择网站这里栏目提示要选择网站
                {
                    label: '选择网站提示',
                    type: 'text', //下拉框
                    name: 'select_rolecategory_id',// 虚拟字段做判断用的
                    default: 0, // 0表示已经选择好了网站 1表示要去选择网站不选择就提示
                    // placeholder: '请选择网站',
                    hidekeyData: true,//隐藏这一项，但是值会提交过去
                },
                {
                    label: '放在哪个网站里面（此处已经通过网址选择好了，这一项省略掉但值要传过去）',
                    type: 'text', //不是下拉框了
                    name: 'rolecategory_id',
                    default: rolecategoryId,
                    placeholder: '网站的id',
                    hidekeyData: true,//隐藏这一项，但是值会提交过去
                },
            ];


            let rolecategory_category = await app.model.RolecategoryCategory.findAll({
                where: {
                    rolecategory_id: rolecategoryId
                },
            });
            let _ids = rolecategory_category.map(item => item.category_id);
            // ctx.body = _ids; return;
            let categories = await app.model.Category.findAll({
                where: {
                    id:{
                        [this.app.Sequelize.Op.in]: _ids
                    }
                },
                attributes: ['id', 'name', 'pid', 'status'],
            });
            // ctx.body = categories; return;
            // 渲染模版前先拿到当前网站的所有分类
            data = JSON.parse(JSON.stringify(categories));
            data = data.map(item => {
                return {
                    ...item,
                    value: item.id
                }
            });
            data.unshift({ id: -1, name: '一级分类', pid: 0, status: 1, value: 0,});
            data = await ctx.treeify(data);
            // ctx.body = data; return;

            gourl = `?rolecategoryId=${rolecategoryId}`;
            sitename = rolecategory.name;
        }

        
        //渲染公共模版
        await ctx.renderTemplate({
            title: `创建${sitename}网站栏目`,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/admin/category/save",
                //  字段
                fields: [
                    ...fields,
                    {
                        label: '放在哪个栏目里面',
                        type: 'dropdown', //下拉框
                        name: 'pid',
                        default: JSON.stringify(data),
                        placeholder: '',
                    },
                    {
                        label: '栏目名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入栏目名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '栏目英文名称',
                        type: 'text',
                        name: 'enname',
                        placeholder: '请输入栏目英文名称',
                    },
                    {
                        label: '栏目描述',
                        type: 'text',
                        name: 'description',
                        placeholder: '请输入栏目描述,选填',
                    },
                    {
                        label: '栏目链接地址',
                        type: 'text',
                        name: 'categoryurl',
                        placeholder: '请输入栏目链接地址,选填',
                    },
                    {
                        label: '栏目排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入栏目排序',
                        default:50,
                    },
                    {
                        label: '可用状态',
                        type: 'btncheck', //按钮组选择
                        name: 'status',
                        default: JSON.stringify([
                            { value: 1, name: '可用', checked: true },
                            { value: 0, name: '不可用' },
                        ]),
                        placeholder: '栏目状态 0不可用 1可用 等等状态',
                    },
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: `/admin/category/index${gourl}`,
        });
    }

    //栏目表单提交数据
    async save() {
        //一般处理流程
        //1.参数验证
        this.ctx.validate({
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '栏目名称' //字段含义
            },
            enname: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '栏目英文名称'
            },
            status: {
                type: 'int',
                required: true,
                defValue: 1,
                desc: '栏目状态 0不可用 1可用 等等状态'
            },
            pid: {
                type: 'int',
                required: true,
                defValue: 0,
                desc: '上一级(父级)id'
            },
            description: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '栏目描述，栏目简单介绍'
            },
            categoryurl: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '栏目链接地址'
            },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '栏目排序'
            },
            rolecategory_id: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '网站id'
            },
            select_rolecategory_id: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '要选择一个网站提示'
            },
        });

        let { name, enname, status, pid,description,order,categoryurl,rolecategory_id,select_rolecategory_id } = this.ctx.request.body;

        // 处理中间表
        // this.ctx.body = {
        //     rolecategory_id:rolecategory_id,
        //     res: res,
        // };
        // console.log('select_rolecategory_id',select_rolecategory_id);
        // console.log('rolecategory_id',rolecategory_id);
        // console.log('res',res.id);
        // return;

        // 有rolecategory_id则写入中间表
        if(select_rolecategory_id && !rolecategory_id){
            return this.ctx.apiFail('请选择一个网站');
        }

        //先判断一下直播功能中的礼物账号是否存在，不存在在写入数据库
        //2.写入数据库
        //3.成功之后给页面反馈
        // if (await this.app.model.Category.findOne({ where: { name } })) {
        //     return this.ctx.apiFail('栏目名称已存在');
        // }
        //否则不存在则写入数据库
        const res = await this.app.model.Category.create({
            name,
            enname,
            status,
            pid,
            description,
            order,categoryurl
        });

        // 写入中间表
        if (rolecategory_id) {
            await this.app.model.RolecategoryCategory.create({
                rolecategory_id: rolecategory_id,
                category_id: res.id
            });
        }

        this.ctx.apiSuccess('创建栏目成功');
    }

    //根据id修改栏目状态
    async updateStatus() {
        const { id, status } = this.ctx.request.body;
        //1.参数验证
        this.ctx.validate({
            status: {
                type: 'int',
                required: true,
                // defValue: 1,
                desc: '栏目状态 0不可用 1可用 等等状态'
            },
            id: {
                type: 'int',
                required: true,
                // defValue: 0,
                desc: '栏目id'
            }
        });
        let data = await this.app.model.Category.findByPk(id);
        if (!data) {
            return this.ctx.apiFail('栏目数据不存在');
        }
        data.status = status;
        await data.save();
        this.ctx.apiSuccess('修改栏目状态成功');
    }

    //修改栏目界面
    async edit() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let currentdata = await app.model.Category.findOne({
            where: {
                id
            }
        });
        if (!currentdata) {
            return ctx.apiFail('该栏目不存在');
        }
        currentdata = JSON.parse(JSON.stringify(currentdata));
        console.log('当前栏目数据', currentdata);
        // return;

        // 渲染模版前先拿到所有栏目
        let data = await ctx.service.category.dropdown_Categorylist();
        console.log('下拉框显示的所有栏目', JSON.stringify(data));
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改栏目:' + currentdata.name,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改直播功能中的礼物提交地址
                action: '/admin/category/update/' + id,
                //  字段
                fields: [
                    {
                        label: '放在哪个栏目里面',
                        type: 'dropdown', //下拉框
                        name: 'pid',
                        default: JSON.stringify(data),
                        placeholder: '不调整（如需调整请选择）',
                    },
                    {
                        label: '栏目名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入栏目名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '栏目英文名称',
                        type: 'text',
                        name: 'enname',
                        placeholder: '请输入栏目英文名称',
                    },
                    {
                        label: '栏目描述',
                        type: 'text',
                        name: 'description',
                        placeholder: '请输入栏目描述,选填',
                    },
                    {
                        label: '栏目链接地址',
                        type: 'text',
                        name: 'categoryurl',
                        placeholder: '请输入栏目链接地址,选填',
                    },
                    {
                        label: '栏目排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入栏目排序',
                        default:50,
                    },
                    {
                        label: '可用状态',
                        type: 'btncheck', //按钮组选择
                        name: 'status',
                        default: JSON.stringify([
                            { value: 1, name: '可用', checked: true },
                            { value: 0, name: '不可用' },
                        ]),
                        placeholder: '栏目状态 0不可用 1可用 等等状态',
                    },
                ],
                //修改内容默认值
                data:currentdata,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/admin/category/index',
        });

    }

    //修改栏目提交数据
    async update() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '直播功能中的礼物id'
            },
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '栏目名称' //字段含义
            },
            enname: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '栏目英文名称'
            },
            status: {
                type: 'int',
                required: true,
                defValue: 1,
                desc: '栏目状态 0不可用 1可用 等等状态'
            },
            pid: {
                type: 'int',
                required: true,
                defValue: 0,
                desc: '上一级(父级)id'
            },
            description: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '栏目描述，栏目简单介绍'
            },
            categoryurl: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '栏目链接地址'
            },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '栏目排序'
            }
        });

        // 参数
        const id = ctx.params.id;
        const {  name, enname, status, pid,description,order,categoryurl } = ctx.request.body;
        // 先看一下是否存在
        const category = await app.model.Category.findOne({ where: { id } });
        if (!category) {
            return ctx.apiFail('该栏目记录不存在');
        }
        //存在，栏目名称可以一样，只要保证它在不同的栏目下面
        const Op = this.app.Sequelize.Op;//拿Op,固定写法
        //先查一下修改的栏目名称，是否已经存在，如果存在，但是只要不放在同一栏目下还是可以的
        const hasdata = await app.model.Category.findOne({
            where: {
                name,
                id: {
                    [Op.ne]: id
                }
            }
        });
        if (hasdata && hasdata.pid == pid) {
            return ctx.apiFail('同一个栏目下不能有相同的栏目名称');
        }
        // 修改数据
        category.name = name;
        category.enname = enname;
        category.status = status;
        category.pid = pid;
        category.description = description;
        category.order = order; 
        category.categoryurl = categoryurl; 

        await category.save();
        // 给一个反馈
        ctx.apiSuccess('修改栏目成功');
    }

    //删除栏目
    async delete() {
        const { ctx, app } = this;
        const id = ctx.params.id;

        let data = await ctx.service.category.categorylist();
        // console.log('所有栏目', data);
        let ids = app._collectNodeIds(data,Number(id));
        // console.log(ids);
        await app.model.Category.destroy({
            where: {
                id:{
                    [this.app.Sequelize.Op.in] : ids
                }
            }
        });
        //提示
        ctx.toast('栏目删除成功', 'success');
        //跳转
        ctx.redirect('/admin/category/index');
    }

}

module.exports = CategoryController;

```




### 7.`news`表控制器（重点index、create、save方法）
`app/controller/admin/news.js`
```js
'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
 
    //新闻内容列表界面
    async index() {
        // console.log('管理员信息',this.ctx.session.auth);
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            page: {
                type: 'int',
                required: false,
                desc: '页码',
                defValue: 1,
                range:{
                    min:1,
                }
            },
            limit: {
                type: 'int',
                required: false,
                desc: '每页显示数量',
                // defValue: 1000,
                range:{
                    min:1,
                }
            },
            rolecategoryId: {
                type: 'int',
                required: false,
                desc: '网站分类id',
                defValue: 0,
                range:{
                    min:1,
                }
            },
        });
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        // let data = await ctx.page('News',{},{
        //     // 关联查询
        //     include:[
        //         {
        //             model:app.model.Category,// 需要查询的模型
        //             attributes:['id','name','enname'],// 查询的字段 
        //         },
        //         {
        //             model:app.model.Manager,// 需要查询的模型
        //             attributes:['id','username','avatar'],// 查询的字段 
        //         },
        //     ],
        // });
        // data = JSON.parse(JSON.stringify(data));
        // console.log(data);return;

        //通用网站后台栏目列表包分页和连表查询方法
        let include_where = {};
        let rolecategoryId = ctx.query.rolecategoryId;
        // ctx.body = rolecategoryId;
        // return;
        //如果传了网站分类id
        let siteName = ``; let buttons = {};
        if(rolecategoryId){
            include_where.where = {
                rolecategory_id:rolecategoryId
            };

            let rolecategory = await app.model.Rolecategory.findOne({
                where:{
                    id:rolecategoryId
                }
            });
            if(rolecategory){
                buttons.buttons = [
                    {
                        url: `/admin/news/create?rolecategoryId=${rolecategoryId}`,//新增路径
                        desc: '新增新闻内容',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    }
                ];
                siteName = rolecategory.name;
            }
        }

        let data = await ctx.datalistIndex('News',{},{
            include: [
                {
                    model:app.model.Category,// 需要查询的模型
                    attributes:['id','name','enname'],// 查询的字段 
                },
                {
                    model:app.model.Manager,// 需要查询的模型
                    attributes:['id','username','avatar'],// 查询的字段 
                },
                {
                    model: app.model.Rolecategory,
                    as:'roleCategories',
                    attributes: {
                        exclude: ['create_time', 'update_time'],//除了这些字段，其他字段都显示
                    },
                },
                {
                    model: app.model.RolecategoryNews,
                    as:'roleCategoryLinks',
                    attributes: {
                        exclude: ['create_time', 'update_time'],//除了这些字段，其他字段都显示
                    },
                    // where: {
                    //     rolecategory_id:rolecategoryId
                    // },
                    ...include_where,
                }
            ],
            attributes: {
                // exclude: ['create_time', 'update_time'],//除了这些字段，其他字段都显示
            },
            order: [
                ['order', 'asc'],
                ['id', 'desc'],
            ],
        });
        // data = data.rules;
        data = data.list;

        // ctx.body = data;
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            title: `${siteName}新闻内容列表` ,//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                // buttons: [
                //     {
                //         url: '/admin/news/create',//新增路径
                //         desc: '发布新闻内容',//新增 //按钮名称
                //         // icon: 'fa fa-plus fa-lg',//按钮图标
                //     }
                // ],
                ...buttons,
                //表头
                columns: [
                    {
                        title: '标题/名称',
                        // key: 'name',
                        class: 'text-left',//可选
                        render(item) {
                            let type = '';
                            let imgHTML = '';
                            if(item.attachment.endsWith('.jpg') ||
                            item.attachment.endsWith('.jpeg') ||
                            item.attachment.endsWith('.png') ||
                            item.attachment.endsWith('.gif')){
                                // type = 'image';
                                imgHTML = `
                                    <a href="#" class="avatar avatar-sm mr-2">
                                        <img class="avatar-img" src="${item.attachment}" alt="User Image">
                                    </a>
                                `;
                            }else if(item.attachment.endsWith('.txt')){
                                // imgHTML = `记事本`;
                            }else{
                                // if(item.attachment){
                                //     imgHTML = `网址`;
                                // }
                            }
                            return `
                                <h2 class="table-avatar">
                                    ${imgHTML}
                                    <a href="#" > 
                                        <span title="${item.name}" style="font-size:16px">${item.name.substring(0,20)}</span>
                                        <span title="${item.description}">${item.description.substring(0,20)}</span>
                                    </a>
                                </h2>
                            `;
                        },
                    },
                    {
                        title: '所属网站栏目',
                        // key: 'category_id',
                        class: 'text-center',//可选
                        render(item) {
                            let rolecategory = ``;
                            if(item.roleCategories && item.roleCategories.length){
                                rolecategory = `
                                <span style="border:1px solid #ccc;padding:2px 5px;font-size:12px;color:#7C29FF;border-radius:5px;margin-right:15px;">
                                    ${item.roleCategories[0].name}
                                </span>`;
                            }
                            return `
                            ${rolecategory}
                            <span>${item.category.name}</span>
                            `;
                        }
                    },
                    // {
                    //     title: '哪个管理员发布的',
                    //     // key: 'username',
                    //     render(item) {
                    //         return `
                    //             <h2 class="table-avatar">
                    //             <a href="#" class="avatar avatar-sm mr-2">
                    //                 <img
                    //                     class="avatar-img rounded-circle"
                    //                     src="${item.manager.avatar}"
                    //                     alt="User Image"></a>
                    //                 <a href="#"> ${item.manager.username}
                    //                 <span>管理员id:${item.manager.id}</span></a>
                    //             </h2>
                    //         `;
                    //     },
                    // },
                    {
                        title: '浏览量',
                        key: 'lookcount',
                        class: 'text-center',//可选
                    },
                    {
                        title: '显示状态',
                        key: 'status',
                        width: 200,//可选
                        class: 'text-center',//可选
                        hidekeyData: true,//是否隐藏key对应的数据
                        render(item) {
                            console.log('可用状态里面每个item', item);
                            let arr = [
                                { value: 1, name: '显示' },
                                { value: 0, name: '隐藏' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.status}"
                                value="${arr[i].value}"
                                @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'news','News')">${arr[i].name}</button>`;
                            }
                            str += `</div>`;
                            return str;
                        }
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
                            edit: function (id) {
                                return `/admin/news/edit/${id}`;
                            },
                            //删除
                            delete: function (id) {
                                return `/admin/news/delete/${id}`;
                            }
                        }
                    },
                ],
            },
        });
    }

    //发布新闻内容界面
    async create() {
        const { ctx, app } = this;

        // 为哪个网站创建栏目
        let rolecategory = await ctx.model.Rolecategory.findAll({
            where: {
                status: 1,
            },
        });
        let fields = [];
        // ctx.body = rolecategory; return;
        if(rolecategory.length){
            rolecategory = JSON.parse(JSON.stringify(rolecategory));
            // 给rolecategory数组里面每个对象加上一个pid属性值为0
            rolecategory.forEach(item => {
                item.pid = 0;
            });
            rolecategory = ctx.treeify(rolecategory);
            // ctx.body = rolecategory; return;
            fields = [
                // 如果一旦填写了网站，则就应该有选择网站这里栏目提示要选择网站
                {
                    label: '选择网站提示',
                    type: 'text', //下拉框
                    name: 'select_rolecategory_id',
                    default: 1,
                    // placeholder: '请选择网站',
                    hidekeyData: true,//隐藏这一项，但是值会提交过去
                },
                {
                    label: '放在哪个网站里面',
                    type: 'dropdown', //下拉框
                    name: 'rolecategory_id',
                    default: JSON.stringify(rolecategory),
                    placeholder: '请选择网站',
                },
            ];
        }

        // 渲染模版前先拿到所有分类
        let data = await ctx.service.category.dropdown_Categorylist();
        // console.log('拿到所有分类', data);
        data.shift();//删除数组第一个元素
        // console.log('拿到所有分类1', data);

        // 以上情况是读取所有内容
        // 下面是如果网址里面传递了网站id, 则只读取该网站下的分类
        let gourl = ``;let sitename = ``;
        let rolecategoryId = parseInt(ctx.query.rolecategoryId) || 0;
        // ctx.body = rolecategoryId; return;
        if(rolecategoryId){
            rolecategory = await app.model.Rolecategory.findOne({
                where: {
                    id: rolecategoryId
                },
            });
            if(!rolecategory){
                return this.ctx.apiFail('数据不存在');
            }
            // ctx.body = rolecategory; return;
            // 选择网站重新处理
            fields = [
                // 如果一旦填写了网站，则就应该有选择网站这里栏目提示要选择网站
                {
                    label: '选择网站提示',
                    type: 'text', //下拉框
                    name: 'select_rolecategory_id',// 虚拟字段做判断用的
                    default: 0, // 0表示已经选择好了网站 1表示要去选择网站不选择就提示
                    // placeholder: '请选择网站',
                    hidekeyData: true,//隐藏这一项，但是值会提交过去
                },
                {
                    label: '放在哪个网站里面（此处已经通过网址选择好了，这一项省略掉但值要传过去）',
                    type: 'text', //不是下拉框了
                    name: 'rolecategory_id',
                    default: rolecategoryId,
                    placeholder: '网站的id',
                    hidekeyData: true,//隐藏这一项，但是值会提交过去
                },
            ];


            let rolecategory_category = await app.model.RolecategoryCategory.findAll({
                where: {
                    rolecategory_id: rolecategoryId
                },
            });
            let _ids = rolecategory_category.map(item => item.category_id);
            // ctx.body = _ids; return;
            let categories = await app.model.Category.findAll({
                where: {
                    id:{
                        [this.app.Sequelize.Op.in]: _ids
                    }
                },
                attributes: ['id', 'name', 'pid', 'status'],
            });
            // ctx.body = categories; return;
            // 渲染模版前先拿到当前网站的所有分类
            data = JSON.parse(JSON.stringify(categories));
            data = data.map(item => {
                return {
                    ...item,
                    value: item.id
                }
            });
            // data.unshift({ id: -1, name: '一级分类', pid: 0, status: 1, value: 0,});
            data = await ctx.treeify(data);
            // ctx.body = data; return;


            gourl = `?rolecategoryId=${rolecategoryId}`;
            sitename = rolecategory.name;
        }

        //渲染公共模版
        await ctx.renderTemplate({
            title: `发布${sitename}新闻内容`,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/admin/news/save",
                //  字段
                fields: [
                    ...fields,
                    {
                        label: '请选择一个分类栏目发布',
                        type: 'dropdown', //下拉框
                        name: 'category_id',
                        default: JSON.stringify(data),
                        placeholder: '请选择',
                    },
                    {
                        label: '标题/名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入标题/名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '标题/名称英文',
                        type: 'text',
                        name: 'enname',
                        placeholder: '请输入标题/名称英文,选填',
                    },
                    {
                        label: '内容摘要',
                        type: 'textarea',
                        name: 'description',
                        placeholder: '请输入内容摘要,选填',
                    },
                    {
                        label: '关键字',
                        type: 'text',
                        name: 'keywords',
                        placeholder: '请输入关键字（用逗号隔开）,选填',
                    },
                    {
                        label: '主体内容',
                        type: 'editor', //富文本编辑器
                        name: 'maincontent',
                        placeholder: '请输入主体内容,选填',
                    },
                    {
                        label: '内容附件/新闻内容略缩图/网址',
                        type: 'diy', //自定义类型组件
                        name: 'attachment',
                        placeholder: '请输入内容附件,选填',
                        render(item){
                            const name = item.name;
                            console.log(name);
                            return `
                            <div class="btn-group btn-group-${name}">
                                <button type="button" class="btn btn-success"
                                @click="diyBtnGroup('btn-group-${name}','btn-group-${name}-check',0)">文件</button>
                                <button type="button" class="btn btn-light"
                                @click="diyBtnGroup('btn-group-${name}','btn-group-${name}-check',1)">网址</button>
                            </div>
                            <div class="btn-group-${name}-check">
                                <div>
                                    <input class="form-control" type="file" name="${name}"
                                    @change="uploadFile($event,'${name}',(e)=>{
                                        console.log(e);
                                    })" />
                                    <div v-if="uploadedFiles.hasOwnProperty('${name}') && uploadedFiles['${name}'] ">
                                        <div v-if="uploadedFiles['${name}'].endsWith('.jpg') ||
                                            uploadedFiles['${name}'].endsWith('.jpeg')  ||
                                            uploadedFiles['${name}'].endsWith('.png')  ||
                                            uploadedFiles['${name}'].endsWith('.gif') ">
                                            <img :src="uploadedFiles['${name}']"  class="mt-2 p-1 rounded border avatar-lg" >
                                        </div>
                                        <div v-else>
                                            <span class="text-success">附件上传成功!</span>
                                        </div>
                                    </div>
                                </div>
                                <div style="display:none;">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                           <span class="input-group-text">链接地址</span>
                                        </div>
                                        <input type="text" class="form-control" 
                                        placeholder="请输入链接地址"  name='${name}'
                                        v-model="form.${name}"  />
                                    </div>
                                </div>
                                
                            </div>
                            `;
                        }
                    },
                    {
                        label: '点击量/浏览量',
                        type: 'text',
                        name: 'lookcount',
                        default:0,
                        placeholder: '请输入点击量/浏览量,选填',
                    },
                    {
                        label: '排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入排序',
                        default:50,
                    },
                    {
                        label: '内容显示状态',
                        type: 'btncheck', //按钮组选择
                        name: 'status',
                        default: JSON.stringify([
                            { value: 1, name: '显示', checked: true },
                            { value: 0, name: '隐藏' },
                        ]),
                        placeholder: '内容显示状态 0不显示 1显示 等等状态',
                    },
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: `/admin/news/index${gourl}`,
        });
    }

    //发布新闻内容数据
    async save() {
        //一般处理流程
        //1.参数验证
        this.ctx.validate({
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '标题/名称' //字段含义
            },
            enname: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '标题/名称英文'
            },
            status: {
                type: 'int',
                required: true,
                defValue: 1,
                desc: '内容显示状态 0不显示 1显示 等等状态'
            },
            category_id: {
                type: 'int',
                required: true,
                defValue: 0,
                desc: '分类id'
            },
            description: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '内容摘要'
            },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '排序'
            },
            keywords: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '关键字'
            },
            maincontent: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '主体内容'
            },
            attachment: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '内容附件'
            },
            lookcount: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '点击量/浏览量'
            },
            rolecategory_id: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '网站id'
            },
            select_rolecategory_id: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '要选择一个网站提示'
            },
        });
        //先判断一下直播功能中的礼物账号是否存在，不存在在写入数据库
        //2.写入数据库
        //3.成功之后给页面反馈
        let { name, enname, status, category_id,description,order,
            keywords,maincontent,attachment, lookcount,
            rolecategory_id,select_rolecategory_id} = this.ctx.request.body;

        // 有rolecategory_id则写入中间表
        if(select_rolecategory_id && !rolecategory_id){
            return this.ctx.apiFail('请选择一个网站');
        }

        if (await this.app.model.News.findOne({ 
            where: { 
                name,
                category_id
            } 
        })) {
            return this.ctx.apiFail('已存在同一个分类的内容，不能重复发布');
        }
        //否则不存在则写入数据库
        const manager_id = this.ctx.session.auth.id;
        const res = await this.app.model.News.create({
            name,
            enname,
            status,
            category_id,
            description,
            order,
            keywords,maincontent,attachment, lookcount,
            manager_id
        });

        // 写入中间表
        if (rolecategory_id) {
            await this.app.model.RolecategoryNews.create({
                rolecategory_id: rolecategory_id,
                news_id: res.id
            });
        }

        this.ctx.apiSuccess('发布新闻内容成功');
    }

    //删除新闻内容
    async delete() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        await app.model.News.destroy({
            where: {
                id
            }
        });
        //提示
        ctx.toast('删除新闻内容成功', 'success');
        //跳转
        ctx.redirect('/admin/news/index');
    }

    //修改新闻内容界面
    async edit() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let currentdata = await app.model.News.findOne({
            where: {
                id
            }
        });
        if (!currentdata) {
            return ctx.apiFail('该内容不存在');
        }
        currentdata = JSON.parse(JSON.stringify(currentdata));
        // console.log('当前内容数据', currentdata);
        // ctx.body = currentdata;
        // return;

        // 查中间表得到网站id
        let rolecategorynews = await app.model.RolecategoryNews.findOne({
            where: {
                news_id: id
            }
        });
        // ctx.body = rolecategorynews;
        // return;
        let rolecategory = await app.model.Rolecategory.findOne({
            where: {
                id: rolecategorynews.rolecategory_id
            }
        });
        // ctx.body = rolecategory;
        // return;

        // 渲染模版前先拿到所有分类
        // let data = await ctx.service.category.dropdown_Categorylist();
        // data.shift();
        // console.log('下拉框显示的所有分类', JSON.stringify(data));
        // return;

        // 渲染模版前先拿到当前网站的所有分类
        let rolecategory_category = await app.model.RolecategoryCategory.findAll({
            where: {
                rolecategory_id: rolecategorynews.rolecategory_id
            }
        });
        // ctx.body = rolecategory_category;
        // return;
        // 将rolecategory_category中的category_id组合成新数组
        let _ids = rolecategory_category.map(item => parseInt(item.category_id));
        // ctx.body = _ids;
        // return;
        let data = await ctx.model.Category.findAll({
            where: {
                id: {
                    [this.app.Sequelize.Op.in] : _ids
                }
            }
        });
        data = JSON.parse(JSON.stringify(data));
        data = ctx.treeify(data);
        // ctx.body = data;
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改' + rolecategory.name + '的内容',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改内容提交地址
                action: '/admin/news/update/' + id,
                //  字段
                fields: [
                    {
                        label: '请选择一个分类栏目发布',
                        type: 'dropdown', //下拉框
                        name: 'category_id',
                        default: JSON.stringify(data),
                        placeholder: '请选择',
                    },
                    {
                        label: '标题/名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入标题/名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '标题/名称英文',
                        type: 'text',
                        name: 'enname',
                        placeholder: '请输入标题/名称英文,选填',
                    },
                    {
                        label: '内容摘要',
                        type: 'textarea',
                        name: 'description',
                        placeholder: '请输入内容摘要,选填',
                    },
                    {
                        label: '关键字',
                        type: 'text',
                        name: 'keywords',
                        placeholder: '请输入关键字（用逗号隔开）,选填',
                    },
                    {
                        label: '主体内容',
                        type: 'editor', //富文本编辑器
                        name: 'maincontent',
                        placeholder: '请输入主体内容,选填',
                    },
                    {
                        label: '内容附件',
                        type: 'diy', //自定义类型组件
                        name: 'attachment',
                        placeholder: '请输入内容附件,选填',
                        render(item){
                            const name = item.name;
                            console.log(name);
                            return `
                            <div class="btn-group btn-group-${name}">
                                <button type="button" class="btn btn-success"
                                @click="diyBtnGroup('btn-group-${name}','btn-group-${name}-check',0)">文件</button>
                                <button type="button" class="btn btn-light"
                                @click="diyBtnGroup('btn-group-${name}','btn-group-${name}-check',1)">网址</button>
                            </div>
                            <div class="btn-group-${name}-check">
                                <div>
                                    <input class="form-control" type="file" name="${name}"
                                    @change="uploadFile($event,'${name}',(e)=>{
                                        console.log(e);
                                    })" />
                                    <div v-if="uploadedFiles.hasOwnProperty('${name}') && uploadedFiles['${name}'] ">
                                        <div v-if="uploadedFiles['${name}'].endsWith('.jpg') ||
                                            uploadedFiles['${name}'].endsWith('.jpeg')  ||
                                            uploadedFiles['${name}'].endsWith('.png')  ||
                                            uploadedFiles['${name}'].endsWith('.gif') ">
                                            <img :src="uploadedFiles['${name}']"  class="mt-2 p-1 rounded border avatar-lg" >
                                        </div>
                                        <div v-else>
                                            <span class="text-success">附件上传成功!</span>
                                        </div>
                                    </div>
                                </div>
                                <div style="display:none;">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                           <span class="input-group-text">链接地址</span>
                                        </div>
                                        <input type="text" class="form-control" 
                                        placeholder="请输入链接地址"  name='${name}'
                                        v-model="form.${name}"  />
                                    </div>
                                </div>
                                
                            </div>
                            `;
                        }
                    },
                    {
                        label: '点击量/浏览量',
                        type: 'text',
                        name: 'lookcount',
                        default:0,
                        placeholder: '请输入点击量/浏览量,选填',
                    },
                    {
                        label: '排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入排序',
                        default:50,
                    },
                    {
                        label: '内容显示状态',
                        type: 'btncheck', //按钮组选择
                        name: 'status',
                        default: JSON.stringify([
                            { value: 1, name: '显示', checked: true },
                            { value: 0, name: '隐藏' },
                        ]),
                        placeholder: '内容显示状态 0不显示 1显示 等等状态',
                    },
                ],
                //修改内容默认值
                data:currentdata,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/admin/news/index',
        });

    }
    
    //修改新闻内容提交数据
    async update() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '内容id'
            },
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '标题/名称' //字段含义
            },
            enname: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '标题/名称英文'
            },
            status: {
                type: 'int',
                required: true,
                defValue: 1,
                desc: '内容显示状态 0不显示 1显示 等等状态'
            },
            category_id: {
                type: 'int',
                required: true,
                defValue: 0,
                desc: '分类id'
            },
            description: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '内容摘要'
            },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '排序'
            },
            keywords: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '关键字'
            },
            maincontent: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '主体内容'
            },
            attachment: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '内容附件'
            },
            lookcount: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '点击量/浏览量'
            }
        });

        // 参数
        const id = ctx.params.id;
        let { name, enname, status, category_id,description,order,
            keywords,maincontent,attachment, lookcount} = this.ctx.request.body;
        // 先看一下是否存在
        const news = await app.model.News.findOne({ where: { id } });
        if (!news) {
            return ctx.apiFail('该内容记录不存在');
        }
        //存在，内容名称可以一样，只要保证它在不同的分类下面
        const Op = this.app.Sequelize.Op;//拿Op,固定写法
        //先查一下修改的内容名称，是否已经存在，如果存在，但是只要不放在同一分类下还是可以的
        const hasdata = await app.model.News.findOne({
            where: {
                name,
                id: {
                    [Op.ne]: id
                }
            }
        });
        if (hasdata && hasdata.category_id == category_id) {
            return ctx.apiFail('同一个分类下不能有相同的内容名称');
        }
        // 修改数据
        news.name = name;
        news.enname = enname;
        news.status = status;
        news.category_id = category_id;
        news.description = description;
        news.order = order;
        news.keywords = keywords; 
        news.maincontent = maincontent; 
        news.attachment = attachment; 
        news.lookcount = lookcount;  
        
        await news.save();


        /*
        let params  = this.ctx.request.body;
        await news.update(params,{
            // fields:['name'],//指定修改字段
        });
        */

        // 给一个反馈
        ctx.apiSuccess('修改内容成功');
    }

}

module.exports = NewsController;

```


## 三、代码说明
大家最好跟着老师的文档，自己写一下这些功能，然后对照着上面的代码看一下，如果不想写代码，只想要这个功能，可以下载本节课的课件，课件里面就有本节课所有的代码，大家把数据库覆盖一下，然后运行代码就可以看到本节课的效果了。