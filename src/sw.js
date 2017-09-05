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
    "url": "assets/icon/favicon.ico",
    "revision": "d2f619d796fbe8bed6200da2691aa5b6"
  },
  {
    "url": "assets/img/icon.png",
    "revision": "b96ad6e1e0b755c8cd45e6aec40bca25"
  },
  {
    "url": "assets/img/logo.png",
    "revision": "21ba838516e785b6bc724260c55edc26"
  },
  {
    "url": "assets/img/text-logo.png",
    "revision": "983fa7783e22e13fa84159ee8c8ddd1a"
  },
  {
    "url": "assets/img/text-logo.svg",
    "revision": "4f658c2a420d5dd7f30d09c2c87781cf"
  },
  {
    "url": "build/app.global.js",
    "revision": "020981ce0e013720203a6ed7eb819474"
  },
  {
    "url": "build/app.js",
    "revision": "cf312747c8ff9e94919c756f0559f350"
  },
  {
    "url": "build/app.registry.json",
    "revision": "35b6afcc280e43159927c1f090370cd0"
  },
  {
    "url": "build/app/1ydqlcjk.js",
    "revision": "f63b72302312b7b5e59e37875c7c7266"
  },
  {
    "url": "build/app/3oma1xxx.js",
    "revision": "af09fc4a47e165c739a52bcd2be53bca"
  },
  {
    "url": "build/app/8yf4sryn.js",
    "revision": "34fbc26d799dfd7ac2ab5501f4a053a5"
  },
  {
    "url": "build/app/ajbdpw8g.js",
    "revision": "15cce814d25e18cd79415389e41a3a6a"
  },
  {
    "url": "build/app/app.7rwi7g0s.pf.js",
    "revision": "f37de62f1c55a76a07968be19b26ffa5"
  },
  {
    "url": "build/app/app.pdfjoyqw.js",
    "revision": "5c0f28ed346e2d227c0814ca4770c7b4"
  },
  {
    "url": "build/app/c1o6if1w.css",
    "revision": "e856b7f3ba40bcb65266800b6804d015"
  },
  {
    "url": "build/app/xqtddulu.js",
    "revision": "3c6a0e49b328da2d85a1874ab2ffc2f9"
  },
  {
    "url": "build/app/yjborbvy.css",
    "revision": "5f1d66b643de46e4afd2b1231ba453e8"
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
    "url": "docs-content/basics/component-lifecycle.html",
    "revision": "bfcdd02a6b35979d290ef6bc17a943ed"
  },
  {
    "url": "docs-content/basics/decorators.html",
    "revision": "19c4621b1af950f6d0ad6eafe142fce9"
  },
  {
    "url": "docs-content/basics/events.html",
    "revision": "477e813c70037a93a2ccc4eb1fae8676"
  },
  {
    "url": "docs-content/basics/my-first-component.html",
    "revision": "cab5689d87bef6a95d073ce4023d2aae"
  },
  {
    "url": "docs-content/basics/stencil-config.html",
    "revision": "1247b36348a4312f9bd909a5ca5625c0"
  },
  {
    "url": "docs-content/basics/templating.html",
    "revision": "f2c1a55d348c99638cfb5c3d37cbc509"
  },
  {
    "url": "docs-content/compiler/config.html",
    "revision": "4ea31abcf3133107443e6dbc2baa55d3"
  },
  {
    "url": "docs-content/intro/index.html",
    "revision": "c0b731fa4ae07cd540794da401d5eae6"
  },
  {
    "url": "docs-content/start/index.html",
    "revision": "bca27fcf8d3e95fec4eb0f33ba321eb8"
  },
  {
    "url": "index.html",
    "revision": "6082275ba6e6ba37bf134d00bc715539"
  },
  {
    "url": "manifest.json",
    "revision": "ab5e18864e5002962d50ca783462119e"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
