---
navbar: true
sidebar: auto
title: 案例：node.js+vue.js 渲染企业网站
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

### ① 引入vue.js，设置请求接口，vue2生命周期
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

### ③ 渲染到页面前进一步处理数据
> 我们发现服务器返回的数据，利用vue.js不好直接渲染，我们需要进一步处理数据，处理数据有两种方式：<br/>
> 1. 在服务器端对数据做进一步处理，处理完成之后，返回给浏览器
> 2. 对数据在浏览器客户端做处理<br/>
> 为了方便大家回顾之前学习的知识，我们采用在浏览器端对数据做处理，我们希望在vue.js渲染页面前，数据格式如下：
```json
[
    {
        "type": "nav",
        "data": [
            { "cid": 1, "name": "网站首页", "en_name": "home", "href": "/", "target": "_self"},
            { "cid": 2, "name": "关于我们", "en_name": "about us", "href": "/detail.html", "target": "_self"}
            //...
        ]
    },
    {
        "type": "banner",
        "data": [
            { "id": 2, "category_id": 7, "title": "你用电 我用心 共建光明", "title_name": "", "href": "/contact.html", "target": "_blank", 
            "poster": "/static/image/banner.jpg", "timestamp": 1702539117553, "description": "", "keyword": "", "content": "" } 
            //...
        ]
    },
    {
        "type": "main business",
        "data": [
            { "id": 3,"category_id":4,"title": "规划设计","title_name": "","href": "/business.html","target":"_blank","poster":"/static/image/mainbusiness01.png",
              "timestamp":1702539217553,"description":"供电工程前期现场勘察、供电方案设计","keyword":"","content":""}
            //...
        ],
        "name":"主营业务"
    }
    // ...
]
```
将返回的数据在浏览器客户端处理代码如下：
``` js
methods: {
    getData() {
        $.post('./index', (res, status, xhr)=> {
            // console.log('res:', res);
            // console.log('res类型:', typeof res);
            // console.log('status:', status);
            console.log('结果', JSON.parse(res));
            // this.pageData = JSON.parse(res);
            this.initData(JSON.parse(res));
        });
    },
    //处理服务器返回的数据
    initData(res){
        // console.log(res);
        let arr = [];
        //导航栏
        // console.log(res.filter(d=>d.show).map(item=>{
        //     delete item.data;
        //     console.log('剩余项',item);
        //     item.cid = item.id;
        //     delete item.id;
        //     return item;
        // }));
        let stringObj = JSON.stringify(res);
        let nav = {
            type : "nav",
            data: res.filter(d=>d.show).map(item=>{
                delete item.data;
                item.cid = item.id;
                delete item.id;
                return item;
            })
        }
        arr.push(nav);
        //banner广告图
        let banner = {
            type : "banner",
            data: res.filter(d=>d.en_name == 'banner').flatMap(item=>item.data)
        }
        arr.push(banner);
        //主营业务
        //克隆res的数据，虽然没有讲，我们可以采用之前学习的知识浅克隆一份
        // console.log('主营业务',res.filter(d=>d.en_name == 'main business'));//data中的数据已经在nav被删除了
        let resObj = JSON.parse(stringObj);
        let main_business_data = resObj.filter(d=>d.en_name == 'main business');
        // console.log('主营业务data',main_business_data[0]);
        let main_business = {
            type : "main business",
            ...main_business_data[0],
        }
        arr.push(main_business);
        //关于我们
        arr.push({
            type : "about us",
            ...resObj.filter(d=>d.en_name == 'about us')[0]
        })
        //工程案例
        arr.push({
            type : "engineering case",
            ...resObj.filter(d=>d.en_name == 'engineering case')[0]
        })
        //新闻中心
        arr.push({
            type : "news center",
            ...resObj.filter(d=>d.en_name == 'news center')[0]
        })
        //合作单位
        arr.push({
            type : "cooperative units",
            ...resObj.filter(d=>d.en_name == 'cooperative units')[0]
        })
        console.log('处理之后最终数据',arr);
        this.pageData = arr;
    }
}
``` 


### ④ 通过vue.js将数据渲染到页面上
> 导航栏
```html
<div v-for="(item,index) in pageData" :key="index">
...
<!-- 导航栏 -->
<div v-if="item.type == 'nav'">
...
<!-- 导航栏右边部分  导航内容部分 -->
...
<a :href="d.href" name="navigate" v-for="(d,i) in item.data"
    :class="i==0?'active':''">{{d.name}}</a>
...
</div>
...
</div>
```
> banner广告图
```html
<!-- banner广告图 -->
<div  v-if="item.type == 'banner'"
id="banner" class="flex justify-center position-relative">
...
<!-- 图片 -->
<div v-for="(d,i) in item.data" :key="i">
    <img :src="d.poster" style="width:100%;height: auto;" />
</div>
...
</div>
```
> 主营业务
<!-- 业务一 -->
```js
<!-- 英文 -->
<div class="flex justify-center mt-2">
    <span class="span-en">{{item.en_name.toUpperCase()}}</span>
</div>
<!-- 中文 -->
<div class="flex justify-center">
    <span class="span-ch ">{{item.name}}</span>
</div>
<div v-for="(d,i) in item.data" :key="i">
    <!-- 图片 -->
    <div>
        <img :src="d.poster" :alt="'业务'+(i+1)">
    </div>
    <!-- 业务描述 -->
    <div>
        <!-- 业务名称 -->
        <h3>{{d.title}}</h3>
        <!-- 描述 -->
        <p>{{d.description}}</p>
    </div>
</div>
```
> 关于我们
<!-- 公司简介 -->
```html
<div class="introduction flex justify-between"
v-for="(d,i) in item.data" :key="i">
    <!-- 简介部分 -->
    <div>
        <!-- 文字部分 -->
        <div>
            <!-- 文字 -->
            <p>
                {{d.description}}
            </p>
        </div>
        <!-- 按钮部分 -->
        <div style="width: 640px;height: 60px;">
            <a :href="d.href" target="_blank">MORE</a>
        </div>
    </div>
    <!-- 图片 -->
    <div>
        <img :src="d.poster">
    </div>
</div>
```
> 工程案例
```html
<!-- 案例内容 -->
<div class="case-div flex mt-5" style="flex-wrap: wrap;">
    <div class="list" v-for="(d,i) in item.data" :key="i">
        <!-- 图片 -->
        <div>
            <img :src="d.poster">
        </div>
        <!-- 标题 -->
        <div class="text-center mt-2">
            <a :href="d.href" target="_blank" class="text-no-underline
                text-dark lines-1 display-block"
                :title="d.title">{{d.title}}</a>
        </div>
    </div>
</div>
```
> 新闻中心
```js
//新闻中心
//时间戳转时间
let newsinfo = resObj.filter(d=>d.en_name == 'news center')[0];
// console.log(newsinfo.data[0].timestamp);
// console.log(new Date(newsinfo.data[0].timestamp).toLocaleString());
/*
let newstime = new Date(newsinfo.data[0].timestamp).toLocaleString().split(' ')[0];
console.log(newstime);
console.log(newstime.substring(0,newstime.lastIndexOf('/')));
console.log(newstime.substring(newstime.lastIndexOf('/') + 1));
*/
newsinfo.data.forEach(element => {
    console.log('新闻中心时间戳',element.timestamp);
    let newstime = new Date(element.timestamp).toLocaleString().split(' ')[0];
    element.month = newstime.substring(0,newstime.lastIndexOf('/'));
    element.day = newstime.substring(newstime.lastIndexOf('/') + 1);
});
arr.push({
    type : "news center",
    ...newsinfo
})
```
```html
<!-- 新闻内容 -->
<div class="flex justify-between mt-5">
    <!-- 图片 -->
    <div>
        <img :src="item.data[0].poster" style="width:
            560px;height: 360px;">
    </div>
    <!-- 列表 -->
    <div class="news-list flex justify-between flex-column"
        style="width: 575px;height: 360px;">
        <div class="flex" v-for="(d,i) in item.data" :key="i">
            <!-- 日期 -->
            <div style="width: 80px;flex-shrink: 0;" class="flex
                justify-start flex-column">
                <strong>{{d.day}}</strong>
                <span>{{d.month}}</span>
            </div>
            <!-- 内容 -->
            <div style="flex: auto;width: 0;">
                <!-- 标题 -->
                <h3 class="mt-0 lines-1">{{d.title}}</h3>
                <!-- 描述 -->
                <p class="lines-2 text-light-muted">{{d.description}}
                </p>
            </div>
        </div>
        
    </div>
</div>
```
> 合作单位
```html
<!-- 栏目内容 -->
<div class="flex justify-between mt-5">
    <img :src="d.poster"
    v-for="(d,i) in item.data" :key="i">
</div>
```
> 底部
> 底部补充数据 /app.js服务端
```js
//补充网站配置
let siteConfigData = fs.readFileSync('./data/siteConfig.json',{
    'encoding':'utf-8'
});
let siteConfig = JSON.parse(siteConfigData);
siteConfig.en_name = 'siteConfig';
// console.log('网站配置', siteConfig);
let res = category.data.map(item=>{
    return {
        ...item,
        data:news.data.filter(d=>d.category_id === item.id),
    };
});
res.push(siteConfig);
console.log(res);
```
> 浏览器端的处理 /static/js/index.vue.js
```js
//网站配置
arr.push({
    type : "siteConfig",
    ...resObj.filter(d=>d.en_name == 'siteConfig')[0]
})
```
```html
<!-- 底部 -->
<div v-if="item.type == 'siteConfig'"
id="page_footer" class="flex justify-center py-5">
    <div style="width: 1200px;"
        class="flex justify-between">
        <!-- 左边 -->
        <div class="flex align-center">
            <!-- logo -->
            <img src="./static/image/footer_logo.png" style="width:
                107px;height: 107px;">
            <!-- 地址信息 -->
            <div class="ml-2 text-light-muted">
                <p>{{item.corporate_name}}</p>
                <p>地址：{{item.address}}</p>
                <p>
                    copyRight <sup>&#174;</sup> {{item.corporate_short}} 版权所有
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;京备案号101110000-1号
                </p>
            </div>
        </div>
        <!-- 右边 -->
        <div class="flex align-center">
            <!-- 电话图标 -->
            <img src="./static/image/footer_tel.png" style="width:
                56px;height: 56px;">
            <!-- 电话 -->
            <div class="ml-2 text-light-light-muted">
                <p>业务咨询电话</p>
                <strong class="font-max">{{item.connect.tel}}</strong>
            </div>
        </div>
    </div>
</div>
```
> 新增一条信息排序处理（根据界面，以新闻中心为例，我们只需要读取最新3条信息，没必要把所有新闻都返回，以新闻中心为例，处理服务端）
> /app.js服务端
```js
//数据增多时候，展示最新数据，需要讲数据倒序
res.forEach(element => {
    if(element.data && element.data.length){
        // return element.data.reverse();
        //考虑到各个栏目需要的数据不一样，我们以新闻中心为例，返回最新三条即可
        //比如说新闻中心上传了100条数据没必要将100数据都返回，取三条即可，其他栏目一样，根据情况取数据量
        if(element.en_name == 'news center'){
            // console.log('新闻中心的数据',element.data.reverse().slice(0,3));
            return element.data = element.data.reverse().slice(0,3);
        }
        //其他不想处理的，就把数据倒序返回
        return element.data.reverse();
    }
});
// console.log(res);
```

## 三、最终代码
### 1. 服务端Node代码： /app.js文件代码
```js
let http = require('http');
let fs = require('fs');
let $url = require('url');
let querystring = require('querystring');
let crypto = require('crypto');
//自定义IV(16位)、key(密钥（32位的'aes-256-cbc'）（24位的'aes-192-cbc'）)
const secret = {
    iv: 'IloveYOU@520520!',// 初始化向量（iv）16位
    key: 'a123456789@!*&%bcdef@123456789&&', // 32 位秘钥密钥
}


const server = http.createServer((request, response) => {
    let url = request.url;
    if (request.method == 'GET') {
        if (url.indexOf('/api/') == -1) {
            if (url.indexOf('.json') > -1) {
                errorhtml(response)
            } else {
                fs.readFile(`./${url}`, (err, data) => {
                    if (err) {
                        errorhtml(response)
                    } else {
                        response.writeHead(200);
                        response.end(data);
                    }
                });
            }
        }
    } else if (request.method == 'POST') {
        if(url.startsWith('/index')){
            getIndex(response);
        }else{
            let result = [];
            request.on('data', buffer => {
                result.push(buffer);
            });
            request.on('end', () => {
                let data = Buffer.concat(result);
                response.writeHead(200);
                response.end('ok');
                //留言写入json文件
                let paths = {
                    dir: './data',
                    file: './data/message.json'
                    //   dir:'./Appdata',
                    //   file:'./Appdata/data.json'
                }
                addmessage(data, paths);
            });
        }
    }
});

server.listen(8888, '127.0.0.1', () => {
    console.log('服务器已启动');
});


const errorhtml = (response) => {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.writeHead(404);
    let msg = {
        "status": 404,
        "info": 'error',
        "data": 'not found'
    }
    response.end(JSON.stringify(msg));
}

//留言写入json文件
function addmessage(data, paths) {
    // console.log(querystring.parse(data.toString()));
    data = querystring.parse(data.toString());
    //对电话号码做一个加密
    // console.log(data);
    data.tel = aesEncrypt(data.tel, secret.key, secret.iv);
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
        readmessage(paths.file, data)
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
        writemessage(paths.file, o);

    }
}

//存在先读取一下
function readmessage(path, data) {
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
        writemessage(path, oldmessage);

    })
}

//写入留言
function writemessage(path, data) {
    fs.writeFile(path, JSON.stringify(data), (err) => {
        if (err) throw err;
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

//首页请求数据
function getIndex(response){
    // 读取数据：category.json
    let categoryData =  fs.readFileSync('./data/category.json',{
        'encoding':'utf-8'
    });
    let category = JSON.parse(categoryData);
    // console.log('分类数据', category.data);
    // 读取数据：news.json
    let newsData =  fs.readFileSync('./data/news.json',{
        'encoding':'utf-8'
    });
    let news = JSON.parse(newsData);
    // console.log('新闻内容数据', news.data);
    //补充网站配置siteConfig.json
    let siteConfigData =  fs.readFileSync('./data/siteConfig.json',{
        'encoding':'utf-8'
    });
    let siteConfig = JSON.parse(siteConfigData);
    console.log('网站配置数据', siteConfig);
    siteConfig.en_name = 'siteConfig';
    let res = category.data.map(item=>{
        return {
            ...item,
            data:news.data.filter(d=>d.category_id === item.id)
        };
    });
    res.push(siteConfig);
    //数据增多时候，展示最新数据，需要讲数据倒序
    res.forEach(element => {
        //考虑到各个栏目需要的数据不一样，我们以新闻中心为例，返回最新三条即可
        //比如说新闻中心上传了100条数据没必要将100数据都返回，取三条即可，其他栏目一样，根据情况取数据量
        if(element.data && element.data.length){
            if(element.en_name == 'news center'){
                return element.data = element.data.reverse().slice(0,3);
            }
            return element.data.reverse();
        }
        
    });
    /*
    response.writeHead(200);
    response.end(encodeURIComponent(JSON.stringify(res)));
    */
    //response.writeHead(statusCode, [statusMessage], [headers])
    //响应对象：statusCode状态码  statusMessage 状态信息（可选） headers属性对象或数组（可选）
    response.writeHead(200,{
        'Content-Type':'text/plain; charset=utf-8'
    });
    response.end(JSON.stringify(res));

}
```
### 2. 客户端(浏览器)代码： /static/js/index.vue.js代码
```js
var vm = new Vue({
    el: '#app',
    data: {
        title: '睿晨电网建设',
        pageData:[]
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            $.post('./index', (res, status, xhr)=>{
                // console.log('res:', res);
                // console.log('res类型:', typeof res);
                // console.log('status:', status);
                // console.log('结果', JSON.parse(res));
                this.initData(JSON.parse(res));
            });
            
        },
        //处理服务器返回的数据
        initData(res){
            let arr = [];
            let stringobj = JSON.stringify(res);
            //导航栏
            let nav = {
                type: "nav",
                data: res.filter(d=>d.show == true).map(item=>{
                    delete item.data;
                    item.cid = item.id;
                    delete item.id;
                    return item;
                })
            }
            arr.push(nav);
            //banner广告图
            let banner = {
                type: "banner",
                // data: res.filter(d=>d.en_name == 'banner')[0].data
                data: res.filter(d=>d.en_name == 'banner').flatMap(item=>item.data)
            }
            arr.push(banner);
            //主营业务
            let resObj = JSON.parse(stringobj);
            arr.push({
                type: "main business",
                ...resObj.filter(d=>d.en_name == 'main business')[0]
            });
            //关于我们
            arr.push({
                type : "about us",
                ...resObj.filter(d=>d.en_name == 'about us')[0]
            })
            //工程案例
            arr.push({
                type : "engineering case",
                ...resObj.filter(d=>d.en_name == 'engineering case')[0]
            })
            //新闻中心
            let newsinfo = resObj.filter(d=>d.en_name == 'news center')[0];
            // console.log('新闻中心newsinfo',newsinfo);
            // console.log('新闻中心',new Date(newsinfo.data[0].timestamp).toLocaleString().split(' ')[0]);
            // let newstime = new Date(newsinfo.data[0].timestamp).toLocaleString().split(' ')[0];
            // console.log(newstime);
            // console.log(newstime.substring(newstime.lastIndexOf('/') + 1));
            // console.log(newstime.substring(0,newstime.lastIndexOf('/')));
            newsinfo.data.forEach(element => {
                // console.log('新闻中心每一项',element);
                let newstime = new Date(element.timestamp).toLocaleString().split(' ')[0];
                element.day = newstime.substring(newstime.lastIndexOf('/') + 1);
                element.month = newstime.substring(0,newstime.lastIndexOf('/'));
            });
            // console.log('新闻中心newsinfo',newsinfo);
            arr.push({
                type : "news center",
                ...newsinfo
            })
            //合作单位
            arr.push({
                type : "cooperative units",
                ...resObj.filter(d=>d.en_name == 'cooperative units')[0]
            })

            //网站底部
            arr.push({
                type : "siteConfig",
                ...resObj.filter(d=>d.en_name == 'siteConfig')[0]
            })

            console.log('最终渲染到页面前的数据',arr);
            this.pageData = arr;
        }
    }
});
```
### 3. 网站首页代码： /index.html
```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>睿晨电网建设</title>
        <link rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
            />
        <link rel="stylesheet" href="./static/css/common.1.0.css">
        <link rel="stylesheet" href="./static/css/style.css">
        <script src="./static/js/jquery.1.11.3.min.js"></script>
        <script
            src="https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
        <script src="./static/js/vue.2.7.0.min.js"></script>
    </head>

    <body>
        <div id="app">
            <div v-for="(item,index) in pageData" :key="index">
                <!-- {{item.type}} ----{{item.data}} -->
                <!-- 导航栏 -->
                <div v-if="item.type == 'nav'"
                    class="flex justify-center " id="nav" data="123"
                    style="position: fixed;left: 0px;right: 0px;top:0px;z-index:1;background-color: #ffffff;">
                    <div style="width: 1200px;" class="flex justify-between
                        align-center">
                        <!-- 导航栏的左边 logo图 -->
                        <div class="left-logo flex align-center
                            animate__animated animate__swing">
                            <img src="./static/image/logo.png" />
                        </div>
                        <!-- 导航栏右边部分  导航内容部分 -->
                        <div class="right-div flex align-center ">
                            <a :href="d.href" name="navigate"
                                v-for="(d,i) in item.data" :key="i"
                            :class="i==0?'active':''">{{d.name}}</a>
                        </div>
                    </div>
                </div>
                <!-- banner广告图 -->
                <div v-if="item.type == 'banner'"
                    id="banner" class="flex justify-center position-relative"
                    style="margin-top: 100px;">
                    <div style="width: 100%;">
                        <!-- 图片 -->
                        <div v-for="(d,i) in item.data" :key="i">
                            <img :src="d.poster"
                                style="width:100%;height: auto;" />
                        </div>
                        <!-- 按钮部分 -->
                        <div class="banner-btn flex justify-center
                            position-absolute
                            left-0 right-0 bottom-0" style="height: 50px;">
                            <div class="active"></div>
                            <div></div>
                            <div></div>
                        </div>

                    </div>
                </div>
                <!-- 主营业务 -->
                <div v-if="item.type == 'main business'"
                    id="main_business" class="flex justify-center py-5">

                    <div style="width: 1200px;">
                        <!-- 业务名称 -->
                        <div>
                            <!-- 圆角 -->
                            <div class="flex justify-center">
                                <div class="div-rounded"></div>
                            </div>
                            <!-- 英文 -->
                            <div class="flex justify-center mt-2">
                                <span class="span-en">{{item.en_name.toUpperCase()}}</span>
                            </div>
                            <!-- 中文 -->
                            <div class="flex justify-center">
                                <span class="span-ch ">{{item.name}}</span>
                            </div>
                        </div>
                        <!-- 业务内容 -->
                        <div class="flex justify-between mt-5">
                            <!-- 业务一 -->
                            <div v-for="(d,i) in item.data" :key="i">
                                <!-- 图片 -->
                                <div>
                                    <img :src="d.poster"
                                        :alt="'业务'+(i+1)">
                                </div>
                                <!-- 业务描述 -->
                                <div>
                                    <!-- 业务名称 -->
                                    <h3>{{d.title}}</h3>
                                    <!-- 描述 -->
                                    <p>{{d.description}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- 关于我们 -->
                <div v-if="item.type == 'about us'"
                id="about_us" class="flex justify-center">
                    <div style="width: 1200px;margin-top: 100px;">
                        <!-- 栏目名称 -->
                        <div>
                            <!-- 英文 -->
                            <div>
                                <span class="span-en">{{item.en_name.toUpperCase()}}</span>
                            </div>
                            <!-- 中文 -->
                            <div>
                                <span class="span-ch">{{item.name}}</span>
                            </div>
                        </div>
                        <!-- 公司简介 -->
                        <div class="introduction flex justify-between"
                        v-for="(d,i) in item.data" :key="i">
                            <!-- 简介部分 -->
                            <div>
                                <!-- 文字部分 -->
                                <div>
                                    <!-- 文字 -->
                                    <p>
                                        {{d.description}}
                                    </p>
                                </div>
                                <!-- 按钮部分 -->
                                <div style="width: 640px;height: 60px;">
                                    <a :href="d.href" target="_blank">MORE</a>
                                </div>
                            </div>
                            <!-- 图片 -->
                            <div>
                                <img :src="d.poster">
                            </div>
                        </div>
                        <!-- 公司实力 -->
                        <div style="margin-top: 80px;height: 100px;"
                            class="strength
                            flex justify-between">
                            <div>
                                <strong>2012年</strong>
                                <span>公司成立于</span>
                            </div>
                            <div>
                                <strong>5000万</strong>
                                <span>注册资本</span>
                            </div>
                            <div>
                                <strong>100+</strong>
                                <span>在职员工</span>
                            </div>
                            <div>
                                <strong>3000+</strong>
                                <span>累积积累客户</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 工程案例 -->
                <div v-if="item.type == 'engineering case'"
                id="engineering_case" class="flex justify-center py-5">
                    <div style="width: 1200px;">
                        <!-- 案例名称 -->
                        <div>
                            <!-- 圆角 -->
                            <div class="flex justify-center">
                                <div class="div-rounded"></div>
                            </div>
                            <!-- 英文 -->
                            <div class="flex justify-center mt-2">
                                <span class="span-en">{{item.en_name.toUpperCase()}}</span>
                            </div>
                            <!-- 中文 -->
                            <div class="flex justify-center">
                                <span class="span-ch">{{item.name}}</span>
                            </div>
                        </div>
                        <!-- 案例内容 -->
                        <div class="case-div flex mt-5" style="flex-wrap:wrap;">
                            <div class="list" 
                            v-for="(d,i) in item.data" :key="i">
                                <!-- 图片 -->
                                <div>
                                    <img :src="d.poster">
                                </div>
                                <!-- 标题 -->
                                <div class="text-center mt-2">
                                    <a :href="d.href" target="_blank"
                                        class="text-no-underline
                                        text-dark lines-1 display-block"
                                        :title="d.title">{{d.title}}</a>
                                </div>
                            </div>
                            

                        </div>
                    </div>
                </div>
                <!-- 新闻中心 -->
                <div v-if="item.type == 'news center'"
                id="news_center" class="flex justify-center py-5">
                    <div style="width: 1200px;">
                        <!-- 新闻名称 -->
                        <div>
                            <!-- 圆角 -->
                            <div class="flex justify-center">
                                <div class="div-rounded"></div>
                            </div>
                            <!-- 英文 -->
                            <div class="flex justify-center mt-2">
                                <span class="span-en">{{item.en_name.toUpperCase()}}</span>
                            </div>
                            <!-- 中文 -->
                            <div class="flex justify-center">
                                <span class="span-ch">{{item.name}}</span>
                            </div>
                        </div>
                        <!-- 新闻内容 -->
                        <div class="flex justify-between mt-5">
                            <!-- 图片 -->
                            <div>
                                <img :src="item.data[0].poster"
                                    style="width:
                                    560px;height: 360px;">
                            </div>
                            <!-- 列表 -->
                            <div class="news-list flex justify-between
                                flex-column"
                                style="width: 575px;height: 360px;">
                                <div class="flex"
                                v-for="(d,i) in item.data" :key="i">
                                    <!-- 日期 -->
                                    <div style="width: 80px;flex-shrink: 0;"
                                        class="flex
                                        justify-start flex-column">
                                        <strong>{{d.day}}</strong>
                                        <span>{{d.month}}</span>
                                    </div>
                                    <!-- 内容 -->
                                    <div style="flex: auto;width: 0;">
                                        <!-- 标题 -->
                                        <h3 class="mt-0 lines-1">{{d.title}}</h3>
                                        <!-- 描述 -->
                                        <p class="lines-2 text-light-muted">{{d.description}}
                                        </p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 合作单位 -->
                <div v-if="item.type == 'cooperative units'"
                id="cooperation_unit" class="flex justify-center py-5">
                    <div style="width: 1200px;">
                        <!-- 栏目名称 -->
                        <div>
                            <!-- 圆角 -->
                            <div class="flex justify-center">
                                <div class="div-rounded"></div>
                            </div>
                            <!-- 英文 -->
                            <div class="flex justify-center mt-2">
                                <span class="span-en">{{item.en_name.toUpperCase()}}</span>
                            </div>
                            <!-- 中文 -->
                            <div class="flex justify-center">
                                <span class="span-ch">{{item.name}}</span>
                            </div>
                        </div>
                        <!-- 栏目内容 -->
                        <div class="flex justify-between mt-5">
                            <img :src="d.poster"
                            v-for="(d,i) in item.data" :key="i">
                        </div>
                    </div>
                </div>
                <!-- 底部 -->
                <div v-if="item.type == 'siteConfig'"
                id="page_footer" class="flex justify-center py-5">
                    <div style="width: 1200px;"
                        class="flex justify-between">
                        <!-- 左边 -->
                        <div class="flex align-center">
                            <!-- logo -->
                            <img :src="item.footer_logo" style="width:
                                107px;height: 107px;">
                            <!-- 地址信息 -->
                            <div class="ml-2 text-light-muted">
                                <p>{{item.corporate_name}}</p>
                                <p>地址：{{item.address}}</p>
                                <p>
                                    copyRight <sup>&#174;</sup> {{item.corporate_short}} 版权所有
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;京备案号101110000-1号
                                </p>
                            </div>
                        </div>
                        <!-- 右边 -->
                        <div class="flex align-center">
                            <!-- 电话图标 -->
                            <img src="./static/image/footer_tel.png" style="width:
                                56px;height: 56px;">
                            <!-- 电话 -->
                            <div class="ml-2 text-light-light-muted">
                                <p>业务咨询电话</p>
                                <strong class="font-max">{{item.connect.tel}}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script src="./static/js/index.vue.js"></script>
        <script src="./static/js/index.jquery.js"></script>
    </body>
</html>
```

## 四、点评总结
> 以上案例我们完成了网站首页的数据渲染，涉及的知识有： `(第一学期)html+css`、`(第二学期第1季)JavaScript基础[对象、数组、时间日期、json数据等等知识]`、`(第二学期第2季)[面向对象、jQuery、Ajax、Nodejs、Vuejs等等知识]` <br/>
按照这个逻辑，我们可以将网站的其他页面进行渲染，但还有一些问题没有解决：<br/>
1. 点击网站栏目的详情信息，如：“关于我们”指向detail.html，点击咨询中心（新闻中心）新闻列表，如何显示每个新闻信息？<br/>
是每点击一个新闻详情，就创建一个页面吗？那样会导致页面越来越多，更加不好管理。<br/>有同学说在后面加参数，如：`/news_detail.html?id=18`，获取参数在请求服务器返回，这种方式可行，但是服务器端请求的接口越来越多，代码会越来越复杂不好管理，服务器端就急需进行统一接口（路由）的管理`【需要我们解决】`；
2. 目前我们已经开发的页面，底部顶部都一样，很多页面除了内容部分不一样页面结构都一样，能不能把一样的都提出来单独管理，简化页面`【需要我们解决】`；
3. 页面不支持移动端查看，比如手机无法预览`【需要我们解决】`；<br/><br/>
我们该如何解决上面提出的问题呢？<br/><br/>这些问题我们将在下一季度课程给大家讲解，本季度作为JavaScript的进阶课程，以及关于JavaScript的框架如 `vue.js`、JavaScript的工具库如 `jQuery`、 作为服务器端的基础课程 `Nodejs` ，这些知识至关重要，我们将会从下一季度课程开始，偏向实战课程类型，而在学习实战项目之前，我们当前学习的第一学期、第二学期第1季、第二学期第2季的知识，将是我们往后面学习的基石，所以大家不要慌，一步一步来进行学习，先把这些基础理清楚。