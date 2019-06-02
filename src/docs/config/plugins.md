---
title: Plugin Config
description: Plugin Config
url: /docs/plugins
contributors:
  - adamdbradley
  - jthoms1
  - mgalic
---

# Plugins

The `plugins` config can be used to add your own [Rollup](https://rollupjs.org) plugins. By default, Stencil does not come with `Sass` or `PostCss` support. However, either can be added using the `plugin` array.

```tsx
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  plugins: [
    sass()
  ]
};
```


### Related Plugins

- [@stencil/less](https://www.npmjs.com/package/@stencil/less)
- [@stencil/postcss](https://www.npmjs.com/package/@stencil/postcss)
- [@stencil/sass](https://www.npmjs.com/package/@stencil/sass)
- [@stencil/stylus](https://www.npmjs.com/package/@stencil/stylus)
