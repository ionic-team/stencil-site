# Creating components

Stencil components are plan ES6/TypeScript classes with some decorator metadata.

Create new components by creating files with a `.tsx` extension, such as `my-component.tsx`, and place them in `src/components`.

```typescript
// Import the Component decorator, and h, the virtual dom call that our JSX compiles to.
import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss'
})
export class MyComponent {
  // Indicate that name should be a property on our new component
  @Prop() name: string;

  @State() isVisible: boolean = true;

  render() {
    return (
      <p>
        My name is {this.name}
      </p>
    );
  }
}
```

Note: the `.tsx` extension is required, as this is the standard for TypeScript classes that use JSX.

To use this component, just use it like any other HTML tag:

```html
<my-component name="Max"></my-component>
```
