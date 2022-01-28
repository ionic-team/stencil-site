---
title: Custom Elements with Stencil
description: Custom Elements with Stencil
url: /docs/custom-elements
contributors:
  - adamdbradley
  - rwaskiewicz
  - splitinfinities
---

# Custom Elements

The `dist-custom-elements` output target is used to generate custom elements in a more optimized way for tree shaking, and its the recommended approach when using any frontend framework integrations. For example, if a component library has 100 components, but an external project only imported one component from the directory, then only the code used by that one component would be pulled into the project. This is due to Stencil's use of ES Modules and the compiler generating friendly code for bundlers to parse and understand.

```tsx
outputTargets: [
  {
    type: 'dist-custom-elements',
  },
];
```

## Defining Exported Custom Elements

By default, the custom elements files will be written to `dist/components/index.js`. This directory can be configured using the output target's `dir` config. The generated `index.js` file contains exports to each component class and will have their styles included within the bundle. However, this build does not automatically define the custom elements or apply any polyfills.

Below is an example of defining a custom element:

```tsx
import { HelloWorld } from 'my-library/dist/components/hello-world';

customElements.define('hello-world', HelloWorld);
```

The generated files will export each component class and will already have the styles bundled. However, it does not define the custom elements or apply any polyfills. Any dependencies of your imported component will need to be loaded as well. 

## Config

### autoDefineCustomElements

By default, consumers of the `custom-elements` output target need to either register each Stencil component in the 
bundle manually, or call a convenience method, `defineCustomElements()`, that is exported as a part of the bundle to
define every component in the bundle. This behavior can be cumbersome, especially when only a handful of components are 
needed and/or those components have several child components (and their children have children, etc.).

Setting this flag to `true` will recursively define all children components for a Stencil component when it is
registered. Users of this flag should note that this may increase their bundle size by automatically defining &
registering child components.

This flag defaults to `false` when omitted from a Stencil configuration file.

> Note: At this time, components created not using JSX may not be automatically defined. This is a known limitation of the API and users should be aware of it

## Making Assets Available

For performance reasons, the generated bundle does not include [local assets](/docs/local-assets) built within the JavaScript output, 
but instead it's recommended to keep static assets as external files. By keeping them external this ensures they can be requested on-demand, rather
than either welding their content into the JS file, or adding many URLs for the bundler to add to the output. 
One method to ensure [local assets](/docs/local-assets) are available to external builds and http servers is to set the asset path using `setAssetPath()`.

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

Your component library can be easily distributed on NPM, similar to how [`@ionic/core`](https://www.npmjs.com/package/@ionic/core) does it. From there, consumers of your library can decide how to import your library into their project. For the `dist-custom-elements`, the default import location would be `my-library/dist/components`, but this can get further configured within the `package.json` file.

To make the custom elements index the entry module for a package, set the `module` property in `package.json` to:

Also be sure to set `@stencil/core` as a dependency of the package.

```tsx
{
  "module": "dist/components/index.js",
  "dependencies": {
    "@stencil/core": "latest"
  },
  ...
}
```

Note: If you are distributing both the `dist` and `dist-custom-elements`, then it's up to you to choose which one of them should be available in the `module` entry.

Now you can publish your library to [Node Package Manager (NPM)](https://www.npmjs.com/). For more information about setting up the `package.json` file, and publishing, see: [Publishing Component Library To NPM](/docs/publishing).

## Example Bundler Configs

Instructions for consuming the custom elements bundle vary depending on the bundler you're using. These examples will help your users consume your components with webpack and Rollup.

The following examples assume your component library is published to NPM as `my-library`. You should change this to the name you actually publish your library with.

Users will need to install your library before importing them.

```bash
npm install my-library
```

### webpack.config.js

A webpack config will look something like the one below. Note how assets are copied from the library's `node_module` folder to `dist/assets` via the `CopyPlugin` utility. This is important if your library includes [local assets](/docs/local-assets).

```javascript
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

A Rollup config will look something like the one below. Note how assets are copied from the library's `node_module` folder to `dist/assets` via the `rollup-copy-plugin` utility. This is important if your library includes [local assets](/docs/local-assets).

```javascript
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

## How is this different from the "dist" and the "dist-custom-element-bundle" output targets?

The `dist-custom-elements` builds each component as a stand-alone class that extends `HTMLElement`. The output is a standardized custom element with the styles already attached and without any of Stencil's lazy-loading. This may be preferred for projects that are already handling bundling, lazy-loading and defining the custom elements themselves.

The `dist-custom-elements-bundle` is nearly the same as `dist-custom-elements`, but has been deprecated in [Stencil v2.12.0](https://github.com/ionic-team/stencil/releases/tag/v2.12.0) in favor of `dist-custom-elements`. Stencil's React, Vue, and Angular output targets use the `dist-custom-elements` for improved tree-shaking features. You can also use this single file for low barrier-to-entry apps where you don't depend on IE11 or older Edge versions. 

The `dist` output target, on the other hand, is more for projects that want to allow components to lazy-load themselves, without having to setup bundling configurations to do so.

Luckily, all builds can be generated at the same time, using the same source code, and shipped in the same distribution. It would be up to the consumer of your component library to decide which build to use.

## Browser Support

If the library is to be used on IE11 we recommend using the [`dist` output target](/docs/distribution) instead since it will only load the required polyfills on-demand. The `dist-custom-elements` is only recommended for modern browsers that already support Custom Elements, Shadow DOM, and CSS Variables (basically not IE11 or Edge 12-18). If this build is going to be used within legacy browsers then the project consuming these components will have to provide its own polyfills, and correctly downlevel the output to ES5.

Good news is that these are already widely supported for modern web development:

- [Custom Elements Support](https://caniuse.com/#feat=custom-elementsv1)
- [Shadow DOM Support](https://caniuse.com/#feat=shadowdomv1)
- [CSS Variables Support](https://caniuse.com/#feat=css-variables)
- [ES Modules](https://caniuse.com/#feat=es6-module)
- [async/await](https://caniuse.com/#feat=async-functions)
