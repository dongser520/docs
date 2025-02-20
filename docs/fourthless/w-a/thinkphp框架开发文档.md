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
> ThinkPHP6.0说明：<https://www.kancloud.cn/manual/thinkphp6_0/1037481> <br/>
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