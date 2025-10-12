---
navbar: true
sidebar: auto
title: 课程案例相关表设计及说明
---

## 一. 留言表 message
### message 表字段设计
| 字段名                 |  数据类型   | 描述                              |   空     | <p style="width:50px;">默认值</p>       | <p style="width:100px;">字段含义 </p>     |
| :---:                 | :---:       | :---:                            | :---:    |         :---:                           |        :---:                           |
| <b>id </b>            | int(20)     | 主键、自增长、UNSIGNED无符号       |   否     |         无                              |                                        |
| <b>username </b>      | varchar(30) |                                  |    否    |                                         |   留言用户称呼                          |
| <b>tel </b>           | varchar(64) |                                  |    否    |                                         |   留言用户电话加密值                    |
| <b>telnumber </b>     | bigint(11) |                                   |    否    |        0                                |   留言用户电话                          |
| <b>  message </b>     | text       |                                   |    是    |        NULL                             |   用户留言内容                          |
| <b> timestamp </b>    | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   用户留言时间戳                        |
| <b> create_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据创建时间                         |
| <b> update_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据更新时间                         |


### message 表迁移文件
```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = Sequelize;
    // 创建表 --- 类似我们sql语句定义表结构
    await queryInterface.createTable('message', {
      id: { 
        type: INTEGER(20).UNSIGNED, 
        primaryKey: true, 
        autoIncrement: true,
        comment: '留言板主键id'
      },
      username: { 
        type: STRING(30), 
        allowNull: false, 
        defaultValue: '', 
        comment: '留言板用户称呼'
      },
      tel: { 
        type: STRING(64), 
        allowNull: false, 
        defaultValue: '' , 
        comment: '留言用户的电话号码加密'
      },
      telnumber : { 
        type: BIGINT(11), 
        allowNull: false, 
        defaultValue: 0 , 
        comment: '留言用户的电话号码', 
        unique: true
      },
      message : { 
        type: TEXT, 
        allowNull: true, 
        defaultValue: '', 
        comment: '留言用户的留言信息' 
      },
      // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
      timestamp : {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
      create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
      update_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('message')
  }
};

```

### message 模型
```js
'use strict';

module.exports = app =>{
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = app.Sequelize;

    const Message = app.model.define('message',{
        id: { 
            type: INTEGER(20).UNSIGNED, 
            primaryKey: true, 
            autoIncrement: true,
            comment: '留言板主键id'
          },
          username: { 
            type: STRING(30), 
            allowNull: false, 
            defaultValue: '', 
            comment: '留言板用户称呼',
            // set(val){
            //   let data = val + '(先生/女士)';
            //   this.setDataValue('username', data);
            // }
          },
          tel: { 
            type: STRING(64), 
            allowNull: false, 
            defaultValue: '' , 
            comment: '留言用户的电话号码加密'
          },
          telnumber : { 
            type: BIGINT(11), 
            allowNull: false, 
            defaultValue: 0 , 
            comment: '留言用户的电话号码', 
            unique: true
          },
          message : { 
            type: TEXT, 
            allowNull: true, 
            defaultValue: '', 
            comment: '留言用户的留言信息' 
          },
          // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
          timestamp : {
            type: DATE, 
            allowNull: false, 
            defaultValue:app.Sequelize.fn('NOW'),
            get(){
              let data = this.getDataValue('timestamp') ;
              /*
              //如果想转换成年月日时分秒，可以使用moment.js库等其他时间库
              //我们这里带领大家回忆一下js基础，就手动拼接一下
              let year = data.getFullYear();
              let month = ("0" + (data.getMonth() + 1)).slice(-2);
              let day = ("0" + data.getDate()).slice(-2);
              let hours = ("0" + data.getHours()).slice(-2);
              let minutes = ("0" + data.getMinutes()).slice(-2);
              let seconds = ("0" + data.getSeconds()).slice(-2);
              return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
              */
              //如果想转成时间戳
              return (new Date(data)).getTime();
            }
          },
          create_time: {type: DATE, allowNull: false, defaultValue:app.Sequelize.fn('NOW')},
          update_time: {type: DATE, allowNull: false, defaultValue:app.Sequelize.fn('NOW')}
        //   timestamp : DATE,
        //   create_time: DATE,
        //   update_time: DATE
    },{
        // timestamps: true,//是否自动写入时间戳
        // tableName: 'message',//自定义数据表名称
    });

    return Message;
}
```
### message 参数验证
```js
//一般处理流程
//1.参数验证
this.ctx.validate({
    username  : {
        type: 'string',  //参数类型
        required: true, //是否必须
        // defValue: '', 
        desc: '用户称呼' //字段含义
    },
    tel  : {
        type: 'string',  
        required: true, 
        // defValue: '', 
        desc: '用户电话加密' 
    },
    telnumber  : {
        type: 'phone',  
        required: true, 
        // defValue: '', 
        desc: '用户电话' 
    },
    message  : {
        type: 'string',  
        required: false, 
        defValue: '', 
        desc: '用户留言' 
    },
});
//2.写入数据库
//...
//3.成功之后给页面反馈
//...
```

## 二. 管理员表 manager
### manager 表字段设计
| 字段名                 |  数据类型   | 描述                              |   空     | 默认值      | <p style="width:100px;">字段含义 </p>     |
| :---:                 | :---:       | :---:                            | :---:    |         :---:                           |        :---:                           |
| <b>id </b>            | <span>int(20) </span>     | <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>      |   否      |         <span style="font-size:12px">无  </span>                             |                                        |
| <b>username </b>      | varchar(30) |                                  |    否    |                                         |   管理员账号                          |
| <b>password </b>      | varchar(255) |                                  |    否    |                                         |   管理员密码                          |
| <b>avatar </b>      | <span style="font-size:12px">varchar(1000) </span>|                                  |   <span style="font-size:12px"> 是  </span>  |     <span style="font-size:12px">给一个默认图像地址：如：/public/assets/img/profiles/avatar-01.jpg</span>                                    |  <span style="font-size:12px"> 管理员头像（本地、网络图片地址）  </span>         |
| <b> create_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据创建时间                         |
| <b> update_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据更新时间                         |
> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`

### manager 表迁移文件、模型、参数验证参考留言表 message，略
<br/><br/>

## 三. 直播功能中的用户表 liveuser
具体查看：<a href="/secondless/w-c/直播功能中的用户表liveuser" target="_blank" title="点击查看课程文档">直播功能中的用户表liveuser</a>

## 四. 直播功能中的礼物表 livegift
具体查看：<a href="/secondless/w-c/直播功能中的礼物表livegift" target="_blank" title="点击查看课程文档">直播功能中的礼物表livegift</a>

## 五. 直播功能中的订单表 liveorder
具体查看：<a href="/secondless/w-c/直播功能中的订单表liveorder" target="_blank" title="点击查看课程文档">直播功能中的订单表liveorder</a>

## 六. 直播功能中的直播间表 live
具体查看：<a href="/secondless/w-c/直播功能中的直播间表live" target="_blank" title="点击查看课程文档">直播功能中的直播间表live</a>

## 七. 直播功能中的 直播间观看记录表 live_liveuser
具体查看：文档搜索 `直播间观看记录表 live_liveuser` 快速定位文档对应内容

## 八. 直播功能中的 直播间刷礼物记录表 live_livegift
具体查看：文档搜索 `直播间刷礼物记录表 live_livegift` 快速定位文档对应内容

## 九. 直播功能中的 查看直播间弹幕（评论）表 livecomment 
具体查看：文档搜索 `查看直播间弹幕` 快速定位文档对应内容

<br/><br/>

## 十. 网站中的 栏目管理（网站导航栏，栏目分类）表 category
具体查看：<a href="/secondless/w-c/企业网站后台栏目管理" target="_blank" title="点击查看课程文档">企业网站后台栏目管理（网站导航栏，栏目分类）表 category</a>

## 十一. 网站中的 内容管理（网站的新闻、产品、内容等等信息）表 news
具体查看：<a href="/secondless/w-c/企业网站后台内容管理" target="_blank" title="点击查看课程文档">企业网站后台内容管理（网站的新闻、产品、内容等等信息）表 news</a>


## 十二、角色表 `role`
具体查看：<a href="/web/mysql/role.html" target="_blank">点击查看 角色表 `role`</a><br/>

## 十三、商城系统 管理员表 `shop_manager`
具体查看：<a href="/web/mysql/shop_manager" target="_blank">点击查看商城系统 管理员表 `shop_manager`</a><br/>

## 十四、[补充新增] 分类表category的角色表 `rolecategory`
具体查看：<a href="/web/mysql/rolecategory" target="_blank">点击查看分类表category的角色表 `rolecategory`</a><br/>

## 十五、角色表 `role`的权限表 `rule`
具体查看：<a href="/web/mysql/role.html#三、role表的权限表rule-字段设计" target="_blank">点击查看 角色的权限表 `rule`</a><br/>

## 十六、角色表 `role`和权限表 `rule`的中间表 `role_rule`
具体查看：<a href="/web/mysql/role.html#五、角色表role和权限表rule的中间表-role-rule-表字段设计" target="_blank">点击查看 角色表 `role`和权限表 `rule`的中间表 `role_rule`</a><br/>

## 十七、图片管理板块表：`image_class`[图片分类表]、`image`[图片表] 说明
具体查看：<a href="/web/mysql/image_class.html" target="_blank">点击查看 图片管理板块表 `image_class` `image`</a><br/>

## 十八、商品管理板块表：`goods_class`[商品分类表]、`skus`[商品规格表] 说明
具体查看：<a href="/web/mysql/goods_class.html" target="_blank">点击查看 商品管理板块表 `goods_class` `skus`</a><br/>

## 十九、用户表：`user`[用户表]、`user_info`[用户信息表] 说明
1. 具体查看：<a href="/web/mysql/user.html" target="_blank">点击查看 `user`[用户表]、`user_info`[用户信息表]相关表说明</a><br/>
2. 相关接口开发文档查看：<a href="/fourthless/w-a/eggjs.user表用户管理.html" target="_blank">点击查看 `user`[用户表]、`user_info`[用户信息表]相关表接口开发文档</a><br/>

## 二十、好友表：`goodfriend`[好友表] 说明
1. 具体查看：<a href="/web/mysql/goodfriend.html" target="_blank">点击查看 `goodfriend`[好友表] 相关表说明</a><br/>

## 二十一、群管理表：`group`[群表] `group_user`[群成员表] 说明
1. 具体查看：<a href="/web/mysql/group.html" target="_blank">点击查看 群聊管理group表相关表说明</a><br/>


## 二十二、投诉表：`chat_complaint`[投诉群或者用户]  说明
1. 具体查看：<a href="/web/mysql/chat_complaint.html" target="_blank">点击查看 投诉表：`chat_complaint`[投诉群或者用户] 说明</a><br/>

