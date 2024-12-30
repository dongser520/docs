---
navbar: true
sidebar: auto
title: 章节7.后端api开发（选修课）
---

前言
> 本章节为选修课，所谓选修课就是：<span style="color:green;">大家自行选择学习本章节课程，也就是说你跳过本章节的课程，直接学习下一个章节，不会影响你学习本套课程。</span>

那为什么本章节要出这套选修课呢？
> ① 基于部分同学的请求，有同学私信老师，希望老师讲一下后端api的相关知识；<br/>
> ② 基于我们课程的教学理念，让从零开始学习的同学，能学习一个完整项目的前后端开发；

哪些同学可以学习本章节，哪些同学可以直接跳过本章节直接学下个章节呢？
> 可以学习本章节的同学：
>> ① 学习过我们 <a href="/secondless/w-c.html" target="_blank">第二学期第三季：网站前后端完整开发</a>的同学，可以直接学习本章节；<br/>
>> ② 对后端开发感兴趣的同学，想知道服务器如何将数据处理之后传递给我们前端H5、小程序、APP的同学 <span style="color:#ff6600;">（但是，如果你没有学习我们前面的`第二学期第三季：网站前后端完整开发`的同学，需要先学完前面的课程再来看本章节，本章节相当于是`第二学期第三季：网站前后端完整开发`课程的续集、增值服务课）</span><br/><br/>
>
> 直接跳过本章节直接学下个章节的同学：
>> ① 对全栈、后端不感兴趣，只想学前端的同学；<br/> 
> 说明：我们会在后面的章节，提供一套线上的api接口，供同学们测试和开发用，所以不学习本章节也可以继续开发我们本季度课程项目。

本章节讲的是什么？
> 我们在上个章节，已经将我们的vue页面的数据统一做了处理，就等着服务器给我们提供数据接口api，因此本章节教大家如何写api接口。另外，在群文件里，我们也会提供最终的后端源码给大家，大家可以自行上线源码到你的服务器。


大家对号入座，根据你的情况来学习本章节。

## 一、启动项目打开后台，新增一个管理板块
### ① `/data/root.json`
```json
[
    ...
    {"id":13,"pid":0, "name": "H5-小程序-App", "icon": "fa fa-tablet", "url": "" },
    {"id":14,"pid":13, "name": "底部导航栏管理", "icon": "fa fa-sitemap", "url": "xxx" }
]
```
## 二、底部导航栏管理
### ① 控制器 `/app/controller/admin/wap_uTabbar.js`
```js
'use strict';

const fs = require('node:fs');
const path = require('node:path');

//写入json文件
let paths = {
    dir: './data',
    file: './data/wap_uTabbar.json'
    //   dir:'./Appdata',
    //   file:'./Appdata/data.json'
}

const Controller = require('egg').Controller;

class Wap_uTabbarController extends Controller {

    //创建界面
    async create() {
        const { ctx, app } = this;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '创建底部导航栏',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/admin/wapUTabbar/save",
                //  字段
                fields: [
                    {
                        label: '名称',
                        type: 'text',
                        name: 'text',
                        placeholder: '请输入底部导航栏名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '图标',
                        type: 'text',
                        name: 'icon',
                        placeholder: '请输入图标名',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '页面地址',
                        type: 'text',
                        name: 'openurl',
                        placeholder: '请输入点击导航栏之后打开哪个页面的地址',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '角标',
                        type: 'number',
                        name: 'badge',
                        placeholder: '角标数，选填',
                        default:'0', //新增时候默认值，可选
                    },
                    {
                        label: '是否有红点',
                        type: 'btncheck', //按钮组选择
                        name: 'dot',
                        default: JSON.stringify([
                            { value: false, name: '没有红点', checked: true },
                            { value: true, name: '有红点' },
                        ]),
                        placeholder: '是否有红点 false没有红点 true有红点 等等状态',
                    },
                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '/admin/wapUTabbar/index',
        });
    }

    //创建提交数据
    async save() {
        //1.参数验证
        this.ctx.validate({
            text: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '导航栏名称' //字段含义
            },
            icon: {
                type: 'string',
                required: true,
                // defValue: '',
                desc: '导航栏图标'
            },
            openurl: {
                type: 'string',
                required: true,
                // defValue: '',
                desc: '页面地址'
            },
            badge: {
                type: 'string',
                required: false,
                defValue: 0,
                desc: '角标数'
            },
            dot: {
                type: 'bool',
                required: false,
                defValue: false,
                desc: '是否有红点'
            },
        });

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
    //写入
    async writeconfig(path, data) {
        fs.writeFile(path, JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log('写入成功')
        });
    }

    //列表界面
    async index() {
        const { ctx, app } = this;
        let data = await this.getsiteConfigJson();
        if (typeof data == 'object') {
            //渲染公共模版
            await ctx.renderTemplate({
                title: '底部导航栏栏目列表',//现在网页title,面包屑导航title,页面标题
                data: data.data,
                tempType: 'table', //模板类型：table表格模板 ，form表单模板
                table: {
                    //表格上方按钮,没有不要填buttons
                    buttons: [
                        {
                            url: '/admin/wapUTabbar/create',//新增路径
                            desc: '新建底部导航栏',//新增 //按钮名称
                            // icon: 'fa fa-plus fa-lg',//按钮图标
                        }
                    ],
                    //表头
                    columns: [
                        {
                            title: '底部导航栏栏目信息',
                            // key: 'category_id',
                            class: 'text-left',//可选
                            render(item) {
                                return `
                               <ul>
                                <li>名称：${item.text}</li>
                                <li>图标：${item.icon}</li>
                                <li>打开地址：${item.openurl}</li>
                                <li>角标数：${item.badge}</li>
                                <li>是否有红点：${item.dot}</li>
                               </ul>
                            `;
                            }
                        },
                        {
                            title: '操作',
                            class: 'text-right',//可选
                            action: {
                                //修改
                                edit: function (id) {
                                    return `/admin/wapUTabbar/edit/${id}`;
                                },
                                //删除
                                delete: function (id) {
                                    return `/admin/wapUTabbar/delete/${id}`;
                                }
                            }
                        },
                    ],
                },
            });
        }
    }

    //获取数据
    async getsiteConfigJson() {

        //先判断是否存在这个json文件或者文件夹
        if (!fs.existsSync(paths.file)) {
            this.ctx.redirect('/admin/wapUTabbar/create');
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
        const id = ctx.params.id;
        let data = await this.getsiteConfigJson();
        data = data.data.find(item => item.id == id);
        console.log('即将修改渲染的内容', data);
        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改导航栏',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改配置提交地址
                action: '/admin/wapUTabbar/update/' + id,
                //  字段
                fields: [
                    {
                        label: '名称',
                        type: 'text',
                        name: 'text',
                        placeholder: '请输入底部导航栏名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '图标',
                        type: 'text',
                        name: 'icon',
                        placeholder: '请输入图标名',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '页面地址',
                        type: 'text',
                        name: 'openurl',
                        placeholder: '请输入点击导航栏之后打开哪个页面的地址',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '角标',
                        type: 'number',
                        name: 'badge',
                        placeholder: '角标数，选填',
                        default:'0', //新增时候默认值，可选
                    },
                    {
                        label: '是否有红点',
                        type: 'btncheck', //按钮组选择
                        name: 'dot',
                        default: JSON.stringify([
                            { value: false, name: '没有红点', checked: true },
                            { value: true, name: '有红点' },
                        ]),
                        placeholder: '是否有红点 false没有红点 true有红点 等等状态',
                    },
                ],
                //修改内容默认值
                data: data,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/admin/wapUTabbar/index',
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
                desc: 'id'
            },
            text: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '导航栏名称' //字段含义
            },
            icon: {
                type: 'string',
                required: true,
                // defValue: '',
                desc: '导航栏图标'
            },
            openurl: {
                type: 'string',
                required: true,
                // defValue: '',
                desc: '页面地址'
            },
            badge: {
                type: 'string',
                required: false,
                defValue: 0,
                desc: '角标数'
            },
            dot: {
                type: 'bool',
                required: false,
                defValue: false,
                desc: '是否有红点'
            },
        });

        const id = ctx.params.id;
        let data = await this.getsiteConfigJson();
        let index = data.data.findIndex(item => item.id == id);
        if (index == -1) {
            return this.apiFail('该数据不存在');
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

    //删除
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
        ctx.toast('删除成功', 'success');
        //跳转
        ctx.redirect('/admin/wapUTabbar/index');
    }
}

module.exports = Wap_uTabbarController;

```
### ② 路由 `/app/router/admin/admin.js`
```js
    //底部导航栏列表界面
    router.get('/admin/wapUTabbar/index', controller.admin.wapUTabbar.index);
    //创建底部导航栏界面
    router.get('/admin/wapUTabbar/create', controller.admin.wapUTabbar.create);
    //创建底部导航栏数据
    router.post('/admin/wapUTabbar/save', controller.admin.wapUTabbar.save);
    // 修改界面
    router.get('/admin/wapUTabbar/edit/:id', controller.admin.wapUTabbar.edit);
    // 修改提交数据
    router.post('/admin/wapUTabbar/update/:id', controller.admin.wapUTabbar.update);
    //删除
    router.get('/admin/wapUTabbar/delete/:id', controller.admin.wapUTabbar.delete);
```
### ③ `/data/root.json`
```json
[
    ...
    {"id":13,"pid":0, "name": "H5-小程序-App", "icon": "fa fa-tablet", "url": "" },
    {"id":14,"pid":13, "name": "底部导航栏管理", "icon": "fa fa-sitemap", "url": "/admin/wapUTabbar/index" }
]
```

## 三、主要栏目（主要分类）管理
> 我们移动端的`主要栏目`板块，对应的就是网站的导航栏（即`网站分类`管理），只是每个分类多了图标，然后点击之后链接地址不一样，因此，我们首先对数据库新增三个字段：`wap_icon`、`wap_url`、`wap_isnav`。
### ① 数据库新增三个字段，并对迁移文件和模型文件进行修改
> 表名：category
> | 字段名                 |  数据类型   | 描述                              |   空     |         默认值                       | <p style="width:100px;">字段含义 </p>     |
> | :---:                 | :---:       | :---:                            | :---:    |         :---:                           |        :---:                           |
> | <b>... </b>            | <span>... </span>     | <span style="font-size:12px">... </span>      |   ...      |   <span style="font-size:12px">...  </span>                             |                                        |
> | <b>wap_icon </b>      | varchar(100) |                                  |    是    |                                |   移动端分类图标          |
> | <b>wap_url </b>      | varchar(255) |                                  |    是    |                        |    移动端点击分类打开的页面           |
> | <b>wap_isnav </b>      | int(1) |                                  |    否    |           0             |    该分类是否是移动端的主要栏目：0-否，1-是           |
>
> 迁移文件`/database/migrations/分类迁移表` 、 模型文件`/app/model/category.js`
```js
...
wap_icon: {
    type: STRING(100),//不限定长度.默认varchar(255)
    allowNull: true,
    defaultValue: '',
    comment: '移动端分类图标'
},
wap_url: {
    type: STRING,//不限定长度.默认varchar(255)
    allowNull: true,
    defaultValue: '',
    comment: '移动端点击分类打开的页面'
},
wap_isnav: {
    type: INTEGER(1),
    allowNull: false,
    defaultValue: 0,
    comment: '该分类是否是移动端的主要栏目：0-否，1-是'
},
...
```
### ② 新增栏目：主要栏目管理 `/data/root.json`
```json
[
    ...
    {"id":15,"pid":13, "name": "主要分类管理", "icon": "fa fa-list", "url": "/admin/wapCategory/index" }
]
```
### ③ 控制器 `/app/controller/admin/wap_category.js`
```js
'use strict';

const Controller = require('egg').Controller;

class Wap_categoryController extends Controller {
     //分类列表页面
     async index() {
        const { ctx, app } = this;
        //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
        // let data = await ctx.page('Category');
        let data = await ctx.service.category.datalist({ limit: 1000 });
        console.log('分类数据', data);
        // return;
        data = data.rules;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '分类列表',//现在网页title,面包屑导航title,页面标题
            data,
            tempType: 'table', //模板类型：table表格模板 ，form表单模板
            table: {
                //表格上方按钮,没有不要填buttons
                buttons: [
                    {
                        url: '/admin/wapCategory/create',//新增路径
                        desc: '新增分类',//新增 //按钮名称
                        // icon: 'fa fa-plus fa-lg',//按钮图标
                    }
                ],
                //表头
                columns: [
                    {
                        title: '分类名称',
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
                        title: '移动端分类图标',
                        key: 'wap_icon',
                        class: 'text-center',//可选
                    },
                    {
                        title: '该分类是否是移动端的主要栏目',
                        key: 'wap_isnav',
                        width: 200,//可选
                        class: 'text-center',//可选
                        hidekeyData: true,//是否隐藏key对应的数据
                        render(item) {
                            console.log('可用状态里面每个item', item);
                            let arr = [
                                { value: 1, name: '是' },
                                { value: 0, name: '否' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.wap_isnav}"
                                value="${arr[i].value}"
                                @click="changeBtnStatus('wap_isnav','btn-group-${item.id}',${arr[i].value},${i},${item.id},'wapCategory','Category')">${arr[i].name}</button>`;
                            }
                            str += `</div>`;
                            return str;
                        }
                    },
                    {
                        title: '移动端点击分类打开的页面',
                        key: 'wap_url',
                        class: 'text-center',//可选
                    },
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
                            console.log('可用状态里面每个item', item);
                            let arr = [
                                { value: 1, name: '可用' },
                                { value: 0, name: '不可用' },
                            ];
                            let str = `<div class="btn-group btn-group-${item.id}">`;
                            for (let i = 0; i < arr.length; i++) {
                                str += `<button type="button" class="btn btn-light" data="${item.status}"
                                value="${arr[i].value}"
                                @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'wapCategory','Category')">${arr[i].name}</button>`;
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
                                return `/admin/wapCategory/edit/${id}`;
                            },
                            //删除
                            delete: function (id) {
                                return `/admin/wapCategory/delete/${id}`;
                            }
                        }
                    },
                ],
            },
        });
    }

    //创建分类表单
    async create() {
        const { ctx, app } = this;

        // 渲染模版前先拿到所有分类
        let data = await ctx.service.category.dropdown_Categorylist();
        //渲染公共模版
        await ctx.renderTemplate({
            title: '创建移动端分类表单',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/admin/wapCategory/save",
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
                        label: '分类名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入分类名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '分类英文名称',
                        type: 'text',
                        name: 'enname',
                        placeholder: '请输入分类英文名称',
                    },
                    // {
                    //     label: '分类描述',
                    //     type: 'text',
                    //     name: 'description',
                    //     placeholder: '请输入分类描述,选填',
                    // },
                    // {
                    //     label: '分类链接地址',
                    //     type: 'text',
                    //     name: 'categoryurl',
                    //     placeholder: '请输入分类链接地址,选填',
                    // },
                    {
                        label: '分类排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入分类排序',
                        default:50,
                    },
                    // {
                    //     label: '可用状态',
                    //     type: 'btncheck', //按钮组选择
                    //     name: 'status',
                    //     default: JSON.stringify([
                    //         { value: 1, name: '可用', checked: true },
                    //         { value: 0, name: '不可用' },
                    //     ]),
                    //     placeholder: '分类状态 0不可用 1可用 等等状态',
                    // },
                    {
                        label: '移动端分类图标',
                        type: 'text',
                        name: 'wap_icon',
                        placeholder: '请输入移动端分类图标,选填',
                    },
                    {
                        label: '移动端点击分类打开的页面',
                        type: 'text',
                        name: 'wap_url',
                        placeholder: '移动端点击分类打开的页面,选填',
                    },

                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '/admin/wapCategory/index',
        });
    }

    //分类表单提交数据
    async save() {
        //一般处理流程
        //1.参数验证
        this.ctx.validate({
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '分类名称' //字段含义
            },
            enname: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '分类英文名称'
            },
            // status: {
            //     type: 'int',
            //     required: true,
            //     defValue: 1,
            //     desc: '分类状态 0不可用 1可用 等等状态'
            // },
            pid: {
                type: 'int',
                required: true,
                defValue: 0,
                desc: '上一级(父级)id'
            },
            // description: {
            //     type: 'string',
            //     required: false,
            //     defValue: '',
            //     desc: '分类描述，分类简单介绍'
            // },
            // categoryurl: {
            //     type: 'string',
            //     required: false,
            //     defValue: '',
            //     desc: '分类链接地址'
            // },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '分类排序'
            },
            wap_icon: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '移动端分类图标'
            },
            wap_url: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '移动端点击分类打开的页面'
            }
        });
        //先判断一下直播功能中的礼物账号是否存在，不存在在写入数据库
        //2.写入数据库
        //3.成功之后给页面反馈
        let { 
            name, 
            enname, 
            // status, 
            pid,
            // description,
            order,
            // categoryurl,
            wap_icon,
            wap_url 
        } = this.ctx.request.body;
        if (await this.app.model.Category.findOne({ where: { name } })) {
            return this.ctx.apiFail('分类名称已存在');
        }
        //否则不存在则写入数据库
        const res = await this.app.model.Category.create({
            name,
            enname,
            // status,
            pid,
            // description,
            order,
            // categoryurl,
            wap_icon,
            wap_url
        });
        this.ctx.apiSuccess('创建分类成功');
    }

    //根据id修改分类状态
    async updateStatus() {
        const { id, status } = this.ctx.request.body;
        //1.参数验证
        this.ctx.validate({
            status: {
                type: 'int',
                required: true,
                // defValue: 1,
                desc: '分类状态 0不可用 1可用 等等状态'
            },
            id: {
                type: 'int',
                required: true,
                // defValue: 0,
                desc: '分类id'
            }
        });
        let data = await this.app.model.Category.findByPk(id);
        if (!data) {
            return this.ctx.apiFail('分类数据不存在');
        }
        data.status = status;
        await data.save();
        this.ctx.apiSuccess('修改分类状态成功');
    }

    //修改分类界面
    async edit() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let currentdata = await app.model.Category.findOne({
            where: {
                id
            }
        });
        if (!currentdata) {
            return ctx.apiFail('该分类不存在');
        }
        currentdata = JSON.parse(JSON.stringify(currentdata));
        console.log('当前分类数据', currentdata);
        // return;

        // 渲染模版前先拿到所有分类
        let data = await ctx.service.category.dropdown_Categorylist();
        console.log('下拉框显示的所有分类', JSON.stringify(data));
        // return;

        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改分类:' + currentdata.name,//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改直播功能中的礼物提交地址
                action: '/admin/wapCategory/update/' + id,
                //  字段
                fields: [
                    {
                        label: '放在哪个分类里面',
                        type: 'dropdown', //下拉框
                        name: 'pid',
                        default: JSON.stringify(data),
                        placeholder: '不调整（如需调整请选择）',
                    },
                    {
                        label: '分类名称',
                        type: 'text',
                        name: 'name',
                        placeholder: '请输入分类名称',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    {
                        label: '分类英文名称',
                        type: 'text',
                        name: 'enname',
                        placeholder: '请输入分类英文名称',
                    },
                    // {
                    //     label: '分类描述',
                    //     type: 'text',
                    //     name: 'description',
                    //     placeholder: '请输入分类描述,选填',
                    // },
                    // {
                    //     label: '分类链接地址',
                    //     type: 'text',
                    //     name: 'categoryurl',
                    //     placeholder: '请输入分类链接地址,选填',
                    // },
                    {
                        label: '分类排序',
                        type: 'number',
                        name: 'order',
                        placeholder: '请输入分类排序',
                        default:50,
                    },
                    // {
                    //     label: '可用状态',
                    //     type: 'btncheck', //按钮组选择
                    //     name: 'status',
                    //     default: JSON.stringify([
                    //         { value: 1, name: '可用', checked: true },
                    //         { value: 0, name: '不可用' },
                    //     ]),
                    //     placeholder: '分类状态 0不可用 1可用 等等状态',
                    // },
                    {
                        label: '移动端分类图标',
                        type: 'text',
                        name: 'wap_icon',
                        placeholder: '请输入移动端分类图标,选填',
                    },
                    {
                        label: '移动端点击分类打开的页面',
                        type: 'text',
                        name: 'wap_url',
                        placeholder: '移动端点击分类打开的页面,选填',
                    },
                ],
                //修改内容默认值
                data:currentdata,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/admin/wapCategory/index',
        });

    }

    //修改分类提交数据
    async update() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '直播功能中的礼物id'
            },
            name: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '分类名称' //字段含义
            },
            enname: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '分类英文名称'
            },
            // status: {
            //     type: 'int',
            //     required: true,
            //     defValue: 1,
            //     desc: '分类状态 0不可用 1可用 等等状态'
            // },
            pid: {
                type: 'int',
                required: true,
                defValue: 0,
                desc: '上一级(父级)id'
            },
            // description: {
            //     type: 'string',
            //     required: false,
            //     defValue: '',
            //     desc: '分类描述，分类简单介绍'
            // },
            // categoryurl: {
            //     type: 'string',
            //     required: false,
            //     defValue: '',
            //     desc: '分类链接地址'
            // },
            order: {
                type: 'int',
                required: false,
                defValue: 50,
                desc: '分类排序'
            },
            wap_icon: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '移动端分类图标'
            },
            wap_url: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '移动端点击分类打开的页面'
            }
        });

        // 参数
        const id = ctx.params.id;
        const {  
            name, 
            enname, 
            //status, 
            pid,
            //description,
            order,
            //categoryurl,
            wap_icon,
            wap_url  
        } = ctx.request.body;
        // 先看一下是否存在
        const category = await app.model.Category.findOne({ where: { id } });
        if (!category) {
            return ctx.apiFail('该分类记录不存在');
        }
        //存在，分类名称可以一样，只要保证它在不同的分类下面
        const Op = this.app.Sequelize.Op;//拿Op,固定写法
        //先查一下修改的分类名称，是否已经存在，如果存在，但是只要不放在同一分类下还是可以的
        const hasdata = await app.model.Category.findOne({
            where: {
                name,
                id: {
                    [Op.ne]: id
                }
            }
        });
        if (hasdata && hasdata.pid == pid) {
            return ctx.apiFail('同一个分类下不能有相同的分类名称');
        }
        // 修改数据
        category.name = name;
        category.enname = enname;
        //category.status = status;
        category.pid = pid;
        //category.description = description;
        category.order = order; 
        //category.categoryurl = categoryurl; 
        category.wap_icon = wap_icon;
        category.wap_url = wap_url;

        await category.save();
        // 给一个反馈
        ctx.apiSuccess('修改分类成功');
    }

    //删除分类
    async delete() {
        const { ctx, app } = this;
        const id = ctx.params.id;

        let data = await ctx.service.category.categorylist();
        // console.log('所有分类', data);
        let ids = app._collectNodeIds(data,Number(id));
        // console.log(ids);
        await app.model.Category.destroy({
            where: {
                id:{
                    [this.app.Sequelize.Op.in] : ids
                }
            }
        });
        //提示
        ctx.toast('分类删除成功', 'success');
        //跳转
        ctx.redirect('/admin/wapCategory/index');
    }

}

module.exports = Wap_categoryController;

```

### ④ 路由 `/app/router/admin/admin.js`
```js
    // 创建分类界面
    router.get('/admin/wapCategory/create', controller.admin.wapCategory.create);
    //创建分类提交数据
    router.post('/admin/wapCategory/save', controller.admin.wapCategory.save);
    //创建分类列表页面
    router.get('/admin/wapCategory/index', controller.admin.wapCategory.index);
    //根据id修改分类状态
    router.post('/admin/wapCategory/updateStatus', controller.admin.wapCategory.updateStatus);
    //修改分类界面
    router.get('/admin/wapCategory/edit/:id', controller.admin.wapCategory.edit);
    //修改分类数据功能
    router.post('/admin/wapCategory/update/:id', controller.admin.wapCategory.update);
    //删除分类功能
    router.get('/admin/wapCategory/delete/:id', controller.admin.wapCategory.delete);

```




## 四、网站配置（联系我们）管理
### ① 控制器 `/app/controller/admin/wap_config.js`
```js
'use strict';

const fs = require('node:fs');
const path = require('node:path');

//留言写入json文件
let paths = {
    dir: './data',
    file: './data/wap_config.json'
    //   dir:'./Appdata',
    //   file:'./Appdata/data.json'
}

const Controller = require('egg').Controller;

class Wap_configController extends Controller {
    //创建配置界面
    async create() {
        const { ctx, app } = this;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '创建配置',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/admin/wapConfig/save",
                //  字段
                fields: [
                    {
                        label: '配置项称呼',
                        type: 'text',
                        name: 'configName',
                        placeholder: '如：公司名称/联系地址等',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    // {
                    //     label: '配置项值',
                    //     type: 'text',
                    //     name: 'configValue',
                    //     placeholder: '如：睿晨电网建设工程有限公司',
                    //     // default:'默认值测试', //新增时候默认值，可选
                    // },
                    {
                        label: '配置项值',
                        type: 'diy', //自定义类型组件
                        name: 'configValue',
                        placeholder: '请输入配置项值',
                        render(item){
                            const name = item.name;
                            console.log(name);
                            return `
                            <div class="btn-group btn-group-${name}">
                                <button type="button" class="btn btn-success"
                                @click="diyBtnGroup('btn-group-${name}','btn-group-${name}-check',0)">文本</button>
                                <button type="button" class="btn btn-light"
                                @click="diyBtnGroup('btn-group-${name}','btn-group-${name}-check',1)">文件</button>
                            </div>
                            <div class="btn-group-${name}-check">
                                <div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                        <span class="input-group-text">配置项值</span>
                                        </div>
                                        <input type="text" class="form-control" 
                                        placeholder="如：睿晨电网建设工程有限公司"  name='${name}'
                                        v-model="form.${name}"  />
                                    </div>
                                </div>
                                <div style="display:none;">
                                    <input class="form-control" type="file" name="${name}"
                                    @change="uploadFile($event,'${name}',(e)=>{
                                        console.log(e);
                                    })" />
                                    <div v-if="uploadedFiles.hasOwnProperty('${name}') && uploadedFiles['${name}'] ">
                                        <div v-if="uploadedFiles['${name}'].endsWith('.jpg') ||
                                            uploadedFiles['${name}'].endsWith('.jpeg')  ||
                                            uploadedFiles['${name}'].endsWith('.png')  ||
                                            uploadedFiles['${name}'].endsWith('.gif') ">
                                            <img :src="uploadedFiles['${name}']"  class="mt-2 p-1 rounded border avatar-lg" >
                                        </div>
                                        <div v-else>
                                            <span class="text-success">附件上传成功!</span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            `;
                        }
                    },
                    {
                        label: '配置项图标',
                        type: 'text',
                        name: 'prefixIcon',
                        placeholder: '请输入配置项图标',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    

                ],
            },
            //新增成功之后跳转到哪个页面
            successUrl: '/admin/wapConfig/index',
        });
    }

    //创建配置提交数据
    async save() {
        //1.参数验证
        this.ctx.validate({
            configName: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '配置项称呼' //字段含义
            },
            configValue: {
                type: 'string',
                required: true,
                // defValue: '',
                desc: '配置项值'
            },
            prefixIcon: {
                type: 'string',
                required: true,
                // defValue: '',
                desc: '配置项图标'
            },
        });

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


    //列表界面
    async index() {
        const { ctx, app } = this;
        let data = await this.getsiteConfigJson();
        if (typeof data == 'object') {
            //渲染公共模版
            await ctx.renderTemplate({
                title: '配置列表',//现在网页title,面包屑导航title,页面标题
                data: data.data,
                tempType: 'table', //模板类型：table表格模板 ，form表单模板
                table: {
                    //表格上方按钮,没有不要填buttons
                    buttons: [
                        {
                            url: '/admin/wapConfig/create',//新增路径
                            desc: '新建配置',//新增 //按钮名称
                            // icon: 'fa fa-plus fa-lg',//按钮图标
                        }
                    ],
                    //表头
                    columns: [
                        {
                            title: '配置列表项信息',
                            // key: 'category_id',
                            class: 'text-left',//可选
                            render(item) {
                                return `
                           <ul>
                            <li>${item.configName} ：${item.configValue}</li>
                            <li>图标：${item.prefixIcon}</li>
                           </ul>
                        `;
                            }
                        },
                        {
                            title: '操作',
                            class: 'text-right',//可选
                            action: {
                                //修改
                                edit: function (id) {
                                    return `/admin/wapConfig/edit/${id}`;
                                },
                                //删除
                                delete: function (id) {
                                    return `/admin/wapConfig/delete/${id}`;
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
            this.ctx.redirect('/admin/wapConfig/create');
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

    // 修改
    async edit() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let data = await this.getsiteConfigJson();
        data = data.data.find(item => item.id == id);
        console.log('即将修改渲染的内容', data);
        //渲染公共模版
        await ctx.renderTemplate({
            id,
            title: '修改配置',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改配置提交地址
                action: '/admin/wapConfig/update/' + id,
                //  字段
                fields: [
                    {
                        label: '配置项称呼',
                        type: 'text',
                        name: 'configName',
                        placeholder: '如：公司名称/联系地址等',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    // {
                    //     label: '配置项值',
                    //     type: 'text',
                    //     name: 'configValue',
                    //     placeholder: '如：睿晨电网建设工程有限公司',
                    //     // default:'默认值测试', //新增时候默认值，可选
                    // },
                    {
                        label: '配置项值',
                        type: 'diy', //自定义类型组件
                        name: 'configValue',
                        placeholder: '请输入配置项值',
                        render(item){
                            const name = item.name;
                            console.log(name);
                            return `
                            <div class="btn-group btn-group-${name}">
                                <button type="button" class="btn btn-success"
                                @click="diyBtnGroup('btn-group-${name}','btn-group-${name}-check',0)">文本</button>
                                <button type="button" class="btn btn-light"
                                @click="diyBtnGroup('btn-group-${name}','btn-group-${name}-check',1)">文件</button>
                            </div>
                            <div class="btn-group-${name}-check">
                                <div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                        <span class="input-group-text">配置项值</span>
                                        </div>
                                        <input type="text" class="form-control" 
                                        placeholder="如：睿晨电网建设工程有限公司"  name='${name}'
                                        v-model="form.${name}"  />
                                    </div>
                                </div>
                                <div style="display:none;">
                                    <input class="form-control" type="file" name="${name}"
                                    @change="uploadFile($event,'${name}',(e)=>{
                                        console.log(e);
                                    })" />
                                    <div v-if="uploadedFiles.hasOwnProperty('${name}') && uploadedFiles['${name}'] ">
                                        <div v-if="uploadedFiles['${name}'].endsWith('.jpg') ||
                                            uploadedFiles['${name}'].endsWith('.jpeg')  ||
                                            uploadedFiles['${name}'].endsWith('.png')  ||
                                            uploadedFiles['${name}'].endsWith('.gif') ">
                                            <img :src="uploadedFiles['${name}']"  class="mt-2 p-1 rounded border avatar-lg" >
                                        </div>
                                        <div v-else>
                                            <span class="text-success">附件上传成功!</span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            `;
                        }
                    },
                    {
                        label: '配置项图标',
                        type: 'text',
                        name: 'prefixIcon',
                        placeholder: '请输入配置项图标',
                        // default:'默认值测试', //新增时候默认值，可选
                    },
                    

                ],
                //修改内容默认值
                data: data,
            },
            //修改成功之后跳转到哪个页面
            successUrl: '/admin/wapConfig/index',
        });
    }

    //修改提交数据到json
    async update() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '配置id'
            },
            configName: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '配置项称呼' //字段含义
            },
            configValue: {
                type: 'string',
                required: true,
                // defValue: '',
                desc: '配置项值'
            },
            prefixIcon: {
                type: 'string',
                required: true,
                // defValue: '',
                desc: '配置项图标'
            },
        });

        const id = ctx.params.id;
        let data = await this.getsiteConfigJson();
        let index = data.data.findIndex(item => item.id == id);
        if (index == -1) {
            return this.apiFail('该数据不存在');
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

    //删除
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
        ctx.toast('删除配置数据成功', 'success');
        //跳转
        ctx.redirect('/admin/wapConfig/index');
    }
}

module.exports = Wap_configController;

```
### ② 路由 `/app/router/admin/admin.js`
```js
    //界面
    router.get('/admin/wapConfig/index', controller.admin.wapConfig.index);
    //创建底部导航栏界面
    router.get('/admin/wapConfig/create', controller.admin.wapConfig.create);
    //创建数据
    router.post('/admin/wapConfig/save', controller.admin.wapConfig.save);
    // 修改
    router.get('/admin/wapConfig/edit/:id', controller.admin.wapConfig.edit);
    // 修改提交数据
    router.post('/admin/wapConfig/update/:id', controller.admin.wapConfig.update);
    //删除
    router.get('/admin/wapConfig/delete/:id', controller.admin.wapConfig.delete);
```
### ③ `/data/root.json`
```json
[
    ...
    {"id":16,"pid":13, "name": "配置管理", "icon": "fa fa-wrench", "url": "/admin/wapConfig/index" }
]
```






<br/><br/><br/><br/><br/><br/><br/>




## 【第三学期第1季课程】其它章节
### [章节1.课程介绍](/thirdless/w-a '章节1.课程介绍')
<!-- <LessList  /> -->
### [章节2.开发前环境搭建](/thirdless/w-a/02开发前环境搭建 '章节2.开发前环境搭建')
####  <a href="/thirdless/w-a/02开发前环境搭建.html#_1-安装开发工具" style="margin-left:40px;">1. 安装开发工具</a>
####  <a href="/thirdless/w-a/02开发前环境搭建.html#_2-安装插件并调试移动端页面" style="margin-left:40px;">2. 安装插件并调试移动端页面</a>
####  <a href="/thirdless/w-a/02开发前环境搭建.html#_3-调试安卓(Andriod)端手机app效果" style="margin-left:40px;">3. 调试安卓(Andriod)端手机app效果</a>
####  <a href="/thirdless/w-a/02开发前环境搭建.html#_4-调试苹果(IOS)手机app效果" style="margin-left:40px;">4. 调试苹果(IOS)手机app效果</a>
####  <a href="/thirdless/w-a/02开发前环境搭建.html#_5-调试微信小程序效果" style="margin-left:40px;">5. 调试微信小程序效果</a>
####  <a href="/thirdless/w-a/02开发前环境搭建.html#_6-调试支付宝小程序效果" style="margin-left:40px;">6. 调试支付宝小程序效果</a>
### [章节3.引入UI框架及进行全局配置](/thirdless/w-a/03引入UI框架及进行全局配置 '章节2.引入UI框架及进行全局配置')
####  <a href="/thirdless/w-a/03引入UI框架及进行全局配置.html#一、引入ui框架" style="margin-left:40px;">一、引入UI框架</a>
####  <a href="/thirdless/w-a/03引入UI框架及进行全局配置.html#二、项目配置" style="margin-left:40px;">二、项目配置</a>
####  <a href="/thirdless/w-a/03引入UI框架及进行全局配置.html#_1、-底部导航栏" style="margin-left:70px;">1、 底部导航栏</a>
#####  <a href="/thirdless/w-a/03引入UI框架及进行全局配置.html#_1-底部导航栏属性样式设置" style="margin-left:70px;">① 底部导航栏属性样式设置</a>
#####  <a href="/thirdless/w-a/03引入UI框架及进行全局配置.html#_2-底部导航栏事件" style="margin-left:70px;">② 底部导航栏事件</a>
####  <a href="/thirdless/w-a/03引入UI框架及进行全局配置.html#_2、顶部导航栏设置" style="margin-left:70px;">2、顶部导航栏设置</a>
### [章节4.首页开发](/thirdless/w-a/04首页开发 '章节4.首页开发')
####  <a href="/thirdless/w-a/04首页开发.html#一、swiper广告图" style="margin-left:40px;">一、swiper广告图</a>
####  <a href="/thirdless/w-a/04首页开发.html#_1-多种指示器形式样式展示" style="margin-left:70px;">① 多种指示器形式样式展示</a>
####  <a href="/thirdless/w-a/04首页开发.html#_2-带标题的轮播图" style="margin-left:70px;">② 带标题的轮播图</a>
####  <a href="/thirdless/w-a/04首页开发.html#_3-图片视频混合的轮播图" style="margin-left:70px;">③ 图片视频混合的轮播图</a>
####  <a href="/thirdless/w-a/04首页开发.html#_4-卡片式轮播图" style="margin-left:70px;">④ 卡片式轮播图</a>
####  <a href="/thirdless/w-a/04首页开发.html#二、消息滚动通知" style="margin-left:40px;">二、消息滚动通知</a>
####  <a href="/thirdless/w-a/04首页开发.html#三、引入公共样式-css样式库" style="margin-left:40px;">三、引入公共样式（css样式库）</a>
####  <a href="/thirdless/w-a/04首页开发.html#_1-公共样式-css样式库-详细代码及说明" style="margin-left:70px;">① 公共样式（css样式库）详细代码及说明</a>
####  <a href="/thirdless/w-a/04首页开发.html#_2-引入公共样式替换之前写的行内样式" style="margin-left:70px;">② 引入公共样式替换之前写的行内样式</a>
####  <a href="/thirdless/w-a/04首页开发.html#四、主要栏目展示" style="margin-left:40px;">四、主要栏目展示</a>
####  <a href="/thirdless/w-a/04首页开发.html#五、横向滚动【主营业务】展示" style="margin-left:40px;">五、横向滚动【主营业务】展示</a>
####  <a href="/thirdless/w-a/04首页开发.html#_1-横向滚动示例" style="margin-left:70px;">① 横向滚动示例</a>
####  <a href="/thirdless/w-a/04首页开发.html#_2-横向滚动【主营业务】" style="margin-left:70px;">② 横向滚动【主营业务】</a>
####  <a href="/thirdless/w-a/04首页开发.html#六、资讯中心【新闻中心】开发" style="margin-left:40px;">六、资讯中心【新闻中心】开发</a>
### [章节5.其它界面开发](/thirdless/w-a/05其它界面开发 '章节5.其它界面开发')
####  <a href="/thirdless/w-a/05其它界面开发.html#一、资讯中心【新闻中心】列表" style="margin-left:40px;">一、资讯中心【新闻中心】列表</a>
####  <a href="/thirdless/w-a/05其它界面开发.html#_1-导航栏部分" style="margin-left:70px;">① 导航栏部分</a>
####  <a href="/thirdless/w-a/05其它界面开发.html#_2-信息列表部分" style="margin-left:70px;">② 信息列表部分</a>
####  <a href="/thirdless/w-a/05其它界面开发.html#二、信息详情页" style="margin-left:40px;">二、信息详情页</a>
####  <a href="/thirdless/w-a/05其它界面开发.html#三、联系我们页面" style="margin-left:40px;">三、联系我们页面</a>
####  <a href="/thirdless/w-a/05其它界面开发.html#_1-联系方式展示及初步使用表单组件提交数据验证" style="margin-left:70px;">① 联系方式展示及初步使用表单组件提交数据验证</a>
####  <a href="/thirdless/w-a/05其它界面开发.html#_2-完成留言板界面和数据验证" style="margin-left:70px;">② 完成留言板界面和数据验证</a>
####  <a href="/thirdless/w-a/05其它界面开发.html#四、工程案例页面" style="margin-left:40px;">四、工程案例页面</a>
### [章节6.数据处理](/thirdless/w-a/06数据处理 '章节6.数据处理')
####  <a href="/thirdless/w-a/06数据处理.html#一、首页数据-index-vue页面" style="margin-left:40px;">一、首页数据 [index.vue页面]</a>
####  <a href="/thirdless/w-a/06数据处理.html#_1-swiper广告图" style="margin-left:70px;">① swiper广告图</a>
####  <a href="/thirdless/w-a/06数据处理.html#_2-首页消息滚动数据处理" style="margin-left:70px;">② 首页消息滚动数据处理</a>
####  <a href="/thirdless/w-a/06数据处理.html#_3-首页主要栏目数据处理" style="margin-left:70px;">③ 首页主要栏目数据处理</a>
####  <a href="/thirdless/w-a/06数据处理.html#_4-首页滚动列表、卡片列表、底部导航栏数据处理" style="margin-left:70px;">④ 首页滚动列表、卡片列表、底部导航栏数据处理</a>
####  <a href="/thirdless/w-a/06数据处理.html#_5-首页完整代码" style="margin-left:70px;">⑤ 首页完整代码</a>
####  <a href="/thirdless/w-a/06数据处理.html#二、信息列表数据-list-vue页面" style="margin-left:40px;">二、信息列表数据 [list.vue页面]</a>
####  <a href="/thirdless/w-a/06数据处理.html#三、卡片列表数据-piclist-vue页面-、联系我们-contact-vue-、详情页-detail-vue" style="margin-left:40px;">三、卡片列表数据 [piclist.vue页面]、联系我们 [contact.vue]、详情页 [detail.vue]</a>
####  <a href="/thirdless/w-a/06数据处理.html#_1-卡片列表数据-piclist-vue页面" style="margin-left:70px;">① 卡片列表数据 [piclist.vue页面]</a>
####  <a href="/thirdless/w-a/06数据处理.html#_2-联系我们-contact-vue" style="margin-left:70px;">② 联系我们 [contact.vue]</a>
####  <a href="/thirdless/w-a/06数据处理.html#_3-详情页-detail-vue" style="margin-left:70px;">③ 详情页 [detail.vue]</a>
### [章节7.后端api开发（选修课）](/thirdless/w-a/07后端api开发 '章节7.后端api开发（选修课）')