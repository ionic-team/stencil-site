---
title: Properties
description: Properties
url: /docs/properties
contributors:
  - jthoms1
---

# Propデコレータ

Propは、開発者が値を提供できる要素で公開されているカスタム属性/プロパティです。 子コンポーネントは親コンポーネントを認識または参照してはならないため、プロップを使用して親から子にデータを渡す必要があります。 コンポーネントは、 `@Prop()`デコレータを使用して、受け取る予定のPropを明示的に宣言する必要があります。 Propは、 `number`、`string`、 `boolean`、または`Object`や `Array`にすることができます。 デフォルトでは、 `@Prop()`デコレータでデコレートされたメンバーが設定されている場合、コンポーネントは効率的に再レンダリングされます。

```tsx
import { Prop } from '@stencil/core';

...
export class TodoList {
  @Prop() color: string;
  @Prop() favoriteNumber: number;
  @Prop() isSelected: boolean;
  @Prop() myHttpService: MyHttpService;
}
```

`TodoList`クラス内では、Propは`this`演算子を介してアクセスされます。

```tsx
logColor() {
  console.log(this.color)
}
```


外部的には、Propは要素に設定されます。

> HTMLでは、ダッシュケースを使用して属性を設定する必要があります。

```markup
<todo-list color="blue" favorite-number="24" is-selected="true"></todo-list>
```

JSXでは、キャメルケースを使用して属性を設定します。

```markup
<todo-list color="blue" favoriteNumber={24} isSelected="true"></todo-list>
```

要素からJS経由でアクセスすることもできます。

```tsx
const todoListElement = document.querySelector('todo-list');
console.log(todoListElement.myHttpService); // MyHttpService
console.log(todoListElement.color); // blue
```

## Propオプション

`@Prop(opts?: PropOptions)`デコレータは、オプションの引数を受け入れて、 `mutability`、DOM属性の名前、またはプロパティの値をDOMに反映する必要があるかどうかなど、特定のオプションを指定します。

```tsx
export interface PropOptions {
  attribute?: string;
  mutable?: boolean;
  reflect?: boolean;
}
```

### Propの可変性

Propは、コンポーネントロジックの内部から _デフォルトで_ 不変であることを知っておくことが重要です。 ユーザーが値を設定すると、コンポーネントはその値を内部で更新できなくなります。

ただし、以下の例のように、Propを**可変**として宣言することにより、コンポーネント内からPropを明示的に変更できるようにすることができます。

```tsx
import { Prop } from '@stencil/core';

...
export class NameElement {

  @Prop({ mutable: true }) name: string = 'Stencil';

  componentDidLoad() {
    this.name = 'Stencil 0.7.0';
  }
}
```

### 属性名

プロパティとコンポーネント属性は強く関連していますが、必ずしも同じものである必要はありません。 属性はHTMLの概念ですが、プロパティはオブジェクト指向プログラミングに固有のJSです。

Stencilでは、**プロパティ**に適用された `@Prop()`デコレータは、DOM属性の変更もリッスンするようにStencilコンパイラに指示します。

通常、プロパティの名前は属性と同じですが、常にそうであるとは限りません。 次のコンポーネントを例として取り上げます。

```tsx
import { Component, Prop } from '@stencil/core';

@Component({ tag: 'my-cmp' })
class Component {
  @Prop() value: string;
  @Prop() isValid: boolean;
  @Prop() controller: MyController;
}
```

このコンポーネントには**3つのプロパティ**がありますが、コンパイラは`value`と `is-valid`の**2つの**属性のみを作成します。

```markup
<my-cmp value="Hello" is-valid></my-cmp>
```

`controller`タイプはプリミティブではないことに注意してください。DOM属性は文字列のみであるため、「controller」と呼ばれる関連付けられたDOM属性を持つことは意味がありません。

同時に、 `isValid`プロパティは _camelCase_ の命名に従いますが、属性では大文字と小文字が区別されないため、属性名はデフォルトで`is-valid`になります。

幸い、この「デフォルト」の動作は、`@Prop()`デコレータの `attribute`オプションを使用して変更できます。


```tsx
import { Component, Prop } from '@stencil/core';

@Component({ tag: 'my-cmp' })
class Component {
  @Prop() value: string;
  @Prop({ attribute: 'valid' }) isValid: boolean;
  @Prop({ attribute: 'controller' }) controller: MyController;
}
```

このオプションを使用することで、どのプロパティにDOM属性が関連付けられているかとその名前が明示されています。


### プロパティ値を属性に反映する

場合によっては、プロップを属性と同期させておくと便利なことがあります。 この場合、デフォルトで `false`になっているため、`@Prop()`デコレータの`reflect`オプションを `true`に設定できます。

```tsx
@Prop({
  reflect: true
})
```

「prop」が「reflect」に設定されている場合、それらの値がHTML属性としてDOMにレンダリングされることを意味します。

次のコンポーネントを例として取り上げます。

```tsx
@Component({ tag: 'my-cmp' })
class Cmp {
  @Prop({ reflect: true }) message = 'Hello';
  @Prop({ reflect: false }) value = 'The meaning of life...';
  @Prop({ reflect: true }) number = 42;
}
```

DOMでレンダリングすると、次のようになります。

```markup
<my-cmp message="Hello" number="42"></my-cmp>
```
「reflect」(true)に設定されたプロパティは属性としてレンダリングされ、「reflect」に設定されていないプロパティはレンダリングされないことに注意してください。

「value」など、「reflect」に設定されていないプロパティは属性としてレンダリングされませんが、属性としてレンダリングされないわけではありません。「value」プロパティには、割り当てられた「人生の意味...」値が含まれています。

```tsx
const cmp = document.querySelector('my-cmp');
console.log(cmp.value); // it prints 'The meaning of life...'
```

## Propのデフォルト値と検証

Propにデフォルト値を設定する。

```tsx
import { Prop } from '@stencil/core';

...
export class NameElement {
  @Prop() name: string = 'Stencil';
}
```

プロップの検証を行うには、[@Watch()](reactive-data/#watch-decorator)デコレータを使用できます。

```tsx
import { Prop, Watch } from '@stencil/core';

...
export class TodoList {
  @Prop() name: string = 'Stencil';

  @Watch('name')
  validateName(newValue: string, oldValue: string) {
    const isBlank = typeof newValue !== 'string' || newValue === '';
    const has2chars = typeof newValue === 'string' && newValue.length >= 2;
    if (isBlank) { throw new Error('name: required') };
    if (!has2chars) { throw new Error('name: has2chars') };
  }
}
```
