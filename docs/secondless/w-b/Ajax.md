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

## 3、最底层的封装：$.ajax()
> `$.ajax()`是jQuery封装的所有ajax方法中最底层的方法，所有其它方法都是基于`$.ajax()`方法的封装。这个方法只有一个参数，传递一个各个功能键值对的对象。<br/><br/>
> 简单点说：就是，`$.ajax()`可以替代上面讲的所有方法，因为上面讲的方法，都是在这个方法的基础上再次做的封装。

<p style="text-align:left">$.ajax()方法传递的对象参数表</p> 

|  参数                        |  类型                            |  说明                                                                          |   
|   :--:                      |   :--:                           |   :--:                                                                         | 
|  url                        |   String                         |   发送请求的地址                                                                |
|  type                       |   String                         |   请求方式：POST 或 GET，默认 GET                                               |
|  timeout                    |   Number                         |   设置请求超时的时间（毫秒）                                                     |
|  data                       |   Object 或 String               |   发送到服务器的数据，键值对字符串或对象                                          |
|  dataType                   |   String                         |   返回的数据类型，比如 html、xml、json 等                                        |
|  beforeSend                 |   Function                       |   发送请求前可修改 XMLHttpRequest 对象的函数                                     |
|  complete                   |   Function                       |   请求完成后调用的回调函数                                                       |
|  success                    |   Function                       |   请求成功后调用的回调函数                                                       |
|  error                      |   Function                       |   请求失败时调用的回调函数                                                       |
|  global                     |   Boolean                        |   默认为 true，表示是否触发全局 Ajax                                             |
|  cache                      |   Boolean                        |   设置浏览器缓存响应，默认为 true。如果 dataType类型为 script 或 jsonp 则为 false。|
|  content                    |   DOM                            |   指定某个元素为与这个请求相关的所有回调函数的上下文。                              |
|  contentType                |   String                         |   指定请求内容的类型 , 默认为 application/x-www-form-urlencoded。                |
|  async                      |   Boolean                        |   是否异步处理。默认为 true，false 为同步处理                                    |
|  processData                |   Boolean                        |   默认为 true，数据被处理为 URL 编码格式。如果为 false，则阻止将传入的数据处理为 URL 编码的格式。    |
|  dataFilter                 |   Function                       |   用来筛选响应数据的回调函数。                                                                   |
|  ifModified                 |   Boolean                        |   默认为 false，不进行头检测。如果为 true，进行头检测，当相应内容与上次请求改变时，请求被认为是成功的。|
|  jsonpCallback              |   String                         |   指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback。                                      |
|  username                   |   String                         |   在 HTTP 认证请求中使用的用户名                                                                 |
|  password                   |   String                         |   在 HTTP 认证请求中使用的密码                                                                  |
|  scriptCharset              |   String                         |   当远程和本地内容使用不同的字符集时，用来设置 script 和 jsonp 请求所使用的字符集。                  |
|  xhr                        |   Function                       |   用来提供 XHR 实例自定义实现的回调函数                                                           |
|  traditional                |   Boolean                        |   默认为 false，不使用传统风格的参数序列化。如为 true，则使用。                                     |
简单示例
> ```javascript
> //$.ajax()用法
> $.ajax({
>    type: 'POST', //这里可以换成 GET
>    url: './demo.json',
>    data: {
>       username:123,
>       sex:'女'
>    },
>    success: function (response, stutas, xhr) {
>       console.log(response)
>    }
> });
> ```
更详细的用法会在我们后面的实战案例里面给大家展示和讲解。

## 4、表单序列化
> ```html
> <form id="myForm" name="yourForm" class="my-5 flex justify-center">
>    <select name="usertype">
>       <option value="学生value">学生text</option>
>       <option value="老师value">老师text</option>
>       <option value="管理员value">管理员text</option>
>       <option>无</option>
>    </select>
>    <input type="radio" name="sex" value="男" > 男
>    <input type="radio" name="sex" value="女" checked="checked">  女
>    <input type="checkbox" name="loves" value="篮球" checked="checked"> 篮球
>    <input type="checkbox" name="loves" value="足球" checked="checked">  足球
>    <input type="checkbox" name="loves" value="乒乓球" >  乒乓球
>    账号：<input type="text" name="username" value="abc">
>    <!--<input id="sub"  type="submit" value="提交"  > -->
>    <input id="sub"  type="button" value="提交"  >
> </form>
> ```
### ① 常规形式的表单提交（表单提交数据）
> 注意：<br/>`直接按提交按钮，回顾前面的知识我们说过：form表单中的 `type="submit"`会自动进行表单数据的提交，采用的是GET方式提交，将提交数据放在网址的后面。`<br/>
> `我们可以采用阻止默认行为，或者将提交按钮类型改成 `type="button"` 通过点击事件提交。`
> ```javascript
> $('form input[type=button]').click(function(){
>    // console.log($('input:checked[name=loves]'));//集合
>    $.ajax({
>       type: 'POST', //表单提交我们采用post, get方式数据量小也可以
>       url: './xxx',//提交给服务器的接口地址，一般后端程序员给你一个接口（当然你可以自己写一个接口）
>       data: { // 搜索文档：表单提交数据，传递的是对象键值对参数object
>             username : $('input[name=username]').val(),
>             usertype : $(':selected')[0].value,
>             sex : $('input:checked[name=sex]')[0].value,
>             loves : function(){
>                let loves = $('input:checked[name=loves]');
>                let str = '';
>                for(let i=0;i<loves.length;i++){
>                   if(!str){
>                         str = loves[i].value;
>                   }else{
>                         str += ',' + loves[i].value;
>                   }
>                }
>                return str;
>             }
>       },
>       beforeSend:function(xhr){
>             // console.log(this);
>             $('form input[type=button]').val('提交中，请稍后...');
>       },
>       success: function (response, stutas, xhr) {
>             $('form input[type=button]').val('提交');
>             console.log(response)
>       }
>    });
> });
> ```
我们发现，如果表单字段多了的话，处理起来非常麻烦

### ② jQuery中的表单序列化提交数据（表单提交数据）
> ```javascript
> $('form input[type=button]').click(function(){
>    // console.log($('input:checked[name=loves]'));//集合
>    $.ajax({
>       type: 'POST', //表单提交我们采用post , get方式数据量小也可以
>       url: './xxx',//提交给服务器的接口地址，一般后端程序员给你一个接口（当然你可以自己写一个接口）
>       data:$('form').serialize(),//表单序列化，以字符串的形式传递String
>       beforeSend:function(xhr){
>             // console.log(this);
>             $('form input[type=button]').val('提交中，请稍后...');
>       },
>       success: function (response, stutas, xhr) {
>             $('form input[type=button]').val('提交');
>             console.log(response)
>       }
>    });
> });
> ```
### ③ $.param()方法将对象转换为字符串键值对格式
> ```javascript
> $('form input[type=button]').click(function(){
>    // console.log($('input:checked[name=loves]'));//集合
>    $.ajax({
>       type: 'POST', //表单提交我们采用post , get方式数据量小也可以
>       url: './xxx',//提交给服务器的接口地址，一般后端程序员给你一个接口（当然你可以自己写一个接口）
>       //data:$('form').serialize(),//表单序列化
>       /*
>       data: { // 传递的是对象键值对参数object
>             username : $('input[name=username]').val(),
>             usertype : $(':selected')[0].value,
>             sex : $('input:checked[name=sex]')[0].value,
>             loves : function(){
>                let loves = $('input:checked[name=loves]');
>                let str = '';
>                for(let i=0;i<loves.length;i++){
>                   if(!str){
>                         str = loves[i].value;
>                   }else{
>                         str += ',' + loves[i].value;
>                   }
>                }
>                return str;
>             }
>       },
>       */
>       //使用$.param()将对象形式的键值对转为 URL 地址的字符串键值对，可以更加稳定准确的传递表单内容
>       data:$.param({ 
>             username : $('input[name=username]').val(),
>             usertype : $(':selected')[0].value,
>             sex : $('input:checked[name=sex]')[0].value,
>             loves : function(){
>                let loves = $('input:checked[name=loves]');
>                let str = '';
>                for(let i=0;i<loves.length;i++){
>                   if(!str){
>                         str = loves[i].value;
>                   }else{
>                         str += ',' + loves[i].value;
>                   }
>                }
>                return str;
>             }
>       }),
>       beforeSend:function(xhr){
>             // console.log(this);
>             $('form input[type=button]').val('提交中，请稍后...');
>       },
>       success: function (response, stutas, xhr) {
>             $('form input[type=button]').val('提交');
>          console.log(response)
>       }
>    });
>    //查看一下表单序列化得到的是什么
>    console.log($('form').serialize());//字符串形式的键值对，并对URL进行了编码
>    
>    //当传递的data是对象键值对传递的时候，键值对过多，有时程序对于复杂的序列化解析能力有限
>    //此时可以提前对对象键值对序列化
>    //使用$.param()将对象形式的键值对转为 URL 地址的字符串键值对，可以更加稳定准确的传递表单内容
> });
> ```

## 5、jQuery中的跨域jsonp
### ① jQuery中的跨域jsonp使用
> 关于什么是跨域，我们后面课程会给大家讲解。
> ```javascript
> //初略理解跨域：当前服务器域名和你访问的服务器域名不同（更多理解后面会讲）
> //远程另外一台服务器
> $.ajax({
>    url:'https://www.taobao.com/help/getip.php',
>    type:'get',
>    dataType:'jsonp',//处理跨域问题
>    jsonpCallback:'ipCallback',//根据另外一台服务器回调的名字确定（没有则不填）
>    success:function(response){
>       console.log(response);
>    }
> });
> //1、远程另外一台服务器公开的api接口
> //2、处理域名不一致问题，可用jsonp尝试
> ```
### ② 延伸一下：jQuery中的跨域jsonp模拟百度搜索提示数据
> ```html
> <div id="jsonp" style="margin-left: 100px;">
>    <input type="text" style="width: 500px;height: 50px;" >
>    <ul id="response"></ul>
> </div>
> ```
> ```javascript
> //常用参数
> // $.ajax({
> //     url:'',//请求地址
> //     datatype:'jsonp',//发送jsonp请求必须指定数据类型为jsonp
> //     jsonp:'参数名',//服务器接收回调函数的参数名如callback ,cb等等默认callback
> //     jsonpCallback:'回调函数名',//默认jQuery123545_43456。。。。的随机字符串，可以自定义
> //     success:function(){}
> // });
> //模拟一下百度搜索输入关键词提示效果
> //看一下请求地址：https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&
> //sugsid=39676,39712,39764,39779,39790,39703,39795,39688,39662,39678,39817,39664,39784,39840&
> //wd=jquery%20&his=%5B%7B%22time%22%3A1701315176%2C%22kw%22%3A%22%24.> > ajax%20beforesend%22%2C%22fq%22%3A2%7D%2C%7B%22time%22%3A1701326047%2C%22kw%22%3A%22jq%20datatype%3A%27jsonp%27%22%2C%22fq%22%3A2%7D%2C%7B%22time%22%3A1701328395%2C%22kw%22%3A%22%E7%BE%8E%E5%A5%B3%22%2C%22fq%22%3A4%7D%2C%7B%22time%22%3A1701328453%2C%22kw%22%3A%22jquery%22%2C%22fq%22%3A2%7D%5D&req=2&bs=jquery&pbs=jquery&csor=7
> //&pwd=jquery&cb=jQuery1102013659887251776048_1701328381053&_=1701328381078
> //我们只需提取有用的参数 wd对应搜索的值，cb对应回调函数的名称基于这两个参数就可以实现我们的功能 
> //压缩一下url地址 ---- https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc
> //于是可以：当键盘抬起时发送请求，并将请求的结果显示在输入框下面
> $('#jsonp input').keyup(function(){
>    // console.log($(this).val());
>    let word = $(this).val();
>    $.ajax({
>       url:'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc',//请求地址
>       data:{
>          wd:word
>       },
>       dataType:'jsonp',//发送jsonp请求必须指定数据类型为jsonp
>       jsonp:'cb',//服务器接收回调函数的参数名如callback ,cb等等默认callback
>       // jsonpCallback:'回调函数名',//默认jQuery123545_43456。。。。的随机字符串，可以自定义
>       success:function(response, status, xhr){
>             // console.log('response:',response);
>             let data = response.g;
>             // console.log(data);
>             let str = '';
>             $.each(data,function(index,value){
>                str += "<li>"+value.q+"</li>"
>             });
>             $('#response').html(str);
>       }
>       
>    });
> });
> ```

## 6、 jqXHR 对象: when()方法、done()方法、always()方法和fail()方法
> ```javascript
> //它是原生对象 XHR 的一个超集
> //jqXHR就是$.ajax()返回的对象
> let jqXHR = $.ajax({
>    url:'./demo.json',
>    type:'post',
>    // success:function(){}, //外面连缀用done()
>    // error:function(){},//外面连缀用fail()
>    // complete:function(){},//外面连缀用always()
> });
> console.log(jqXHR);
> jqXHR.done(function(response){
>    console.log('response',response  + '第一次');
> }).done(function(response){
>    console.log('response2',response + '第二次');
> });
> 
> //另外，方便同时执行多个成功后的回调函数
> let jqXHR2 = $.ajax({
>    url:'https://www.taobao.com/help/getip.php',
>    dataType:'jsonp',
>    jsonpCallback:'ipCallback',
> });
> //when可以理解成当两个jqXHR, jqXHR2都执行请求之后，在处理后面
> //意思是可以同时处理两个或者多个jqXHR对象
> $.when(jqXHR, jqXHR2).done(function (r1,r2) {
>    console.log('第一个ajax的response',r1)
>    console.log('第二个ajax的response',r2)
> });
> ```

总结：<br/><br/>
以上就是本章节关于Ajax请求服务器的基本知识了，通过对以上方法的学习，大家需要大体理解ajax请求服务器数据的流程，更多关于ajax方法的知识，我们会在后面实战中跟大家讲解。<br/><br/>
`在本章节最后，有同学提出疑问，说老师，我们向服务器提交表单数据，需要后端程序员给我接口，或者我自己写接口，那接口我不会写啊！另外，在我们的印象中，后端程序一般用的语言非常复杂，比如：php、java、c#、Asp.net、Jsp、Python、Perl、Ruby等等，用它们这些语言来处理前端的请求，这些语言好难，有没有我们前端不需要学这些语言，一样可以处理服务器请求的呢？`<br/><br/>
答案是：有的。就是我们的 `Node.js`，它可以像我们后端的这些语言一样，帮我们处理复杂的服务器请求，我们将在下一章节，给大家讲node的基础知识。




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
### [章节7.Node.js基础](/secondless/w-b/Node.js '章节7.Node.js基础')
####  <a href="/secondless/w-b/Node.js.html#一、node环境搭建-安装node-js" style="margin-left:40px;">一、Node环境搭建（安装node.js）</a>
####  <a href="/secondless/w-b/Node.js.html#_1、-下载安装node-js" style="margin-left:70px;">1、 下载安装node.js</a>
####  <a href="/secondless/w-b/Node.js.html#_2、-检查node-js是否安装成功" style="margin-left:70px;">2、 检查node.js是否安装成功</a>
#####  <a href="/secondless/w-b/Node.js.html#_1-命令行-node-v-npm-v-npx-v" style="margin-left:100px;">① 命令行：node -v npm -v npx -v</a>
#####  <a href="/secondless/w-b/Node.js.html#_2-命令行-node-运行js代码" style="margin-left:100px;">② 命令行：node 运行js代码</a>
#####  <a href="/secondless/w-b/Node.js.html#_3-命令行-运行js文件代码-清屏命令-cls" style="margin-left:100px;">③ 命令行：运行js文件代码，清屏命令: cls</a>
####  <a href="/secondless/w-b/Node.js.html#二、nvm-node版本管理工具-切换node版本" style="margin-left:40px;">二、NVM（node版本管理工具，切换node版本）</a>
####  <a href="/secondless/w-b/Node.js.html#_1、-下载安装nvm" style="margin-left:70px;">1、 下载安装nvm</a>
####  <a href="/secondless/w-b/Node.js.html#_2、检查nvm是否安装成功-nvm-v" style="margin-left:70px;">2、检查nvm是否安装成功：nvm -v</a>
####  <a href="/secondless/w-b/Node.js.html#_3、设置nodejs、npm下载源-可选" style="margin-left:70px;">3、设置nodejs、npm下载源（可选）</a>
####  <a href="/secondless/w-b/Node.js.html#_4、使用nvm包管理器" style="margin-left:70px;">4、使用NVM包管理器</a>
####  <a href="/secondless/w-b/Node.js.html#三、npm包管理-npm包管理工具" style="margin-left:40px;">三、NPM包管理（npm包管理工具）</a>
####  <a href="/secondless/w-b/Node.js.html#_1-package-json-文件如何生成" style="margin-left:70px;">1、 package.json 文件如何生成</a>
####  <a href="/secondless/w-b/Node.js.html#_2-npm-npm-、-cnpm-cnpm" style="margin-left:70px;">2、 NPM (npm) 、 CNPM (cnpm)</a>
#####  <a href="/secondless/w-b/Node.js.html#i、-npm" style="margin-left:100px;">1、npm</a>
#####  <a href="/secondless/w-b/Node.js.html#ii、-cnpm-可选" style="margin-left:100px;">2、cnpm (可选)</a>
#####  <a href="/secondless/w-b/Node.js.html#_1-安装cnpm" style="margin-left:130px;">① 安装cnpm</a>
#####  <a href="/secondless/w-b/Node.js.html#_2-接下来就可以使用cnpm命令安装各个包、插件、模块等等" style="margin-left:130px;">② 接下来就可以使用cnpm命令安装各个包、插件、模块等等</a>
#####  <a href="/secondless/w-b/Node.js.html#_3-在vscode中运行命令" style="margin-left:130px;">③ 在vscode中运行命令</a>
#####  <a href="/secondless/w-b/Node.js.html#_4-npm-或-cnpm-常用命令" style="margin-left:130px;">④ npm 或 cnpm 常用命令</a>
####  <a href="/secondless/w-b/Node.js.html#四、node的模块" style="margin-left:40px;">四、Node的模块</a>
####  <a href="/secondless/w-b/Node.js.html#_1-全局模块-process为例" style="margin-left:70px;">1、全局模块 ：process为例</a>
####  <a href="/secondless/w-b/Node.js.html#_2-系统模块-path、fs模块为例" style="margin-left:70px;">2、系统模块 ： path、fs模块为例</a>
####  <a href="/secondless/w-b/Node.js.html#_3-自定义模块-exports、module输出、require引入" style="margin-left:70px;">3、 自定义模块： exports、module输出、require引入</a>
####  <a href="/secondless/w-b/Node.js.html#_4-重要系统模块-http模块-搭建网页服务器" style="margin-left:70px;">4、 重要系统模块：http模块，搭建网页服务器</a>
####  <a href="/secondless/w-b/Node.js.html#五、node中的数据交互-重要系统模块-url模块处理get请求-querystring模块处理post请求" style="margin-left:40px;">五、Node中的数据交互，重要系统模块：url模块处理get请求,querystring模块处理post请求</a>
####  <a href="/secondless/w-b/Node.js.html#_1-url模块处理get-get-请求-url-parse-url-true" style="margin-left:70px;">1、url模块处理GET（get）请求：url.parse(url,true)</a>
####  <a href="/secondless/w-b/Node.js.html#_2-querystring模块处理post-post-请求-querystring-parse" style="margin-left:70px;">2、querystring模块处理POST（post）请求：querystring.parse()</a>
####  <a href="/secondless/w-b/Node.js.html#六、nodejs项目监测文件变化-自动重启工具-nodemon" style="margin-left:40px;">六、nodejs项目监测文件变化，自动重启工具：Nodemon</a>
####  <a href="/secondless/w-b/Node.js.html#_1-安装nodemon" style="margin-left:70px;">1、安装nodemon</a>
####  <a href="/secondless/w-b/Node.js.html#_2-修改package-json-中的启动命令" style="margin-left:70px;">2、修改package.json 中的启动命令</a>
####  <a href="/secondless/w-b/Node.js.html#_3-配置nodemon-告诉它哪些文件需要修改后重启服务-可选项" style="margin-left:70px;">3、配置nodemon，告诉它哪些文件需要修改后重启服务（可选项）</a>
####  <a href="/secondless/w-b/Node.js.html#七、nrm-使用nrm管理npm下载源" style="margin-left:40px;">七、nrm (使用nrm管理npm下载源)</a>
####  <a href="/secondless/w-b/Node.js.html#_1-安装nrm" style="margin-left:70px;">1、安装nrm</a>
####  <a href="/secondless/w-b/Node.js.html#_2-nrm内置的命令函数" style="margin-left:70px;">2、nrm内置的命令函数</a>
####  <a href="/secondless/w-b/Node.js.html#_3-查看当前正在使用的-npm-镜像源" style="margin-left:70px;">3、查看当前正在使用的 npm 镜像源</a>
####  <a href="/secondless/w-b/Node.js.html#_4-切换-npm-镜像源" style="margin-left:70px;">4、切换 npm 镜像源</a>
####  <a href="/secondless/w-b/Node.js.html#八、系统模块-fs模块详解" style="margin-left:40px;">八、系统模块：fs模块详解</a>
####  <a href="/secondless/w-b/Node.js.html#_1-读取文件-异步readfile、同步readfilesync、promise操作" style="margin-left:70px;">1、读取文件： 异步readFile、同步readFileSync、promise操作</a>
####  <a href="/secondless/w-b/Node.js.html#_2-可读流模式-createreadstream-方法" style="margin-left:70px;">2、可读流模式：createReadStream()方法</a>
####  <a href="/secondless/w-b/Node.js.html#_3-创建文件夹-mkdirsync-mkdir" style="margin-left:70px;">3、创建文件夹：mkdirSync , mkdir</a>
####  <a href="/secondless/w-b/Node.js.html#_4-删除文件夹-rmsync-rm" style="margin-left:70px;">4、删除文件夹：rmSync , rm</a>
####  <a href="/secondless/w-b/Node.js.html#_5-重命名文件-renamesync-rename" style="margin-left:70px;">5、重命名文件：renameSync , rename</a>
####  <a href="/secondless/w-b/Node.js.html#_6-监听文件变化-watch" style="margin-left:70px;">6、监听文件变化: watch</a>
####  <a href="/secondless/w-b/Node.js.html#_7-写入文件-writefile、writefilesync-追加写入文件-appendfile、appendfilesync" style="margin-left:70px;">7、写入文件：writeFile、writeFileSync，追加写入文件：appendFile、appendFileSync</a>
####  <a href="/secondless/w-b/Node.js.html#_8-写入文件-创建可写流-createwritestream" style="margin-left:70px;">8、写入文件：创建可写流 createWriteStream()</a>
####  <a href="/secondless/w-b/Node.js.html#_9-软链接symlinksync、symlink-硬链接linksync、link" style="margin-left:70px;">9、软链接symlinkSync、symlink 硬链接linkSync、link</a>
####  <a href="/secondless/w-b/nodejs+jQuery开发留言板.html" style="margin-left:40px;" target="_blank">九、node.js + jQuery完成：网页 “联系我们” 页面的留言板功能</a>
####  <a href="/secondless/w-b/Node.js.html#十、系统模块-crypto模块详解-加密-对称加密、非对称加密、哈希函数" style="margin-left:40px;">十、系统模块：crypto模块详解（加密：对称加密、非对称加密、哈希函数）</a>
####  <a href="/secondless/w-b/Node.js.html#_1-对称加密" style="margin-left:70px;">1、对称加密、封装加密函数</a>
####  <a href="/secondless/w-b/Node.js.html#_2-非对称加密" style="margin-left:70px;">2、非对称加密</a>
####  <a href="/secondless/w-b/Node.js.html#_3-哈希函数加密" style="margin-left:70px;">3、哈希函数加密</a>
####  <a href="/secondless/w-b/nodejs服务器端app.js文件.html" style="margin-left:70px;" target="_blank">4、对留言板的手机号做一个加密</a>
### [章节8.正则表达式](/secondless/w-b/正则表达式 '章节8.正则表达式')
####  <a href="/secondless/w-b/正则表达式.html#一、创建正则表达式" style="margin-left:40px;">一、创建正则表达式</a>
####  <a href="/secondless/w-b/正则表达式.html#_1-new运算符创建正则表达式" style="margin-left:70px;">① new运算符创建正则表达式</a>
####  <a href="/secondless/w-b/正则表达式.html#_2-字面量方式创建正则表达式" style="margin-left:70px;">② 字面量方式创建正则表达式</a>
####  <a href="/secondless/w-b/正则表达式.html#二、测试正则表达式" style="margin-left:40px;">二、测试正则表达式</a>
####  <a href="/secondless/w-b/正则表达式.html#_1-test方法-在字符串中测试模式匹配-返回-true-或-false" style="margin-left:70px;">① test方法：在字符串中测试模式匹配，返回 true 或 false</a>
####  <a href="/secondless/w-b/正则表达式.html#_2-exec方法-在字符串中执行匹配搜索-返回结果数组-执行失败-则返回-null" style="margin-left:70px;">② exec方法：在字符串中执行匹配搜索，返回结果数组，执行失败，则返回 null</a>
####  <a href="/secondless/w-b/正则表达式.html#三、字符串的正则表达式方法" style="margin-left:40px;">三、字符串的正则表达式方法</a>
####  <a href="/secondless/w-b/正则表达式.html#_1-match方法-就是一个查找的功能-获取匹配的字符串-返回数组或-null" style="margin-left:70px;">① match方法：就是一个查找的功能，获取匹配的字符串，返回数组或 null</a>
####  <a href="/secondless/w-b/正则表达式.html#_2-search方法-根据匹配的字符串-返回位置索引-从0开始" style="margin-left:70px;">② search方法：根据匹配的字符串，返回位置索引（从0开始）</a>
####  <a href="/secondless/w-b/正则表达式.html#_3-split方法-按照匹配模式-拆分成字符串数组" style="margin-left:70px;">③ split方法：按照匹配模式，拆分成字符串数组</a>
####  <a href="/secondless/w-b/正则表达式.html#_4-replace方法-替换匹配到的数据" style="margin-left:70px;">④ replace方法： 替换匹配到的数据</a>
####  <a href="/secondless/w-b/正则表达式.html#小案例-模拟百度搜索-搜索的关键字设置成红色" style="margin-left:70px;">小案例：模拟百度搜索，搜索的关键字设置成红色</a>
####  <a href="/secondless/w-b/正则表达式.html#四、正则表达式regexp对象的静态属性、实例属性-了解" style="margin-left:40px;">四、正则表达式RegExp对象的静态属性、实例属性（了解）</a>
####  <a href="/secondless/w-b/正则表达式.html#_1、-静态属性" style="margin-left:70px;">1、 静态属性</a>
#####  <a href="/secondless/w-b/正则表达式.html#_1-属性-input-短名-当前被匹配的字符串" style="margin-left:100px;">① 属性：input，短名：$_ ， 当前被匹配的字符串</a>
#####  <a href="/secondless/w-b/正则表达式.html#_2-属性-leftcontext-短名-最后一次匹配前的子串" style="margin-left:100px;">② 属性：leftContext，短名：$` ， 最后一次匹配前的子串</a>
#####  <a href="/secondless/w-b/正则表达式.html#_3-属性-rightcontext-短名-在上次匹配之后的子串" style="margin-left:100px;">③ 属性：rightContext，短名：$' ， 在上次匹配之后的子串</a>
#####  <a href="/secondless/w-b/正则表达式.html#_4-属性-lastmatch-短名-最后一个匹配字符串" style="margin-left:100px;">④ 属性：lastMatch，短名：$& ， 最后一个匹配字符串</a>
#####  <a href="/secondless/w-b/正则表达式.html#_5-属性-lastparen-短名-最后一对圆括号内的匹配子串" style="margin-left:100px;">⑤ 属性：lastParen，短名：$+ ， 最后一对圆括号内的匹配子串</a>
####  <a href="/secondless/w-b/正则表达式.html#_2、-实例属性" style="margin-left:70px;">2、 实例属性</a>
####  <a href="/secondless/w-b/正则表达式.html#五、正则表达式元字符-包含特殊含义的字符" style="margin-left:40px;">五、正则表达式元字符（包含特殊含义的字符）</a>
####  <a href="/secondless/w-b/正则表达式.html#一、-单个字符和数字、重复字符" style="margin-left:70px;">一、 单个字符和数字、重复字符</a>
####  <a href="/secondless/w-b/正则表达式.html#_1、-点符号匹配除了换行符-n-外的任意字符" style="margin-left:100px;">1、 点符号匹配除了换行符（\n）外的任意字符</a>
####  <a href="/secondless/w-b/正则表达式.html#_2、-点符号和重复字符配合使用" style="margin-left:100px;">2、 点符号和重复字符配合使用</a>
#####  <a href="/secondless/w-b/正则表达式.html#_1-重复字符-x-表示-匹配-0-个或-1-个-x-x可以换成任意字符" style="margin-left:120px;">① 重复字符：x?，表示：匹配 0 个或 1 个 x （x可以换成任意字符）</a>
#####  <a href="/secondless/w-b/正则表达式.html#_2-重复字符-x-表示-匹配-0-个或-1-个-或者任意多个-x-x可以换成任意字符" style="margin-left:120px;">② 重复字符：x*，表示：匹配 0 个或 1 个 或者任意多个 x （x可以换成任意字符）</a>
#####  <a href="/secondless/w-b/正则表达式.html#_3-重复字符-x-表示-匹配-至少1个-或者任意多个-x-x可以换成任意字符" style="margin-left:120px;">③ 重复字符：x+，表示：匹配 至少1个 或者任意多个 x （x可以换成任意字符）</a>
#####  <a href="/secondless/w-b/正则表达式.html#_4-重复字符-x-m-n-表示-匹配最少-m-个、最多-n-个-x-x-m-表示-只能有m个x-x-m-表示-有m个x或者以上个x-x可以换成任意字符" style="margin-left:120px;">④ 重复字符：x{m,n}，表示：匹配最少 m 个、最多 n 个 x， x{m}表示：只能有m个x， x{m,}表示：有m个x或者以上个x （x可以换成任意字符）</a>
#####  <a href="/secondless/w-b/正则表达式.html#_5-重复字符-xyz-表示-匹配至少一个-xyz-括号可以看成分组-分组里面的元素可以是任意多个字符" style="margin-left:120px;">⑤ 重复字符：(xyz)+，表示：匹配至少一个(xyz)，括号可以看成分组，分组里面的元素可以是任意多个字符</a>
#####  <a href="/secondless/w-b/正则表达式.html#_6-任意一个匹配-a-z-匹配26个小写字母任意一个-a-z-匹配26个大写字母任意一个-0-9-匹配0到9的数字任意一个-a-za-z0-9-匹配混合字母和数字中的任意一个" style="margin-left:120px;">⑥ 任意一个匹配：[a-z]匹配26个小写字母任意一个，[A-Z]匹配26个大写字母任意一个，[0-9]匹配0到9的数字任意一个，[a-zA-Z0-9]匹配混合字母和数字中的任意一个</a>
#####  <a href="/secondless/w-b/正则表达式.html#_7-任意一个不匹配-a-z-不匹配26个小写字母-a-z-不匹配26个大写字母-0-9-不匹配0到9的数字-a-za-z0-9-不匹配混合字母和数字" style="margin-left:120px;">⑦ 任意一个不匹配：[^a-z]不匹配26个小写字母，[^A-Z]不匹配26个大写字母，[^0-9]不匹配0到9的数字，[^a-zA-Z0-9]不匹配混合字母和数字</a>
####  <a href="/secondless/w-b/正则表达式.html#_3、字符类-锚字符" style="margin-left:100px;">3、字符类：锚字符</a>
#####  <a href="/secondless/w-b/正则表达式.html#_1-锚字符-表示-从行首开始匹配" style="margin-left:120px;">① 锚字符：^ ， 表示：从行首开始匹配</a>
#####  <a href="/secondless/w-b/正则表达式.html#_2-锚字符-表示-从行尾开始匹配" style="margin-left:120px;">② 锚字符：$ ， 表示：从行尾开始匹配</a>
####  <a href="/secondless/w-b/正则表达式.html#_4、字符-d-匹配数字-和字符集合-0-9-相同-字符-d-匹配非数字-同-0-9-相同" style="margin-left:100px;">4、字符：\d ， 匹配数字，和字符集合 [0-9]相同，字符：\D ， 匹配非数字，同[^0-9]相同</a>
####  <a href="/secondless/w-b/正则表达式.html#_5、字符-w-匹配字母和数字及-和字符集合-a-za-z0-9-相同-字符-w-匹配非字母和数字及-同-a-za-z0-9-相同" style="margin-left:100px;">5、字符：\w ， 匹配字母和数字及_，和字符集合 [a-zA-Z0-9_]相同，字符：\W ， 匹配非字母和数字及_，同[^a-zA-Z0-9_]相同</a>
####  <a href="/secondless/w-b/正则表达式.html#二、空白字符" style="margin-left:70px;">二、空白字符</a>
####  <a href="/secondless/w-b/正则表达式.html#_1-字符-s-表示-匹配空白字符、空格、制表符和换行符" style="margin-left:100px;">① 字符：\s，表示：匹配空白字符、空格、制表符和换行符</a>
####  <a href="/secondless/w-b/正则表达式.html#_2-字符-b-表示-到达边界" style="margin-left:100px;">② 字符：\b，表示：到达边界</a>
####  <a href="/secondless/w-b/正则表达式.html#三、选择字符-选择模式-匹配如-jpg-png-gif-非相等包含的意思" style="margin-left:70px;">三、选择字符（|）选择模式，匹配如：jpg|png|gif，非相等包含的意思</a>
####  <a href="/secondless/w-b/正则表达式.html#四、分组模式-做分组-1或-1匹配第一个分组中的内容-2或-2匹配第二个分组中的内容-依次类推" style="margin-left:70px;">四、分组模式：()做分组，\1或$1匹配第一个分组中的内容，\2或$2匹配第二个分组中的内容，依次类推</a>
####  <a href="/secondless/w-b/正则表达式.html#_1-分组模式-做分组" style="margin-left:100px;">① 分组模式：()做分组</a>
####  <a href="/secondless/w-b/正则表达式.html#_2-1可以获取到第一个分组内容" style="margin-left:100px;">② $1可以获取到第一个分组内容</a>
####  <a href="/secondless/w-b/正则表达式.html#_3-小案例-1获取到第一个分组内容-并做替换" style="margin-left:100px;">③ 小案例：$1获取到第一个分组内容，并做替换</a>
####  <a href="/secondless/w-b/正则表达式.html#_4-小案例-获取多个分组内容-进行替换" style="margin-left:100px;">④ 小案例：获取多个分组内容，进行替换</a>
####  <a href="/secondless/w-b/正则表达式.html#六、正则表达式-贪婪和惰性" style="margin-left:40px;">六、正则表达式：贪婪和惰性</a>
####  <a href="/secondless/w-b/正则表达式.html#七、正则表达式使用-exec-返回数组" style="margin-left:40px;">七、正则表达式使用 exec 返回数组</a>
####  <a href="/secondless/w-b/正则表达式.html#八、捕获性分组和非捕获性分组" style="margin-left:40px;">八、捕获性分组和非捕获性分组</a>
####  <a href="/secondless/w-b/正则表达式.html#九、分组嵌套、前瞻捕获、特殊字符匹配、换行模式" style="margin-left:40px;">九、分组嵌套、前瞻捕获、特殊字符匹配、换行模式</a>
####  <a href="/secondless/w-b/正则表达式.html#十、书写常用正则表达式" style="margin-left:40px;">十、书写常用正则表达式</a>
####  <a href="/secondless/w-b/正则表达式.html#_1-手机号正则" style="margin-left:70px;">① 手机号正则</a>
####  <a href="/secondless/w-b/正则表达式.html#_2-邮政编码正则" style="margin-left:70px;">② 邮政编码正则</a>
####  <a href="/secondless/w-b/正则表达式.html#_3-简单的电子邮件正则" style="margin-left:70px;">③ 简单的电子邮件正则</a>
####  <a href="/secondless/w-b/正则表达式.html#_4-匹配图片格式" style="margin-left:70px;">④ 匹配图片格式</a>
####  <a href="/secondless/w-b/正则表达式.html#_5-删除多余空格" style="margin-left:70px;">⑤ 删除多余空格</a>
####  <a href="/secondless/w-b/正则表达式.html#_6-删除首尾的空格-中间的空格不删除" style="margin-left:70px;">⑥ 删除首尾的空格，中间的空格不删除</a>
####  <a href="/secondless/w-b/正则表达式.html#_7-延伸-将11位手机号中的4-7位号码换成" style="margin-left:70px;">⑦ 延伸：将11位手机号中的4-7位号码换成 *</a>
### [章节9.Vue.js基础](/secondless/w-b/Vue.js '章节9.Vue.js基础')
####  <a href="/secondless/w-b/Vue.js.html#一、课前准备" style="margin-left:40px;">一、课前准备：启动node服务器，引入vue.js</a>
####  <a href="/secondless/w-b/Vue.js.html#二、体验vue的数据响应式" style="margin-left:40px;">二、体验vue的数据响应式：① 配置项data中的数据响应式，及渲染到页面上的真实DOM效果、② 循环语句，事件处理体验、③ vuejs计算属性体验</a>
####  <a href="/secondless/w-b/Vue.js.html#三、理解vue的注入、虚拟dom及底层原理" style="margin-left:40px;">三、理解vue的注入、虚拟DOM及底层原理：vue实例成员的注入、虚拟DOM、虚拟DOM的底层原理</a>
####  <a href="/secondless/w-b/node.js+vue.js%20渲染企业网站.html" style="margin-left:40px;" target="_blank" title="四、案例：node.js + vue.js 渲染企业网站">四、案例：node.js + vue.js 渲染企业网站</a>
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
   <a href="https://study.163.com/course/courseMain.htm?courseId=1213794887&share=2&shareId=480000002289674" target="_blank" style="margin-left:20px;">[第4季学习视频]</a>
</b>