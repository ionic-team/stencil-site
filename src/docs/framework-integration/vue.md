---
title: VueJS Intergration with Stencil
description: VueJS Intergration with Stencil
url: /docs/vue
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
---

# Vue

In order to use the custom element library within the Vue app, the application must be modified to define the custom elements and to inform the Vue compiler which elements to ignore during compilation. This can all be done within the `main.js` file. For example:

```tsx
import Vue from 'vue';
import App from './App.vue';
import { defineCustomElements } from 'test-components//dist/loader';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/test-\w*/];

defineCustomElements(window);

new Vue({
  render: h => h(App)
}).$mount('#app');
```

Vue provides several different ways to install and use the framework in an application. The above technique for integrating a Stencil custom element library has been tested on a Vue application that was created using the `vue-cli` with ES2015 and WebPack as primary options. A similar technique should work if the application was generated using other options.
