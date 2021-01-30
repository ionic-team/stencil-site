---
title: Working with host elements
description: Working with host elements
url: /docs/host-element
contributors:
  - jthoms1
---

# ホスト要素の操作

ステンシルコンポーネントは、[JSXを使用](templating-jsx)の `render`メソッドで子を宣言的にレンダリングします。 ほとんどの場合、 `render()`関数は、レンダリングされようとしている子要素を記述しますが、ホスト要素自体の属性をレンダリングするためにも使用できます。


## `<Host>`

`Host`関数コンポーネントをrender関数のルートで使用して、属性とイベントリスナーをホスト要素自体に設定できます。 これは他のJSXと同じように機能します。

```tsx
// ホストは「@stencil/core」からインポートされます
import { Component, Host, h } from '@stencil/core';

@Component({tag: 'todo-list'})
export class TodoList {
  @Prop() open = false;
  render() {
    return (
      <Host
        aria-hidden={this.open ? 'false' : 'true'}
        class={{
          'todo-list': true,
          'is-open': this.open
        }}
      />
    )
  }
}
```

もし `this.open === true`の場合、次のようにレンダリングされます。
```tsx
<todo-list class="todo-list is-open" aria-hidden="false"></todo-list>
```

同じ用に `this.open === false`:

```tsx
<todo-list class="todo-list" aria-hidden="true"></todo-list>
```

`<Host>`は仮想コンポーネントであり、ホスト要素の属性を宣言的に設定するためにステンシルによって公開される仮想APIであり、DOMにレンダリングされることはありません。つまり、Chrome DevToolsに `<Host>`が表示されることはありません。


### `<Host>`は `<Fragment>`として機能します

`<Host>`は、たとえば次のように、ルートレベルで複数のコンポーネントをレンダリングする必要がある場合にも使用できます。

これは、次のような `render（）`メソッドによって実現できます。

```tsx
@Component({tag: 'my-cmp'})
export class MyCmp {
  render() {
    return (
      <Host>
        <h1>Title</h1>
        <p>Message</p>
      </Host>
    );
  }
}
```

このJSXは、次のHTMLをレンダリングします。

```markup
<my-cmp>
  <h1>Title</h1>
  <p>Message</p>
</my-cmp>
```

`<Host>`を使用してホスト要素の属性をレンダリングしない場合でも、ルートレベルで多くの要素をレンダリングするのに便利なAPIです。

## 要素デコレータ

`@Element()`デコレータは、クラスインスタンス内のホスト要素にアクセスする方法です。 これは `HTMLElement`のインスタンスを返すため、ここでは標準のDOMメソッド/イベントを使用できます。

```tsx
import { Element } from '@stencil/core';

...
export class TodoList {

  @Element() el: HTMLElement;

  getListHeight(): number {
    return this.el.getBoundingClientRect().height;
  }
}
```

propまたは状態の変更に応じてホスト要素を更新する必要がある場合は、 `<Host>`要素を使用して `render()`メソッドで更新する必要があります。

## スタイリング

[スタイリングページ](https://stenciljs.com/docs/styling#shadow-dom-in-stencil)でスタイリングの詳細を確認してください。

CSSは、`@Component`デコレータで定義されたコンポーネントタグを使用して`<Host>`要素に適用できます。

```tsx
@Component({
  tag: 'my-cmp',
  styleUrl: 'my-cmp.css'
})
...
```

my-cmp.css:

```css
my-cmp {
  width: 100px;
}
```

### Shadow DOM

注意すべき点は、シャドウDOMを使用する場合の `<Host>`要素のスタイリングはまったく同じようには機能しないということです。 `my-cmp`要素セレクターを使用する代わりに、`:host`を使用する必要があります。

```tsx
@Component({
  tag: 'my-cmp',
  styleUrl: 'my-cmp.css',
  shadow: true
})
...
```

my-cmp.css:

```css
:host {
  width: 100px;
}
```
