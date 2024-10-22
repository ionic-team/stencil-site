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

In situations where you use parameters to render elements it is mostly better to structure them within the light DOM of the component instead of passing them along as parameters. Especially if parameters contribute to the structure of the component, it is usually a better approach to pass them in as DOM structure.

For above example, a better solution would be:

```tsx
const menu = {
    'Overview': ['Introduction', 'Getting Started', 'Component API', 'Guides', 'FAQ'],
    'Docs': ['Framework Integrations', 'Static Site Generation', 'Config', 'Output Targets', 'Testing', 'Core Compiler API'],
    'Community': ['Blog', 'GitHub', 'X', 'Discord']
}
return (
    <nav>
        <footer-navigation>
            {Object.entries(menu).map(([section, links]) => (
                <footer-navigation-section>
                    <h2>{section}</h2>
                    {links.map((link) => (
                        <footer-navigation-entry href="#/">{link}</footer-navigation-entry>
                    ))}
                </footer-navigation-section>
            ))}
        </footer-navigation>
    </nav>
)
```

With this approach your meta framework can properly generate a complete markup of your footer navigation without having to wait for your application runtime to hydrate the app.

### Cross Component Context

When components carry a certain state that you like to propagate to child components, there are several approaches that allows you to solve for that, e.g. reducers or context providers in React. If you use these state information to make decisions on how the element is being rendered you may run into issues when trying to server side render the application.

In Next.js and other meta frameworks, every component is rendered individually from its parents and childrens. For example, given the following structure:

```tsx
<ParentComponent>
    <ChildComponent />
</ParentComponent>
```

When your application gets server side rendered, and e.g. Next.js wants to render `ParentComponent`, Stencil will try to parse the children into a string to give the `ParentComponent` information about its light DOM. The intermediate result of this operation will be as following:

```tsx
<ParentComponent>
    <template shadowrootmode="open">
        <style>...</style>
        ...
    </template>
    <ChildComponent />
</ParentComponent>
```

In the process of rendering `ParentComponent` you have access to its light DOM, e.g. `ChildComponent`, which allows you to modify the component attributes. However, once `ParentComponent` and the framework moves forward to render `ChildComponent`, `ChildComponent` won't have access to `ParentComponent` as it is being rendered in an isolated environment. The same applies for any state objects you may import for the component, they may remain empty when the component is rendered.

In summary, keep in mind that the part of your component that you want to server side render, should be able to do so without requiring any application state. If the component suppose to display data that is being loaded from the server during runtime, have the component render a loading view instead.

### Performance

To server side render a component, Stencil transforms your component into a [Declarative Shadow DOM](https://web.dev/articles/declarative-shadow-dom). A Declarative Shadow DOM contains all structural information of your component including styles. Depending on how your components are set up, and how many components you render on the server this can have a huge impact on the document size.

Imaging a small button component in Stencil:

```tsx
import { Component, Fragment, h } from '@stencil/core'
@Component({
  tag: 'my-btn',
  styleUrl: './button.css'
})
export class MyBtn {
  render() {
    return (
      <>
        <button>...</button>
      </>
    );
  }
}
```

with `button.css` being something like:

```css
/* button.css */
@import "../css/base.css";
@import "../css/tokens.css";
@import "../css/animations.css";
@import "../css/utilities.css";

/* component related styles: */
button {
    ...
}
```

It is convenient to just import all additional CSS the project uses even though it may not be used by the component itself. This can lead to performance issues in the context of server side rendering quickly.

When Stencil transforms your component into a Declarative Shadow DOM, it includes all component styles into the template so that the component can be rendered imidiatelly. Now imagine you want to server side render a set of components:

```tsx
<nav>
    <ul>
        <li><MyBtn>Introduction</MyBtn></li>
        <li><MyBtn>Getting Started</MyBtn></li>
        <li><MyBtn>Component API</MyBtn></li>
    </ul>
</nav>
```

This will cause the document to contain all your CSS from above already 3 times and may increase your document size to a point where it impacts the [First Contentful Paint (FCP)](https://web.dev/articles/fcp) because the browser takes a long time to pull the whole document from the server.

There are several ways to mitigate this:

- Use CSS variables wherever possible as they have the capability to pierce through the Shadow DOM
- Use [`::part`](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) CSS pseudo elements as they help styling sections of your Shadow DOM from the outside
- Optimize the CSS per component and don't include unused styles
- Limit the scope of what should be server side rendered, e.g. by applying `use client` in Next.js to these sections of the page that aren't on the critical rendering path

Stencil will continue to improve the support for Server Side Rendering and will try to provide solutions for the challenges mentioned above. If you have ideas or feedback, don't hesitate to [file an issue](https://github.com/ionic-team/stencil/issues/new?assignees=&labels=&projects=&template=feature_request.yml&title=feat%3A+) and collaborate with us!