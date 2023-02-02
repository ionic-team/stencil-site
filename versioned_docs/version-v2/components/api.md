---
title: Component API
sidebar_label: API
description: Component API
slug: /api
contributors:
  - manucorporat
  - Mawulijo
  - hashcrof
  - ZenPylon
  - danjohnson95
  - rezaabedian
  - CookieCookson
---

# Component API

The whole API provided by stencil can be condensed in a set of decorators, lifecycles hooks and rendering methods.


## Decorators

Decorators are a pure compiler-time construction used by stencil to collect all the metadata about a component, the properties, attributes and methods it might expose, the events it might emit or even the associated stylesheets.
Once all the metadata has been collected, all the decorators are removed from the output, so they don't incur any runtime overhead.

- [@Component()](./component#component-decorator) declares a new web component
- [@Prop()](./properties#prop-decorator) declares an exposed property/attribute
- [@State()](./state#the-state-decorator-state) declares an internal state of the component
- [@Watch()](./reactive-data#watch-decorator) declares a hook that runs when a property or state changes
- [@Element()](./host-element#element-decorator) declares a reference to the host element
- [@Method()](./methods#method-decorator) declares an exposed public method
- [@Event()](./events#event-decorator) declares a DOM event the component might emit
- [@Listen()](./events#listen-decorator) listens for DOM events


## Lifecycle hooks

- [connectedCallback()](component-lifecycle#connectedcallback-)
- [disconnectedCallback()](component-lifecycle#disconnectedcallback-)
- [componentWillLoad()](component-lifecycle#componentwillload-)
- [componentDidLoad()](component-lifecycle#componentdidload-)
- [componentShouldUpdate(newValue, oldValue, propName): boolean](component-lifecycle#componentshouldupdate)
- [componentWillRender()](component-lifecycle#componentwillrender-)
- [componentDidRender()](component-lifecycle#componentdidrender-)
- [componentWillUpdate()](component-lifecycle#componentwillupdate-)
- [componentDidUpdate()](component-lifecycle#componentdidupdate-)
- **[render()](./templating-jsx)**


## The appload event

In addition to component-specific lifecycle hooks, a special event called `appload` will be emitted when the app and all of its child components have finished loading. You can listen for it on the `window` object.

If you have multiple apps on the same page, you can determine which app emitted the event by checking `event.detail.namespace`. This will be the value of the [namespace config option](/config#namespace) you've set in your Stencil config.

```tsx
window.addEventListener('appload', (event) => {
  console.log(event.detail.namespace);
});
```

## Other

- [**Host**](host-element): Host is a functional component that can be used at the root of the render function to set attributes and event listeners to the host element itself.

- [**h()**](templating-jsx): It's used within the `render()` to turn the JSX into Virtual DOM elements.

- [**readTask()**](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing): Schedules a DOM-read task. The provided callback will be executed in the best moment to perform DOM reads without causing layout thrashing.

- [**writeTask()**](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing): Schedules a DOM-write task. The provided callback will be executed in the best moment to perform DOM mutations without causing layout thrashing.

- **forceUpdate()**: Schedules a new render of the given instance or element even if no state changed. Notice `forceUpdate()` is not synchronous and might perform the DOM render in the next frame.

- getAssetPath(): Gets the path to local assets. Refer to the [Assets](/assets#getassetpath) page for usage info.
- setMode()
- getMode()
- getElement()
