importScripts('workbox-v3.0.0-alpha.6/workbox-sw.js')

self.workbox.skipWaiting();
self.workbox.clientsClaim();

self.workbox.routing.registerRoute(
  /\.html$/,
  self.workbox.strategies.networkFirst()
);

self.workbox.precaching.precacheAndRoute([]);