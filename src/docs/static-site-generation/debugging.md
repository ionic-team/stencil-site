---
title: Debugging Static Site Generation in Stencil
description: How to debug a pre-rendering or Static Site Generation step in Stencil
url: /docs/static-site-generation-debugging
contributors:
  - mlynch
---

# Debugging Static Site Generation

Static Site Generation, also known as pre-rendering, executes your components at build time to generate a snapshot of the rendered styles and markup to be efficiently served to search engines and users on first request.

Since this step runs in a Node.js process instead of a browser, debugging can't be done directly in the browser. However, debugging is straightforward using existing Node.js debugging techniques.

## Overview

When pre-rendering, Stencil creates a file in `dist/prerender` that is used to actually execute your components.

## Debugging in VS Code

To debug your pre-rendering process in VS Code, enter the Debug tab and create a new `launch.json` file with the following contents:

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Prerender",
      "args": [
        "${workspaceFolder}/node_modules/@stencil/core/bin/stencil",
        "prerender",
        "${workspaceFolder}/dist/hydrate/index.js",
        "--max-workers=0",
        "--prerender",
        "--config=${workspaceFolder}/stencil.config.ts"
      ],
      "protocol": "inspector",
    }
  ]
}
```

This creates a new debugging configuration using the script that hydrates the app.

## Debugging in Others

To Debug in different tools, follow a similar approach to the command being run in the VS Code configuration, calling the `dist/hydrate/index.js` script from Node, passing the provided arguments, and setting breakpoints using your tool of choice's system for breakpoints.

# Breakpoints and Stepping

To debug components during pre-rendering, find the transpiled source of the component in `dist/hydrate/index.js` and set breakpoints (or use raw `debugger` statements in your original component source). As the pre-rendering process runs, your breakpoints will be hit and the current stack context can be evaluated.
