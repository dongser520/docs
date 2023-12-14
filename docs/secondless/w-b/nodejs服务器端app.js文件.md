---
navbar: true
sidebar: auto
title: nodejs服务器端app.js文件
---

## 一、在留言板上对手机号进行加密
```javascript
let http = require('http');
let fs = require('fs');
let $url = require('url');
let querystring = require('querystring');
let crypto = require('crypto');
//采用对称加密
//自定义IV(16位)、key(密钥（32位的'aes-256-cbc'）（24位的'aes-192-cbc'）)
const secret = {
    iv:'IloveYOU@520520!', // 初始化向量（iv）16位
    key:'a123456789@!*&%bcdef@123456789&&', // 32 位密钥
}

const server =  http.createServer((request,response)=>{
    if(request.method == 'GET'){
        let url = request.url;
        if(url.indexOf('/api/') == -1){
            if(url.indexOf('.json') > -1){
                errorhtml(response)
            }else{
                fs.readFile(`./${url}`,(err,data)=>{
                    if(err){
                        errorhtml(response)
                    }else{
                        response.writeHead(200);
                        response.end(data);
                    }
                });
            }
        }  
    }else if(request.method == 'POST'){
        let result = [];
        request.on('data',buffer=>{
           result.push(buffer);
        });
        request.on('end',()=>{
           let data = Buffer.concat(result);
           response.writeHead(200);
           response.end('ok');
           //留言写入json文件
           let paths = {
              dir:'./data',
              file:'./data/message.json'
            //   dir:'./Appdata',
            //   file:'./Appdata/data.json'
           }
           addmessage(data,paths);
        });
        
    }
});

server.listen(8888,'127.0.0.1',()=>{
    console.log('服务器已启动');
});


const errorhtml = (response)=>{
    response.setHeader('Content-Type','text/html; charset=utf-8');
    response.writeHead(404);
    let msg = {
        "status" : 404,
        "info" : 'error',
        "data" : 'not found'
    }
    response.end(JSON.stringify(msg));
}

//留言写入json文件
function addmessage(data,paths){
    // console.log(querystring.parse(data.toString()));
    data = querystring.parse(data.toString());
    //对电话号码做一个加密
    // let aestel = aesEncrypt(data.tel, secret.key, secret.iv);
    // console.log(aestel);
    // data.tel = aestel;
    /*
    data.tel = aesEncrypt(data.tel, secret.key, secret.iv);
    //试一下解密
    data.tel = aesDecrypt(data.tel, secret.key, secret.iv);
    */
    // console.log(data);return; 
    //创建一个文件夹data
    if(!fs.existsSync(paths.dir)){
       fs.mkdirSync(paths.dir);
    };
    //判断message.json文件是否存在，存在说明之前写入过了，先读一下
    // console.log(fs.existsSync('./data/message.json'));
    let flag = fs.existsSync(paths.file);
    if(flag){
         //存在先读取一下
         readmessage(paths.file,data)
    }else{
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
        writemessage(paths.file,o);
        
    }
}

//存在先读取一下
function readmessage(path,data){
  //读取内容,同步异步promise,以及可写流
  fs.readFile(path,{
    flag:'r',
    encoding:'utf-8',
  },(err,oldmessage)=>{
    if(err) throw err;
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
    writemessage(path,oldmessage);

  })
}

//写入留言
function writemessage(path,data){
    fs.writeFile(path,JSON.stringify(data),(err)=>{
        if(err) throw err;
        console.log('写入成功')
    });
}

//对称加密
function aesEncrypt(data, key, iv) {
    // 给定的算法，密钥和初始化向量（iv）创建并返回Cipher对象
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    // 指定要摘要的原始内容,可以在摘要被输出之前使用多次update方法来添加摘要内容
    // 数据的编码 utf8 返回值的编码 hex
    var crypted = cipher.update(data, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
}
//对称解密
function aesDecrypt(data, key, iv) {
    // 给定的算法，密钥和初始化向量（iv）创建并返回Cipher对象
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    // 数据的编码 hex 返回值的编码 utf8
    var decrypted = decipher.update(data, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}
```