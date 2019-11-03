---
title: Prerendering
description: Prerendering
url: /docs/prerendering
contributors:
  - adamdbradley
  - ryan3E0
---

# Prerendering

One of the benefits of Stencil is that it allows for prerendering of your web components. Prerendering generates static HTML files at build time that can then be served to the browser and asynchronously hydrated on the client-side.

For an example of what this looks like, right-click on this page and hit the View Page Source option. You'll notice this page does not require any external JavaScript or CSS files for the first paint.


## Benefits

- Great [Lighthouse](https://developers.google.com/web/tools/lighthouse/) scores
- Faster time to [first meaningful paint](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)
- Better [SEO](https://support.google.com/webmasters/answer/7451184)
- Provides functionality for users with JavaScript disabled


## Enabling Prerender Builds

By default, dev and prod builds do not perform prerendering since not all projects require it. During prod builds, to enable prerendering simply add the `--prerender` CLI flag:

```bash
stencil build --prerender
```


## How Prerendering Works

**Build Hydrate App**: The first step in prerendering is for the compiler to generate a "hydrate" app, which is a single directory to be used by Node.js. The "hydrate" app is automatically generated when the `--prerender` CLI flag is provided and by default the app is saved to `dist/hydrate`.

**Fork Prerender Tasks to Available CPUs**: Stencil can efficiently divide out the prerendering to each of the current machine's CPUs using [Node.js' Child Process API](https://nodejs.org/api/child_process.html). By tasking each CPU on the machine, the compiler can drastically speed up prerendering times.

**Prerender Index**: After the compiler has completed the build and created child processes on each available CPU, it will then kick off the prerendering by starting at the single base URL, or the configured entry URLs. Once the page has finished prerendering it'll be written to the configured `www` directory as an `index.html` file.

**Crawl App**: During each page prerender, Stencil also collects the anchor elements and URLs used within the page. With this information, it's able to inform the main thread of which pages should be prerendered next. The main thread is in charge of orchestrating all of the URLs, and the job is finished once all of the pages have been crawled and prerendered.

**Deploy Static Files to Production**: Now that all of the pages have been prerendered and written as static HTML files, the `www` directory can now be deployed to a server. A significant difference from prerendering and Serverside Rendering (SSR), is that the HTTP server is just serving up static HTML files rather than dynamically generating the HTML on the server.

**Static HTML Response**: With the static HTML files deploy to a server, visitors of each prerendered page first receive the HTML with inline styles, and no blocking JS or CSS. Additionally, the compiler is already aware of the exact modules the visitor will need for this page, and will asynchronously preload the modules using [link `modulepreload`](https://html.spec.whatwg.org/multipage/links.html#link-type-modulepreload).

**Client-side Hydration**: After the HTML and inlined styles have rendered the first paint, the next step is for the same nodes within the DOM to be hydrated by the client-side JavaScript. Each component within the page will asynchronously hydrate using the initial order they were found in the DOM structure. Next, as each component lazily hydrates they're able to reuse the existing nodes found in the DOM.

## How to Use the Hydrate App

Server side rendering (SSR) can be accomplished in a similar way to prerendering. Instead of using the `--prerender` CLI flag, you can add `{ type: 'dist-hydrate-script' }` to your `stencil.config.js`. This will generate a `hydrate` app in your root project directory that can be imported and used by your Node server.

After publishing your component library, you can import the hydrate app into your server's code like this:

```javascript
import { hydrateDocument } from 'yourpackage/hydrate';
```

The app comes with two methods, `hydrateDocument` and `renderToString`.

**hydrateDocument**: You can use `hydrateDocument` as a part of your server's response logic before serving the web page. `hydrateDocument` takes two arguments, a document and a config object. The function returns a promise with the hydrated results. The resulting html can be parsed from the `html` property in the returned results.

*Example taken from Ionic Angular server*

 ```javascript
import { hydrateDocument } from 'yourpackage/hydrate';

export function hydrateComponents(doc) {
  return () => {
    return hydrateDocument(doc)
      .then((hydrateResults) => {
        // execute logic based on results
        console.log(hydrateResults.html);
        return hydrateResults;
      });
  }
}
```

#### Configuration Options
  - `canonicalUrl` - string
  - `constrainTimeouts` - boolean
  - `clientHydrateAnnotations` - boolean
  - `cookie` - string
  - `direction` - string
  - `language` - string
  - `maxHydrateCount` - number
  - `referrer` - string
  - `removeScripts` - boolean
  - `removeUnusedStyles` - boolean
  - `resourcesUrl` - string
  - `timeout` - number
  - `title` - string
  - `url` - string
  - `userAgent` - string

**renderToString**: The hydrate app also has a `renderToString` method that allows you to pass in an html string that also returns a promise of `HydrateResults`. The second parameter is a config object that can alter the output of the markup. Like `hydrateDocument`, the resulting string can be parsed from the `html` property.

*Exampe taken from Ionic Core*

```javascript
const results = await hydrate.renderToString(srcHtml, {
  prettyHtml: true,
  removeScripts: true
});

console.log(results.html);
```

#### Configuration Options

  - `approximateLineWidth` - number
  - `prettyHtml` - boolean
  - `removeAttributeQuotes` - boolean
  - `removeBooleanAttributeQuotes` - boolean
  - `removeEmptyAttributes` - boolean
  - `removeHtmlComments` - boolean
  - `afterHydrate` - boolean
  - `beforeHydrate` - boolean

## Things to Watch For

- Data that you are fetching from an API should not be prerendered as this data is dynamic and is going to change.

Stencil provides a `Build.isBrowser` build conditional to tell prerendering to skip code. Here is an example of how to use this utility:

```tsx
import { Build } from '@stencil/core';

connectedCallback() {
  // Build.isBrowser is true when running in the
  // browser and false when being prerendered

  if (Build.isBrowser) {
    console.log('running in browser');
  } else {
    console.log('running in node while prerendering');
  }
}
```
