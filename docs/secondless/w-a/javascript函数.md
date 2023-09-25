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