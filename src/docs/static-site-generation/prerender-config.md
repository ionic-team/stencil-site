---
title: Prerender Config
description: Prerender Config
url: /docs/prerender-config
contributors:
  - adamdbradley
  - ryan3E0
  - dgautsch
---


## Prerender Config for Static Site Generation (SSG)

As of `1.13.0`, the optional prerender config can be used while prerendering a `www` output target. The `prerender.config.ts` file can further update the parsed document of each page, before it is serialized to HTML.

Within `stencil.config.ts`, set the path to the prerendering config file path using the `prerenderConfig`
property, such as:

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      baseUrl: 'https://stenciljs.com/',
      prerenderConfig: './prerender.config.ts',
    }
  ]
};
```

Next, inside of the `prerender.config.ts` file, it should export a `config` object using the `PrerenderConfig` interface.

```tsx
import { PrerenderConfig } from '@stencil/core';
export const config: PrerenderConfig = {
  ...
};
```
