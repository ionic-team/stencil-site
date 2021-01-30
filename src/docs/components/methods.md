---
title: Methods
description: methods
url: /docs/methods
contributors:
  - jthoms1
  - manucorporat
---

# メソッドデコレータ

`@Method()`デコレータは、パブリックAPIでメソッドを公開するために使用されます。 `@Method()`デコレータでデコレートされた関数は、要素から直接呼び出すことができます。 それらは外部から呼び出すことができるように意図されています！

> 開発者は、公開されているメソッドにできるだけ依存しないようにし、代わりにデフォルトでプロパティとイベントをできるだけ使用するようにする必要があります。 アプリの規模が拡大するにつれて、パブリックメソッドよりも@Propを介してデータを管理および渡す方が簡単であることがわかりました。

```tsx
import { Method } from '@stencil/core';

export class TodoList {

  @Method()
  async showPrompt() {
    // show a prompt
  }
}
```

次のようなメソッドを呼び出します。

> 開発者は、パブリックメソッドを呼び出す前に、カスタム要素レジストリのwhenDefinedメソッドを使用してコンポーネントが定義されていることを確認する必要があります。

```tsx
(async () => {
  await customElements.whenDefined('todo-list');
  const todoListElement = document.querySelector('todo-list');
  await todoListElement.showPrompt();
})();
```

## パブリックメソッドは非同期である必要があります

ステンシルのアーキテクチャはすべてのレベルで非同期であるため、多くのパフォーマンス上の利点と使いやすさが可能になります。 `@Method`デコレータを使用して公開されたメソッドを確実に返すことにより、promiseが返されます。

- 開発者は、componentOnReady()を使用せずに、実装がダウンロードされる前にメソッドを呼び出すことができます。componentOnReady()は、メソッド呼び出しをキューに入れ、コンポーネントのロードが完了した後に解決します。

- コンポーネントとの相互作用は、遅延読み込みが必要な場合でも、すでに完全に水和されている場合でも同じです。

- コンポーネントのパブリックAPIの非同期を維持することで、アプリはコンポーネントを透過的に[Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)に移動でき、APIは引き続き同じ。

- promiseを返す必要があるのは、 `@Method`デコレータを持つ公開されたメソッドの場合のみです。 他のすべてのコンポーネントメソッドはコンポーネント専用であり、非同期である必要はありません


```tsx
// VALID: using async
@Method()
async myMethod() {
  return 42;
}

// VALID: using Promise.resolve()
@Method()
myMethod2() {
  return Promise.resolve(42);
}

// VALID: even if it returns nothing, it needs to be async
@Method()
async myMethod3() {
  console.log(42);
}

// INVALID
@Method()
notOk() {
  return 42;
}
```

## プライベートメソッド

非公開メソッドは、コンポーネントのビジネスロジックを整理するために引き続き使用でき、Promiseを返す必要はありません。

```tsx
class Component {
  // `getData`は@Methodで公開されているパブリックメソッドではないため
  // 非同期である必要はありません
  getData() {
    return this.someData;
  }
  render() {
    return (
      <div>{this.getData()}</div>
    );
  }
}
```
