---
title: Stencil Output Targets
sidebar_label: Overview
description: Stencil Output Targets
slug: /output-targets
---

# Output Targets

One of the more powerful features of the compiler is its ability to generate various builds depending on _"how"_ the components are going to be used. Stencil is able to take an app's source and compile it to numerous targets, such as a webapp to be deployed on an http server, as a third-party component lazy-loaded library to be distributed on [npm](https://www.npmjs.com/), or a vanilla custom elements bundle. By default, Stencil apps have an output target type of `www`, which is best suited for a webapp.


## Output Target Types:
 - [`dist`: Distribution](./dist.md)
 - [`www`: Website](./www.md)
 - [`dist-custom-elements`: Custom Elements](./custom-elements.md)
 - [`stats`: Stats about the compiled files](./docs-stats.md)
 - [`docs-readme`: Documentation readme files formatted in markdown](./docs-readme.md)
 - [`docs-json`: Documentation data formatted in JSON](./docs-json.md)
 - [`docs-custom`: Custom documentation generation](./docs-custom.md)
 - [`docs-vscode`: Documentation generation for VS Code](./docs-vscode.md)

## Example:

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www'
    }
  ]
};
```


## Differential Bundling

It's also important to note that the compiler will automatically generate the numerous bundles in order to support "differential bundling". What this means is that during production builds, Stencil will generate code for both modern browsers, and legacy browsers (IE11) from the same source code. The advantage of differential bundling is that modern browsers can avoid all the polyfills and bloated legacy JavaScript, and use the modern APIs already baked into the browser.

In the example below there are two script tags, however, only one of them will be requested by the user. For IE11 users, they'll download the `app.js` file which is in the `ES5` syntax and has all the polyfills. For users on modern browsers, they will only download the `app.esm.js` file which uses up-to-date JavaScript features such as [ES modules](https://developers.google.com/web/fundamentals/primers/modules), [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Import), [async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await), [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), etc.

:::note
[buildEs5](../config/01-overview.md#buildes5) must be set to true to generate the IE11 ES5 file 
:::

```markup
<script type="module" src="/build/app.esm.js"></script>
<script nomodule src="/build/app.js"></script>
```

:::info
As of Stencil v3, legacy browser support is deprecated, and will be removed in a future major version of Stencil.
:::


## Docs Auto-Generation

As apps scale with more and more components, and team size and members continue to adjust over time, it's vital all components are well documented, and that the documentation itself is maintained. Maintaining documentation is right up there with some of the least interesting things developers must do, but that doesn't mean it can't be made easier.

Throughout the build process, the compiler is able to extract documentation from each component, to include JSDocs comments, types of each member on the component (thanks TypeScript!) and CSS Variables (CSS Custom Properties).


### Component Property Docs Example:

To add a description to a `@Prop`, simply add a comment on the previous line:

```tsx
/** (optional) The icon to display */
@Prop() iconType = "";
```

### CSS Example:

Stencil will also document CSS variables when you specify them via jsdoc-style comments inside your css or scss files:

```css
 :root {
   /**
    * @prop --primary: Primary header color.
    */
   --primary: blue;
 }
```
