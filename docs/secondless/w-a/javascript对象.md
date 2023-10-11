---
navbar: true
sidebar: auto
title: 章节6.javascript对象 
---

> #### 回顾
> 回忆一下，我们之前学习的时候，提到的对象出现的地方：<br/>
> 1.<a href="/secondless/w-a/javascript基础.html#object-类型" target="_blank">Object数据类型</a> <br/>
> 2.<a href="/secondless/w-a/javascript运算符.html#_3-其它类型在一元运算符的规则" target="_blank">其它类型在一元运算符的规则_5.对象---提到对象的toString()和valueOf()</a> <br/>
> 3.<a href="/secondless/w-a/javascript运算符.html#_2-逗号运算符"  target="_blank">逗号运算符___4.对象的字面量声明</a> <br/>
> 4.<a href="/secondless/w-a/流程控制语句.html#_4、for-in-语句-枚举对象的属性"  target="_blank">流程控制语句___4.for...in 语句 枚举对象的属性</a> <br/>
> 5.<a href="/secondless/w-a/流程控制语句.html#_6、with语句"  target="_blank">流程控制语句___6.with语句 是将代码的作用域设置到一个特定的对象中</a> <br/>


> #### 前言
> 我们生活中，说到对象，指的就是男女朋友，虽然说我们程序员属于高质量人群，不乱花钱、脾气好、每天坐着安静写代码、收入还高，但即使这样，还被对象吐槽成不懂浪漫、死脑筋，并且我们程序员还有很多的单身汪，为此我们程序员伤透了脑筋，头发每天以肉眼可见的速度递减。<br/>
> <br/>
> 虽然说，现实中找一个对象比较难，但是我们程序员可以通过js来创建一个对象！
> <br/>
> 比如说：<br/>
> 我希望有这么一个对象：<br/>
> 1、升高：170cm ,  <br/>
> 2、体重：52kg ,  <br/>
> 3、年龄：25岁 ,  <br/>
> 4、长相：非常漂亮 ,  <br/>
> 5、胸围：90cm ,  <br/>
> 6、腰围：60cm ,  <br/>
> 7、臀围：90cm ,  <br/>
> 8、学历：研究生以上学历，<br/>
> 9、家庭：富二代，<br/>
> 10、能干啥：给我洗衣、做饭、陪我打游戏、旅游、心疼我，事事以我为中心！<br/>
> 11、（还有很多，你们自己想）<br/><br/>
> 这样的对象现实中比较难找，但是我们js中如何创建呢？
## 1、创建对象
> 对象包含哪些元素 <br/>
> 1.属性（字段） <br/>
> 2.方法（函数） <br/>
### ① 使用字面量方式创建 Object（对象）
> ``` javascript
> let girl = {
>     //键值对，左边是属性名，右边是值
>     height:'170cm', //字符串
>     weight:'52kg',
>     age:25,         //数值
>     looks:'very beautiful',
>     bust:'90cm',
>     waist:'60cm',
>     hip:'90cm',
>     education:'研究生以上学历',
>     family:'富二代',
>     //对象中的函数（方法）
>     Cando:function(){  //匿名函数（后面会讲）
>         return '给我洗衣、做饭、陪我打游戏、旅游、心疼我，事事以我为中心！';
>     }
> }
> alert(girl);//'[object Object]'
> alert(JSON.stringify(girl));
> ```
### ② 使用 new 运算符创建 Object（new 关键字可以省略）
> ``` javascript
> let girl = new Object(); //new 方式
> //let girl = Object(); // new 关键字可以省略
> girl.height = '170cm'; // 分号，创建属性字段，等于号右边是值
> girl.weight = '52kg';
> girl.age = 25;         //数值
> girl.looks = 'very beautiful';
> girl.bust = '90cm';
> girl.waist = '60cm';
> girl.hip = '90cm';
> girl.education = '研究生以上学历';
> girl.family = '富二代';
> //对象中的函数（方法）
> girl.Cando = function(){
>     return '给我洗衣、做饭、陪我打游戏、旅游、心疼我，事事以我为中心！';
> }
> alert(girl);//'[object Object]'
> alert(JSON.stringify(girl));
> ```
### ③ 属性字段也可以使用字符串形式（单引号双引号）
> ``` javascript
> let girl = {
>   //键值对，左边是属性名，右边是值
>   'height':'170cm', //属性名也可以是单引号双引号（英文状态单引号双引号）
>   'weight':'52kg',
>   'age':25,   
> }
> alert(girl);//'[object Object]'
> alert(JSON.stringify(girl));
> ```
### ④ 字面量方式给对象赋值
> ``` javascript
>   let girl = {}; //字面量方式声明空的对象
>   girl.height = '170cm'; //点符号 给属性赋值
>   girl.weight = '52kg';
>   girl.age = 25; 
>   alert(girl);//'[object Object]'
>   alert(JSON.stringify(girl));  
> ```

## 2、对象属性输出、方法（函数）调用
> ``` javascript
> let girl = {
>     //键值对，左边是属性名，右边是值
>     height:'170cm', //字符串
>     weight:'52kg',
>     age:25,         //数值
>     looks:'very beautiful',
>     bust:'90cm',
>     waist:'60cm',
>     hip:'90cm',
>     education:'研究生以上学历',
>     family:'富二代',
>     Cando:function(){
>         return '给我洗衣、做饭、陪我打游戏、旅游、心疼我，事事以我为中心！';
>     }
> }
> ```
### ① 对象属性输出
> ``` javascript
> alert(girl.age); //点表示法输出
> alert(girl['age']); //中括号表示法输出（数组方式输出），注意引号
> alert(girl.education); 
> alert(girl['education']); 
> ```
### ② 对象方法（函数）调用
> ``` javascript
> alert(girl.Cando); //调用方法（函数），如果没有圆括号，会打印代码
> alert(girl.Cando()); //调用对象中的方法，打印返回值
> ```
### ③ 枚举对象属性和值（键值对）---for...in(遍历对象)
> ``` javascript
> for (const key in girl) {
>     console.log('对象的属性名：'+ key);
>     console.log('对象的属性名：'+ key + '------ 对象的属性值：' + girl[key]);
>     console.log('对象属性值的数据类型：' + typeof girl[key]);
>     if(typeof girl[key] == 'function'){
>         alert(girl[key]());
>     }else{
>         console.log('对象的属性名：'+ key + '------ 对象的属性值：' + girl[key]);
>     }
> }
> ```
### ④ 删除对象的属性
> ``` javascript
> alert(JSON.stringify(girl));
> // 删除对象的属性用 delete
> delete girl.education;
> alert(JSON.stringify(girl));
> ```

## 3、对象中的方法及应用
### ① 对象中的方法
#### 对象或数组（章节7讲数组）都具有 toLocaleString()、toString()和 valueOf()方法，其中 toString()和 valueOf()无论重写了谁，都会返回相同的值。
### ② 对象的应用
> 在实际开发过程中，一般我们更加喜欢字面量的声明方式。因为它清晰，语法代码少，而且还给人一种封装的感觉。<br/>
> js中，万物皆可为对象，对象多用于在应用程序中的存储和传输数据。<br/>
> 怎么理解：<br/>
> #### 1.比如：我们可以将我们网站首页导航栏每个栏目看成一个对象：
> ``` javascript
> let menu = {
>     name:'网站首页',
>     en_name:'home',
>     href:'index.html'
> }
> //这些数据可以从我们数据库获取，然后传递给前端的页面，方便后台更新栏目名称
> ```
> #### 2.再比如：向函数传递大量可选参数
> ``` javascript
> function mylove(height,weight,age,looks){
>     return `给我这样一个女朋友，升高：${height},体重：${weight},年龄：${age},长相：${looks}`;
> }
> alert(mylove('170cm','52kg',25,'very beautiful'));
> ```
> 过了一段时间，你的需求变了，不仅要漂亮，而且身材要好，学历要高，还要是富二代，因为你的这个对象虽然漂亮，但是太瘦了而且家里贫穷，这不经让我想起了，在网络公司，哪些产品经理突然抽风改需求的日子。<br/>
> 这个时候，你必须知道，你的函数（方法）<b>已经在几十个地方被调用过了</b> mylove('170cm','52kg',25,'very beautiful');<br/>
> 这个时候，你是这么做吗？
> ``` javascript
> function mylove(height,weight,age,looks,bust,waist,hip,education,family){
>     let str = `胸围：${bust},腰围：${waist},臀围：${hip},学历：${education},家庭：${family}`;
>     return `给我这样一个女朋友，升高：${height},体重：${weight},年龄：${age},长相：${looks},${str}`;
> }
> alert(mylove('170cm','52kg',25,'very beautiful','90cm','60cm','90cm','education','富二代'));
> ```
> 然后将几十处调用的函数：mylove('170cm','52kg',25,'very beautiful'); 改成：mylove('170cm','52kg',25,'very beautiful','90cm','60cm','90cm','education','富二代');吗？<br/>
> 痛苦不？若后期还有新的需求要增加怎么办？<br/>
> 所以我们的函数在一开始就可以用对象来传递大量参数
> ``` javascript
> let love = {
>     height:'170cm', 
>     weight:'52kg',
>     age:25,        
>     looks:'very beautiful',
> };
> alert(mylove(love)); //调用函数传递对象参数
> function mylove(love){
>     return `给我这样一个女朋友，升高：${love.height},体重：${love.weight},年龄：${love.age},长相：${love.looks}`;
> }
> //如果改变了需求，只需修改对象即可，其余几十处 mylove(love); 函数调用不用更改
> let love = {
>     height:'170cm', 
>     weight:'52kg',
>     age:25,        
>     looks:'very beautiful',
>     bust:'90cm',
>     waist:'60cm',
>     hip:'90cm',
>     education:'研究生以上学历',
>     family:'富二代',
> };
> alert(mylove(love)); // 几十处调用不用更改
> function mylove(love){
>     let str = `胸围：${love.bust},腰围：${love.waist},臀围：${love.hip},学历：${love.education},家庭：${love.family}`;
>     return `给我这样一个女朋友，升高：${love.height},体重：${love.weight},年龄：${love.age},长相：${love.looks},${str}`;
> }
> ```

#### 3、更多对象的应用，我们后面会慢慢涉及




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