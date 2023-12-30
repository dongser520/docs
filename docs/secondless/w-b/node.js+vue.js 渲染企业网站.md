---
navbar: true
sidebar: auto
title: node.js+vue.js 渲染企业网站
---

## 一、基础准备
说明：学习本案例，需要把<a href="/secondless/w-b/Node.js.html" target="_blank">章节7:Node.js基础</a> 和 <a href="/secondless/w-b/Vue.js.html" target="_blank">章节9.Vue.js基础</a> 按照老师的课程视频，一步一步听下来敲下来，<b>不要跳课学习!</b>
### 1. 启动node服务器
> 命令： `npm run start` 该命令源自于package.json的自定义调试指令（不清楚的同学回去看一下章节7：Node.js基础），让企业网站先跑起来
### 2. 网站数据准备
> 由于目前大家没有学习数据库，因此我们用json文件作为数据库来渲染网站，大家现在对json文件已经非常熟练了，前面刚刚学习了<a href="/secondless/w-b/nodejs+jQuery开发留言板.html" target="_blank">json文件存储留言板的功能</a> 。<br/>
> 老师已经给大家准备了网站数据json文件，大家可以去群文件里面下载本节课的课件，里面都有。或者直接复制下面的代码存储为json文件：

① /data/siteConfig.json <br/> `[样本] (网站配置，类似数据库中的siteConfig表)`
```json
{
    "domain":"www.xxxx.com",
    "corporate_name":"睿晨电网建设工程有限公司",
    "corporate_short":"睿晨电网",
    "address":"北京CBD帝国大厦999层-1001号",
    "connect":{
        "tel":"010-8888-8888",
        "mobile":"13858588888",
        "serviceUser":"张经理",
        "QQ":"1582758589",
        "weixin":"company_51yrc",
        "email":"51yrc@126.com"
    }
}
```
② /data/category.json <br/> `[样本] (网站栏目分类，类似数据库中的category表)`
```json
{
    "data": [
        {
            "id": 1,
            "name": "网站首页",
            "en_name": "home",
            "href": "/",
            "target":"_self",
            "show":true
        },
        {
            "id": 2,
            "name": "关于我们",
            "en_name": "about us",
            "href": "/detail.html",
            "target":"_self",
            "show":true
        },
        {
            "id": 3,
            "name": "新闻中心",
            "en_name": "news center",
            "href": "/news.html",
            "target":"_self",
            "show":true
        },
        {
            "id": 4,
            "name": "主营业务",
            "en_name": "main business",
            "href": "/business.html",
            "target":"_self",
            "show":true
        },
        {
            "id": 5,
            "name": "工程案例",
            "en_name": "engineering case",
            "href": "/case.html",
            "target":"_self",
            "show":true
        },
        {
            "id": 6,
            "name": "联系我们",
            "en_name": "contact us",
            "href": "/contact.html",
            "target":"_self",
            "show":true
        },
        {
            "id": 7,
            "name": "banner广告图",
            "en_name": "",
            "href": "/contact.html",
            "target":"_self",
            "show":false
        },
        {
            "id": 8,
            "name": "合作单位",
            "en_name": "cooperative units",
            "href": "",
            "target":"_self",
            "show":false
        }
    ],
    "total": 8,
    "currentId": 8
}
```
③ /data/news.json <br/> `[样本] (网站内容，类似数据库中的news表)`
```json
{
    "data": [
        {
            "id": 1,
            "pid":2,
            "title": "关于我们",
            "title_name": "COMPANY PROFILE",
            "href": "/detail.html",
            "target":"_blank",
            "poster":"/static/image/aboutus_des.jpg",
            "timestamp":1702539415553,
            "description":"睿晨电网建设工程有限公司，总部位于美丽江城武汉， 企业注册资金壹亿零捌万元整，总投资2亿元。 公司具有输变电工程专业承包叁级资质、 市政公用工程施工总承包叁级资质、 电力工程施工总承包叁级资质、建筑机电安装工程专业承包叁级资质、 承装承修承试叁级资质。 并成功入围国网浙江省电力公司、湖北省电力公司、 福建省电力公司，南网广东省电力公司、海南省电力公司、 广西省电力公司资格准入承包商名册。",
            "keyword":"关于睿晨电网|关于我们|睿晨电网建设工程有限公司",
            "content":"睿晨电网建设工程有限公司主要从事电力工程，规划设计 变电站电力设备，高压试验设备，变电线路检测设备，自动化控制系统，在线监测系统，信息化集成， 实验仪器仪表等研制、生产、销售、技术、售后服务，公司的主要产品有各种电力测试的解决方案，耐电压试验系列， 调频串联谐振试验装置、电力设备的在线监测系统，冲击耐压、 水利水电信息化，无局放试验系列、油化测定，FS6检查系列等等，经营的产品广泛涉足工业自动化与城乡电网的建设、 改造和铁路、航天航空、高等院校、实验室、通信、环保、质检、医疗等领域。"
        },
        {
            "id": 2,
            "pid":7,
            "title": "你用电 我用心 共建光明",
            "title_name": "",
            "href": "/contact.html",
            "target":"_blank",
            "poster":"/static/image/banner.jpg",
            "timestamp":1702539117553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 3,
            "pid":4,
            "title": "规划设计",
            "title_name": "",
            "href": "/business.html",
            "target":"_blank",
            "poster":"/static/image/mainbusiness01.png",
            "timestamp":1702539217553,
            "description":"供电工程前期现场勘察、供电方案设计",
            "keyword":"",
            "content":""
        },
        {
            "id": 4,
            "pid":4,
            "title": "施工建设",
            "title_name": "",
            "href": "/business.html",
            "target":"_blank",
            "poster":"/static/image/mainbusiness02.png",
            "timestamp":1702539317553,
            "description":"电力工程预算造价、承建施工",
            "keyword":"",
            "content":""
        },
        {
            "id": 5,
            "pid":4,
            "title": "电力设备销售",
            "title_name": "",
            "href": "/business.html",
            "target":"_blank",
            "poster":"/static/image/mainbusiness03.png",
            "timestamp":1702539417553,
            "description":"涵盖高低压等各类电力设备",
            "keyword":"",
            "content":""
        },
        {
            "id": 6,
            "pid":5,
            "title": "500千伏变电项目",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case01.jpg",
            "timestamp":1702539517553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 7,
            "pid":5,
            "title": "碧桂园鸟语花香配电工程",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case02.jpg",
            "timestamp":1702539516553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 8,
            "pid":5,
            "title": "光谷一号变电工程",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case03.jpg",
            "timestamp":1702539516553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 9,
            "pid":5,
            "title": "前进药业变电系统",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case04.jpg",
            "timestamp":1702539526553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 10,
            "pid":5,
            "title": "东城千伏变电站",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case05.jpg",
            "timestamp":1702539226553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 11,
            "pid":5,
            "title": "远大集团",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case06.jpg",
            "timestamp":1702539245553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 12,
            "pid":5,
            "title": "东山光伏发电",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case07.jpg",
            "timestamp":1702539215553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 13,
            "pid":5,
            "title": "西伯利亚风能",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case08.jpg",
            "timestamp":1702539265553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 14,
            "pid":3,
            "title": "我司顺利通过“质量、安全及职业健康安全管理体系我司顺利通过",
            "title_name": "",
            "href": "",
            "target":"_blank",
            "poster":"/static/image/newspic01.jpg",
            "timestamp":1702539165553,
            "description":"2022年8月2日到3日中电联（北京）认证中心委派2位审核专家对我司质量、安全及职业健康安全管理体系进行审核并顺利通过2022年8月2日到3日中电联",
            "keyword":"",
            "content":""
        },
        {
            "id": 15,
            "pid":3,
            "title": "“电网一张图”覆冰监测模块显示湖南郴州有10条输电线路覆冰",
            "title_name": "",
            "href": "",
            "target":"_blank",
            "poster":"/static/image/newspic01.jpg",
            "timestamp":1702539265553,
            "description":"“电网一张图”覆冰监测模块显示湖南郴州有10条输电线路覆冰。郴州供电公司应急指挥中心立即根据冰情厚度对其中4条线路开展融冰作业。截至12月25日18时,",
            "keyword":"",
            "content":""
        },
        {
            "id": 16,
            "pid":3,
            "title": "充分发挥先锋模范作用,确保圆满完成既定目标",
            "title_name": "",
            "href": "",
            "target":"_blank",
            "poster":"/static/image/newspic01.jpg",
            "timestamp":1702539265553,
            "description":"“工程投运前的这段关键时期,党员同志更要主动担当作为,充分发挥先锋模范作用,确保圆满完成既定目标。”11月10日,山东500千伏麟祥输变电工程临时党支部书记周彬在党员大会上",
            "keyword":"",
            "content":""
        },
        {
            "id": 17,
            "pid":8,
            "title": "国家电网",
            "title_name": "",
            "href": "",
            "target":"_blank",
            "poster":"/static/image/unit/unit01.jpg",
            "timestamp":1702539265553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 18,
            "pid":8,
            "title": "中国电建",
            "title_name": "",
            "href": "",
            "target":"_blank",
            "poster":"/static/image/unit/unit02.jpg",
            "timestamp":1702539265553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 19,
            "pid":8,
            "title": "中国中铁",
            "title_name": "",
            "href": "",
            "target":"_blank",
            "poster":"/static/image/unit/unit03.jpg",
            "timestamp":1702539265553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 20,
            "pid":8,
            "title": "华中科技大学",
            "title_name": "",
            "href": "",
            "target":"_blank",
            "poster":"/static/image/unit/unit04.jpg",
            "timestamp":1702539265553,
            "description":"",
            "keyword":"",
            "content":""
        }
        
    ],
    "total": 20,
    "currentId": 20
}
```

## 二、编写api接口获取数据
> 说明：群里面有同学提问说老师，关于news.json中的pid是不是什么关键字或者操作符，它们才产生关系的，这里说明：pid只是我们定义的属性，你可以换成任何其他的属性名，为了方便大家理解，结合前端流行框架的默认定义，我们将 `pid` 改成 `category_id` 更容易方便大家理解 两个文件之间的关联关系。<br/>

/data/news.json <br/> `[样本] (网站内容，类似数据库中的news表)`
```json
{
    "data": [
        {
            "id": 1,
            "category_id":2,
            "title": "关于我们",
            "title_name": "COMPANY PROFILE",
            "href": "/detail.html",
            "target":"_blank",
            "poster":"/static/image/aboutus_des.jpg",
            "timestamp":1702539415553,
            "description":"睿晨电网建设工程有限公司，总部位于美丽江城武汉， 企业注册资金壹亿零捌万元整，总投资2亿元。 公司具有输变电工程专业承包叁级资质、 市政公用工程施工总承包叁级资质、 电力工程施工总承包叁级资质、建筑机电安装工程专业承包叁级资质、 承装承修承试叁级资质。 并成功入围国网浙江省电力公司、湖北省电力公司、 福建省电力公司，南网广东省电力公司、海南省电力公司、 广西省电力公司资格准入承包商名册。",
            "keyword":"关于睿晨电网|关于我们|睿晨电网建设工程有限公司",
            "content":"睿晨电网建设工程有限公司主要从事电力工程，规划设计 变电站电力设备，高压试验设备，变电线路检测设备，自动化控制系统，在线监测系统，信息化集成， 实验仪器仪表等研制、生产、销售、技术、售后服务，公司的主要产品有各种电力测试的解决方案，耐电压试验系列， 调频串联谐振试验装置、电力设备的在线监测系统，冲击耐压、 水利水电信息化，无局放试验系列、油化测定，FS6检查系列等等，经营的产品广泛涉足工业自动化与城乡电网的建设、 改造和铁路、航天航空、高等院校、实验室、通信、环保、质检、医疗等领域。"
        },
        {
            "id": 2,
            "category_id":7,
            "title": "你用电 我用心 共建光明",
            "title_name": "",
            "href": "/contact.html",
            "target":"_blank",
            "poster":"/static/image/banner.jpg",
            "timestamp":1702539117553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 3,
            "category_id":4,
            "title": "规划设计",
            "title_name": "",
            "href": "/business.html",
            "target":"_blank",
            "poster":"/static/image/mainbusiness01.png",
            "timestamp":1702539217553,
            "description":"供电工程前期现场勘察、供电方案设计",
            "keyword":"",
            "content":""
        },
        {
            "id": 4,
            "category_id":4,
            "title": "施工建设",
            "title_name": "",
            "href": "/business.html",
            "target":"_blank",
            "poster":"/static/image/mainbusiness02.png",
            "timestamp":1702539317553,
            "description":"电力工程预算造价、承建施工",
            "keyword":"",
            "content":""
        },
        {
            "id": 5,
            "category_id":4,
            "title": "电力设备销售",
            "title_name": "",
            "href": "/business.html",
            "target":"_blank",
            "poster":"/static/image/mainbusiness03.png",
            "timestamp":1702539417553,
            "description":"涵盖高低压等各类电力设备",
            "keyword":"",
            "content":""
        },
        {
            "id": 6,
            "category_id":5,
            "title": "500千伏变电项目",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case01.jpg",
            "timestamp":1702539517553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 7,
            "category_id":5,
            "title": "碧桂园鸟语花香配电工程",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case02.jpg",
            "timestamp":1702539516553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 8,
            "category_id":5,
            "title": "光谷一号变电工程",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case03.jpg",
            "timestamp":1702539516553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 9,
            "category_id":5,
            "title": "前进药业变电系统",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case04.jpg",
            "timestamp":1702539526553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 10,
            "category_id":5,
            "title": "东城千伏变电站",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case05.jpg",
            "timestamp":1702539226553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 11,
            "category_id":5,
            "title": "远大集团",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case06.jpg",
            "timestamp":1702539245553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 12,
            "category_id":5,
            "title": "东山光伏发电",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case07.jpg",
            "timestamp":1702539215553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 13,
            "category_id":5,
            "title": "西伯利亚风能",
            "title_name": "",
            "href": "/case.html",
            "target":"_blank",
            "poster":"/static/image/case/case08.jpg",
            "timestamp":1702539265553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 14,
            "category_id":3,
            "title": "我司顺利通过“质量、安全及职业健康安全管理体系我司顺利通过",
            "title_name": "",
            "href": "",
            "target":"_blank",
            "poster":"/static/image/newspic01.jpg",
            "timestamp":1702539165553,
            "description":"2022年8月2日到3日中电联（北京）认证中心委派2位审核专家对我司质量、安全及职业健康安全管理体系进行审核并顺利通过2022年8月2日到3日中电联",
            "keyword":"",
            "content":""
        },
        {
            "id": 15,
            "category_id":3,
            "title": "“电网一张图”覆冰监测模块显示湖南郴州有10条输电线路覆冰",
            "title_name": "",
            "href": "",
            "target":"_blank",
            "poster":"/static/image/newspic01.jpg",
            "timestamp":1702539265553,
            "description":"“电网一张图”覆冰监测模块显示湖南郴州有10条输电线路覆冰。郴州供电公司应急指挥中心立即根据冰情厚度对其中4条线路开展融冰作业。截至12月25日18时,",
            "keyword":"",
            "content":""
        },
        {
            "id": 16,
            "category_id":3,
            "title": "充分发挥先锋模范作用,确保圆满完成既定目标",
            "title_name": "",
            "href": "",
            "target":"_blank",
            "poster":"/static/image/newspic01.jpg",
            "timestamp":1702539265553,
            "description":"“工程投运前的这段关键时期,党员同志更要主动担当作为,充分发挥先锋模范作用,确保圆满完成既定目标。”11月10日,山东500千伏麟祥输变电工程临时党支部书记周彬在党员大会上",
            "keyword":"",
            "content":""
        },
        {
            "id": 17,
            "category_id":8,
            "title": "国家电网",
            "title_name": "",
            "href": "",
            "target":"_blank",
            "poster":"/static/image/unit/unit01.jpg",
            "timestamp":1702539265553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 18,
            "category_id":8,
            "title": "中国电建",
            "title_name": "",
            "href": "",
            "target":"_blank",
            "poster":"/static/image/unit/unit02.jpg",
            "timestamp":1702539265553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 19,
            "category_id":8,
            "title": "中国中铁",
            "title_name": "",
            "href": "",
            "target":"_blank",
            "poster":"/static/image/unit/unit03.jpg",
            "timestamp":1702539265553,
            "description":"",
            "keyword":"",
            "content":""
        },
        {
            "id": 20,
            "category_id":8,
            "title": "华中科技大学",
            "title_name": "",
            "href": "",
            "target":"_blank",
            "poster":"/static/image/unit/unit04.jpg",
            "timestamp":1702539265553,
            "description":"",
            "keyword":"",
            "content":""
        }
        
    ],
    "total": 20,
    "currentId": 20
}
```

### ① 引入vue.js，设置请求接口
> vue生命周期参考： <a href="https://juejin.cn/post/7036915881506504740" target="_blank">[vue生命周期]</a><br/>
具体操作查看课程视频

### ② nodejs服务端读取、处理数据并响应给浏览器
/app.js
```js
//首页请求数据
function getIndex(response){
    // 读取数据：category.json
    let categoryData =  fs.readFileSync('./data/category.json',{
        'encoding':'utf-8'
    });
    let category = JSON.parse(categoryData);
    // console.log(category.data);
    //读取数据： news.json
    let newsData =  fs.readFileSync('./data/news.json',{
        'encoding':'utf-8'
    });
    let news = JSON.parse(newsData);
    console.log(news.data);
    //处理返回的数据
    let res = category.data.map(item=>{
        let arr = news.data.filter(d=>d.category_id == item.id);
        // console.log(`${item.name}分类的数据`, arr);
        return {
            ...item,
            data:arr
        }
    });
    // console.log(res);
    //response.writeHead(statusCode, [statusMessage], [headers])
    //响应对象：statusCode状态码  statusMessage 状态信息（可选） headers属性对象或数组（可选）
    response.writeHead(200, 'oksuccess', {
        'Content-Type': 'text/html; charset=utf-8'
    });
    // response.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
    response.end(JSON.stringify(res));
    // response.end(encodeURIComponent(JSON.stringify(res)));
    
}
```
参考：<br/>
1. <a href="https://juejin.cn/post/7077951590157516837?searchId=20231230095654A7A09D61186815178383" target="_blank">[Nodejs中setHeader和writeHead的区别]</a> 
2. <a href="https://juejin.cn/post/7195770700106596412?searchId=20231230095654A7A09D61186815178383" target="_blank">[Nodejs中response对象]</a> 
3. 'Content-Type'的值说明：
> response.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'}); //html格式字符串 <br/>
> response.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'});//文本格式字符串 <br/>
> response.writeHead(200,{'Content-Type': 'image/jpg; charset=utf-8'});//该格式识别图片 <br/>
> response.writeHead(200,{'Content-Type': 'text/css; charset=utf-8'});//该格式识别css样式 <br/>
等等格式


/static/js/index.vue.js
```js
methods:{
    getData(){
        $.post('./index',function(res, status, xhr){
            console.log('res:',res);
            console.log('res类型:',typeof res);
            console.log('status:',status);
            console.log(decodeURIComponent(res));
            let data = JSON.parse(decodeURIComponent(res));
            console.log(data);
        });
    }
}
```