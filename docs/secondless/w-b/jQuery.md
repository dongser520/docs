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

## 一、jQuery中的选择器过滤器
## 5、选择器
> 本节课开始我们来学习一下jQuery的选择器，<strong style="color:#00A5F7;">注意：jQuery的选择器写法和我们的css选择器写法基本一致，只是在其外层用<span style="color:red">$();</span> 做了一层包裹，便于连缀操作。因此我们在讲jQuery选择器的时候，也是顺便给大家讲了一下CSS选择器的用法，大家可以顺便回顾一下我们第一学期CSS选择器的相关知识。</strong>
### ① ID 选择器、元素选择器、类(class)选择器，属性 length 或 size()方法来查看返回的元素个数
> ```javascript
> //CSS模式
> // div { background-color：red; }   元素选择器：  获取所有 div 元素的DOM对象
> // #box { background-color：red; }  ID选择器:    获取一个 ID 为 box 元素的DOM对象
> // .flex{ background-color：red; }   类(class):  获取所有 class 为 box 的所有DOM对象
> 
> //注意语法规范，id选择器只写一个
> 
> //jQuery 模式
> $(function(){
>    $('div').css('background-color', 'red'); //元素选择器，返回多个元素，进行连缀操作
>    $('#box').css('background-color', 'red'); //ID 选择器，返回单个元素，进行连缀操作
>    $('.flex').css('background-color', 'red'); //类(class)选择器，返回多个元素，进行连缀操作
> });
> ```
> 查看返回的元素个数：属性 length 或 size()方法
> ```javascript
> $(function(){
>     console.log($('div'));//jquery对象查看
>     console.log($('div').length);//111
>     console.log($('div').size());//111
>
>    $('p').css('backgroundColor', 'red');//支持驼峰式写法
> });
> ```
### ② jQuery对象转成DOM对象：get方法或下标获取
> ```javascript
> $(function(){
>     console.log(document.getElementById('box'));//js元素dom对象
>     console.log($('#box').get(0));//jQuery对象转dom对象 get方法
>     console.log($('#box')[0]);//数组下标获取dom对象
> });
> ```

### ③ 群组选择器、后代选择器、通配选择器、指定元素前缀选择器
> ```javascript
> //CSS模式
> // span,p,.flex { background-color：red;}   群组选择器：  获取多个选择器的DOM对象
> // ul li a { background-color：red;}        后代选择器:   获取追溯到的多个DOM对象
> // * { background-color：red;}              通配选择器:  获取所有元素标签的DOM对象
> 
> //jQuery 模式
> $(function(){
>     $('span,p,.flex').css('background-color', 'red'); //群组选择器
>     $('ul li a').css('background-color', 'red'); //后代选择器
>     $('*').css('background-color', 'red'); //通配选择器
>  });
> 
> //目前介绍的六种选择器，在实际应用中，我们可以灵活的搭配，使得选择器更加的精准和快速：
> $(function(){
>     $('#box, div a, .flex').css('background-color', 'red'); //组合了多种选择器
> });
> ```
> 警告：在实际使用上，<span style="color:red">通配选择器一般用的并不多，尤其是在全局整个页面上，比如：$('*')，这种使用方法效率很低，影响性能，建议尽可能少用。</span>
> ```javascript
> <ul>
>    <li><a href="#">我是a</a></li>
>    <li><a href="#">我是a</a></li>
>    <li><em>我是em</em></li>
>    <li><strong>我是strong</strong></li>
> </ul>
> $(function(){
>     //群组选择器
>     //$('ul li a,ul li em,ul li strong').css('color','red');
>     //后代选择器
>     //$('ul li').css('color','red');//发现a元素没变色，使用浏览器默认颜色
>     //采用通配符比较简单
>     $('ul li *').css('color','red');
>     //通配符一般要用，用在局部范围内
>     console.log($('ul li *').size());//4个  没有查多余的
>     console.log($('*')[0].nodeName);//html 没必要查询的节点，浪费资源
> });
> ```
指定元素前缀选择器
> ```javascript
> $(function(){
>     //在 ID 和类(class)中指明元素前缀
>     $('a.active').css('font-size','80px').css('background-color','red');
>     //我们写的页面上更加精确：#nav .right-div>a.active{}
>     $('#nav1 .right-div>a.active').css('font-size','80px').css('background-color','red');
> });
> ```
> ```javascript
> //多class选择器
> $(function(){
>     $('.flex.py-5').css('background-color','red');
> });
> ```
注意：在构造选择器时，有一个通用的优化原则：只追求必要的确定性。
> ```javascript
> $(function(){
>     $('div#box ul li a#link'); //让 jQuery 内部处理了不必要的字符串
>     $('#link'); //ID 是唯一性的，准确度不变，性能提升
> });
> ```

### ④ 层次选择器：jQuery提供后代选择器find、子选择器children、next 选择器、nextAll 选择器
> ```javascript
> <div id="box">
>       <p>儿子p0</p>
>       <p>儿子p1</p>
>       <p class="p">儿子p2</p>
>       <p>儿子p3</p>
>       <div>
>          <p>孙子p4</p>
>          <p>孙子p5</p>
>          <p>孙子p6</p>
>       </div>
>    </div>
> 
> //CSS模式
> // #box p { background-color：red;}        后代选择器:   获取追溯到的DOM对象
> // #box > p { background-color：red;}        子选择器:  只获取子类节点的DOM对象
> // #box>p.p + p { background-color：red;}     next 选择器: 只获取某节点后一个同级DOM对象
> // #box>p.p ~ div { background-color：red;}     nextAll 选择器: 获取某节点后面所有同级DOM对象
> 
> //jQuery 模式
> $(function(){    
>     //后代选择器
>     $('#box p').css('background-color', 'red'); 
>     //find方法等价
>     $('#box').find('p').css('background-color', 'red');     
> 
>     //子选择器:子类节点的DOM对象
>     $('#box > p').css('background-color', 'red'); 
>     //children方法等价
>     $('#box').children('p').css('background-color', 'red'); 
>    
>     // next 选择器:后一个符合要求同级DOM对象
>     $('#box>p.p + p').css('background-color', 'red'); 
>     //next方法等价
>     $('#box>p.p').next('p').css('background-color', 'red');
> 
>     //nextAll 选择器:后面符合要求所有同级DOM对象
>     $('#box>p.p ~ div').css('background-color', 'red');
>     //nextAll方法等价
>     $('#box>p.p').nextAll('div').css('background-color', 'red');
> });
> ```
> 回忆一下js原生：<br/>
> parentNode 属性返回该节点的父节点<br/>
> previousSibling 属性返回该节点的前一个同级节点<br/>
> nextSibling 属性返回该节点的后一个同级节点<br/>
> 详见： <a href="/secondless/w-a/网页文档对象模型DOM.html#_4-parentnode-属性返回该节点的父节点-previoussibling-属性返回该节点的前一个同级节点-nextsibling-属性返回该节点的后一个同级节点"     target="_blank">第二学期第1季_章节15网页文档对象模型DOM_Ⅴ、 层次节点属性_④点</a>
> ```javascript
> //回忆一下js原生：
> //parentNode 属性返回该节点的父节点
> //previousSibling 属性返回该节点的前一个同级节点
> //nextSibling 属性返回该节点的后一个同级节点
> $(function(){
>     let $p = document.getElementsByClassName('p');
>     console.log($p);
>     //前一个同级节点是文本节点，文本节点的前一个是p元素
>     let prev_p = $p[0].previousSibling.previousSibling;
>     console.log('前一个同级节点的前一个同级节点',prev_p);
>     //同样，后一个同级节点是文本节点，文本节点的后一个是p元素
>     let next_p = $p[0].nextSibling.nextSibling;
>     console.log('后一个同级节点的后一个同级节点',next_p);
>     //元素dom操作css样式
>     next_p.style.backgroundColor = 'red';
> });
> ```
虽然说元素js获取DOM对象操作样式非常痛苦，但是你不能忘了！

### ⑤ jQuery提供：prev同级上一个元素，prevAll同级所有上面的元素
> ```javascript
> $(function(){
>     //prev同级上一个元素
>     $('#box>p.p').prev('p').css('background-color', 'red');
>     //prevAll同级所有上面的元素
>     $('#box>p.p').prevAll('p').css('background-color', 'red');
> });
> ```

### ⑥ jQuery提供：siblings()方法：上下同级所有元素，正好集成了 prevAll()和 nextAll()两个功能的效果
> ```javascript
> $(function(){
>     /*
>     //prevAll同级所有上面的元素
>     $('#box>p.p').prevAll('p').css('background-color', 'red');
>     //nextAll 选择器:后面符合要求所有同级DOM对象
>     $('#box>p.p ~ p,#box>p.p ~ div').css('background-color', 'red');
>     */
> 
>      //siblings()方法等价上面两个
>      $('#box>p.p').siblings().css('background-color', 'red');
> });
> ```

### ⑦ jQuery提供：nextUntil()方法：查找同级后面的节点，遇到指定元素停止选定，prevUntil()方法：查找同级前面的节点，遇到指定元素停止选定
> ```javascript
> <stong>stong0</stong>
> <stong>stong1</stong>
> <stong>stong2</stong>
> <p>p0</p>
> <stong>stong3</stong>
> <stong>stong4</stong>
> <stong>stong5</stong>
> <div id="box">div</div>
> <stong>stong6</stong>
> <stong>stong7</stong>
> <stong>stong8</stong>
> <p>p1</p>
> <stong>stong9</stong>
> <stong>stong10</stong>
> <stong>stong11</stong>
> 
> $(function(){
>     //nextUntil()方法：查找同级后面的节点，遇到指定元素停止选定
>     $('#box').nextUntil('p').css('background-color','red');
>     //prevUntil()方法：查找同级前面的节点，遇到指定元素停止选定
>     $('#box').prevUntil('p').css('background-color','red');
> });
> ```
选择器使用总结：<br/>
<strong style="color:#00A5F7;">非要推荐，优先推荐使用jQuery提供的选择器方法</strong>，如：后代选择器：css模式 $('#box p')  与  jQuery方法$('#box').find('p')，优先使用jQuery方法：$('#box').find('p'); 因为它的性能比css模式写法更高，而且灵活性和扩展性更好；但并不是说css模式的写法就不行，它们的性能比较也是相对的，其实都是非常快的，性能差异几乎忽略不计，所以大家可以自由选择。如果非要推荐一种，那么优先使用jQuery提供的选择器方法。

### ⑧ 属性选择器：一般超链接用得多点
> ```javascript
> <a href="#" title="a1">a1</a>
> <a href="#">a2</a>
> <a href="#" title="a31 bbb ccc">a3</a>
> <a href="#" title="abcccbb">a4</a>
> <a href="#" title="a5" data="123">a5</a>
> <a href="#" title="a-6">a6</a>
> <a href="#" title="a">a7</a>
> 
> $(function(){
>     //a[title] css也是这样写 意思是：a元素中有title属性的被选中
>     // $('a[title]').css('color','red');
> 
>     //a[title=a1] css也是这样写 意思是:a元素中有title属性，且值等于a1
>     // $('a[title=a1]').css('color','red');
> 
>     //a[title!=a1] css也是这样写 意思是:a元素中title值不等于a1的全部选中
>     // $('a[title!=a1]').css('color','red');
> 
>     //a[title|=a] 意思是:a元素中title值,且值等于a,或者值等于 a- 后面跟一个“-”号
>     //$('a[title|=a]').css('color','red');
> 
>     //a[title^=a] 意思是:a元素中有title属性，且值是以a开头的
>     // $('a[title^=a]').css('color','red');
> 
>     //a[title$=1] 意思是:a元素中有title属性，且值是以1结尾的
>     // $('a[title$=1]').css('color','red');
> 
>     //a[title~=bbb] 意思是:a元素中有title属性，且值用空格隔开 里面包含 bbb
>     // $('a[title~=bbb]').css('color','red');
> 
>     //a[title*=ccc] 意思是:a元素中有title属性，且值里面包含 ccc
>     // $('a[title*=ccc]').css('color','red');
> 
>     //a[data][title=a5] 意思是:a元素中有title属性，且值等于a5，并且同时还有data属性
>     // $('a[data][title=a5]').css('color','red');
> 
> });
> ```

## 6、过滤器（伪类选择器）
> 参考：<a href="http://t.mb5u.com/css3/" target="_blank">http://t.mb5u.com/css3/</a>里面的：选择符---伪类选择符。<br/>
> 我们在第一学期开发网页的时候，也用过一些伪类选择器，比如： :first-child,:last-child,:hover,:not等等。
> ```javascript
> <h2>我是h2</h2>
> <ul>
>    <li>迪丽热巴</li>
>    <li>古力娜扎</li>
>    <li class="active">黑丝空姐</li>
>    <li>性感车模</li>
>    <li>富家千金</li>
>    <li>梁咏琪</li>
>    <li>古天乐</li>
> </ul>
> <ul>
>    <li>梅赛德斯奔驰</li>
>    <li>宝马</li>
>    <li>大众</li>
>    <li>红旗</li>
>    <li>吉利汽车</li>
>    <li>长城汽车</li>
>    <li>长安汽车</li>
> </ul>
>  <ul>
>    <li>河北</li>
>    <li>
>        湖北 
>        <p>
>          <span class="active">武汉</span>
>        </p>
>    </li>
>    <li>湖南</li>
> </ul>
> <div></div>
> <input type="text" />
> <div>
>    <h2>我是div里面的h2</h2>
>    <h3>我是div里面的h3</h3>
> </div>
> ```
### ① :first，选取第一个元素，返回单个元素，jQuery提供first()方法
> ```javascript
> $(function(){ 
>     //css模式
>     // li:first{ background-color:red }
>     //jQuery模式
>     $('li:first').css('background-color','red');
>     //jQuery提供first()方法
>     $('li').first().css('background-color','red');
> });
> ```
### ② :last，选取最后一个元素，返回单个元素，jQuery提供last()方法
> ```javascript
> $(function(){ 
>     //css模式
>     // li:last{ background-color:red }
>     //jQuery模式
>     $('li:last').css('background-color','red');
>     //jQuery提供last()方法
>     $('li').last().css('background-color','red');
>
>     //第一个ul的最后一个li
>     // $('ul:first li:last').css('background-color','red');
>     $('ul').first().children('li').last().css('background-color','red');
> });
> ```
### ③:not(selector)， :not(.active)选取class不是active的元素，返回元素集合，jQuery提供not(selector)方法
> ```javascript
> $(function(){ 
>     //css模式
>     // li:not(.active){ background-color:red }
>     //jQuery模式
>     $('li:not(.active)').css('background-color','red');
>     //jQuery提供not()方法
>     $('li').not('.active').css('background-color','red');
> });
> ```
### ④ :eq(index)，选择索引(0 开始)等于 index 的元素，返回单个元素，jQuery提供eq()方法
> ```javascript
> $(function(){ 
>     //css模式
>     // li:eq(1){ background-color:red }
>     //jQuery模式
>     $('li:eq(1)').css('background-color','red');
>     //jQuery提供eq()方法
>     $('li').eq(1).css('background-color','red');
>  
>     //也可以传负数，负数从末尾往上数，从-1开始数，正数从0开始数
>     // $('li:eq(-1)').css('background-color','red');
>     // $('li:eq(-3)').css('background-color','red');
> });
> ```
### ⑤ :gt(index)，选择索引(0 开始)大于 index 的元素，返回元素集合
> ```javascript
> $(function(){ 
>     //css模式
>     // li:gt(1){ background-color:red }
>     //jQuery模式
>     $('li:gt(1)').css('background-color','red');
> });
> ```
### ⑥ :lt(index)，选择索引(0 开始)小于 index 的元素，返回元素集合
> ```javascript
> $(function(){ 
>     //css模式
>     // li:lt(1){ background-color:red }
>     //jQuery模式
>     $('li:lt(1)').css('background-color','red');
> });
> ```
### ⑦ :even，选择索引(0 开始)是偶数的所有元素，返回元素集合
> ```javascript
> $(function(){ 
>     //css模式
>     // li:even{ background-color:red }
>     //jQuery模式
>     $('li:even').css('background-color','red');
> });
> ```
### ⑧ :odd，选择索引(0 开始)是奇数的所有元素，返回元素集合
> ```javascript
> $(function(){ 
>     //css模式
>     // li:odd{ background-color:red }
>     //jQuery模式
>     $('li:odd').css('background-color','red');
> });
> ```
### ⑨ :header，选择标题元素，h1 ~ h6，返回元素集合
> ```javascript
> $(function(){ 
>     //css模式
>     // :header{ background-color:red }
>     //jQuery模式
>     $(':header').css('background-color','red');
> 
>     //指定范围 div里面的
>     // $('div :header').css('background-color','red');
>     //不写空格就要指定元素
>     // $('h3:header').css('background-color','red');
> });
> ```
### ⑩ :focus，选择当前被焦点的元素，一般用在表单元素上
> ```javascript
> $(function(){ 
>   //js原生提供了一个focus()方法，聚焦输入框，基础里面讲过
>   $('input').get(0).focus(); //首先得有一个元素聚焦，才能选择
>   //jQuery也有提供了一个focus()方法
>   // $('input').eq(0).focus();
>   $(':focus').css('background', 'red'); //被焦点的元素
> });
> ```

## 7、内容过滤器
> 内容过滤器的过滤规则主要是包含的子元素或文本内容上
### ① :contains(text)，选取含有text文本的元素，返回元素集合
> ```javascript
> $(function(){ 
>     //在整个页面li元素里面找：文本含有“古天乐”的元素的父节点
>     $('li:contains("古天乐")').css('background-color','red');
> 
>     // $('h2:contains("div里面")').css('background-color','red');
>     // $('div :contains("h2")').css('background-color','red');
> });
> ```
### ② :empty，选取不包含子元素或空文本的元素，返回元素集合
> ```javascript
> $(function(){ 
>     console.log($(':empty'));
>     $('div:empty').css('background-color','red').css('height','50px');
> });
> ```

### ③ :has(selector)，如：:has(.active) 选择后代元素含有class 是active 的元素，jQuery提供has()方法
> ```javascript
> $(function(){ 
>     //选择后代元素含有class 是active 的元素
>     $('ul:has(.active)').css('background-color','red');
>     // $('li:has(.active)').css('background-color','red');
>
>     //jQuery提供has()方法
>     $('li').has('.active').css('background-color','red');
> });
> ```
### ④ :parent，与:empty刚好相反，选取含有子元素或文本的元素，返回元素集合
> ```javascript
> $(function(){ 
>     // $('div:empty').css('background-color','red').css('height','50px');
>     $('div:parent').css('background-color','red');
> });
> ```

## 8、jQuery提供：parent()、parents()、parentsUntil方法特别说明
### ① jQuery提供：parent()方法：选取当前元素的父元素，注意与 :parent的区别
> ```javascript
> $(function(){ 
>     //首先是span元素，并且span元素的class="active",找到这个元素的父元素，就是p
>     $('span.active').parent().css('background-color','red');
> });
> ```
### ② jQuery提供：parents()方法：选择当前元素的父元素及祖先元素
> ```javascript
> $(function(){ 
>     //首先是span元素，并且span元素的class="active",找到这个元素的父元素及祖先元素body
>     $('span.active').parents().css('background-color','red');
> });
> ```
### ③ jQuery提供：parentsUntil方法，如：parentsUntil('ul') 选择当前元素往上一层级查找，遇到ul元素停止
> ```javascript
> $(function(){ 
>     //首先是span元素，并且span元素的class="active",依次找这个元素的上一层元素，直到遇到ul停止
>     $('span.active').parentsUntil('ul').css('background-color','red');
> });
> ```

## 9、可见性过滤器
> 可见性过滤器根据元素的可见性和不可见性来选择相应的元素
### ① :hidden，选取所有不可见元素，返回元素集合，一般包含：CSS 样式为 display:none、input 表单类型为type="hidden"和 visibility:hidden 的元素
> ```javascript
> <h2 style="display: none;">我是h2</h2>
> ```
> ```javascript
> $(function(){ 
>   //:hidden  选取所有不可见元素
>   // console.log($(':hidden'));
>   // console.log($('h2:hidden'));
>   $('h2:hidden').css('background-color','red');
> });
> ```
### ② :visible，选取所有可见元素
> ```javascript
> $(function(){ 
>   //可见的元素
>   $('h2:visible').css('background-color','red');
> });
> ```
## 10、子元素过滤器
> 是通过父元素和子元素的关系来获取相应的元素
### ① :first-child，获取每个父元素的第一个子元素，返回元素集合
> ```javascript
> $(function(){
> //css模式
> //找到所有的li元素，先把这些li元素返回到它的父元素，然后依次找每个父元素第一个子元素li
> // li:first-child{ background-color:red }
> //jQuery模式
> // $('li:first').css('background-color','red');
> $('li:first-child').css('background-color','red');
> //第一个ul的第一个子元素
> // $('ul:first li:first-child').css('background-color','red');
> // $('ul:first li:first').css('background-color','red');
> });
> ```
### ② :last-child，获取每个父元素的最后一个子元素，返回元素集合
> ```javascript
> $(function(){
> //css模式
> // li:last-child{ background-color:red }
> //jQuery模式
> $('li:last-child').css('background-color','red');
> //第一个ul的最后一个子元素
> // $('ul:first li:last-child').css('background-color','red');
> // $('ul:first li:last').css('background-color','red');
> });
> ```
### ③ :only-child，获取只有一个子元素的元素，返回元素集合
> ```javascript
> <ul>
>    <li>只有一个li</li>
> </ul>
> ```
> ```javascript
> //css模式
> // li:only-child{ background-color:red }
> //jQuery模式
> $('li:only-child').css('background-color','red');
> ```

### ④ :nth-child(odd/even/eq(index))，获取每个自定义子元素的元素(索引值从 1 开始计算)
> ```javascript
> //css模式 索引从1开始的
> // li:nth-child(1){ background-color:red }
> // li:nth-child(3n+1){ background-color:red }
> // li:nth-child(odd){ background-color:red } //奇数
> // li:nth-child(even){ background-color:red } //偶数
> //jQuery模式
> // $('li:nth-child(1)').css('background-color','red');
> $('li:nth-child(3n+1)').css('background-color','red');
> // $('li:nth-child(odd)').css('background-color','red');
> // $('li:nth-child(even)').css('background-color','red');
> ```

## 11、jQuery提供选择器和过滤器方法
### ① is()方法：传递选择器、DOM、jquery 对象、函数
> ```javascript
> //传递的是：选择器，检测class="active" 是否是li元素
> console.log($('.active').is('li'));//true
> //传递的是：jquery 对象
> console.log($('.active').is($('li')));//true
> console.log($('.active').is($('li').eq(2)));//true
> //传递的是：dom元素对象
> console.log($('.active').is($('li').get(2)));//true
> //传递一个匿名函数
> let flag = $('.active').is(function(){
>    // console.log($(this).text())
>    //判断一下class="active"的元素中，有没有文本值为'黑丝空姐'的
>    //$(this) 代表class="active"的元素
>    return $(this).text() == '黑丝空姐';
> });
> console.log(flag);//true
> ```

### ② hasClass方法，hasClass(); hasClass(class)，判断某个元素是否有某个class，比较常用，和 is 一样，只不过只能传递class
> js基础课程里面，我们通过原生js方法封装了一个函数hasClass()：<a href="/secondless/w-a/网页文档对象模型DOM.html#_2-hasclass-判断是否存在某个类名" target="_blank">第二学期第1季——章节15-7、操作页面样式-②点</a>，这里jQuery给我们也封装了这个方法hasClass()
> ```javascript
> //判断整个页面上，索引为2也就是第3个li元素是否含有 class="active"
> console.log($('li').eq(2).hasClass('active'));//true
> ```
### ③ slice方法，slice(start, end)，选择从 start 到 end 位置的元素，如果是负数，则从后开始
> ```javascript
> // $('li').slice(2).css('background-color','red');;//从索引2的位置往后选
> // $('li').slice(-2).css('background-color','red');;//负数从后面开始选，最后一个是-1，选到-2
> // $('li').slice(0,2).css('background-color','red');;//从索引0的位置取到索引2的位置
> // $('li').slice(2,4).css('background-color','red');;//从索引2的位置取到索引4的位置
> // $('li').slice(0,-2).css('background-color','red');//从0的位置往下选，从-2的位置往上选
> ```
### ④ end方法，end()，获取当前元素前一次状态：可以找它的父节点，也可以找它的相邻前一个兄弟节点
> ```javascript
> //通过li元素找它的父元素
> // $('ul:first').find('li').end().css('background-color','red');
> //等同于
> // $('ul:first').find('li').parent().css('background-color','red');
> 
> //找它的同级节点
> $('ul:first').next().end().css('background-color','red');
> ```

### ⑤ contents方法，contents()，获取某元素下面所有元素节点，包括文本节点，如果是 iframe，则可以查找文本内容
> ```javascript
> <div id="box">
>    我是文本1
>    <strong>我是文本2</strong>
>    我是文本3
> </div>
> 
> //children()方法获取的是子节点，不包括文本节点
> console.log($('#box').children().length);//1
> //contents()方法获取的是子节点，包括文本节点
> console.log($('#box').contents());
> let contentnode = $('#box').contents();
> console.log(contentnode[0].textContent);
> ```
### ⑥ filter方法，filter()，比较灵活的选择器，扩展性较好
> ```javascript
> //整个页面选择第一个li,最后一个li,class="active"的li元素
> // $('li.active,li:first,li:last').css('background','red');
> //还可以
> // $('li').filter('.active,:first,:last').css('background','red');
> //用函数判断返回
> $('li').filter(function () {
>    return $(this).attr('class') == 'active' && $(this).text() == '黑丝空姐';
> }).css('background', 'red');
> ```

## 12、表单选择器
> 关于表单选择器，我们在<a href="/secondless/w-a/表单处理及错误处理与调试.html#i、表单基础知识" target="_blank">第二学期第1季课程——章节17</a> 已经给大家详细讲过了，我们可以采用js原生dom对象获取表单组件，也可以使用HTML DOM对象获取表单组件，具体大家可以回去查看章节17的内容。由于我们现在要讲的是利用jQuery获取表单组件，所以，为了避免大家学了jQuery忘记了js的基本操作，我们这里就对比讲，我们先用原生js方式来获取表单组件，然后我们讲用jQuery方式来获取表单组件。
> ```javascript
> <form id="myForm" name="yourForm" style="padding: 50px;">
>    <!-- 下拉列表 -->
>    <p>
>          <select name="usertype">
>             <option value="学生value">学生text</option>
>             <option value="老师value">老师text</option>
>             <option value="管理员value">管理员text</option>
>             <option>无</option>
>          </select>
>    </p>
>    <!-- 文本框 -->
>    <p>
>       账号：<input type="text" name="user" value="abc" />
>    </p>
>    <!-- 单选 -->
>    <p>
>          <input type="radio" name="sex" value="男" checked="checked"> 男
>          <input type="radio" name="sex" value="女" >  女
>    </p>
>    <!-- 多选 -->
>    <p>
>          <input type="checkbox" name="loves" value="篮球" checked="checked"> 篮球
>          <input type="checkbox" name="loves" value="足球" >  足球
>          <input type="checkbox" name="loves" value="乒乓球" >  乒乓球
>    </p>
>    <!-- 多行文本框 -->
>    <p>
>          <textarea name="content"  cols="30" rows="10">我是多行文本</textarea>
>    </p>
>    <!-- 提交按钮 -->
>    <p>
>          <input type="button" value="输入框类型换button提交" id="sub">
>          <input type="submit" value="输入框类型换submit可以自动提交">
>          <button>普通button按钮可以自动提交</button>
>    </p>
> </form>
> ```
> <b>1、先分析一下按钮</b> <br/>
> 在form表单中，普通button按钮 和 type="submit"类型的组件，可以触发表单的自动提交行为<br/>
> 我们这里采用第一个按钮的点击事件来处理，因为我们重点是回忆表单数据的获取情况：<br/><br/>
> <b>2、原生js获取表单提交数据</b> 
> ```javascript
> window.onload = function () {
>     //为了方便大家回忆，我们以对象形式获取各个表单组件及数据
>     //声明一个变量接收这些组件的值
>     let obj = {
>         //下拉列表想得到value值和页面上展示的文本值
>         usertype: {},
>     };
>     let form = {
>         //下拉列表usertype
>         usertypefn: function () {
>             let fm = document.getElementById('myForm');
>             //HTML DOM方式获取下拉列表组件
>             let usertypeSelect = fm.elements['usertype'];//name属性值获取
>             //获取下拉列表选择的value值和文本值，通过监听下拉列表的change事件
>             usertypeSelect.addEventListener('change', function () {
>                 //console.log(this.selectedIndex);//得到当前选项的索引，从0开始
>                 console.log('当前选择的项的文本', this.options[this.selectedIndex].text);
>                 console.log('当前选择的项的值', this.options[this.selectedIndex].value);
>                 obj.usertype.value = this.options[this.selectedIndex].value;
>                 obj.usertype.text = this.options[this.selectedIndex].text;
>             }, false);
>         },
>         //文本框username
>         usernamefn: function () {
>             let fm = document.getElementById('myForm');
>             //HTML DOM方式获取文本框组件
>             let username_input = fm.elements['username'];//name属性值获取
>             //通过value属性获取，获取的值赋值给obj最后查看
>             username_input.oninput = function () {
>                 console.log('文本框username的值', this.value);
>                 obj.username = this.value;
>             }
>         },
>         //单选框sex
>         sexfn: function () {
>             //得到单选框选择的值
>             function radioSelect() {
>                 let select = '';
>                 let fm = document.getElementById('myForm');
>                 let radios = fm.elements['sex'];
>                 for (let i = 0; i < radios.length; i++) { //循环单选按钮
>                     //if(radios[i].defaultChecked == true){ //遍历每一个找出页面上默认设置了checked属性的选项
>                     if (radios[i].checked == true) { //遍历每一个找出选中的那个
>                         select = radios[i].value; //把选中的那个单选按钮值赋值给变量select
>                         break;//退出for循环，终止后面的循环
>                     }
>                 }
>                 return select;
>             }
>             //赋值给obj变量
>             obj.sex = radioSelect();
>         },
>         //多选框loves
>         lovesfn: function () {
>             //得到多选框的值
>             function checkBoxSelect() {
>                 let select = '';
>                 let fm = document.getElementById('myForm');
>                 let checkBox = fm.elements['loves'];
>                 for (let i = 0; i < checkBox.length; i++) { //循环多选按钮
>                     //if(checkBox[i].defaultChecked == true){ //遍历每一个找出页面上默认设置了checked属性的选项
>                     if (checkBox[i].checked == true) { //遍历每一个找出选中的那个
>                         if (select) {
>                             select += ',' + checkBox[i].value; //把选中的那个单选按钮值赋值给变量select
>                         } else {
>                             select = checkBox[i].value;
>                         }
>                         //select += ',' +  checkBox[i].value; //把选中的那个单选按钮值赋值给变量select
>                     }
>                 }
>                 return select;
>             }
>             //赋值给obj变量
>             obj.loves = checkBoxSelect();
>         },
>         //多行文本框content
>         contentfn:function(){
>             let fm = document.getElementById('myForm');
>             //HTML DOM方式获取多行文本框组件
>             let content_textarea = fm.elements['content'];//name属性值获取
>             //通过value属性获取，获取的值赋值给obj最后查看
>             content_textarea.oninput = function () {
>                 console.log('多行文本框content的值', this.value);
>                 obj.content = this.value;
>             }
>         }
>     };
>     //执行一下form对象里面的这些方法
>     form.usertypefn();
>     form.usernamefn();
>     form.contentfn();
> 
>     //提交信息查看
>     let sub = document.getElementById('sub');
>     let fm = document.getElementById('myForm');
>     sub.addEventListener('click', function (e) {
>         //alert('提交按钮');
>         //fm.submit();//让form执行submit方法提交数据
>         //看一下提交的值
>         form.sexfn();//找一下最终单选的结果
>         form.lovesfn();//找一下最终多选的结果
>         console.log(obj);
> 
>     }, false);
> }
> ```
> ### ① jQuery方法：通过type类型或者name字段获取表单组件，通过val()方法获取表单组件的值
> ```javascript
> //表单选择器
> $(':input').size(); //获取所有表单字段元素
> $(':text).size(); //获取单行文本框元素
> $(':password').size(); //获取密码栏元素
> $(':radio).size(); //获取单选框元素
> $(':checkbox).size(); //获取复选框元素
> $(':submit).size(); //获取提交按钮元素
> $(':reset).size(); //获取重置按钮元素
> $(':image).size(); //获取图片按钮元素
> $(':file).size(); //获取文件按钮元素
> $(':button).size(); //获取普通按钮元素
> $(':hidden).size(); //获取隐藏字段元素
> //限定范围
> $('#myForm :hidden).size(); //获取myForm表单下面隐藏字段元素
> //表单过滤器
> $(':enabled').size(); //获取可用元素
> $(':disabled).size(); //获取不可用元素
> $(':checked).size(); //获取单选、复选框中被选中的元素
> $(':selected).size(); //获取下拉列表中被选中的元素
> ```
> 这些选择器都是返回元素集合，如果想获取某一个指定的元素，最好结合一下属性选择器
> ```javascript
> $(':text[name=username]).size(); //获取单行文本框name=username 的元素
> ```
> ### ② jQuery获取表单提交数据
> ```javascript
> $(function(){
>    $('#sub').click(function(){
>         //alert('提交按钮');
>         let obj = {
>             usertype: {},
>         };
>         //文本框： 选择 name 为 username 的字段
>         let username = $('input[name=username]').val();
>         obj.username = username;
>         //多行文本框： 选择 name 为 content 的字段
>         let content = $('textarea[name=content]').val();
>         obj.content = content;
>         //下拉列表name=usertype被选中的项值
>         // console.log($(':selected'));
>         obj.usertype.value = $(':selected')[0].value; 
>         obj.usertype.text = $(':selected')[0].text; 
>         //单选框name=sex被选中的项值
>         // console.log($(':checked'));
>         // console.log($(':checked[name=sex]'));
>         obj.sex = $(':checked[name=sex]')[0].value;
>         //多选框name="loves"被选中的项值
>         // console.log($(':checked[name=loves]'));
>         // console.log($(':checked[name=loves]').length);
>         //选中的结果逗号隔开
>         let loves = $(':checked[name=loves]');
>         obj.loves = '';
>         for(let i=0;i<loves.length;i++){
>             if(!obj.loves){
>                 obj.loves = loves[i].value;
>             }else{
>                 obj.loves += ',' + loves[i].value;
>             }
>         }
>         
>         //最终提交结果
>         console.log(obj);
>    });
> });
> ```

## 二、jQuery操作DOM及CSS
> 在<a href="/secondless/w-a/网页文档对象模型DOM.html#_3、操作节点" target="_blank">第二学期第1季课程-章节15-3.操作节点</a> 我们已经讲了js原生操作DOM和CSS的一些方法，接下来我们看一下jQuery给我们提供的操作DOM及CSS的一些方法，注意：<span style="color:#00A5F7">jQuery给我们提供的方法固然全面好用，但是也不能忘了原生js提供的方法</span>
## 1、设置元素及内容：html(),html(value),text(),text(value)
> ```javascript
> <div id="box">
>   我是div里面的文本1
>   <span>我是div里面的span</span>
>   我是div里面的文本2
> </div>
> $(function(){
>     //原生js操作
>     /*
>     let box = document.getElementById('box');
>     //获取元素中 HTML 内容
>     console.log(box.innerHTML);
>     //设置元素中 HTML 内容
>     box.innerHTML = `大哥<strong>二弟</strong>三弟`;
>     //获取元素中文本内容，会自动清理html 标签
>     console.log(box.innerText);
>     //设置元素中文本内容，不会转义html标签，原样输出
>     box.innerText ='<b>古天乐刘德华</b>';
>     */
> 
>     //jQuery操作
>     //获取元素中 HTML 内容
>     console.log($('#box').html());
>     //设置元素中 HTML 内容
>     $('#box').html('大哥<strong>二弟</strong>三弟');
>     //获取元素中文本内容，会自动清理html 标签
>     console.log($('#box').text());
>     //设置元素中文本内容，不会转义html标签，原样输出
>     $('#box').text('<b>古天乐刘德华</b>');;
> });
> ```
## 2、获取或设置表单内容：val()，val(value)
> ```javascript
> <input type="text" name="username" value="123" />
> $(function(){
>     //获取表单文本框内容
>     console.log($('input[name=username]').val());
>     //设置表单内容
>     $('input[name=username]').val('迪丽热巴');
> });
> ```
## 3、设置单选框、复选框默认选中状态val()，非常好用
> ```javascript
> <input type="radio" name="sex" value="男" > 男
> <input type="radio" name="sex" value="女" > 女
> <input type="checkbox" name="loves" value="篮球" > 篮球
> <input type="checkbox" name="loves" value="足球" >  足球
> <input type="checkbox" name="loves" value="乒乓球" >  乒乓球
> $(function(){
>     $("input").val(["女","足球", "乒乓球" ]); //value 值是这些的将被选定
> });
> ```
## 4、元素属性操作：attr()和 removeAttr()
> ```javascript
> <div id="box">
>    我是div里面的文本1
>    <span>我是div里面的span</span>
>    我是div里面的文本2
> </div>
> $(function(){
>     /*
>     //原生js获取属性
>     let box = document.getElementById('box');
>     console.log(box.getAttribute('id'));
>     //原生js设置属性
>     box.setAttribute('data',123);
>     //元素js移除属性
>     box.removeAttribute('data');
>     */
> 
>     //jQuery
>     // console.log($('#box').attr('id'));//获取
>     // $('#box').attr('data',123);//设置
>     // $('#box').removeAttr('data');//移除
>     //多个div设置
>     // $('div').attr('data','456');
>     
>     //传递对象，设置多个属性
>     $('#box').attr({
>         'class':'red', //举个例子，class有专门的方法设置
>         'title':'迪丽热巴',
>         'data':789
>     });
> 
>     //传函数，index就是div的索引，从0开始的，value表示该元素原来的属性值，没有这个属性就是undefined
>     $('div').attr('title',function(index,value){
>         return "原来title:"+ value + ", 现在title：我是页面上索引是" + index + "的div";
>     });
> });
> ```
> 延伸：jQuery中的很多方法，如：html()、text()、val()，及前面讲的is()、filter()方法都可以传递函数（removeAttr()方法不行）
> ```javascript
> $(function(){
>     //以html方法为例
>     // $('#box').html('大哥<strong>二弟</strong>三弟');
>     // $('#box').html($('#box').html() +  '大哥<strong>二弟</strong>三弟');
>     //写成函数
>     $('#box').html(function(index,value){
>       return  value + '大哥<strong>二弟</strong>三弟';
>     });
> });
> ```
## 5、元素CSS样式操作：
## Ⅰ、css()方法
### ① css()方法获取、设置元素样式
> ```javascript
> <div id="box">
>    我是div里面的文本1
>    <span>我是div里面的span</span>
>    我是div里面的文本2
> </div>
> ```
> 回忆原生js获取元素样式(行内、内联、外联样式) 参考：<a href="/secondless/w-a/网页文档对象模型DOM.html#_3-计算后的样式获取-行内、内联、外联样式-window-对象下getcomputedstyle-方法" target="_blank">第二学期第1季——章节15——6、操作CSS样式-③ 计算后的样式获取</a>
> ```javascript
> $(function(){
>     //原生获取css属性，包括计算后的属性、行内属性、外联属性
>     let box = document.getElementById('box');
>     let style = window.getComputedStyle(box,null);
>     console.log(style.fontSize);
>     console.log(style.height);
>     //设置样式
>     box.style.background = 'red';
> });
> ```
> ```javascript
> $(function(){
>     //jQuery的css()方法直接获取行内、内联、外联，计算后的样式
>     console.log($('#box').css('font-size'));
>     console.log($('#box').css('height'));
>     //设置
>     $('#box').css('background','red');
> });
> ```
### ② css()方法传递多个样式属性的数组，得到样式属性值对象数组，$.each(box,function(attr,value){})遍历原生态对象数组，jQuery对象数组采用$(selector).each(function(index,element){})方法遍历
> ```javascript
> $(function(){
>     //得到多个 CSS 样式的对象数组
>     let box = $('#box').css(['color','font-size','height']);
>     console.log(box);
>     //对象数组采用for...in 循环遍历
>     for(let i in box){
>         //console.log(i);
>         console.log('属性：' + i + '--值：' + box[i]);
>     }
>  
>     //$.each()方法遍历对象数组
>     $.each(box,function(attr,value){
>         console.log('遍历属性：' + attr + '--值：' + value);
>     });
> });
> ```
> jQuery对象数组采用$(selector).each(function(index,element){})方法遍历
> ```javascript
> $(function(){
>     $('div').each(function(index,element){
>         console.log('每个对象索引', index);
>         console.log('每个div元素对象',element)
>     });
> });
> ```

### ③ css()方法传递多个 CSS 样式的键值对
> ```javascript
> $(function(){
>     //连缀
>     // $('#box').css('color','red').css('font-size','50px').css('background-color','blue');
>     //传对象，类似css样式表的写法
>     $('#box').css({
>         'color':'red',
>         'font-size':'50px',
>         'background-color':'blue'
>     });
> });
> ```

### ④ css()方法可以传匿名函数
> ```javascript
> $(function(){
>     console.log($('#box').css('height'));
>     $('#box').css('height',function(index, value){
>         //在匿名函数里面计算代码很清晰
>         return (parseInt(value) + 100) + 'px';
>     });
> });
> ```

## Ⅱ、addClass()方法、removeClass()方法、toggleClass()方法
### ① addClass()方法、removeClass()方法
> 关于addClass()方法、removeClass()方法我们在基础课程已经封装过了，详见：<a href="/secondless/w-a/网页文档对象模型DOM.html#_3-addclass-如果不存在的这个类名-添加这个类名" target="_blank">addClass()方法、removeClass()方法</a>
> ```javascript
> $(function(){
>     //addClass添加单个class，可连缀
>     // $('#box').addClass('bg-danger').addClass('font-lg');
>     //多个class
>     $('#box').addClass('bg-danger font-lg py-2 text-white ');
>     //removeClass删除单个class，可连缀
>     $('#box').removeClass('text-white');
>     //删除多个
>     $('#box').removeClass('bg-danger font-lg py-2');
> });
> ```
### ② toggleClass()方法：切换class
> ```javascript
> //以结合事件来实现 CSS 类的样式切换功能
> $(function(){
>     $('#box').click(function () { //当点击后触发
>         //默认样式和点击之后样式的切换
>         $(this).toggleClass('bg-danger font-lg'); //单个样式多个样式均可
>     });
> });
> ```
> toggleClass()方法的第二个参数可以传入一个布尔值，true 表示执行切换到class 类，false表示执行回默认 class 类(默认的是空 class)，运用这个特性，我们可以设置切换的频率。
> ```javascript
> $(function(){
>     //第二个参数，true表示可以切换到'bg-danger font-lg'，false表示执行回默认 class 类(默认的是空 class)
>     // $('#box').click(function () { 
>     //     $(this).toggleClass('bg-danger font-lg', true);
>     // });
> 
>     // 每点击两次切换一次bg-danger，第一次点击内部机制除外
>     let count = 0;
>     $('#box').click(function () { 
>        // % 求余数，第1季基础知识
>        $(this).toggleClass('bg-danger font-lg', count++ % 3 == 0);
>     });
> });
> ```
> 默认的 CSS 类切换只能是无样式和指定样式之间的切换，如果想实现样式1 和样式2之间的切换须写一些逻辑
> ```javascript
> $(function(){
>     //先给div设置一个bg-success，叫样式1，或者叫默认样式
>     $('#box').addClass('bg-success');
>     //实现div在样式1：bg-success和样式2：bg-danger之间切换
>     $('#box').click(function () { 
>         //逻辑写在click事件里面
>         if ($(this).hasClass('bg-success')) { 
>             $(this).removeClass('bg-success').addClass('bg-danger'); 
>         } else {
>             $(this).removeClass('bg-danger').addClass('bg-success'); 
>         }
>     });
> });
> 
> //看一下toggleClass怎么写
> $(function () {
>     //先给div设置一个bg-success，叫样式1，或者叫默认样式
>     $('#box').addClass('bg-success');
>     //toggleClass传一个匿名函数，讲逻辑写在匿名函数里面
>     $('#box').click(function () {
>         $(this).toggleClass(function (index, className, switchBool) {
>             console.log('索引index',index);
>             console.log('class 类名',className);
>             console.log('频率布尔值',switchBool);
>             if ($(this).hasClass('bg-success')) {
>                 $(this).removeClass('bg-success');
>                 return 'bg-danger';
>             } else {
>                 $(this).removeClass('bg-danger');
>                 return 'bg-success';
>             }
>         });
>     });
> });
> //感觉toggleClass写起来还麻烦一点，理解有点麻烦，作为了解
> //如果介意局部作用域和全局作用域的同学，可以采用toggleClass，一般我们采用上面的判断
> //感兴趣的同学了解一下toggleClass里面的参数
> ```

## Ⅲ、jQuery提供其他css操作方法
> 我们在第二学期第1季：<a href="/secondless/w-a/网页文档对象模型DOM.html#_9、dom元素尺寸-元素大小-和位置-元素位置" target="_blank">章节15-9、DOM元素尺寸（元素大小）和位置（元素位置）</a>讲了js提供给我们的关于DOM元素尺寸、位置、周边大小、滚动条的方法，我们来看一下jQuery在这些方法的基础上，给我们封装的的方法
### ① jQuery提供：width()、width(value)、width(function (index, width) {})方法：获取、设置、通过匿名函数设置某个元素的长度
> ```javascript
> $(function () {
>     //js原生，具体看第1季章节15：9、DOM元素尺寸（元素大小）
>     let banner = document.getElementById('banner');
>     //style 获取行内css大小
>     console.log(banner.style.width);//空  设置值
>     //通过计算getComputedStyle()方法获取元素大小
>     let style = window.getComputedStyle(banner,null);
>     console.log(style.width);
>     banner.style.width = '500px';//设置
>     
>     //jQuery
>     // console.log($('#banner').css('width'));
>     // console.log($('#banner').width());//获取元素的长度，返回的类型为number
>     // $('#banner').width(500); //设置元素长度，直接传数值，默认加px
>     // $('#banner').width('500pt'); //同上，设置了 pt 单位
>     // $('#banner').width(function (index, value) { 
>     //     //index 是索引，value 是原本值
>     //     console.log(value);
>     //     return value - 500; //无须调整类型，直接计算
>     // });
> });
> ```
### ② jQuery提供：height()、height(value)、height(function (index, width) {})方法：获取、设置、通过匿名函数设置某个元素的高度
> ```javascript
> $(function () {
>     //js原生，具体看第1季章节15
>     let banner = document.getElementById('banner');
>     //style 获取行内css大小
>     console.log(banner.style.height);//空  设置值
>     //通过计算getComputedStyle()方法获取元素大小
>     let style = window.getComputedStyle(banner,null);
>     console.log(style.height);
>     banner.style.height = '500px';//设置
>     
>     //jQuery
>     // console.log($('#banner').css('height'));
>     // console.log($('#banner').height());//获取元素的长度，返回的类型为number
>     // $('#banner').height(500); //设置元素长度，直接传数值，默认加px
>     // $('#banner').height('500pt'); //同上，设置了 pt 单位
>     // $('#banner').height(function (index, value) { 
>     //     //index 是索引，value 是原本值
>     //     return value - 100; //无须调整类型，直接计算
>     // });
> });
> ```

### ③ jQuery提供内外边距和边框尺寸方法：innerWidth()，innerHeight()，outerWidth()，outerHeight()，outerWidth(ture)，outerHeight(true)
> 学习之前，我们先回顾一下第1季：获取元素实际大小，js提供的原生属性方法，关于它们的区别写得非常清楚 <br/>
> #### 1. clientWidth 和 clientHeight：获取可视区的元素大小，可以得到元素内容及内边距所占据的空间大小;<br/>
> #### 2. scrollWidth 和 scrollHeight：获取滚动内容的元素大小;<br/>
> #### 3. offsetWidth 和 offsetHeight：获取元素大小，包含边框、内边距和滚动条<br/><br/>
> 看一下jQuery提供的方法，代表的意思：<br/>
> 以宽度为例，高度是一样
> ```javascript
> $(function () {
>     console.log($('#box').width()); //不包含
>     console.log($('#box').innerWidth()); //包含内边距 padding
>     console.log($('#box').outerWidth()); //包含内边距 padding+边框border
>     console.log($('#box').outerWidth(true)); //包含内边距 padding+边框border+外边距margin
>     //高度是一样
> });
> ```
### ④ jQuery提供元素偏移方法：offset()、position()、scrollTop()、scrollTop(value)、scrollLeft()、scrollLeft(value)
> 学习之前，我们先回顾一下第1季：获取元素周边大小，js提供的原生属性方法，关于它们的区别写得非常清楚<br/>
> #### 1. clientLeft 和 clientTop:获取元素设置了左边框和上边框的大小<br/>
> #### 2. offsetLeft 和 offsetTop：获取当前元素相对于父元素的位置;<br/>
> #### 3. scrollTop 和 scrollLeft：这组属性可以获取滚动条被隐藏的区域大小（滚动条滚动高度宽度），也可设置定位到该区域（定位滚动条）<br/>
> #### 4. getBoundingClientRect()方法：返回一个矩形对象，包含四个属性：left、top、right和 bottom，分别表示元素各边与页面上边和左边的距离<br/><br/><br/>
> 
> 看一下jQuery提供的方法，代表的意思：<br/>
> #### 1. offset()：获取某个元素相对于视口（浏览器左上角不包括浏览器的收藏栏地址栏）的偏移位置<br/>
> #### 2. position()：获取某个元素相对于父元素的偏移位置<br/>
> #### 3. scrollTop()：获取垂直滚动条的值<br/>
> #### 4. scrollTop(value)：设置垂直滚动条的值<br/>
> #### 5. scrollLeft()：获取水平滚动条的值<br/>
> #### 6. scrollLeft(value)：设置水平滚动条的值<br/>
> 
> 示例：
> ```javascript
> $('#box').offset().left; //相对于视口（浏览器左上角不包括浏览器的收藏栏地址栏）的偏移
> $('#box').position().left; //相对于父元素的偏移
> $(window).scrollTop(); //获取当前滚动条的位置
> $(window).scrollTop(300); //设置当前滚动条的位置
> ```
> 关于元素偏移方法，我们在第1季基础里面已经讲的非常清楚了，所以这里就不再细讲了，jQuery提供这些方法，本质上是在我们第1季讲的js原生方法的基础上，进行了封装，使得我们操作更加好用，这里大家可以用原生的，也可以用jQuery提供的，没有硬性要求，关于这些方法的具体用法，我们在后面的项目中，再给大家体验。

## Ⅳ、jQuery提供的DOM节点操作方法
> 我们在第1季课程：<a href="/secondless/w-a/网页文档对象模型DOM.html#_3、操作节点" target="_blank">章节15-3、操作节点</a>给大家讲了js原生提供给我们的操作节点的方法：createElement()、appendChild()、createTextNode()、insertBefore()、模拟在指定节点的后面添加一个节点、repalceChild()、cloneNode()、removeChild()方法，我们本节课看一下jQuery通过封装这些原生的js方法，给我们提供了哪些好用的操作我们DOM节点的方法。
## 1、创建节点
> ```javascript
> $(function(){
>     //js原生
>     // let p = document.createElement('p');//只是创建了一个元素p,还没有添加到文档中去，只是驻留在内存中
>     // let $div = document.getElementById('box');
>     // $div.appendChild(p);//把新元素节点<p>添加子节点末尾
>     // let text = document.createTextNode('迪丽热巴');//创建一个文本节点
>     // p.appendChild(text);//将文本节点添加到p元素里面节点末尾
> 
>     //jQuery
>     let p = $('<p>迪丽热巴</p>'); //创建一个节点
>     $('#box').append(p); //将节点插入到box元素内部末尾
> });
> ```
## 2、插入节点
### ① 内部插入节点 append(content)：向指定元素内部后面插入节点content
> ```javascript
> $(function(){
>     let p = $('<p>迪丽热巴</p>'); //创建一个节点
>     $('#box').append(p); //将节点插入到box元素内部末尾
>     //也可以写一个匿名函数插入
>     $('#box').append(function (index, html) { //使用匿名函数插入节点，html 是原节点
>        return '<p>古力娜扎</p>';
>     });
> });
> ```
### ② 内部移入节点（不需要创建节点） appendTo(content)：将指定元素移入到指定元素content 内部后面
> ```javascript
> $(function(){
>     //appendTo(content),注意用法：
>     //前面写要移动的元素，后面是移到哪个元素内部后面
>     $('#box').appendTo('#main_business');
> });
> ```
### ③ 内部插入节点 prepend(content)：向指定元素 content 内部的前面插入节点
> ```javascript
> $(function(){
>     let p = $('<p>迪丽热巴</p>'); //创建一个节点
>     $('#box').prepend(p); //将节点插入到box元素内部前面
>     //也可以写一个匿名函数插入
>     $('#box').prepend(function (index, html) { //使用匿名函数插入节点，html 是原节点
>         return '<p>古力娜扎</p>';
>     });
> });
> ```
### ④ 内部移入节点（不需要创建节点） prependTo(content)：将指定元素移入到指定元素content 内部前面
> ```javascript
> $(function(){
>     //prependTo(content),注意用法：
>     //前面写要移动的元素，后面是移到哪个元素内部前面
>     $('#box').prependTo('#main_business');
> });
> ```
### ⑤ 外部（同级）插入节点 before(content)：向指定元素的外部前面插入节点content
> ```javascript
> $(function(){
>     //js原生外部（同级）插入
>     //同级前面：insertBefore()
>     // let $div = document.getElementById('box');
>     // let p = document.createElement('p');
>     //注意写法：将新增的p元素放到div元素前面，首先找到div的父节点，在操作
>     // $div.parentNode.insertBefore(p,$div);//参数1：新节点，参数2：放在谁的前面
>     //js原生没有提供在同级后面插入的操作，模拟了一个方法
> 
>     //jQuery提供同级前面插入before(content)
>     $('#box').before('<p></p>');
>     //写函数
>     $('#box').before(function (index, html) { 
>         return '<p></p>';
>     });
> });
> ```
### ⑥ 外部（同级）移到节点 （不需要创建节点）insertBefore(content)：将指定节点移到指定元素content 外部的前面
> ```javascript
> $(function(){
>     //将存在的box元素移到#main_business的同级前面
>     $('#box').insertBefore('#main_business');
> });
> ```
### ⑦ 外部（同级）插入节点 after(content)：向指定元素的外部后面插入节点content
> ```javascript
> $(function(){
>     //js原生没有提供同级后面插入一个节点，当时是模拟了一个
>     //jQuery提供了after方法
>     // $('#box').after('<p></p>');
>     //写函数
>     $('#box').after(function (index, html) { 
>         return '<p></p>';
>     });
> });
> ```
### ⑧ 外部（同级）移到节点 （不需要创建节点）insertAfter(content)：将指定节点移到指定元素content 外部的后面
> ```javascript
> $(function(){
>     //将存在的box元素移到#main_business的同级后面
>     $('#box').insertAfter('#main_business');
> });
> ```
## 3、包裹节点
> jQuery 提供了一系列方法用于包裹节点，那包裹节点是什么意思呢？其实就是使用字符串代码将指定元素的代码包含着的意思。
### ① wrap(html)：向指定元素包裹一层html 代码
> ```javascript
> $(function(){
>     //在 div 外层包裹一层strong
>     $('#box').wrap('<strong></strong>'); 
>     //在 div 外层包裹多层节点
>     $('#box').wrap('<p><strong></strong></p>');
>     //包裹的元素可以带内容 
>     $('#box').wrap('<strong class="b">123</strong>'); 
> });
> ```
### ② wrap(element)：向指定元素包裹一层 DOM对象节点
> ```javascript
> $(function(){
>     //向指定元素包裹一层 DOM对象节点,类似于在当前位置将别的元素复制了一份
>     //然后将当前节点插入到别的元素内部的末尾
>     $('#box').wrap($('#main_business').get(0)); 
>     //获取创建一个临时dom元素
>     $('#box').wrap(document.createElement('p')); 
> });
> ```
### ③ wrap(function (index) {})：使用匿名函数向指定元素包裹一层自定义内容
> ```javascript
> $(function(){
>     $('#box').wrap(function(index){
>        return '<p>'+index+'</p>';
>     });
> });
> ```
### ④ unwrap()：移除一层指定元素包裹的内容
> ```javascript
> $(function(){
>     //找div的子元素，然后移除一层，相当于移除了外面的div
>     $('#box').children('span').unwrap();//多层就写连缀
> });
> ```
### ⑤ wrapAll(html)：用 html 将所有元素包裹到一起
> ```javascript
> $(function(){
>     // $('input').wrap('<p></p>');//每个input都被p元素包裹
>     $('input').wrapAll('<p></p>');//所有input被一个p元素包裹
> });
> ```
### ⑥ wrapAll(element)：用 DOM 对象将所有元素包裹在一起
> ```javascript
> $(function(){
>     // $('input').wrap('<p></p>');//每个input都被p元素包裹
>     // $('input').wrapAll('<p></p>');//所有input被一个p元素包裹
>     $('input').wrapAll(document.createElement('p'));//所有input被一个p元素包裹
> });
> ```
### ⑦ wrapInner(html)、wrapInner(element)、wrapInner(function (index) {})：向指定元素的子内容包裹一层
> ```javascript
> <div class="d">节点1</div>
> <div class="d">节点2</div>
> $(function(){
>     //wrapInner(html)
>     // $('div.d').wrapInner('<strong></strong>');
>     //wrapInner(element)
>     // $('#box').wrapInner(document.createElement('p'));
>     //wrapInner(function (index) {})
>     $('#box').wrapInner(function(index){
>         return '<p>'+index+'</p>';
>     });
> });
> ```

## 4、节点操作
> js原生提供的节点操作：<a href="/secondless/w-a/网页文档对象模型DOM.html#_3、操作节点" target="_blank">章节15-3、操作节点</a>有：repalceChild()、cloneNode()、removeChild()方法，我们看一下jQuery提供的方法。
### ① 复制节点 clone(true)、替换节点：replaceWith、replaceAll
> ```javascript
> $(function(){
>     //js原生：cloneNode()方法：把节点复制一份，放到指定地方
>     let banner = document.getElementById('banner');
>     let banner_clone = banner.cloneNode(true);//true 表示复制内容，false只复制标签
>     let $div = document.getElementById('box');
>     $div.appendChild(banner_clone);
>     // $div.parentNode.replaceChild(banner_clone,$div);//原生替换
> 
>     //jQuery的复制：clone()
>     //clone(true)参数可以为空，表示只复制元素和内容，不复制事件行为。
>     $('#banner').click(function(){
>         alert('点击了广告图');
>     });
>     //而加上true参数的话，这个元素附带的事件处理行为也复制出来
>     //$div.appendChild(banner_clone);翻译一下
>     $('#box').append($('#banner').clone(true));
> 
>     //jQuery的替换：replaceWith
>     $('#box').replaceWith($('#banner').clone(true));
>     //或者 replaceAll
>     $('#banner').clone(true).replaceAll('#box');
>     //节点被替换后，所包含的事件行为就全部消失了。
> });
> ```
### ② 删除节点：remove() 或者 detach()
> ```javascript
> $(function(){
>     //js原生：removeChild()方法：删除指定节点（先找到它的父节点再操作）
>     //需要封装函数，比较麻烦
>     //jQuery则简单很多
>     // $('div').remove(); //直接删除 所有div 元素
>     $('#box').click(function(){
>         alert('我是box');
>     });
>     // $('div').remove('#box');//只删除 id=box 的 div
>     // console.log($('#box').remove('#box'));//返回的是jQuery对象
>     //把删除的这个div重新添加到页面上
>     $('#box').remove('#box').appendTo('body');//发现没有点击事件了
>     $('#box').detach('#box').appendTo('body');//有点击事件
> });
> ```
注意：.remove()和.detach()都是删除节点，而删除后本身方法可以返回当前被删除的节点对象，但区别在于前者remove在恢复时不保留事件行为，后者detach则保留。

### ③ 删除掉节点里的内容empty()
> ```javascript
> $(function(){
>     // $('div').empty(); //删除掉节点里的内容
>     $('#box').empty();//删除掉节点里的内容
> });
> ```











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
####  <a href="/secondless/w-b/jQuery.html#_1、代码风格-包裹" style="margin-left:40px;">1、代码风格：$包裹，加载模式：$(function () {})，获取元素DOM对象：get(索引)方法，多个库之间的冲突</a>
####  <a href="/secondless/w-b/jQuery.html#一、jquery中的选择器过滤器" style="margin-left:40px;">2、选择器：</a>
##### <a href="/secondless/w-b/jQuery.html#_1-id-选择器、元素选择器、类-class-选择器-属性-length-或-size-方法来查看返回的元素个数" style="margin-left:70px;">① ID 选择器、元素选择器、类(class)选择器，属性 length 或 size()方法来查看返回的元素个数</a>
##### <a href="/secondless/w-b/jQuery.html#_2-jquery对象转成dom对象-get方法或下标获取" style="margin-left:70px;">② jQuery对象转成DOM对象：get方法或下标获取</a>
##### <a href="/secondless/w-b/jQuery.html#_3-群组选择器、后代选择器、通配选择器、指定元素前缀选择器" style="margin-left:70px;">③ 群组选择器、后代选择器、通配选择器、指定元素前缀选择器</a>
##### <a href="/secondless/w-b/jQuery.html#_4-层次选择器-jquery提供后代选择器find、子选择器children、next-选择器、nextall-选择器" style="margin-left:70px;">④ 层次选择器：jQuery提供后代选择器find、子选择器children、next 选择器、nextAll 选择器</a>
##### <a href="/secondless/w-b/jQuery.html#_5-jquery提供-prev同级上一个元素-prevall同级所有上面的元素" style="margin-left:70px;">⑤ jQuery提供：prev同级上一个元素，prevAll同级所有上面的元素</a>
##### <a href="/secondless/w-b/jQuery.html#_6-jquery提供-siblings-方法-上下同级所有元素-正好集成了-prevall-和-nextall-两个功能的效果" style="margin-left:70px;">⑥ jQuery提供：siblings()方法：上下同级所有元素，正好集成了 prevAll()和 nextAll()两个功能的效果</a>
##### <a href="/secondless/w-b/jQuery.html#_7-jquery提供-nextuntil-方法-查找同级后面的节点-遇到指定元素停止选定-prevuntil-方法-查找同级前面的节点-遇到指定元素停止选定" style="margin-left:70px;">⑦ jQuery提供：nextUntil()方法：查找同级后面的节点，遇到指定元素停止选定，prevUntil()方法：查找同级前面的节点，遇到指定元素停止选定</a>
##### <a href="/secondless/w-b/jQuery.html#_8-属性选择器-一般超链接用得多点" style="margin-left:70px;">⑧ 属性选择器：一般超链接用得多点</a>
####  <a href="/secondless/w-b/jQuery.html#_6、过滤器-伪类选择器" style="margin-left:40px;">3、过滤器（伪类选择器）</a>
##### <a href="/secondless/w-b/jQuery.html#_1-first-选取第一个元素-返回单个元素-jquery提供first-方法" style="margin-left:70px;">① :first，选取第一个元素，返回单个元素，jQuery提供first()方法</a>
##### <a href="/secondless/w-b/jQuery.html#_2-last-选取最后一个元素-返回单个元素-jquery提供last-方法" style="margin-left:70px;">② jQuery对象转成DOM对象：get方法或下标获取</a>
##### <a href="/secondless/w-b/jQuery.html#_3-not-selector-not-active-选取class不是active的元素-返回元素集合-jquery提供not-selector-方法" style="margin-left:70px;">③:not(selector)， :not(.active)选取class不是active的元素，返回元素集合，jQuery提供not(selector)方法</a>
##### <a href="/secondless/w-b/jQuery.html#_4-eq-index-选择索引-0-开始-等于-index-的元素-返回单个元素-jquery提供eq-方法" style="margin-left:70px;">④ :eq(index)，选择索引(0 开始)等于 index 的元素，返回单个元素，jQuery提供eq()方法</a>
##### <a href="/secondless/w-b/jQuery.html#_5-gt-index-选择索引-0-开始-大于-index-的元素-返回元素集合" style="margin-left:70px;">⑤ :gt(index)，选择索引(0 开始)大于 index 的元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_6-lt-index-选择索引-0-开始-小于-index-的元素-返回元素集合" style="margin-left:70px;">⑥ :lt(index)，选择索引(0 开始)小于 index 的元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_7-even-选择索引-0-开始-是偶数的所有元素-返回元素集合" style="margin-left:70px;">⑦ :even，选择索引(0 开始)是偶数的所有元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_8-odd-选择索引-0-开始-是奇数的所有元素-返回元素集合" style="margin-left:70px;">⑧ :odd，选择索引(0 开始)是奇数的所有元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_9-header-选择标题元素-h1-h6-返回元素集合" style="margin-left:70px;">⑨ :header，选择标题元素，h1 ~ h6，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_10-focus-选择当前被焦点的元素-一般用在表单元素上" style="margin-left:70px;">⑩ :focus，选择当前被焦点的元素，一般用在表单元素上</a>
####  <a href="/secondless/w-b/jQuery.html#_7、内容过滤器" style="margin-left:40px;">4、内容过滤器</a>
##### <a href="/secondless/w-b/jQuery.html#_1-contains-text-选取含有text文本的元素-返回元素集合" style="margin-left:70px;">① :contains(text)，选取含有text文本的元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_2-empty-选取不包含子元素或空文本的元素-返回元素集合" style="margin-left:70px;">② :empty，选取不包含子元素或空文本的元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_3-has-selector-如-has-active-选择后代元素含有class-是active-的元素-jquery提供has-方法" style="margin-left:70px;">③ :has(selector)，如：:has(.active) 选择后代元素含有class 是active 的元素，jQuery提供has()方法</a>
##### <a href="/secondless/w-b/jQuery.html#_4-parent-与-empty刚好相反-选取含有子元素或文本的元素-返回元素集合" style="margin-left:70px;">④ :parent，与:empty刚好相反，选取含有子元素或文本的元素，返回元素集合</a>
####  <a href="/secondless/w-b/jQuery.html#_8、jquery提供-parent-、parents-、parentsuntil方法特别说明" style="margin-left:40px;">5、jQuery提供：parent()、parents()、parentsUntil方法特别说明</a>
##### <a href="/secondless/w-b/jQuery.html#_1-jquery提供-parent-方法-选取当前元素的父元素-注意与-parent的区别" style="margin-left:70px;">① jQuery提供：parent()方法：选取当前元素的父元素，注意与 :parent的区别</a>
##### <a href="/secondless/w-b/jQuery.html#_2-jquery提供-parents-方法-选择当前元素的父元素及祖先元素" style="margin-left:70px;">② jQuery提供：parents()方法：选择当前元素的父元素及祖先元素</a>
##### <a href="/secondless/w-b/jQuery.html#_3-jquery提供-parentsuntil方法-如-parentsuntil-ul-选择当前元素往上一层级查找-遇到ul元素停止" style="margin-left:70px;">③ jQuery提供：parentsUntil方法，如：parentsUntil('ul') 选择当前元素往上一层级查找，遇到ul元素停止</a>
####  <a href="/secondless/w-b/jQuery.html#_9、可见性过滤器" style="margin-left:40px;">6、可见性过滤器</a>
##### <a href="/secondless/w-b/jQuery.html#_1-hidden-选取所有不可见元素-返回元素集合-一般包含-css-样式为-display-none、input-表单类型为type-hidden-和-visibility-hidden-的元素" style="margin-left:70px;">① :hidden，选取所有不可见元素，返回元素集合，一般包含：CSS 样式为 display:none、input 表单类型为type="hidden"和 visibility:hidden 的元素</a>
##### <a href="/secondless/w-b/jQuery.html#_2-visible-选取所有可见元素" style="margin-left:70px;">② :visible，选取所有可见元素</a>
####  <a href="/secondless/w-b/jQuery.html#_10、子元素过滤器" style="margin-left:40px;">7、子元素过滤器</a>
##### <a href="/secondless/w-b/jQuery.html#_1-first-child-获取每个父元素的第一个子元素-返回元素集合" style="margin-left:70px;">① :first-child，获取每个父元素的第一个子元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_2-last-child-获取每个父元素的最后一个子元素-返回元素集合" style="margin-left:70px;">② :last-child，获取每个父元素的最后一个子元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_3-only-child-获取只有一个子元素的元素-返回元素集合" style="margin-left:70px;">③ :only-child，获取只有一个子元素的元素，返回元素集合</a>
##### <a href="/secondless/w-b/jQuery.html#_4-nth-child-odd-even-eq-index-获取每个自定义子元素的元素-索引值从-1-开始计算" style="margin-left:70px;">④ :nth-child(odd/even/eq(index))，获取每个自定义子元素的元素(索引值从 1 开始计算)</a>
####  <a href="/secondless/w-b/jQuery.html#_11、jquery提供选择器和过滤器方法" style="margin-left:40px;">8、jQuery提供选择器和过滤器方法</a>
##### <a href="/secondless/w-b/jQuery.html#_1-is-方法-传递选择器、dom、jquery-对象、函数" style="margin-left:70px;">① is()方法：传递选择器、DOM、jquery 对象、函数</a>
##### <a href="/secondless/w-b/jQuery.html#_2-hasclass方法-hasclass-hasclass-class-判断某个元素是否有某个class-比较常用-和-is-一样-只不过只能传递class" style="margin-left:70px;">② hasClass方法，hasClass(); hasClass(class)，判断某个元素是否有某个class，比较常用，和 is 一样，只不过只能传递class</a>
##### <a href="/secondless/w-b/jQuery.html#_3-slice方法-slice-start-end-选择从-start-到-end-位置的元素-如果是负数-则从后开始" style="margin-left:70px;">③ slice方法，slice(start, end)，选择从 start 到 end 位置的元素，如果是负数，则从后开始</a>
##### <a href="/secondless/w-b/jQuery.html#_4-end方法-end-获取当前元素前一次状态-可以找它的父节点-也可以找它的相邻前一个兄弟节点" style="margin-left:70px;">④ end方法，end()，获取当前元素前一次状态：可以找它的父节点，也可以找它的相邻前一个兄弟节点</a>
##### <a href="/secondless/w-b/jQuery.html#_5-contents方法-contents-获取某元素下面所有元素节点-包括文本节点-如果是-iframe-则可以查找文本内容" style="margin-left:70px;">⑤ contents方法，contents()，获取某元素下面所有元素节点，包括文本节点，如果是 iframe，则可以查找文本内容</a>
##### <a href="/secondless/w-b/jQuery.html#_6-filter方法-filter-比较灵活的选择器-扩展性较好" style="margin-left:70px;">⑥ filter方法，filter()，比较灵活的选择器，扩展性较好</a>
####  <a href="/secondless/w-b/jQuery.html#_12、表单选择器" style="margin-left:40px;">9、表单选择器</a>
##### <a href="/secondless/w-b/jQuery.html#_1-jquery方法-通过type类型或者name字段获取表单组件-通过val-方法获取表单组件的值" style="margin-left:70px;">① jQuery方法：通过type类型或者name字段获取表单组件，通过val()方法获取表单组件的值</a>
####  <a href="/secondless/w-b/jQuery.html#二、jquery操作dom及css" style="margin-left:40px;">10、jQuery操作DOM及CSS</a>
##### <a href="/secondless/w-b/jQuery.html#_1、设置元素及内容-html-html-value-text-text-value" style="margin-left:70px;">1、设置元素及内容：html(),html(value),text(),text(value)</a>
##### <a href="/secondless/w-b/jQuery.html#_2、获取或设置表单内容-val-val-value" style="margin-left:70px;">2、获取或设置表单内容：val()，val(value)</a>
##### <a href="/secondless/w-b/jQuery.html#_3、设置单选框、复选框默认选中状态val-非常好用" style="margin-left:70px;">3、设置单选框、复选框默认选中状态val()，非常好用</a>
##### <a href="/secondless/w-b/jQuery.html#_4、元素属性操作-attr-和-removeattr" style="margin-left:70px;">4、元素属性操作：attr()和 removeAttr()</a>
##### <a href="/secondless/w-b/jQuery.html#_5、元素css样式操作" style="margin-left:70px;">5、元素CSS样式操作</a>
##### <a href="/secondless/w-b/jQuery.html#i、css-方法" style="margin-left:100px;">Ⅰ、css()方法</a>
##### <a href="/secondless/w-b/jQuery.html#_1-css-方法获取、设置元素样式" style="margin-left:130px;">① css()方法获取、设置元素样式</a>
##### <a href="/secondless/w-b/jQuery.html#_2-css-方法传递多个样式属性的数组-得到样式属性值对象数组-each-box-function-attr-value-遍历原生态对象数组-jquery对象数组采用-selector-each-function-index-element-方法遍历" style="margin-left:130px;">② css()方法传递多个样式属性的数组，得到样式属性值对象数组，$.each(box,function(attr,value){})遍历原生态对象数组，jQuery对象数组采用$(selector).each(function(index,element){})方法遍历</a>
##### <a href="/secondless/w-b/jQuery.html#_3-css-方法传递多个-css-样式的键值对" style="margin-left:130px;">③ css()方法传递多个 CSS 样式的键值对</a>
##### <a href="/secondless/w-b/jQuery.html#_4-css-方法可以传匿名函数" style="margin-left:130px;">④ css()方法可以传匿名函数</a>
##### <a href="/secondless/w-b/jQuery.html#ii、addclass-方法、removeclass-方法、toggleclass-方法" style="margin-left:100px;">Ⅱ、addClass()方法、removeClass()方法、toggleClass()方法</a>
##### <a href="/secondless/w-b/jQuery.html#_1-addclass-方法、removeclass-方法" style="margin-left:130px;">① addClass()方法、removeClass()方法</a>
##### <a href="/secondless/w-b/jQuery.html#_2-toggleclass-方法-切换class" style="margin-left:130px;">② toggleClass()方法：切换class</a>
##### <a href="/secondless/w-b/jQuery.html#iii、jquery提供其他css操作方法" style="margin-left:100px;">Ⅲ、jQuery提供其他css操作方法</a>
##### <a href="/secondless/w-b/jQuery.html#_1-jquery提供-width-、width-value-、width-function-index-width-方法-获取、设置、通过匿名函数设置某个元素的长度" style="margin-left:130px;">① jQuery提供：width()、width(value)、width(function (index, width) {})方法：获取、设置、通过匿名函数设置某个元素的长度</a>
##### <a href="/secondless/w-b/jQuery.html#_2-jquery提供-height-、height-value-、height-function-index-width-方法-获取、设置、通过匿名函数设置某个元素的高度" style="margin-left:130px;">② jQuery提供：height()、height(value)、height(function (index, width) {})方法：获取、设置、通过匿名函数设置某个元素的高度</a>
##### <a href="/secondless/w-b/jQuery.html#_3-jquery提供内外边距和边框尺寸方法-innerwidth-innerheight-outerwidth-outerheight-outerwidth-ture-outerheight-true" style="margin-left:130px;">③ jQuery提供内外边距和边框尺寸方法：innerWidth()，innerHeight()，outerWidth()，outerHeight()，outerWidth(ture)，outerHeight(true)</a>
##### <a href="/secondless/w-b/jQuery.html#_4-jquery提供元素偏移方法-offset-、position-、scrolltop-、scrolltop-value-、scrollleft-、scrollleft-value" style="margin-left:130px;">④ jQuery提供元素偏移方法：offset()、position()、scrollTop()、scrollTop(value)、scrollLeft()、scrollLeft(value)</a>
####  <a href="/secondless/w-b/jQuery.html#iv、jquery提供的dom节点操作方法" style="margin-left:40px;">11、jQuery提供的DOM节点操作方法</a>
##### <a href="/secondless/w-b/jQuery.html#_1、创建节点" style="margin-left:70px;">1、创建节点</a>
##### <a href="/secondless/w-b/jQuery.html#_2、插入节点" style="margin-left:70px;">2、插入节点</a>
##### <a href="/secondless/w-b/jQuery.html#_1-内部插入节点-append-content-向指定元素内部后面插入节点content" style="margin-left:100px;">① 内部插入节点 append(content)：向指定元素内部后面插入节点content</a>
##### <a href="/secondless/w-b/jQuery.html#_2-内部移入节点-不需要创建节点-appendto-content-将指定元素移入到指定元素content-内部后面" style="margin-left:100px;">② 内部移入节点（不需要创建节点） appendTo(content)：将指定元素移入到指定元素content 内部后面</a>
##### <a href="/secondless/w-b/jQuery.html#_3-内部插入节点-prepend-content-向指定元素-content-内部的前面插入节点" style="margin-left:100px;">③ 内部插入节点 prepend(content)：向指定元素 content 内部的前面插入节点</a>
##### <a href="/secondless/w-b/jQuery.html#_4-内部移入节点-不需要创建节点-prependto-content-将指定元素移入到指定元素content-内部前面" style="margin-left:100px;">④ 内部移入节点（不需要创建节点） prependTo(content)：将指定元素移入到指定元素content 内部前面</a>
##### <a href="/secondless/w-b/jQuery.html#_5-外部-同级-插入节点-before-content-向指定元素的外部前面插入节点content" style="margin-left:100px;">⑤ 外部（同级）插入节点 before(content)：向指定元素的外部前面插入节点content</a>
##### <a href="/secondless/w-b/jQuery.html#_6-外部-同级-移到节点-不需要创建节点-insertbefore-content-将指定节点移到指定元素content-外部的前面" style="margin-left:100px;">⑥ 外部（同级）移到节点 （不需要创建节点）insertBefore(content)：将指定节点移到指定元素content 外部的前面</a>
##### <a href="/secondless/w-b/jQuery.html#_7-外部-同级-插入节点-after-content-向指定元素的外部后面插入节点content" style="margin-left:100px;">⑦ 外部（同级）插入节点 after(content)：向指定元素的外部后面插入节点content</a>
##### <a href="/secondless/w-b/jQuery.html#_8-外部-同级-移到节点-不需要创建节点-insertafter-content-将指定节点移到指定元素content-外部的后面" style="margin-left:100px;">⑧ 外部（同级）移到节点 （不需要创建节点）insertAfter(content)：将指定节点移到指定元素content 外部的后面</a>
##### <a href="/secondless/w-b/jQuery.html#_3、包裹节点" style="margin-left:70px;">3、包裹节点</a>
##### <a href="/secondless/w-b/jQuery.html#_1-wrap-html-向指定元素包裹一层html-代码" style="margin-left:100px;">① wrap(html)：向指定元素包裹一层html 代码</a>
##### <a href="/secondless/w-b/jQuery.html#_2-wrap-element-向指定元素包裹一层-dom对象节点" style="margin-left:100px;">② wrap(element)：向指定元素包裹一层 DOM对象节点</a>
##### <a href="/secondless/w-b/jQuery.html#_3-wrap-function-index-使用匿名函数向指定元素包裹一层自定义内容" style="margin-left:100px;">③ wrap(function (index) {})：使用匿名函数向指定元素包裹一层自定义内容</a>
##### <a href="/secondless/w-b/jQuery.html#_4-unwrap-移除一层指定元素包裹的内容" style="margin-left:100px;">④ unwrap()：移除一层指定元素包裹的内容</a>
##### <a href="/secondless/w-b/jQuery.html#_5-wrapall-html-用-html-将所有元素包裹到一起" style="margin-left:100px;">⑤ wrapAll(html)：用 html 将所有元素包裹到一起</a>
##### <a href="/secondless/w-b/jQuery.html#_6-wrapall-element-用-dom-对象将所有元素包裹在一起" style="margin-left:100px;">⑥ wrapAll(element)：用 DOM 对象将所有元素包裹在一起</a>
##### <a href="/secondless/w-b/jQuery.html#_7-wrapinner-html-、wrapinner-element-、wrapinner-function-index-向指定元素的子内容包裹一层" style="margin-left:100px;">⑦ wrapInner(html)、wrapInner(element)、wrapInner(function (index) {})：向指定元素的子内容包裹一层</a>
##### <a href="/secondless/w-b/jQuery.html#_4、节点操作" style="margin-left:70px;">4、节点操作</a>
##### <a href="/secondless/w-b/jQuery.html#_1-复制节点-clone-true-、替换节点-replacewith、replaceall" style="margin-left:100px;">① 复制节点 clone(true)、替换节点：replaceWith、replaceAll</a>
##### <a href="/secondless/w-b/jQuery.html#_2-删除节点-remove-或者-detach" style="margin-left:100px;">② 删除节点：remove() 或者 detach()</a>
##### <a href="/secondless/w-b/jQuery.html#_3-删除掉节点里的内容empty" style="margin-left:100px;">③ 删除掉节点里的内容empty()</a>
### [章节5.jQuery事件、动画、插件](/secondless/w-b/jQuery事件、动画、插件 '章节5.jQuery事件、动画、插件')
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#一、事件" style="margin-left:40px;">一、事件</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_1、简写事件" style="margin-left:70px;">1、简写事件</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_2、复合事件-hover-fn1-fn2" style="margin-left:70px;">2、复合事件：hover([fn1,]fn2)</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_3、jquery中的事件对象-target、currenttarget、e-stoppropagation-、e-preventdefault-、return-false" style="margin-left:70px;">3、jQuery中的事件对象：target、currentTarget、e.stopPropagation()、e.preventDefault()、return false</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_4、jquery中的高级事件-on、off-和-one" style="margin-left:70px;">4、jQuery中的高级事件：on、off 和 one</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_1-on方法" style="margin-left:100px;">① on方法</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_2-off方法-移除事件" style="margin-left:100px;">② off方法:移除事件</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_3-one方法-仅触发一次的事件" style="margin-left:100px;">③ one方法:仅触发一次的事件</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_5、jquery中的模拟操作" style="margin-left:70px;">5、jQuery中的模拟操作</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#二、动画" style="margin-left:40px;">二、动画</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_1、-显示-show、隐藏-hide" style="margin-left:70px;">1、 显示：show、隐藏：hide</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_1-直接调用-显示show-、隐藏-hide" style="margin-left:100px;">① 直接调用：显示show()、隐藏：hide()</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_2-传递一个参数-毫秒-显示show-1000-、隐藏-hide-1000" style="margin-left:100px;">② 传递一个参数（毫秒）：显示show(1000)、隐藏：hide(1000)</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_3-传递一个预设参数-显示show-slow-normal-fast-隐藏-hide-slow-normal-fast-slow-600-毫秒-normal-默认-400-毫秒-fast-200-毫秒" style="margin-left:100px;">③ 传递一个预设参数：显示show(slow|normal|fast)，隐藏：hide(slow|normal|fast)，slow：600 毫秒，normal：默认 400 毫秒，fast：200 毫秒</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_4-传递第二个参数回调函数-实现列队动画-排队动画-show-毫秒数-slow-normal-fast-function-hide-毫秒数-slow-normal-fast-function" style="margin-left:100px;">④ 传递第二个参数回调函数，实现列队动画（排队动画）：show(毫秒数|slow|normal|fast，function(){})，hide(毫秒数|slow|normal|fast，function(){})</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_5-列队动画-可以使用函数名调用自身或者arguments-callee-匿名函数自调用" style="margin-left:100px;">⑤ 列队动画，可以使用函数名调用自身或者arguments.callee 匿名函数自调用</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_6-toggle-切换show-和hide" style="margin-left:100px;">⑥ toggle()切换show()和hide()</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_2、-滑动-slideup、卷动-slidedown、切换滑动卷动-slidetoggle" style="margin-left:70px;">2、 滑动：slideUp、卷动：slideDown、切换滑动卷动：slideToggle</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_3、-淡入-fadein、淡出-fadeout、切换淡入淡出-fadetoggle、指定透明度-fadeto" style="margin-left:70px;">3、 淡入：fadeIn、淡出：fadeOut、切换淡入淡出：fadeToggle、指定透明度：fadeTo</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_4、-自定义动画-animate" style="margin-left:70px;">4、 自定义动画 animate</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_1-animate基本用法-css样式自定义-同步动画" style="margin-left:100px;">① animate基本用法：css样式自定义，同步动画</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_2-animate用法-animate-css-动画时间-回调函数" style="margin-left:100px;">② animate用法：animate(css,动画时间,回调函数)</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_3-animate位移动画-将元素设置绝对定位或相对定位" style="margin-left:100px;">③ animate位移动画（将元素设置绝对定位或相对定位）</a>
#####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_4-列队动画方法-queue-方法-连缀执行下一个dequeue-方法-clearqueue-清理列队动画后面还没有执行的" style="margin-left:100px;">④ 列队动画方法:queue()方法，连缀执行下一个dequeue()方法，clearQueue()清理列队动画后面还没有执行的</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_5、-动画相关方法-stop-强制停止动画-delay-延迟动画执行" style="margin-left:70px;">5、 动画相关方法：stop()强制停止动画，delay()延迟动画执行</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_6、判断在运动的动画-通过过滤器-animated" style="margin-left:70px;">6、判断在运动的动画，通过过滤器:animated</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_7、动画全局属性-fx-interval-设置每秒运行的帧数-fx-off-关闭页面上所有的动画-默认swing-缓动-linear-匀速运动" style="margin-left:70px;">7、动画全局属性：$.fx.interval（设置每秒运行的帧数），$.fx.off（关闭页面上所有的动画），默认swing(缓动)，linear(匀速运动)</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#三、jquery插件" style="margin-left:40px;">三、jQuery插件</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#jquery插件-cookie插件" style="margin-left:70px;">1、引入：下载本地引入、或在线引入</a>
####  <a href="/secondless/w-b/jQuery事件、动画、插件.html#_2、使用插件方法" style="margin-left:70px;">2、使用插件方法</a>
### [章节6.Ajax](/secondless/w-b/Ajax '章节6.Ajax')

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