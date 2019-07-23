---
title: Working with host elements
description: Working with host elements
url: /docs/host-element
contributors:
  - jthoms1
---

# Working with host elements

Stencil components render their children declaratively in their `render` method [using JSX](templating-jsx). Most of the times, the `render()` function describes the children elements that are about to be rendered, but it can also be used to render attributes of the host element itself.


## `<Host>`

The `Host` functional component can be used at the root of the render function to set attributes and event listeners to the host element itself. This works just like any other JSX:

```tsx
// Host is imported from '@stencil/core'
import { Component, Host, h } from '@stencil/core';

@Component({tag: 'todo-list'})
export class TodoList {
  @Prop() open = false;
  render() {
    return (
      <Host
        aria-hidden={this.open ? 'false' : 'true'}
        class={{
          'todo-list': true,
          'is-open': this.open
        }}
      />
    )
  }
}
```

If `this.open === true`, it will render:
```tsx
<todo-list class="todo-list is-open" aria-hidden="false"></todo-list>
```

similary, if `this.open === false`:

```tsx
<todo-list class="todo-list" aria-hidden="true"></todo-list>
```

`<Host>` is a virtual component, a virtual API exposed by stencil to declarative set the attributes of the host element, it will never rendered in the DOM, ie you will never see `<Host>` in Chrome Dev Tools for instance.


### `<Host>` can work as a `<Fragment>`

`<Host>` can also be used when more than one component needs to be rendered at the root level for example:

could be achieved by a `render()` method like this:

```tsx
@Component({tag: 'my-cmp'})
export class MyCmp {
  render() {
    return (
      <Host>
        <h1>Title</h1>
        <p>Message</p>
      </Host>
    );
  }
}
```

This JSX would render the following HTML:

```markup
<my-cmp>
  <h1>Title</h1>
  <p>Message</p>
</my-cmp>
```

Even if we don't use `<Host>` to render any attribute in the host element, it's a useful API to render many elements at the root level.


## Element Decorator

The `@Element()` decorator is how to get access to the host element within the class instance. This returns an instance of an `HTMLElement`, so standard DOM methods/events can be used here.

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

If you need to update the host element in response to prop or state changes, you should do so in the `render()` method using the `<Host>` element.
