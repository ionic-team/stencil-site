---
title: Static Site Generation
description:
url: /docs/static-site-generation
contributors:
  - mlynch
---

# Static Site Generation with Stencil

One of the best ways to build fast, interactive web sites and web apps is to utilize Static Site Generation instead of Server Side Rendering (known as SSR) or Client Side Rendering (known as Single Page Apps, or SPAs).

Static Site Generation (SSG) means building and rendering components and routes at build time (aka pre-rendering) rather than server request time (SSR) or at client run-time (SPA). Because a route is already pre-rendered, all of the content for the route is available to search engines and clients *immediately*, so SEO and performance are maximized.

Static Site Generation doesn't mean your pages have to be static! Stencil utilizes hydration to efficiently load client-side components at runtime to get the best of both worlds.

Since Static Site Generation pre-renders components, there are some tradeoffs and things to keep in mind, but most components can be easily pre-rendered without much modification.

Stencil makes SSG easy, so read on to see how to incorporate it into your apps.