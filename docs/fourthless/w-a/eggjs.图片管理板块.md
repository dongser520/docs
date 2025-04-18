---
navbar: true
sidebar: auto
title: eggjs图片管理板块
---

前言
> 有了我们前面章节学习的管理员、角色、权限板块，这些数据库创建及开发流程，我们接下来学习图片管理板块，应该是信手拿捏了，图片管理板块，主要是对商品图片的一个管理，包括图片分类、图片上传、图片删除等操作，下面我们就来学习一下图片管理板块的开发。

## 一、 创建图片分类表 image_class
> 具体`图片分类表：image_class`设计，<a href="/web/mysql/image_class.html#一、image-class-图片分类表-字段设计" target="_blank">点击查看</a><br/>
## 二、 创建图片表 image
> 具体`图片表：image`设计，<a href="/web/mysql/image_class.html#三、image-图片表-字段设计" target="_blank">点击查看</a><br/>

## 三、创建图片分类
### 1. 路由
`app/router/admin/shop.js`
```js
module.exports = app => {
    ...
    //删除图片分类功能
    router.post('/shop/admin/imageclass/:id/delete', controller.admin.imageClass.deleteAPI);
    router.get('/shop/admin/imageclass/:id/delete', controller.admin.imageClass.delete);
    //修改图片分类状态功能
    router.post('/shop/admin/imageclass/:id/update_status',controller.admin.imageClass.updateStatus);
    //修改图片分类界面
    router.get('/shop/admin/imageclass/edit/:id', controller.admin.imageClass.edit);
    //修改图片分类数据功能
    router.post('/shop/admin/imageclass/:id', controller.admin.imageClass.update);
    // 创建图片分类界面
    router.get('/shop/admin/imageclass/create', controller.admin.imageClass.create);
    //创建图片分类提交数据
    router.post('/shop/admin/imageclass', controller.admin.imageClass.save);
    //图片分类列表页面
    router.get('/shop/admin/imageclass/:page', controller.admin.imageClass.indexAPI);
    router.get('/shop/admin/imageclass', controller.admin.imageClass.index);
    
};
```
### 2. 新建模型
`app/model/image_class.js`
```js
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const ImageClass = app.model.define('image_class', {
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
            comment: '图片分类名称'
        },
        desc: {
            type: STRING(255),
            allowNull: true,
            defaultValue: '',
            comment: '图片分类描述，对图片分类的简单介绍'
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
    ImageClass.associate = function (models) {
        // 关联到自己 （通过pid关联）
        this.hasMany(app.model.ImageClass, {
            foreignKey: 'pid',
            as: 'ChildImageClass' // 别名（可选）
        });

    }

    return ImageClass;
}
```
### 3. 新建控制器
`app/controller/admin/image_class.js`
```js
'use strict';

const Controller = require('egg').Controller;

class Image_classController extends Controller {
    // 创建图片分类界面
    async create() {
        const { ctx, app } = this;

        // 渲染模版前先拿到所有分类
        let data = await ctx.service.imageClass.dropdown_imageclass_list();
        //渲染公共模版
        await ctx.renderTemplate({
            title: '创建图片分类表单',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/shop/admin/imageclass",
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
                        label: '图片分类名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入图片分类名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '图片分类描述',
                        type: 'textarea',
                        name: 'desc',
                        placeholder: '请输入图片分类描述，选填',
                    },
                    {
                        label: '排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入排序，默认50',
                        default: 50,
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
            successUrl: '/shop/admin/imageclass',
        });
    }
    // 创建图片分类提交数据
    async save() {
        const { ctx, app } = this;
        //一般处理流程
        //1.参数验证
        this.ctx.validate({
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '图片分类名称', //字段含义
                range:{
                    min:2,
                    max:30
                },
            },
            desc: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '图片分类描述',
                range:{
                    min:0,
                    max:255
                },
            },
            status: {
                type: 'int',
                required: true,
                defValue: 1,
                desc: '分类状态 0不可用 1可用 等等状态',
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
        let { name, desc, status, pid, order } = this.ctx.request.body;
        // if (await this.app.model.ImageClass.findOne({ where: { name } })) {
        //     return this.ctx.apiFail('图片分类名称已存在');
        // }
        const Op = this.app.Sequelize.Op;//拿Op,固定写法
        //分类名称，是否已经存在，如果存在，但是只要不放在同一分类下还是可以的
        const hasdata = await app.model.ImageClass.findOne({
            where: {
                name,
                pid:pid
            }
        });
        if (hasdata) {
            return ctx.apiFail('同一个分类下不能有相同的分类名称');
        }
        //写入数据库
        const res = await this.app.model.ImageClass.create({
            name,
            desc,
            status,
            pid,
            order
        });
        this.ctx.apiSuccess('创建图片分类成功');
    }
    //图片分类列表页面
    async index() { }
    //图片分类列表页面Api
    async indexAPI() { }
    //修改图片分类界面
    async edit() { }
    //修改图片分类数据功能
    async update() { }
    //修改图片分类状态功能
    async updateStatus() { }
    //删除图片分类功能
    async delete() { }
    //删除图片分类Api
    async deleteAPI() { }
}

module.exports = Image_classController;

```
### 4. 新建服务
`app/service/image_class.js`
```js
'use strict';

const Service = require('egg').Service;

class Image_classService extends Service {
    //下拉框获取所有分类
    async dropdown_imageclass_list() {
        let data = await this.imageclass_list();
        data = this.app.transformToTree(data);
        // console.log('处理之后的分类', JSON.stringify(data));
        return data;
    }

    //获取所有分类
    async imageclass_list() {
        const { ctx, app } = this;
        // 渲染模版前先拿到所有分类
        let data = await ctx.app.model.ImageClass.findAll({
            where: {
                status: 1
            },
            attributes: ['id', 'name', 'pid', 'status','desc','order'],
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

module.exports = Image_classService;

```

## 四、图片分类列表数据、修改、修改状态、删除
### 1. 字体图标查看 <https://fontawesome.dashgame.com/>
### 2. 后台左侧菜单
`data/root.json`
```json
[
    ...
    {"id":21,"pid":17, "name": "图片分类管理", "icon": "fa fa-file-image-o", "url": "/shop/admin/imageclass" }
]
```
### 3. 控制器
`app/controller/admin/image_class.js`
```js
    // 图片分类列表页面
    async index() {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        // let data = await ctx.page('Category');
        let data = await ctx.service.imageClass.datalist({ limit: 1000 });
        // console.log('权限数据', data);
        // return;
        data = data.rules;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '图片分类列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/shop/admin/imageclass/create',//新增路径
                        desc: '新增图片分类',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    }
                ],
                //表头
                columns: [
                    {
                        title: '图片分类名称',
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
                    // {
                    //     title: '图片分类描述',
                    //     key: 'desc',
                    //     class: 'text-center',//可选
                    // },
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
                                @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/shop/admin/imageclass','ImageClass')">${arr[i].name}</button>`;
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
                                return `/shop/admin/imageclass/edit/${id}`;
                            },
                            //删除
                            delete: function (id) {
                                return `/shop/admin/imageclass/${id}/delete`;
                            }
                        }
                    },
                ],
            },
        });
    }
    // 图片分类列表页面API
    async indexAPI(){
        const { ctx, app } = this;
        let limit = parseInt(ctx.query.limit) || 10000;
        let data = await app.model.ImageClass.findAll({
            where:{
                status:1
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
    // 修改图片分类界面
    async edit() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let currentdata = await app.model.ImageClass.findOne({
            where: {
                id
            }
        });
        if (!currentdata) {
            return ctx.apiFail('该图片分类不存在');
        }
        currentdata = JSON.parse(JSON.stringify(currentdata));
        // console.log('当前图片分类数据', currentdata);
        // return;

        // 渲染模版前先拿到所有图片分类
        let data = await ctx.service.imageClass.dropdown_imageclass_list();
        // console.log('下拉框显示的所有图片分类', JSON.stringify(data));
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改图片分类:' + currentdata.name,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改提交地址
                action: '/shop/admin/imageclass/' + id,
                //  字段
                fields: [
                    {
                        label: '放在哪个图片分类里面',
                        type: 'dropdown', //下拉框
                        name: 'pid',
                        default: JSON.stringify(data),
                        placeholder: '不调整（如需调整请选择）',
                    },
                    {
                        label: '图片分类名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入图片分类名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '图片分类描述',
                        type: 'textarea',
                        name: 'desc',
                        placeholder: '请输入图片分类描述，选填',
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
            successUrl: '/shop/admin/imageclass',
        });

    }
    // 修改图片分类数据功能
    async update() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '图片分类id'
            },
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '图片分类名称', //字段含义
                range:{
                    min:2,
                    max:30
                }
            },
            desc: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '图片分类描述',
                range:{
                    min:0,
                    max:255
                }
            },
            status: {
                type: 'int',
                required: true,
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
        const {  name, desc, status, pid, order} = ctx.request.body;
        // 先看一下是否存在
        let data = await app.model.ImageClass.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('该记录不存在');
        }
        //名称可以一样，只要保证它在不同的级别下面
        const Op = this.app.Sequelize.Op;//拿Op,固定写法
        //只要不放在同一权限级别下还是可以的
        const hasdata = await app.model.ImageClass.findOne({
            where: {
                name,
                id: {
                    [Op.ne]: id
                }
            }
        });
        if (hasdata && hasdata.pid == pid) {
            return ctx.apiFail('同一个级别下不能有相同的图片分类名称');
        }
        // 修改数据
        data.name = name;
        data.desc = desc;
        data.status = status;
        data.pid = pid;
        data.order = order;  

        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改图片分类成功');
    }
    // 修改图片分类状态功能
    async updateStatus(){
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '图片分类id'
            },
            status: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '图片分类状态', //字段含义
                range:{
                    in:[0,1]
                },
            },
        });
        // 参数
        const id = ctx.params.id;
        const { status } = ctx.request.body;
        // 是否存在
        const data = await app.model.ImageClass.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('数据不存在');
        }
        // 修改数据
        data.status = status;
        
        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改状态成功');
    }
    // 删除图片分类功能
    async delete() {
        const { ctx, app } = this;
        const id = ctx.params.id;

        let data = await ctx.service.imageClass.imageclass_list();
        // console.log('所有图片分类', data);
        let ids = app._collectNodeIds(data,Number(id));
        // console.log(ids);
        // return;
        await app.model.ImageClass.destroy({
            where: {
                id:{
                    [this.app.Sequelize.Op.in] : ids
                }
            }
        });
        //提示
        ctx.toast('图片分类删除成功', 'success');
        //跳转
        ctx.redirect('/shop/admin/imageclass');
    }
    // 删除图片分类功能api
    async deleteAPI() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        // 先看一下是否存在
        let _data = await app.model.ImageClass.findOne({ where: { id } });
        if (!_data) {
            return ctx.apiFail('该图片分类记录不存在');
        }

        let data = await ctx.service.imageClass.imageclass_list();
        // console.log('所有图片分类', data);
        let ids = app._collectNodeIds(data,Number(id));
        // console.log(ids);
        // return;
        await app.model.ImageClass.destroy({
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
`app/service/image_class.js`
```js
    //图片分类数据
    async datalist(options) {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        let data = await ctx.page('ImageClass', {}, {
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

## 五、图片分类所有接口
> 具体查看，<a href="/web/mysql/image_class表接口" target="_blank">image_class表接口</a><br/>

## 六、上传图片
> 具体查看，<a href="/secondless/w-c/上传文件.html#三、上传文件-图片-到阿里云存储oss" target="_blank">上传图片</a><br/>


## 七、阿里云OSS图片上传功能并将结果写入数据库完整代码
### 1. 模型
`app/model/Image.js`
```js
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const Image = app.model.define('image', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键id'
        },
        image_class_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: true,
            defaultValue: 0,
            comment: '图片分类id',
            references: { //关联关系
                model: 'image_class', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        path: {
            type: STRING(255),
            allowNull: true,
            defaultValue: '',
            comment: '图片默认名称（上传图片后服务器反馈的地址名称）'
        },
        name: {
            type: STRING(30),
            allowNull: true,
            defaultValue: '',
            comment: '图片自定义名称'
        },
        url: {
            type: STRING(1000),
            allowNull: true,
            defaultValue: '',
            comment: '图片地址'
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
    Image.associate = function (models) {
        // 关联图片分类 反向一对多
        Image.belongsTo(app.model.ImageClass);
    }

    return Image;
}
```

### 2. 控制器
`app/controller/admin/image.js`
```js
'use strict';

const Controller = require('egg').Controller;

class ImageController extends Controller {
    // 图片上传阿里云
    async uploadAliyunOSS() {
        const { ctx, app } = this;
        try {
            // 获取图片分类id
            let imageClassId = ctx.query.imageClassId;
            if(!imageClassId){
                imageClassId = 0;
                // 通用文件上传到阿里云OSS方法--File模式
                // let result = await ctx.uploadOSS_File('img', imageClassId, 'images');
                // 通用文件上传到阿里云OSS方法--Stream 流模式
                let result = await ctx.uploadOSS_Stream('img', imageClassId, 'images');
                ctx.apiSuccess(result);
            }else{
                // 判断这个分类id是否存在
                let imageclass = await ctx.model.ImageClass.findOne({
                    where: {
                        id: imageClassId,
                        status: 1
                    }
                });
                if(!imageclass){
                    return ctx.apiFail('图片分类不存在');
                }

                // 通用文件上传到阿里云OSS方法--File模式
                // let result = await ctx.uploadOSS_File('img', imageClassId, 'images');
                // 通用文件上传到阿里云OSS方法--Stream 流模式
                let result = await ctx.uploadOSS_Stream('img', imageClassId, 'images');
                // 写进数据库
                let data =  result.map(item => {
                    return {
                        image_class_id:imageClassId,
                        url:item.url,
                        path:item.path,
                    }
                });
                // console.log('插入数据库的数据',data);
                let res = await ctx.model.Image.bulkCreate(data);
                ctx.apiSuccess(res);
            }
            
        } catch (error) {
            ctx.apiFail(error.message);
        }
    }
}

module.exports = ImageController;

```

## 八、某个图片分类下的图片列表
路由示例： <br/> 
`http://127.0.0.1:7001/shop/admin/imageclass/27/image/1?limit=10&order=desc&keyword=小米` <br/>问号后面为选填项，`27`为图片分类id，`1`为页码，`limit`为每页显示条数，默认10，`order`为排序，默认`asc`，`keyword`为搜索关键词，默认为空
### 1.路由
`app/router/admin/shop.js`
```js
    ...
    //某个图片分类下的所有图片列表 
    router.get('/shop/admin/imageclass/:id/image/:page',controller.admin.imageClass.images);
    //删除图片分类功能
    router.post('/shop/admin/imageclass/:id/delete', controller.admin.imageClass.deleteAPI);
    router.get('/shop/admin/imageclass/:id/delete', controller.admin.imageClass.delete);
    ...
```
### 2. 控制器
`app/controller/admin/image_class.js`
```js
    //某个图片分类下的所有图片列表 
    async images(){
        const { ctx, app } = this; 
        // 参数
        let classId = parseInt(ctx.params.id);
        let page = parseInt(ctx.params.page) || 1;

        let limit = parseInt(ctx.query.limit) || 10;
        let order = ctx.query.order || 'asc';
        let keyword = ctx.query.keyword || '';
        let where = {};
        if (keyword) {
            where.name = {
                [this.app.Sequelize.Op.like]: '%' + keyword + '%'
            }
        }

        //查看分类id是否存在
        let classdata = await app.model.ImageClass.findOne({
            where:{
                id:classId,
                status:1,
            },
        });
        if(!classdata){
            return ctx.apiFail('该图片分类不存在或已禁用');
        }
        //存在，则查图片列表
        let list = await app.model.Image.findAll({
            where:{
                image_class_id:classId,
                status:1,
                ...where,
            },
            order:[
                ['order', order]
            ],
            offset: (page - 1) * limit,
            limit: limit,
            // attributes:['id','url','name','path','image_class_id'],
            // 去掉时间 其他字段都要查
            attributes:{
                exclude: ['create_time','update_time'],//排除字段
            },
            include:[
                {
                    model:app.model.ImageClass,
                    // attributes:['name'],
                }
            ],
        });
        let totalCount = await app.model.Image.count({
            where:{
                image_class_id:classId,
                status:1,
                ...where,
            },
        });

        ctx.apiSuccess({
            list,
            totalCount,
        });
    }
```

## 九、删除单个图片、自定义图片名称
### 1. 路由
`app/router/admin/shop.js`
```js
    ...
    // 图片上传阿里云uploadAliyunOSS
    router.post('/shop/admin/image/uploadAliyun', controller.admin.image.uploadAliyunOSS);
    //删除某个图片
    router.post('/shop/admin/image/:id/delete', controller.admin.image.deleteAPI);
    router.get('/shop/admin/image/:id/delete', controller.admin.image.delete);
    //给图片重命名(修改图片信息)
    router.post('/shop/admin/image/:id', controller.admin.image.update);
```

### 2. 控制器
`app/controller/admin/image.js`
```js
   // 删除某个图片
   async delete() {
      const { ctx, app } = this;
      const id = ctx.params.id;
      await app.model.Image.destroy({
         where: {
            id,
         }
      });
      //提示
      ctx.toast('图片删除成功', 'success');
      //跳转
      ctx.redirect('/shop/admin/imageclass');
   }
   // 删除某个图片api
   async deleteAPI() {
      const { ctx, app } = this;
      const id = ctx.params.id;
      await app.model.Image.destroy({
         where: {
            id,
         }
      });
      ctx.apiSuccess('图片删除成功');
   }

   //给图片重命名(修改图片信息)
   async update(){
      const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '图片id'
            },
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '图片名称', //字段含义
                range:{
                    min:2,
                    max:30
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
            image_class_id: {
                type: 'int',
                required: false,
                //defValue: 0,
                desc: '图片分类id',
                range:{
                   min:1
                }
            },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '排序'
            }
        });

        // 参数
        const id = ctx.params.id;
        const {  name,  status, image_class_id,order } = ctx.request.body;
        // 先看一下是否存在
        let data = await app.model.Image.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('该图片记录不存在');
        }

        if(image_class_id){
           let classdata = await app.model.ImageClass.findOne({ where: { id: image_class_id } });
           if (!classdata) {
               return ctx.apiFail('该图片分类不存在，不能修改成这个分类');
           }
        }
        // 修改数据
        data.name = name;
        data.status = status;
        data.image_class_id = image_class_id;
        data.order = order;
        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改图片成功');
   }
```
## 十、图片表所有接口
> 具体查看，<a href="/web/mysql/image表接口" target="_blank">image表接口</a><br/>

## 十一、图片管理板块网站后台相关接口说明
> 具体查看，<a href="/fourthless/w-a/eggjs.图片管理板块网站后台" target="_blank">图片管理板块网站后台相关接口说明</a><br/>