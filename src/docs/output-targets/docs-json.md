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
  - seanwuapps
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
    {
      type: 'docs-json',
      file: 'path/to/docs.json'
    }
  ]
};
```

Check out the typescript declarations for the JSON output: https://github.com/ionic-team/stencil/blob/master/src/declarations/stencil-public-docs.ts


## CSS Variables

Stencil will also document CSS variables when you specify them via jsdoc-style comments inside your css/scss files:

```css
/**
 * @prop --background: Background of the button
 * @prop --background-activated: Background of the button when activated
 * @prop --background-focused: Background of the button when focused
 */
```


## Slots

Slots can be documented by adding `@slot` tags to the doc comments above the component decorator.

```tsx
/**
 * @slot slotName - slotDescription
 * @slot buttonContent - Slot for the content of the button
 */
```


## Usage

The content of `.md` files in a `usage` subdirectory of a component will be added to the `usage` property of the generated json.

```bash
src/
  components/
    my-component/
      usage/
        usage-example.md
        another-example.md
      my-component.css
      my-component.tsx
```


## Custom JSDocs Tags

In addition to reading the predefined JSDoc tags, users can provide their own custom tags which also get included in the JSON data. This makes it easier for teams to provide their own documentation and conventions to get built within the JSON data. For example, if we added a comment into our source code like this:

```tsx
/**
 * @myDocTag someName - some value
 * @myOtherDocTag someOtherName - some other name
 */
```

It would end up in the JSON data like this:

```tsx
"docsTags": [
  {
    "text": "someName - some value",
    "name": "myDocTag"
  },
  {
    "text": "someOtherName - some other name",
    "name": "myOtherDocTag"
  }
],
```
