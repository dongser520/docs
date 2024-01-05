---
navbar: true
sidebar: auto
title: 章节2.Egg.js基础
---

前言
> 我们首先来解决上一季度提出的第一个问题，如何来统一管理我们服务器端nodejs的接口（路由）请求。<br/>我们在上一季度（第二季- <a href="/secondless/w-b/Node.js.html">章节7-Node.js基础</a> ）已经学习了node.js的基础，就好比我们在第二学期第1季度学习了JavaScript的基础课程一样。<br/>我们已经知道了为了方便我们编写js代码，我们在第2季度学习了jQuery，jQuery是JavaScript的框架库，它优化HTML文档操作、事件处理、动画设计和Ajax交互等等，而这些功能如果我们用原生JavaScript来编写会非常麻烦。<br/><br/>因此对比一下：<br/>如果我们把node.js看成服务器端的原生JavaScript，那么服务器端有没有类似于jQuery这样的框架库，来方便我们处理nodejs的代码呢？<br/>
> 类似于： `JavaScript ---> 框架库 ----> jQuery` ， `Node.js ---> 框架库 ----> ？` <br/> <br/>
> 答案是：有的，而且还有非常之多的Node.js框架！<br/>
> 本章节我们将讲解一个Node.js框架：Egg.js
<br/> <br/>

学习前准备
> 1. 关于基础 <br/>
> ① `对于零基础同学`，如果直接看本季度课程无法看懂，只需按照我们学习大纲的学习流程：第一学期 --> 第二学期第1季 --> 第二学期第2季，先学习完，再学习本季度课程将会轻松拿捏！<br/>
> ② `有一定js基础的同学`，如果还没有学习过 `vue.js`、`node.js`，请先学习一下我们上一季度（第二学期第2季）的课程，再来学习本季度课程<br/>
> ③ `有点js基础、了解一点node.js，vue.js的同学`，可以尝试直接学习本季度课程，但是如果学习过程中感到吃力，建议回去看一下第二学期第1季、第二学期第2季课程，因为所有的知识点都在这两个季度讲过了！<br/><br/>
> 2. 关于课件和资料  <br/>
> 大家直接去查看我们视频的第三课，里面告诉大家学习资料下载和学习文档地址，之后我们在课程中就不再提及了。<br/> <br/>
> 3. 课前准备  `（如果是从上一季度学习过来的同学，这个准备可以忽略，因为你已经准备好了）`<br/>
> ① `开发工具使用的是vscode`，具体安装： <a href="https://study.163.com/course/courseLearn.htm?courseId=1213374826&share=2&shareId=480000002289674#/learn/video?lessonId=1285001250&courseId=1213374826" target="_blank" title="安装vscode(第一学期视频第4课)点击查看">安装vscode(第一学期视频第4课)</a> （如果你直接学习本季度课程，这个应该是轻松拿捏！）<br/>
> ② `安装node环境`：这个已经在我们的第二学期的第二季课程--章节7.Node.js基础讲过了，还没有安装node环境的同学，如果不会安装，可以参考：<a href="/secondless/w-b/Node.js.html#一、node环境搭建-安装node-js" target="_blank" title="Node环境搭建文档"> [Node环境搭建文档]</a> 或者 <a href="#" target="_blank" title="Node环境搭建视频"> [Node环境搭建视频]</a>


序言
> 我们在上面已经说了，Node.js框架非常之多，比较火的框架有：
1. Express（node.js Web应用框架）<a href="https://www.expressjs.com.cn/" target="_blank" title="Express 中文网" style="margin-left:20px;margin-right:20px">Express 中文网</a> <a href="https://baike.baidu.com/item/eXpress/20184726?fr=ge_ala" target="_blank" title="Express百度简介">Express百度简介</a>
2. Koa（node.js Web应用框架）<a href="https://koajs.emptystack.net/" target="_blank" title="Koa 中文网" style="margin-left:20px;margin-right:20px">Koa 中文网</a> <a href="https://koa.bootcss.com/" target="_blank" title="Koa 学习文档">Koa 学习文档</a>
> Koa 是由Express原班人马设计的全新web框架，意在为web应用打造一个更小、更简洁、更健壮的基础框架。<br/>
> 那我们为什么要学习Egg.js呢？

## 一、关于Egg.js
> Egg.js中文官网：<a href="https://www.eggjs.org/zh-CN" target="_blank">https://www.eggjs.org/zh-CN</a><br/>
> 从Egg.js中文官网标题就可以看到，`Node.js & Koa`，也就是：Egg.js是在基于Nodejs的框架：Express和Koa框架的基础上（由于Express和Koa缺乏约定，缺乏规范，比较随意）
Eggjs对MVA进行约定规范，也就是Egg.js给了你一个规范标准，你按照它的标准写就可以，因此非常适合我们刚上手学习的小白进行学习，因此我们选择Egg.js进行学习。<br/>
> 另外：Egg.js是阿里提供的Node.js应用的核心基础设施，它面向的领域是：企业级的 web 基础框架，也就是Egg.js是为企业级框架和应用而生。
### ① 安装Egg.js项目
> 同样的，还是老规矩，把项目放在我们的D盘：D:\【第二学期第3季】课程代码\myegg文件夹下，进入myegg文件夹，按住键盘Shift键，点击鼠标右键，打开PowerShell
> 1. 输入：`node -v` 查看一下node版本，老师的是：`v18.12.1`，nodejs的最低版本要求8.X以上
> 2. 输入：`npm -v` 查看一下npm版本，老师的是：`8.19.2` ， npm版本 >=6.1.0
> 如果不显示以上命令，说明你没有安装node环境 <br/><br/>
> 接下来输入以下命令，安装eggjs项目
> 3. 为了方便我们快速下载项目依赖，先看一下npm下载源镜像：
> (忘了的同学，搜索`nrm`)
> ```js
> npm config get registry  // https://registry.npmmirror.com/ 老师已经是淘宝镜像了
> //如果你的不是淘宝镜像，切换到淘宝镜像
> npm config set registry https://registry.npmmirror.com/    //全局切换镜像
> ```
> 4. 安装eggjs项目
> ```js
> //初始化项目
> // npm init egg --type=simple 可能会报错
> //安装的时候临时切换淘宝镜像
> npm init egg --type=simple --registry https://registry.npmmirror.com 
> //输入y继续  
> //选第一个简单的eggjs项目  回车
> //输入项目名称：myegg01 或者直接回车（myegg）
> //输入项目描述：回车默认
> //输入项目作者：回车默认
> //cookie安全密钥: 回车默认
> //完成安装，并给你提示：
> //      - cd D:\【第二学期第3季】课程代码\myegg
> //      - npm install    //安装依赖
> //      - npm start / npm run dev / npm test
>
>
> //安装依赖
> npm i
>
>
> //运行项目
> npm run dev
> ```
如果出现：<a href="http://127.0.0.1:7001" target="_blank">http://127.0.0.1:7001</a>  则安装成功，可以在浏览器运行
