---
navbar: true
sidebar: auto
title: 章节14.浏览器对象模型BOM及浏览器检测
---


> BOM 也叫浏览器对象模型，它提供了很多对象，用于访问浏览器的功能。

## 1、window 对象
> BOM 的核心对象是 window，它表示浏览器的一个实例。window 对象处于js结构的最顶层，对于每个打开的窗口，系统都会自动为其定义 window 对象。
> <img src="/2-1-14-01.jpg" alt="window 对象" class="zoom-custom-imgs" style="display:inline-block;"> <br/>
> 总结一下：<br/>
> 1. window对象是最顶层的对象；
> 2. window对象有六大属性，这六大属性本身也是对象；
> 3. window对象旗下的document属性，本身也是对象，并且document对象旗下有五大属性
> 4. document对象旗下这5大属性也是对象
> ### ① window 对象的属性和方法
> window 对象有一系列的属性，这些属性本身也是对象。<br/><br/>
> <b>window 对象的属性</b>
> |  属性                          |  说 明                                  |   
> |   :--:                         |   :--:                                 |    
> |  closed                        |  当窗口关闭时为真                        | 
> |  defaultStatus                 |  窗口底部状态栏显示的默认状态消息          | 
> |  document                      |  窗口中当前显示的文档对象                 | 
> |  frames                        |  窗口中的框架对象数组                     | 
> |  history                       |  保存有窗口最近加载的 URL                 | 
> |  length                        |  窗口中的框架数                           | 
> |  location                      |  当前窗口的 URL                        | 
> |  name                          |  窗口名                                 | 
> |  offscreenBuffering            |  用于绘制新窗口内容并在完成后复制已存在的内容，控制屏幕更新                        | 
> |  opener                        |  打开当前窗口的窗口                        | 
> |  parent                        |  指向包含另一个窗口的窗口（由框架使用）                        | 
> |  screen                        |  显示屏幕相关信息，如高度、宽度（以像素为单位）                        | 
> |  self                          |  指示当前窗口                            | 
> |  status                        |  描述由用户交互导致的状态栏的临时消息                        | 
> |  top                           |  包含特定窗口的最顶层窗口（由框架使用）                       | 
> |  window                        |  指示当前窗口，与 self 等效                        | 
> <b>window 对象的方法</b>
> |  方法                           |  功能                                   |   
> |   :--:                          |   :--:                                 |  
> |  alert(text)                    |  创建一个警告对话框，显示一条信息          |   
> |  blur()                         |  将焦点从窗口移除          |
> |  clearInterval(interval)        |  清除之前设置的定时器间隔                 |
> |  clearTimeOut(timer)            |  清除之前设置的超时                       |
> |  close()                        |  关闭窗口                                |
> |  confirm()                      |  创建一个需要用户确认的对话框              |
> |  focus()                        |  将焦点移至窗口                          |
> |  open(url,name,[options])       |  打开一个新窗口并返回新 window 对象        |
> |  prompt(text,defaultInput)      |  创建一个对话框要求用户输入信息          |
> |  scroll(x,y)                    |  在窗口中滚动到一个像素点的位置          |
> |  setInterval(expression,milliseconds)  |  经过指定时间间隔计算一个表达式          |
> |  setInterval(function,millisenconds,[arguments])  |  经过指定时间间隔后调用一个函数          |
> |  setTimeout(expression,milliseconds)              |  在定时器超过后计算一个表达式          |
> |  setTimeout(expression,milliseconds,[arguments])  |  在定时器超过时后计算一个函数          |
> |  print()                        |  调出打印对话框          |
> |  find()                         |  调出查找对话框          |
> <b>window对象下的属性和方法的调用</b> <br/>
> 可以使用 window.属性、window.方法()或者直接属性、方法()
的方式调用。例如：window.alert()和 alert()是一个意思。


## 2、window对象：系统对话框
> 浏览器通过 alert()、confirm()和 prompt()方法可以调用系统对话框向用户显示信息。系
统对话框与浏览器中显示的网页没有关系，也不包含 HTML。
> ### ① 弹出警告:alert()
> ``` javascript
> alert('迪丽热巴');
> window.alert('迪丽热巴');
> ```
> ### ② 确定和取消:confirm()
> ``` javascript
> confirm('请确定或者取消'); //这里按哪个都无效
> //confirm 本身有返回值，返回的是布尔值,点击确定返回true,点击取消返回false
> if (confirm('是否提交数据')) { 
>     console.log('您按了确定！'); //按确定返回 true
> } else {
>     console.log('您按了取消！'); //按取消返回 false
> }
> ```
> ### ③ 输入提示框:prompt()
> 两个参数，一个提示，一个默认值，本身返回输入的值
> ``` javascript
> let num = prompt('请输入一个数字', 0); 
> console.log(num); //返回值可以得到
> 
> let num = prompt('请输入一个数字', 0);
> if(num != null){
>     console.log(num);
> }
> ```
> 
## 3、window对象：调出打印机print()
> ``` javascript
> print(); //打印  window.print();
> ```

## 4、window对象：网页新建窗口open()
> 使用 window.open()方法可以导航到一个特定的 URL，也可以打开一个新的浏览器窗口。它可以接受四个参数：1.要加载的 URL；2.窗口的名称或窗口目标；3.一个特性字符串；4.一个表示新页面是否取代浏览器记录中当前加载页面的布尔值。
> ``` javascript
> open('https://www.baidu.com'); //新建页面并打开百度
> //不命名会每次打开新窗口，命名的第一次打开新窗口，之后在这个窗口中加载。
> open('https://www.baidu.com','baidu'); //新建页面并命名窗口并打开百度
> //窗口目标是提供页面的打开的方式，比如本页面，还是新建。
> open('https://www.baidu.com','_parent'); //在本页窗口打开百度,_blank 是新建
> ```
> 第三个是字符串参数
> |  设置                           |  值                            |   说明                                   |   
> |   :--:                          |   :--:                        |  :--:                                   | 
> |  width                          |  数值                         |   新窗口的宽度。不能小于 100               |
> |  height                         |  数值                         |   新窗口的高度。不能小于 100               |
> |  top                            |  数值                         |   新窗口的 Y 坐标。不能是负值               |
> |  left                           |  数值                         |   新窗口的 X 坐标。不能是负值               |
> |  location                       |  yes 或 no                    |   是否在浏览器窗口中显示地址栏。不同浏览器默认值不同         |
> |  menubar                        |  yes 或 no                    |   是否在浏览器窗口显示菜单栏。默认为 no               |
> |  resizable                      |  yes 或 no                    |   是否可以通过拖动浏览器窗口的边框改变大小。默认为 no               |
> |  scrollbars                      |  yes 或 no                    |   如果内容在页面中显示不下，是否允许滚动。默认为 no               |
> |  status                         |  yes 或 no                    |   是否可以通过拖动浏览器窗口的边框改变大小。默认为 no               |
> |  toolbar                      |  yes 或 no                    |   是否在浏览器窗口中显示工具栏。默认为 no               |
> |  fullscreen                      |  yes 或 no                    |   浏览器窗口是否最大化，仅限 IE             |
> ``` javascript
> open('http://www.baidu.com','baidu','width=400,height=400,top=200,left=200,scrollbars=yes');
> ```
> <b>open 本身返回子窗口的window对象</b>
> ``` javascript
> let win = open('http://www.baidu.com','baidu','width=400,height=400,top=200,left=200,scrollbars=yes');
> win.alert(123);
> ```

## 5、window对象：窗口页面的位置和大小
> ### ① 窗口页面的位置：screenX（screenLeft）和 screenY（screenTop）
> 用于表示窗口相对于屏幕左边和上边的位置的属性，在以前的老版本浏览器上，提供了如下方法：
> 1. screenLeft 和 screenTop 属性：支持的浏览器有：IE、Safari、Opera 和 Chrome（就火狐不支持）
> 2. screenX 和 screenY 属性：支持的浏览器有：Firefox、Safari 和 Chrome
> 所以，我们以前的程序员要为浏览器做兼容处理
> ``` javascript
> console.log(screenLeft);
> console.log(screenTop);
> console.log(screenX);
> console.log(screenY);
> ```
> 说明：由于浏览器的不断升级以及微软抛弃了IE浏览器，现在的浏览器标准逐渐统一，我们采用screenX 和 screenY 属性即可。另外，我们常用的搜狗浏览器、360浏览器、QQ浏览器等，都是谷歌内核，所以按照的也是谷歌的标准，即谷歌浏览器支持的属性，它们也支持。
> ### ② 窗口页面的大小：innerWidth和 innerHeight，outerWidth 和 outerHeight，document.documentElement.clientWidth和document.documentElement.clientHeight
> ``` javascript
> //所有浏览器都支持（性能稍差）
> console.log('页面长度（可视宽度）:' +  document.documentElement.clientWidth);
> console.log('页面高度（可视高度）:' +  document.documentElement.clientHeight);
> 
> //除IE都支持
> console.log('页面长度（可视宽度）:' + innerWidth); //页面长度（可视宽度）
> console.log('页面高度（可视高度）:' + innerHeight); //页面高度（可视高度）
> console.log('页面长度+边框:' + outerWidth); //页面长度+边框
> console.log('页面高度+边框:' + outerHeight); //页面高度+边框
> ```
> 说明：由于浏览器的不断升级以及微软抛弃了IE浏览器，现在的浏览器标准逐渐统一，我们采用innerWidth和 innerHeight，outerWidth 和 outerHeight

## 6、window对象：定时器（超时调用和间歇调用）
> js是单线程语言，但它允许通过设置超时值和间歇时间值来调度代码在特定的时刻执行。
> ### ① 超时调用：setTimeout()方法
> setTimeout()方法在指定的时间过后执行代码，接受两个参数：第一个参数可以是字符串，里面可以是代码块，因为它有解析功能。第二个参数是毫秒数的超时时间。
> ``` javascript
> //写法1：不建议直接使用字符串:容易写错，不容易扩展
> console.log(100);
> setTimeout("console.log(100)", 3000);
> //写法2：先写函数，在传入函数名
> function text(){
>     console.log(100);
> }
> setTimeout(text, 3000);
> //写法3：
> setTimeout(function(){
>    console.log(100);
> },3000);
> setTimeout(() => {
>     console.log(100);
> }, 3000);
> ```
> 
> ### ② 取消超时调用：clearTimeout()方法
> 调用 setTimeout()之后，该方法会返回一个数值 ID，表示超时调用。这个超时调用的 ID是计划执行代码的唯一标识符，可以通过它来取消超时调用。要取消尚未执行的超时调用计划，可以调用 clearTimeout()方法并将相应的超时调用 ID作为参数传递给它。
> ``` javascript
> //把超时调用的 ID 复制给 text
> let time = setTimeout(() => {
>     console.log(100);
> }, 1000);
> console.log(time);
> clearTimeout(time); //把 ID 传入，取消超时调用
> ```
> ### ③ 间歇调用：setInterval()方法
> setInterval()方法是每隔指定的时间就执行一次代码,写法和超时调用类似
> ``` javascript
> let n = 0;
> setInterval(function(){
>     console.log(n++);
> },1000);
> ```
> 上面的代码按照1秒不停的执行下去，只有页面卸载关闭或者被取消，才会从内存移除。因此，取消间歇调用的重要性要远远高于取消超时调用，因为在不加干涉的情况下，间歇调用将会一直执行到页面关闭，那么怎么取消间歇调用呢？
> ### ④ 取消间歇调用：clearInterval()方法
> 它和超时调用取消方法类似
> ``` javascript
> let n = 0;
> let _time =  setInterval(function(){
>     console.log(n++);
> },1000);
> clearInterval(_time);
> ```
> ### ⑤ 模拟定时器功能，超时调用模拟间歇调用
> ``` javascript
> let num = 0;
> let max = 5;
> setInterval(function(){
>     num++;
>     console.log(num); 
>     if(num == max){
>         clearInterval(this); 
>         console.log('加到5了，停止输出');
>     }
> },1000);
>
> //事实上到了5秒之后，仍然在打印，this无法指向本身ID,也就是定时器ID不明确，无法取消
> let num = 0;
> let max = 5;
> let ID = null;
> function text(){
>     num++;
>     console.log(num); 
>     if(num == max){
>         clearInterval(ID);
>         console.log('加到5了，停止输出');
>     }
> }
> ID = setInterval(text,1000);
>
> //通过上面的例子可以看出，在开发环境下，很少使用真正的间歇调用，因为需要根据情况来取消 ID，
> //并且可能造成同步的一些问题，我们建议不使用间歇调用，而去使用超时调用。
> //一般，使用超时调用来模拟间歇调用是一种最佳模式
> let num = 0;
> let max = 5;
> setTimeout(text, 1000);
> //text();
> function text(){
>     num++;
>     console.log(num);
>     if(num == max){
>         console.log('5秒到了，停止打印')
>     }else{
>         setTimeout(text,1000);
>     }
> }
> //在使用超时调用时，没必要跟踪超时调用 ID，因为每次执行代码之后，如果不再设置另一次超时调用，调用就会自行停止。
> ```

## 7、location 对象 
> location 是 BOM 对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。事实上，location 对象是 window 对象的属性，也是 document 对象的属性；所以 window.location 和 document.location 等效。<br/>
> 这个对象获取的是网址相关信息，在本地不方便观察，老师将一个test.html这个网页放到了服务器上给大家介绍。访问：https://www.51yrc.com:443/test.html?id=5&name=reba#锚点
> ### ① location 对象：获取网址相关信息
> ``` javascript
> //获取当前的 URL信息
> console.log(location);
> console.log(window.location);
> console.log(document.location);
> 
> //https://www.51yrc.com:443/test.html?id=5&name=reba#锚点
> 
> //hash  如果该部分存在，表示锚点部分
> console.log(location.hash); //#锚点
> //同样，也可以设置
> location.hash = '#哈哈哈';
> //跳转到新的网址： https://www.51yrc.com:443/test.html?id=5&name=reba#哈哈哈
> 
> //host 主机名：端口号
> console.log(location.host); //www.51yrc.com:443
> //hostname 主机名(域名)
> console.log(location.hostname);//www.51yrc.com
> //href  整个 URL(完整网址)
> console.log(location.href);//https://www.51yrc.com:443/test.html#锚点
> //origin 
> console.log(location.origin);//https://www.51yrc.com:443
> //pathname 路径名
> console.log(location.pathname);// /test.html
> //port 端口号
> console.log(location.port); // 443
> //protocol 协议: http https ftp 等等
> console.log(location.protocol); // https:
> //search 查询字符串
> console.log(location.search); // ?id=5&name=reba
> ```
> 说明：location对象多用于动态生成二维码网址的时候使用，获取相关网址数据。同学们不需要记，用的时候，可以通过console.log(location);查看获取你想要的相应部分数据。

> ### ② location 对象：assign()方法跳转到指定页面，与 href 等效
> ``` javascript
> // location.href = 'https://www.baidu.com';
> location.assign('https://www.baidu.com');
> ```
> ### ③ location 对象：reload()方法，刷新页面
> ``` javascript
> location.reload();//最有效的重新加载，有可能从缓存加载，可能不会更新页面数据
> location.reload(true);//强制加载，从服务器源头重新加载, 加载会慢一些，但是如果有数据更新会更新页面数据
> ```
> ### ④ location 对象：repalce()方法，用新的 URL 替换当前页面
> ``` javascript
> 
> location.replace('test.html?id=5');
> location.href = 'https://www.baidu.com';//部分浏览器会有后退按钮，返回上一页
> location.replace('https://www.baidu.com');//没有后退按钮
> //以上两种跳转，根据自己的业务确定哪一种，href用的较多
> ```
> ### ⑤ 获取网址url参数中的键值对
> ``` javascript
> //https://www.51yrc.com:443/test.html?id=5&name=reba#锚点
> function getArgs(){
>     console.log(location.search);// ?id=5&name=reba
>     console.log(location.search.substring(1));//id=5&name=reba
>     let search = location.search.length > 0 ? location.search.substring(1):'';
>     console.log(search);//id=5&name=reba
>     let items = search.split('&');
>     console.log(items);// [id=5,name=reba]
> 
>     let item=null,name=null,value=null;
>     let arr = [];
>     for(let i=0;i<items.length;i++){
>          console.log(items[i]); //id=5  name=reba
>          item = items[i].split('=');
>          console.log(item);//['id', '5']  ['name', 'reba']
>          name = item[0];
>          value = item[1];
>          console.log(name);// id   name
>          console.log(value);// 5   reba
>          arr[name] = value;
>     }
>     return arr;//[id: '5', name: 'reba']
> }
> 
> console.log(getArgs());//[id: '5', name: 'reba']
> let arrs = getArgs();
> console.log(arrs['id']);//5
> console.log(arrs['name']);//reba
> ```


## 8、history 对象 : 属性:length，方法：back()、forward()、go(num)
> history 对象是 window 对象的属性，它保存着用户上网的记录，从窗口被打开的那一刻算起。
> ``` javascript
> console.log(history.length);//历史记录条数
> //history.back();//历史记录前一条网址
> //history.forward();//历史记录后一条网址
> //history.go(2);//跳转指定历史记录的 URL  2上两页 -2下两页
> ```


## 9、navigator 对象：浏览器检测对象
> navigator 对象最早由 Netscape Navigator2.0 引入的 navigator 对象。在微软抛弃IE浏览器以前，各家浏览器都有自己独有的一些属性和扩展，给我们程序员开发造成了很多不便，需要给各个浏览器做兼容，那么如何判断用户使用的是哪一款浏览器，比如，用户使用的是谷歌浏览器，还是苹果浏览器，还是火狐浏览器，还是IE浏览器等等，而且同一款浏览器不同版本，它的功能和扩展性也有不同，因此，在以前的开发中，我们使用navigator 对象来判断用户使用的是哪一款浏览器，使用的是哪个版本等等，来相应做兼容处理。随着现代浏览器的不断升级、微软也过渡到了Edge浏览器，各家浏览器的标准逐渐统一，我们现在开发网页，做兼容处理的情况就比较少了，所以，关于浏览器检测对象navigator，我们本节课做一个了解，如果需要用到的时候，大家在回来查看。
> ### ① 获取浏览器相关信息
> ``` javascript
> console.log(navigator);//window.navigator
> console.log('浏览器名称：' + navigator.appName);//Netscape  这个属性不能精确取到浏览器名称
> console.log('浏览器版本：' + navigator.appVersion);
> //浏览器用户代理字符串:就是将用户使用的浏览器各方面信息给展示出来
> console.log('浏览器用户代理字符串：' + navigator.userAgent);
> console.log('浏览器所在的系统平台（非系统版本）：' + navigator.platform);
> ```
> ### ② 浏览器插件检测
> 插件是一类特殊的程序，可以扩展浏览器的功能，相信每个同学浏览器上或多或少安装过插件，如：flash插件，翻译插件，下载文件插件等，navigator 对象的 plugins 属性可以得到用户安装的插件信息，它是一个数组。
> ``` javascript
> console.log('插件信息: ' , navigator.plugins);
> console.log('插件数量:' + navigator.plugins.length);
> for (let i = 0; i < navigator.plugins.length; i ++) {
>     console.log('插件名字：' + navigator.plugins[i].name);
> }
> 
> //模拟场景：判断用户浏览器是否安装PDF插件，有的话就直接打开pdf文件，没有的话就转到你开发的在线阅读pdf页面打开pdf文件
> function hasPlugin(name) {
>     name = name.toLowerCase();
>     for (var i = 0; i < navigator.plugins.length; i ++) {
>         if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
>             return true;
>         }
>     }
>     return false;
> }
> console.log(hasPlugin('PDF'));
> if(hasPlugin('PDF')){
>    console.log('直接打开pdf文件');
> }else{
>     console.log('转到网页打开pdf');
> }
> ```

> ### ③ MIME 类型检测
> navigator 对象的 mimeTypes 属性可以得到浏览器支持访问的文件类型（MIME 类型），它是一个数组。这个我们在配置服务器的时候，还会讲到，这里做了解。
> ``` javascript
> console.log('MIME 类型信息: ' , navigator.mimeTypes);
> for (var i = 0; i < navigator.mimeTypes.length; i++) {
>     if (navigator.mimeTypes[i].enabledPlugin != null) {
>     document.write('<dl>');
>     document.write('<dd>类型名称：' + navigator.mimeTypes[i].type + '</dd>');
>     document.write('<dd>类型引用：' + navigator.mimeTypes[i].enabledPlugin.name +
>     '</dd>');
>     document.write('<dd>类型描述：' + navigator.mimeTypes[i].description + '</dd>');
>     document.write('<dd>类型后缀：' + navigator.mimeTypes[i].suffixes + '</dd>');
>     document.write('</dl>')
>     }
> }
> ```

> ## 10、navigator 对象：浏览器检测场景使用
> ### ① 用户代理检测
> ``` javascript
> console.log('浏览器用户代理字符串：' + navigator.userAgent);
> //谷歌
> //Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36
> //Edge浏览器
> //Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.60
> //搜狗
> //Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 SE 2.X MetaSr 1.0
> //安卓手机——Samsung Galaxy S8+ 为代表
> //Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36
> //苹果手机——iPhoneX代表
> //Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1
> ```
> ### ② 判断设备是不是安卓系统
> ``` javascript
> function isAndroid() {
>     let u = navigator.userAgent;
>     let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
>     return  isAndroid ? true : false;
> }
> console.log('是否安卓设备：'+ isAndroid());
> ```
> ### ③ 判断设备是不是苹果系统
> ``` javascript
> function isIos() {
>     var u = navigator.userAgent;
>     var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
>     return isiOS ? true : false;
> }
> console.log('是否苹果设备：' + isIos());
> ```
> ### ④ 判断用户是否在微信上面浏览网页
> ``` javascript
> //针对在微信上面查看网页，安卓手机和苹果手机表现有些不同，有时候需要判断用户是否在微信上面看网页
> function isWeiXin(){
>     let ua = window.navigator.userAgent.toLowerCase();
>     return ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false;
> }
> console.log(isWeiXin());
> ```
> ### ⑤ 获取操作系统，判断用户查看网页的设备是电脑设备，还是手机设备
> ``` javascript
> console.log(navigator.platform);
> let system = { //操作系统
>     win : false, //windows
>     mac : false, //Mac
>     x11 : false //Unix、Linux
> };
> let p = navigator.platform; //获取系统 
> system.win = p.indexOf('Win') == 0; //判断是否是 windows
> system.mac = p.indexOf('Mac') == 0; //判断是否是 mac
> system.x11 = (p == 'X11') || (p.indexOf('Linux') == 0) //判断是否是 Unix、Linux
> 
> console.log('系统情况：' ,  system);
> ```
> 如果手机设备就跳转到手机端网站（响应式网站除外），用户只记住你的电脑端网站是www.abc.com开头的，你的手机网站是wap.abc.com, 用户用手机打开www.abc.com会自动跳转到手机网站wap.abc.com
> ``` javascript
> var machine={
> 	the_machine:function(){
> 		var system = {win: false,mac: false,xll: false};
>         var p = navigator.platform;
>         var oMeta = document.createElement('meta');
>         oMeta.charset = 'utf-8';
>         document.getElementsByTagName('head')[0].appendChild(oMeta);
>         oMeta.setAttribute('name','Currentmachine');
>         system.win = p.indexOf("Win") == 0;
>         system.mac = p.indexOf("Mac") == 0;
>         system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
>         var device="";
>         if (system.win || system.mac || system.xll) {
>             oMeta.setAttribute('machine','pc');
>             let w = window.innerWidth;
>             if(w<768) oMeta.setAttribute('machine','phone');
>         } else {
>             oMeta.setAttribute('machine','phone');
>         }
>         machine.the_ie(oMeta);
> 	},
> 	the_ie:function(oMeta){
> 		//var ie;
> 		if (/msie [6|7|8]/i.test(navigator.userAgent)){
> 			oMeta.setAttribute('ie','8');
> 		}else if(/msie [9]/i.test(navigator.userAgent)){
> 		    oMeta.setAttribute('ie','9');//alert(oMeta.getAttribute('ie'));
> 		}else if(/msie [10]/i.test(navigator.userAgent)){
> 		    oMeta.setAttribute('ie','10');
> 		}else if(/msie [11]/i.test(navigator.userAgent)){
> 		    oMeta.setAttribute('ie','11');
> 		}else{
> 			oMeta.setAttribute('ie','false');
> 		}
> 		
> 	}
> }
> machine.the_machine();
> ```

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