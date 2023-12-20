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
> /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/
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
>             let patter = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/;
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
>            let patter = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/;
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
>               if($('input[name=tel]').val().length > 10 || tel_parent.find('span').eq(1).length){
>                  this.is_tel_html();
>               }               
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
> ```js
> $(function(){
>     //回顾一下面向对象
>     let tel_parent = $('input[name=tel]').parent();
>     let username_parent = $('input[name=username]').parent();
>     let message = {
>         //获取您的称呼的值
>         username:function(){
>             return document.getElementsByName('username')[0].value;
>             // return $('input[name=username]').val();
>         },
>         tel:function(){
>             return document.getElementsByName('tel')[0].value;
>             // return $('input[name=tel]').val();
>         },
>         message:function(){
>             return document.getElementsByName('message')[0].value;
>             // return $('textarea[name=message]').val();
>         },
>         //合法性判断
>         is_tel:function(){
>             let tel = this.tel();
>             if(!tel){
>                 return {
>                     msg:'error',
>                     data:'请输入您的电话号码'
>                 }
>             }
>             // console.log(tel);
>             // return tel;
>             let patter = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/;
>             // console.log(patter.test(tel));
>             if(patter.test(tel)){
>                 //正确的电话号码
>                 return {
>                     msg:'ok',
>                     data:tel
>                 }
>             }else{
>                 return {
>                     msg:'error',
>                     data:'电话号码不正确'
>                 }
>             }
>         },
>         //页面提示
>         is_tel_html:function(){
>             let is_tel = this.is_tel();
>             // return is_tel;
>             // console.log(is_tel);
>             tel_parent.find('span').eq(1).remove();
>             if(is_tel.msg == 'error'){
>                 let spanhtml = '<span style="color:red">'+ is_tel.data +'</span>';
>                 tel_parent.append(spanhtml);
>             }
>             return is_tel;
>         },
>         //监听电话号码的输入值
>         input_is_tel_html:function(){
>             /*
>             let _this = this;
>             $('input[name=tel]').on('input',function(){
>                 // console.log($(this).val());
>                 _this.is_tel_html();
>             })
>             */
>             //箭头函数和匿名函数的区别我们会在后面讲解
>             $('input[name=tel]').on('input',()=>{
>                 if($('input[name=tel]').val().length > 10 || tel_parent.find('span').eq(1).length){
>                     this.is_tel_html();
>                 }
>             });
>         },
>         //称呼合法性判断
>         is_username:function(){
>             let username = this.username();
>             if(!username){
>                 return {
>                     msg:'error',
>                     data:'请输入您的称呼'
>                 }
>             }
>             if(username.length > 0 && username.length <= 15){
>                 return {
>                     msg:'ok',
>                     data:username
>                 }
>             }else{
>                 return {
>                     msg:'error',
>                     data:'您的称呼不能超过15个字符'
>                 }
>             }
>         },
>         //称呼页面提示
>         is_username_html:function(){
>             let is_username = this.is_username();
>             // console.log(is_username);
>             username_parent.find('span').eq(1).remove();
>             if(is_username.msg == 'error'){
>                 //页面提示
>                 let spanhtml = '<span style="color:red">'+ is_username.data +'</span>';
>                 username_parent.append(spanhtml);
>             }
>             return is_username;
>         },
>         //监听称呼的输入值
>         input_is_username_html:function(){
>             $('input[name=username]').on('input',()=>{
>                 if($('input[name=username]').val().length > 15 || username_parent.find('span').eq(1).length){
>                     this.is_username_html();
>                 }
>             });
>         },
>     }
> 
>     //监听电话号码的输入值
>     message.input_is_tel_html();
>     //监听称呼的输入值
>     message.input_is_username_html();
> 
>     $('.submit-div span').on('click',function(){
>         // console.log(message.username());
>         // console.log(message.tel());
>         // console.log(message.message());
> 
>         // console.log(message.is_tel());
> 
>         // console.log(message.is_tel_html());
> 
>         let username = message.is_username_html();
>         let tel = message.is_tel_html();
>         console.log(username);
>         console.log(tel);
>         if(username.msg == 'ok' && tel.msg == 'ok'){
>             // console.log('提交数据')
>             _this = this;
>             $.ajax({
>                 type: 'POST', //表单提交我们采用post , get方式数据量小也可以
>                 url: './api/message',//提交给服务器的接口地址，一般后端程序员给你一个接口（当然你可以自己写一个接口）
>                 //使用$.param()将对象形式的键值对转为 URL 地址的字符串键值对，可以更加稳定准确的传递表单内容
>                 data:$.param({ 
>                     username : username.data,
>                     tel : tel.data,
>                     message : message.message(),  
>                 }),
>                 beforeSend:function(xhr){
>                     $(_this).text('提交中...');
>                 },
>                 success: function (response, stutas, xhr) {
>                     $(_this).text('发送')
>                     console.log(response)
>                 },
>             });
>         }
>     });
> });
> ```
> ### ① 提交留言之后的页面处理
> ```js
> $('.submit-div span').on('click',function(){
>     let username = message.is_username_html();
>     let tel = message.is_tel_html();
>     if(username.msg == 'ok' && tel.msg == 'ok'){
>         console.log($(this).text());
>         let _this = this;
>         $.ajax({
>             type: 'POST', //表单提交我们采用post , get方式数据量小也可以
>             url: './api/message',//提交给服务器的接口地址，一般后端程序员给你一个接口（当然你可以自己写一个接口）
>             data:$.param({ 
>                 username : username.data,
>                 tel:  tel.data,
>                 message:message.message()
>             }),
>             beforeSend:function(xhr){
>                 // console.log($(this).text());
>                 //$(this)指向的是最近调用它的jquery对象,$(this)就是表示ajax对象了
>                 // $('.submit-div span').text('提交中...');
>                 $(_this).text('提交中...');
>             },
>             success: function (response, stutas, xhr) {
>                 console.log(response)
>                 $('input,textarea').val('');//清空输入内容
>                 $(_this).text('您的留言已提交成功，我们会尽快和您联系！');
>                 setTimeout(() => {
>                     $(_this).text('发送');
>                 }, 5000);
>             },
>             error:function(err){
>                 $(_this).text('发送');
>             },
>             complete:function(){
>                 // $(_this).text('发送');
>             }
>             });
>     }
> });
> ```
## 四、nodejs服务器端处理留言
> `说明：由于我们目前没有学习数据库相关的内容（常用的数据库如：MySQL，Oracle，MongoDB，SQL Server等等），因此我们目前可以将用户提交的留言以json文件的形式，存放在服务器上。`<br/>
> 留言内容 `/data/message.json` 文件数据格式
> ```js
> {
>     "data":[
>         {"username":"迪丽热巴","tel":"13545375400","message":"请问贵公司还招人吗？","id":1},
>         {"username":"古力娜扎","tel":"13854856512","message":"","id":2},
>         {"username":"梁咏琪","tel":"17858584587","message":"我有个业务想和贵公司合作一下，请及时联系我","id":3},
>         {"username":"刘德华","tel":"13945444477","message":"","id":4},
>         {"username":"古天乐","tel":"13954854477","message":"","id":5}
>     ],
>     "total":5,
>     "currentId":5
> }
> ```
> ### ① 首次留言处理
> ```js
> //留言写入json文件
> function addmessage(data){
>     data = querystring.parse(data.toString());
>     console.log(data);
>     //创建一个文件夹data
>     if(!fs.existsSync('./data')){//不存在则创建
>         fs.mkdirSync('./data');
>     }
>     //判断message.json文件是否存在，存在说明之前写入过了，先读一下
>     /*
>     let flag = false;
>     console.log(fs.existsSync('./data/message.json'));
>     if(fs.existsSync('./data/message.json')) flag = true;
>     */
>     let flag = fs.existsSync('./data/message.json') ? true : false;
>     if(flag){
>         //读一下再写
>         console.log('读一下再写');
>         readmessage('./data/message.json',data);
>     }else{
>         //第一次创建数据
>         let ms = data;
>         ms.id = 1;
>         //加入时间,所在地等等
>         ms.timestamp = new Date().getTime();
>         console.log(ms);
>         let o = {};
>         o.data = [];
>         o.data.push(ms);
>         o.total = 1;
>         o.currentId = 1;
>         console.log(o);
>         //写入内容,同步异步promise,以及可写流
>         fs.writeFile('./data/message.json',JSON.stringify(o),(err)=>{
>             if(err) throw err;
>             console.log('写入成功');
>         });
>     }
> }
> ```
> 时间戳参考：<a href="https://zhuanlan.zhihu.com/p/652330526" target="_blank">时间戳和时间的转化</a> 
> ### ② 存储用户的留言
> ```js
> //读一下json文件在做处理
> function readmessage(path,data) {
>     //读取内容,同步异步promise,以及可写流
>     fs.readFile(path, {
>         encoding: 'utf-8'
>     }, (err, oldmessage) => {
>         if (err) throw err;
>         oldmessage = JSON.parse(oldmessage);
>         // console.log(oldmessage)
>         // console.log(data);
>         //处理数据
>         data.id = oldmessage.currentId + 1;
>         //加入时间,所在地等等
>         data.timestamp = new Date().getTime();
>         //新的留言放进数组
>         oldmessage.data.push(data);
>         //处理大对象
>         oldmessage.total = oldmessage.data.length;
>         oldmessage.currentId = data.id;
>         console.log(oldmessage);
>         //写入内容,同步异步promise,以及可写流
>         fs.writeFile(path, JSON.stringify(oldmessage), (err) => {
>             if (err) throw err;
>             console.log('写入成功')
>         });
>     });
> }
> ```
关于一般返回的接口规范，我们可以参考高德地图：<a href="https://lbs.amap.com/api/webservice/summary" target="_blank">https://lbs.amap.com/api/webservice/summary</a> 

## 五、案例最终代码展示
### ① contact.html页面
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
>     //回顾一下面向对象
>     let tel_parent = $('input[name=tel]').parent();
>     let username_parent = $('input[name=username]').parent();
>     let message = {
>         //获取您的称呼的值
>         username:function(){
>             return document.getElementsByName('username')[0].value;
>             // return $('input[name=username]').val();
>         },
>         tel:function(){
>             return document.getElementsByName('tel')[0].value;
>             // return $('input[name=tel]').val();
>         },
>         message:function(){
>             return document.getElementsByName('message')[0].value;
>             // return $('textarea[name=message]').val();
>         },
>         //合法性判断
>         is_tel:function(){
>             let tel = this.tel();
>             if(!tel){
>                 return {
>                     msg:'error',
>                     data:'请输入您的电话号码'
>                 }
>             }
>             // console.log(tel);
>             // return tel;
>             let patter = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/;
>             // console.log(patter.test(tel));
>             if(patter.test(tel)){
>                 //正确的电话号码
>                 return {
>                     msg:'ok',
>                     data:tel
>                 }
>             }else{
>                 return {
>                     msg:'error',
>                     data:'电话号码不正确'
>                 }
>             }
>         },
>         //页面提示
>         is_tel_html:function(){
>             let is_tel = this.is_tel();
>             // return is_tel;
>             // console.log(is_tel);
>             tel_parent.find('span').eq(1).remove();
>             if(is_tel.msg == 'error'){
>                //页面提示
>                let spanhtml = '<span style="color:red">'+ is_tel.data +'</span>';
>                tel_parent.append(spanhtml);
>             }
>             return is_tel;
>         },
>         //监听电话号码的输入值
>         input_is_tel_html:function(){
>             /*
>             let _this = this;
>             $('input[name=tel]').on('input',function(){
>                 // console.log($(this).val());
>                 _this.is_tel_html();
>             })
>             */
>             //箭头函数和匿名函数的区别我们会在后面讲解
>             $('input[name=tel]').on('input',()=>{
>                 if($('input[name=tel]').val().length > 10 || tel_parent.find('span').eq(1).length){
>                     this.is_tel_html();
>                 }
>                 
>             });
>         },
>         //称呼合法性判断
>         is_username:function(){
>             let username = this.username();
>             if(!username){
>                return {
>                     msg:'error',
>                     data:'请输入您的称呼'
>                 }
>             }
>             if(username.length > 0 && username.length <= 15){
>                 //正确的称呼
>                return {
>                     msg:'ok',
>                     data:username
>                 }
>             }else{
>                 return {
>                     msg:'error',
>                     data:'您的称呼不能超过15个字符'
>                 }
>             }
>         },
>         //称呼页面提示
>         is_username_html:function(){
>             let is_username = this.is_username();
>             username_parent.find('span').eq(1).remove();
>             if(is_username.msg == 'error'){
>                //页面提示
>                let spanhtml = '<span style="color:red">'+ is_username.data +'</span>';
>                username_parent.append(spanhtml);
>             }
>             return is_username;
>         },
>         //监听电话号码的输入值
>         input_is_username_html:function(){
>             $('input[name=username]').on('input',()=>{
>                 if($('input[name=username]').val().length > 15 || username_parent.find('span').eq(1).length){
>                     this.is_username_html();
>                }
>                 
>             });
>         },
>     }
> 
>     //监听电话号码的输入值
>     message.input_is_tel_html();
>     //监听称呼的输入值
>     message.input_is_username_html();
> 
>     $('.submit-div span').on('click',function(){
>         let username = message.is_username_html();
>         let tel = message.is_tel_html();
>         console.log(username);
>         console.log(tel);
>         if(username.msg == 'ok' && tel.msg == 'ok'){
>             // console.log($(this).text());
>             let _this = this;
>             $.ajax({
>                 type: 'POST', //表单提交我们采用post , get方式数据量小也可以
>                 url: './api/message',//提交给服务器的接口地址，一般后端程序员给你一个接口（当然你可以自己写一个接口）
>                 //使用$.param()将对象形式的键值对转为 URL 地址的字符串键值对，可以更加稳定准确的传递表单内容
>                 data:$.param({ 
>                     username : username.data,
>                     tel:  tel.data,
>                     message:message.message()
>                 }),
>                 beforeSend:function(xhr){
>                     // console.log($(_this).text());
>                     //$(this)指向的是最近调用它的jquery对象,$(this)就是表示ajax对象了
>                     // $('.submit-div span').text('提交中...');
>                     $(_this).text('提交中...');
>                 },
>                 success: function (response, stutas, xhr) {
>                     console.log(response);
>                     $(_this).text('您的留言已提交成功，我们会尽快和您联系！');
>                     setTimeout(()=>{
>                         $(_this).text('发送');
>                     },5000);
>                 },
>                 error:function(err){
>                     $(_this).text('发送');
>                 },
>                 complete:function(){
>                     $('input,textarea').val('');
>                 }
>             });
>         }
>     });
> });
> ```
### ② 服务器端app.js代码
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
> /app.js文件代码
> ```javascript
> let http = require('http');
> let fs = require('fs');
> let $url = require('url');
> let querystring = require('querystring');
> const server = http.createServer((request, response) => {
>     if (request.method == 'GET') {
>         let url = request.url;
>         if (url.indexOf('/api/') == -1) {
>             if (url.indexOf('.json') > -1) {
>                 return errorhtml(response);
>             }
>             fs.readFile(`./${url}`, (err, data) => {
>                 if (err) {
>                     errorhtml(response);
>                 } else {
>                     response.writeHead(200);
>                     response.end(data);
>                 }
>             });
>         }
>     } else if (request.method == 'POST') {
>         let result = [];
>         request.on('data', buffer => {
>             result.push(buffer);
>         });
>         request.on('end', () => {
>             let data = Buffer.concat(result);
>             response.writeHead(200);
>             response.end('ok');
>             //留言写入json文件,自定义文件夹名字，和文件名
>             let paths = {
>                 dir:'./data',
>                 file: './data/message.json'
>                 // dir:'./Appdata',
>                 // file: './Appdata/data.json'
>             }
>             addmessage(data,paths);
>         });
> 
>     }
> });
> 
> server.listen(8888, '127.0.0.1', () => {
>     console.log('服务器已启动');
> });
> 
> const errorhtml = (response)=>{
>     response.setHeader('Content-Type', 'text/html; charset=utf-8');
>     response.writeHead(200);
>     let msg = {
>         status:404,
>         info:"error",
>         data:'not found'
>     }
>     response.end(JSON.stringify(msg));
> }
> 
> //留言写入json文件
> function addmessage(data,paths) {
>     console.log(paths);
>     data = querystring.parse(data.toString());
>     if (!fs.existsSync(paths.dir)) {
>         fs.mkdirSync(paths.dir);
>     };
>     let flag = fs.existsSync(paths.file);
>     if (flag) {
>         //存在先读取一下再写
>         readmessage(paths.file, data)
>     } else {
>         //不存在，首次直接写
>         let ms = data;
>         ms.id = 1;
>         //加入时间,所在地等等
>         ms.timestamp = new Date().getTime();
>         let o = {};
>         o.data = [];
>         o.data.push(ms);
>         o.total = 1;
>         o.currentId = 1;
>         writemessage(paths.file, o);
>     }
> }
> 
> //存在先读取一下再写
> function readmessage(path, data) {
>     fs.readFile(path, {
>         flag: 'r',
>         encoding: 'utf-8',
>     }, (err, oldmessage) => {
>         if (err) throw err;
>         oldmessage = JSON.parse(oldmessage);
>         //处理留言数据
>         data.id = oldmessage.currentId + 1;
>         //加入时间,所在地等等
>         data.timestamp = new Date().getTime();
>         //大对象
>         oldmessage.data.push(data);
>         oldmessage.total = oldmessage.data.length;
>         oldmessage.currentId = data.id;
>         writemessage(path, oldmessage);
>     })
> }
> 
> //写入数据
> function writemessage(path, data) {
>     fs.writeFile(path, JSON.stringify(data), (err) => {
>         if (err) throw err;
>         console.log('写入成功')
>     });
> }
> ```