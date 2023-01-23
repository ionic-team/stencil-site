---
title: Publishing A Component Library
sidebar_label: Publishing
description: Publishing A Component Library
slug: /publishing
contributors:
  - adamdbradley
---

# Publishing A Component Library

There are numerous strategies to publish and distribute your component library to be consumed by external projects. One of the benefits of Stencil is that is makes it easy to generate the various [output targets](/output-targets) that are right for your use-case.

## Publishing to Node Package Manager (NPM)

The first step and highly recommended step is to
[publish the component library to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages). NPM is an online software registry for sharing libraries, tools, utilities, packages, etc. Once the library is published to NPM, other projects are able to add your component library as a dependency and use the components within their own projects.


## `package.json`

The purpose of the `package.json` file is to give other tools instructions on how to find the package's files, and to provide information about the package. For example, bundlers such as [Rollup](https://rollupjs.org/) and [Webpack](https://webpack.js.org/) use this configuration to locate the project's entry files.

An advantage to using the compiler is that it is able to provide help on how to best set up the project for distribution. Below is a common setup found within a project's `package.json` file:

```json
{
  "main": "dist/index.cjs.js",
  "module": "dist/index.js",
  "es2015": "dist/esm/index.mjs",
  "es2017": "dist/esm/index.mjs",
  "types": "dist/types/components.d.ts",
  "unpkg": "dist/my-project-name/my-project-name.esm.js",
  "collection:main": "dist/collection/index.js",
  "collection": "dist/collection/collection-manifest.json",
  "files": [
    "dist/",
    "css/",
    "loader/"
  ]
}
```

| Property | Description                                                                                         | Recommended                       |
|----------|-----------------------------------------------------------------------------------------------------|-----------------------------------|
| `main`            | Entry file in the CommonJS module format.                                                  | `dist/index.cjs.js`               |
| `module`          | Entry file in the ES module format. ES modules is the standardized and recommended format. | `dist/index.js`                   |
| `es2015`          | Commonly used by framework bundling.                                                       | `dist/esm/index.mjs`              |
| `es2017`          | Commonly used by framework bundling.                                                       | `dist/esm/index.mjs`              |
| `types`           | Entry file to the project's types.                                                         | `dist/types/components.d.ts`      |
| `unpkg`           | Entry file for requests to the projects [unpkg](https://unpkg.com/) CDN.                   | `dist/{NAMESPACE}/{NAMESPACE}.js` |
| `files`           | Array of files that should be included in a npm release.                                    | `["dist/", "loader/"]`            |

The `collection` properties are used to allow lazy loading in other Stencil applications.

:::note
If you are distributing both the `dist` and `dist-custom-elements-bundle`, then it's best to pick one of them as the main entry, that's up to you.
:::
