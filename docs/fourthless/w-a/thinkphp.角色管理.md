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

## 二、修改角色
### 1. 接口说明
> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/role/:id` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/role/7>  `7`代表角色id
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
> //修改角色
> public function update(Request $request, $id)
> {
>     //拿到数据（已经自动化验证参数合法性）
>     $param = $request -> only([
>         'id',
>         'name',
>         'desc',
>         'status',
>     ]);
>     $res = $request -> Model -> save($param);
>     return apiSuccess($res);
> }
> ```
### 3. 验证器代码
`app/validate/admin/Role.php`
> ```php
> ...
> use app\validate\BaseValidate;
> 
> class Role extends BaseValidate
> {
>     protected $rule = [
>         ...
> 
>         //isExist是我们自定义的一个规则
>         'id|角色id' => 'require|integer|>:0|isExist:Role',
> 
>         ...
>     ];
>     ...
>     //定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
>     protected $scene = [
>         ...
>         //修改角色
>         'update'=> ['id','status','name','desc'],
>     ];
> }
> ```
### 4. 路由
`route/admin.php`
> ```php
> // 必须是登录之后，才能访问（管理员身份）
> Route::group('admin',function(){
>     ...
> 
>     //更新角色
>     Route::post('role/:id','admin.Role/update');
>     //创建角色
>     Route::post('role','admin.Role/save');
>     //角色列表
>     Route::get('role/:page','admin.Role/index');
>     
> //加入中间件代码
> })->middleware(\app\middleware\checkShopManagerToken::class);
> ```

## 三、修改角色状态
### 1. 接口说明
> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/role/:id/update_status` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/role/1/update_status>  `1`代表角色id
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
### 2. 控制器代码
`app/controller/admin/Role.php`
> ```php
>     //修改角色状态
>     public function updateStatus(){
>         // 由于传递了id,在验证器里面已经将查询结果挂载到了request() -> Model
>         $role = $this -> request -> Model;
>         $role -> status = $this -> request -> param('status');
>         return apiSuccess($role -> save());
> 
>     }
> ```
### 3. 验证器代码
`app/validate/admin/Role.php`
> ```php
>     protected $scene = [
>         ...
>         //修改角色状态
>         'updateStatus'=> ['id','status'],
>     ];
> ```
### 4. 路由
`route/admin.php`
> ```php
> // 必须是登录之后，才能访问（管理员身份）
> Route::group('admin',function(){
>     ...
> 
>     //修改角色状态
>     Route::post('role/:id/update_status','admin.Role/updateStatus');
>     //更新角色
>     Route::post('role/:id','admin.Role/update');
>     //创建角色
>     Route::post('role','admin.Role/save');
>     //角色列表
>     Route::get('role/:page','admin.Role/index');
>     
> //加入中间件代码
> })->middleware(\app\middleware\checkShopManagerToken::class);
> ```

## 四、删除角色
### 1. 接口说明
> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由: `http://thinkphp.shop/admin/role/:id/delete` <br/>
> 本地路由地址：<http://thinkphp.shop/admin/role/35/delete> `35`为角色的id
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数：<br/> `请求体body无需传递参数、只需传递id即可，已经在网址传递了id值`
> 5. 返回
>>```js
>> {
>>    "msg": "ok",
>>    "data": true
>> }
>> ```
### 2. 控制器代码
`app/controller/admin/Role.php`
> ```php
> //删除角色
> public function delete($id)
> {
>     $role = $this->request -> Model;
>     //由于管理员配置了角色，删除角色，关联查询管理员缺乏角色会报错，要做一下提示
>     // halt($this->request -> Model-> shopManagers -> toArray());
>     if($role -> shopManagers -> count() > 0){
>         ApiException('您删除的这个角色，有管理员在使用，请先删除这些管理员或修改这些管理员角色，在删除当前角色');
>     }
>     return apiSuccess($role -> delete());
> }
> ```
### 3. 验证器代码
`app/validate/admin/Role.php`
> ```php
> protected $scene = [
>     ...
>     //删除角色场景
>     'delete' => ['id'],
> ];
> ```
### 4. 路由
`route/admin.php`
> ```php
> // 必须是登录之后，才能访问（管理员身份）
> Route::group('admin',function(){
>     ...
> 
>     //删除角色
>     Route::post('role/:id/delete','admin.Role/delete');
>     //修改角色状态
>     Route::post('role/:id/update_status','admin.Role/updateStatus');
>     //更新角色
>     Route::post('role/:id','admin.Role/update');
>     //创建角色
>     Route::post('role','admin.Role/save');
>     //角色列表
>     Route::get('role/:page','admin.Role/index');
>     
> //加入中间件代码
> })->middleware(\app\middleware\checkShopManagerToken::class);
> ```


## 五、给角色role配置权限rule
> 前面讲过，给角色role配置权限rule是通过中间表role_rule来实现的。
### 1. 接口说明
> 1. 请求方式：`POST` `[用postman测试]`
> 2. 本地路由: `http://thinkphp.shop/admin/role/set_rules` <br/>
> 本地路由地址：<http://thinkphp.shop/admin/role/set_rules>
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> |      |  是         |  JSON  |   权限表id集合及角色id的json数据    |
> 
> 在`postman`中，`Body` -> `raw` -> `JSON` -> 输入json数据:
> ```js
> {
>   "id":2, // 角色id
>   "rule_ids":[6,7,8,9] // 权限id集合
> }
> ```
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
> // 给角色配置权限（授权）
> public function setRules(){
>     //获取所有参数
>     $param = $this -> request -> param();
>     // 判断参数中有没有rule_ids参数，这个参数就是要授权的权限id的数组
>     $ruleIds = getValueByKey('rule_ids',$param,[]);
>     // 'rule_ids'就是rule表的id组成的集合 [6,7,8,9]
>     // 授权以前，先看一下当前角色在role_rule表中有没有数据
>     $role = $this -> request -> Model;
>     // column 方法，返回的是数组，可以指定字段，默认是返回所有字段
>     //当前角色已经拥有的权限id集合
>     $has_ruleids = \app\model\RoleRule::where('role_id',$role->id) -> column('rule_id');
>     // halt($has_ruleids); 
>     // 当前已拥有的权限id: [6,7], 当前传递过来的权限id: [6,7,8,9]，相当于增加 8,9
>     // 还有情况，比如已经拥有[6,7], 传过来 [6] 相当于要删除7
>     // 还有情况，比如已经拥有[6,7], 传过来 [6,8,10] 相当于要删除7，增加8,10
> 
>     // 处理方式有两种：
>     // 一、粗暴式：不管你传递过来什么，都把这个角色原来的权限全部删除，然后重新增加你现在传的角色id
>     // 二、求差集，增加权限，删除权限
>     // 增加权限
>     $addIds = array_diff($ruleIds,$has_ruleids);
>     // 删除权限
>     $delIds = array_diff($has_ruleids,$ruleIds);
>     // 如果有需要增加的权限id
>     if(count($addIds) > 0){
>         // 组织一下增加的数据
>         $addData = [];
>         foreach($addIds as $value){
>             $addData[] = [
>                 'role_id' => $role->id,
>                 'rule_id' => $value
>             ];
>         }
>         // halt($addData);
>         // postman测试；body -> raw -> json
>         // {"id":2,"rule_ids":[6,7,8,9]}
>         // 如果原来已经有了6,7 则这次只会增加8,9
>         // [0 => array:2 ["role_id" => 2,"rule_id" => 8]
>         //  1 => array:2 ["role_id" => 2,"rule_id" => 9]]
>         //批量新增
>         $RoleRule = new \app\model\RoleRule();
>         $RoleRule -> saveAll($addData);
>     }
>     // 如果有需要删除的权限id
>     if(count($delIds) > 0){
>         // 删除
>         \app\model\RoleRule::where([
>             ['role_id','=',$role->id],
>             ['rule_id','in',$delIds]
>         ]) ->delete();
>     }
> 
>     return apiSuccess(true);
> }
> ```
### 3. 验证器代码
`app/validate/admin/Role.php`
> ```php
> protected $scene = [
>     ...
>     //给角色配置权限（授权）
>     'setRules' => ['id'],
> ];
> ```
### 4. 路由
`route/admin.php`
> ```php
> // 必须是登录之后，才能访问（管理员身份）
> Route::group('admin',function(){
>     ...
> 
>     //给角色配置权限（授权）
>     Route::post('role/set_rules','admin.Role/setRules');
>     //删除角色
>     Route::post('role/:id/delete','admin.Role/delete');
>     //修改角色状态
>     Route::post('role/:id/update_status','admin.Role/updateStatus');
>     //更新角色
>     Route::post('role/:id','admin.Role/update');
>     //创建角色
>     Route::post('role','admin.Role/save');
>     //角色列表
>     Route::get('role/:page','admin.Role/index');
>     
> //加入中间件代码
> })->middleware(\app\middleware\checkShopManagerToken::class);
> ```
