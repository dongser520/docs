---
navbar: true
sidebar: auto
title: eggjs即时通讯聊天页[图片、视频、音频、撤回消息、转发等]服务器交互处理
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
            result.forEach(v => {
                v.url = v.url.replace('http:','https:');
            });
            //console.log('阿里云OSS上传result',result);
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


### 5. 阿里云OSS视频封面获取
阿里云OSS提供了视频封面截取功能，方便快速获取视频封面。
> #### 1. 阿里云OSS视频封面截取方法
> `https://thinkphp-eggjs.oss-cn-hangzhou.aliyuncs.com/images/20250826/xxxx_xxxx.mp4?x-oss-process=video/snapshot,t_20,m_fast,w_260,f_png`
>
> #### 2. 方法说明
> | 参数   |  参数解释    |  单位说明   |  取值范围   |    
> | :---:  | :---:       |  :---:     |   :---:   | 
> | t      |  截图时间（视频播放到那个时间的帧的画面）|  单位：ms（毫秒） | （视频时长范围内）[0,视频时长]  | 
> | m      |  截图模式，不指定则为默认模式，根据时间精确截图，如果指定为`fast`则截取该时间点之前的最近的一个关键帧|   | 枚举值: `fast`  |
> | w      |  截图宽度，如果指定为0则自动计算 |  单位：px（像素值） | （视频宽度）[0,视频宽度]  |
> | h      |  截图高度，如果指定为0则自动计算，如果w和h都为0则输出为原视频宽高 |  单位：px（像素值） | （视频高度）[0,视频高度] |
> | f      |  输出截图图片格式  |   | 枚举值：`jpg、png`  |

### 6. 视频上传到服务器获取视频封面
接口说明文档内容：<a href="/fourthless/w-a/eggjs.即时通讯接口.html#三十一、视频上传到服务器获取视频封面" target="_blank">三十一、视频上传到服务器获取视频封面</a>

### ① 安装视频封面获取插件
首先，我们需要安装`fluent-ffmpeg`和`@ffmpeg-installer/ffmpeg`
```bash
npm install fluent-ffmpeg @ffmpeg-installer/ffmpeg --save
```

### ② 控制器代码
在控制器 `app/controller/video.js`
```js
'use strict';

const Controller = require('egg').Controller;
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const fs = require('fs');
const path = require('path');

// 设置ffmpeg路径
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

class VideoController extends Controller {
  // 获取视频截图并返回JSON对象
  async getVideoScreenshot() {
    const { ctx, app } = this;
    const { videoUrl, time, width, format = 'png' } = ctx.request.body;

    // 参数验证
    if (!videoUrl) {
      ctx.apiFail('视频地址不能为空');
      return;
    }
    if (time === undefined || time < 0) {
      ctx.apiFail('时间点参数无效');
      return;
    }
    if (width && (width <= 0 || width > 3840)) {
      ctx.apiFail('图片宽度应在1-3840之间');
      return;
    }

    try {
      // 将毫秒转换为秒
      const seconds = time / 1000;
      
      // 创建保存截图的目录
      const screenshotDir = path.join('app', 'public', 'uploads', 'Diy', 'VideoScreenshot');
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }
      
      // 生成唯一文件名
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const fileName = `screenshot_${timestamp}_${randomStr}.${format}`;
      const filePath = path.join(screenshotDir, fileName);
      
      // 创建ffmpeg命令
      const command = ffmpeg(videoUrl)
        .seekInput(seconds)
        .outputOptions('-vframes 1') // 只捕获一帧
        .output(filePath);

      // 添加宽度设置（如果提供）
      if (width) {
        command.size(`${width}x?`);
      }

      // 根据格式设置编码器
      if (format === 'png') {
        command.outputOptions('-vcodec png');
      } else if (format === 'jpg' || format === 'jpeg') {
        command.outputOptions('-vcodec mjpeg');
      }

      // 执行截图命令
      await new Promise((resolve, reject) => {
        command
          .on('end', () => {
            resolve();
          })
          .on('error', (err) => {
            reject(err);
          })
          .run();
      });

      // 检查文件是否生成成功
      if (!fs.existsSync(filePath)) {
        ctx.apiFail('截图生成失败');
        return;
      }

      // 读取文件并转换为base64
      const buffer = fs.readFileSync(filePath);
      const base64 = buffer.toString('base64');
      const base64Data = `data:image/${format};base64,${base64}`;
      
      // 生成可访问的URL
      const fileUrl = `/public/uploads/Diy/VideoScreenshot/${fileName}`;

      // 返回JSON对象
      ctx.apiSuccess({
        base64: base64Data,
        url: fileUrl,
        format,
        time,
        width: width || '原始宽度'
      });
    } catch (error) {
      ctx.logger.error('视频截图错误:', error);
      ctx.apiFail(`截图处理失败: ${error.message}`);
    }
  }
}

module.exports = VideoController;
```

### ③ 路由
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

    // 根据视频地址获取视频截图
    router.post('/api/chat/getVideoScreenshot',controller.video.getVideoScreenshot);

};   

```


## 二、撤回消息后端文档
### 1. 撤回消息接口说明
接口说明：<a href="/fourthless/w-a/eggjs.即时通讯接口.html#三十二、撤回消息接口说明" target="_blank">三十二、撤回消息接口说明</a>

### 2. 控制器代码
在控制器 `app/controller/api/chat/chatuser.js`
```js
    ...
    // 撤回消息（游客和登录用户都有这个权限）
    async revokeMessage() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            to_id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '接收者id或者群id', //字段含义
                range: {
                    min: 1,
                }
            },
            to_name: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '接收者或者群名称',
                range: {
                    min: 1,
                    max: 50,
                },
            },
            to_avatar: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '接收者或者群头像',
                range: {
                    min: 10,
                    max: 1000,
                },
            },
            id: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '消息uuid',
            },
            chatType: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '聊天类型',
                range: {
                    in: ['single', 'group'],
                },
            },
            create_time: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '消息发送时间', //字段含义
                range: {
                    min: 1000000000000,
                    max: (new Date()).getTime(),
                }
            },
        });
        const { to_id, to_name, to_avatar, id, chatType, create_time } = ctx.request.body;
        // 首先验证消息是否过期，超过5分钟消息不能撤回
        if ((new Date()).getTime() - create_time >  5 * 60 * 1000 ) {
            return this.ctx.apiFail('消息超过5分钟，不能撤回');
        }
        // 我
        let me = ctx.chat_user;
        let me_id = me.id;
        // 消息格式
        let message = {
            id: id, // 撤回的消息id
            from_avatar: me.avatar, // 发送者头像
            from_name: me.nickname || me.username, // 发送者名称
            from_id: me.id, // 发送者id
            to_id: to_id, // 群id|接收者id
            to_name: to_name, // 群名称|接收者 名称
            to_avatar: to_avatar, // 群头像| 接收者头像
            chatType: chatType, // 聊天类型 群聊 | 单聊
            type: 'systemNotice', // 消息类型 系统通知消息
            actionType: 'revoke', // 操作类型 撤回
            data: {
                data: `${me.nickname || me.username}撤回了一条消息`,
                dataType: false,
                otherData: null,
            }, // 消息内容
            options: {}, // 其它参数
            create_time: (new Date()).getTime(), // 创建时间
            isremove: 0, // 0未撤回 1已撤回
            // 群相关信息
            group: null,
        };


        if (chatType == 'single') {
            // 单聊处理
            // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
            ctx.chatWebsocketSendOrSaveMessage(to_id, message);
            return ctx.apiSuccess(message);
        } else if (chatType == 'group') {
            // 群聊处理
            // 1. 看一下群是否存在
            let group = await app.model.Group.findOne({
                where: {
                    id: to_id, // 群id
                    status: 1, // 状态
                },
                attributes: {
                    exclude: ['update_time'],
                },
                include: [{
                    //关联群用户表
                    model: app.model.GroupUser,
                    attributes: {
                        exclude: ['update_time'],
                    },
                    // 根据user_id 关联用户表，因为可能GroupUser中没有设置昵称和头像
                    include: [{
                        model: app.model.User,
                        attributes: ['id', 'username', 'avatar', 'nickname'],
                    }],
                }],
            });
            if (!group) {
                return ctx.apiFail('群不存在');
            }

            // 2. 我是否在群里
            let me_index = group.group_users.findIndex(v => v.user_id == me_id);
            if (me_index == -1) {
                return ctx.apiFail('你不在该群聊中，操作失败');
            }

            // 拿一下我的昵称和头像
            // 我在群里的昵称: 优先拿我在群里设置的昵称，没有则拿我自己的昵称，在没有则拿账号名
            let me_group_nickname = group.group_users[me_index].nickname || me.nickname || me.username;
            // 我在群聊的头像：优先拿我在群里的头像，没有则拿我自己的头像
            let me_group_avatar = group.group_users[me_index].avatar || me.avatar;

            // 优化通知消息
            message.from_avatar = me_group_avatar;
            message.from_name = me_group_nickname;
            message.data.data = `${me_group_nickname} 撤回了一条消息`;

            // 发给群成员
            group.group_users.forEach(v => {
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
            });

            return ctx.apiSuccess(message);
        }

    }
```

### 3. 路由
在文件 `app/router/api/chat/router.js`
```js
module.exports = app => {
    ...

    // 生成群二维码（登录用户和游客都有这个功能）
    ...

    // 上传文件（图片视频等）到本地服务器（自定义文件路径）（登录用户和游客都有这个功能）
    ...
    // 上传文件（图片视频等）到阿里云存储（登录用户和游客都有这个功能）
    ...

    // 根据视频地址获取视频截图
    ...

    // 撤回消息（游客和登录用户都有这个权限）
    router.post('/api/chat/revokeMessage',controller.api.chat.chatuser.revokeMessage);

};   

```


## 三、申请添加好友进行实时通知(后端文档)
我们在前面写了添加好友的方法 [<a href="/fourthless/w-a/eggjs.即时通讯好友相关接口.html#三、添加好友-申请添加好友" target="_blank">三、添加好友（申请添加好友）</a>]，但是当时讲的时候没有讲websocket，现在既然已经学习了websocket， 那么我们可以在用户申请添加好友后，通知给对方，让对方能及时处理。<br/>

### 1. 申请添加好友进行实时通知方法完善
在控制器 `app/controller/api/chat/goodfriendapply.js`
```js
'use strict';

const Controller = require('egg').Controller;

// 引入 uuid 库 `npm install uuid`
const { v4: uuidv4 } = require('uuid');

class GoodfriendapplyController extends Controller {
    //申请添加好友 （登录用户才能申请添加好友，（游客）申请添加好友）
    async applyfriend() {
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            friend_id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '我申请添加的好友id', //字段含义
                range:{
                    min:1,
                }
            },
            nickname: {
                type: 'string',  //参数类型
                required: false, //是否必须
                defValue: '', 
                desc: '我的昵称或者说明', //字段含义
                range:{
                    min:1,
                    max:50,
                }
            },
        });
        // 拿数据
        let {friend_id,nickname} = ctx.request.body;
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 不能添加自己为好友
        if(me_id == friend_id){
            return ctx.apiFail('不能添加自己为好友');
        }
        // 添加的好友是否存在
        const friend = await app.model.User.findOne({
            where:{
                id:friend_id,
                status:1, // 用户状态 1正常 0禁用
            }
        });
        if(!friend){
            return ctx.apiFail('添加的好友不存在');
        }
        // 添加的申请记录是否存在
        const apply = await app.model.Goodfriendapply.findOne({
            where:{
                user_id:me_id,
                friend_id,
                // 正在申请的，和通过申请的没必要再次申请
                status:['pending','agree'], 
            }
        });
        if(apply){
            return ctx.apiFail('您已经申请过了，请勿重复申请');
        }
        // 创建申请记录
        await app.model.Goodfriendapply.create({
            user_id:me_id,
            friend_id,
            nickname,
            status:'pending',
        });
        // return ctx.apiSuccess('ok');
        ctx.apiSuccess('ok');

        // websocket 通知
        // 消息格式
        let message = {
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: 'https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/group.png', // 发送者头像
            from_name: '好友申请提醒', // 发送者名称
            from_id: `redirect-applyFriend-${me_id}`, // 发送者id 系统id或者类型
            to_id: friend_id, // 接收者id  
            to_name: friend.nickname || friend.username, // 接收者名称
            to_avatar: friend.avatar, // 接收者头像
            chatType: 'single', // 聊天类型 单聊
            type: 'text', // 消息类型 系统通知消息
            data: {
                data: `用户[${me.nickname || me.username}]申请添加您为好友，请尽快处理`,
                dataType: false,
                otherData: null,
            }, // 消息内容
            // 新增处理链接
            redirect: {
                url:'/pages/applyMyfriend/applyMyfriend', // 处理链接地址
                type: 'navigateTo', // 处理链接类型
            }, // 处理链接
            options: {}, // 其它参数
            create_time: (new Date()).getTime(), // 创建时间
            isremove: 0, // 0未撤回 1已撤回
            // 群相关信息
            // group: {
            //     user_id: 'fromSystemId',
            //     remark: '',
            //     invite_confirm: 0,
            // }, 
        };
        // 拿到对方的socket
        let you_socket = ctx.app.ws.chatuser[friend_id];
        // 申请添加的好友正好在线  推送给对方
        // 如果拿不到对方的socket， 则把消息放在redis队列中， 等待对方上线时，再发送
        if (!you_socket) {
            // 放到reids，设置消息列表中：key值是：'chat_getmessage_' + friend_id（用户id）
            this.service.cache.setList('chat_getmessage_' + friend_id, message);
        } else {
            // 如果对方在线，则直接推送给对方
            you_socket.send(JSON.stringify({
                type: 'singleChat',
                data: message,
                timestamp: Date.now(),
            }));
            // 存储到对方redis历史记录中
            // key: `chatlog_对方id_[single|group]_我的id`
            // this.service.cache.setList(`chatlog_${friend_id}_${message.chatType}_${me.id}`, message);
        }

    }

    // 获取别人申请我为好友的列表数据（登录用户才行，（游客）不能）
    ...


    // 对申请加我为好友的信息进行处理（登录用户才行，（游客）不能）
    ...

}

module.exports = GoodfriendapplyController;
```


## 四、同意添加为好友实时通知(后端文档)

在控制器 `app/controller/api/chat/goodfriendapply.js`
```js
    ...
    // 对申请加我为好友的信息进行处理（登录用户才行，（游客）不能）
    // 实际是同意的情况下，向 goodfriend表插入数据
    async handleapply(){ 
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '申请表的id', //字段含义
                range:{
                    min:1,
                }
            },
            nickname: {
                type: 'string',  //参数类型
                required: false, //是否必须
                defValue: '', 
                desc: '好友备注', //字段含义
                range:{
                    min:1,
                    max:50,
                }
            },
            status: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '处理状态', //字段含义
                range:{
                    in:['pending', 'refuse', 'agree', 'ignore'],
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 当前申请id的数据是否存在
        let id = parseInt(ctx.params.id);
        let goodfriendapply = await app.model.Goodfriendapply.findOne({
            where:{
                id,
                friend_id:me_id,  // 谁可以处理：我
                status:'pending', // 状态需是 'pending'
            },
            include:[
                {
                    model:app.model.User,// 关联用户表，查的是申请加我为好友的用户信息user_id
                    attributes:['id','username','avatar','nickname','uuid'],
                }
            ],
        });
        if(!goodfriendapply){
            return ctx.apiFail('申请不存在或已处理');
        }
        // console.log('处理的申请信息',goodfriendapply);
        // 拿参数
        let { nickname, status} = ctx.request.body;
        // 接下来处理这么几步：
        // 1. 设置申请表`goodfriendapply`的状态
        // 2. 将同意状态下的信息写入我的好友表 `goodfriend`
        // 3. 同时将我的信息写入对方的好友表 `goodfriend`
        // 4. 上面三步要全部能够完成，如果其中一步出现错误，则应该回滚操作、
        // 因此上述操作，我们应该用事务进行处理
        // 定义事务
        let tansaction;
        try {
            // 开启事务
            tansaction = await app.model.transaction();
            // 事务处理逻辑
            // 1. 设置申请表`goodfriendapply`的状态
            //goodfriendapply.status = status; await goodfriendapply.save();
            await goodfriendapply.update({
                status:status,
            },{transaction:tansaction});
            // 2. 将同意状态下的对方信息写入我的好友表 `goodfriend`
            // 3. 同时将我的信息写入对方的好友表 `goodfriend`
            if(status == 'agree'){
                // 先判断一下我的好友表`goodfriend`中有没有对方
                let meHasHim = await app.model.Goodfriend.findOne({
                    where:{
                        user_id:me_id, // 我
                        friend_id: goodfriendapply.user_id, // 申请人
                    }
                });
                // 如果我的好友中没有对方
                if(!meHasHim){
                    // 则将对方的信息异步写入我的好友表
                    await app.model.Goodfriend.create({
                        user_id:me_id, // 我
                        friend_id: goodfriendapply.user_id, // 申请人
                        nickname:nickname, // 申请人昵称
                    },{transaction:tansaction});
                }

                // 先判断一下对方好友表`goodfriend`中有没有我
                let himHasMe = await app.model.Goodfriend.findOne({
                    where:{
                        user_id:goodfriendapply.user_id, // 申请人，对方好友
                        friend_id: me_id, // 我
                    }
                });
                // console.log('对方好友有没有我', himHasMe);
                // 如果对方好友没有我
                if(!himHasMe){
                    // 则将我的信息异步写入对方的好友表
                    await app.model.Goodfriend.create({
                        user_id:goodfriendapply.user_id, // 申请人，对方好友
                        friend_id: me_id, // 我
                        nickname:me.nickname, // 我的昵称
                    },{transaction:tansaction});
                }
            }

            //提交事务
            await tansaction.commit();
            // 反馈
            // return ctx.apiSuccess('ok');
            ctx.apiSuccess('ok');

            // websocket 通知
            if(status == 'agree'){
                // 消息格式 --- 先推给对方（申请加我的好友）
                let message = {
                    id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
                    from_avatar: me.avatar, // 发送者头像
                    from_name: me.nickname || me.username, // 发送者名称
                    from_id:  me_id, // 发送者id 系统id或者类型
                    to_id: goodfriendapply.user_id, // 接收者id  
                    to_name: nickname ||  goodfriendapply.user.nickname || goodfriendapply.user.username, // 接收者名称
                    to_avatar: goodfriendapply.user.avatar, // 接收者头像
                    chatType: 'single', // 聊天类型 单聊
                    type: 'systemNotice', // 消息类型 系统通知消息
                    data: {
                        data: `我们已经是好友了，可以开始聊天了`,
                        dataType: false,
                        otherData: null,
                    }, // 消息内容
                    options: {}, // 其它参数
                    create_time: (new Date()).getTime(), // 创建时间
                    isremove: 0, // 0未撤回 1已撤回
                    // 群相关信息
                    // group: {
                    //     user_id: 'fromSystemId',
                    //     remark: '',
                    //     invite_confirm: 0,
                    // }, 
                };
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                ctx.chatWebsocketSendOrSaveMessage(goodfriendapply.user_id, message);

                // 消息格式 --- 再推给我自己（跟上面刚好相反, 发送人成了对方，我成了接收方）
                message.from_avatar = goodfriendapply.user.avatar; // 发送者头像
                message.from_name = nickname ||  goodfriendapply.user.nickname || goodfriendapply.user.username; // 发送者名称
                message.from_id = goodfriendapply.user_id; // 发送者id 系统id或者类型
                message.to_id = me_id ; // 接收者id  
                message.to_name = me.nickname || me.username; // 接收者名称
                message.to_avatar = me.avatar; // 接收者头像
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                ctx.chatWebsocketSendOrSaveMessage(me_id, message);
            }
            
        } catch (error) {
            // 失败则回滚
            await tansaction.rollback();
            // 反馈
            return ctx.apiFail('系统异常，请稍后再试');
        }
        
    }
```


## 五、删除好友后端文档
### 1. 删除好友接口说明
接口说明可查看：[<a href="/fourthless/w-a/eggjs.即时通讯接口.html#三十三、删除好友" target="_blank">三十三、删除好友</a>]



### 2. 控制器代码
在控制器 `app/controller/api/chat/goodfriend.js` 中添加如下代码
```js
    ...
    // 查看对方是否是我的好友（登录用户才可以查看好友资料信息，（游客）没有这个功能）
    ...

    // 删除好友（登录用户有这个功能，（游客）没有这个功能）
    async deletegoodfriend(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '朋友id', //字段含义
                range:{
                    min:1,
                }
            },
        });
        // 拿参数
        const id = parseInt(ctx.params.id);
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 获取好友信息
        let data = await app.model.Goodfriend.findOne({
            where:{
                friend_id:id, // 好友id
                user_id:me_id,// 我
                // isblack:0, // 没有拉黑
            },
            attributes:{
                exclude:['order','create_time','update_time'],
            },
        });
        if(!data){
            return ctx.apiFail('不是好友关系，无权操作');
        }

        // 删除他在我的朋友记录
        await app.model.Goodfriend.destroy({
            where:{
                friend_id:id, // 朋友id
                user_id:me_id,// 我
                // isblack:0, // 没有拉黑
            },
        });

        // 删除我在他的朋友记录
        await app.model.Goodfriend.destroy({
            where:{
                friend_id:me_id, // 朋友id
                user_id:id,// 我
                // isblack:0, // 没有拉黑
            },
        });

        // 删除申请记录（防止以后又要加回来）
        // 我加他的记录
        await app.model.Goodfriendapply.destroy({
            where:{
                friend_id:id, // 朋友id
                user_id:me_id,// 我
            },
        });
        // 他加我的记录
        await app.model.Goodfriendapply.destroy({
            where:{
                friend_id:me_id, // 朋友id
                user_id:id,// 我
            },
        });


        return ctx.apiSuccess('删除好友成功');
    }
```


### 3. 路由
在文件 `app/router/api/chat/router.js` 中添加如下代码
```js
module.exports = app => {
    ...

    // 撤回消息（游客和登录用户都有这个权限）
    ...

    // 删除好友（登录用户有这个功能，（游客）没有这个功能），传好友id
    router.post('/api/chat/deletegoodfriend/:id', controller.api.chat.goodfriend.deletegoodfriend);

};   

```


## 六、修改我的头像昵称等信息后端文档
### 1. 修改我的头像昵称接口说明
接口说明可查看：[<a href="/fourthless/w-a/eggjs.即时通讯接口.html#三十四、修改我的信息-修改我的头像昵称等信息" target="_blank">三十四、修改我的信息（修改我的头像昵称等信息）</a>]

### 2. 控制器代码
在控制器 `app/controller/api/chat/chatuser.js` 中添加如下代码
```js
    ...
    // 修改账号信息（登录用户都有这个权限，游客根据情况有部分权限）
    async updateUserinfo() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            fieldname: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '修改类型',
                range: {
                    max: 30,
                    min: 1,
                },
            },
            fieldValue: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '修改结果',
                range: {
                    min: 1,
                },
            },
        });
        const { fieldname, fieldValue } = ctx.request.body;
        // 我
        let me = ctx.chat_user;
        let me_id = me.id;

        // 获取我的信息
        let myinfo = await app.model.User.findByPk(me_id);
        if (!myinfo) {
            return ctx.apiFail('用户不存在，无法修改信息');
        }

        // 返回说明
        let returnMsg = ``;
        // 修改内容判断
        if(fieldname == 'username'){
            return ctx.apiFail('账号不可修改');
        }
        if(fieldname == 'nickname'){
            // 昵称（游客和登录用户都可以修改）
            if(fieldValue.length > 30) return ctx.apiFail('昵称长度不能超过30个字符');
            myinfo.nickname = fieldValue;
            returnMsg = '修改昵称成功';
        }
        if(fieldname == 'avatar'){
            // 昵称（游客和登录用户都可以修改）
            if(fieldValue.length > 1000) return ctx.apiFail('头像地址过长不能超过1000个字符');
            myinfo.avatar = fieldValue;
            returnMsg = '头像更新成功';
        }

        if(fieldname == 'invite_confirm'){
            // 添加我为好友设置（游客和登录用户都可以修改）
            if(fieldValue != 0 && fieldValue != 1) return ctx.apiFail('添加我为好友设置值错误');
            myinfo.invite_confirm = fieldValue;
            returnMsg = '设置成功';
        }

        // 修改
        await myinfo.save();

        // 设置redis标记(这些修改不需要webscoket推送)，有效期60秒
        await this.app.redis.setex(`user:modify:${me_id}`, 60, '1');

        // 返回
        return ctx.apiSuccess(returnMsg);
    }
```

### 3. 路由
在文件 `app/router/api/chat/router.js` 中添加如下代码
```js
module.exports = app => {
    ...

    // 撤回消息（游客和登录用户都有这个权限）
    ...

    // 删除好友（登录用户有这个功能，（游客）没有这个功能），传好友id
    ...

    // 修改账号信息（登录用户都有这个权限，游客根据情况有部分权限）
    router.post('/api/chat/updateUserinfo', controller.api.chat.chatuser.updateUserinfo);

};   

```




























































