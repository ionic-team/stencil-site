---
title: Upgrading to Stencil v4.0.0
description: Upgrading to Stencil v4.0.0
url: /docs/upgrading-to-stencil-4
---

# Upgrading to Stencil v4.0.0

> Stencil 4.0.0 is pre-release software.
> These instructions are for users looking to try an early version of the software

## Getting Started

It's recommended that your projects start their upgrade from Stencil v3.
Projects using Stencil v0 or Stencil v1 should upgrade to Stencil v2 before proceeding with upgrading to Stencil v3.
Projects using Stencil v2 should upgrade to Stencil v3 before proceeding with this guide.
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
| `@stencil-angular-output-target` | [0.5.0](https://github.com/ionic-team/stencil-ds-output-targets/releases/tag/%40stencil%2Fangular-output-target%400.5.0) | [GitHub](https://github.com/ionic-team/stencil-ds-output-targets) | [Stencil Doc Site](../framework-integration/angular.md)                           |
| `@stencil/sass`                  | [2.0.3](https://github.com/ionic-team/stencil-sass/releases/tag/v2.0.3)                                                  | [GitHub](https://github.com/ionic-team/stencil-sass)              | [GitHub README](https://github.com/ionic-team/stencil-sass) |
| `@stencil/store`                 | [2.0.0](https://github.com/ionic-team/stencil-store/releases/tag/v2.0.0)                                                 | [GitHub](https://github.com/ionic-team/stencil-store)             | [Stencil Doc Site](../guides/store.md)                     |
| `@stencil-react-output-target`   | [0.4.0](https://github.com/ionic-team/stencil-ds-output-targets/releases/tag/%40stencil%2Freact-output-target%400.4.0)   | [GitHub](https://github.com/ionic-team/stencil-ds-output-targets) | [Stencil Doc Site](../framework-integration/react.md)                             |
| `@stencil-vue-output-target`     | [0.7.0](https://github.com/ionic-team/stencil-ds-output-targets/releases/tag/%40stencil%2Fvue-output-target%400.7.0)     | [GitHub](https://github.com/ionic-team/stencil-ds-output-targets) | [Stencil Doc Site](../framework-integration/vue.md)                               |

## Need Help Upgrading?

Be sure to look at the Stencil [v4.0.0 Breaking Changes Guide](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-v400).

If you need help upgrading, please post a thread on the [Stencil Forum](https://forum.ionicframework.com/c/stencil/21).
