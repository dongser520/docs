---
navbar: true
title:  eggjs + 即时通讯后端部署上线
--- 


# eggjs + 即时通讯功能后端部署上线

### 1、解析一个域名
> 在阿里云或腾讯云，域名管理中，解析一个域名到线上服务器，本次演示域名： `eggjs.chat.51yrc.com`，轻量应用服务器在域名栏目绑定域名。<br/>

### 2、创建网站
> 在宝塔面板中， `网站`-`PHP项目`-`添加站点`-`传统项目` <br/>
>> `域名`：eggjs.chat.51yrc.com <br/>
>> `备注`：eggjs.chat.51yrc.com (自动生成)<br/>
>> `根目录`：/www/wwwroot/eggjs.chat.51yrc.com  (自动生成)<br/>
>> `FTP`：不创建<br/>
>> `数据库`：MySQL---字符集：utf8mb4（存表情包），数据库账号、密码自动生成<br/>
>> `PHP版本`：这里选择 `纯静态`<br/>
>> `网站分类`：默认分类<br/>
>> `确定`--> 点击域名看默认站点是否可以打开

### 3、上传代码到服务器
> 群文件下载源码 （或私信老师获取源码）<br/>
> 打开网站根目录，上传源码压缩包，解压 <br/>

### 4、面板环境安装
> 1. 查看是否安装了`PM2管理器`：`软件商店`- `已安装`-查看是否安装了`PM2管理器`，没有则搜索安装；<br/>
> 2. 切换node版本到最新版本：`PM2管理器` -> `设置` -> `Node版本` -> `选择一个新版本` -> `确定` <br/>
> 3. 检查安装Redis: `软件商店`- `已安装`-查看是否安装了`Redis`，没有则搜索安装；之后，记得启动`Redis服务`<br/>

### 5、命令行工具执行
> 1. 打开终端
>> 可以在面板对应的网站根目录下，`终端` -> 输入命令 <br/>
>> 也可以在阿里云或者腾讯云控制台，找到服务器的`远程连接`打开命令终端
>>> 1. 切换root账号： `su root` <br/>
>>> 2. 输入密码 （服务器的`远程连接`密码，忘了可以重新设置密码再输入）
> 2. 切换到对应项目的根目录，如本项目： `cd /www/wwwroot/eggjs.chat.51yrc.com`<br/>
> 3. 安装依赖： `npm install` 我们知道安装依赖包，需要找到npm镜像源：
>> 1. 如果你是国内服务器，我们会使用淘宝镜像源 `npm config set registry https://registry.npmmirror.com/` ， 通过命令查看npm镜像源：`npm config get registry` <br/>
>> 2. 如果是中国香港或者国外服务器，则不用切换镜像源，因为它本身就很快 <br/>
>> 执行：`npm install`安装依赖包<br/>
>> 注意：可能由于npm版本或者其他原因，导致 `npm install`安装依赖 `失败`，可尝试以下解决方法：
>>> 通过 `yarn`命令安装依赖：
>>>> 安装yarn：`npm install -g yarn` <br/>
>>>> 安装依赖：`yarn install`<br/>

### 6、安装数据库迁移工具【可选项】
> 【可选项、可省略，直接导入数据库也可以】<a href="/secondless/w-d/网站代码上线调试.html#八、安装数据库迁移工具-执行迁移命令" target="_blank">（第二期第四季课程有详细讲解）</a>

### 7、修改配置信息
> `config/config.default.js` 修改数据库连接： <br/>
>> 修改数据库连接配置:数据库名称database，数据库用户名username，数据库密码password  <br/>
>
> `另外就是OSS云存储配置记得修改对应的：`
> ```js
> config.oss = {
>     client: {
>         accessKeyId: 'xxxx', //你的accessKeyId
>         accessKeySecret: 'xxxx', //你的accessKeySecret
>         bucket: 'xxxx', //你的bucket
>         endpoint: 'xxx', //你的endpoint
>         timeout: '60s',
>     },
>   };
>```
> 
> `database/config.json` <br/>
>> 数据库相关信息，建议全部改一下,改成当前数据库名，用户名，密码 <br/>

### 8、导入数据库
> 导入代码中的数据库到服务器数据库

### 9、端口占用问题
> 若服务器不止一个项目，则修改配置换一个端口在启动，在 package.json 文件加上：
> ```js
> //加上别的端口号,如：7008
> "scripts": {
>     "start": "egg-scripts start --daemon --title=egg-server-mssql --sticky --port=7008",
>      ...
>   },
> ```

### 10、启动项目
> 启动项目：`npm start` <br/>

### 11、添加反向代理
> 找到对应网站 -> `设置` -> `反向代理` -> `添加反向代理`
>> 代理名称 : `api` <br/>
>> 目标URL : `http://localhost:7008` 对应启动端口 <br/>
>> 发送域名 : `localhost` <br/>
> 还需要添加一个配置，主要针对 websocket <br/>
>> `添加反向代理`之后 --> `配置文件`-->底部写入下面代码：
>> ```js
>> location /ws
>>  {
>>     proxy_pass http://127.0.0.1:7008;
>>     proxy_http_version 1.1;
>>     proxy_set_header Upgrade $http_upgrade;
>>     proxy_set_header Connection "Upgrade";
>>     proxy_set_header X-Real-IP $remote_addr;
>>  }
>> ```
>> 修改前端项目的 /common/lib/config.js和manifest.json里面的域名即可

试一下：<http://eggjs.chat.51yrc.com/>
