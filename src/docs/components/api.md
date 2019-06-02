---
title: Component
description: Component API
url: /docs/decorators
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
Once all the metadata has been collected, all the decorators are removed from the output, so they don't incur in any runtime overhead.

- [@Component()](component#component-decorator) declares a new web component
- [@Prop()](properties#prop-decorator) declares an exposed property/attribute
- [@State()](state#state-decorator) declares an internal state of the component
- [@Watch()](reactive-data#watch-decorator) declares a hook that runs when a property or state changes
- [@Element()](host-element#element-decorator) declares a reference to the host element
- [@Method()](methods#method-decorator) declares an exposed public method
- [@Event()](events#event-decorator) declares a DOM event the component might emit
- [@Listen()](events#listen-decorator) listens for DOM events


## Lifecycle hooks

- [connectedCallback()](component-lifecycle#connectedcallback-)
- [disconnectedCallback()](component-lifecycle#disconnectedcallback-)
- [componentWillLoad()](component-lifecycle#componentwillload-)
- [componentDidLoad()](component-lifecycle#componentdidload-)
- [componentWillRender()](component-lifecycle#componentwillrender-)
- [componentDidRender()](component-lifecycle#componentdidrender-)
- [componentWillUpdate()](component-lifecycle#componentwillupdate-)
- [componentDidUpdate()](component-lifecycle#componentdidupdate-)
- **[render()](templating-jsx)**


## Other

- Host
- h
- getAssetPath
- readTask
- writeTask
- setMode()
- getMode()
- getElement()
- JSX
