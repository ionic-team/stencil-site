importScripts('workbox-v3.0.0-alpha.3/workbox-sw.js')

self.workbox.skipWaiting();
self.workbox.clientsClaim();

self.workbox.routing.registerRoute(
  /\.html$/,
  self.workbox.strategies.networkFirst()
);

self.workbox.routing.registerRoute(
  'https://sw-test-site.firebaseapp.com/',
  self.workbox.strategies.networkFirst()
);


self.workbox.precaching.precacheAndRoute([]);