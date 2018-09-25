---
title: Server Side Rendering
description: Stencil has a number of add-ons that you can use with the build process.
contributors:
  - jthoms1
---
# Server Side Rendering

One of the benefits of Stencil is that it also enables efficient Server Side Rendering (SSR) easily. However, before deciding to render each page on-demand on a server, it may be best to look into using [prerendering](/docs/prerendering) instead. In most cases prerendering is preferred since it doesn't add to the server's workload, but rather just responds with "pre-rendered" static content.

Server-side rendering is useful for dynamic data, such as live product data or user information. With [prerendering](/docs/prerendering), apps are serving a pre-built version of the page, which may not work for pages that need the latest data. However, every webapp and webpage's use-case is different, which is why both prerendering and SSR are available using the same codebase.

Stencil supports [Node.js](https://nodejs.org/) servers out of the box, and the SSR rendering engine is baked right into the `@stencil/core` package. To see a full example, please take a look at the [Stencil SSR Starter](https://github.com/ionic-team/stencil-ssr-starter).


## Stencil SSR Express Middleware Server

The easiest way to run server-side rendering on a Node.js server is to use the [Express middleware](https://expressjs.com/en/guide/using-middleware.html) already included within `@stencil/core/server`. By using the middleware, it's easy to hook into an [Express.js](https://expressjs.com/) app without getting into the low-level details of setting up a server and responding with data.

```tsx
const express = require('express');
const stencil = require('@stencil/core/server');

// create the express app
const app = express();

// load the stencil config and
// express serve-side rendering middleware
const { wwwDir, logger } = stencil.initApp({
  app: app,
  configPath: __dirname
});

// serve static files
app.use(express.static(wwwDir));

// set which port express it will be listening on
const port = 3030;

// start listening and handling requests
app.listen(port, () => logger.info(`server-side rendering listening on port: ${ port }`));
```


## Node.js HTTP SSR Server

The Express middleware option shown above is the easiest way to get up and running, but the same API which the middleware uses can also be used directly. Below is an example of running an overly simplified [Node HTTP server](https://nodejs.org/api/http.html) using the low-level server-side rendering API.

```tsx
const fs = require('fs');
const http = require('http');
const stencil = require('../../server/index.js');

// load the config
const config = stencil.loadConfig(__dirname);

// ensure ssr flag is set on the config
config.flags = { ssr: true };

// create the renderer
const renderer = new stencil.Renderer(config);

// load the source index.html
const srcIndexHtml = fs.readFileSync(config.srcIndexHtml, 'utf-8');

// create a request handler
// this is an overly simplified example
// in a real-world server there would be route handlers
function requestHandler(req, res) {
  // hydrate!!
  renderer.hydrate({
    html: srcIndexHtml,
    req: req
  }).then(results => {

    // console log any diagnostics
    results.diagnostics.forEach(d => {
      console.log(d.messageText);
    });

    // respond with the hydrated html
    res.end(results.html);
  });
}

// create the server
const server = http.createServer(requestHandler);

// set which port the server will be listening on
const port = 3030;

// start listening and handling requests
server.listen(port, () => console.log(`server-side rendering listening on port: ${ port }`));
```


<stencil-route-link url="/docs/prerendering" router="#router" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/service-workers" custom="true">
  <button class="pull-right btn btn--primary">
    Next
  </button>
</stencil-route-link>
