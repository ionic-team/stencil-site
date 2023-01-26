---
title: Stencil Web Component Browser Support
sidebar_label: Browser Support
description: Out-of-the-box browser support provided by Stencil web components.
slug: /browser-support
contributors:
  - adamdbradley
  - kevinports
  - jthoms1
  - arjunyel
---

# Browser Support

Stencil builds Web Components that run natively or near-natively in all widely used desktop and mobile browsers.

<div class="bs-chart">
  <div class="bs-chart__group">
    <div class="bs-chart__cards">
      <div class="bs-chart__card">
        <ion-icon name="checkmark"></ion-icon>
        Chrome 79+
      </div>
      <div class="bs-chart__card">
        <ion-icon name="checkmark"></ion-icon>
        Safari 14+  
      </div>
      <div class="bs-chart__card">
        <ion-icon name="checkmark"></ion-icon>
        Firefox 70+
      </div>
      <div class="bs-chart__card">
        <ion-icon name="checkmark"></ion-icon>
        Edge 79+
      </div>
    </div>
    <div class="bs-chart__group-label">
      Full native support
    </div>
  </div>
  <div class="bs-chart__group">
    <div class="bs-chart__cards">
      <div class="bs-chart__card">
        <ion-icon name="checkmark"></ion-icon>
        IE 11, Edge 16-18
      </div>
    </div>
    <div class="bs-chart__group-label">
      Deprecated in Stencil v3.
    </div>
  </div>
</div>

Web Components are a set of standardized browser APIs centered around the Custom Elements v1 spec, a cross-browser way to define and create essentially new HTML tags, and is the successor to the now-defunct v0 spec.

Custom Elements are natively supported in Chrome, Edge, Firefox, and Safari (including iOS)!

For browsers without native support, a small polyfill helps developers use Custom Elements seamlessly and with little performance overhead.

Stencil uses a dynamic loader to load the custom elements polyfill only on browsers that need it. With this polyfill Stencil's browser support is Chrome (and all chrome based browsers), Safari, Firefox, Edge, and IE11.

|                                                                |               Chrome 79+               |               Safari 14+               |              Firefox 70+               |                Edge 79+                | Edge 16-18                             | IE 11                               |
| -------------------------------------------------------------- |:--------------------------------------:|:--------------------------------------:|:--------------------------------------:|:--------------------------------------:| :------------------------------------: | :---------------------------------: |
| [CSS Variables](https://caniuse.com/#feat=css-variables)       | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| [Custom Elements](https://caniuse.com/#feat=custom-elementsv1) | ✅ | ✅ | ✅ | ✅ | ⚠️    | ⚠️ |
| [Shadow Dom](https://caniuse.com/#feat=shadowdomv1)            | ✅ | ✅ | ✅ | ✅ | ⚠️    | ⚠️ |
| [es2017](https://caniuse.com/#feat=async-functions)            | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| [ES Modules](https://caniuse.com/#feat=es6-module)             | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |

<div className="align-right">
  ⚠️ <span className="caption">Stencil compiles with polyfills for features not supported natively</span>
</div>

:::info
As of Stencil v3, legacy browser support is deprecated, and will be removed in a future major version of Stencil.
:::
