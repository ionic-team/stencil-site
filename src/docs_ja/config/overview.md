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

Stencilにはすぐに使えるデフォルト値が設定されているため、多くの場合で`stencil.config.ts`ファイルをカスタマイズする必要はありません。基本的に、設定をできるだけ最小限に抑えることをお勧めします。実際、`stencil.config.ts`ファイルを削除してもアプリは問題なくコンパイルされます。ですが、それど同時に、この設定を使用してコンパイラを最小限で構成できます。以下は、多くの*任意の*設定プロパティです。

In most cases, the `stencil.config.ts` file does not require any customization since Stencil comes with great default values out-of-the-box. In general, it's preferred to keep the config as minimal as possible. In fact, you could even delete the `stencil.config.ts` file entirely and an app would compile just fine. But at the same time, the compiler can be configured at the lowest levels using this config. Below are the many *optional* config properties.

`stencil.config.ts`の例:

Example `stencil.config.ts`:

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'MyApp',
  srcDir: 'src'
};
```

## bundles

Stencilはデフォルトでアプリケーションを静的に分析し、すべてのコンポーネントがどのように相互接続されているかを示すコンポーネントグラフを生成します。コンポーネントグラフから、アプリ内での相互の使用状況に応じて、コンポーネントをどのようにグループ化するかを最適に決定できます。そうすることで、ネットワークへのリクエストを減らすためにコンポーネントをバンドルすることができます。バンドルは`bundles`を使用して手動で生成することもできます。

By default, Stencil will statically analyze the application and generate a component graph of how all the components are interconnected. From the component graph it is able to best decide how components should be grouped depending on their usage with one another within the app. By doing so it's able to bundle components together in order to reduce network requests. However, bundles can be manually generated using the `bundles` config.

`bundles`は、コンポーネントが遅延ロードされたバンドルにグループ化される方法を表すオブジェクトの配列です。Stencilがバックグラウンドで自動的に処理するため、この構成はほとんど必要ありません。

The `bundles` config is an array of objects that represent how components are grouped together in lazy-loaded bundles. This config is rarely needed as Stencil handles this automatically behind the scenes.

```tsx
bundles: [
  { components: ['ion-button'] },
  { components: ['ion-card', 'ion-card-header'] }
]
```


## enableCache

*デフォルト: `true`*

Stencilは再ビルドを高速化するために、ビルド結果をキャッシュします。この機能を無効にするには、`enableCache`を`false`に設定します。

Stencil will cache build results in order to speed up rebuilds. To disable this feature, set `enableCache` to `false`.

```tsx
enableCache: true
```


## globalScript

global scriptは、ライブラリやアプリが読み込まれる前に1回実行されるため、外部サービスへの接続の設定や使用しているライブラリのビルドなどを行うことができます。

The global script runs once before your library/app loads, so you can do things like setting up a connection to an external service or configuring a library you are using.

実行されるコードは、global scriptによってエクスポートされるデフォルトの関数内に配置する必要があります。global scriptのすべてのコードが、エクスポートされる関数でラップされていることを確認してください。

The code to be executed should be placed within a default function that is exported by the global script. Ensure all of the code in the global script is wrapped in the function that is exported.

global scriptのオプションは、ファイルパスを文字列として受け取ります。

The global script config option takes a file path as a string.


## globalStyle

Stencilは、多くのコンポーネントをアプリにコンパイルするために伝統的に使用されており、各コンポーネントには独自のコンパートメント化されたスタイルが付属しています。ただし、すべてのコンポーネントとWebサイトで"グローバル"なスタイルを使用することは今でも一般的です。グローバルCSSファイルは、[CSS Variables](../components/styling)を定義するのに役立ちます。

Stencil is traditionally used to compile many components into an app, and each component comes with its own compartmentalized styles. However, it's still common to have styles which should be "global" across all components and the website. A global CSS file is often useful to set [CSS Variables](../components/styling).

さらに`globalStyle`を使用して、SassやPostCSSなどでスタイルをプリコンパイルできます。

Additionally, the `globalStyle` config can be used to precompile styles with Sass, PostCss, etc.

次は、`app.css`という名前のグローバルcssファイルを含むフォルダー構造の例です。

Below is an example folder structure containing a webapp's global css file, named `app.css`.

```bash
src/
  components/
  global/
    app.css
```

global styleは、ファイルパスを文字列で設定します。このビルドからの出力は、`buildDir`に送られます。この例では、`www/build/app.css`に保存されます。

The global style config takes a file path as a string. The output from this build will go to the `buildDir`. In this example it would be saved to `www/build/app.css`.

```tsx
globalStyle: 'src/global/app.css'
```


## hashFileNames

*デフォルト: `true`*

productionビルドでは、生成された各ファイルのコンテンツがハッシュ化したコンテンツが表され、ハッシュ化された値がファイル名として使用されます。コンテンツがビルド間で更新されない場合、同じファイル名を受け取ります。コンテンツが更新されると、ファイル名が異なります。これを行うことで、デプロイされたアプリはビルドディレクトリを"永続的にキャッシュ"し、コンテンツ配信ネットワーク（CDN）を最大限に活用してファイルを大量にキャッシュすることで、高速なアプリを実現できます。

During production builds, the content of each generated file is hashed to represent the content, and the hashed value is used as the filename. If the content isn't updated between builds, then it receives the same filename. When the content is updated, then the filename is different. By doing this, deployed apps can "forever-cache" the build directory and take full advantage of content delivery networks (CDNs) and heavily caching files for faster apps.

```tsx
hashFileNames: true
```


## hashedFileNameLength

*デフォルト: `8`*

`hashFileNames`が`true`に設定されていて、それがproductionビルドである場合、`hashedFileNameLength`を使用してファイル名のハッシュが何文字であるべきかを決定します。

When the `hashFileNames` config is set to `true`, and it is a production build, the `hashedFileNameLength` config is used to determine how many characters the file name's hash should be.

```tsx
hashedFileNameLength: 8
```


## namespace

*デフォルト: `App`*

`namespace`はアプリの名前空間を表す`string`です。再利用可能なコンポーネントのライブラリになることを意図していないアプリの場合、デフォルトの`App`で十分です。ただし、アプリが`Ionic`などのサードパーティライブラリとして使用される場合は、一意の名前空間が必要です。

The `namespace` config is a `string` representing a namespace for the app. For apps that are not meant to be a library of reusable components, the default of `App` is just fine. However, if the app is meant to be consumed as a third-party library, such as `Ionic`, a unique namespace is required.

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

`preamble`は、ビルドのメインファイルのプリアンブルを表す`string`です。バナーを永続化するか、ビルド結果の関連情報を追加するのに役立ちます。

The `preamble` configuration is a `string` that represents a preamble in the main file of the build. Help to persist a banner or add relevant information about the resulting build.

```tsx
preamble: "Built with Stencil"
```


## srcDir

*デフォルト: `src`*

`srcDir`は、各コンポーネントのソースとなるTypeScriptファイルを含むディレクトリを指定します。Stencilアプリの標準は、デフォルトの`src`を使用することです。

The `srcDir` config specifies the directory which should contain the source typescript files for each component. The standard for Stencil apps is to use `src`, which is the default.

```tsx
srcDir: 'src'
```


## excludeSrc

*デフォルト: `['**/test/**', '**/*.spec.*']`*

`excludeSrc`は、ビルドプロセスから除外する必要がある正規表現のセットを指定します。デフォルトは、最終ビルドに含めたくない可能性のあるテストファイルを除外するためのものです。

The `excludeSrc` config setting specifies a set of regular expressions that should be excluded from the build process.  The defaults are meant to exclude possible test files that you would not want to include in your final build.


## testing

[testing config docs](/docs/testing-config)をご覧ください。


## extras

[Extras docs](/docs/config-extras)をご覧ください。
