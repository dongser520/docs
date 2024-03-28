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
    "revision": "7105d147677524e44accc0263a8b8bbe"
  },
  {
    "url": "about.html",
    "revision": "68353777bcd537d207a3c3063b0cc280"
  },
  {
    "url": "about/index.html",
    "revision": "457c259a995f042bcc050ecbe381773f"
  },
  {
    "url": "aboutless.html",
    "revision": "069aa4ff3348309611731c49065fe22b"
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
    "url": "assets/js/11.b4de40a5.js",
    "revision": "843421af9577232a008f527606f9817b"
  },
  {
    "url": "assets/js/12.cc2380d1.js",
    "revision": "db2bbf818f1a04422508866c29849f49"
  },
  {
    "url": "assets/js/13.1b0cf804.js",
    "revision": "cd8783383a73f109d55d514a2270f29b"
  },
  {
    "url": "assets/js/14.28f5c2d7.js",
    "revision": "67614b05868a17b13182eaf11bedd0db"
  },
  {
    "url": "assets/js/15.d296f1f5.js",
    "revision": "4f2b33c66b78068f1e3ecc5fb6ac181b"
  },
  {
    "url": "assets/js/16.b1658c32.js",
    "revision": "d25d95eaf66c47ad41cff8a5d2386a75"
  },
  {
    "url": "assets/js/17.4ee5c152.js",
    "revision": "11d7f6e760c45c240d89d92f951f001f"
  },
  {
    "url": "assets/js/18.01046342.js",
    "revision": "9b4ddbee4265afcebc6e1c67416d0164"
  },
  {
    "url": "assets/js/19.ddd30f31.js",
    "revision": "5a2b68e76710fcec1289083b5c74636a"
  },
  {
    "url": "assets/js/2.6281e0bb.js",
    "revision": "6953100b4156b74d48f76069058a12a9"
  },
  {
    "url": "assets/js/20.990038d2.js",
    "revision": "0df86952c425e65ea4c0b3e3bbe7b96d"
  },
  {
    "url": "assets/js/21.052ddbea.js",
    "revision": "adbf57d8a0db95102742ad57dafd651e"
  },
  {
    "url": "assets/js/22.118371f8.js",
    "revision": "9daec60578e51f848f020738a6792871"
  },
  {
    "url": "assets/js/23.66f03b02.js",
    "revision": "c648ba30fc856e59495d9c5edcd7a944"
  },
  {
    "url": "assets/js/24.d11a1236.js",
    "revision": "2a19a544ccefae8c82a0e23274155b48"
  },
  {
    "url": "assets/js/25.ef228989.js",
    "revision": "582a376c1b06380b929190428c3ef35f"
  },
  {
    "url": "assets/js/26.1fdfcf20.js",
    "revision": "1679cd6a6d347ba9ffba8c05f2057ab2"
  },
  {
    "url": "assets/js/27.ff58062d.js",
    "revision": "1675d82d3b9d1a92a6439a09c9857c82"
  },
  {
    "url": "assets/js/28.d9487fa1.js",
    "revision": "ce2fe201db2564f53c54fba20542dd3d"
  },
  {
    "url": "assets/js/29.3e44f2fe.js",
    "revision": "22dfed7db4ae21370add1adf45b306ac"
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
    "url": "assets/js/31.3440e987.js",
    "revision": "ffb72356fc0d5a0e237e41abb81ea099"
  },
  {
    "url": "assets/js/32.22ac35c9.js",
    "revision": "5509f127a4f09322d967bff683f81896"
  },
  {
    "url": "assets/js/33.393e73dc.js",
    "revision": "ac23e0fa27a97853c7be5f3f06699966"
  },
  {
    "url": "assets/js/34.e2ddc885.js",
    "revision": "791159a26539b418592a5a5b65a0ea59"
  },
  {
    "url": "assets/js/35.619a4205.js",
    "revision": "3e2577ee9d9142a5ac9b0a2cfecca1eb"
  },
  {
    "url": "assets/js/36.70b343d2.js",
    "revision": "326f615807c653258fe4d83f4335d804"
  },
  {
    "url": "assets/js/37.40a04dcd.js",
    "revision": "524f0186b2e358f3fc96d4d38ff1d562"
  },
  {
    "url": "assets/js/38.49aea792.js",
    "revision": "5b694cf460d3d292423b992b5ba9ed49"
  },
  {
    "url": "assets/js/39.a0ee2b46.js",
    "revision": "d4d9750838fd1b0749cba82ca55e855c"
  },
  {
    "url": "assets/js/4.bfd96232.js",
    "revision": "cb0bd9108e721b0557fc837b162b8308"
  },
  {
    "url": "assets/js/40.558db5f3.js",
    "revision": "92777a8bbcc306df6c7868317320d078"
  },
  {
    "url": "assets/js/41.89d16917.js",
    "revision": "c92ca56b83f220880fb27fa954d0fba3"
  },
  {
    "url": "assets/js/42.8bc1edd3.js",
    "revision": "51bafc939a5c915253e3f010ad0ad455"
  },
  {
    "url": "assets/js/43.608ebd62.js",
    "revision": "fa6ebe8ee4596a85785a4c1e91e29033"
  },
  {
    "url": "assets/js/44.4354da3a.js",
    "revision": "7557364930f81584d6af2f9ba8089c0b"
  },
  {
    "url": "assets/js/45.974e069e.js",
    "revision": "45e86204c04a120928dfb60b5b4b84ea"
  },
  {
    "url": "assets/js/46.862afb9a.js",
    "revision": "6df3950b64da3fb9041e15b6205512f8"
  },
  {
    "url": "assets/js/47.a636a291.js",
    "revision": "3d75324c23d4f3a93df8985ac7211d5b"
  },
  {
    "url": "assets/js/48.30c09bbe.js",
    "revision": "e8fde6ab61f73ec426f52b9e2c1f25a1"
  },
  {
    "url": "assets/js/49.4ce7b563.js",
    "revision": "c0137132f8130cfb793ef7e3d127a36a"
  },
  {
    "url": "assets/js/5.3e24e7be.js",
    "revision": "bb8330fc3b00684c0b46c0c7ade9634a"
  },
  {
    "url": "assets/js/50.f5bb8ee2.js",
    "revision": "bcac32e994864a95732336f146ef9f49"
  },
  {
    "url": "assets/js/51.ed720905.js",
    "revision": "5c95835f33329e1fa31568bc05bc6b5f"
  },
  {
    "url": "assets/js/52.b4daf9cd.js",
    "revision": "8814d239ab035bb295372c15a1be6137"
  },
  {
    "url": "assets/js/53.36beda5b.js",
    "revision": "14594279be4eee11a10ef829ead16daf"
  },
  {
    "url": "assets/js/54.a7bd2e70.js",
    "revision": "35812b0adda775962c4dbd1bfafef2f0"
  },
  {
    "url": "assets/js/55.54e5056f.js",
    "revision": "4faf509471c8ce29ed47d120e5f06be2"
  },
  {
    "url": "assets/js/56.9f7266eb.js",
    "revision": "625913b39ee76da4bf511df84716a27d"
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
    "url": "assets/js/59.3f7899bf.js",
    "revision": "ef29e1a098d7fd5492adf37bcd9c43eb"
  },
  {
    "url": "assets/js/6.ca2525e2.js",
    "revision": "f26b99a11274e34a1a8df09422012df8"
  },
  {
    "url": "assets/js/60.388db8ce.js",
    "revision": "3063d2cfa71a95c4e7cc07f5704ac309"
  },
  {
    "url": "assets/js/61.347f779c.js",
    "revision": "788cdc07963a42dd1191436447fa5bf8"
  },
  {
    "url": "assets/js/62.cb2526a5.js",
    "revision": "30a127e7e42e67523aae2e530d7eb2cb"
  },
  {
    "url": "assets/js/63.26de1826.js",
    "revision": "cc66bc4b515a809909adb0526ff2ba0f"
  },
  {
    "url": "assets/js/64.cbcdaaef.js",
    "revision": "13f00662497ef7c3bea009d9cc1e3093"
  },
  {
    "url": "assets/js/65.e9fe3e72.js",
    "revision": "5456cf38f2d43967a94bda5be0b15586"
  },
  {
    "url": "assets/js/66.95f7f020.js",
    "revision": "5123574893245627f8a70e58c0568ca2"
  },
  {
    "url": "assets/js/67.f7e06586.js",
    "revision": "086a4e24d4b8974af8891b630660f5a8"
  },
  {
    "url": "assets/js/68.f704aab3.js",
    "revision": "04a5edf5d38df1adb82758a5802177f2"
  },
  {
    "url": "assets/js/69.f0095312.js",
    "revision": "414bc09b5fdd27aed5c2f3101d108ab4"
  },
  {
    "url": "assets/js/7.82bd532b.js",
    "revision": "c19dba387697f94db2c4447476a70f50"
  },
  {
    "url": "assets/js/70.f33088a5.js",
    "revision": "495a2cf0287cb4f7d63878ccb1d1ee8d"
  },
  {
    "url": "assets/js/71.b7244db0.js",
    "revision": "86723026dcd89ee46c63d1cfe91bc6ed"
  },
  {
    "url": "assets/js/72.22d6ea45.js",
    "revision": "f33f2e91254e22d7358842ed06885e41"
  },
  {
    "url": "assets/js/73.245ad28d.js",
    "revision": "c601a3ddf4de650738ad8ea45ab8d6e2"
  },
  {
    "url": "assets/js/74.a8ffeda1.js",
    "revision": "66680091c171654f0fa2d1b68f32ef0f"
  },
  {
    "url": "assets/js/75.839069f1.js",
    "revision": "550a320a1bb7b737b8631123022881bd"
  },
  {
    "url": "assets/js/76.dea7c899.js",
    "revision": "371db48ce4be3a12b15197fc54fbc03b"
  },
  {
    "url": "assets/js/77.17d1aac9.js",
    "revision": "1e7a7f35988a14430f3f81617a86adac"
  },
  {
    "url": "assets/js/78.5fd12489.js",
    "revision": "7770628226f3c5b2272e2e1b2c06a685"
  },
  {
    "url": "assets/js/79.ef58a253.js",
    "revision": "c055efae950dece40cd8d928000ad620"
  },
  {
    "url": "assets/js/8.b21388a2.js",
    "revision": "73df699471babfd8ce03d6a4318a5abd"
  },
  {
    "url": "assets/js/80.1c77573c.js",
    "revision": "513f3e8a8248b2361d89ccf403c2c49a"
  },
  {
    "url": "assets/js/81.619dd0b4.js",
    "revision": "4ca0dd9a07a31376b582225e7fa97629"
  },
  {
    "url": "assets/js/82.1d331671.js",
    "revision": "a46bc954282f24c9283b850f31d54a26"
  },
  {
    "url": "assets/js/83.55008036.js",
    "revision": "bebd8115817f43c6430df332f84fabeb"
  },
  {
    "url": "assets/js/84.6afc8490.js",
    "revision": "822ab2ff3f45ee77cdc5f8069555cbf2"
  },
  {
    "url": "assets/js/85.f590f9aa.js",
    "revision": "f8cefbbb4e61e686dd090742c440daae"
  },
  {
    "url": "assets/js/86.a0117e06.js",
    "revision": "d3c975646059c1683f6b5d7237de120b"
  },
  {
    "url": "assets/js/87.80b73def.js",
    "revision": "23f114a8c50d5c10b62159613a57c962"
  },
  {
    "url": "assets/js/88.fb2a9c91.js",
    "revision": "f33d16d5f13bc12ae4e7d6c3644baed9"
  },
  {
    "url": "assets/js/89.aeadaa2d.js",
    "revision": "cf638b5ddad464f8179711db64787d0a"
  },
  {
    "url": "assets/js/9.13d458ed.js",
    "revision": "98983ed4d52578db065fd908e6b49dc6"
  },
  {
    "url": "assets/js/90.e7dc9269.js",
    "revision": "119411d65e62ea5a0b222f931dd7611a"
  },
  {
    "url": "assets/js/91.4ed6e6d8.js",
    "revision": "bb8078b47257832d7941ac09a262c9f4"
  },
  {
    "url": "assets/js/92.318fbfa3.js",
    "revision": "70a6c2d2f81ac7c3536857ff73d3b941"
  },
  {
    "url": "assets/js/93.55326ea8.js",
    "revision": "002ec128d98d1f9fe7f5630b67381c33"
  },
  {
    "url": "assets/js/94.60f8ede1.js",
    "revision": "af967e41ef48e9bf35f2f7c74d7b4f59"
  },
  {
    "url": "assets/js/app.f7f19d29.js",
    "revision": "b510eba8aff36e87ee43ed8b2464b581"
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
    "revision": "1ac4d8292d88b62dc4710c762d98e807"
  },
  {
    "url": "lesson_01.png",
    "revision": "15931111f2607cdddb4b8d64e7d52d62"
  },
  {
    "url": "pc/index.html",
    "revision": "f647405e28f9bd60671e85bfbabd0451"
  },
  {
    "url": "pc/p-a.html",
    "revision": "6015eef229b89d390c7caa8fd0395f8c"
  },
  {
    "url": "pc/p-b.html",
    "revision": "157177b89637f46dd6ca5d0c5b5fb902"
  },
  {
    "url": "pc/p-c.html",
    "revision": "736475aa2d85b7a9728d5789380fc855"
  },
  {
    "url": "phone/index.html",
    "revision": "232a7c40a3a3beb67ee1f6ddaaaee034"
  },
  {
    "url": "phone/phone-a.html",
    "revision": "15d1d6bf27ea0da7f44b3021eed4a406"
  },
  {
    "url": "phone/phone-b.html",
    "revision": "4c921737479e0c3e01959a0d82fb5fba"
  },
  {
    "url": "phone/phone-c.html",
    "revision": "dbfb449c8be3e9d6e2d91076edc410b1"
  },
  {
    "url": "secondless/index.html",
    "revision": "eb40afe9a459e2ce02bfbe3f581bfe4f"
  },
  {
    "url": "secondless/w-a.html",
    "revision": "9ae086b941788cfb924d2534eaff2c62"
  },
  {
    "url": "secondless/w-a/Date类型：时间和日期.html",
    "revision": "605deb34d9b454d213e8c5ec596e1fed"
  },
  {
    "url": "secondless/w-a/Function类型：函数进阶.html",
    "revision": "ceb6d3337a00cfe8e302422c51e6ac61"
  },
  {
    "url": "secondless/w-a/javascript函数.html",
    "revision": "470d1d7f11d9c5d0a8230ec68109f323"
  },
  {
    "url": "secondless/w-a/javascript基本包装类型.html",
    "revision": "1782d4dfe3f03dfbc88541306799115a"
  },
  {
    "url": "secondless/w-a/javascript基础.html",
    "revision": "7f9356d0e94d98c6de2a83498dffcb4d"
  },
  {
    "url": "secondless/w-a/javascript对象.html",
    "revision": "b71014c0d08dc76ac532510dfb4da9b3"
  },
  {
    "url": "secondless/w-a/javascript数组.html",
    "revision": "d377d52765feb4e665a507ed2ecc42b2"
  },
  {
    "url": "secondless/w-a/javascript运算符.html",
    "revision": "0078f4c61e449b4fb09e2db971f31d4b"
  },
  {
    "url": "secondless/w-a/事件.html",
    "revision": "e4f188ae38cf039b5d43763d7c49f295"
  },
  {
    "url": "secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html",
    "revision": "77f89913df40dad167ae0bd5ab31a50e"
  },
  {
    "url": "secondless/w-a/函数对象数组小结.html",
    "revision": "def87fc1fae751ceb608f34f2c48424a"
  },
  {
    "url": "secondless/w-a/匿名函数和闭包.html",
    "revision": "3db13f190df4c0708950f1069799e279"
  },
  {
    "url": "secondless/w-a/数据Cookie、XML、JSON.html",
    "revision": "5baf971832b5f2d89906d5aa7dbdefc2"
  },
  {
    "url": "secondless/w-a/流程控制语句.html",
    "revision": "91b980ff102cfe6bd6756775b1b6ceac"
  },
  {
    "url": "secondless/w-a/浏览器对象模型BOM及浏览器检测.html",
    "revision": "2834c900029cb1303bfe8c435ebdb339"
  },
  {
    "url": "secondless/w-a/网页文档对象模型DOM.html",
    "revision": "7f3031c1057b7f8065c5180cda8c84f1"
  },
  {
    "url": "secondless/w-a/表单处理及错误处理与调试.html",
    "revision": "67ce4046c76a0cbc7720835cd4cc5071"
  },
  {
    "url": "secondless/w-b.html",
    "revision": "a2faf7be66abeffee57ae8fee7cfd574"
  },
  {
    "url": "secondless/w-b/Ajax.html",
    "revision": "1a2ba56e2b31264cd6b32bd4a822a6cc"
  },
  {
    "url": "secondless/w-b/jQuery.html",
    "revision": "58fb6f354a36ffcbcf0f51ec015ce076"
  },
  {
    "url": "secondless/w-b/jQuery事件、动画、插件.html",
    "revision": "405e25a93ebf8201d9336331c267ffff"
  },
  {
    "url": "secondless/w-b/Node.js.html",
    "revision": "b64a25a9cb46de964fdf7657e3d2b299"
  },
  {
    "url": "secondless/w-b/node.js+vue.js 渲染企业网站.html",
    "revision": "ed98328f6b4a3d4473b0638b5f87b6aa"
  },
  {
    "url": "secondless/w-b/nodejs+jQuery开发留言板.html",
    "revision": "16274f68520bd2185ca3f0b427e7261f"
  },
  {
    "url": "secondless/w-b/nodejs服务器端app.js文件.html",
    "revision": "39bd350067058e258e475ced0e15e417"
  },
  {
    "url": "secondless/w-b/Vue.js.html",
    "revision": "506beb297e1eb947ab9135ec5ded1283"
  },
  {
    "url": "secondless/w-b/封装js库过渡到jQuery.html",
    "revision": "9e726842ec0d664c04f5f577a73789d5"
  },
  {
    "url": "secondless/w-b/正则表达式.html",
    "revision": "4cd42caa489871eebf4b45d874375c64"
  },
  {
    "url": "secondless/w-b/面向对象与原型.html",
    "revision": "a9ef5dd09e236d90e83c5181715bde2e"
  },
  {
    "url": "secondless/w-c.html",
    "revision": "51e481f4141330fccb46d9317a7551f3"
  },
  {
    "url": "secondless/w-c/Egg.js.html",
    "revision": "bcd5aaff5db54e18974e69653909faaa"
  },
  {
    "url": "secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html",
    "revision": "ab2f707f0dec2460f8f069a0e4c1840d"
  },
  {
    "url": "secondless/w-c/egg.js基础总结.html",
    "revision": "a42337ab62990abcb775d107d180a6d4"
  },
  {
    "url": "secondless/w-c/egg.js重要知识详细文档.html",
    "revision": "1f1b4d3d02829b5e8cd7123baf38657f"
  },
  {
    "url": "secondless/w-c/eggjs+postman测试工具将留言写入json文件.html",
    "revision": "5d35fc3bc92527dc4f27c7bbbb899409"
  },
  {
    "url": "secondless/w-c/mysql数据库.html",
    "revision": "db5f88f6b05ca88c91c891fe0490299f"
  },
  {
    "url": "secondless/w-c/ValParams API 说明.html",
    "revision": "465e89c16644277e60e86f3825c7fc12"
  },
  {
    "url": "secondless/w-c/上传文件.html",
    "revision": "1c4447c88a4c8b194d72b1a8c095865d"
  },
  {
    "url": "secondless/w-c/响应式后台公共模版.html",
    "revision": "886f04fa89c0a3aea1f816a8770a5909"
  },
  {
    "url": "secondless/w-c/响应式后台用户留言板管理.html",
    "revision": "33c898a3a8ad89f193c8ae7f7ac61a66"
  },
  {
    "url": "secondless/w-c/响应式后台界面示例代码.html",
    "revision": "7dd5c738b575b2731ca79b766eaa42ac"
  },
  {
    "url": "secondless/w-c/响应式后台管理员登录.html",
    "revision": "779989a3ba595df072f54f551a1f43f7"
  },
  {
    "url": "secondless/w-c/响应式后台管理系统.html",
    "revision": "13a5dc0e55bf706c86b926859505c9f9"
  },
  {
    "url": "secondless/w-c/响应式网页布局.html",
    "revision": "5eee00baf04e5e375d4e4d3510f9f86f"
  },
  {
    "url": "secondless/w-c/响应式网页布局指导思路.html",
    "revision": "e1ab2c5de25afaf51e7383c5985cd934"
  },
  {
    "url": "secondless/w-c/直播功能中的用户表liveuser.html",
    "revision": "2b5b2c13e6ba87525890283ee2a70b19"
  },
  {
    "url": "secondless/w-c/直播功能中的直播间表live.html",
    "revision": "7959b1310d7271edbafa04eb2d9bb7f7"
  },
  {
    "url": "secondless/w-c/直播功能中的礼物表livegift.html",
    "revision": "707fba03109b10b2504b78715d7f66e4"
  },
  {
    "url": "secondless/w-c/直播功能中的订单表liveorder.html",
    "revision": "e98aff8b137831fcb0ed5f645945ba42"
  },
  {
    "url": "web/bootstrap/index.html",
    "revision": "7158a4f177522c4656fa623a4e1bf649"
  },
  {
    "url": "web/css/index.html",
    "revision": "50709fda3bdba35b00bc0ad1f2d2083e"
  },
  {
    "url": "web/css/封装的css样式库.html",
    "revision": "a0b51dd4ed2e60be3df1b1e8f28f85ff"
  },
  {
    "url": "web/echarts/index.html",
    "revision": "8668e17d50d28e228f889643f1b4d811"
  },
  {
    "url": "web/github/index.html",
    "revision": "b070a3f2c5c50db760c97a680fa688f5"
  },
  {
    "url": "web/IIS/index.html",
    "revision": "9a7f9b7f1c3e1b08f8295fafd1c39172"
  },
  {
    "url": "web/index.html",
    "revision": "17759e944a10295bb2afb43c852d6b99"
  },
  {
    "url": "web/methods/地图相关.html",
    "revision": "331b2530bbad4165394286ca6c227fe6"
  },
  {
    "url": "web/methods/定位相关.html",
    "revision": "a16945f47a869f94b740d635f8b56c43"
  },
  {
    "url": "web/methods/实用接口.html",
    "revision": "82343096f26814a4e88ca8eb3ea93c74"
  },
  {
    "url": "web/mysql/index.html",
    "revision": "52a3c6b767ec1688497e3237d7567cc9"
  },
  {
    "url": "web/software/index.html",
    "revision": "bd11b2542d15bd5d3a0604429060b3ec"
  },
  {
    "url": "web/Vanta.js/index.html",
    "revision": "d22b94a9668ede76c86b5e9f2871ce7a"
  },
  {
    "url": "web/vue.js/index.html",
    "revision": "d127b06a6d4b7676d488098f79adc707"
  },
  {
    "url": "web/Vue3+ElementPlus/index.html",
    "revision": "49e091e170ddc2c068eff464d6144bd6"
  },
  {
    "url": "web/w-a.html",
    "revision": "e605c32f1e8b33685e79ea1b04edde9e"
  },
  {
    "url": "web/w-b.html",
    "revision": "cedaee6f114d2cf4650af468114a9b90"
  },
  {
    "url": "web/w-c.html",
    "revision": "d0fccfa90910776b601dc4075fc2bd83"
  },
  {
    "url": "开发记录.html",
    "revision": "92904c07e19b019319af778b005540fa"
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
