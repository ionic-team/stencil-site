---
title: Documentation
description: Documentation Generation in Stencil
url: /docs/docs-general
contributors:
  - rwaskiewicz
---

# Documentation Generation in Stencil

## Slots

Slots can be documented by adding `@slot` tags to the doc comments above the `@Component` decorator.

```tsx
/**
 * @slot slotName - slotDescription
 * @slot buttonContent - Slot for the content of the button
 */
 
 @Component({
  tag: '...'
}) ...
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
 
@Component({
  tag: '...'
}) ...
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
