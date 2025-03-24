---
navbar: true
sidebar: auto
title: thinkphp框架管理员登录和退出
---

## 一、管理员登录（初步登录流程）
> ### 1. 路由 `app/route/admin.php`
>> ```php
>> ...
>> //不需要登录就能访问的接口（游客也可以）
>> Route::group('admin',function(){
>>     //管理员登录
>>     Route::post('login','admin.ShopManager/login');
>> })->allowCrossDomain();
>> /*
>> //创建管理员
>> Route::post('admin/shopmanager','admin.ShopManager/save');
>> //管理员列表
>> Route::get('admin/shopmanager/:page','admin.ShopManager/index');
>> */
>> // 必须是登录之后，才能访问（管理员身份）
>> Route::group('admin',function(){
>>     //删除管理员
>>     Route::post('shopmanager/:id/delete','admin.ShopManager/delete');
>>     //更新管理员的信息提交数据库
>>     Route::post('shopmanager/:id','admin.ShopManager/update');
>>     //创建管理员
>>     Route::post('shopmanager','admin.ShopManager/save');
>>     //管理员列表
>>     Route::get('shopmanager/:page','admin.ShopManager/index');
>> });
>> ```
> ### 2. 验证器 `app/validate/admin/ShopManager.php`
>> ```php
>> ...
>> // 管理员登录验证场景
>> public function sceneLogin(){
>>     return $this->only(['username', 'password'])
>>     // 追加自定义验证规则：验证登录
>>     ->append('password','checklogin');
>> }
>> 
>> //验证登录
>> public function checklogin($value, $rule='', $data='', $field='', $title='', $message=''){
>>     // 验证账号
>>     $M = \app\model\ShopManager::where('username', $data['username'])->find();
>>     if(!$M) return '账号不存在';
>>     // 账号存在则验证密码
>>     if(!password_verify($data['password'], $M->password)){
>>         return '密码错误';
>>     }
>>     // 密码也正确，则登录成功，将当前用户实例挂载到request, 自定义在UserModel中，方便后期获取管理员信息
>>     request() -> UserModel = $M;
>>     // 返回true
>>     return true;
>> }
>> ```
> ### 3. 控制器 `app/controller/admin/ShopManager.php`
>> ```php
>> //管理员登录
>> public function login(){
>>     return apiSuccess('登录成功');
>> }
>> ```
