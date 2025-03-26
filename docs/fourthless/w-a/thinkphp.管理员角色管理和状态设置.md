---
navbar: true
sidebar: auto
title: thinkphp框架管理员角色管理和状态设置
---

## 一、修改管理员状态
### ① 接口说明
> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/shopmanager/:id/update_status` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/shopmanager/1/update_status>  `1`代表管理员id
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
> 
> 5. 返回
> ```js
> {
>     "msg": "ok",
>     "data": true
> }
> ```
### ② 控制器
`app/admin/controller/Shopmanager.php`
> ```php
>     //修改管理员状态
>     public function updateStatus(){
>         // 由于传递了id,在验证器里面已经将查询结果挂载到了request() -> Model
>         /*
>         $this -> request -> Model -> save([
>             'status' => $this -> request -> param('status'),
>         ]);
>         */
>         $shopmanager = $this -> request -> Model;
>         //不能禁用自己
>         if($this -> request->UserModel -> id === $shopmanager -> id) ApiException('不能禁用自己');
> 
> 
>         $shopmanager -> status = $this -> request -> param('status');
>         return apiSuccess($shopmanager -> save());
>     }
> ```

### ③ 验证器 
`app/validate/admin/Shopmanager.php`
> ```php
> ...
> //定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
> protected $scene = [
>     ...
>     //修改管理员状态
>     'updateStatus' => ['id','status'],
> ];
> ```

### ④ 路由
`route/admin.php`
> ```php
> // 必须是登录之后，才能访问（管理员身份）
> Route::group('admin',function(){
>     //修改管理员状态
>     Route::post('shopmanager/:id/update_status','admin.ShopManager/updateStatus');
>     ...
> //加入中间件代码
> })->middleware(\app\middleware\checkShopManagerToken::class);
> ```


## 二、角色列表
### ① 接口说明
> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/role/:page?limit=[:limit]` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/role/1?limit=5>  `1`代表第1页，`5`代表每页5条数据
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | page     |  是         |  int  |  页码     |
> | limit     |  否         |  int  |  每页多少条数据     |
> 
> 5. 返回

### ② 功能代码
#### 1. 创建角色控制器
> ```php
> php think make:controller admin/Role
> ```
#### 2. 控制器代码 `app/controller/admin/Role.php`
> ```php
> ...
> use app\BaseController;
> 
> class Role extends BaseController
> {
>     //角色列表
>     public function index()
>     {
>         // return apiSuccess('角色列表');
>         //拿到参数数组, 如：页码等
>         // $param = $request ->param();
>         $param = $this->request->param();
>         //可选参数，如limit:每页多少条，查询keyword:搜索关键字
>         $limit = getValueByKey('limit',$param,10);
> 
>         //计算一下一共查了多少条数据
>         $totalCount = $this->model -> count();
> 
>         //列表数据
>         $list = $this->model ->
>                //分页
>                page($param['page'],$limit) ->
>                //排序
>                //order('id','desc') ->
>                order(['id'=>'desc']) ->
>                //查询
>                select();
> 
>         return apiSuccess([
>             'list' => $list,
>             'totalCount' =>$totalCount,
>         ]);
>     
>     }
> }
> ```

#### 3. 创建验证器
> ```php
> php think make:validate admin/Role
> ```

#### 4. 验证器代码 `app/validate/admin/Role.php`
> ```php
> ...
> use app\validate\BaseValidate;
> 
> class Role extends BaseValidate
> {
>     
>     protected $rule = [
>         'page' => 'require|integer|>:0',
>         'limit' => 'integer|>:0',
>     ];
> 
>     ...
> 
>     //定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
>     protected $scene = [
>         //角色列表验证场景
>         'index' => ['page','limit'],
>     ];
> }
> ```

#### 5. 路由 `route/admin.php`
> ```php
> // 必须是登录之后，才能访问（管理员身份）
> Route::group('admin',function(){
>     ...
> 
>     //角色列表
>     Route::get('role/:page','admin.Role/index');
>     
> //加入中间件代码
> })->middleware(\app\middleware\checkShopManagerToken::class);
> ```