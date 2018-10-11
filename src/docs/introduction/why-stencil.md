---
title: Stencil - A Compiler for Web Components
description: Stencil has a number of add-ons that you can use with the build process.
url: /docs/introduction
contributors:
  - jthoms1
---

# Stencil: A Compiler for Web Components

Stencil is a compiler that generates Web Components (more specifically, Custom Elements). Stencil combines the best concepts of the most popular frameworks into a simple build-time tool.

Stencil takes features such as

- Virtual DOM
- Async rendering (inspired by React Fiber)
- Reactive data-binding
- TypeScript
- JSX

and then generates standards-based Web Components with these features baked in.

Since Stencil generates standards-compliant web components, they can work with many popular frameworks right out of the box, and can be used without a framework because they are just web components. Stencil also enables a number of key capabilities on top of Web Components, in particular, pre-rendering, and objects-as-properties (instead of just strings).

Compared to using Custom Elements directly, Stencil provides extra APIs that makes writing fast components simpler. APIs like Virtual DOM, JSX, and async rendering make fast, powerful components easy to create, while still maintaining 100% compatibility with Web Components.

The developer experience is also tuned, and comes with live reload and a small dev server baked in to the compiler.


## Why Stencil?

Stencil was created by the [Ionic Framework](http://ionicframework.com/) team to help build faster, more capable components that worked across all major frameworks.

While Ionic primarily targeted Cordova apps, the emergence of Progressive Web Apps as a rapidly growing target for web developers demanded a different approach to web app development performance. With Ionic's classic use of traditional frameworks and bundling techniques, the team was struggling to meet latency and code size demands for Progressive Web Apps that ran equally well on fast and slow networks, across a diversity of platforms and devices.

Additionally, framework fragmentation had created a web development interoperability nightmare, where components built for one framework didn't work with another framework.

Web Components offered a solution to both problems, pushing more work to the browser for better performance, and targeting a standards-based component model that all frameworks could use.

However, Web Components by themselves weren't enough. Building fast web apps required innovations that were previously locked up inside of traditional web frameworks. Stencil was built to pull these features out of traditional frameworks and bring them to the fast emerging Web Component standard.
