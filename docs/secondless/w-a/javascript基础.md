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



## [章节3.javascript运算符](/secondless/w-a/javascript运算符 '章节3.javascript运算符') 
> <a href="/secondless/w-a/javascript运算符" target="_blank">章节3.javascript运算符  [点击查看]</a>



