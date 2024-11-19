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

##  5、DOM实战：操作表格
### Ⅰ、DOM创建表格
> ``` javascript
> //表格html---更为复杂的表格，我们实战中在讲解
> // <table border="边框线的宽度" align="表格在页面中的对齐方式:left/center/right" 
> // bgcolor="表格的背景色" background="背景图片" 
> // cellpadding="单元格内容和边框之间的距离" cellspacing="单元格之间的距离"></table>
> //<caption></caption>：表示表格的标题
> //<thead></thead>：语义标签，表示表格的头部
> //<tr align="行的对齐方式:left/center/right"  bgcolor="行的背景色" background="设置背景图片"></tr>：表示表格的行，一个tr代表一行
> //<th width="列宽"></th>：表示列头，文字会自动加粗、自动居中，是特殊的单元格
> //<tbody></tbody>：语义标签，表示表格的主体部分
> //<td align="单元格的水平对齐方式:left/center/right" valign="单元格的垂直对齐方式:top/bottom"></td>：表示表格中的单元格
> //<td colspan="单元格要合并几列"  rowspan="单元格要合并几行"></td>
> //<tfoot></tfoot>: 语义标签，表示表格的底部
> <table border="1" align="center" cellspacing="0" cellpadding="10">
>     <caption>人员表</caption>
>     <thead>
>         <tr>
>             <th>姓名</th>
>             <th>性别</th>
>             <th>体重</th>
>         </tr>
>     </thead>
>     <tbody>
>         <tr>
>             <td>迪丽热巴</td>
>             <td>女</td>
>             <td>100斤</td>
>         </tr>
>         <tr>
>             <td>梁咏琪</td>
>             <td>女</td>
>             <td>110斤</td>
>         </tr>
>     </tbody>
>     <tfoot>
>         <tr>
>             <td colspan="3">合计：3</td>
>         </tr>
>     </tfoot>
> </table>
> 
> //使用 DOM 来创建这个表格
> // 创建表格
> let table = document.createElement('table');
> table.setAttribute('border',1);
> table.setAttribute('align','center');
> table.setAttribute('cellpadding',10);
> table.setAttribute('cellspacing',0);
> 
> //设置表格标题
> let caption = document.createElement('caption');
> table.appendChild(caption);
> caption.appendChild(document.createTextNode('人员表'));
> 
> //表格头部
> let thead = document.createElement('thead');
> table.appendChild(thead);
> //头部行
> let tr = document.createElement('tr');
> thead.appendChild(tr);
> //头部列头
> let th1 = document.createElement('th');
> let th2 = document.createElement('th');
> let th3 = document.createElement('th');
> tr.appendChild(th1);
> th1.appendChild(document.createTextNode('姓名'));
> tr.appendChild(th2);
> th2.appendChild(document.createTextNode('年龄'));
> tr.appendChild(th3);
> th3.appendChild(document.createTextNode('体重'));
> 
> //主体部分
> let tbody = document.createElement('tbody');
> table.appendChild(tbody);
> //主体部分第一行
> let tbody_tr = document.createElement('tr');
> tbody.appendChild(tbody_tr);
> //每行数据
> let td1 = document.createElement('td');
> let td2 = document.createElement('td');
> let td3 = document.createElement('td');
> tbody_tr.appendChild(td1);
> td1.appendChild(document.createTextNode('迪丽热巴'));
> tbody_tr.appendChild(td2);
> td2.appendChild(document.createTextNode('女'));
> tbody_tr.appendChild(td3);
> td3.appendChild(document.createTextNode('100斤'));
> 
> //主体部分第二行（实际开发我们会使用for循环遍历数据库数据）
> let tbody_tr_2 = document.createElement('tr');
> tbody.appendChild(tbody_tr_2);
> //每行数据
> let td1_2 = document.createElement('td');
> let td2_2 = document.createElement('td');
> let td3_2 = document.createElement('td');
> tbody_tr_2.appendChild(td1_2);
> td1_2.appendChild(document.createTextNode('梁咏琪'));
> tbody_tr_2.appendChild(td2_2);
> td2_2.appendChild(document.createTextNode('女'));
> tbody_tr_2.appendChild(td3_2);
> td3_2.appendChild(document.createTextNode('110斤'));
> 
> //底部
> let tfoot = document.createElement('tfoot');
> table.appendChild(tfoot);
> let tfoot_tr = document.createElement('tr');
> tfoot.appendChild(tfoot_tr);
> let tfoot_td = document.createElement('td');
> tfoot_td.setAttribute('colspan',3);
> tfoot_tr.appendChild(tfoot_td);
> tfoot_td.appendChild(document.createTextNode('总计：2人'));
> 
> //放到主营业务前面
> let main_business = document.getElementById('main_business');
> document.body.insertBefore(table,main_business);
> ```
说明：在一个表格中\<thead\>和\<tfoot\>是唯一的，只能有一个。而\<tbody\>不是唯一的可以有多个，这样导致最后返回的\<thead\>和\<tfoot\>是元素引用，而\<tbody\>返回的是元素集合。

### Ⅱ、 HTML DOM 来操作表格
> \<table>标签是 HTML 中结构最为复杂的一个，我们可以通过 DOM 来创建生成它，或者 HTML DOM 来操作它.
> ### ① 获取表格元素对象
> ``` javascript
> //获取表格元素对象
> let table = document.getElementsByTagName('table')[0];
> console.log(table);
> ```
> ### ② 获取表格的标题对象\<caption>
> ``` javascript
> let table = document.getElementsByTagName('table')[0];
> console.log(table.children[0]);
> console.log(table.children[0].innerHTML); //获取 caption 的内容
> console.log(table.caption.innerHTML);
> ``` 
> ### ③ 获取表头表尾\<thead>、\<tfoot>、\<tbody>
> ``` javascript
> console.log(table.tHead); //获取表头
> console.log(table.tFoot); //获取表尾
> console.log(table.tBodies); //获取表体的集合
> ```
> ### ④ 获取表格的行数
> ``` javascript
> console.log(table.rows);
> console.log(table.rows.length); //获取行数的集合，数量
> ```
> ### ⑤ 获取表格主体里的行数
> ``` javascript
> console.log(table.tBodies[0].rows.length); //获取主体的行数的集合，数量
> ```
> ### ⑥ 获取表格主体内第一行的单元格数量(tr)
> ``` javascript
> console.log(table.tBodies[0].rows[0].cells.length); //获取第一行单元格的数量（列数）
> ```
> ### ⑦ 获取表格主体内第一行第一个单元格的内容(td)
> ``` javascript
> console.log(table.tBodies[0].rows[0].cells[0].innerHTML); //获取第一行第一个单元格的内容
> ```
> ### ⑧ 删除标题、表头、表尾、行、单元格
> ``` javascript
> table.deleteCaption(); //删除标题
> table.deleteTHead(); //删除<thead>
> table.deleteTFoot(); //删除<tfoot>元素
> table.tBodies[0].deleteRow(0); //删除<tr>一行
> table.tBodies[0].rows[0].deleteCell(0); //删除<td>一个单元格
> ```
> ### ⑨ HTML DOM 创建一个表格
> ``` javascript
> let table = document.createElement('table');
> table.setAttribute('border',1);
> table.setAttribute('align','center');
> table.setAttribute('cellpadding',10);
> table.setAttribute('cellspacing',0);
> 
> //表格标题
> table.createCaption().innerHTML = '人员表';
> 
> //表格头部
> let thead = table.createTHead();
> let tr = thead.insertRow(0);//插入一行
> let td = tr.insertCell(0);//插入一列
> td.appendChild(document.createTextNode('姓名'));
> let td2 = tr.insertCell(1);
> td2.appendChild(document.createTextNode('性别'));
> let td3 = tr.insertCell(2);
> td3.appendChild(document.createTextNode('体重'));
> 
> //主体部分
> let tbody = table.createTBody();
> let tbody_tr = tbody.insertRow(0);//插入一行
> let tbody_td = tbody_tr.insertCell(0);//插入一列
> tbody_td.appendChild(document.createTextNode('迪丽热巴'));
> let tbody_td2 = tbody_tr.insertCell(1);
> tbody_td2.appendChild(document.createTextNode('女'));
> let tbody_td3 = tbody_tr.insertCell(2);
> tbody_td3.appendChild(document.createTextNode('100斤'));
> 
> //表格底部
> let tfoot = table.createTFoot();
> let tfoot_tr = tfoot.insertRow(0);//插入一行
> let tfoot_td = tfoot_tr.insertCell(0);//插入一列
> tfoot_td.setAttribute('colspan',3);
> tfoot_td.appendChild(document.createTextNode('总计：2人'));
> 
> //放到主营业务前面
> let main_business = document.getElementById('main_business');
> document.body.insertBefore(table,main_business);
> ```
> 关于创建表格，DOM和 HTML DOM，我们都讲了，大家觉得哪种简单用哪种。  

##  6、操作CSS样式
### ① 检测浏览器是否支持css1/css2/css3级的能力
> ``` javascript
> console.log(document);
> console.log('DOM1 级 CSS 能力：' + document.implementation.hasFeature('CSS', '2.0'));
> console.log('DOM2 级 CSS 能力：' + document.implementation.hasFeature('CSS2', '2.0'));
> console.log('DOM3 级 CSS 能力：' + document.implementation.hasFeature('CSS3', '2.0'));
> ```
### ② 行内样式style的获取、赋值、移除属性removeProperty
> ``` javascript
> let banner = document.getElementById('banner');
> //获取行内样式
> console.log(banner);
> console.log(banner.style);//CSSStyleDeclaration css样式对象
> console.log(banner.style.margin-top); //  NaN 
> //写法一：对象写法，但注意：-去掉，后面的字母大写（驼峰式写法）
> console.log(banner.style.marginTop);  //  100px
> //写法二：类数组写法：
> console.log(banner.style['margin-top']);
> 
> console.log(banner.style.cssText);    // "margin-top: 100px;"
> 
> //赋值行内样式
> banner.style.paddingTop = '300px';
> banner.style['padding-top'] = '500px';
> banner.style.background = 'red';
> 
> //移除一个行内样式属性removeProperty
> banner.style.removeProperty('background');
> ```

### ③ 计算后的样式获取(行内、内联、外联样式)：window 对象下getComputedStyle()方法
> 接受两个参数，需要计算的样式元素，第二个伪类(:hover)，如果没有伪类，就填 null。
> ``` javascript
> let banner = document.getElementById('banner');
> console.log(banner.style.fontSize);//空
> //事实上，我们页面呈现的样式，都是计算后的样式，虽然获取不到字体大小样式
> //但是如果你写了文字，文字默认大小是16px
> banner.appendChild(document.createTextNode('我是文字'));
> //可以看到文字大小是16px,它为啥不是20px,不是10px，这个就是计算后的样式
> //那么怎么获取呢？
> let style = window.getComputedStyle(banner,null);
> console.log(style);
> console.log(style.fontSize);//16px
> 
> //当然你可以赋值
> banner.style.fontSize = '200px';
> //计算后的样式，你可以理解成最终呈现的样式，如果你不设置字体大小，就按默认样式16px
> //你设置了字体大小，就按设置的字体大小展示
> console.log(style.fontSize);//200px
> ```

总结：样式获取与设置 <br/>
> 1. 设置样式，可以使用 元素.style.样式 = '样式值'; 如： banner.style.background = 'red';<br/>
> 2. 获取样式，如果你写了行内样式，想获取，可以直接：banner.style.background <br/>
> 3. 更多时候，我们获取样式，是获取计算后的样式，因为它不仅能获取默认样式，还可以获取行内、内联、外联样式表的样式；<br/>
> 为什么能获取内联和外联样式表的样式呢？因为你不管在哪里设置了css，最终都会驻留在浏览器的计算样式里面，所以可以获取.


## 7、操作页面样式
> 上一节课，我们讲了如何获取行内、及计算后的样式，以及赋值行内样式，移除某个行内样式，本节课我们看一下在我们常规开发中，如何操作我们的页面样式。
### ① className关键字设置样式
> className赋值，会清空之前元素class里面的所有类样式
> ``` javascript
> let spanch = document.querySelectorAll('.span-ch');
> console.log(spanch);
> console.log(spanch[0].className);//span-ch
> spanch[0].className = 'py-5';//发现py-5类名加上了，以前的类名没有了
> //我们知道，类名是可以叠加使用的 'span-ch py-5'
> spanch[0].className = 'span-ch py-5';
> spanch[0].className = 'span-ch py-5 bg-light';
> //发现这样写，会非常冗余，当类名多的时候，越写越冗余，能不能我只想添加bg-light，以前的span-ch py-5不要写了
> //同样，删除那个类名，比如bg-light，还要在写 span-ch py-5，能不能我想添加那个就写哪个，删除那个就写哪个
> //之前写的不要带着写？比如添加：addClass('py-5');addClass('bg-light');
> //比如移除: removeClass('bg-light'); removeClass('py-5');
> ```
我们可以写几个函数，完成上面的功能：
> 以下函数不需要记，只需要知道，我们后面也有其他方式做这件事情，同学们只需要先知道
### ② hasClass() 判断是否存在某个类名
> ``` javascript
> function hasClass(element, className) {
>     return !!element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
> }
> let spanch = document.querySelectorAll('.span-ch')[0];
> console.log(hasClass(spanch,'span-ch'));//true
> console.log(hasClass(spanch,'py-5'));//false
> ```
### ③ addClass() 如果不存在的这个类名，添加这个类名
> ``` javascript
> function hasClass(element, className) {
>     return !!element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
> }
> function addClass(element, className) {
>     if (!hasClass(element, className)) {
>         element.className += " "+className;
>     }
> }
> 
> let spanch = document.querySelectorAll('.span-ch')[0];
> addClass(spanch,'py-5');
> addClass(spanch,'mb-5');
> ```
### ④ removeClass() 如果存在的这个类名，删除这个类名
> ``` javascript
> function hasClass(element, className) {
>     return !!element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
> }
> function removeClass(element, className) {
>     if (hasClass(element, className)) {
>         element.className = element.className.replace(
>         new RegExp('(\\s|^)'+className+'(\\s|$)'),' ');
>      }
> }
> 
> let spanch = document.querySelectorAll('.span-ch')[0];
> removeClass(spanch,'span-ch');
> ```


## 8、操作CSS外联样式表.css文件
> 我们了解了一般开发中，操作页面样式，一般是改变元素的类名className,动态添加类名，删除类名等操作，接下来我们看一下，如何来操作我们的外联样式表，也就是我们的.css文件 <br/>
> 通过\<link>元素(外联样式表)和\<style>元素（内联样式表）包含的样式表，它的类型是：CSSStyleSheet 类型。获取方式如下：
> ``` javascript
> console.log(document.getElementsByTagName('link'));//HTMLCollection
> console.log(document.getElementsByTagName('style'));//HTMLCollection
> //获取第一个外联样式表
> console.log(document.getElementsByTagName('link')[0]); //HTMLLinkElement
> //获取第一个内联样式
> console.log(document.getElementsByTagName('style')[0]); //HTMLStyleElement
> ```
### ① 获取CSSStyleSheet，外联的css样式表对象
> ``` javascript
> //方式一：
> let link =  document.getElementsByTagName('link')[0];
> console.log(link);
> let sheet = link.sheet;
> console.log(sheet);//CSSStyleSheet 外联的css样式表对象
> 
> //方式二：推荐这个
> console.log(document.styleSheets);//StyleSheetList集合
> let _sheet = document.styleSheets[0];
> console.log(_sheet);//CSSStyleSheet 外联的css样式表对象
> ```
> 对照中控台打印的对象看一下属性方法
> ``` javascript
> _sheet.disabled; //false，可设置为 true，获取和设置样式表是否被禁用
> _sheet.href; //css 的 URL，如果是通过<link>包含的，则样式表为 URL，否则为 null
> _sheet.ownerNode;//指向拥有当前样式表节点的指针
> _sheet.title; //ownerNode 中 title 属性的值
> _sheet.media; //MediaList，集合，样式表支持的所有媒体类型的集合
> _sheet.media[0]; //第一个 media 的值
> _sheet.cssRules //CSSRuleList，样式表包含样式规则的集合
> _sheet.deleteRule(0); //删除第一个样式规则
> _sheet.insertRule("body {background-color:red}", 0); //在第一个位置添加一个样式规则
> ```
> 常用的几个
> ``` javascript
> let _sheet = document.styleSheets[0];
> console.log(_sheet);
> //_sheet.disabled = true;//禁用公共样式，页面错乱了
> 
> //http://192.168.0.147:81/2-1/index.html
> console.log(_sheet.cssRules);
> // console.log(_sheet.cssRules[0]);
> // console.log(_sheet.cssRules[0].cssText);//第一个样式规则
> // console.log(_sheet.cssRules[0].selectorText);//第一个样式规则的选择器
> // console.log(_sheet.cssRules[0].style);
> // console.log(_sheet.cssRules[0].style.cssText);//第一个样式规则的样式文本
> // console.log(_sheet.cssRules[0].style.display);
> //动态给第一个规则添加一个样式规则
> //_sheet.cssRules[0].style.background = 'red';
> //_sheet.cssRules[3].style.background = 'red';
> 
> //删除第一个样式规则
> //_sheet.deleteRule(0);
> //删除第三个样式规则
> //_sheet.deleteRule(2);
> 
> //插入第一个规则
> //第一个参数是样式，第二个参数是位置
> //_sheet.insertRule('body{background-color:red}',0);
> ```
> 在实际开发中，动态操作外联样式表.css文件里面的样式的，用得比较少，很多时候还是操作我们的行内样式，动态改变类名达到操作页面的效果。

但需要知道：三种操作 CSS 的方法，第一种 style 行内，可读取可设置；第二种行内、内联和外部链接，使用 getComputedStyle 可读取不可设置（因为它驻留浏览器计算样式里面）；第三种 cssRules，内联和外部链接
可读取可设置。

## 9、DOM元素尺寸（元素大小）和位置（元素位置）
我们在前面几节课已经讲了css是怎么获取和设置的，那么css可以获取到这个元素它设置的时候的css的大小，它并不能够获取到元素本身的实际大小，比如说这个css设置的是宽200px，那么你给它加了内边距或者边框，或者其它的一些属性，其实它的css的大小还是200px，那么并没有获取到元素的实际大小，所以本知识点需要理解页面中的某一个元素它的各种大小和各种位置的计算方式，以方便我们在页面上进行操作。
### Ⅰ、获取元素 CSS 大小回顾
> ### ① 通过 style 内联获取元素大小
> ``` javascript
> let banner = document.getElementById('banner');
> //style 获取行内css大小
> console.log(banner.style.width);//空  设置值
> console.log(banner.style.height);//空 设置值
> ```
> ### ② 通过计算getComputedStyle()方法获取元素大小 
> ``` javascript
> let banner = document.getElementById('banner');
> //通过计算getComputedStyle()方法获取元素大小
> let style = window.getComputedStyle(banner,null);
> console.log(style.width);
> console.log(style.height);
> //通过计算方法获取的宽度，不管你写还是没有写宽度，也不管你写在行内，内联，外联都可以获取
> ```
> ### ③ 通过 CSSStyleSheet 对象中的 cssRules属性获取元素大小（需将网页放到服务器上查看）
> ``` javascript
> //方式一：
> let link =  document.getElementsByTagName('link')[0];
> let sheet = link.sheet;
> console.log(sheet);//CSSStyleSheet 外联的css样式表对象
> 
> //方式二：推荐这个
> console.log(document.styleSheets);//StyleSheetList集合
> let _sheet = document.styleSheets[0];
> console.log(_sheet);//CSSStyleSheet 外联的css样式表对象
> 
> let rule = _sheet.cssRules[0];
> // rule.style.width
> // rule.style.height
> ```
以上的三种 CSS 获取元素大小的方法，只能获取元素的 CSS 大小，无法获取元素本身实际的大小。比如加上了内边距、滚动条、边框之类的。那么如何获取元素实际大小呢？

### Ⅱ、获取元素实际大小
> 回顾 <a href="/secondless/w-a/浏览器对象模型BOM及浏览器检测.html#_5、window对象-窗口页面的位置和大小" target="blank">14章_5、window对象：窗口页面的位置和大小_② 窗口页面的大小</a>
### ① clientWidth 和 clientHeight：获取可视区的元素大小，可以得到元素内容及内边距所占据的空间大小
> ``` javascript
>     <style>
>        
>         #banner{
>             /* overflow: scroll; */
>             padding: 20px;
>             width: 1200px;
>         }
>     </style>
> let banner = document.getElementById('banner');
> console.log(banner.clientWidth);//如：1200
> console.log(banner.clientHeight);//如：567
> console.log(typeof banner.clientHeight);//number
> ```
①、说明：<br/>
1、返回了元素大小，但没有单位，默认单位是 px<br/>
2、返回的数据类型是number，是数值，不是字符串<br/>
3、如果你强行设置了单位，比如 100em之类，它还是会返回 px 的大小。(CSS 获取的话，是照着你设置的样式获取)。<br/>
②、理解方式 ： 对于元素的实际大小，clientWidth 和 clientHeight 理解方式如下：<br/>
1.增加边框，无变化；<br/>
2.增加外边距，无变化；<br/>
3.<b>增加滚动条，最终值等于原本大小减去滚动条的大小（滚动条会减少元素的大小，不把滚动条的宽度高度算进去）</b>；<br/>
4.<b>增加内边距，最终值等于原本大小加上内边距的大小（内边距会增加元素的大小）</b>；<br/>

### ② scrollWidth 和 scrollHeight：获取滚动内容的元素大小
> ``` javascript
> <style>
>     #banner{
>         width: 200px;
>         border: 100px solid red;
>         margin: 100px;
>         padding: 100px;
>         overflow: scroll;
> 
>         height: 200px;
>     }
> </style>
> let banner = document.getElementById('banner');
> console.log(banner.scrollWidth);
> console.log(banner.scrollHeight);
> ```
①、说明：<br/>
1、返回了元素大小，但没有单位，默认单位是 px<br/>
2、返回的数据类型是number，是数值，不是字符串<br/>
3、如果没有设置任何 CSS 的宽和高度，它会得到计算后的宽度和高度（与getComputedStyle()方法获取元素大小一样）。<br/>
②、理解方式 ： 对于元素的实际大小，scrollWidth 和 scrollHeight 理解方式如下：<br/>
1.增加边框，无变化；<br/>
2.增加外边距，无变化；<br/>
3.<b>增加滚动条，最终值等于原本大小减去滚动条的大小（滚动条会减少元素的大小，不把滚动条的宽度高度算进去）</b>；<br/>
4.<b>增加内边距，最终值等于原本大小加上内边距的大小（内边距会增加元素的大小）</b>；<br/>
5. 增加内容溢出（出现滚动条），获取实际内容高度；<br/>
即，当元素出现滚动条的时候，用scrollWidth 和 scrollHeight：获取滚动内容的元素大小。

### ③ offsetWidth 和 offsetHeight：获取元素大小，包含边框、内边距和滚动条
> ``` javascript
> let banner = document.getElementById('banner');
> console.log(banner.offsetWidth);
> console.log(banner.offsetHeight);
> ```
①、说明：<br/>
1、返回了元素大小，但没有单位，默认单位是 px<br/>
2、返回的数据类型是number，是数值，不是字符串<br/>
3、如果没有设置任何 CSS 的宽和高度，它会得到计算后的宽度和高度（与getComputedStyle()方法获取元素大小一样）。<br/>
②、理解方式 ： 对于元素的实际大小，offsetWidth 和 offsetHeight 理解方式如下：<br/>
1.增加边框，最终值会等于原本大小加上边框大小<br/>
2.增加外边距，无变化；<br/>
3.增加内边距，最终值会等于原本大小加上内边距大小<br/>
4.增加滚动条，无变化，不会减小;<br/>

<b>说明：</b><br/>
对于元素大小的获取，一般是块级(block)元素并且以设置了 CSS 大小的元素较为方便。如果是内联元素(inline)或者没有设置大小的元素就尤为麻烦，所以，建议使用的时候注意。<br/>
<b style="color:#00A5F7;">在实际开发中，我们常用的是offsetWidth 和 offsetHeight。但是其他两组，还是需要了解一下。</b>


### Ⅲ、获取元素周边大小
### ① clientLeft 和 clientTop:获取元素设置了左边框和上边框的大小
> ``` javascript
> let banner = document.getElementById('banner');
> console.log('左边框', banner.clientLeft);
> console.log('上边框',banner.clientTop);
> //没有提供下边框和有边框，可以采用计算后的样式获取
> let style = window.getComputedStyle(banner,null);
> console.log('下边框',style.borderBottomWidth);
> console.log('右边框',style.borderRightWidth);
> ```

### ② offsetLeft 和 offsetTop：获取当前元素相对于父元素的位置
> 获取元素当前相对于父元素的位置，一般是当前元素使用了position:absolute;绝对定位使用这组属性。关于相对定位，绝对定位，我们在第一学期开发网页的时候已经讲得很清楚了，跟着我们一起学习过来的同学，对这个已经很了解了，不了解的同学，建议回去看一下我们第一学期的课程。

注意offsetLeft 和 offsetTop 加上边框和内边距不会影响它的位置，但加上外边据会累加。
> ``` javascript
> <style>
>     #banner{
>         width: 200px;
>         border: 100px solid red;
>         margin: 100px;
>         padding: 100px;
>         overflow: scroll;
> 
>         height: 200px;
> 
>         position: absolute;
>         top: 200px;
>         left: 200px;
>     }
> </style>
> 
> let banner = document.getElementById('banner');
> console.log(banner.offsetTop);
> console.log(banner.offsetLeft);
> //得到它的父元素
> console.log(banner.offsetParent);
> console.log(banner.offsetParent.tagName);//body
> ```
延伸一下：嵌套问题
> ``` javascript
> <style>
>     #pox{
>         width: 400px;
>         height: 400px;
>         background:blue;
>         position: absolute;
>         top: 50px;
>         left: 50px;
>     }
>     #box{
>         width: 200px;
>         height: 200px;
>         background: red;
>         margin: 10px;
>     }
> </style>
> <div id="pox">
>         <div id="box"></div>
> </div>
> let box = document.getElementById('box');
> console.log(box.offsetTop);//10
> console.log(box.offsetLeft);//10
> console.log(box.offsetParent.id);//pox
> //现在需要获取box距离body（页面口）的距离？10+50
> // 50 = box父元素pox距离它父元素的body距离
> console.log(box.offsetParent.offsetTop);//50
> 
> //两层我们好处理，如果嵌套了很多层，如何求最里面层距离页面口的距离呢？
> //以距离左边为例
> function offsetLeft(element) {
>     let left = element.offsetLeft; //得到第一层距离
>     let parent = element.offsetParent; //得到第一个父元素
>     while (parent !== null) { //如果还有上一层父元素
>         left += parent.offsetLeft; //把本层的距离累加
>         parent = parent.offsetParent; //得到本层的父元素
>     } //然后继续循环
>     
>     return left;
> }
> console.log(offsetLeft(box));
> ```

### ③ scrollTop 和 scrollLeft：这组属性可以获取滚动条被隐藏的区域大小（滚动条滚动高度宽度），也可设置定位到该区域（定位滚动条）
> ``` javascript
> #box{
>     width: 200px;
>     height: 200px;
>     overflow: scroll;
>     margin: 100px;
>     background-color: red;
> }
> let box = document.getElementById('box');
> console.log(box.scrollTop);//滚动条距离上边距离
> console.log(box.scrollLeft);//滚动条距离左边距离
> 
> //设置
> box.scrollTop = 100;
> 
> 
> //常用场景：获取页面滚动条
> //console.log(document.documentElement.scrollTop);
> 
> //设置页面滚动条
> // document.documentElement.scrollTop = 2000;
> // document.body.scrollTop = 2000;
> setTimeout(()=>{
>     document.documentElement.scrollTop = 2000;
> },50);
> ```

### ④ getBoundingClientRect()方法：返回一个矩形对象，包含四个属性：left、top、right和 bottom，分别表示元素各边与页面上边和左边的距离
> ``` javascript
> #box{
>     width: 200px;
>     height: 200px;
>     background: red;
>     /* margin: 100px; */
>     overflow: scroll;
> 
>     position: absolute;
>     top: 50px;
>     left: 50px;
> }
> 
> let box = document.getElementById('box'); //获取元素
> console.log('元素上边距离页面上边的距离', box.getBoundingClientRect().top); //元素上边距离页面上边的距离
> console.log('元素右边距离页面左边的距离', box.getBoundingClientRect().right); //元素右边距离页面左边的距离
> console.log('元素下边距离页面上边的距离', box.getBoundingClientRect().bottom); //元素下边距离页面上边的距离
> console.log('元素左边距离页面左边的距离', box.getBoundingClientRect().left); //元素左边距离页面左边的距离
> ```

## 10、动态加载脚本
> 当网站需求变大，脚本的需求也逐步变大。我们就不得不引入太多的 JS 脚本而降低了整站的性能，所以就出现了动态脚本的概念，在适时的时候加载相应的脚本。也就是有些页面我们要用到某个js,有些页面不需要用到这个js,我们可以利用动态加载js文件，满足我们的需求，最大可能的提高我们网站的性能。
### ① 动态加载js文件
> ``` javascript
> //动态添加js文件
> let script = document.createElement('script');
> script.type = 'text/javascript';
> script.src = './static/js/test.js';
> //document.head.appendChild(script); //document.head 表示<head>
> document.getElementsByTagName('head')[0].appendChild(script);
> 
> //写成一个方法
> function loadScript(url) {
>     var script = document.createElement('script');
>     script.type = 'text/javascript';
>     script.src = url;
>     //document.head.appendChild(script); //document.head 表示<head>
>     document.getElementsByTagName('head')[0].appendChild(script);
> }
> loadScript('./static/js/test.js');
> ```

### ② 动态加载样式表
> 为了动态的加载样式表，比如切换网站皮肤有两套样式表css文件，根据需求加载，我们就可以动态加载我们的\<link>标签。
> ``` javascript
> function loadStyles(url) {
>     let link = document.createElement('link');
>     link.rel = 'stylesheet';
>     link.type = 'text/css';
>     link.href = url;
>     document.getElementsByTagName('head')[0].appendChild(link);
> }
> loadStyles('./static/css/common.1.0.css');
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