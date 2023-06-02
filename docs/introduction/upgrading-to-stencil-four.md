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
If you're currently using an earlier version of Stencil we recommend that you first upgrade to v3 before attempting the v4 upgrade.
If you're a few versions behind, we recommend going one major version at a time (from v1 to v2, then v2 to v3, finally v3 to v4).
This will minimize the number of breaking changes you have to deal with at the same time.

For breaking changes introduced in previous major versions of the library, see:
- [Stencil v3 Breaking Changes](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-v300)
- [Stencil v2 Breaking Changes](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-two)
- [Stencil v1 Breaking Changes](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-one)

For projects that are on Stencil v4, install the latest version of Stencil v4: `npm install @stencil/core@v4-next`

## Updating Your Code


## Additional Packages

In order to guarantee that other `@stencil/` packages will continue to function as expected,
it's recommended that a project that uses any of the packages listed below updates to the listed minimum package version.

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
