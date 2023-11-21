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