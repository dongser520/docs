---
navbar: true
sidebar: auto
title: eggjs即时通讯websocket发消息的控制器完整代码
---

## 一、websocket发消息的控制器方法汇总(控制器 `/app/controller/api/chat/chatwebsocket.js` 完整代码)

```js
'use strict';

const Controller = require('egg').Controller;

// 引入 uuid 库 `npm install uuid`
const { v4: uuidv4 } = require('uuid');

class ChatwebsocketController extends Controller {
    // 链接websocket
    async connect() {
        const { ctx, app, service } = this;
        console.log('链接websocket用户的id', ctx.websocket.chatuser_id);
        // 确保连接存在
        if (!ctx.websocket) {
            return ctx.apiFail('非法访问');
        }
        console.log(`clients链接数: ${app.ws.clients.size}`);

        // 添加心跳机制
        let heartbeatInterval = setInterval(() => {
            try {
                if (ctx.websocket.readyState === 1) { // OPEN
                    ctx.websocket.send(JSON.stringify({ type: 'ping' }));
                }
            } catch (e) {
                clearInterval(heartbeatInterval);
            }
        }, 30000); // 每30秒发送一次心跳


        // 监听消息
        ctx.websocket.on('message', async msg => {
            console.log(`---------监听websocket用户的id: ${ctx.websocket.chatuser_id} 消息原始数据:`, msg);
            // 1. 添加消息类型检查
            let messageString;
            if (typeof msg !== 'string') {
                if (Buffer.isBuffer(msg)) {
                    messageString = msg.toString('utf-8'); // 转换二进制数据
                } else {
                    console.log('收到非文本消息，已忽略', msg);
                    return; // 忽略非文本消息
                }
            } else {
                messageString = msg;
            }

            console.log('监听消息字符串:', messageString);

            try {
                // 尝试解析JSON
                const data = JSON.parse(messageString);

                // 2. 添加对客户端心跳响应的处理
                if (data.type === 'pong') {
                    console.log('收到客户端心跳响应');
                    return;
                }

                // 3. 添加对客户端心跳请求的响应
                if (data.type === 'ping') {
                    console.log('收到客户端心跳请求，token:', data.token);
                    
                    // 验证token有效性
                    if (data.token) {
                        try {
                            const user = ctx.checkToken(data.token);
                            console.log('心跳token验证成功，用户ID:', user.id);
                            
                            // 响应心跳
                            ctx.websocket.send(JSON.stringify({
                                type: 'pong',
                                timestamp: Date.now()
                            }));
                        } catch (tokenError) {
                            console.log('心跳token验证失败:', tokenError.message);
                        }
                    } else {
                        console.log('心跳消息缺少token');
                        // 响应心跳但不验证
                        ctx.websocket.send(JSON.stringify({
                            type: 'pong',
                            timestamp: Date.now()
                        }));
                    }
                    return;
                }

                // 处理其他消息类型...
            } catch (e) {
                // 4. 增强错误处理
                if (messageString.includes('undefined')) {
                    console.warn('收到无效消息，可能来自连接断开事件');
                } else {
                    console.error('消息解析错误', e, '原始消息:', messageString);
                    
                    // 尝试处理非JSON格式的心跳消息
                    if (messageString === 'ping') {
                        console.log('收到简单ping消息');
                        ctx.websocket.send(JSON.stringify({
                            type: 'pong',
                            timestamp: Date.now()
                        }));
                        return;
                    }
                }
            }
        });

        // 监听关闭
        ctx.websocket.on('close', async (code, reason) => {
            console.log('可能因页面刷新长时间未连接等原因websocket关闭了-监听关闭状态码-原因', code, reason);
            // 清除心跳
            clearInterval(heartbeatInterval); 
            // 关闭进行下线处理-关闭socket链接-及用户下线处理
            console.log('监听关闭事件-下线处理-监听关闭状态码',code);
            // 1. 拿websocket用户记录
            const chatuser_id = ctx.websocket.chatuser_id;
            // 2. 移除websocket用户记录
            await ctx.UserWebsocketCloseAndDelete();  
            // 3. 多进程：根据进程存储方式 - 移除redis中用户的上线记录
            await ctx.removeOnlineProcessId(chatuser_id);
            
        });

        // 发送欢迎消息-所有人都发
        ctx.websocket.send(JSON.stringify({
            type: 'system',
            data: '欢迎您访问我们的系统！',
            timestamp: Date.now()
        }));

        // 能走到这一步，是先走的
        // 1. 中间件 app/middleware/chat_user_auth.js
        // 2. 再走中间件 app/middleware/chatwebsocket.js
        // 3. 它通过了，说明token是没有问题的，不然在中间件chat_user_auth.js就拦截了
        // 4. 走中间件 chatwebsocket.js 通过，说明websocket也链接成功了，用户上线了
        // 接下来可以考虑发消息了，但我们需要知道用户角色，可以再次拿一下token
        const token = ctx.header.token || ctx.query.token || ctx.request.body.token;
        // 不用在判断token，因为走了两个中间件，已经判断过了
        let tokenUser = ctx.checkToken(token);
        console.log('根据解密token拿用户当前所扮演的角色', tokenUser);
        // 5. 根据角色不同，发不同的系统消息
        if(tokenUser.role == 'visitor'){
            // 角色role=visitor 游客 发系统消息
            this.websockt_visitorMsg(tokenUser);
        }else if(tokenUser.role == 'user'){
            // 角色role=user 登录用户 发系统消息
            this.websockt_userMsg(tokenUser);
        }
    }


    // 角色role=visitor 游客 发系统消息
    async websockt_visitorMsg(chatuser){
        // 消息越靠后，在前端越显示在最上面
        const { ctx, app, service } = this;
        // 1. 如果有群聊列表，给它提示一下
        this.websocktMsg_groupList(chatuser);
        // 提示游客登录的消息
        this.websocktMsg_visitorLogin(chatuser);

        
    }
    // 角色role=user 登录用户 发系统消息
    async websockt_userMsg(chatuser){
        // 消息越靠后，在前端越显示在最上面
        const { ctx, app, service } = this;
        // 1. 如果有群聊列表
        this.websocktMsg_groupList(chatuser);
        // 2： 通讯录
        this.websocktMsg_friendList(chatuser);
        // 3： 账号信息设置 - 不满意头像可以换
        this.websocktMsg_userInfoSet(chatuser);
        // 4： 谁可以和我聊天
        this.websocktMsg_whoCanChatMe(chatuser);
        // 5： 我的二维码
        this.websocktMsg_myQrcode(chatuser);
        // 6： 搜索加好友 - 搜索
        this.websocktMsg_search(chatuser);
    }

    

    //发送消息
    async sendmessage() {
        const { ctx, app, service } = this;
        //参数验证
        ctx.validate({
            sendto_id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '接收人/群的id值', //字段含义
                range: {
                    min: 1,
                }
            },
            chatType: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '接收类型', // 单聊 single 群聊 group
                range: {
                    in: ['single', 'group'],
                }
            },
            type: {
                type: 'string',
                required: true,
                // defValue: '', 
                // 'text'|'iconMenus'|'image'|'audio'|'video' 等等
                desc: '消息类型',
            },
            data: {
                type: 'string',
                required: true,
                // defValue: '', 
                desc: '消息内容',
            },
            options: {
                type: 'string',
                required: false, //选填
                defValue: '', 
                desc: '额外参数json字符串',
            },
        });
        // 获取参数
        const { sendto_id, chatType, type, data, options } = ctx.request.body;
        // 我的信息
        const me = ctx.chat_user;
        const me_id = me.id;
        // 单聊还是群聊chatType
        if (chatType == 'single') {
            // 单聊
            // 1. 看聊天的人是否存在(可以是游客可以是登录用户可以是好友)
            let chater = await app.model.User.findOne({
                where: {
                    id: sendto_id,
                    status: 1
                }
            });
            if (!chater) {
                return ctx.apiFail('对方不存在或者被禁用，不能发消息');
            }
            // 2. 看一下对方的设置是否容许聊天
            chater = JSON.parse(JSON.stringify(chater));
            console.log('聊天对象数据库信息', chater);
            // 定义信息设置对象
            let allset = {};
            // 用户设置信息
            let userset = chater.userset;
            // 对方没有任何设置
            if (!userset) {
                // 包括没有聊天设置，则对于聊天，给它默认聊天设置
                allset.chatset = {
                    visitor: {
                        sendCount: 1, //可以发一条
                        needFollow: false  // 无需关注
                    },
                    user: {
                        sendCount: 1, //可以发一条
                        needFollow: false // 无需关注
                    }
                };
                // 其它设置信息的初始默认值
                // ...
            } else {
                // 有设置信息 存储的是json字符串转对象
                allset = JSON.parse(userset);
                // 看一下有没有聊天设置信息
                if (!allset.chatset) {
                    // 没有聊天设置信息 则给它默认的聊天设置
                    allset.chatset = {
                        visitor: {
                            sendCount: 1, //可以发一条
                            needFollow: false  // 无需关注
                        },
                        user: {
                            sendCount: 1, //可以发一条
                            needFollow: false // 无需关注
                        }
                    };
                }
            }
            console.log('用户设置的信息包括默认值', allset);
            // 针对对方聊天设置做相应的判断
            // 是要求先登录、先成为好友，才能发送
            // 这个时候要看我的身份
            const me_role = me.role;
            // 定义一下昵称（主要针对我和对方是好友关系的时候各自拿备注昵称）
            let me_friend_nickname = ''; // 我在对方的好友备注
            let you_friend_nickname = ''; // 对方在我的好友备注

            // 检查是否被拉黑的通用函数
            const checkBlacklist = async (user_id, friend_id) => {
                const friendRelation = await app.model.Goodfriend.findOne({
                    where: {
                        user_id: user_id,
                        friend_id: friend_id
                    },
                });
                
                if (friendRelation) {
                    if (friendRelation.isblack != 0) {
                        return '拉黑';
                    }
                    if (friendRelation.status != 1) {
                        return '禁用';
                    }
                }
                return null;
            };

            // 检查关注关系的函数 - 后期拓展
            /*
            const checkFollow = async (follower_id, following_id) => {
                const follow = await app.model.Follow.findOne({
                    where: {
                        user_id: follower_id,
                        follow_id: following_id,
                        status: 1
                    }
                });
                return !!follow;
            };
            */

            // 检查已发送消息数量的函数
            const checkSentMessageCount = async (from_id, to_id, maxCount) => {
                if (maxCount === 2) return false; // 2表示无限制
                
                // 构建带命名空间的key
                const key = `chatlog:chatlog_${from_id}_single_${to_id}`;

                try {
                    // 使用redis的llen命令
                    const messageCount = await this.app.redis.llen(key);
                    console.log(`Key: ${key}, 消息数量: ${messageCount}`);
                    
                    return messageCount >= maxCount;
                } catch (error) {
                    console.error('获取消息数量失败:', error);
                    return false; // 出错时默认允许发送
                }
            };



            // 如果我是游客，则看对方怎么设置的
            if (me_role == 'visitor') {
                // 游客身份
                const visitorSetting = allset.chatset.visitor;

                // 检查关注要求
                /*
                if (visitorSetting.needFollow) {
                    const hasFollowed = await checkFollow(me_id, sendto_id);
                    if (!hasFollowed) {
                        return ctx.apiFail('需要先关注对方才能发送消息');
                    }
                }
                */

                // 检查发送条数限制
                if (visitorSetting.sendCount === 0) {
                    // 需要是好友关系
                    const friendCheck = await checkBlacklist(sendto_id, me_id);
                    if (friendCheck === '拉黑') {
                        return ctx.apiFail('对方把你拉黑了，不能发消息');
                    }
                    if (friendCheck === '禁用') {
                        return ctx.apiFail('系统把你们拉黑了，不能发消息');
                    }
                    
                    const isFriend = await app.model.Goodfriend.findOne({
                        where: {
                            user_id: sendto_id, // 对方中是否有我
                            friend_id: me_id, // 朋友id
                            status: 1, // 状态正常
                            isblack: 0 // 没有拉黑我
                        }
                    });
                    
                    if (!isFriend) {
                        return ctx.apiFail('你们不是好友关系，对方设置成：先登录才能发消息');
                    }
                } else if (visitorSetting.sendCount === 1) {
                    // 检查是否已经发送过消息
                    const hasSentMax = await checkSentMessageCount(me_id, sendto_id, 1);
                    if (hasSentMax) {
                        return ctx.apiFail('在成为好友之前，对方只允许向他发一条消息');
                    }
                }
                // sendCount为2时无限制




            }else if(me_role == 'user'){
                // 登录用户身份
                const userSetting = allset.chatset.user;

                // 检查我是否是对方的好友
                const friendRelation = await app.model.Goodfriend.findOne({
                    where: {
                        user_id: sendto_id,
                        friend_id: me_id
                    }
                });
                // 检查是否被拉黑
                const blacklistCheck = await checkBlacklist(sendto_id, me_id);
                if (blacklistCheck === '拉黑') {
                    return ctx.apiFail('对方把你拉黑了，不能发送消息');
                }
                if (blacklistCheck === '禁用') {
                    return ctx.apiFail('系统把你们拉黑了，不能发送消息');
                }
                // 获取好友备注
                if (friendRelation) {
                    me_friend_nickname = friendRelation.nickname;
                }

                // 如果对方是我的好友，可以拿一下对方在我的好友备注
                const myFriendRelation = await app.model.Goodfriend.findOne({
                    where: {
                        user_id: me_id,  // 我
                        friend_id: sendto_id, //对方
                    }
                });
                if(myFriendRelation){
                    you_friend_nickname = myFriendRelation.nickname; // 对方在我的好友备注
                }
                // 如果不是好友，检查设置限制
                if (!friendRelation) {
                    
                    // 检查关注要求
                    /*
                    if (userSetting.needFollow) {
                        const hasFollowed = await checkFollow(me_id, sendto_id);
                        if (!hasFollowed) {
                            return ctx.apiFail('需要先关注对方才能发送消息');
                        }
                    }
                    */

                    // 检查发送条数限制
                    if (userSetting.sendCount === 0) {
                        return ctx.apiFail('对方设置成：需要您先成为他的好友才能发消息');
                    } else if (userSetting.sendCount === 1) {
                        const hasSentMax = await checkSentMessageCount(me_id, sendto_id, 1);
                        if (hasSentMax) {
                            return ctx.apiFail('在成为好友之前，对方只允许向他发一条消息');
                        }
                    }
                    // sendCount为2时无限制
                }
            }

            // 3. 过了聊天设置这一关, 则发送消息，构建消息格式
            let optionsObj = null;
            // 额外参数json字符串options
            try{
                optionsObj = JSON.parse(decodeURIComponent(options));
            } catch {
                optionsObj = null;
            }
            let message = { 
                id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
                from_avatar: me.avatar, // 发送者头像
                from_name: me_friend_nickname || me.nickname || me.username, // 发送者名称
                from_id: me.id, // 发送者id
                to_id: sendto_id, // 接收者id
                to_name: you_friend_nickname || chater.nickname || chater.username, // 接收者名称
                to_avatar: chater.avatar, // 接收者头像
                chatType: chatType, // 聊天类型 单聊
                type: type, // 消息类型
                data: data, // 消息内容
                options: optionsObj, // 其它参数
                create_time: (new Date()).getTime(), // 创建时间
                isremove: 0, // 0未撤回 1已撤回
            };

            
            /*
            // 单进程
            // 4. 拿到对方的socket
            let you_socket = ctx.app.ws.chatuser[sendto_id];
            // 如果拿不到对方的socket， 则把消息放在redis队列中， 等待对方上线时，再发送
            if(!you_socket){
                // 放到reids，设置消息列表中：key值是：'chat_getmessage_' + sendto_id（用户id）
                ctx.service.cache.setList('chat_getmessage_' + sendto_id, message);
            }else{
                // 如果对方在线，则直接推送给对方
                you_socket.send(JSON.stringify({
                    type: 'singleChat',
                    data: message,
                    timestamp: Date.now(),
                }));
                // 存储到对方redis历史记录中
                // key: `chatlog_对方id_[single|group]_我的id`
                ctx.service.cache.setList(`chatlog_${sendto_id}_${message.chatType}_${me.id}`, message);
            }
            // 存储到我的redis历史记录中
            // key: `chatlog_我的id_[single|group]_对方id`
            ctx.service.cache.setList(`chatlog_${me.id}_${message.chatType}_${sendto_id}`, message);
            */
            // 多进程
            // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
            ctx.chatWebsocketSendOrSaveMessage(sendto_id, message, true, true, {
                offlineSaveKey: 'chat_getmessage_', // 消息队列KEY值前缀
                chatlog: `chatlog`, // 模拟文件夹名称
                saveLog_you: true, // 是否把消息存储到对方的redis记录中 
                saveLog_me: true, // 是否把消息存储到自己的redis记录中 
            });

            
            
            // 返回
            return ctx.apiSuccess(message);

        } else if (chatType == 'group') {
            // 群聊
            // 1. 先判断这个群是否存在，并且我是否在群里
            let group = await app.model.Group.findOne({
                where:{
                    id: sendto_id, //群id
                    status: 1, // 群状态 1正常 2锁定 0解散
                },
                // 关联查询群成员
                include:[
                    {
                        // 关联模型
                        model: app.model.GroupUser,
                        // 关联条件
                        where: {
                            // 选取状态正常的群成员
                            status: 1, // 状态 1正常 2锁定 0禁言
                        },
                        // 读取字段
                        attributes: ['id', 'group_id', 'user_id', 'nickname', 'avatar', 'status', 'order'],
                    }
                ],
            });
            if(!group){
                return ctx.apiFail('群不存在或者已解散或者被封禁，无法发消息');
            }
            // 2. 存在看一下群信息，我在不在群里
            // group = JSON.parse(JSON.stringify(group));
            // console.log('存在看一下群信息', group);
            // 查一下我在不在群里
            let me_index = group.group_users.findIndex(item => item.user_id == me.id);
            if(me_index == -1){
                return ctx.apiFail('您不在群里，无法发消息');
            }
            // 3. 我在群里
            // 我在群里的昵称: 优先拿我在群里设置的昵称，没有则拿我自己的昵称，在没有则拿账号名
            let me_group_nickname = group.group_users[me_index].nickname || me.nickname || me.username;
            // 我在群聊的头像：优先拿我在群里的头像，没有则拿我自己的头像
            let me_group_avatar = group.group_users[me_index].avatar || me.avatar;

            // 4. 定义消息格式
            let optionsObj = null;
            // 额外参数json字符串options
            try{
                optionsObj = JSON.parse(decodeURIComponent(options));
            } catch {
                optionsObj = null;
            }
            let message = { 
                id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
                from_avatar: me_group_avatar || me.avatar, // 发送者头像
                from_name: me_group_nickname || me.nickname || me.username, // 发送者名称
                from_id: me.id, // 发送者id
                to_id: group.id, // 群id
                to_name: group.name, // 群名称
                to_avatar: group.avatar, // 群头像
                chatType: chatType, // 聊天类型 群聊
                type: type, // 消息类型 
                data: data, // 消息内容
                options: optionsObj, // 其它参数
                create_time: (new Date()).getTime(), // 创建时间
                isremove: 0, // 0未撤回 1已撤回
                // 群相关信息
                group: group, 
            };

            // 循环推送给群成员 不用推送给自己
            group.group_users.forEach(v => {
                if(v.user_id != me.id){
                   // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                   ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
                }
            });

            // 返回
            return ctx.apiSuccess(message);

        }

    }


    //用户(我)上线后获取离线消息（登录用户和游客都有这个功能）
    async chat_getmessage_OffLine() { 
        const { ctx, app, service } = this;
        // 我的信息
        const me = ctx.chat_user;
        const me_id = me.id;
        // 获取离线消息
        let key = `chat_getmessage_${me_id}`;
        let msgList = await service.cache.getList(key); // 获取离线消息
        // 推送离线消息给用户(我)
        msgList.forEach(async (msg) => {
            // 离线消息存的是字符串，需要转成对象
            msg = JSON.parse(msg);
            // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
            ctx.chatWebsocketSendOrSaveMessage(me_id, msg);
        });
        // 拿到之后则可以清除离线消息
        await service.cache.remove(key);

        // 返回
        return ctx.apiSuccess('ok');
    }

    // 消息1：查询一下群聊列表，如果有的话，可以提示一下
    async websocktMsg_groupList(chatuser){
        const { ctx, app, service } = this;
        // 先查一下群聊列表
        let group_user = await app.model.GroupUser.findAll({
            where: {
                user_id: chatuser.id,
                status: 1,
            },
            attributes: ['group_id'],
        });
        if(group_user.length > 0){
            // 有群聊列表，给提示一下
            let msg = ctx.offlineMsg(chatuser,chatuser.id, {
                from_id: `redirect-groupList-${chatuser.id}`,
                from_avatar: `https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/img/grouplist.png`,
                from_name: `我的群聊`,
                data: `可查看我加入的群聊列表`,
                // 处理链接
                redirect: {
                    url:`/pages/applyMyfriend/applyMyfriend?action=grouplist&title=${encodeURIComponent('我的群聊列表')}`, // 处理链接地址
                    type: 'navigateTo', // 处理链接类型
                }, 
            });
            ctx.chatWebsocketSendOrSaveMessage(chatuser.id, msg, false, false);
        }
    }

    // 消息2： 通讯录
    async websocktMsg_friendList(chatuser){
        const { ctx, app, service } = this;
        // 先查一下是否有好友列表
        let goodfriend = await app.model.Goodfriend.findAll({
            where: {
                user_id: chatuser.id,
                status: 1,
                isblack: 0, // 0不是黑名单 1是黑名单
            },
            attributes: ['id'],
        });
        if(goodfriend.length > 0){
            // 有通讯录，给提示一下
            let msg = ctx.offlineMsg(chatuser,chatuser.id, {
                from_id: `redirect-friendsList-${chatuser.id}`,
                from_avatar: `https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/img/friendList.png`,
                from_name: `我的通讯录`,
                data: `可查看我的通讯录好友`,
                // 处理链接
                redirect: {
                    url:`/pages/friendsList/friendsList`, // 处理链接地址
                    type: 'navigateTo', // 处理链接类型
                }, 
            });
            ctx.chatWebsocketSendOrSaveMessage(chatuser.id, msg, false, false);
        }
    }

    // 消息3： 账号信息设置 - 不满意头像可以换
    async websocktMsg_userInfoSet(chatuser){
        const { ctx, app, service } = this;
        // 为了方便看效果，设置完成之后，跳转到我的页面
        let redirectUrl = `/pages/wode/wode`;
        let redirectType = `switchTab`;
        // 处理链接地址
        let url = `/pages/setpageInfo/setpageInfo?action=userinfoSet&title=${encodeURIComponent('账号信息设置')}`;
        // 完整地址
        url = `${url}&redirectUrl=${encodeURIComponent(redirectUrl)}&redirectType=${redirectType}`;
        // 账号信息设置，给提示一下
        let msg = ctx.offlineMsg(chatuser,chatuser.id, {
            from_id: `redirect-userInfoSet-${chatuser.id}`,
            from_avatar: chatuser.avatar,
            from_name: `头像设置`,
            data: `不满意你的头像可以更换`,
            // 处理链接
            redirect: {
                url: url, // 处理链接地址
                type: 'navigateTo', // 处理链接类型
            }, 
        });
        ctx.chatWebsocketSendOrSaveMessage(chatuser.id, msg, false, false);  
    }

    // 消息4： 谁可以和我聊天
    async websocktMsg_whoCanChatMe(chatuser){
        const { ctx, app, service } = this;
        // 谁可以和我聊天，给提示一下
        let msg = ctx.offlineMsg(chatuser,chatuser.id, {
            from_id: `redirect-whoCanChatMe-${chatuser.id}`,
            from_avatar: `https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/img/whoCanChatMe.png`,
            from_name: `谁可以和我聊天`,
            data: `设置聊天对象`,
            // 处理链接
            redirect: {
                url:`/pages/setpageInfo/setpageInfo?action=chatset&title=${encodeURIComponent('谁可以和我聊天')}`, // 处理链接地址
                type: 'navigateTo', // 处理链接类型
            }, 
        });
        ctx.chatWebsocketSendOrSaveMessage(chatuser.id, msg, false, false);
    }

    // 消息5： 我的二维码
    async websocktMsg_myQrcode(chatuser){
        const { ctx, app, service } = this;
        // 二维码
        let op = {
            action: 'groupQrcode',
            title: encodeURIComponent('我的二维码'),
            id: chatuser.id,
            name: encodeURIComponent(chatuser.nickname || chatuser.username),
            avatar: encodeURIComponent(chatuser.avatar),
            chatType: 'single',
        };
        let url = `/pages/setpageInfo/setpageInfo?action=${op.action}&title=${op.title}&id=${op.id}&name=${op.name}&avatar=${op.avatar}&chatType=${op.chatType}`;
        // 我的二维码，给提示一下
        let msg = ctx.offlineMsg(chatuser,chatuser.id, {
            from_id: `redirect-myQrcode-${chatuser.id}`,
            from_avatar: `https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/img/myQrcode1.png`,
            from_name: `我的二维码`,
            data: `展示给别人加你为好友`,
            // 处理链接
            redirect: {
                url:url, // 处理链接地址
                type: 'navigateTo', // 处理链接类型
            }, 
        });
        ctx.chatWebsocketSendOrSaveMessage(chatuser.id, msg, false, false);
    }

    // 消息6： 搜索加好友 - 搜索
    async websocktMsg_search(chatuser){
        const { ctx, app, service } = this;
        // 搜索加好友，给提示一下
        let msg = ctx.offlineMsg(chatuser,chatuser.id, {
            from_id: `redirect-search-${chatuser.id}`,
            from_avatar: `https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/img/search.png`,
            from_name: `搜索加好友`,
            data: `搜索账号加好友或聊天`,
            // 处理链接
            redirect: {
                url:`/pages/search/search`, // 处理链接地址
                type: 'navigateTo', // 处理链接类型
            }, 
        });
        ctx.chatWebsocketSendOrSaveMessage(chatuser.id, msg, false, false); 
    }
    
    // 消息：提示游客登录的消息
    async websocktMsg_visitorLogin(chatuser){
        const { ctx, app, service } = this;
        let msg = ctx.offlineMsg(chatuser,chatuser.id, {
            from_id: `redirect-visitorLogin-${chatuser.id}`,
            from_avatar: `https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/kefu.png`,
            from_name: `系统消息`,
            data: `欢迎您，登录可以获取更多功能！`,
            // 处理链接
            redirect: {
                url:'/pages/loginCenter/loginCenter', // 处理链接地址
                type: 'navigateTo', // 处理链接类型
            }, 
        });
        // 多进程推送
        // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
        ctx.chatWebsocketSendOrSaveMessage(chatuser.id, msg, false, false);
    }
}

module.exports = ChatwebsocketController;
```