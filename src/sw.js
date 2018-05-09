importScripts('workbox-v3.2.0/workbox-sw.js')

self.workbox.skipWaiting();
self.workbox.clientsClaim();

self.workbox.routing.registerRoute(
  /\.html$/,
  self.workbox.strategies.networkFirst()
);

self.workbox.precaching.precacheAndRoute([]);