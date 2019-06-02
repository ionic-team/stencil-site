---
title: Docs Readme Auto-Generation
description: Docs Readme Auto-Generation
url: /docs/docs-readme
contributors:
  - adamdbradley
  - snaptopixel
  - manucorporat
  - amwmedia
  - mrtnmgs
  - marcjulian
---

# Docs Readme Markdown File Auto-Generation

Stencil is able to auto-generate `readme.md` files in markdown. This is an opt-in feature and will save the readme files as a sibling to the component within the same directory. When this feature is used it can be useful for others to easily find and read formatted docs about one component. In particular, when a `readme.md` file is placed within a directory on Github, it will default the readme markdown file as the primary content of the page.

To auto-generate readme files, add the `docs-readme` output target to your `stencil.config.ts`:

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    { type: 'docs-readme' }
  ]
};
```

Another option would be to add the flag `--docs-readme`, such as:

```bash
stencil build --docs-readme
```

### Adding Custom Markdown to Auto-Generated Files

Once you've generated a `readme.md` file you can customize it with your own markdown content. Simply add your own markdown above the comment that reads: `<!-- Auto Generated Below -->`.
