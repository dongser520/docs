---
navbar: true
sidebar: auto
title: thinkphp商品管理板块
---

前言
> 有了我们前面章节学习的管理员、角色、权限板块及图片分类、图片管理，这些数据库创建及开发流程，我们接下来学习商品管理板块，应该是更加信手拿捏了，商品管理板块，包括商品分类、商品规格、单个商品管理等的一个操作，下面我们就来学习一下商品管理板块的开发。

## 一、 创建商品分类表 goods_class
> 具体`商品分类表：goods_class`设计，<a href="/web/mysql/goods_class.html#一、goods-class-商品分类表-字段设计" target="_blank">点击查看</a><br/>

## 二、创建控制器、验证器、模型
### 1. 创建商品分类 控制器
```php
 php think make:controller admin/GoodsClass
```
### 2. 创建商品分类 验证器
```php
 php think make:validate admin/GoodsClass
```
### 3. 创建商品分类 模型
```php
 php think make:model GoodsClass
```

### 4. 继承基类控制器、验证器
```php
...
use app\BaseController;
class GoodsClass extends BaseController {}
...

use app\validate\BaseValidate;
class GoodsClass extends BaseValidate{}
...
```

## 三、商品分类获取列表、新增、修改、修改状态、删除接口
### 1. 路由
`route/admin.php`
```php
...

// 必须是登录之后，才能访问（管理员身份）
Route::group('admin',function(){ 
    ...

    //删除商品分类
    Route::post('goodsclass/:id/delete','admin.GoodsClass/delete');
    //修改商品分类状态
    Route::post('goodsclass/:id/update_status','admin.GoodsClass/updateStatus');
    //更新商品分类
    Route::post('goodsclass/:id','admin.GoodsClass/update');
    //创建商品分类
    Route::post('goodsclass','admin.GoodsClass/save');
    //商品分类列表
    Route::get('goodsclass/:page','admin.GoodsClass/index');
      
//加入中间件代码
})->middleware(\app\middleware\checkShopManagerToken::class);
```

### 2. 模型
`app/model/GoodsClass.php`
```php
...
class GoodsClass extends Model
{
    //模型事件 <https://www.kancloud.cn/manual/thinkphp6_0/1037598>
    public static function onAfterDelete($goodsclass)
    {
		// 删除它对应的子分类 [搜索：数据集]
        // $goodsclass-> goods_classes()->select()->each(function($v){
        //     $v->delete();
        // });
        // 直接删除所有关联的子分类（更高效）
        $goodsclass->goods_classes()->delete();
    } 
    // 模型关联-关联自己-找自己的子分类
    public function goods_classes()
    {
        // return $this->hasMany(GoodsClass::class,'pid','id');
        return $this->hasMany('GoodsClass','pid','id');
    }
}
```
### 3. 商品分类验证器
`app/validate/admin/GoodsClass.php`
```php
...

use app\validate\BaseValidate;

class GoodsClass extends BaseValidate
{
    //定义验证规则
    protected $rule = [
        'page' => 'require|integer|>:0',
        'limit' => 'integer|>:0',

        //isExist是我们自定义的一个规则
        'id|商品分类id' => 'require|integer|>:0|isExist:GoodsClass',

        'pid|父级id' => 'require|integer|>=:0|isExist:GoodsClass,false',//pid无需挂载这条数据，防止挂载冲突
        'name' => 'require|max:30',
        'desc' => 'max:255',
        'status' => 'integer|in:0,1',
        'order' => 'integer|>=:0',
    ];

    ...

    //定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
    protected $scene = [
        //列表验证
        'index' => ['page','limit'],
        //创建
        'save' => ['pid','status','name','desc','order'],
        //修改
        'update' => ['id','pid','status','name','desc','order'],
        //修改状态
        'updateStatus'=> ['id','status'],
        //删除
        'delete' => ['id'],
        
    ];
}

```



### 4. 商品分类控制器
`app/controller/admin/GoodsClass.php`
```php
...
use app\BaseController;

class GoodsClass extends BaseController
{
    // 列表
    public function index()
    {
        //拿到参数数组, 如：页码等
        // $param = $request ->param();
        $param = $this->request->param();
        //可选参数，如limit:每页多少条
        $limit = intval(getValueByKey('limit',$param,100));
        $page = getValueByKey('page',$param,1);

        //计算一下一共查了多少条数据
        $totalCount = $this->model -> count();

        //列表数据
        $list = $this->model ->
               //分页
               page($page,$limit) ->
               //排序
               // order('id','desc') ->
               order([
                'order'=>'desc',
                'id'=>'desc'
               ]) ->
               //查询
               select()
               //转成数组
               -> toArray();
        
        return apiSuccess([
            'totalCount' => $totalCount,
            'list' => $list,
            'list_tree2' => list_to_tree2($list,'pid'),
            'list_tree' => list_to_tree($list,'pid')
        ]);
    }

}
```

