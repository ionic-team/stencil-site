---
title: Debugging Static Site Generation in Stencil
description: How to debug a prerendering or Static Site Generation step in Stencil
url: /docs/static-site-generation-debugging
contributors:
  - mlynch
  - adamdbradley
---

# Debugging Static Site Generation

Static Site Generation, also known as prerendering, executes your components at build time to generate a snapshot of the rendered styles and markup to be efficiently served to search engines and users on first request.

Since this step runs in a Node.js process instead of a browser, debugging can't be done directly in the browser. However, debugging is straightforward using existing Node.js debugging techniques.

## Overview

The `stencil build --prerender` command will first build the hydrate script for a NodeJS environment, then prerender the site using the build. For a production build this is probably ideal.

However, while debugging you may not need to keep rebuilding the hydrate script, but you only need to debug through the prerendering process. Stencil creates a file in `dist/hydrate` that is used to actually execute your components.

To only prerender (and avoid rebuilding), you can use the `stencil prerender dist/hydrate/index.js` command, with the path to the script as a flag.


## Tips for Debugging Prerendering

By default, prerendering will start by rendering the homepage, find links within the homepage, and continue to crawl the entire site as it finds more links. While debugging, it might be easier to _not_ crawl every URL in the site, but rather have it only prerender one page. To disable crawling, set the prerender config `crawlUrls: false`.

Next, you can use the `entryUrls` config to provide an array of paths to prerender, rather than starting at the homepage.

Additionally, console logs that are printed within the runtime are surpressed while prerendering (otherwise the terminal would be overloaded with logs). By setting `runtimeLogging: true`, the runtime console logs will be printed in the terminal. Below is an example setup for prerender debugging:

```tsx
// prerender.config.ts
import { PrerenderConfig } from '@stencil/core';
export const config: PrerenderConfig = {
  crawlUrls: false,
  entryUrls: ['/example'],
  hydrateOptions: _url => {
    return {
      runtimeLogging: true
    };
  }
};
```


## Debugging in VS Code

We've found [VS Code's Debugger](https://code.visualstudio.com/docs/editor/debugging) to be the easiest way to set breakpoints and step through the prerendering process.

To debug your prerendering process in VS Code, enter the Debug tab and create a new `launch.json` file with the following contents:

```json
// launch.json
{
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
        "--config=${workspaceFolder}/stencil.config.ts"
      ],
      "protocol": "inspector",
    }
  ]
}
```

This creates a new debugging configuration using the script that hydrates the app. We're starting up the `stencil prerender` command, and providing it a path to where
the hydrate script can be found. Next we're using `--max-workers=0` so we do not fork numerous processes to each of your CPUs which will make it difficult to debug.


## Debugging in Others

To Debug in different tools, follow a similar approach to the command being run in the VS Code configuration, calling the `dist/hydrate/index.js` script from Node, passing the provided arguments, and setting breakpoints using your tool of choice's system for breakpoints.


# Breakpoints and Stepping

To debug components during prerendering, find the transpiled source of the component in `dist/hydrate/index.js` and set breakpoints (or use raw `debugger` statements in your original component source). As the prerendering process runs, your breakpoints will be hit and the current stack context can be evaluated.
