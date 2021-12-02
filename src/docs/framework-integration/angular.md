---
title: Angular Integration with Stencil
description: Learn how to wrap your components so that people can use them natively in Angular.
url: /docs/angular
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
  - peterpeterparker
  - jeanbenitez
  - mburger81
  - splitinfinities
---
### excludeComponents

This lets you exclude wrapping certain Web Components. This is useful if you need to write framework-specific versions of components. In Ionic Framework, this is used for routing components - like tabs - so that Ionic Framework can integrate better with Angular's Router.
