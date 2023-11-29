module.exports = [
    { text: '主页', link: '/' },
    { text: '第一学期课程', link: '/aboutless' },
    { text: '第二学期课程', link: '/secondless/' },
    { text: '课程所需软件', link: '/web/software/' },
    {
        text: '实用方法',
        ariaLabel: '实用方法菜单',
        items: [
            { text: '定位相关', link: '/web/methods/定位相关' },
            { text: '地图相关', link: '/web/methods/地图相关' }
        ]
    },
    {
        text: '实用网站',
        ariaLabel: '实用网站菜单',
        items: [
            { text: '实用接口', link: '/web/methods/实用接口' },
            { text: 'echarts图表', link: '/web/echarts/' },
            { text: 'Bootstrap', link: '/web/bootstrap/' },
        ]
    },
    {
        text: '关于',
        items: [
            {
                text: '栏目',
                items: [
                    { text: '关于', link: '/about' },
                    { text: '内关于', link: '/about/' },
                    { text: 'pc', link: '/pc/' },
                    { text: 'phone', link: '/phone/' },
                ]
            },
            {
                text: '友情链接',
                items: [
                    { text: '百度', link: 'https://www.baidu.com', target: '_blank' },
                    { text: '谷歌', link: 'https://google.com', target: '_self', rel: '' },
                ]
            }
        ]
    }
]