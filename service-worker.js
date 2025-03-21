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
    "revision": "7d2ef3e413842a63aad41c9c18589be9"
  },
  {
    "url": "about.html",
    "revision": "ec36886f0ca13e4720834b153a604739"
  },
  {
    "url": "about/index.html",
    "revision": "d51b9f967734bc8b04defa54d161b430"
  },
  {
    "url": "aboutless.html",
    "revision": "8de5b713dd183ee4fd696f1f629dc77a"
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
    "url": "assets/js/100.2f39a294.js",
    "revision": "ce756d6dbb79ba9dc1992e56d47b0eb3"
  },
  {
    "url": "assets/js/101.cf1ddd44.js",
    "revision": "71503618509fcfb3a0e7fcacca74d76e"
  },
  {
    "url": "assets/js/102.94abd55e.js",
    "revision": "554f47b4838107d08d183d8e0d1a91fb"
  },
  {
    "url": "assets/js/103.f5dcfa54.js",
    "revision": "4519721229fda720795d5db52f75d977"
  },
  {
    "url": "assets/js/104.dfe06a18.js",
    "revision": "3a5d0a6951af80c595f94931ea7776d4"
  },
  {
    "url": "assets/js/105.7d355042.js",
    "revision": "71faf66df79008fda557077b0c6aedb0"
  },
  {
    "url": "assets/js/106.b3a5fefa.js",
    "revision": "6b66f05e83c24e7546ae65f22f2f41cc"
  },
  {
    "url": "assets/js/107.1b16212b.js",
    "revision": "8ce66a8ff75193a27715815e1ffac5cd"
  },
  {
    "url": "assets/js/108.6f25f445.js",
    "revision": "cc1866346a13c33636c0295adecac7db"
  },
  {
    "url": "assets/js/109.8eb191b6.js",
    "revision": "2182e07c13b6097cbe5121d0fa87cbab"
  },
  {
    "url": "assets/js/11.c25143f0.js",
    "revision": "5360ead97ce98bd7be05a421e9f4dd21"
  },
  {
    "url": "assets/js/110.c110501e.js",
    "revision": "76c683a6afcc338db1c0b2a60131c493"
  },
  {
    "url": "assets/js/111.b6eb5555.js",
    "revision": "0f311be47489e6253273e4d9ba14f8fd"
  },
  {
    "url": "assets/js/112.6ce48efc.js",
    "revision": "bd3f7bd1068f7bb3522d2ec4dc3304f0"
  },
  {
    "url": "assets/js/113.eaea1310.js",
    "revision": "59f68cbfa4354ab46412db325e9acca0"
  },
  {
    "url": "assets/js/114.c1d150fe.js",
    "revision": "62c2da6ea8989c65cb3ceff549500df2"
  },
  {
    "url": "assets/js/115.87fd471d.js",
    "revision": "a62a315d2974fe1fbf1fe319dfc82ea0"
  },
  {
    "url": "assets/js/116.fa5f311b.js",
    "revision": "4b19056ae028ffc3f428d7d8cd188c54"
  },
  {
    "url": "assets/js/117.bae9f803.js",
    "revision": "a62cf2b93b1735f9f3b05af8e14ca15f"
  },
  {
    "url": "assets/js/118.7a62de4e.js",
    "revision": "4f853449cb408f2ca487bbf3b94a6b1d"
  },
  {
    "url": "assets/js/119.1b68d7aa.js",
    "revision": "d43c66981473d08940828ac4922e0696"
  },
  {
    "url": "assets/js/12.cc2380d1.js",
    "revision": "db2bbf818f1a04422508866c29849f49"
  },
  {
    "url": "assets/js/120.9fe71e4a.js",
    "revision": "60b33cbd8aca4608e6dc78cfb440a795"
  },
  {
    "url": "assets/js/121.1d5ef470.js",
    "revision": "7d92443b9f1ec62c593563144647e166"
  },
  {
    "url": "assets/js/122.8946ec68.js",
    "revision": "0f330a18e765d3bb0330c364af68b917"
  },
  {
    "url": "assets/js/123.66302d3e.js",
    "revision": "4e32e8b99f0f80457de8556f25c1e9ed"
  },
  {
    "url": "assets/js/124.52f48b83.js",
    "revision": "5c4a7175cd61d924ec7c2670ab133652"
  },
  {
    "url": "assets/js/125.a24a1407.js",
    "revision": "0f3dc80089de8ffa1ca61d9959de0fd7"
  },
  {
    "url": "assets/js/126.a40f284e.js",
    "revision": "d99828bf6de099cc666eaef9f26e8865"
  },
  {
    "url": "assets/js/127.8b944ed2.js",
    "revision": "bba4bde043f743065a431a7e5bc926eb"
  },
  {
    "url": "assets/js/128.27551681.js",
    "revision": "cecbe8ca4b58451597e88cf182c3562f"
  },
  {
    "url": "assets/js/129.ca0f7579.js",
    "revision": "89b17b34f69cef64aeb6b25efce222f3"
  },
  {
    "url": "assets/js/13.ef6d162d.js",
    "revision": "21cddb9f6e962d22f6c118b198f4289b"
  },
  {
    "url": "assets/js/130.2b133134.js",
    "revision": "abe2d5acb67f5e9f2c63ef8b195d0baa"
  },
  {
    "url": "assets/js/131.b3f53b59.js",
    "revision": "86785924ac5ad21bfd3029477a65a143"
  },
  {
    "url": "assets/js/132.66ce9edf.js",
    "revision": "f9302a0f4d6dd5f4d80eb88e38a6072d"
  },
  {
    "url": "assets/js/133.2a18bf10.js",
    "revision": "027b733e7ef5546edae767d2275bfc0a"
  },
  {
    "url": "assets/js/134.ef98e880.js",
    "revision": "a1641f1cbfc06b64670fa407ed9f90d6"
  },
  {
    "url": "assets/js/135.d8e27f96.js",
    "revision": "7b5633910aa73bd6a6595bc8e97eb086"
  },
  {
    "url": "assets/js/136.9ddab605.js",
    "revision": "4f5ee0d1053427fd13aadb7f37e35481"
  },
  {
    "url": "assets/js/137.e41c6dd7.js",
    "revision": "274b3cdec0cc9bb6ebc12ae77247e5e0"
  },
  {
    "url": "assets/js/138.52b7e860.js",
    "revision": "a0882569d7c02ba947b4c4a4b0194dc0"
  },
  {
    "url": "assets/js/14.a1283673.js",
    "revision": "d57bcfde9a9e52b46bf320f2957ce3a9"
  },
  {
    "url": "assets/js/15.c03dde2b.js",
    "revision": "72fdd251d07e54b194b8e612f6229e64"
  },
  {
    "url": "assets/js/16.0dc34bb3.js",
    "revision": "8b73b32165cc0d1f77005b92c770e0e6"
  },
  {
    "url": "assets/js/17.0e4cf41a.js",
    "revision": "6e47ea04656707e45786772d827229d9"
  },
  {
    "url": "assets/js/18.117a998d.js",
    "revision": "129ed265eeaef08564540077cf552ef0"
  },
  {
    "url": "assets/js/19.0659f3a3.js",
    "revision": "ef8b16cff304a7ca6fd2026b039c990b"
  },
  {
    "url": "assets/js/2.6281e0bb.js",
    "revision": "6953100b4156b74d48f76069058a12a9"
  },
  {
    "url": "assets/js/20.881f751c.js",
    "revision": "d98cf3e447cfdc45ff39c1caffabd674"
  },
  {
    "url": "assets/js/21.fd9a1f9f.js",
    "revision": "8dc887c18a2883d6556d69e772156f45"
  },
  {
    "url": "assets/js/22.4f388a6b.js",
    "revision": "bc0a5d1ae38de77176cb7468b68ff415"
  },
  {
    "url": "assets/js/23.4f02d28f.js",
    "revision": "fd7fbacce77ce543adbcd54a02261542"
  },
  {
    "url": "assets/js/24.c936c85f.js",
    "revision": "8d2c42f8bc348e44a9bf649004c990dc"
  },
  {
    "url": "assets/js/25.0075fbac.js",
    "revision": "6edbf3f65c1ab9e8df8829628f0b20b3"
  },
  {
    "url": "assets/js/26.09aaf4be.js",
    "revision": "9d540086f83a59030cb7c6e19726111e"
  },
  {
    "url": "assets/js/27.a59bf3bc.js",
    "revision": "62f8b67666b3cd718ceb4467aa7a920f"
  },
  {
    "url": "assets/js/28.ca86d3dc.js",
    "revision": "8737d38bec91a652feb73043a8ba7a92"
  },
  {
    "url": "assets/js/29.5ffecdda.js",
    "revision": "1fe7e50c5e370146883b551cd10d8cbb"
  },
  {
    "url": "assets/js/3.e6827fa8.js",
    "revision": "f1ffa92e22c7370c76abfc2cdb906d17"
  },
  {
    "url": "assets/js/30.d3d10ca8.js",
    "revision": "200e1104c6539f252e8b413efed7ef4a"
  },
  {
    "url": "assets/js/31.e44e9ac7.js",
    "revision": "c1b093ce0a52f4e72cc54d1f34062424"
  },
  {
    "url": "assets/js/32.be723071.js",
    "revision": "38c4e2ec5ea3ca1978c95037a1324711"
  },
  {
    "url": "assets/js/33.d9fad4fc.js",
    "revision": "ce12efa0becf5e0ace07b190d806e906"
  },
  {
    "url": "assets/js/34.498890ae.js",
    "revision": "29648ffc48efff5a96032f2be15918ba"
  },
  {
    "url": "assets/js/35.b40ecffc.js",
    "revision": "9da367a48f20ca2c0298051be7e58789"
  },
  {
    "url": "assets/js/36.02bd5a88.js",
    "revision": "b5ecf4702b99b8cada5a44314c50ee8c"
  },
  {
    "url": "assets/js/37.687609a5.js",
    "revision": "260f497ef0345c1b68935ea68dbca342"
  },
  {
    "url": "assets/js/38.c2287f8f.js",
    "revision": "12d122f84fbe4113882992f8d3f7d0aa"
  },
  {
    "url": "assets/js/39.22d754ad.js",
    "revision": "24fa7cd6377e6260e10b7192dd478087"
  },
  {
    "url": "assets/js/4.4f4e4f68.js",
    "revision": "0cc73707c43033f0f436cb95158a3993"
  },
  {
    "url": "assets/js/40.9af698d9.js",
    "revision": "0d37fcf0578e02dd8ce7647f58e5c4a2"
  },
  {
    "url": "assets/js/41.19c5e471.js",
    "revision": "07120196fff860819047b39b70bb41ee"
  },
  {
    "url": "assets/js/42.9e14c87d.js",
    "revision": "f95b04c41f0048239df46f61fd908f4a"
  },
  {
    "url": "assets/js/43.05e60892.js",
    "revision": "c57e2e7a03a0f5ab3d9533511652e52b"
  },
  {
    "url": "assets/js/44.fb9afaa5.js",
    "revision": "33f29a7c4b88f345ef59e46277aa7d86"
  },
  {
    "url": "assets/js/45.1855be6b.js",
    "revision": "8a2a54c4d43bf2bf90e4e6bf10f91a4d"
  },
  {
    "url": "assets/js/46.58d2b35e.js",
    "revision": "1dae573e7c82c036b32f17e5b6e7c6f9"
  },
  {
    "url": "assets/js/47.ae23db72.js",
    "revision": "22a3e22a156404d31b943b824dc83f1a"
  },
  {
    "url": "assets/js/48.19e39936.js",
    "revision": "1dc4938e233538d80d3bf6f690e94369"
  },
  {
    "url": "assets/js/49.419bd585.js",
    "revision": "f21b549fd30789ec01f4d8102676b96f"
  },
  {
    "url": "assets/js/5.3e24e7be.js",
    "revision": "bb8330fc3b00684c0b46c0c7ade9634a"
  },
  {
    "url": "assets/js/50.32c78beb.js",
    "revision": "a689478daeb7b3375fe3f77b30a26c37"
  },
  {
    "url": "assets/js/51.f1d9e094.js",
    "revision": "b1d29135002d794aa0d422cc193cd994"
  },
  {
    "url": "assets/js/52.995e18d2.js",
    "revision": "b8d8ef9b3a0e370c9b798301ee1e8418"
  },
  {
    "url": "assets/js/53.94c712e2.js",
    "revision": "01eed9aa10f361cdc050cce3f2889774"
  },
  {
    "url": "assets/js/54.9a590a96.js",
    "revision": "df21be41824bacc79ac0544756da5964"
  },
  {
    "url": "assets/js/55.51872c55.js",
    "revision": "93fa77b8610ca6956bc1cbfde5028d6a"
  },
  {
    "url": "assets/js/56.08257419.js",
    "revision": "80306ffa36bba3f40f09d8228f0c02c6"
  },
  {
    "url": "assets/js/57.7eb001c2.js",
    "revision": "ebda7750403099d4bcb6c552b5d2f9c5"
  },
  {
    "url": "assets/js/58.0d673779.js",
    "revision": "f6c21049ee60c561e7dbef7d159dc48d"
  },
  {
    "url": "assets/js/59.5e816e6e.js",
    "revision": "804973145f61f523818965975646e58e"
  },
  {
    "url": "assets/js/6.ca2525e2.js",
    "revision": "f26b99a11274e34a1a8df09422012df8"
  },
  {
    "url": "assets/js/60.6f578d20.js",
    "revision": "9cdfc54a5c161e58826c6ae0dd3888a3"
  },
  {
    "url": "assets/js/61.8963ddb4.js",
    "revision": "5c8534ac266dbbb8d7d05a275933b441"
  },
  {
    "url": "assets/js/62.2a913cf3.js",
    "revision": "4921ac1ef1059c138fcaef0fdf8f46e8"
  },
  {
    "url": "assets/js/63.8f976d38.js",
    "revision": "f5e5e886f6abc53e47ddc1fcbf4dcaf2"
  },
  {
    "url": "assets/js/64.70594d7f.js",
    "revision": "d59182b97d92e35eb5bc6d3386de7b24"
  },
  {
    "url": "assets/js/65.284ac6a6.js",
    "revision": "1ac0f9c22f160c663f2f0700404cca15"
  },
  {
    "url": "assets/js/66.dfe889bb.js",
    "revision": "1b05023506fc65e7e152b0d96352d620"
  },
  {
    "url": "assets/js/67.f84f8baa.js",
    "revision": "b1b97e9b8a0d9babbd8c1de02a084892"
  },
  {
    "url": "assets/js/68.28be2748.js",
    "revision": "9dd6992a5b4d2d17594d14cd4fa78e4f"
  },
  {
    "url": "assets/js/69.b585ae81.js",
    "revision": "d3abb9cc7330391e63e50d13b010252d"
  },
  {
    "url": "assets/js/7.4e396f6d.js",
    "revision": "c3c6f0fa30db2cc488c4f0227728daf8"
  },
  {
    "url": "assets/js/70.68e46ae9.js",
    "revision": "1992258b141f2bfd71002477e81b95bf"
  },
  {
    "url": "assets/js/71.48dec427.js",
    "revision": "6634c644ee02387d138f7630243b51d4"
  },
  {
    "url": "assets/js/72.d4ebf240.js",
    "revision": "4264723fefd6633f4e42ee3d463923b0"
  },
  {
    "url": "assets/js/73.eac6258b.js",
    "revision": "f5fc0fcc6e17f2c4ab4fa1ba0f500d60"
  },
  {
    "url": "assets/js/74.b04a701a.js",
    "revision": "c912c9a94052a22ede1552b819bbb076"
  },
  {
    "url": "assets/js/75.3566348b.js",
    "revision": "99bf1f18757a53d870a9de1a423a063c"
  },
  {
    "url": "assets/js/76.1fb50c87.js",
    "revision": "2377eee0607d469347b4d371d4d5fc00"
  },
  {
    "url": "assets/js/77.ff23398d.js",
    "revision": "6a2c6da0b7911d5bc929afdfa51d9ed7"
  },
  {
    "url": "assets/js/78.ab4d8a62.js",
    "revision": "dbb0d824f738825055925b0c7116cf65"
  },
  {
    "url": "assets/js/79.367c5f3f.js",
    "revision": "b99801771ca79d34ce85ba382c9a6a00"
  },
  {
    "url": "assets/js/8.a242fc26.js",
    "revision": "2f5b743cb10ef44e9b2d7ed6d8a65b9b"
  },
  {
    "url": "assets/js/80.15c8c6ca.js",
    "revision": "9a4327b1e6feca5753f7438323cd4a42"
  },
  {
    "url": "assets/js/81.f71ebb4e.js",
    "revision": "4f04c3534e6b62fa02f3db35a041f05d"
  },
  {
    "url": "assets/js/82.bdf07ce4.js",
    "revision": "3b240edf86001f77f2d86e682db081d3"
  },
  {
    "url": "assets/js/83.b2fdd2eb.js",
    "revision": "42a802304d9d8389d85a88421a18e419"
  },
  {
    "url": "assets/js/84.297d46b5.js",
    "revision": "e010847c57fb7950a33ee78892c33d55"
  },
  {
    "url": "assets/js/85.b1cb790c.js",
    "revision": "141ab9f89ec6be6d41eeb8255c745f60"
  },
  {
    "url": "assets/js/86.a2e03efc.js",
    "revision": "816ee0dfdf23254b69f1c70ec49f1c83"
  },
  {
    "url": "assets/js/87.e483ff2e.js",
    "revision": "939f4a0828e87e2fd75f2812423311fb"
  },
  {
    "url": "assets/js/88.1a84430f.js",
    "revision": "e6a6f164aeae93941880f3cd7f28359a"
  },
  {
    "url": "assets/js/89.38f2d86a.js",
    "revision": "513ae5df5255c7baac834e311d8fddbf"
  },
  {
    "url": "assets/js/9.13d458ed.js",
    "revision": "98983ed4d52578db065fd908e6b49dc6"
  },
  {
    "url": "assets/js/90.908c859e.js",
    "revision": "ae1667a66c129c63b42cee43e16ff0b3"
  },
  {
    "url": "assets/js/91.a0d5f9d2.js",
    "revision": "43e3dc44ffe05fc6d45cf8a89286356e"
  },
  {
    "url": "assets/js/92.0213599e.js",
    "revision": "e2f621409b3c7e994830c5f9861eec74"
  },
  {
    "url": "assets/js/93.d7628455.js",
    "revision": "57d6b3282edf072798d13e45185061e4"
  },
  {
    "url": "assets/js/94.47fd4f8d.js",
    "revision": "d45e60c88fed9f5f3064156b5e9d2e58"
  },
  {
    "url": "assets/js/95.72de35fe.js",
    "revision": "0eba481f02e2ecf52943ddfa5c6ada55"
  },
  {
    "url": "assets/js/96.727a9898.js",
    "revision": "75927e3f5f460fdcacde6c3d35235845"
  },
  {
    "url": "assets/js/97.b7b66d2a.js",
    "revision": "c55e7a40b05b0b016798424d762417cd"
  },
  {
    "url": "assets/js/98.d3ad782a.js",
    "revision": "afa4983435ff94d5d4e26c4e13e0f2f5"
  },
  {
    "url": "assets/js/99.6be54a11.js",
    "revision": "1890b39ebbac0ddd8c1b6fb56770b8ec"
  },
  {
    "url": "assets/js/app.38b1cc60.js",
    "revision": "6aae197bb1c434dc27d866a448f8f8cc"
  },
  {
    "url": "deploy/eggjs.chat.html",
    "revision": "86d3095f4de11c4c555d6046c39bec60"
  },
  {
    "url": "deploy/index.html",
    "revision": "6dcd1b2ab66e0af95c8651e495ad7e3a"
  },
  {
    "url": "deploy/vitevue3.shop.html",
    "revision": "08b8b4d3d42a422892c03c19299e979b"
  },
  {
    "url": "deploy/vuecli.shop.html",
    "revision": "c486b196fec0023512ffa39d065fb6fe"
  },
  {
    "url": "fourthless/index.html",
    "revision": "bd35b3772ba9a2ceea8d5ec98e42d638"
  },
  {
    "url": "fourthless/w-a.html",
    "revision": "0dffdca9cc0d14f52b14e78c810ffc2a"
  },
  {
    "url": "fourthless/w-a/02开发前环境搭建.html",
    "revision": "cddbf96b446a52556b0a7b04f346246c"
  },
  {
    "url": "fourthless/w-a/eggjs框架开发文档.html",
    "revision": "4cbb399567b7bc17e6d7bf9382ab7f86"
  },
  {
    "url": "fourthless/w-a/thinkphp.修改管理员.html",
    "revision": "c1a97c2535e737ea0eb71b02b55b22b5"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员列表.html",
    "revision": "dba3c79b6724647bdb9e223699a4d2bb"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员板块.html",
    "revision": "2cafae71d7a966b941b91743b9e5b4b8"
  },
  {
    "url": "fourthless/w-a/thinkphp框架开发文档.html",
    "revision": "1e177188481a3c1c3663bf7e9186cf34"
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
    "revision": "e32e05f46b632ee9ce067711f8ead857"
  },
  {
    "url": "pc/index.html",
    "revision": "862de6a29fc76b33d7d13c4ea2612b5e"
  },
  {
    "url": "pc/p-a.html",
    "revision": "64001ea52ad1f67ab381d6b8ecb3bb39"
  },
  {
    "url": "pc/p-b.html",
    "revision": "27cd3baf9b4236ecc004c4a2f092b39d"
  },
  {
    "url": "pc/p-c.html",
    "revision": "abc2682eba5716de6ff95f8dd94f4599"
  },
  {
    "url": "phone/index.html",
    "revision": "afafba567eaeea0cd364f26d42c4f6f1"
  },
  {
    "url": "phone/phone-a.html",
    "revision": "c35fe2488b40d0777176fb5090ce3c5f"
  },
  {
    "url": "phone/phone-b.html",
    "revision": "b9ed0aa8aa452c6598b40cad053da0ce"
  },
  {
    "url": "phone/phone-c.html",
    "revision": "b8d44cdb6300d4ae4ad88bd71c1fa65a"
  },
  {
    "url": "secondless/index.html",
    "revision": "9a463498d321812a67fc693e6d9a2b13"
  },
  {
    "url": "secondless/w-a.html",
    "revision": "2b24154a33e7e53efe0dc50adb565919"
  },
  {
    "url": "secondless/w-a/Date类型：时间和日期.html",
    "revision": "ed87822a01b314d6427beb66ea191317"
  },
  {
    "url": "secondless/w-a/Function类型：函数进阶.html",
    "revision": "dc613b1c083128a4f366e118264961c4"
  },
  {
    "url": "secondless/w-a/javascript函数.html",
    "revision": "6e461624bd3c17ed415c16f0e9656993"
  },
  {
    "url": "secondless/w-a/javascript基本包装类型.html",
    "revision": "97b28f7061636525f64e98b7e95f83dc"
  },
  {
    "url": "secondless/w-a/javascript基础.html",
    "revision": "aac419805b98b078d63b14637a6e1f04"
  },
  {
    "url": "secondless/w-a/javascript对象.html",
    "revision": "9309009b97340d281a3e1cc7a1730fa1"
  },
  {
    "url": "secondless/w-a/javascript数组.html",
    "revision": "78d7a2f63974f59e7a2250239f4213ec"
  },
  {
    "url": "secondless/w-a/javascript运算符.html",
    "revision": "a6041bddbd93eb3aee59ae212ef09627"
  },
  {
    "url": "secondless/w-a/事件.html",
    "revision": "19885dd70993b3be3609c77678ad6df2"
  },
  {
    "url": "secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html",
    "revision": "581f0f45206fdeba00e02ad186f4c4e3"
  },
  {
    "url": "secondless/w-a/函数对象数组小结.html",
    "revision": "9d92f98d6d0d440d79576e6582450e1a"
  },
  {
    "url": "secondless/w-a/匿名函数和闭包.html",
    "revision": "4edb0f5747a4ed011863cd82d56d13a6"
  },
  {
    "url": "secondless/w-a/数据Cookie、XML、JSON.html",
    "revision": "865ed7a8e85a39e9127fcc73d138f1e9"
  },
  {
    "url": "secondless/w-a/流程控制语句.html",
    "revision": "c987daac86f383edc260b49a2a9b0155"
  },
  {
    "url": "secondless/w-a/浏览器对象模型BOM及浏览器检测.html",
    "revision": "9c554abf11ba947a1130ad37f8e15773"
  },
  {
    "url": "secondless/w-a/网页文档对象模型DOM.html",
    "revision": "6d3e82dad6580dfca2b66a3817f0d425"
  },
  {
    "url": "secondless/w-a/表单处理及错误处理与调试.html",
    "revision": "8eafaf4434321bd9ded0115909dcf627"
  },
  {
    "url": "secondless/w-b.html",
    "revision": "77bf4cb36e971b585d301e3e45fdc316"
  },
  {
    "url": "secondless/w-b/Ajax.html",
    "revision": "b09669328fdb6cd926a2e00aa9fda0e0"
  },
  {
    "url": "secondless/w-b/jQuery.html",
    "revision": "8cb640681c4011a43012dc9f928a113e"
  },
  {
    "url": "secondless/w-b/jQuery事件、动画、插件.html",
    "revision": "2503c8e67a16f969e221df17257155ae"
  },
  {
    "url": "secondless/w-b/Node.js.html",
    "revision": "4e9efb55671a9de872a6ccbfbd7ac122"
  },
  {
    "url": "secondless/w-b/node.js+vue.js 渲染企业网站.html",
    "revision": "98aa333479dc98088aca8712d5ffb3ae"
  },
  {
    "url": "secondless/w-b/nodejs+jQuery开发留言板.html",
    "revision": "faf9b0fdd0b2087b0a730af7446afe18"
  },
  {
    "url": "secondless/w-b/nodejs服务器端app.js文件.html",
    "revision": "3c801e83439a70e42f6f97e775111ba5"
  },
  {
    "url": "secondless/w-b/Vue.js.html",
    "revision": "b9670683fcb2ea5f65e3bad68bb804c5"
  },
  {
    "url": "secondless/w-b/封装js库过渡到jQuery.html",
    "revision": "39dd454c1215095789720e329ad8fef8"
  },
  {
    "url": "secondless/w-b/正则表达式.html",
    "revision": "1f6440023e652e44c52a17b4362afb44"
  },
  {
    "url": "secondless/w-b/面向对象与原型.html",
    "revision": "6ea4ea7a8c9e98d32b9bedbe6f6a14e5"
  },
  {
    "url": "secondless/w-c.html",
    "revision": "09253f99aa3f3f11c01c8bd229093fbd"
  },
  {
    "url": "secondless/w-c/Egg.js.html",
    "revision": "4fdd7d4c0818fb64b5c003ecfadc45a9"
  },
  {
    "url": "secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html",
    "revision": "f315dff283809f48ccb403ff6a6fc0df"
  },
  {
    "url": "secondless/w-c/egg.js基础总结.html",
    "revision": "421872eaab50c0796a073198add3d6cc"
  },
  {
    "url": "secondless/w-c/egg.js重要知识详细文档.html",
    "revision": "880b1e2577dc25ab02282239f7bcf028"
  },
  {
    "url": "secondless/w-c/eggjs+postman测试工具将留言写入json文件.html",
    "revision": "19317815b0f1c70c65e0ccd9910643bb"
  },
  {
    "url": "secondless/w-c/mysql数据库.html",
    "revision": "c331fbb2514bef0b0174aa72fb47f637"
  },
  {
    "url": "secondless/w-c/ValParams API 说明.html",
    "revision": "4940e591546c6d45ff816d9eecde2c5f"
  },
  {
    "url": "secondless/w-c/上传文件.html",
    "revision": "846c212b5392f353ffe7e27f87645a0a"
  },
  {
    "url": "secondless/w-c/企业网站其它页面(非首页).html",
    "revision": "4c00e3fa2591a6ad2d910b6dc19c2a96"
  },
  {
    "url": "secondless/w-c/企业网站前端部分.html",
    "revision": "4bcd8ae3c2b7adb6eb0f75cf1b026770"
  },
  {
    "url": "secondless/w-c/企业网站后台内容管理.html",
    "revision": "33566225b1ee2d9c6463e4146ab39275"
  },
  {
    "url": "secondless/w-c/企业网站后台栏目管理.html",
    "revision": "685d9e5032b9a004b5adad183631ed40"
  },
  {
    "url": "secondless/w-c/企业网站首页.html",
    "revision": "6fb363ee982f701b6656ee5d9c3e9ecb"
  },
  {
    "url": "secondless/w-c/响应式后台公共模版.html",
    "revision": "e85fd9cb08ffc927ca765a947bea1f6c"
  },
  {
    "url": "secondless/w-c/响应式后台用户留言板管理.html",
    "revision": "feec2dd29dc577152278790fbe07d37c"
  },
  {
    "url": "secondless/w-c/响应式后台界面示例代码.html",
    "revision": "689a59967a1265d39230f46fdec46517"
  },
  {
    "url": "secondless/w-c/响应式后台管理员登录.html",
    "revision": "be0ab92dc5f30724bc0b791547e8fcf1"
  },
  {
    "url": "secondless/w-c/响应式后台管理系统.html",
    "revision": "4b4cc4f180bcf9ba6d9b02a6c917a028"
  },
  {
    "url": "secondless/w-c/响应式网页布局.html",
    "revision": "57a9b1d40f128bdd44ff7a85e31cb195"
  },
  {
    "url": "secondless/w-c/响应式网页布局指导思路.html",
    "revision": "f73a3608a1283bc19d06b2f13c8079f1"
  },
  {
    "url": "secondless/w-c/树形结构方法演变.html",
    "revision": "4a4dd4cd0099d17e7cfea8fa3db9c3f7"
  },
  {
    "url": "secondless/w-c/直播功能中的用户表liveuser.html",
    "revision": "ce2daaa638522061114300d0aa81e9fd"
  },
  {
    "url": "secondless/w-c/直播功能中的直播间表live.html",
    "revision": "7a260baec6383043161b0d7a755fd143"
  },
  {
    "url": "secondless/w-c/直播功能中的礼物表livegift.html",
    "revision": "dc44321bacf73546cca8365254aea546"
  },
  {
    "url": "secondless/w-c/直播功能中的订单表liveorder.html",
    "revision": "c90e3c3627eb67552a6ff985947b1a11"
  },
  {
    "url": "secondless/w-c/网站后台管理员简单权限分配功能实现.html",
    "revision": "4a5e7248995b0d40c0addc7dbfeee028"
  },
  {
    "url": "secondless/w-d.html",
    "revision": "c184fdb05c02784aecaf3953249572dc"
  },
  {
    "url": "secondless/w-d/SSL证书.html",
    "revision": "2bbae87532382df776417887b067ab92"
  },
  {
    "url": "secondless/w-d/网站代码上线调试.html",
    "revision": "a06b060c03303980e5d9c5441489dbaa"
  },
  {
    "url": "secondless/w-d/购买域名.html",
    "revision": "d9679cb35c6caa6ee80b34582dd0b129"
  },
  {
    "url": "secondless/w-d/购买服务器.html",
    "revision": "db5b1ff332dadb2d83e8a821624c5a9d"
  },
  {
    "url": "thirdless/index.html",
    "revision": "6c96db82aab612e69443087b20237925"
  },
  {
    "url": "thirdless/w-a.html",
    "revision": "9b8280bfd7a94b8f4aa734ad231067c4"
  },
  {
    "url": "thirdless/w-a/02开发前环境搭建.html",
    "revision": "64037694622e7b48b3b4eb3dac76f970"
  },
  {
    "url": "thirdless/w-a/03引入UI框架及进行全局配置.html",
    "revision": "cb3c1e233f8f7d1d9b2e838dffb63948"
  },
  {
    "url": "thirdless/w-a/04首页开发.html",
    "revision": "d4a2be3a9f1eaf86dbbc708e782a67a5"
  },
  {
    "url": "thirdless/w-a/05其它界面开发.html",
    "revision": "c6fed502705ebd4ebb621336c94d05e3"
  },
  {
    "url": "thirdless/w-a/06数据处理.html",
    "revision": "0ed850356f50ad1b7da58cbc223952ac"
  },
  {
    "url": "thirdless/w-a/07后端api开发.html",
    "revision": "3fc5e46acc3bc27e6482c3441c4d8990"
  },
  {
    "url": "thirdless/w-a/07后端api开发代码.html",
    "revision": "8f83803ccd54bd52db0a73e8ff61996f"
  },
  {
    "url": "thirdless/w-a/08数据交互和界面展示.html",
    "revision": "cf584807d68377c5d24b373477d6c344"
  },
  {
    "url": "thirdless/w-b.html",
    "revision": "2fe149bff5c0e25926c7d4252ea36ca8"
  },
  {
    "url": "thirdless/w-c.html",
    "revision": "754edd76fb56110981307c76952557c2"
  },
  {
    "url": "thirdless/w-d.html",
    "revision": "eadd6227cc165d8210607f06d4451416"
  },
  {
    "url": "thirdless/w-e.html",
    "revision": "13c7af9e0a1a167eb730f78429c5fbc2"
  },
  {
    "url": "web/answer/课程常见问题.html",
    "revision": "7dc793a511b233bbf4b0ed70b1ed669e"
  },
  {
    "url": "web/bootstrap/index.html",
    "revision": "33387fb5606231e066b8df8849bdd9c0"
  },
  {
    "url": "web/css/index.html",
    "revision": "bdd14d5469d16f856b3204ce8d694a6a"
  },
  {
    "url": "web/css/封装的css样式库.html",
    "revision": "41b8f1032dd0d58a53b6c9247d16785f"
  },
  {
    "url": "web/echarts/index.html",
    "revision": "e76c6c6f4e00e9066316a1c12d27158e"
  },
  {
    "url": "web/github/index.html",
    "revision": "11f09fed554dca47c5b957043005cd78"
  },
  {
    "url": "web/IIS/index.html",
    "revision": "ade0c089e0caa2c468140848d86e36d0"
  },
  {
    "url": "web/index.html",
    "revision": "abdca8c9bec50451bdde50bfd7e65ae0"
  },
  {
    "url": "web/methods/地图相关.html",
    "revision": "1c35434350117fd0fa8d55cf086ef2a9"
  },
  {
    "url": "web/methods/定位相关.html",
    "revision": "a2d4e59601c853a8b40f14a363b7498a"
  },
  {
    "url": "web/methods/实用接口.html",
    "revision": "1aaa7bf89bc200b8842c2d9ca449278d"
  },
  {
    "url": "web/mysql/index.html",
    "revision": "7b618893028d50f88d9584896f337179"
  },
  {
    "url": "web/mysql/role.html",
    "revision": "de3bb63dc921b8b82f848c9d4c262b1b"
  },
  {
    "url": "web/mysql/rolecategory.html",
    "revision": "57dd2cd2a138671efec5b52a5916f273"
  },
  {
    "url": "web/mysql/shop_manager.html",
    "revision": "0e6e9b140269ffa9373154b0a44ebe5e"
  },
  {
    "url": "web/mysql/shop_manager表接口.html",
    "revision": "938c03ff0c36b7bb1703d6c7d8ac7113"
  },
  {
    "url": "web/shop/index.html",
    "revision": "9a004a015bbf967923a65458ff119d58"
  },
  {
    "url": "web/software/index.html",
    "revision": "41e51ee9c74660379539e1ef218559f7"
  },
  {
    "url": "web/Vanta.js/index.html",
    "revision": "0816addb3b534ab4efa0afb661ccb7ec"
  },
  {
    "url": "web/vue.js/index.html",
    "revision": "5908b44b5f113bf8a9bfcb55bc03736d"
  },
  {
    "url": "web/Vue3+ElementPlus/index.html",
    "revision": "e03fab488489556d820232b169e30745"
  },
  {
    "url": "web/w-a.html",
    "revision": "a0b502a4c5042ae3dbdecd0d0c46b46e"
  },
  {
    "url": "web/w-b.html",
    "revision": "cfab98e7f676d5ea3937d6bb5f9b1e34"
  },
  {
    "url": "web/w-c.html",
    "revision": "27edd27a4ed24c95bdd1761553b459cf"
  },
  {
    "url": "开发记录.html",
    "revision": "be80e70472ab77e6efdf0ddb5ea68aa3"
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
