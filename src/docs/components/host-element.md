---
title: Working with host elements
description: Working with host elements
contributors:
  - jthoms1
---

# Working with host elements

Stencil components render their children declaratively in their `render` method [using JSX](/docs/templating-jsx). However, sometimes you will need to set properties on the host element itself. Stencil provides a couple of ways to access and update the host element.

## Element Decorator

The [Element decorator](/docs/decorators#element) provides direct access to the host element, an instance of `HTMLElement`. This is useful if you need access to underlying DOM methods or properties.

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

## hostData

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
