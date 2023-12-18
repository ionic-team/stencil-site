---
title: Form-Associated Components
sidebar_label: Form-Associated Components
description: Form-Associated Stencil Components
slug: /form-associated
---

# Building Form-Associated Components in Stencil

As of v4.5.0, Stencil has support for form-associated custom elements. This
allows Stencil components to participate in a rich way in HTML forms,
integrating with native browser features for validation and accessibility while
maintaining encapsulation and control over their styling and presentation.

:::caution
Browser support for the APIs that this feature depends on is still not
universal[^1] and the Stencil team has no plans at present to support or
incorporate any polyfills for the browser functionality. Before you ship
form-associated Stencil components make sure that the browsers you need to
support have shipped the necessary APIs.
:::

## Creating a Form-Associated Component

A form-associated Stencil component is one which sets the new [`formAssociated`](./component.md#formAssociated)
option in the argument to the `@Component`
decorator to `true`, like so:

```tsx
import { Component } from '@stencil/core';

@Component({
  tag: 'my-face',
  formAssociated: true,
})
export class MyFACE {
}
```

This element will now be marked as a form-associated custom element via the
[`formAssociated`](https://html.spec.whatwg.org/#custom-elements-face-example)
static property, but by itself this is not terribly useful.

In order to meaningfully interact with a `<form>` element that is an ancestor
of our custom element we'll need to get access to an
[`ElementInternals`](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals)
object corresponding to our element instance. Stencil provides a decorator,
`@AttachInternals`, which does just this, allowing you to decorate a property on
your component and bind an `ElementInternals` object to that property which you
can then use to interact with the surrounding form.

:::info
Under the hood the `AttachInternals` decorator makes use of the very similarly
named
[`attachInternals`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals)
method on `HTMLElement` to associate your Stencil component with an ancestor
`<form>` element. During compilation, Stencil will generate code that calls
this method at an appropriate point in the component lifecycle for both
[lazy](../output-targets/dist.md) and [custom elements](../output-targets/custom-elements.md) builds.
:::

A Stencil component using this API to implement a custom text input could look
like this:

```tsx title="src/components/custom-text-input.tsx"
import { Component, h, AttachInternals, State } from '@stencil/core';

@Component({
  tag: 'custom-text-input',
  shadow: true,
  formAssociated: true
})
export class CustomTextInput {
  @State() value: string;

  @AttachInternals() internals: ElementInternals;

  handleChange(event) {
    this.value = event.target.value;
    this.internals.setFormValue(event.target.value);
  }

  componentWillLoad() {
    this.internals.setFormValue("a default value");
  }

  render() {
    return (
      <input
        type="text"
        value={this.value}
        onInput={(event) => this.handleChange(event)}
      />
    )
  }
}
```

If this component is rendered within a `<form>` element like so:


```html
<form>
  <custom-text-input name="my-custom-input"></custom-text-input>
</form>
```

then it will automatically be linked up to the surrounding form. The
`ElementInternals` object found at `this.internals` will have a bunch of
methods on it for interacting with that form and getting key information out of
it.

In our `<custom-text-input>` example above we use the
[`setFormValue`](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setFormValue)
method to set a value in the surrounding form. This will read the `name`
attribute off of the element and use it when setting the value, so the value
typed by a user into the `input` will added to the form under the
`"my-custom-input"` name.

This example just scratches the surface, and a great deal more is possible with
the `ElementInternals` API, including [setting the element's
validity](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity),
reading the validity state of the form, reading other form values, and more.

## Resources

- [WHATWG specification for form-associated custom elements](https://html.spec.whatwg.org/dev/custom-elements.html#form-associated-custom-elements)
- [ElementInternals and Form-Associated Custom Elements](https://webkit.org/blog/13711/elementinternals-and-form-associated-custom-elements/) from the WebKit blog

[^1]: See https://caniuse.com/?search=attachInternals for up-to-date adoption estimates.
