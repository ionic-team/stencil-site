---
title: Module Bundling
description: Module Bundling
url: /docs/module-bundling
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
  - manucorporat
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

1. Install both npm packages:

```bash
npm install rollup-plugin-node-builtins --save-dev
npm install rollup-plugin-node-globals --save-dev
```

And update the `stencil.config.ts` file including both plugins:

```tsx
import { Config } from '@stencil/core';
+ import builtins from 'rollup-plugin-node-builtins';
+ import globals from 'rollup-plugin-node-globals';

export const config: Config = {
  namespace: 'mycomponents',
+  plugins: [
+    builtins(),
+    globals()
+  ]
};
```
