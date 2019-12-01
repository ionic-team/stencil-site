---
title: Fall 2019 Stencil Roadmap
date: August 28, 2019
url: /blog/stencil-roadmap-fall-2019
author: Adam Bradley
twitter: adamdbradley
description: With the Stencil One release behind us, we’re seeing developers build lots of successful Stencil-based web components. Now that the dust has settled, we realized it was time to talk about what’s next for the future of the project.
img: /assets/img/blog/posts/stencil-roadmap-fall-2019.jpg
---

![Fall 2019 Stencil Roadmap](/assets/img/blog/posts/stencil-roadmap-fall-2019.jpg)

With the <a href="https://ionicframework.com/blog/introducing-stencil-one-1-0-0/" rel="noopener noreferrer" target="_blank">Stencil One release</a>  behind us, we’re seeing developers build lots of successful Stencil-based web components. Now that the dust has settled, we realized it was time to talk about what’s next for the future of the project.

From the very beginning, Stencil was built to directly meet <a href="https://ionicframework.com/docs" rel="noopener noreferrer" target="_blank">Ionic's</a> requirements, and we feel we’ve hit many of our original goals in generating a large UI library that can run in any framework, or no framework at all. _Speaking of_, the <a href="https://ionicframework.com/blog/announcing-ionic-react-release-candidate/" rel="noopener noreferrer" target="_blank">Ionic React release candidate was just published!</a>

This isn’t to say we’re even close to “done”, since many more improvements can be made to developer experience, performance, build times, etc. As many large organizations have been adopting Stencil, we wanted to give a clear picture of where the project is going next.


## New “Custom Element” Output Target

By default, the Stencil compiler takes the developer’s source code and transforms it into <a href="/blog/how-lazy-loading-web-components-work" rel="noopener noreferrer" target="_blank">self lazy loading components</a>. This was the original intent: making it easy to integrate into any project by ensuring that frameworks weren’t required and Ionic could be easily loaded from a CDN or script tag.

For Stencil, numerous output targets can be configured so developers, teams, and organizations can decide which build is best for their project, while always maintaining the original source code. Today, by default, only the lazy load output target is created.

However, we’re increasingly seeing a use case in which the Stencil compiler needs to export components as traditional <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements" rel="noopener noreferrer" target="_blank">custom elements</a> (i.e., extending `HTMLElement`) that can also lazy load themselves without a framework. The output target would not self define the components, so it’s up to the module that imports the custom element to <a href="https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define" rel="noopener noreferrer" target="_blank">define</a> it.

What we’re really excited about is that any new output targets do not require any refactoring on the developers end, and the original source code can stay the same. Expect more on this new output target soon.


## Design System Tooling and Documentation

An area we’re looking to further improve is being able to generate <a href="https://stenciljs.com/docs/stencil-for-design-systems" rel="noopener noreferrer" target="_blank">design systems</a> that scale for numerous teams and projects. As you’ve guessed it, Ionic is already using a lot of Stencil’s tooling to generate the <a href="https://ionicframework.com/docs/api/button" rel="noopener noreferrer" target="_blank">Ionic Documentation</a> site. But there’s so much more to improve upon. Most of these features will be very specific to teams building actual design systems but one key feature we have been getting asked for is an isolated environment for developing components.

You will soon be able to develop a component in an environment that is isolated from the rest of your application.  Part of the tooling will allow you to specify multiple component states so that you can see many example states while developing your component.


## Public Compiler APIs

Another area we’re also focusing on is ensuring the compiler can work within a browser and used by other tools. We’ve already been working with a few awesome teams such as <a href="https://stackblitz.com/" rel="noopener noreferrer" target="_blank">Stackblitz</a>, <a href="https://codesandbox.io/" rel="noopener noreferrer" target="_blank">CodeSandbox</a>, and <a href="" rel="noopener noreferrer" target="_blank"></a>[WebComponents.dev](https://webcomponents.dev/). At the lowest levels, the compiler already works without running atop a <a href="https://nodejs.org/" rel="noopener noreferrer" target="_blank">NodeJS</a> environment, so technically this isn’t a major refactor, but more-so just exposing the correct APIs.

We’re also seeing many areas for improvement to ensure the compiler is easy to consume by other NodeJS tools, including <a href="https://rollupjs.org/" rel="noopener noreferrer" target="_blank">Rollup</a>, <a href="https://parceljs.org/" rel="noopener noreferrer" target="_blank">Parcel</a>, <a href="https://webpack.js.org/" rel="noopener noreferrer" target="_blank">WebPack</a>, and <a href="https://bazel.build/" rel="noopener noreferrer" target="_blank">Bazel</a>. If you’re a maintainer of any tooling, whether an online tool or a NodeJS environment, and you’re looking to implement the Stencil compiler, <a href="https://stencil-worldwide.herokuapp.com/" rel="noopener noreferrer" target="_blank">please feel free to reach out</a> and we’ll be happy to help!


## Component Asset Management

A common challenge with components is not only improving shareability among developers, but also easily sharing all of the static assets a component may use. For example, if a component is using a static image in a development environment, it’s relatively straightforward to point the url directly to the image. However, once you deploy the component(s) to a CDN, or <a href="https://www.npmjs.com/" rel="noopener noreferrer" target="_blank">npm</a>, or an internal network, etc., the direct URL path to that image becomes more of a challenge.

With <a href="https://ionicons.com/" rel="noopener noreferrer" target="_blank">Ionicons</a>, we’re using Stencil’s `getAssetPath()` API, which is where we’ll put more time into documenting and detailing best practices for loading static assets within components.


## Web Workers

An exciting area we’ll start putting more time into is increased utilization of  <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers" rel="noopener noreferrer" target="_blank">web workers</a>. As it stands, developers can already implement web workers within Stencil components today (they’re just another web API, after all).

However, from the very beginning, the Stencil runtime was designed to be asynchronous, meaning that every component can communicate with the outside world without having to be synchronously tied to one another. With traditional component models, this isn’t always true. Stencil’s asynchronous nature offers some great advantages for not only lazy loading and performance, but for web workers too!

Stencil components are not directly wired up to the DOM, and even DOM updates are scheduled in an asynchronous queue. This means that the entire component runtime and logic can live instead within a web worker, thus dedicating the main thread to focusing only on updating the DOM. A new output target could be built to automatically generate this form of components. There’s a lot more to be researched here, but it’s an area we’re very excited about because it could offer some amazing performance implications.


## Source Maps

One major benefit of using native <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import" rel="noopener noreferrer" target="_blank">JavaScript modules and imports</a> is that the original source code is largely left untouched. Granted, TypeScript removes the types and Stencil removes the decorators, but the developer’s original source code is largely as-is.

Because of this, we focused our development time into different areas while Stencil was initially being developed. However, we recognize that source maps improve debugging and testing, so we’ll ensure they line up correctly in upcoming versions.



## Conclusion

We’re really happy with Stencil’s reception so far, but there’s still much more we can do to improve the developer experience and make it easier to build and maintain a large component library. The above represent our current ideas and goals, which may change as we head into 2020. That said, please feel free to swing by the <a href="https://stencil-worldwide.herokuapp.com/" rel="noopener noreferrer" target="_blank">Stencil Slack</a> to share any feedback you have. As always, <a href="https://github.com/ionic-team/stencil" rel="noopener noreferrer" target="_blank">contributions to the project</a> are welcome too!


Happy coding!
