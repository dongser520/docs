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
    "revision": "ff7d792df08e6389e4943b879d6a9895"
  },
  {
    "url": "about.html",
    "revision": "57bf27702671fa44f601b82fb3f06ef2"
  },
  {
    "url": "about/index.html",
    "revision": "d0e4e6e44e8294b25076a7c96df5753f"
  },
  {
    "url": "aboutless.html",
    "revision": "af222d3c53f30c5ec9a7208acb9d1a8e"
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
    "url": "assets/js/100.f2b6a158.js",
    "revision": "b481b00dd60d9b6c2b665656476406b2"
  },
  {
    "url": "assets/js/101.369d101c.js",
    "revision": "eb47d84ca5ad97b6fc65a898cd03249d"
  },
  {
    "url": "assets/js/102.85eb85d7.js",
    "revision": "30d8b199f854a4c88a56afe2b06e9a84"
  },
  {
    "url": "assets/js/103.ea99a3e0.js",
    "revision": "7a061472319ece8802b779279b98211a"
  },
  {
    "url": "assets/js/104.5c13034d.js",
    "revision": "6be8d1d783d1591218d5a229768d616a"
  },
  {
    "url": "assets/js/105.2453edb8.js",
    "revision": "23be6aa33a84705a24b0acc8b185de81"
  },
  {
    "url": "assets/js/106.89229945.js",
    "revision": "a311c97b02e0d3b2ef0817c5b1de640e"
  },
  {
    "url": "assets/js/107.f36e7629.js",
    "revision": "f19fc8a28ab8f601a12ce54208c00696"
  },
  {
    "url": "assets/js/108.48e4b677.js",
    "revision": "6340c2b1fc0024d8bfd322c0b28a5b23"
  },
  {
    "url": "assets/js/109.ebd3810c.js",
    "revision": "f30be74a19607c9effdb8bfcaea27c6e"
  },
  {
    "url": "assets/js/11.934eb133.js",
    "revision": "0cbfb5a79c209befa057aecc68c6e027"
  },
  {
    "url": "assets/js/110.e2284673.js",
    "revision": "c7a23f8ff5d516132e71bf4bc096ff07"
  },
  {
    "url": "assets/js/111.060668ad.js",
    "revision": "b142c9d3cee6b9ae055b2c2d983c49ba"
  },
  {
    "url": "assets/js/112.e99a1270.js",
    "revision": "a60e5b2dedf8d73f8d3c5f553bfeb835"
  },
  {
    "url": "assets/js/113.766a1013.js",
    "revision": "441828cabfd9398ccf3fb6b40672ba38"
  },
  {
    "url": "assets/js/114.716e54f5.js",
    "revision": "0b4139872c09df6b2dd335994001054f"
  },
  {
    "url": "assets/js/115.55475595.js",
    "revision": "b89dc1187070f040107166bbaceefe63"
  },
  {
    "url": "assets/js/116.d15f7419.js",
    "revision": "86e3951378fff9096ee81506c832c7d0"
  },
  {
    "url": "assets/js/117.07a846c9.js",
    "revision": "9c3e2adc47378ed1d920e3cdc08ef846"
  },
  {
    "url": "assets/js/118.779f9171.js",
    "revision": "c6d445bc3f9ca00d46c5541a83ff2c45"
  },
  {
    "url": "assets/js/119.71cf9ced.js",
    "revision": "87289cef63d0f841a928647f8d256545"
  },
  {
    "url": "assets/js/12.93af32fc.js",
    "revision": "b10bcb8520eafb6515a29ba7be288e6e"
  },
  {
    "url": "assets/js/120.880351a7.js",
    "revision": "f7c0ab0200aaadb9429989dcc1c9f342"
  },
  {
    "url": "assets/js/121.6dcfdc30.js",
    "revision": "b144804bafe70f76c96cd68a86d0d510"
  },
  {
    "url": "assets/js/122.100c99d4.js",
    "revision": "875c09b38facd9cbeae2bf61f441f1ca"
  },
  {
    "url": "assets/js/123.bfed9a05.js",
    "revision": "59c3970a8d20b6de4fd90c8ab2039247"
  },
  {
    "url": "assets/js/124.32b056d3.js",
    "revision": "32d2af90d7d1db83c5f4978a2da3f54f"
  },
  {
    "url": "assets/js/125.3705ba74.js",
    "revision": "e104f92c82e129e07374a2f0e04f5646"
  },
  {
    "url": "assets/js/126.cb20c4cb.js",
    "revision": "25f781f8df31763924cd4eba1b669618"
  },
  {
    "url": "assets/js/127.8fc67556.js",
    "revision": "8e86f1e963afb08a6b9cea07a54a1e6c"
  },
  {
    "url": "assets/js/128.04ffe0ca.js",
    "revision": "648a208dcac2e719cb7791b72e84b737"
  },
  {
    "url": "assets/js/129.fcc01964.js",
    "revision": "e9b7f310e8060c393cc81951ab66aa7c"
  },
  {
    "url": "assets/js/13.50c9a147.js",
    "revision": "bed37f54cddae07ff1e84a7d8953e36c"
  },
  {
    "url": "assets/js/130.4121f254.js",
    "revision": "f4a60952ca12eb7fd94e5852cc2b77b3"
  },
  {
    "url": "assets/js/131.8a123c6f.js",
    "revision": "04e9ff28a872b05a1e237468d007850b"
  },
  {
    "url": "assets/js/132.092e3d05.js",
    "revision": "0e66e726dd322bb318e18559adc43255"
  },
  {
    "url": "assets/js/133.1a2a2227.js",
    "revision": "a83e2bc0d48b733ce725cafc3b15e89b"
  },
  {
    "url": "assets/js/134.af42c283.js",
    "revision": "3cabde9855a9abf95817fba3cf38dff7"
  },
  {
    "url": "assets/js/135.9d2a4d9c.js",
    "revision": "e8a1df21565e1325f2422a15e0f2d924"
  },
  {
    "url": "assets/js/14.0ca13a9a.js",
    "revision": "9fe78dd7cb829b1e7294921bd6982e22"
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
    "url": "assets/js/18.117a998d.js",
    "revision": "129ed265eeaef08564540077cf552ef0"
  },
  {
    "url": "assets/js/19.93015f1c.js",
    "revision": "8c15c7f6e98c47260293bfc2cf97ee49"
  },
  {
    "url": "assets/js/2.6281e0bb.js",
    "revision": "6953100b4156b74d48f76069058a12a9"
  },
  {
    "url": "assets/js/20.d51e6f5f.js",
    "revision": "df442857a3aa763546e4cbb999a53840"
  },
  {
    "url": "assets/js/21.fd9a1f9f.js",
    "revision": "8dc887c18a2883d6556d69e772156f45"
  },
  {
    "url": "assets/js/22.7cd6f513.js",
    "revision": "455c5c168eac1aae59c207a71ce9bbbe"
  },
  {
    "url": "assets/js/23.fce7516d.js",
    "revision": "6ff6ab61243d6a7ab5b3c98e3237b6c7"
  },
  {
    "url": "assets/js/24.14b4e6f7.js",
    "revision": "0b902c0b9fd2287cebe9b1c90294641f"
  },
  {
    "url": "assets/js/25.1fc32f42.js",
    "revision": "a27c122e507bf0fe1cd5191d1cd84806"
  },
  {
    "url": "assets/js/26.f40c0778.js",
    "revision": "6c9639b336c63db4d0eba7472f41ebad"
  },
  {
    "url": "assets/js/27.20c8ff4a.js",
    "revision": "73b064d09cb5dc81227dd46fa35611a4"
  },
  {
    "url": "assets/js/28.e87043d1.js",
    "revision": "8849b6940c5a910fde4641afc76fec56"
  },
  {
    "url": "assets/js/29.62d973ae.js",
    "revision": "6c45ef9afe617b0a2683b43086d0bcdc"
  },
  {
    "url": "assets/js/3.e6827fa8.js",
    "revision": "f1ffa92e22c7370c76abfc2cdb906d17"
  },
  {
    "url": "assets/js/30.7e5af57f.js",
    "revision": "c43dfc873f05558ea91756c38b60fa4f"
  },
  {
    "url": "assets/js/31.22aa114f.js",
    "revision": "9cb2c49a1a7daef6d30dab9858cb5d4e"
  },
  {
    "url": "assets/js/32.0e67050c.js",
    "revision": "4b4bdfd71d46f049f434e1a2f9ff9e68"
  },
  {
    "url": "assets/js/33.2ac8d75e.js",
    "revision": "6a0e26872ad103e7436c190c863a913b"
  },
  {
    "url": "assets/js/34.60f32414.js",
    "revision": "698e03e55a3348370cd7ee121854ea9d"
  },
  {
    "url": "assets/js/35.3b80d7fc.js",
    "revision": "7ea146cff85611e5c8c4636c905d2c85"
  },
  {
    "url": "assets/js/36.d22334c2.js",
    "revision": "5204f941f3b7d4575bfaeb78aca5b667"
  },
  {
    "url": "assets/js/37.df94c6f0.js",
    "revision": "7682ac89270a645e1d206085090a1919"
  },
  {
    "url": "assets/js/38.4e3d59e1.js",
    "revision": "b0563a0b4534f4f53337dab322b6ae51"
  },
  {
    "url": "assets/js/39.700ea649.js",
    "revision": "87dce214aa63b865929d51cb5fc529a7"
  },
  {
    "url": "assets/js/4.e8dea7ba.js",
    "revision": "0e74b840167869b0de3123b8cfac5108"
  },
  {
    "url": "assets/js/40.27a70329.js",
    "revision": "cfb2cbcfd6ac6ca8466d0df8064c71bd"
  },
  {
    "url": "assets/js/41.dd7afcf2.js",
    "revision": "e479ed3d2fd6ff0eb115d21e043ffb33"
  },
  {
    "url": "assets/js/42.fb72ed37.js",
    "revision": "cc6da854d97d03b8260fcb82200a3f8c"
  },
  {
    "url": "assets/js/43.dfc7a09d.js",
    "revision": "808e57b3d89ebf3c102796371b83e138"
  },
  {
    "url": "assets/js/44.74b91c29.js",
    "revision": "569bfb08609a5b26f1e065bb4677203e"
  },
  {
    "url": "assets/js/45.a0cfc113.js",
    "revision": "5f51fac9614437c0cf292f7b3eacff93"
  },
  {
    "url": "assets/js/46.ba44429a.js",
    "revision": "247f87e16bacc4de16186155e7410acf"
  },
  {
    "url": "assets/js/47.8f9c385e.js",
    "revision": "2dc5f80c408623eac620d26f5f0eba6a"
  },
  {
    "url": "assets/js/48.30a8f289.js",
    "revision": "b860b6b0fb48edae0a42d539eb21b787"
  },
  {
    "url": "assets/js/49.17cf5b27.js",
    "revision": "8ba4cb8486c53d92b191aadaf5184b65"
  },
  {
    "url": "assets/js/5.3e24e7be.js",
    "revision": "bb8330fc3b00684c0b46c0c7ade9634a"
  },
  {
    "url": "assets/js/50.a103a2a3.js",
    "revision": "8966af2c75d4f70b9cc6b7be2dc89144"
  },
  {
    "url": "assets/js/51.d5bce5f5.js",
    "revision": "93a4323b9ae748e807e45e6468a5e6bf"
  },
  {
    "url": "assets/js/52.f50b8b87.js",
    "revision": "96d1237956287d731c8195afe507018d"
  },
  {
    "url": "assets/js/53.ecaa1384.js",
    "revision": "8f39e6f5ac0c75577c95775fddc6f948"
  },
  {
    "url": "assets/js/54.ce3369ec.js",
    "revision": "8d753cd18f9883b23925287d95d401bb"
  },
  {
    "url": "assets/js/55.443e5b09.js",
    "revision": "c7ae3170eae0350a3c8348b953f2bd2c"
  },
  {
    "url": "assets/js/56.fd885877.js",
    "revision": "dabc0f92524af9aa74c293e97dbcffe8"
  },
  {
    "url": "assets/js/57.3e7ae6e9.js",
    "revision": "7f6342bc50ff746e7e53a3c1c1848d66"
  },
  {
    "url": "assets/js/58.52065eae.js",
    "revision": "eeff43fca5f626ef0d9d49d12162f97f"
  },
  {
    "url": "assets/js/59.f8c5538c.js",
    "revision": "b7b1a77e738c9e19026e4d0a6484eb0b"
  },
  {
    "url": "assets/js/6.ca2525e2.js",
    "revision": "f26b99a11274e34a1a8df09422012df8"
  },
  {
    "url": "assets/js/60.040f24fd.js",
    "revision": "ee3856b7a156c9eefac74ab0b23f57de"
  },
  {
    "url": "assets/js/61.787db482.js",
    "revision": "7cc1a6c74f359da7e182fb5936edc5a9"
  },
  {
    "url": "assets/js/62.4e12fd4a.js",
    "revision": "bc3b810fed8228f9723baa50da59346a"
  },
  {
    "url": "assets/js/63.5257159f.js",
    "revision": "3fc623e7cefcdde08189d0fa418118e4"
  },
  {
    "url": "assets/js/64.562ae706.js",
    "revision": "afc7287dd4e7722ac4e38fd3ba70368f"
  },
  {
    "url": "assets/js/65.84a39cbe.js",
    "revision": "da8f06a7cdab9fab299c542fc3d81762"
  },
  {
    "url": "assets/js/66.27bb8596.js",
    "revision": "498fe1874276bf758b5b5117dddb7674"
  },
  {
    "url": "assets/js/67.9e40bf0e.js",
    "revision": "8dce961785085e3a4bd6f5349437469d"
  },
  {
    "url": "assets/js/68.1e786b71.js",
    "revision": "ea5980f9e27c1f9970d5ad82baa5e901"
  },
  {
    "url": "assets/js/69.031b7920.js",
    "revision": "77c5682a7bcd2c61bb4818ec971e095c"
  },
  {
    "url": "assets/js/7.cdc710f7.js",
    "revision": "7473b0e972f770c1bdf3633a0c9ada6e"
  },
  {
    "url": "assets/js/70.4e9535a0.js",
    "revision": "c2a7bf4bcec35c75b46fe2e0fab4b378"
  },
  {
    "url": "assets/js/71.1446b25f.js",
    "revision": "3cebb5dcd4f12553d46c8d73ead8a850"
  },
  {
    "url": "assets/js/72.0a1737a7.js",
    "revision": "06fd655435f55355f68eb364fd0df93a"
  },
  {
    "url": "assets/js/73.1f69d795.js",
    "revision": "83257707bf2df34de4e55e42529768bc"
  },
  {
    "url": "assets/js/74.d5c4795e.js",
    "revision": "b220a8daabcd2c07c1c88370e0a3062d"
  },
  {
    "url": "assets/js/75.6c2bdb37.js",
    "revision": "75bd0bb54d79571787ba0094ad7c2c10"
  },
  {
    "url": "assets/js/76.1922023e.js",
    "revision": "a33d5d7e8ad46f9618e12815a614f769"
  },
  {
    "url": "assets/js/77.1ebbab40.js",
    "revision": "bdcf1ac03898fdbc3e3e3221572b4525"
  },
  {
    "url": "assets/js/78.d7915096.js",
    "revision": "ad977d3e47bfa8eb4638ecd54a9efe32"
  },
  {
    "url": "assets/js/79.f2613861.js",
    "revision": "cc20fc15888380925f900a76b6f22371"
  },
  {
    "url": "assets/js/8.557fd97b.js",
    "revision": "a6d766561dc93b9606a8cb615d3f5548"
  },
  {
    "url": "assets/js/80.ca5f9536.js",
    "revision": "314fa2eddc01531ab2e4e267e055f84f"
  },
  {
    "url": "assets/js/81.1458b6a0.js",
    "revision": "5e40404b3e2a92b924bd1a14e0ac5f5d"
  },
  {
    "url": "assets/js/82.73ff776a.js",
    "revision": "8f1c81347a8cf14579032260fa5885a3"
  },
  {
    "url": "assets/js/83.596b8508.js",
    "revision": "0e706a53b77e37957efec4097f791094"
  },
  {
    "url": "assets/js/84.52c5068e.js",
    "revision": "03c4fc29daeff313d388bd74b37d85d8"
  },
  {
    "url": "assets/js/85.4e306b14.js",
    "revision": "f2a1819fd3dc4ffa34f9e879a9ebd54c"
  },
  {
    "url": "assets/js/86.e93ca615.js",
    "revision": "3f523a62528fe9dbfd39c8fa0d7f1435"
  },
  {
    "url": "assets/js/87.45fb6756.js",
    "revision": "58e962da4294b63dda2f8acf7eaec428"
  },
  {
    "url": "assets/js/88.2e64c4de.js",
    "revision": "1003c83e3ac6928179df30b64004884a"
  },
  {
    "url": "assets/js/89.9c84e776.js",
    "revision": "edf3b6df8e3999c39bcb1fba79a261d5"
  },
  {
    "url": "assets/js/9.13d458ed.js",
    "revision": "98983ed4d52578db065fd908e6b49dc6"
  },
  {
    "url": "assets/js/90.02f410d6.js",
    "revision": "f2da331944fca36f6e4a7ff2c6c933f9"
  },
  {
    "url": "assets/js/91.dca499d3.js",
    "revision": "b20aea6f4cc2e53ac2c04a4ae1e88485"
  },
  {
    "url": "assets/js/92.41c524c2.js",
    "revision": "3224d391e13610eee516811f2fa40905"
  },
  {
    "url": "assets/js/93.eb327128.js",
    "revision": "517b63066274a44b1c5dfef6b2da535b"
  },
  {
    "url": "assets/js/94.754013ac.js",
    "revision": "e7492fc11e203412f82635226ad564cf"
  },
  {
    "url": "assets/js/95.cab663fb.js",
    "revision": "fd6d07264d9931c3d736d463d1635cba"
  },
  {
    "url": "assets/js/96.e949503c.js",
    "revision": "285c5888d366b15eaa3987bfb9542e3b"
  },
  {
    "url": "assets/js/97.ecbac9d5.js",
    "revision": "21aec116c246c1e80243b79f50b33df1"
  },
  {
    "url": "assets/js/98.c4ab4e5b.js",
    "revision": "bf4ae762ee69f35321a5df77d33ba7a2"
  },
  {
    "url": "assets/js/99.9d7896aa.js",
    "revision": "c423c24a9e6ec88b3b796d4babfb7d4c"
  },
  {
    "url": "assets/js/app.44eaf35a.js",
    "revision": "da76f2c2b9d51bf867a750bc528d17e9"
  },
  {
    "url": "deploy/eggjs.chat.html",
    "revision": "7a775ba63c7f3150d967177f148c5a47"
  },
  {
    "url": "deploy/index.html",
    "revision": "706c210a60fc895653262d715acca254"
  },
  {
    "url": "deploy/vitevue3.shop.html",
    "revision": "5f56a079dc7a8babfa950ca7bbd30465"
  },
  {
    "url": "deploy/vuecli.shop.html",
    "revision": "b21552c13cdb3aaa3a2109bb745af091"
  },
  {
    "url": "fourthless/index.html",
    "revision": "733f71aa792689610e7b48ce9cd7fa49"
  },
  {
    "url": "fourthless/w-a.html",
    "revision": "4dd96a341b1ee09ad7829e6c06643551"
  },
  {
    "url": "fourthless/w-a/02开发前环境搭建.html",
    "revision": "18e6f5c4b4ef2a2efd5d30eedde0c313"
  },
  {
    "url": "fourthless/w-a/eggjs框架开发文档.html",
    "revision": "5abcfb77c486b95022ef2a17f4a99c06"
  },
  {
    "url": "fourthless/w-a/thinkphp.修改管理员.html",
    "revision": "72082f4aa783fb82c8148e28d5121368"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员板块.html",
    "revision": "3267b7b48335104c7b94785101bab339"
  },
  {
    "url": "fourthless/w-a/thinkphp框架开发文档.html",
    "revision": "a39a181755b87a2506b95d34193f0f5b"
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
    "revision": "6633d07129cc8b685692450119cb6e96"
  },
  {
    "url": "pc/index.html",
    "revision": "6b9edefa3c740379b8551a9618d0e7fc"
  },
  {
    "url": "pc/p-a.html",
    "revision": "b225f9f28560083988aaa76737bb5473"
  },
  {
    "url": "pc/p-b.html",
    "revision": "b71df5ec4d64ef52897228202b8464a8"
  },
  {
    "url": "pc/p-c.html",
    "revision": "19ce6f39093d9030d72f5b55184c3c9b"
  },
  {
    "url": "phone/index.html",
    "revision": "77d319dcdc492bb12ce525ceebf7be5e"
  },
  {
    "url": "phone/phone-a.html",
    "revision": "eb4e62261d7f941bf4662cc38cccf247"
  },
  {
    "url": "phone/phone-b.html",
    "revision": "b8b44d637fec94ac3abf9f21c8ca08a5"
  },
  {
    "url": "phone/phone-c.html",
    "revision": "58f0b2381c2a8400baba59b952fde8a3"
  },
  {
    "url": "secondless/index.html",
    "revision": "e0b1845ffa21b877ea71a2658db63390"
  },
  {
    "url": "secondless/w-a.html",
    "revision": "356e817d8fef49215da52149af2a7485"
  },
  {
    "url": "secondless/w-a/Date类型：时间和日期.html",
    "revision": "1c3739ee71944ca95f1da3af78e2d35a"
  },
  {
    "url": "secondless/w-a/Function类型：函数进阶.html",
    "revision": "121991a6dbbd79f1581d12a1f4ea0240"
  },
  {
    "url": "secondless/w-a/javascript函数.html",
    "revision": "a935ba893ab18d458a95b0b1749f009f"
  },
  {
    "url": "secondless/w-a/javascript基本包装类型.html",
    "revision": "86324ed3ca18916658455dd97c30af80"
  },
  {
    "url": "secondless/w-a/javascript基础.html",
    "revision": "192e744066cb51df4e552044da27729d"
  },
  {
    "url": "secondless/w-a/javascript对象.html",
    "revision": "0338dcc2c1e2534ffbbc0b064e74a907"
  },
  {
    "url": "secondless/w-a/javascript数组.html",
    "revision": "4548849ad269ad9504a4bef76a6a6a72"
  },
  {
    "url": "secondless/w-a/javascript运算符.html",
    "revision": "ba95bfbdcb7fbe5c18cb168b5bfd01c5"
  },
  {
    "url": "secondless/w-a/事件.html",
    "revision": "f51ac51961697aeb09a36b2d686789d8"
  },
  {
    "url": "secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html",
    "revision": "dfeb22ce141dff62fde9f691942fc320"
  },
  {
    "url": "secondless/w-a/函数对象数组小结.html",
    "revision": "2561dedc8e6c820322d376ab8c29c891"
  },
  {
    "url": "secondless/w-a/匿名函数和闭包.html",
    "revision": "ef8bb7f91a60eafa726cf06bcb4b8c0f"
  },
  {
    "url": "secondless/w-a/数据Cookie、XML、JSON.html",
    "revision": "7ee18943f1e81a8af0ea203ffe7659e8"
  },
  {
    "url": "secondless/w-a/流程控制语句.html",
    "revision": "ea82949f37274eccb75e60fac665d29c"
  },
  {
    "url": "secondless/w-a/浏览器对象模型BOM及浏览器检测.html",
    "revision": "38f134abac418fec93bfd8f48b8c4f1f"
  },
  {
    "url": "secondless/w-a/网页文档对象模型DOM.html",
    "revision": "a8effaa2c560e715dbc94beadd06f94a"
  },
  {
    "url": "secondless/w-a/表单处理及错误处理与调试.html",
    "revision": "42dc718ce88c92fea2b31aec9cfe8eba"
  },
  {
    "url": "secondless/w-b.html",
    "revision": "a0b6d1542eb50b3f0acb7ea5bdfbfcd9"
  },
  {
    "url": "secondless/w-b/Ajax.html",
    "revision": "2017fdb302817d8fad499e1fd7fda0c5"
  },
  {
    "url": "secondless/w-b/jQuery.html",
    "revision": "92b1843a93a4b335b544e9fd09f71af5"
  },
  {
    "url": "secondless/w-b/jQuery事件、动画、插件.html",
    "revision": "9f682abd1cd31678cc1337d459151708"
  },
  {
    "url": "secondless/w-b/Node.js.html",
    "revision": "501bd11135f6a8fde48fd3a5bd5f77c3"
  },
  {
    "url": "secondless/w-b/node.js+vue.js 渲染企业网站.html",
    "revision": "28cd4e426504565be1a64981e0582ebe"
  },
  {
    "url": "secondless/w-b/nodejs+jQuery开发留言板.html",
    "revision": "126a57233c8e19f32328597b010adbc1"
  },
  {
    "url": "secondless/w-b/nodejs服务器端app.js文件.html",
    "revision": "e1b6255b90b74a0f095445cb65bf8e4b"
  },
  {
    "url": "secondless/w-b/Vue.js.html",
    "revision": "012714e4b7f951af2482f67af6aebcbe"
  },
  {
    "url": "secondless/w-b/封装js库过渡到jQuery.html",
    "revision": "21a5bbf84ce88e25d420c9de89ceb4e8"
  },
  {
    "url": "secondless/w-b/正则表达式.html",
    "revision": "bcea0d33b28a50ba5eee8bcf4528bd65"
  },
  {
    "url": "secondless/w-b/面向对象与原型.html",
    "revision": "597269dc8b11a801bd0f05a33e4ee96a"
  },
  {
    "url": "secondless/w-c.html",
    "revision": "f78dc9f07858da772d3b9695a0e3b2b4"
  },
  {
    "url": "secondless/w-c/Egg.js.html",
    "revision": "7a9c43083ca2b8da834e66634e5774da"
  },
  {
    "url": "secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html",
    "revision": "1d0906090e871b2dca04ec9e093f0152"
  },
  {
    "url": "secondless/w-c/egg.js基础总结.html",
    "revision": "a9f23a01da60bf19ce19ac3fd0bc9ff8"
  },
  {
    "url": "secondless/w-c/egg.js重要知识详细文档.html",
    "revision": "35c1f6b747de816874cf4d2bc1eb2cc0"
  },
  {
    "url": "secondless/w-c/eggjs+postman测试工具将留言写入json文件.html",
    "revision": "a0a41d21a655f4ad54e156b7e65735b3"
  },
  {
    "url": "secondless/w-c/mysql数据库.html",
    "revision": "2352a4e5fab8d31221f68d664f3b11fa"
  },
  {
    "url": "secondless/w-c/ValParams API 说明.html",
    "revision": "c558e96992ca9507686ae92116b535d6"
  },
  {
    "url": "secondless/w-c/上传文件.html",
    "revision": "6d6b190bda32117f5ea1f621a9d1da86"
  },
  {
    "url": "secondless/w-c/企业网站其它页面(非首页).html",
    "revision": "d64caf3eb84db04f030125cc3d7f6011"
  },
  {
    "url": "secondless/w-c/企业网站前端部分.html",
    "revision": "eacd24654ce23c461efb1c6e0617d83a"
  },
  {
    "url": "secondless/w-c/企业网站后台内容管理.html",
    "revision": "be60423a2da1c78a8bb39a04e044ea58"
  },
  {
    "url": "secondless/w-c/企业网站后台栏目管理.html",
    "revision": "c31aa8c5943a96fc7aeae4fc713b4b96"
  },
  {
    "url": "secondless/w-c/企业网站首页.html",
    "revision": "a7228ebfab5438bbb14f8eb4faa0d10c"
  },
  {
    "url": "secondless/w-c/响应式后台公共模版.html",
    "revision": "b86aaa3ce098c34b09a087fec8bcef37"
  },
  {
    "url": "secondless/w-c/响应式后台用户留言板管理.html",
    "revision": "ce9c8cea1c27bbed46e00b6406bf494f"
  },
  {
    "url": "secondless/w-c/响应式后台界面示例代码.html",
    "revision": "e8f78b5a3d0d71cc0ee243ef043575f4"
  },
  {
    "url": "secondless/w-c/响应式后台管理员登录.html",
    "revision": "a4763f81e66906fe2a753beb0c11011f"
  },
  {
    "url": "secondless/w-c/响应式后台管理系统.html",
    "revision": "b53d0f0560fa90c6d6529bffc2d037eb"
  },
  {
    "url": "secondless/w-c/响应式网页布局.html",
    "revision": "a22dfe4d0488b42537f70ecefc166e8d"
  },
  {
    "url": "secondless/w-c/响应式网页布局指导思路.html",
    "revision": "69a92e6c7b87d2371cab1b8826be9d0d"
  },
  {
    "url": "secondless/w-c/树形结构方法演变.html",
    "revision": "9c1cf9986950be607a5d4f2dec1a70c9"
  },
  {
    "url": "secondless/w-c/直播功能中的用户表liveuser.html",
    "revision": "b238426641299a801272483709593ead"
  },
  {
    "url": "secondless/w-c/直播功能中的直播间表live.html",
    "revision": "371dd63a0d09f51c12bb82abff185dda"
  },
  {
    "url": "secondless/w-c/直播功能中的礼物表livegift.html",
    "revision": "5ebd2cb0d1483f1939425428ab164805"
  },
  {
    "url": "secondless/w-c/直播功能中的订单表liveorder.html",
    "revision": "936b68c869103078e5bc52027b993386"
  },
  {
    "url": "secondless/w-c/网站后台管理员简单权限分配功能实现.html",
    "revision": "9b4817b2eae2a7f96365249c0cb8e0ba"
  },
  {
    "url": "secondless/w-d.html",
    "revision": "ad9c85f95677947b43d778abbbc03219"
  },
  {
    "url": "secondless/w-d/SSL证书.html",
    "revision": "557568be520763dc54ebf2eda6f03c13"
  },
  {
    "url": "secondless/w-d/网站代码上线调试.html",
    "revision": "d066269355b8ad179fbc227b3e05ec40"
  },
  {
    "url": "secondless/w-d/购买域名.html",
    "revision": "b1214f1c3846e653a466ff3e6cb04a40"
  },
  {
    "url": "secondless/w-d/购买服务器.html",
    "revision": "43eb9f08889bbb4ebbc3051d4469c307"
  },
  {
    "url": "thirdless/index.html",
    "revision": "2a080cf0194f47965098d800cc14bd67"
  },
  {
    "url": "thirdless/w-a.html",
    "revision": "8932e0d2d17a2547279fee2569c8ecaf"
  },
  {
    "url": "thirdless/w-a/02开发前环境搭建.html",
    "revision": "6b7f543f9e3fe764e77fdec6648f7b2e"
  },
  {
    "url": "thirdless/w-a/03引入UI框架及进行全局配置.html",
    "revision": "5dbaee5a78346d5ceca6de4d6f1d3402"
  },
  {
    "url": "thirdless/w-a/04首页开发.html",
    "revision": "a8e24430e7d69c0d11ba4578ee483b5c"
  },
  {
    "url": "thirdless/w-a/05其它界面开发.html",
    "revision": "e6df8be8e73b0838e36253fae29c3dd5"
  },
  {
    "url": "thirdless/w-a/06数据处理.html",
    "revision": "186d92760f53c46acac51b57d18a611e"
  },
  {
    "url": "thirdless/w-a/07后端api开发.html",
    "revision": "75114929f5377ef12a689faaae3ca169"
  },
  {
    "url": "thirdless/w-a/07后端api开发代码.html",
    "revision": "b6a605b215c61ce2975894282fec93c3"
  },
  {
    "url": "thirdless/w-a/08数据交互和界面展示.html",
    "revision": "610040dafa9f5e59ac8d49d67e1acd2e"
  },
  {
    "url": "thirdless/w-b.html",
    "revision": "2872486afaa44ae7ef2fcefcf861e224"
  },
  {
    "url": "thirdless/w-c.html",
    "revision": "7bc939984e0927552fea6d930f0a2859"
  },
  {
    "url": "thirdless/w-d.html",
    "revision": "f93c0b0dc14c6a8b41672cb23f9b3847"
  },
  {
    "url": "thirdless/w-e.html",
    "revision": "746baf6231bab34ce11638b6e702a094"
  },
  {
    "url": "web/answer/课程常见问题.html",
    "revision": "568df307043883e4911fcc02767ba5e6"
  },
  {
    "url": "web/bootstrap/index.html",
    "revision": "f3458951c951b77ce17a954976946ff8"
  },
  {
    "url": "web/css/index.html",
    "revision": "e683160680f207e71d7235d87f57d79d"
  },
  {
    "url": "web/css/封装的css样式库.html",
    "revision": "48e09f90762072d979de6ffd80b36f41"
  },
  {
    "url": "web/echarts/index.html",
    "revision": "a57d679f7eb41492420d42c87d2fccf8"
  },
  {
    "url": "web/github/index.html",
    "revision": "4f8629480a9448b77a5ff0b3a584a9fd"
  },
  {
    "url": "web/IIS/index.html",
    "revision": "8768ddd7e2bb26683b921cac0f210ee2"
  },
  {
    "url": "web/index.html",
    "revision": "1d67f5b0df7c4ea226b146328d0a62c8"
  },
  {
    "url": "web/methods/地图相关.html",
    "revision": "ae7688726754e109eeeee98c886768c7"
  },
  {
    "url": "web/methods/定位相关.html",
    "revision": "c7dcea382ec69ee22dcf6c99b1d80bf2"
  },
  {
    "url": "web/methods/实用接口.html",
    "revision": "4fecea84424f2daf66ad6f9c30438dab"
  },
  {
    "url": "web/mysql/index.html",
    "revision": "2b353e625b4bde0c93382439301c5818"
  },
  {
    "url": "web/mysql/shop_manager.html",
    "revision": "2db67334626dcccc88762cab05c7d7ed"
  },
  {
    "url": "web/mysql/shop_manager表接口.html",
    "revision": "cc7b3bfdca6fa416310ff2a04286a4f1"
  },
  {
    "url": "web/shop/index.html",
    "revision": "ae55f87ddf11e9932e7f404303deeae8"
  },
  {
    "url": "web/software/index.html",
    "revision": "30b7d21152b8a05552099b7733c67d93"
  },
  {
    "url": "web/Vanta.js/index.html",
    "revision": "2bd94713d1342943cef93ccaad4ab095"
  },
  {
    "url": "web/vue.js/index.html",
    "revision": "d13f8ea37f5f0bdf17297f095ff9fdb0"
  },
  {
    "url": "web/Vue3+ElementPlus/index.html",
    "revision": "9fa0f01c0aaa98aca51b1bb34cac5972"
  },
  {
    "url": "web/w-a.html",
    "revision": "0999599bd1d2284636b240936cb1d3c6"
  },
  {
    "url": "web/w-b.html",
    "revision": "9eac8b130a3178fd4ddca4a539605e29"
  },
  {
    "url": "web/w-c.html",
    "revision": "f0b671306db3b45b284964a8da4827e9"
  },
  {
    "url": "开发记录.html",
    "revision": "bd6b1330bb8c95c0f5ceb2b9aeb29313"
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
