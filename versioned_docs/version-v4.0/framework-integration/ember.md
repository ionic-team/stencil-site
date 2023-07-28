---
title: Ember Integration with Stencil
sidebar_label: Ember
description: Ember Integration with Stencil
slug: /ember
---

# Ember

## For Monorepos (recommended)

It may be better to follow the [getting started](https://stenciljs.com/docs/getting-started) docs for creating a stencil project using the native stencil tooling.

This way, in your ember project, you don't need to configure anything extra, and you can use stencil components natively.

For example, if using the [ionic framework](https://ionicframework.com/)

_add the stencil library to your app_
```bash
npm add @ionic/core
```

_install the components from the library_
```js
// in app/app.js
import '@ionic/core'; // installs all the components from the stencil project
```

_use the components anywhere_
```js
// app/components/example.gjs

<template>
  <ion-toggle></ion-toggle>
</template>
```

_and hook up events / state (controlled component pattern)_
```js
// app/components/example-with-state.gjs
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Demo extends Component {
  <template>
    <ion-toggle value="{{this.isOn}}" {{on "click" this.toggle}}></ion-toggle>
  </template>

  @tracked isOn = true;
  
  toggle = () => this.isOn = !this.isOn;
}
```

## Legacy

Working with Stencil components in Ember is really easy thanks to the `ember-cli-stencil` addon. It handles:

- Importing the required files into your `vendor.js`
- Copying the component definitions into your `assets` directory
- Optionally generating a wrapper component for improved compatibility with older Ember versions

Start off by installing the Ember addon

```bash
ember install ember-cli-stencil
```

Now, when you build your application, Stencil collections in your dependencies will automatically be discovered and pulled into your application. You can just start using the custom elements in your `hbs` files with no further work needed. For more information, check out the [`ember-cli-stencil` documentation](https://github.com/alexlafroscia/ember-cli-stencil).

_NOTE_: `ember-cli-stencil` hasn't kept up with ember's evolution and will not work in newer ember apps.
