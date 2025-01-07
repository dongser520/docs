---
navbar: true
sidebar: auto
title: 后端api接口开发代码
---

## 一、移动端首页api接口
### ① 控制器 `app/controller/api/template01/wap.js`
```js
'use strict';

const fs = require('node:fs');
//json文件
let paths = {
    dir: './data',
    file: './data/wap_uTabbar.json'
    //   dir:'./Appdata',
    //   file:'./Appdata/data.json'
}

const Controller = require('egg').Controller;

class WapController extends Controller {
    //首页
    async index() {
        const { ctx, app } = this;
        let arr = [];
        //swiper广告图
        arr.push({ type: 'swiper', data: await ctx.service.news.getNewsByCategoryId(13, 3) });
        // 消息滚动 -- 比如：读取最新发布的信息
        arr.push({ type: 'notices', data: await this.new_news(2) });
        //主要栏目
        arr.push({ type: 'items', data: await this.items() });
        //横向滚动
        arr.push({ type: 'uScrollList', name: '合作单位', data: await ctx.service.news.getNewsByCategoryId(10, 4) });
        //卡片列表
        arr.push({ type: 'uniCard', name: '资讯中心', data: await ctx.service.news.getNewsByCategoryId(6, 5) });
        //底部导航
        arr.push({ type: 'uTabbar', data: await this.tabbar()});
        this.ctx.body = arr;
    }
    //读取最新消息
    async new_news(limit = 4) {
        const { ctx, app } = this;
        const res = await ctx.model.News.findAll({
            where: {
                status: 1,
            },
            order: [
                ['id', 'DESC'],
            ],
            limit: limit,
            //关联查询
            include: [
                {
                    model: app.model.Category,// 需要查询的模型
                    attributes: ['id', 'name', 'enname'],// 查询的字段 
                }
            ],
        });
        return res;
    }
    //主要栏目 -- 读分类表
    async items(limit = 6) {
        const { ctx, app } = this;
        const res = await ctx.model.Category.findAll({
            where: {
                wap_isnav: 1,
            },
            order: [
                ['order', 'asc'],
                ['id', 'asc'],
            ],
            limit: limit,
        });
        return res;
    }
    // 底部导航--读json
    async tabbar() {
        //先判断是否存在这个json文件或者文件夹
        if (!fs.existsSync(paths.file)) {
            return '';
        } else {
            let data = fs.readFileSync(paths.file, {
                encoding: 'utf-8'
            });
            // console.log(JSON.parse(data));
            return JSON.parse(data).data;
        }
    }
}

module.exports = WapController;

```

### ② 路由 `app/router/api/template01/router.js`
```js
    ...
    //移动端
    router.get('/api/wap/index', controller.api.template01.wap.index);
```

### ③ postman测试
测试路径：`http://127.0.0.1:7001/api/wap/index` 返回结果：
```js
[
    {
        "type": "swiper",
        "data": [
            {
                "timestamp": 1716347848000,
                "create_time": "2024-05-22 11:17:28",
                "id": 4,
                "category_id": 13,
                "name": "规划设计",
                "enname": "",
                "status": 1,
                "order": 1,
                "description": "供电工程前期现场勘察、供电方案设计",
                "keywords": "",
                "maincontent": "",
                "attachment": "/public/uploads/Diy/adminImg/20240522/1716347846723_46195408.png",
                "lookcount": 0,
                "manager_id": 5,
                "update_time": "2024-05-23T04:41:35.000Z",
                "categoryId": 13,
                "managerId": 5,
                "category": {
                    "id": 13,
                    "name": "主营业务首页板块展示",
                    "enname": ""
                }
            },
            {
                "timestamp": 1716347905000,
                "create_time": "2024-05-22 11:18:25",
                "id": 5,
                "category_id": 13,
                "name": "施工建设",
                "enname": "",
                "status": 1,
                "order": 2,
                "description": "电力工程预算造价、承建施工",
                "keywords": "",
                "maincontent": "",
                "attachment": "/public/uploads/Diy/adminImg/20240522/1716347904014_12078316.png",
                "lookcount": 0,
                "manager_id": 5,
                "update_time": "2024-05-23T04:41:47.000Z",
                "categoryId": 13,
                "managerId": 5,
                "category": {
                    "id": 13,
                    "name": "主营业务首页板块展示",
                    "enname": ""
                }
            },
            {
                "timestamp": 1716347932000,
                "create_time": "2024-05-22 11:18:52",
                "id": 6,
                "category_id": 13,
                "name": "电力设备销售",
                "enname": "",
                "status": 1,
                "order": 50,
                "description": "涵盖高低压等各类电力设备",
                "keywords": "",
                "maincontent": "",
                "attachment": "/public/uploads/Diy/adminImg/20240522/1716347930629_87275382.png",
                "lookcount": 0,
                "manager_id": 5,
                "update_time": "2024-05-22T03:18:52.000Z",
                "categoryId": 13,
                "managerId": 5,
                "category": {
                    "id": 13,
                    "name": "主营业务首页板块展示",
                    "enname": ""
                }
            }
        ]
    },
    {
        "type": "notices",
        "data": [
            {
                "timestamp": 1735190017000,
                "create_time": "2024-12-26 13:13:37",
                "id": 24,
                "category_id": 6,
                "name": "水电站如何做到精准防汛？请看黄河、长江骨干水库如何做到的",
                "enname": "",
                "status": 1,
                "order": 50,
                "description": "为确保骨干水库持续高水位运用期间的防汛安全，水利部等相关各级部门密切关注汛情，做好防汛会商、精准调度等工作，充分发挥水库防洪和经济效益。",
                "keywords": "",
                "maincontent": "<p>为确保骨干水库持续高水位运用期间的防汛安全，水利部等相关各级部门密切关注汛情，做好防汛会商、精准调度等工作，充分发挥水库防洪和经济效益。</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"/public/uploads/Diy/adminImg/20241211/1733907139668_76380519.jpg\"></p>\r\n<p>01</p>\r\n<p>秋汛来水较往年偏多，摸清5省坝型分布</p>\r\n<p>今年黄河、长江秋汛累计来水量较常年同期偏多。采访中，记者听到最多的是&ldquo;水量级大&rdquo;&ldquo;延续时间长&rdquo;&ldquo;水库快速上涨&rdquo;&ldquo;防汛形势严峻&rdquo;&ldquo;调度难度大&rdquo;&ldquo;用绣花功夫算&amp;#39;水账&amp;#39;&rdquo;。</p>\r\n<p>数据显示，8月下旬以来，黄河中下游累积面雨量389毫米，较常年同期118毫米偏多2.3倍；长江支流汉江上游降水量520毫米，较常年偏多1.5倍；丹江口水库秋汛累计来水量约340亿立方米，较常年同期偏多约4倍。</p>\r\n<p>&ldquo;受华西秋雨持续影响，黄河中下游干支流发生严重秋汛，洪水场次之多、过程之长、量级之大极为罕见。伊洛河来水为多年均值5.7倍，沁河为多年均值5.9倍，渭河为多年均值2倍，受降雨影响，支流渭河、伊洛河、沁河均发生有实测资料以来同期最大洪水。&rdquo;黄委水文局副局长袁东良向记者介绍。</p>\r\n<p>小浪底管理中心水量调度处处长李鹏对记者表示：&ldquo;小浪底水库持续拦洪，拦截第1号洪水的同时还要拦截第3号洪水，防汛形势十分严峻。不过，截至目前，小浪底水库运行平稳，库周无大的地质灾害发生。&rdquo;</p>\r\n<p>目前，水利部已全面摸清晋、陕、甘、宁、豫5省区降雨区135个县区1.3万座的大中型淤地坝分布，其中大型坝4300座，中型坝8924座；包括下游有人的淤地坝211座。水利部黄河水利委员会已督促各地全面摸清摸准病险水库分布及数量以及山洪沟分布、危险区村庄和人员情况，逐库逐沟落实防御措施。</p>\r\n<p>记者采访获悉，河南、山西省防指已做好小浪底水库274米以下、故县水库544.2米以下、河口村水库280米以下高水位运用准备。&ldquo;目前，黄河下游河南、山东段约有3.3万人投入防洪工程巡查观测。在黄河下游，各地全面落实以行政首长负责制为核心的各项防汛抗旱责任制，并按照防御大洪水运行工作机制到岗到位，按专业人员和群防队伍1：3的比例落实人员。&rdquo;黄河水利委员会防御局副局长张希玉介绍。</p>\r\n<p>02</p>\r\n<p>调度下足&ldquo;绣花&rdquo;功夫，联合调度统筹&ldquo;水账&rdquo;</p>\r\n<p>采访中，业内人士均提到，防秋汛中下足&ldquo;绣花&rdquo;功夫，&ldquo;水账&rdquo;按照厘米计算，充分挖掘水库库容。</p>\r\n<p>河南郑州花园口水文站，是黄河下游汛情&ldquo;晴雨表&rdquo;。花园口水文站流量一旦超过4800立方米每秒，下游堤防、滩区防守压力就会徒增。为此，上下游同时&ldquo;做减法&rdquo;。小浪底水库拦洪削峰，支流上的陆浑、故县水库压减下泄流量。此外，济平干渠、南水北调穿黄工程等实施分泄。&ldquo;实施长河段、干支流水库群联合调度，最大限度减轻下游漫滩和防守压力。黄委组织工作专班，下足绣花功夫，以每半小时50立方米每秒为调度单元，滚动修订水库调度方案，精准调控花园口站流量。&rdquo;张希玉表示。</p>\r\n<p>小浪底管理中心开发公司运行部副部长鲁锋向记者直言，&ldquo;以往调度均是几百流量调度，今年精准到50立方米每秒调度，水电机组运行管理难度加大，机组随时需要按照指令下泄流量。&rdquo;</p>\r\n<p>除了细微级别精确调度外，联合统筹&ldquo;水账&rdquo;也是今年防秋汛的重要抓手之一。据悉，由黄河水利委员会直接调度参与调控的水库共7座，其中对黄河下游防洪控制断面-花园口水文断面通过流量起决定作用的5座水库，分别是干流的三门峡水库、小浪底水库，支流伊洛河右支伊河上的陆浑水库和左支洛河上的故县水库、沁河上的河口村水库。支流的三个水库管好自己一亩三分地的同时，实行错峰调度，尽量为小浪底水库尽可能泄放流量留出空间。</p>\r\n<p>长江委防御局副局长郑静向记者介绍，科学调度汉江流域水库群，有效应对了汉江7次10000立方米每秒以上的丹江口水库入库洪水过程，极大减轻了汉江中下游地区的防洪压力。&ldquo;若没有水库群拦蓄，汉江中下游将全线超保，部分河段洪峰水位将超堤顶高程。通过水库群拦洪、削峰、错峰，有效控制汉江中下游水位，防洪效益十分显著。&rdquo;</p>\r\n<p>03</p>\r\n<p>改善供电质量，提升经济效益</p>\r\n<p>丰富来水使水库产生显著的发电效益。汉江集团公司总经理何晓东对记者表示，丹江口水电站是湖北电网的主力调频电站，承担了湖北电网重要的调峰、调相和事故备用的任务，对保证电网的安全运行、改善供电质量和提高电网的经济效益起到重要作用。</p>\r\n<p>记者从丹江口水电站获悉，丹江电厂利用来水较多时机多发满发，截至10月7日，丹江电厂累计发电量41.85亿千瓦时。</p>\r\n<p>预计2021年发电量约49.5亿千瓦时，超多年平均发电量15.7亿千瓦时，为南水北调中线一期工程通水以来最大年发电量，相当于替代标准煤153万吨，减排二氧化碳400万吨、二氧化硫1.3万吨、氮氧化物1.13万吨。</p>\r\n<p>&nbsp;</p>",
                "attachment": "/public/uploads/Diy/adminImg/20241211/1733907151973_44561582.jpg",
                "lookcount": 0,
                "manager_id": 5,
                "update_time": "2024-12-26T05:13:37.000Z",
                "categoryId": 6,
                "managerId": 5,
                "category": {
                    "id": 6,
                    "name": "资讯中心",
                    "enname": "NEWS CNETER"
                }
            },
            {
                "timestamp": 1735189912000,
                "create_time": "2024-12-26 13:11:52",
                "id": 23,
                "category_id": 6,
                "name": "能源局：2022年乡村振兴定点帮扶和对口支援工作要点 持续推进农村电网薄弱地区建设",
                "enname": "",
                "status": 1,
                "order": 50,
                "description": "近日国家能源局印发2022年乡村振兴定点帮扶和对口支援工作要点的通知。文件提出，持续推进农村电网薄弱地区建设，优化城乡网架结构，提升农村电网供电保障水平，增强农村分布式可再生能源接入能力。加快推进通渭县平襄110千伏变电站等重点工程建设。推动通渭、清水县配电网建设示范县、“获得电力”服务水平样板工程建设，巩固提升信丰县全国小康用电示范县成果。",
                "keywords": "",
                "maincontent": "<p>近日国家能源局印发2022年乡村振兴定点帮扶和对口支援工作要点的通知。文件提出，持续推进农村电网薄弱地区建设，优化城乡网架结构，提升农村电网供电保障水平，增强农村分布式可再生能源接入能力。加快推进通渭县平襄110千伏变电站等重点工程建设。推动通渭、清水县配电网建设示范县、&ldquo;获得电力&rdquo;服务水平样板工程建设，巩固提升信丰县全国小康用电示范县成果。</p>\r\n<p style=\"text-align: center;\"><img src=\"/public/uploads/Diy/adminImg/20241211/1733906801435_79206487.png\" width=\"657\" height=\"438\"></p>\r\n<p>一、协调推动基础设施建设</p>\r\n<p>（一）持续提升供电保障能力。持续推进农村电网薄弱地区建设，优化城乡网架结构，提升农村电网供电保障水平，增强农村分布式可再生能源接入能力。加快推进通渭县平襄110千伏变电站等重点工程建设。推动通渭、清水县配电网建设示范县、&ldquo;获得电力&rdquo;服务水平样板工程建设，巩固提升信丰县全国小康用电示范县成果。〔新能源司、电力司、监管司，华中能源监管局、甘肃能源监管办〕</p>\r\n<p>（二）协调推动天然气项目建设。支持通渭、清水两县与管网企业开展合作，指导建设输气支线管道项目。推动西气东输管道天然气信丰分输站开口，2022年底前通气供气。〔油气司〕</p>\r\n<p>（三）指导信丰电厂建设运行。推动信丰电厂一期项目2台机组2022年上半年按期投产、安全稳定运行；协助信丰电厂增加煤炭来源，稳定煤炭供应。结合全国和江西省电力供需变化趋势，指导信丰县开展信丰电厂二期扩建项目前期研究。指导信丰电厂建设资源综合利用项目。〔科技司、电力司、煤炭司，华中能源监管局〕</p>\r\n<p>（四）推动清陇高速公路规划建设。商请有关部门支持清水县公路建设，将清水县至陕西陇县高速公路项目纳入相关交通规划。〔规划司牵头〕</p>\r\n<p>二、培育壮大可再生能源产业</p>\r\n<p>（五）风电项目建设。加快通渭县寺子川10万千瓦风电项目、清水县黄门5万千瓦风储一体化电站项目建设，力争2022年底前建成并网运行。指导三县开展新建风电开发论证。〔新能源司、电力司、安全司〕</p>\r\n<p>（六）光伏项目建设。积极推动通渭马营镇10万千瓦集中式光伏电站、清水黄门10万千瓦农光储一体化电站项目建设，力争2022年底前建成并网运行。支持三县分布式光伏项目有序建设及并网。指导通渭县建设孟河村光储微电网试点项目。〔新能源司、电力司，华中能源监管局、甘肃能源监管办〕</p>\r\n<p>（七）抽水蓄能项目规划建设。指导清水县开展黄龙抽水蓄能电站项目前期工作。在条件成熟的前提下，将信丰抽水蓄能项目滚动列入&ldquo;十四五&rdquo;重点实施项目库。〔新能源司〕</p>\r\n<p>（八）生物质能开发利用。鼓励通渭、清水县在生物质资源丰富的中心村、易地扶贫搬迁安置点开展生物质供暖试点，探索生物质资源开发利用新模式。〔新能源司〕</p>\r\n<p>（九）农村清洁能源创新利用。协调支持通渭多能互补帮扶示范项目、清水陇东南清洁能源示范区项目建设。指导三县有条件的易地搬迁新村、中心村、大型农村社区创新生产生活用能方式，提升农村可再生能源利用水平。〔新能源司〕</p>\r\n<p>三、加大社会帮扶力度</p>\r\n<p>（十）动员社会帮扶。协调动员能源企业、公益组织等社会力量提供无偿帮扶资金和物资，支持三县特色产业发展和基础设施建设。〔规划司牵头，局内各单位参与〕</p>\r\n<p>（十一）开展就业帮扶。协调在通渭、清水县施工的能源企业优先在本地招用劳动力，开展必要的技能培训。协调企业优先招聘三县应届大学生，继续开展核苗计划。〔规划司、核电司，核电中心，局内各单位参与〕</p>\r\n<p>（十二）深化消费帮扶。组织局内党员干部积极购买三县特色农产品，各单位工会、食堂在购买慰问品、食材采购时优先选用三县产品。协调企业、社会组织购买三县产品，助力强化自有电商品牌，优化能源行业消费帮扶合作平台，进一步拓展销售渠道。〔各单位，机关工会〕</p>\r\n<p>四、强化党建和人才帮扶</p>\r\n<p>（十三）持续开展党支部结对共建。相关基层党组织要加强与结对村党支部的联系互动，重点从文化振兴、生态振兴、组织振兴方面探索创新共建形式，帮助提升组织力和党建水平。〔机关党委（人事司），有结对任务的单位〕</p>\r\n<p>（十四）支持三县用好红色教育资源。协助三县宣传红色历史和红色旅游资源，组织局党员干部开展相关学习教育和主题党日活动。〔机关党委（人事司），各单位〕</p>\r\n<p>（十五）加强挂职干部管理。做好挂职干部到期轮换工作，加强挂职干部日常管理，关心挂职干部生活，及时帮助解决工作和生活中的困难。视工作实际需要，可考虑协调安排三县干部在能源局系统挂职。〔机关党委（人事司）、规划司，派出挂职干部单位〕</p>\r\n<p>（十六）组织专题培训。组织专家、学者赴三县授课，组织光伏、电力等运维管理及安全生产培训，根据工作需要，适时组织基层干部、致富带头人开展乡村振兴培训。〔机关党委（人事司）、规划司、安全司，华中能源监管局，甘肃能源监管办，相关单位〕</p>\r\n<p>（十七）协调加强产学研合作。指导通渭县与中国农业科学院饲料研究所合作建设西北草畜与中药材产业试验站，开展光伏农业、技术推广、专家库建设等工作。〔规划司〕</p>\r\n<p>（十八）开展教育帮扶。组织全局干部捐助低收入家庭学生，组织青年干部开展支教活动。协调企业、公益组织和爱心人士开展各类助学活动。〔机关团委，各单位〕</p>\r\n<p>五、工作要求</p>\r\n<p>（十九）着力提升帮扶成效。各单位要持续推进既有长效帮扶举措，定期了解帮扶成效，并根据乡村振兴新形势的需要，围绕提高脱贫户和边缘户自我发展能力，调整帮扶方式或开展新的帮扶项目，确保帮扶工作力度不减。</p>\r\n<p>（二十）发挥政策试点作用。各单位要结合能源行业发展需要，将三县作为政策创新突破的试验田，组织建设试点工程，通过挂职干部一线摸排，及时发现问题，为政策制订提供思路和案例。</p>\r\n<p>（二十一）拓展乡村振兴渠道。按照中央关于全面推进乡村振兴的决策部署，在发挥能源行业优势，继续帮助三县产业、人才、组织振兴的同时，各单位要在改善农村人居环境、加强农村精神文明建设方面拓展工作渠道、加大工作力度，助力实现生态振兴、文化振兴。</p>",
                "attachment": "/public/uploads/Diy/adminImg/20241211/1733906766532_20801045.png",
                "lookcount": 0,
                "manager_id": 5,
                "update_time": "2024-12-26T05:11:52.000Z",
                "categoryId": 6,
                "managerId": 5,
                "category": {
                    "id": 6,
                    "name": "资讯中心",
                    "enname": "NEWS CNETER"
                }
            }
        ]
    },
    {
        "type": "items",
        "data": [
            {
                "create_time": "2024-05-22 10:57:38",
                "id": 5,
                "pid": 0,
                "name": "关于我们",
                "enname": "ABOUT US",
                "status": 1,
                "description": "",
                "order": 50,
                "isnav": 1,
                "categoryurl": "/api/template/01/id/1/cid/5?pageType=detail&ortherType=aboutus",
                "wap_icon": "",
                "wap_url": "",
                "wap_isnav": 1,
                "update_time": "2024-12-27T07:55:25.000Z"
            },
            {
                "create_time": "2024-05-22 10:58:26",
                "id": 6,
                "pid": 0,
                "name": "资讯中心",
                "enname": "NEWS CNETER",
                "status": 1,
                "description": "",
                "order": 50,
                "isnav": 1,
                "categoryurl": "",
                "wap_icon": "",
                "wap_url": "",
                "wap_isnav": 1,
                "update_time": "2024-12-27T07:58:54.000Z"
            },
            {
                "create_time": "2024-05-22 10:58:45",
                "id": 7,
                "pid": 0,
                "name": "主营业务",
                "enname": "MAIN BUSINESS",
                "status": 1,
                "description": "",
                "order": 50,
                "isnav": 1,
                "categoryurl": "",
                "wap_icon": "",
                "wap_url": "",
                "wap_isnav": 1,
                "update_time": "2024-12-27T07:58:57.000Z"
            },
            {
                "create_time": "2024-05-22 10:59:06",
                "id": 8,
                "pid": 0,
                "name": "工程案例",
                "enname": "ENGINEERING CASE",
                "status": 1,
                "description": "",
                "order": 50,
                "isnav": 1,
                "categoryurl": "/api/template/01/cid/8?pageType=piclist",
                "wap_icon": "",
                "wap_url": "",
                "wap_isnav": 1,
                "update_time": "2024-12-27T07:59:00.000Z"
            },
            {
                "create_time": "2024-05-22 11:02:21",
                "id": 10,
                "pid": 0,
                "name": "合作单位",
                "enname": "COOPERATION UNIT",
                "status": 1,
                "description": "",
                "order": 50,
                "isnav": 0,
                "categoryurl": "",
                "wap_icon": "",
                "wap_url": "",
                "wap_isnav": 1,
                "update_time": "2024-12-27T08:00:08.000Z"
            },
            {
                "create_time": "2024-05-22 10:59:23",
                "id": 9,
                "pid": 0,
                "name": "联系我们",
                "enname": "CONTACT US",
                "status": 1,
                "description": "",
                "order": 51,
                "isnav": 1,
                "categoryurl": "/api/template/01/cid/9?ortherType=contactus",
                "wap_icon": "",
                "wap_url": "",
                "wap_isnav": 1,
                "update_time": "2025-01-04T07:22:00.000Z"
            }
        ]
    },
    {
        "type": "uScrollList",
        "name": "合作单位",
        "data": [
            {
                "timestamp": 1716348528000,
                "create_time": "2024-05-22 11:28:48",
                "id": 10,
                "category_id": 10,
                "name": "国家电网",
                "enname": "",
                "status": 1,
                "order": 1,
                "description": "国家电网",
                "keywords": "",
                "maincontent": "",
                "attachment": "/public/uploads/Diy/adminImg/20240522/1716348525825_58461494.jpg",
                "lookcount": 0,
                "manager_id": 5,
                "update_time": "2024-05-22T08:26:53.000Z",
                "categoryId": 10,
                "managerId": 5,
                "category": {
                    "id": 10,
                    "name": "合作单位",
                    "enname": "COOPERATION UNIT"
                }
            },
            {
                "timestamp": 1716352033000,
                "create_time": "2024-05-22 12:27:13",
                "id": 11,
                "category_id": 10,
                "name": "中国电建",
                "enname": "",
                "status": 1,
                "order": 50,
                "description": "中国电建",
                "keywords": "中国电建",
                "maincontent": "",
                "attachment": "/public/uploads/Diy/adminImg/20240522/1716352031507_33396311.jpg",
                "lookcount": 0,
                "manager_id": 5,
                "update_time": "2024-05-22T04:27:13.000Z",
                "categoryId": 10,
                "managerId": 5,
                "category": {
                    "id": 10,
                    "name": "合作单位",
                    "enname": "COOPERATION UNIT"
                }
            },
            {
                "timestamp": 1716366968000,
                "create_time": "2024-05-22 16:36:08",
                "id": 12,
                "category_id": 10,
                "name": "中国中铁",
                "enname": "",
                "status": 1,
                "order": 51,
                "description": "中国中铁",
                "keywords": "中国中铁",
                "maincontent": "",
                "attachment": "/public/uploads/Diy/adminImg/20240522/1716366959023_594648.jpg",
                "lookcount": 0,
                "manager_id": 5,
                "update_time": "2024-05-22T08:36:08.000Z",
                "categoryId": 10,
                "managerId": 5,
                "category": {
                    "id": 10,
                    "name": "合作单位",
                    "enname": "COOPERATION UNIT"
                }
            },
            {
                "timestamp": 1716367000000,
                "create_time": "2024-05-22 16:36:40",
                "id": 13,
                "category_id": 10,
                "name": "华中科技大学",
                "enname": "",
                "status": 1,
                "order": 52,
                "description": "华中科技大学",
                "keywords": "华中科技大学",
                "maincontent": "",
                "attachment": "/public/uploads/Diy/adminImg/20240522/1716366993563_45596575.jpg",
                "lookcount": 0,
                "manager_id": 5,
                "update_time": "2024-05-22T08:36:40.000Z",
                "categoryId": 10,
                "managerId": 5,
                "category": {
                    "id": 10,
                    "name": "合作单位",
                    "enname": "COOPERATION UNIT"
                }
            }
        ]
    },
    {
        "type": "uniCard",
        "name": "资讯中心",
        "data": [
            {
                "timestamp": 1716348400000,
                "create_time": "2024-05-22 11:26:40",
                "id": 9,
                "category_id": 6,
                "name": "我司顺利通过“质量、安全及职业健康安全管理体系我体系我体系我体系我",
                "enname": "",
                "status": 1,
                "order": 49,
                "description": "2022年8月2日到3日中电联（北京）认证中心委派2位审核专家对我司质量、安全及职业健康安全管理体系进行审核 并顺利通过2022年8月2日到3日中电联（北京）认证中心委派2位审核专家对我司质量、安全及职业健康安全管理体系进行审核 并顺利通过",
                "keywords": "",
                "maincontent": "<p>我司顺利通过&ldquo;质量、安全及职业健康安全管理体系我体系我体系我体系我我司顺利通过&ldquo;质量、安全及职业健康安全管理体系我体系我体系我体系我我司顺利通过&ldquo;质量、安全及职业健康安全管理体系我体系我体系我体系我</p>",
                "attachment": "/public/uploads/Diy/adminImg/20240522/1716348398630_4668980.jpg",
                "lookcount": 0,
                "manager_id": 5,
                "update_time": "2024-05-23T02:02:07.000Z",
                "categoryId": 6,
                "managerId": 5,
                "category": {
                    "id": 6,
                    "name": "资讯中心",
                    "enname": "NEWS CNETER"
                }
            },
            {
                "timestamp": 1735190017000,
                "create_time": "2024-12-26 13:13:37",
                "id": 24,
                "category_id": 6,
                "name": "水电站如何做到精准防汛？请看黄河、长江骨干水库如何做到的",
                "enname": "",
                "status": 1,
                "order": 50,
                "description": "为确保骨干水库持续高水位运用期间的防汛安全，水利部等相关各级部门密切关注汛情，做好防汛会商、精准调度等工作，充分发挥水库防洪和经济效益。",
                "keywords": "",
                "maincontent": "<p>为确保骨干水库持续高水位运用期间的防汛安全，水利部等相关各级部门密切关注汛情，做好防汛会商、精准调度等工作，充分发挥水库防洪和经济效益。</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"/public/uploads/Diy/adminImg/20241211/1733907139668_76380519.jpg\"></p>\r\n<p>01</p>\r\n<p>秋汛来水较往年偏多，摸清5省坝型分布</p>\r\n<p>今年黄河、长江秋汛累计来水量较常年同期偏多。采访中，记者听到最多的是&ldquo;水量级大&rdquo;&ldquo;延续时间长&rdquo;&ldquo;水库快速上涨&rdquo;&ldquo;防汛形势严峻&rdquo;&ldquo;调度难度大&rdquo;&ldquo;用绣花功夫算&amp;#39;水账&amp;#39;&rdquo;。</p>\r\n<p>数据显示，8月下旬以来，黄河中下游累积面雨量389毫米，较常年同期118毫米偏多2.3倍；长江支流汉江上游降水量520毫米，较常年偏多1.5倍；丹江口水库秋汛累计来水量约340亿立方米，较常年同期偏多约4倍。</p>\r\n<p>&ldquo;受华西秋雨持续影响，黄河中下游干支流发生严重秋汛，洪水场次之多、过程之长、量级之大极为罕见。伊洛河来水为多年均值5.7倍，沁河为多年均值5.9倍，渭河为多年均值2倍，受降雨影响，支流渭河、伊洛河、沁河均发生有实测资料以来同期最大洪水。&rdquo;黄委水文局副局长袁东良向记者介绍。</p>\r\n<p>小浪底管理中心水量调度处处长李鹏对记者表示：&ldquo;小浪底水库持续拦洪，拦截第1号洪水的同时还要拦截第3号洪水，防汛形势十分严峻。不过，截至目前，小浪底水库运行平稳，库周无大的地质灾害发生。&rdquo;</p>\r\n<p>目前，水利部已全面摸清晋、陕、甘、宁、豫5省区降雨区135个县区1.3万座的大中型淤地坝分布，其中大型坝4300座，中型坝8924座；包括下游有人的淤地坝211座。水利部黄河水利委员会已督促各地全面摸清摸准病险水库分布及数量以及山洪沟分布、危险区村庄和人员情况，逐库逐沟落实防御措施。</p>\r\n<p>记者采访获悉，河南、山西省防指已做好小浪底水库274米以下、故县水库544.2米以下、河口村水库280米以下高水位运用准备。&ldquo;目前，黄河下游河南、山东段约有3.3万人投入防洪工程巡查观测。在黄河下游，各地全面落实以行政首长负责制为核心的各项防汛抗旱责任制，并按照防御大洪水运行工作机制到岗到位，按专业人员和群防队伍1：3的比例落实人员。&rdquo;黄河水利委员会防御局副局长张希玉介绍。</p>\r\n<p>02</p>\r\n<p>调度下足&ldquo;绣花&rdquo;功夫，联合调度统筹&ldquo;水账&rdquo;</p>\r\n<p>采访中，业内人士均提到，防秋汛中下足&ldquo;绣花&rdquo;功夫，&ldquo;水账&rdquo;按照厘米计算，充分挖掘水库库容。</p>\r\n<p>河南郑州花园口水文站，是黄河下游汛情&ldquo;晴雨表&rdquo;。花园口水文站流量一旦超过4800立方米每秒，下游堤防、滩区防守压力就会徒增。为此，上下游同时&ldquo;做减法&rdquo;。小浪底水库拦洪削峰，支流上的陆浑、故县水库压减下泄流量。此外，济平干渠、南水北调穿黄工程等实施分泄。&ldquo;实施长河段、干支流水库群联合调度，最大限度减轻下游漫滩和防守压力。黄委组织工作专班，下足绣花功夫，以每半小时50立方米每秒为调度单元，滚动修订水库调度方案，精准调控花园口站流量。&rdquo;张希玉表示。</p>\r\n<p>小浪底管理中心开发公司运行部副部长鲁锋向记者直言，&ldquo;以往调度均是几百流量调度，今年精准到50立方米每秒调度，水电机组运行管理难度加大，机组随时需要按照指令下泄流量。&rdquo;</p>\r\n<p>除了细微级别精确调度外，联合统筹&ldquo;水账&rdquo;也是今年防秋汛的重要抓手之一。据悉，由黄河水利委员会直接调度参与调控的水库共7座，其中对黄河下游防洪控制断面-花园口水文断面通过流量起决定作用的5座水库，分别是干流的三门峡水库、小浪底水库，支流伊洛河右支伊河上的陆浑水库和左支洛河上的故县水库、沁河上的河口村水库。支流的三个水库管好自己一亩三分地的同时，实行错峰调度，尽量为小浪底水库尽可能泄放流量留出空间。</p>\r\n<p>长江委防御局副局长郑静向记者介绍，科学调度汉江流域水库群，有效应对了汉江7次10000立方米每秒以上的丹江口水库入库洪水过程，极大减轻了汉江中下游地区的防洪压力。&ldquo;若没有水库群拦蓄，汉江中下游将全线超保，部分河段洪峰水位将超堤顶高程。通过水库群拦洪、削峰、错峰，有效控制汉江中下游水位，防洪效益十分显著。&rdquo;</p>\r\n<p>03</p>\r\n<p>改善供电质量，提升经济效益</p>\r\n<p>丰富来水使水库产生显著的发电效益。汉江集团公司总经理何晓东对记者表示，丹江口水电站是湖北电网的主力调频电站，承担了湖北电网重要的调峰、调相和事故备用的任务，对保证电网的安全运行、改善供电质量和提高电网的经济效益起到重要作用。</p>\r\n<p>记者从丹江口水电站获悉，丹江电厂利用来水较多时机多发满发，截至10月7日，丹江电厂累计发电量41.85亿千瓦时。</p>\r\n<p>预计2021年发电量约49.5亿千瓦时，超多年平均发电量15.7亿千瓦时，为南水北调中线一期工程通水以来最大年发电量，相当于替代标准煤153万吨，减排二氧化碳400万吨、二氧化硫1.3万吨、氮氧化物1.13万吨。</p>\r\n<p>&nbsp;</p>",
                "attachment": "/public/uploads/Diy/adminImg/20241211/1733907151973_44561582.jpg",
                "lookcount": 0,
                "manager_id": 5,
                "update_time": "2024-12-26T05:13:37.000Z",
                "categoryId": 6,
                "managerId": 5,
                "category": {
                    "id": 6,
                    "name": "资讯中心",
                    "enname": "NEWS CNETER"
                }
            },
            {
                "timestamp": 1735189912000,
                "create_time": "2024-12-26 13:11:52",
                "id": 23,
                "category_id": 6,
                "name": "能源局：2022年乡村振兴定点帮扶和对口支援工作要点 持续推进农村电网薄弱地区建设",
                "enname": "",
                "status": 1,
                "order": 50,
                "description": "近日国家能源局印发2022年乡村振兴定点帮扶和对口支援工作要点的通知。文件提出，持续推进农村电网薄弱地区建设，优化城乡网架结构，提升农村电网供电保障水平，增强农村分布式可再生能源接入能力。加快推进通渭县平襄110千伏变电站等重点工程建设。推动通渭、清水县配电网建设示范县、“获得电力”服务水平样板工程建设，巩固提升信丰县全国小康用电示范县成果。",
                "keywords": "",
                "maincontent": "<p>近日国家能源局印发2022年乡村振兴定点帮扶和对口支援工作要点的通知。文件提出，持续推进农村电网薄弱地区建设，优化城乡网架结构，提升农村电网供电保障水平，增强农村分布式可再生能源接入能力。加快推进通渭县平襄110千伏变电站等重点工程建设。推动通渭、清水县配电网建设示范县、&ldquo;获得电力&rdquo;服务水平样板工程建设，巩固提升信丰县全国小康用电示范县成果。</p>\r\n<p style=\"text-align: center;\"><img src=\"/public/uploads/Diy/adminImg/20241211/1733906801435_79206487.png\" width=\"657\" height=\"438\"></p>\r\n<p>一、协调推动基础设施建设</p>\r\n<p>（一）持续提升供电保障能力。持续推进农村电网薄弱地区建设，优化城乡网架结构，提升农村电网供电保障水平，增强农村分布式可再生能源接入能力。加快推进通渭县平襄110千伏变电站等重点工程建设。推动通渭、清水县配电网建设示范县、&ldquo;获得电力&rdquo;服务水平样板工程建设，巩固提升信丰县全国小康用电示范县成果。〔新能源司、电力司、监管司，华中能源监管局、甘肃能源监管办〕</p>\r\n<p>（二）协调推动天然气项目建设。支持通渭、清水两县与管网企业开展合作，指导建设输气支线管道项目。推动西气东输管道天然气信丰分输站开口，2022年底前通气供气。〔油气司〕</p>\r\n<p>（三）指导信丰电厂建设运行。推动信丰电厂一期项目2台机组2022年上半年按期投产、安全稳定运行；协助信丰电厂增加煤炭来源，稳定煤炭供应。结合全国和江西省电力供需变化趋势，指导信丰县开展信丰电厂二期扩建项目前期研究。指导信丰电厂建设资源综合利用项目。〔科技司、电力司、煤炭司，华中能源监管局〕</p>\r\n<p>（四）推动清陇高速公路规划建设。商请有关部门支持清水县公路建设，将清水县至陕西陇县高速公路项目纳入相关交通规划。〔规划司牵头〕</p>\r\n<p>二、培育壮大可再生能源产业</p>\r\n<p>（五）风电项目建设。加快通渭县寺子川10万千瓦风电项目、清水县黄门5万千瓦风储一体化电站项目建设，力争2022年底前建成并网运行。指导三县开展新建风电开发论证。〔新能源司、电力司、安全司〕</p>\r\n<p>（六）光伏项目建设。积极推动通渭马营镇10万千瓦集中式光伏电站、清水黄门10万千瓦农光储一体化电站项目建设，力争2022年底前建成并网运行。支持三县分布式光伏项目有序建设及并网。指导通渭县建设孟河村光储微电网试点项目。〔新能源司、电力司，华中能源监管局、甘肃能源监管办〕</p>\r\n<p>（七）抽水蓄能项目规划建设。指导清水县开展黄龙抽水蓄能电站项目前期工作。在条件成熟的前提下，将信丰抽水蓄能项目滚动列入&ldquo;十四五&rdquo;重点实施项目库。〔新能源司〕</p>\r\n<p>（八）生物质能开发利用。鼓励通渭、清水县在生物质资源丰富的中心村、易地扶贫搬迁安置点开展生物质供暖试点，探索生物质资源开发利用新模式。〔新能源司〕</p>\r\n<p>（九）农村清洁能源创新利用。协调支持通渭多能互补帮扶示范项目、清水陇东南清洁能源示范区项目建设。指导三县有条件的易地搬迁新村、中心村、大型农村社区创新生产生活用能方式，提升农村可再生能源利用水平。〔新能源司〕</p>\r\n<p>三、加大社会帮扶力度</p>\r\n<p>（十）动员社会帮扶。协调动员能源企业、公益组织等社会力量提供无偿帮扶资金和物资，支持三县特色产业发展和基础设施建设。〔规划司牵头，局内各单位参与〕</p>\r\n<p>（十一）开展就业帮扶。协调在通渭、清水县施工的能源企业优先在本地招用劳动力，开展必要的技能培训。协调企业优先招聘三县应届大学生，继续开展核苗计划。〔规划司、核电司，核电中心，局内各单位参与〕</p>\r\n<p>（十二）深化消费帮扶。组织局内党员干部积极购买三县特色农产品，各单位工会、食堂在购买慰问品、食材采购时优先选用三县产品。协调企业、社会组织购买三县产品，助力强化自有电商品牌，优化能源行业消费帮扶合作平台，进一步拓展销售渠道。〔各单位，机关工会〕</p>\r\n<p>四、强化党建和人才帮扶</p>\r\n<p>（十三）持续开展党支部结对共建。相关基层党组织要加强与结对村党支部的联系互动，重点从文化振兴、生态振兴、组织振兴方面探索创新共建形式，帮助提升组织力和党建水平。〔机关党委（人事司），有结对任务的单位〕</p>\r\n<p>（十四）支持三县用好红色教育资源。协助三县宣传红色历史和红色旅游资源，组织局党员干部开展相关学习教育和主题党日活动。〔机关党委（人事司），各单位〕</p>\r\n<p>（十五）加强挂职干部管理。做好挂职干部到期轮换工作，加强挂职干部日常管理，关心挂职干部生活，及时帮助解决工作和生活中的困难。视工作实际需要，可考虑协调安排三县干部在能源局系统挂职。〔机关党委（人事司）、规划司，派出挂职干部单位〕</p>\r\n<p>（十六）组织专题培训。组织专家、学者赴三县授课，组织光伏、电力等运维管理及安全生产培训，根据工作需要，适时组织基层干部、致富带头人开展乡村振兴培训。〔机关党委（人事司）、规划司、安全司，华中能源监管局，甘肃能源监管办，相关单位〕</p>\r\n<p>（十七）协调加强产学研合作。指导通渭县与中国农业科学院饲料研究所合作建设西北草畜与中药材产业试验站，开展光伏农业、技术推广、专家库建设等工作。〔规划司〕</p>\r\n<p>（十八）开展教育帮扶。组织全局干部捐助低收入家庭学生，组织青年干部开展支教活动。协调企业、公益组织和爱心人士开展各类助学活动。〔机关团委，各单位〕</p>\r\n<p>五、工作要求</p>\r\n<p>（十九）着力提升帮扶成效。各单位要持续推进既有长效帮扶举措，定期了解帮扶成效，并根据乡村振兴新形势的需要，围绕提高脱贫户和边缘户自我发展能力，调整帮扶方式或开展新的帮扶项目，确保帮扶工作力度不减。</p>\r\n<p>（二十）发挥政策试点作用。各单位要结合能源行业发展需要，将三县作为政策创新突破的试验田，组织建设试点工程，通过挂职干部一线摸排，及时发现问题，为政策制订提供思路和案例。</p>\r\n<p>（二十一）拓展乡村振兴渠道。按照中央关于全面推进乡村振兴的决策部署，在发挥能源行业优势，继续帮助三县产业、人才、组织振兴的同时，各单位要在改善农村人居环境、加强农村精神文明建设方面拓展工作渠道、加大工作力度，助力实现生态振兴、文化振兴。</p>",
                "attachment": "/public/uploads/Diy/adminImg/20241211/1733906766532_20801045.png",
                "lookcount": 0,
                "manager_id": 5,
                "update_time": "2024-12-26T05:11:52.000Z",
                "categoryId": 6,
                "managerId": 5,
                "category": {
                    "id": 6,
                    "name": "资讯中心",
                    "enname": "NEWS CNETER"
                }
            },
            {
                "timestamp": 1716429551000,
                "create_time": "2024-05-23 09:59:11",
                "id": 14,
                "category_id": 6,
                "name": "2022年8月2日到3日中电联（北京）认证中心委派2位审核专家对我司质量、安全及职业健康安全管理体系进行审",
                "enname": "",
                "status": 1,
                "order": 50,
                "description": "我司质量、安全及职业健康安全管中心委派2位审核专家对我司质量、安全及职理体系进行审核 并顺利通过我司质量、安全及职业健康安全管理体系进行审核 并顺利通过",
                "keywords": "",
                "maincontent": "<p>中心委派2位审核专家对我司质量、安全及职中心委派2位审核专家对我司质量、安全及职中心委派2位审核专家对我司质量、安全及职中心委派2位审核专家对我司质量、安全及职中心委派2位审核专家对我司质量、安全及职中心委派2位审核专家对我司质量、安全及职</p>",
                "attachment": "/public/uploads/Diy/adminImg/20240523/1716429548390_39356937.jpg",
                "lookcount": 0,
                "manager_id": 5,
                "update_time": "2024-05-23T01:59:11.000Z",
                "categoryId": 6,
                "managerId": 5,
                "category": {
                    "id": 6,
                    "name": "资讯中心",
                    "enname": "NEWS CNETER"
                }
            },
            {
                "timestamp": 1716348289000,
                "create_time": "2024-05-22 11:24:49",
                "id": 8,
                "category_id": 6,
                "name": "变压器直流电阻测试仪的保养小窍门",
                "enname": "",
                "status": 1,
                "order": 50,
                "description": "睿晨电网建设工程有限公司主要从事电力工程，规划设计 变电站电力设备，高压试验设备，变电线路检测设备，自动化控制系统，在线监测系统，信息化集成， 实验仪器仪表等研制、生产、销售、技术、售后服务，公司的主要产品有各种电力测试的解决方案，耐电压试验系列， 调频串联谐振试验装置、电力设备的在线监测系统，冲击耐压、 水利水电信息化，无局放试验系列、油化测定，FS6检查系列等等，经营的产品广泛涉足工业自动化与城乡电网的建设、 改造和铁路、航天航空、高等院校、实验室、通信、环保、质检、医疗等领域。",
                "keywords": "",
                "maincontent": "<p>睿晨电网建设工程有限公司主要从事电力工程，规划设计 变电站电力设备，高压试验设备，变电线路检测设备，自动化控制系统，在线监测系统，信息化集成， 实验仪器仪表等研制、生产、销售、技术、售后服务，公司的主要产品有各种电力测试的解决方案，耐电压试验系列， 调频串联谐振试验装置、电力设备的在线监测系统，冲击耐压、 水利水电信息化，无局放试验系列、油化测定，FS6检查系列等等，经营的产品广泛涉足工业自动化与城乡电网的建设、 改造和铁路、航天航空、高等院校、实验室、通信、环保、质检、医疗等领域。</p>\n<p style=\"text-align: center;\"><img src=\"/public/uploads/Diy/adminImg/20240522/1716348202313_44111493.png\"></p>",
                "attachment": "/public/uploads/Diy/adminImg/20240522/1716348287687_3179453.png",
                "lookcount": 0,
                "manager_id": 5,
                "update_time": "2024-05-22T03:24:49.000Z",
                "categoryId": 6,
                "managerId": 5,
                "category": {
                    "id": 6,
                    "name": "资讯中心",
                    "enname": "NEWS CNETER"
                }
            }
        ]
    },
    {
        "type": "uTabbar",
        "data": [
            {
                "text": "首页",
                "icon": "home",
                "openurl": "/pages/index/index",
                "badge": 0,
                "dot": false,
                "id": 1
            },
            {
                "text": "资讯中心",
                "icon": "level",
                "openurl": "/pages/list/list",
                "badge": 3,
                "dot": false,
                "id": 2
            },
            {
                "text": "工程案例",
                "icon": "list-dot",
                "openurl": "/pages/piclist/piclist",
                "badge": 0,
                "dot": true,
                "id": 3
            },
            {
                "text": "联系我们",
                "icon": "chat-fill",
                "openurl": "/pages/contact/contact",
                "badge": 0,
                "dot": false,
                "id": 4
            }
        ]
    }
]
```

## 二、资讯中心、工程案例、联系我们api接口
分析：<br/>
> `资讯中心`、`工程案例`通过分类id获取news表数据，因此可以考虑统一的接口：<br/>
`资讯中心` ： http://127.0.0.1:7001/api/wap/`cid`/6 <br/>
`工程案例` ： http://127.0.0.1:7001/api/wap/`cid`/8 <br/>
`详细信息` ： http://127.0.0.1:7001/api/wap/`id`/10 <br/>
`联系我们` ： http://127.0.0.1:7001/api/wap/`contact`/contact <br/>
`首页` ： http://127.0.0.1:7001/api/wap/`index`/index <br/>

### ① 控制器 app/controller/api/template01/wap.js
```js
...
    //数据请求
    async getData(){
        const { ctx, app } = this;
        let p = ctx.params.p;
        let _id = parseInt(ctx.params._id);
        switch (p) {
            case 'index': 
                await this.index();
                break;
            case 'cid':
                this.ctx.body = await this.ctx.service.news.getNewsByCategoryId(_id, 10);
                break;
            case 'id':
                this.ctx.body = await this.ctx.model.News.findByPk(_id) ? await this.ctx.model.News.findByPk(_id) : {};
                break;
            case 'contact':
                if(fs.existsSync('./data/wap_config.json')){
                    this.ctx.body = await JSON.parse(fs.readFileSync('./data/wap_config.json', {encoding: 'utf-8'})).data;
                }else{
                    this.ctx.body = [];
                }
                break;
            default:
                this.ctx.body = [];
                break;
        }
    }
...
```
### ② 路由 `app/router/api/template01/router.js`
```js
    //移动端
    // router.get('/api/wap/index', controller.api.template01.wap.index);
    // router.get('/api/wap/:p', controller.api.template01.wap.getData);
    router.get('/api/wap/:p/:_id', controller.api.template01.wap.getData);
```


### 三、信息详情页浏览量更新
控制器 `app/controller/api/template01/wap.js`
```js
    //数据处理
    async getData(){
        ...
        switch (p) {
            ...
            case 'id':
                //更新浏览量
                // ctx.body = await ctx.model.News.findByPk(_id) ? await ctx.model.News.findByPk(_id) : {};
                const res = await ctx.model.News.findByPk(_id) ? await ctx.model.News.findByPk(_id) : {};
                if(res.id){
                    let lookcount = parseInt(res.lookcount) + 1;
                    res.lookcount = lookcount;
                    await res.save();
                }
                ctx.body = res;
                break;
            ...
        }
        
    }
```