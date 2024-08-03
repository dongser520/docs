/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "2-1-10-01.jpg",
    "revision": "54020e4e5c5dbcb0d29df9dc4762b989"
  },
  {
    "url": "2-1-10-02.jpg",
    "revision": "c12cc1cfd731dd749e9d6fb8a2f29804"
  },
  {
    "url": "2-1-14-01.jpg",
    "revision": "cc51df1ce55395f95f56df201f9de431"
  },
  {
    "url": "2-1-15-01.jpg",
    "revision": "35088db7acbcb7d40a7f812585abc4b6"
  },
  {
    "url": "2-1-15-02.jpg",
    "revision": "0c931858482af455e44a9badcca98c0e"
  },
  {
    "url": "20230811124216.jpg",
    "revision": "0dcf3c10190e072ae34e65d743c90a57"
  },
  {
    "url": "20230811130629.jpg",
    "revision": "760addd26b9631f68486c6227bc577c2"
  },
  {
    "url": "404.html",
    "revision": "a204247f73be5ac12d16b81183b741fa"
  },
  {
    "url": "about.html",
    "revision": "345fa7e616469ceaa043b4d43936b6b4"
  },
  {
    "url": "about/index.html",
    "revision": "289f77b00b65323010a46e0f48ad03ab"
  },
  {
    "url": "aboutless.html",
    "revision": "c6d7246fd7b0dd1378f821b307cd0b6d"
  },
  {
    "url": "assets/css/0.styles.9f36b4a6.css",
    "revision": "df2c581f8f51b1eadc3e0c3a75e7e4f9"
  },
  {
    "url": "assets/img/favicon.png",
    "revision": "f0d33d871d725695703ae7aacbe5fb95"
  },
  {
    "url": "assets/img/logo.png",
    "revision": "d89f30330ad4d653d596bfe5ae2113f9"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.63ed790c.js",
    "revision": "fe2df867545e4b454164e25c87a6c927"
  },
  {
    "url": "assets/js/100.a54ec1b3.js",
    "revision": "fce8787b659cecae36377a99ac720e5e"
  },
  {
    "url": "assets/js/101.ea2a919e.js",
    "revision": "267fd96a849e756fa24ba73f8bcb4c1d"
  },
  {
    "url": "assets/js/11.934eb133.js",
    "revision": "0cbfb5a79c209befa057aecc68c6e027"
  },
  {
    "url": "assets/js/12.2665a2a8.js",
    "revision": "37725e02d773e006a84d63a1a51a2298"
  },
  {
    "url": "assets/js/13.d81ea01c.js",
    "revision": "165db0692371bb66e6dbaf88c7e1c4d8"
  },
  {
    "url": "assets/js/14.89d52c7f.js",
    "revision": "4446ab031c991bbec945712e1a400904"
  },
  {
    "url": "assets/js/15.1da4bf06.js",
    "revision": "286642a8f2ef32d46861b2992fcdeea6"
  },
  {
    "url": "assets/js/16.b1658c32.js",
    "revision": "d25d95eaf66c47ad41cff8a5d2386a75"
  },
  {
    "url": "assets/js/17.c72c3afd.js",
    "revision": "2d07cea966acb5fe7df2c26d547debcb"
  },
  {
    "url": "assets/js/18.f739f8c9.js",
    "revision": "8d765a2ba1e254775bd866df3e4038bc"
  },
  {
    "url": "assets/js/19.9f93decc.js",
    "revision": "ba77f578eb7ddd2531adaa9663106e87"
  },
  {
    "url": "assets/js/2.6281e0bb.js",
    "revision": "6953100b4156b74d48f76069058a12a9"
  },
  {
    "url": "assets/js/20.7b31de55.js",
    "revision": "1002517d37b5e10f27aa34ca153e8ccd"
  },
  {
    "url": "assets/js/21.f444e6c2.js",
    "revision": "226473cb6f75f117fe2084a591ba64d4"
  },
  {
    "url": "assets/js/22.118371f8.js",
    "revision": "9daec60578e51f848f020738a6792871"
  },
  {
    "url": "assets/js/23.7c23c03d.js",
    "revision": "dd17fb74935497d3af339c6118e7ac18"
  },
  {
    "url": "assets/js/24.ea7f286c.js",
    "revision": "ebd63573418e4e8192b081595bf03e26"
  },
  {
    "url": "assets/js/25.208b5f39.js",
    "revision": "44a18f1f076ca164f480d7f142f080c7"
  },
  {
    "url": "assets/js/26.b023e99e.js",
    "revision": "b92e62158df9f5726ab86791a43a8775"
  },
  {
    "url": "assets/js/27.4832f956.js",
    "revision": "f903edbd5c3afb099bd5ee8f663daf71"
  },
  {
    "url": "assets/js/28.8b95bcb9.js",
    "revision": "03668dcc752a0d6ee022d78405812f27"
  },
  {
    "url": "assets/js/29.923a35fa.js",
    "revision": "4050eb35cafd1add81093585ab6d9e98"
  },
  {
    "url": "assets/js/3.e6827fa8.js",
    "revision": "f1ffa92e22c7370c76abfc2cdb906d17"
  },
  {
    "url": "assets/js/30.5bb5fe9b.js",
    "revision": "9789010930c05643cfabccb372b3fb31"
  },
  {
    "url": "assets/js/31.916d87aa.js",
    "revision": "8eda073d5a86621eaa0cbd20040be6ff"
  },
  {
    "url": "assets/js/32.baaef955.js",
    "revision": "11aa36c6871d9b08fa7f39a42f8b5550"
  },
  {
    "url": "assets/js/33.b53c92ec.js",
    "revision": "fbf29faba6da99442ad0ca3acfa0870a"
  },
  {
    "url": "assets/js/34.7c8221b7.js",
    "revision": "14b17554b6ba2c8d883c72d1f4d5e005"
  },
  {
    "url": "assets/js/35.0a765431.js",
    "revision": "dc144d139e60153b53f1d100148ddbd0"
  },
  {
    "url": "assets/js/36.f2547570.js",
    "revision": "ba9bc4328edbf83315622412c9840c90"
  },
  {
    "url": "assets/js/37.9ae9f3e4.js",
    "revision": "bb0afb04edb77d827c7b58ebaab8ca46"
  },
  {
    "url": "assets/js/38.fcbcaa7e.js",
    "revision": "6e96c61201576e991ebd02b0ef6dc32d"
  },
  {
    "url": "assets/js/39.d642317c.js",
    "revision": "d8ad6508fc72e0fb129f9f1d34409719"
  },
  {
    "url": "assets/js/4.1c32e02c.js",
    "revision": "5ed73b62a8a98f057b3cb7fe1b99af1c"
  },
  {
    "url": "assets/js/40.33169f5a.js",
    "revision": "6bda78db8a5e380a121c5153d70e22af"
  },
  {
    "url": "assets/js/41.89d16917.js",
    "revision": "c92ca56b83f220880fb27fa954d0fba3"
  },
  {
    "url": "assets/js/42.ca5d8a78.js",
    "revision": "7d40bf9b06101db7f6d7fbc08ca395b6"
  },
  {
    "url": "assets/js/43.fb241a04.js",
    "revision": "7f59971ff47c967b13039b2c40254948"
  },
  {
    "url": "assets/js/44.fd9be381.js",
    "revision": "288aca2ba6467fa0c3160352baa86487"
  },
  {
    "url": "assets/js/45.53780fe4.js",
    "revision": "d81b7355a0cf7efce54acad3687858d6"
  },
  {
    "url": "assets/js/46.862afb9a.js",
    "revision": "6df3950b64da3fb9041e15b6205512f8"
  },
  {
    "url": "assets/js/47.e0bd6f9e.js",
    "revision": "20c37edf3bb3aba3589103a8799f1ce1"
  },
  {
    "url": "assets/js/48.e55c9e86.js",
    "revision": "01fd6a2408af031a31779454675cdba2"
  },
  {
    "url": "assets/js/49.7c4620b3.js",
    "revision": "98f21c03b2d4a5573280baf79859a8e1"
  },
  {
    "url": "assets/js/5.3e24e7be.js",
    "revision": "bb8330fc3b00684c0b46c0c7ade9634a"
  },
  {
    "url": "assets/js/50.c9f42408.js",
    "revision": "b3e415d234908fac7d647ac195568341"
  },
  {
    "url": "assets/js/51.ed720905.js",
    "revision": "5c95835f33329e1fa31568bc05bc6b5f"
  },
  {
    "url": "assets/js/52.67255477.js",
    "revision": "48ac461c03c5156233c9488ab731711c"
  },
  {
    "url": "assets/js/53.a3f56097.js",
    "revision": "994932dbf8528f1de7ee1b20b72348dd"
  },
  {
    "url": "assets/js/54.5c30279d.js",
    "revision": "b5ca17c6837a4a6b4461e384299a1bab"
  },
  {
    "url": "assets/js/55.7b0f4ccf.js",
    "revision": "e996a6dd39f76c8ed737d8facd204d49"
  },
  {
    "url": "assets/js/56.90a0af1d.js",
    "revision": "62f6bede0da7218ecb7aa7b5a853f568"
  },
  {
    "url": "assets/js/57.3007ed4e.js",
    "revision": "ff95767044a2324a0e74d80419680eb3"
  },
  {
    "url": "assets/js/58.a5511e99.js",
    "revision": "4e25864fb85dd7135c104515b6f4345e"
  },
  {
    "url": "assets/js/59.d47f1396.js",
    "revision": "f9ae4c0c627c69bdb702280a69f53536"
  },
  {
    "url": "assets/js/6.ca2525e2.js",
    "revision": "f26b99a11274e34a1a8df09422012df8"
  },
  {
    "url": "assets/js/60.d67d9c46.js",
    "revision": "78e1255c15fca094e16cc1d75d598624"
  },
  {
    "url": "assets/js/61.4ae220dd.js",
    "revision": "2021304c6c01c596d03557c457eba5ae"
  },
  {
    "url": "assets/js/62.cb2526a5.js",
    "revision": "30a127e7e42e67523aae2e530d7eb2cb"
  },
  {
    "url": "assets/js/63.22fd454a.js",
    "revision": "1e254796d9b94a82166808e312b3f533"
  },
  {
    "url": "assets/js/64.889d08e4.js",
    "revision": "10338df1d0addb2b7939db4f81c8878a"
  },
  {
    "url": "assets/js/65.51b2d679.js",
    "revision": "1d826cb40d2f6421b7a5d6df8c7047f8"
  },
  {
    "url": "assets/js/66.79163b01.js",
    "revision": "0031fbd1d41cafa27bced2daff2434cf"
  },
  {
    "url": "assets/js/67.39abab2a.js",
    "revision": "670700d79799c78b48c7fe055eafc3e9"
  },
  {
    "url": "assets/js/68.e2553ab1.js",
    "revision": "9dc8c16d081b265dcbd98d1b43077177"
  },
  {
    "url": "assets/js/69.5c3ea76d.js",
    "revision": "3f805128c43c9ff7abd727d0ee0e2942"
  },
  {
    "url": "assets/js/7.ed796ba5.js",
    "revision": "9d23b1da1b9f7604cdfc99c0899043ee"
  },
  {
    "url": "assets/js/70.9b6cfb87.js",
    "revision": "39dca433baa7fda896584c0008b45766"
  },
  {
    "url": "assets/js/71.09ec3e9e.js",
    "revision": "50deaea8c1cc0814bcc6173821afa3fa"
  },
  {
    "url": "assets/js/72.08022171.js",
    "revision": "beb556346d4737375adebf19ed77c10a"
  },
  {
    "url": "assets/js/73.81195324.js",
    "revision": "7197fd2635b84fc4391b91222da9d256"
  },
  {
    "url": "assets/js/74.6a2dc941.js",
    "revision": "a718b3ba7ec1760a39d35afb8c43f5d0"
  },
  {
    "url": "assets/js/75.9392de23.js",
    "revision": "b2d5bca0d7404578fa12d0ccc8b10ebc"
  },
  {
    "url": "assets/js/76.a24832a4.js",
    "revision": "63995c2fe91ecc372a7a049ebff3864d"
  },
  {
    "url": "assets/js/77.1b962e74.js",
    "revision": "61ac577fb0821b5e40e5219442b514b4"
  },
  {
    "url": "assets/js/78.b5308aaf.js",
    "revision": "892eac9e20eddb030d1550cd07dc5a79"
  },
  {
    "url": "assets/js/79.8252b98c.js",
    "revision": "3414fc3a218083f4d533ca7ba13bf4d7"
  },
  {
    "url": "assets/js/8.d2079f32.js",
    "revision": "496833a4daac79361a8173db1b66c997"
  },
  {
    "url": "assets/js/80.4854adde.js",
    "revision": "cd49270582140224c9aacb7278df61f3"
  },
  {
    "url": "assets/js/81.22faa55e.js",
    "revision": "500b8c76a09a7c1bde9ba906d23f0154"
  },
  {
    "url": "assets/js/82.ebc279a7.js",
    "revision": "197af642324de5f92859efc398d2e04f"
  },
  {
    "url": "assets/js/83.50685806.js",
    "revision": "52146720613933fbe5eca0689c3d1256"
  },
  {
    "url": "assets/js/84.a287edd8.js",
    "revision": "62a777c8bcf1c30770e4e0803f576917"
  },
  {
    "url": "assets/js/85.fb661afa.js",
    "revision": "cbe9f2894abfe7c09edc77ba43dd7387"
  },
  {
    "url": "assets/js/86.5cefce42.js",
    "revision": "f63727fb67a339724e4b1ba05a34dfc8"
  },
  {
    "url": "assets/js/87.ec3c9043.js",
    "revision": "cbf3616cf064d4017b3257399ca5797c"
  },
  {
    "url": "assets/js/88.68623569.js",
    "revision": "d7248fad8c25877e97d7a551091bd827"
  },
  {
    "url": "assets/js/89.548f020b.js",
    "revision": "4e8b675f40b73a5f45a761fa0993ee92"
  },
  {
    "url": "assets/js/9.13d458ed.js",
    "revision": "98983ed4d52578db065fd908e6b49dc6"
  },
  {
    "url": "assets/js/90.c20927c3.js",
    "revision": "5b663b1fe48b8a29c2f03215a8b23e3d"
  },
  {
    "url": "assets/js/91.504a6fa4.js",
    "revision": "8cddeae3cb13b38703b40374a7e3cd15"
  },
  {
    "url": "assets/js/92.babe3dcc.js",
    "revision": "2bcfab03bdad24b54541cf1c497f027b"
  },
  {
    "url": "assets/js/93.659b189b.js",
    "revision": "4d61a02e502e6c586f892f4d72076037"
  },
  {
    "url": "assets/js/94.88884be2.js",
    "revision": "a841b30b19c12b8d2645b10a550c8086"
  },
  {
    "url": "assets/js/95.ffda0566.js",
    "revision": "260f3c53b3f5e374bd2f60ce37995ea1"
  },
  {
    "url": "assets/js/96.eb5e860e.js",
    "revision": "b665efa12c7b1321cc15c8acf2c992e7"
  },
  {
    "url": "assets/js/97.2b188465.js",
    "revision": "7232db04d1dd016f685a0d40b67e80d3"
  },
  {
    "url": "assets/js/98.d6c284a3.js",
    "revision": "482b0300ea5e21d526d343fb8a367fb2"
  },
  {
    "url": "assets/js/99.ac861b87.js",
    "revision": "a11426165e8297d37129ece90b131167"
  },
  {
    "url": "assets/js/app.d37c8339.js",
    "revision": "8250ee57bdc65e3613e6bc04c5884550"
  },
  {
    "url": "hear.jpg",
    "revision": "65b92dc1ceb8316ccd447e8f0293b763"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "7ba64e98152ebff1ac7b3ba60b62255c"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "916744e36e89e64fc7c38976e6b71b7b"
  },
  {
    "url": "icons/apple-touch-icon-120x120.png",
    "revision": "dfd88d27c2500528fa05320df6e1b7a6"
  },
  {
    "url": "icons/apple-touch-icon-152x152.png",
    "revision": "dcfab08fd6301eca7cde5b619dd7b5c6"
  },
  {
    "url": "icons/apple-touch-icon-180x180.png",
    "revision": "6b279bebdc869384c826e4d483768bfc"
  },
  {
    "url": "icons/apple-touch-icon-60x60.png",
    "revision": "60266e4a8a75747f2e4d4fcef6fc933f"
  },
  {
    "url": "icons/apple-touch-icon-76x76.png",
    "revision": "0d45ed2cf0e97315515cec98d30ffa80"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "690ab29209c6ff86f3c06eb4e1a0566a"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "c687bf8255f43e5ab9905990f50549cb"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "e81530389852bdc318f4b15296fa82ac"
  },
  {
    "url": "icons/iconfont.svg",
    "revision": "37fd46966ccef14dadd29c192bec2cf2"
  },
  {
    "url": "icons/msapplication-icon-144x144.png",
    "revision": "c35e81f645e7c6922634eeb8e4da78de"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "dcfab08fd6301eca7cde5b619dd7b5c6"
  },
  {
    "url": "index.html",
    "revision": "a5ca42365323cc42af89e60b35844f2b"
  },
  {
    "url": "lesson_01.png",
    "revision": "15931111f2607cdddb4b8d64e7d52d62"
  },
  {
    "url": "pc/index.html",
    "revision": "5a15b19b84059a3b64c10196df0a4ced"
  },
  {
    "url": "pc/p-a.html",
    "revision": "93d574fd3e978a045a13f1182b805c5b"
  },
  {
    "url": "pc/p-b.html",
    "revision": "2d2f8d63bb680231fef404ecc7bed4ec"
  },
  {
    "url": "pc/p-c.html",
    "revision": "c558f697d753449c35a7c4c2f2b13039"
  },
  {
    "url": "phone/index.html",
    "revision": "f70604aebdd403e65810120c8cf47609"
  },
  {
    "url": "phone/phone-a.html",
    "revision": "a8735ccca990db22ceb07bbc11647e0b"
  },
  {
    "url": "phone/phone-b.html",
    "revision": "821e0ca6d96ca4fd4abc3dd501a3da29"
  },
  {
    "url": "phone/phone-c.html",
    "revision": "0aa1fb741bc0a8ba2fd5154d576c42a7"
  },
  {
    "url": "secondless/index.html",
    "revision": "8247d796eb34661638f22dd5a34291ee"
  },
  {
    "url": "secondless/w-a.html",
    "revision": "994e2c1da17d52463bd6e07c4dd68c7f"
  },
  {
    "url": "secondless/w-a/Date类型：时间和日期.html",
    "revision": "8bf2eb31a1ebd9688b0f1ef407303b6f"
  },
  {
    "url": "secondless/w-a/Function类型：函数进阶.html",
    "revision": "c723d941c757ac37fdf83e40ba465833"
  },
  {
    "url": "secondless/w-a/javascript函数.html",
    "revision": "81d28377d3341226834bf079bc8f97d9"
  },
  {
    "url": "secondless/w-a/javascript基本包装类型.html",
    "revision": "89f0e7842f212224a465e37ed4ff4d04"
  },
  {
    "url": "secondless/w-a/javascript基础.html",
    "revision": "a4a1c2b9e24b29d75b5abd5b16f4b6fd"
  },
  {
    "url": "secondless/w-a/javascript对象.html",
    "revision": "790fbc86e02da43624e2aa8a8fcf134e"
  },
  {
    "url": "secondless/w-a/javascript数组.html",
    "revision": "41c162df9e55a08dca9da8bfdf06b8fd"
  },
  {
    "url": "secondless/w-a/javascript运算符.html",
    "revision": "15a81a9db59ac78edd53ff544a28ad00"
  },
  {
    "url": "secondless/w-a/事件.html",
    "revision": "988a9796364968133d9cbda2d663ca8b"
  },
  {
    "url": "secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html",
    "revision": "780e31d03ef1b8cdffa269f7f63edff2"
  },
  {
    "url": "secondless/w-a/函数对象数组小结.html",
    "revision": "71c25fe277df5cc15ab82ba7e398cc62"
  },
  {
    "url": "secondless/w-a/匿名函数和闭包.html",
    "revision": "76f46408b96f67178f7c0a14cc4c3b6a"
  },
  {
    "url": "secondless/w-a/数据Cookie、XML、JSON.html",
    "revision": "7e28effed91709a2e84d78f601d77b9e"
  },
  {
    "url": "secondless/w-a/流程控制语句.html",
    "revision": "821f262f92186604fdc1a972b717cd7b"
  },
  {
    "url": "secondless/w-a/浏览器对象模型BOM及浏览器检测.html",
    "revision": "2b69dfb9026e5dcd32d5259303fd4c54"
  },
  {
    "url": "secondless/w-a/网页文档对象模型DOM.html",
    "revision": "8f4af6ff5f9bb757944da0d135cefbd7"
  },
  {
    "url": "secondless/w-a/表单处理及错误处理与调试.html",
    "revision": "1a6d4b933e7a9f4fd9a650b0ee42482f"
  },
  {
    "url": "secondless/w-b.html",
    "revision": "5df028fadebe25b5f6e88bc2a0cc157f"
  },
  {
    "url": "secondless/w-b/Ajax.html",
    "revision": "07a3f876ed6fd689abe97b1238622751"
  },
  {
    "url": "secondless/w-b/jQuery.html",
    "revision": "c30a81f9d562c2be3b847f8219089d0c"
  },
  {
    "url": "secondless/w-b/jQuery事件、动画、插件.html",
    "revision": "6cc06840b3ba54a80a748056975fa484"
  },
  {
    "url": "secondless/w-b/Node.js.html",
    "revision": "d8d76faabe11a51ec43c1600615909ad"
  },
  {
    "url": "secondless/w-b/node.js+vue.js 渲染企业网站.html",
    "revision": "20e94b7b77b4abbaab698e9bbbc526a7"
  },
  {
    "url": "secondless/w-b/nodejs+jQuery开发留言板.html",
    "revision": "3cf99682f11b21eaf593bfdda4a86744"
  },
  {
    "url": "secondless/w-b/nodejs服务器端app.js文件.html",
    "revision": "da5b0bf5d5c669142cc79c4a5a56076e"
  },
  {
    "url": "secondless/w-b/Vue.js.html",
    "revision": "b73e4425a855ff0ad77ebc3ac8ca5975"
  },
  {
    "url": "secondless/w-b/封装js库过渡到jQuery.html",
    "revision": "017465a170478ff95b38835ec5fcb1a8"
  },
  {
    "url": "secondless/w-b/正则表达式.html",
    "revision": "6babc5b2e9b82704348914b854921934"
  },
  {
    "url": "secondless/w-b/面向对象与原型.html",
    "revision": "1571c180ecda6f36b6cec012e2d86675"
  },
  {
    "url": "secondless/w-c.html",
    "revision": "c8812120413efaa7f9f18cd0e7eb0b31"
  },
  {
    "url": "secondless/w-c/Egg.js.html",
    "revision": "287fd8226568ea56293f1e05c7273774"
  },
  {
    "url": "secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html",
    "revision": "e7486cf0f3a74ed567d8e38da6ebd296"
  },
  {
    "url": "secondless/w-c/egg.js基础总结.html",
    "revision": "6bbb148bcd03f8225f820853e296b804"
  },
  {
    "url": "secondless/w-c/egg.js重要知识详细文档.html",
    "revision": "698f40a43be38f8464dd9e7785278495"
  },
  {
    "url": "secondless/w-c/eggjs+postman测试工具将留言写入json文件.html",
    "revision": "6d960d7c8892d12bad89a37bfe81b4e9"
  },
  {
    "url": "secondless/w-c/mysql数据库.html",
    "revision": "155cf788c7d8e8e216d29f7df3edd616"
  },
  {
    "url": "secondless/w-c/ValParams API 说明.html",
    "revision": "8515f39243ecf292d5b6ca318b1397ed"
  },
  {
    "url": "secondless/w-c/上传文件.html",
    "revision": "daae9bfbe0152c9f00a0c60bed2da2fc"
  },
  {
    "url": "secondless/w-c/企业网站其它页面(非首页).html",
    "revision": "69ee504fcea40c4a227e0da91cb477b7"
  },
  {
    "url": "secondless/w-c/企业网站前端部分.html",
    "revision": "cbc30e61c4dd4fb808a21204704d9844"
  },
  {
    "url": "secondless/w-c/企业网站后台内容管理.html",
    "revision": "9a890f6a1cd803770e1592ed88010ea1"
  },
  {
    "url": "secondless/w-c/企业网站后台栏目管理.html",
    "revision": "5fbd58e0bc7de603ff7be3f0ec567197"
  },
  {
    "url": "secondless/w-c/企业网站首页.html",
    "revision": "c1add3f4a3cca72a9c6d4f68356661b6"
  },
  {
    "url": "secondless/w-c/响应式后台公共模版.html",
    "revision": "16566eca9495c8d123266fbcbcad1659"
  },
  {
    "url": "secondless/w-c/响应式后台用户留言板管理.html",
    "revision": "9f6780084ebe9a49f330a45065d359cb"
  },
  {
    "url": "secondless/w-c/响应式后台界面示例代码.html",
    "revision": "756c8b3353702b47c40350dd51f895e1"
  },
  {
    "url": "secondless/w-c/响应式后台管理员登录.html",
    "revision": "9105396bb56cb0c0d5d7e6b15791acd0"
  },
  {
    "url": "secondless/w-c/响应式后台管理系统.html",
    "revision": "35d4b75c19bbd3cf158bf8e578c108c5"
  },
  {
    "url": "secondless/w-c/响应式网页布局.html",
    "revision": "27ab57187d3eca7905b65b3771de5d58"
  },
  {
    "url": "secondless/w-c/响应式网页布局指导思路.html",
    "revision": "cb4a2e985e78bd75e00017c4febbf467"
  },
  {
    "url": "secondless/w-c/树形结构方法演变.html",
    "revision": "8dd115936cf897c92d8e2f77fc7198b3"
  },
  {
    "url": "secondless/w-c/直播功能中的用户表liveuser.html",
    "revision": "e65bf3f0350f53043f938949a76479c8"
  },
  {
    "url": "secondless/w-c/直播功能中的直播间表live.html",
    "revision": "438355086d95f87fdda11b10a566a1fb"
  },
  {
    "url": "secondless/w-c/直播功能中的礼物表livegift.html",
    "revision": "a96b7c2ecbd9e37a0b19468c66caecc4"
  },
  {
    "url": "secondless/w-c/直播功能中的订单表liveorder.html",
    "revision": "a7c337ee90660483fd892e9546d3a14c"
  },
  {
    "url": "secondless/w-c/网站后台管理员简单权限分配功能实现.html",
    "revision": "8b1b3215cde5db2f5f1e62c34096957c"
  },
  {
    "url": "web/bootstrap/index.html",
    "revision": "21ed8b5cd69988bbbe2d13615af28fb9"
  },
  {
    "url": "web/css/index.html",
    "revision": "fd0412566c2f03d4b2eb81d81cc6a1cf"
  },
  {
    "url": "web/css/封装的css样式库.html",
    "revision": "9c74a94c91cb57babbe72d3514b7ea7b"
  },
  {
    "url": "web/echarts/index.html",
    "revision": "18794b81da0cc44a4780cbcb4ce7af51"
  },
  {
    "url": "web/github/index.html",
    "revision": "f0d7d9465a392986bf5783365f69d946"
  },
  {
    "url": "web/IIS/index.html",
    "revision": "e414a05108ac7ef0f4962e1940c3d2ca"
  },
  {
    "url": "web/index.html",
    "revision": "f2d5bb22415cd10f4c2e4c0c8f9a40b5"
  },
  {
    "url": "web/methods/地图相关.html",
    "revision": "c1f2a34a3363fbf83603a1186b910bf1"
  },
  {
    "url": "web/methods/定位相关.html",
    "revision": "d749bbc6b04328312debc969b9c2e81f"
  },
  {
    "url": "web/methods/实用接口.html",
    "revision": "efbd98ab83e74a47410927c0909336e8"
  },
  {
    "url": "web/mysql/index.html",
    "revision": "65d49c21072b12345baa09649e08e756"
  },
  {
    "url": "web/software/index.html",
    "revision": "13dd237b5b923b9ef1367e3071589bf0"
  },
  {
    "url": "web/Vanta.js/index.html",
    "revision": "9ee7f73c977b5f6bc8a052f4e913611e"
  },
  {
    "url": "web/vue.js/index.html",
    "revision": "0123897fa323e0deaf0c05bfbae71463"
  },
  {
    "url": "web/Vue3+ElementPlus/index.html",
    "revision": "bf1907bd88932c902a5041311e9de70b"
  },
  {
    "url": "web/w-a.html",
    "revision": "6d5526691673919e94cbf349cb8fd7ab"
  },
  {
    "url": "web/w-b.html",
    "revision": "b8e68ff5af62bf656d59bf145e4c3e58"
  },
  {
    "url": "web/w-c.html",
    "revision": "46f53269df55410210ec49a6807f3cb7"
  },
  {
    "url": "开发记录.html",
    "revision": "9cf139653e1931a671bed06b8fe40777"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
