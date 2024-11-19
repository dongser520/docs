---
navbar: true
sidebar: auto
title: 章节18.数据Cookie、sessionStorage、localStorage、XML、JSON
---

前言 <br/>
> 本章节我们学习一下跟js相关的数据存储，数据文件。<br/>

需求 <br/>
> 随着页面越来越复杂，开发者急切的需要能够本地化存储的脚本功能，用于解决js数据在本地存储的问题，于是出现了一个方案解决这个问题，就是Cookie。cookie 的意图是：在本地的客户端的磁盘上以很小的文件
形式保存数据。

## Ⅰ、Cookie
> cookie 也叫 HTTP Cookie，最初是客户端与服务器端进行会话使用的。比如，会员登录，下次回访网站时无须重新登录了；或者是购物车，购买的商品没有及时付款，过两天发现购物车里还有之前的商品列表。我们说Cookie是在本地的客户端的磁盘上以很小的文件，那么我们如何通过js获取这个文件的内容呢？
### ① cookie 的组成
> ```javascript
> //cookie是document的一个属性，可以打印看一下
> console.log(document.cookie);
> 
> //写入cookie
> //cookie 由名(属性，键)/值对形式的文本组成：name=value。完整格式为：
> //name=value; [expires=date]; [path=path]; [domain=somewhere.com]; [secure]
> //中括号是可选，name=value 是必选。
> document.cookie = 'user=迪丽热巴';
> console.log(document.cookie);
> //发现还是空的,原因是谷歌浏览器需要将网页放到服务器上进行查看
> ```
> 
> 搭建本地网页服务器，查看课程视频 <br/>
### ② cookie编码和解码
> 为防止写入错误，需要对写入的Cookie内容进行编码和解码
> ```javascript
> //编码
> document.cookie = 'user=' + encodeURIComponent('迪丽热巴') ; //已经写入磁盘了
> // CTRL + F5 深度刷新页面
> console.log(document.cookie);// user=%E8%BF%AA%E4%B8%BD%E7%83%AD%E5%B7%B4
> 
> //解码
> console.log(decodeURIComponent(document.cookie));
> ```

### ③ cookie的失效时间
> ```javascript
> console.log(document.cookie); //不再写入也能获取了
> //关闭浏览器，在打开浏览器，页面则不能获取了，说明关闭浏览器后，cookie会被自动清理掉
> //那么如果想关闭浏览器，下次打开cookie还在，则涉及到cookie的失效时间的设置
> //cookie的完整格式设置：
> //document.cookie = name=value; [expires=date]; [path=path]; [domain=somewhere.com]; [secure]
> //document.cookie = 'user=值;expires=失效时间;path=路径访问;domain=域名访问;secure安全的https设置';
> //希望设置了cookie后，7天内有效（7天内任何时候打开浏览器都可以访问到这个cookie）
> let date = new Date(); //console.log(date);
> //7天后
> date.setDate(date.getDate() + 7);//console.log(date.setDate(date.getDate() + 7));
> //设置cookie及失效时间
> document.cookie = 'user=' + encodeURIComponent('迪丽热巴') + ';expires=' + date ;
> //即7天后这个时候，cookie才会失效
>
> //如何手动清理cookie？
> 
> ```
### ④ 手动清理cookie
> ```javascript
> //方法1：设置过期时间为当前时间之前，即可清理掉
> let date = new Date();
> date.setDate(date.getDate() - 1);
> document.cookie = 'user=' + encodeURIComponent('迪丽热巴') + ';expires=' + date ;
> //方法2：
> /*
> let date = new Date();
> date.setDate(date.getDate() + 7);
> document.cookie = 'user=' + encodeURIComponent('迪丽热巴') + ';expires=' + date ;
> */
> console.log(new Date(0));//Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)
> document.cookie = 'user=' + encodeURIComponent('迪丽热巴') + ';expires=' + new Date(0) ;
> ```

### ⑤ cookie路径访问
> 指定路径才可以访问
> ```javascript
> let date = new Date();
> date.setDate(date.getDate() + 7);
> document.cookie = 'user=' + encodeURIComponent('迪丽热巴') + ';expires=' + date + ';path=/demo/contact.html' ;
> ```

### ⑥ cookie限制域名访问
> ```javascript
> let date = new Date();
> date.setDate(date.getDate() + 7);
> document.cookie = 'user=' + encodeURIComponent('迪丽热巴') + ';expires=' + date + ';domain=php.com' ;
> //一般情况不设置，默认当前域名，如果定义了二级域名：test.php.com，就只能在二级域名访问，主域名和其他二级域名则不能访问
> ```
### ⑦ cookie指定访问协议 http https
> secure 安全设置，指明必须通过安全的通信通道来传输(HTTPS)才能获取 cookie
> ```javascript
> let date = new Date();
> date.setDate(date.getDate() + 7);
> document.cookie = 'user=' + encodeURIComponent('迪丽热巴') + ';expires=' + date + ';secure' ;
> ``` 

### ⑧ 封装cookie(创建，获取，删除)
> ```javascript
> //创建 cookie
> function setCookie(name, value, expires, path, domain, secure) {
>   let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
>   if (expires && typeof expires == 'number' && expires > 0) {
>     let date = new Date();
>     date.setDate(date.getDate() + expires);
>     cookieText += '; expires=' + date;
>   }
>   if (path) {
>     cookieText += '; path=' + path;
>   }
>   if (domain) {
>     cookieText += '; domain=' + domain;
>   }
>   if (secure) {
>     cookieText += '; secure';
>   }
>   document.cookie = cookieText;
> }
> 
> setCookie('user', '迪丽热巴');
> setCookie('email', '51yrc@gmail.com', 3);
> setCookie('phone', '13545585858', 7);
> 
> console.log(document.cookie);
> ``` 
> ```javascript
> //user=%E8%BF%AA%E4%B8%BD%E7%83%AD%E5%B7%B4; phone=13545585858; email=51yrc@gmail.com
> //获取 cookie
> function getCookie(name) {
>   let cookieName = encodeURIComponent(name) + '=';
>   //找到cookie名开始位置
>   let cookieStart = document.cookie.indexOf(cookieName);
>   let cookieValue = null;
>   //如果cookie名存在
>   if (cookieStart > -1) {
>     //存在分号的情况 user  phone 
>     let cookieEnd = document.cookie.indexOf(';', cookieStart);
>     //不存在分号，最后一个,结束位置就是cookie的长度了
>     if (cookieEnd == -1) {
>       cookieEnd = document.cookie.length;
>     }
>     cookieValue = decodeURIComponent(
>       //通过开始位置和结束位置，截取对应的cookie值
>       document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
>   }
>   return cookieValue;
> }
> 
> console.log(getCookie('phone'));
> console.log(getCookie('email'));
> console.log(getCookie('user'));
> ``` 
> ```javascript
> //删除 cookie
> function removeCookie(name) {
>   document.cookie = name + "= ; expires=" + new Date(0);
> }
> 
> removeCookie('phone');
> console.log(document.cookie);
> ``` 
说明：<br/>
1. cookie 虽然在持久保存客户端用户数据提供了方便，分担了服务器存储的负担，但是注意cookie 的最大大约为 4096 字节(4k)，为了更好的兼容性，一般不能超过 4095 字节即可（4k）。<br/>
2. cookie 存储在客户端的文本文件，所以特别重要和敏感的数据是不建议保存在cookie 的。比如银行卡号，用户密码等。<br/><br/>

那么知道了cookie只能存储4Kb的数据在本地，有没有其他方案，可以存储比较多的数据在本地呢？

## Ⅱ、sessionStorage、localStorage
> ```javascript
> //1. sessionStorage
> //setItem()方法存储
> sessionStorage.setItem('name', '迪丽热巴');
> console.log(sessionStorage.getItem('name'));
> //通过属性存储和获取
> sessionStorage.phone = 13545585858;
> console.log(sessionStorage.phone);
> //删除存储
> //sessionStorage.removeItem('name');
> ```
> ```javascript
> //2. localStorage
> //setItem()方法存储
> localStorage.setItem('name', '迪丽热巴');
> console.log(localStorage.getItem('name'));
> //通过属性存储和获取
> localStorage.phone = 13545585858;
> console.log(localStorage.phone);
> //删除存储
> //localStorage.removeItem('name');
> ```
说明：<br/>
1. 相同点：都是本地化存储，都可存储5M的数据，存储、删除用法一样，存储对象都转成字符串存储JSON.stringify(obj)
> ```javascript
> let user = {
>   name:'迪丽热巴',
>   age:33,
>   weight:'55kg',
>   sex:'女'
> }
> //存储
> localStorage.setItem('user', JSON.stringify(user));
> 
> //读取
> let _user = localStorage.getItem('user');
> console.log(_user.name);//undefined
> //先转成对象
> let $user = JSON.parse(localStorage.getItem('user'));
> console.log($user.name);//迪丽热巴
> 
> //移除
> localStorage.removeItem('user');
> ```
2. 不同点：sessionStorage关闭页面或浏览器后被清除，localStorage持久化存储，不手动清理就会一直存储着。

## Ⅲ、cookie 和 localStorage的对比
> 一、可允许的最大存储量 <br/>
> 1. localStorage的最大存储为5M。如果大于这个最大限制浏览器提示出错<br/>
> 2. cookie单个的最大存储为4k，如果大于4k，则存储失败，浏览器中找不到对应的cookie信息<br/>
> 
> 二、存储时间 <br/>
> 1. localStorage是持久化存储，除非主动清除掉 <br/>
> 2. cookie默认是会话级存储，可以设置过期时间 <br/>
> 
> 三、可操行 <br/>
> 1. localStorage只是存储数据 <br/>
> 2. cookie不仅仅只是存储数据，还有其他多个属性可供其操作设置：<br/>
>     domain与path一起决定了cookie的作用范围 <br/>
>     expires决定了过期时间 <br/>
>     secure如果设为true，那么cookie只能用https协议发送给服务器等 <br/>
> 
> 四、使用场景 <br/>
> 1. localStorage一般仅用作客户端的数据存储，如存储一个异步请求的结果数据，然后在页面重渲染时，可以直接读取storage中的数据，减少一次请求的发送 <br/>
> 2. cookie的使用场景一般是作为客户端与服务端的一种信息传递，当添加了cookie，默认的同源的cookie信息会自动作为请求头的一部分被发送到服务端 <br/>

我们会在后面的课程实际开发项目中，再给大家体验这三种存储方式的使用场景。

## Ⅳ、XML
前言
> 目前大家可以浅显的认为，XML可以认为是一个微型的结构化的小型数据库，我们数据库里面保存的是一张二维表，XML也算是一种小型的表格，来保存我们的数据，然后再通过我们的js来获取到它的数据，这个是我们目前需要的一些功能。
> ```javascript
> //跟我们的html一样，用标签将里面的值包裹起来
> //根标签
> <root>
>    <user>迪丽热巴</user>
>    <email>51yrc@gmail.com</email>
>    <phone>13545585858</phone>
> </root>
> ```
感兴趣了解
> IE9之前的浏览器创建XMLDOM 对象使用的是微软自带的MSXML 库，共有六个版本，微软推荐使用的是：1.MSXML2.DOMDocument.6.0 最可靠最新的版本，2.MSXML2.DOMDocument.3.0 兼容性较好的版本，3.MSXML2.DOMDocument 仅针对 IE5.5 之前的版本，这三个版本在不同的 windows 平台和浏览器下会有不同的支持，那么为了实现兼容，我们应该考虑这样操作：从 6.0->3.0->备用版本这条路线进行实现。感兴趣的同学自己看一下我们文档，现在这些已经没有意义了。
> ```javascript
> function createXMLDOM() {
>    var version = [
>         'MSXML2.DOMDocument.6.0',
>         'MSXML2.DOMDocument.3.0',
>         'MSXML2.DOMDocument'
>    ];
>    for (var i = 0; i < version.length; i ++) {
>        try {
>             var xmlDom = new ActiveXObject(version[i]);
>             return xmlDom;
>        } catch (e) {
>           //跳过
>        }
>     }
>     throw new Error('您的系统或浏览器不支持 MSXML！'); //循环后抛出错误
> }
> ```
### ① 创建 XMLDOM 对象（DOM2 级在 document.implementaion 中引入了 createDocument()方法）
> ```javascript
> console.log(document.implementation);
> //创建 XMLDOM 对象
> //三个参数：命名空间，根标签名，文档声明（用不到）
> let xmlDom = document.implementation.createDocument('','root',null); //创建 xmlDom
> console.log(xmlDom);
> //按照传统DOM方法创建元素节点
> let user = xmlDom.createElement('user'); //创建 user 元素
> xmlDom.getElementsByTagName('root')[0].appendChild(user); //添加到 root 下
> let value = xmlDom.createTextNode('迪丽热巴'); //创建文本
> xmlDom.getElementsByTagName('user')[0].appendChild(value); //添加到 user 下
> console.log(xmlDom);
> 
> //上面的创建很繁琐，我们看一下第二种方法创建
> ```

### ② 创建 XMLDOM 对象（DOMParser类型来创建，XMLSerializer类型进行序列化成字符串）
> ```javascript
> let xmlParser = new DOMParser(); //创建 DOMParser 对象
> let xmlStr = '<root><user>迪丽热巴</user></root>'; //XML 字符串
> let xmlDom = xmlParser.parseFromString(xmlStr, 'text/xml'); //创建 XML DOM 对象
> console.log(xmlDom);
> 
> console.log(xmlDom.getElementsByTagName('user')[0].tagName); //获取 user 元素标签名
> console.log(xmlDom.getElementsByTagName('user')[0].firstChild.nodeValue);//迪丽热巴
>
> //序列化成字符串
> let serializer = new XMLSerializer(); //创建 XMLSerializer 对象
> let xml = serializer.serializeToString(xmlDom); //序列化 XML
> console.log(xml);
> ```

### ③ 解析错误
> ```javascript
> let xmlParser = new DOMParser(); //创建 DOMParser 对象
> let xmlStr = '<root><user>迪丽热巴</user></root>'; //XML 字符串
> let xmlDom = xmlParser.parseFromString(xmlStr, 'text/xml'); //创建 XML DOM 对象
> console.log(xmlDom);
> 
> console.log(xmlDom.getElementsByTagName('user')[0].tagName); //获取 user 元素标签名
> console.log(xmlDom.getElementsByTagName('user')[0].firstChild.nodeValue);//迪丽热巴
> 
> //序列化成字符串
> let serializer = new XMLSerializer(); //创建 XMLSerializer 对象
> let xml = serializer.serializeToString(xmlDom); //序列化 XML
> console.log(xml);
> 
> //解析错误
> let errors = xmlDom.getElementsByTagName('parsererror');
> if (errors.length > 0) {
>     throw new Error('XML 格式有误：' + errors[0].textContent);
> }
> ```

### ④ 加载读取外部xml文件
> ```javascript
> //加载外部xml文件
> //创建XMLHttpRequest对象
> let xmlhttp = new XMLHttpRequest();
> //使用 open() 方法打开 XML 文件
> xmlhttp.open("GET", "./demo.xml", true);
> //设置 XMLHttpRequest 的 responseType 属性为 "document"，表示返回的数据类型是 XML 文档
> xmlhttp.responseType = "document";
> //使用 onload 事件处理程序处理返回的 XML 数据
> xmlhttp.onload = function() {
>    let xmlDoc = xmlhttp.responseXML;
>    // 在这里对 xmlDoc 进行处理
>    let user = xmlDoc.getElementsByTagName("user")[0].firstChild.nodeValue;
>    console.log(user);
> }
> //发送 XMLHttpRequest 请求
> xmlhttp.send();
> ```

### ⑤ XPath操作XML
> ```javascript
> <root>
>    <user>迪丽热巴</user>
>    <user>古力娜扎</user>
>    <email>51yrc@gmail.com</email>
>    <phone>13545585858</phone>
> </root>
> 
> let xmlhttp = new XMLHttpRequest();
> xmlhttp.open("GET", "./demo.xml", true);
> xmlhttp.responseType = "document";
> xmlhttp.onload = function() {
>    let xmlDoc = xmlhttp.responseXML;
>    xpath(xmlDoc);
> }
> xmlhttp.send();
> 
> //XPath操作xml
> function xpath(xmldata){
>    //console.log(xmldata);
>    //创建XPathResult对象
>    //1.使用 XPathEvaluator 对象创建 XPathResult
>    let eva = new XPathEvaluator();
>    //evaluate方法5个参数：1.XPath 路径、2.上下文节点对象、
>    //3.命名空间求解器(通常是 null)、4.返回结果类型、5 保存结果的 XPathResult对象(通常是 null)。
>    //返回类型：FIRST_ORDERED_NODE_TYPE，单一节点
>    //相同节点名使用下标，从1开始 'root/user[1]' 'root/user[2]'
>    let result = eva.evaluate('root/user[2]', xmldata, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
>    console.log(result);
>    if (result !== null) {
>      console.log(result.singleNodeValue);//singleNodeValue 属性得到节点对象
>      //console.log(result.singleNodeValue.tagName); 
>      console.log(result.singleNodeValue.textContent);
>    }
> 
>    //2.使用上下文节点对象创建 XPathResult(推荐)
>    let _result = xmldata.evaluate('root/user[1]', xmldata, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
>    if (_result !== null) {
>      console.log(_result.singleNodeValue);
>      //console.log(_result.singleNodeValue.tagName); 
>      console.log(_result.singleNodeValue.textContent);
>    }
>    //以上是单一节点获取方式，推荐第二种
> 
> 
>    //节点集合获取：参数4类型：ORDERED_NODE_ITERATOR_TYPE
>     let $result = xmldata.evaluate('root/user', xmldata, null,XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
>     console.log($result);
>     // console.log($result.iterateNext());//得到第一个节点，可以进行遍历，获取所有user节点
>     let nodes = [];
>     if ($result !== null) {
>       // while ((node = $result.iterateNext()) !== null) {
>       //   nodes.push(node);
>       // }
>       let node = $result.iterateNext();
>       while(node != null){
>          nodes.push(node);
>          node = $result.iterateNext();
>       }
>     }
>     console.log(nodes);// 两个user集合
>     console.log(nodes[1].textContent);
> }
> ```

### ⑥ 封装XPath操作xml文件
> ```javascript
> //单一节点
> function selectSingleNode(xmlDom, xpath) {
>   var node = null;
>   if (typeof xmlDom.evaluate != 'undefined') {
>     var patten = /\[(\d+)\]/g;
>     var flag = xpath.match(patten);
>     var num = 0;
>     if (flag !== null) {
>       num = parseInt(RegExp.$1) + 1;
>       xpath = xpath.replace(patten, '[' + num + ']');
>     }
>     var result = xmlDom.evaluate(xpath, xmlDom, null,
>       XPathResult.FIRST_ORDERED_NODE_TYPE, null);
>     if (result !== null) {
>       node = result.singleNodeValue;
>     }
>   } else if (typeof xmlDom.selectSingleNode != 'undefined') {
>     node = xmlDom.selectSingleNode(xpath);
>   }
>   return node;
> }
> 
> //节点集合
> function selectNodes(xmlDom, xpath) {
>   var nodes = [];
>   if (typeof xmlDom.evaluate != 'undefined') {
>     var patten = /\[(\d+)\]/g;
>     var flag = xpath.match(patten);
>     var num = 0;
>     if (flag !== null) {
>       num = parseInt(RegExp.$1) + 1;
>       xpath = xpath.replace(patten, '[' + num + ']');
>     }
>     var node = null;
>     var result = xmlDom.evaluate(xpath, xmlDom, null,
>       XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
>     if (result !== null) {
>       while ((node = result.iterateNext()) !== null) {
>         nodes.push(node);
>       }
>     }
>   } else if (typeof xmlDom.selectNodes != 'undefined') {
>     nodes = xmlDom.selectNodes(xpath);
>   }
>   return nodes;
> }
> 
> //获取外部xml
> let xmlhttp = new XMLHttpRequest();
> xmlhttp.open("GET", "./demo.xml", true);
> xmlhttp.responseType = "document";
> xmlhttp.onload = function() {
>    let xmlDoc = xmlhttp.responseXML;
>    //操作
>    //单一节点: 封装函数，节点从0算起来
>    let single = selectSingleNode(xmlDoc, 'root/user[1]');
>    console.log(single);
>    console.log(single.textContent);
>    //节点集合
>    let nodes = selectNodes(xmlDoc, 'root/user');
>    console.log(nodes);
>    console.log(nodes[0].textContent);
> }
> xmlhttp.send();
> ```

## Ⅴ、JSON
> JSON 和 XML 类型，都是一种结构化的数据表示方式。JSON 并不是JS独有的数据格式，其他很多语言都可以对 JSON 进行解析和序列化。因此json是一种用途非常广泛的数据类型。
### ① JSON 语法，可以表示三种类型的值
> 1.简单值：可以在 JSON 中表示字符串、数值、布尔值和 null。但 JSON 不支持 JavaScript中的特殊值 undefined。<br/>
> ```javascript
> 100
> '迪丽热巴'
> true
> null
> ```
> 2.对象 <br/>
> ```javascript
> //js对象字面量表示法：
> let box = {
>      name : '迪丽热巴',
>      age : 33
> };
> //JSON 中的对象表示法需要加上双引号，并且不存在赋值运算和分号：
> {
>     "name" : "迪丽热巴", //使用双引号，否则转换会出错
>     "age" : 33
> }
>
>
> '{"name" : "迪丽热巴","age" : 33}'
>  //json其实就是字符串，所以任何表示都应该加上字符串引号
> ```
> 
> 3.数组 <br/>
> ```javascript
> //js数组字面量表示法：普通数组
> let box = [33, '迪丽热巴', true];
> //JSON数组
> '[33,"迪丽热巴", true]'
> 
> //JSON对象和数组比普通对象和数组，少了分号，少了变量赋值，而且本身应该是字符串表示
> ```
> 
> 4.最常用的JSON结构（数组结合对象） <br/>
> ```javascript
> [
>     {
>         "name":"网站首页",
>         "href":"index.html",
>         "id":1,
>         "en_name":"index",
>         "active":true
>     },
>     {
>         "name":"资讯中心",
>         "href":"news.html",
>         "id":2,
>         "en_name":"news",
>         "active":false
>     },
>     {
>         "name":"工程案例",
>         "href":"case.html",
>         "id":3,
>         "en_name":"case",
>         "active":false
>     }
> ]
> //一般情况下，我们可以把 JSON 结构数据保存到一个文本文件里
> //然后通过XMLHttpRequest 对象去加载它，得到这串结构数据字符串
> //获取外部JSON，跟XML一样，创建XMLHttpRequest对象然后发送请求
> ```
### ② 获取外部json文件
> ```javascript
> let json = new XMLHttpRequest();
> json.open("GET", "./demo1.json", true);
> json.responseType = "json";
> json.onload = function() {
>   console.log(json);
>   console.log(json.response);
>   
>   console.log(this);
>   console.log(this.response);
> 
>   if(this.status == 200){
>     let res = this.response;
>     console.log(res[0].name);//第一项name值
>   
>     res.forEach(element => { 
>        console.log('name:',element.name);//每一项的name
>     });
>   }else{
>     console.log('请求失败');
>   }
>   
> }
> json.send();
>
> ```
> 很多时候，向服务器发送请求数据，服务器返回的不一定是json格式的数据，需要处理
> ```javascript
> let json = new XMLHttpRequest();
> json.open("GET", "./demo.json", true);
> json.responseType = "text";
> json.onload = function() {
>   // console.log(json);
>   // console.log(json.response);
>   
>   console.log(this);
>   console.log(this.response);
>   console.log(typeof this.response);//字符串
>   
>   
>   if(this.status == 200){
>     let res = this.response;
>     console.log(res[0].name);//字符串无法获取name
>   
>     //字符串没有forEach方法，导致获取里面的每一项失败
>     res.forEach(element => { 
>       console.log('name:',element.name);
>     });
>   }else{
>     console.log('请求失败');
>   }
>   
> }
> json.send();
> ```
> 那么，如何将json字符串转成数组对象\[json结构数据\]进行操作呢?

### ③ 解析json字符串（将json字符串转成数组对象——json结构数据）：JSON.parse()方法
> ```javascript
> let json = new XMLHttpRequest();
> json.open("GET", "./demo.json", true);
> json.responseType = "text";
> json.onload = function() {
>   // console.log(json);
>   // console.log(json.response);
>   
>   console.log(this);
>   console.log(this.response);
>   console.log(typeof this.response);//字符串
>   
>   
>   if(this.status == 200){
>     //JSON.parse()将json字符串转成数组对象（json结构数据）
>     let res = JSON.parse(this.response);
> 
>     console.log(typeof res);
> 
>     console.log(res);
> 
>     console.log(res[0].name);
> 
>     res.forEach(element => { 
>       console.log('name:',element.name);
>     });
>  
>      //第二个参数：匿名函数
>      let _res = JSON.parse(this.response,function(key,value){
>          if(key == 'name'){
>             return '我是' + value;
>          }else{
>             return value;
>          }
>      });
>      console.log(_res);
>  
>  
>   }else{
>     console.log('请求失败');
>   }
>   
> }
> json.send();
> ```

### ④ js原生值数组、对象转成json字符串--JSON.stringify()
> 我们讲<a href="/secondless/w-a/数据Cookie、XML、JSON.html#ii、sessionstorage、localstorage">sessionStorage、localStorage</a>提到过
> ```javascript
> let data = [
>   {
>       name:"网站首页",
>       href:"index.html",
>       id:1,
>       en_name:"index",
>       active:true
>   },
>   {
>       name:"资讯中心",
>       href:"news.html",
>       id:2,
>       en_name:"news",
>       active:false
>   },
>   {
>       name:"工程案例",
>       href:"case.html",
>       id:3,
>       en_name:"case",
>       active:false
>   }
> ];
> // console.log(data);
> // console.log(JSON.stringify(data));//字符串，且属性名（键）也加上双引号了
> // console.log(typeof JSON.stringify(data));
> 
> //第二个参数：指定生成的键（属性名）
> console.log(JSON.stringify(data,['name','en_name']));
> //第二个参数：写一个匿名函数
> let json = JSON.stringify(data,function(key,value){
>     if(key == 'name'){
>        return '我是' + value;
>     }else{
>       return value;
>     }
> });
> console.log(json);
> 
> //第三个参数：保留缩进增加可读性
> console.log(JSON.stringify(data,['name','en_name'],2));
> console.log(JSON.stringify(data,['name','en_name'],'-----'));
> 
> //第三个缩进需要，第二个不需要
> console.log(JSON.stringify(data,null,2));
> ```

### ⑤ toJSON
> ```javascript
> let data = [
>   {
>       name:"网站首页",
>       href:"index.html",
>       id:1,
>       en_name:"index",
>       active:true,
>       toJSON:function(){
>          return this.name;
>       }
>   },
>   {
>       name:"资讯中心",
>       href:"news.html",
>       id:2,
>       en_name:"news",
>       active:false,
>       toJSON:function(){
>          return this.name;
>       }
>   },
>   {
>       name:"工程案例",
>       href:"case.html",
>       id:3,
>       en_name:"case",
>       active:false,
>       toJSON:function(){
>         return this.name;
>       }
>   }
> ];
> // let json = JSON.stringify(data,null,2);
> // console.log(json);
> 
> let json1 = JSON.stringify(data,['name','en_name'],2);
> console.log(json1);
> 
> //说明 toJSON的优先级高于第二个参数，即：
> //首先先执行 toJSON()方法,如果应用了第二个过滤参数，则执行这个方法
> //然后执行序列化过程,比如将键值对组成合法的 JSON 字符串，比如加上双引号
> //最后如果提供了缩进，再执行缩进操作
> ```





















<br/><br/><br/><br/><br/><br/>

## 课程其它章节
### [章节1.课程介绍](/secondless/w-a '章节1.课程介绍')
<!-- <LessList  /> -->
### [章节2.javascript基础](/secondless/w-a/javascript基础 '章节2.javascript基础')
#### <a href="/secondless/w-a/javascript基础.html#_1、变量" style="margin-left:50px;">1、变量</a>
#### <a href="/secondless/w-a/javascript基础.html#_2、关键保留字" style="margin-left:50px;">2、关键保留字</a>
#### <a href="/secondless/w-a/javascript基础.html#_3、语法构成" style="margin-left:50px;">3、语法构成</a>
#### <a href="/secondless/w-a/javascript基础.html#_4、数据类型" style="margin-left:50px;">4、数据类型</a>
### [章节3.javascript运算符](/secondless/w-a/javascript运算符 '章节3.javascript运算符')
#### <a href="/secondless/w-a/javascript运算符.html#_1、一元运算符" style="margin-left:50px;">1、一元运算符</a>
#### <a href="/secondless/w-a/javascript运算符.html#_2、算术运算符" style="margin-left:50px;">2、算术运算符</a>
#### <a href="/secondless/w-a/javascript运算符.html#_3、赋值运算符" style="margin-left:50px;">3、赋值运算符</a>
#### <a href="/secondless/w-a/javascript运算符.html#_4、关系运算符" style="margin-left:50px;">4、关系运算符</a>
#### <a href="/secondless/w-a/javascript运算符.html#_5、逻辑运算符" style="margin-left:50px;">5、逻辑运算符</a>
#### <a href="/secondless/w-a/javascript运算符.html#_6、字符串、逗号、三元条件运算符" style="margin-left:50px;">6、字符串、逗号、三元条件运算符</a>
#### <a href="/secondless/w-a/javascript运算符.html#_7、运算符优先级" style="margin-left:50px;">7、运算符优先级</a>
### [章节4.流程控制语句](/secondless/w-a/流程控制语句 '章节4.流程控制语句')
#### <a href="/secondless/w-a/流程控制语句.html#_1、if语句" style="margin-left:50px;">1、if语句</a>
#### <a href="/secondless/w-a/流程控制语句.html#_2、switch-语句" style="margin-left:50px;">2、switch 语句</a>
#### <a href="/secondless/w-a/流程控制语句.html#_3、循环语句" style="margin-left:50px;">3、循环语句</a>
#### <a href="/secondless/w-a/流程控制语句.html#_4、for-in-语句-枚举对象的属性" style="margin-left:50px;">4、for...in 语句 枚举对象的属性</a>
#### <a href="/secondless/w-a/流程控制语句.html#_5、break-和-continue-语句-退出循环语句" style="margin-left:50px;">5、break 和 continue 语句 退出循环语句</a>
#### <a href="/secondless/w-a/流程控制语句.html#_6、with语句" style="margin-left:50px;">6、with语句</a>
### [章节5.javascript函数](/secondless/w-a/javascript函数 '章节5.javascript函数')
#### <a href="/secondless/w-a/javascript函数.html#_1、函数声明" style="margin-left:50px;">1、函数声明</a>
#### <a href="/secondless/w-a/javascript函数.html#_2、函数-return-返回值" style="margin-left:50px;">2、函数 return 返回值</a>
#### <a href="/secondless/w-a/javascript函数.html#_3、函数的arguments-对象" style="margin-left:50px;">3、函数的arguments 对象</a>
### [章节6.javascript对象](/secondless/w-a/javascript对象 '章节6.javascript对象')
#### <a href="/secondless/w-a/javascript对象.html#_1、创建对象" style="margin-left:50px;">1、创建对象</a>
#### <a href="/secondless/w-a/javascript对象.html#_2、对象属性输出、方法-函数-调用" style="margin-left:50px;">2、对象属性输出、方法（函数）调用</a>
#### <a href="/secondless/w-a/javascript对象.html#_3、对象中的方法及应用" style="margin-left:50px;">3、对象中的方法及应用</a>
### [章节7.javascript数组](/secondless/w-a/javascript数组 '章节7.javascript数组') 
#### <a href="/secondless/w-a/javascript数组.html#_1、创建及读取数组" style="margin-left:50px;">1、创建及读取数组</a>
#### <a href="/secondless/w-a/javascript数组.html#_2、数组中的属性和内置方法" style="margin-left:50px;">2、数组中的属性和内置方法：toLocaleString()、valueOf()和 toString()</a>
#### <a href="/secondless/w-a/javascript数组.html#_3、数组中的方法" style="margin-left:50px;">3、数组中的方法:join()、push()、pop()、shift()、unshift()、reverse()、sort()、concat()、slice()、splice()方法</a>
#### <a href="/secondless/w-a/javascript数组.html#_4、数组更多操作方法" style="margin-left:50px;">4、数组更多操作方法</a>
### [章节8.Date类型：时间和日期](/secondless/w-a/Date类型：时间和日期 '章节8.Date类型：时间和日期')
#### <a href="/secondless/w-a/Date类型：时间和日期.html#_1、date-类型" style="margin-left:50px;">1、Date 类型</a>
#### <a href="/secondless/w-a/Date类型：时间和日期.html#_2、格式化日期和时间" style="margin-left:50px;">2、格式化日期和时间</a>
### [章节9.Function类型：函数进阶](/secondless/w-a/Function类型：函数进阶 '章节9.Function类型：函数进阶')
#### <a href="/secondless/w-a/Function类型：函数进阶.html#_1、函数的声明" style="margin-left:50px;">1、函数的声明</a>
#### <a href="/secondless/w-a/Function类型：函数进阶.html#_2、作为值的函数" style="margin-left:50px;">2、作为值的函数</a>
#### <a href="/secondless/w-a/Function类型：函数进阶.html#_3、函数内部属性" style="margin-left:50px;">3、函数内部属性</a>
#### <a href="/secondless/w-a/Function类型：函数进阶.html#_4、函数的属性和方法" style="margin-left:50px;">4、函数的属性和方法</a>
### [章节10.内置对象：Global、Math对象，变量、作用域和内存问题](/secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题 '章节10.内置对象：Global、Math对象，变量、作用域和内存问题')
#### <a href="/secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html#_1、内置对象-global对象" style="margin-left:50px;">1、内置对象： Global对象</a>
#### <a href="/secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html#_2、内置对象-math-对象" style="margin-left:50px;">2、内置对象： Math 对象</a>
#### <a href="/secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html#_3、变量" style="margin-left:50px;">3、变量</a>
#### <a href="/secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html#_4、作用域-执行环境" style="margin-left:50px;">4、作用域（执行环境）</a>
#### <a href="/secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html#_5、-内存问题" style="margin-left:50px;">5、 内存问题</a>
### [章节11.匿名函数和闭包](/secondless/w-a/匿名函数和闭包 '章节11.匿名函数和闭包')
#### <a href="/secondless/w-a/匿名函数和闭包.html#_4-匿名函数如何自动执行-方式" style="margin-left:50px;">1、匿名函数如何自动执行-()()方式</a>
#### <a href="/secondless/w-a/匿名函数和闭包.html#_4-通过闭包实现局部变量的累加" style="margin-left:50px;">2、通过闭包实现局部变量的累加</a>
#### <a href="/secondless/w-a/匿名函数和闭包.html#_5-循环里的匿名函数取值问题-任何变量都是最后一个值" style="margin-left:50px;">3、循环里的匿名函数取值问题：任何变量都是最后一个值</a>
#### <a href="/secondless/w-a/匿名函数和闭包.html#_6-闭包中的this对象问题" style="margin-left:50px;">4、闭包中的this对象问题</a>
#### <a href="/secondless/w-a/匿名函数和闭包.html#_8-匿名函数私有化-匿名函数自我执行模仿块级作用域-将变量私有化保护数据" style="margin-left:50px;">5、 匿名函数私有化：匿名函数自我执行模仿块级作用域，将变量私有化保护数据</a>
### [章节12.javascript基本包装类型](/secondless/w-a/javascript基本包装类型 '章节12.javascript基本包装类型')
#### <a href="/secondless/w-a/javascript基本包装类型.html#_2、-number-类型" style="margin-left:50px;">1、Number 类型</a>
##### <a href="/secondless/w-a/javascript基本包装类型.html#_1-number类型静态属性-max-value、min-value、nan、negative-infinity、positive-infinity、prototype" style="margin-left:70px;">① Number类型静态属性:MAX_VALUE、MIN_VALUE、NaN、NEGATIVE_INFINITY、POSITIVE_INFINITY、prototype</a>
##### <a href="/secondless/w-a/javascript基本包装类型.html#_2-tostring-方法-将数值转化为字符串-并且可以转换进制" style="margin-left:70px;">② Number类型方法：toString()、toLocaleString()、toFixed()、toExponential()、toPrecision()</a>
#### <a href="/secondless/w-a/javascript基本包装类型.html#_3、string类型" style="margin-left:50px;">2、String类型</a>
##### <a href="/secondless/w-a/javascript基本包装类型.html#_1-属性-length-返回字符串的字符长度" style="margin-left:70px;">① String类型属性:length、constructor、prototype</a>
##### <a href="/secondless/w-a/javascript基本包装类型.html#_4-通用方法-valueof-、tolocalestring-和-tostring-方法-返回字符串的基本值-写不写都一样" style="margin-left:70px;">② String类型通用方法:valueOf()、toLocaleString()和 toString()方法</a>
##### <a href="/secondless/w-a/javascript基本包装类型.html#_5-字符方法-charat-n-返回指定索引位置的字符" style="margin-left:70px;">③ String类型方法:charAt(n)、charCodeAt(n)、数组方式截取字符串、concat(str1...str2)、slice(n,m)、substring、substr、indexOf、lastIndexOf、toLowerCase、toUpperCase、toLocaleLowerCase、toLocaleUpperCase、match、search、replace、replaceAll、split、fromCharCode、localeCompare、startsWith、endsWith、includes、trimStart、trimEnd、trim、repeat、魔法字符串</a>
#### <a href="/secondless/w-a/javascript基本包装类型.html#_4、array数组的常用方法" style="margin-left:50px;">3、Array数组的常用方法</a>
##### <a href="/secondless/w-a/javascript数组.html#_2、数组中的属性和内置方法" style="margin-left:70px;">① 数组中的属性length，数组内置方法toLocaleString()、valueOf()和 toString()</a>
##### <a href="/secondless/w-a/javascript基本包装类型.html#_4、array数组的常用方法" style="margin-left:70px;">② join、push、pop、shift、unshift、reverse、sort、concat、slice、splice</a>
##### <a href="/secondless/w-a/javascript基本包装类型.html#_11-数组includes-searchelement-fromindex-方法-判断数组是否包含一个指定的元素-返回布尔值" style="margin-left:70px;">③ includes、reduce、find、findIndex、filter、map、forEach</a>
##### <a href="/secondless/w-a/javascript基本包装类型.html#_18-数组indexof-方法-返回数组中某个指定的元素位置-从头到尾查找数组元素" style="margin-left:70px;">④ indexOf、lastIndexOf、at、fill、copyWithin、isArray、es6的扩展运算符、every、some、for...of遍历、keys()、values()、entries()、reduceRight、flat、flatMap、from、of</a>
##### <a href="/secondless/w-a/javascript基本包装类型.html#_5、集合类型-set-方法" style="margin-left:70px;">⑤ 集合类型Set()属性方法：size属性、add、has、delete、clear方法，迭代遍历数据：keys()、values()、entries()、for...of遍历，forEach遍历</a>
##### <a href="/secondless/w-a/javascript基本包装类型.html#_6、小结及拓展" style="margin-left:70px;">⑥ 小结拓展：获取两个数组交集、并集、差集，获取数组随机元素（验证码）</a>
### [章节13.函数对象数组小结](/secondless/w-a/函数对象数组小结 '章节13.函数对象数组小结')
##### <a href="/secondless/w-a/函数对象数组小结.html#_1、对象的方法" style="margin-left:70px;">① 对象的方法：for...in(遍历对象)、Object.assign()、Object.create()、Object.freeze()、Object.keys()、Object.values()、Object.entries()</a>
##### <a href="/secondless/w-a/函数对象数组小结.html#_2、数组解构" style="margin-left:70px;">② 数组解构：基础用法、省略元素、设置数组元素默认值、嵌套数组(多维数组)的结构赋值、不定元素的解构赋值</a>

##### <a href="/secondless/w-a/函数对象数组小结.html#_3、对象解构" style="margin-left:70px;">③ 对象解构：基础用法、重命名解构变量、对象解构时的默认值</a>
##### <a href="/secondless/w-a/函数对象数组小结.html#_4、var和let、const的区别" style="margin-left:70px;">④ var和let、const的区别</a>
##### <a href="/secondless/w-a/函数对象数组小结.html#_5、函数参数默认值" style="margin-left:70px;">⑤ 函数参数默认值：对arguments的影响、对函数length的影响、函数默认表达式、参数默认值的暂时性死区</a>
##### <a href="/secondless/w-a/函数对象数组小结.html#_6、函数剩余参数" style="margin-left:70px;">⑥ 函数剩余参数：剩余参数只能出现一个、剩余参数只能放在最后</a>
##### <a href="/secondless/w-a/函数对象数组小结.html#_7、展开运算符-扩展运算符" style="margin-left:70px;">⑦ 展开运算符：针对可迭代对象展开、字面量形式的对象做对象克隆和对象合并</a>
### [章节14.浏览器对象模型BOM及浏览器检测](/secondless/w-a/浏览器对象模型BOM及浏览器检测 '章节14.浏览器对象模型BOM及浏览器检测')
##### <a href="/secondless/w-a/浏览器对象模型BOM及浏览器检测.html#_1、window-对象" style="margin-left:70px;">① window 对象：属性和方法、系统对话框、调出打印机print()、网页新建窗口open()、窗口页面的位置：screenX（screenLeft）和 screenY（screenTop）、窗口页面的大小：innerWidth和 innerHeight，outerWidth 和 outerHeight，document.documentElement.clientWidth和document.documentElement.clientHeight</a>
##### <a href="/secondless/w-a/浏览器对象模型BOM及浏览器检测.html#_6、window对象-定时器-超时调用和间歇调用" style="margin-left:70px;">② window对象：超时调用：setTimeout()方法、取消超时调用：clearTimeout()方法、间歇调用：setInterval()方法、取消间歇调用：clearInterval()方法、模拟定时器功能，超时调用模拟间歇</a>
##### <a href="/secondless/w-a/浏览器对象模型BOM及浏览器检测.html#_7、location-对象" style="margin-left:70px;">③ location 对象：获取网址相关信息、assign()方法跳转到指定页面、reload()方法、repalce()方法、获取网址url参数中的键值对、history 对象 : 属性:length，方法：back()、forward()、go(num)</a>
##### <a href="/secondless/w-a/浏览器对象模型BOM及浏览器检测.html#_9、navigator-对象-浏览器检测对象" style="margin-left:70px;">④ 获取浏览器相关信息、浏览器插件检测、MIME 类型检测、判断设备是安卓、苹果、是否在微信上面浏览网页、用户查看网页的设备是电脑设备，还是手机设备</a>
### [章节15.网页文档对象模型DOM](/secondless/w-a/网页文档对象模型DOM '章节15.网页文档对象模型DOM')
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_1、理解dom" style="margin-left:40px;">1、理解DOM</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_1、理解dom" style="margin-left:70px;">① DOM节点树，节点种类：元素节点、文本节点、属性节点</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_2、查找节点信息方法" style="margin-left:40px;">2、查找节点信息方法</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#i、-getelement系列" style="margin-left:70px;">① getElement系列: getElementById()方法，getElementById()方法获取的元素节点属性：tagName、innerHTML等， 获取及设置元素html属性：id,title,style,className等，getElementsByTagName()方法，getElementsByName()方法，getElementsByClassName()方法</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#ii、queryselector系列" style="margin-left:70px;">② querySelector系列: querySelector()方法，querySelectorAll()方法</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#iii、属性操作系列" style="margin-left:70px;">③ 属性操作系列: getAttribute()方法，setAttribute()方法，removeAttribute()方法</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#iv、-node节点属性-nodename、nodetype、nodevalue" style="margin-left:70px;">④ node节点属性: nodeName、nodeType、nodeValue</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#v、-层次节点属性" style="margin-left:70px;">⑤ 层次节点属性: childNodes属性，firstChild 和 lastChild 属性，ownerDocument 属性，parentNode 属性，previousSibling 属性，nextSibling 属性，忽略空白文本节点，attributes 属性</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_3、操作节点" style="margin-left:40px;">3、操作节点</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_3、操作节点" style="margin-left:70px;">① document.write()方法，createElement()方法，appendChild()方法，createTextNode()方法， insertBefore()方法，模拟在指定节点的后面添加一个节点，repalceChild()方法，cloneNode()方法，removeChild()方法</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_4、dom-类型、扩展、操作内容" style="margin-left:40px;">4、DOM 类型、扩展、操作内容</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_4、dom-类型、扩展、操作内容" style="margin-left:70px;">① DOM 类型: Document类型补充（获取html节点对象，获取body节点对象，获取文档声明：DOCTYPE对象，document.title，document.images，document.links等），Text类型补充（normalize()方法，splitText(num)方法，deleteData删除字符，insertData插入字符，replaceData替换字符，substringData获取字符）</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#ii、dom-扩展" style="margin-left:70px;">② DOM 扩展: scrollIntoView()， children 属性，contains()方法</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#iii、dom操作网页内容-innertext、innerhtml、outertext、outerhtml" style="margin-left:70px;">③ DOM操作网页内容：innerText、innerHTML、outerText、outerHTML</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_5、dom实战-操作表格" style="margin-left:40px;">5、DOM实战：操作表格</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#i、dom创建表格" style="margin-left:70px;">① DOM创建表格</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#ii、-html-dom-来操作表格" style="margin-left:70px;">② HTML DOM 来操作表格: 获取表格元素对象， 获取表格的标题对象\<caption>，获取表头表尾\<thead>、\<tfoot>、\<tbody>,获取表格的行数，获取表格主体里的行数，获取表格主体内第一行的单元格数量(tr)，获取表格主体内第一行第一个单元格的内容(td)，删除标题、表头、表尾、行、单元格，HTML DOM 创建一个表格</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_6、操作css样式" style="margin-left:40px;">6、操作CSS样式</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_6、操作css样式" style="margin-left:70px;">① 行内样式style的获取、赋值、移除属性removeProperty，计算后的样式获取(行内、内联、外联样式)：window 对象下getComputedStyle()方法</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_7、操作页面样式" style="margin-left:40px;">7、操作页面样式</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_7、操作页面样式" style="margin-left:70px;">① className关键字设置样式，创建函数：hasClass() 判断是否存在某个类名，addClass() 如果不存在的这个类名，添加这个类名，removeClass() 如果存在的这个类名，删除这个类名</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_8、操作css外联样式表-css文件" style="margin-left:40px;">8、操作CSS外联样式表.css文件</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_8、操作css外联样式表-css文件" style="margin-left:70px;">① 获取CSSStyleSheet，外联的css样式表对象</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_9、dom元素尺寸-元素大小-和位置-元素位置" style="margin-left:40px;">9、DOM元素尺寸（元素大小）和位置（元素位置）</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_9、dom元素尺寸-元素大小-和位置-元素位置" style="margin-left:70px;">① 获取元素 CSS 大小回顾：通过 style 内联获取元素大小，通过计算getComputedStyle()方法获取元素大小，通过 CSSStyleSheet 对象中的 cssRules属性获取元素大小（需将网页放到服务器上查看）</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#ii、获取元素实际大小" style="margin-left:70px;">② 获取元素实际大小：clientWidth 和 clientHeight：获取可视区的元素大小，可以得到元素内容及内边距所占据的空间大小，scrollWidth 和 scrollHeight：获取滚动内容的元素大小，offsetWidth 和 offsetHeight：获取元素大小，包含边框、内边距和滚动条</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#iii、获取元素周边大小" style="margin-left:70px;">③ 获取元素周边大小位置：clientLeft 和 clientTop:获取元素设置了左边框和上边框的大小；offsetLeft 和 offsetTop：获取当前元素相对于父元素的位置；scrollTop 和 scrollLeft：这组属性可以获取滚动条被隐藏的区域大小（滚动条滚动高度宽度），也可设置定位到该区域（定位滚动条）； getBoundingClientRect()方法：返回一个矩形对象，包含四个属性：left、top、right和 bottom，分别表示元素各边与页面上边和左边的距离</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_10、动态加载脚本" style="margin-left:40px;">10、动态加载脚本</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_10、动态加载脚本" style="margin-left:70px;">① 动态加载js文件，动态加载样式表</a>
### [章节16.事件](/secondless/w-a/事件 '章节16.事件')
####  <a href="/secondless/w-a/事件.html" style="margin-left:40px;">1、事件基础知识</a>
##### <a href="/secondless/w-a/事件.html#_1、事件处理函数列表" style="margin-left:70px;">① 事件处理函数列表</a>
##### <a href="/secondless/w-a/事件.html#_2、内联模型" style="margin-left:70px;">② 内联模型</a>
##### <a href="/secondless/w-a/事件.html#_3、脚本模型" style="margin-left:70px;">③ 脚本模型</a>
####  <a href="/secondless/w-a/事件.html#ii、事件处理函数分类" style="margin-left:40px;">2、事件处理函数分类</a>
##### <a href="/secondless/w-a/事件.html#_1、-鼠标事件" style="margin-left:70px;">① 鼠标事件：click，dblclick，mousedown，mouseup，mouseover，mouseout，mousemove</a>
##### <a href="/secondless/w-a/事件.html#_2、-键盘事件" style="margin-left:70px;">② 键盘事件：keydown，keypress，keyup</a>
##### <a href="/secondless/w-a/事件.html#_3、html事件-包括表单事件" style="margin-left:70px;">③ HTML事件（包括表单事件）：load，unload，resize，scroll，select，change，input，submit，reset，focus，blur</a>
####  <a href="/secondless/w-a/事件.html#iii、事件对象" style="margin-left:40px;">3、事件对象</a>
##### <a href="/secondless/w-a/事件.html#_1、-this-关键字和上下文" style="margin-left:70px;">① this 关键字和上下文</a>
##### <a href="/secondless/w-a/事件.html#_2、-获取事件对象" style="margin-left:70px;">② 获取事件对象</a>
##### <a href="/secondless/w-a/事件.html#_3、鼠标事件" style="margin-left:70px;">③ 获取鼠标按钮（左键、右键、中间滚轮）</a>
##### <a href="/secondless/w-a/事件.html#_4、可视区及屏幕坐标" style="margin-left:70px;">④ 可视区及屏幕坐标：clientX，clientY，screenX，screenY，鼠标点击位置距离页面顶部距离（带滚动条）</a>
##### <a href="/secondless/w-a/事件.html#_5、修改键" style="margin-left:70px;">⑤ 修改键：shiftKey对应Shfit 键，ctrlKey对应 Ctrl 键，altKey 对应 Alt 键，metaKey 对应 windows 键，判断是否按下了它们</a>
##### <a href="/secondless/w-a/事件.html#_6、键盘事件" style="margin-left:70px;">⑥ 键盘事件：键码（键盘上的任意键）keyCode，字符编码（键盘上可以输出字符的键）charCode</a>
##### <a href="/secondless/w-a/事件.html#_7、event-事件对象的常用属性和方法" style="margin-left:70px;">⑦ 事件对象的常用属性和方法：target，事件冒泡，取消：e.stopPropagation()</a>
##### <a href="/secondless/w-a/事件.html#v、事件对象其他属性方法" style="margin-left:70px;">⑧ 事件对象其他属性方法：relatedTarget（在 mouseover 和 mouseout 事件中获取），e.preventDefault()，contextmenu取消鼠标右击弹出的菜单，鼠标滚轮：mousewheel</a>
#### <a href="/secondless/w-a/事件.html#iv、事件绑定" style="margin-left:40px;">4、事件绑定</a>
##### <a href="/secondless/w-a/事件.html#_1-传统事件绑定的问题1-同名事件后者覆盖前者" style="margin-left:70px;">① 剖析传统事件绑定问题：同名事件后者覆盖前者，this 传递问题</a>
##### <a href="/secondless/w-a/事件.html#_3-事件绑定处理函数-添加事件addeventlistener-删除事件removeeventlistener" style="margin-left:70px;">② 现代事件绑定处理函数：添加事件addEventListener()，删除事件removeEventListener()，设置冒泡和捕获</a>
### [章节17.表单处理及错误处理与调试](/secondless/w-a/表单处理及错误处理与调试 '章节17.表单处理及错误处理与调试')
####  <a href="/secondless/w-a/表单处理及错误处理与调试.html#i、表单基础知识" style="margin-left:40px;">1、表单基础知识</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_1、获取form对象的方法" style="margin-left:70px;">① 获取form对象的方法</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_2、提交表单" style="margin-left:70px;">② 提交表单：默认提交form表单按钮type="submit"，js中表单提交及阻止提交，让没有提交功能的按钮（其它元素）完成表单提交使用的是form.submit()方法，实现使用键盘 CTRL + enter(回车键)提交数据</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_5-预防表单数据重复提交" style="margin-left:70px;">③ 预防表单数据重复提交，表单重置：按钮重置type="reset"，js重置 form.reset()方法</a>
####  <a href="/secondless/w-a/表单处理及错误处理与调试.html#_7-使用html-dom获取表单控件元素" style="margin-left:40px;">2、使用HTML DOM获取表单控件元素</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_1-elements属性获取表单控件元素集合" style="margin-left:70px;">① elements属性获取表单控件元素集合</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_2-多个表单字段都使用同一个-name-如单选框多选框" style="margin-left:70px;">② 多个表单字段都使用同一个 name，如单选框多选框，常用属性</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_1-elements属性获取表单控件元素集合" style="margin-left:70px;">③ 表单共有字段方法：foucs()，blur()，表单共有的字段事件：blur，change，input，focus</a>
####  <a href="/secondless/w-a/表单处理及错误处理与调试.html#ii、表单中的文本框" style="margin-left:40px;">3、表单中的文本框</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_1-input-value-和-textarea-value-获取输入的内容-defaultvalue获取默认设置的value值" style="margin-left:70px;">① input.value 和 textarea.value 获取输入的内容，defaultValue获取默认设置的value值</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_2-选择文本-使用-select-方法-可以将文本框里的文本选中-并且将焦点设置到文本框中" style="margin-left:70px;">② 选择文本：使用 select()方法，可以将文本框里的文本选中，并且将焦点设置到文本框中</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_3-选择部分文本-setselectionrange-方法-这个方法接受两个参数-索引和长度。" style="margin-left:70px;">③ 选择部分文本：setSelectionRange()方法，这个方法接受两个参数：索引和长度</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_4-select-事件-选中文本框文本后触发" style="margin-left:70px;">④ select 事件，选中文本框文本后触发</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_5-获取选择的文本-两个属性-selectionstart-和-selectionend" style="margin-left:70px;">⑤ 获取选择的文本，两个属性：selectionStart 和 selectionEnd</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_6-文本过滤输入-表单验证-文本验证-输入框验证" style="margin-left:70px;">⑥ 文本过滤输入（表单验证，文本验证，输入框验证）</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_7-剪切事件-cut-复制事件-copy-粘贴事件-paste-禁用输入法" style="margin-left:70px;">⑦ 剪切事件：cut，复制事件：copy，粘贴事件：paste，禁用输入法</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_8-利用正则表达式将用户输入的非数字字符替换成空-只留下数字" style="margin-left:70px;">⑧ 利用正则表达式将用户输入的非数字字符替换成空，只留下数字</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_9-输入框自动切换焦点到下一个输入框-类似tab键-maxlength属性可输入的最大字符长度" style="margin-left:70px;">⑨ 输入框自动切换焦点到下一个输入框（类似Tab键），maxlength属性可输入的最大字符长度</a>
####  <a href="/secondless/w-a/表单处理及错误处理与调试.html#iii、表单中的下拉列表-选择框" style="margin-left:40px;">4、表单中的下拉列表（选择框）</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_1-获取下拉列表对象" style="margin-left:70px;">① 获取下拉列表对象</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_2-下拉列表多选属性-multiple-multiple-按住键盘ctrl键进行多选-size显示的行数" style="margin-left:70px;">② 下拉列表多选属性 multiple="multiple"(按住键盘CTRL键进行多选)，size显示的行数</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_3-属性-options-下拉选项的集合" style="margin-left:70px;">③ 属性 options（下拉选项的集合）</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_4-选择选项-选择一项的使用selectedindex属性-监听的是下拉列表的change事件" style="margin-left:70px;">④ 选择选项：选择一项的使用selectedIndex属性，监听的是下拉列表的change事件</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_5-下拉列表动态添加选择项-使用option-构造函数-add方法添加选项" style="margin-left:70px;">⑤ 下拉列表动态添加选择项: 使用Option 构造函数，add方法添加选项</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_6-下拉列表动态移除选择项-三种方式-removechild移除、remove-方法移除和-null-移除" style="margin-left:70px;">⑥ 下拉列表动态移除选择项：三种方式（removeChild移除、remove()方法移除和 null 移除）</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_7-下拉列表动态移动选择项-两个下拉列表选项移动" style="margin-left:70px;">⑦ 下拉列表动态移动选择项（两个下拉列表选项移动）</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_8-下拉列表动态排序选择项-选项排序-属性index" style="margin-left:70px;">⑧ 下拉列表动态排序选择项（选项排序）：属性index</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_9-获取单选框或者多选框选择的值-判断checked属性是否为真判断选中的项-defaultchecked判断项目原本设置的默认值" style="margin-left:70px;">⑨ 获取单选框或者多选框选择的值: 判断checked属性是否为真判断选中的项，defaultChecked判断项目原本设置的默认值</a>
####  <a href="/secondless/w-a/表单处理及错误处理与调试.html#iv、错误与调试" style="margin-left:40px;">5、错误与调试</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_1-浏览器错误报告" style="margin-left:70px;">① 浏览器错误报告，错误处理：try-catch 语句，finally 子句，错误类型</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_4-try-catch使用场景" style="margin-left:70px;">② try-catch使用场景，抛出错误，错误事件error：处理DOM对象产生错误时候使用，比如加载图片失败，错误处理策略，调试技术和调试工具</a>
### [章节18.数据Cookie、XML、JSON](/secondless/w-a/数据Cookie、XML、JSON '章节18.数据Cookie、XML、JSON')
####  <a href="/secondless/w-a/数据Cookie、XML、JSON.html#i、cookie" style="margin-left:40px;">1、Cookie、sessionStorage、localStorage</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_1-cookie-的组成" style="margin-left:70px;">① cookie 的组成，编码和解码，失效时间，手动清理cookie，cookie路径访问，cookie限制域名访问，指定访问协议 http https</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_8-封装cookie-创建-获取-删除" style="margin-left:70px;">② 封装cookie(创建，获取，删除)</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#ii、sessionstorage、localstorage" style="margin-left:70px;">③ sessionStorage、localStorage</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#iii、cookie-和-localstorage的对比" style="margin-left:70px;">④ cookie 和 localStorage的对比</a>
####  <a href="/secondless/w-a/数据Cookie、XML、JSON.html#iv、xml" style="margin-left:40px;">2、XML</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_1-创建-xmldom-对象-dom2-级在-document-implementaion-中引入了-createdocument-方法" style="margin-left:70px;">① 创建 XMLDOM 对象（document.implementaion，DOMParser类型创建XMLSerializer类型进行序列化成字符串），解析错误</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_4-加载读取外部xml文件" style="margin-left:70px;">② 加载读取外部xml文件</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_5-xpath操作xml" style="margin-left:70px;">③ XPath操作XML</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_6-封装xpath操作xml文件" style="margin-left:70px;">④ 封装XPath操作xml文件</a>
####  <a href="/secondless/w-a/数据Cookie、XML、JSON.html#v、json" style="margin-left:40px;">3、JSON</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_1-json-语法-可以表示三种类型的值" style="margin-left:70px;">①JSON 语法，可以表示三种类型的值</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_2-获取外部json文件" style="margin-left:70px;">② 获取外部json文件</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_3-解析json字符串-将json字符串转成数组对象-json结构数据-json-parse-方法" style="margin-left:70px;">③ 解析json字符串（将json字符串转成数组对象——json结构数据）：JSON.parse()方法</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_4-js原生值数组、对象转成json字符串-json-stringify" style="margin-left:70px;">④ js原生值数组、对象转成json字符串--JSON.stringify()</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_5-tojson" style="margin-left:70px;">⑤ toJSON</a>

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