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

In order to use the custom element library within the Vue app, the application must be modified to define the custom elements and to inform the Vue compiler which elements to ignore during compilation. This can all be done within the `main.js` file. For example:

### Add the component(s) to the app dependencies
Typically done with `npm install --save test-components`


### Import the components into the 'main.js' file
by 

- importing the node module
- telling Vue to ignore the custom element tags
- binding their code to the window object

See `// HERE` comments:

```tsx
import Vue from 'vue';
import App from './App.vue';
import { defineCustomElements } from 'test-components/dist/loader'; // HERE

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/test-\w*/]; // HERE

defineCustomElements(window); // HERE

new Vue({
  render: h => h(App)
}).$mount('#app');
```
 ### Render
 
```
render() {
  return (
    <div>
      <my-stencil-component></my-stencil-component>
    </div>
  )
}
```

Vue provides several different ways to install and use the framework in an application. The above technique for integrating a Stencil custom element library has been tested on a Vue application that was created using the `vue-cli` with ES2015 and WebPack as primary options. A similar technique should work if the application was generated using other options.
