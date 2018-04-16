# Service Workers

[Service workers](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) are a very powerful api that is essential for [PWAs](https://blog.ionic.io/what-is-a-progressive-web-app/), but can be hard to use. To help with this, we decided to build support for Service Workers into Stencil itself using [Workbox](https://workboxjs.org/).

### What is Workbox?

Workbox is a library that greatly simplifies the Service Worker API. It allows you to quickly generate a service worker that can handle caching static assets, cache remote assets using routes (similar to Express) or even do offline Google Analytics. Because we are built on top of Workbox, you can easily use any of the functionality they offer. For more info on Workbox, [check out their docs](https://developers.google.com/web/tools/workbox/)

### Usage

When doing a production build of an app built using Stencil, the Stencil compiler will automatically generate a service worker for you and inject the necessary code to register the service worker in your index.html. Also, because the files Stencil generates are hashed, every time you do a production build and push an update to your app, the service worker will know to update, therefore ensuring your users are never stuck on a stale version of your site.

Lets run through the steps needed to enable service workers for your project:

- `cd` into your project
- Run `npm run build`

And thats it! You should now have an `sw.js` file in your `www` folder and the code to register the service worker in your `www/index.html` file.

> Note: The component starter by default does not have service workers enabled as a service worker is not needed for component collections

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
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        globPatterns: [
          '**/*.{js,css,json,html,ico,png}'
        ]
      }
    }
  ]
};
```

### Using a custom service worker

Already have a service worker or want to include some custom code? We support that too.

Let's go through the steps needed for this functionality:

- First we need to pass the path to our custom service worker to the `swSrc` command in the serviceWorker config. Here is an example:

```
exports.config = {
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        swSrc: 'src/sw.js'
      }
    }
  ]
};
```

- Now we need to include some boilerplate code in our custom service worker:

```
importScripts('workbox-v3.1.0/workbox-sw.js');

self.workbox.skipWaiting();
self.workbox.clientsClaim();

// your custom service worker code

self.workbox.precaching.precacheAndRoute([]);
```
This code imports the workbox library, creates a new instance of the service worker and tells workbox where to insert the pre-cache array.



<stencil-route-link url="/docs/server-side-rendering" router="#router" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/context" custom="true">
  <button class="pull-right btn btn--primary">
    Next
  </button>
</stencil-route-link>
