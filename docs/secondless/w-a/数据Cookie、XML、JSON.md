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
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_7、操作页面样式" style="margin-left:70px;">① className关键字设置样式，创建函数：hasClass() 判断是否存在某个类名，ddClass() 如果不存在的这个类名，添加这个类名，removeClass() 如果存在的这个类名，删除这个类名</a>
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