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

Stencil uses rollup under the hood to bundle your components. This guide will explain and recommend certain work-arounds for some of the most common bundling issues you might encounter.

## One component per module

Code-splitting in rollup happens at the module level, that means that it's not possible to code-split logic within the same module (`.ts` file). In order for Stencil to bundle your components in the most efficient way, you must declare a single component (class decorated with `@Component`) per *TypeScript* file, and the component itself **must** be unique `export`.

Modules that contain a component are entry-points, which means that no other module should import anything from them, ie. they cannot contain any shared logic imported by other components (modules).

The following example is **NOT** valid:

**src/components/my-cmp.tsx:**
```tsx
// This module has a component, you cannot export anything else
export function someUtilFunction() {
  console.log('do stuff');
}

@Component({
  tag: 'my-cmp'
})
export class MyCmp {}
```

In this case, the compiler will emit an error that looks like this:

```bash
[ ERROR ]  src/components/my-cmp.tsx:4:1
        To allow efficient bundling, modules using @Component() can only have a single export which is the component
        class itself. Any other exports should be moved to a separate file. For further information check out:
        https://stenciljs.com/docs/module-bundling

  L4:  export function someUtilFunction() {
  L5:   console.log('do stuff');
```

The solution is to move any shared functions or classes to a different `.ts` file, like this:

**src/utils.ts:**
```tsx
export function someUtilFunction() {
  console.log('do stuff');
}
```

**src/components/my-cmp.tsx:**
```tsx
import { someUtilFunction } from '../utils.ts';

@Component({
  tag: 'my-cmp'
})
export class MyCmp {}
```

**src/components/my-cmp-two.tsx:**

```tsx
import { someUtilFunction } from '../utils.ts';

@Component({
  tag: 'my-cmp-two'
})
export class MyCmpTwo {}
```


## Commonjs dependencies

Rollup depends on [ES modules](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) to properly tree-shake the module graph, unfortunately some third-party libraries ship their code using the [commonjs](https://requirejs.org/docs/commonjs.html) module system, which is not ideal.

Since `commonjs` libraries are still common today, Stencil comes with [`rollup-plugin-commonjs`](https://github.com/rollup/rollup-plugin-commonjs) already installed and configured.

At compiler-time, the `rollup-plugin-commonjs` plugin does a best-effort to **transform commonjs into ESM**, but this is not always a easy task. Commonjs is dynamic by nature, while ESM is static by design.

Stencil's config exposes a `commonjs` property that is passed down to the rollup commonjs plugin, you can use this setting to work around certain bundling issues.


### NamedModules: X is not exported by X

Sometimes, rollup is unable to properly static analyse `commonjs` modules, and it misses some named exports. Fortunatelly, there is a workaround we can use.

As we already know, `stencil.config.ts` exposes a `commonjs` property, in this case we can take advantage of [the *namedExports* property](https://github.com/rollup/rollup-plugin-commonjs#custom-named-exports).

Let's say, rollup fails, when trying to use the `hello` named export of the `commonjs-dep` module:

```tsx
// NamedModules: hello is not exported by commonjs-dep
import { hello } from 'commonjs-dep';
```

We can use the `config.commonjs.namedExports` setting in the `stencil.config.ts` file to work around the issue:

```tsx
export const config = {
  commonjs: {
    namedExports: {
       // commonjs-dep has a "hello" export
      'commonjs-dep': ['hello']
    }
  }
}
```

> We can set a map of namedExports for problematic dependencies, in this case, we are explicitally defining the named `hello` export in the `commonjs-dep` module.

For further information, check out the [rollup-plugin-commonjs docs](https://github.com/rollup/rollup-plugin-commonjs).

## Node polyfills

Depending on which libraries a project is dependent on, the [rollup-plugin-node-polyfills](https://www.npmjs.com/package/rollup-plugin-node-builtins) plugin may be required. In such cases, an error message similar to the following will be displayed at build time.

```bash
[ ERROR ]  Bundling Node Builtin
           For the import "crypto" to be bundled from 'problematic-dep',
           ensure the "rollup-plugin-node-polyfills" plugin is installed
           and added to the stencil config plugins.
```

This is caused by some third-party dependencies that use [Node APIs](https://nodejs.org/dist/latest-v10.x/docs/api/) that are not available in the browser, the `rollup-plugin-node-polyfills` plugin works by transparently polyfilling this missing APIs in the browser.

### 1. Install rollup-plugin-node-polyfills:

```bash
npm install rollup-plugin-node-polyfills --save-dev
```

### 2. Update the `stencil.config.ts` file including the plugin:

```tsx
import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  namespace: 'mycomponents',
  plugins: [
    nodePolyfills(),
  ]
};
```

## Strict mode

ES modules are always parsed in strict mode. That means that certain non-strict constructs (like octal literals) will be treated as syntax errors when Rollup parses modules that use them. Some older CommonJS modules depend on those constructs, and if you depend on them your bundle will blow up. There's basically nothing we can do about that.

Luckily, there is absolutely no good reason not to use strict mode for everything — so the solution to this problem is to lobby the authors of those modules to update them.

*Source: [https://github.com/rollup/rollup-plugin-commonjs#strict-mode](https://github.com/rollup/rollup-plugin-commonjs#strict-mode)*