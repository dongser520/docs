---
navbar: true
sidebar: auto
title: eggjs即时通讯聊天页发[图片、视频、音频等]服务器交互处理
---

## 一、uni-app项目发送文件[图片视频等]到服务器或者阿里云OSS
### 1. uni-app项目发送文件[图片视频等]到服务器
#### ① <b>关于上传文件的功能说明</b><br/>

1. `上传图片（文件）到服务器` ，这个内容在我们课程：<a href="/secondless/w-c.html#_1-第二学期第三季课程介绍" target="_blank">[第二学期第三季]</a>讲网站前后台开发的时候已经讲过了。<br/>
2. 对应的文档内容：<a href="/secondless/w-c/上传文件.html#一、stream-流模式上传文件-单个文件-文件存储在你自己的服务器上" target="_blank">[一、Stream 流模式上传文件（单个文件），文件存储在你自己的服务器上]</a>

#### ② uni-app项目发送文件[图片视频等]到服务器的接口说明
接口说明文档内容：<a href="/fourthless/w-a/eggjs.即时通讯接口.html#三十、上传图片等文件到服务器或者阿里云" target="_blank">三十、上传图片等文件到服务器或者阿里云</a>



### 2. uni-app项目发送文件[图片视频等]到阿里云OSS
#### ① 新建扩展方法
在扩展 `app/extend/context.js`
```js

/*
//通用文件上传到阿里云OSS方法--File模式
// 阿里云OSS SDK
const OSS = require('ali-oss');
// node系统模块
const path = require('path');
const fs = require('fs/promises');
const crypto = require('crypto');
*/

//通用文件上传到阿里云OSS方法--Stream 流模式
// 阿里云OSS SDK
const OSS = require('ali-oss');
// node系统模块
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
//使用 pump 确保流正确写入,必须写入临时文件后才能上传到 OSS
//内存管理优化,使用 pump 控制流式写入,每个文件单独处理，避免内存峰值,及时清理临时文件
const pump = require('mz-modules/pump');


// 引入二维码插件
var qr = require('qr-image');

module.exports = {
    ...

    // 生成二维码
    createQrcode(url) {
        var img = qr.image(url, { size: 10 });
        // 类型：image/png | svg
        this.response.type = 'image/png';
        // img.pipe(this.response); 
        this.body = img;
    },


    // 针对uni-app项目上传文件到阿里云存储单文件处理
    // 针对uni-app项目通用单文件处理文件上传到阿里云OSS方法--Stream 流模式--单文件--写入本地临时文件--在上传
    /**
     * 通用文件上传到阿里云OSS方法--Stream 流模式
     * @param {string} fieldName - 上传文件的字段名
     * @param {number} imageClassId - 图片分类ID，默认为0
     * @param {string} prefix - 阿里云oss的Bucket中最外层文件夹名称，默认为'images'
     * @returns {Array} - 上传结果数组，每个元素对象包含上传文件的URL、路径、分类ID和创建时间
     */
    async uploadOSS_Stream_uniapp_singleFile_temp(fieldName, imageClassId = 0, prefix = 'images') {
        const { app } = this;
        const client = new OSS(app.config.oss.client);
        const results = [];

        try {
        // 获取文件流
        const stream = await this.getFileStream();

        // 检查是否是目标字段
        if (stream.fieldname !== fieldName) {
            throw new Error(`Expected field '${fieldName}', but got '${stream.fieldname}'`);
        }

        // 生成唯一文件名
        const timestamp = Date.now();
        const randomStr = crypto.randomBytes(6).toString('hex');
        const extname = path.extname(stream.filename).toLowerCase();
        const filename = `${timestamp}_${randomStr}${extname}`;

        // 创建日期目录
        const now = new Date();
        const datePath = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, '0'),
            String(now.getDate()).padStart(2, '0')
        ].join('');

        // 构造完整路径
        const ossPath = `${prefix}/${datePath}/${filename}`;

        // 创建临时文件路径
        const tmpFilePath = path.join(
            app.config.multipart.tmpdir,
            `${timestamp}_${randomStr}${extname}`
        );

        // 写入临时文件
        const writeStream = fs.createWriteStream(tmpFilePath);
        await pump(stream, writeStream);

        // 上传到OSS
        const ossRes = await client.put(
            ossPath,
            fs.createReadStream(tmpFilePath)
        );

        // 清理临时文件
        await fs.promises.unlink(tmpFilePath).catch(() => { });

        results.push({
            url: ossRes.url,
            path: ossPath,
            image_class_id: Number(imageClassId),
            create_time: Math.floor(Date.now() / 1000)
        });

        return results;
        } catch (err) {
        // 异常时清理临时文件
        if (tmpFilePath) {
            await fs.promises.unlink(tmpFilePath).catch(() => { });
        }
        throw err;
        }
    },

    // 针对uni-app项目单文件处理通用文件上传到阿里云OSS方法--Stream 流模式--单文件--不写入本地临时文件--直接流上传
    /**
     * 通用文件上传到阿里云OSS方法--Stream 流模式
     * @param {string} fieldName - 上传文件的字段名
     * @param {number} imageClassId - 图片分类ID，默认为0
     * @param {string} prefix - 阿里云oss的Bucket中最外层文件夹名称，默认为'images'
     * @returns {Array} - 上传结果数组，每个元素对象包含上传文件的URL、路径、分类ID和创建时间
     */
    async uploadOSS_Stream_uniapp_singleFile(fieldName, imageClassId = 0, prefix = 'images') {
        const { app } = this;
        const client = new OSS(app.config.oss.client);
        const results = [];

        try {
        // 获取文件流
        const stream = await this.getFileStream();

        // 检查是否是目标字段
        if (stream.fieldname !== fieldName) {
            throw new Error(`Expected field '${fieldName}', but got '${stream.fieldname}'`);
        }

        // 生成唯一文件名
        const timestamp = Date.now();
        const randomStr = crypto.randomBytes(6).toString('hex');
        const extname = path.extname(stream.filename).toLowerCase();
        const filename = `${timestamp}_${randomStr}${extname}`;

        // 创建日期目录
        const now = new Date();
        const datePath = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, '0'),
            String(now.getDate()).padStart(2, '0')
        ].join('');

        // 构造完整路径
        const ossPath = `${prefix}/${datePath}/${filename}`;

        // 直接使用putStream方法上传流
        const ossRes = await client.putStream(ossPath, stream);

        results.push({
            url: ossRes.url,
            path: ossPath,
            image_class_id: Number(imageClassId),
            create_time: Math.floor(Date.now() / 1000)
        });

        return results;
        } catch (err) {
        throw err;
        }
    }

};
```

#### ② uni-app项目发送文件[图片视频等]到阿里云OSS功能实现
在控制器 `app/controller/admin/image.js`
```js
'use strict';

const Controller = require('egg').Controller;

class ImageController extends Controller {

    // uniapp项目图片上传阿里云
    async uniapp_uploadAliyunOSS() {
        const { ctx, app } = this;
        try {
            // 获取分类ID（通过字段传递）
            const imageClassId = ctx.query.imageClassId || ctx.request.body.image_class_id || 0;
    
            // 针对uni-app项目通用单文件处理文件上传到阿里云OSS方法--Stream 流模式--单文件--写入本地临时文件--在上传
            // const result = await ctx.uploadOSS_Stream_uniapp_singleFile_temp('img', imageClassId, 'images');
            // 针对uni-app项目单文件处理通用文件上传到阿里云OSS方法--Stream 流模式--单文件--不写入本地临时文件--直接流上传
            const result = await ctx.uploadOSS_Stream_uniapp_singleFile('img', imageClassId, 'images');
    
            ctx.apiSuccess(result);
        } catch (error) {
            app.logger.error('阿里云OSS上传失败:', error);
            ctx.apiFail('上传失败: ' + error.message);
        }
    }
    // 图片上传阿里云
    async uploadAliyunOSS() {
        ...
    }

    ...
}

module.exports = ImageController;
```


### 3. 路由
在文件 `app/router/api/chat/router.js`
```js
module.exports = app => {
    ...

    // 生成群二维码（登录用户和游客都有这个功能）
    ...

    // 上传文件（图片视频等）到本地服务器（自定义文件路径）（登录用户和游客都有这个功能）
    router.post('/api/chat/uploadStreamSingleToServerDiy/:diydir', 
                controller.upload.uploadStreamSingleToServerDiy); 
    // 上传文件（图片视频等）到阿里云存储（登录用户和游客都有这个功能）
    router.post('/api/chat/uploadAliyun',controller.admin.image.uniapp_uploadAliyunOSS);

};   

```


### 4. 接口说明
接口说明文档内容：<a href="/fourthless/w-a/eggjs.即时通讯接口.html#三十、上传图片等文件到服务器或者阿里云" target="_blank">三十、上传图片等文件到服务器或者阿里云</a>





































































































