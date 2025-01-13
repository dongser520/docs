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
    "revision": "dfa56a8ff901c4cacba8f63647d94b28"
  },
  {
    "url": "about.html",
    "revision": "d22e1a0cee454fa2e1eda1a784e0ecc1"
  },
  {
    "url": "about/index.html",
    "revision": "472f7bce45f87a3517772d93ff949646"
  },
  {
    "url": "aboutless.html",
    "revision": "af003291f23e6e3903429a31a13086bf"
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
    "url": "assets/js/100.e88a193c.js",
    "revision": "0c17f98d6006e56646f6977c1ca8ba74"
  },
  {
    "url": "assets/js/101.9bf73607.js",
    "revision": "701f07ee6b634c14cf616e2eedd0e893"
  },
  {
    "url": "assets/js/102.34f89983.js",
    "revision": "fffc8f7d987893ea868ddc0a58a4862a"
  },
  {
    "url": "assets/js/103.d6ae10e3.js",
    "revision": "df3e6d2500ed09faee12690e4d7977f4"
  },
  {
    "url": "assets/js/104.ac7dc802.js",
    "revision": "ebec0ed7b4806029708a49aab476e27f"
  },
  {
    "url": "assets/js/105.2d3898c5.js",
    "revision": "f159d3858dbda9e75e1836617d0a21c9"
  },
  {
    "url": "assets/js/106.737324fd.js",
    "revision": "a986765ac349bf4fb7c4b1d814b75756"
  },
  {
    "url": "assets/js/107.957dc8b8.js",
    "revision": "c8450b0ec1171be3b6e77f266fc645da"
  },
  {
    "url": "assets/js/108.b05b8afc.js",
    "revision": "4c408c2fcf7699b323f41a0bed27b481"
  },
  {
    "url": "assets/js/109.3714990b.js",
    "revision": "75329a037730be2d7043662364a77a39"
  },
  {
    "url": "assets/js/11.96f87734.js",
    "revision": "68dc714fe50918b290290d0ecfd52ed3"
  },
  {
    "url": "assets/js/110.f0e60b0b.js",
    "revision": "3e588fa3d47b6fcfa8dcf1f1c18db50d"
  },
  {
    "url": "assets/js/111.ba25558e.js",
    "revision": "022e9fa2a452713f2eece4c35c01dcad"
  },
  {
    "url": "assets/js/112.879bb1ea.js",
    "revision": "a8b5689be031797f4af9bf3812d8ef9a"
  },
  {
    "url": "assets/js/113.6ff7b7ee.js",
    "revision": "e4ec21b87022237d1e89d08b53971d65"
  },
  {
    "url": "assets/js/114.8e0ba053.js",
    "revision": "891d89c72d5eafecf73a150e664698b1"
  },
  {
    "url": "assets/js/115.046147be.js",
    "revision": "ab9dce1d8741236781801d6249561813"
  },
  {
    "url": "assets/js/116.38e25a98.js",
    "revision": "1f5f1cbfc835c6ab9c342be622fbd053"
  },
  {
    "url": "assets/js/117.a153a4fe.js",
    "revision": "5b05dd63b4c661b1dd416903366de3ff"
  },
  {
    "url": "assets/js/118.d45ef587.js",
    "revision": "57d91db1bb8bb61eddcd92dbeacaad1d"
  },
  {
    "url": "assets/js/119.ec99d8a4.js",
    "revision": "5f41084ca7fb1b3aca93ee0a5b741fc0"
  },
  {
    "url": "assets/js/12.bb680a1d.js",
    "revision": "a6040a17e0182d76517d12dfda22b8a3"
  },
  {
    "url": "assets/js/120.2623497a.js",
    "revision": "a1feaa1d56666f5caae4fb06877acfb5"
  },
  {
    "url": "assets/js/121.c7beb15c.js",
    "revision": "85ad7f654f9499d147244b7ace001b2e"
  },
  {
    "url": "assets/js/13.3db94aa4.js",
    "revision": "dfec37f0f065b9c7a420266bdeeb44cb"
  },
  {
    "url": "assets/js/14.68621604.js",
    "revision": "f7080915b7c811027b54ce1da3d0a687"
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
    "url": "assets/js/17.218fa422.js",
    "revision": "3ef28207c62365265670cc2093181014"
  },
  {
    "url": "assets/js/18.6da07e72.js",
    "revision": "372a3235aeb99f450d6ab976169024d8"
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
    "url": "assets/js/24.ccb75e60.js",
    "revision": "eb43b5d9b03ec511295622e4bff1caa0"
  },
  {
    "url": "assets/js/25.1e29593a.js",
    "revision": "bc1bcce0adcfc92ec47d0fc87b22598e"
  },
  {
    "url": "assets/js/26.f3c97300.js",
    "revision": "224c4b2b1dd4fac0e8bda348569ed888"
  },
  {
    "url": "assets/js/27.1167ca1c.js",
    "revision": "2bc8ad570ad50daaeecd7d2e73bb3a8d"
  },
  {
    "url": "assets/js/28.86aabb0f.js",
    "revision": "090451fbc32a6516421053b90a8f394d"
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
    "url": "assets/js/30.aa4f8832.js",
    "revision": "cd79a7434b69732e207e41ae43907d39"
  },
  {
    "url": "assets/js/31.7ecc80fc.js",
    "revision": "4031269069bf34137b5b72793f3c4369"
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
    "url": "assets/js/37.abb1155f.js",
    "revision": "96cd97528abb6c45eb90ab005571627c"
  },
  {
    "url": "assets/js/38.b98f31c2.js",
    "revision": "1818af9438018a5ad38ae2d16cf190e3"
  },
  {
    "url": "assets/js/39.fce1daed.js",
    "revision": "9abf5a04040ee99f7ed231aa7f3a1d10"
  },
  {
    "url": "assets/js/4.40d220f8.js",
    "revision": "939e32db8a8524dc706eabd2fe583889"
  },
  {
    "url": "assets/js/40.3c8c250b.js",
    "revision": "ffbbf7885a790ec5d395891c9c8c588d"
  },
  {
    "url": "assets/js/41.c8f45fda.js",
    "revision": "b4d21a6f3ab7b9c9f018bedcc8cad7b8"
  },
  {
    "url": "assets/js/42.4eca5ce7.js",
    "revision": "02128b845034bd4324e1317715227ac6"
  },
  {
    "url": "assets/js/43.22e33737.js",
    "revision": "b702bf07d1de03fd5e17e1eb2a9adf1e"
  },
  {
    "url": "assets/js/44.7463cbdd.js",
    "revision": "da070c81058f78c82e9de7c380dff372"
  },
  {
    "url": "assets/js/45.0f7da3fa.js",
    "revision": "1b606f36f5016311666e4cab46363ddb"
  },
  {
    "url": "assets/js/46.6ec1c653.js",
    "revision": "3779985f8bdbde5b7735e9f68a3f63ed"
  },
  {
    "url": "assets/js/47.17fb3151.js",
    "revision": "7fecec04adf4c6e8c827e0a4195bee23"
  },
  {
    "url": "assets/js/48.bf6b93fb.js",
    "revision": "1a3bab4b87a6f58de711cefe78373a4a"
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
    "url": "assets/js/51.ad9964cb.js",
    "revision": "df45729ceb26f0ec80b2cd57c3a3149c"
  },
  {
    "url": "assets/js/52.d229fcf9.js",
    "revision": "27aed0ded189b16f89518c3bf334c41c"
  },
  {
    "url": "assets/js/53.d52a3107.js",
    "revision": "861cd09996f2be50039899c1f52a2527"
  },
  {
    "url": "assets/js/54.762fa302.js",
    "revision": "34e6495fd13d53902b3b1dd5f7ff913b"
  },
  {
    "url": "assets/js/55.5fa7cf72.js",
    "revision": "89f687237d14ec74dbad740bc28e9a8f"
  },
  {
    "url": "assets/js/56.1ae92aa5.js",
    "revision": "468dad91974609a85dca948ddb4f6cad"
  },
  {
    "url": "assets/js/57.3007ed4e.js",
    "revision": "ff95767044a2324a0e74d80419680eb3"
  },
  {
    "url": "assets/js/58.8b07689a.js",
    "revision": "0fc9945f47f7eb72455537ec00f87e25"
  },
  {
    "url": "assets/js/59.3ce70a04.js",
    "revision": "f8f2b826902120b88943ab16fd9f21b3"
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
    "url": "assets/js/62.7ab484a0.js",
    "revision": "c1583736251bd7ac5c879649e5a97fa6"
  },
  {
    "url": "assets/js/63.35a3f630.js",
    "revision": "427abc93a48d703b1301a22479821b50"
  },
  {
    "url": "assets/js/64.1eb94786.js",
    "revision": "e20aef9e7b194705e9a1133302f386b8"
  },
  {
    "url": "assets/js/65.268a221c.js",
    "revision": "ce769ff40bd87c0dff63bc518608c8e7"
  },
  {
    "url": "assets/js/66.e2ba15af.js",
    "revision": "82dd76eef3cdb336282a29a238aeca7e"
  },
  {
    "url": "assets/js/67.702e1088.js",
    "revision": "e24d2fefd7489e4da79705f0c609b647"
  },
  {
    "url": "assets/js/68.136d2361.js",
    "revision": "30ed40f52f0102673f9c11612d7c37d7"
  },
  {
    "url": "assets/js/69.ba6b7fe0.js",
    "revision": "c6273a7dd2c5997d06a0ba5a1cfdcf11"
  },
  {
    "url": "assets/js/7.4dbf2041.js",
    "revision": "dde2d7a5bd5472c9a8863af10ce0dbe5"
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
    "url": "assets/js/72.08022171.js",
    "revision": "beb556346d4737375adebf19ed77c10a"
  },
  {
    "url": "assets/js/73.283f8fe1.js",
    "revision": "3cc5a3f86e1625f435916a16afc9a348"
  },
  {
    "url": "assets/js/74.49f16c56.js",
    "revision": "f5fd66dea94bbe9bbadf01a46b259155"
  },
  {
    "url": "assets/js/75.9392de23.js",
    "revision": "b2d5bca0d7404578fa12d0ccc8b10ebc"
  },
  {
    "url": "assets/js/76.63847ea5.js",
    "revision": "dbd4227c06d4beb751c0d29872a0eae4"
  },
  {
    "url": "assets/js/77.da0e9f17.js",
    "revision": "d7d0dd673a858319b45dae02542ac476"
  },
  {
    "url": "assets/js/78.91f40c2e.js",
    "revision": "a0761d2c3822d1ab2f57d9a20a3e6393"
  },
  {
    "url": "assets/js/79.8252b98c.js",
    "revision": "3414fc3a218083f4d533ca7ba13bf4d7"
  },
  {
    "url": "assets/js/8.9e005545.js",
    "revision": "7385e413acec4be8321a735ee01080d5"
  },
  {
    "url": "assets/js/80.ddb226a3.js",
    "revision": "86a6984dded30002dcbb5f8028721747"
  },
  {
    "url": "assets/js/81.8fa3e1fe.js",
    "revision": "392f20d718846d49c943d4c2b12d2aa9"
  },
  {
    "url": "assets/js/82.94c8bfd0.js",
    "revision": "98d3424d194900e4635feb0842440eb1"
  },
  {
    "url": "assets/js/83.caf4bf86.js",
    "revision": "4991b63b783d3967230aec32a2783c82"
  },
  {
    "url": "assets/js/84.e3c193ec.js",
    "revision": "ae7c4c21e890573617d3d8c634c419a1"
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
    "url": "assets/js/87.5fa975f7.js",
    "revision": "7455d105186d7889cd18bdf78bd5d827"
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
    "url": "assets/js/90.8732ed7b.js",
    "revision": "eb9f316cea4d08469a80914b1d29e6fd"
  },
  {
    "url": "assets/js/91.fea63665.js",
    "revision": "66eb14562f1e3f10bebc5fca0b4c20a0"
  },
  {
    "url": "assets/js/92.79e686a6.js",
    "revision": "41e74049dcce8caca49e3419f5bf6ec7"
  },
  {
    "url": "assets/js/93.4a0cc2a2.js",
    "revision": "925f0a0126760295a891beed42b2d55c"
  },
  {
    "url": "assets/js/94.95c4e4e5.js",
    "revision": "3f97222cc7b40f04f16b0ad5b72b3190"
  },
  {
    "url": "assets/js/95.08fb8d87.js",
    "revision": "56b590117734435c6640168aae5f4339"
  },
  {
    "url": "assets/js/96.c44625b1.js",
    "revision": "a3ee8e7def798b305ec13c7e8dd084e9"
  },
  {
    "url": "assets/js/97.eb547081.js",
    "revision": "3d34cad3fd283785eaff5b9d0e1a6e97"
  },
  {
    "url": "assets/js/98.9cb58c69.js",
    "revision": "5086bec4a8bc06046599c459c3effb49"
  },
  {
    "url": "assets/js/99.7088c0d7.js",
    "revision": "c516e29749de66995663945a85da8895"
  },
  {
    "url": "assets/js/app.faebde35.js",
    "revision": "f054d4ae56d9a79bcb14ae7f8dcfd350"
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
    "revision": "bc245848629791d95d7258ba751e8c6f"
  },
  {
    "url": "lesson_01.png",
    "revision": "15931111f2607cdddb4b8d64e7d52d62"
  },
  {
    "url": "pc/index.html",
    "revision": "68033ccb89bcc2aaaf0c8a0b740f52f3"
  },
  {
    "url": "pc/p-a.html",
    "revision": "9a58e49d52ba2c2ba7edf55247f52c9c"
  },
  {
    "url": "pc/p-b.html",
    "revision": "15215b261eb0b4842b2676c113b69c42"
  },
  {
    "url": "pc/p-c.html",
    "revision": "c9bf52192a9e113adaa3a014f0b12dee"
  },
  {
    "url": "phone/index.html",
    "revision": "6eef2d5c743a9d8537841dfb4cd35e1a"
  },
  {
    "url": "phone/phone-a.html",
    "revision": "bd6121faf4ad231de99d5f78e9a81059"
  },
  {
    "url": "phone/phone-b.html",
    "revision": "277b5bd28ac63e6dd41e0623b6c95552"
  },
  {
    "url": "phone/phone-c.html",
    "revision": "a188c9d1d7ef8fdc1cb85aab55158d72"
  },
  {
    "url": "secondless/index.html",
    "revision": "7aa7b2d58ee29b21febce2b4767d2ccd"
  },
  {
    "url": "secondless/w-a.html",
    "revision": "6d78d5824ec315a0f3aedce3e9789796"
  },
  {
    "url": "secondless/w-a/Date类型：时间和日期.html",
    "revision": "f853db26b3c1247a18683170ef577b56"
  },
  {
    "url": "secondless/w-a/Function类型：函数进阶.html",
    "revision": "36a38aaf6473eb97443164f0ee650f6b"
  },
  {
    "url": "secondless/w-a/javascript函数.html",
    "revision": "9c54aab810becde211f3b6ec9b42c2bc"
  },
  {
    "url": "secondless/w-a/javascript基本包装类型.html",
    "revision": "b219ac0bcf4eb3eb1d33c17608e79be5"
  },
  {
    "url": "secondless/w-a/javascript基础.html",
    "revision": "5af68620c51fb444f7278b655b6e4a93"
  },
  {
    "url": "secondless/w-a/javascript对象.html",
    "revision": "e2775930945d4606a3891a94e96e4e26"
  },
  {
    "url": "secondless/w-a/javascript数组.html",
    "revision": "b6cc6db4bf9d43e2f31e42baeb403c78"
  },
  {
    "url": "secondless/w-a/javascript运算符.html",
    "revision": "a606e17504c84b40dd85bd89a260bdc0"
  },
  {
    "url": "secondless/w-a/事件.html",
    "revision": "431064b05e11f144ef3382f4fce884bf"
  },
  {
    "url": "secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html",
    "revision": "5920b2de7c5eee7c93c8f09fe3834921"
  },
  {
    "url": "secondless/w-a/函数对象数组小结.html",
    "revision": "f35b2df90c60ba87f2e8cd2a2a4e5054"
  },
  {
    "url": "secondless/w-a/匿名函数和闭包.html",
    "revision": "3c78816507e18f9beeae0342d810a6f3"
  },
  {
    "url": "secondless/w-a/数据Cookie、XML、JSON.html",
    "revision": "d372ed51f18c80b4167846df3a2113fd"
  },
  {
    "url": "secondless/w-a/流程控制语句.html",
    "revision": "327e3c17ab9e9b96b3f0edeabbcd9f57"
  },
  {
    "url": "secondless/w-a/浏览器对象模型BOM及浏览器检测.html",
    "revision": "67af81a25e3eaa7da38b43aace29fba6"
  },
  {
    "url": "secondless/w-a/网页文档对象模型DOM.html",
    "revision": "8f7247cd8823ef1382bb83393778be29"
  },
  {
    "url": "secondless/w-a/表单处理及错误处理与调试.html",
    "revision": "9b042f5ff32a15936575d9f9cc9130b1"
  },
  {
    "url": "secondless/w-b.html",
    "revision": "396ebbf4e0f696168dda40045eabf250"
  },
  {
    "url": "secondless/w-b/Ajax.html",
    "revision": "c337e227092310eb9ddd0ea00f80231c"
  },
  {
    "url": "secondless/w-b/jQuery.html",
    "revision": "dcdc94bd0d9695e9af7d3e3c91fcaf8b"
  },
  {
    "url": "secondless/w-b/jQuery事件、动画、插件.html",
    "revision": "a8306add5d0a5995cd6c49f086856a57"
  },
  {
    "url": "secondless/w-b/Node.js.html",
    "revision": "ce3073780b553defad9e785f4666a17a"
  },
  {
    "url": "secondless/w-b/node.js+vue.js 渲染企业网站.html",
    "revision": "bce8a40d0acf5e67719424b2a7881de9"
  },
  {
    "url": "secondless/w-b/nodejs+jQuery开发留言板.html",
    "revision": "a6588723a7eab62b33298ea6a057a70c"
  },
  {
    "url": "secondless/w-b/nodejs服务器端app.js文件.html",
    "revision": "2db5bc13d6d275c6dbfc15237d99f568"
  },
  {
    "url": "secondless/w-b/Vue.js.html",
    "revision": "d3e32beafd74b83f2d6165f2cfc8624b"
  },
  {
    "url": "secondless/w-b/封装js库过渡到jQuery.html",
    "revision": "fbc9e44ef4fd3cea80fd60459d3919ec"
  },
  {
    "url": "secondless/w-b/正则表达式.html",
    "revision": "d395a393f450fd8271ad7e180ee87ccd"
  },
  {
    "url": "secondless/w-b/面向对象与原型.html",
    "revision": "a9e481d78fbc6bf137c5870e744d7c42"
  },
  {
    "url": "secondless/w-c.html",
    "revision": "57534e885ae27f2deb84c15ea30492ce"
  },
  {
    "url": "secondless/w-c/Egg.js.html",
    "revision": "538875d7f4cef3dc6dec8e5fb19dd225"
  },
  {
    "url": "secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html",
    "revision": "87c6d91ec491498c92d63238acb9945b"
  },
  {
    "url": "secondless/w-c/egg.js基础总结.html",
    "revision": "5996b24e099394141848c6269a529cc8"
  },
  {
    "url": "secondless/w-c/egg.js重要知识详细文档.html",
    "revision": "be56e6a8bcc510b95b4a757cd3d76bb2"
  },
  {
    "url": "secondless/w-c/eggjs+postman测试工具将留言写入json文件.html",
    "revision": "389cacdcddd95384f54f495af78c122b"
  },
  {
    "url": "secondless/w-c/mysql数据库.html",
    "revision": "7b75280cf4c6ebc8f239535ae495961d"
  },
  {
    "url": "secondless/w-c/ValParams API 说明.html",
    "revision": "09524f6dcb889bcb506b880d39c05640"
  },
  {
    "url": "secondless/w-c/上传文件.html",
    "revision": "9bc934f5c459f19adc18c5996583040a"
  },
  {
    "url": "secondless/w-c/企业网站其它页面(非首页).html",
    "revision": "51fe2a81422e4b1c21d2679930f0fc3c"
  },
  {
    "url": "secondless/w-c/企业网站前端部分.html",
    "revision": "62f353094fbc328bbff42d5a72ffc90b"
  },
  {
    "url": "secondless/w-c/企业网站后台内容管理.html",
    "revision": "fb99e6b0896055b0cd887251356ecb7d"
  },
  {
    "url": "secondless/w-c/企业网站后台栏目管理.html",
    "revision": "6867e714ec643eacaed0f680cd5dee53"
  },
  {
    "url": "secondless/w-c/企业网站首页.html",
    "revision": "1de2e273b06794e15127b35fd121d95f"
  },
  {
    "url": "secondless/w-c/响应式后台公共模版.html",
    "revision": "9b68ef85632d6b136f2da61b4ede8620"
  },
  {
    "url": "secondless/w-c/响应式后台用户留言板管理.html",
    "revision": "d686bc0f0c0933561aa5051abac69804"
  },
  {
    "url": "secondless/w-c/响应式后台界面示例代码.html",
    "revision": "50db56fd145ca547f6cae00e78019be3"
  },
  {
    "url": "secondless/w-c/响应式后台管理员登录.html",
    "revision": "5276d6c49a4bdde588400220f7105ee1"
  },
  {
    "url": "secondless/w-c/响应式后台管理系统.html",
    "revision": "eb91c85bc19d256dfd86244261a5a5f5"
  },
  {
    "url": "secondless/w-c/响应式网页布局.html",
    "revision": "840ea7baf8777360e0ed23b9e3f9962e"
  },
  {
    "url": "secondless/w-c/响应式网页布局指导思路.html",
    "revision": "14561fddcb74d096a13254e05cbf634c"
  },
  {
    "url": "secondless/w-c/树形结构方法演变.html",
    "revision": "59fe37a97947407fb65b790e9a9fba47"
  },
  {
    "url": "secondless/w-c/直播功能中的用户表liveuser.html",
    "revision": "22ec43a533beb09479ff655cc09f68dd"
  },
  {
    "url": "secondless/w-c/直播功能中的直播间表live.html",
    "revision": "f5a5293793f0e906b72b59fe8249948f"
  },
  {
    "url": "secondless/w-c/直播功能中的礼物表livegift.html",
    "revision": "2e9a99b19a278acfec168f53b960a9c7"
  },
  {
    "url": "secondless/w-c/直播功能中的订单表liveorder.html",
    "revision": "bdb80af576e16f2f2aaeac45341351ae"
  },
  {
    "url": "secondless/w-c/网站后台管理员简单权限分配功能实现.html",
    "revision": "aad034dab8f78ff5f673b1395bbd3f23"
  },
  {
    "url": "secondless/w-d.html",
    "revision": "0daba0ff5ceb41631e27a2857e13c896"
  },
  {
    "url": "secondless/w-d/SSL证书.html",
    "revision": "305fcbc8ed800178aa24e8c7b84ade19"
  },
  {
    "url": "secondless/w-d/网站代码上线调试.html",
    "revision": "02cefd8dddf5f2116f8428dbc0270e16"
  },
  {
    "url": "secondless/w-d/购买域名.html",
    "revision": "ac92edc31872a509e0e96abfb0e42e21"
  },
  {
    "url": "secondless/w-d/购买服务器.html",
    "revision": "c5bad64c3b4b7032ee348cb4d120dad9"
  },
  {
    "url": "thirdless/index.html",
    "revision": "b21c10dbd4203edbbc5e741058e62deb"
  },
  {
    "url": "thirdless/w-a.html",
    "revision": "625c96b4b74a430be42b916228de923b"
  },
  {
    "url": "thirdless/w-a/02开发前环境搭建.html",
    "revision": "ac718c9146efd02d263b6124b0a72f61"
  },
  {
    "url": "thirdless/w-a/03引入UI框架及进行全局配置.html",
    "revision": "81a85e5dcf4f51166e93047142336cf1"
  },
  {
    "url": "thirdless/w-a/04首页开发.html",
    "revision": "50a9b8b301f4d4f39517ce2dfc334b24"
  },
  {
    "url": "thirdless/w-a/05其它界面开发.html",
    "revision": "ebc1bf2203856a574a2b015dc542cb60"
  },
  {
    "url": "thirdless/w-a/06数据处理.html",
    "revision": "4fb53d224c52b08fb6e30c2656140581"
  },
  {
    "url": "thirdless/w-a/07后端api开发.html",
    "revision": "2ebf3fb8c241968f286d883ddca81262"
  },
  {
    "url": "thirdless/w-a/07后端api开发代码.html",
    "revision": "9befb64a626985aa1e92ac1572c17ca0"
  },
  {
    "url": "thirdless/w-a/08数据交互和界面展示.html",
    "revision": "722df5abcedcdc12e71137fc7ef23262"
  },
  {
    "url": "thirdless/w-b.html",
    "revision": "226d4aa9a430b805d431a1649e6ee746"
  },
  {
    "url": "thirdless/w-c.html",
    "revision": "5afc05815cb06928ddb629ffad7c1f81"
  },
  {
    "url": "thirdless/w-d.html",
    "revision": "83ea1fc4f92932ed2ed8c1f5de2db51e"
  },
  {
    "url": "web/answer/课程常见问题.html",
    "revision": "1fe090e4a4a5d7a83310520153c85c40"
  },
  {
    "url": "web/bootstrap/index.html",
    "revision": "70a7c177335cf136434074348cef6688"
  },
  {
    "url": "web/css/index.html",
    "revision": "21f7d3524fde19950315f82babfc9461"
  },
  {
    "url": "web/css/封装的css样式库.html",
    "revision": "7285a4aa0dfa0e33ba8da16e9c1bb46e"
  },
  {
    "url": "web/echarts/index.html",
    "revision": "c4f33996b2427d3481601bb0530bc7a8"
  },
  {
    "url": "web/github/index.html",
    "revision": "47303f205bfdc5db8bb87356052b54a4"
  },
  {
    "url": "web/IIS/index.html",
    "revision": "8263ca325a4e4b56c73198933fd6f604"
  },
  {
    "url": "web/index.html",
    "revision": "5c2162fb963541f88684dbd907b69256"
  },
  {
    "url": "web/methods/地图相关.html",
    "revision": "e3b1c54a3303f213e7477b8fdd7a3a21"
  },
  {
    "url": "web/methods/定位相关.html",
    "revision": "a710b9fbfb851619d7525a720d474a11"
  },
  {
    "url": "web/methods/实用接口.html",
    "revision": "17148d5ac86e645cc0dcc1308d6cf144"
  },
  {
    "url": "web/mysql/index.html",
    "revision": "5266b1075558810fdfe51ff489fcc09f"
  },
  {
    "url": "web/shop/index.html",
    "revision": "e68a6530e20c21cf40f856307803a79e"
  },
  {
    "url": "web/software/index.html",
    "revision": "4c4ead3fce3de70006fe0e1b3fad08e9"
  },
  {
    "url": "web/Vanta.js/index.html",
    "revision": "8e71e93e4d91b084004a3af3099c384d"
  },
  {
    "url": "web/vue.js/index.html",
    "revision": "6fd40db2180df4031c2e2b132a5fcf68"
  },
  {
    "url": "web/Vue3+ElementPlus/index.html",
    "revision": "a718758f15303dde9902b765b85bfe95"
  },
  {
    "url": "web/w-a.html",
    "revision": "03d5bc45c9d9ddcaf8cc13bc93bb4b97"
  },
  {
    "url": "web/w-b.html",
    "revision": "f589659c19598f12679c5f2fb288b52a"
  },
  {
    "url": "web/w-c.html",
    "revision": "f3edfc5fdb45c635f8fbd3e6fc26344d"
  },
  {
    "url": "开发记录.html",
    "revision": "d06eed027fec07c436276aed37537e49"
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
