---
navbar: true
sidebar: auto
title:  商品管理板块表说明
---

# 商品管理板块表：<br/> `goods_class`[商品分类表]、`skus`[商品规格表]、`goods`[商品表] 说明
## 一、`goods_class`[商品分类表] 字段设计
| 字段名  |  数据类型及描述    |   空    | <p style="width:150px;">默认值 </p>  | <p style="width:100px;">字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id </b>  | <span>int(20) </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |    |         主键id  |
| <b>pid </b>      | int(20) | 否    |      0                          |   上一级(父级)id            |
| <b>name </b>      | varchar(30) |     否    |              |   商品分类名称                        |
| <b>desc </b>      | varchar(255) |  是    |                |   商品分类描述，对商品分类的简单介绍                          |
| <b>order </b>     | int(11) |  是    |       50                 |   排序，默认50            |
| <b> status </b>  | int(1)  |    否    |        1	 |   可用状态：0禁用1启用                         |
| <b> create_time </b>  | datetime  |    否    |      CURRENT_TIMESTAMP	   |   数据创建时间                         |
| <b> update_time </b>  | datetime  |      否  |        CURRENT_TIMESTAMP	|   数据更新时间                         |

> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`


## 二、创建[商品分类表] `goods_class`
### 1、技术栈php(thinkphp)同学
> 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> ### [商品分类表] `goods_class` 相关【文档】和【接口】
> <a href="/fourthless/w-a/thinkphp.商品管理板块.html" target="_blank">thinkphp框架【文档】</a> 和 <a href="/web/mysql/goods_class表接口.html" target="_blank">【接口】</a>

### 2、技术栈node(egg.js)同学
> ### [商品分类表] `goods_class` 相关【文档】和【接口】
> <a href="/fourthless/w-a/eggjs.商品管理板块.html" target="_blank">eggjs框架【文档】</a> 和 <a href="/web/mysql/goods_class表接口.html" target="_blank">【接口】</a>
> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建`goods_class`表：
>> 1. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=goods_class
>> ```
>> 2. 创建迁移文件 `goods_class.js`，内容如下：<br/>
>> ```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up (queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = Sequelize;
>>     // 创建表 --- 类似我们sql语句定义表结构
>>     await queryInterface.createTable('goods_class', {
>>       id: { 
>>         type: INTEGER(20).UNSIGNED, 
>>         primaryKey: true, 
>>         autoIncrement: true,
>>         comment: '主键id'
>>       },
>>       pid: {
>>         type: INTEGER(20).UNSIGNED,
>>         allowNull: false,
>>         defaultValue: 0,
>>         comment: '上一级(父级)id',
>>       },
>>       name: { 
>>         type: STRING(30), 
>>         allowNull: false, 
>>         defaultValue: '', 
>>         comment: '商品分类名称'
>>       },
>>       desc: { 
>>         type: STRING(255), 
>>         allowNull: true, 
>>         defaultValue: '' , 
>>         comment: '商品分类描述，对商品分类的简单介绍'
>>       },
>>       order: {
>>         type: INTEGER,//不限定长度.默认int(11)
>>         allowNull: true,
>>         defaultValue: 50,
>>         comment: '排序，默认50'
>>       },
>>       status:{
>>         type: INTEGER(1),
>>         allowNull: false, 
>>         defaultValue:1,
>>         comment: '状态：1：启用，0：禁用'
>>       },
>>       // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
>>       create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
>>       update_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')}
>>     });
>>   },
>> 
>>   async down (queryInterface, Sequelize) {
>>     await queryInterface.dropTable('goods_class')
>>   }
>> };
>> ```
>> 3. 执行迁移文件命令生成数据库表：
>>> ```js
>>> // 创建数据库
>>> npx sequelize db:migrate
>>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>>> npx sequelize db:migrate:undo
>>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>>> npx sequelize db:migrate:undo:all
>>> ```

## 三、`skus`[商品规格表] 字段设计
| 字段名  |  数据类型及描述    |   空    | <p style="width:150px;">默认值 </p>  | <p style="width:100px;">字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id </b>  | <span>int(20) </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |    |         主键id  |
| <b>type </b>      | int(11) | 是    |      0    |   规格类型：0无限制，1颜色，2图片，3尺寸等等                          |
| <b>name </b>      | varchar(30) |     否    |              |   规格名称                        |
| <b>default </b>      | varchar(2000) |  是    |                |   规格值，用逗号隔开                         |
| <b>order </b>     | int(11) |  是    |       50                 |   排序，默认50            |
| <b> status </b>  | int(1)  |    否    |        1	 |   可用状态：0禁用1启用                         |
| <b> create_time </b>  | datetime  |    否    |      CURRENT_TIMESTAMP	   |   数据创建时间                         |
| <b> update_time </b>  | datetime  |      否  |        CURRENT_TIMESTAMP	|   数据更新时间                         |

> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`

## 四、创建[商品规格表] `skus`
### 1、技术栈php(thinkphp)同学
> 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> ### [商品规格表] `skus` 相关【文档】和【接口】
> <a href="/fourthless/w-a/thinkphp.商品管理板块.html#五、商品规格模块" target="_blank">thinkphp框架【文档】:五、商品规格模块</a> 和 <a href="/web/mysql/skus表接口.html" target="_blank">【接口】</a>

### 2、技术栈node(egg.js)同学
> ### [商品规格表] `skus` 相关【文档】和【接口】
> <a href="/fourthless/w-a/eggjs.商品管理板块.html#五、商品规格模块" target="_blank">eggjs框架【文档】:五、商品规格模块</a> 和 <a href="/web/mysql/skus表接口.html" target="_blank">【接口】</a>
> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建`skus`表：
>> 1. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=skus
>> ```
>> 2. 创建迁移文件 `skus.js`，内容如下：<br/>
>> ```js
>> 'use strict';
>> 
>> /** @type {import('sequelize-cli').Migration} */
>> module.exports = {
>>   async up (queryInterface, Sequelize) {
>>     const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = Sequelize;
>>     // 创建表 --- 类似我们sql语句定义表结构
>>     await queryInterface.createTable('skus', {
>>       id: { 
>>         type: INTEGER(20).UNSIGNED, 
>>         primaryKey: true, 
>>         autoIncrement: true,
>>         comment: '主键id'
>>       },
>>       type: {
>>         type: INTEGER(11),
>>         allowNull: true,
>>         defaultValue: 0,
>>         comment: '规格类型：0无限制，1颜色，2图片，3尺寸等等',
>>       },
>>       name: { 
>>         type: STRING(30), 
>>         allowNull: false, 
>>         defaultValue: '', 
>>         comment: '规格名称'
>>       },
>>       default: { 
>>         type: STRING(2000), 
>>         allowNull: true, 
>>         defaultValue: '' , 
>>         comment: '规格值，用逗号隔开'
>>       },
>>       order: {
>>         type: INTEGER,//不限定长度.默认int(11)
>>         allowNull: true,
>>         defaultValue: 50,
>>         comment: '排序，默认50'
>>       },
>>       status:{
>>         type: INTEGER(1),
>>         allowNull: false, 
>>         defaultValue:1,
>>         comment: '状态：1：启用，0：禁用'
>>       },
>>       // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
>>       create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
>>       update_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')}
>>     });
>>   },
>> 
>>   async down (queryInterface, Sequelize) {
>>     await queryInterface.dropTable('skus')
>>   }
>> };
>> ```
>> 3. 执行迁移文件命令生成数据库表：
>>> ```js
>>> // 创建数据库
>>> npx sequelize db:migrate
>>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>>> npx sequelize db:migrate:undo
>>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>>> npx sequelize db:migrate:undo:all
>>> ```

## 五、商品相关表字段设计
由于和商品相关联的表很多，我们这里先说明几张表，后期根据需求在补充。
### 1. 商品表`goods`字段设计
| 字段名  |  数据类型及描述    |   空    | <p style="width:150px;">默认值 </p>  | <p style="width:100px;">字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id </b>  | <span>int(20) </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |    |         主键id  |
| <b>goods_class_id </b>      | int(20) | 否    |                               |   商品分类`goods_class`表的id            |
| <b>name </b>      | varchar(255) |     否    |              |   商品名称                        |
| <b>desc </b>      | varchar(2000) |  是    |                |   商品描述                         |
| <b>content </b>      | text |  是    |                |   商品详情                         |
| <b>cover </b>      | varchar(1000) |  是    |                |   商品封面图代表（更多图片关联至`goods_banner`表）                         |
| <b>... </b>      |  |      |                |                            |
| <b>rating </b>      | 	float |  是    |         5.0       |   商品评分                         |
| <b>sale_count </b>      | int(11) |  是    |         0       |   总销量                         |
| <b>review_count </b>      | int(11) |  是    |         0       |   商品评论数量                          |
| <b>love_count </b>      | int(11) |  是    |         0       |   商品收藏量                         |
| <b>recommend_count </b>      | int(11) |  是    |         0       |   商品推荐量                         |
| <b>... </b>      |  |      |                |                            |
| <b>min_price </b>      | decimal(10,2)	 |  是    |                |   起售价（最低售价，多少元起）                          |
| <b>history_min_price </b>      | decimal(10,2)	 |  是    |                |   历史最低价                          |
| <b>coupon_price </b>      | decimal(10,2)	 |  是    |                |   券后价                          |
| <b>discount_price </b>      | decimal(10,2)	 |  是    |                |   折后价                          |
| <b>spike_price </b>      | decimal(10,2)	 |  是    |                |   秒杀价                          |
| <b>other_price </b>      | decimal(10,2)	 |  是    |                |   其它设置价（如:首件价，新客价，30天低价等等）                          |
| <b>... </b>      |  |      |                |                            |
| <b>unit </b>      | varchar(10) |     是    |    件          |   单位（默认：件）                        |
| <b>stock </b>      | int(11) |  是    |         0       |   库存                         |
| <b>min_stock </b>      | int(11) |  是    |         0       |   库存预警                         |
| <b> stock_display </b>  | int(1)  |    是    |        0	 |   库存显示：0隐藏、1显示                      |
| <b> ischeck </b>  | int(1)  |    是    |        0	 |   审核状态：0审核中、1通过、2拒绝（不通过）                      |
| <b> goods_status </b>  | int(1)  |    是    |        1	 |   商品状态：0仓库（未上架）、1上架、2下架、3违规下架、4回收站等                         |
| <b>... </b>      |  |      |                |                            |
| <b>sku_value </b>      | text |  是    |                |   商品规格属性（商品参数）                         |
| <b>goods_tags </b>      | varchar(2000) |  是    |  |   商品标签（如：`近期销量飙升`，`30天上新`，`近7天同类热卖`，`24小时内发货`，等等，用逗号隔开）   |
| <b>... </b>      |  |      |                |                            |
| <b>order </b>     | int(11) |  是    |       50                 |   排序，默认50            |
| <b> status </b>  | int(1)  |    否    |        1	 |   可用状态：0禁用、1启用                      |
| <b> create_time </b>  | datetime  |    否    |      CURRENT_TIMESTAMP	   |   数据创建时间                         |
| <b> update_time </b>  | datetime  |      否  |        CURRENT_TIMESTAMP	|   数据更新时间                         |
| <b> delete_time </b>  | datetime  |      否  |        CURRENT_TIMESTAMP	|   数据删除时间                         |

> 额外说明：`mysql每行最大只能存65535个字节。假设是utf-8编码，每个字符占3个字节。varchar存储最大字符数为(65535-2-1)/3=21844字符长度`

### 创建商品表 `goods`
### ① 技术栈php(thinkphp)同学
> 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> ### [商品表] `goods` 相关【文档】和【接口】
> <a href="#" target="_blank">thinkphp框架【文档】</a> 和 <a href="#" target="_blank">【接口】</a>

### ② 技术栈node(egg.js)同学
> ### [商品表] `goods` 相关【文档】和【接口】
> <a href="#" target="_blank">eggjs框架【文档】</a> 和 <a href="#" target="_blank">【接口】</a>
> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建`goods`表：
>> 1. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=goods
>> ```
>> 2. 创建迁移文件 `goods.js`，内容如下：<br/>
```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { 
      INTEGER, 
      STRING, 
      DATE, 
      TEXT, 
      FLOAT, 
      DECIMAL,
      BOOLEAN 
    } = Sequelize;

    await queryInterface.createTable('goods', {
      id: { 
        type: INTEGER(20).UNSIGNED, 
        primaryKey: true, 
        autoIncrement: true,
        comment: '主键id'
      },
      goods_class_id: {
        type: INTEGER(20).UNSIGNED,
        allowNull: false,
        comment: '商品分类id',
        references: { //关联关系
          model: 'goods_class', //关联的表
          key: 'id' //关联表的主键
        },
        onDelete: 'CASCADE', //删除时操作
        onUpdate: 'RESTRICT', // 更新时操作
      },
      name: { 
        type: STRING(255), 
        allowNull: false, 
        defaultValue: '', 
        comment: '商品名称'
      },
      desc: { 
        type: STRING(2000), 
        allowNull: true, 
        defaultValue: '', 
        comment: '商品描述'
      },
      content: { 
        type: TEXT, 
        allowNull: true, 
        comment: '商品详情'
      },
      cover: { 
        type: STRING(1000), 
        allowNull: true, 
        comment: '商品封面图代表（更多图片关联至goods_banner表）'
      },
      rating: {
        type: FLOAT,
        allowNull: true,
        defaultValue: 5.0,
        comment: '商品评分'
      },
      sale_count: {
        type: INTEGER(11),
        allowNull: true,
        defaultValue: 0,
        comment: '总销量'
      },
      review_count: {
        type: INTEGER(11),
        allowNull: true,
        defaultValue: 0,
        comment: '评论数量'
      },
      love_count: {
        type: INTEGER(11),
        allowNull: true,
        defaultValue: 0,
        comment: '收藏量'
      },
      recommend_count: {
        type: INTEGER(11),
        allowNull: true,
        defaultValue: 0,
        comment: '推荐量'
      },
      min_price: {
        type: DECIMAL(10, 2),
        allowNull: true,
        comment: '起售价（最低售价，多少元起）'
      },
      history_min_price: {
        type: DECIMAL(10, 2),
        allowNull: true,
        comment: '历史最低价'
      },
      coupon_price: {
        type: DECIMAL(10, 2),
        allowNull: true,
        comment: '券后价'
      },
      discount_price: {
        type: DECIMAL(10, 2),
        allowNull: true,
        comment: '折后价'
      },
      spike_price: {
        type: DECIMAL(10, 2),
        allowNull: true,
        comment: '秒杀价'
      },
      other_price: {
        type: DECIMAL(10, 2),
        allowNull: true,
        comment: '其它设置价（如:首件价，新客价，30天低价等等）'
      },
      unit: {
        type: STRING(10),
        allowNull: true,
        defaultValue: '件',
        comment: '商品单位（默认：件）'
      },
      stock: {
        type: INTEGER(11),
        allowNull: true,
        defaultValue: 0,
        comment: '库存'
      },
      min_stock: {
        type: INTEGER(11),
        allowNull: true,
        defaultValue: 0,
        comment: '库存预警'
      },
      stock_display: {
        type: INTEGER(1),
        allowNull: true,
        defaultValue: 0,
        comment: '库存显示：0隐藏 1显示'
      },
      ischeck: {
        type: INTEGER(1),
        allowNull: true,
        defaultValue: 0,
        comment: '审核状态：0审核中 1通过 2拒绝（不通过）'
      },
      goods_status: {
        type: INTEGER(1),
        allowNull: true,
        defaultValue: 1,
        comment: '商品状态：0仓库（未上架）、1上架、2下架、3违规下架、4回收站等'
      },
      sku_value: {
        type: TEXT,
        allowNull: true,
        comment: '商品规格属性（商品参数）'
      },
      goods_tags: {
        type: STRING(2000),
        allowNull: true,
        comment: '商品标签（如：近期销量飙升，30天上新，近7天同类热卖，24小时内发货，等等，用逗号隔开）'
      },
      order: {
        type: INTEGER,
        allowNull: true,
        defaultValue: 50,
        comment: '排序，默认50'
      },
      status: {
        type: INTEGER(1),
        allowNull: false,
        defaultValue: 1,
        comment: '可用状态：0禁用 1启用'
      },
      create_time: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '创建时间'
      },
      update_time: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        comment: '更新时间'
      },
      delete_time: {
        type: DATE,
        allowNull: true,
        comment: '删除时间'
      }
    });

    // 添加索引优化查询
    await queryInterface.addIndex('goods', ['goods_class_id']);
    await queryInterface.addIndex('goods', ['status']);
    await queryInterface.addIndex('goods', ['goods_status']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('goods');
  }
};
```
> 3. 执行迁移文件命令生成数据库表：
>> ```js
>> // 创建数据库
>> npx sequelize db:migrate
>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>> npx sequelize db:migrate:undo
>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>> npx sequelize db:migrate:undo:all
>> ```

### 2. 商品表`goods`的外联表`goods_banner`[商品图片表]字段设计
| 字段名  |  数据类型及描述    |   空    | <p style="width:150px;">默认值 </p>  | <p style="width:100px;">字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id </b>  | <span>int(20) </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |    |         主键id  |
| <b>goods_id </b>      | int(20) | 否    |                               |   商品`goods`表的id            |
| <b>url </b>      | varchar(1000) |     否    |              |   商品图片地址                        |
| <b>order </b>     | int(11) |  是    |       50                 |   排序，默认50            |
| <b> status </b>  | int(1)  |    否    |        1	 |   可用状态：0禁用1启用                         |
| <b> create_time </b>  | datetime  |    否    |      CURRENT_TIMESTAMP	   |   数据创建时间                         |
| <b> update_time </b>  | datetime  |      否  |        CURRENT_TIMESTAMP	|   数据更新时间                         |

### 创建商品图片表 `goods_banner`
> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建`goods_banner`表：
>> 1. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=goods_banner
>> ```
>> 2. 创建迁移文件 `goods_banner.js`，内容如下：<br/>
```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = Sequelize;
    // 创建表 --- 类似我们sql语句定义表结构
    await queryInterface.createTable('goods_banner', {
      id: { 
        type: INTEGER(20).UNSIGNED, 
        primaryKey: true, 
        autoIncrement: true,
        comment: '主键id'
      },
      goods_id:{
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
      url: { 
        type: STRING(1000), 
        allowNull: false, 
        defaultValue: '', 
        comment: '图片地址'
      },
      order: {
        type: INTEGER,//不限定长度.默认int(11)
        allowNull: true,
        defaultValue: 50,
        comment: '排序，默认50'
      },
      status:{
        type: INTEGER(1),
        allowNull: false, 
        defaultValue:1,
        comment: '状态：1：启用，0：禁用'
      },
      // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
      create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
      update_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('goods_banner')
  }
};
```
> 3. 执行迁移文件命令生成数据库表：
>> ```js
>> // 创建数据库
>> npx sequelize db:migrate
>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>> npx sequelize db:migrate:undo
>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>> npx sequelize db:migrate:undo:all
>> ```


### 3. 商品表`goods`的外联表`goods_param`[商品参数表]字段设计
| 字段名  |  数据类型及描述    |   空    | <p style="width:150px;">默认值 </p>  | <p style="width:100px;">字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id </b>  | <span>int(20) </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |    |         主键id  |
| <b>goods_id </b>      | int(20) | 否    |                               |   商品`goods`表的id            |
| <b>paraminfo </b>      | varchar(5000) |     否    |   |   商品参数信息(skus表每个属性的键值对数据)|
| <b>order </b>     | int(11) |  是    |       50                 |   排序，默认50            |
| <b> status </b>  | int(1)  |    否    |        1	 |   可用状态：0禁用1启用                         |
| <b> create_time </b>  | datetime  |    否    |      CURRENT_TIMESTAMP	   |   数据创建时间   |
| <b> update_time </b>  | datetime  |      否  |        CURRENT_TIMESTAMP	|   数据更新时间   |

### 创建商品参数表 `goods_param`
> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建`goods_param`表：
>> 1. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=goods_param
>> ```
>> 2. 创建迁移文件 `goods_param.js`，内容如下：<br/>
```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = Sequelize;
    // 创建表 --- 类似我们sql语句定义表结构
    await queryInterface.createTable('goods_param', {
      id: { 
        type: INTEGER(20).UNSIGNED, 
        primaryKey: true, 
        autoIncrement: true,
        comment: '主键id'
      },
      goods_id:{
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
      status:{
        type: INTEGER(1),
        allowNull: false, 
        defaultValue:1,
        comment: '状态：1：启用，0：禁用'
      },
      // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
      create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
      update_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('goods_param')
  }
};
```
> 3. 执行迁移文件命令生成数据库表：
>> ```js
>> // 创建数据库
>> npx sequelize db:migrate
>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>> npx sequelize db:migrate:undo
>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>> npx sequelize db:migrate:undo:all
>> ```


### 4. 商品表`goods`的选购sku表`goods_sku`[商品选购sku表]字段设计
| 字段名  |  数据类型及描述    |   空    | <p style="width:150px;">默认值 </p>  | <p style="width:100px;">字段含义 </p>     |
| :---:   | :---:      |  :---:    | :---:       |        :---:                             |
| <b>id </b>  | <span>int(20) </span><br/> <span style="font-size:12px">主键、自增长、UNSIGNED无符号 </span>    |    否      |    |         主键id  |
| <b>goods_id </b>      | int(20) | 否    |                               |   商品`goods`表的id            |
| <b>name </b>      | varchar(255) |     否    |   |   选购组合名称  |
| <b>cover </b>      | varchar(2000) |     是    |   |   选购组合封面图  |
| <b>stock </b>      | int(11) | 是    |       0                        |   商品选购组合库存数量          |
| <b>price </b>      | decimal(10,2) | 是    |                               |   商品选购组合价格        |
| <b>special_price </b>      | decimal(10,2) | 是    |      |   商品选购组合优惠价格        |
| <b>order </b>     | int(11) |  是    |       50                 |   排序，默认50            |
| <b> status </b>  | int(1)  |    否    |        1	 |   可用状态：0禁用1启用                         |
| <b> create_time </b>  | datetime  |    否    |      CURRENT_TIMESTAMP	   |   数据创建时间   |
| <b> update_time </b>  | datetime  |      否  |        CURRENT_TIMESTAMP	|   数据更新时间   |

### 创建商品参数表 `goods_sku`
> 1. 直接在`phpMyAdmin`中根据表字段设计创建表，或者通过数据库插件写sql语句创建表。<br/>
> 2. 通过迁移命名创建`goods_sku`表：
>> 1. 创建迁移文件 命令：
>> ```js
>> npx sequelize migration:generate --name=goods_sku
>> ```
>> 2. 创建迁移文件 `goods_sku.js`，内容如下：<br/>
```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT,DECIMAL} = Sequelize;
    // 创建表 --- 类似我们sql语句定义表结构
    await queryInterface.createTable('goods_sku', {
      id: { 
        type: INTEGER(20).UNSIGNED, 
        primaryKey: true, 
        autoIncrement: true,
        comment: '主键id'
      },
      goods_id:{
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
      status:{
        type: INTEGER(1),
        allowNull: false, 
        defaultValue:1,
        comment: '状态：1：启用，0：禁用'
      },
      // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
      create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
      update_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('goods_sku')
  }
};
```
> 3. 执行迁移文件命令生成数据库表：
>> ```js
>> // 创建数据库
>> npx sequelize db:migrate
>> // 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
>> npx sequelize db:migrate:undo
>> // 可以通过 `db:migrate:undo:all` 回退到初始状态
>> npx sequelize db:migrate:undo:all
>> ```