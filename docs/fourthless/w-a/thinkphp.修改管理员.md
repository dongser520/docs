---
navbar: true
sidebar: auto
title: thinkphp框架修改管理员
---

## 一、修改管理员
> 查看tp框架文档，找到`模型-更新`<https://www.kancloud.cn/manual/thinkphp6_0/1037583> <br/>
> 当然，它的更新逻辑和我们的`egg.js`框架也是差不多的，只是语法不一样，搜索`egg.js项目sequelize模型更新数据`回忆一下`egg.js`框架的更新用法<br/>
>> 1. 路由 `route/admin.php`
>>> ```php
>>> ...
>>> /*
>>> //创建管理员
>>> Route::post('admin/shopmanager','admin.ShopManager/save');
>>> //管理员列表
>>> Route::get('admin/shopmanager/:page','admin.ShopManager/index');
>>> */
>>> 
>>> Route::group('admin',function(){
>>>     //更新管理员信息
>>>     Route::post('shopmanager/:id','admin.ShopManager/update');
>>>     //创建管理员
>>>     Route::post('shopmanager','admin.ShopManager/save');
>>>     //管理员列表
>>>     Route::get('shopmanager/:page','admin.ShopManager/index');
>>>     
>>> });
>>>```
>> 2. 验证器 `app/validate/admin/ShopManager.php`
>>> ```php
>>> <?php
>>> ...
>>> class ShopManager extends Validate
>>> {
>>>     /**
>>>      * 定义验证规则
>>>      * 格式：'字段名' =>  ['规则1','规则2'...]
>>>      *
>>>      * @var array
>>>      */
>>>     protected $rule = [
>>>         'page' => 'require|integer|>:0',
>>>         'id' => 'require|integer|>:0',
>>>         'username' => 'require|max:25|min:6',
>>>         'password' => 'require|max:20|min:6',
>>>         'avatar' => 'url',
>>>         'role_id' => 'require|integer|>:0',
>>>         'status' => 'require|integer|in:0,1',
>>>     ];
>>> 
>>>     /**
>>>      * 定义错误信息
>>>      * 格式：'字段名.规则名' =>  '错误信息'
>>>      *
>>>      * @var array
>>>      */
>>>     protected $message = [];
>>> 
>>>     //定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
>>>     protected $scene = [
>>>         //定义save新增管理员，只验证username和password
>>>         // 'edit' => ['username', 'password'],
>>>         'save' => ['username', 'password','role_id','status','avatar'],
>>>         'update' => ['id','username', 'password','role_id','status','avatar'],
>>>     ];
>>> }
>>> 
>>>```
>> 3. 控制器 `app/controller/admin/ShopManager.php`
>> ### 先查询是否存在，再修改
>>> ```php
>>> ...
>>> public function update(Request $request, $id)
>>>     {
>>>         //拿到数据（已经自动化验证参数合法性）
>>>         $param = $request -> only([
>>>             'id',
>>>             'username',
>>>             'password',
>>>             'role_id',
>>>             'status',
>>>             'avatar'
>>>         ]);
>>>         //查询数据是否存在(模型已在基类自动实例化)
>>>         $_model = $this->model -> find($param['id']);
>>>         // halt($_model);
>>>         if(!$_model){
>>>             ApiException('管理员不存在');
>>>         }
>>>         //修改数据
>>>         $res = $_model -> save($param);
>>>         return apiSuccess($res);
>>> 
>>>     }
>>>```