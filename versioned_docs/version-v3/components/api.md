---
title: Component API
sidebar_label: API
description: Component API
slug: /api
---

# Component API

The whole API provided by stencil can be condensed in a set of decorators, lifecycles hooks and rendering methods.


## Decorators

Decorators are a pure compiler-time construction used by stencil to collect all the metadata about a component, the properties, attributes and methods it might expose, the events it might emit or even the associated stylesheets.
Once all the metadata has been collected, all the decorators are removed from the output, so they don't incur any runtime overhead.

- [@Component()](./component.md#component-decorator) declares a new web component
- [@Prop()](./properties.md#the-prop-decorator-prop) declares an exposed property/attribute
- [@State()](./state.md#the-state-decorator-state) declares an internal state of the component
- [@Watch()](./reactive-data.md#the-watch-decorator-watch) declares a hook that runs when a property or state changes
- [@Element()](./host-element.md#element-decorator) declares a reference to the host element
- [@Method()](./methods.md#method-decorator) declares an exposed public method
- [@Event()](./events.md#event-decorator) declares a DOM event the component might emit
- [@Listen()](./events.md#listen-decorator) listens for DOM events


## Lifecycle hooks

- [connectedCallback()](./component-lifecycle.md#connectedcallback)
- [disconnectedCallback()](./component-lifecycle.md#disconnectedcallback)
- [componentWillLoad()](./component-lifecycle.md#componentwillload)
- [componentDidLoad()](./component-lifecycle.md#componentdidload)
- [componentShouldUpdate(newValue, oldValue, propName): boolean](./component-lifecycle.md#componentshouldupdate)
- [componentWillRender()](./component-lifecycle.md#componentwillrender)
- [componentDidRender()](./component-lifecycle.md#componentdidrender)
- [componentWillUpdate()](./component-lifecycle.md#componentwillupdate)
- [componentDidUpdate()](./component-lifecycle.md#componentdidupdate)
- **[render()](./templating-and-jsx.md)**

## componentOnReady()

This isn't a true "lifecycle" method that would be declared on the component class definition, but instead is a utility method that
can be used by an implementation consuming your Stencil component to detect when a component has finished its first render cycle.

This method returns a promise which resolves after `componentDidRender()` on the _first_ render cycle.

:::note
`componentOnReady()` only resolves once per component lifetime. If you need to hook into subsequent render cycle, use
`componentDidRender()` or `componentDidUpdate()`.
:::

Executing code after `componentOnReady()` resolves could look something like this:

```ts
// Get a reference to the element
const el = document.querySelector('my-component');

el.componentOnReady().then(() => {
  // Place any code in here you want to execute when the component is ready
  console.log('my-component is ready');
});
```

The availability of `componentOnReady()` depends on the component's compiled output type. This method is only available for lazy-loaded
distribution types ([`dist`](../output-targets/dist.md) and [`www`](../output-targets/www.md)) and, as such, is not available for
[`dist-custom-elements`](../output-targets/custom-elements.md) output. If you want to simulate the behavior of `componentOnReady()` for non-lazy builds,
you can implement a helper method to wrap the functionality similar to what the Ionic Framework does [here](https://github.com/ionic-team/ionic-framework/blob/main/core/src/utils/helpers.ts#L60-L79).

## The appload event

In addition to component-specific lifecycle hooks, a special event called `appload` will be emitted when the app and all of its child components have finished loading. You can listen for it on the `window` object.

If you have multiple apps on the same page, you can determine which app emitted the event by checking `event.detail.namespace`. This will be the value of the [namespace config option](../config/01-overview.md#namespace) you've set in your Stencil config.

```tsx
window.addEventListener('appload', (event) => {
  console.log(event.detail.namespace);
});
```

## Other

- [**Host**](./host-element.md): Host is a functional component that can be used at the root of the render function to set attributes and event listeners to the host element itself.

- [**h()**](./templating-and-jsx.md): It's used within the `render()` to turn the JSX into Virtual DOM elements.

- [**readTask()**](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing): Schedules a DOM-read task. The provided callback will be executed in the best moment to perform DOM reads without causing layout thrashing.

- [**writeTask()**](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing): Schedules a DOM-write task. The provided callback will be executed in the best moment to perform DOM mutations without causing layout thrashing.

- **forceUpdate()**: Schedules a new render of the given instance or element even if no state changed. Notice `forceUpdate()` is not synchronous and might perform the DOM render in the next frame.

- getAssetPath(): Gets the path to local assets. Refer to the [Assets](../guides/assets.md#getassetpath) page for usage info.
- setMode()
- getMode()
- getElement()
