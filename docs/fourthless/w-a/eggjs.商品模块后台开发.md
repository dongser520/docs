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
                        // key: 'default',
                        class: 'text-left',//可选
                        render(item) { //树形数据
                            // console.log('每个item',item);
                            // if (item.level) {
                            //     let w = item.level * 40;
                            //     return `<span style="display:inline-block;width:${w}px"></span>`;
                            // }
                            let str = '';
                            let array = item.default.split('，');
                            for (let i = 0;   i < array.length; i++) {
                                const element = array[i];
                                str += `<span style="margin-right:5px;margin-bottom:5px">${element}</span>`;
                            }
                            return `<div style="width:200px;display:flex;
                            flex-wrap:wrap;font-size:12px;">
                                ${str}
                            </div>`;
                        }
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


## 二、创建商品
### 1. 路由
`app/router/admin/shop.js`
```js
module.exports = app => {
    ...
    //删除商品功能
    router.post('/shop/admin/goods/:id/delete', controller.admin.goods.deleteAPI);
    router.get('/shop/admin/goods/:id/delete', controller.admin.goods.delete);
    //修改商品状态功能
    router.post('/shop/admin/goods/:id/update_status',controller.admin.goods.updateStatus);
    //修改商品界面
    router.get('/shop/admin/goods/edit/:id', controller.admin.goods.edit);
    //批量删除商品
    router.post('/shop/admin/goods/deleteAll', controller.admin.goods.deleteAll);
    //修改商品数据功能
    router.post('/shop/admin/goods/:id', controller.admin.goods.update);
    // 创建商品界面
    router.get('/shop/admin/goods/create', controller.admin.goods.create);
    //创建商品提交数据
    router.post('/shop/admin/goods', controller.admin.goods.save);
    //商品列表页面
    router.get('/shop/admin/goods/:page', controller.admin.goods.indexAPI);
    router.get('/shop/admin/goods', controller.admin.goods.index);
    
};
```

### 2. 新建模型 
`app/model/goods.js`
```js
'use strict';


module.exports = app => {
    const { 
        INTEGER, 
        STRING, 
        DATE, 
        TEXT, 
        FLOAT, 
        DECIMAL,
        BOOLEAN 
      } = app.Sequelize;

    const Goods = app.model.define('goods', {
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
          name: { 
            type: STRING(255), 
            allowNull: false, 
            defaultValue: '', 
            comment: '商品名称'
          },
          desc: { 
            type: STRING(2000), 
            allowNull: true, 
            defaultValue: '', 
            comment: '商品描述'
          },
          content: { 
            type: TEXT, 
            allowNull: true, 
            comment: '商品详情'
          },
          cover: { 
            type: STRING(1000), 
            allowNull: true, 
            comment: '商品封面图代表（更多图片关联至goods_banner表）'
          },
          rating: {
            type: FLOAT,
            allowNull: true,
            defaultValue: 5.0,
            comment: '商品评分'
          },
          sale_count: {
            type: INTEGER(11),
            allowNull: true,
            defaultValue: 0,
            comment: '总销量'
          },
          review_count: {
            type: INTEGER(11),
            allowNull: true,
            defaultValue: 0,
            comment: '评论数量'
          },
          love_count: {
            type: INTEGER(11),
            allowNull: true,
            defaultValue: 0,
            comment: '收藏量'
          },
          recommend_count: {
            type: INTEGER(11),
            allowNull: true,
            defaultValue: 0,
            comment: '推荐量'
          },
          min_price: {
            type: DECIMAL(10, 2),
            allowNull: true,
            comment: '起售价（最低售价，多少元起）'
          },
          history_min_price: {
            type: DECIMAL(10, 2),
            allowNull: true,
            comment: '历史最低价'
          },
          coupon_price: {
            type: DECIMAL(10, 2),
            allowNull: true,
            comment: '券后价'
          },
          discount_price: {
            type: DECIMAL(10, 2),
            allowNull: true,
            comment: '折后价'
          },
          spike_price: {
            type: DECIMAL(10, 2),
            allowNull: true,
            comment: '秒杀价'
          },
          other_price: {
            type: DECIMAL(10, 2),
            allowNull: true,
            comment: '其它设置价（如:首件价，新客价，30天低价等等）'
          },
          unit: {
            type: STRING(10),
            allowNull: true,
            defaultValue: '件',
            comment: '商品单位（默认：件）'
          },
          stock: {
            type: INTEGER(11),
            allowNull: true,
            defaultValue: 0,
            comment: '库存'
          },
          min_stock: {
            type: INTEGER(11),
            allowNull: true,
            defaultValue: 0,
            comment: '库存预警'
          },
          stock_display: {
            type: INTEGER(1),
            allowNull: true,
            defaultValue: 0,
            comment: '库存显示：0隐藏 1显示'
          },
          ischeck: {
            type: INTEGER(1),
            allowNull: true,
            defaultValue: 0,
            comment: '审核状态：0审核中 1通过 2拒绝（不通过）'
          },
          goods_status: {
            type: INTEGER(1),
            allowNull: true,
            defaultValue: 1,
            comment: '商品状态：0仓库（未上架）、1上架、2下架、3违规下架、4回收站等'
          },
          sku_value: {
            type: TEXT,
            allowNull: true,
            comment: '商品规格属性（商品参数）'
          },
          goods_tags: {
            type: STRING(2000),
            allowNull: true,
            comment: '商品标签（如：近期销量飙升，30天上新，近7天同类热卖，24小时内发货，等等，用逗号隔开）'
          },
          order: {
            type: INTEGER,
            allowNull: true,
            defaultValue: 50,
            comment: '排序，默认50'
          },
          status: {
            type: INTEGER(1),
            allowNull: false,
            defaultValue: 1,
            comment: '可用状态：0禁用 1启用'
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
        update_time: { type: DATE, allowNull: false, defaultValue: app.Sequelize.fn('NOW') },
        delete_time: {
          type: DATE,
          allowNull: true,
          comment: '删除时间'
        }
    });


    // 模型关联关系
    Goods.associate = function (models) {
        // 关联分类 反向一对多
        Goods.belongsTo(app.model.GoodsClass);
    }

    return Goods;
}
```

### 3. 新建控制器
`app/controller/admin/goods.js`
```js
'use strict';

const Controller = require('egg').Controller;

class GoodsController extends Controller {
    // 创建商品界面
    async create() {
        const { ctx, app } = this;

        // 渲染模版前先拿到所有分类
        let data = await ctx.service.goodsClass.dropdown_goodsclass_list();
        //渲染公共模版
        await ctx.renderTemplate({
            title: '创建商品',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/shop/admin/goods",
                //  字段
                fields: [
                    {
                        label: '放在哪个商品分类里面',
                        type: 'dropdown', //下拉框
                        name: 'goods_class_id',
                        default: JSON.stringify(data),
                        placeholder: '请选择一个商品分类',
                    },
                    {
                        label: '商品名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入商品名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '商品描述',
                        type: 'textarea',
                        name: 'desc',
                        placeholder: '请输入商品描述，选填',
                    },
                    {
                        label: '商品封面图代表',
                        type: 'file', //'fileoss'-上传到oss云存储里面
                        name: 'cover',
                    },
                    {
                        label: '商品详情',
                        type: 'editor', //富文本编辑器
                        name: 'content',
                        placeholder: '请输入商品详情,选填',
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
            successUrl: '/shop/admin/goods',
        });
    }
    //创建商品提交数据
    async save() {
        const { ctx, app } = this;
        //一般处理流程
        //1.参数验证
        this.ctx.validate({
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '商品名称', //字段含义
                range:{
                    min:2,
                    max:255
                }
            },
            desc: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '商品描述',
                range:{
                    min:0,
                    max:2000
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
            goods_class_id: {
                type: 'int',
                required: true,
                // defValue: 0,
                desc: '商品分类id',
                range:{
                    min:1,
                }
            },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '排序'
            },
            content: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '商品详情'
            },
            cover: {
                type: 'string',
                required: true,
                // defValue: '',
                desc: '商品封面图代表'
            }
        });
        //2.业务处理
        let { name, desc, status, goods_class_id,order,content,cover } = this.ctx.request.body;
        if (!await this.app.model.GoodsClass.findOne({ where: { id: goods_class_id } })) {
            return this.ctx.apiFail('分类不存在');
        }
        // const Op = this.app.Sequelize.Op;//拿Op,固定写法
        // //分类名称，是否已经存在，如果存在，但是只要不放在同一分类下还是可以的
        // const hasdata = await app.model.GoodsClass.findOne({
        //     where: {
        //         name,
        //         pid:pid
        //     }
        // });
        // if (hasdata) {
        //     return ctx.apiFail('同一个分类下不能有相同的分类名称');
        // }
        //写入数据库
        const res = await this.app.model.Goods.create({
            name,
            desc,
            status,
            goods_class_id,
            order,
            content,
            cover 
        });
        this.ctx.apiSuccess('创建商品成功');
    }
    //商品列表页面
    async index() {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        let keyword = ctx.query.keyword || '';
        let data = await ctx.page('Goods',{
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
        // console.log('数据', data);
        // ctx.body = data;
        // return;
        // data = data.rules;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '商品列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/shop/admin/goods/create',//新增路径
                        desc: '创建商品',//新增 //按钮名称
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
                        title: '商品分类及名称',
                        // key: 'name',
                        class: 'text-left',//可选
                        render(item) { //树形数据
                            // console.log('每个item',item);
                            // if (item.level) {
                            //     let w = item.level * 40;
                            //     return `<span style="display:inline-block;width:${w}px"></span>`;
                            // }
                            return `<div>
                                 <p style="color:#999000;"><span>商品分类：</span><span>${item.goods_class.name}</span></p>
                                 <div style="display:flex;">
                                     <img src="${item.cover}" style="width:50px;height:50px;margin-right:10px;"></img>
                                     <p><span>商品名称：</span><span>${item.name}</span></p>
                                 </div>
                            </div>`;
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
                                @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/shop/admin/goods','Goods')">${arr[i].name}</button>`;
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
                                return `/shop/admin/goods/edit/${id}`;
                            },
                            //删除
                            delete: function (id) {
                                return `/shop/admin/goods/${id}/delete`;
                            }
                        }
                    },
                ],
            },
        });
    }
    //商品列表api
    async indexAPI() {}
    //修改商品界面
    async edit() {}
    //修改商品数据功能
    async update() {}
    //修改商品状态功能
    async updateStatus() {}
    //删除商品功能
    async delete() {}
    //删除商品功能api
    async deleteAPI() {}
    //批量删除商品
    async deleteAll() {}
}

module.exports = GoodsController;

```
