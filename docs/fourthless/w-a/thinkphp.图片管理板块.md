---
navbar: true
sidebar: auto
title: thinkphp图片管理板块
---

前言
> 有了我们前面章节学习的管理员、角色、权限板块，这些数据库创建及开发流程，我们接下来学习图片管理板块，应该是信手拿捏了，图片管理板块，主要是对商品图片的一个管理，包括图片分类、图片上传、图片删除等操作，下面我们就来学习一下图片管理板块的开发。

## 一、 创建图片分类表 image_class
> 具体`图片分类表：image_class`设计，<a href="/web/mysql/image_class.html#一、image-class-图片分类表-字段设计" target="_blank">点击查看</a><br/>
## 二、 创建图片表 image
> 具体`图片表：image`设计，<a href="/web/mysql/image_class.html#三、image-图片表-字段设计" target="_blank">点击查看</a><br/>

## 三、创建控制器、验证器、模型
### 1. 创建图片分类、图片 控制器
```php
 php think make:controller admin/ImageClass
 php think make:controller admin/Image
```
### 2. 创建图片分类、图片 验证器
```php
 php think make:validate admin/ImageClass
 php think make:validate admin/Image
```
### 3. 创建图片分类、图片 模型
```php
 php think make:model ImageClass
 php think make:model Image
```

### 4. 继承基类控制器、验证器
```php
...
use app\BaseController;
class ImageClass extends BaseController {}
class Image extends BaseController {}
...

use app\validate\BaseValidate;
class ImageClass extends BaseValidate{}
class Image extends BaseValidate{}
...
```

## 四、图片分类获取列表、新增、修改、修改状态、删除接口
### 1. 图片分类控制器
`app/controller/admin/ImageClass.php`
```php
...
use app\BaseController;

class ImageClass extends BaseController
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
                'id'=>'desc',
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

    // 创建方法已写入基类控制器，此处略 --- 只需要设置验证器规则和场景
    // public function save(Request $request)
    // {
    //     //
    // }

    // 更新方法已写入基类，此处略 --- 只需要设置验证器规则和场景
    // public function update(Request $request, $id)
    // {
    //     //
    // }

    // 删除已写入基类控制器，此处略 --- 只需要设置验证器规则和场景
    // public function delete($id)
    // {
    //     //
    // }
}
```

### 2. 图片分类验证器
`app/validate/admin/ImageClass.php`
```php
...
use app\validate\BaseValidate;

class ImageClass extends BaseValidate
{
    /**
     * 定义验证规则
     * 格式：'字段名' =>  ['规则1','规则2'...]
     *
     * @var array
     */
    protected $rule = [
        'page' => 'require|integer|>:0',
        'limit' => 'integer|>:0',

        //isExist是我们自定义的一个规则
        'id|图片分类id' => 'require|integer|>:0|isExist:ImageClass',

        'pid|父级id' => 'require|integer|>=:0|isExist:ImageClass,false',//pid无需挂载这条数据，防止挂载冲突
        'status' => 'integer|in:0,1',
        'name' => 'require|max:30',
        'order' => 'integer|>=:0',
        'desc' => 'max:255',
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
        //列表验证场景
        'index' => ['page','limit'],
        //创建场景
        'save' => ['pid','status','name','order','desc'],
        // //修改场景
        'update' => ['id','pid','status','name','order','desc'],
        //修改状态
        'updateStatus'=> ['id','status'],
        //删除
        'delete' => ['id'],

    ];
}

```

### 3. 路由
`route/admin.php`
```php
...
// 必须是登录之后，才能访问（管理员身份）
Route::group('admin',function(){
    ...

    //删除图片分类
    Route::post('imageclass/:id/delete','admin.ImageClass/delete');
    //修改图片分类状态
    Route::post('imageclass/:id/update_status','admin.ImageClass/updateStatus');
    //更新图片分类
    Route::post('imageclass/:id','admin.ImageClass/update');
    //创建图片分类
    Route::post('imageclass','admin.ImageClass/save');
    //图片分类列表
    Route::get('imageclass/:page','admin.ImageClass/index');
    
//加入中间件代码
})->middleware(\app\middleware\checkShopManagerToken::class);
```

## 五、上传图片
> 具体查看，<a href="/fourthless/w-a/thinkphp文件上传说明" target="_blank">上传图片</a><br/>


## 六、某个图片分类下的图片列表
某个图片分类下的图片列表要求路由可以这样: <br/>
> `http://thinkphp.shop/admin/imageclass/27/image/1?limit=10&keyword=电脑&order=asc`<br/><br/>
> `27`代表分类id, `1`代表页码, `limit`代表每页多少条, `keyword`代表搜索关键字, `order`代表排序规则<br/>
> `limit` 和 `keyword` 是可选参数，`limit`默认为 `20`，`keyword`默认为 空字符串，`order` 是可选参数，默认为 `desc`<br/>

### 1. 路由
`route/admin.php`
```php
    ...
    //图片分类下的所有图片列表 $代表后面的参数可以没有
    Route::get('imageclass/:id/image/:page','admin.ImageClass/images');
    //删除图片分类
    Route::post('imageclass/:id/delete','admin.ImageClass/delete');
    ...
```
### 2. 验证器
`app/validate/admin/ImageClass.php`
```php
...
use app\validate\BaseValidate;

class ImageClass extends BaseValidate
{
    ...
    //定义一个场景（场景名称可自定义，方便我们观察，可用控制器的方法名称）
    protected $scene = [
        ...
        // 图片列表
        'images' => ['id','page'],

    ];
}

```
### 3. 模型
`app/model/ImageClass.php`
```php
...
class ImageClass extends Model
{
    //获取当前图片分类下的图片
    public function images()
    {
        return $this->hasMany('Image','image_class_id','id');
    }
}
```
### 4. 控制器
`app/controller/admin/ImageClass.php`
```php
    ...
    //图片列表
    public function images(Request $request)
    {
        //拿到参数数组, 如：页码等
        // $param = $request ->param();
        $param = $this->request->param();
        //可选参数，如limit:每页多少条
        $limit = intval(getValueByKey('limit',$param,20));
        $page = getValueByKey('page',$param,1);

        //拿到图片分类下面的图片，模型关联(当然也可以用where查询语句)
        // 拿到图片模型
        // $model = $this -> request -> Model -> hasMany('Image','image_class_id','id'); //关联模型名
        $model = $this -> request -> Model -> images(); //关联模型名

        //计算一下一共查了多少条数据
        $totalCount = $model -> count();

        //排序
        $order = getValueByKey('order',$param,'desc'); //默认降序

        //查询条件
        $where = [];
        // 如果存在查询条件参数keyword
        $keyword = getValueByKey('keyword',$param,''); 
        if($keyword){
            $where[] = [
                ['name','like','%'.$keyword.'%']
            ];
        }

        // 图片列表数据
        $list = $model ->
               //分页
               page($page,$limit) ->
               // where 条件
               where($where) ->
               //排序
               order('id',$order) ->
               //查询
               select();
               //转成数组
               //-> toArray();

        return apiSuccess([
            'totalCount' => $totalCount,
            'list' => $list,
        ]);

    }
```
