---
navbar: true
sidebar: auto
title: 章节9.Function类型：函数进阶
---

> <b>前言</b><br/>
> 我们在<a href="/secondless/w-a/javascript函数.html#_1、函数声明" target="_blank">章节5.javascript函数</a> 学习了函数的基本用法 <br/>
> 有了前面的基础了解，本章节我们深入学习一下函数。
> <br/><br/>
> <b>概述</b><br/>
> js中，Function(函数)类型实际上是对象。每个函数都是 Function 类型的实例，而且都与其他引用类型一样具有属性和方法。由于函数是对象，因此函数名实际上也是一个指向函数对象的指针。

## 1、函数的声明
### ① 使用 Function 构造函数（new关键字）-----[不推荐]
> 我们说Function(函数)类型实际上是对象，那么是可以使用new关键字来创建
> ``` javascript
> let text = new Function('n1', 'n2' ,'return n1 + n2');
> console.log(text(1,2)); //返回：3
> ```
> 以上方式确实可以实现，但是我们不推荐，原因一个是这种写法看着不习惯，还有就是这种语法会导致解析两次代码（第一次解析常规js 代码，第二次是解析传入构造函数中的字符串），从而影响性能。我们主要是通
过这种语法来理解"函数是对象，函数名是指针"的概念。
### ② 普通的函数声明
> 参考 <a href="/secondless/w-a/javascript函数.html#_2、函数-return-返回值" target="_blank">章节5.javascript函数—2、函数 return 返回值</a> , 写一下我们上面这个函数
> ``` javascript
> function text(n1,n2){
>     return n1 + n2;
> }
> console.log(text(1,2)); //返回：3
> ```
### ③ 使用变量初始化函数
> 就是我们 <a href="/secondless/w-a/javascript函数.html#_2-函数的返回值赋给一个变量" target="_blank">章节5.javascript函数—2、函数 return 返回值—② 函数的返回值赋给一个变量</a>
> ``` javascript
> const text = function(n1,n2){
>     return n1 + n2;
> }
> console.log(text(1,2));//返回：3
> ```
## 2、作为值的函数
> js中的函数名本身就是变量，所以函数也可以作为值来使用。也就是说，不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回。<br/>
> 简单说就是：函数可以传递函数
> ### ① 将函数的返回值传递的参数
>> 先看一个普通的例子，以函数的返回值来传递的参数
>> ``` javascript
>> function love(num){
>>    return num + 10;
>> }
>> function text(love,num){
>>    return love + num;
>> }
>> let res = text(love(10),10);
>> console.log(res);//返回：30
>> //注意：
>> //1、上面例子中：love(10) 传递的是函数的返回值 20，跟普通的变量一样，没有区别
>> //2、也就是 text(love(10),10) 相当于 text(20,10)
>> //3、这个例子，不是作为函数来传递的，而是作为函数的返回值来传递的
>> ```
> ### ② 将函数本身作为值传递的参数
>> 函数本身作为参数传递
>> ``` javascript
>> function love(num){
>>     return num + 10;
>>  }
>>  function text(love,num){
>>     return love(num);
>>  }
>>  let res = text(love,10);
>>  console.log(res);//返回：20
>>  // 注意
>>  // let res = text(love,10); 这里love是一个函数，当做参数传递到另外一个函数里面，而不是它的返回值
>>  // 那么既然love是一个函数，love就可以love(括号里面放一个参数), 最后 return love(num) 后面可以加一个值可以不加
>>  // 这样写法就是将函数本身做了传递，就是将它作为值了，也就是作为值的函数
>> ```

## 3、函数内部属性
> 在函数内部，有两个特殊的对象：arguments(我们在<a href="/secondless/w-a/javascript函数.html#_1、函数声明" target="_blank">章节5.javascript函数</a>已有所了解) 和 this。arguments 是一个类数组对象，包含着传入函数中的所有参数，主要用途是保存函数参数。但这个对象还有一个名叫 callee 的属性，该属性是一个指针，指向拥有这个 arguments 对象的函数。
> ### ① 写个递归（阶乘）函数
> 完成传递一个参数6，返回类似于： 6\*5\*4\*3\*2\*1  的算术结果
>> ``` javascript
>> function love(num){
>>     if(num <= 1) return 1; // 比1小的数直接返回1，后面的代码由于return返回 就不会去执行了
>>     // 传递过来的值 乘以  调用自己（参数减1），就是不停的调用自己，直到1为止
>>     return num * love(num - 1); // 6 * 5 * 4 * 3 * 2 * 1 
>> }
>> console.log(love(6)); //返回：720
>> console.log(love(3)); //返回：6   3*2*1=6     
>> ```
> ### ② 使用 arguments.callee 来执行自身完成递归函数
> 上面 num \* love(num - 1) 调用自身，如果函数名更换了，这里也要跟着更换，如果内部很复杂，改起来非常麻烦且容易出错，那么可以使用 arguments.callee 来代替
>> ``` javascript
>> function love(num){
>>     if(num <= 1) return 1; // 比1小的数直接返回1，后面的代码由于return返回 就不会去执行了
>>     // 传递过来的值 乘以  调用自己（参数减1），就是不停的调用自己，直到1为止
>>     return num * arguments.callee(num - 1); // 6 * 5 * 4 * 3 * 2 * 1 
>> }
>> console.log(love(6)); //返回：720
>> console.log(love(3)); //返回：6   3*2*1=6 
>> ```
> ### ③ 函数内部另一个特殊对象： this
> this就是函数调用语句所处的那个作用域，当在全局作用域中调用函数时，this 对象引用的就是 window。<br/>
> 首先要理解window是什么，它是一个对象，而且是js中最大的对象,是最外围的对象。我们可以来输出一下window对象
>> ``` javascript
>> console.log(window);//可以看到alert, 我们的alert() 和 window.alert()一个效果
>> alert(window); //[object Window]
>> alert(typeof window);// object  window是对象，类型是对象
>> alert(this); // [object Window] this目前表示的是window，因为在window的范围下
>> alert(typeof this);// object 和window一模一样，这个时候的this就是window
>> ```
> window我们可以认为是全局
>> ``` javascript
>> // 关于 var let const 学习完作用域后，还会再总结
>> var girl = '迪丽热巴'; // 这里girl就是全局变量，而这个变量又是window的属性
>> console.log(window); // 控制台window对象中出现了一个属性名girl，值是 '迪丽热巴'
>> console.log(window.girl); // '迪丽热巴'
>> // 换成let操作符就没有了，可见 var 和 let的区别，作用域范围不一样
>> console.log(this.girl); // '迪丽热巴'
>> // 那么就有
>> window.girl = '迪丽热巴'; // 和 var girl = '迪丽热巴'; 是一样的
>> 
>> console.log(this.girl); // '迪丽热巴' 当前this在全局
>> ```
>> 扩展
>> ``` javascript
>> window.girl = '迪丽热巴';//全局的，或者 var girl = '迪丽热巴';也行
>> console.log(this); // this代表window 全局
>> console.log(this.girl); //'迪丽热巴'   打印全局的girl
>> var text = {
>>     //注意此时的girl在text的范围下了
>>     girl:'古力娜扎', //这里的girl是在text下的属性，也就是局部变量了
>>     canDo:function(){ 
>>         //那么这里的this代表的是谁？ 是 text 还是window ?
>>         console.log(this.girl); // '古力娜扎'
>>         console.log(this); // 这里的this 代表 text对象
>>     }
>> }
>> text.canDo();
>> ```
>> 更深理解
>> ``` javascript
>> window.girl = '迪丽热巴';
>> function mygirl(){
>>     console.log(this.girl);// '迪丽热巴'
>>     console.log(this); // 这里的this就是window
>> }
>> mygirl(); // 这里调用mygirl，其实范围还是在window下
>> 
>> var text= {
>>     girl:'古力娜扎'
>> }
>> text.mygirl = mygirl; 
>> // 相当于 
>> /*
>> var text= {
>>     girl:'古力娜扎',
>>     mygirl:function(){
>>         console.log(this.girl);
>>         console.log(this); 
>>     }
>> }
>> */
>> text.mygirl();// 此时里面的this对象就变成了text, 所以mygirl函数里面的this是动态的，第一次在window下， 第二次在text下
>> ```

## 4、函数的属性和方法
> js中的函数是对象，因此函数也有属性和方法。每个函数都包含两个属性：length 和 prototype。
### ① length属性
> length 属性表示函数希望接收的命名参数的个数。
> ``` javascript
> function love(name,height,weight){
>     return `${name},升高：${height},体重：${weight}`;
> }
> console.log(love('迪丽热巴','172cm','52kg')); // '迪丽热巴,升高：172cm,体重：52kg'
> console.log(love.length);//属性就可以直接用 点  返回：3  3个参数
> ```
### ② prototype 属性--apply()和 call()方法进行 函数冒充
> 对于 prototype 属性，它是保存所有实例方法的真正所在，也就是原型。这个属性，我们在后面讲面向对象章节再详细介绍。<br/>
> prototype 下有两个方法：apply()和 call()，每个函数都包含这两个非继承而来的方法。这两个方法的用途都在特定的作用域中调用函数，实际上等于设置函数体内 this 对象的值。<br/>
> 这里重点讲一下apply()和 call()：函数冒充
> ``` javascript
> //正常函数执行
> function text(n1,n2){
>     return n1+n2;
> }
> console.log(text(10,20));
> ```
>> #### 1. apply() 冒充其它函数执行
>>  ``` javascript
>>  function text(n1,n2){
>>      return n1+n2;
>>  }
>>  function love(n1,n2){
>>      //冒充text函数执行，括号里面的第一个参数：this,表示window下面去执行它，因为text函数的作用域在window下面
>>      //第二个参数就是冒充的函数text要接收的参数，用[]，参数写在里面, 这两个参数就是我要调用love函数传递过来的参数，把这两个参数传递给冒充的函数text就行了
>>      return text.apply(this,[n1,n2]); //this表示window作用域，[]表示传递的参数
>>      return text.apply(this,arguments);//当数组传，替换上面的[n1,n2]
>>  }
>>  //这样的话，love函数就可以冒充text函数进行执行了, love函数本身是没有写相加的功能的，用的text函数的功能
>>  console.log(love(10,20));
>>  ``` 
>> #### 2. call() 冒充其它函数执行
>> call()方法和 apply()方法相同，都是冒充其它函数执行，它们的区别仅仅在于接收参数的方式不同。对于 call()方法而言，第一个参数是作用域，没有变化，变化只是其余的参数都是直接传递给函数的。
>>  ``` javascript
>>  function text(n1,n2){
>>      return n1+n2;
>>  }
>>  function love(n1,n2){
>>      return text.call(this,n1,n2);//传参方式不同而已，功能是一样的
>>  }
>>  console.log(love(10,20));//返回：30
>>  ```
> 有的同学不禁要问，我自己写函数执行不好吗，为何还要冒充其它函数，所以，apply()和 call()方法真正常用的地方是：能够扩展函数赖以运行的作用域。
### ③ 对象冒充：apply()和 call()方法扩展函数赖以运行的作用域
>>  ``` javascript
>>  window.girl = '迪丽热巴';// var girl = '迪丽热巴';// 全局，这里的girl变量就是全局变量
>>  var text= {
>>      girl:'古力娜扎' // 这里的girl就是局部变量，因为它在text对象里面
>>  }
>>  function mygirl(){
>>      console.log(this.girl);
>>  }
>>  mygirl();//直接执行肯定是全局，this.girl 返回 '迪丽热巴'，因为函数在window下面，不在text对象里面
>>  //用call来实现对象冒充，可以冒充text下，也可以冒充window下
>>  //1.冒充window下
>>  mygirl.call(window);// '迪丽热巴'
>>  mygirl.call(this);// '迪丽热巴'  this就是window
>>  //2.冒充text下
>>  //冒充text,作用域就在text对象里面，所以girl就是 '古力娜扎'
>>  mygirl.call(text);// '古力娜扎'
>>  //注意：用call而不用apply是因为call传参方便，没有参数就不传
>>  ```
>> 好处：就是对象不需要与方法发生任何耦合关系(耦合，就是互相关联的意思，扩展和维护会发生连锁反应)。也就是说，text 对象和
mygirl()方法之间不会有多余的关联操作，比如 text.mygirl1 = mygirl;为我们程序的维护提供了便利。





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