---
navbar: true
sidebar: auto
title: 章节2.javascript基础 
---

## 1、变量
### 操作符
>  var  
>  let  
>  const 

## 2、关键保留字
### 关键字
>  简单点讲：下面这些关键字不能用作变量名（标识符），一般用于控制语句的开始或结束，
或者用于执行特定的操作等用的。

| var        |   break      |  else       | new      |
|:--:        |   :--:       |  :--:       | :--:     |
|  case      |   finally    |  return     | void     |
|  catch     |   for        |  switch     | while    |
|  continue  |   function   |  this       | with     |
|  default   |   if         |  throw      |          |
|  delete    |   in         |  try        |          |
|  do        |   instanceof |  typeof     |          |

### 保留字
>  另外还有一组不能用作标识符的保留字，尽管保留字在 JS
中还没有特定的用途，但它们很有可能在将来被用作关键字。比如：const 、 let、class等等
这在以前是没有用的。

| let        |   const      |  abstract       | enum      |  class      |
|:--:        |   :--:       |  :--:       | :--:     |:--:     |
|  int      |   short    |  boolean     | export     |  double      |
|  interface     |   static        |  byte     | extends    |  import      |
|  long  |   super   |  char       | final     | public |
|  native   |   synchronized         |  volatile      |    float      |      |
|  package    |   throws         |  debugger        |     goto     |      |
|  private        |   transient |  implements     |   protected       |     |


## 3、语法构成
### 标识符
>  就是指变量、函数、属性的名字，或者函数的参数。由下列格
式规则组合起来的一或多个字符：
>> 1.不能把关键字、保留字、true、false 和 null 作为标识符 <br/>
>> 2.第一字符必须是一个字母、下划线(_)或一个美元符号($)  <br/>
>> 3.其他字符可以是字母、下划线、美元符号或数字  <br/>

<b>总之：写标识符的时候，编辑器出现错误，就不要用！！！</b>

### 区分大小写
例如：text 和 Text 表示两种不同的变量

### 代码注释
> 包括单行注释和块级注释
```javascript
// 单行注释
/*
* 这是一个多行
* 块级注释
*/
```

## 4、数据类型
### Undefined 类型
> Undefined 类型只有一个值，即 undefined。我们声明变量，但没有对其初
始化时(没有给它赋值的时候)，这个变量的值就是 undefined。
> 没有必要  let text = undefined;

> 我们用  typeof  操作符检查数据类型

```javascript
let text;
alert(text);//返回值 undefined
alert(nickname);// 报错，提示：未定义
alert(typeof text); //返回 undefined
alert(typeof nickname); //返回 undefined
```

> <b>总结：没有定义内容（未赋值）和 不存在的变量，通过 typeof 都返回 undefined。导致我们不好判断类型，因此：我们
在声明变量后就必须要赋值（初始化），以避免我们不好判断出现问题。 </b>

### Null 类型
> Null 类型是一个只有一个值的数据类型，即 null。typeof 操作符检测 null 会返回 object
```javascript
let text = null; 
alert(text);//返回值 null
alert(typeof text); //返回 object
```
> 作用
>> 如果定义的变量准备在将来用于保存对象，那么最好将该变量初始化为 null。


### Boolean 类型
> 注意
>> 1.Boolean 类型有两个值(字面量)：true 和 false <br/>
```javascript
let text = true; 
alert(text);//返回值 true
alert(typeof text); //返回 boolean
```
>> 2.true 不一定等于 1，false 不一定等于 0       <br/>
```javascript
let text = true;
alert(text == 1); //返回true
alert(text == 0); //返回false
alert(text === 1); //返回false 恒等，数据类型也必须相同
```
>> 3.js 是区分大小写的，True 和 False 或者其他都不是 Boolean 类型的值
```javascript
let text = True; alert(typeof text); //报错，未定义
let text = 'True'; alert(typeof text); //返回string 字符串类型了
```

>> 4.使用转型函数Boolean()可将其他值转成 true 或  false
>>> 作用：程序开发中，多用于判断
>>> ```javascript
>>>   let text;alert(Boolean(text));//undefined返回false
>>>   let text = null; alert(Boolean(text));//null返回false
>>> ```

>> <b>5.条件语句括号里面必须是布尔值，true或者false</b> 
>>> ```javascript
>>>   if(这里必须是true或者false){}else{}
>>>   括号里面的内容会进行隐式转换
>>> ```

### Number 类型
#### Number类型即数值类型，包含两种数值：整型（整数）和浮点型（小数）。
>>有四种格式：十进制、二进制、八进制、十六进制。
>>> ```javascript
>>> let text = 31; 
>>> alert(text);//返回值 31
>>> alert(typeof text); //返回 number
>>> ```

> 浮点类型（小数），就是该数值中必须包含一个小数点，并且小数点后面必须至少有一位数字。
>>> ```javascript
>>> let text = 1.4/0.5; //返回值 1.4/0.5
>>> let text = .5; //返回值 0.5,  有效，不推荐
>>> ```

> 小数点后面没有值或小数点后面是 0，自动转成为整型
>>> ```javascript
>>> let text = 6.; alert(text); //返回值6
>>> let text = 24.0; alert(text); //返回值24
>>> ```

> 数值过大或过小，可以用e(科学计数法)表示
>>> ```javascript
>>> let text = 183000000; alert(text); //返回值183000000
>>> let text = 1.83e8; alert(text); //返回值183000000
>>> ```

> 浮点数值的最高精度是 17 位小数,但算术运算中可能会不精确
>>> ```javascript
>>> let text = 0.7+0.8; alert(text);//返回值1.5
>>> let text =0.1+0.2; alert(text);//返回值0.30000000000000004
>>> //因此注意不要用浮点数做精确判断
>>> ```


> 浮点数值的范围在：Number.MIN_VALUE ~ Number.MAX_VALUE 之间(做了解即可)
>>> ```javascript
>>>  alert(Number.MIN_VALUE); //最小值
>>>  alert(Number.MAX_VALUE); //最大值
>>>  //超过这个范围，出现正无穷大，或负无穷大
>>>  alert(100e1000); //超出范围，Infinity
>>>  alert(-100e1000); //超出范围，-Infinity
>>>  //判断是否超过了规定范围，可以使用 isFinite()函数，没有超过返回 true，超过了返回 false
>>>  alert(isFinite(100e1000)); //超过了，返回 false
>>> ```

#### NaN，即非数值(Not a Number)是一个特殊的值，比如，任何数值除以0是不对的，其他程序会终止，但js会返回出特殊的值NaN，不会影响程序执行。
>>> ```javascript
>>> alert(0 / 0); //NaN
>>> alert(10 / 0); //Infinity
>>> alert(10 / 0 * 0); //NaN
>>> //可以通过 Number.NaN 得到 NaN 值，任何与 NaN 进行运算的结果均为 NaN
>>> //NaN 与自身不相等(NaN 不与任何值相等)
>>> alert(Number.NaN); //NaN
>>> alert(NaN+10); //NaN
>>> alert(NaN == NaN) //false
>>> //判断这个值到底是不是 NaN,可以使用isNaN()函数，它会尝试将这个值转换为数值(用到它的时候再讲)
>>> //Number()、parseInt()和 parseFloat(),这3个函数可以把非数值转换为数值
>>> //Number()函数是转型函数，可以用于任何数据类型
>>> //parseInt()和 parseFloat()个则专门用于把字符串转成数值
>>> ```


### String 类型
> String 类型就是我们常说的字符串类型，可以由双引号(")或单引号(')表示。
>>> ```javascript
>>>  let text = '迪丽热巴'; 
>>>  alert(text);//返回值 '迪丽热巴'
>>>  alert(typeof text); //返回类型字符串 string
>>>  let text = "迪丽热巴"; alert(typeof text);//返回 string
>>> ```

> String 类型包含了一些特殊的字符字面量，也叫转义序列。

| 字面量        |   代表的含义      | 
|:--:        |   :--:       | 
|  \n      |   换行    | 
|  \t      |   制表    |
|  \b      |   空格    |
|  \r      |   回车    |
|  \f      |   进纸    |
|  \\\      |   斜杠    |
|  \\'      |   单引号    |
|  \\"      |   双引号    | 

>>> ```javascript
>>>  alert('\'迪丽\n热巴'); 
>>> ```

> <b>toString()方法可以把值转换成字符串[比较常用]</b> 
>>> ```javascript
>>>  let text = 31;
>>>  alert(typeof text); //返回number
>>>  alert(typeof text.toString()); //返回 string 
>>>  //text.toString()打印的是 '31' 或者 "31"
>>>  let text = true;
>>>  alert(typeof text); //返回boolean
>>>  alert(typeof text.toString()); //返回 string
>>>  //text.toString()打印的是 'true' 或者 "true"
>>>
>>>  //undefined 和 null 无法转型
>>>  let nickname; alert(nickname.toString());//报错
>>>  let nickname=null; alert(nickname.toString());//报错
>>>  //可采用函数 String()，这个函数能够将任何类型的值转换为字符串
>>>  let nickname; 
>>>  alert(String(nickname));//返回 'undefined'或 "undefined"
>>>  alert(typeof String(nickname));//返回string
>>>  let nickname=null; 
>>>  alert(String(nickname));//返回 'null'或 "null"
>>>  alert(typeof String(nickname));//返回string
>>>
>>>  //总结：函数 String()比较智能，只有undefined 和 null 才会强制转换
>>>  //其他时候，用函数 String(),默认还是用的toString()方法
>>> ```

### Object 类型
> Object 类型就是对象类型 <br/>
> 创建对象
>> 1.对象字面量创建
>>> ```javascript
>>>  let text = {}; 
>>>  alert(text);//返回值 [object Object]
>>>  alert(typeof text); //返回类型字符串 object
>>> ```
>> 2.new 操作符创建
>>> ```javascript
>>>  let text = new Object(); 
>>>  alert(text);//返回值 [object Object]
>>>  alert(typeof text); //返回类型字符串 object
>>> ```
> 既然可以使用 new Object()来表示一个对象，那么我们也可以使用这种 new 操作符来创
建其他类型的对象。
>>> ```javascript
>>> let text = new Number(31); 
>>> alert(text); //返回 31，是一个数值对象
>>> alert(typeof text);//返回 object
>>>
>>> let text = new String('迪丽热巴'); 
>>> alert(text); //返回 '迪丽热巴'，是一个字符串对象
>>> alert(typeof text);//返回 object
>>> 
>>> let text = new Boolean(true); 
>>> alert(text); //返回 true，是一个布尔对象
>>> alert(typeof text);//返回 object
>>> ```
> 要理解空的对象和空对象
>>> 空的对象，表示这个对象创建了，里面没有东西，比如： let text = {}; <br/>
>>> 空对象，表示没有创建，就是一个null, 如 let text = null;
>>> 
>>> let text = null; text是Null类型，打印 alert(text) 得到的值是 null, 类型返回的字符串是object，
即null属于对象的一种，但是它属于 Null类型。

### 总结 typeof操作符及初始化变量声明
> typeof 操作符是用来检测变量的数据类型。

| 数据类型        |   数据类型通过typeof返回的字符串      |   描述      | 
|:--:        |   :--:       |  :--:       | 
|  Undefined      |   undefined    |   未定义      | 
|  Boolean      |   boolean    |  布尔值      | 
|  Number      |   number    |  数值   | 
|  String      |   string    |  字符串      | 
|  Object      |   object    |  对象或null |
|      |   function    |  函数   |

> 提示：函数在 js 中是对象，不是一种数据类型。所以，使用 typeof 来区分 function 和 object 是非常有必要的。

> 初始化变量声明
>> 一般初始化变量声明采用下面方式
>>> ```javascript
>>>  //扩展一下，声明对象
>>>  let text = null;
>>>  //扩展一下，声明字符串
>>>  let text = '';
>>>  //扩展一下，声明数值
>>>  let text = 0;
>>>  //扩展一下，声明布尔值
>>>  let text = true/false;
>>> ```


### 总结 Boolean 类型转换
> 1.转型函数Boolean()强制性转换
>> String字符串强制转换
>>> ```javascript
>>>  let text = '迪丽热巴';
>>>  alert(Boolean(text)); //返回 true 真
>>>  let text = '';
>>>  alert(Boolean(text)); //返回 false 假
>>> ```
>> 总结：空字符串即 '' 或者 "" 为假，里面有内容就是真

>> Number数值强制转换
>>> ```javascript
>>>  let text = 0/NaN;
>>>  alert(Boolean(text)); //返回 false 假
>>>  let text = Infinity/任何数值;
>>>  alert(Boolean(text)); //返回 true 真
>>> ```
>> 总结： 0/NaN 为假，任何非零数字值(包括无穷大)是真

>> Object对象强制转换
>>> ```javascript
>>> let text = null;
>>> alert(Boolean(text)); //返回 false 假
>>> ```
>> 总结： null 为假，其他任何对象为真

>>Undefined数据类型强制转换
>>> ```javascript
>>> let text;
>>> alert(Boolean(text)); //返回 false 假
>>> ```
>> 总结： 就一个值 undefined，为假

>>Boolean数据类型强制转换
>>> ```javascript
>>> let text = true;
>>> alert(Boolean(text)); //返回 true 真
>>> let text = false;
>>> alert(Boolean(text)); //返回 false 假
>>> ```
>> 总结： true 为真，false为假

> 2.隐式转换
>> 如，在if 条件语句里面的条件判断，就存在隐式转换
>>> ```javascript
>>> if(括号里面的条件，隐式转换成真或假){
>>>    //真的操作
>>> }else{
>>>    //假的操作
>>> }
>>> //我们讲流程控制语句的时候再讲
>>> ```

### Number()函数
> 有 3 个函数可以把非数值转换为数值：Number()、parseInt()和 parseFloat()。
Number()函数是转型函数，可以用于任何数据类型。
>>> ```javascript
>>> alert(Number(true)); //1，Boolean 类型的 true 和 false 分别转换成 1 和 0
>>> alert(Number(31)); //31，数值型直接返回
>>> alert(Number(null)); //0，空对象返回 0
>>> alert(Number(undefined)); //NaN，undefined 返回 NaN
>>> ```
>> 字符串规则
>>> 1.只包含数值的字符串，会直接转成十进制数值，如果包含前导 0，即自动去掉
>>>>```javascript
>>>> alert(Number('310')); //返回310
>>>> alert(Number('031')); //返回31
>>>> ```
>>> 2.只包含浮点数值的字符串，会直接转成浮点数值，如果包含前导和后导 0，即自动去掉
>>>>```javascript
>>>> alert(Number('01.30')); //返回1.3
>>>> ```
>>> 3.如果字符串是空，那么直接转成 0
>>>>```javascript
>>>> alert(Number('')); //返回0
>>>> ```
>>> 4.如果不是以上三种字符串类型，则返回 NaN
>>>>```javascript
>>>> alert(Number('迪丽热巴31')); //返回NaN
>>>> ```
>> 如果是对象，对象章节再讲


### parseInt()函数、parseFloat()函数
> 处理整数的时候更常用的是 parseInt()函数，规则如下：
>> 1.空字符串返回NaN
>>>>```javascript
>>>> alert(parseInt('')); //返回NaN
>>>> ```
>> 2.如果第一个不是数值，就返回 NaN
>>>>```javascript
>>>> alert(parseInt('Di31Reba')); //返回NaN
>>>> ```
>> 3.从第一数值开始取，到最后一个连续数值结束
>>>>```javascript
>>>> alert(parseInt('520Di31Reba')); //返回520
>>>> ```
>> 4.返回整数部分
>>>>```javascript
>>>> alert(parseInt('520Di')); //返回520
>>>> ```
>> 5.小数点不是数值，会被去掉
>>>>```javascript
>>>> alert(parseInt('31.24')); //返回31
>>>> ```

> 处理浮点数值(小数)转换的时候更常用的是 parseFloat()函数，规则如下：
>> 1.只认一个小数点
>>>>```javascript
>>>> alert(parseFloat('520.13.14')); //返回520.13
>>>> ```
>> 2.去掉前后的0
>>>>```javascript
>>>> alert(parseFloat('0520.1300')); //返回520.13
>>>> ```
>> 3.把科学计数法转成普通数值
>>>>```javascript
>>>> alert(parseFloat('5.2e9')); //返回5200000000
>>>> ```



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