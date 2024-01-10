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

### ② 写一个api接口进行测试
> 1. 将项目拖进vscode；<br/><br/>
> 2. 看一下目录结构，参考eggjs官方文档：基础功能 --> <a href="https://www.eggjs.org/zh-CN/basics/structure" target="_blank"> [egg目录结构] </a> ，写的非常清楚，从目录结构可以看到eggjs比我们的koa约定更加规范一些。当然，我们实际在开发中，用得最多的两个目录分别是：`app` 和 `config` 两个目录。本节课，我们先看 `app`文件夹。<br/><br/>
> 3. 我们看到页面上显示 `hi,egg`，那么显示的这个字符串从哪里来的？ 它是在 `/app/controller/home.js`文件里面的 `index` 方法里面。<br/>
> 我们从`this`里面解构出了`ctx`，那这个 `ctx` 是个什么玩意呢？ 参考eggjs官方文档：`基础功能` --> `框架内置基础对象` --> `Context`，我们这个`ctx`就是`Context`的一个简写，这个`Context`继承自 <a href="https://koa.bootcss.com/index.html#context" target="_blank">Koa.Context </a> ，目前我们只需要了解  `ctx.request` 、 `ctx.response` 、 `ctx.body`，可类比一下我们原生nodejs如何向浏览器响应数据<br/><br/>
> 4. 模仿 `index` 方法写一个接口数据
```js
//模仿写一个接口数据
  async message(){
    // const { ctx } = this;
    this.ctx.body = {
        msg:'ok',
        data:[
           {username:'迪丽热巴',tel:'13505454758'},
           {username:'古力娜扎',tel:'13905454758'}
        ]
    };
}
```
> 5. 接口数据写好之后，如何在页面上访问呢？ 我们在原生nodejs里面需要进行判断，而在eggjs中，此时只需要定义一下路由即可 <br/>
> 路由定义在： `/app/router.js` 文件， 在这个文件里面定义路由即可，复杂的判断就交个eggjs内部去判断
```js
//定义路由： /app/router.js
//仿照上面的样本，可以看到是get请求，参数1：网址路径，参数2：控制器.控制器文件.方法
router.get('/message', controller.home.message);//访问地址：http://127.0.0.1:7001/message
// 比我们原生nodejs返回数据方便非常多
```

### ③ 说明一下，关于调试课件代码的问题
> 有同学去群文件里面下载对应的课件，然后运行里面的代码，发现报错，这里说明一下：`我们的课件里面没有node_modules文件夹，原因是因为它比较大，另外就是直接把node_modules文件夹拿过来运行也会报错，解决方案是：在运行代码之前，先下载依赖： npm install，然后在运行 npm run dev`


### ④ 自定义创建一个控制器
首先在vscode安装扩展插件： `eggjs`，方便提示我们并快速敲出eggjs代码 <br/>
> 我们上节课用到的控制器 `home.js` ，是我们在创建eggjs项目的时候，自动生成的，如果我们想自己写一个控制器，该怎么写呢？<br/>
`/app/controller/message.js`
```js
'use strict';

let fs = require('node:fs');
let path = require('node:path');

const Controller = require('egg').Controller;

class MessageController extends Controller {
  //所有留言信息列表
  async list() {
    /*
    //node内置全局模块变量__dirname
    console.log(__dirname);//D:\【第二学期第3季】课程代码\myegg\app\controller
    //D:\【第二学期第3季】课程代码\myegg\data\message.json
    console.log(path.resolve(__dirname,'../../','data/message.json'));
    let data = fs.readFileSync(path.resolve(__dirname,'../../','data/message.json'),{
      encoding:'utf-8'
    });
    console.log(typeof data);//sting
    console.log(JSON.parse(data).data);
    */
    this.ctx.body = {
      msg:'ok',
      // data : JSON.parse(data).data,
      data: await this.getMessageJson()
    };
  }
  //获取留言数据
  async getMessageJson(){
    //node内置全局模块变量__dirname
    console.log(__dirname);//D:\【第二学期第3季】课程代码\myegg\app\controller
    //D:\【第二学期第3季】课程代码\myegg\data\message.json
    console.log(path.resolve(__dirname,'../../','data/message.json'));
    let data = fs.readFileSync(path.resolve(__dirname,'../../','data/message.json'),{
      encoding:'utf-8'
    });
    console.log(typeof data);//sting
    console.log(JSON.parse(data).data);
    return JSON.parse(data).data;
  }
}

module.exports = MessageController;
```

> 我们首先要了解：`Koa 默认选择了async function 作为异步编程模型`，而我们的 Egg 选择了 Koa 作为其基础框架，在它的模型基础上，进一步对它进行了一些增强。Egg继承了Koa的高性能优点，同时又加入了一些约束与开发规范，来规避Koa框架本身的开发自由度太高的问题（这个我们在前面已经说过了）。因此，我们的 Egg 很自然的也是异步编程模型，async、await 可以让我们用同步写法编写异步代码。async 关键字声明函数，使用 await 关键字来等待一个 Promise 被 resolve 或者 reject、避免了回调地狱。 

接下来思考，如果我想获取留言板列表数据中的某一条数据该如何获取？

## 二、eggjs中的get请求post请求处理
### ① get方式路由传参：带?获取参数 ctx.query.参数名，不带?获取参数 ctx.params.参数名
> 获取某一条数据，同学们很自然想到可以在网址后面加问号加参数 <br/>
> 也就是我们常说的：带问号传参，如：`http://127.0.0.1:7001/message/read?id=1`  `http://127.0.0.1:7001/message/read?username=林俊杰`

带?获取参数 ctx.query.参数名
```js
// 路由配置 /app/router.js
// 带?传参 http://127.0.0.1:7001/message/read?id=1
router.get('/message/read', controller.message.read);

// 控制器代码 /app/controller/message.js
//获取某一条留言信息
async read(){
    //get方式带？获取参数  ctx.query.参数名，多个参数名是一样
    // this.ctx.body = this.ctx.query.id;
    let id = this.ctx.query.id;
    // console.log(typeof id);//string
    //根据id查找对应的留言数据，数组中根据某个条件找元素返回新数组 find方法
    let messageData = await this.getMessageJson();
    let data =  messageData.find(item=>item.id == id);
    this.ctx.body = {
        msg:'ok',
        data:data
    }
}
```
> 当然还有一种是不带问号也可以传参，如：`http://127.0.0.1:7001/message/read/1` 这种路由地址更加优雅

不带?获取参数 ctx.params.参数名
```js
// 路由配置 /app/router.js
//不带?传参 http://127.0.0.1:7001/message/read/1
router.get('/message/read/:id', controller.message.read);
//不带?传参 http://127.0.0.1:7001/message/read/林俊杰
// router.get('/message/read/:username', controller.message.read);

// 控制器代码 /app/controller/message.js
//获取某一条留言信息
async read(){
    //不带？获取参数  ctx.params.参数名
    // this.ctx.body = this.ctx.params.id;
    let id = this.ctx.params.id;
    // console.log(typeof id);//string
    //根据id查找对应的留言数据，数组中根据某个条件找元素返回新数组 find方法
    let messageData = await this.getMessageJson();
    let data =  messageData.find(item=>item.id == id);
    this.ctx.body = {
        msg:'ok',
        data:data
    }
}
```

### ② 设置响应状态码： ctx.status
```js
this.ctx.body = {
    msg:'ok',
    data:123
}
this.ctx.status = 401; //设置响应状态码
```

### ③ post请求参数处理
> 我们在上一季度已经讲过了post请求和get请求的区别，post请求参数是通过请求体发送的，并且在上一季度我们还讲过一个案例：nodejs+jQuery开发企业网页的留言板功能，大家也已经体验过了。<br/>
> 我们本节课来学习一下，在我们的eggjs项目中如何处理我们的post请求以及获取参数。
### 一、安装get/post等请求的调试工具：postman
### 1. 下载postman
> 方式一：百度搜索`postman`, 找到官网 <a href="https://www.postman.com/" target="_blank">https://www.postman.com/</a>，下载对应系统软件；<br/>
> 方式二：去群文件里面下载本节课的课件，里面有安装包。
### 2. 安装postman
> 双击鼠标左键安装即可，建议注册一个账户，以后换了电脑之前写的api接口都还在，非常方便

### 二、post请求获取参数：ctx.request.body
### 1. 关闭csrf功能开启跨域请求
```js
// 控制器代码 /app/controller/message.js
//新增一条留言
async create(){
    this.ctx.body = '跑通了';
}

// 路由配置 /app/router.js
//新增一条留言
router.post('/message/create',controller.message.create);
```
在postman调试的时候，发现报错，主要原因是：<br/>
`eggjs项目默认开启了csrf禁止跨域请求(它的一个保护机制)`，由于我们是开发环境需要调试代码，因此需要关闭这个保护机制，即：`关闭csrf功能开启跨域请求`
```js
//1. 第一步：安装跨域插件 egg-cors
npm i egg-cors --save

//2. 第二步：配置插件  根目录/config/plugin.js
//跨域插件
cors:{
   enable:true,
   package:'egg-cors',
},

//3. 第三步：设置     根目录/config/config.default.js
//关闭csrf功能开启跨域，写法固定，复制即可
config.security = {
  //关闭csrf
  csrf:{
     enable:false,
  },
  //跨域白名单 比如以后你有域名www.xxx.com，那么你可以设置www.xxx.com，容许这个域名下的请求跨域访问
  domainWhiteList:['http://localhost:7001'],
};
//允许跨域的方法
config.cors = {
    origin:'*',
    allowMethods:'GET,PUT,POST,DELETE,PATCH',
};
```

### 2. eggjs中post请求：ctx.request.body
```js
//创建一条信息的留言
async create(){
    //post、put、patch 接收参数 ctx.request.body
    // console.log(this.ctx.request.body);
    //一般处理流程
    //1.参数验证
    //2.写入数据库
    //3.成功之后给页面反馈
    this.ctx.body = {
        msg:'ok',
        // data:{
        //     username:'林俊杰',
        //     tel:13545858789
        // },
        data:this.ctx.request.body
    };
}
```
关于 `ctx.request` 更多内容查看： <a href="https://koa.bootcss.com/" target="_blank">https://koa.bootcss.com/</a>