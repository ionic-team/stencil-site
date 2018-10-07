---
title: Unit Testing
description: Unit Testing
url: /docs/unit-testing
contributors:
  - adamdbradley
  - mattdsteele
---

# Unit Testing

Stencil's goal is to make it easy to unit test a component's class and app utility functions using Jest.

To run unit tests, run `stencil test --unit`. Files ending in `.spec.ts` will be executed.

Typically, unit tests will instantiate a component by importing the class, and instantiating and instrumenting it manually.
Since Stencil components are plain JavaScript objects, you can `new` one up and execute its behavior as such.

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
