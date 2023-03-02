module.exports = [
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
]