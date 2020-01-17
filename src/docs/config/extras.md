---
title: Extras Config
description: Extras Config
url: /docs/config-extras
contributors:
  - mattdsteele
---

# Extras

The `extras` config contains options to add additional runtime for DOM features that require manipulations to polyfills.

For example, not all DOM APIs are fully polyfilled when using the Slot polyfill.
Most of these are opt-in, since not all users require the additional runtime.

Example usage:

```tsx
export const config: Config = {
  extras: {
    appendChildSlotFix: true,
    cssVarsShim: false
  }
};
```

### appendChildSlotFix

By default, the slot polyfill does not update `appendChild()` so that it appends
new child nodes into the correct child slot like how shadow dom works. This is an opt-in
polyfill for those who need it.

### cloneNodeFix

By default, the runtime does not polyfill `cloneNode()` when cloning a component
that uses the slot polyfill. This is an opt-in polyfill for those who need it.

### cssVarsShim

Include the CSS Custom Property polyfill/shim for legacy browsers. Defaults to `true`
for legacy builds only. ESM builds will not include the css vars shim. This is an opt-out polyfill for legacy builds.

A result of setting this to `false` is that you will need to manually provide "fallback" properties to legacy builds. For example, in the css below, the css variable will not be polyfilled for IE11, so the developer will manually need to provide a fallback just before the css variable. Doing

```css
div {
  color: blue; /* Used by IE */
  color: var(--color); /* Used by modern browsers */
}
```

### lifecycleDOMEvents

Dispatches component lifecycle events. By default these events are not dispatched,
but by enabling this to `true` these events can be listened for on `window`.
Mainly for used testing.

| Event Name                     | Description                                                    |
|--------------------------------|----------------------------------------------------------------|
| `stencil_appload`              | The app and all of its child components have finished loading. |
| `stencil_componentWillLoad`    | Dispatched for each component's `componentWillLoad`. |
| `stencil_componentWillUpdate`  | Dispatched for each component's `componentWillUpdate`. |
| `stencil_componentWillRender`  | Dispatched for each component's `componentWillRender`. |
| `stencil_componentDidLoad`     | Dispatched for each component's `componentDidLoad`. |
| `stencil_componentDidUpdate`   | Dispatched for each component's `componentDidUpdate`. |
| `stencil_componentDidRender`   | Dispatched for each component's `componentDidRender`. |
