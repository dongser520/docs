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
>>>   let text;alert(Boolean(text));//返回false
>>>   let text = null; alert(Boolean(text));//返回false
>>> ```



<p style="height:500px"></p>


