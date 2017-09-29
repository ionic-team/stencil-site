# Decorators

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

Props are custom attribute/properties exposed publicly on the element that developers can provide values for. Children components should not know about or reference parent components, so Props should be used to pass data down from the parent to the child. Components need to explicitly declare the Props it expects to receive using the `@Prop()` decorator. Props can be a `number`, `string`, `boolean`, or even an `Object` or `Array`. By default, when a member decorated with a `@Prop()` decorator is set, the component will efficiently re-render.

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

```typescript
logColor() {
  console.log(this.color)
}
```

Externally, Props are set on the element.

```
<todo-list color="blue" favoriteNumber="24" isSelected="true"></todo-list>
```

They can also be accessed via JS from the element.

```
const todoListElement = document.querySelector('todo-list');
console.log(todoListElement.myHttpService); // MyHttpService
console.log(todoListElement.color); // blue
```

It's important to know, that `@Prop` is immutable from inside the component logic. Once a value is set by a user, the component cannot update it internally.

## PropWillChange and PropDidChange Decorators

When a user updates a property, `PropDidChange` and `PropWillChange` will fire what ever method they're attached to.


```typescript
import { Prop, PropDidChange, PropWillChange } from '@stencil/core';

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

The `@State()` decorator can be used to manage internal data for a component. This means that a user cannot modify the property from outside the component, but the component can modify it how ever it sees fit. Any changes to a `@State()` property will cause the components render function to be called again.


```
import { State } from '@stencil/core';

...
export class TodoList {
  @State() completedTodos: Todo[];

  completeTodo(todo: Todo) {
    // This will cause our render function to be called again
    this.completedTodos = this.completedTodos.concat([]).push(todo);
  }

  render() {
    //
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

Call the method like this:

```
const todoListElement = document.querySelector('todo-list');
todoListElement.showPrompt();
```

## Element Decorator

The `@Element()` decorator is how to get access to the host element within the class instance. This returns an instance of an `HTMLElement`, so standard DOM methods/events can be used here.

```
import { Element } from '@stencil/core';

...
export class TodoList {

  @Element() todoListEl: HTMLElement;

  addClass(){
    this.todoListEl.classList.add('active');
  }
}
```


## Change Detection

Stencil does not actively perform change detection. In order to trigger an efficient re-render, use the `@State` decorator to update the local state and trigger a re-render.

The example below WILL NOT trigger a re-render:

```typescript
import { State } from '@stencil/core';

...
export class TodoList {
  @State() completedTodos: Todo[];

  completeTodo(todo: Todo) {
    this.completedTodos.push(todo);
  }
}
```

In the above example, we are changing the contents of the `completedTodos` array.
A re-render is not performed because Stencil does not deeply watch items for change.

In order to trigger a re-render, the value needs to be set to a new array:

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

In the above example, the key line is `this.completedTodos = completedTodos;`.
This calls the `completedTodos` setter, which triggers the re-render.


## Embedding or Nesting Components

Components can be composed easily by simply adding the HTML tag to the JSX code. Since the components are just HTML tags, nothing needs to be imported to use a Stencil component within another Stencil component.

Here's an example of using a component within another component:

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

<stencil-route-link url="/docs/templating" router="#router" custom="true" class="backButton">
  Back
</stencil-route-link>

<stencil-route-link url="/docs/events" custom="true" class="nextButton">
  Next
</stencil-route-link>