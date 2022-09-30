---
title: Documentation
description: Documentation Generation in Stencil
url: /docs/docs-general
contributors:
  - rwaskiewicz
---

# Documentation Generation in Stencil

As apps scale with more and more components, and a team's size continues to adjust over time, it's vital all components are well documented.
When Stencil compiles a project, it learns a great deal of information about the Stencil components it contains.
Stencil provides multiple ways to automatically generate documentation for a project based on this information.

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
