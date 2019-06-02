---
title: Testing
description: Testing overview.
url: /docs/testing-overview
contributors:
  - adamdbradley
  - brandyscarney
  - camwiegert
  - kensodemann
---

# Testing

Testing within Stencil is broken up into two distinct types: Unit tests and End-to-end (e2e) tests. Both types use [Jest](https://jestjs.io/) as the JavaScript testing solution. The browser environment for end-to-end testing is done using [Puppeteer](https://pptr.dev/), which provides many advantages Stencil can start to incorporate into its builds.


## Unit Testing vs. End-to-end Testing

There are countless philosophies on how testing should be done, and what should be considered a unit test, end-to-end test or even integration tests. To simplify it all, Stencil breaks it down to so developers have a defined description of when to use each type of testing.

**Unit tests** focuses on testing a component's methods in isolation. For example, when a method is given the argument `X`, it should return `Y`.

**End-to-end tests** focus on how the components are rendered in the DOM and how the individual components work together. For example, when `my-component` has the `X` attribute, the child component then renders the text `Y`, and expects to receive the event `Z`. End-to-end tests use [Puppeteer](https://pptr.dev/) instead of a Node environment. This allows end-to-end tests to run within an actual browser in order to provide more realistic results.

By not blurring the lines between JavaScript testing and DOM testing, tests can be built out quickly across large teams.


## Testing Commands

Below is an example `npm` script which can be added to the app's `package.json` file. Notice the command is `stencil test`, with optional flags of `--spec` for unit tests, and `--e2e` for end-to-end tests.

```tsx
"scripts": {
  "test": "stencil test --spec",
  "test.watch": "stencil test --spec --watch",
  "test.e2e": "stencil test --e2e"
}
```

All of this configuration is included with the Stencil App Starter and the Stencil Component Starter so if you
use one of those templates to start your project, you should not have to add anything. This information is presented here primarily for informational purposes.


### Testing Configuration

Stencil will apply defaults from data it has already gathered. For example, Stencil already knows what directories to look through, and what files are spec and e2e files. Jest can still be configured using the same config names, but now using the stencil config `testing` property. Please see the [Testing Config docs](docs/config/testing) for more info.

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  testing: {
    testPathIgnorePatterns: [...]
  }
};
```
