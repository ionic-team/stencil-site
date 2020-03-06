---
title: Internal state
description: Use the State() for component's internal state
url: /docs/state
contributors:
  - jthoms1
---

# State Decorator

The `@State()` decorator can be used to manage internal data for a component. This means that a user cannot modify this data from outside the component, but the component can modify it however it sees fit. Any changes to a `@State()` property will cause the components `render` function to be called again.

## Example

This example makes use of State and Listen decorators. We define a class property called `open` and decorate it with `@State`. With the use of `@Listener` we respond to click events
 toggling the value of `open`.

```tsx
import { Component, State, Listen, h } from '@stencil/core';

@Component({
  tag: 'my-toggle-button'
})

export class MyToggleButton {
  @State() open: boolean;

  @Listen('click', { capture: true })
  handleClick() {
    this.open = !this.open;
  }

  render() {
    return <button>
      {this.open ? "On" : "Off"}
    </button>;
  }
}
```

For more advanced use cases state can be a complex Type. In the below example we maintain a list of `Todo` type values.

```tsx
import { State } from '@stencil/core';

type Todo = {
  done: boolean,
  description: string,
}

export class TodoList {

  @State() completedTodos: Todo[];

  completeTodo(todo: Todo) {
    // This will cause our render function to be called again
    this.completedTodos = [...this.completedTodos, todo];
  }
}
```

## When to use?

Not all internal state might need to be decorated with `@State()`, in fact it's a good practice to avoid using it if you know for sure that the value will not change or that it does NOT need to trigger a re-rendering:

```tsx
class Component {

  // If `cacheData` changes we don't want to re-render the component,
  // so we DON'T decorate it with @State
  cacheData = SOME_BIG_DATA;

  // If this state change we want to run render() again
  @State() value;
}
```
