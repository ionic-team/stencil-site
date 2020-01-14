---
title: Extras Config
description: Extras Config
url: /docs/config/extras
contributors:
  - mattdsteele
---

# Extras

The `extras` config contains options to add additional runtime for DOM features that require manipulations to polyfills.

For example, not all DOM APIs are fully polyfilled when using the Slot polyfill.
Most of these are opt-in, since not all users require the additional runtime.

Example usage:

```ts
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
for legacy builds only. ESM builds will not include the css vars shim. This is an opt-out polyfill.

### lifecycleDOMEvents

Dispatches component lifecycle events. Mainly used for testing.
