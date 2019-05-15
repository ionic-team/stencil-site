---
title: Plugins
description: Plugins
url: /docs/addons
contributors:
  - jthoms1
---

# Plugins

## Stencil Sass

`@stencil/sass` is an npm package that enables to use [Sass](https://sass-lang.com/) in your web components built with Stencil. During development, this plugin will kick-in for .scss or .sass style urls, and precompile them to CSS.

### Installing

1. In your project directory run `npm install @stencil/sass --save`.
2. Require the plugin in your `stencil.config.ts` file.
2. Add the plugin to your `plugins` array:

```tsx
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  plugins: [
    sass()
  ]
}
```

### Options

Sass options can be passed to the plugin within `stencil.config.ts`, which are used directly by node-sass. Please reference the [node-sass documentation](https://www.npmjs.com/package/node-sass) for all available options.

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  plugins: [
    sass({ includePaths: ['/my-include-path'] })
  ]
};
```
