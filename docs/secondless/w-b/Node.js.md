---
navbar: true
sidebar: auto
title: 章节7.Node.js基础
---

前言
> 1. 关于Node.js<br/><br/>
> 我们在上一章节最后总结的时候提到，如果我们想往服务器提交表单数据，由于我们没有后端程序员给你接口，那么只有自己写一个接口，作为我们前端开发，存在一门和后端语言：PHP、Python、Perl、Ruby等服务端语言平起平坐的脚本语言，就是 `node.js`。<br/><br/>
> 2. Node.js介绍 <a href="https://baike.baidu.com/item/node.js/7567977?fr=ge_ala" target="_blank">[node.js百度百科]</a><br/><br/>
> 概述：<br/><br/>
> ①、 Node.js 是一个开源、跨平台的 JavaScript 运行时环境。<br/><br/>
> 作用、应用、优势：<br/><br/>
> ① Node.js是脱离浏览器运行JS：我们知道我们之前的课程不管是原生js还是我们刚刚学习的jQuery，都是在浏览器运行的js代码，脱离了浏览器，我们的js就没办法运行了。而我们的node.js可以运行在别的终端上，那么它就可以帮你调用你想要的东西，比如：你想获取一下你电脑现在的CPU配置，内存配置，往电脑磁盘上写入一个如json文件，修改json文件等等，这些功能以前是后端程序做的事情，现在node.js也可以做。<br/><br/>
> ② 后台API编写：就是我们说的接口的编写，我们前端的工作大部分不是写页面，就是调接口了。在你不懂的情况下， 还以为接口多神奇，学完node之后，我们也可以写接口。<br/><br/>
> ③ Webpack,Gulp,Npm等等，这些工具是依赖node的，也就是前端工程化的这些工具，没有node玩不了。<br/><br/>
> ④ （重要应用）中间层：服务器中复杂IO读写的中间层服务器，你可以粗俗的认为一个文件的读写、数据库的查询，这些都是由中间层node来做好一些。<br/><br/>
> ⑤ 优势：1、便于前端开发入门，因为node的语法和对象，和我们写js基本上一样，你有了前面的js基础，写node代码非常容易。2、单纯比性能，node的性能比java、php等等语言高出非常多。每年双11，天猫淘宝能抗住一波又一波海量数据请求，node起了非常大的作用。主要是它运行在`Chrome V8 JavaScript engine`这么一个引擎上面，这个引擎非常强大。3、由于node的写法和前端js非常像，所以相比于其它语言，node更利于前端代码的整合，前端写代码，有的可以直接给node用，比如说表单校验等等。

## 一、Node环境搭建（安装node.js）
## 1、 下载安装node.js
> 安装非常简单，在官网上下载 node-v-xx.msi(window系统)傻瓜式的安装包，一直下一步就可以完成安装。
<a href="https://www.nodejs.com.cn/" target="_blank">nodejs中文官网</a>  <a href="https://nodejs.org/en" target="_blank" style="margin-left:20px">nodejs英文官网</a> <br/><br/>
> 
> `LTS 长期支持版`建议下载这个，`Current 尝鲜版`版本较高，还未普及，尝鲜使用新功能可以试试 <br/><br/>
> <img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/2-2-7-01.jpg" alt="下载node" class="zoom-custom-imgs" 
style="display:inline-block;" /> 
> 选择自己的操作系统 windows Mac Linux windows需要区分64位和32位 Mac需要区分64位还是ARM芯片 Linux同上。 其中msi 和 pkg 可以直接安装较为简单<br/>
> `如果不想下载的同学，可以去群里面下载本节课的课件，里面有安装包`

## 2、 检查node.js是否安装成功
> ### ① 命令行：node -v npm -v npx -v
> window系统：快捷键` window键 + R键（开始-->运行）` 输入：`cmd` 打开命令行工具，苹果系统也是找到你电脑上的命令行工具
> ```javascript
> node -v
> // v18.12.1 (不同的同学，不同的时期下载的node版本号不一样，重点看一下能不能输出)
> npm -v
> npx -v
> ```
> ### ② 命令行：node 运行js代码
> 可以通过 node 回车，在命令行运行js代码
> ```javascript
> node
> // 此时光标换行在闪，就是你可以输入js代码
> let a = 1 (回车)
> a + 10  (返回11 回车)
> ```
> ### ③ 命令行：运行js文件代码，清屏命令: cls
> 在D盘创建一个文件夹：mynode(名字随意取最好是英文便于输入)，D:\mynode\a.js文件，写入 `console.log("迪丽热巴");` <br/><br/>
> 运行a.js文件方式一：(打开命令行工具，因为当前的命令行工具在运行js代码，需要重新打开新的命令行工具)
> ```javascript
> //进入D盘（因为文件在D盘）
> D: (注意冒号英文状态 回车)
> //进入mynode文件夹
> cd mynode (进入文件夹cd空格文件夹名字  回车)
> //运行a.js文件
> node a.js  (或者)
> node a
> ```
> 运行a.js文件方式二：（感觉方式一很麻烦）<br/>
> 直接在a.js文件夹里面，`先按住键盘SHIFT(shift)键不要松手`，`然后点鼠标右键`，鼠标左键点击：`在此处打开Powershell 窗口`，就可以跳过方式一里面的找文件路径的操作了
> ```javascript
> //运行a.js文件
> node a.js  (或者)
> node a
> ```

## 二、NVM（node版本管理工具，切换node版本）
> 在我们实际开发中，公司或者个人可能有多个项目，由于开发时期的不同，导致使用的node版本也不同，于是我们在运行项目的时候，需要切换到不同的node版本运行不同的项目，这个时候就需要一个管理node版本的工具：NVM。比如说：就以我们本节课而言，不同的同学学习的时候，由于nodejs的更新，你下载的nodejs版本都不同，不利于我们统一学习调试，所以我们也需要安装一下NVM，统一切换到某一个版本来学习。
## 1、 下载安装nvm
> ① 访问NVM的github仓库：<a href="https://github.com/coreybutler/nvm-windows/releases" target="_blank">下载github仓库中的nvm</a>  <span style="margin-left:15px"> ② 去群里面下载本节课的课件，里面有安装包</span> <br/>
> 安装非常简单，跟上面安装nodejs一样，下一步下一步（next）直到安装完成。

## 2、检查nvm是否安装成功：nvm -v
> 跟上面检查node方式一样：window系统为例，快捷键` window键 + R键（开始-->运行）` 输入：`cmd` 打开命令行工具，输入命令：
> ```javascript
> nvm -v 或者 nvm version  (能输出版本号则安装成功)
> ```

## 3、设置nodejs、npm下载源（可选）
> 我们用nvm来管理和下载nodejs各个版本，在安装完的nvm文件夹里面（一般是这个路径）：`C:\Users\Administrator\AppData\Roaming\nvm` 有一个文件 `settings.txt` <br/>
> 默认情况下，也就是你不往这个里面指定node的下载源地址，那么：<br/>
> ① node的默认下载源地址是：<a href="https://nodejs.org/dist/" target="_blank">https://nodejs.org/dist/</a> (国外地址) <br/><br/>
> 如果你感觉到时候下载nodejs非常慢，可以在`settings.txt`写入以下代码，指定nodejs和npm包的下载源，它们是国内的淘宝镜像地址，下载会非常快
> ```txt
> node_mirror: https://npm.taobao.org/mirrors/node/
> npm_mirror: https://npm.taobao.org/mirrors/npm/
> ```
> <a href="https://npm.taobao.org/mirrors/node/" target="_blank">https://npm.taobao.org/mirrors/node/</a> 淘宝nodejs下载源<br/>
> <a href="https://npm.taobao.org/mirrors/npm/" target="_blank">https://npm.taobao.org/mirrors/npm/</a> 淘宝npm包下载源<br/>

## 4、使用NVM包管理器
> 以下是常见命令，不需要记忆，用的时候回来看一下（最好是记住）
> ```javascript
> nvm -h                  //查看所有nvm命令
>
> nvm ls 或者 nvm list      //查看安装的所有node.js的版本
> 
> nvm list available        //查看显示可以安装的所有node.js的版本
> 
> nvm install 20.10.0       //安装20.10.0版本的node.js包 (你们可以安装：18.12.1 和 12.16.1)
> 
> nvm use 20.10.0           //指定使用node的版本是： 20.10.0 （如果报错是权限不够，切换成管理员模式重新cmd）
> node -v  //看一下是否切换过来了
> 
> nvm list installed       //查看已经安装的node.js版本
> 
> nvm current              //显示当前使用的node.js版本
> 
> nvm uninstall 12.16.1    //卸载node.js版本号为：12.16.1的包
> nvm ls //在查看一下安装的版本，看是否卸载了
> ```

## 三、NPM包管理（npm包管理工具）
> 我们上一节课讲nvm的时候，提到了npm包下载源，那什么是npm呢？全称：`Node Package Manager`，是一个NodeJS包管理和分发工具。那它有什么用呢？它可以帮我们去管理我们项目中引用的第三方库、插件、模块等等。我们来回顾一下，我们前端网页怎么引入第三方库和插件的.
> ```html
> <script src="./static/js/jquery.1.11.3.min.js"></script>
> <script src="https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
> <script src="./static/js/index.jquery.js"></script>
> ```
> 我们先引入jquery库，然后在它的基础上引入jquery的插件，最后利用jquery库和插件，写我们自己的代码。如果到后期库和插件非常多，我们也不敢随便删，管理起来特别不方便。那么在我们的node中，就有这个npm，它可以来管理我们这些库、插件、模块等等。<br/>
> 这个npm包管理中有一个非常重要的文件，是`package.json`，它会帮你记录你用了哪些库，插件，模块，以及它们之间的依赖。<br/>
### ① package.json 文件如何生成
> 依旧在`D:\mynode\`文件夹下，打开命令行窗口：`先按住键盘SHIFT(shift)键不要松手`，`然后点鼠标右键`，鼠标左键点击：`在此处打开Powershell 窗口` <br/>
> `为了方便我们学习，我们统一将node版本设置到：18.12.1`
> ```javascript
> nvm use 18.12.1 //指定使用node的版本是： 18.12.1
> node -v  //看一下是否切换过来了
> ```
> ```javascript
> npm init //初始化项目的意思(发现有一堆英文，不用去管)
> 
> package name: (mynode) 包名字叫什么，默认显示的是文件夹的名字 mynode 可以直接回车，不用写，也可以自己写一个英文名字
> version: (1.0.0) 版本号是多少，可以直接回车按这个默认的即可
> description: 描述是什么 不想填可以空着，回车
> entry point: (a.js) 问你入口文件是哪一个 默认找我们写的a.js文件，可以回车，要是写index.js 需要创建一个index.js文件
> test command: 测试命名是什么，不懂可以先回车
> git repository: github仓库地址是哪里，不懂先回车
> keywords: 关键字是什么，别人通过什么关键字搜索你的包，不懂先回车
> author: 作者是谁 51yrc 也可以不写
> license: (ISC) 协议是什么，默认ISC ，不懂先回车
>
> Is this OK? (yes) 问你是否ok是上面这些东西? 回车即可
> //然后去`D:\mynode\`文件夹下看一下是否有`package.json`文件
> ```
可以直接将 `D:\mynode\`文件夹拖到vscode
> `package.json`文件内容
> ```javascript
> {
>   "name": "mynode",
>   "version": "1.0.0",
>   "description": "",
>   "main": "a.js",
>   "scripts": { //多了这个脚本
>     //输入test 相当于输入了后面这段内容，就是帮你少些一些代码，这个后面会讲
>     "test": "echo \"Error: no test specified\" && exit 1"
>   },
>   "author": "51yrc",
>   "license": "ISC"
> }
> ```

### ② NPM (npm)  、 CNPM (cnpm) 
### Ⅰ、 npm
> 接下来我们看一下npm如何帮我们管理第三方的包、库、插件、模块、依赖等等
> ```javascript
> cls //清理一下屏幕
> //比如：安装一下 jquery
> //传统网页引入jquery：去cdn网站：https://www.bootcdn.cn/ 搜索jquery
> //然后在线引入 后者 下载到本地引入
> 
> //在我们node中，是通过 npm install jquery 来下载安装
> //下载包的地址，就是我们上面讲nvm的时候，指定的淘宝镜像地址：https://npm.taobao.org/mirrors/npm/
> npm install jquery 
> //此时发现多了一个文件夹：node_modules 专门用于存放第三方的包、库、插件、模块、依赖等等
> //看一下`package.json`文件：
> "dependencies": { //多了依赖项
>     "jquery": "^3.7.1"  //表明目前项目用的jquery版本是：3.7.1
> }
> //也就意味着：你不用关系你下载了多少库、插件等等，它都帮你记录好了，后面如果你把项目给你同事
> //他只需要看一下这个`package.json`文件，就知道你项目引入的库、插件等等
> ```
> ```javascript
> //安装jquery
> npm install jquery 
> //删除jquery
> npm uninstall jquery 
> ```
总结一下：
> ```javascript
> npm init              //初始化`package.json`文件，需手动输入一些基本信息
> npm init -y           //初始化一个默认信息的`package.json`文件
>
> npm install 包名     //安装
> npm i 包名           //安装简写
>
> npm uninstall 包名   //移除
> npm un 包名          //移除简写
> ```

### Ⅱ、 cnpm (可选)
> 你可以理解成国内版的npm，也就是下载的镜像在国内。我们上面讲nvm的时候，已经将npm包的下载源切换到了国内淘宝镜像了，因此使用npm命令和cnpm命令没有区别。<br/> 但是别的很多老师不会跟你讲nvm切换node版本，或者nrm管理npm下载源等，所以`在没有安装nvm、nrm等管理工具的情况下，在没有指定npm下载源的情况下，npm包默认的下载地址是在国外，下载会很慢` 我们上面的jQuery包文件就会去国外网站下载，下载会很慢。<br/>
> 这个时候可以考虑用cnpm命名下载，下载国内的包资源，如： <a href="https://npm.taobao.org" target="_blank">npm淘宝镜像</a> 
### ① 安装cnpm
> ```javascript
> npm install -g cnpm --registry=https://registry.npmmirror.com
> //通过install 安装cnpm 方式是 -g, -g表示：global,全局的意思
> //如果不要-g，相当于只是在我们的mynode文件夹里面装，出了这个文件夹，cnpm命令就失效了
> //所以全局装，哪里都可以用cnpm命令，后面这串：--registry=https://registry.npmmirror.com
> //就是下载源的意思，比如你要下载jquery,就到这个网站里面来下载，非常快
> ```
### ② 接下来就可以使用cnpm命令安装各个包、插件、模块等等
> 说明：如果出现报错，是系统的安全策略问题导致的，认为cnpm命令不安全，需要设置安全策略，具体报错参考：<a href="https://zhuanlan.zhihu.com/p/617284262" target="_blank">https://zhuanlan.zhihu.com/p/617284262</a> 解决方案参考：<a href="https://blog.csdn.net/dreaming317/article/details/128163873" target="_blank">https://blog.csdn.net/dreaming317/article/details/128163873 </a> <br/>
`1、开始-->所有程序-->Windows PowerShell-->展开选第一个-->鼠标右键-->以管理员身份运行；`<br/>
`2、输入“Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser”回车；`<br/>
`3、根据提示，输入Y，回车;`<br/>
`4、再次回到控制台 输入cnpm --version 执行就成功，若不成功，关闭vscode软件重新打开执行就好了`<br/><br/>
> ```javascript
> cnpm install jquery     //安装jquery
> cnpm install 包名     //安装
> cnpm i 包名           //安装简写
>
> cnpm uninstall jquery  //移除jquery
> cnpm uninstall 包名   //移除
> cnpm un 包名          //移除简写
> ```

### ③ 在vscode中运行命令
> 大家如果觉得在文件夹打开PowerShell非常麻烦，也可以直接在vscode运行命令：<br/><br/>
快捷键：<br/> `CTRL` + `SHIFT` + \` <br/>
或者 <br/>
`终端-->新建终端-->选择你的项目文件夹-->回车`即可

总结：<br/>
1. 不管你通过npm还是cnpm安装第三方的包、库、插件、模块、依赖等等，都会自动生成这个文件夹：`node_modules`，所有安装的包都在这个文件夹里面，实际项目上线或者给别的程序员用的时候，只需要查看你的`package.json`文件，就知道你安装了多少第三方的包、库、插件、模块、依赖等等，所以上线的时候，不需要将`node_modules`文件夹给别人，别人也不需要，它会根据你的`package.json`文件，自行进行安装，从侧面印证了`package.json`文件的重要性及node的运行模式。

### ④ npm 或 cnpm 常用命令
> 以npm为例，cnpm是一个意思
> ```javascript
> npm init             //初始化`package.json`文件
>
> npm install 包名     //安装
> npm i 包名           //安装简写
>
> npm uninstall 包名   //移除
> npm un 包名          //移除简写
>
> npm update 包名     //更新某个包到最新版，如：npm update jquery
>
> //重要，别人拿到你的项目或者你项目上线，都不会要你的`node_modules`文件夹
> //都会先把你`package.json`文件里面的所有包安装一下
> npm i 或者 npm install 
> ```

## 四、Node的模块
> Node的模块是nodejs中非常重要的部分，把模块学清楚了，咱们对nodejs就相当于已经入门了。node的模块分为三种：全局模块、系统模块、自定义模块。<br/>
> 我们的学习方式是先易后难，先总体讲一下这三种模块，大家先有个了解，然后针对每个模块在进行细致的讲解。
### ① 全局模块 ：process为例
> 粗俗的理解：你可以看成是我们js中的window对象、document对象，不管你的什么作用域，不管你层级有多深，这两个对象都可以直接进行调用。我们node中的全局模块也是这个意思。<br/>
> 全局模块我们随时随地都能够访问，不需要引用

以：process为例，做一个讲解
> process字面意思，你可以理解成进程，它下面有很多属性，常用属性env、argv
> ```javascript
> //process.env  环境变量
> //开始->此电脑（右键属性）-> 高级系统设置-> 高级->环境变量
> //用户变量: 当前用户(比如管理员)设置的变量  
> //系统变量：不管哪个用户都可以访问的变量
> //每个电脑的环境变量，用户变量都不一样，你们也可以自己设置
> //那它的作用是什么呢：比如设置一个：dev:true
> //可以理解成这个电脑是开发用的，如果是false, 那么你可以理解成这个电脑是服务器用的
> //那么你可以通过环境变量来判断，你的电脑是开发的电脑还是当服务器的电脑，反正用途非常多
> 
> // console.log(process);
> // console.log(process.env);
> // console.log(process.env.dev);
> if(process.env.dev){
>    console.log('我是开发电脑')
> }else{
>     console.log('我是服务器电脑')
> }
> ```
> ```javascript
> // console.log(process.argv) // node index a b c d e //node index node -vnode
> //简易计算
> //console.log(process.argv[2]); //node index 1 2
> let num1 = parseInt(process.argv[2]);
> let num2 = parseInt(process.argv[3]);
> console.log(num1 + num2);//node index 1 2
> //process功能其实非常多，这里只是简单举个例子，让大家知道什么是全局模块，后面我们会细讲
> ```

### ② 系统模块 ： path、fs模块为例
> 粗俗的理解：就是系统内置好的模块，你只需要通过 require()方法进行引入，但是不需要去下载的模块。也就是我们在安装nodejs的时候，它已经帮我们内置好了的模块。<br/>
> 同样，nodejs中的系统模块也是非常的多，我们下面举几个例子给大家介绍一下 <br/>

path模块：用于处理文件路径和目录路径的模块工具
> ```javascript
> //path：用于处理文件路径和目录路径的模块工具
> let path = require('path');//那么它有很多的属性方法
> console.log(path);
> 
> //解析文件或目录路径
> console.log(path.dirname('/mynode/index.js'));//打印文件所在目录 /mynode
> console.log(path.basename('/mynode/index.js'));//打印文件名字 index.js
> console.log(path.extname('/mynode/index.js'));//打印文件扩展名 .js
> //那么可以通过这个判断前端给你上传的文件是js文件还是图片文件还是视频文件等等
> 
> //比如说path里面还有一个方法resolve，看一下
> console.log(path.resolve('/mynode/a/b/c','../../','d'));//D:\mynode\a\d
> //也就是resolve方法会根据你的想法走，最后返回你想要的结果路径
> //我们上一节课讲了全局模块process, 比如我们在举例一个全局模块
> console.log(__dirname);//D:\mynode 得到我们当前文件所在物理路径（绝对路径）
> console.log(path.resolve(__dirname,'index.js'));//D:\mynode\index.js
> ```
fs模块：用于文件读写操作（这里做个简单介绍，后面会详细介绍）  <br/>
> 我们以文件读写为例，简单给大家先介绍一下，有两种操作方式：异步和同步 <br/>
先看异步
> ```javascript
> let fs = require('fs');
> //简单读
> // fs.readFile('./demo.json',(err,data)=>{
> //     if(err){
> //         console.log(err);
> //     }else{
> //         //console.log(data);//Buffer的一串字符，node中类似于二进制的东西
> //         //我们知道电脑底层都是二进制数据，但是数据量非常庞大，于是用更高进制比如十进制十六进制展示
> //         //那么如何转成我们能看得懂的数据呢，字符串的.toString()方法即可
> //         console.log(data.toString());
> //     }
> // });
> //简单写
> let o = {
>     "name":"联系我们",
>     "href":"contact.html",
>     "id":5,
>     "en_name":"contact",
>     "active":false
> }
> // fs.writeFile('./demo.json',JSON.stringify(o),(err)=>{
> //     if(err){
> //         throw err;
> //     }
> //     //把之前的干没有了，覆盖了
> // })
> 
> //追加
> fs.writeFile('./demo.json',JSON.stringify(o),{
>    flag:'a', //追加的意思
> },(err)=>{
>     if(err){
>         throw err;
>     }
> });
> ```
> 再看同步
> ```javascript
> let fs = require('fs');
> //同步读
> // let data = fs.readFileSync('./demo.json');//同步没有回调函数
> // console.log(data.toString());
> //同步写
> let o = {
>     "name":"联系我们",
>     "href":"contact.html",
>     "id":5,
>     "en_name":"contact",
>     "active":false
> }
> //fs.writeFileSync('./demo.json',JSON.stringify(o));//覆盖了
> //fs.writeFileSync('./demo.json',JSON.stringify(o),{flag:'a'});//追加
> ```
以上只是非常简单的举个例子，演示一下读和写文件，并且简单展示了异步操作和同步操作，更多操作我们会在后面给大家详细讲。

### ③ 自定义模块： exports、module输出、require引入
> 粗俗的理解：就是我们自己封装的模块，通过 exports、module输出、require引入。<br/>
> 简单举例： 新建/mynode/mod.js，简单导出
> ```javascript
> exports.a = 1;
> //exports粗俗理解成一个对象，类似json，你往它里面设置一个属性a,然后暴漏出去
> exports.b = 2;
> let c = 3;
> ```
> /mynode/index.js
先看：require
> ```javascript
> let mod =  require('./mod');//不加./ 就去node_modules文件夹找
> console.log(mod);
> console.log(mod.a);//1
> console.log(mod.b);//2
> console.log(mod.c);//undefined
> 
> //require查找模块说明
> //1. 如果有路径，如：./ 表示同级目录，就去路径里面找；
> //2. 没有路径就去node_modules文件夹找
> //3. 即没有路径也没有node_modules文件夹，就去nodejs安装目录里面找
> //   nodejs安装目录里面也有一个node_modules文件夹，但是它里面装的都是全局模块
> // 找不到则报错
> ```
再看：module （粗俗理解批量导出）
> /mynode/mod.js
> ```javascript
> module.exports = {
>     name:'迪丽热巴',
>     age:31,
>     sex:'女'
> }
> module.exports = {
>     name:'古力娜扎',
>     age:35
> }
> //还可以导出 函数、对象、类等等，后面案例再讲
> ```
> ```javascript
> let mod =  require('./mod');
> console.log(mod);
> console.log(mod.name);
> console.log(mod.age);
> //注意：两个module.exports，后者覆盖前者，也覆盖了exports的导出
> ```


### ④ 重要系统模块：http模块，搭建网页服务器
> http模块可以帮我们快速搭建一个web服务器，通过服务器对象： http.createServer()
> ```javascript
> let http = require('http');
> // console.log(http);
> http.createServer((request,response)=>{
>     // console.log('搭建了一个web服务器了')
> 
>     response.setHeader('Content-Type','text/html; charset=utf-8');
>     // response.write('首页');
>     // response.end();//结束
>     //直接向服务器响应一些内容
>     //response.end('首页');
> 
>     //看一下request ，浏览器输入：localhost:8888/index.html
>     //console.log(request);
>     //console.log(request.url);//  /index.html
> 
> }).listen(8888);//给一个端口号
> //端口号的范围是0-65536之间，测试过程中，如果设置的端口被占用，就换一个
> //如何执行：在浏览器输入： localhost:8888
> 
> //重新执行重启服务器： Ctrl + C
> ```
搭建一个简单的网页服务器
> 把我们做的网页复制过来，搭建网页服务器
> ```javascript
> let http = require('http');
> let fs = require('fs');
> http.createServer((request,response)=>{
>     //异步读
>     let url = request.url;
>     // fs.readFile('./' + url,()=>{});
>     fs.readFile(`./${url}`,(err,data)=>{
>        if(err){
>           // throw err;
>           response.setHeader('Content-Type','text/html; charset=utf-8');
>           response.writeHead(404);//网页状态码
>           response.end('404页面');
>        }else{
>           response.writeHead(200);
>           response.end(data);
>        }
>     });
> }).listen(8888);//给一个端口号
> ```


## 五、Node中的数据交互，重要系统模块：url模块处理get请求,querystring模块处理post请求
<img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/2-2-7-02.jpg" alt="交互原理" class="zoom-custom-imgs" 
style="display:inline-block;" /> 
> 关于数据请求方式有很多，我们在前面的Ajax、jQuery章节已经给大家讲了，用得最多的就是我们的GET、POST请求，具体查看：<a href="/secondless/w-b/Ajax.html#_2%E3%80%81%E7%90%86%E8%A7%A3get%E3%80%81post%E8%AF%B7%E6%B1%82" target="_blank">章节6-2、理解get、post请求</a> <br/>
> 通过上面的图片可以看出：<br/>
> GET请求，一般是将数据放在请求头里面，通过url方式传递数据，传输的数据量较小；<br/>
> POST请求，一般是将数据放在请求体里面进行传递。

html代码具体查看： <a href="/secondless/w-b/Ajax.html#_4、表单序列化" target="_blank">章节6-二、jQuery中的Ajax-4、表单序列化</a>
> ```html
> <form id="myForm" name="yourForm" class="my-5 flex justify-center">
>    <select name="usertype">
>          <option value="学生value">学生text</option>
>          <option value="老师value">老师text</option>
>          <option value="管理员value">管理员text</option>
>          <option>无</option>
>    </select>
>    <input type="radio" name="sex" value="男" > 男
>    <input type="radio" name="sex" value="女" checked="checked">  女
>    <input type="checkbox" name="loves" value="篮球" checked="checked"> 篮球
>    <input type="checkbox" name="loves" value="足球" checked="checked">  足球
>    <input type="checkbox" name="loves" value="乒乓球" >  乒乓球
>    账号：<input type="text" name="username" value="abc">
>    <input id="sub"  type="button" value="提交"  >
> </form>
> ```

js代码具体查看： <a href="/secondless/w-b/Ajax.html#_3-param-方法将对象转换为字符串键值对格式" target="_blank">章节6-二、jQuery中的Ajax-4、表单序列化-③ $.param()方法将对象转换为字符串键值对格式</a> <br/>
> 我们现在学习nodejs，就可以自己写一个接口了，比如说接口为：./api/test
> ```javascript
> $(function(){
>     $('form input[type=button]').click(function(){
>        // console.log($('input:checked[name=loves]'));//集合
>        $.ajax({
>           type: 'POST', //表单提交我们采用post , get方式数据量小也可以
>           url: './xxx',//提交给服务器的接口地址，一般后端程序员给你一个接口（当然你可以自己写一个接口）
>           //使用$.param()将对象形式的键值对转为 URL 地址的字符串键值对，可以更加稳定准确的传递表单内容
>           data:$.param({ 
>              username : $('input[name=username]').val(),
>              usertype : $(':selected')[0].value,
>              sex : $('input:checked[name=sex]')[0].value,
>              loves : function(){
>                 let loves = $('input:checked[name=loves]');
>                 let str = '';
>                 for(let i=0;i<loves.length;i++){
>                    if(!str){
>                         str = loves[i].value;
>                    }else{
>                         str += ',' + loves[i].value;
>                    }
>                 }
>                 return str;
>               }
>           }),
>           beforeSend:function(xhr){
>              // console.log(this);
>              $('form input[type=button]').val('提交中，请稍后...');
>           },
>           success: function (response, stutas, xhr) {
>              $('form input[type=button]').val('提交');
>              console.log(response)
>           }
>        });
>     });
> });
> ```

### ① url模块处理GET（get）请求：url.parse(url,true)
> ```javascript
> let http = require('http');
> let fs = require('fs');
> let $url = require('url');
> http.createServer((request,response)=>{
>     //看一下get请求
>     let url = request.url;
>     // console.log(url);
>     //  /api/test?username=abc&usertype=%E5%AD%A6%E7%94%9Fvalue&sex=%E5%A5%B3&loves=%E7%AF%AE%E7%90%83%2C%E8%B6%B3%E7%90%83
>     // 如何拿接口地址，以及传递的数据，通过系统模块：url模块
>     // console.log($url);
>     // console.log($url.parse(url));
>     // console.log($url.parse(url,true));//true 把query字符串数据转成对象
>     let { pathname, query} = $url.parse(url,true);
>     console.log(pathname);
>     console.log(query);
> 
>     fs.readFile(`./${url}`,(err,data)=>{
>         if(err){
>             response.setHeader('Content-Type','text/html; charset=utf-8');
>             response.writeHead(404);
>             response.end('404页面');
>         }else{
>             response.writeHead(200);
>             response.end(data);
>         }
>     });
> }).listen(8888);
> ```

### ② querystring模块处理POST（post）请求：querystring.parse()
> 我们上节课说了，post请求是将数据放在请求体里面传输的，简单表单数据get/post都可以，但是文件、图片、视频等大数据，一般用post请求发送。

我们先将上节课的get请求换成post请求：`type: 'post'` <br/>
另外大家需要先了解，我们`get请求，数据量较小，服务器一次性拿到请求的数据url及参数`。而post请求，数据通过请求体发送，`数据量较大，服务器获取数据量的方式是分段获取，不是一次性拿到浏览器发送的数据`
> ```javascript
> let http = require('http');
> let fs = require('fs');
> let $url = require('url');//处理get请求
> let querystring = require('querystring');//处理post请求
> http.createServer((request,response)=>{
>     //看一下post请求
>     // console.log(request.method);
>     if(request.method == 'GET'){
>         let url = request.url;
>         if(url.indexOf('/api/') == -1){
>             fs.readFile(`./${url}`,(err,data)=>{
>                 if(err){
>                     response.setHeader('Content-Type','text/html; charset=utf-8');
>                     response.writeHead(404);
>                     response.end('404页面');
>                 }else{
>                     response.writeHead(200);
>                     response.end(data);
>                 }
>             });
>         }  
>     }else if(request.method == 'POST'){
>         //由于是分段获取数据，通过on进行监听data事件，获取每段的数据
>         //通过回调函数获取每段的数据结果
>         //前面我们讲fs模块的时候说过读写数据，读的是二进制buffer数据，这里也一样
>         let result = [];
>         request.on('data',buffer=>{
>            //  console.log(buffer);//获取每段数据，特别视频大的时候，会多次执行data事件，就会有多个buffer
>            result.push(buffer);
>         });
>         //通过end事件，拿到所有的数据进行处理
>         request.on('end',()=>{
>            //console.log(result);
>            //通过buffer对象将每一段数据拼起来
>            let data = Buffer.concat(result);
>            // console.log(data.toString());
>            //username=abc&usertype=%E5%AD%A6%E7%94%9Fvalue&sex=%E5%A5%B3&loves=%E7%AF%AE%E7%90%83%2C%E8%B6%B3%E7%90%83
>            //通过系统模块：querystring 处理
>            console.log(querystring.parse(data.toString()));
>            //实际开发中，我们处理post请求，比如图片视频有其他方式，大家这里先了解post请求一般处理方式
>         });
>     }
> }).listen(8888);
> ```

## 六、nodejs项目监测文件变化，自动重启工具：Nodemon
> 我们在前面的讲解中，每次修改我们的node文件，都需要重新启动nodejs服务器，很繁琐，主要是为了让大家从基础学起，一步一步了解我们nodejs的特性。那么，从本节课开始，我们学习一下如何在我们修改了js文件的情况下，不用重新启动我们的nodejs服务器，也可以更新我们修改后的内容。<br/><br/>
> 我们需要安装一个监测nodejs项目文件变化的自动重启工具：nodemon。它会自动监测nodejs中文件的变化，帮我们重启node服务。

1、我们可以将我们上节课的代码，换一种写法
> ```javascript
> let http = require('http');
> let fs = require('fs');
> let $url = require('url');
> let querystring = require('querystring');
> const server =  http.createServer((request,response)=>{
>     if(request.method == 'GET'){
>         let url = request.url;
>         if(url.indexOf('/api/') == -1){
>             fs.readFile(`./${url}`,(err,data)=>{
>                 if(err){
>                     response.setHeader('Content-Type','text/html; charset=utf-8');
>                     response.writeHead(404);
>                     response.end('404页面');
>                 }else{
>                     response.writeHead(200);
>                     response.end(data);
>                 }
>             });
>         }  
>     }else if(request.method == 'POST'){
>         let result = [];
>         request.on('data',buffer=>{
>            //  console.log(buffer);//获取每段数据，特别视频大的时候，会多次执行data事件，就会有多个buffer
>            result.push(buffer);
>         });
>         //通过end事件，拿到所有的数据进行处理
>         request.on('end',()=>{
>            //console.log(result);
>            //通过buffer对象将每一段数据拼起来
>            let data = Buffer.concat(result);
>            // console.log(data.toString());
>            //username=abc&usertype=%E5%AD%A6%E7%94%9Fvalue&sex=%E5%A5%B3&loves=%E7%AF%AE%E7%90%83%2C%E8%B6%B3%E7%90%83
>            //通过系统模块：querystring 处理
>            console.log(querystring.parse(data.toString()));
>            //实际开发中，我们处理post请求，比如图片视频有其他方式，大家这里先了解post请求一般处理方式
>         });
>     }
> });
> 
> server.listen(8888,'127.0.0.1',()=>{
>     console.log('服务器已启动');
> });
> //我们可以通过：
> // http://localhost:8888/index.html 访问首页
> // http://127.0.0.1:8888/index.html ip地址访问首页
> ```

2、回到我们的package.json文件
> ```javascript
> //我们正常情况，启动服务：
> node index 或者 node index.js //因为index.js在我们的根目录
> //如果index.js在根目录src文件夹里面，则：
> node src/index 或者 node src/index.js
> ```
> ```javascript
> //我们说package.json里面的script就是给我们调试用的
> "scripts": {
>     "start":"node index.js", //npm run start
>     "dev":"node src/index.js", //npm run dev
>     "test": "echo \"Error: no test specified\" && exit 1" //npm run test
>  },
> ```

如果此时，修改我们的index.js代码，刷新没有生效，需要重启 Ctrl + C , 启动服务：npm run start <br/><br/>
`简单说一下原因：nodejs在执行的时候，当我们把服务启动的时候，我们写的这些js代码，它会被装载到内存里面去，整个代码在执行的时候，它不会去重新解析我们的文件，这样才会提高它运行的效率，因为你启动可以时间长一点，我把你所有要执行的文件都解析出来，然后在执行的时候，效率就会变得更高。如果我在你启动的时候，没有把你要执行的文件提前做解析，等你运行的时候，当你需要这个文件的时候，我再去解析，这个时候会比较慢，因为你一运行，就想马上看效果，我在解析就会耽误时间，或者你文件丢失还会发生错误，所以这是nodejs做的提高运行效率的机制，因此，如果修改了代码，我们需要把服务先停掉，然后再重新启动，这就相当于把你的新代码重新装载到内存里面了，那么新的代码就会生效。` 这就是为什么我们每次修改了代码，都要重启的原因。<br/><br/>
当然，`当我们在开发的时候`，我们会频繁的修改代码，就会去频繁的启动服务器，会非常累。只有我们的代码上线到服务器之后，我们才不会去更改。<strong> 因此，在我们开发期间，为了不至于频繁重启服务器，我们可以使用一个工具：nodemon，</strong>它会去监测文件的变化然后自动帮我们重启服务。
### ① 安装nodemon
> ```javascript
> npm install nodemon -D
> //加 -D 的意思是：安装在我们dev环境，就是我们的开发环境，上线之后初始化的时候无需安装
> ```
### ② 修改package.json 中的启动命令
> ```javascript
> "scripts": {
>    "start":"nodemon index.js", //npm run start
>    "start:node":"node index.js", //npm run start:node
>    "dev":"node src/index.js", //npm run dev
>    "test": "echo \"Error: no test specified\" && exit 1" //npm run test
> },
> ```
> ```javascript
> //输入命令运行
> npm run start
>
> //观察终端输出信息：
> // [nodemon] 3.0.2  表示nodemon版本号
>
> // [nodemon] to restart at any time, enter `rs`
> // 表示在任何时间想要重新启动，可以输入：rs 即可重启
>
> // [nodemon] watching path(s): *.*
> // 表示监测所有路径的文件变化，不管你是根目录，还是文件夹里面的文件
>
> // [nodemon] watching extensions: js,mjs,cjs,json
> // 表示监测文件的类型：js,mjs,cjs,json的文件
> ```
也就是说，我把package.json改一下，它也会重启。但是package.json我们很少改动，没必要重启。因此，我们可以给nodemon一个配置文件，告诉它哪些文件需要监视，修改后可以重启

### ③ 配置nodemon，告诉它哪些文件需要修改后重启服务（可选项）
> ```javascript
> // 根目录新建： /nodemon.json文件
> {
>     "watch":["./src/**/*.*"] 
>     //表示匹配：./src/ 代表跟nodemon.json文件同级别的src文件夹里面的
>     // ./src/**/ src文件夹里面的任何子集文件夹
>     // ./src/**/*.* 任何子集文件夹里面的任何子集文件
>     //说白了：就是监听src文件夹里面的所有文件的变化，包含src文件夹里面还有文件夹里面的文件
>     
>     "watch":["./src/**/*.js"]  //表示src文件夹里面的所有js文件
>
>     //配置文件改完之后，我们重新启动一下服务，之后观察变化
>     //发现修改 src里面的index.js 会重新启动，除了src文件夹里面的文件，其他文件都不会重新启动
>     //这个就是指定监控的文件，修改自动重启。
>    
> 
>     //我们这里可以配置成
>     "watch":["./*.js"]  //根目录下所有js文件，也可以删除nodemon.json文件不做配置
> }
> ```
> 当然，你如果想监控整个项目，就没必要配置这一项了。

## 七、nrm (使用nrm管理npm下载源)
> 我们在前面讲nvm的时候，已经让大家配置过npm的下载源，在讲cnpm命令的时候，也让大家设置过npm的下载源（就是我们的淘宝镜像）。<br/>我们本节课再来看一下管理工具：nrm，它可以帮我们管理多个npm下载源地址。
> ```javascript
> //查看一下老师电脑
> nrm ls //如果你电脑没有输出，则需要安装nrm
> ```
我们知道我们前面讲的npm源，都是我们自己手动配置的，现在通过nrm配置下载源就非常方便了。
### ① 安装nrm
> ```javascript
> npm install nrm -g
> //-g 的意思是：前面说过了，global,全局的意思，也就是命令可以在任何一个文件夹使用
> ```
接下来，我们就可以随意的切换各种下载源
> ```javascript
>  //首先看一下nrm自己内置的下载源地址
>  nrm ls 
>
>  npm ---------- https://registry.npmjs.org/    //npm 官方源
>  yarn --------- https://registry.yarnpkg.com/
>  tencent ------ https://mirrors.cloud.tencent.com/npm/
>  cnpm --------- https://r.cnpmjs.org/
>  taobao ------- https://registry.npmmirror.com/
>  npmMirror ---- https://skimdb.npmjs.com/registry/
> ```

### ② nrm内置的命令函数
> ```javascript
>  nrm -h
>  //可以查看nrm提供的使用命令
>
>  nrm ls //nrm内置的下载源地址
>  nrm current //查看当前使用的源下载命令
> ```
> 报错查看：<a href="https://blog.csdn.net/sinat_36728518/article/details/134492718" target="_blank">https://blog.csdn.net/sinat_36728518/article/details/134492718</a> 
> 处理方式：指定一个源
> ```javascript
>  nrm use <registry> //registry为源名.如：taobao、npm、yarn、tencent、cnpm、npmMirror
>  nrm use taobao //切换为taobao源
>  nrm ls //前面就出现了一个星号，表示当前的镜像源在淘宝上
> ```
测试源速度： `nrm test <registry>`
> 比如：测试官方源和淘宝源的响应时间
> ```javascript
> nrm test npm //测试官方源响应时间
> nrm test taobao //测试淘宝源响应时间，很明显快很多
> ```

### ③ 查看当前正在使用的 npm 镜像源
> ```javascript
> npm config get registry  // https://registry.npmmirror.com/
> ```

### ④  切换 npm 镜像源
> ```javascript
> npm config set registry https://registry.npmmirror.com/
> ```

## 八、系统模块：fs模块详解
> 我们在前面讲系统模块的时候，给大家简单的讲解了一下fs模块，由于这个模块比较重要，本节课我们详细讲解一下fs模块的语法和使用。<br/>
> 我们在前面的讲解中，分别用json文件和html文件，让大家通过fs模块进行了读取，本节课，我们用txt文本文件为例，给大家讲解一下fs模块的更多语法和使用。<br/>
`根目录新建/test.txt文件，随便复制些内容，重复多复制几份，我们在终端操作讲解` 
### ① 读取文件： 异步readFile、同步readFileSync、promise操作
> 不加Sync的就是异步操作
> ```javascript
> let fs = require('node:fs');
> fs.readFile('./test.txt',{
>     encoding:'utf-8',//文本文档改一下编码
>     flag:'r', //r读取文件的意思，a(打开文件进行追加。 如果文件不存在，则创建该文件)
> },(err,data)=>{
>    if(err) throw err;
>    // console.log(data.toString());
>    console.log(data);//改一下编码格式：'utf-8'
> });
> ```
flag属性值，具体查看：<a href="https://juejin.cn/post/7304948522506436635" target="_blank">https://juejin.cn/post/7304948522506436635</a> 
> 同步方式
> ```javascript
> let fs = require('node:fs');
> //同步方式会阻塞代码，必须先把文件读取完了之后，在继续执行下面的代码
> let data =  fs.readFileSync('./test.txt',{
>     // 'encoding':'utf-8'
> });
> // console.log(data);//Buffer数据二进制流数据，每两个16进制字符是一个字节
> //方式1：console.log(data.toString("utf-8")); 方式2：文本文档改一下编码：'encoding':'utf-8'
> console.log(data.toString("utf-8"));
> console.log(123);//发现先输出data 说明阻塞了代码的执行
> //总结：
> // 当文件小的时候，可以使用同步，当文件大了之后，建议使用异步
> ```
> promise方式（前面讲过，用then()方法接收，出错用catch()）异步方式
> ```javascript
> let fs = require('node:fs');
> let fsPromise = require('node:fs/promises');
> fsPromise.readFile('./test.txt',{}).then(data=>{
>     console.log(data.toString('utf-8'))
> }).catch(err=>{
>     console.log(err);
> });
> ```

### ② 可读流模式：createReadStream()方法
> ```javascript
> let fs = require('node:fs');
> //处理大文件使用这个方式，比如你有1G的文件，它会把文件一段一段给你返回
> const readStream = fs.createReadStream('./test.txt',{
>     // start:3,
>     // end:12,
>     encoding:'utf-8'
> });
> //通过on方法监听事件
> readStream.on('open',function(fd){
>     console.log('开始读取文件');
> });
> readStream.on('data',function(chunk){
>     console.log('读取到数据：',chunk);
> });
> readStream.on('end',function(){
>     console.log('文件已全部读取完毕');
> });
> readStream.on('close',function(){
>     console.log('文件被关闭');
> });
> readStream.on('error',function(err){
>     console.log('读取文件失败'); 
> });
> ```

### ③ 创建文件夹：mkdirSync , mkdir
> 一般我们以同步的方式创建文件夹，因为很快
> ```javascript
> let fs = require('node:fs');
> // fs.mkdirSync('./src') 报错，因为文件夹存在
> // console.log(fs.existsSync('./src'));;//true 或者 false
> 
> // if(!fs.existsSync('./src')){//不存在则创建
> //     fs.mkdirSync('./src');
> // }
> 
> // if(!fs.existsSync('./demo')){
> //     fs.mkdirSync('./demo');
> // }
> 
> // fs.mkdirSync('./demo1/demo2/demo');//创建多层文件夹失败，需要递归创建
> //递归创建多个文件夹
> fs.mkdirSync('./demo1/demo2/demo',{
>     recursive:true, //执行递归创建
> });
> ```

### ④ 删除文件夹：rmSync , rm
> ```javascript
> let fs = require('node:fs');
> fs.rmSync('./demo1',{
>     recursive:true, //执行递归删除，注意传递首个文件夹即可
> }); 
> ```

### ⑤ 重命名文件：renameSync ,  rename
> ```javascript
> let fs = require('node:fs');
> //参数1：原文件名，参数2：新文件名
> fs.renameSync('./test.txt','test2.txt');
> ```


### ⑥ 监听文件变化: watch
> ```javascript
> let fs = require('node:fs');
> //事件类型可以是： rename 文件重命令 或 change 文件内容改变
> fs.watch('./test1.txt',(event,filename)=>{
>     console.log(event);// rename  change
>     console.log(filename);
> });
> ```

<br/><br/><br/><br/><br/><br/>

## 【第二学期第2季课程】其它章节
### [章节1.课程介绍](/secondless/w-b '章节1.课程介绍')
<!-- <LessList  /> -->
### [章节2.面向对象与原型](/secondless/w-b/面向对象与原型 '章节2.面向对象与原型')
####  <a href="/secondless/w-b/面向对象与原型.html#i、创建对象" style="margin-left:40px;">1、创建对象</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_1-创建对象-剖析问题" style="margin-left:70px;">① 创建对象，剖析问题：传统创建对象方法代码重复冗余，对象无法识别从属于哪个函数</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_2-传统面向对象-工厂模式" style="margin-left:70px;">② 传统创建对象：工厂模式（没有办法识别某一个对象的引用）</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_3-构造函数-构造方法-创建特定的对象" style="margin-left:70px;">③ 构造函数(构造方法)创建特定的对象</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_4-构造函数知识扩展-对象冒充构造函数-构造函数体内的函数返回值相等-但引用地址不相同" style="margin-left:70px;">④ 构造函数知识扩展，对象冒充构造函数，构造函数体内的函数返回值相等，但引用地址不相同</a>
####  <a href="/secondless/w-b/面向对象与原型.html#ii、原型" style="margin-left:40px;">2、原型</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_1-原型创建对象" style="margin-left:70px;">① 原型创建对象</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_2-构造函数与原型对比-深度解析-图片示例" style="margin-left:70px;">② 构造函数与原型对比，深度解析（图片示例）</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_3-isprototypeof-方法-判断一个对象是否指向了该构造函数的原型对象" style="margin-left:70px;">③ isPrototypeOf()方法：判断一个对象是否指向了该构造函数的原型对象</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_4-原型模式的执行流程-顺序-先实例-在构造函数-最后原型" style="margin-left:70px;">④ 原型模式的执行流程（顺序）：先实例，在构造函数，最后原型</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_5-删除实例属性访问原型属性-delete方法" style="margin-left:70px;">⑤ 删除实例属性访问原型属性：delete方法</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_6-hasownproperty-方法检测属性是否存在实例中-in操作符判断属性是否存在于实例或原型中-两者结合判断属性是否只存在原型中" style="margin-left:70px;">⑥ hasOwnProperty()方法检测属性是否存在实例中，in操作符判断属性是否存在于实例或原型中，两者结合判断属性是否只存在原型中</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_7-原型创建对象字面量声明方式" style="margin-left:70px;">⑦ 原型创建对象字面量声明方式</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_8-原型创建对象字面量声明方式-原型的声明是有先后顺序-重写原型会覆盖-切断-之前的原型" style="margin-left:70px;">⑧ 原型创建对象字面量声明方式，原型的声明是有先后顺序，重写原型会覆盖（切断）之前的原型</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_9-内置引用类型-string-number-array等本身也使用了原型" style="margin-left:70px;">⑨ 内置引用类型：String,Number,Array等本身也使用了原型</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_10-原型创建对象缺点剖析-传参和引用共享问题" style="margin-left:70px;">⑩ 原型创建对象缺点剖析：传参和引用共享问题</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_11-组合构造函数-原型模式-解决-10-构造传参和引用共享问题" style="margin-left:70px;">⑪ 组合构造函数+原型模式：解决 ⑩ 构造传参和引用共享问题</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_12-动态原型模式-解决-11-组合构造函数-原型模式-代码封装在一起-一种封装的感觉" style="margin-left:70px;">⑫ 动态原型模式：解决 ⑪ 组合构造函数+原型模式，代码封装在一起，一种封装的感觉</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_13-寄生构造函数-工厂模式-构造函数【备胎模式-了解-】" style="margin-left:70px;">⑬ 寄生构造函数：工厂模式 + 构造函数【备胎模式（了解）】</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_14-稳妥构造函数-了解即可-在一些安全的环境中-比如禁止使用-this-和-new-就是寄生构造函数不能用new" style="margin-left:70px;">⑭ 稳妥构造函数（了解即可）：在一些安全的环境中，比如禁止使用 this 和 new，就是寄生构造函数不能用new</a>
####  <a href="/secondless/w-b/面向对象与原型.html#iii、继承" style="margin-left:40px;">3、继承</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_1-js的继承方式通过原型链完成" style="margin-left:70px;">① js的继承方式通过原型链完成</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_2-继承父类属性方法的继承顺序-就近原则-实例化-构造函数实例属性方法-原型属性方法" style="margin-left:70px;">② 继承父类属性方法的继承顺序：就近原则（实例化-->构造函数实例属性方法-->原型属性方法）</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_3-继承后的实例从属关系" style="margin-left:70px;">③ 继承后的实例从属关系</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_4-对象冒充继承及问题-原型里面的属性方法无法继承" style="margin-left:70px;">④ 对象冒充继承及问题:原型里面的属性方法无法继承</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_5-组合继承【广泛应用】-原型链-借用构造函数-对象冒充-的模式-完成对象冒充的原型继承" style="margin-left:70px;">⑤ 组合继承【广泛应用】：原型链+借用构造函数(对象冒充)的模式，完成对象冒充的原型继承</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_6-原型式继承-了解" style="margin-left:70px;">⑥ 原型式继承（了解）</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_7-寄生式继承-原型式-工厂模式结合" style="margin-left:70px;">⑦ 寄生式继承：原型式+工厂模式结合</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_8-继承终极版模式-寄生组合继承来实现继承-组合模式-寄生式继承" style="margin-left:70px;">⑧ 继承终极版模式：寄生组合继承来实现继承：组合模式 + 寄生式继承</a>
####  <a href="/secondless/w-b/面向对象与原型.html#iv、类和对象" style="margin-left:40px;">4、类和对象</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_1-理解类和对象" style="margin-left:70px;">① 理解类和对象</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_2-类中的constructor-方法-构造函数" style="margin-left:70px;">② 类中的constructor()方法（构造函数）</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_3-类中添加方法" style="margin-left:70px;">③ 类中添加方法</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_4-类的继承" style="margin-left:70px;">④ 类的继承</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_5-类的继承中的super关键字-调用父类的构造函数constructor" style="margin-left:70px;">⑤ 类的继承中的super关键字：调用父类的构造函数constructor</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_6-类的继承中的super关键字-调用父类的普通函数" style="margin-left:70px;">⑥ 类的继承中的super关键字：调用父类的普通函数</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_7-子类继承父类方法同时扩展自己的方法-子类在构造函数中使用super-必须放到this前面" style="margin-left:70px;">⑦ 子类继承父类方法同时扩展自己的方法，子类在构造函数中使用super,必须放到this前面</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_8-类和对象的几个注意点" style="margin-left:70px;">⑧ 类和对象的几个注意点：</a>
####  <a href="/secondless/w-b/面向对象与原型.html#v、面向对象、原型、继承、类小结" style="margin-left:40px;">5、面向对象、原型、继承、类小结</a>
### [章节3.封装js库过渡到jQuery](/secondless/w-b/封装js库过渡到jQuery '章节3.封装js库过渡到jQuery')
### [章节4.jQuery](/secondless/w-b/jQuery '章节4.jQuery')
####  <a href="/secondless/w-b/jQuery.html#_1、代码风格-包裹" style="margin-left:40px;">1、代码风格：$包裹，加载模式：$(function () {})，获取元素DOM对象：get(索引)方法，多个库之间的冲突</a>
####  <a href="/secondless/w-b/jQuery.html#一、jquery中的选择器过滤器" style="margin-left:40px;">2、选择器：</a>
##### <a href="/secondless/w-b/jQuery.html#_1-id-选择器、元素选择器、类-class-选择器-属性-length-或-size-方法来查看返回的元素个数" style="margin-left:70px;">① ID 选择器、元素选择器、类(class)选择器，属性 length 或 size()方法来查看返回的元素个数</a>
##### <a href="/secondless/w-b/jQuery.html#_2-jquery对象转成dom对象-get方法或下标获取" style="margin-left:70px;">② jQuery对象转成DOM对象：get方法或下标获取</a>
##### <a href="/secondless/w-b/jQuery.html#_3-群组选择器、后代选择器、通配选择器、指定元素前缀选择器" style="margin-left:70px;">③ 群组选择器、后代选择器、通配选择器、指定元素前缀选择器</a>
##### <a href="/secondless/w-b/jQuery.html#_4-层次选择器-jquery提供后代选择器find、子选择器children、next-选择器、nextall-选择器" style="margin-left:70px;">④ 层次选择器：jQuery提供后代选择器find、子选择器children、next 选择器、nextAll 选择器</a>
##### <a href="/secondless/w-b/jQuery.html#_5-jquery提供-prev同级上一个元素-prevall同级所有上面的元素" style="margin-left:70px;">⑤ jQuery提供：prev同级上一个元素，prevAll同级所有上面的元素</a>
##### <a href="/secondless/w-b/jQuery.html#_6-jquery提供-siblings-方法-上下同级所有元素-正好集成了-prevall-和-nextall-两个功能的效果" style="margin-left:70px;">⑥ jQuery提供：siblings()方法：上下同级所有元素，正好集成了 prevAll()和 nextAll()两个功能的效果</a>
##### <a href="/secondless/w-b/jQuery.html#_7-jquery提供-nextuntil-方法-查找同级后面的节点-遇到指定元素停止选定-prevuntil-方法-查找同级前面的节点-遇到指定元素停止选定" style="margin-left:70px;">⑦ jQuery提供：nextUntil()方法：查找同级后面的节点，遇到指定元素停止选定，prevUntil()方法：查找同级前面的节点，遇到指定元素停止选定</a>
##### <a href="/secondless/w-b/jQuery.html#_8-属性选择器-一般超链接用得多点" style="margin-left:70px;">⑧ 属性选择器：一般超链接用得多点</a>
####  <a href="/secondless/w-b/jQuery.html#_6、过滤器-伪类选择器" style="margin-left:40px;">3、过滤器（伪类选择器）</a>
##### <a href="/secondless/w-b/jQuery.html#_1-first-选取第一个元素-返回单个元素-jquery提供first-方法" style="margin-left:70px;">① :first，选取第一个元素，返回单个元素，jQuery提供first()方法</a>
##### <a href="/secondless/w-b/jQuery.html#_2-last-选取最后一个元素-返回单个元素-jquery提供last-方法" style="margin-left:70px;">② jQuery对象转成DOM对象：get方法或下标获取</a>
##### <a href="/secondless/w-b/jQuery.html#_3-not-selector-not-active-选取class不是active的元素-返回元素集合-jquery提供not-selector-方法" style="margin-left:70px;">③:not(selector)， :not(.active)选取class不是active的元素，返回元素集合，jQuery提供not(selector)方法</a>
##### <a href="/secondless/w-b/jQuery.html#_4-eq-index-选择索引-0-开始-等于-index-的元素-返回单个元素-jquery提供eq-方法" style="margin-left:70px;">④ :eq(index)，选择索引(0 开始)等于 index 的元素，返回单个元素，jQuery提供eq()方法</a>
##### <a href="/secondless/w-b/jQuery.html#_5-gt-index-选择索引-0-开始-大于-index-的元素-返回元素集合" style="margin-left:70px;">⑤ :gt(index)，选择索引(0 开始)大于 index 的元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_6-lt-index-选择索引-0-开始-小于-index-的元素-返回元素集合" style="margin-left:70px;">⑥ :lt(index)，选择索引(0 开始)小于 index 的元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_7-even-选择索引-0-开始-是偶数的所有元素-返回元素集合" style="margin-left:70px;">⑦ :even，选择索引(0 开始)是偶数的所有元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_8-odd-选择索引-0-开始-是奇数的所有元素-返回元素集合" style="margin-left:70px;">⑧ :odd，选择索引(0 开始)是奇数的所有元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_9-header-选择标题元素-h1-h6-返回元素集合" style="margin-left:70px;">⑨ :header，选择标题元素，h1 ~ h6，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_10-focus-选择当前被焦点的元素-一般用在表单元素上" style="margin-left:70px;">⑩ :focus，选择当前被焦点的元素，一般用在表单元素上</a>
####  <a href="/secondless/w-b/jQuery.html#_7、内容过滤器" style="margin-left:40px;">4、内容过滤器</a>
##### <a href="/secondless/w-b/jQuery.html#_1-contains-text-选取含有text文本的元素-返回元素集合" style="margin-left:70px;">① :contains(text)，选取含有text文本的元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_2-empty-选取不包含子元素或空文本的元素-返回元素集合" style="margin-left:70px;">② :empty，选取不包含子元素或空文本的元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_3-has-selector-如-has-active-选择后代元素含有class-是active-的元素-jquery提供has-方法" style="margin-left:70px;">③ :has(selector)，如：:has(.active) 选择后代元素含有class 是active 的元素，jQuery提供has()方法</a>
##### <a href="/secondless/w-b/jQuery.html#_4-parent-与-empty刚好相反-选取含有子元素或文本的元素-返回元素集合" style="margin-left:70px;">④ :parent，与:empty刚好相反，选取含有子元素或文本的元素，返回元素集合</a>
####  <a href="/secondless/w-b/jQuery.html#_8、jquery提供-parent-、parents-、parentsuntil方法特别说明" style="margin-left:40px;">5、jQuery提供：parent()、parents()、parentsUntil方法特别说明</a>
##### <a href="/secondless/w-b/jQuery.html#_1-jquery提供-parent-方法-选取当前元素的父元素-注意与-parent的区别" style="margin-left:70px;">① jQuery提供：parent()方法：选取当前元素的父元素，注意与 :parent的区别</a>
##### <a href="/secondless/w-b/jQuery.html#_2-jquery提供-parents-方法-选择当前元素的父元素及祖先元素" style="margin-left:70px;">② jQuery提供：parents()方法：选择当前元素的父元素及祖先元素</a>
##### <a href="/secondless/w-b/jQuery.html#_3-jquery提供-parentsuntil方法-如-parentsuntil-ul-选择当前元素往上一层级查找-遇到ul元素停止" style="margin-left:70px;">③ jQuery提供：parentsUntil方法，如：parentsUntil('ul') 选择当前元素往上一层级查找，遇到ul元素停止</a>
####  <a href="/secondless/w-b/jQuery.html#_9、可见性过滤器" style="margin-left:40px;">6、可见性过滤器</a>
##### <a href="/secondless/w-b/jQuery.html#_1-hidden-选取所有不可见元素-返回元素集合-一般包含-css-样式为-display-none、input-表单类型为type-hidden-和-visibility-hidden-的元素" style="margin-left:70px;">① :hidden，选取所有不可见元素，返回元素集合，一般包含：CSS 样式为 display:none、input 表单类型为type="hidden"和 visibility:hidden 的元素</a>
##### <a href="/secondless/w-b/jQuery.html#_2-visible-选取所有可见元素" style="margin-left:70px;">② :visible，选取所有可见元素</a>
####  <a href="/secondless/w-b/jQuery.html#_10、子元素过滤器" style="margin-left:40px;">7、子元素过滤器</a>
##### <a href="/secondless/w-b/jQuery.html#_1-first-child-获取每个父元素的第一个子元素-返回元素集合" style="margin-left:70px;">① :first-child，获取每个父元素的第一个子元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_2-last-child-获取每个父元素的最后一个子元素-返回元素集合" style="margin-left:70px;">② :last-child，获取每个父元素的最后一个子元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_3-only-child-获取只有一个子元素的元素-返回元素集合" style="margin-left:70px;">③ :only-child，获取只有一个子元素的元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_4-nth-child-odd-even-eq-index-获取每个自定义子元素的元素-索引值从-1-开始计算" style="margin-left:70px;">④ :nth-child(odd/even/eq(index))，获取每个自定义子元素的元素(索引值从 1 开始计算)</a>
####  <a href="/secondless/w-b/jQuery.html#_11、jquery提供选择器和过滤器方法" style="margin-left:40px;">8、jQuery提供选择器和过滤器方法</a>
##### <a href="/secondless/w-b/jQuery.html#_1-is-方法-传递选择器、dom、jquery-对象、函数" style="margin-left:70px;">① is()方法：传递选择器、DOM、jquery 对象、函数</a>
##### <a href="/secondless/w-b/jQuery.html#_2-hasclass方法-hasclass-hasclass-class-判断某个元素是否有某个class-比较常用-和-is-一样-只不过只能传递class" style="margin-left:70px;">② hasClass方法，hasClass(); hasClass(class)，判断某个元素是否有某个class，比较常用，和 is 一样，只不过只能传递class</a>
##### <a href="/secondless/w-b/jQuery.html#_3-slice方法-slice-start-end-选择从-start-到-end-位置的元素-如果是负数-则从后开始" style="margin-left:70px;">③ slice方法，slice(start, end)，选择从 start 到 end 位置的元素，如果是负数，则从后开始</a>
##### <a href="/secondless/w-b/jQuery.html#_4-end方法-end-获取当前元素前一次状态-可以找它的父节点-也可以找它的相邻前一个兄弟节点" style="margin-left:70px;">④ end方法，end()，获取当前元素前一次状态：可以找它的父节点，也可以找它的相邻前一个兄弟节点</a>
##### <a href="/secondless/w-b/jQuery.html#_5-contents方法-contents-获取某元素下面所有元素节点-包括文本节点-如果是-iframe-则可以查找文本内容" style="margin-left:70px;">⑤ contents方法，contents()，获取某元素下面所有元素节点，包括文本节点，如果是 iframe，则可以查找文本内容</a>
##### <a href="/secondless/w-b/jQuery.html#_6-filter方法-filter-比较灵活的选择器-扩展性较好" style="margin-left:70px;">⑥ filter方法，filter()，比较灵活的选择器，扩展性较好</a>
####  <a href="/secondless/w-b/jQuery.html#_12、表单选择器" style="margin-left:40px;">9、表单选择器</a>
##### <a href="/secondless/w-b/jQuery.html#_1-jquery方法-通过type类型或者name字段获取表单组件-通过val-方法获取表单组件的值" style="margin-left:70px;">① jQuery方法：通过type类型或者name字段获取表单组件，通过val()方法获取表单组件的值</a>
####  <a href="/secondless/w-b/jQuery.html#二、jquery操作dom及css" style="margin-left:40px;">10、jQuery操作DOM及CSS</a>
##### <a href="/secondless/w-b/jQuery.html#_1、设置元素及内容-html-html-value-text-text-value" style="margin-left:70px;">1、设置元素及内容：html(),html(value),text(),text(value)</a>
##### <a href="/secondless/w-b/jQuery.html#_2、获取或设置表单内容-val-val-value" style="margin-left:70px;">2、获取或设置表单内容：val()，val(value)</a>
##### <a href="/secondless/w-b/jQuery.html#_3、设置单选框、复选框默认选中状态val-非常好用" style="margin-left:70px;">3、设置单选框、复选框默认选中状态val()，非常好用</a>
##### <a href="/secondless/w-b/jQuery.html#_4、元素属性操作-attr-和-removeattr" style="margin-left:70px;">4、元素属性操作：attr()和 removeAttr()</a>
##### <a href="/secondless/w-b/jQuery.html#_5、元素css样式操作" style="margin-left:70px;">5、元素CSS样式操作</a>
##### <a href="/secondless/w-b/jQuery.html#i、css-方法" style="margin-left:100px;">Ⅰ、css()方法</a>
##### <a href="/secondless/w-b/jQuery.html#_1-css-方法获取、设置元素样式" style="margin-left:130px;">① css()方法获取、设置元素样式</a>
##### <a href="/secondless/w-b/jQuery.html#_2-css-方法传递多个样式属性的数组-得到样式属性值对象数组-each-box-function-attr-value-遍历原生态对象数组-jquery对象数组采用-selector-each-function-index-element-方法遍历" style="margin-left:130px;">② css()方法传递多个样式属性的数组，得到样式属性值对象数组，$.each(box,function(attr,value){})遍历原生态对象数组，jQuery对象数组采用$(selector).each(function(index,element){})方法遍历</a>
##### <a href="/secondless/w-b/jQuery.html#_3-css-方法传递多个-css-样式的键值对" style="margin-left:130px;">③ css()方法传递多个 CSS 样式的键值对</a>
##### <a href="/secondless/w-b/jQuery.html#_4-css-方法可以传匿名函数" style="margin-left:130px;">④ css()方法可以传匿名函数</a>
##### <a href="/secondless/w-b/jQuery.html#ii、addclass-方法、removeclass-方法、toggleclass-方法" style="margin-left:100px;">Ⅱ、addClass()方法、removeClass()方法、toggleClass()方法</a>
##### <a href="/secondless/w-b/jQuery.html#_1-addclass-方法、removeclass-方法" style="margin-left:130px;">① addClass()方法、removeClass()方法</a>
##### <a href="/secondless/w-b/jQuery.html#_2-toggleclass-方法-切换class" style="margin-left:130px;">② toggleClass()方法：切换class</a>
##### <a href="/secondless/w-b/jQuery.html#iii、jquery提供其他css操作方法" style="margin-left:100px;">Ⅲ、jQuery提供其他css操作方法</a>
##### <a href="/secondless/w-b/jQuery.html#_1-jquery提供-width-、width-value-、width-function-index-width-方法-获取、设置、通过匿名函数设置某个元素的长度" style="margin-left:130px;">① jQuery提供：width()、width(value)、width(function (index, width) {})方法：获取、设置、通过匿名函数设置某个元素的长度</a>
##### <a href="/secondless/w-b/jQuery.html#_2-jquery提供-height-、height-value-、height-function-index-width-方法-获取、设置、通过匿名函数设置某个元素的高度" style="margin-left:130px;">② jQuery提供：height()、height(value)、height(function (index, width) {})方法：获取、设置、通过匿名函数设置某个元素的高度</a>
##### <a href="/secondless/w-b/jQuery.html#_3-jquery提供内外边距和边框尺寸方法-innerwidth-innerheight-outerwidth-outerheight-outerwidth-ture-outerheight-true" style="margin-left:130px;">③ jQuery提供内外边距和边框尺寸方法：innerWidth()，innerHeight()，outerWidth()，outerHeight()，outerWidth(ture)，outerHeight(true)</a>
##### <a href="/secondless/w-b/jQuery.html#_4-jquery提供元素偏移方法-offset-、position-、scrolltop-、scrolltop-value-、scrollleft-、scrollleft-value" style="margin-left:130px;">④ jQuery提供元素偏移方法：offset()、position()、scrollTop()、scrollTop(value)、scrollLeft()、scrollLeft(value)</a>
####  <a href="/secondless/w-b/jQuery.html#iv、jquery提供的dom节点操作方法" style="margin-left:40px;">11、jQuery提供的DOM节点操作方法</a>
##### <a href="/secondless/w-b/jQuery.html#_1、创建节点" style="margin-left:70px;">1、创建节点</a>
##### <a href="/secondless/w-b/jQuery.html#_2、插入节点" style="margin-left:70px;">2、插入节点</a>
##### <a href="/secondless/w-b/jQuery.html#_1-内部插入节点-append-content-向指定元素内部后面插入节点content" style="margin-left:100px;">① 内部插入节点 append(content)：向指定元素内部后面插入节点content</a>
##### <a href="/secondless/w-b/jQuery.html#_2-内部移入节点-不需要创建节点-appendto-content-将指定元素移入到指定元素content-内部后面" style="margin-left:100px;">② 内部移入节点（不需要创建节点） appendTo(content)：将指定元素移入到指定元素content 内部后面</a>
##### <a href="/secondless/w-b/jQuery.html#_3-内部插入节点-prepend-content-向指定元素-content-内部的前面插入节点" style="margin-left:100px;">③ 内部插入节点 prepend(content)：向指定元素 content 内部的前面插入节点</a>
##### <a href="/secondless/w-b/jQuery.html#_4-内部移入节点-不需要创建节点-prependto-content-将指定元素移入到指定元素content-内部前面" style="margin-left:100px;">④ 内部移入节点（不需要创建节点） prependTo(content)：将指定元素移入到指定元素content 内部前面</a>
##### <a href="/secondless/w-b/jQuery.html#_5-外部-同级-插入节点-before-content-向指定元素的外部前面插入节点content" style="margin-left:100px;">⑤ 外部（同级）插入节点 before(content)：向指定元素的外部前面插入节点content</a>
##### <a href="/secondless/w-b/jQuery.html#_6-外部-同级-移到节点-不需要创建节点-insertbefore-content-将指定节点移到指定元素content-外部的前面" style="margin-left:100px;">⑥ 外部（同级）移到节点 （不需要创建节点）insertBefore(content)：将指定节点移到指定元素content 外部的前面</a>
##### <a href="/secondless/w-b/jQuery.html#_7-外部-同级-插入节点-after-content-向指定元素的外部后面插入节点content" style="margin-left:100px;">⑦ 外部（同级）插入节点 after(content)：向指定元素的外部后面插入节点content</a>
##### <a href="/secondless/w-b/jQuery.html#_8-外部-同级-移到节点-不需要创建节点-insertafter-content-将指定节点移到指定元素content-外部的后面" style="margin-left:100px;">⑧ 外部（同级）移到节点 （不需要创建节点）insertAfter(content)：将指定节点移到指定元素content 外部的后面</a>
##### <a href="/secondless/w-b/jQuery.html#_3、包裹节点" style="margin-left:70px;">3、包裹节点</a>
##### <a href="/secondless/w-b/jQuery.html#_1-wrap-html-向指定元素包裹一层html-代码" style="margin-left:100px;">① wrap(html)：向指定元素包裹一层html 代码</a>
##### <a href="/secondless/w-b/jQuery.html#_2-wrap-element-向指定元素包裹一层-dom对象节点" style="margin-left:100px;">② wrap(element)：向指定元素包裹一层 DOM对象节点</a>
##### <a href="/secondless/w-b/jQuery.html#_3-wrap-function-index-使用匿名函数向指定元素包裹一层自定义内容" style="margin-left:100px;">③ wrap(function (index) {})：使用匿名函数向指定元素包裹一层自定义内容</a>
##### <a href="/secondless/w-b/jQuery.html#_4-unwrap-移除一层指定元素包裹的内容" style="margin-left:100px;">④ unwrap()：移除一层指定元素包裹的内容</a>
##### <a href="/secondless/w-b/jQuery.html#_5-wrapall-html-用-html-将所有元素包裹到一起" style="margin-left:100px;">⑤ wrapAll(html)：用 html 将所有元素包裹到一起</a>
##### <a href="/secondless/w-b/jQuery.html#_6-wrapall-element-用-dom-对象将所有元素包裹在一起" style="margin-left:100px;">⑥ wrapAll(element)：用 DOM 对象将所有元素包裹在一起</a>
##### <a href="/secondless/w-b/jQuery.html#_7-wrapinner-html-、wrapinner-element-、wrapinner-function-index-向指定元素的子内容包裹一层" style="margin-left:100px;">⑦ wrapInner(html)、wrapInner(element)、wrapInner(function (index) {})：向指定元素的子内容包裹一层</a>
##### <a href="/secondless/w-b/jQuery.html#_4、节点操作" style="margin-left:70px;">4、节点操作</a>
##### <a href="/secondless/w-b/jQuery.html#_1-复制节点-clone-true-、替换节点-replacewith、replaceall" style="margin-left:100px;">① 复制节点 clone(true)、替换节点：replaceWith、replaceAll</a>
##### <a href="/secondless/w-b/jQuery.html#_2-删除节点-remove-或者-detach" style="margin-left:100px;">② 删除节点：remove() 或者 detach()</a>
##### <a href="/secondless/w-b/jQuery.html#_3-删除掉节点里的内容empty" style="margin-left:100px;">③ 删除掉节点里的内容empty()</a>
### [章节5.jQuery事件、动画、插件](/secondless/w-b/jQuery事件、动画、插件 '章节5.jQuery事件、动画、插件')
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#一、事件" style="margin-left:40px;">一、事件</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_1、简写事件" style="margin-left:70px;">1、简写事件</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_2、复合事件-hover-fn1-fn2" style="margin-left:70px;">2、复合事件：hover([fn1,]fn2)</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_3、jquery中的事件对象-target、currenttarget、e-stoppropagation-、e-preventdefault-、return-false" style="margin-left:70px;">3、jQuery中的事件对象：target、currentTarget、e.stopPropagation()、e.preventDefault()、return false</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_4、jquery中的高级事件-on、off-和-one" style="margin-left:70px;">4、jQuery中的高级事件：on、off 和 one</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_1-on方法" style="margin-left:100px;">① on方法</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_2-off方法-移除事件" style="margin-left:100px;">② off方法:移除事件</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_3-one方法-仅触发一次的事件" style="margin-left:100px;">③ one方法:仅触发一次的事件</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_5、jquery中的模拟操作" style="margin-left:70px;">5、jQuery中的模拟操作</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#二、动画" style="margin-left:40px;">二、动画</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_1、-显示-show、隐藏-hide" style="margin-left:70px;">1、 显示：show、隐藏：hide</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_1-直接调用-显示show-、隐藏-hide" style="margin-left:100px;">① 直接调用：显示show()、隐藏：hide()</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_2-传递一个参数-毫秒-显示show-1000-、隐藏-hide-1000" style="margin-left:100px;">② 传递一个参数（毫秒）：显示show(1000)、隐藏：hide(1000)</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_3-传递一个预设参数-显示show-slow-normal-fast-隐藏-hide-slow-normal-fast-slow-600-毫秒-normal-默认-400-毫秒-fast-200-毫秒" style="margin-left:100px;">③ 传递一个预设参数：显示show(slow|normal|fast)，隐藏：hide(slow|normal|fast)，slow：600 毫秒，normal：默认 400 毫秒，fast：200 毫秒</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_4-传递第二个参数回调函数-实现列队动画-排队动画-show-毫秒数-slow-normal-fast-function-hide-毫秒数-slow-normal-fast-function" style="margin-left:100px;">④ 传递第二个参数回调函数，实现列队动画（排队动画）：show(毫秒数|slow|normal|fast，function(){})，hide(毫秒数|slow|normal|fast，function(){})</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_5-列队动画-可以使用函数名调用自身或者arguments-callee-匿名函数自调用" style="margin-left:100px;">⑤ 列队动画，可以使用函数名调用自身或者arguments.callee 匿名函数自调用</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_6-toggle-切换show-和hide" style="margin-left:100px;">⑥ toggle()切换show()和hide()</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_2、-滑动-slideup、卷动-slidedown、切换滑动卷动-slidetoggle" style="margin-left:70px;">2、 滑动：slideUp、卷动：slideDown、切换滑动卷动：slideToggle</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_3、-淡入-fadein、淡出-fadeout、切换淡入淡出-fadetoggle、指定透明度-fadeto" style="margin-left:70px;">3、 淡入：fadeIn、淡出：fadeOut、切换淡入淡出：fadeToggle、指定透明度：fadeTo</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_4、-自定义动画-animate" style="margin-left:70px;">4、 自定义动画 animate</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_1-animate基本用法-css样式自定义-同步动画" style="margin-left:100px;">① animate基本用法：css样式自定义，同步动画</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_2-animate用法-animate-css-动画时间-回调函数" style="margin-left:100px;">② animate用法：animate(css,动画时间,回调函数)</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_3-animate位移动画-将元素设置绝对定位或相对定位" style="margin-left:100px;">③ animate位移动画（将元素设置绝对定位或相对定位）</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_4-列队动画方法-queue-方法-连缀执行下一个dequeue-方法-clearqueue-清理列队动画后面还没有执行的" style="margin-left:100px;">④ 列队动画方法:queue()方法，连缀执行下一个dequeue()方法，clearQueue()清理列队动画后面还没有执行的</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_5、-动画相关方法-stop-强制停止动画-delay-延迟动画执行" style="margin-left:70px;">5、 动画相关方法：stop()强制停止动画，delay()延迟动画执行</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_6、判断在运动的动画-通过过滤器-animated" style="margin-left:70px;">6、判断在运动的动画，通过过滤器:animated</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_7、动画全局属性-fx-interval-设置每秒运行的帧数-fx-off-关闭页面上所有的动画-默认swing-缓动-linear-匀速运动" style="margin-left:70px;">7、动画全局属性：$.fx.interval（设置每秒运行的帧数），$.fx.off（关闭页面上所有的动画），默认swing(缓动)，linear(匀速运动)</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#三、jquery插件" style="margin-left:40px;">三、jQuery插件</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#jquery插件-cookie插件" style="margin-left:70px;">1、引入：下载本地引入、或在线引入</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_2、使用插件方法" style="margin-left:70px;">2、使用插件方法</a>
### [章节6.Ajax](/secondless/w-b/Ajax '章节6.Ajax')
####  <a href="/secondless/w-b/Ajax.html#一、原生js中的ajax" style="margin-left:40px;">一、原生js中的Ajax</a>
####  <a href="/secondless/w-b/Ajax.html#_1、xmlhttprequest-简称-xhr-xhr-api" style="margin-left:70px;">1、XMLHttpRequest (简称 XHR，XHR API)</a>
#####  <a href="/secondless/w-b/Ajax.html#_1-第一步-调用-open-方法准备发送请求-发送请求前的准备工作-三个参数-要发送的请求类型-get、post-、请求的-url-和表示是否异步" style="margin-left:100px;">① 第一步：调用 open()方法准备发送请求（发送请求前的准备工作）：三个参数：要发送的请求类型(get、post)、请求的 URL 和表示是否异步</a>
#####  <a href="/secondless/w-b/Ajax.html#_2-第二步-通过-send-方法进行发送请求-一个参数-作为请求主体发送的数据-如果不需要则-必须填-null" style="margin-left:100px;"> ② 第二步：通过 send()方法进行发送请求：一个参数：作为请求主体发送的数据，如果不需要则，必须填 null</a>
#####  <a href="/secondless/w-b/Ajax.html#_3-第三步-发送完了之后-得监听结果-监听服务器给你的请求结果-通过readystatechange-事件监听服务器给你的结果" style="margin-left:100px;">③ 第三步：发送完了之后，得监听结果（监听服务器给你的请求结果），通过readystatechange 事件监听服务器给你的结果</a>
####  <a href="/secondless/w-b/Ajax.html#_2、理解get、post请求" style="margin-left:70px;">2、理解get、post请求</a>
#####  <a href="/secondless/w-b/Ajax.html#_1-getallresponseheaders-获取整个响应头信息-getresponseheader-获取单个响应头信息-setrequestheader-设置请求头信息" style="margin-left:100px;"> ① getAllResponseHeaders()获取整个响应头信息，getResponseHeader()获取单个响应头信息，setRequestHeader()设置请求头信息</a>
#####  <a href="/secondless/w-b/Ajax.html#_2-get请求" style="margin-left:100px;"> ② get请求</a>
#####  <a href="/secondless/w-b/Ajax.html#_3-post请求" style="margin-left:100px;">③ post请求</a>
#####  <a href="/secondless/w-b/Ajax.html#_4-小结get和post请求" style="margin-left:100px;"> ④ 小结get和post请求</a>
####  <a href="/secondless/w-b/Ajax.html#_3、fetch-api" style="margin-left:70px;">3、Fetch API</a>
#####  <a href="/secondless/w-b/Ajax.html#_1-fetch-api基本用法介绍" style="margin-left:100px;"> ① Fetch API基本用法介绍</a>
#####  <a href="/secondless/w-b/Ajax.html#_2-xhr-与-fetch-中的content-type-或者小写content-type" style="margin-left:100px;"> ② XHR 与 Fetch 中的Content-Type(或者小写content-type)</a>
####  <a href="/secondless/w-b/Ajax.html#_4、-xhr-xhr-与-fetch-fetch-的区别-包括-jquery、axios、umi-request的说明" style="margin-left:70px;">4、 XHR（xhr） 与 Fetch（fetch）的区别 （包括：jQuery、Axios、umi-request的说明）</a>
####  <a href="/secondless/w-b/Ajax.html#二、jquery中的ajax" style="margin-left:40px;">二、jQuery中的Ajax</a>
####  <a href="/secondless/w-b/Ajax.html#_1、第二层封装-load-方法-get-和-post-方法" style="margin-left:70px;">1、第二层封装：load()方法，$.get()和$.post()方法</a>
#####  <a href="/secondless/w-b/Ajax.html#_1-load-方法是局部方法-异步加载静态文件如-html文件、json文件等" style="margin-left:100px;"> ① load()方法是局部方法 ： 异步加载静态文件如：html文件、json文件等</a>
#####  <a href="/secondless/w-b/Ajax.html#_2-get-和-post-方法-是全局方法-无须指定某个元素-适合传递参数到服务器请求数据" style="margin-left:100px;"> ② $.get()和$.post()方法：是全局方法，无须指定某个元素，适合传递参数到服务器请求数据</a>
####  <a href="/secondless/w-b/Ajax.html#_2、最高层封装-getjson-和-getscript" style="margin-left:70px;">2、最高层封装：$.getJSON() 和 $.getScript()</a>
#####  <a href="/secondless/w-b/Ajax.html#_1-getjson-方法-专门用于加载-json-文件的" style="margin-left:100px;"> ① $.getJSON()方法：专门用于加载 JSON 文件的</a>
#####  <a href="/secondless/w-b/Ajax.html#_2-getscript-方法-按需加载接口或js文件" style="margin-left:100px;"> ② $.getScript()方法：按需加载接口或js文件</a>
####  <a href="/secondless/w-b/Ajax.html#_3、最底层的封装-ajax" style="margin-left:70px;">3、最底层的封装：$.ajax()</a>
####  <a href="/secondless/w-b/Ajax.html#_4、表单序列化" style="margin-left:70px;">4、表单序列化</a>
#####  <a href="/secondless/w-b/Ajax.html#_1-常规形式的表单提交-表单提交数据" style="margin-left:100px;"> ① 常规形式的表单提交（表单提交数据）</a>
#####  <a href="/secondless/w-b/Ajax.html#_2-jquery中的表单序列化提交数据-表单提交数据" style="margin-left:100px;"> ② jQuery中的表单序列化提交数据（表单提交数据）</a>
#####  <a href="/secondless/w-b/Ajax.html#_3-param-方法将对象转换为字符串键值对格式" style="margin-left:100px;"> ③ $.param()方法将对象转换为字符串键值对格式</a>
####  <a href="/secondless/w-b/Ajax.html#_5、jquery中的跨域jsonp" style="margin-left:70px;">5、jQuery中的跨域jsonp</a>
#####  <a href="/secondless/w-b/Ajax.html#_1-jquery中的跨域jsonp使用" style="margin-left:100px;"> ① jQuery中的跨域jsonp使用</a>
#####  <a href="/secondless/w-b/Ajax.html#_2-延伸一下-jquery中的跨域jsonp模拟百度搜索提示数据" style="margin-left:100px;"> ② 延伸一下：jQuery中的跨域jsonp模拟百度搜索提示数据</a>
####  <a href="/secondless/w-b/Ajax.html#_6、-jqxhr-对象-when-方法、done-方法、always-方法和fail-方法" style="margin-left:70px;">6、 jqXHR 对象: when()方法、done()方法、always()方法和fail()方法</a>
### [章节7.Node.js](/secondless/w-b/Node.js '章节7.Node.js')


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