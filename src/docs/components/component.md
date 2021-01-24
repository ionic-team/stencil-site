---
title: Decorators
description: Decorators
url: /docs/component
contributors:
  - jthoms1
---

# Componentデコレータ

各ステンシルコンポーネントは、`@stencil/core` パッケージの `@Component()` デコレータを記述する必要があります。`@Component()` デコレータの単純な使用例では、HTMLの `tag` 名を指定することです。多くの場合、`styleUrl` や `styleUrls` も記述しますが、アプリケーションのモードやテーマに応じて、複数の異なるスタイルシートを提供することができます。

styleUrlには、`.css` ファイルへの相対的なURLを使用します。

```tsx
import { Component } from '@stencil/core';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css'
})
export class TodoList {

}
```

## Componentオプション

`@Component(opts: ComponentOptions)` は、すべてのコンポーネントレベルの機能を含む必要なオブジェクトを取得します。
`tag`名だけが唯一の必須プロパティですが、他にもたくさんのプロパティがあります。

```tsx
export interface ComponentOptions {
  /**
   * Tag name of the web component. Ideally, the tag name must be globally unique,
   * so it's recommended to choose a unique prefix for all your components within the same collection.
   *
   * In addition, tag name must contain a '-'
   */
  tag: string;

  /**
   * If `true`, the component will use scoped stylesheets. Similar to shadow-dom,
   * but without native isolation. Defaults to `false`.
   */
  scoped?: boolean;

  /**
   * If `true`, the component will use native shadow-dom encapsulation, it will fallback to `scoped` if the browser
   * does not support shadow-dom natively. Defaults to `false`.
   */
  shadow?: boolean;

  /**
   * Relative URL to some external stylesheet file. It should be a `.css` file unless some
   * external plugin is installed like `@stencil/sass`.
   */
  styleUrl?: string;

  /**
   * Similar as `styleUrl` but allows to specify different stylesheets for different modes.
   */
  styleUrls?: string[] | d.ModeStyles;

  /**
   * String that contains inlined CSS instead of using an external stylesheet.
   * The performance characteristics of this feature are the same as using an external stylesheet.
   *
   * Notice, you can't use sass, or less, only `css` is allowed using `styles`, use `styleUrl` if you need more advanced features.
   */
  styles?: string;

  /**
   * Array of relative links to folders of assets required by the component.
   */
  assetsDirs?: string[];

  /**
   * @deprecated Use `assetsDirs` instead
   */
  assetsDir?: string;
}
```


## コンポーネントの埋め込み、またはネスト

JSXコードにHTMLタグを追加することで、コンポーネントの中身を記述できます。これは、ただのHTMLタグなので、別のStencilコンポーネント内で、Stencilコンポーネントを使用するためには、何もインポートする必要はありません。

ここでは、別のコンポーネント内でコンポーネントを使用した例を紹介します。

```tsx
import { Component, Prop, h } from '@stencil/core'

@Component({
  tag: 'my-embedded-component'
})
export class MyEmbeddedComponent {
  @Prop() color: string = 'blue';

  render() {
    return (
      <div>My favorite color is {this.color}</div>
    );
  }
}
```

```tsx
import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-parent-component'
})
export class MyParentComponent {

  render() {
    return (
      <div>
        <my-embedded-component color="red"></my-embedded-component>
      </div>
    );
  }
}
```

`my-parent-component` は、関数 `render()` に `my-embedded-component` への参照を含みます。
