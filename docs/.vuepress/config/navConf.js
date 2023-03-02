module.exports = [
    { text: '主页', link: '/' },
    { text: '关于', link: '/about' },
    { text: '内关于', link: '/about/' },
    { text: 'pc', link: '/pc/' },
    { text: 'phone', link: '/phone/' },
    { text: '百度', link: 'https://www.baidu.com', target: '_blank' },
    { text: '谷歌', link: 'https://google.com', target: '_self', rel: '' },
    {
        text: '单列表',
        ariaLabel: '单列表 Menu',
        items: [
            { text: 'Chinese', link: '/language/chinese/' },
            { text: 'Japanese', link: '/language/japanese/' }
        ]
    },
    {
        text: '列表分组',
        items: [
            {
                text: '分组1',
                items: [
                    { text: '关于', link: '/about' },
                    { text: '内关于', link: '/about/' },
                ]
            },
            {
                text: '分组2',
                items: [
                    { text: '百度', link: 'https://www.baidu.com', target: '_blank' },
                    { text: '谷歌', link: 'https://google.com', target: '_self', rel: '' },
                ]
            }
        ]
    }
]