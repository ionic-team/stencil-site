---
title: SEO Meta Tags in SSG
description: Managing meta tags for SEO and social media embedding in Stencil Static Sites
url: /docs/static-site-generation-meta-tags
contributors:
  - mlynch
  - adamdbradley
  - rwaskiewicz
---

# SEO Meta Tags and Static Site Generation

Web Apps need to list detailed meta information about content in order to maximize SEO and provide good social media embed experiences.

One of the benefits to Stencil's prerendering is that most DOM apis are available in the NodeJS environment too. For example, to set the document title, simply run `document.title = "Page Title"`. Or meta tags can be added and updated no differently than using the usual DOM APIs found in the browser, such as `document.head` and `document.createElement('meta')`. This mean your components runtime may already be able to do much of the custom work throughout prerendering.

That said, the Prerender Config also comes with many options that allows individual pages to be modified. For example, the `afterHydrate(document, url)` hook can be used to update the parsed `document`, before it is serialized into an HTML string. The `document` argument can be used no different than the `document` found in a webpage, and the `url` argument is a `URL` location of the page being rendered.

In the example below, the `afterHydrate(document, url)` hook is setting the document title from url's pathname.

```tsx
import { PrerenderConfig } from '@stencil/core';

export const config: PrerenderConfig = {
  afterHydrate(document, url) {
    document.title = url.pathname;
  }
};
```

## @stencil/helmet

The `@stencil/helmet` package was a library for managing meta tags dynamically.
It has since been deprecated.
For additional information regarding this package, please see its [GitHub page](https://github.com/ionic-team/stencil-helmet) 
