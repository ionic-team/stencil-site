---
title: Upgrading to Stencil v4.0.0
description: Upgrading to Stencil v4.0.0
url: /docs/upgrading-to-stencil-4
---

# Upgrading to Stencil v4.0.0

:::caution 
Stencil 4.0.0 is pre-release software.
These instructions are for users looking to try an early version of the software
:::

## Getting Started

We recommend that you only upgrade to Stencil v4 from Stencil v3.
If you're a few versions behind, we recommend upgrading one major version at a time (from v1 to v2, then v2 to v3, finally v3 to v4).
This will minimize the number of breaking changes you have to deal with at the same time.

For breaking changes introduced in previous major versions of the library, see:
- [Stencil v3 Breaking Changes](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-v300)
- [Stencil v2 Breaking Changes](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-two)
- [Stencil v1 Breaking Changes](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-one)

For projects that are on Stencil v3, install the latest version of Stencil v4: `npm install @stencil/core@v4-next`

## Updating Your Code

### In Browser Compilation Support Removed

Prior to Stencil v4.0.0, components could be compiled from TSX to JS in the browser.
This feature was seldom used, and has been removed from Stencil.
At this time, there is no replacement functionality.
For additional details, please see the [request-for-comment](https://github.com/ionic-team/stencil/discussions/4134) on the Stencil GitHub Discussions page.

### Legacy Context and Connect APIs Removed

Previously, Stencil supported `context` and `connect` as options within the `@Prop` decorator.
Both of these APIs were deprecated in Stencil v1 and are now removed.

```ts
@Prop({ context: 'config' }) config: Config;
@Prop({ connect: 'ion-menu-controller' }) lazyMenuCtrl: Lazy<MenuController>;
```
To migrate away from usages of `context`, please see [the original deprecation announcement](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#propcontext)

To migrate away from usages of `connect`, please see [the original deprecation announcement](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#propconnect)

### Legacy Browser Support Removed


In Stencil v3.0.0, we announced [the deprecation of IE 11, pre-Chromium Edge, and Safari 10 support](#legacy-browser-support-fields-deprecated).
In Stencil v4.0.0, support for these browsers has been dropped.
For a full list of supported browsers, please see our [Browser Support page](../reference/browser-support.md).
By dropping these browsers, a few configuration options are no longer valid in a Stencil configuration file:

##### `__deprecated__cssVarsShim`

`extras.__deprecated__cssVarsShim` caused Stencil to include a polyfill for [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
In Stencil v4.0.0, this field and corresponding behavior has been removed.
This field should be removed from a project's Stencil configuration file (`stencil.config.ts`).

##### `__deprecated__dynamicImportShim`

The `extras.__deprecated__dynamicImportShim` option caused Stencil to include a polyfill for
the [dynamic `import()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
for use at runtime.
In Stencil v4.0.0, this field and corresponding behavior has been removed.
This field should be removed from a project's Stencil configuration file (`stencil.config.ts`).

##### `__deprecated__safari10`

The `extras.__deprecated__safari10` option would patch ES module support for Safari 10.
In Stencil v4.0.0, this field and corresponding behavior has been removed.
This field should be removed from a project's Stencil configuration file (`stencil.config.ts`).

##### `__deprecated__shadowDomShim`

The `extras.__deprecated__shadowDomShim` option would check whether a shim for [shadow
DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
was needed in the current browser, and include one if so.
In Stencil v4.0.0, this field and corresponding behavior has been removed.
This field should be removed from a project's Stencil configuration file (`stencil.config.ts`).

### Drop Node 14 Support

Stencil no longer supports Node 14.
Please upgrade local development machines, continuous integration pipelines, etc. to use Node v16 or higher.
For the full list of supported runtimes, please see [our Support Policy](../reference/support-policy.md#javascript-runtime).

## Additional Packages

To ensure the proper functioning of other `@stencil/` packages, it is advisable for projects utilizing any of the packages mentioned below to upgrade to the minimum package version specified.

| Package                          | Minimum Package Version                                                                                                  | GitHub                                                            | Documentation                                               |
|----------------------------------|--------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|-------------------------------------------------------------|
| `@stencil-angular-output-target` | [0.7.1](https://github.com/ionic-team/stencil-ds-output-targets/releases/tag/%40stencil%2Fangular-output-target%400.7.1) | [GitHub](https://github.com/ionic-team/stencil-ds-output-targets) | [Stencil Doc Site](../framework-integration/angular.md)     |
| `@stencil/sass`                  | [3.0.4](https://github.com/ionic-team/stencil-sass/releases/tag/v3.0.4)                                                  | [GitHub](https://github.com/ionic-team/stencil-sass)              | [GitHub README](https://github.com/ionic-team/stencil-sass) |
| `@stencil/store`                 | [2.0.8](https://github.com/ionic-team/stencil-store/releases/tag/v2.0.8)                                                 | [GitHub](https://github.com/ionic-team/stencil-store)             | [Stencil Doc Site](../guides/store.md)                      |
| `@stencil-react-output-target`   | [0.5.1](https://github.com/ionic-team/stencil-ds-output-targets/releases/tag/%40stencil%2Freact-output-target%400.5.1)   | [GitHub](https://github.com/ionic-team/stencil-ds-output-targets) | [Stencil Doc Site](../framework-integration/react.md)       |
| `@stencil-vue-output-target`     | [0.8.6](https://github.com/ionic-team/stencil-ds-output-targets/releases/tag/%40stencil%2Fvue-output-target%400.8.6)     | [GitHub](https://github.com/ionic-team/stencil-ds-output-targets) | [Stencil Doc Site](../framework-integration/vue.md)         |

## Need Help Upgrading?

Be sure to look at the Stencil [v4.0.0 Breaking Changes Guide](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-v400).

If you need help upgrading, please post a thread on the [Stencil Discord](https://chat.stenciljs.com).
