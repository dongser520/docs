---
navbar: true
sidebar: auto
title: 清除服务器Nginx缓存
---

前言：<br/>
- 如果在服务器上部署多种语言项目，如 `php` 、`egg.js` 、 `node.js` 、`python` 、`java` 、`go` 、`.net`, 
由于其它项目已经完成，新项目部署为了不影响其他项目，会尽量规避大的调整，<b style="text-decoration: underline;">比如之前你部署的是`php`的项目，下个项目是`egg.js`，
在`egg.js`项目上线后，可能会有多次调整代码的情况，但是此时 `反向代理` 由于其他项目配置到全局，此时只能通过 `配置文件` 进行单独处理，</b>
接下来以 `nginx` 缓存为例，介绍如何清除缓存， 保证上线的项目更新静态文件 如`css/js`等有效。<br/>



## 一、正常配置egg.js项目
正常配置一个egg.js项目，具体查看： <a href="/deploy/eggjs.chat.html" target="_blank">比如：eggjs + 即时通讯功能后端部署上线</a>


## 二、 配置文件重点说明
- 此时 `反向代理` 由于其他项目配置到全局，此时只能通过 `配置文件` 进行单独处理，以下是一个样本：
### 1. 原配置文件的新增部分
```js
server
{
    ...

    //  底部加入 -- 下面两段是egg.js的代理配置，支持websocket
    //  注意端口号和项目对应
     location ^~ /
    {
        proxy_pass http://localhost:7012;
        proxy_set_header Host localhost;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_http_version 1.1;
        # proxy_hide_header Upgrade;

        add_header X-Cache $upstream_cache_status;

        #Set Nginx Cache
        
        
        set $static_fileIy3dvi5O 0;
        if ( $uri ~* "\.(gif|png|jpg|css|js|woff|woff2)$" )
        {
            set $static_fileIy3dvi5O 1;
            expires 1m;
            }
        if ( $static_fileIy3dvi5O = 0 )
        {
        add_header Cache-Control no-cache;
        }
    }
    
    # websocket的配置
    location /ws
    {
      proxy_pass http://localhost:7012;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "Upgrade";
      proxy_set_header X-Real-IP $remote_addr;
    }
}
```


### 2. 清除Nginx缓存 [以(js|css)为例]
```js
server
{
    ...

    location ~ .*\.(js|css)?$
    {
        # 稳定运行后，可设置缓存时间
        expires      12h;
        # 彻底禁用所有缓存 - 解开这一段，即可彻底禁用缓存
        # expires -1;
        # add_header Cache-Control "no-cache, no-store, must-revalidate, max-age=0";
        # add_header Pragma "no-cache";
        # add_header Expires "0";
        # error_log /dev/null;
        # access_log /dev/null;
    }
    access_log  /www/wwwlogs/yrkj.mmmcoo.ru.log;
    error_log  /www/wwwlogs/yrkj.mmmcoo.ru.error.log;

    ...
}
```


## 三、清除缓存的操作
- 在对应项目的终端执行：
```bash
# 1. 停止 Nginx
sudo systemctl stop nginx

# 2. 清除所有可能的缓存文件
sudo find /tmp -name "*nginx*" -delete
sudo find /var/cache -name "*nginx*" -delete 2>/dev/null || true
sudo rm -rf /www/server/nginx/proxy_cache_dir/* 2>/dev/null || true

# 3. 杀死所有 Nginx 进程（确保完全清理）
sudo pkill -9 nginx

# 4. 重新启动 Nginx
sudo systemctl start nginx

# 5. 确认 Nginx 运行状态
sudo systemctl status nginx
```

- 测试缓存是否真正清除(换成你的项目域名)
- -  使用 curl 测试（避免浏览器缓存干扰）：
```bash
# 测试不存在的 CSS 文件（应该返回 404 或 502）
curl -I -H "Cache-Control: no-cache" "https://yrkj.mmmcoo.ru/public/api/template03/template/pc/skin/css/common.css"

# 测试存在的 CSS 文件
curl -I -H "Cache-Control: no-cache" "https://yrkj.mmmcoo.ru/public/api/template03/template/pc/skin/css/common1.css"
```



## 四、最后提供一个egg.js配置文件样本

```js
# 在 server 配置块内，定义上游服务器
# upstream egg_app {
#     server 127.0.0.1:7012; # 你的Egg.js应用地址
#     keepalive 64; # 可选，保持长连接数量
# }


server
{
    listen 80;
    listen 443 ssl;
    listen 443 quic;
    http2 on;
    server_name yrkj.mmmcoo.ru demo.mmmcoo.ru;
    index index.php index.html index.htm default.php default.htm default.html;
    root /www/wwwroot/newWebsite/template03/yrkj.mmmcoo.ru;
    #CERT-APPLY-CHECK--START
    # 用于SSL证书申请时的文件验证相关配置 -- 请勿删除
    include /www/server/panel/vhost/nginx/well-known/yrkj.mmmcoo.ru.conf;
    #CERT-APPLY-CHECK--END

    #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则
    #error_page 404/404.html;
    ssl_certificate    /www/server/panel/vhost/cert/yrkj.mmmcoo.ru/fullchain.pem;
    ssl_certificate_key    /www/server/panel/vhost/cert/yrkj.mmmcoo.ru/privkey.pem;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_tickets on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    add_header Strict-Transport-Security "max-age=31536000";
    add_header Alt-Svc 'quic=":443"; h3=":443"; h3-29=":443"; h3-27=":443";h3-25=":443"; h3-T050=":443"; h3-Q050=":443";h3-Q049=":443";h3-Q048=":443"; h3-Q046=":443"; h3-Q043=":443"';
    error_page 497  https://$host$request_uri;

    #SSL-END

    #ERROR-PAGE-START  错误页配置，可以注释、删除或修改
    error_page 404 /404.html;
    #error_page 502 /502.html;
    #ERROR-PAGE-END

    #PHP-INFO-START  PHP引用配置，可以注释或修改
    include enable-php-00.conf;
    #PHP-INFO-END

    #REWRITE-START URL重写规则引用,修改后将导致面板设置的伪静态规则失效
    include /www/server/panel/vhost/rewrite/yrkj.mmmcoo.ru.conf;
    #REWRITE-END

    #禁止访问的文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.env|\.svn|\.project|LICENSE|README.md)
    {
        return 404;
    }

    #一键申请SSL证书验证目录相关设置
    location ~ \.well-known{
        allow all;
    }

    #禁止在证书验证目录放入敏感文件
    if ( $uri ~ "^/\.well-known/.*\.(php|jsp|py|js|css|lua|ts|go|zip|tar\.gz|rar|7z|sql|bak)$" ) {
        return 403;
    }

    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    {
        expires      30d;
        error_log /dev/null;
        access_log /dev/null;
    }

    location ~ .*\.(js|css)?$
    {
        expires      12h;
       # 彻底禁用所有缓存
        # expires -1;
        # add_header Cache-Control "no-cache, no-store, must-revalidate, max-age=0";
        # add_header Pragma "no-cache";
        # add_header Expires "0";
        # error_log /dev/null;
        # access_log /dev/null;
    }
    access_log  /www/wwwlogs/yrkj.mmmcoo.ru.log;
    error_log  /www/wwwlogs/yrkj.mmmcoo.ru.error.log;
    
     # 添加反向代理规则
    # location /api/ {  # 这是你希望代理的路径
    #     proxy_pass http://egg_app; # 这里使用upstream的名称
    #     proxy_set_header Host $host;
    #     proxy_set_header X-Real-IP $remote_addr;
    #     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #     proxy_set_header X-Forwarded-Proto $scheme;
    #     # 如果你的应用需要WebSocket支持，还需添加以下头部
    #     # proxy_set_header Upgrade $http_upgrade;
    #     # proxy_set_header Connection "upgrade";
    # }
    
    
    location ^~ /
{
    proxy_pass http://localhost:7012;
    proxy_set_header Host localhost;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_http_version 1.1;
    # proxy_hide_header Upgrade;

    add_header X-Cache $upstream_cache_status;

    #Set Nginx Cache
    
    
    set $static_fileIy3dvi5O 0;
    if ( $uri ~* "\.(gif|png|jpg|css|js|woff|woff2)$" )
    {
    	set $static_fileIy3dvi5O 1;
    	expires 1m;
        }
    if ( $static_fileIy3dvi5O = 0 )
    {
    add_header Cache-Control no-cache;
    }
}
    
    location /ws
   {
      proxy_pass http://localhost:7012;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "Upgrade";
      proxy_set_header X-Real-IP $remote_addr;
   }
}
```



































