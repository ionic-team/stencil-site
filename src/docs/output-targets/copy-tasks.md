---
title: Stencil Copy Tasks
description: Stencil Copy Tasks
url: /docs/copy-tasks
contributors:
  - adamdbradley
  - manucorporat
---

## Output Target Copy Task Config

The `copy` config is an array of objects that defines any files or folders that should be copied over to the build directory. Each object in the array must include a `src` property which can be either an absolute path, a relative path or a glob pattern. The config can also provide an optional `dest` property which can be either an absolute path or a path relative to the build directory. Also note that any files within `src/assets` are automatically copied to `www/assets` for convenience.

In the copy config below, it will copy the entire directory from `src/docs-content` over to `www/docs-content`.

```tsx
  copy: [
    { src: 'docs-content' }
  ]
```
