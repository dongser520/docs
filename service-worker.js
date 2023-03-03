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
    "url": "404.html",
    "revision": "fff4d740fce34cd7da0c412557d44124"
  },
  {
    "url": "about.html",
    "revision": "8edc6510c0dacc41ecd2652516e88bff"
  },
  {
    "url": "about/index.html",
    "revision": "f8f3fcfd7d6cd866ca13146086e9fb15"
  },
  {
    "url": "assets/css/0.styles.69e032a3.css",
    "revision": "3bad455384bbc154c1cd0d693f69dd07"
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
    "url": "assets/js/10.6226bbba.js",
    "revision": "fbade586e0f8ceb98dc80911f37eb7fa"
  },
  {
    "url": "assets/js/11.9493959c.js",
    "revision": "30089e19fa9f59bfa79f7fd0f6ad3952"
  },
  {
    "url": "assets/js/12.48aaae90.js",
    "revision": "d47b1ef4803add8c24c8fc026f9e929a"
  },
  {
    "url": "assets/js/13.e951cf43.js",
    "revision": "fc004bed051854260903d4f11dceacc3"
  },
  {
    "url": "assets/js/14.a9072403.js",
    "revision": "91d9d43caf636382c8ff567e507166c3"
  },
  {
    "url": "assets/js/15.76c1268f.js",
    "revision": "582f8d211d6557b011e227d3e2e5164b"
  },
  {
    "url": "assets/js/16.c09106cf.js",
    "revision": "f14c3d88e8f6824e770e8d1471275bb9"
  },
  {
    "url": "assets/js/17.488dbd9d.js",
    "revision": "894e16605c581e7dc409951b45f9b1bb"
  },
  {
    "url": "assets/js/18.54dac0ff.js",
    "revision": "ee21248a708d718b99dd624e3f2d29a1"
  },
  {
    "url": "assets/js/19.1339d15f.js",
    "revision": "3bb245f3e8053fe06994d26da976c56b"
  },
  {
    "url": "assets/js/2.6281e0bb.js",
    "revision": "6953100b4156b74d48f76069058a12a9"
  },
  {
    "url": "assets/js/20.f3769b75.js",
    "revision": "1b2e525aa897918a5567f06592cbed19"
  },
  {
    "url": "assets/js/21.7dc7de7d.js",
    "revision": "01ac3761a6b5f64a0dab4f549fe80388"
  },
  {
    "url": "assets/js/22.99c01d66.js",
    "revision": "89147abe2d07a4e12d54697cd12e765d"
  },
  {
    "url": "assets/js/23.71b439a2.js",
    "revision": "9c14b2d06f8b4b59869a3c44d8b1d332"
  },
  {
    "url": "assets/js/24.dda08f99.js",
    "revision": "27440255c378d98c2899eeb7d0892135"
  },
  {
    "url": "assets/js/25.4da39e74.js",
    "revision": "e49d08430312183ac8259a0dba5c9895"
  },
  {
    "url": "assets/js/26.3df4f68d.js",
    "revision": "411848567ed906a9677c5b8847cb7ce3"
  },
  {
    "url": "assets/js/27.1cbbb50c.js",
    "revision": "af50a7b2ed277ee06b17c2142d20c6bb"
  },
  {
    "url": "assets/js/3.235a0c8c.js",
    "revision": "d3f64d756a0c5a949622d8ca562c03c0"
  },
  {
    "url": "assets/js/4.3202114c.js",
    "revision": "290a879625774d4bd3f7d411c3b2a2e8"
  },
  {
    "url": "assets/js/5.874fd3ce.js",
    "revision": "67f04ff01ca04251255721a09a6c10f4"
  },
  {
    "url": "assets/js/6.07076dbc.js",
    "revision": "ae94b1c3f77fccedb07feefef6e4f5d4"
  },
  {
    "url": "assets/js/7.4fa04fc9.js",
    "revision": "a1ec07ddae207ce1a49fcf95635dfb8f"
  },
  {
    "url": "assets/js/8.74a83c21.js",
    "revision": "01fdaaee6a719d98a2f540a837b307b8"
  },
  {
    "url": "assets/js/9.7100277f.js",
    "revision": "d9198a89b338f79d275d21ae9122fc9f"
  },
  {
    "url": "assets/js/app.e3e27b9a.js",
    "revision": "1a50333be0eeb850967b4ee965726970"
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
    "revision": "6260d17fffdce569ee6f3c6bd2bae264"
  },
  {
    "url": "pc/index.html",
    "revision": "64245ad6e294e8eaf92e603b4a79b9e4"
  },
  {
    "url": "pc/p-a.html",
    "revision": "85d3b0de57a1f165f79177f952624345"
  },
  {
    "url": "pc/p-b.html",
    "revision": "4790fbf17ee7a59a14df1175856531b3"
  },
  {
    "url": "pc/p-c.html",
    "revision": "ca0c324549ffd2958e13d0bbe057cb1b"
  },
  {
    "url": "phone/index.html",
    "revision": "45003bd1603977c2c15ef0ace66c06da"
  },
  {
    "url": "phone/phone-a.html",
    "revision": "88f63971d5174a447193d4194a1fdde2"
  },
  {
    "url": "phone/phone-b.html",
    "revision": "00ec12a806fa469c1af2409a2abe1567"
  },
  {
    "url": "phone/phone-c.html",
    "revision": "314eae5c72cff256cdc06dc206d04433"
  },
  {
    "url": "web/index.html",
    "revision": "45e3e3a9ec233f3fcbd899debaa1e1a3"
  },
  {
    "url": "web/w-a.html",
    "revision": "0484b1b1bc1a37ee9ce279fcb7f9c5a9"
  },
  {
    "url": "web/w-b.html",
    "revision": "80ce1fa69aacb66dd77c18dea2e92f83"
  },
  {
    "url": "web/w-c.html",
    "revision": "5e9f31277dba4a835e3358dd84fa6b72"
  },
  {
    "url": "开发记录.html",
    "revision": "a776f2fc5b0f10b3dcdad2de958607f7"
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
