---
title: Unit Testing
description: Unit Testing
url: /docs/unit-testing
contributors:
  - adamdbradley
  - mattdsteele
  - bassettsj
---

# Unit Testing

Stencil makes it easy to unit test components and app utility functions using [Jest](https://jestjs.io/). Unit tests validate the code in isolation. Well written tests are fast, repeatable, and easy to reason about.

To run unit tests, run `stencil test --spec`. Files ending in `.spec.ts` will be executed.


## newSpecPage()

In order to unit test a component as rendered HTML, tests can use `newSpecPage()` imported from `@stencil/core/testing`. The `newSpecPage()` method is very similar to `newE2EPage()`, however, `newSpecPage()` is much faster since it does not require a full [Puppeteer](https://pptr.dev/) instance to be running. Please see the [newE2EPage()](/docs/end-to-end-testing) docs on more information about complete End-to-end testing with Puppeteer.


```typescript
import { newSpecPage } from '@stencil/core/testing';
import { MyCmp } from '../my-cmp';

it('should render my component', async () => {
  const page = await newSpecPage({
    components: [MyCmp],
    html: `<my-cmp></my-cmp>`,
  });
  expect(page.root).toEqualHtml(`
    <my-cmp>Success!</my-cmp>
  `);
});
```


### Spec Page Options

The `newSpecPage(options)` method takes an options argument to help write tests:

| Option | Description | Default |
|--------|-------------|---------|
| `components` | An array of components to test. Component classes can be imported into the spec file, then their reference should be added to the `component` array in order to be used throughout the test. | []
| `html` | The initial HTML used to generate the test. This can be useful to construct a collection of components working together, and assign HTML attributes. This value sets the mocked `document.body.innerHTML`. | "" |
| `autoAppluChanges` | By default, any changes to component properties and attributes must call `page.waitForChanges()` in order to test the updates. As an option, `autoAppluChanges` continuously flushes the queue in the background. | `false` |
| `cookie` | Sets the mocked `document.cookie`. | *undefined* |
| `direction` | Sets the mocked `dir` attribute on `<html>`. | *undefined* |
| `language` | Sets the mocked `lang` attribute on `<html>`. | *undefined* |
| `referrer` | Sets the mocked `document.referrer`. | *undefined* |
| `supportsShadowDom` | Manually set if the mocked document supports Shadow DOM or not. | `true` |
| `userAgent` | Sets the mocked `navigator.userAgent`. | *undefined* |
| `url` | Sets the mocked browser's `location.href`. | *undefined* |


## Testing Component Class Logic

For simple logic only testing, unit tests can instantiate a component by importing the class and constructing it manually. Since Stencil components are plain JavaScript objects, you can create a new component and execute its methods directly.

```typescript
import { MyToggle } from '../my-toggle.tsx';

it('should toggle the checked property', () => {
  const toggle = new MyToggle();

  expect(toggle.checked).toBe(false);

  toggle.someMethod();

  expect(toggle.checked).toBe(true);
});
```
