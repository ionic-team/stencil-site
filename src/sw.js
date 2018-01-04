importScripts('workbox-sw.prod.v2.1.1.js');

const workboxSW = new self.WorkboxSW();

workboxSW.router.registerRoute(
  /\.html$/,
  workboxSW.strategies.networkFirst()
);

workboxSW.router.registerRoute(
  'https://sw-test-site.firebaseapp.com/',
  workboxSW.strategies.networkFirst()
);


workboxSW.precache([]);