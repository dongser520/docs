---
navbar: true
sidebar: auto
title: 案例：eggjs+postman测试工具将留言写入json文件
---

## 一、基础准备
说明：学习本案例，需要把<a href="/secondless/w-c/Egg.js.html" target="_blank">第二学期-第三季课程：章节2.Egg.js基础</a>  按照老师的课程视频，一步一步听下来敲下来，<b>不要跳课学习!</b>
### ① 安装eggjs项目、postman调试工具、关闭csrf开启跨域
> 具体先学习完<a href="/secondless/w-c/Egg.js.html" target="_blank">第二学期-第三季课程：章节2.Egg.js基础</a>
```js
npm run dev //让项目跑起来
```
### ② 配置路由 
路由配置 /app/router.js
```js
router.post('/message/create',controller.message.create);
```

### ③ 控制器代码
/app/controller/message.js
```js
'use strict';

const fs = require('node:fs');
const path = require('node:path');
let querystring = require('querystring');
let crypto = require('crypto');
//自定义IV(16位)、key(密钥（32位的'aes-256-cbc'）（24位的'aes-192-cbc'）)
const secret = {
    iv: 'IloveYOU@520520!',// 初始化向量（iv）16位
    key: 'a123456789@!*&%bcdef@123456789&&', // 32 位秘钥密钥
}

const Controller = require('egg').Controller;

class MessageController extends Controller {
    //读取所有的留言信息列表
    async list() {
        this.ctx.body = {
            msg: 'ok',
            data: await this.getMessageJson()
        }
    }
    //获取某一条留言数据
    async read() {
        // this.ctx.body = this.ctx.params.id;
        let id = this.ctx.params.id;
        // console.log(typeof id);//string
        //根据id查找对应的留言数据，数组中根据某个条件找元素返回新数组 find方法
        let messageData = await this.getMessageJson();
        let data = messageData.find(item => item.id == id);
        this.ctx.body = {
            msg: 'ok',
            data: data
        }
        //设置状态码
        // this.ctx.status = 200;
    }

    //创建一条信息的留言
    async create() {
        /*
        //post、put、patch 接收参数 ctx.request.body
        // console.log(this.ctx.request);
        console.log(this.ctx.request.body);
        //一般处理流程
        //1.参数验证
        //2.写入数据库
        //3.成功之后给页面反馈
        this.ctx.body = {
            msg:'ok',
            // data:{
            //     username:'林俊杰',
            //     tel:13545858789
            // },
            data:this.ctx.request.body
        };
        */
        this.ctx.body = {
            msg: 'ok',
            data: 'success'
        }
        //留言写入json文件
        let paths = {
            dir: './data',
            file: './data/message.json'
            //   dir:'./Appdata',
            //   file:'./Appdata/data.json'
        }
        let data = this.ctx.request.body;
        await this.addmessage(data, paths);
    }


    //获取留言数据
    async getMessageJson() {
        // console.log(__dirname);//D:\【第二学期第3季】课程代码\myegg\app\controller
        //D:\【第二学期第3季】课程代码\myegg\data\message.json
        // console.log(path.resolve(__dirname,'../../','data/message.json'));
        let data = fs.readFileSync(path.resolve(__dirname, '../../', 'data/message.json'), {
            encoding: 'utf-8'
        });
        // let data = fs.readFileSync('./data/message.json',{
        //     encoding: 'utf-8'
        // });
        // console.log(JSON.parse(data).data);
        return JSON.parse(data).data
    }

    //留言写入json文件
    async addmessage(data, paths) {
        // console.log(querystring.parse(data.toString()));
        //data = querystring.parse(data.toString());
        //对电话号码做一个加密
        // console.log(data);
        data.tel = await this.aesEncrypt(data.tel, secret.key, secret.iv);
        // let _tel = aesDecrypt(data.tel, secret.key, secret.iv);
        // console.log(_tel);
        // console.log(data); return;

        //创建一个文件夹data
        if (!fs.existsSync(paths.dir)) {
            fs.mkdirSync(paths.dir);
        };
        //判断message.json文件是否存在，存在说明之前写入过了，先读一下
        // console.log(fs.existsSync('./data/message.json'));
        let flag = fs.existsSync(paths.file);
        if (flag) {
            //存在先读取一下
            await this.readmessage(paths.file, data)
        } else {
            //不存在，首次直接写
            let ms = data;
            ms.id = 1;
            //加入时间,所在地等等
            ms.timestamp = new Date().getTime();
            // console.log(ms);
            let o = {};
            o.data = [];
            o.data.push(ms);
            o.total = 1;
            o.currentId = 1;
            // console.log(o);
            // console.log(JSON.stringify(o));
            //写入内容,同步异步promise,以及可写流
            await this.writemessage(paths.file, o);

        }
    }

    //存在先读取一下
    async readmessage(path, data) {
        //读取内容,同步异步promise,以及可写流
        fs.readFile(path, {
            flag: 'r',
            encoding: 'utf-8',
        }, (err, oldmessage) => {
            if (err) throw err;
            oldmessage = JSON.parse(oldmessage);
            console.log(oldmessage)
            console.log(data);
            //处理留言数据
            data.id = oldmessage.currentId + 1;
            //加入时间,所在地等等
            data.timestamp = new Date().getTime();
            //大对象
            oldmessage.data.push(data);
            oldmessage.total = oldmessage.data.length;
            oldmessage.currentId = data.id;
            console.log(oldmessage);
            //写入内容,同步异步promise,以及可写流
            this.writemessage(path, oldmessage);

        })
    }

    //写入留言
    async writemessage(path, data) {
        fs.writeFile(path, JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log('写入成功')
        });
    }

    //对称加密
    async aesEncrypt(data, key, iv) {
        // 给定的算法，密钥和初始化向量（iv）创建并返回Cipher对象
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
        // 指定要摘要的原始内容,可以在摘要被输出之前使用多次update方法来添加摘要内容
        // 数据的编码 utf8 返回值的编码 hex
        var crypted = cipher.update(data, 'utf8', 'hex')
        crypted += cipher.final('hex')
        return crypted
    }
    //对称解密
    async aesDecrypt(data, key, iv) {
        // 给定的算法，密钥和初始化向量（iv）创建并返回Cipher对象
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
        // 数据的编码 hex 返回值的编码 utf8
        var decrypted = decipher.update(data, 'hex', 'utf8')
        decrypted += decipher.final('utf8')
        return decrypted
    }
}

module.exports = MessageController;
```