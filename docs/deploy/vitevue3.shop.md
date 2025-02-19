---
navbar: true
title:  Vite项目上线部署
--- 


# Vite项目上线部署

## 解析一个域名
> 在阿里云或腾讯云，域名管理中，解析一个域名到线上服务器，本次演示域名： `vitevue3.html.shop.51yrc.com`，轻量应用服务器在域名栏目绑定域名。<br/>
> 后端地址：`http://vitevue3.shop.51yrc.com` <http://vitevue3.shop.51yrc.com/api/index_category/data> <br/>
> 前端地址：`http://vitevue3.html.shop.51yrc.com`<br/>

## 配置设置
> 1. 群文件下载源码 （或私信老师获取源码）、解压后拖入vscode<br/>
> 2. 配置环境：
>> 新增开发环境文件： `.env.development`<br/>
>> 由于开发环境即调试环境，我们在 `vite.config.js` 有开启代理 `/api`,因此这么写：
>>> ```js
>>> VITE_APP_BASE_API='/api'
>>> ```
>> 新增生产环境即上线环境文件： `.env.production`<br/>
>> 直接写线上域名即可：
>>> ```js
>>> VITE_APP_BASE_API='http://vitevue3.shop.51yrc.com' //换成后端的网址
>>> ```
> 3. 如果源代码没有node_modules文件，需要初始化node_modules文件，可以：
>> 键盘shift+鼠标右键，`此处打开Powershell`然后输入命令：`npm install`安装依赖<br/>
>> 或者在vscode中，`终端`-`新建终端`，`找到项目`运行命令：`npm install`<br/>
> 4. 测试一下新增的环境文件有没有生效：
>> 根目录 `src/App.vue`打开，在`<script setup>`中加入：
>> ```js
>> //可写在页面顶部
>><script setup>
>> console.log(import.meta.env);
>></script>
>> //然后运行一下项目看看：`npm run dev`
>> //页面中控台会有：VITE_APP_BASE_API: "/api"这个属性，
>> //如果是线上环境，打包之后就会变成网址
>> ```
> 5. 根目录 `src/axios.js`打开,注意以下代码：
>> ```js
>> const service = axios.create({
>>   baseURL: import.meta.env.VITE_APP_BASE_API, //这里换成环境变量
>> });
>> ```
> 6. 根目录 `src/api/image.js`打开,注意以下代码：
>> ```js
>> //最后一行
>> export const uploadImageAction = import.meta.env.VITE_APP_BASE_API 
>> + "/admin/image/upload"
>> ```
> 7. 根目录 `src/api/sysconfig.js`打开,注意以下代码：
>> ```js
>> //最后一行
>> export const uploadAction = import.meta.env.VITE_APP_BASE_API 
>> + "/admin/sysconfig/upload"
>> ```
> 8. 根目录 `vite.config.js`打开,注意以下代码：
>> ```js
>> server:{
>>     proxy:{
>>       '/api': {
>>         target: 'http://vitevue3.shop.51yrc.com', //换成后端的网址
>>         changeOrigin: true,
>>         rewrite: (path) => path.replace(/^\/api/, '')
>>       },
>>     }
>>   },
>> ```
> 
> 9. 打包代码：`npm run build`，代码放在了`dist`文件夹中，打开`dist`文件夹，把里面的文件打包上传服务器即可。

## 服务器面板操作（以宝塔面板为例）
### 创建网站，前端地址：`http://vitevue3.html.shop.51yrc.com`
> 1.  `网站`-`PHP项目`-`添加站点`-`传统项目` <br/>
>> `域名`：vitevue3.html.shop.51yrc.com <br/>
>> `备注`：vitevue3.html.shop.51yrc.com (自动生成)<br/>
>> `根目录`：/www/wwwroot/vitevue3.html.shop.51yrc.com  (自动生成)<br/>
>> `FTP`：不创建<br/>
>> `数据库`：不创建<br/>
>> `PHP版本`：纯静态<br/>
>> `网站分类`：默认分类<br/>
>> 确定--> 点击域名看默认站点是否可以打开: <http://vitevue3.html.shop.51yrc.com>

### 上传打包文件到服务器
> 打开`dist`文件夹，全部选中，右键，`添加到压缩文件`--`zip`--`确定` --打包好了代码 `dist.zip` <br/>
> 上传到网站根目录-->解压即可访问。<br/>
> 若解压之后，文件不在根目录，则指定目录即可：`对应网站`->`设置`->`网站目录`->`网站目录`（注意`不是设置运行目录`，运行目录是在thinkphp用到指向public）->指定网站目录->`保存`