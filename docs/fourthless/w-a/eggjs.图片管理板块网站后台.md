---
navbar: true
sidebar: auto
title: eggjs图片管理板块网站后台说明
---

## 一、后台图片分类下的所有图片列表
### 1. 路由
`app/router/admin/shop.js`
```js
module.exports = app => {
    
    ...
    //某个图片分类下的所有图片列表 
    router.get('/shop/admin/imageclass/:id/image/:page',controller.admin.imageClass.images);
    //后台图片分类下的所有图片列表 
    router.get('/shop/admin/imageclass/:id/imgList',controller.admin.imageClass.imgList);
    ...
    // 图片上传阿里云uploadAliyunOSS
    router.post('/shop/admin/image/uploadAliyun', controller.admin.image.uploadAliyunOSS);
    //删除图片功能
    router.post('/shop/admin/image/:id/delete', controller.admin.image.deleteAPI);
    router.get('/shop/admin/image/:id/delete', controller.admin.image.delete);
    //修改图片界面
    router.get('/shop/admin/image/edit/:id', controller.admin.image.edit);
    //重命名图片名称(修改图片信息)
    router.post('/shop/admin/image/:id', controller.admin.image.update);
    // 创建图片界面
    router.get('/shop/admin/image/create', controller.admin.image.create);
    //创建图片提交数据
    router.post('/shop/admin/image', controller.admin.image.save);
};
```
### 2. 控制器
`app/controller/admin/image_class.js`
```js
    //后台图片分类下的所有图片列表 
    async imgList(){
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        let data = await ctx.page('Image',{},{
            include:[{
                model:app.model.ImageClass,
                attributes:['id','name']
            }]
        });
        // let data = await ctx.service.imageClass.datalist({ limit: 10000 });
        // console.log('分类数据', data);
        // ctx.body = data;
        // return;
        // data = data.rules;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '图片分类:' + (data && data[0] ? data[0].image_class.name : '') + '下的全部图片',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/shop/admin/image/create',//新增路径
                        desc: '添加图片',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    }
                ],
                //表头
                columns: [
                    {
                        title: '图片',
                        // key: 'name',
                        class: 'text-left',//可选
                        render(item) { //树形数据
                            // console.log('每个item',item);
                            // if (item.level) {
                            //     let w = item.level * 40;
                            //     return `<span style="display:inline-block;width:${w}px"></span>`;
                            // }
                            return `
                               <div style="display:flex;">
                                   <img src="${item.url}" style="width:100px;height:100px;"></img>
                                   <div style="margin-left:10px;">
                                      <p><span>图片名称：</span> <span>${item.name}</span></p>
                                      <p><span>图片分类：</span> <span>${item.image_class.name}</span></p>
                                    </div>
                               </div>
                            `;
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
                                @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/shop/admin/imageclass/${item.image_class.id}/imgList','Image')">${arr[i].name}</button>`;
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
                                return `/shop/admin/image/edit/${id}`;
                            },
                            //删除
                            delete: function (id) {
                                return `/shop/admin/image/${id}/delete`;
                            }
                        }
                    },
                ],
            },
        });
    } 
```

## 二、删除图片
### 1. 控制器
`app/controller/admin/image.js`
```js
    // 删除图片功能
    async delete() {
      const { ctx, app } = this;
      const id = ctx.params.id;

      let data = await app.model.Image.findOne({
         where: {
            id,
         }
      });
      if(!data){
         return ctx.apiFail('该图片记录不存在');
      }
      const image_class_id = data.image_class_id;

      await app.model.Image.destroy({
         where: {
            id,
         }
      });
      //提示
      ctx.toast('图片删除成功', 'success');
      //跳转
      ctx.redirect('/shop/admin/imageclass/' + image_class_id + '/imgList');
   }
```

## 三、修改图片（包括图片重命名）
### 1. 控制器
`app/controller/admin/image.js`
```js
    // 修改图片界面
    async edit() {
      const { ctx, app } = this;
      const id = ctx.params.id;
      let currentdata = await app.model.Image.findOne({
          where: {
              id
          }
      });
      if (!currentdata) {
          return ctx.apiFail('该图片不存在');
      }
      currentdata = JSON.parse(JSON.stringify(currentdata));
      // console.log('当前图片数据', currentdata);
      // return;

      // 渲染模版前先拿到所有分类
      let data = await ctx.service.imageClass.dropdown_imageclass_list();
      data.shift();
      // console.log('下拉框显示的所有分类', JSON.stringify(data));
      // return;

      //渲染公共模版
      await ctx.renderTemplate({
          id,
          title: '修改图片' + currentdata.name,//现在网页title,面包屑导航title,页面标题
          tempType: 'form', //模板类型：table表格模板 ，form表单模板
          form: {
              //修改直播功能中的礼物提交地址
              action: '/shop/admin/image/' + id,
              //  字段
              fields: [
                  {
                      label: '放在哪个图片分类里面',
                      type: 'dropdown', //下拉框
                      name: 'image_class_id',
                      default: JSON.stringify(data),
                      placeholder: '不调整（如需调整请选择）',
                  },
                  {
                      label: '图片名称',
                      type: 'text',
                      name: 'name',
                      placeholder: '请输入图片名称',
                      // default:'默认值测试', //新增时候默认值，可选
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
          successUrl: '/shop/admin/imageclass/' + currentdata.image_class_id + '/imgList',
      });

  }
```

## 四、添加图片
### 1. 模版
`app/view/admin/layout/_form.html`
```js
...
{# 如果是文件类型 #}
...
{# 如果是上传到oss文件类型 #}
{% elif item.type == 'fileoss' %}
<input class="form-control" type="file" name="{{item.name}}"
    @change="uploadFileoss($event,'{{item.name}}')">
    <img :src="form.{{item.name}}" v-if="form.{{item.name}}"
    class="mt-2 p-1 rounded border avatar-lg">
{# 如果是下拉框类型 #}
...
...
// 如果是上传到oss文件类型
uploadFileoss(e,name,callback=null){
    //console.log('e:', e);
    //console.log('name:',name);
    let file = e.target.files[0];
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
...
```
### 2. 控制器
`app/controller/admin/image.js`
```js
    //上传图片界面
    async create(){
      const { ctx, app } = this;
      // 渲染模版前先拿到所有分类
      let data = await ctx.service.imageClass.dropdown_imageclass_list();
      data.shift();
      // console.log('下拉框显示的所有分类', JSON.stringify(data));
      // return;
      //渲染公共模版
      await ctx.renderTemplate({
         title: '上传图片',//现在网页title,面包屑导航title,页面标题
         tempType: 'form', //模板类型：table表格模板 ，form表单模板
         form: {
             //提交地址
             action: '/shop/admin/image',
             //  字段
             fields: [
                 {
                     label: '放在哪个图片分类里面',
                     type: 'dropdown', //下拉框
                     name: 'image_class_id',
                     default: JSON.stringify(data),
                     placeholder: '请选择一个图片分类',
                 },
                 {
                     label: '选择图片',
                     type: 'fileoss',
                     name: 'url',
                     placeholder: '请选择图片',
                     // default:'默认值测试', //新增时候默认值，可选
                 },
                 {
                     label: '图片名称',
                     type: 'text',
                     name: 'name',
                     placeholder: '请输入图片名称',
                     // default:'默认值测试', //新增时候默认值，可选
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
         //修改成功之后跳转到哪个页面
         successUrl: '/shop/admin/image/create',
     });
    }

    //上传图片界面提交数据
    async save() {
      const { ctx, app } = this;
      //一般处理流程
      //1.参数验证
      this.ctx.validate({
         url: {
            type: 'string',  //参数类型
            required: true, //是否必须
            // defValue: '', 
            desc: '图片地址', //字段含义
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
             },
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
      let { name, url, status, image_class_id,order } = this.ctx.request.body;
      
      const res = await this.app.model.Image.create({
          name,
          url,
          status,
          image_class_id,
          order
      });
      this.ctx.apiSuccess('上传图片成功');
  }
```

### 3. 图片分类控制器
`app/controller/admin/image_class.js`
```js
    // 图片分类列表页面
    async index() {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        // let data = await ctx.page('Category');
        let data = await ctx.service.imageClass.datalist({ limit: 10000 });
        // console.log('分类数据', data);
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
                        desc: '创建图片分类',//新增 //按钮名称
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
                    {
                        title: '分类下的图片',
                        // key: 'name',
                        class: 'text-left',//可选
                        render(item) { //树形数据
                            // console.log('每个item',item);
                            return `<a href="/shop/admin/imageclass/${item.id}/imgList">查看分类下的图片</a>`;
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
```
