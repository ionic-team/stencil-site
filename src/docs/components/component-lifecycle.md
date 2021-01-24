---
title: Component Lifecycle Methods
description: Component Lifecycle Methods
url: /docs/component-lifecycle
contributors:
  - jthoms1
---

# コンポーネントのライフサイクル関数

Stencilには、コンポーネントがいつロード、更新、およびレンダリングされるかを知るために使用できる多数のライフサイクルメソッドがあります。これらのメソッドをコンポーネントに追加して、適切なタイミングで操作にフックすることができます。

コンポーネントクラス内で、次に紹介するメソッドを使用すると、Stencilはそれらを正しい順序で自動的に呼び出します。

<lifecycle-chart></lifecycle-chart>


## connectedCallback()

コンポーネントがDOMに接続されるたびに、呼び出されます。
コンポーネントが最初に接続されたとき、このメソッドは `componentWillLoad`の前に呼び出されます。

このメソッドは、DOM内で要素が、**attached**または、**move**されるたびに、複数回呼び出されるので注意してください。

```tsx
const el = document.createElement('my-cmp');
document.body.appendChild(el);
// connectedCallback() called
// componentWillLoad() called (first time)

el.remove();
// disconnectedCallback()

document.body.appendChild(el);
// connectedCallback() called again, but `componentWillLoad` is not.
```

上記は、このメソッドの素晴らしい使用例です！


この `lifecycle`フックは、[Custom Elements Spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)で説明されているものと、同じセマンティクスに従います。

## disconnectedCallback()

コンポーネントが、DOMから切断されるたびに呼び出されます。つまり、コンポーネントが複数回ディスパッチされる可能性があり、"onDestroy"のイベントと混同しないでください。

この `lifecycle`フックは、[Custom Elements Spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)で説明されているものと同じセマンティクスに従います。

## componentWillLoad()

コンポーネントが最初にDOMに接続された直後に1回呼び出されます。このメソッドは1回しか呼び出されないため、データを非同期でロードするのに適した場所です。

最初のレンダリングを待つために使用できるpromiseを返すことができます。

## componentDidLoad()

コンポーネントが完全に読み込まれ、最初の `render（）`が発生した直後に1回呼び出されます。


## componentShouldUpdate()


このフックは、コンポーネントの `Prop`または `State`プロパティが変更され、再レンダリングが要求されようとしているときに呼び出されます。このフックは、新しい値、古い値、および変更された状態の名前の3つの引数を受け取ります。コンポーネントを再レンダリングする必要があるか(`true`)、再レンダリングしないか(` false`)を示すブール値を返す必要があります。

注意すべき点がいくつかあります。このメソッドは、最初のレンダリングの前、つまり、コンポーネントが最初にdomにアタッチされたとき、または次のフレームで再レンダリングがすでにスケジュールされているときに実行されません。

コンポーネントの次の2つの変数が同期して変化するとします。

```tsx
component.somePropA = 42;
component.somePropB = 88;
```
`componentShouldUpdate`は、最初に引数`42`、`undefined`、`somePropA` の順に呼び出されます。`true`が返された場合、再レンダリングがすでにスケジュールされているため、フックは再度呼び出されません。代わりに、最初のフックが `false`を返した場合、`component.somePropB = 88` ミューテーションによってトリガーされ、 `88`、`undefined`、および `somePropB`を引数として`componentShouldUpdate`が再度呼び出されます。

このフックの実行は条件付けられている可能性があるため、小道具の変更を監視するためにフックに依存するのはよくありません。代わりに、`@Watch`デコレータを使用してください。

## componentWillRender()

すべての `render()`の前に呼び出されます。

promiseを返すことができ、今後のレンダリングを待機するために使用できます。

## componentDidRender()

すべての `render()`の後に呼び出されます。


## componentWillUpdate()

一部の `Prop()`または `State()`が変更されたために、コンポーネントが更新されようとしているときに呼び出されます。
最初の `render()`の間に呼び出されることはありません。

promiseを返すことができ、次のレンダリングを待つために使用できます。


## componentDidUpdate()

コンポーネントが更新された直後に呼び出されます。
最初の `render()`の間に呼び出されることはありません。


## Rendering State

レンダリングされた状態を更新する場合は、常に `componentWillLoad()` または `componentWillUpdate()` メソッド内で行うことをお勧めします。また、 `componentDidLoad()`メソッドや、 `componentDidUpdate()`メソッド、および`componentDidRender()`を使用してレンダリングされた状態を更新すると、別の再レンダリングが発生しますが、これはパフォーマンスにとって理想的ではありません。

`componentDidUpdate()`または`componentDidRender()`で状態を更新する必要がある場合、コンポーネントが無限ループに陥る可能性があります。 もし、`componentDidUpdate()` 内で状態を更新することが避けられないなら、そのメソッドは、propsや状態が「ダーティ」であるかどうか（データが実際に違うのか、以前と同じなのか）を検出する方法を持っていなければいません。ダーティーチェックを行うことで、 `componentDidUpdate()`は同じデータをレンダリングすることを回避できます。


## ライフサイクルヒエラルキー

ライフサイクルメソッドの便利な機能は、子コンポーネントのライフサイクルも考慮に入れていることです。たとえば、親コンポーネントの`cmp-a`に子コンポーネントの`cmp-b`がある場合、`cmp-a`は`cmp-b`のロードが完了するまでロードされた"とは見なされません。別の言い方をすれば、最も深いコンポーネントが最初にロードを終えてから、 `componentDidLoad()`の呼び出しが始まるということです。

また、Stencilは[Componentの遅延読み込み](/blog/how-lazy-loading-web-components-work)を実行できて、非同期レンダリングを持っていますが、ライフサイクルメソッドは、正しい順序で呼び出されることに、注意が必要です。つまり、最上位のコンポーネントは、すでにロードされてる可能性がありますが、すべてのライフサイクルメソッドは、正しい順序で呼び出されます。これは、子コンポーネントの読み込みが完了するまで待機することを意味します。同じことがまったく逆の場合にも当てはまります。つまり、子コンポーネントはすでに準備されているが、親コンポーネントは準備ができていない場合があります。

以下の例では、コンポーネントの単純な階層構造を示しています。番号付きリストは、ライフサイクルメソッドが起動する順番を示します。

```markup
  <cmp-a>
    <cmp-b>
      <cmp-c></cmp-c>
    </cmp-b>
  </cmp-a>
```

1. `cmp-a` - `componentWillLoad()`
2. `cmp-b` - `componentWillLoad()`
3. `cmp-c` - `componentWillLoad()`
4. `cmp-c` - `componentDidLoad()`
5. `cmp-b` - `componentDidLoad()`
6. `cmp-a` - `componentDidLoad()`

一部のコンポーネントがすでにロードされている場合とされていない場合でも、コンポーネント階層全体が子コンポーネントのロードとレンダリングを完了するのを待ちます。


## 非同期ライフサイクルメソッド

ライフサイクル・メソッドはプロミスを返すこともでき、これによってメソッドは非同期的にデータを取得したり、非同期タスクを実行したりすることができます。これの例として、コンポーネントでレンダリングされるデータをフェッチすることが挙げられます。たとえば、あなたが読んでいるこのサイトでは、レンダリングの前にコンテンツデータをフェッチします。しかい、 `fetch()`は非同期であるため、すべてのコンテンツがレンダリングされるまで、親コンポーネントが"ロード済み"と見なされないようにするには、 `componentWillLoad()`が `Promise`を返すことが重要です。

以下の例は、 `componentWillLoad()`が親コンポーネントに、データの読み込みが完了するのを待つ方法を示す簡単な例です。

```tsx
componentWillLoad() {
  return fetch('/some-data.json')
    .then(response => response.json())
    .then(data => {
      this.content = data;
    });
}
```


## 例

この簡単な例は、時計を示しており、1秒ごとに現在の時刻を更新します。 `componentDidLoad`は1回しか呼び出さないので、タイマーのインスタンスは一度しか実行されないことになります。コンポーネントがアンロードされると、タイマーが停止します。

```tsx
import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'custom-clock'
})
export class CustomClock {

  timer: number;

  @State() time: number = Date.now();

  connectedCallback() {
    this.timer = window.setInterval(() => {
      this.time = Date.now();
    }, 1000);
  }

  disconnectedCallback() {
    window.clearInterval(this.timer);
  }

  render() {
    const time = new Date(this.time).toLocaleTimeString();

    return (
      <span>{ time }</span>
    );
  }
}
```

> 以下は実行例です。動作を確認したい場合は、開発ツールで調べてください。
> <custom-clock/>
