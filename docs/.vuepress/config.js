const headConf = require("./config/headConf");//head网页头部配置

const navConf = require("./config/navConf");//顶部导航栏---自定义
const nav = require("./nav");//顶部导航栏---插件自动生成

const sidebarConf = require("./config/sidebarConf");//侧边栏---自定义
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
        nav: navConf, //顶部导航栏---自定义的导航栏
        //还有一个插件自动导航栏，看需求吧，不需要插件自动导航栏，就把上面的注释留着
        //nav: nav, //顶部导航栏---插件自动生成的导航栏
        //关于插件自动导航栏看这个：https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/features/plugin-options.html#removeemptygroup-%E9%9A%90%E8%97%8F%E7%A9%BA%E5%88%86%E7%BB%84

        // sidebar: 'auto', //全局自动生成侧边栏
        //由于使用了自动侧边栏插件："vuepress-plugin-auto-sidebar" 就去掉了sidebarConf这个配置了
        //这个插件和自己的自定义，两个自己感觉吧，看需求吧
        sidebar:sidebarConf, //数组形式--侧边栏
    }
}