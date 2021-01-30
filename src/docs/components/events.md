---
title: Events
description: Events
url: /docs/events
contributors:
  - jthoms1
  - mgalic
  - BDav24
  - mattcosta7
  - noherczeg
---

# イベント

*stencil events*のようなものは**ありません**。代わりに、Stencilは[DOMイベント](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/)の使用を推奨しています。
ただし、Stencilは、コンポーネントが発行できるイベントと、コンポーネントがリッスンするイベントを指定するためのAPIを提供します。 これは、 `Event()`および `Listen()`デコレータを使用して行われます。

## イベントデコレータ

コンポーネントは、イベントエミッタデコレータを使用してデータとイベントを発行できます。

[カスタムDOMイベント](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)をディスパッチして他のコンポーネントを処理するには、`@Event()`デコレータを使用します。

```tsx
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  @Event() todoCompleted: EventEmitter<Todo>;

  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}
```

上記のコードは、`todoCompleted`と呼ばれるカスタムDOMイベントをディスパッチします。

`Event(opts: EventOptions)`デコレータは、オプションでオプションオブジェクトを受け入れて、ディスパッチされたイベントの動作を形成します。 オプションとデフォルトについては、以下で説明します。

```tsx
export interface EventOptions {
  /**
   * デフォルトをオーバーライドする文字列カスタムイベント名。
   */
  eventName?: string;
  /**
   * イベントがDOMを介してバブルアップするかどうかを示すブール値。
   */
  bubbles?: boolean;

  /**
   * イベントがキャンセル可能かどうかを示すブール値。
   */
  cancelable?: boolean;

  /**
   * イベントがShadowDOMと通常のDOMの境界を越えてバブルできるかどうかを示すブール値。
   */
  composed?: boolean;
}
```

例:

```tsx
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  //「作成」、「キャンセル可能」の「todoCompleted」というイベントがバブルアップ！
  @Event({
    eventName: 'todoCompleted',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) todoCompleted: EventEmitter<Todo>;

  todoCompletedHandler(todo: Todo) {
    const event = this.todoCompleted.emit(todo);
    if(!event.defaultPrevented) {
      // 防止されていない場合は、デフォルトの処理コードを実行します
    }
  }
}
```

## Listenデコレータ

`Listen()`デコレータは、 `@Events`からディスパッチされたものを含むDOMイベントをリッスンするためのものです。

以下の例では、子コンポーネント `TodoList`が`EventEmitter`を使用して `todoCompleted`イベントを発行すると仮定します。

```tsx
import { Listen } from '@stencil/core';

...
export class TodoApp {

  @Listen('todoCompleted')
  todoCompletedHandler(event: CustomEvent<Todo>) {
    console.log('Received the custom todoCompleted event: ', event.detail);
  }
}
```

### リッスンのオプション

`@Listen(eventName,opts: ListenOptions)`には、DOMイベントリスナーのアタッチ方法を構成するために使用できる2番目のオプションの引数が含まれています。

```tsx
export interface ListenOptions {
  target?: 'body' | 'document' | 'window';
  capture?: boolean;
  passive?: boolean;
}
```

The available options are `target`, `capture` and `passive`:

使用可能なオプションは、`target`,`capture`, `passive`です。


#### target

ハンドラーは、ホスト自体以外のイベントに登録することもできます。
`target`オプションを使用して、イベントリスナーが接続されている場所を変更できます。これは、アプリケーション全体のイベントをリッスンする場合に役立ちます。

以下の例では、 `window`から発行されたスクロールイベントをリッスンします。

```tsx
  @Listen('scroll', { target: 'window' })
  handleScroll(ev) {
    console.log('the body was scrolled', ev);
  }
```

#### passive

デフォルトでは、Stencilはいくつかのヒューリスティックを使用して、`passive`イベントリスナーをアタッチする必要があるかどうかを判断します。 `passive`オプションを使用して、デフォルトの動作を変更できます。

[https://developers.google.com/web/updates/2016/06/passive-event-listeners](https://developers.google.com/web/updates/2016/06/passive-event-listeners)をチェックしてください -詳細については、リスナー）を参照してください。


#### capture

`@Listen`でアタッチされたイベントリスナーは、デフォルトでは`capture`しません。
イベントリスナーが`capture`に設定されている場合、それは`capture phase`中にイベントがディスパッチされることを意味します。
詳細については[https://www.quirksmode.org/js/events_order.html](https://www.quirksmode.org/js/events_order.html)を確認してください。


```tsx
  @Listen('click', { capture: true })
  handleClick(ev) {
    console.log('click');
  }
```

## キーボードイベント

キーボードイベントの場合、 `@Listen()`で標準の `keydown`イベントを使用し、`event.keyCode`または `event.which`を使用してキーコードを取得するか、`event.key`を使用しての文字列表現を取得できます。

```tsx
@Listen('keydown')
handleKeyDown(ev: KeyboardEvent){
  if (ev.key === 'ArrowDown'){
    console.log('down arrow pressed')
  }
}
```
イベントキー文字列の詳細については[w3c spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values)を参照してください.


## JSXでイベントを使用する

Stencilでコンパイルされたアプリケーションまたはコンポーネント内で、リスナーをJSXのイベントに直接バインドすることもできます。 これは、 `onClick`などの通常のDOMイベントと非常によく似ています。

上からTodoListコンポーネントを使用してみましょう

```tsx
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  @Event() todoCompleted: EventEmitter<Todo>;

  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}
```

これで、次の構文を使用して、JSXのコンポーネントでこのイベントを直接聞くことができます。

```tsx
<todo-list onTodoCompleted={ev => this.someMethod(ev)} />
```

## 非JSX要素からのイベントをリッスンする

```tsx
<todo-list></todo-list>
<script>
  const todoListElement = document.querySelector('todo-list');
  todoListElement.addEventListener('todoCompleted', event => { /* your listener */ })
</script>
```
