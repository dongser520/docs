---
navbar: true
sidebar: auto
title: 章节8.Date类型：时间和日期
---

> 前言：<br/>
> 上节课，我们讲数组的时候，讲到数组内置方法<a href="/secondless/w-a/javascript数组.html#_3-数组内置方法tolocalestring-、valueof-和-tostring" target="_blank">toLocaleString()</a> 提到了日期时间 <br/>
> 日期和时间在商品预售、商品抢购、倒计时等方面用得比较多。
## 1、Date 类型
> js提供了 Date 类型来处理时间和日期，Date 类型保存的日期能够精确到 1970 年 1 月 1 日之前或之后的 285616 年。
### ① 创建一个日期对象
> ``` javascript
> let text = new Date();
> console.log(text);//获取当前时间和日期了，但是格式看着不习惯
> ``` 
> 以下内容扩展了解，用得比较少，用的时候来文档查阅即可：<br/>
> js提供两个方法，Date.parse()和 Date.UTC()。Date.parse()方法接收一个表示日期的字符串参数，然后尝试根据这个字符串返回相应的毫秒数。<br/>
> ###  ② Date.parse()
> 字符串格式参数：<br/>
>> ① '月/日/年'，如 1/1/2023
>>> ``` javascript
>>> console.log(Date.parse('1/1/2023')); // 返回一个毫秒数：1672502400000
>>> 
>>> let text = new Date(Date.parse('1/1/2023')); 
>>> let text = new Date(1672502400000);
>>> console.log(text);//返回日期时间：Sun Jan 01 2023 00:00:00 GMT+0800 (中国标准时间)
>>> ```
>>> 默认自动后台调用Date.parse()
>>> ``` javascript
>>> let t1 = new Date(Date.parse('1/1/2023'));
>>> let t2 = new Date('1/1/2023');
>>> console.log(t1); //返回：Sun Jan 01 2023 00:00:00 GMT+0800 (中国标准时间)
>>> console.log(t2); //返回：Sun Jan 01 2023 00:00:00 GMT+0800 (中国标准时间)
>>> ```
>> ② '英文月份名 日, 年'，如 Jan 01, 2023  即：1月1日2023年
>>> ``` javascript
>>> let t3 = new Date('Jan 01, 2023');
>>> console.log(t3); // 返回：Sun Jan 01 2023 00:00:00 GMT+0800 (中国标准时间)
>>> ```
>> ③ '英文星期几 英文月名 日 年 时:分:秒 时区'，如：Sun Jan 01 2023 00:00:00 GMT+0800
>>> ``` javascript
>>> let t4 = new Date('Sun Jan 01 2023 00:00:00 GMT+0800');
>>> console.log(t4); // 返回：Sun Jan 01 2023 00:00:00 GMT+0800 (中国标准时间)
>>> ```
> ###  ③ Date.UTC()
> Date.UTC()方法同样也返回表示日期的毫秒数，但是它用的是世界协调时间，会按照它的区域基准计算时间，比如在中国，会自动加上东八区（加上8个小时），我国的北京时间【就是在它的时间上，自动加上了8个小时】。(格式如下：年份：[0 表示 1 月，1 表示 2 月]，天数：[1-31]，小时数[0-23]，
分钟，秒以及毫秒)。只有前两个参数是必须的。如果没有提供月数，则天数为 1；如果省
略其他参数，则统统为 0.
>> ``` javascript
>> console.log(Date.UTC(2023,0,1));//2023年1月1日0时0分0秒0毫秒，返回毫秒数：1672531200000
>> //它返回的北京时间是：2023年1月1日8时0分0秒0毫秒
>> console.log(new Date(Date.UTC(2023,0,1)));//返回 Sun Jan 01 2023 08:00:00 GMT+0800 (中国标准时间)
>> //如何不要加上8小时，直接返回我写的时间：2023年1月1日0时0分0秒0毫秒
>> console.log(new Date(2023,0,1));//返回 Sun Jan 01 2023 00:00:00 GMT+0800 (中国标准时间)
>> ```
> ###  ④  Date 类型也重写了 toLocaleString()方法、toString()方法和 valueOf()时间戳方法
>> ``` javascript
>> //2023年1月1日12点30分45秒35毫秒
>> let text = new Date(2023,0,1,12,30,45,35);
>> console.log(text);                 //返回：Sun Jan 01 2023 12:30:45 GMT+0800 (中国标准时间)
>> console.log(text.toString());      //返回：Sun Jan 01 2023 12:30:45 GMT+0800 (中国标准时间)
>> console.log(text.toLocaleString());//返回：2023/1/1 12:30:45
>> console.log(text.valueOf());//显示毫秒数(时间戳) 返回：1672547445035
>> ```

问：如何将上面的 <span style="color:#999999;"> Sun Jan 01 2023 12:30:45 GMT+0800 (中国标准时间)   </span>转成我们能看懂，方便使用的日期和时间？
## 2、格式化日期和时间
### ① 日期格式化
> ``` javascript
> let text = new Date();
> console.log(text);                       // Fri Sep 01 2023 11:40:56 GMT+0800 (中国标准时间)
> // 以特定的格式显示星期几、月、日和年
> console.log(text.toDateString());        // Fri Sep 01 2023
> // 以特定的格式显示时、分、秒和时区
> console.log(text.toTimeString());        // 11:40:56 GMT+0800 (中国标准时间)
> // 以特定地区格式显示星期几、月、日和年
> console.log(text.toLocaleDateString());  // 2023/9/1
> // 以特定地区格式显示时、分、秒和时区
> console.log(text.toLocaleTimeString());  // 11:40:56
> // 以特定的格式显示完整的 UTC 日期
> console.log(text.toUTCString());         // Fri, 01 Sep 2023 03:40:56 GMT
> ```
### ② 单独获取想要的时间日期、时间戳
> ``` javascript
> let currentDate = new Date(); 
> console.log(currentDate);                      // Fri Sep 01 2023 12:18:00 GMT+0800 (中国标准时间)
> //获取日期的毫秒数(时间戳)，和 valueOf()返回一致
> console.log(currentDate.getTime());            // 1693541880615
> //设置四位年份，返回的是毫秒数
> console.log(currentDate.setFullYear(2023));    // 1693541880615
> //获取月份，没指定月份，从 0 开始算起
> console.log(currentDate.getMonth());           // 8
> //毫秒数 1秒=1000毫秒
> console.log(currentDate.getMilliseconds());    //374
> //返回本地时间和 UTC 时间相差的分钟数
> console.log(currentDate.getTimezoneOffset()); // -480
> 
> 
> // 输出当前时间的年月日时分秒
> // 获取当前年份 
> let year = currentDate.getFullYear(); 
> // 获取当前月份（注意月份从0开始，所以要加1）
> let month = currentDate.getMonth() + 1; 
> let _month = month < 10 ? '0'+ month : month;
> // 获取当前日期
> let day = currentDate.getDate(); 
> let _day = day < 10 ? '0'+ day : day;
> // 获取当前小时
> let hours = currentDate.getHours(); 
> let _hours = hours < 10 ? '0'+ hours : hours;
> // 获取当前分钟
> let minutes = currentDate.getMinutes(); 
> let _minutes = minutes < 10 ? '0'+ minutes : minutes;
> // 获取当前秒数
> let seconds = currentDate.getSeconds();
> let _seconds = seconds < 10 ? '0'+ seconds : seconds;
> console.log("年：" + year);                //年：2023
> console.log("月：" + month);               //月：9
> console.log("日：" + day);                 //日：1
> console.log("时：" + hours);               //时：3
> console.log("分：" + minutes);             //分：2
> console.log("秒：" + seconds);             //秒：1
> //2023-9-1 3:2:1
> console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`); 
> //常用格式
> //2023-09-01 03:02:01     
> console.log(`${year}-${_month}-${_day} ${_hours}:${_minutes}:${_seconds}`); 
> //2023/09/01 03:02:01
> console.log(`${year}/${_month}/${_day} ${_hours}:${_minutes}:${_seconds}`); 
> ```
> 注：上面的方法：getFullYear等，可以用getUTCFullYear, 区别就在于 getHours 与 getUTCHours相差8个小时。 <br/>

<b>关于时间日期的具体应用，我们后面讲案例的时候再讲。</b>


<br/><br/><br/><br/>


## 课程其它章节
### [章节1.课程介绍](/secondless/w-a '章节1.课程介绍')
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
#### <a href="/secondless/w-a/javascript数组.html#_2、数组中的属性和内置方法" style="margin-left:50px;">2、数组中的属性和内置方法</a>
#### <a href="/secondless/w-a/javascript数组.html#_3、数组中的方法" style="margin-left:50px;">3、数组中的方法</a>
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
#### <a href="/secondless/w-a/匿名函数和闭包.html#_8-闭包-模仿块级作用域-将变量私有化保护数据" style="margin-left:50px;">5、 闭包：模仿块级作用域，将变量私有化保护数据</a>
#### <a href="/secondless/w-a/匿名函数和闭包.html#_9-闭包实现代替全局作用域" style="margin-left:50px;">6、 闭包实现代替全局作用域</a>
