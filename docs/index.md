---
layout: docs
---

## Welcome to Stencil

Stencil is a JavaScript build tool and minimal runtime (6kb) that makes it easy to build reusable Web Components with some amazing features that vanilla Web Components and Custom Elements lack.

Stencil was created by the [Ionic Framework](http://ionicframework.com/) team in 2017 as an experiment. We were frustrated with how difficult it was to build reusable UI components that worked across all frontend frameworks (or vanilla JS), while also finding existing frameworks unsuitable for building apps that loaded quickly and progressively users all over the world, regardless of network or device performance.

## How is Stencil different from plain Web Components or Custom Elements?

Stencil's build pipeline creates Custom Elements that come pre-baked with efficient virtual DOM capabilities, a fast async rendering pipeline (much like React Fiber), asynchronous/lazy loading of components, server side rendering, object properties, and more.

It helps to think of Stencil as a tool that generates highly performant but 100% Web Component compatible code for you automatically, with most of the work happening at build time so there's practically no additional code needed at runtime.

Because Stencil is primarily a build tool, it requires using a specific syntax that has been inspired by Angular, React, and Vue. Stencil components are built with TypeScript and a flavor of JSX, blending the best concepts from leading frameworks into a simple and familiar component class system.

## Credits

Stencil was created and is maintained by [Adam Bradley](https://twitter.com/adamdbradley), [Josh Thomas](https://twitter.com/jthoms1), [Brandy Carney](https://twitter.com/brandyscarney), [Justin Willis](https://twitter.com/Justinwillis96), and [others from the community](https://github.com/ionic-team/ionic-core/graphs/contributors).
