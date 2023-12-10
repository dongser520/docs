---
navbar: true
sidebar: auto
title: IIS服务器
---

## 一. IIS服务器配置.net网站上线一般步骤
### 1、 Windows Server 2008 R2 企业版 64位中文版操作系统为例
> ① 购买服务器： 首先到<a href="https://www.aliyun.com/" title="阿里云" target="_blank">[阿里云]</a>或者<a href="https://cloud.tencent.com/" title="腾讯云" target="_blank">[腾讯云]</a>购买服务器 <br/> <br/>
> ② 在阿里云或者腾讯云控制台，对服务器重置密码（建议用记事本将设置的信息记录下来）<br/><br/>
> ③ 在自己电脑：`开始`->`所有程序`->`window附件`->`远程桌面连接`，<br/>
> <span style="padding-left:20px">ip地址：服务器公网地址</span><br/>
> <span style="padding-left:20px">计算机名：administrator（默认，后面可以修改）</span><br/>
> <span style="padding-left:20px">密码：就是②重置的密码，登录到远程服务器</span><br/><br/>
> ④ 在远程服务器上，安装IIS服务器 <br/><br/>
> ⑤ 设置服务器角色（更换一下远程登录名和密码，可选项） <br/>
> <span style="padding-left:20px">`配置`-`本地用户和组`-`用户`，选中`Administrator`进行重命名和设置密码（记录在记事本上，下次远程登录就是现在设置的用户名和密码了）</span><br/><br/>
> ⑥ 配置一下服务器的远程登录端口，具体查看： <a href="https://blog.csdn.net/xiaoxiao_renhe/article/details/78875153" title="安装应用程序池" target="_blank">[https://blog.csdn.net/xiaoxiao_renhe/article/details/78875153]</a><br/><br/>
> ⑦ 设置好端口之后，可以重启服务器，在登录远程服务器就是：公网地址:端口号了<br/><br/>
> ⑧ 一定要在阿里云（腾讯云）安全组开放这个端口，不然无法远程连接 <br/><br/>
> ⑨ 安装ftp上传网站代码和数据库（可自行安装数据库）<br/>
> <span style="padding-left:20px">1. 首先在`配置`-`本地用户和组`-`用户`创建一个角色，用这个角色指定ftp的上传用户名和密码</span> <br/>
> <span style="padding-left:20px">2. 接下来搭建ftp服务器，注意创建最后设置ftp服务器端口，这个端口记得在安全组开放</span> <br/>
> <span style="padding-left:20px">3. 测试ftp服务器是否搭建成功，关键在于是否开放一部分端口给ftp服务器进行通讯</span> <br/><br/>
> ⑩ 安装应用程序池：具体查看 <a href="https://blog.csdn.net/zai_yuzhong/article/details/51843161" title="安装应用程序池" target="_blank">[https://blog.csdn.net/zai_yuzhong/article/details/51843161]</a><br/>
> <span style="padding-left:20px">.net 2.0框架注册：</span><br/>
> <span style="padding-left:20px">`C:\WINDOWS\Microsoft.NET\Framework\v2.0.50727\aspnet_regiis.exe -i`</span><br/>
> <span style="padding-left:20px">.net 4.0注册（4.5框架的注册也是下面的命令，4.0和4.5的框架在IIS中都是显示的4.0）：</span><br/>
> <span style="padding-left:20px">`C:\WINDOWS\Microsoft.NET\Framework\v4.0.30319\aspnet_regiis.exe -i`</span><br/>
> ⑪ 【ISAPI和CGI显示】设置，将里面的限制改成允许<br/><br/>
> 至此，主要配置全部完成了！


