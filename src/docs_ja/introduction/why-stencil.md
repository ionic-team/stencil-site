---
title: Stencil - A Compiler for Web Components
description: Stencil has a number of add-ons that you can use with the build process.
url: /docs/introduction
contributors:
  - jthoms1
---

# Stencil: WEbコンポーエント用のコンパイラ

Stencilは、Webコンポーネント（より正確に言うと、カスタムエレメント）を生成するコンパイラです。 
Stencilは、最も人気のあるフレームワークの最高の概念をシンプルなビルド時ツールに結合します。

Stencilは次のような機能を持ちます。

- Virtual DOM
- 非同期レンダリング(inspired by React Fiber)
- リアクティブデータバインディング
- TypeScript
- JSX

そして、これらの機能を取り込んだWeb標準のWebコンポーネントを生成します。

StencilはWeb標準に準拠したWebコンポーネントを生成するため、多くの一般的なフレームワークですぐに使用できます。また、Webコンポーネントにすぎないため、フレームワークなしでも使用できます。 また、Stencilは、Webコンポーネントだけでなく、プリレンダリング、オブジェクトのプロパティを利用することもできます。

カスタムエレメントを直接作成する場合と比較して、StencilはWebコンポーネントを簡単に記述するためのAPIを提供します。Virtual DOM、JSX、非同期レンダリングなどのAPIは、Webコンポーネントとの100％の互換性を維持しながら、高速で強力なコンポーネントを簡単に作成できるようにします。

デベロッパーエクスペリエンス(DX)も考慮されており、Live Reloadとコンパイラに組み込まれた小さな開発サーバーが付属しています。


## Why Stencil?

Stencil was created by the [Ionic Framework](http://ionicframework.com/) team to help build faster, more capable components that worked across all major frameworks.

While Ionic primarily targeted Cordova apps, the emergence of Progressive Web Apps as a rapidly growing target for web developers demanded a different approach to web app development performance. With Ionic's classic use of traditional frameworks and bundling techniques, the team was struggling to meet latency and code size demands for Progressive Web Apps that ran equally well on fast and slow networks, across a diversity of platforms and devices.

Additionally, framework fragmentation had created a web development interoperability nightmare, where components built for one framework didn't work with another framework.

Web Components offered a solution to both problems, pushing more work to the browser for better performance, and targeting a standards-based component model that all frameworks could use.

However, Web Components by themselves weren't enough. Building fast web apps required innovations that were previously locked up inside of traditional web frameworks. Stencil was built to pull these features out of traditional frameworks and bring them to the fast emerging Web Component standard.
