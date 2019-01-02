---
title: Working with host elements
description: Working with host elements
url: /docs/host-element
contributors:
  - jthoms1
---

# Working with host elements

Stencil components render their children declaratively in their `render` method [using JSX](templating-jsx). However, sometimes you will need to set properties on the host element itself. Stencil provides a couple of ways to access and update the host element.


## hostData() method

The `hostData` method can be implemented by any Stencil component and provides a way to declaratively set properties on the host element during rendering. The `hostData` method is called whenever `render` is, so it is useful for reacting to state and prop changes.

```tsx
...
export class TodoList {

  hostData() {
    return {
      'class': { 'is-open': this.isOpen },
      'aria-hidden': this.isOpen ? 'false' : 'true'
    };
  }
}
```

## Element Decorator

The `@Element()` decorator is how to get access to the host element within the class instance. This returns an instance of an `HTMLElement`, so standard DOM methods/events can be used here.

If you need to update the host element in response to prop or state changes, you should do so using the `hostData` method.

```tsx
import { Element } from '@stencil/core';

...
export class TodoList {

 @Element() el: HTMLElement;

  getListHeight(): number {
    return this.el.getBoundingClientRect().height;
  }
}
```
