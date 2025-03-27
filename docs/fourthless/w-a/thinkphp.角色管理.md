---
navbar: true
sidebar: auto
title: thinkphp框架角色role表管理文档
---

# thinkphp框架角色role表管理[增删改]文档
## 一、创建角色
### 1. 接口说明
> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/role` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/role>  
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | status     |  是         |  int  |  状态值：0不可用，1可用     |
> | name     |  是         |  string  |  角色名称，最多30个字符     |
> | desc     |  否         |  string  |  角色描述，最多255个字符     |
> 
> 5. 返回
> ```js
> {
>     "msg": "ok",
>     "data": true
> }
> ```
### 2. 控制器代码
`app/controller/admin/Role.php`
> ```php
> //创建角色
> public function save(Request $request)
> {
>     // $param = $request -> only(['name','desc','status']);
>     $param = $request -> param();
>     $res =  $this->model -> save($param);
>     return apiSuccess($res);
> }
> ```
### 3. 验证器代码
`app/validate/admin/Role.php`
> ```php
> ...
> class Role extends Validate
> {
>     protected $rule = [
>         ...
> 
>         'status' => 'require|integer|in:0,1',
>         'name' => 'require|max:30',
>         'desc' => 'max:255',
>     ];
> 
>     ...
>     //定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
>     protected $scene = [
>         ...
>         //创建角色
>         'save' => ['status','name','desc'],
>     ];
> }
> ```
### 4. 路由
`route/admin.php`
> ```php
> // 必须是登录之后，才能访问（管理员身份）
> Route::group('admin',function(){
>     ...
>     //创建角色
>     Route::post('role','admin.Role/save');
>     //角色列表
>     Route::get('role/:page','admin.Role/index');
>     
> //加入中间件代码
> })->middleware(\app\middleware\checkShopManagerToken::class);
> ```
