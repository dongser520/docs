---
navbar: true
sidebar: auto
title: thinkphp框架管理员板块
---

## 一、创建管理员
> 很显然，创建管理员是需要操作我们上节课创建的数据库表`shop_manager`，那么操作表它跟我们的`egg.js`框架一样，需要创建表模型 <br/>
> 大家可以：通过命令`php think`可以查看 `tp6` 框架的所有命令 <br/>
### ① 创建表模型文件
> 查看命令之后，通过：`php think make:model ShopManager`，创建`shop_manager`表模型，注意：首字母大写，下划线改成驼峰式，多了`app/model/ShopManager.php`文件 <br/>
### ② 创建控制器文件
> 查看命令之后，通过：`php think make:controller ShopManager`，注意：首字母大写，下划线改成驼峰式， 多了`app/controller/ShopManager.php`文件 <br/>

重点说明：我们的项目分前端和后端，因此，我们可以仿照我们的`egg.js`项目`myegg`，也将控制器分为前后端，因此，我们的控制器可以这样创建：`php think make:controller admin/ShopManager` <br/>

一般开发流程：`跟我们egg.js项目一样，定义完方法，方法里面返回一些内容，然后定义路由，看方法能不能跑通` <br/>
举例:<br/>
> 1. 控制器 `app/controller/admin/ShopManager.php`
>> ```php
>>     /**
>>      * 创建管理员
>>      *
>>      * @param  \think\Request  $request
>>      * @return \think\Response
>>      */
>>     public function save(Request $request)
>>     {
>>         //跟我们egg.js项目一样，定义完方法，方法里面返回一些内容
>>         //定义路由，看方法能不能跑通
>>         return apiSuccess('创建管理员成功');
>>     }
>> ```
> 2. 新建一个`admin.php`管理所有后端路由，定义路由 `route/admin.php`
>> ```php
>> <?php
>> use think\facade\Route;
>> 
>> Route::post('admin/shopmanager','admin.ShopManager/save');
>> ```
> 3. 在 `postman`测试一下这个路由是否可以跑通
