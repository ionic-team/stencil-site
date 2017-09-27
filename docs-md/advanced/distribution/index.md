# Distributing web components built with Stencil

Stencil makes it easy to build and share web components across any framework.


### Getting Started

The easiest way to build and distribute web components with Stencil is by using our [stencil-component-starter](https://github.com/ionic-team/stencil-component-starter). This starter includes all of the config and package.json changes that are discussed below by default with instructions in the [readme](https://github.com/ionic-team/stencil-component-starter/blob/master/readme.md).


### Distribution Config

Configuring Stencil for distribution is easy. Simply set the following config options in the `stencil.config.js` file:

```
exports.config = {
  namespace: 'myname',
  generateDistribution: true,
  generateWWW: false,
  ...
};
```

<stencil-route-link url="/docs/stencil-config" router="#router" custom="true">
  Learn more about these config options here.
</stencil-route-link>


You also need to add the following to your `package.json`: 

```
{
  "main": "dist/collection/index.js",
  "types": "dist/collection/index.d.ts",
  "collection": "dist/collection/collection-manifest.json",
  "files": [
    "dist/"
  ],
  "browser": "dist/myname.js",
  ...
}
```

## Using your component in a framework

There are three ways we recommend using web components built with Stencil.

### Script tag

- [Publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages)
- Put a script tag similar to this `<script src='https://unpkg.com/my-name@0.0.1/dist/myname.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install my-name --save`
- Put a script tag similar to this `<script src='node_modules/my-name/dist/myname.js></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc.

### In a stencil-starter app
- Run `npm install my-name --save`
- Add `{ name: 'my-name' }` to your [collections](https://github.com/ionic-team/stencil-starter/blob/master/stencil.config.js#L5)
- Then you can use the element anywhere in your template, JSX, html etc.


<stencil-route-link url="/docs/service-workers" router="#router" custom="true" class="backButton">
  Back
</stencil-route-link>

<stencil-route-link url="/docs/routing" custom="true" class="nextButton">
  Next
</stencil-route-link>