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
>> ### 1.先查询是否存在，再修改
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
>接下来思考一个地方：`我们会发现，我们在更新管理员、删除管理员等情况，都需要先拿到id获取数据，不存在抛出异常`的这么一个操作，也就是这个地方会经常用到<br/>
> 因此，我们可以考虑在验证器里面，把这部分自动化完成一下 <br/>
> ### 2.针对类似经常查询id判断数据是否存在的情况，考虑在验证器里自定义验证规则完成自动化
>> 1. 来到验证器 `app/validate/admin/ShopManager.php`
>>> ```php
>>> ...
>>> class ShopManager extends Validate
>>> {
>>>     protected $rule = [
>>>         ...
>>>         //将id查询是否存在数据的部分通过isExist:ShopManager自动化
>>>         //ShopManager可以看成表名称或者模型名称
>>>         //isExist是我们自定义的一个规则
>>>         'id|管理员id' => 'require|integer|>:0|isExist:ShopManager',
>>>         ...
>>>     ];
>>> 
>>>     ...
>>> 
>>>     //isExist是我们自定义的一个规则，用于判断id的数据是否存在
>>>     protected function isExist($value, $rule='', $data='', $field='', $title='记录', $message='')
>>>     {
>>>         // halt($value, $rule, $data, $field, $title, $message);
>>>         // $value id的值，如35
>>>         // $rule 即：isExist:ShopManager冒号后面这部分 如ShopManager
>>>         // $data 验证的数据，即你提交的数据
>>>         // $field 字段名称，如 id
>>>         // $title 字段别名，如 管理员id，用于提示作用
>>>         // 'id|管理员id' => 'require|integer|>:0|isExist:ShopManager',
>>> 
>>>         //如果$value不存在或者为0
>>>         if(!$value){
>>>             return true;//则不往下继续验证了
>>>         }
>>>         // 拿到模型
>>>         $model = '\app\model\\'.$rule;
>>>         //静态调用，查找数据库
>>>         $_m = $model::find($value);
>>>         //halt($_m);
>>>         if(!$_m){
>>>            return '该'.$title.'不存在';
>>>         }
>>> 
>>>         //当然如果存在，既然我们已经查询了一次，没必要在控制器再次查询
>>>         //可以考虑挂载到 request类里面
>>>         request() -> Model = $_m;
>>> 
>>>         return true;
>>>     } 
>>> }
>>> 
>>>```
>> 2. 来到控制器 `app/controller/admin/ShopManager.php`
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
>>> 
>>>         /*
>>>         //查询数据是否存在(模型已在基类自动实例化)
>>>         $_model = $this->model ->find($param['id']);
>>>         // halt($_model);
>>>         if(!$_model){
>>>            ApiException('管理员不存在');
>>>         }
>>>         */
>>> 
>>>         // 已经在验证器写了自定义规则, 查询id的数据是否存在
>>>         // 并且如果存在数据，已经挂载到Request类里面
>>>         // halt($request -> Model);
>>>         
>>>         // 更新数据
>>>         // $res = $_model -> save($param);
>>>         $res = $request -> Model -> save($param);
>>>         return apiSuccess($res);
>>>     }
>>> ```
>> 3. 当然可以把自定义验证规则放在基类验证器里面
>>> 1. 创建基类验证器 `php think make:validate BaseValidate`
>>> 2. 来到基类验证器 `app/validate/BaseValidate.php`
>>>> ```php
>>>> ...
>>>> 
>>>> class BaseValidate extends Validate
>>>> {
>>>>     //isExist是我们自定义的一个规则，用于判断id的数据是否存在
>>>>     //验证记录是否存在
>>>>     protected function isExist($value, $rule='', $data='', $field='', $title='记录', $message='')
>>>>     {
>>>>         // halt($value, $rule, $data, $field, $title, $message);
>>>>         // $value id的值，如35
>>>>         // $rule 即：isExist:ShopManager冒号后面这部分 如ShopManager
>>>>         // $data 验证的数据，即你提交的数据
>>>>         // $field 字段名称，如 id
>>>>         // $title 字段别名，如 管理员id，用于提示作用
>>>>         // 'id|管理员id' => 'require|integer|>:0|isExist:ShopManager',
>>>> 
>>>>         //如果$value不存在或者为0
>>>>         if(!$value){
>>>>             return true;//则不往下继续验证了
>>>>         }
>>>>         // 拿到模型
>>>>         $model = '\app\model\\'.$rule;
>>>>         //静态调用，查找数据库
>>>>         $_m = $model::find($value);
>>>>         //halt($_m);
>>>>         if(!$_m){
>>>>            return '该'.$title.'不存在';
>>>>         }
>>>> 
>>>>         //当然如果存在，既然我们已经查询了一次，没必要在控制器再次查询
>>>>         //可以考虑挂载到 request类里面
>>>>         request() -> Model = $_m;
>>>> 
>>>>         return true;
>>>>     } 
>>>> }
>>>> 
>>>> ```
>>> 3. 然后就要注意验证器 `app/validate/admin/ShopManager.php`继承问题了
>>>> ```php
>>>> ...
>>>> use app\validate\BaseValidate;
>>>> class ShopManager extends BaseValidate
>>>> {
>>>>     ...
>>>> }
>>>> ```

## 二、字段唯一性验证处理
> 引言
>> 当我们在`postman`里面修改管理员账号，如果这个账号存在，它尽然还可以修改成功，这显然是不对，因为不同的管理员账号肯定是不一样的，因此，我们来处理一下这个问题。<br/>
> 
> 文档查阅 <br/>
>> 打开文档： <https://www.kancloud.cn/manual/thinkphp6_0/1037629> 搜索：`unique`
>>> `unique:table(表名),field（字段）,except（排除某个主键值）,pk（指定某个主键值排除）`
>
>
> 来到验证器 `app/validate/admin/ShopManager.php` <br/>
> ### 1. 添加字段唯一性验证规则
>> ```php
>> ...
>> class ShopManager extends BaseValidate
>> {
>>     ...
>>     protected $rule = [
>>         ...
>>         // 增加唯一性验证，unique:shop_manager,username，不写username，则默认验证username
>>         'username|管理员账号' => 'require|max:25|min:6|unique:shop_manager',
>>         ...
>>     ];
>> 
>>     ...
>> }
>> ```
>> 发现修改成存在的账号，提示`管理员账号已存在`<br/>

## 三、验证场景写成函数
> 我们在验证规则中，比如：`username|管理员账号' => 'require|max:25|min:6|unique:shop_manager`，这里的`unique:shop_manager`是验证字段的唯一性，在管理员的`修改`，及后面`管理员登录`都会验证唯一性，因此，我们可以考虑将验证场景写在函数中。<br/><br/>
> 
> 来到验证器 `app/validate/admin/ShopManager.php` <br/>
>> ```php
>> ...
>> class ShopManager extends BaseValidate
>> {
>>     ...
>>     protected $rule = [
>>         ...
>>         // 增加唯一性验证，unique:shop_manager,username，不写username，则默认验证username
>>         // 'username|管理员账号' => 'require|max:25|min:6|unique:shop_manager',
>>         // 也可以写入到验证场景函数：sceneSave()
>>         'username|管理员账号' => 'require|max:25|min:6',
>>         ...
>>     ];
>>     ...
>>     protected $message = [
>>        'username.unique' => '管理员账号已存在',
>>     ];
>>     
>>     //定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
>>     protected $scene = [
>>         ...
>>         // 也可以写入到验证场景函数：sceneSave()
>>         // 'save' => ['username', 'password','role_id','status','avatar'],
>>         ...
>>     ];
>> 
>>     //创建管理员验证场景
>>     public function sceneSave()
>>     {
>>         //验证场景
>>         //指定验证规则字段
>>         return $this->only(['username', 'password','role_id','status','avatar'])
>>         //追加验证规则：字段唯一性验证
>>         ->append('username', 'unique:shop_manager');
>>     }
>>     
>> }
>> 
>> ```

## 四、验证器完整代码查看
> 来到验证器 `app/validate/admin/ShopManager.php` <br/>
>> ```php
>> ...
>> class ShopManager extends BaseValidate
>> {
>>     /**
>>      * 定义验证规则
>>      * 格式：'字段名' =>  ['规则1','规则2'...]
>>      *
>>      * @var array
>>      */
>>     protected $rule = [
>>         'page' => 'require|integer|>:0',
>> 
>>         //将id查询是否存在数据的部分通过isExist:ShopManager自动化
>>         //ShopManager可以看成表名称或者模型名称
>>         //isExist是我们自定义的一个规则
>>         'id|管理员id' => 'require|integer|>:0|isExist:ShopManager',
>> 
>>         // 增加唯一性验证，unique:shop_manager,username，不写username，则默认验证username
>>         // 'username|管理员账号' => 'require|max:25|min:6|unique:shop_manager',
>>         // 也可以写入到验证场景函数：sceneSave()
>>         'username|管理员账号' => 'require|max:25|min:6',
>> 
>>         'password' => 'require|max:20|min:6',
>>         'avatar' => 'url',
>>         'role_id' => 'require|integer|>:0',
>>         'status' => 'require|integer|in:0,1',
>>     ];
>> 
>>     /**
>>      * 定义错误信息
>>      * 格式：'字段名.规则名' =>  '错误信息'
>>      *
>>      * @var array
>>      */
>>     protected $message = [
>>         'username.unique' => '管理员账号已存在',
>>     ];
>> 
>>     //定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
>>     protected $scene = [
>>         //定义edit场景（一般和方法名相同），只验证username和password
>>         // 'edit' => ['username', 'password'],
>>         // 也可以写入到验证场景函数：sceneSave()
>>         // 'save' => ['username', 'password','role_id','status','avatar'],
>>         // 也可以写入到验证场景函数：sceneUpdate()
>>         // 'update' =>['id', 'username', 'password','role_id','status','avatar'],
>>     ];
>> 
>>     //创建管理员验证场景
>>     public function sceneSave()
>>     {
>>         //验证场景
>>         //指定验证规则字段
>>         return $this->only(['username', 'password','role_id','status','avatar'])
>>         //追加验证规则：字段唯一性验证
>>         ->append('username', 'unique:shop_manager');
>>     }
>> 
>>     //更新管理员验证场景
>>     public function sceneUpdate()
>>     {
>>         /*
>>         return $this->only(['id', 'username', 'password','role_id','status','avatar'])
>>         ->append('username', 'unique:shop_manager');
>>         */
>>         
>>         $id = request()->param('id');
>>         return $this->only(['id', 'username', 'password','role_id','status','avatar'])
>>         //体验一下验证规则：字段唯一性验证，排除自身（当前管理员id）
>>         ->append('username', 'unique:shop_manager,username,'.$id);
>>     }
>>     
>> }
>> 
>> ```
