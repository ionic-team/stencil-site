---
title: Prerendering
description: Prerendering
url: /docs/prerendering
contributors:
  - adamdbradley
  - ryan3E0
  - dgautsch
---

# Static Site Generation and Prerendering

One of the benefits of Stencil is that it allows for prerendering of your web components, which in the end can be used as a Static Site Generator (SSG). Prerendering generates static HTML files at build time that can then be served to the browser and asynchronously hydrated on the client-side.

For an example of what this looks like, right-click on this very page and hit the View Page Source option of `stenciljs.com/docs/prerendering`. You'll notice this page does not require any external JavaScript or CSS files for the first paint.


### Benefits

- Great [Lighthouse](https://developers.google.com/web/tools/lighthouse/) scores
- Faster time to [first meaningful paint](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)
- Better [SEO](https://support.google.com/webmasters/answer/7451184)
- Provides functionality for users with JavaScript disabled

### Tooling

To be clear, Stencil does _not_ use `Puppeteer` or `jsdom` for prerendering. Puppeteer is great for End-toEnd
testing, but for performance reasons it's not ideal to quickly generate a large website with hundreds or thousands of pages. Additionally, `jsdom` is often used for unit testing, but in our experience it's difficult to use with async components and its global environment nature.

Instead, Stencil uses its own internal DOM APIs which strictly follow the web standards, but optimized for prerendering, Static Site Generation and Serverside Rendering. By doing so, developers can still use all the same APIs they're already familiar with and using, but they'll seemlessly work within a NodeJS environment too. This means developers often do not have to write code differently in how they're building components, but rather they focus only on writing one type of component, and coding it using the standards they already know. To reiterate, developers do not have to learn a new API for prerendering. It's just the same web APIs your components are already using.

Every component, machine and environment will perform differently, so it's difficult to provide benchmark and performance numbers. However, Ionic's Documentation site has hundreds of pages and Stencil is able to prerender the entire site in a few seconds.


## How Prerendering Works

**Build Hydrate App**: The first step in prerendering is for the compiler to generate a "hydrate" app, which is a single directory to be used by Node.js. The "hydrate" app is automatically generated when the `--prerender` CLI flag is provided and by default the app is saved to `dist/hydrate`. Prerendering uses the hydrate app internally, however it can be used directly at a lower-level. [Learn more about the Hydrate App](./hydrate-app).

**Fork Prerender Tasks to Available CPUs**: Stencil can efficiently divide out the prerendering to each of the current machine's CPUs using [Node.js' Child Process API](https://nodejs.org/api/child_process.html). By tasking each CPU on the machine, the compiler can drastically speed up prerendering times.

**Prerender Index**: After the compiler has completed the build and created child processes on each available CPU, it will then kick off the prerendering by starting at the single base URL, or the configured entry URLs. Once the page has finished prerendering it'll be written to the configured `www` directory as an `index.html` file.

**Crawl App**: During each page prerender, Stencil also collects the anchor elements and URLs used within the page. With this information, it's able to inform the main thread of which pages should be prerendered next. The main thread is in charge of orchestrating all of the URLs, and the job is finished once all of the pages have been crawled and prerendered.

**Deploy Static Files to Production**: Now that all of the pages have been prerendered and written as static HTML files, the `www` directory can now be deployed to a server. A significant difference from prerendering and Serverside Rendering (SSR), is that the HTTP server is just serving up static HTML files rather than dynamically generating the HTML on the server.

**Static HTML Response**: With the static HTML files deploy to a server, visitors of each prerendered page first receive the HTML with inline styles, and no blocking JS or CSS. Additionally, the compiler is already aware of the exact modules the visitor will need for this page, and will asynchronously preload the modules using [link `modulepreload`](https://html.spec.whatwg.org/multipage/links.html#link-type-modulepreload).

**Client-side Hydration**: After the HTML and inlined styles have rendered the first paint, the next step is for the same nodes within the DOM to be hydrated by the client-side JavaScript. Each component within the page will asynchronously hydrate using the initial order they were found in the DOM structure. Next, as each component lazily hydrates they're able to reuse the existing nodes found in the DOM.


## Enabling Prerender Builds

By default, dev and prod builds do not perform prerendering since not all projects require it. It's best to setup only production build command to have the `--prerender` flag so it doesn't slow down your development times. To enable prerendering simply add the `--prerender` CLI flag:

```bash
stencil build --prerender
```



## Prerender Config for Static Site Generation (SSG)

As of `1.13.0`, the optional prerender config can be used while prerendering a `www` output target.
The `prerender.config.ts` file can be used to further customize each prerendered page.

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

The `prerender.config.ts` should export a `config` object using the `PrerenderConfig` interface.

```tsx
import { PrerenderConfig } from '@stencil/core';
export const config: PrerenderConfig = {
  ...
};
```


## Updating Meta tags, Title and the `document`

One of the benefits to Stencil's prerendering is that most DOM apis are available in the NodeJS environment too. For example, to set the document title, simply all `document.title = "Page Title";`. Or to add a meta tags can be added and edited no differently than using the usual DOM APIs. This mean your components may already be able to do much of the custom work throughout prerendering.

That said, the Prerender Config comes with many options that allows the pages to be modified. For example, the `afterHydrate(doument)` hook can be used to update the document, before it is serialized into an HTML string. The `document` argument this hook receives is no different than the `document` found in a webpage.


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

## Tips for Debugging Prerendering

The `stencil build --prerender` command will first build the hydrate script for a NodeJS environment, then prerender the site using the build. For a production build this is probably ideal. However, while debugging you may not need to keep rebuilding the hydrate script, but you only need to debug through the prerendering process. To only prerender (and avoid rebuilding), you can use the `stencil prerender /path/to/dist/hydrate/index.js` command, with the path to the script as a flag.

By default, prerendering will prerender the homepage, find links within the homepage, and continue to crawl the entire site as it finds more links. While debugging, it might be easier to _not_ crawl every URL in the site, but rather have it only prerender one page. To disable crawling, set the prerender config `crawlUrls` to false. Next, you can use the `entryUrls` config to provide an array of paths to prerender, rather than starting at the homepage. Additionally, console logs that are printed within the runtime are surpressed while prerendering (otherwise the terminal would be overloaded with logs). By setting `runtimeLogging` to `true`, the runtime console logs will be printed in the terminal. Below is an example setup for prerender debugging:

```tsx
import { PrerenderConfig } from '@stencil/core';
export const config: PrerenderConfig = {
  // ideal for debugging purposes
  crawlUrls: false,
  entryUrls: ['/only-url-i-want-to-prerender'],
  runtimeLogging: true
};
```
