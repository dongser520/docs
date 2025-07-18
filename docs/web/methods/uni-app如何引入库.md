---
navbar: true
sidebar: auto
title: uni-app如何引入库
---

## 一、uni-app引入uuid库
以 uuid库 为例，其它库可以参照这种方式

### 方法一：使用npm（推荐）(会点node知识，或者学习过我们第二学期课程的同学可使用这种方式)
HBuilderX创建的uni-app项目默认是支持npm的，但需要先初始化npm（如果还没有package.json），然后安装uuid。<br/><br/>
步骤如下：
1. 打开终端，进入项目根目录（如果使用HBuilderX，可以右键项目根目录，选择`使用命令行窗口打开`）。<br/>
2. 初始化npm（如果项目还没有package.json）：
   ```bash
   npm init -y
   ```
3. 安装uuid库：
   ```bash
   npm install uuid
   ```
4. 在需要使用uuid的页面或组件中，通过import引入：
   ```javascript
   import { v4 as uuidv4 } from 'uuid';
   // 或者 const { v4: uuidv4 } = require('uuid'); // 使用CommonJS方式
   // 生成一个uuid
   let id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
   ```
注意：uni-app默认支持ES6模块，所以使用import即可。<br/>
但是，uni-app在编译到小程序时，可能会遇到npm模块不支持的情况。因此，我们需要在HBuilderX中配置：<br/>
- 在项目根目录下找到（或创建）`vue.config.js`文件，添加以下配置（如果没有的话）：<br/>
  ```javascript
  module.exports = {
      transpileDependencies: ['uuid'], // 关键配置：让uni-app编译uuid
  };
  ```
  这样，uni-app在编译时会处理uuid的依赖。<br/>
另外，也可以使用HBuilderX的菜单`工具`->`外部命令`->`npm install`来安装。<br/>

### 方法二：直接引入js文件
如果不想使用npm，可以到uuid的GitHub仓库（<https://github.com/uuidjs/uuid>）下载uuid的完整版（或者使用CDN链接），然后将文件放在项目的静态资源目录（如`static`目录）中。<br/>

### 1. 在线uuid获取
获取方式很多，给大家推荐一个地址：
1. v1版本：<https://cdn.jsdelivr.net/npm/uuid@latest/dist/umd/uuidv1.min.js>
2. v3版本：<https://cdn.jsdelivr.net/npm/uuid@latest/dist/umd/uuidv3.min.js>
3. v4版本：<https://cdn.jsdelivr.net/npm/uuid@latest/dist/umd/uuidv4.min.js>
4. v5版本：<https://cdn.jsdelivr.net/npm/uuid@latest/dist/umd/uuidv5.min.js>
5. 各版本区别和使用参考：<https://www.jsdelivr.com/package/npm/uuidjs>

### 2. 引入流程
1. 下载uuid的浏览器版本（例如，从<https://cdn.jsdelivr.net/npm/uuid@latest/dist/umd/uuid.min.js> 下载）
2. 将下载的文件（如`uuid.min.js`）放在项目的`static/js`目录（可以自己创建js目录）。
3. 在需要使用uuid的页面中，通过相对路径引入：
   ```html
   <script>
     // 引入uuid
     import uuid from '@/static/js/uuid.min.js';
     // 或者使用require
     // const uuid = require('@/static/js/uuid.min.js');
     // 使用
     // 注意：引入整个文件后，uuid可能是一个对象，具体结构需要看文件内容
     // 通常，我们可以这样使用：
     // v4方法生成一个随机uuid
     let id = uuid.v4();
   </script>
   ```
但是请注意，这种方式引入的uuid库可能是全局的，而且需要确保该库在uni-app环境中能够运行（尤其是非H5端）。
### 注意事项
- 在小程序环境中，直接使用npm包可能会遇到问题，因此`方法一`中的`transpileDependencies`配置很重要。
- 如果使用下载的js文件，需要注意该文件是否支持commonjs或es6模块导出，以及是否支持非浏览器环境（因为小程序和App环境都不是浏览器环境）。
### 总结
推荐使用`方法一（npm安装）`，因为这是最常用的方式，而且uuid库本身是支持多环境的。如果遇到问题，再考虑`方法二`。<br/>
如果使用npm安装后运行到小程序报错，可以尝试在`vue.config.js`中配置transpileDependencies，或者检查是否需要在小程序开发工具中构建npm（如果是使用微信小程序开发工具单独打开项目，需要构建npm；但HBuilderX直接运行到微信小程序工具一般会自动构建）。
另外，uni-app从2.2.1+版本开始支持使用npm，所以确保你的HBuilderX版本较新。


### uuid在uni-app项目中的实战案例
具体查看：<a href="/thirdless/w-b/07注册登录页面.html#_2-给游客-未登录用户-一个身份标识" target="_blank">uuid在uni-app项目中的实战案例：2. 给游客（未登录用户）一个身份标识</a>

<br/><br/><br/>

## 二、uni-app引入加密库（如CryptoJS）来实现SHA256加密
 由于uni-app兼容多端，我们需要选择一个支持多端的加密库。CryptoJS是一个常用的选择，但要注意其体积较大，可能影响小程序包大小。考虑到多端兼容性（H5、小程序、App），我们可以使用CryptoJS，但需要将其放在项目中并正确引入。<br/>
### 方法一：使用npm（推荐）(会点node知识，或者学习过我们第二学期课程的同学可使用这种方式)
HBuilderX创建的uni-app项目默认是支持npm的，但需要先初始化npm（如果还没有package.json），然后安装`crypto-js`。<br/><br/>
步骤如下：
1. 打开终端，进入项目根目录（如果使用HBuilderX，可以右键项目根目录，选择`使用命令行窗口打开`）。<br/>
2. 初始化npm（如果项目还没有package.json）：
   ```bash
   npm init -y
   ```
3. 安装crypto-js库：
   ```bash
   npm install crypto-js
   ```
4. 在需要使用uuid的页面或组件中，通过import引入：
   ```js
   import sha256 from 'crypto-js/sha256';
   import encHex from 'crypto-js/enc-hex';
   ...
   //使用
   const hash = sha256('xxxxx' + 'APP_SECRET');
   return hash.toString(encHex); // 返回十六进制字符串
   ```
注意：
1. 如果使用npm安装，构建到小程序时，可能会将整个crypto-js都打包进去，导致体积过大。<br/>因此，可以考虑按需引入，但`crypto-js`已经支持按需引入（如`import sha256 from 'crypto-js/sha256'`），这样只会引入相关代码。<br/>
2. 如果遇到npm包在小程序中不支持的问题，可以尝试在项目的`transpileDependencies`中配置（在vue.config.js中），但uni-app默认会处理`node_modules`的编译。<br/><br/>

### 方法二：直接引入js文件
下载CryptoJS的库文件并放入项目的`common/js`目录中，然后引入。
### 示例1
1. 为了完整性和方便，建议下载整个crypto-js然后只提取需要的文件，或者直接使用完整的`crypto-js.min.js`。<br/>
下载 `crypto-js`<br/>
> 1. 你可以从CryptoJS的GitHub仓库下载：<https://github.com/brix/crypto-js> <br/>
> 2. 也可以使用cdn网站的库，如:<https://cdnjs.com/libraries/crypto-js><br/>
2. 引入：
```js
   import CryptoJS from '@/common/js/crypto-js.min.js'; // 然后使用CryptoJS.SHA256

   // 使用CryptoJS.SHA256
   const hash = CryptoJS.SHA256(sortedStr + 'APP_SECRET');
   return hash.toString(CryptoJS.enc.Hex); // 返回十六进制字符串
```
### 示例2
#### 示例2-1. H5端你可以这么做
1. 纯JS实现的SHA256库：<https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.min.js>
2. 将上述CDN内容保存为本地文件：`/common/js/sha256.min.js`
```javascript
   // 在generateSign函数之前引入
   let sha256;
   // #ifdef H5
   sha256 = require('@/common/js/sha256.min.js').sha256;
   // #endif
   // #ifndef H5
   // 其他平台（小程序、App）如何处理？需要另外的方案
   // #endif
```
#### 示例2-2. 复制纯JS实现的sha256库到项目中（多端兼容）
由于uni-app支持条件编译，我们可以<br/>
- H5使用`crypto-js`（通过CDN引入）<br/>
- 小程序使用`js-sha256`（通过小程序npm支持或直接复制代码）<br/>
- App使用原生加密模块（性能更好）<br/>
但为了简化，我们可以统一使用一个纯JS实现的sha256库，并将其源码直接放入项目中。<br/>
具体操作：<br/>
1. 访问 <https://cdn.jsdelivr.net/npm/js-sha256@0.9.0/build/sha256.min.js> 原地址：[https://github.com/emn178/js-sha256]
2. 复制全部代码
3. 在`/common/js`目录下创建`sha256.min.js`文件，粘贴代码
```js
// 引入本地的sha256库
import sha256 from '@/common/js/sha256.min.js';

...
// 计算签名（注意：这里我们使用hex格式）
return sha256('xxxxx' + 'APP_SECRET'); // 该库默认返回hex字符串
```
 