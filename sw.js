importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/08b12f6ac680f1f02bd0.js",
    "revision": "b609876e34f2e283d9d71f3c39530941"
  },
  {
    "url": "/_nuxt/139c0d0d81e10733d47e.js",
    "revision": "5c4ecc304938e0f199b2a92f49031f74"
  },
  {
    "url": "/_nuxt/39fe117818f86ed7423f.js",
    "revision": "a3c8208ff4454bfdacb2c2d475ab4310"
  },
  {
    "url": "/_nuxt/4486e63bc343bdfcf413.js",
    "revision": "5398cf005a6624a9b8ad046cc59b808d"
  },
  {
    "url": "/_nuxt/58a0065d21389c84dd42.js",
    "revision": "bfcfd2a65a88375a2460680e363f335c"
  },
  {
    "url": "/_nuxt/803f4042b47f6ab479ba.js",
    "revision": "f980e8924f64775099c60f20e15648d9"
  },
  {
    "url": "/_nuxt/87ffef88489b829cfccc.js",
    "revision": "482fb214c5eb630bc7806d2b44fafccf"
  },
  {
    "url": "/_nuxt/e83cefd00f0fa716b589.js",
    "revision": "8fa331e6fbef9c1d239de0119633d9fc"
  },
  {
    "url": "/_nuxt/eadac5055646ce82460a.js",
    "revision": "b39f79daa2b49d076920a661630f00f0"
  }
], {
  "cacheId": "romain-clement.net",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'), workbox.strategies.networkFirst({"cacheName":"google-fonts","cacheExpiration":{"maxEntries":30,"maxAgeSeconds":300}}), 'GET')
