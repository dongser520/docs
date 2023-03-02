/**
 * Generated by "@vuepress/internal-routes"
 */

import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from "E:\\vuepress\\vuepress-github\\docs\\node_modules\\@vuepress\\core\\lib\\client\\components\\GlobalLayout.vue"

injectComponentOption(GlobalLayout, 'mixins', rootMixins)
export const routes = [
  {
    name: "v-1215a3cf",
    path: "/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-1215a3cf").then(next)
    },
  },
  {
    path: "/index.html",
    redirect: "/"
  },
  {
    name: "v-35204b8c",
    path: "/about.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-35204b8c").then(next)
    },
  },
  {
    name: "v-10de5a02",
    path: "/phone/phone-a.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-10de5a02").then(next)
    },
  },
  {
    name: "v-62ea3633",
    path: "/pc/p-b.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-62ea3633").then(next)
    },
  },
  {
    name: "v-2c6c8e00",
    path: "/about/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-2c6c8e00").then(next)
    },
  },
  {
    path: "/about/index.html",
    redirect: "/about/"
  },
  {
    name: "v-7ba60f92",
    path: "/pc/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-7ba60f92").then(next)
    },
  },
  {
    path: "/pc/index.html",
    redirect: "/pc/"
  },
  {
    name: "v-4f90747e",
    path: "/phone/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-4f90747e").then(next)
    },
  },
  {
    path: "/phone/index.html",
    redirect: "/phone/"
  },
  {
    name: "v-7fa37fb5",
    path: "/pc/p-a.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-7fa37fb5").then(next)
    },
  },
  {
    name: "v-4630ecb1",
    path: "/pc/p-c.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-4630ecb1").then(next)
    },
  },
  {
    name: "v-437744df",
    path: "/phone/phone-b.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-437744df").then(next)
    },
  },
  {
    name: "v-e1449282",
    path: "/phone/phone-c.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-e1449282").then(next)
    },
  },
  {
    name: "v-6de531b2",
    path: "/web/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-6de531b2").then(next)
    },
  },
  {
    path: "/web/index.html",
    redirect: "/web/"
  },
  {
    name: "v-544f4fdf",
    path: "/web/w-a.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-544f4fdf").then(next)
    },
  },
  {
    name: "v-0de685c2",
    path: "/web/w-c.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-0de685c2").then(next)
    },
  },
  {
    name: "v-b2a3f302",
    path: "/web/w-b.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-b2a3f302").then(next)
    },
  },
  {
    name: "v-1ead3dbc",
    path: "/%E5%BC%80%E5%8F%91%E8%AE%B0%E5%BD%95.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-1ead3dbc").then(next)
    },
  },
  {
    path: "/开发记录.html",
    redirect: "/%E5%BC%80%E5%8F%91%E8%AE%B0%E5%BD%95.html"
  },
  {
    path: "/开发记录.html",
    redirect: "/%E5%BC%80%E5%8F%91%E8%AE%B0%E5%BD%95.html"
  },
  {
    path: '*',
    component: GlobalLayout
  }
]