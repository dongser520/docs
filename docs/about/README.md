---
navbar: true
sidebar: auto
title: markdown的基本语法示例
---

我在文件夹里面的about，关于markdown的基本语法：

1. 关于标题的语法
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

2. 段落格式

我是一个段落，
只是换了个行（shift+enter）


我是一个段落(回车)

我是二个段落



2. 引用
> 这是一段引用
2. 多行式引用
> 我在一楼
>> 我在2楼
>>> 我在3楼

3、 列表
有序列表:
1. 我是第一个列表
2. 我是第二个列表
3. 我是第三个列表

无序列表:
- 迪丽热巴
- 梁咏琪
- 刘德华
* ※号的无序列表写法

3. (序表嵌套)：
    1. one
        1. one-1
        2. two-2
    2. two
        * two-1
        * two-2

3. (序表嵌套代码块)
    注：换行+两个Tab
    * one
        var a = 10;     // 与上行保持空行并 递进缩进

4. 行内标记，标记之外`hello world`标记之外


5. 直接使用 HTML 标签，可以设置文字居中，字体颜色等样色(HTML 语法)
<div align="center" style="color:red">VS Code 使用 Markdown 编写文档</div>

6. 代码块
```
<div>
    <div></div>
    <div></div>
    <div></div>
</div>
```
6. 自定义语法（根据不同的语言配置不同的代码着色）
```javascript
var num = 0;
for (var i = 0; i < 5; i++) {
    num+=i;
}
console.log(num);
```

```c
int main(){
    return 0;
}
```


```C#
public void main(){

}
```

7. 插入链接（待定。。。）

[百度](http://www.baidu.com/ '百度一下')

[百度][id],[百度][id],[百度][id],

[id]:http://www.baidu.com/ '百度一下多次调用'

锚点效果[一级标题](#一级标题)


8. 注释

```
<!-- 注释内容 -->

<?注释内容>
```



#### 8. 插入图片  {#11}  

1. 基础路径图片
<img :src="$withBase('/hear.jpg')" alt="基础路径图片" class="zoom-custom-imgs">

2. 相对路径图片
![相对路径图片](/hear.jpg '图片描述')

3. 图片描述
![](/hear.jpg '图片描述2')

4. 插入图片带有链接
[![](/hear.jpg '文档地址')](http://docs.51yrc.com)

5. 网络图片
![百度](https://www.baidu.com/img/bd_logo1.png?where=super "百度搜索")



9. 插入视频

注：Markdown 语法是不支持直接插入视频的普遍的做法是 插入 HTML 的 iframe 框架，通过网站自带的分享功能获取，如果没有可以尝试第二种方法第二是伪造播放界面，实质是插入视频图片，然后通过点击跳转到相关页面
代码：

<iframe height=498 width=510 src='http://player.youku.com/embed/XMjgzNzM0NTYxNg==' frameborder=0></iframe>



10. 任务列表(类似于多选框)

- [ ] 选项一
- [x] 选项二

12. 表情(待定。。。。)

13. 表格代码1：注： : 代表对齐方式

    | a  |  b | c  |
    |:--:|:-- | --:|    
    |  居中 |  左对齐 |  右对齐 |


13. 代码2(简约写法)：
    a  |  b  | c
    :---:|:------------ |--:
    居中 |  左对齐 |  右对齐

13. 代码3(特殊表格)：使用HTML代码

13. 表格

| 姓名  |  年龄 | 成绩  |
|:--:|:-- | --:|    
|  居中 |  左对齐 |  右对齐 |
|  张三 |  12 |  69 |
|  李四 |  15 |  99 |
   


14. 支持内嵌CSS样式
<p style="color: #AD5D0F;font-size: 30px; font-family: '宋体';">内联样式</p>

15. 语义标记

*斜体*

_斜体_

**加粗**

***加粗+斜体***、**_加粗+斜体_**

printf()

:smile:

$\theta=x^2$

H~2~O

x^2^

~~删除线~~

== 高亮文字 ==

$\underline{下划线}$

Superscript - superscript

^superscript^

Subscript - subscript

~subscript~

16. 语义标签

<i>斜体</i>
            
<b>加粗</b>

<em>强调</em>

<u>下划线</u>

<del>删除</del>

Z<sup>a</sup>

Z<sub>a</sub>

<kbd>Ctrl</kbd>

17. 公式

$$
\frac{\partial f}{\partial x} = 2\sqrt{a}x
$$

$ 
x = {-b \pm \sqrt{b^2-4ac} \over 2a}. 
$

18. 分隔符：横线

---  

或者  

***

19. 脚注 // 在文章最后面显示脚注 

一键三连[^三连]

[^三连]:点赞、投票、拉分 

20. 锚点

[公式标题锚点](#11)

#### [任务列表(类似于多选框)]  {#1}    // 方括号后保持空格

21. 定义型列表:

注：解释型定义

Markdown 

:轻量级文本标记语言，可以转换成html，pdf等格式  //  开头一个`:` + `Tab` 或 四个空


24. 自动邮箱链接

<xxx@outlook.com>

25. 流程图

```
graph LR
A-->B
```
```
sequenceDiagram
A->>B: How are you?
B->>A: Great!
```
```
gantt
dateFormat YYYY-MM-DD
section S1
T1: 2014-01-01, 9d
section S2
T2: 2014-01-11, 9d
section S3
T3: 2014-01-02, 9d
```

26. 时序图

```sequence
A->>B: 你好
Note left of A: 我在左边
Note right of B: 我在右边
B-->A: 很高兴认识你
```
```sequence
起床->吃饭: 稀饭油条
吃饭->上班: 不要迟到了
上班->午餐: 吃撑了
上班->下班:
Note right of 下班: 下班了
下班->回家:
Note right of 回家: 到家了
回家-->>起床:
Note left of 起床: 新的一天
```





