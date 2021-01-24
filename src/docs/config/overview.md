---
title: Config
description: Config
url: /docs/config
contributors:
  - adamdbradley
  - jthoms1
  - flawyte
  - BDav24
  - simonhaenisch
---

# Stencil Config

Stencilでは、すぐに使えるデフォルトの値が設定されているため、多くの場合で`stencil.config.ts`ファイルをカスタマイズする必要はありません。基本的に、設定をできるだけ最小限に抑えることをお勧めします。実際に、`stencil.config.ts`ファイルを削除してもアプリは問題なくコンパイルされます。ですがそれと同時に、この設定を使用してコンパイラを最小限で構成できます。以降は、たくさんある*任意の*設定プロパティです。

`stencil.config.ts`の例:

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'MyApp',
  srcDir: 'src'
};
```

## buildEs5

ES5ビルドを生成するかどうかを設定します。デフォルトは `false`です。 `true`を設定すると、devモードとprodモードの両方のes5ビルドも作成されます。 `buildEs5`を`prod`に設定すると、ES5はprodモードでのみビルドされます。基本的に、アプリをレガシーブラウザー（IE11およびEdge 18以下）で実行する必要がない場合は、デフォルトの `buildEs5`を`false`に設定して使用しても安全です。これにより、本番ビルドの時間も短縮されます。 es5ビルドの作成に加えて、アプリは__support__レガシーブラウザーのランタイムオプションを有効にすることにも関心がある場合があります。詳細については、 [config extras](/docs/config-extras) を参照してください。


```tsx
buildEs5: boolean | 'prod'
```

## bundles

Stencilはデフォルトでアプリケーションを静的に分析し、すべてのコンポーネントがどのように相互接続されているかを示すコンポーネントグラフを生成します。コンポーネントグラフから、アプリ内での相互の使用状況に応じて、コンポーネントをどのようにグループ化するかを最適に判断できます。そうすることで、ネットワークへのリクエストを減らすためにコンポーネントをバンドルすることができます。バンドルは`bundles`を使用して手動で生成することもできます。

`bundles`は、コンポーネントが遅延ロードされたバンドルにグループ化される方法を表すオブジェクトの配列です。Stencilがバックグラウンドで自動的に処理するため、この構成はほとんど必要ありません。

```tsx
bundles: [
  { components: ['ion-button'] },
  { components: ['ion-card', 'ion-card-header'] }
]
```


## enableCache

*デフォルト: `true`*

Stencilは再ビルドを高速化するために、ビルド結果をキャッシュします。この機能を無効にするには、`enableCache`を`false`に設定します。

```tsx
enableCache: true
```


## globalScript

global scriptは、ライブラリやアプリが読み込まれる前に1回実行されるため、外部サービスへの接続の設定や、使用しているライブラリのビルドなどを行うことができます。

実行されるコードは、global scriptによってエクスポートされるデフォルトの関数内に配置する必要があります。global scriptのすべてのコードが、エクスポートされる関数でラップされていることを確認してください。

global scriptのオプションは、ファイルパスを文字列として受け取ります。

```javascript
export default function() { // または export default async function()
  initServerConnection();
}
```

> エクスポートされた関数は`async`にすることもできます。

## globalStyle

Stencilは、多くのコンポーネントをアプリにコンパイルするために伝統的に使用されており、各コンポーネントには独自のコンパートメント化されたスタイルが付属しています。ただし、すべてのコンポーネントとWebサイトで"グローバル"なスタイルを使用することは今でも一般的です。グローバルCSSファイルは、[CSS Variables](../components/styling)を定義するのに役立ちます。

さらに、`globalStyle`はSassやPostCSSなどでスタイルをプリコンパイルできます。

次は、`app.css`という名前のグローバルcssファイルを含むフォルダー構造の例です。

```bash
src/
  components/
  global/
    app.css
```

global styleは、ファイルパスを文字列で設定します。このビルドによる出力は、`buildDir`に送られます。次の例では、`www/build/app.css`に保存されます。

```tsx
globalStyle: 'src/global/app.css'
```

アプリでグローバルスタイルを使用する方法については、[styling docs](/docs/styling#global-styles)をご覧ください。


## hashFileNames

*デフォルト: `true`*

productionビルドでは、生成された各ファイルのコンテンツはハッシュ化され、ハッシュ化された値がファイル名として使用されます。コンテンツがビルド間で更新されない場合、同じファイル名を受け取ります。コンテンツが更新されると、ファイル名が異なります。これにより、デプロイされたアプリはビルドディレクトリを"永続的にキャッシュ"し、Content Delivery Network（CDN）を最大限に活用して大量のファイルをキャッシュすることで、高速なアプリを実現できます。

```tsx
hashFileNames: true
```


## hashedFileNameLength

*デフォルト: `8`*

`hashedFileNameLength`はファイル名のハッシュが何文字であるべきかを指定します。`hashFileNames`が`true`に設定されていて、productionビルドの時のみ有効です。

```tsx
hashedFileNameLength: 8
```


## namespace

*デフォルト: `App`*

`namespace`はアプリの名前空間を表す`string`を指定します。再利用可能なコンポーネントのライブラリになることを意図していないアプリの場合、デフォルトの`App`で十分です。ただし、アプリが`Ionic`などのサードパーティライブラリとして使用される場合は、一意の名前空間が必要です。

```tsx
namespace: "Ionic"
```


## outputTargets

[Output Target docs](/docs/output-targets)をご覧ください。


## plugins

[Plugin docs](/docs/plugins)をご覧ください。


## devServer

[Dev-Server docs](/docs/dev-server)をご覧ください。


## preamble

*デフォルト: `undefined`*

`preamble`は、ビルドのメインファイルのプリアンブルを表す`string`を指定します。バナーを永続化したり、ビルド結果に関する情報を追加するのに役立ちます。

```tsx
preamble: 'Built with Stencil'
```


## srcDir

*デフォルト: `src`*

`srcDir`は、各コンポーネントのソースとなるTypeScriptファイルを含むディレクトリを指定します。Stencilアプリのスタンダードは、デフォルトの`src`を使用することです。

```tsx
srcDir: 'src'
```


## taskQueue

*デフォルト: `congestionAsync`*

ステンシルのランタイムが使用するタスクキューを設定します。タスクキューは、フレーム全体でDOMの読み取りと書き込みをスケジュールして、レイアウトのスラッシングを効率的にレンダリングおよび削減します。デフォルトでは、 `congestionAsync`が使用されます。また、各設定を試して、ユースケースに最適な設定を決定することをお勧めします。すべての場合において、アプリにCPUを集中的に使用するタスクが多数あり、メインスレッドが定期的にロックアップする場合は、常に試してみることをお勧めします。
これらのタスクには[Web Workers](/docs/web-workers)。

* `congestionAsync`: DOMの読み取りと書き込みは、レイアウトのスラッシングを防ぐために次のフレームでスケジュールされます。 アプリのタスクが多く、キューが混雑すると、メインスレッドがブロックされないように、作業が複数のフレームに分割されます。 ただし、場合によっては、特に起動時に不要なリフローが発生する可能性もあります。 `congestionAsync`は、アニメーションを実行しながら、メインスレッドをロックする可能性のある集中的なタスクを同時に実行するアプリに最適です。

* `async`: DOMの読み取りと書き込みは、レイアウトのスラッシングを防ぐために次のフレームでスケジュールされます。 集中的なCPUタスクの間、次のフレームで発生するようにレンダリングを再スケジュールしません。 `async`はほとんどのアプリに理想的であり、アプリに多くの集中的なタスクがあり、メインスレッドがロックアップする場合は、むしろ[Web Workers](https://stenciljs.com/docs/web-workers)を試すことをお勧めします。

* `immediate`: writeTask()コールバックとreadTask()コールバックを同期して実行します。 タスクは次のフレームで実行されるようにスケジュールされていませんが、少なくとも1つのマイクロタスクがあることに注意してください。「即時」設定は、長時間実行されてスムーズなアニメーションを提供しないアプリに最適です。 非同期設定と同様に、アプリに集中的なタスクがあり、メインスレッドがロックアップする場合は、[Web Workers](https://stenciljs.com/docs/web-workers)を試すことをお勧めします。

```tsx
taskQueue: 'async'
```

## testing

[testing config docs](/docs/testing-config)をご覧ください。


## extras

[Extras docs](/docs/config-extras)をご覧ください。
