# Understanding stencil.config.js

The `stencil.config.js` file is used by the compiler at build time. It comes with many configuration options, but in many cases the defaults will do and the config can (and should) stay small.


### Bundles

The `bundles` property is the most useful config since it allows each app to bundle similar components together. While every component "can" be entirely stand-alone, there are many cases where grouping certain components together makes sense. For example, Ionic has an `ion-card` component, along with `ion-card-header` and `ion-card-content`. If an app uses `ion-card`, chances are it'll also need to use `ion-card-content`. All things considered, it's best to place each of these components bundled in one file.

```javascript
exports.config = {
  bundles: [
    { components: ['ion-card', 'ion-card-header', 'ion-card-content'] }
  ]
}
```


### Collections

An application can work stand-alone, without any external components. However, to include
an external library of components, apps can use `collections`. For example, Ionic is a collection
which can be used. Collections can be published and installed via `npm`.

```javascript
exports.config = {
  colllections: [
    '@ionic/core'
  ]
}
```


### Advanced Config Properties

| Config Property        | Description                                        | Default           |
| ---------------------- | -------------------------------------------------- | ----------------- |
| `src`                  | Source directory of typescript files.              | `src`             |
| `buildDir`             | Build directory for output files.                  | `www/build`       |
| `indexHtmlSrc`         | Source index.html file.                            | `src/index.html`  |
| `indexHtmlBuild`       | Output of the build's index.html file.             | `www/index.html`  |
| `prerenderIndex`       | Config for prerendering the index.html file.       | [Prerender Config](#prerender-index) |
| `namespace`            | App namespace.                                     | `App`             |
| `publicPath`           | Client-side url path to the build directory.       | `build/`          |
| `generateDistribution` | Generate a library collection for sharing.         | `false`           |
| `generateWWW`          | Generate a WWW directory                           | `true`
| `collectionDir`        | Collection directory for distribution.             | `dist/collection` |
| `hashFileNames`        | If filenames should be hashed or not in prod mode. | `true`            |
| `hashedFileNameLength` | Number of hash characters in the filenames.        | `8`               |
| `globalScript`         | Global source file to be bundled with the core.    | `null`            |
| `globalStyle`          | Global stylesheet to be bundled with the core.     | `null`            |
| `serviceWorker`        | Service worker workbox config                      | [Service Worker Config](#service-worker) |

### Prerender Index

By default, `www/index.html` (the `indexHtmlSrc` config property), is automatically prerendered.
This means that the index.html already has all of the HTML the client-side code "would" have created,
except it was done at build-time. It also inlines the exact CSS needed for the HTML, and inlines
the loader script. Prerendering the index.html file allows for blazing fast startup times, while also
allowing the app to become a Single Page App.

| Prefrender Config     | Description                                                 | Default |
| --------------------- | ----------------------------------------------------------- | ------- |
| `inlineLoaderScript`  | Inline the loader script.                                   | `true`  |
| `inlineStyles`        | Inline the styles from the components used.                 | `true`  |
| `removeUnusedStyles`  | If styles are inlined, remove any styles not actually used. | `true`  |
| `reduceHtmlWhitepace` | Reduce any unneeded HTML whitespace.                        | `true`  |


#### Default Prerender Index Config Property

```javascript
exports.config = {
  prerenderIndex: {
    inlineLoaderScript: true,
    inlineStyles: true,
    removeUnusedStyles: true,
    reduceHtmlWhitepace: true
  }
}
```

To disable prerendering entirely, set `prerenderIndex` to `null`.

```javascript
exports.config = {
  prerenderIndex: null
}
```


### Global

In general, apps should strive to not have anything that is global across all components. Components should be self-contained and should not be dependent on anything else. That said, there may be a few cases where a global property or object is needed. In Ionic's case, all components need access to its global `config` object. By using the `global` config property, Ionic's stencil.config.js file points to an entry typescript file, that gets bundled into the core.


### Service Worker

The service worker config can use any of the Workbox config options found [here](https://workboxjs.org/reference-docs/latest/module-workbox-build.html#.Configuration). Our default config is as follows: 

```
{
  skipWaiting: true,
  clientsClaim: true,
  globPatterns: [
    '**/*.{js,css,json,html,ico,png,svg}'
  ]
};
```