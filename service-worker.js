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
    "revision": "bdf584db7fbb17bcc4b83e442d5d4a29"
  },
  {
    "url": "about.html",
    "revision": "f4f3eecd14ea3eff0da1135170854377"
  },
  {
    "url": "about/index.html",
    "revision": "eaa73de5bb6b28c63c7d9b84549a6411"
  },
  {
    "url": "aboutless.html",
    "revision": "40377a6a21d09ac1aa057ac148df25a8"
  },
  {
    "url": "assets/css/0.styles.a9331f8e.css",
    "revision": "2ab9e810e38745c2678f00f3808b6d57"
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
    "url": "assets/js/100.958bb8cd.js",
    "revision": "628bdbdb5aeed8884f464971b15b2cb0"
  },
  {
    "url": "assets/js/101.583b5aa0.js",
    "revision": "5967c4a5afab3e0c4e8a013f1d2baf7c"
  },
  {
    "url": "assets/js/102.450023a9.js",
    "revision": "42bd600faf635e5ef67dc11c2ad60eed"
  },
  {
    "url": "assets/js/103.45aeb748.js",
    "revision": "f2e0de8e0a5fb6a90cde51c7f463c55d"
  },
  {
    "url": "assets/js/104.96f46a12.js",
    "revision": "d6b647e1463eaa712f90e4ff5e7376cf"
  },
  {
    "url": "assets/js/105.c0052d4a.js",
    "revision": "817b473a2dc906686c867b92ee646499"
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
    "url": "assets/js/109.3ab9c587.js",
    "revision": "3f059fcb719cfbf80668c63696772257"
  },
  {
    "url": "assets/js/11.934eb133.js",
    "revision": "0cbfb5a79c209befa057aecc68c6e027"
  },
  {
    "url": "assets/js/110.90181d62.js",
    "revision": "1a8bdb0a898c15a01b5924902d77d735"
  },
  {
    "url": "assets/js/111.067ef4c0.js",
    "revision": "f9bb5021805c3f78de69fa885588907e"
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
    "url": "assets/js/12.cc2380d1.js",
    "revision": "db2bbf818f1a04422508866c29849f49"
  },
  {
    "url": "assets/js/13.791d6488.js",
    "revision": "5a573e8072236a009a02c7c95719fb7d"
  },
  {
    "url": "assets/js/14.5a720047.js",
    "revision": "c52818125afa127b2ca8c1717c36c916"
  },
  {
    "url": "assets/js/15.38eae23b.js",
    "revision": "10f1d80de04763a369220bffc08f7ff2"
  },
  {
    "url": "assets/js/16.5dc5d316.js",
    "revision": "6de105b0ab35614890fd67b4fc543639"
  },
  {
    "url": "assets/js/17.8b79e558.js",
    "revision": "9c5b0ca40e49216c872c9590ad7d9876"
  },
  {
    "url": "assets/js/18.c4f72d63.js",
    "revision": "1c6b32da40df7bde5e63271157a10c34"
  },
  {
    "url": "assets/js/19.b5289c20.js",
    "revision": "4a1fe4b4c0fe971b211d035aad4e987c"
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
    "url": "assets/js/21.052ddbea.js",
    "revision": "adbf57d8a0db95102742ad57dafd651e"
  },
  {
    "url": "assets/js/22.49d7bb3f.js",
    "revision": "343be622b85db12cd4fee1d3c08304e5"
  },
  {
    "url": "assets/js/23.d0111134.js",
    "revision": "1ef5714bb8a76b1885f4c48b829469ad"
  },
  {
    "url": "assets/js/24.08f66c11.js",
    "revision": "ec780ff45b684a0baa618f50c9f65669"
  },
  {
    "url": "assets/js/25.0d6774b2.js",
    "revision": "d539ef2d9a758481fc92e5f37f608727"
  },
  {
    "url": "assets/js/26.9ddf56fb.js",
    "revision": "57fa2e37bc273a1ffcfa198a5adb76f6"
  },
  {
    "url": "assets/js/27.ff18fc22.js",
    "revision": "ff858b39c0dacc01bfbb2319095b9414"
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
    "url": "assets/js/37.bd9458a2.js",
    "revision": "a05b4563c70f6f0f7977b9e033db563e"
  },
  {
    "url": "assets/js/38.78fe5efa.js",
    "revision": "e89786890c1234ea7bda82cebf90e0bc"
  },
  {
    "url": "assets/js/39.fb262614.js",
    "revision": "5ab40bc71151214aab6e1962c20950da"
  },
  {
    "url": "assets/js/4.8ac4ec2c.js",
    "revision": "247f7b0fb4d0cb4a3df68cf75648ddd1"
  },
  {
    "url": "assets/js/40.3c8c250b.js",
    "revision": "ffbbf7885a790ec5d395891c9c8c588d"
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
    "url": "assets/js/43.2eec717e.js",
    "revision": "316c420819a8aa70207b5e008d68287a"
  },
  {
    "url": "assets/js/44.e6b5120c.js",
    "revision": "e069c5362aedbf8e6d1984a9b021d469"
  },
  {
    "url": "assets/js/45.0f7da3fa.js",
    "revision": "1b606f36f5016311666e4cab46363ddb"
  },
  {
    "url": "assets/js/46.987cca07.js",
    "revision": "e4cbe901da3e44c5a9d52f33dd33f4f2"
  },
  {
    "url": "assets/js/47.5bf9f4ac.js",
    "revision": "66ad32d05f5a835d3ed8615771e7b6a1"
  },
  {
    "url": "assets/js/48.e55c9e86.js",
    "revision": "01fd6a2408af031a31779454675cdba2"
  },
  {
    "url": "assets/js/49.67c7e4a6.js",
    "revision": "da77bb967f3932f12ac64c042c26ffdc"
  },
  {
    "url": "assets/js/5.96ff8e0a.js",
    "revision": "666e6b50dfc2cf531969ebaa2393d6a7"
  },
  {
    "url": "assets/js/50.8fddf23e.js",
    "revision": "456b233d22d064b277643e24b1e6e9c1"
  },
  {
    "url": "assets/js/51.18d23923.js",
    "revision": "420bb3379bdc065eaf1e92eb8a38db1c"
  },
  {
    "url": "assets/js/52.01632909.js",
    "revision": "715ed0c03e76be1cccb83873e086bf82"
  },
  {
    "url": "assets/js/53.f3d4313d.js",
    "revision": "dddf301bf4357618d806e8029fb804c8"
  },
  {
    "url": "assets/js/54.c914b852.js",
    "revision": "666bab68576e9d5bca31970c8ec19e64"
  },
  {
    "url": "assets/js/55.8c09727a.js",
    "revision": "1826b49fd0d8da9764b36ef63495eff6"
  },
  {
    "url": "assets/js/56.f84b9f85.js",
    "revision": "c1a3e98b63cf7b5d25665f69e8785929"
  },
  {
    "url": "assets/js/57.35c4af7f.js",
    "revision": "a7cabbf053a656929b13d62d83a47b33"
  },
  {
    "url": "assets/js/58.4bb01dac.js",
    "revision": "6e7ee1951f2eb34806bc33d0ac91aa3c"
  },
  {
    "url": "assets/js/59.fc601f6e.js",
    "revision": "b4a06496bcf7fa18b6976198da58dcab"
  },
  {
    "url": "assets/js/6.ca2525e2.js",
    "revision": "f26b99a11274e34a1a8df09422012df8"
  },
  {
    "url": "assets/js/60.e52b16f0.js",
    "revision": "091cf48b0dbaa414bc6516583b279886"
  },
  {
    "url": "assets/js/61.b6913ce9.js",
    "revision": "e83a0a8ef5581309d53d2e027a7fc552"
  },
  {
    "url": "assets/js/62.788e0908.js",
    "revision": "44fca334978862ce60869bc06df915de"
  },
  {
    "url": "assets/js/63.5b90fe28.js",
    "revision": "edf4a1667bee8656ad5b45cbd7d019c1"
  },
  {
    "url": "assets/js/64.271ab784.js",
    "revision": "7392dc363b0e65c39292f04cfe0adf80"
  },
  {
    "url": "assets/js/65.51b2d679.js",
    "revision": "1d826cb40d2f6421b7a5d6df8c7047f8"
  },
  {
    "url": "assets/js/66.c39d18ad.js",
    "revision": "009aab46641151293fe4c3990b278e78"
  },
  {
    "url": "assets/js/67.91bb5d3a.js",
    "revision": "91ca76e24e098f5d416e6ad6ee2dc32a"
  },
  {
    "url": "assets/js/68.749bebbb.js",
    "revision": "375a4b2390e7bfa130e6aa6550718f51"
  },
  {
    "url": "assets/js/69.73b3760c.js",
    "revision": "d0ec7ab1c56c131bcb19ab2640e16666"
  },
  {
    "url": "assets/js/7.8abfda2d.js",
    "revision": "99ec668c13c028b282d6879660b94c41"
  },
  {
    "url": "assets/js/70.b6366e6f.js",
    "revision": "1655233a2a727ebb35711541e9ef28c6"
  },
  {
    "url": "assets/js/71.d9ab19ca.js",
    "revision": "82b6843d59c37aa52579544626f4da40"
  },
  {
    "url": "assets/js/72.462285ef.js",
    "revision": "a9ebab09e969a65dc68207bbde5f7e58"
  },
  {
    "url": "assets/js/73.283f8fe1.js",
    "revision": "3cc5a3f86e1625f435916a16afc9a348"
  },
  {
    "url": "assets/js/74.cf10270e.js",
    "revision": "e8f83363238a5c819059c340fed58dfc"
  },
  {
    "url": "assets/js/75.8ef66852.js",
    "revision": "6e64a0e890edb58f97ba7b9f0e850cc5"
  },
  {
    "url": "assets/js/76.68d1ce1e.js",
    "revision": "3deaeebaecb189fe40ad28f913fe65ad"
  },
  {
    "url": "assets/js/77.1f3e7eab.js",
    "revision": "1cf95f5d4eda46e52ffbbd37d3dded50"
  },
  {
    "url": "assets/js/78.e6f0a3fb.js",
    "revision": "d2d130dae00b6a1625fe9dd7561663e1"
  },
  {
    "url": "assets/js/79.44d9303c.js",
    "revision": "c51e682ffa7ff178beefd7a20850a80b"
  },
  {
    "url": "assets/js/8.43074fe5.js",
    "revision": "47eb686c0f48402a881c764f975ef9f6"
  },
  {
    "url": "assets/js/80.5f3805d6.js",
    "revision": "3b82e2fbb99f579f8cf04a9a174c7720"
  },
  {
    "url": "assets/js/81.af002bcc.js",
    "revision": "b90aa8ea467275b94a1db4e1dc23c1fa"
  },
  {
    "url": "assets/js/82.fb170b83.js",
    "revision": "e85e382e1f6806d390fcf81254c780df"
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
    "url": "assets/js/86.bc561b63.js",
    "revision": "e06895878815839809418803e73893b2"
  },
  {
    "url": "assets/js/87.f157e9c7.js",
    "revision": "67c2ea915ab035988b2b03b792bf1522"
  },
  {
    "url": "assets/js/88.57c3478f.js",
    "revision": "3caf53642219bb11d4fb0f0cce1c4ea5"
  },
  {
    "url": "assets/js/89.05b5edb3.js",
    "revision": "5e3138041364eb362b3940d45ccbf955"
  },
  {
    "url": "assets/js/9.13d458ed.js",
    "revision": "98983ed4d52578db065fd908e6b49dc6"
  },
  {
    "url": "assets/js/90.bc9fee32.js",
    "revision": "f425a55e106ceb49ba61004d2f717f91"
  },
  {
    "url": "assets/js/91.06d10b63.js",
    "revision": "7730982e8cd416295f96c3e22b4ff8b0"
  },
  {
    "url": "assets/js/92.fb66875d.js",
    "revision": "55abcf3c46e59f94f2ff02048c31f99a"
  },
  {
    "url": "assets/js/93.16a5ff5c.js",
    "revision": "d9ec761bdcdc63c7c77013fdc097702e"
  },
  {
    "url": "assets/js/94.c2137d2f.js",
    "revision": "017fcadb6116fcb22364f2fa04e6c5b2"
  },
  {
    "url": "assets/js/95.1cd4d147.js",
    "revision": "74d102b6134dd2904c9896cf8059bf1d"
  },
  {
    "url": "assets/js/96.2ef5d87d.js",
    "revision": "14d3363ab241435ba992e73859b0a162"
  },
  {
    "url": "assets/js/97.38ef0ca7.js",
    "revision": "361169a67c5c1622383376570fb744db"
  },
  {
    "url": "assets/js/98.df962f20.js",
    "revision": "eb7be81e89c66676e38975f0f169e283"
  },
  {
    "url": "assets/js/99.7d2d5d60.js",
    "revision": "33650095901278b0363b105b639e37cf"
  },
  {
    "url": "assets/js/app.508f0c62.js",
    "revision": "c0935cf4f70296391f8aa1758104d156"
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
    "revision": "e680cd28ae1ff2486da2bbb9e1f317fe"
  },
  {
    "url": "lesson_01.png",
    "revision": "15931111f2607cdddb4b8d64e7d52d62"
  },
  {
    "url": "pc/index.html",
    "revision": "b07f6965bcb93a57671125ffa3e3ecdb"
  },
  {
    "url": "pc/p-a.html",
    "revision": "2ef925cc3c50f52e11b96e41dc85b702"
  },
  {
    "url": "pc/p-b.html",
    "revision": "1715bb69a0d09f7ab81013beea0b2edd"
  },
  {
    "url": "pc/p-c.html",
    "revision": "495fef9307eb234b7f7c7c1b1522d317"
  },
  {
    "url": "phone/index.html",
    "revision": "bccad5dd55e74dd308ca07835148aa41"
  },
  {
    "url": "phone/phone-a.html",
    "revision": "c30c2a50ea15bbb725b8697c18e5b3ab"
  },
  {
    "url": "phone/phone-b.html",
    "revision": "037e100e265fe2273ea905e33b61adf5"
  },
  {
    "url": "phone/phone-c.html",
    "revision": "11b129476f0b91174fb65d1cd8590e7a"
  },
  {
    "url": "secondless/index.html",
    "revision": "a31c9f29c84ee4cdbd240c431ecb2942"
  },
  {
    "url": "secondless/w-a.html",
    "revision": "409c605a89f6e41568ba49070fcd99b6"
  },
  {
    "url": "secondless/w-a/Date类型：时间和日期.html",
    "revision": "e53625760cba6f98e132f38ba89064a1"
  },
  {
    "url": "secondless/w-a/Function类型：函数进阶.html",
    "revision": "ee8e73e50404186dbf92d825f547b3f3"
  },
  {
    "url": "secondless/w-a/javascript函数.html",
    "revision": "0fc303f28b0509d2a1b4992b6256b3fe"
  },
  {
    "url": "secondless/w-a/javascript基本包装类型.html",
    "revision": "8dcccc393f8cbb714837afca3a24827a"
  },
  {
    "url": "secondless/w-a/javascript基础.html",
    "revision": "94392b21a1d3c7ac2eb9dc3b4bbe7c72"
  },
  {
    "url": "secondless/w-a/javascript对象.html",
    "revision": "86658d46f8479d448bd9931df1048706"
  },
  {
    "url": "secondless/w-a/javascript数组.html",
    "revision": "aa7cae75546c966e64e216fc6f925fe9"
  },
  {
    "url": "secondless/w-a/javascript运算符.html",
    "revision": "7032cfcd76261ac86e0c5579dade13ff"
  },
  {
    "url": "secondless/w-a/事件.html",
    "revision": "582583223c533320dab9d4d29000c8df"
  },
  {
    "url": "secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html",
    "revision": "cb6c4f71820c43ce8e61ea47a70724bc"
  },
  {
    "url": "secondless/w-a/函数对象数组小结.html",
    "revision": "7be9a84fccf9537485c9af4613dea508"
  },
  {
    "url": "secondless/w-a/匿名函数和闭包.html",
    "revision": "75465758bdcc09f2efb554c78a0e6273"
  },
  {
    "url": "secondless/w-a/数据Cookie、XML、JSON.html",
    "revision": "ae9bf86a60571a5a768adbf4ba7407bd"
  },
  {
    "url": "secondless/w-a/流程控制语句.html",
    "revision": "45e692c818b4eaf3dfee634f19495759"
  },
  {
    "url": "secondless/w-a/浏览器对象模型BOM及浏览器检测.html",
    "revision": "8270af528136a8b951ad3b3d1608c8ff"
  },
  {
    "url": "secondless/w-a/网页文档对象模型DOM.html",
    "revision": "39a4bae2b0f9d086c9caa30985c2673d"
  },
  {
    "url": "secondless/w-a/表单处理及错误处理与调试.html",
    "revision": "4c2abd9d4707ef81508c09c304d34ee1"
  },
  {
    "url": "secondless/w-b.html",
    "revision": "f76555a1ebfe4a831cbec60032b881f5"
  },
  {
    "url": "secondless/w-b/Ajax.html",
    "revision": "489dc89fa294448777544b9e121666d3"
  },
  {
    "url": "secondless/w-b/jQuery.html",
    "revision": "a9924e2743b8082f05af301e31e3fa00"
  },
  {
    "url": "secondless/w-b/jQuery事件、动画、插件.html",
    "revision": "42a6ce172e622a3968ff79d627ab2c07"
  },
  {
    "url": "secondless/w-b/Node.js.html",
    "revision": "9d4386a00cb4d9235843cc7c04eb35c1"
  },
  {
    "url": "secondless/w-b/node.js+vue.js 渲染企业网站.html",
    "revision": "aabb280f9c43f986f1410bf5c22bb207"
  },
  {
    "url": "secondless/w-b/nodejs+jQuery开发留言板.html",
    "revision": "811afcb06fa2ec8f8031859a8af652fd"
  },
  {
    "url": "secondless/w-b/nodejs服务器端app.js文件.html",
    "revision": "eeae11d7e0457be3caa9bdf70498d4d8"
  },
  {
    "url": "secondless/w-b/Vue.js.html",
    "revision": "7dae5a302545bacb6ed1506e28205795"
  },
  {
    "url": "secondless/w-b/封装js库过渡到jQuery.html",
    "revision": "ab15f1e3218f7628fee46fbdae62188a"
  },
  {
    "url": "secondless/w-b/正则表达式.html",
    "revision": "7d21edc24bf309ed87a1b48993c5fc6e"
  },
  {
    "url": "secondless/w-b/面向对象与原型.html",
    "revision": "893dfc05a20a4e3511d46508df7d2560"
  },
  {
    "url": "secondless/w-c.html",
    "revision": "4bc0dd4d4457360560adaf4ae13b8ac5"
  },
  {
    "url": "secondless/w-c/Egg.js.html",
    "revision": "d230552e77a48ea48594f39e0761ae74"
  },
  {
    "url": "secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html",
    "revision": "05b933fbf80f74ccc113f9921707c31b"
  },
  {
    "url": "secondless/w-c/egg.js基础总结.html",
    "revision": "7006b87994252208404d04ce80b7ecc8"
  },
  {
    "url": "secondless/w-c/egg.js重要知识详细文档.html",
    "revision": "cde7cbe6376b59dc222953441d8bfee7"
  },
  {
    "url": "secondless/w-c/eggjs+postman测试工具将留言写入json文件.html",
    "revision": "b6219a48ae16201ade5ac2c2b5709821"
  },
  {
    "url": "secondless/w-c/mysql数据库.html",
    "revision": "a9c56b650dcca6ed006cf1752a172400"
  },
  {
    "url": "secondless/w-c/ValParams API 说明.html",
    "revision": "a2bfbd228548ce68706f066a6952cb94"
  },
  {
    "url": "secondless/w-c/上传文件.html",
    "revision": "f53a00948d8b25c3263a9b8ed16f6f27"
  },
  {
    "url": "secondless/w-c/企业网站其它页面(非首页).html",
    "revision": "fd2cd4710c3b2cda4406b5456f943694"
  },
  {
    "url": "secondless/w-c/企业网站前端部分.html",
    "revision": "fe12bea5bf0abd84651450a35e089160"
  },
  {
    "url": "secondless/w-c/企业网站后台内容管理.html",
    "revision": "312f3427c4dd4de8ffa9c9cf689020d9"
  },
  {
    "url": "secondless/w-c/企业网站后台栏目管理.html",
    "revision": "8dafd39e3ee0eda380e437b3645515c9"
  },
  {
    "url": "secondless/w-c/企业网站首页.html",
    "revision": "b2225bfdc7ed7d4a3d7b59c47cc29f59"
  },
  {
    "url": "secondless/w-c/响应式后台公共模版.html",
    "revision": "c494c05136f6cb48c24d598391a60a81"
  },
  {
    "url": "secondless/w-c/响应式后台用户留言板管理.html",
    "revision": "075d113215fb7467e51ccf4d2134ccb2"
  },
  {
    "url": "secondless/w-c/响应式后台界面示例代码.html",
    "revision": "933afc44d18ec4cb11e115b1799c5af6"
  },
  {
    "url": "secondless/w-c/响应式后台管理员登录.html",
    "revision": "2baff034e774e14ee45c4935f51f97d6"
  },
  {
    "url": "secondless/w-c/响应式后台管理系统.html",
    "revision": "3622fcda2759a9c797197ce17666bfbf"
  },
  {
    "url": "secondless/w-c/响应式网页布局.html",
    "revision": "f52a50511a73ab397eb0c98c20e1dc15"
  },
  {
    "url": "secondless/w-c/响应式网页布局指导思路.html",
    "revision": "a6ef252aed476ec22966a30f186b3c86"
  },
  {
    "url": "secondless/w-c/树形结构方法演变.html",
    "revision": "ec2aeef7cb0bd8544f93c932f6e95e59"
  },
  {
    "url": "secondless/w-c/直播功能中的用户表liveuser.html",
    "revision": "e5dba37d851f84c7b50457d4d6a65a25"
  },
  {
    "url": "secondless/w-c/直播功能中的直播间表live.html",
    "revision": "239fe8ea16bec262f23fa1d5ff977e71"
  },
  {
    "url": "secondless/w-c/直播功能中的礼物表livegift.html",
    "revision": "478782f02ef4d2bd533c0c69c318fbed"
  },
  {
    "url": "secondless/w-c/直播功能中的订单表liveorder.html",
    "revision": "993685b5e2384569330f1506b1b63669"
  },
  {
    "url": "secondless/w-c/网站后台管理员简单权限分配功能实现.html",
    "revision": "251f76ddee24846b20b9c9a1f395fb66"
  },
  {
    "url": "secondless/w-d.html",
    "revision": "9cc98b902a245b04717db6bd71cf74b8"
  },
  {
    "url": "secondless/w-d/SSL证书.html",
    "revision": "c5b1ebd2afa5bad84e337a2dcb348fc1"
  },
  {
    "url": "secondless/w-d/网站代码上线调试.html",
    "revision": "6364d8b9f69a25a575c02453fdf7dbb7"
  },
  {
    "url": "secondless/w-d/购买域名.html",
    "revision": "939b602b17a1abb11a3b29bf13467a3e"
  },
  {
    "url": "secondless/w-d/购买服务器.html",
    "revision": "a7cd5d1df35b27439d999379939da4e8"
  },
  {
    "url": "thirdless/index.html",
    "revision": "150518c95280c4e36d8054f3c6b97476"
  },
  {
    "url": "thirdless/w-a.html",
    "revision": "2de18a5a19e200cc54ff80bcb84d96e4"
  },
  {
    "url": "thirdless/w-a/02开发前环境搭建.html",
    "revision": "624d80b1d319f7179af014c0329bb612"
  },
  {
    "url": "thirdless/w-a/03引入UI框架及进行全局配置.html",
    "revision": "4b8b6bc2f9035a016fcd3f950b1aa715"
  },
  {
    "url": "thirdless/w-a/04首页开发.html",
    "revision": "c1b7d31d60936d3814caa49fecc57326"
  },
  {
    "url": "thirdless/w-a/05其它界面开发.html",
    "revision": "1992cdfd2edac96e3e74cf6144e7f6f1"
  },
  {
    "url": "thirdless/w-b.html",
    "revision": "719c0eae44e47614ac7a91e02ae93a4c"
  },
  {
    "url": "thirdless/w-c.html",
    "revision": "b23271422fc489910c5d5de479350a1f"
  },
  {
    "url": "thirdless/w-d.html",
    "revision": "c62873420435b70f4b3548cbfb24085b"
  },
  {
    "url": "web/answer/课程常见问题.html",
    "revision": "3ab6e9c85371d5ffa62ed5b85a0920b5"
  },
  {
    "url": "web/bootstrap/index.html",
    "revision": "70d9c9754775c03c1df7995de3f0253a"
  },
  {
    "url": "web/css/index.html",
    "revision": "44e81a02c15fbdb9f231cdd144c48248"
  },
  {
    "url": "web/css/封装的css样式库.html",
    "revision": "2f39f8a46efe0696b43a8ddd6c4ba880"
  },
  {
    "url": "web/echarts/index.html",
    "revision": "6af4ab83c3a32cdba5e97742b31123e0"
  },
  {
    "url": "web/github/index.html",
    "revision": "97f27bc90d065d45044fbfa9ee967441"
  },
  {
    "url": "web/IIS/index.html",
    "revision": "0fb392e9cc404fe52d8b4c94b9a304e5"
  },
  {
    "url": "web/index.html",
    "revision": "41dbe7e15abb12b98d04f2a26d18debd"
  },
  {
    "url": "web/methods/地图相关.html",
    "revision": "5eb8b3e3c0ae74b2e420dba1f0d24e4a"
  },
  {
    "url": "web/methods/定位相关.html",
    "revision": "03c7b33371fbf0515f0b53eb50918e3b"
  },
  {
    "url": "web/methods/实用接口.html",
    "revision": "a7270c395d4bd60256209b3b7628fa36"
  },
  {
    "url": "web/mysql/index.html",
    "revision": "374783ceda5d0a287b65ae34a247cd4e"
  },
  {
    "url": "web/software/index.html",
    "revision": "0d87432d0d3b1257cd4bd1da1879c6ff"
  },
  {
    "url": "web/Vanta.js/index.html",
    "revision": "14af6360b9fad55af228561768bd1572"
  },
  {
    "url": "web/vue.js/index.html",
    "revision": "2d1a87c9f25248e293032b976e8036d0"
  },
  {
    "url": "web/Vue3+ElementPlus/index.html",
    "revision": "2b2a6a70dbc3ff3db3ee89c56506c5db"
  },
  {
    "url": "web/w-a.html",
    "revision": "5c6dd4e1beb9c15156f62fec0c6b3080"
  },
  {
    "url": "web/w-b.html",
    "revision": "33950944fb15977107e0ed8045e47d5b"
  },
  {
    "url": "web/w-c.html",
    "revision": "2d8f183e3ef263bb36ec1cb7eea2fad1"
  },
  {
    "url": "开发记录.html",
    "revision": "5e3a280e1f0fea029d2601dc5cce4241"
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
