---
title: Docs Auto-Generation
description: Docs Auto-Generation
url: /docs/docs-auto-generation
contributors:
  - adamdbradley
---

# Docs Auto-Generation

As apps scale with more and more components, and team size and members continue to adjust over time, it's vital all components are well documented, and that the documentation itself is maintained. Maintaining documentation is right up there for some of the least interesting things developers must do, but that doesn't mean it can't be made easier.

Throughout the build process, the compiler is able to extract documentation from each component, to include JSDocs comments and types of each member on the component (thanks TypeScript!).


## Readme Markdown Files

Stencil is able to auto-generate `readme.md` files in markdown. This is an opt-in feature and will save the readme files as a sibling to the component within the same directory. When this feature is used it an be useful for others to easily find and read formatted docs about one component. In particular, when a `readme.md` file is placed within a directory on Github, it will default the readme mardown file as the primary content of the page.

To auto-generate readme files, add the flag `--docs`, such as:

```bash
stencil build --docs
```

Another option would be to add a docs command as an npm script, such as:

```javascript
  scripts: {
    "docs": "stencil build --docs"
  }
```

## Docs Json Data

While auto-generated readme files formatted with markdown is convenient, there may be scenarios it'd be getter to get all of the docs in the form of json data. To build the docs as json, use the `--docs-json` flag, followed by a path on where to write the json file.

```javascript
  scripts: {
    "docs.data": "stencil build --docs-json path/to/docs.json"
  }
```
