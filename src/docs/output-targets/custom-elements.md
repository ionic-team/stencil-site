---
title: Bundling Custom Elements with Stencil
description: Bundling Custom Elements with Stencil
url: /docs/custom-elements
contributors:
  - adamdbradley
---

# Custom Elements Bundle

The `dist-custom-elements-bundle` output target is used to generate a custom elements as a single bundle. The output can be "single" bundle because it's generated to ensure components are tree-shakable. For example, if a component library has 100 components, but an external project only imported one component from the bundle, then only the code used by that one component would be pulled into the project. This is due to Stencil's use of ES Modules and the compiler generating friendly code for bundlers to parse and understand.

```tsx
outputTargets: [
  {
    type: 'dist-custom-elements-bundle'
  }
]
```

## Defining Exported Custom Elements

By default, the custom elements bundle will be written to `dist/custom-elements-bundle/index.mjs`. This directory can be configured using the output target's `dir` config. The generated `index.mjs` contains exports to each component class and will have their styles included within the bundle. However, this build does not automatically define the custom elements, or apply any polyfills.

Below is an example of defining a custom element within the bundle:

```tsx
import { HelloWorld } from 'my-library/dist/custom-elements-bundle';

customElements.define('hello-world', HelloWorld);
```

For convinence, the bundle also exports a `defineCustomElements()` method. When the `defineCustomElements()` is called it will define each component in the bundle. However, it does not run automatically and it will not be called if it is not imported and executed.

Also note that the generated bundle will export each component class and will already have the styles bundled. However, it does not define the custom elements, or apply any polyfills.


## Distributing Custom Elements

Your component library can be easily distributed on Npm, similar to how [`@ionic/core`](https://www.npmjs.com/package/@ionic/core) does it. From there consumers of your library can decide how to import your library into their project. For the `dist-custom-elements-bundle`, the default import location would be `my-library/dist/custom-elements-bundle`, but this can get further configured within the `package.json` file.

To make this bundle the entry module for a package, set the `package.json`'s `module` property to:

```tsx
{
  "module": "dist/custom-elements-bundle/index.mjs"
}
```

Note: If you are distributing both the `dist` and `dist-custom-elements-bundle`, then it's best to choose which one of them should be the `module` entry, but that's up to you.

Next you can publish your library to [Node Package Manager (NPM)](https://www.npmjs.com/). For more information about setting up the `package.json` file, and publishing, see: [Publishing Component Library To NPM](/docs/publishing).

## How is this different than "dist" output target?

The `dist-custom-elements-bundle` builds each component as a stand-alone class that extends `HTMLElement`. The output is a standardized custom element with the styles already attached and without any of Stencil's lazy-loading. This may be preferred for projects that are already handling bundling, lazy-loading and defining the custom elements themselves.

The `dist` output target on the other hand is more for projects that want to be able allow each component to lazy-load themselves, without having to setup bundling configurations to do so.

Luckily, both builds can be generated at the same time, and shipped in the same distribution. It would be up to the consumer of your component library to decide which build to use.


## Legacy Browsers

If the library is to be used on IE11 we recommand using the [`dist` output target](/output-targets/dist) instead since it will only load the required polyfills on-demand. The `dist-custom-elements-bundle` we only recommend if for modern browsers that already support Custom Elements, Shadow DOM and CSS Variables (basically not IE11 or Edge 18 and below). If this this build is going to be used within legacy browsers then the project consuming these components will have to provide its own polyfills, and correctly downlevel the output to ES5.

Good news is that they're all widely supported for modern web develoment:

- [Custom Elements Support](https://caniuse.com/#feat=custom-elementsv1)
- [Shadow DOM Support](https://caniuse.com/#feat=shadowdomv1)
- [CSS Variables Support](https://caniuse.com/#feat=css-variables)
