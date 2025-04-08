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

## 二、商城管理员列表
字体图标，查看：<https://fontawesome.dashgame.com/>
### 1. 后台左侧菜单
`data/root.json`
```json
[
  ...
  {"id":17,"pid":0, "name": "商城", "icon": "fa fa-shopping-cart", "url": "" },
  {"id":18,"pid":17, "name": "角色管理", "icon": "fa fa-users", "url": "/shop/admin/role" },
  {"id":19,"pid":17, "name": "管理员管理", "icon": "fa fa-user-circle-o", "url": "/shop/admin/shopmanager" }
]
```
### 2. 控制器
`app/controller/admin/shop_manager.js`
```js
  // 管理员列表页面
  async index() {
    const { ctx, app } = this;
    //分页：可以提炼成一个公共方法page(模型名称，where条件，其他参数options)
    let data = await ctx.page('ShopManager',{},{
        include: [
            { 
                model: app.model.Role, 
                attrbutes: ['id', 'name','desc','status'],
            }
        ],
    });

    // console.log('拿到管理员列表', JSON.parse(JSON.stringify(data)));
    
    //渲染公共模版
    await ctx.renderTemplate({
      title: '管理员列表',//现在网页title,面包屑导航title,页面标题
      data,
      tempType: 'table', //模板类型：table表格模板 ，form表单模板
      table: {
        //表格上方按钮,没有不要填buttons
        buttons: [
          {
            url: '/shop/admin/shopmanager/create',//新增路径
            desc: '新增管理员',//新增 //按钮名称
            // icon: 'fa fa-plus fa-lg',//按钮图标
          }
        ],
        //表头
        columns: [
          {
            title: '管理员账号',
            // key: 'username',
            render(item) {
              const type = item.super == 1 ? '超级管理员' : '普通管理员';
              return `
                <h2 class="table-avatar">
                  <a href="#" class="avatar avatar-sm mr-2">
                      <img
                          class="avatar-img rounded-circle"
                          src="${item.avatar}"
                          alt="User Image"></a>
                      <a href="#"> ${item.username}
                      <span>${item.role.name}</span></a>
                </h2>
                `;
            },
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
                { value: 1, name: '启用' },
                { value: 0, name: '禁用' },
              ];
              let str = `<div class="btn-group btn-group-${item.id}">`;
              for (let i = 0; i < arr.length; i++) {
                str += `<button type="button" class="btn btn-light" data="${item.status}"
                      value="${arr[i].value}"
                      @click="changeBtnStatus('status','btn-group-${item.id}',${arr[i].value},${i},${item.id},'/shop/admin/shopmanager','ShopManager')">${arr[i].name}</button>`;
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
                return `/shop/admin/shopmanager/edit/${id}`;
              },
              //删除
              delete: function (id) {
                return `/shop/admin/shopmanager/${id}/delete`;
              }
            }
          },
        ],
      },
    });
  }
```
### 3. 模型
`app/model/shop_manager.js`
```js
...
module.exports = app => {
  ...
  // 模型关联关系
  ShopManager.associate = function (models) {
      // 关联角色 反向一对多(一个角色可以有多个管理员，角色对于管理员是一对多的关系，反过来管理员属于角色belongsTo，就是反向一对多)
      ShopManager.belongsTo(app.model.Role);
  }

  return ShopManager;
}
```

## 三、商城管理员修改、删除、修改可用状态
`app/controller/admin/shop_manager.js`
### 1. 控制器代码
```js
// 修改管理员界面
  async edit() {

    const { ctx, app } = this;
    const id = ctx.params.id;
    let data = await app.model.ShopManager.findOne({
      where: {
        id
      }
    });
    if (!data) {
      return ctx.apiFail('该管理员不存在');
    }
    data = JSON.parse(JSON.stringify(data));
    delete data.password;
    // console.log(data);

    // 渲染模版前先拿到所有角色
    let role = await ctx.service.shopManager.dropdown_Rolelist();
    // console.log('拿到所有角色', role); return;
    role.shift();//删除数组第一个元素
    
    //渲染公共模版
    await ctx.renderTemplate({
      id,
      title: '修改管理员',//现在网页title,面包屑导航title,页面标题
      tempType: 'form', //模板类型：table表格模板 ，form表单模板
      form: {
        //修改管理员提交地址
        action: '/shop/admin/shopmanager/' + id,
        //  字段
        fields: [
          {
            label: '请选择一个角色',
            type: 'dropdown', //下拉框
            name: 'role_id',
            default: JSON.stringify(role),
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
        //修改内容默认值
        data,
      },
      //修改成功之后跳转到哪个页面
      successUrl: '/shop/admin/shopmanager',
    });

  }
  // 修改管理员数据功能
  async update() {
    const { ctx, app } = this;
    //1.参数验证
    this.ctx.validate({
      id: {
        type: 'int',
        required: true,
        desc: '管理员id'
      },
      username: {
        type: 'string',  //参数类型
        required: true, //是否必须
        // defValue: '', 
        desc: '管理员账号' //字段含义
      },
      password: {
        type: 'string',
        required: false,
        // defValue: '', 
        desc: '管理员密码'
      },
      avatar: {
        type: 'string',
        required: false,
        // defValue: 'https://thinkphp-all.oss-cn-hangzhou.aliyuncs.com/public/67b3001b2aedd.png',
        desc: '管理员头像'
      },
      role_id: {
        type: 'string',
        required: false,
        // defValue: '',
        desc: '角色id'
      },
    });

    // 参数
    const id = ctx.params.id;
    const { username, password, avatar, role_id } = ctx.request.body;
    // 先看一下管理员是否存在
    let data = await app.model.ShopManager.findOne({ where: { id } });
    if (!data) {
      return ctx.apiFail('该管理员记录不存在');
    }
    // if (data && data.super == 1) {
    //   return ctx.apiFail('超级管理员不能修改');
    // }
    //存在，由于管理员的账号具有唯一性，你不能修改账号的时候，修改成存在的账号
    const Op = this.app.Sequelize.Op;//拿Op,固定写法
    if (await app.model.ShopManager.findOne({
      where: {
        username,
        id: {
          [Op.ne]: id
        }
      }
    })) {
      // return ctx.pageFail('该管理员账号已经存在，不能修改成该管理员账号', 404);
      return ctx.apiFail('该管理员账号已经存在，不能修改成该管理员账号');
    }
    // 修改数据
    if(data.super == 1){
      let manager = await app.model.Manager.findOne({
        where:{
           username:data.username
        }
      });
      if(manager && manager.super == 1){
         manager.username = username;
         if(password){
           manager.password = password;
         }
         await manager.save();
      }
    }
    data.username = username;
    if (password) {
      data.password = password;
    }
    if (avatar) {
      data.avatar = avatar;
    }

    if (role_id && data.super != 1) {
      data.role_id = role_id;
    }

    await data.save();
    // 给一个反馈
    ctx.apiSuccess('修改成功');
  }
  // 修改管理员状态功能
  async updateStatus() {
    const { ctx, app } = this;
    //1.参数验证
    this.ctx.validate({
      id: {
        type: 'int',
        required: true,
        desc: '管理员id'
      },
      status: {
        type: 'int',  //参数类型
        required: true, //是否必须
        // defValue: '', 
        desc: '角色状态', //字段含义
        range: {
          in: [0, 1]
        },
      },
    });
    // 参数
    const id = ctx.params.id;
    const { status } = ctx.request.body;
    // 是否存在
    const data = await app.model.ShopManager.findOne({ where: { id } });
    if (!data) {
      return ctx.apiFail('管理员不存在');
    }
    // 修改数据
    data.status = status;

    await data.save();
    // 给一个反馈
    ctx.apiSuccess('修改管理员状态成功');
  }
  // 删除管理员功能
  async delete() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    const data = await app.model.ShopManager.findOne({ where: { id } });
    if (data && data.super == 1) {
      return ctx.apiFail('超级管理员不能删除');
    }
    await app.model.ShopManager.destroy({
      where: {
        id
      }
    });
    //提示
    ctx.toast('删除成功', 'success');
    //跳转
    ctx.redirect('/shop/admin/shopmanager');
  }
```

### 2.后台管理员manager在修改超级管理员的时候做一下调整，同时修改一下商城超级管理员账号
`app/controller/admin/manager.js`
```js
//修改管理员数据功能
  async update() {

    if (this.ctx.session.auth.super == 0 && this.ctx.params.id != this.ctx.session.auth.id) {
      return this.ctx.apiFail('您无权操作此项功能');
    }

    const { ctx, app } = this;
    //1.参数验证
    this.ctx.validate({
      id: {
        type: 'int',
        required: true,
        desc: '管理员id'
      },
      username: {
        type: 'string',  //参数类型
        required: true, //是否必须
        // defValue: '', 
        desc: '管理员账号' //字段含义
      },
      password: {
        type: 'string',
        // required: true,
        // defValue: '', 
        desc: '管理员密码'
      },
      avatar: {
        type: 'string',
        required: false,
        // defValue: '', 
        desc: '管理员头像'
      },
      auth: {
        type: 'string',
        required: false,
        // defValue: '',
        desc: '权限id'
      },
    });

    // 参数
    const id = ctx.params.id;
    const { username, password, avatar, auth } = ctx.request.body;
    // 先看一下管理员是否存在
    let manager = await app.model.Manager.findOne({ where: { id } });
    if (!manager) {
      return ctx.pageFail('该管理员记录不存在');
    }
    //存在，由于管理员的账号具有唯一性，你不能修改账号的时候，修改成存在的账号
    const Op = this.app.Sequelize.Op;//拿Op,固定写法
    if (await app.model.Manager.findOne({
      where: {
        username,
        id: {
          [Op.ne]: id
        }
      }
    })) {
      // return ctx.pageFail('该管理员账号已经存在，不能修改成该管理员账号', 404);
      return ctx.apiFail('该管理员账号已经存在，不能修改成该管理员账号');
    }
    // 修改数据
    if(manager.super == 1){
      let shopmanager = await app.model.ShopManager.findOne({
        where:{
           username:manager.username
        }
      });
      if(shopmanager && shopmanager.super == 1){
         shopmanager.username = username;
         if(password){
           shopmanager.password = password;
         }
         await shopmanager.save();
      }
    }
    manager.username = username;
    if (password) {
      manager.password = password;
    }
    if (avatar) {
      manager.avatar = avatar;
    }

    if (auth) {
      manager.auth = auth;
    }

    await manager.save();
    // 给一个反馈
    ctx.apiSuccess('修改成功');
  }
```

## 四、商城管理员登录和退出功能（API接口）
### 1. 路由
`app/router/admin/shop.js`
```js
module.exports = app => {
    const { router, controller } = app;
    ...
    
    //商城管理员登录
    router.post('/shop/login', controller.admin.shopManager.login);
    //商城管理员退出
    router.post('/shop/logout', controller.admin.shopManager.logout);
};
```
### 2. 控制器
`app/controller/admin/shop_manager.js`
```js
//商城管理员登录
  async login() {
    const { ctx, app } = this;
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
    });
    // 拿参数
    const { username, password } = ctx.request.body;
    // 判断商城管理员是否存在
    let shop_manager = await app.model.ShopManager.findOne({
      where: {
        username:username,
        status:1,
      },
    });
    if (!shop_manager) {
      ctx.throw(400, '商城管理员不存在或者被禁用');
    }
    // 验证用户密码
    const isMatch = bcrypt.compareSync(password,shop_manager.password);
    if(!isMatch){
       ctx.throw(400, '商城管理员密码错误');
    }
    // 生成唯一token
    shop_manager =  JSON.parse(JSON.stringify(shop_manager));
    // this.app.jwt.sign(shop_manager, this.app.config.jwt.secret);
    let token = ctx.getToken(shop_manager);
    shop_manager.token = token;
    console.log('商城管理员', shop_manager);
    // 加入到缓存中（保证用户提交验证的token来自我们服务器生成的）
    let shop_manager_token =  await this.service.cache.set('shop_manager_' + shop_manager.id, 
                                token, 60 * 60 * 24 * 365 * 100);
    if(!shop_manager_token){
       ctx.throw(400, '登录失败');
    }
    delete shop_manager.password;
    return ctx.apiSuccess(shop_manager);
  }

  //商城管理员退出
  async logout() {
    const { ctx,app } = this;
    let shop_manager = ctx.auth_shop_manager;
    console.log('商城管理员退出', shop_manager);
    let shop_manager_token =  await ctx.service.cache.get('shop_manager_' + shop_manager.id);
    // console.log('商城超级管理员缓存信息', shop_manager_token);
    if(shop_manager_token){
        //清除redis
        await ctx.service.cache.remove('shop_manager_' + shop_manager.id);
    }
    return ctx.apiSuccess(true);
  }
```

### 3. 中间件配置
`config/config.default.js` 
```js
  ...
  // 对中间件adminAuth进一步配置
  config.adminAuth = {
    ignore: [
      ...
      "/shop/login",
      "/shop/logout",
    ],
  };
  ...
  // 对中间件shopManagerAuth进一步配置
  config.shopManagerAuth = {
    match:[
      '/shop/admin',//只要包含/shop/admin路由的任何页面都生效
      "/shop/logout",
    ],
  };
  ...
```

