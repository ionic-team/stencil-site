---
title: Methods
description: methods
url: /docs/methods
contributors:
  - jthoms1
  - manucorporat
---

# Method Decorator

The `@Method()` decorator is used to expose methods on the public API. Functions decorated with the `@Method()` decorator can be called directly from the element.

> Developers should try to rely on publicly exposed methods as little as possible, and instead default to using properties and events as much as possible. As an app scales, we've found it's easier to manage and pass data through @Prop rather than public methods.

```tsx
import { Method } from '@stencil/core';

export class TodoList {

| @Method()
  showPrompt() {
    // show a prompt
  }
}
```

Call the method like this:

```tsx
const todoListElement = document.querySelector('todo-list');
todoListElement.showPrompt();
```

## Methods must be async

Stencil's architecture is async at all levels which allows for many performance benefits and ease of use. By ensuring publicly exposed methods using the @Method decorator return a promise:

- Developers can call methods before the implementation was downloaded without componentOnReady(), which queues the method calls and resolves after the component has finished loading.

- Interaction with the component is the same whether it still needs to be lazy-loaded, or is already fully hydrated.

- By keeping a component's public API async, apps could move the components transparently to [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) and the API would still be the same.

- Returning a promise is only required for publicly exposed methods which have the @Method decorator. All other component methods are private to the component and are not required to be async.


```tsx
// VALID: using async
@Method()
async myMethod() {
  return 42;
}

// VALID: using Promise.resolve()
@Method()
myMethod2() {
  return Promise.resolve(42);
}

// VALID: it returns nothing
@Method()
myMethod3() {
  console.log(42);
}

// INVALID
@Method()
notOk() {
  return 42;
}
```
