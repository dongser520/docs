---
navbar: true
sidebar: auto
title: 章节5.jQuery事件、动画、插件
---

前言
> 我们在第二学期第1季课程学习了js中的事件：<a href="/secondless/w-a/事件.html" target="_blank">第二学期第1季-章节16.事件</a>，掌握了常用的事件：click、dblclick、mousedown、mouseup、mousemove、mouseover、mouseout、change、select、submit、keydown、keypress、keyup、blur、focus、load、resize、scroll、error。那么jQuery给我封装了什么方法，让我们处理事件更好好用，本章了解一下。

## 一、事件
### 1、简写事件
> jQuery对常用的事件都进行了封装，可以使用简写形式 <br/>
> 简写事件绑定方法
> |  方法名             |  触发条件     |  描述                                 |   
> |   :--:             |   :--:       |   :--:                               | 
> |  click(fn)         |  鼠标        |   触发每一个匹配元素的 click(单击)事件  |
> |  dblclick(fn)      |  鼠标        |   触发每一个匹配元素的 dblclick(双击)事件  |
> |  mousedown(fn)     |  鼠标        |   触发每一个匹配元素的 mousedown(点击后)事件  |
> |  mouseup(fn)       |  鼠标        |   触发每一个匹配元素的 mouseup(点击弹起)事件  |
> |  mouseover(fn)     |  鼠标        |   触发每一个匹配元素的 mouseover(鼠标移入)事件  |
> |  mouseout(fn)      |  鼠标        |   触发每一个匹配元素的 mouseout(鼠标移出)事件  |
> |  mousemove(fn)     |  鼠标        |   触发每一个匹配元素的 mousemove(鼠标移动)事件  |
> |  mouseenter(fn)    |  鼠标        |   触发每一个匹配元素的 mouseenter(鼠标穿过)事件  |
> |  mouseleave(fn)    |  鼠标        |   触发每一个匹配元素的 mouseleave(鼠标穿出)事件  |
> |  keydown(fn)       |  键盘        |   触发每一个匹配元素的 keydown(键盘按下)事件  |
> |  keyup(fn)         |  键盘        |   触发每一个匹配元素的 keyup(键盘按下弹起)事件  |
> |  keypress(fn)      |  键盘        |   触发每一个匹配元素的 keypress(键盘按下)事件  |
> |  unload(fn)        |  文档        |   当卸载本页面时绑定一个要执行的函数  |
> |  resize(fn)        |  文档        |   触发每一个匹配元素的 resize(文档改变大小)事件  |
> |  scroll(fn)        |  文档        |   触发每一个匹配元素的 scroll(滚动条拖动)事件  |
> |  focus(fn)         |  表单        |   触发每一个匹配元素的 focus(焦点激活)事件  |
> |  blur(fn)          |  表单        |   触发每一个匹配元素的 blur(焦点丢失)事件  |
> |  focusin(fn)       |  表单        |   触发每一个匹配元素的 focusin(焦点激活)事件  |
> |  focusout(fn)      |  表单        |   触发每一个匹配元素的 focusout(焦点丢失)事件  |
> |  select(fn)        |  表单        |   触发每一个匹配元素的 select(文本选定)事件  |
> |  change(fn)        |  表单        |   触发每一个匹配元素的 change(值改变)事件  |
> |  submit(fn)        |  表单        |   触发每一个匹配元素的 submit(表单提交)事件  |
> 演示一个简写形式，其它都一样
> ```javascript
> $(function(){
>     $('#box').click(function(){
>         alert('点击了box');
>     });
> });
> ```
> 回忆原生js的事件写法
> ```javascript
> //原生js
> window.onload = function(){
>     //函数式
>     let box = document.querySelector('#box');
>     box.onclick = function(){
>          alert('点击了box')
>     }
>     //现代事件绑定
>     //现代浏览器自带这两个事件处理函数，添加事件addEventListener()删除removeEventListener()
>     //所有 DOM 节点中都包含这两个方法，并且它们都接受 3 个参数；
>     //事件名、函数、冒泡或捕获的布尔值(true 表示捕获，false 表示冒泡)
>     let box = document.querySelector('#box');
>     //box.addEventListener('click',function(){},false);
>     box.addEventListener('click',function(){
>         alert('点击了box');
>     },false);
> }
> ```
> <b>说明一下focus、blur 与 focusin、focusout的区别：都表示光标激活和丢失，只是触发的元素不同</b> <br/>
> .focus()和.blur()分别表示光标激活和丢失，事件触发时机是当前元素。而.focusin()和.focusout()也表示光标激活和丢失，但事件触发时机可以是子元素。<br/>
> ```javascript
> <div id="pox" style="background-color: red;width: 200px;height: 200px;">
>     <input type="text" name="test" value="123" />
> </div>
> $(function(){
>     // .focus()和.blur(): 事件触发时机是当前元素
>     $('input[name=test]').focus(function(){
>         console.log('focus');
>     });
>     $('input[name=test]').blur(function(){
>         console.log('blur');
>     });
>     //.focusin()和.focusout():事件触发时机可以是子元素
>     $('#pox').focusin(function(){
>         console.log('focusin');
>     });
>     $('#pox').focusout(function(){
>         console.log('focusout');
>     });
> });
> ```


### 2、复合事件：hover([fn1,]fn2)
> ```javascript
> //.hover()方法是结合了.mouseenter()方法和.mouseleva()方法
> $(function () {
>     //背景移入移出切换效果
>     $('#box').hover(function () {
>         $(this).css('background', 'black'); //mouseenter 效果
>     }, function () {
>         $(this).css('background', 'red'); //mouseleave 效果，可省略
>     });
> });
> ```
### 3、jQuery中的事件对象：target、currentTarget、e.stopPropagation()、e.preventDefault()、return false
> 我们已经在<a href="/secondless/w-a/事件.html#iii、事件对象" target="_blank">第二学期第1季-章节16.事件-Ⅲ、事件对象</a>详细讲解了事件对象，我们看一下jQuery中的事件对象给我们提供的方法和属性。
> ```javascript
> //原生js
> window.onload = function(){
>     //函数式
>     let box = document.querySelector('#box');
>     box.onclick = function(e){
>         console.log('函数式点击了box',e)
>     }
>     box.addEventListener('click',function(e){
>         console.log('现代事件绑定点击了box',e);
>     },false);
> }
> //jQuery
> $(function(){
>    $('#box').click(function(e){
>       console.log('jQuery点击box', e);
>    });
> });
> ```
> jQuery将原生js的事件对象信息保存到了originalEvent属性里面了，另外额外提供了一些属性方法供我们使用。<br/>
> 主要理解一下下面几个属性：
> 1. target：获取你点击的 DOM 元素
> 2. currentTarget: 获取绑定的DOM 元素，等同与this
> ```javascript
> <div id="pox" style="background-color: red;width: 200px;height: 200px;">
>     <input type="text" name="test" value="123" />
> </div>
> $(function(){
>    $('#pox').click(function(e){
>       //input在div里面，点input和div会返回相应的dom元素
>       console.log('target', e.target);
>       //看currentTarget: 获取绑定的 DOM 元素，等同与this
>       console.log('currentTarget',e.currentTarget);
>    });
> });
> ```
关于事件对象的学习，和我们第1季一样，里面的属性不需要大家记忆，用的时候，打印出事件对象e，然后去查看你需要的属性。<br/>
> 关于冒泡和阻止默认行为，我们在第1季也讲得非常清楚，jQuery提供了下面几个
> |  方法名                                |  描述                                   | 
> |   :--:                                |   :--:                                   |  
> |  e.preventDefault()                   |  取消某个元素的默认行为                     |  
> |  e.isDefaultPrevented()               |  判断是否调用了 e.preventDefault()方法       | 
> |  e.stopPropagation()                  |  取消事件冒泡                              | 
> |  e.isPropagationStopped()             |  判断是否调用了 e.stopPropagation()方法     | 
> |  e.stopImmediatePropagation()         |  取消事件冒泡，并取消该事件的后续事件处理函数       | 
> |  e.isImmediatePropagationStopped()    |  判断是否调用了 e.stopImmediatePropagation()方法       | 
return false;是e.preventDefault();e.stopPropagation();阻止冒泡和默认行为的简写形式。

### 4、jQuery中的高级事件：on、off 和 one
> jQuery 不但封装了大量常用的事件处理，还提供了不少高级事件方便开发者使用，并以on、off 和 one三个事件函数，统一处理我们开发中的复杂事件。
### ① on方法
> #### 1.基本写法 
> ```javascript
> $(function(){
>     $('#pox').on('click', function () {
>         console.log('点击了pox')
>     });
> });
> ```
> #### 2.使用额外数据
> ```javascript
> $(function(){
>     $('#pox').on('click', {username : '迪丽热巴'}, function (e) {
>         console.log('点击了pox并传递了额外数据',e.data.username);
>     });
> });
> ```
> #### 3.绑定多个事件
> ```javascript
> $(function(){
>     $('#pox').on('mouseover mouseout', function () {
>         console.log('鼠标移入移出都触发');
>     });
> });
> ```
> #### 4.以对象模式绑定多个事件
> ```javascript
> $(function(){
>     $('#pox').on({
>         mouseover : function () {
>             console.log('鼠标移入触发')
>         },
>         mouseout : function () {
>             console.log('鼠标移出触发')
>         }
>     });
> });
> ```
> #### 5. 阻止默认行为并取消冒泡
> ```javascript
> <form>
>    <input type="text" name="username" value="123" />
>    <input type="submit" value="提交">
> </form>
> $(function(){
>     // $('form').on('submit',false);//阻止默认行为并取消冒泡
>     $('form').on('submit', function (e) {
>         return false;
>         //e.preventDefault();//阻止默认行为
>         //e.stopPropagation();;//取消冒泡
>     });
>  });
> ```
> #### 6.处理事件委托（绑定父元素，执行子元素方法）
> ```javascript
> $(function(){
>     //事件委托参数：事件名，委托的子元素，执行的匿名函数
>     $('#box').on('click','span',function(e){
>         //注意事件委托中的this
>         console.log($(this).get(0));//this代表的是span
>     });
>     //事件委托一般是：子元素刚开始没有，动态生成的，可以委托绑定它的父元素执行
> 
>     //移除事件委托
>     $('#box').off('click','span');
> });
> ```

### ② off方法:移除事件
> ```javascript
> $(function(){
>   /*
>   $('#pox').on('click',function(){
>      alert('点了弹窗');
>   });
>   //移除点击事件
>   $('#pox').off('click');
>   */
> 
>   function test(){
>     alert('点了弹窗');
>   }
>   $('#pox').on('click',test);
>   $('#pox').off('click',test);
> });
> ```
绑定事件后都不是自动移除事件的，需要通过off()来手工移除。jQuery 提供了.one()方法，绑定元素执行完毕后自动移除事件，可以方法仅触发一次的事件。
### ③ one方法:仅触发一次的事件
> ```javascript
> $(function(){
>     $('#box').one('click',function(){
>         alert('点击了box');//执行完一次就自动销毁了
>     });
> });
> $(function(){
>     $('#box').one('click','span',function(e){
>         console.log($(this).get(0));//this代表的是span
>     });
> });
> ```


### 5、jQuery中的模拟操作
> ```javascript
> $(function(){
>     //正常情况需要用户点击才弹窗
>     // $('#pox').click(function(){
>     //     alert('pox')
>     // });
>     //模拟用户操作：不需要用户点击，页面打开就弹窗
>     // $('#pox').trigger('click');
>     //另外一种模拟写法
>     $('#pox').click(function(){
>         alert('pox')
>     }).click();
>     //我们常用的事件都可以这么写，在后面连缀执行一次就是模拟操作了
> });
> ```

## 二、动画
### 1、 显示：show、隐藏：hide
> ```javascript
> <div id="box" >
>    <span class="text-success">显示</span>
>    <span class="text-dark">隐藏</span>
> </div>
> <div id="pox" style="background-color: red;width: 200px;height: 200px;">
>    <input type="text" name="test" value="123" />
> </div>
> ```
> ### ① 直接调用：显示show()、隐藏：hide()
> ```javascript
> $(function(){
>     $('#box span.text-success').click(function(){
>         $('#pox').show();//显示
>     });
>     $('#box span.text-dark').click(function(){
>         $('#pox').hide();//隐藏
>     });
> });
> ```
> 注意：.hide()方法其实就是在行内设置 CSS 代码：display:none; 而.show()方法要根据原来元素是区块还是内联来决定，如果是区块，则设置 CSS 代码：display:block; 如果是内联，则设置 CSS 代码：display:inline;。
> ### ② 传递一个参数（毫秒）：显示show(1000)、隐藏：hide(1000)
> ```javascript
> $(function(){
>     $('#box span.text-success').click(function(){
>         $('#pox').show(1000);//显示
>     });
>     $('#box span.text-dark').click(function(){
>         $('#pox').hide(1000);//隐藏
>     });
> });
> ```
> ### ③ 传递一个预设参数：显示show(slow|normal|fast)，隐藏：hide(slow|normal|fast)，slow：600 毫秒，normal：默认 400 毫秒，fast：200 毫秒
> ```javascript
> $(function(){
>     $('#box span.text-success').click(function(){
>         $('#pox').show('slow');//600毫秒
>         // $('#pox').show('normal');//默认 400毫秒 传错参数执行这个
>         // $('#pox').show('fast');//200毫秒
>     });
>     $('#box span.text-dark').click(function(){
>         // $('#pox').hide('slow');//600毫秒
>         // $('#pox').hide('normal');//默认 400毫秒 传错参数执行这个
>         $('#pox').hide('fast');//200毫秒
>         //$('#pox').hide('fast1');//传错参数了，默认执行400毫秒
>     });
> });
> ```
> ### ④ 传递第二个参数回调函数，实现列队动画（排队动画）：show(毫秒数|slow|normal|fast，function(){})，hide(毫秒数|slow|normal|fast，function(){})
> ```javascript
> $(function(){
>     $('#box span.text-success').click(function(){
>         $('#pox').show('slow',function(){
>             $('#main_business').show(1000);
>         });
>     });
>     $('#box span.text-dark').click(function(){
>         $('#pox').hide('fast',function(){
>             $('#main_business').hide(2000);
>         });
>     });
> });
> ```
> ### ⑤ 列队动画，可以使用函数名调用自身或者arguments.callee 匿名函数自调用
> ```javascript
> <div id="test">
>    <span style="padding: 10px;background-color: orange;color: white;font-size: 20px;">迪</span>
>    <span style="padding: 10px;background-color: orange;color: white;font-size: 20px;">丽</span>
>    <span style="padding: 10px;background-color: orange;color: white;font-size: 20px;">热</span>
>    <span style="padding: 10px;background-color: orange;color: white;font-size: 20px;">巴</span>
> </div>
> $(function(){
>     $('#box span.text-dark').click(function(){
>         // $('#test span').hide('slow');//同步动画
> 
>         // $('#test').children().first().hide('fast', function() {
>         //     $(this).next().hide('fast', function(){
>         //         $(this).next().hide('fast',function(){
>         //             $(this).next().hide('fast');
>         //         });
>         //     });
>         // });        
> 
>         //函数名调用自身
>         // $('#test').children().first().hide('fast', function hideSpan() {
>         //     $(this).next().hide('fast', hideSpan);
>         // });
> 
>         //arguments.callee 不用传函数名，匿名递归调用
>         // $('#test').children().first().hide('fast', function() {
>         //     $(this).next().hide('fast', arguments.callee);
>         // });
>     });
>     $('#box span.text-success').click(function(){
>         // $('#test span').show('slow');//同步动画
>         // $('#test').children().first().show('fast', function showSpan() {
>         //     $(this).next().show('fast', showSpan);
>         // });
>         //arguments.callee 不用传函数名，匿名递归调用
>         $('#test').children().first().show('fast', function() {
>             $(this).next().show('fast', arguments.callee);
>         });
>     });
> });
> ```
> ### ⑥ toggle()切换show()和hide()
> ```javascript
> <div id="box" >
>    <span class="text-danger">切换</span>
> </div>
> $(function(){
>     $('#box span.text-danger').click(function(){
>         $('#pox').toggle('fast');
>     });
> });
> ```

### 2、 滑动：slideUp、卷动：slideDown、切换滑动卷动：slideToggle
> 这是一组改变元素高度的方法，注意用法和上面的show/hide/toggle一样，只是动画效果不同
> ```javascript
> $(function(){
>     //向上收缩(卷动)，类似隐藏：slideUp
>     $('#box span.text-dark').click(function(){
>         $('#pox').slideUp('slow');
>     });
>     //向下展开(滑动)，类似显示：slideDown
>     $('#box span.text-success').click(function(){
>         $('#pox').slideDown('slow');
>     });
>     //切换滑动卷动
>     $('#box span.text-danger').click(function(){
>         $('#pox').slideToggle('slow');
>     });
> });
> ```
### 3、 淡入：fadeIn、淡出：fadeOut、切换淡入淡出：fadeToggle、指定透明度：fadeTo
> 这是一组专门用于透明度变化的方法，注意用法和上面的show/hide/toggle一样，只是动画效果不同
> ```javascript
> $(function(){
>     //淡出，类似隐藏：fadeOut
>     $('#box span.text-dark').click(function(){
>         $('#pox').fadeOut('slow');
>     });
>     //淡入，类似显示：fadeIn
>     $('#box span.text-success').click(function(){
>         $('#pox').fadeIn('slow');
>     });
>     //切换淡入淡出
>     $('#box span.text-danger').click(function(){
>         $('#pox').fadeToggle('slow');
>     });
>     //指定透明度
>     $('#box span.text-dark').click(function(){
>         $('#pox').fadeTo('slow',0.38);
>     });
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