---
navbar: true
sidebar: auto
title: thinkphp商品规格模块
---

## 一. 商品规格表 skus
> 具体查看，<a href="/web/mysql/goods_class.html#三、skus-商品规格表-字段设计" target="_blank">三、skus[商品规格表] 字段设计</a><br/>

## 二、创建控制器、验证器、模型
### 1. 创建商品分类 控制器
```php
 php think make:controller admin/Skus
```
### 2. 创建商品分类 验证器
```php
 php think make:validate admin/Skus
```
### 3. 创建商品分类 模型
```php
 php think make:model Skus
```

### 4. 继承基类控制器、验证器
```php
...
use app\BaseController;
class Skus extends BaseController {}
...

use app\validate\BaseValidate;
class Skus extends BaseValidate{}
...
```

## 三、商品规格获取列表、新增、修改、修改状态、删除接口
### 1. 路由
`route/admin.php`
```php
...

// 必须是登录之后，才能访问（管理员身份）
Route::group('admin',function(){ 
    ...

    //删除商品规格
    Route::post('skus/:id/delete','admin.Skus/delete');
    //修改商品规格状态
    Route::post('skus/:id/update_status','admin.Skus/updateStatus');
    //批量删除商品规格
    Route::post('skus/deleteAll','admin.Skus/deleteAll');
    //更新商品规格
    Route::post('skus/:id','admin.Skus/update');
    //创建商品规格
    Route::post('skus','admin.Skus/save');
    //商品规格列表
    Route::get('skus/:page','admin.Skus/index');
      
//加入中间件代码
})->middleware(\app\middleware\checkShopManagerToken::class);
```

### 2. 模型
`app/model/Skus.php`
由于不涉及与其他表的关联，模型暂时不用写代码

### 3. 商品规格验证器
`app/validate/admin/Skus.php`
```php
...
use app\validate\BaseValidate;
class Skus extends BaseValidate
{
    //定义验证规则
    protected $rule = [
        'page' => 'require|integer|>:0',
        'limit' => 'integer|>:0',

        //isExist是我们自定义的一个规则
        'id|商品规格id' => 'require|integer|>:0|isExist:Skus',

        'name' => 'require|max:30',
        'default' => 'require|max:2000',
        'status' => 'integer|in:0,1',
        'order' => 'integer|>=:0',

        'type' => 'integer|>=:0',

        'ids'=> 'require|array',

    ];
    ...
    //定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
    protected $scene = [
        //列表验证
        'index' => ['page','limit'],
        //创建
        'save' => ['type','status','name','default','order'],
        //修改
        'update' => ['id','type','status','name','default','order'],
        //修改状态
        'updateStatus'=> ['id','status'],
        //删除
        'delete' => ['id'],
        //批量删除
        'deleteAll' => ['ids'],

    ];
}
```

### 4. 商品规格控制器
`app/controller/admin/Skus.php`
```php
...
use app\BaseController;

class Skus extends BaseController
{
    // 商品规格列表
    public function index(Request $request){
        //拿到参数数组, 如：页码等
        // $param = $request ->param();
        $param = $this->request->param();
        //可选参数，如limit:每页多少条
        $limit = intval(getValueByKey('limit',$param,20));
        $page = getValueByKey('page',$param,1);
        //排序
        $order = getValueByKey('order',$param,'desc'); //默认降序
        // 如果存在查询条件参数keyword
        $keyword = getValueByKey('keyword',$param,''); 

        //查询条件
        $where = [];
        if($keyword){
            $where = [
                ['name','like','%'.$keyword.'%']
            ];
        }

        //计算一下一共查了多少条数据
        $totalCount = $this->model -> count();

        // 所有商品规格列表
        $list = $this->model ->
               //分页
               page($page,$limit) ->
               //查询条件
               where($where) ->
               //排序
               // order('id',$order) ->
               order([
                  'order' => $order,
                  'id' => 'desc'
               ]) ->
               //查询
               select();
               //转成数组
               //-> toArray();

        return apiSuccess([
            'totalCount' => $totalCount,
            'list' => $list,
        ]);
        
    }
}
```
## 四. 批量删除商品规格
`app/controller/admin/Skus.php`
```php
    //批量删除商品规格
    public function deleteAll(){
        $ids = $this->request->param('ids');
        return apiSuccess($this->model->where('id','in',$ids)->delete());
    }
```

## 五. 商品规格所有接口
> 具体查看，<a href="/web/mysql/skus表接口.html" target="_blank">skus[商品规格表] 所有接口</a><br/>

