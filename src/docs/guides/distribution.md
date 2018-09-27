---
title: Distributing Web Components Built with Stencil
description: Distributing Web Components Built with Stencil
url: /docs/distribution
contributors:
  - jthoms1
---

# Distributing Web Components Built with Stencil

Stencil makes it easy to build and share web components across any framework.


### Getting Started

The easiest way to build and distribute web components with Stencil is by using our [stencil-component-starter](https://github.com/ionic-team/stencil-component-starter). This starter includes all of the config and package.json changes that are discussed below by default with instructions in the [readme](https://github.com/ionic-team/stencil-component-starter/blob/master/readme.md).


### Distribution Config

Configuring Stencil for distribution is easy. Set the following config options in the `stencil.config.ts` file:

```typescript
export const config: Config = {
  namespace: 'myname',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www'
    }
  ]
  ...
};
```

<stencil-route-link url="/docs/config" router="#router" custom="true">
  Learn more about these config options here.
</stencil-route-link>


You also need to add the following to your `package.json`:

```json
{
  "main": "dist/myname.js",
  "types": "dist/types/index.d.ts",
  "collection": "dist/collection/collection-manifest.json",
  "files": [
    "dist/"
  ]
  ...
}
```

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
