---
navbar: true
sidebar: auto
title: 章节12.javascript基本包装类型
---

> <b>1.前言</b> <br/>
> 我们在前面的章节，学习了基本类型和引用类型（Object对象/数组Array/正则表达式），本节课我们讲一下基本包装类型。为了便于操作基本类型值，js 提供了 3 个特殊的引用类型(基本包装类型)：Boolean、Number和 String。这些类型与其他引用类型相似，但同时也具有与各自的基本类型相应的特殊行为。实际上，<span style="color:#00A5F7">每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而能够调用一些方法来操作这些数据。</span>
>  <br/> <br/>
> <b>2.理解基本包装类型</b> <br/>
> ```javascript
> let text = '丽迪热巴';
> console.log(typeof text);//返回：string，基本类型，字符串
> //截掉字符串前两位
> let new_text = text.substring(2);//对象.方法(参数)，这种写法明显是引用类型的写法 
> //substring(2)，括号里面写索引，索引是从0开始，当前2表示从第三个字符（或者第二个位置）截取到字符串末尾输出
> console.log(new_text);//返回：'热巴'
> ```
> 变量 text 是一个字符串类型，而 text.substring(2)又说明它是一个对象(因为只有对象才会调用方法)，最后把处理结果赋值给 new_text。'迪丽热巴'是一个字符串类型的值，按道理它不
应该是对象，不应该会有自己的方法
> ```javascript
> console.log('迪丽热巴'.substring(2));//直接通过值来调用方法，返回：'热巴'
> ```
> 我们发现可以直接用值调用这个方法，印证了上面的“<span style="color:#00A5F7">每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而能够调用一些方法来操作这些数据。</span>”这句话。<br/>
> <br/>
> <b>3.基本包装类型进一步解读</b><br/>
> 我们以普通声明（字面量声明）和 以new运算符声明字符串 【<a href="/secondless/w-a/javascript基础.html#object-类型" target="_blank">章节2.javascript基础_4、数据类型_Object 类型_new 操作符来创 建其他类型的对象</a>提到过】做进一步探讨
>> ① 字面量写法
>> ```javascript
>> let text = '迪丽热巴'; //字面量，基本类型
>> text.name = '木拉提'; //给基本类型加属性，无效属性
>> text.age = function () { //给基本类型加方法，无效方法
>>     return 30;
>> };
>> console.log(text); //'迪丽热巴'
>> console.log(text.substring(2)); //'热巴'
>> console.log(typeof text); //string
>> console.log(text.name); //undefined
>> console.log(text.age()); //错误
>> ```
>> ② new 运算符写法
>> ```javascript
>> let text = new String('迪丽热巴'); //new运算符变成了引用类型，String的引用类型，字符串对象 
>> text.name = '木拉提'; //自定义属性，有效属性
>> text.age = function () { //自定义方法，有效方法
>>     return 30;
>> };
>> console.log(text); //字符串对象 String {'迪丽热巴', name: '木拉提', age: ƒ}
>> console.log(text.substring(2)); //'热巴'
>> console.log(typeof text); //object
>> console.log(text.name); //'木拉提'
>> console.log(text.age()); //30
>> ```
> 以上字面量声明和 new 运算符声明很好的展示了他们之间的区别。但有一定还是可以肯定的，那就是不管字面量形式还是 new 运算符形式，都可以使用它的内置方法（如上面的：.substring()）。并且<span style="color:#00A5F7">Boolean 和 Number 特性与 String 相同，三种类型可以成为基本包装类型</span>。(注意：在使用 new 运算符创建以上三种类型的对象时，可以给自己添加属性和方法，<span style="color:#00A5F7">但我们建议不要这样使用</span>，因为这样会导致根本分不清到底是基本类型值还是引用类型值。)
> <br/>

<b>在了解完基本包装类型后，大家现在应该想迫切知道，这三种类型有哪些内置的属性和方法</b>

##  1、 Boolean 类型
### Boolean 类型没有特定的属性或者方法
##  2、 Number 类型
### ① Number类型静态属性:MAX_VALUE、MIN_VALUE、NaN、NEGATIVE_INFINITY、POSITIVE_INFINITY、prototype
> Number 类型有一些静态属性(直接通过 Number 调用的属性，而无须 new 运算符)。 
> |  Number 静态属性            |  说 明                                  |   
> |   :--:                     |   :--:                                 |    
> |  MAX_VALUE                 |  表示最大数          | 
> |  MIN_VALUE                 |  表示最小值                         |   
> |  NaN                       |  非数值                         |   
> |  NEGATIVE_INFINITY         |  负无穷大，溢出返回该值                     |   
> |  POSITIVE_INFINITY         |  无穷大，溢出返回该值                   |  
> |  prototype                 |  原型，用于增加新属性和方法                      |
> ```javascript
> //理解一下静态属性
> let text = 100;
> console.log(text.MAX_VALUE);//undefined ，这种写法叫做属性
> //类型.属性，叫做静态属性
> console.log(Number.MAX_VALUE);//1.7976931348623157e+308
> console.log(Number.MIN_VALUE);//5e-324
> console.log(Number.NaN);//NaN
> console.log(Number.NEGATIVE_INFINITY);//-Infinity
> console.log(Number.POSITIVE_INFINITY);//Infinity
> ```
### ② toString()方法-将数值转化为字符串，并且可以转换进制
> ``` javascript
> let text = 1501.123;
> console.log(text.toString());//'1501.123'
> console.log(typeof text.toString());//string
> //转换成2进制
> console.log(text.toString(2));//111110101.00011111011111001110110110010001011010000111
> ```
### ③ toLocaleString()方法-根据本地数字格式转换为字符串
> ``` javascript
> let text = 1501.123;
> console.log(text.toLocaleString());//'1,501.123'
> console.log(typeof text.toLocaleString());//string
> ```
### ④ toFixed()方法-将数字保留小数点后指定位数并转化为字符串
> ``` javascript
> let text = 1501.123;//小数点保留两位，四舍五入
> console.log(text.toFixed(2));//'1501.12'
> console.log(typeof text.toFixed(2));//string
> let text1 = 1501.125;//小数点保留两位，四舍五入
> console.log(text1.toFixed(2));//1501.13
> ```
### ⑤ toExponential()方法-将数字以指数形式表示，保留小数点后指定位数并转化为字符串
> ``` javascript
> let text = 1501.123;
> console.log(text.toExponential());//'1.501123e+3' 指数形式
> console.log(text.toExponential(2));//'1.50e+3'
> console.log(typeof text.toExponential());//string
> ```
### ⑥ toPrecision()方法-指数形式或点形式表述数，保留小数点后面指定位数并转化为字符串
> ``` javascript
> let text = 1501.123;
> console.log(text.toPrecision());//'1501.123' 点数形式
> //根据传参来决定是指数形式还是点数形式
> console.log(text.toPrecision(8));//'1501.1230'
> console.log(text.toPrecision(2));//'1.5e+3' 指数形式
> console.log(typeof text.toPrecision());//string
> ```
## 3、String类型 
1. String类型属性
> ### ① 属性:length - 返回字符串的字符长度
> ``` javascript
> let text = '迪丽热巴';
> console.log(text.length);// 4
> ```
> ### ② 属性:constructor - 返回创建 String 对象的函数
> ``` javascript
> let text = '迪丽热巴';
> console.log(text.constructor);//String() { [native code] }
> ```
> ### ③ 属性:prototype - 通过添加属性和方法扩展字符串定义
> 面向对象再讲解
2. String类型通用方法
> ### ④ 通用方法：valueOf()、toLocaleString()和 toString()方法，返回字符串的基本值，写不写都一样
3. String类型字符方法
> ### ⑤ 字符方法：charAt(n) - 返回指定索引位置的字符 
> ``` javascript
> let text = '迪丽热巴';
> console.log(text.charAt(0));// '迪'
> console.log(text.charAt(1));// '丽'
> console.log(text.charAt(2));// '热'
> console.log(text.charAt(3));// '巴'
> ``` 
> ### ⑥ 字符方法：charCodeAt(n) - 以 Unicode 编码形式返回指定索引位置的字符
> ``` javascript
> let text = '迪丽热巴s';
> console.log(text.charCodeAt(0));// 36842, 返回的是 '迪'字的acssii码
> console.log(text.charCodeAt(1));// 20029
> console.log(text.charCodeAt(2));// 28909
> console.log(text.charCodeAt(3));// 24052
> console.log(text.charCodeAt(4));// 115 , 返回的是 's'字符的acssii码
> ```
> ### ⑦ 字符方法：数组方式截取
> ``` javascript
> let text = '迪丽热巴s';
> console.log(text[0]);//'迪'
> console.log(text[1]);//'丽'
> console.log(text[2]);//'热'
> console.log(text[3]);//'巴'
> console.log(text[4]);//'s'
> ```
4. String类型字符串操作方法
> ### ⑧ 字符串操作方法：concat(str1...str2) - 将字符串参数串联到调用该方法的字符串
> ``` javascript
> let text = '迪丽热巴';
> console.log(text.concat('是','美女','!'));//'迪丽热巴是美女!'
> ```
















































<br/><br/><br/><br/><br/><br/>


## 课程其它章节
### [章节1.课程介绍](/secondless/w-a '章节1.课程介绍')
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
#### <a href="/secondless/w-a/匿名函数和闭包.html#_8-闭包-模仿块级作用域-将变量私有化保护数据" style="margin-left:50px;">5、 闭包：模仿块级作用域，将变量私有化保护数据</a>
#### <a href="/secondless/w-a/匿名函数和闭包.html#_9-闭包实现代替全局作用域" style="margin-left:50px;">6、 闭包实现代替全局作用域</a>
