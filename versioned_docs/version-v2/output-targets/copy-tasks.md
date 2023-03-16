---
title: Stencil Copy Tasks
sidebar_label: Copy Tasks
description: Stencil Copy Tasks
slug: /copy-tasks
contributors:
  - adamdbradley
  - manucorporat
  - jeanbenitez
---


# Copy Tasks for Output Targets

Each output target can have its own `copy` config, which is an array of objects that defines any files or folders that should be copied over to the output target's build directory.

### src

Each object in the array must include a `src` property which can be either an absolute path, a relative path from the `srcDir`, or a glob pattern. By default the item copied to the destination will take the same name as the source.

In the `copy` config within the `www` output target example below, the build will copy the entire directory from `src/images` over to `www/images`. In this example, since the `srcDir` property is not set, the default source directory is `src`.

```tsx
  outputTargets: [
    {
      type: 'www',
      copy: [
        { src: 'images' }
      ]
    }
  ]
```


### dest

The config can also provide an optional `dest` property which can be either an absolute path, or a path relative to the build directory of that output target. In the example below, we've customized the build directory to be `public` instead of the default, which will copy `src/files/fonts` over to `public/static/web-fonts`.

```tsx
  outputTargets: [
    {
      type: 'www',
      dir: 'public',
      copy: [
        { src: 'files/fonts', dest: 'static/web-fonts' }
      ]
    }
  ]
```

### warn

By default, if a file or directory is not available it will not warn if the copy task cannot find it. To see the warnings if a copy task source cannot be found, please set `warn: true` with the copy config object.

```tsx
  outputTargets: [
    {
      type: 'dist',
      copy: [
        { src: 'fonts', warn: true }
      ]
    }
  ]
```
