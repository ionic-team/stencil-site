importScripts('workbox-sw.prod.v1.3.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "build/app.global.js",
    "revision": "2eab51fa98ed28b23cf1de2416e32427"
  },
  {
    "url": "build/app.js",
    "revision": "ef236b9d7b90a83cd1a14635ea5ad1e5"
  },
  {
    "url": "build/app.registry.json",
    "revision": "eae6d3a34b136a27a55b865607e2dfcb"
  },
  {
    "url": "build/app/8yf4sryn.js",
    "revision": "34fbc26d799dfd7ac2ab5501f4a053a5"
  },
  {
    "url": "build/app/9czo4spw.js",
    "revision": "69b839324c4328b3fe9d3bdeddc4fd69"
  },
  {
    "url": "build/app/ajbdpw8g.js",
    "revision": "15cce814d25e18cd79415389e41a3a6a"
  },
  {
    "url": "build/app/app.rhubgapg.js",
    "revision": "37ceca1d1ca8a94d2f0f3b1f67e8cc9a"
  },
  {
    "url": "build/app/app.yvc3k2aj.pf.js",
    "revision": "72aeae512b6f647f5d6387a928c46809"
  },
  {
    "url": "build/app/dkrz2obe.js",
    "revision": "2d55f2c3131ca103e2b8b1014e961c3a"
  },
  {
    "url": "build/app/dmcjncaa.css",
    "revision": "e40a8ba930f4eb73a154610c5d7dcf48"
  },
  {
    "url": "build/app/gnprv4gv.js",
    "revision": "b8d20b8094c30ee5daba81444088205c"
  },
  {
    "url": "build/app/tcz4qram.css",
    "revision": "45fb0763b8be7a1f797c4b125c951cfb"
  },
  {
    "url": "build/app/uxpeeopc.css",
    "revision": "377846d8f117edfb1f6d20b283d7937f"
  },
  {
    "url": "docs-content/addons/stencil-router.html",
    "revision": "2986d549a7eddc7070203cc9e976e175"
  },
  {
    "url": "docs-content/advanced/ssr/index.html",
    "revision": "ba42258303b5dd9e4d42b9d18047b79e"
  },
  {
    "url": "docs-content/basics/building-components.html",
    "revision": "805d62732e1055d29516a80224c2b7d4"
  },
  {
    "url": "docs-content/basics/change-detection.html",
    "revision": "8535ccbf1a1b9337c3f151560637c69e"
  },
  {
    "url": "docs-content/basics/code-splitting.html",
    "revision": "b9caed6ff6a055b4ac9c05822e7fe416"
  },
  {
    "url": "docs-content/basics/component-lifecycle.html",
    "revision": "bfcdd02a6b35979d290ef6bc17a943ed"
  },
  {
    "url": "docs-content/basics/components.html",
    "revision": "ab1bda4baad03cea64089b74f7f4c321"
  },
  {
    "url": "docs-content/basics/defining-components.html",
    "revision": "8929e96daf4f74837f7fc3aac5cd43ac"
  },
  {
    "url": "docs-content/basics/learning-jsx.html",
    "revision": "3f41f3a8d753fd2fb0935204beef77c7"
  },
  {
    "url": "docs-content/basics/managing-state.html",
    "revision": "58e73536ecfee107a338ba06aa1af955"
  },
  {
    "url": "docs-content/basics/my-first-component.html",
    "revision": "d0d3ff2ecef30b8187a8cc49c59a14cf"
  },
  {
    "url": "docs-content/basics/nesting-components.html",
    "revision": "65281e952c881fb90a474e5310074c7d"
  },
  {
    "url": "docs-content/basics/stencil-config.html",
    "revision": "1247b36348a4312f9bd909a5ca5625c0"
  },
  {
    "url": "docs-content/basics/stencil-router.html",
    "revision": "e2f079693db64c05e634ed9327d3dd33"
  },
  {
    "url": "docs-content/basics/using-events.html",
    "revision": "19a6a896852145a3fc6e737d6c938cf9"
  },
  {
    "url": "docs-content/compiler/config.html",
    "revision": "4ea31abcf3133107443e6dbc2baa55d3"
  },
  {
    "url": "docs-content/intro/history.html",
    "revision": "775cdfbd4c9d13f5922b75b9d29fed3e"
  },
  {
    "url": "docs-content/intro/index.html",
    "revision": "c0b731fa4ae07cd540794da401d5eae6"
  },
  {
    "url": "docs-content/intro/why.html",
    "revision": "d307ce93528d8ee21a7c36808ee4fa79"
  },
  {
    "url": "docs-content/start/index.html",
    "revision": "bca27fcf8d3e95fec4eb0f33ba321eb8"
  },
  {
    "url": "favicon.ico",
    "revision": "d2f619d796fbe8bed6200da2691aa5b6"
  },
  {
    "url": "img/icon.png",
    "revision": "b96ad6e1e0b755c8cd45e6aec40bca25"
  },
  {
    "url": "img/logo.png",
    "revision": "21ba838516e785b6bc724260c55edc26"
  },
  {
    "url": "img/text-logo.png",
    "revision": "983fa7783e22e13fa84159ee8c8ddd1a"
  },
  {
    "url": "img/text-logo.svg",
    "revision": "4f658c2a420d5dd7f30d09c2c87781cf"
  },
  {
    "url": "index.html",
    "revision": "041acf7fe8c6433f740f2d7bb04e58dc"
  },
  {
    "url": "manifest.json",
    "revision": "ab5e18864e5002962d50ca783462119e"
  },
  {
    "url": "promise-poly.js",
    "revision": "9de0e2361e885d394095abf15e5c6d5c"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
