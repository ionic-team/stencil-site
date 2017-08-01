importScripts('workbox-sw.prod.v1.1.0.js');

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
    "revision": "d6766b762f79502dd98ae1f236ee5ddb"
  },
  {
    "url": "build/app.registry.json",
    "revision": "4013fd1e399b61e3fc20265d5567269c"
  },
  {
    "url": "build/app\\app.ehypaqtbz6um.ce.js",
    "revision": "066df9c7280ee9f07bc272b17db6ce31"
  },
  {
    "url": "build/app\\app.zmqmcdvksoyy.js",
    "revision": "24696c82e4e300dca7965f904c5213cc"
  },
  {
    "url": "build/app\\iutjqw325p9s.js",
    "revision": "0a75ee344431b60bd4bc8c806c4bcf7f"
  },
  {
    "url": "build/app\\orpb1asuu34o.css",
    "revision": "7c37663e92f09750c97e93147c0cbcc3"
  },
  {
    "url": "build/app\\qv4yagabjzgi.js",
    "revision": "efc49b822bc5a57814edf1d89f8c2c82"
  },
  {
    "url": "build/app\\tvcn8c1vvcrq.css",
    "revision": "097a4eab4778fa6d4cee8d9414ba1381"
  },
  {
    "url": "favicon.ico",
    "revision": "d2f619d796fbe8bed6200da2691aa5b6"
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
    "url": "index.html",
    "revision": "c77f2656ef734dab7c6c3398686be4e3"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
