---
title: React Integration with Stencil
description: Learn how to wrap your components so that people can use them natively in React
url: /docs/react
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
  - ErikSchierboom
  - brentertz
  - danawoodman
  - a-giuliano
  - rwaskiewicz
  - tanner-reits
---

# React Integration

**Supports: React v16.7+ • TypeScript 3.7+ • Stencil v2.9.0+**

Stencil can generate React component wrappers for your web components. This allows your Stencil components to be used within
a React application. The benefits of using Stencil's component wrappers over the standard web components include:

- Custom events will be handled correctly and correctly propagate through the React render tree
- Properties and attributes that are not a string or number will be correctly bound to the component

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

This guide uses Lerna for the monorepo, but you can use other solutions such as Nx, TurboRepo, etc.

To use Lerna with this walk through, globally install Lerna:

```bash
npm install --global lerna
# or if you are using yarn
yarn global add lerna
```

#### Creating a Monorepo

> If you already have a monorepo, skip this section.

```bash
# From your top-most-directory/, initialize a workspace
lerna init

# install typescript and node types
npm install typescript @types/node --save-dev
# or if you are using yarn
yarn add typescript @types/node --dev
```

#### Creating a Stencil Component Library

> If you already have a Stencil component library, skip this section.

From the `packages` directory, run the following commands to create a Stencil component library:

```bash
npm init stencil component stencil-library
cd stencil-library
# Install dependencies
npm install
# or if using yarn
yarn install
```

#### Creating a React Component Library

> If you already have a React component library, skip this section.

The first time you want to create the component wrappers, you will need to have a React library package to write to.

You can create your own React component library in the `packages` directory using a [toolchain](https://reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains) or from scratch ([this](https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe) guide walks through the entire process).

If you are using Lerna (or another monorepo tool), you may also need to update your React library's dependencies to reference the generated Stencil
library. See the Lerna documentation on [package dependency management](https://lerna.js.org/docs/getting-started#package-dependency-management) for more information. If you are not using a monorepo, you may want [link your packages](#link-your-packages-optional) for local development.

#### Adding the React Output Target

Install the `@stencil/react-output-target` dependency to your Stencil component library package.

```bash
# Install dependency
npm install @stencil/react-output-target --save-dev
# or if using yarn
yarn add @stencil/react-output-target --dev
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
    },
    reactOutputTarget({
      componentCorePackage: 'your-stencil-library-package-name',
      proxiesFile: '../react-library/src/components/stencil-generated/index.ts',
    }),
  ],
};
```

> The `proxiesFile` is the relative path to the file that will be generated with all of the React component wrappers. You will replace the
> file path to match your project's structure and respective names. You can generate any file name instead of `index.ts`.

See the [API section below](#api) for details on each of the output target's options.

You can now build your Stencil component library to generate the component wrappers.

```bash
# Build the library and wrappers
npm run build
# or if using yarn
yarn run build
```

If the build is successful, you’ll see the new generated file in your React component library at the location specified by the `proxiesFile` argument.

### Add the Components to your React Component Library's Entry File

In order to make the generated files available within your React component library and its consumers, you’ll need to export everything from within your entry file - commonly the `src/index.ts` file. To do this, you’ll write:

```tsx
export * from './components';
```

### Link Your Packages (Optional)

> If you are using a monorepo tool (Lerna, Nx, etc.), skip this section.

Before you can successfully build a local version of your React component library, you will need to link the Stencil package to the React package.

From your Stencil project's directory, run the following command:

```bash
# Link the working directory
npm link
# or if using yarn
yarn link
```

From your React component library's directory, run the following command:

```bash
# Link the package name
npm link name-of-your-stencil-package
# or if using yarn
yarn link name-of-your-stencil-package
```

The name of your Stencil package should match the `name` property from the Stencil component library's `package.json`.

Your component libraries are now linked together. You can make changes in the Stencil component library and run `npm run build` to propagate the
changes to the React component library.

> **NOTE:** As an alternative to `npm link` , you can also run `npm install` with a relative path to your Stencil component library. This strategy, however, will modify your `package.json` so it is important to make sure you do not commit those changes.

## Consumer Usage

This section covers how developers consuming your React component wrappers will use your package and component wrappers.

If you are developing and testing your React component library locally, you'll have to use `npm link` again to make your React component library available in your React application. If your components are published to npm, you can skip this step.

To link your React component library, navigate to your **React component library** and run

```bash
npm run build
npm link
```

To build your React component library and create a symlink to the project.

Navigate to your **React application directory** and run

```bash
npm link {React component library}
```

To make use of your React component library in your React application, import your components from your React component library in the file where you want to use them.

```tsx
// if your React component library has another name, replace 'component-library-react' with that name
import { MyComponent } from 'component-library-react';
```

With that, your component is now available to be used like any other React component.

## API

### componentCorePackage

**Optional**

**Default: The `components.d.ts` file in the Stencil project's `package.json` types field**

**Type: `string`**

The title of the Stencil package where components are available for consumers (i.e. the `name` property value in your Stencil project's `package.json`).
This is used during compilation to write the correct imports for components.

For a starter Stencil project generated by running:

```bash
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

> **NOTE:** Although this field is optional, it is _highly_ recommended that it always be defined to avoid potential issues with paths not being generated correctly when combining other API arguments.

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
Ionic Framework can integrate better with React's Router.

### includeDefineCustomElements

**Optional**

**Default: `true`**

**Type: `boolean`**

If `true`, all Web Components will automatically be registered with the Custom Elements Registry. This can only be used when lazy loading Web Components and will not work when `includeImportCustomElements` is `true`.

### includeImportCustomElements

**Optional**

**Default: `undefined`**

**Type: `boolean`**

If `true`, the output target will import the custom element instance and register it with the Custom Elements Registry when the component is imported inside of a user's app. This can only be used with the [Custom Elements](/docs/custom-elements) output and will not work with lazy loaded components.

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
[custom elements output target](/docs/custom-elements) is added to the Stencil config's output target array:

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

In addition, all the Web Component will be automatically defined as the generated component modules are bootstrapped.

### What is the best format to write event names?

Event names shouldn’t include special characters when initially written in Stencil. Try to lean on using camelCased event names for interoperability between frameworks.

### How do I add IE11 or Edge support?

If you want your custom elements to be able to work on older browsers, you should add the `applyPolyfills()` that surround the `defineCustomElements()` function.

```tsx
import { applyPolyfills, defineCustomElements } from 'test-components/loader';

applyPolyfills().then(() => {
  defineCustomElements();
});
```
