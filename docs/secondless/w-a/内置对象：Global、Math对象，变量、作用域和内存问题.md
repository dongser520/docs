---
navbar: true
sidebar: auto
title: 章节10.内置对象：Global、Math对象，变量、作用域和内存问题
---

## 1、内置对象： Global对象
> <b>前言</b> <br/>
> 对内置对象的定义是：“由js提供的、不依赖宿主环境的对象，这些对象在js程序执行之前就已经存在了。”意思就是说，开发人员不必显示地实例化内置对象(不用new操作符)；因为它们已经实例化了。js只定义了两个内置对象：Global和 Math。
### ① Global对象
> Global(全局)对象是js中一个特别的对象，因为这个对象是不存在的。在js中不属于任何其他对象的属性和方法，都属于Global对象的属性和方法。所以，事实上，并不存在全局变量和全局函数；所有在全局作用域定义的变量和函数，都是 Global 对象的属性和方法。（这句话，在大家学习完面向对象后，才会自我理解，但是在学习面向对象前，我们需要先学习一些基础）<br/>
> 因为js没有定义怎么调用 Global 对象，所以，Global.属性或者 Global.方法()都是无效的。【Web 浏览器将 Global 作为 window 对象的一部分加以实现，即web浏览器用window对象代替Global】
>  ``` javascript 
>  var text = '迪丽热巴';  
>  console.log(window.text); // '迪丽热巴'
>  console.log(Global.text); //报错 Global is not defined
>  ```
### ② Global对象内置的属性和方法：URI 编码方法
> 我们向浏览器提交数据，比如：网站上面的留言板，你提交你的姓名、电话等等信息，有些信息的字符服务器无法识别，导致一些问题和错误。有些浏览器会自动编码，但有些老版本的浏览器没有自动编码产生错误，这个时候，URI 编码可以对链接、提交的信息进行编码，以便发送给服务器。它们采用特殊的 UTF-8 编码替换所有无效字符，从而让浏览器或者我们的服务器能够接受和理解。<br/>
> 例如：我们将学习文档网址复制粘贴到我们的记事本上，看网址的变化
### ③ URI 编码方法：encodeURI()、encodeURIComponent()
> <b>encodeURI(): </b><br/>
> encodeURI()不会对本身属于 URI 的特殊字符进行编码，例如冒号、正斜杠、问号和#号 <br/>
> <b>encodeURIComponent(): </b><br/>
> encodeURIComponent()则会对它发现的任何非标准字符进行编码,比 encodeURI()编码来的更加彻底，<span style="color:#23AAF2">一般来说encodeURIComponent()使用频率要高一些。</span>
>  ``` javascript 
>  let text = '空姐 //wang';
>  //encodeURI()编码
>  let t1 = encodeURI(text);        //只编码了中文
>  console.log(t1);                 //%E7%A9%BA%E5%A7%90%20//wang
>  //encodeURIComponent()编码
>  let t2 = encodeURIComponent(text);//特殊字符和中文编码了
>  console.log(t2);                 //%E7%A9%BA%E5%A7%90%20%2F%2Fwang
>  ```
### ④ URI 解码方法：decodeURI()、decodeURIComponent()
>  ``` javascript 
>  console.log(decodeURI('%E7%A9%BA%E5%A7%90%20//wang'));//返回： '空姐 //wang'
>  console.log(decodeURIComponent('%E7%A9%BA%E5%A7%90%20%2F%2Fwang'));//返回： '空姐 //wang'
>  ```
### ⑤ eval()方法
> eval()方法主要担当一个字符串解析器的作用，他只接受一个参数，而这个参数就是要执行的 JavaScript 代码的字符串。
>  ``` javascript 
>  'var text = 100';
>  alert(text);//报错，text is not defined
>  
>  eval('var text = 100');
>  alert(text);
> 
> eval('alert(100)');//弹出 100
> //由内向外执行，先弹窗100，然后打印 eval('alert(100)')是 undefined,说明eval()没有返回值
> alert(eval('alert(100)'));
> 
> //函数也可以
> eval('function text() {return 100}'); 
> alert(text());
>  ```
> 注意：eval()方法的功能非常强大，但也非常危险。因此使用的时候必须极为谨慎。特别是在
用户输入数据的情况下，非常有可能导致程序的安全性，比如代码注入等等。场景：比如说，你做了一个留言板的接口表单给用户使用，你用了eval()方法，对填写的表单数据进行包装整合，但是，如果同行写了一个非常危险的js代码，你在运行提交的时候，这段危险的代码就会执行，就会去攻击你的服务器，所以eval()方法要慎用。

### ⑥ Global对象的属性
> Global 对象包含了一些属性：undefined、NaN、Object、Array、Function、Date 等等，可直接调用打印。
>  ``` javascript 
>  console.log(Array);//返回构造函数
>  console.log(Object);//返回构造函数 
>  ```

### ⑦ window 对象
> 前面已经说了，Global 没有办法直接访问，而 Web 浏览器可以使用 window 对象来实现一全局访问。
>  ``` javascript 
>  console.log(window.Array);//返回构造函数
>  console.log(window.Object);//返回构造函数 
>  ```


## 2、内置对象： Math 对象
> js为保存数学公式和信息提供了一个对象，即 Math 对象，方便我们快速计算。
>  ### ① Math 对象的属性
> Math 对象包含的属性大都是数学计算中可能会用到的一些特殊值。
> |  属 性                |  说 明                                  |   
> |   :--:                |   :--:                                 |    
> |  Math.E               |  自然对数的底数，即常量 e 的值            | 
> |  Math.LN10            |  10 的自然对数                          |   
> |  Math.LN2             |  2 的自然对数                           |   
> |  Math.LOG2E           |  以 2 为底 e 的对数                     |   
> |  Math.LOG10E           |  以 10 为底 e 的对数                     |  
> |  Math.PI              |  ∏的值 (圆周率)                         |
> |  Math.SQRT1_2         |  1/2 的平方根                           |
> |  Math.SQRT2           |  2 的平方根                             |
>  ``` javascript
>  console.log(Math.E); //2.718281828459045
>  console.log(Math.LN10);//2.302585092994046
>  console.log(Math.LN2);//0.6931471805599453
>  console.log(Math.LOG2E);//1.4426950408889634
>  console.log(Math.LOG10E);//0.4342944819032518
>  console.log(Math.PI);//3.141592653589793
>  console.log(Math.SQRT1_2);//0.7071067811865476
>  console.log(Math.SQRT2);//1.4142135623730951
>  ```
> ### ② Math.min()和 Math.max()方法
> Math.min()用于确定一组数值中的最小值。Math.max()用于确定一组数值中的最大值。
>  ``` javascript
>  console.log(Math.min(4,7,45,842,478,115,14,15)); //返回： 4
>  console.log(Math.max(4,7,45,842,478,115,14,15)); //返回：842
>  ```
> ### ③ Math.ceil()向上舍入、Math.floor()向下舍入、Math.round()四舍五入
> 比如：我们给好评或者给几颗星，就用到这些方法。
>  ``` javascript
>  //向上舍入
>  console.log(Math.ceil(10.9)); //11
>  console.log(Math.ceil(10.5)); //11
>  console.log(Math.ceil(10.1)); //11
>  //向下舍入
>  console.log(Math.floor(10.9)); //10
>  console.log(Math.floor(10.5)); //10
>  console.log(Math.floor(10.1)); //10
>  //四舍五入
>  console.log(Math.round(10.9)); //11
>  console.log(Math.round(10.5)); //11
>  console.log(Math.round(10.1)); //10
>  ```
> ### ④ Math.random() 产生一个0 到 1 之间随机数，不包括 0 和 1
> Math.random()方法返回介于 0 到 1 之间一个随机数，不包括 0 和 1。
>  ``` javascript
> for(let i=0;i<50;i++){
>     console.log(Math.random());//随机数，0-1之间，不包含0和1
> } 
>  ```
> 如果想大于这个范围的话，可以套用一下公式：<br/>
> <strong style="color:#23AAF2">值 = Math.floor(Math.random() * 总数 + 第一个值)</strong>
>> #### 1. 随机产生 1-10 之间的任意数
>> 比如说，网站首页有10张图片，图片名称从1.jpg一直到10.jpg共10张，我希望每个用户打开网站的时候，随机显示一张图片，而不是固定的，这个时候就需要产生一个1-10直接的随机整数，怎么做呢？
>>  ``` javascript
>> let t1 = Math.random() * 10;
>> //Math.random()* 10，由于随机数是大于0小于1，所以范围是：大于0，小于10之间的任意数
>> console.log(t1); 
>>
>> let t2 = Math.random() * 10 + 1;//此时范围就是：大于1，小于11之间的任意数
>> //此时，如果希望取到1-10之间的随机整数，可配合Math.floor使用
>> //此时向下舍入，由于最小的随机数是大于1，向下舍入就是1，最大的随机数小于11，向下舍入就是10
>> console.log(Math.floor(t2));
>> console.log(Math.floor(Math.random() * 10 + 1));
>>  ```
> #### 思考：如果取2-13之间的随机数呢 (包括2和13) ？
> 主要要思考，随机数乘以几？<strong style="color:#23AAF2"> 乘以几 = 最大数 - 最小数 + 1 </strong> <br/>
> 公式：<strong style="color:#23AAF2"> 取a-b之间的随机整数 = Math.floor(Math.random() * (b-a+1) + a); </strong>
>>  ``` javascript
>>  // Math.floor(Math.random() * (13-2+1) + 2);
>> let t = Math.floor(Math.random() * 12 + 2);
>> console.log(Math.floor(t));
>>  ```
> ### ⑤ 取任意两个数之间的随机整数通用函数（方法）
>>  ``` javascript
>>  function randomBetween(min, max) {
>>      let sum = max - min + 1; 
>>      return Math.floor(Math.random() * sum + min);
>>  }
>>  console.log(randomBetween(5,20));
>>  
>>  //随机取30个数字，范围在5-20之间
>>  for(let i=0;i<30;i++){
>>      console.log(randomBetween(5,20));
>>  }
>>  ```
> 随机数的用法非常广泛，广泛用在抽奖、生成登录验证码等等很多场景上。
> ### ⑥ 其他方法
> |  方 法                          |  说 明                                  |   
> |   :--:                         |   :--:                                 |    
> |  Math.abs(num)                 |  返回 num 的绝对值          | 
> |  Math.exp(num)                 |  返回 Math.E 的 num 次幂                         |   
> |  Math.log(num)                 |  返回 num 的自然对数                         |   
> |  Math.pow(num,power)           |  返回 num 的 power 次幂                     |   
> |  Math.sqrt(num)                |  返回 num 的平方根                   |  
> |  Math.acos(x)                  |  返回 x 的反余弦值                       |
> |  Math.asin(x)                  |  返回 x 的反正弦值                           |
> |  Math.atan(x)                  |  返回 x 的反正切值                             |
> |  Math.atan2(y,x)               |  返回 y/x 的反正切值                             |
> |  Math.cos(x)                   |  返回 x 的余弦值                            |
> |  Math.sin(x)                   |  返回 x 的正弦值                             |
> |  Math.tan(x)                   |  返回 x 的正切值                      |
>
>>  ``` javascript
>> console.log(Math.abs(-10));//返回 10
>> console.log(Math.pow(2,3));//返回 8   2的3次幂 2*2*2 = 8
>>  ```
> 以上方法用得不多，用的时候回来查看




<br/><br/><br/><br/><br/><br/>


## 其它课程章节
### [章节1.课程介绍](/secondless/w-a '章节1.课程介绍')
### [章节2.javascript基础](/secondless/w-a/javascript基础 '章节2.javascript基础')
### [章节3.javascript运算符](/secondless/w-a/javascript运算符 '章节3.javascript运算符')
### [章节4.流程控制语句](/secondless/w-a/流程控制语句 '章节4.流程控制语句')
### [章节5.javascript函数](/secondless/w-a/javascript函数 '章节5.javascript函数')
### [章节6.javascript对象](/secondless/w-a/javascript对象 '章节6.javascript对象')
### [章节7.javascript数组](/secondless/w-a/javascript数组 '章节7.javascript数组') 
### [章节8.Date类型：时间和日期](/secondless/w-a/Date类型：时间和日期 '章节8.Date类型：时间和日期')
### [章节9.Function类型：函数进阶](/secondless/w-a/Function类型：函数进阶 '章节9.Function类型：函数进阶')
### [章节10.内置对象：Global、Math对象，变量、作用域和内存问题](/secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题 '章节10.内置对象：Global、Math对象，变量、作用域和内存问题')
