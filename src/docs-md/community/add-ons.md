# Add-ons

## Stencil Sass

`@stencil/sass` is an npm package that enables to use [Sass](https://sass-lang.com/) in your web components built with Stencil. During development, this plugin will kick-in for .scss or .sass style urls, and precompile them to CSS.

### Installing

1. In your project directory run `npm install @stencil/sass --save`.
2. Add `const sass = require('@stencil/sass');` to the top of your `stencil.config.js` file.
3. Add the plugin to your `plugins` array in your `stencil.config.js` file:

```
exports.config = {
  plugins: [
    sass()
  ]
}
```

### Options

Saass options can be passed to the plugin within `stencil.config.js`, which are used directly by node-sass. Please reference the [node-sass documentation](https://www.npmjs.com/package/node-sass) for all available options.

```
exports.config = {
  plugins: [
    sass({ includePaths: ['/my-include-path'] })
  ]
};
```

<stencil-route-link url="/docs/style-guide" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>
