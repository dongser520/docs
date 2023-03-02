const moment = require('moment'); //引入插件,时间格式查看moment官网：http://momentjs.cn/docs/#/displaying/format/
const secret = require("./secret");//关于私密账号，单独放在secret.js中来引入
module.exports = {
    // 更新时间插件使用
    '@vuepress/last-updated':{
        transformer: (timestamp, lang="zh-cn") => {
            moment.locale("zh-cn")
            return moment(timestamp).format("LLLL")
        }
    },
    // PWA插件使用
    '@vuepress/pwa':{
        serviceWorker: true,
        updatePopup: {
            message: "发现新内容",
            buttonText: "刷新"
        }
    },
    //vssue评论插件
    '@vssue/vuepress-plugin-vssue': {
        // 设置 `platform` 而不是 `api`
        platform: 'github-v4',
  
        // 其他的 Vssue 配置
        owner: 'dongser520',
        repo: 'docs',
        clientId: secret.clientId,
        clientSecret: secret.clientSecret,
        autoCreateIssue:true,
    },
    //快速返回
    '@vuepress/back-to-top':true, //对象写法
    //图片缩放插件
    '@vuepress/medium-zoom': {
        selector: 'img.zoom-custom-imgs',
        // selector: 'img',
        // medium-zoom options here
        // See: https://github.com/francoischalifour/medium-zoom#options
        options: {
          margin: 16
        }
    },
    //自动侧边栏插件:https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/features/plugin-options.html#removeemptygroup-%E9%9A%90%E8%97%8F%E7%A9%BA%E5%88%86%E7%BB%84
    //这个插件和自己的自定义，两个自己感觉吧，看需求吧,不需要就隐藏它
    // "vuepress-plugin-auto-sidebar":{
    //     nav:true,//自动按照目录文件生成导航栏
    // },
}

//以下是数组形式写法
/*
plugins: [
    // 更新时间插件使用---数组形式
    [
        '@vuepress/last-updated',
        {
        transformer: (timestamp, lang="zh-cn") => {
            moment.locale("zh-cn")
            return moment(timestamp).format("LLLL")
        }
        }
    ],
    // PWA插件使用---数组形式
    [
        '@vuepress/pwa', 
        {
            serviceWorker: true,
            updatePopup: {
                message: "发现新内容",
                buttonText: "刷新"
            }
        }
    ],
    ['@vuepress/back-to-top'], //快速返回
],
*/