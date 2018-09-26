---
title: Framework Intergration with Stencil
description: Framework Intergration with Stencil
contributors:
  - adamdbradley
---

# Framework Intergration with Stencil

One of Stencil's primary goals is to step out of a component model of any one specific framework, but rather use standardized web APIs already native to the browser. By using the low-level component model provided by the browser, which all frameworks are built on top of, it allows Stencil components to work within all frameworks, or no framework at all.

Stencil framework integration is currently a work-in-progress, and not every integration has been completed yet. As Stencil matures our goal is to make it easy to write standard web components, and let the compiler create various output targets. By doing so, developers can stay aligned with the web standards and learn a common API, and components generated can become more future-proof as frameworks continue to change.

Below are a few of the integrations being worked on:

- <stencil-route-link url="/docs/angular" router="#router">Angular</stencil-route-link>
- <stencil-route-link url="/docs/react" router="#router">React</stencil-route-link>
- <stencil-route-link url="/docs/vue" router="#router">Vue</stencil-route-link>
- <stencil-route-link url="/docs/ember" router="#router">Ember</stencil-route-link>


<stencil-route-link url="/docs/forms" router="#router" custom="true">
  <button class='pull-left btn btn--secondary'>
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/angular" custom="true">
  <button class='pull-right btn btn--primary'>
    Next
  </button>
</stencil-route-link>
