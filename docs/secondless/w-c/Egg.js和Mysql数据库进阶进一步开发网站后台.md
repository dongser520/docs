---
navbar: true
sidebar: auto
title: 章节4.Egg.js和Mysql数据库进阶进一步开发网站后台
---

> <b>前言</b> <br/><br/>
> 基于同学们在上一章（第三章）对响应式网站后台的学习，以及我们第二章egg.js基础的学习，从本章节开始，我们将继续对网站后台进行扩展开发。
> <br/><br/>
> 我们在上一章已经完成了网站后台的管理员登录、管理员板块、留言板板块的开发。那么作为普通的企业网站后台，还应该有发布新闻信息、发布产品信息、管理网站导航栏等等功能。由于接下来的这些栏目，各个栏目板块数据库表之间的关联关系，相比较于我们前面开发的管理员列表、留言板板块，会相对复杂一些，因此我们将它们放在第四章进行讲解。
> <br/><br/>
> 由于考虑到我们会在后面的课程：关于小程序、APP的开发中涉及到直播功能、即时通讯功能、商城功能、高德百度腾讯地图功能、视频功能、网盘功能等等，以直播功能为例，直播功能依然需要后台对直播功能中的：用户、礼物、直播间等等板块做后台开发，因此我们借本章开发后台其它管理板块，一起给大家讲解一下关于直播的后台功能 <br/><br/>`目的就是：让大家更深入的理解我们egg.js项目中的模型关联关系。`

## 一、用户管理板块(以直播功能中的用户表liveuser表为例)
> 由于一般企业网站不存在用户管理，因此我们这里以大家感兴趣的‘直播’功能为例，讲一下用户管理板块<br/>
> 具体查看：<a href="/secondless/w-c/直播功能中的用户表liveuser" target="_blank" title="点击查看课程文档">直播功能中的用户表liveuser</a> 

## 二、礼物管理(以直播功能中的礼物表livegift表为例)
> 具体查看：<a href="/secondless/w-c/直播功能中的礼物表livegift" target="_blank" title="点击查看课程文档">直播功能中的礼物表livegift</a> 

## 三、订单管理(以直播功能中的订单表liveorder表为例)
### 初步理解关联关系
> 前面给大家已经讲了管理员表、留言表、用户表、礼物表，这四张表有个共同特点：就是它们每张表都是独立的，不跟其他表产生关联关系。<br/>
> 那么不经有同学要问了：什么叫做关联关系？<br/>
> 学习过我们上一季度（第二季）：`章节7.Node.js基础`，`章节9.Vue.js基础`的同学并不陌生，特别是最后我们举了一个案例：`node.js+vue.js 渲染企业网站`，如何来处理不同数据间的关联关系。<br/>
> 回顾了一下我们之前讲的不同json文件数据间的关联关系之后，同学们很自然的想到，既然我们的mysql就是关系型数据库，那么它应该也可以处理表之前的关联关系吧。<br/>
> 答案是：对的。我们的mysql数据库也可以处理表之间的关联关系。<br/><br/>
> 为了方便大家理解，我们接下来将由浅入深，逐步理解表之间的关联关系。因此，我们用直播中的订单表为例，方便大家理解。因为我们每个同学都会网购，网购购买商品都会产生订单，因此理解起来会容易一些。<br/>
> 
> 具体查看：<a href="/secondless/w-c/直播功能中的订单表liveorder" target="_blank" title="点击查看课程文档">直播功能中的订单表liveorder</a> 

## 四、直播间管理(以直播功能中的直播间表live表为例)
> 我们在上节课开发后台订单列表功能中，大家已经初步感受了数据库表之间的关联关系，模型关联查询的功能。那么为了让大家深入理解模型关联查询，我们再讲解一个直播功能中的直播间功能，让大家更深入理解。
> <br/>
> 具体查看：<a href="/secondless/w-c/直播功能中的直播间表live" target="_blank" title="点击查看课程文档">直播功能中的直播间表live</a> 

















































































<br/><br/><br/><br/><br/>

## 【第二学期第3季课程】其它章节
### [章节1.课程介绍](/secondless/w-c '章节1.课程介绍')
<!-- <LessList  /> -->
### [章节2.Egg.js基础](/secondless/w-c/Egg.js '章节2.Egg.js基础')
####  <a href="/secondless/w-c/Egg.js.html#一、关于egg-js" style="margin-left:40px;">一、关于Egg.js</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-安装egg-js项目" style="margin-left:70px;">① 安装Egg.js项目</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-写一个api接口进行测试" style="margin-left:70px;">② 写一个api接口进行测试</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-说明一下-关于调试课件代码的问题" style="margin-left:70px;">③ 说明一下，关于调试课件代码的问题</a>
##### <a href="/secondless/w-c/Egg.js.html#_4-自定义创建一个控制器" style="margin-left:70px;">④ 自定义创建一个控制器</a>
####  <a href="/secondless/w-c/Egg.js.html#二、eggjs中的get请求post请求处理" style="margin-left:40px;">二、eggjs中的get请求post请求处理</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-get方式路由传参-带-获取参数-ctx-query-参数名-不带-获取参数-ctx-params-参数名" style="margin-left:70px;">① get方式路由传参：带?获取参数 ctx.query.参数名，不带?获取参数 ctx.params.参数名</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-设置响应状态码-ctx-status" style="margin-left:70px;">② 设置响应状态码： ctx.status</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-post请求参数处理" style="margin-left:70px;">③ post请求参数处理</a>
##### <a href="/secondless/w-c/Egg.js.html#一、安装get-post等请求的调试工具-postman" style="margin-left:70px;">一、安装get/post等请求的调试工具：postman</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-下载postman" style="margin-left:100px;">1. 下载postman</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-安装postman" style="margin-left:100px;">2. 安装postman</a>
##### <a href="/secondless/w-c/Egg.js.html#二、post请求获取参数-ctx-request-body" style="margin-left:70px;">二、post请求获取参数：ctx.request.body</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-关闭csrf功能开启跨域请求" style="margin-left:100px;">1. 关闭csrf功能开启跨域请求</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-eggjs中post请求-ctx-request-body" style="margin-left:100px;">2. eggjs中post请求：ctx.request.body</a>
####  <a href="/secondless/w-c/eggjs+postman测试工具将留言写入json文件.html" style="margin-left:40px;">三、案例：eggjs + postman测试工具完成留言数据写入json文件</a>
####  <a href="/secondless/w-c/mysql数据库.html" style="margin-left:40px;">四、mysql（MySQL）数据库基础</a>
####  <a href="/secondless/w-c/Egg.js.html#五、eggjs项目中sequelize模型创建mysql数据库" style="margin-left:40px;">五、eggjs项目中sequelize模型创建mysql数据库</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-安装egg-sequelize-插件" style="margin-left:70px;">1.安装egg-sequelize 插件</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-在config-plugin-js中引入-egg-sequelize-插件" style="margin-left:70px;">2. 在config/plugin.js中引入 egg-sequelize 插件</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-在config-config-default-js中配置数据库连接" style="margin-left:70px;">3. 在config/config.default.js中配置数据库连接</a>
##### <a href="/secondless/w-c/Egg.js.html#_4-安装-sequelize-cli插件" style="margin-left:70px;">4. 安装 sequelize-cli插件</a>
##### <a href="/secondless/w-c/Egg.js.html#_5-数据库-migrations-迁移文件相关的内容都放在database目录下" style="margin-left:70px;">5. 数据库 Migrations 迁移文件相关的内容都放在database目录下</a>
##### <a href="/secondless/w-c/Egg.js.html#_6-初始化-migrations-配置文件和目录" style="margin-left:70px;">6. 初始化 Migrations 配置文件和目录</a>
##### <a href="/secondless/w-c/Egg.js.html#_7-在生成的database-config-json-修改一下配置内容" style="margin-left:70px;">7. 在生成的database/config.json 修改一下配置内容</a>
##### <a href="/secondless/w-c/Egg.js.html#_8-创建数据库" style="margin-left:70px;">8. 创建数据库</a>
##### <a href="/secondless/w-c/Egg.js.html#_9-创建数据库迁移文件" style="margin-left:70px;">9. 创建数据库迁移文件</a>
##### <a href="/secondless/w-c/Egg.js.html#_10-执行-migrate-进行数据库变更创建表" style="margin-left:70px;">10. 执行 migrate 进行数据库变更创建表</a>
####  <a href="/secondless/w-c/Egg.js.html#六、egg-js项目中sequelize模型新增数据到数据库" style="margin-left:40px;">六、egg.js项目中sequelize模型新增数据到数据库</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-创建模型文件" style="margin-left:70px;">1. 创建模型文件</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-编写模型文件" style="margin-left:70px;">2. 编写模型文件</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-插入一条数据到数据库-create方法" style="margin-left:70px;">3. 插入一条数据到数据库：create方法</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-1-定义路由" style="margin-left:100px;">3.1 定义路由</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-2-定义控制器" style="margin-left:100px;">3.2 定义控制器</a>
##### <a href="/secondless/w-c/Egg.js.html#_4-批量插入数据到数据库-bulkcreate方法" style="margin-left:70px;">4. 批量插入数据到数据库：bulkCreate方法</a>
##### <a href="/secondless/w-c/Egg.js.html#_5-修改器set-方法-数据插入到数据库前可自动修改成指定要求的数据" style="margin-left:70px;">5. 修改器set()方法：数据插入到数据库前可自动修改成指定要求的数据</a>
####  <a href="/secondless/w-c/Egg.js.html#七、egg-js项目查询数据" style="margin-left:40px;">七、egg.js项目查询数据</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-查询数据库中的单个数据-主键查询方法-findbypk-主键字段-、如果需要多个条件-可以使用findone方法" style="margin-left:70px;">1. 查询数据库中的单个数据：主键查询方法：findByPk(主键字段)、如果需要多个条件，可以使用findOne方法</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-查询数据库中的多个数据-查询多个findall-查询多个并统计条数findandcountall" style="margin-left:70px;">2. 查询数据库中的多个数据：查询多个findAll()，查询多个并统计条数findAndCountAll()</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-获取器get-方法-查询数据后可自动修改成指定要求的数据" style="margin-left:70px;">3. 获取器get()方法：查询数据后可自动修改成指定要求的数据</a>
####  <a href="/secondless/w-c/Egg.js.html#八、egg-js项目sequelize模型where操作符" style="margin-left:40px;">八、egg.js项目sequelize模型where操作符</a>
####  <a href="/secondless/w-c/Egg.js.html#示例" style="margin-left:70px;">示例</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-where操作符" style="margin-left:100px;">1. where操作符</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-where操作符范围选项" style="margin-left:100px;">2. where操作符范围选项</a>
####  <a href="/secondless/w-c/Egg.js.html#九、egg-js项目sequelize模型查询结果指定字段、排序、分页" style="margin-left:40px;">九、egg.js项目sequelize模型查询结果指定字段、排序、分页</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-attributes属性指定返回的字段-exclude属性指定排除的字段" style="margin-left:70px;">1. attributes属性指定返回的字段，exclude属性指定排除的字段</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-排序-order" style="margin-left:70px;">2. 排序：order</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-分页-limit指定每页返回多少条数据、offset指定偏移量" style="margin-left:70px;">3. 分页：limit指定每页返回多少条数据、offset指定偏移量</a>
##### <a href="/secondless/w-c/Egg.js.html#示例-2" style="margin-left:70px;">示例</a>
####  <a href="/secondless/w-c/Egg.js.html#十、egg-js项目sequelize模型更新数据" style="margin-left:40px;">十、egg.js项目sequelize模型更新数据</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-更新数据-save方法-指定修改字段fields属性" style="margin-left:70px;">1. 更新数据：save方法，指定修改字段fields属性</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-如果觉得save方法更新字段非常麻烦-可以使用update方法批量修改字段-第二个参数可指定修改字段" style="margin-left:70px;">2. 如果觉得save方法更新字段非常麻烦，可以使用update方法批量修改字段，第二个参数可指定修改字段</a>
####  <a href="/secondless/w-c/Egg.js.html#十一、egg-js项目sequelize模删除、批量删除数据-destroy方法" style="margin-left:40px;">十一、egg.js项目sequelize模删除、批量删除数据：destroy方法</a>
####  <a href="/secondless/w-c/Egg.js.html#十二、错误和异常统一处理" style="margin-left:40px;">十二、错误和异常统一处理</a>
####  <a href="/secondless/w-c/Egg.js.html#十三、中间件配置" style="margin-left:40px;">十三、中间件配置</a>
####  <a href="/secondless/w-c/Egg.js.html#十四、参数验证" style="margin-left:40px;">十四、参数验证</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-安装插件" style="margin-left:70px;">1. 安装插件</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-配置插件-config-plugin-js" style="margin-left:70px;">2. 配置插件 config/plugin.js</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-配置-config-config-default-js" style="margin-left:70px;">3. 配置 config/config.default.js</a>
##### <a href="/secondless/w-c/Egg.js.html#_4-控制器举例" style="margin-left:70px;">4. 控制器举例</a>
##### <a href="/secondless/w-c/Egg.js.html#_5-参数验证的错误提示在中间件中设置一下" style="margin-left:70px;">5. 参数验证的错误提示在中间件中设置一下</a>
##### <a href="/secondless/w-c/Egg.js.html#_6-valparams-api-说明" style="margin-left:70px;">6.ValParams API 说明</a>
####  <a href="/secondless/w-c/Egg.js.html#十五、路由分组" style="margin-left:40px;">十五、路由分组</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-新建-app-router目录-在该目录下新建对应控制器名文件" style="margin-left:70px;">1. 新建 app/router目录，在该目录下新建对应控制器名文件</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-在app-router-message-js中写路由" style="margin-left:70px;">2. 在app/router/message.js中写路由</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-在app-router-js中按控制器指定分组" style="margin-left:70px;">3.在app/router.js中按控制器指定分组</a>
####  <a href="/secondless/w-c/Egg.js.html#十六、模版引擎" style="margin-left:40px;">十六、模版引擎</a>
##### <a href="/secondless/w-c/Egg.js.html#_1-安装模版渲染插件" style="margin-left:70px;">1. 安装模版渲染插件</a>
##### <a href="/secondless/w-c/Egg.js.html#_2-在config-plugin-js中配置插件" style="margin-left:70px;">2. 在config/plugin.js中配置插件</a>
##### <a href="/secondless/w-c/Egg.js.html#_3-在config-config-default-js中配置模版引擎" style="margin-left:70px;">3. 在config/config.default.js中配置模版引擎</a>
##### <a href="/secondless/w-c/Egg.js.html#_4-vscode安装一下nunjucks模版引擎扩展-方便代码提示" style="margin-left:70px;">4. vscode安装一下nunjucks模版引擎扩展，方便代码提示</a>
##### <a href="/secondless/w-c/Egg.js.html#_5-新建-app-view目录-以后所有模版放这个目录里面" style="margin-left:70px;">5. 新建 app/view目录，以后所有模版放这个目录里面</a>
##### <a href="/secondless/w-c/Egg.js.html#_6-控制器-app-controller-home-js-写一个方法" style="margin-left:70px;">6. 控制器 app/controller/home.js 写一个方法</a>
##### <a href="/secondless/w-c/Egg.js.html#_7-重启项目-访问路由即可看到网页内容" style="margin-left:70px;">7. 重启项目，访问路由即可看到网页内容</a>
####  <a href="/secondless/w-c/Egg.js.html#egg-js基础课程总结" style="margin-left:40px;">egg.js基础课程总结</a>
### [章节3.响应式网页布局](/secondless/w-c/响应式网页布局 '章节3.响应式网页布局')
####  <a href="/secondless/w-c/响应式网页布局.html#_1-响应式网页布局是什么" style="margin-left:40px;">一、响应式网页布局是什么</a>
####  <a href="/secondless/w-c/响应式网页布局.html#_2-响应式网页布局的实现方法" style="margin-left:40px;">二、响应式网页布局的实现方法</a>
####  <a href="/secondless/w-c/响应式网页布局.html#_3-简单的响应式页面案例" style="margin-left:40px;">三、简单的响应式页面案例</a>
####  <a href="/secondless/w-c/响应式网页布局.html#_4-bootstrap框架" style="margin-left:40px;">四、Bootstrap框架</a>
####  <a href="/secondless/w-c/响应式网页布局.html#_5-响应式后台管理系统-egg-js-bootstrap" style="margin-left:40px;">五、响应式后台管理系统（egg.js + Bootstrap）</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html" style="margin-left:70px;">① 搭建界面引入模版html文件</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html#二、创建管理员-页面、创建数据库表及提交数据" style="margin-left:70px;">② 创建管理员（页面、创建数据库表及提交数据）</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html#三、管理员列表" style="margin-left:70px;">③ 管理员列表</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html#四、管理员列表分页功能" style="margin-left:70px;">④ 管理员列表分页功能</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html#五、公共模板开发" style="margin-left:70px;">⑤ 公共模板开发</a>
##### <a href="/secondless/w-c/响应式后台管理员登录.html" style="margin-left:70px;">⑥ 后台管理员登录</a>
##### <a href="/secondless/w-c/响应式后台用户留言板管理.html" style="margin-left:70px;">⑦ 后台用户留言板管理板块</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html#八、优化公共模版表格能够显示头像" style="margin-left:70px;">⑧ 优化公共模版表格能够显示头像</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html#九、后台左侧菜单栏" style="margin-left:70px;">⑨ 后台左侧菜单栏</a>
##### <a href="/secondless/w-c/上传文件.html" style="margin-left:70px;">⑩ 上传文件</a>
##### <a href="/secondless/w-c/响应式后台管理系统.html#十一、上传或修改管理员头像" style="margin-left:70px;">⑪ 上传或修改管理员头像</a>
### [章节4.Egg.js和Mysql数据库进阶进一步开发网站后台](/secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台 '章节4.Egg.js和Mysql数据库进阶进一步开发网站后台')

<br/><br/>

## 其它学期课程
### [第一学期（学习顺序：01）](/aboutless.html '第一学期课程')
> 第一学期课程专为零基础的学员定制录制的，纯html+css做企业网站的网页，主讲html和css的相关基础知识，flex布局相关知识，封装css基础样式库，引入字体图标及网页开发基础布局思维，完成企业网站网页的开发过程。<br/><br/>
<b><a href="https://study.163.com/course/courseMain.htm?courseId=1213374826&share=2&shareId=480000002289674" target="_blank">[第一学期学习视频]</a>
</b>

### [第二学期【第1季】（学习顺序：02）](/secondless/w-a '第二学期第1季课程')
> 主讲JavaScript的基础，建议所有学员观看。<br/>
<b>
   <a href="/secondless/w-a.html" target="_blank">[第1季学习文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a style="margin-left:20px;">[第1季学习视频]</a>
</b>

### [第二学期【第2季】（学习顺序：03）](/secondless/w-b '第二学期第2季课程')
> JavaScript中的面向对象，类，ajax，封装js库过渡到jQuery， vue.js基础配置网站页面，建议所有学员观看。<br/>
<b>
   <a href="/secondless/w-b.html" target="_blank">[第2季学习文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a style="margin-left:20px;">[第2季学习视频]</a>
</b>

### [第二学期【第3季】（学习顺序：04）](/secondless/w-c '第二学期第3季课程')
> egg.js基础，响应式网页布局，Bootstrap框架，响应式后台系统管理，建议所有学员观看。<br/>
<b>
   <a href="/secondless/w-c.html" target="_blank">[第3季学习文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a style="margin-left:20px;">[第3季学习视频]</a>
</b>