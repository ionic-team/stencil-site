---
title: Module Bundling
description: Module Bundling
url: /docs/module-bundling
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
---

# Module Bundling

```TypeScript
import { Config } from '@stencil/core';
|import builtins from 'rollup-plugin-node-builtins';
|import globals from 'rollup-plugin-node-globals';

export const config: Config = {
  namespace: 'mycomponents',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ],
|  plugins: [
|    builtins(),
|    globals()
|  ]
};
```
