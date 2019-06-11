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

In order to unit test a component as rendered HTML, tests can use `newSpecPage()` imported from `@stencil/core/testing`. This testing utility method is similar to `newE2EPage()`, however, `newSpecPage()` is much faster since it does not require a full [Puppeteer](https://pptr.dev/) instance to be running. Please see the [newE2EPage()](/docs/end-to-end-testing) docs on more information about complete End-to-end testing with Puppeteer.

Below is a simple example where `newSpecPage()` is given one component class which was imported, and the initial HTML to use for the test. In this example, when the component `MyCmp` renders it sets its text content as "Success!". The matcher `toEqualHtml()` is then used to ensure the component renders as expected.


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

| Option | Description |
|--------|-------------|
| `components` | An array of components to test. Component classes can be imported into the spec file, then their reference should be added to the `component` array in order to be used throughout the test. *Required* |
| `html` | The initial HTML used to generate the test. This can be useful to construct a collection of components working together, and assign HTML attributes. This value sets the mocked `document.body.innerHTML`. |
| `autoApplyChanges` | By default, any changes to component properties and attributes must call `page.waitForChanges()` in order to test the updates. As an option, `autoApplyChanges` continuously flushes the queue in the background. Defaults to  `false` |
| `cookie` | Sets the mocked `document.cookie`. |
| `direction` | Sets the mocked `dir` attribute on `<html>`. |
| `language` | Sets the mocked `lang` attribute on `<html>`. |
| `referrer` | Sets the mocked `document.referrer`. |
| `supportsShadowDom` | Manually set if the mocked document supports Shadow DOM or not. Defaults to `true` |
| `userAgent` | Sets the mocked `navigator.userAgent`. |
| `url` | Sets the mocked browser's `location.href`. |


### Spec Page Results

The returned "page" object from `newSpecPage()` contains the initial results from the first render. It's also important to note that the returned page result is a `Promise`, so for convenience it's recommended to use async/await.

The most useful property on the page results would be `root`, which is for convenience to find the first root component in the document. For example, if a component is nested in many `<div>` elements, the `root` property goes directly to the component being tested in order to skip the query selector boilerplate code.


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
