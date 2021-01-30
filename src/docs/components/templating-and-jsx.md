---
title: Using JSX
description: Using JSX
url: /docs/templating-jsx
contributors:
  - jthoms1
  - simonhaenisch
  - arjunyel
---

# JSXの使用

Stencilコンポーネントは、一般的な宣言型テンプレート構文であるJSXを使用してレンダリングされます。 各コンポーネントには、実行時にDOMにレンダリングされるコンポーネントのツリーを返す `render`関数があります。

## 基本

`render`関数は、画面に描画されるコンポーネントのツリーを出力するために使用されます。

```tsx
class MyComponent {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <p>This is JSX!</p>
      </div>
    );
  }
}
```

この例では、 `h1`と`p`の2つの子要素を持つ `div`のJSX表現を返します。

### ホスト要素

コンポーネント自体にクラスや属性を追加するなど、ホスト要素自体を変更する場合は、 `<Host>`機能コンポーネントを使用します。 詳細を確認する[こちら](host-element)。


## データバインディング

多くの場合、コンポーネントは動的データをレンダリングする必要があります。 JSXでこれを行うには、変数の前後に `{}`を使用します。

```tsx
render() {
  return (
    <div>Hello {this.name}</div>
  )
}
```

> ES6テンプレート変数に精通している場合、JSX変数は非常によく似ていますが、 `$`がありません。

```tsx
//ES6
`Hello ${this.name}`

//JSX
Hello {this.name}
```


## 条件付き

異なるコンテンツを条件付きでレンダリングする場合は、JavaScriptのif/elseステートメントを使用できます。
ここで、 `name`が定義されていない場合は、別の要素をレンダリングできます。

```tsx
render() {
  if (this.name) {
    return ( <div>Hello {this.name}</div> )
  } else {
    return ( <div>Hello, World</div> )
  }
}
```

さらに、インライン条件は、JavaScriptの三項演算子を使用して作成できます。

```tsx
render() {
  return (
    <div>
    {this.name
      ? <p>Hello {this.name}</p>
      : <p>Hello World</p>
    }
    </div>
  );
}
```

**注意：** Stencilはパフォーマンスを向上させるためにDOM要素を再利用します。 次のコードについて考えてみます。

```tsx
{someCondition
  ? <my-counter initialValue={2} />
  : <my-counter initialValue={5} />
}
```

上記のコードは、次のコードとまったく同じように動作します。

```tsx
<my-counter initialValue={someCondition ? 2 : 5} />
```

したがって、 `someCondition`が変更されても、`<my-counter>`の内部状態はリセットされず、`componentWillLoad()`などのライフサイクルメソッドは起動しません。 代わりに、条件付きはまったく同じコンポーネントへの更新をトリガーするだけです。

条件付きでコンポーネントを破棄して再作成する場合は、 `key`属性を割り当てることができます。 これは、コンポーネントが実際には異なる兄弟であることをStencilに通知します。

```tsx
{someCondition
  ? <my-counter key="a" initialValue={2} />
  : <my-counter key="b" initialValue={5} />
}
```

このように、 `someCondition`が変更された場合、ライフサイクルメソッド`componentWillLoad()`および`componentDidLoad() `も実行する新しい内部状態を持つ新しい`<my-counter>`コンポーネントを取得します。


## スロット

多くの場合、コンポーネントはコンポーネントツリーの特定の場所に動的な子をレンダリングする必要があります。これにより、開発者はコンポーネントを使用するときに子コンテンツを提供でき、コンポーネントはその子コンポーネントを適切な場所に配置します。

これを行うには、 `my-component`内で[Slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot)タグを使用できます。

```tsx
// my-component.tsx

render() {
  return (
    <div>
      <h2>A Component</h2>
      <div><slot /></div>
    </div>
  );
}

```

次に、ユーザーがコンポーネント `my-component`を作成するときに子コンポーネントを渡すと、`my-component`はそれを配置します
上記の2番目の `<div>`内のコンポーネント：

```tsx
render(){
  return(
    <my-component>
      <p>Child Element</p>
    </my-component>
  )
}
```

スロットには、スロットの出力場所を指定できるように「名前」を付けることもできます。

```tsx
// my-component.tsx

render(){
  return [
    <slot name="item-start" />,
    <h1>Here is my main content</h1>,
    <slot name="item-end" />
  ]
}
```

```tsx
render(){
  return(
    <my-component>
      <p slot="item-start">I'll be placed before the h1</p>
      <p slot="item-end">I'll be placed after the h1</p>
    </my-component>
  )
}
```

## ループ

ループは、JSXツリーを作成するときに従来のループを使用するか、既存のJSXにインライン化するときに `map`などの配列演算子を使用してJSXで作成できます。

以下の例では、コンポーネントに、todoオブジェクトのリストである `todos`というローカルプロパティがあると想定します。 配列で[map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)関数を使用して、マップ内の各アイテムをループします。 そしてそれを他のものに変換します-この場合はJSXです。

```tsx
render() {
  return (
    <div>
      {this.todos.map((todo) =>
        <div>
          <div>{todo.taskName}</div>
          <div>{todo.isCompleted}</div>
        </div>
      )}
    </div>
  )
}
```

`map`関数の各ステップで新しいJSXサブツリーが作成され、`map`から返された配列に追加されます。この配列は、その上のJSXツリーに描画されます。


リストが動的である場合、i。 たとえば、アイテムを変更、追加、削除、または並べ替えることができます。安定したIDを与えるには、各要素に一意の「キー」を割り当てる必要があります。 これにより、StencilはDOM要素を再利用してパフォーマンスを向上させることができます。 キーを選択する最良の方法は、兄弟の中でそのリストアイテムを一意に識別する文字列を使用することです（多くの場合、データにはすでにIDがあります）。

> `map`関数のインデックス変数をキーとして使用しないでください。 リストの順序が変更された場合、またはリストの先頭にアイテムを追加した場合に変更される可能性があるため、アイテムの安定したIDを表すものではありません。 そのため、「キー」としては適していません。

```tsx
render() {
  return (
    <div>
      {this.todos.map((todo) =>
        <div key={todo.uid}>
          <div>{todo.taskName}</div>
          <div>{todo.isCompleted}</div>
          <button onClick={() => this.remove(todo)}>X</button>
        </div>
      )}
    </div>
  )
}
```

配列内で使用されるキーは、兄弟間で一意である必要があります。 ただし、グローバルに一意である必要はありません。

## ユーザー入力の処理

Stencilはネイティブの[DOMイベント](https://developer.mozilla.org/en-US/docs/Web/Events)を使用します。

ボタンクリックの処理例を次に示します。 [矢印関数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)の使用に注意してください。

```tsx
...
export class MyComponent {
  private handleClick = () => {
    alert('Received the button click!');
  }

  render() {
    return (
      <button onClick={this.handleClick}>Click Me!</button>
    );
  }
}
```

入力 `change`をリッスンする別の例を次に示します。 [矢印関数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)の使用に注意してください。

```tsx
...
export class MyComponent {
  private inputChanged = (event: Event) => {
    console.log('input changed: ', (event.target as HTMLInputElement).value);
  }

  render() {
    return (
      <input onChange={this.inputChanged}/>
    );
  }
}
```


## 複雑なテンプレートコンテンツ

これまで、単一のルート要素のみを返す方法の例を見てきました。 ルート要素内に要素をネストすることもできます

コンポーネントに複数の「トップレベル」要素がある場合、 `render`関数は配列を返すことができます。
`<div>`要素の間のコンマに注意してください。


```tsx
render() {
  return ([
  // first top level element
  <div class="container">
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>,

  // second top level element, note the , above
  <div class="another-container">
    ... more html content ...
  </div>
  ]);
}
```

`innerHTML`を使用して、コンテンツを要素に直接インライン化することもできます。 これは、たとえば、svgを動的にロードし、それを `div`内にレンダリングする場合に役立ちます。 これは、通常のHTMLの場合と同じように機能します。

```markup
<div innerHTML={svgContent}></div>
```

## DOM要素への参照を取得する

通常の `document.querySelector`で行うように、要素への直接参照を取得する必要がある場合は、JSXで`ref`を使用することをお勧めします。 フォームで `ref`を使用する例を見てみましょう。

```tsx
@Component({
  tag: 'app-home',
})
export class AppHome {

  textInput!: HTMLInputElement;

  handleSubmit = (event: Event) => {
    event.preventDefault();
    console.log(this.textInput.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(el) => this.textInput = el as HTMLInputElement} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

この例では、`ref`を使用して、入力`ref = {(el)=> this.textInput = el asHTMLInputElement}`への参照を取得しています。 次に、その参照を使用して、テキスト入力から直接値を取得するなどの操作を行うことができます(`this.textInput.value`)。


## 共有JSXノードを避ける

レンダラーは、パフォーマンスを向上させるために要素ルックアップをキャッシュします。 ただし、これによる副作用として、まったく同じJSXノードを同じレンダラー内で共有しないでください。

以下の例では、 `sharedNode`変数は`render()`関数内で複数回再利用されています。 レンダラーは、参照をキャッシュすることでDOM要素のルックアップを最適化できますが、これにより、ノードが再利用されるときに問題が発生します。 代わりに、以下の変更された例のように、常に一意のノードを生成することをお勧めします。

```diff
@Component({
  tag: 'my-cmp',
})
export class MyCmp {

  render() {
-    const sharedNode = <div>Text</div>;
    return (
      <div>
-        {sharedNode}
-        {sharedNode}
+        <div>Text</div>
+        <div>Text</div>
      </div>
    );
  }
}
```

または、戻り値が一意のインスタンスになるため、代わりに、共通のJSXノードを返すファクトリ関数を作成することもできます。 例えば：

```tsx
@Component({
  tag: 'my-cmp',
})
export class MyCmp {

  getText() {
    return <div>Text</div>;
  }

  render() {
    return (
      <div>
        {this.getText()}
        {this.getText()}
      </div>
    );
  }
}
```

## その他のリソース

- [JSX for StencilJSアプリケーションについて](https://www.joshmorony.com/understanding-jsx-for-stencil-js-applications/)
