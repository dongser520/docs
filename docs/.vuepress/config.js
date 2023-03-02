const headConf = require("./config/headConf");//head网页头部配置
const navConf = require("./config/navConf");//顶部导航栏
const sidebarConf = require("./config/sidebarConf");//侧边栏
const pluginsConf = require("./config/pluginsConf");//插件配置
module.exports = {
    //base:"/docs/", //配置docs.51yrc.com域名后，删除这里,不然页面样式错误
    title:'睿晨网',
    description:'睿晨网|睿晨编程|零基础学做网站、app、小程序就从这里开始',
    head: headConf, //head网页头部配置
    plugins:pluginsConf, //对象形式写法
    themeConfig: {
        //logo: '/assets/img/logo.png',
        lastUpdated: '更新时间', // string | boolean 最后更新时间
        // navbar: false,//全局禁用导航栏
        nav: navConf, //顶部导航栏
        // sidebar: 'auto', //全局自动生成侧边栏
        sidebar:sidebarConf, //数组形式--侧边栏
    }
}