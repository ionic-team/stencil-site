---
title: Stencil Web Component Browser Support
description: Out-of-the-box browser support provided by Stencil web components.
url: /docs/browser-support
contributors:
  - adamdbradley
---

# Browser Support

Stencil builds Web Components that run natively or near-natively in all widely used desktop and mobile browsers.

<div class="bs-chart">
  <div class="bs-chart__group">
    <div class="bs-chart__cards">
      <div class="bs-chart__card">
        <app-icon name="checkmark"></app-icon>
        Chrome 60+
      </div>
      <div class="bs-chart__card">
        <app-icon name="checkmark"></app-icon>
        Safari 10.1+
      </div>
      <div class="bs-chart__card">
        <app-icon name="checkmark"></app-icon>
        Firefox 63+
      </div>
    </div>
    <div class="bs-chart__group-label">
      Full native support
    </div>
  </div>
  <div class="bs-chart__group">
    <div class="bs-chart__cards">
      <div class="bs-chart__card">
        <app-icon name="checkmark"></app-icon>
        Edge 16+
      </div>
      <div class="bs-chart__card">
        <app-icon name="checkmark"></app-icon>
        IE 11
      </div>
    </div>
    <div class="bs-chart__group-label">
      Support with bundled polyfills
    </div>
  </div>
</div>

Web Components are a set of standardized browser APIs centered around the Custom Elements v1 spec, a cross-browser way to define and create essentially new HTML tags, and is the successor to the now-defunct v0 spec.

Custom Elements are natively supported in Chrome and Safari (including iOS!) and are coming to both Edge
and Firefox. In fact, Firefox has native support behind a flag, indicating full native support is near.

For browsers without native support, a small polyfill helps developers use Custom Elements seamlessly and with little performance overhead.

Stencil uses a dynamic loader to load the custom elements polyfill only on browsers that need it. With this polyfill Stencil's browser support is Chrome (and all chrome based browsers), Safari, Firefox, Edge, and IE11.

|                  | Chrome 60+                             | Safari 10.1+                              | Firefox 63+                            | Edge 16+                               | IE 11+                                 |
| ---------------- | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: |
| [CSS Variables](https://caniuse.com/#feat=css-variables)    | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="circle"></app-icon>    |
| [Custom Elements](https://caniuse.com/#feat=custom-elementsv1) | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="circle"></app-icon>    | <app-icon name="circle"></app-icon>    |
| [Shadow Dom](https://caniuse.com/#feat=shadowdomv1)      | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="circle"></app-icon>    | <app-icon name="circle"></app-icon>    |
| [es2017](https://caniuse.com/#feat=async-functions)           | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="circle"></app-icon> |
| [ES Modules](https://caniuse.com/#feat=es6-module)     | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="circle"></app-icon> |

<div class="align-right">
  <app-icon name="circle"></app-icon> <span class="caption">Stencil compiles with polyfills for features not supported natively</span>
</div>
