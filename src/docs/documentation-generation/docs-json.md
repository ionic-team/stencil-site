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

# JSON Docs Generation

There may be scenarios where it'd be better to get all the docs in the form of JSON.

## Enabling

To generate JSON documentation, add the `docs-json` output target to the `stencil.config.ts` in order to auto-generate this file with every build:

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
where `file` is the name & location of the file to be generated.

To generate the JSON file, have Stencil build your project.

Another option would be use the `--docs-json` flag, followed by a path on where to write the json file:

```bash
stencil build --docs-json path/to/docs.json
```

Check out the typescript declarations for the JSON output: https://github.com/ionic-team/stencil/blob/main/src/declarations/stencil-public-docs.ts
