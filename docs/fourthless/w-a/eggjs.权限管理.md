---
navbar: true
sidebar: auto
title: eggjs权限管理
---
## 一、创建权限

### 1. 新建路由
`app/router/admin/shop.js`
```js
    //删除权限功能
    router.get('/shop/admin/rule/:id/delete', controller.admin.rule.delete);
    //修改权限状态功能
    router.post('/shop/admin/rule/:id/update_status',controller.admin.rule.updateStatus);
    //修改权限界面
    router.get('/shop/admin/rule/edit/:id', controller.admin.rule.edit);
    //修改权限数据功能
    router.post('/shop/admin/rule/:id', controller.admin.rule.update);
    // 创建权限界面
    router.get('/shop/admin/rule/create', controller.admin.rule.create);
    //创建权限提交数据
    router.post('/shop/admin/rule', controller.admin.rule.save);
    //权限列表页面
    router.get('/shop/admin/rule', controller.admin.rule.index);
```

### 2. 新建控制器
`app/controller/admin/rule.js`
```js
'use strict';

const Controller = require('egg').Controller;

class RuleController extends Controller {
    // 创建权限界面
    async create() {
        const { ctx, app } = this;

        // 渲染模版前先拿到所有权限
        let data = await ctx.service.rule.dropdown_Rulelist();
        //渲染公共模版
        await ctx.renderTemplate({
            title: '创建权限表单',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/shop/admin/rule",
                //  字段
                fields: [
                    {
                        label: '放在哪个权限里面',
                        type: 'dropdown', //下拉框
                        name: 'pid',
                        default: JSON.stringify(data),
                        placeholder: '一级权限',
                    },
                    {
                        label: '后台栏目或者功能名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入后台栏目或者功能名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '前端路由name值',
                        type: 'text',
                        name: 'frontname',
                        placeholder: '请输入前端路由name值，选填',
                    },
                    {
                        label: '前端路由路径',
                        type: 'text',
                        name: 'frontpath',
                        placeholder: '请输入前端路由路径,选填',
                    },
                    {
                        label: '路由方法',
                        type: 'text',
                        name: 'condition',
                        placeholder: '请输入路由方法,选填',
                    },
                    {
                        label: '菜单/规则',
                        type: 'btncheck', //按钮组选择
                        name: 'menu',
                        default: JSON.stringify([
                            { value: 1, name: '菜单' , checked: true },
                            { value: 0, name: '规则'},
                        ]),
                        placeholder: '0规则 1菜单',
                    },
                    {
                        label: '权限排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入权限排序',
                        default: 50,
                    },
                    {
                        label: '图标',
                        type: 'text',
                        name: 'icon',
                        placeholder: '请输入图标,选填',
                    },
                    {
                        label: '请求类型',
                        type: 'btncheck',
                        name: 'method',
                        default: JSON.stringify([
                            { value: 'GET', name: 'GET'},
                            { value: 'POST', name: 'POST', checked: true},
                            { value: 'PUT', name: 'PUT'},
                            { value: 'DELETE', name: 'DELETE'},
                        ]),
                        placeholder: '请求类型：GET POST PUT DELETE,选填，默认POST',
                    },
                    {
                        label: '可用状态',
                        type: 'btncheck', //按钮组选择
                        name: 'status',
                        default: JSON.stringify([
                            { value: 1, name: '可用', checked: true },
                            { value: 0, name: '不可用' },
                        ]),
                        placeholder: '分类状态 0不可用 1可用 等等状态',
                    },
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '/shop/admin/rule',
        });
    }
    // 创建权限提交数据
    async save() {
        //一般处理流程
        //1.参数验证
        this.ctx.validate({
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '权限名称', //字段含义
                range:{
                    min:2,
                    max:100
                },
            },
            frontname: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '前端路由name值'
            },
            status: {
                type: 'int',
                required: true,
                defValue: 1,
                desc: '状态 0不可用 1可用 ',
                range:{
                    in:[0,1]
                },
            },
            pid: {
                type: 'int',
                required: true,
                defValue: 0,
                desc: '上一级(父级)id'
            },
            frontpath: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '前端路由路径'
            },
            condition: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '路由方法'
            },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '排序'
            },
            menu: {
                type: 'int',
                required: true,
                defValue: 1,
                desc: '0规则 1菜单',
                range:{
                    in:[0,1]
                },
            },
            icon: {
                type: 'string',  //参数类型
                required: false, //是否必须
                defValue: '', 
                desc: '图标', //字段含义
                range:{
                    min:0,
                    max:100
                },
            },
            method: {
                type: 'string',
                required: false,
                defValue: 'POST',
                desc: '请求类型：GET POST PUT DELETE',
                range:{
                    in:['GET','POST','PUT','DELETE']
                },
            },
        });
        //先判断一下是否存在，不存在在写入数据库
        //2.写入数据库
        //3.成功之后给页面反馈
        let { name, frontname, status, pid,frontpath,condition,order, menu,icon,method} = this.ctx.request.body;
        if (await this.app.model.Rule.findOne({ where: { name } })) {
            return this.ctx.apiFail('权限名称已存在');
        }
        //否则不存在则写入数据库
        const res = await this.app.model.Rule.create({
            name, frontname, status, pid,frontpath,
            condition,order, menu,icon,method
        });
        this.ctx.apiSuccess('创建权限成功');
    }
    // 权限列表页面
    async index() { }
    //修改权限界面
    async edit() { }
    //修改权限数据功能
    async update() { }
    // 修改权限状态功能
    async updateStatus() { }
    // 删除权限功能
    async delete() { }


}

module.exports = RuleController;

```

### 3. 新建服务
`app/service/rule.js`
```js
'use strict';

const Service = require('egg').Service;

class RuleService extends Service {
    //下拉框获取所有权限
    async dropdown_Rulelist() {
        let data = await this.rulelist();
        data = this.app.transformToTree(data);
        // console.log('处理之后的权限', JSON.stringify(data));
        return data;
    }
    //获取所有权限
    async rulelist() {
        const { ctx, app } = this;
        // 渲染模版前先拿到所有权限
        let data = await ctx.app.model.Rule.findAll({
            where: {
                status: 1
            },
            // attributes: ['id', 'name'],
            // 排查字段
            attributes:{
                exclude: ['create_time','update_time'],//排除字段
            },
            
        });
        data = JSON.parse(JSON.stringify(data));
        data.unshift({ id: 0, name: '一级权限', pid: 0, status: 1, value: 0 });
        data = data.map(item => {
            return {
                ...item,
                value: item.id
            }
        });
        // console.log('所有权限', data);
        return data;
    }
}

module.exports = RuleService;
```
### 4. 新建模型
`app/model/rule.js`
```js
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const Rule = app.model.define('rule', {
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
        },
        status: {
            type: INTEGER(1),
            allowNull: false,
            defaultValue: 1,
            comment: '分类状态 0不可用 1可用'
        },
        name: {
            type: STRING(100),
            allowNull: false,
            defaultValue: '',
            comment: '后台栏目或者功能名称'
        },
        frontname: {
            type: STRING(100),
            allowNull: true,
            defaultValue: '',
            comment: '前端路由name值'
        },
        frontpath: {
            type: STRING(100),//不限定长度.默认varchar(255)
            allowNull: true,
            defaultValue: '',
            comment: '前端路由路径'
        },
        condition: {
            type: STRING,//不限定长度.默认varchar(255)
            allowNull: true,
            defaultValue: '',
            comment: '路由方法'
        },
        menu: {
            type: INTEGER(1),
            allowNull: false,
            defaultValue: 1,
            comment: '0规则 1菜单'
        },
        order: {
            type: INTEGER,//不限定长度.默认int(11)
            allowNull: true,
            defaultValue: 50,
            comment: '分类排序，默认50'
        },
        icon: {
            type: STRING(100),
            allowNull: true,
            defaultValue: '',
            comment: '图标'
        },
        method: {
            type: STRING(30),//不限定长度.默认varchar(255)
            allowNull: false,
            defaultValue: 'POST',
            comment: '请求类型：GET POST PUT DELETE'
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

    return Rule;
}
```



## 二、权限列表
字体图标，查看：<https://fontawesome.dashgame.com/>