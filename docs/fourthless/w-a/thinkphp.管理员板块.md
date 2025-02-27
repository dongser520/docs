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

### ③ 创建管理员
> 1. 控制器 `app/controller/admin/ShopManager.php`
> ### 1.save方法插入数据
> 类比`egg.js`框架，搜索`插入一条数据到数据库：create方法`
>> ```php
>> public function save(Request $request)
>>     {
>>         //拿到前端传递来的数据,
>>         //具体看文档：https://www.kancloud.cn/manual/thinkphp6_0/1037519
>>         //在postman, Body->x-www-form-urlencoded模式填写一些内容，然后发送请求
>>         // halt($request);
>>         // halt($request->param());
>> 
>>         //实例化模型
>>         $model = new \app\model\ShopManager();
>>         //调用模型的save方法(文档有讲)，创建管理员
>>         $res = $model->save($request->param());
>> 
>>         return apiSuccess($res);
>>     }
>> ```
> 2. 对管理员的密码进行加密再存入数据库，`传统做法`
> ### 2.密码加密
>> ```php
>> public function save(Request $request)
>>     {
>>         //拿到前端传递来的数据,
>>         //具体看文档：https://www.kancloud.cn/manual/thinkphp6_0/1037519
>>         //在postman, Body->x-www-form-urlencoded模式填写一些内容，然后发送请求
>>         // halt($request);
>>         // halt($request->param());
>> 
>>         //实例化模型
>>         $model = new \app\model\ShopManager();
>>         //对管理员的密码进行加密在存入数据库，`传统做法`
>>         $param = $request->param();
>>         //利用php内置函数对密码进行加密，不懂这个password_hash函数的同学可以搜一下
>>         $param['password'] = password_hash($param['password'], PASSWORD_DEFAULT);
>>         //调用模型的save方法(文档有讲)，创建管理员
>>         $res = $model->save($param);
>> 
>>         return apiSuccess($res);
>>     }
>> ```
> 3. 超级管理员`super`为1，只能有一个超级管理员<br/>
> tp框架跟我们的`egg.js`框架一样（搜`egg.js重要知识详细文档`），提供了数据过滤的方法来处理<br/>
> ### 3.数据过滤only方法，指定插入的字段
>> ```php
>> public function save(Request $request)
>>     {
>>         //拿到前端传递来的数据,
>>         //具体看文档：https://www.kancloud.cn/manual/thinkphp6_0/1037519
>>         //在postman, Body->x-www-form-urlencoded模式填写一些内容，然后发送请求
>>         // halt($request);
>>         // halt($request->param());
>> 
>>         //实例化模型
>>         $model = new \app\model\ShopManager();
>>         //对管理员的密码进行加密在存入数据库，`传统做法`
>>         // $param = $request->param();
>>         $param = $request->only(['username', 'password', 'avatar', 'role_id', 'status']);
>>         //利用php内置函数对密码进行加密，不懂这个password_hash函数的同学可以搜一下
>>         $param['password'] = password_hash($param['password'], PASSWORD_DEFAULT);
>>         //调用模型的save方法(文档有讲)，创建管理员
>>         $res = $model->save($param);
>> 
>>         return apiSuccess($res);
>>     }
>> ```
> 4. 考虑到如果修改管理员密码，还是要进行加密操作，因此，我们可以参考跟我们的`egg.js`框架一样，把密码加密写在模型中
> ### 4.密码加密写在模型中(修改器)
>> `app/model/ShopManager.php`
>>> ```php
>>> class ShopManager extends Model
>>> {
>>>     //修改器【参考官方文档：模型-修改器】
>>>     //https://www.kancloud.cn/manual/thinkphp6_0/1037589
>>>     //格式 set FieldName（表字段名称） Attr，
>>>     //如密码：set password attr , 写成函数空格去掉首字母大写 setPasswordAttr
>>>     public function setPasswordAttr($value,$data)
>>>     {
>>>         //利用php内置函数对密码进行加密，不懂这个password_hash函数的同学可以搜一下
>>>         // $param['password'] = password_hash($param['password'], PASSWORD_DEFAULT);
>>>         return password_hash($value, PASSWORD_DEFAULT);
>>>     }
>>> }
>>> ```
>> `app/controller/admin/ShopManager.php`
>>> ```php
>>> public function save(Request $request)
>>>     {
>>>         //拿到前端传递来的数据,
>>>         //具体看文档：https://www.kancloud.cn/manual/thinkphp6_0/1037519
>>>         //在postman, Body->x-www-form-urlencoded模式填写一些内容，然后发送请求
>>>         // halt($request);
>>>         // halt($request->param());
>>> 
>>>         //实例化模型
>>>         $model = new \app\model\ShopManager();
>>>         //对管理员的密码进行加密在存入数据库，`传统做法`
>>>         // $param = $request->param();
>>>         $param = $request->only(['username', 'password', 'avatar', 'role_id', 'status']);
>>>         //利用php内置函数对密码进行加密，不懂这个password_hash函数的同学可以搜一下
>>>         // 加密写进模型文件
>>>         //$param['password'] = password_hash($param['password'], PASSWORD_DEFAULT);
>>>         //调用模型的save方法(文档有讲)，创建管理员
>>>         $res = $model->save($param);
>>> 
>>>         return apiSuccess($res);
>>>     }
>>> ```
> 
> 
> 5. 很显然，数据写入数据库之前，需要验证写入数据的合法性，因此需要跟我们的`egg.js`框架一样，需要对写入数据的合法性做判断，即参数验证。<br/>
> ### 5.参数验证
> 学过我们`egg.js`项目同学都知道，我们`egg.js`项目参数验证用的是插件，而我们的`tp`框架用的是验证器，可以通过`php think`查看验证器命令
>> ####  ① 创建验证器，最好和控制器一样的目录，便于我们分析查看
>>> ```js
>>> php think make:validate admin/ShopManager
>>> ```
>>> 生成验证器文件： `app/validate/admin/ShopManager.php` 
>>>
>> ####  ② 定义验证规则，查看tp框架文档：`验证->验证规则（内置规则）` <https://www.kancloud.cn/manual/thinkphp6_0/1037625>
>>> 验证器文件：`app/validate/admin/ShopManager.php`
>>> ```php
>>>     protected $rule = [
>>>         'username' => 'require|max:25|min:6',//必填，最大25，最小6
>>>         'password' => 'require|max:20|min:6',//必填，最大20，最小6
>>>         'avatar' => 'url',//url地址
>>>         'role_id' => 'require|integer|>:0',//必填，整数，大于0
>>>         'status' => 'require|integer|in:0,1',//必填，整数，在0,1之间
>>>     ];
>>>     ...
>>>     //定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
>>>     protected $scene = [
>>>         //定义save新增管理员，只验证username和password
>>>         // 'save' => ['username', 'password'],
>>>         'save' => ['username', 'password', 'avatar', 'role_id', 'status'],
>>>     ];
>>> ```
>>> 控制器使用参数验证 `app/controller/admin/ShopManager.php`
>>> ```php
>>>     public function save(Request $request)
>>>     {
>>>         //拿到前端传递来的数据,
>>>         //具体看文档：https://www.kancloud.cn/manual/thinkphp6_0/1037519
>>>         //在postman, Body->x-www-form-urlencoded模式填写一些内容，然后发送请求
>>> 
>>>         // halt($request->param());
>>> 
>>>         //实例化模型
>>>         $model = new \app\model\ShopManager();
>>>         //对管理员的密码进行加密在存入数据库，`传统做法`
>>>         // $param = $request->param();
>>>         $param = $request -> only(['username','password','role_id','status','avatar']);
>>>         //利用php内置函数对密码进行加密，不懂这个password_hash函数的同学可以搜一下
>>>         // $param['password'] = password_hash($param['password'],PASSWORD_DEFAULT);
>>>         //参数验证
>>>         $validate = new \app\validate\admin\ShopManager();
>>>         // $validate -> check($request->param());//不给场景，会验证规则里面的所有的参数
>>>         if(!$validate -> scene('save') -> check($request->param())){
>>>            ApiException($validate->getError());//抛出异常
>>>         } 
>>> 
>>>         $res =  $model -> save($param);
>>>         return apiSuccess($res);
>>>     }
>>> 
>>> ```
> 我们发现，控制器里面每个方法，我们都会去`实例化模型`，我们可以考虑`自动实例化当前模型`来简化代码 <br/>
> ### 6.自动实例化当前模型简化控制器代码
>> 1. 实例化模型的方式有两种：
>>> ```php
>>>    //实例化模型方式一
>>>    $model = new \app\model\ShopManager();
>>>    //实例化模型方式二
>>>    $model = app('app\model\ShopManager');
>>> ```
>> 2. 实例化验证器模型也是一样，有两种方式
>>> ```php
>>>    //参数验证
>>>    //实例化验证器方式一
>>>    $validate = new \app\validate\admin\ShopManager();
>>>    //实例化验证器方式二
>>>    $validate = app('app\validate\admin\ShopManager');
>>> ```
>> 3. 学习过我们`第二学期第二季`课程同学，对于类和对象，都有了解，我们可以将`实例化模型`和`实例化验证器`封装成一个类，把它放在基类控制器里面，这样我们每个控制器，只需要继承基类控制器，就可以自动实例化模型和验证器，从而简化代码。<br/>
>> 可参考`tp`文档，`控制器->基础控制器`<https://www.kancloud.cn/manual/thinkphp6_0/1067000> <br/>
>> 默认安装后，系统提供了一个`app\BaseController`基础控制器类<br/>
>>> `基类控制器 app\BaseController`初始化的代码，在当其它控制器继承了基类之后，初始化的代码也会优先执行
>>> ```php
>>> // 初始化
>>>    protected function initialize()
>>>    {
>>>        //halt('迪丽热巴');
>>>        // halt($this->request);
>>>        // 文档搜索 `->controller 门面`
>>>        // 可拿到当前的控制器模型
>>>        //halt($this->request->controller()); //"admin.ShopManager"
>>>        // 拿到控制器确切名称，不包含目录名
>>>        halt(class_basename($this)); //"ShopManager"
>>>    }
>>> ```
>>> 比如控制器 `app/controller/admin/ShopManager.php` 继承了基类控制器，那么初始化的代码也会优先执行
>>> ```php
>>> ...
>>> use app\BaseController;
>>> ...
>>> class ShopManager extends BaseController
>>> {
>>>     ...
>>> }
>>> ```
>>> 完整推演代码 <br/>
>>> `基类控制器 app\BaseController`
>>>> ```php
>>>>    ...
>>>>    // 自动实例化模型
>>>>    protected $model = null;
>>>>    // 记录当前控制器相关信息
>>>>    protected $modelName = [];
>>>>    ...
>>>>    // 初始化
>>>>    protected function initialize()
>>>>    {
>>>>        // halt(123);
>>>>        // halt($this->request);
>>>>        // 文档搜索 `->controller 门面`
>>>>        // 可拿到当前的控制器模型
>>>>        //halt($this->request->controller()); //"admin.ShopManager"
>>>>        // 拿到控制器确切名称，不包含目录名
>>>>        //halt(class_basename($this)); //"ShopManager"
>>>>        
>>>>        // 记录当前控制器相关信息
>>>>        $this->modelName = [
>>>>            'name' => class_basename($this), //"ShopManager"
>>>>        ];
>>>>        // 自动实例化当前模型
>>>>        $this -> getCurrentModel();
>>>>
>>>>    }
>>>>    // 自动实例化当前模型
>>>>    protected function getCurrentModel()
>>>>    {
>>>>        // $this->model = app('\app\model\ShopManager');
>>>>        //拼接用. , 但是 \. 需要转义
>>>>        // 自动实例化当前模型了，存储在了 `$this->model`
>>>>        $this->model = app('\app\model\\'.$this->modelName['name']);
>>>>    }
>>>> ```
>>> 控制器 `app/controller/admin/ShopManager.php`
>>>> ```php
>>>>    public function save(Request $request)
>>>>    {
>>>>        //拿到前端传递来的数据,
>>>>        //具体看文档：https://www.kancloud.cn/manual/thinkphp6_0/1037519
>>>>        //在postman, Body->x-www-form-urlencoded模式填写一些内容，然后发送请求
>>>>
>>>>        // halt($request->param());
>>>>
>>>>        //实例化模型方式一
>>>>        // $model = new \app\model\ShopManager();
>>>>        //实例化模型方式二
>>>>        //$model = app('app\model\ShopManager');
>>>>        //已经在基类自动实例化了，存在于 $this->model中
>>>>
>>>>
>>>>        //对管理员的密码进行加密在存入数据库，`传统做法`
>>>>        // $param = $request->param();
>>>>        $param = $request -> only(['username','password','role_id','status','avatar']);
>>>>        //利用php内置函数对密码进行加密，不懂这个password_hash函数的同学可以搜一下
>>>>        // $param['password'] = password_hash($param['password'],PASSWORD_DEFAULT);
>>>>        //参数验证
>>>>        //实例化验证器方式一
>>>>        // $validate = new \app\validate\admin\ShopManager();
>>>>        //实例化验证器方式二
>>>>        $validate = app('app\validate\admin\ShopManager');
>>>>
>>>>
>>>>        if(!$validate -> scene('save') -> check($request->param())){
>>>>            ApiException($validate ->getError());
>>>>        }
>>>>
>>>>        // $res =  $model -> save($param);
>>>>        // 已经存储在基类控制器，访问用：$this->model
>>>>        $res =  $this->model -> save($param);
>>>>
>>>>        return apiSuccess($res);
>>>>    }
>>>> ```
> ### 7. 是否自动实例化模型
>> 我们在上面第6点讲解了自动实例化模型，但有时候我们不需要自动实例化模型，因此，为了代码的严谨性，我们在第6点的基础上，加上是否自动实例化模型的判断。
>>> `基类控制器 app\BaseController`
>>>> ```php
>>>>    ...
>>>>    // 记录当前控制器相关信息
>>>>    protected $modelName = [];
>>>>    // 自动实例化模型
>>>>    protected $model = null;
>>>>    //是否自动实例化模型
>>>>    protected $autoModel = true;
>>>>    //另外关于模型，不一定就只放在model文件夹下
>>>>    //也有可能跟我们的控制器一样，放在子文件里面
>>>>    //所以，我们也需要自定义一下模型路径
>>>>    protected $modelPath = null;
>>>>    ...
>>>>    // 初始化
>>>>    protected function initialize()
>>>>    {
>>>>        // halt('迪丽热巴');
>>>>        // halt($this->request);
>>>>        // 文档搜索 `->controller 门面`
>>>>       // 可拿到当前的控制器模型
>>>>       // halt($this->request->controller());//"admin.ShopManager"
>>>>       // 拿到控制器确切名称，不包含目录名
>>>>       //    halt(class_basename($this));//"ShopManager"
>>>>
>>>>
>>>>       // 记录当前控制器相关信息
>>>>       $this->modelName = [
>>>>          'name' => class_basename($this), //"ShopManager"
>>>>       ];
>>>>       
>>>>       // 自动实例化当前模型
>>>>       $this->getCurrentModel();
>>>>    }
>>>>    // 自动实例化当前模型
>>>>    protected function getCurrentModel()
>>>>    {
>>>>        if($this->autoModel){
>>>>            // $model = app('app\model\ShopManager');
>>>>            // 自动实例化当前模型
>>>>            //拼接用. , 但是 \. 需要转义
>>>>            // 自动实例化当前模型了，存储在了 `$this->model`
>>>>            // $this->model = app('app\model\\'.$this->modelName['name']);
>>>>            $model_Name = $this->modelPath ? str_replace('/','\\',$this->modelPath) : $this->modelName['name'];
>>>>            $this->model = app('app\model\\'.$model_Name);
>>>>        }
>>>>    }
>>>> ```
>>> 控制器 `app/controller/admin/ShopManager.php`
>>>> ```php
>>>> ....
>>>> class ShopManager extends BaseController
>>>> {
>>>>    //是否自动实例化当前控制器的模型
>>>>    protected $autoModel = false;
>>>>    //自定义一下模型路径(如果存在这个模型的话)
>>>>    protected $modelPath = 'admin/ShopManager';
>>>>    ...
>>>> }
>>>> ```