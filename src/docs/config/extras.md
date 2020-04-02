---
title: Extras Config
description: Extras Config
url: /docs/config-extras
contributors:
  - mattdsteele
---

# Extras

The `extras` config contains options to add additional runtime for DOM features that require manipulations to polyfills.

For example, not all DOM APIs are fully polyfilled when using the Slot polyfill. Most of these are opt-in, since not all users require the additional runtime.

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

By default, the slot polyfill does not update `appendChild()` so that it appends new child nodes into the correct child slot like how shadow dom works. This is an opt-in polyfill for those who need it.

### cloneNodeFix

By default, the runtime does not polyfill `cloneNode()` when cloning a component that uses the slot polyfill. This is an opt-in polyfill for those who need it.

### cssVarsShim

Include the CSS Custom Property polyfill/shim for legacy browsers. Defaults to `true` for legacy builds only. ESM builds will not include the css vars shim. This is an opt-out polyfill for legacy builds.

A result of setting this to `false` is that you will need to manually provide "fallback" properties to legacy builds. For example, in the css below, the css variable will not be polyfilled for IE11, so the developer will manually need to provide a fallback just before the css variable. If the app does not need to support IE11 it's recommended to set `cssVarsShim` to `false`.

```css
div {
  color: blue; /* Used by IE */
  color: var(--color); /* Used by modern browsers */
}
```

### dynamicImportShim

Dynamic `import()` shim. This is only needed for Edge 18 and below, and Firefox 67 and below. If you do not need to support Edge 18 and below (Edge before it moved to Chromium) then it's recommended to set `dynamicImportShim` to `false`. Defaults to `true`.

### lifecycleDOMEvents

Dispatches component lifecycle events. By default these events are not dispatched, but by enabling this to `true` these events can be listened for on `window`. Mainly used for testing.

| Event Name                     | Description                                                    |
|--------------------------------|----------------------------------------------------------------|
| `stencil_appload`              | The app and all of its child components have finished loading. |
| `stencil_componentWillLoad`    | Dispatched for each component's `componentWillLoad`. |
| `stencil_componentWillUpdate`  | Dispatched for each component's `componentWillUpdate`. |
| `stencil_componentWillRender`  | Dispatched for each component's `componentWillRender`. |
| `stencil_componentDidLoad`     | Dispatched for each component's `componentDidLoad`. |
| `stencil_componentDidUpdate`   | Dispatched for each component's `componentDidUpdate`. |
| `stencil_componentDidRender`   | Dispatched for each component's `componentDidRender`. |

### safari10

Safari 10 supports ES modules with `<script type="module">`, however, it did not implement `<script nomodule>`. When set `safari10` is set to `false`, the runtime will not patch support for Safari 10. If the app does not need to support Safari 10, it's recommended to set this to `false`. Defaults to `true`.

### scriptDataOpts

It is possible to assign data to the actual `<script>` element's `data-opts` property, which then gets passed to Stencil's initial bootstrap. This feature is only required for very special cases and rarely needed. When set to `false` it will not read this data. Defaults to `true`.

### shadowDomShim

If enabled `true`, the runtime will check if the shadow dom shim is required. However, if it's determined that shadow dom is already natively supported by the browser then it does not request the shim. Setting to `false` will avoid all shadow dom tests. If the app does not need to support IE11 or Edge 18 it's recommended to set `shadowDomShim` to `false`. Defaults to `true`.

### slotChildNodesFix

For browsers that do not support shadow dom (IE11 and Edge 18 and below), slot is polyfilled to simulate the same behavior. However, the host element's `childNodes` and `children` getters are not patched to only show the child nodes and elements of the default slot. Defaults to `false`.
