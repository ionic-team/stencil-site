---
title: Service Workers
description: Service Workers
url: /docs/service-workers
contributors:
  - jthoms1
  - simonhaenisch
---

# Service Workers

[Service workers](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) are a very powerful api that is essential for [PWAs](https://blog.ionic.io/what-is-a-progressive-web-app/), but can be hard to use. To help with this, we decided to build support for Service Workers into Stencil itself using [Workbox](https://workboxjs.org/).

## What is Workbox?

Workbox is a library that greatly simplifies the Service Worker API. It allows you to quickly generate a service worker that can handle caching static assets, cache remote assets using routes (similar to Express) or even do offline Google Analytics. Because we are built on top of Workbox, you can easily use any of the functionality they offer. For more info on Workbox, [check out their docs](https://developers.google.com/web/tools/workbox/)

## Usage

When doing a production build of an app built using Stencil, the Stencil compiler will automatically generate a service worker for you and inject the necessary code to register the service worker in your index.html. Also, because the files Stencil generates are hashed, every time you do a production build and push an update to your app, the service worker will know to update, therefore ensuring your users are never stuck on a stale version of your site.

Lets run through the steps needed to enable service workers for your project:

- `cd` into your project
- Run `npm run build`

And that's it! You should now have an `sw.js` file in your `www` folder and the code to register the service worker in your `www/index.html` file.

> The component starter by default does not have service workers enabled as a service worker is not needed for component collections

## Config

Stencil uses Workbox underneath, and by default generates a service worker from a config object using the `generateSW` mode. Therefore it supports all of the [Workbox generateSW config options](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config). Here is the default config Stencil uses:

```tsx
{
  globPatterns: [
    '**/*.{js,css,json,html}'
  ]
};
```

This configuration does pre-caching of all of your app's assets.

To modify this config you can use the `serviceWorker` param of your Stencil config. Here is an example:

```tsx
export const config: Config = {
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

## Using a custom service worker

Already have a service worker or want to include some custom code? We support that, too. By specifying a source file for your service worker, Stencil switches to the `injectManifest` mode of Workbox. That gives you full control over your service worker, while still allowing you to automatically inject a precache manifest.

Let's go through the steps needed for this functionality:

- First we need to pass the path to our custom service worker to the `swSrc` command in the serviceWorker config. Here is an example:

```tsx
export const config: Config = {
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

```tsx
importScripts('workbox-v3.1.0/Workbox-sw.js');

// your custom service worker code

// the precache manifest will be injected into the following line
self.workbox.precaching.precacheAndRoute([]);
```

This code imports the Workbox library, creates a new instance of the service worker and tells Workbox where to insert the pre-cache array.

### Showing a reload toast when an update is available

When a new service worker is available, by default, it will be downloaded and then go into a state of waiting to be activated. The new service worker won't take over until all tabs of the site are closed and the site is visited again. This is to avoid unexpected behavior from conflicts with files being served from cache, and works well in many cases.

If you want to give your users the option to immediately access the new site, a common way is to show them a toast, letting them know about the update and offering a "reload" button. The reload let's the new service worker take over, serving the fresh content, and triggers a page reload, to avoid cache issues.

The following example showcases this in combination with the Ionic framework, but the toast-related code should be easily adaptable to any UI. Add the following to your root component (commonly `app-root.tsx`).

```tsx
@Prop({ connect: 'ion-toast-controller' })
toastCtrl: HTMLIonToastControllerElement;

@Listen("window:swUpdate")
async onSWUpdate() {
  const registration = await navigator.serviceWorker.getRegistration();

  if (registration && registration.waiting) {
    // registration.waiting is the service worker waiting to be activiated.

    const toast = await this.toastCtrl.create({
      message: "New version available",
      showCloseButton: true,
      closeButtonText: "Reload"
    });

    await toast.present();
    await toast.onWillDismiss();

    registration.waiting.postMessage("skipWaiting");
    window.location.reload();
  }
}
```

The `swUpdate` event is emitted by Stencil every time a service worker is installed. When a service worker is waiting for registration, the toast is shown. After clicking the reload button, a message is posted to the waiting service worker, letting it know to take over. This message needs to be handled by a custom service worker (e. g. `src/sw.js`) to call `skipWaiting()`.

```tsx
// adjust this to whatever version Stencil currently works with
importScripts("workbox-v3.4.1/workbox-sw.js");

self.addEventListener("message", e => {
  if (e.data === "skipWaiting") {
    self.skipWaiting();
  }
});

// inject precache manifest
self.workbox.precaching.precacheAndRoute([]);
```

> Don't forget to set `swSrc` in your Stencil config.

### Handle push events

```tsx
/*
  This is our code to handle push events.
*/
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Notification';
  const options = {
    body: `${event.data.text()}`,
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
```
