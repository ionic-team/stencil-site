---
title: Decorators
description: Decorators
url: /docs/decorators
contributors:
  - jthoms1
---

# Decorators

## Component Decorator

Each Stencil Component must be decorated with a `@Component()` decorator from the `@stencil/core` package. In the simplest case, developer's must provide an HTML `tag` name for the component. Often times, a `styleUrl` is used as well, or even `styleUrls`, where multiple different style sheets can be provided for different application modes/themes.

Use a relative url to the `.css` file for the styleUrl(s).

```tsx
import { Component } from '@stencil/core';

|@Component({
|  tag: 'todo-list',
|  styleUrl: 'todo-list.css'
|})
export class TodoList {
  ...
}
```

| Property   | Type                       | Description |
| ---------- | -------------------------- | ----------- |
| tag        | `string`                   |             |
| styleUrl   | `string`                   | (Optional)  |
| styleUrls  | `string[]` \| `ModeStyles` | (Optional)  |
| styles     | `string`                   | (Optional)  |
| scoped     | `boolean`                  | (Optional)  |
| shadow     | `boolean`                  | (Optional)  |
| host       | `HostMeta`                 | (Optional)  |
| assetsDir  | `string`                   | (Optional)  |
| assetsDirs | `string[]`                 | (Optional)  |

## Prop Decorator

Props are custom attribute/properties exposed publicly on the element that developers can provide values for. Children components should not know about or reference parent components, so Props should be used to pass data down from the parent to the child. Components need to explicitly declare the Props they expect to receive using the `@Prop()` decorator. Props can be a `number`, `string`, `boolean`, or even an `Object` or `Array`. By default, when a member decorated with a `@Prop()` decorator is set, the component will efficiently re-render.

```tsx
import { Prop } from '@stencil/core';

...
export class TodoList {
|  @Prop() color: string;
|  @Prop() favoriteNumber: number;
|  @Prop() isSelected: boolean;
|  @Prop() myHttpService: MyHttpService;
}
```

Within the `TodoList` class, the Props are accessed via the `this` operator.

```tsx
logColor() {
  console.log(this.color)
}
```

Externally, Props are set on the element.

> In HTML, you must set attributes using dash-case:

```markup
<todo-list color="blue" favorite-number="24" is-selected="true"></todo-list>
```

in JSX you set an attribute using camelCase:

```markup
<todo-list color="blue" favoriteNumber="24" isSelected="true"></todo-list>
```

They can also be accessed via JS from the element.

```tsx
const todoListElement = document.querySelector('todo-list');
console.log(todoListElement.myHttpService); // MyHttpService
console.log(todoListElement.color); // blue
```

### Prop value mutability

It's important to know, that a Prop is _by default_ immutable from inside the component logic. Once a value is set by a user, the component cannot update it internally.

However, it's possible to explicitly allow a Prop to be mutated from inside the component, by declaring it as **mutable**, as in the example below:

```tsx
import { Prop } from '@stencil/core';

...
export class NameElement {
  @Prop({ mutable: true }) name: string = 'Stencil';

  componentDidLoad() {
    this.name = 'Stencil 0.7.0';
  }
}
```

### Prop default values and validation

Setting a default value on a Prop:

```tsx
import { Prop } from '@stencil/core';

...
export class NameElement {
|  @Prop() name: string = 'Stencil';
}
```

To do validation of a Prop, you can use the [@Watch()](#watch) decorator:

```tsx
import { Prop, Watch } from '@stencil/core';

...
export class TodoList {
  @Prop() name: string = 'Stencil';

|  @Watch('name')
  validateName(newValue: string, oldValue: string) {
    const isBlank = typeof newValue == null;
    const has2chars = typeof newValue === 'string' && newValue.length >= 2;
    if (isBlank) { throw new Error('name: required') };
    if (!has2chars ) { throw new Error('name: has2chars') };
  }
}
```

### Reflect Properties to Attributes

In some cases it may be useful to keep a Prop in sync with an attribute. In this case you can use the `reflectToAttr` option in the `@Prop()` decorator:

```tsx
@Prop({
  reflectToAttr: true
})
```

## Watch Decorator

When a user updates a property, `Watch` will fire what ever method it's attached to and pass that method the new value of the prop along with the old value. `Watch` is useful for validating props or handling side effects.


```tsx
import { Prop, Watch } from '@stencil/core';

...
export class LoadingIndicator {
  @Prop() activated: boolean;

|  @Watch('activated')
  watchHandler(newValue: boolean, oldValue: boolean) {
    console.log('The new value of activated is: ', newValue);
  }
}
```

The @Watch decorator does not fire when a component initially loads.

To get the method to run when the component loads, invoke it inside a `componentWillLoad` lifecycle hook:

```tsx
componentWillLoad() {
 this.watchHandler(this.newValue);
}
```

## State Decorator

The `@State()` decorator can be used to manage internal data for a component. This means that a user cannot modify this data from outside the component, but the component can modify it however it sees fit. Any changes to a `@State()` property will cause the components `render` function to be called again.


```tsx
import { State } from '@stencil/core';

...
export class TodoList {
|  @State() completedTodos: Todo[];

  completeTodo(todo: Todo) {
    // This will cause our render function to be called again
    this.completedTodos = [...this.completedTodos, todo];
  }

  render() {
    //
  }
}
```

## Method Decorator

The `@Method()` decorator is used to expose methods on the public API. Functions decorated with the `@Method()` decorator can be called directly from the element and must return a promise.

Stencil's architecture is async at all levels which allows for many performance benefits and ease of use. By ensuring publicly exposed methods using the @Method decorator return a promise:

* Developers can call methods before the implementation was downloaded without componentOnReady(), which queues the method calls and resolves after the component has finished loading.
* Interaction with the component is the same whether it still needs to be lazy-loaded, or is already fully hydrated.
* By keeping a component's public API async, apps could move the components transparently to web workers and the API would still be the same.
* Returning a promise is only required for publicly exposed methods which have the @Method decorator. All other component methods are private to the component and are not required to be async.
Also note, developers should try to rely on publicly exposed methods as little as possible, and instead default to using properties and events as much as possible. As an app scales, we've found it's easier to manage and pass data through @Prop rather than public methods.

```tsx
import { Method } from '@stencil/core';

...
export class TodoList {

|  @Method()
  async showPrompt() {
    // show a prompt
  }
}
```

Call the method like this:

```tsx
const todoListElement = document.querySelector('todo-list');
await todoListElement.showPrompt();
```

## Element Decorator

The `@Element()` decorator is how to get access to the host element within the class instance. This returns an instance of an `HTMLElement`, so standard DOM methods/events can be used here.

```tsx
import { Element } from '@stencil/core';

...
export class TodoList {
|  @Element() todoListEl: HTMLElement;

  addClass(){
    this.todoListEl.classList.add('active');
  }
}
```

## Embedding or Nesting Components

Components can be composed easily by adding the HTML tag to the JSX code. Since the components are just HTML tags, nothing needs to be imported to use a Stencil component within another Stencil component.

Here's an example of using a component within another component:

```tsx
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

```tsx
import { Component } from '@stencil/core';

@Component({
  tag: 'my-parent-component'
})
export class MyParentComponent {

  render() {
    return (
      <div>
|        <my-embedded-component color="red"></my-embedded-component>
      </div>
    );
  }
}
```

The `my-parent-component` includes a reference to the `my-embedded-component` in the `render()` function.
