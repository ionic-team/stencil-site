# Stencil Config

The `stencil.config.js` file is where all Stencil configuration happens.

Here's an example configuration:

```
exports.config = {
  publicPath: '/build',
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page'] },
    { components: ['app-marked', 'getting-started', 'basics-components', 'compiler-config', 'what-is', 'code-splitting', 'stencil-ssr', 'site-menu'] },
    { components: ['demos-page'] }
  ],
  collections: [
    { name: '@stencil/router'}
  ]
};
```

The `publicPath` field should start with a `/` and be the URL root that you intend to use for deployment. By default, it will be set to `/` which will work in most cases.

`bundles` is an array of objects that represent how components are grouped together in lazy-loaded bundles. It is important to note that every Stencil component be included in a bundle. In the example above, each object in the `bundles` array has it's own `components` array, which is the HTML tag name for each component. In general, the simplest approach is to give each component it's own bundle. A more advanced optimization would be grouping commonly used components together.

`collections` is a field to specify a list of 3rd party Stencil libraries. Since everything is Stencil is async and lazy loaded by default, it is important to NOT have any hard `import` statements linking components together. Any library listed in the list `collections` entry will be recognized and included in the application by the Stencil compiler. By default, the `@Stencil/router` will be included.
