---
navbar: true
sidebar: auto
title: 章节4.jQuery
---

前言
> 1. 关于jQuery <br/><br/>
> 我们在上一章节简单封装了一个js库，便于我们操作DOM节点，在web前端实际开发中，被封神的开源js库，便于我们进行DOM操作的库：jQuery。<br/><br/>
> 2. jQuery介绍 <a href="https://baike.baidu.com/item/jQuery/5385065?fr=ge_ala" target="_blank">[jQuery百度百科]</a><br/><br/>
> 简单说就是：它是2006年就发布的快速、简洁的JavaScript框架库，封装JavaScript常用的功能代码，提供一种简便的JavaScript设计模式，优化HTML文档操作、事件处理、动画设计和Ajax交互，依托这个库开发的插件数量超过了百万个，极大的提高了我们的开发项目的效率，它最大的优势就是提供了一系列的方法，解决了早期各个浏览器之间属性方法不兼容的问题，因此被封为神。<br/><br/>
> 但随着现代浏览器的差异越来越小，IE浏览器退出市场，浏览器之间的兼容性问题也逐渐不再被大家关注，因此jQuery的市场份额也在下降。但是，作为web开发中，非常重要的框架库，在实际开发中，
还是会被用到。<br/><br/>
> 3. 学习jQuery最终效果<br/><br/>
> 我们作为初学者，重点只需要掌握jQuery提供给我们的常用方法，方便我们便捷操作DOM，提高我们的开发效率即可。<span style="color:#00A5F7;">不需要死记硬背，更不能学习了jQuery之后，我们在获取id节点的时候，你连最基本的document.getElementById这种最基本的方法都忘记了，那就得不偿失了，我们的宗旨是最基本的原生js方法你必须得掌握，jQuery作为工具库，你会使用它帮你解决问题就行，它作为辅助工具使用，把握好这个原则。</span><br/><br/>
> 4. jQuery的下载<br/>
> 下载途径很多，建议去<a href="https://www.bootcdn.cn/" target="_blank">BootCDN官网:https://www.bootcdn.cn/</a> 下载，它里面有jQuery发布的所有版本：<a href="https://www.bootcdn.cn/jquery/" target="_blank">下载jQuery</a> （比较懒的同学，直接去下载本节课课件，里面就有jQuery）<br/><br/>
> 5. jQuery参考文档(非常多)<br/>
> <a href="http://t.mb5u.com/jquery/" target="_blank" style="margin-right:60px">jQuery在线手册</a> <a href="http://api.jquery.com/" target="_blank">jQuery最新文档(英文版)</a><br/><br/>
> 6. 关于版本学习 <br/>
> 通过csdn可以看到，版本号有：1.x.x，2.x.x，3.x.x，马上4.x.x也会出来，而我们学习的原则就是能给我们快速解决问题就可以了，而且它们遵循高版本兼容低版本。升级版本只是在原来基础上升级一些新的功能方法，而我们实际开发大部分需要的功能，它在前面的版本都提供了，因此我们选择学习一个版本就可以了。<br/><br/>
> 7. 测试一下<br/>
> 新建/static/js/index.jquery.js (移除上一章节的封装库，重新测试我们上一节需要的功能)
> ```javascript
> /*
> $().getId('box').css('color','red').css('backgroundColor','green');
> $().getTagName('p').css('color','blue').html('我是段落p').click(function(){
>     console.log('我被点了')
> }).css('backgroundColor','black');
> 
> console.log($().getId('box').html());
> console.log($().getId('box').css('fontSize')); 
> */
> 
> $(function(){
>    $('#box').css('color','red').css('backgroundColor','green');
>    $('p').css('color','blue').html('我是段落p').click(function(){
>     console.log('我被点了')
>    }).css('backgroundColor','black');
>    console.log($('#box').html());
>    console.log($('#box').css('height')); 
> });
> ```

## 1、代码风格：$包裹
> 在jQuery程序中，不管是页面元素的选择、内置的功能函数，都是美元符号“$”来起始的。而这个“$”就是jQuery当中最重要且独有的对象：jQuery对象（这个对象是JavaScript封装起来的对象，类似我们封装的MyBase对象），所以我们在页面元素选择或执行功能函数的时候可以这么写：
> ```javascript
> $(function () {}); //执行一个匿名函数
> $('#box'); //进行执行的ID元素选择
> $('#box').css('color', 'red'); //执行功能函数
> ```
> 由于$本身就是jQuery对象的缩写形式，那么也就是说上面的三段代码也可以写成如下形式：
> ```javascript
> jQuery(function () {});
> jQuery('#box');
> jQuery('#box').css('color', 'red');
> console.log(jQuery === $);//相等，恒等
> ```
只需要注意，每次返回的是jQuery对象，因此可以进行连缀操作。
> ```javascript
> console.log($());//可以查看jQuery库里面所有给我们写好的原型方法及属性
> ```

## 2、加载模式：$(function () {})
> 在第1季基础课程我们讲过，网页自上而下执行，如果把js代码写在头部，需要等页面渲染完了再执行，JavaScript提供了一个事件为load，方法如下：
> ```javascript
> window.onload = function () {}; //JavaScript等待加载
> ```
> 在实际应用中，我们都很少直接去使用window.onload，因为它需要等待图片之类的大型元素加载完毕后才能执行JS代码。所以，最头疼的就是网速较慢的情况下，页面已经全面展开，图片还在缓慢加载，这时页面上任何的JS交互功能全部处在假死状态（页面卡在那里了，点了没反应，用户以为网站中毒了）。并且只能执行单次在多次开发和团队开发中会带来困难。
而jQuery只需要执行：
> ```javascript
> $(document).ready(function () {}); //jQuery等待加载 
> //简写：
> $(function () {
> //执行代码放在这里面
> });
> ```
> 只需要等待网页中的DOM结构加载完毕，就能执行包裹的代码，无需等待网页图片视频加载完毕就可以进行交互了，解决了页面卡顿问题。<br/>
> 另外我们在第二期第1季已经学过了，window.onload = function () {} 如果写多次，后面一次会覆盖前面的一次的内容，也就是只能执行一次，如果第二次，那么第一次的执行会被覆盖。而jQuery则避免了这个问题，可写很多这种 $(function () {}); 并且不会覆盖干扰。
> ```javascript
> window.onload = function(){
>     console.log(1);
> }
> window.onload = function(){
>     console.log(2);//执行这个覆盖前面一个
> }
> 
> $(function(){
>     console.log('jq1');//都执行
> });
> $(function(){
>     console.log('jq2');//都执行
> });
> ```
## 3、对象互换
### ① 获取元素DOM对象：get(索引)方法
> ```javascript
> $(function(){
>     //返回jquery对象
>     console.log($('#box'));
>     //原生js节点对象
>     console.log(document.getElementById('box'));
>     //jquery获取元素js节点对象
>     console.log($('#box').get(0));
>     console.log($('p').get(1));
> 
>     //jquery对象和dom对象的互换
>     console.log($(document.getElementById('box')).css('color','red'));
> });
> ```
## 4、多个库之间的冲突
> 我们实际开发中，可能会用到多个库帮我们解决问题，比如，我们前面封装的myBase库，用的$来实例化，产生了冲突，解决办法有两种：
> 1. 将 jQuery 库在 Base 库之前引入，那么“$”的所有权就归 myBase 库所有，而jQuery 可以直接用 jQuery 对象调用，或者创建一个“$$”符给 jQuery 使用。
> ```javascript
> var $$ = jQuery; //创建一个$$的 jQuery 对象
> console.log($().getId('box').css('color','red')); //这是 myBase 的$
> console.log($$('#box').css('color','red')); //这是 jQuery 的$$
> ```
> 2. 如果将 jQuery 库在 Base 库之后引入，那么“$”的所有权就归jQuery 库所有，而myBase库将会冲突而失去作用。这里，jQuery 提供了一个方法：
> ```javascript
> jQuery.noConflict(); //将$符所有权剔除
> var $$ = jQuery;
> console.log($().getId('box').css('color','red'));
> console.log($$('#box').css('color','red'));
> ```
> 反正其他库不管是在jQuery之前还是之后，jQuery都提出了折中方案，如果大家以后再开发中，碰到这种情况，可以来看一下这种操作方案。

















































































































































































<br/><br/><br/><br/><br/><br/>

## 【第二学期第2季课程】其它章节
### [章节1.课程介绍](/secondless/w-b '章节1.课程介绍')
<!-- <LessList  /> -->
### [章节2.面向对象与原型](/secondless/w-b/面向对象与原型 '章节2.面向对象与原型')
####  <a href="/secondless/w-b/面向对象与原型.html#i、创建对象" style="margin-left:40px;">1、创建对象</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_1-创建对象-剖析问题" style="margin-left:70px;">① 创建对象，剖析问题：传统创建对象方法代码重复冗余，对象无法识别从属于哪个函数</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_2-传统面向对象-工厂模式" style="margin-left:70px;">② 传统创建对象：工厂模式（没有办法识别某一个对象的引用）</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_3-构造函数-构造方法-创建特定的对象" style="margin-left:70px;">③ 构造函数(构造方法)创建特定的对象</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_4-构造函数知识扩展-对象冒充构造函数-构造函数体内的函数返回值相等-但引用地址不相同" style="margin-left:70px;">④ 构造函数知识扩展，对象冒充构造函数，构造函数体内的函数返回值相等，但引用地址不相同</a>
####  <a href="/secondless/w-b/面向对象与原型.html#ii、原型" style="margin-left:40px;">2、原型</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_1-原型创建对象" style="margin-left:70px;">① 原型创建对象</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_2-构造函数与原型对比-深度解析-图片示例" style="margin-left:70px;">② 构造函数与原型对比，深度解析（图片示例）</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_3-isprototypeof-方法-判断一个对象是否指向了该构造函数的原型对象" style="margin-left:70px;">③ isPrototypeOf()方法：判断一个对象是否指向了该构造函数的原型对象</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_4-原型模式的执行流程-顺序-先实例-在构造函数-最后原型" style="margin-left:70px;">④ 原型模式的执行流程（顺序）：先实例，在构造函数，最后原型</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_5-删除实例属性访问原型属性-delete方法" style="margin-left:70px;">⑤ 删除实例属性访问原型属性：delete方法</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_6-hasownproperty-方法检测属性是否存在实例中-in操作符判断属性是否存在于实例或原型中-两者结合判断属性是否只存在原型中" style="margin-left:70px;">⑥ hasOwnProperty()方法检测属性是否存在实例中，in操作符判断属性是否存在于实例或原型中，两者结合判断属性是否只存在原型中</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_7-原型创建对象字面量声明方式" style="margin-left:70px;">⑦ 原型创建对象字面量声明方式</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_8-原型创建对象字面量声明方式-原型的声明是有先后顺序-重写原型会覆盖-切断-之前的原型" style="margin-left:70px;">⑧ 原型创建对象字面量声明方式，原型的声明是有先后顺序，重写原型会覆盖（切断）之前的原型</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_9-内置引用类型-string-number-array等本身也使用了原型" style="margin-left:70px;">⑨ 内置引用类型：String,Number,Array等本身也使用了原型</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_10-原型创建对象缺点剖析-传参和引用共享问题" style="margin-left:70px;">⑩ 原型创建对象缺点剖析：传参和引用共享问题</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_11-组合构造函数-原型模式-解决-10-构造传参和引用共享问题" style="margin-left:70px;">⑪ 组合构造函数+原型模式：解决 ⑩ 构造传参和引用共享问题</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_12-动态原型模式-解决-11-组合构造函数-原型模式-代码封装在一起-一种封装的感觉" style="margin-left:70px;">⑫ 动态原型模式：解决 ⑪ 组合构造函数+原型模式，代码封装在一起，一种封装的感觉</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_13-寄生构造函数-工厂模式-构造函数【备胎模式-了解-】" style="margin-left:70px;">⑬ 寄生构造函数：工厂模式 + 构造函数【备胎模式（了解）】</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_14-稳妥构造函数-了解即可-在一些安全的环境中-比如禁止使用-this-和-new-就是寄生构造函数不能用new" style="margin-left:70px;">⑭ 稳妥构造函数（了解即可）：在一些安全的环境中，比如禁止使用 this 和 new，就是寄生构造函数不能用new</a>
####  <a href="/secondless/w-b/面向对象与原型.html#iii、继承" style="margin-left:40px;">3、继承</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_1-js的继承方式通过原型链完成" style="margin-left:70px;">① js的继承方式通过原型链完成</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_2-继承父类属性方法的继承顺序-就近原则-实例化-构造函数实例属性方法-原型属性方法" style="margin-left:70px;">② 继承父类属性方法的继承顺序：就近原则（实例化-->构造函数实例属性方法-->原型属性方法）</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_3-继承后的实例从属关系" style="margin-left:70px;">③ 继承后的实例从属关系</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_4-对象冒充继承及问题-原型里面的属性方法无法继承" style="margin-left:70px;">④ 对象冒充继承及问题:原型里面的属性方法无法继承</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_5-组合继承【广泛应用】-原型链-借用构造函数-对象冒充-的模式-完成对象冒充的原型继承" style="margin-left:70px;">⑤ 组合继承【广泛应用】：原型链+借用构造函数(对象冒充)的模式，完成对象冒充的原型继承</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_6-原型式继承-了解" style="margin-left:70px;">⑥ 原型式继承（了解）</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_7-寄生式继承-原型式-工厂模式结合" style="margin-left:70px;">⑦ 寄生式继承：原型式+工厂模式结合</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_8-继承终极版模式-寄生组合继承来实现继承-组合模式-寄生式继承" style="margin-left:70px;">⑧ 继承终极版模式：寄生组合继承来实现继承：组合模式 + 寄生式继承</a>
####  <a href="/secondless/w-b/面向对象与原型.html#iv、类和对象" style="margin-left:40px;">4、类和对象</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_1-理解类和对象" style="margin-left:70px;">① 理解类和对象</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_2-类中的constructor-方法-构造函数" style="margin-left:70px;">② 类中的constructor()方法（构造函数）</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_3-类中添加方法" style="margin-left:70px;">③ 类中添加方法</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_4-类的继承" style="margin-left:70px;">④ 类的继承</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_5-类的继承中的super关键字-调用父类的构造函数constructor" style="margin-left:70px;">⑤ 类的继承中的super关键字：调用父类的构造函数constructor</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_6-类的继承中的super关键字-调用父类的普通函数" style="margin-left:70px;">⑥ 类的继承中的super关键字：调用父类的普通函数</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_7-子类继承父类方法同时扩展自己的方法-子类在构造函数中使用super-必须放到this前面" style="margin-left:70px;">⑦ 子类继承父类方法同时扩展自己的方法，子类在构造函数中使用super,必须放到this前面</a>
##### <a href="/secondless/w-b/面向对象与原型.html#_8-类和对象的几个注意点" style="margin-left:70px;">⑧ 类和对象的几个注意点：</a>
####  <a href="/secondless/w-b/面向对象与原型.html#v、面向对象、原型、继承、类小结" style="margin-left:40px;">5、面向对象、原型、继承、类小结</a>
### [章节3.封装js库过渡到jQuery](/secondless/w-b/封装js库过渡到jQuery '章节3.封装js库过渡到jQuery')
### [章节4.jQuery](/secondless/w-b/jQuery '章节4.jQuery')

<br/><br/>
## 其它学期课程
### [第一学期（学习顺序：01）](/aboutless.html '第一学期课程')
> 第一学期课程专为零基础的学员定制录制的，纯html+css做企业网站的网页，主讲html和css的相关基础知识，flex布局相关知识，封装css基础样式库，引入字体图标及网页开发基础布局思维，完成企业网站网页的开发过程。<br/><br/>
<b><a href="https://study.163.com/course/courseMain.htm?courseId=1213374826&share=2&shareId=480000002289674" target="_blank">[第一学期学习视频]</a>
</b>

### [第二学期【第1季】（学习顺序：02）](/secondless/w-a '第二学期第1季课程')
> 主讲JavaScript的基础，建议所有学员观看。<br/>
<b>
   <a href="/secondless/w-a.html" target="_blank">[第1季学习文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a style="margin-left:20px;">[第1季学习视频]</a>
</b>

### [第二学期【第2季】（学习顺序：03）](/secondless/w-b '第二学期第2季课程')
> JavaScript中的面向对象，类，ajax，封装js库过渡到jQuery， vue.js基础配置网站页面，建议所有学员观看。<br/>
<b>
   <a href="/secondless/w-b.html" target="_blank">[第2季学习文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a style="margin-left:20px;">[第2季学习视频]</a>
</b>