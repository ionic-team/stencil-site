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
    "url": "build/app.js",
    "revision": "6df0374b8161297df34c275058063f55"
  },
  {
    "url": "build/app.registry.json",
    "revision": "acb59701d3fce523a0105d75e358733b"
  },
  {
    "url": "build/app/3x82ohz2.js",
    "revision": "0318c44178157a261f3ec34ac84a167a"
  },
  {
    "url": "build/app/6v733emd.js",
    "revision": "f89923f8eeb517c89603d4b0d68ad078"
  },
  {
    "url": "build/app/9czo4spw.js",
    "revision": "69b839324c4328b3fe9d3bdeddc4fd69"
  },
  {
    "url": "build/app/app.rygnc9p6.pf.js",
    "revision": "f07c45233e341e9578267e7c58a8ff21"
  },
  {
    "url": "build/app/app.usidjtge.js",
    "revision": "7626c9f3826c69c5881c86f3dd126de2"
  },
  {
    "url": "build/app/dmcjncaa.css",
    "revision": "e40a8ba930f4eb73a154610c5d7dcf48"
  },
  {
    "url": "build/app/uv6m42td.css",
    "revision": "60b2ed49acbcce7fde95f690ce777268"
  },
  {
    "url": "build/app/v0hkoshm.css",
    "revision": "fb08a4d742ae908800b6945c89925b9a"
  },
  {
    "url": "build/app/vzntfe8p.js",
    "revision": "6a15dfab918d60074529b0fe1b1fe617"
  },
  {
    "url": "docs-content/addons/stencil-router.html",
    "revision": "2986d549a7eddc7070203cc9e976e175"
  },
  {
    "url": "docs-content/advanced/ssr/index.html",
    "revision": "7389e661fabb7f0af4c59d04495d48c7"
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
    "revision": "d16fb7ae5139aaf40bc9016d7a9a282b"
  },
  {
    "url": "docs-content/basics/nesting-components.html",
    "revision": "65281e952c881fb90a474e5310074c7d"
  },
  {
    "url": "docs-content/basics/stencil-config.html",
    "revision": "f8b7a2a09220ddcc6471f74ce948292b"
  },
  {
    "url": "docs-content/basics/stencil-router.html",
    "revision": "e2f079693db64c05e634ed9327d3dd33"
  },
  {
    "url": "docs-content/basics/using-events.html",
    "revision": "a6f7713d764bcd8e3f5ff3c61757f842"
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
    "revision": "0ad3560cc7158d4ab6650e275b8c6546"
  },
  {
    "url": "manifest.json",
<<<<<<< Updated upstream
    "revision": "64d82272b788fb4288790cb7e2aa8b66"
=======
    "revision": "ab5e18864e5002962d50ca783462119e"
>>>>>>> Stashed changes
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
