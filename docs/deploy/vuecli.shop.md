---
navbar: true
title:  thinkphp商城后台管理系统上线部署
--- 

# thinkphp商城后台管理系统上线部署


## 解析一个域名
> 在阿里云或腾讯云，域名管理中，解析一个域名到线上服务器，本次演示域名： `vuecli.shop.51yrc.com`，轻量应用服务器在域名栏目绑定域名。

## 服务器面板操作（以宝塔面板为例）
### 1. 创建网站
> 1.  `网站`-`PHP项目`-`添加站点`-`传统项目` <br/>
>> `域名`：vuecli.shop.51yrc.com <br/>
>> `备注`：vuecli.shop.51yrc.com (自动生成)<br/>
>> `根目录`：/www/wwwroot/vuecli.shop.51yrc.com  (自动生成)<br/>
>> `FTP`：不创建<br/>
>> `数据库`：MySQL---字符集：utf8mb4（存表情包），数据库账号、密码自动生成<br/>
>> `PHP版本`：PHP-72<br/>
>> `网站分类`：默认分类<br/>
>> 确定--> 点击域名看默认站点是否可以打开

### 2.部署项目后端
> 1. 群文件下载源码 （或私信老师获取源码）<br/>
> 2. 上传源码到服务器网站对应根目录/www/wwwroot/vuecli.shop.51yrc.com ， 解压源码<br/>
> 3. 网站-->对应网站-->`设置`，`网站目录`->`运行目录`->选择 `/public`->`保存`<br/>
> 4. 配置伪静态：`伪静态`->`thinkphp`,->`保存`<br/>
> 5. 修改数据库相关配置(可新开一个数据库窗口):<br/>
>> 根目录找到.env文件->`编辑`<br/>
>>> DATABASE = 数据库账号 <br/>
>>> USERNAME = 数据库账号 <br/>
>>> PASSWORD = 数据库密码 <br/>
> 6. 导入数据库（若跟源码放一起，可下载来再导入）-> `上传` -> `导入` ->`确定覆盖输入验证结果`-> `导入成功`<br/>
> 7. 修改配置文件：`config/cms.php`(具体看视频说明，改一些核心的申请的appkey)<br/>
> 8. 安装redis及扩展<br/>
>> 来到软件商店--> 搜索 `Redis` --> `安装`-->`最新版安装（大约需要2分钟）`<br/>
>> `已安装`->找到面板目前已安装的PHP版本如`PHP 7.2.33`, -> `设置` -> `安装扩展`-> `redis` -> `安装确定`（1分钟装好）<br/>
>> 测试前端api接口：<http://vuecli.shop.51yrc.com/api/index_category/data><br/>
>> 测试后端api接口：<http://vuecli.shop.51yrc.com/admin/imageclass/1><br/>
> 9. 开启任务队列（若配置了支付部分，且要调试支付部分，如订单支付板块等，需要开启任务队列）<br/>
>> 来到项目根目录 -> 打开终端 -> 输入 `php think queue:work` ，若提示函数禁用了，在来到宝塔面板<br/>
>> `软件商店`-> `已安装`-> `PHP 7.2.33`-> `设置`-> `禁用函数`-> `pcntl_signal、pcntl_alarm`-> `删除`-> 然后再到终端试一下 `php think queue:work`看报错不，如果还报错，看一下是哪个函数就删除哪个函数

### 3.部署项目前端vuecli页面部分
> 1. 群文件下载源码 （或私信老师获取源码）--【完整】vuecli商城后台【兼容node18】<br/>
> 2. 修改代理配置，后端地址：`vue.config.js`->`target`：`http://vuecli.shop.51yrc.com/admin`<br/>
> 3. 打包项目，项目里面没有node_modules文件，需要初始化node_modules文件，
>> 键盘shift+鼠标右键，`此处打开Powershell`然后输入命令：`npm install`安装依赖<br/>
>> 然后输入打包命令：`npm run build`打包，成功之后，项目根目录多出 `dist`文件夹    <br/>
>> 打开`dist`文件夹，全部选中，右键，`添加到压缩文件`--`zip`--`确定` --打包好了代码 `dist.zip` <br/>
> 4. 在解析一个域名，用于展示后台界面用的，如：`vuecli.html.shop`
> 5. 在宝塔面板中，网站-->添加网站-->`PHP项目`
>> `添加站点`--》`传统项目`--》`域名`：`vuecli.html.shop.51yrc.com`
>> `备注`：`vuecli.html.shop.51yrc.com`
>> `根目录`：`/www/wwwroot/vuecli.html.shop.51yrc.com`
>> `FTP`：不创建
>> `数据库`：不创建
>> `PHP版本`：`纯静态`
>> `网站分类`：默认分类
>> 确定-->点击域名看默认站点是否可以打开
> 6. 网站根目录，上传之前的打包代码`dist.zip` --> `解压`,之后可以访问：<http://vuecli.html.shop.51yrc.com><br/>
> 7. 输入`admin-admin`，`发现报错`：原因是：`views/login/index.vue里面写代码的时候直接访问 /admin/login 即前端地址`<br/>
> 8. 因此，需要在宝塔面板nginx配置一下代理地址：<br/>
>> 来到对应网站`vuecli.html.shop.51yrc.com`-> `设置` -> `配置文件` 加一段在 `#禁止访问的文件或目录# `上面<br/>
>> ```js
>> location /admin { //如果用户访问的是admin 
>>   proxy_pass http://vuecli.shop.51yrc.com/admin; //代理到后端地址 
>> }
>> ```
> 9. 重新访问<http://vuecli.html.shop.51yrc.com> 测试登录 `admin-admin`<br/>
