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