# Using JSX

Stencil components are rendered using JSX, a popular, declarative template syntax. Each component has a `render` function that returns a tree of components that are rendered to the DOM at runtime.

### Basics

The `render` function is used to output a tree of components that will be drawn to the screen.

```tsx
class MyComponent {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <p>This is JSX!</p>
      </div>
    );
  }
}
```

In this example we're returning the JSX representation of a `div`, with two child elements: an `h1` and a `p`.

### Data Binding

Components often need to render dynamic data. To do this in JSX, use `{ }` around a variable:

```tsx
render() {
  return (
    <div>Hello {this.name}</div>
  )
}
```

> If you're familiar with ES6 template variables, JSX variables are very similar, just without the `$`:

```
//ES6
`Hello ${this.name}`

//JSX
Hello {this.name}
```


### Conditionals

If we want to conditionally render different content, we can use JavaScript if/else statements:
Here, if `name` is not defined, we can just render a different element.

```tsx
render() {
  if (this.name) {
    return ( <div>Hello {this.name}</div> )
  } else {
    return ( <div>Hello, World</div> )
  }
}
```

Additionally, inline conditionals can be created using the JavaScript ternary operator:

```tsx
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

### Slots

Components often need to render dynamic children in specific locations in their component tree, allowing a developer to supply child content when using our component, with our component placing that child component in the proper location.

To do this, you can use the [Slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) tag inside of your `my-component`.

```tsx
// my-component.tsx

render() {
  return (
    <div>
      <h2>A Component</h2>
      <div><slot /></div>
    </div>
  );
}

```

Then, if a user passes child components when creating our component `my-component`, then `my-component` will place that
component inside of the second `<div>` above:

```tsx
render(){
  return(
    <my-component>
      <p>Child Element</p>
    </my-component>
  )
}
```

Slots can also have `name`s to allow for specifying slot output location:

```tsx
// my-component.tsx

render(){
  return [
    <slot name="item-start" />,
    <h1>Here is my main content</h1>,
    <slot name="item-end" />
  ]
}
```

```tsx
render(){
  return(
    <my-component>
      <p slot="item-start">I'll be placed before the h1</p>
      <p slot="item-end">I'll be placed after the h1</p>
    </my-component>
  )
}
```

### Loops

Loops can be created in JSX using either traditional loops when creating JSX trees, or using array operators such as `map` when inlined in existing JSX.

In the example below, we're going to assume the component has a local property called `todos` which is a list of todo objects. We'll use the [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function on the array to loop over each item in the map, and to convert it to something else - in this case JSX.

```tsx
render() {
  return (
    <div>
      {this.todos.map((todo) =>
        <div>
          <div>{todo.taskName}</div>
          <div>{todo.isCompleted}</div>
        </div>
      )}
    </div>
  )
}
```

Each step through the `map` function creates a new JSX sub tree and adds it to the array returned from `map`, which is then drawn in the JSX tree above it.

### Handling User Input

Stencil uses native [DOM events](https://developer.mozilla.org/en-US/docs/Web/Events).

Here's an example of handling a button click. Note the use of the [Arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

```tsx
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

An alternate syntax for this is to use the following:

```tsx
  handleClick(event: UIEvent) {
    alert('Received the button click!');
  }

  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>Click Me!</button>
    );
  }
```

Both options are valid.



Here's another example of listening to input `change`. Note the use of the [Arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

```tsx
...
export class MyComponent {
  inputChanged(event) {
    console.log('input changed: ', event.target.value);
  }

  render() {
    return (
      <input onChange={(event: UIEvent) => this.inputChanged(event)}>
    );
  }
}
```


### Complex Template Content

So far we've seen examples of how to return only a single root element. We can also nest elements inside our root element

In the case where a component has multiple "top level" elements, the `render` function can return an array.
Note the comma in between the `<div>` elements.

```tsx
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

It is also possible to use `innerHTML` to inline content straight into an element. This can be helpful when, for example, loading an svg dynamically and then wanting to render that inside of a `div`. This works just like it does in normal HTML:

```markup
<div innerHTML={svgContent}></div>
```

### Getting a reference to a dom element

In cases where you need to get a direct reference to an element, like you would normally do with `document.querySelector`, you might want to use a `ref` in JSX. Lets look at an example of using a `ref` in a form:

```tsx
@Component({
  tag: 'app-home',
})
export class AppHome{

  textInput: HTMLInputElement;

  handleSubmit = (ev: Event) => {
    ev.preventDefault();
    console.log(this.textInput.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(el: HTMLInputElement) => this.textInput = el} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

In this example we are using `ref` to get a reference to our input `ref={(el: HTMLInputElement) => this.textInput = el}`. We can then use that ref to do things such as grab the value from the text input directly `this.textInput.value`.

<stencil-route-link url="/docs/reactive-data" router="#router" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/styling" custom="true">
  <button class="pull-right btn btn--primary">
    Next
  </button>
</stencil-route-link>
