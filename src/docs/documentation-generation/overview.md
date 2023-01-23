---
title: Documentation
description: Documentation Generation in Stencil
url: /docs/doc-overview
contributors:
  - rwaskiewicz
---

**ALL OF THIS NEEDS TO BE EDITED. CONSIDER IT A WRITER'S DRAFT TO GET SOMETHING ON THE PAGE**

# Documentation Generation in Stencil

As apps scale with more and more components, and a team's size continues to adjust over time, it's vital all components are well documented.
During the compilation process, Stencil learns a great deal of information about a project's components.
Stencil provides multiple ways to automatically generate documentation for a project based on this information.

## Documentation Types

Stencil offers several options for generating documentation for a project:

- [Custom - Generate documentation with custom logic](/docs/docs-custom)
- [JSON - Generate a JSON file for an entire project](/docs/docs-json)
- [Markdown - Generate a markdown file for each component in a project](/docs/docs-readme)
- [VS Code - Generate documentation to improve VS Code Intellisense](/docs/docs-vscode)

One or more of options can be specified in a project's `stencil.config.ts` to generate documentation.
See each page for the types above for configuration details.

## Documenting a Stencil Component

Stencil doesn't impose strict rules on how much documentation a team should add to their components.
They may choose to document everything, nothing, or something in-between.
Below is a list of things Stencil can document.

### @Component

When a JSDoc is added to a Stencil component's declaration, the compiler can pull several pieces of data from the JSDoc.
The following subsections describes each type of data that Stencil's documentation generator can understand. 

#### Overview

An overview is one or more sentences that describes a Stencil component.
It tells the reader what the component is, and potentially what it's used for:
```tsx
/**
 * A sign up button for email notifications.
 * 
 * This button can be used for any marketing initiatives.
 */
 @Component({
  tag: 'sign-up-btn'
 }) ...
```

In the example above, Stencil understands that both sentences are a part of the overview, even though they are separated by multiple newlines.

#### Parts

CSS Shadow Parts

```tsx
 /**
  * @part separator - The separator element between each breadcrumb
  */
  @Component({
    tag: 'sign-up-btn'
  })
  export class SignUpButton {
    render() {
      return (
        <button
          part="collapsed-indicator"
          onClick={() => this.collapsedIndicatorClick()}
        >
          <ion-icon icon={ellipsisHorizontal} lazy={false}></ion-icon>
        </button>
      );
    }
}
```

#### Slots

Slots can be documented by adding `@slot` tags to the JSDoc comments above the `@Component` decorator.
Slot documentation is expected to be of the format:
```
@slot slotName - slotDescription
```
where the first whole word is assumed to be the slot name, and the text following the '-' will be interpreted as the slot description.

```tsx
/**
 * @slot buttonContent - Slot for the content of the button
 * @slot - content is placed between the named slots if provided without a slot.
 */
 @Component({
  tag: '...'
 }) ...
```

Stencil will parse the `@slot` tags in the JSDoc as two slot instances.
One slot with name 'buttonContent' and a description of 'Slot for the content of the button'.
The other will have no name, and a description of 'content is placed between the named slots if provided without a slot.'.

### @Event

To document an [`@Event` class member](), add a JSDoc above it like so:

```tsx
/**
 * Emitted before the alert has dismissed.
 */
@Event({ eventName: 'alertWillDismiss' }) willDismiss!: EventEmitter<OverlayEventDetail>;
```

Stencil will take care of documenting the Event's name, readonly properties like `bubbles` & `cancellable`, and JSDoc tags for you.

### @Method

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

### @Prop

To document a [`@Prop` class member](), add a JSDoc above it like so:

```tsx
/**
 * The icon to display
 */
@Prop() iconType = "";
```

Stencil will take care of documenting the Prop's name & type, [any configuration options]() and JSDoc tags for you.

## Documenting Styles

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
