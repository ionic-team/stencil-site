---
title: Unit Testing
description: Unit Testing
contributors:
  - adamdbradley
---

# Unit Testing

Stencil's goal is to make it easy to unit test a component's class and app utility functions using Jest.


## Example Unit Test

```typescript
import { MyToggle } from '../my-toggle.tsx';

it('should toggle the checked property', async () => {
  const toggle = new MyToggle();

  expect(toggle.checked).toBe(false);

  toggle.someMethod();

  expect(toggle.checked).toBe(true);
});
```
