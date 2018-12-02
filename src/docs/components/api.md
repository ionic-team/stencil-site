---
title: Component
description: Component API
url: /docs/decorator
contributors:
  - manucorporat
---

# Component API

The whole API provided by stencil can be condensed in a set of decorators, lifecycles hooks and rendering methods.


## Decorators

Decorators are a pure compiler-time construction used by stencil to collection all the metadata about a component, the properties, attributes and methods it might expose, the events it might emit or even the associated stylesheets.
Once all the metadata has been collected, all the decorators are removed from the output, so they don't incur in any runtime overhead.

- [@Component()](component#component-decorator) declares a new web component
- [@Prop()](properties#prop-decorator) declares an exposed property/attribute of the component
- [@State()](state#state-decorator) declares an internal state of the component, that triggers re-rendering
- [@Watch()](reactive-data#watch-decorator) declares a method that gets called when a property or state changes
- [@Element()](host-element#element-decorator) declared a reference to the host element itself
- [@Method()](methods#method-decorator) declared an exposed method
- [@Event()](events#event-decorator) declared an DOM event the component might emit
- [@Listen()](events#listen-decorator) declared


## Lifecycle hooks

- [componentWillLoad()](component-lifecycle)
- [componentDidLoad()](component-lifecycle)
- [componentWillUpdate()](component-lifecycle)
- [componentDidUpdate()](component-lifecycle)
- [componentDidUnload()](component-lifecycle)


## Rendering methods

- **[hostData()](host-element#hostdata-method)**
- **[@render()](templating-jsx)**

