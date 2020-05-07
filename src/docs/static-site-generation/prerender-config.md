---
title: Prerender Config
description: Prerender Config
url: /docs/prerender-config
contributors:
  - adamdbradley
  - ryan3E0
  - dgautsch
---


## Prerender Config for Static Site Generation (SSG)

As of `1.13.0`, the optional prerender config can be used while prerendering a `www` output target. The `prerender.config.ts` file can further update the parsed document of each page, before it is serialized to HTML.

Within `stencil.config.ts`, set the path to the prerendering config file path using the `prerenderConfig`
property, such as:

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      baseUrl: 'https://stenciljs.com/',
      prerenderConfig: './prerender.config.ts',
    }
  ]
};
```

Next, inside of the `prerender.config.ts` file, it should export a `config` object using the `PrerenderConfig` interface.

```tsx
import { PrerenderConfig } from '@stencil/core';
export const config: PrerenderConfig = {
  ...
};
```

| Config | Description | Default |
|--------|-------------|---------|
| `afterHydrate(document, url)` | Run after each `document` is hydrated, but before it is serialized into an HTML string. Hook is passed the `document` and its `URL`. |  |
| `beforeHydrate(document, url)` | Run before each `document` is hydrated. Hook is passed the `document` it's `URL`. |  |
| `afterSerializeTemplate(html)` | Runs after the template Document object has serialize into an HTML formatted string. Returns an HTML string to be used as the base template for all prerendered pages. |  |
| `beforeSerializeTemplate(document)` | Runs before the template Document object is serialize into an HTML formatted string. Returns the Document to be serialized which will become the base template html for all prerendered pages. |  |
| `canonicalUrl(url)` | A hook to be used to generate the canonical `<link>` tag which goes in the `<head>` of every prerendered page. Returning `null` will not add a canonical url tag to the page. |  |
| `crawlUrls` | While prerendering, crawl same-origin URLs found within `<a href>` elements. | `true` |
| `entryUrls` | URLs to start the prerendering from. By default the root URL of `/` is used. | `['/']` |
| `filterAnchor(attrs, base)` | Return `true` the given `<a>` element should be crawled or not. |  |
| `filterUrl(url, base)` | Return `true` if the given URL should be prerendered or not. |  |
| `filePath(url, filePath)` | Returns the file path which the prerendered HTML content should be written to. |  |
| `hydrateOptions(url)` | Returns the hydrate options to use for each individual prerendered page. |  |
| `loadTemplate(filePath)` | Returns the template file's content. The template is the base HTML used for all prerendered pages. |  |
| `normalizeUrl(href, base)` | Used to normalize the page's URL from a given a string and the current page's base URL. Largely used when reading an anchor's `href` attribute value and normalizing it into a `URL`. |  |
| `staticSite` | Static Site Generated (SSG). Does not include Stencil's clientside JavaScript, custom elements or preload modules. | `false` |
| `trailingSlash` | If the prerenndered URLs should have a trailing "/"" or not | `false` |
