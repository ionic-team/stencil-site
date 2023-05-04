---
title: Docs Readme Auto-Generation
sidebar_label: README Docs (docs-readme)
description: README Docs
slug: /docs-readme
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

Another option would be to use the `--docs` CLI flag, like so:

```bash
stencil build --docs
```

This will cause the Stencil compiler to perform a one-time generation of README
files using the [`docs-readme`](https://stenciljs.com/docs/docs-readme) output target.
## Adding Custom Markdown to Auto-Generated Files

Once you've generated a `readme.md` file you can customize it with your own markdown content. Simply add your own markdown above the comment that reads: `<!-- Auto Generated Below -->`.

## Custom Footer

Removing or customizing the footer can be done by adding a `footer` property to the output target. Markdown can be used to enhance the footer if needed.

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    { 
      type: 'docs-readme',
      footer: '*Built with love!*',
    }
  ]
};
```

## Generating to a Directory

By default, a readme file will be generated in its corresponding component directory. This behavior can be changed through the `dir` property of the output target configuration. Specifying a directory will create the structure `{dir}/{component}/readme.md`.

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    { 
      type: 'docs-readme',
      dir: 'output'
    }
  ]
};
```

## Strict Mode

Adding `strict: true` to the output target configuration will cause Stencil to output a warning whenever the project is built with missing documentation.

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    { 
      type: 'docs-readme',
      strict: true
    }
  ]
};
```
