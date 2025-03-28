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
    "revision": "edf16b6651e7a71a935a1cdef8cebddc"
  },
  {
    "url": "about.html",
    "revision": "12b7d87b16bdc0db7e637a5f45a396aa"
  },
  {
    "url": "about/index.html",
    "revision": "144b065d51557b6eb5babefa7f0f40c5"
  },
  {
    "url": "aboutless.html",
    "revision": "8ba924eb2e96e44acc450462f5316285"
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
    "url": "assets/js/100.54c2d1da.js",
    "revision": "633fb50ad0b838256ef71d2c7729e706"
  },
  {
    "url": "assets/js/101.74217213.js",
    "revision": "d3e86dc1583b5c0aafaf79a73810ae45"
  },
  {
    "url": "assets/js/102.b9d98ec4.js",
    "revision": "ef3b092c44a57e4cc359c7e3be44f843"
  },
  {
    "url": "assets/js/103.9da6d0bd.js",
    "revision": "588eeb851312ba70b6eaa72f35f49f6c"
  },
  {
    "url": "assets/js/104.0247db8e.js",
    "revision": "666a46d45de7d554c2a554394be69d41"
  },
  {
    "url": "assets/js/105.1b1d99d7.js",
    "revision": "0d86dcf9d08716b34ce877fc6c0ad79f"
  },
  {
    "url": "assets/js/106.a5c43b68.js",
    "revision": "ce18bab5e2924fef66174f9df2b73590"
  },
  {
    "url": "assets/js/107.b2c88561.js",
    "revision": "933839e6e68be4f20d5a5a05c12aa966"
  },
  {
    "url": "assets/js/108.8873023f.js",
    "revision": "d0f5116c9e359739d5233b50f1869c30"
  },
  {
    "url": "assets/js/109.11a508a4.js",
    "revision": "a4d1f8cf314f2ac839cd44d021fe88cb"
  },
  {
    "url": "assets/js/11.1d61b189.js",
    "revision": "cf03ffd99db7b682baa7ef2559e591d5"
  },
  {
    "url": "assets/js/110.888145b1.js",
    "revision": "c225b054649f30e0dcfd3571d332a2d4"
  },
  {
    "url": "assets/js/111.4614ebac.js",
    "revision": "e7c57cf082e3c624d50409f72448fddb"
  },
  {
    "url": "assets/js/112.454e3368.js",
    "revision": "4c163f06ccddb9ed5fa036a10b16d99c"
  },
  {
    "url": "assets/js/113.d13862da.js",
    "revision": "43b09c0990ade55f22ba000eb232d03c"
  },
  {
    "url": "assets/js/114.916a0d40.js",
    "revision": "15805696f1810a9c549367ad687ec684"
  },
  {
    "url": "assets/js/115.bd05a3a1.js",
    "revision": "09fe56d1a2d574e9489b3c9d63e96d01"
  },
  {
    "url": "assets/js/116.ac5a7ec7.js",
    "revision": "0fe1761ae64e3f598fb3736e34185b2c"
  },
  {
    "url": "assets/js/117.6961db8f.js",
    "revision": "ebf87c0c3622af41b315aff5443997a3"
  },
  {
    "url": "assets/js/118.4683f72b.js",
    "revision": "9b930c13d5f23f1942f4664520ba64eb"
  },
  {
    "url": "assets/js/119.c311c3b4.js",
    "revision": "d43e519f9b1ba28567b16b753bc83ee1"
  },
  {
    "url": "assets/js/12.bb680a1d.js",
    "revision": "a6040a17e0182d76517d12dfda22b8a3"
  },
  {
    "url": "assets/js/120.436db8c7.js",
    "revision": "59d955781e6197c15f055699a8c98664"
  },
  {
    "url": "assets/js/121.02ab3d16.js",
    "revision": "332f46ce3c180192ee6656c44e90ceba"
  },
  {
    "url": "assets/js/122.39e2fdd2.js",
    "revision": "811239d3f24882b0f7f385388412c2ce"
  },
  {
    "url": "assets/js/123.74aba849.js",
    "revision": "240330452601b95487583871f7450692"
  },
  {
    "url": "assets/js/124.cfb5f37a.js",
    "revision": "bce7b7c5561e7d45ad2afb8d020b0238"
  },
  {
    "url": "assets/js/125.0a300598.js",
    "revision": "315a5bece5a4cc6a52f5e9725699a671"
  },
  {
    "url": "assets/js/126.e934a221.js",
    "revision": "ab648585915ae06a4b1e9016ecd7ce01"
  },
  {
    "url": "assets/js/127.b5f4ce81.js",
    "revision": "676e9f02397452cdce2696deecc3ced3"
  },
  {
    "url": "assets/js/128.8e1dccf1.js",
    "revision": "b82329be5d10c65bbfc21fd20587ea30"
  },
  {
    "url": "assets/js/129.6db264da.js",
    "revision": "3bb68bb7675bac172449f93ef1b4191e"
  },
  {
    "url": "assets/js/13.d81ea01c.js",
    "revision": "165db0692371bb66e6dbaf88c7e1c4d8"
  },
  {
    "url": "assets/js/130.ac9feede.js",
    "revision": "d9e20b3fd013aecdc3e72bb9db7f91ee"
  },
  {
    "url": "assets/js/131.5c00294c.js",
    "revision": "7ec85f10e8bf3dede3ef46bc4b907167"
  },
  {
    "url": "assets/js/132.e31bb4cb.js",
    "revision": "7b01d6e2e930bba77a9942a0b01e1a79"
  },
  {
    "url": "assets/js/133.11e37d07.js",
    "revision": "dd7ff78b091d6c5a2112539ea9f7fc53"
  },
  {
    "url": "assets/js/134.374f99fd.js",
    "revision": "5897f1a626a09f8d956096a6c2f67e9a"
  },
  {
    "url": "assets/js/135.99567b78.js",
    "revision": "512b7ba73113db2caf421c1c2cdb0c08"
  },
  {
    "url": "assets/js/136.bc91e8f7.js",
    "revision": "44d9b806e8510d8422ae5685f4e929e9"
  },
  {
    "url": "assets/js/137.f61788bc.js",
    "revision": "f91df1072c949148989ebdf7c9d170ff"
  },
  {
    "url": "assets/js/138.9afb7426.js",
    "revision": "674f773d301a5d9ebe3c6a16e644d4ba"
  },
  {
    "url": "assets/js/139.1f1079ba.js",
    "revision": "b173c257d652cfdb0ecc229c1cf2b59a"
  },
  {
    "url": "assets/js/14.0dbd5136.js",
    "revision": "086dbf0c5b9003d9d6f55998107d3963"
  },
  {
    "url": "assets/js/140.652578b0.js",
    "revision": "61fcbd6a74466ac38cb17c92383e9cc2"
  },
  {
    "url": "assets/js/141.aa9e2464.js",
    "revision": "18c11573a5c059e1366b37ef32149f3c"
  },
  {
    "url": "assets/js/142.40082d3c.js",
    "revision": "879e233f6216d95a3aaa03b6e1573b80"
  },
  {
    "url": "assets/js/143.b82c18b9.js",
    "revision": "4dcb3c873138d0849fe6fd930cd41002"
  },
  {
    "url": "assets/js/144.a21c7059.js",
    "revision": "e001b79c771c4f2a2595d130445d31e7"
  },
  {
    "url": "assets/js/15.047842ca.js",
    "revision": "b35ff89b711c1a44e92a49c31f0dc772"
  },
  {
    "url": "assets/js/16.bc7369ed.js",
    "revision": "fce328fa60dd8032839e2c7486b03c54"
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
    "url": "assets/js/21.f21a4067.js",
    "revision": "494887b6f142e37fed8ba941404e31e0"
  },
  {
    "url": "assets/js/22.097ffdd3.js",
    "revision": "a21f0d4d13e8570d4dfc34d467b3a872"
  },
  {
    "url": "assets/js/23.cd14f214.js",
    "revision": "68fd3ed1a31e55526cdf4688de6d8e21"
  },
  {
    "url": "assets/js/24.c94469a3.js",
    "revision": "a38d03d44cc9cf1ea61e171197509b44"
  },
  {
    "url": "assets/js/25.60378997.js",
    "revision": "8861a2391b9ead250602bdb5c99eca70"
  },
  {
    "url": "assets/js/26.f926d5f6.js",
    "revision": "5bdb60f57a6ab2bd9c085cdee8259bcc"
  },
  {
    "url": "assets/js/27.791dab78.js",
    "revision": "64aa591d17aaf6fed926330fa75ffef5"
  },
  {
    "url": "assets/js/28.ac2c78f0.js",
    "revision": "9035cfd960f49ce4503d2f0f57118d42"
  },
  {
    "url": "assets/js/29.7a56a7f4.js",
    "revision": "547e3e30840e2a5df696940272531dd2"
  },
  {
    "url": "assets/js/3.e6827fa8.js",
    "revision": "f1ffa92e22c7370c76abfc2cdb906d17"
  },
  {
    "url": "assets/js/30.0f4a7d35.js",
    "revision": "7a28ac3689b1a481f43900bae272d725"
  },
  {
    "url": "assets/js/31.5b72712f.js",
    "revision": "1db3343d9567b8a1ca81a5be514e1ade"
  },
  {
    "url": "assets/js/32.434d60e2.js",
    "revision": "0fd841c1199fcbbe8d68eb7f4421c3a1"
  },
  {
    "url": "assets/js/33.e3d03525.js",
    "revision": "31447566a92dfe0ee658b27c9bcc567a"
  },
  {
    "url": "assets/js/34.469704c8.js",
    "revision": "f02d52716eac023ee7add595e6f63c23"
  },
  {
    "url": "assets/js/35.da689fc1.js",
    "revision": "07dbdccd297b14ba77f1a309913a6f30"
  },
  {
    "url": "assets/js/36.5d6a62a7.js",
    "revision": "0ebf684fec8e2d0946429f5545ea063a"
  },
  {
    "url": "assets/js/37.ba1be391.js",
    "revision": "afe67dfd2859273bd75476a65f1f4f59"
  },
  {
    "url": "assets/js/38.143cf3e0.js",
    "revision": "f5190ee225600c3faf818a95d855bb99"
  },
  {
    "url": "assets/js/39.24e05b51.js",
    "revision": "7511a5b1663ca8a10ad3997bbb919d46"
  },
  {
    "url": "assets/js/4.53e63a7d.js",
    "revision": "8a9731bed72d4c28f0eca4db408749b5"
  },
  {
    "url": "assets/js/40.12a2d73c.js",
    "revision": "4f89e2561387feb523a659556170f814"
  },
  {
    "url": "assets/js/41.5f89fc8a.js",
    "revision": "83ff3266c3011c0b17c1f0ab65436344"
  },
  {
    "url": "assets/js/42.472c82ac.js",
    "revision": "6108471d2eff872094f0fefc6160570a"
  },
  {
    "url": "assets/js/43.447cdf33.js",
    "revision": "91afc6bb970d30a859bff430191fa3dc"
  },
  {
    "url": "assets/js/44.70b2243d.js",
    "revision": "65f6a7b8dacf11b96dd12672ecbac3ac"
  },
  {
    "url": "assets/js/45.46fb0635.js",
    "revision": "3a10bea1cd3a63dc895a8f9a0e408b8d"
  },
  {
    "url": "assets/js/46.cd341bec.js",
    "revision": "d378b7be2b3d76e926ac0dbdcd8fcc56"
  },
  {
    "url": "assets/js/47.abc937dc.js",
    "revision": "9085197cd4c085e3106092c9e534b62b"
  },
  {
    "url": "assets/js/48.3696fd76.js",
    "revision": "924bfb6d0f94ee9c11e7532a08e597c4"
  },
  {
    "url": "assets/js/49.7b713bf8.js",
    "revision": "037ef1814c52f16a7049647f69ea02e1"
  },
  {
    "url": "assets/js/5.3e24e7be.js",
    "revision": "bb8330fc3b00684c0b46c0c7ade9634a"
  },
  {
    "url": "assets/js/50.198d0d62.js",
    "revision": "038a9d7bbd0537b17e1feef3fabe7b92"
  },
  {
    "url": "assets/js/51.4ce6ec56.js",
    "revision": "8d692a12cd89080a30f8e14ed8c54530"
  },
  {
    "url": "assets/js/52.dac8c5b2.js",
    "revision": "f7e0d17196d7bfeb1f1fa56c38f84c5b"
  },
  {
    "url": "assets/js/53.085ab8ee.js",
    "revision": "f72cb27299f220e86214d0f98d8a1afa"
  },
  {
    "url": "assets/js/54.8fc7df6a.js",
    "revision": "9af9677741e1967bbd342fa9c5f6656f"
  },
  {
    "url": "assets/js/55.6bafdb1c.js",
    "revision": "e8d3d017adb0bfdc177f55ef098486eb"
  },
  {
    "url": "assets/js/56.6a12f97b.js",
    "revision": "a57c9660a323d62440bddcfae96c70e6"
  },
  {
    "url": "assets/js/57.3e27a8dc.js",
    "revision": "b9e8137bc11c823612db0e78579d94e7"
  },
  {
    "url": "assets/js/58.1633d1b8.js",
    "revision": "02109a7fd9995b94a3b5d60acce2f535"
  },
  {
    "url": "assets/js/59.37904dbf.js",
    "revision": "9333c93870d426990b5868c53fad39ae"
  },
  {
    "url": "assets/js/6.ca2525e2.js",
    "revision": "f26b99a11274e34a1a8df09422012df8"
  },
  {
    "url": "assets/js/60.ef92b9d9.js",
    "revision": "a9f9427a4160cd0c14de855d4ed4f814"
  },
  {
    "url": "assets/js/61.235aeb71.js",
    "revision": "602812238bdb79cf09af22ef8d111b42"
  },
  {
    "url": "assets/js/62.5590ca0b.js",
    "revision": "4926079f0ac6526dd951ade63972822d"
  },
  {
    "url": "assets/js/63.a838b89e.js",
    "revision": "5b0b063e4825822e19e263d13b2cbb58"
  },
  {
    "url": "assets/js/64.73d86d1c.js",
    "revision": "8dda39698288f62338c1cf3e66a57ebf"
  },
  {
    "url": "assets/js/65.99528721.js",
    "revision": "7d648c3258bacecbdf2483c0d835a769"
  },
  {
    "url": "assets/js/66.3c523b91.js",
    "revision": "d7ce96f480df2ae4be4a7d53bd86abfc"
  },
  {
    "url": "assets/js/67.fa360026.js",
    "revision": "fca28e4188750dfa9f0c7de9a61e876f"
  },
  {
    "url": "assets/js/68.e36c875c.js",
    "revision": "e80fff68e2f4c5cd96d3ca17d0e6b7f4"
  },
  {
    "url": "assets/js/69.805a9bc6.js",
    "revision": "07d9a8cdbfb7846f2116dd9e2ae59cd9"
  },
  {
    "url": "assets/js/7.8558a783.js",
    "revision": "a60a3877a67b8d772ff7340424ea70fc"
  },
  {
    "url": "assets/js/70.3330cbac.js",
    "revision": "b3a1410044f68f02442a655d57a39126"
  },
  {
    "url": "assets/js/71.676e9b83.js",
    "revision": "f23e24208373858ae3c70c8e45aa95c7"
  },
  {
    "url": "assets/js/72.289e1c3a.js",
    "revision": "28bc14215a358216584053a721689f5c"
  },
  {
    "url": "assets/js/73.573d09d5.js",
    "revision": "c307a3d88979552810563e7d339d30ef"
  },
  {
    "url": "assets/js/74.6d96adc3.js",
    "revision": "2cfb2ddf9d47ebf231a215509300c9f9"
  },
  {
    "url": "assets/js/75.b3d5b385.js",
    "revision": "c4a28195b818fff88abf5055772187e9"
  },
  {
    "url": "assets/js/76.cefc0752.js",
    "revision": "b5974e06c70b498defe4d540e8e190ce"
  },
  {
    "url": "assets/js/77.63109bd8.js",
    "revision": "f830227f04771b6acd547a231b053b21"
  },
  {
    "url": "assets/js/78.e0624176.js",
    "revision": "0f470ea9b5bfbcaf4d7323b8e0f2ab1f"
  },
  {
    "url": "assets/js/79.6bbdc771.js",
    "revision": "d8e5e35555e312ef5096fc1c46c9b60b"
  },
  {
    "url": "assets/js/8.5cedd7f7.js",
    "revision": "2b211f4de03ef0eac363e81006b3a3d7"
  },
  {
    "url": "assets/js/80.cd3d14ab.js",
    "revision": "bc828245098ce8dea2d0717469dc214e"
  },
  {
    "url": "assets/js/81.5dbc55fc.js",
    "revision": "9dda1cfa3d338d6d3876672eb3acc06f"
  },
  {
    "url": "assets/js/82.f688dd79.js",
    "revision": "e2b398533c9cf2c4ef09968c9765b935"
  },
  {
    "url": "assets/js/83.3b67ae79.js",
    "revision": "a4031b93632ee65661d7822d2e79fc15"
  },
  {
    "url": "assets/js/84.3523b115.js",
    "revision": "435ba62db1638c4aa5468a21f69ba4d9"
  },
  {
    "url": "assets/js/85.09d99521.js",
    "revision": "5bb38af89ec30918af8649efd9b58df3"
  },
  {
    "url": "assets/js/86.957f101d.js",
    "revision": "5d02480a65a7cc7c55505ed373d87413"
  },
  {
    "url": "assets/js/87.7309d1bb.js",
    "revision": "d80a6740c6a5df953ee8339f96aa7ec2"
  },
  {
    "url": "assets/js/88.5280f054.js",
    "revision": "8e350f49fa2b5cbac0c1382006225a1b"
  },
  {
    "url": "assets/js/89.d97ff7fa.js",
    "revision": "82624eb1ec0f73818f327fe2c336b4a4"
  },
  {
    "url": "assets/js/9.13d458ed.js",
    "revision": "98983ed4d52578db065fd908e6b49dc6"
  },
  {
    "url": "assets/js/90.90ccc7a1.js",
    "revision": "8b5991d0dd0f370333e42732bd6af624"
  },
  {
    "url": "assets/js/91.970c7db7.js",
    "revision": "0938075ae2abe8ae10dd18f2b9d3eb05"
  },
  {
    "url": "assets/js/92.a9f137fa.js",
    "revision": "d97e72620bfee520eddf09270691356a"
  },
  {
    "url": "assets/js/93.fb8a4a46.js",
    "revision": "ac9a04c123d9eef72595761af7fe972b"
  },
  {
    "url": "assets/js/94.7c861060.js",
    "revision": "ff589b7c66cedaae00e59ec0c1b0d0ce"
  },
  {
    "url": "assets/js/95.c423465d.js",
    "revision": "e17fa997db181c3fb5f8046ed86c6824"
  },
  {
    "url": "assets/js/96.74ec6c0f.js",
    "revision": "5124488dd3ebb9ccc86ddc478f224e88"
  },
  {
    "url": "assets/js/97.65457ffd.js",
    "revision": "eaec986b2d8da8b65b910bf8190837e1"
  },
  {
    "url": "assets/js/98.071f28a1.js",
    "revision": "a3e0cbea071c58a9515a802d7c5e7c24"
  },
  {
    "url": "assets/js/99.de4e6680.js",
    "revision": "5fb6176e99547238ab8a9714fddd9209"
  },
  {
    "url": "assets/js/app.ccd44a42.js",
    "revision": "c30ea1661580f96ea3a6352c95dfc664"
  },
  {
    "url": "deploy/eggjs.chat.html",
    "revision": "0e57654867e11e1b00bc6d7449e19023"
  },
  {
    "url": "deploy/index.html",
    "revision": "e5492e0c0a589b56ee8618f6e6f796e5"
  },
  {
    "url": "deploy/vitevue3.shop.html",
    "revision": "46f6925bf429cca42de153c14578d45a"
  },
  {
    "url": "deploy/vuecli.shop.html",
    "revision": "c2280f1d397fdae9003ab83d7f977ad8"
  },
  {
    "url": "fourthless/index.html",
    "revision": "4795b0e50f1e635a220dd25e0229f0ba"
  },
  {
    "url": "fourthless/w-a.html",
    "revision": "3c9d527b3a765f084254c75c55924d34"
  },
  {
    "url": "fourthless/w-a/02开发前环境搭建.html",
    "revision": "21d3d6fdcfa86ed3d56255bfe437f2b3"
  },
  {
    "url": "fourthless/w-a/eggjs框架开发文档.html",
    "revision": "d3639cdb0c35eefcda2ba1bbbed4b209"
  },
  {
    "url": "fourthless/w-a/thinkphp.修改管理员.html",
    "revision": "e7b15fe622bcde18cff59e5bd304445c"
  },
  {
    "url": "fourthless/w-a/thinkphp.权限管理.html",
    "revision": "40d9d4db204bbac99aadf152ab9bdfc5"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员列表.html",
    "revision": "daa671dcf6283f62e6e6ebe6b81bc6fa"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员板块.html",
    "revision": "a31d02f6a81f6870ab524dbf0fc4420e"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员登录退出.html",
    "revision": "bf9b8b148ff235c55d59df88d1b85656"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员角色管理和状态设置.html",
    "revision": "87666b42a36c6bb9e168176caac28fef"
  },
  {
    "url": "fourthless/w-a/thinkphp.角色管理.html",
    "revision": "b97e6bc3846a4b1ad3da54041dc71a84"
  },
  {
    "url": "fourthless/w-a/thinkphp框架开发文档.html",
    "revision": "2b7ef2747f5aa20e05b0124a86f1d94f"
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
    "revision": "6dab1733176d717696c83f2c8d1435f5"
  },
  {
    "url": "pc/index.html",
    "revision": "0c1419581d9b0f945eff543083f3453e"
  },
  {
    "url": "pc/p-a.html",
    "revision": "9fb225daeb46e93866a21815a22efd5c"
  },
  {
    "url": "pc/p-b.html",
    "revision": "ef860f745503e9f44fa92eb1f992c97d"
  },
  {
    "url": "pc/p-c.html",
    "revision": "957c1b2032ea19a12e6feb554ac37fbd"
  },
  {
    "url": "phone/index.html",
    "revision": "80570a489891fe74477d09dc2458a679"
  },
  {
    "url": "phone/phone-a.html",
    "revision": "092f39ad9a2e5ecc9a098e2c7d7cd04e"
  },
  {
    "url": "phone/phone-b.html",
    "revision": "cc267a4d1d62792c41b50e047c6ba217"
  },
  {
    "url": "phone/phone-c.html",
    "revision": "d6075eac7ecd7ccb6e08fa9448ee22b5"
  },
  {
    "url": "secondless/index.html",
    "revision": "f1026a959de066c26f73fd10e95863e7"
  },
  {
    "url": "secondless/w-a.html",
    "revision": "8091fa45e586cc591a30b196eeab5697"
  },
  {
    "url": "secondless/w-a/Date类型：时间和日期.html",
    "revision": "eb87fbe6935d19c37576b32b2688d168"
  },
  {
    "url": "secondless/w-a/Function类型：函数进阶.html",
    "revision": "1ed6d9e443ecfb5534c1a0ec9d2e2f3a"
  },
  {
    "url": "secondless/w-a/javascript函数.html",
    "revision": "4a4beb48cf7a3ef9eb890e048ad61947"
  },
  {
    "url": "secondless/w-a/javascript基本包装类型.html",
    "revision": "36f29c0f14dd7d389766fe947d809eba"
  },
  {
    "url": "secondless/w-a/javascript基础.html",
    "revision": "cb3c2b329f62cb85cb620656fb995b6c"
  },
  {
    "url": "secondless/w-a/javascript对象.html",
    "revision": "7af70df0e6bd68b5ffa2f10540a16e50"
  },
  {
    "url": "secondless/w-a/javascript数组.html",
    "revision": "71dc23424730002851b33b7c1bdcc8ea"
  },
  {
    "url": "secondless/w-a/javascript运算符.html",
    "revision": "c4e2d8c58c0433fe3f9072731533ae26"
  },
  {
    "url": "secondless/w-a/事件.html",
    "revision": "ffc79e5fe512a7ef2105a7276cd4b14b"
  },
  {
    "url": "secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html",
    "revision": "61a61499757064367ec82ba14079b771"
  },
  {
    "url": "secondless/w-a/函数对象数组小结.html",
    "revision": "39118142c19929a70c0fd9a124f0e5d5"
  },
  {
    "url": "secondless/w-a/匿名函数和闭包.html",
    "revision": "f891fa0c7e118f6c1c45220b076d2416"
  },
  {
    "url": "secondless/w-a/数据Cookie、XML、JSON.html",
    "revision": "2c601cf27541f666388775fa63f21a78"
  },
  {
    "url": "secondless/w-a/流程控制语句.html",
    "revision": "d1f463d918445a4593842fe2434f2888"
  },
  {
    "url": "secondless/w-a/浏览器对象模型BOM及浏览器检测.html",
    "revision": "7c36d4811211b4d9ade06735b5f4809f"
  },
  {
    "url": "secondless/w-a/网页文档对象模型DOM.html",
    "revision": "05dd682dc1f2ef5504165b319a5d83c3"
  },
  {
    "url": "secondless/w-a/表单处理及错误处理与调试.html",
    "revision": "4ef35112fb4dd9b6261e2ff24febdc14"
  },
  {
    "url": "secondless/w-b.html",
    "revision": "7fca7c7235f04b1e2cba9c310261f40b"
  },
  {
    "url": "secondless/w-b/Ajax.html",
    "revision": "78bb9b424b6608636064c6d3f5724911"
  },
  {
    "url": "secondless/w-b/jQuery.html",
    "revision": "db8d696e689c474cdde6528c6737951e"
  },
  {
    "url": "secondless/w-b/jQuery事件、动画、插件.html",
    "revision": "4949792ce476e747dd232ff8ab750a1f"
  },
  {
    "url": "secondless/w-b/Node.js.html",
    "revision": "e706ebf0408243cf581f168993f5bd18"
  },
  {
    "url": "secondless/w-b/node.js+vue.js 渲染企业网站.html",
    "revision": "31dcfd32764a2c35f0ee6b064c2adf8e"
  },
  {
    "url": "secondless/w-b/nodejs+jQuery开发留言板.html",
    "revision": "a2098f9aed1803eff35a1ab1faaeb7d3"
  },
  {
    "url": "secondless/w-b/nodejs服务器端app.js文件.html",
    "revision": "ece4edbdf3a23a7a8cb399fedf7ceb46"
  },
  {
    "url": "secondless/w-b/Vue.js.html",
    "revision": "136b1212b3ec649cc816916ee1d6fd11"
  },
  {
    "url": "secondless/w-b/封装js库过渡到jQuery.html",
    "revision": "57adbd2547512933bfc8daf2ecb3e518"
  },
  {
    "url": "secondless/w-b/正则表达式.html",
    "revision": "c687b7650928bb67fbad5a1922f61d13"
  },
  {
    "url": "secondless/w-b/面向对象与原型.html",
    "revision": "67479f31e3c8b81ed975ffe5bd5bb395"
  },
  {
    "url": "secondless/w-c.html",
    "revision": "a98abaf26735b7cac9903377338cfb26"
  },
  {
    "url": "secondless/w-c/Egg.js.html",
    "revision": "829758d6d4736556de7eeb1eff3c9e16"
  },
  {
    "url": "secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html",
    "revision": "a66d5cfe0ed3e0db0cccf32fe09b2471"
  },
  {
    "url": "secondless/w-c/egg.js基础总结.html",
    "revision": "bf04862a44b33dd88b86bb4efc63d444"
  },
  {
    "url": "secondless/w-c/egg.js重要知识详细文档.html",
    "revision": "862ba044a529da230ee372c9df6a1935"
  },
  {
    "url": "secondless/w-c/eggjs+postman测试工具将留言写入json文件.html",
    "revision": "377836b62c513266be18364154a340c3"
  },
  {
    "url": "secondless/w-c/mysql数据库.html",
    "revision": "8527cb1654269df8a21dc4d7468f7590"
  },
  {
    "url": "secondless/w-c/ValParams API 说明.html",
    "revision": "eceb0deaa02c89075418277d8c005a30"
  },
  {
    "url": "secondless/w-c/上传文件.html",
    "revision": "12ba710a5527a62bbdc7bb5b7cd7911c"
  },
  {
    "url": "secondless/w-c/企业网站其它页面(非首页).html",
    "revision": "fb02a45ac20554428565623e84be9157"
  },
  {
    "url": "secondless/w-c/企业网站前端部分.html",
    "revision": "81c744e064d55bdf547bcbe73a4bf9c6"
  },
  {
    "url": "secondless/w-c/企业网站后台内容管理.html",
    "revision": "c7e9902234b9eb709b970a787b3308b3"
  },
  {
    "url": "secondless/w-c/企业网站后台栏目管理.html",
    "revision": "8014675f26ce5fc7a4619b313329cce5"
  },
  {
    "url": "secondless/w-c/企业网站首页.html",
    "revision": "4b0da5bd6bd058c7ddad2bf9d7fb7874"
  },
  {
    "url": "secondless/w-c/响应式后台公共模版.html",
    "revision": "a94d8a1b4fadc3211bb2c1443dc6850a"
  },
  {
    "url": "secondless/w-c/响应式后台用户留言板管理.html",
    "revision": "89ffbc7a334aea0a0491cdddb2943bef"
  },
  {
    "url": "secondless/w-c/响应式后台界面示例代码.html",
    "revision": "363c3ee225bbeea9f2d91ef69a0eea5b"
  },
  {
    "url": "secondless/w-c/响应式后台管理员登录.html",
    "revision": "8f354ce731b717c8f31881a2f84e5cc2"
  },
  {
    "url": "secondless/w-c/响应式后台管理系统.html",
    "revision": "152da46faaee7cd38cff0eeca4982ce6"
  },
  {
    "url": "secondless/w-c/响应式网页布局.html",
    "revision": "77947c3b349defb349f10dc1e30d9508"
  },
  {
    "url": "secondless/w-c/响应式网页布局指导思路.html",
    "revision": "5e5c0a142c4055f8ff1ad63fead786c3"
  },
  {
    "url": "secondless/w-c/树形结构方法演变.html",
    "revision": "95ca59f69180fde752b031599838758d"
  },
  {
    "url": "secondless/w-c/直播功能中的用户表liveuser.html",
    "revision": "40898d0521b4fb9739b9e43ab12e6da9"
  },
  {
    "url": "secondless/w-c/直播功能中的直播间表live.html",
    "revision": "da9c65403e09dcc797db405bfb995fe2"
  },
  {
    "url": "secondless/w-c/直播功能中的礼物表livegift.html",
    "revision": "f7427fa7726b46fecf903a5e21b53c60"
  },
  {
    "url": "secondless/w-c/直播功能中的订单表liveorder.html",
    "revision": "4f8940c6007be6abb676793cb4ab3f80"
  },
  {
    "url": "secondless/w-c/网站后台管理员简单权限分配功能实现.html",
    "revision": "4c9834b9d8fe162ee3e999610df20856"
  },
  {
    "url": "secondless/w-d.html",
    "revision": "e6dd6b087ae8ee41e48ec6189808e489"
  },
  {
    "url": "secondless/w-d/SSL证书.html",
    "revision": "d6ea0ea3dc9a9259d1a46032a847f558"
  },
  {
    "url": "secondless/w-d/网站代码上线调试.html",
    "revision": "0ee47be7f4a6cd59e7c2dbcb08caa4fe"
  },
  {
    "url": "secondless/w-d/购买域名.html",
    "revision": "f4c0b4dac92a8a47f7756d22cbe11a57"
  },
  {
    "url": "secondless/w-d/购买服务器.html",
    "revision": "510e6c66598488051d41439e59c9bb89"
  },
  {
    "url": "thirdless/index.html",
    "revision": "c561fbcea7d8876661acb05b707138c6"
  },
  {
    "url": "thirdless/w-a.html",
    "revision": "2aa90285f070bcc5c86b63b7f4cd5276"
  },
  {
    "url": "thirdless/w-a/02开发前环境搭建.html",
    "revision": "8e1bdb879714b0763c62af287e0cef9c"
  },
  {
    "url": "thirdless/w-a/03引入UI框架及进行全局配置.html",
    "revision": "6556100a92424527cdf47dedc7437077"
  },
  {
    "url": "thirdless/w-a/04首页开发.html",
    "revision": "3e26d556a889d641e8a008afba305a6f"
  },
  {
    "url": "thirdless/w-a/05其它界面开发.html",
    "revision": "c0fdcf7fa023d5ce53d1de4a6706bf80"
  },
  {
    "url": "thirdless/w-a/06数据处理.html",
    "revision": "10c6da6c51a4b468f6d8ef35f4a9e80d"
  },
  {
    "url": "thirdless/w-a/07后端api开发.html",
    "revision": "b58893ceacbfa6d39a450684c4693449"
  },
  {
    "url": "thirdless/w-a/07后端api开发代码.html",
    "revision": "34bc30f8120dc372754b35f76f171fca"
  },
  {
    "url": "thirdless/w-a/08数据交互和界面展示.html",
    "revision": "38c54539e08d73d295ebc3ccaf667ac4"
  },
  {
    "url": "thirdless/w-b.html",
    "revision": "de866a8cb909af4cfb9f3965a29a255a"
  },
  {
    "url": "thirdless/w-c.html",
    "revision": "dec43c6d68b2009d6528f245fb933007"
  },
  {
    "url": "thirdless/w-d.html",
    "revision": "f87f3a91f3bb751cc86f2acbfcc6bb6c"
  },
  {
    "url": "thirdless/w-e.html",
    "revision": "cbe1668f97e3b60e1129e55c512a1d40"
  },
  {
    "url": "web/answer/课程常见问题.html",
    "revision": "6e46261be2925989bed0e2d508977a4f"
  },
  {
    "url": "web/bootstrap/index.html",
    "revision": "05d4de5cdf63b52477fa09c7d47743a7"
  },
  {
    "url": "web/css/index.html",
    "revision": "86de564379304dcc707a19284ac50d11"
  },
  {
    "url": "web/css/封装的css样式库.html",
    "revision": "0290be0329acf819e38dd6309fbd1085"
  },
  {
    "url": "web/echarts/index.html",
    "revision": "5bec4aa8b05d4f8782adb4224be1dcef"
  },
  {
    "url": "web/github/index.html",
    "revision": "48fc2867586b407c6bc8a2bc4644cdbb"
  },
  {
    "url": "web/IIS/index.html",
    "revision": "13b76595a48707c1b38bb8095ad34adf"
  },
  {
    "url": "web/index.html",
    "revision": "716f2cb1eef81c7e05f8767a2d5fbfa9"
  },
  {
    "url": "web/methods/地图相关.html",
    "revision": "dff48a00c6dcf2d9f89b56aee10b540f"
  },
  {
    "url": "web/methods/定位相关.html",
    "revision": "2f016ecd3acfb3a22686df146680f968"
  },
  {
    "url": "web/methods/实用接口.html",
    "revision": "0af56c967374ab92a6e4de522ea23f04"
  },
  {
    "url": "web/mysql/index.html",
    "revision": "02d5a9dd7cfe9916e3ae465a41d5fac9"
  },
  {
    "url": "web/mysql/role.html",
    "revision": "a243a397c55a808108fdcf97a99a2a49"
  },
  {
    "url": "web/mysql/rolecategory.html",
    "revision": "ea093323e4418ffa8e2438b5c776d968"
  },
  {
    "url": "web/mysql/role表接口.html",
    "revision": "51317f25e8009c0956b260bdbf69d2e3"
  },
  {
    "url": "web/mysql/rule表接口.html",
    "revision": "f0068f78c390e0ac6eb5ba303676b376"
  },
  {
    "url": "web/mysql/shop_manager.html",
    "revision": "d36ec268f7ef1624d369519995868b20"
  },
  {
    "url": "web/mysql/shop_manager表接口.html",
    "revision": "2480950064c55848e57092ca651129e9"
  },
  {
    "url": "web/shop/index.html",
    "revision": "a7d06561d192228601bd89e27fdec5d0"
  },
  {
    "url": "web/software/index.html",
    "revision": "6cf5ba02bfbbacff55229e43581db378"
  },
  {
    "url": "web/Vanta.js/index.html",
    "revision": "a564f28b314e4df78c5faf0e5c4e2081"
  },
  {
    "url": "web/vue.js/index.html",
    "revision": "a4647dd3272ae3d06e2cd53c7885dc9d"
  },
  {
    "url": "web/Vue3+ElementPlus/index.html",
    "revision": "cc13ef86ba5e878963ce3b9cd6a53d19"
  },
  {
    "url": "web/w-a.html",
    "revision": "56b425b4a2810f091a276d08006d3986"
  },
  {
    "url": "web/w-b.html",
    "revision": "cada6af93a1fc804982973d64684ca94"
  },
  {
    "url": "web/w-c.html",
    "revision": "8550ec3fc100e99096662fb5aa6e6851"
  },
  {
    "url": "开发记录.html",
    "revision": "a1708ce3e6a5216b130817daccffa6b2"
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
