---
title: コンポーネントライフサイクル
description: コンポーネントライフサイクル
url: /docs/component-lifecycle
contributors:
  - jthoms1
---

# コンポーネントのライフサイクル関数

Stencilのコンポーネントには、多数のライフサイクルメソッドがあり、コンポーネントのロード、更新、アンロードのタイミングを知るために使用できます。これらのメソッドをコンポーネントに追加すれば、適切なタイミングで、任意の操作を行えます。

コンポーネントクラス内で、次に紹介するメソッドを使用すると、Stencilはそれらを正しい順序で自動的に呼び出します。

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

これは、このメソッドの素晴らしい使用例です！


この `lifecycle`フックは、[Custom Elements Spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)で説明されているものと、同じセマンティクスに従います。

## disconnectedCallback()

コンポーネントが、DOMから切断されるたびに呼び出されます。つまり、コンポーネントが複数回ディスパッチされる可能性があり、"onDestroy"のイベントと混同しないでください。

この `lifecycle`フックは、[Custom Elements Spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)で説明されているものと同じセマンティクスに従います。

## componentWillLoad()

コンポーネントが、最初にDOMに接続された直後に、1回だけ呼び出されます。
promiseを返すことができ、最初のレンダリングを待つために使用できます。

## componentDidLoad()

コンポーネントが完全に読み込まれ、最初の `render（）`が発生した直後に1回呼び出されます。

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


<svg viewBox="0 0 643 774" xmlns="http://www.w3.org/2000/svg" style="margin: 60px 0;">
  <g fill="none" fill-rule="evenodd">
    <path d="M552 576a90 90 0 0 0 90-90V165c0-58.5-47.2-106-105.5-106A105.8 105.8 0 0 0 431 165l.4 136.5v136" stroke="#B3B6C5" stroke-linecap="square"/>
    <path stroke="#B3B6C5" d="M437.6 432.3l-6.3 6.3-6.3-6.3"/>
    <path d="M126.4 19.5v419" stroke="#B3B6C5" stroke-linecap="square"/>
    <path stroke="#B3B6C5" d="M132.6 432.3l-6.3 6.3-6.3-6.3"/>
    <path d="M290.3 628.5v82" stroke="#B3B6C5" stroke-linecap="square"/>
    <path stroke="#B3B6C5" d="M296.6 704.3l-6.3 6.3-6.3-6.3"/>
    <rect fill="#FDF5E4" x="1" y="550" width="555" height="50" rx="4"/>
    <rect fill="#FDF5E4" x="1" y="611" width="555" height="50" rx="4"/>
    <rect fill="#FDF5E4" width="252" height="50" rx="4"/>
    <rect fill="#212431" y="452" width="252" height="49" rx="24.5"/>
    <rect fill="#212431" x="303" y="452" width="252" height="49" rx="24.5"/>
    <rect fill="#212431" x="303" y="229" width="252" height="49" rx="24.5"/>
    <rect fill="#212431" x="164" y="725" width="252" height="49" rx="24.5"/>
    <rect fill="#212431" x="303" y="169" width="252" height="49" rx="24.5"/>
    <text font-size="14" letter-spacing="-.2" fill="#9A6400">
      <tspan x="57" y="30">Component initialized</tspan>
    </text>
    <text font-family="SFMono-Regular, SF Mono, Lucida Console, monospace" font-size="15" fill="#FFF">
      <tspan x="43" y="482">componentDidLoad()</tspan>
    </text>
    <text font-family="SFMono-Regular, SF Mono, Lucida Console, monospace" font-size="15" fill="#FFF">
      <tspan x="336.3" y="482">componentDidUpdate()</tspan>
    </text>
    <text font-family="SFMono-Regular, SF Mono, Lucida Console, monospace" font-size="15" fill="#FFF">
      <tspan x="332.1" y="259">componentWillUpdate()</tspan>
    </text>
    <text font-family="SFMono-Regular, SF Mono, Lucida Console, monospace" font-size="15" fill="#FFF">
      <tspan x="198.3" y="754">componentDidUnload()</tspan>
    </text>
    <text font-family="SFMono-Regular, SF Mono, Lucida Console, monospace" font-size="15" fill="#FFF">
      <tspan x="346" y="198">@Watch(‘propName’)</tspan>
    </text>
    <text font-size="14" letter-spacing="-.2" fill="#9A6400">
      <tspan x="110.8" y="580">Change in a value of prop or state triggers re-render</tspan>
    </text>
    <text font-size="14" letter-spacing="-.2" fill="#9A6400">
      <tspan x="211.7" y="640">Component removed</tspan>
    </text>
    <rect fill="#39B54A" y="342" width="555" height="49" rx="24.5"/>
    <text font-family="SFMono-Regular, SF Mono, Lucida Console, monospace" font-size="15" fill="#FFF">
      <tspan x="240.4" y="371">render()</tspan>
    </text>
    <rect fill="#212431" y="63" width="252" height="49" rx="24.5"/>
    <text font-family="SFMono-Regular, SF Mono, Lucida Console, monospace" font-size="15" fill="#FFF">
      <tspan x="38.4" y="92">componentWillLoad()</tspan>
    </text>
  </g>
</svg>

## レンダリングの状態

レンダリングされた状態を更新する場合は、常に `componentWillLoad()` または `componentWillUpdate()` メソッド内で行うことをお勧めします。また、 `componentDidLoad()`メソッドや、 `componentDidUpdate()`メソッドを使用してレンダリングされた状態を更新すると、別の再レンダリングが発生しますが、これはパフォーマンスにとって理想的ではありません。

`componentDidUpdate()`で状態を更新する必要がある場合、コンポーネントが無限ループに陥る可能性があります。 もし、`componentDidUpdate()` 内で状態を更新することが避けられないなら、そのメソッドは、propsや状態が"ダーティ"であるかどうか（データが実際に違うのか、以前と同じなのか）を検出する方法を持っていなければいません。ダーティーチェックを行うことで、 `componentDidUpdate()`は同じデータをレンダリングすることを回避できます。


## ライフサイクルヒエラルキー

ライフサイクルメソッドの便利な機能は、子コンポーネントのライフサイクルも考慮に入れていることです。たとえば、親コンポーネントの"cmp-a"に子コンポーネントの"cmp-b"がある場合、"cmp-a"は"cmp-b"のロードが完了するまで"ロードされた"とは見なされません。別の言い方をすれば、最も深いコンポーネントが最初にロードを終えてから、 `componentDidLoad()`の呼び出しが始まるということです。

また、Stencilが[lazy-load components](/blog/how-lazy-loading-web-components-work)を実行できて、非同期レンダリングを持っていても、ライフサイクルメソッドは、正しい順序で呼び出されることに、注意が必要です。つまり、トップレベルのコンポーネントは、すでにロードされてる可能性がありますが、すべてのライフサイクルメソッドは、正しい順序で呼び出されます。これは、子コンポーネントの読み込みが完了するまで待機することを意味します。同じことがまったく逆の場合にも当てはまります。つまり、子コンポーネントはすでに準備されているが、親コンポーネントは準備ができていない場合があります。

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

一部のコンポーネントが、既に読み込まれている場合と、読み込まれていない場合でも、コンポーネント階層全体は、その子コンポーネントの読み込みとレンダリングが完了するまで待機します。


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

  componentDidLoad() {
    this.timer = window.setInterval(() => {
      this.time = Date.now();
    }, 1000);
  }

  componentDidUnload() {
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
