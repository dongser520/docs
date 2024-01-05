---
navbar: true
sidebar: auto
title: 封装的css样式库
---

## 一、第一学期封装的css样式库：common.1.0.css
```css
/* 元素的隐藏 */
.hidden, .display-none{
    display: none !important;
}
/* 元素的块级、行内块转换 */
.display-inline-block{ display: inline-block; }
.display-block{ display: block; }

/* flex布局 */
.flex, .d-flex{
    display: flex;
}
.flex-row{flex-direction: row;} /* flex布局水平方向从左往右排列 */
.flex-row-reverse{flex-direction: row-reverse;} /* flex布局水平方向从右往左排列 */
.justify-center,.justify-content-center{justify-content:center;} /* flex布局水平方向居中排列，两边等间距 */
.justify-between{justify-content:space-between;}/* flex布局水平方向两边顶到头，剩余空间等间距 */
.justify-around{justify-content: space-around;} /* flex布局水平方向，每个元素占相同的剩余空间 */
.justify-evenly{justify-content:space-evenly;} /* flex布局水平方向，每个元素间隔相同 */
.justify-end{justify-content:flex-end;} /* flex布局水平方向，元素靠右排列 */
.justify-start{justify-content:flex-start;} /* flex布局水平方向默认排列方式，元素靠左排列，默认就是可以不写 */

.flex-column{ flex-direction:column; } /* flex布局垂直方向从上往下排列 */
.flex-column-reverse{ flex-direction:column-reverse; } /* flex布局垂直方向从下往上排列 */
.align-center{ align-items: center; } /* flex布局垂直方向居中排列，上下等间距 */
.align-stretch{ align-items: stretch; } /* flex布局垂直方向铺满整个空间 */
.align-end{ align-items: flex-end; } /* flex布局垂直方向，元素靠下排列 */
.align-start{ align-items: flex-start; } /* flex布局垂直方向，元素靠上排列 */

/* 外边距 */
/* 上外边距 */
.mt-0 { margin-top: 0px; }
.mt-05 { margin-top: 5px; }
.mt-1, .mt-10{ margin-top: 10px; }
.mt-15 { margin-top: 15px; }
.mt-2, .mt-20 { margin-top: 20px; }
.mt-25 { margin-top: 25px; }
.mt-3, .mt-30  { margin-top: 30px; }
.mt-35 { margin-top: 35px; }
.mt-4, .mt-40 { margin-top: 40px; }
.mt-45 { margin-top: 45px; }
.mt-5, .mt-50 { margin-top: 50px; }
/* 右外边距 */
.mr-0 { margin-right: 0px; }
.mr-05 { margin-right: 5px; }
.mr-1, .mr-10{ margin-right: 10px; }
.mr-15 { margin-right: 15px; }
.mr-2, .mr-20 { margin-right: 20px; }
.mr-25 { margin-right: 25px; }
.mr-3, .mr-30  { margin-right: 30px; }
.mr-35 { margin-right: 35px; }
.mr-4, .mr-40 { margin-right: 40px; }
.mr-45 { margin-right: 45px; }
.mr-5, .mr-50 { margin-right: 50px; }
/* 下外边距 */
.mb-0 { margin-bottom: 0px; }
.mb-05 { margin-bottom: 5px; }
.mb-1, .mb-10{ margin-bottom: 10px; }
.mb-15 { margin-bottom: 15px; }
.mb-2, .mb-20 { margin-bottom: 20px; }
.mb-25 { margin-bottom: 25px; }
.mb-3, .mb-30  { margin-bottom: 30px; }
.mb-35 { margin-bottom: 35px; }
.mb-4, .mb-40 { margin-bottom: 40px; }
.mb-45 { margin-bottom: 45px; }
.mb-5, .mb-50 { margin-bottom: 50px; }
/* 左外边距 */
.ml-0 { margin-left: 0px; }
.ml-05 { margin-left: 5px; }
.ml-1, .ml-10{ margin-left: 10px; }
.ml-15 { margin-left: 15px; }
.ml-2, .ml-20 { margin-left: 20px; }
.ml-25 { margin-left: 25px; }
.ml-3, .ml-30  { margin-left: 30px; }
.ml-35 { margin-left: 35px; }
.ml-4, .ml-40 { margin-left: 40px; }
.ml-45 { margin-left: 45px; }
.ml-5, .ml-50 { margin-left: 50px; }
/* 其他常用外边距 */
.m-auto{ margin: auto; }  /* 外边距自适应，居中 */
.mt-auto { margin-top: auto; }
.mr-auto { margin-right: auto; }
.mb-auto { margin-bottom: auto; }
.ml-auto { margin-left: auto; }
.mx-auto { margin-left: auto; margin-right: auto; } /* 水平自适应居中 */
.my-auto { margin-top: auto; margin-bottom: auto; } /* 垂直自适应居中 */
/* 外边距上右下左都是0像素 */
.m-0 { margin: 0px; }   
/* 外边距水平方向 */
.mx-0 { margin-left: 0px; margin-right: 0px; } /* 外边距水平方向，也就是左外边距、右外边距都是0像素 */
.mx-05 { margin-left: 5px; margin-right: 5px; }
.mx-10, .mx-1 { margin-left: 10px; margin-right: 10px; }
.mx-15 { margin-left: 15px; margin-right: 15px; }
.mx-20, .mx-2 { margin-left: 20px; margin-right: 20px; }
.mx-25 { margin-left: 25px; margin-right: 25px; }
.mx-30, .mx-3 { margin-left: 30px; margin-right: 30px; }
.mx-35 { margin-left: 35px; margin-right: 35px; }
.mx-40, .mx-4 { margin-left: 40px; margin-right: 40px; }
.mx-45 { margin-left: 45px; margin-right: 45px; }
.mx-50, .mx-5 { margin-left: 50px; margin-right: 50px; }
/* 外边距垂直方向 */
.my-0 { margin-top: 0px; margin-bottom: 0px; } /* 外边距垂直方向，也就是上外边距、下外边距都是0像素 */
.my-05 { margin-top: 5px; margin-bottom: 5px; }
.my-10, .my-1 { margin-top: 10px; margin-bottom: 10px; }
.my-15 { margin-top: 15px; margin-bottom: 15px; }
.my-20, .my-2 { margin-top: 20px; margin-bottom: 20px; }
.my-25 { margin-top: 25px; margin-bottom: 25px; }
.my-30, .my-3 { margin-top: 30px; margin-bottom: 30px; }
.my-35 { margin-top: 35px; margin-bottom: 35px; }
.my-40, .my-4 { margin-top: 40px; margin-bottom: 40px; }
.my-45 { margin-top: 45px; margin-bottom: 45px; }
.my-50, .my-5 { margin-top: 50px; margin-bottom: 50px; }

/* 内边距 */
/* 上内边距 */
.pt-0 { padding-top: 0px; }
.pt-05 { padding-top: 5px; }
.pt-1, .pt-10{ padding-top: 10px; }
.pt-15 { padding-top: 15px; }
.pt-2, .pt-20 { padding-top: 20px; }
.pt-25 { padding-top: 25px; }
.pt-3, .pt-30  { padding-top: 30px; }
.pt-35 { padding-top: 35px; }
.pt-4, .pt-40 { padding-top: 40px; }
.pt-45 { padding-top: 45px; }
.pt-5, .pt-50 { padding-top: 50px; }
/* 右内边距 */
.pr-0 { padding-right: 0px; }
.pr-05 { padding-right: 5px; }
.pr-1, .pr-10{ padding-right: 10px; }
.pr-15 { padding-right: 15px; }
.pr-2, .pr-20 { padding-right: 20px; }
.pr-25 { padding-right: 25px; }
.pr-3, .pr-30  { padding-right: 30px; }
.pr-35 { padding-right: 35px; }
.pr-4, .pr-40 { padding-right: 40px; }
.pr-45 { padding-right: 45px; }
.pr-5, .pr-50 { padding-right: 50px; }
/* 下内边距 */
.pb-0 { padding-bottom: 0px; }
.pb-05 { padding-bottom: 5px; }
.pb-1, .pb-10{ padding-bottom: 10px; }
.pb-15 { padding-bottom: 15px; }
.pb-2, .pb-20 { padding-bottom: 20px; }
.pb-25 { padding-bottom: 25px; }
.pb-3, .pb-30  { padding-bottom: 30px; }
.pb-35 { padding-bottom: 35px; }
.pb-4, .pb-40 { padding-bottom: 40px; }
.pb-45 { padding-bottom: 45px; }
.pb-5, .pb-50 { padding-bottom: 50px; }
/* 左内边距 */
.pl-0 { padding-left: 0px; }
.pl-05 { padding-left: 5px; }
.pl-1, .pl-10{ padding-left: 10px; }
.pl-15 { padding-left: 15px; }
.pl-2, .pl-20 { padding-left: 20px; }
.pl-25 { padding-left: 25px; }
.pl-3, .pl-30  { padding-left: 30px; }
.pl-35 { padding-left: 35px; }
.pl-4, .pl-40 { padding-left: 40px; }
.pl-45 { padding-left: 45px; }
.pl-5, .pl-50 { padding-left: 50px; }
/* 其他常用内边距 */
/* 内边距上右下左都是0像素 */
.p-0 { padding: 0px; }   
/* 内边距水平方向 */
.px-0 { padding-left: 0px; padding-right: 0px; } /* 内边距水平方向，也就是左内边距、右内边距都是0像素 */
.px-05 { padding-left: 5px; padding-right: 5px; }
.px-10, .px-1 { padding-left: 10px; padding-right: 10px; }
.px-15 { padding-left: 15px; padding-right: 15px; }
.px-20, .px-2 { padding-left: 20px; padding-right: 20px; }
.px-25 { padding-left: 25px; padding-right: 25px; }
.px-30, .px-3 { padding-left: 30px; padding-right: 30px; }
.px-35 { padding-left: 35px; padding-right: 35px; }
.px-40, .px-4 { padding-left: 40px; padding-right: 40px; }
.px-45 { padding-left: 45px; padding-right: 45px; }
.px-50, .px-5 { padding-left: 50px; padding-right: 50px; }
/* 内边距垂直方向 */
.py-0 { padding-top: 0px; padding-bottom: 0px; } /* 内边距垂直方向，也就是上内边距、下内边距都是0像素 */
.py-05 { padding-top: 5px; padding-bottom: 5px; }
.py-10, .py-1 { padding-top: 10px; padding-bottom: 10px; }
.py-15 { padding-top: 15px; padding-bottom: 15px; }
.py-20, .py-2 { padding-top: 20px; padding-bottom: 20px; }
.py-25 { padding-top: 25px; padding-bottom: 25px; }
.py-30, .py-3 { padding-top: 30px; padding-bottom: 30px; }
.py-35 { padding-top: 35px; padding-bottom: 35px; }
.py-40, .py-4 { padding-top: 40px; padding-bottom: 40px; }
.py-45 { padding-top: 45px; padding-bottom: 45px; }
.py-50, .py-5 { padding-top: 50px; padding-bottom: 50px; }
.py-100{padding-top: 100px; padding-bottom: 100px;}

/* 边框 */
.border-0{border-width:0px}
.border-top-0{border-top-width:0px;}
.border-right-0{border-right-width:0px;}
.border-bottom-0{border-bottom-width:0px;}
.border-left-0{border-left-width:0px;}
.border{border-width: 1px; border-style: solid; border-color: #dee2ed;}
.border-top{border-top-width: 1px; border-top-style: solid; border-top-color: #dee2ed;}
.border-right{border-right-width: 1px; border-right-style: solid; border-right-color: #dee2ed;}
.border-bottom{border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #dee2ed;}
.border-left{border-left-width: 1px; border-left-style: solid; border-left-color: #dee2ed;}
/* 边框圆角 */
.rounded-0{border-radius:0px;}
.rounded-circle{border-radius:100%;}
.rounded {border-radius:5px}
.rounded-lg {border-radius:10px}

/* 字体 */
/* 字体大小 */
.font-xs { font-size: 6px;}
.font-smaller { font-size: 8px;}
.font-small { font-size: 10px;}
.font-sm { font-size: 12px;}
.font { font-size: 14px;}
.font-normal { font-size: 16px;}
.font-md { font-size: 18px;}
.font-lg { font-size: 20px;}
.font-lger { font-size: 24px;}
.font-max{font-size: 30px;}
/* 字体下划线 */
.text-underline{text-decoration: underline;}
.text-no-underline{text-decoration: none;}
/* 文字颜色 */
.text-white {color: #ffffff;}
.text-primary {color: #007bff;}
.text-hover-primary { color: #0056b3;}
.text-secondary {color: #6c757d;}
.text-hover-secondary { color: #494f54;}
.text-success {color: #28a745;}
.text-hover-success{color: #19692c;}
.text-info { color: #17a2b8;}
.text-hover-info {color: #0f6674;}
.text-warning {color: #ffc107;}
.text-hover-warning { color: #ba8b00;}
.text-danger { color: #dc3545;}
.text-hover-danger { color: #a71d2a;}
.text-light { color: #f8f9fa;}
.text-hover-light { color: #cbd3da;}
.text-dark { color: #343a40;}
.text-hover-dark{ color: #121416;}
.text-body { color: #212529;}
.text-muted { color: #6c757d;}
.text-black { color: #111111;}
.text-hover-black{ color: #343a40;}
/* 浅灰色 */
.text-light-light-muted { color: #D9D9D9;}
.text-light-muted { color: #A9A5A0;}
.text-light-black { color: rgba(0, 0, 0, 0.5);}
.text-light-white { color: rgba(255, 255, 255, 0.5);}

/* 背景颜色 */
.bg-primary { background-color: #007bff;}
.bg-hover-primary:hover{ background-color: #0062cc;}
.bg-secondary { background-color: #6c757d;}
.bg-hover-secondary:hover{ background-color: #545b62;}
.bg-success { background-color: #28a745;}
.bg-hover-success:hover { background-color: #1e7e34;}
.bg-info { background-color: #17a2b8;}
.bg-hover-info:hover { background-color: #117a8b;}
.bg-warning { background-color: #ffc107;}
.bg-hover-warning:hover { background-color: #d39e00;}
.bg-danger { background-color: #dc3545;}
.bg-hover-danger:hover{ background-color: #bd2130;}
.bg-light { background-color: #f8f9fa;}
.bg-hover-light:hover{ background-color: #dae0e5;}
.bg-light-secondary{background-color: #f9f9fa;}
.bg-hover-light-secondary:hover{ background-color: #dae0e5;}
.bg-dark { background-color: #343a40;}
.bg-hover-dark:hover { background-color: #1d2124;}
.bg-white { background-color: #ffffff;}
.bg-transparent { background-color: transparent;}



/* 定位 */
.position-static { position: static;} /*默认*/
.position-relative { position: relative;} /*相对定位*/
.position-absolute { position: absolute;} /*绝对定位*/
.position-fixed { position: fixed;} /*绝对定位*/
/* 定位 - 固定顶部 */
.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
}
/* 定位 - 固定底部 */
.fixed-bottom {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
}
.top-0 { top: 0; }
.left-0 { left: 0; }
.right-0 { right: 0; }
.bottom-0 { bottom: 0; }

/* 字体粗细 */
.font-weight-lighter{font-weight: lighter;} /*更细*/
.font-weight-normal{font-weight: normal;} /*标准*/
.font-weight-bold{font-weight: bold;} /*粗体*/
.font-weight-bolder{font-weight: bolder;} /*更粗*/

/* 文字对齐 */
.text-left { text-align: left;}
.text-right { text-align: right;}
.text-center { text-align: center;}

/* 文字一行溢出处理 */
.lines-1{
  overflow: hidden;         /*文字长度超出限定宽度，则隐藏超出的内容*/
  white-space: nowrap;      /*设置文字在一行显示，不能换行*/
  text-overflow: ellipsis;  /*规定当文本溢出时，显示省略符号来代表被修剪的文本*/
}
/* 文字两行溢出处理 */
.lines-2{
  overflow: hidden;        /*文字长度超出限定宽度，则隐藏超出的内容*/
  text-overflow: ellipsis; /*规定当文本溢出时，显示省略符号来代表被修剪的文本*/
  -webkit-line-clamp: 2;   /*用来限制在一个块元素显示的文本的行数，2 表示最多显示 2 行。为了实现该效果，它需要组合其他的 WebKit 属性*/
  display: -webkit-box;    /*和 -webkit-line-clamp 结合使用，将对象作为弹性伸缩盒子模型显示*/
  -webkit-box-orient: vertical;/*和 -webkit-line-clamp 结合使用，设置或检索伸缩盒对象的子元素的排列方式*/
}
```
