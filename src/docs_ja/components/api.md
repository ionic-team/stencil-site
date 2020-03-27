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

# Component API

The whole API provided by stencil can be condensed in a set of decorators, lifecycles hooks and rendering methods.
ステンシルが提供するAPI全体は、デコレータ、ライフサイクルフック、レンダリングメソッドのセットに凝縮されています。


## Decorators

Decorators are a pure compiler-time construction used by stencil to collect all the metadata about a component, the properties, attributes and methods it might expose, the events it might emit or even the associated stylesheets.
デコレータは、コンポーネントに関するすべてのメタデータ、プロパティ、属性、メソッド、イベント、関連するスタイルシートを収集するためにステンシルによって使用される純粋なコンパイラ時間構造です。
Once all the metadata has been collected, all the decorators are removed from the output, so they don't incur in any runtime overhead.
すべてのメタデータが収集されると、すべてのデコレータは出力から削除されるので、実行時のオーバーヘッドは発生しません。

- [@Component()](component#component-decorator) declares a new web component
- [@Component()](component#component-decorator)は、新しいウェブコンポーネント
- [@Prop()](properties#prop-decorator) declares an exposed property/attribute
- [@Prop()](properties#prop-decorator) は、公開されたプロパティ/属性を宣言します。
- [@State()](state#state-decorator) declares an internal state of the component
- [@State()](state#state-decorator) は、コンポーネントの内部状態を宣言します。
- [@Watch()](reactive-data#watch-decorator) declares a hook that runs when a property or state changes
- [@Watch()](reactive-data#watch-decorator) プロパティや状態が変化したときに実行されるフックを宣言します。
- [@Element()](host-element#element-decorator) declares a reference to the host element
- [@Element()](host-element#element-decorator) ホスト要素への参照を宣言します。
- [@Method()](methods#method-decorator) declares an exposed public method
- [@Method()](methods#method-decorator) 公開されたパブリックメソッドを宣言します。
- [@Event()](events#event-decorator) declares a DOM event the component might emit
- [@Event()](events#event-decorator)  コンポーネントが発する可能性のある DOM イベントを宣言します。
- [@Listen()](events#listen-decorator) listens for DOM events
- [@Listen()](events#listen-decorator) DOM イベントをリスンする


## Lifecycle hooks

- [connectedCallback()](component-lifecycle#connectedcallback-)
- [disconnectedCallback()](component-lifecycle#disconnectedcallback-)
- [componentWillLoad()](component-lifecycle#componentwillload-)
- [componentDidLoad()](component-lifecycle#componentdidload-)
- [componentWillRender()](component-lifecycle#componentwillrender-)
- [componentDidRender()](component-lifecycle#componentdidrender-)
- [componentWillUpdate()](component-lifecycle#componentwillupdate-)
- [componentDidUpdate()](component-lifecycle#componentdidupdate-)
- **[render()](templating-jsx)**


## Other

- [**Host**](host-element): Host is a functional component can be used at the root of the render function to set attributes and event listeners to the host element itself.
- ホストは、ホスト要素自体に属性とイベントリスナーを設定するためにレンダリング関数のルートで使用できる機能的なコンポーネントです。

- [**h()**](templating-jsx): It's used within the `render()` to turn the JSX into Virtual DOM elements.
- [**h()**](templating-jsx): ホストはレンダー関数のルートで使用される機能的なコンポーネントです。これは JSX を仮想 DOM 要素に変換するために `render()` の中で使用されます。

- [**readTask()**](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing): Schedules a DOM-read task. The provided callback will be executed in the best moment to perform DOM reads without causing layout thrashing.
- [**readTask()**](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing): これは、JSX を仮想 DOM 要素に変換するために `render()` の中で使用されます。DOM の読み込みタスクをスケジュールします。提供されたコールバックは、レイアウトスラッシングを起こさずに DOM の読み込みを実行するために、最適なタイミングで実行されます。

- [**writeTask()**](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing): Schedules a DOM-write task. The provided callback will be executed in the best moment to perform DOM mutations without causing layout thrashing.
- writeTask()**](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing): DOM-write タスクをスケジュールします。DOM-write タスクをスケジュールします。提供されたコールバックは、レイアウトスラッシングを起こさずに DOM の突然変異を実行するために最適なタイミングで実行されます。

- **forceUpdate()**: Schedules a new render of the given instance or element even if no state changed. Notice `forceUpdate()` is not syncronous and might perform the DOM render in the next frame.
- forceUpdate()**。状態が変更されていなくても、指定されたインスタンスまたは要素の新しいレンダリングをスケジュールします。forceUpdate()` は同期しておらず、次のフレームで DOM レンダリングを実行する可能性があることに注意してください。

- getAssetPath()
- setMode()
- getMode()
- getElement()
