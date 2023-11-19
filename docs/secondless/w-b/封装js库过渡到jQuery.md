---
navbar: true
sidebar: auto
title: 章节3.封装js库过渡到jQuery
---

理解 JavaScript 库
> 什么是 JavaScript 库？就是把各种常用的代码片段，组织起来放在一个 js 文件里，组成一个包，这个包就是 JavaScript 库。现如今有太多优秀的开源 JavaScript 库，比如：jQuery、Swiper、 Prototype、Dojo、Extjs、Zepto 等等。这些 JavaScript 库已经把最常用的代码进行了有效的封装，以方便我们开发，从而提高效率。本章节，我们尝试自己封装一个js库，主要目的是提升我们的编程能力和面向对象的思维。<br/><br/>

## 1. 对象字面量形式执行对象里面的方法达到简化获取对象节点的操作
> 新建一个/static/js/myBase.js文件，在里面编写最常用的代码，然后不断的扩展封装。
> ```javascript
> // let menu = document.getElementById('banner');
> // console.log(menu.innerHTML);
> 
> var myBase = { //整个库可以是一个对象
>     getId: function (id) { //方法尽可能简短而富有含义
>         return document.getElementById(id);
>     },
>     getName: function (name) {
>         return document.getElementsByName(name);
>     },
>     getTagName: function (tag) {
>         return document.getElementsByTagName(tag);
>     }
> }
> 
> let menu = myBase.getId('banner');
> menu.setAttribute('data',456);
> menu.onclick = function(){
>     console.log('我是广告栏');
> }
> 
> //那么现在有新的需求了
> menu.setAttribute('data',456).onclick = function(){
>     console.log('我是广告栏');
> }
> //发现报错了
> //console.log(menu.setAttribute('data',456));//undefined
> //那么如何进行连缀操作呢？连缀操作: 一个或者多个节点同时进行两个或以上的操作
> ```

## 2. 改写库对象：通过构造函数和原型改写库对象
> 我们上节课提到要实现连缀功能，我们来分析一下：<br/>
> 1. myBase是一个基础库的核心对象，menu.setAttribute('data',456)返回的是什么？<br/>
> 2. 返回的是一个undefined，没有onclick事件可以执行，那思考什么可以返回执行？；<br/>
> 3. 有的同学会想到，就是我们上节课刚讲的面向对象，将menu.setAttribute('data',456)返回的结果改成myBase对象；<br/>
> 4. myBase对象在添加一个click事件不就可以了吗？<br/>
> 5. 即在myBase对象中添加html方法，click方法，setAttribute方法，css方法等等，就可以一直进行连缀操作了。即menu.setAttribute('data',456)应该返回myBase对象，不应该是undefined，menu.setAttribute('data',456).onclick 返回的也应该是myBase对象对象，这样就可以一直连缀下去。
> ```javascript
> menu.setAttribute('data',456).click(function(){
>     console.log('我是广告栏');
> }).css('backgroundColor','red');
> ```
那么很明显，我们上面的库返回的是节点对象，没有机会了，因此我们要改写我们的基础库。我们需要返回一个对象，然后可以调用里面的方法，而创建一个对象，我们很容易想到我们上一个章节的面向对象与原型还有继承，创建对象我们可以用构造函数、原型还有类来创建，由于我们本季主要是教大家面向对象的编程思维和策略，因此我们不用类创建，关于类创建对象，我们后面有大型项目，在使用类，类里面的知识很多，我们上一章节只是讲了类的基础知识。回到我们的问题，我们先尝试通过构造函数来创建对象。
> ```javascript
> <div id="box">我是用来测试的</div>
> function Mybase(){
>     this.getId = function(id){ 
>         return  document.getElementById(id);
>     }
> }
> 
> let mybase = new Mybase();
> console.log(mybase.getId('box'));//还是节点对象
> //我们需要mybase.getId('box')返回的是mybase对象，才能继续调用，那该如何写？
> ```
> ```javascript
> //我们先用正常程序写一下这些功能
> mybase.getId('box').style.color = 'red';
> mybase.getId('box').style.backgroundColor = 'green';
> mybase.getId('box').innerHTML = '我是box';
> mybase.getId('box').setAttribute('data',123);
> mybase.getId('box').onclick = function(){
>     console.log('我被点了');
> };
> //我们现在希望通过连缀来完成：
> // mybase.getId('box').css('color','red').css('backgroundColor','green')
> // .html('我是box').attr('data',123).click(function(){
> //     console.log('我被点了');
> // })
> //因此，我们上面的程序，不应该返回document.getElementById(id)；而应该返回this,this不就是我们的Mybase构造函数对象吗？
> ```
因此，我们需要创建一个数组，来保存获取的节点（id获取的是节点）和节点数组（其他方式获取的是节点数组）
### ① 获取id节点，返回实例对象mybase，给构造函数原型添加css方法
> ```javascript
> function Mybase(){
>     //创建一个数组,来保存获取的节点和节点数组
>     this.elements = [];
>     //获取id节点
>     this.getId = function(id){ 
>         //return  document.getElementById(id);
>         this.elements.push(document.getElementById(id));
>         return this;
>     };
>     // this.css = function(){} 这是操作，写这里不好管理，可以写在外面，写外面可以用原型方法
> }
> Mybase.prototype.css = function(attribute,value){
>     //mybase.getId('box').style.color = 'red';
>     //mybase.getId('box').style.backgroundColor = 'green';
>     this.elements[0].style[attribute] = value;
>     return this;
> }
> 
> 
> let mybase = new Mybase();
> console.log(mybase.getId('box'));//返回mybase实例对象
> //通过输出结果，我们可以看到可以在里面继续添加方法，如css方法，attr方法，html方法，click方法等
> //接下来完成这步：mybase.getId('box').css('color','red')
> //mybase.getId('box').css('color','red');
> mybase.getId('box').css('color','red').css('backgroundColor','green');
> //同学们听完应该豁然开朗了，但是，我们的写法不够完美，因为数组用的下标，如果多个元素就不好办了
> ```  

### ② 改写构造函数原型css方法，处理多个节点存放问题，html方法按照css方法进行扩展测试，扩展click方法
> ```javascript
> //获取元素节点
>    this.getTagName = function (tag) {
>       //this.elements.push(document.getElementsByTagName(tag));
>       let tags = document.getElementsByTagName(tag);
>       for(let i=0;i<tags.length;i++){
>         this.elements.push(tags[i]);
>       }
>       return this;
>    }
> //执行元素节点
> console.log(mybase.getTagName('p'));
> 
> mybase.getTagName('p').css('color','blue');//发现只改了一个p
> //改写css方法
> Mybase.prototype.css = function(attribute,value){
>    // mybase.getId('box').style.color = 'red';
>    // mybase.getId('box').style.backgroundColor = 'green';
>    //this.elements[0].style[attribute] = value;
>    for(let i=0;i<this.elements.length;i++){
>      this.elements[i].style[attribute] = value;
>    }
>    return this;
> }
> 
> //接着写html方法
> Mybase.prototype.html = function(str){
>     // mybase.getId('box').innerHTML = '我是box';
>     for(let i=0;i<this.elements.length;i++){
>         this.elements[i].innerHTML = str;
>     }
>     return this;
> }
> 
> mybase.getTagName('p').css('color','blue').html('我是段落p');
>
> //接着扩展click方法
> mybase.getTagName('p').css('color','blue').html('我是段落p').click(function(){
>     console.log('我被点了')
> }).css('backgroundColor','black');
> 
> Mybase.prototype.click = function(fn){
>     for(let i=0;i<this.elements.length;i++){
>         this.elements[i].onclick = fn;
>     }
>     return this;
> }
> ```
> ```javascript
> //同时执行 mybase.getId('box').css('color','red').css('backgroundColor','green');有问题了
> //发现我们执行的代码被后面的代码替代了，我们可以查看一下中控台 console.log(mybase);
> // this.elements[i]包含了id='box' 还有p的元素，因此设置p元素样式时候，会覆盖id='box'的元素
> // 那么该怎么解决呢？此时我们应该想到，我们实例化的时候，就不该只实例化一个对象，因为我们操作的元素不同
> // 我们应该实例化两个对象，分别来处理我们的div#box,p元素
> //实例化多个对象
> // let mybase1 = new Mybase();
> // let mybase2 = new Mybase();
> let $ = function(){
>     return new Mybase();
> }
> $().getId('box').css('color','red').css('backgroundColor','green');
> $().getTagName('p').css('color','blue').html('我是段落p').click(function(){
>     console.log('我被点了')
> }).css('backgroundColor','black');
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