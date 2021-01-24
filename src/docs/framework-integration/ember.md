---
title: EmberとStencilの連携
description: EmberとStencilの連携
url: /docs/ember
contributors:
  - jthoms1
  - adamdbradley
---

# Ember

EmberでStencilコンポーネントを操作するのは、`ember-cli-stencil`アドオンのおかげでとても簡単です。アドオンは次の処理を行います。

- 必要なファイルを`vendor.js`にインポートする
- コンポーネントの定義を`assets`ディレクトリにコピーする
- オプションで、古いEmberのバージョンと互換性を向上させるラッパーコンポーネントを作成する

まず初めに、Emberのアドオンをインストールします。

```bash
ember install ember-cli-stencil
```

そして、アプリケーションをビルドすると、依存するStencilコレクションが自動的に検出され、アプリケーションに含まれます。そのため、`hbs`ファイルでCustom Elementを使うだけで、追加の作業は必要ありません。詳細は、[`ember-cli-stencil`のドキュメント](https://github.com/alexlafroscia/ember-cli-stencil)をご覧ください。
