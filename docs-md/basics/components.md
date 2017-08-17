# Creating My First Stencil Component

Create Stencil components by creating a file with a `.tsx` extension, such as `my-first-component.tsx`, and place them in the `src/components` directory. The `.tsx` extension is required since Stencil components are built using [JSX](https://facebook.github.io/react/docs/introducing-jsx.html).

Here is an example of what a Stencil component look like:

```jsx
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

## My First Stencil Component Details

So what's really going on here?

For starters, at the top of the component, there are a few `imports` from the `@stencil/core` package. These imports are what pull in the `@Component()` and `@Prop()` decorators so TypeScript knows about it.

The `@Component()` decorator is used to metadata about the component to the compiler. Use the `tag` property to specify the name of the HTML Tag/Element. The `styleUrl` property can be used to provide a relative path to a `.scss` file for providing the component's css.

Below the `@Component()` decorator, we have an ES2015 class. This is where you'll write the bulk of your code to bring your Stencil component to life. Here is where you'd write functions or provide business logic.

Each Component class must implement a `render` function. This function is used to write `JSX` to provide the HTML mark-up for the component. In our simple case above, we are simply rendering a `<p>` tag with basic content it in, and using one-way data binding to render the value of the `name` property on the class.

The `name` property on the ES2015 class is special in the sense that is decorated with a `@Prop()` decorator. To those coming from a [ReactJS](https://facebook.github.io/react/) background, `@Prop()` should be very familiar. When something is decorated with the `@Prop()` decorator, it tells that compiler that the property is a part of the public API of the component, and can be set on the element. An example of this is setting the `name` field on the `my-first-component` element above.

Any property decorated with `@Props()` is also automatically watched for changes. If we were to change our `my-first-component` element's `name` property at runtime, the `render` function would automatically be called, ensuring that our rendered content is always up to date. Likewise, if the ES2015 property `name` is changed programmatically, the `render` function will be called as well.

# JSX Basics

Stencil components are rendered using JSX, a popular, declarative template syntax. Each component has a `render` function that returns the JSX content.

## If Else Conditional Logic

The example below uses a basic if-else statement to determine what to render.

```jsx
render() {
  if (this.name) {
    return (<p>
      Hello, my name is {this.name}
    </p>);
  } else {
    return (<p>
      Hello, World
    </p>);
  }
}
```

Go ahead and toggle the `name` property on the `my-first-component` element. Different content will be rendered conditionally.

## Loops

Looping (for loops, while loops) works just like it does in javascript.

In the example below, we're going to assume the component has a local property called `todos` which is a list of todo objects. We'll use the [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function on the array to loop over each item in the map, and to convert it to something else - in this case JSX.

```jsx
render() {
  const todosHtml = this.todos.map((todo: any) => {
    return (
      <div>
        <div>{todo.taskName}</div>
        <div>{todo.isCompleted}</div>
      </div>
    );
  });
  return todosHtml;
}
```

Each item in the `this.todos` list is looped over, and `JSX` is returned for it. The array of JSX content is then returned.

## Handling User Input

Stencil uses native [DOM events](https://developer.mozilla.org/en-US/docs/Web/Events).

Here's an example of handling a button click. Note the use of the [Arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

```jsx
...
export class MyComponent {
  handleClick(event: UIEvent) {
    alert('Received the button click!');
  }

  render() {
    return (
      <button onClick={ (event: UIEvent) => this.handleClick(event)}>Click Me!</button>
    );
  }
}
```

Here's another of listening to input `change`. Note the use of the [Arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

```jsx
...
export class MyComponent {
  inputChanged(event: UIEvent) {
    console.log('input changed: ', event.target.value);
  }

  render() {
    return (
      <input onChange={ (event: UIEvent) => this.inputChanged(event)}>
    );
  }
}
```

## Complex Template Content

In the example above, there is only a single element, a `<p>` tag, rendered. Tags are nestable just like in standard HTML.

```
render() {
  return (
  <div class="container">
    <ul>
      <li>Item #1</li>
      <li>Item #2</li>
      <li>Item #3</li>
    </ul>
  </div>
  );
}
```

In the case where a component has multiple "top level" elements, the `render` function must return an array.

```
render() {
  return ([
  // first top level element
  <div class="container">
    <ul>
      <li>Item #1</li>
      <li>Item #2</li>
      <li>Item #3</li>
    </ul>
  </div>,

  // second top level element, note the , above
  <div class="another-container">
    ... more html content ...
  </div>
  ]);
}
```

# Stencil Basics

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

Props are custom attribute/properties exposed publicly on the element that developers can provide values for. Children components should not know about or reference parent components, so Props should be used to pass data down from the parent to the child. Components need to explicitly declare the Props it expects to receive using the `@Prop()` decorator. Props can be a `number`, `string`, `boolean`, or even an `Object`. By default, when a member decorated with `@Prop()` decorator is set, the component will efficiently re-render.

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

```
<todo-list color="blue" favoriteNumber="24" isSelected="true"></todo-list>
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

## State Decorator

The `@State()` decorator is very similar to the `@Prop()` decorator except it is used for managing internal state instead of the public API. Decorating a class member with `@State()` will trigger efficient re-renders when the value is set, but it won't be accessible through the Element.

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

## Event Decorator and Event Emitters

To dispatch [Custom DOM events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) up for other components to handle, use the `@Event()` decorator.

```
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  @Event() todoCompleted: EventEmitter;

  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}

```

The code above will dispatch a custom DOM event called `todoCompleted`.

## Listen Decorator

The `Listen()` decorator is for listening and responding to DOM events from a child.

In the example below, assume that a child component, `TodoList`, emits a `todoCompleted` event using the `EventEmitter`.

```
import { Listen } from '@stencil/core';

...
export class TodoApp {

  @Listen('todoCompleted')
  todoCompletedHandler(event: CustomEvent) {
    console.log('Received the custom todoCompleted event: ', event.data);
  }
}
```

Handlers can also be registered for an event on a specific element. This is useful for listening to application-wide events. In the example below, we're going to listen for the escape key's keyup event.

```
import { Listen } from '@stencil/core';

...
export class TodoList {

  @Listen('body:keyup.escape')
  escapeKeyUp() {
    console.log('the escape key was clicked');
  }
}
```

## Life Cycle Events

Each Stencil Component can optionally receive life cycle notifications for the `componentWillLoad`, `componentDidLoad` and `componentDidUnload` events. Simply implement the method and Stencil will automatically call it.

`componentWillLoad` is the ideal time to do any necessary DOM manipulations before the view is rendered in the DOM.

```
...
export class TodoList {

  componentWillLoad() {
    console.log('The view is about to be rendered');
  }

  componentDidLoad() {
    console.log('The view has been rendered');
  }

  componentDidUnload() {
    console.log('The view has been removed from the DOM');
  }
}
```

## Change Detection

Stencil does not actively perform change detection. In order to trigger an efficient re-render, use the `@Prop` and `@State` decorators and set the value.

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
    this.completedTodos = completedTodos
  }
}
```

## Stencil Config

The `stencil.config.js` file is where all Stencil configuration happens.

Here's an example configuration:

```
exports.config = {
  publicPath: '/build',
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page'] },
    { components: ['app-marked', 'getting-started', 'basics-components', 'compiler-config', 'what-is', 'code-splitting', 'stencil-ssr', 'site-menu'] },
    { components: ['demos-page'] }
  ],
  collections: [
    { name: '@stencil/router'}
  ]
};
```

The `publicPath` field should start with a `/` and be the URL root that you intend to use for deployment. By default, it will be set to `/` which will work in most cases.

`bundles` is an array of objects that represent how components are grouped together in lazy-loaded bundles. It is important to note that every Stencil component be included in a bundle. In the example above, each object in the `bundles` array has it's own `components` array, which is the HTML tag name for each component. In general, the simplest approach is to give each component it's own bundle. A more advanced optimization would be grouping commonly used components together.

`collections` is a field to specify a list of 3rd party Stencil libraries. Since everything is Stencil is async and lazy loaded by default, it is important to NOT have any hard `import` statements linking components together. Any library listed in the list `collections` entry will be recognized and included in the application by the Stencil compiler. By default, the `@Stencil/router` will be included.

