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
alert(text);alert(nickname);
alert(typeof text); //返回 undefined
alert(typeof nickname); //返回 undefined
```

> <b>总结：没有定义内容（未赋值）和 不存在的变量，通过 typeof 都返回 undefined。导致我们不好判断类型，因此：我们
在声明变量后就必须要赋值（初始化），以避免我们不好判断出现问题。 </b>

### Null 类型
> Null 类型是一个只有一个值的数据类型，即 null。typeof 操作符检测 null 会返回 object
```javascript
let text = null; alert(typeof text); //返回 object
```
> 作用
>> 如果定义的变量准备在将来用于保存对象，那么最好将该变量初始化为 null。


### Boolean 类型
> 注意
>> 1.Boolean 类型有两个值(字面量)：true 和 false <br/>
```javascript
let text = true; alert(typeof text); //返回boolean
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
>>> let text = 31; alert(typeof text); //返回number
>>> ```

> 浮点类型（小数），就是该数值中必须包含一个小数点，并且小数点后面必须至少有一位数字。
>>> ```javascript
>>> let text = 1.4/0.5; 
>>> let text = .5; //有效，不推荐
>>> ```

> 小数点后面没有值或小数点后面是 0，自动转成为整型
>>> ```javascript
>>> let text = 6.; alert(text); //返回6
>>> let text = 24.0; alert(text); //返回24
>>> ```

> 数值过大或过小，可以用e(科学计数法)表示
>>> ```javascript
>>> let text = 183000000; alert(text); //返回183000000
>>> let text = 1.83e8; alert(text); //返回183000000
>>> ```

> 浮点数值的最高精度是 17 位小数,但算术运算中可能会不精确
>>> ```javascript
>>> let text = 0.7+0.8; alert(text);//返回1.5
>>> let text =0.1+0.2; alert(text);//返回0.30000000000000004
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
>>>
>>>
>>> ```

<p style="height:500px"></p>


