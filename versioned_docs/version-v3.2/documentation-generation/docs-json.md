---
title: Docs JSON Data Output Target
sidebar_label: JSON Docs (docs-json)
description: JSON Docs
slug: /docs-json
---

# Generating Documentation in JSON format

Stencil supports automatically [generating `README` files](./docs-readme.md) in
your project which pull in [JSDoc comments](https://jsdoc.app/) and provide a
straightforward way to document your components.

If you need more flexibility, Stencil can also write documentation to a JSON
file which you could use for a custom downstream documentation website.

You can try this out is using the `--docs-json` CLI flag like so:

```bash
stencil build --docs-json path/to/docs.json
```

You can also add the `docs-json` output target to your project's configuration
file in order to auto-generate this file every time you build:

```tsx title="stencil.config.ts"
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

The JSON file output by Stencil conforms to the [`JsonDocs` interface in
Stencil's public TypeScript
declarations](https://github.com/ionic-team/stencil/blob/main/src/declarations/stencil-public-docs.ts).


## CSS Variables

Stencil can document CSS variables if you annotate them with JSDoc-style
comments in your CSS/SCSS files. If, for instance, you had a component with a
CSS file like the following:

```css title="src/components/my-button/my-button.css"
:host {
  /**
   * @prop --background: Background of the button
   * @prop --background-activated: Background of the button when activated
   * @prop --background-focused: Background of the button when focused
   */
  --background: pink;
  --background-activated: aqua;
  --background-focused: fuchsia;
}
```

Then you'd get the following in the JSON output:

```json
"styles": [
  {
    "name": "--background",
    "annotation": "prop",
    "docs": "Background of the button"
  },
  {
    "name": "--background-activated",
    "annotation": "prop",
    "docs": "Background of the button when activated"
  },
  {
    "name": "--background-focused",
    "annotation": "prop",
    "docs": "Background of the button when focused"
  }
]
```

:::note
This functionality works with both standard CSS and with Sass, although for the
latter you'll need to have the
[@stencil/sass](https://github.com/ionic-team/stencil-sass) plugin installed
and configured.
:::

## Slots

If one of your Stencil components makes use of
[slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) for
rendering children you can document them by using the `@slot` JSDoc tag in the
component's comment.

For instance, if you had a `my-button` component with a slot you might document
it like so:

```tsx title="src/components/my-button/my-button.tsx"
import { Component, h } from '@stencil/core';

/**
 * @slot buttonContent - Slot for the content of the button
 */
@Component({
  tag: 'my-button',
  styleUrl: 'my-button.css',
  shadow: true,
})
export class MyButton {
  render() {
    return <button><slot name="buttonContent"></slot></button>
  }
}
```

This would show up in the generated JSON file like so:

```json
"slots": {
  "name": "buttonContent",
  "docs": "Slot for the content of the button"
}
```

:::caution
Stencil does not check that the slots you document in a component's JSDoc
comment using the `@slot` tag are actually present in the JSX returned by the
component's `render` function.

It is up to you as the component author to ensure the `@slot` tags on a
component are kept up to date.
:::


## Usage

You can save usage examples for a component in the `usage/` subdirectory within
that component's directory. The content of these files will be added to the
`usage` property of the generated JSON. This allows you to keep examples right
next to the code, making it easy to include them in a documentation site or
other downstream consumer(s) of your docs.

:::caution
Stencil doesn't check that your usage examples are up-to-date! If you make any
changes to your component's API you'll need to remember to update your usage
examples manually.
:::

If, for instance, you had a usage example like this:

````md title="src/components/my-button/usage/my-button-usage.md"
# How to use `my-button`

A button is often a great help in adding interactivity to an app!

You could use it like this:

```html
<my-button>My Button!</my-button>
```
````


You'd get the following in the JSON output under the `"usage"` key:

```json
"usage": {
  "a-usage-example": "# How to use `my-button`\n\nA button is often a great help in adding interactivity to an app!\n\nYou could use it like this:\n\n```html\n<my-button>My Button!</my-button>\n```\n"
}
```


## Custom JSDocs Tags

In addition to reading the [standard JSDoc tags](https://jsdoc.app/), users can
use their own custom tags which will be included in the JSON data without any
configuration.

This can be useful if your team has your own documentation conventions which you'd like to stick with.

If, for example, we had a component with custom JSDoc tags like this:

```tsx
import { Component, h } from '@stencil/core';

/**
 * @customDescription This is just the best button around!
 */
@Component({
  tag: 'my-button',
  styleUrl: 'my-button.css',
  shadow: true,
})
export class MyButton {
  render() {
    return <button><slot name="buttonContent"></slot></button>
  }
}
```

It would end up in the JSON data like this:

```json
"docsTags": [
  {
    "name": "customDescription",
    "text": "This is just the best button around!"
  }
],
```
