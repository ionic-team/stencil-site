---
title: Integrated Dev Server Config
description: Integrated Dev Server Config
url: /docs/dev-server
contributors:
  - adamdbradley
  - BDav24
  - feerglas
  - simonhaenisch
---

# Integrated Dev Server

Stencilには、開発を簡単にするために、統合された開発サーバーが付属しています。ビルドプロセスと開発サーバーを統合することで、Stencilは複雑なビルドスクリプトや設定を必要とせずに、開発時の体験を大幅に改善できます。アプリのビルドや再ビルドが行われると、コンパイラは開発サーバーと通信することができ、その逆も可能です。


## Hot Module Replacement

コンパイラは監視モードを提供していますが、開発サーバーと組み合わせてブラウザ内で変更されたものだけをリロードすることで、さらに一歩先へ行くことができます。Hot Module Replacementを使用すると、アプリはブラウザ内の状態を維持しながら、ファイルの保存後に更新されたロジックで個々のコンポーネントを切り替えることができます。


## Style Replacement

Webコンポーネントには独自のCSSが付属し、Shadow DOMを使用して固有のstyle tagを持つことができます。従来では、外部CSSリンクでは通常ライブリロードがうまくいきますが、shadow root内のインラインスタイルでコンポーネントを更新することは困難でした。統合された開発サーバーを使用すると、StencilはShadow DOMを使用しているかどうかに関係なく、ページ自体の更新を行うことなくすべてのコンポーネントのスタイルを動的に更新できます。


## Development Errors

開発中に無効な構文などのエラーが発生した場合、Stencilはエラーやその原因をコンソールに記録するだけでなく、エラーをアプリにオーバーレイ表示して読みやすくします。


## Open In Editor

開発中にブラウザ内でエラーがオーバーレイすると、ソーステキストを指す行番号がクリック可能になり、IDEでソースファイルを直接開きます。


## Dev Server Config

| Property         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `address`        | 開発サーバーが使用するIPアドレス。デフォルトは`0.0.0.0`で、これは`localhost`などのローカルマシン上のすべてのIPv4アドレスを指します。 | `0.0.0.0` |
| `basePath`       | サーバーが使用するベースのパス。デフォルトはルートパス名です。 | `/` |
| `https`          | デフォルトでは、開発サーバーはhttpプロトコルで実行されます。代わりに、独自のSSL証明書とキーを提供することによって、httpsで実行できます（以下の例を参照）。 | `false` |
| `initialLoadUrl` | 開発サーバーが最初に開くURL。 | `/` |
| `logRequests`    | サーバーへのすべてのリクエストは、ターミナル内で記録されます。 | `false` |
| `openBrowser`    | デフォルトでは、開発サーバーが起動するとローカル開発URLがデフォルトのブラウザーで開かれます。このURLが開かれないようにするには、この値を`false`に変更します。  | `true`  |
| `reloadStrategy` | ファイルが監視および更新された時、開発サーバーはデフォルトで`hmr`（Hot Module Replacement）を使用して、ページ全体を更新せずにページを更新します。ページを完全に更新するには、`pageReload`を使用します。リロードを無効にするには、`null`を使用します。 | `hmr` |
| `port`           | サーバーのポートを設定します。 | `3333` |



## 例

```tsx
import { readFileSync } from 'fs';
import { Config } from '@stencil/core';

export const config: Config = {
  devServer: {
    reloadStrategy: 'pageReload',
    port: 4444,
    https: {
      cert: readFileSync('cert.pem', 'utf8'),
      key: readFileSync('key.pem', 'utf8')
    }
  }
};
```
