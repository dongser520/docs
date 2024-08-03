---
navbar: true
sidebar: auto
title: mysql数据库基础
---

> 千呼万唤始出来！ 同学们终于等到我们的数据库章节了。我们在前面的案例，大家已经学习了通过eggjs + postman测试工具完成留言数据写入json文件的功能。我们在前面也说过了，如果你的网站或者系统或者小程序什么的功能比较小、数据量不大，我们用json文件作为数据库是完全够用的，比如说我们前面的留言板系统，如果用户留言数量不多，比如说一年只有一千条留言，用json文件记录用户留言信息没什么问题。但是如果每天就有几百条留言，一个月就有上万条留言，那么使用json文件作为用户留言的数据库显然是不合适了，因为大家知道我们的json文件内容是通过nodejs中的系统模块fs模块读取数据处理的，当数据量大的时候，读取会慢一些，因此，我们可以采用专门存储数据的一个东西，那么这个东西就是我们所说的数据库。<br/>
> 提到数据库，我们在前面也给大家提过了，出名且用得比较多的数据库：
> 1. oracle : 优秀、商用的数据库，一般用在银行、金融等大型系统中
> 2. MongoDB : 非关系型数据库，也就是它的值是通过键值对的形式存的，或者文档形式存的
> 3. sqLite : 嵌入式数据库，比如嵌入我们的桌面程序或者app里面，去当一个小型数据库
> 4. SQL Server : 关系型数据库，是由微软公司开发的，是Windows操作系统的绝配
> 5. MySQL : 关系型数据库，免费开源，适用于多个操作系统，包括Windows、Linux和UNIX。
> 关于SQL Server 和 MySQL 各有各的特点，由于MySQL使用更加广泛，因此将带领大家来学习MySQL数据库。（老师在大学学习的是C#编程因此当时学习的数据库自然而然是SQL Server，如果我们的学员中对SQL Server数据库感兴趣，也可以一起探讨）。

那么什么是关系型数据库呢？
> 在关系型数据库中，数据以结构化的方式存储，其中每个表格由一组列（字段）和一组行（记录）组成。每个列定义了数据的类型和属性，而每个行则表示一个特定的数据实例。表格之间的关系通过使用`主键`和`外键`进行建立。主键是唯一标识表格中每个行的列，而外键是指向其他表格主键的列，用于建立表格之间的关联关系。(同学们第一次接触数据库，对于这段话可能比较懵，不要紧，我们将在接下来通过案例让大家明白这句话的意思)

## 一、安装mysql数据库
### 1. 下载mysql数据库程序安装
> 安装mysql数据库的方式非常之多，你可以直接下载mysql数据库：<a href="https://www.mysql.com/" target="_blank">https://www.mysql.com/</a> 找到 `DOWNLOADS`-> `MySQL Community (GPL) Downloads »`-> `MySQL Community Server`-> `选择对应版本和你电脑操作系统下载即可`，如：`Windows (x86, 64-bit), MSI Installer  msi可以直接进行安装`，对应地址：<a href="https://dev.mysql.com/downloads/mysql/" target="_blank"> https://dev.mysql.com/downloads/mysql/ </a> --> `No thanks, just start my download. 无需登录直接下载`

以上方式对于新手学员可以尝试安装，但是老师更推荐使用集成环境UPUPW，因为对新手学员更友好。
### 2. 集成环境UPUPW（推荐）安装
> 1. 学习过 `第二学期第1季`的同学，无需安装，因为你已经在`第二学期第1季--章节18--对应视频课程120课：搭建本地服务器通用方法`安装过了UPUPW软件
> 2. 没有学习过`第二学期第1季`的同学，百度搜索`UPUPW`找到官网下载安装，对应下载地址：<a href="https://php.upupw.net/ank2downloads/38/6698.html" target="_blank"> https://php.upupw.net/ank2downloads/38/6698.html </a> ，安装非常简单，实在不会的同学，回去看一下我们 `第二学期第1季--章节18--对应视频课程120课：搭建本地服务器通用方法`<a href="https://study.163.com/course/courseLearn.htm?courseId=1213550818&share=2&shareId=480000002289674#/learn/video?lessonId=1285539432&courseId=1213550818" target="_blank"> 【点击查看课程视频】 </a>课程视频


关于安装包，大家可以去群文件里面下载本节课的课件，课件里面有安装包【<a href="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/software/UPUPW_ANK_W64_V1.1.8.rar" >点击下载群里的UPUPW安装包</a>】。

## 二、简单操作mysql数据库（sql语句）
#### 安装数据库插件：DataBase Client
> 1. 打开upupw，给mysql数据库设置一个密码，找到`数据库管理`-->`账户密码`--> `更改密码`
> 2. 打开vscode，安装扩展插件：搜索`database`，找到插件`DataBase Client`安装，完成后连接数据库，密码就是上一步设置的密码
> 3. 连接成功后，点+创建一个数据库如`myegg01`, 然后我们也可以创建一张数据库表 `message`,可以点击`Tables右边的+建表`，将 `table_name`换成你要创建的表名`message`(关于括号里面的代码什么意思我们会在下一节课详细讲解)，然后执行sql就有了一张表，然后可以向表里面添加内容

### 1. 查看数据库
```sql
show databases
```
### 2. 创建数据库
```sql
create database 库名 
create database `myegg`
再次执行会报错 database exists 也就是数据库已经存在了不能重复创建相同名称的数据库

完整语句： create database if not EXISTS  `myegg`
翻译：如果数据库 `myegg`不存在就创建，存在则什么都不做，就是宁愿什么都不做，也不能报错

一般还会设置一下数据库字符集
create database if not EXISTS  `myegg`
DEFAULT CHARACTER SET = 'utf8mb4';
```

### 3. 创建数据表
```sql
# 比如说表名叫做：message，表中的字段有：id、username、tel、message、timestamp、create_time/update_time、telnumber
# 字段： 字段名称  字段的类型  字段的属性 描述
# 一般每张表，我们都会给它一个id字段，它比较特殊，一般是：
# int数值类型，不能为空，主键，自增（每次新增一条数据自己+1），描述
# username 称呼，字符串类型VARCHAR(30)最大255，
# tel 电话号码加密过的，字符串类型VARCHAR(32)最大255，
# message 留言内容，字符串类型 TEXT 不限制字数
# timestamp 时间戳，数值类型 TIMESTAMP, 不用手动添加时间戳获取系统当前时间戳 DEFAULT CURRENT_TIMESTAMP
# create_time 创建时间可有可没有，一般建议加上，给管理员或者程序员查看的  DEFAULT CURRENT_TIME
# update_time 更新时间可有可没有，一般建议加上，给管理员或者程序员查看的  DEFAULT CURRENT_TIME
# telnumber 电话号码未加密 INT(11)
CREATE TABLE IF NOT EXISTS  message(
   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '留言板主键id',
   username VARCHAR(30) NOT NULL  COMMENT '留言用户的称呼',
   tel VARCHAR(32) NOT NULL  COMMENT '留言用户的电话号码加密',
   telnumber INT(11) NOT NULL COMMENT '留言用户的电话号码',
   message TEXT COMMENT '留言用户的留言信息',
   timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '留言用户的留言时间戳',
   create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '数据创建时间',
   update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '数据更新时间'
) COMMENT '留言表';
```

### 4. 改变数据表名
```sql
ALTER Table `message` RENAME `messages`;
-- ALTER 改变数据表 `message` RENAME 重命名 `messages`

ALTER Table `messages` RENAME `message`;
```
### 5.给数据表新增一个字段
```sql
ALTER Table message ADD COLUMN ip VARCHAR(128) COMMENT '留言用户的ip地址';

ALTER Table message ADD COLUMN city VARCHAR(128) COMMENT '留言用户所在城市', 
ADD COLUMN country VARCHAR(20) COMMENT '留言用户所在国家';
```

### 6.删除表中的某个字段
```sql
ALTER TABLE message DROP ip;

ALTER TABLE message DROP city, DROP country;
```

### 7.重新编辑（修改）表中的某个字段属性
```sql
ALTER TABLE message MODIFY tel VARCHAR(64) NOT NULL COMMENT '留言用户的电话号码加密信息';

-- 修改列名及属性描述
ALTER TABLE message CHANGE tel tels VARCHAR(64) NOT NULL COMMENT '留言用户的电话号码加密信息';
```

### 8. mysql的查询语句
```sql
# 查询单个列（字段）数据，如：称呼
# SELECT 列名（字段名） FROM 表名
SELECT username FROM message
```
```sql
# 查询多个列（多个字段）数据，如：username,tel,message
# SELECT 字段1,字段2,字段3 FROM 表名
SELECT username,tel,message FROM message
```
```sql
# 查询所有列（所有字段）数据
# SELECT 字段1,字段2,字段3,... FROM 表名
# SELECT * FROM 表名
-- SELECT * FROM message;
SELECT id,username,tel,message,telnumber,timestamp,create_time,update_time FROM message
```
```sql
# 给字段设置别名 as关键字
SELECT id,username as chenghu,tel as jiamiTel,message FROM message;
```
```sql
# 排序 （默认升序asc 可不填，降序 desc）
SELECT * FROM message;
SELECT * FROM message ORDER BY id DESC;
SELECT * FROM message ORDER BY timestamp DESC;
# 多字段排序
SELECT * FROM message ORDER BY timestamp DESC,id DESC ;
```
```sql
# 限制查询结果条数(常用于分页)
-- 一个参数表示从数据最开始的位置取多少条
SELECT * FROM message LIMIT 4;
-- 如果是两个参数：参数1表示开始行，索引从0开始，第二个参数是取多少条
SELECT * FROM message LIMIT 0,3;
SELECT * FROM message LIMIT 1,4;
```
```sql
# 单条件查询 WHERE 字段名=值
SELECT * FROM message;
SELECT * FROM message WHERE username='岳云鹏';

# 多条件查询 WHERE 字段名=值 AND/OR 字段名=值 
SELECT * FROM message WHERE username='岳云鹏' AND telnumber=2147483647;
SELECT * FROM message WHERE username='岳云鹏' OR telnumber = 0;
```
```sql
# 模糊查询 where是值完全相等，模糊查询是某个值匹配上即可 like
SELECT * FROM message ;
-- 含有‘黄’字符的均可 
SELECT * FROM message WHERE username LIKE '%黄%' ;
-- 以‘黄’字开头，其他不管
SELECT * FROM message WHERE username LIKE '黄%' ;
-- 以‘黄’字结尾，其他不管
SELECT * FROM message WHERE username LIKE '%黄' ;
```
```sql
# 模糊查询 限定模糊字数匹配 用 _ 
SELECT * FROM message;
SELECT * FROM message WHERE username LIKE '%云%';
-- 匹配字符限定前面字符数 用下划线 _ 一个下划线表示占一个字符 两个下划线表示两个字符
SELECT * FROM message WHERE username LIKE '_云%';
SELECT * FROM message WHERE username LIKE '__云%';
```
### 9. mysql的新增语句
```sql
# 新增单条语句
-- INSERT INTO 表名(字段1,字段2,字段3,...) VALUES(值1,值2,值3,...)
INSERT INTO message(username,tel,telnumber,message) 
VALUES('古巨基','15udf5556e6c019d61e0uydd1daeaa3d',13874745858,'请及时联系，我想跟贵公司合作');

# 新增多条语句
-- INSERT INTO 表名(字段1,字段2,字段3,...) VALUES(值1,值2,值3,...),(值a,值b,值c,...)
INSERT INTO message(username,tel,telnumber,message) 
VALUES
('梁咏琪','15udf5556e6c019d61e0uydd1daeaa3d',13874745858,'请及时联系，我想跟贵公司合作'),
('华仔','54op75556e6c019d61e0uydd1daeaa3d',13908085858,'随时给我电话');
```

### 10. mysql的更新(修改)数据语句
```sql
# 更新(修改)数据语句
UPDATE 表名 SET 字段1 = 修改的值,字段2 = 修改的值....  WHERE 条件;

UPDATE message SET username = '黄先生',telnumber=13874747585 WHERE id = 3;
```

### 11. mysql的删除数据语句
```sql
# mysql的删除数据语句
-- DELETE FROM 表名 条件

DELETE FROM message WHERE id = 22;
DELETE FROM message WHERE username = '老莫';

# mysql批量删除
DELETE FROM message WHERE id IN(20,21,22);

```

## 三、mysql子查询和连表查询
注：在学习 `第二学期-第三季度课程-章节4-五、mysql语句进一步理解模型关联关系（Mysql进阶）`，对应课程视频：`第二学期-第三季度课程-章节4-79课`再来看这部分文档，`不要跳课学习`
### 1. mysql子查询
```sql
# mysql子查询
# 在刷礼物记录表查  直播间id=4的数据
# 子查询规则：子查询必须要用小括号包起来
SELECT * FROM live_livegift 
WHERE live_id = (SELECT id FROM live WHERE id = 4);
# 括号里面的语句结果
SELECT id FROM live WHERE id = 4;
# 子查询其实就是两条语句组合在一起，一条是主查询，一条是子查询，比较容易理解
# 但很多时候，我希望在查询礼物表的时候，你把直播间表，用户表，礼物表的数据都给我查出来
# 很显然，子查询无法满足，这个时候需要用到连表查询
```
### 2. mysql连表查询
连表查询分为：<br/>
### 1. 内连接：<br/>
目的：把两个表的数据合并到一起，比如：上面说的 礼物表和直播间表数据合并在一起
```sql

SELECT * FROM live_livegift,live 
WHERE live_livegift.live_id = live.id;

# 反过来
SELECT * FROM live,live_livegift 
WHERE live.id = live_livegift.live_id;
# 发现有数据丢失：直播间id:2、3的直播间没有了
# 此时需要用到外连接
```
### 2. 外连接，外连接又分为：<br/>
### ① 左连接
### ② 右连接
```sql
# 外连接
# 左连接：LEFT JOIN [表名] ON [连接的条件]
SELECT * FROM live LEFT JOIN live_livegift 
ON live.id = live_livegift.live_id;
# 发现数据没有丢失，没有数据的以NULL填充
# 说明：
# LEFT JOIN 左边的表 live 表为主表（驱动表）
# 查询的数据以主表（驱动表）为主，如果没有，则填充NULL


## 同理
## 右连接 RIGHT JOIN 右边的表 为主表（驱动表）
## 就是以右边的表 live_livegift （驱动表） 为主
SELECT * FROM live RIGHT JOIN live_livegift 
ON live.id = live_livegift.live_id;
# 发现查出来的结果就是9条，因为live_livegift （驱动表）就只有9条数据
```
搞清楚了以上知识之后，我们来分析一下模型关联中的：反向一对多 `belongsTo`的执行原理
```sql
# 礼物记录表所有数据
select * from live_livegift;
# 字段方式读取数据
SELECT id, live_id, liveuser_id, livegift_id, create_time, update_time FROM live_livegift;
# 给表设置别名
SELECT id, live_id, liveuser_id, livegift_id, create_time, update_time 
FROM live_livegift AS `live_livegift`;
# 表别名指定表字段
SELECT 
`live_livegift`.id, `live_livegift`.live_id, liveuser_id, livegift_id, create_time, update_time 
FROM live_livegift AS `live_livegift`;
# 表别名，字段名最好都加上反引号，而且全部指定
SELECT  
`live_livegift`.`id`, `live_livegift`.`live_id`, `live_livegift`.`liveuser_id`, 
`live_livegift`.`livegift_id`, `live_livegift`.`create_time`, `live_livegift`.`update_time`
FROM `live_livegift` AS `live_livegift`;
# 字段也可以设置别名字段
SELECT  
`live_livegift`.`id`, 
`live_livegift`.`live_id`, `live_livegift`.`live_id` AS `liveId`, 
`live_livegift`.`liveuser_id`, `live_livegift`.`liveuser_id` AS `liveuserId`, 
`live_livegift`.`livegift_id`, `live_livegift`.`livegift_id` AS `livegiftId`,
`live_livegift`.`create_time`, 
`live_livegift`.`update_time`
FROM `live_livegift` AS `live_livegift`;


# 礼物表 直播间id=4的记录
SELECT  
`live_livegift`.`id`, 
`live_livegift`.`live_id`, `live_livegift`.`live_id` AS `liveId`, 
`live_livegift`.`liveuser_id`, `live_livegift`.`liveuser_id` AS `liveuserId`, 
`live_livegift`.`livegift_id`, `live_livegift`.`livegift_id` AS `livegiftId`,
`live_livegift`.`create_time`, 
`live_livegift`.`update_time`
FROM `live_livegift` AS `live_livegift`
WHERE 
`live_livegift`.`live_id` = '4';

# 这里表里面用户都是id表示的，把用户信息显示一下
# 用到联表查询： LEFT OUTER JOIN 联哪张表 ON 两张表的关联字段
SELECT  
`live_livegift`.`id`, 
`live_livegift`.`live_id`, `live_livegift`.`live_id` AS `liveId`, 
`live_livegift`.`liveuser_id`, `live_livegift`.`liveuser_id` AS `liveuserId`, 
`live_livegift`.`livegift_id`, `live_livegift`.`livegift_id` AS `livegiftId`,
`live_livegift`.`create_time`, 
`live_livegift`.`update_time`,
`liveuser`.`id` AS `liveuser.id`, 
`liveuser`.`username` AS `liveuser.username`, 
`liveuser`.`avatar` AS `liveuser.avatar`
FROM `live_livegift` AS `live_livegift`
LEFT OUTER JOIN 
`liveuser` AS `liveuser` 
ON `live_livegift`.`liveuser_id` = `liveuser`.`id`
WHERE 
`live_livegift`.`live_id` = '4';

# 再连礼物表
SELECT  
`live_livegift`.`id`, 
`live_livegift`.`live_id`, `live_livegift`.`live_id` AS `liveId`, 
`live_livegift`.`liveuser_id`, `live_livegift`.`liveuser_id` AS `liveuserId`, 
`live_livegift`.`livegift_id`, `live_livegift`.`livegift_id` AS `livegiftId`,
`live_livegift`.`create_time`, 
`live_livegift`.`update_time`,
`liveuser`.`id` AS `liveuser.id`, 
`liveuser`.`username` AS `liveuser.username`, 
`liveuser`.`avatar` AS `liveuser.avatar`,
`livegift`.`id` AS `livegift.id`, 
`livegift`.`name` AS `livegift.name`, 
`livegift`.`image` AS `livegift.image`, 
`livegift`.`coin` AS `livegift.coin`, 
`livegift`.`create_time` AS `livegift.create_time`, 
`livegift`.`update_time` AS `livegift.update_time` 
FROM `live_livegift` AS `live_livegift`
LEFT OUTER JOIN 
`liveuser` AS `liveuser` 
ON `live_livegift`.`liveuser_id` = `liveuser`.`id`
LEFT OUTER JOIN 
`livegift` AS `livegift` 
ON `live_livegift`.`livegift_id` = `livegift`.`id`
WHERE 
`live_livegift`.`live_id` = '4';

# egg.js项目中，终端打印的模型查询语句：
# 查看直播间（id=4）刷礼物表的查询语句：
SELECT 
`live_livegift`.`id`, `live_livegift`.`live_id`, `live_livegift`.`liveuser_id`, 
`live_livegift`.`livegift_id`, `live_livegift`.`create_time`, 
`live_livegift`.`update_time`, `live_livegift`.`live_id` AS `liveId`, 
`live_livegift`.`liveuser_id` AS `liveuserId`, `live_livegift`.`livegift_id` AS `livegiftId`, 
`liveuser`.`id` AS `liveuser.id`, `liveuser`.`username` AS `liveuser.username`, 
`liveuser`.`avatar` AS `liveuser.avatar`, 
`livegift`.`id` AS `livegift.id`, `livegift`.`name` AS `livegift.name`, 
`livegift`.`image` AS `livegift.image`, `livegift`.`coin` AS `livegift.coin`, 
`livegift`.`create_time` AS `livegift.create_time`, 
`livegift`.`update_time` AS `livegift.update_time` 
FROM 
`live_livegift` AS `live_livegift` 
LEFT OUTER JOIN 
`liveuser` AS `liveuser` 
ON `live_livegift`.`liveuser_id` = `liveuser`.`id` 
LEFT OUTER JOIN 
`livegift` AS `livegift` 
ON `live_livegift`.`livegift_id` = `livegift`.`id` 
WHERE 
`live_livegift`.`live_id` = '4';

# 和我们自己写的查询语句一样
```
通过我们自己分析，及写连表查询语句，同学们很好的理解了egg.js项目中模型关联中的：`反向一对多` `belongsTo`的执行原理。<br/>
当然其他的模型：`一对一 hasOne` `一对多 hasMany` `多对多 belongsToMany` 其实也是这种原理，只是执行的sql语句不同而已，当然这个我们后面讲项目的时候，用到的时候再继续给大家深入讲解。