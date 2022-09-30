---
title: Stencil Output Targets
description: Stencil Output Targets
url: /docs/output-targets
contributors:
  - adamdbradley
  - manucorporat
  - rwaskiewicz
---

# Output Targets

One of the more powerful features of the compiler is its ability to generate various builds depending on _"how"_ the components are going to be used. Stencil is able to take an app's source and compile it to numerous targets, such as a webapp to be deployed on an http server, as a third-party component lazy-loaded library to be distributed on [npm](https://www.npmjs.com/), or a vanilla custom elements bundle. By default, Stencil apps have an output target type of `www`, which is best suited for a webapp.


## Output Target Types:

Stencil offers the following output targets:
 - [`dist`: Distribution](/docs/distribution)
 - [`www`: Website](/docs/www)
 - [`dist-custom-elements`: Custom Elements](/docs/custom-elements)
 - [`dist-custom-elements-bundle`: Custom Elements Bundle](/docs/custom-elements-bundle)
 - [`stats`: Stats about the compiled files](/docs/stats)

Users can also take advantage of special output targets to generate documentation for their components.
For more information, please see the [`Documentation Generation section`](/docs/overview)

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

Note: [buildEs5](/docs/config#buildes5) must be set to true to generate the IE11 ES5 file 

```markup
<script type="module" src="/build/app.esm.js"></script>
<script nomodule src="/build/app.js"></script>
```
