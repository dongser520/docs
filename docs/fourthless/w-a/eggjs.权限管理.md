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



## 二、权限列表和修改权限状态
字体图标，查看：<https://fontawesome.dashgame.com/>
### 1. 后台菜单
`data/root.json`
```json
...
{"id":17,"pid":0, "name": "商城", "icon": "fa fa-shopping-cart", "url": "" },
{"id":18,"pid":17, "name": "角色管理", "icon": "fa fa-users", "url": "/shop/admin/role" },
{"id":19,"pid":17, "name": "管理员管理", "icon": "fa fa-user-circle-o", "url": "/shop/admin/shopmanager" },
{"id":20,"pid":17, "name": "权限管理", "icon": "fa fa-legal", "url": "/shop/admin/rule" }
```
### 2. 控制器
`app/controller/admin/rule.js`
```js
    // 权限列表页面
    async index() {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        // let data = await ctx.page('Category');
        let data = await ctx.service.rule.datalist({ limit: 1000 });
        // console.log('权限数据', data);
        // return;
        data = data.rules;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '权限列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/shop/admin/rule/create',//新增路径
                        desc: '新增权限',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    }
                ],
                //表头
                columns: [
                    {
                        title: '权限名称',
                        key: 'name',
                        class: 'text-left',//可选
                        render(item) { //树形数据
                            // console.log('每个item',item);
                            if (item.level) {
                                let w = item.level * 40;
                                return `<span style="display:inline-block;width:${w}px"></span>`;
                            }
                        }
                    },
                    // {
                    //     title: '是否是导航栏栏目',
                    //     key: 'isnav',
                    //     width: 200,//可选
                    //     class: 'text-center',//可选
                    //     hidekeyData: true,//是否隐藏key对应的数据
                    //     render(item) {
                    //         console.log('可用状态里面每个item', item);
                    //         let arr = [
                    //             { value: 1, name: '是' },
                    //             { value: 0, name: '否' },
                    //         ];
                    //         let str = `<div class="btn-group btn-group-${item.id}">`;
                    //         for (let i = 0; i < arr.length; i++) {
                    //             str += `<button type="button" class="btn btn-light" data="${item.isnav}"
                    //             value="${arr[i].value}"
                    //             @click="changeBtnStatus('isnav','btn-group-${item.id}',${arr[i].value},${i},${item.id},'category','Category')">${arr[i].name}</button>`;
                    //         }
                    //         str += `</div>`;
                    //         return str;
                    //     }
                    // },
                    {
                        title: '前端路由name值',
                        key: 'frontname',
                        class: 'text-center',//可选
                    },
                    {
                        title: '前端路由路径',
                        key: 'frontpath',
                        class: 'text-center',//可选
                    },
                    {
                        title: '路由方法',
                        key: 'condition',
                        class: 'text-center',//可选
                    },
                    {
                        title: '图标',
                        key: 'icon',
                        class: 'text-center',//可选
                    },
                    {
                        title: '请求类型',
                        key: 'method',
                        class: 'text-center',//可选
                    },
                    {
                        title: '排序',
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
                            // console.log('可用状态里面每个item', item);
                            let arr = [
                                { value: 1, name: '可用' },
                                { value: 0, name: '不可用' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.status}"
                                value="${arr[i].value}"
                                @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/shop/admin/rule','Rule')">${arr[i].name}</button>`;
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
                                return `/shop/admin/rule/edit/${id}`;
                            },
                            //删除
                            delete: function (id) {
                                return `/shop/admin/rule/${id}/delete`;
                            }
                        }
                    },
                ],
            },
        });
    }
    // 修改权限状态功能
    async updateStatus(){
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '权限id'
            },
            status: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '权限状态', //字段含义
                range:{
                    in:[0,1]
                },
            },
        });
        // 参数
        const id = ctx.params.id;
        const { status } = ctx.request.body;
        // 是否存在
        const data = await app.model.Rule.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('权限不存在');
        }
        // 修改数据
        data.status = status;
        
        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改权限状态成功');
    }
```

### 3. 服务
`app/service/rule.js`
```js
    //权限数据
    async datalist(options) {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        let data = await ctx.page('Rule', {}, {
            order: [
                ['order', 'asc'],
                ['id', 'asc'],
            ],
            attributes: {
                exclude: ['create_time', 'update_time'],//除了这些字段，其他字段都显示
            },
            limit: options && options.limit ? options.limit : 1000,
        });
        // 转一下data处理
        let list = JSON.parse(JSON.stringify(data));
        // console.log('list', list);
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
        }

    }
```

## 三、修改权限
### 1. 控制器
`app/controller/admin/rule.js`
```js
    // 修改权限界面
    async edit() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let currentdata = await app.model.Rule.findOne({
            where: {
                id
            }
        });
        if (!currentdata) {
            return ctx.apiFail('该权限不存在');
        }
        currentdata = JSON.parse(JSON.stringify(currentdata));
        // console.log('当前权限数据', currentdata);
        // return;

        // 渲染模版前先拿到所有权限
        let data = await ctx.service.rule.dropdown_Rulelist();
        // console.log('下拉框显示的所有权限', JSON.stringify(data));
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改权限:' + currentdata.name,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改直播功能中的礼物提交地址
                action: '/shop/admin/rule/' + id,
                //  字段
                fields: [
                    {
                        label: '放在哪个权限里面',
                        type: 'dropdown', //下拉框
                        name: 'pid',
                        default: JSON.stringify(data),
                        placeholder: '不调整（如需调整请选择）',
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
                        placeholder: '请输入前端路由name值,选填',
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
                            { value: 1, name: '菜单', checked: currentdata.menu === 1 },
                            { value: 0, name: '规则', checked: currentdata.menu === 0 },
                        ]),
                        placeholder: '分类状态 0不可用 1可用 等等状态',
                    },
                    {
                        label: '权限排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入排序，默认50',
                        default:50,
                    },
                    {
                        label: '图标',
                        type: 'text',
                        name: 'icon',
                        placeholder: '请输入图标,选填',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '请求类型',
                        type: 'btncheck', //按钮组选择
                        name: 'method',
                        default: JSON.stringify([
                            { value: 'GET', name: 'GET', checked: currentdata.method === 'GET' },
                            { value: 'POST', name: 'POST', checked: currentdata.method === 'POST' },
                            { value: 'PUT', name: 'PUT',checked: currentdata.method === 'PUT' },
                            { value: 'DELETE', name: 'DELETE',checked: currentdata.method === 'DELETE' },
                        ]),
                        placeholder: '请求类型：GET POST PUT DELETE',
                    },
                    {
                        label: '可用状态',
                        type: 'btncheck', //按钮组选择
                        name: 'status',
                        default: JSON.stringify([
                            { value: 1, name: '可用',  checked: currentdata.status === 1},
                            { value: 0, name: '不可用' , checked: currentdata.status === 0},
                        ]),
                        placeholder: '状态 0不可用 1可用 等等状态',
                    },
                ],
                //修改内容默认值
                data:currentdata,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/shop/admin/rule',
        });

    }
    // 修改权限数据功能
    async update() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '权限id'
            },
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '后台栏目或者功能名称', //字段含义
                range:{
                    min:2,
                    max:100
                },
            },
            frontname: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '前端路由name值',
                range:{
                    min:0,
                    max:100
                },
            },
            frontpath: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '前端路由路径',
                range:{
                    min:0,
                    max:100
                },
            },
            status: {
                type: 'int',
                required: false,
                defValue: 1,
                desc: '状态 0不可用 1可用 等等状态',
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
            condition: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '路由方法'
            },
            menu: {
                type: 'int',
                required: false,
                defValue: 1,
                desc: '0规则 1菜单',
                range:{
                    in:[0,1]
                },
            },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '分类排序'
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
                type: 'string',  //参数类型
                required: false, //是否必须
                defValue: 'POST', 
                desc: '请求类型', //字段含义
                range:{
                    in:['GET', 'POST', 'PUT', 'DELETE'],
                },
            },
        });

        // 参数
        const id = ctx.params.id;
        const {  name, frontname, status, pid,frontpath,order,
            condition, menu,icon,method } = ctx.request.body;
        // 先看一下是否存在
        const data = await app.model.Rule.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('该权限记录不存在');
        }
        //存在，权限名称可以一样，只要保证它在不同的分类下面
        const Op = this.app.Sequelize.Op;//拿Op,固定写法
        //先查一下修改的分类名称，是否已经存在，如果存在，但是只要不放在同一分类下还是可以的
        const hasdata = await app.model.Category.findOne({
            where: {
                name,
                id: {
                    [Op.ne]: id
                }
            }
        });
        if (hasdata && hasdata.pid == pid) {
            return ctx.apiFail('同一级别权限下不能有相同的权限名称');
        }
        // 修改数据
        data.name = name;
        data.frontname = frontname;
        data.status = status;
        data.pid = pid;
        data.frontpath = frontpath;
        data.order = order; 
        data.condition = condition; 
        data.menu = menu;
        data.icon = icon; 
        data.method = method; 

        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改权限成功');
    }
```


## 四、权限列表API
### 1. 新建路由
`app/router/admin/shop.js`
```js
    ...
    //权限列表页面
    router.get('/shop/admin/rule/:page', controller.admin.rule.indexAPI);
    ...
```
### 2.控制器
`app/controller/admin/rule.js`
```js
    // 权限列表页面API接口
    async indexAPI(){
        const { ctx, app } = this;
        let rule = await app.model.Rule.findAll({
            where: {
                status: 1
            }
        });
        rule = ctx.treeify(JSON.parse(JSON.stringify(rule)));
        // ctx.body = rule;
        ctx.apiSuccess(rule);
    }
```
