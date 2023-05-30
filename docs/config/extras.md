---
title: Extras Config
sidebar_label: Extras
description: Extras Config
slug: /config-extras
---

# Extras

The `extras` config contains options to enable new/experimental features in
Stencil, add & remove runtime for DOM features that require manipulations to
polyfills, etc. For example, not all DOM APIs are fully polyfilled when using
the Slot polyfill. Most of these are opt-in, since not all users require the
additional runtime.

By default, Stencil does not work on IE11, Edge 18 and below (Edge before it
moved to Chromium) and Safari 10. In order to support legacy browsers, the
browsers would need to download and run polyfills. By using the `extras`
config, apps can opt-in these additional runtime settings.

:::info
As of Stencil v3, several of these fields are deprecated, and will be removed in a future major version of Stencil.
Deprecated fields are marked as such.
:::

Example `extras` config when **supporting** legacy browsers:

```tsx
export const config: Config = {
  buildEs5: 'prod',
  extras: {
    scriptDataOpts: true,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: true,
  },
};
```

:::note
`buildEs5: 'prod'` was also set in the config since this example needs to support legacy browsers. See the [buildEs5 config](./01-overview.md#buildes5) for more information.
:::

### appendChildSlotFix

By default, the slot polyfill does not update `appendChild()` so that it appends new child nodes into the correct child slot like how shadow dom works. This is an opt-in polyfill for those who need it.

### cloneNodeFix

By default, the runtime does not polyfill `cloneNode()` when cloning a component that uses the slot polyfill. This is an opt-in polyfill for those who need it.

### experimentalImportInjection

:::caution
This flag has been deprecated in favor of [`enableImportInjection`](#enableimportinjection), which provides the same
functionality. `experimentalImportInjection` will be removed in a future major version of Stencil.
:::

In some cases, it can be difficult to lazily load Stencil components in a separate project that uses a bundler such as
[Vite](https://vitejs.dev/).

This is an experimental flag that, when set to `true`, will allow downstream projects that consume a Stencil library
and use a bundler such as Vite to lazily load the Stencil library's components.

In order for this flag to work:

1. The Stencil library must expose lazy loadable components, such as those created with the
   [`dist` output target](../output-targets/dist.md)
2. The Stencil library must be recompiled with this flag set to `true`

This flag works by creating dynamic import statements for every lazily loadable component in a Stencil project.
Users of this flag should note that they may see an increase in their bundle size.

Defaults to `false`.

### enableImportInjection

In some cases, it can be difficult to lazily load Stencil components in a separate project that uses a bundler such as
[Vite](https://vitejs.dev/).

Enabling this flag will allow downstream projects that consume a Stencil library and use a bundler such as Vite to lazily load the Stencil library's components.

In order for this flag to work:

1. The Stencil library must expose lazy loadable components, such as those created with the
   [`dist` output target](../output-targets/dist.md)
2. The Stencil library must be recompiled with this flag set to `true`

This flag works by creating dynamic import statements for every lazily loadable component in a Stencil project.
Users of this flag should note that they may see an increase in their bundle size.

Defaults to `false`.

### lifecycleDOMEvents

Dispatches component lifecycle events. By default these events are not dispatched, but by enabling this to `true` these events can be listened for on `window`. Mainly used for testing.

| Event Name                    | Description                                            |
| ----------------------------- | ------------------------------------------------------ |
| `stencil_componentWillLoad`   | Dispatched for each component's `componentWillLoad`.   |
| `stencil_componentWillUpdate` | Dispatched for each component's `componentWillUpdate`. |
| `stencil_componentWillRender` | Dispatched for each component's `componentWillRender`. |
| `stencil_componentDidLoad`    | Dispatched for each component's `componentDidLoad`.    |
| `stencil_componentDidUpdate`  | Dispatched for each component's `componentDidUpdate`.  |
| `stencil_componentDidRender`  | Dispatched for each component's `componentDidRender`.  |

### scopedSlotTextContentFix

An experimental flag that when set to `true`, aligns the behavior of invoking the `textContent` getter/setter on a scoped component to act more like a component that uses the shadow DOM. Specifically, invoking `textContent` on a component will adhere to the return values described in [MDN's article on textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#description). Defaults to `false`.

### scriptDataOpts

It is possible to assign data to the actual `<script>` element's `data-opts` property, which then gets passed to Stencil's initial bootstrap. This feature is only required for very special cases and rarely needed. When set to `false` it will not read this data. Defaults to `false`.

### slotChildNodesFix

For browsers that do not support shadow dom (IE11 and Edge 18 and below), slot is polyfilled to simulate the same behavior. However, the host element's `childNodes` and `children` getters are not patched to only show the child nodes and elements of the default slot. Defaults to `false`.
