# Creating Stencil Components

Create Stencil components by creating a file with a `.tsx` extension, such as `my-first-component.tsx`, and place them in the `src/components` directory. The `.tsx` extension is required since Stencil components are built using [JSX](https://facebook.github.io/react/docs/introducing-jsx.html).

Here is an example of what a Stencil component look like:

```typescript
import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-first-component',
  styleUrl: 'my-first-component.scss'
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
Once compiled, this component can be used in HTML just like any other tag.

```html
<my-first-component name="Max"></my-first-component>
```

When rendered, the browser will display `My name is Max`.

## Details

So what's really going on here?

For starters, at the top of the component, there are a few `imports` from the `@stencil/core` package. These imports are what pull in the `@Component()` and `@Prop()` decorators so TypeScript knows about it.


The `@Component()` decorator is used to metadata about the component to the compiler. Use the `tag` property to specify the name of the HTML Tag/Element. The `styleUrl` property can be used to provide a relative path to a `.scss` file for providing the component's css.

Below the `@Component()` decorator, we have an ES2015 class. This is where you'll write the bulk of your code to bring your Stencil component to life. Here is where you'd write functions or provide business logic.

Each Component class must implement a `render` function. This function is used to write `JSX` to provide the HTML mark-up for the component. In our simple case above, we are simply rendering a `<p>` tag with basic content it in, and using one-way data binding to render the value of the `name` property on the class.

The `name` property on the ES2015 class is special in the sense that is decorated with a `@Prop()` decorator. To those coming from a [ReactJS](https://facebook.github.io/react/) background, `@Prop()` should be very familiar. When something is decorated with the `@Prop()` decorator, it tells that compiler that the property is a part of the public API of the component, and can be set on the element. An example of this is setting the `name` field on the `my-first-component` element above.

Any property decorated with `@Props()` is also automatically watched for changes. If we were to change our `my-first-component` element's `name` property at runtime, the `render` function would automatically be called, ensuring that our rendered content is always up to date. Likewise, if the ES2015 property `name` is changed programmatically, the `render` function will be called as well.