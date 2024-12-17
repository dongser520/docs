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
    "revision": "b60772229726cd8ad22fb15f19f4fd9c"
  },
  {
    "url": "about.html",
    "revision": "c254343e81444fd8d9d5f8f7c3af5637"
  },
  {
    "url": "about/index.html",
    "revision": "654d7344272bd5a598f12b83f433201c"
  },
  {
    "url": "aboutless.html",
    "revision": "98ed06b6d1e8b5ea0d301765498e9e08"
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
    "url": "assets/js/100.1f9abaac.js",
    "revision": "f3e7f6594c4cbe8e8245dbb14b509440"
  },
  {
    "url": "assets/js/101.22a10475.js",
    "revision": "61f948249e3ddace6bacb414b69b65fd"
  },
  {
    "url": "assets/js/102.2902a3e1.js",
    "revision": "f4c59a8fe31a7ddf920f22e992bb732d"
  },
  {
    "url": "assets/js/103.b02b201d.js",
    "revision": "4441d000fe10734189591eccc01d5fdb"
  },
  {
    "url": "assets/js/104.7e0587f4.js",
    "revision": "d7d48f2566bb339d04111a8ad29582a5"
  },
  {
    "url": "assets/js/105.af6747b6.js",
    "revision": "ab576cc33ac331c3ce894cf50aba1b04"
  },
  {
    "url": "assets/js/106.e2e846af.js",
    "revision": "da0f44b46aff29b7bbbc11a8f423d857"
  },
  {
    "url": "assets/js/107.89f7949b.js",
    "revision": "54b72ae1e6ac6c77ce9fd83570420b88"
  },
  {
    "url": "assets/js/108.654bf4aa.js",
    "revision": "2e3b56e628b4c3a531b48e7146669c21"
  },
  {
    "url": "assets/js/109.5c17a5c6.js",
    "revision": "ccee09edc34cb6a064c8a15117fecee3"
  },
  {
    "url": "assets/js/11.934eb133.js",
    "revision": "0cbfb5a79c209befa057aecc68c6e027"
  },
  {
    "url": "assets/js/110.abf5b836.js",
    "revision": "d0a757ff76aa5786169149e2e9e54ec5"
  },
  {
    "url": "assets/js/111.aa382a4a.js",
    "revision": "52214577da11e2cfd3f52d816756fb88"
  },
  {
    "url": "assets/js/112.250b96a1.js",
    "revision": "7c8a64d2325c1725a63a443fb8de1013"
  },
  {
    "url": "assets/js/113.a02af89b.js",
    "revision": "0a7ad8ecc28588969ddc11304acd8b23"
  },
  {
    "url": "assets/js/114.af83107d.js",
    "revision": "3e7da70ba98ae73f6f1f376ebdae6733"
  },
  {
    "url": "assets/js/115.c61c2c64.js",
    "revision": "7b8f556445f91694034a6cbb86089b2e"
  },
  {
    "url": "assets/js/116.15642de9.js",
    "revision": "4e663d08087566406f2a618430d7516f"
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
    "url": "assets/js/14.5a720047.js",
    "revision": "c52818125afa127b2ca8c1717c36c916"
  },
  {
    "url": "assets/js/15.7609be3f.js",
    "revision": "8e637835cf3ee12a4c0d44f7fce0b996"
  },
  {
    "url": "assets/js/16.5dc5d316.js",
    "revision": "6de105b0ab35614890fd67b4fc543639"
  },
  {
    "url": "assets/js/17.5e5ae536.js",
    "revision": "ee10c32ec17377f64bbcab8bb993193e"
  },
  {
    "url": "assets/js/18.8055236c.js",
    "revision": "95104231fc6201226f4a983cdf0ec06e"
  },
  {
    "url": "assets/js/19.23d64503.js",
    "revision": "503943bcb0b8d1ecaf292cb04a65993b"
  },
  {
    "url": "assets/js/2.6281e0bb.js",
    "revision": "6953100b4156b74d48f76069058a12a9"
  },
  {
    "url": "assets/js/20.c8adf8fc.js",
    "revision": "a4a1b678328d67a501666e619c432722"
  },
  {
    "url": "assets/js/21.9102de69.js",
    "revision": "774dfbdecd4cb066f02e3428128efc0f"
  },
  {
    "url": "assets/js/22.3a0a8527.js",
    "revision": "d84afd35189daee3ff4732cf482627f6"
  },
  {
    "url": "assets/js/23.ed69ac02.js",
    "revision": "8dcdf454c66531dd15f4a55bd6a3106e"
  },
  {
    "url": "assets/js/24.a693e371.js",
    "revision": "e0c203cbeec7782e18e8d27e7497946e"
  },
  {
    "url": "assets/js/25.f9c0e620.js",
    "revision": "73fc8c1235b3aef567901f25fd65fa6f"
  },
  {
    "url": "assets/js/26.0c1e5254.js",
    "revision": "4dfb3d8c06f7858e4e15a9137403df86"
  },
  {
    "url": "assets/js/27.ff1111e9.js",
    "revision": "03eea5a3c14072f5cd2d5a8e2246d9f7"
  },
  {
    "url": "assets/js/28.693fdcbe.js",
    "revision": "1cbd6eb1a778015f2944bea762030cda"
  },
  {
    "url": "assets/js/29.44ea280e.js",
    "revision": "d398abbeee81a05fe04d024c267b5a06"
  },
  {
    "url": "assets/js/3.e6827fa8.js",
    "revision": "f1ffa92e22c7370c76abfc2cdb906d17"
  },
  {
    "url": "assets/js/30.17a32616.js",
    "revision": "58c0e6fe782c284abc79ac760f33e6da"
  },
  {
    "url": "assets/js/31.9d6106f9.js",
    "revision": "a8bf27abc7227824f87a64b03072121e"
  },
  {
    "url": "assets/js/32.2b58049b.js",
    "revision": "d5b9dd236bcda8cf2e21d57851fdb84d"
  },
  {
    "url": "assets/js/33.b9459d59.js",
    "revision": "d76d8dde618db5fc26ac9919fcc17174"
  },
  {
    "url": "assets/js/34.d1475039.js",
    "revision": "2f02536dde5e1d5e28b5f2f4d2f4eebc"
  },
  {
    "url": "assets/js/35.72408b82.js",
    "revision": "0e30b542dec01f494a87987fad8ef33d"
  },
  {
    "url": "assets/js/36.b2b9ff76.js",
    "revision": "adde1e49018561c2196b72b8114dfa27"
  },
  {
    "url": "assets/js/37.50041c07.js",
    "revision": "44bb8a45b37dd7452fe8d227359373e0"
  },
  {
    "url": "assets/js/38.b98f31c2.js",
    "revision": "1818af9438018a5ad38ae2d16cf190e3"
  },
  {
    "url": "assets/js/39.6803ffaf.js",
    "revision": "f057569e687b05245d610b822ec8e86c"
  },
  {
    "url": "assets/js/4.362dd0d1.js",
    "revision": "ad8d825d3e00a323f63641b8cd73865a"
  },
  {
    "url": "assets/js/40.51298e9c.js",
    "revision": "273da31e336d6cf8ef607f453c3df141"
  },
  {
    "url": "assets/js/41.471568fe.js",
    "revision": "2072c4466505d5b42a95a23df2c2a19c"
  },
  {
    "url": "assets/js/42.4eca5ce7.js",
    "revision": "02128b845034bd4324e1317715227ac6"
  },
  {
    "url": "assets/js/43.24d99635.js",
    "revision": "7bf4aa9939507cfbaa9ae4683e0e0f5f"
  },
  {
    "url": "assets/js/44.e6b5120c.js",
    "revision": "e069c5362aedbf8e6d1984a9b021d469"
  },
  {
    "url": "assets/js/45.cb413154.js",
    "revision": "8118aef29f695af8654d618980e48030"
  },
  {
    "url": "assets/js/46.6ec1c653.js",
    "revision": "3779985f8bdbde5b7735e9f68a3f63ed"
  },
  {
    "url": "assets/js/47.f1043698.js",
    "revision": "057120e5035402c15e1447e58abb16b2"
  },
  {
    "url": "assets/js/48.ab79304d.js",
    "revision": "8255de5ff5ebf9cd57a4dcdfce1ed4b0"
  },
  {
    "url": "assets/js/49.cd4ec800.js",
    "revision": "4485e6b5f55aec3c97fcfe78cbed2e0b"
  },
  {
    "url": "assets/js/5.3e24e7be.js",
    "revision": "bb8330fc3b00684c0b46c0c7ade9634a"
  },
  {
    "url": "assets/js/50.c82ff39c.js",
    "revision": "ecc90a31e988ce195c6857388c33c0de"
  },
  {
    "url": "assets/js/51.d86be0fb.js",
    "revision": "0d1c7b95c80049a584bf83caf14200e0"
  },
  {
    "url": "assets/js/52.c3af8a0a.js",
    "revision": "a79527e99fec763c47f725b6b1aa1f9a"
  },
  {
    "url": "assets/js/53.f3d4313d.js",
    "revision": "dddf301bf4357618d806e8029fb804c8"
  },
  {
    "url": "assets/js/54.dc0ec013.js",
    "revision": "040302d20fc2e36cd10970c9b8e97d86"
  },
  {
    "url": "assets/js/55.79b0dc27.js",
    "revision": "14b82b38eee25c1c01d73388166f2a28"
  },
  {
    "url": "assets/js/56.1ae92aa5.js",
    "revision": "468dad91974609a85dca948ddb4f6cad"
  },
  {
    "url": "assets/js/57.2dc9bfab.js",
    "revision": "8a9b92ef5f248995a3bd3ba6e7a89383"
  },
  {
    "url": "assets/js/58.8b07689a.js",
    "revision": "0fc9945f47f7eb72455537ec00f87e25"
  },
  {
    "url": "assets/js/59.ed1663fc.js",
    "revision": "8288680313e2515ced2c33ba21bb0dae"
  },
  {
    "url": "assets/js/6.ca2525e2.js",
    "revision": "f26b99a11274e34a1a8df09422012df8"
  },
  {
    "url": "assets/js/60.6a8c51cd.js",
    "revision": "3c7ab91fc5dda202dce26fe208d2ff5d"
  },
  {
    "url": "assets/js/61.8b5d58b6.js",
    "revision": "d2e48b27d0bded4daf9db8b7ef1497f8"
  },
  {
    "url": "assets/js/62.b78195e7.js",
    "revision": "5f9d75d84f3b94b516113e7eab7bd39d"
  },
  {
    "url": "assets/js/63.27af5e66.js",
    "revision": "761be0ff8d032adcb1e2a059f6d529be"
  },
  {
    "url": "assets/js/64.889d08e4.js",
    "revision": "10338df1d0addb2b7939db4f81c8878a"
  },
  {
    "url": "assets/js/65.1b4390db.js",
    "revision": "fd2459d2bc4fcd7d10d7f41922da4340"
  },
  {
    "url": "assets/js/66.3ad79373.js",
    "revision": "f456cd8a5b06e021318ab7ceac33a4de"
  },
  {
    "url": "assets/js/67.371853f7.js",
    "revision": "99d5889269971414b18942b6df2c95f9"
  },
  {
    "url": "assets/js/68.e2553ab1.js",
    "revision": "9dc8c16d081b265dcbd98d1b43077177"
  },
  {
    "url": "assets/js/69.191b5363.js",
    "revision": "f327e9fa23cb0292bcab5ee7f7e4dbc7"
  },
  {
    "url": "assets/js/7.8abfda2d.js",
    "revision": "99ec668c13c028b282d6879660b94c41"
  },
  {
    "url": "assets/js/70.684f937a.js",
    "revision": "26e0747f0831cfb3078e562f89a1fa1e"
  },
  {
    "url": "assets/js/71.0d77133f.js",
    "revision": "862bf96f33855211bf38a38271ab5d0e"
  },
  {
    "url": "assets/js/72.30a77413.js",
    "revision": "a9905897e6b185fd5fdfdf22e64d19c7"
  },
  {
    "url": "assets/js/73.71a47470.js",
    "revision": "4101be3bf6f0cff910ff1ac3bb4298d1"
  },
  {
    "url": "assets/js/74.6a2dc941.js",
    "revision": "a718b3ba7ec1760a39d35afb8c43f5d0"
  },
  {
    "url": "assets/js/75.b704591c.js",
    "revision": "6cfcef1b86f229e940fe8a0857c99eff"
  },
  {
    "url": "assets/js/76.1aa10250.js",
    "revision": "c14718922a5f6f5fe325eab3928d7829"
  },
  {
    "url": "assets/js/77.3613a434.js",
    "revision": "45b3b9ea571e7caa2a84b3ec3d3db34f"
  },
  {
    "url": "assets/js/78.1d5eaf02.js",
    "revision": "a2dbf353c8ff21175f4f67f740dc4744"
  },
  {
    "url": "assets/js/79.771d2f2e.js",
    "revision": "2f54f92e5f8a00e712ff7169c0023e45"
  },
  {
    "url": "assets/js/8.43074fe5.js",
    "revision": "47eb686c0f48402a881c764f975ef9f6"
  },
  {
    "url": "assets/js/80.ddb226a3.js",
    "revision": "86a6984dded30002dcbb5f8028721747"
  },
  {
    "url": "assets/js/81.eb1eda12.js",
    "revision": "55b2c38a46e3f1c10ba09a818c662ea2"
  },
  {
    "url": "assets/js/82.94c8bfd0.js",
    "revision": "98d3424d194900e4635feb0842440eb1"
  },
  {
    "url": "assets/js/83.a3ed9d42.js",
    "revision": "9d7ac88e6026875f9e031ac15a955fc0"
  },
  {
    "url": "assets/js/84.c482559c.js",
    "revision": "24bc8250f4359f395705f8bc24b8d72c"
  },
  {
    "url": "assets/js/85.f8caa394.js",
    "revision": "cfe256b30042dfa1660edfc9dc275669"
  },
  {
    "url": "assets/js/86.2ce3cbe7.js",
    "revision": "f0d1bf2f02100c05682bdfcb77fdb9bf"
  },
  {
    "url": "assets/js/87.fdd30e8d.js",
    "revision": "1634666126b5d627be2f9fe6668e91b3"
  },
  {
    "url": "assets/js/88.a3935847.js",
    "revision": "09857d069209e0b22b6d1a50a4b23214"
  },
  {
    "url": "assets/js/89.db6ecf16.js",
    "revision": "21a76e6c62eb70d879de4413fd82231e"
  },
  {
    "url": "assets/js/9.13d458ed.js",
    "revision": "98983ed4d52578db065fd908e6b49dc6"
  },
  {
    "url": "assets/js/90.0eacfd6d.js",
    "revision": "6541cd38b5a5b6b190e7c025a60f4937"
  },
  {
    "url": "assets/js/91.3ef1961f.js",
    "revision": "6431b29eeb262599a3cfbd07cf4e96a6"
  },
  {
    "url": "assets/js/92.177d13bb.js",
    "revision": "8f70792ca873100ecca19bb4257aa045"
  },
  {
    "url": "assets/js/93.a74d0b45.js",
    "revision": "71deb9fe564ddd0259ff3994eb3a344e"
  },
  {
    "url": "assets/js/94.c2137d2f.js",
    "revision": "017fcadb6116fcb22364f2fa04e6c5b2"
  },
  {
    "url": "assets/js/95.ef526b67.js",
    "revision": "f3f2ce38b02950e5dba17272bd2380ba"
  },
  {
    "url": "assets/js/96.21f8cecd.js",
    "revision": "07e6b17212947b9225083e4f06929611"
  },
  {
    "url": "assets/js/97.c9a0c5eb.js",
    "revision": "33eba1f64728c2273c53214b147fe85c"
  },
  {
    "url": "assets/js/98.3a7295da.js",
    "revision": "88a01ea5283b171d05f74dcfecb9fbf7"
  },
  {
    "url": "assets/js/99.0758d290.js",
    "revision": "c12d13e6a86d37099178918186e03dae"
  },
  {
    "url": "assets/js/app.f385ed3e.js",
    "revision": "87e07c262736d14088dfbbfce371eb82"
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
    "revision": "59b96281084a969c1eabb45e7d38ca12"
  },
  {
    "url": "lesson_01.png",
    "revision": "15931111f2607cdddb4b8d64e7d52d62"
  },
  {
    "url": "pc/index.html",
    "revision": "588bd9668b2ff38d8f638bdece2eb83d"
  },
  {
    "url": "pc/p-a.html",
    "revision": "07cb2ff3835800dd7690da3ca22c90b3"
  },
  {
    "url": "pc/p-b.html",
    "revision": "72fd351dc0900719859aae2c61e8399d"
  },
  {
    "url": "pc/p-c.html",
    "revision": "69f66c6b837ee553ac7e6310104b6887"
  },
  {
    "url": "phone/index.html",
    "revision": "afffd74b51baaa3c594ccf217775f89b"
  },
  {
    "url": "phone/phone-a.html",
    "revision": "98aa755c13114e8c1374510a410e53a4"
  },
  {
    "url": "phone/phone-b.html",
    "revision": "4513aea7b49d9834c995704f99c914e9"
  },
  {
    "url": "phone/phone-c.html",
    "revision": "bf7c35bc7997d39797396fdb357722ce"
  },
  {
    "url": "secondless/index.html",
    "revision": "28e01930899ab485831b2b641c64063c"
  },
  {
    "url": "secondless/w-a.html",
    "revision": "d5d49a69adb7afcec77f455458b75219"
  },
  {
    "url": "secondless/w-a/Date类型：时间和日期.html",
    "revision": "4b7ac7272d9a61d77a12a125230f9f3e"
  },
  {
    "url": "secondless/w-a/Function类型：函数进阶.html",
    "revision": "2aa8cd89ba71ff4b5bad4b43d9513367"
  },
  {
    "url": "secondless/w-a/javascript函数.html",
    "revision": "594824b805172132f77194682d04639b"
  },
  {
    "url": "secondless/w-a/javascript基本包装类型.html",
    "revision": "65b17096a9a806e7c3fad528a730b21d"
  },
  {
    "url": "secondless/w-a/javascript基础.html",
    "revision": "0fae77e2336be54a40cb210dd4ce1694"
  },
  {
    "url": "secondless/w-a/javascript对象.html",
    "revision": "c6892a0af33a3087b33daae2c9f8a871"
  },
  {
    "url": "secondless/w-a/javascript数组.html",
    "revision": "d9ed23522af9d2eab73826b4577aee5c"
  },
  {
    "url": "secondless/w-a/javascript运算符.html",
    "revision": "fd3b8ec6a62a324b23b113a0bcd471cb"
  },
  {
    "url": "secondless/w-a/事件.html",
    "revision": "c8ebea3d12611908eb0e102c61da17af"
  },
  {
    "url": "secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html",
    "revision": "8c8209589e8a44b26dadb60aea23c4a5"
  },
  {
    "url": "secondless/w-a/函数对象数组小结.html",
    "revision": "4bc913186a902f775dae44a26db2d312"
  },
  {
    "url": "secondless/w-a/匿名函数和闭包.html",
    "revision": "1b70bf804375f96bb1f7462d581cc07d"
  },
  {
    "url": "secondless/w-a/数据Cookie、XML、JSON.html",
    "revision": "e7eb40e68892bf7d8b3e5b412b269e0a"
  },
  {
    "url": "secondless/w-a/流程控制语句.html",
    "revision": "9d4df96a27644c8918250a0f131f6f47"
  },
  {
    "url": "secondless/w-a/浏览器对象模型BOM及浏览器检测.html",
    "revision": "3bd1c64c9b7ee17d23b4a8b1308b8a8b"
  },
  {
    "url": "secondless/w-a/网页文档对象模型DOM.html",
    "revision": "1edce012dae8e91ff96d6afc98fd0ce8"
  },
  {
    "url": "secondless/w-a/表单处理及错误处理与调试.html",
    "revision": "1dc76a1e3f786d6ab023618bf645c6e9"
  },
  {
    "url": "secondless/w-b.html",
    "revision": "1edf54bc136afc1769a5bcd01e1ec8ce"
  },
  {
    "url": "secondless/w-b/Ajax.html",
    "revision": "e12f77516281dd597b66c7538d3aba51"
  },
  {
    "url": "secondless/w-b/jQuery.html",
    "revision": "0a4931550df4cc5d4bd050557e8ba37e"
  },
  {
    "url": "secondless/w-b/jQuery事件、动画、插件.html",
    "revision": "92b8bcecab481082642d06b783f88040"
  },
  {
    "url": "secondless/w-b/Node.js.html",
    "revision": "16a6aa0047603fc1ffedca03f1b17f09"
  },
  {
    "url": "secondless/w-b/node.js+vue.js 渲染企业网站.html",
    "revision": "09462854c2d618db1b9b3e19cabd1a64"
  },
  {
    "url": "secondless/w-b/nodejs+jQuery开发留言板.html",
    "revision": "7fce2d11582e00e5919d99e2981eeb95"
  },
  {
    "url": "secondless/w-b/nodejs服务器端app.js文件.html",
    "revision": "336e105e0dd52d20366bd660163e62e4"
  },
  {
    "url": "secondless/w-b/Vue.js.html",
    "revision": "f822ea4f1e539a1130e251fbb27ae1ef"
  },
  {
    "url": "secondless/w-b/封装js库过渡到jQuery.html",
    "revision": "3493eb1886908354a5e4550ace62f9ff"
  },
  {
    "url": "secondless/w-b/正则表达式.html",
    "revision": "a6a86a930c3c5fc9c2dd8f66af205c38"
  },
  {
    "url": "secondless/w-b/面向对象与原型.html",
    "revision": "476d409af4bb274575e56e9cdea92316"
  },
  {
    "url": "secondless/w-c.html",
    "revision": "e8d0da464eea2c4de0e673b45387bfa3"
  },
  {
    "url": "secondless/w-c/Egg.js.html",
    "revision": "d418eaace46092fa95ce1175838eeaf2"
  },
  {
    "url": "secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html",
    "revision": "cea1c34ea3e4468c593c013cb247c184"
  },
  {
    "url": "secondless/w-c/egg.js基础总结.html",
    "revision": "f747f71945145805d615681fe5b61003"
  },
  {
    "url": "secondless/w-c/egg.js重要知识详细文档.html",
    "revision": "28417d085e542c033f03e96ebe24ca31"
  },
  {
    "url": "secondless/w-c/eggjs+postman测试工具将留言写入json文件.html",
    "revision": "fafe7b4aca45b8155c369d71e93097ba"
  },
  {
    "url": "secondless/w-c/mysql数据库.html",
    "revision": "1174195e292976342d6373f7bf985700"
  },
  {
    "url": "secondless/w-c/ValParams API 说明.html",
    "revision": "c95f2e9db49813de62cbb591c1485ef4"
  },
  {
    "url": "secondless/w-c/上传文件.html",
    "revision": "3a04e95ed87a42531be78dc5ae23bef9"
  },
  {
    "url": "secondless/w-c/企业网站其它页面(非首页).html",
    "revision": "c98f19b835006f09acb6034f51495abb"
  },
  {
    "url": "secondless/w-c/企业网站前端部分.html",
    "revision": "37318a6f891669239216f307cd7eebca"
  },
  {
    "url": "secondless/w-c/企业网站后台内容管理.html",
    "revision": "f80b9f0b483bbf4339b8b2ba46538c9a"
  },
  {
    "url": "secondless/w-c/企业网站后台栏目管理.html",
    "revision": "d236f692e89df37640efa5ee0e91ff9f"
  },
  {
    "url": "secondless/w-c/企业网站首页.html",
    "revision": "bd511d714e5af429327e9f19e264e30a"
  },
  {
    "url": "secondless/w-c/响应式后台公共模版.html",
    "revision": "b63f09b5a6f623d8941fe8a060643bcf"
  },
  {
    "url": "secondless/w-c/响应式后台用户留言板管理.html",
    "revision": "a404e540b5a009c2744551ef60345d3d"
  },
  {
    "url": "secondless/w-c/响应式后台界面示例代码.html",
    "revision": "5352f1334fddd6de5bd5cc00ed7ade62"
  },
  {
    "url": "secondless/w-c/响应式后台管理员登录.html",
    "revision": "c6bef10703f8d99d5add3422dd970b64"
  },
  {
    "url": "secondless/w-c/响应式后台管理系统.html",
    "revision": "5d9d7e915182e5dbc587f7870f765a41"
  },
  {
    "url": "secondless/w-c/响应式网页布局.html",
    "revision": "bb7889aad47035e02480b51f137ca1f0"
  },
  {
    "url": "secondless/w-c/响应式网页布局指导思路.html",
    "revision": "dac09fc3dd65d498c55d35914256cd6b"
  },
  {
    "url": "secondless/w-c/树形结构方法演变.html",
    "revision": "b9528adf9d679c41170e6c88513036fb"
  },
  {
    "url": "secondless/w-c/直播功能中的用户表liveuser.html",
    "revision": "6f45d14caa13bf0aa5391832f3c4b53a"
  },
  {
    "url": "secondless/w-c/直播功能中的直播间表live.html",
    "revision": "d305da026803b8e95f7b86c38e66654d"
  },
  {
    "url": "secondless/w-c/直播功能中的礼物表livegift.html",
    "revision": "81dfbca808390b82870c3b1f9e2a97f0"
  },
  {
    "url": "secondless/w-c/直播功能中的订单表liveorder.html",
    "revision": "fb28f91951d2270ed972566e25f7ac27"
  },
  {
    "url": "secondless/w-c/网站后台管理员简单权限分配功能实现.html",
    "revision": "38d31f0f8ad368fca410694f38890e8d"
  },
  {
    "url": "secondless/w-d.html",
    "revision": "a55f4f219caac1a1defa0d94fe608c18"
  },
  {
    "url": "secondless/w-d/SSL证书.html",
    "revision": "1a146e34b8254f14ef439f89b66139df"
  },
  {
    "url": "secondless/w-d/网站代码上线调试.html",
    "revision": "fc8de91a9b4cd5be6c8dbbb0b91215c6"
  },
  {
    "url": "secondless/w-d/购买域名.html",
    "revision": "a184fe6b0cbc5cbf461dc49993b237f0"
  },
  {
    "url": "secondless/w-d/购买服务器.html",
    "revision": "6e67da34879631b31f1f6adef04a46e3"
  },
  {
    "url": "thirdless/index.html",
    "revision": "88e994ac829bfa0272027b7ff52dd6a2"
  },
  {
    "url": "thirdless/w-a.html",
    "revision": "95d18b36f5f341880d2a5da8cb06d6d5"
  },
  {
    "url": "thirdless/w-a/02开发前环境搭建.html",
    "revision": "e8733f1e0b79d41735be70d55ed46814"
  },
  {
    "url": "thirdless/w-a/03引入UI框架及进行全局配置.html",
    "revision": "bcaa5a9e3b73454bcbebcfaea552744d"
  },
  {
    "url": "thirdless/w-a/04首页开发.html",
    "revision": "00f479ee631eca2ce278942575d6fe42"
  },
  {
    "url": "thirdless/w-a/05其它界面开发.html",
    "revision": "96e09f600ed0e333ac3b43886c0aa55c"
  },
  {
    "url": "thirdless/w-b.html",
    "revision": "060430a8a060adcb859b13a053afee4b"
  },
  {
    "url": "thirdless/w-c.html",
    "revision": "f560607a0c8e0fa26b884ecc7923991b"
  },
  {
    "url": "thirdless/w-d.html",
    "revision": "f987072fd819a093f337e98de628aebb"
  },
  {
    "url": "web/answer/课程常见问题.html",
    "revision": "8072dbad18df39b49a2c146a324cd22b"
  },
  {
    "url": "web/bootstrap/index.html",
    "revision": "e89d89d71465680b0f569132cd6b9c85"
  },
  {
    "url": "web/css/index.html",
    "revision": "0ceba5801e42832df5af9d820739c165"
  },
  {
    "url": "web/css/封装的css样式库.html",
    "revision": "db0c3d6e370283e77f35ae72e6635248"
  },
  {
    "url": "web/echarts/index.html",
    "revision": "f9f597c2c71621dc21f2205b0e5d9a5e"
  },
  {
    "url": "web/github/index.html",
    "revision": "8323dd55638b77ed9a0e9a837b3c3fa2"
  },
  {
    "url": "web/IIS/index.html",
    "revision": "334f1c08093178bd5980fc77314cd42e"
  },
  {
    "url": "web/index.html",
    "revision": "4b642df51764cf3850b1088a048b06b8"
  },
  {
    "url": "web/methods/地图相关.html",
    "revision": "a49150e09b1ba7f2307afe21a73032a1"
  },
  {
    "url": "web/methods/定位相关.html",
    "revision": "456cdb7d8baa86bf6c5572744f871516"
  },
  {
    "url": "web/methods/实用接口.html",
    "revision": "b097fb9196cd0433591de79a5d6db6af"
  },
  {
    "url": "web/mysql/index.html",
    "revision": "cadf268c7503b71b731d3f8993b1c019"
  },
  {
    "url": "web/software/index.html",
    "revision": "2cf8e862c9bb63e30ebc7c58bf41db30"
  },
  {
    "url": "web/Vanta.js/index.html",
    "revision": "dbfa05eae26d2f61d7c5c6ab1708a95d"
  },
  {
    "url": "web/vue.js/index.html",
    "revision": "1ce1c9b87eaa357009b0dfa86381140f"
  },
  {
    "url": "web/Vue3+ElementPlus/index.html",
    "revision": "17d480bfa60161459a021c0341d90b7e"
  },
  {
    "url": "web/w-a.html",
    "revision": "de8787a9229b0e72f16e03871f43604c"
  },
  {
    "url": "web/w-b.html",
    "revision": "31e12bba42d2eba3beeec7ced48b7708"
  },
  {
    "url": "web/w-c.html",
    "revision": "efef90b1f3c9977ceb566a69cb6ee56b"
  },
  {
    "url": "开发记录.html",
    "revision": "5727d41255f9ebd8eb0e5e8a88619e58"
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
