---
navbar: true
sidebar: auto
title: 章节4.Egg.js和Mysql数据库进阶进一步开发网站后台
---

> <b>前言</b> <br/><br/>
> 基于同学们在上一章（第三章）对响应式网站后台的学习，以及我们第二章egg.js基础的学习，从本章节开始，我们将继续对网站后台进行扩展开发。
> <br/><br/>
> 我们在上一章已经完成了网站后台的管理员登录、管理员板块、留言板板块的开发。那么作为普通的企业网站后台，还应该有发布新闻信息、发布产品信息、管理网站导航栏等等功能。由于接下来的这些栏目，各个栏目板块数据库表之间的关联关系，相比较于我们前面开发的管理员列表、留言板板块，会相对复杂一些，因此我们将它们放在第四章进行讲解。
> <br/><br/>
> 由于考虑到我们会在后面的课程：关于小程序、APP的开发中涉及到直播功能、即时通讯功能、商城功能、高德百度腾讯地图功能、视频功能、网盘功能等等，以直播功能为例，直播功能依然需要后台对直播功能中的：用户、礼物、直播间等等板块做后台开发，因此我们借本章开发后台其它管理板块，一起给大家讲解一下关于直播的后台功能 <br/><br/>`目的就是：让大家更深入的理解我们egg.js项目中的模型关联关系。`

## 一、用户管理板块(以直播功能中的用户表liveuser表为例)
> 由于一般企业网站不存在用户管理，因此我们这里以大家感兴趣的‘直播’功能为例，讲一下用户管理板块<br/>
> 具体查看：<a href="/secondless/w-c/直播功能中的用户表liveuser" target="_blank" title="点击查看课程文档">直播功能中的用户表liveuser</a> 

## 二、礼物管理(以直播功能中的礼物表livegift表为例)
> 具体查看：<a href="/secondless/w-c/直播功能中的礼物表livegift" target="_blank" title="点击查看课程文档">直播功能中的礼物表livegift</a> 

## 三、订单管理(以直播功能中的订单表liveorder表为例)
### 初步理解关联关系
> 前面给大家已经讲了管理员表、留言表、用户表、礼物表，这四张表有个共同特点：就是它们每张表都是独立的，不跟其他表产生关联关系。<br/>
> 那么不经有同学要问了：什么叫做关联关系？<br/>
> 学习过我们上一季度（第二季）：`章节7.Node.js基础`，`章节9.Vue.js基础`的同学并不陌生，特别是最后我们举了一个案例：`node.js+vue.js 渲染企业网站`，如何来处理不同数据间的关联关系。<br/>
> 回顾了一下我们之前讲的不同json文件数据间的关联关系之后，同学们很自然的想到，既然我们的mysql就是关系型数据库，那么它应该也可以处理表之前的关联关系吧。<br/>
> 答案是：对的。我们的mysql数据库也可以处理表之间的关联关系。<br/><br/>
> 为了方便大家理解，我们接下来将由浅入深，逐步理解表之间的关联关系。因此，我们用直播中的订单表为例，方便大家理解。因为我们每个同学都会网购，网购购买商品都会产生订单，因此理解起来会容易一些。<br/>
> 
> 具体查看：<a href="/secondless/w-c/直播功能中的订单表liveorder" target="_blank" title="点击查看课程文档">直播功能中的订单表liveorder</a> 

## 四、直播间管理(以直播功能中的直播间表live表为例)
### 多模型关联查询实践
> 我们在上节课开发后台订单列表功能中，大家已经初步感受了数据库表之间的关联关系，模型关联查询的功能。那么为了让大家深入理解模型关联查询，我们再讲解一个直播功能中的直播间功能，让大家更深入理解。
> <br/>
> 具体查看：<a href="/secondless/w-c/直播功能中的直播间表live" target="_blank" title="点击查看课程文档">直播功能中的直播间表live</a> 

## 五、mysql语句进一步理解模型关联关系（Mysql进阶）
> 我们在前面几节课分别完成了直播间订单管理、直播间管理中的观看记录、刷礼物记录、评论记录等功能，用到了模型关联关系 `belongsTo`(反向一对多) <br/>
> 关于模型关联关系，更多的模型关联具体查看：
> <a href="/secondless/w-c/egg.js重要知识详细文档.html#关联操作" target="_blank" title="点击查看课程文档">egg.js重要知识详细文档--关联操作</a> <br/>
> 涉及的关联关系有：
> 1. 一对一 hasOne (比如：一个用户对应一个用户资料)
> 2. 一对多 hasMany (比如：一个用户可以发布很多文章)
> 3. 反向一对多 belongsTo (比如：直播间观看记录关联用户模型，一个用户可以对应多个直播间观看记录，因为他可以进入多个直播间观看，用户对于观看记录就是一对多的关系，反过来观看记录属于用户belongsTo，就是反向一对多)
> 4. 多对多 belongsToMany (比如：一个用户可以关注很多用户，一个用户也可以被很多用户关注)
在这些模型关联中，反向一对多 `belongsTo` 用得最多，因此我们接下来以 模型关联中的 `belongsTo` 为例， 通过  `mysql语句` 来剖析这些关联关系，让大家对模型关联有个更深入的理解。
> 
> 具体查看：<a href="/secondless/w-c/mysql数据库.html" target="_blank" title="点击查看课程文档">mysql数据库基础-三、mysql子查询和连表查询</a> 

## 六、企业网站栏目管理、内容管理
> 有了我们上节课的通过sql语句剖析模型关联关系的讲解，那么完成我们企业网站后台管理中的栏目管理、内容管理就是一件非常轻松的事情了。
> <br/><br/>
> 如果要在后台管理（网站导航栏，栏目分类）的数据<br/>
> 具体查看：<a href="/secondless/w-c/企业网站后台栏目管理" target="_blank" title="点击查看课程文档">企业网站后台栏目管理</a> 
> <br/><br/>
> 如果要在后台管理网站的新闻、产品、内容等等信息，我们统称为：内容管理<br/>
> 具体查看：<a href="/secondless/w-c/企业网站后台内容管理" target="_blank" title="点击查看课程文档">企业网站后台内容管理</a> 

## 七、网站配置管理
> 网站配置管理我们可以跟前面一样创建网站配置表，然后进行新增修改删除等，当然，由于网站配置比较简单，因此我们可以将配置放在json文件里面，进行操作即可。<br/>
以下是一个配置示例样本，大家可根据自己的想法设计网站配置的json文件：<br/>
```js
{
    "data": [
        {
            "id": 1,
            "corporate_name": "睿晨电网建设工程有限公司",
            "corporate_short": "睿晨电网",
            "address": "北京CBD帝国大厦999层-1001号",
            "tel": "010-8888-8888",
            "mobile": "13858588888",
            "serviceUser": "张经理",
            "QQ": "1582758589",
            "weixin": "company_51yrc",
            "weixinImg": "",
            "email": "51yrc@126.com",
            "pagetitle": "睿晨电网建设工程有限公司",
            "description": "睿晨电网建设工程有限公司成立由2021年，是一家集...",
            "keywords": "睿晨电网,电网建设,睿晨电网建设工程有限公司",
            "domain": "www.xxxx.com",
            "copyright": "Copyright © 2024 睿晨电网建设工程有限公司 版权所有",
            "icpNumber": "ICP 备案号 123456",
            "cnzz": ""
        }
    ],
    "total": 1,
    "currentId": 1
}
```
> 控制器 `app/controller/admin/config.js`
```js
'use strict';

const { log } = require('node:console');
const fs = require('node:fs');
const path = require('node:path');
//配置写入json文件
let paths = {
    dir: './data',
    file: './data/siteConfig.json'
    //   dir:'./Appdata',
    //   file:'./Appdata/data.json'
};

const Controller = require('egg').Controller;

class ConfigController extends Controller {
    // 配置列表
    async index() {
        //读json文件
        const { ctx, app } = this;
        let data = await this.getsiteConfigJson();
        // console.log(typeof data);return;
        if (typeof data == 'object') {
            // console.log('配置数据', JSON.stringify(data.data));
            //渲染公共模版
            await ctx.renderTemplate({
                title: '配置管理',//现在网页title,面包屑导航title,页面标题
                data: data.data,
                tempType: 'table', //模板类型：table表格模板 ，form表单模板
                table: {
                    //表格上方按钮,没有不要填buttons
                    buttons: [
                        {
                            url: '/admin/config/create',//新增路径
                            desc: '创建配置',//新增 //按钮名称
                            // icon: 'fa fa-plus fa-lg',//按钮图标
                        }
                    ],
                    //表头
                    columns: [
                        {
                            title: '配置信息',
                            // key: 'corporate_name',
                            class: 'text-left',//可选
                            // width: '30%',
                            render(item) {
                                let weixinImg = item.weixinImg;
                                if (weixinImg.endsWith('.jpg') || weixinImg.endsWith('.jpeg') ||
                                    weixinImg.endsWith('.png') || weixinImg.endsWith('.gif')) {
                                    // <li>微信二维码：${item.weixinImg}</li>
                                    weixinImg = `<li>微信二维码：<img src="${weixinImg}" style="width: 100px; height: 100px;" /></li>`;
                                }
                                return `
                                <h5>公司基本信息</h5>
                                <ul>
                                    <li>公司名称：${item.corporate_name}</li>
                                    <li>名称简写：${item.corporate_short}</li>
                                    <li>地址：${item.address}</li>
                                    <li>免费咨询电话：${item.tel}</li>
                                    <li>手机号：${item.mobile}</li>
                                    <li>联系人：${item.serviceUser}</li>
                                    <li>企业QQ：${item.QQ}</li>
                                    <li>联系微信号：${item.weixin}</li>
                                    ${weixinImg}
                                    <li>联系邮箱：${item.email}</li>
                                </ul>
                                <h5>seo信息</h5>
                                <ul>
                                    <li>网站主页标题：${item.pagetitle}</li>
                                    <li>网页描述：${item.description}</li>
                                    <li>搜素关键字：${item.keywords}</li>
                                </ul>
                                <h5>其它信息</h5>
                                <ul>
                                    <li>官方网址：${item.domain}</li>
                                    <li>版权信息：${item.copyright}</li>
                                    <li>ICP 备案：${item.icpNumber}</li>
                                </ul>
                            `;
                            }
                        },
                        {
                            title: '操作',
                            class: 'text-right',//可选
                            width: '10%',
                            action: {
                                //修改
                                edit: function (id) {
                                    return `/admin/config/edit/${id}`;
                                },
                                //删除
                                delete: function (id) {
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
            //   encoding: 'utf-8'
            // });
            let data = fs.readFileSync(paths.file, {
                encoding: 'utf-8'
            });
            // console.log(JSON.parse(data).data);
            return JSON.parse(data)
        }
    }

    // 修改配置
    async edit() {
        const { ctx, app } = this;
        const id = ctx.params.id;
        let data = await this.getsiteConfigJson();
        data = data.data.find(item => item.id == id);
        if (!data) {
            return ctx.apiFail('该内容不存在');
        }
        console.log(data);
        await ctx.renderTemplate({
            id,
            title: '修改配置',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //修改配置提交地址
                action: '/admin/config/update/' + id,
                //  字段
                fields: [
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


    // 修改配置写入json
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

        });

        // 参数
        const id = ctx.params.id;
        let data = await this.getsiteConfigJson();
        let index = data.data.findIndex(item => item.id == id);
        if (index == -1) {
            return ctx.apiFail('该内容不存在');
        }

        let params = this.ctx.request.body;
        params.id = id;
        console.log('修改的数据', params);
        console.log('修改json文件的数组元素索引', index);
        console.log('原json文件数据', data);
        data.data[index] = params;
        console.log('写入json文件的最终所有数据', data);
        fs.writeFile(paths.file, JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log('写入成功')
        });
    }

    // 创建配置界面
    async create() {
        const { ctx, app } = this;
        //渲染公共模版
        await ctx.renderTemplate({
            title: '创建配置',//现在网页title,面包屑导航title,页面标题
            tempType: 'form', //模板类型：table表格模板 ，form表单模板
            form: {
                //提交地址
                action: "/admin/config/save",
                //  字段
                fields: [
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

    // 创建配置提交数据
    async save() {

        //参数验证
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

        });

        //写入数据
        let data = this.ctx.request.body;
        await this.addconfig(data, paths);
    }

    //写入json文件前的处理
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

    //写入json
    async writeconfig(path, data) {
        fs.writeFile(path, JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log('写入成功')
        });
    }

    // 删除配置
    async delete() {
        //读json文件
        const { ctx, app } = this;
        let data = await this.getsiteConfigJson();
        console.log('配置数据', JSON.stringify(data));
        const id = ctx.params.id;
        let index = data.data.findIndex(item => item.id == id);
        if (index == -1) {
            return ctx.apiFail('该内容不存在');
        }
        console.log(index);
        data.data.splice(index, 1);
        data.total = data.data.length;
        console.log('删除之后即将重新写入json的数据', data);
        await this.writeconfig(paths.file, data);
        //提示
        ctx.toast('删除配置成功', 'success');
        //跳转
        ctx.redirect('/admin/config/index');
    }

}

module.exports = ConfigController;

```

> 路由
```js
// 配置列表
router.get('/admin/config/index', controller.admin.config.index);
//修改配置
router.get('/admin/config/edit/:id', controller.admin.config.edit);
//修改配置写入json
router.post('/admin/config/update/:id', controller.admin.config.update);
//创建配置
router.get('/admin/config/create', controller.admin.config.create);
// 创建配置提交数据
router.post('/admin/config/save', controller.admin.config.save);
//删除配置
router.get('/admin/config/delete/:id', controller.admin.config.delete);
```

## 八、后台初始化管理员登录逻辑
> 后台上线初期，数据库和json文件都是空的，没有任何数据（除非将开发环境的数据库和json文件拷贝到线上服务器），那么就意味着管理员表也是空的，无法进行登录，因此一般情况下，后台上线初期，需要手动添加一个超级管理员账号。<br/><br/>
> 给 `manager`表新增两个字段：status（状态：1：启用，0：禁用）和 super（是否超级管理员 1是，0：否）<br/><br/>
> 迁移文件 `database/migrations/-init-manager.js`
> ```js
> status: {
>     type: INTEGER(1),
>     allowNull: true,
>     defaultValue: 1,
>     comment: '状态：1：启用，0：禁用'
> },
> super: {
>     type: INTEGER(1),
>     allowNull: true,
>     defaultValue: 1,
>     comment: '是否超级管理员 1是，0：否'
> },
> ```
> 模型文件 `app/model/manager.js` 同上，加上这两个字段

注：迁移文件的修改不会影响到本项目（会在以后的项目中才会在`manager`表生效这两个字段），如果本项目要生效，需直接修改数据库manager表字段，新增这2个字段即可<br/><br/>
（或者数据库重新初始化）
> ```js
> // 升级数据库-创建数据表
> npx sequelize db:migrate
> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
> npx sequelize db:migrate:undo
> // 可以通过 `db:migrate:undo:all` 回退到初始状态
> npx sequelize db:migrate:undo:all
> ```

#### 后台初始化管理员登录逻辑
> 这个时候需要考虑，当项目刚初始化的时候，由于数据库的所有表都没有内容，当然也包括管理员表没有管理员，此时可在管理员登录界面调整一下，初始化创建一个管理员，并且该管理员角色是：超级管理员<br/>

1. 控制器 `app/controller/admin/home.js`
```js
//管理员登录页面---后台登录页面
async login() {
    const { ctx,app } = this;
    let toast = this.ctx.cookies.get('toast',{
        encrypt:true
    });
    toast = toast ? JSON.parse(toast) : null;

    // 新增初始化逻辑，当没有管理员的时候新增一个超级管理员
    let manager = await app.model.Manager.findAndCountAll();
    let pageobj = {};
    if(manager.count == 0){
        // console.log('应该创建首个超级管理员');
        pageobj.type = 'createSuperManager';
        pageobj.title = '创建后台首个超级管理员账户';
        pageobj.h1 = '创建超级管理员';
        pageobj.p = '创建后台首个超级管理员账户';
    }else{
        // console.log('正常登录');
        pageobj.type = 'login';
        pageobj.title = '登录';
        pageobj.h1 = '登 录';
        pageobj.p = '后台管理中心欢迎您';
    }

    await this.ctx.render('admin/home/login.html',{
        toast,
        pageobj
    });
}

// 创建超级管理员账号
async createSuperManager(){
    const { ctx,app } = this;
    //超级管理员是数据库没有管理员的时候才创建的
    let manager = await app.model.Manager.findAndCountAll();
    if(manager.count != 0){
        return ctx.apiFail('非法操作，系统拒绝您的请求');
    }
    //1.参数验证
    ctx.validate({
        username: {
        type: 'string',  //参数类型
        required: true, //是否必须
        // defValue: '', 
        desc: '管理员账号' //字段含义
        },
        password: {
        type: 'string',
        required: true,
        // defValue: '', 
        desc: '管理员密码'
        },
    });
    // 拿参数
    const { username, password } = ctx.request.body;

    await app.model.Manager.create({
        username,
        password,
        status:1,
        super:'1',//超级管理员
    });

    ctx.apiSuccess('ok');

}
```
2. 路由 `app/router/admin/admin.js`
```js
// 创建超级管理员
router.post('/admin/createSuperManager', controller.admin.home.createSuperManager);
```
3. 中间件加上创建超级管理员免登录
```js
// 对中间件adminAuth进一步配置
config.adminAuth = {
    ignore: [
        ...
        "/admin/createSuperManager",
        ...
    ],
};
```
4. 模版 `app/view/admin/home/login.html`
```js
<div class="login-right">
    <div class="login-right-wrap">
        <h1>{{pageobj.h1}}</h1>
        <p class="account-subtitle">{{pageobj.p}}</p>

        <!-- Form -->
        <form>
            <div class="form-group">
                <input class="form-control" type="text"
                    placeholder="输入管理员账号..."
                    v-model="form.username">
            </div>
            <div class="form-group">
                <input class="form-control" type="password"
                    placeholder="输入管理员密码..."
                    v-model="form.password">
            </div>
            <div class="form-group">
                <button
                    class="btn btn-primary btn-block"
                    type="submit"
                    @click.stop.prevent="submit">{{ '登 录'  if pageobj.type == 'login' else '创建超级管理员' }}</button>
            </div>
        </form>

    </div>
</div>
...
methods: {
    submit(){
        //console.log('提交登录',this.form);
        const type = "{{pageobj.type}}";
        // console.log('类型',type);
        const url = type == 'createSuperManager' ? 
        '/admin/createSuperManager?_csrf={{ctx.csrf|safe}}' : 
        "/admin/loginevent?_csrf={{ctx.csrf|safe}}";
        // console.log('提交地址',url);
        // return;
        $.ajax({
            type: 'post', 
            url:url,
            contentType:'application/json;charset=UTF-8;',
            data:JSON.stringify(this.form),
            success: function (response, stutas, xhr) {
                console.log(response)
                const msg = type == 'createSuperManager' ? "创建超级管理员成功" : "登录成功";
                Vueapp.$refs.toast.show({
                    msg,
                    type:'success',
                    delay:1000,
                    success:function(){
                        // 跳转到某个页面
                        const href = type == 'createSuperManager' ? '/admin/login' : "/admin"
                        window.location.href = href;
                    }
                });
            },
            error:function(e){
                // console.log(e)
                Vueapp.$refs.toast.show({
                    msg:e.responseJSON.data,
                    type:'danger',
                    delay:3000
                });
            }
        });
    }
}
```




## 九、简单权限管理
### 1. 管理员栏目：超级管理员可以查看所有管理员，普通管理员只能看自己
`控制器 app/controller/admin/manager.js`
```js
//创建管理员列表页面
  async index() {
    ...

    //超级管理员的特殊权限
    console.log(ctx.session.auth);
    let buttons = null;
    let columns = [];
    if(ctx.session.auth.super == 1){
      buttons = {
        buttons: [
          {
            url: '/admin/manager/create',//新增路径
            desc: '新增管理员',//新增 //按钮名称
            // icon: 'fa fa-plus fa-lg',//按钮图标
          }
        ],
      }
      //禁用功能
      columns = [
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
                    { value: 0, name: '禁用' },
                ];
                let str = `<div class="btn-group btn-group-${item.id}">`;
                for (let i = 0; i < arr.length; i++) {
                    str += `<button type="button" class="btn btn-light" data="${item.status}"
                    value="${arr[i].value}"
                    @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'manager','Manager')">${arr[i].name}</button>`;
                }
                str += `</div>`;
                return str;
            }
        }
      ];
    }else{
      data = await ctx.page('Manager',{
        id: ctx.session.auth.id
      });
    }

    //渲染公共模版
    await ctx.renderTemplate({
      title: '管理员列表',//现在网页title,面包屑导航title,页面标题
      data,
      tempType: 'table', //模板类型：table表格模板 ，form表单模板
      table: {
        //表格上方按钮,没有不要填buttons
        // buttons: [
        //   {
        //     url: '/admin/manager/create',//新增路径
        //     desc: '新增管理员',//新增 //按钮名称
        //     // icon: 'fa fa-plus fa-lg',//按钮图标
        //   }
        // ],
        ...buttons,
        //表头
        columns: [
          ...
          ...columns,
          ...
          },
        ],
      },
    });
  }


//创建管理员提交数据
async save() {

    //超级管理员的特殊权限
    console.log(this.ctx.session.auth);
    if(this.ctx.session.auth.super != 1){
        return this.ctx.apiFail('您无权操作此项功能');
    }

...

}


//删除管理员功能
async delete() {
    const { ctx, app } = this;
    const id = ctx.params.id;

    //超级管理员的特殊权限，普通管理员只能删除自己
    console.log(this.ctx.session.auth);
    if(this.ctx.session.auth.super == 1 || (this.ctx.session.auth.id == id && this.ctx.session.auth.super == 0)){
        await app.model.Manager.destroy({
        where: {
            id
        }
        });
        //提示
        ctx.toast('管理员删除成功', 'success');
        //跳转
        ctx.redirect('/admin/manager/index');
        
    }else{
        return this.ctx.apiFail('您无权操作此项功能');
    }

}

//修改管理员数据功能
async update() {

if(this.ctx.session.auth.super == 0 && this.ctx.session.auth.id != this.ctx.params.id){
    return this.ctx.apiFail('您无权操作此项功能');
}

...
}



```



### 2. 权限分配
`data/root.json` <br/>
图标查找：<https://fontawesome.dashgame.com/>
```json
//初步
[
    { "name": "主面板", "icon": "fe fe-home", "url": "/admin" },
    { "name": "管理员", "icon": "fe fe-user-plus", "url": "/admin/manager/index" },
    { "name": "留言板", "icon": "fe fe-document", "url": "/admin/message/index" },
    { "name": "直播用户", "icon": "fa fa-user-o", "url": "/admin/liveuser/index" },
    { "name": "直播礼物管理", "icon": "fa fa-user-o", "url": "/admin/livegift/index" },
    { "name": "直播订单管理", "icon": "fa fa-user-o", "url": "/admin/liveorder/index" },
    { "name": "直播间管理", "icon": "fa fa-user-o", "url": "/admin/live-/index" },
    { "name": "分类管理", "icon": "fa fa-user-o", "url": "/admin/category/index" },
    { "name": "新闻内容管理", "icon": "fa fa-user-o", "url": "/admin/news/index" },
    { "name": "配置管理", "icon": "fa fa-user-o", "url": "/admin/config/index" }
]

//转成树形结构
[
    {"id":1,"pid":0, "name": "网站", "icon": "fa fa-chrome", "url": ""},
    {"id":2,"pid":1, "name": "主面板", "icon": "fa fa-pie-chart", "url": "/admin" },
    {"id":3,"pid":1,  "name": "管理员", "icon": "fe fe-user-plus", "url": "/admin/manager/index" },
    {"id":4,"pid":1,  "name": "留言板", "icon": "fe fe-document", "url": "/admin/message/index" },
    {"id":5,"pid":1, "name": "分类管理", "icon": "fa fa-list", "url": "/admin/category/index" },
    {"id":6,"pid":1, "name": "新闻内容管理", "icon": "fa fa-file-text-o", "url": "/admin/news/index" },
    {"id":7,"pid":1, "name": "配置管理", "icon": "fa fa-wrench", "url": "/admin/config/index" },
    {"id":8,"pid":0, "name": "直播","icon": "fa fa-video-camera", "url": ""},
    {"id":9,"pid":8, "name": "直播用户", "icon": "fa fa-venus-mars", "url": "/admin/liveuser/index" },
    {"id":10,"pid":8, "name": "直播礼物管理", "icon": "fa fa-gift", "url": "/admin/livegift/index" },
    {"id":11,"pid":8, "name": "直播订单管理", "icon": "fa fa-credit-card", "url": "/admin/liveorder/index" },
    {"id":12,"pid":8, "name": "直播间管理", "icon": "fa fa-tv", "url": "/admin/live-/index" }
]
```
中间件菜单 `app/middleware/admin_auth.js`
```js
module.exports = (option, app) => {
    return async function adminMenu(ctx, next) {
        // let menus = [
        //     { name: '主面板', icon: 'fe fe-home', url: '/admin' },
        //     { name: '管理员', icon: 'fe fe-user-plus', url: '/admin/manager/index' },
        //     { name: '留言板', icon: 'fe fe-document', url: '/admin/message/index' },
        //     { name: '直播用户', icon: 'fa fa-user-o', url: '/admin/liveuser/index' },
        //     { name: '直播礼物管理', icon: 'fa fa-user-o', url: '/admin/livegift/index' },
        //     { name: '直播订单管理', icon: 'fa fa-user-o', url: '/admin/liveorder/index' },
        //     { name: '直播间管理', icon: 'fa fa-user-o', url: '/admin/live-/index' },
        //     { name: '分类管理', icon: 'fa fa-user-o', url: '/admin/category/index' },
        //     { name: '新闻内容管理', icon: 'fa fa-user-o', url: '/admin/news/index' },
        //     { name: '配置管理', icon: 'fa fa-user-o', url: '/admin/config/index' },
        // ];
        let menus = [
            {"id":1,"pid":0, "name": "网站", "icon": "fa fa-chrome", "url": ""},
            {"id":2,"pid":1, "name": "主面板", "icon": "fa fa-pie-chart", "url": "/admin" },
            {"id":3,"pid":1,  "name": "管理员", "icon": "fe fe-user-plus", "url": "/admin/manager/index" },
            {"id":4,"pid":1,  "name": "留言板", "icon": "fe fe-document", "url": "/admin/message/index" },
            {"id":5,"pid":1, "name": "分类管理", "icon": "fa fa-list", "url": "/admin/category/index" },
            {"id":6,"pid":1, "name": "新闻内容管理", "icon": "fa fa-file-text-o", "url": "/admin/news/index" },
            {"id":7,"pid":1, "name": "配置管理", "icon": "fa fa-wrench", "url": "/admin/config/index" },
            {"id":8,"pid":0, "name": "直播","icon": "fa fa-video-camera", "url": ""},
            {"id":9,"pid":8, "name": "直播用户", "icon": "fa fa-venus-mars", "url": "/admin/liveuser/index" },
            {"id":10,"pid":8, "name": "直播礼物管理", "icon": "fa fa-gift", "url": "/admin/livegift/index" },
            {"id":11,"pid":8, "name": "直播订单管理", "icon": "fa fa-credit-card", "url": "/admin/liveorder/index" },
            {"id":12,"pid":8, "name": "直播间管理", "icon": "fa fa-tv", "url": "/admin/live-/index" }
        ];
        // 和我们分页模版类似，通过ctx.locals对象挂载代码
        ctx.locals.menus = menus.map(item => {
            //   console.log('当前请求地址', ctx.request.url)
            //   console.log('遍历项地址', item.url)
            let baseURL = item.url.replace('/index', '');
            //   console.log('处理之后遍历项地址', baseURL);
            //   console.log('判断',ctx.request.url.startsWith(baseURL));
            if ((ctx.request.url == '/admin' && item.url == '/admin') ||
                (ctx.request.url != '/admin' && item.url != '/admin' && ctx.request.url.startsWith(baseURL) && item.url)
            ) {
                item.active = 'active';
            }

            if(item.url){
                item.style = 'text-indent:2em';
            }else{
                item.style = 'cursor:default';
            }

            return item;
        });

        //    console.log(ctx.locals.menus);

        await next();
    }
}
```
菜单模版 `app/view/admin/layout/_slider.html`
```html
{% for item in ctx.locals.menus %}
<li class="{{item.active}}" >
    <a href="{{item.url}}" style="{{item.style}}"><i class="{{item.icon}}" style="font-size: 18px;"></i> <span>{{item.name}}</span></a>
</li>
{% endfor %}
```

### 3. 网站后台管理员简单权限分配功能实现 
> （由于内容较多，单独放在新页面讲解） 具体查看：<a href="/secondless/w-c/网站后台管理员简单权限分配功能实现" target="_blank" title="点击查看课程文档">网站后台管理员简单权限分配功能实现</a> 









































































<br/><br/><br/><br/><br/>

## 【第二学期第3季课程】其它章节
### [章节1.课程介绍](/secondless/w-c '章节1.课程介绍')
<!-- <LessList  /> -->
### [章节2.Egg.js基础](/secondless/w-c/Egg.js '章节2.Egg.js基础')
####  <a href="/secondless/w-c/Egg.js.html#一、关于egg-js" style="margin-left:40px;">一、关于Egg.js</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-安装egg-js项目" style="margin-left:70px;">① 安装Egg.js项目</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-写一个api接口进行测试" style="margin-left:70px;">② 写一个api接口进行测试</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-说明一下-关于调试课件代码的问题" style="margin-left:70px;">③ 说明一下，关于调试课件代码的问题</a>
##### <a href="/secondless/w-c/Egg.js.html#_4-自定义创建一个控制器" style="margin-left:70px;">④ 自定义创建一个控制器</a>
####  <a href="/secondless/w-c/Egg.js.html#二、eggjs中的get请求post请求处理" style="margin-left:40px;">二、eggjs中的get请求post请求处理</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-get方式路由传参-带-获取参数-ctx-query-参数名-不带-获取参数-ctx-params-参数名" style="margin-left:70px;">① get方式路由传参：带?获取参数 ctx.query.参数名，不带?获取参数 ctx.params.参数名</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-设置响应状态码-ctx-status" style="margin-left:70px;">② 设置响应状态码： ctx.status</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-post请求参数处理" style="margin-left:70px;">③ post请求参数处理</a>
##### <a href="/secondless/w-c/Egg.js.html#一、安装get-post等请求的调试工具-postman" style="margin-left:70px;">一、安装get/post等请求的调试工具：postman</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-下载postman" style="margin-left:100px;">1. 下载postman</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-安装postman" style="margin-left:100px;">2. 安装postman</a>
##### <a href="/secondless/w-c/Egg.js.html#二、post请求获取参数-ctx-request-body" style="margin-left:70px;">二、post请求获取参数：ctx.request.body</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-关闭csrf功能开启跨域请求" style="margin-left:100px;">1. 关闭csrf功能开启跨域请求</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-eggjs中post请求-ctx-request-body" style="margin-left:100px;">2. eggjs中post请求：ctx.request.body</a>
####  <a href="/secondless/w-c/eggjs+postman测试工具将留言写入json文件.html" style="margin-left:40px;">三、案例：eggjs + postman测试工具完成留言数据写入json文件</a>
####  <a href="/secondless/w-c/mysql数据库.html" style="margin-left:40px;">四、mysql（MySQL）数据库基础</a>
####  <a href="/secondless/w-c/Egg.js.html#五、eggjs项目中sequelize模型创建mysql数据库" style="margin-left:40px;">五、eggjs项目中sequelize模型创建mysql数据库</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-安装egg-sequelize-插件" style="margin-left:70px;">1.安装egg-sequelize 插件</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-在config-plugin-js中引入-egg-sequelize-插件" style="margin-left:70px;">2. 在config/plugin.js中引入 egg-sequelize 插件</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-在config-config-default-js中配置数据库连接" style="margin-left:70px;">3. 在config/config.default.js中配置数据库连接</a>
##### <a href="/secondless/w-c/Egg.js.html#_4-安装-sequelize-cli插件" style="margin-left:70px;">4. 安装 sequelize-cli插件</a>
##### <a href="/secondless/w-c/Egg.js.html#_5-数据库-migrations-迁移文件相关的内容都放在database目录下" style="margin-left:70px;">5. 数据库 Migrations 迁移文件相关的内容都放在database目录下</a>
##### <a href="/secondless/w-c/Egg.js.html#_6-初始化-migrations-配置文件和目录" style="margin-left:70px;">6. 初始化 Migrations 配置文件和目录</a>
##### <a href="/secondless/w-c/Egg.js.html#_7-在生成的database-config-json-修改一下配置内容" style="margin-left:70px;">7. 在生成的database/config.json 修改一下配置内容</a>
##### <a href="/secondless/w-c/Egg.js.html#_8-创建数据库" style="margin-left:70px;">8. 创建数据库</a>
##### <a href="/secondless/w-c/Egg.js.html#_9-创建数据库迁移文件" style="margin-left:70px;">9. 创建数据库迁移文件</a>
##### <a href="/secondless/w-c/Egg.js.html#_10-执行-migrate-进行数据库变更创建表" style="margin-left:70px;">10. 执行 migrate 进行数据库变更创建表</a>
####  <a href="/secondless/w-c/Egg.js.html#六、egg-js项目中sequelize模型新增数据到数据库" style="margin-left:40px;">六、egg.js项目中sequelize模型新增数据到数据库</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-创建模型文件" style="margin-left:70px;">1. 创建模型文件</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-编写模型文件" style="margin-left:70px;">2. 编写模型文件</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-插入一条数据到数据库-create方法" style="margin-left:70px;">3. 插入一条数据到数据库：create方法</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-1-定义路由" style="margin-left:100px;">3.1 定义路由</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-2-定义控制器" style="margin-left:100px;">3.2 定义控制器</a>
##### <a href="/secondless/w-c/Egg.js.html#_4-批量插入数据到数据库-bulkcreate方法" style="margin-left:70px;">4. 批量插入数据到数据库：bulkCreate方法</a>
##### <a href="/secondless/w-c/Egg.js.html#_5-修改器set-方法-数据插入到数据库前可自动修改成指定要求的数据" style="margin-left:70px;">5. 修改器set()方法：数据插入到数据库前可自动修改成指定要求的数据</a>
####  <a href="/secondless/w-c/Egg.js.html#七、egg-js项目查询数据" style="margin-left:40px;">七、egg.js项目查询数据</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-查询数据库中的单个数据-主键查询方法-findbypk-主键字段-、如果需要多个条件-可以使用findone方法" style="margin-left:70px;">1. 查询数据库中的单个数据：主键查询方法：findByPk(主键字段)、如果需要多个条件，可以使用findOne方法</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-查询数据库中的多个数据-查询多个findall-查询多个并统计条数findandcountall" style="margin-left:70px;">2. 查询数据库中的多个数据：查询多个findAll()，查询多个并统计条数findAndCountAll()</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-获取器get-方法-查询数据后可自动修改成指定要求的数据" style="margin-left:70px;">3. 获取器get()方法：查询数据后可自动修改成指定要求的数据</a>
####  <a href="/secondless/w-c/Egg.js.html#八、egg-js项目sequelize模型where操作符" style="margin-left:40px;">八、egg.js项目sequelize模型where操作符</a>
####  <a href="/secondless/w-c/Egg.js.html#示例" style="margin-left:70px;">示例</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-where操作符" style="margin-left:100px;">1. where操作符</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-where操作符范围选项" style="margin-left:100px;">2. where操作符范围选项</a>
####  <a href="/secondless/w-c/Egg.js.html#九、egg-js项目sequelize模型查询结果指定字段、排序、分页" style="margin-left:40px;">九、egg.js项目sequelize模型查询结果指定字段、排序、分页</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-attributes属性指定返回的字段-exclude属性指定排除的字段" style="margin-left:70px;">1. attributes属性指定返回的字段，exclude属性指定排除的字段</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-排序-order" style="margin-left:70px;">2. 排序：order</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-分页-limit指定每页返回多少条数据、offset指定偏移量" style="margin-left:70px;">3. 分页：limit指定每页返回多少条数据、offset指定偏移量</a>
##### <a href="/secondless/w-c/Egg.js.html#示例-2" style="margin-left:70px;">示例</a>
####  <a href="/secondless/w-c/Egg.js.html#十、egg-js项目sequelize模型更新数据" style="margin-left:40px;">十、egg.js项目sequelize模型更新数据</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-更新数据-save方法-指定修改字段fields属性" style="margin-left:70px;">1. 更新数据：save方法，指定修改字段fields属性</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-如果觉得save方法更新字段非常麻烦-可以使用update方法批量修改字段-第二个参数可指定修改字段" style="margin-left:70px;">2. 如果觉得save方法更新字段非常麻烦，可以使用update方法批量修改字段，第二个参数可指定修改字段</a>
####  <a href="/secondless/w-c/Egg.js.html#十一、egg-js项目sequelize模删除、批量删除数据-destroy方法" style="margin-left:40px;">十一、egg.js项目sequelize模删除、批量删除数据：destroy方法</a>
####  <a href="/secondless/w-c/Egg.js.html#十二、错误和异常统一处理" style="margin-left:40px;">十二、错误和异常统一处理</a>
####  <a href="/secondless/w-c/Egg.js.html#十三、中间件配置" style="margin-left:40px;">十三、中间件配置</a>
####  <a href="/secondless/w-c/Egg.js.html#十四、参数验证" style="margin-left:40px;">十四、参数验证</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-安装插件" style="margin-left:70px;">1. 安装插件</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-配置插件-config-plugin-js" style="margin-left:70px;">2. 配置插件 config/plugin.js</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-配置-config-config-default-js" style="margin-left:70px;">3. 配置 config/config.default.js</a>
##### <a href="/secondless/w-c/Egg.js.html#_4-控制器举例" style="margin-left:70px;">4. 控制器举例</a>
##### <a href="/secondless/w-c/Egg.js.html#_5-参数验证的错误提示在中间件中设置一下" style="margin-left:70px;">5. 参数验证的错误提示在中间件中设置一下</a>
##### <a href="/secondless/w-c/Egg.js.html#_6-valparams-api-说明" style="margin-left:70px;">6.ValParams API 说明</a>
####  <a href="/secondless/w-c/Egg.js.html#十五、路由分组" style="margin-left:40px;">十五、路由分组</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-新建-app-router目录-在该目录下新建对应控制器名文件" style="margin-left:70px;">1. 新建 app/router目录，在该目录下新建对应控制器名文件</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-在app-router-message-js中写路由" style="margin-left:70px;">2. 在app/router/message.js中写路由</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-在app-router-js中按控制器指定分组" style="margin-left:70px;">3.在app/router.js中按控制器指定分组</a>
####  <a href="/secondless/w-c/Egg.js.html#十六、模版引擎" style="margin-left:40px;">十六、模版引擎</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-安装模版渲染插件" style="margin-left:70px;">1. 安装模版渲染插件</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-在config-plugin-js中配置插件" style="margin-left:70px;">2. 在config/plugin.js中配置插件</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-在config-config-default-js中配置模版引擎" style="margin-left:70px;">3. 在config/config.default.js中配置模版引擎</a>
##### <a href="/secondless/w-c/Egg.js.html#_4-vscode安装一下nunjucks模版引擎扩展-方便代码提示" style="margin-left:70px;">4. vscode安装一下nunjucks模版引擎扩展，方便代码提示</a>
##### <a href="/secondless/w-c/Egg.js.html#_5-新建-app-view目录-以后所有模版放这个目录里面" style="margin-left:70px;">5. 新建 app/view目录，以后所有模版放这个目录里面</a>
##### <a href="/secondless/w-c/Egg.js.html#_6-控制器-app-controller-home-js-写一个方法" style="margin-left:70px;">6. 控制器 app/controller/home.js 写一个方法</a>
##### <a href="/secondless/w-c/Egg.js.html#_7-重启项目-访问路由即可看到网页内容" style="margin-left:70px;">7. 重启项目，访问路由即可看到网页内容</a>
####  <a href="/secondless/w-c/Egg.js.html#egg-js基础课程总结" style="margin-left:40px;">egg.js基础课程总结</a>
### [章节3.响应式网页布局](/secondless/w-c/响应式网页布局 '章节3.响应式网页布局')
####  <a href="/secondless/w-c/响应式网页布局.html#_1-响应式网页布局是什么" style="margin-left:40px;">一、响应式网页布局是什么</a>
####  <a href="/secondless/w-c/响应式网页布局.html#_2-响应式网页布局的实现方法" style="margin-left:40px;">二、响应式网页布局的实现方法</a>
####  <a href="/secondless/w-c/响应式网页布局.html#_3-简单的响应式页面案例" style="margin-left:40px;">三、简单的响应式页面案例</a>
####  <a href="/secondless/w-c/响应式网页布局.html#_4-bootstrap框架" style="margin-left:40px;">四、Bootstrap框架</a>
####  <a href="/secondless/w-c/响应式网页布局.html#_5-响应式后台管理系统-egg-js-bootstrap" style="margin-left:40px;">五、响应式后台管理系统（egg.js + Bootstrap）</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html" style="margin-left:70px;">① 搭建界面引入模版html文件</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html#二、创建管理员-页面、创建数据库表及提交数据" style="margin-left:70px;">② 创建管理员（页面、创建数据库表及提交数据）</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html#三、管理员列表" style="margin-left:70px;">③ 管理员列表</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html#四、管理员列表分页功能" style="margin-left:70px;">④ 管理员列表分页功能</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html#五、公共模板开发" style="margin-left:70px;">⑤ 公共模板开发</a>
##### <a href="/secondless/w-c/响应式后台管理员登录.html" style="margin-left:70px;">⑥ 后台管理员登录</a>
##### <a href="/secondless/w-c/响应式后台用户留言板管理.html" style="margin-left:70px;">⑦ 后台用户留言板管理板块</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html#八、优化公共模版表格能够显示头像" style="margin-left:70px;">⑧ 优化公共模版表格能够显示头像</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html#九、后台左侧菜单栏" style="margin-left:70px;">⑨ 后台左侧菜单栏</a>
##### <a href="/secondless/w-c/上传文件.html" style="margin-left:70px;">⑩ 上传文件</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html#十一、上传或修改管理员头像" style="margin-left:70px;">⑪ 上传或修改管理员头像</a>
### [章节4.Egg.js和Mysql数据库进阶进一步开发网站后台](/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台 '章节4.Egg.js和Mysql数据库进阶进一步开发网站后台')
####  <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#一、用户管理板块-以直播功能中的用户表liveuser表为例" style="margin-left:40px;">一、用户管理板块(以直播功能中的用户表liveuser表为例)</a>
##### <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#一、用户管理板块-以直播功能中的用户表liveuser表为例" style="margin-left:70px;">① 用户管理板块说明</a>
##### <a href="/secondless/w-c/直播功能中的用户表liveuser.html" style="margin-left:70px;" target="_blank">② 具体实现过程</a>
####  <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#二、礼物管理-以直播功能中的礼物表livegift表为例" style="margin-left:40px;">二、礼物管理(以直播功能中的礼物表livegift表为例)</a>
##### <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#二、礼物管理-以直播功能中的礼物表livegift表为例" style="margin-left:70px;">① 礼物管理板块说明</a>
##### <a href="/secondless/w-c/直播功能中的礼物表livegift.html" style="margin-left:70px;" target="_blank">② 具体实现过程</a>
####  <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#三、订单管理-以直播功能中的订单表liveorder表为例" style="margin-left:40px;">三、订单管理(以直播功能中的订单表liveorder表为例)</a>
##### <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#三、订单管理-以直播功能中的订单表liveorder表为例" style="margin-left:70px;">① 初步理解关联关系</a>
##### <a href="/secondless/w-c/直播功能中的订单表liveorder.html" style="margin-left:70px;" target="_blank">② 具体实现过程</a>
####  <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#四、直播间管理-以直播功能中的直播间表live表为例" style="margin-left:40px;">四、直播间管理(以直播功能中的直播间表live表为例)</a>
##### <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#四、直播间管理-以直播功能中的直播间表live表为例" style="margin-left:70px;">① 多模型关联查询实践</a>
##### <a href="/secondless/w-c/直播功能中的直播间表live.html" style="margin-left:70px;" target="_blank">② 具体实现过程</a>
####  <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#五、mysql语句进一步理解模型关联关系-mysql进阶" style="margin-left:40px;">五、mysql语句进一步理解模型关联关系（Mysql进阶）</a>
##### <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#五、mysql语句进一步理解模型关联关系-mysql进阶" style="margin-left:70px;">① 关联关系进一步说明</a>
##### <a href="/secondless/w-c/mysql数据库.html#三、mysql子查询和连表查询" style="margin-left:70px;" target="_blank">② mysql数据库基础-三、mysql子查询和连表查询（文档搜索：mysql子查询和连表查询）</a>
####  <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#六、企业网站栏目管理、内容管理" style="margin-left:40px;">六、企业网站栏目管理、内容管理</a>
##### <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#六、企业网站栏目管理、内容管理" style="margin-left:70px;">① 企业网站栏目管理、内容管理说明</a>
##### <a href="/secondless/w-c/企业网站后台栏目管理.html" style="margin-left:70px;" target="_blank">② 企业网站后台栏目管理具体实现</a>
##### <a href="/secondless/w-c/企业网站后台内容管理.html" style="margin-left:70px;" target="_blank">③ 企业网站后台内容管理具体实现</a>
####  <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#七、网站配置管理" style="margin-left:40px;">七、网站配置管理</a>
##### <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#七、网站配置管理" style="margin-left:70px;">① 网站配置管理代码实现</a>
####  <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#八、后台初始化管理员登录逻辑" style="margin-left:40px;">八、后台初始化管理员登录逻辑</a>
##### <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#八、后台初始化管理员登录逻辑" style="margin-left:70px;">① 登录逻辑代码实现</a>
####  <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#九、简单权限管理" style="margin-left:40px;">九、简单权限管理</a>
##### <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#九、简单权限管理" style="margin-left:70px;">① 管理员栏目：超级管理员可以查看所有管理员，普通管理员只能看自己</a>
##### <a href="/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html#_2-权限分配" style="margin-left:70px;" >② 权限分配</a>
##### <a href="/secondless/w-c/网站后台管理员简单权限分配功能实现.html" style="margin-left:70px;" target="_blank">③ 网站后台管理员简单权限分配功能实现</a>
### [章节5.企业网站前端部分](/secondless/w-c/企业网站前端部分 '章节5.企业网站前端部分')


<br/><br/>

## 其它学期课程
### [第一学期（学习顺序：01）](/aboutless.html '第一学期课程')
> 第一学期课程专为零基础的学员定制录制的，纯html+css做企业网站的网页，主讲html和css的相关基础知识，flex布局相关知识，封装css基础样式库，引入字体图标及网页开发基础布局思维，完成企业网站网页的开发过程。<br/><br/>
<b><a href="https://study.163.com/course/courseMain.htm?courseId=1213374826&share=2&shareId=480000002289674" target="_blank">[第一学期学习视频]</a>
</b>

### [第二学期【第1季】（学习顺序：02）](/secondless/w-a '第二学期第1季课程')
> 主讲JavaScript的基础，建议所有学员观看。<br/>
<b>
   <a href="/secondless/w-a.html" target="_blank">[第1季学习文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a style="margin-left:20px;">[第1季学习视频]</a>
</b>

### [第二学期【第2季】（学习顺序：03）](/secondless/w-b '第二学期第2季课程')
> JavaScript中的面向对象，类，ajax，封装js库过渡到jQuery， vue.js基础配置网站页面，建议所有学员观看。<br/>
<b>
   <a href="/secondless/w-b.html" target="_blank">[第2季学习文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a style="margin-left:20px;">[第2季学习视频]</a>
</b>

### [第二学期【第3季】（学习顺序：04）](/secondless/w-c '第二学期第3季课程')
> egg.js基础，响应式网页布局，Bootstrap框架，响应式后台系统管理，建议所有学员观看。<br/>
<b>
   <a href="/secondless/w-c.html" target="_blank">[第3季学习文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a style="margin-left:20px;">[第3季学习视频]</a>
</b>