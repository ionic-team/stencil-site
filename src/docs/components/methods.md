---
title: Methods
description: methods
url: /docs/methods
contributors:
  - jthoms1
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

