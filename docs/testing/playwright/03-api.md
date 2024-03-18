---
title: Playwright Adapter API
sidebar_label: API
---

## `createStencilPlaywrightConfig` Function

**Signature:** `createStencilPlaywrightConfig(overrides?: CreateStencilPlaywrightConfigOptions): Promise<PlaywrightTestConfig>`

Returns a [Playwright test configuration](https://playwright.dev/docs/test-configuration#introduction).

`overrides`, as the name implies, will overwrite the default configuration value(s) if supplied. These values can include any valid Playwright config option as well
as some options to override specific values in the config options related to the Stencil integration:

- `webServerCommand`: This can be specified to change the command that will run to start the Stencil dev server. Defaults to `npm start -- --no-open`.
- `webServerTimeout`: This can be specified to change the amount of time Playwright will wait for the dev server to start. Defaults to 60 seconds.

```ts title="playwright.config.ts"
import { expect } from '@playwright/test';
import { matchers, createStencilPlaywrightConfig } from '@stencil/playwright';

expect.extend(matchers);

export default createStencilPlaywrightConfig({
  // Change which test files Playwright will execute
  testMatch: '*.spec.ts',

  // Only wait max 30 seconds for server to start
  webServerTimeout: 30000,
});
```

## `test` Function

`test` designates which tests will be executed by Playwright. See the [Playwright API documentation](https://playwright.dev/docs/api/class-test#test-call) regarding usage.

This package modifies the [`page` fixture](#page-fixture) and offers a [`skip` utility](#skip-function) as discussed below.

## `page` Fixture

The page fixture is a class that allows interacting with the current test's browser tab. In addition to the [default Playwright Page API](https://playwright.dev/docs/api/class-page),
Stencil extends the class with a few additional methods:

- `waitForChanges()`: Waits for Stencil components to re-hydrate before continuing.
- `spyOnEvent()`: Creates a new EventSpy and listens on the window for an event to emit.

## `skip` Function

The `skip()` function is used to skip test execution for certain browsers or [component modes](https://stenciljs.com/docs/styling#style-modes):

```ts
test('my-test', ({ page, skip }) => {
    // Skip tests for certain browsers
    skip.browser('firefox', 'This behavior is not available on Firefox');

    // Skip tests for certain modes
    skip.mode('md', 'This behavior is not available in Material Design');

    ...
})
```

## Matchers

Playwright comes with [a set of matchers to do test assertions](https://playwright.dev/docs/test-assertions). However, the Stencil Playwright adapter
has additional custom matchers.

| Assertion                      | Description                                                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `toHaveFirstReceivedEvent`     | Ensures that the first event received matches a specified [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) payload. |
| `toHaveNthReceivedEventDetail` | Ensures that the nth event received matches a specified [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) payload.   |
| `toHaveReceivedEvent`          | Ensures an event has been received at least once.                                                                                                            |
| `toHaveReceviedEventDetail`    | Ensures an event has been received with a specified [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) payload.       |
| `toHaveReceivedEventTimes`     | Ensures an event has been received a certain number of times.                                                                                                |
