(window.webpackJsonp=window.webpackJsonp||[]).push([[99],{502:function(t,e,a){"use strict";a.r(e);var r=a(24),_=Object(r.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"一-iis服务器配置-net网站上线一般步骤"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#一-iis服务器配置-net网站上线一般步骤"}},[t._v("#")]),t._v(" 一. IIS服务器配置.net网站上线一般步骤")]),t._v(" "),e("h3",{attrs:{id:"_1、-windows-server-2008-r2-企业版-64位中文版操作系统为例"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1、-windows-server-2008-r2-企业版-64位中文版操作系统为例"}},[t._v("#")]),t._v(" 1、 Windows Server 2008 R2 企业版 64位中文版操作系统为例")]),t._v(" "),e("blockquote",[e("p",[t._v("① 购买服务器： 首先到"),e("a",{attrs:{href:"https://www.aliyun.com/",title:"阿里云",target:"_blank"}},[t._v("[阿里云]")]),t._v("或者"),e("a",{attrs:{href:"https://cloud.tencent.com/",title:"腾讯云",target:"_blank"}},[t._v("[腾讯云]")]),t._v("购买服务器 "),e("br"),t._v(" "),e("br"),t._v("\n② 在阿里云或者腾讯云控制台，对服务器重置密码（建议用记事本将设置的信息记录下来）"),e("br"),e("br"),t._v("\n③ 在自己电脑："),e("code",[t._v("开始")]),t._v("->"),e("code",[t._v("所有程序")]),t._v("->"),e("code",[t._v("window附件")]),t._v("->"),e("code",[t._v("远程桌面连接")]),t._v("，"),e("br"),t._v(" "),e("span",{staticStyle:{"padding-left":"20px"}},[t._v("ip地址：服务器公网地址")]),e("br"),t._v(" "),e("span",{staticStyle:{"padding-left":"20px"}},[t._v("计算机名：administrator（默认，后面可以修改）")]),e("br"),t._v(" "),e("span",{staticStyle:{"padding-left":"20px"}},[t._v("密码：就是②重置的密码，登录到远程服务器")]),e("br"),e("br"),t._v("\n④ 在远程服务器上，安装IIS服务器 "),e("br"),e("br"),t._v("\n⑤ 设置服务器角色（更换一下远程登录名和密码，可选项） "),e("br"),t._v(" "),e("span",{staticStyle:{"padding-left":"20px"}},[e("code",[t._v("配置")]),t._v("-"),e("code",[t._v("本地用户和组")]),t._v("-"),e("code",[t._v("用户")]),t._v("，选中"),e("code",[t._v("Administrator")]),t._v("进行重命名和设置密码（记录在记事本上，下次远程登录就是现在设置的用户名和密码了）")]),e("br"),e("br"),t._v("\n⑥ 配置一下服务器的远程登录端口，具体查看： "),e("a",{attrs:{href:"https://blog.csdn.net/xiaoxiao_renhe/article/details/78875153",title:"安装应用程序池",target:"_blank"}},[t._v("[https://blog.csdn.net/xiaoxiao_renhe/article/details/78875153]")]),e("br"),e("br"),t._v("\n⑦ 设置好端口之后，可以重启服务器，在登录远程服务器就是：公网地址:端口号了"),e("br"),e("br"),t._v("\n⑧ 一定要在阿里云（腾讯云）安全组开放这个端口，不然无法远程连接 "),e("br"),e("br"),t._v("\n⑨ 安装ftp上传网站代码和数据库（可自行安装数据库）"),e("br"),t._v(" "),e("span",{staticStyle:{"padding-left":"20px"}},[t._v("1. 首先在"),e("code",[t._v("配置")]),t._v("-"),e("code",[t._v("本地用户和组")]),t._v("-"),e("code",[t._v("用户")]),t._v("创建一个角色，用这个角色指定ftp的上传用户名和密码")]),t._v(" "),e("br"),t._v(" "),e("span",{staticStyle:{"padding-left":"20px"}},[t._v("2. 接下来搭建ftp服务器，注意创建最后设置ftp服务器端口，这个端口记得在安全组开放")]),t._v(" "),e("br"),t._v(" "),e("span",{staticStyle:{"padding-left":"20px"}},[t._v("3. 测试ftp服务器是否搭建成功，关键在于是否开放一部分端口给ftp服务器进行通讯")]),t._v(" "),e("br"),e("br"),t._v("\n⑩ 安装应用程序池：具体查看 "),e("a",{attrs:{href:"https://blog.csdn.net/zai_yuzhong/article/details/51843161",title:"安装应用程序池",target:"_blank"}},[t._v("[https://blog.csdn.net/zai_yuzhong/article/details/51843161]")]),e("br"),t._v(" "),e("span",{staticStyle:{"padding-left":"20px"}},[t._v(".net 2.0框架注册：")]),e("br"),t._v(" "),e("span",{staticStyle:{"padding-left":"20px"}},[e("code",[t._v("C:\\WINDOWS\\Microsoft.NET\\Framework\\v2.0.50727\\aspnet_regiis.exe -i")])]),e("br"),t._v(" "),e("span",{staticStyle:{"padding-left":"20px"}},[t._v(".net 4.0注册（4.5框架的注册也是下面的命令，4.0和4.5的框架在IIS中都是显示的4.0）：")]),e("br"),t._v(" "),e("span",{staticStyle:{"padding-left":"20px"}},[e("code",[t._v("C:\\WINDOWS\\Microsoft.NET\\Framework\\v4.0.30319\\aspnet_regiis.exe -i")])]),e("br"),t._v("\n⑪ 【ISAPI和CGI显示】设置，将里面的限制改成允许"),e("br"),e("br"),t._v("\n至此，主要配置全部完成了！")])])])}),[],!1,null,null,null);e.default=_.exports}}]);