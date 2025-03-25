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


## 二、管理员登录（封装登录方法，通用到用户、商家登录等，设置并存储token）
考虑到之后，用户登录、商家登录等，它的逻辑都是一样的，因此，我们可以将管理员登录的逻辑封装到公共方法中，方便以后使用。
### 1、控制器 `app/controller/admin/ShopManager.php`
> ```php
>     //管理员登录
>     public function login(){
>         // return apiSuccess('登录成功');
>         $user = common_login([
>            'data' => $this -> request -> UserModel,
>            // 标签分组，区分是哪种角色登录: 'shop_manager' | 'user' | 'business'
>            'tag' => 'shop_manager',
>            // 是否返回密码
>            //'password' => false,
>            //登录有效时间，0为永久有效，单位为秒
>            //'expire' => 0,
>         ]);
>         return apiSuccess($user);
>     }
> ```
### 2、封装登录方法 `app/common.php`
> ```php
> // 登录（设置并存储token,管理员、用户、商家逻辑一样）
> function common_login(array $param){
>     // 获取参数
>     $data = getValueByKey('data',$param);
>     // 没有data，程序结束，返回false
>     if(!$data) return false;
> 
>     // 区分是管理员登录，还是用户登录，还是商家登录
>     // 标签分组: 'shop_manager' | 'user' | 'business'
>     $tag = getValueByKey('tag',$param, 'shop_manager');
> 
>     // 是否返回密码
>     $password = getValueByKey('password',$param);
>     //登录有效时间，0为永久有效
>     $expire = getValueByKey('expire',$param, 0);
> 
>     // 将生成的token和用户数据放在哪里
>     // 登录数据缓存：<https://www.kancloud.cn/manual/thinkphp6_0/1037634>
>     // 内置支持的缓存类型包括file、memcache、wincache、sqlite、redis
>     // $CacheClass = \think\facade\Cache::store('redis');
>     // 考虑到后期可能会更换换成类型，这里写成配置设置, 具体到：config/cms.php
>     $CacheClass = \think\facade\Cache::store(config('cms.'.$tag.'.token.store'));
> 
>     // 生成唯一token
>     $token = sha1(md5(uniqid(md5(microtime(true)),true)));
>     // 拿到当前登录用户的数据, 如果不是数组类型，则转成数组类型
>     $user = is_object($data) ? $data->toArray() : $data;
> 
>     /*
>     //若不希望用户在多个地方登录，可以加上这段代码，防止重复登录
>     // 获取之前并删除token(防止重复登录)
>     $token = getValueByKey('token',$param);
>     $beforeToken = $CacheClass -> get($tag.'_'.$user['id']);
>     // 删除之前token对应的用户信息
>     if($beforeToken){
>         common_logout([
>             'token' => $beforeToken,
>             'tag' => $tag,
>         ]);
>     }
>     */
> 
> 
>     // 存储token和用户数据:
>     // shop_manager_token值为key值，
>     // 如：shop_manager_89972b7e9dad2282ba3f915d2ff724954e1a2f3d => [
>     //     'id' => 1,
>     //     'username' => 'admin',
>     // ]
>     $CacheClass -> set($tag.'_'.$token,$user,$expire);
> 
>     // 另外还有另外一个存储形式，存储用户的id - token
>     // 如：shop_manager_1 => 89972b7e9dad2282ba3f915d2ff724954e1a2f3d
>     // 原因是可根据当前用户登录的id，先拿到token，再根据token拿到用户数据
>     $CacheClass -> set($tag.'_'.$user['id'],$token,$expire);
> 
>     // 隐藏密码
>     if(!$password) unset($user['password']);
> 
>     // 返回用户数据并加上token
>     $user['token'] = $token;
>     return $user;
> 
>     // 可在根目录 `runtime/cache/` 查看缓存文件
> 
> }
> ```
可在根目录 `runtime/cache/` 查看缓存文件

### 3、新建 `config/cms.php` 配置缓存类型
> ```php
> <?php
> 
> return [
>     // 管理员
>     'shop_manager' =>[
>         //token配置
>         'token' => [
>             // 存储引擎 redis|file|memcache|wincache|sqlite
>             'store' => 'file'
>         ],
>     ],
>     // 用户
>     'user' => [
>         //token配置
>         'token' => [
>             // 存储引擎 redis|file|memcache|wincache|sqlite
>             'store' => 'file'
>         ],
>     ],
>     // 商家
>     'business' => [
>         //token配置
>         'token' => [
>             // 存储引擎 redis|file|memcache|wincache|sqlite
>             'store' => 'file'
>         ],
>     ],
> ];
> ```

## 三、完成管理员登录功能后，创建中间件，完善之前和之后的API请求，需要进行权限验证
### 1. 创建中间件
> ```php
> php think make:middleware checkShopManagerToken
> ```
### 2. 路由中使用中间件 `route/admin.php`
> ```php
> // 必须是登录之后，才能访问（管理员身份）
> Route::group('admin',function(){
>     //删除管理员
>     Route::post('shopmanager/:id/delete','admin.ShopManager/delete');
>     //更新管理员的信息提交数据库
>     Route::post('shopmanager/:id','admin.ShopManager/update');
>     //创建管理员
>     Route::post('shopmanager','admin.ShopManager/save');
>     //管理员列表
>     Route::get('shopmanager/:page','admin.ShopManager/index');
>     
> //加入中间件验证
> })->middleware(\app\middleware\checkShopManagerToken::class);
> ```

### 3. 中间件 `app/middleware/checkShopManagerToken.php`
> ```php
> ...
> class checkShopManagerToken
> {
>     /**
>      * 处理请求
>      *
>      * @param \think\Request $request
>      * @param \Closure       $next
>      * @return Response
>      */
>     public function handle($request, \Closure $next)
>     {
>         // halt('中间件代码');
>         //获取token
>         $token = $request->header('token');
>         //token不存在
>         if(!$token) ApiException('token不存在，非法请求');
> 
>         //token存在，获取用户信息(通过token找本地用户信息)
>         $user = common_getUser([
>             'token' => $token,
>             // 标签分组，区分是哪种角色登录: 'shop_manager' | 'user' | 'business'
>             // 'tag' => 'shop_manager'
>         ]);
>         //如果没有找到，可以认为是token过期或者无效token
>         if(!$user) ApiException('token无效，请重新登录');
> 
>         //token存在且有效，找到了本地的用户信息$user，但是如果服务器已经将管理员禁用了或者删除了呢
>         // 用户禁用或者删除的情况
>         // 通过本地用户信息$user，查一下此时服务器上，用户是否存在或者用户的状态是否被禁用了
>         $currentUser = \app\model\ShopManager::find($user['id']);
>         if(!$currentUser || !$currentUser -> status) ApiException('用户已被禁用或不存在');
>         //否则没什么问题了，再次挂载到request类的UserModel属性上
>         $request -> UserModel = $currentUser;
> 
>         // 验证当前用户权限（超级管理员无需验证）
>         if(!$request -> UserModel -> super){
>           
>         }
> 
> 
>         //继续后面的代码
>         return $next($request);
>     }
> }
> 
> ```
### 4. 公共方法通过token找本地用户信息 `app/common.php`
> ```php
> // 获取用户信息(通过token找本地用户信息)
> function common_getUser(array $param){
>    $tag = getValueByKey('tag',$param,'shop_manager');
>    $token = getValueByKey('token',$param);
>    $password = getValueByKey('password',$param);
>    //拿出缓存中的用户数据
>    $user = \think\facade\Cache::store(config('cms.'.$tag.'.token.store'))->get($tag.'_'.$token);
>    if(!$password) unset($user['password']);
>    return $user;
> }
> ```

## 四、管理员退出登录
### 1、先补充删除管理员功能里面的：不能删除管理员自己
`app/controller/admin/ShopManager.php`
> ```php
> public function delete($id)
>     {
>         // return apiSuccess('迪丽热巴');
>         // 已经在验证器写了自定义规则, 查询id的数据是否存在
>         // 并且如果存在数据，已经挂载到Request类里面
>         // halt($this->request -> Model);
> 
>         $manager = $this->request -> Model;
> 
>         //不能删除管理员自己
>         if($this -> request -> UserModel->id === $manager->id){
>             ApiException('不能删除自己');
>         }
> 
>         //不能删除超级管理员
>         if($manager -> super === 1){
>             ApiException('不能删除超级管理员');
>         }
> 
>         return apiSuccess($manager -> delete());
>     }
> ```

### 2、控制器退出登录
`app/controller/admin/ShopManager.php`
> ```php
> //某个方法，不需要进行自动参数验证
> protected $excludeValidateCheck = ['logout'];
> ...
> //管理员退出登录
> public function logout(){
>     //清除本地的token和用户信息
>     $res = common_logout([
>         'token' => $this -> request -> header('token'),
>     ]);
>     return apiSuccess($res);
> }
> ```

### 3、公共方法退出登录 `app/common.php`
> ```php
> //管理员退出登录（清除本地的token和用户信息）
> function common_logout(array $param){
>     $token = getValueByKey('token',$param);
>     // 区分是管理员登录，还是用户登录，还是商家登录
>     // 标签分组: 'shop_manager' | 'user' | 'business'
>     $tag = getValueByKey('tag',$param,'shop_manager');
> 
>     //清除缓存 用户信息
>     // 文档：<https://www.kancloud.cn/manual/thinkphp6_0/1037634>
>     // 获取并删除缓存 pull
>     $user = \think\facade\Cache::store(config('cms.'.$tag.'.token.store')) ->pull($tag.'_'.$token);
>     // 清除token
>     if(!empty($user)) \think\facade\Cache::store(config('cms.'.$tag.'.token.store'))->pull($tag.'_'.$user['id']);
> 
>     //删除密码
>     unset($user['password']);
> 
>     return $user;
> 
> }
> ``` 

### 4、路由 `route/admin.php`
> ```php
> //不需要登录就能访问的接口（游客也可以）
> Route::group('admin',function(){
>     //管理员登录
>     Route::post('login','admin.ShopManager/login');
>     //管理员退出登录
>     Route::post('logout','admin.ShopManager/logout');
> 
> })->allowCrossDomain();
> ```
