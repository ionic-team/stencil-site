---
title: React Integration with Stencil
sidebar_label: React
description: Learn how to wrap your components so that people can use them natively in React
slug: /react
---

# React Integration

**Supports: React v16.7+ • TypeScript 3.7+ • Stencil v2.9.0+**

Stencil can generate React component wrappers for your web components. This allows your Stencil components to be used within
a React application. The benefits of using Stencil's component wrappers over the standard web components include:

- Custom events will be handled correctly and correctly propagate through the React render tree
- Properties and attributes that are not a string or number will be correctly bound to the component

To generate these framework wrappers, Stencil provides an Output Target library called [`@stencil/react-output-target`](https://www.npmjs.com/package/@stencil/react-output-target) that can be added to your `stencil.config.ts` file. This also enables Stencil components to be used within e.g. Next.js or other React based application frameworks.

## Setup

### Project Structure

We recommend using a [monorepo](https://www.toptal.com/front-end/guide-to-monorepos) structure for your component library with component
wrappers. Your project workspace should contain your Stencil component library and the library for the generated React component wrappers.

An example project set-up may look similar to:

```
top-most-directory/
└── packages/
    ├── stencil-library/
    │   ├── stencil.config.js
    │   └── src/components/
    └── react-library/
        └── src/
            ├── components/
            └── index.ts
```

This guide uses Lerna for the monorepo, but you can use other solutions such as Nx, Turborepo, etc.

To use Lerna with this walk through, globally install Lerna:

```bash npm2yarn
npm install --global lerna
```

#### Creating a Monorepo

:::note
If you already have a monorepo, skip this section.
:::

```bash npm2yarn
# From your top-most-directory/, initialize a workspace
lerna init

# install dependencies
npm install

# install typescript and node types
npm install typescript @types/node --save-dev
```

#### Creating a Stencil Component Library

:::note
If you already have a Stencil component library, skip this section.
:::

From the `packages/` directory, run the following commands to create a Stencil component library:

```bash npm2yarn
npm init stencil components stencil-library
cd stencil-library
# Install dependencies
npm install
```

#### Creating a React Component Library

:::note
If you already have a React component library, skip this section.
:::

The first time you want to create the component wrappers, you will need to have a React library package to write to.

Run the following commands from the root directory of your monorepo to create a React component library:

```bash npm2yarn
# Create a project
lerna create react-library # fill out the prompts accordingly
cd packages/react-library

# Install core dependencies
npm install react react-dom typescript @types/react --save-dev
```

Lerna does not ship with a TypeScript configuration. At the root of the workspace, create a `tsconfig.json`:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "noImplicitAny": false,
    "removeComments": true,
    "noLib": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es6",
    "sourceMap": true,
    "lib": ["es6"]
  },
  "exclude": ["node_modules", "**/*.spec.ts", "**/__tests__/**"]
}
```

In your `react-library` project, create a project specific `tsconfig.json` that will extend the root config:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "lib": ["dom", "es2015"],
    "module": "es2015",
    "moduleResolution": "node",
    "target": "es2015",
    "skipLibCheck": true,
    "jsx": "react",
    "allowSyntheticDefaultImports": true,
    "declarationDir": "./dist/types"
  },
  "include": ["lib"],
  "exclude": ["node_modules"]
}
```

Update the generated `package.json` in your `react-library`, adding the following options to the existing config:

```diff
{
-  "main": "lib/react-library.js",
+  "main": "dist/index.js",
+  "module": "dist/index.js",
+  "types": "dist/types/index.d.ts",
  "scripts": {
-    "test": "node ./__tests__/react-library.test.js"
+    "test": "node ./__tests__/react-library.test.js",
+    "build": "npm run tsc",
+    "tsc": "tsc -p . --outDir ./dist"
-  }
+  },
   "files": [
-    "lib"
+    "dist"
   ],
+  "publishConfig": {
+    "access": "public"
+  },
+  "dependencies": {
+    "stencil-library": "*"
+  }
}
```

:::note
The `stencil-library` dependency is how Lerna knows to resolve the internal Stencil library dependency. See Lerna's documentation on
[package dependency management](https://lerna.js.org/docs/getting-started#package-dependency-management) for more information.
:::

### Adding the React Output Target

Install the `@stencil/react-output-target` dependency to your Stencil component library package.

```bash npm2yarn
# Install dependency
npm install @stencil/react-output-target --save-dev
```

In your project's `stencil.config.ts`, add the `reactOutputTarget` configuration to the `outputTargets` array:

```ts
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'stencil-library',
  outputTargets: [
    // By default, the generated proxy components will
    // leverage the output from the `dist` target, so we
    // need to explicitly define that output alongside the
    // React target
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    reactOutputTarget({
      componentCorePackage: 'stencil-library',
      proxiesFile: '../react-library/lib/components/stencil-generated/index.ts',
    }),
  ],
};
```

:::tip
The `proxiesFile` is the relative path to the file that will be generated with all of the React component wrappers. You will replace the
file path to match your project's structure and respective names. You can generate any file name instead of `index.ts`.

The `componentCorePackage` should match the `name` field in your Stencil project's `package.json`.
:::

See the [API section below](#api) for details on each of the output target's options.

:::note
In order to compile Stencil components optimized for server side rendering in e.g. Next.js applications that use [AppRouter](https://nextjs.org/docs/app), make sure to provide the [`hydrateModule`](#hydratemodule) property to the output target configuration.
:::

You can now build your Stencil component library to generate the component wrappers.

```bash npm2yarn
# Build the library and wrappers
npm run build
```

If the build is successful, you’ll see the new generated file in your React component library at the location specified by the `proxiesFile` argument.

### Add the Components to your React Component Library's Entry File

In order to make the generated files available within your React component library and its consumers, you’ll need to export everything from within your entry file. First, rename `react-library.js` to `index.ts`. Then, modify the contents to match the following:

```tsx
export * from './components/stencil-generated';
```

### Registering Custom Elements

To register your web components for the lazy-loaded (hydrated) bundle, you'll need to expose a method for registering the underlying Stencil
generated custom elements for the React proxy components to leverage. The easiest way to do this is to modify the React library's entry file
to re-export the Stencil loader's `defineCustomElements()` method. In your React library's entry file (`packages/react-library/lib/index.ts`),
add the following:

```diff
export * from "./components/stencil-generated";
+ export { defineCustomElements } from "stencil-library/loader";
```

### Link Your Packages (Optional)

:::note
If you are using a monorepo tool (Lerna, Nx, etc.), skip this section.
:::

Before you can successfully build a local version of your React component library, you will need to link the Stencil package to the React package.

From your Stencil project's directory, run the following command:

```bash npm2yarn
# Link the working directory
npm link
```

From your React component library's directory, run the following command:

```bash npm2yarn
# Link the package name
npm link name-of-your-stencil-package
```

The name of your Stencil package should match the `name` property from the Stencil component library's `package.json`.

Your component libraries are now linked together. You can make changes in the Stencil component library and run `npm run build` to propagate the
changes to the React component library.

:::tip
As an alternative to `npm link` , you can also run `npm install` with a relative path to your Stencil component library. This strategy, however, will
modify your `package.json` so it is important to make sure you do not commit those changes.
:::

## Consumer Usage

### Creating a Consumer React App

:::note
If you already have a React app, skip this section.
:::

From the `packages/` directory, run the following commands to create a starter React app:

<!-- TODO: see if we can convert this to use `npm2yarn` once related issues are resolved -->
<!-- See https://github.com/facebook/docusaurus/issues/5861 for more information -->

```bash
# Create the React app
npm create vite@latest my-app -- --template react-ts
# of if using yarn
yarn create vite my-app --template react-ts

cd ./my-app

# install dependencies
npm install
# or if using yarn
yarn install
```

You'll also need to link your React component library as a dependency. This step makes it so your React app will be able to correctly resolve imports from your React library. This
is easily done by modifying your React app's `package.json` to include the following:

```json
"dependencies": {
  "react-library": "*"
}
```

### Consuming the React Wrapper Components

This section covers how developers consuming your React component wrappers will use your package and component wrappers.

Before you can consume your React proxy components, you'll need to build your React component library. From `packages/react-library` run:

```bash npm2yarn
npm run build
```

To make use of your React component library in your React application, import your components from your React component library in the file where you want to use them.

```tsx
// App.tsx
import './App.css';
import { MyComponent, defineCustomElements } from 'react-library';

defineCustomElements();

function App() {
  return (
    <div className="App">
      <MyComponent first="Your" last="Name" />
    </div>
  );
}

export default App;
```

## API

### componentCorePackage

**Optional**

**Default: The `components.d.ts` file in the Stencil project's `package.json` types field**

**Type: `string`**

The name of the Stencil package where components are available for consumers (i.e. the value of the `name` property in your Stencil component library's `package.json`).
This is used during compilation to write the correct imports for components.

For a starter Stencil project generated by running:

```bash npm2yarn
npm init stencil component my-component-lib
```

The `componentCorePackage` would be set to:

```ts
// stencil.config.ts

export const config: Config = {
  ...,
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: 'my-component-lib',
      // ... additional config options
    })
  ]
}
```

Which would result in an import path like:

```js
import { defineCustomElement as defineMyComponent } from 'my-component-lib/components/my-component.js';
```

:::note
Although this field is optional, it is _highly_ recommended that it always be defined to avoid potential issues with paths not being generated correctly
when combining other API arguments.
:::

### customElementsDir

**Optional**

**Default: 'dist/components'**

**Type: `string`**

If [includeImportCustomElements](#includeimportcustomelements) is `true`, this option can be used to specify the directory where the generated
custom elements live. This value only needs to be set if the `dir` field on the `dist-custom-elements` output target was set to something other than
the default directory.

### excludeComponents

**Optional**

**Default: `[]`**

**Type: `string[]`**

This lets you specify component tag names for which you don't want to generate React wrapper components. This is useful if you need to write framework-specific versions of components. For instance, in Ionic Framework, this is used for routing components - like tabs - so that
Ionic Framework can integrate better with React Router.

### hydrateModule

**Optional**

**Type: `string`**

Enable React server side rendering (short SSR) for e.g. [Next.js](https://nextjs.org/) applications by providing an import path to the [hydrate module](../guides/hydrate-app.md) of your Stencil project that is generated through the `dist-hydrate-script` output target, e.g.:

```ts title="stencil.config.ts"
import type { Config } from '@stencil/core';

/**
 * excerpt from the Stencil example project:
 * https://github.com/ionic-team/stencil-ds-output-targets/tree/cb/nextjs/packages/example-project
 */
export const config: Config = {
  namespace: 'component-library',
  outputTargets: [
    reactOutputTarget({
      outDir: '../next-app/src/app',
      hydrateModule: 'component-library/hydrate'
    }),
    {
      type: 'dist-hydrate-script',
      dir: './hydrate',
    },
    // ...
  ],
};
```

:::note
Next.js support is only available for applications that use the [Next.js App Router](https://nextjs.org/docs/app).
:::

### includeDefineCustomElements

**Optional**

**Default: `true`**

**Type: `boolean`**

If `true`, all Web Components will automatically be registered with the Custom Elements Registry. This can only be used when lazy loading Web Components and will not work when `includeImportCustomElements` is `true`.

### includeImportCustomElements

**Optional**

**Default: `undefined`**

**Type: `boolean`**

If `true`, the output target will import the custom element instance and register it with the Custom Elements Registry when the component is imported inside of a user's app. This can only be used with the [Custom Elements](../output-targets/custom-elements.md) output and will not work with lazy loaded components.

:::note
The configuration for the [Custom Elements](../output-targets/custom-elements.md) output target must set the
[export behavior](../output-targets/custom-elements.md#customelementsexportbehavior) to `single-export-module` for the wrappers to generate correctly.
:::

### includePolyfills

**Optional**

**Default: `true`**

**Type: `boolean`**

If `true`, polyfills will automatically be imported and the `applyPolyfills` function will be called in your proxies file. This can only be used when lazy loading Web Components and will not work when `includeImportCustomElements` is enabled.

### loaderDir

**Optional**

**Default: `/dist/loader`**

**Type: `string`**

The path to where the `defineCustomElements` helper method exists within the built project. This option is only used when `includeDefineCustomElements` is enabled.

### proxiesFile

**Required**

**Type: `string`**

This parameter allows you to name the file that contains all the component wrapper definitions produced during the compilation process. This is the first file you should import in your React project.

## FAQ's

### Do I have to use the `dist` output target?

No! By default, this output target will look to use the `dist` output, but the output from `dist-custom-elements` can be used alternatively.

To do so, simply set the `includeImportCustomElements` option in the output target's config and ensure the
[custom elements output target](../output-targets/custom-elements.md) is added to the Stencil config's output target array:

```ts
// stencil.config.ts

export const config: Config = {
  ...,
  outputTargets: [
    // Needs to be included
    {
      type: 'dist-custom-elements'
    },
    reactOutputTarget({
      componentCorePackage: 'component-library',
      proxiesFile: '{path to your proxy file}',
      // This is what tells the target to use the custom elements output
      includeImportCustomElements: true
    })
  ]
}
```

Now, all generated imports will point to the default directory for the custom elements output. If you specified a different directory
using the `dir` property for `dist-custom-elements`, you need to also specify that directory for the React output target. See
[the API section](#customelementsdir) for more information.

In addition, all the Web Components will be automatically defined as the generated component modules are bootstrapped.

### TypeError: Cannot read properties of undefined (reading 'isProxied')

If you encounter this error when running the React application consuming your proxy components, you can set the [`enableImportInjection`](../config/extras.md#enableimportinjection)
flag on the Stencil config's `extras` object. Once set, this will require you to rebuild the Stencil component library and the React component library.

### What is the best format to write event names?

Event names shouldn’t include special characters when initially written in Stencil. Try to lean on using camelCased event names for interoperability between frameworks.
