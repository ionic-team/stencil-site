---
title: Docs Readme Auto-Generation
sidebar_label: README Docs (docs-readme)
description: README Docs
slug: /docs-readme
---

# Docs Readme Markdown File Auto-Generation

Stencil is able to auto-generate `readme.md` files in markdown. This opt-in
feature will save the readme files as a sibling to the component within the
same directory. This can help you to maintain consistently formatted
documentation for your components which live right next to them and render in
GitHub.

To auto-generate readme files, add the `docs-readme` output target to your
`stencil.config.ts` like so:

```tsx title="stencil.config.ts"
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
files using the [`docs-readme`](https://stenciljs.com/docs/docs-readme) output
target.

:::note
If you use the `--docs` flag and don't add the `docs-readme` output target to
your Stencil configuration your documentation won't be automatically updated
when you build your project and could get out of date.
:::

## Adding Custom Markdown to Auto-Generated Files

Once you've generated a `readme.md` file you can customize it with your own
markdown content. Simply add your own markdown above the comment that reads:
`<!-- Auto Generated Below -->`.

## Custom Footer

Removing or customizing the footer can be done by adding a `footer` property to
the output target. This string is added to the generated Markdown files without
modification, so you can use Markdown syntax in it for rich formatting.

```tsx title="stencil.config.ts"
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

By default, a readme file will be generated in the same directory as the
component is corresponds to. This behavior can be changed by setting the `dir`
property on the output target configuration. Specifying a directory will create
the structure `{dir}/{component}/readme.md`.

```tsx title="stencil.config.ts"
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

Adding `strict: true` to the output target configuration will cause Stencil to
output a warning whenever the project is built with missing documentation.

```tsx title="stencil.config.ts"
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
