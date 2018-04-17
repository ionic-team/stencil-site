# Decorators

Stencil makes it easy to build rich, interactive components. Let's start with the basics.

- [component](#component)
- [prop](#prop)
- [watch](#watch)
- [state](#state)
- [method](#method)
- [element](#element)

<a name="component"></a>
## Component Decorator

Each Stencil Component must be decorated with an `@Component()` decorator from the `@stencil/core` package. In the simplest case, developer's must provide a HTML `tag` name for the component. Often times, a `styleUrl` is used as well, or even `styleUrls`, where multiple different style sheets can be provided for different application modes/themes.

Use a relative url to the `.css` file for the styleUrl(s).

```typescript
import { Component } from '@stencil/core';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.scss'
})
export class TodoList {
  ...
}
```

> Note, you can also link directly to `.scss` files

The component decorator also has a `host` option. This allows you to set CSS classes and attributes on the component you are building.

```typescript
import { Component } from '@stencil/core';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.scss',
  host: {
    theme: 'todo',
    role: 'list'
  }
})
```

When this component is used it will now have both the `todo` class and the `role` attribute automatically added.

```html
<todo-list class='todo' role='list'></todo-list>
```

<a name="prop"></a>
## Prop Decorator

Props are custom attribute/properties exposed publicly on the element that developers can provide values for. Children components should not know about or reference parent components, so Props should be used to pass data down from the parent to the child. Components need to explicitly declare the Props they expect to receive using the `@Prop()` decorator. Props can be a `number`, `string`, `boolean`, or even an `Object` or `Array`. By default, when a member decorated with a `@Prop()` decorator is set, the component will efficiently re-render.

```typescript
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

**Note:** in HTML, you must set attributes using dash-case:

```html
<todo-list color="blue" favorite-number="24" is-selected="true"></todo-list>
```

in JSX you set an attribute using camelCase:

```typescript
<todo-list color="blue" favoriteNumber="24" isSelected="true"></todo-list>
```

They can also be accessed via JS from the element.

```typescript
const todoListElement = document.querySelector('todo-list');
console.log(todoListElement.myHttpService); // MyHttpService
console.log(todoListElement.color); // blue
```

### Prop value mutability

It's important to know, that `@Prop` is _by default_ immutable from inside the component logic. Once a value is set by a user, the component cannot update it internally.

However, it's possible to explicitly allow a `@Prop` to be mutated from inside the component, by declaring it as **mutable**, as in the example below:

```typescript
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

Setting a default value on a `Prop`:

```typescript
import { Prop } from '@stencil/core';
...
export class NameElement {
  @Prop() name: string = 'Stencil';
}
```

To do validation of a prop, you can use the [watch](#watch) decorator:

```typescript
import { Prop, Watch } from '@stencil/core';
...
export class TodoList {
  @Prop() name: string = 'Stencil';

  @Watch('name')
  validateName(newValue: string, oldValue: string) {
    const isBlank = typeof newValue == null;
    const atLeast2chars = typeof newValue === 'string' && newValue.length >= 2;
    if (isBlank) { throw new Error('name: required') };
    if ( !atLeast2chars ) { throw new Error('name: atLeast2chars') };
  }
}
```

### Reflect Properties to Attributes

In some cases it may be useful to keep a property in sync with an attribute. In this case you can use the `reflectToAttr` option in the prop decorator:

```typescript
@Prop({
  reflectToAttr: true
})
```

<a name="watch"></a>
## Watch Decorator

When a user updates a property, `Watch` will fire what ever method it's attached to and pass that methd the new value of the prop along with the old value.


```typescript
import { Prop, Watch } from '@stencil/core';

export class LoadingIndicator {
  @Prop() activated: boolean;

  @Watch('activated')
  watchHandler(newValue: boolean, oldValue: boolean) {
    console.log('The new value of activated is: ', newValue);
  }
}
```

# Managing Component State

The `@State()` decorator can be used to manage internal data for a component. This means that a user cannot modify this data from outside the component, but the component can modify it how ever it sees fit. Any changes to a `@State()` property will cause the components render function to be called again.


```typescript
import { State } from '@stencil/core';

...
export class TodoList {
  @State() completedTodos: Todo[];

  completeTodo(todo: Todo) {
    // This will cause our render function to be called again
    this.completedTodos = [...this.completedTodos, todo];
  }

  render() {
    //
  }
}
```

<a name="method"></a>
## Method Decorator

The `@Method()` decorator is used to expose methods on the public API. Functions decorated with the `@Method()` decorator can be called directly from the element.

```typescript
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

```typescript
const todoListElement = document.querySelector('todo-list');
todoListElement.showPrompt();
```

<a name="element"></a>
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

## Embedding or Nesting Components

Components can be composed easily by simply adding the HTML tag to the JSX code. Since the components are just HTML tags, nothing needs to be imported to use a Stencil component within another Stencil component.

Here's an example of using a component within another component:

```typescript
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

```typescript
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

<stencil-route-link url="/docs/component-lifecycle" router="#router" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/events" custom="true">
  <button class="pull-right btn btn--primary">
    Next
  </button>
</stencil-route-link>
