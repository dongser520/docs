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

## 二、创建商品参数
### 1. 控制器
`app/controller/admin/goods.js`
```js
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
        let goodsClassTree = await this.datatree_byid(goodsClassId, 'GoodsClass');
        // ctx.body = goodsClassTree; return;
        /*
        //渲染公共模版
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
                        placeholder: '请选择一个商品分类',
                    },
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '',
        });
        */
        //看一下当前商品分类在商品skus里面有没有创建的信息
        let skusdata = await app.model.Skus.findAll({
            where:{
                goods_class_id:goodsClassId
            }
        });
        // ctx.body = skusdata; return;
        if(skusdata){
            // ctx.body = '有对应的skus信息，可继续添加skus信息'
            await ctx.renderTemplate({
                title: '创建商品参数',//现在网页title,面包屑导航title,页面标题
                tempType: 'form', //模板类型：table表格模板 ，form表单模板,for_form循环模版
                form: {
                    //提交地址
                    action: "/shop/admin/goods-/"+goods_id+"/saveGoodsParam",
                    //  字段
                    fields: [
                        // {
                        //     label: '商品分类',
                        //     type: 'dropdown', //下拉框
                        //     name: 'pid',
                        //     default: JSON.stringify(goodsClassTree),
                        //     placeholder: '请选择一个商品分类',
                        // },
                        {
                            label: '商品参数',
                            type: 'for_form', //循环遍历数组数据到表单
                            name: 'paraminfo',
                            default: JSON.stringify(skusdata),
                            placeholder: '',
                        },
                    ],
                },
                //新增成功之后跳转到哪个页面
                successUrl: '/shop/admin/goods-/'+goods_id+'/indexGoodsParam',
            });
        }else{
            ctx.body = '没有对应的skus信息，先添加skus信息'
        }
    }
    //新增商品参数数据
    async saveGoodsParam(){
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
            paraminfo: {
                type: 'string',
                required: true,
                desc: '商品参数',
                // defValue: 0,
                range:{
                    max:5000,
                }
            },
        });
        // 参数
        const goods_id = ctx.params.goods_id;
        let data = await app.model.Goods.findOne({ where: { id:goods_id } });
        if (!data) {
            return ctx.apiFail('该商品不存在');
        }
        let { paraminfo } = this.ctx.request.body;
        // console.log('paraminfo的信息',paraminfo);
        //写入数据库
        const res = await this.app.model.GoodsParam.create({
            goods_id,
            paraminfo
        });
        this.ctx.apiSuccess('添加商品参数成功');
    }
```

### 2. 模版
`app/view/admin/layout/_form.html`
```html
{# 定义一个可递归调用的子模板 #}
{% macro renderMenu(items,keyname,type) %}
{% for item in items %}
<span class="dropdown-item" style="margin-left: {{item.level * 20}}px;
cursor: pointer;background:none;"
    onmouseover="this.style.color = '#000000';this.style.fontWeight = 800;"
    onmouseout="this.style.color = '#002222';this.style.fontWeight = 'normal';"
    @click="dropdownItemClick('{{keyname}}','{{item.name}}','{{item.id}}')">
    {% if type == 'treeDataSelect' %}
    <input type="checkbox" name="{{keyname}}" style="margin-right: 10px;"
        data="{{item.id}}" class="checkbox-{{keyname}}"
        @click.stop="treeDataSelectClick('{{keyname}}','{{item.name}}','{{item.id}}','checkbox-{{keyname}}',$event)">
    {% endif %}
    {{item.name}}
</span>
{# 检查是否存在子菜单项 #}
{% if item.children and item.children.length %}
<div class="dropdown-submenu">
    {% call renderMenu(item.children,keyname,type) %}
    {# 这里通过调用macro自身实现了递归 #}
    {% endcall %}
</div>
{% endif %}
{% endfor %}
{% endmacro %}

<div class="card">
    <div class="card-body">
        <div class="mb-4">
            <div class="bg-light">
                <button class="btn btn-default btn-sm" onclick="history.back()"
                title="点击返回上一页"><span class="fa fa-arrow-left"></span> 返回上一页</button>
            </div>
        </div>
        {% if form %}
        <form action="{{form.action}}" method="post">
            {% for item in form.fields %}
            <div class="form-group row">
                <label class="col-form-label col-md-2" 
                style="display: {% if item.hidekeyData %}none{% else %}block{% endif %};">{{item.label}}</label>
                <div class="col-md-10">
                    {# 如果是文件类型 #}
                    {% if item.type == 'file' %}
                    <input class="form-control" type="file" name="{{item.name}}"
                        @change="uploadFile($event,'{{item.name}}')">
                     <img :src="form.{{item.name}}" v-if="form.{{item.name}}"
                        class="mt-2 p-1 rounded border avatar-lg"> 

                    {# 获取字段值 #}
                    {# 可打印 {{form | dump}} #}
                    {% set fieldValue = form.data[item.name] | safe %}
                    {# 当字段值存在时显示图片 #}
                    {# {% if fieldValue and fieldValue.length > 0 %}
                        {# 通过 split 切割判断文件后缀 #}
                        {# {% set fileExtension = fieldValue.split('.').pop() | lower %} #}
                        {# 如果是 excel 文件则使用固定地址 #}
                        {# <img 
                        src="{% if fileExtension == 'xlsx' %}/public/admin/assets/img/excel.png{% else %}{{ fieldValue }}{% endif %}"
                        class="mt-2 p-1 rounded border avatar-lg"> #}
                    {# {% endif %} #} 
                    
                    {# 如果是文件上传到oss云存储里面 #}
                    {% elif item.type == 'fileoss' %}
                    <input class="form-control" type="file" name="{{item.name}}"
                        @change="uploadFileoss($event,'{{item.name}}')">
                     <img :src="form.{{item.name}}" v-if="form.{{item.name}}"
                        class="mt-2 p-1 rounded border avatar-lg"> 

                    {# 如果是下拉框类型 #}
                    {% elif item.type == 'dropdown' %}
                    {# {{ item.ortherdata | safe }} #}
                    <div class="dropdown dropdown-maindiv" ortherdata="{{ item.ortherdata }}">
                        <button type="button"
                            class="btn dropdown-toggle dropdown-{{item.name}}"
                            data-toggle="dropdown" id="dropdownData">
                            {{item.placeholder if item.placeholder else '一级分类'}}
                        </button>
                        <div class="dropdown-menu" style="height: 400px;overflow: auto;">
                            <h5 class="dropdown-header">请选择要放在哪个分类下</h5>
                            <div class="dropdown-divider"></div>
                            {# 使用定义好的子模板递归渲染菜单 #}
                            <!-- 在上面的代码块之前或之外的合适位置，提前解析item.default为JSON对象 -->
                            {% set itemDefaultParsed = item.default | safe |
                            fromJson %}
                            {# {{item.callback | dump}} #}
                            {% call
                            renderMenu(itemDefaultParsed,item.name,item.type) %}
                            {% endcall %}
                        </div>
                    </div>
                    {% elif item.type == 'btncheck' %}
                    {# 如果是按钮组选择类型 #}
                    <div class="btn-group btn-group-{{item.name}}">
                        {% set itemDefaultParsed = item.default | safe |
                        fromJson %}
                        {% for btn in itemDefaultParsed %}
                        <button type="button"
                            class="btn {{'btn-success'  if btn.checked else 'btn-light'}}"
                            @click="changeBtnStatus('{{item.name}}','btn-group-{{item.name}}','{{btn.value}}','{{ loop.index }}')">{{btn.name}}</button>
                        {% endfor %}

                    </div>
                    {# 如果是文本域类型 #}
                    {% elif item.type == 'textarea' %}
                    <textarea class="form-control" rows="5" name="{{item.name}}"
                        placeholder="{{item.placeholder}}..."
                        v-model="form.{{item.name}}"></textarea>
                    {# 如果是自定义类型组件 #}
                    {% elif item.type == 'diy' %}
                    {% if item.render %}
                    {{ item.render(item) | safe }}
                    {% endif %}
                    {# 如果是富文本编辑器 #}
                    {% elif item.type == 'editor' %}
                    {% include "admin/layout/_editor.html" %}
                    {# 如果循环遍历数组数据到表单 #}
                    {% elif item.type == 'for_form' %}
                    {# {{item.default}} #}
                    {% set forformParsed = item.default | safe | fromJson %}
                    {# {{ forformParsed | dump }} #}
                    {% if forformParsed.length == 0 %}
                        {% set ortherdataParsed = item.ortherdata | safe | fromJson %}
                        {# {{ ortherdataParsed | dump }} #}
                        {# 如果有html字段 #}
                        {% if ortherdataParsed.html %}
                            {{ ortherdataParsed.html | safe }}
                        {% endif %}
                    {% else %}
                        {% if item.id %}
                            <div class="param-groups">
                                {% for dataItem in forformParsed %}
                                <div class="param-group" data-id="{{ dataItem.id }}">
                                    {# 参数{{ loop.index }} #}
                                    <h5 class="mb-3">{{ dataItem.title }} 参数设置</h5>
                                    {% set params = dataItem.data %}
                                    <div class="row">
                                        {% for param in params %}
                                        {# param的值{{ param }} #}
                                        <div class="col-lg-3 col-md-4 mb-3">
                                            <div class="form-group">
                                                <label data="{{ param.name | trim }}">{{ param.name | trim }}</label>
                                                <input type="text"  inputId="{{item.id}}"
                                                    class="form-control"
                                                    value="{{ param.value | trim }}"
                                                    placeholder="请输入{{ param.name | trim }}">
                                            </div>
                                        </div>
                                        {% endfor %}
                                    </div>
                                </div>
                                {% if not loop.last %}<hr>{% endif %}
                                {% endfor %}
                            </div>
                        {% else %}
                            <div class="param-groups">
                                {% for dataItem in forformParsed %}
                                <div class="param-group" data-id="{{ dataItem.id }}">
                                    {# 参数{{ loop.index }} #}
                                    <h5 class="mb-3">{{ dataItem.name }} 参数设置</h5>
                                    {% set params = dataItem.default.split('，') %}
                                    <div class="row">
                                        {% for param in params %}
                                        <div class="col-lg-3 col-md-4 mb-3">
                                            <div class="form-group">
                                                {# {{ param | trim }}--{{ dataItem.id }}-{{ loop.index0 }} #}
                                                <label data="{{ param | trim }}">{{ param | trim }}</label>
                                                <input type="text"
                                                    class="form-control"
                                                    placeholder="请输入{{ param | trim }}">
                                            </div>
                                        </div>
                                        {% endfor %}
                                    </div>
                                </div>
                                {% if not loop.last %}<hr>{% endif %}
                                {% endfor %}
                            </div>
                        {% endif %}
                    {% endif %}
                       

                    
                    {# 如果是树形结构数据选择 #}
                    {% elif item.type == 'treeDataSelect' %}
                    {# 使用定义好的子模板递归渲染菜单 #}
                    <!-- 在上面的代码块之前或之外的合适位置，提前解析item.default为JSON对象 -->
                    {% set itemDefaultParsed = item.default | safe | fromJson %}
                    {% call renderMenu(itemDefaultParsed,item.name,item.type) %}
                    {% endcall %}
                    {% else %}
                    <input 
                    style="display: {% if item.hidekeyData %}none{% else %}block{% endif %};"
                    type="{{item.type}}" class="form-control"
                        name="{{item.name}}"
                        placeholder="{{item.placeholder}}..."
                        v-model="form.{{item.name}}">
                    {% endif %}
                </div>
            </div>
            {% endfor %}

            <div class="text-right mt-3">
                <button type="submit" class="btn btn-primary"
                    @click.stop.prevent="submit">提 交</button>
            </div>
        </form>
        {% endif %}
    </div>
</div>

<script>
    Vueapp = new Vue({
        el:'#vueapp',
        data(){
           return {
              form:{
                {% for item in form.fields %}
                   {{item.name}} : `{{ (form.data[item.name]|safe) if form.data[item.name] else  item.default  }}`,
                {% endfor %}
              },
              uploadedFiles: {}, //存储每个item.name对应的已上传文件路径
           }
        },
        mounted(){
            console.log('form',this.form);
            console.log('btn',typeof this.form.status);

            $('.form-group input').on('input',function(){
                // console.log($(this).val());
                let val = $(this).val();
                $(this).attr('datavalue',val);
            });
        },
        methods:{
            getparaminfo(){
                let arr = [];
                $('.param-groups .param-group').each(function(index,element){
                    let arr_eve = {
                        title:  $(element).find('h5').text(), // 获取标题
                        data:[], // 获取参数
                    };
                    let paramGroupId = $(element).attr('data-id');
                    let formGroups = $(element).find('.row').find('.form-group');
                    formGroups.each(function(index1,element1){
                        arr_eve.data.push({
                            name: $(element1).find('label').attr('data'),
                            value: $(element1).find('input').attr('datavalue') || $(element1).find('input').val(),
                        });
                    });
                    arr.push(arr_eve);
                });
                return arr;
            },
            submit(){
                // console.log('提交成功',this.form);
                // console.log(JSON.parse(this.form.pid.replaceAll('&quot;','"')));
                // console.log('下拉框第一项', JSON.parse(this.form.pid.replaceAll('&quot;','"'))[0]);
                // console.log('按钮组第一项', JSON.parse(this.form.status.replaceAll('&quot;','"'))[0]);
                for(const key in this.form){
                   const value = this.form[key];
                   console.log('value:',value);
                    if(typeof value == 'string' && value.length > 0  && value.indexOf('&quot;')>-1){
                      if(key == 'paraminfo'){
                        this.form[key] = JSON.stringify(this.getparaminfo());
                      }else{
                        this.form[key] = JSON.parse(value.replaceAll('&quot;','"'))[0].value;
                      }
                    }else{
                        // goods_param表 paraminfo修改的时候单独处理
                        if(key == 'paraminfo'){
                            // 针对 for-form 类型 写入paraminfo数据
                            console.log('for-form 类型的paraminfo',this.getparaminfo());
                            // 针对dropdown类型，写入paraminfo数据
                            console.log('dropdown 类型的paraminfo',this.form[key]);
                            if(this.getparaminfo().length){
                                this.form[key] = JSON.stringify(this.getparaminfo());
                            }
                        }
                    }
                }
                //提交之前，针对商品多参数的处理，如 paraminfo的处理
                // console.log(this.getparaminfo());;
                // console.log('提交成功1',this.form);
                // return;
                $.ajax({
                    type: 'POST', 
                    url: "{{form.action}}?_csrf={{ctx.csrf|safe}}",
                    // contentType:'application/x-www-form-urlencoded',
                    // data: {
                    //     username:123,
                    //     sex:'女'
                    // },
                    contentType:'application/json;charset=UTF-8;',
                    data:JSON.stringify(this.form),
                    success: function (response, stutas, xhr) {
                        console.log(response)
                        Vueapp.$refs.toast.show({
                            // msg:response.data || "{{'修改'  if id else '新建' }}成功",
                            msg:"{{'修改'  if id else '新建' }}成功",
                            type:'success',
                            delay:1000,
                            success:function(){
                                // 查询当前网址是否有gourl参数
                                let gourl = window.location.search.match(/gourl=([^&]*)/);
                                gourl = decodeURIComponent(gourl).split(',');
                                if(gourl && gourl[1]){
                                    // 跳转到gourl对应的页面
                                    window.location.href = gourl[1];
                                } else{
                                    // 跳转到某个页面
                                    window.location.href = "{{successUrl}}";
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
            },
            //如果是文件上传到本地服务器
            uploadFile(e,name,callback=null){
            //    console.log('e:', e);
            //    console.log('name:',name);
               let file = e.target.files[0];
            //    console.log(file);
               let formData = new FormData();
               formData.append('file', file);
               $.ajax({
                    type: 'POST', 
                    url: "/uploadStreamSingleToServerDiy/adminImg?_csrf={{ctx.csrf|safe}}",
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    data: formData,
                    contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                    success:  (response, stutas, xhr)=> {
                        console.log(response)
                        this.form[name] = response.data.url;
                        Vueapp.$refs.toast.show({
                            msg:"上传图片成功",
                            type:'success',
                            delay:1000,
                            success:function(){}
                        });

                        // 使用$set将上传成功的文件URL添加到uploadedFiles对象
                        this.$set(this.uploadedFiles,name,response.data.url);
                        if(callback && typeof callback === 'function'){
                            callback({
                               event: e,
                               name:name,
                               data:response.data
                            });
                        }

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
            },
            //如果是文件上传到oss云存储里面
            uploadFileoss(e,name,callback=null){
            //    console.log('e:', e);
            //    console.log('name:',name);
               let file = e.target.files[0];
            //    console.log(file);
               let formData = new FormData();
               formData.append('img', file);
               $.ajax({
                    type: 'POST', 
                    url: "/shop/admin/image/uploadAliyun?_csrf={{ctx.csrf|safe}}",
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    data: formData,
                    contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                    success:  (response, stutas, xhr)=> {
                        console.log(response)
                        this.form[name] = response.data[0].url;
                        Vueapp.$refs.toast.show({
                            msg:"上传图片成功",
                            type:'success',
                            delay:1000,
                            success:function(){}
                        });

                        // 使用$set将上传成功的文件URL添加到uploadedFiles对象
                        this.$set(this.uploadedFiles,name,response.data.url);
                        if(callback && typeof callback === 'function'){
                            callback({
                               event: e,
                               name:name,
                               data:response.data
                            });
                        }

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
            },
            //下拉菜单选中项
            dropdownItemClick(keyname,name,id){
                console.log('keyname', keyname);
                console.log('name', name);
                console.log('id', id);
                // $('#dropdownData').text(name);
                $('.dropdown-' + keyname).text(name);
                this.form[keyname] = id;
                let _vue_this = this;
                
                // 如果下拉框有额外值的情况，比如：app/controller/admin/goods.js中的selectGoodsParamBytree()方法
                if($('.dropdown-maindiv').attr('ortherdata')){
                    $('.dropdown-maindiv').parent().find('.ortherdata').remove();
                    //如果有额外值，根据情况读取这些额外值
                    let ortherdata = JSON.parse($('.dropdown-maindiv').attr('ortherdata'));
                    console.log('额外值',ortherdata);
                    let skus = ortherdata.find(v=> v.id == id);
                    skus = skus.skus;
                    console.log('skus',skus);
                    let str = ``;
                    for(let i=0;i<skus.length;i++){
                       // let evedata = [];
                       // evedata.push(encodeURIComponent(JSON.stringify([{
                       //    title: skus[i].name,
                       //    data: skus[i].default,
                       // }])));
                       let evedata = encodeURIComponent(JSON.stringify([{
                          title: skus[i].name,
                          data: skus[i].default,
                          id:skus[i].id,
                       }]));
                       let _str = `<div class="evedata" 
                       evedata = "${evedata}"
                       style="margin-top:20px;font-size:12px;display:flex;">`;
                        _str += `
                            <div style="margin-right:10px;">
                              <input type="checkbox" checked class="evedata-checkbox" data-id="${skus[i].id}" />
                            </div>
                            <div>
                               <div style="margin-bottom:10px;"><span>规格名称</span>：<span>${skus[i].name}</span></div>
                               <div><span>规格值</span>：<span>${skus[i].default}</span></div>
                            </div>
                        `;
                       _str += `</div>`;
                       str += _str;
                    }
                    str = `<div class="ortherdata">` + str + `</div>`;
                    $('.dropdown-maindiv').parent().append(str);
                    //重新给表单字段赋值
                    getcheck();
                    $('.evedata-checkbox').on('click',getcheck);
                    function getcheck(){
                        let arr = [];
                        $('.dropdown-maindiv').parent().find('.ortherdata').find('.evedata').each(function(index,ele){
                            let input = $(ele).find('input[type="checkbox"]');
                            //如果input为选中状态
                            // console.log('input的个数'+index+'的选中状态',input.prop('checked'));
                            if(input.prop('checked')){
                                let evedata = $(ele).attr('evedata');
                                evedata = JSON.parse(decodeURIComponent(evedata));
                                // console.log('evedata',evedata[0]);
                                arr.push(evedata[0]);
                                // console.log('写进paraminfo的数据',arr);
                            }else{
                                let removeid = input.attr('data-id');
                                arr.forEach(function(v,i){
                                    if(v.id == removeid){
                                        arr.splice(i,1);
                                    }
                                });
                                // console.log('移除之后写进paraminfo的数据',arr);
                            }
                            //最终写进paraminfo的数据
                            console.log('最终写进paraminfo的数据',arr);
                            // 需要符合paraminfo的数据特性，在改造一下
                            let newarr = [];
                            for(let i=0;i<arr.length;i++){
                                let _string = arr[i].data;
                                // console.log('看一下data',typeof arr[i].data);
                                let _data = _string.split(/[,，]/); 
                                // console.log('看一下_data',_data);
                                let _arr = [];
                                for(let j=0;j<_data.length;j++){
                                    let obj = {
                                       name:_data[j],
                                       value:"",
                                    };
                                    _arr.push(obj);
                                }
                                // console.log('看一下_arr',_arr);
                                // console.log('看一下其中的data',arr[i]['data']);
                                // arr[i]['data'] = _arr;
                                let _obj = {
                                    title:arr[i].title,
                                    data:_arr,
                                    id:arr[i].id,
                                };
                                newarr.push(_obj);
                            }
                            console.log('看一下写入值',newarr);
                            _vue_this.form[keyname] = JSON.stringify(newarr);
                        });
                    }
                    
                    
                }
            },
            //按钮组选中项
            changeBtnStatus(keyname,classname,btnValue,index){
                console.log(keyname,classname,btnValue,index);
                $('.' + classname).find('button').eq(index-1).addClass('btn-success')
                .siblings().removeClass('btn-success').addClass('btn-light');
                this.form[keyname] = btnValue;
            },
            //自定义的按钮组点击效果
            diyBtnGroup(clickbtn_parentClassname,classname,index){
               $('.' + classname).children().eq(index).show().siblings().hide();
               $('.' + clickbtn_parentClassname).children().eq(index)
               .addClass('btn-success').siblings().removeClass('btn-success').addClass('btn-light');
            },
            treeDataSelectClick(keyname,name,id,classname,e){
                // console.log('keyname', keyname);
                // console.log('name', name);
                // console.log('id', id);
                // console.log('classname', classname);
                // console.log('事件对象', e);

                // 选中上一级下一级所有都选中
                // console.log('父级class', $(e.target).parent().parent().attr('class'));
                if($(e.target).parent().parent().attr('class') != 'dropdown-submenu'){
                   let checkbox = $(e.target).parent().next().find('input[type="checkbox"]'); 
                   if($(e.target).is(':checked')){
                       checkbox.prop('checked',true).attr('select',1);
                   }else{
                       checkbox.prop('checked',false).attr('select',0);
                   }
                   //设置自己
                   if($(e.target).is(':checked')){
                     $(e.target).attr('select',1);
                   }else{
                    $(e.target).attr('select',0);
                   }
                }else{
                    //每个级别下的所有多选框数量
                    let all = $(e.target).parent().parent().find('input[type="checkbox"]').length;
                    //当前这个级别下面选了多少个框了
                    let len = $(e.target).parent().parent().find('input[type="checkbox"]:checked').length;
                    // console.log('当前级别总共多少框',all);
                    // console.log('当前级别选了多少框',len);
                    if(all == len){
                        $(e.target).parent().parent().prev().find('input[type="checkbox"]')
                        .prop('checked',true).attr('select',1);
                    }else{
                        $(e.target).parent().parent().prev().find('input[type="checkbox"]')
                        .prop('checked',false).attr('select',1);
                    }
                    //设置自己
                    if($(e.target).is(':checked')){
                        $(e.target).attr('select',1);
                    }else{
                        $(e.target).attr('select',0);
                    }
                    //一个都没有选
                    if(len == 0){
                        $(e.target).parent().parent().prev().find('input[type="checkbox"]')
                        .prop('checked',false).attr('select',0);
                    }
                }

                //选取选中的值
                // console.log('选取框的长度', $(`input[name=${keyname}]:checked`).length);
                let arr = [];
                // $(`input[name=${keyname}]:checked`).each(function(index,element){
                //      console.log($(element).attr('data'));
                //      arr.push(parseInt($(element).attr('data')));
                // });
                $(`input[name=${keyname}]`).each(function(index,element){
                     if($(element).attr('select') == 1){
                        arr.push(parseInt($(element).attr('data')));
                     }
                });

                // console.log('获取权限的id值集合数据',arr);
                console.log('写进数据库数据',arr.join(','));
                this.form[keyname] = arr.join(',');

            }
        }
    });
</script>


```





## 三、商品参数信息列表及删除
### 1. 控制器
`app/controller/admin/goods.js`
```js
    //商品参数列表
    async indexGoodsParam(){
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
        let Goodsdata = await app.model.Goods.findOne({ where: { id:goods_id } });
        if (!Goodsdata) {
            return ctx.apiFail('该商品不存在');
        }
        let GoodsClassdata = await app.model.GoodsClass.findOne({
            where: { 
                id:Goodsdata.goods_class_id 
            },
            include: [
                { model: app.model.Skus},
            ] 
        });
        // ctx.body = GoodsClassdata;return;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        let data = await ctx.page('GoodsParam');
        // let data = await ctx.service.goodsClass.datalist({ limit: 10000 });
        // console.log('分类数据', data);
        // ctx.body = data;
        // return;
        // data = data.rules;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '商品：' + Goodsdata.name + '参数列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/shop/admin/goods-/'+goods_id+'/createGoodsParam',//新增路径
                        desc: '创建商品参数',//新增 //按钮名称
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
                        title: '商品参数',
                        // key: 'paraminfo',
                        class: 'text-left',//可选
                        render(item) { //树形数据
                            // console.log('每个item',item);
                            // if (item.level) {
                            //     let w = item.level * 40;
                            //     return `<span style="display:inline-block;width:${w}px"></span>`;
                            // }
                            let str = ``;
                            let data = JSON.parse(item.paraminfo);
                            for (let i = 0; i < data.length; i++) {
                                let _str = `<p style="width:100%;margin-top:15px;">${data[i].title}</p>`;
                                let valuearr = data[i].data;
                                let _str_ = ``;
                                for(let j=0;j<valuearr.length;j++){
                                    _str_ += `
                                        <p style="font-size:12px;border:1px solid #ccc;margin:5px;padding:5px;">
                                            <span >${valuearr[j].name}</span>：
                                            <span style="color:#f00">${valuearr[j].value}</span>
                                        </p>
                                    `;
                                }
                                str += `<div style="display:flex;flex-wrap:wrap;">${_str}${_str_}</div>`;
                            }
                            return `<div>${str}</div>`;
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
                                @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/shop/admin/goods-/${goods_id}/indexGoodsParam','GoodsParam')">${arr[i].name}</button>`;
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
                                return `/shop/admin/goods-/${id}/editGoodsParam`;
                            },
                            //删除
                            delete: function (id) {
                                return `/shop/admin/goods-/${id}/deleteGoodsParam`;
                            }
                        }
                    },
                ],
            },
        });
    }
    //删除商品参数
    async deleteGoodsParam(){
        const { ctx, app } = this;
        const id = ctx.params.id;

        let data = await app.model.GoodsParam.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('该商品参数不存在');
        }
        await app.model.GoodsParam.destroy({
            where: {
                id
            }
        });
        //提示
        ctx.toast('商品参数删除成功', 'success');
        //跳转
        ctx.redirect('/shop/admin/goods-/'+data.goods_id+'/indexGoodsParam');
    }
```

### 2. 商品分类的模型关联
`app/model/goods_class.js`
```js
...
    // 模型关联关系
    GoodsClass.associate = function (models) {
        // 关联到自己 （通过pid关联）
        this.hasMany(app.model.GoodsClass, {
            foreignKey: 'pid',
            as: 'ChildGoodsClass' // 别名（可选）
        });

        // 关联商品
        this.hasMany(app.model.Goods, {
            foreignKey: 'goods_class_id',
            // as: 'images' // 别名（可选）
        });

        // 关联skus
        this.hasMany(app.model.Skus, {
            foreignKey: 'goods_class_id',
            // as: 'images' // 别名（可选）
        });


    }
...
```


## 四、修改商品参数信息
### 1. 控制器
`app/controller/admin/goods.js`
```js
    //修改商品参数界面
    async editGoodsParam(){
        const { ctx, app } = this;
        const id = ctx.params.id;
        let currentdata = await app.model.GoodsParam.findOne({
            where: {
                id,
                // status:1
            }
        });
        if (!currentdata) {
            return ctx.apiFail('该商品参数信息不存在');
        }
        currentdata = JSON.parse(JSON.stringify(currentdata));
        // console.log('当前商品分类数据', currentdata);
        // return;
        let Goodsdata = await app.model.Goods.findOne({
            where: {
                id: currentdata.goods_id,
                // status:1
            }
        });

        // 渲染模版前先拿到所有分类
        // let data = await ctx.service.goodsClass.dropdown_goodsclass_list();
        // console.log('下拉框显示的所有分类', JSON.stringify(data));
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改商品：'+Goodsdata.name+'的参数',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改提交地址
                action: '/shop/admin/goods-/' + id + '/updateGoodsParam',
                //  字段
                fields: [
                    // {
                    //     label: '放在哪个商品分类里面',
                    //     type: 'dropdown', //下拉框
                    //     name: 'goods_class_id',
                    //     default: JSON.stringify(data),
                    //     placeholder: '不调整（如需调整请选择）',
                    // },
                    {
                        label: '商品参数信息',
                        type: 'for_form', 
                        name: 'paraminfo',
                        placeholder: '',
                        default:currentdata.paraminfo,
                        id: id, //加一个id，代表修改，没有代表新增
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
            successUrl: '/shop/admin/goods-/'+currentdata.goods_id+'/indexGoodsParam',
        });
    }
    //修改商品参数数据
    async updateGoodsParam(){
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '商品参数id',
                // defValue: 0,
                range:{
                    min:1,
                }
            },
            paraminfo: {
                type: 'string',
                required: true,
                desc: '商品参数信息',
                // defValue: 0,
                range:{
                    max:5000
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
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '排序'
            },
        });
        // 参数
        const id = ctx.params.id;
        // 先看一下是否存在
        let data = await app.model.GoodsParam.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('该商品参数不存在');
        }
        const {  status, order, paraminfo } = ctx.request.body;
        let goods_id = data.goods_id;
        // 修改数据
        data.paraminfo = paraminfo;
        data.status = status;
        data.goods_id = goods_id;
        data.order = order;
        await data.save();
        // 给一个反馈
        ctx.apiSuccess('修改商品参数成功');
    }
```

## 五、商品的参数没有对应的skus信息，先添加skus信息
### 1. 控制器
`app/controller/admin/goods.js`
```js
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
        let goodsClassTree = await this.datatree_byid(goodsClassId, 'GoodsClass');
        // ctx.body = goodsClassTree; return;
        /*
        //渲染公共模版
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
                        placeholder: '请选择一个商品分类',
                    },
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '',
        });
        */
        //看一下当前商品分类在商品skus里面有没有创建的信息
        let skusdata = await app.model.Skus.findAll({
            where:{
                goods_class_id:goodsClassId
            }
        });
        // ctx.body = skusdata; return;
        // 获取当前页面网址
        let gourl = encodeURIComponent(ctx.url);
        if(skusdata.length){
            // ctx.body = '有对应的skus信息，可继续添加skus信息'
            await ctx.renderTemplate({
                title: '创建商品参数',//现在网页title,面包屑导航title,页面标题
                tempType: 'form', //模板类型：table表格模板 ，form表单模板,for_form循环模版
                form: {
                    //提交地址
                    action: "/shop/admin/goods-/"+goods_id+"/saveGoodsParam",
                    //  字段
                    fields: [
                        // {
                        //     label: '商品分类',
                        //     type: 'dropdown', //下拉框
                        //     name: 'pid',
                        //     default: JSON.stringify(goodsClassTree),
                        //     placeholder: '请选择一个商品分类',
                        // },
                        {
                            label: '商品参数',
                            type: 'for_form', //循环遍历数组数据到表单
                            name: 'paraminfo',
                            default: JSON.stringify(skusdata),
                            placeholder: '',
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
                                { value: 0, name: '不可用',  },
                            ]),
                            placeholder: '状态 0不可用 1可用 等等状态',
                        },
                    ],
                },
                //新增成功之后跳转到哪个页面
                successUrl: '/shop/admin/goods-/'+goods_id+'/indexGoodsParam',
            });
        }else{
            // ctx.body = '没有对应的skus信息，先添加skus信息'
            await ctx.renderTemplate({
                title: '创建商品参数',//现在网页title,面包屑导航title,页面标题
                tempType: 'form', //模板类型：table表格模板 ，form表单模板,for_form循环模版
                form: {
                    //提交地址
                    action: "/shop/admin/goods-/"+goods_id+"/saveGoodsParam",
                    //  字段
                    fields: [
                        // {
                        //     label: '商品分类',
                        //     type: 'dropdown', //下拉框
                        //     name: 'pid',
                        //     default: JSON.stringify(goodsClassTree),
                        //     placeholder: '请选择一个商品分类',
                        // },
                        {
                            label: '商品参数',
                            type: 'for_form', //循环遍历数组数据到表单
                            name: 'paraminfo',
                            default: JSON.stringify(skusdata),//没有值的情况
                            placeholder: '',
                            //自定义一些数据
                            ortherdata:JSON.stringify({
                                html:`
                                    <a href="/shop/admin/skus/create?gourl=${gourl}&goods_class_id=${goodsClassId}">
                                       请先创建规格数据，再来创建商品参数
                                    </a>
                                `,
                            }),
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
                                { value: 0, name: '不可用',  },
                            ]),
                            placeholder: '状态 0不可用 1可用 等等状态',
                        },
                    ],
                },
                //新增成功之后跳转到哪个页面
                successUrl: '/shop/admin/goods-/'+goods_id+'/indexGoodsParam',
            });
        }
    }
    //新增商品参数数据
    async saveGoodsParam(){
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
            paraminfo: {
                type: 'string',
                required: true,
                desc: '商品参数信息',
                // defValue: 0,
                range:{
                    max:5000
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
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '排序'
            },
        });
        // 参数
        const goods_id = ctx.params.goods_id;
        let data = await app.model.Goods.findOne({ where: { id:goods_id } });
        if (!data) {
            return ctx.apiFail('该商品不存在');
        }
        let {paraminfo,status,order} = ctx.request.body;
        if(paraminfo == '[]'){
             return ctx.apiFail('请先创建规格数据，再来创建商品参数');
        }
        const res = await app.model.GoodsParam.create({
            paraminfo,status,order,
            goods_id
        });
        this.ctx.apiSuccess('添加商品参数成功');
    }
```

### 2. skus的控制器
`app/controller/admin/skus.js`
```js
    // 创建商品规格界面
    async create() {
        const { ctx, app } = this;

        // 渲染模版前先拿到所有分类
        let data = await ctx.service.goodsClass.dropdown_goodsclass_list();
        data.shift();
        // console.log('分类数据', data);
        if(data.length == 0){
            //提示
            ctx.toast('请先创建商品分类，在创建商品规格', 'danger');
            //跳转
            return  ctx.redirect('/shop/admin/goodsclass/create');
        }

        // ctx.body = data;return;
        //看一下网址上是否有商品分类id    goods_class_id
        let _fields = [
            {
                label: '放在哪个商品分类里面',
                type: 'dropdown', //下拉框
                name: 'goods_class_id',
                default: JSON.stringify(data),
                placeholder: '请选择一个商品分类',
            }
        ];
        // ctx.body = _fields;return;
        if(ctx.query.goods_class_id){
            let goodsClass = await app.model.GoodsClass.findByPk(parseInt(ctx.query.goods_class_id));
            if(goodsClass){
                data = [];
                data.push(goodsClass);
                _fields[0].default = goodsClass.id;
                _fields[0].placeholder = '';
                _fields[0].type = 'number';
                _fields[0].hidekeyData = true; //隐藏数据
            }
            // ctx.body = _fields;return;
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
                    ..._fields,
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
```


## 六、商品多条参数信息的创建
### 1. 控制器
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
        let goodsClassTree = await this.datatree_byid(goodsClassId, 'GoodsClass');
        // ctx.body = goodsClassTree; return;
        /*
        //渲染公共模版
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
                        placeholder: '请选择一个商品分类',
                    },
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '',
        });
        */
        //看一下当前商品分类在商品skus里面有没有创建的信息
        let skusdata = await app.model.Skus.findAll({
            where:{
                goods_class_id:goodsClassId
            }
        });
        // ctx.body = skusdata; return;
        //获取当前页面的网站
        let gourl = encodeURIComponent(ctx.url);
        if(skusdata.length){
            // ctx.body = '有对应的skus信息，可继续添加skus信息'
            await ctx.renderTemplate({
                title: '创建商品参数',//现在网页title,面包屑导航title,页面标题
                tempType: 'form', //模板类型：table表格模板 ，form表单模板,for_form循环模版
                form: {
                    //提交地址
                    action: "/shop/admin/goods-/"+goods_id+"/saveGoodsParam",
                    //  字段
                    fields: [
                        // {
                        //     label: '商品分类',
                        //     type: 'dropdown', //下拉框
                        //     name: 'pid',
                        //     default: JSON.stringify(goodsClassTree),
                        //     placeholder: '请选择一个商品分类',
                        // },
                        {
                            label: '商品参数',
                            type: 'for_form', //循环遍历数组数据到表单
                            name: 'paraminfo',
                            default: JSON.stringify(skusdata),
                            placeholder: '',
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
                                { value: 0, name: '不可用',  },
                            ]),
                            placeholder: '状态 0不可用 1可用 等等状态',
                        },
                    ],
                },
                //新增成功之后跳转到哪个页面
                successUrl: '/shop/admin/goods-/'+goods_id+'/indexGoodsParam',
            });
        }else{
            // ctx.body = '没有对应的skus信息，先添加skus信息'
            await ctx.renderTemplate({
                title: '创建商品参数',//现在网页title,面包屑导航title,页面标题
                tempType: 'form', //模板类型：table表格模板 ，form表单模板,for_form循环模版
                form: {
                    //提交地址
                    action: "/shop/admin/goods-/"+goods_id+"/saveGoodsParam",
                    //  字段
                    fields: [
                        // {
                        //     label: '商品分类',
                        //     type: 'dropdown', //下拉框
                        //     name: 'pid',
                        //     default: JSON.stringify(goodsClassTree),
                        //     placeholder: '请选择一个商品分类',
                        // },
                        {
                            label: '商品参数',
                            type: 'for_form', //循环遍历数组数据到表单
                            name: 'paraminfo',
                            default: JSON.stringify(skusdata),//没有值的情况
                            placeholder: '',
                            // 自定义一些数据
                            ortherdata:JSON.stringify({
                                html:`
                                    <a href="/shop/admin/skus/create?gourl=${gourl}&goods_class_id=${goodsClassId}">
                                      请先创建规格数据，再来创建商品参数
                                    </a>
                                `,
                            }),
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
                                { value: 0, name: '不可用',  },
                            ]),
                            placeholder: '状态 0不可用 1可用 等等状态',
                        },
                    ],
                },
                //新增成功之后跳转到哪个页面
                successUrl: '/shop/admin/goods-/'+goods_id+'/indexGoodsParam',
            });
        }
    }
    //新增商品参数数据
    async saveGoodsParam(){
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
            paraminfo: {
                type: 'string',
                required: true,
                desc: '商品参数信息',
                // defValue: 0,
                range:{
                    max:5000
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
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '排序'
            },
        });
        // 参数
        const goods_id = ctx.params.goods_id;
        let data = await app.model.Goods.findOne({ where: { id:goods_id } });
        if (!data) {
            return ctx.apiFail('该商品不存在');
        }
        let {paraminfo,status,order} = ctx.request.body;
        const res = await app.model.GoodsParam.create({
            paraminfo,status,order,
            goods_id
        });
        this.ctx.apiSuccess('添加商品参数成功');
    }
    //选择一个商品分类下的skus添加到商品参数中
    async selectGoodsParamBytree(){
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
        // 选择一个商品分类（读取有skus信息的商品分类）
        let getskus = await app.model.Skus.findAll({
            attributes:['goods_class_id'],
        });
        // ctx.body = getskus; return;
        let goodsclass_ids = [];
        // 如果goodsclass_ids没有item.goods_class_id的值，就添加进去
        getskus.forEach(item=>{
            if(goodsclass_ids.indexOf(item.goods_class_id) == -1){
                goodsclass_ids.push(item.goods_class_id);
            }
        });
        // ctx.body = goodsclass_ids; return;
        // 根据goodsclass_ids查商品分类信息
        let goodsClassTree = await app.model.GoodsClass.findAll({
            where:{
                id:{
                    [this.app.Sequelize.Op.in]:goodsclass_ids
                }
            },
            attributes:['id','name','pid'],
            include: [
                { 
                    model: app.model.Skus,
                    attributes:['id','name','goods_class_id','default'], 
                    // as: 'children' 
                },
            ],
        });
        goodsClassTree = JSON.parse(JSON.stringify(goodsClassTree)); 
        // ctx.body = goodsClassTree; return;
        // ctx.body = ctx.treeify(goodsClassTree); return;
        let treedata = ctx.treeify(goodsClassTree);
        await ctx.renderTemplate({
            title: '创建商品多条参数前，请先选择一个商品分类，将该分类下的规格数据添加到商品参数中',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板,for_form循环模版
            form: {
                //提交地址
                action: "/shop/admin/goods-/"+goods_id+"/saveGoodsParam",
                //  字段
                fields: [
                    {
                        label: '请选择一个商品分类得到分类下的规格数据',
                        type: 'dropdown', //下拉框
                        name: 'paraminfo',
                        default: JSON.stringify(treedata),
                        placeholder: '请选择一个商品分类',
                        //其他数据
                        ortherdata:JSON.stringify(goodsClassTree),
                        
                    },
                    // {
                    //     label: '商品参数',
                    //     type: 'for_form', //循环遍历数组数据到表单
                    //     name: 'paraminfo',
                    //     default: JSON.stringify(skusdata),//没有值的情况
                    //     placeholder: '',
                    //     // 自定义一些数据
                    //     ortherdata:JSON.stringify({
                    //         html:`
                    //             <a href="/shop/admin/skus/create?gourl=${gourl}&goods_class_id=${goodsClassId}">
                    //               请先创建规格数据，再来创建商品参数
                    //             </a>
                    //         `,
                    //     }),
                    // },
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '/shop/admin/goods-/'+goods_id+'/indexGoodsParam',
        });
    }
    //商品参数列表
    async indexGoodsParam(){
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
        let Goodsdata = await app.model.Goods.findOne({ where: { id:goods_id } });
        if (!Goodsdata) {
            return ctx.apiFail('该商品不存在');
        }
        let GoodsClassdata = await app.model.GoodsClass.findOne({
            where:{
                id:Goodsdata.goods_class_id
            },
            include: [
                { 
                    model: app.model.Skus, 
                    // as: 'children' 
                },
            ],
        });
        // ctx.body = GoodsClassdata; return;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        let data = await ctx.page('GoodsParam',{
            goods_id:goods_id
        });
        // let data = await ctx.service.goodsClass.datalist({ limit: 10000 });
        // console.log('分类数据', data);
        // ctx.body = data;
        // return;
        // data = data.rules;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '商品：' + Goodsdata.name + ' 参数列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/shop/admin/goods-/'+goods_id+'/createGoodsParam',//新增路径
                        desc: '创建商品（单条）参数',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    },
                    {
                        url: '/shop/admin/goods-/'+goods_id+'/selectGoodsParamBytree',//新增路径
                        desc: '创建商品（多条）参数',//新增 //按钮名称
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
                        title: '商品参数信息',
                        // key: 'paraminfo',
                        class: 'text-left',//可选
                        render(item) { //树形数据
                            // console.log('每个item',item);
                            // if (item.level) {
                            //     let w = item.level * 40;
                            //     return `<span style="display:inline-block;width:${w}px"></span>`;
                            // }
                            let str =``;
                            let data = JSON.parse(item.paraminfo);
                            for(let i=0; i<data.length; i++){
                                let _str = `<p style="width:100%;margin-top:15px;">${data[i].title}</p>`;
                                let valuearr = data[i].data;
                                let _str_ = ``;
                                for(let j=0; j<valuearr.length; j++){
                                  _str_ += `
                                    <p style="font-size:12px;border:1px solid #ccc;padding:5px;margin-right:10px;">
                                      <span>${valuearr[j].name}</span>：
                                      <span style="color:#ff0000">${valuearr[j].value}</span>
                                    </p>
                                  `;
                                }
                                str += `<div style="display:flex;flex-wrap:wrap;">${_str}${_str_}</div>`;
                            }
                            return `<div>${str}</div>`;
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
                                @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/shop/admin/goods-/${goods_id}/indexGoodsParam','GoodsParam')">${arr[i].name}</button>`;
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
                                return `/shop/admin/goods-/${id}/editGoodsParam`;
                            },
                            //删除
                            delete: function (id) {
                                return `/shop/admin/goods-/${id}/deleteGoodsParam`;
                            }
                        }
                    },
                ],
            },
        });
    }
```

### 2. 路由
`app/router/admin/shop.js`
```js
...
    //商品参数goods_param处理
    //选择一个商品分类下的skus添加到商品参数中
    router.get('/shop/admin/goods-/:goods_id/selectGoodsParamBytree', controller.admin.goods.selectGoodsParamBytree);
    router.get('/shop/admin/goods-/:goods_id/createGoodsParam', controller.admin.goods.createGoodsParam);
    router.post('/shop/admin/goods-/:goods_id/saveGoodsParam', controller.admin.goods.saveGoodsParam);
    router.get('/shop/admin/goods-/:goods_id/indexGoodsParam', controller.admin.goods.indexGoodsParam);
...
```


## 七、商品选购信息管理
> 具体查看，<a href="eggjs.创建商品sku选购信息" target="_blank">eggjs.创建商品sku选购信息</a><br/>