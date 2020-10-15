---
title: SEO Meta Tags in SSG
description: Managing meta tags for SEO and social media embeding in Stencil Static Sites
url: /docs/static-site-generation-meta-tags
contributors:
  - mlynch
  - adamdbradley
---

# SEO Meta Tags and Static Site Generation

Web Apps need to list detailed meta information about content in order to maximize SEO and provide good social media embed experiences.

One of the benefits to Stencil's prerendering is that most DOM apis are available in the NodeJS environment too. For example, to set the document title, simply run `document.title = "Page Title"`. Or meta tags can be added and updated no differently than using the usual DOM APIs found in the browser, such as `document.head` and `document.createElement('meta')`. This mean your components runtime may already be able to do much of the custom work throughout prerendering.

That said, the Prerender Config also comes with many options that allows individual pages to be modified. For example, the `afterHydrate(doument, url)` hook can be used to update the parsed `document`, before it is serialized into an HTML string. The `document` argument can be used no different than the `document` found in a webpage, and the `url` argument is a `URL` location of the page being rendered.

In the example below, the `afterHydrate(doument, url)` hook is setting the document title from url's pathname.

```tsx
import { PrerenderConfig } from '@stencil/core';

export const config: PrerenderConfig = {
  afterHydrate(document, url) {
    document.title = url.pathname;
  }
};
```

## @stencil/helmet

When building a static site with Stencil, managing meta tags dynamically can be made easier by using the `@stencil/helmet` package.

To start, install the package:

```bash
npm install --save-dev @stencil/helmet
```

Then, to update meta tags in the `<head>` of the document, use the `<Helmet>` function component:

```typescript
import Helmet from '@stencil/helmet';

const MyComponent = ({ title, description }: Props) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="..." />
    <meta name="twitter:creator" content="..." />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content="..." />

    <meta property="fb:page_id" content="..." />
    <meta property="og:url" content="..." />
    <meta property="og:type" content="..." />
    <meta property="og:title" content="..." />

    <meta property="og:image" content="..." />
    <meta property="og:description" content="..." />
    <meta property="og:site_name" content="..." />
    <meta property="article:publisher" content="..." />
    <meta property="og:locale" content="..." />
  </Helmet>
)
```

Use this on any component that is visible and the meta tags in `<head>` will be updated.
