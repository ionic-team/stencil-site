---
title: My First Component
description: My First Component
contributors:
  - jthoms1
---

# My First Component

Stencil components are created by adding a new file with a `.tsx` extension, such as `my-first-component.tsx`, and placing them in the `src/components` directory.
The `.tsx` extension is required since Stencil components are built using [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) and TypeScript.

Here is an example of what a Stencil component looks like:

```tsx
import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-first-component',
  styleUrl: 'my-first-component.css'
})
export class MyComponent {

  // Indicate that name should be a public property on the component
  @Prop() name: string;

  render() {
    return (
      <p>
        My name is {this.name}
      </p>
    );
  }
}
```
> Don't fully understand what's going on? Don't worry, we'll explain each pieces in detail later on.


Once compiled, this component can be used in HTML just like any other tag.

```markup
<my-first-component name="Max"></my-first-component>
```

> Web Components must have a - in the tag. `firstComponent` would not be a valid tag name.

When rendered, the browser will display `My name is Max`.

## So what's really going on here?

Let's dive in.

The first piece we see is the `@Component` decorator.
This decorator provides metadata about our component to the Stencil compiler.
Information, such as the tag to use, and external styles, can be set here and picked up by the compiler.

Below the `@Component()` decorator, we have a standard JavaScript class.
This is where you'll write the bulk of your code to bring your Stencil component to life.
Here is where you'd write functions or provide business logic.

In order for the component to render something to the screen, we must declare a render function that returns JSX.
If you're not sure what JSX is, don't worry, we'll go over it in detail in the <stencil-route-link url="/docs/templating">Templating Docs</stencil-router-link>.

The quick idea is that our render function needs to return a representation of the HTML we want to push to the DOM.

The `name` property on the class also has a decorator applied to it, `@Prop()`.
This decorator tells the compiler that the property is public to the component, and the user should be setting it.
We set this property like so:

```markup
<my-first-component name="Max"></my-first-component>
```
Any property decorated with `@Prop()` is also automatically watched for changes.
If a user of our component were to change the element's `name` property, our component would fire its `render` function again, updating the displayed content.

<stencil-route-link url="/docs/getting-started" router="#router" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/component-lifecycle" custom="true">
  <button class="pull-right btn btn--primary">
    Next
  </button>
</stencil-route-link>
