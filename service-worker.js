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
    "revision": "a4b1dfe71c5c42aaa56fea2a7bd1b270"
  },
  {
    "url": "about.html",
    "revision": "5b540792e75b13f609fd4c9ce754c36e"
  },
  {
    "url": "about/index.html",
    "revision": "5b1c9be67c67c2c76342fdbf68c77cb5"
  },
  {
    "url": "aboutless.html",
    "revision": "534b8e00189060b10a1ed570c05ee7df"
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
    "url": "assets/js/100.d1ca4e92.js",
    "revision": "6d1a14b8fa830e361c42a98f5b2b181c"
  },
  {
    "url": "assets/js/101.f37a6fe0.js",
    "revision": "947beb00cd3690dbf2bf8df62504d73a"
  },
  {
    "url": "assets/js/102.3dc09fc2.js",
    "revision": "299810d059e9898d30a438fcc4fc4536"
  },
  {
    "url": "assets/js/103.6259fbaf.js",
    "revision": "27b41acdef1d72fa9e6ed62c761e6fa4"
  },
  {
    "url": "assets/js/104.7df4a333.js",
    "revision": "6afb4b4b1b206d3e45d84341f5f49b01"
  },
  {
    "url": "assets/js/105.ab501cc9.js",
    "revision": "45a6092b4945d0642fe71395a562e581"
  },
  {
    "url": "assets/js/106.044be8d0.js",
    "revision": "bb5fb466603d8cdfd68c1056c9d63a9b"
  },
  {
    "url": "assets/js/107.a931b7a3.js",
    "revision": "b7a0899f308b605d1b0fbf3750158c0a"
  },
  {
    "url": "assets/js/108.a7c76138.js",
    "revision": "5942435d4eb43cb7ef00bd0418bf478d"
  },
  {
    "url": "assets/js/109.4a3fbbb8.js",
    "revision": "2182e07c13b6097cbe5121d0fa87cbab"
  },
  {
    "url": "assets/js/11.5c285c6e.js",
    "revision": "985e98253ac8e87ccc39f89bad7007c9"
  },
  {
    "url": "assets/js/110.3d1c162d.js",
    "revision": "0a262f545a2af5f51573287da3f57c8c"
  },
  {
    "url": "assets/js/111.6f9db28b.js",
    "revision": "6ea4edbf395698bdc67d753527de578e"
  },
  {
    "url": "assets/js/112.ee33125c.js",
    "revision": "6141100b8d1db995b47a0c4a4f30ec2f"
  },
  {
    "url": "assets/js/113.62e96c16.js",
    "revision": "98382bcad45a1ba23335821daad04e6e"
  },
  {
    "url": "assets/js/114.94bfd905.js",
    "revision": "be093adf5e103994b0993ddf03d24688"
  },
  {
    "url": "assets/js/115.55475595.js",
    "revision": "b89dc1187070f040107166bbaceefe63"
  },
  {
    "url": "assets/js/116.09663c05.js",
    "revision": "6394c9faee35b336a3abd9433c2b6c8d"
  },
  {
    "url": "assets/js/117.430431ca.js",
    "revision": "96b6ce5e779477727233ad884b3c2149"
  },
  {
    "url": "assets/js/118.085997d3.js",
    "revision": "ea688629b9249b33857e5d1badfc01d6"
  },
  {
    "url": "assets/js/119.2d1108da.js",
    "revision": "92650a44ac2749e86a25c4f4945a2903"
  },
  {
    "url": "assets/js/12.bb680a1d.js",
    "revision": "a6040a17e0182d76517d12dfda22b8a3"
  },
  {
    "url": "assets/js/120.2baa6605.js",
    "revision": "a4b215beb36ca01f7f88a1ca64a1b00c"
  },
  {
    "url": "assets/js/121.6dcfdc30.js",
    "revision": "b144804bafe70f76c96cd68a86d0d510"
  },
  {
    "url": "assets/js/122.dd4baaf6.js",
    "revision": "e8e9dfd4e241da847c755d159d8e70a9"
  },
  {
    "url": "assets/js/123.ebf94265.js",
    "revision": "80369fd1faffe5621f93d7c00e25d2f7"
  },
  {
    "url": "assets/js/124.e8fb376f.js",
    "revision": "b5a98a68ad0edea71e1cf29a054fb5d1"
  },
  {
    "url": "assets/js/125.3705ba74.js",
    "revision": "e104f92c82e129e07374a2f0e04f5646"
  },
  {
    "url": "assets/js/126.9be5efd9.js",
    "revision": "731222256c5fa87c0918751e83980ddf"
  },
  {
    "url": "assets/js/127.8f1ec1ca.js",
    "revision": "d18a4535d8c6a4a76ee1dd7dd87e357b"
  },
  {
    "url": "assets/js/128.75fd2db6.js",
    "revision": "a29f98e4581544150a580106ad11babd"
  },
  {
    "url": "assets/js/129.6b3680ad.js",
    "revision": "890852a28692ba244926166013141cca"
  },
  {
    "url": "assets/js/13.50c9a147.js",
    "revision": "bed37f54cddae07ff1e84a7d8953e36c"
  },
  {
    "url": "assets/js/130.d4e0fd55.js",
    "revision": "4fb7a5359407f1db8476a7ac4326f1e6"
  },
  {
    "url": "assets/js/131.b254bfdd.js",
    "revision": "ccab8c8ce5b6e033f8819214e0254f9e"
  },
  {
    "url": "assets/js/132.4ef1947d.js",
    "revision": "6325f6f6ae38c59bc9e8bb88344b58b1"
  },
  {
    "url": "assets/js/133.27fdbbcf.js",
    "revision": "b75c63a3d324f4127fbda3d3a02a46f4"
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
    "url": "assets/js/15.c24d362f.js",
    "revision": "e23c134f3b4a6dc0230f39de3208b909"
  },
  {
    "url": "assets/js/16.42e6c672.js",
    "revision": "94828f6e00ebc89fe1a220e4a2a9f602"
  },
  {
    "url": "assets/js/17.e9361fd9.js",
    "revision": "42f02bf853563ade04580ce4cdaf3152"
  },
  {
    "url": "assets/js/18.b3fc4cb0.js",
    "revision": "20928c7eae80ddc468fa762b7c866dae"
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
    "url": "assets/js/20.508c326e.js",
    "revision": "38dc768d57e2bbafbbbe1d211584e6c2"
  },
  {
    "url": "assets/js/21.97a5c1f8.js",
    "revision": "7c304e4f7aef833d733656a5286976a6"
  },
  {
    "url": "assets/js/22.7cd6f513.js",
    "revision": "455c5c168eac1aae59c207a71ce9bbbe"
  },
  {
    "url": "assets/js/23.f9645304.js",
    "revision": "b6edcb20898c7cacaac1be60b2c778af"
  },
  {
    "url": "assets/js/24.494b9014.js",
    "revision": "f8221cec8fc8c5d21fd5de9dd9423825"
  },
  {
    "url": "assets/js/25.19272b23.js",
    "revision": "8b07149615cfbc00d4798ffa1857bdfb"
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
    "url": "assets/js/29.b110df05.js",
    "revision": "1b99fcf34a797a5713f3e93113e7ff88"
  },
  {
    "url": "assets/js/3.e6827fa8.js",
    "revision": "f1ffa92e22c7370c76abfc2cdb906d17"
  },
  {
    "url": "assets/js/30.9a24bee1.js",
    "revision": "25102a546336847986d37603a8f5fbd2"
  },
  {
    "url": "assets/js/31.a4305e7a.js",
    "revision": "28724b490eb1ccdef1e746813b94194f"
  },
  {
    "url": "assets/js/32.39a6ac2f.js",
    "revision": "cda3658c7ad22e7e6e90bf0dbc96147e"
  },
  {
    "url": "assets/js/33.5707c6cf.js",
    "revision": "886da012ea5d86bec00874b1ea700b38"
  },
  {
    "url": "assets/js/34.764de85a.js",
    "revision": "65310d58170fa513dd77736e12ea15bc"
  },
  {
    "url": "assets/js/35.3a81c0c5.js",
    "revision": "788e1377b804589d9e167462fb9c1408"
  },
  {
    "url": "assets/js/36.d22334c2.js",
    "revision": "5204f941f3b7d4575bfaeb78aca5b667"
  },
  {
    "url": "assets/js/37.ed13d5af.js",
    "revision": "bed2dab3e76b101a85893faa83657475"
  },
  {
    "url": "assets/js/38.21c4109a.js",
    "revision": "cb4641f1a2c912c096b64908670e9626"
  },
  {
    "url": "assets/js/39.52458808.js",
    "revision": "5f1287207ccaf533357f5232b7b614f1"
  },
  {
    "url": "assets/js/4.e8dea7ba.js",
    "revision": "0e74b840167869b0de3123b8cfac5108"
  },
  {
    "url": "assets/js/40.ac988521.js",
    "revision": "56efa378e32417f62d37b5200cdd9bd9"
  },
  {
    "url": "assets/js/41.dd7afcf2.js",
    "revision": "e479ed3d2fd6ff0eb115d21e043ffb33"
  },
  {
    "url": "assets/js/42.62a9bdb6.js",
    "revision": "29d790359d887f77fc53f843af51cd38"
  },
  {
    "url": "assets/js/43.efec6b48.js",
    "revision": "78106c1f2f4217ed31a62523bfc70a93"
  },
  {
    "url": "assets/js/44.3fcbc4c8.js",
    "revision": "ebaba24f1dc4aa7918679a637b9e32b6"
  },
  {
    "url": "assets/js/45.a0cfc113.js",
    "revision": "5f51fac9614437c0cf292f7b3eacff93"
  },
  {
    "url": "assets/js/46.96880fe9.js",
    "revision": "e952bd9fa35350593046a29bc8b790cd"
  },
  {
    "url": "assets/js/47.44c7225c.js",
    "revision": "c9a6b0e33773d9869abbdfb1334b2c74"
  },
  {
    "url": "assets/js/48.16e3255f.js",
    "revision": "434a0eec10803d186e72661940691cb5"
  },
  {
    "url": "assets/js/49.a9cbc5e8.js",
    "revision": "a60722050f3509dd8c99142b33af7859"
  },
  {
    "url": "assets/js/5.3e24e7be.js",
    "revision": "bb8330fc3b00684c0b46c0c7ade9634a"
  },
  {
    "url": "assets/js/50.f3f04ab2.js",
    "revision": "e8ea0c54a37f68c2a4224c7f7e112696"
  },
  {
    "url": "assets/js/51.f96a77db.js",
    "revision": "c2205dabf714b9b22e29c46ab9ae7b40"
  },
  {
    "url": "assets/js/52.80e5ccad.js",
    "revision": "8aaf55f08ebfe9ad36f27a45fca59164"
  },
  {
    "url": "assets/js/53.f54e2cdf.js",
    "revision": "6972b775ac5d946354e64a5631e698b9"
  },
  {
    "url": "assets/js/54.502f5642.js",
    "revision": "8bce36bdd3e7d62032d80f8040accfe8"
  },
  {
    "url": "assets/js/55.4559958e.js",
    "revision": "36d41f11a9545cf63be097ddbf0b4d74"
  },
  {
    "url": "assets/js/56.fd885877.js",
    "revision": "dabc0f92524af9aa74c293e97dbcffe8"
  },
  {
    "url": "assets/js/57.e967ac12.js",
    "revision": "e7b30e2a50df9b51f3d7fcb9c3aeada3"
  },
  {
    "url": "assets/js/58.0e7f61b2.js",
    "revision": "2e10aa5c10ac46d8e0dd7f0c608de125"
  },
  {
    "url": "assets/js/59.d24d20f9.js",
    "revision": "6c4b13d7dbea8ab7a4402ab44d083927"
  },
  {
    "url": "assets/js/6.ca2525e2.js",
    "revision": "f26b99a11274e34a1a8df09422012df8"
  },
  {
    "url": "assets/js/60.85937f52.js",
    "revision": "b4b5e85387123945b6606a778705241d"
  },
  {
    "url": "assets/js/61.f0e339c7.js",
    "revision": "e6a0ec8df7fb3384d069411e49299634"
  },
  {
    "url": "assets/js/62.4e12fd4a.js",
    "revision": "bc3b810fed8228f9723baa50da59346a"
  },
  {
    "url": "assets/js/63.3980ca67.js",
    "revision": "be986f2c540306687ca4ee93129b03d1"
  },
  {
    "url": "assets/js/64.0fd93ebe.js",
    "revision": "5257355dad99faa9fad8e3eb65411e80"
  },
  {
    "url": "assets/js/65.98b3fe85.js",
    "revision": "f5ddc12c426610e6c2c37ff9cac3b334"
  },
  {
    "url": "assets/js/66.3e93d46a.js",
    "revision": "ced2053bf7c2324423354e40b536c78c"
  },
  {
    "url": "assets/js/67.1e148284.js",
    "revision": "959044dc880c52a78716e8ba2139a51d"
  },
  {
    "url": "assets/js/68.10026e36.js",
    "revision": "79b065b9a44964423b2d791ee2333aad"
  },
  {
    "url": "assets/js/69.21fbdea3.js",
    "revision": "5f7c6723a9bf7d22f5207bec11e0a269"
  },
  {
    "url": "assets/js/7.cdc710f7.js",
    "revision": "7473b0e972f770c1bdf3633a0c9ada6e"
  },
  {
    "url": "assets/js/70.2d811ecf.js",
    "revision": "5288c09ecd7373a65369542e598afd28"
  },
  {
    "url": "assets/js/71.a18c23ca.js",
    "revision": "b67c86078634e1b81d1e6d2993a4d61c"
  },
  {
    "url": "assets/js/72.c74b555b.js",
    "revision": "86aa86a184c57110884aa071042f3076"
  },
  {
    "url": "assets/js/73.0a73d8d8.js",
    "revision": "c5f7715ca467d1927fba2b6519d9dadf"
  },
  {
    "url": "assets/js/74.e251c199.js",
    "revision": "8f5921ef30f7c5399f18b16723743edb"
  },
  {
    "url": "assets/js/75.3a9ebfdb.js",
    "revision": "805d6230cc020ba9df19cf2efc91e2df"
  },
  {
    "url": "assets/js/76.1922023e.js",
    "revision": "a33d5d7e8ad46f9618e12815a614f769"
  },
  {
    "url": "assets/js/77.25f10d26.js",
    "revision": "8451ac98668e78f1493d01de762fe9df"
  },
  {
    "url": "assets/js/78.0d89a7bb.js",
    "revision": "335e2d43b7902cb29095db9c8e213727"
  },
  {
    "url": "assets/js/79.a15080ae.js",
    "revision": "5088e60eeebb25f00422f836f39e19e6"
  },
  {
    "url": "assets/js/8.557fd97b.js",
    "revision": "a6d766561dc93b9606a8cb615d3f5548"
  },
  {
    "url": "assets/js/80.b7101ce3.js",
    "revision": "a39eed609188c1afba54fa8797849052"
  },
  {
    "url": "assets/js/81.75012613.js",
    "revision": "6edbd46f9f238e7a9883249939570319"
  },
  {
    "url": "assets/js/82.f77219e7.js",
    "revision": "78aa168b2d474a8d668ac637b8510a1e"
  },
  {
    "url": "assets/js/83.596b8508.js",
    "revision": "0e706a53b77e37957efec4097f791094"
  },
  {
    "url": "assets/js/84.01658fd2.js",
    "revision": "1dccbfd9645cb31793b382c3c03c6fe2"
  },
  {
    "url": "assets/js/85.6e0df008.js",
    "revision": "5055fbc5f37911b9d3d4150d00874f71"
  },
  {
    "url": "assets/js/86.e9f0e1f7.js",
    "revision": "c571d9c868556c712d2c243f35ed5f57"
  },
  {
    "url": "assets/js/87.fd5b1929.js",
    "revision": "623b4854a743c20fa7b26a096df96af3"
  },
  {
    "url": "assets/js/88.9eba2666.js",
    "revision": "95ae39d670de0006e9f3dca984bbf833"
  },
  {
    "url": "assets/js/89.57d7ef31.js",
    "revision": "0d1b252d5ffc6808d51c19bb7811dbc6"
  },
  {
    "url": "assets/js/9.13d458ed.js",
    "revision": "98983ed4d52578db065fd908e6b49dc6"
  },
  {
    "url": "assets/js/90.d9b6e25d.js",
    "revision": "5c199df37ebcc12342bc78d87a04d072"
  },
  {
    "url": "assets/js/91.5ae1b2a2.js",
    "revision": "abd1f6f84ddf0f3d8c20b79e8f3af1da"
  },
  {
    "url": "assets/js/92.372ece2d.js",
    "revision": "2534b5d57da62de28474011802433442"
  },
  {
    "url": "assets/js/93.d5a1f424.js",
    "revision": "967075cfa2457659c067017f2d150bc2"
  },
  {
    "url": "assets/js/94.cf1d8301.js",
    "revision": "f120dc8a1bbc9f903bfde8d92e388057"
  },
  {
    "url": "assets/js/95.e0323b4d.js",
    "revision": "d7f2a56cbeb40520822caf85f208a134"
  },
  {
    "url": "assets/js/96.e949503c.js",
    "revision": "285c5888d366b15eaa3987bfb9542e3b"
  },
  {
    "url": "assets/js/97.a588ad85.js",
    "revision": "86216358ac22a7c3512d1e28377731ee"
  },
  {
    "url": "assets/js/98.f6c3d3ca.js",
    "revision": "f06b705afe896e80783898e683c57631"
  },
  {
    "url": "assets/js/99.6a20cfe6.js",
    "revision": "8a2f81e5f68c8d086a70ab229ada6426"
  },
  {
    "url": "assets/js/app.0d8f9e5c.js",
    "revision": "2bbdca47624265437aa7b979e6fcdd5c"
  },
  {
    "url": "deploy/eggjs.chat.html",
    "revision": "b5e29e8f51fa2a05e76abed7144692f9"
  },
  {
    "url": "deploy/index.html",
    "revision": "efbd084f021409fe59271a005db2293a"
  },
  {
    "url": "deploy/vitevue3.shop.html",
    "revision": "6db755475520ac4f9ec1583755c8ed90"
  },
  {
    "url": "deploy/vuecli.shop.html",
    "revision": "6186463d84eb809d36cad545db909e32"
  },
  {
    "url": "fourthless/index.html",
    "revision": "b66fea6419da81655b82dfb716ffcaa5"
  },
  {
    "url": "fourthless/w-a.html",
    "revision": "f6fedc003b7da38acd8c26c6413e453b"
  },
  {
    "url": "fourthless/w-a/02开发前环境搭建.html",
    "revision": "dd90f24bb02c7a66220379a294dabbce"
  },
  {
    "url": "fourthless/w-a/eggjs框架开发文档.html",
    "revision": "a2880f261c0c31c27d95b3d4c18d580a"
  },
  {
    "url": "fourthless/w-a/thinkphp.修改管理员.html",
    "revision": "670202f5bd3315a68b8b8255c80d341c"
  },
  {
    "url": "fourthless/w-a/thinkphp.管理员板块.html",
    "revision": "10c4928659412395f79933346f9b3a27"
  },
  {
    "url": "fourthless/w-a/thinkphp框架开发文档.html",
    "revision": "6fe6faffc19cf87b33fd02a5dd007cd2"
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
    "revision": "5df8d511bf3252481510a1054e45daac"
  },
  {
    "url": "pc/index.html",
    "revision": "2bc541c50435afc6c14f06d31343ee00"
  },
  {
    "url": "pc/p-a.html",
    "revision": "690bcf8894633bf72a83ed3073fa25c5"
  },
  {
    "url": "pc/p-b.html",
    "revision": "d4598e07f66d7825587142786f304624"
  },
  {
    "url": "pc/p-c.html",
    "revision": "6a8b08258376d2166184d9036733f56e"
  },
  {
    "url": "phone/index.html",
    "revision": "5830020c084dea0db9bb61d4e22cfb55"
  },
  {
    "url": "phone/phone-a.html",
    "revision": "78bb0403a228cea68d715746248f987e"
  },
  {
    "url": "phone/phone-b.html",
    "revision": "8fc8ee944ebdab7c85d69c2c602cd89e"
  },
  {
    "url": "phone/phone-c.html",
    "revision": "3b04305690c491413aee8ac4728170b8"
  },
  {
    "url": "secondless/index.html",
    "revision": "db2a972b083cca8e7a07ab27e1acab07"
  },
  {
    "url": "secondless/w-a.html",
    "revision": "0ca3ba893c5cbda5d7e125568a7961da"
  },
  {
    "url": "secondless/w-a/Date类型：时间和日期.html",
    "revision": "e4a9c4a8be857425271ac77ea38ae3b9"
  },
  {
    "url": "secondless/w-a/Function类型：函数进阶.html",
    "revision": "2c6672d38bbe4b41bfe072092810ed50"
  },
  {
    "url": "secondless/w-a/javascript函数.html",
    "revision": "dba7463b3959ec4341b5e86b7197070e"
  },
  {
    "url": "secondless/w-a/javascript基本包装类型.html",
    "revision": "27b9c811be2c0b66e5f77e1a28160853"
  },
  {
    "url": "secondless/w-a/javascript基础.html",
    "revision": "33dc07552b3af253e87bbf10a29393e5"
  },
  {
    "url": "secondless/w-a/javascript对象.html",
    "revision": "7b4ac8faa18610a98cfb6d4204a1b531"
  },
  {
    "url": "secondless/w-a/javascript数组.html",
    "revision": "ac97ce772610e17928ae0b339201d521"
  },
  {
    "url": "secondless/w-a/javascript运算符.html",
    "revision": "043d8e6b228723a2a1a298fb98aa8f90"
  },
  {
    "url": "secondless/w-a/事件.html",
    "revision": "32d5d1ebe88300d6b5c4a3b28d1ca1fd"
  },
  {
    "url": "secondless/w-a/内置对象：Global、Math对象，变量、作用域和内存问题.html",
    "revision": "10da80524f09306bbfbe670ea28cb0ca"
  },
  {
    "url": "secondless/w-a/函数对象数组小结.html",
    "revision": "fa2430c27466678c8b53dd0ae818b2a8"
  },
  {
    "url": "secondless/w-a/匿名函数和闭包.html",
    "revision": "128a4e1a74145722635aadea028034f0"
  },
  {
    "url": "secondless/w-a/数据Cookie、XML、JSON.html",
    "revision": "e2f5a938bbf59d46f9760ff907b9857a"
  },
  {
    "url": "secondless/w-a/流程控制语句.html",
    "revision": "fa95bb4b4215040e365fbb0e94ad4ee9"
  },
  {
    "url": "secondless/w-a/浏览器对象模型BOM及浏览器检测.html",
    "revision": "5c1f40c2adef735ac31e50d0eb5bea71"
  },
  {
    "url": "secondless/w-a/网页文档对象模型DOM.html",
    "revision": "e92bcc5ea81a5790b664d2db4c0377ab"
  },
  {
    "url": "secondless/w-a/表单处理及错误处理与调试.html",
    "revision": "c06b67df3ae53f02360485e8fa159096"
  },
  {
    "url": "secondless/w-b.html",
    "revision": "681bf331c75603b9aa5c71ad0b5a733e"
  },
  {
    "url": "secondless/w-b/Ajax.html",
    "revision": "02d1f8889ca24ee330234032b2f876e9"
  },
  {
    "url": "secondless/w-b/jQuery.html",
    "revision": "c6f3a3fa24f19fe890b4a8f17e3fc735"
  },
  {
    "url": "secondless/w-b/jQuery事件、动画、插件.html",
    "revision": "5e7c954d249ccfffd75873b05301bf7a"
  },
  {
    "url": "secondless/w-b/Node.js.html",
    "revision": "036f7a7e32ed8c0bacce162a4b2bee9f"
  },
  {
    "url": "secondless/w-b/node.js+vue.js 渲染企业网站.html",
    "revision": "9b0394712eb2d3a503bb4126911fae76"
  },
  {
    "url": "secondless/w-b/nodejs+jQuery开发留言板.html",
    "revision": "4c79fb0dabd33af967f6147d7464bae6"
  },
  {
    "url": "secondless/w-b/nodejs服务器端app.js文件.html",
    "revision": "9a3d80bd16962004a2eafe1c828de9b8"
  },
  {
    "url": "secondless/w-b/Vue.js.html",
    "revision": "1ec0db83aeb0584abf21b6ac2bde1f7e"
  },
  {
    "url": "secondless/w-b/封装js库过渡到jQuery.html",
    "revision": "bc886088be7d739ef2e4a1dfc2ceabea"
  },
  {
    "url": "secondless/w-b/正则表达式.html",
    "revision": "74b1272d2ba3fc6886ae9f70f8c95476"
  },
  {
    "url": "secondless/w-b/面向对象与原型.html",
    "revision": "3ad2dc2de27fc4b02372f7cfbb643386"
  },
  {
    "url": "secondless/w-c.html",
    "revision": "126dba9f1d7c58579c6503909dbf975d"
  },
  {
    "url": "secondless/w-c/Egg.js.html",
    "revision": "e9bebbc270e012f6118248602e1d1795"
  },
  {
    "url": "secondless/w-c/Egg.js和Mysql数据库进阶进一步开发网站后台.html",
    "revision": "f5821f585ada2a4219f45969de2f9111"
  },
  {
    "url": "secondless/w-c/egg.js基础总结.html",
    "revision": "ed09a72e4f6edae5b8c0a2f4b4de8fcf"
  },
  {
    "url": "secondless/w-c/egg.js重要知识详细文档.html",
    "revision": "7844cd31a2a3b94018d992814c803507"
  },
  {
    "url": "secondless/w-c/eggjs+postman测试工具将留言写入json文件.html",
    "revision": "1d91de11931a9c3da2c999d7b7b3375b"
  },
  {
    "url": "secondless/w-c/mysql数据库.html",
    "revision": "603ebee5023b34776594bbd6f72e9a72"
  },
  {
    "url": "secondless/w-c/ValParams API 说明.html",
    "revision": "37256968668840bd9a578dd91f3dfcde"
  },
  {
    "url": "secondless/w-c/上传文件.html",
    "revision": "407e7aa433b151f98c0b485d89c53f74"
  },
  {
    "url": "secondless/w-c/企业网站其它页面(非首页).html",
    "revision": "7a4df372deb6224dea2402bffee0fb06"
  },
  {
    "url": "secondless/w-c/企业网站前端部分.html",
    "revision": "4804a892aba6f52992e4d02de53f1814"
  },
  {
    "url": "secondless/w-c/企业网站后台内容管理.html",
    "revision": "baef7d7056fb98771691a2fef7709300"
  },
  {
    "url": "secondless/w-c/企业网站后台栏目管理.html",
    "revision": "d8013471bd512a88aa86fde697cd9a56"
  },
  {
    "url": "secondless/w-c/企业网站首页.html",
    "revision": "49484f081e45cef090c0c2f005b3fc32"
  },
  {
    "url": "secondless/w-c/响应式后台公共模版.html",
    "revision": "bc82d016c34b2836adf4ec13f93e4b4c"
  },
  {
    "url": "secondless/w-c/响应式后台用户留言板管理.html",
    "revision": "db10c8119b257f221bb4d0924cc1d19d"
  },
  {
    "url": "secondless/w-c/响应式后台界面示例代码.html",
    "revision": "b4eaf8ae98a233cffa0cbf9327bb3f2c"
  },
  {
    "url": "secondless/w-c/响应式后台管理员登录.html",
    "revision": "05a60e4c8c0bd5762989110c0d656eee"
  },
  {
    "url": "secondless/w-c/响应式后台管理系统.html",
    "revision": "3a5ca442765685cdd08d1803be840642"
  },
  {
    "url": "secondless/w-c/响应式网页布局.html",
    "revision": "cce03ec02d45b5785dcfedf7c9717ee2"
  },
  {
    "url": "secondless/w-c/响应式网页布局指导思路.html",
    "revision": "49d4a26c8aa8094793a1f5cbca60f4ca"
  },
  {
    "url": "secondless/w-c/树形结构方法演变.html",
    "revision": "b9729f2961dc810fb1a342cc092ae938"
  },
  {
    "url": "secondless/w-c/直播功能中的用户表liveuser.html",
    "revision": "2390ad0f3b8b8933641229315e17d8fb"
  },
  {
    "url": "secondless/w-c/直播功能中的直播间表live.html",
    "revision": "06ae5024fdb134f142b1477a54e228ed"
  },
  {
    "url": "secondless/w-c/直播功能中的礼物表livegift.html",
    "revision": "50c843715e5b08b964b54f8fd885a2a9"
  },
  {
    "url": "secondless/w-c/直播功能中的订单表liveorder.html",
    "revision": "90f957f07f667a2232838fbdeacc161c"
  },
  {
    "url": "secondless/w-c/网站后台管理员简单权限分配功能实现.html",
    "revision": "2f38e76d773345360d26ca17215c4132"
  },
  {
    "url": "secondless/w-d.html",
    "revision": "47d26c29981afb8492149e42a5008e74"
  },
  {
    "url": "secondless/w-d/SSL证书.html",
    "revision": "fa29396ff8810b4985a4ee61c1071576"
  },
  {
    "url": "secondless/w-d/网站代码上线调试.html",
    "revision": "b93a2073ecacd50712937ef8de9ee390"
  },
  {
    "url": "secondless/w-d/购买域名.html",
    "revision": "1c8e14d635ba085ab6bf67a0663f2986"
  },
  {
    "url": "secondless/w-d/购买服务器.html",
    "revision": "214660d0fb0c553577735a9343bef270"
  },
  {
    "url": "thirdless/index.html",
    "revision": "70dc410bb4569ea78ba0aad46bb0a188"
  },
  {
    "url": "thirdless/w-a.html",
    "revision": "0352fe5a7b68272049ea9217ea5e4eac"
  },
  {
    "url": "thirdless/w-a/02开发前环境搭建.html",
    "revision": "eedfe2cccebdd5e9806db6c9bf396d0a"
  },
  {
    "url": "thirdless/w-a/03引入UI框架及进行全局配置.html",
    "revision": "fed783657b1c389bd00bcf675324fa3f"
  },
  {
    "url": "thirdless/w-a/04首页开发.html",
    "revision": "cd5a69b88120c942827ae6e60cbe8304"
  },
  {
    "url": "thirdless/w-a/05其它界面开发.html",
    "revision": "de21f56130c346fdaf1b034a4d5618cf"
  },
  {
    "url": "thirdless/w-a/06数据处理.html",
    "revision": "7561848bf3b233280ef43efa6f877c37"
  },
  {
    "url": "thirdless/w-a/07后端api开发.html",
    "revision": "cf085e1ab9796989917311ffd9653415"
  },
  {
    "url": "thirdless/w-a/07后端api开发代码.html",
    "revision": "d67d8dd49bdd54fa625563e08a45636f"
  },
  {
    "url": "thirdless/w-a/08数据交互和界面展示.html",
    "revision": "e616fa56532234f1fb30d10a06b7d9b8"
  },
  {
    "url": "thirdless/w-b.html",
    "revision": "5670e00f2cf2a79c16c6f94644e9fedb"
  },
  {
    "url": "thirdless/w-c.html",
    "revision": "d3cfd734b624294bbdf3278a2cf2f552"
  },
  {
    "url": "thirdless/w-d.html",
    "revision": "fb314e18e0963b8243584d426dd46961"
  },
  {
    "url": "thirdless/w-e.html",
    "revision": "fa47a41bd4947c0e78826d21281455d1"
  },
  {
    "url": "web/answer/课程常见问题.html",
    "revision": "92762c6ed52b21a0d974b2ab41299cb3"
  },
  {
    "url": "web/bootstrap/index.html",
    "revision": "8270795fd5b7eac3d58c336e873436e7"
  },
  {
    "url": "web/css/index.html",
    "revision": "821f9864ef4de6f912a83f95fef2152e"
  },
  {
    "url": "web/css/封装的css样式库.html",
    "revision": "00f90d4c02df5fa4ccb3913fda8013cc"
  },
  {
    "url": "web/echarts/index.html",
    "revision": "d761b3ab9635b9764395d7e5de667378"
  },
  {
    "url": "web/github/index.html",
    "revision": "5cd3d3c161ef3f82c2e5ab68211b8fe3"
  },
  {
    "url": "web/IIS/index.html",
    "revision": "281ee7c38eff046342d4ff255efb2a90"
  },
  {
    "url": "web/index.html",
    "revision": "da9ebdd129e13dc5d0f0595e008bd951"
  },
  {
    "url": "web/methods/地图相关.html",
    "revision": "6aee8d729f755592a2e4dcf5c43d6f5c"
  },
  {
    "url": "web/methods/定位相关.html",
    "revision": "1978a7e7e48ba53489f9be137cba6856"
  },
  {
    "url": "web/methods/实用接口.html",
    "revision": "db41a4888591e6045970bfc7c95d8915"
  },
  {
    "url": "web/mysql/index.html",
    "revision": "97cc05832289ab5188ebb990fff4afe7"
  },
  {
    "url": "web/mysql/shop_manager.html",
    "revision": "08b77794ab7a96c188b7f7cd03a29052"
  },
  {
    "url": "web/mysql/shop_manager表接口.html",
    "revision": "887bafacecd0eee0a011a2119707b058"
  },
  {
    "url": "web/shop/index.html",
    "revision": "5220d90aef8a7edc3e12f3fbb21eafe3"
  },
  {
    "url": "web/software/index.html",
    "revision": "0fed469e23a2b15c833ed0035cfafff1"
  },
  {
    "url": "web/Vanta.js/index.html",
    "revision": "5f60473f09bc289d1f7b0d375bbe7343"
  },
  {
    "url": "web/vue.js/index.html",
    "revision": "3aec460d912b09c7009a5a0b7a9d3558"
  },
  {
    "url": "web/Vue3+ElementPlus/index.html",
    "revision": "e761d737cdb0597d1aebc681ad3e5a8c"
  },
  {
    "url": "web/w-a.html",
    "revision": "1f49689badd1ebcb1453f001b3e767d8"
  },
  {
    "url": "web/w-b.html",
    "revision": "00e533ff7a24853f49bcc0268d92f886"
  },
  {
    "url": "web/w-c.html",
    "revision": "2696f2e98d96c942b12032d0d97e3541"
  },
  {
    "url": "开发记录.html",
    "revision": "c16206294aca610e839a4605777486f3"
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
