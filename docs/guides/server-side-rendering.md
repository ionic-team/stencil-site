---
title: Server Side Rendering
sidebar_label: Server Side Rendering
description: Server Side Rendering
slug: /server-side-rendering
---

# Server Side Rendering

For React and Vue Output Targets Stencil has support for Server Side Rendering (SSR). If you use frameworks such as [Next.js](https://nextjs.org/) or [Nuxt](https://nuxt.com/) Stencil will automatically enhance the framework to allow render Stencil components on the server into a [Declarative Shadow DOM](https://web.dev/articles/declarative-shadow-dom).

You can find more information on how to setup SSR support for [React](/docs/react) and [Vue](/docs/vue) in their respective Output Target documentations. All interfaces related to rendering a Stencil component into a string are exported by the [Stencil Hyrdate Module](/docs/hydrate-app).

## Tips & Tricks

When server side rendering a component you may run into a few gotchas that may seem confusing when components don't appear as expected. Here are some important tips and tricks you should know to avoid these situations.

### Non-Primitive Parameters

When we compose components we often don't think about too much how we structure the data we pass along to the component. For example, it may seem easier to just define an interface to represent a menu rather than creating extra components for menu items.

Let's say we define a custom component for the footer menu on [stenciljs.com](https://stenciljs.com/):

```tsx
const menu = {
    'Overview': ['Introduction', 'Getting Started', 'Component API', 'Guides', 'FAQ'],
    'Docs': ['Framework Integrations', 'Static Site Generation', 'Config', 'Output Targets', 'Testing', 'Core Compiler API'],
    'Community': ['Blog', 'GitHub', 'X', 'Discord']
}
return (
    <nav>
        <footer-navigation items={menu} />
    </nav>
)
```

While this works just fine when rendering the component in the browser, it may be challenging when rendering it on the server. Stencil __does not support__ the serialization of objects within parameters, causing the component to not server side render any footer menu items.

In situations where parameters 