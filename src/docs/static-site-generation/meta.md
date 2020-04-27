---
title: SEO Meta Tags in SSG
description: Managing meta tags for SEO and social media embeding in Stencil Static Sites
url: /docs/static-site-generation-meta-tags
contributors:
  - mlynch
---

# SEO Meta Tags and Static Site Generation

Web Apps need to list detailed meta information about content in order to maximize SEO and provide good social media embed experiences.

When building a static site with Stencil, managing meta tags dynamically is easy using the `@stencil/helmet` package.

To start, install the package:

```
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

Use this on any component that is visible and the meta tags in head will be updated.