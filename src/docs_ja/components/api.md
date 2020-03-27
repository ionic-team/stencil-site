---
title: Component API
description: Component API
url: /docs/decorators
contributors:
  - manucorporat
  - Mawulijo
  - hashcrof
  - ZenPylon
  - danjohnson95
  - rezaabedian
  - CookieCookson
---

# コンポーネントAPI

Stencilが提供するAPIは、デコレータ、ライフサイクルフック、レンダリングメソッドのセットに凝縮されています。


## デコレータ

デコレータは、コンポーネントに関するすべてのメタデータ、プロパティ、属性、メソッド、イベント、関連するスタイルシートを収集するために、Stencilによって使用される、コンパイラ時のためのAPIです。
メタデータが収集されると、すべてのデコレータは出力から削除されるので、実行時のオーバーヘッドは発生しません。

- [@Component()](component#component-decorator)は、新しいウェブコンポーネントの宣言します。
- [@Prop()](properties#prop-decorator) は、公開されたプロパティ/属性を宣言します。
- [@State()](state#state-decorator) は、コンポーネントの内部状態を宣言します。
- [@Watch()](reactive-data#watch-decorator)は、プロパティや状態が変化したときに実行されるフックを宣言します。
- [@Element()](host-element#element-decorator)は、ホスト要素への参照を宣言します。
- [@Method()](methods#method-decorator)は、公開されたパブリックメソッドを宣言します。
- [@Event()](events#event-decorator)は、コンポーネントが発する可能性のあるDOMイベントを宣言します。
- [@Listen()](events#listen-decorator)は、DOMイベントを監視します。


## ライフサイクル・フック

- [connectedCallback()](component-lifecycle#connectedcallback-)
- [disconnectedCallback()](component-lifecycle#disconnectedcallback-)
- [componentWillLoad()](component-lifecycle#componentwillload-)
- [componentDidLoad()](component-lifecycle#componentdidload-)
- [componentWillRender()](component-lifecycle#componentwillrender-)
- [componentDidRender()](component-lifecycle#componentdidrender-)
- [componentWillUpdate()](component-lifecycle#componentwillupdate-)
- [componentDidUpdate()](component-lifecycle#componentdidupdate-)
- **[render()](templating-jsx)**


## その他

- [**Host**](host-element): ホストは、ホスト要素自体に、属性とイベントリスナーを設定するために、render関数のルートで使用できる機能的なコンポーネントです。

- [**h()**](templating-jsx): これは、JSXを仮想DOM要素に変換するために `render()` の中で使用されます。

- [**readTask()**](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing): これは、JSXを仮想DOM要素に変換するために `render()` の中で使用されます。DOMの読み込みタスクをスケジュールします。提供されたコールバックは、レイアウトスラッシングを起こさずに、DOMの読み込みを実行するために、最適なタイミングで実行されます。

- [**writeTask()**](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing): DOM-write タスクをスケジュールします。提供されたコールバックは、レイアウトスラッシングを起こさずに、DOMの突然変異を実行するために最適なタイミングで実行されます。

- **forceUpdate()**。状態が変更されていなくても、指定されたインスタンス、または要素の新しいレンダリングをスケジュールします。`forceUpdate()` は同期しておらず、次のフレームで、DOMレンダリングを実行する可能性があることに注意してください。

- getAssetPath()
- setMode()
- getMode()
- getElement()
