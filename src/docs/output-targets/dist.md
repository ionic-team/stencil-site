---
title: Distributing Web Components Built with Stencil
description: Distributing Web Components Built with Stencil
url: /docs/distribution
contributors:
  - adamdbradley
  - jthoms1
---

# Distribution Output Target: `dist`

The `dist` type is to generate the component(s) as a reusable library, such as [Ionic](https://www.npmjs.com/package/@ionic/core). When creating a distribution, the project's `package.json` will also have to be updated. Don't worry, helper messages when compiling will state which package.json properties will need to be updated.

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



## package.json

The purpose of the `package.json` file is to give other tools instructions on how to find the package's files, and to provide information about the package. For example, bundlers such as [Rollup](https://rollupjs.org/) and [Webpack](https://webpack.js.org/) use this configuration to locate the projects entry files.

An advantage to using the compiler is it is able to provide help on how to best setup the project for distribution. Below is a common setup found within a project's `package.json` file:

```json
{
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "es2015": "dist/esm/index.mjs",
  "es2017": "dist/esm/index.mjs",
  "types": "dist/types/interface.d.ts",
  "unpkg": "dist/ionic/ionic.js",
  "collection:main": "dist/collection/index.js",
  "collection": "dist/collection/collection-manifest.json",
  "files": [
    "dist/",
    "css/",
    "loader/"
  ]
}
```

| Property | Description                                                                                | Recommended                       |
|----------|--------------------------------------------------------------------------------------------|-----------------------------------|
| `main`   | Entry file in the CommonJS module format.                                                  | `dist/index.js`                   |
| `module` | Entry file in the ES module format. ES modules is the standardized and recommended format. | `dist/index.mjs`                  |
| `es2015` | Commonly used by framework bundling.                                                       | `dist/esm/index.mjs`              |
| `es2017` | Commonly used by framework bundling.                                                       | `dist/esm/index.mjs`              |
| `types`  | Entry file to the project's types.                                                         | `dist/types/index.d.ts`           |
| `unpkg`  | Entry file for requests to the projects [unpkg](https://unpkg.com/) CDN.                   | `dist/{NAMESPACE}/{NAMESPACE}.js` |


## Using your component in a framework

There are three strategies we recommend for using web components built with Stencil.

The first step for all three of these strategies is to
[Publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages).

### Script tag

- Put a script tag similar to this `<script src='https://unpkg.com/my-name@0.0.1/dist/myname.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc.

### Node Modules
- Run `npm install my-name --save`
- Put a script tag similar to this `<script src='node_modules/my-name/dist/myname.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc.

### In a stencil-app-starter app
- Run `npm install my-name --save`
- Add an import to the npm packages: `import my-component`;
- Then you can use the element anywhere in your template, JSX, html etc.
