---
navbar: true
sidebar: auto
title: 章节12.javascript基本包装类型
---

> <b>1.前言</b> <br/>
> 我们在前面的章节，学习了基本类型和引用类型（Object对象/数组Array/正则表达式），本节课我们讲一下基本包装类型。为了便于操作基本类型值，js 提供了 3 个特殊的引用类型(基本包装类型)：Boolean、Number和 String。这些类型与其他引用类型相似，但同时也具有与各自的基本类型相应的特殊行为。实际上，<span style="color:#00A5F7">每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而能够调用一些方法来操作这些数据。</span>
>  <br/> <br/>
> <b>2.理解基本包装类型</b> <br/>
> ```javascript
> let text = '丽迪热巴';
> console.log(typeof text);//返回：string，基本类型，字符串
> //截掉字符串前两位
> let new_text = text.substring(2);//对象.方法(参数)，这种写法明显是引用类型的写法 
> //substring(2)，括号里面写索引，索引是从0开始，当前2表示从第三个字符（或者第二个位置）截取到字符串末尾输出
> console.log(new_text);//返回：'热巴'
> ```
> 变量 text 是一个字符串类型，而 text.substring(2)又说明它是一个对象(因为只有对象才会调用方法)，最后把处理结果赋值给 new_text。'迪丽热巴'是一个字符串类型的值，按道理它不
应该是对象，不应该会有自己的方法
> ```javascript
> console.log('迪丽热巴'.substring(2));//直接通过值来调用方法，返回：'热巴'
> ```
> 我们发现可以直接用值调用这个方法，印证了上面的“<span style="color:#00A5F7">每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而能够调用一些方法来操作这些数据。</span>”这句话。<br/>
> <br/>
> <b>3.基本包装类型进一步解读</b><br/>
> 我们以普通声明（字面量声明）和 以new运算符声明字符串 【<a href="/secondless/w-a/javascript基础.html#object-类型" target="_blank">章节2.javascript基础_4、数据类型_Object 类型_new 操作符来创 建其他类型的对象</a>提到过】做进一步探讨
>> ① 字面量写法
>> ```javascript
>> let text = '迪丽热巴'; //字面量，基本类型
>> text.name = '木拉提'; //给基本类型加属性，无效属性
>> text.age = function () { //给基本类型加方法，无效方法
>>     return 30;
>> };
>> console.log(text); //'迪丽热巴'
>> console.log(text.substring(2)); //'热巴'
>> console.log(typeof text); //string
>> console.log(text.name); //undefined
>> console.log(text.age()); //错误
>> ```
>> ② new 运算符写法
>> ```javascript
>> let text = new String('迪丽热巴'); //new运算符变成了引用类型，String的引用类型，字符串对象 
>> text.name = '木拉提'; //自定义属性，有效属性
>> text.age = function () { //自定义方法，有效方法
>>     return 30;
>> };
>> console.log(text); //字符串对象 String {'迪丽热巴', name: '木拉提', age: ƒ}
>> console.log(text.substring(2)); //'热巴'
>> console.log(typeof text); //object
>> console.log(text.name); //'木拉提'
>> console.log(text.age()); //30
>> ```
> 以上字面量声明和 new 运算符声明很好的展示了他们之间的区别。但有一定还是可以肯定的，那就是不管字面量形式还是 new 运算符形式，都可以使用它的内置方法（如上面的：.substring()）。并且<span style="color:#00A5F7">Boolean 和 Number 特性与 String 相同，三种类型可以成为基本包装类型</span>。(注意：在使用 new 运算符创建以上三种类型的对象时，可以给自己添加属性和方法，<span style="color:#00A5F7">但我们建议不要这样使用</span>，因为这样会导致根本分不清到底是基本类型值还是引用类型值。)
> <br/>

<b>在了解完基本包装类型后，大家现在应该想迫切知道，这三种类型有哪些内置的属性和方法</b>

##  1、 Boolean 类型
### Boolean 类型没有特定的属性或者方法
##  2、 Number 类型
### ① Number类型静态属性:MAX_VALUE、MIN_VALUE、NaN、NEGATIVE_INFINITY、POSITIVE_INFINITY、prototype
> Number 类型有一些静态属性(直接通过 Number 调用的属性，而无须 new 运算符)。 
> |  Number 静态属性            |  说 明                                  |   
> |   :--:                     |   :--:                                 |    
> |  MAX_VALUE                 |  表示最大数          | 
> |  MIN_VALUE                 |  表示最小值                         |   
> |  NaN                       |  非数值                         |   
> |  NEGATIVE_INFINITY         |  负无穷大，溢出返回该值                     |   
> |  POSITIVE_INFINITY         |  无穷大，溢出返回该值                   |  
> |  prototype                 |  原型，用于增加新属性和方法                      |
> ```javascript
> //理解一下静态属性
> let text = 100;
> console.log(text.MAX_VALUE);//undefined ，这种写法叫做属性
> //类型.属性，叫做静态属性
> console.log(Number.MAX_VALUE);//1.7976931348623157e+308
> console.log(Number.MIN_VALUE);//5e-324
> console.log(Number.NaN);//NaN
> console.log(Number.NEGATIVE_INFINITY);//-Infinity
> console.log(Number.POSITIVE_INFINITY);//Infinity
> ```
### ② toString()方法-将数值转化为字符串，并且可以转换进制
> ``` javascript
> let text = 1501.123;
> console.log(text.toString());//'1501.123'
> console.log(typeof text.toString());//string
> //转换成2进制
> console.log(text.toString(2));//111110101.00011111011111001110110110010001011010000111
> ```
### ③ toLocaleString()方法-根据本地数字格式转换为字符串
> ``` javascript
> let text = 1501.123;
> console.log(text.toLocaleString());//'1,501.123'
> console.log(typeof text.toLocaleString());//string
> ```
### ④ toFixed()方法-将数字保留小数点后指定位数并转化为字符串
> ``` javascript
> let text = 1501.123;//小数点保留两位，四舍五入
> console.log(text.toFixed(2));//'1501.12'
> console.log(typeof text.toFixed(2));//string
> let text1 = 1501.125;//小数点保留两位，四舍五入
> console.log(text1.toFixed(2));//1501.13
> ```
### ⑤ toExponential()方法-将数字以指数形式表示，保留小数点后指定位数并转化为字符串
> ``` javascript
> let text = 1501.123;
> console.log(text.toExponential());//'1.501123e+3' 指数形式
> console.log(text.toExponential(2));//'1.50e+3'
> console.log(typeof text.toExponential());//string
> ```
### ⑥ toPrecision()方法-指数形式或点形式表述数，保留小数点后面指定位数并转化为字符串
> ``` javascript
> let text = 1501.123;
> console.log(text.toPrecision());//'1501.123' 点数形式
> //根据传参来决定是指数形式还是点数形式
> console.log(text.toPrecision(8));//'1501.1230'
> console.log(text.toPrecision(2));//'1.5e+3' 指数形式
> console.log(typeof text.toPrecision());//string
> ```
## 3、String类型 
1. String类型属性
> ### ① 属性:length - 返回字符串的字符长度
> ``` javascript
> let text = '迪丽热巴';
> console.log(text.length);// 4
> ```
> ### ② 属性:constructor - 返回创建 String 对象的函数
> ``` javascript
> let text = '迪丽热巴';
> console.log(text.constructor);//String() { [native code] }
> ```
> ### ③ 属性:prototype - 通过添加属性和方法扩展字符串定义
> 面向对象再讲解
2. String类型通用方法
> ### ④ 通用方法：valueOf()、toLocaleString()和 toString()方法，返回字符串的基本值，写不写都一样
3. String类型字符方法
> ### ⑤ 字符方法：charAt(n) - 返回指定索引位置的字符 
> ``` javascript
> let text = '迪丽热巴';
> console.log(text.charAt(0));// '迪'
> console.log(text.charAt(1));// '丽'
> console.log(text.charAt(2));// '热'
> console.log(text.charAt(3));// '巴'
> ``` 
> ### ⑥ 字符方法：charCodeAt(n) - 以 Unicode 编码形式返回指定索引位置的字符
> ``` javascript
> let text = '迪丽热巴s';
> console.log(text.charCodeAt(0));// 36842, 返回的是 '迪'字的acssii码
> console.log(text.charCodeAt(1));// 20029
> console.log(text.charCodeAt(2));// 28909
> console.log(text.charCodeAt(3));// 24052
> console.log(text.charCodeAt(4));// 115 , 返回的是 's'字符的acssii码
> ```
> ### ⑦ 字符方法：数组方式截取字符串
> ``` javascript
> let text = '迪丽热巴s';
> console.log(text[0]);//'迪'
> console.log(text[1]);//'丽'
> console.log(text[2]);//'热'
> console.log(text[3]);//'巴'
> console.log(text[4]);//'s'
> ```
4. String类型字符串操作方法
> ### ⑧ 字符串操作方法：concat(str1...str2) - 将字符串参数串联到调用该方法的字符串（拼装字符串）
> ``` javascript
> let text = '迪丽热巴';
> console.log(text.concat('s','是美女','!'));//'迪丽热巴s是美女!'
> ```
> ### ⑨ 字符串操作方法：slice(n,m) - 返回字符串 n 到 m 之间位置的字符串（截取字符串）
> ``` javascript
> let text = '迪丽热巴s是美女';
> console.log(text.slice(1));    //'丽热巴s是美女'   从第1个位置全部取到
> console.log(text.slice(1,3));  //'丽热'           从第1个位置取到第3个位置
> console.log(text.slice(-2));   //'美女'   总长度8,8+(-2)=6,从第6个位置开始
> console.log(text.slice(3,-2)); //'巴s是'  总长度8,8+(-2)=6,就是(3,6) 从第3个位置取到第6个位置 
> console.log(text.slice(-3,-2));//'是'     总长度8,8+(-3)=5,8+(-2)=6,就是(5,6)从第5个位置取到第6个位置
> ```
> ### ⑩ 字符串操作方法：substring(n,m) - 返回字符串 n 到 m 之间位置的字符串（截取字符串）
> ``` javascript
> let text = '迪丽热巴s是美女';
> console.log(text.substring(1));  // '丽热巴s是美女'    从第1个位置全部取到
> console.log(text.substring(1,3));// '丽热'             从第1个位置取到第3个位置
> console.log(text.substring(-2)); // '迪丽热巴s是美女'  负数返回全部字符串
> console.log(text.substring(3,-2));// '迪丽热'  参数是负，直接返回0，就是(3,0),
>                                   // 如果第二个参数比第一个参数小，那么第二个参数提前，就是(0,3)
> ```
> ### ⑪ 字符串操作方法：substr(n,m) - 返回字符串 n 开始的 m 个字符串（截取字符串）
> ``` javascript
> let text = '迪丽热巴s是美女';
> console.log(text.substr(1));   // '丽热巴s是美女'   从第1个位置全部取到
> console.log(text.substr(1,3)); // '丽热巴'          从第1个位置开始，取3个
> console.log(text.substr(1,10));// '丽热巴s是美女'    从第1个位置开始，取10个，没那么多，取到末尾
> console.log(text.substr(-2));  // '美女'   总长度8,8+(-2)=6,从第6个位置开始
> console.log(text.substr(3,-2));// 空       第二个参数负，直接为0，就是(3,0),就是从第3个位置取0个字符，所以没有为空
> ```
5. String类型字符串位置方法
> ### ⑫ 字符串位置方法：indexOf(str, n) - 从 n 开始搜索的第一个 str，并将搜索的索引值返回
> ``` javascript
> let text = '迪丽热巴是不是美女';
> console.log(text.indexOf('是'));  //4  返回'是'的索引，从左往右正向搜索，索引从0开始，正向搜索'是'第一次出现的位置索引
> console.log(text.indexOf('是',5));//6  返回'是'的索引，从左往右正向搜索，索引从0开始，当前从索引5开始搜索'是'第一次出现的位置，就是索引6了
> console.log(text.indexOf(','));  // -1 找不到则返回 -1
> ```
> ### ⑬ 字符串位置方法：lastIndexOf(str, n) - 从 n 开始搜索的最后一个 str，并将搜索的索引值返回
> ``` javascript
> let text = '迪丽热巴是不是美女';
> console.log(text.lastIndexOf('是'));//6    返回搜索'是'的索引，从右往左反向搜索，索引从0开始，反向数第一个出现的'是'位置索引
> console.log(text.lastIndexOf('是',5));//4  返回搜索'是'的索引，从右往左反向搜索，从索引5往前搜索，第一次出现'是'的位置是索引4
> console.log(text.lastIndexOf(','));// -1 找不到则返回 -1
> ```
> ### ⑭ 将字符串中的某个字符索引位置全部找出放在数组中
> 写个函数，将下面字符串中的'是'的位置全部找出来，放在数组中
> ``` javascript
> let text = '迪丽热巴是不是美女，你说是就是';
> 
> let arr = [];
> let firstPos = text.indexOf('是');
> console.log(firstPos);//4
> //说明找到了，如果第一个都找不到，数组就是空数组
> //可以使用while循环，一个一个找
> while(firstPos > -1){
>     //说明找到了一个，把这个先放进数组里面去
>     arr.push(firstPos);
>     //然后接着当前找到的位置firstPos，接着往后每次加一个位置进行查找firstPos+1
>     firstPos = text.indexOf('是',firstPos+1);
> }
> console.log(arr);//[4, 6, 12, 14]
> ```
> 涉及的知识点：<br/>
> while循环查看：<a href="/secondless/w-a/流程控制语句.html#_2-while-循环语句" target="_blank">章节4.流程控制语句_3、循环语句_② while 循环语句</a><br/>
> 数组push查看：<a href="/secondless/w-a/javascript数组.html#_2-push-方法-向数组末尾添加元素-返回修改后数组的长度" target="_blank">章节7.javascript数组_3、数组中的方法_② push()方法</a><br/>
6. String类型字符串大小写转换方法
> ### ⑮ 大小写转换：toLowerCase(str) - 将字符串全部转换为小写
> ``` javascript
> let text = 'I LOVE yOU';
> console.log(text.toLowerCase());// 'i love you'
> ```
> ### ⑯ 大小写转换：toUpperCase(str) - 将字符串全部转换为大写
> ``` javascript
> let text = 'nice to Meet you';
> console.log(text.toUpperCase());// 'NICE TO MEET YOU'
> ```
> ### ⑰ 小写转换并且本地化：toLocaleLowerCase(str)、大写转换并且本地化：toLocaleUpperCase(str)
> ``` javascript
> let text = 'I LOVE YOU';
> console.log(text.toLocaleLowerCase());//'i love you'
> text = 'i Love you';
> console.log(text.toLocaleUpperCase());//'I LOVE YOU'
> ```
> 说明：只有几种语言（如土耳其语）具有地方特有的大小写本地性，一般来说，是否本地化效果都是一致的。
7. String类型字符串模式匹配方法
> ### ⑱ match(pattern) -- 主要用于正则表达式方法
> match(pattern)方法主要用于匹配正则表达式，具体我们在正则表达式的章节再讲，讲一下match()方法的简单匹配
> ``` javascript
> let text = '迪丽热巴是不是美女';
> console.log(text.match('是'));
> alert(text.match('是'));//返回： '是'
> alert(text.match(','));//返回： null 没有找到返回null
> ```
> ### ⑲ search(pattern) -- 主要用于正则表达式方法
> search(pattern)方法主要用于匹配正则表达式，具体我们在正则表达式的章节再讲，讲一下search()方法的简单匹配
> ``` javascript
> // 跟indexOf()方法类似
> let text = '迪丽热巴是不是美女';
> console.log(text.search('是'));//返回：4 
> console.log(text.search(','));//返回： -1 没有找到返回 -1
> ``` 
> ### ⑳ replace(pattern, replacement) -- 用 replacement 替换 pattern 第一次出现的字符
> 第二个参数字符替换第一个参数字符一次
> ``` javascript
> let text = '迪丽热巴是不是美女';
> console.log(text.replace('是','确定'));// '迪丽热巴确定不是美女'
> ```
> ### ㉑ replaceAll(pattern, replacement) -- 用 replacement 替换 pattern 所有出现的字符
> 第二个参数字符替换第一个参数字符出现的所有字符
> ``` javascript
> let text = '迪丽热巴是不是美女';
> console.log(text.replaceAll('是','确定'));// '迪丽热巴确定不确定美女'
> ```
> ### ㉒ split(pattern) - 返回字符串按指定 pattern 拆分的数组
> ``` javascript
> let text = '迪丽热巴是不是美女';
> console.log(text.split('是'));// ['迪丽热巴', '不', '美女']
> //按照 '是'这个字符拆分成了数组
> ```
> ### ㉓ fromCharCode(ascii) - 静态方法，输出 Ascii 码对应值
> 参数里面放一个<a href="https://www.renrendoc.com/paper/189541273.html" target="_blank">Ascii 码</a> 
> ``` javascript
> //静态方法：类型.方法(参数)
> console.log(String.fromCharCode(77));//'M'
> ```
> ### ㉔ localeCompare(str1,str2) - 比较两个字符串，并返回相应的值
> ``` javascript
> let text = 'Reba';
> console.log(text.localeCompare('Reba'));//0  两个一样返回0
> console.log(text.localeCompare('Raba'));//1  字母相同往后比较，比较两个字母的前后顺序，前面的是1
> console.log(text.localeCompare('Peba'));//1  比较两个字母的前后顺序，前面的是1
> console.log(text.localeCompare('Seba'));//-1  比较两个字母的前后顺序，后面的是-1
> ```
8. 判断方法
> ### ㉕ startsWith(pattern) - 判断字符串是否按 pattern 开头，返回布尔值
> ``` javascript
> let text = '迪丽热巴是不是美女';
> console.log(text.startsWith('迪丽'));//true 判断是否以'迪丽'开头
> console.log(text.startsWith('热巴'));//false
> ```
> ### ㉖ endsWith(pattern) - 判断字符串是否按 pattern 结尾，返回布尔值
> ``` javascript
> let text = '迪丽热巴是不是美女';
> console.log(text.endsWith('美女'));//true 判断是否以'美女'结尾
> console.log(text.endsWith('热巴'));//false
> ```
> ### ㉗ includes(pattern) - 判断字符串是否包含pattern字符，返回布尔值
> ``` javascript
> let text = '迪丽热巴是不是美女';
> console.log(text.includes('美女'));//true 判断是否包含'美女'字符
> console.log(text.includes('明星'));//false
> ```
9. 去除空白（空格）方法
> ### ㉘ trimStart() - 去除字符串开头的空格，返回字符串
> ``` javascript
> let text = '  迪丽热巴是不是美女  ';
> console.log(text.trimStart());//  '迪丽热巴是不是美女  '
> ```
> ### ㉙ trimEnd() - 去除字符串结尾的空格，返回字符串
> ``` javascript
> let text = '  迪丽热巴是不是美女  ';
> console.log(text.trimEnd());//  '  迪丽热巴是不是美女'
> ```
> ### ㉚ trim() - 去除字符串开头和结尾的空格，返回字符串
> ``` javascript
> let text = '  迪丽热巴是不是美女  ';
> console.log(text.trim());//  '迪丽热巴是不是美女'
> ```
10. 其他方法
> ### ㉛ repeat(n) - 重复字符串n次，返回字符串
> ``` javascript
> let text = '迪丽热巴';
> console.log(text.repeat(3));//  '迪丽热巴迪丽热巴迪丽热巴'
> ```
> ### ㉜ 模板字面量（魔法字符串）
> ``` javascript
> let text = '迪丽热巴';
> let str = `你好，${text}`;
> console.log(str);//  '你好，迪丽热巴'
> ```
> 关于魔法字符串怎么敲出来，在 <a href="/secondless/w-a/javascript函数.html#_2-带参数的函数" target="_blank">章节5.javascript函数_1、函数声明_② 带参数的函数</a>提到过
#### 为了方便大家查阅，方法写在一起比较查看
> ``` javascript
> //属性
> let text = '迪丽热巴';
> console.log(text.length);// 4  返回字符串长度
> console.log(text.constructor);//String() { [native code] }  返回字符串构造方法
> 
> //通用方法
> text = '迪丽热巴';
> console.log(text.valueOf());//'迪丽热巴'  返回字符串的基本值，写不写都一样
> console.log(text.toLocaleString());//'迪丽热巴'  返回字符串的基本值，写不写都一样
> console.log(text.toString());//'迪丽热巴'  返回字符串的基本值，写不写都一样
> 
> //字符方法
> text = '迪丽热巴';
> console.log(text.charAt(0));// '迪'
> console.log(text.charAt(1));// '丽'
> console.log(text.charAt(2));// '热'
> console.log(text.charAt(3));// '巴'
> 
> text = '迪丽热巴s';
> console.log(text.charCodeAt(0));// 36842, 返回的是 '迪'字的acssii码
> console.log(text.charCodeAt(1));// 20029
> console.log(text.charCodeAt(2));// 28909
> console.log(text.charCodeAt(3));// 24052
> console.log(text.charCodeAt(4));// 115 , 返回的是 's'字符的acssii码
> 
> text = '迪丽热巴s';
> console.log(text[0]);//'迪'
> console.log(text[1]);//'丽'
> console.log(text[2]);//'热'
> console.log(text[3]);//'巴'
> console.log(text[4]);//'s'
> 
> //操作方法
> text = '迪丽热巴';
> console.log(text.concat('s','是美女','!'));//'迪丽热巴s是美女!'
> 
> text = '迪丽热巴s是美女';
> console.log(text.slice(1));    //'丽热巴s是美女'   从第1个位置全部取到
> console.log(text.slice(1,3));  //'丽热'           从第1个位置取到第3个位置
> console.log(text.slice(-2));   //'美女'   总长度8,8+(-2)=6,从第6个位置开始
> console.log(text.slice(3,-2)); //'巴s是'  总长度8,8+(-2)=6,就是(3,6) 从第3个位置取到第6个位置 
> console.log(text.slice(-3,-2));//'是'     总长度8,8+(-3)=5,8+(-2)=6,就是(5,6)从第5个位置取到第6个位置
> 
> text = '迪丽热巴s是美女';
> console.log(text.substring(1));  // '丽热巴s是美女'    从第1个位置全部取到
> console.log(text.substring(1,3));// '丽热'             从第1个位置取到第3个位置
> console.log(text.substring(-2)); // '迪丽热巴s是美女'  负数返回全部字符串
> console.log(text.substring(3,-2));// '迪丽热'  参数是负，直接返回0，就是(3,0),
>                                   // 如果第二个参数比第一个参数小，那么第二个参数提前，就是(0,3)
> 
> text = '迪丽热巴s是美女';
> console.log(text.substr(1));   // '丽热巴s是美女'   从第1个位置全部取到
> console.log(text.substr(1,3)); // '丽热巴'          从第1个位置开始，取3个
> console.log(text.substr(1,10));// '丽热巴s是美女'    从第1个位置开始，取10个，没那么多，取到末尾
> console.log(text.substr(-2));  // '美女'   总长度8,8+(-2)=6,从第6个位置开始
> console.log(text.substr(3,-2));// 空       第二个参数负，直接为0，就是(3,0),就是从第3个位置取0个字符，所以没有为空
> 
> //位置方法
> text = '迪丽热巴是不是美女';
> console.log(text.indexOf('是'));  //4  返回'美'的索引，索引从0开始，正向搜索'美'第一次出现的位置索引
> console.log(text.indexOf('是',5));//6  返回'美'的索引，索引从0开始，当前从索引5开始搜索'美'第一次出现的位置，就是索引6了
> console.log(text.indexOf(','));  // -1 找不到则返回 -1
> 
> text = '迪丽热巴是不是美女';
> console.log(text.lastIndexOf('是'));//6  返回搜索'美'的索引，索引从0开始，反向数第一个出现的位置索引
> console.log(text.lastIndexOf('是',5));//4  反向搜索，从索引5往前搜索，第一次出现'美'的位置是索引4
> console.log(text.lastIndexOf(','));// -1 找不到则返回 -1
> 
> //大小写转换方法
> text = 'I LOVE yOU';
> console.log(text.toLowerCase());// 'i love you'
> 
> text = 'nice to Meet you';
> console.log(text.toUpperCase());// 'NICE TO MEET YOU'
> 
> text = 'I LOVE YOU';
> console.log(text.toLocaleLowerCase());//'i love you'
> text = 'i Love you';
> console.log(text.toLocaleUpperCase());//'I LOVE YOU'
> 
> //字符串模式匹配方法
> text = '迪丽热巴是不是美女';
> console.log(text.match('是'));
> alert(text.match('是'));//返回： '是'
> alert(text.match(','));//返回： null 没有找到返回null
> 
> text = '迪丽热巴是不是美女';
> console.log(text.search('是'));//返回：4 
> console.log(text.search(','));//返回： -1 没有找到返回 -1
> 
> text = '迪丽热巴是不是美女';
> console.log(text.replace('是','确定'));// '迪丽热巴确定不是美女'
> 
> text = '迪丽热巴是不是美女';
> console.log(text.replaceAll('是','确定'));// '迪丽热巴确定不确定美女'
> 
> text = '迪丽热巴是不是美女';
> console.log(text.split('是'));// ['迪丽热巴', '不', '美女']  按照 '是'这个字符拆分成了数组
> 
> //静态方法：类型.方法(参数)-参数里面放一个Ascii 码
> console.log(String.fromCharCode(77));//'M'
> 
> text = 'Reba';
> console.log(text.localeCompare('Reba'));//0  两个一样返回0
> console.log(text.localeCompare('Raba'));//1  字母相同往后比较，比较两个字母的前后顺序，前面的是1
> console.log(text.localeCompare('Peba'));//1  比较两个字母的前后顺序，前面的是1
> console.log(text.localeCompare('Seba'));//-1  比较两个字母的前后顺序，后面的是-1
> 
> 
> //判断方法
> text = '迪丽热巴是不是美女';
> console.log(text.startsWith('迪丽'));//true 判断是否以'迪丽'开头
> console.log(text.startsWith('热巴'));//false
> console.log(text.endsWith('美女'));//true 判断是否以'美女'结尾
> console.log(text.endsWith('热巴'));//false
> console.log(text.includes('美女'));//true 判断是否包含'美女'字符
> console.log(text.includes('明星'));//false
> 
> //去除空白（空格）方法
> text = '  迪丽热巴是不是美女  ';
> console.log(text.trimStart());//  '迪丽热巴是不是美女  '
> console.log(text.trimEnd());  //  '  迪丽热巴是不是美女'
> console.log(text.trim());     //  '迪丽热巴是不是美女'
> 
> 
> //其他方法
> text = '迪丽热巴';
> console.log(text.repeat(3));//  '迪丽热巴迪丽热巴迪丽热巴'
> 
> text = '迪丽热巴';
> let str = `你好，${text}`;
> console.log(str);//  '你好，迪丽热巴'
> ```
## 4、Array数组的常用方法
> ### ① join()方法 -- 见章节7：数组
> 用不同的分隔符将数组分割成字符串 <a href="/secondless/w-a/javascript数组.html#_1-join-方法-用不同的分隔符将数组分割成字符串" target="_blank" title="点击打开">[详见：章节7：数组]</a> 
> ### ② push()方法 -- 见章节7：数组
> 向数组末尾添加元素，返回修改后数组的长度 <a href="/secondless/w-a/javascript数组.html#_2-push-方法-向数组末尾添加元素-返回修改后数组的长度" target="_blank" title="点击打开">[详见：章节7：数组]</a> 
> ### ③ pop()方法 -- 见章节7：数组
> 移除数组末尾元素，并返回移除的元素 <a href="/secondless/w-a/javascript数组.html#_3-pop-方法-移除数组末尾元素-并返回移除的元素" target="_blank" title="点击打开">[详见：章节7：数组]</a>
> ### ④ shift()方法 -- 见章节7：数组 
> 移除数组开头元素，并返回移除的元素 <a href="/secondless/w-a/javascript数组.html#_4-shift-方法-移除数组开头元素-并返回移除的元素" target="_blank" title="点击打开">[详见：章节7：数组]</a>
> ### ⑤ unshift()方法 -- 见章节7：数组
> 向数组开头添加元素，返回修改后数组的长度 <a href="/secondless/w-a/javascript数组.html#_5-unshift-方法-向数组开头添加元素-返回修改后数组的长度" target="_blank" title="点击打开">[详见：章节7：数组]</a>
> ### ⑥ reverse()方法 -- 见章节7：数组
> 反向排序，返回排序后的数组 <a href="/secondless/w-a/javascript数组.html#_6-reverse-方法-反向排序-返回排序后的数组" target="_blank" title="点击打开">[详见：章节7：数组]</a>
> ### ⑦ sort()方法 -- 见章节7：数组
> 从小到大排序，返回排序后的数组 <a href="/secondless/w-a/javascript数组.html#_7-sort-方法-从小到大排序-返回排序后的数组" target="_blank" title="点击打开">[详见：章节7：数组]</a>
> ### ⑧ concat()方法 -- 见章节7：数组
> 创建新数组，并添加新元素，原数组没有变化 <a href="/secondless/w-a/javascript数组.html#_8-concat-方法-创建新数组-并添加新元素-原数组没有变化" target="_blank" title="点击打开">[详见：章节7：数组]</a>
> ### ⑨ slice()方法 -- 见章节7：数组
> 指定数组部分元素组建新数组，原数组没有变化 <a href="/secondless/w-a/javascript数组.html#_9-slice-方法-指定数组部分元素组建新数组-原数组没有变化" target="_blank" title="点击打开">[详见：章节7：数组]</a>
> ### ⑩ splice()方法 -- 见章节7：数组
> 有删除、插入、替换数组元素的功能，原数组发生变化 <a href="/secondless/w-a/javascript数组.html#_10-splice-方法-有删除、插入、替换数组元素的功能-原数组发生变化" target="_blank" title="点击打开">[详见：章节7：数组]</a>
### ⑪ 数组includes（searchElement，fromIndex）方法 --  判断数组是否包含一个指定的元素，返回布尔值
> 第一个参数是要查找的元素值，必填。第二个参数是非必填，从该索引处开始查找你要查找的元素。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。
> ``` javascript
> let arr = [10,20,30,40,50];
> console.log(arr.includes(10)); //true
> console.log(arr.includes(10,0)); //true  从索引0往后查找，是否包含10这个元素
> console.log(arr.includes(10,1)); //false 从索引1往后查找，是否包含10这个元素
> //当第二个参数是负数的时候，则按升序从 array.length（数组长度） + fromIndex 的索引开始 搜索
> console.log(arr.includes(20,-1));//false 数组长度5+(-1)=4,相当于(20,4)
> console.log(arr.includes(20,-4));//true  数组长度5+(-4)=1,相当于(20,1)
> ```

### ⑫ 数组reduce()方法 -- 有求和、数组去重、求数组的最大值、扁平化数组的功能
> #### 1.求和
> 根据提示，我们可以看到reduce()方法括号里面第一个参数：callbackfn提示表示接收一个回调函数，函数里面的参数是：上一个值，当前值，当前值的下标（索引），数组，第二个参数给一个初始值(数值或者数组等你需要初始化的值)，第二个参数也可以省略，省略的话，就是数组中的第一个元素，然后回调函数需要返回一个值
> ``` javascript
> let arr = [1,2,3,4,5,6,7,8,9];
> arr.reduce(function(previousValue,currentValue,currentIndex,array){
>     console.log('上一个值：'+ previousValue);
>     console.log('当前值：'+ currentValue);
>     console.log('当前值下标：'+ currentIndex);
>     console.log('数组：'+ array);
>     //重点理解上一个值，可以理解成是return返回的一个 我们经过一系列操作之后返回的一个值
>     //return 10;
>     // return preValue + curValue;
> },0);
> //求和
> let res = arr.reduce(function(previousValue,currentValue,currentIndex,array){
>     return previousValue + currentValue;
> },0);
> console.log(res);//45
> //箭头函数改写，用不上的参数可以不写
> let $res = arr.reduce((previousValue,currentValue)=>{
>     return previousValue + currentValue;
> },0);
> console.log($res);//45
> //箭头函数一行代码的可以省略花括号和return，直接返回
> //let _res = arr.reduce((preValue,curValue) => (preValue + curValue),0);
> let _res = arr.reduce((preValue,curValue) => preValue + curValue);
> console.log(_res);//45
> ```
> 涉及基础知识：
> 1.变量声明，详见：<a href="/secondless/w-a/javascript基础.html#_3、语法构成" target="_blank">章节2.javascript基础_3、语法构成_标识符</a>
> #### 2.数组去重
> ``` javascript
> let arr = [1,2,3,4,5,6,7,8,9,1,2.3,4,5];
> let res = arr.reduce(function(previousValue,currentValue){
>     if(!previousValue.includes(currentValue)){
>         previousValue.push(currentValue);
>     }
>     return previousValue;
> },[]);
> console.log(res);// [1, 2, 3, 4, 5, 6, 7, 8, 9, 2.3]
> 
> //改成箭头函数
> let arr = [1,2,3,4,5,6,7,8,9,1,2.3,4,5];
> let res = arr.reduce((previousValue,currentValue)=>{
>     !previousValue.includes(currentValue) && previousValue.push(currentValue);
>     return previousValue;
> },[]);
> console.log(res);// [1, 2, 3, 4, 5, 6, 7, 8, 9, 2.3]
> ```
> 涉及基础知识：<br/> 
> 1. 用到 && 符号，详见：<a href="/secondless/w-a/javascript运算符.html#_5、逻辑运算符" target="_blank">章节3.javascript运算符_5、逻辑运算符_① 逻辑与(and) ：&& [并且的意思]_第2小点</a>
> #### 3.求数组的最大值
> ``` javascript
> let arr = [1,2,3,4,5,6,7,8,9];
> let res =  arr.reduce(function(previousValue,currentValue){
>     let i = 0;
>     if(previousValue > currentValue){
>         i = previousValue;
>     }else{
>         i = currentValue;
>     }
>     return i;
> });
> console.log(res);//9
> 
> //改写成箭头函数、三元运算
> let res =  arr.reduce((previousValue,currentValue)=>{
>     // let i = 0;
>     // i = (previousValue > currentValue) ? previousValue : currentValue;
>     // return i;
>     return previousValue > currentValue ?  previousValue : currentValue;
> });
> console.log(res);//9
> ```
> 涉及基础知识：<br/> 
> 1. 用到三元运算，详见：<a href="/secondless/w-a/javascript运算符.html#_3-三元条件运算符" target="_blank">章节3.javascript运算符_6、字符串、逗号、三元条件运算符_③ 三元条件运算符</a>
> #### 4.扁平化数组
> ``` javascript
> //将二维数组转成一维数组
> let arr = [[1,2],[3,4],[5,6],[7,8],[9,10]];
> let res = arr.reduce((previousValue,currentValue)=>{
>     //解构用法
>     return [...previousValue,...currentValue];
> });
> console.log(res);//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
> ```
### ⑬ 数组find()方法 -- 为数组中的每个元素都调用一次函数执行,返回通过测试（函数内判断）的数组的第一个元素的值
> 当数组中的元素在测试条件返回 true 时, 返回符合条件的元素，之后的值不会再调用执行函数。如果没有符合条件的元素返回 undefined，对于空数组，函数是不会执行的，find()方法并没有改变数组的原始值。
> ``` javascript
> //深入分析一下这个方法
> //array.find(function(currentValue, index, arr), thisValue)
> //第一个参数：函数，必填。第二个参数：可选。 传递给函数的值一般用 "this" 值。如果这个参数为空， "undefined" 会传递给 "this" 值
> //重点看第一个参数：函数里面的参数：currentValue：必填，当前数组元素。index，可选，当前元素的索引。arr：可选。当前元素所属的数组对象
> let arr = [3, 10, 19, 20, 35, 50,15,18 ];
> arr.find(function(currentValue, index, arr){
>     console.log('当前数组元素:' + currentValue);
>     console.log('当前数组元素索引:' + index);
>     console.log('当前元素所属的数组对象:' + arr);
> });
> 
> 
> //获取数组中年龄大于 18 的第一个元素
> let _arr = arr.find(function(age){
>     return age > 18;
>  });
> console.log(_arr);//19
> 
> //分离写法
> function text(age){
>     return age > 18;
> }
> let new_arr = arr.find(text);
> console.log(new_arr);//19
> 
> //箭头函数写法
> let $arr = arr.find((age)=>{
>     return age > 18;
> });
> console.log($arr);//19
> //箭头函数简写，参数只有一个的可以不写括号，然后代码只有一行的，省略大括号和return
> let $arr1 = arr.find(age => age > 18);
> console.log($arr1);//19
> 
> 
> //没有符合条件的元素返回 undefined
> console.log(arr.find(age=> age > 50));//undefined
> 
> //对于空数组，函数是不会执行的
> console.log([].find(age=> age > 50));//undefined
> 
> //原数组没有变化
> console.log(arr);//[3, 10, 19, 20, 35, 50,15,18 ]
>
> ```

### ⑭ 数组findIndex()方法 -- 为数组中的每个元素都调用一次函数执行,返回传入一个测试条件（函数）符合条件的数组第一个元素位置
> 当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。如果没有符合条件的元素返回 -1。findIndex() 对于空数组，函数是不会执行的。findIndex() 并没有改变数组的原始值。
> ``` javascript
> //深入分析一下这个方法
> //array.findIndex(function(currentValue, index, arr), thisValue)
> //第一个参数：函数，必填。第二个参数：可选。 传递给函数的值一般用 "this" 值。如果这个参数为空， "undefined" 会传递给 "this" 值
> //重点看第一个参数：函数里面的参数：currentValue：必填，当前数组元素。index，可选，当前元素的索引。arr：可选。当前元素所属的数组对象
> let arr = [3, 10, 19, 20, 35, 50,15,18 ];
> arr.findIndex(function(currentValue, index, arr){
>     console.log('当前数组元素:' + currentValue);
>     console.log('当前数组元素索引:' + index);
>     console.log('当前元素所属的数组对象:' + arr);
> },this);
> //获取数组中年龄大于 18 的第一个元素索引位置
> let _arr = arr.findIndex(function(age){
>     return age > 18;
> });
> console.log(_arr);//2 19对应的索引下标是2
> 
> //分离写法
> function text(age){
>     return age > 18;
> }
> let new_arr = arr.findIndex(text);
> console.log(new_arr);//2  
> 
> 
>  //箭头函数写法
> let $arr = arr.findIndex((age)=>{
>     return age > 18;
> });
> console.log($arr);//2
> //箭头函数简写，参数只有一个的可以不写括号，然后代码只有一行的，省略大括号和return
> let $arr1 = arr.findIndex(age => age > 18);
> console.log($arr1);//2
> 
> //没有符合条件的元素返回 -1
> let $arr2 = arr.findIndex(age => age > 50);
> console.log($arr2);//-1
> 
> //对于空数组，函数是不会执行的 返回 -1
> let $arr3 = [].findIndex(age => age > 50);
> console.log($arr3);//-1
> 
> //原数组没有变化
> console.log(arr);//[3, 10, 19, 20, 35, 50,15,18 ]
> ```

### ⑮ 数组filter() 方法 -- 为数组中的每个元素都调用一次函数执行, 创建一个新的数组，返回传入一个测试条件（函数）符合条件的数组的所有元素
> 当数组中的元素在测试条件时返回 true 时, 放入新的数组中，如果没有符合条件的元素则返回空数组。filter()方法对于空数组，函数是不会执行的。filter()方法并没有改变数组的原始值。
> ``` javascript
> //深入分析一下这个方法
> //array.filter(function(currentValue, index, arr), thisValue)
> //第一个参数：函数，必填。第二个参数：可选。 传递给函数的值一般用 "this" 值。如果这个参数为空， "undefined" 会传递给 "this" 值
> //重点看第一个参数：函数里面的参数：currentValue：必填，当前数组元素。index，可选，当前元素的索引。arr：可选。当前元素所属的数组对象
> let arr = [3, 10, 19, 20, 35, 50,15,18 ];
> arr.filter(function(currentValue, index, arr){
>     console.log('当前数组元素:' + currentValue);
>     console.log('当前数组元素索引:' + index);
>     console.log('当前元素所属的数组对象:' + arr);
> },this);
> //获取数组中年龄大于 18 的所有元素放入到新数组中
> let _arr = arr.filter(function(age){
>     return age > 18;
> });
> console.log(_arr);//[19, 20, 35, 50]
> 
> //分离写法
> function text(age){
>     return age > 18;
> }
> let new_arr = arr.filter(text);
> console.log(new_arr);//[19, 20, 35, 50]
> 
> //箭头函数写法
> let $arr = arr.filter((age)=>{
>     return age > 18;
> });
> console.log($arr);//[19, 20, 35, 50]
> //箭头函数简写，参数只有一个的可以不写括号，然后代码只有一行的，省略大括号和return
> let $arr1 = arr.filter(age => age > 18);
> console.log($arr1);//[19, 20, 35, 50]
> 
> //没有符合条件的元素返回 []
> let $arr2 = arr.filter(age => age > 50);
> console.log($arr2);//[]
> 
> //对于空数组，filter()方法是不会执行的 []
> let $arr3 = [].filter(age =>age > 18);
> console.log($arr3);//[]
> 
> //原数组没有变化
> console.log(arr);//[3, 10, 19, 20, 35, 50, 15, 18]
> ```
> 我们在讲对象的时候，<a href="/secondless/w-a/javascript对象.html#_2-对象的应用" target="_blank">章节6.javascript对象_3、对象中的方法及应用_② 对象的应用</a> 我们可以把我们的网站导航栏每一项看成一个对象。我们把这些对象放进数组里面去。
> ``` javascript
> let menus = [
>     { name:'网站首页',en_name:'home',href:'index.html',type:'public' },
>     { name:'关于我们',en_name:'about',href:'about.html' ,type:'public' },
>     { name:'工程案例',en_name:'case',href:'case.html' ,type:'public' },
>     { name:'会员中心',en_name:'user',href:'user.html' ,type:'private' },
>     { name:'后台管理',en_name:'admin',href:'admin.html',type:'private' }
> ];
> //问题：会员中心和后台管理不应该放在栏目中，请将数组中的前三个对象放在新数组中
> let _menus = menus.filter((currentValue, index, arr)=>{
>     // console.log('当前数组元素:' + JSON.stringify(currentValue));
>     // console.log('当前数组元素索引:' + index);
>     // console.log('当前元素所属的数组对象:' + arr);
>     // console.log(currentValue.name);
>     //console.log(currentValue.type);
> 
>     // if(currentValue.type === 'public'){
>     //     return true;
>     // }else{
>     //     return false;
>     // }
> 
>     console.log(currentValue.type === 'public');
>     return currentValue.type == 'public';
> });
> console.log(_menus);
> 
> //简写
> let $menus = menus.filter(item => item.type == 'public');
> console.log($menus);
> ```

### ⑯ 数组map() 方法 -- 为数组中的每个元素都调用一次函数执行, 创建一个新的数组，返回原始数组元素调用函数处理后的值
> 此方法在数组映射方面用得比较多，map() 方法按照原始数组元素顺序依次处理元素， map() 不会对空数组进行检测，原数组根据处理情况会发生变化。
> ``` javascript
> //深入分析一下这个方法
> //array.map(function(currentValue, index, arr), thisValue)
> //第一个参数：函数，必填。第二个参数：可选。 传递给函数的值一般用 "this" 值。如果这个参数为空， "undefined" 会传递给 "this" 值
> //重点看第一个参数：函数里面的参数：currentValue：必填，当前数组元素。index，可选，当前元素的索引。arr：可选。当前元素所属的数组对象
> // let arr = [3, 10, 19, 20, 35, 50,15,18 ];
> // arr.map(function(currentValue, index, arr){
> //     console.log('当前数组元素:' + currentValue);
> //     console.log('当前数组元素索引:' + index);
> //     console.log('当前元素所属的数组对象:' + arr);
> // },this);
> 
> let menus = [
>     { name:'网站首页',en_name:'home',href:'index.html',type:'public' },
>     { name:'关于我们',en_name:'about',href:'about.html' ,type:'public' },
>     { name:'工程案例',en_name:'case',href:'case.html' ,type:'public' },
>     { name:'会员中心',en_name:'user',href:'user.html' ,type:'private' },
>     { name:'后台管理',en_name:'admin',href:'admin.html',type:'private' }
> ];
> menus.map(function(currentValue, index, arr){
>     // console.log('当前数组对象元素:' + currentValue);
>     // console.log('当前数组对象元素字符串:' + JSON.stringify(currentValue));
>     // console.log('当前数组对象元素索引:' + index);
>     // console.log('当前元素所属的数组对象:' + arr);
> },this);
> 
> //映射
> let $_menus = menus.map(item =>{
>     return {
>         menu_name:item.name,
>         href:item.href
>     }
> });
> console.log($_menus);
> //此时原数组没有变化
> console.log(menus);
> 
> 
> //要求给数组里面的每个元素，加一个属性site值是http://docs.51yrc.com
> let _menus = menus.map(function(currentValue, index, arr){
>     currentValue.site = 'http://docs.51yrc.com';
>     //console.log(JSON.stringify(currentValue));
>     return currentValue;
>     //下面的写法仅仅返回每个元素对象里面site属性的值，我们需要返回每个对象
>     //return currentValue.site = 'http://docs.51yrc.com';
> });
> console.log(_menus);
> 
> let $menus = menus.map(item => {
>     item.site = 'http://docs.51yrc.com';
>     return item;
> });
> console.log($menus);
> 
> //对于空数组，map()方法是不会执行的 
> let $menus1 = [].map(item => {
>     item.site = 'http://docs.51yrc.com';
>     return item;
> });
> console.log($menus1);//返回空数组
> 
> //原数组根据处理情况发生了变化
> console.log(menus);
> ```

### ⑰ 数组forEach() 方法 -- 为数组中的每个元素都调用一次函数执行，并将元素传递给回调函数，没有返回值
> forEach()方法按照原始数组元素顺序依次处理元素， forEach()方法不会对空数组进行检测，根据处理的情况，会对原数组产生影响
> ``` javascript
> //深入分析一下这个方法
> //array.forEach(function(currentValue, index, arr), thisValue)
> //第一个参数：函数，必填。第二个参数：可选。 传递给函数的值一般用 "this" 值。如果这个参数为空， "undefined" 会传递给 "this" 值
> //重点看第一个参数：函数里面的参数：currentValue：必填，当前数组元素。index，可选，当前元素的索引。arr：可选。当前元素所属的数组对象
> let arr = [3, 10, 19, 20, 35, 50,15,18 ];
> // arr.forEach(function(currentValue, index, arr){
> //     console.log('当前数组元素:' + currentValue);
> //     console.log('当前数组元素索引:' + index);
> //     console.log('当前元素所属的数组对象:' + arr);
> // },this);
> 
> let menus = [
>     { name:'网站首页',en_name:'home',href:'index.html',type:'public' },
>     { name:'关于我们',en_name:'about',href:'about.html' ,type:'public' },
>     { name:'工程案例',en_name:'case',href:'case.html' ,type:'public' },
>     { name:'会员中心',en_name:'user',href:'user.html' ,type:'private' },
>     { name:'后台管理',en_name:'admin',href:'admin.html',type:'private' }
> ];
> menus.forEach(function(currentValue, index, arr){
>     console.log('当前数组对象元素:' + currentValue);
>     console.log('当前数组对象元素字符串:' + JSON.stringify(currentValue));
>     console.log('当前数组对象元素索引:' + index);
>     console.log('当前元素所属的数组对象:' + arr);
> },this);
> 
> //没有返回值，在回调函数(匿名函数)里面处理
> let _menus = menus.forEach(function(currentValue, index, arr){
>     currentValue.site = 'http://docs.51yrc.com';
>     return currentValue;
> });
> console.log(_menus);//undefined
> 
> //根据处理的情况，会对原数组产生影响
> menus.forEach(function(currentValue, index, arr){
>     currentValue.site = 'http://docs.51yrc.com';
> });
> console.log(menus);
> 
> 
> //简写
> menus.forEach(item=>item.site = 'http://docs.51yrc.com');
> console.log(menus);
> 
> //对于空数组是不会执行回调函数的
> let arr_empty = [];
> arr_empty.forEach(item=>item.site = 'http://docs.51yrc.com');
> console.log(arr_empty);//返回：[]
> ```

### ⑱ 数组indexOf() 方法 -- 返回数组中某个指定的元素位置，从头到尾查找数组元素
> 方法将从头到尾地检索数组，看它是否含有对应的元素,如果在数组中没找到指定元素则返回 -1。
> ``` javascript
> let text = ['迪丽热巴','古力娜扎',35,'华仔','梁咏琪',888,'梁咏琪'];
> console.log(text.indexOf('梁咏琪'));  //4  返回元素'梁咏琪'的索引，索引从0开始，正向搜索'梁咏琪'第一次出现的位置索引
> console.log(text.indexOf('梁咏琪',5));//6  返回元素'梁咏琪'的索引，索引从0开始，当前从索引5开始搜索'梁咏琪'第一次出现的位置，就是索引6了
> console.log(text.indexOf(','));  // -1 找不到则返回 -1
> ```
### ⑲  数组lastIndexOf() 方法 -- 返回一个指定的元素在数组中最后出现的位置，从后面向前查找数组元素
> 方法将从后面向前检索数组，看它是否含有对应的元素,如果在数组中没找到指定元素则返回 -1。
> ``` javascript
> let text = ['迪丽热巴','古力娜扎',35,'华仔','梁咏琪',888,'梁咏琪'];
> console.log(text.lastIndexOf('梁咏琪'));  //6  返回元素'梁咏琪'的索引，索引从0开始，反向搜索'梁咏琪'第一次出现的位置索引
> console.log(text.lastIndexOf('梁咏琪',5));//4  返回元素'梁咏琪'的索引，索引从0开始，当前从索引5往前（左边）搜索'梁咏琪'第一次出现的位置，就是索引4了
> console.log(text.lastIndexOf(','));  // -1 找不到则返回 -1
> ```
### ⑳ 数组at() 方法 -- 接收一个整数值并返回该索引对应的数组元素
> 允许正数和负数。负整数从数组中的最后一个元素开始倒数,如果找不到指定的索引，则返回 undefined。可以类比字符串的charAt()方法。
> ``` javascript
> let text = ['迪丽热巴','古力娜扎',35,'华仔','梁咏琪',888,'梁咏琪'];
> console.log(text.at(0));//'迪丽热巴'
> console.log(text.at(4));//'梁咏琪'
> console.log(text[0]);//'迪丽热巴'
> console.log(text[4]);//'梁咏琪'
> console.log(text.at(-4));//'华仔'  总长度7+(-4)=3,相当于text.at(3)
> console.log(text[-4]);//undefined
> console.log(text.at(8));//undefined 超出了索引范围，找不到返回undefined
> ```
### ㉑ 数组fill() 方法 -- 用于将一个固定值替换数组的元素，返回原数组，原数组会发生变化
> ``` javascript
> let text = ['迪丽热巴','古力娜扎',35,'华仔','梁咏琪',888,'梁咏琪'];
> //console.log(text.fill(520));//[520, 520, 520, 520, 520, 520, 520] 
> //console.log(text);//数组已被改变
> //语法：array.fill(value, start, end)
> //value:必需,填充的值 start:可选,开始填充位置。 end:可选。停止填充位置 (默认为 array.length数组长度)
> //console.log(text.fill(520,2));//['迪丽热巴', '古力娜扎', 520, 520, 520, 520, 520]
> //console.log(text.fill(520,2,4));//['迪丽热巴', '古力娜扎', 520, 520, '梁咏琪', 888, '梁咏琪']
> ```
### ㉒ 数组copyWithin() 方法 -- 将指定位置的元素复制到其他位置，返回原数组，原数组会发生变化
> ``` javascript
> let text = ['迪丽热巴','古力娜扎',35,'华仔','梁咏琪',888,'梁咏琪'];
> //语法：array.copyWithin(target, start, end)
> //target:必填，从该位置开始替换数据 
> //start （可选）：从该位置开始读取数据，默认为 0 。如果为负值，表示倒数。
> //end （可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
> //这三个参数都应该是数值，如果不是，会自动转为数值
> //console.log(text.copyWithin(0));//['迪丽热巴', '古力娜扎', 35, '华仔', '梁咏琪', 888, '梁咏琪']
> //相当于text.copyWithin(1,0,7);
> //console.log(text.copyWithin(1));//['迪丽热巴', '迪丽热巴', '古力娜扎', 35, '华仔', '梁咏琪', 888]
> //console.log(text.copyWithin(0,6));// ['梁咏琪', '古力娜扎', 35, '华仔', '梁咏琪', 888, '梁咏琪']
> //console.log(text.copyWithin(0,3,4));// ['华仔', '古力娜扎', 35, '华仔', '梁咏琪', 888, '梁咏琪']
> //-3相当于7+（-3）= 4，-1相当于7+（-1）=6 即：text.copyWithin(0,4,6)
> //console.log(text.copyWithin(0,-3,-1));// ['梁咏琪', 888, 35, '华仔', '梁咏琪', 888, '梁咏琪']
> //console.log(text.copyWithin(0,4,7));// ['梁咏琪', 888, '梁咏琪', '华仔', '梁咏琪', 888, '梁咏琪']
> ```
> 

###  ㉓ 数组isArray() 方法 -- 静态方法，判断一个对象是否为数组
> 如果对象是数组返回 true，否则返回 false。前面我们提到判断变量属性：<a href="/secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html#_6-检测变量类型-typeof-、instanceof" target="_blank">章节10_3、变量_⑥ 检测变量类型：typeof()、instanceof()</a>
> ``` javascript
> //是否是数组
> let text1 = [1,2,3];
> console.log(text1 instanceof Array); //返回： true
> console.log(Array.isArray(text1));//返回： true
> ```

### ㉔ 合并数组：es6的扩展运算符
> ``` javascript
> let arr1 = [1,2,3];
> let arr2 = ['迪丽热巴', '古力娜扎', 35];
> console.log(arr1.concat(arr2));//[1, 2, 3, '迪丽热巴', '古力娜扎', 35]
> console.log([...arr1,...arr2]);//[1, 2, 3, '迪丽热巴', '古力娜扎', 35]
> ```

###  ㉕ 数组every() 方法 --检测数组所有元素是否全部符合指定条件（通过函数提供），返回布尔值
> every() 方法使用指定函数检测数组中的所有元素:如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测，如果所有元素都满足条件，则返回 true。every() 不会对空数组进行检测。every() 不会改变原始数组。
> ``` javascript
> //every的语法
> //array.every(function(currentValue, index, arr), thisValue)
> //第一个参数：函数，必填。第二个参数：可选。 传递给函数的值一般用 "this" 值。如果这个参数为空， "undefined" 会传递给 "this" 值
> //重点看第一个参数：函数里面的参数：currentValue：必填，当前数组元素。index，可选，当前元素的索引。arr：可选。当前元素所属的数组对象
> let arr = [30, 20, 17, 19, 20, 35, 50,15,18 ];
> arr.every(function(currentValue, index, arr){
>     console.log('当前数组元素:' + currentValue);
>     console.log('当前数组元素索引:' + index);
>     console.log('当前元素所属的数组对象:' + arr);
> },this);
> 
> //检查数组中所有年龄是不是都大于18岁
> let $arr = arr.every((currentValue)=>{
>     //console.log('当前数组元素:' + currentValue);
>     return currentValue > 18;
> });
> console.log($arr);//false
> 
> 
> let $arr1 = arr.every((currentValue)=>{
>     //console.log('当前数组元素:' + currentValue);
>     return currentValue > 1;
> });
> console.log($arr1);//true
> 
> //简写
> let $arr2 = arr.every(age=>age > 1);
> console.log($arr2);//true
> 
> //不会对空数组进行检测
> let $arr3 = [].every(age=>age > 1);
> console.log($arr3);//true
> 
> //原数组不变
> console.log(arr);//[30, 20, 17, 19, 20, 35, 50, 15, 18]
> ```

###  ㉖ 数组some() 方法 -- 检测数组所有元素，只要有一个元素通过函数检测返回真，那么就返回真，且后面的元素不在检测,否则返回 假。
> some()方法对数组中存在的每个元素执行一次函数,如果找到函数返回真值的数组元素,返回真（并且不检查剩余值）,否则返回 false。对空数组元素不执行函数。不改变原始数组。
> ``` javascript
> //some()方法的语法
> //array.some(function(currentValue, index, arr), thisValue)
> //第一个参数：函数，必填。第二个参数：可选。 传递给函数的值一般用 "this" 值。如果这个参数为空， "undefined" 会传递给 "this" 值
> //重点看第一个参数：函数里面的参数：currentValue：必填，当前数组元素。index，可选，当前元素的索引。arr：可选。当前元素所属的数组对象
> let arr = [30, 20, 17, 19, 20, 35, 50,15,18 ];
> arr.some(function(currentValue, index, arr){
>     console.log('当前数组元素:' + currentValue);
>     console.log('当前数组元素索引:' + index);
>     console.log('当前元素所属的数组对象:' + arr);
> },this);
> 
> //检查数组中所有年龄有没有大于18岁的
> let $arr = arr.some((currentValue)=>{
>     //console.log('当前数组元素:' + currentValue);
>     return currentValue > 18;
> });
> console.log($arr);//true
> 
> 
> let $arr1 = arr.some((currentValue)=>{
>     //console.log('当前数组元素:' + currentValue);
>     return currentValue > 1;
> });
> console.log($arr1);//true
> 
> //简写
> let $arr2 = arr.some(age=>age > 1);
> console.log($arr2);//true
> 
> //不会对空数组进行检测
> let $arr3 = [].some(age=>age > 1);
> console.log($arr3);//false
> 
> //原数组不变
> console.log(arr);//[30, 20, 17, 19, 20, 35, 50, 15, 18]
> ```
###  ㉗ 数组 for...of遍历
> ``` javascript
> //普通数组
> let arr = [3, 10, 19, 20, 35, 50,15,18 ];
> for(let x of arr){
>     console.log(x);//返回数组中的每个元素
> }
> //对象数组
> let menus = [
>     { name:'网站首页',en_name:'home',href:'index.html',type:'public' },
>     { name:'关于我们',en_name:'about',href:'about.html' ,type:'public' },
>     { name:'工程案例',en_name:'case',href:'case.html' ,type:'public' },
>     { name:'会员中心',en_name:'user',href:'user.html' ,type:'private' },
>     { name:'后台管理',en_name:'admin',href:'admin.html',type:'private' }
> ];
> for(let y of menus){
>     console.log(y);//返回数组中的每个元素
> }
> //希望如下格式
> /*
> 索引: 0 ----3
> 索引: 1 ----10
> ...
> 索引: 7 ----18
> */
> for(let i=0;i<arr.length;i++){
>    console.log('索引: '+ i + '----' + arr[i]);
> }
> console.log(i);
> 
> 
> for(let j=0;j<menus.length;j++){
>     console.log('索引: '+ j + '----' + menus[j]);
> }
> 
> //还有没有其他的方法？
> ```

###  ㉘ 数组keys()，数组values()，数组entries()方法 -- 用于遍历数组，都返回一个遍历器对象。
> 它们都返回一个遍历器对象，可以用for…of循环进行遍历，区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历.
> ``` javascript
> let arr = [3, 10, 19, 20, 35, 50,15,18 ];
> console.log(arr.keys());//Array Iterator {} 数组迭代器（遍历器）对象
> console.log(arr.values());//Array Iterator {} 数组迭代器（遍历器）对象
> console.log(arr.entries());//Array Iterator {} 数组迭代器（遍历器）对象
> //对应迭代器，我们使用 for...of循环进行遍历
> for (let index of arr.keys()) {
>     console.log('数组的索引：' +  index);//循环输出数组的索引：0到7
> }
> for (let value of arr.values()) {
>     console.log('数组的元素：' + value);//循环输出数组的每个元素
> }
> /*
> 索引：0----3
> 索引：1----10
> ....
> 索引：7----18
> */
> for (let [index, value] of arr.entries()) {
>     console.log('索引：' + index + '----' + value);
> }
> //如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历
> let _entries = arr.entries();
> //console.log(_entries.next().value); // [0, 3]
> //console.log(_entries.next().value); // [1, 10]
> 
> let [index, value] = _entries.next().value;
> console.log('索引：' + index + '----' + value);
> let [index1, value1] = _entries.next().value;
> console.log('索引：' + index1 + '----' + value1);
> ```

###  ㉙ 数组reduceRight() 方法-- 和reduce方法刚好相反，reduce可以看成是数组元素（从左到右）依次处理，reduceRight是（从右往左处理）
> ``` javascript
> let arr = [1,2,3,4,5,6,7,8,9];
> arr.reduce(function(previousValue,currentValue,currentIndex,array){
>     //重点理解上一个值，可以理解成是return返回的一个 我们经过一系列操作之后返回的一个值
>     console.log('reduce上一个值经过一系列操作之后返回的一个值：'+ previousValue);
>     console.log('reduce当前值：'+ currentValue);
>     console.log('reduce当前值下标：'+ currentIndex);
>     console.log('reduce数组：'+ array);
>     //return 10;
> },0);
> arr.reduceRight(function(previousValue,currentValue,currentIndex,array){
>     //重点理解上一个值，可以理解成是return返回的一个 我们经过一系列操作之后返回的一个值
>     console.log('reduceRight上一个值经过一系列操作之后返回的一个值：'+ previousValue);
>     console.log('reduceRight当前值：'+ currentValue);
>     console.log('reduceRight当前值下标：'+ currentIndex);
>     console.log('reduceRight数组：'+ array);
>     //return 10;
> },0);
> 
> //求和
> let $res = arr.reduceRight((previousValue,currentValue)=>{
>     return previousValue + currentValue;
> },0);
> console.log($res);//45
> 
> //数组去重不合适了（返回的结果跟原数组比，元素排序相反，结果也有问题）
> let arr1 = [1,2,3,4,5,6,7,8,9,1,2.3,4,5];
> let $res1 = arr1.reduceRight((previousValue,currentValue)=>{
>     !previousValue.includes(currentValue) && previousValue.push(currentValue);
>     return previousValue;
> },[]);
> console.log($res1);//[5, 4, 2.3, 1, 9, 8, 7, 6, 3, 2]
> 
> //求数组的最大值
> let arr2 = [1,2,3,4,5,6,7,8,9];
> let $res2 =  arr.reduceRight((previousValue,currentValue)=>{
>     // let i = 0;
>     // i = (previousValue > currentValue) ? previousValue : currentValue;
>     // return i;
>     return previousValue > currentValue ?  previousValue : currentValue;
> });
> console.log($res2);//9
> 
> //扁平化数组（不合适）
> //将二维数组转成一维数组
> let arr3 = [[1,2],[3,4],[5,6],[7,8],[9,10]];
> let $res3 = arr3.reduceRight((previousValue,currentValue)=>{
>     //解构用法
>     return [...previousValue,...currentValue];
> });
> console.log($res3);//[9, 10, 7, 8, 5, 6, 3, 4, 1, 2]
> ```


###  ㉚ 数组flat() 方法 --按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回（将多维数组解构成一维数组）
> 返回一个包含将数组与子数组中所有元素的新数组
> ``` javascript
> //语法
> //array.flat()
> //array.flat(depth) 指定要提取嵌套数组的结构深度，默认值为 1
> 
> let arr1 = [1, 2, [3, 4]];
> console.log(arr1.flat()); // [1, 2, 3, 4]
> 
> let arr2 = [1, 2, [3, 4, [5, 6]]];
> console.log(arr2.flat());// [1, 2, 3, 4, [5, 6]]
> 
> let arr3 = [1, 2, [3, 4, [5, 6]]];
> console.log(arr3.flat(2));// [1, 2, 3, 4, 5, 6]
> 
> //使用 Infinity，可展开任意深度的嵌套数组
> let arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
> console.log(arr4.flat(Infinity));// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
> //所以我们上面的reduce用法扁平化数组，也可以这么写
> let arr5 = [[1,2],[3,4],[5,6],[7,8],[9,10]];
> console.log(arr5.flat(Infinity));// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
> 
> //flat() 方法会移除数组中的空项：
> let arr6 = [1, 2, , 4, 5];
> console.log(arr6.flat());// [1, 2, 4, 5]
> ```


###  ㉛数组flatMap() 方法 --首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。创建一个新的数组，其中每个元素都是回调函数的结果，结构深度（depth）为 1 只有一层深度。
> 它与 map 连着深度值为 1 的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。
> ``` javascript
> //flatMap() 方法的语法：
> //flatMap(function(currentValue, index, array),thisArg)
> //currentValue:当前正在数组中处理的元素,index:可选的。数组中正在处理的当前元素的索引。array:可选的。被调用的数组.
> //thisArg:可选的。执行 callback 函数时 使用的this 值
> let arr = [3, 10, 19, 20, 35, 50,15,18 ];
> arr.flatMap(function(currentValue, index, arr){
>     console.log('当前数组元素:' + currentValue);
>     console.log('当前数组元素索引:' + index);
>     console.log('当前元素所属的数组对象:' + arr);
> });
> 
> //它与 map 连着深度值为 1 的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些
> let arr1 = [1, 2, 3, 4];
> //要求返回结果：[[2], [4], [6], [8]]
> //map()方法怎么写：
> // let arr1_map = arr1.map((currentValue, index, arr)=>{
> //     return [currentValue * 2];
> // });
> // console.log(arr1_map);//[[2], [4], [6], [8]]
> let $arr1_map = arr1.map(a=>[a*2]);
> console.log($arr1_map);//[[2], [4], [6], [8]]
> 
> //flatMap()怎么写呢？
> let $arr1_flatmap = arr1.flatMap(a=>[a*2]);
> console.log($arr1_flatmap);//[2, 4, 6, 8]
> 
> let $arr1_flatmap1 = arr1.flatMap(a=>[[a*2]]);
> console.log($arr1_flatmap1);//[[2], [4], [6], [8]]
> 
> //虽然上面的代码使用 map 和 flatMap 好像都可以, 现在看一下区别
> let arr2 = ['I LOVE YOU', '', 'china'];
> //将上面数组拆分成单个词组成的新数组
> // let arr2_map = arr2.map((currentValue, index, arr)=>{
> //     return currentValue.split(' ');
> // });
> // console.log(arr2_map);// [['I', 'LOVE', 'YOU'],[''],['china']] 
> let $arr2_map = arr2.map(a=>a.split(' '));
> console.log($arr2_map);// [['I', 'LOVE', 'YOU'],[''],['china']] 
> 
> let $arr2_flatmap = arr2.flatMap(a=>a.split(' '));
> console.log($arr2_flatmap);//['I', 'LOVE', 'YOU', '', 'china']
> 
> let $arr3_flatmap = arr2.flatMap(a=>[a.split(' ')]);
> console.log($arr3_flatmap);//[['I', 'LOVE', 'YOU'],[''],['china']] 
> ```
>
>  <span style="display:none;">㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵ ㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿</span>
>
###  ㉜ 数组from()方法 -- 静态方法，将一个类数组对象转为数组
> 类数组对象就是类似于数组的对象，如我们之前学习的arguments对象[详见：<a href="/secondless/w-a/javascript函数.html#_3、函数的arguments-对象" target="_blank">章节5.javascript函数_3、函数的arguments 对象</a>] ，它是一个对象，但是它的取值可以arguments[0],就是说它能像数组一样取值操作，像这种类似数组的对象，我们称之为：类数组对象，但是它毕竟不是数组。所以，我们可以用from()方法，将一个类数组对象转为数组。
> ``` javascript
> //语法：它是一个静态方法：类型.方法(参数)
> //Array.from(类数组对象);
> function text(){
>     //return arguments[0];
>     //return arguments[1];
>     //return arguments[0] + ',胸围：'+arguments[1]+',体重：'+arguments[2]+',升高：'+arguments[3];
>     //参数不够则是undefined
>     //return arguments[0] + ',胸围：'+arguments[1]+',体重：'+arguments[2]+',升高：'+arguments[3]+arguments[4];
> 
>     //return arguments;
>     return Array.from(arguments);//['迪丽热巴', '85cm', '52kg', '172cm']
> }
> console.log(text('迪丽热巴','85cm','52kg','172cm'));// '迪丽热巴,胸围：85cm,体重：52kg,升高：172cm'
> ```
###  ㉝ 数组of()方法 -- 静态方法，将一组数据转为数组
> 这个方法主要是为了解决一个缺陷：使用 new Array()创建数组时，括号内传一个参数，默认会将该数据认为是数据长度的问题。[详见：<a href="/secondless/w-a/javascript数组.html#_2-使用-new-关键字创建-array-数组-new-关键字可以省略" target="_blank">章节7.javascript数组_1、创建及读取数组_使用 new 关键字创建 Array（数组）</a>]
> ``` javascript
> //静态方法，语法：Array.of(数据1,数据2，数据3...)，如：Array.of(100,123,305)
> console.log(Array.of(100,123,305));// [100, 123, 305]
> 
> //这个方法主要是为了解决一个缺陷：使用 new Array()创建数组时，括号内传一个参数，默认会将该数据认为是数据长度的问题。
> console.log(new Array(1,2,3));//[1, 2, 3]
> 
> let text = new Array(5);//let text = Array(5);
> alert(text);// ,,,, 4个逗号，需要赋值 
> 
> //如果此时，我认为就是数组 [5],可以这么写
> console.log(Array.of(5));//[5] 但一般我们用字面量声明： let arr = [5];
> ```


##  5、集合类型: Set()方法 
Set()方法 : 是一组唯一值的集合(数组去重),每个值只能在 Set 中出现一次,可以容纳任何数据类型的值.
> es6新增的 Set 是一种新集合类型（它可以用来处理数组，所以我们在数组用法这章也讲一下这个方法）。
> ### 1. 创建Set集合实例(使用new关键词，可以类比于之前学习的Date，时间日期对象，说明Set也是对象的一种)
> 使用 new 关键字和 Set 构造函数可以创建一个空集合：
> ``` javascript
> let s = new Set();
> console.log(typeof s);//'object'
> ```
> ### 2. 如果想在创建的同时初始化实例，则可以给 Set 构造函数传入一个可迭代对象，其中需要包含插入到新集合实例中的元素(Set 可以包含任何js数据类型作为值)：
> ``` javascript
> let s1 = new Set(["val1", 1, true, {}, undefined, function fun() {}]);
> console.log(s1);
> ```
> ### 3. Set集合实例转数组，Set结构不会添加重复的值（处理数组去重等问题）
> ``` javascript
> // Set实例转数组
> let _set = new Set([1, 2, 3]);
> console.log(Array.from(_set)); // [1, 2, 3]
> // Set集合结构不会添加重复的值
> let s = new Set([1, 1, 2, 3, 4, 4, 5, 6, 7, 4, 2, 1]);
> console.log(Array.from(s)); //  [1, 2, 3, 4, 5, 6, 7]
> //经常用Set集合解决数组去重问题
> let arr = [1, 2, 3, 3, 4, 5, 4, 4, 2, 1, 3];
> console.log(Array.from(new Set(arr))); // [1, 2, 3, 4, 5]
> ```
> ### 4. Set集合size属性：获取Set集合实例的元素个数
> ``` javascript
> let s = new Set([1, 2, 3]);
> console.log(s.size); // 3
> ```
> ### 5. Set集合add()方法：添加元素
> ``` javascript
> let s = new Set();
> s.add(1).add(2).add(3);
> console.log(Array.from(s)); // [1, 2, 3]
> ```
> ### 6. Set集合has()方法：查询Set实例是否存在某元素(返回布尔值)
> ``` javascript
> let s = new Set();
> s.add(1).add(2).add(3);
> console.log(s.has(1)); // true
> ```
> ### 7. Set集合delete()方法：删除Set实例中某个元素(返回布尔值)
> ``` javascript
> let s = new Set();
> s.add(1).add(2);
> console.log(s.delete(1));//true
> console.log(Array.from(s)); // [2]
> ```
> ### 8. Set集合clear()方法：清空Set实例
> ``` javascript
> let s = new Set();
> s.add(1).add(2).add(3);
> console.log(Array.from(s)); // [1, 2, 3]
> console.log(s.clear());//undefined 没有返回值，所以直接写：s.clear()
> console.log(Array.from(s)); // []
> ```
> ### 9. Set集合迭代遍历数据：keys():返回键名，values(): 返回键值，entries(): 返回键值对, 注意它的键名=键值
> ``` javascript
> let s = new Set();
> s.add(1).add(2).add('迪丽热巴').add({age:31});
> console.log(s);
> console.log(Array.from(s.keys()));
> console.log(Array.from(s.values()));
> console.log(Array.from(s.entries()));
> ```
> ### 10.Set集合迭代遍历数据：for...of遍历，forEach遍历
> ``` javascript
> let s = new Set();
> s.add(1).add(2).add('迪丽热巴').add({age:31});
> 
> //for..of遍历
> for (let i of s) {
> 	console.log('for..of遍历结果：' + i);
> }
> 
> //forEach遍历
> s.forEach(function(currentValue,index){
>    console.log('当前值：'+currentValue+'----索引键：'+index);
> });
> 
> s.forEach((value,key)=>console.log('当前值：'+value+'----索引键：'+key));
> ```


## 6、小结及拓展
###  ① 求两个数组的并集、交集、差集，得到的结果是一个新数组
> ``` javascript
> let arr1 = [10,21,35,54,10,35,3];
> let arr2 = [21,35,77,61,14,77];
> 
> // 求并集（就是两个数组合并之后，不能有重复的元素）
> let $arr = [...arr1,...arr2];
> console.log($arr);//[10, 21, 35, 54, 10, 35, 3, 21, 35, 77, 61, 14, 77]
> $arr = new Set($arr);
> console.log($arr);//Set集合，然后转成新数组
> console.log(Array.from($arr));// [10, 21, 35, 54, 3, 77, 61, 14]
> //简写
> let _$arr = Array.from(new Set([...arr1,...arr2]));
> console.log(_$arr);// [10, 21, 35, 54, 3, 77, 61, 14]
> //new Set集合可以用扩展运算符展开
> console.log([...new Set([...arr1,...arr2])]);// [10, 21, 35, 54, 3, 77, 61, 14]
>
>
> //求交集（两个数组中都有的元素）
> let arr1 = [10,21,35,54,10,35,3];
> let arr2 = [21,35,77,61,14,77];
> let arr = arr1.filter((currentValue,index,array)=>{
>     return arr2.includes(currentValue);
> });
> console.log(arr);//[21, 35, 35] 去重
> let _arr = Array.from(new Set(arr));
> console.log(_arr);//[21, 35]
> //简写
> let $arr = [...new Set(arr1.filter(item => arr2.includes(item)))];
> console.log($arr);//[21, 35]
> 
> 
> //求差集（就是两个数组合并之后，不能有重复的元素：并集 -- 去掉两个数组中都有的元素：交集）
> //即：并集里面去掉交集的元素
> let arr1 = [10,21,35,54,10,35,3];
> let arr2 = [21,35,77,61,14,77];
> //并集
> let union = [...new Set([...arr1,...arr2])];//[10, 21, 35, 54, 3, 77, 61, 14]
> //交集
> let cross = [...new Set(arr1.filter(item => arr2.includes(item)))];//[21, 35]
> let arr = union.filter(a => !cross.includes(a));
> console.log(arr);// [10, 54, 3, 77, 61, 14]
> ```

###  ② 获取数组中的随机项（验证码参考）
> ``` javascript
> let loves = ['黑丝空姐','性感车模','迪丽热巴','古力娜扎','梁咏琪','华仔','古巨基'];
> //console.log(loves[1]);
> //重点需要获取数组下标，随机下标
> let i = Math.floor(Math.random() * loves.length);
> console.log(loves[i]);
> 
> 
> //获取四位验证码的简易模型
> function getCode(codeLength){
>     let code = '';
>     let arr = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
>     'S','T','U','V','W','X','Y','Z');//36个随机数
>     for(let i=0;i<codeLength;i++){
>         let index = Math.floor(Math.random() * arr.length);
>         code += arr[index];
>     }
>     return code;
> }
> console.log(getCode(4));
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