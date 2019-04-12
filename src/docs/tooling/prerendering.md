---
title: Prerendering
description: Prerendering
url: /docs/prerendering
contributors:
  - adamdbradley
---

# Prerendering

One of the benefits of Stencil is that it allows for prerendering of your web components. Prerendering generates static html+css files at build time that can then be served to the browser and hydrated with your actual web components on the fly. For an example of what this looks like, right click on this page and hit the view source button.

Prerendering is built into the Stencil compiler itself and by default our [app starter](https://github.com/ionic-team/stencil-app-starter) has it turned on for production builds.

## Benefits

- Faster time to [first meaningful paint](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)
- Better SEO
- Still provides some functionality for users with JavaScript disabled


## Things to watch for

- Data that you are fetching from an api should not be prerendered as this data is dynamic and is going to change.

Stencil provides a `Build.isServer` build conditional to tell prerendering to skip code. Here is an example of how to use this utility:

```tsx
import { Build } from '@stencil/core';

componentWillLoad() {
  // Build.isServer is false when running in the browser
  // and true when being prerendered

  if (Build.isServer) {
    ...
  }
}
```
