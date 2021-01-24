---
title: Plugin Config
description: Plugin Config
url: /docs/plugins
contributors:
  - adamdbradley
  - jthoms1
  - mgalic
---

# Plugins

## Stencil plugins

デフォルトでは、Stencilには `Sass`または`PostCss`のサポートは付属していません。ただし、どちらも `plugins`配列を使用して追加できます。

```tsx
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  plugins: [
    sass()
  ]
};
```

## Rollup plugins

`rollupPlugins`構成を使用して、独自の[Rollup](https://rollupjs.org)プラグインを追加できます。
内部的には、ステンシルには `node-resolve`や`commonjs`などの組み込みプラグインが付属しています。ロールアッププラグインの実行順序が重要であるため、ステンシルは**ノード解決**の前と*commonjs変換**の後にカスタムプラグインを挿入するAPIを提供します。


```tsx
export const config = {
  rollupPlugins: {
    before: [
      // rollupNodeResolve()の前に挿入されたプラグイン
      resolvePlugin()
    ],
    after: [
      // commonjs()の後に挿入されたプラグイン
      nodePolyfills()
    ]
  }
}
```

### 関連プラグイン

- [@stencil/less](https://www.npmjs.com/package/@stencil/less)
- [@stencil/postcss](https://www.npmjs.com/package/@stencil/postcss)
- [@stencil/sass](https://www.npmjs.com/package/@stencil/sass)
- [@stencil/stylus](https://www.npmjs.com/package/@stencil/stylus)


## Nodeポリフィル

他の例は、[モジュールバンドリングのNodeポリフィル](https://stenciljs.jp/docs/module-bundling/#node-polyfills)を参照してください。
