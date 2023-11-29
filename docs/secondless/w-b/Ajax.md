---
navbar: true
sidebar: auto
title: 章节6.Ajax
---


前言
> Ajax：Asynchronous JavaScript + XML 的简写，是一种技术，这种技术能够向服务器请求额外的数据而无须刷新页面。Ajax 技术核心是 XMLHttpRequest 对象(简称 XHR)。<br/><br/>关于Ajax，我们将分两部分进行讲解，一部分是：原生js进行讲解，另外一部分是jQuery将原生js进行封装之后的方法进行讲解，即jQuery中ajax的应用。

## 一、原生js中的Ajax
## 1、XMLHttpRequest (简称 XHR，XHR API)
回顾之前获取外部json文件
> 我们在<a href="/secondless/w-a/数据Cookie、XML、JSON.html#_2-获取外部json文件" target="_blank">第二学期第1季-章节18-Ⅴ、JSON-② 获取外部json文件</a> 
> ```javascript
> window.onload = function () {
>     let json = new XMLHttpRequest();
>     json.open("GET", "./demo.json", true);
>     json.responseType = "json";
>     json.onload = function () {
>         console.log(json);
>         console.log(json.response);
> 
>         console.log(this);
>         console.log(this.response);
> 
>         if (this.status == 200) {
>             let res = this.response;
>             console.log(res[0].name);//第一项name值
> 
>             res.forEach(element => {
>                 console.log('name:', element.name);//每一项的name
>             });
>         } else {
>             console.log('请求失败');
>         }
> 
>     }
>     json.send();
> }
> ```
> 我们通过new XMLHttpRequest();对象请求数据或文件，实际上我们用的就是ajax。接下来我们对XMLHttpRequest对象做一个深度分析。

###  ① 第一步：调用 open()方法准备发送请求（发送请求前的准备工作）：三个参数：要发送的请求类型(get、post)、请求的 URL 和表示是否异步
> ```javascript
> window.onload = function(){
>     //创建XMLHttpRequest对象，可以理解成XMLHttpRequest是一个构造函数，实例化一个对象
>     let xhr = new XMLHttpRequest();
>     console.log('初始化时候的xhr对象', xhr);
> }
> ```
> 创建完XMLHttpRequest 对象后，先调用open方法，这个方法在它的原型上
> ```javascript
> window.onload = function(){
>     //创建XMLHttpRequest对象，可以理解成XMLHttpRequest是一个构造函数，实例化一个对象
>     let xhr = new XMLHttpRequest();
>     console.log('初始化时候的xhr对象', xhr);
>     //第一步：须调用 open()方法：三个参数：要发送的请求类型(get、post)、请求的 URL 和表示是否异步
>     //1、请求类型(get、post、put、delete等等)，关于请求类型，后面会说，常用的是get/post两种方式
>     //2、关于get/post 区别，我们在后面总结的时候会讲
>     //3、请求的 URL: 就是一个网络地址（网址、接口地址）
>     //4、是否异步：异步就是跟同步相反的意思，同步大家知道就是发出去立刻返回无需等待
>     //异步：就是发送请求出去要等一会，哪怕是1ms，这里可以使用异步也可以使用同步，我们先讲异步 true
>     //意思就是：我请求这个json文件，我等了20ms服务器才返回这个json文件数据给我，而这20ms
>     //是由于我的网络不通畅导致的，如果你此时在山区，网络信号更差，那需要等待的时间更长
>     //所以需要异步,就是发完请求之后要等一会（同步我们后面会讲）
> 
>     xhr.open('get','./demo.json',true);//意思是准备发送请求,发送前的准备工作，还没有发送
> }
> ```
###  ② 第二步：通过 send()方法进行发送请求：一个参数：作为请求主体发送的数据，如果不需要则，必须填 null
> 执行 send()方法之后，请求就会发送到服务器上。
> ```javascript
> window.onload = function(){
>     let xhr = new XMLHttpRequest();
>     xhr.open('get','./demo.json',true);//意思是准备发送请求,发送前的准备工作，还没有发送
>     xhr.send(null); //发送请求
> }
> ```
###  ③ 第三步：发送完了之后，得监听结果（监听服务器给你的请求结果），通过readystatechange 事件监听服务器给你的结果
<strong style="color:#00A5F7;"> 特别注意：监听事件readystatechange必须要写在准备发送之前</strong>

> ```javascript
> window.onload = function(){
>     let xhr = new XMLHttpRequest();
>     //监听服务器返回的结果
>     xhr.onreadystatechange = function(){
>         console.log('在查看一下xhr',xhr);
>         //发现执行了4次，通过readyState 属性得到1,2,3,4
>         //1:状态:启动  已经调用 open()方法，但尚未调用 send()方法
>         //2:状态:发送  已经调用 send()方法，但尚未接受响应
>         //3:状态:接受  已经接受到服务器部分响应数据 
>         //4:状态:完成  已经接受到全部响应数据，而且可以使用
>         if(xhr.readyState == 4){
>            console.log('已经全部接收完数据了',xhr);
>            console.log('response',xhr.response);//请求返回的数据
>            console.log('response类型',typeof xhr.response);
>            console.log('responseText', xhr.responseText);//请求返回的文本数据
>            console.log('responseText类型', typeof xhr.responseText);
>            console.log('responseType',xhr.responseType);//请求返回的数据类型
>            console.log('responseURL',xhr.responseURL);//请求地址
>            console.log('status',xhr.status);//200获取成功
>            if(xhr.status == 200){
>               console.log('获取成功数据',xhr.response)
>            }else{
>               console.log('获取数据失败')
>            }
>         } 
> 
>     }
>     xhr.open('get','./demo.json',true);//意思是准备发送请求,发送前的准备工作，还没有发送
>     // xhr.responseType = 'json';
>     xhr.send(null); //发送请求
> }
> ```

## 2、理解get、post请求
> 在提供服务器请求的过程中，有两种最常用的方式，分别是：GET（get） 和 POST（post）。<br/><br/>
> 在web程序上：<br/>get一般是URL提交请求，比如：http://www.net.com/domo.json?username=迪丽热巴&sex=女 <br/>
> post提交一般是表单提交，提交内容不写在网址上面 （更多区别我们总结的时候再讲）                <br/><br/>
> 在了解这两种请求方式前，我们先了解一下 HTTP 头部信息，包含服务器返回的响应头信息和客户端发送出去的请求头信息。我们可以获取响应头信息或者设置请求头信息。
### ① getAllResponseHeaders()获取整个响应头信息，getResponseHeader()获取单个响应头信息，setRequestHeader()设置请求头信息
> ```javascript
> //两种头信息：
> //1、响应头信息：服务器返回的信息，客户端可以获取，但是不可以设置
> //2、请求头信息：客户端发送的信息，客户端可以设置，但不可以获取
> window.onload = function(){
>     let xhr = new XMLHttpRequest();
>     xhr.onreadystatechange = function(){
>         if(xhr.readyState == 4){
>            if(xhr.status == 200){
>                 console.log('获取成功数据',xhr);
>                 //1、响应头信息：服务器返回的信息，客户端可以获取，但是不可以设置
>                 //使用 getAllResponseHeaders()获取整个响应头信息
>                 console.log('获取整个响应头信息',xhr.getAllResponseHeaders());
>                 //使用 getResponseHeader()获取单个响应头信息
>                 console.log('获取单个响应头信息【Content-Type】',xhr.getResponseHeader('Content-Type'));
>            }else{
>                console.log('获取数据失败')
>            }
>         }
>     }
>     xhr.open('get','./demo.json',true);
>     //2、请求头信息：客户端发送的信息，客户端可以设置，但不可以获取
>     xhr.setRequestHeader('username',encodeURIComponent('迪丽热巴'));//设置请求头信息，中文需转码
>     //在get方式提交用处不大，一般post提交数据的时候，携带cookie或者token给服务器用得比较多
> 
>     // xhr.responseType = 'json';
>     xhr.send(null);
> }

### ② get请求
> 最常用于向服务器查询某些信息。必要时，可以将查询字符串参数追加到 URL 的末尾，以便提交给服务器。
> ```javascript
> xhr.open('get','./demo.json?username=123&sex=女',true);
> ```
> 一般传参的时候，比如上面的sex=女，这个值：女，传递之前，需要encodeURIComponent('女')编码一下，以免乱码。

### ③ post请求
> 当我们请求或者提交的数据量比较大的时候，我们一般采用post请求，而发送 POST 请求的数据，不会跟在 URL 的尾巴上，而是通过 send()方法向服务器提交数据。
> ```javascript
> window.onload = function(){
>     let xhr = new XMLHttpRequest();
>     xhr.onreadystatechange = function(){
>         if(xhr.readyState == 4){
>            if(xhr.status == 200){
>                 console.log('获取成功数据',xhr)
>                 
>            }else{
>                console.log('获取数据失败')
>            }
>         }
>     }
>     xhr.open('post','./demo.json',true);
>     // xhr.responseType = 'json';
>     //一般来说，向服务器发送 POST 请求由于解析机制的原因，需要进行特别的处理
>     //因为POST 请求和 Web 表单提交是不同的，需要使用 XHR 来模仿表单提交
>     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
>     xhr.send('username=123&sex=女');//send方法里面加一些内容
> }
> ```
> <br/>
### ④ 小结get和post请求
> <b>简单小结get和post请求：</b><span style="color:#00A5F7"> (更多区别会在后面的项目中，给大家讲解)</span><br/><br/>
> 1. <b style="color:green">参数传递方式</b>：GET请求将参数附加在URL的查询字符串中，例如：`http://www.net.com/demo.json?username=123&sex=女`。而POST请求将参数放在请求的消息体中，不会直接暴露在URL中。
> <br/><br/>
> 2. <b style="color:green">请求长度限制</b>：GET请求对URL长度有限制，不同浏览器和服务器对长度限制的具体要求有所不同，一般在几千个字符左右`(通常在2KB到8KB之间)`。`POST方法将数据放在HTTP请求体中，因此数据大小不受限制`。但是，Web服务器和Web应用程序可能会对POST请求的大小进行限制。这是为了避免网络拥塞和服务器过载等问题。`通常，Web服务器和Web应用程序对POST请求的大小限制在1MB到2MB之间`。
> <br/><br/>
> 3. <b style="color:green">安全性</b>：GET请求的参数暴露在URL中，容易被拦截和篡改，因此不适合传输敏感信息。POST请求的参数在消息体中，相对安全一些，但仍然可以被拦截和修改。
> <br/><br/>
> 4. <b style="color:green">缓存处理</b>：GET请求会被浏览器缓存，如果再次发送相同的GET请求，浏览器可能直接返回缓存的结果，不会再向服务器发送请求。而POST请求不会被缓存，每次发送都会向服务器请求最新的数据。
> <br/><br/>
> 5. <b style="color:green">使用场景</b>：GET请求适合获取数据，例如获取文章列表、查询信息等。POST请求适合提交数据，例如提交表单、创建资源等。
> <br/><br/>
> <b>总结来说，GET请求适合获取数据，参数在URL中，有长度限制，不安全；而POST请求适合提交数据，参数在消息体中，没有长度限制，相对安全。根据具体的需求和场景，选择适合的请求方法。</b>


## 3、Fetch API
前言
> 在早期，IE浏览器率先提出了一套API来完成请求的发送（其它浏览器紧随其后跟进），这套API主要依靠一个构造函数完成，该构造函数的名称为：`XMLHttpRequest`，`简称XHR`，也就是我们上面讲的内容。所以这套API又称之为`XHR API`。<br/><br/>
> 由于`XHR API`存在一些缺陷，写起来也麻烦，于是在HTML5和ES6发布后，产生了一套更完善的API来发送请求，这套API使用的是一个叫做 `fetch()的函数`，因此这套API又称为 `Fetch API`。<br/><br/>
> 也就是说，不论是`XHR API` 或者 `Fetch API`，它们都是实现ajax的技术手段，只是API用法不同。并且，由于都是浏览器提供的原生方法，因此，它们两套API都是原生api，所有现代浏览器默认都支持。

> ### ① Fetch API基本用法介绍
> ```javascript
> window.onload = function(){
>     //console.log(window.fetch);//原生内置方法，所有浏览器都支持
>     //默认get请求，返回的是一个Promise(关于什么是Promise我们后面会讲到)
>     //当收到服务器的响应头之后，类似上面 xhr.readyState == 3，接收服务器部分数据了，Promise就完成了
>     //完成之后，怎么获取结果.then()方法
>     fetch('./demo.json').then(function(response){
>         console.log('看一下response',response);//此时这里已经可以拿到服务器的响应头了
>         //查看里面的headers，它这个里面有get()方法拿响应头，has()方法判断有没有某一个响应头
>         console.log(response.headers.get('Content-Type'));
>         //那我们看一下如何获取响应体，就是返回给我们的数据
>         //注意我们刚刚说了，我们then()方法 相当于 xhr.readyState == 3，此时响应体数据还没有接收完
>         //也就是说需要它继续接收响应体，直到接收完毕，类似我们上面的 xhr.readyState == 4
>         //response原型里面有两个函数方法：json() text() 表达的意思都是继续接收响应体
>         //json() text()方法的区别在于怎么看待这个响应体，类似与我们上面的：response 、 responseText
>         //当成json格式看待用：json()  当成纯文本看待用：text()
>         //当成json格式看待，当我们接收完响应体之后，它得到的就是一个json对象，或者叫js对象
>         //如果当初纯文本格式看待，当我们接收完响应体之后，它得到的就是一个字符串
>         // console.log(response.json());//返回的是promise 
>         //那么既然返回的是promise，那么就可以继续用then()方法
>         return response.json();//返回接收的响应体数据，在下一个then里面打印即可，因为当前then只是状态3
>     }).then(function(response){
>         console.log('看一下接收完数据的response',response);
>     })
> }
> ```
> ```javascript
> window.onload = function(){
>     // fetch('./demo.json').then(function(response){
>     //     return response.json();
>     // }).then(function(response){
>     //     console.log('看一下接收完数据的response',response);
>     // })
>     fetch('./demo.json',{
>         method: 'post',//默认get
>         headers: {
>             'Content-Type': 'application/json'
>         },
>         body:{
>             username:encodeURIComponent('迪丽热巴'),
>             sex:'女'
>         }
>         //更多参数我们项目开发中再讲
>     }).then(res => res.json()).then(res =>{
>         console.log('看一下接收完数据的response',res);
>     })
> }
> ```
### ② XHR 与 Fetch 中的Content-Type(或者小写content-type)
> ```javascript
> content-type 请求携带的数据的类型
> 
> application/x-www-form-urlencoded：表示数据被编码成以 ‘&’ 分隔的键 - 值对，同时以 ‘=’ 分隔键和值
> 
> application/json：表示是一个json类型
> 
> text/plain：表示是文本类型
> 
> application/xml：表示是xml类型
> 
> multipart/form-data：表示是上传文件
> ```
> 参考<a href="https://blog.csdn.net/ximing020714/article/details/129326246" target="_blank">https://blog.csdn.net/ximing020714/article/details/129326246</a>  

## 4、 XHR（xhr） 与 Fetch（fetch）的区别 （包括：jQuery、Axios、umi-request的说明）
> 那么有的同学不禁要问，那是不是以后就可以完全抛弃XHR，只用Fetch就可以了呢？我们来看一下对比
> |  功能                        |  XHR                            |  Fetch                           |   
> |   :--:                      |   :--:                           |   :--:                           | 
> |  基本的请求能力               |   <b style="color:green;">√</b> |   <b style="color:green;">√</b>  |
> |  基本的获取响应能力            |   <b style="color:green;">√</b> |   <b style="color:green;">√</b>  |
> |  <b>监控请求进度</b>          |   <b style="color:green;">√</b> |   <b style="color:red;">×</b>  |
> |  监控响应进度                 |   <b style="color:green;">√</b> |   <b style="color:green;">√</b>  |
> |  Service Worker中是否可用     |   <b style="color:red;">×</b>   |   <b style="color:green;">√</b>  |
> |  控制cookie的携带             |   <b style="color:red;">×</b>   |   <b style="color:green;">√</b>  |
> |  控制重定向                   |   <b style="color:red;">×</b>   |   <b style="color:green;">√</b>  |
> |  请求取消                     |   <b style="color:green;">√</b> |   <b style="color:green;">√</b>  |
> |  自定义referrer               |   <b style="color:red;">×</b>   |   <b style="color:green;">√</b>  |
> |  流                           |   <b style="color:red;">×</b>  |   <b style="color:green;">√</b>  |
> |  API风格                      |   <b style="color:green;">Event</b> |   <b style="color:green;">√</b>  |
> |  活跃度                       |  停止更新                            |   还在更新                       |

从表格可以看到，XHR能做的事情，Fetch都能做，只有一样做不了，就是`监控请求进度`。这也就意味着，`如果你要做文件的上传的进度监控的话，那么Fetch就不合适了`，只能用XHR。<br/><br/>
因此，我们在学习的时候，两个都要学习。这是浏览器原生支持的，它是写入了HTML5的标准的。<br/><br/>除了原生之外呢，有些开发者觉得原生的不好用，所以需要对原生的做一些封装。于是产生了一些第三方库，诸如：`jQuery中的ajax`，Axios <a href="http://www.axios-js.com/" target="_blank">打开Axios中文官网</a>，`umi-request`这些第三方库 <br/><br/>
但是注意：<br/><br/>
所有的第三方库，它的功能边界一定是原生决定的。也就是，`原生能做到的事情，你封装过后也可能做到`，`而原生做不到的事情，你封装过后一定做不到`。原生的能力，决定了库和框架的边界，所有的第三方库都是基于原生写的封装的，原生能做的它才有机会做，否则是不可能做到的。<br/><br/>这也就意味着：像`Axios`这样的库，它在浏览器端，是使用XHR封装的，因此`Axios`就继承了XHR的所有优点和缺点，也就意味着，表格中XHR打叉叉的地方，`Axios`它也一定做不到。<br/><br/> 同理，`umi-request`这个库是用Fetch封装的，也就意味着，Fetch做不到的`监控请求进度`，`umi-request`这个库也是一样做不到，除非，针对`监控请求进度`，`umi-request`又用`XHR`来实现一遍。而且，像这些第三方库的封装，由于它们是用原生写的，而原生的代码它所运行的环境，也就决定了这些第三方库所运行的环境，比方说，AJAX运行的环境是什么？是浏览器，你脱离了浏览器就谈不上AJAX，这就决定了那些第三方库，用XHR 或者Fetch 封装的时候，它也只能在浏览器环境里面运行，除非你加入了其他环境的代码，比如说像`Axios`它有两套代码，一套是针对浏览器的代码，一套是针对Node环境的代码。<br/><br/>
所以，希望通过老师的讲解，同学们搞清楚它们的关系。


## 二、jQuery中的Ajax
> 我们上一节课已经讲了，`jQuery中的Ajax` 还有 `Axios` 是对我们原生js中的`XHR`对象做了封装，对于封装的方式，jQuery 采用了三层封装：最底层的封装方法为：`$.ajax()`，而通过这层封装了第二层有三种方法：`.load()`、`$.get()`和`$.post()`，最高层是`$.getScript()`和`$.getJSON()`方法。接下来我们将围绕着三层封装进行学习使用。
## 1、第二层封装：load()方法，$.get()和$.post()方法
### ① load()方法是局部方法 ： 异步加载静态文件如：html文件、json文件等
> load()方法是局部方法，因为它需要一个包含元素的 jQuery 对象作为前缀，对于用途而言，load()方法适合做静态文件的异步获取。<br/><br/>
> `关于异步和同步再举个例子说明一下区别`：先说同步，我们普通的 Web 程序开发基本都是同步的，因为执行一段程序才能执行下一段，类似电话中的通话，一个电话接完才能接听下个电话；而异步可以同时执行多条任务，感觉有多条线路，类似于短信，不会因为看一条短信而停止接受另一条短信。Ajax 也可以使用同步模式执行，但同步的模式属于阻塞模式，这样会导致多条线路执行时又必须一条一条执行，会让 Web 页面出现假死状态，所以，一般 Ajax 大部分采用异步模式。<br/><br/>
> 新建 /1.html文件
> ```html
> <div title="属性节点" class="text-danger">测试Div</div>
> <div class="text-success">我在1.html</div>
> ```
> ```javascript
> <div id="box" >
>    <span class="text-success">异步加载json</span>
>    <span class="text-dark">异步加载html</span> 
>    <span class="text-danger">$.get方法</span>
>    <span class="text-info">$.post方法</span>   
> </div>
> <div id="pox" class="bg-light"></div>
> $(function(){
>     //加载json
>     $('#box .text-success').click(function(){
>        $('#pox').load('./demo.json')
>     });
>     //加载html
>     // $('#box .text-dark').click(function(){
>     //     $('#pox').load('./1.html')
>     // });
>     //筛选加载的html，只需要在 url 参数后面跟着一个选择器即可
>     $('#box .text-dark').click(function(){
>         $('#pox').load('./1.html .text-success')
>     });
>  });
> ```

### ② $.get()和$.post()方法：是全局方法，无须指定某个元素，适合传递参数到服务器请求数据
> $.get()和$.post()是全局方法，无须指定某个元素。对于用途而言，适合传递参数到服务器请求数据。
> ```javascript
> $(function(){
>     //$.get方法：get请求
>     $('#box .text-danger').click(function(){
>         //参数：url地址，额外参数(条件)data，回调函数fn，[服务器返回的内容格式type，一般默认不填程序会自动判断]
>         //内容格式:包括 xml、html、script、json、jsonp 和 text
>         //第一个参数必填，后面的选填
>         // $.get('./demo.json',{
>         //     username:'123',
>         //     sex:'女'
>         // },function(response, status, xhr){
>         //     //response 服务器返回的响应结果
>         //     //status:响应的 HTTP 状态,success 获取 error
>         //     //xhr: 都知道XMLHttpRequest对象
>         //     console.log('response:',response);
>         //     console.log('response类型:',typeof response);
>         //     console.log('status:',status);
>         //     console.log('xhr:',xhr);
>         // },'json');
> 
>         $.get('./demo.json',function(response, status, xhr){
>             console.log('response:',response);
>             console.log('response类型:',typeof response);
>             console.log('status:',status);
>         });
> 
>     });
>  });
> ```
> ```javascript
> $(function(){
>     //$.post方法：post请求
>     $('#box .text-info').click(function(){
>         //参数：url地址，额外参数(条件)data，回调函数fn，[服务器返回的内容格式type，一般默认不填程序会自动判断]
>         //内容格式:包括 xml、html、script、json、jsonp 和 text
>         //第一个参数必填，后面的选填
>         // $.post('./demo.json',{
>         //     username:'123',
>         //     sex:'女'
>         // },function(response, status, xhr){
>         //     //response 服务器返回的响应结果
>         //     //status:响应的 HTTP 状态,success 获取 error
>         //     //xhr: 都知道XMLHttpRequest对象
>         //     console.log('response:',response);
>         //     console.log('response类型:',typeof response);
>         //     console.log('status:',status);
>         //     console.log('xhr:',xhr);
>         // },'json');
> 
>         $.post('./demo.json',function(response, status, xhr){
>             console.log('response:',response);
>             console.log('response类型:',typeof response);
>             console.log('status:',status);
>         });
> 
>     });
>  });
> ```

## 2、最高层封装：$.getJSON() 和 $.getScript()
> jQuery 提供了一组用于特定异步加载的方法：`$.getScript()`，用于加载特定的接口或者 JS 文件；`$.getJSON()`，用于专门加载 JSON 文件。
### ① $.getJSON()方法：专门用于加载 JSON 文件的
> $.getJSON()方法是专门用于加载 JSON 文件的
> ```javascript
> $(function(){
>     //$.getJSON()方法是专门用于加载 JSON 文件的
>     //和 $.get()方法，$.post()方法用法类似，但是没有第四个参数，安全性相对高点
>     $.getJSON('./demo.json',{
>         username:123,
>         sex:'女'
>     },function(response, status, xhr){
>         console.log('response:',response);
>         console.log('status:',status);
>         console.log('xhr:',xhr);
>     });
> });
> ```
### ② $.getScript()方法：按需加载接口或js文件
1、比如说：客户在提交留言的时候，我想知道客户所在的城市用来甄别他的留言请求真伪，他不提交留言我也懒得知道他在哪`（因为这个免费接口每天有访问次数限制，以免浪费次数）`，这个时候就可以考虑按需加载接口 <br/>
> ① 获取所在城市接口：<a href="https://whois.pconline.com.cn/ipJson.jsp" target="_blank">https://whois.pconline.com.cn/ipJson.jsp</a> <a href="https://whois.pconline.com.cn/" target="_blank" style="margin-left:20px">[接口具体介绍]</a>  <br/>
> ② 搜狐提供的免费接口获取所在城市（时灵时不灵）<a href="http://pv.sohu.com/cityjson" target="_blank">http://pv.sohu.com/cityjson</a>  <br/>
> ③ 淘宝获取ip: <a href="https://www.taobao.com/help/getip.php" target="_blank">https://www.taobao.com/help/getip.php</a>  <br/>
`特别说明：上面的接口只是作为演示用，讲解一下$.getScript()方法按需加载逻辑而已，若真有这方面的需求，可以采用百度、腾讯、高德地图给我们提供的定位服务，后面的课程有关于这方面知识的讲解，大家不用着急。`
> ```javascript
> $.getScript('http://pv.sohu.com/cityjson',function(){
>    //回调函数获取接口返回结果，本接口返回的结果是：
>    //var returnCitySN = {"cip": "xxx.xx.xx.x", "cid": "00", "cname": "未知"};
>    //这个结果 returnCitySN 通过var声明，说明是全局变量，属于window的属性，因此可以直接打印
>    console.log(returnCitySN);
>    console.log(returnCitySN.cname);
> });
> ```    
2、再比如说：基于jQuery的网页上，开发了一百个功能，需要用到一百个jQuery插件，那是不是要在网页head里面引入一百个插件呢？很明显很多功能，是需要用户操作在去实现这个功能，很多功能没必要一开始，页面一打开就全部引入这些插件，插件一开始全部引入，不仅影响页面性能，而且有可能插件之间产生方法的互斥等等可能，那么这个时候可以考虑按需引入插件js文件。<br/><br/>
`举个例子`，jQuery中有一款插件是生成网页二维码的：<a href="https://www.bootcdn.cn/jquery.qrcode/" target="_blank">jquery.qrcode</a> <a href="https://www.jianshu.com/p/f2bf33e0fcb2" target="_blank" style="margin-left:20px">[使用说明]</a>
> ```javascript
> <div id="box" >
>   <span class="text-warning">$.getScript方法</span>
> </div>
> <div id="pox" class="bg-light"></div>
> $(function(){ 
>     $('#box .text-warning').click(function(){
>         $.getScript('https://cdn.bootcdn.net/ajax/libs/jquery.qrcode/1.0/jquery.qrcode.min.js',function(){
>             //先加载二维码插件，在执行里面的方法
>             //render        绘制方式 canvas(绘制成一张图片) table(绘制成一个表格) 默认 canvas
>             //width         二维码宽度  默认 256
>             //height        二维码高度  默认 256
>             //correctLevel  容错等级    1(L),0(M),3(Q),2(H)    1 最低, 2 最高  默认为 2
>             //background    背景颜色    默认白色    #ffffff
>             //foreground    前景颜色    默认黑色    #000000
>             // 使用示例
>             $("#pox").qrcode({ 
>                 render: "table", //table方式 默认 canvas
>                 width: 200, //宽度 
>                 height:200, //高度 
>                 //background: "#eceadb",//背景颜色
>                 //foreground: "#444",//前景颜色
>                 text: "https://docs.51yrc.com/secondless/w-b/Ajax.html" //任意内容 
>             }); 
>         });
>     });
>  });
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