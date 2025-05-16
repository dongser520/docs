---
navbar: true
sidebar: auto
title: eggjs后台超级管理员自定义表单新增修改（以网站配置为例）
---

## 一、模版
### 1. `_form.html`模版
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

                    {# 自定义form表单 #}
                    {% elif item.type == 'diyform' %}
                    {% include "admin/layout/_diyform.html" %}

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
                            name="{{item.name}}"  {% if item.disabled %}disabled="disabled"{% else %}{% endif %}
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

### 2. `_table.html`模版
`app/view/admin/layout/_table.html`
```html
<div class="card card-table">
    {# 表格上面的按钮 #}
    {% if table.buttons %}
    <div class="card-header">
        {% for item in table.buttons %}
        <a href="{{ item.url}}" class="btn btn-outline-primary">{{item.desc}}</a>
        {% endfor %}
    </div>
    {% endif %}
    
    <div class="card-body">
        <div class="mb-4">
            <div class="bg-light">
                <button class="btn btn-default btn-sm" onclick="history.back()"
                title="点击返回上一页"><span class="fa fa-arrow-left"></span> 返回上一页</button>
            </div>
        </div>
        
        {% if table.tabs %}
        <ul class="nav nav-tabs nav-tabs-top">
            {# <li class="nav-item"><a class="nav-link " href="#top-tab1"
                    data-toggle="tab">全部</a></li>
            <li class="nav-item"><a class="nav-link active" href="#top-tab2"
                    data-toggle="tab">直播中</a></li>
            <li class="nav-item"><a class="nav-link" href="#top-tab3"
                    data-toggle="tab">未开播</a></li>
            <li class="nav-item"><a class="nav-link" href="#top-tab4"
                    data-toggle="tab">已结束</a></li> #}
            {% for item in table.tabs %}
               <li class="nav-item">
                   <a class="nav-link {{ 'active'  if item.active else '' }}" href="{{item.url}}">
                    {{item.name}}
                   </a>
               </li>
            {% endfor %}
        </ul>
        {% endif %}
        
        <div class="table-responsive">
            <table class="table table-hover table-center mb-0">
                <thead>
                    {# 表头 #}
                    <tr>
                        {# <th>管理员账号</th>
                        <th width="120">创建时间</th>
                        <th class="text-center" width="100">操作</th> #}
                        {% for item in table.columns %}
                            <th class="{{item.class}}" width="{{item.width}}">{{item.title}}</th>
                        {% endfor %}

                    </tr>
                </thead>
                <tbody>
                    {% for item in data %}
                    <tr>
                        {% for item2 in table.columns %}
                        {% if item2.key %}
                        {# 如果存在key，说明是渲染数据 #}    
                        <td class="{{item2.class}}" width="{{item2.width}}">
                            
                            {# {{ item[item2.key] == '[object Object]' }} #}
                            {% if item[item2.key] == '[object Object]' %}
                               {% if item2.render %}
                               {{ item2.render(item) | safe }}
                               {% else %}
                               <span style="color:#ff6600;font-size: 12px;;">是对象数据，请新建一个render函数处理展示这些数据</span>
                               {% endif %}
                               
                            {% else %}

                                {% if item2.render %}
                                {{ item2.render(item) | safe }}
                                {% endif %}
                                
                                {% if not item2.hidekeyData %}
                                <span>{{ item[item2.key] }}</span>
                                {% endif %}  

                            {% endif %}
                            
                        </td>
                        {# 如果存在render，说明是函数 #}
                        {% elif item2.render %}
                        <td class="{{item2.class}}" width="{{item2.width}}">{{ item2.render(item) | safe }}</td>
                        {% elif item2.action %}
                        {# 如果存在action 说明是操作 #}   
                        <td class="{{item2.class}}" width="{{item2.width}}">
                            <div class="actions">
                                {# 存在修改按钮 #}
                                {% if item2.action.edit %}
                                <a href="{{item2.action.edit(item.id,item)}}" 
                                    class="btn btn-sm bg-success-light mr-2">
                                    <i class="fe fe-pencil"></i> 修改
                                </a>    
                                {% endif %}
                                {# 存在修改删除 #}
                                {# href="{{item2.action.delete(item.id)}}"  #}
                                {% if item2.action.delete %}
                                <a class="btn btn-sm bg-danger-light"
                                @click="del('{{item2.action.delete(item.id,item)}}')">
                                    <i class="fe fe-trash"></i> 删除
                                </a>
                                {% endif %}
                            </div>
                        </td>
                        {% else %}
                        {# 其他情况 #}    
                        {% endif %}
                           
                        {% endfor %}
                        {# <td>
                            <h2 class="table-avatar">
                                <a href="#" class="avatar avatar-sm mr-2">
                                    <img
                                        class="avatar-img rounded-circle"
                                        src="{{item.avatar}}"
                                        alt="User Image"></a>
                                <a href="#">{{ item.username }}
                                    <span>管理员</span></a>
                            </h2>
                        </td>
                        <td>{{ item.create_time }}</td>
                        <td class="text-right">
                            <div class="actions">
                                <a href="#"
                                    class="btn btn-sm bg-success-light mr-2">
                                    <i class="fe fe-pencil"></i> 修改
                                </a>
                                <a href="#" class="btn btn-sm bg-danger-light">
                                    <i class="fe fe-trash"></i> 删除
                                </a>
                            </div>
                        </td> #}
                        
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
        </div>
    </div>

    <div class="card-footer d-flex justify-content-center">
         {# 安全起见，egg.js官方默认将代码过滤成字符串，这里我们采用过滤器进行解码 #}
        {{ ctx.locals.pageHtml | safe }}
    </div>
</div>

<script>
    Vueapp = new Vue({
        el:'#vueapp',
        methods:{
            modal(url,content){
                //调用弹出框
                Vueapp.$refs.confirm.show({
                    title:'提示',
                    content:content,
                    success:function(){
                        window.location.href=url;
                    }
                });
            },
            del(url){
                //调用弹出框
                Vueapp.$refs.confirm.show({
                    title:'确认删除',
                    content:'确定要删除吗？',
                    success:function(){
                        window.location.href=url;
                        console.log('删除成功');
                    }
                });
            },
            //弹出框数据
            openInfo(url,title){
                // console.log(url);
                $.ajax({
                    type: 'get', 
                    url:url + "?_csrf={{ctx.csrf|safe}}",
                    contentType:'application/json;charset=UTF-8;',
                    success: function (response, stutas, xhr) {
                        console.log(response.data)
                        Vueapp.$refs.confirm.show({
                            title:title,
                            isconfirm:false,
                            // ...response.data,
                            ths:response.data.ths,
                            data:response.data.data,
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

                // Vueapp.$refs.confirm.show({
                //     title:title,
                //     isconfirm:false,
                //     ths:[ //表头数据
                //             {fieldname:'username', title:'用户名'},
                //             {fieldname:'create_time',title:'观看时间'},
                //     ],
                //     data:[//数据
                //         {username:'王菲',create_time:'2019-01-01'},
                //         {username:'张杰',create_time:'2019-01-02'},
                //     ],
                // });    
            },
            //点击按钮组
            changeBtnStatus(keyname,classname,btnValue,index,id,keytable,model){
                // console.log(keyname,classname,btnValue,index,id,keytable,model);
                // return;
                $.ajax({
                    type: 'POST', 
                    // url: "/admin/category/updateStatus?_csrf={{ctx.csrf|safe}}",
                    url: "/admin/commonUpdateById?_csrf={{ctx.csrf|safe}}",
                    contentType:'application/json;charset=UTF-8;',
                    data:JSON.stringify({
                        id:id,
                        // status:btnValue
                        keyname:keyname,
                        keyvalue:btnValue,
                        model:model
                    }),
                    success: function (response, stutas, xhr) {
                        console.log(response)
                        Vueapp.$refs.toast.show({
                            msg:"修改成功",
                            type:'success',
                            delay:1000,
                            success:function(){
                                // 跳转到某个页面
                                if(keytable.indexOf('/admin/') >= 0){
                                    window.location.href = keytable;
                                }else{
                                    window.location.href = `/admin/${keytable}/index`;
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
            }
        },
        mounted(){
            $('.btn-group').each(function(index,element){
                $(element).find('button').each(function(i,ele){
                    // console.log('每一个button的data', $(ele).attr('data'));
                    // console.log('每一个button的value', $(ele).attr('value'));
                    if($(ele).attr('data') == $(ele).attr('value')){
                        $(ele).removeClass('btn-light').addClass('btn-success')
                    }
                });
            });
        }
    });
</script>
```

### 3. 新增 `_diyform.html`模版
`app/view/admin/layout/_diyform.html`
```html
<div id="diyform">
    <div class="add-form">
        <div class="alert-container"></div>
        <button class="btn btn-primary mb-2" id="addFormField" style="width: 200px;">加字段</button>
        <div class="field-list">
            <!-- 初始字段模板 -->
            <div class="field-item row" style="display: flex; margin: 10px 0; gap: 10px;margin-left: 0px;margin-right: 0px;">
                <input type="text" name="label" placeholder="字段说明，如：地址" class="form-control col-md-2" required>
                <input type="text" name="name" placeholder="字段名称，如：address" class="form-control  col-md-2" required>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle type-selector" 
                            type="button" 
                            data-bs-toggle="dropdown"
                            data-field-type="">
                        选择组件类型
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" data-type="text">文本框</a></li>
                        <li><a class="dropdown-item" data-type="number">数字文本框</a></li>
                        <li><a class="dropdown-item" data-type="textarea">多行文本框</a></li>
                        <li><a class="dropdown-item" data-type="btncheck">按钮组选择类型组件</a></li>
                        <li><a class="dropdown-item" data-type="dropdown">下拉框类型组件</a></li>
                        <li><a class="dropdown-item" data-type="file">上传服务器文件组件</a></li>
                        <li><a class="dropdown-item" data-type="fileoss">上传阿里云文件组件</a></li>
                        <li><a class="dropdown-item" data-type="editor">富文本编辑器</a></li>
                        <li><a class="dropdown-item" data-type="treeDataSelect">树形结构数据选择组件</a></li>
                        <li><a class="dropdown-item" data-type="diy">自定义类型组件</a></li>
                    </ul>
                </div>
                <input type="text" name="default" placeholder="默认值" class="form-control col-md-2">
                <input type="text" name="placeholder" placeholder="提示语，如：请输入地址" class="form-control col-md-2">
                <button class="btn btn-danger delete-btn " style="width: 100px;">删除</button>
            </div>
        </div>
    </div>
    <span class="btn btn-success mt-3" id="submitForm" style="cursor: pointer;">提交表单配置</span>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const fieldList = document.querySelector('.field-list');
    let baseId = 0;

    // 初始化第一个字段
    initField(fieldList.children[0]);

    // 添加新字段
    document.getElementById('addFormField').addEventListener('click', () => {
        const template = fieldList.querySelector('.field-item');
        const newField = template.cloneNode(true);
        const fieldId = `field-${Date.now()}-${++baseId}`;

        // 重置字段值
        newField.querySelectorAll('input').forEach(input => input.value = '');
        const typeBtn = newField.querySelector('.type-selector');
        typeBtn.textContent = '选择组件类型';
        typeBtn.dataset.fieldType = '';
        
        // 设置唯一ID
        const dropdown = newField.querySelector('.dropdown-menu');
        typeBtn.id = `${fieldId}-btn`;
        dropdown.setAttribute('aria-labelledby', typeBtn.id);

        // 插入到列表底部
        fieldList.appendChild(newField);
        initField(newField);
    });

    // 初始化单个字段
    function initField(field) {
        const dropdown = new bootstrap.Dropdown(field.querySelector('.type-selector'));
        
        // 类型选择事件
        field.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const type = e.target.dataset.type;
                const btn = field.querySelector('.type-selector');
                btn.textContent = e.target.textContent;
                btn.dataset.fieldType = type;
                dropdown.hide();
            });
        });

        // 删除事件
        field.querySelector('.delete-btn').addEventListener('click', () => {
            if (fieldList.children.length > 1) {
                field.remove();
            } else {
                showAlert('至少保留一个字段');
            }
        });
    }

    // 表单提交
    document.getElementById('submitForm').addEventListener('click', () => {
        const result = [];
        let isValid = true;

        document.querySelectorAll('.field-item').forEach((field, index) => {
            const label = field.querySelector('[name="label"]').value.trim();
            const name = field.querySelector('[name="name"]').value.trim();
            const type = field.querySelector('.type-selector').dataset.fieldType;

            // 验证必填项
            field.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
            if (!label) {
                field.querySelector('[name="label"]').classList.add('is-invalid');
                isValid = false;
            }
            if (!name) {
                field.querySelector('[name="name"]').classList.add('is-invalid');
                isValid = false;
            }
            if (!type) {
                field.querySelector('.type-selector').classList.add('is-invalid');
                isValid = false;
            }

            result.push({
                label,
                name,
                type,
                default: field.querySelector('[name="default"]').value.trim(),
                placeholder: field.querySelector('[name="placeholder"]').value.trim()
            });
        });

        if (!isValid) {
            showAlert('请填写所有红色边框的必填字段');
            return;
        }

        console.log('表单数据：', result);
        if (result.length) {
            // 将结果转为JSON字符串
            const jsonStr = JSON.stringify(result);
            // 对JSON字符串进行URI编码，确保Unicode字符正确处理
            const uriEncoded = encodeURIComponent(jsonStr);
            // 转换为Base64并进行URL安全处理
            const base64 = btoa(uriEncoded)
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
            // 跳转URL
            window.location.href = "{{successUrl}}" + '?f=' + base64;
        }
    });

    function showAlert(msg) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger';
        alertDiv.innerHTML = `
            ${msg}
        `;
        document.querySelector('.alert-container').appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
});
</script>

<style>
.field-item {
    padding: 15px;
    background: #f8f9fa;
    border-radius: 5px;
}
.form-control {
    min-width: 180px;
}
.is-invalid {
    border-color: #dc3545 !important;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
.alert {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
}
.dropdown-menu a{
    padding: 6px 10px;
}
.dropdown-menu a:hover {
    cursor: pointer;
    color: #dc3545 !important;
}
.add-form{
    position: relative;
}
.alert-container .alert{
    position: absolute;
    left: 140px;
    top: 0px;
    width:280px;
}
</style>
```

## 二、路由
`app/router/admin/admin.js`
```js
...
    //配置列表界面
    router.get('/admin/config/index', controller.admin.config.index);
    // 修改配置
    router.get('/admin/config/edit/:id', controller.admin.config.edit);
    // 修改配置提交数据
    router.post('/admin/config/update/:id', controller.admin.config.update);
    //创建配置界面
    router.get('/admin/config/create', controller.admin.config.create);
    //创建配置数据
    router.post('/admin/config/save', controller.admin.config.save);
    //删除配置
    router.get('/admin/config/delete/:id', controller.admin.config.delete);
    //自定义创建配置
    router.get('/admin/config/diycreateform', controller.admin.config.diycreateform);
    router.get('/admin/config/diycreate', controller.admin.config.diycreate);
    router.post('/admin/config/diysave', controller.admin.config.diysave);
    router.get('/admin/config/diyedit/:id', controller.admin.config.diyedit);
    router.post('/admin/config/diyupdate/:id', controller.admin.config.diyupdate);
...
```


## 三、控制器
`app/controller/admin/config.js`
```js
'use strict';

const fs = require('node:fs');
const path = require('node:path');

//留言写入json文件
let paths = {
    dir: './data',
    file: './data/siteConfig.json'
    //   dir:'./Appdata',
    //   file:'./Appdata/data.json'
}

const Controller = require('egg').Controller;

class ConfigController extends Controller {
    //配置列表界面
    async index() {
        const { ctx, app } = this;
        let data = await this.getsiteConfigJson();
        if (typeof data == 'object') {
            // 超级管理员才能操作自定义配置
            // console.log('管理员信息',ctx.session.auth);
            let _buttons = [];
            if (ctx.session.auth.super == 1) {
                _buttons = [
                    {
                        url: '/admin/config/diycreateform',//新增路径
                        desc: '自定义网站配置',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    },
                ];
            }

            //渲染公共模版
            await ctx.renderTemplate({
                title: '网站配置列表',//现在网页title,面包屑导航title,页面标题
                data: data.data,
                tempType: 'table', //模板类型：table表格模板 ，form表单模板
                table: {
                    //表格上方按钮,没有不要填buttons
                    buttons: [
                        {
                            url: '/admin/config/create',//新增路径
                            desc: '新建网站配置',//新增 //按钮名称
                            // icon: 'fa fa-plus fa-lg',//按钮图标
                        },
                        ..._buttons,
                    ],
                    //表头
                    columns: [
                        {
                            title: '所属网站',
                            key: 'sitename',
                            class: 'text-center',//可选
                        },
                        {
                            title: '网站配置信息',
                            // key: 'category_id',
                            class: 'text-left',//可选
                            render(item) {
                                let weixinImg = item.weixinImg || ``;
                                if(weixinImg){
                                    if (weixinImg.endsWith('.jpg') || weixinImg.endsWith('.jpeg') ||
                                        weixinImg.endsWith('.png') || weixinImg.endsWith('.gif')) {
                                        // <li>微信二维码：${item.weixinImg}</li>
                                        weixinImg = `<li>微信二维码：<img src="${weixinImg}" style="width: 100px; height: 100px;" /></li>`;
                                    }
                                }
                                return `
                               <h5>公司基本信息</h5>
                               <ul>
                                <li style="display:${item.corporate_name ? '' : 'none'}">公司名称：${item.corporate_name}</li>
                                <li style="display:${item.corporate_short ? '' : 'none'}">名称简写：${item.corporate_short}</li>
                                <li style="display:${item.address ? '' : 'none'}">地址：${item.address}</li>
                                <li style="display:${item.tel ? '' : 'none'}">免费咨询电话：${item.tel}</li>
                                <li style="display:${item.mobile ? '' : 'none'}">手机号：${item.mobile}</li>
                                <li style="display:${item.serviceUser ? '' : 'none'}">联系人：${item.serviceUser}</li>
                                <li style="display:${item.QQ ? '' : 'none'}">企业QQ：${item.QQ}</li>
                                <li style="display:${item.weixin ? '' : 'none'}">联系微信号：${item.weixin}</li>
                                ${weixinImg}
                                <li style="display:${item.email ? '' : 'none'}">联系邮箱：${item.email}</li>
                               </ul>
                               <h5>seo信息</h5>
                                <ul>
                                    <li style="display:${item.pagetitle ? '' : 'none'}">网站主页标题：${item.pagetitle}</li>
                                    <li style="display:${item.description ? '' : 'none'}">网页描述：${item.description}</li>
                                    <li style="display:${item.keywords ? '' : 'none'}">搜素关键字：${item.keywords}</li>
                                </ul>
                                <h5>其它信息</h5>
                                <ul>
                                    <li style="display:${item.domain ? '' : 'none'}">官方网址：${item.domain}</li>
                                    <li style="display:${item.copyright ? '' : 'none'}">版权信息：${item.copyright}</li>
                                    <li style="display:${item.icpNumber ? '' : 'none'}">ICP 备案：${item.icpNumber}</li>
                                </ul>
                            `;
                            }
                        },
                        {
                            title: '操作',
                            class: 'text-right',//可选
                            action: {
                                //修改
                                edit: function (id,item) { 
                                    if(item.f){
                                        return `/admin/config/diyedit/${id}`; //自定义修改界面
                                    }else{
                                        return `/admin/config/edit/${id}`; //一般修改界面
                                    }
                                },
                                //删除
                                delete: function (id,item) {
                                    return `/admin/config/delete/${id}`;
                                }
                            }
                        },
                    ],
                },
            });
        }
    }

    //获取配置数据
    async getsiteConfigJson() {

        //先判断是否存在这个json文件或者文件夹
        if (!fs.existsSync(paths.file)) {
            this.ctx.redirect('/admin/config/create');
            return '';
        } else {
            // console.log(__dirname);//D:\【第二学期第3季】课程代码\myegg\app\controller
            //D:\【第二学期第3季】课程代码\myegg\data\message.json
            // console.log(path.resolve(__dirname,'../../','data/message.json'));
            // let data = fs.readFileSync(path.resolve(__dirname, '../../../', 'data/siteConfig.json'), {
            //     encoding: 'utf-8'
            // });
            // let data = fs.readFileSync('./data/siteConfig.json',{
            //     encoding: 'utf-8'
            // });
            let data = fs.readFileSync(paths.file, {
                encoding: 'utf-8'
            });
            console.log(JSON.parse(data));
            return JSON.parse(data)
        }
    }

    // 修改配置
    async edit() {
        const { ctx, app } = this;

        //看一下有没有网站
        let rolecategory = await ctx.model.Rolecategory.findAll({
            where: {
                status: 1
            }
        });
        // ctx.body = rolecategory; return;
        if(!rolecategory.length){
           ctx.toast('请先创建一个网站');
           return ctx.redirect('/admin/rolecategory/create');
        }
        // 为哪个网站创建配置
        let fields = [];let sitename = ``;
        if(rolecategory.length){
            rolecategory = JSON.parse(JSON.stringify(rolecategory));
            // 给rolecategory数组里面每个对象加上一个pid属性值为0
            rolecategory.forEach(item => {
                item.pid = 0;
            });
            rolecategory = ctx.treeify(rolecategory);
            // ctx.body = rolecategory; return;
            sitename = rolecategory[0].name;
            fields = [
                {
                    label: '网站名称',
                    type: 'text', //下拉框
                    name: 'sitename',
                    default: sitename,
                    // placeholder: '请输入网站名称',
                    hidekeyData: true,//隐藏这一项，但是值会提交过去
                },
                // 如果一旦填写了网站，则就应该有选择网站这里栏目提示要选择网站
                {
                    label: '选择网站提示',
                    type: 'text', //下拉框
                    name: 'select_rolecategory_id',
                    default: 1,
                    // placeholder: '请选择网站',
                    hidekeyData: true,//隐藏这一项，但是值会提交过去
                },
                {
                    label: '放在哪个网站里面',
                    type: 'dropdown', //下拉框
                    name: 'rolecategory_id',
                    default: JSON.stringify(rolecategory),
                    placeholder: sitename,
                },
            ];
            
        }

        const id = ctx.params.id;
        let data = await this.getsiteConfigJson();
        data = data.data.find(item => item.id == id);
        console.log('即将修改渲染的内容', data);
        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: `修改${sitename}网站配置`,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改配置提交地址
                action: '/admin/config/update/' + id,
                //  字段
                fields: [
                    ...fields,
                    {
                        label: '公司名称',
                        type: 'text',
                        name: 'corporate_name',
                        placeholder: '请输入公司名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '名称简写',
                        type: 'text',
                        name: 'corporate_short',
                        placeholder: '请输入名称简写',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '地址',
                        type: 'text',
                        name: 'address',
                        placeholder: '请输入公司地址',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '免费咨询电话',
                        type: 'text',
                        name: 'tel',
                        placeholder: '请输入免费咨询电话',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '手机号',
                        type: 'text',
                        name: 'mobile',
                        placeholder: '请输入手机号',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '联系人',
                        type: 'text',
                        name: 'serviceUser',
                        placeholder: '请输入联系人',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '企业QQ',
                        type: 'text',
                        name: 'QQ',
                        placeholder: '请输入企业QQ',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '联系微信号',
                        type: 'text',
                        name: 'weixin',
                        placeholder: '请输入联系微信号',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '微信二维码',
                        type: 'file',
                        name: 'weixinImg',
                        //placeholder: '',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '联系邮箱',
                        type: 'text',
                        name: 'email',
                        placeholder: '请输入联系邮箱',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '网站主页标题',
                        type: 'text',
                        name: 'pagetitle',
                        placeholder: '网站主页标题',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '网页描述',
                        type: 'textarea',
                        name: 'description',
                        placeholder: '请输入网页描述',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '搜素关键字',
                        type: 'text',
                        name: 'keywords',
                        placeholder: '请输入搜素关键字，逗号隔开',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '官方网址',
                        type: 'text',
                        name: 'domain',
                        placeholder: '请输入官方网址',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '版权信息',
                        type: 'text',
                        name: 'copyright',
                        placeholder: '请输入版权信息',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: 'ICP 备案',
                        type: 'text',
                        name: 'icpNumber',
                        placeholder: '请输入ICP 备案号',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: 'cnzz统计代码',
                        type: 'textarea',
                        name: 'cnzz',
                        placeholder: '请输入cnzz统计代码',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                ],
                //修改内容默认值
                data: data,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/admin/config/index',
        });
    }

    //修改配置提交数据到json
    async update() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '配置id'
            },
            corporate_name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '公司名称' //字段含义
            },
            corporate_short: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '名称简写'
            },
            address: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '地址'
            },
            tel: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '免费咨询电话'
            },
            mobile: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '手机号'
            },
            serviceUser: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '联系人'
            },
            QQ: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '企业QQ'
            },
            weixin: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '联系微信号'
            },
            weixinImg: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '微信二维码'
            },
            email: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '联系邮箱'
            },
            pagetitle: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '网站主页标题'
            },
            description: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '网页描述'
            },
            keywords: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '搜素关键字'
            },
            domain: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '官方网址'
            },
            copyright: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '版权信息'
            },
            icpNumber: {
                type: 'string',
                required: false,
                defValue: '',
                desc: 'ICP 备案'
            },
            cnzz: {
                type: 'string',
                required: false,
                defValue: '',
                desc: 'cnzz统计代码'
            },
            sitename: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '网站名称'
            },
            rolecategory_id: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '网站id'
            },
            select_rolecategory_id: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '要选择一个网站提示'
            },
        });

        const id = ctx.params.id;
        let data = await this.getsiteConfigJson();
        let index = data.data.findIndex(item => item.id == id);
        if (index == -1) {
            return this.apiFail('该数据不存在');
        }

        // 有rolecategory_id
        let { rolecategory_id, select_rolecategory_id } = this.ctx.request.body;
        if(select_rolecategory_id && !rolecategory_id){
            return this.ctx.apiFail('请选择一个网站');
        }

        

        let params = ctx.request.body;
        params.id = id;
        console.log('修改的数据', params);
        console.log('修改json文件的数组元素索引', index);
        console.log('原json文件数据', data);
        data.data[index] = params;
        console.log('写入json文件的最终所有数据', data);
        fs.writeFile(paths.file, JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log('写入成功');
        });

    }

    //创建配置界面
    async create() {
        const { ctx, app } = this;
        //看一下有没有网站
        let rolecategory = await ctx.model.Rolecategory.findAll({
            where: {
                status: 1
            }
        });
        // ctx.body = rolecategory; return;
        if(!rolecategory.length){
           ctx.toast('请先创建一个网站');
           return ctx.redirect('/admin/rolecategory/create');
        }
        // 为哪个网站创建配置
        let fields = [];let sitename = ``;
        if(rolecategory.length){
            rolecategory = JSON.parse(JSON.stringify(rolecategory));
            // 给rolecategory数组里面每个对象加上一个pid属性值为0
            rolecategory.forEach(item => {
                item.pid = 0;
            });
            rolecategory = ctx.treeify(rolecategory);
            // ctx.body = rolecategory; return;
            sitename = rolecategory[0].name;
            fields = [
                {
                    label: '网站名称',
                    type: 'text', //下拉框
                    name: 'sitename',
                    default: sitename,
                    // placeholder: '请输入网站名称',
                    hidekeyData: true,//隐藏这一项，但是值会提交过去
                },
                // 如果一旦填写了网站，则就应该有选择网站这里栏目提示要选择网站
                {
                    label: '选择网站提示',
                    type: 'text', //下拉框
                    name: 'select_rolecategory_id',
                    default: 1,
                    // placeholder: '请选择网站',
                    hidekeyData: true,//隐藏这一项，但是值会提交过去
                },
                {
                    label: '放在哪个网站里面',
                    type: 'dropdown', //下拉框
                    name: 'rolecategory_id',
                    default: JSON.stringify(rolecategory),
                    placeholder: '请选择网站',
                },
            ];
        }
        //渲染公共模版
        await ctx.renderTemplate({
            title: `创建${sitename}网站配置界面`,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/admin/config/save",
                //  字段
                fields: [
                    ...fields,
                    {
                        label: '公司名称',
                        type: 'text',
                        name: 'corporate_name',
                        placeholder: '请输入公司名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '名称简写',
                        type: 'text',
                        name: 'corporate_short',
                        placeholder: '请输入名称简写',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '地址',
                        type: 'text',
                        name: 'address',
                        placeholder: '请输入公司地址',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '免费咨询电话',
                        type: 'text',
                        name: 'tel',
                        placeholder: '请输入免费咨询电话',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '手机号',
                        type: 'text',
                        name: 'mobile',
                        placeholder: '请输入手机号',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '联系人',
                        type: 'text',
                        name: 'serviceUser',
                        placeholder: '请输入联系人',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '企业QQ',
                        type: 'text',
                        name: 'QQ',
                        placeholder: '请输入企业QQ',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '联系微信号',
                        type: 'text',
                        name: 'weixin',
                        placeholder: '请输入联系微信号',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '微信二维码',
                        type: 'file',
                        name: 'weixinImg',
                        //placeholder: '',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '联系邮箱',
                        type: 'text',
                        name: 'email',
                        placeholder: '请输入联系邮箱',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '网站主页标题',
                        type: 'text',
                        name: 'pagetitle',
                        placeholder: '网站主页标题',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '网页描述',
                        type: 'textarea',
                        name: 'description',
                        placeholder: '请输入网页描述',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '搜素关键字',
                        type: 'text',
                        name: 'keywords',
                        placeholder: '请输入搜素关键字，逗号隔开',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '官方网址',
                        type: 'text',
                        name: 'domain',
                        placeholder: '请输入官方网址',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '版权信息',
                        type: 'text',
                        name: 'copyright',
                        placeholder: '请输入版权信息',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: 'ICP 备案',
                        type: 'text',
                        name: 'icpNumber',
                        placeholder: '请输入ICP 备案号',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: 'cnzz统计代码',
                        type: 'textarea',
                        name: 'cnzz',
                        placeholder: '请输入cnzz统计代码',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '/admin/config/index',
        });
    }

    //创建配置提交数据
    async save() {
        //1.参数验证
        this.ctx.validate({
            corporate_name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '公司名称' //字段含义
            },
            corporate_short: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '名称简写'
            },
            address: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '地址'
            },
            tel: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '免费咨询电话'
            },
            mobile: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '手机号'
            },
            serviceUser: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '联系人'
            },
            QQ: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '企业QQ'
            },
            weixin: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '联系微信号'
            },
            weixinImg: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '微信二维码'
            },
            email: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '联系邮箱'
            },
            pagetitle: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '网站主页标题'
            },
            description: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '网页描述'
            },
            keywords: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '搜素关键字'
            },
            domain: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '官方网址'
            },
            copyright: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '版权信息'
            },
            icpNumber: {
                type: 'string',
                required: false,
                defValue: '',
                desc: 'ICP 备案'
            },
            cnzz: {
                type: 'string',
                required: false,
                defValue: '',
                desc: 'cnzz统计代码'
            },
            sitename: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '网站名称'
            },
            rolecategory_id: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '网站id'
            },
            select_rolecategory_id: {
                type: 'int',
                required: false,
                defValue: 0,
                desc: '要选择一个网站提示'
            },
        });

        // 有rolecategory_id
        let { rolecategory_id, select_rolecategory_id } = this.ctx.request.body;
        if(select_rolecategory_id && !rolecategory_id){
            return this.ctx.apiFail('请选择一个网站');
        }

        //写入数据
        let data = this.ctx.request.body;
        await this.addconfig(data, paths);
    }

    //配置写入json文件
    async addconfig(data, paths) {
        //创建一个文件夹data
        if (!fs.existsSync(paths.dir)) {
            fs.mkdirSync(paths.dir);
        };
        //判断json文件是否存在，存在说明之前写入过了，先读一下
        let flag = fs.existsSync(paths.file);
        if (flag) {
            //存在先读取一下
            await this.readconfig(paths.file, data)
        } else {
            //不存在，首次直接写
            let ms = data;
            ms.id = 1;
            //加入时间,所在地等等
            // ms.timestamp = new Date().getTime();
            // console.log(ms);
            let o = {};
            o.data = [];
            o.data.push(ms);
            o.total = 1;
            o.currentId = 1;
            // console.log(o);
            // console.log(JSON.stringify(o));
            //写入内容,同步异步promise,以及可写流
            await this.writeconfig(paths.file, o);
        }
    }

    //存在先读取一下
    async readconfig(path, data) {
        //读取内容,同步异步promise,以及可写流
        fs.readFile(path, {
            flag: 'r',
            encoding: 'utf-8',
        }, (err, oldmessage) => {
            if (err) throw err;
            oldmessage = JSON.parse(oldmessage);
            console.log(oldmessage)
            console.log(data);
            //处理数据
            data.id = oldmessage.currentId + 1;
            //加入时间,所在地等等
            // data.timestamp = new Date().getTime();
            //大对象
            oldmessage.data.push(data);
            oldmessage.total = oldmessage.data.length;
            oldmessage.currentId = data.id;
            console.log(oldmessage);
            //写入内容,同步异步promise,以及可写流
            this.writeconfig(path, oldmessage);

        })
    }
    //写入配置
    async writeconfig(path, data) {
        fs.writeFile(path, JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log('写入成功')
        });
    }

    //删除配置
    async delete() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let data = await this.getsiteConfigJson();
        let index = data.data.findIndex(item => item.id == id);
        if (index == -1) {
            return this.apiFail('该数据不存在');
        }

        data.data.splice(index, 1);
        data.total = data.data.length;
        await this.writeconfig(paths.file, data);
        //提示
        ctx.toast('删除配置成功', 'success');
        //跳转
        ctx.redirect('/admin/config/index');
    }

    //自定义创建配置
    // 自定义表单
    async diycreateform(){
        const { ctx, app } = this;
        // console.log('管理员信息',ctx.session.auth);
        if (ctx.session.auth.super != 1) {
            return ctx.apiFail('您没有权限操作此项内容');
        }
        await ctx.renderTemplate({
            title: '自定义创建网站配置',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板,for_form循环模版
            form: {
                //提交地址
                // action: "/admin/config/diycreate",
                //  字段
                fields: [
                    {
                        label: '自定义创建网站配置表单',
                        type: 'diyform', //自定义form表单
                    },
                ],
                //隐藏提交按钮，用模版里面的提交按钮
                hideSubmit:true,
            },
            //新增成功之后跳转到哪个页面
            successUrl: "/admin/config/diycreate",
        });
    }
    // 生成自定义表单页面
    async diycreate() { 
        const { ctx, app } = this;
        // console.log('管理员信息',ctx.session.auth);
        if (ctx.session.auth.super != 1) {
            return ctx.apiFail('您没有权限操作此项内容');
        }

        // 前戏开始
        //1.参数验证
        this.ctx.validate({
            f: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '表单参数' //字段含义
            },
        });
        let { f } = ctx.query;
        //解码f参数
        let _fields = this.decode_f(f);
        // ctx.body = _fields; return;
        // 前戏结束

        // 具体业务处理开始
        //看一下有没有网站
        let rolecategory = await ctx.model.Rolecategory.findAll({
            where: {
                status: 1
            }
        });
        // ctx.body = rolecategory; return;
        if(!rolecategory.length){
           ctx.toast('请先创建一个网站');
           return ctx.redirect('/admin/rolecategory/create');
        }
        // 为哪个网站创建配置
        let fields = [];let sitename = ``;
        if(rolecategory.length){
            rolecategory = JSON.parse(JSON.stringify(rolecategory));
            // 给rolecategory数组里面每个对象加上一个pid属性值为0
            rolecategory.forEach(item => {
                item.pid = 0;
            });
            rolecategory = ctx.treeify(rolecategory);
            // ctx.body = rolecategory; return;
            sitename = rolecategory[0].name;
            fields = [
                {
                    label: '网站名称',
                    type: 'text', //下拉框
                    name: 'sitename',
                    default: sitename,
                    // placeholder: '请输入网站名称',
                    hidekeyData: true,//隐藏这一项，但是值会提交过去
                },
                // 如果一旦填写了网站，则就应该有选择网站这里栏目提示要选择网站
                {
                    label: '选择网站提示',
                    type: 'text', //下拉框
                    name: 'select_rolecategory_id',
                    default: 1,
                    // placeholder: '请选择网站',
                    hidekeyData: true,//隐藏这一项，但是值会提交过去
                },
                {
                    label: '放在哪个网站里面',
                    type: 'dropdown', //下拉框
                    name: 'rolecategory_id',
                    default: JSON.stringify(rolecategory),
                    placeholder: '请选择网站',
                },
            ];
        }
        // 具体业务处理结束

        //渲染
        await ctx.renderTemplate({
            title: `创建${sitename}网站配置界面`,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板,for_form循环模版
            form: {
                //提交地址
                action: "/admin/config/diysave",
                //  字段
                fields: [
                    ...fields,
                    ..._fields,
                    {
                        label: '自定义所有表单字段',
                        type: 'text', //下拉框
                        name: 'f',
                        default: f, // 用于自定义修改用，必传过去
                        // placeholder: '',
                        hidekeyData: true,//隐藏这一项，但是值会提交过去
                    },
                ],
                //隐藏提交按钮，用模版里面的提交按钮
                // hideSubmit:true,
            },
            //新增成功之后跳转到哪个页面
            successUrl: "/admin/config/index",
        });
    }

    //生成自定义表单提交数据
    async diysave(){
        const { ctx, app } = this;
        // console.log('管理员信息',ctx.session.auth);
        if (ctx.session.auth.super != 1) {
            return ctx.apiFail('您没有权限操作此项内容');
        }

        //具体业务
        // 有rolecategory_id
        let { rolecategory_id, select_rolecategory_id } = this.ctx.request.body;
        if(select_rolecategory_id && !rolecategory_id){
            return this.ctx.apiFail('请选择一个网站');
        }

        //写入数据
        let data = this.ctx.request.body;
        //写入json文件或者数据库
        console.log('写入的数据',data);
        await this.addconfig(data, paths);
        
    }

    // 解码f参数
    decode_f(f){
       let _fields = [];
       //解码参数
       const base64Param = f
       .replace(/-/g, '+') // 将-换回+
       .replace(/_/g, '/'); // 将_换回/

       // 补足Base64末尾的等号
       let padded = base64Param;
       while (padded.length % 4 !== 0) {
           padded += '=';
       }
       try {
           // 解码Base64得到URI编码的字符串
           const uriEncoded = Buffer.from(padded, 'base64').toString('utf8');
           // URI解码获取原始JSON字符串
           const jsonStr = decodeURIComponent(uriEncoded);
           // 解析JSON
           _fields = JSON.parse(jsonStr);
           return _fields;
       } catch (error) {
           return ctx.apiFail('无效的参数格式');
       }
    }

    // 自定义修改界面
    async diyedit(){
        const { ctx, app } = this;
        // console.log('管理员信息',ctx.session.auth);
        if (ctx.session.auth.super != 1) {
            return ctx.apiFail('您没有权限操作此项内容');
        }

        //一般业务处理开始
        //看一下有没有网站
        let rolecategory = await ctx.model.Rolecategory.findAll({
            where: {
                status: 1
            }
        });
        // ctx.body = rolecategory; return;
        if(!rolecategory.length){
           ctx.toast('请先创建一个网站');
           return ctx.redirect('/admin/rolecategory/create');
        }
        // 为哪个网站创建配置
        let fields = [];let sitename = ``;
        if(rolecategory.length){
            rolecategory = JSON.parse(JSON.stringify(rolecategory));
            // 给rolecategory数组里面每个对象加上一个pid属性值为0
            rolecategory.forEach(item => {
                item.pid = 0;
            });
            rolecategory = ctx.treeify(rolecategory);
            // ctx.body = rolecategory; return;
            sitename = rolecategory[0].name;
            fields = [
                {
                    label: '网站名称',
                    type: 'text', //下拉框
                    name: 'sitename',
                    default: sitename,
                    // placeholder: '请输入网站名称',
                    hidekeyData: true,//隐藏这一项，但是值会提交过去
                },
                // 如果一旦填写了网站，则就应该有选择网站这里栏目提示要选择网站
                {
                    label: '选择网站提示',
                    type: 'text', //下拉框
                    name: 'select_rolecategory_id',
                    default: 1,
                    // placeholder: '请选择网站',
                    hidekeyData: true,//隐藏这一项，但是值会提交过去
                },
                {
                    label: '放在哪个网站里面',
                    type: 'dropdown', //下拉框
                    name: 'rolecategory_id',
                    default: JSON.stringify(rolecategory),
                    placeholder: sitename,
                },
            ];
            
        }
        //一般业务处理结束

        //数据处理
        const id = ctx.params.id;
        let data = await this.getsiteConfigJson();
        data = data.data.find(item => item.id == id);
        if(!data || !data.f){
            return ctx.apiFail('记录不存在');
        }
        // ctx.body = data; return;
        let _fields = [];
        if(this.decode_f(data.f)){
            _fields = this.decode_f(data.f);
        }
        // ctx.body = _fields; return;

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: `修改${sitename}网站配置`,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改配置提交地址
                action: '/admin/config/diyupdate/' + id,
                //  字段
                fields: [
                    ...fields,
                    ..._fields,
                ],
                //修改内容默认值
                data: data,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/admin/config/index',
        });
    }

    // 自定义修改提交数据
    async diyupdate(){
        const { ctx, app } = this;  
        // console.log('管理员信息',ctx.session.auth);
        if (ctx.session.auth.super != 1) {
            return ctx.apiFail('您没有权限操作此项内容');
        }
        
        //不用参数验证
        //数据处理
        const id = ctx.params.id;
        let data = await this.getsiteConfigJson();
        let _data = data.data.find(item => item.id == id);
        if(!_data || !_data.f){
            return ctx.apiFail('记录不存在');
        }
        let index = data.data.findIndex(item => item.id == id);
        // ctx.body = _data; return;
        // let _fields = [];
        // if(this.decode_f(_data.f)){
        //     _fields = this.decode_f(_data.f);
        // }

        // 有rolecategory_id
        let { rolecategory_id, select_rolecategory_id } = this.ctx.request.body;
        if(select_rolecategory_id && !rolecategory_id){
            return this.ctx.apiFail('请选择一个网站');
        }

        

        let params = ctx.request.body;
        params.id = id;
        params.f = _data.f;
        // console.log('修改的数据', params);
        // console.log('修改json文件的数组元素索引', index);
        // console.log('原json文件数据', data);
        data.data[index] = params;
        // console.log('写入json文件的最终所有数据', data);
        fs.writeFile(paths.file, JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log('写入成功');
        });
    }

}

module.exports = ConfigController;

```