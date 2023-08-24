---
navbar: true
sidebar: auto
title: 章节5.javascript函数
---

## 1、函数声明
> 回顾之前学习提到函数的地方：
> <a href="/secondless/w-a/javascript基础.html#总结-typeof操作符及初始化变量声明" target="_blank">章节2.javascript基础_总结 typeof操作符及初始化变量声明</a> <br/>
> <br/>
> 函数使用 function <a href="/secondless/w-a/javascript基础.html#关键字" target="_blank">关键字</a> 来声明，后跟一组参数以及函数体。
> ### ① 没有参数的函数
>> ```javascript
>> function text() { //函数的声明已完成， 并且函数没有参数，因为()为空
>>    //函数本身没有运行功能，必须调用才可以运行
>>    alert('只有调用我，我才会弹出');
>> }
>> text(); //直接调用函数
>>
>> //现在es6的语法，这么写
>> const text = ()=>{
>>     alert('只有调用我，我才会弹出');
>> }
>> text(); //直接调用函数
>> //注：关于两种写法的区别，在讲完作用域之后，在统一总结
>> ```
> 注意：函数调用执行的时候，前后都可以，前提是必须先有函数，再谈调用
>> ```javascript
>> text(); //直接调用函数
>> function text() { //函数的声明已完成， 并且函数没有参数，因为()为空
>>    //函数本身没有运行功能，必须调用才可以运行
>>    alert('只有调用我，我才会弹出');
>> }
>> ```
> ### ② 带参数的函数
>> ```javascript
>> /*
>> * name 名字
>> * bar  胸围
>> * weight  体重
>> * height  身高
>> */
>> function text(name,bar,weight,height) {
>>     alert(name + ',胸围：'+bar+',体重：'+weight+',升高：'+height);//字符串连接符
>>     // es6新语法，魔法字符串
>>     alert(`${name},胸围：${bar},体重：${weight},升高：${height}`);
>> }
>> text();// 'undefined,胸围：undefined,体重：undefined,升高：undefined'
>> //说明传参的变量不存在，需要传参，根据上面设定的变量传参
>> text('迪丽热巴','85cm','52kg','172cm');// '迪丽热巴,胸围：85cm,体重：52kg,升高：172cm'
>> ```
>> 提到的几个符号怎么在键盘上敲出来：<br/>
>>> 魔法字符串 `` 怎么敲出来 <img src="/20230811124216.jpg" alt="魔法字符串怎么敲出来" class="zoom-custom-imgs" style="display:inline-block;height:20px;"> <br/> 
>>> $ 怎么敲出来 <img src="/20230811130629.jpg" alt="魔法字符串怎么敲出来" class="zoom-custom-imgs" style="display:inline-block;height:20px;"> <br/> 


## 2、函数 return 返回值
> 我们上面的例子，带参和不带参的函数，都没有定义返回值，而是调用后直接执行的。实际上，任何函数
都可以通过 return 语句跟后面的要返回的值来实现返回值。
> ### ① return返回值
>> ```javascript
>> /*
>> * name 名字
>> * bar  胸围
>> * weight  体重
>> * height  身高
>> */
>> function text(name,bar,weight,height) {
>>     return name + ',胸围：'+bar+',体重：'+weight+',升高：'+height;//字符串连接符
>>     // return 表示把这句话字符串返回回来
>>     // es6新语法，魔法字符串
>>     return `${name},胸围：${bar},体重：${weight},升高：${height}`;
>> }
>> text('迪丽热巴','85cm','52kg','172cm');//已经调用了，
>> // 相当于 text('迪丽热巴','85cm','52kg','172cm') = '迪丽热巴,胸围：85cm,体重：52kg,升高：172cm' 赋值给函数了
>> // 只是对它没有进行操作
>> // 如何操作
>> // 在页面上弹窗打印
>> alert(text('迪丽热巴','85cm','52kg','172cm'));
>> // 在页面上输出（讲流程控制语句for循环的时候提到过）
>> document.write(text('迪丽热巴','85cm','52kg','172cm'));
>> //扩展一下，console.log()在控制台输出信息
>> console.log(text('迪丽热巴','85cm','52kg','172cm'));
>> ```
> <b>注意：90%的函数，我们是用return进行返回，在进行操作，直接去执行函数的情况非常少，这个我们后面会感受到！</b>
> ### ② 函数的返回值赋给一个变量
> 还可以把函数的返回值赋给一个变量，然后通过变量进行操作。
>> ```javascript
>> function text(name,bar,weight,height) {
>>     return name + ',胸围：'+bar+',体重：'+weight+',升高：'+height;//字符串连接符
>> }
>> 
>> let love =  text('迪丽热巴','85cm','52kg','172cm');
>> alert(love); // '迪丽热巴,胸围：85cm,体重：52kg,升高：172cm'
>> ```
> ### ③ 退出当前函数
> return 语句还有一个功能就是退出当前函数，注意和 break 的区别。break 用在循环和 switch 分支语句里。<br/>
> 回顾之前学习，提到break的地方<a href="/secondless/w-a/流程控制语句.html#_5、break-和-continue-语句-退出循环语句" target="_blank">[循环里面的break]</a>&nbsp;&nbsp;&nbsp;&nbsp;
><a href="/secondless/w-a/流程控制语句.html#_2、switch-语句" target="_blank">[switch语句里面的break]</a>
>> ```javascript
>> function text(){
>>     // 若是光秃秃的return, 也是终止函数
>>     //return;
>>     if(number < 10) return '这个数小于10'; //当函数遇到第一个return，若满足条件就终止函数，直接返回了，不执行下一句
>>     //条件不满足的时候，再接着执行
>>     return number;
>> }
>> alert(text(8)); // '这个数小于10'
>> alert(text(15)); // 15
>> ```
## 3、函数的arguments 对象
> 函数不介意传递进来多少参数，也不会因为参数不统一而错误。实际上，函数体内可以通过 arguments 对象来接收传递进来的参数。
>> #### 例子1：函数体不传参数，执行的时候传参数，不会产生错误
>> ```javascript
>> function text(){
>>     return '迪丽热巴迪力木拉提';
>> }
>> alert(text('迪丽热巴','85cm','52kg','172cm'));// '迪丽热巴迪力木拉提', 不报错
>> ```
>> #### 例子2：利用arguments对象接收参数，通过数组形式 arguments[下标] 获取，从0开始
>> ```javascript
>> function text(){
>>     //return arguments[0];
>>     //return arguments[1];
>>     return arguments[0] + ',胸围：'+arguments[1]+',体重：'+arguments[2]+',升高：'+arguments[3];
>>     //参数不够则是undefined
>>     return arguments[0] + ',胸围：'+arguments[1]+',体重：'+arguments[2]+',升高：'+arguments[3]+arguments[4];
>> }
>> alert(text('迪丽热巴','85cm','52kg','172cm'));// '迪丽热巴,胸围：85cm,体重：52kg,升高：172cm'
>> ```
>> #### 例子3：利用arguments对象的 length 属性可以得到参数的数量
>> ```javascript
>> function text(){
>>     return arguments.length;
>> }
>> alert(text('迪丽热巴','85cm','52kg','172cm'));// 4
>> ```
>> #### 例子4: 我们可以利用 length 这个属性，来智能的判断有多少参数，然后把参数进行合理的应用。
>> 比如，要实现一个加法运算，将所有传进来的数字累加，而数字的个数又不确定。
>> ```javascript
>> alert(text(10,20,30,40)); //100
>> alert(text(10,20,30,40,55,68));//223
>> alert(text());//0
>> function text(){
>>     //相当于 arguments[0]+arguments[1]+arguments[2]+....
>>     let sum = 0; //前面讲js基础_总结 typeof操作符及初始化变量声明
>>     if (arguments.length == 0) return sum; //如果没有参数，退出
>>     for(let i=0;i<arguments.length;i++){
>>         console.log(arguments[i]);//10 20 30 40
>>         //sum = sum + arguments[i]; 
>>         sum += arguments[i]; //前面讲运算符_3、赋值运算符_② 复合赋值运算符讲到
>>     }
>>     console.log(sum);//100
>>     return sum; // 返回计算的结果
>> }
>> ```
>> #### 例子5:了解一下js中的函数，没有像其他高级语言那种函数重载功能，同名函数执行后面的函数
>> ```javascript
>> alert(text(100)); // 400
>> function text(num){
>>     return num + 50;
>> }
>> function text(num,sum){
>>     return num + sum;
>> }
>> function text(num){
>>     return num + 300;
>> }
>> alert(text(100)); // 400
>> alert(text(100,1)); // 400
>> //重载就是根据参数，选择相同函数名而参数不同的函数，很显然，js中的函数没有重载功能
>> ```
> 
> <b>注意：关于函数在es6(新语法)中的一些新的功能和写法，我们在本期课程的最后给大家总结！</b>


<br/><br/><br/><br/>

## 其它课程章节
### [章节1.课程介绍](/secondless/w-a '章节1.课程介绍')
### [章节2.javascript基础](/secondless/w-a/javascript基础 '章节2.javascript基础')
### [章节3.javascript运算符](/secondless/w-a/javascript运算符 '章节3.javascript运算符')
### [章节4.流程控制语句](/secondless/w-a/流程控制语句 '章节4.流程控制语句')
### [章节5.javascript函数](/secondless/w-a/javascript函数 '章节5.javascript函数')
### [章节6.javascript对象](/secondless/w-a/javascript对象 '章节6.javascript对象')
### [章节7.javascript数组](/secondless/w-a/javascript数组 '章节7.javascript数组')