---
title: Docs JSON Data Output Target
description: Docs JSON Output Target
url: /docs/docs-json
contributors:
  - adamdbradley
  - snaptopixel
  - manucorporat
  - amwmedia
  - mrtnmgs
  - marcjulian
---

# Docs Json Data

While auto-generated readme files formatted with markdown is convenient, there may be scenarios where it'd be better to get all of the docs in the form of json data. To build the docs as json, use the `--docs-json` flag, followed by a path on where to write the json file.

```tsx
  scripts: {
    "docs.data": "stencil build --docs-json path/to/docs.json"
  }
```

Another option would be to add the `docs-json` output target to the `stencil.config.ts` in order to auto-generate this file with every build:

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    { type: 'docs-json' }
  ]
};
```

Check out the typescript declarations for the JSON output: https://github.com/ionic-team/stencil/blob/master/src/declarations/docs.ts


## Documenting CSS Variables

Stencil will also document CSS variables when you specify them via jsdoc-style comments inside your css/scss files:

```css
/**
 * @prop --background: Background of the button
 * @prop --background-activated: Background of the button when activated
 * @prop --background-focused: Background of the button when focused
 */
```
