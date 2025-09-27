---
navbar: true
sidebar: auto
title: eggjs即时通讯单聊相关方法
---

## 一、单聊相关方法汇总
控制器 `/app/controller/api/chat/chatuser.js`

```js
'use strict';
//哈希函数 
const crypto = require('node:crypto');
// 引入 uuid 库 `npm install uuid`
const { v4: uuidv4 } = require('uuid');

const Controller = require('egg').Controller;

class ChatuserController extends Controller {
    // 用户登录
    async userlogin() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '账号', //字段含义
                range: {
                    min: 4,
                    max: 20
                }
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '密码',
                range: {
                    min: 6,
                    max: 20
                }
            },
        });
        // 拿参数
        const { username, password } = ctx.request.body;
        // 比对信息
        await this.compareData({
            username,
            password
        });

    }
    // 验证密码
    async checkPassword(password, hash_password) {
        let hash = crypto.createHash('sha256', this.app.config.crypto.secret); //或者md5
        hash.update(password);
        password = hash.digest('hex');
        if (password !== hash_password) {
            this.ctx.throw(400, '账户或密码错误');
        }
        return true;
    }
    // 用户注册
    async userregister() {
        //1.参数验证
        this.ctx.validate({
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '账号', //字段含义
                range: {
                    min: 4,
                    max: 20
                }
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '密码',
                range: {
                    min: 6,
                    max: 20
                }
            },
        });
        let { username, password } = this.ctx.request.body;
        let user = await this.app.model.User.findOne({ where: { username } });
        if (user) {
            return this.ctx.apiFail('该账号已存在，请换一个账号注册');
        }
        //否则不存在则写入数据库
        let status = 1;
        let res = await this.app.model.User.create({
            username,
            password,
            status
        });
        // 创建用户资料
        await this.ctx.model.UserInfo.create({
            user_id: res.id
        });
        // 成功返回数据
        // res =  JSON.parse(JSON.stringify(res));
        // delete res.password;
        // this.ctx.apiSuccess(res);
        // 逻辑： 注册成功后，自动登录，返回token
        // 比对信息
        await this.compareData({
            username,
            password
        });
    }

    // 比对信息，自动登录
    async compareData(option) {
        const { ctx, app } = this;
        // 判断是否存在
        let user = await app.model.User.findOne({
            where: {
                username: option.username,
                status: 1,
            },
        });
        if (!user) {
            // ctx.throw(400, '账号不存在或者被禁用');
            return ctx.apiFail('账号不存在或者被禁用');
        }
        // 如果比对传递了role, 且role = 'visitor' 则表示是游客登录，不需要验证密码
        if (!(option.role && option.role == 'visitor')) {
            // 验证密码
            await this.checkPassword(option.password, user.password);
        }

        //存储在session中，定义session中的一个属性authuser存储用户登录信息
        // ctx.session.authuser = user; //存储到session

        // 根据业务需要，这里可以更新一些信息，比如：登录时间、登录ip等
        await user.update({
            last_login: Date.now(),//登录时间
        });
        // 把user转换成json对象，进行后续一些处理和返回给客户端
        user = JSON.parse(JSON.stringify(user));
        // 注意注册用户退出登录后，应该以游客模式返回前端访问
        if (option.role && option.role == 'visitor') {
            user.role = 'visitor'; // 给前端返回游客模式
        }
        //console.log('用户比对信息', user);
        // 生成唯一token
        let token = ctx.getToken(user);
        user.token = token;
        // console.log('即时通讯登录用户信息', user);
        // 加入到缓存中（保证用户提交验证的token来自我们服务器生成的）
        // 即加入redis中, 注意缓存时间的设置 60 * 60 * 24 * 365 * 100 为100年
        // 第三个参数为0，则是永不过期
        let user_token = await this.service.cache.set('chat_user_' + user.id,
            token, 60 * 60 * 24 * 365 * 100);
        if (!user_token) {
            ctx.throw(400, '登录失败');
        }


        /*
        // 这部分内容统一到：控制器 /app/controller/api/chat/chatwebsocket.js 发消息
        console.log('如果比对传递了role, 且role = visitor 则表示是游客', option.role);
        // 如果比对传递了role, 且role = 'visitor' 则表示是游客
        if (option.role && option.role == 'visitor') {
            // 新增给当前游客用户，由系统发一个登录提醒
            const startTime = Date.now();
            const maxWait = 20000; // 20秒超时
            const checkInterval = 500; // 每500ms检查一次

            const checkWebSocket = () => {
                // 1. 检查WebSocket是否存在
                console.log('WebSocket已就绪，立即执行',this.ctx.app.ws.chatuser[user.id]);
                if (this.ctx.app.ws.chatuser && this.ctx.app.ws.chatuser[user.id]) {
                    // WebSocket已就绪，立即执行
                    this.systemSendLoginRemind(user);
                }
                // 2. 检查是否超时
                else if (Date.now() - startTime < maxWait) {
                    // 未超时则继续轮询
                    setTimeout(checkWebSocket, checkInterval);
                }
                // 超时后自动结束（不执行任何操作）
            };

            // 首次检查（立即开始）
            setTimeout(checkWebSocket, 0);
        }
        */


        // 返回
        delete user.password;
        return ctx.apiSuccess(user);
    }

    // 用户退出登录
    async userlogout() {
        const { ctx, app } = this;
        // 获取当前用户信息 通过中间件chatUserAuth挂载到ctx.chat_user了
        let user = ctx.chat_user;
        if (user) {
            let user_token = await this.service.cache.get('chat_user_' + user.id);
            // console.log('即时通讯用户缓存信息', user_token);
            if (user_token) {
                //清除redis
                await this.service.cache.remove('chat_user_' + user.id);
            }
        }
        return ctx.apiSuccess(true);
    }

    // 搜索用户功能（登录用户才能搜索用户，未登录用户（游客）不能搜索用户）
    async searchUser() {
        const { ctx, app } = this;
        //1.参数验证
        ctx.validate({
            keyword: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '搜索关键词', //字段含义
                range: {
                    min: 1,
                    max: 50
                }
            },
        });
        // 获取搜索关键词
        let { keyword } = ctx.request.body;
        // 查询用户（模糊查询）
        const Op = app.Sequelize.Op;
        let users = await app.model.User.findAll({
            where: {
                username: {
                    [Op.like]: `%${keyword}%`,
                },
                status: 1,
                role: {
                    [this.app.Sequelize.Op.ne]: 'visitor', // role != 'visitor'
                },
                id: {
                    [this.app.Sequelize.Op.ne]: ctx.chat_user.id, // id != 自己的id
                },
            },
            // 读取某些字段
            attributes: ['id', 'username', 'avatar', 'role', 'uuid', 'nickname'],
            // 除了某些字段，其它都获取
            // attributes: { 
            //     exclude: ['password','uuid','mobile','email'], 
            // },
        });
        return ctx.apiSuccess(users);
    }


    // 游客用户注册身份
    async visitorRegister() {
        const { ctx, app } = this;
        // 1. 签名验证
        const clientSign = ctx.get('X-Security-Sign');
        // return ctx.apiSuccess(clientSign);
        // 没有签名
        if (!clientSign) {
            return ctx.apiError('非法访问');
        }
        // 校验签名
        // 参数验证
        ctx.validate({
            deviceId: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '设备指纹', //字段含义
                range: {
                    min: 36,
                    max: 200
                }
            },
            timestamp: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '时间戳', //字段含义
            },
            uniplatform: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '平台类型',
                range: {
                    min: 2,
                    max: 50
                }
            },
            devicemodel: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '设备型号',
                range: {
                    min: 1,
                    max: 50
                }
            },
            deviceos: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '操作系统',
                range: {
                    min: 1,
                    max: 50
                }
            },
            devicebrand: {
                type: 'string',
                required: false,
                defValue: '',
                desc: '设备品牌',
                range: {
                    min: 1,
                    max: 50
                }
            },
        });
        const { deviceId, timestamp,
            uniplatform, devicemodel, deviceos, devicebrand } = ctx.request.body;
        // 校验签名
        const serverSign = this.generateSign({
            deviceId,
            timestamp,
            salt: app.config.salt.secret, // 需与客户端盐值一致，存在配置中
        });

        if (clientSign !== serverSign) {
            return ctx.apiFail('非法签名');
        }

        // 2.请求时效验证（5分钟有效）
        if (Date.now() - timestamp > 300000) {
            return ctx.apiFail('请求已过期');
        }

        // 3. 设备ID格式校验
        if (!/^[\w-]{36}$/.test(deviceId)) {
            return ctx.apiFail('无效标识');
        }

        // 4. 限流策略（redis实现）
        const key = `chat_visitor_reg:${deviceId}`;
        const count = await ctx.app.redis.incr(key);
        await ctx.app.redis.expire(key, 3600); // 1小时过期

        if (count > 5) { // 1小时内最多5次
            //return ctx.throw(429, '请求过于频繁');
            return ctx.apiFail('请求过于频繁，请1个小时后再试');
        }

        // 5. 创建或更新游客用户
        /*
        let user = await ctx.model.User.findOrCreate({
            where: { devicefingeruuid: deviceId },
            defaults: {
                username: username,
                password: password,
                role: 'visitor',
                last_login: new Date()
            }
        });
        // 记得把user转一下, 注意返回的user是个数组
        user = JSON.parse(JSON.stringify(user));
        console.log('注意返回的user是个数组', user);
        */
        // 看一下这个deviceId标识下是否有账户
        let deviceIdUser = await this.app.model.User.findOne({ where: { devicefingeruuid: deviceId } });
        if (deviceIdUser) {
            // 如果有账户 - 一般返回客户端可以转一下
            // deviceIdUser = JSON.parse(JSON.stringify(deviceIdUser));
            // console.log('游客账户',deviceIdUser.toJSON());
            if (deviceIdUser.role == 'visitor') {
                // 如果是游客账户
                // 更新一下最近一次操作时间
                deviceIdUser.last_login = new Date();
                await deviceIdUser.save();
                // 游客账户自动登录，但不需要密码验证
                // 比对信息进行自动登录
                await this.compareData({
                    username: deviceIdUser.username,
                    role: deviceIdUser.role,
                });
            } else if (deviceIdUser.role == 'user') {
                // 如果是正常注册账户，退出登录后，用游客模式登录访问
                await this.compareData({
                    username: deviceIdUser.username,
                    role: 'visitor', // 注意这里改成了游客模式
                });
            }
            // 以下内容选择性更新（可采用异步更新，不用await）
            deviceIdUser.update({
                uniplatform, devicemodel, deviceos, devicebrand,
            });
        } else {
            // 没有账户则创建游客账户
            // 游客用户名：自定义
            let username = `VIS${deviceId.substr(0, 8)}`;
            // 游客密码:随机6位数，不足6位前面补0填充 即：000000-999999
            let password = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
            let user = await this.app.model.User.create({
                // 游客用户名：自定义
                username: username,
                // 游客密码:随机6位数，不足6位前面补0填充 即：000000-999999
                password: password,
                // 游客角色
                role: 'visitor',
                // 最近一次操作时间
                last_login: new Date(),
                // 设备指纹
                devicefingeruuid: deviceId,
                // 以下内容选择性写入
                uniplatform, devicemodel, deviceos, devicebrand,
            });
            user = JSON.parse(JSON.stringify(user));
            // 创建游客资料
            let userinfo = await this.ctx.model.UserInfo.findOne({ where: { user_id: user.id } });
            if (!userinfo) {
                //没有则创建
                await this.ctx.model.UserInfo.create({
                    user_id: user.id
                });
            }
            // 比对信息进行自动登录
            await this.compareData({
                username,
                password
            });
        }
    }

    // 生成服务端签名
    generateSign(params) {
        const sortedStr = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&');
        // 2. （必须与前端的拼接方式一致）
        const fullString = sortedStr + 'APP_SECRET';

        return crypto
            //.createHmac('sha256', 'APP_SECRET') // 使用配置密钥
            .createHash('sha256') // 注意这里是 createHash 不是 createHmac
            .update(fullString)
            .digest('hex');
    }

    // 游客用户正式注册身份
    async visitorregChat() {
        const { ctx, app } = this;
        // 1. 签名验证
        const clientSign = ctx.get('X-Security-Sign');
        // return ctx.apiSuccess(clientSign);
        // 没有签名
        if (!clientSign) {
            return ctx.apiError('非法访问');
        }
        // 校验签名
        //1.参数验证
        this.ctx.validate({
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '账号', //字段含义
                range: {
                    min: 4,
                    max: 20
                }
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '密码',
                range: {
                    min: 6,
                    max: 20
                }
            },
            deviceId: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '设备指纹', //字段含义
                range: {
                    min: 36,
                    max: 200
                }
            },
            timestamp: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '时间戳', //字段含义
            },
        });
        let { username, password, deviceId, timestamp } = this.ctx.request.body;
        // 校验签名
        const serverSign = this.generateSign({
            deviceId,
            timestamp,
            salt: app.config.salt.secret, // 需与客户端盐值一致，存在配置中
        });

        if (clientSign !== serverSign) {
            return ctx.apiFail('非法签名');
        }

        // 2.请求时效验证（5分钟有效）
        if (Date.now() - timestamp > 300000) {
            return ctx.apiFail('请求已过期');
        }

        // 3. 设备ID格式校验
        if (!/^[\w-]{36}$/.test(deviceId)) {
            return ctx.apiFail('无效标识');
        }

        // 4. 限流策略（redis实现）
        const key = `chat_visitor_reg:${deviceId}`;
        const count = await ctx.app.redis.incr(key);
        await ctx.app.redis.expire(key, 3600); // 1小时过期

        if (count > 5) { // 1小时内最多5次
            //return ctx.throw(429, '请求过于频繁');
            return ctx.apiFail('请求过于频繁，请1个小时后再试');
        }

        // 5. 注册账号或者更新账号
        // 账号之前都是以游客身份入驻的，账号和秘密都是随机的，现在正式注册，需要更新账号和密码
        // 先看一下注册的账号是否已经存在
        let user = await this.app.model.User.findOne({ where: { username } });
        if (user) {
            return this.ctx.apiFail('该账号已存在，请换一个账号注册');
        }
        // 再根据deviceId查询一下这个账户是否存在
        let deviceIdUser = await this.app.model.User.findOne({ where: { devicefingeruuid: deviceId } });
        if (deviceIdUser) {
            // 有则更新用户名密码
            deviceIdUser.username = username;
            deviceIdUser.password = password;
            // 重点：切换身份
            deviceIdUser.role = 'user';
            deviceIdUser.last_login = new Date();
            // 更新用户名密码
            await deviceIdUser.save();
        } else {
            //否则不存在账户则写入数据库
            let status = 1;
            let res = await this.app.model.User.create({
                username,
                password,
                status,
                last_login: new Date(),
            });
            // 创建用户资料
            await this.ctx.model.UserInfo.create({
                user_id: res.id
            });
            // 成功返回数据
            // res =  JSON.parse(JSON.stringify(res));
            // delete res.password;
            // this.ctx.apiSuccess(res);
        }
        // 逻辑： 注册成功后，自动登录，返回token
        // 比对信息,进行自动登录
        await this.compareData({
            username,
            password
        });
    }

    // 游客用户正式登录身份
    async visitorloginChat() {
        const { ctx, app } = this;
        // 1. 签名验证
        const clientSign = ctx.get('X-Security-Sign');
        // return ctx.apiSuccess(clientSign);
        // 没有签名
        if (!clientSign) {
            return ctx.apiError('非法访问');
        }
        // 校验签名
        //1.参数验证
        this.ctx.validate({
            username: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '账号', //字段含义
                range: {
                    min: 4,
                    max: 20
                }
            },
            password: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '密码',
                range: {
                    min: 6,
                    max: 20
                }
            },
            deviceId: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '设备指纹', //字段含义
                range: {
                    min: 36,
                    max: 200
                }
            },
            timestamp: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '时间戳', //字段含义
            },
        });
        let { username, password, deviceId, timestamp } = this.ctx.request.body;
        // 校验签名
        const serverSign = this.generateSign({
            deviceId,
            timestamp,
            salt: app.config.salt.secret, // 需与客户端盐值一致，存在配置中
        });

        if (clientSign !== serverSign) {
            return ctx.apiFail('非法签名');
        }

        // 2.请求时效验证（5分钟有效）
        if (Date.now() - timestamp > 300000) {
            return ctx.apiFail('请求已过期');
        }

        // 3. 设备ID格式校验
        if (!/^[\w-]{36}$/.test(deviceId)) {
            return ctx.apiFail('无效标识');
        }

        // 4. 限流策略（redis实现）
        const key = `chat_visitor_reg:${deviceId}`;
        const count = await ctx.app.redis.incr(key);
        await ctx.app.redis.expire(key, 3600); // 1小时过期

        if (count > 5) { // 1小时内最多5次
            //return ctx.throw(429, '请求过于频繁');
            return ctx.apiFail('请求过于频繁，请1个小时后再试');
        }

        // 5. 登录账号
        // 比对信息，自动登录
        await this.compareData({
            username,
            password
        });
    }

    // 查看用户信息(公共接口，游客和登录用户都可以访问)
    async userinfo() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            uuid: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: 'uuid值', //字段含义
                range: {
                    min: 36,
                    max: 36
                }
            },
        });
        const { uuid } = ctx.params;
        let user = await app.model.User.findOne({
            where: {
                uuid,
                status: 1,
            },
            attributes: ["id", "uuid", "username", "nickname", "avatar", "role", "userset"],
            include: [
                {
                    model: app.model.UserInfo,
                    as: 'userinfo',
                    attributes: {
                        exclude: ['user_id', 'order', 'create_time', 'update_time'],
                    },
                }
            ],
        });
        user = JSON.parse(JSON.stringify(user));
        /*
        // 看一下是不是我的好友：--- 需要这个字段那么这个方法要走中间件
        // 因为走了中间件 ctx.chat_user 才有值
        let me_id = ctx.chat_user ? ctx.chat_user.id : 0;
        // console.log('我的id', ctx.chat_user.id);
        // console.log('user的id', user.id);
        let goodfriend = await app.model.Goodfriend.findOne({
            where:{
                user_id:me_id,
                friend_id:user.id,
                isblack:0, //不是黑名单
            }
        });
        // 新增字段：是否是好友
        user.myfriend = goodfriend ? true : false;
        */
        //delete user.id;
        /*
        // 模拟用户对聊天的一些设置（会取自数据库userset字段）
        user.chatset = {
            // 对游客（未登录用户）聊天的设置
            visitor: {
                // 是否允许游客聊天
                // 0 禁止(需先登录) 1 可以发一条消息 2 可以聊天
                sendCount: 0,
                // 是否需要关注
                needFollow: true,
            },
            // 对user登录用户
            // 0 禁止(需先加为好友) 1 可以发一条消息 2 可以聊天
            user:{
                sendCount: 2,
                needFollow: true,
            },
        };
        */

        return ctx.apiSuccess(user);
    }

    // 查看用户是否申请加我为好友（登录用户有这个权限，游客无权限）
    async isApplyfriend() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            uuid: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: 'uuid值', //字段含义
                range: {
                    min: 36,
                    max: 36
                }
            },
        });
        const { uuid } = ctx.params;
        // 查用户
        let user = await app.model.User.findOne({
            where: {
                uuid,
                status: 1,
            },
            attributes: ["id"],
        });
        if (!user) {
            return this.ctx.apiFail('用户不存在');
        }
        // 查申请表, 为了判断我是否有权限处理这个申请
        let goodfriendapply = await app.model.Goodfriendapply.findOne({
            where: {
                friend_id: ctx.chat_user.id, // 加的我，朋友id是我
                user_id: user.id, // 谁：用户
                status: 'pending',
            },
            attributes: {
                exclude: ['order', 'create_time', 'update_time'],
            },
        });
        if (!goodfriendapply) {
            return this.ctx.apiFail('用户申请信息不存在');
        }
        return this.ctx.apiSuccess(goodfriendapply);
    }


    // 用户设置更新（登录用户有这个权限，游客无权限）
    async userset() {
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            userset: {
                type: 'string',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '用户设置', //字段含义
                range: {
                    min: 2,
                }
            },
        });
        const { userset } = ctx.request.body;
        // 我
        let me = ctx.chat_user;
        let me_id = me.id;
        // 更新
        let user = await app.model.User.findOne({
            where: {
                id: me_id,
                status: 1,
            },
        });
        await user.update({
            userset
        });
        //返回
        return this.ctx.apiSuccess('ok');
    }


    // 系统给游客发送登录提醒消息
    async systemSendLoginRemind(user) {
        const { ctx, app, service } = this;
        // 消息格式
        // console.log('要发登录提示消息的用户user', user); return;
        let _from_id = 0; // 系统id
        let message = {
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: 'https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/kefu.png', // 发送者头像
            from_name: '系统消息', // 发送者名称
            from_id: _from_id, // 发送者id 系统id
            to_id: user.id, // 接收者id  
            to_name: user.nickname || user.username, // 接收者名称
            to_avatar: user.avatar, // 接收者头像
            chatType: 'single', // 聊天类型 单聊
            type: 'text', // 消息类型 系统通知消息
            data: {
                data: "欢迎您，登录可以获取更多功能！",
                dataType: false,
                otherData: null,
            }, // 消息内容
            // 新增处理链接
            redirect: {
                url:'/pages/loginCenter/loginCenter', // 处理链接地址
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
            // 新增一个消息id的key
            msgidKey: _from_id, // 消息id(便于前端在消息页查找记录)
        };
        // 推送给游客
        /*
        // 单进程推送
        // 拿到游客的socket
        let you_socket = ctx.app.ws.chatuser[user.id];
        // 如果对方在线，则直接推送给对方
        you_socket.send(JSON.stringify({
            type: 'singleChat',
            data: message,
            timestamp: Date.now(),
        }));
        */
        // 多进程推送
        // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
        ctx.chatWebsocketSendOrSaveMessage(user.id, message, false, false);

    }

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
        await this.app.redis.setex(`user:modify:${me_id}`, 60, `${fieldname}`);

        // 返回
        return ctx.apiSuccess(returnMsg);
    }

    // 获取用户一些设置信息如：加好友设置、聊天设置等（登录用户有这个权限，游客无权限）
    async getUserSetInfo(){
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            userid: {
                type: 'int',
                required: true,
                // defValue: '', 
                desc: '用户id',
                range: {
                    min: 1,
                },
            },
        });
        const { userid } = ctx.request.body;
        // 1.查一下用户是否存在并且角色是user
        let user = await app.model.User.findOne({
            where: {
                id: userid,
                role: 'user',
                status: 1, // 正常
            },
            attributes: ['id', 'userset', 'invite_confirm','uuid'],
        });
        if(!user){
            return ctx.apiFail('用户不存在或者为游客，无法加为好友');
        }
        // 2. 查一下我是不是他的好友
        // 我
        let me = ctx.chat_user;
        let me_id = me.id;
        let goodfriend = await app.model.Goodfriend.findOne({
            where: {
                user_id:userid,
                friend_id: me_id,
            },
        });
        // 定义是否好友字段
        let isgoodfriend = false; // 是否好友，默认不是
        let isgoodfriend_status = true; // 好友状态，默认正常
        if(goodfriend){
            isgoodfriend = true; // 是好友
            if(goodfriend.isblack == 1 || goodfriend.status != 1){
                isgoodfriend_status = false; // 状态异常
            }
        }
        // 3. 返回
        user = JSON.parse(JSON.stringify(user));
        user.isgoodfriend = isgoodfriend;
        user.isgoodfriend_status = isgoodfriend_status;
        // 返回
        return ctx.apiSuccess(user);
    }

    // 修改密码（登录用户有这个权限，游客无权限）
    async setPassword(){
        const { ctx, app } = this;
        //1.参数验证
        this.ctx.validate({
            oldpassword: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '原始密码',
            },
            newpassword: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '新密码',
            },
            checknewpassword: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '确认新密码',
            },
        });
        const { oldpassword, newpassword, checknewpassword } = ctx.request.body;
        // 1. 新密码与确认新密码是否一致
        if(newpassword != checknewpassword){
            return ctx.apiFail('新密码与确认新密码不一致');
        }
        // 我
        let me = ctx.chat_user;
        if(ctx.tokenUser && ctx.tokenUser.role != me.role && ctx.tokenUser.role == 'visitor'){
            // 用户未登录的情况，不能修改密码
            return ctx.apiFail('您未登录，无法修改密码');
        }
        // 修改密码
        // 先查原始密码是否正确，拿一下原密码
        let myinfo = await app.model.User.findOne({
            where: {
                id: me.id,
                status: 1, // 正常
            }
        });
        if (!myinfo) {
            return ctx.apiFail('用户不存在，无法修改密码');
        }
        // 原始密码已加密的密码
        let password = myinfo.password;
        // 验证oldpassword
        let hash = crypto.createHash('sha256', this.app.config.crypto.secret); //或者md5
        hash.update(oldpassword);
        let hashedOldPassword = hash.digest('hex'); // 使用新的变量名
        if (password !== hashedOldPassword) {
            return ctx.apiFail('原始密码错误，无法修改密码');
        }
        // 修改密码
        await myinfo.update({
            password: newpassword,
        },{
            where: {
                id: me.id,
            }
        });

        // 返回
        return ctx.apiSuccess('修改密码成功');
        
    }

}

module.exports = ChatuserController;
```



## 二、单聊相关方法接口说明
单聊相关方法接口说明：<a href="/fourthless/w-a/eggjs.即时通讯接口.html#一、用户注册" target="_blank">单聊相关方法接口说明</a><br/>