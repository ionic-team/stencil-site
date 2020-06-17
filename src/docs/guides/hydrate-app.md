---
title: Hydrate App
description: Hydrate App
url: /docs/hydrate-app
contributors:
  - adamdbradley
  - dgautsch
  - bitflower
---

# Hydrate App

The hydrate app is a bundle of your same components, but compiled so they can be hydrated on a NodeJS server, and generate HTML. This is the same NodeJS app which prerendering uses internally, and the same one which Angular Universal SSR uses for Ionic. Like Stencil components, the hydrate app itself is not restricted to one framework.

_Note that Stencil does **NOT** use Puppeteer for SSR or prerendering._

## How to Use the Hydrate App

Server side rendering (SSR) can be accomplished in a similar way to prerendering. Instead of using the `--prerender` CLI flag, you can add `{ type: 'dist-hydrate-script' }` to your `stencil.config.js`. This will generate a `hydrate` app in your root project directory that can be imported and used by your Node server.

After publishing your component library, you can import the hydrate app into your server's code like this:

```javascript
import { hydrateDocument } from 'yourpackage/hydrate';
```

The app comes with two functions, `hydrateDocument` and `renderToString`. An advantage to `hydrateDocument` is that it can take an existing [document](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDocument) which was already parsed. The `renderToString` function instead inputs a raw html string, and does the parsing to a document.

**hydrateDocument**: You can use `hydrateDocument` as a part of your server's response logic before serving the web page. `hydrateDocument` takes two arguments, a [document](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDocument) and a config object. The function returns a promise with the hydrated results. The resulting html can be parsed from the `html` property in the returned results.

*Example taken from Ionic Angular server*

 ```javascript
import { hydrateDocument } from 'yourpackage/hydrate';

export function hydrateComponents(doc) {
  return hydrateDocument(doc)
    .then((hydrateResults) => {
      // execute logic based on results
      console.log(hydrateResults.html);
      return hydrateResults;
    });
}
```

#### hydrateDocument Options
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

**renderToString**: The hydrate app also has a `renderToString` function that allows you to pass in an html string that also returns a promise of `HydrateResults`. The second parameter is a config object that can alter the output of the markup. Like `hydrateDocument`, the resulting string can be parsed from the `html` property.

*Example taken from Ionic Core*

```javascript
const results = await hydrate.renderToString(srcHtml, {
  prettyHtml: true,
  removeScripts: true
});

console.log(results.html);
```

#### renderToString Options

  - `approximateLineWidth` - number
  - `prettyHtml` - boolean
  - `removeAttributeQuotes` - boolean
  - `removeBooleanAttributeQuotes` - boolean
  - `removeEmptyAttributes` - boolean
  - `removeHtmlComments` - boolean
  - `afterHydrate` - boolean
  - `beforeHydrate` - boolean
