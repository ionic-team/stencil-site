---
title: Custom Elements with Stencil
sidebar_label: dist-custom-elements
description: Custom Elements with Stencil
slug: /custom-elements
contributors:
  - adamdbradley
  - rwaskiewicz
  - splitinfinities
  - tanner-reits
---

# Custom Elements

The `dist-custom-elements` output target creates custom elements that directly extend `HTMLElement` and provides simple utility functions for easily defining these elements on the [Custom Element Registry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry). This output target excels in use in frontend frameworks and projects that will handle bundling, lazy-loading, and custom element registration themselves.

This target can be used outside of frameworks as well, if lazy-loading functionality is not required or desired. For using lazily loaded Stencil components, please refer to the [dist output target](/distribution).

To generate components using the `dist-custom-elements` output target, add it to a project's `stencil.config.ts` file like so:

```tsx title="stencil.config.ts"
import { Config } from '@stencil/core';

export const config: Config = {
  // Other top-level config options here
  outputTargets: [
    {
      type: 'dist-custom-elements',
      // Output target config options here
    },
    // Other output targets here
  ],
};
```

## Config

### copy

_default: `undefined`_

An array of [copy tasks](/copy-tasks) to be executed during the build process.

### customElementsExportBehavior

_default: `'default'`_

By default, the `dist-custom-elements` output target generates a single file per component, and exports each of those files individually.

In some cases, library authors may want to change this behavior, for instance to automatically define component children, provide a single file containing all component exports, etc.

This config option provides additional behaviors that will alter the default component export _OR_ custom element definition behaviors
for this target. The desired behavior can be set via the following in a project's Stencil config:

```ts
// stencil.config.ts
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'default' | 'auto-define-custom-elements' | 'bundle' | 'single-export-module',
    },
    // ...
  ],
  // ...
};
```

| Option                        | Description                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `default`                     | No additional re-export or auto-definition behavior will be performed.<br/><br/>This value will be used if no explicit value is set in the config, or if a given value is not a valid option.                                                                                                                                                                                                             |
| `auto-define-custom-elements` | A component and its children will be automatically defined with the `CustomElementRegistry` when the component's module is imported.                                                                                                                                                                                                                                                                      |
| `bundle`                      | A utility `defineCustomElements()` function is exported from the `index.js` file of the output directory. This function can be used to quickly define all Stencil components in a project on the custom elements registry.                                                                                                                                                                                |
| `single-export-module`        | All component and custom element definition helper functions will be exported from the `index.js` file in the output directory (see [Defining Exported Custom Elements](#defining-exported-custom-elements) for more information on this file's purpose). This file can be used as the root module when distributing your component library, see [below](#distributing-custom-elements) for more details. |

:::note
At this time, components that do not use JSX cannot be automatically
defined. This is a known limitation of Stencil that users should be aware of.
:::

### dir

_default: `'dist/components'`_

This config option allows you to change the output directory where the compiled output for this output target will be written.

### empty

_default: `true`_

Setting this flag to `true` will remove the contents of the [output directory](#dir) between builds.

### externalRuntime

_default: `true`_

Setting this flag to `true` results in the following behaviors:

1. Minification will follow what is specified in the [Stencil config](/config#minifyJs).
2. Filenames will not be hashed.
3. All imports from packages under `@stencil/core/*` will be marked as external and therefore not included in the generated Rollup bundle.

### generateTypeDeclarations

_default: `true`_

By default, Stencil will generate type declaration files (`.d.ts` files) as a part of the `dist-custom-elements` output target through the `generateTypeDeclarations` field on the target options. Type declaration files will be placed in the `dist/types` directory in the root of a Stencil project. At this time, this output destination is not able to be configured.

Setting this flag to `false` will not generate type declaration files for the `dist-custom-elements` output target.

:::note
When set to generate type declarations, Stencil respects the export behavior selected via `customElementsExportBehavior` and generates type declarations specific to the content of the generated [output directory's](#dir) `index.js` file.
:::

### includeGlobalScripts

_default: `false`_

Setting this flag to `true` will include [global scripts](/config#globalscript) in the bundle and execute them once the bundle entry point in loaded.

### minify

_default: `false`_

Setting this flag to `true` will cause file minification to follow what is specified in the [Stencil config](/config#minifyJs). _However_, if [`externalRuntime`](#externalruntime) is enabled, it will override this option and always result in minification being disabled.

## Consuming Custom Elements

By default, the custom elements files will be written to `dist/components/`. This directory can be configured using the output target's [`dir`](#dir) config.

The generated files will each export a component class and will already have the styles bundled. However, this build does not define the custom elements or apply any polyfills.
Static assets referenced within components will need to be set using `setAssetPath` (see [Making Assets Available](#making-assets-available)).

Below is an example of defining a custom element:

```tsx
import { defineCustomElement } from 'my-library/dist/components/hello-world';

defineCustomElement(); // Same as manually calling: customElements.define('hello-world', HelloWorld);
```

The output directory will also contain an `index.js` file which exports some helper methods by default. The contents of the file
will look something like:

```js
export { setAssetPath, setPlatformOptions } from '@stencil/core/internal/client';
```

:::note
The contents may look different if [`customElementsExportBehavior`](#customelementsexportbehavior) is specified!
:::

## Making Assets Available

For performance reasons, the generated bundle does not include [local assets](/assets) built within the JavaScript output, 
but instead it's recommended to keep static assets as external files. By keeping them external this ensures they can be requested on-demand, rather
than either welding their content into the JS file, or adding many URLs for the bundler to add to the output.
One method to ensure [assets](/assets) are available to external builds and http servers is to set the asset path using `setAssetPath()`.

The `setAssetPath()` function is used to manually set the base path where static assets can be found.
For the lazy-loaded output target the asset path is automatically set and assets copied to the correct
build directory. However, for custom elements builds, the `setAssetPath(path)` should be
used to customize the asset path depending on where they are found on the http server.

If the component's script is a `type="module"`, it's recommended to use `import.meta.url`, such
as `setAssetPath(import.meta.url)`. Other options include `setAssetPath(document.currentScript.src)`, or using a bundler's replace plugin to
dynamically set the path at build time, such as `setAssetPath(process.env.ASSET_PATH)`.

```tsx
import { setAssetPath } from 'my-library/dist/components';

setAssetPath(document.currentScript.src);
```

Make sure to copy the assets over to a public directory in your app. This configuration depends on how your script is bundled, or lack of
bundling, and where your assets can be loaded from. How the files are copied to the production build directory depends on the bundler or tooling.
The configs below provide examples of how to do this automatically with popular bundlers.

## Distributing Custom Elements

See our docs on [publishing a component library](/publishing) for information on setting up the library's `package.json` file and publishing to a package manager.

By default, custom elements will need to be imported from the [output directory](#dir) specified on the output target config:

```tsx
import { MyComponent } from 'best-web-components/dist/components/my-component';
```

However, the `module` property in the `package.json` can be modified to point to the custom element output:

```tsx title="package.json"
{
  "module": "dist/components/index.js",
  "dependencies": {
    "@stencil/core": "latest"
  },
  ...
}
```

:::note
Be sure to set `@stencil/core` as a dependency of the package as well.
:::

As a result, components can alternatively be imported from the root of the published package:

```tsx
import { MyComponent } from 'best-web-components';
```

:::note
If you are distributing the output of both the
[`dist`](/distribution) and `dist-custom-elements` targets, then
it's up to you to choose which one of them should be available in the
`module` entry.
:::

### Usage in Typescript

If you plan to support consuming your component library in Typescript you'll
need to set `generateTypeDeclarations: true` on the your output target in
`stencil.config.ts`, like so:

```tsx title="stencil.config.ts"
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'dist-custom-elements',
      generateTypeDeclarations: true,
    },
    // ...
  ],
  // ...
};
```

Then you can set the `types` property in `package.json` so that consumers of
your package can find the type definitions, like so:

```tsx title="package.json"
{
  "module": "dist/components/index.js",
  "types": "dist/components/index.d.ts",
  "dependencies": {
    "@stencil/core": "latest"
  },
  ...
}
```

:::note
If you set the `dir` property on the output target config, replace `dist/components` in the above snippet with the path set in the config.
:::

## Example Bundler Configs

Instructions for consuming the custom elements bundle vary depending on the bundler you're using. These examples will help your users consume your components with webpack and Rollup.

The following examples assume your component library is published to NPM as `my-library`. You should change this to the name you actually publish your library with.

Users will need to install your library before importing them.

```bash npm2yarn
npm install my-library
```

### webpack.config.js

A webpack config will look something like the one below. Note how assets are copied from the library's `node_module` folder to `dist/assets` via the `CopyPlugin` utility. This is important if your library includes [local assets](/assets).

```js
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'node_modules/my-library/dist/my-library/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
      ],
    }),
  ],
};
```

### rollup.config.js

A Rollup config will look something like the one below. Note how assets are copied from the library's `node_module` folder to `dist/assets` via the `rollup-copy-plugin` utility. This is important if your library includes [local assets](/assets).

```js
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: [{ dir: path.resolve('dist/'), format: 'es' }],
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      extensions: ['.css'],
    }),
    copy({
      targets: [
        {
          src: path.resolve(__dirname, 'node_modules/my-library/dist/my-library/assets'),
          dest: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
  ],
};
```

## How is this different from the "dist" output target?

The `dist-custom-elements` builds each component as a stand-alone class that extends `HTMLElement`. The output is a standardized custom element with the styles already attached and without any of Stencil's lazy-loading. This may be preferred for projects that are already handling bundling, lazy-loading and defining the custom elements themselves.

The `dist` output target, on the other hand, is more for projects that want to allow components to lazy-load themselves, without having to setup bundling configurations to do so.

Luckily, all builds can be generated at the same time, using the same source code, and shipped in the same distribution. It would be up to the consumer of your component library to decide which build to use.

## Browser Support

If the library is to be used on IE11 we recommend using the [`dist` output target](/distribution) instead since it will only load the required polyfills on-demand. The `dist-custom-elements` is only recommended for modern browsers that already support Custom Elements, Shadow DOM, and CSS Variables (basically not IE11 or Edge 12-18). If this build is going to be used within legacy browsers then the project consuming these components will have to provide its own polyfills, and correctly downlevel the output to ES5.

:::info
As of Stencil v3, legacy browser support is deprecated, and will be removed in a future major version of Stencil.
:::

Good news is that these are already widely supported for modern web development:

- [Custom Elements Support](https://caniuse.com/#feat=custom-elementsv1)
- [Shadow DOM Support](https://caniuse.com/#feat=shadowdomv1)
- [CSS Variables Support](https://caniuse.com/#feat=css-variables)
- [ES Modules](https://caniuse.com/#feat=es6-module)
- [async/await](https://caniuse.com/#feat=async-functions)
