---
title: Distributing Web Components Built with Stencil
sidebar_label: dist
description: Distributing Web Components Built with Stencil
slug: /distribution
---

# Distribution Output Target

The `dist` type is to generate the component(s) as a reusable library that can be self-lazy loading, such as [Ionic](https://www.npmjs.com/package/@ionic/core). When creating a distribution, the project's `package.json` will also have to be updated. However, the generated bundle is treeshakable, ensuring that only imported components will end up in the build.

```tsx
outputTargets: [
  {
    type: 'dist'
  }
]
```


## How is this different from "dist-custom-elements" output target?

To start, Stencil was designed to lazy-load itself only when the component was actually used on a page. There are many benefits to this approach, such as simply adding a script tag to any page and the entire library is available for use, yet only the components actually used are downloaded. For example, [`@ionic/core`](https://www.npmjs.com/package/@ionic/core) comes with over 100 components, but a one webpage may only need `ion-toggle`. Instead of requesting the entire component library, or generating a custom bundle for just `ion-toggle`, the `dist` output target is able to generate a tiny entry build ready to load any of its components on-demand.

The `dist-custom-elements` on the other hand is a direct build of the custom element that extends `HTMLElement`, without any lazy-loading. The custom elements bundle does not apply polyfills, nor automatically define each custom elements. This may be preferred for projects that will handle bundling, lazy-loading and defining the custom elements themselves.

Luckily, both builds can be generated at the same time, and shipped in the same distribution. It would be up to the consumer of your component library to decide which build to use.

## Config

### collectionDir

The `collectionDir` config specifies the output directory within the [distribution directory](#dir) where the transpiled output of Stencil components will be written.

This option defaults to `collection` when omitted from a Stencil configuration file.

### dir

The `dir` config specifies the public distribution directory. This directory is commonly the `dist` directory found within [npm packages](https://docs.npmjs.com/getting-started/packages). This directory is built and rebuilt directly from the source files. Additionally, since this is a build target, all files will be deleted and rebuilt after each build, so it's best to always copy source files into this directory. It's recommended that this directory not be committed to a repository.

This option defaults to `dist` when omitted from a Stencil configuration file.

### empty

By default, before each build the `dir` directory will be emptied of all files. To prevent this directory from being emptied, change this value to `false`.

This flag defaults to `true` when omitted from a Stencil configuration file.

### isPrimaryPackageOutputTarget

_default: `false`_

If `true`, this output target will be used to validate `package.json` fields for your project's distribution. See the overview of [primary package output target validation](./01-overview.md#primary-package-output-target-validation)
for more information.

### transformAliasedImportPathsInCollection

*default: `true`*

This option will allow [path aliases](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) defined in a project's `tsconfig.json` to be transformed into relative paths in the code output under the [collectionDir](#collectiondir) subdirectory for this output target. This does not affect imports for external packages.

An example of path transformation could look something like:

```ts
// Source code
import * as utils from '@utils';

// Output code
import * as utils from '../path/to/utils';
```

:::tip
If using the `dist-collection` output target directly, the same result can be achieved using the [`transformAliasedImportPaths`](../config/01-overview.md#transformaliasedimportpaths) flag on the target's config.
:::

## Publishing

Next you can publish your library to [Node Package Manager (NPM)](https://www.npmjs.com/). For more information about setting up the `package.json` file, and publishing, see: [Publishing A Component Library](../guides/publishing.md).

## Distribution Options

Each output target's form of bundling and distribution has its own pros and cons. Luckily you can just worry about writing good source code for your component. Stencil will handle generating the various bundles and consumers of your library can decide how to apply your components to their external projects. Below are a few of the options.

### Script tag

- Use a script tag linked to a CDN copy of your published NPM module, for example: `<script type="module" src='https://cdn.jsdelivr.net/npm/my-name@0.0.1/dist/myname.js'></script>`.
- The initial script itself is extremely tiny and does not represent the entire library. It's only a small registry.
- You can use any or all components within your library anywhere within that webpage.
- It doesn't matter if the actual component was written within the HTML or created with vanilla JavaScript, jQuery, React, etc.
- Only the components used on that page will be requested and lazy-loaded.

### Importing the `dist` library using a bundler

- Run `npm install my-name --save`
- Add an `import` within the root component: `import my-component`;
- Stencil will automatically setup the lazy-loading capabilities for the Stencil library.
- Then you can use the element anywhere in your template, JSX, HTML etc.

### Importing the `dist` library into another Stencil app

- Run `npm install my-name --save`
- Add an `import` within the root component: `import my-component`;
- Stencil will automatically setup the lazy-loading capabilities for the Stencil library.
- Then you can use the element anywhere in your template, JSX, HTML etc.
