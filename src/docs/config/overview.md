---
title: Config
description: Config
url: /docs/config
contributors:
  - adamdbradley
  - jthoms1
  - flawyte
  - BDav24
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


## globalStyle

Stencil is traditionally used to compile many components into an app, and each component comes with its own compartmentalized styles. However, it's still common to have styles which should be "global" across all components and the website. A global CSS file is often useful to set [CSS Variables](../components/styling).

Additionally, the `globalStyle` config can be used to precompile styles with Sass, PostCss, etc.

Below is an example folder structure containing a webapp's global css file, named `app.css`.

```bash
src/
  components/
  globals/
    app.css
```

The global style config takes a file path as a string. The output from this build will go to the `buildDir`. In this example it would be saved to `www/build/app.css`.

```tsx
globalStyle: 'src/globals/app.css'
```


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


## preamble

*default: `undefined`*

The `preamble` configuration is a `string` that represents a preamble in the main file of the build. Help to persist a banner or add relevant information about the resulting build.

```tsx
preamble: "Built with Stencil"
```


## srcDir

*default: `src`*

The `srcDir` config specifies the directory which should contain the source typescript files for each component. The standard for Stencil apps is to use `src`, which is the default.

```tsx
srcDir: 'src'
```


## excludeSrc

*default: `['**/test/**', '**/*.spec.*']`*

The `excludeSrc` config setting specifies a set of regular expressions that should be excluded from the build process.  The defaults are meant to exclude possible test files that you would not want to include in your final build.


## testing

Please see the [testing config docs](/docs/testing-config).
