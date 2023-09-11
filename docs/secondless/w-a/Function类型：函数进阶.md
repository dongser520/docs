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
### [章节2.javascript基础](/secondless/w-a/javascript基础 '章节2.javascript基础')
### [章节3.javascript运算符](/secondless/w-a/javascript运算符 '章节3.javascript运算符')
### [章节4.流程控制语句](/secondless/w-a/流程控制语句 '章节4.流程控制语句')
### [章节5.javascript函数](/secondless/w-a/javascript函数 '章节5.javascript函数')
### [章节6.javascript对象](/secondless/w-a/javascript对象 '章节6.javascript对象')
### [章节7.javascript数组](/secondless/w-a/javascript数组 '章节7.javascript数组') 
### [章节8.Date类型：时间和日期](/secondless/w-a/Date类型：时间和日期 '章节8.Date类型：时间和日期')
### [章节9.Function类型：函数进阶](/secondless/w-a/Function类型：函数进阶 '章节9.Function类型：函数进阶')
### [章节10.内置对象：Global、Math对象，变量、作用域和内存问题](/secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题 '章节10.内置对象：Global、Math对象，变量、作用域和内存问题')
### [章节11.匿名函数和闭包](/secondless/w-a/匿名函数和闭包 '章节11.匿名函数和闭包')