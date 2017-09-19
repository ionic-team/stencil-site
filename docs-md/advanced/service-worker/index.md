# Service Workers

[Service workers](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) are a very powerful api that is essential for [PWAs](https://blog.ionic.io/what-is-a-progressive-web-app/), but can be hard to use. To help with this, we decided to build support for Service Workers into Stencil itself using [Workbox](https://workboxjs.org/). 

### Usage

When doing a production build of an app built using Stencil, the Stencil compiler will automatically generate a service worker for you and inject the necessary code to register the service worker in your index.html. Also, because the files Stencil generates are hashed, everytime you do a production build and push an update to your app the service worker will know to update therefore ensuring your users are never stuck on a stale version of your site.

### Config

Stencil uses Workbox underneath and therefore supports all of the [Workbox config options](https://workboxjs.org/reference-docs/latest/module-workbox-build.html#.Configuration). Here is the default config Stencil uses:

```
{
  skipWaiting: true,
  clientsClaim: true,
  globPatterns: [
    '**/*.{js,css,json,html,ico,png,svg}'
  ]
};
```

This configuration does pre-caching of all of your apps assets.

To modify this config you can use the `serviceWorker` param of your Stencil config. Here is an example:

```
exports.config = {
  bundles: [
    ...
  ],
  collections: [
    ...
  ],
  serviceWorker: {
    globPatterns: [
      '**/*.{js,css,json,html,ico,png}'
    ]
  }
};
```