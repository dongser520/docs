---
navbar: true
sidebar: auto
title: 章节7.javascript数组 
---

> #### 回顾
> 回忆一下，我们之前学习的时候，提到的数组出现的地方：<br/>
> 1、<a href="/secondless/w-a/javascript运算符.html#_2-逗号运算符" target="_blank">章节3.javascript运算符__逗号运算符___3.数组的字面量声明</a> <br/>
> 2、<a href="/secondless/w-a/javascript函数.html#_3、函数的arguments-对象" target="_blank">章节5.javascript函数__3、函数的arguments 对象__例子2：利用arguments对象接收参数，通过数组形式 arguments[下标] 获取，从0开始</a> <br/>
> 3、<a href="/secondless/w-a/javascript对象.html#_1-对象属性输出" target="_blank">章节6.javascript对象__2、对象属性输出、方法（函数）调用__① 对象属性输出</a>
> #### 对数组的初步印象
> ``` javascript
> let text = ['迪丽热巴',31,'52kg','演员','170cm'];
> alert(text); // 返回数组： '迪丽热巴',31,'52kg','演员','170cm'
> // 通过[下标]获取数组每一项的值，下标从0开始
> alert(text[0]); // '迪丽热巴'
> alert(text[1]); // 31
> alert(text[3]); // '演员'
> ```


> 有了以上的初步印象，我们来学习数组：<br/>
> 1、js中的数组类型：Array 类型；<br/>
> 2、js中的数组，数组中的每个元素，可以保存任何数据类型；<a href="/secondless/w-a/javascript基础.html#_4、数据类型" target="_blank">回顾数据类型</a><br/>
> 3、数组Array类型，属于Object类型
## 1、创建及读取数组
### ① 使用字面量方式创建 Array（数组）
> #### 1.创建一个空的数组
> ``` javascript
> //声明创建一个空的数组
> let text = [];  
> alert(typeof text);// 'object'
> //类比创建一个空的对象 let text = {}; 创建空对象 let text = null;
> ```
> #### 2.创建包含元素的数组
> ``` javascript
> let text = ['迪丽热巴',31,'52kg','演员','170cm'];
> alert(text);// '迪丽热巴',31,'52kg','演员','170cm' 是以逗号形式分割打印出每个元素
> ```
> #### 3.创建数组注意事项
> ``` javascript
> //不要在最后一个元素后面加上 逗号，IE浏览器有兼容问题，创建对象的时候无强烈要求
> let text = ['迪丽热巴',31,'52kg','演员','170cm',];
> //不要写成这样，同时是浏览器有兼容识别问题
> let text = [,,,,,];
> ```
### ② 使用 new 关键字创建 Array（数组）（new 关键字可以省略）
> ``` javascript
> //1.创建一个空的数组
> let text = new Array();
> //2.new 关键字可以省略
> let text = Array();
> //3.创建一个包含 5 个元素的数组,括号里面必须是一个数字
> let text = new Array(5);//let text = Array(5);
> alert(text);// ,,,, 4个逗号，需要赋值
> text[0]='迪丽热巴';
> text[1]=31;
> text[2]='52kg';
> text[3]='演员';
> text[4]='170cm';
> alert(text); // 迪丽热巴,31,52kg,演员,170cm
> //4.括号如果是多个数字或者字符串，就是创建了一个数组并分配好了元素
> let text = new Array('迪丽热巴',31,'52kg','演员','170cm');//不要new也可以
> ```
### ③ 创建一个稍微复杂一点的数组并读取数组的值
> 既然说js中的数组，数组中的每个元素，可以保存任何数据类型，我们来创建一个包含多种数据类型的数组
> ``` javascript
> let text = [
>     //第一个元素是一个对象
>     {  
>         //键值对，左边是属性名，右边是值
>         height:'170cm', //字符串
>         weight:'52kg',
>         age:25,         //数值
>         looks:'very beautiful',
>         bust:'90cm',
>         waist:'60cm',
>         hip:'90cm',
>         education:'研究生以上学历',
>         family:'富二代',
>         //对象中的函数（方法）
>         Cando:function(){  //匿名函数（后面会讲）
>             return '给我洗衣、做饭、陪我打游戏、旅游、心疼我，事事以我为中心！';
>         }
>     }, //数组中的每个元素记得用逗号分割
>     new Array(10,'迪丽热巴',30), //第2个元素是数组,用的new关键字创建
>     ['迪丽热巴',31,'52kg','演员','170cm'],//第3个元素是数组,用字面量方式创建
>     '迪丽热巴',//第4个元素是字符串
>     30, //第5个元素是数值
>     true, //第6个元素是布尔值
>     200+50  //第7个元素是数值
> ];
> alert(text);//[object Object],10,迪丽热巴,30,迪丽热巴,31,52kg,演员,170cm,迪丽热巴,30,true,250
> ```
> #### 读取数组的值
> ``` javascript
> alert(text[0]);//[object Object]
> alert(text[0].family);//'富二代'
> alert(text[0]['family']);//'富二代'
> alert(text[1]);// 10,迪丽热巴,30
> alert(text[2]);// 迪丽热巴,31,52kg,演员,170cm
> alert(text[2][0]);// 迪丽热巴
> alert(text[5]); //true
> alert(text[6]); //250
> //数组一共是7个元素，从下标0开始，所以最多取到6，如果此时取下标大于6
> alert(text[7]);//第8个元素没有，所以是undefined
> ```
#### 注意：数组最多可包含 4294967295 个元素，超出即会发生异常

> 那么我们怎么知道数组中有多少个元素呢，靠一个一个数吗？

<br/><br/><br/>

## 2、数组中的属性和内置方法
### ① length 属性获取数组元素数量
> ``` javascript
> alert(text.length);// 7
> text.length = 10;
> //强制了数组元素数量，缺少的用逗号补充
> alert(text);//[object Object],10,迪丽热巴,30,迪丽热巴,31,52kg,演员,170cm,迪丽热巴,30,true,250,,,
> ```
### ② 用[下标]新增、修改数组元素
> ``` javascript
> let arr = []; arr[0] = '娜扎';arr[1] = 33; alert(arr); //娜扎,33
> //新增一个元素
> text[7] = '研究生以上学历'; // text[text.length] = '研究生以上学历';
> alert(text);
> alert(text[7]);// '研究生以上学历'
> //修改第6个元素true为false, 下标应该是5，因为从0开始的下标
> text[5] = false;
> alert(text);
> ```
### ③ 数组内置方法toLocaleString()、valueOf()和 toString()
> 对象或数组都具有 toLocaleString()、toString()和 valueOf()方法。其中 toString()和 valueOf()无论重写了谁，都会返回相同的值。数组会将每个值进行字符串形式的拼接，以逗号隔开。
> ``` javascript
> let text = ['迪丽热巴',31,'52kg','演员','170cm'];
> alert(text);// '迪丽热巴',31,'52kg','演员','170cm'
> alert(text.toString()); // '迪丽热巴',31,'52kg','演员','170cm'
> alert(text.valueOf()); // '迪丽热巴',31,'52kg','演员','170cm'
> alert(text.toLocaleString()); // '迪丽热巴',31,'52kg','演员','170cm'
> //以上返回的结果都一样，都是将每个值进行字符串形式的拼接，以逗号隔开
> ```
> <strong>知识延伸</strong>
> #### toLocaleString()的区别
> ``` javascript
> //new Date()创建一个日期对象，后面会讲到
> let text = ['迪丽热巴',31,'52kg','演员','170cm',new Date()];
> alert(text);// '迪丽热巴',31,'52kg','演员','170cm',Tue Aug 29 2023 11:17:03 GMT+0800 (中国标准时间)
> alert(text.toString()); // '迪丽热巴',31,'52kg','演员','170cm',Tue Aug 29 2023 11:17:03 GMT+0800 (中国标准时间)
> alert(text.valueOf()); // '迪丽热巴',31,'52kg','演员','170cm',Tue Aug 29 2023 11:17:03 GMT+0800 (中国标准时间)
> //最后一个进行本地格式化时间
> alert(text.toLocaleString()); // '迪丽热巴',31,'52kg','演员','170cm',2023/8/29 11:17:03
> ```



## 3、数组中的方法
### ①  join()方法--用不同的分隔符将数组分割成字符串
> 默认情况下，数组字符串都会以逗号隔开。如果使用 join()方法，则可以使用不同的分隔符来构建这个字符串。
>> ``` javascript
>> let text = ['迪丽热巴',31,'52kg','演员','170cm'];
>> console.log(text);
>> console.log(text.join('|'));// '迪丽热巴|31|52kg|演员|170cm'
>> console.log(typeof text.join('|'));// string
>> console.log(typeof text); // object 原数组没有变化
>> ```
> <strong>知识延伸</strong>
> #### 数组与数字或字符串或布尔值比较
>> 分析下面代码在控制台输出的结果
>> ``` javascript
>> let arr = [0];
>> if(arr){
>>     console.log( arr == true );
>> }else{
>>     console.log(arr);
>> }
>> ```
>> 过程解析：<br/>
>> 1. 要知道哪些值隐式转成布尔值是false <a href="/secondless/w-a/javascript基础.html#总结-boolean-类型转换" target="_blank">if隐式转换</a><br/>
>> (1.空字符串,2.数值0或者NaN,3.null,4.undefined) <br/>
>> 2. 判断 arr == true 吗？ 等号两边类型不同，会触发隐式转换 <a href="/secondless/w-a/javascript运算符.html#_6-相等和不等的规则" target="_blank">javascript运算符_6-相等和不等的规则</a>
>> 3. 那么数组  arr = [0] 会转成什么呢？
>>> 1. 数组本质也是对象，将数组对象转成原始值进行比较，遵循<a href="/secondless/w-a/javascript运算符.html#_6-相等和不等的规则" target="_blank">javascript运算符_6-相等和不等的规则——第四条规律</a>
>>> 2. 先调用对象的valueOf()方法，即 arr.valueOf(),通过打印仍然是一个数组，没有转成原始值，没有转成基本类型数据；
>>> 3. 那么就会尝试调用arr.toString()方法，而当我们调用数组的.toString()方法的时候，会先尝试调用数组的join方法，讲数组里面的元素拼接起来，于是返回值是0, 0转成布尔值是false, 显然 false == true , 比较结果是false
### ②  push()方法--向数组末尾添加元素，返回修改后数组的长度
> push()方法可以接收任意数量的参数，把它们逐个添加到数组的末尾，并返回修改后数组的长度
> ``` javascript
> let text = ['迪丽热巴','古力娜扎'];
> console.log(text.push('梁咏琪')); //返回：3   数组末尾添加一个元素，并且返回修改后的长度
> console.log(text.push('黑丝空姐','性感模特'));// 返回：5  数组末尾添加两个元素，并且返回修改后的长度
> console.log(text); //  返回：['迪丽热巴', '古力娜扎', '梁咏琪', '黑丝空姐', '性感模特']
> ```
### ③  pop()方法--移除数组末尾元素，并返回移除的元素
> pop()方法从数组末尾移除最后一个元素，减少数组的 length 值，然后返回移除的元素
> ``` javascript
> let text = ['迪丽热巴','古力娜扎','梁咏琪'];
> console.log(text.pop()); //返回：梁咏琪  ---移除数组末尾元素，并返回移除的元素
> console.log(text); //返回：['迪丽热巴', '古力娜扎']
> ```
### ④ shift()方法--移除数组开头元素，并返回移除的元素
> ``` javascript
> let text = ['迪丽热巴','古力娜扎','黑丝空姐','性感模特'];
> console.log(text.shift()); //返回：'迪丽热巴'  ----移除数组开头元素，并返回移除的元素
> console.log(text); //  返回：['古力娜扎', '黑丝空姐', '性感模特']
> ```
### ⑤ unshift()方法--向数组开头添加元素，返回修改后数组的长度
> ``` javascript
> let text = ['迪丽热巴','古力娜扎','梁咏琪'];
> console.log(text.unshift('徐冬冬'));//返回：4 ---向数组开头添加元素，返回修改后数组的长度
> console.log(text.unshift('黑丝空姐','性感模特'));//返回：6
> console.log(text);//返回：['黑丝空姐', '性感模特', '徐冬冬', '迪丽热巴', '古力娜扎', '梁咏琪']
> ```
### ⑥ reverse()方法--反向排序，返回排序后的数组
> ``` javascript
> let text = [1,2,3,4,5]; //数组
> console.log(text.reverse()); //返回：[5, 4, 3, 2, 1]----逆向排序方法，返回排序后的数组
> console.log(text); //返回：[5, 4, 3, 2, 1]----原数组也被逆向排序了，说明是引用
> ```
### ⑦ sort()方法--从小到大排序，返回排序后的数组
> ``` javascript
> let text = [4,6,1,5,2,8];
> console.log(text.sort()); //返回：[1, 2, 4, 5, 6, 8] --- 返回排序后的数组
> ```
> #### sort()方法注意问题：
> sort() 方法的默认排序在数字排序上有些问题，因为数字排序和数字字符串排序的算法是一样的。
> ``` javascript
> let text = [5,58,1,76,214,117]; 
> let text = ['5','58','1','76','214','117']; 
> console.log(text.sort()); //返回：[1, 117, 214, 5, 58, 76] 有问题
> ```
> 我们必须修改这一特征，修改的方式，就是给 sort(参数)方法传递一个函数参数。以后从小到大排序，就按照这个写法就可以了。
> ``` javascript
> function compare(value1, value2) { //数字排序的函数参数，数组内部各个元素进行依次比较
>   if (value1 < value2) { 
>     return -1; // 负值，如果所传递的第一个参数比第二个参数小
>   } else if (value1 > value2) { 
>     return 1; // 正值，如果第一个参数比第二个参数大
>   } else { 
>     return 0; // 如果两个参数相等
> }
> let text = [5,58,1,76,214,117]; 
> console.log(text.sort()); //返回：[1, 117, 214, 5, 58, 76] 有问题
> console.log(text.sort(compare));//返回：[1, 5, 58, 76, 117, 214]
> ```
### ⑧ concat()方法--创建新数组，并添加新元素，原数组没有变化
> ``` javascript
> let arr = ['迪丽热巴','古力娜扎','梁咏琪']; // 原数组
> let arr1 = arr.concat('黑丝空姐','性感车模');//创建新数组，并添加新元素
> console.log(arr1); //新数组，返回：['迪丽热巴', '古力娜扎', '梁咏琪', '黑丝空姐', '性感车模']
> console.log(arr); //原数组没有任何变化，返回： ['迪丽热巴', '古力娜扎', '梁咏琪']
> ```
### ⑨ slice()方法--指定数组部分元素组建新数组，原数组没有变化
> ``` javascript
> let arr = ['迪丽热巴','古力娜扎','梁咏琪','黑丝空姐','性感车模','徐冬冬']; // 原数组
> let arr1 = arr.slice(1);// 从第1个位置往后取（一般数逗号）
> console.log(arr1); //新数组，返回：['古力娜扎', '梁咏琪', '黑丝空姐', '性感车模', '徐冬冬']
> console.log(arr); //原数组没有任何变化，返回：  ['迪丽热巴', '古力娜扎', '梁咏琪', '黑丝空姐', '性感车模', '徐冬冬']
> 
> let arr2 = arr.slice(1,3);// 从第1个位置取到第3个位置
> console.log(arr2); //新数组，返回：['古力娜扎', '梁咏琪']
> ```
### ⑩ splice()方法--有删除、插入、替换数组元素的功能，原数组发生变化
> #### 1. 删除数组功能 
> ``` javascript
> let arr = ['迪丽热巴','古力娜扎','梁咏琪','黑丝空姐','性感车模','徐冬冬']; // 原数组
> let arr1 = arr.splice(1);// 从第1个位置往后截取（一般数逗号）
> console.log(arr1); //新数组，返回：['古力娜扎', '梁咏琪', '黑丝空姐', '性感车模', '徐冬冬']
> console.log(arr); //原数组被截取的元素被删除，返回：  ['迪丽热巴']
> ```
> ``` javascript
> let arr = ['迪丽热巴','古力娜扎','梁咏琪','黑丝空姐','性感车模','徐冬冬']; // 原数组
> // 从第1个位置往后取，取3个（注意跟上面slice的区别，不是从第1个位置取到第3个位置）
> let arr1 = arr.splice(1,3);
> console.log(arr1); //新数组，返回：['古力娜扎', '梁咏琪', '黑丝空姐']
> console.log(arr); //原数组被截取的元素被删除，返回： ['迪丽热巴', '性感车模', '徐冬冬']
> ```
> #### 2. 插入数组功能 
> ``` javascript
> let arr = ['迪丽热巴','古力娜扎','梁咏琪','黑丝空姐','性感车模','徐冬冬']; // 原数组
> // 从第1个位置，0表示一条都不取
> let arr1 = arr.splice(1,0); 
> console.log(arr1);//新数组，返回 []
> 
> let arr2 = arr.splice(1,0,'古巨基','古天乐');
> console.log(arr2); //新数组，返回：[]
> console.log(arr); //原数组从第一个位置新增了两个元素，返回： ['迪丽热巴', '古巨基', '古天乐', '古力娜扎', '梁咏琪', '黑丝空姐', '性感车模', '徐冬冬']
> ```
> 可以看到，插入功能就是第二个参数，取的条数是0，后面加上插入的元素
> #### 3. 替换功能
> ``` javascript
> let arr0 = ['迪丽热巴','古力娜扎','梁咏琪','黑丝空姐','性感车模','徐冬冬']; // 原数组
> // 从第一个位置，取一条（原数组相当于删除了一个元素 '古力娜扎'）
> let arr3 = arr0.splice(1,1,'刘德华');//取到那个元素换成了 '刘德华'
> console.log(arr3);//新数组，返回： ['古力娜扎']
> console.log(arr0);//原数组:返回： ['迪丽热巴', '刘德华', '梁咏琪', '黑丝空姐', '性感车模', '徐冬冬']
> ```
> 可以看到，替换功能就是第二个参数，取的条数是某个数值如1条，后面加上对应的1条元素进行替换


## 4、数组更多操作方法
### 随着课程深入，后面通过案例再讲解



































<br/><br/><br/><br/>


## 课程其它章节
### [章节1.课程介绍](/secondless/w-a '章节1.课程介绍')
### [章节2.javascript基础](/secondless/w-a/javascript基础 '章节2.javascript基础')
### [章节3.javascript运算符](/secondless/w-a/javascript运算符 '章节3.javascript运算符')
### [章节4.流程控制语句](/secondless/w-a/流程控制语句 '章节4.流程控制语句')
### [章节5.javascript函数](/secondless/w-a/javascript函数 '章节5.javascript函数')
### [章节6.javascript对象](/secondless/w-a/javascript对象 '章节6.javascript对象')
### [章节7.javascript数组](/secondless/w-a/javascript数组 '章节7.javascript数组') 
### [章节8.Date类型：时间和日期](/secondless/w-a/Date类型：时间和日期 '章节8.Date类型：时间和日期')
### [章节9.Function类型：函数进阶](/secondless/w-a/Function类型：函数进阶 '章节9.Function类型：函数进阶')
### [章节10.内置对象：Global、Math对象，变量、作用域和内存问题](/secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题 '章节10.内置对象：Global、Math对象，变量、作用域和内存问题')
### [章节11.匿名函数和闭包](/secondless/w-a/匿名函数和闭包 '章节11.匿名函数和闭包')