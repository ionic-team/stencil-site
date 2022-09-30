---
title: Documentation
description: Documentation Generation in Stencil
url: /docs/overview
contributors:
  - rwaskiewicz
---

**ALL OF THIS NEEDS TO BE EDITED. CONSIDER IT A WRITER'S DRAFT TO GET SOMETHING ON THE PAGE**

# Documentation Generation in Stencil

As apps scale with more and more components, and a team's size continues to adjust over time, it's vital all components are well documented.
When Stencil compiles a project, it learns a great deal of information about the Stencil components it contains.
Stencil provides multiple ways to automatically generate documentation for a project based on this information.

## Documenting a Stencil Component

Stencil doesn't impose strict rules how much documentation a team adds to their components.
They may choose to document everything, nothing, or something in-between.
Below is a list of things Stencil can document.

### `@Component`

Adding a JSDoc to a Stencil component section

#### Slots

Slots can be documented by adding `@slot` tags to the JSDoc comments above the `@Component` decorator:

```tsx
/**
 * @slot slotName - slotDescription
 * @slot buttonContent - Slot for the content of the button
 */
 @Component({
  tag: '...'
 }) ...
```

### `@Event`

To document an [`@Event` class member](), add a JSDoc above it like so:

```tsx
/**
 * Emitted before the alert has dismissed.
 */
@Event({ eventName: 'alertWillDismiss' }) willDismiss!: EventEmitter<OverlayEventDetail>;
```

Stencil will take care of documenting the Event's name, readonly properties like `bubbles` & `cancellable`, and JSDoc tags for you.

### `@Method`

To document a [`@Method` class member](), add a JSDoc above it like so:

```tsx
/**
 * Opens the menu. If the menu is already open or it can't be
 * opened, it returns `false`.
 */
@Method()
async open(animated = true): Promise<boolean> {
  return this.setOpen(animated);
}
```

Stencil will take care of documenting the Method's name, function signature, and JSDoc tags for you.

### `@Prop`

To document a [`@Prop` class member](), add a JSDoc above it like so:

```tsx
/**
 * The icon to display
 */
@Prop() iconType = "";
```

Stencil will take care of documenting the Prop's name & type, [any configuration options]() and JSDoc tags for you.

### Styles

Stencil will also document CSS variables when you specify them via JSDoc-style comments inside a component's css or scss files:

```css
 :root {
   /**
    * @prop --primary: Primary header color.
    */
   --primary: blue;
 }
```

## Adding Usage Examples

Documenting how a Stencil component is used is useful for the users of a project.
The content of `.md` files in a `usage` subdirectory of a component will be added to the `usage` property of the generated json.

```
src/components/my-component
├── my-component.css
├── my-component.tsx
├── readme.md
└── usage
    ├── usage-example-1.md
    └── usage-example-2.md
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
