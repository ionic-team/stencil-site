---
title: 内部状態
description: コンポーネントの内部状態に State() を使用します。
url: /docs/state
contributors:
  - jthoms1
---

# ステート・デコレーター

`@State()`デコレータは、コンポーネントの内部データを管理するために使用します。これは、ユーザーがコンポーネントの外部から、このデータを変更することはできませんが、コンポーネントは適切な方法でデータを変更することができることを意味します。`@State()` プロパティに変更を加えると、コンポーネントの `render` 関数が再度呼び出されます。

## 例

この例では、StateデコレータとListenデコレータを使用しています。`open`というクラスプロパティを定義し、`@State`で装飾します。`@Listener` を使用して、クリックイベントに応答します。

 `open`の値をトグルします。

```tsx
import { Component, State, Listen, h } from '@stencil/core';

@Component({
  tag: 'my-toggle-button'
})

export class MyToggleButton {
  @State() open: boolean;

  @Listen('click', { capture: true })
  handleClick() {
    this.open = !this.open;
  }

  render() {
    return <button>
      {this.open ? "On" : "Off"}
    </button>;
  }
}
```

より高度なユースケースでは、ステートは複雑な型になる可能性があります。以下の例では、`Todo` 型の値のリストを保持しています。

```tsx
import { State } from '@stencil/core';

type Todo = {
  done: boolean,
  description: string,
}

export class TodoList {

  @State() completedTodos: Todo[];

  completeTodo(todo: Todo) {
    // This will cause our render function to be called again
    this.completedTodos = [...this.completedTodos, todo];
  }
}
```

## いつ使うべきか？

すべての内部状態を `@State()`デコレーターで管理する必要はありません。実際には、値が変更されないことが確実にわかっている場合や、再レンダリングを行う必要がない場合には、これを使用しない方が良いでしょう。

```tsx
class Component {

  // If `cacheData` changes we don't want to re-render the component,
  // so we DON'T decorate it with @State
  cacheData = SOME_BIG_DATA;

  // If this state change we want to run render() again
  @State() value;
}
```
