---
title: Stencil CLI
description: Stencil CLI
url: /docs/cli
contributors:
  - miguelyoobic95
  - adamdbradley
---

# Command Line Interface (CLI)


## `stencil build`

Stencilプロジェクトをビルドします。以下のフラグは`build`コマンドで利用可能なオプションです。

Builds a Stencil project. The flags below are the available options for the `build` command.

| フラグ | 説明 | エイリアス |
|------|-------------|-------|
| `--ci` | 継続的インテグレーション（CI）環境の推奨設定を使用してビルドを実行します。ワーカーの数をデフォルトで4に設定すると、テストでスクリーンショットを撮り、コンソールのログを変更する場合に、追加の時間が許可されます。 | |
| `--config` | `stencil.config.ts`ファイルのパス。Stencilが設定を見つけるので、このフラグはほとんどの場合必要ありません。さらに、Stencilのconfigは必須ではありません。 | `-c` |
| `--debug` | デバッグに役立つランタイムコードを追加し、より詳細なログの出力レベルを設定します。 | |
| `--dev` | 開発ビルドを実行します。 | |
| `--docs` | コンポーネントのタイプ、プロパティ、メソッド、イベント、JSDoc、CSSカスタムプロパティなどに基づいて、`readme.md`ドキュメントを生成します。 | |
| `--es5` | ES5互換のビルドを作成します。デフォルトでは、ビルド時間を短縮するために、開発中はES5ビルドを作成されません。ただし、プロダクションビルド中は常にES5ビルドを作成します。このフラグを使用すると、開発中にもES5ビルドを作成します。 | |
| `--log` | `stencil build`のログを`stencil-build.log`に書き込みます。ログファイルは設定と同じディレクトリに書き込まれます。 | |
| `--prerender` | ビルドが完了した後、`www`出力ターゲットを使用してアプリケーションを事前にレンダリングします。 | |
| `--prod` | バンドルの改善や未使用のコードを削除、最小化するなど、各ファイルを最適化して本番ビルドを実行します。本番ビルドはデフォルトであり、このフラグは`--dev`フラグをオーバーライドする時のみに使用されます。 | |
| `--max-workers` | コンパイラが使用するワーカーの最大数。デフォルトでは、OSで使用可能なCPUと同じ数を使用します。 | |
| `--next` | "次期の"Stencilコンパイラ機能をテストするためのオプトイン。 | |
| `--no-cache` | キャッシュの使用を無効にします。 | |
| `--no-open` | デフォルトでは `--serve`コマンドはブラウザウィンドウを開きます。`--no-open`を使用すると、ブラウザは自動的に開かなくなります。 | |
| `--port` | [Integrated Dev Server](/docs/dev-server)のポート。 デフォルトは"3333"です。 | `-p` |
| `--serve` | [Integrated Dev Server](/docs/dev-server)を起動します. | |
| `--stats` | プロジェクトに関する統計を `stencil-stats.json`に書き込みます。統計ファイルは、構成と同じ場所に書き込まれます。 | |
| `--verbose` | ビルドの各ステップに関する追加情報をログに記録します。 | |
| `--watch` | 開発中にファイルを監視し、ファイルが更新されると再ビルドします。 | |

| Flag | Description | Alias |
|------|-------------|-------|
| `--ci` | Run a build using recommended settings for a Continuous Integration (CI) environment. Defaults the number of workers to 4, allows for extra time if taking screenshots via the tests and modifies the console logs. | |
| `--config` | Path to the `stencil.config.ts` file. This flag is not needed in most cases since Stencil will find the config. Additionally, a Stencil config is not required. | `-c` |
| `--debug` | Adds additional runtime code to help debug, and sets the log level for more verbose output. | |
| `--dev` | Runs a development build. | |
| `--docs` | Generate `readme.md` docs based on the component types, properties, methods, events, JSDocs, CSS Custom Properties, etc. | |
| `--es5` | Creates an ES5 compatible build. By default ES5 builds are no created during development in order to improve build times. However, ES5 builds are always created during production builds. Use this flag to create ES5 builds during development. | |
| `--log` | Write logs for the `stencil build` into `stencil-build.log`. The log file is written in the same location as the config. | |
| `--prerender` | Prerender the application using the `www` output target after the build has completed. | |
| `--prod` | Runs a production build which will optimize each file, improve bundling, remove unused code, minify, etc. A production build is the default, this flag is only used to override the `--dev` flag. | |
| `--max-workers` | Max number of workers the compiler should use. Defaults to use the same number of CPUs the Operating System has available. | |
| `--next` | Opt-in to test the "next" Stencil compiler features. | |
| `--no-cache` | Disables using the cache. | |
| `--no-open` | By default the `--serve` command will open a browser window. Using the `--no-open` command will no automatically open a browser window.. | |
| `--port` | Port for the [Integrated Dev Server](/docs/dev-server). Defaults to `3333`. | `-p` |
| `--serve` | Starts the [Integrated Dev Server](/docs/dev-server). | |
| `--stats` | Write stats about the project to `stencil-stats.json`. The stats file is written in the same location as the config. | |
| `--verbose` | Logs additional information about each step of the build. | |
| `--watch` | Watches files during development and triggers a rebuild when files are updated. | |


## `stencil test`

Stencilプロジェクトをテストします。以下のフラグは`test`コマンドで利用可能なオプションです。

Tests a Stencil project. The flags below are the available options for the `test` command.

| フラグ | 説明 |
|------|-------------|
| `--spec` | [Jest](https://jestjs.io/)を使用して `.spec.ts`ファイルをテストします。 |
| `--e2e` | [Puppeteer](https://developers.google.com/web/tools/puppeteer)と[Jest](https://jestjs.io/)を使用して`.e2e.ts`ファイルをテストします。 |


## `stencil`

| フラグ | 説明 |
|------|-------------|
| `--help` | さまざまなフラグを説明するヘルプ情報を表示します。 | `-h` |
| `--version` | 現在のステンシルバージョンを表示します。 | `-v` |


## `stencil generate <sub-folder>`

インタラクティブなコンポーネントジェネレータを起動します。コンポーネントを生成するサブフォルダーを1つ以上指定できます。

Starts the interactive component generator. You can specify one or more sub-folders to generate the component in.
