---
title: Stencil Frequently Asked Questions
description: Stencil is a developer-focused toolchain for building reusable, scalable component libraries, applications and design systems.
url: /docs/faq
contributors:
  - adamdbradley
---

# FAQ

## Introduction

### What is Stencil?

Stencil is a developer-focused toolchain for building reusable, scalable component libraries, applications and design systems. It provides a compiler that generates highly optimized Web Components, and combines the best concepts of the most popular frameworks into a simple build-time tool.

Stencil focuses on building components with web standards. It’s used by developers and organizations around the world, and is [100% free and MIT open source](https://github.com/ionic-team/stencil/blob/master/LICENSE.md).


### What does Stencil do?

Stencil helps developers and teams build and share custom components. Since Stencil generates standards-compliant Web Components, the components you build with Stencil will work with many popular frameworks right out of the box, and can even be used without a framework because they are just Web Components. Stencil also enables a number of key capabilities on top of Web Components, in particular, prerendering, and objects-as-properties (instead of just strings).


### Who is Stencil for?

Stencil is for developers and teams that want to build custom component libraries and design systems that can be shared across teams, frameworks and large organizations.

Stencil can also be used by designers who want their original design visions delivered consistently, with high fidelity, to all users.


### Who makes Stencil?

Stencil is an open source project started by the [Ionic core team](https://ionicframework.com/), with contributions also coming from the community.


### Why was Stencil created?

Stencil was created by the Ionic Framework team to make our own component library faster, smaller, and compatible with all major frameworks. Web Components offered a solution by pushing more work to the browser for better performance, and targeting a standards-based component model that all frameworks could use.


### Who uses Stencil?

Stencil was initially developed for Ionic Framework and has been a very successful Web Component-based design system/UI framework. Web Components are now in thousands of app store apps, and nearly 4 million new Ionic Framework projects are being created every year.


### How does Stencil compare to traditional frameworks?

The Web Component ecosystem has a diverse set of players, each with a different long-term vision for what Web Components can and should do.

Some think Web Components should replace third-party app frameworks, while others think that Web Components are more suited for leaf/style/design nodes and shouldn’t get in the business of your app’s component system. There are also many framework developers that don’t see the point of Web Components, or consider them to be an affront to front-end innovation.

With Stencil, our vision is somewhere in the middle. In the long term, we see app development teams continuing to use their framework of choice. We envision these frameworks continuing to get better, smaller, and more efficient, with increasingly good support for targeting and consuming Web Components -- and big teams will be consuming an increasing amount of Web Components as companies continue to embrace them for shared design systems.

At the same time, we believe an indispensable feature for Web Components is solving those component distribution and design system problems. We also believe, however, that 90% of the market doesn’t have those problems to begin with, so the current debate about the merits of Web Components is somewhat unproductive.


### Why is Stencil considered framework agnostic?

Perhaps the most appealing benefit of Web Components is that they give your development teams the flexibility to choose the underlying tools and frameworks - and versions of those frameworks - and tools that they prefer. As pointed out earlier, one of the great challenges of implementing a universal design system is getting all of your development teams to standardize on just one set of technologies. With Web Components, each team can use what works best for them, giving them complete freedom to use the tools they love—today and tomorrow.


## What does Stencil provide?

### Does Stencil have a component library?

The most widely used Stencil component library is the Ionic Framework, however, Stencil itself is only a toolchain and does not provide its own component library. We encourage you to first review Ionic components if you are building an application.


### Is Stencil a framework?

Stencil purposely does not strive to act as a stand-alone framework, but rather a tool which allows developers to scale framework-agnostic components across many projects, teams and large organizations. One of Stencil’s superpowers is its flexibility: its components could be used stand-alone, or within traditional frameworks.


### Does Stencil come with a testing framework?

Yes, Stencil provides a rich set of APIs for unit and End-to-end tests. [Learn more about testing with Stencil](/docs/testing-overview).



## Technology


### Why does Stencil use web components?

By using a consistent set of web standards, Web Components do not depend on a specific framework runtime to execute. As frameworks change their APIs, Web Components do not, allowing for the original source to continue to work natively in a browser.

After all, as much as we love the hot frameworks of today, who knows what tomorrow will bring? By choosing Web Components, you help to insulate yourself from the threat of tech churn.


### How is Stencil able to optimize component file size and startup?

Traditional frameworks provide a runtime API, and developers can pick and choose which APIs to use per component. However, this means every feature needs to be available to every component, just in case the component may or may not use the API.

With Stencil, the compiler is able to perform static analysis on each component in order to understand which APIs are and are not being used. By doing so, Stencil is able to customize each build to use exactly what each component needs, making for a highly optimized runtime with minimal size.

Since Stencil uses a compiler, it is able to adjust code as new improvements and features become available. Source code can continue to be written using the same public API and syntax, while the compiler can adjust the code to further take advantage of modern features, without requiring re-writes.


### What template syntax does Stencil use?

Rather than inventing yet another template syntax which needs to be documented and taught, Stencil opted for arguably the most commonly used template syntax: JSX. Millions of developers around the world are already familiar with JSX due to React’s popularity, making it easier for developers to pick up Stencil quickly. Additionally, with a traditional runtime template syntax, any changes to the API often require a rewrite of the component.

It’s important to note that JSX and VDom are not necessarily the same thing. One is a template syntax (JSX) and the other is a renderer (VDom). Stencil uses a much smaller and highly optimized VDom, but “how” the renderer works and improvements to be made are behind JSX. All of this is to a compiler’s advantage, allowing users to write  code in the commonly known JSX syntax, while letting the internals optimize further.


### Why does Stencil allow components to be lazy loaded?

Lazy loading components helps to reduce application startup times, decrease bundle sizes, and improve distribution.

For example, Ionic Framework includes close to 100 UI components that are all built with Stencil. Without lazy loading, Ionic’s entry file would be roughly 800kb. With lazy loading, the script for all of Ionic is just 5kb. This includes components for both iOS and Material Design, and for the animation and gesture libraries. Because Ionic is able to dynamically load only what is used, startup times are drastically reduced and users only load exactly what their application’s first paint requires.

At the same time, components built with Stencil can still be imported and consumed by traditional bundlers. They can also be prerendered, to include shadow dom, run in a Node environment, and can be used within any framework.

A consumer of a component library may use one component, a few of them, or all of them. In any of these scenarios a component library is used by just adding a script tag, lazy loading ensures fast startup with a low bandwidth footprint.

You can also learn more about lazy loading in [How Lazy-Loading Web Components Work with Stencil](https://web.archive.org/web/20201108000809/https://stenciljs.com/blog/how-lazy-loading-web-components-work).


### Why doesn’t Stencil extend HTMLElement?

Part of the Web Component spec is to extend HTMLElement, however, Stencil does not require this for a few reasons. Specifically, HTMLElement locks source code to only work in the browser, rather than keeping the logic free from any APIs. The Stencil compiler is able to optimize many different versions of components for various output targets, and one way to make that easier is by keeping HTMLElement out of it.


### Why are Stencil components written with TypeScript?

Stencil was originally built for Ionic, and in our experience we’ve found TypeScript to be a valuable tool for maintaining a large codebase across multiple teams.


### What dependencies does the Stencil runtime have?

None. The code generated by Stencil does not rely on Stencil, but rather it generates highly-optimized, framework-free, stand-alone code which runs natively in the browser.


### What dependencies does the Stencil compiler have?

TypeScript. That’s it.


### Can data be passed to Web Components?

Just like any other DOM element in a webpage, any data in the form of arrays, objects, strings and numbers can be passed to element properties. Stencil is designed from the ground up to ensure this capability stays unlocked for application developers.

One misconception that falsely claims only strings can be passed to custom elements comes from React’s version of VDom. Out of the box, React can only pass strings and numbers to components and it cannot listen to custom events. With Stencil, the components appear as though they are React components and all properties get passed correctly including functions, objects, and arrays. The bindings also account for custom events by creating a prop called “on<EventName>”. These allow React developers to interact with the Web Components as though they are React components.


### What technology is Stencil built with?

The Stencil compiler is built with TypeScript and is [distributed on npm](https://www.npmjs.com/package/@stencil/core). Its distribution includes types, making it easier for developers to use Stencil APIs.


## Capabilities

### Where can Stencil components be used?

One great advantage of using Web Components is that your component library will work across all projects, not just desktop web apps.

For example, using a hybrid mobile framework like Ionic, you can deploy Web Components across just about any platform or device, from native iOS and Android apps, to Electron and desktop web apps, and even Progressive Web Apps.


### What are the limitations of Web Components?

The [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) specs are purposely low-level, and on their own, they do not provide a framework quality developer experience. Web Components run on a fairly primitive set of standards, so you will need a little help to get them to meet your objectives.

Some of the limitations include:

When you try to use pure vanilla Web Components in an application, functionality like server-side rendering and progressive enhancement is not supported by default, and
some out-of-date clients don’t support the Web Components standard.

In addition, while Web Components technically work with any framework, there are some limitations like lack of type support and input bindings, and challenges passing properties to components, as noted above.

The good news is that, with help from open source tools like Stencil, you can overcome all of these challenges. Stencil includes framework bindings for Angular, React, and Vue, so you can easily import Web Component libraries into any framework, and interact with them just like they were native to that framework, with all the functionality you’re used to.


### What are framework bindings?

While Web Components can be paired with any JavaScript framework, Stencil has built-in special-purpose bindings to deliver the more advanced features enterprise teams expect when building applications in Angular, React, and Vue.


### What features does Stencil add to Web Components?

Web Components by themselves weren't enough to provide a quality development experience. Building fast web apps required innovations that were previously locked up inside of traditional web frameworks. Stencil was built to pull these features out of traditional frameworks and bring them to the fast emerging Web Component standard.

Compared to using Web Components directly, Stencil provides extra APIs that make writing fast components simpler. APIs like Virtual DOM, JSX, and async rendering make fast, powerful components easy to create, while still maintaining 100% compatibility with Web Components.


### What browsers can support Stencil components?

Stencil works on modern browsers and Internet Explorer 11.

[Learn more about browser support](/docs/browser-support).


### What polyfills does Stencil provide?

In order for Stencil to work on Internet Explorer 11 and above, a few polyfills are required. Luckily, Stencil’s architecture allows for modern browsers to not have to download any polyfills.


Additionally, modern browsers are able to use the latest features natively, without having to transpile down to ES5 (and making the code even easier to debug). For example, all ES 2017 features such as async/await run natively.


## Stencil Project

### Where can I get support?

If this is your first time building a design system, or you’re new to Stencil, [get in touch](https://ionicframework.com/sales?product_of_interest=Design%20Systems) with one of our Solutions Engineers for a consultation on how to meet your goals and get the most out of the platform.


### How do I get involved?

Stencil is an open source project, and we encourage you to contribute. You can start by creating issues on GitHub, submitting feature requests, and helping to replicate bugs. If you’re interested in contributing, please see our [Contributor Guide](https://github.com/ionic-team/ionic/blob/master/.github/CONTRIBUTING.md) and check out our [issue tracker](https://github.com/ionic-team/stencil/issues).


### Is Stencil open source?

Yes, Stencil is open source and its source code can be [found on GitHub](https://github.com/ionic-team/stencil). Contributions are welcomed from the community.


### Which software license does Stencil use?

Stencil’s software [license is MIT](https://github.com/ionic-team/stencil/blob/master/LICENSE).


### Who works on Stencil?

The majority of the development is done by engineers at [Ionic](https://github.com/ionic-team/ionic). If you’re excited about Stencil, we encourage you to join the community and contribute! Best place to start is on the [Stencil Slack Channel](https://stencil-worldwide.herokuapp.com/).

