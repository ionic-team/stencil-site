---
title: VueJS Integration with Stencil
description: VueJS Integration with Stencil
url: /docs/vue
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
  - brysalazar12
  - iskanderbroere
---

# Vue

In order to use the custom element library within the Vue app, the application must be modified to define the custom elements and to inform the Vue compiler which elements to ignore during compilation. This can all be done within the `main.js` file. 

Assuming you’ve run `npm install --save test-components` beforehand, and that `test-component` is the name of our made up Web Components that we have published to npm, you import the components into the 'main.js' file by 

- importing the node module
- telling Vue to ignore the custom element tags (see `https://vuejs.org/v2/api/#ignoredElements`)
- binding the Stenciljs component code to the window object

```tsx
import Vue from 'vue';
import App from './App.vue';

import { defineCustomElements } from 'test-components/dist/loader'; 

Vue.config.productionTip = false;
// tell Vue to ignore all components defined in the test-components
// package. The regex assumes all components names are prefixed 
// 'test'
Vue.config.ignoredElements = [/test-\w*/]; 

// Bind the custom elements to the window object
defineCustomElements(window); 

new Vue({
  render: h => h(App)
}).$mount('#app');
```

The components should then be available in any of the Vue components 
```
render() {
  return (
    <div>
      <test-stencil-component></test-stencil-component>
    </div>
  )
}
```

Vue provides several different ways to install and use the framework in an application. The above technique for integrating a Stencil custom element library has been tested on a Vue application that was created using the `vue-cli` with ES2015 and WebPack as primary options. A similar technique should work if the application was generated using other options.
