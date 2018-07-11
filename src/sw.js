importScripts('workbox-v3.3.1/workbox-sw.js')

self.workbox.skipWaiting();
self.workbox.clientsClaim();

self.workbox.precaching.precacheAndRoute([]);