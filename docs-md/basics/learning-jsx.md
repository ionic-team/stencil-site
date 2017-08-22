# Learning JSX

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

In the case where a component has multiple "top level" elements, the `render` function must return an array. Note the comma in between the `<div>` elements.

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