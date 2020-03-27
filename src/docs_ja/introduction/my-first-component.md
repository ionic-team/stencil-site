---
title: My First Component
description: My First Component
url: /docs/my-first-component
contributors:
  - jthoms1
  - simonhaenisch
---

# 初めてのコンポーネント

Stencilコンポーネントは `my-first-component.tsx` のような `.tsx` 拡張子を持つ新しいファイルを追加して `src/components` ディレクトリに配置することで作成されます。
Stencilコンポーネントは、[JSX](https://facebook.github.io/react/docs/introducing-jsx.html)と、 TypeScriptを使ってビルドされるので、`.tsx` 拡張子は必須です。

以下に、Stencilコンポーネントのコード例を示します。

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-first-component',
})
export class MyComponent {

  // Indicate that name should be a public property on the component
  @Prop() name: string;

  render() {
    return (
      <p>
        My name is {this.name}
      </p>
    );
  }
}
```
> 謎が解けていませんか？後ほど、一つ一つ丁寧に説明しますので、ご安心ください。


一度コンパイルすると、このコンポーネントは、他のタグと同じように、HTMLで使用することができます。

```markup
<my-first-component name="Max"></my-first-component>
```

> Webコンポーネントは、タグに「-」を付けなければなりません。`firstComponent`は、有効なタグ名ではありません。

レンダリングされると、ブラウザは `My name is Max` と表示します。

## このコードでは、何が起こっているのでしょうか？

では、先ほどのコードを順に見ていきましょう。

最初に見えるものは、`@Component` デコレータです。
このデコレータは、コンポーネントに関するメタデータを、Stencilコンパイラに教えます。
使用するタグや、外部スタイルなどの情報を、ここで設定し、コンパイラで取得できます。

`@Component()` デコレータの下には、標準のJavaScriptクラスがあります。
ここで、コードの大部分を記述して、Stencilコンポーネントを実現します。
ここで、関数を記述したり、ビジネスロジックを提供したりします。

コンポーネントが、画面に何かをレンダリングするためには、JSXを返すrender関数を、宣言しなければなりません。
JSXが何かわからない場合は、<stencil-route-link url="/docs/templating">Templating Docs</stencil-route-link>で詳しく説明していますので、ご安心ください。

簡単に説明すると、render関数は、DOMに追加したい、HTMLを返す必要があるということです。

MyComponentクラスの `name` プロパティにはデコレータ `@Prop()` が適用されています。
このデコレータは、このプロパティがコンポーネントに対してパブリックであり、ユーザーが設定する必要があることを、コンパイラに伝えています。
このプロパティは、次のように設定します。

```markup
<my-first-component name="Max"></my-first-component>
```
`@Prop()` で装飾されたプロパティも、自動的に変更を監視します。
このコンポーネントのユーザが、要素の `name` プロパティを変更した場合、コンポーネントは `render` 関数を再び実行し、表示された内容を更新します。

## コンポーネント・ジェネレーター

Stencil CLIは新しいコンポーネントを生成することができます。スターターを使用してプロジェクトを生成した場合は、 `generate` npm スクリプトを実行するだけで、インタラクティブなジェネレータが起動します。

```shell
npm run generate
```

または、`generate` コマンド (略して `g`) を使って直接ステンシル CLI を起動することもできます。グローバルに `stencil` がインストールされていない場合は、コマンドの前に `npx` を付けてください。

```shell
stencil generate
```

オプションで、コンポーネントタグ名を直接コマンドに渡すことができます。コンポーネントタグ名は小文字で、少なくともハイフンを1つ含む必要があります。2番目のステップでは、ジェネレーターは生成するファイルを尋ねてきます。これにより、コンポーネントファイルと一緒に、スタイルシートと、specやe2eテストも一緒にブートストラップすることができます。

すべてのコンポーネントは、`src/components` フォルダ内に生成されます。その中に、指定したコンポーネントタグ名と同じ名前のフォルダが作成され、そのフォルダ内にファイルが生成されます。コンポーネントを生成するサブフォルダを1つまたは複数指定することも可能です。

例えば、コンポーネントタグ名に`pages/page-home`を指定した場合、ファイルは`src/components/pages/page-home`に生成されます。


```shell
stencil generate pages/page-home
```

```plain
src
 |- components
     |- pages
         |- page-home
             |- page-home.css
             |- page-home.e2e.ts
             |- page-home.spec.ts
             |- page-home.tsx
```
