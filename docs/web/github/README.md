---
navbar: true
sidebar: auto
title: Github
---

## 一. 解决无法访问Github网站的一般步骤
### 1、 尝试修改hosts文件
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
> ⑤ 在 cmd 命令行中执行下面语句 来刷新 DNS，重启浏览器之后就能进入Github 网址
> ```javascript
> ipconfig/flushdns
> ```
