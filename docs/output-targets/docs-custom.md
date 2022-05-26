---
title: Custom Docs Generation
sidebar_label: docs-custom
description: Custom Docs Generation
slug: /docs-custom
contributors:
  - adamdbradley
  - manucorporat
  - arayik-yervandyan
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



# Custom Docs Data Model

The generated docs JSON data will in the type of `JsonDocs` which consists of main `components` array which consists of components that stencil core found and meta information such as `timestamp` and `compiler`

## JsonDocs

| Property    | Description                                                                              |
|-------------|------------------------------------------------------------------------------------------|
| `components` | Array with type of `JsonDocsComponent[]` which consists component information|
| `timestamp`    | `string` with timestamp   |
| `compiler`    | `Object` with `typescriptVersion`, `compiler`, and `version`   |

## JsonDocsComponent

| Property    | Description                                                                              |
|-------------|------------------------------------------------------------------------------------------|
| `dirPath` | Component directory path |
| `fileName`    | File name |
| `filePath`    | File path |
| `readmePath`    | Readme file path |
| `usagesDir`    | Usages directory path  |
| `encapsulation`    | Component `encapsulation` type. Possible values are `shadow`, `scoped`, `none`  |
| `tag`    | Component tag described in `.tsx` file  |
| `readme`    | Component readme file first line content  |
| `docs`    | Description written in top of `@Component` e.g. /**  Documentation Example */ |
| `docsTags`    | Annotations (In the way of JSDoc ) written in `.tsx` file will be collected here   |
| `usage`    |    |
| `props`    | Array of component properties information   |
| `methods`    | Array of component methods information   |
| `events`    |    |
| `listeners`    |    |
| `styles`    |    |
| `slots`    |    |
| `parts`    |    |
| `dependents`    |  Array of components where current component is used  |
| `dependencies`    |  Array of components which is used in current component  |
| `dependencyGraph`    | Describes a tree of components coupling |

