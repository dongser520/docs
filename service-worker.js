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
    "revision": "f1d2f5b1fcb6817287ca9b372d6da754"
  },
  {
    "url": "about.html",
    "revision": "1f72c8a28ddb93129afcc213151605ad"
  },
  {
    "url": "about/index.html",
    "revision": "8ed850edf1ba20a140df69c544f9af61"
  },
  {
    "url": "aboutless.html",
    "revision": "7ded385e299e26979eca849b739eed36"
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
    "url": "assets/js/100.13857fab.js",
    "revision": "5f02b8288edbd6911a751421585bb61d"
  },
  {
    "url": "assets/js/101.92edeb75.js",
    "revision": "d4ce45829d9c9ae08a1b20436dd94084"
  },
  {
    "url": "assets/js/102.86431f7c.js",
    "revision": "6333026b5586230ff5728a83f770bb56"
  },
  {
    "url": "assets/js/103.52b5ca30.js",
    "revision": "2c0f66422e90d62493fc1ffc543b8c87"
  },
  {
    "url": "assets/js/104.bf4bc5af.js",
    "revision": "1cacbf9f4db751849c07658a13cc89ee"
  },
  {
    "url": "assets/js/105.0d2ddbdf.js",
    "revision": "c7ecbac5658fbba07f8bf0387fd4c019"
  },
  {
    "url": "assets/js/106.318d8fb5.js",
    "revision": "10645b823e4875b807aabbf1b9434d4c"
  },
  {
    "url": "assets/js/107.b619186a.js",
    "revision": "f19fc8a28ab8f601a12ce54208c00696"
  },
  {
    "url": "assets/js/108.1a674199.js",
    "revision": "6340c2b1fc0024d8bfd322c0b28a5b23"
  },
  {
    "url": "assets/js/109.7ed57c50.js",
    "revision": "2182e07c13b6097cbe5121d0fa87cbab"
  },
  {
    "url": "assets/js/11.934eb133.js",
    "revision": "0cbfb5a79c209befa057aecc68c6e027"
  },
  {
    "url": "assets/js/110.4c115080.js",
    "revision": "687bd8e874e15164b8dfb59404f65a2f"
  },
  {
    "url": "assets/js/111.b428cfa0.js",
    "revision": "188aeea471d24b9e8b89f98b69274bd6"
  },
  {
    "url": "assets/js/112.36d68828.js",
    "revision": "0e5527c0fd8a8f52765053e3a829b846"
  },
  {
    "url": "assets/js/113.c8a1c20b.js",
    "revision": "f94618e6088219a8899481b66f76f6c9"
  },
  {
    "url": "assets/js/114.0169ca22.js",
    "revision": "2e66177bd022096fb24307bd6d3ff434"
  },
  {
    "url": "assets/js/115.09454635.js",
    "revision": "cdd5ac9daf7c19ff8a65b23b6c7fc6c3"
  },
  {
    "url": "assets/js/116.04512aba.js",
    "revision": "cf1e53ba53843fc2c54a34970943538b"
  },
  {
    "url": "assets/js/117.c077e8d2.js",
    "revision": "703ee7eb299d05f2134f3ff6e2401dd1"
  },
  {
    "url": "assets/js/118.173fe5b1.js",
    "revision": "a6d592cc01c9824ef74c746acb2ed5b9"
  },
  {
    "url": "assets/js/119.fdc8abe6.js",
    "revision": "adb923c4509fb53e25671a976b562a17"
  },
  {
    "url": "assets/js/12.cc2380d1.js",
    "revision": "db2bbf818f1a04422508866c29849f49"
  },
  {
    "url": "assets/js/120.73bd56bb.js",
    "revision": "8f97e183deffb253a2d459b06b5a13d3"
  },
  {
    "url": "assets/js/121.7851ef80.js",
    "revision": "6aafc207807932a88cba1fa1b72cb6e1"
  },
  {
    "url": "assets/js/122.e2ab5836.js",
    "revision": "9bbc53850931bd76e9b5d3326a969091"
  },
  {
    "url": "assets/js/123.303d88f9.js",
    "revision": "e3d38245f2ad9b88ec247265681e685d"
  },
  {
    "url": "assets/js/124.dcff5246.js",
    "revision": "a13a9806c3bac0ffd76b572f6a9b9e03"
  },
  {
    "url": "assets/js/125.9ebcfa1a.js",
    "revision": "e8d00ed8fd9f21c4d1d647579697b451"
  },
  {
    "url": "assets/js/126.0ac991e1.js",
    "revision": "5e93fc37bc9522722b6c8f4f39f78411"
  },
  {
    "url": "assets/js/127.36dfc9e7.js",
    "revision": "d984851162d151a29200814effb2efa4"
  },
  {
    "url": "assets/js/128.c5c8d433.js",
    "revision": "5a0c6f5eea977942d6c5c75ed9b7aa42"
  },
  {
    "url": "assets/js/129.e7e11655.js",
    "revision": "7ddb7f8c55ed528f9481af1acac87be9"
  },
  {
    "url": "assets/js/13.08173c30.js",
    "revision": "d86f487d466a7cea00a39caa2ef255b2"
  },
  {
    "url": "assets/js/130.a0869704.js",
    "revision": "2a84c44a2561cafc503bffdf0da50646"
  },
  {
    "url": "assets/js/131.7784fb20.js",
    "revision": "c58de4393f66e9018b098cb832c3e114"
  },
  {
    "url": "assets/js/132.eb7e4865.js",
    "revision": "942dd7b861625787dc4ee36bc19ad5ff"
  },
  {
    "url": "assets/js/133.4bceb874.js",
    "revision": "9b17c0a073569fb0f2af27fe973afe0d"
  },
  {
    "url": "assets/js/14.5c71da58.js",
    "revision": "bf1b06f613bea83709b82c2ce8fe4516"
  },
  {
    "url": "assets/js/15.5333b525.js",
    "revision": "e94b60e41648e2516a262f16fb29ce09"
  },
  {
    "url": "assets/js/16.42e6c672.js",
    "revision": "94828f6e00ebc89fe1a220e4a2a9f602"
  },
  {
    "url": "assets/js/17.130ae7cc.js",
    "revision": "4208722f0876a2f248aa2a2bb5af703e"
  },
  {
    "url": "assets/js/18.3936df51.js",
    "revision": "0acd4ddf637e23d5d6161ee4b234f779"
  },
  {
    "url": "assets/js/19.1db1d10c.js",
    "revision": "b8df5c6b78c78760512f65b3c7b21277"
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
    "url": "assets/js/21.48cdab33.js",
    "revision": "665120f2407535da954c7beb2e65fb9f"
  },
  {
    "url": "assets/js/22.63511983.js",
    "revision": "405b8dee744021e47bc17f64ae252dcb"
  },
  {
    "url": "assets/js/23.ffa3157e.js",
    "revision": "5551527004e441aac1dc502066af1731"
  },
  {
    "url": "assets/js/24.a8091a10.js",
    "revision": "e6c6756aa86d986634dacae01b4c7efd"
  },
  {
    "url": "assets/js/25.e5f0844a.js",
    "revision": "81925d910418fda3c71c1ab93f9efc16"
  },
  {
    "url": "assets/js/26.664e8007.js",
    "revision": "0528213d1453998054263106387ecc5d"
  },
  {
    "url": "assets/js/27.7faab06b.js",
    "revision": "0e6d960ecca4223904741c538f310099"
  },
  {
    "url": "assets/js/28.c0db0b96.js",
    "revision": "b8e0269767a36198920c83fdccdadd1d"
  },
  {
    "url": "assets/js/29.5d08f810.js",
    "revision": "126f791217bc8f3157f21d922bd0fe8a"
  },
  {
    "url": "assets/js/3.e6827fa8.js",
    "revision": "f1ffa92e22c7370c76abfc2cdb906d17"
  },
  {
    "url": "assets/js/30.d04a69db.js",
    "revision": "024bc966ee2e49a62b05ae131902120c"
  },
  {
    "url": "assets/js/31.e98adb65.js",
    "revision": "c56f3909e9149773a4481504165ab5e9"
  },
  {
    "url": "assets/js/32.049f7dcc.js",
    "revision": "ff8c65641c39213d5aaa832d02e4564b"
  },
  {
    "url": "assets/js/33.9cdbdb87.js",
    "revision": "80ae9e799adbee936ed7385004df14d3"
  },
  {
    "url": "assets/js/34.913af8d7.js",
    "revision": "c3598b83e99cbb93d0be661082d20667"
  },
  {
    "url": "assets/js/35.bf317a83.js",
    "revision": "d4f00b6e4eb37e8723da53307a8fb24b"
  },
  {
    "url": "assets/js/36.e284fc3f.js",
    "revision": "539fc98ff879fbcc1b6b09c0fa4d1c65"
  },
  {
    "url": "assets/js/37.51835ca0.js",
    "revision": "919c0923f69577fd1e69b804018add77"
  },
  {
    "url": "assets/js/38.26aa02de.js",
    "revision": "0815bd2f006fd810cb447d7c5c207111"
  },
  {
    "url": "assets/js/39.33d78379.js",
    "revision": "70645122ea22aa1d1929c6ba1284fa73"
  },
  {
    "url": "assets/js/4.f7e5c4a6.js",
    "revision": "1f221519ab31a9ff11661bf09edf3c12"
  },
  {
    "url": "assets/js/40.8a354bd3.js",
    "revision": "f4ccfb15a35470228b06de291f6333b6"
  },
  {
    "url": "assets/js/41.a7285e4e.js",
    "revision": "adedafb00a4a4dcbd0c9cd75c1c48485"
  },
  {
    "url": "assets/js/42.9aa09070.js",
    "revision": "3457d4b8739e303d42a7534131ea2457"
  },
  {
    "url": "assets/js/43.1791f898.js",
    "revision": "56b83ee8a17274850c207adfc6b20424"
  },
  {
    "url": "assets/js/44.e270512c.js",
    "revision": "60410bf6ff90449a0d4872ccebc97b94"
  },
  {
    "url": "assets/js/45.bdb3a972.js",
    "revision": "f788c9a0b9c3cc8264dbe2212e4380a7"
  },
  {
    "url": "assets/js/46.10cc6ca4.js",
    "revision": "c2314fdaae7eaa1e7a47b9df64c161a9"
  },
  {
    "url": "assets/js/47.fc9e118d.js",
    "revision": "0c64009e5277534f62f70d1dd0d4dd37"
  },
  {
    "url": "assets/js/48.41cb97a0.js",
    "revision": "992e264074dd5953cfa84a0e8b508c84"
  },
  {
    "url": "assets/js/49.dc30ba2a.js",
    "revision": "960c33e12686a021a84cf630635a5168"
  },
  {
    "url": "assets/js/5.3e24e7be.js",
    "revision": "bb8330fc3b00684c0b46c0c7ade9634a"
  },
  {
    "url": "assets/js/50.7d347a62.js",
    "revision": "cf1dab4e7cd9172a4e5dfe29855c2f02"
  },
  {
    "url": "assets/js/51.2cbc316e.js",
    "revision": "7beafd6ef46b9d6dea743fd9dc4ca2fa"
  },
  {
    "url": "assets/js/52.b825bcd1.js",
    "revision": "ed6708dcc2170d672f94a5b69a5254bf"
  },
  {
    "url": "assets/js/53.d0d8f204.js",
    "revision": "9bded44dd221bcc1c8489fc27b7fa41b"
  },
  {
    "url": "assets/js/54.780300d5.js",
    "revision": "9b372c497327501c9b19e21c8000d94f"
  },
  {
    "url": "assets/js/55.80485f5a.js",
    "revision": "6f9289cc00bca0eebb6f3ed9ae1008ef"
  },
  {
    "url": "assets/js/56.ce182516.js",
    "revision": "1264148ae1d15a77338ed3ce57541fe8"
  },
  {
    "url": "assets/js/57.2fed0632.js",
    "revision": "c6334e85c8e3dcc9d65554aea38c9797"
  },
  {
    "url": "assets/js/58.c815dc0b.js",
    "revision": "73d3621a27c33f5ad96be2f3c761f8e9"
  },
  {
    "url": "assets/js/59.7b673878.js",
    "revision": "5c08fd80027cdd3ace0022664e642f1f"
  },
  {
    "url": "assets/js/6.ca2525e2.js",
    "revision": "f26b99a11274e34a1a8df09422012df8"
  },
  {
    "url": "assets/js/60.c7764c34.js",
    "revision": "ebe52cd6cbc671c9af3d9d6021400746"
  },
  {
    "url": "assets/js/61.5a4a7822.js",
    "revision": "eee0d4439dcb29beec3e16cfe1329fe8"
  },
  {
    "url": "assets/js/62.5c45b1db.js",
    "revision": "da034c693ecfa82c056a9b72ad00e3ee"
  },
  {
    "url": "assets/js/63.11d7f85c.js",
    "revision": "fc1d32acb05529fadc38dd152a975128"
  },
  {
    "url": "assets/js/64.4339826e.js",
    "revision": "1fc3da2c3f7dc454b0861b355856762b"
  },
  {
    "url": "assets/js/65.f008b937.js",
    "revision": "9b100443afe00b329e7e81198488a954"
  },
  {
    "url": "assets/js/66.daf2f679.js",
    "revision": "52fecc91c9fb2801b77e5fd03382da0c"
  },
  {
    "url": "assets/js/67.b62c6b69.js",
    "revision": "4db720574d42da77fbdcae1916103943"
  },
  {
    "url": "assets/js/68.170be11c.js",
    "revision": "3d13bf6a900521eb93516668d1cba72a"
  },
  {
    "url": "assets/js/69.dbf2f144.js",
    "revision": "940ab2e3d735c8adc2ed952cb2987996"
  },
  {
    "url": "assets/js/7.bd85c945.js",
    "revision": "a726a1fcf309f46117afb0c8f7ee9237"
  },
  {
    "url": "assets/js/70.56b65d49.js",
    "revision": "5132f186106503d9fb35c55fa2154c9f"
  },
  {
    "url": "assets/js/71.fd92c927.js",
    "revision": "1b6a4168f0d97334c976d3bc21b347a2"
  },
  {
    "url": "assets/js/72.25ea2cba.js",
    "revision": "d1c64561274a8481c1ff710f42c9791b"
  },
  {
    "url": "assets/js/73.ee20d70a.js",
    "revision": "1908ea37c5d41a4cabe426fbed228319"
  },
  {
    "url": "assets/js/74.a701b043.js",
    "revision": "34825712bc4f05dd946a38a3a4d068bd"
  },
  {
    "url": "assets/js/75.54899f86.js",
    "revision": "9ce7f7c35ea8f9558e6f0e463c56c250"
  },
  {
    "url": "assets/js/76.0a0c15ce.js",
    "revision": "6d0d38b060629b55bc54712402ac0be5"
  },
  {
    "url": "assets/js/77.e51ee61a.js",
    "revision": "7b590d5e68deedfc27bb06bb62d4ae54"
  },
  {
    "url": "assets/js/78.10ab86dd.js",
    "revision": "602b68085effc99e18e916928343d458"
  },
  {
    "url": "assets/js/79.35bda559.js",
    "revision": "e270e1be10b799a4c2a4c7673fb3181c"
  },
  {
    "url": "assets/js/8.8ad61ad5.js",
    "revision": "0945474913248319e46021c31c62d527"
  },
  {
    "url": "assets/js/80.22f979da.js",
    "revision": "25fc190ec7d4696ef9252e030e3a04b9"
  },
  {
    "url": "assets/js/81.119255dd.js",
    "revision": "ab6ab48d717f1986275fc94c7129b992"
  },
  {
    "url": "assets/js/82.3b5c0fa4.js",
    "revision": "8b7ee491ffb6aa2ef405ff5ff337b9c3"
  },
  {
    "url": "assets/js/83.008074a7.js",
    "revision": "416a661b456eb69f73a4260deca2d6bc"
  },
  {
    "url": "assets/js/84.8e11ab9f.js",
    "revision": "70eee45022448bd44c90d53a6b4cfe63"
  },
  {
    "url": "assets/js/85.b5f94359.js",
    "revision": "46b8042449e7f8c4d4c7dc0c42d723f9"
  },
  {
    "url": "assets/js/86.98480147.js",
    "revision": "a50cf42c2ea9295e2d3b875d25440631"
  },
  {
    "url": "assets/js/87.e57d5f16.js",
    "revision": "8a8c7700e61bfaebdd4c0390685edb12"
  },
  {
    "url": "assets/js/88.baff0509.js",
    "revision": "073636418bcd6dabeaec9f6b58ee153d"
  },
  {
    "url": "assets/js/89.308ea1f8.js",
    "revision": "b4954fcdb571c401661789dbc15aa322"
  },
  {
    "url": "assets/js/9.13d458ed.js",
    "revision": "98983ed4d52578db065fd908e6b49dc6"
  },
  {
    "url": "assets/js/90.55f01a47.js",
    "revision": "d3b24eaae6c78bde2a08fdffd436f19e"
  },
  {
    "url": "assets/js/91.d9aa704a.js",
    "revision": "e01407dcf698040f36f5ede4d12fe64e"
  },
  {
    "url": "assets/js/92.b8f0494b.js",
    "revision": "8b98a6df0e9913c0153ceafc2adb24de"
  },
  {
    "url": "assets/js/93.18fbcc29.js",
    "revision": "d58044657d23a6b8b53cbcea29ebd0c1"
  },
  {
    "url": "assets/js/94.2448e500.js",
    "revision": "97f7cb49c2c7641accf0ce06be0dbc9b"
  },
  {
    "url": "assets/js/95.b3bcf7ed.js",
    "revision": "3179612da7ccbf00be30493a535a555f"
  },
  {
    "url": "assets/js/96.f98361be.js",
    "revision": "bb22e56598865d698265706d5e46eb0a"
  },
  {
    "url": "assets/js/97.81d72ce5.js",
    "revision": "309de1d4976522c38e5dbcfd71d4c3c0"
  },
  {
    "url": "assets/js/98.21f38e1f.js",
    "revision": "e885a2cda3f89272b712e32e5245a1a1"
  },
  {
    "url": "assets/js/99.1a35ab68.js",
    "revision": "6b5b265a5dc48b6872a4ac5d0c39d111"
  },
  {
    "url": "assets/js/app.fcb0a2ee.js",
    "revision": "a4430468db3a31c841d5f6746e172555"
  },
  {
    "url": "deploy/eggjs.chat.html",
    "revision": "4c3c634223e963723302a3dfc580b6bd"
  },
  {
    "url": "deploy/index.html",
    "revision": "702b7aadaeb502741a5dfd46e9ac6928"
  },
  {
    "url": "deploy/vitevue3.shop.html",
    "revision": "25b101348d113500e486151d8a728541"
  },
  {
    "url": "deploy/vuecli.shop.html",
    "revision": "e692a0155aa074ce5ae2861b3aefe6d2"
  },
  {
    "url": "fourthless/index.html",
    "revision": "c1119d900773319e2b96f692c269152f"
  },
  {
    "url": "fourthless/w-a.html",
    "revision": "4d1e30f521ca900b808cab6fd5032847"
  },
  {
    "url": "fourthless/w-a/02开发前环境搭建.html",
    "revision": "c6cefdc90dbd7cf95a20f08d5d5d27d5"
  },
  {
    "url": "fourthless/w-a/eggjs框架开发文档.html",
    "revision": "a77fc1d6c2e5dc53696a1476143b4f77"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员板块.html",
    "revision": "fa5726126728fb858110e342cffc1b35"
  },
  {
    "url": "fourthless/w-a/thinkphp框架开发文档.html",
    "revision": "5fc8ed21188b05cc0ae0e3dcc1426c3d"
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
    "revision": "bcee31d8b5c034e09ecdfdc6deb53c07"
  },
  {
    "url": "pc/index.html",
    "revision": "145ce044868eb875a57cca54097936dc"
  },
  {
    "url": "pc/p-a.html",
    "revision": "769e4ea41813965a2e2e18ce5b7de703"
  },
  {
    "url": "pc/p-b.html",
    "revision": "194af223e7bcf4b6b9b4d08582b0d37c"
  },
  {
    "url": "pc/p-c.html",
    "revision": "2b66347579a0cfdd23b022edf604d59e"
  },
  {
    "url": "phone/index.html",
    "revision": "bc7b6bd6eb414742354ac767ef937e94"
  },
  {
    "url": "phone/phone-a.html",
    "revision": "b1b94ce1ac53d76a9320d4c59b3bb993"
  },
  {
    "url": "phone/phone-b.html",
    "revision": "305b94f4f6fb23aff5d0b5ee801267af"
  },
  {
    "url": "phone/phone-c.html",
    "revision": "0ea2ff269261a5e94328a215439baf2d"
  },
  {
    "url": "secondless/index.html",
    "revision": "7e3996f9842e3587fd95fc7a43e09072"
  },
  {
    "url": "secondless/w-a.html",
    "revision": "b9d72ef2379221ae4ef1d428c3bd1195"
  },
  {
    "url": "secondless/w-a/Date类型：时间和日期.html",
    "revision": "ca3d15480b5418a9ca16e488e5d04187"
  },
  {
    "url": "secondless/w-a/Function类型：函数进阶.html",
    "revision": "02b59bfef7783b62f39963e21a95674a"
  },
  {
    "url": "secondless/w-a/javascript函数.html",
    "revision": "d995b2be5aafe4213bec7b01d31dea0a"
  },
  {
    "url": "secondless/w-a/javascript基本包装类型.html",
    "revision": "a82a34ede54e5b4dacc84fb8759e6f7b"
  },
  {
    "url": "secondless/w-a/javascript基础.html",
    "revision": "bcf88469e838806fe32320bc29bcb306"
  },
  {
    "url": "secondless/w-a/javascript对象.html",
    "revision": "f83f17b808377ceed6e99a3abf648ff8"
  },
  {
    "url": "secondless/w-a/javascript数组.html",
    "revision": "b3a70200f4df4b949a76c87e4431f73d"
  },
  {
    "url": "secondless/w-a/javascript运算符.html",
    "revision": "3b6ab7004b4cdfd93e631888c0dd40d3"
  },
  {
    "url": "secondless/w-a/事件.html",
    "revision": "77ce2e066bfed42698c8aebe6b7c2227"
  },
  {
    "url": "secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html",
    "revision": "b3ea6e489f40f9170630024ba1f12c2e"
  },
  {
    "url": "secondless/w-a/函数对象数组小结.html",
    "revision": "d0fdaf7cfc07dd1125f51b6a24960ed9"
  },
  {
    "url": "secondless/w-a/匿名函数和闭包.html",
    "revision": "d1177670ec3225aeb9df95437f542501"
  },
  {
    "url": "secondless/w-a/数据Cookie、XML、JSON.html",
    "revision": "af2e2e2a11efb116ab9043cfda6e2c06"
  },
  {
    "url": "secondless/w-a/流程控制语句.html",
    "revision": "172b227f556a72f0c69651e5c37c9a44"
  },
  {
    "url": "secondless/w-a/浏览器对象模型BOM及浏览器检测.html",
    "revision": "acf5f66ff187c2329106ce97298f336a"
  },
  {
    "url": "secondless/w-a/网页文档对象模型DOM.html",
    "revision": "a9361e438a8a1d0244b102d914185d45"
  },
  {
    "url": "secondless/w-a/表单处理及错误处理与调试.html",
    "revision": "570cda2b3cb758c8bc98b8258a5e1f26"
  },
  {
    "url": "secondless/w-b.html",
    "revision": "3264674a7cc5e2f9e588bddfb42bb601"
  },
  {
    "url": "secondless/w-b/Ajax.html",
    "revision": "d1fd177fa967b7b54e19d94398e87727"
  },
  {
    "url": "secondless/w-b/jQuery.html",
    "revision": "ddd1721800a703fda309c463e5cbac2f"
  },
  {
    "url": "secondless/w-b/jQuery事件、动画、插件.html",
    "revision": "2c1db14d93546d9e5bd499a15ce8a095"
  },
  {
    "url": "secondless/w-b/Node.js.html",
    "revision": "e4dd7d9b73de96424892ed32142b6355"
  },
  {
    "url": "secondless/w-b/node.js+vue.js 渲染企业网站.html",
    "revision": "ff91204a501d3e4c651037df5ad93b6d"
  },
  {
    "url": "secondless/w-b/nodejs+jQuery开发留言板.html",
    "revision": "cdad0d1a60dc276d85036e417b4b2d89"
  },
  {
    "url": "secondless/w-b/nodejs服务器端app.js文件.html",
    "revision": "134461e49ebcf906109a8111f9ddd61d"
  },
  {
    "url": "secondless/w-b/Vue.js.html",
    "revision": "251d927e4cf660ff32640b4dbbe2987f"
  },
  {
    "url": "secondless/w-b/封装js库过渡到jQuery.html",
    "revision": "8bc2e5e609ccb5b3514029a4480b0ede"
  },
  {
    "url": "secondless/w-b/正则表达式.html",
    "revision": "00d812e93d7809909eb87aa8da285812"
  },
  {
    "url": "secondless/w-b/面向对象与原型.html",
    "revision": "a4fa49993409fdb6308c717869c6caed"
  },
  {
    "url": "secondless/w-c.html",
    "revision": "b7ff8891f17bd21338f5d9704eeb3367"
  },
  {
    "url": "secondless/w-c/Egg.js.html",
    "revision": "3bd36d834dc582aa9fb31f6e36b7d537"
  },
  {
    "url": "secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html",
    "revision": "7f64d4d709ec36685549318672e35e1b"
  },
  {
    "url": "secondless/w-c/egg.js基础总结.html",
    "revision": "0b69b392447bccbe6dc0b50a3431ba42"
  },
  {
    "url": "secondless/w-c/egg.js重要知识详细文档.html",
    "revision": "d629f16dec8299c954768206371f0139"
  },
  {
    "url": "secondless/w-c/eggjs+postman测试工具将留言写入json文件.html",
    "revision": "86266a782aab78140559c85e63c4c154"
  },
  {
    "url": "secondless/w-c/mysql数据库.html",
    "revision": "54514399ccbfcc1806fbc754bc180604"
  },
  {
    "url": "secondless/w-c/ValParams API 说明.html",
    "revision": "0489f93f206dabbc9bae1e2255643e70"
  },
  {
    "url": "secondless/w-c/上传文件.html",
    "revision": "4078a6369794843456b328cea3c44409"
  },
  {
    "url": "secondless/w-c/企业网站其它页面(非首页).html",
    "revision": "f998c7de3f099b27aa684cb725e3d9fa"
  },
  {
    "url": "secondless/w-c/企业网站前端部分.html",
    "revision": "74cb1890961464a56bcc7643a0a335a8"
  },
  {
    "url": "secondless/w-c/企业网站后台内容管理.html",
    "revision": "a61d944f089dcb8719c5251e32c1e7cd"
  },
  {
    "url": "secondless/w-c/企业网站后台栏目管理.html",
    "revision": "4856079059bf25b4911d5eb2334ba60d"
  },
  {
    "url": "secondless/w-c/企业网站首页.html",
    "revision": "db165c8f5ffec7cae55cef4b6b6d51b4"
  },
  {
    "url": "secondless/w-c/响应式后台公共模版.html",
    "revision": "3a2cb62830d43850ff1ac20337fb763b"
  },
  {
    "url": "secondless/w-c/响应式后台用户留言板管理.html",
    "revision": "214e62944665fe7fb89747f66d14f6ce"
  },
  {
    "url": "secondless/w-c/响应式后台界面示例代码.html",
    "revision": "4a5d72be93cb1c19fa2bd8b47628ac91"
  },
  {
    "url": "secondless/w-c/响应式后台管理员登录.html",
    "revision": "d16290b89cce2ae84fc402cf2f180c22"
  },
  {
    "url": "secondless/w-c/响应式后台管理系统.html",
    "revision": "f69f464bba43861d7dcabc3e097ec821"
  },
  {
    "url": "secondless/w-c/响应式网页布局.html",
    "revision": "cf1ffec891957aac887334d83893a5e1"
  },
  {
    "url": "secondless/w-c/响应式网页布局指导思路.html",
    "revision": "1287e7270e8b633ff2c258c5b2c43a6c"
  },
  {
    "url": "secondless/w-c/树形结构方法演变.html",
    "revision": "70b70c0d7469d14955e6052f2bf95809"
  },
  {
    "url": "secondless/w-c/直播功能中的用户表liveuser.html",
    "revision": "e10c0f5e3c641f2d18ea9a04ece8ddbe"
  },
  {
    "url": "secondless/w-c/直播功能中的直播间表live.html",
    "revision": "3bc4cea85550226c236367a805006dbf"
  },
  {
    "url": "secondless/w-c/直播功能中的礼物表livegift.html",
    "revision": "db55196b72d44f13c5cc0fdab3f7ab21"
  },
  {
    "url": "secondless/w-c/直播功能中的订单表liveorder.html",
    "revision": "ac98439e6672fac5f9d9150039e0d84a"
  },
  {
    "url": "secondless/w-c/网站后台管理员简单权限分配功能实现.html",
    "revision": "2a1e95ddd08aaff226ec6d23bfba3796"
  },
  {
    "url": "secondless/w-d.html",
    "revision": "139b77b1d6d456078c0fc05fd1da510e"
  },
  {
    "url": "secondless/w-d/SSL证书.html",
    "revision": "8c9fbce4ca570e77590141e89a0c41b9"
  },
  {
    "url": "secondless/w-d/网站代码上线调试.html",
    "revision": "ee0a4c84387f36eb3635a20093cb0d9f"
  },
  {
    "url": "secondless/w-d/购买域名.html",
    "revision": "4075e76811c0ed38d491cc02833b25b5"
  },
  {
    "url": "secondless/w-d/购买服务器.html",
    "revision": "5a408e5c96e17692ba56eb2457be3524"
  },
  {
    "url": "thirdless/index.html",
    "revision": "50bcf3fa95d1cf7eb3d9ef95b1064a51"
  },
  {
    "url": "thirdless/w-a.html",
    "revision": "9b88ea75f5be16187a6a15c4482b32cd"
  },
  {
    "url": "thirdless/w-a/02开发前环境搭建.html",
    "revision": "1425b2f9b494c0a7c1b2299505e5e303"
  },
  {
    "url": "thirdless/w-a/03引入UI框架及进行全局配置.html",
    "revision": "4dac7b29c500fbf21232adaae24b9973"
  },
  {
    "url": "thirdless/w-a/04首页开发.html",
    "revision": "67067e6c8cf0614850d1c33856130ce4"
  },
  {
    "url": "thirdless/w-a/05其它界面开发.html",
    "revision": "bb4eb7201f7e16043f820ea1428de8a7"
  },
  {
    "url": "thirdless/w-a/06数据处理.html",
    "revision": "58be4e37596184a1cabd55a8fc8c2373"
  },
  {
    "url": "thirdless/w-a/07后端api开发.html",
    "revision": "a6d95df590c9a10664cc92a5f30ec242"
  },
  {
    "url": "thirdless/w-a/07后端api开发代码.html",
    "revision": "3767895b4bff0ca735788452e8b74886"
  },
  {
    "url": "thirdless/w-a/08数据交互和界面展示.html",
    "revision": "026f27065976660599c6702bce32fd58"
  },
  {
    "url": "thirdless/w-b.html",
    "revision": "5b76259d980b771913624a0e4e8e7dc5"
  },
  {
    "url": "thirdless/w-c.html",
    "revision": "3e47b823d8fe3600f524570b481eef4b"
  },
  {
    "url": "thirdless/w-d.html",
    "revision": "dc2d585a4117c178c8a80ae9b56d91f2"
  },
  {
    "url": "thirdless/w-e.html",
    "revision": "068ad67bca027b023c698638150e9603"
  },
  {
    "url": "web/answer/课程常见问题.html",
    "revision": "3cf18be37da9294078df911fb666893c"
  },
  {
    "url": "web/bootstrap/index.html",
    "revision": "9a118e00d1ef3a595502e7b521974016"
  },
  {
    "url": "web/css/index.html",
    "revision": "5114d14b87c993230588348b710f5a0b"
  },
  {
    "url": "web/css/封装的css样式库.html",
    "revision": "8d905340b0ed0f0be2bd04b0a93effa0"
  },
  {
    "url": "web/echarts/index.html",
    "revision": "2616e1e0caab8267f91af62e34a90afc"
  },
  {
    "url": "web/github/index.html",
    "revision": "1df8c893e1d8320172c2fe8090dc9efe"
  },
  {
    "url": "web/IIS/index.html",
    "revision": "c802b33d7f619f97a7bdac6b17cd68ac"
  },
  {
    "url": "web/index.html",
    "revision": "9f4280e2b591391728f31af0bea09279"
  },
  {
    "url": "web/methods/地图相关.html",
    "revision": "bdeba56384f0fe2c659377b60173e924"
  },
  {
    "url": "web/methods/定位相关.html",
    "revision": "cd484b2b119e92a845c5d6b03ba26b7f"
  },
  {
    "url": "web/methods/实用接口.html",
    "revision": "7a52db863eb9701db062b8aff525f031"
  },
  {
    "url": "web/mysql/index.html",
    "revision": "8a2912f46cb6063875381e595f3a928e"
  },
  {
    "url": "web/mysql/shop_manager.html",
    "revision": "378ddd8971d22bba2483b22f4a4e8630"
  },
  {
    "url": "web/shop/index.html",
    "revision": "3460d5b446a1418c481264d2c3357a7c"
  },
  {
    "url": "web/software/index.html",
    "revision": "54070dd826d047176b191bc0c928486f"
  },
  {
    "url": "web/Vanta.js/index.html",
    "revision": "86c65c6f202e9f33a8b36dd19504b8c7"
  },
  {
    "url": "web/vue.js/index.html",
    "revision": "4a6c02402c6a8d4addc6855d35debea6"
  },
  {
    "url": "web/Vue3+ElementPlus/index.html",
    "revision": "88aff6c67e2376c01adae350bac6cfac"
  },
  {
    "url": "web/w-a.html",
    "revision": "bb39e847dd6a846ac18f398bf569bfe3"
  },
  {
    "url": "web/w-b.html",
    "revision": "18a01fd3b8559273b78797680ca1fbd4"
  },
  {
    "url": "web/w-c.html",
    "revision": "8348f3903862427f7d4275ff7c59513d"
  },
  {
    "url": "开发记录.html",
    "revision": "c81eb24a05b065ce5ac3d4e7fa5368c1"
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
