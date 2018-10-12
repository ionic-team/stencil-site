---
title: Unit Testing
description: Unit Testing
url: /docs/unit-testing
contributors:
  - adamdbradley
  - mattdsteele
---

# Unit Testing

Stencil makes it easy to unit test component classes and app utility functions using [Jest](https://jestjs.io/).

Unit tests validate the code in isolation. Well written tests are fast, repeatable, and easy to reason about.

To run unit tests, run `stencil test --spec`. Files ending in `.spec.ts` will be executed.

Typically, unit tests will instantiate a component by importing the class and instantiating it manually.
Since Stencil components are plain JavaScript objects, you can `new` one up and execute its methods directly
in order to test them. 

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
