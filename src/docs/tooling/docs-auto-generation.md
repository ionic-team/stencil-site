---
title: Docs Auto-Generation
description: Docs Auto-Generation
url: /docs/docs-auto-generation
contributors:
    - adamdbradley
    - snaptopixel
    - manucorporat
---

# Docs Auto-Generation

As apps scale with more and more components, and team size and members continue to adjust over time, it's vital all components are well documented, and that the documentation itself is maintained. Maintaining documentation is right up there for some of the least interesting things developers must do, but that doesn't mean it can't be made easier.

Throughout the build process, the compiler is able to extract documentation from each component, to include JSDocs comments and types of each member on the component (thanks TypeScript!).

## Readme Markdown Files

Stencil is able to auto-generate `readme.md` files in markdown. This is an opt-in feature and will save the readme files as a sibling to the component within the same directory. When this feature is used it can be useful for others to easily find and read formatted docs about one component. In particular, when a `readme.md` file is placed within a directory on Github, it will default the readme markdown file as the primary content of the page.

To auto-generate readme files, add the `docs` output target to your `stencil.config.ts`:

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
    outputTargets: [+{ type: 'docs' }]
};
```

Another option would be to add the flag `--docs`, such as:

```bash
stencil build --docs
```

### Adding Custom Markdown to Auto-Generated Files

Once you've generated a `readme.md` file you can customize it with your own markdown content. Simply add your own markdown above the comment that reads: `<!-- Auto Generated Below -->`.

## Docs Json Data

While auto-generated readme files formatted with markdown is convenient, there may be scenarios it'd be getter to get all of the docs in the form of json data. To build the docs as json, use the `--docs-json` flag, followed by a path on where to write the json file.

```tsx
  scripts: {
    "docs.data": "stencil build --docs-json path/to/docs.json"
  }
```

Another option would be to add the `docs-json` output target to the `stencil.config.ts` in order to auto-generate this file with every build:

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
    outputTargets: [+{ type: 'docs-json' }]
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

## Static HTML pages

[Compodoc](https://compodoc.app/) is a documentation tool for Angular, Nest and Stencil projects. By parsing your source files, it can detect all your properties, methods, decorators and generate a clean static documentation of all your components.

![doc-stencil-beer-example](../assets/img/doc-stencil-beer-example.jpg)

You can generate your documentation in two steps, first install Compodoc :

```bash
npm i -D @compodoc/compodoc
```

and after, add a new script entry in your package.json

```json
"doc:render": "npx compodoc -p tsconfig.json -s"
```

and run it in your terminal

```bash
npm run doc:render
```
