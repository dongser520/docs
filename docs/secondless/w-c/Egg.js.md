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


## 三、案例：eggjs + postman测试工具完成留言数据写入json文件
> 本节课我们以留言数据为例，一方面由于大家还没有学习到数据库（我们会在后面讲数据库），另外一方面是让大家回忆一下nodejs基础（我们在上一季度章节7：Node.js基础，学习过通过nodejs+jQuery完成了我们页面留言板的功能），本节课我们通过eggjs项目，通过：eggjs + postman测试工具，完成将留言写入json文件的功能，提升大家的新技能；
1. 上一季度案例：<a href="/secondless/w-b/nodejs+jQuery开发留言板.html" target="_blank">案例：nodejs+jQuery开发企业网页的留言板功能</a>
2. 本案例：eggjs + postman测试工具完成留言数据写入json文件，具体查看：<a href="eggjs+postman测试工具将留言写入json文件.html" target="_blank">案例：eggjs+postman测试工具将留言写入json文件</a>

## 四、mysql（MySQL）数据库基础
数据库作为我们Egg.js基础学习的一部分，本节课开始将带领大家学习数据库的基础知识。具体查看：<a href="mysql数据库.html" target="_blank">mysql（MySQL）数据库基础</a>

## 五、eggjs项目中sequelize模型创建mysql数据库
> 我们在前面几节课给大家讲解了一下mysql数据库的基础知识，数据库作为我们学习egg.js项目的一部分，我们已经学习了简单的增删改查的sql语句，那么接下来，我们如何在我们的egg.js项目中创建我们的mysql数据库呢？<br/>
> 我们接着上一节课，先简单回忆一下用vscode插件`DataBase Client`写sql语句，从删除数据库->创建数据库->创建表->查看表数据->写入表数据的过程
```sql
# 删除数据库
-- DROP DATABASE 数据库名;
DROP DATABASE myegg;
# 创建数据库
-- create database 库名 
CREATE DATABASE IF NOT EXISTS  `myegg`
DEFAULT CHARACTER SET = 'utf8mb4';
# 删除表
DROP TABLE message;
# 创建表
CREATE TABLE IF NOT EXISTS  message(
   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '留言板主键id',
   username VARCHAR(30) NOT NULL  COMMENT '留言用户的称呼',
   tel VARCHAR(32) NOT NULL  COMMENT '留言用户的电话号码加密',
   telnumber BIGINT(11) NOT NULL COMMENT '留言用户的电话号码',
   message TEXT COMMENT '留言用户的留言信息',
   timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '留言用户的留言时间戳',
   create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '数据创建时间',
   update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '数据更新时间'
) COMMENT '留言表';
# 查看表数据
SELECT * FROM message;
# 写入表数据
INSERT INTO message(username,tel,telnumber,message) 
VALUES
('古巨基','15udf5556e6c019d61e0uydd1daeaa3d',15825295858,'请及时联系，我想跟贵公司合作'),
('梁咏琪','1584poio4747kiu87uy6ty656ty65tt4',13658595502,''),
('岳云鹏','q12r45tfrfdrretfffffffrrdddw3e34',13817182520,'有合作意愿，请和我的经纪人联系'),
('张家辉','aq12ws3edfr45tg6yh7uj8ik9ol5p0oi',17870141818,''),
('刘德华','qwe3214r4re3w2qwe3wqwqsdweey6tyt',15820272928,'随时打这个电话联系'),
('迪丽热巴迪力木拉提','sw2de34r44434erererddddddsdeerff',13659595858,'请及时联系我'),
('李沁','yhtg6ty656tyttt4re43wewe43454r54',13100020007,''),
('古天乐','rftgyhujuhu78765trftgfdewsde3434',18162522208,''),
('大鹏','swderf545656trfgtrtfgtrfdertygtr',19918181101,''),
('黄晓明','ujikolkiujhygtrfdertrtfr45676543',13525250023,'想和贵公司谈合作');

```
以上是我们在vscode插件`DataBase Client`中使用sql语句创建数据库创建表，写入表数据的一系列操作，
接下来，我们来学习如何在我们的egg.js项目中创建我们的数据库及创建表数据
> 这里说明一下，创建和操作数据库的方式很多，可以用我们上面的vscode插件写sql语句创建数据库和表以及数据，也可以使用phpmyadmin等工具创建数据库和表以及数据。这个我们在前面讲数据库的时候都已经讲过了，老师这里讲另外一种创建方式，相比通过sql语句创建或者phpmyadmin等工具创建稍微复杂一点，但是流程是固定的，主要是：第一是为了给大家扩展知识，第二就是这种创建方式适合多人开发的时候便于管理我们的数据库。以下操作是固定操作，不需要记忆。
> 只需要按照以下步骤进行操作即可。

### 1.安装egg-sequelize 插件
> （它会辅助我们将定义好的 Model 对象加载到 app 和 ctx 上）和[mysql2](https://github.com/sidorares/node-mysql2)模块
```js
npm install --save egg-sequelize mysql2
```

### 2. 在`config/plugin.js`中引入 egg-sequelize 插件
```js
//egg-sequelize 插件
sequelize: {
  enable: true,
  package: 'egg-sequelize',
},
```

### 3. 在`config/config.default.js`中配置数据库连接
```js
// 配置数据库连接
config.sequelize = {
  dialect:  'mysql', // 数据库类型
  host:  '127.0.0.1', // 数据库地址 localhost
  username: 'root',  // 数据库用户名
  password:  'root', // 数据库密码
  port:  3306,// 端口号就用默认
  database:  'myegg',// 数据库名
  // 中国时区
  timezone:  '+08:00', // 设置时区
  define: {
      // 取消数据表名复数
      freezeTableName: true,
      // 自动写入时间戳 
      timestamps: true,
      // 字段生成软删除时间戳
      //paranoid: true, // 开启软删除
      //deletedAt: 'delete_time',
      // 将默认的created_at 字段名改为create_time
      createdAt: 'create_time', //自动写入时间戳创建时间字段
      // 将默认的updated_at 字段名改为update_time
      updatedAt: 'update_time', //自动写入时间戳更新时间字段
      // 所有驼峰命名格式化
      underscored: true
  }
};
```

### 4. 安装 sequelize-cli插件
sequelize 提供了[sequelize-cli](https://github.com/sequelize/cli)工具来实现[Migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html)，我们也可以在 egg 项目中引入 sequelize-cli。
```js
npm install --save-dev sequelize-cli
```

### 5. 数据库 Migrations 迁移文件相关的内容都放在`database`目录下
> 数据库迁移指用命令的形式去创建数据库、管理数据表的结构，这样的好处就是：创建我们的数据库和管理我们的数据表的时候，只需要输入一个命令就能办到，这样就省去了我们手动去创建数据库和管理数据表的步骤。
> 如果希望数据库的内容单独放在一个单独目录下，可以这么操作
```js
//根目录下新建一个`.sequelizerc`配置文件
'use strict';

const path = require('path');

module.exports = {
  config: path.join(__dirname, 'database/config.json'),
  'migrations-path': path.join(__dirname, 'database/migrations'),
  'seeders-path': path.join(__dirname, 'database/seeders'),
  'models-path': path.join(__dirname, 'app/model'),
};
```

### 6. 初始化 Migrations 配置文件和目录
```js
npx sequelize init:config  //这个命令运行一次就行了，初始化配置文件config.json
npx sequelize init:migrations //这个命令运行一次就行了，初始化migrations目录
// npx sequelize init:models
```

### 7. 在生成的`database/config.json` 修改一下配置内容
> 将其改成我们项目中使用的数据库配置：
```json
{
  "development": {
    "username": "root",
    "password": "root",
    "database": "myegg",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+08:00",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "myegg",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+08:00",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": "root",
    "database": "myegg",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+08:00",
    "operatorsAliases": false
  }
}

```

### 8. 创建数据库

```js
npx sequelize db:create
```
### 9. 创建数据库迁移文件
> 比如我现在要在数据库里面创建一张留言表  message
```js
npx sequelize migration:generate --name=init-message
```
执行完成之后，会在database / migrations / 目录下生成数据表迁移文件，然后定义
```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT} = Sequelize;
    // 创建表 --- 类似我们sql语句定义表结构
    await queryInterface.createTable('message', {
        id: { type: INTEGER(20).UNSIGNED, primaryKey: true, autoIncrement: true,comment: '留言板主键id' },
        username: { type: STRING(30), allowNull: false, defaultValue: '', comment: '留言板用户称呼'},
        tel: { type: STRING(32), allowNull: false, defaultValue: '' , comment: '留言用户的电话号码加密'},
        telnumber : { type: BIGINT(11), allowNull: false, defaultValue: 0 , comment: '留言用户的电话号码', unique: true},
        message : { type: TEXT, allowNull: true, defaultValue: '', comment: '留言用户的留言信息' },
        // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
        timestamp : {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
        create_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')},
        update_time: {type: DATE, allowNull: false, defaultValue:Sequelize.fn('NOW')}
    });
  },
  
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('message')
  }
};
```

### 10. 执行 migrate 进行数据库变更创建表
```js
// 升级数据库
npx sequelize db:migrate
// 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
npx sequelize db:migrate:undo
// 可以通过 `db:migrate:undo:all` 回退到初始状态
npx sequelize db:migrate:undo:all
```
再次重申，老师希望同学们能按照这个过程走一遍数据库的创建过程，当然，如果你实在懒得敲命令，也可以直接使用：
1. 通过插件写sql语句创建数据库;
2. 更懒一点的可以直接使用phpmyadmin创建数据库

<b>但是注意：</b><br/>

<span style="text-decoration:underline;color:green;">用sql语句创建数据库或者phpmyadmin创建数据库和表，在egg.js项目中需要连接数据库，也就是上面的第3步：`在config/config.default.js中配置数据库连接`，这一步必须要有！！！</span>


## 六、egg.js项目中sequelize模型新增数据到数据库
> 在egg.js项目中，如果希望操作表，比如：往留言表message表里面插入一条数据，或者更新一条数据、删除一条数据、查询数据等等这些，我们就需要用到数据模型。
我们一张表一般对应一个模型，比如我们的留言表message，我们就可以创建一个message模型，然后通过这个模型来操作表。
### 1. 创建模型文件
在app/model目录下创建message.js文件，即：`app/model/message.js`。注意：<br/>
1. 以后我们创建的其它表的模型文件都放在model这个文件夹下面。<br/>
2. 模型文件的命名和表名保持一致，比如：message.js对应message表。

### 2. 编写模型文件
模型文件的代码内容，和我们的迁移文件基本一样
```js
'use strict';
module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT, BIGINT } = app.Sequelize;
    const Message = app.model.define('message', {
        id: {
            type: INTEGER(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: '留言板主键id'
        },
        username: {
            type: STRING(30),
            allowNull: false,
            defaultValue: '',
            comment: '留言板用户称呼'
        },
        tel: {
            type: STRING(64),
            allowNull: false,
            defaultValue: '',
            comment: '留言用户的电话号码加密'
        },
        telnumber: {
            type: BIGINT(11),
            allowNull: false,
            defaultValue: 0,
            comment: '留言用户的电话号码',
            unique: true
        },
        message: {
            type: TEXT,
            allowNull: true,
            defaultValue: '',
            comment: '留言用户的留言信息'
        },
        // sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '留言用户性别'},
        timestamp: { type: DATE, allowNull: false, defaultValue: app.Sequelize.fn('NOW') },
        create_time: { type: DATE, allowNull: false, defaultValue: app.Sequelize.fn('NOW') },
        update_time: { type: DATE, allowNull: false, defaultValue: app.Sequelize.fn('NOW') }
    }, {
        //timestamps: true,//是否自动写入时间戳
        //tableName: 'message',//自定义数据表名称
    });

    return Message;
}
```

### 3. 插入一条数据到数据库：create方法
> 先让项目跑起来：`npm run dev`
### 3.1 定义路由 
`app/router.js`定义路由
```js
//上面的路由是关于留言的，对json文件的操作
//下面的路由是关于留言的，对数据库留言表的操作
router.post('/message/createOne',controller.message.createOne);
```
### 3.2 定义控制器
`app/controller/message.js`控制器代码
```js
//上面的代码是将留言写进json文件并操作
//下面的代码是将留言写进数据库并操作
async createOne(){
    // this.ctx.body = {
    //     msg:'ok',
    //     data:123
    // };
    //一般处理流程
    //1.参数验证
    //2.写入数据库
    let res = await this.app.model.Message.create({
        username:'迪丽热巴',
        tel:'1120c1bd1f78d6e6c019d61e1daeaa3d',
        telnumber:'13812345678',
        message:'需要联系'
    });
    //3.成功之后给页面反馈
    this.ctx.body = {
        msg:'ok',
        data:res
    };
}
```

### 4. 批量插入数据到数据库：bulkCreate方法
```js
//`app/router.js`定义路由 
//批量插入数据
router.post('/message/createMany',controller.message.createMany);

//`app/controller/message.js`控制器代码
//批量新增数据写进数据库
async createMany(){
    const res = await this.app.model.Message.bulkCreate([
        {username:'古巨基',tel:'15udf5556e6c019d61e0uydd1daeaa3d',telnumber:18162522208,message:'请及时联系，我想跟贵公司合作'},
        {username:'梁咏琪',tel:'1584poio4747kiu87uy6ty656ty65tt4',telnumber:13658595502,message:''},
        {username:'岳云鹏',tel:'q12r45tfrfdrretfffffffrrdddw3e34',telnumber:13817182520,message:'有合作意愿，请和我的经纪人联系'},
        {username:'张家辉',tel:'aq12ws3edfr45tg6yh7uj8ik9ol5p0oi',telnumber:17870141818,message:'随时打这个电话联系'},
        {username:'古天乐',tel:'sw2de34r44434erererddddddsdeerff',telnumber:13659595858,message:'请及时联系我'},
        {username:'李沁',tel:'yhtg6ty656tyttt4re43wewe43454r54',telnumber:13100020007,message:''},
        {username:'大鹏',tel:'swderf545656trfgtrtfgtrfdertygtr',telnumber:19918181101,message:''},
        {username:'黄晓明',tel:'ujikolkiujhygtrfdertrtfr45676543',telnumber:13525250023,message:'想和贵公司谈合作'},
    ]);
    this.ctx.body = {
        msg:'ok',
        data:res
    };
}
```

### 5. 修改器set()方法：数据插入到数据库前可自动修改成指定要求的数据
> 比如：username字段称呼，写入数据库之前自动在后面加上：（先生/女士）
```js
//`app/model/message.js`模型代码
username: { 
  type: STRING(30), 
  allowNull: false, 
  defaultValue: '', 
  comment: '留言板用户称呼',
  set(val){
      let data = val + '（先生/女士）';
      this.setDataValue('username',data);
  }
},
```

## 七、egg.js项目查询数据
> 我们仍然用上面的message.js模型为例
### 1. 查询数据库中的单个数据：主键查询方法：findByPk(主键字段)、如果需要多个条件，可以使用findOne方法
```js
//`app/router.js`定义路由 
//从数据库获取某一条留言数据
router.get('/message/readOne/:id', controller.message.readOne);

//`app/controller/message.js`控制器代码
//从数据库获取某一条留言数据
async readOne() {
    // this.ctx.body = 'ok';
    let id = parseInt(this.ctx.params.id);
    // 方式一：通过主键方式查询，当还需要其他字段条件时候，采用方式二
    // const data = await this.app.model.Message.findByPk(id);
    // 方式二：findOne方法，参数为一个对象，对象中包含查询的条件
    const data = await this.app.model.Message.findOne({
        where: {
            id: id,
            telnumber:13658595502
        }
    });
    if(!data){
        return this.ctx.body = {
            msg: 'fail',
            data: '数据不存在'
        }
    }
    this.ctx.body = {
        msg: 'ok',
        data: data
    }
}
```
### 2. 查询数据库中的多个数据：查询多个findAll()，查询多个并统计条数findAndCountAll()
```js
//`app/router.js`定义路由
//从数据库获取多条留言数据 http://127.0.0.1:7001/message/listMany
router.get('/message/listMany', controller.message.listMany);

//`app/controller/message.js`控制器代码
//从数据库获取多条留言数据
async listMany() {
    //查询多个，没有条件，返回所有数据
    // const data = await this.app.model.Message.findAll();
    //查询多个并统计条数 findAndCountAll() 便于我们分页计算
    const data = await this.app.model.Message.findAndCountAll();
    this.ctx.body = {
        msg: 'ok',
        data: data
    }
}
```
### 3. 获取器get()方法：查询数据后可自动修改成指定要求的数据
> 比如：timestamp字段，用户留言时间，目前查询的结果，时间不是我们想要的格式比如时间戳，可以通过get()方法，自动将时间格式修改成我们想要的格式
```js
//`app/model/message.js`模型代码
timestamp : {
  type: DATE, 
  allowNull: false, 
  defaultValue:app.Sequelize.fn('NOW'),
  get(){
      // this.getDataValue('timestamp') 可以获取到原始值
      let data = this.getDataValue('timestamp');
      /*
      //如果想转换成年月日时分秒，可以使用moment.js库等其他时间库
      //我们这里带领大家回忆一下js基础，就手动拼接一下
      let year = data.getFullYear();
      let month = ("0" + (data.getMonth() + 1)).slice(-2);
      let day = ("0" + data.getDate()).slice(-2);
      let hours = ("0" + data.getHours()).slice(-2);
      let minutes = ("0" + data.getMinutes()).slice(-2);
      let seconds = ("0" + data.getSeconds()).slice(-2);
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      */
      //如果想转成时间戳
      return (new Date(data)).getTime();
  }
},
```

## 八、egg.js项目sequelize模型where操作符
> 我们仍然用上面的message.js模型，用findAndCountAll()举例、其他方法如之前学习的：findOne()、findAll()等等都是一样使用。
## 示例
```js
//从数据库获取多条留言数据
async listMany() {
    //查询多个，没有条件，返回所有数据
    // const data = await this.app.model.Message.findAll();
    //查询多个并统计条数 findAndCountAll() 便于我们分页计算
    const Op = this.app.Sequelize.Op;//拿Op,固定写法
    const data = await this.app.model.Message.findAndCountAll({
        where:{
            // telnumber:13658595502,
            // telnumber:{
            //     [Op.eq] : 13658595502
            // },
            //查询称呼里面含有：鹏，这个字的数据
            username:{
                [Op.like] : '%鹏%'
            },
            //并且id>60
            id:{
                [Op.gt] : 60
            },
        }
    });
    this.ctx.body = {
        msg: 'ok',
        data: data
    }
}
```
### 1. where操作符
Sequelize 可用于创建更复杂比较的符号运算符 -

```js
const Op = this.app.Sequelize.Op;//拿Op,固定写法

[Op.and]: {a: 5}           // 且 (a = 5)
[Op.or]: [{a: 5}, {a: 6}]  // (a = 5 或 a = 6)
[Op.gt]: 6,                // id > 6
[Op.gte]: 6,               // id >= 6
[Op.lt]: 10,               // id < 10
[Op.lte]: 10,              // id <= 10
[Op.ne]: 20,               // id != 20
[Op.eq]: 3,                // = 3
[Op.not]: true,            // 不是 TRUE
[Op.between]: [6, 10],     // 在 6 和 10 之间
[Op.notBetween]: [11, 15], // 不在 11 和 15 之间
[Op.in]: [1, 2],           // 在 [1, 2] 之中
[Op.notIn]: [1, 2],        // 不在 [1, 2] 之中
[Op.like]: '%hat',         // 包含 '%hat'
[Op.notLike]: '%hat'       // 不包含 '%hat'
[Op.iLike]: '%hat'         // 包含 '%hat' (不区分大小写)  (仅限 PG)
[Op.notILike]: '%hat'      // 不包含 '%hat'  (仅限 PG)
[Op.startsWith]: 'hat'     // 类似 'hat%'
[Op.endsWith]: 'hat'       // 类似 '%hat'
[Op.substring]: 'hat'      // 类似 '%hat%'
[Op.regexp]: '^[h|a|t]'    // 匹配正则表达式/~ '^[h|a|t]' (仅限 MySQL/PG)
[Op.notRegexp]: '^[h|a|t]' // 不匹配正则表达式/!~ '^[h|a|t]' (仅限 MySQL/PG)
[Op.iRegexp]: '^[h|a|t]'    // ~* '^[h|a|t]' (仅限 PG)
[Op.notIRegexp]: '^[h|a|t]' // !~* '^[h|a|t]' (仅限 PG)
[Op.like]: { [Op.any]: ['cat', 'hat']} // 包含任何数组['cat', 'hat'] - 同样适用于 iLike 和 notLike
[Op.overlap]: [1, 2]       // && [1, 2] (PG数组重叠运算符)
[Op.contains]: [1, 2]      // @> [1, 2] (PG数组包含运算符)
[Op.contained]: [1, 2]     // <@ [1, 2] (PG数组包含于运算符)
[Op.any]: [2,3]            // 任何数组[2, 3]::INTEGER (仅限PG)

[Op.col]: 'user.organization_id' // = 'user'.'organization_id', 使用数据库语言特定的列标识符, 本例使用 PG
```
### 2. where操作符范围选项

所有操作符都支持支持的范围类型查询.
```js
// 所有上述相等和不相等的操作符加上以下内容:

[Op.contains]: 2           // @> '2'::integer (PG range contains element operator)
[Op.contains]: [1, 2]      // @> [1, 2) (PG range contains range operator)
[Op.contained]: [1, 2]     // <@ [1, 2) (PG range is contained by operator)
[Op.overlap]: [1, 2]       // && [1, 2) (PG range overlap (have points in common) operator)
[Op.adjacent]: [1, 2]      // -|- [1, 2) (PG range is adjacent to operator)
[Op.strictLeft]: [1, 2]    // << [1, 2) (PG range strictly left of operator)
[Op.strictRight]: [1, 2]   // >> [1, 2) (PG range strictly right of operator)
[Op.noExtendRight]: [1, 2] // &< [1, 2) (PG range does not extend to the right of operator)
[Op.noExtendLeft]: [1, 2]  // &> [1, 2) (PG range does not extend to the left of operator)
```
## 九、egg.js项目sequelize模型查询结果指定字段、排序、分页
> 很明显我们上面的查询结果是返回所有字段，如果想要指定字段，可以使用`attributes`属性
### 1. attributes属性指定返回的字段，exclude属性指定排除的字段
### 2. 排序：order
### 3. 分页：limit指定每页返回多少条数据、offset指定偏移量
### 示例
```js
//从数据库获取多条留言数据
async listMany() {
    //查询多个，没有条件，返回所有数据
    // const data = await this.app.model.Message.findAll();

    //拿到分页数
    let page = this.ctx.query.page ? parseInt(this.ctx.query.page) : 1;
    //那么此时只需要规定每页多少条，就可以计算偏移量，当然这个公式是固定的
    let limit = 3;
    let offset = (page - 1) * limit;

    //查询多个并统计条数 findAndCountAll() 便于我们分页计算
    const Op = this.app.Sequelize.Op;//拿Op,固定写法
    const data = await this.app.model.Message.findAndCountAll({
        where:{
            // telnumber:13658595502,
            // telnumber:{
            //     [Op.eq] : 13658595502
            // },
            //查询称呼里面含有：鹏，这个字的数据
            // username:{
            //    [Op.like] : '%鹏%'
            // },
            //并且id>60
            // id:{
            //     [Op.gt] : 60
            // },
            
        },
        //指定查询返回的字段
        // attributes: ['id', 'username','tel', 'telnumber', 'message'],
        //或者指定哪个或者几个字段不查出来，其他都查
        attributes:{
            exclude: ['create_time','update_time'],//排除字段
        },
        //排序
        order:[
            //数组  [字段，排序规则]
            ['id','desc'], //先按id降序排
            ['timestamp','asc'] //然后再按timestamp升序排
        ],
        //分页 http://127.0.0.1:7001/message/listMany?page=1
        //limit:3,//每页只显示3条
        //实际上数据库存在一个偏移量offset
        //offset: 3, //默认偏移量为0，也就是从第1条开始查

        // limit:limit, //每页显示多少条
        // offset:offset, //偏移量
        limit,
        offset
    });
    this.ctx.body = {
        msg: 'ok',
        data: data
    }
}
```


## 十、egg.js项目sequelize模型更新数据
### 1. 更新数据：save方法，指定修改字段fields属性
```js
//`app/router.js`定义路由 
//更新数据库的数据 http://127.0.0.1:7001/message/update/57
router.post('/message/update/:id',controller.message.update);

//`app/controller/message.js`控制器代码
//更新数据库的数据
async update(){
    // this.ctx.body = {
    //     msg: 'ok',
    //     data: 123
    // }
    //拿到id
    let id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 0;
    //根据id查询数据
    const data = await this.app.model.Message.findByPk(id);
    //如果没有这条数据则直接返回并提示
    if(!data){
        return this.ctx.body = {
            msg: 'fail',
            data: '数据不存在'
        }
    }
    //存在则更新数据
    //可以从postman或者页面拿修改的值
    // data.username = '123';
    data.username = this.ctx.request.body.username;
    data.telnumber = this.ctx.request.body.telnumber;
    //完成修改
    // let res = await data.save();
    // 前端给你传了很多修改字段，如果希望修改的时候，只修改你指定的字段
    let res =  await data.save({
        fields: ['username','telnumber'],//指定修改的字段，没有指定的不能修改
    });

    this.ctx.body = {
        msg: 'ok',
        data: res
    }
}
```

### 2. 如果觉得save方法更新字段非常麻烦，可以使用update方法批量修改字段，第二个参数可指定修改字段
```js
//`app/router.js`定义路由 
//更新数据库的数据 http://127.0.0.1:7001/message/update/57
router.post('/message/update/:id',controller.message.update);

//`app/controller/message.js`控制器代码
//更新数据库的数据
async update(){
    //拿到id
    let id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 0;
    //根据id查询数据
    const data = await this.app.model.Message.findByPk(id);
    //如果没有这条数据则直接返回并提示
    if(!data){
        return this.ctx.body = {
            msg: 'fail',
            data: '数据不存在'
        }
    }
    //存在则更新数据
    //拿到前端所有数据
    let params = this.ctx.request.body;
    // console.log(params);//{ username: 'GIGI', telnumber: '12345678903' }
    // let res = await data.update({
    //     username: 'GIGI', 
    //     telnumber: '12345678903'
    // });
    // let res = await data.update(params);
    //当然为了确保虽然前端给了我们很多字段，我们只想修改指定的字段，可以传第二个参数，跟save方法一样指定字段
    let res = await data.update(params,{
        fields:['username'],//指定修改字段
    });
    
    this.ctx.body = {
        msg: 'ok',
        data: res
    }
}
```

## 十一、egg.js项目sequelize模删除、批量删除数据：destroy方法
```js
//删除数据库的数据
async delete(){
    //删除单个数据
    //拿到id
    let id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 0;
    //查询数据
    const data = await this.app.model.Message.findByPk(id);
    // 不存在
    if(!data){
        return this.ctx.body = {
            msg: 'fail',
            data: '数据不存在'
        }
    }
    //存在则删除
    let res = await data.destroy();//删除单个数据
    this.ctx.body = {
        msg: 'ok',
        data: res
    }


    //批量删除数据，比如 id<62的全部删除
    // const Op = this.app.Sequelize.Op;
    let res = await this.app.model.Message.destroy({
        where:{
            id:{
                [this.app.Sequelize.Op.lt] : 62
            }
        }
    });
    this.ctx.body = {
        msg: 'ok',
        data: res  // 返回删除的条数
    }
}
```
## 十二、错误和异常统一处理
```js
//删除数据库的数据
async delete(){//我们一般抛出异常
    this.ctx.throw(500,'测试抛出异常错误');
    //我们毕竟是api接口，你给我返回一些html代码，不是我想要的，我需要简洁明了
    //那么我们就可以写一个中间件，来捕获它的异常是错误
    //中间件的名称你随便定义，我们这里定义叫做：error_handler.js
    //放在：app/middleware/error_handler.js  middleware文件夹放中间件
}
```
> 接下来，我们在中间件写代码：`app/middleware/error_handler.js`
```js
module.exports = ()=>{
    // 注意函数名errorHandler要和我们的文件名保持一致，
    //如果文件名error_handler.js有下划线，则写成驼峰式 errorHandler
    return async function errorHandler(ctx, next){
        //console.log('我是errorHandler');//测试的话，需要到config/config.default.js中设置配置一下
        //return next();//程序继续往下走
        //由此，我们可以对错误或异常做一个拦截
        try{
            await next();//会去执行控制器里面的方法
        }catch(error){
            // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
            ctx.app.emit('error', error, ctx); //日志在 logs/myegg01/common-error.log查看

            ctx.status = error.status;
            ctx.body = {
                msg:'fail',
                data:error.message
            }
        }
    }
}
```
> 接下来，我们在config/config.default.js中设置配置一下
```js
// add your middleware config here
config.middleware = ['errorHandler'];
```
配置之后，就是不管你访问哪个路由它会先经过这个中间件

## 十三、中间件配置
> 在十二的基础上，如果想指定某些路由走中间件，某些不走中间件，该如何配置？<br/>
> 这种场景如：读取新闻信息所有用户都可以读取，类似这样的路由就可以不走中间件，但是删除新闻信息只有管理员才能操作，类似这样的路由则需要走中间件，因此需要走中间件的，需要做一个判断是不是管理员
```js
//我们在config/config.default.js中继续配置中间件
config.middleware = ['errorHandler'];
// 对中间件errorHandler进一步配置
config.errorHandler = {
    // enable:false,//不开启中间件
    //指定走中间件的路由
    match:[
       "/message/delete", //只要包含/message/delete路由的任何页面都生效
       //"/message/readOne"
    ],
    // ignore:["/message/delete"],//除了这个不走，其他都走中间件，match 和 ignore 只能配置一个
};
```
关于中间件大家先了解这么多，后面我们在项目中涉及到登录的时候，在来详细讲。

## egg.js基础课程总结
### 1. 基础总结文档，对前面16个知识点的总结文档，查看 <a href="/secondless/w-c/egg.js基础总结" target="_blank" title="egg.js基础总结">egg.js基础总结</a>
### 2. egg.js重要知识详细文档，查看 <a href="/secondless/w-c/egg.js重要知识详细文档" target="_blank" title="egg.js重要知识详细文档">egg.js重要知识详细文档</a>