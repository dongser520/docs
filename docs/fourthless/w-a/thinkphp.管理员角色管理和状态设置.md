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
> `无返回值`
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
