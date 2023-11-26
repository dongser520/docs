---
navbar: true
sidebar: auto
title: echarts图表
---

## 1. echarts图表资源网
### isqqw.com <a href="https://www.isqqw.com/" title="echarts图资源网" target="_blank">[echarts图资源网：isqqw.com]</a>
> 该网站有很多echarts图表资源可供使用，如：<a href="https://www.isqqw.com/viewer?id=15299" target="_blank">https://www.isqqw.com/viewer?id=15299</a>，如何使用：<br/>
> 
> #### ① 先需要引入echarts库，引入查看：<a href="https://echarts.apache.org/handbook/zh/get-started/" target="_blank">引入echarts.js官方介绍</a>
> 最新echarts.js引入地址：<a href="https://www.jsdelivr.com/package/npm/echarts"  target="_blank">https://www.jsdelivr.com/package/npm/echarts</a><br/>
>> 如：<a href="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"  target="_blank">5.4.3版本</a>
>> 下载<a href="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/software/echarts.5.4.3.min.rar"> echarts.5.4.3.min.js</a>
> 
> #### ② 创建页面运行示例
> ```html
> <!DOCTYPE html>
> <html lang="en">
>     <head>
>         <meta charset="UTF-8">
>         <meta http-equiv="X-UA-Compatible" content="IE=edge">
>         <meta name="viewport" content="width=device-width, initial-scale=1.0">
>         <title>echarts图表示例</title>
>         <!-- 本地引入 -->
>         <!-- <script src="./static/js/echarts.5.4.3.min.js"></script> -->
>         <!-- 在线引入 -->
>         <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
>     </head>
>     <body>
>         <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
>         <div id="main" style="width: 100%;height:100vh;"></div>
>         <!-- 单独写一个js文件，存储示例代码1.js -->
>         <!-- 记得在1.js中声明myChart变量放在顶部 -->
>         <!--
>             // 基于准备好的dom，初始化echarts实例
>             var myChart = echarts.init(document.getElementById('main'));
>         -->
>         <script src="./static/js/1.js"></script>
>         <!-- 1.js中的代码就粘贴资源网上的代码即可 -->
>     </body>
> </html>
> ```


