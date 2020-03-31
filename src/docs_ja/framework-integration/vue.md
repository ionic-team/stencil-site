---
title: VueとStencilの連携
description: VueとStencilの連携
url: /docs/vue
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
  - brysalazar12
  - iskanderbroere
---

# Vue

Vueアプリ内でCustom Elementライブラリを使用するには、アプリでCustom Elementを定義し、コンパイル時に無視するようにVueコンパイラーを変更する必要があります。これは全て`main.js`ファイル内で行うことができます。

In order to use the custom element library within the Vue app, the application must be modified to define the custom elements and to inform the Vue compiler which elements to ignore during compilation. This can all be done within the `main.js` file.

`test-component`という名前でWebコンポーネントをnpmに公開し、事前に`npm install --save test-components`を実行した想定で、`main.js`ファイルにコンポーネントをインポートします。

Assuming you’ve run `npm install --save test-components` beforehand, and that `test-component` is the name of our made up Web Components that we have published to npm, you import the components into the 'main.js' file by

- nodeモジュールのインポート
- VueにCustom Elementのタグを無視するように指定する（`https://vuejs.org/v2/api/#ignoredElement`を参照）
- Stencilコンポーネントのコードをwindowオブジェクトにバインドする

- importing the node module
- telling Vue to ignore the custom element tags (see `https://vuejs.org/v2/api/#ignoredElements`)
- binding the Stenciljs component code to the window object

```tsx
import Vue from 'vue';
import App from './App.vue';

import { applyPolyfills, defineCustomElements } from 'test-components/loader';

Vue.config.productionTip = false;

// test-componentsパッケージで定義されたすべてのコンポーネントを無視するようにVueに指定します
// 正規表現で、すべてのコンポーネント名の開始に`test`が付いていることを想定しています
Vue.config.ignoredElements = [/test-\w*/];

// Custom Elementをwindowオブジェクトにバインドする
applyPolyfills().then(() => {
  defineCustomElements();
});

new Vue({
  render: h => h(App)
}).$mount('#app');
```

その後、コンポーネントはVueコンポーネントのいずれかで利用可能になります。

The components should then be available in any of the Vue components
```tsx
render() {
  return (
    <div>
      <test-stencil-component></test-stencil-component>
    </div>
  )
}
```

Vueは、フレームワークをアプリケーションにインストールして使用するための方法をいくつか提供しています。Stencil Custom Elementライブラリを連携するための手法は、`vue-cli`でES2015およびWebpackをプライマリオプションとして作成されたVueアプリケーションでテストされています。他のオプションを使用してアプリケーションを生成した場合も、同様の手法が機能するはずです。

Vue provides several different ways to install and use the framework in an application. The above technique for integrating a Stencil custom element library has been tested on a Vue application that was created using the `vue-cli` with ES2015 and WebPack as primary options. A similar technique should work if the application was generated using other options.
