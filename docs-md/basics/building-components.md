# Building Components

Stencil makes it easy to build rich, interactive components. Let's start with the basics.

## Component Decorator

Each Stencil Component must be decorated with an `@Component()` decorator from the `@stencil/core` package. In the simplest case, developer's must provide a HTML `tag` name for the component. Often times, a `styleUrl` is used as well, or even `styleUrls`, where multiple different style sheets can be provided for different application modes/themes.

Use a relative url to the `.scss` file for the styleUrl(s).

```
import { Component } from '@stencil/core';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.scss'
})
export class TodoList {
  ...
}
```

## Prop Decorator

Props are custom attribute/properties exposed publicly on the element that developers can provide values for. Children components should not know about or reference parent components, so Props should be used to pass data down from the parent to the child. Components need to explicitly declare the Props it expects to receive using the `@Prop()` decorator. Props can be a `number`, `string`, `boolean`, or even an `Object` or `Array`. By default, when a member decorated with `@Prop()` decorator is set, the component will efficiently re-render.

```
import { Prop } from '@stencil/core';
...
export class TodoList {
  @Prop() color: string;
  @Prop() favoriteNumber: number;
  @Prop() isSelected: boolean;
  @Prop() myHttpService: MyHttpService;
}
```

Within the `TodoList` class, the Props are accessed via the `this` operator.

```
...
colorChanged(newColor: string) {
  this.color = newColor;
}
...
```

Externally, Props are accessed directly on the element.

```html
<todo-list color="blue" favorite-number="24" is-selected="true"></todo-list>
```
Note: you need to hyphenated the propName to set it as an attribute in the HTML, but inside JSX template you can use propName:
```jsx
<todo-list color="blue" isSelected={true}></todo-list>
```

They can also be accessed via JS from the element.

```
const todoListElement = document.querySelector('todo-list');
todoListElement.myHttpService = someObject;
todoListElement.color = 'orange';
```

## PropWillChange and PropDidChange Decorators

`PropWillChange()` and `PropDidChange()` are decorators applied to functions that will be invoked immediately before and after a member decorated with `@Prop` is changed.

```
import { Prop, PropDidChange, PropWillChange } from '@stencil/core';

...
export class LoadingIndicator {
  @Prop() activated: boolean;

  @PropWillChange('activated')
  willChangeHandler(newValue: boolean) {
    console.log('The new value of activated is: ', newValue);
  }

  @PropDidChange('activated')
  didChangeHandler(newValue: boolean) {
    // do something now that `activated` has changed
  }
}

```

# Managing Component State

The `@State()` decorator is very similar to the [@Prop() decorator]() except it is used for managing internal state instead of the public API. Decorating a class member with `@State()` will trigger efficient re-renders when the value is set, but it won't be accessible through the Element.

```
import { State } from '@stencil/core';

...
export class TodoList {
  @State() completedTodos: Todo[];

  completeTodo(todo: Todo) {
    this.completedTodos = this.completedTodos.concat([]).push(todo);
  }
}
```

## Method Decorator

The `@Method()` decorator is used to expose methods on the public API. Functions decorated with the `@Method()` decorator can be called directly from the element.

```
import { Method } from '@stencil/core';

...
export class TodoList {

  @Method()
  showPrompt() {
    // show a prompt
  }
}
```

Call the method like this

```
const todoListElement = document.querySelector('todo-list');
todoListElement.showPrompt();
```

## Element Decorator

The `@Element()` decorator is how to get access to the host element within the class instance.

```
import { Element } from '@stencil/core';

...
export class TodoList {

  @Element() element: HTMLElement;
}
```


## Change Detection

Stencil does not actively perform change detection. In order to trigger an efficient re-render, use the `@State` decorator to update the local state and trigger a re-render.

The example below WILL NOT trigger a re-render

```
import { State } from '@stencil/core';

...
export class TodoList {
  @State() completedTodos: Todo[];

  completeTodo(todo: Todo) {
    this.completedTodos.push(todo);
  }
}
```

In the above example, we are changing the contents of the `completedTodos` array. A re-render is not performed because Stencil does not deeply watch items for change.

In order to trigger a re-render, simply call the `completedTodos` setter like this:

```
import { State } from '@stencil/core';

...
export class TodoList {
  @State() completedTodos: Todo[];

  completeTodo(todo: Todo) {
    const completedTodos = this.completedTodos.concat([]);
    completedTodos.push(todo);
    // by setting the value, Stencil re-renders
    this.completedTodos = completedTodos;
  }
}
```

In the above example, the key line is `this.completedTodos = completedTodos;`. This calls the `completedTodos` setter, which triggers the re-render.


## Embedding or Nesting Components

Components can be composed easily by simply adding the HTML tag to the JSX code. Since the components are just HTML tags, nothing needs to be imported to use a Stencil component within another Stencil component.

Here's an example of using a component within another component

```
import { Component, Prop } from '@stencil/core';

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

```
import { Component } from '@stencil/core';

@Component({
  tag: 'my-parent-component'
})
export class MyParentComponent {

  render() {
    return (
      <div>
        <my-embedded-component color="red"></my-embedded-component>
      </div>
    );
  }
}
```

The `my-parent-component` includes a reference to the `my-embedded-component` in the `render()` function.
