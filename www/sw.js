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
    "revision": "c7e5e08ec8580781c648e8d09b480567"
  },
  {
    "url": "build/app.registry.json",
    "revision": "1553b3a0d4bea7b39ed5a543f8bfe97a"
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
    "url": "build/app/cfcmwmeq.css",
    "revision": "f8875badef1e02689745d4d0be73dd02"
  },
  {
    "url": "build/app/conwmkw6.js",
    "revision": "b1801f8daa37d2e2f91e394f882e869b"
  },
  {
    "url": "build/app/dmcjncaa.css",
    "revision": "e40a8ba930f4eb73a154610c5d7dcf48"
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
    "revision": "b1e0d1fcd132cd59eeb7612031febca2"
  },
  {
    "url": "manifest.json",
    "revision": "64d82272b788fb4288790cb7e2aa8b66"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true
});
workboxSW.precache(fileManifest);
