---
navbar: true
sidebar: auto
title: eggjs商城管理员
---

## 一、创建商城管理员
由于我们在前面已经教大家创建了商城超级管理员，因此现在创建商城管理员，就非常简单了。
### 1. 路由
`app/router/admin/shop.js`
```js
module.exports = app => {
    const { router, controller } = app;
    ...

    //删除管理员功能
    router.get('/shop/admin/shopmanager/:id/delete', controller.admin.shopManager.delete);
    //修改管理员状态功能
    router.post('/shop/admin/shopmanager/:id/update_status',controller.admin.shopManager.updateStatus);
    //修改管理员界面
    router.get('/shop/admin/shopmanager/edit/:id', controller.admin.shopManager.edit);
    //修改管理员数据
    router.post('/shop/admin/shopmanager/:id', controller.admin.shopManager.update);
    // 创建管理员界面
    router.get('/shop/admin/shopmanager/create', controller.admin.shopManager.create);
    //创建管理员提交数据
    router.post('/shop/admin/shopmanager', controller.admin.shopManager.save);
    //管理员列表页面
    router.get('/shop/admin/shopmanager', controller.admin.shopManager.index);
    
    
};
```
### 2. 控制器 
`app/controller/admin/shop_manager.js`
```js
'use strict';

const Controller = require('egg').Controller;

class Shop_managerController extends Controller {
  //创建管理员界面
  async create() {
    const { ctx,app } = this;
    // 渲染模版前先拿到所有角色
    let data = await ctx.service.shopManager.dropdown_rolelist();
    data.shift();//删除数组第一个元素
    // console.log('拿到所有角色', data);return;
    //渲染公共模版
    await ctx.renderTemplate({
        title: '创建管理员',//现在网页title,面包屑导航title,页面标题
        tempType: 'form', //模板类型：table表格模板 ，form表单模板
        form: {
          //提交地址
          action: "/shop/admin/shopmanager",
          //  字段
          fields: [
            {
                label: '请选择一个管理角色',
                type: 'dropdown', //下拉框
                name: 'role_id',
                default: JSON.stringify(data),
                placeholder: '请选择',
            },
            {
              label: '管理员账号',
              type: 'text',
              name: 'username',
              placeholder: '请输入管理员账号',
              // default:'默认值测试', //新增时候默认值，可选
            },
            {
              label: '管理员密码',
              type: 'password',
              name: 'password',
              placeholder: '请输入管理员密码',
            },
            {
              label: '管理员头像',
              type: 'file',
              name: 'avatar',
            },
          ],
        },
        //新增成功之后跳转到哪个页面
        successUrl: '/shop/admin/shopmanager',
      });
  }
  //创建管理员提交数据
  async save() {
    //一般处理流程
    //1.参数验证
    this.ctx.validate({
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
      avatar: {
        type: 'string',
        required: false,
        defValue: 'https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png', 
        desc: '管理员头像'
      },
      role_id: {
        type: 'int',
        required: true,
        // defValue: '',
        desc: '角色id'
      },
    });
    //先判断一下管理员账号是否存在，不存在在写入数据库
    //2.写入数据库
    //3.成功之后给页面反馈

    //  let params = this.ctx.request.body; 
    //  console.log(params); //{ username: 'admin', password: '123456', avatar: '' }
    let { username, password, avatar, role_id } = this.ctx.request.body;
    // let manager = await this.app.model.Manager.findOne({where: {username}});
    if (await this.app.model.ShopManager.findOne({ where: { username } })) {
       return this.ctx.apiFail('该管理员已经存在');
    }
    //否则不存在则写入数据库
    const res = await this.app.model.ShopManager.create({
      username,
      password,
      avatar,
      role_id
    });
    this.ctx.apiSuccess(true);
  }
  //管理员列表页面
  async index() {}
  //修改管理员界面
  async edit() {}
  //修改管理员数据
  async update() {}
  //修改管理员状态功能
  async updateStatus() {}
  //删除管理员功能
  async delete() {}
}

module.exports = Shop_managerController;

```

### 3. 服务
`app/service/shop_manager.js`
```js
'use strict';

const Service = require('egg').Service;

class Shop_managerService extends Service {
    //下拉框获取所有角色
    async dropdown_rolelist() {
        let data = await this.rolelist();
        return data;
    }
   //获取所有角色-去掉超级管理员
   async rolelist() {
    const { ctx, app } = this;
    // 渲染模版前先拿到所有角色
    let data = await ctx.app.model.Role.findAll({
        where: {
            status: 1
        },
        attributes: ['id', 'name', 'desc', 'status'],
    });
    data = JSON.parse(JSON.stringify(data));
    // data.unshift({ id: 0, name: '一级分类', pid: 0, status: 1, value: 0 });
    data = data.map(item => {
        return {
            ...item,
            value: item.id
        }
    });
    // console.log('所有角色', data);
    return data;
}
}

module.exports = Shop_managerService;

```
