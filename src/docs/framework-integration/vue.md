---
title: VueJS Integration with Stencil
description: VueJS Integration with Stencil
url: /docs/vue
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
  - brysalazar12
  - iskanderbroere
  - sean-perkins
---

# Vue

**Supports: Vue 3 • TypeScript 4.0+ • Stencil v2.9.0+**

Stencil can generate Vue component wrappers for your web components. This allows your Stencil components to be used within a Vue 3 application. The benefits of using Stencil's component wrappers over the standard web components include:

- Type checking with your components.
- Integration with the router link and Vue router.
- Optionally, form control web components can be used with `v-model`.

## Setup

### Project Structure

We recommend using a monorepo structure for your component library with component wrappers. Your project workspace should contain your Stencil component library and the library for the generate Vue component wrappers.

An example project set-up may look similar to:

```
top-most-directory/
└── packages/
    ├── component-library/
    │   └── src/
    │       ├── lib/
    │       └── index.ts
    └── stencil-library/
        ├── stencil.config.js
        └── src/components
```

#### Creating a Vue Component Library

> If you already have a Vue component library, skip this section.

The first time you want to create the component wrappers, you will need to have a Vue library package to write to.

Using Lerna and Vue's CLI, generate a workspace and a library for your Vue component wrappers:

```bash
lerna init
npm install typescript @types/node --save-dev
# or if you are using yarn
yarn add typescript @types/node --dev

lerna create component-library
# Follow the prompts and confirm
cd packages/
# Install Vue dependency
npm install vue@3 --save-dev
# or if you are using yarn
yarn add vue@3 --dev
# Add the stencil-library dependency
lerna add stencil-library
cd ..
lerna bootstrap
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

Lerna does not create a `.gitignore` file, so we will manually create one:

```
node_modules/
lerna-debug.log
npm-debug.log
packages/*/lib
```

In your `component-library` project, create a project specific `tsconfig.json` that will extend the root config:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./lib",
    "lib": ["dom", "es2020"],
    "module": "es2015",
    "moduleResolution": "node",
    "target": "es2017",
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

Update your `package.json`, adding the following options to the existing config:

```json
{
  "types": "lib/index.d.ts",
  "scripts": {
    "test": "echo \"Error: run tests from root\" && exit 1",
    "build": "npm run tsc && npm run bundle",
    "tsc": "tsc -p ."
  },
  "publishConfig": {
    "access": "public"
  }
}
```

#### Creating a Stencil Component Library

> If you already have a Stencil component library, skip this section.

```bash
cd packages/
npm init stencil components stencil-library
cd stencil-library
# Install dependencies
npm install
# of if you are using yarn
yarn install
cd ..
lerna bootstrap
```

### Adding Vue Output Target

Install the `@stencil/vue-output-target` dependency to your Stencil component library package.

```bash
# Install dependency (from packages/stencil-library)
npm install @stencil/vue-output-target --save-dev
# of if you are using yarn
yarn add @stencil/vue-output-target --dev
```

In your project's `stencil.config.ts`, add the `vueOutputTarget` configuration to the `outputTargets` array:

```ts
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'stencil-library',
  outputTargets: [
    vueOutputTarget({
      componentCorePackage: 'your-stencil-library-package-name', // i.e.: stencil-library
      proxiesFile: '../component-library/src/components.ts',
    }),
  ],
};
```

> The `proxiesFile` is the relative path to the file that will be generated with all the Vue component wrappers. You will replace the file path to match your project's structure and respective names. You can generate any file name instead of `components.ts`.

You can now build your Stencil component library to generate the component wrappers.

```bash
# Build the library and wrappers (from packages/stencil-library)
npm run build
# or if you are using yarn
yarn run build
```

If the build is successful, you will not have contents in the file specifies in `proxiesFile`.

#### Vue Plugin

To register your web components for the lazy-loaded (hydrated) bundle, you will need to create a new file for the Vue plugin:

```ts
// packages/component-library/src/component-library.ts

import { Plugin } from 'vue';
import { applyPolyfills, defineCustomElements } from 'stencil-library/loader';

export const ComponentLibrary: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements();
    });
  },
};
```

This plugin will be used by Vue applications as follows:

```ts
import { ComponentLibrary } from 'component-library';

createApp(App).use(ComponentLibrary).mount('#app');
```

You can now finally export the generated component wrappers and the Vue plugin for your component library to make them available to implementers:

```ts
// packages/component-library/src/index.ts
export * from './components';
export * from './component-library';
```

## Consumer Usage

This section covers how developers consuming your Vue component wrappers will use your package and component wrappers.

In your `main.js` file, import your component library plugin and use it:

```js
// src/main.js
import { ComponentLibrary } from 'component-library';

createApp(App).use(ComponentLibrary).mount('#app');
```

In your page or component, you can now import and use your component wrappers:

```ts
<template>
  <my-component first="Your" last="Name"></my-component>
</template>

<script>
import { MyComponent } from 'component-library';

export default {
  name: 'HelloWorld',
  components: {
    MyComponent
  }
}
```

## FAQ

### Vue warns "Failed to resolve component: my-component"

If you are using Vue CLI, update your `vue.config.js` to match your custom element selector as a custom element:

```js
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          ...options.compilerOptions,
          // The stencil-library components start with "my-"
          isCustomElement: tag => tag.startsWith('my-'),
        };
        return options;
      });
  },
});
```
