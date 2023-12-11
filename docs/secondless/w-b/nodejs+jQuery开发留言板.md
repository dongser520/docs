---
navbar: true
sidebar: auto
title: 案例：nodejs+jQuery开发企业网页的留言板功能
---

## 一、基础准备
说明：学习本案例，需要把<a href="/secondless/w-b/Node.js.html" target="_blank">章节7:Node.js基础</a>  按照老师的课程视频，一步一步听下来敲下来，<b>不要跳课学习!</b>
###  ① 搭建node服务器
> 新建： /app.js文件，修改 /package.json的调试命令
> ```javascript
> // package.json的调试命令修改启动文件
> "scripts": {
>     "start": "nodemon app.js", //启动app.js文件
>     "start:node": "node index.js",
>     "dev": "node src/index.js",
>     "test": "echo \"Error: no test specified\" && exit 1"
> },
> ```
> /app.js文件代码，参考：<a href="/secondless/w-b/Node.js.html#_2-querystring%E6%A8%A1%E5%9D%97%E5%A4%84%E7%90%86post-post-%E8%AF%B7%E6%B1%82-querystring-parse">章节7-五、Node中的数据交互-② querystring模块处理POST（post）请求</a> 或者 复制 /index.js文件：213行-247行
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
>            result.push(buffer);
>         });
>         request.on('end',()=>{
>            let data = Buffer.concat(result);
>            console.log(querystring.parse(data.toString()));
>         });
>         console.log(123456789);
>     }
> });
> 
> server.listen(8888,'127.0.0.1',()=>{
>     console.log('服务器已启动');
> });
> ```
启动node服务，让页面先运行起来
> ```javascript
> //vscode: 终端--新建终端（ctrl +shift + `）,选择 mynode文件夹
> npm run start
> ```
谷歌浏览器地址栏输入：<a href="http://localhost:8888/index.html" target="_blank">http://localhost:8888/index.html</a> 或者 <a href="http://127.0.0.1:8888/index.html" target="_blank">http://127.0.0.1:8888/index.html</a>



###  ② contact.html页面
> 引入jQuery，新建: /static/js/contact.jquery.js，删除页面底部之前写的js文件
> ```html
> <script src="./static/js/jquery.1.11.3.min.js"></script>
> <script src="./static/js/contact.jquery.js"></script>
> ```
> 补充一下发送按钮的样式，鼠标放上去有个手型，/static/css/style.css
> ```css
> .page-message .message .submit-div span{
>     color: #ffffff;
>     font-size: 24px;
>     border: 3px solid #ffffff;
>     padding: 15px 70px;
>     cursor: pointer;//补充上
> }
> ```
> /static/js/contact.jquery.js
> ```js
> $(function(){
>    $('.submit-div span').on('click',function(){
>        console.log('点击发送按钮')
>    });
> });
> ```

## 二、获取留言板输入的内容
`说明：由于我们还没有学习正则表达式，所以本案例不对用户输入内容的合规做深度说明，比如：姓名里面输入数字，电话号码输入错误（关于正则表达式我们后面有专题课讲解）`
> ```js
> //手机号正则：
> /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
> //说明：
> //1.这个正则表达式可以匹配大多数中国大陆的手机号码，包括 13、14、15、17、18 开头的手机号码，
> //  以及 166、198、199 开头的虚拟运营商的手机号码
> //2.这个正则表达式不能匹配国际号码、小灵通号码等
> ```
### ① 补全留言板表单信息
> ```html
> <div class="message-main">
>     <div>
>         <span>您的称呼：</span>
>         <input type="text" name="username" placeholder="请输入您的称呼" />
>     </div>
>     <div>
>         <span>您的电话：</span>
>         <input type="text" name="tel" placeholder="请输入您的电话号码">
>     </div>
>     <div>
>         <span>您的留言：</span>
>         <textarea rows="10" cols="30" name="message" placeholder="请输入您想咨询的信息"></textarea>
>     </div>
> </div>
> ```
> 回顾面向对象的知识，完成获取表单数据及合规判断
> ```js
> $(function(){
>    
>     //回顾一下面向对象
>     let message = {
>         //获取您的称呼的值
>         username:function(){
>             return $('input[name=username]').val();
>             // return document.getElementsByName('username')[0].value;
>         },
>         tel:function(){
>             return $('input[name=tel]').val();
>             // return document.getElementsByName('tel')[0].value;
>         },
>         message:function(){
>             return $('textarea[name=message]').val();
>             // return document.getElementsByName('message')[0].value;
>         },
>         //合法性判断
>         is_tel:function(){
>             let tel = this.tel();
>             // return tel;
>             let patter = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
>             if(patter.test(tel)){//返回布尔值，匹配成功返回true，不成功返回false
>                 //成功
>                 return {
>                     msg:'ok',
>                     data:tel
>                 }
>             }else{
>                 //不成功
>                 return {
>                     msg:'error',
>                     data:'电话号码错误'
>                 }
>             }
>         },
>         //页面提示
>         is_tel_html:function(){
>             let is_tel = this.is_tel();
>             if(is_tel.msg == 'ok'){
>                 return  is_tel;
>             }else{
>                 //页面提示，并终止程序
>                 $('input[name=tel]').parent().append('<span style="color:red">'+ is_tel.data + '</span>');
>                 return;
>             }
>         }
>     }
>     $('.submit-div span').on('click',function(){
>        // console.log(message.username());
>        // console.log(message.tel());
>        // console.log(message.message());
> 
>        // console.log(message.is_tel());
>        console.log(message.is_tel_html());
>    });
> });
> ``` 
> ### ② 监听输入数据的合法性
> 当手机号码对了之后，移除错误提示，可以监听输入框输入值的变化
> ```js
> let tel_parent = $('input[name=tel]').parent();
> let message = {
>     //合法性判断
>        is_tel:function(){
>            let tel = this.tel();
>            // return tel;
>            if(!tel){
>                return {
>                    msg:'error',
>                    data:'请输入您的电话号码'
>                }
>            }
>            let patter = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
>            // console.log(patter.test(tel));
>            if(patter.test(tel)){
>                //正确的电话号码
>                return {
>                    msg:'ok',
>                    data:tel
>                }
>            }else{
>                return {
>                    msg:'error',
>                    data:'电话号码不正确'
>                }
>            }
>        },
>        //页面提示
>        is_tel_html:function(){
>            let is_tel = this.is_tel();
>            console.log(is_tel);
>            // return is_tel;
>            let spanhtml = '<span style="color:red">'+ is_tel.data +'</span>';
>            tel_parent.find('span').eq(1).remove();
>            if(is_tel.msg == 'ok'){
>                // console.log(tel_parent.find('span').eq(1).length);
>                /*
>                if(tel_parent.find('span').eq(1).length){
>                    tel_parent.find('span').eq(1).remove();
>                }
>                */
>                // tel_parent.find('span').eq(1).remove();
>                return is_tel;
>            }else{
>                //页面提示，并终止程序
>                // console.log(tel_parent.find('span').eq(1).length);
>                // tel_parent.find('span').eq(1).remove();
>                tel_parent.append(spanhtml);
>                return;
>            }
>        },
>        //监听电话画面输入框
>        input_is_tel_html:function(){
>            /*
>            let _this = this;
>            $('input[name=tel]').on('input',function(){
>                // console.log($(this).val());
>                _this.is_tel_html();
>            });
>            */
>            //箭头函数和匿名函数的区别我们会在后面讲解
>            $('input[name=tel]').on('input',()=>{
>                this.is_tel_html();
>            });
>        }
> };
> //监听输入框输入内容变化
> message.input_is_tel_html();
> $('.submit-div span').on('click',function(){
>     // console.log(message.username());
>     // console.log(message.tel());
>     // console.log(message.message());
> 
>     // console.log(message.is_tel());
> 
>     // console.log(message.is_tel_html());
>     let tel = message.is_tel_html();
> });
> ```
> 称呼我们就只判断一下是否输入，以及称呼的长度限制在15个字以内
## 三、提交数据
> 定义提交接口：`./api/message` <br/>
> 提交数据方式采用jQuery的ajax方式，搜索`表单序列化`