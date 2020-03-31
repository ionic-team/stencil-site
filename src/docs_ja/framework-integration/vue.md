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

Vueアプリ内でCustom Elementライブラリを使用するには、Custom Elementを定義し、コンパイル時に無視するようにVueコンパイラーの設定を変更する必要があります。これは全て`main.js`ファイル内で行うことができます。

Webコンポーネントを`test-component`という名前でnpmに公開し、事前に`npm install --save test-components`を実行した想定で、`main.js`ファイルにコンポーネントをインポートします。

- nodeモジュールをインポート
- VueにCustom Elementのタグを無視するように指定する（`https://vuejs.org/v2/api/#ignoredElement`を参照）
- Stencilコンポーネントのコードをwindowオブジェクトにバインドする

```tsx
import Vue from 'vue';
import App from './App.vue';

import { applyPolyfills, defineCustomElements } from 'test-components/loader';

Vue.config.productionTip = false;

// Vueでtest-componentsパッケージで定義されたすべてのコンポーネントを無視するように指定します
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

これで、コンポーネントがVueコンポーネントで利用可能になります。

```tsx
render() {
  return (
    <div>
      <test-stencil-component></test-stencil-component>
    </div>
  )
}
```

Vueは、アプリケーションにフレームワークをインストールして使用するための方法をいくつか提供しています。Stencil Custom Elementライブラリを連携するための方法は、`vue-cli`でES2015およびWebpackをプライマリオプションとして作成されたVueアプリケーションでテストされています。他のオプションを使用してアプリケーションを生成した場合も、同様の方法で機能するはずです。
