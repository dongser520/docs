---
navbar: true
sidebar: auto
title: 免费部署SSL证书
---

## 一、自动化部署流程
我们采用 `ALLinSSL`开源免费的SSL证书自动化管理平台部署SSL证书， 官方网站：<https://allinssl.com/>
### 1. 系统及准备工作
>  1. 操作系统： Linux (推荐 CentOS 7.x，Ubuntu 18.04+，Debian 9+) / Windows / MacOS
>  2. 硬件要求： 至少1核CUP, 512M内存, 1G磁盘空间
>  3. 域名： 在阿里云或者腾讯云购买了一个域名 (目前`ALLinSSL`仅支持`阿里云`和`腾讯云`的域名，后续其他云服务商会陆续支持)
>  4. 网络： 需要链接网络下载依赖和申请证书

### 2. 关于宝塔面板安装及配置网站或者系统
关于宝塔面板安装及配置网站或者系统上线，如果有不会的同学，可以直接去看我们`第二学期第四季`的课程：
>  1. B站： <https://www.bilibili.com/cheese/play/ss61008> 
>>  <b><a href="/secondless/w-d.html" target="_blank">[第四季课程文档]</a> </b>
>  2. 网易云课堂：<https://study.163.com/course/courseMain.htm?courseId=1213794887&share=2&shareId=480000002289674>  <br/>
>>  <b><a href="/secondless/w-d.html" target="_blank">[第四季课程文档]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a style="margin-left:20px;" href="https://study.163.com/course/courseMain.htm?courseId=1213794887&share=2&shareId=480000002289674" target="_blank">[第四季课程视频]</a> </b>


### 3. 部署SSL证书
#### 1. 复制安装命令
来到 `ALLinSSL`官网 <https://allinssl.com/>，`快速上手` <https://allinssl.com/guide/getting-started.html> 找到 `安装 -> 使用二进制安装命令 (推荐) -> 复制安装命令`
```js
curl -sSO http://download.allinssl.com/install_allinssl.sh && bash install_allinssl.sh allinssl
```

#### 2. 安装及登录 `ALLinSSL`
方式一：<br/>
> 可直接在 `宝塔面板` ->  `Docker` -> `应用商店` -> `应用搜索` -> `allinssl`，然后 `安装` -> `确定`（大约需要2-3分钟，等待安装即可，成功后点击 `详情` -> 复制 `web端口` -> 然后在浏览器输入：宝塔面板网址+刚刚复制的 `web端口`就可以在服务器打开`ALLinSSL`管理平台，然后输入详情里面展示的`用户名`和`密码`就可以登录`ALLinSSL`平台） <br/><br/>

方式二：<br/>
> 如果宝塔面板`Docker`中搜索不到`ALLinSSL`，或者不是用宝塔面板部署的网站或者系统， 则在服务器上安装 `allinssl`：<br/>
> 常用的服务器是 `阿里云` `腾讯云`， 我们以`阿里云`服务器为例<br/>
>> 1. 来到阿里云控制器，找到服务器控制器 -> `远程连接` （关于远程连接，在`第二学期第四季`的课程都详解讲过了）<br/>
>> 2. 粘贴命令： `鼠标右键` -> `粘贴` -> `粘贴` -> `回车` -> 提示的时候，输入`y` -> 然后等待它安装，安装完成后，会告诉你 `ALLinSSL` 的访问地址，账户名和密码（`当然你可以拿记事本记一下下次用`），然后根据`ALLinSSL` 的访问地址，账户名和密码登录 `ALLinSSL`平台 <br/>
>> 3. [重点] `授权API管理`
3. 重点说一下： `授权API管理`  <br/>
> 第一次 `添加授权API`，主要是授权 `DNS供应商` ：
>> 1. 名称： 随便填，比如 `AllInSSL`
>> 2. 类型: `阿里云`（如果你的域名是腾讯云购买的，则选择 `腾讯云`）当然后续`ALLinSSL`也会提供更多服务商
>> 3. `AccessKeyId 和 AccessKeySecret`；
>>> 1. 如果你的域名是`腾讯云`购买的，则来到`腾讯云控制台`搜索 `访问管理` -> `API密钥管理` -> `新建密钥` -> `复制ScretId和ScretKey到这里即可` <br/>
>>> 2. 如果你的域名是`阿里云`购买：来到阿里云 `密钥管理页面` <https://ram.console.aliyun.com/profile/access-keys> , 但是建议 `使用RAM用户AccessKey`，不建议使用云账号 AccessKey <br/>
>>>> 1. 创建用户 <br/>
>>>>> 1. 登录名称: 随便填，比如：`AllInSSL` <br/>
>>>>> 2. 访问方式: 选择 `使用永久 AccessKey 访问`, 然后 `确定`， 然后 把 `AccessKey ID` 和 `AccessKey Secret` 复制保存到记事本并填写到 `ALLinSSL` 的`授权API管理`里面<br/>
>>>> 2. 给创建的用户授权
>>>>> 1. `添加权限` -> `权限策略`搜索 `dns`, 把搜索结果全部勾选上，然后 `确认新增权限` <br/>
> 
> 第二次 `添加授权API`，主要是配置需要部署证书的服务器 ：
>> 1. 名称： 随便填，比如 `AllInSSL`
>> 2. 类型: `宝塔面板`
>> 3. 面板URL: 
>>> 1. 来到宝塔面板-> `面板设置` -> `API接口(API接口配置)`
>>>> 1. API接口： 打开
>>>> 2. 接口密钥： 复制一下
>>>> 3. IP白名单(每行一个)： 127.0.0.1  
>>>> 4. 保存
>> 最后面板URL:  `http://127.0.0.1:面板端口/`
>> 4. API密钥：刚才复制的接口密钥
>> 5. 忽略 SSL/TLS证书错误： 可打开

4. 来到 `AllInSSL` 自动化部署
> 1. `新增自动化部署` -> `新建工作流` -> `快速部署模版`
> 2. `申请证书`：
>> 1. 域名：填写你要部署的https服务的域名，如：`www.51yrc.com`, 多个用逗号隔开 `51yrc.com,*.51yrc.com,lesson06wap.51yrc.com,lesson06.51yrc.com`
>> 2. 邮箱：填写你的邮箱，用于接收通知
>> 3. DNS提供商 ： `阿里云`（如果你的域名是腾讯云购买的，则选择 `腾讯云`） 
>> 4. 续签间隔(天) ：默认30天
> 3. `部署` -> `宝塔面板网站`
>> 1. 主机提供商: `宝塔面板AllinSSL`
>> 2. 证书来源: `申请证书`
>> 3. 站点名称: `你的网站名称`
> 4. `通知任务`可删除
> 5. `保存`
> 6. `执行`
> 7. `查看执行历史`






