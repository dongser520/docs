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
    "revision": "40738276817c1244f5b3bc51b932d47a"
  },
  {
    "url": "about.html",
    "revision": "da266fb3664ca66ee0c080695bb4b779"
  },
  {
    "url": "about/index.html",
    "revision": "1fb88a1716bdc9fb290dda49a427d91f"
  },
  {
    "url": "aboutless.html",
    "revision": "4020f5753436dacce2bc15ff006f3534"
  },
  {
    "url": "assets/css/0.styles.7bedf34a.css",
    "revision": "d169db3d8f0618d4f524a567d11b523c"
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
    "url": "assets/js/100.d69f22a9.js",
    "revision": "d090d7b5bc6a6eaba2ed3cebb35ed508"
  },
  {
    "url": "assets/js/101.d462af6d.js",
    "revision": "773cd4e51bae0cd7ef7f9e93072bc708"
  },
  {
    "url": "assets/js/102.e2a50875.js",
    "revision": "6b96e8c82216b61920f0392937cd5666"
  },
  {
    "url": "assets/js/103.4c83f531.js",
    "revision": "079d56c0b06084a6fe1a3049dfdf2b8e"
  },
  {
    "url": "assets/js/104.a8cbc9ca.js",
    "revision": "1929934ea968513c179240df674c1c65"
  },
  {
    "url": "assets/js/105.52e6042a.js",
    "revision": "a04d0e90bcc5871a0a8f4efc28830354"
  },
  {
    "url": "assets/js/106.d11f3672.js",
    "revision": "d576e1089e1ca78a4ed8d33af4ef0785"
  },
  {
    "url": "assets/js/107.2b1327f5.js",
    "revision": "961b3bd2eda9024af31c196717cf8135"
  },
  {
    "url": "assets/js/108.1c330c7b.js",
    "revision": "9819a430952544e4c307fbdc04d1ecf4"
  },
  {
    "url": "assets/js/109.7e50ceac.js",
    "revision": "be933f8e47417e8b34cc74fb0151799e"
  },
  {
    "url": "assets/js/11.934eb133.js",
    "revision": "0cbfb5a79c209befa057aecc68c6e027"
  },
  {
    "url": "assets/js/110.264ab80a.js",
    "revision": "087b0a76418e042f269bd0e62b098548"
  },
  {
    "url": "assets/js/111.f03db73e.js",
    "revision": "5403b1863492830f0607b38ab2011b85"
  },
  {
    "url": "assets/js/112.8d95cc3b.js",
    "revision": "eb04abd96199fbfa3de82608433a93c7"
  },
  {
    "url": "assets/js/113.663dda78.js",
    "revision": "b9b58fff5605f8364429937cb4f155b4"
  },
  {
    "url": "assets/js/114.a7cc180e.js",
    "revision": "15805696f1810a9c549367ad687ec684"
  },
  {
    "url": "assets/js/115.5c5b9c3e.js",
    "revision": "eb9e55b52b4144b31e1a308d50050092"
  },
  {
    "url": "assets/js/116.4c31768f.js",
    "revision": "3ead8d3b7a5794af35c12571c4f51cf6"
  },
  {
    "url": "assets/js/117.04777b82.js",
    "revision": "f8007469a8497aed548d7c4ec67a58af"
  },
  {
    "url": "assets/js/118.5d2f5fa1.js",
    "revision": "6c7dde06e6a1352b4237203509450b29"
  },
  {
    "url": "assets/js/119.40e2582c.js",
    "revision": "57c97affe0ff972e27c1aa72354c4771"
  },
  {
    "url": "assets/js/12.cc2380d1.js",
    "revision": "db2bbf818f1a04422508866c29849f49"
  },
  {
    "url": "assets/js/120.81cf7a99.js",
    "revision": "e79f3e67454104c9eb7b58b0fc55fac0"
  },
  {
    "url": "assets/js/121.6b80dcc4.js",
    "revision": "1483e6d27d96def299fa7bb5eddb2b78"
  },
  {
    "url": "assets/js/122.e7b1fcd3.js",
    "revision": "1977e2a3976e86ab7231c40a49a5e1aa"
  },
  {
    "url": "assets/js/123.41d235dc.js",
    "revision": "ccdd718cc4b60d2934a09b3fb5392849"
  },
  {
    "url": "assets/js/124.83382681.js",
    "revision": "ea7b92ffeb891b58627cc645fdefc65d"
  },
  {
    "url": "assets/js/125.8c4b279a.js",
    "revision": "c223cf8d72b300f6193b045039a349a0"
  },
  {
    "url": "assets/js/126.c0432924.js",
    "revision": "389601022f7b52488f8072936d586898"
  },
  {
    "url": "assets/js/127.03f8158c.js",
    "revision": "121f9422c95c381ad922206729c8eaa1"
  },
  {
    "url": "assets/js/128.d3396cdf.js",
    "revision": "1e0d11978b70936a50c47011460827b8"
  },
  {
    "url": "assets/js/129.c437760f.js",
    "revision": "2516b567e4a28dd01df78506ac711649"
  },
  {
    "url": "assets/js/13.50c9a147.js",
    "revision": "bed37f54cddae07ff1e84a7d8953e36c"
  },
  {
    "url": "assets/js/130.0fafdd10.js",
    "revision": "6fe30a913ab607cc428c88cdb83d31c8"
  },
  {
    "url": "assets/js/131.bbe55c4f.js",
    "revision": "0dc2ef80fa6ce1bc2291fa41043890b6"
  },
  {
    "url": "assets/js/132.c7b00229.js",
    "revision": "aaaf77560166e6025889ee653373e97f"
  },
  {
    "url": "assets/js/133.92fbaf2d.js",
    "revision": "d136cb3d361b6d66930d2a71c8c27982"
  },
  {
    "url": "assets/js/134.6e9de74a.js",
    "revision": "b5d20213f8115c3ff9c221a7cbe3e243"
  },
  {
    "url": "assets/js/135.59650dfc.js",
    "revision": "cd14f517ebc948f6b62c351649d585e7"
  },
  {
    "url": "assets/js/136.06422746.js",
    "revision": "6bd201f40fd6dbff2aa302ab694ae3cc"
  },
  {
    "url": "assets/js/137.58e77af3.js",
    "revision": "d7e4fbfee52046b3eceba1a8744a1ca1"
  },
  {
    "url": "assets/js/138.7a91b915.js",
    "revision": "bb1187335d4c2495abb74f37b6f26b87"
  },
  {
    "url": "assets/js/139.c645aede.js",
    "revision": "85634b7f74550991c4bb31e110894046"
  },
  {
    "url": "assets/js/14.a1283673.js",
    "revision": "d57bcfde9a9e52b46bf320f2957ce3a9"
  },
  {
    "url": "assets/js/140.d0e78ff2.js",
    "revision": "f3296d7041a158b97d8403deff6f39ad"
  },
  {
    "url": "assets/js/141.d03af9e9.js",
    "revision": "961d2dd1af63a1f93ff68e248d71b15f"
  },
  {
    "url": "assets/js/142.f87be59c.js",
    "revision": "a718b59b0c51628211fed5ad4fe10659"
  },
  {
    "url": "assets/js/143.148885d2.js",
    "revision": "e2ca3ed9a96adbafedb7a73667003ce0"
  },
  {
    "url": "assets/js/144.0c78c148.js",
    "revision": "b76cefe4fa8c4fee46d34c761d9fc882"
  },
  {
    "url": "assets/js/145.d43a5eec.js",
    "revision": "ab63006ad8e1662c5097f15abaf344dd"
  },
  {
    "url": "assets/js/15.967ec7b7.js",
    "revision": "e02e5acbf6f712c03442c168c931caa2"
  },
  {
    "url": "assets/js/16.e5d553b8.js",
    "revision": "04f2a39cda6b0483f076bd6e67a8fd77"
  },
  {
    "url": "assets/js/17.f3f4fe6e.js",
    "revision": "12ecd65246fc7e0c711ef4f7261875f6"
  },
  {
    "url": "assets/js/18.b3fc4cb0.js",
    "revision": "20928c7eae80ddc468fa762b7c866dae"
  },
  {
    "url": "assets/js/19.16768c75.js",
    "revision": "9060c345c3a8a9e0499a6ed7e376d293"
  },
  {
    "url": "assets/js/2.6281e0bb.js",
    "revision": "6953100b4156b74d48f76069058a12a9"
  },
  {
    "url": "assets/js/20.f46354a1.js",
    "revision": "113c0dc9712d1f6ebf1e6825fc601799"
  },
  {
    "url": "assets/js/21.67cba0cf.js",
    "revision": "44da5eded73df85d4b704268ce2b0071"
  },
  {
    "url": "assets/js/22.cb03f973.js",
    "revision": "af38b1d7054986a5aa51ad1ef2bb36ad"
  },
  {
    "url": "assets/js/23.d87be0e8.js",
    "revision": "4810a520dc7fb97c25676b8ac498e771"
  },
  {
    "url": "assets/js/24.ccbbd22e.js",
    "revision": "967557fdf8ae27483d9f76c5a9c6e21d"
  },
  {
    "url": "assets/js/25.2dd6f204.js",
    "revision": "cc772006049db9a3cff05b045e3a1aae"
  },
  {
    "url": "assets/js/26.534cc012.js",
    "revision": "0814ea4cd39bca6ca1ed0ce892670eb2"
  },
  {
    "url": "assets/js/27.7d1b0c2c.js",
    "revision": "2945a34b046eec28c1cd78003fc56889"
  },
  {
    "url": "assets/js/28.504c2ec3.js",
    "revision": "ac86d9d90f84163e503ca2efb606bf15"
  },
  {
    "url": "assets/js/29.b191606a.js",
    "revision": "ce29aec7dbd757ca136f36fc065bcbaa"
  },
  {
    "url": "assets/js/3.e6827fa8.js",
    "revision": "f1ffa92e22c7370c76abfc2cdb906d17"
  },
  {
    "url": "assets/js/30.21c4628e.js",
    "revision": "b08dddaecd611799a3fbeffec8fcffc5"
  },
  {
    "url": "assets/js/31.fe2cc187.js",
    "revision": "ba1e70cc6caed4f0e83f2bb5699366f0"
  },
  {
    "url": "assets/js/32.6bd7d62f.js",
    "revision": "de8af879c111a49520960b7ad3b86de2"
  },
  {
    "url": "assets/js/33.32c14bc6.js",
    "revision": "fff68f3b1b761b4e7c6ca264f0d28726"
  },
  {
    "url": "assets/js/34.0fd0b4ba.js",
    "revision": "c9d8e679804e375cf2b33d1d2f1a629d"
  },
  {
    "url": "assets/js/35.b5b8dac8.js",
    "revision": "88f1a64785d8e5541117a6698edd11c5"
  },
  {
    "url": "assets/js/36.3ca1e251.js",
    "revision": "694bf6fcceb312ee3e1fc529e3d7179a"
  },
  {
    "url": "assets/js/37.0ddf130b.js",
    "revision": "f6573474b3e77134ce782379056c26d7"
  },
  {
    "url": "assets/js/38.d53d866a.js",
    "revision": "52e16da9968a65dbb6bcc0aa07255ceb"
  },
  {
    "url": "assets/js/39.60edbcb9.js",
    "revision": "ea3d5167efa694504a5b18cd37336c98"
  },
  {
    "url": "assets/js/4.44c769d0.js",
    "revision": "a66cfcc391be67ea3645691caea70d52"
  },
  {
    "url": "assets/js/40.112e21d2.js",
    "revision": "e75fba2d8ac2798eac5b9bb79a00bfe5"
  },
  {
    "url": "assets/js/41.3d8ed77c.js",
    "revision": "e21d50861bd83f2a51104090cfc0b375"
  },
  {
    "url": "assets/js/42.d3680f28.js",
    "revision": "bb2d9c7d75e030765206370237db9df7"
  },
  {
    "url": "assets/js/43.03fe8bd3.js",
    "revision": "e99fffd74e2185d3479620a36ae45975"
  },
  {
    "url": "assets/js/44.59260df4.js",
    "revision": "dcf7d433e76d0b7ac4ea1657445c5489"
  },
  {
    "url": "assets/js/45.3a4c52dd.js",
    "revision": "62006281f24520eb66d2a7ba1a26cecc"
  },
  {
    "url": "assets/js/46.3f286741.js",
    "revision": "6fb5078d88e8504e6c52faa7d008a5bc"
  },
  {
    "url": "assets/js/47.120a4795.js",
    "revision": "0b7237ee08dafc64d1b4646c2b555f8f"
  },
  {
    "url": "assets/js/48.2633f456.js",
    "revision": "4502dd61761bed588e233d8396347eda"
  },
  {
    "url": "assets/js/49.b4a3d48b.js",
    "revision": "7eaa42fa6d39cc8ff7e9bad13d886ddd"
  },
  {
    "url": "assets/js/5.96ff8e0a.js",
    "revision": "666e6b50dfc2cf531969ebaa2393d6a7"
  },
  {
    "url": "assets/js/50.75d562ab.js",
    "revision": "9dd60c65f9472648ae36408be5544de3"
  },
  {
    "url": "assets/js/51.2266c847.js",
    "revision": "6d73fee0e60477f0f644e896dc88d563"
  },
  {
    "url": "assets/js/52.efca2557.js",
    "revision": "da1a58f18c7490359b93c802ea6eecbc"
  },
  {
    "url": "assets/js/53.6dfc7875.js",
    "revision": "54a1117b52c8d9bb8c05f5db750bc8f6"
  },
  {
    "url": "assets/js/54.9e240a39.js",
    "revision": "59877a44c4ca1430c5e724b6a7835341"
  },
  {
    "url": "assets/js/55.fe2b8666.js",
    "revision": "8c5d5280d7c889df58e9ad3cfa6dbf9a"
  },
  {
    "url": "assets/js/56.37e4e3a6.js",
    "revision": "86619326bc7e4f3d31e294163a613beb"
  },
  {
    "url": "assets/js/57.cca0b2cd.js",
    "revision": "acee14a19cff5a3df5f9100dd19136e7"
  },
  {
    "url": "assets/js/58.ce6f966b.js",
    "revision": "2421a07101c9dac0eb73ce4992d9d49c"
  },
  {
    "url": "assets/js/59.f77883b1.js",
    "revision": "46327a317fadf05586190f680117a269"
  },
  {
    "url": "assets/js/6.79da862f.js",
    "revision": "0a947672d89228fc2f70ef06fb6ea528"
  },
  {
    "url": "assets/js/60.a018ac69.js",
    "revision": "cd919dd3a0a1864dad33d153c478a184"
  },
  {
    "url": "assets/js/61.302bb8e0.js",
    "revision": "c014a88360607795eff17a354128d5dc"
  },
  {
    "url": "assets/js/62.c8acb5ea.js",
    "revision": "bb213919d43c99b4b05714dcd82d1eec"
  },
  {
    "url": "assets/js/63.43c21806.js",
    "revision": "d460f0b9c0d3a61aa8996cefacd3f617"
  },
  {
    "url": "assets/js/64.5b021b00.js",
    "revision": "d24fae58f3d352338133192fbe380f14"
  },
  {
    "url": "assets/js/65.14a7e0a7.js",
    "revision": "52bd5704cff5a3951810d4244ae66be1"
  },
  {
    "url": "assets/js/66.2304af34.js",
    "revision": "5c51afdea0fc8483bf991f91f52b86bf"
  },
  {
    "url": "assets/js/67.aa288a08.js",
    "revision": "de00b99bd6bf634a74585be79c18d84f"
  },
  {
    "url": "assets/js/68.30c129ad.js",
    "revision": "ae6f82acbe31dac067b2f1e1d957be92"
  },
  {
    "url": "assets/js/69.d5e3545e.js",
    "revision": "964c00b86a4785f8fe500480ac2058ac"
  },
  {
    "url": "assets/js/7.a483e495.js",
    "revision": "130c446081b54cadb79b52a7ad8f6b5d"
  },
  {
    "url": "assets/js/70.380589f7.js",
    "revision": "7962f28e3e672888948bc9c530a69fdf"
  },
  {
    "url": "assets/js/71.7cc6b023.js",
    "revision": "c63d31c48376391e16c77f5af4de444d"
  },
  {
    "url": "assets/js/72.c0344c7e.js",
    "revision": "6ef73a3ba47eb79a0197ba039bfa026e"
  },
  {
    "url": "assets/js/73.93a0fbd5.js",
    "revision": "107f0afd7d72cf9147d3e7ba8d8b8755"
  },
  {
    "url": "assets/js/74.48d0f56f.js",
    "revision": "56e57e7252da11960754d285c712dc2e"
  },
  {
    "url": "assets/js/75.e371ba0e.js",
    "revision": "61c01fdcff2e4e06d620be4dc5beeb84"
  },
  {
    "url": "assets/js/76.c396c575.js",
    "revision": "173f4794d21e98ca156a36eebf19da5b"
  },
  {
    "url": "assets/js/77.da2c0575.js",
    "revision": "d9826ee52a852a3ecd6f7051918e2fe4"
  },
  {
    "url": "assets/js/78.3c195d94.js",
    "revision": "ab5d74d8124c1cf04e51851ee1079395"
  },
  {
    "url": "assets/js/79.ef96a3c8.js",
    "revision": "9204db621f794bbc7983234beb8d1731"
  },
  {
    "url": "assets/js/8.62776c67.js",
    "revision": "c2979185852c80f1075fe15c9fbf71bd"
  },
  {
    "url": "assets/js/80.a4f4bd86.js",
    "revision": "86f4fc1c3887e69f1b5ae0605cf0e3f7"
  },
  {
    "url": "assets/js/81.9b035f2e.js",
    "revision": "dd7b26ef8e3093909a520c86bf78ea21"
  },
  {
    "url": "assets/js/82.5f261383.js",
    "revision": "397f78ceb5adf011ec0d81b33872e405"
  },
  {
    "url": "assets/js/83.d83bda3d.js",
    "revision": "5d03c85fcdf5bd6a7f88314c2faf9b84"
  },
  {
    "url": "assets/js/84.c9659c3a.js",
    "revision": "251698b6906891280196aeae4b3a73cc"
  },
  {
    "url": "assets/js/85.5d6638a1.js",
    "revision": "3f9d333136022d3fda6e824cbf0b4ef2"
  },
  {
    "url": "assets/js/86.22c54105.js",
    "revision": "a7592e12a7e3a2f94c91cc43fa6941e3"
  },
  {
    "url": "assets/js/87.cd156ce5.js",
    "revision": "2e8bd9e61c2002c5b55d020b7cd13d86"
  },
  {
    "url": "assets/js/88.2df33a9c.js",
    "revision": "3798842bbba751db1b9f38788da19af0"
  },
  {
    "url": "assets/js/89.b6f83374.js",
    "revision": "1432dc1a6234865b7d00644545a7283c"
  },
  {
    "url": "assets/js/9.13d458ed.js",
    "revision": "98983ed4d52578db065fd908e6b49dc6"
  },
  {
    "url": "assets/js/90.107cfd0f.js",
    "revision": "32931b44cbf7d4f9dde8181b29cdd490"
  },
  {
    "url": "assets/js/91.68891c94.js",
    "revision": "a62c5b3a3c73d8163a98bd7f239831f0"
  },
  {
    "url": "assets/js/92.5bbe2134.js",
    "revision": "880eed1f8ebbdcaf47348582cd2939cb"
  },
  {
    "url": "assets/js/93.a0c229de.js",
    "revision": "fb9dd40a76ce4f166848da3505644c3f"
  },
  {
    "url": "assets/js/94.d77164f7.js",
    "revision": "2a24e54cf62f4f5ddbe4b67c995a8c96"
  },
  {
    "url": "assets/js/95.6c77e75b.js",
    "revision": "e4cee72971237e5cd7afb7b6e8c11cd5"
  },
  {
    "url": "assets/js/96.bf120fe4.js",
    "revision": "b9faeefef319ff386daa9864dcbbbfff"
  },
  {
    "url": "assets/js/97.44de71f1.js",
    "revision": "fddcc1cf0e0341c7e05ac330953c99d4"
  },
  {
    "url": "assets/js/98.f1440ec8.js",
    "revision": "2b0f60337f8280609a2f08d617a43d39"
  },
  {
    "url": "assets/js/99.16247d45.js",
    "revision": "cdadc73cc6b47463e1aeb5423f5f45d5"
  },
  {
    "url": "assets/js/app.fc0e6538.js",
    "revision": "3f567351ea7ccb1e0be56057a067fdf8"
  },
  {
    "url": "deploy/eggjs.chat.html",
    "revision": "1b8a9436785f2e7b71f1fc325f805a42"
  },
  {
    "url": "deploy/index.html",
    "revision": "8a85a17b1defbfd0436be82d7f2b81fc"
  },
  {
    "url": "deploy/vitevue3.shop.html",
    "revision": "9d23ffb97c9261a04b285d19f25c99a3"
  },
  {
    "url": "deploy/vuecli.shop.html",
    "revision": "5382f60fca17ff0b63f6a8bebad5750f"
  },
  {
    "url": "fourthless/index.html",
    "revision": "f89130fd6dcbd08cf045230be2b9945d"
  },
  {
    "url": "fourthless/w-a.html",
    "revision": "62db6c7b0140335b67a6be5f50ab826e"
  },
  {
    "url": "fourthless/w-a/02开发前环境搭建.html",
    "revision": "75bc5125e9d8504f5708f4baeab5791d"
  },
  {
    "url": "fourthless/w-a/eggjs.管理员板块.html",
    "revision": "f67fa96538c4c5be84ffe69a749ff7f7"
  },
  {
    "url": "fourthless/w-a/eggjs框架开发文档.html",
    "revision": "f1996ed3b01f92a149fb8424323c81a8"
  },
  {
    "url": "fourthless/w-a/thinkphp.修改管理员.html",
    "revision": "f458c24ea7506fa439e72244004836f7"
  },
  {
    "url": "fourthless/w-a/thinkphp.权限管理.html",
    "revision": "c9124ec146df33f7c0e0e2ed148067a5"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员列表.html",
    "revision": "a05a8b0f161e9f76c60bd14afdcc076b"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员板块.html",
    "revision": "96b6cb7742d68709715d69fc32d7c958"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员登录退出.html",
    "revision": "b4771fb9b740ac3d57cbd7d78cc71d75"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员角色管理和状态设置.html",
    "revision": "4731edfdfeddbc06398e48aa1e528780"
  },
  {
    "url": "fourthless/w-a/thinkphp.角色管理.html",
    "revision": "1e5c178385f0f023981348d2d7a61262"
  },
  {
    "url": "fourthless/w-a/thinkphp框架开发文档.html",
    "revision": "360f88705d9784c408c6633d61ab3c6d"
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
    "revision": "82f74d690f5351dbf2d3c9027deb5249"
  },
  {
    "url": "pc/index.html",
    "revision": "5e6b2e04ffd812d27472d8ff0117506d"
  },
  {
    "url": "pc/p-a.html",
    "revision": "b767c737b5c255f266937c806b0c928b"
  },
  {
    "url": "pc/p-b.html",
    "revision": "9f384fc61feee95f562e7e1a79616deb"
  },
  {
    "url": "pc/p-c.html",
    "revision": "58175e9aa58f737ac22a65f0b5c5a0e1"
  },
  {
    "url": "phone/index.html",
    "revision": "4e8ff36a90f2b218edc22fd2654180f3"
  },
  {
    "url": "phone/phone-a.html",
    "revision": "d3f443baf3a83cd186838e25f0b88e7e"
  },
  {
    "url": "phone/phone-b.html",
    "revision": "aba9ab8507721596b0d0e7acc294cbb0"
  },
  {
    "url": "phone/phone-c.html",
    "revision": "03f31dbc952addd38ea54d8d7e578b8c"
  },
  {
    "url": "secondless/index.html",
    "revision": "9c6088bd46157fc0641020e63cd31223"
  },
  {
    "url": "secondless/w-a.html",
    "revision": "43c4bc7b1997f1e158bbf4a9c854eda8"
  },
  {
    "url": "secondless/w-a/Date类型：时间和日期.html",
    "revision": "ef16997479908d39a9dab4dad8a6ce62"
  },
  {
    "url": "secondless/w-a/Function类型：函数进阶.html",
    "revision": "24745173e80c717ec5f948a48adf380c"
  },
  {
    "url": "secondless/w-a/javascript函数.html",
    "revision": "1d9fce62649629857b7a8e6fcb8ce18a"
  },
  {
    "url": "secondless/w-a/javascript基本包装类型.html",
    "revision": "1b31bc918a50404df454c104340d7b69"
  },
  {
    "url": "secondless/w-a/javascript基础.html",
    "revision": "16bb4e98f67c900f30330629611fa682"
  },
  {
    "url": "secondless/w-a/javascript对象.html",
    "revision": "cfc53477263d8d3a0cf6343808089846"
  },
  {
    "url": "secondless/w-a/javascript数组.html",
    "revision": "eefe538422f8ffd0a2ab801b5bb928a7"
  },
  {
    "url": "secondless/w-a/javascript运算符.html",
    "revision": "f1535067113a4f8095cd8ee9c00005e7"
  },
  {
    "url": "secondless/w-a/事件.html",
    "revision": "4c88a5943c6d1488e963070005fa77ba"
  },
  {
    "url": "secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html",
    "revision": "eca2c180304314e5398fa0bbc8c57837"
  },
  {
    "url": "secondless/w-a/函数对象数组小结.html",
    "revision": "54a5dcaf951662080af3e94a54e99166"
  },
  {
    "url": "secondless/w-a/匿名函数和闭包.html",
    "revision": "7b98073df2ac40d42181e7a5e8d1603a"
  },
  {
    "url": "secondless/w-a/数据Cookie、XML、JSON.html",
    "revision": "9a49f2d33f7567a63a4d5ca8c52d5618"
  },
  {
    "url": "secondless/w-a/流程控制语句.html",
    "revision": "582d6672f1caa30f3feea3495e9a9f64"
  },
  {
    "url": "secondless/w-a/浏览器对象模型BOM及浏览器检测.html",
    "revision": "6bc333020cc9c462c9712da521979a14"
  },
  {
    "url": "secondless/w-a/网页文档对象模型DOM.html",
    "revision": "d6542bb4588daeb8427187202322de60"
  },
  {
    "url": "secondless/w-a/表单处理及错误处理与调试.html",
    "revision": "1e70369bb4a88abac0a9fb0a5112d9ba"
  },
  {
    "url": "secondless/w-b.html",
    "revision": "fdddcfb25fdf0470aa0d2c93505fd1ac"
  },
  {
    "url": "secondless/w-b/Ajax.html",
    "revision": "2a299920db377d721f8088b1f4bfbe95"
  },
  {
    "url": "secondless/w-b/jQuery.html",
    "revision": "ea153ec5be64e9968304bfe4e98fbcca"
  },
  {
    "url": "secondless/w-b/jQuery事件、动画、插件.html",
    "revision": "0c888bf29de7eaeb0f2ced9475bb63bc"
  },
  {
    "url": "secondless/w-b/Node.js.html",
    "revision": "f1af1b6ee4eb5a1fec5708f33dd6557d"
  },
  {
    "url": "secondless/w-b/node.js+vue.js 渲染企业网站.html",
    "revision": "86008838696639896319fa21018b26d0"
  },
  {
    "url": "secondless/w-b/nodejs+jQuery开发留言板.html",
    "revision": "3ab499b23c574ad5d4d9c49e90669a1c"
  },
  {
    "url": "secondless/w-b/nodejs服务器端app.js文件.html",
    "revision": "ea491cf8f691f89d9fc96e1a1461fe26"
  },
  {
    "url": "secondless/w-b/Vue.js.html",
    "revision": "c06fd1e358c5eedf487e56928663c27f"
  },
  {
    "url": "secondless/w-b/封装js库过渡到jQuery.html",
    "revision": "056ea59ab690f5f98103f24e2a6ce7f9"
  },
  {
    "url": "secondless/w-b/正则表达式.html",
    "revision": "6ece1255bbef34154eaa8454607265e5"
  },
  {
    "url": "secondless/w-b/面向对象与原型.html",
    "revision": "a1ab7b8de7287a3868202f8451d3205c"
  },
  {
    "url": "secondless/w-c.html",
    "revision": "f9c6e78c9a37b89178d185fe5c5c3a9b"
  },
  {
    "url": "secondless/w-c/Egg.js.html",
    "revision": "1c592a11d2c4c38093e89881565d859b"
  },
  {
    "url": "secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html",
    "revision": "b478404b38977b8df92dc81965f10fe8"
  },
  {
    "url": "secondless/w-c/egg.js基础总结.html",
    "revision": "c5bda861328b3d932bb03c949a4d150d"
  },
  {
    "url": "secondless/w-c/egg.js重要知识详细文档.html",
    "revision": "784712f3209a9a1728137e621aa8eded"
  },
  {
    "url": "secondless/w-c/eggjs+postman测试工具将留言写入json文件.html",
    "revision": "e936c9e1507de22f2aaabc97062c736f"
  },
  {
    "url": "secondless/w-c/mysql数据库.html",
    "revision": "46d800e4e2cbacd7a0a7be82fb20866b"
  },
  {
    "url": "secondless/w-c/ValParams API 说明.html",
    "revision": "2072de3df2f0642cd9f026a50aebbdfa"
  },
  {
    "url": "secondless/w-c/上传文件.html",
    "revision": "7bc22893a1eaf411b8782aabec48bf6a"
  },
  {
    "url": "secondless/w-c/企业网站其它页面(非首页).html",
    "revision": "63178efffe039589822d6b1045b2a834"
  },
  {
    "url": "secondless/w-c/企业网站前端部分.html",
    "revision": "09c0c97e107942a73276289bd4107886"
  },
  {
    "url": "secondless/w-c/企业网站后台内容管理.html",
    "revision": "5705888ed80ab22fe5f040ab4ac628a2"
  },
  {
    "url": "secondless/w-c/企业网站后台栏目管理.html",
    "revision": "4996bfa88a09c1b6d677c149fdf9c2fd"
  },
  {
    "url": "secondless/w-c/企业网站首页.html",
    "revision": "ea0d09d5cef8e27b7a62d488e240e22b"
  },
  {
    "url": "secondless/w-c/响应式后台公共模版.html",
    "revision": "8dc3cdb5065606c06a17069bcd9cb655"
  },
  {
    "url": "secondless/w-c/响应式后台用户留言板管理.html",
    "revision": "0b6e46ce59811adc87e392838bcdd87d"
  },
  {
    "url": "secondless/w-c/响应式后台界面示例代码.html",
    "revision": "dc5a626c58ba63ec49829ecfa5526294"
  },
  {
    "url": "secondless/w-c/响应式后台管理员登录.html",
    "revision": "f7ad1fc25e21160f231d1af144e8411c"
  },
  {
    "url": "secondless/w-c/响应式后台管理系统.html",
    "revision": "5f5fdae079f643301b6838468ce703ba"
  },
  {
    "url": "secondless/w-c/响应式网页布局.html",
    "revision": "f241a474f234dbbbb2d5816f954e04f1"
  },
  {
    "url": "secondless/w-c/响应式网页布局指导思路.html",
    "revision": "2eb39a2106b8cbe14e746036d441ba7f"
  },
  {
    "url": "secondless/w-c/树形结构方法演变.html",
    "revision": "ca93917f4ccee500927135ce1a3850aa"
  },
  {
    "url": "secondless/w-c/直播功能中的用户表liveuser.html",
    "revision": "63d6cc1c874bbc5ba45291ff0e8faf4e"
  },
  {
    "url": "secondless/w-c/直播功能中的直播间表live.html",
    "revision": "d07a96b5271ca717f7aa11f129d6126b"
  },
  {
    "url": "secondless/w-c/直播功能中的礼物表livegift.html",
    "revision": "05cd3a50ca26560c996d71484ef08d1d"
  },
  {
    "url": "secondless/w-c/直播功能中的订单表liveorder.html",
    "revision": "e1563b925ec43e15203e917b5e12b88a"
  },
  {
    "url": "secondless/w-c/网站后台管理员简单权限分配功能实现.html",
    "revision": "34202f80e70eebb18d2201e8314177f9"
  },
  {
    "url": "secondless/w-d.html",
    "revision": "7aa0ac2887738eb8ae3411436cdcf08d"
  },
  {
    "url": "secondless/w-d/SSL证书.html",
    "revision": "d8e7876d84ec029d3b5a0083b588e0a7"
  },
  {
    "url": "secondless/w-d/网站代码上线调试.html",
    "revision": "a7a12b7e2f195c4eb61b2a83b79998b1"
  },
  {
    "url": "secondless/w-d/购买域名.html",
    "revision": "4fa1df67f8859f22af05af2f6c1940a0"
  },
  {
    "url": "secondless/w-d/购买服务器.html",
    "revision": "af43594f285b89006cc63c52010070df"
  },
  {
    "url": "thirdless/index.html",
    "revision": "942e7a38c55ed6ecfa09cdd8726d5c24"
  },
  {
    "url": "thirdless/w-a.html",
    "revision": "bdc78d48a3bac5631999226e8094a081"
  },
  {
    "url": "thirdless/w-a/02开发前环境搭建.html",
    "revision": "bc2622dc5b066a53292536babf4d66c6"
  },
  {
    "url": "thirdless/w-a/03引入UI框架及进行全局配置.html",
    "revision": "8a6b60e1a9f593a602e6e15d9e38ebb3"
  },
  {
    "url": "thirdless/w-a/04首页开发.html",
    "revision": "108cd8f41bef7ba2b772ebd993800cdc"
  },
  {
    "url": "thirdless/w-a/05其它界面开发.html",
    "revision": "c5f8e3f1a2827674393825d5136f6b35"
  },
  {
    "url": "thirdless/w-a/06数据处理.html",
    "revision": "0b88fdbcdeab2245009e9b86d0eaaa59"
  },
  {
    "url": "thirdless/w-a/07后端api开发.html",
    "revision": "1893df36e2a046dbb24d24c4f81e73e3"
  },
  {
    "url": "thirdless/w-a/07后端api开发代码.html",
    "revision": "2b04f90252d83c1e022ce31d3afdfa0f"
  },
  {
    "url": "thirdless/w-a/08数据交互和界面展示.html",
    "revision": "0e32a88125aa7a5f36b002095ee69fba"
  },
  {
    "url": "thirdless/w-b.html",
    "revision": "b77470e8208f8cfed59c98814163689f"
  },
  {
    "url": "thirdless/w-c.html",
    "revision": "06d0357a876a39ce2bcddc0385137373"
  },
  {
    "url": "thirdless/w-d.html",
    "revision": "a6d1c3fe5823ce9b948ce06df9d8f236"
  },
  {
    "url": "thirdless/w-e.html",
    "revision": "b9cca690c9be465caeb7a3b185527d6d"
  },
  {
    "url": "web/answer/课程常见问题.html",
    "revision": "1af3e99b6ca2c8750d2f496e23c98394"
  },
  {
    "url": "web/bootstrap/index.html",
    "revision": "dc1d4b159e815b5cf738107e7c8c96a4"
  },
  {
    "url": "web/css/index.html",
    "revision": "30975a7aca7184d1e64c7a5bf73d5092"
  },
  {
    "url": "web/css/封装的css样式库.html",
    "revision": "c713c020823979a5441d77193a57bc50"
  },
  {
    "url": "web/echarts/index.html",
    "revision": "193dd47033956a8b6f22e043664e05e6"
  },
  {
    "url": "web/github/index.html",
    "revision": "5a12c2298dec274d2976395e2df4ed62"
  },
  {
    "url": "web/IIS/index.html",
    "revision": "fa1bd20d07c9c2adc6aebc4acc5bc32a"
  },
  {
    "url": "web/index.html",
    "revision": "43d610a9352cfa01bf2f49f193c1067a"
  },
  {
    "url": "web/methods/地图相关.html",
    "revision": "8c7a861933cc748bbfce9037cf7b0739"
  },
  {
    "url": "web/methods/定位相关.html",
    "revision": "18032bb6aaf4c5c202b5a524340d7f59"
  },
  {
    "url": "web/methods/实用接口.html",
    "revision": "a2a0d1d080534308156d3404165cc064"
  },
  {
    "url": "web/mysql/index.html",
    "revision": "cf9e044234729042e2ced7071fee3c7b"
  },
  {
    "url": "web/mysql/role.html",
    "revision": "43dc4c963bd145bbb747d9ddeeec8258"
  },
  {
    "url": "web/mysql/rolecategory.html",
    "revision": "5e85115a4c33fe6d4a7ee3ea0204e630"
  },
  {
    "url": "web/mysql/role表接口.html",
    "revision": "fe352d9f7c07a2dfa09c202d63216ae1"
  },
  {
    "url": "web/mysql/rule表接口.html",
    "revision": "412a210b869a52a55b22acd59cda25a3"
  },
  {
    "url": "web/mysql/shop_manager.html",
    "revision": "f2da2ef472e43534dca5f328c7be6201"
  },
  {
    "url": "web/mysql/shop_manager表接口.html",
    "revision": "e2c7eeb1cfbdb0121604a507d7c7a47f"
  },
  {
    "url": "web/shop/index.html",
    "revision": "070dd9404c7c3b0ed51933a5e6e1f050"
  },
  {
    "url": "web/software/index.html",
    "revision": "652cdf70b527b36b43a142fa4af5e0df"
  },
  {
    "url": "web/Vanta.js/index.html",
    "revision": "12df6edecce404f1fa6da2a7df44fba1"
  },
  {
    "url": "web/vue.js/index.html",
    "revision": "aace196e74e166c6ed5789311d0830d0"
  },
  {
    "url": "web/Vue3+ElementPlus/index.html",
    "revision": "534760598e00e970fa7a977418eb3161"
  },
  {
    "url": "web/w-a.html",
    "revision": "bb8b115d3293e1c0083811149d048c02"
  },
  {
    "url": "web/w-b.html",
    "revision": "b06a6fb17624907ae7b27e15257f019f"
  },
  {
    "url": "web/w-c.html",
    "revision": "0694c16db48a0b489d311290f4905d21"
  },
  {
    "url": "开发记录.html",
    "revision": "9b12048fba7b5ec6f166e1c69a3aa719"
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
