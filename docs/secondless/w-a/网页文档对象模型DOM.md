---
navbar: true
sidebar: auto
title: 章节15.网页文档对象模型DOM
---


## 1、理解DOM
> <b>前言</b> <br/><br/>
> DOM 中的三个字母，D（文档）可以理解为整个 Web 加载的网页；O（对象）可以理解为对网页进行操作的对象，可以调用属性和方法，这里我们说的是 document对象；M（模型）可以理解为网页文档的树型结构，我们的网页可以理解成由节点组成的节点树。
> 
> ### ① DOM节点树
> 加载 HTML 页面时，Web 浏览器生成一个树型结构，用来表示页面内部结构。DOM 将这种树型结构理解为由节点组成。
> <img src="/2-1-15-01.jpg" alt="DOM树型结构" class="zoom-custom-imgs" style="display:inline-block;"> <br/>
> 从上图的树型结构，我们理解几个概念，html 标签没有父辈，没有兄弟，所以 html 标签为根标签（元素）(后面我们经常把标签称作为元素，是一个意思)。head 标签是 html 子标签，meta 和 title 标签之间是兄弟关系（兄弟节点，兄弟元素）。如果把每个标签当作一个节点的话，那么这些节点组合成了一棵节点树。
> ### ② 节点种类：元素节点、文本节点、属性节点
> <img src="/2-1-15-02.jpg" alt="DOM节点种类" class="zoom-custom-imgs" style="display:inline-block;"> <br/>
> 节点分为三类：
> 1. 元素节点：其实就是标签，\<div\>\<\/div>  <br/> 
> 2. 文本节点：就是标签内的纯文本，“测试Div” <br/>
> 3. 属性节点：就是标签的属性， title=“属性节点” 

我们了解了节点树以及节点种类之后呢，在我们网页开发中，我们就需要来查找这些节点信息，那该怎么查找呢？

## 2、查找节点信息方法
### Ⅰ、 getElement系列
> ### ① getElementById()方法
> getElementById()方法，接受一个参数：获取元素的 ID。如果找到相应的元素则返回该元素的 HTMLDivElement 对象，如果不存在，则返回 null。
> ``` javascript
> let main_business = document.getElementById('main_business');
> console.log(main_business);
> //为什么查找不到元素？
> //DOM操作必须等待HTML文档加载完毕，才可以获取到。
> //如何获取到呢？
> //1. 把js执行的代码放到DOM节点渲染的后面
> //2. 用后面学习到的onload事件加载html文档，把代码放在onload事件里面
> window.onload = function () { //预加载 html 后执行
>     console.log(document.getElementById('main_business'));
> };
> ```
> ### ② getElementById()方法获取的元素节点属性：tagName、innerHTML等
> ``` javascript
> let main_business = document.getElementById('main_business');
> console.log(main_business);
> console.log(main_business.tagName);// DIV
> console.log(main_business.innerHTML);
> console.log(main_business.innerText);
> console.log(main_business.localName);//div
> console.log(main_business.nodeName);//DIV
> ```
> ### ③ 获取及设置元素html属性：id,title,style,className等
> ``` javascript
> let main_business = document.getElementById('main_business');
> console.log(main_business);
> console.log(main_business.id);//main_business
> //设置id名
> //document.getElementById('main_business').id = 'main_business_11';
> // main_business.id = 'main_business_11';
> 
> console.log(main_business.title); //获取 title
> main_business.title = '栏目标题：工程案例'; //设置 title
> console.log(main_business.title);
> 
> console.log(main_business.style); //获取 CSSStyleDeclaration 对象
> console.log(main_business.style.color); //获取 style 对象中 color 的值
> main_business.style.color = 'red'; //设置 style 对象中 color 的值
> 
> 
> console.log(main_business.className); //获取class 得到：flex justify-center py-5
> main_business.className = 'box'; //设置 class
>
> main_business.innerText = '主营业务---哈哈哈哈';
> main_business.innerHTML = '<strong>主营业务</strong>---哈哈哈哈';
>
> //深入理解：就是操作元素节点对象，对里面的属性进行获取或修改，核心还是在操作对象。
> ``` 
> ### ④ getElementsByTagName()方法 - 获取相同元素名的节点列表对象数组HTMLCollection(NodeList)
> getElementsByTagName()方法将返回一个对象<b>数组</b> HTMLCollection(NodeList)集合，这个数组保存着所有相同元素名的节点列表，参数传递标签名。
> ``` javascript
> let element_a = document.getElementsByTagName('a');
> console.log(element_a);//返回页面上所以a元素的数组集合节点信息 
> console.log(element_a.length);
> console.log(element_a[0]);//集合第一个节点对象
> console.log(element_a.item(0));//用的较少，集合第一个节点对象
> console.log(element_a[0].innerText);
> console.log(typeof element_a);//object
> console.log(Array.isArray(element_a));//false 类比Set()集合
> 
> //方式一：for循环遍历
> for(let i=0;i<element_a.length;i++){
>     console.log('a元素的文本内容',element_a[i].innerText);//函数剩余参数(章节13第6个知识点)
> }
> 
> //方式二：展开运算符
> [...element_a].forEach(element => {
>     // console.log('a元素信息',element);
>     console.log('a元素的文本内容',element.innerText);
> });
> 
> 
> //获取body节点信息对象
> let body = document.getElementsByTagName('body');
> // console.log(body);// HTMLCollection [body]
> console.log(body[0]);// 返回body的节点信息对象
> console.log(document.getElementsByTagName('body')[0]);
> 
> //通配符 * 
> let $elements = document.getElementsByTagName('*');
> console.log('获取所有元素节点信息',$elements);
> ```
> ### ⑤ getElementsByName()方法 - 获取相同名称(name)的元素，返回一个对象数组HTMLCollection(NodeList)
> ``` javascript
> let elename  = document.getElementsByName('viewport');
> console.log(elename);
> 
> //给导航栏a元素加上name="navigate"
> let ele_a = document.getElementsByName('navigate');
> console.log(ele_a);
> //操作方式和上面的getElementsByTagName一样
> console.log(ele_a[0].innerText);
> ```
> 此方法多用于表单组件
> 
> ### ⑥ getElementsByClassName()方法 - 获取class类名称的元素，返回一个对象数组HTMLCollection(NodeList)
> ``` javascript
> let ele_classname = document.getElementsByClassName('flex');
> console.log(ele_classname);
> //操作方式和上面的getElementsByTagName一样
> ```
> 小结：<br/>
> getElementById() 返回指定id属性的元素节点对象
> getElementsByTagName()/getElementsByName()/getElementsByClassName()方法，返回一个类似数组的对象节点集合

### Ⅱ、querySelector系列
> ### ① querySelector()方法 - 接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点
> 关于css的选择器，我们在第一学期（上一套课程已经重点讲了），我们这里看一下怎么操作
> ``` javascript
> let ele_id = document.querySelector('#main_business');
> console.log(ele_id);
> let ele_classname = document.querySelector('.flex');
> console.log(ele_classname);//获取了一个
> ```
> ### ② querySelectorAll()方法 - 接受一个 CSS 选择器作为参数，返回一个NodeList对象，包含所有匹配给定选择器的节点
> ``` javascript
> let ele_classname = document.querySelectorAll('.flex');
> console.log(ele_classname);//获取所有
> let ele_tagname = document.querySelectorAll('a');
> console.log(ele_tagname);
>
> let ele_name1 = document.querySelectorAll('[name="navigate"]');
> console.log(ele_name1);
> let ele_name2 = document.querySelectorAll('#nav a');
> console.log(ele_name2);
> ```
getElement系列与querySelector系列区别：<br/>
> 1、两者的W3C标准不同 <br/>
>    querySelector系列属于W3C中的Selectors API(JS)规范<br/>
>    getElementsBy系列则属于 W3C的DOM 规范。<br/>
> 2、两者浏览器的兼容不同<br/>
>    getElementsBy系列基本能被所有浏览器支持。<br/>
>    querySelector系列IE8以下浏览器不支持（尽管现在已经无需考虑兼容性了，这个区别还是要知道）<br/>
> 3、针对我们开发者，重点需要知道：<br/>
>    ① getElement返回动态集合，是document的方法；性能较好，一般情况下优先使用；接收的参数只能是简单的className、tagName,name,id；<br/>
>    ② querySelector返回静态集合，是element的方法，css Selector的API，接收的参数是一个CSS选择器<br/>
>    ③ getElement比querySelector的性能好，优先使用，但是当选择器比较复杂(多层嵌套的)再考虑使用querySelector；<br/>
关于getElement系列与querySelector系列更多区别，我们在实际开发中，根据实际开发体验，在给大家进一步讲解，让大家更好的理解。



### Ⅲ、属性操作系列
> ### ① getAttribute()方法 - 属性操作方法：获取元素中某个属性的值
> ``` javascript
> let ele = document.getElementById('nav');
> //给元素加上data="123"
> console.log(ele);
> console.log(ele.data);//undefined
> console.log(ele.getAttribute('data'));
> console.log(ele.style);//CSSStyleDeclaration css样式声明（对象）
> console.log(ele.getAttribute('style'));//字符串 推荐使用自定义获取元素属性值
> ```
> ### ② setAttribute()方法 - 属性操作方法：将设置元素中某个属性和值，要接受两个参数：属性名和值
> ``` javascript
> let ele = document.getElementById('nav');
> ele.setAttribute('data',456);
> console.log(ele.getAttribute('data'));//456
> ele.setAttribute('class','mystyle');
> ```
> ### ③ removeAttribute()方法 - 属性操作方法：以移除元素属性
> ``` javascript
> let ele = document.getElementById('nav');
> ele.removeAttribute('class');
> ```
> 关于属性操作方法，重点需要理解元素属性是什么，不需要记，重在理解，理解了元素属性那么操作元素属性的获取、设置、移除就容易理解了。

### Ⅳ、 node节点属性: nodeName、nodeType、nodeValue
> 节点可以分为元素节点、属性节点和文本节点，而这些节点又有三个非常有用的属性，分别为：nodeName、nodeType 和 nodeValue。<br/><br/>
> <b>节点属性</b>
> |  节点类型              |  nodeName                              |   nodeType              |  nodeValue              |   
> |   :--:                |   :--:                                 |    :--:                 | :--:                    | 
> |  元素                 |  元素名称                               |    1                    | null                    |
> |  属性                 |  属性名称                               |    2                    | 属性值                   |
> |  文本                 |  #text                                 |    3                    | 文本内容(不包含 html)      |
> ``` javascript
> let ele  =  document.getElementById('nav');
> console.log(ele);
> console.log(ele.nodeName);//获取元素节点的标签名，和tagName等价
> console.log(ele.nodeType);//获取元素节点的类型值，1
> console.log(ele.nodeValue);//元素节点本身没有内容，null
> //node本身把节点指针放在元素<div>xxx</div>上，也就是说，本身是没有value
> //如果要输出<div>xxx</div>里面的文本内容，用前面讲的innerText
> console.log(ele.innerText);//获取元素节点里面的文本内容
> //也就是说，node只能获取当前节点的信息，不能获取它里面的信息
> ```
### Ⅴ、 层次节点属性
> 节点的层次结构可以划分为：父节点与子节点、兄弟节点这两种。当我们获取其中一个元素节点的时候，就可以使用层次节点属性来获取它相关层次的节点。
> ### ① childNodes：获取当前元素节点的所有子节点，包含元素子节点和文本子节点
> ``` javascript
> <div title="属性节点" id="mydiv">测试Div<span>我是span</span>老三</div>
> let $div = document.getElementById('mydiv');
> console.log('$div信息', $div);
> console.log($div.innerHTML);
> console.log($div.innerText);
> // console.log($div.childNodes);//NodeList集合，返回当前元素节点所有的子节点列表
> // console.log($div.childNodes.length);//3个子节点
> // 第一个子节点：测试Div，这个节点称为：文本节点
> // 第二个子节点：<span>我是span</span>，这个节点称为：元素节点
> // 第三个子节点：老三，这个节点称为：文本节点
> 
> console.log($div.childNodes[0]);
> console.log($div.childNodes[0].nodeValue);//"测试Div"
> console.log($div.childNodes[0].nodeName);//"#text"
> console.log($div.childNodes[0].nodeType);//3
> 
> //赋值
> $div.innerHTML = '测试Div<b>OK啦</b><span>我是span</span>老三';
> $div.childNodes[0].nodeValue = '测试Div<b>OK啦</b>';//不能解析html
> //由此可见，innerHTML比nodeValue用得多一些
> //childNodes主要用于分析子节点，然后用于操作子节点，这个下节课讲
> ```
> ### ② firstChild 和 lastChild 属性
> firstChild 用于获取当前元素节点的第一个子节点，相当于 childNodes[0]；lastChild 用于获取当前元素节点的最后一个子节点，相当于 childNodes[xxx.childNodes.length - 1]
> ``` javascript
> //第一个
> console.log($div.childNodes[0].nodeValue);
> console.log($div.firstChild);
> console.log($div.firstChild.nodeValue);
> 
> //最后一个
> console.log($div.childNodes[3-1].nodeValue);
> console.log($div.lastChild);
> console.log($div.lastChild.nodeValue);
> //可类比我们的css选择器，但是注意写法
> ```
> 
> ### ③ ownerDocument 属性：返回该节点的文档对象根节点，返回的对象相当于 document
> ``` javascript
> console.log($div.ownerDocument === document); //true，根节点
> console.log($div.ownerDocument);
> ``` 
> 
> ### ④ parentNode 属性返回该节点的父节点，previousSibling 属性返回该节点的前一个同级节点，nextSibling 属性返回该节点的后一个同级节点
> ``` javascript
> //parentNode 属性返回该节点的父节点
> console.log($div.parentNode.nodeName);//BODY
> //previousSibling 属性返回该节点的前一个同级节点
> console.log($div.previousSibling);
> console.log($div.previousSibling.innerHTML);
> //nextSibling 属性返回该节点的后一个同级节点
> console.log($div.nextSibling);
> console.log($div.nextSibling.innerHTML);
> ```
> 注意空白文本节点
> ### ⑤ 忽略空白文本节点
> 如果 firstChild、lastChild、previousSibling 和 nextSibling 在获取节点的过程中遇到空白节点，我们该怎么处理掉呢？
> ``` javascript
> <div id="mydiv" class="bbb">
>         <p>测试Div</p>
>         <span>我是span</span>
>         <strong>老三</strong>
> </div>
> console.log($div.childNodes.length);
> console.log($div.childNodes[0].innerText);//undefined 因为第一个子节点是空白字符节点
> console.log($div.firstChild.innerText);
> 
> //移除空白文本节点方法
> function removeWhiteNode(nodes) {
>     for (var i = 0; i < nodes.childNodes.length; i ++) {
>         if (nodes.childNodes[i].nodeType === 3 &&
>            /^\s+$/.test(nodes.childNodes[i].nodeValue)) {
>                nodes.childNodes[i].parentNode.removeChild(nodes.childNodes[i]);
>         }
>      }
>      return nodes;
>  }
> 
>  let _$div = removeWhiteNode($div);
>  console.log(_$div.childNodes.length);
>  console.log(_$div.childNodes[0].innerText);
> ``` 
> ### ⑥ attributes 属性：返回该节点的属性节点集合
> ``` javascript
> console.log($div.attributes); //NamedNodeMap,属性节点集合
> console.log($div.attributes.length);//返回属性节点个数  1
> console.log($div.attributes[0]); //第一个属性节点
> console.log($div.attributes[0].nodeType); //2，节点类型
> console.log($div.attributes[0].nodeValue); //mydiv  属性值
> console.log($div.attributes['id']); // 返回属性为 id 的节点
> console.log($div.attributes.getNamedItem('id')); // 返回属性为 id 的节点
> //注意跟我们之前讲的：属性操作系列：getAttribute()方法有相同功能，所以这两个方法大家根据自己的喜好使用
> ```

## 3、操作节点
> ### ① document.write()方法[非节点操作方法]：可以把任意字符串插入到文档中去
> ``` javascript
> let t = `<div id="mydiv" data="123">
> <p>测试Div</p>
> <span>我是span</span>
> <strong>老三</strong>
> </div>`;
> document.write(t);//一般用于测试
> ```
> ### ② createElement()方法：创建一个元素节点，appendChild()方法：将一个新节点添加到某个节点的子节点列表的末尾上
> ``` javascript
> let p = document.createElement('p');//只是创建了一个元素p,还没有添加到文档中去，只是驻留在内存中
> let $div = document.getElementById('mydiv');
> $div.appendChild(p);//把新元素节点<p>添加子节点末尾
> //只是添加了一个空元素p，怎么往里面添加内容呢？
> ```
> ### ③ createTextNode()方法：创建一个文本节点
> ``` javascript
> let p = document.createElement('p');//只是创建了一个元素p,还没有添加到文档中去，只是驻留在内存中
> let $div = document.getElementById('mydiv');
> $div.appendChild(p);//把新元素节点<p>添加子节点末尾
> let text = document.createTextNode('你个老六');//创建一个文本节点
> p.appendChild(text);//将文本节点添加到p元素里面节点末尾
> $div.appendChild(text);//将文本节点添加到元素节点末尾
> ```
> ### ④ insertBefore()方法：可以把节点创建到指定节点的前面（先找到它的父节点再操作）
> ``` javascript
> let $div = document.getElementById('mydiv');
> let p = document.createElement('p');
> //注意写法：将新增的p元素放到div元素前面，首先找到div的父节点，在操作
> $div.parentNode.insertBefore(p,$div);//参数1：新节点，参数2：放在谁的前面
> ```
> ### ⑤ 模拟在指定节点的后面添加一个节点
> ``` javascript
> function insertAfter(newElement, targetElement) {
>     //得到父节点
>     let parent = targetElement.parentNode;
>     //如果最后一个子节点是当前元素，那么直接添加即可
>     if (parent.lastChild === targetElement) {
>         parent.appendChild(newElement);
>     } else {
>         //否则，在当前节点的下一个节点之前添加
>         parent.insertBefore(newElement, targetElement.nextSibling);
>     }
> }
> let $div = document.getElementById('mydiv');
> let p = document.createElement('p');
> insertAfter(p,$div);
> ```
> ### ⑥ repalceChild()方法：把节点替换成指定的节点（先找到它的父节点再操作）
> ``` javascript
> let $div = document.getElementById('mydiv');
> let p = document.createElement('p');
> //同样需要先找到父节点，然后再操作替换
> $div.parentNode.replaceChild(p,$div);//参数1：新节点，参数2：替换谁
> ```
> ### ⑦ cloneNode()方法：把节点复制一份，放到指定地方
> ``` javascript
> let banner = document.getElementById('banner');
> let banner_clone = banner.cloneNode(true);//true 表示复制内容，false只复制标签
> let $div = document.getElementById('mydiv');
> // $div.appendChild(banner_clone);
> $div.parentNode.replaceChild(banner_clone,$div);
> ```

> ### ⑧ removeChild()方法：删除指定节点（先找到它的父节点再操作）
> ``` javascript
> function removeWhiteNode(nodes) {
>     for (var i = 0; i < nodes.childNodes.length; i ++) {
>         if (nodes.childNodes[i].nodeType === 3 &&
>            /^\s+$/.test(nodes.childNodes[i].nodeValue)) {
>                nodes.childNodes[i].parentNode.removeChild(nodes.childNodes[i]);
>         }
>      }
>      return nodes;
>  }
> 
> let $div = document.getElementById('mydiv');
> // $div.parentNode.removeChild($div);
> $div.removeChild(removeWhiteNode($div).lastChild);
> ```
## 4、DOM 类型、扩展、操作内容
> 本知识点主要是让大家了解一些概念问题，以了解为准。DOM 自身存在很多类型，在我们前面几节课大部分都有所接触，比如 Element 类型：表示的是元素节点，再比如 Text 类型：表示的是文本节点。DOM 也提供了一些扩展功能。
### Ⅰ、DOM 类型
> |  类型名                |  说明                                  | 
> |   :--:                |   :--:                                 |    
> |  Document             |  表示文档类型                           | 
> |  Element              |  表示元素节点类型                       | 
> |  Text                 |  表示文本节点类型                       | 
> |  Comment              |  表示文档中的注释类型                   | 
> |  CDATASection         |  表示 CDATA 区域类型                   | 
> |  DocumentType         |  表示文档声明类型                      | 
> |  DocumentFragment     |  表示文档片段类型                      | 
> |  Attr                 |  表示属性节点类型                      |   
> |  Node                 |  表示所有类型值的统一接口，IE 不支持      |  
> ### ① Document类型补充
> Document 类型表示文档，或文档的根节点，而这个节点是隐藏的，没有具体的元素标签。
> ``` javascript
> console.log(document);
> console.log(document.childNodes[0]);//DocumentType，第一个子节点对象
> console.log(document.childNodes[1]); //HTMLHtmlElement
> console.log(document.childNodes[1].nodeName); //HTML
> ``` 
> ### 获取html节点对象
> ``` javascript
> console.log(document.childNodes[1]);
> //还有一种获取<html>标签的元素节点对象 HTMLHtmlElement的方式
> console.log(document.documentElement);
> ```
> ### 获取body节点对象
> ``` javascript
> console.log(document.getElementsByTagName('body')[0]);
> console.log(document.body);
> ```
> ### 获取文档声明：DOCTYPE对象
> ``` javascript
> console.log(document.doctype);
> ```
> ### 其他属性:document.title-获取和设置title标签的值
> ``` javascript
> console.log(document.title);
> document.title = '睿晨电网建设网站标题'; 
> ```
> ### 其他属性:document.URL-获取 URL 路径
> ``` javascript
> console.log(document.URL);
> ```
> ### 其他属性:document.domain-获取域名，服务器端
> ``` javascript
> console.log(document.domain);
> ```
> ### 其他属性:document.referrer-获取上一个 URL，服务器端
> ``` javascript
> console.log(document.referrer);
> ```
> ### 对象集合:document.anchors-获取带name属性的a元素集合
> ### 对象集合:document.links-获取带 href 属性的a元素集合
> ### 对象集合:document.forms-获取文档中form元素集合
> ### 对象集合:document.images-获取文档中img元素集合
> ``` javascript
> //属性
> console.log(document);
> // console.log(document.title); //获取和设置<title>标签的值
> // console.log(document.URL); //获取 URL 路径
> // console.log(document.domain); //获取域名，服务器端
> // console.log(document.referrer); //获取上一个 URL，服务器端
> 
> //对象集合
> document.anchors; //获取文档中带name属性的<a>元素集合
> document.links; //获取文档中带 href 属性的<a>元素集合
> document.forms; //获取文档中<form>元素集合
> document.images; //获取文档中<img>元素集合
> ```
>
> ### ② Text类型补充
> ### 1. normalize()方法：把两个同邻的文本节点合并在一起
> ``` javascript
> <div id="mydiv">迪丽热巴迪力木拉提</div>
> let mydiv = document.getElementById('mydiv');
> //console.log(mydiv.childNodes.length);
> let text1 = document.createTextNode('迪丽热巴');
> let text2 = document.createTextNode('迪力木拉提');
> mydiv.appendChild(text1);
> mydiv.appendChild(text2);
> console.log(mydiv.childNodes.length);
> //把两个同邻的文本节点合并在一起使用 normalize()即可
> mydiv.normalize();
> console.log(mydiv.childNodes.length);
> ```
> ### 2.splitText(num)方法：实现节点分离
> ``` javascript
> //分离
> console.log(mydiv.childNodes[0]);
> let sp = mydiv.childNodes[0].splitText(2);
> console.log(sp);
> console.log(mydiv.childNodes[0].nodeValue);//迪丽
> console.log(mydiv.childNodes[1].nodeValue);//热巴迪力木拉提
> ```
> ### 3. deleteData删除字符，insertData插入字符，replaceData替换字符，substringData获取字符
> ``` javascript
> <div id="mydiv">迪丽热巴迪力木拉提</div>
> let mydiv = document.getElementById('mydiv');//迪丽热巴迪力木拉提
> //console.log(mydiv.childNodes[0]);
> console.log(mydiv.firstChild);
> //删除从 0 位置的 2 个字符
> mydiv.firstChild.deleteData(0,2);
> console.log(mydiv.firstChild.nodeValue); //热巴迪力木拉提
> //从 0 位置添加指定字符
> mydiv.firstChild.insertData(0,'Hello.')
> console.log(mydiv.firstChild.nodeValue);//Hello.热巴迪力木拉提
> //从 0 位置替换掉 2 个指定字符
> mydiv.firstChild.replaceData(0,2,'Miss')
> console.log(mydiv.firstChild.nodeValue);//Missllo.热巴迪力木拉提
> //从 0 位置获取 2 个字符，直接输出
> console.log(mydiv.firstChild.substringData(0,2)); //Mi
> ```

### Ⅱ、DOM 扩展
> DOM 扩展部分提供了一些前面没有讲到的属性和方法，用来扩展我们的DOM的功能
> ### ① document.compatMode：返回 CSS1Compat（标准模式）
> 混杂模式IE浏览器则返回 BackCompat（之前为了区别IE8之前的浏览器）了解一下即可，现在用不上了。
> ### ② scrollIntoView() 让指定节点滚动到可见区域内（一般和滚动事件一起使用）
> ``` javascript
> <div id="mydiv" style="height: 500px;background-color: red;">迪丽热巴迪力木拉提</div>
> document.getElementById('mydiv').scrollIntoView();
> ```
> ### ③ children 属性：过滤掉空白节点，得到有效子节点
> 前面之所以没有讲，是因为在以前这个属性不兼容，现在已经全部兼容了，所以这个属性也非常好用。
> ``` javascript
> <div id="mydiv">
>     <p>迪丽热巴</p>
>     <strong>迪力木拉提</strong>
> </div>
> let mydiv = document.getElementById('mydiv');
> console.log(mydiv);
> console.log(mydiv.childNodes.length);
> console.log(mydiv.children);
> console.log(mydiv.children.length);
> console.log(mydiv.children[0].innerText);
> ``` 
> ### ④ contains()方法：判断一个节点是不是另一个节点的后代,用于子节点和父节点的判断
> ``` javascript
> <div id="mydiv">
>     <p>迪丽热巴</p>
>     <strong>迪力木拉提</strong>
> </div>
> let mydiv = document.getElementById('mydiv');
> let _p = mydiv.children[0];
> console.log(mydiv.contains(_p));//true
> let body = document.body;
> console.log(mydiv.contains(body));//false
> ``` 

### Ⅲ、DOM操作网页内容：innerText、innerHTML、outerText、outerHTML
> ``` javascript
> <div id="mydiv">
>     <p>迪丽热巴</p>
>     <strong>迪力木拉提</strong>
> </div>
> let mydiv = document.getElementById('mydiv');
> console.log(mydiv);
> console.log('innerText的结果：', mydiv.innerText);
> console.log('innerHTML的结果：', mydiv.innerHTML);
> console.log('outerText的结果：',mydiv.outerText);
> console.log('outerHTML的结果：',mydiv.outerHTML);
> 
> //赋值
> mydiv.innerHTML = '<b>老六</b>';
> ```
说明：最常用的使用innerHTML，因为在设置 innerHTML 时，会创建一个 HTML 解析器。这个解析器是浏览器级别的(C++编写)，因此执行 JavaScript 会快的多。

















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