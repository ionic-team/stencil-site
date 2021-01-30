---
title: Reactive Data, Handling arrays and objects
description: Reactive Data, Handling arrays and objects
url: /docs/reactive-data
contributors:
  - jthoms1
---

# リアクティブデータ

Stencilコンポーネントは、コンポーネントのPropまたは状態が変更されると更新されます。 パフォーマンスと単純さのために、Stencilは変更の参照のみを比較し、配列またはオブジェクト内のデータが変更されたときに再レンダリングしません。

## レンダリング方法

状態の変化(propsまたは状態の変化)が原因でコンポーネントが更新されると、[`render（）`](templating-jsx)メソッドが実行されるようにスケジュールされます。


## デコレータを見る

ユーザーがプロパティを更新すると、 `Watch`はアタッチされているメソッドを起動し、そのメソッドに古い値と一緒にPropの新しい値を渡します。 「ウォッチ」は、Propの検証や副作用の処理に役立ちます。 コンポーネントが最初にロードされたとき、 `Watch`デコレータは起動しません。


```tsx
import { Prop, Watch } from '@stencil/core';

export class LoadingIndicator {
  @Prop() activated: boolean;

  @Watch('activated')
  watchHandler(newValue: boolean, oldValue: boolean) {
    console.log('The new value of activated is: ', newValue);
  }
}
```


## 配列とオブジェクトの処理

配列またはオブジェクトのデータを更新するには、次の手法を使用します。これらの手法は、最新のJavaScriptツールボックスのコア部分として急速に普及しています。

### 配列の更新

配列の場合、 `push()`や `unshift()`などの標準の可変配列操作はコンポーネントの更新をトリガーしません。 代わりに、新しい配列のコピーを返すため、変更不可能な配列演算子を使用する必要があります。 これらには、 `map()`と `filter()`、およびES6スプレッド演算子構文が含まれます。

たとえば、新しいアイテムを配列にプッシュするには、既存の値と最後に新しい値を使用して新しい配列を作成します。

```tsx
@State() items: string[];

// our original array
this.items = ['ionic', 'stencil', 'webcomponents'];

// update the array
this.items = [
  ...this.items,
  'awesomeness'
]
```


`...this.items`構文は、JavaScriptの比較的新しい機能であり、指定されたオブジェクトを所定の位置に「拡張」します。 Spread演算子の詳細については、[こちら](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)をご覧ください。

### オブジェクトの更新

スプレッド演算子は、オブジェクトの更新にも使用する必要があります。 配列と同様に、オブジェクトを変更してもStencilでビューの更新はトリガーされませんが、オブジェクトの新しいコピーを返すとトリガーされます。 以下に例を示します。

```tsx
@State() myCoolObject;

// our original object
this.myCoolObject = {first: '1', second: '2'}

// update our object
this.myCoolObject = { ...myCoolObject, third: '3' }
```
