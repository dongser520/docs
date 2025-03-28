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
