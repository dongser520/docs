---
navbar: true
sidebar: auto
title: eggjs即时通讯好友申请（goodfriendapply）控制器完整代码
---

## 一、好友申请相关方法汇总(控制器 `/app/controller/api/chat/goodfriendapply.js` 完整代码)

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
        let _from_id = `redirect-applyFriend-${me_id}`;
        let message = {
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: 'https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/group.png', // 发送者头像
            from_name: '好友申请提醒', // 发送者名称
            from_id: _from_id, // 发送者id 系统id或者类型
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
            // 新增一个消息id的key
            msgidKey: _from_id, // 消息id(便于前端在消息页查找记录)
        };

        /*
        // 单进程发送消息
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
        */

        // 多进程发送消息
        // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
        ctx.chatWebsocketSendOrSaveMessage(friend_id, message, true, false);

    }

    // 获取别人申请我为好友的列表数据（登录用户才行，（游客）不能）
    async listapplyfriend(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            page: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '页码', //字段含义
                range:{
                    min:1,
                }
            },
            limit: {
                type: 'int',  //参数类型
                required: false, //是否必须
                defValue: 10, 
                desc: '每页多少条', //字段含义
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿页码
        let page = ctx.params.page ? parseInt(ctx.params.page) : 1;
        // 每页多少条
        let limit = ctx.query.limit ? parseInt(ctx.query.limit) : 10;
        // 偏移量
        let offset = (page - 1) * limit; 
        // 拿数据
        let data = await app.model.Goodfriendapply.findAll({
            where:{
                friend_id:me_id,// 别人申请我为好友
            },
            offset,
            limit,
            include:[
                {
                    model:app.model.User,// 关联用户表
                    attributes:['id','username','avatar','nickname','uuid'],
                }
            ],
            order:[
                ['id','desc'], // 按id降序排列
            ],
        });
        // 获取状态是'pending' 等待处理的数据条数
        let pendingCount = await app.model.Goodfriendapply.count({
            where:{
                friend_id:me_id,
                status:'pending',
            },
        });
        ctx.apiSuccess({
            alldata:data,
            pendingCount:pendingCount,
        });
    }

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
                // 对方信息
                let youId = goodfriendapply.user_id;
                let youname = nickname ||  goodfriendapply.user.nickname || goodfriendapply.user.username;
                let youavatar = goodfriendapply.user.avatar;
                console.log('--------对方信息------------',{
                    youId,youname,youavatar
                });
                // 我的信息
                let meId = me_id;
                let mename = me.nickname || me.username;
                let meavatar = me.avatar;
                console.log('--------我的信息------------',{
                    meId,mename,meavatar
                });

                // 消息格式 --- 先推给对方（申请加我的好友）
                let message = {
                    id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
                    from_avatar: meavatar, // 发送者头像
                    from_name: mename, // 发送者名称
                    from_id:  meId, // 发送者id 系统id或者类型
                    to_id: youId, // 接收者id  
                    to_name: youname, // 接收者名称
                    to_avatar: youavatar, // 接收者头像
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
                await ctx.chatWebsocketSendOrSaveMessage(youId, message);

                // 消息格式 --- 再推给我自己（跟上面刚好相反, 发送人成了对方，我成了接收方）
                message.from_avatar = youavatar; // 发送者头像
                message.from_name = youname; // 发送者名称
                message.from_id = youId; // 发送者id 系统id或者类型
                message.to_id = meId ; // 接收者id  
                message.to_name = mename; // 接收者名称
                message.to_avatar = meavatar; // 接收者头像
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                await ctx.chatWebsocketSendOrSaveMessage(me_id, message);
            }
            
        } catch (error) {
            // 失败则回滚
            await tansaction.rollback();
            // 反馈
            return ctx.apiFail('系统异常，请稍后再试');
        }
        
    }
    

    // 自动添加好友并通过（申请加好友和审核的合并逻辑，前提是invite_confirm：0，登录用户和游客均可）
    async autoAddFriendAndAgree(){ 
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
                desc: '说明', //字段含义
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
        // 2.不能添加自己为好友
        if(me_id == friend_id){
            return ctx.apiFail('不能添加自己为好友');
        }
        // 3.添加的好友是否存在
        const friend = await app.model.User.findOne({
            where:{
                id:friend_id,
                status:1, // 用户状态 1正常 0禁用
            }
        });
        if(!friend){
            return ctx.apiFail('添加的好友不存在');
        }
        // 4. 看一下invite_confirm
        if(friend.invite_confirm != 0){
            return ctx.apiFail('需要对方审核，不能自动加对方为好友');
        }

        // 5. 添加的申请记录是否存在
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
        let goodfriendapply = await app.model.Goodfriendapply.create({
            user_id:me_id,
            friend_id,
            nickname,
            status:'pending',
        });
        // 以上是自动入库申请记录操作

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
            let status = 'agree';
            await goodfriendapply.update({
                status:status,
            },{transaction:tansaction});
            // 2. 将同意状态下的对方信息写入我的好友表 `goodfriend`
            // 3. 同时将我的信息写入对方的好友表 `goodfriend`
            if(status == 'agree'){
                // 先判断一下我的好友表`goodfriend`中有没有对方
                let meHasHim = await app.model.Goodfriend.findOne({
                    where:{
                        user_id:me_id,
                        friend_id: goodfriendapply.friend_id, 
                    }
                });
                // 如果我的好友中没有对方
                if(!meHasHim){
                    // 则将对方的信息异步写入我的好友表
                    await app.model.Goodfriend.create({
                        user_id:me_id, 
                        friend_id: goodfriendapply.friend_id, 
                        nickname:'', 
                    },{transaction:tansaction});
                }

                // 先判断一下对方好友表`goodfriend`中有没有我
                let himHasMe = await app.model.Goodfriend.findOne({
                    where:{
                        user_id:goodfriendapply.friend_id,
                        friend_id: me_id,
                    }
                });
                // console.log('对方好友有没有我', himHasMe);
                // 如果对方好友没有我
                if(!himHasMe){
                    // 则将我的信息异步写入对方的好友表
                    await app.model.Goodfriend.create({
                        user_id:goodfriendapply.friend_id, 
                        friend_id: me_id, 
                        nickname:me.nickname, 
                    },{transaction:tansaction});
                }
            }

            // websocket 通知
            if(status == 'agree'){
                // 对方信息
                let youId = goodfriendapply.friend_id;
                let youname = friend.nickname || friend.username;
                let youavatar = friend.avatar;
                console.log('--------对方信息------------',{
                    youId,youname,youavatar
                });
                // 我的信息
                let meId = me_id;
                let mename = me.nickname || me.username;
                let meavatar = me.avatar;
                console.log('--------我的信息------------',{
                    meId,mename,meavatar
                });

                // 消息格式 --- 先推给对方（申请加我的好友）
                let message = {
                    id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
                    from_avatar: meavatar, // 发送者头像
                    from_name: mename, // 发送者名称
                    from_id:  meId, // 发送者id 系统id或者类型
                    to_id: youId, // 接收者id  
                    to_name: youname, // 接收者名称
                    to_avatar: youavatar, // 接收者头像
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
                await ctx.chatWebsocketSendOrSaveMessage(youId, message);

                // 消息格式 --- 再推给我自己（跟上面刚好相反, 发送人成了对方，我成了接收方）
                message.from_avatar = youavatar; // 发送者头像
                message.from_name = youname; // 发送者名称
                message.from_id = youId; // 发送者id 系统id或者类型
                message.to_id = meId ; // 接收者id  
                message.to_name = mename; // 接收者名称
                message.to_avatar = meavatar; // 接收者头像
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                await ctx.chatWebsocketSendOrSaveMessage(me_id, message);
            }


            // 提交事务
            await tansaction.commit();
            // 反馈
            // return ctx.apiSuccess('ok');
            ctx.apiSuccess('ok');
            
        } catch (error) {
            // 失败则回滚
            await tansaction.rollback();
            // 反馈
            return ctx.apiFail('系统异常，请稍后再试');
        }
    }
}

module.exports = GoodfriendapplyController;
```


## 二、相关方法接口说明
相关方法接口说明：<a href="/fourthless/w-a/eggjs.即时通讯接口.html#五、申请添加好友" target="_blank">相关方法接口说明</a><br/>























