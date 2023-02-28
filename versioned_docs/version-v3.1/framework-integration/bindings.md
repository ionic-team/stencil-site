---
title: Framework bindings
sidebar_label: Bindings
description: Framework bindings
slug: /framework-bindings
contributors:
  - manucorporat
---

# Framework bindings

Unfortunately the experience of integrating web components into existing applications can be tricky at times. More about this can be read at [https://custom-elements-everywhere.com/](https://custom-elements-everywhere.com/). In order to accommodate the various issues the Stencil team has created new output target plugins to make the process simpler.

The plugins add additional output targets for each framework binding that is included. This output target will emit a native angular/react/vue library, just like if your components were originally written using any of these frameworks.

By using stencil bindings, you can build your components once, and stencil will emit angular/react/vue libraries, this way the consumers of your components can enjoy all the framework features.

Here is an example project repo using the plugins for reference: https://github.com/ionic-team/stencil-ds-plugins-demo

- [Angular bindings](./angular.md)
- [React bindings](./react.md)


