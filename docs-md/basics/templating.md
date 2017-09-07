# Templating

Stencil components are rendered using JSX, a popular, declarative template syntax. Each component has a `render` function that returns the JSX content.

#### Basics

The render functions returns something very similar to HTML

```typscript
render() {
  return (
    <div>Hello World</div>
  )
}
```

Here we're returning a JSX representation of a `div`, with the inner content being "Hello World".


#### Data Binding

A common need of components is to render data that is based on a property.
Like many popular frameworks, we can use this with `{}`.

```typscript
render() {
  return (
    <div>Hello {this.name}</div>
  )
}
```

> A nice little hint is to think of the JSX databinding syntax as JavaScript template literals, just without the `$` in the front.

```
//ES6
`Hello ${this.name}`

//JSX
Hello {this.name}
```


### Conditionals

If want to conditionally render different content, we can simply use JavaScript if/else statements:
Here, if `name` is not defined, we can just render our a different element.

```jsx
render() {
  if (this.name) {
    return ( <div>Hello {this.name}</div> )
  } else {
    return ( <div>Hello, World</div> )
  }
}
```

A more complex example of this use JSX shorthand:

```jsx
render() {
  return (
    <div>
    {this.name
      ? <p>Hello {this.name}</p>
      : <p>Hello World</p>
    }
    </div>
  );
}
```
In this case, we need to render child components in the conditional.


### Loops

Looping/Iterables works just like it does in JavaScript.

In the example below, we're going to assume the component has a local property called `todos` which is a list of todo objects. We'll use the [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function on the array to loop over each item in the map, and to convert it to something else - in this case JSX.

```jsx
render() {
  return (
    <div>
      this.todos.map( todo => {
        <div>
          <div>{todo.taskName}</div>
          <div>{todo.isCompleted}</div>
        </div>
      })
    </div>
  )
}
```


### Handling User Input

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

An alternate syntax for this is to use

```jsx
  handleClick(event: UIEvent) {
    alert('Received the button click!');
  }

  render() {
    return (
      <button onClick={this.handleClick.bind(this)>Click Me!</button>
    );
  }
```

Both options are valid.



Here's another of listening to input `change`. Note the use of the [Arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

```jsx
...
export class MyComponent {
  inputChanged(event: UIEvent) {
    console.log('input changed: ', event.target.value);
  }

  render() {
    return (
      <input onChange={this.inputChanged.bind(this)}>
    );
  }
}
```


### Complex Template Content

So far we've seen examples of how to return only a single root element. We can also nest elements inside our root element just like regular HTML:

```jsx
render() {
  return (
  <div class="container">
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>
  );
}
```

In the case where a component has multiple "top level" elements, the `render` function can return an array.
Note the comma in between the `<div>` elements.

```jsx
render() {
  return ([
  // first top level element
  <div class="container">
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>,

  // second top level element, note the , above
  <div class="another-container">
    ... more html content ...
  </div>
  ]);
}
```
