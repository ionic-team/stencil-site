---
title: Decorators
description: Decorators
url: /docs/component
contributors:
  - jthoms1
---

# Declaring a new component

## Component Decorator

Each Stencil Component must be decorated with a `@Component()` decorator from the `@stencil/core` package. In the simplest case, developer's must provide an HTML `tag` name for the component. Often times, a `styleUrl` is used as well, or even `styleUrls`, where multiple different style sheets can be provided for different application modes/themes.

Use a relative url to the `.css` file for the styleUrl(s).

```tsx
import { Component } from '@stencil/core';

| @Component({
|   tag: 'todo-list',
|   styleUrl: 'todo-list.css'
| })
export class TodoList {

}
```


## Embedding or Nesting Components

Components can be composed easily by adding the HTML tag to the JSX code. Since the components are just HTML tags, nothing needs to be imported to use a Stencil component within another Stencil component.

Here's an example of using a component within another component:

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-embedded-component'
})
export class MyEmbeddedComponent {
  @Prop() color: string = 'blue';

  render() {
    return (
      <div>My favorite color is {this.color}</div>
    );
  }
}
```

```tsx
import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-parent-component'
})
export class MyParentComponent {

  render() {
    return (
      <div>
|       <my-embedded-component color="red"></my-embedded-component>
      </div>
    );
  }
}
```

The `my-parent-component` includes a reference to the `my-embedded-component` in the `render()` function.
