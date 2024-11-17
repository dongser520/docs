---
navbar: true
sidebar: auto
title: 章节5.SSL证书
---

前言
> 如果需要搭建https协议的网站，需要申请SSL证书。申请证书之前，域名需要进行备案。
## 一、申请SSL证书
> 先在阿里云或者腾讯云进行实名认证，备案好域名，然后申请证书。<br/>
> 具体操作看课程视频。

## 二、搭建https协议网站
> 1. 证书签发完成后，先下载证书，根据你的服务器环境选择相应证书，比如我们这个网站，选择：Nginx 证书下载;<br/>
> 2. 下载下来之后解压，用vscode等编辑器打开；<br/>
> 3. 来到宝塔面板，找到你要配置的网站，点击设置 -> SSL -> 当前证书 -> 粘贴密钥和证书 -> 保存并启用

















<br/><br/><br/><br/><br/><br/><br/><br/>

## 【第二学期第4季课程】其它章节
### [章节1.课程介绍](/secondless/w-d '章节1.课程介绍')
<!-- <LessList  /> -->
### [章节2.购买域名及备案](/secondless/w-d/购买域名 '章节2.购买域名及备案')
####  <a href="/secondless/w-d/购买域名.html#一、购买域名" style="margin-left:40px;">一、购买域名</a>
##### <a href="/secondless/w-d/购买域名.html#_1-登录供应商官网-阿里云为例" style="margin-left:70px;">1. 登录供应商官网（阿里云为例）</a>
##### <a href="/secondless/w-d/购买域名.html#_2-选购域名" style="margin-left:70px;">2. 选购域名</a>
####  <a href="/secondless/w-d/购买域名.html#二、icp备案-域名备案-【选修】" style="margin-left:40px;">二、ICP备案（域名备案）【选修】</a>
### [章节3.购买服务器](/secondless/w-d/购买服务器 '章节3.购买服务器')
####  <a href="/secondless/w-d/购买服务器.html#一、服务器选购" style="margin-left:40px;">一、服务器选购</a>
####  <a href="/secondless/w-d/购买服务器.html#二、服务器环境搭建" style="margin-left:40px;">二、服务器环境搭建</a>
##### <a href="/secondless/w-d/购买服务器.html#_1-服务器设置" style="margin-left:70px;">① 服务器设置</a>
##### <a href="/secondless/w-d/购买服务器.html#_2-服务器环境搭建" style="margin-left:70px;">② 服务器环境搭建</a>
##### <a href="/secondless/w-d/购买服务器.html#_3-可视化面板设置" style="margin-left:70px;">③ 可视化面板设置</a>
### [章节4.网站代码上线调试](/secondless/w-d/网站代码上线调试 '章节3.网站代码上线调试')
####  <a href="/secondless/w-d/网站代码上线调试.html#一、解析域名到服务器" style="margin-left:40px;">一、解析域名到服务器</a>
####  <a href="/secondless/w-d/网站代码上线调试.html#二、创建网站" style="margin-left:40px;">二、创建网站</a>
####  <a href="/secondless/w-d/网站代码上线调试.html#三、打包代码上传到服务器并解压" style="margin-left:40px;">三、打包代码上传到服务器并解压</a>
####  <a href="/secondless/w-d/网站代码上线调试.html#四、安装node环境、切换node版本" style="margin-left:40px;">四、安装node环境、切换node版本</a>
##### <a href="/secondless/w-d/网站代码上线调试.html#_1-安装pm2管理器" style="margin-left:70px;">1. 安装PM2管理器</a>
##### <a href="/secondless/w-d/网站代码上线调试.html#_2-切换node版本" style="margin-left:70px;">2. 切换node版本</a>
####  <a href="/secondless/w-d/网站代码上线调试.html#五、打开命令行-切换到根目录下" style="margin-left:40px;">五、打开命令行，切换到根目录下</a>
####  <a href="/secondless/w-d/网站代码上线调试.html#六、初始化项目依赖" style="margin-left:40px;">六、初始化项目依赖</a>
##### <a href="/secondless/w-d/网站代码上线调试.html#_1-安装依赖-npm-install" style="margin-left:70px;">① 安装依赖 npm install</a>
####  <a href="/secondless/w-d/网站代码上线调试.html#七、修改配置" style="margin-left:40px;">七、修改配置</a>
##### <a href="/secondless/w-d/网站代码上线调试.html#_1-config-config-default-js" style="margin-left:70px;">① config/config.default.js</a>
##### <a href="/secondless/w-d/网站代码上线调试.html#_2-database-config-json" style="margin-left:70px;">② database/config.json</a>
####  <a href="/secondless/w-d/网站代码上线调试.html#八、安装数据库迁移工具-执行迁移命令" style="margin-left:40px;">八、安装数据库迁移工具，执行迁移命令</a>
##### <a href="/secondless/w-d/网站代码上线调试.html#_1-安装数据库迁移工具" style="margin-left:70px;">① 安装数据库迁移工具</a>
##### <a href="/secondless/w-d/网站代码上线调试.html#_2-执行迁移命令-npx-sequelize-db-migrate" style="margin-left:70px;">② 执行迁移命令 npx sequelize db:migrate</a>
####  <a href="/secondless/w-d/网站代码上线调试.html#九、启动项目-npm-start" style="margin-left:40px;">九、启动项目 npm start</a>
####  <a href="/secondless/w-d/网站代码上线调试.html#十、创建反向代理" style="margin-left:40px;">十、创建反向代理</a>
### [章节5.SSL证书](/secondless/w-d/SSL证书 '章节5.SSL证书')
####  <a href="/secondless/w-d/SSL证书.html#一、申请ssl证书" style="margin-left:40px;">一、申请SSL证书</a>
####  <a href="/secondless/w-d/SSL证书.html#二、搭建https协议网站" style="margin-left:40px;">二、搭建https协议网站</a>


<br/><br/><br/>



## 其它学期课程
### [第一学期（学习顺序：01）](/aboutless.html '第一学期课程')
> 第一学期课程专为零基础的学员定制录制的，纯html+css做企业网站的网页，主讲html和css的相关基础知识，flex布局相关知识，封装css基础样式库，引入字体图标及网页开发基础布局思维，完成企业网站网页的开发过程。<br/><br/>
<b><a href="https://study.163.com/course/courseMain.htm?courseId=1213374826&share=2&shareId=480000002289674" target="_blank">[第一学期学习视频]</a>
</b>

### [第二学期【第1季】（学习顺序：02）](/secondless/w-a '第二学期第1季课程')
> 主讲JavaScript的基础，建议所有学员观看。<br/>
<b>
   <a href="/secondless/w-a.html" target="_blank">[第1季学习文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a style="margin-left:20px;" href="https://study.163.com/course/courseMain.htm?share=2&shareId=480000002289674&courseId=1213550818" target="_blank">[第1季学习视频]</a>
</b>

### [第二学期【第2季】（学习顺序：03）](/secondless/w-b '第二学期第2季课程')
> JavaScript中的面向对象，类，ajax，封装js库过渡到jQuery， vue.js基础配置网站页面，建议所有学员观看。<br/>
<b>
   <a href="/secondless/w-b.html" target="_blank">[第2季学习文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a style="margin-left:20px;" href="https://study.163.com/course/courseMain.htm?share=2&shareId=480000002289674&courseId=1213781850" target="_blank">[第2季学习视频]</a>
</b>

### [第二学期【第3季】（学习顺序：04）](/secondless/w-c '第二学期第3季课程')
> egg.js基础，响应式网页布局，Bootstrap框架，响应式后台系统管理，完整企业网站前后台开发，建议所有学员观看。<br/>
<b>
   <a href="/secondless/w-c.html" target="_blank">[第3季学习文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a style="margin-left:20px;" href="https://study.163.com/course/courseMain.htm?share=2&shareId=480000002289674&courseId=1213780858" target="_blank">[第3季学习视频]</a>
</b>

### [第二学期【第4季】（学习顺序：05）](/secondless/w-d '第二学期第4季课程')
> 主要对第三季，同学们开发的企业网站，进行一个完整的上线运维流程的一个讲解，同学们将网站开发完成之后，如何进行上线运维，将项目交付给客户。<br/>
<b>
   <a href="/secondless/w-d.html" target="_blank">[第4季学习文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a style="margin-left:20px;">[第4季学习视频]</a>
</b>