---
title: Static Site Generation Basics in Stencil
description: Quick introducgion to configuring and using Static Site Generation in Stencil
url: /docs/static-site-generation-basics
contributors:
  - mlynch
---

# Static Site Generation Basics

Rendering components at build time (rather than purely server or client-time), can add significant performance improvements to your app, and maximize SEO impact.

Using Static Site Generation in Stencil requires running a build command, returning promises from component lifecycle methods that fetch dynamic data, and ensuring all known URLs are properly discovered and built.

## Static Build

Stencil doesn't pre-render components by default. However, the build can be made to pre-render using the `--prerender` flag:

```bash
npm run build -- --prerender
```

Under the hood, this runs `stencil build --prerender`.

## Rendering Dynamic Data

Many components need to render based on data fetched from a server. Stencil handles this by allowing components to return `Promise`'s from lifecycle methods like `componentDidLoad` (this can be achieved by using `async/await` as well). 

For example, this is how to have Stencil wait to render a component until it fetches data from the server:

```typescript
async componentWillLoad() {
  const ret = await fetch('https://.../api');

  this.thing = await ret.json();
}
```

## Integration with a Router

Since Stencil will actually navigate to and execute components, it has full support for a router, including Stencil Router.

There are no changes necessary to access route params and matches. However, make sure your routes can accept a trailing slash as pre-rendered static content will be treated as loading an `index.html` file at that path, and so the browser may append a trailing slash.

In particular, if using Stencil Router, double check usage of `exact={true}` which could cause your routes to not match when loaded with a trailing slash.

## Page and URL Discovery

By default, Stencil crawls your app starting at the root component and discovers all paths that need to be indexed. By default this will only discover pages that are linked at build time, but can be easily configured to build any possible URL for the app.

To do this, add a `prerender.config.js` or `.ts` file to the root of your stencil project, and point to it by setting `prerenderConfig` in your `www` output in `stencil.config.ts`, for example:

```typescript
import { Config } from '@stencil/core';

export const config: Config = {
  // ...
  outputTargets: [
    {
      type: 'www',
      prerenderConfig: './prerender.config.js',
      // ...
    },
  ],
  // ...
};
```

Next, inside of the `prerender.config.js`, all urls we wish Stencil to crawl can be specified in the `entryUrls` option:

```javascript
// Get all URLS here, must be synchronous

// For example, if we have all URLs generated in a urls.json file:
const fs = require('fs');
const urls = JSON.parse(fs.readFileSync('urls.json'));

module.exports = {
  entryUrls: urls
}
```

Then Stencil will request and start crawling at each one of these URLs.

## Other Configuration Options

Stencil has a number of other configuration options for pre-rendering. Consult [the source](https://github.com/ionic-team/stencil/blob/253894d3ea154c0471e1345ad79fea3e708121d5/src/declarations/stencil-public-compiler.ts#L498) for more info.