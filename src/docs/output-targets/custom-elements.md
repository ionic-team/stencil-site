---
title: Bundling Custom Elements with Stencil
description: Bundling Custom Elements with Stencil
url: /docs/custom-elements
contributors:
  - adamdbradley
---

# Distribution Output Target: `dist-custom-elements-bundle`

The `dist-custom-elements-bundle` type is used to generate a custom elements as a single bundle. Don't worry about the output being a "single" bundle, because it's generated to ensure components are tree-shakable. For example, if a component library has 100 components, but an external project only imported one component from the bundle, then only the code used by that one component would be pulled into the project. This is due to Stencil's use of ES Modules and the compiler generating friendly code for bundlers to parse and understand.

### How is this different than `dist` output target?

The `dist-custom-elements-bundle` builds each component as a stand-alone class that extends `HTMLElement`. The output is a standardized custom element witht he styles already attached and without any of Stencil's lazy-loading. This may be preferred for projects that are already handling bundling, lazy-loading and defining the custom elements themselves.

The `dist` output target on the other hand is more for projects that want to be able allow each component to lazy-load themselves, without having to setup bundling configurations to do so.

Luckily, both builds can be generated at the same time, and shipped in the same distribution. It would be up to the consumer of your component library to decide which build to use.


```tsx
outputTargets: [
  {
    type: 'dist-custom-elements-bundle'
  }
]
```
