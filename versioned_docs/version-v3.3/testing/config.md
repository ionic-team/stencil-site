---
title: Testing Config
sidebar_label: Config
description: Testing Config
slug: /testing-config
---

# Testing Config

The `testing` config setting in `stencil.config.ts` specifies an object that corresponds to the jest configuration that should be used in your tests. Stencil provides a default configuration, which you likely won't need to edit, however it can be extended with the same configuration options as Jest. See the [Configuring Jest Guide](https://jestjs.io/docs/en/configuration.html) for configuration details.

:::note
Keep in mind that the usual way of configuring Jest (`package.json` and `jest.config.js`) is not used with the `stencil testing` command. Jest can still be used, but configuring the presets, transpilation and setting up the correct commands must be done by the project.
:::

Some additional Stencil specific options may be set here as well for configuring the e2e tests:

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
   * Whether to run browser e2e tests in headless mode. 
   * 
   * `headless` is an argument passed through to Puppeteer (which is passed to Chrome) for
   * end-to-end testing. Prior to Chrome v112, `headless` was treated like a boolean flag.
   * Starting with Chrome v112, 'new' is an accepted option to support Chrome's new
   * headless mode.
   * 
   * The following values are accepted:
   * - "new" - enables the "new" headless mode, starting with Chrome 112
   * - `true` - enables the "old" headless mode, prior to Chrome 112
   * - `false` - enables the "headful" mode
   * 
   * Stencil will default to `true` (the old headless mode) if no value is provided.
   * 
   * In the future, Chrome will enable the new headless mode by default, even when `true`
   * is provided.
   *
   * {@see https://developer.chrome.com/articles/new-headless/}
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
   * For a complete list please see: https://github.com/puppeteer/puppeteer/blob/main/src/DeviceDescriptors.ts
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
