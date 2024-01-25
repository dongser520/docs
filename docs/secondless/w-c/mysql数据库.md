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
> 2. 没有学习过`第二学期第1季`的同学，百度搜索`UPUPW`找到官网下载安装，对应下载地址：<a href="https://php.upupw.net/ank2downloads/38/6698.html" target="_blank"> https://php.upupw.net/ank2downloads/38/6698.html </a> ，安装非常简单，实在不会的同学，回去看一下我们 `第二学期第1季--章节18--对应视频课程120课：搭建本地服务器通用方法`课程视频

关于安装包，大家可以去群文件里面下载本节课的课件，课件里面有安装包。

## 二、简单操作mysql数据库（sql语句）
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
# tel 电话号码加密过的，字符串类型VARCHAR(64)最大255，
# message 留言内容，字符串类型 TEXT 不限制字数
# timestamp 时间戳，数值类型 TIMESTAMP, 不用手动添加时间戳获取系统当前时间戳 DEFAULT CURRENT_TIMESTAMP
# create_time 创建时间可有可没有，一般建议加上，给管理员或者程序员查看的  DEFAULT CURRENT_TIME
# update_time 更新时间可有可没有，一般建议加上，给管理员或者程序员查看的  DEFAULT CURRENT_TIME
# telnumber 电话号码未加密 INT(11)
CREATE TABLE `message`(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '留言表主键id',
    username VARCHAR(30) COMMENT '留言用户的称呼',
    tel VARCHAR(64) COMMENT '留言用户的加密电话号码',
    message TEXT  COMMENT '留言用户的留言内容',
    timestamp  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '数据创建时间',
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '数据更新时间',
    telnumber INT(11) COMMENT '留言用户的未加密电话号码'
) COMMENT '留言表';
```