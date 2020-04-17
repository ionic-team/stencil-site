---
title: Extras Config
description: Extras Config
url: /docs/config-extras
contributors:
  - mattdsteele
---

# Extras

`extras`には、ポリフィルの操作が必要なDOMのランタイムを追加するオプションが含まれています。

例えば、Slotポリフィルを使用する場合、すべてのDOM APIが完全にポリフィルされるわけではありません。
全てのユーザーが追加のランタイムを必要とするわけではないため、これらのほとんどはオプトインです。

使用例：

```tsx
export const config: Config = {
  extras: {
    appendChildSlotFix: true,
    cssVarsShim: false
  }
};
```

### appendChildSlotFix

Slotポリフィルは、デフォルトでは`appendChild()`を更新しないため、Shadow DOMのように新しい子ノードを正しい子スロットに追加します。これは、必要な人のためのオプトインポリフィルです。

### cloneNodeFix

ランタイムは、デフォルトではSlotポリフィルを使用するコンポーネントを複製するときに、`cloneNode()`をポリフィルしません。これは、必要な人のためのオプトインポリフィルです。

### cssVarsShim

レガシーブラウザでCSSカスタムプロパティを使うためのpolyfillやshimを含めます。レガシービルドのみデフォルトは`true`です。ESMビルドにはcss vars shimは含まれません。これは、レガシービルドのオプトアウトポリフィルです。

これを`false`に設定すると、レガシービルドに"フォールバック"プロパティを手動で提供する必要があります。例えば次のcssでは、IE11のcss variablesはポリフィルされないため、開発者はcss variablesの直前に手動でフォールバックを提供する必要があります。

```css
div {
  color: blue; /* IEで使用される */
  color: var(--color); /* モダンブラウザで使用される */
}
```

### lifecycleDOMEvents

コンポーネントのライフサイクルイベントをディスパッチします。デフォルトではこれらのイベントはディスパッチされませんが、`true`に設定するとこれらのイベントを`window`でリッスンできます。
主にテストで使用されます。

| イベント名                      | 説明                                                            |
|--------------------------------|----------------------------------------------------------------|
| `stencil_appload`              | アプリとそのすべての子コンポーネントの読み込みが完了しました。 |
| `stencil_componentWillLoad`    | 各コンポーネントの`componentWillLoad`に対してディスパッチされます。 |
| `stencil_componentWillUpdate`  | 各コンポーネントの`componentWillUpdate`に対してディスパッチされます。 |
| `stencil_componentWillRender`  | 各コンポーネントの`componentWillRender`に対してディスパッチされます。 |
| `stencil_componentDidLoad`     | 各コンポーネントの`componentDidLoad`に対してディスパッチされます。 |
| `stencil_componentDidUpdate`   | 各コンポーネントの`componentDidUpdate`に対してディスパッチされます。 |
| `stencil_componentDidRender`   | 各コンポーネントの`componentDidRender`に対してディスパッチされます。 |
