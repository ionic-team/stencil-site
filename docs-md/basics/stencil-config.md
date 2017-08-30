# Stencil Config

The `stencil.config.js` file is where all Stencil configuration happens.

Here's an example configuration:

```
exports.config = {
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page'] },
    { components: ['app-marked', 'getting-started', 'basics-components', 'compiler-config', 'what-is', 'code-splitting', 'stencil-ssr', 'site-menu'] },
    { components: ['demos-page'] }
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};
```


| Config        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Default     |
|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| `bundles`     | The `bundles` config is an array of objects that represent how components are grouped together in lazy-loaded bundles. It is important to note that every Stencil component be included in a bundle. In the example above, each object in the `bundles` array has its own `components` array, which is the HTML tag name for each component. In general, the simplest approach is to give each component its own bundle. A more advanced optimization would be grouping commonly used components together. |             |
| `collections` | The `collections` config specifies a list of third-party Stencil libraries. Since everything in Stencil is async and lazy loaded by default, it is important to NOT have any hard `import` statements linking components together. Any library listed in the list `collections` entry will be recognized and included in the application by the Stencil compiler. By default, the `@stencil/router` will be included.                                                                                      |             |
| `publicPath`  | The `publicPath` config sets the client-side base path for all Stencil build assets, and it's usually best to have it start with `/`. Note that this only sets the base path the browser requests, but this does not set where files are saved during build. To change where files are saved at build time, use the `buildDir` config.                                                                                                                                                                     | `/build`    |
| `buildDir`    | The `buildDir` config specifies where files are saved after each build. These are the public files which will be requested by the browser. To change the base path of the browser's request use the `publicPath` config.                                                                                                                                                                                                                                                                                   | `www/build` |
