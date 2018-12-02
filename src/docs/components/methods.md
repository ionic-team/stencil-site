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

```tsx
import { Method } from '@stencil/core';

export class TodoList {

+ @Method()
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

Exposed methods annotated with the `Method()` decorator must return a `Promise` or
`void`:

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

Given the async nature of stencil, imperative APIs like methods must be async too.

- Components are lazy loaded by default, which means the implementation might not be ready when a method is called, stencil proxies method calls (like a [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call)), so the returned value must be a promise.
- In the future, components might run inside a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), making it impossible to have synchronous method invocations.

