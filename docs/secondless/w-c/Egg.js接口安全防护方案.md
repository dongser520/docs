---
navbar: true
sidebar: auto
title: Egg.js接口安全防护方案
---

为了确保你的 Egg.js 接口只能通过你的网站访问并防止被 Postman 等工具直接调用，可以采取以下分层安全措施，从基础到高级逐步加固：

## 1. 基础防护：HTTP Referer/Origin 校验
检查请求头中的 Referer 或 Origin 字段，确保请求来源是你的网站域名。
```js
// middleware/check_referer.js
module.exports = () => {
  return async function checkReferer(ctx, next) {
    const allowedDomains = ['https://your-website.com', 'https://www.your-website.com'];
    const referer = ctx.get('referer') || '';
    const origin = ctx.get('origin') || '';

    // 验证 Referer 或 Origin 是否合法
    const isValid = allowedDomains.some(domain => 
      referer.startsWith(domain) || origin.startsWith(domain)
    );

    if (!isValid) {
      ctx.status = 403;
      ctx.body = { error: 'Forbidden' };
      return;
    }
    await next();
  };
};
```
<b>注意：</b>需在 config/config.default.js 中启用该中间件，并配置到需要保护的路由。

## 2. 启用 CSRF 防护
Egg.js 默认提供 CSRF 防护，开启后所有非安全请求（如 POST/PUT/DELETE）必须携带 CSRF Token。
```js
// config/config.default.js
exports.security = {
  csrf: {
    enable: true,
    // 可根据需要配置忽略的 API 路径（如开放接口）
    ignore: [], 
  },
};
```
<b>前端适配：</b>从 Cookie 中读取 csrfToken 并添加到请求头或表单字段：

```js
// 前端 AJAX 请求示例
fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-csrf-token': getCookie('csrfToken'), // 从 Cookie 读取
  },
  body: JSON.stringify({ data: 'test' }),
});
```

## 3. CORS 严格配置
限制跨域请求，仅允许你的网站域名访问接口。
```js
// config/config.default.js
exports.cors = {
  origin: ctx => {
    const allowedOrigins = ['https://your-website.com', 'https://www.your-website.com'];
    const requestOrigin = ctx.get('origin');
    return allowedOrigins.includes(requestOrigin) ? requestOrigin : '';
  },
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  credentials: true, // 允许携带 Cookie
};
```

## 4. 用户认证与授权
使用 Token 或 Session 确保用户已登录且有权访问接口。<br/><br/>
<b>JWT 示例：</b>

```js
// middleware/auth.js
const jwt = require('jsonwebtoken');
module.exports = () => {
  return async function auth(ctx, next) {
    const token = ctx.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      ctx.throw(401, 'Unauthorized');
    }
    try {
      const decoded = jwt.verify(token, 'your-secret-key');
      ctx.user = decoded; // 将用户信息挂载到上下文
      await next();
    } catch (err) {
      ctx.throw(401, 'Invalid token');
    }
  };
};
```

## 5. 请求签名与防重放
为每个请求生成唯一签名，防止篡改和重放。<br/><br/>
签名规则：<br/>
1. 将请求参数按固定顺序拼接。
2. 添加时间戳和随机 Nonce。
3. 使用 HMAC 算法生成签名。

```js
// 前端生成签名示例
const params = { data: 'test' };
const timestamp = Date.now();
const nonce = Math.random().toString(36).substr(2);
const signStr = `${timestamp}${nonce}${JSON.stringify(params)}`;
const signature = CryptoJS.HmacSHA256(signStr, 'your-secret-key').toString();

// 后端验证中间件
checkSignature(ctx) {
  const { timestamp, nonce, signature } = ctx.headers;
  const params = ctx.request.body;
  const signStr = `${timestamp}${nonce}${JSON.stringify(params)}`;
  const expectedSign = CryptoJS.HmacSHA256(signStr, 'your-secret-key').toString();
  if (signature !== expectedSign || Date.now() - timestamp > 5000) {
    ctx.throw(403, 'Invalid signature');
  }
}
```

## 6. 客户端指纹校验
通过浏览器环境特征识别请求来源（如 WebGL 指纹、Canvas 指纹）。
```js
// 前端生成指纹并发送到服务端
import FingerprintJS from '@fingerprintjs/fingerprintjs';
const fp = await FingerprintJS.load();
const result = await fp.get();
ctx.set('x-client-fingerprint', result.visitorId);

// 后端校验指纹中间件
async checkFingerprint(ctx, next) {
  const clientFingerprint = ctx.get('x-client-fingerprint');
  if (!validFingerprints.includes(clientFingerprint)) {
    ctx.throw(403, 'Invalid client');
  }
  await next();
}
```

## 7. 动态 Token 防御
在关键操作（如支付、数据修改）中使用动态一次性 Token（OTP）。
```js
// 服务端生成 OTP 并缓存（如 Redis）
const otp = generateOTP(); // 例如 6 位随机数字
await app.redis.set(`otp:${userId}`, otp, 'EX', 60); // 60 秒过期

// 前端提交时必须携带该 OTP
// 后端验证 OTP 是否匹配
```

## 8. 请求频率限制
防止暴力调用，使用 egg-ratelimiter 插件限制 IP 或用户的请求频率。
```js
// config/plugin.js
exports.ratelimiter = {
  enable: true,
  package: 'egg-ratelimiter',
};

// config/config.default.js
config.ratelimiter = {
  duration: 60000, // 1 分钟
  max: 100, // 允许 100 次请求
};
```

## 9. 混淆接口路径
避免暴露接口规律，例如： <br/>
1. 使用随机字符串作为路由路径：/api/v1/3xYm9/query
2. 定期更换接口路径（需配合前端动态获取）。

## 10. 深度防御：行为分析与 WAF
1. 部署 Web 应用防火墙（WAF）过滤恶意请求。
2. 记录异常请求日志（如频繁 404、非常规 User-Agent）。
3. 结合 AI 分析用户行为模式，拦截异常流量。

## 总结建议
1. 必选基础方案：CSRF + CORS + JWT + Referer 校验。
2. 增强方案：请求签名 + 频率限制 + 动态 OTP。
3. 高级方案：客户端指纹 + 接口混淆 + WAF。

通过多层级防护，即使攻击者获取了接口地址，也需要突破多个验证环节才能调用成功。