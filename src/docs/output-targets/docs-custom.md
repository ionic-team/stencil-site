---
title: Custom Docs Generation
description: Custom Docs Generation
url: /docs/docs-custom
contributors:
  - adamdbradley
  - manucorporat
---

# Custom Docs Generation

Stencil exposes an output target titled `docs-custom` where users can access the generated docs json data. This feature can be used to generate custom markdown or to execute other logic on the json data during the build. As with other docs output targets, `strict` mode is supported.

To make use of this output target, simply add the following to your Stencil configuration.

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'docs-custom',
      generator: (docs: JsonDocs) => {
          // Custom logic goes here
      }
    }
  ]
};
```

## Config

| Property    | Description                                                                              | Default |
|-------------|------------------------------------------------------------------------------------------|---------|
| `generator` | A function with the docs json data as argument.                                          |         |
| `strict`    | If set to true, Stencil will output a warning whenever there is missing documentation.   | `false` |

