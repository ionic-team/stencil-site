# Server Side Rendering

One of the benefits of Stencil is that it enables efficient Server Side Rendering (SSR) easily, without the need to run an expensive headless browser.

Stencil supports Node.js servers out of the box, and the SSR rendering engine is baked right into the `@stencil/core` package.


## Node.js example

```javascript
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var stencil = require('@stencil/core');

// Create the stencil SSR renderer
var renderer = stencil.createRenderer({
  rootDir: path.join(__dirname, './'),
  buildDir: path.join(__dirname, './dist/build/'),
  namespace: 'app',
  logLevel: 'debug'
});

// If you want to use HTML5 style routing in your client, keep the catch-all route handler here,
// otherwise change it to a more specific route
app.get('/*', function (req, res, next) {
  console.log(`serve: ${req.url}`);

  var filePath = path.join(__dirname, 'www/index.html');

  fs.readFile(filePath, 'utf-8', (err, html) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }

    // Render the initial app content through Stencil
    renderer.hydrateToString({
      html: html,
      req: req,
      config: {}
    }, function(err, html) {
      if (err) {
        // Handle the error hydrating
        console.error(err);
        return res.sendStatus(500);
      }

      // Send the hydrated data back
      res.send(html);
    });
  });

});
```
