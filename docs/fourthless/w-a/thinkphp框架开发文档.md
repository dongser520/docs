---
navbar: true
sidebar: auto
title: thinkphp框架开发文档
---

## 一、安装thinkphp及配置项目
> 我们以thinkphp6为例给大家进行讲解。
### 1、配置php的环境变量
> ①、可以在`UPUPWANK`快捷图标->`右键属性`-> `快捷方式`-> `打开文件所在的位置`；<br/>
> ② `Modules`->`PHPX`->`PHP72`->`复制整个路径：D:\UPUPW_ANK_W64\Modules\PHPX\PHP72`；<br/>
> ③ `我的电脑`->`属性`->`高级系统设置(更改设置)`->`高级`->`环境变量`->`系统变量`；<br/>
> ④ 在`系统变量`中，找到`Path` -> `编辑(双击也可以)` -> `新建` -> `粘贴路径：D:\UPUPW_ANK_W64\Modules\PHPX\PHP72` -> `确定`；<br/>
>> 测试环境变量是否正常：<br/>
>> ① `win + R`（`开始`->`运行`） -> `cmd` -> `php -v` -> `回车` -> `查看php版本号`（若有打印结果即配置成功）；<br/>

### 2、安装composer
> 具体安装参考：<https://www.runoob.com/w3cnote/composer-install-and-usage.html>  <br/>
>> 1. 下载 `Composer-Setup.exe ` 然后一步一步安装即可。

### 3、创建项目
> ### ThinkPHP6.0（tp框架）文档说明<br/>
<https://www.kancloud.cn/manual/thinkphp6_0/1037481> <br/>
>> 1. 国外的网站连接速度很慢,因此安装的时间可能会比较长，我们建议使用国内镜像,类似于我们node环境的npm切换到淘宝镜像一个意思：<br/>
>>> 打开命令行窗口（windows用户）或控制台（Linux、Mac 用户）并执行如下命令：
>>> ```js
>>> //阿里云：
>>> composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
>>> //华为云：
>>> composer config -g repo.packagist composer https://repo.huaweicloud.com/repository/php/
>>> ```
>> #### 2. 创建一个站点
>>> 打开本地环境 `UPUPWANK` -> `全局首页` -> ` + 号` -> 创建一个站点 <br/>
>>> `网站名称`: `thinkphp.shop` <br/>
>>> `网站路径`: 默认 <br/>
>>> `网站端口`: 80 <br/>
>>> `主要域名`: `thinkphp.shop` <br/>
>>> `额外域名`:  <br/>
>>> `PHP`: `7.2X` -- `提交保存`<br/>  
>>> <br/>  
>>> 然后来到 `功能扩展` -> `Hosts重定向` -> 域名；`thinkphp.shop` 点击 `+号添加` -> `提交保存`;
>> 
>> #### 3. 安装项目
>> 来到我们的 `UPUPWANK` -> `全局首页` ->  `点击UPUPWANK上面的笔（编辑）`-> 找到刚刚创建的站点 -> 打开站点目录（中间的文件夹图标） -> `当前文件夹路径选中输入cmd打开命令行工具`（命令行工具也会定位到当前的网站路径）<br/>  
>>> 如果你是第一次安装的话，在命令行下面，切换到你的WEB根目录下面并执行下面的命令：<br/>
>>> ```js
>>> composer create-project topthink/think tp
>>> ```
>> #### 4. 切换到tp目录下
>>> ```js
>>>  cd tp  //切换到tp目录下:D:\UPUPW_ANK_W64\WebRoot\Vhosts\thinkphp.shop\tp>
>>> ```
>> 运行命令进行更新：
>>> ```js
>>> composer update topthink/framework
>>> ```
>> #### 5. 修改项目根目录到 public 文件夹下
>> 1. 默认创建项目的根目录是：`D:\UPUPW_ANK_W64\WebRoot\Vhosts\thinkphp.shop`,我们的项目代码放在了`tp`目录下，运行目录是`tp/public`目录，因此，先复制路径：`D:\UPUPW_ANK_W64\WebRoot\Vhosts\thinkphp.shop\tp\public` <br/>
>> 2. 来到我们的 `UPUPWANK` -> `编辑（笔的图标）` -> 找到项目（点击项目的笔图标）-> 修改`网站路径`为`D:\UPUPW_ANK_W64\WebRoot\Vhosts\thinkphp.shop\tp\public` -> `提交保存`(运行信息里面显示重载成功，可以看一下网站是否正常访问) <br/>

### 4、运行及配置项目
> 将项目tp文件夹拖进我们的VScode编辑器 <br/>
> #### 1. 修改 `.example.env` 文件名为  `.env` <br/>
> 2. 来到路由 `route/app.php` （类似eggjs项目的`app/router.js`）, 分析我们首页访问的内容是哪里的？ 
>> 学过我们前面eggjs课程的同学应该很容易想到，访问的内容是 `app/controller/index.php`这个里面的方法 `index`, 你可以改一下这个方法返回的内容进行测试 （thinkphp和我们的eggjs框架有很多相似之处，只是他们编写的语言不同）<br/>
>> 验证路径里面的hello方法：`http://thinkphp.shop/hello/迪丽热巴` 但发现访问失败，因此这里又跟egg.js有些区别<br/>
>> 正确访问路径是：`http://thinkphp.shop/index.php/hello/迪丽热巴`,需要加上`index.php` <br/>
> 也就是我们需要加上一个入口文件：`index.php`，它的位置在 `/public/index.php` <br/>
> #### 3. 简化入口文件：`index.php`
>> 来到我们的 `UPUPWANK` -> `找到当前项目(编辑，笔的符号)`-> `伪静态配置`<br/>
>> 说明：我们的`UPUPWANK`虽然是N模式，但是运行的是Apache的服务，因此，我们需要配置Apache的伪静态规则，来简化我们的入口文件，<br/>
>>> ```js
>>> <IfModule mod_rewrite.c>
>>>   Options +FollowSymlinks -Multiviews
>>>   RewriteEngine On
>>> 
>>>   RewriteCond %{REQUEST_FILENAME} !-d
>>>   RewriteCond %{REQUEST_FILENAME} !-f
>>>   RewriteRule ^(.*)$ index.php?/$1 [QSA,PT,L]
>>> </IfModule>
>>> ```

### 5、统一API接口返回格式
> 我们在eggjs项目统一了接口返回格式，因此，我们在thinkphp中也统一一下 <br/>
> 示例： `app/controller/index.php` <br/>
>> 比如：希望接口返回以下数据：
>> ```js
>> {
>>   "msg": "ok",
>>   "data": {
>>     "name": "迪丽热巴",
>>     "age": 18
>>   }
>> }
>> ```
>> 可在vscode中安装扩展：`PHP Intelephense`有语法提示，方便开发<br/>
>> ```js
>> public function index()
>> {
>>     // return '迪丽热巴';
>>     //使用关联数组形式
>>     return json([
>>         'msg' => 'ok',
>>         'data' => [
>>             'name' => '迪丽热巴',
>>             'age' => 18
>>         ]
>>     ], 200); 
>>     /*
>>     $data = (object) [
>>         'msg' => 'ok',
>>         'data' => (object) [
>>             'name' => '迪丽热巴',
>>             'age' => 18
>>        ]
>>     ];
>>     return json($data);
>>     */
>> }
>> ```
> #### 统一接口返回（类似eggjs中的`app/extend/context.js`中的`apiSuccess方法`）<br/>
> 在thinkphp中写在 `app/common.php`<br/>
>> ```js
>> //api接口形式成功提示,命名随便showSuccess,apiSuccess都可以
>> function apiSuccess($data = '',$msg='ok',$code=200){
>>     return json([
>>         'msg' => $msg,
>>         'data' => $data,
>>     ],$code);
>> }
>> 
>> //api接口形式失败提示 ,命名随便showError,apiFail都可以
>> function apiFail($msg='fail',$code=400){
>>     return json([
>>         'msg' => $msg,
>>     ],$code);
>> }
>> ```
>>> 示例： `app/controller/index.php` <br/>
>>> ```js
>>> public function index()
>>> {
>>>     // return '迪丽热巴';
>>>     /*
>>>     return apiSuccess([
>>>         'name' => '迪丽热巴',
>>>         'age' => 18
>>>     ]);
>>>     */
>>>     /*
>>>     return apiFail('数据不存在');
>>>     */
>>> }
>>> ```

### 6、异常处理
#### ① 如何抛出一个异常
> 在`app/controller/index.php`中，我们抛出一个异常，如下：
>>```js
>> public function index()
>> {
>>     // 比如用户被限制登录，此时后面的程序不能在执行可以抛出一个异常
>>     // tp框架提供了一个助手函数 abort()
>>     abort(20000, '你已被限制登录');
>> 
>>     // return '迪丽热巴';
>>     return apiSuccess([
>>         "name" => "迪丽热巴",
>>         "age" => 18
>>     ]);
>>     // return apiFail("请求失败"); 
>> }
>>```
#### ② 异常提示不友好，在`app/ExceptionHandle.php`中对 `render`函数进行扩展，来统一异常，如下：
>> ```js
>> public function render($request, Throwable $e): Response
>>     {
>>         // 调试模式
>>         if (env('APP_DEBUG')) {
>>             // 其他错误交给系统处理
>>             return parent::render($request, $e);
>>         }
>>         // 检查是否有 getHeaders 方法
>>         $headers = method_exists($e, 'getHeaders') ? $e->getHeaders() : [];
>>         $statusCode = method_exists($e, 'getStatusCode') ? $e->getStatusCode() : 400;
>> 
>>         return json([
>>             'msg' => $e->getMessage(),
>>             'errorCode' => $statusCode
>>         ], isset($headers['statusCode']) ? $headers['statusCode'] : $statusCode);
>>     }
>>```
> 将`.env`文件中的`APP_DEBUG`改为`false`，访问首页，发现异常提示友好了。<br/>
#### ③ 也可以在  `app/common.php` 封装一个`ApiException`方法：<br/>
>> ```js
>> // 抛出异常
>> function ApiException($msg = '请求错误',$errorCode = 20000,$statusCode = 400)
>> {
>>     abort($errorCode, $msg,[
>>         'statusCode' => $statusCode
>>     ]);
>> }
>> ```
>> 在`app/controller/index.php`中 调用 `ApiException`方法
>>> ```js
>>> public function index()
>>>     {
>>>         // 比如用户被限制登录，此时后面的程序不能在执行可以抛出一个异常
>>>         // tp框架提供了一个助手函数 abort()
>>>         // abort(20000, '你已被限制登录');
>>>         ApiException('你已被限制登录');
>>> 
>>>         // return '迪丽热巴';
>>>         return apiSuccess([
>>>             "name" => "迪丽热巴",
>>>             "age" => 18
>>>         ]);
>>>         // return apiFail("请求失败"); 
>>>     }
>>>```

## 二、创建及配置数据库
> 我们在前面的课程做项目准备的时候，已经告诉大家如何将数据库导入mysql了，大家打开`phpMyAdmin`，数据库`myegg`就是我们项目的数据库。<br/>
> 使用thinkphp的同学，来配置一下数据库连接：<br/>
> 打开`.env`文件：
>> ```js
>> [DATABASE]
>> TYPE = mysql
>> HOSTNAME = 127.0.0.1
>> DATABASE = myegg
>> USERNAME = root
>> PASSWORD = root
>> HOSTPORT = 3306
>> CHARSET = utf8
>> DEBUG = true
>> ```

## 三、管理员板块
### 1. 管理员表
> 其实数据库中有一个管理员表，这里为了方便两个技术栈同学学习，我们统一再创建一个管理员表 `shop_manager`<br/>
> 具体`shop_manager`表设计，<a href="/web/mysql/shop_manager" target="_blank">点击查看</a><br/>

### 2. 创建管理员
> 具体查看，<a href="/fourthless/w-a/thinkphp.管理员板块" target="_blank">点击查看</a><br/>

### 3. 修改管理员
> 具体查看，<a href="/fourthless/w-a/thinkphp.修改管理员" target="_blank">点击查看</a><br/>
>> <a href="/fourthless/w-a/thinkphp.修改管理员.html#二、字段唯一性验证处理" >字段唯一性验证处理</a><br/>
>> <a href="/fourthless/w-a/thinkphp.修改管理员.html#三、验证场景写成函数" >验证场景写成函数</a><br/>

### 4. 删除管理员
> 具体查看，<a href="/fourthless/w-a/thinkphp.修改管理员.html#五、删除管理员" target="_blank">点击查看</a><br/>

### 5. 管理员角色表
> 正常来说，应该叫`角色表：role`，这里为了方便大家更容易理解这个表，因此称它为 `管理员角色表`。事实上，这张表不仅可以包含管理员的各种角色，还可以设定用户的角色。<br/><br/>
> 说明：<br/>正常来说，我们的`管理员表`：`shop_manager`有一个字段叫：`role_id`,它这个字段实际上是`角色表：role`的id值，而到目前为止，我们数据库还不存在`角色表：role`，因此我们还需要创建一张`角色表：role`。<br/><br/>
> <span style="color:#ff6600;">重点说明：</span><br/>
> 正常来说，我们管理员表里面存在`role_id`这个字段，对应的是角色表`role`的id值，那么，首先应该创建角色表`角色表：role`，然后再创建管理员表`shop_manager`，但是由于本套课程涉及到两套框架`thinkphp`/`egg.js`，为了方便讲解及融合两天框架，因此我们先以管理员表为例，讲解了管理员表的`新增`、`修改`、`删除`，方便大家先了解`thinkphp`框架，接下来，由于需要讲到管理员列表，这里涉及到多表（角色表、管理员表）的模型关联、不管是`thinkphp`/`egg.js` 都存在模型关联，因此再讲管理员列表功能之前，我们需要创建一下`角色表：role`。<br/>
> <br/>
> 具体`角色表：role`设计，<a href="/web/mysql/role" target="_blank">点击查看</a><br/>

### 6. [新增]分类表`category`的角色表 `rolecategory`
重要说明：<br/>
> 本节课讲的分类表`category`的角色表 `rolecategory`，本不属于`管理员板块`的内容，主要是受我们上一节的影响，因此临时插入了这节课，因为我们分类表`category`的角色表 `rolecategory`，它的字段跟我们上节课讲的管理员角色表 `role`，字段是一样的，这样大家理解起来非常容易，只不过这张表`rolecategory`是充当的分类的角色。<br/><br/>
> 本节课是一节综合课，两种技术栈`thinkphp`和我们`egg.js`同学都学习操作一下。<br/><br/>
> 这张分类表`category`的角色表 `rolecategory`，主要是将来用于区别后台系统里面，不同的分类系统用的，比如，我们可以有一个大的综合性后台，这个后台可以管理：`普通企业网站的后台`、`商城后台`、`直播后台`等等，而这些后台分类，就可以用我们这张表`rolecategory`，目前大家先把这张表创建起来，后面我们学到了在详细讲这张表。<br/><br/>
> 具体`分类表角色表：rolecategory`设计，<a href="/web/mysql/rolecategory" target="_blank">点击查看</a><br/>

### 7. 管理员列表
> 具体查看，<a href="/fourthless/w-a/thinkphp.管理员列表" target="_blank">点击查看</a><br/>

## 四、管理员登录和退出
> 具体查看，<a href="/fourthless/w-a/thinkphp.管理员登录退出" target="_blank">点击查看</a><br/>
>> <a href="/fourthless/w-a/thinkphp.管理员登录退出.html#三、完成管理员登录功能后-创建中间件-完善之前和之后的api请求-需要进行权限验证" >完成管理员登录功能后，创建中间件，完善之前和之后的API请求，需要进行权限验证</a><br/>

## 五、管理员角色管理和状态设置
> 具体查看，<a href="/fourthless/w-a/thinkphp.管理员角色管理和状态设置" target="_blank">点击查看</a>
>> 1. <a href="/fourthless/w-a/thinkphp.管理员角色管理和状态设置.html#四、角色列表数据中-包含该角色对应的权限" target="_blank">注意第四点：获取角色列表数据中，包含该角色对应的权限</a><br/>
>> 2. <a href="/fourthless/w-a/thinkphp.管理员角色管理和状态设置.html#二、角色列表" target="_blank">【角色列表】</a><br/>
>> 3. <a href="/fourthless/w-a/thinkphp.角色管理" target="_blank">【创建角色】</a><br/>
>> 4. <a href="/fourthless/w-a/thinkphp.角色管理.html#二、修改角色" target="_blank">【修改角色】</a><br/>
>> 5. <a href="/fourthless/w-a/thinkphp.角色管理.html#三、修改角色状态" target="_blank">【修改角色状态】</a><br/>
>> 6. <a href="/fourthless/w-a/thinkphp.角色管理.html#四、删除角色" target="_blank">【删除角色】</a><br/>
>> 7. <a href="/fourthless/w-a/thinkphp.角色管理.html#五、给角色role配置权限rule" target="_blank">【给角色role配置权限rule】</a><br/><br/>
> 角色表`role`所有接口，<a href="/web/mysql/role表接口.html" target="_blank">点击查看</a>

## 六、权限管理板块
> 具体查看，<a href="/fourthless/w-a/thinkphp.权限管理" target="_blank">点击查看</a><br/><br/>
> 权限表`rule`所有接口，<a href="/web/mysql/rule表接口.html" target="_blank">点击查看</a>

## 七、管理员板块所有接口
> 具体查看，<a href="/web/mysql/shop_manager表接口.html" target="_blank">点击查看</a><br/>

## 八、图片管理板块
> 具体查看，<a href="/fourthless/w-a/thinkphp.图片管理板块" target="_blank">图片管理板块</a><br/>
> 特别说明：
>> 1. <a href="/fourthless/w-a/thinkphp.上传图片" target="_blank">上传图片</a><br/>
 