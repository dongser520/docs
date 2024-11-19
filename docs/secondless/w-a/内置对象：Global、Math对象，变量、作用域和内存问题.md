---
navbar: true
sidebar: auto
title: 章节10.内置对象：Global、Math对象，变量、作用域和内存问题
---

## 1、内置对象： Global对象
> <b>前言</b> <br/>
> 对内置对象的定义是：“由js提供的、不依赖宿主环境的对象，这些对象在js程序执行之前就已经存在了。”意思就是说，开发人员不必显示地实例化内置对象(不用new操作符)；因为它们已经实例化了。js只定义了两个内置对象：Global和 Math。
### ① Global对象
> Global(全局)对象是js中一个特别的对象，因为这个对象是不存在的。在js中不属于任何其他对象的属性和方法，都属于Global对象的属性和方法。所以，事实上，并不存在全局变量和全局函数；所有在全局作用域定义的变量和函数，都是 Global 对象的属性和方法。（这句话，在大家学习完面向对象后，才会自我理解，但是在学习面向对象前，我们需要先学习一些基础）<br/>
> 因为js没有定义怎么调用 Global 对象，所以，Global.属性或者 Global.方法()都是无效的。【Web 浏览器将 Global 作为 window 对象的一部分加以实现，即web浏览器用window对象代替Global】
>  ``` javascript 
>  var text = '迪丽热巴';  
>  console.log(window.text); // '迪丽热巴'
>  console.log(Global.text); //报错 Global is not defined
>  ```
### ② Global对象内置的属性和方法：URI 编码方法
> 我们向浏览器提交数据，比如：网站上面的留言板，你提交你的姓名、电话等等信息，有些信息的字符服务器无法识别，导致一些问题和错误。有些浏览器会自动编码，但有些老版本的浏览器没有自动编码产生错误，这个时候，URI 编码可以对链接、提交的信息进行编码，以便发送给服务器。它们采用特殊的 UTF-8 编码替换所有无效字符，从而让浏览器或者我们的服务器能够接受和理解。<br/>
> 例如：我们将学习文档网址复制粘贴到我们的记事本上，看网址的变化
### ③ URI 编码方法：encodeURI()、encodeURIComponent()
> <b>encodeURI(): </b><br/>
> encodeURI()不会对本身属于 URI 的特殊字符进行编码，例如冒号、正斜杠、问号和#号 <br/>
> <b>encodeURIComponent(): </b><br/>
> encodeURIComponent()则会对它发现的任何非标准字符进行编码,比 encodeURI()编码来的更加彻底，<span style="color:#23AAF2">一般来说encodeURIComponent()使用频率要高一些。</span>
>  ``` javascript 
>  let text = '空姐 //wang';
>  //encodeURI()编码
>  let t1 = encodeURI(text);        //只编码了中文
>  console.log(t1);                 //%E7%A9%BA%E5%A7%90%20//wang
>  //encodeURIComponent()编码
>  let t2 = encodeURIComponent(text);//特殊字符和中文编码了
>  console.log(t2);                 //%E7%A9%BA%E5%A7%90%20%2F%2Fwang
>  ```
### ④ URI 解码方法：decodeURI()、decodeURIComponent()
>  ``` javascript 
>  console.log(decodeURI('%E7%A9%BA%E5%A7%90%20//wang'));//返回： '空姐 //wang'
>  console.log(decodeURIComponent('%E7%A9%BA%E5%A7%90%20%2F%2Fwang'));//返回： '空姐 //wang'
>  ```
### ⑤ eval()方法
> eval()方法主要担当一个字符串解析器的作用，他只接受一个参数，而这个参数就是要执行的 JavaScript 代码的字符串。
>  ``` javascript 
>  'var text = 100';
>  alert(text);//报错，text is not defined
>  
>  eval('var text = 100');
>  alert(text);
> 
> eval('alert(100)');//弹出 100
> //由内向外执行，先弹窗100，然后打印 eval('alert(100)')是 undefined,说明eval()没有返回值
> alert(eval('alert(100)'));
> 
> //函数也可以
> eval('function text() {return 100}'); 
> alert(text());
>  ```
> 注意：eval()方法的功能非常强大，但也非常危险。因此使用的时候必须极为谨慎。特别是在
用户输入数据的情况下，非常有可能导致程序的安全性，比如代码注入等等。场景：比如说，你做了一个留言板的接口表单给用户使用，你用了eval()方法，对填写的表单数据进行包装整合，但是，如果同行写了一个非常危险的js代码，你在运行提交的时候，这段危险的代码就会执行，就会去攻击你的服务器，所以eval()方法要慎用。

### ⑥ Global对象的属性
> Global 对象包含了一些属性：undefined、NaN、Object、Array、Function、Date 等等，可直接调用打印。
>  ``` javascript 
>  console.log(Array);//返回构造函数
>  console.log(Object);//返回构造函数 
>  ```

### ⑦ window 对象
> 前面已经说了，Global 没有办法直接访问，而 Web 浏览器可以使用 window 对象来实现一全局访问。
>  ``` javascript 
>  console.log(window.Array);//返回构造函数
>  console.log(window.Object);//返回构造函数 
>  ```


## 2、内置对象： Math 对象
> js为保存数学公式和信息提供了一个对象，即 Math 对象，方便我们快速计算。
>  ### ① Math 对象的属性
> Math 对象包含的属性大都是数学计算中可能会用到的一些特殊值。
> |  属 性                |  说 明                                  |   
> |   :--:                |   :--:                                 |    
> |  Math.E               |  自然对数的底数，即常量 e 的值            | 
> |  Math.LN10            |  10 的自然对数                          |   
> |  Math.LN2             |  2 的自然对数                           |   
> |  Math.LOG2E           |  以 2 为底 e 的对数                     |   
> |  Math.LOG10E           |  以 10 为底 e 的对数                     |  
> |  Math.PI              |  ∏的值 (圆周率)                         |
> |  Math.SQRT1_2         |  1/2 的平方根                           |
> |  Math.SQRT2           |  2 的平方根                             |
>  ``` javascript
>  console.log(Math.E); //2.718281828459045
>  console.log(Math.LN10);//2.302585092994046
>  console.log(Math.LN2);//0.6931471805599453
>  console.log(Math.LOG2E);//1.4426950408889634
>  console.log(Math.LOG10E);//0.4342944819032518
>  console.log(Math.PI);//3.141592653589793
>  console.log(Math.SQRT1_2);//0.7071067811865476
>  console.log(Math.SQRT2);//1.4142135623730951
>  ```
> ### ② Math.min()和 Math.max()方法分别求一组数值中的最小值、最大值
> Math.min()用于确定一组数值中的最小值。Math.max()用于确定一组数值中的最大值。
>  ``` javascript
>  console.log(Math.min(4,7,45,842,478,115,14,15)); //返回： 4
>  console.log(Math.max(4,7,45,842,478,115,14,15)); //返回：842
>  ```
> ### ③ Math.ceil()向上舍入、Math.floor()向下舍入、Math.round()四舍五入
> 比如：我们给好评或者给几颗星，就用到这些方法。
>  ``` javascript
>  //向上舍入
>  console.log(Math.ceil(10.9)); //11
>  console.log(Math.ceil(10.5)); //11
>  console.log(Math.ceil(10.1)); //11
>  //向下舍入
>  console.log(Math.floor(10.9)); //10
>  console.log(Math.floor(10.5)); //10
>  console.log(Math.floor(10.1)); //10
>  //四舍五入
>  console.log(Math.round(10.9)); //11
>  console.log(Math.round(10.5)); //11
>  console.log(Math.round(10.1)); //10
>  ```
> ### ④ Math.random() 产生一个0 到 1 之间随机数，不包括 0 和 1
> Math.random()方法返回介于 0 到 1 之间一个随机数，不包括 0 和 1。
>  ``` javascript
> for(let i=0;i<50;i++){
>     console.log(Math.random());//随机数，0-1之间，不包含0和1
> } 
>  ```
> 如果想大于这个范围的话，可以套用一下公式：<br/>
> <strong style="color:#23AAF2">值 = Math.floor(Math.random() * 总数 + 第一个值)</strong>
>> #### 1. 随机产生 1-10 之间的任意数
>> 比如说，网站首页有10张图片，图片名称从1.jpg一直到10.jpg共10张，我希望每个用户打开网站的时候，随机显示一张图片，而不是固定的，这个时候就需要产生一个1-10直接的随机整数，怎么做呢？
>>  ``` javascript
>> let t1 = Math.random() * 10;
>> //Math.random()* 10，由于随机数是大于0小于1，所以范围是：大于0，小于10之间的任意数
>> console.log(t1); 
>>
>> let t2 = Math.random() * 10 + 1;//此时范围就是：大于1，小于11之间的任意数
>> //此时，如果希望取到1-10之间的随机整数，可配合Math.floor使用
>> //此时向下舍入，由于最小的随机数是大于1，向下舍入就是1，最大的随机数小于11，向下舍入就是10
>> console.log(Math.floor(t2));
>> console.log(Math.floor(Math.random() * 10 + 1));
>>  ```
> #### 思考：如果取2-13之间的随机数呢 (包括2和13) ？
> 主要要思考，随机数乘以几？<strong style="color:#23AAF2"> 乘以几 = 最大数 - 最小数 + 1 </strong> <br/>
> 公式：<strong style="color:#23AAF2"> 取a-b之间的随机整数 = Math.floor(Math.random() * (b-a+1) + a); </strong>
>>  ``` javascript
>>  // Math.floor(Math.random() * (13-2+1) + 2);
>> let t = Math.floor(Math.random() * 12 + 2);
>> console.log(Math.floor(t));
>>  ```
> ### ⑤ 取任意两个数之间的随机整数通用函数（方法）
>>  ``` javascript
>>  function randomBetween(min, max) {
>>      let sum = max - min + 1; 
>>      return Math.floor(Math.random() * sum + min);
>>  }
>>  console.log(randomBetween(5,20));
>>  
>>  //随机取30个数字，范围在5-20之间
>>  for(let i=0;i<30;i++){
>>      console.log(randomBetween(5,20));
>>  }
>>  ```
> 随机数的用法非常广泛，广泛用在抽奖、生成登录验证码等等很多场景上。
> ### ⑥ 其他方法
> |  方 法                          |  说 明                                  |   
> |   :--:                         |   :--:                                 |    
> |  Math.abs(num)                 |  返回 num 的绝对值          | 
> |  Math.exp(num)                 |  返回 Math.E 的 num 次幂                         |   
> |  Math.log(num)                 |  返回 num 的自然对数                         |   
> |  Math.pow(num,power)           |  返回 num 的 power 次幂                     |   
> |  Math.sqrt(num)                |  返回 num 的平方根                   |  
> |  Math.acos(x)                  |  返回 x 的反余弦值                       |
> |  Math.asin(x)                  |  返回 x 的反正弦值                           |
> |  Math.atan(x)                  |  返回 x 的反正切值                             |
> |  Math.atan2(y,x)               |  返回 y/x 的反正切值                             |
> |  Math.cos(x)                   |  返回 x 的余弦值                            |
> |  Math.sin(x)                   |  返回 x 的正弦值                             |
> |  Math.tan(x)                   |  返回 x 的正切值                      |
>
>>  ``` javascript
>> console.log(Math.abs(-10));//返回 10
>> console.log(Math.pow(2,3));//返回 8   2的3次幂 2*2*2 = 8
>>  ```
> 以上方法用得不多，用的时候回来查看

## 3、变量
> js的变量与其他语言的变量有很大区别，是松散型的(不强制类型)本质，决定了它只是在特定时间用于保存特定值的一个名字而已。比如说，一开始我声明的变量是整型，然后过一会我又把这个变量设置成字符串型，在过一会我又把变量设置成引用类型，比如对象，这在其他语言如java、C#等等是不行的，但是js是可以这么做的。
> ### ① 基本类型和引用类型的值
> 基本类型值指的是那些保存在栈内存中的简单数据段，即这种值完全保存在内存中的一个位置。而引用类型值则是指那些保存在堆内存中的对象，意思是变量中保存的实际上只是一个指针，这个指针指向内存中的另一个位置，该位置保存对象。<br/><br/>
> 基本类型值有以下几种：Undefined、Null、Boolean、Number 和 String。这些类型在内存中分别占有固定大小的空间，他们的值保存在栈空间，<b>我们通过按值来访问的</b>。<br/><br/>
> 如果赋值的是引用类型的值，则必须在堆内存中为这个值分配空间。<b>由于这种值的大小不固定，因此不能把它们保存到栈内存中。但内存地址大小是固定的，因此可以将内存地址保存在栈内存中。</b>这样，当查询引用类型的变量时，先从栈中读取内存地址，然后再通过地址找到堆中的值。对于这种，<b>我们把它叫做按引用访问</b>。<br/><br/>
> <img src="/2-1-10-01.jpg" alt="变量及作用域" class="zoom-custom-imgs" style="display:inline-block;height:470px;"> <br/>
> ### ② 动态属性
> 基本类型值和引用类型值可以执行的操作不一样
>  ``` javascript
>  // 创建引用类型
>  let text = new Object();// 或者 let text = {};
>  text.name = '迪丽热巴'; //新增一个属性
>  console.log(text.name); //正常输出 '迪丽热巴'
>  
>  //如果是基本类型的值添加属性的话，就会出现问题
>  let love = '迪丽热巴'; //创建一个基本类型，是个字符串
>  love.age = 31; //给基本类型添加属性
>  console.log(love.age); //返回：undefined  不是引用类型，无法输出
>  ```
> ### ③ 复制变量值
> 在变量复制方面，基本类型和引用类型也有所不同。基本类型复制的是值本身，而引用类型复制的是引用地址。也就是说，不管是基本类型还是引用类型，它们复制的都是栈内存的数据，堆内存的数据是没有办法复制的。
>>  先看基本类型
>>  ``` javascript
>>  let text = '迪丽热巴'; //在栈内存生成一个变量text 值为 '迪丽热巴'
>>  // 在声明一个变量love, 将变量text的值复制给love
>>  let love = text; //实际情况是：在栈内存再生成一个变量love  值为'迪丽热巴'
>>  console.log(text);// '迪丽热巴'
>>  console.log(love);// '迪丽热巴'
>>  
>>  // 表面上看两个一样，实际上它们两个是独立的，也就是说，两个变量分别操作时互不影响
>>  love = '古力娜扎';// 基本类型保持独立，love的修改不会影响到text
>>  console.log(love);// '古力娜扎'
>>  console.log(text);// '迪丽热巴'
>>  ```
>> 但如果是引用类型的对象，就不一样了
>>  ``` javascript
>> let text = new Object(); //创建一个引用类型
>> text.name = '迪丽热巴'; //新增一个属性
>> let love = text; //实际情况：把引用地址赋值给 love，对象数据是在堆内存中
>>  ```
> <img src="/2-1-10-02.jpg" alt="变量及作用域" class="zoom-custom-imgs" style="display:inline-block;height:400px;"> <br/>
>>  ``` javascript
>> console.log(love.name);//love.name就是text.name，返回：'迪丽热巴'
>> console.log(text.name);//返回：'迪丽热巴'
>> 
>> // 如果此时love.name改一下
>> love.name = '古力娜扎';
>> console.log(love.name);// 返回：'古力娜扎'
>> // 由于它们指向的是同一个object，同一个name, 不管修改谁，大家都修改了
>> console.log(text.name);// 返回：'古力娜扎' 
>>  ```
>> 总结：在引用类型中，love 其实就是 text，因为它们指向的是同一个对象。如果这个对象中的
name 属性被修改了，love.name 和 text.name 输出的值都会被相应修改掉了。
> ### ④ 传递参数： 按值传参
> <b>js中所有函数的参数都是按值传递的</b>，言下之意就是说，参数不会按引用传递，虽然变量有基本类型和引用类型之分。注意和上面的我们访问要区别，基本类型我们通过按值来访问的，引用类型我们按引用访问。
>>  ``` javascript
>>  function text(i){ 
>>      i += 10; // i = i + 10; //这里的 i 是局部变量，全局无效
>>      return i;
>>  }
>>  
>>  var i = 100;
>>  console.log(text(i)); // 110
>>  //在输出i,思考，这个i是函数里面的i,还是外面的i
>>  console.log(i);// 100 打印的是外面的i，就是按值传递
>>  //如果按照引用传递，那么函数里面的i会成为类似全局变量，把外面的i替换掉
>>  //也就是i最后应该输出110，但是输出的100，所以是按值传递的
>>  ```
>>> ### ⑤ 传递参数： 传递一个引用类型的参数（对象），但是它不是按引用传递，它是按值传递的
>>>  ``` javascript
>>>   function text(obj){
>>>      obj.name = '迪丽热巴';
>>>   }
>>>   
>>>   let obj = new Object();
>>>   text(obj);//执行一下函数
>>>   //思考，能输出obj.name吗？我们上面的例子，说的是obj.name是一个局部变量，应该是没有的
>>>   //那么我们这里可以输出吗？
>>>   console.log(obj.name);// '迪丽热巴'
>>>   //可以访问，原因是：我们把外面的obj传递给了函数，而函数里面只是将obj这个引用地址里面新增了一个属性name,赋值叫'迪丽热巴'
>>>   //我外面访问obj,就是访问堆内存里面的数据，是可以访问到的
>>>  
>>>  //延伸一下
>>> function text(obj){
>>>     obj.name = '迪丽热巴';
>>>     var obj = new Object();
>>>     obj.name = '古力娜扎';
>>>     //如果obj是按照引用传递的话，下面应该打印 '古力娜扎'
>>>     //因为下面的obj.name 会替换上面的 obj.name , 通过输出得知 依然是 '迪丽热巴'
>>>    //说明不是按照引用传递的，原因是 函数里面声明的obj，外面看不到
>>>     //如果此时拿到外面来，就能看到
>>>     //所以js没有按引用传参的功能，但是传递参数的时候，可以传递一个对象过去，这在后面我们用得很多
>>>  }
>>>  
>>>  var obj = new Object();
>>>  text(obj);
>>>  console.log(obj.name); // '迪丽热巴'
>>>   ```
>> <b>总结：如果js按引用传递的话，那么函数里的那个变量将会是全局变量，在外部也可以访问。很显然，通过上面的例子，函数里面的变量，外面无法访问，也就是js不是按引用来传递的，是按值来传递的，函数的参数都是局部变量，外面无法访问。</b>
> ### ⑥ 检测变量类型：typeof()、instanceof()
> 要检测一个变量的类型，我们可以通过 typeof 运算符来判别
> ``` javascript
> let text = '迪丽热巴';
> console.log(typeof text); // string
> ```
>虽然 typeof 运算符在检查基本数据类型的时候非常好用，但检测引用类型的时候，它就不是那么好用了。通常，我们并不想知道它是不是对象，而是想知道它到底是什么类型的对象。因为数组也是 object，null 也是 Object 等等。<br/>
> 这时我们应该采用 instanceof 运算符来查看.
> ``` javascript
> //是否是数组
> let text1 = [1,2,3];
> console.log(text1 instanceof Array); //返回： true
> 
> //是否是对象
> let text2 = {};
> console.log(text2 instanceof Object); //返回： true
> 
> //是否是字符串对象
> let text3 = new String('迪丽热巴');
> console.log(text3 instanceof String); //返回： true
>
> //当使用 instanceof 检查基本类型的值时，它会返回 false，所以检查基本类型用typeof
> let text = '迪丽热巴';
> console.log(typeof text);//string
> console.log(text instanceof String);//false
> ```
> 关于new String('迪丽热巴')查看 <a href="/secondless/w-a/javascript基础.html#object-类型" target="_blank">章节2.javascript基础_4、数据类型_Object 类型</a>提到过


## 4、作用域（执行环境）
> 执行环境是 js 中最为重要的一个概念。执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为。全局执行环境是最外围的执行环境。在 Web 浏览器中，全局执行环境被认为是 window
对象。因此所有的全局变量和函数都是作为 window 对象的属性和方法创建的。
> ### ① 全局执行环境
> ``` javascript
> var text = '迪丽热巴'; //声明一个全局变量
> function mygirl() {
>    console.log(text); //全局变量可以在函数里访问
> }
> mygirl(); //执行函数
> ```
> 全局的变量和函数，都是 window 对象的属性和方法。
> ``` javascript
> var text = '迪丽热巴'; // 注意换成let后的变化
> function mygirl() {
>    console.log(window.text); //全局变量，最外围，即 window 的属性
> }
> window.mygirl(); //全局函数，最外围，即 window 的方法
> ```
> 注意：当执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁。如果是全局环境下，需要程序执行完毕，或者网页被关闭才会销毁。<br/>
> ### ② 局部执行环境
> ``` javascript
> var text = '迪丽热巴';
> function mygirl() {
>    var text = '古力娜扎'; //这里是局部变量，它的范围在mygirl函数体内，出来就不认识了
>    console.log(text); // 返回：'古力娜扎'
>    var love = '梁咏琪';
> }
> mygirl();// 或者 window.mygirl();
> console.log(text); // 返回：'迪丽热巴'
> console.log(love); // 报错，函数里面的love外面无法访问
> ```
> #### 1. 那么如何将局部换成全局呢？
> ``` javascript
> var text = '迪丽热巴';
> function mygirl() {
>    text = '古力娜扎'; //去掉var  就变成全局了
>    console.log(text); // 返回：'古力娜扎'
> }
> mygirl();
> console.log(text); // 返回：'古力娜扎'
> ```
> #### 2. 通过传参，可以替换函数体内的局部变量，但作用域仅限在函数体内这个局部环境
> ``` javascript
> var text = '迪丽热巴';
> function mygirl(text) { //通过传参，也是局部变量，作用域在mygirl函数体内
>    console.log(text);//返回：'古力娜扎'
> }
> mygirl('古力娜扎');
> console.log(text);//返回：'迪丽热巴'
> ```
> #### 3. 函数体内的函数
> ``` javascript
> function mygirl() {
>     function mylove(){
>        var baby = '梁咏琪';//baby的作用域在mylove的函数体内
>        console.log('你喜欢的明星是谁');
>        console.log(baby);//可以访问
>     }
>     mylove();//可以执行，mylove()的执行环境在 mygirl()内
>     console.log(baby);//无法访问
> }
> //mylove();//访问不到
> mygirl();
> ```
> 上面的例子形成了作用域链，它的用途是保证对执行环境中有访问权限的变量和函数进行有序访问。
> ### ③ 没有块级作用域（var 操作符声明的变量）
> 块级作用域表示诸如 if 语句等有花括号封闭的代码块，因为js没有块级作用域，所以，支持条件判断来定义变量
> #### 1. if语句里面的变量是全局变量
>> ``` javascript
>> if(true){
>>    var girl = '迪丽热巴';
>> }
>> // 因为if语句{}没有封闭作用域的功能，所以外面可以访问if语句里面的变量
>> console.log(girl);// 返回: '迪丽热巴'
>> console.log(window.girl);// 返回: '迪丽热巴'
>> ```
> #### 2.for循环里面的变量也是全局变量
>> ``` javascript
>> for(var i = 0; i < 10; i++){
>>    var girl = '迪丽热巴';
>> }
>> console.log(i); //返回：10
>> console.log(girl);//返回：迪丽热巴
>> console.log(window.i); //返回：10
>> console.log(window.girl);//返回：迪丽热巴
>> ```
> #### 3.var 关键字在函数里的区别
>> ``` javascript
>> function text(){
>>     //如果有var, 在函数体内声明变量，就是局部的，去掉var就是全局的
>>     var num = 100;
>>     //num = 100;
>> }
>> text();
>> console.log(num);//报错，没有被定义,去掉var就可以访问
>> //去掉var的写法非常不建议，会出现意外问题，推荐这么写
>> var num = 0;//先初始化一下
>> function text(){
>>     num = 100;
>> }
>> text();
>> console.log(num);
>> ```
> #### 4. 变量查询中，访问局部变量要比全局变量更快，因为不需要向上搜索作用域链
>> ``` javascript
>> var girl = '迪丽热巴';
>> function mygirl(){
>>     return girl; // 显然girl就是外面的全局变量girl
>> }
>> console.log(mygirl());//返回: '迪丽热巴'
>> ``` 
>> ``` javascript
>> var girl = '迪丽热巴';
>> function mygirl(){
>>     //若在函数体内定义局部变量，会优先查找同级的局部变量，没有的话，就找上一级
>>     girl = '古力娜扎';
>>     return girl; 
>> }
>> console.log(mygirl());//返回: '古力娜扎'
>> ``` 
## 5、 内存问题
> js 具有自动垃圾收集机制，也就是说，执行环境会负责管理代码执行过程中使用的内存，它会自行管理内存分配及无用内存的回收，所以我们不必关心内存中的过期数据，无用数据的垃圾回收问题，一般来说，确保占用最少的内存可以让页面获得更好的性能。<br/>
> 如果你想让页面更顺畅丝滑，那么优化内存的最佳方案，就是一旦数据不再有用，那么将其设置为 null 来释放引用，这个做法叫做解除引用。这一做法适用于大多数全局变量和全局对象。
> ``` javascript
> // 比如在写程序的时候，定义了一个对象user
> var user = {
>    name:'迪丽热巴',
>    ip:'湖北' 
> }
> // .... 经过了一系列运作，后面在不需要user这个变量对象了
> //就可以将user设置为null, 释放内存
> user = null; // 解除对象引用，等待垃圾收集器回收
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
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_1、理解dom" style="margin-left:40px;">1、理解DOM</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_1、理解dom" style="margin-left:70px;">① DOM节点树，节点种类：元素节点、文本节点、属性节点</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_2、查找节点信息方法" style="margin-left:40px;">2、查找节点信息方法</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#i、-getelement系列" style="margin-left:70px;">① getElement系列: getElementById()方法，getElementById()方法获取的元素节点属性：tagName、innerHTML等， 获取及设置元素html属性：id,title,style,className等，getElementsByTagName()方法，getElementsByName()方法，getElementsByClassName()方法</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#ii、queryselector系列" style="margin-left:70px;">② querySelector系列: querySelector()方法，querySelectorAll()方法</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#iii、属性操作系列" style="margin-left:70px;">③ 属性操作系列: getAttribute()方法，setAttribute()方法，removeAttribute()方法</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#iv、-node节点属性-nodename、nodetype、nodevalue" style="margin-left:70px;">④ node节点属性: nodeName、nodeType、nodeValue</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#v、-层次节点属性" style="margin-left:70px;">⑤ 层次节点属性: childNodes属性，firstChild 和 lastChild 属性，ownerDocument 属性，parentNode 属性，previousSibling 属性，nextSibling 属性，忽略空白文本节点，attributes 属性</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_3、操作节点" style="margin-left:40px;">3、操作节点</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_3、操作节点" style="margin-left:70px;">① document.write()方法，createElement()方法，appendChild()方法，createTextNode()方法， insertBefore()方法，模拟在指定节点的后面添加一个节点，repalceChild()方法，cloneNode()方法，removeChild()方法</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_4、dom-类型、扩展、操作内容" style="margin-left:40px;">4、DOM 类型、扩展、操作内容</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_4、dom-类型、扩展、操作内容" style="margin-left:70px;">① DOM 类型: Document类型补充（获取html节点对象，获取body节点对象，获取文档声明：DOCTYPE对象，document.title，document.images，document.links等），Text类型补充（normalize()方法，splitText(num)方法，deleteData删除字符，insertData插入字符，replaceData替换字符，substringData获取字符）</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#ii、dom-扩展" style="margin-left:70px;">② DOM 扩展: scrollIntoView()， children 属性，contains()方法</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#iii、dom操作网页内容-innertext、innerhtml、outertext、outerhtml" style="margin-left:70px;">③ DOM操作网页内容：innerText、innerHTML、outerText、outerHTML</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_5、dom实战-操作表格" style="margin-left:40px;">5、DOM实战：操作表格</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#i、dom创建表格" style="margin-left:70px;">① DOM创建表格</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#ii、-html-dom-来操作表格" style="margin-left:70px;">② HTML DOM 来操作表格: 获取表格元素对象， 获取表格的标题对象\<caption>，获取表头表尾\<thead>、\<tfoot>、\<tbody>,获取表格的行数，获取表格主体里的行数，获取表格主体内第一行的单元格数量(tr)，获取表格主体内第一行第一个单元格的内容(td)，删除标题、表头、表尾、行、单元格，HTML DOM 创建一个表格</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_6、操作css样式" style="margin-left:40px;">6、操作CSS样式</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_6、操作css样式" style="margin-left:70px;">① 行内样式style的获取、赋值、移除属性removeProperty，计算后的样式获取(行内、内联、外联样式)：window 对象下getComputedStyle()方法</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_7、操作页面样式" style="margin-left:40px;">7、操作页面样式</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_7、操作页面样式" style="margin-left:70px;">① className关键字设置样式，创建函数：hasClass() 判断是否存在某个类名，addClass() 如果不存在的这个类名，添加这个类名，removeClass() 如果存在的这个类名，删除这个类名</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_8、操作css外联样式表-css文件" style="margin-left:40px;">8、操作CSS外联样式表.css文件</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_8、操作css外联样式表-css文件" style="margin-left:70px;">① 获取CSSStyleSheet，外联的css样式表对象</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_9、dom元素尺寸-元素大小-和位置-元素位置" style="margin-left:40px;">9、DOM元素尺寸（元素大小）和位置（元素位置）</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_9、dom元素尺寸-元素大小-和位置-元素位置" style="margin-left:70px;">① 获取元素 CSS 大小回顾：通过 style 内联获取元素大小，通过计算getComputedStyle()方法获取元素大小，通过 CSSStyleSheet 对象中的 cssRules属性获取元素大小（需将网页放到服务器上查看）</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#ii、获取元素实际大小" style="margin-left:70px;">② 获取元素实际大小：clientWidth 和 clientHeight：获取可视区的元素大小，可以得到元素内容及内边距所占据的空间大小，scrollWidth 和 scrollHeight：获取滚动内容的元素大小，offsetWidth 和 offsetHeight：获取元素大小，包含边框、内边距和滚动条</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#iii、获取元素周边大小" style="margin-left:70px;">③ 获取元素周边大小位置：clientLeft 和 clientTop:获取元素设置了左边框和上边框的大小；offsetLeft 和 offsetTop：获取当前元素相对于父元素的位置；scrollTop 和 scrollLeft：这组属性可以获取滚动条被隐藏的区域大小（滚动条滚动高度宽度），也可设置定位到该区域（定位滚动条）； getBoundingClientRect()方法：返回一个矩形对象，包含四个属性：left、top、right和 bottom，分别表示元素各边与页面上边和左边的距离</a>
####  <a href="/secondless/w-a/网页文档对象模型DOM.html#_10、动态加载脚本" style="margin-left:40px;">10、动态加载脚本</a>
##### <a href="/secondless/w-a/网页文档对象模型DOM.html#_10、动态加载脚本" style="margin-left:70px;">① 动态加载js文件，动态加载样式表</a>
### [章节16.事件](/secondless/w-a/事件 '章节16.事件')
####  <a href="/secondless/w-a/事件.html" style="margin-left:40px;">1、事件基础知识</a>
##### <a href="/secondless/w-a/事件.html#_1、事件处理函数列表" style="margin-left:70px;">① 事件处理函数列表</a>
##### <a href="/secondless/w-a/事件.html#_2、内联模型" style="margin-left:70px;">② 内联模型</a>
##### <a href="/secondless/w-a/事件.html#_3、脚本模型" style="margin-left:70px;">③ 脚本模型</a>
####  <a href="/secondless/w-a/事件.html#ii、事件处理函数分类" style="margin-left:40px;">2、事件处理函数分类</a>
##### <a href="/secondless/w-a/事件.html#_1、-鼠标事件" style="margin-left:70px;">① 鼠标事件：click，dblclick，mousedown，mouseup，mouseover，mouseout，mousemove</a>
##### <a href="/secondless/w-a/事件.html#_2、-键盘事件" style="margin-left:70px;">② 键盘事件：keydown，keypress，keyup</a>
##### <a href="/secondless/w-a/事件.html#_3、html事件-包括表单事件" style="margin-left:70px;">③ HTML事件（包括表单事件）：load，unload，resize，scroll，select，change，input，submit，reset，focus，blur</a>
####  <a href="/secondless/w-a/事件.html#iii、事件对象" style="margin-left:40px;">3、事件对象</a>
##### <a href="/secondless/w-a/事件.html#_1、-this-关键字和上下文" style="margin-left:70px;">① this 关键字和上下文</a>
##### <a href="/secondless/w-a/事件.html#_2、-获取事件对象" style="margin-left:70px;">② 获取事件对象</a>
##### <a href="/secondless/w-a/事件.html#_3、鼠标事件" style="margin-left:70px;">③ 获取鼠标按钮（左键、右键、中间滚轮）</a>
##### <a href="/secondless/w-a/事件.html#_4、可视区及屏幕坐标" style="margin-left:70px;">④ 可视区及屏幕坐标：clientX，clientY，screenX，screenY，鼠标点击位置距离页面顶部距离（带滚动条）</a>
##### <a href="/secondless/w-a/事件.html#_5、修改键" style="margin-left:70px;">⑤ 修改键：shiftKey对应Shfit 键，ctrlKey对应 Ctrl 键，altKey 对应 Alt 键，metaKey 对应 windows 键，判断是否按下了它们</a>
##### <a href="/secondless/w-a/事件.html#_6、键盘事件" style="margin-left:70px;">⑥ 键盘事件：键码（键盘上的任意键）keyCode，字符编码（键盘上可以输出字符的键）charCode</a>
##### <a href="/secondless/w-a/事件.html#_7、event-事件对象的常用属性和方法" style="margin-left:70px;">⑦ 事件对象的常用属性和方法：target，事件冒泡，取消：e.stopPropagation()</a>
##### <a href="/secondless/w-a/事件.html#v、事件对象其他属性方法" style="margin-left:70px;">⑧ 事件对象其他属性方法：relatedTarget（在 mouseover 和 mouseout 事件中获取），e.preventDefault()，contextmenu取消鼠标右击弹出的菜单，鼠标滚轮：mousewheel</a>
#### <a href="/secondless/w-a/事件.html#iv、事件绑定" style="margin-left:40px;">4、事件绑定</a>
##### <a href="/secondless/w-a/事件.html#_1-传统事件绑定的问题1-同名事件后者覆盖前者" style="margin-left:70px;">① 剖析传统事件绑定问题：同名事件后者覆盖前者，this 传递问题</a>
##### <a href="/secondless/w-a/事件.html#_3-事件绑定处理函数-添加事件addeventlistener-删除事件removeeventlistener" style="margin-left:70px;">② 现代事件绑定处理函数：添加事件addEventListener()，删除事件removeEventListener()，设置冒泡和捕获</a>
### [章节17.表单处理及错误处理与调试](/secondless/w-a/表单处理及错误处理与调试 '章节17.表单处理及错误处理与调试')
####  <a href="/secondless/w-a/表单处理及错误处理与调试.html#i、表单基础知识" style="margin-left:40px;">1、表单基础知识</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_1、获取form对象的方法" style="margin-left:70px;">① 获取form对象的方法</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_2、提交表单" style="margin-left:70px;">② 提交表单：默认提交form表单按钮type="submit"，js中表单提交及阻止提交，让没有提交功能的按钮（其它元素）完成表单提交使用的是form.submit()方法，实现使用键盘 CTRL + enter(回车键)提交数据</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_5-预防表单数据重复提交" style="margin-left:70px;">③ 预防表单数据重复提交，表单重置：按钮重置type="reset"，js重置 form.reset()方法</a>
####  <a href="/secondless/w-a/表单处理及错误处理与调试.html#_7-使用html-dom获取表单控件元素" style="margin-left:40px;">2、使用HTML DOM获取表单控件元素</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_1-elements属性获取表单控件元素集合" style="margin-left:70px;">① elements属性获取表单控件元素集合</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_2-多个表单字段都使用同一个-name-如单选框多选框" style="margin-left:70px;">② 多个表单字段都使用同一个 name，如单选框多选框，常用属性</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_1-elements属性获取表单控件元素集合" style="margin-left:70px;">③ 表单共有字段方法：foucs()，blur()，表单共有的字段事件：blur，change，input，focus</a>
####  <a href="/secondless/w-a/表单处理及错误处理与调试.html#ii、表单中的文本框" style="margin-left:40px;">3、表单中的文本框</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_1-input-value-和-textarea-value-获取输入的内容-defaultvalue获取默认设置的value值" style="margin-left:70px;">① input.value 和 textarea.value 获取输入的内容，defaultValue获取默认设置的value值</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_2-选择文本-使用-select-方法-可以将文本框里的文本选中-并且将焦点设置到文本框中" style="margin-left:70px;">② 选择文本：使用 select()方法，可以将文本框里的文本选中，并且将焦点设置到文本框中</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_3-选择部分文本-setselectionrange-方法-这个方法接受两个参数-索引和长度。" style="margin-left:70px;">③ 选择部分文本：setSelectionRange()方法，这个方法接受两个参数：索引和长度</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_4-select-事件-选中文本框文本后触发" style="margin-left:70px;">④ select 事件，选中文本框文本后触发</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_5-获取选择的文本-两个属性-selectionstart-和-selectionend" style="margin-left:70px;">⑤ 获取选择的文本，两个属性：selectionStart 和 selectionEnd</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_6-文本过滤输入-表单验证-文本验证-输入框验证" style="margin-left:70px;">⑥ 文本过滤输入（表单验证，文本验证，输入框验证）</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_7-剪切事件-cut-复制事件-copy-粘贴事件-paste-禁用输入法" style="margin-left:70px;">⑦ 剪切事件：cut，复制事件：copy，粘贴事件：paste，禁用输入法</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_8-利用正则表达式将用户输入的非数字字符替换成空-只留下数字" style="margin-left:70px;">⑧ 利用正则表达式将用户输入的非数字字符替换成空，只留下数字</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_9-输入框自动切换焦点到下一个输入框-类似tab键-maxlength属性可输入的最大字符长度" style="margin-left:70px;">⑨ 输入框自动切换焦点到下一个输入框（类似Tab键），maxlength属性可输入的最大字符长度</a>
####  <a href="/secondless/w-a/表单处理及错误处理与调试.html#iii、表单中的下拉列表-选择框" style="margin-left:40px;">4、表单中的下拉列表（选择框）</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_1-获取下拉列表对象" style="margin-left:70px;">① 获取下拉列表对象</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_2-下拉列表多选属性-multiple-multiple-按住键盘ctrl键进行多选-size显示的行数" style="margin-left:70px;">② 下拉列表多选属性 multiple="multiple"(按住键盘CTRL键进行多选)，size显示的行数</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_3-属性-options-下拉选项的集合" style="margin-left:70px;">③ 属性 options（下拉选项的集合）</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_4-选择选项-选择一项的使用selectedindex属性-监听的是下拉列表的change事件" style="margin-left:70px;">④ 选择选项：选择一项的使用selectedIndex属性，监听的是下拉列表的change事件</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_5-下拉列表动态添加选择项-使用option-构造函数-add方法添加选项" style="margin-left:70px;">⑤ 下拉列表动态添加选择项: 使用Option 构造函数，add方法添加选项</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_6-下拉列表动态移除选择项-三种方式-removechild移除、remove-方法移除和-null-移除" style="margin-left:70px;">⑥ 下拉列表动态移除选择项：三种方式（removeChild移除、remove()方法移除和 null 移除）</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_7-下拉列表动态移动选择项-两个下拉列表选项移动" style="margin-left:70px;">⑦ 下拉列表动态移动选择项（两个下拉列表选项移动）</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_8-下拉列表动态排序选择项-选项排序-属性index" style="margin-left:70px;">⑧ 下拉列表动态排序选择项（选项排序）：属性index</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_9-获取单选框或者多选框选择的值-判断checked属性是否为真判断选中的项-defaultchecked判断项目原本设置的默认值" style="margin-left:70px;">⑨ 获取单选框或者多选框选择的值: 判断checked属性是否为真判断选中的项，defaultChecked判断项目原本设置的默认值</a>
####  <a href="/secondless/w-a/表单处理及错误处理与调试.html#iv、错误与调试" style="margin-left:40px;">5、错误与调试</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_1-浏览器错误报告" style="margin-left:70px;">① 浏览器错误报告，错误处理：try-catch 语句，finally 子句，错误类型</a>
##### <a href="/secondless/w-a/表单处理及错误处理与调试.html#_4-try-catch使用场景" style="margin-left:70px;">② try-catch使用场景，抛出错误，错误事件error：处理DOM对象产生错误时候使用，比如加载图片失败，错误处理策略，调试技术和调试工具</a>
### [章节18.数据Cookie、XML、JSON](/secondless/w-a/数据Cookie、XML、JSON '章节18.数据Cookie、XML、JSON')
####  <a href="/secondless/w-a/数据Cookie、XML、JSON.html#i、cookie" style="margin-left:40px;">1、Cookie、sessionStorage、localStorage</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_1-cookie-的组成" style="margin-left:70px;">① cookie 的组成，编码和解码，失效时间，手动清理cookie，cookie路径访问，cookie限制域名访问，指定访问协议 http https</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_8-封装cookie-创建-获取-删除" style="margin-left:70px;">② 封装cookie(创建，获取，删除)</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#ii、sessionstorage、localstorage" style="margin-left:70px;">③ sessionStorage、localStorage</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#iii、cookie-和-localstorage的对比" style="margin-left:70px;">④ cookie 和 localStorage的对比</a>
####  <a href="/secondless/w-a/数据Cookie、XML、JSON.html#iv、xml" style="margin-left:40px;">2、XML</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_1-创建-xmldom-对象-dom2-级在-document-implementaion-中引入了-createdocument-方法" style="margin-left:70px;">① 创建 XMLDOM 对象（document.implementaion，DOMParser类型创建XMLSerializer类型进行序列化成字符串），解析错误</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_4-加载读取外部xml文件" style="margin-left:70px;">② 加载读取外部xml文件</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_5-xpath操作xml" style="margin-left:70px;">③ XPath操作XML</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_6-封装xpath操作xml文件" style="margin-left:70px;">④ 封装XPath操作xml文件</a>
####  <a href="/secondless/w-a/数据Cookie、XML、JSON.html#v、json" style="margin-left:40px;">3、JSON</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_1-json-语法-可以表示三种类型的值" style="margin-left:70px;">①JSON 语法，可以表示三种类型的值</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_2-获取外部json文件" style="margin-left:70px;">② 获取外部json文件</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_3-解析json字符串-将json字符串转成数组对象-json结构数据-json-parse-方法" style="margin-left:70px;">③ 解析json字符串（将json字符串转成数组对象——json结构数据）：JSON.parse()方法</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_4-js原生值数组、对象转成json字符串-json-stringify" style="margin-left:70px;">④ js原生值数组、对象转成json字符串--JSON.stringify()</a>
##### <a href="/secondless/w-a/数据Cookie、XML、JSON.html#_5-tojson" style="margin-left:70px;">⑤ toJSON</a>


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