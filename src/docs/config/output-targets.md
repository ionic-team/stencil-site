---
title: Stencil Output Targets
description: Stencil Output Targets
url: /docs/config/output-targets
contributors:
  - adamdbradley
  - jthoms1
  - flawyte
  - BDav24
---

## Output Target Config

Stencil is able to take an app's source and compile it to numerous targets, such as an app to be deployed on an http server, or as a third-party library to be distributed on [npm](https://www.npmjs.com/). By default, Stencil apps have an output target type of `www`.

The `outputTargets` config is an array of objects, with types of `www` and `dist`.

```tsx
outputTargets: [
  { type: 'www' },
  { type: 'dist' }
]
```


### dist

The `dist` type is to generate the component(s) as a reusable library, such as [Ionic](https://www.npmjs.com/package/@ionic/core) or [Stencil Router](https://www.npmjs.com/package/@stencil/router). When creating a distribution, the project's `package.json` will also have to be updated. Don't worry, helper messages when compiling will state which package.json properties will need to be updated.

| Property | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `dir`    | The `dir` config specifies the public distribution directory. This directory is commonly the `dist` directory found within [npm packages](https://docs.npmjs.com/getting-started/packages). This directory is built and rebuilt directly from the source files. Additionally, since this is a build target, all files will be deleted and rebuilt after each build, so it's best to always copy source files into this directory. It's recommended this directory is not committed to a repository. | `dist`  |
| `empty`  | By default, before each build the `dir` directory will be emptied of all files. However, to prevent this directory from being emptied change this value to `false`.                                                                                                                                                                                                                                                                                                                          | `true`  |

```tsx
outputTargets: [
  {
    type: 'dist'
  }
]
```


### www

The `www` output target type is oriented for webapps and websites, hosted from an http server, which can benefit from prerendering and service workers, such as [this very site](https://github.com/ionic-team/stencil-site) you're reading.

| Property        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Default       |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `baseUrl`       | The `baseUrl` represents the site's "base" within the domain. Most site's base url will be `/`, which is already the default and many will not have to configure this. However, if the entire site's output is to live within a sub directory, then this directory's path should be the `baseUrl`. For example, Ionic's documentation is a stand-alone Stencil site that lives in the `/docs` directory within `http://ionicframework.com/`. In this example, `/docs` would be the base url.                                                                                                                                                     | `/`           |
| `buildDir`      | The `buildDir` is the directory of Stencil's generated scripts, such as the component files. For production builds, this directory will contain both `es5` and `esm` builds for each component.                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `build`       |
| `dir`           | The `dir` config specifies the public web distribution directory. This directory is commonly the root directory of an app to be served, such as serving static files from. This directory is built and rebuilt directly from the source files. Additionally, since this is a build target, all files will be deleted and rebuilt after each build, so it's best to always copy source files into this directory. It's recommended this directory is not committed to a repository.                                                                                                                                                               | `www`         |
| `empty`         | By default, before each build the `dir` directory will be emptied of all files. However, to prevent this directory from being emptied change this value to `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `true`        |
| `indexHtml`     | The `indexHtml` property represents the location of the root index html file.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `index.html`  |
| `resourcesUrl`  | Stencil is able to lazy-load components on-demand, and because of this the core file needs to know where to find these files to lazy-load. The `resourcesUrl` property is the url path to where this app's resources can be found, such as `/build/app/`. By default this url will point to where the `buildDir` property is set to. Setting this config allows for webapps to find resources which are located in various directory or domains, rather than just `/build/app/`. Note that if the `resourcesUrl` config property is provided, Stencil will use its exact value given and will not attempt to adjust relative to other config values. | `/build/app/` |
| `serviceWorker` | The `serviceWorker` config lets you customize the service worker that gets automatically generated by the Stencil compiler. To override Stencil's defaults, set any of the values listed in the [Workbox documentation](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config).                                                                                                                                                                                                                                                                                                                                   |               |

```tsx
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
