---
title: Extras Config
description: Extras Config
url: /docs/config-extras
contributors:
  - mattdsteele
---

# Extras

`extras`には、ポリフィルの操作が必要なDOMのランタイムを追加するオプションが含まれています。

例えば、Slotポリフィルを使用する場合、すべてのDOM APIが完全にポリフィルされるわけではありません。 全てのユーザーが追加のランタイムを必要とするわけではないため、これらのほとんどはオプトインです。

デフォルトでは、StencilはIE11、Edge 18以下（Chromiumに移行する前のEdge）およびSafari 10では機能しません。レガシーブラウザをサポートするには、ブラウザでポリフィルをダウンロードして実行する必要があります。 `extras`設定を使用することで、アプリはこれらの追加のランタイム設定をオプトインできます。

例は  __supporting__ レガシーブラウザをサポートする`extras` 設定例です:

```tsx
export const config: Config = {
  buildEs5: 'prod',
  extras: {
    cssVarsShim: true,
    dynamicImportShim: true,
    shadowDomShim: true,
    safari10: true,
    scriptDataOpts: true,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: true,
  }
};
```

注：この例ではレガシーブラウザをサポートする必要があるため、 `buildEs5：'prod'`も設定で設定されています。詳細については、[buildEs5 config](/docs/config＃buildes5)を参照してください。

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

### dynamicImportShim

動的な `import（）`シム。これは、Edge18以下およびFirefox67以下でのみ必要です。 Edge 18以下（Chromiumに移行する前のEdge）をサポートする必要がない場合は、 `dynamicImportShim`を` false`に設定することをお勧めします。デフォルトは `false`です。


### lifecycleDOMEvents

コンポーネントのライフサイクルイベントをディスパッチします。デフォルトではこれらのイベントはディスパッチされませんが、`true`に設定するとこれらのイベントを`window`でリッスンできます。
主にテストで使用されます。

| Event Name                     | Description                                                    |
|--------------------------------|----------------------------------------------------------------|
| `stencil_componentWillLoad`    | 各コンポーネントの`componentWillLoad`に対してディスパッチされます。 |
| `stencil_componentWillUpdate`  | 各コンポーネントの`componentWillUpdate`に対してディスパッチされます。 |
| `stencil_componentWillRender`  | 各コンポーネントの`componentWillRender`に対してディスパッチされます。 |
| `stencil_componentDidLoad`     | 各コンポーネントの`componentDidLoad`に対してディスパッチされます。 |
| `stencil_componentDidUpdate`   | 各コンポーネントの`componentDidUpdate`に対してディスパッチされます。 |
| `stencil_componentDidRender`   | 各コンポーネントの`componentDidRender`に対してディスパッチされます。 |

### safari10

Safari 10 supports ES modules with `<script type="module">`, however, it did not implement `<script nomodule>`. When set `safari10` is set to `false`, the runtime will not patch support for Safari 10. If the app does not need to support Safari 10, it's recommended to set this to `false`. Defaults to `false`.

### scriptDataOpts

It is possible to assign data to the actual `<script>` element's `data-opts` property, which then gets passed to Stencil's initial bootstrap. This feature is only required for very special cases and rarely needed. When set to `false` it will not read this data. Defaults to `false`.

### shadowDomShim

If enabled `true`, the runtime will check if the shadow dom shim is required. However, if it's determined that shadow dom is already natively supported by the browser then it does not request the shim. Setting to `false` will avoid all shadow dom tests. If the app does not need to support IE11 or Edge 18 and below, it's recommended to set `shadowDomShim` to `false`. Defaults to `false`.

### slotChildNodesFix

For browsers that do not support shadow dom (IE11 and Edge 18 and below), slot is polyfilled to simulate the same behavior. However, the host element's `childNodes` and `children` getters are not patched to only show the child nodes and elements of the default slot. Defaults to `false`.
