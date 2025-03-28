---
navbar: true
sidebar: auto
title: thinkphp框架权限rule表管理文档
---

# thinkphp框架权限rule表管理[增删改查]文档
## 一、权限列表
### 1. 接口说明
> 1. 请求方式：`GET` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/rule/:page?limit=[:limit]` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/rule/1?limit=100>  `1`代表第1页，`100`代表每页100条数据，由于本数据涉及无限极循环，可以不用分页的，就是列出全部数据即可。
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | page     |  否         |  int  |  页码，默认1     |
> | limit     |  否         |  int  |  每页多少条数据，默认100    |
> 
> 5. 返回
>>  1. 关于数据返回的说明：
>>  原本查询的权限数据类似这样的数据：
>>  ```json
>> [
>>   {"id": 6,"pid": 0,"status": 1,"name": "管理员管理",...},
>>   {"id": 7, "pid": 6,"status": 1,"name": "删除管理员",...},
>>   {"id": 8, "pid": 6,"status": 1,"name": "管理员列表",...},
>>   {"id": 9, "pid": 0,"status": 1,"name": "角色管理",...},
>>   {"id": 10,"pid": 9,"status": 1,"name": "角色列表",...},
>> ]
>>  ```
>> 为了方便后续配置权限，需要将数据转成树形结构，方便前端使用
>> 1. 一维数组的树形结构，会增加一个level体现等级
>> ```json
>> [
>>     {"id": 6,"pid": 0,"status": 1,"name": "管理员管理",...,"level": 0},
>>     {"id": 7, "pid": 6,"status": 1,"name": "删除管理员",...,"level": 1},
>>     {"id": 8, "pid": 6,"status": 1,"name": "管理员列表",...,"level": 1},
>>     {"id": 9, "pid": 0,"status": 1,"name": "角色管理",...,"level": 0},
>>     {"id": 10,"pid": 9,"status": 1,"name": "角色列表",...,"level": 1},
>> ]
>> ```
>> 2. 二维数组的树形结构，增加一个children字段，体现子集
>> ```json
>> [
>>     {
>>         "id": 6,
>>         "pid": 0,
>>         "status": 1,
>>         "name": "管理员管理",
>>         ...
>>         "children": [
>>             {
>>                 "id": 7,
>>                 "pid": 6,
>>                 "status": 1,
>>                 "name": "删除管理员",
>>                 ...
>>                 "children": []
>>             },
>>             {
>>                 "id": 8,
>>                 "pid": 6,
>>                 "status": 1,
>>                 "name": "管理员列表",
>>                 ...
>>                 "children": []
>>             }
>>         ]
>>     },
>>     {
>>         "id": 9,
>>         "pid": 0,
>>         "status": 1,
>>         "name": "角色管理",
>>         ...
>>         "children": [
>>             {
>>                 "id": 10,
>>                 "pid": 9,
>>                 "status": 1,
>>                 "name": "角色列表",
>>                 ...
>>                 "children": []
>>             }
>>         ]
>>     }
>> ]
>> ```
### 2. 创建控制器和验证器
模型已在之前创建过了
> #### 1. 创建控制器
> ```php
> php think make:controller admin/Rule
> ```
> #### 2. 创建验证器
> ```php
> php think make:validate admin/Rule
> ```
### 3. 控制器代码
`app/controller/admin/Rule.php`
```php
...
use app\BaseController;

class Rule extends BaseController
{
    //权限列表
    public function index()
    {
        //拿到参数数组, 如：页码等
        // $param = $request ->param();
        $param = $this->request->param();
        //可选参数，如limit:每页多少条，查询keyword:搜索关键字
        $limit = getValueByKey('limit',$param,100);
        $page = getValueByKey('page',$param,1);

        //计算一下一共查了多少条数据
        $totalCount = $this->model -> count();

        //列表数据
        $list = $this->model ->
               //分页
               page($page,$limit) ->
               //排序
               // order('id','desc') ->
               order(['id'=>'asc']) ->
               //查询
               select() 
               // 转成数组输出要用
               ->toArray();

        return apiSuccess([
            'list' => list_to_tree2($list,'pid'),
            'totalCount' => $totalCount,
            'rules' => list_to_tree($list,'pid')
        ]);
    }
}
```
### 4. 公共方法
`app/common.php`
```php
/**
* 数据集组合分类树(一维数组)
* @return    array
*/
function list_to_tree($array,$field = 'pid',$pid = 0,$level = 0){
    //声明静态数组,避免递归调用时,多次声明导致数组覆盖
    static $list = [];
    foreach ($array as $key => $value){
        if ($value[$field] == $pid){
            $value['level'] = $level;
            $list[] = $value;
            unset($array[$key]);
            list_to_tree($array,$field,$value['id'], $level+1);
        }
    }
    return $list;
}

/**
* 数据集组合分类树(多维数组)
* @return    array
*/
function list_to_tree2($cate,$field = 'pid',$child = 'children',$pid = 0,$callback = false){
	if(!is_array($cate)) return [];
    $arr = [];
    foreach($cate as $v){
    	$extra = true;
    	if(is_callable($callback)){
        	$extra = $callback($v);
        }
        if($v[$field] == $pid && $extra){
            $v[$child] = list_to_tree2($cate,$field,$child,$v['id'],$callback);
            $arr[]     = $v;
        }
    }
    return $arr;
}
```
### 5. 验证器代码
`app/validate/admin/Rule.php`
```php
...
use app\validate\BaseValidate;

class Rule extends BaseValidate
{
    protected $rule = [
        'page' => 'require|integer|>:0',
        'limit' => 'integer|>:0',
    ];

    ...

    //定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
    protected $scene = [
        //权限列表验证场景
        'index' => ['page','limit'],
    ];
}
```

### 6. 路由
`route/admin.php`
```php
// 必须是登录之后，才能访问（管理员身份）
Route::group('admin',function(){
    ...

    //权限列表
    Route::get('rule/:page','admin.Rule/index');
    
//加入中间件代码
})->middleware(\app\middleware\checkShopManagerToken::class);
```


## 二、创建权限
### 1. 接口说明
> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/rule` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/rule>  
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | pid     |  是         |  int  |  父级id，必填     |
> | status   |  否        |  int  |  可用状态，0不可用，1可用，可不填，默认：1   |
> | name   |  是        |  string  |  权限名称（后台栏目或者功能名称），最多100个字符，必填   |
> | frontname   |  否        |  string  |  前端路由name值，最多100个字符，可不填  |
> | frontpath   |  否        |  string  |  前端路由路径，最多100个字符，可不填   |
> | condition   |  否        |  string  |  路由方法，最多255个字符，可不填   |
> | menu   |  否        |  int  |  是否为菜单，0不是，1是，可不填，默认：1   |
> | order   |  否        |  int  |  排序，大于等于0，可不填，默认：50   |
> | icon   |  否        |  string  |  图标名称，最多100个字符，可不填   |
> | method   |  否        |  string  |  可不填，要填只能是：POST,GET,PUT,DELETE 中的一个   |
> 
> 5. 返回
> ```json
> {
>     "msg": "ok",
>     "data": true
> }
> ```

### 2. 控制器代码
`app/controller/admin/Rule.php`
```php
public function save(Request $request)
{
    // $param = $request -> only(['name','condition','status']);
    $param = $request->param();
    $res =  $this->model -> save($param);
    return apiSuccess($res);
    // 由于它和Role控制器的代码一样的，因此可以考虑放到基类控制器文件中，然后继承
}
```
### 3. 验证器代码
`app/validate/admin/Rule.php`
```php
...
use app\validate\BaseValidate;

class Rule extends BaseValidate
{
    /**
     * 定义验证规则
     * 格式：'字段名' =>  ['规则1','规则2'...]
     *
     * @var array
     */
    protected $rule = [
        ...

        //isExist是我们自定义的一个规则
        'id|权限id' => 'require|integer|>:0|isExist:Rule',

        'pid|父级id' => 'require|integer|>=:0|isExist:Rule,false',//pid无需挂载这条数据，防止挂载冲突
        'status' => 'integer|in:0,1',
        'name' => 'require|max:100',
        'frontname' => 'max:100',
        'frontpath' => 'max:100',
        'condition' => 'max:255',
        'menu' => 'integer|in:0,1',
        'order' => 'integer|>=:0',
        'icon' => 'max:100',
        'method' => 'in:POST,GET,PUT,DELETE',
    ];

    /**
     * 定义错误信息
     * 格式：'字段名.规则名' =>  '错误信息'
     *
     * @var array
     */
    protected $message = [];

    //定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
    protected $scene = [
        //权限列表验证场景
        'index' => ['page','limit'],
        //创建权限场景
        'save' => ['pid', 'status', 'name', 'frontname', 'frontpath', 
                   'condition', 'menu', 'order', 'icon', 'method'],
    ];
}

```

### 4. 改写一下基类验证器
`app/validate/BaseValidate.php`
```php
...

class BaseValidate extends Validate
{
    //isExist是我们自定义的一个规则，用于判断id的数据是否存在
    // 验证记录是否存在
    protected function isExist($value, $rule='', $data='', $field='', $title='', $message=''){
        //  halt($value, $rule, $data, $field, $title, $message);
         // $value id的值，如35
        // $rule 即：isExist:ShopManager冒号后面这部分 如ShopManager
        // $data 验证的数据，即你提交的数据
        // $field 字段名称，如 id
        // $title 字段别名，如 管理员id，用于提示作用
        // 'id|管理员id' => 'require|integer|>:0|isExist:ShopManager',

        // $rule 有可能这样：isExist:Rule,false
        $arr = explode(',', $rule);// ['Rule','false']

        //如果$value不存在或者为0
        if(!$value){
            return true;//则不往下继续验证了
        }
        // 拿到模型
        // $model = '\app\model\\'.$rule;
        $model = '\app\model\\'.$arr[0];
        //静态调用，查找数据库
        $_m = $model::find($value);
        if(!$_m){
            return  '该'.$title.'不存在';
        }

        //当然如果存在，既然我们已经查询了一次，没必要在控制器再次查询
        //可以考虑挂载到 request类里面
        // request() -> Model = $_m;
        if(count($arr) == 1 || count($arr) == 2 && $arr[1] !== 'false'){
           request() -> Model = $_m;
        }

        return true;
    }
}

```

### 5. 路由
`route/admin.php`
```php
// 必须是登录之后，才能访问（管理员身份）
Route::group('admin',function(){
    ...

    //创建权限
    Route::post('rule','admin.Rule/save');
    //权限列表
    Route::get('rule/:page','admin.Rule/index');

//加入中间件代码
})->middleware(\app\middleware\checkShopManagerToken::class);
```

## 三、修改权限
### 1. 接口说明
> 1. 请求方式：`POST` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/rule/:id` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/rule/23>  `23`表示的是权限id
> 3. header头
>
> | 参数   |  是否必填    |  类型    |  说明     |
> | :---:  | :---:       |  :---:   | :---:    |
> | token  |  是         |  String  |  token值  |
> 4. 请求参数
>
> | 参数     |  是否必填    |  类型    |  说明     |
> | :---:    | :---:       |  :---:   | :---:    |
> | pid     |  是         |  int  |  父级id，必填     |
> | status   |  否        |  int  |  可用状态，0不可用，1可用，可不填，默认：1   |
> | name   |  是        |  string  |  权限名称（后台栏目或者功能名称），最多100个字符，必填   |
> | frontname   |  否        |  string  |  前端路由name值，最多100个字符，可不填  |
> | frontpath   |  否        |  string  |  前端路由路径，最多100个字符，可不填   |
> | condition   |  否        |  string  |  路由方法，最多255个字符，可不填   |
> | menu   |  否        |  int  |  是否为菜单，0不是，1是，可不填，默认：1   |
> | order   |  否        |  int  |  排序，大于等于0，可不填，默认：50   |
> | icon   |  否        |  string  |  图标名称，最多100个字符，可不填   |
> | method   |  否        |  string  |  可不填，要填只能是：POST,GET,PUT,DELETE 中的一个   |
> 
> 5. 返回
> ```json
> {
>     "msg": "ok",
>     "data": true
> }
> ```
### 2. 控制器代码
`app/controller/admin/Rule.php`
```php
public function update(Request $request, $id)
{
    // $param = $request -> only([
    //     'id',
    //     'name',
    //     'status',
    //     'desc'
    // ]);
    $param = $request -> param();
    $res = $request -> Model -> save($param);
    return apiSuccess($res);
    //可以放到基类控制器，然后继承
}
```
### 3. 验证器代码
`app/validate/admin/Rule.php`
```php
//定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
protected $scene = [
    ...
    //修改权限场景
    'update' => ['id','pid','status','name','frontname','frontpath',
    'condition','menu','order','icon','method'],
];
```
### 4. 路由
`route/admin.php`
```php
// 必须是登录之后，才能访问（管理员身份）
Route::group('admin',function(){
    ...

    //更新权限
    Route::post('rule/:id','admin.Rule/update');
    //创建权限
    Route::post('rule','admin.Rule/save');
    //权限列表
    Route::get('rule/:page','admin.Rule/index');
    
//加入中间件代码
})->middleware(\app\middleware\checkShopManagerToken::class);
```

## 四、修改权限可用状态
### 1. 接口说明
> 1. 请求方式：`post` `[用postman测试]`
> 2. 接口示例：<br/>
> 本地路由地址：`http://thinkphp.shop/admin/rule/:id/update_status` <br/>
> 本地路由示例：<http://thinkphp.shop/admin/rule/23/update_status>  `23`代表权限id
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
`app/controller/admin/Rule.php`
```php
//修改权限状态
public function updateStatus(){
    // 由于传递了id,在验证器里面已经将查询结果挂载到了request() -> Model
    $m = $this -> request -> Model;
    $m -> status = $this -> request -> param('status');
    return apiSuccess($m -> save());
}
```
### 3. 验证器代码
`app/validate/admin/Rule.php`
```php
//定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
protected $scene = [
    ...
    //修改权限状态
    'updateStatus'=> ['id','status'],
];
```
### 4. 路由
`route/admin.php`
```php
// 必须是登录之后，才能访问（管理员身份）
Route::group('admin',function(){
    ...

    //修改权限状态
    Route::post('rule/:id/update_status','admin.Rule/updateStatus');
    //更新权限
    Route::post('rule/:id','admin.Rule/update');
    //创建权限
    Route::post('rule','admin.Rule/save');
    //权限列表
    Route::get('rule/:page','admin.Rule/index');
      
//加入中间件代码
})->middleware(\app\middleware\checkShopManagerToken::class);
```

## 五、删除权限
### 1. 接口说明
### 2. 控制器代码
`app/controller/admin/Rule.php`
```php
public function delete($id)
{
    $m = $this->request -> Model;
    return apiSuccess($m -> delete());
    //但是注意，我们删除了权限，中间表role_rule中的数据
    // 跟rule_id相关的数据也应该删除，因为权限不存在了
}
```
### 3. 验证器代码
`app/validate/admin/Rule.php`
```php
protected $scene = [
    ...
    //删除权限
    'delete' => ['id'],
];
```
### 4. 路由
`route/admin.php`
```php
// 必须是登录之后，才能访问（管理员身份）
Route::group('admin',function(){
    ...

    //删除权限
    Route::post('rule/:id/delete','admin.Rule/delete');
    //修改权限状态
    Route::post('rule/:id/update_status','admin.Rule/updateStatus');
    //更新权限
    Route::post('rule/:id','admin.Rule/update');
    //创建权限
    Route::post('rule','admin.Rule/save');
    //权限列表
    Route::get('rule/:page','admin.Rule/index');
    
    
    
//加入中间件代码
})->middleware(\app\middleware\checkShopManagerToken::class);
```

### 5. 模型中处理删除权限对应的中间表数据
`app/model/admin/Rule.php`
```php
    //删除权限之前的操作：onBeforeDelete 钩子函数：删除之前可以做的操作
    //1. 删除权限之前，先删除role_rule表里面对应的权限id,通过角色id查询删除
    public function delRoles($roleId){
        return $this->roles()->detach($roleId);
    }
    // 关联子分类（下一级权限）
    public function children(){
        return $this->hasMany('Rule','pid','id');
    }
    //2. 删除权限之前，先删除rule表里面的子分类
    public static function onBeforeDelete($rule){
        // 拿到所有的角色id
        $roleIds = $rule->roles->map(function($v){
            return $v->id; // 返回角色id
        })->toArray();
        // 根据角色id 通过关联关系删除role_rule表里面的数据
        if(count($roleIds) > 0){
            $rule -> delRoles($roleIds);
        }

        //删除子分类（下一级权限）
        $rule -> children -> each(function($v){
            $v -> delete(); // 依次删除子分类（下一级权限）
        });

    }
```

