---
navbar: true
sidebar: auto
title: eggjs即时通讯：类文件chatClass.js完整代码
---

# eggjs即时通讯：类文件chatClass.js完整代码

类文件 `/common/js/chatClass.js` 完整代码

```js
import {requestUrl , chatAudioInfo} from '@/common/mixins/configData.js';
import {registerGuest} from '@/pages/loginCenter/visitor.js'; //导入具体的方法
import store from '@/store'; // 引入vuex store
class chatClass {
	// 构造函数
	constructor() {
		// ws地址
		this.url = '';
		if (requestUrl.http.startsWith('http')) {
			this.url = 'ws' + requestUrl.http.replace('http', '');
		} else if (requestUrl.http.startsWith('https')) {
			this.url = 'wss' + requestUrl.http.replace('https', '');
		}
		// 是否上线
		this.isOnline = false;
		// socketTask对象
		this.chatSocket = null;
		// 我的信息 vuex 或者从本地获取
		let user = uni.getStorageSync('chatuser') ?
			JSON.parse(uni.getStorageSync('chatuser')) : '';
		this.user = user;
		// 连接websocket
		if (this.user && this.user.token) {
			this.connectSocket();
		}
		// 心跳
		this.heartbeatTimer = null;
		//聊天对象信息
		this.ToObject = false;
		//消息页整个聊天列表数据的未读数
		this.xiaoxiNoreadNum = 0;
		//音频innerAudioContext 对象
		this.chatClassAudioContext = uni.createInnerAudioContext();
	}

	// 连接websocket
	connectSocket() {
		this.chatSocket = uni.connectSocket({
			// http://192.168.2.7:7001
			// ws://192.168.2.7:7001/ws
			// https://lesson07.51yrc.com
			// wss://lesson07.51yrc.com/ws
			url: this.url + `/ws?token=${this.user.token}`,
			complete: () => {},
			timeout: 10000, // 10秒超时
		});

		// 连接成功
		this.chatSocket.onOpen(() => {
			console.log('websocket连接成功');
			// 调用方法
			this.onOpen();
			//启动心跳
			this.heartbeatTimer = setInterval(() => {
				if (this.chatSocket && this.chatSocket.readyState === 1) {
					// 确保发送的是字符串格式的JSON
					const heartbeatMsg = JSON.stringify({
						type: 'ping',
						token: this.user.token,
						timestamp: Date.now() // 添加时间戳便于调试
					});
					// console.log('发送心跳消息:', heartbeatMsg);
					// this.chatSocket.send(heartbeatMsg);
				}
			}, 5000); // 每隔5秒发送一次心跳
		});
		// 接收信息
		this.chatSocket.onMessage(res => {
			// 处理一下不同平台消息格式
			try {
				const data = typeof res.data === 'string' ?
					JSON.parse(res.data) : res.data;
				console.log('监听接收消息', data);
				// 处理接收的websocket消息
				this.onMessage(data);
				// 如果服务器返回ping
				if (data.type === 'ping') {
					console.log('响应服务器心跳');
					// 响应心跳 -- 自由发挥
				}
			} catch (e) {
				console.error('接收信息错误', e);
			}
		});
		// 断开连接
		this.chatSocket.onClose(res => {
			console.log('断开连接的原因', res);
			// 清除心跳
			clearInterval(this.heartbeatTimer); 
			this.heartbeatTimer = null;
			//调用方法
			this.onClose();
			
			// 对用户做个提示
			if(this.user.role == 'user'){
				// 如果修改服务器代码可能异常关闭1006，这种情况除外
				if(!(res.code && res.code == 1006)){
					uni.showModal({
						title: '账号异地登录',
						content: '您的账号在异地登录，本设备将会退出',
						showCancel: false,
						confirmText: '我知道了',
						success: res => {},
					});
					console.log('则清空本地登录信息，在换成游客模式');
					let _that = this;
					store.dispatch('logoutAction', ()=>{
						_that.doRegisterGuest();
					});
				}else{
					// 尝试重新连接
					setTimeout(() => {
						console.log('断开连接尝试重新连接websocket');
						//dispatch('initChatuserAction');
						this.connectSocket();
					}, 1000);
				}
			}else{
				// 游客尝试重新连接
				setTimeout(() => {
					console.log('断开连接尝试重新连接websocket');
					//dispatch('initChatuserAction');
					this.connectSocket();
				}, 1000);
			}

		});
		// 错误处理
		this.chatSocket.onError(err => {
			console.error('websocket 错误：', err);
			// 清除心跳
			clearInterval(this.heartbeatTimer); 
			this.heartbeatTimer = null;
			//调用方法
			this.onClose();
			
			// 尝试重新连接
			setTimeout(() => {
				console.log('错误处理尝试重新连接websocket');
				//dispatch('initChatuserAction');
				this.connectSocket();
			}, 1000);
		});
	}

	// 连接成功
	onOpen() {
		// 用户上线
		this.isOnline = true;
		// 获取离线消息（不在线的时候别人或者群发的消息）
		this.chatGetmessageOffLine();
	}

	// 断开连接
	onClose() {
		// 用户下线
		this.isOnline = false;
		this.chatSocket = null;
	}

	// 接收信息
	onMessage(data) {
		console.log('websocket接收信息', data);
		// 处理接收到的消息
		this.doMessage(data);
	}

	// 关闭链接
	close() {
		// 用户退出登录
		// 调用socketTask 对象 close方法
		if (this.chatSocket) {
			this.chatSocket.close();
		}
	}

	// 创建聊天对象信息
	createChatToObject(arg) {
		this.ToObject = arg;
		console.log('聊天对象信息', this.ToObject);
	}

	// 销毁聊天对象信息
	destroyChatToObject() {
		this.ToObject = false;
	}

	// 页面发消息的格式和服务器要一致
	formatSendMessage(args) {
		return {
			id: 0, // 自动生成 UUID,唯一id, 聊天记录id，方便撤回消息
			from_avatar: this.user.avatar, // 发送者头像
			from_name: this.user.nickname || this.user.username, // 发送者名称
			from_id: this.user.id, // 发送者id
			to_id: this.ToObject.id, // 接收者id
			to_name: this.ToObject.name, // 接收者名称
			to_avatar: this.ToObject.avatar, // 接收者头像
			chatType: this.ToObject.chatType, // 聊天类型 单聊
			type: args.type, // 消息类型
			data: args.data, // 消息内容
			options: args.options ? args.options : {}, // 其它参数
			create_time: (new Date()).getTime(), // 创建时间
			isremove: 0, // 0未撤回 1已撤回
			// 发送状态 pending 发送中 success 成功 fail 失败
			sendStatus: args.sendStatus ? args.sendStatus : 'pending',
		}
	}

	// 发送消息（单聊）
	sendmessage(msg) {
		return new Promise((result, reject) => {
			// 把发送的聊天信息存在本地
			let { k } = this.addChatInfo(msg);
			// 消息页的聊天列表更新一下
			this.updateXiaoXiList(msg);
			// 查看我是否在线websocket是否正常连接
			if (!this.meIsOnline()) return reject('我掉线了');
			// 发送消息
			uni.$u.http.post(requestUrl.http + `/api/chat/socket/sendmessage`, {
				sendto_id: this.ToObject.id,
				chatType: this.ToObject.chatType, // 单聊 single 群聊 group
				type: msg.type,
				data: msg.data,
				options: encodeURIComponent(JSON.stringify(msg.options)), // 选填
			}, {
				header: {
					token: uni.getStorageSync('chatuser_token'),
				}
			}).then(res => {
				console.log('发送消息到服务器结果res', res);
				msg.id = res.data.data.id;
				msg.sendStatus = 'success';
				console.log('发送消息成功之后的msg', msg);
				// 更新本地的历史记录 send不用传因为已经发送完成了
				this.updateChatInfo(msg, k);
				// 成功返回给页面
				result(res);
			}).catch(err => {
				//console.log('发送消息到服务器失败', err);
				msg.sendStatus = 'fail';
				// 更新本地的历史记录 send不用传因为已经发送完成了
				this.updateChatInfo(msg, k);
				// 失败返回给页面
				reject(err);
			});
		});
	}
	
	// 把聊天信息存在本地
	addChatInfo(msg, isSend = true) {
		// 存本地key值设计 chatDetail_我的id_单聊群聊_和谁聊接收人(个人还是群)id
		// key:`chatDetail_${this.user.id}_${msg.chatType}_${xx}`
		// 重点分析接收人id
		// 如果是单聊则是用户id,如果是群聊，则是群id(群聊id放在消息to_id中)
		let id = msg.chatType == 'single' ? (isSend ? msg.to_id : msg.from_id) : msg.to_id;
		let key = `chatDetail_${this.user.id}_${msg.chatType}_${id}`;
		// 先获取历史记录
		let list = this.getChatInfo(key);
		console.log('获取历史记录', list);
		// 做个标识，方便之后拿具体某条历史消息
		msg.k = 'k' + list.length;
		// 将消息放入历史记录
		list.push(msg);
		// 重新存历史记录到本地（因为加了新消息）
		uni.setStorageSync(key, JSON.stringify(list));
		// 返回
		return {
			data: msg,
			k: msg.k,
		}
	}
	
	
	// 获取本地历史记录, 传key值则找指定聊天记录
	getChatInfo(key = false) {
		if (!key) {
			// 没有传key 则找当前会话聊天记录
			key = `chatDetail_${this.user.id}_${this.ToObject.chatType}_${this.ToObject.id}`;
		}
		console.log('获取历史记录, 传key值则找指定聊天记录的key，当前key值',key);
		let list = uni.getStorageSync(key);
		// console.log('获取历史记录得到的数据', list);
		if (list) {
			if (typeof list == 'string') {
				list = JSON.parse(list);
			}
		} else {
			list = [];
		}
		return list;
	}
	
	// 更新指定的本地历史记录信息(不急着更新可以异步)
	async updateChatInfo(msg, k, isSend = true) {
		// 获取原来的历史记录
		// 存本地key值设计 chatDetail_我的id_单聊群聊_和谁聊接收人(个人还是群)id
		// key:`chatDetail_${this.user.id}_${msg.chatType}_${xx}`
		// 重点分析接收人id 
		// isSend = true 代表我是发送人from_id
		// 接收人就是to_id
		// 如果是单聊则是用户id,如果是群聊，则是群id(群聊id放在消息to_id中)
		let id = msg.chatType == 'single' ? (isSend ? msg.to_id : msg.from_id) : msg.to_id; //接收人|群id 
		let key = `chatDetail_${this.user.id}_${msg.chatType}_${id}`;
		console.log('更新指定的历史记录信息key', key);
		// 先获取历史记录
		let list = this.getChatInfo(key);
		console.log('先获取历史记录', list);
		// 根据标识k去查找要更新的历史记录
		let index = list.findIndex(e => e.k == k);
		// 没找到
		if (index == -1) return;
		// 找到了，修改指定消息
		list[index] = msg;
		// 改完之后，整个重新存一下
		console.log('改完之后，整个重新存一下', key, list);
		uni.setStorageSync(key, list);
	}
	
	// 删除消息页指定的本地历史记录信息
	deleteChatInfo(to_id, chatType){
		return new Promise((resolve,reject) => {
			try{
				let xiaoxiList = this.getXiaoXiList();
				// 找到当前聊天
				let index = xiaoxiList.findIndex(v => v.id == to_id && v.chatType == chatType);
				if(index != -1){
					// 找到了
					// 删除这个历史记录
					xiaoxiList.splice(index, 1);
					// 处理完了之后，存储消息页列表本地历史信息
					this.setXiaoXiList(xiaoxiList);
					// 更新(获取)消息页，整个消息列表的未读数（不急可以异步执行）
					this.updateXiaoXiListNoreadNum();
					// 消息页，整个消息列表的数据也存入了vuex中
					// 更新一下vuex中的消息列表的数据
					uni.$emit('updateXiaoXiList', xiaoxiList);
					// 执行后续操作
					return resolve();
				}
			}catch{
				return reject();
			}
		});
	}
	
	
	// 删除或者(撤回)（与某个群所有或者某条聊天信息，与某个人的所有或者某条聊天信息）
	clearChatInfo(to_id, chatType, msgid = false, doaction = 'revoke'){
		let key = `chatDetail_${this.user.id}_${chatType}_${to_id}`;
		// 根据key获取信息
		let chatDetail = uni.getStorageSync(key);
		chatDetail = chatDetail && typeof chatDetail == 'string' ? 
		             JSON.parse(chatDetail) : chatDetail;
		console.log('本地根据key获取的聊天详细信息', chatDetail);
		if(msgid){
			// 删除与某人或者某群对话中的某一条聊天记录
			if(chatDetail){
				// 拿到具体的某条聊天信息
				let k = chatDetail.findIndex(v=> v.id === msgid);
				if(k > -1){
					console.log('删除或者(撤回)与某人或者某群对话中的某一条聊天记录', chatDetail[k]);
					if(doaction && doaction == 'delete'){
						// 删除这条记录
						chatDetail.splice(k, 1);
					}else{
						// 撤回操作
						// 将这条记录的属性isremove改成1或者true 就会自动隐藏
						chatDetail[k].isremove = 1; 
					}
					// 重新存储
					uni.setStorageSync(key, chatDetail);
				}
			}
		}else{
			// 删除与某人或者某群对话中的本地所有记录
			uni.removeStorageSync(key);
			console.log('删除与某人或者某群对话中的本地所有记录');
		}
		// 消息页数据重新处理
		return new Promise((resolve,reject) => {
			let xiaoxiList = this.getXiaoXiList();
			// 找到当前聊天
			let index = xiaoxiList.findIndex(v => v.id == to_id && v.chatType == chatType);
			if(index != -1){
				// 找到了
				if(msgid){
					if(chatDetail){
						// 执行后续操作 - 如：更新消息页
						return resolve(index);
					}else{
						return reject();
					}
				}else{
					// 消息页删除这个记录
					xiaoxiList.splice(index, 1);
					// 处理完了之后，存储消息页列表本地历史信息
					this.setXiaoXiList(xiaoxiList);
					// 更新(获取)消息页，整个消息列表的未读数（不急可以异步执行）
					this.updateXiaoXiListNoreadNum();
					// 消息页，整个消息列表的数据也存入了vuex中
					// 更新一下vuex中的消息列表的数据
					uni.$emit('updateXiaoXiList', xiaoxiList);
					// 执行后续操作
					return resolve();
				}
			}
			return reject();
		});
	}
	
	
	// 修改某个对话信息（单聊和群聊, 处理设置功能）
	// [如：置顶、免打扰、是否展示昵称、是否提醒、是否确认进群等]
	updateSomeOneChatItem(someone, updatedata){
		return new Promise((resolve,reject) => {
			let xiaoxiList = this.getXiaoXiList();
			// 找到当前聊天
			let index = xiaoxiList.findIndex(v => v.id == someone.id && 
			v.chatType == someone.chatType);
			if(index != -1){
				// 找到了
				console.log('传递过来的要更新的数据',updatedata);
				// 更新数据
				xiaoxiList[index] = {
					...xiaoxiList[index],
					// 重新赋值
					istop: updatedata.istop, //置顶
					nowarn: updatedata.nowarn, //免打扰
					stongwarn: updatedata.stongwarn, //是否提醒 
					shownickname: updatedata.shownickname, //是否显示群成员昵称
				};
				// 处理完了之后，存储消息页列表本地历史信息
				this.setXiaoXiList(xiaoxiList);
				// 更新(获取)消息页，整个消息列表的未读数（不急可以异步执行）
				// this.updateXiaoXiListNoreadNum();
				// 消息页，整个消息列表的数据也存入了vuex中
				// 更新一下vuex中的消息列表的数据
				uni.$emit('updateXiaoXiList', xiaoxiList);
				// 执行后续操作
				return resolve(xiaoxiList[index]);
			}
			return reject();
		});
	}
	
	
	// 消息页将某条消息更新成你指定的消息
	XiaoXiListUpdataZhiDingMsg(XiaoXiListId,chatType,msg){
		console.log('---消息页将某条消息更新成你指定的消息id---',XiaoXiListId);
		console.log('---消息页将某条消息更新成你指定的消息内容---',msg);
		// 获取消息页列表本地历史信息（消息页消息列表）
		let list = this.getXiaoXiList();
		console.log('获取消息页列表旧历史', list);
		// 查消息页列表索引
		let index = list.findIndex(v => v.chatType == chatType && v.id == XiaoXiListId);
		if(index != -1){
			// 主要是更新data部分
			let data = msg.data;
			try {
				if(typeof msg.data == 'string'){
					data = JSON.parse(msg.data);
				}
			}catch {
				data = msg.data;
			}
			// 当发送消息是图片视频等，消息页列表最新聊天的最后一条消息显示[图片][视频]等
			let isSend = msg.from_id === this.user.id ? true : false;
			let datadesc = this.XiaoXiListAnyOneLastMsgFormat(data, msg, isSend);
			// 找到了消息列表的数据，将这个数据换成指定的数据
			let findItem = list[index];
			// 更新以下内容：时间 内容 类型等等
			findItem.update_time = msg.create_time;
			findItem.data = data;
			findItem.datadesc = datadesc;
			findItem.type = msg.type;
			// findItem.avatar = avatar; // 消息页的头像不用更新，因为是跟当前聊天对象的记录
			// findItem.name = name; // 消息页的name不用更新，因为是跟当前聊天对象的记录
			findItem.isremove = msg.isremove;
			
			
			// 处理完了之后，存储消息页列表本地历史信息
			this.setXiaoXiList(list);
			// 更新(获取)消息页，整个消息列表的未读数（不急可以异步执行）
			this.updateXiaoXiListNoreadNum();
			// 消息页，整个消息列表的数据也存入了vuex中
			// 更新一下vuex中的消息列表的数据
			uni.$emit('updateXiaoXiList', list);
		}
	}
	
	// 消息页的聊天列表更新一下
	updateXiaoXiList(msg, isSend = true) {
		console.log('消息页最新的一条消息',msg);
		// 获取消息页列表本地历史信息（消息页消息列表）
		let list = this.getXiaoXiList();
		console.log('获取消息页列表旧历史', list);
		// 判断是不是正在和对方聊天，正在聊天页
		// 如果正在聊天页，就没有必要更新消息页的列表了
		let isCurrentChat = false; // 默认不在聊天页
		// 消息页每条数据需要配合服务器的数据，（消息页消息列表）大概有这些字段
		/*
		{
			// 单聊
			id: `用户|群id`,
			avatar: `用户|群头像`,
			name: `用户|群昵称`,
			chatType:'单聊|群聊',
			update_time: '最新的时间',
			data: '最新一条消息',
			type:'最新一条消息类型',
			noreadnum:'未读数',
			istop:'置顶情况',
			shownickname:'是否展示昵称',
			nowarn:'消息免打扰',
			stongwarn: '消息提醒'
			
			// 群聊还有以下字段
			user_id: '群管理员id',
			remark:'群公告',
			invite_confirm:'确认进群'
			...
		}
		*/
		// 重点处理上面的这几个字段
		let id = 0; //接收人|群 id
		let avatar = ''; //接收人|群 头像
		let name = ''; // 接收人|群 称呼
		// 先判断是单聊还是群聊
		if (msg.chatType == 'single') {
			//单聊 
			//先看聊天对象是否存在
			/*
			if(this.ToObject){
				// 存在聊天对象则在聊天页根据isSend判断
				// isSend为true 则我是发送者
				// 则这条消息msg.to_id 就是接收人的id 与聊天人 this.ToObject.id
				// 如果二者相等，则说明正在跟当前接收人聊天
				// 那么消息页就不用更新当前聊天人的信息比如提示发了几条消息等
				isCurrentChat = isSend ? this.ToObject.id === msg.to_id :
				// 否则我不是发送者刚好反过来
				this.ToObject.id === msg.from_id;
			}else{
				// 不存在聊天对象肯定就不在聊天页
				isCurrentChat = false;
			} */
			isCurrentChat = this.ToObject ? isSend ? this.ToObject.id === msg.to_id :
				this.ToObject.id === msg.from_id : false;
			// 处理 接收人|群 id avatar name
			id = isSend ? msg.to_id : msg.from_id;
			avatar = isSend ? msg.to_avatar : msg.from_avatar;
			name = isSend ? msg.to_name : msg.from_name;
	
		} else if (msg.chatType == 'group') {
			//群聊
			//先看聊天对象是否存在
			isCurrentChat = this.ToObject && this.ToObject.id === msg.to_id;
			// 处理 接收人|群 id avatar name
			id = msg.to_id ;
			avatar = msg.to_avatar ;
			name = msg.to_name ;
		}
	
		// 接下来看消息页消息列表是否存在跟当前聊天人的对话
		let index = list.findIndex(v => {
			// 查消息类型和接收人聊天人id
			return v.chatType == msg.chatType && v.id == id;
		});
		// 最后把消息页最新聊天的最后一条消息展示处理一下
		// let data = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data;
		let data = msg.data;
		try {
			if(typeof msg.data == 'string'){
				data = JSON.parse(msg.data);
			}
		}catch {
			data = msg.data;
		}
		// 当发送消息是图片视频等，消息页列表最新聊天的最后一条消息显示[图片][视频]等
		let datadesc = this.XiaoXiListAnyOneLastMsgFormat(data, msg, isSend);
		
		// 字段noreadnum 未读消息数量判断
		// isSend为true说明现在处于聊天页
		// 处于聊天页或者聊天当中,那么消息页，聊天列表就没必要+1
		let noreadnum = (isSend || isCurrentChat) ? 0 : 1;
		// 看能不能查到跟当前聊天人的对话
		if (index == -1) {
			// 如果查不到，则新建一个跟当前聊天人的对话信息放到消息页列表最上面
			// 新建对话信息
			// 单聊
			let chatItem = {
				id: id,
				avatar: avatar,
				name: name,
				chatType: msg.chatType,
				update_time: (new Date()).getTime(),
				data: data,
				datadesc: datadesc,
				type: msg.type,
				noreadnum: noreadnum,
				istop: false, //是否置顶
				shownickname: 0, //是否显示昵称
				nowarn: 0, //消息免打扰
				stongwarn: 0, //是否提示来消息了
				isremove: msg.isremove, // 是否撤回
				redirect: msg.redirect ? msg.redirect : false, // 跳转字段
			};
			// 群聊
			if (msg.chatType == 'group') {
				console.log('群聊此时的消息处理', msg);
				chatItem = {
					...chatItem,
					user_id: msg.group && msg.group.user_id ? msg.group.user_id : 0, //群主
					remark: msg.group && msg.group.remark ? msg.group.remark : '', // 群公告
					// 是否需要管理员确认才能进群 默认不需要0
					invite_confirm: msg.group && msg.group.invite_confirm ? msg.group.invite_confirm : 0, 
					// 是否显示群成员昵称
					shownickname: true, //群聊默认显示
				}
			}
			// 放在最上面
			list = [chatItem, ...list];
		} else {
			// 查到了，则更新消息页，消息列表中的这条对话信息让它是最新的
			let findItem = list[index];
			// 则更新以下内容：时间 内容 类型等等
			findItem.update_time = (new Date()).getTime();
			findItem.data = data;
			findItem.datadesc = datadesc;
			findItem.type = msg.type;
			findItem.avatar = avatar;
			findItem.name = name;
			findItem.isremove = msg.isremove;
			findItem.redirect = msg.redirect ? msg.redirect : false;
			// 未读数更新
			findItem.noreadnum += noreadnum;
			console.log('查到了，则更新消息页最新一条消息', findItem);
			// 把这条消息放在消息页，消息列表最上面
			list = this.arrToFirst(list, index);
		}
	
		// 重新存一下 存储消息页列表本地历史信息
		this.setXiaoXiList(list);
	
		// 更新(获取)消息页，整个消息列表的未读数
		this.updateXiaoXiListNoreadNum(list);
	
		// 消息页，整个消息列表的数据也存入了vuex中
		// 更新一下vuex中的消息列表的数据
		uni.$emit('updateXiaoXiList', list);
		// 最后返回
		console.log('获取或更新消息页列表为最新数据', list);
		return list;
	
	}
	
	// 当发送消息是图片视频等，消息页列表最新聊天的最后一条消息显示[图片][视频]等
	XiaoXiListAnyOneLastMsgFormat(data, msg, isSend){
		console.log('消息页显示[图片][视频]等的data处理数据',data);
		// 显示到消息列表的新属性
		let datadesc = ``;
		let dataType = data.dataType ? data.dataType : msg.dataType;
		switch(dataType){
			case 'image':
			    if(data && data.otherData && data.otherData.type){
				    if(data.otherData.type == 'iconMenus'){
					    datadesc = `[表情]`;
						if(data.otherData.typedata && data.otherData.typedata.name){
							datadesc += `[${data.otherData.typedata.name}]`;
						}
				    }else if(data.otherData.type == 'image'){
						datadesc = `[图片]`;
					}
			    }else{
					if(msg && msg.otherData && msg.otherData.type){
						if(msg.otherData.type == 'iconMenus'){
						    datadesc = `[表情]`;
							if(msg.otherData.typedata && msg.otherData.typedata.name){
								datadesc += `[${msg.otherData.typedata.name}]`;
							}
						}else if(msg.otherData.type == 'image'){
							datadesc = `[图片]`;
						}
					}
				}
			    break;
			case 'audio':
			    datadesc = `[语音]`;
			    break;
			case 'video':
			    datadesc = `[视频]`;
			    break;
			case 'file':
			    datadesc = `[文件]`;
			    break;
			case 'pdf':
			    datadesc = `[pdf文件]`;
			    break;
			case 'docx':
			    datadesc = `[word文档]`;
			    break;
		}
		// 是否显示发送者
		datadesc = isSend ? datadesc : `${msg.from_name}: ${datadesc}`;
		console.log('消息页显示[图片][视频]等的显示数据',datadesc);
		return datadesc;
	}
	
	// 更新(获取)消息页，整个消息列表的未读数（不急可以异步执行）
	async updateXiaoXiListNoreadNum(list = false) {
		// 获取消息页列表本地历史信息
		list = !list ? this.getXiaoXiList() : list;
		// 循环list里面的每一项把属性noreadnum相加一起
		let num = 0;
		list.forEach(v => {
			num += v.noreadnum;
		});
		// 可在这里执行更新，或者赋值给实例属性在页面调用
		// 实例属性:消息页整个聊天列表数据的未读数
		this.xiaoxiNoreadNum = num;
		console.log('消息页整个聊天列表数据的未读数：', num);
		// 消息总未读数变化触发
		uni.$emit('totalNoReadNum', num);
		// 还可以返回
		return num;
	}
	
	// 数组元素置顶
	arrToFirst(arr, index) {
		// 判断：因为等于0本来就在最上面
		if (index != 0) {
			arr.unshift(arr.splice(index, 1)[0]);
		}
		return arr;
	}
	
	// 获取消息页列表本地历史信息
	getXiaoXiList() {
		// 定义消息列表key,支持多用户切换
		let key = 'chatlist_' + this.user.id;
		let list = uni.getStorageSync(key);
		return list ? JSON.parse(list) : [];
	}

	// 存储消息页列表本地历史信息
	setXiaoXiList(list) {
		// 定义消息列表key,支持多用户切换
		let key = 'chatlist_' + this.user.id;
		uni.setStorageSync(key, JSON.stringify(list));
	}

	// 查看我是否在线websocket是否正常连接
	meIsOnline() {
		if (!this.isOnline) {
			// 我不在线可以提示我确认重新连接websocket
			this.connectWebsocketcomfirm();
			return false;
		}
		return true;
	}

	// 提示我确认重新连接websocket
	connectWebsocketcomfirm(msdata = null, confirmCallback = false, cancelCallback = false) {
		uni.showModal({
			title: msdata && msdata.title ? msdata.title :  '掉线提示',
			content: msdata && msdata.content ? msdata.content : '网络信号不稳定已掉线，是否重新连接？',
			showCancel: true,
			cancelText: msdata && msdata.cancelText ? msdata.cancelText : '取消',
			confirmText: msdata && msdata.confirmText ? msdata.confirmText : '重新连接',
			success: res => {
				if (res.confirm) {
					if(confirmCallback && typeof confirmCallback == 'function'){
						confirmCallback();
					}else{
						this.connectSocket();
					}
				}else{
					console.log('点了取消');
					if(cancelCallback && typeof cancelCallback == 'function'){
						cancelCallback();
					}
				}
			},
		});
	}
	
	// 处理接收到的消息
	async doMessage(msg){
		console.log('处理接收到的消息',msg);
		if(msg.type == 'system'){
			console.log('系统消息单独处理');
		}else if(msg.type == 'singleChat'){
			let msgData = msg.data;
			if(msgData.actionType && msgData.actionType =='revoke'){
				// 撤回操作
				// 获取历史记录, 传key值则找指定聊天记录
				// 不传key则构建一个聊天对象因为对方可能不在聊天页
				// this.ToObject.chatType = msgData.chatType;
				// this.ToObject.id = msgData.chatType == 'single' ? msgData.from_id : msgData.to_id; //接收人|群id 
				let keyId = msgData.chatType == 'single' ? msgData.from_id : msgData.to_id; //接收人|群id
				// 因为this.ToObject初始化默认false,无法赋值，所以我们直接传key
				let key = `chatDetail_${this.user.id}_${msgData.chatType}_${keyId}`;
				let chatInfoList = this.getChatInfo(key);
				console.log('----撤回处理获取所有历史记录----',chatInfoList);
				// 根据id找到要撤回的消息
				let index = chatInfoList.findIndex(v => v.id == msgData.id);
				if(index != -1){
					// 找到了
					let revokeMsg = chatInfoList[index];
					console.log('----找到了要撤回的消息历史记录----', revokeMsg);
					revokeMsg.isremove = 1;
					// 找到k属性
					let k = revokeMsg.k;
					// 更新指定的历史记录信息(不急着更新可以异步)
					await this.updateChatInfo(revokeMsg, k, false);
					// 消息页列表要不要更新：取决于撤回的消息是不是最新的消息
					if(chatInfoList.length - 1 == index){
						// 是最新的消息
						// 消息页修改data 和 type
						revokeMsg.data = msgData.data;
						revokeMsg.type = msgData.type;
						revokeMsg.update_time = (new Date()).getTime();
						// 消息页的聊天列表更新一下
						this.updateXiaoXiList(revokeMsg, false);
						// 全局通知数据--聊天页做更新
					}else{
						// 不是最新消息
						// 全局通知数据--聊天页做更新
					}
					// 全局通知数据--聊天页做更新
					uni.$emit('onMessage', {
						actionType: msgData.actionType,
						...revokeMsg,
					});
				}
			}else{
				// 关于跳转消息接收一次即可
				// 获取消息页列表本地历史信息
				let _xiaoxiList = this.getXiaoXiList();
				// 拿到刚接收的消息id - 通过判断拿到
				let _xiaoxiId = msgData.chatType == 'single' ? msgData.from_id : msgData.to_id;
				// 通过_xiaoxiId判断一下之前有没有这个消息在消息页，且是跳转消息
				let _index = _xiaoxiList.findIndex(v=> v.id == _xiaoxiId && 
				            v.chatType == msgData.chatType && msgData.redirect && msgData.redirect.url);
				// 如果找到了就没有必要执行后面的程序了
				if(_index != -1){
					return false;
				}

				
				// 把聊天信息存在本地
				let { data } = this.addChatInfo(msgData, false);
				// 消息页的聊天列表更新一下
				this.updateXiaoXiList(data, false);
				// 全局通知数据
				uni.$emit('onMessage', data);
				// 消息提示音根据设置情况来
				// 这里我们仅根据消息页的设置来判断（如果服务器有这个配置项，可根据服务器判断）
				let xiaoxiId = msgData.chatType == 'single' ? msgData.from_id : msgData.to_id;
				// 获取消息页列表本地历史信息
				let xiaoxiList = this.getXiaoXiList();
				// 找到消息页的某个聊天对象的设置
				let index = xiaoxiList.findIndex(v=> v.id == xiaoxiId && v.chatType == msgData.chatType);
				if(index != -1){
					let setInfo = xiaoxiList[index];
					console.log('找到了消息页对应的设置消息', setInfo);
					if(!setInfo.nowarn){
						// 消息提示
						this.msgNotice();
					}
				}
			}
		}
	}
		
	// 进入聊天页，将消息页当前聊天用户的未读数清零
	async goChatPageUpdateXiaoXiNoReadNum(to_id, chatType){
		let xiaoxiList = this.getXiaoXiList();
		// 找到当前聊天
		let index = xiaoxiList.findIndex(v => v.id == to_id && v.chatType == chatType);
		if(index != -1){
			// 找到了
			xiaoxiList[index].noreadnum = 0;
			// 修改完了之后，存储消息页列表本地历史信息
			this.setXiaoXiList(xiaoxiList);
			// 更新(获取)消息页，整个消息列表的未读数（不急可以异步执行）
			this.updateXiaoXiListNoreadNum();
			// 消息页，整个消息列表的数据也存入了vuex中
			// 更新一下vuex中的消息列表的数据
			uni.$emit('updateXiaoXiList', xiaoxiList);
			
		}
	}

    // 聊天页设置相关信息获取
    getChatPageSet(to_id, chatType){
        let xiaoxiList = this.getXiaoXiList();
        // 找到当前聊天
        let index = xiaoxiList.findIndex(v => v.id == to_id && v.chatType == chatType);
        if(index != -1){
            // 找到了
            return xiaoxiList[index];
        }
        return null;
    }
	
	// 获取离线消息（不在线的时候别人或者群发的消息）
	chatGetmessageOffLine(){
		uni.$u.http.post(requestUrl.http + `/api/chat/chatGetmessageOffLine`, {}, {
			header: {
				token: this.user.token,
			},
		}).then(res => {
			console.log('服务器返回离线消息', res);
		}).catch(err => {
			console.log('服务器返回离线消息失败', err);
			if(err.data && err.data.data == 'Token 令牌不合法！'){
				/*
				if(this.user.role == 'visitor'){
					console.log('游客如果token令牌错误，重新获取token并连接websocket');
					// this.registerGuestAndConnect(); // 游客不需要提示，会自动重连的
					// 在测试中发现，如果服务器宕机，但是游客本地数据还在，还可以连上websocket
					// 但是redis中没有chat_user_id值了，导致api接口的token不合法
					// 这种情况很极端，但需要考虑到 - 方案：清空本地登录信息，再次登录
					// 那么就和下面的登录用户一样处理
				}else if(this.user.role == 'user'){
					console.log('登录用户token不正确，说明在的别的设备登录了，则清空本地登录信息，在换成游客模式');
					store.dispatch('logoutAction', ()=>{
						this.doRegisterGuest();
					});
				}
				*/
			    store.dispatch('logoutAction', ()=>{
			    	this.doRegisterGuest();
			    });
			}
		});
	}
	
	// 游客如果token令牌错误，重新获取token并连接websocket
	async registerGuestAndConnect(){
		try{
			this.connectWebsocketcomfirm({
				title:'来自系统的提示',
				content:'您之前在其它的设备打开过现在已掉线，是否在本设备重新连接',
			}, ()=>{
				this.doRegisterGuest();
			});
		}catch(error){
			console.error('游客获取token失败',error);
		}
	}
	
	// 游客如果token令牌错误，重新获取token并连接websocket
	async doRegisterGuest(){
		const userData = await registerGuest(store);
		console.log('游客重新获取token等信息', userData);
		
		if(userData && userData.token){
			// 更新用户信息
			this.user = userData;
			// 连接websocket
			this.connectSocket();
		}
	}
	
	// 撤回消息
	revokeChatInfo(options){
		return new Promise((resolve,reject)=>{
			uni.$u.http.post(requestUrl.http + `/api/chat/revokeMessage`,options,{
				header:{
					token: this.user.token, 
				}
			}).then(res=>{
				console.log('服务器撤回消息结果',res);
				// 删除或者(撤回)（与某个群所有或者某条聊天信息，与某个人的所有或者某条聊天信息）
				this.clearChatInfo(options.to_id, options.chatType, options.id).then(()=>{
					resolve(res.data.data);
				});
			}).catch(err=>{
				console.log('服务器撤回消息失败结果',err);
				uni.showToast({title: err.data.data, icon:'none'});
				reject(err);
			});
		});
	}
	
	// 消息提示音
	msgNotice(){
		// 震动
		// uni.vibrate();
		// 提示音
		this.chatClassAudioContext.src = chatAudioInfo.getMessageAudio;
		this.chatClassAudioContext.play();
	}
	
	
}

export default chatClass;
```



















