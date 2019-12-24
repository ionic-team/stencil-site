---
title: Getting Started
description: Getting Started
url: /docs/getting-started
contributors:
  - jthoms1
---

# はじめに

## 新しいプロジェクトを開始する

Stencilは最近のLTSバージョンの[NodeJS](https://nodejs.org/)とnpmが必要です。 続ける前にNodeのインストールおよびアップデート済みであることを確認してください。

> npm 6以降を使用する必要があることに注意してください。

```bash
npm init stencil
```

Stencilを使用して、独立したコンポーネントまたはアプリケーション全体を作成できます。
initを実行すると、開始するプロジェクトの種類を選択できるプロンプトが表示されます。

```bash
? Pick a starter › - Use arrow-keys. Return to submit.

❯  ionic-pwa     Everything you need to build fast, production ready PWAs
   app           Minimal starter for building a Stencil app or website
   component     Collection of web components that can be used anywhere
```


## Stencilを更新する

@stencil/coreの最新バージョンを取得するには次のコマンドを実行します。

```bash
npm install @stencil/core@latest --save-exact
```
