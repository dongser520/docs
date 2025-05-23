---
navbar: true
sidebar: auto
title: eggjs商品规格模块
---

## 一、商品规格表 skus
> 具体查看，<a href="/web/mysql/goods_class.html#三、skus-商品规格表-字段设计" target="_blank">三、skus[商品规格表] 字段设计</a><br/>

## 二、创建商品规格
### 1. 路由
`app/router/admin/shop.js`
```js
module.exports = app => {
    ...
    //删除商品规格功能
    router.post('/shop/admin/skus/:id/delete', controller.admin.skus.deleteAPI);
    router.get('/shop/admin/skus/:id/delete', controller.admin.skus.delete);
    //修改商品规格状态功能
    router.post('/shop/admin/skus/:id/update_status',controller.admin.skus.updateStatus);
    //修改商品规格界面
    router.get('/shop/admin/skus/edit/:id', controller.admin.skus.edit);
    //批量删除商品规格
    router.post('/shop/admin/skus/deleteAll', controller.admin.skus.deleteAll);
    //修改商品规格数据功能
    router.post('/shop/admin/skus/:id', controller.admin.skus.update);
    // 创建商品规格界面
    router.get('/shop/admin/skus/create', controller.admin.skus.create);
    //创建商品规格提交数据
    router.post('/shop/admin/skus', controller.admin.skus.save);
    //商品规格列表页面
    router.get('/shop/admin/skus/:page', controller.admin.skus.indexAPI);
    router.get('/shop/admin/skus', controller.admin.skus.index);
    
};
```

### 2. 新建模型
`app/model/skus.js`
```js
'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const Skus = app.model.define('skus', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键id'
        },
        type: {
            type: INTEGER(11),
            allowNull: true,
            defaultValue: 0,
            comment: '规格类型：0无限制，1颜色，2图片，3尺寸等等',
        },
        name: {
            type: STRING(30),
            allowNull: false,
            defaultValue: '',
            comment: '规格名称'
        },
        default: {
            type: STRING(2000),
            allowNull: true,
            defaultValue: '',
            comment: '规格值，用逗号隔开'
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
    // Skus.associate = function (models) {
    //     // 关联到自己 （通过pid关联）
    //     // this.hasMany(app.model.GoodsClass, {
    //     //     foreignKey: 'pid',
    //     //     as: 'ChildGoodsClass' // 别名（可选）
    //     // });

    //     // 关联商品模型
    //     // this.hasMany(app.model.Image, {
    //     //     foreignKey: 'image_class_id',
    //     //     // as: 'images' // 别名（可选）
    //     // });


    // }

    return Skus;
}
```

### 3. 新建控制器
`app/controller/admin/skus.js`
```js
'use strict';

const Controller = require('egg').Controller;

class SkusController extends Controller {
    // 创建商品规格界面
    async create() {
        const { ctx, app } = this;

        //渲染公共模版
        await ctx.renderTemplate({
            title: '创建商品规格',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/shop/admin/skus",
                //  字段
                fields: [
                    {
                        label: '商品规格名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入商品规格名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '规格值',
                        type: 'textarea',
                        name: 'default',
                        placeholder: '请输入商品规格值，多个规格值用逗号隔开',
                    },
                    {
                        label: '规格类型',
                        type: 'number',
                        name: 'type',
                        placeholder: '请输入规格类型，选填，默认0，0无限制，1颜色，2图片，3尺寸等等',
                        default:0,
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
            successUrl: '/shop/admin/skus',
        });
    }
    //创建商品规格提交数据
    async save() {
        const { ctx, app } = this;
        //一般处理流程
        //1.参数验证
        this.ctx.validate({
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '商品规格名称', //字段含义
                range:{
                    min:2,
                    max:30
                }
            },
            default: {
                type: 'string',
                required: true,
                defValue: '',
                desc: '商品规格值',
                range:{
                    min:0,
                    max:2000
                }
            },
            type: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '规格类型：0无限制，1颜色，2图片，3尺寸等等'
            },
            status: {
                type: 'int',
                required: false,
                defValue: 1,
                desc: '状态 0不可用 1可用 等等状态',
                range:{
                    in:[0,1]
                }
            },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '排序'
            }
        });
        //先判断一下直播功能中的礼物账号是否存在，不存在在写入数据库
        //2.写入数据库
        //3.成功之后给页面反馈
        let { name, default: defaultValue, status, type,order } = this.ctx.request.body;
        // if (await this.app.model.Skus.findOne({ where: { name } })) {
        //     return this.ctx.apiFail('名称已存在');
        // }
        //写入数据库
        const res = await this.app.model.Skus.create({
            name, default: defaultValue, status, type,order
        });
        this.ctx.apiSuccess('创建商品规格成功');
    }
    //商品规格列表页面
    async index() {
    
    }
    //商品规格列表页面api
    async indexAPI() {
    
    }
    //修改商品规格界面
    async edit() {
    
    }
    //修改商品规格数据功能
    async update() {
    
    }
    //修改商品规格状态功能
    async updateStatus() {
    
    }
    //删除商品规格功能
    async delete() {
    
    }
    //删除商品规格功能api
    async deleteAPI() {
    
    }
}

module.exports = SkusController;

```

## 三、商品规格列表数据、修改、修改状态、删除、批量删除
### 1. 字体图标查看 <https://fontawesome.dashgame.com/>
### 2. 后台左侧菜单
`data/root.json`
```json
[
    ...
   {"id":23,"pid":17, "name": "商品规格管理", "icon": "fa fa-cubes", "url": "/shop/admin/skus" }
]
```
### 3. 控制器
`app/controller/admin/skus.js`
```js
    //商品规格列表页面
    async index() {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        let keyword = this.ctx.query.keyword || '';
        let data = await ctx.page('Skus',{
            name:{
                [this.app.Sequelize.Op.like]:'%'+keyword+'%',
            }
        });
        // let data = await ctx.service.goodsClass.datalist({ limit: 10000 });
        // console.log('分类数据', data);
        // ctx.body = data;
        // return;
        // data = data.rules;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '商品规格列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/shop/admin/skus/create',//新增路径
                        desc: '创建商品规格',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    },
                    // {
                    //     url: '/shop/admin/goods/create',//新增路径
                    //     desc: '上传商品',//新增 //按钮名称
                    //     // icon: 'fa fa-plus fa-lg',//按钮图标
                    // }
                ],
                //表头
                columns: [
                    {
                        title: '商品规格名称',
                        key: 'name',
                        class: 'text-left',//可选
                        // render(item) { //树形数据
                        //     // console.log('每个item',item);
                        //     if (item.level) {
                        //         let w = item.level * 40;
                        //         return `<span style="display:inline-block;width:${w}px"></span>`;
                        //     }
                        // }
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
                        title: '规格值',
                        key: 'default',
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
                                @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/shop/admin/skus','Skus')">${arr[i].name}</button>`;
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
                                return `/shop/admin/skus/edit/${id}`;
                            },
                            //删除
                            delete: function (id) {
                                return `/shop/admin/skus/${id}/delete`;
                            }
                        }
                    },
                ],
            },
        });
    }
    // 商品规格列表api
    async indexAPI() {
        const { ctx, app } = this;
        //参数
        let page = parseInt(ctx.params.page) || 1;

        let limit = parseInt(ctx.query.limit) || 20;
        let order = ctx.query.order || 'desc';
        let keyword = ctx.query.keyword || '';
        let where = {};
        if(keyword){
            where.name = {
                [this.app.Sequelize.Op.like]:'%'+keyword+'%',
            };
        }

        //存在，则查列表
        let list = await app.model.Skus.findAll({
            where:{
                status:1,
                // name:{
                //     [this.app.Sequelize.Op.like]:'%'+keyword+'%',
                // }
                ...where,
            },
            offset:(page-1)*limit,
            limit,
            order:[
                ['order',order],
                ['id','desc']
            ],
            // attributes:['id','name','url'],
            attributes:{
                exclude:['create_time','update_time']
            },
            // include:[
            //     {
            //         model:app.model.ImageClass,
            //         // as:'imageClass',
            //         // attributes:{
            //         //     exclude:['create_time','update_time']
            //         // },
            //         attributes:['name'],
            //     }
            // ]
        });
        let totalCount = await app.model.Skus.count({
            where:{
                status:1,
                ...where,
            }
        });
        ctx.apiSuccess({
            list,
            totalCount
        });
    }
    //修改商品规格界面
    async edit() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let currentdata = await app.model.Skus.findOne({
            where: {
                id
            }
        });
        if (!currentdata) {
            return ctx.apiFail('该商品规格不存在');
        }
        currentdata = JSON.parse(JSON.stringify(currentdata));
        // console.log('当前商品规格数据', currentdata);
        // return;

        // 渲染模版前先拿到所有分类
        // let data = await ctx.service.goodsClass.dropdown_goodsclass_list();
        // console.log('下拉框显示的所有分类', JSON.stringify(data));
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改商品规格:' + currentdata.name,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改提交地址
                action: '/shop/admin/skus/' + id,
                //  字段
                fields: [
                    // {
                    //     label: '放在哪个商品分类里面',
                    //     type: 'dropdown', //下拉框
                    //     name: 'pid',
                    //     default: JSON.stringify(data),
                    //     placeholder: '不调整（如需调整请选择）',
                    // },
                    {
                        label: '商品规格名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入商品规格名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '商品规格值',
                        type: 'textarea',
                        name: 'default',
                        placeholder: '请输入规格值，用逗号隔开',
                    },
                    {
                        label: '规格类型',
                        type: 'number',
                        name: 'type',
                        placeholder: '请输入规格类型：0无限制，1颜色，2图片，3尺寸等等，选填',
                        // default:50,
                    },
                    {
                        label: '排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入排序',
                        // default:50,
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
            successUrl: '/shop/admin/skus',
        });

    }
    //修改商品规格数据功能
    async update() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '商品规格id'
            },
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '商品规格名称', //字段含义
                range:{
                    min:2,
                    max:30
                }
            },
            default: {
                type: 'string',
                required: true,
                // defValue: '',
                desc: '规格值，用逗号隔开',
                range:{
                    min:0,
                    max:2000
                }
            },
            status: {
                type: 'int',
                required: false,
                defValue: 1,
                desc: '状态 0不可用 1可用 等等状态',
                range:{
                    in:[0,1]
                }
            },
            type: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '规格类型：0无限制，1颜色，2图片，3尺寸等等'
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
        const {  name, default:defaultValue, status, type,order } = ctx.request.body;
        // 先看一下是否存在
        let data = await app.model.Skus.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('该商品规格记录不存在');
        }
        //存在
        // const Op = this.app.Sequelize.Op;//拿Op,固定写法
        //只要不放在同一分类级别下还是可以的
        // const hasdata = await app.model.GoodsClass.findOne({
        //     where: {
        //         name,
        //         id: {
        //             [Op.ne]: id
        //         }
        //     }
        // });
        // if (hasdata && hasdata.pid == pid) {
        //     return ctx.apiFail('同一个分类下不能有相同的商品分类名称');
        // }
        // 修改数据
        data.name = name;
        data['default'] = defaultValue;
        data.status = status;
        data.type = type;
        data.order = order;
        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改商品规格成功');
    }
    //修改商品规格状态功能
    async updateStatus(){
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '商品规格id'
            },
            status: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '商品规格状态', //字段含义
                range:{
                    in:[0,1]
                },
            },
        });
        // 参数
        const id = ctx.params.id;
        const { status } = ctx.request.body;
        // 是否存在
        let data = await app.model.Skus.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('商品规格不存在');
        }
        // 修改数据
        data.status = status;
        
        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改商品规格状态成功');
    }
    //删除商品规格功能
    async delete() {
        const { ctx, app } = this;
        const id = ctx.params.id;

        // 是否存在
        let data = await app.model.Skus.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('商品规格不存在');
        }
        await app.model.Skus.destroy({
            where: {
                id:id
            }
        });
        //提示
        ctx.toast('商品规格删除成功', 'success');
        //跳转
        ctx.redirect('/shop/admin/skus');
    }
    //删除商品规格功能api
    async deleteAPI() {
        const { ctx, app } = this;
        const id = ctx.params.id;

        // 是否存在
        let data = await app.model.Skus.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('商品规格不存在');
        }
        await app.model.Skus.destroy({
            where: {
                id:id
            }
        });

        ctx.apiSuccess(true);
    }

    //批量删除商品规格
    async deleteAll(){
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            ids: {
                type: 'array',
                required: true,
                desc: '商品规格id集合'
            },
        });
        const { ids } = ctx.request.body;
        await app.model.Skus.destroy({
            where: {
                id:{
                    [this.app.Sequelize.Op.in]: ids
                }
            }
        });
        ctx.apiSuccess(true);
    }
```

## 四. 商品规格所有接口
> 具体查看，<a href="/web/mysql/skus表接口.html" target="_blank">skus[商品规格表] 所有接口</a><br/>
