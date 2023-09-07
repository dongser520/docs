//数组形式--侧边栏
module.exports = [
    // '',
    'aboutless',
    {
        title: '第二学期课程',   // 必要的
        path: '/secondless/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/secondless/w-a',
          '/secondless/w-b',
          '/secondless/w-c',
        ]
    },
    //'about/',
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