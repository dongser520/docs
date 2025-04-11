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
    "revision": "53d7a11ae3e2fa86e58f5cc13b6f0b3e"
  },
  {
    "url": "about.html",
    "revision": "c5220c6cdbbc638f87413a9bc9576f51"
  },
  {
    "url": "about/index.html",
    "revision": "7aa08f66a6cbf30f72a258d8440a49a5"
  },
  {
    "url": "aboutless.html",
    "revision": "cf28d9e5b9e45b4cbc6a0be24199f4ce"
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
    "url": "assets/js/100.12c68972.js",
    "revision": "a4d90f6dc3c9d1484e697ce9a207b370"
  },
  {
    "url": "assets/js/101.b1024d3c.js",
    "revision": "86ad28c0704c4e136f5ca5bf5f4db560"
  },
  {
    "url": "assets/js/102.6caae6fb.js",
    "revision": "ab85a3400ceea7c9f703bab288bdb1c3"
  },
  {
    "url": "assets/js/103.e85219c0.js",
    "revision": "a5f9a807110b837d5a430a8170255135"
  },
  {
    "url": "assets/js/104.64ceee9a.js",
    "revision": "0cce6dc3897cad875db139130b2e1c38"
  },
  {
    "url": "assets/js/105.03f6d168.js",
    "revision": "dd07d80fe3add0d58b6b8767830076b7"
  },
  {
    "url": "assets/js/106.d60754b8.js",
    "revision": "7d0c6edc50294dd089d6848b299fa649"
  },
  {
    "url": "assets/js/107.04c2ce43.js",
    "revision": "9a317aae18031414400deb101437bd3e"
  },
  {
    "url": "assets/js/108.4f3f726f.js",
    "revision": "84a4087fcd72be369adf998e91522de6"
  },
  {
    "url": "assets/js/109.73158934.js",
    "revision": "743c38eb149e58c8403ac94944e29671"
  },
  {
    "url": "assets/js/11.934eb133.js",
    "revision": "0cbfb5a79c209befa057aecc68c6e027"
  },
  {
    "url": "assets/js/110.6e9e2f72.js",
    "revision": "c807b31a7c947ee56f40d4f2146b2868"
  },
  {
    "url": "assets/js/111.1563482a.js",
    "revision": "6c35f7ab05bac46cf09e50c07678fdf2"
  },
  {
    "url": "assets/js/112.011aa991.js",
    "revision": "6ddbfbacd8bc0c94211d29fcc9675797"
  },
  {
    "url": "assets/js/113.3407e873.js",
    "revision": "88224e3a757f2a5dd30009827fea66d4"
  },
  {
    "url": "assets/js/114.f8272f2f.js",
    "revision": "74e0cd9f1afaa27583e830719deb88cd"
  },
  {
    "url": "assets/js/115.c265425a.js",
    "revision": "88e2691ff97a174c5a4c5348099566c5"
  },
  {
    "url": "assets/js/116.2f60692f.js",
    "revision": "3ead8d3b7a5794af35c12571c4f51cf6"
  },
  {
    "url": "assets/js/117.7cddb29e.js",
    "revision": "58bb48efc25c3a64a2e35cfe6b23be92"
  },
  {
    "url": "assets/js/118.483652e9.js",
    "revision": "ed55c22675cbfc6c8623e4c7bab87ae6"
  },
  {
    "url": "assets/js/119.4e2572cc.js",
    "revision": "6841d628b1ecdce55b005852d9fdab80"
  },
  {
    "url": "assets/js/12.cc2380d1.js",
    "revision": "db2bbf818f1a04422508866c29849f49"
  },
  {
    "url": "assets/js/120.6d437fba.js",
    "revision": "f230b6cb5f2a78328cc3ca428c4513cf"
  },
  {
    "url": "assets/js/121.8d1a5d5e.js",
    "revision": "3ba90e1aa200a5fdb16b6f751df17a64"
  },
  {
    "url": "assets/js/122.3783f1f0.js",
    "revision": "a448d1f5b27785fccf29be993242da48"
  },
  {
    "url": "assets/js/123.cdc4feaf.js",
    "revision": "745b3ffc7d98acd6bd482fa96fff5b4a"
  },
  {
    "url": "assets/js/124.3323b266.js",
    "revision": "493eb93b8268bd5465e9d5a596c65856"
  },
  {
    "url": "assets/js/125.f8b3922d.js",
    "revision": "c529674bd7735c438439a80c6977566a"
  },
  {
    "url": "assets/js/126.973cd783.js",
    "revision": "0767a7efa0452f681d9d17876edbd701"
  },
  {
    "url": "assets/js/127.4e8a2192.js",
    "revision": "ca6fe0069a68ad9539f2455d62bea3b3"
  },
  {
    "url": "assets/js/128.f8e83f7c.js",
    "revision": "37a94cbe6f1b2346dad9a15192260e0f"
  },
  {
    "url": "assets/js/129.91e19b74.js",
    "revision": "1ecc57f08f1313395ac2c99e45cf321c"
  },
  {
    "url": "assets/js/13.50c9a147.js",
    "revision": "bed37f54cddae07ff1e84a7d8953e36c"
  },
  {
    "url": "assets/js/130.0b62899e.js",
    "revision": "e4be0a85c4d25a9a503ac7163f8fcdf8"
  },
  {
    "url": "assets/js/131.654c3d93.js",
    "revision": "04ad8aff3b3e588285e24d5a16c86b67"
  },
  {
    "url": "assets/js/132.813fb67f.js",
    "revision": "13b2789dae100b201bb1772ab40335c4"
  },
  {
    "url": "assets/js/133.2784b282.js",
    "revision": "f92daf87e8904661d6671a85af3806ca"
  },
  {
    "url": "assets/js/134.394a89f5.js",
    "revision": "3864a5c8f7d31aacce0d447faf8e690e"
  },
  {
    "url": "assets/js/135.f32588d3.js",
    "revision": "ab4af34369d96f2344fb71daf3e6936d"
  },
  {
    "url": "assets/js/136.5776ecbe.js",
    "revision": "937e42bfe7bb645df7b9987eb0159280"
  },
  {
    "url": "assets/js/137.a82ae01d.js",
    "revision": "24b3380e2925c7ccdd83c76545a3f975"
  },
  {
    "url": "assets/js/138.fb669103.js",
    "revision": "88b3dd585ceee6cdd8ae1f81a94d77a9"
  },
  {
    "url": "assets/js/139.6ce775f5.js",
    "revision": "f538f9793019b8ef009d0b4054856ef3"
  },
  {
    "url": "assets/js/14.6d0a18d0.js",
    "revision": "5b3c02e023a373824ca3ee7edff88843"
  },
  {
    "url": "assets/js/140.d333b447.js",
    "revision": "45eb944a80616626e10f5e6710ea7394"
  },
  {
    "url": "assets/js/141.0fef8b3b.js",
    "revision": "ada190283575c61b094ab53ebb000828"
  },
  {
    "url": "assets/js/142.e902c0e2.js",
    "revision": "18802866765f786d9fbedfc2e3c501a4"
  },
  {
    "url": "assets/js/143.3b5c5d5c.js",
    "revision": "9c45407d46df9a7e5883d9f83620a692"
  },
  {
    "url": "assets/js/144.b4616d41.js",
    "revision": "16ee3b1125c301d475597288ddacd941"
  },
  {
    "url": "assets/js/145.47996f39.js",
    "revision": "5c693879d16e355349033e614e3ac00a"
  },
  {
    "url": "assets/js/146.37fcc5b9.js",
    "revision": "c723d45c8ea99ae9717dbd83bf3b1307"
  },
  {
    "url": "assets/js/147.85f5d90c.js",
    "revision": "26a329ace10f742081b0e14d82d34f81"
  },
  {
    "url": "assets/js/148.978afe6a.js",
    "revision": "4726a60314af9d2b2ff91708b1b4dcb2"
  },
  {
    "url": "assets/js/149.052e2e51.js",
    "revision": "62ffb4eaa5e809ceca9e27819fb8abf0"
  },
  {
    "url": "assets/js/15.5333b525.js",
    "revision": "e94b60e41648e2516a262f16fb29ce09"
  },
  {
    "url": "assets/js/150.770234ce.js",
    "revision": "97372a0989658f5a5e122fb7dbdd0546"
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
    "url": "assets/js/18.220e9a9f.js",
    "revision": "22ccf00599351d356907b70f18cba702"
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
    "url": "assets/js/22.843f3e78.js",
    "revision": "8c562d2ecc0c74cd8076fbc778630c92"
  },
  {
    "url": "assets/js/23.72a4c5a0.js",
    "revision": "90100fb2428119d573b2bc0faa55b644"
  },
  {
    "url": "assets/js/24.335fad2e.js",
    "revision": "4c8b0d787565701ff75d49036cb5e99e"
  },
  {
    "url": "assets/js/25.6fb9292b.js",
    "revision": "a9bebbb5131ac9b42b92893c4e934cfb"
  },
  {
    "url": "assets/js/26.278502ef.js",
    "revision": "e6ce096839ee2ec9cd05bb5b53965e99"
  },
  {
    "url": "assets/js/27.c3473e2c.js",
    "revision": "328cff04664007cbab3257ae5ad9505c"
  },
  {
    "url": "assets/js/28.76d29c91.js",
    "revision": "5ecfd52c1df5e01276bcf866e502b6e0"
  },
  {
    "url": "assets/js/29.8b05e423.js",
    "revision": "7b14d763eec240a139eaf553d8c374d1"
  },
  {
    "url": "assets/js/3.e6827fa8.js",
    "revision": "f1ffa92e22c7370c76abfc2cdb906d17"
  },
  {
    "url": "assets/js/30.2f7d6180.js",
    "revision": "5c17ff537e68ed85e84063fd32ea3f32"
  },
  {
    "url": "assets/js/31.bded2af5.js",
    "revision": "c37c5fa9fba07d5f5615fe03f111ce6e"
  },
  {
    "url": "assets/js/32.f09e389b.js",
    "revision": "34d5e408912593719e2d128a918ba90f"
  },
  {
    "url": "assets/js/33.1407b9c5.js",
    "revision": "bf29edabcae9cf2c3abbdbc9e838a982"
  },
  {
    "url": "assets/js/34.db63b21b.js",
    "revision": "c7f198d16545cc1e8ddac0c085984b18"
  },
  {
    "url": "assets/js/35.8252edd8.js",
    "revision": "7818fa02c0fb219ce8eaf78011dd009b"
  },
  {
    "url": "assets/js/36.779ec2e9.js",
    "revision": "8edec0cd40879efcdf3525f6284c25ac"
  },
  {
    "url": "assets/js/37.5f5821d5.js",
    "revision": "c13a469f092e17f2da914e18c6419102"
  },
  {
    "url": "assets/js/38.cc34a318.js",
    "revision": "f3a03d35b41a8316adceef8e4752669a"
  },
  {
    "url": "assets/js/39.abd37f0c.js",
    "revision": "42770d36f63a7c910639cc6117a9e81b"
  },
  {
    "url": "assets/js/4.9ddf1004.js",
    "revision": "083a35ef57266d043c287c8e2cd07450"
  },
  {
    "url": "assets/js/40.5b880d05.js",
    "revision": "94d2592fc64c54c5b95fe3278d380a99"
  },
  {
    "url": "assets/js/41.29fc8eda.js",
    "revision": "e9e1d6147c091bb19f64fbec2703951e"
  },
  {
    "url": "assets/js/42.cfb63613.js",
    "revision": "54a06f046492105e370332107b827a4f"
  },
  {
    "url": "assets/js/43.4e1f4648.js",
    "revision": "987d8f1784a2cae4989007d3f5607a35"
  },
  {
    "url": "assets/js/44.1c662d16.js",
    "revision": "49e47cc9cc47671fddc4d5fec75e2f5c"
  },
  {
    "url": "assets/js/45.c16f948b.js",
    "revision": "178fd0c84430bf4ed16cb11ff78dbc79"
  },
  {
    "url": "assets/js/46.cf29e187.js",
    "revision": "bf86eade4f62a247d03c49dc3accf385"
  },
  {
    "url": "assets/js/47.b69f4ebe.js",
    "revision": "55a216766ce469691697c20f4b1028b6"
  },
  {
    "url": "assets/js/48.c8e95b7c.js",
    "revision": "6088027596702be597c124deba879ca6"
  },
  {
    "url": "assets/js/49.c1d043dc.js",
    "revision": "c847bce0c1cfd26706dc5ba8a06ed70b"
  },
  {
    "url": "assets/js/5.3e24e7be.js",
    "revision": "bb8330fc3b00684c0b46c0c7ade9634a"
  },
  {
    "url": "assets/js/50.dc9d95f2.js",
    "revision": "990c609a7e67f59857a30a0f88ab59ee"
  },
  {
    "url": "assets/js/51.fc9fb292.js",
    "revision": "a60b4c0bdd365acd1027c0151229c9de"
  },
  {
    "url": "assets/js/52.b22c753e.js",
    "revision": "bfcbdeab2318ece7967013dc2740c92c"
  },
  {
    "url": "assets/js/53.879964be.js",
    "revision": "804cb3139e8373aa644bb3ce2d368f65"
  },
  {
    "url": "assets/js/54.17578237.js",
    "revision": "f770d923a7593337784e88dfd22daf94"
  },
  {
    "url": "assets/js/55.82f26c14.js",
    "revision": "5620d11ecac644e1b36f22804338ec83"
  },
  {
    "url": "assets/js/56.f6b6e23a.js",
    "revision": "93069f37f1d44383cad875157a681343"
  },
  {
    "url": "assets/js/57.a816ab15.js",
    "revision": "833fbde999aec4828b8a1ee4563f91c1"
  },
  {
    "url": "assets/js/58.9d8cd8cd.js",
    "revision": "b1fa6b25acd599bdb1b9bdd31b4cfe0f"
  },
  {
    "url": "assets/js/59.79fcd649.js",
    "revision": "a56055d89df479f98fb3a29e9d8b4ab1"
  },
  {
    "url": "assets/js/6.ca2525e2.js",
    "revision": "f26b99a11274e34a1a8df09422012df8"
  },
  {
    "url": "assets/js/60.d39a61f9.js",
    "revision": "ed5c9145a840f1b74dab891ed11eee33"
  },
  {
    "url": "assets/js/61.36ad9625.js",
    "revision": "57dcb9bd9c143e6b73a738c7db1d4704"
  },
  {
    "url": "assets/js/62.4a2bba5d.js",
    "revision": "b1608da0ef29d32b0af29fbe64515b8c"
  },
  {
    "url": "assets/js/63.34cb55a8.js",
    "revision": "3f4650e8391c33a4a2f2cac3303163e8"
  },
  {
    "url": "assets/js/64.90ed4669.js",
    "revision": "472399268b8a615f73dc41bea1effba9"
  },
  {
    "url": "assets/js/65.321c1582.js",
    "revision": "987186305094acb3706b3e18043c370d"
  },
  {
    "url": "assets/js/66.0162b73e.js",
    "revision": "07c2a9ea42fe0cd06a860ed023214711"
  },
  {
    "url": "assets/js/67.1177bf82.js",
    "revision": "51df46708e53b9a197e48bcdbbf49be2"
  },
  {
    "url": "assets/js/68.b461871d.js",
    "revision": "a7a192363dab6ff120e8ce89ac87391f"
  },
  {
    "url": "assets/js/69.3676249c.js",
    "revision": "f6387d369b1d9981465b0571f7596b70"
  },
  {
    "url": "assets/js/7.f47815f1.js",
    "revision": "247a6bbf21d07dd42ed57f237e004f40"
  },
  {
    "url": "assets/js/70.2f692675.js",
    "revision": "5b51550be220f8e593640dbf182c45c3"
  },
  {
    "url": "assets/js/71.8ac5a83a.js",
    "revision": "41a379bbe868280478866f3341f0bd12"
  },
  {
    "url": "assets/js/72.1a1fc76f.js",
    "revision": "ff2d54fb70127c12d122c99275d85b0a"
  },
  {
    "url": "assets/js/73.77f3b8fb.js",
    "revision": "d4a7da2b70edb675f834833429d789aa"
  },
  {
    "url": "assets/js/74.3f94ae0d.js",
    "revision": "68f3376c34f18c7356af2020952d43da"
  },
  {
    "url": "assets/js/75.efda126d.js",
    "revision": "752e4d1e30aeaa43f3411c5f2ceff067"
  },
  {
    "url": "assets/js/76.69656e2d.js",
    "revision": "7329aecb8ac483e85ee54a7102e9f65c"
  },
  {
    "url": "assets/js/77.483d5b22.js",
    "revision": "a6311784ca5d3236d7ba65bae1d20e2e"
  },
  {
    "url": "assets/js/78.20202e61.js",
    "revision": "196d9f5c783c119bb8c569f5dfd4e167"
  },
  {
    "url": "assets/js/79.4e8ff9fa.js",
    "revision": "63532046e72ea79a3fdfbd53c4b2b6f8"
  },
  {
    "url": "assets/js/8.60fb362c.js",
    "revision": "f02a822646b19c6b61e3d66ebf323374"
  },
  {
    "url": "assets/js/80.6c2e35e5.js",
    "revision": "81bfa233e5cfd93dc9cd0f11db519300"
  },
  {
    "url": "assets/js/81.0c11ac2f.js",
    "revision": "a8a996e8938c20c745b7bd3a0efddfae"
  },
  {
    "url": "assets/js/82.100fd761.js",
    "revision": "cf1609d5661bb5206ed474858e747602"
  },
  {
    "url": "assets/js/83.de887ffa.js",
    "revision": "c11f86a022d24f510d75c0598bb1c11c"
  },
  {
    "url": "assets/js/84.a656314f.js",
    "revision": "843ec343cdb41bb08cf2a5749ae5632e"
  },
  {
    "url": "assets/js/85.ef457df5.js",
    "revision": "2b3d284a1b2cb77d8972feaee9ed860f"
  },
  {
    "url": "assets/js/86.bf1c0701.js",
    "revision": "fb435a93e1c2f1a3a0bff5ac034893bd"
  },
  {
    "url": "assets/js/87.57fbc65e.js",
    "revision": "2ad9ff6efb9dc91518fc54653b91665d"
  },
  {
    "url": "assets/js/88.18abdd1a.js",
    "revision": "16b3d5ed9acb82f6dc1cc9c74bc788eb"
  },
  {
    "url": "assets/js/89.d5f5df91.js",
    "revision": "7437734e81d667b5ba14b2b83acfa4c3"
  },
  {
    "url": "assets/js/9.13d458ed.js",
    "revision": "98983ed4d52578db065fd908e6b49dc6"
  },
  {
    "url": "assets/js/90.3d92174c.js",
    "revision": "177774f576c03f454f66abe3fe897364"
  },
  {
    "url": "assets/js/91.0aceeac0.js",
    "revision": "0ca94045847eaf3e2d14645816ff3696"
  },
  {
    "url": "assets/js/92.d6790074.js",
    "revision": "8be17256d073a09c3f2d516036188b3e"
  },
  {
    "url": "assets/js/93.35f564bc.js",
    "revision": "48e8635af6610104ca26c755e81af4b4"
  },
  {
    "url": "assets/js/94.dc2c5bd8.js",
    "revision": "8e0726aeae04f0acf9797cde10e955b6"
  },
  {
    "url": "assets/js/95.d0f3e796.js",
    "revision": "8f24a63b3519fdb021e5a56b7d998cf9"
  },
  {
    "url": "assets/js/96.4e35f570.js",
    "revision": "ff6085605e9a7c197a9198a567d42778"
  },
  {
    "url": "assets/js/97.8b5fd79f.js",
    "revision": "948740d5dd1bfa38a56ebc3b11196426"
  },
  {
    "url": "assets/js/98.afdf5761.js",
    "revision": "79be65aedcb7816df8b2cd6d28dc8453"
  },
  {
    "url": "assets/js/99.a724d90e.js",
    "revision": "1af9f03f64a73f1ea8a485f17ffdd0a8"
  },
  {
    "url": "assets/js/app.c2f7a3c6.js",
    "revision": "63cc9a3410745331ad51b36f7ba2e16d"
  },
  {
    "url": "deploy/eggjs.chat.html",
    "revision": "90fad2205474cc3b5257691b1405d294"
  },
  {
    "url": "deploy/index.html",
    "revision": "deefaf268b8d6d60a516ab3b677d928d"
  },
  {
    "url": "deploy/vitevue3.shop.html",
    "revision": "60b4578422e1d5dab65268f6acdb124d"
  },
  {
    "url": "deploy/vuecli.shop.html",
    "revision": "6598a5cda37ca29c22989d0844e38e15"
  },
  {
    "url": "fourthless/index.html",
    "revision": "7190ac07c298c75ffda3082f18fa4506"
  },
  {
    "url": "fourthless/w-a.html",
    "revision": "bc9f3874c88eb665b385764a6f3c68e6"
  },
  {
    "url": "fourthless/w-a/02开发前环境搭建.html",
    "revision": "d564d89fc3d981cb945decf1747b1f7b"
  },
  {
    "url": "fourthless/w-a/eggjs.商城管理员.html",
    "revision": "7c8e387b1b2b82e90d236a71d71e90ae"
  },
  {
    "url": "fourthless/w-a/eggjs.权限管理.html",
    "revision": "937eac0e7eb98afe31702efb6f667535"
  },
  {
    "url": "fourthless/w-a/eggjs.管理员板块.html",
    "revision": "c441aa0bc1e6dddcbd7ae641bb1e329e"
  },
  {
    "url": "fourthless/w-a/eggjs.给角色配置权限.html",
    "revision": "d2e8a34dcde8403f72a01209e1c45d4f"
  },
  {
    "url": "fourthless/w-a/eggjs框架开发文档.html",
    "revision": "58dc4f912b209a26cf7cf5658afe10e8"
  },
  {
    "url": "fourthless/w-a/thinkphp.修改管理员.html",
    "revision": "2cfe0a3bb4f9943b24de317b52639c3c"
  },
  {
    "url": "fourthless/w-a/thinkphp.权限管理.html",
    "revision": "4d680c5ba6bd12c94bd1abc6722af041"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员列表.html",
    "revision": "5460fe9d5a57d1418a6f3f50a054247e"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员板块.html",
    "revision": "b139b512e495409540fa41bfad8e1563"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员登录退出.html",
    "revision": "e203e161864ae37fb86764194c489a8a"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员角色管理和状态设置.html",
    "revision": "0b15a87eaa06e2a170d9d320fb788e6b"
  },
  {
    "url": "fourthless/w-a/thinkphp.角色管理.html",
    "revision": "f2c10d1c651fd9bdb743dd24ed7cd0c1"
  },
  {
    "url": "fourthless/w-a/thinkphp框架开发文档.html",
    "revision": "b28c76d2a75ad75950dfc432fb66a552"
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
    "revision": "80d07645fdc5e2b1527655b81ac8767f"
  },
  {
    "url": "pc/index.html",
    "revision": "697cb2e849e3dde270d1bf8e12ea3bcb"
  },
  {
    "url": "pc/p-a.html",
    "revision": "3bdeeb83cb52c4aefbd8ad3de15b15c4"
  },
  {
    "url": "pc/p-b.html",
    "revision": "e329a36058fe8136c7322c15ce058d7b"
  },
  {
    "url": "pc/p-c.html",
    "revision": "f0201d7a3536ed852a2263995dfd4d5b"
  },
  {
    "url": "phone/index.html",
    "revision": "9847a775011f50c06f287914ad47bace"
  },
  {
    "url": "phone/phone-a.html",
    "revision": "3da3ce2af808ffe9de21a3cf007408ab"
  },
  {
    "url": "phone/phone-b.html",
    "revision": "dcf7454af0169497efb6ae741d66dcc3"
  },
  {
    "url": "phone/phone-c.html",
    "revision": "adb3f53d2d3a4461361388daec442e3d"
  },
  {
    "url": "secondless/index.html",
    "revision": "3b1939e3d075dcfa7b3c8555e2af6025"
  },
  {
    "url": "secondless/w-a.html",
    "revision": "c9d8791b0ca528ee9fbce16146d43f2f"
  },
  {
    "url": "secondless/w-a/Date类型：时间和日期.html",
    "revision": "d2126905fea20a227f1bf5ba919f5d21"
  },
  {
    "url": "secondless/w-a/Function类型：函数进阶.html",
    "revision": "3c591b0064f017eeda3e684e0f4fdd7f"
  },
  {
    "url": "secondless/w-a/javascript函数.html",
    "revision": "e6cdf58b0ed91c8c43c8388bedf089f6"
  },
  {
    "url": "secondless/w-a/javascript基本包装类型.html",
    "revision": "ec89622b19754489834ed94adfcb6194"
  },
  {
    "url": "secondless/w-a/javascript基础.html",
    "revision": "883314520389e692f6b33d9115a8ba89"
  },
  {
    "url": "secondless/w-a/javascript对象.html",
    "revision": "73e271c62bfa2b9b05caf1597b58e753"
  },
  {
    "url": "secondless/w-a/javascript数组.html",
    "revision": "0e6dfe60b2163b95f4087926c1c3e809"
  },
  {
    "url": "secondless/w-a/javascript运算符.html",
    "revision": "6b745061c6a3152bbc0bee4c52bd3d9f"
  },
  {
    "url": "secondless/w-a/事件.html",
    "revision": "3d9dec010d8ee4648ddf67f5b3925c8f"
  },
  {
    "url": "secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html",
    "revision": "df60489b488cfcf8905fbadea092a479"
  },
  {
    "url": "secondless/w-a/函数对象数组小结.html",
    "revision": "2bd04be6a28bfa61c95b42f5520ed0ad"
  },
  {
    "url": "secondless/w-a/匿名函数和闭包.html",
    "revision": "8d868c366595688191ab0b42c1f00e92"
  },
  {
    "url": "secondless/w-a/数据Cookie、XML、JSON.html",
    "revision": "e93e0a6ad6d94738299838a91639e391"
  },
  {
    "url": "secondless/w-a/流程控制语句.html",
    "revision": "115cd373a637642f8a5243b75dc19a33"
  },
  {
    "url": "secondless/w-a/浏览器对象模型BOM及浏览器检测.html",
    "revision": "fe34d9dc611caa571bf7ce2d0cfcc52a"
  },
  {
    "url": "secondless/w-a/网页文档对象模型DOM.html",
    "revision": "c9d281b734298874ba1f2270b3a17345"
  },
  {
    "url": "secondless/w-a/表单处理及错误处理与调试.html",
    "revision": "1cad28bf74727bc8e2d961c890c1a27c"
  },
  {
    "url": "secondless/w-b.html",
    "revision": "b3596d157df7fe6cfe3cedea04bbf304"
  },
  {
    "url": "secondless/w-b/Ajax.html",
    "revision": "2f1c8f31c8385988f8230798f8104346"
  },
  {
    "url": "secondless/w-b/jQuery.html",
    "revision": "f2b400b939aa19162b2e397084622a43"
  },
  {
    "url": "secondless/w-b/jQuery事件、动画、插件.html",
    "revision": "d6791cf73f444433ad745782af417254"
  },
  {
    "url": "secondless/w-b/Node.js.html",
    "revision": "b1f9e10ec763d30c6cc2f805ac6657d0"
  },
  {
    "url": "secondless/w-b/node.js+vue.js 渲染企业网站.html",
    "revision": "20ebd3c985f93bdbc26139bde034aa38"
  },
  {
    "url": "secondless/w-b/nodejs+jQuery开发留言板.html",
    "revision": "3b33d2bff657ae480936440970036d0d"
  },
  {
    "url": "secondless/w-b/nodejs服务器端app.js文件.html",
    "revision": "45ea898c3e1d35a44d3320571d79539f"
  },
  {
    "url": "secondless/w-b/Vue.js.html",
    "revision": "c3eae1f263289e9894ba859cc3e45c91"
  },
  {
    "url": "secondless/w-b/封装js库过渡到jQuery.html",
    "revision": "bf6f33be4a20ff0ecc35c14c5e9b1a88"
  },
  {
    "url": "secondless/w-b/正则表达式.html",
    "revision": "912b10397eda75c1563a97cbc442905b"
  },
  {
    "url": "secondless/w-b/面向对象与原型.html",
    "revision": "c1393584d138e187f4f757fb5ca7230f"
  },
  {
    "url": "secondless/w-c.html",
    "revision": "20ba5361a472e32b73851ce33a3f3d6c"
  },
  {
    "url": "secondless/w-c/Egg.js.html",
    "revision": "4205aadb0ac4380426c046c66de50257"
  },
  {
    "url": "secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html",
    "revision": "70263c1217a86ece020f08e9ca7fcf13"
  },
  {
    "url": "secondless/w-c/egg.js基础总结.html",
    "revision": "630f1df881c9928dd71e5c11f617a5d9"
  },
  {
    "url": "secondless/w-c/egg.js重要知识详细文档.html",
    "revision": "58a30340b2ee4ec277af081b405f5cd7"
  },
  {
    "url": "secondless/w-c/eggjs+postman测试工具将留言写入json文件.html",
    "revision": "689a4b3561cdaa22d35a2a46719c3cd6"
  },
  {
    "url": "secondless/w-c/mysql数据库.html",
    "revision": "e30c71d0c9cac49db50fd044ca11adeb"
  },
  {
    "url": "secondless/w-c/ValParams API 说明.html",
    "revision": "1f24f30c070a0df69b1364eec4966a31"
  },
  {
    "url": "secondless/w-c/上传文件.html",
    "revision": "5887e63b8ab2e404629a8c17d26cb4ba"
  },
  {
    "url": "secondless/w-c/企业网站其它页面(非首页).html",
    "revision": "c020fd5be1175d648f82adff8d85f3fd"
  },
  {
    "url": "secondless/w-c/企业网站前端部分.html",
    "revision": "aa683e1a6d3330bd71869371b9e34f08"
  },
  {
    "url": "secondless/w-c/企业网站后台内容管理.html",
    "revision": "b3e7f5d8087c1edc158ce425a4d84660"
  },
  {
    "url": "secondless/w-c/企业网站后台栏目管理.html",
    "revision": "6dbfda524cf7aaf389996133a85be810"
  },
  {
    "url": "secondless/w-c/企业网站首页.html",
    "revision": "442c8ed624f2af054104f7fe462d7a05"
  },
  {
    "url": "secondless/w-c/响应式后台公共模版.html",
    "revision": "8318a1d2242fe78d2c035e4d2d0ab5fa"
  },
  {
    "url": "secondless/w-c/响应式后台用户留言板管理.html",
    "revision": "c547efe87e60c7bbb32f89053aca9a3e"
  },
  {
    "url": "secondless/w-c/响应式后台界面示例代码.html",
    "revision": "a80dbe9a7b49b5dc7c685558c3834ea9"
  },
  {
    "url": "secondless/w-c/响应式后台管理员登录.html",
    "revision": "4b8baf7c5ca235a46afc07f7e5615530"
  },
  {
    "url": "secondless/w-c/响应式后台管理系统.html",
    "revision": "68eaf1937b86247caec8d7520d2dc072"
  },
  {
    "url": "secondless/w-c/响应式网页布局.html",
    "revision": "f801c90c2dba59867fa7e82f2af88569"
  },
  {
    "url": "secondless/w-c/响应式网页布局指导思路.html",
    "revision": "96c14708c9ed749bb9ea942265165fd3"
  },
  {
    "url": "secondless/w-c/树形结构方法演变.html",
    "revision": "2f01b72dd99499b47a6169e1163b3042"
  },
  {
    "url": "secondless/w-c/直播功能中的用户表liveuser.html",
    "revision": "477038677b4dd7346036a7a58d501269"
  },
  {
    "url": "secondless/w-c/直播功能中的直播间表live.html",
    "revision": "17bf3cf382e3af42a652beb241398884"
  },
  {
    "url": "secondless/w-c/直播功能中的礼物表livegift.html",
    "revision": "4f73779ffe918f3b873c546d58343ac3"
  },
  {
    "url": "secondless/w-c/直播功能中的订单表liveorder.html",
    "revision": "a1b8c8f742d0a977d321c46debca7a43"
  },
  {
    "url": "secondless/w-c/网站后台管理员简单权限分配功能实现.html",
    "revision": "13b5007fd9b08e5f385c28cbf869da97"
  },
  {
    "url": "secondless/w-d.html",
    "revision": "6e3b67127fd3c6cbd551e1d983433001"
  },
  {
    "url": "secondless/w-d/SSL证书.html",
    "revision": "1b095072de742835be40eb11cf646129"
  },
  {
    "url": "secondless/w-d/网站代码上线调试.html",
    "revision": "80e5f90f4029c97e8d0bc3e153bba5e2"
  },
  {
    "url": "secondless/w-d/购买域名.html",
    "revision": "64415caae9a2e4dc1f54bff30741f264"
  },
  {
    "url": "secondless/w-d/购买服务器.html",
    "revision": "e7fb3e505fc106bd9d6176909e7defbf"
  },
  {
    "url": "thirdless/index.html",
    "revision": "f79a6ad67c4b4735903f0dc2830c658e"
  },
  {
    "url": "thirdless/w-a.html",
    "revision": "165d6e482dd8995f6dad71d9ba1b474c"
  },
  {
    "url": "thirdless/w-a/02开发前环境搭建.html",
    "revision": "e823d1a4acbd9f030c662826e14188fd"
  },
  {
    "url": "thirdless/w-a/03引入UI框架及进行全局配置.html",
    "revision": "8a77293af95e6be456f7b5df6c4ad200"
  },
  {
    "url": "thirdless/w-a/04首页开发.html",
    "revision": "a1259be328f8d88b854c8ea465bd4700"
  },
  {
    "url": "thirdless/w-a/05其它界面开发.html",
    "revision": "ea6bfe99292c4863ffed4c7030d9a902"
  },
  {
    "url": "thirdless/w-a/06数据处理.html",
    "revision": "116781d4c998de177f7d1fea358871b9"
  },
  {
    "url": "thirdless/w-a/07后端api开发.html",
    "revision": "be90e2e024c1060357ca6f14517989e3"
  },
  {
    "url": "thirdless/w-a/07后端api开发代码.html",
    "revision": "b480def08aeb50fd5b5bbdfc5f8a890b"
  },
  {
    "url": "thirdless/w-a/08数据交互和界面展示.html",
    "revision": "77beebc437340650c10ac7e80ec5dc3a"
  },
  {
    "url": "thirdless/w-b.html",
    "revision": "90968b9612d05cc7eb86922d90864578"
  },
  {
    "url": "thirdless/w-c.html",
    "revision": "8c25c7b3ce94a2f71c0b04843ce63abf"
  },
  {
    "url": "thirdless/w-d.html",
    "revision": "f2b3c5fe9f4e5dfc6541db3d0d46cca3"
  },
  {
    "url": "thirdless/w-e.html",
    "revision": "728cbc70a9debf956faebb7c132d9abd"
  },
  {
    "url": "web/answer/课程常见问题.html",
    "revision": "c1f0f4ddb05648263a5e5f32c8332a0c"
  },
  {
    "url": "web/bootstrap/index.html",
    "revision": "9cd580662d1096208a228732096d8267"
  },
  {
    "url": "web/css/index.html",
    "revision": "99e534525f8adf9a8d502367b611ecc8"
  },
  {
    "url": "web/css/封装的css样式库.html",
    "revision": "d5f31482433bca3e00d10cf5eca1201e"
  },
  {
    "url": "web/echarts/index.html",
    "revision": "1b20e183dee3affa458505cfa16d3e27"
  },
  {
    "url": "web/github/index.html",
    "revision": "d5530bec97ab0d3e4f5db84c75d5ed6c"
  },
  {
    "url": "web/IIS/index.html",
    "revision": "73b6f2aa4140cee21e8a944d4a62872c"
  },
  {
    "url": "web/index.html",
    "revision": "1a21270abc192c7960dbf3d1bbb33cb7"
  },
  {
    "url": "web/methods/uni-app专栏.html",
    "revision": "d377210c673e9bde6180bd7627b394e8"
  },
  {
    "url": "web/methods/地图相关.html",
    "revision": "a6b894bd312c0c078d5000d11c6ba6c8"
  },
  {
    "url": "web/methods/定位相关.html",
    "revision": "508f327b9a04fae250540a38ec6545c6"
  },
  {
    "url": "web/methods/实用接口.html",
    "revision": "0dc8e225de87b291226b6a8a156ec505"
  },
  {
    "url": "web/methods/树形结构数据转换.html",
    "revision": "2a55181601f2568ba32bc1df8d9305d4"
  },
  {
    "url": "web/mysql/index.html",
    "revision": "d85911fe94936440bd64b011acd75255"
  },
  {
    "url": "web/mysql/role.html",
    "revision": "6163f0761dce443abe0dd1ac2de29059"
  },
  {
    "url": "web/mysql/rolecategory.html",
    "revision": "217c1846eec199bd975878bb77985088"
  },
  {
    "url": "web/mysql/role表接口.html",
    "revision": "6a5a91b2137ed26a29e5a43e84c94fd4"
  },
  {
    "url": "web/mysql/rule表接口.html",
    "revision": "79ae664412053f9418e423976a4d8801"
  },
  {
    "url": "web/mysql/shop_manager.html",
    "revision": "93a1d5a1a56e0daa53e7bd5c79c9948e"
  },
  {
    "url": "web/mysql/shop_manager表接口.html",
    "revision": "2dc7fcfa18052b116ed55679ee9de604"
  },
  {
    "url": "web/shop/index.html",
    "revision": "d25b43913f62507a019e943ff46f1ab9"
  },
  {
    "url": "web/software/index.html",
    "revision": "66b1ab8e2111ac2341747e0460e36b9f"
  },
  {
    "url": "web/Vanta.js/index.html",
    "revision": "8ef3a2c9e1517d626c304c053ffcb63a"
  },
  {
    "url": "web/vue.js/index.html",
    "revision": "85ef52eb1c0dcf784e98ba0f8f0a123b"
  },
  {
    "url": "web/Vue3+ElementPlus/index.html",
    "revision": "fba2ef7fdbc525e13d3626150a2865ad"
  },
  {
    "url": "web/w-a.html",
    "revision": "bae744ad9fd520173b639cafd006e4b4"
  },
  {
    "url": "web/w-b.html",
    "revision": "bb40c8623131f50fea1fefa240cdcdb6"
  },
  {
    "url": "web/w-c.html",
    "revision": "29c384d4abeac18c76a505626ba33d79"
  },
  {
    "url": "开发记录.html",
    "revision": "8cffd073786eefdb39b7c19bee18b2ce"
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
