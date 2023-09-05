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
### ③ 枚举对象属性和值（键值对）
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





<br/><br/><br/><br/>

## 其它课程章节
### [章节1.课程介绍](/secondless/w-a '章节1.课程介绍')
### [章节2.javascript基础](/secondless/w-a/javascript基础 '章节2.javascript基础')
### [章节3.javascript运算符](/secondless/w-a/javascript运算符 '章节3.javascript运算符')
### [章节4.流程控制语句](/secondless/w-a/流程控制语句 '章节4.流程控制语句')
### [章节5.javascript函数](/secondless/w-a/javascript函数 '章节5.javascript函数')
### [章节6.javascript对象](/secondless/w-a/javascript对象 '章节6.javascript对象')
### [章节7.javascript数组](/secondless/w-a/javascript数组 '章节7.javascript数组')
### [章节8.Date类型：时间和日期](/secondless/w-a/Date类型：时间和日期 '章节8.Date类型：时间和日期')
### [章节9.Function类型：函数进阶](/secondless/w-a/Function类型：函数进阶 '章节9.Function类型：函数进阶')