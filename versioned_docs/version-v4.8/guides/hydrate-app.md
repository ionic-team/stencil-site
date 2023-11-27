---
title: Hydrate App
sidebar_label: Hydrate App
description: Hydrate App
slug: /hydrate-app
---

# Hydrate App

The hydrate app is a Stencil output target which generates a module that can be
used on a NodeJS server to hydrate HTML and implement server side rendering (SSR).
This functionality is used internally by the Stencil compiler for
prerendering, as well as for the Angular Universal SSR for the Ionic
framework. However, like Stencil components, the hydrate app itself is not
restricted to one framework.

_Note that Stencil does **NOT** use Puppeteer for SSR or prerendering._

## How to Use the Hydrate App

Server side rendering (SSR) can be accomplished in a similar way to
prerendering. Instead of using the `--prerender` CLI flag, you can an output
target of type `'dist-hydrate-script'` to your `stencil.config.ts`, like so:

```ts
outputTargets: [
  {
    type: 'dist-hydrate-script',
  },
];
```

This will generate a `hydrate` app in your root project directory that can be
imported and used by your Node server.

After publishing your component library, you can import the hydrate app into
your server's code like this:

```javascript
import { hydrateDocument } from 'yourpackage/hydrate';
```

The hydrate app module exports two functions, `hydrateDocument` and
`renderToString`. `hydrateDocument` takes a
[document](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDocument) as
its input while `renderToString` takes a raw HTML string. Both functions return
a Promise which wraps a result object.

### hydrateDocument

You can use `hydrateDocument` as a part of your server's response logic before
serving the web page. `hydrateDocument` takes two arguments, a
[document](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDocument) and a
config object. The function returns a promise with the hydrated results, with
the hydrated HTML under the `html` property.

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

### renderToString

The hydrate app also has a `renderToString` function that takes an HTML string
and returns a promise of `HydrateResults`. The optional second parameter is a
config object that can alter the output of the markup. Like `hydrateDocument`,
the hydrated HTML can be found under the `html` property.

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
