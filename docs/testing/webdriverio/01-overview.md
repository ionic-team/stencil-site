---
title: WebdriverIO Overview
sidebar_label: Overview
---

# Overview

WebdriverIO is a progressive automation framework built to automate modern web and mobile applications. It simplifies the interaction with your app and provides a set of plugins that help you create a scalable, robust and stable test suite.

Testing with WebdriverIO has the following advantages:

- __Cross Browser Support__: WebdriverIO is designed to support all platforms, either on desktop or mobile. You can run tests on actual browser your users are using, including covering different versions of them.
- __Real User Interaction__: Interaction with elements in WebdriverIO through the WebDriver protocol is much closer to native user-triggered interactions than what can be achieved with emulated DOM environments (such as JSDom or Stencil's own Mock-Doc).
- __Web Platform Support__: Running tests in actual browsers allows you to tap into the latest Web Platform features for testing your components, often not available when using virtual DOM environments.

## Set Up

To get started with WebdriverIO, all you need to do is to run their project starter:

```sh
npm init wdio@latest .
```

This will initiate WebdriverIOs configuration wizard that walks you through the setup. Make sure you select the following options when walking through it:

- __What type of testing would you like to do?__: select either `Component or Unit Testing - in the browser` if you are interested adding unit tests for your components or `E2E Testing - of Web or Mobile Applications` if you like to test your whole application (you can always add either of them later on)
- __Which framework do you use for building components?__: if you select _Component or Unit Testing_ make sure to select `StencilJS` as preset so WebdriverIO knows how to compile your components properly

The following questions can be answered as desired. Once setup the wizard has created a `wdio.conf.ts` file and a `wdio` script to run your tests. You should be able to run your first test on the auto-generated test file via:

```sh
npm run wdio
```

More information on setting up WebdriverIO can be found in their [documentation](https://webdriver.io/docs/component-testing/stencil).
