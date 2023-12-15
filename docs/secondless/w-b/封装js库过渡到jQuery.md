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

### ③ 改造html方法，可以设置或者获取内容
> 在上一节课我们通过 html()方法和 css()方法可以设置内容和 CSS 样式，但我们如何通过这两个方法来获取内容或样式呢？比如：
> ```javascript
> console.log($().getId('box').html()); //获取内容
> console.log($().getId('box').css('fontSize')); //获取 CSS 样式
> ```
> 要实现获取内容，只要判断传递过来的参数即可
> ```javascript
> //设置或者获取内容
> Mybase.prototype.html = function (str) {
>     // mybase.getId('box').innerHTML = '我是box';
>     for (let i = 0; i < this.elements.length; i++) {
>         //判断传参 arguments.length
>         if (arguments.length == 0) { //没有传参
>             return this.elements[i].innerHTML;//返回内容
>         } else {
>             this.elements[i].innerHTML = str;
>         }
>     }
>     return this;
> }
> // console.log($().getId('box').html());//获取内容
> // console.log($().getId('box').html('我是p标签'));//设置内容
> ```
> 关联知识：<a href="/secondless/w-a/javascript函数.html#_3、函数的arguments-对象" target="_blank">第二学期_第1季——章节5_3、函数的arguments 对象</a>

### ④ 改造css方法，可以设置获取css样式
> ```javascript
> <div id="box" style="font-size: 20px;">我是测试的</div>
> // $().getId('box').css('fontSize','100px');
> // console.log($().getId('box').css('fontSize')); //获取 CSS 样式
> Mybase.prototype.css = function (attribute, value) {
>     for (let i = 0; i < this.elements.length; i++) {
>         if(arguments.length == 1){
>            //return  this.elements[i].style[attribute];
>            return window.getComputedStyle(this.elements[i], null)[attribute];
>         }
>         this.elements[i].style[attribute] = value;
>     }
>     return this;
> }
> //但无法获取计算后的样式
> console.log($().getId('box').css('height'));//计算后的样式
> ```
> 计算后的样式：<a href="/secondless/w-a/网页文档对象模型DOM.html#_3-计算后的样式获取-行内、内联、外联样式-window-对象下getcomputedstyle-方法">第二学期_第1季——章节15_6.操作css样式_③计算后的样式</a>

## 3. 封装js库总结
> ```javascript
> //实例化多个对象
> // let mybase = new Mybase();
> // let mybase1 = new Mybase();
> let $ = function () {
>     return new Mybase();
> }
> //基础库
> function Mybase() {
>     //创建一个数组,来保存获取的节点和节点数组
>     this.elements = [];
> }
> //获取id节点
> Mybase.prototype.getId = function (id) {
>     this.elements.push(document.getElementById(id));
>     return this;
> }
> //执行元素节点
> Mybase.prototype.getTagName = function (tag) {
>     let tags = document.getElementsByTagName(tag);
>     for (let i = 0; i < tags.length; i++) {
>         this.elements.push(tags[i]);
>     }
>     return this;
> }
> //设置或获取css
> Mybase.prototype.css = function (attribute, value) {
>     for (let i = 0; i < this.elements.length; i++) {
>         if(arguments.length == 1){
>            //return  this.elements[i].style[attribute];
>            return window.getComputedStyle(this.elements[i], null)[attribute];
>         }
>         this.elements[i].style[attribute] = value;
>     }
>     return this;
> }
> //设置或者获取内容
> Mybase.prototype.html = function (str) {
>     // mybase.getId('box').innerHTML = '我是box';
>     for (let i = 0; i < this.elements.length; i++) {
>         //判断传参 arguments.length
>         if (arguments.length == 0) { //没有传参
>             return this.elements[i].innerHTML;//返回内容
>         } else {
>             this.elements[i].innerHTML = str;
>         }
>     }
>     return this;
> }
> //触发点击事件
> Mybase.prototype.click = function (fn) {
>     for (let i = 0; i < this.elements.length; i++) {
>         this.elements[i].onclick = fn;
>     }
>     return this;
> }
> 
> 
> /*
> $().getId('box').css('color','red').css('backgroundColor','green');
> $().getTagName('p').css('color','blue').html('我是段落p').click(function(){
>     console.log('我被点了');
> }).css('backgroundColor','black');
> 
> console.log($().getId('box').html());//获取内容
> 
> console.log($().getId('box').css('fontSize')); //获取 CSS 样式
> $().getId('box').css('fontSize','100px');
> console.log($().getId('box').css('height'));//计算后的样式
> */
> 
> ```

以上，是我们通过简单封装js库，让大家进一步理解面向对象、原型在开发中的思维和重要性，主要目的是拓宽大家的面向对象思维能力。然后，顺便通过封装我们DOM章节的知识点，让大家回忆一下我们第二学期第1季DOM章节操作我们节点的一些方法，做到一个前后呼应。<br/><br/>
当然：<br/><br/>
回到我们目前封装的js库本身，还有很多的方法没有封装，比如：获取class类名、设置class类名、添加class类名、移除class类名等等很多功能，而且我们的库还需要进一步的改进。<br/><br/>
那么：<br/><br/>
在我们实际开发中，有没有我们IT界的前辈或者大佬，帮我们写好了操作我们js的库呢，功能和我们上面自己封装的功能一样呢，而且功能更加完善呢？<br/><br/>
答案是：有的。回到我们本章的开头，现如今有太多优秀的开源 JavaScript 库，比如：jQuery、Swiper、 Prototype、Dojo、Extjs、Zepto 等等。而这里面最为优秀，被封神的 JavaScript 库就是我们的：jQuery库，那么我们下一章节将学习如何使用jQuery库。







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
####  <a href="/secondless/w-b/Ajax.html#一、原生js中的ajax" style="margin-left:40px;">一、原生js中的Ajax</a>
####  <a href="/secondless/w-b/Ajax.html#_1、xmlhttprequest-简称-xhr-xhr-api" style="margin-left:70px;">1、XMLHttpRequest (简称 XHR，XHR API)</a>
#####  <a href="/secondless/w-b/Ajax.html#_1-第一步-调用-open-方法准备发送请求-发送请求前的准备工作-三个参数-要发送的请求类型-get、post-、请求的-url-和表示是否异步" style="margin-left:100px;">① 第一步：调用 open()方法准备发送请求（发送请求前的准备工作）：三个参数：要发送的请求类型(get、post)、请求的 URL 和表示是否异步</a>
#####  <a href="/secondless/w-b/Ajax.html#_2-第二步-通过-send-方法进行发送请求-一个参数-作为请求主体发送的数据-如果不需要则-必须填-null" style="margin-left:100px;"> ② 第二步：通过 send()方法进行发送请求：一个参数：作为请求主体发送的数据，如果不需要则，必须填 null</a>
#####  <a href="/secondless/w-b/Ajax.html#_3-第三步-发送完了之后-得监听结果-监听服务器给你的请求结果-通过readystatechange-事件监听服务器给你的结果" style="margin-left:100px;">③ 第三步：发送完了之后，得监听结果（监听服务器给你的请求结果），通过readystatechange 事件监听服务器给你的结果</a>
####  <a href="/secondless/w-b/Ajax.html#_2、理解get、post请求" style="margin-left:70px;">2、理解get、post请求</a>
#####  <a href="/secondless/w-b/Ajax.html#_1-getallresponseheaders-获取整个响应头信息-getresponseheader-获取单个响应头信息-setrequestheader-设置请求头信息" style="margin-left:100px;"> ① getAllResponseHeaders()获取整个响应头信息，getResponseHeader()获取单个响应头信息，setRequestHeader()设置请求头信息</a>
#####  <a href="/secondless/w-b/Ajax.html#_2-get请求" style="margin-left:100px;"> ② get请求</a>
#####  <a href="/secondless/w-b/Ajax.html#_3-post请求" style="margin-left:100px;">③ post请求</a>
#####  <a href="/secondless/w-b/Ajax.html#_4-小结get和post请求" style="margin-left:100px;"> ④ 小结get和post请求</a>
####  <a href="/secondless/w-b/Ajax.html#_3、fetch-api" style="margin-left:70px;">3、Fetch API</a>
#####  <a href="/secondless/w-b/Ajax.html#_1-fetch-api基本用法介绍" style="margin-left:100px;"> ① Fetch API基本用法介绍</a>
#####  <a href="/secondless/w-b/Ajax.html#_2-xhr-与-fetch-中的content-type-或者小写content-type" style="margin-left:100px;"> ② XHR 与 Fetch 中的Content-Type(或者小写content-type)</a>
####  <a href="/secondless/w-b/Ajax.html#_4、-xhr-xhr-与-fetch-fetch-的区别-包括-jquery、axios、umi-request的说明" style="margin-left:70px;">4、 XHR（xhr） 与 Fetch（fetch）的区别 （包括：jQuery、Axios、umi-request的说明）</a>
####  <a href="/secondless/w-b/Ajax.html#二、jquery中的ajax" style="margin-left:40px;">二、jQuery中的Ajax</a>
####  <a href="/secondless/w-b/Ajax.html#_1、第二层封装-load-方法-get-和-post-方法" style="margin-left:70px;">1、第二层封装：load()方法，$.get()和$.post()方法</a>
#####  <a href="/secondless/w-b/Ajax.html#_1-load-方法是局部方法-异步加载静态文件如-html文件、json文件等" style="margin-left:100px;"> ① load()方法是局部方法 ： 异步加载静态文件如：html文件、json文件等</a>
#####  <a href="/secondless/w-b/Ajax.html#_2-get-和-post-方法-是全局方法-无须指定某个元素-适合传递参数到服务器请求数据" style="margin-left:100px;"> ② $.get()和$.post()方法：是全局方法，无须指定某个元素，适合传递参数到服务器请求数据</a>
####  <a href="/secondless/w-b/Ajax.html#_2、最高层封装-getjson-和-getscript" style="margin-left:70px;">2、最高层封装：$.getJSON() 和 $.getScript()</a>
#####  <a href="/secondless/w-b/Ajax.html#_1-getjson-方法-专门用于加载-json-文件的" style="margin-left:100px;"> ① $.getJSON()方法：专门用于加载 JSON 文件的</a>
#####  <a href="/secondless/w-b/Ajax.html#_2-getscript-方法-按需加载接口或js文件" style="margin-left:100px;"> ② $.getScript()方法：按需加载接口或js文件</a>
####  <a href="/secondless/w-b/Ajax.html#_3、最底层的封装-ajax" style="margin-left:70px;">3、最底层的封装：$.ajax()</a>
####  <a href="/secondless/w-b/Ajax.html#_4、表单序列化" style="margin-left:70px;">4、表单序列化</a>
#####  <a href="/secondless/w-b/Ajax.html#_1-常规形式的表单提交-表单提交数据" style="margin-left:100px;"> ① 常规形式的表单提交（表单提交数据）</a>
#####  <a href="/secondless/w-b/Ajax.html#_2-jquery中的表单序列化提交数据-表单提交数据" style="margin-left:100px;"> ② jQuery中的表单序列化提交数据（表单提交数据）</a>
#####  <a href="/secondless/w-b/Ajax.html#_3-param-方法将对象转换为字符串键值对格式" style="margin-left:100px;"> ③ $.param()方法将对象转换为字符串键值对格式</a>
####  <a href="/secondless/w-b/Ajax.html#_5、jquery中的跨域jsonp" style="margin-left:70px;">5、jQuery中的跨域jsonp</a>
#####  <a href="/secondless/w-b/Ajax.html#_1-jquery中的跨域jsonp使用" style="margin-left:100px;"> ① jQuery中的跨域jsonp使用</a>
#####  <a href="/secondless/w-b/Ajax.html#_2-延伸一下-jquery中的跨域jsonp模拟百度搜索提示数据" style="margin-left:100px;"> ② 延伸一下：jQuery中的跨域jsonp模拟百度搜索提示数据</a>
####  <a href="/secondless/w-b/Ajax.html#_6、-jqxhr-对象-when-方法、done-方法、always-方法和fail-方法" style="margin-left:70px;">6、 jqXHR 对象: when()方法、done()方法、always()方法和fail()方法</a>
### [章节7.Node.js](/secondless/w-b/Node.js '章节7.Node.js')
####  <a href="/secondless/w-b/Node.js.html#一、node环境搭建-安装node-js" style="margin-left:40px;">一、Node环境搭建（安装node.js）</a>
####  <a href="/secondless/w-b/Node.js.html#_1、-下载安装node-js" style="margin-left:70px;">1、 下载安装node.js</a>
####  <a href="/secondless/w-b/Node.js.html#_2、-检查node-js是否安装成功" style="margin-left:70px;">2、 检查node.js是否安装成功</a>
#####  <a href="/secondless/w-b/Node.js.html#_1-命令行-node-v-npm-v-npx-v" style="margin-left:100px;">① 命令行：node -v npm -v npx -v</a>
#####  <a href="/secondless/w-b/Node.js.html#_2-命令行-node-运行js代码" style="margin-left:100px;">② 命令行：node 运行js代码</a>
#####  <a href="/secondless/w-b/Node.js.html#_3-命令行-运行js文件代码-清屏命令-cls" style="margin-left:100px;">③ 命令行：运行js文件代码，清屏命令: cls</a>
####  <a href="/secondless/w-b/Node.js.html#二、nvm-node版本管理工具-切换node版本" style="margin-left:40px;">二、NVM（node版本管理工具，切换node版本）</a>
####  <a href="/secondless/w-b/Node.js.html#_1、-下载安装nvm" style="margin-left:70px;">1、 下载安装nvm</a>
####  <a href="/secondless/w-b/Node.js.html#_2、检查nvm是否安装成功-nvm-v" style="margin-left:70px;">2、检查nvm是否安装成功：nvm -v</a>
####  <a href="/secondless/w-b/Node.js.html#_3、设置nodejs、npm下载源-可选" style="margin-left:70px;">3、设置nodejs、npm下载源（可选）</a>
####  <a href="/secondless/w-b/Node.js.html#_4、使用nvm包管理器" style="margin-left:70px;">4、使用NVM包管理器</a>
####  <a href="/secondless/w-b/Node.js.html#三、npm包管理-npm包管理工具" style="margin-left:40px;">三、NPM包管理（npm包管理工具）</a>
####  <a href="/secondless/w-b/Node.js.html#_1-package-json-文件如何生成" style="margin-left:70px;">1、 package.json 文件如何生成</a>
####  <a href="/secondless/w-b/Node.js.html#_2-npm-npm-、-cnpm-cnpm" style="margin-left:70px;">2、 NPM (npm) 、 CNPM (cnpm)</a>
#####  <a href="/secondless/w-b/Node.js.html#i、-npm" style="margin-left:100px;">1、npm</a>
#####  <a href="/secondless/w-b/Node.js.html#ii、-cnpm-可选" style="margin-left:100px;">2、cnpm (可选)</a>
#####  <a href="/secondless/w-b/Node.js.html#_1-安装cnpm" style="margin-left:130px;">① 安装cnpm</a>
#####  <a href="/secondless/w-b/Node.js.html#_2-接下来就可以使用cnpm命令安装各个包、插件、模块等等" style="margin-left:130px;">② 接下来就可以使用cnpm命令安装各个包、插件、模块等等</a>
#####  <a href="/secondless/w-b/Node.js.html#_3-在vscode中运行命令" style="margin-left:130px;">③ 在vscode中运行命令</a>
#####  <a href="/secondless/w-b/Node.js.html#_4-npm-或-cnpm-常用命令" style="margin-left:130px;">④ npm 或 cnpm 常用命令</a>
####  <a href="/secondless/w-b/Node.js.html#四、node的模块" style="margin-left:40px;">四、Node的模块</a>
####  <a href="/secondless/w-b/Node.js.html#_1-全局模块-process为例" style="margin-left:70px;">1、全局模块 ：process为例</a>
####  <a href="/secondless/w-b/Node.js.html#_2-系统模块-path、fs模块为例" style="margin-left:70px;">2、系统模块 ： path、fs模块为例</a>
####  <a href="/secondless/w-b/Node.js.html#_3-自定义模块-exports、module输出、require引入" style="margin-left:70px;">3、 自定义模块： exports、module输出、require引入</a>
####  <a href="/secondless/w-b/Node.js.html#_4-重要系统模块-http模块-搭建网页服务器" style="margin-left:70px;">4、 重要系统模块：http模块，搭建网页服务器</a>
####  <a href="/secondless/w-b/Node.js.html#五、node中的数据交互-重要系统模块-url模块处理get请求-querystring模块处理post请求" style="margin-left:40px;">五、Node中的数据交互，重要系统模块：url模块处理get请求,querystring模块处理post请求</a>
####  <a href="/secondless/w-b/Node.js.html#_1-url模块处理get-get-请求-url-parse-url-true" style="margin-left:70px;">1、url模块处理GET（get）请求：url.parse(url,true)</a>
####  <a href="/secondless/w-b/Node.js.html#_2-querystring模块处理post-post-请求-querystring-parse" style="margin-left:70px;">2、querystring模块处理POST（post）请求：querystring.parse()</a>
####  <a href="/secondless/w-b/Node.js.html#六、nodejs项目监测文件变化-自动重启工具-nodemon" style="margin-left:40px;">六、nodejs项目监测文件变化，自动重启工具：Nodemon</a>
####  <a href="/secondless/w-b/Node.js.html#_1-安装nodemon" style="margin-left:70px;">1、安装nodemon</a>
####  <a href="/secondless/w-b/Node.js.html#_2-修改package-json-中的启动命令" style="margin-left:70px;">2、修改package.json 中的启动命令</a>
####  <a href="/secondless/w-b/Node.js.html#_3-配置nodemon-告诉它哪些文件需要修改后重启服务-可选项" style="margin-left:70px;">3、配置nodemon，告诉它哪些文件需要修改后重启服务（可选项）</a>
####  <a href="/secondless/w-b/Node.js.html#七、nrm-使用nrm管理npm下载源" style="margin-left:40px;">七、nrm (使用nrm管理npm下载源)</a>
####  <a href="/secondless/w-b/Node.js.html#_1-安装nrm" style="margin-left:70px;">1、安装nrm</a>
####  <a href="/secondless/w-b/Node.js.html#_2-nrm内置的命令函数" style="margin-left:70px;">2、nrm内置的命令函数</a>
####  <a href="/secondless/w-b/Node.js.html#_3-查看当前正在使用的-npm-镜像源" style="margin-left:70px;">3、查看当前正在使用的 npm 镜像源</a>
####  <a href="/secondless/w-b/Node.js.html#_4-切换-npm-镜像源" style="margin-left:70px;">4、切换 npm 镜像源</a>
####  <a href="/secondless/w-b/Node.js.html#八、系统模块-fs模块详解" style="margin-left:40px;">八、系统模块：fs模块详解</a>
####  <a href="/secondless/w-b/Node.js.html#_1-读取文件-异步readfile、同步readfilesync、promise操作" style="margin-left:70px;">1、读取文件： 异步readFile、同步readFileSync、promise操作</a>
####  <a href="/secondless/w-b/Node.js.html#_2-可读流模式-createreadstream-方法" style="margin-left:70px;">2、可读流模式：createReadStream()方法</a>
####  <a href="/secondless/w-b/Node.js.html#_3-创建文件夹-mkdirsync-mkdir" style="margin-left:70px;">3、创建文件夹：mkdirSync , mkdir</a>
####  <a href="/secondless/w-b/Node.js.html#_4-删除文件夹-rmsync-rm" style="margin-left:70px;">4、删除文件夹：rmSync , rm</a>
####  <a href="/secondless/w-b/Node.js.html#_5-重命名文件-renamesync-rename" style="margin-left:70px;">5、重命名文件：renameSync , rename</a>
####  <a href="/secondless/w-b/Node.js.html#_6-监听文件变化-watch" style="margin-left:70px;">6、监听文件变化: watch</a>
####  <a href="/secondless/w-b/Node.js.html#_7-写入文件-writefile、writefilesync-追加写入文件-appendfile、appendfilesync" style="margin-left:70px;">7、写入文件：writeFile、writeFileSync，追加写入文件：appendFile、appendFileSync</a>
####  <a href="/secondless/w-b/Node.js.html#_8-写入文件-创建可写流-createwritestream" style="margin-left:70px;">8、写入文件：创建可写流 createWriteStream()</a>
####  <a href="/secondless/w-b/Node.js.html#_9-软链接symlinksync、symlink-硬链接linksync、link" style="margin-left:70px;">9、软链接symlinkSync、symlink 硬链接linkSync、link</a>
####  <a href="/secondless/w-b/nodejs+jQuery开发留言板.html" style="margin-left:40px;" target="_blank">九、node.js + jQuery完成：网页 “联系我们” 页面的留言板功能</a>
####  <a href="/secondless/w-b/Node.js.html#十、系统模块-crypto模块详解-加密-对称加密、非对称加密、哈希函数" style="margin-left:40px;">十、系统模块：crypto模块详解（加密：对称加密、非对称加密、哈希函数）</a>
####  <a href="/secondless/w-b/Node.js.html#_1-对称加密" style="margin-left:70px;">1、对称加密、封装加密函数</a>
####  <a href="/secondless/w-b/Node.js.html#_2-非对称加密" style="margin-left:70px;">2、非对称加密</a>
####  <a href="/secondless/w-b/Node.js.html#_3-哈希函数加密" style="margin-left:70px;">3、哈希函数加密</a>
####  <a href="/secondless/w-b/nodejs服务器端app.js文件.html" style="margin-left:70px;" target="_blank">4、对留言板的手机号做一个加密</a>
### [章节8.正则表达式](/secondless/w-b/正则表达式 '章节8.正则表达式')
### [章节9.Vue.js基础](/secondless/w-b/Vue.js '章节9.Vue.js基础')


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