---
title: Extras Config
description: Extras Config
url: /docs/config-extras
contributors:
  - mattdsteele
  - rwaskiewicz
---

# Extras

The `extras` config contains options to enable new/experimental features in Stencil, add & remove runtime for DOM 
features that require manipulations to polyfills, etc. For example, not all DOM APIs are fully polyfilled when 
using the Slot polyfill. Most of these are opt-in, since not all users require the additional runtime.

By default, Stencil does not work on IE11, Edge 18 and below (Edge before it moved to Chromium) and Safari 10. In order to support legacy browsers, the browsers would need to download and run polyfills. By using the `extras` config, apps can opt-in these additional runtime settings.

Example `extras` config when __supporting__ legacy browsers:

```tsx
export const config: Config = {
  buildEs5: 'prod',
  extras: {
    cssVarsShim: true,
    dynamicImportShim: true,
    shadowDomShim: true,
    safari10: true,
    scriptDataOpts: true,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: true,
  }
};
```

Note: `buildEs5: 'prod'` was also set in the config since this example needs to support legacy browsers. See the [buildEs5 config](/docs/config#buildes5) for more information.

### appendChildSlotFix

By default, the slot polyfill does not update `appendChild()` so that it appends new child nodes into the correct child slot like how shadow dom works. This is an opt-in polyfill for those who need it.

### cloneNodeFix

By default, the runtime does not polyfill `cloneNode()` when cloning a component that uses the slot polyfill. This is an opt-in polyfill for those who need it.

### cssVarsShim

Include the CSS Custom Property polyfill/shim for legacy browsers.

A result of this being set to `false` is that you will need to manually provide "fallback" properties to legacy builds. For example, in the css below, the css variable will not be polyfilled for IE11, so the developer will manually need to provide a fallback just before the css variable. If the app does not need to support IE11 it's recommended to leave `cssVarsShim` set to the default value of `false`.

```css
div {
  color: blue; /* Used by IE */
  color: var(--color); /* Used by modern browsers */
}
```

### dynamicImportShim

Dynamic `import()` shim. This is only needed for Edge 18 and below, and Firefox 67 and below. If you do not need to support Edge 18 and below (Edge before it moved to Chromium) then it's recommended to set `dynamicImportShim` to `false`. Defaults to `false`.

### experimentalImportInjection

In some cases, it can be difficult to lazily load Stencil components in a separate project that uses a bundler such as
[Vite](https://vitejs.dev/).

This is an experimental flag that, when set to `true`, will allow downstream projects that consume a Stencil library
and use a bundler such as Vite to lazily load the Stencil library's components.

In order for this flag to work:
1. The Stencil library must expose lazy loadable components, such as those created with the
[`dist` output target](/docs/distribution)
2. The Stencil library must be recompiled with this flag set to `true`

This flag works by creating dynamic import statements for every lazily loadable component in a Stencil project.
Users of this flag should note that they may see an increase in their bundle size.

Defaults to `false`.

### lifecycleDOMEvents

Dispatches component lifecycle events. By default these events are not dispatched, but by enabling this to `true` these events can be listened for on `window`. Mainly used for testing.

| Event Name                     | Description                                                    |
|--------------------------------|----------------------------------------------------------------|
| `stencil_componentWillLoad`    | Dispatched for each component's `componentWillLoad`. |
| `stencil_componentWillUpdate`  | Dispatched for each component's `componentWillUpdate`. |
| `stencil_componentWillRender`  | Dispatched for each component's `componentWillRender`. |
| `stencil_componentDidLoad`     | Dispatched for each component's `componentDidLoad`. |
| `stencil_componentDidUpdate`   | Dispatched for each component's `componentDidUpdate`. |
| `stencil_componentDidRender`   | Dispatched for each component's `componentDidRender`. |

### safari10

Safari 10 supports ES modules with `<script type="module">`, however, it did not implement `<script nomodule>`. When set `safari10` is set to `false`, the runtime will not patch support for Safari 10. If the app does not need to support Safari 10, it's recommended to set this to `false`. Defaults to `false`.

### scopedSlotTextContentFix

An experimental flag that when set to `true`, aligns the behavior of invoking the `textContent` getter/setter on a scoped component to act more like a component that uses the shadow DOM. Specifically, invoking `textContent` on a component will adhere to the return values described in [MDN's article on textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#description). Defaults to `false`.

### scriptDataOpts

It is possible to assign data to the actual `<script>` element's `data-opts` property, which then gets passed to Stencil's initial bootstrap. This feature is only required for very special cases and rarely needed. When set to `false` it will not read this data. Defaults to `false`.

### `__deprecated__shadowDomShim`

If enabled `true`, the runtime will check if the shadow dom shim is required.
However, if it's determined that shadow dom is already natively supported by
the browser then it does not request the shim. Setting to `false` will avoid
all shadow dom tests. If the app does not need to support IE11 or Edge 18 and
below, it's recommended to set `shadowDomShim` to `false`. Defaults to `false`.

As of Stencil v3.0.0, support for IE 11, Edge <= 18, and Safari 10 has begun to
reach end-of-life. While this flag and its supporting functionality is
currently available, it will be removed in a future version of Stencil.

### slotChildNodesFix

For browsers that do not support shadow dom (IE11 and Edge 18 and below), slot is polyfilled to simulate the same behavior. However, the host element's `childNodes` and `children` getters are not patched to only show the child nodes and elements of the default slot. Defaults to `false`.
