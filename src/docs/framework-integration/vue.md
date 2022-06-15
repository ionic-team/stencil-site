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
    ├── vue-library/
    │   └── src/
    │       ├── lib/
    │       └── index.ts
    └── stencil-library/
        ├── stencil.config.js
        └── src/components
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
# From your top-most-directory/
lerna init
# or if you are using other monorepo tools, initialize a workspace
npm install typescript @types/node --save-dev
# or if you are using yarn
yarn add typescript @types/node --dev
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
# or if you are using other monorepo tools, initialize symlinks
```

#### Creating a Vue Component Library

> If you already have a Vue component library, skip this section.

The first time you want to create the component wrappers, you will need to have a Vue library package to write to.

Using Lerna and Vue's CLI, generate a workspace and a library for your Vue component wrappers:

```bash
# From your top-most-directory/
lerna create vue-library
# or if you are using other monorepo tools, create a new Vue library
# Follow the prompts and confirm
cd packages/vue-library
# Install Vue dependency
npm install vue@3

# or if you are using yarn
yarn add vue@3 --dev

# Add the stencil-library dependency
lerna add stencil-library
# or if you are using other monorepo tools, install your Stencil library as a dependency
cd ../../
lerna bootstrap
# or if you are using other monorepo tools, initialize symlinks
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

```bash
node_modules/
lerna-debug.log
npm-debug.log
packages/*/lib
```

In your `vue-library` project, create a project specific `tsconfig.json` that will extend the root config:

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

```diff
{
-  "main": "lib/vue-library.js",
+  "main": "lib/index.js",
+  "types": "lib/index.d.ts",
  "scripts": {
-    "test": "echo \"Error: run tests from root\" && exit 1"
+    "test": "echo \"Error: run tests from root\" && exit 1",
+    "build": "npm run tsc",
+    "tsc": "tsc -p ."
-  }
+  },
+  "publishConfig": {
+    "access": "public"
+  }
}
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
      proxiesFile: '../vue-library/src/components.ts',
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

If the build is successful, you will now have contents in the file specified in `proxiesFile`.

#### Vue Plugin

To register your web components for the lazy-loaded (hydrated) bundle, you will need to create a new file for the Vue plugin:

```ts
// packages/vue-library/src/plugin.ts

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

You can now finally export the generated component wrappers and the Vue plugin for your component library to make them available to implementers:

```ts
// packages/vue-library/src/index.ts
export * from './components';
export * from './plugin';
```

### Building and Publishing

```bash
# Build the library (from packages/vue-library)
npm run build
# of if you are using yarn
yarn build
```

Publish the output to NPM:

```bash
npm publish
```

## Consumer Usage

This section covers how developers consuming your Vue component wrappers will use your package and component wrappers.

In your `main.js` file, import your component library plugin and use it:

```js
// src/main.js
import { ComponentLibrary } from 'vue-library';

createApp(App).use(ComponentLibrary).mount('#app');
```

In your page or component, you can now import and use your component wrappers:

```ts
<template>
  <my-component first="Your" last="Name"></my-component>
</template>

<script>
import { MyComponent } from 'vue-library';

export default {
  name: 'HelloWorld',
  components: {
    MyComponent
  }
}
```

## FAQ

### Vue warns "Failed to resolve component: my-component"

#### Lazy loaded bundle

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

#### Custom elements bundle

If you see this warning, then it is likely you did not import your component from your Vue library: `vue-library`. By default, all Vue components are locally registered, meaning you need to import them each time you want to use them.

Without importing the component, you will only get the underlying Web Component, and Vue-specific features such as `v-model` will not work.

To resolve this issue, you need to import the component from `vue-library` (your package name) and provide it to your Vue component:

```html
<template>
  <my-component first="Your" last="Name"></my-component>
</template>

<script lang="ts">
  import { MyComponent } from 'vue-library';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: { MyComponent },
  });
</script>
```

### Vue warns: "slot attributes are deprecated vue/no-deprecated-slot-attribute"

The slots that are used in Stencil are [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots) slots, which are different than the slots used in Vue 2. Unfortunately, the APIs for both are very similar, and your linter is likely getting the two confused.

You will need to update your lint rules in `.eslintrc.js` to ignore this warning:

```js
module.exports = {
  rules: {
    'vue/no-deprecated-slot-attribute': 'off',
  },
};
```

If you are using VSCode and have the Vetur plugin installed, you are likely getting this warning because of Vetur, not ESLint. By default, Vetur loads the default Vue 3 linting rules and ignores any custom ESLint rules.

To resolve this issue, you will need to turn off Vetur's template validation with `vetur.validation.template: false`. See the [Vetur Linting Guide](https://vuejs.github.io/vetur/guide/linting-error.html#linting) for more information.

### Method on component is not a function

In order to access a method on a Stencil component in Vue, you will need to access the underlying Web Component instance first:

```ts
// ✅ This is correct
myComponentRef.value.$el.someMethod();

// ❌ This is incorrect and will result in an error.
myComponentRef.value.someMethod();
```

### Output commonjs bundle for Node environments

First, install `rollup` and `rimraf` as dev dependencies:

```bash
npm i -D rollup rimraf
# or if you are using yarn
yarn add rollup rimraf --dev
```

Next, create a `rollup.config.js` in `/packages/vue-library/`:

```js
const external = ['vue', 'vue-router'];

export default {
  input: 'dist-transpiled/index.js',
  output: [
    {
      dir: 'dist/',
      entryFileNames: '[name].esm.js',
      chunkFileNames: '[name]-[hash].esm.js',
      format: 'es',
      sourcemap: true,
    },
    {
      dir: 'dist/',
      format: 'commonjs',
      preferConst: true,
      sourcemap: true,
    },
  ],
  external: id => external.includes(id) || id.startsWith('stencil-library'),
};
```

> Update the `external` list for any external dependencies. Update the `stencil-library` to match your Stencil library's package name.

Next, update your `package.json` to include the scripts for rollup:

```json
{
  "scripts": {
    "build": "npm run clean && npm run tsc && npm run bundle",
    "bundle": "rollup --config rollup.config.js",
    "clean": "rimraf dist dist-transpiled"
  }
}
```
