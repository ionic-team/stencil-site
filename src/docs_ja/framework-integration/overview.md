---
title: フレームワークとの連携
description: フレームワークとの連携
url: /docs/overview
contributors:
  - adamdbradley
  - brandyscarney
---

# フレームワークとの連携

Stencilの主な目標は、特定のフレームワークのAPIを使用してコンポーネントを記述する必要を無くすことです。これは、すべてのモダンブラウザで動作する標準化されたWeb APIを使用することで実現できます。ブラウザ（すべてのフレームワークが構築されている）によって提供される低レベルのコンポーネントモデルを使用すると、Stencilコンポーネントをフレームワークの内部またはフレームワークなしで機能させることができます。

Stencil's primary goal is to remove the need for components to be written using a specific framework's API. It accomplishes this by using standardized web platform APIs that work across all modern browsers.
Using the low-level component model that is provided by the browser (which all frameworks are built on) allows Stencil components to work inside of a framework or without one.

Stencilと様々なフレームワークの連携は現在進行中で進んでいます。Stencilが成長するにつれて、様々な出力ターゲットにコンパイルする標準のWebコンポーネントを簡単に作成できるようにすることを目指しています。これにより、開発者は共通のAPIを使用して最新のWeb標準に合わせることができます。フレームワークは変化し続けるため、生成されたコンポーネントはより将来性のあるものになります。

Stencil's integration with different frameworks is currently a work in progress. As Stencil matures, the goal is to make it easy to write standard web components which will compile to various output targets. This allows developers to stay aligned with the latest web standards while using a common API. The generated components will also be more future-proof as frameworks continue to change.

以下のフレームワークは連携が開始されていますが、すべてが完了しているわけではありません。

The following list contains the framework integrations that have been started. All of them are not yet completed.

[Angular](angular)

[React](react)

[Vue](vue)

[Ember](ember)
