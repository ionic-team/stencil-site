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

Depending on which libraries a project is dependent on, the [rollup-plugin-node-builtins](https://www.npmjs.com/package/rollup-plugin-node-builtins) plugin may be required. In such cases, an error message similar to the following will be displayed at build time.

```
[ ERROR ]  Bundling Node Builtin
           For the import "crypto" to be bundled from
           commonjs-external:crypto, ensure the "rollup-plugin-node-builtins"
           plugin is installed and added to the stencil config plugins. Please
           see the bundling docs for more information.
```

In some cases, the [rollup-plugin-node-globals](https://www.npmjs.com/package/rollup-plugin-node-globals) plugin may also be required.

Here is an example `stencil.config.ts` file that includes both plugins.

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
