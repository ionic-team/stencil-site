---
title: Plugin Config
description: Plugin Config
url: /docs/plugins
contributors:
  - adamdbradley
  - jthoms1
  - mgalic
---

# プラグイン

`plugins`を使用して、独自の[Rollup](https://rollupjs.org)プラグインを追加できます。Stencilはデフォルトで`Sass`や`PostCss`をサポートしていません。ただし、どちらも`plugins`の配列を使用して追加できます。

```tsx
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  plugins: [
    sass()
  ]
};
```


### 関連プラグイン

- [@stencil/less](https://www.npmjs.com/package/@stencil/less)
- [@stencil/postcss](https://www.npmjs.com/package/@stencil/postcss)
- [@stencil/sass](https://www.npmjs.com/package/@stencil/sass)
- [@stencil/stylus](https://www.npmjs.com/package/@stencil/stylus)


## Nodeポリフィル

他の例は、[モジュールバンドリングのNodeポリフィル](https://stenciljs.jp/docs/module-bundling/#node-polyfills)を参照してください。
