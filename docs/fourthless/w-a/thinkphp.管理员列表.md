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

### 5. 控制器初步查询不带关联角色表  
`app/controller/admin/ShopManager.php`
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


## 二、管理员列表要关联角色表role数据  
> 关于关联查询其它表，用到tp框架的模型关联，它和我们的egg.js项目一样，都有模型关联的概念【搜索文档：`模型关联`】，感兴趣同学可以去学习一下我们第二学期第三季课程，讲得很透彻，并且用sql语句给大家讲了模型关联的原理。<br/>
> thinkphp的模型关联：<https://www.kancloud.cn/manual/thinkphp6_0/1037599><br/>
### 具体操作：
### 1. 已经有shopManager模型，现在关联role表，需要创建一下role表的模型
> #### ① 创建role表模型Role
> 输入命令：`php think make:model Role`
> #### ② 来到role表的模型 `app/model/Role.php`，创建关联关系
>> ```php
>> ...
>> class Role extends Model
>> {
>>     //角色表role对应管理员，一个角色，比如：普通管理员角色
>>     //普通管理员角色可以有很多个管理员，即很多管理员都是普通管理员角色
>>     // 即：角色对应管理员，就是 一对多 的关系
>>     // 接下来定义的写法，写对应关联的表名，一对多，多个shop_manager加s：
>>     public function shop_managers(){
>>         return $this->hasMany('ShopManager');
>>     }
>> }
>>```
### 2.来到管理员表模型shopManager，同样创建一下与角色表的关联关系
> `app/model/ShopManager.php`
>> ```php
>> ...
>> class ShopManager extends Model
>> {
>>     ...
>>     //当前shop_manager表模型关联role表模型
>>     // 管理员表对应角色表：反向一对多
>>     public function role(){
>>         //更多参数看文档 https://www.kancloud.cn/manual/thinkphp6_0/1037601
>>         //belongsTo('关联模型','外键','主键');
>>         //hasMany('关联模型','外键','主键');
>>         // return $this->belongsTo('Role','role_id','id');//关联模型，外键，主键
>>         return $this->belongsTo('Role');
>>     }
>> }
>> ```

### 3. 来到控制器返回：管理员列表关联角色表的数据 [完整代码]
`app/controller/admin/ShopManager.php`
>> ```php
>>     /**
>>      * 管理员列表
>>      *
>>      * @return \think\Response
>>      */
>>     public function index()
>>     {
>>         //拿到参数数组, 如：页码等
>>         // $param = $request ->param();
>>         $param = $this->request->param();
>>         // halt($param);
>>         //可选参数，如limit:每页多少条，查询keyword:搜索关键字
>>         $limit = getValueByKey('limit',$param,10);
>>         $keyword = getValueByKey('keyword',$param,'');
>> 
>>         //组织一下查询条件
>>         $where = [
>>             //管理员用户名模糊查询
>>             ['username','like','%'.$keyword.'%'],
>>         ];
>> 
>>         //计算一下一共查了多少条数据
>>         $totalCount = $this->model ->where($where) -> count();
>>         //查询列表数据
>>         $list = $this->model ->
>>                //关联查询role角色表
>>                with([ //数组，可以关联多个模型
>>                 'role', //对应shop_manager模型中的role方法
>>                ]) ->
>>                //条件
>>                where($where) ->
>>                //分页
>>                page($param['page'],$limit) ->
>>                //排序
>>                order('id','desc') ->
>>                //结果
>>                select()->
>>                //过滤敏感字段，比如密码
>>                hidden(['password','super']);
>> 
>>         //顺便把角色表信息也返回一下
>>         $role = \app\model\Role::field(['id','name']) -> select();
>> 
>>         return apiSuccess([
>>             'list' => $list,
>>             'totalCount' => $totalCount,
>>             'role'=>$role,
>>         ]);
>> 
>>     }
>> ```

## 三、返回结果示例
[需要登录token] `http://thinkphp.shop/admin/shopmanager/1?limit=5&keyword=admin`
```js
{
    "msg": "ok",
    "data": {
        "list": [
            {
                "id": 2,
                "username": "admin3",
                "avatar": "",
                "status": 1,
                "role_id": 1,
                "create_time": "2025-03-21 16:02:50",
                "update_time": "2025-03-21 16:02:50",
                "role": {
                    "id": 1,
                    "name": "普通管理员",
                    "desc": "普通管理员角色",
                    "status": 1,
                    "create_time": "2025-03-21 17:43:25",
                    "update_time": "2025-03-21 17:43:25"
                }
            },
            {
                "id": 1,
                "username": "admin2",
                "avatar": "",
                "status": 1,
                "role_id": 3,
                "create_time": "2025-03-21 12:29:52",
                "update_time": "2025-03-21 12:29:52",
                "role": {
                    "id": 3,
                    "name": "超级管理员",
                    "desc": "超级管理员，角色最多，最高级",
                    "status": 1,
                    "create_time": "2025-03-21 18:24:08",
                    "update_time": "2025-03-21 18:24:08"
                }
            }
        ],
        "totalCount": 2,
        "role": [
            {
                "id": 1,
                "name": "普通管理员"
            },
            {
                "id": 2,
                "name": "销售人员"
            },
            {
                "id": 3,
                "name": "超级管理员"
            },
            {
                "id": 4,
                "name": "技术人员"
            }
        ]
    }
}
```
