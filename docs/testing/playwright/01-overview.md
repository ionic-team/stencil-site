---
title: Playwright Overview
sidebar_label: Overview
---

:::note
The Stencil Playwright adapter is designed to only work with **version 4.13.0 and higher** of Stencil!
:::

[Playwright](https://playwright.dev/) is an automated end-to-end testing framework built to run on all modern browser engines and operating systems.
Playwright leverages the DevTools protocol to provide reliable tests that run in actual browsers.

## Set Up

To add Playwright to an existing Stencil project, leverage the [Stencil Playwright testing adapter](https://www.npmjs.com/package/@stencil/playwright). This
is a tool built by the Stencil team to help Stencil and Playwright work better together. The best part is you'll write your tests using the same APIs
as defined and documented by Playwright. So, be sure to [check out their documentation](https://playwright.dev/docs/writing-tests) for help writing your first tests!

To install the Stencil Playwright adapter in an existing Stencil project, follow these steps:

1. Install the necessary dependencies:

   ```bash npm2yarn
   npm i @stencil/playwright @playwright/test --save-dev
   ```

1. Install the Playwright browser binaries:

   ```bash
   npx playwright install
   ```

1. Create a Playwright config at the root of your Stencil project:

   ```ts title="playwright.config.ts"
   import { expect } from '@playwright/test';
   import { matchers, createStencilPlaywrightConfig } from '@stencil/playwright';

   // Add custom Stencil matchers to Playwright assertions
   expect.extend(matchers);

   export default createStencilPlaywrightConfig({
     // Overwrite Playwright config options here
   });
   ```

   The `createStencilPlaywrightConfig()` is a utility that will create a default Playwright configuration based on your project's Stencil config. Read
   more about how to use this utility in the [API docs](./03-api.md#createstencilplaywrightconfig-function).

1. Ensure the Stencil project has a [`www` output target](../../output-targets/www.md). Playwright relies on pre-compiled output running in a dev server
   to run tests against. When using the `createStencilPlaywrightConfig()` helper, a configuration for the dev server will be automatically created based on
   the Stencil project's `www` output target config and [dev server config](../../config/dev-server.md). If no `www` output target is specified,
   tests will not be able to run.

1. When building your Stencil project, you may encounter an error like `Property 'asyncDispose' does not exist on type 'SymbolConstructor'`. To resolve
   this error, update your project's `tsconfig.json` to add the `ESNext.Disposable` option to the `lib` array:

   ```ts title="tsconfig.json"
   {
     lib: [
       ...,
       "ESNext.Disposable"
     ],
     ...
   }
   ```
