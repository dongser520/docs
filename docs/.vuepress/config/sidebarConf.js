//数组形式--侧边栏
module.exports = [
    // '',
    'aboutless',
    {
        title: '第二期企业网站开发',   // 必要的
        path: '/secondless/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/secondless/w-a',
          '/secondless/w-b',
          '/secondless/w-c',
          '/secondless/w-d',
        ]
    },
    {
        title: '第三期移动端(H5/小程序/App)',   // 必要的
        path: '/thirdless/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/thirdless/w-a',
          '/thirdless/w-b',
          '/thirdless/w-c',
          '/thirdless/w-d',
          '/thirdless/w-e',
        ]
    },
    //'about/',
    // {
    //     title: '全栈开发项目部署专题课',   // 必要的
    //     path: '/deploy/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    //     collapsable: false, // 可选的, 默认值是 true,
    //     sidebarDepth: 1,    // 可选的, 默认值是 1
    //     children: [
    //       '/deploy/vuecli.shop',
    //       '/deploy/vitevue3.shop',
    //       '/deploy/eggjs.chat',
    //     ]
    // },
    {
        title: '第四期web全栈课程',   // 必要的
        path: '/fourthless/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/fourthless/w-a',
          '/fourthless/w-b',
          '/fourthless/w-c',
          '/fourthless/w-d',
          '/fourthless/w-e',
        ]
    },
    {
        title: '第五期python课程',   // 必要的
        path: '/fiveless/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/fiveless/w-a',
        ]
    },
    // '/deploy/', //部署专题课
]

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