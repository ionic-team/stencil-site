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
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://unpkg.com/test-components/latest/dist/test-components.js"></script>
</head>
<body>
  <test-component></test-component>
</body>
</html>
```

また、ESモジュールを利用する場合はimport構文を使用してコンポーネントを読み込むことができます。EdgeまたはIE11を対象とする場合は、 `applyPolyfills`が必要であることに注意してください。

```markup
<!DOCTYPE html>
<html lang="en">
<head>
  <script type="module">
    import { applyPolyfills, defineCustomElements } from 'https://unpkg.com/test-components/loader';
    applyPolyfills().then(() => {
      defineCustomElements();
    });
  </script>
</head>
<body>
  <test-component></test-component>
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
