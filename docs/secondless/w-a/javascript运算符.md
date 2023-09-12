---
navbar: true
sidebar: auto
title: 章节3.javascript运算符 
---

## 1、一元运算符
> 只能操作一个值的运算符叫做一元运算符
### ① 递增(++) 和 递减(--) 
> 在循环语句中非常常用
>> 先看递增(++)
>>> ```javascript
>>> //前置递增
>>> let text = 31;
>>> alert(text); // 返回 31
>>> ++text; //前置递增，等同于： text = text + 1;
>>> alert(text); // 返回 32
>>> //后置递增
>>> let text = 31;
>>> alert(text); // 返回 31
>>> text++; //后置递增，等同于： text = text + 1;
>>> alert(text); // 返回 32
>>> ```

>> 在看递减(--) 
>>> ```javascript
>>> //前置递减
>>> let text = 31;
>>> alert(text); // 返回 31
>>> --text; //前置递减，等同于： text = text - 1;
>>> alert(text); // 返回 30
>>> //后置递减
>>> let text = 31;
>>> alert(text); // 返回 31
>>> text--; //后置递减，等同于： text = text - 1;
>>> alert(text); // 返回 30
>>> ```

### ② 前置后置递增(++)递减(--)的区别
> 1.在没有赋值操作，前置和后置是一样的，就是我们上面的例子。<br/>
> 2.在有赋值操作时
>> 如果递增或递减运算符前置，那么前置的运算符会先累加或累减再赋值
>>> ```javascript
>>> let text = 31;
>>> alert(text); // 返回 31
>>> let age = ++text; //先text递增到32，然后赋值给age就是32
>>> alert(text); // 返回 32
>>> alert(age); // 返回 32
>>> ```
>> 如果是后置运算符则先赋值再累加或累减
>>> ```javascript
>>> let text = 31;
>>> alert(text); // 返回 31
>>> let age = text++; //先将text赋值给age就是31，然后再text递增到32
>>> alert(age); // 返回 31
>>> alert(text); // 返回 32
>>> ```


### ③ 其它类型在一元运算符的规则
> 1.数值字符串自动转换成数值
>> ```javascript
>> let text = '31';
>> alert(text); // 31
>> alert(typeof text); // string
>> text++; // 如果是数值字符串，++ 有一个隐式的转型功能，将数值字符串转成了数值，然后自身加1
>> alert(typeof text); // number
>> alert(text); // 返回 32
>> ```
> 2.字符串包含非数值转成 NaN
>> ```javascript
>> let text = 'love热巴';
>> alert(text); // 'love热巴'
>> alert(typeof text); // string
>> text++; // 非数值字符串转成 NaN
>> alert(typeof text); // number
>> alert(text); // 返回 NaN
>> ```
> 3.布尔转换，true隐式转成1，累加就是2，false隐式转成0，累加就是1
>> ```javascript
>> let text = false;
>> alert(text); // false
>> alert(typeof text); // boolean
>> text++; // false隐式转成0，累加就是1  true隐式转成1，累加就是2
>> alert(typeof text); // number
>> alert(text); // 返回 1
>> ```
> 4.数值类型直接相加
>> ```javascript
>> let text = 1.2;
>> alert(text); // 1.2
>> alert(typeof text); // number
>> text++; // 直接相加  text = text + 1
>> alert(typeof text); // number
>> alert(text); // 返回 2.2
>> ```
> 5.对象，不设置 toString 或 valueOf 即为 NaN
>> ```javascript
>> let text = {};
>> text++;
>> alert(text);//返回 NaN
>> 
>> 
>> let text = {
>>     valueOf:function(){
>>       return 31;
>>     },
>>     toString:function(){
>>         return 20;
>>     },
>> };
>> text++;
>> alert(text);//返回 32
>> ```


### ④ 加和减运算符
> 1.数值而言，+就是正数，-就是负数
>> ```javascript
>> let text = 31;
>> +text;
>> alert(text); // 返回 31
>> -text;
>> alert(-text); // 返回 -31
>> ```
> 2.数值字符串，转换成数值
>> ```javascript
>> let text = '31';
>> alert(typeof text); //string
>> alert(typeof +text); //number
>> alert(+text); // 返回 31
>> alert(-text); // 返回 -31
>> ```
> 3.字符串包含非数值转成 NaN
>> ```javascript
>> let text = 'love热巴';
>> alert(typeof text); //string
>> alert(typeof +text); //number
>> alert(+text); // 返回 NaN
>> alert(-text); // 返回 NaN
>> ```
> 4.布尔转换成相应数值 true转成1，false转成0
>> ```javascript
>> let text = true;
>> alert(typeof text); //boolean
>> alert(typeof +text); //number
>> alert(+text); // 返回 1
>> alert(-text); // 返回 -1
>> 
>> let text = false;
>> alert(typeof text); //boolean
>> alert(typeof +text); //number
>> alert(+text); // 返回 0
>> alert(-text); // 返回 0
>> ```
> 5.浮点型数值（小数），没什么变化，+就是正数，-就是负数
>> ```javascript
>> let text = 1.2;
>> alert(typeof text); //number
>> alert(typeof +text); //number
>> alert(+text); // 返回 1.2
>> alert(-text); // 返回 -1.2
>> ```
> 6.对象，不设置 toString 或 valueOf 即为 NaN
>> ```javascript
>> let text = {};
>> alert(typeof text); //object
>> alert(typeof +text); //number
>> alert(+text); // 返回 NaN
>> alert(-text); // 返回 NaN
>> 
>> let text = {
>>     toString:function(){
>>         return 20;
>>     },
>>     valueOf:function(){
>>         return 31;
>>     },
>> };
>> +text;
>> alert(text);//返回 20
>> ```
> <b>注意：加法和减法运算符一般用于算术运算，也可向上面进行类型转换。</b>


<br/><br/><br/><br/>

## 2、算术运算符
> 规则：如果在算术运算的值不是数值，那么后台会先使用 Number()转型函数将其转换为数值(隐式转换)。
### ① 加法 （+）
> 1.两个都是数值的，正常相加
>> ```javascript
>> let text = 1 + 2 ; alert(text); //返回3
>> ```
> 2.只要有一个 NaN 值就为 NaN
>> ```javascript
>> let text = 31 + NaN ; alert(text); //返回NaN
>> ```
> 3.正无穷，负无穷
>> ```javascript
>> let text = Infinity + Infinity; alert(text); //返回Infinity
>> let text = -Infinity + -Infinity;  alert(text); //返回-Infinity
>> let text = Infinity + -Infinity; alert(text); //返回NaN，正无穷和负无穷相加等 NaN
>> ```
> 4.有字符串就不是加法，只要其中一个是字符串，那么就自动使用字符串连接符
>> ```javascript
>> let text = 31 + '31';
>> alert(typeof text); // string
>> alert(text); // 3131
>>
>> 扩展一下
>> let text = '迪丽热巴的质量是：' + 50 + 2; 
>> //加法，从左往右，先 '迪丽热巴的质量是：' + 50 仍然是字符串，再加 2 
>> alert(text); // '迪丽热巴的质量是：502'
>> 
>> let text = 50 + 2 + '迪丽热巴的质量是：' ;
>> //两个都是数值，按照加法计算，后面有字符串的，就自动使用字符串连接符
>> alert(typeof text); // string
>> alert(text); // '52迪丽热巴的质量是：'
>> 
>> let text = '迪丽热巴的质量是：' + (50 + 2); 
>> //有括号，先计算括号里面的，然后再和字符串相加，变成字符串连接符
>> alert(typeof text); // string
>> alert(text); // '迪丽热巴的质量是：52'
>> ```
> 5.对象+数值
>> ```javascript
>> let text = {}; 
>> let age = text + 10;
>> // {}+10  变成 '[object Object]10'  类型是字符串
>> alert(typeof age); // string
>> alert(age); // '[object Object]10'
>> 
>> //对象如果有toString方法或者valueOf方法
>> let text = {
>>     toString:function(){
>>         return 20; // 返回数值，以数值相加 返回：30
>>         return '20'; // 返回字符串，字符串加数值，字符串链接符   返回：2010
>>     }
>> }; 
>> let age = text + 10;
>> alert(typeof age); // number
>> alert(age); // 30
>> ```

### ② 减法 （-）
> 减法是类型先进行Number()转换后在进行减法运算
>> ```javascript
>> let text = 50 - 20; alert(text); //等于 30
>> let text = -50 - 20;  alert(text);//等于-70
>> let text = -50 - -20;  alert(text);//-30，一般写成-50 - (-20)比较清晰
>> let text = 1 - NaN; alert(text);//NaN，只要有一个 NaN 就为 NaN
>> let text = Infinity - Infinity; alert(text);//NaN
>> let text = -Infinity - -Infinity; alert(text);//NaN
>> let text = Infinity - -Infinity; alert(text);//Infinity
>> let text = -Infinity - Infinity; alert(text);//-Infinity
>> let text = 50 - true; alert(text);//49，true 转成数值为 1
>> let text = 50 - ''; alert(text);//50，''转成了 0
>> let text = 50 - '70'; alert(text);//-20，'70'转成了数值 70
>> let text = 50 - null; alert(text);//50，null 转成了 0
>> let text = 50 - 'reba'; alert(text);//NaN，'reba' 转成了 NaN
>> let text = 50 - {};alert(text); //NaN，如果有 toString()或 valueOf()则返回 50-返回数的值
>> ```

### ③ 乘法 （*）
> 乘法是类型先进行Number()转换后在进行乘法运算
>> ```javascript
>> let text = 50 * 20; alert(text);//1000
>> let text = 50 * NaN; alert(text);//NaN，只要有一个 NaN 即为 NaN
>> let text = Infinity * Infinity;alert(text); //Infinity
>> let text = -Infinity * Infinity ; alert(text);//-Infinity
>> let text = -Infinity * -Infinity ; alert(text);//Infinity
>> let text = 50 * true; alert(text);//50，true 转成数值为 1
>> let text = 50 * ''; alert(text);//0，''转成了 0
>> let text = 50 * null; alert(text);//0，null 转成了 0
>> let text = 50 * 'reba'; alert(text);//NaN，'reba' 转成了 NaN
>> let text = 50 * {}; alert(text);//NaN，如果有 toString()或 valueOf()则返回 50 * 返回数的值
>> ```

### ④ 除法 （/）
> 除法是类型先进行Number()转换后在进行除法运算
>> ```javascript
>> let text = 50 / 2; alert(text);//25
>> let text = 50 / NaN; alert(text);//NaN
>> let text = Infinity / Infinity; alert(text);//NaN
>> let text = -Infinity / Infinity ; alert(text);//NaN
>> let text = -Infinity / -Infinity; alert(text);//NaN
>> let text = 50 / true; alert(text);//50，true 转成 1
>> let text = 50 / ''; alert(text);//Infinity，''转成了0，0不能做分子，js会让它变成NaN或者正无穷
>> let text = 50 / null; alert(text);//Infinity，null转成了 0
>> let text = 50 / 'reba'; alert(text);//NaN，'reba' 转成了 NaN
>> let text = 50 / {}; alert(text);//NaN，如果有 toString()或 valueOf()则返回 50 / 返回数的值
>> ```

### ⑤ 求余数 （%）
> 求余数跟除法一样，类型先进行Number()转换后在进行除法就余数运算
>> ```javascript
>> let text = 5 % 3; alert(text);//2，余数为 2
>> let text = 5 % NaN; alert(text);//NaN
>> let text = Infinity % Infinity; alert(text);//NaN
>> let text = -Infinity % Infinity ; alert(text);//NaN
>> let text = -Infinity % -Infinity; alert(text);//NaN
>> let text = 5 % true; alert(text);//0，true 转成 1
>> let text = 5 % ''; alert(text);//NaN，''转成了0
>> let text = 5 % null; alert(text);//NaN，null转成了 0
>> let text = 5 % 'reba'; alert(text);//NaN，'reba' 转成了 NaN
>> let text = 5 % {}; alert(text);//NaN，如果有 toString()或 valueOf()则返回 5 % 返回数的值
>> ```

<br/><br/><br/><br/>

## 3、赋值运算符
### ① 赋值给变量
> 用等于号(=)表示，就是把右边的值赋给左边的变量。
> ```javascript
> let text = '迪丽热巴'; //把'迪丽热巴'赋值给变量text
> ```
### ② 复合赋值运算符
> ```javascript
> let text = 10;
> text = text + 21; //自己本身再加21，再赋值给自己
> alert(text); // 31
>
>
> //还可以写成下面这种，在开发中这种写法比较多
> let text = 10;
> text += 21;  // 相当于 text = text + 21;
> alert(text); // 31
> ```
> <b>注：除了+=之外，下面的也是一个道理 </b> <br/>
> 1.(*=) <br/>
> ```javascript
> let text = 2;
> text *= 5; // 相当于 text = text * 5;
> alert(text); // 10
> ```
> 2.(/=) <br/>
> 3.(%=) <br/>
> 4.(+=) <br/>
> 5.(-=)


<br/><br/><br/><br/>

## 4、关系运算符
> 用于进行比较的运算符称作为关系运算符：小于(<)、大于(>)、小于等于(<=)、大于等于(>=)、相等(==)、不等(!=)、全等(恒等)(===)、不全等(不恒等)(!==) <br/>
> 大多返回的值是布尔值：true/false，规则如下：
### ① 两个操作数都是数值，则数值比较
>> ```javascript
>> let text = 2 > 1; alert(text);// true
>> let text = 2 > 3; alert(text);// false
>> ```
### ② 一个是数值字符串，一个是数值
> 字符串先转成数值，再比较
>> ```javascript
>> let text = '2' > 1; alert(text);// true
>> let text = '2' > 3; alert(text);// false
>> ```
### ③ 两个都是数值字符串
> 会进行第一个字符的比较
>> ```javascript
>> let text = '2' > '11'; alert(text);//返回true
>> //原理：'2'第一个字符是2，'11'第一个字符是1, 2 > 1 返回 true
>> ```
### ④ 一个是对象，一个是数值
> 如果对象有 toString()或 valueOf()则返回 数值和返回值的比较，否则就是false
>> ```javascript
>> let text = 2 > {}; alert(text); // false
>> 
>> let text = {
>>     toString:function(){
>>         return 1;
>>     }
>> };
>> alert(2>text);//true
>> ```
### ⑤ 字母字符串比较
> 比较字符串对应的字符编码，ASCII码值， [查看ASCII码值](https://www.runoob.com/w3cnote/ascii.html)
>> ```javascript
>> //'a'对应97，'b'对应98
>> let text = 'a' > 'b'; alert(text); //false 
>> //'a'对应97，'B'对应66
>> let text = 'a' > 'B'; alert(text); //true
>> ```
<b>注：其他的，小于(<)、小于等于(<=)、大于等于(>=) 规则和上面一样</b>

### ⑥ 相等和不等的规则
>> #### 1.两个数值比较
>> ```javascript
>> let text = 1 == 1; alert(text); //返回 true 
>> let text = 1 != 2; alert(text); //返回 true
>> ```
> 在相等和不等的比较上，如果操作数是非数值，则遵循以下规则：
>> #### 2.一个字符串，一个是数值
>> ```javascript
>> //字符串转成数值 '1'转成数值1
>> let text = '1' == 1; alert(text); //返回 true
>> ```
>> #### 3.一个操作数是布尔值，则比较之前将其转换为数值，false 转成 0，true 转成 1
>> ```javascript
>> //false 转成 0
>> let text = false == 0; alert(text); //返回 true
>> //true转成了1
>> let text = true == 1; alert(text); //返回 true
>> ```
>> #### 4.一个操作数是对象，则先调用 valueOf()或 toString()方法后再和返回值比较
>> ```javascript
>> let text = 2 == {}; alert(text); //false
>> 
>> 
>> let text = {
>>     toString:function(){
>>         return 2;
>>     }
>> }; 
>> alert(text == 2); //ture
>> ```
>> #### 5.两个都是对象（先做个了解）<br/>
>>则比较它们是否是同一个对象，如果都指向同一个对象，则返回 true，否则返回 false
>> ```javascript
>> //比较的是它们的引用地址，每个新创建对象的引用地址都不同
>> let text = {} == {}; alert(text);//false
>> 
>> //引用地址一样，所以相等
>> let desc = {};
>> let title = desc;
>> let text = desc == title;
>> alert(text);//true
>> ```
>> #### 6.有一个是NaN
>>> 一个操作数是 NaN，则 ==返回 false，!= 返回 true；并且 NaN 和自身不等
>>>
>>> |  表 达 式          |  返回值     | 
>>> |   :--:            |   :--:     |
>>> |  NaN == NaN       |  false     |
>>> |  'NaN' == NaN     |  false     |
>>> |  2 == NaN         |  false     |
>>> |  NaN != NaN       |  true     |
>>> |  'NaN' != NaN     |  true     |
>>> |  2 != NaN         |  true     |
>> #### 7.不需要任何转换的情况下，null 和 undefined 是相等的
>> ```javascript
>> let text; //undefined
>> let user = null;
>> alert(text == user); // 返回 true
>> ```
>> #### 8.全等(===)和全不等(!==)的判断上，值和类型都相等，才返回 true，否则返回 false
>>>
>>> |  表 达 式          |  返回值     |   原因              |
>>> |   :--:            |   :--:      |    :--:             |
>>> |  '2' === 2        |  false      |   值和类型都必须相等 | 
>>> |  2 === 2          |  true      |   值和类型都相等了   |
>>> |  '2' == 2          |  true      |   值相等即可   |
>> #### 9.特殊值
>> ```javascript
>> alert(''==0); //true，字符串在比较的时候会自动转换为数值
>> alert(false == 0); //true，布尔值在比较的时候会转换为数值
>> alert(false === 0); //false
>> //特别注意, null自动转换为0， 但在比较运算上，null和undefined没有自动转换，
>> //所以null和undefined不等于0
>> alert(undefined == 0); //false
>> alert(null == 0); //false
>> //那怎么样就等于0了呢？
>> alert(!!null == 0);//true     !! 下面逻辑运算符会讲到
>> alert(Boolean(null) == 0);//true    Boolean()强制转换
>> alert(!!undefined == 0); //true
>> alert(Boolean(undefined) == 0); //true
>> ```


<br/><br/><br/><br/>

## 5、逻辑运算符
> 逻辑运算符通常用于布尔值的操作，一般和关系运算符配合使用，有三个逻辑运算符：逻辑与(AND)、逻辑或(OR)、逻辑非(NOT)。
### ① 逻辑与(and) ：&& [并且的意思]
> ```javascript
> let text = (2 > 1) && (3 > 2); alert(text); // true
> ```
> |  第一个操作数          |  第二个操作数     |   结果              |
> |   :--:                |   :--:           |    :--:             |
> |  true                 |  true            |   true              | 
> |  true                 |  false           |   false             |
> |  false                |  true            |   false             |
> |  false                |  false           |   false             |
> 总结：逻辑与运算符&&，只有两个都是真的时候，才是真，否则都是假，在开发中非常常用，大家后面会体会到，这里只是理论基础。
> #### 两边的操作数有一个操作数不是布尔值的情况下，遵循如下规则：
> ##### 1.第一个操作数是对象，则返回第二个操作数；
> ```javascript
> let text = {} && (2 > 1); alert(text); // true，返回第二个操作数
> ```
> ##### 2.第二个操作数是对象，如果第一个操作数返回 true，才返回第二个操作数，否则返回 false
> ```javascript
> let text = (2 > 1) && {}; alert(text); // [object Object]
> let text = (2 < 1) && {}; alert(text); // false
> ```
> ##### 3.有一个操作数是 null
> ```javascript
> let text = (2 > 1) && null; alert(text); // null 
> ```
> ##### 4.有一个操作数是 undefined
> ```javascript
> let text = (2 > 1) && undefined; alert(text); // undefined
> ```
> ##### 5.如果第一个操作数是false, 则不去运行第二个操作数了，均返回false
> ```javascript
> let text = (2 < 1) && {}; alert(text); // false
> let text = (2 < 1) && null; alert(text); // false   
> let text = (2 < 1) && undefined; alert(text); // false 
> ```


### ② 逻辑或(or)：||  [或者的意思]
> 总结：逻辑或运算符 ||，与上面的逻辑与运算符 && ，刚好相反，它是只有两个都是假的时候，才是假，否则都是真，在开发中非常常用，比如说：
> 我们后台数据库中注册的用户，有的用户注册后设置了一个昵称，有的用户没有设置昵称，那么在页面上显示的时候，就可以用这个逻辑或运算符，
> 有昵称的优先显示昵称，没有昵称的就显示用户注册账号，具体我们后面开发会感受到的。<br/>
> 接下来，我们看它的基础知识：
> ```javascript
> let text = (2 > 1) || (2 > 3); alert(text); // true
> ```
> |  第一个操作数          |  第二个操作数     |   结果              |
> |   :--:                |   :--:           |    :--:             |
> |  true                 |  true            |   true              | 
> |  true                 |  false           |   true             |
> |  false                |  true            |   true             |
> |  false                |  false           |   false             |
> #### 两边的操作数有一个操作数不是布尔值的情况下，遵循如下规则：
> ##### 1.第一个操作数是对象，则返回第一个操作数（注意与 逻辑与运算符&&的区别）；
> ```javascript
> let text = {} || (2 > 1); alert(text); // [object Object]，返回第一个操作数
> ```
> ##### 2.第一个操作数的求值结果为 false，则返回第二个操作数
> ```javascript
> let nickname = '';
> let username = 'reba520';
> let text = nickname || username; alert(text); // 'reba520'
>
> let nickname = '迪丽热巴';
> let username = 'reba520';
> let text = nickname || username; alert(text); // '迪丽热巴'
> ```
> ##### 3.两个操作数都是对象，则返回第一个操作数
> ```javascript
> let text = 对象 1 || 对象 2; //[object Object] 对象1
> ```
> ##### 4.特殊值
> ```javascript
> let text = null || null;  //null，两个操作数都是 null，则返回 null
> let text = NaN || NaN;  //NaN，两个操作数都是 NaN，则返回 NaN
> let text = undefined || undefined;  //undefined，两个操作数都是 undefined，则返回 undefined
> ```
> ##### 5.如果第一个操作数是true, 则不去运行第二个操作数了，均返回true
> ```javascript
> let text = '迪丽热巴' || null;  alert(text); //'迪丽热巴'
> let text = '迪丽热巴' || NaN;  alert(text); //'迪丽热巴'
> let text = '迪丽热巴' || undefined;  alert(text); //'迪丽热巴'
> let text = '迪丽热巴' || '古力娜扎';  alert(text); //'迪丽热巴'
> ```
### ③ 逻辑非(not)：!  [取反的意思]
> 逻辑非运算符可以用于任何值，无论这个值是什么数据类型，这个运算符都会返回一个布尔值，看起来很NB的样子。<br/>
> 它的流程是：先将这个值转换成布尔值，然后取反，规则如下：
> ##### 1.操作数是一个对象，返回 false
> ```javascript
> let text = !{}; alert(text); // false , 因为对象转换成布尔值是真，取反就是假
> ```
> ##### 2.操作数是一个空字符串，返回 true , 非空字符串，返回 false
> ```javascript
> let text = !''; alert(text); // true  , 因为''转换成布尔值是假，取反就是真
> let text = !'迪丽热巴'; alert(text); //false , 因为'迪丽热巴'转布尔值本来是真的，取反就是假了
> ```
> ##### 3.操作数是数值 0，返回 true
> ```javascript
> let text = !0; alert(text); // true , 因为0转换成布尔值是假，取反就是真
> ```
> ##### 4.操作数是任意非 0 数值(包括 Infinity)，返回 false
> ```javascript
> let text = !31; alert(text); // false , 因为31转换成布尔值是真，取反就是假
> let text = !Infinity; alert(text); // false , 因为Infinity转换成布尔值是真，取反就是假
> ```
> ##### 5.特殊值
> ```javascript
> let text = !null; alert(text); // true
> let text = !NaN; alert(text); // true
> let text = !undefined; alert(text); // true
> ```

### ④ !! [取反再取反]
> 使用一次逻辑非运算符 !，流程是将值转成布尔值然后取反。而使用两次逻辑非运算符 !! 就
是将值转成成布尔值取反再取反，相当于对值进行 Boolean()转型函数处理。
> ```javascript
> let text = !!null; alert(text); // false
> let text = !!0; alert(text); // false
> ```


<br/><br/><br/><br/>

## 6、字符串、逗号、三元条件运算符
### ① 字符串运算符
> 字符串运算符只有一个，即："+"。它的作用是将两个字符串相加。
>> 规则：至少一个操作数是字符串即可。
>> ```javascript
>> let text = '520' + '1314'; alert(text); // '5201314'
>> let text = '520' + 1314; alert(text); // '5201314'
>> let text = 520 + '迪丽热巴'; alert(text); // '520迪丽热巴'
>> ```
### ② 逗号运算符
> 逗号运算符可以在一条语句中执行多个操作
>> #### 1.多个变量声明
>> ```javascript
>> let nickname='迪丽热巴',age=31,weight='52kg';
>> alert(nickname);alert(age);alert(weight);
>> ```
>> #### 2.变量声明，将最后一个值赋给变量，不常用
>> ```javascript
>> let text = ('迪丽热巴',31,'52kg','演员','170cm');
>> alert(text); // 返回 170cm
>> ```
>> #### 3.数组的字面量声明（后面会详细讲数组）
>> ```javascript
>> let text = ['迪丽热巴',31,'52kg','演员','170cm'];
>> alert(text); // 返回数组： '迪丽热巴',31,'52kg','演员','170cm'
>> ```
>> #### 4.对象的字面量声明（后面会详细讲对象）
>> ```javascript
>> let text = {
>>    name:'迪丽热巴',  //键值对，左边是属性名，右边是值
>>    age:31,
>>    weight:'52kg',
>>    bar:'85cm',
>>    height:'170cm'
>> };
>> alert(text);// 返回 [object Object]
>> ```
### ③ 三元条件运算符
> 三元条件运算符其实就是后面将要学到的 if 语句的简写形式
> 回顾之前提到的if语句  
>> <b><a href="/secondless/w-a/javascript基础.html#总结-boolean-类型转换" target="_blank">在讲Boolean()函数隐式转换的时候提到</a></b>
> ```javascript
> let text = '';
> let day = '星期一';  // 赋值运算符
> if(day == '星期一'){ // 关系运算符里面 相等的比较
>     text = '热巴陪我';
> }else{
>     text = '娜扎陪我';
> }
> alert(text);// '热巴陪我'
>
>
> //三元条件模型： (条件判断是 true(真) 还是 false(假)) ?  执行真的操作 : 执行假的操作 ;
> // let day = '星期一';
> // (day == '星期一') ? '热巴陪我' : '娜扎陪我';//结果赋值给变量 text
>
> let day = '星期一';
> let text =  (day == '星期一') ? '热巴陪我' : '娜扎陪我';//结果赋值给变量 text
> alert(text); // '热巴陪我'
>
> //不要括号也行，如果看着不习惯，就加上括号
> let day = '星期一';
> let text =  day == '星期一' ? '热巴陪我' : '娜扎陪我';
> alert(text); // '热巴陪我'
> ```


<br/><br/><br/><br/>

## 7、运算符优先级
### ① 有括号的情况
> #### 在一般的运算中，我们不必考虑到运算符的优先级，因为我们可以通过圆括号来解决这种问题。比如：
> ```javascript
> let text = 2 - 4 * 7; alert(text);//-26
> let text = 51 + (10 - 9) + '迪丽热巴'; alert(text);// '52迪丽热巴'
> ```
### ② 没有括号的情况
> #### 没有使用圆括号强制优先级，必须遵循以下顺序，表中级别由高到低，
> |  运算符            |  描述                                       |     级别                   |   
> |   :--:            |   :--:                                      |     :--:                   | 
> |  . [] ()          |  对象成员存取、数组下标、函数调用等            |    最高级别，优先执行        | 
> |  ++ -- ~ ! delete new typeof void          |  一元运算符            |    稍低        |  
> |  * / %          |  乘法、除法、求余数            |    稍低        |   
> |  + - +          |  加法、减法、字符串连接            |    稍低        |   
> |  < <= > >= instanceof          |  关系比较、检测类实例            |    稍低        |   
> |  == != === !==          |  恒等(全等)            |    稍低        |    
> |  &&          |  逻辑与（并且）            |    稍低        |   
> |  \|\|          |  逻辑或（或者）            |    稍低        |
> |  ?  :          |  三元条件            |    稍低        |
> |  =  +=/-=等等          |  赋值、运算赋值            |    稍低        |
> |  ,          |  多重赋值、数组元素            |    最低        |
> <b>以上优先级先有个了解，需要用的时候，在过来查看即可。</b>



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
