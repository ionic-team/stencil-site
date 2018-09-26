---
title: Testing
description: Testing overview.
contributors:
  - adamdbradley
  - brandyscarney
---

# Testing

Testing within Stencil is broken up into two distinct types: Unit tests and End-to-end (e2e) tests. Both types use [Jest](https://jestjs.io/) as the JavaScript testing solution. The browser environment for e2e testing is done using [Puppeteer](https://pptr.dev/), which provides many advantages Stencil can start to incorporate into its builds.


## Unit Testing vs. End-to-end Testing

There are countless philosophies on how testing should be done, and what should be considered a unit test, e2e test or even integration tests. To simplify it all, Stencil tries to break it down to so developers have a defined description of when to use each type of testing.

Unit testing is for testing small chunks of JavaScript code in isolation at the lowest level. For example, when a method is given the argument `X`, it should return `Y`. Unit tests should not be doing full rendering of the component, or even shallow rendering, but rather focused on logic only. Stencil likes to think of unit testing as specifically testing JavaScript code, and when given an input, the test should expect an exact output. With unit testing there is no simulating or mocking the component as an element in the DOM, but rather unit tests should import the component's class, create an instance, and test its methods and properties directly. Unit tests would also be the solution for testing utility functions and services used by components.

End-to-end tests are one step further and would be testing rendering the components as elements in the DOM, and components working together. For example, when `my-component` has the `X` attribute, the child component then renders the text `Y`, and expects to receive the event `Z`. End-to-end tests are focused specifically on the DOM and how components interact with each other in the DOM. By using [Puppeteer](https://pptr.dev/) instead of a Node environment for rendering tests, e2e tests are able to run within an actual browser in order to provide more realistic results.

Again, there are many theories and opinions on the definitions of "unit testing" and "e2e testing", but by locking in these definitions and not blurring the lines between JavaScript testing and DOM testing it should help to quickly build out tests across large teams.


## Testing Commands

Below is an example `npm` script which can be added to the app's `package.json` file. Notice the command is `stencil test`, with optional flags of `--spec` for unit tests, and `--e2e` for e2e tests.

```javascript
"scripts": {
  "test": "stencil test --spec",
  "test.watch": "stencil test --spec --watch",
  "test.e2e": "stencil test --e2e"
}
```

<stencil-route-link url="/docs/style-guide" router="#router" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/unit-testing" custom="true">
  <button class="pull-right btn btn--primary">
    Next
  </button>
</stencil-route-link>
