---
navbar: true
sidebar: auto
title: eggjs商品sku选购信息管理
---

## 一、商品sku选购信息表 `goods_sku`
> 具体查看，<a href="/web/mysql/goods_class.html#_4-商品表goods的选购sku表goods-sku-商品选购sku表-字段设计" target="_blank">4. 商品表goods的选购sku表goods_sku[商品选购sku表]字段设计</a><br/>

## 二、创建商品sku选购信息
### 1. 路由
`app/router/admin/shop.js`
```js
    ...
    //商品购物车选购goods_sku
    router.get('/shop/admin/goods-/:goods_id/createGoodsSku', controller.admin.goods.createGoodsSku);
    router.post('/shop/admin/goods-/:goods_id/saveGoodsSku', controller.admin.goods.saveGoodsSku);
    router.get('/shop/admin/goods-/:goods_id/indexGoodsSku', controller.admin.goods.indexGoodsSku);
    router.get('/shop/admin/goods-/:id/deleteGoodsSku', controller.admin.goods.deleteGoodsSku);
    //商品参数goods_param处理
    //选择一个商品分类下的skus添加到商品参数中
    ...
```

### 2. 新建模型
`app/model/goods_sku.js`
```js
'use strict';


module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT,DECIMAL } = app.Sequelize;

    const GoodsSku = app.model.define('goods_sku', {
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
        name: {
            type: STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '选购组合名称'
        },
        cover: {
            type: STRING(2000),
            allowNull: true,
            defaultValue: '',
            comment: '选购组合封面图'
        },
        stock: {
            type: INTEGER,//不限定长度.默认int(11)
            allowNull: true,
            defaultValue: 0,
            comment: '商品选购组合库存数量'
        },
        price: {
            type: DECIMAL(10, 2),
            allowNull: true,
            comment: '商品选购组合价格'
        },
        special_price: {
            type: DECIMAL(10, 2),
            allowNull: true,
            comment: '商品选购组合优惠价格'
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
    GoodsSku.associate = function (models) {
        // 关联商品 反向一对多
        GoodsSku.belongsTo(app.model.Goods, {
            foreignKey: 'goods_id', // 关联外键
        });
    }

    return GoodsSku;
}
```

### 3. 模版
#### 1. `_form.html`模版代码
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
                       
                    {# 商品sku动态表单 #}
                    {% elif item.type == 'for_form_goodsSku' %}
                    {% include "admin/layout/_for_form_goodsSku.html" %}

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

            {% if not form.hideSubmit %}
            <div class="text-right mt-3">
                <button type="submit" class="btn btn-primary"
                    @click.stop.prevent="submit">提 交</button>
            </div>
            {% endif %}
            
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

#### 2. 新建 `_for_form_goodsSku.html` 模版
`app/view/admin/layout/_for_form_goodsSku.html`
```html
<div id="goodsSkudata">
    {# 添加sku区 #}
    <div class="sku-form">
        <span class="btn btn-primary mb-2" style="width: 200px;cursor: pointer;" id="addGoodsSkuInput">再加一项</span>
        <div style="display: flex;flex-wrap: nowrap;" class="sku-item mt-2">
            <input type="text" 
            placeholder="选购项名称如：手机颜色" 
            class="form-control sku-name" style="width: 200px;" />
            <input type="text"  
            placeholder="选购项值如：白色，黑色（用逗号隔开）" 
            class="form-control ml-2 sku-values" />
            <span class="btn btn-danger ml-2 delete-btn" style="width: 100px;cursor: pointer;">删除</span>
        </div>
    </div>
    <div>
        <span class="btn btn-primary my-2" style="width: 200px;cursor: pointer;" id="addGoodsSku">生成选购组合</span>
    </div>
    {# sku动态生成组合区 #}
    <div class="sku-table" style="margin-top: 20px;">
        <!-- 动态表格将在这里生成 -->
    </div>

    {# 确认添加信息 #}
    <span class="btn btn-success mt-5" style="width: 200px;cursor: pointer;" 
    id="addGoodsSkuSubmit">提交选购信息</span>
</div>

<script>
    $(function(){
        // 支持中英文逗号分隔
        function splitValues(str) {
            return str.trim().split(/[,，]\s*/);
        }

        // 生成笛卡尔积函数
        function cartesianProduct(arr) {
            return arr.reduce((a, b) => 
                a.flatMap(x => b.map(y => [...x, y])), 
                [[]]
            );
        }

        // 生成SKU表格
        function generateSkuTable() {
            const skuItems = [];
            $('.sku-item').each(function() {
                const name = $(this).find('.sku-name').val().trim();
                const values = splitValues($(this).find('.sku-values').val()); // 使用新分割方法
                if (name && values.length > 0) {
                    skuItems.push({ name, values });
                }
            });

            if (skuItems.length === 0) {
                $('.sku-table').html('<div class="alert alert-info">请先添加选购项</div>');
                return;
            }

            // 生成表头
            const headers = [
                ...skuItems.map(item => item.name),
                '图片', '库存', '价格', '优惠价', '操作'
            ];

            // 生成表体
            const combinations = cartesianProduct(skuItems.map(item => item.values));
            const $table = $('<table class="table table-bordered"></table>');
            const $thead = $('<thead></thead>');
            const $tbody = $('<tbody></tbody>');

            // 构建表头
            $thead.append($('<tr></tr>').append(
                headers.map(header => $('<th></th>').text(header))
            ));

            // 构建表体
            combinations.forEach(comb => {
                const $tr = $('<tr></tr>');
                
                // 属性列
                comb.forEach(value => {
                    $tr.append($('<td></td>').text(value));
                });

                // 图片上传列
                const $uploadTd = $('<td></td>');
                const $uploadBtn = $('<span class="btn btn-sm btn-secondary">上传</span>');
                const $imgContainer = $('<div class="mt-2"></div>');
                
                $uploadBtn.on('click', function() {
                    const $input = $('<input type="file" hidden/>');
                    $input.on('change', function(e) {
                        const file = e.target.files[0];
                        if (file) {
                            // 这里添加实际的上传逻辑
                            let formData = new FormData();
                            formData.append('file', file);
                            $.ajax({
                                type: 'POST', 
                                url: "/uploadStreamSingleToServerDiy/adminImg?_csrf={{ctx.csrf|safe}}",
                                processData: false,  // 告诉jQuery不要去处理发送的数据
                                data: formData,
                                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                                success:  (response, stutas, xhr)=> {
                                    // console.log(response.data.url) 
                                    $imgContainer.html(
                                        `<img src="${response.data.url}" 
                                        style="max-width:50px;max-height:50px;"/>`
                                    );  
                                },
                                error:function(e){
                                    console.log(e)
                                }
                            });
                            //读图片
                            /*
                            const reader = new FileReader();
                            reader.onload = function(e) {
                                $imgContainer.html(
                                    `<img src="${e.target.result}" 
                                     style="max-width:50px;max-height:50px;"/>`
                                );
                            };
                            reader.readAsDataURL(file);
                            */
                        }
                    });
                    $input.click();
                });
                
                $uploadTd.append($uploadBtn, $imgContainer);
                $tr.append($uploadTd);

                // 输入列
                $tr.append(
                    $('<td><input type="number" class="form-control stock" value="0" min="0"/></td>'),
                    $('<td><input type="number" class="form-control price" value="0" min="0" step="0.01"/></td>'),
                    $('<td><input type="number" class="form-control special-price" value="0" min="0" step="0.01"/></td>'),
                    $('<td><button class="btn btn-danger btn-sm delete-row">删除</button></td>')
                );

                $tbody.append($tr);
            });

            // 组装表格
            $table.append($thead, $tbody);
            $('.sku-table').html($table);
        }

        // 事件绑定
        $('#addGoodsSku').click(generateSkuTable);

        $('#addGoodsSkuInput').click(function() {
            const $clone = $('.sku-item:first').clone();
            $clone.find('input').val('');
            $('.sku-form').append($clone);
        });

        $('#goodsSkudata').on('click', '.delete-btn', function() {
            $(this).closest('.sku-item').remove();
            generateSkuTable();
        });

        $('.sku-table').on('click', '.delete-row', function() {
            $(this).closest('tr').remove();
        });

        $('#addGoodsSkuSubmit').click(function() {
            const skuData = [];
            $('.sku-table tbody tr').each(function() {
                const $row = $(this);
                const data = {
                    attributes: {},
                    // 修改点2：字段名替换为数据库字段
                    cover: $row.find('img').attr('src') || '',
                    stock: parseInt($row.find('.stock').val()) || 0,
                    price: parseFloat($row.find('.price').val()) || 0,
                    special_price: parseFloat($row.find('.special-price').val()) || 0
                };

                // 动态属性收集（保持中文键）
                $row.find('td').each(function(index) {
                    const header = $('.sku-table th').eq(index).text();
                    const excludeHeaders = ['图片', '库存', '价格', '优惠价', '操作'];
                    if (!excludeHeaders.includes(header)) {
                        data.attributes[header] = $(this).text();
                    }
                });

                data.name = data.attributes;

                skuData.push(data);
            });

            console.log('SKU数据：', skuData);
            // alert('数据已输出到控制台，请查看');
            // alert('跳转到哪个页面:' + '{{successUrl|safe}}');
            // alert('提交到哪个页面:' + '{{form.action|safe}}');
            if(skuData.length){
                $.ajax({
                    type: 'POST', 
                    url: "{{form.action}}?_csrf={{ctx.csrf|safe}}",
                    // contentType:'application/x-www-form-urlencoded',
                    // data: {
                    //     username:123,
                    //     sex:'女'
                    // },
                    contentType:'application/json;charset=UTF-8;',
                    data:JSON.stringify({skuData:skuData}),
                    success: function (response, stutas, xhr) {
                        console.log(response)
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
                    },
                    error:function(e){
                        console.log(e)
                    }
                });
            }else{
                $(this).removeClass('btn-success').addClass('btn-danger').text('请先： 生成选购组合');
                setTimeout(() => {
                    $(this).removeClass('btn-danger').addClass('btn-success').text('提交选购信息');
                }, 1500);
            }
        });
    });
</script>
```

### 4. 控制器
`app/controller/admin/goods.js`
```js
    // 动态生成商品sku列表
    async createGoodsSku(){
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
        await ctx.renderTemplate({
            title: '创建商品Sku选购信息',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板,for_form循环模版
            form: {
                //提交地址
                action: "/shop/admin/goods-/"+goods_id+"/saveGoodsSku",
                //  字段
                fields: [
                    {
                        label: '商品选购信息',
                        type: 'for_form_goodsSku', //商品sku动态表单
                    },
                    
                ],
                // 隐藏提交按钮，在模版自行完成提交
                hideSubmit:true, 
            },
            //新增成功之后跳转到哪个页面
            successUrl: '/shop/admin/goods-/'+goods_id+'/indexGoodsSku',
        });
    }
    // 提交商品sku列表
    async saveGoodsSku(){
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
            skuData: {
                type: 'string',
                required: true,
                desc: '商品sku信息',
                // defValue: 0,
            },
        });
        // 参数
        const goods_id = ctx.params.goods_id;
        let data = await app.model.Goods.findOne({ where: { id:goods_id } });
        if (!data) {
            return ctx.apiFail('该商品不存在');
        }
        let {skuData} = ctx.request.body;
        skuData = JSON.parse(skuData);
        // 给skuData的每个元素加一个goods_id
        skuData.forEach(element => {
            element.goods_id = goods_id;
            element.name = JSON.stringify(element.name);
        });
        // ctx.body = skuData;return;
        //批量写入
        await app.model.GoodsSku.bulkCreate(skuData);
        ctx.apiSuccess('创建成功');
    }
    // 商品sku列表
    async indexGoodsSku(){

    }
```


### 三、 商品sku列表和删除
### 1. 控制器
`app/controller/admin/goods.js`
```js
    // 商品sku列表
    async indexGoodsSku(){
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
            page: {
                type: 'int',
                required: false,
                desc: '页码',
                defValue: 1,
            },
            limit: {
                type: 'int',
                required: false,
                desc: '每页条数',
                defValue: 10,
            },
        });
        // 参数
        const goods_id = ctx.params.goods_id;
        let Goodsdata = await app.model.Goods.findOne({ where: { id:goods_id } });
        if (!Goodsdata) {
            return ctx.apiFail('该商品不存在');
        }
        // let GoodsClassdata = await app.model.GoodsClass.findOne({
        //     where:{
        //         id:Goodsdata.goods_class_id
        //     },
        //     include: [
        //         { 
        //             model: app.model.Skus, 
        //             // as: 'children' 
        //         },
        //     ],
        // });
        // ctx.body = GoodsClassdata; return;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        let data = await ctx.page('GoodsSku',{
            goods_id:goods_id
        },{
            order:[
                ['order','asc'],
                ['id','asc']
            ],
        });
        // let data = await ctx.service.goodsClass.datalist({ limit: 10000 });
        // console.log('分类数据', data);
        // ctx.body = data;
        // return;
        // data = data.rules;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '商品：' + Goodsdata.name + ' 选购sku列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/shop/admin/goods-/'+goods_id+'/createGoodsSku',//新增路径
                        desc: '创建商品选购sku',//新增 //按钮名称
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
                        title: '选购组合名称',
                        // key: 'name',
                        class: 'text-left',//可选
                        render(item) { //树形数据
                            let name = JSON.parse(item.name);
                            // 遍历对象属性值
                            let result = '';
                            for (let key in name) {
                                if (name.hasOwnProperty(key)) {
                                    result += `<span style="background-color: #f0f0f0; 
                                    margin: 5px; padding: 2px 5px;font-size: 14px;">${name[key]}</span>`;
                                }
                            }
                            return result;
                        }
                    },
                    {
                        title: '选购图片',
                        // key: 'cover',
                        class: 'text-left',//可选
                        render(item) { //树形数据
                            let str = '无';
                            if(item.cover){
                                str = `<img src="${item.cover}" style="width:100px;height:100px;" />`;
                            }
                            return `${str}`;
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
                        title: '库存',
                        key: 'stock',
                        class: 'text-center',//可选
                    },
                    {
                        title: '价格',
                        key: 'price',
                        class: 'text-center',//可选
                    },
                    {
                        title: '优惠价',
                        key: 'special_price',
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
                                @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/shop/admin/goods-/${goods_id}/indexGoodsSku','GoodsSku')">${arr[i].name}</button>`;
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
                            // edit: function (id) {
                            //     return `/shop/admin/goods-/${id}/editGoodsSku`;
                            // },
                            //删除
                            delete: function (id) {
                                return `/shop/admin/goods-/${id}/deleteGoodsSku`;
                            }
                        }
                    },
                ],
            },
        });
    }

    // 删除sku
    async deleteGoodsSku(){
        const { ctx, app } = this;
        const id = ctx.params.id;

        let data = await app.model.GoodsSku.findOne({ where: { id } });
        if (!data) {
            return ctx.apiFail('该商品sku不存在');
        }
        await app.model.GoodsSku.destroy({
            where: {
                id
            }
        });
        //提示
        ctx.toast('商品sku删除成功', 'success');
        //跳转
        ctx.redirect('/shop/admin/goods-/'+data.goods_id+'/indexGoodsSku');
    }
```
