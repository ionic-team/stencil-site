---
title: Styling Components
description: Styling Components
url: /docs/styling
contributors:
  - jthoms1
  - shreeshbhat
---

# ＃スタイリングコンポーネント

## Shadow DOM

### ShadowDOMとは

[Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom)は、DOMのカプセル化とスタイルのカプセル化を可能にするブラウザーに組み込まれたAPIです。 Shadow DOMは、コンポーネントを周囲の環境から保護します。 これは、CSSを正しくスコープすることを心配する必要がなく、内部DOMがコンポーネントの外部に干渉されることを心配する必要がないことを意味します。

### ブラウザのサポート

Shadow DOMは現在、次のブラウザでネイティブにサポートされています。

- クローム
- Firefox
- Safari
- Opera

Shadow DOMをサポートしていないブラウザーでは、スコープ付きCSSにフォールバックします。 これにより、Shadow DOMに付属するスタイルのカプセル化が可能になりますが、巨大なShadowDOMポリフィルは読み込まれません。

>スコープ付きCSSとは何かについて混乱していますか？ 心配しないでください。[後で詳細を説明します](#scoped-css)。

### ###ステンシルのShadowDOM

シャドウDOMは現在、ステンシルで構築されたWebコンポーネントに対してデフォルトでオンになっていません。 Stencilで構築されたWebコンポーネントでShadowDOMをオンにするには、コンポーネントデコレータで `shadow`パラメータを使用できます。 以下はその一例です。

```tsx
@Component({
  tag: 'shadow-component',
  styleUrl: 'shadow-component.css',
  shadow: true
})
export class ShadowComponent {

}
```

### ShadowDOMで覚えておくべきこと

- QuerySelector: ShadowDOMを使用していて、Webコンポーネント内の要素をクエリする場合は、 `this.el.shadowRoot.querySelector()`を使用する必要があります。 これは、Webコンポーネント内のすべてのDOMがShadowDOMが作成するshadowRootにあるためです。

- グローバルスタイル: Shadow DOMを使用してコンポーネントを外部スタイルにするには、[CSSカスタムプロパティ](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)または提案されている[CSSシャドウパーツ](https://meowni.ca/posts/part-theme-explainer/)を使用する必要があります。

- 通常は、次のようにコンポーネントのタグ名でスタイルをラップします。

```css
my-element {
  color: black;
}
my-element div {
  background: blue;
}
```

Shadow DOMを有効にすると、シャドウルート内の要素がスコープされ、コンポーネント外のスタイルは適用されません。 その結果、コンポーネント内のCSSセレクターを簡略化でき、上記の例は次のようになります。

```css
:host {
  color: black;
}
div {
  background: blue;
}
```

### スコープ付きCSS

現在ShadowDOMをサポートしていないブラウザーでは、Stencilで構築されたWebコンポーネントは、大きなShadow DOMポリフィルをロードする代わりに、スコープ付きCSSの使用にフォールバックします。 スコープ付きCSSは、実行時に各スタイルにデータ属性を追加することにより、CSSを要素に自動的にスコープします。


## グローバルスタイル

ステンシルは、開発者が各コンポーネントを対象とするスタイルを作成することを推奨していますが、使用するコンポーネントに関係なく、ドキュメント全体に適用されるグローバルスタイルが必要になる場合があります。

そのために、 `stencil.config.ts`には、スタイルシートパスを指すオプションの[` globalStyle`設定](https://stenciljs.com/docs/config#globalstyle)が付属しています。

```tsx
export const config: Config = {
  namespace: 'app',
  globalStyle: 'src/global/global.css',
  outputTarget: [{
    type: 'www'
  }]
}
```

コンパイラは、`global.css`に対して同じ縮小、自動プレフィックス、プラグインを実行し、 [`www`](https://stenciljs.com/docs/www)と、[`dist`](https://stenciljs.com/docs/distribution)の出力ファイルを生成します。 生成されたファイルの拡張子は常に `.css`で、指定された`namespace`という名前が付けられます。

上記の例では、名前空間が `app`であるため、生成されたグローバルスタイルファイルは`./www/build/app.css`にあります。

このファイルは、アプリケーションの `index.html`に手動でインポートする必要があります。これは、`src/index.html`にあります。

```tsx
<link rel="stylesheet" href="/build/app.css">
```

グローバルスタイルは**グローバル**スタイル用に予約する必要があることに注意してください。つまり、コンポーネントのスタイルを設定しないようにする必要があります。代わりに、次のような興味深いユースケースがあります。

- テーマ: アプリ全体で使用されるCSS変数を定義する
- `@font-face`でフォントをロードします
- アプリ全体のフォントファミリー
- スタイルボディの背景
- CSSリセット


## CSS変数

### CSS変数とは何ですか？

[CSS変数](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)は[Sass変数](https://ionicframework.com/docs/theming/sass-variables/)によく似ています。ですが、ブラウザに組み込まれています。 CSS変数を使用すると、アプリ全体で使用できるCSSプロパティを指定できます。


### 使用事例

CSS変数の1つのユースケースは色です。 アプリの主要なブランドカラーがアプリ全体で使用されている場合は、アプリ内の必要な場所ごとに同じ色を書き出す代わりに、変数を作成して、アプリ内でその色が必要な場所でその変数を使用できます。また、この色を変更する必要がある場合は、変数を変更するだけで、アプリ全体で更新されます。

### ステンシルでのCSS変数の使用

ステンシルでCSS変数を使用するための推奨手順は次のとおりです。

- 変数定義を保持するCSSファイルを作成します。 通常、 `src/global/`に `variables.css`ファイルを作成することをお勧めします
- 次に、この構成 `globalStyle: 'src/global/variables.css'`を`stencil.config.ts`ファイルに入れることができます。

それでおしまい！ これで、変数の定義を開始できます。

### CSS変数の定義

CSS変数を定義する例を次に示します。

```css
/* inside our src/global/variables.css file */

:root {
  --app-primary-color: #488aff;
}
```

この例では、色 `#488aff`に設定された`--app-primary-color`というCSS変数を定義しました。 この例の `:root`セレクターは、変数をアプリ全体で使用できるように、プロジェクトのルート要素の変数を定義する[CSS疑似クラス](https://developer.mozilla.org/en-US/docs/Web/CSS/:root)です（通常は `<html>`）。

### CSS変数の使用

上記で定義したCSS変数の使用例を次に示します。

```css
h1 {
  color: var(--app-primary-color)
}
```

これにより、CSS変数で定義した色（この場合は `#488aff`）が`h1`要素に適用されます。

### IEのサポート

IE11はCSS変数をネイティブにサポートしていませんが、JSをポリフィルするのと同じ方法でCSS機能をポリフィルすることは不可能であるため、ステンシルはベストエフォートのポリフィルを提供します。

CSS変数のステンシルポリフィルには、それをネイティブにサポートするブラウザーに関して多くの制限があり、パフォーマンスのオーバーヘッドが大きくなります。

- グローバルCSS変数は、 `:root`または`html`でのみ宣言でき、動的にすることはできません。
- 動的CSS変数を持つことができるのは、`shadow`または`scoped`コンポーネントのスタイルシートのみです。
- コンポーネント内のCSS変数は、 `:host(...)`セレ

```css
:host() {
  /* This works */
  --color: black;
}
:host(.white) {
  /* This works */
  --color: white;
}
.selector {
  /* This DOES NOT work in IE11 */
  --color: red;
}
```


- コンポーネント内のCSS変数は、任意のセレクターで使用できます(`var(--thing)`)。

IE11でCSS変数を使用する場合のパフォーマンスのオーバーヘッドは、CPU時間とメモリの点で高くなります。 これは、CSS変数の動的な性質を「シミュレート」するために、ポリフィルが異なるスタイルシートPERインスタンスを動的に生成する必要があるためです。 たとえば、DOMに200個の `my-cmp`要素がある場合、ポリフィルは200個の類似した`<style>`タグを添付して各要素のスタイルを設定します。

IE11で処理されるスタイルシートの総数は急速に増加する可能性があり、大量のメモリを消費し、スタイルの無効化ごとに大量のCPUを必要とします。