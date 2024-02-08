---
title: Unit Testing
sidebar_label: Unit Testing
description: Unit Testing
slug: /testing/webdriverio/unit-testing
---

# Unit Testing

WebdriverIO makes it easy to unit test components and app utility functions in the browser. Unit tests validate the code in isolation. Well written tests are fast, repeatable, and easy to reason about. It tries to follow a simple guiding principle: the more your tests resemble the way your software is used, the more confidence they can give you.

### Test Setup

To resemble how your component is being used as close as possible to reality we need to render it into an actual DOM tree. WebdriverIO provides a helper package for this that you can use called `@wdio/browser-runner/stencil`. It exports a `render` method that allows us to mount our component to the DOM.

For example, given the following component:

```ts reference title="/src/components/my-component/my-component.tsx"
https://github.com/webdriverio/component-testing-examples/blob/main/stencil-component-starter/src/components/my-component/my-component.tsx
```

We import the component into our test to render it in the browser:

```ts reference title="/src/components/my-component/my-component.test.tsx"
https://github.com/webdriverio/component-testing-examples/blob/main/stencil-component-starter/src/components/my-component/my-component.test.tsx#L2-L18
```

You can find more information about the `render` methods option and its return object in the WebdriverIO [documentation](https://webdriver.io/docs/component-testing/stencil#render-options).

### Handle Asynchronicity

Instead of directly working on DOM objects, with WebdriverIO you are interacting with references of DOM nodes and interact through WebDriver commands that are async. Make sure you always use an `await` to ensure that all commands and assertion are executed sequentially.

:::info

Missing an `await` can be a simple oversight and can cause us long hours of debugging. To avoid this and ensure promises are handled properly, it is recommended to use an ESLint rule called [`require-await`](https://eslint.org/docs/latest/rules/require-await).

:::

### Matchers

WebdriverIO provides their own matchers to assert an element in various ways. We recommend to use them over synchronous matchers like `toBe` or `toEqual` as they allow for retries and make your tests more resilient against flakiness.

For example, instead of asserting the content of a component like this:

```ts
expect(await $('my-component').getText()).toBe(`Hello, World! I'm Stencil 'Don't call me a framework' JS`)
```

It is better to use WebdriverIOs matchers for asserting text:

```ts
await expect($('my-component')).toHaveText(`Hello, World! I'm Stencil 'Don't call me a framework' JS`)
```

You can read more about WebdriverIOs specific matchers, in the project [documentation](https://webdriver.io/docs/api/expect-webdriverio).