---
title: Internal state
description: Use the State() for component's internal state
url: /docs/state
contributors:
  - jthoms1
---

# State Decorator

The `@State()` decorator can be used to manage internal data for a component. This means that a user cannot modify this data from outside the component, but the component can modify it however it sees fit. Any changes to a `@State()` property will cause the components `render` function to be called again.


```tsx
import { State } from '@stencil/core';

export class TodoList {

  @State() completedTodos: Todo[];

  completeTodo(todo: Todo) {
    // This will cause our render function to be called again
    this.completedTodos = [...this.completedTodos, todo];
  }
}
```

## When to use?

Not all internal state might need the be decorated with `@State()`, in fact it's a good practice to avoid using it if you know for sure that the value will not change or that it does NOT need to trigger a re-rendering:

```tsx
class Component {

// If `cacheData` changes we don't want to re-render the component,
// so we DON'T decorate it with @State
cacheData = SOME_BIG_DATA;

  // If this state change we want to run render() again
  @State() value;
}
```
