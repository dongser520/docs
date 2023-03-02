const moment = require('moment');

module.exports = {
    //base:"/docs/", //配置docs.51yrc.com域名后，删除这里,不然页面样式错误
    title:'睿晨网',
    description:'睿晨网|睿晨编程|零基础学做网站、app、小程序就从这里开始',
    head: [
        ['link', { rel: 'icon', href: '/assets/img/favicon.png' }],
        ['meta', { name: 'keywords', content: '睿晨网,睿晨编程,零基础学做网站,零基础学app,零基础学小程序' }],
        ['meta', { name: 'author', content: '睿晨网,睿晨编程,阿东老师' }],
        // 以下内容兼容pwa:https://vuepress.vuejs.org/zh/plugin/official/plugin-pwa.html#%E4%BD%BF%E7%94%A8
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
        ['link', { rel: '#icon-pengyouquan', href: '/icons/iconfont.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    //引入插件,时间格式查看moment官网：http://momentjs.cn/docs/#/displaying/format/
    plugins: [
        // 更新时间插件使用
        [
          '@vuepress/last-updated',
          {
            transformer: (timestamp, lang="zh-cn") => {
              moment.locale("zh-cn")
              return moment(timestamp).format("LLLL")
            }
          }
        ],
        // PWA插件使用
        [
            '@vuepress/pwa', 
            {
                serviceWorker: true,
                updatePopup: {
                    message: "发现新内容",
                    buttonText: "刷新"
                }
            }
        ]
    ],
    themeConfig: {
        //logo: '/assets/img/logo.png',
        lastUpdated: '更新时间', // string | boolean 最后更新时间
        // navbar: false,//全局禁用导航栏
        nav: [
            { text: 'Home', link: '/' },
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
        ],
        // sidebar: 'auto', //全局自动生成侧边栏
        //数组形式
        sidebar:[
            '',
            'about',
            'about/',
            {
                title: 'web前端开发',   // 必要的
                path: '/web/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                  '/web/w-a',
                  '/web/w-b',
                  '/web/w-c',
                ]
            },
        ],
        
        //对象形式
        /*
        sidebar: {
            '/pc/': [
                'p-a',
                'p-b',
                'p-c',
            ],
            '/phone/': [
                'phone-a',
                'phone-b',
                'phone-c',
            ],
            //匹配首页  路径越短越写在后面,如后面有 /front/javscript/
            //则 /front/应该写在 /front/javscript/ 的下面
            //匹配首页
            //  '/':[
            //     ''
            //  ],
        },
        */
    }
}