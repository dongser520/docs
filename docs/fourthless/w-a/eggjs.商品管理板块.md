---
navbar: true
sidebar: auto
title: eggjs商品管理板块
---

前言
> 有了我们前面章节学习的管理员、角色、权限板块及图片分类、图片管理，这些数据库创建及开发流程，我们接下来学习商品管理板块，应该是更加信手拿捏了，商品管理板块，包括商品分类、商品规格、单个商品管理等的一个操作，下面我们就来学习一下商品管理板块的开发。

## 一、 创建商品分类表 goods_class
> 具体`商品分类表：goods_class`设计，<a href="/web/mysql/goods_class.html#一、goods-class-商品分类表-字段设计" target="_blank">点击查看</a><br/>

## 二、创建商品分类
### 1. 路由
`app/router/admin/shop.js`
```js
module.exports = app => {
    ...
    //删除商品分类功能
    router.post('/shop/admin/goodsclass/:id/delete', controller.admin.goodsClass.deleteAPI);
    router.get('/shop/admin/goodsclass/:id/delete', controller.admin.goodsClass.delete);
    //修改商品分类状态功能
    router.post('/shop/admin/goodsclass/:id/update_status',controller.admin.goodsClass.updateStatus);
    //修改商品分类界面
    router.get('/shop/admin/goodsclass/edit/:id', controller.admin.goodsClass.edit);
    //修改商品分类数据功能
    router.post('/shop/admin/goodsclass/:id', controller.admin.goodsClass.update);
    // 创建商品分类界面
    router.get('/shop/admin/goodsclass/create', controller.admin.goodsClass.create);
    //创建商品分类提交数据
    router.post('/shop/admin/goodsclass', controller.admin.goodsClass.save);
    //商品分类列表页面
    router.get('/shop/admin/goodsclass/:page', controller.admin.goodsClass.indexAPI);
    router.get('/shop/admin/goodsclass', controller.admin.goodsClass.index);
    
};
```

### 2. 新建模型
`app/model/goods_class.js`
```js
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const GoodsClass = app.model.define('goods_class', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键id'
        },
        pid: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            comment: '上一级(父级)id',
        },
        name: {
            type: STRING(30),
            allowNull: false,
            defaultValue: '',
            comment: '商品分类名称'
        },
        desc: {
            type: STRING(255),
            allowNull: true,
            defaultValue: '',
            comment: '商品分类描述，对商品分类的简单介绍'
        },
        order: {
            type: INTEGER,//不限定长度.默认int(11)
            allowNull: true,
            defaultValue: 50,
            comment: '排序，默认50'
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
    GoodsClass.associate = function (models) {
        // 关联到自己 （通过pid关联）
        this.hasMany(app.model.GoodsClass, {
            foreignKey: 'pid',
            as: 'ChildGoodsClass' // 别名（可选）
        });

        // 关联图片模型
        // this.hasMany(app.model.Image, {
        //     foreignKey: 'image_class_id',
        //     // as: 'images' // 别名（可选）
        // });


    }

    return GoodsClass;
}
```

### 3. 新建控制器
`app/controller/admin/goods_class.js`
```js
'use strict';

const Controller = require('egg').Controller;

class Goods_classController extends Controller {
    // 创建商品分类界面
    async create() {
        const { ctx, app } = this;

        // 渲染模版前先拿到所有分类
        let data = await ctx.service.goodsClass.dropdown_goodsclass_list();
        //渲染公共模版
        await ctx.renderTemplate({
            title: '创建商品分类表单',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/shop/admin/goodsclass",
                //  字段
                fields: [
                    {
                        label: '放在哪个分类里面',
                        type: 'dropdown', //下拉框
                        name: 'pid',
                        default: JSON.stringify(data),
                        placeholder: '',
                    },
                    {
                        label: '商品分类名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入商品分类名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '商品分类描述',
                        type: 'textarea',
                        name: 'desc',
                        placeholder: '请输入商品分类描述，选填',
                    },
                    {
                        label: '排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入排序',
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
                        placeholder: '分类状态 0不可用 1可用 等等状态',
                    },
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '/shop/admin/goodsclass',
        });
    }
    //创建商品分类提交数据
    async save() {
        const { ctx, app } = this;
        //一般处理流程
        //1.参数验证
        this.ctx.validate({
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '商品分类名称', //字段含义
                range:{
                    min:2,
                    max:30
                }
            },
            desc: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '商品分类描述',
                range:{
                    min:0,
                    max:255
                }
            },
            status: {
                type: 'int',
                required: false,
                defValue: 1,
                desc: '分类状态 0不可用 1可用 等等状态',
                range:{
                    in:[0,1]
                }
            },
            pid: {
                type: 'int',
                required: true,
                defValue: 0,
                desc: '上一级(父级)id'
            },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '分类排序'
            }
        });
        //先判断一下直播功能中的礼物账号是否存在，不存在在写入数据库
        //2.写入数据库
        //3.成功之后给页面反馈
        let { name, desc, status, pid,order } = this.ctx.request.body;
        // if (await this.app.model.GoodsClass.findOne({ where: { name } })) {
        //     return this.ctx.apiFail('分类名称已存在');
        // }
        const Op = this.app.Sequelize.Op;//拿Op,固定写法
        //分类名称，是否已经存在，如果存在，但是只要不放在同一分类下还是可以的
        const hasdata = await app.model.GoodsClass.findOne({
            where: {
                name,
                pid:pid
            }
        });
        if (hasdata) {
            return ctx.apiFail('同一个分类下不能有相同的分类名称');
        }
        //否则不存在则写入数据库
        const res = await this.app.model.GoodsClass.create({
            name,
            desc,
            status,
            pid,
            order
        });
        this.ctx.apiSuccess('创建商品分类成功');
    }
    //商品分类列表页面
    async index() {
        
    }
    // 商品分类列表api
    async indexAPI() {
        
    }
    //修改商品分类界面
    async edit() {
        
    }
    //修改商品分类数据功能
    async update() {
        
    }
    //修改商品分类状态功能
    async updateStatus() {
        
    }
    //删除商品分类功能
    async delete() {
        
    }
    //删除商品分类功能api
    async deleteAPI() {
        
    }
}

module.exports = Goods_classController;

```

### 4. 新建服务
`app/service/goods_class.js`
```js
'use strict';

const Service = require('egg').Service;

class Goods_classService extends Service {
    
    //下拉框获取所有分类
    async dropdown_goodsclass_list() {
        let data = await this.goodsclass_list();
        data = this.app.transformToTree(data);
        // console.log('处理之后的分类', JSON.stringify(data));
        return data;
    }

    //获取所有分类
    async goodsclass_list() {
        const { ctx, app } = this;
        // 渲染模版前先拿到所有分类
        let data = await ctx.app.model.GoodsClass.findAll({
            where: {
                status: 1
            },
            attributes: ['id', 'name', 'pid', 'status', 'desc', 'order'],
        });
        data = JSON.parse(JSON.stringify(data));
        data.unshift({ id: 0, name: '一级分类', pid: 0, status: 1, value: 0 });
        data = data.map(item => {
            return {
                ...item,
                value: item.id
            }
        });
        // console.log('所有分类', data);
        return data;
    }
}

module.exports = Goods_classService;

```

## 三、商品分类列表数据、修改、修改状态、删除
### 1. 字体图标查看 <https://fontawesome.dashgame.com/>
### 2. 后台左侧菜单
`data/root.json`
```json
[
    ...
    {"id":22,"pid":17, "name": "商品分类管理", "icon": "fa fa-shopping-bag", "url": "/shop/admin/goodsclass" }
]
```

### 3. 控制器
`app/controller/admin/goods_class.js`
```js
    //商品分类列表页面
    async index() {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        // let data = await ctx.page('Category');
        let data = await ctx.service.goodsClass.datalist({ limit: 10000 });
        // console.log('分类数据', data);
        // ctx.body = data;
        // return;
        data = data.rules;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '商品分类列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/shop/admin/goodsclass/create',//新增路径
                        desc: '创建商品分类',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    },
                    // {
                    //     url: '/shop/admin/image/create',//新增路径
                    //     desc: '上传商品',//新增 //按钮名称
                    //     // icon: 'fa fa-plus fa-lg',//按钮图标
                    // }
                ],
                //表头
                columns: [
                    {
                        title: '商品分类名称',
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
                    //     title: '分类下的商品',
                    //     // key: 'name',
                    //     class: 'text-left',//可选
                    //     render(item) { //树形数据
                    //         // console.log('每个item',item);
                    //         // if (item.level) {
                    //         //     let w = item.level * 40;
                    //         //     return `<span style="display:inline-block;width:${w}px"></span>`;
                    //         // }
                    //         return `<a href="/shop/admin/imageclass/${item.id}/imgList">${item.images.length}张</a>`;
                    //     }
                    // },
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
                        title: '分类排序',
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
                                @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/shop/admin/goodsclass','GoodsClass')">${arr[i].name}</button>`;
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
                                return `/shop/admin/goodsclass/edit/${id}`;
                            },
                            //删除
                            delete: function (id) {
                                return `/shop/admin/goodsclass/${id}/delete`;
                            }
                        }
                    },
                ],
            },
        });
    }
    //商品分类列表页面api
    async indexAPI() {
        const { ctx, app } = this;
        let limit = parseInt(ctx.query.limit) || 10000;
        let data = await app.model.GoodsClass.findAll({
            where:{
                status:1,
            },
            limit: limit,
            order: [
                ['order', 'asc'],
                ['id', 'desc'],
            ],
        });
        data = ctx.treeify(JSON.parse(JSON.stringify(data)));    
        // ctx.body = data;
        ctx.apiSuccess(data);
    }
    //修改商品分类界面
    async edit() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let currentdata = await app.model.GoodsClass.findOne({
            where: {
                id
            }
        });
        if (!currentdata) {
            return ctx.apiFail('该商品分类不存在');
        }
        currentdata = JSON.parse(JSON.stringify(currentdata));
        // console.log('当前商品分类数据', currentdata);
        // return;

        // 渲染模版前先拿到所有分类
        let data = await ctx.service.goodsClass.dropdown_goodsclass_list();
        // console.log('下拉框显示的所有分类', JSON.stringify(data));
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改商品分类:' + currentdata.name,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: '/shop/admin/goodsclass/' + id,
                //  字段
                fields: [
                    {
                        label: '放在哪个商品分类里面',
                        type: 'dropdown', //下拉框
                        name: 'pid',
                        default: JSON.stringify(data),
                        placeholder: '不调整（如需调整请选择）',
                    },
                    {
                        label: '商品分类名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入商品分类名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '商品分类描述',
                        type: 'textarea',
                        name: 'desc',
                        placeholder: '请输入商品分类描述，选填',
                    },
                    {
                        label: '排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入排序',
                        default:50,
                    },
                    {
                        label: '可用状态',
                        type: 'btncheck', //按钮组选择
                        name: 'status',
                        default: JSON.stringify([
                            { value: 1, name: '可用', checked: currentdata.status === 1 },
                            { value: 0, name: '不可用', checked: currentdata.status === 0 },
                        ]),
                        placeholder: '状态 0不可用 1可用 等等状态',
                    },
                ],
                //修改内容默认值
                data:currentdata,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/shop/admin/goodsclass',
        });

    }
    //修改商品分类数据功能
    async update() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '商品分类id'
            },
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '商品分类名称', //字段含义
                range:{
                    min:2,
                    max:30
                }
            },
            desc: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '商品分类描述',
                range:{
                    min:0,
                    max:255
                }
            },
            status: {
                type: 'int',
                required: false,
                defValue: 1,
                desc: '分类状态 0不可用 1可用 等等状态',
                range:{
                    in:[0,1]
                }
            },
            pid: {
                type: 'int',
                required: true,
                defValue: 0,
                desc: '上一级(父级)id'
            },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '分类排序'
            }
        });

        // 参数
        const id = ctx.params.id;
        const {  name, desc, status, pid,order } = ctx.request.body;
        // 先看一下是否存在
        let data = await app.model.GoodsClass.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('该商品分类记录不存在');
        }
        //存在
        const Op = this.app.Sequelize.Op;//拿Op,固定写法
        //只要不放在同一分类级别下还是可以的
        const hasdata = await app.model.GoodsClass.findOne({
            where: {
                name,
                id: {
                    [Op.ne]: id
                }
            }
        });
        if (hasdata && hasdata.pid == pid) {
            return ctx.apiFail('同一个分类下不能有相同的商品分类名称');
        }
        // 修改数据
        data.name = name;
        data.desc = desc;
        data.status = status;
        data.pid = pid;
        data.order = order;
        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改商品分类成功');
    }
    //修改商品分类状态功能
    async updateStatus(){
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '商品分类id'
            },
            status: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '商品分类状态', //字段含义
                range:{
                    in:[0,1]
                },
            },
        });
        // 参数
        const id = ctx.params.id;
        const { status } = ctx.request.body;
        // 是否存在
        let data = await app.model.GoodsClass.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('商品分类不存在');
        }
        // 修改数据
        data.status = status;
        
        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改商品分类状态成功');
    }
    //删除商品分类功能
    async delete() {
        const { ctx, app } = this;
        const id = ctx.params.id;

        let data = await ctx.service.goodsClass.goodsclass_list();
        // console.log('所有商品分类', data);
        let ids = app._collectNodeIds(data,Number(id));
        // console.log(ids);
        // return;
        await app.model.GoodsClass.destroy({
            where: {
                id:{
                    [this.app.Sequelize.Op.in] : ids
                }
            }
        });
        //提示
        ctx.toast('商品分类删除成功', 'success');
        //跳转
        ctx.redirect('/shop/admin/goodsclass');
    }
    //删除商品分类功能api
    async deleteAPI() {
        const { ctx, app } = this;
        const id = ctx.params.id;

        // 先看一下是否存在
        let _data = await app.model.GoodsClass.findOne({ where: { id } });
        if (!_data) {
            return ctx.apiFail('该商品分类记录不存在');
        }

        let data = await ctx.service.goodsClass.goodsclass_list();
        // console.log('所有商品分类', data);
        let ids = app._collectNodeIds(data,Number(id));
        // console.log(ids);
        // return;
        await app.model.GoodsClass.destroy({
            where: {
                id:{
                    [this.app.Sequelize.Op.in] : ids
                }
            }
        });

        ctx.apiSuccess(true);
    }
```

### 4. 服务
`app/service/goods_class.js`
```js
    //商品分类数据
    async datalist(options) {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        let data = await ctx.page('GoodsClass', {}, {
            order: [
                ['order', 'asc'],
                ['id', 'asc'],
            ],
            attributes: {
                exclude: ['create_time', 'update_time'],//除了这些字段，其他字段都显示
            },
            limit: options && options.limit ? options.limit : 10000,
            // include: [{
            //     model:app.model.Image,
            //     attributes: ['id'],
            // }]
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

## 四、商品分类所有接口
> 具体查看，<a href="/web/mysql/goods_class表接口" target="_blank">goods_class表接口</a><br/>

## 五、商品规格模块
### 1. 商品规格表 skus
> 具体查看，<a href="/web/mysql/goods_class.html#三、skus-商品规格表-字段设计" target="_blank">三、skus[商品规格表] 字段设计</a><br/>

### 2.商品规格模块api及后台开发
> 具体查看，<a href="/fourthless/w-a/eggjs.商品规格模块" target="_blank">商品规格模块api及后台开发</a><br/>