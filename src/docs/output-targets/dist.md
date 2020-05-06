---
title: Distributing Web Components Built with Stencil
description: Distributing Web Components Built with Stencil
url: /docs/distribution
contributors:
  - adamdbradley
  - jthoms1
---

# Distribution Output Target

The `dist` type is to generate the component(s) as a reusable library that can be self-lazy loading, such as [Ionic](https://www.npmjs.com/package/@ionic/core). When creating a distribution, the project's `package.json` will also have to be updated. However, the generated bundle is threeshakable, ensuring that only imported components will end up in the build.

### How is this different than "dist-custom-elements-bundle" output target?

To start, Stencil was designed to lazy-load itself only when the component was actually used on a page. There are many benefits to this approach, such as simply adding a script tag to any page and the entire library is available for use, yet only the components actually used are downloaded. For example, [`@ionic/core`](https://www.npmjs.com/package/@ionic/core) comes with over 100 components, but a one webpage may only need `ion-toggle`. Instead of requesting the entire component library, or generating a custom bundle for just `ion-toggle`, the `dist` output target is able to generate a tiny entry build ready to load any of its components on-demand.

The `dist-custom-elements-bundle` on the other hand is a direct build of the custom element that extends `HTMLElement`, without any lazy-loading. The custom elements bundle does not apply polyfills, nor automatically define each custom elements. This may be preferred for projects that will handle bundling, lazy-loading and defining the custom elements themselves.

Luckily, both builds can be generated at the same time, and shipped in the same distribution. It would be up to the consumer of your component library to decide which build to use.

```tsx
outputTargets: [
  {
    type: 'dist'
  }
]
```


## Config

| Property | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `dir`    | The `dir` config specifies the public distribution directory. This directory is commonly the `dist` directory found within [npm packages](https://docs.npmjs.com/getting-started/packages). This directory is built and rebuilt directly from the source files. Additionally, since this is a build target, all files will be deleted and rebuilt after each build, so it's best to always copy source files into this directory. It's recommended this directory is not committed to a repository. | `dist`  |
| `empty`  | By default, before each build the `dir` directory will be emptied of all files. However, to prevent this directory from being emptied change this value to `false`.                                                                                                                                                                                                                                                                                                                          | `true`  |


## Publishing

Next you can publish your library to [Node Package Manager (NPM)](https://www.npmjs.com/). For more information about setting up the `package.json` file, and publishing, see: [Publishing Component Library To NPM](/docs/publishing).


## Distribution Options

Each output target, form of bundling and distribution each have their own pros and cons. Luckily you can worry about writing some good source code for your component, and Stencil will handle generating the various bundles, and consumers of your library can decide how apply your components to their external projects. Below are a few of the options.


### Script tag

- Use a script tag linked to a CDN copy of your published NPM module, for example: `<script type="module" src='https://cdn.jsdelivr.net/npm/my-name@0.0.1/dist/myname.js'></script>`.
- The initial script itself is extremely tiny and does not represent the entire library, it's only a small registry.
- You can use any or all components within your library anywhere within that webpage.
- Doesn't matter if the actual component was written within the HTML, or created with vanilla JavaScript, jQuery, React, etc.
- Only the components used on that page will actually be requested and lazy-loaded.


### Import the `dist` library using a bundler
- Run `npm install my-name --save`
- Add an `import` within the root component: `import my-component`;
- Stencil will automatically setup the lazy-loading capabilities for the Stencil library.
- Then you can use the element anywhere in your template, JSX, html etc.


### Import the `dist` library into another Stencil app
- Run `npm install my-name --save`
- Add an `import` within the root component: `import my-component`;
- Stencil will automatically setup the lazy-loading capabilities for the Stencil library.
- Then you can use the element anywhere in your template, JSX, html etc.
