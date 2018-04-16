# Server Side Rendering

One of the benefits of Stencil is that it enables efficient Server Side Rendering (SSR) easily, without the need to run an expensive headless browser. Additionally, before deciding to render each page on-demand on a server, it may best to look into using [prerendering](/docs/prerendering) instead.

Stencil supports Node.js servers out of the box, and the SSR rendering engine is baked right into the `@stencil/core` package. To see a full example, please take a look at the [Stencil SSR Starter](https://github.com/ionic-team/stencil-ssr-starter).


## Stencil SSR Express Middleware

Easiest way to run SSR is to use the Express Middleware:

```javascript
const express = require('express');
const stencil = require('@stencil/core/server');

// create the express app
const app = express();

// set which port express it will be using
const port = 3030;

// load the stencil config
const config = stencil.loadConfig(__dirname);

// serve-side render html pages
app.use(stencil.ssrPathRegex, stencil.ssrMiddleware({ config }));

// serve all static files from www directory
app.use(express.static(config.wwwDir));

// start the server
app.listen(port, () => config.logger.info(`server started at http://localhost:${ port }`));

```


## Node.js Example

```javascript
const express = require('express');
const fs = require('fs');
const stencil = require('@stencil/core/server');

// load the config
const config = stencil.loadConfig(__dirname);

// ensure prerender flag is set to config
config.flags = Object.assign({}, config.flags, { prerender: true });

// create the renderer
const renderer = new stencil.Renderer(config);

let srcIndexHtml: string;
try {
  // load the source index.html
  srcIndexHtml = fs.readFileSync(config.srcIndexHtml, 'utf-8');

} catch (e) {
  console.error(`error loading srcIndexHtml: ${e}`);
}

return function(req: any, res: any) {

  // hydrate level 4, please!
  renderer.hydrate({
    html: srcIndexHtml,
    req: req
  }).then(results => {

    // console log any diagnostics
    results.diagnostics.forEach(d => {
      console.log(d.messageText);
    });

    // respond with the hydrated html
    res.send(results.html);
  });
};
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
