---
title: フレームワークを使用しないコンポーネント
description: フレームワークを使用しないコンポーネント
url: /docs/javascript
contributors:
  - mhartington
  - jthoms1
  - adamdbradley
  - BDav24
---

# フレームワークを使用しないコンポーネント

Stencilで作成されたコンポーネントをJavaScriptフレームワークのないプロジェクトで連携するのは簡単です。単純なHTMLページを使用している場合は、scriptタグを使用してコンポーネントを読み込むことができます。例えば、npmにコンポーネントを公開した場合は、次のようにunpkgを介してコンポーネント使用できます。

```markup
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic.js"></script>
  </head>
  <body>
    <ion-toggle></ion-toggle>
  </body>
</html>
```

また、ESモジュールを利用する場合はimport構文を使用してコンポーネントを読み込むことができます。EdgeまたはIE11を対象とする場合は、 `applyPolyfills`が必要であることに注意してください。
_Note type="module"は最新のブラウザでのみ機能することに注意してください（IE11またはEdge 12-18では使用できません_

```markup
<html>
  <head>
    <script type="module">
      import { defineCustomElements } from 'https://cdn.jsdelivr.net/npm/@ionic/core/loader/index.es2017.mjs';
      defineCustomElements();
    </script>
  </head>
  <body>
    <ion-toggle></ion-toggle>
  </body>
</html>
```

## JSXではない要素からpropsオブジェクトを使う

### propsを手動で設定する

```tsx
import { Prop } from '@stencil/core';

export class TodoList {
  @Prop() myObject: object;
  @Prop() myArray: Array<string>;
}
```

```tsx
<todo-list></todo-list>
<script>
  const todoListElement = document.querySelector('todo-list');
  todoListElement.myObject = {};
  todoListElement.myArray = [];
</script>
```

### propsの変化を監視する

```tsx
import { Prop, State, Watch } from '@stencil/core';

export class TodoList {
  @Prop() myObject: string;
  @Prop() myArray: string;
  @State() myInnerObject: object;
  @State() myInnerArray: Array<string>;

  componentWillLoad() {
    this.parseMyObjectProp(this.myObject);
    this.parseMyArrayProp(this.myArray);
  }

  @Watch('myObject')
  parseMyObjectProp(newValue: string) {
    if (newValue) this.myInnerObject = JSON.parse(newValue);
  }

  @Watch('myArray')
  parseMyArrayProp(newValue: string) {
    if (newValue) this.myInnerArray = JSON.parse(newValue);
  }
}
```

```tsx
<todo-list my-object="{}" my-array="[]"></todo-list>
```
