import Vue from 'vue'
Vue.component("CountUp", () => import("E:\\vuepress\\vuepress-github\\docs\\docs\\.vuepress\\components\\CountUp"))
Vue.component("HomeActions", () => import("E:\\vuepress\\vuepress-github\\docs\\docs\\.vuepress\\components\\HomeActions"))
Vue.component("LessList", () => import("E:\\vuepress\\vuepress-github\\docs\\docs\\.vuepress\\components\\LessList"))

Vue.component("CodeBlock", () => import("E:\\vuepress\\vuepress-github\\docs\\node_modules\\@vuepress\\theme-default\\global-components\\CodeBlock"))
Vue.component("Badge", () => import("E:\\vuepress\\vuepress-github\\docs\\node_modules\\@vuepress\\theme-default\\global-components\\Badge"))
Vue.component("CodeGroup", () => import("E:\\vuepress\\vuepress-github\\docs\\node_modules\\@vuepress\\theme-default\\global-components\\CodeGroup"))


export default {}