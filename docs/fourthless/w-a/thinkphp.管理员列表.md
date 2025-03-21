---
navbar: true
sidebar: auto
title: thinkphp框架管理员列表
---

## 一、管理员列表
### 1. 接口说明
> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：<http://thinkphp.shop/admin/shopmanager/1> `1`代表第1页 <br/>
> 完整演示：<http://thinkphp.shop/admin/shopmanager/1?limit=10&keyword=admin1>
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
>
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | page     |  是         |  int  |  分页页码     |
> | limit    |  否         |  int  |  每页显示多少条数据     |
> | keyword  |  否         |  string  |  查询关键字，如：管理员的账号，admin1     |


### 2. 路由 `route/admin.php`
> `route/admin.php`
>> ```php
>> ...
>> Route::group('admin',function(){
>>     ...
>>     //管理员列表
>>     Route::get('shopmanager/:page','admin.ShopManager/index');
>> });
>> ```

### 3. 验证器 `app/validate/admin/ShopManager.php`
> ```php
> ...
> class ShopManager extends BaseValidate
> {
>     /**
>      * 定义验证规则
>      * 格式：'字段名' =>  ['规则1','规则2'...]
>      *
>      * @var array
>      */
>     protected $rule = [
>         'page' => 'require|integer|>:0',
>         'limit' => 'integer|>:0',
>         ...
>     ];
>     ...
> 
>     //定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
>     protected $scene = [
>         ...
>         //管理员列表验证场景
>         'index' => ['page','limit'],
>     ];
> 
>     ...
> }
> 
> ```

### 4. 由于limit和keyword为选填，模型方法获取参数时，需要判断一下否则报错，写个方法
`app/common.php`
> ```php
> // 获取数组指定字段[key]的值[value]
> function getValueByKey($key, $array, $default = false){
>    return array_key_exists($key, $array) ? $array[$key] : $default;
> }
> ```

### 5. 控制器初步查询不带关联角色表  `app/controller/admin/ShopManager.php`
> ```php
> ...
> class ShopManager extends BaseController
> {
>     //是否自动实例化模型
>     // protected $autoModel = true;
>     //自定义一下模型路径(如果存在这个模型的话)
>     // protected $modelPath = 'admin/ShopManager';
>     //是否自动进行参数验证
>     // protected $autoValidate = true;
>     //自定义参数验证场景名
>     // protected $autoValidateScenes = [
>     //     'save'=>'save1'   // 方法名 => 验证场景名
>     // ];
>     //某个方法，不需要进行自动参数验证
>     // protected $excludeValidateCheck = ['index'];
>     /**
>      * 管理员列表
>      *
>      * @return \think\Response
>      */
>     public function index()
>     {
>         //拿到参数数组, 如：页码等
>         $param = $this->request->param();
>         //可选参数，如limit:每页多少条，查询keyword:搜索关键字
>         $limit = getValueByKey('limit', $param, 10);//没传，就每页默认10条
>         $keyword = getValueByKey('keyword', $param, '');//没传，就默认空
> 
>         //组织查询条件
>         $where = [
>             //管理员用户名模糊查询
>             ['username','like','%'.$keyword.'%']
>         ];
> 
>         //计算一下一共查了多少条数据
>         $totalCount = $this->model ->where($where)->count();
>         //那列表数据
>         $list = $this->model ->
>                 //条件
>                 where($where) ->
>                 //分页
>                 page($param['page'],$limit) ->
>                 //排序
>                 order('id','desc') ->
>                 //查询
>                 select()->
>                 //隐藏密码等敏感信息
>                 hidden(['password']);
>         return apiSuccess([
>             'list'=>$list,
>             'totalCount'=>$totalCount
>         ]);
>     }
> }
> ```
`postman测试`:`http://thinkphp.shop/admin/shopmanager/1?limit=10&keyword=admin1`