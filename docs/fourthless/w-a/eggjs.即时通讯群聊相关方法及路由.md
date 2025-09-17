---
navbar: true
sidebar: auto
title: eggjs即时通讯群聊相关方法
---

## 一、群聊相关方法汇总
控制器 `app/controller/api/chat/chatgroup.js`

```js
'use strict';

const Controller = require('egg').Controller;

// 引入 uuid 库 `npm install uuid`
const { v4: uuidv4 } = require('uuid');

class ChatgroupController extends Controller {
    // 创建群聊（登录用户有这个功能，（游客）没有这个功能）
    async creategroup() {
        const { ctx, app } = this;
        // 参数验证
        ctx.validate({
            userIds: {
                type: 'array',
                required: true,
            }
        });
        // 拿参数
        let { userIds } = ctx.request.body;
        // 起初这些id是从朋友表拿的，即朋友表的id主键
        let goodfriend = await app.model.Goodfriend.findAll({
            where: {
                id: {
                    [this.app.Sequelize.Op.in]: userIds,
                },
                status: 1, // 数据状态正常
                isblack: 0, //没有加入黑名单
            },
            attributes: ['friend_id','user_id'],
        });
        if(!goodfriend || !goodfriend.length){
            return ctx.apiFail('请选择加入群聊的用户');
        }
        goodfriend = JSON.parse(JSON.stringify(goodfriend));
        // console.log('看一下goodfriend', goodfriend); return;
        // 重新组装用户id
        userIds = goodfriend.map(v=>v.friend_id);
        // console.log('看一下用户id数组userIds', userIds); return;
        
        // 我的信息
        const me = ctx.chat_user;
        const me_id = me.id;
        const me_name = me.nickname || me.username;
        // 查询一下这些id是否存在
        let users = await app.model.User.findAll({
            where: {
                id: {
                    [this.app.Sequelize.Op.in]: userIds,
                },
                status: 1,
            },
            attributes: ['id', 'username','nickname', 'avatar'],
        });
        if(!users.length){
           return ctx.apiFail('用户不存在，无法加入群聊');
        }
        // 转成普通对象
        users = JSON.parse(JSON.stringify(users));
        // console.log('看一下users', users); return;

        // 把我加在数组头部
        users.unshift(JSON.parse(JSON.stringify(me)));
        // console.log('加为群的用户信息', users); return;

        // 创建群聊
        // 群名称（最多50字符- 默认由用户昵称或者账号组成）
        let name = '';
        for(let i=0; i < users.length; i++){
            if(users[i].nickname){
                name += users[i].nickname + '、';
            }else{
                name += users[i].username + '、';
            }
        }
        // 去掉最后一个 '、'
        name = name.substring(0, name.length - 1);
        // 截取前50个字符
        if(name.length > 50){
            name = name.substring(0, 50); 
        }

        // 群头像（默认由用户头像组成，最多9个头像）
        let avatar = '';
        let arr = [];
        if(users.length > 9){
            arr = users.slice(0, 9);
        }else{
            arr = users;
        }
        for(let i = 0; i < arr.length; i++){
            avatar += arr[i].avatar + ',';
        }
        // 去掉最后一个 ','
        avatar = avatar.substring(0, avatar.length - 1);

        // 创建群组
        let group = await app.model.Group.create({
            user_id: me_id, // 创建者id
            name:name,
            avatar:avatar,
        });

        // 创建群组用户
        // 循环插入
        /*
        for(let i = 0; i < users.length; i++){
            await app.model.GroupUser.create({
                group_id:group.id,
                user_id:users[i].id,
            });
        }
        */
        // 批量插入
        let groupUsers = users.map(v => {
            return {
                group_id:group.id,
                user_id:v.id,
            }
        });
        await app.model.GroupUser.bulkCreate(groupUsers);

        // 消息推送通知加入群聊的其他人
        // 消息格式
        let message = { 
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: me.avatar, // 发送者头像
            from_name: me.nickname || me.username, // 发送者名称
            from_id: me.id, // 发送者id
            to_id: group.id, // 群id
            to_name: group.name, // 群名称
            to_avatar: group.avatar, // 群头像
            chatType: 'group', // 聊天类型 群聊
            type: 'systemNotice', // 消息类型 系统通知消息
            data: {
                data: `${me.nickname || me.username}创建了一个群，大家可以开始聊天了`,
                dataType: false, 
                otherData: null,
            }, // 消息内容
            options: {}, // 其它参数
            create_time: (new Date()).getTime(), // 创建时间
            isremove: 0, // 0未撤回 1已撤回
            // 群相关信息
            group: group, 
        };
        // 循环推送给群成员
        users.forEach(v => {
            // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
            ctx.chatWebsocketSendOrSaveMessage(v.id, message);
        });

        // 返回
        ctx.apiSuccess('ok');
    }

    // 群聊列表（登录用户和游客都有这个功能）
    async grouplist(){
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
                defValue: 30, 
                desc: '每页多少条', //字段含义
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿页码
        let page = ctx.params.page ? parseInt(ctx.params.page) : 1;
        // 每页多少条
        let limit = ctx.query.limit ? parseInt(ctx.query.limit) : 30;
        // 偏移量
        let offset = (page - 1) * limit; 
        // 拿数据
        let data = await app.model.Group.findAll({
            where:{
                status:1,// 状态为1的群
            },
            attributes:{
                exclude:['update_time'],
            },
            offset,
            limit,
            include:[{
                //关联群用户表
                model:app.model.GroupUser,
                attributes:['group_id','user_id','nickname','avatar'],
                // 关联查询条件
                where:{
                    user_id: me_id, // 用户id
                    status:1, // 状态
                },
            }],
            order:[
                ['id','desc'], // 按id降序排列
            ],
        });

        // 返回
        ctx.apiSuccess(data);
    }

    // 获取群资料信息（登录用户和游客都有这个功能）
    async groupinfo(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿id
        let { id } = ctx.params;
        // 查看群是否存在并且我是否在群里
        let group = await app.model.Group.findOne({
            where:{
                id: id, // 群id
                status:1, // 状态
            },
            attributes:{
                exclude:['update_time'],
            },
            include:[{
                //关联群用户表
                model:app.model.GroupUser,
                attributes:{
                    exclude:['update_time'],
                },
                where:{
                    status:1, // 群用户状态
                },
                // 根据user_id 关联用户表，因为可能GroupUser中没有设置昵称和头像
                include:[{
                    model:app.model.User,
                    attributes:['id','username','avatar','nickname','uuid','role'],
                }],
            }],
        });

        if(!group){
            return ctx.apiFail('群不存在或被封禁');
        }

        // 查看群信息的用户是否在群里，不在群里则无权查看
        // 由于对游客开放，游客不在群里，所以下面的代码注释掉
        // let me_index = group.group_users.findIndex(v => v.user_id == me_id);
        // if(me_index == -1){
        //     return ctx.apiFail('您不在群里，无法查看群信息');
        // }

        // 返回
        ctx.apiSuccess(group);
    }

    // 修改群名称（群主才有这个功能）
    async groupUpdateName(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            name: {
                type: 'string', 
                required: true, 
                // defValue: '', 
                desc: '群名称', 
                range:{
                    min:1,
                    max:20,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿参数
        let { id,name } = ctx.request.body;
        // 只有群主才能修改群名称
        let group = await app.model.Group.findOne({
            where:{
                id: id, // 群id
                status:1, // 状态
                user_id: me_id, // 群主id
            },
            // 需要给群成员推送
            include:[{
                //关联群用户表
                model:app.model.GroupUser,
                attributes:['group_id','user_id','nickname','avatar'],
            }],
        });

        if(!group){
            return ctx.apiFail('只有群主才能修改群名称');
        }

        // 2. 修改群名称
        /*
        await group.update({
            name: name,
        });
        */
        group.name = name;
        await group.save();

        // 推送给群成员
        // 3. 我作为群主，查一下我在群里的昵称和头像
        let me_index = group.group_users.findIndex(item => item.user_id == me.id);
        if(me_index == -1){
            return ctx.apiFail('无法通知群成员');
        }
        // 我在群里的昵称: 优先拿我在群里设置的昵称，没有则拿我自己的昵称，在没有则拿账号名
        let me_group_nickname = group.group_users[me_index].nickname || me.nickname || me.username;
        // 我在群聊的头像：优先拿我在群里的头像，没有则拿我自己的头像
        let me_group_avatar = group.group_users[me_index].avatar || me.avatar;

        // 4. 定义消息格式
        let message = { 
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: me_group_avatar || me.avatar, // 发送者头像
            from_name: me_group_nickname || me.nickname || me.username, // 发送者名称
            from_id: me.id, // 发送者id
            to_id: group.id, // 群id
            to_name: group.name, // 群名称
            to_avatar: group.avatar, // 群头像
            chatType: 'group', // 聊天类型 群聊
            type: 'systemNotice', // 消息类型 系统通知消息
            data: {
                data: `群名称修改为：${name}`,
                dataType: false, 
                otherData: null,
            }, // 消息内容
            options: {}, // 其它参数
            create_time: (new Date()).getTime(), // 创建时间
            isremove: 0, // 0未撤回 1已撤回
            // 群相关信息
            group: group, 
        };

        // 循环推送给群成员
        group.group_users.forEach(v => {
            // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
            ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
        });

        // 返回
        ctx.apiSuccess('ok');
    }

    // 修改群公告（群主才有这个功能）
    async groupremark(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            remark: {
                type: 'string', 
                required: true, 
                // defValue: '', 
                desc: '群公告', 
                range:{
                    min:1,
                    max:500,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿参数
        let { id,remark } = ctx.request.body;
        // 只有群主才能修改群公告
        let group = await app.model.Group.findOne({
            where:{
                id: id, // 群id
                status:1, // 状态
                user_id: me_id, // 群主id
            },
            // 需要给群成员推送
            include:[{
                //关联群用户表
                model:app.model.GroupUser,
                attributes:['group_id','user_id','nickname','avatar'],
            }],
        });

        if(!group){
            return ctx.apiFail('只有群主才能修改群公告');
        }

        // 2. 修改群公告
        /*
        await group.update({
            remark: remark,
        });
        */
        group.remark = remark;
        await group.save();

        // 推送给群成员
        // 3. 我作为群主，查一下我在群里的昵称和头像
        let me_index = group.group_users.findIndex(item => item.user_id == me.id);
        if(me_index == -1){
            return ctx.apiFail('无法通知群成员');
        }
        // 我在群里的昵称: 优先拿我在群里设置的昵称，没有则拿我自己的昵称，在没有则拿账号名
        let me_group_nickname = group.group_users[me_index].nickname || me.nickname || me.username;
        // 我在群聊的头像：优先拿我在群里的头像，没有则拿我自己的头像
        let me_group_avatar = group.group_users[me_index].avatar || me.avatar;

        // 4. 定义消息格式
        let message = { 
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: me_group_avatar || me.avatar, // 发送者头像
            from_name: me_group_nickname || me.nickname || me.username, // 发送者名称
            from_id: me.id, // 发送者id
            to_id: group.id, // 群id
            to_name: group.name, // 群名称
            to_avatar: group.avatar, // 群头像
            chatType: 'group', // 聊天类型 群聊
            type: 'systemNotice', // 消息类型 系统通知消息
            data: {
                data: `[公告] \n\n ${remark}`,
                dataType: false, 
                otherData: null,
            }, // 消息内容
            options: {}, // 其它参数
            create_time: (new Date()).getTime(), // 创建时间
            isremove: 0, // 0未撤回 1已撤回
            // 群相关信息
            group: group, 
        };

        // 循环推送给群成员
        group.group_users.forEach(v => {
            // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
            ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
        });

        // 返回
        ctx.apiSuccess('ok');
    }


    // 删除群成员（群主才有这个功能）
    async groupDeleteUser(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            group_id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            user_id: {
                type: 'int', 
                required: true, 
                // defValue: '', 
                desc: '群成员id', 
                range:{
                    min:1,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿参数
        let { group_id,user_id } = ctx.request.body;
        // 只有群主才能删除群成员
        let group = await app.model.Group.findOne({
            where:{
                id: group_id, // 群id
                // status:1, // 状态
                user_id: me_id, // 群主id
            },
            attributes:['user_id','id'],
        });

        if(!group){
            return ctx.apiFail('只有群主才能操作');
        }

        if(user_id == me_id){
            return ctx.apiFail('群主不能删除自己');
        }

        // 2. 删除群成员
        await app.model.GroupUser.destroy({
            where:{
                user_id: user_id, // 用户id
                group_id: group_id, // 群id
                // status:1, // 状态
            },
        });

        // 3. 更新一下群头像
        let group_avatar = ''; // 群头像
        // 查一下头像，优先取用户在群里面设置的头像，没有则取用户自己的头像
        let group_users = await app.model.GroupUser.findAll({
            where:{
                group_id: group_id, // 群id
                status:1, // 状态
            },
            attributes:['avatar'],
            // 查一下用户表的头像
            include:[
                {
                    model:app.model.User,
                    attributes:['avatar'],
                }
            ],
        });
        if(group_users.length > 0){
            group_users = JSON.parse(JSON.stringify(group_users));
            // 如果群成员多于9个则取前9个用户
            if(group_users.length > 9){
                group_users = group_users.slice(0,9);
            }
            // 取前9个用户的头像, 优先取用户在群里面设置的头像，没有则取用户自己的头像
            group_avatar = group_users.map(v => v.avatar || v.user.avatar).join(',');
            // 更新群头像
            // 使用 update 方法直接更新群头像，避免 save() 问题
            await app.model.Group.update({
                avatar: group_avatar
            }, {
                where: { id: group_id } // 明确指定更新条件
            });
        }
        

        ctx.apiSuccess('删除群成员成功');
    }

    // 进群设置（群主才有这个功能）
    async groupAddUserSet(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            group_id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            addGroupSet: {
                type: 'int', 
                required: true, 
                // defValue: '', 
                desc: '进群设置属性值', 
                range:{
                    min:0,
                    max:10,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id; 
        // 拿参数
        let { group_id,addGroupSet } = ctx.request.body;
        // 群是否存在
        let group = await app.model.Group.findOne({
            where:{
                id: group_id, // 群id
                status:1, // 状态
                user_id: me_id, // 群主id
            },
            attributes:{
                exclude:['order','update_time'],
            },
        });
        if(!group){
            return ctx.apiFail('群不存在或者被封禁或者你无权操作');
        }
        // 修改进群设置
        group.invite_confirm = addGroupSet;
        await group.save();
        ctx.apiSuccess('设置成功');
    }

    // 同意或者拒绝用户进群（群主才有这个功能）
    async groupAgreeOrNo(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            group_id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            user_id: {
                type: 'int', 
                required: true, 
                // defValue: '', 
                desc: '进群的用户id', 
                range:{
                    min:1,
                }
            },
            type: {
                type: 'string', 
                required: true, 
                // defValue: '', 
                desc: '同意或者拒绝', 
                range:{
                    in:['agree','no'],
                }
            },
        });
        // （传token的用户）当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id; 
        // 2.拿参数
        let { group_id,user_id,type } = ctx.request.body;
        // 3.群是否存在,并且操作者（传token的用户）是群主
        let group = await app.model.Group.findOne({
            where:{
                id: group_id, // 群id
                status:1, // 状态
                user_id: me_id, // 群主id
            },
            attributes:{
                exclude:['order','update_time'],
            },
            // 获取群成员信息，后面要推送消息
            include:[
                {
                    model:app.model.GroupUser,
                    attributes:{
                        exclude:['order','update_time'],
                    },
                    where:{
                        status:1, // 状态
                    }
                }
            ],
        });
        if(!group){
            return ctx.apiFail('群不存在或者被封禁或者你无权操作');
        }

        // 4.查一下这个用户是否在群里面
        let group_user = await app.model.GroupUser.findOne({
            where:{
                group_id: group_id, // 群id
                user_id: user_id, // 用户id
                // status:1, // 状态--此处不用判断状态
            },
            attributes:{
                exclude:['order','update_time'],
            },
        });
        // 查不到则是非法操作 
        // 因为先有邀请或者加入群，写入了用户的数据，
        // 只不过它的状态是2，表示正在等待（或者锁定）, 需要群主同意或者拒绝
        if(!group_user || group_user.status != 2){
            return ctx.apiFail('非法操作');
        }
        // 5.查到了，则判断是同意还是拒绝
        if(type == 'agree'){
            // 1.同意 - 则直接修改状态为1
            group_user.status = 1;
            // 2.执行修改
            await group_user.save();
        }else if(type == 'no'){
            // 拒绝 - 则直接删除这条记录
            await app.model.GroupUser.destroy({
                where:{
                    id: group_user.id, // 记录id
                },
            });
        }
        // 6.返回响应
        ctx.apiSuccess('处理成功');

        // 7.申请入群的用户信息 -- 要发消息通知
        let user = await app.model.User.findOne({
            where:{
                id: user_id, // 用户id
                status:1, // 状态
            },
            attributes:{
                exclude:['order','update_time'],
            },
        });
        if(!user){
            // 可能在申请入群后，用户违法被管理删除或者禁用了
            return ctx.apiFail('用户不存在或者被封禁');
        }
        

        // 8.如果同意入群，则通知群里面所有成员，有新成员加入
        if(type == 'agree'){
            // 1.定义消息格式
            // from_id 初始化自定义
            let _from_id = `redirect-applyAddGroup${group.id}-${user_id}-${(new Date()).getTime()}`;
            let message = { 
                id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
                from_avatar: 'https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/group.png', // 发送者头像
                from_name: '加群申请提醒', // 发送者名称
                from_id: _from_id, // 发送者id 系统id或者类型
                to_id: group.id, // 群id
                to_name: group.name, // 群名称
                to_avatar: group.avatar, // 群头像
                chatType: 'group', // 聊天类型 群聊
                type: 'systemNotice', // 消息类型 系统通知消息
                data: {
                    data: `[${user.nickname || user.username}] 加入了群聊` ,
                    dataType: false, 
                    otherData: null,
                }, // 消息内容
                // 新增处理链接
                // redirect: {
                //     url:'/pages/applyMyfriend/applyMyfriend', // 处理链接地址
                //     type: 'navigateTo', // 处理链接类型
                // }, // 处理链接
                options: {}, // 其它参数
                create_time: (new Date()).getTime(), // 创建时间
                isremove: 0, // 0未撤回 1已撤回
                // 群相关信息
                group: group, 
            };
            // 2.给所有群成员发消息
            let allGroupUser = await app.model.GroupUser.findAll({
                where:{
                    group_id: group_id, // 群id
                    status:1, // 状态
                },
                attributes:['user_id','avatar'],
                // 查一下用户表的头像
                include:[
                    {
                        model:app.model.User,
                        attributes:['avatar'],
                    }
                ],
            });
            allGroupUser = JSON.parse(JSON.stringify(allGroupUser));
            // 发送给所有群成员
            allGroupUser.forEach(v => {
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
            });


            // 3. 更新一下群头像
            let group_avatar = ''; // 群头像
            // 查一下头像，优先取用户在群里面设置的头像，没有则取用户自己的头像
            let group_users = allGroupUser;
            if(group_users.length > 0){
                group_users = JSON.parse(JSON.stringify(group_users));
                // 如果群成员多于9个则取前9个用户
                if(group_users.length > 9){
                    group_users = group_users.slice(0,9);
                }
                // 取前9个用户的头像, 优先取用户在群里面设置的头像，没有则取用户自己的头像
                group_avatar = group_users.map(v => v.avatar || v.user.avatar).join(',');
                // 更新群头像
                // 使用 update 方法直接更新群头像，避免 save() 问题
                await app.model.Group.update({
                    avatar: group_avatar
                }, {
                    where: { id: group_id } // 明确指定更新条件
                });
            }

        }
        
    }

    // 邀请人进群(群主直接邀请，群成员邀请、游客自己进群根据群设置来处理)
    async groupInviteUser(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            group_id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            user_id: {
                type: 'int', 
                required: true, 
                // defValue: '', 
                desc: '用户id', 
                range:{
                    min:1,
                }
            },
            inviteuser_id:{
                type: 'int', 
                required: false, 
                defValue: 0, 
                desc: '邀请人的用户id', 
            },
            addGroupDesc:{
                type: 'string', 
                required: false, 
                defValue: '', 
                desc: '加群说明或者邀请说明', 
                range:{
                    max:500,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id; 
        // 拿参数
        let { group_id,user_id,inviteuser_id,addGroupDesc } = ctx.request.body;
        // 2.群是否存在
        let group = await app.model.Group.findOne({
            where:{
                id: group_id, // 群id
                status:1, // 状态
            },
            attributes:{
                exclude:['order','update_time'],
            },
            include:[
                // 获取群主信息
                {
                    model: app.model.User,
                    attributes: ['username','nickname','avatar'],
                },
                // 获取群成员信息
                {
                    model: app.model.GroupUser,
                    attributes: ['nickname','avatar','user_id','status'],
                    // 群成员用户信息
                    include:[
                        {
                            model: app.model.User,
                            attributes: ['username','nickname','avatar'],
                        },
                    ],
                },
            ],
        });
        if(!group){
            return ctx.apiFail('群不存在或者被封禁');
        }

        // console.log('群信息',JSON.parse(JSON.stringify(group))); return;

        let result_group = JSON.parse(JSON.stringify(group)); // 群信息简化
        // 3.加群的人是否在群里
        /*
        let group_user = await app.model.GroupUser.findOne({
            where:{
                group_id: group_id, // 群id
                user_id: user_id, // 用户id
                // status:1, // 状态
            },
        });

        if(group_user){
            return ctx.apiFail('用户已经在群里');
        }
        */
        let index = result_group.group_users.findIndex(v=> v.user_id == user_id);
        if(index > -1){
            let adduserInfo = result_group.group_users[index];
            if(adduserInfo.status == 2){
                return ctx.apiFail('已申请加入群聊，正在等待群主同意');
            }else{
                return ctx.apiFail('用户已经在群里');
            }
        }

        // 4.加群者是否合法(是否存在这个用户)
        let user = await app.model.User.findOne({
            where:{
                id: user_id, // 用户id
                status:1, // 状态
            },
        });
        if(!user){
            return ctx.apiFail('加群的用户不存在或已被封禁，无法加入群聊');
        }
        // 加群者头像
        let AdduserAvatar = user.avatar;
        // 加群者称呼
        let AdduserName = user.nickname || user.username;
        // 加群者uuid
        let Adduseruuid = user.uuid;

        // 5.如果有邀请者查一下邀请者信息
        // console.log('邀请者id',inviteuser_id);
        // 主要处理邀请者的称呼
        let inviteusername = '';
        if(inviteuser_id && inviteuser_id > 0){
            // 查邀请者在群里的信息
            let inviteuserGroup = await app.model.GroupUser.findOne({
                where:{
                    user_id: inviteuser_id, // 邀请者用户id
                    group_id: group_id, // 群id
                },
                attributes:['nickname'],
            });
            if(inviteuserGroup){
                inviteuserGroup = JSON.parse(JSON.stringify(inviteuserGroup));
                // console.log('邀请者在群中的用户信息',inviteuserGroup);
                inviteusername = inviteuserGroup.nickname;
            }
            // 查用户表
            let inviteuser = await app.model.User.findOne({
                where:{
                    id: inviteuser_id, // 邀请者用户id
                    status:1, // 状态
                },
                attributes:['nickname','username','role','id'],
            });
            if(inviteuser){
                inviteuser = JSON.parse(JSON.stringify(inviteuser));
                // console.log('邀请者用户信息',inviteuser);
                if(inviteuser.role == 'user'){
                    inviteusername = inviteusername || inviteuser.nickname || inviteuser.username;
                    inviteusername = `[${inviteusername}]邀请 `;
                }
            }
        }

        // 6. 获取群主相关信息
        // 获取群主id
        let group_user_id = group.user_id;
        // 群主称呼和头像
        let group_user_name = '';
        let group_user_avatar = '';
        // 先查一下群主在群里面的称呼和头像
        let group_user_index = result_group.group_users.findIndex(v=> v.user_id == group_user_id);
        if(group_user_index > -1){
            group_user_name = result_group.group_users[group_user_index].nickname;
            group_user_avatar = result_group.group_users[group_user_index].avatar;
        }
        // 群主称呼
        group_user_name = group_user_name || result_group.user.nickname || result_group.user.username;
        // 群主头像
        group_user_avatar = group_user_avatar || result_group.user.avatar;


        // 根据群设置group.invite_confirm字段进行处理
        // invite_confirm: 0  默认值，任何人都可以进群
        // invite_confirm: 1  群主同意了才能进群
        // invite_confirm: 2  需先登录在申请进群
        // invite_confirm: 3  其他情况，根据业务需求操作

        // 7. invite_confirm: 2  游客需先登录在申请进群的情况
        if(group.invite_confirm == 2){
            if(group_user_id !== inviteuser_id){
                // 邀请人不是群主，且如果加群人是游客需要先登录
                if(user.role == 'visitor'){
                    return ctx.apiFail('请先登录再申请进群');
                }
            }
        }

        // 8. 添加群成员
        let addGroupUser = await app.model.GroupUser.create({
            group_id: group_id, // 群id
            user_id: user_id, // 用户id
            status:1, // 状态
            nickname: '', // 群昵称
        });
        
        // 9.invite_confirm: 1  需要群主同意的情况
        if(group.invite_confirm == 1 && group_user_id !== inviteuser_id){
            // 如果不是群主邀请的，则需要群主同意了才能进群, 将刚加群的用户状态改成2
            addGroupUser.status = 2; // 锁定状态
            await addGroupUser.save();
            // 返回
            ctx.apiSuccess('等待群主同意');
        }else{
            // 返回
            ctx.apiSuccess('加群成功');
            // 更新群头像
            let group_avatar = ''; // 群头像
            // 查一下头像，优先取用户在群里面设置的头像，没有则取用户自己的头像
            let group_users = await app.model.GroupUser.findAll({
                where:{
                    group_id: group_id, // 群id
                    status:1, // 状态
                },
                attributes:['avatar'],
                // 查一下用户表的头像
                include:[
                    {
                        model:app.model.User,
                        attributes:['avatar'],
                    }
                ],
            });
            if(group_users.length > 0){
                group_users = JSON.parse(JSON.stringify(group_users));
                // 如果群成员多于9个则取前9个用户
                if(group_users.length > 9){
                    group_users = group_users.slice(0,9);
                }
                // 取前9个用户的头像, 优先取用户在群里面设置的头像，没有则取用户自己的头像
                group_avatar = group_users.map(v => v.avatar || v.user.avatar).join(',');
                // 更新群头像
                // 使用 update 方法直接更新群头像，避免 save() 问题
                await app.model.Group.update({
                    avatar: group_avatar
                }, {
                    where: { id: group_id } // 明确指定更新条件
                });
            }
        }


        // 发送websocket消息
        // 4. 定义消息格式
        // from_id 初始化自定义
        let _from_id = `redirect-applyAddGroup${group.id}-${user_id}-${(new Date()).getTime()}`;
        let message = { 
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: 'https://docs-51yrc-com.oss-cn-hangzhou.aliyuncs.com/chat/group.png', // 发送者头像
            from_name: '加群申请提醒', // 发送者名称
            from_id: _from_id, // 发送者id 系统id或者类型
            to_id: group.id, // 群id
            to_name: group.name, // 群名称
            to_avatar: group.avatar, // 群头像
            chatType: 'group', // 聊天类型 群聊
            type: 'systemNotice', // 消息类型 系统通知消息
            data: {
                data: `${inviteusername}[${user.nickname || user.username}] 加入了群聊` ,
                dataType: false, 
                otherData: null,
            }, // 消息内容
            // 新增处理链接
            // redirect: {
            //     url:'/pages/applyMyfriend/applyMyfriend', // 处理链接地址
            //     type: 'navigateTo', // 处理链接类型
            // }, // 处理链接
            options: {}, // 其它参数
            create_time: (new Date()).getTime(), // 创建时间
            isremove: 0, // 0未撤回 1已撤回
            // 群相关信息
            group: group, 
        };

        // 根据进群设置group.invite_confirm发送消息
        if(group.invite_confirm == 0){
            // 任何人都可以进群，则消息由系统发送，发送给所有群成员
            let allGroupUser = await app.model.GroupUser.findAll({
                where:{
                    group_id: group_id, // 群id
                    status:1, // 状态
                },
                attributes:['user_id'],
            });
            allGroupUser = JSON.parse(JSON.stringify(allGroupUser));
            // 发送给所有群成员
            allGroupUser.forEach(v => {
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
            });

        }else if(group.invite_confirm == 1 || group.invite_confirm == 2){
            // 需要群主确认才能进群：但如果是群主邀请的，则不需要群主确认，直接进群，通知给所有人
            if(group_user_id == inviteuser_id){
                // 是群主邀请的，直接进群，发送给所有群成员
                let allGroupUser = await app.model.GroupUser.findAll({
                    where:{
                        group_id: group_id, // 群id
                        status:1, // 状态
                    },
                    attributes:['user_id'],
                });
                allGroupUser = JSON.parse(JSON.stringify(allGroupUser));
                // 发送给所有群成员
                allGroupUser.forEach(v => {
                    // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                    ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
                });
            }else{
                // 如果不是群主邀请的，发送给群主一个人进行审批
                // 附加信息
                let _desc = {
                    // 进群方式: 邀请进群还是自主进群
                    addGroupUserType: inviteuser_id && inviteuser_id > 0 ? '邀请进群' : '用户自主进群', 
                    // 邀请者
                    inviteUser: inviteuser_id && inviteuser_id > 0 ? 
                               (inviteusername && inviteusername.replace('[','').replace(']','').replace('邀请','')) : '',
                    // 时间
                    addGroupTime: (new Date()).getTime(),
                    // 加群说明
                    addGroupDesc: addGroupDesc, 
                    // 加群用户角色
                    addGroupUserRole: user.role,
                    // 新增一个消息id的key
                    msgidKey: _from_id, // 消息id(便于前端在消息页查找记录)
                };
                // 处理链接: 点击跳转到群成员进群审批页面
                message.redirect = {
                    url:`/pages/setpageInfo/setpageInfo?action=applyAddGroup&title=${encodeURIComponent('加群申请')}&id=${group_id}&name=${encodeURIComponent(group.name)}&avatar=${encodeURIComponent(group.avatar)}&chatType=group&applyUserid=${user_id}&applyUsername=${AdduserName}&applyUseruuid=${Adduseruuid}&applyUseravatar=${encodeURIComponent(AdduserAvatar)}&applydesc=${encodeURIComponent(JSON.stringify(_desc))}`, // 处理链接地址
                    type: 'navigateTo', // 处理链接类型
                    // 附加信息
                    desc:_desc,
                };
                // 在消息页作为新的通知消息处理，不要和群通知放一起
                // 这个消息仅发给群主即可
                message.to_id = group_user_id; // 群主id
                message.to_name = group_user_name; // 群主名称
                message.to_avatar = group_user_avatar; // 群主头像
                message.chatType = 'single'; // 聊天类型 
                message.type = 'text'; // 消息类型 系统通知消息
                message.from_name = '加群处理';
                message.data.data = `请处理申请 ${inviteusername}[${user.nickname || user.username}] 加入了群[${group.name}]` ;
                // 新增一个消息id的key
                message.msgidKey = _from_id; // 消息id(便于前端在消息页查找记录)

                // 推送
                /*
                // 单进程
                // 拿到群主的socket
                let you_socket = ctx.app.ws.chatuser[group_user_id];
                if (!you_socket) {
                    // 放到reids，设置消息列表中：key值是：'chat_getmessage_' + group_user_id（用户id）
                    this.service.cache.setList('chat_getmessage_' + group_user_id, message);
                } else {
                    // 如果群主在线，则直接推送给对方
                    you_socket.send(JSON.stringify({
                        type: 'singleChat',
                        data: message,
                        timestamp: Date.now(),
                    }));
                    // 存储到对方redis历史记录中【无需存储因为是系统发的】
                    // key: `chatlog_对方id_[single|group]_我的id`
                    // this.service.cache.setList(`chatlog_${group_user_id}_${message.chatType}_${me.id}`, message);
                }
                */
                // 多进程
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                ctx.chatWebsocketSendOrSaveMessage(group_user_id, message, true, false);
            }
        
        }else{
           // 其他情况，根据业务需求操作
        }

    }


    // 修改我在群里面的昵称（登录用户和游客都有这个功能）
    async groupnickname(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            nickname: {
                type: 'string', 
                required: true, 
                // defValue: '', 
                desc: '群昵称', 
                range:{
                    min:1,
                    max:20,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿参数
        let { id,nickname } = ctx.request.body;
        // 查我是否在这个群里面，并拿到我的信息
        let group_user = await app.model.GroupUser.findOne({
            where:{
                group_id: id, // 群id
                user_id: me_id, // 用户id
                status:1, // 状态
            },
        });

        if(!group_user){
            return ctx.apiFail('你不在该群聊中，无法修改昵称');
        }

        // 修改我的昵称
        group_user.nickname = nickname;
        await group_user.save();

        // 返回
        ctx.apiSuccess('ok');
    }

    // 删除群（群主可操作）或退出群（群成员可操作）
    async groupDeleteOrQuit(){ 
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿参数
        let { id } = ctx.request.body;
        // 1. 看一下群是否存在
        let group = await app.model.Group.findOne({
            where:{
                id: id, // 群id
                // status:1, // 状态
            },
            attributes:{
                exclude:['update_time'],
            },
            include:[{
                //关联群用户表
                model:app.model.GroupUser,
                attributes:{
                    exclude:['update_time'],
                },
                // 根据user_id 关联用户表，因为可能GroupUser中没有设置昵称和头像
                include:[{
                    model:app.model.User,
                    attributes:['id','username','avatar','nickname'],
                }],
            }],
        });
        if(!group){
            return ctx.apiFail('群不存在');
        }

        // 2. 我是否在群里
        let me_index = group.group_users.findIndex(v => v.user_id == me_id);
        if(me_index == -1){
            return ctx.apiFail('你不在该群聊中，操作失败');
        }

        // 3. 我是不是群主
        let is_group_owner = false;
        if(group.user_id == me_id){
            is_group_owner = true;
        }

        // 4. 处理及设置处理类型
        let dotype = '';
        if(is_group_owner){
            // 我是群主，删除群
            dotype = 'deleteGroup';
            await group.destroy();
        }else{
            // 我不是群主, 退出群
            dotype = 'quitGroup';
            let group_user = await app.model.GroupUser.findOne({
                where:{
                    group_id: id, // 群id
                    user_id: me_id, // 用户id
                    // status:1, // 状态
                },
            });
            // if(!group_user){
            //     return ctx.apiFail('你不在该群聊中，操作失败');
            // }
            await group_user.destroy();
        }

        // 5. 推送给群成员（删除群(解散群)推送给所有人，某个成员退群可通知群主）
        // 拿一下我的昵称和头像
        // 我在群里的昵称: 优先拿我在群里设置的昵称，没有则拿我自己的昵称，在没有则拿账号名
        let me_group_nickname = group.group_users[me_index].nickname || me.nickname || me.username;
        // 我在群聊的头像：优先拿我在群里的头像，没有则拿我自己的头像
        let me_group_avatar = group.group_users[me_index].avatar || me.avatar;

        // 6. 定义推送信息格式
        let message = { 
            id: uuidv4(), // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
            from_avatar: me_group_avatar || me.avatar, // 发送者头像
            from_name: me_group_nickname || me.nickname || me.username, // 发送者名称
            from_id: me.id, // 发送者id
            to_id: group.id, // 群id
            to_name: group.name, // 群名称
            to_avatar: group.avatar, // 群头像
            chatType: 'group', // 聊天类型 群聊
            type: 'systemNotice', // 消息类型 系统通知消息
            data: {
                data: ``, // 消息内容--根据情况自定义
                dataType: false, 
                otherData: null,
            }, // 消息内容
            options: {}, // 其它参数
            create_time: (new Date()).getTime(), // 创建时间
            isremove: 0, // 0未撤回 1已撤回
            // 群相关信息
            group: group, 
        };

        // 7. 根据处理情况自定义消息内容
        switch (dotype) {
            case 'deleteGroup':
                message.data.data = `群主于 ${(new Date()).toLocaleString()} 解散了该群`;
                break;
            case 'quitGroup':
                message.data.data = `${me_group_nickname}于 ${(new Date()).toLocaleString()} 已退出群聊`;
                break;
        }

        // 8. 根据处理情况自定义推送对象
        if(dotype == 'deleteGroup'){
            // 解散群，推送给群里面所有成员
            group.group_users.forEach(v => {
                // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
                ctx.chatWebsocketSendOrSaveMessage(v.user_id, message);
            });
        }else if(dotype == 'quitGroup'){
            // 退群， 只推送给群主
            // 拿到群主id
            let group_owner_id = group.user_id;
            // 直接调用 `/app/extend/context.js` 封装的方法 chatWebsocketSendOrSaveMessage(sendto_id, message)
            ctx.chatWebsocketSendOrSaveMessage(group_owner_id, message);
        }

        // 9. 返回
        return ctx.apiSuccess('ok');
    }

    // 生成群二维码（登录用户和游客都有这个功能）
    async groupQrcode(){
        const { ctx,app } = this;
        //1.参数验证
        ctx.validate({
            id: {
                type: 'int',  //参数类型
                required: true, //是否必须
                // defValue: '', 
                desc: '群id', //字段含义
                range:{
                    min:1,
                }
            },
            type:{
                type: 'string',
                required: false,
                defValue: '',
                desc: '平台类型', // 针对h5端使用
            },
            http:{
                type: 'string',
                required: false,
                defValue: '',
                desc: '网址域名', // 针对h5端使用
            },
            chatType:{
                type: 'string',
                required: false,
                defValue: '',
                desc: '聊天类型', // 针对h5端使用
            }
        });
        // 当前用户: 我
        const me = ctx.chat_user;
        const me_id = me.id;
        // 拿id
        let { id } = ctx.params;
        let type = ctx.query.type ? ctx.query.type : '';
        let http = ctx.query.http ? ctx.query.http : '';
        let chatType = ctx.query.chatType ? ctx.query.chatType : '';
        // 查看群是否存在并且我是否在群里
        let group = await app.model.Group.findOne({
            where:{
                id: id, // 群id
                status:1, // 状态
            },
            attributes:{
                exclude:['update_time'],
            },
            include:[{
                //关联群用户表
                model:app.model.GroupUser,
                attributes:{
                    exclude:['update_time'],
                },
                where:{
                    user_id: me_id, // 用户id
                    group_id: id, // 群id
                    status:1, // 状态
                },
                // 根据user_id 关联用户表，因为可能GroupUser中没有设置昵称和头像
                include:[{
                    model:app.model.User,
                    attributes:['id','username','avatar','nickname'],
                }],
            }],
        });

        if(!group){
            return ctx.apiFail('群不存在或被封禁或者您不在该群聊中');
        }


        // 返回二维码
        if(type && type == 'H5' && http && chatType){
            // 生成H5端的二维码，即完整的网页地址
            if(chatType == 'group'){
               // 生成添加群的二维码地址
               let url = `${http}#/pages/setpageInfo/setpageInfo?action=autoAddGroup&title=${encodeURIComponent('群介绍')}&id=${group.id}&chatType=${chatType}`;
               console.log('生成添加群的二维码地址',url);
               ctx.createQrcode(url);
            }else if(chatType == 'single'){
               // 添加添加个人的二维码地址
            }
        }else{
            // 生成app和小程序端的二维码
            ctx.createQrcode(JSON.stringify({
                id: group.id,
                name: group.name,
            }));
        }
    }


}

module.exports = ChatgroupController;

```




## 二、群聊相关方法接口说明
群相关方法接口说明：<a href="/fourthless/w-a/eggjs.即时通讯接口.html#二十一、创建群聊-成功后通过websocket通知群聊用户" target="_blank">群相关方法接口说明</a><br/>










