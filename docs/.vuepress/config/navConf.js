module.exports = [
    { text: '主页', link: '/' },
    { text: '第一学期课程', link: '/aboutless' },
    { text: '第二学期课程', link: '/secondless/' },
    { text: '第三期移动端课程', link: '/thirdless/' },
    { text: '第四学期课程', link: '/fourthless/' },
    // { text: '项目部署专题课', link: '/deploy/' },
    { text: '课程软件小案例', link: '/web/software/' },
    { text: '课程案例数据表', link: '/web/mysql/' },
    {
        text: '课程答疑',
        ariaLabel: '课程答疑汇总',
        items: [
            { text: '课程常见问题', link: '/web/answer/课程常见问题' },
            { text: '项目部署', link: '/deploy/' },
            { text: '免费部署SSL证书', link: '/web/answer/免费部署SSL证书' },
        ]
    },
    {
        text: '课程学习网站',
        items: [
            // {
            //     text: '栏目',
            //     items: [
            //         { text: '关于', link: '/about' },
            //         { text: '内关于', link: '/about/' },
            //         { text: 'pc', link: '/pc/' },
            //         { text: 'phone', link: '/phone/' },
            //     ]
            // },
            {
                text: '视频学习网站',
                items: [
                    { text: '腾讯云课堂', link: 'https://study.163.com/provider/480000002289674/index.htm?share=2&shareId=480000002289674', target: '_blank' },
                    { text: 'B站', link: 'https://space.bilibili.com/3493114067028034/pugv', target: '_blank', rel: '' },
                ]
            }
        ]
    },
    // {
    //     text: '实用方法',
    //     ariaLabel: '实用方法菜单',
    //     items: [
    //         { text: '定位相关', link: '/web/methods/定位相关' },
    //         { text: '地图相关', link: '/web/methods/地图相关' }
    //     ]
    // },
    {
        text: '实用网站和方法',
        ariaLabel: '实用菜单',
        items: [
            {
                text: '实用方法',
                ariaLabel: '实用方法菜单',
                items: [
                    { text: '定位相关', link: '/web/methods/定位相关' },
                    { text: '地图相关', link: '/web/methods/地图相关' },
                    { text: '树形结构数据转换', link: '/web/methods/树形结构数据转换' }
                ]
            },
            {
                text: 'uni-app专栏',
                ariaLabel: 'uni-app专栏',
                items: [
                    { text: 'uni-app的UI框架', link: '/web/methods/uni-app专栏' },
                ]
            },
            {
                text: 'Egg.js专栏',
                ariaLabel: 'Egg.js专栏',
                items: [
                    { text: 'Egg.js基础', link: '/secondless/w-c/Egg.js.html' },
                    { text: 'Egg.js基础总结', link: '/secondless/w-c/egg.js基础总结.html' },
                    { text: 'Egg.js重要知识详细文档', link: '/secondless/w-c/egg.js重要知识详细文档.html' },
                    { text: 'Egg.js参数验证说明', link: '/secondless/w-c/ValParams%20API%20说明.html' },
                    { text: 'Egg.js迁移文件Sequelize数据类型', link: '/web/mysql/Sequelize数据类型.html' },
                    { text: 'Egg.js接口安全防护方案', link: '/secondless/w-c/Egg.js接口安全防护方案.html' },
                ]
            },
            {
                text: '实用网站',
                ariaLabel: '实用网站菜单',
                items: [
                    { text: '实用接口', link: '/web/methods/实用接口' },
                    { text: 'css', link: '/web/css/' },
                    { text: 'Vue.js', link: '/web/vue.js/' },
                    { text: 'Vue3+ElementPlus系统', link: '/web/Vue3+ElementPlus/' },
                    { text: 'echarts图表', link: '/web/echarts/' },
                    { text: 'Bootstrap', link: '/web/bootstrap/' },
                    { text: 'IIS', link: '/web/IIS/' },
                    { text: 'Github', link: '/web/github/' },
                    { text: 'Vanta.js网页3D背景', link: '/web/Vanta.js/' },
                    { text: '商城系统推荐', link: '/web/shop/' },
                ] 
            },
        ]
    },
    
]