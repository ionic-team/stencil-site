---
title: React Integration with Stencil
sidebar_label: React
description: Learn how to wrap your components so that people can use them natively in React
slug: /react
---

# React Integration

**Supports: React v17+ • Stencil v4.2.0+**

Automate the creation of React component wrappers for your Stencil web components.

This package includes an output target for code generation that allows developers to generate a React component wrapper for each Stencil component and a minimal runtime package built around [@lit/react](https://www.npmjs.com/package/@lit/react) that is required to use the generated React components in your React library or application.

- ♻️ Automate the generation of React component wrappers for Stencil components
- 🌐 Generate React functional component wrappers with JSX bindings for custom events and properties
- ⌨️ Typings and auto-completion for React components in your IDE

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

# Install output target runtime dependency
npm install @stencil/react-output-target --save
```

Lerna does not ship with a TypeScript configuration. At the root of the workspace, create a `tsconfig.json`:

```json title="tsconfig.json"
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

```json title="packages/react-library/tsconfig.json"
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

```diff title="packages/react-library/package.json"
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

#### Step 1 - Stencil Component Library

Install the `@stencil/react-output-target` dependency to your Stencil component library package.

```bash npm2yarn
# Install dependency
npm install @stencil/react-output-target --save-dev
```

In your project's `stencil.config.ts`, add the `reactOutputTarget` configuration to the `outputTargets` array:

```ts title="stencil.config.ts"
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'stencil-library',
  outputTargets: [
    reactOutputTarget({
      // Relative path to where the React components will be generated
      outDir: '../react-library/lib/components/stencil-generated/',
    }),
    // dist-custom-elements output target is required for the React output target
    { type: 'dist-custom-elements' },
  ],
};
```

:::tip

The `outDir` is the relative path to the file that will be generated with all of the React component wrappers. You will replace the
file path to match your project's structure and respective names.

:::

See the [API section below](#api) for details on each of the output target's options.

You can now build your Stencil component library to generate the component wrappers in your React component library.

```bash npm2yarn
# Build the library and wrappers
npm run build
```

If the build is successful, you’ll see the new generated file in your React component library at the location specified by the `outDir` argument.

#### Step 2 - React Component Library

Install the `@stencil/react-output-target` dependency to your React component library package. This step is required to add the runtime dependencies required to use the generated React components.

```bash npm2yarn
# Install dependency
npm install @stencil/react-output-target --save
```

No additional configuration is needed in the React component library. The generated component wrappers will reference the runtime dependencies directly.

### Add the Components to your React Component Library's Entry File

In order to make the generated files available within your React component library and its consumers, you’ll need to export everything from within your entry file. First, rename `react-library.js` to `index.ts`. Then, modify the contents to match the following:

```tsx title="packages/react-library/src/index.ts"
export * from './components/stencil-generated/components';
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

Before you can consume your React component wrappers, you'll need to build your React component library. From `packages/react-library` run:

```bash npm2yarn
npm run build
```

To make use of your React component library in your React application, import your components from your React component library in the file where you want to use them.

```tsx title="App.tsx"
import './App.css';
import { MyComponent } from 'react-library';

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

### esModule

**Optional**

**Type: `boolean`**

If `true`, the output target will generate a separate ES module for each React component wrapper. Defaults to `false`.

### excludeComponents

**Optional**

**Type: `string[]`**

An array of component tag names to exclude from the React output target. Useful if you want to prevent certain web components from being in the React library.

### experimentalUseClient

**Optional**

**Type: `boolean`**

If `true`, the generated output target will include the [use client;](https://react.dev/reference/react/use-client) directive.

### outDir

**Required**

**Type: `string`**

The directory where the React components will be generated. Accepts a relative path from the Stencil project's root directory.

### stencilPackageName

**Optional**

**Type: `string`**

The name of the package that exports the Stencil components. Defaults to the package.json detected by the Stencil compiler.

## FAQ's

### What is the best format to write event names?

Event names shouldn’t include special characters when initially written in Stencil. Try to lean on using camelCased event names for interoperability between frameworks.

### Can I use `dist` output target with the React output target?

No, the React output target requires the `dist-custom-elements` output target to be present in the Stencil project's configuration. The `dist-custom-elements` output target generates a separate entry for each component which best aligns with the expectations of React developers.
