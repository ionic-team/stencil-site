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

| @State() completedTodos: Todo[];

  completeTodo(todo: Todo) {
    // This will cause our render function to be called again
    this.completedTodos = [...this.completedTodos, todo];
  }
}
```
