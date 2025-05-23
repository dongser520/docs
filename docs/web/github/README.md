---
navbar: true
sidebar: auto
title: Github
---

## 一. 解决无法访问Github网站的一般步骤
### 1. 尝试修改hosts文件
> ① <a href="https://ipaddress.com/website/github.com" target="_blank">github网址查询：https://ipaddress.com/website/github.com </a> 获取到ip地址 <br/><br/>
> ② <a href="https://ipaddress.com/website/github.global.ssl.fastly.net" target="_blank">github域名查询：https://ipaddress.com/website/github.global.ssl.fastly.net </a> 获取到ip地址 <br/><br/>
> ② <a href="https://ipaddress.com/website/github.io" target="_blank">github.io域名查询：https://ipaddress.com/website/github.io </a> 获取到ip地址 <br/><br/>
> ④ 打开hosts文件（C:\Windows\System32\drivers\etc\hosts）、末尾放入IP 地址：
> ```javascript
> # GitHub Start
> 140.82.114.4      github.com
> 151.101.1.194     github.global.ssl.fastly.net
> 151.101.65.194    github.global.ssl.fastly.net
> 151.101.129.194   github.global.ssl.fastly.net
> 151.101.193.194   github.global.ssl.fastly.net
> 185.199.108.153   github.io
> 185.199.109.153   github.io
> 185.199.110.153   github.io
> 185.199.111.153   github.io
> # GitHub End
> ```
> 保存退出<br/><br/>
> ⑤ 在 cmd 命令行中执行下面语句 来刷新 DNS <br/>
> <p><img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/01.png" style="width: 50%;" /></p><br/>
><p><img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/02.png" style="width: 50%;" /></p><br/> 
> ⑥ 确定后打开命令行，输入以下命令：<br/>
> ```javascript
> ipconfig/flushdns
> ```
> ⑦ 重启浏览器之后就能进入Github 网址

### 2. 如果使用手机热点可以打开github，宽带打不开则尝试修改DNS
`以win10为例`：
### 1. 开始 -> `控制面板` 
<p><img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/03.png" style="width: 50%;" /></p> 

### 2. 网络和Internet 
<p><img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/04.png" style="width: 100%;" /></p> 
<p><img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/05.png" style="width: 100%;" /></p>
<p><img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/06.png" style="width: 100%;" /></p>
<p><img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/07.png" style="width: 100%;" /></p>
<p><img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/08.png" style="width: 100%;" /></p>
点击 “确定” 保存设置，关闭所有窗口。
<br/><br/>

### 3. 验证DNS是否生效<br/>
### ① 清除DNS缓存
> <p><img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/01.png" style="width: 50%;" /></p><br/>
><p><img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/02.png" style="width: 50%;" /></p><br/>
> 
> ```js
> 输入命令： ipconfig /flushdns
> ```
> <p><img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/09.png" style="width: 100%;" /></p>

### ② 测试DNS解析
> ```js
> 输入命令： nslookup github.com
> ```
> <p><img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/10.png" style="width: 100%;" /></p>

然后就可以正常访问github网站了。

### ③ 如果修改DNS后网络异常，则恢复自动获取DNS
> <p><img src="https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/docs-imgs/11.png" style="width: 100%;" /></p>

### 4.常见问题说明
1. 修改后仍无法访问GitHub？
> 尝试更换其他DNS服务器（如腾讯DNS 119.29.29.29）。<br/>
> 结合 修改Hosts文件 解决域名解析问题。
<br/>

2. 提示“无权限修改网络设置”？
> 确保当前用户账户具有管理员权限。<br/>
> 右键点击“命令提示符”或“设置”时选择 “以管理员身份运行”。
<br/>

3. DNS设置不生效？
> 重启电脑或路由器。<br/>
> 检查是否在正确的网络适配器（Wi-Fi/以太网）上修改了DNS。