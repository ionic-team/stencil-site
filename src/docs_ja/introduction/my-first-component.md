---
title: My First Component
description: My First Component
url: /docs/my-first-component
contributors:
  - jthoms1
  - simonhaenisch
---

# 初めてのコンポーネント

Stencil components are created by adding a new file with a `.tsx` extension, such as `my-first-component.tsx`, and placing them in the `src/components` directory.
ステンシルコンポーネントは `my-first-component.tsx` のような `.tsx` 拡張子を持つ新しいファイルを追加して `src/components` ディレクトリに配置することで作成されます。
The `.tsx` extension is required since Stencil components are built using [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) and TypeScript.
ステンシルコンポーネントは [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) と TypeScript を使ってビルドされるので、`.tsx` 拡張子は必須です。

Here is an example of what a Stencil component looks like:
以下にStencilコンポーネントがどのように見えるかの例を示します。

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
> Don't fully understand what's going on? Don't worry, we'll explain each piece in detail later on.
> 謎が解けていませんか？後ほど一つ一つ丁寧に説明しますので、ご安心ください。


Once compiled, this component can be used in HTML just like any other tag.
一度コンパイルすると、このコンポーネントは他のタグと同じようにHTMLで使用することができます。

```markup
<my-first-component name="Max"></my-first-component>
```

> Web Components must have a - in the tag. `firstComponent` would not be a valid tag name.
> ウェブコンポーネントはタグに - を付けなければなりません。firstComponent` は有効なタグ名ではありません。

When rendered, the browser will display `My name is Max`.
レンダリングされると、ブラウザは `My name is Max` と表示します。

## So what is really going on here?

Let's dive in.
飛び込んでみましょう。

The first piece we see is the `@Component` decorator.
最初に見るものは `@Component` デコレータです。
This decorator provides metadata about our component to the Stencil compiler.
このデコレータは、コンポーネントに関するメタデータを Stencil コンパイラに提供します。
Information, such as the tag to use, and external styles, can be set here and picked up by the compiler.
使用するタグや外部スタイルなどの情報は、ここで設定してコンパイラに拾われます。

Below the `@Component()` decorator, we have a standard JavaScript class.
`Component()` デコレータの下には、標準の JavaScript クラスがあります。
This is where you'll write the bulk of your code to bring your Stencil component to life.
ここには、ステンシルコンポーネントに命を吹き込むためのコードの大部分を書きます。
Here is where you'd write functions or provide business logic.
ここに関数を書いたり、ビジネスロジックを提供したりします。

In order for the component to render something to the screen, we must declare a render function that returns JSX.
コンポーネントが画面に何かをレンダリングするためには、JSX を返すレンダリング関数を宣言しなければなりません。
If you're not sure what JSX is, don't worry, we'll go over it in detail in the <stencil-route-link url="/docs/templating">Templating Docs</stencil-route-link>.
JSX が何かわからない場合は、<stencil-route-link url="/docs/templating">Templating Docs</stencil-route-link>で詳しく説明していますので、ご安心ください。

The quick idea is that our render function needs to return a representation of the HTML we want to push to the DOM.
簡単に説明すると、レンダリング関数は DOM にプッシュしたい HTML の表現を返す必要があるということです。

The `name` property on the class also has a decorator applied to it, `@Prop()`.
クラスの `name` プロパティにはデコレータ `@Prop()` が適用されています。
This decorator tells the compiler that the property is public to the component, and the user should be setting it.
このデコレータは、このプロパティがコンポーネントに対してパブリックであることをコンパイラに伝え、ユーザが設定する必要があります。
We set this property like so:
このプロパティは次のように設定します。

```markup
<my-first-component name="Max"></my-first-component>
```
Any property decorated with `@Prop()` is also automatically watched for changes.
`@Prop()` で装飾されたプロパティも自動的に変更を監視します。
If a user of our component were to change the element's `name` property, our component would fire its `render` function again, updating the displayed content.
このコンポーネントのユーザが要素の `name` プロパティを変更した場合、コンポーネントは `render` 関数を再び実行し、表示された内容を更新します。


## Component Generator

The Stencil CLI can generate new components for you. If you used one of the starters, you can simply run the `generate` npm script in your project, which will start the interactive generator.
Stencil CLIは新しいコンポーネントを生成することができます。スターターのいずれかを使用した場合は、プロジェクトで `generate` npm スクリプトを実行するだけで、インタラクティブなジェネレータが起動します。

```shell
npm run generate
```

Or you can invoke the Stencil CLI directly with the `generate` command (`g` for short). If you don't have `stencil` installed globally, prefix the command with `npx`.
または、`generate` コマンド (略して `g`) を使って直接ステンシル CLI を起動することもできます。グローバルに `stencil` がインストールされていない場合は、コマンドの前に `npx` を付けてください。

```shell
stencil generate
```

You can optionally pass the component tag name directly to the command. Remember that the component tag name needs to be lowercase and contain at least one hyphen. In the second step, the generator will ask you which files to generate. This allows you to bootstrap a stylesheet as well as spec and e2e tests along with the component file.
オプションで、コンポーネントタグ名を直接コマンドに渡すことができます。コンポーネントタグ名は小文字で、ハイフンを少なくとも1つ含む必要があることを覚えておいてください。2番目のステップでは、ジェネレーターは生成するファイルを尋ねてきます。これにより、スタイルシートだけでなく、specやe2eテストもコンポーネントファイルと一緒にブートストラップすることができます。

All components will be generated within the `src/components` folder. Within that, a folder will be created with the same name as the component tag name you provided, and within that folder the files will be generated. It is also possible to specify one or multiple sub-folders to generate the component in.
すべてのコンポーネントは `src/components` フォルダ内に生成されます。その中に、指定したコンポーネントタグ名と同じ名前のフォルダが作成され、そのフォルダ内にファイルが生成されます。コンポーネントを生成するサブフォルダを1つまたは複数指定することも可能です。

For example, if you specify `pages/page-home` as the component tag name, the files will be generated in `src/components/pages/page-home`.

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
