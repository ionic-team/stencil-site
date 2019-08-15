---
title: How Lazy-Loading Web Components Work with Stencil
date: August 15, 2019
url: /blog/how-lazy-loading-web-components-work
author: Adam Bradley
twitter: adamdbradley
description: When you’re building an app that requires a large library of components in a single file download, you’re often forced to sacrifice performance - and specifically startup time - for the sake of accessing all those components. The two are often mutually exclusive. Choose to easily have all the components available, or choose blazing fast startup, but it’s difficult to get both. At least that’s the experience for many.
img: /assets/img/blog/posts/stencil-lazy-loading.png
---

![Stencil Lazy Loading](/assets/img/blog/posts/stencil-lazy-loading.png)

When you’re building an app that requires a large library of components in a single file download, you’re often forced to sacrifice performance - and specifically startup time - for the sake of easily accessing all those components. The two are often mutually exclusive. Choose to have all the components available, or choose blazing fast startup, but it’s difficult to get both. At least that’s the experience for many.

In fact, downloading and parsing a large set of JavaScript just to show the first page is where many apps struggle, and in many cases “lazy-loading” is a great solution to the problem. Lazy-loading is a term used for loading components only when the end-user requires it, which is a common technique used to speed-up app initialization.

Stencil, a Web Component compiler used to build custom component libraries and design systems, was originally built for the [Ionic Framework](https://ionicframework.com/). And Ionic’s challenge has always been to easily distribute a large library of UI components, for both Material Design and iOS, while still staying performant and having a fast startup for Progressive Web Apps. In helping to solve the problem, Ionic moved to using Web Components, which can be distributed and consumed in numerous ways, each with their own pros and cons. But just using Web Components alone does not solve the startup and file size problem.

We’re often asked “how” Stencil’s lazy loading works, and how one script can serve as a single entry point to a large library. But even further, why has Ionic migrated to this architecture, and how is it able to easily offer a large UI library without file size and startup penalties. In this article I’d like to describe a little further the reasoning behind each decision.

*Disclaimer: This is by no means claiming to be the one-true way to lazy load components. In fact there are many ways to lazy-load. This is how Stencil does it, and how Ionic components, developers and users have benefited using Stencil’s technique.*


## Script Tags and CDNs

One of the simplest ways to use a web component is by adding its script tag to the webpage it’ll be used in. When the script loads, it automatically defines the custom element(s), and any custom element already on the page and any created thereafter on the page will get hydrated. Too easy right?

For a single component that works great. However, in Ionic’s case, or any large UI library or Design System for that matter, the challenge is that a single script containing every component is often far too large for an acceptable file size or app startup time.

Even though the first paint may only use a handful of components, by bundling them all into one file the user is penalized by having to download the entire library _before_ the user sees the app’s first page. This is thoroughly reviewed in [The cost of JavaScript in 2019](https://v8.dev/blog/cost-of-javascript-2019) and definitely worth the time to read and digest.

*However, do note that Ionic and Stencil components can also be imported into traditional bundlers too. This post is reviewing how lazy-loading works when using the stand-alone script tag way.*


## Using Native Browser Features

Luckily, browsers already ship with some extremely valuable, and somewhat lesser known, APIs that Ionic (using Stencil) is able to take advantage of. The biggest of those are native [ES Module imports](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) and [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports).

Traditionally within web development, we’ve become accustomed to source code getting transpiled into an unrecognizable ball of JavaScript, requiring the most finely tuned sourcemaps to make sense of it all. The most common of these is transforming the standardized `import` keyword into a deeply nested stack of callbacks in order for JavaScript “modules” to be loaded in an ES5 environment (such as IE11), by often reverting back to the non-standard [CommonJS](https://en.wikipedia.org/wiki/CommonJS) format.

With ES Modules now supported natively within browsers, the `import` statement no longer needs to be morphed into something different by bundlers, but rather the browser now fully understands `import` and can perform the request without the use of any bundler runtime. Module bundling logic can now be limited to build-time, rather than run-time, which reduces file size and puts module loading performance directly in the browser’s hands.

Bundlers are a valuable tool, and with the advancement of the standards, bundler runtime logic (the additional javascript executed by the user’s browser) may not be necessary in most cases. I say again: bundler _runtime_ logic.  At build-time, bundlers are vital in being able to combine modules that should be grouped together into a single file. However, the output of a bundled file can now be in a pure ES Module format, and we can now let the browser’s high-optimized stack handle network requests, parsing, etc.


## Predefining the Web Component Library

So with a large codebase slowing down an app’s initial startup, naturally the answer is stated with a simple “well just lazy load components then”. However, lazy loading components often enters a great deal of complexity of bundling, package.json and router configurations, custom framework logic built within each component and wrappers, and we’ve quickly lost the abilities of easily using a script tag. Alternatively, other lazy-load solutions require hardcoded HTML attribute values to go alongside even more custom runtime logic in order for the modules to be requested and wired up correctly.

With Stencil, one of its output targets is to define all of the components within the DOM, but the key is it does not require any of the component logic, and the predefined components are simply proxy components with no logic. In Stencil’s terms, an output target is able to take the developers source code and transform it into a highly optimized build. The compiler actually has a handful of output targets, but for now we’re focusing on the lazy-loading default.

With the lazy loading output target, once one of the components is added to DOM, the proxy component then requests and asynchronously wires up the component’s core logic to the host element on-demand. It’s important to note the entire architecture of the runtime allows the web components to be hydrated asynchronously, to include getting and setting properties, catching events before it’s been fully hydrated, and even ensure there is no flicker of the components before they’re loaded.

Further, Stencil performs static analysis of each component at build-time, and from this it already knows which components already work together, and should be bundled together. With this knowledge up front, the components are already built to avoid unnecessary HTTP requests, and each bundle request already comes with the component(s) it already knows it’ll require. On top of that, because components are now using the browser APIs to load modules, we’re able to take advantage of native [module preloading](https://developers.google.com/web/updates/2017/12/modulepreload) without additional runtime or custom configuration.


## Browser Driven Lazy-Loading

With traditional setups, the developer usually has to take their best guess at build-time as to how components are going to be loaded by the end-user, and create their own entry modules through bundler configuration. With Stencil’s lazy-loading, all of the heavy lifting is placed directly on the browser, which already knows exactly which elements are in the DOM and is the best single source of truth since every end-user can navigate however they want. Instead of having end-users download additional JavaScript runtime to figure out which components should be loaded, and all that logic to do so, instead the browser tells us exactly which components are being used, and the browser performs the request itself.

How the element shows up in the DOM doesn’t actually matter; whether it was already within the HTML, rendered by Angular Ivy, `React.createElement(‘ion-toggle’, null)`, jQuery’s `$("body").append("<ion-toggle></ion-toggle>")`, or even standard web APIs such `document.createElement(‘ion-toggle’)`.

It doesn’t matter how the element came to be rendered in the DOM, either way, Stencil knows how to lazy-load itself using web-standards and native browser APIs. And by deferring most of the logic to the browser, rather than generating more JavaScript runtime, the components themselves have an optimal file size.

Aside from that, one of my favorite things to hear is how students are being taught web development with just Ionic. No framework, no build system. Just writing plain HTML and one script tag to access all of [Ionic's 100+ components](https://ionicframework.com/docs/components), and have them lazy-load on-demand. All of this has been made easier due to Stencil’s architecture.

And for browsers that do not understand ES Modules and dynamic imports, Stencil also automatically generates ES5 builds with necessary polyfills that are only downloaded by browsers that require them (such as IE11).


## Focus On Component Authoring. Let Robots Do Everything Else.

Authoring, exporting, polyfilling, bundling, packaging, distributing, consuming, etc. are all complicated tasks, especially when trying to stay performant for the end-user. Tooling improves, frameworks update, bundlers change, and new APIs make old APIs obsolete. This especially holds true when your runtime framework decides to change how it works.

All those hundreds of components hardcoded to a specific runtime API must be rewritten yet again. The long list of “you must”, “never”, “don’t” and best practices change daily, when in the end we’re all just trying to happily build components for apps.

For all these reasons, this is one of the driving factors of why Stencil was created to help Ionic move quickly. Ionic core developers focus purely on creating and maintaining great looking components to be used within millions of apps. Stencil lets the core developers put their time into building components, while the robots are focused on optimizing everything else, and adjusting to new standards.


## Conclusion

Each framework and bundler has their own way to lazy load modules, and has its own way to be configured, which is great for innovation and new ideas, so we welcome each tool to do it their own way.

But with Ionic using Stencil’s lazy-loading abilities, which is actually just using native browser APIs, Ionic is able to free itself from each framework’s custom build system, tooling and changes. This helps to meet Ionic’s goal of providing a UI library for any framework, and any version of the framework, or no framework at all, all while generating components that sit atop web-standards. And while core developers can focus on component authoring and maintenance, the compiler can focus on the tasks of optimizing and bundling.

Hopefully this helps detail is more about how Stencil is addressing the goal of moving the complexity of easily distributing components into the build-time tooling, and let authoring and sharing components easy for developers, and fast for end-users.