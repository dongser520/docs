---
navbar: true
sidebar: auto
title: eggjs修改商品参数信息
---

## 一、初步创建界面
### 1. 总路由
`app/router/admin/shop.js`
```js
...
//商品参数goods_param处理
router.get('/shop/admin/goods-/:goods_id/createGoodsParam', controller.admin.goods.createGoodsParam);
router.post('/shop/admin/goods-/:goods_id/saveGoodsParam', controller.admin.goods.saveGoodsParam);
router.get('/shop/admin/goods-/:goods_id/indexGoodsParam', controller.admin.goods.indexGoodsParam);
router.get('/shop/admin/goods-/:id/editGoodsParam', controller.admin.goods.editGoodsParam);
router.post('/shop/admin/goods-/:id/updateGoodsParam', controller.admin.goods.updateGoodsParam);
router.get('/shop/admin/goods-/:id/deleteGoodsParam', controller.admin.goods.deleteGoodsParam);
//商品图片goods_banner处理
...
```

### 2.新建模型
`app/model/goods_param.js`
```js
'use strict';


module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;

    const GoodsParam = app.model.define('goods_param', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键id'
        },
        goods_id: {
            type: INTEGER(20).UNSIGNED,
            allowNull: false,
            // defaultValue:0,
            comment: '商品id',
            references: { //关联关系
                model: 'goods', //关联的表
                key: 'id' //关联表的主键
            },
            onDelete: 'cascade', //删除时操作
            onUpdate: 'restrict', // 更新时操作
        },
        paraminfo: { 
            type: STRING(5000), 
            allowNull: false, 
            defaultValue: '', 
            comment: '商品参数信息'
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
    GoodsParam.associate = function (models) {
        // 关联商品 反向一对多
        GoodsParam.belongsTo(app.model.Goods,{
            foreignKey: 'goods_id', // 关联外键
        });
    }

    return GoodsParam;
}
```

### 3. 传递一个id值，根据id和pid的关系，得到它下面的所有子集，并返回树形结构的数据
```js
    //传递一个id值，根据id和pid的关系，得到它下面的所有子集，并返回树形结构的数据
    async datatree_byid(id,modelname = 'GoodsClass') {
        const { ctx, app } = this;
        try {
            // 获取请求中的查询参数 id
            // const id = ctx.params._id ? parseInt(ctx.params._id, 10) : null;

            // 看一下数据库分类表所有数据
            let allCategories = await ctx.model[modelname].findAll({
                order: [
                    ['order', 'asc'],
                    ['id', 'asc'],
                ],
            });

            // 将所有分类数据转换为对象，方便查找
            let categoriesMap = {};
            allCategories.forEach(category => {
                categoriesMap[category.id] = { ...category.toJSON(), children: [] };
            });

            // 构建树形结构
            allCategories.forEach(category => {
                if (categoriesMap[category.pid]) {
                    categoriesMap[category.pid].children.push(categoriesMap[category.id]);
                }
            });

            // 添加level属性的递归函数
            const addLevel = (nodes, level = 0) => {
                nodes.forEach(node => {
                    node.level = level;
                    if (node.children.length > 0) {
                        addLevel(node.children, level + 1);
                    }
                });
            };

            // 如果传入了 id，则找到对应的节点及其子节点
            let result = [];
            if (id !== null) {
                const findNode = (nodes, targetId) => {
                    for (let node of nodes) {
                        if (node.id === targetId) {
                            return node;
                        }
                        let found = findNode(node.children, targetId);
                        if (found) {
                            return found;
                        }
                    }
                    return null;
                };

                // 确保 nodes 是一个数组
                let rootCategories = Object.values(categoriesMap).filter(category => category.pid === 0);
                result = findNode(rootCategories, id);
                if (result) {
                    result = [result]; // 返回数组形式
                    addLevel(result); // 添加level属性
                } else {
                    result = [];
                }
            } else {
                // 如果没有传入 id，则返回整个树形结构
                result = Object.values(categoriesMap).filter(category => category.pid === 0);
                addLevel(result); // 添加level属性
            }

            // 返回数据
            // ctx.body = result;
            
            // 返回数据
            // ctx.body = {
            //     datatree: result,
            // };
            return result;
        } catch (error) {
            // 错误处理
            console.error('Error fetching categories:', error);
            ctx.apiFail('Failed to fetch categories');
        }
    }
```


### 4.控制器
`app/controller/admin/goods.js`
```js
    //商品参数部分
    //新增商品参数界面
    async createGoodsParam(){
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            goods_id: {
                type: 'int',
                required: true,
                desc: '商品id',
                // defValue: 0,
                range:{
                    min:1,
                }
            },
        });
        // 参数
        const goods_id = ctx.params.goods_id;
        let data = await app.model.Goods.findOne({ where: { id:goods_id } });
        if (!data) {
            return ctx.apiFail('该商品不存在');
        }
        // 根据商品id获取商品分类，然后获取分类里面的skus值
        let goodsClassId = data.goods_class_id;
        // ctx.body = goodsClassId; return;
        // 根据商品分类id读取商品分类及其子分类，并转成树形结构
        const goodsClassTree = await this.datatree_byid(goodsClassId,'GoodsClass');
        // ctx.body = goodsClassTree; return;
        //渲染公共模版
        /*
        await ctx.renderTemplate({
            title: '创建商品参数',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "",
                //  字段
                fields: [
                    {
                        label: '商品分类',
                        type: 'dropdown', //下拉框
                        name: 'pid',
                        default: JSON.stringify(goodsClassTree),
                        placeholder: '请选择一个分类',
                    },
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '',
        });
        */
        //看一下当前商品分类在商品skus里面有没有创建的信息
        let skusdata = await app.model.Skus.findAll({ where: { goods_class_id:goodsClassId } });
        // ctx.body = skusdata; return;
        if(skusdata){
            // ctx.body = '有对应的skus信息，可继续添加skus信息'
            await ctx.renderTemplate({
                title: '创建商品参数',//现在网页title,面包屑导航title,页面标题
                tempType: 'for_form', //模板类型：table表格模板 ，form表单模板，for_form循环表单模板
                form: {
                    //提交地址
                    action: "",
                    //  字段
                    fields: [
                        {
                            label: '商品分类',
                            type: 'dropdown', //下拉框
                            name: 'pid',
                            default: JSON.stringify(goodsClassTree),
                            placeholder: '请选择一个分类',
                        },
                    ],
                },
                //新增成功之后跳转到哪个页面
                successUrl: '',
            });
        }else{
            ctx.body = '没有对应的skus信息，先添加skus信息'
        }
    }
    //新增商品参数数据
    async saveGoodsParam(){}
    //商品参数列表
    async indexGoodsParam(){}
    //修改商品参数界面
    async editGoodsParam(){}
    //修改商品参数数据
    async updateGoodsParam(){}
    //删除商品参数
    async deleteGoodsParam(){}

    // 传递一个id值，根据id和pid得到相关所有数据，并返回树形结构的数据
    async datatree_byid(id,modelname = 'GoodsClass') {
        const { ctx, app } = this;
        try {
            // 获取请求中的查询参数 id
            // const id = ctx.params._id ? parseInt(ctx.params._id, 10) : null;

            // 看一下数据库分类表所有数据
            let allCategories = await ctx.model[modelname].findAll({
                order: [
                    ['order', 'asc'],
                    ['id', 'asc'],
                ],
            });

            // 将所有分类数据转换为对象，方便查找
            let categoriesMap = {};
            allCategories.forEach(category => {
                categoriesMap[category.id] = { ...category.toJSON(), children: [] };
            });

            // 构建树形结构
            allCategories.forEach(category => {
                if (categoriesMap[category.pid]) {
                    categoriesMap[category.pid].children.push(categoriesMap[category.id]);
                }
            });

            // 添加level属性的递归函数
            const addLevel = (nodes, level = 0) => {
                nodes.forEach(node => {
                    node.level = level;
                    if (node.children.length > 0) {
                        addLevel(node.children, level + 1);
                    }
                });
            };

            // 如果传入了 id，则找到对应的节点及其子节点
            let result = [];
            if (id !== null) {
                const findNode = (nodes, targetId) => {
                    for (let node of nodes) {
                        if (node.id === targetId) {
                            return node;
                        }
                        let found = findNode(node.children, targetId);
                        if (found) {
                            return found;
                        }
                    }
                    return null;
                };

                // 确保 nodes 是一个数组
                let rootCategories = Object.values(categoriesMap).filter(category => category.pid === 0);
                result = findNode(rootCategories, id);
                if (result) {
                    result = [result]; // 返回数组形式
                    addLevel(result); // 添加level属性
                } else {
                    result = [];
                }
            } else {
                // 如果没有传入 id，则返回整个树形结构
                result = Object.values(categoriesMap).filter(category => category.pid === 0);
                addLevel(result); // 添加level属性
            }

            // 返回数据
            // ctx.body = result;
            
            // 返回数据
            // ctx.body = {
            //     datatree: result,
            // };
            return result;
        } catch (error) {
            // 错误处理
            console.error('Error fetching categories:', error);
            ctx.apiFail('Failed to fetch categories');
        }
    }
```

### 5. 调整一下模版
#### 1. `app/view/admin/common/template.html`
```html
...
{% if tempType === 'table' %}
   {% include "admin/layout/_table.html" %}   
{% endif %}
{% if tempType === 'form' %}
   {% include "admin/layout/_form.html" %}   
{% endif %}
{% if tempType === 'for_form' %}
   {% include "admin/layout/_for_form.html" %}   
{% endif %}
...
```

#### 2. 新建 `app/view/admin/layout/_for_form.html`
```html
<div class="card">
    <div class="card-body">
        {% if form %}
        <form action="{{form.action}}" method="post">
            <div class="text-right mt-3">
                <button type="submit" class="btn btn-primary"
                    @click.stop.prevent="submit">提 交</button>
            </div>
        </form>
        {% endif %}
    </div>
</div>
```
