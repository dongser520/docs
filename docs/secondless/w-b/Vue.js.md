---
navbar: true
sidebar: auto
title: 章节9.Vue.js基础
---

前言
> 1. 关于vue.js <br/><br/>
> 我们已经在第7章学习了nodejs的基础，然后在第8章学习了正则表达式，知道了如何搭建服务器。结合我们开发的留言板功能，已经懂得了在没有学习数据库的情况下，如何利用json文件存储我们的数据。<br/><br/>那么问题来了，我们开发的网页，写在页面上的内容，可不可以也采用json文件进行读取呢？如果页面上的电话号码需要修改，可不可以只修改一次就可以了，其它页面上的电话号码都跟着一起修改了呢？<br/><br/>
> 2. vue.js介绍 <br/><br/>
> Vue (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue 都可以胜任。<br/><br/>
> 重要说明：<br/><br/>
> 由于大家是第一次接触界面框架这个概念，`目前你可以粗俗的认为`：这个vue.js类似我们前面学习的jquery，它的出现是为了帮助我们更好的更快的高效地开发用户界面（网页），类似于我们前面学习的jquery是为了帮助我们更方便的使用原生js的各项功能而做的封装。<br/><br/>
> vue.js目前有两个版本：Vue2 和  Vue3。我们作为从0开始学习过来的初学者，我们将从最简单的开始学习。介于本章内容，是为了完成我们企业网页的数据渲染问题，`因此我们采用Vue2进行入门学习，在后面季度的课程，我们将逐步过渡到Vue3`。<br/><br/>
> 本章节，我们采用案例实战的形式，结合 <a href="https://www.runoob.com/vue2/vue-tutorial.html" target="_blank">[vue.js基础教程]</a>，来完成我们企业网页的数据渲染，带领大家初步了解vue.js的基础功能。

## 一、课前准备
### ① 启动node服务器，引入vue.js
> 引入vue.js方式很多，如在线引入，或者本地引入 <br/>
> 本地引入和我们前面讲jQuery一样，先下载到你电脑上然后引入到页面上，下载途径非常多，如cdn下载 <a href="https://www.bootcdn.cn/vue/" target="_blank">[vue.js下载]</a>  <br/>
> 在线引入：  <a href="https://cdn.staticfile.org/vue/2.7.0/vue.min.js" target="_blank">[vue.js在线引入]</a><br/><br/>
> 根目录新建 /vuetest.html，并引入vue文件（取名：vue.2.7.0.min.js）
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>vuejs基础学习</title>
    <link rel="stylesheet" href="./static/css/common.1.0.css">
    <script src="./static/js/vue.2.7.0.min.js"></script>
</head>
<body>
    <!-- 模板->vue->转成真实的dom -->
    <div id="app">
        <!-- <h1>vuejs基础学习页面</h1> -->
        <h1>{{title}}</h1>
    </div>
    <script>
        //vue.js给我们提供了一个构造函数 function Vue(){}，那么我们可以new出一个实例来
        //构造函数里面有一个对象参数，表示对Vue的配置
        new Vue({ //可以用一个变量接收，也可以不接收，重点看对象里面的配置
           //你要创建一个vue的应用，应该控制页面的那个区域，
           //虽然说vue可以控制整个页面，但是我们经常只控制页面中的一个小区域
           //当然如果页面的最外层就这一个div，那么就是控制整个页面了
           el:'#app',//css选择器，一般用id选择器
           //接下来有个配置data,可以把它配置为对象，表示说页面中要使用的数据
           //你可以写一些数据在页面上使用
           data:{//对象里面的属性名自已定义
               title:'vuejs基础学习页面',//如何将这个数据写在h1里面去
               //传统的js方式是 Dom选择器找到h1元素，设置h1.innerText='vuejs基础学习页面'
               //现在我们使用vuejs，当我们用vue去控制外面这个div之后，这个div里面的所有元素就变成了一个模板
               //过程是：模板->vue->转成真实的dom
               //这样的话，我们就可以在模板里面进行各种操作，比如，我们使用特殊的语法，将我们定义的title属性的值写到模版里面去
               //我们可以使用两个大括号{{里面可以写js的表达式}}
               //那么这个js读取的是什么呢，读取的是vue实例里面，可以用的东西，比如 data里面的数据可以用
               //意义在哪里呢？当我们data里面的数据发生变化的时候，模版会自动重新生成，再次把模版渲染成真实的dom
               //那么页面上的数据也会变化，如：title:'vuejs基础学习页面-大胡子语法mustach'
               //这就是vue最核心的特点，我们开发的时候，只需要关注数据的变化，不用在关注页面的变化
               //就是说我们整个页面有哪些东西变化了，比如 用户点击了或者发生了什么事件，或者隔段时间哪些数据会变化
               //而我们的页面写出来是一个模板，模版是根据页面的数据生成的，因此我们只需要关注我们的数据，页面就会自动跟着改变
           }
        });

    </script>
</body>
</html>
```

## 二、体验vue的数据响应式
> `注意：Vue 不能挂载在 body、html 这样的根节点上` <br/>
> 更多知识和配置项，参考：<a href="https://www.runoob.com/vue2/vue-tutorial.html" target="_blank">[vue.js基础教程]</a>
### ① 配置项data中的数据响应式，及渲染到页面上的真实DOM效果
> 可参考： <a href="https://www.runoob.com/vue2/vue-start.html" target="_blank">[Vue.js 起步]</a> <br/>
```html
<body>
    <script src="./static/js/vue.2.7.0.min.js"></script>
    <div id="app">
        <div class="py-5 px-5 bg-light" style="width: 320px;margin: auto;">
            <img :src="carimg" >
            <h2>车型名称 : {{carname}}</h1>
            <h3>类型 : {{caryear}}</h2>
            <h2>指导价 : {{price}}</h2>
            <h3>座位数 : {{seats}}</h2>
        </div>
    </div>
    <script>
        // 自定义数据对象
        let data = {
            carimg:'https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/benzGlc300.jpg',
            carname: "奔驰GLC 300 L 4MATIC 动感型 5座", 
            caryear: "2023款", 
            price: "47.93万",
            seats:5
        };
        var vm = new Vue({
            el: '#app',
            data: data
        });
        console.log(vm);
        // 它们引用相同的对象！
        console.log(vm.carname === data.carname); // true
        // 设置属性也会影响到原始数据
        // vm.price = "45.88万";
        // 反之亦然
        // data.seats = 7;

        //除了数据属性，Vue 实例还提供了一些有用的实例属性与方法。它们都有前缀 $，以便与用户定义的属性区分开来
        console.log(vm.$data === data); // true
        console.log(vm.$el === document.getElementById('app')); // true
    </script>
</body>
```
上节课已经带大家感受了配置项data中的数据响应式，所谓数据响应式：就是数据发生变化的时候，vue会收到通知并立即作出一些响应，并对页面进行重新渲染。
### ② 循环语句，事件处理体验
```html
<body>
    <script src="./static/js/vue.2.7.0.min.js"></script>
    <!--过程是：模板->vue->转成真实的dom -->
    <div id="app">
        <div class="flex justify-center">
            <div v-for="item in cars">
                <div class="bg-light py-5 px-5" style="width: 320px;">
                    <img :src="item.carimg">
                    <h2>车型名称：{{item.carname}}</h2>
                    <h3>车型：{{item.caryear}}</h3>
                    <h2>指导价：{{item.price}}</h2>
                    <h3>座位数：{{item.seats}}</h3>
                    <h2>库存数：
                        <button style="cursor: pointer;" @click="item.stock++"> + </button>
                        {{item.stock ? item.stock : '缺货'}} 
                        <button style="cursor: pointer;" @click="changeStock(item,item.stock-1)"> - </button>
                    </h2>
                </div>
            </div>
        </div>
    </div>
    <script>
        // 自定义数据
        let cardata = [
            {
                carimg:"https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/benzGlc300.jpg",
                carname:'奔驰GLC 300 L 4MATIC 动感型 5座',
                caryear:'2023款',
                price:'47.93万',
                seats:5,
                stock:10
            },
            {
                carimg:"https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/benzs.jpg",
                carname:'奔驰S500L 4MATIC 豪华型',
                caryear:'2024款',
                price:'158.68万',
                seats:5,
                stock:7
            },
            {
                carimg:"https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/benzc.jpg",
                carname:'奔驰C260L 皓夜版',
                caryear:'2023款',
                price:'25.32万',
                seats:5,
                stock:14
            }
        ];
        var vm = new Vue({
            el:'#app',
            data:{
                title:'奔驰1号仓库库存',
                cars:cardata
            },
            methods:{
                changeStock(item,newstock){
                    if(newstock < 0){
                        newstock = 0;
                    }
                    item.stock = newstock;
                }
            }
        });
    </script>
</body>
```
> 回顾 <br/>
> 1. <a href="https://www.runoob.com/vue2/vue-template-syntax.html" target="_blank"> js表达式</a> <br/> 
<a href="/secondless/w-a/javascript运算符.html" target="_blank" style="margin-left:25px;">[参考：js基础知识-js运算符]</a> <br/> 
<a href="/secondless/w-a/javascript基本包装类型.html" target="_blank" style="margin-left:25px;">[参考：js基础知识-基本包装类型：字符串、数组、数值的处理]</a>
 

### ③ vuejs计算属性体验
> 可参考： <a href="https://www.runoob.com/vue2/vue-computed.html" target="_blank">[Vue.js 计算属性]</a> <br/>
```html
<body>
    <script src="./static/js/vue.2.7.0.min.js"></script>
    <!--过程是：模板->vue->转成真实的dom -->
    <div id="app">
        <div class="flex justify-center">
            <div class="bg-light py-5 px-5" style="width: 320px;"
                v-for="(item,index) in cardata">
                <img :src="item.carimg">
                <h2>车型名称：{{item.carname}}</h2>
                <h3>车型：{{item.caryear}}</h3>
                <h2>指导价：{{item.price}}</h2>
                <h3>座位数：{{item.seats}}</h3>
                <h2>库存数：
                    <button style="cursor: pointer;" @click="item.stock++">
                        + </button>
                    {{item.stock ? item.stock : '缺货'}}
                    <button style="cursor: pointer;"
                        @click="changeStock(item,item.stock-1)"> - </button>
                </h2>
                <h1><button @click="deleteCar(index)">删除</button></h1>    
            </div>
        </div>
        <h1 class="flex justify-center">总库存： {{total}} {{totalfn()}}</h1>
    </div>
    <script>
    // 自定义数据对象
    let cardata = [
        {
            carimg:"https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/benzGlc300.jpg",
            carname:'奔驰GLC 300 L 4MATIC 动感型 5座',
            caryear:'2023款',
            price:'47.93万',
            seats:5,
            stock:8
        },
        {
            carimg:"https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/benzs.jpg",
            carname:'奔驰S500L 4MATIC 豪华型',
            caryear:'2024款',
            price:'158.68万',
            seats:5,
            stock:7
        },
        {
            carimg:"https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/benzc.jpg",
            carname:'奔驰C260L 皓夜版',
            caryear:'2023款',
            price:'25.32万',
            seats:5,
            stock:14
        }
    ];
    var vm = new Vue({
        el:'#app',
        data:{
            title:'奔驰1号仓库库存',
            cardata,
        },
        computed:{
            total(){
                return  this.cardata.reduce((a,b)=>a + b.stock,0);
            }  
        },
        methods:{
            changeStock(car,newStock){
                console.log(newStock);
                if(newStock < 0){
                    newStock = 0;
                }
                car.stock = newStock;
            },
            totalfn(){
                return  this.cardata.reduce((a,b)=>a + b.stock,0);
            },
            deleteCar(index){
                this.cardata.splice(index,1);
            }
        }
    });
    
</script>
</body>
```
> 搜索：`求和` 复习一下`reduce()`的用法。<br/>
> 数组中删除一项，搜索：`splice()方法`复习一下。

## 三、理解vue的注入、虚拟DOM及底层原理
### ① vue实例成员的注入
<img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/vue_zhuru.jpg" alt="下载node" class="zoom-custom-imgs" 
style="display:inline-block;" /> 

> 为什么vue实例自带的成员要以$开头或者以_下划线开头：`主要是由于我们在配置项中会注入新的成员，防止和我们注入的成员重名，我们注入的时候也要注入不要在写变量的时候以$开头下划线开头`. <br/>

> 模板中，可以使用vue实例中的成员，包括：我们注入的还有vue实例自带的。 <br/>
> 如： 存在vm.title 所以可以在模版中 `{{title} }`，存在 vm.$el 所以可以在模版中 `{{$el} } {{$el.tagName} }`，存在 vm.$data 所以可以在模版中 `{{$data} } {{$el.str} }`

### ② 虚拟DOM
> 我们在写案例的时候，已经多次说到，我们指定某个区域，这个区域就是vue的模版，写的这些元素按照我们以前的理解，它就是一个一个dom元素，但是你现在写到的是vue的模版里面，那么这些元素都不是DOM元素，vue会将这整个当做一个字符串，最终它会变成一个虚拟DOM，那为什么要这么做呢？<br/>
> Vue认为：`如果我某个数据改变了，我去重新生成界面，也就是说我如果直接去操作真实DOM元素，那么会严重的影响效率，因为真实的dom会触发浏览器的重排啊、回流啊、绘制啊等等，会触发浏览器的重新渲染，会引发效率问题，为了提升效率呢，vue使用的是虚拟DOM的方式，来描述要渲染的内容`，那么什么叫做虚拟DOM呢？
> 虚拟dom其实就是一个普通的js对象，操作js对象给js对象的属性赋值、更改属性值，这是整个js中执行效率最高的、执行最快的操作，因为它不涉及界面。接下来我们来举一个例子。

> `页面上有一个div元素它的id为app，它里面有两个子节点h1和p，然后h1元素里面有一个子节点，该子节点是一个文本节点，文本内容为“迪丽热巴”，p元素也有一个文本节点，文本内容为“全名：迪丽热巴迪力木拉提”` （这个我们在第二学期第1季课程-章节15.网页文档对象模型DOM，这些概念讲的非常清楚） <br/>
> 1. 看真实的DOM怎么写：
> ``` html
> <div id="app">
>     <h1>迪丽热巴</h1>
>     <p>全名：迪丽热巴迪力木拉提</p>
> </div>
> ```
> 2. 那Vue怎么认为呢？Vue会用虚拟DOM，就是一个js对象来进行描述：
> ``` js
> {
>     tagName:'div',
>     children:[
>         {tagName:'h1',children:[{text:'迪丽热巴'}]},
>         {tagName:'p',children:[{text:'全名：迪丽热巴迪力木拉提'}]}
>     ]
> }
> ```
> 然后，vue通过内置的编译器，将我们这个js对象，就是虚拟DOM，最终编译渲染成真实的DOM.
<img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/2-2-9-01.jpg" alt="虚拟DOM" class="zoom-custom-imgs" 
style="display:inline-block;" /> 
>
> 当数据发生变化后，将引发重新渲染，vue会比较新旧两个虚拟DOM对象，找出差异，然后把差异部分应用到真实DOM中
<img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/2-2-9-02.jpg" alt="虚拟DOM" class="zoom-custom-imgs" 
style="display:inline-block;" /> 

那么vue又是如何得到虚拟DOM的呢？
### ③ 虚拟DOM的底层原理
> 原因是在我们实例化Vue构造函数它里面的配置项，有一个render函数，`虚拟DOM的由来就是运行了Vue内置的render函数返回的结果，这个render函数对模版编译返回的结果就是虚拟DOM`，因此我们也可以在render函数里面写模版。
```html
<!-- 模版 -->
<div id="app">
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data:{
            h1data:'迪丽热巴',
            pdata:'迪丽热巴迪力木拉提'
        },
        //内置函数，接受第一个参数：函数
        render(vdom){
            console.log('内置函数render');
            //写模版，返回对模版编译的虚拟DOM
            // return vdom('h1',[]);
            return vdom('div',[
                // vdom('h1','迪丽热巴')
                vdom('h1',`${this.h1data}`),
                vdom('p',`全名：${this.pdata}`)
            ]);
        }
    });
</script>
```
并且我们发现两个问题：
1. 当数据进行改变的时候，会重新触发render函数进行重新渲染；比如在中控台：`vm.h1data = 'DilraBa';` 因此，vue的重新渲染本质其实就是调用的render函数生成虚拟DOM。
2. 我们发现在render函数里面写了模版之后，页面上写的模版就没有了。那么这里就涉及到Vue写模版的问题：
> 其实大家也发现了，我们在render函数里面写模版，非常麻烦，且不利于阅读，Vue既然是给我们提供便利的，那么它是怎么做的呢？<br/>
Vue直接给我们提供了模板，模板的作用只有一个，就是Vue根据提供的模板生成render方法，也就是：你不在render里面写模版，Vue在配置项里面还有一个模板配置：template，它会去看一下template配置里面有没有写模版代码。
```html
<script src="./static/js/vue.2.7.0.min.js"></script>
<!-- 模版 -->
<div id="app">
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data:{
            h1data:'迪丽热巴',
            pdata:'迪丽热巴迪力木拉提'
        },
        //内置函数，接受第一个参数：函数
        // render(vdom){
        //     console.log('内置函数render');
        //     // return vdom('h1',[]);
        //     return vdom('div',[
        //         // vdom('h1','迪丽热巴')
        //         vdom('h1',`${this.h1data}`),
        //         vdom('p',`全名：${this.pdata}`)
        //     ]);
        // },
        //template配置，字符串，虚拟节点
        template:`
            <div>
                <h1>{{h1data}}</h1>
                <p>全名1：{{pdata}}</p>
            </div>
        `,
    });
</script>
```
将template配置，字符串，虚拟节点Dom转成render函数里面的代码形式，就是帮你写了一个render方法。<br/>当然大家发现了，在template里面写的字符串和我们在页面上写的模版代码是一样的，因此，当配置项里面既没有写render函数，也没有写template配置，那么vue就会通过el属性找一下你是否在页面上指定了模版区域，然后将这个元素区域（包括元素本身）直接作为模版进行编译成render函数。<br/>
也就是Vue把模版编译成render函数的顺序是：
1. 先看render函数里面有没有写模版（优先级最高），没有则；
2. 看配置项有没有template配置（优先级其次），没有则；
3. 看配置项里面的el属性指定的模版区域（级别最低，但最实用）<br/>
通过把模版编译成虚拟DOM，最终在渲染成真实DOM这么一个过程。<br/>

说明：Vue2中的虚拟DOM树，要求是单个根节点，因此不管在哪里写模版，都是单个根节点，多个根节点则识别一个。

## 四、案例：node.js + vue.js 渲染企业网站
具体查看：<a href="/secondless/w-b/node.js+vue.js 渲染企业网站" target="_blank">案例：node.js+vue.js 渲染企业网站</a>




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
### [章节7.Node.js基础](/secondless/w-b/Node.js '章节7.Node.js基础')
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
####  <a href="/secondless/w-b/正则表达式.html#一、创建正则表达式" style="margin-left:40px;">一、创建正则表达式</a>
####  <a href="/secondless/w-b/正则表达式.html#_1-new运算符创建正则表达式" style="margin-left:70px;">① new运算符创建正则表达式</a>
####  <a href="/secondless/w-b/正则表达式.html#_2-字面量方式创建正则表达式" style="margin-left:70px;">② 字面量方式创建正则表达式</a>
####  <a href="/secondless/w-b/正则表达式.html#二、测试正则表达式" style="margin-left:40px;">二、测试正则表达式</a>
####  <a href="/secondless/w-b/正则表达式.html#_1-test方法-在字符串中测试模式匹配-返回-true-或-false" style="margin-left:70px;">① test方法：在字符串中测试模式匹配，返回 true 或 false</a>
####  <a href="/secondless/w-b/正则表达式.html#_2-exec方法-在字符串中执行匹配搜索-返回结果数组-执行失败-则返回-null" style="margin-left:70px;">② exec方法：在字符串中执行匹配搜索，返回结果数组，执行失败，则返回 null</a>
####  <a href="/secondless/w-b/正则表达式.html#三、字符串的正则表达式方法" style="margin-left:40px;">三、字符串的正则表达式方法</a>
####  <a href="/secondless/w-b/正则表达式.html#_1-match方法-就是一个查找的功能-获取匹配的字符串-返回数组或-null" style="margin-left:70px;">① match方法：就是一个查找的功能，获取匹配的字符串，返回数组或 null</a>
####  <a href="/secondless/w-b/正则表达式.html#_2-search方法-根据匹配的字符串-返回位置索引-从0开始" style="margin-left:70px;">② search方法：根据匹配的字符串，返回位置索引（从0开始）</a>
####  <a href="/secondless/w-b/正则表达式.html#_3-split方法-按照匹配模式-拆分成字符串数组" style="margin-left:70px;">③ split方法：按照匹配模式，拆分成字符串数组</a>
####  <a href="/secondless/w-b/正则表达式.html#_4-replace方法-替换匹配到的数据" style="margin-left:70px;">④ replace方法： 替换匹配到的数据</a>
####  <a href="/secondless/w-b/正则表达式.html#小案例-模拟百度搜索-搜索的关键字设置成红色" style="margin-left:70px;">小案例：模拟百度搜索，搜索的关键字设置成红色</a>
####  <a href="/secondless/w-b/正则表达式.html#四、正则表达式regexp对象的静态属性、实例属性-了解" style="margin-left:40px;">四、正则表达式RegExp对象的静态属性、实例属性（了解）</a>
####  <a href="/secondless/w-b/正则表达式.html#_1、-静态属性" style="margin-left:70px;">1、 静态属性</a>
#####  <a href="/secondless/w-b/正则表达式.html#_1-属性-input-短名-当前被匹配的字符串" style="margin-left:100px;">① 属性：input，短名：$_ ， 当前被匹配的字符串</a>
#####  <a href="/secondless/w-b/正则表达式.html#_2-属性-leftcontext-短名-最后一次匹配前的子串" style="margin-left:100px;">② 属性：leftContext，短名：$` ， 最后一次匹配前的子串</a>
#####  <a href="/secondless/w-b/正则表达式.html#_3-属性-rightcontext-短名-在上次匹配之后的子串" style="margin-left:100px;">③ 属性：rightContext，短名：$' ， 在上次匹配之后的子串</a>
#####  <a href="/secondless/w-b/正则表达式.html#_4-属性-lastmatch-短名-最后一个匹配字符串" style="margin-left:100px;">④ 属性：lastMatch，短名：$& ， 最后一个匹配字符串</a>
#####  <a href="/secondless/w-b/正则表达式.html#_5-属性-lastparen-短名-最后一对圆括号内的匹配子串" style="margin-left:100px;">⑤ 属性：lastParen，短名：$+ ， 最后一对圆括号内的匹配子串</a>
####  <a href="/secondless/w-b/正则表达式.html#_2、-实例属性" style="margin-left:70px;">2、 实例属性</a>
####  <a href="/secondless/w-b/正则表达式.html#五、正则表达式元字符-包含特殊含义的字符" style="margin-left:40px;">五、正则表达式元字符（包含特殊含义的字符）</a>
####  <a href="/secondless/w-b/正则表达式.html#一、-单个字符和数字、重复字符" style="margin-left:70px;">一、 单个字符和数字、重复字符</a>
####  <a href="/secondless/w-b/正则表达式.html#_1、-点符号匹配除了换行符-n-外的任意字符" style="margin-left:100px;">1、 点符号匹配除了换行符（\n）外的任意字符</a>
####  <a href="/secondless/w-b/正则表达式.html#_2、-点符号和重复字符配合使用" style="margin-left:100px;">2、 点符号和重复字符配合使用</a>
#####  <a href="/secondless/w-b/正则表达式.html#_1-重复字符-x-表示-匹配-0-个或-1-个-x-x可以换成任意字符" style="margin-left:120px;">① 重复字符：x?，表示：匹配 0 个或 1 个 x （x可以换成任意字符）</a>
#####  <a href="/secondless/w-b/正则表达式.html#_2-重复字符-x-表示-匹配-0-个或-1-个-或者任意多个-x-x可以换成任意字符" style="margin-left:120px;">② 重复字符：x*，表示：匹配 0 个或 1 个 或者任意多个 x （x可以换成任意字符）</a>
#####  <a href="/secondless/w-b/正则表达式.html#_3-重复字符-x-表示-匹配-至少1个-或者任意多个-x-x可以换成任意字符" style="margin-left:120px;">③ 重复字符：x+，表示：匹配 至少1个 或者任意多个 x （x可以换成任意字符）</a>
#####  <a href="/secondless/w-b/正则表达式.html#_4-重复字符-x-m-n-表示-匹配最少-m-个、最多-n-个-x-x-m-表示-只能有m个x-x-m-表示-有m个x或者以上个x-x可以换成任意字符" style="margin-left:120px;">④ 重复字符：x{m,n}，表示：匹配最少 m 个、最多 n 个 x， x{m}表示：只能有m个x， x{m,}表示：有m个x或者以上个x （x可以换成任意字符）</a>
#####  <a href="/secondless/w-b/正则表达式.html#_5-重复字符-xyz-表示-匹配至少一个-xyz-括号可以看成分组-分组里面的元素可以是任意多个字符" style="margin-left:120px;">⑤ 重复字符：(xyz)+，表示：匹配至少一个(xyz)，括号可以看成分组，分组里面的元素可以是任意多个字符</a>
#####  <a href="/secondless/w-b/正则表达式.html#_6-任意一个匹配-a-z-匹配26个小写字母任意一个-a-z-匹配26个大写字母任意一个-0-9-匹配0到9的数字任意一个-a-za-z0-9-匹配混合字母和数字中的任意一个" style="margin-left:120px;">⑥ 任意一个匹配：[a-z]匹配26个小写字母任意一个，[A-Z]匹配26个大写字母任意一个，[0-9]匹配0到9的数字任意一个，[a-zA-Z0-9]匹配混合字母和数字中的任意一个</a>
#####  <a href="/secondless/w-b/正则表达式.html#_7-任意一个不匹配-a-z-不匹配26个小写字母-a-z-不匹配26个大写字母-0-9-不匹配0到9的数字-a-za-z0-9-不匹配混合字母和数字" style="margin-left:120px;">⑦ 任意一个不匹配：[^a-z]不匹配26个小写字母，[^A-Z]不匹配26个大写字母，[^0-9]不匹配0到9的数字，[^a-zA-Z0-9]不匹配混合字母和数字</a>
####  <a href="/secondless/w-b/正则表达式.html#_3、字符类-锚字符" style="margin-left:100px;">3、字符类：锚字符</a>
#####  <a href="/secondless/w-b/正则表达式.html#_1-锚字符-表示-从行首开始匹配" style="margin-left:120px;">① 锚字符：^ ， 表示：从行首开始匹配</a>
#####  <a href="/secondless/w-b/正则表达式.html#_2-锚字符-表示-从行尾开始匹配" style="margin-left:120px;">② 锚字符：$ ， 表示：从行尾开始匹配</a>
####  <a href="/secondless/w-b/正则表达式.html#_4、字符-d-匹配数字-和字符集合-0-9-相同-字符-d-匹配非数字-同-0-9-相同" style="margin-left:100px;">4、字符：\d ， 匹配数字，和字符集合 [0-9]相同，字符：\D ， 匹配非数字，同[^0-9]相同</a>
####  <a href="/secondless/w-b/正则表达式.html#_5、字符-w-匹配字母和数字及-和字符集合-a-za-z0-9-相同-字符-w-匹配非字母和数字及-同-a-za-z0-9-相同" style="margin-left:100px;">5、字符：\w ， 匹配字母和数字及_，和字符集合 [a-zA-Z0-9_]相同，字符：\W ， 匹配非字母和数字及_，同[^a-zA-Z0-9_]相同</a>
####  <a href="/secondless/w-b/正则表达式.html#二、空白字符" style="margin-left:70px;">二、空白字符</a>
####  <a href="/secondless/w-b/正则表达式.html#_1-字符-s-表示-匹配空白字符、空格、制表符和换行符" style="margin-left:100px;">① 字符：\s，表示：匹配空白字符、空格、制表符和换行符</a>
####  <a href="/secondless/w-b/正则表达式.html#_2-字符-b-表示-到达边界" style="margin-left:100px;">② 字符：\b，表示：到达边界</a>
####  <a href="/secondless/w-b/正则表达式.html#三、选择字符-选择模式-匹配如-jpg-png-gif-非相等包含的意思" style="margin-left:70px;">三、选择字符（|）选择模式，匹配如：jpg|png|gif，非相等包含的意思</a>
####  <a href="/secondless/w-b/正则表达式.html#四、分组模式-做分组-1或-1匹配第一个分组中的内容-2或-2匹配第二个分组中的内容-依次类推" style="margin-left:70px;">四、分组模式：()做分组，\1或$1匹配第一个分组中的内容，\2或$2匹配第二个分组中的内容，依次类推</a>
####  <a href="/secondless/w-b/正则表达式.html#_1-分组模式-做分组" style="margin-left:100px;">① 分组模式：()做分组</a>
####  <a href="/secondless/w-b/正则表达式.html#_2-1可以获取到第一个分组内容" style="margin-left:100px;">② $1可以获取到第一个分组内容</a>
####  <a href="/secondless/w-b/正则表达式.html#_3-小案例-1获取到第一个分组内容-并做替换" style="margin-left:100px;">③ 小案例：$1获取到第一个分组内容，并做替换</a>
####  <a href="/secondless/w-b/正则表达式.html#_4-小案例-获取多个分组内容-进行替换" style="margin-left:100px;">④ 小案例：获取多个分组内容，进行替换</a>
####  <a href="/secondless/w-b/正则表达式.html#六、正则表达式-贪婪和惰性" style="margin-left:40px;">六、正则表达式：贪婪和惰性</a>
####  <a href="/secondless/w-b/正则表达式.html#七、正则表达式使用-exec-返回数组" style="margin-left:40px;">七、正则表达式使用 exec 返回数组</a>
####  <a href="/secondless/w-b/正则表达式.html#八、捕获性分组和非捕获性分组" style="margin-left:40px;">八、捕获性分组和非捕获性分组</a>
####  <a href="/secondless/w-b/正则表达式.html#九、分组嵌套、前瞻捕获、特殊字符匹配、换行模式" style="margin-left:40px;">九、分组嵌套、前瞻捕获、特殊字符匹配、换行模式</a>
####  <a href="/secondless/w-b/正则表达式.html#十、书写常用正则表达式" style="margin-left:40px;">十、书写常用正则表达式</a>
####  <a href="/secondless/w-b/正则表达式.html#_1-手机号正则" style="margin-left:70px;">① 手机号正则</a>
####  <a href="/secondless/w-b/正则表达式.html#_2-邮政编码正则" style="margin-left:70px;">② 邮政编码正则</a>
####  <a href="/secondless/w-b/正则表达式.html#_3-简单的电子邮件正则" style="margin-left:70px;">③ 简单的电子邮件正则</a>
####  <a href="/secondless/w-b/正则表达式.html#_4-匹配图片格式" style="margin-left:70px;">④ 匹配图片格式</a>
####  <a href="/secondless/w-b/正则表达式.html#_5-删除多余空格" style="margin-left:70px;">⑤ 删除多余空格</a>
####  <a href="/secondless/w-b/正则表达式.html#_6-删除首尾的空格-中间的空格不删除" style="margin-left:70px;">⑥ 删除首尾的空格，中间的空格不删除</a>
####  <a href="/secondless/w-b/正则表达式.html#_7-延伸-将11位手机号中的4-7位号码换成" style="margin-left:70px;">⑦ 延伸：将11位手机号中的4-7位号码换成 *</a>
### [章节9.Vue.js基础](/secondless/w-b/Vue.js '章节9.Vue.js基础')
####  <a href="/secondless/w-b/Vue.js.html#一、课前准备" style="margin-left:40px;">一、课前准备：启动node服务器，引入vue.js</a>
####  <a href="/secondless/w-b/Vue.js.html#二、体验vue的数据响应式" style="margin-left:40px;">二、体验vue的数据响应式：① 配置项data中的数据响应式，及渲染到页面上的真实DOM效果、② 循环语句，事件处理体验、③ vuejs计算属性体验</a>
####  <a href="/secondless/w-b/Vue.js.html#三、理解vue的注入、虚拟dom及底层原理" style="margin-left:40px;">三、理解vue的注入、虚拟DOM及底层原理：vue实例成员的注入、虚拟DOM、虚拟DOM的底层原理</a>
####  <a href="/secondless/w-b/node.js+vue.js%20渲染企业网站.html" style="margin-left:40px;" target="_blank" title="四、案例：node.js + vue.js 渲染企业网站">四、案例：node.js + vue.js 渲染企业网站</a>
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
   <a style="margin-left:20px;" href="https://study.163.com/course/courseMain.htm?share=2&shareId=480000002289674&courseId=1213550818" target="_blank">[第1季学习视频]</a>
</b>

### [第二学期【第2季】（学习顺序：03）](/secondless/w-b '第二学期第2季课程')
> JavaScript中的面向对象，类，ajax，封装js库过渡到jQuery， vue.js基础配置网站页面，建议所有学员观看。<br/>
<b>
   <a href="/secondless/w-b.html" target="_blank">[第2季学习文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a style="margin-left:20px;" href="https://study.163.com/course/courseMain.htm?share=2&shareId=480000002289674&courseId=1213781850" target="_blank">[第2季学习视频]</a>
</b>

### [第二学期【第3季】（学习顺序：04）](/secondless/w-c '第二学期第3季课程')
> egg.js基础，响应式网页布局，Bootstrap框架，响应式后台系统管理，完整企业网站前后台开发，建议所有学员观看。<br/>
<b>
   <a href="/secondless/w-c.html" target="_blank">[第3季学习文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a style="margin-left:20px;" href="https://study.163.com/course/courseMain.htm?share=2&shareId=480000002289674&courseId=1213780858" target="_blank">[第3季学习视频]</a>
</b>

### [第二学期【第4季】（学习顺序：05）](/secondless/w-d '第二学期第4季课程')
> 主要对第三季，同学们开发的企业网站，进行一个完整的上线运维流程的一个讲解，同学们将网站开发完成之后，如何进行上线运维，将项目交付给客户。<br/>
<b>
   <a href="/secondless/w-d.html" target="_blank">[第4季学习文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a href="https://study.163.com/course/courseMain.htm?courseId=1213794887&share=2&shareId=480000002289674" target="_blank" style="margin-left:20px;">[第4季学习视频]</a>
</b>