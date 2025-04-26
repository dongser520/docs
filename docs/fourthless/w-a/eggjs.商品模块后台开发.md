---
navbar: true
sidebar: auto
title: eggjs商品模块后台开发
---

## 一、调整商品规格表 `skus` 字段及 商品规格后台功能
说明：<br/>
> 我们在商品表设计的时候，有一个字段 `sku_value`, 它这个字段和表 `skus` 有关，而我们的商品是划分在商品分类下面，因此，我们这个地方可以做一个调整： 给商品规格表 `skus` 增加一个字段 `goods_class_id`即商品分类id，这样在我们新增商品的时候，当我们选择了商品类别，关于商品规格的部分，就会自动对应到商品分类的这个商品规格里面，便于我们操作。<br/><br/>
> 由此，我们可以从侧面看出，当我们的项目在开发的过程中，随着你需求的增加，或者产品经理或者客户，随时提出了他新的需求，我们要不断调整我们已经开发的部分，包括已经开发好了的表，比如我们现在的商品规格表 `skus`。 <br/><br/>
> 那么如何调整表呢？<br/><br/>
> 在我们第二学期第三季开发我们网站前后台的时候，我说过，大家可以直接去数据库对表 `skus` 新增一个字段`goods_class_id`，然后另外一种方式，就是如果你用的迁移文件，那么回退几个数据表，对要修改的表 `skus` 修改迁移文件，然后重新创建表就可以了。
### 1. 修改迁移文件
```js
await queryInterface.createTable('skus', {
    id: { 
        type: INTEGER(20).UNSIGNED, 
        primaryKey: true, 
        autoIncrement: true,
        comment: '主键id'
    },
    goods_class_id: {
        type: INTEGER(20).UNSIGNED,
        allowNull: false,
        comment: '商品分类id',
        references: { //关联关系
          model: 'goods_class', //关联的表
          key: 'id' //关联表的主键
        },
        onDelete: 'CASCADE', //删除时操作
        onUpdate: 'RESTRICT', // 更新时操作
    },
    ...
});
```
### 2. 回退迁移文件，重新创建表
```js
// 创建数据库
npx sequelize db:migrate
// 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
npx sequelize db:migrate:undo
// 可以通过 `db:migrate:undo:all` 回退到初始状态
npx sequelize db:migrate:undo:all
```

### 3. 修改模型文件
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
        goods_class_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            comment: '商品分类id',
            references: { //关联关系
              model: 'goods_class', //关联的表
              key: 'id' //关联表的主键
            },
            onDelete: 'CASCADE', //删除时操作
            onUpdate: 'RESTRICT', // 更新时操作
        },
        ...
    });


    // 模型关联关系
    Skus.associate = function (models) {
        // 关联到自己 （通过pid关联）
        // this.hasMany(app.model.GoodsClass, {
        //     foreignKey: 'pid',
        //     as: 'ChildGoodsClass' // 别名（可选）
        // });

        // 关联商品模型
        // this.hasMany(app.model.Image, {
        //     foreignKey: 'image_class_id',
        //     // as: 'images' // 别名（可选）
        // });

        // 关联商品分类：
        // 一个商品分类可以有多个规格, 反过来，反向一对多
        this.belongsTo(app.model.GoodsClass, {
            foreignKey: 'goods_class_id',
            // as: 'GoodsClass' // 别名（可选）
        });
        
    }

    return Skus;
}
```

### 4. 修改控制器文件
`app/controller/admin/skus.js`
```js
    // 创建商品规格界面
    async create() {
        const { ctx, app } = this;

        //先看一下有没有商品分类
        let data = await ctx.service.goodsClass.dropdown_goodsclass_list();
        data.shift();
        //console.log('先看一下有没有商品分类', data);
        if (data.length == 0) {
            //提示
            ctx.toast('请先创建商品分类，在创建商品规格', 'danger');
            //跳转
            return  ctx.redirect('/shop/admin/goodsclass/create');
        }

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
                        label: '属于哪个商品分类',
                        type: 'dropdown', //下拉框
                        name: 'goods_class_id',
                        default: JSON.stringify(data),
                        placeholder: '请选择一个商品分类',
                    },
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
                        placeholder: '请输入商品规格值，多个值用逗号隔开',
                    },
                    {
                        label: '规格类型',
                        type: 'number',
                        name: 'type',
                        placeholder: '请输入商品规格类型：0无限制，1颜色，2图片，3尺寸等等,选填，默认0',
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
                        placeholder: '状态 0不可用 1可用 等等状态',
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
                // defValue: '',
                desc: '商品规格值',
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
            },
            goods_class_id: {
                type: 'int',
                required: true,
                // defValue: 0,
                desc: '商品分类id'
            },
        });
        //先判断一下直播功能中的礼物账号是否存在，不存在在写入数据库
        //2.写入数据库
        //3.成功之后给页面反馈
        let { name, default:defaultValue, status, type,order,goods_class_id } = this.ctx.request.body;
        // if (await this.app.model.Skus.findOne({ where: { name } })) {
        //     return this.ctx.apiFail('分类名称已存在');
        // } 
        //写入数据库
        const res = await this.app.model.Skus.create({
            name, 
            default:defaultValue, 
            status, 
            type,
            order,
            goods_class_id
        });
        this.ctx.apiSuccess('创建商品规格成功');
    }
    //商品规格列表页面
    async index() {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        let keyword = ctx.query.keyword || '';
        let data = await ctx.page('Skus',{
            name:{
                [this.app.Sequelize.Op.like]: '%' + keyword + '%',
            }
        },{
            include:[{
                model:app.model.GoodsClass,
                attributes:['id','name'],
            }],
        });
        // let data = await ctx.service.goodsClass.datalist({ limit: 10000 });
        // console.log('规格数据', data);
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
                        title: '商品分类',
                        // key: 'name',
                        class: 'text-left',//可选
                        render(item) { //树形数据
                            // console.log('每个item',item);
                            // if (item.level) {
                            //     let w = item.level * 40;
                            //     return `<span style="display:inline-block;width:${w}px"></span>`;
                            // }
                            return `<span>${item.goods_class.name}</span>`;
                        }
                    },
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
```
