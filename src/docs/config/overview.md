---
title: Stencil Config
description: Stencil Config
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

The `testing` config setting specifies an object that corresponds to the jest configuration that should be used in your tests. Stencil provides a default configuration, which you likely won't need to edit, however it can be extended with the same configuration options as Jest. See the [Configuring Jest Guide](https://jestjs.io/docs/en/configuration.html) for configuration details..

Some additional Stencil specific options may be set here as well for configuring the e2e tests

```tsx
export interface TestingConfig extends JestConfig {
  /**
   * The `allowableMismatchedPixels` value is used to determine an acceptable
   * number of pixels that can be mismatched before the image is considered
   * to have changes. Realistically, two screenshots representing the same
   * content may have a small number of pixels that are not identical due to
   * anti-aliasing, which is perfectly normal. If the `allowableMismatchedRatio`
   * is provided it will take precedence, otherwise `allowableMismatchedPixels`
   * will be used.
   */
  allowableMismatchedPixels?: number;

  /**
   * The `allowableMismatchedRatio` ranges from `0` to `1` and is used to
   * determine an acceptable ratio of pixels that can be mismatched before
   * the image is considered to have changes. Realistically, two screenshots
   * representing the same content may have a small number of pixels that
   * are not identical due to anti-aliasing, which is perfectly normal. The
   * `allowableMismatchedRatio` is the number of pixels that were mismatched,
   * divided by the total number of pixels in the screenshot. For example,
   * a ratio value of `0.06` means 6% of the pixels can be mismatched before
   * the image is considered to have changes. If the `allowableMismatchedRatio`
   * is provided it will take precedence, otherwise `allowableMismatchedPixels`
   * will be used.
   */
  allowableMismatchedRatio?: number;

  /**
   * Matching threshold while comparing two screenshots. Value ranges from `0` to `1`.
   * Smaller values make the comparison more sensitive. The `pixelmatchThreshold`
   * value helps to ignore anti-aliasing. Default: `0.1`
   */
  pixelmatchThreshold?: number;

  /**
   * Additional arguments to pass to the browser instance.
   */
  browserArgs?: string[];

  /**
   * Path to a Chromium or Chrome executable to run instead of the bundled Chromium.
   */
  browserExecutablePath?: string;

  /**
   * Whether to run browser e2e tests in headless mode. Defaults to true.
   */
  browserHeadless?: boolean;

  /**
   * Slows down e2e browser operations by the specified amount of milliseconds.
   * Useful so that you can see what is going on.
   */
  browserSlowMo?: number;

  /**
   * Array of browser emulations to be using during e2e tests. A full e2e
   * test is ran for each emulation.
   */
  emulate?: EmulateConfig[];

  /**
   * Path to the Screenshot Connector module.
   */
  screenshotConnector?: string;
}

export interface EmulateConfig {
  /**
   * Predefined device descriptor name, such as "iPhone X" or "Nexus 10".
   * For a complete list please see: https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js
   */
  device?: string;

  /**
   * User-Agent to be used. Defaults to the user-agent of the installed Puppeteer version.
   */
  userAgent?: string;

  viewport?: EmulateViewport;
}


export interface EmulateViewport {

  /**
   * Page width in pixels.
   */
  width: number;

  /**
   * page height in pixels.
   */
  height: number;

  /**
   * Specify device scale factor (can be thought of as dpr). Defaults to 1.
   */
  deviceScaleFactor?: number;

  /**
   * Whether the meta viewport tag is taken into account. Defaults to false.
   */
  isMobile?: boolean;

  /**
   * Specifies if viewport supports touch events. Defaults to false
   */
  hasTouch?: boolean;

  /**
   * Specifies if viewport is in landscape mode. Defaults to false.
   */
  isLandscape?: boolean;

}
```
