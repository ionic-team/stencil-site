---
title: Functional Components
description: Functional Components
url: /docs/functional-components
contributors:
  - simonhaenisch
---

＃関数型コンポーネントの操作

関数型コンポーネントは、StencilのJSXコンパイラの一部であるため、通常のStencilのWebコンポーネントとはまったく異なります。 関数型コンポーネントは、基本的に、Propのオブジェクトを取得してJSXに変換する関数です。

```tsx
const Hello = props => <h1>Hello, {props.name}!</h1>;
```

JSXトランスパイラーがそのようなコンポーネントに遭遇すると、その属性を取得し、それらを `props`オブジェクトとして関数に渡し、コンポーネントを関数によって返されるJSXに置き換えます。

```tsx
<Hello name="World" />
```

関数型コンポーネントは、2番目の引数 `children`も受け入れます。

```tsx
const Hello = (props, children) => [
  <h1>Hello, {props.name}</h1>,
  children
];
```

JSXトランスパイラーは、コンポーネントのすべての子要素を配列として関数の `children`引数に渡します。

```tsx
<Hello name="World">
  <p>I'm a child element.</p>
</Hello>
```

Stencilは、コンポーネントのプロパティのインターフェイスを指定できる「関数型コンポーネント」ジェネリック型を提供します。

```tsx
// Hello.tsx

import { FunctionalComponent, h } from '@stencil/core';

interface HelloProps {
  name: string;
}

export const Hello: FunctionalComponent<HelloProps> = ({ name }) => (
  <h1>Hello, {name}!</h1>
);
```

## 子との協力

関数型コンポーネントの2番目の引数は渡された子を受け取りますが、それらを操作するために、 `FunctionalComponent`は子を変換するための` map() `メソッドを公開するutilsオブジェクトを提供し、 それら。 StencilコンパイラはprodモードでvNodeプロパティの名前を変更できるため、 `children`配列を読み取ることはお勧めしません。

```tsx
export interface FunctionalUtilities {
  forEach: (children: VNode[], cb: (vnode: ChildNode, index: number, array: ChildNode[]) => void) => void;
  map: (children: VNode[], cb: (vnode: ChildNode, index: number, array: ChildNode[]) => ChildNode) => VNode[];
}
export interface ChildNode {
  vtag?: string | number | Function;
  vkey?: string | number;
  vtext?: string;
  vchildren?: VNode[];
  vattrs?: any;
  vname?: string;
}
```

**例:**

```tsx
export const AddClass: FunctionalComponent = (_, children, utils) => (
  utils.map(children, child => ({
    ...child,
    vattrs: {
      ...child.vattrs,
      class: `${child.vattrs.class} add-class`
    }
  }
  ))
);
```

> JSXで関数型コンポーネントを使用する場合、その名前は大文字で始める必要があります。 したがって、そのようにエクスポートすることは理にかなっています。


## 免責事項

関数型コンポーネントとクラスコンポーネントの間には、いくつかの大きな違いがあります。 関数型コンポーネントはJSX内の単なるシンタックスシュガーなので、

* Webコンポーネントにコンパイルされていません。
* DOMノードを作成しないでください。
* ShadowDOMまたはスコープスタイルはありません。
* ライフサイクルフックはありません、
* ステートレスです。

関数型コンポーネントを使用するかどうかを決定する際に留意すべき1つの概念は、多くの場合、アプリケーションのUIはその状態の関数である可能性があるということです。 たとえば、同じ状態が与えられると、常に同じUIをレンダリングします。 コンポーネントが状態を保持したり、イベントを処理したりする必要がある場合は、おそらくクラスコンポーネントである必要があります。 コンポーネントの目的が単にマークアップをカプセル化してアプリ全体で再利用できるようにすることである場合、それはおそらく関数型コンポーネントである可能性があります（特に、コンポーネントライブラリを使用しているため、スタイルを設定する必要がない場合）。