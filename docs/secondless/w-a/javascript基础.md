---
navbar: true
sidebar: auto
title: javascript基础 
---

## 变量
### 操作符
>  var  
>  let  
>  const 

## 关键保留字
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


## 语法构成
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
