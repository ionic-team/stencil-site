# Stencil Config

In most cases, the `stencil.config.js` file does not require any customization since Stencil comes with great default values out-of-the-box. In general, it's preferred to keep the config as minimal as possible. In fact, you could even delete the `stencil.config.js` file entirely and an app would compile just fine. But at the same time, the compiler can be configured at the lowest levels using this config. Below are the many *optional* config properites.

- [bundles](#bundles)
- [copy](#copy)
- [enableCache](#enableCache)
- [globalStyle](#globalStyle)
- [hashFileNames](#hashFileNames)
- [hashedFileNameLength](#hashedFileNameLength)
- [namespace](#namespace)
- [outputTargets](#outputTargets)
  - [dist](#dist)
  - [www](#www)
- [plugins](#plugins)
- [srcDir](#srcDir)
- [excludeSrc](#excludeSrc)


Example `stencil.config.js`:

```js
exports.config = {
  namespace: 'MyApp',
  srcDir: 'src'
};
```

<a name="bundles"></a>
## `bundles`

By default, Stencil will statically analyze the application and generate a component graph of how all the components are interconnected. From the component graph it is able to best decide how components should be grouped depending on their usage with one another within the app. By doing so it's able to bundle components together in order to reduce network requests. However, bundles can be manually generated using the `bundles` config.

The `bundles` config is an array of objects that represent how components are grouped together in lazy-loaded bundles. This config is rarely needed as Stencil handles this automatically behind the scenes.

```js
bundles: [
  { components: ['ion-button'] },
  { components: ['ion-card', 'ion-card-header'] }
]
```


<a name="copy"></a>
##  `copy`

The `copy` config is an array of objects that defines any files or folders that should be copied over to the build directory. Each object in the array must include a `src` property which can be either an absolute path, a relative path or a glob pattern. The config can also provide an optional `dest` property which can be either an absolute path or a path relative to the build directory. Also note that any files within `src/assets` are automatically copied to `www/assets` for convenience.

In the copy config below, it will copy the entire directory from `src/docs-content` over to `www/docs-content`.

```js
  copy: [
    { src: 'docs-content' }
  ]
```


<a name="enableCache"></a>
## `enableCache`

*default: `true`*

Stencil will cache build results in order to speed up rebuilds. To disable this feature, set `enableCache` to `false`.

```js
enableCache: true
```


<a name="globalStyle"></a>
## `globalStyle`

Stencil is traditionally used to compile many components into an app, and each component comes with its own compartmentalized styles. However, it's still common to have styles which should be "global" across all components and the website. A global CSS file is often useful to set [CSS Variables](/docs/css-variables).

Additonally, the `globalStyle` config is can be used to precompile styles with Sass, PostCss, etc.

Below is an example folder structure containing a webapp's global sass file, named `app.scss`.

```
  src/
    components/
    globals/
      app.css
```

The global style config takes an array of file paths. The output from this build will go to the `buildDir`. In this example it would be saved to `www/build/app.css`.

```js
globalStyle: ['src/globals/app.scss']
```

Next, the `app.css` can be referenced from the `index.html` file, such as:

```html
<link href="/build/app.css" rel="stylesheet">
```


<a name="hashFileNames"></a>
## `hashFileNames`

*default: `true`*

During production builds, the content of each generated file is hashed to represent the content, and the hashed value is used as the filename. If the content isn't updated between builds, then it receives the same filename. When the content is updated, then the filename is different. By doing this, deployed apps can "forever-cache" the build directory and take full advantage of content delivery networks (CDNs) and heavily caching files for faster apps.

```js
hashFileNames: true
```


<a name="hashedFileNameLength"></a>
## `hashedFileNameLength`

*default: `8`*

When the `hashFileNames` config is set to `true`, and it is a production build, the `hashedFileNameLength` config is used to determine how many characters the file name's hash should be.

```js
hashedFileNameLength: 8
```


<a name="namespace"></a>
##  `namespace`

*default: `App`*

The `namespace` config is a `string` representing a namespace for the app. For apps that are not meant to be a library of reusable components, the default of `App` is just fine. However, if the app is meant to be consumed as a third-party library, such as `Ionic`, a unique namespace is required.

```js
  namespace: "Ionic"
```


<a name="outputTargets"></a>
##  `outputTargets`

Stencil is able to take an app's source and compile it to numerous targets, such as an app to be deployed on an http server, or as a third-party library to be distributed on [npm](https://www.npmjs.com/). By default, Stencil apps have an output target type of `www`.

The `outputTargets` config is an array of objects, with types of `www` and `dist`.

```js
outputTargets: [
  { type: 'www' },
  { type: 'dist' }
]
```


<a name="dist"></a>
## `outputTarget: dist`

The `dist` type is to generate the component(s) as a reusable library, such as [Ionic](https://www.npmjs.com/package/@ionic/core) or [Stencil Router](https://www.npmjs.com/package/@stencil/router). When creating a distribution, the project's `package.json` will also have to be updated. Don't worry, helper messages when compiling will state which package.json properties will need to be udpated.

| Property | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `dir`    | The `dir` config specifies the public distribution directory. This directory is commonly the `dist` directory found within [npm packages](https://docs.npmjs.com/getting-started/packages). This directory is built and rebuilt directly from the source files. Additionally, since this is a build target, all files will be deleted and rebuilt after each build, so it's best to always copy source files into this directory. It's recommended this directory is not committed to a repository. | `dist`  |
| `empty`  | By default, before each build the `dir` directory will be emptied of all files. However, to prevent this directory from being emptied change this value to `false`.                                                                                                                                                                                                                                                                                                                          | `true`  |

```js
outputTargets: [
  {
    type: 'dist'
  }
]
```


<a name="www"></a>
## `outputTarget: www`

The `www` output target type is oriented for webapps and websites, hosted from an http server, which can benefit from prerendering and service workers, such as [this very site](https://github.com/ionic-team/stencil-site) you're reading.

| Property        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Default       |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `baseUrl`       | The `baseUrl` represents the site's "base" within the domain. Most site's base url will be `/`, which is already the default and many will not have to configure this. However, if the entire site's output is to live within a sub directory, then this directory's path should be the `baseUrl`. For example, Ionic's documentation is a stand-alone Stencil site that lives in the `/docs` directory within `http://ionicframework.com/`. In this example, `/docs` would be the base url.                                                                                                                                                     | `/`           |
| `buildDir`      | The `buildDir` is the directory of Stencil's generated scripts, such as the component files. For production builds, this directory will contain both `es5` and `esm` builds for each component.                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `build`       |
| `dir`           | The `dir` config specifies the public web distribution directory. This directory is commonly the root directory of an app to be served, such as serving static files from. This directory is built and rebuilt directly from the source files. Additionally, since this is a build target, all files will be deleted and rebuilt after each build, so it's best to always copy source files into this directory. It's recommended this directory is not committed to a repository.                                                                                                                                                               | `www`         |
| `empty`         | By default, before each build the `dir` directory will be emptied of all files. However, to prevent this directory from being emptied change this value to `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `true`        |
| `indexHtml`     | The `indexHtml` property represents the location of the root index html file.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `index.html`  |
| `resourcesUrl`  | Stencil is able to lazy-load components on-demand, and because of this the core file needs to know where to find these files to lazy-load. The `resourcesUrl` property is the url path to where this app's resources can be found, such as `/build/app/`. By default this url will point to where the `buildDir` property is set to. Setting this config allows for webapps to find resources which are located in various directory or domains, rather than just `/build/app/`. Note that if the `resourcesUrl` config property is provided, Stencil will use its exact value given and will not attempt to adjust relative to other config values. | `/build/app/` |
| `serviceWorker` | The `serviceWorker` config lets you customize the service worker that gets automatically generated by the Stencil compiler. To override Stencil's defaults, set any of the values listed in the [Workbox documentation](https://workboxjs.org/reference-docs/latest/module-workbox-build.html#.Configuration).                                                                                                                                                                                                                                                                                                                                   |               |

```js
outputTargets: [
  {
    type: 'www',
    serviceWorker: {
      swSrc: 'src/sw.js',
      globPatterns: [
        '**/*.{html,js,css,json,ico,png}'
      ]
    }
  }
]
```


<a name="plugins"></a>
## `plugins`

The `plugins` config can be used to add your own [rollup](https://rollupjs.org) plugins. By default, Stencil does not come with `Sass` or `PostCss` support. However, either can be added using the plugin array.

```js
const sass = require('@stencil/sass');

exports.config = {
  plugins: [
    sass()
  ]
};
```

#### Related Plugins

- [@stencil/less](https://www.npmjs.com/package/@stencil/less)
- [@stencil/postcss](https://www.npmjs.com/package/@stencil/postcss)
- [@stencil/sass](https://www.npmjs.com/package/@stencil/sass)
- [@stencil/stylus](https://www.npmjs.com/package/@stencil/stylus)


<a name="srcDir"></a>
## `srcDir`

*default: `src`*

The `srcDir` config specifies the directory which should contain the source typescript files for each component. The standard for Stencil apps is to use `src`, which is the default.

```js
srcDir: 'src'
```

<stencil-route-link url="/docs/forms" router="#router" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/distribution" custom="true">
  <button class='pull-right btn btn--primary'>
    Next
  </button>
</stencil-route-link>


<a name="excludeSrc"></a>
## `excludeSrc`

*default: `['**/test/**', '**/*.spec.*']`*

The `excludeSrc` config setting specifies a set of regular expressions that should be excluded from the build process.  The defaults are meant to exclude possible test files that you would not want to include in your final build.
