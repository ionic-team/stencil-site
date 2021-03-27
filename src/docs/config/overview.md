---
title: Config
description: Config
url: /docs/config
contributors:
  - adamdbradley
  - jthoms1
  - flawyte
  - BDav24
  - simonhaenisch
---

# Stencil Config

In most cases, the `stencil.config.ts` file does not require any customization since Stencil comes with great default values out-of-the-box. In general, it's preferred to keep the config as minimal as possible. In fact, you could even delete the `stencil.config.ts` file entirely and an app would compile just fine. But at the same time, the compiler can be configured at the lowest levels using this config. Below are the many *optional* config properties.

Example `stencil.config.ts`:

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'MyApp',
  srcDir: 'src'
};
```

## buildEs5

Sets if the ES5 build should be generated or not. It defaults to `false`. Setting `true` will also create es5 builds for both dev and prod modes. Setting `buildEs5` to `prod` will only build ES5 in prod mode. Basically if the app does not need to run on legacy browsers (IE11 and Edge 18 and below), it's safe to use the default respectively, `buildEs5` set  to `false`, which will also speed up production build times. In addition to creating es5 builds, apps may also be interested in enable runtime options to __support__ legacy browsers. See [config extras](/docs/config-extras) for more information.

```tsx
buildEs5: boolean | 'prod'
```

## bundles

By default, Stencil will statically analyze the application and generate a component graph of how all the components are interconnected. From the component graph it is able to best decide how components should be grouped depending on their usage with one another within the app. By doing so it's able to bundle components together in order to reduce network requests. However, bundles can be manually generated using the `bundles` config.

The `bundles` config is an array of objects that represent how components are grouped together in lazy-loaded bundles. This config is rarely needed as Stencil handles this automatically behind the scenes.

```tsx
bundles: [
  { components: ['ion-button'] },
  { components: ['ion-card', 'ion-card-header'] }
]
```


## enableCache

*default: `true`*

Stencil will cache build results in order to speed up rebuilds. To disable this feature, set `enableCache` to `false`.

```tsx
enableCache: true
```


## globalScript

The global script config option takes a file path as a string.

The global script runs once before your library/app loads, so you can do things like setting up a connection to an external service or configuring a library you are using.

The code to be executed should be placed within a default function that is exported by the global script. Ensure all of the code in the global script is wrapped in the function that is exported:

```javascript
export default function() { // or export default async function()
  initServerConnection();
}
```

> The exported function can also be `async`.

## globalStyle

Stencil is traditionally used to compile many components into an app, and each component comes with its own compartmentalized styles. However, it's still common to have styles which should be "global" across all components and the website. A global CSS file is often useful to set [CSS Variables](../components/styling).

Additionally, the `globalStyle` config can be used to precompile styles with Sass, PostCss, etc.

Below is an example folder structure containing a webapp's global css file, named `app.css`.

```bash
src/
  components/
  global/
    app.css
```

The global style config takes a file path as a string. The output from this build will go to the `buildDir`. In this example it would be saved to `www/build/app.css`.

```tsx
globalStyle: 'src/global/app.css'
```

Check out the [styling docs](https://stenciljs.com/docs/styling#global-styles) of how to use global styles in your app.


## hashFileNames

*default: `true`*

During production builds, the content of each generated file is hashed to represent the content, and the hashed value is used as the filename. If the content isn't updated between builds, then it receives the same filename. When the content is updated, then the filename is different. By doing this, deployed apps can "forever-cache" the build directory and take full advantage of content delivery networks (CDNs) and heavily caching files for faster apps.

```tsx
hashFileNames: true
```


## hashedFileNameLength

*default: `8`*

When the `hashFileNames` config is set to `true`, and it is a production build, the `hashedFileNameLength` config is used to determine how many characters the file name's hash should be.

```tsx
hashedFileNameLength: 8
```


## namespace

*default: `App`*

The `namespace` config is a `string` representing a namespace for the app. For apps that are not meant to be a library of reusable components, the default of `App` is just fine. However, if the app is meant to be consumed as a third-party library, such as `Ionic`, a unique namespace is required.

```tsx
namespace: "Ionic"
```


## outputTargets

Please see the [Output Target docs](/docs/output-targets).


## plugins

Please see the [Plugin docs](/docs/plugins).


## devServer

Please see the [Dev-Server docs](/docs/dev-server).


## preamble

*default: `undefined`*

The `preamble` configuration is a `string` that represents a preamble in the main file of the build. Help to persist a banner or add relevant information about the resulting build.

```tsx
preamble: 'Built with Stencil'
```


## srcDir

*default: `src`*

The `srcDir` config specifies the directory which should contain the source typescript files for each component. The standard for Stencil apps is to use `src`, which is the default.

```tsx
srcDir: 'src'
```


## taskQueue

*default: `async`*

Sets the task queue used by stencil's runtime. The task queue schedules DOM read and writes
across the frames to efficiently render and reduce layout thrashing. By default, the
`congestionAsync` is used. It's recommended to also try each setting to decide which works
best for your use-case. In all cases, if your app has many CPU intensive tasks causing the
main thread to periodically lock-up, it's always recommended to try
[Web Workers](https://stenciljs.com/docs/web-workers) for those tasks.

* `congestionAsync`: DOM reads and writes are scheduled in the next frame to prevent layout
  thrashing. When the app is heavily tasked and the queue becomes congested it will then
  split the work across multiple frames to prevent blocking the main thread. However, it can
  also introduce unnecesary reflows in some cases, especially during startup. `congestionAsync`
  is ideal for apps running animations while also simultaniously executing intesive tasks
  which may lock-up the main thread.

* `async`: DOM read and writes are scheduled in the next frame to prevent layout thrashing.
  During intensive CPU tasks it will not reschedule rendering to happen in the next frame.
  `async` is ideal for most apps, and if the app has many intensive tasks causing the main
  thread to lock-up, it's recommended to try [Web Workers](https://stenciljs.com/docs/web-workers)
  rather than the congestion async queue.

* `immediate`: Makes writeTask() and readTask() callbacks to be executed syncronously. Tasks
  are not scheduled to run in the next frame, but do note there is at least one microtask.
  The `immediate` setting is ideal for apps that do not provide long running and smooth
  animations. Like the async setting, if the app has intensive tasks causing the main thread
  to lock-up, it's recommended to try [Web Workers](https://stenciljs.com/docs/web-workers).

```tsx
taskQueue: 'async'
```

## testing

Please see the [testing config docs](/docs/testing-config).


## extras

Please see the [Extras docs](/docs/config-extras).
