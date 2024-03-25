---
navbar: true
sidebar: auto
title: 直播功能中的订单表liveorder
---

## 一、创建数据库直播功能中的订单表 liveorder
> 分析：当你要给直播间的主播刷礼物的时候，我们上一节课说过了，礼物需要对应数量的金币购买，那么用金币购买礼物这个过程就会产生买礼物的订单，我们简单分析一下订单表的字段，最基本的字段有：订单号（no）、价格[值多少金币购买]（price）、订单支付状态（status-未支付-支付成功-支付失败等状态）、哪个用户下的订单（liveuser_id），当然这是最简单的订单组成，我们先写这么多字段，后面随着业务扩展在扩充字段。<br/><br/>
> 直播功能中的订单表 liveorder 基本表字段设计
> 
| 字段名                 |  数据类型   | 描述                              |   空     |         默认值                       | <p style="width:100px;">字段含义 </p>     |
| :---:                 | :---:       | :---:                            | :---:    |         :---:                           |        :---:                           |
| <b>id </b>            | <span>int(20) </span>     | <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>      |   否      |         <span style="font-size:12px">无  </span>                             |                                        |
| <b>no </b>      | varchar(100) |                                  |    否    |  <span style="font-size:12px"> 无、订单号一般字母数字等混合组成，具有唯一性  </span>   |   <span style="font-size:12px"> 订单号  </span>                        |
| <b>price </b>      | int(9) |                                  |    否    |      默认值：0                                    |   订单价格-多少金币买的                        |
| <b> status </b>    | <span>enum('pending', 'success', 'fail') </span>  |                            |    否     |  默认值：pending （未支付）	               |   订单支付状态    |
| <b>liveuser_id </b>      | int |                                  |    否    |      默认值：0                                    |   哪个用户下的订单              |
| <b> create_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据创建时间                         |
| <b> update_time </b>  | datetime  |                                   |    否    |        CURRENT_TIMESTAMP	               |   数据更新时间                         |
> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`

## 二、创建迁移文件、执行迁移命令创建数据表
> 在数据库创建数据表的方式很多，在上面定义了表字段之后，可以使用`phpmyAdmin`、`数据库插件执行sql语句创建`等等方式，但是建议大家通过：创建迁移文件、执行迁移命令创建数据表。
>> 涉及的知识点：
>> 1. 章节2：egg.js基础-五、<a href="/secondless/w-c/Egg.js.html#五、eggjs项目中sequelize模型创建mysql数据库" target="_blank">eggjs项目中sequelize模型创建mysql数据库</a>
>>
>> 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=init-liveorder
>> ```
>> 创建迁移文件：
>> ### 重点理解关联关系的设置 references
>> ```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up (queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = Sequelize;
>>     // 创建表 --- 类似我们sql语句定义表结构
>>     await queryInterface.createTable('liveorder', {
>>       id: { 
>>         type: INTEGER(20).UNSIGNED, 
>>         primaryKey: true, 
>>         autoIncrement: true,
>>         comment: '订单主键id'
>>       },
>>       no: { 
>>         type: STRING(100), 
>>         allowNull: false, 
>>         defaultValue: '', 
>>         comment: '订单号'
>>       },
>>       price : { 
>>         type: INTEGER(9), 
>>         allowNull: false, 
>>         defaultValue: 0, 
>>         comment: '订单价格' 
>>       },
>>       status: { 
>>         type: ENUM, 
>>         values: ['pending', 'success', 'fail'], 
>>         allowNull: false, 
>>         defaultValue: 'pending', 
>>         comment: '订单支付状态'
>>       },
>>       liveuser_id:{
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '用户id',
>>         references: { //关联关系
>>           model: 'liveuser', //关联的表
>>           key: 'id' //关联表的主键
>>         },
>>         onDelete: 'cascade', //删除时操作
>>         onUpdate: 'restrict', // 更新时操作
>>       },
>>       create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
>>       update_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')}
>>     });
>>   },
>> 
>>   async down (queryInterface, Sequelize) {
>>     await queryInterface.dropTable('liveorder')
>>   }
>> };
>> ```
>> 执行迁移文件命令生成数据库表：
>> ```js
>> // 升级数据库
>> npx sequelize db:migrate
>> ```
