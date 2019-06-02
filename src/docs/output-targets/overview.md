---
title: Stencil Output Targets
description: Stencil Output Targets
url: /docs/output-targets
contributors:
  - adamdbradley
  - manucorporat
---

# Output Targets


## Docs Auto-Generation

As apps scale with more and more components, and team size and members continue to adjust over time, it's vital all components are well documented, and that the documentation itself is maintained. Maintaining documentation is right up there with some of the least interesting things developers must do, but that doesn't mean it can't be made easier.

Throughout the build process, the compiler is able to extract documentation from each component, to include JSDocs comments and types of each member on the component (thanks TypeScript!).

To add a description to a `@Prop`, simply add a comment on the previous line:
```tsx
/** (optional) The icon to display */
@Prop() iconType: string = "";
```

### Documenting CSS Variables

Stencil will also document CSS variables when you specify them via jsdoc-style comments inside your css/scss files:

```css
/**
 * @prop --background: Background of the button
 * @prop --background-activated: Background of the button when activated
 * @prop --background-focused: Background of the button when focused
 */
```
