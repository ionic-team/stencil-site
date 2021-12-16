---
title: Testing
description: Testing overview.
url: /docs/testing-overview
contributors:
  - adamdbradley
  - brandyscarney
  - camwiegert
  - kensodemann
  - rwaskiewicz
---

# Testing

## Unit Testing vs. End-to-end Testing

Testing within Stencil is broken up into two distinct types: Unit tests and End-to-end (e2e) tests.

There are countless philosophies on how testing should be done, and how to differentiate what should be considered a 
unit test, end-to-end test. Stencil takes an opinionated stance so developers have a description of each to better 
choose when to use each type of testing:

**Unit tests** focuses on testing a component's methods in isolation. For example, when a method is given the argument `X`, it should return `Y`.

**End-to-end tests** focus on how the components are rendered in the DOM and how the individual components work together. For example, when `my-component` has the `X` attribute, the child component then renders the text `Y`, and expects to receive the event `Z`.

Both types use [Jest](https://jestjs.io/) as the JavaScript testing solution. End-to-end tests also use [Puppeteer](https://pptr.dev/)
instead of a Node environment. This allows end-to-end tests to run within an actual browser in order to provide more realistic
results.

## Library Support

Stencil currently supports:
- Jest v24.9.0 through v27.Y.Z (inclusive)
- Puppeteer v1.19.0 through v10.Y.Z (inclusive)

## Testing Commands

Below a series of example `npm` scripts which can be added to the project's `package.json` file to run Stencil tests:

```json
{
    "scripts": {
      "test": "stencil test --spec",
      "test.watch": "stencil test --spec --watch",
      "test.e2e": "stencil test --e2e"
    }
}
```

Each command begins `stencil test`, and is followed one or more optional flags:
- `--spec` to run unit tests
- `--e2e` ro run end-to-end tests

When the `--spec` and/or `--e2e` flags are provided, Stencil will automatically run the tests associated with each flag. 

Note: If you created a project using `npm init stencil`, these scripts are provided to you automatically.

### Testing Configuration

Stencil will apply defaults from data it has already gathered. For example, Stencil already knows what directories to look through, and what files are spec and e2e files. Jest can still be configured using the same config names, but now using the stencil config `testing` property. Please see the [Testing Config docs](/docs/config/testing) for more info.

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  testing: {
    testPathIgnorePatterns: [...]
  }
};
```

## Running and Debugging Tests in VS Code

Adding the following configurations to `.vscode/launch.json` will allow you to use the VS Code Debugger to run the Stencil test runner for the currently active file in your editor. Just make sure you're in the test file you want to run, then select the debug configuration respectively (depending on whether it's a spec or e2e test), and hit the play button.

```json
{
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "E2E Test Current File",
      "cwd": "${workspaceFolder}",
      "program": "${workspaceFolder}/node_modules/.bin/stencil",
      "args": ["test", "--e2e", "${relativeFile}"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Spec Test Current File",
      "cwd": "${workspaceFolder}",
      "program": "${workspaceFolder}/node_modules/.bin/stencil",
      "args": ["test", "--spec", "${relativeFile}"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true
    }
  ]
}
```

## Other Resources

- [The Basics of Unit Testing in StencilJS](https://www.joshmorony.com/the-basics-of-unit-testing-in-stencil-js/)
