---
title: Using JSX
description: Using JSX
url: /docs/templating-jsx
contributors:
  - jthoms1
  - simonhaenisch
  - arjunyel
---

# Using JSX

Stencil components are rendered using JSX, a popular, declarative template syntax. Each component has a `render` function that returns a tree of components that are rendered to the DOM at runtime.

## Basics

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

### Host Element

If you want to modify the host element itself, such as adding a class or an attribute to the component itself, use the `hostData()` function. Check for more details [here](host-element)


## Data Binding

Components often need to render dynamic data. To do this in JSX, use `{ }` around a variable:

```tsx
render() {
  return (
    <div>Hello {this.name}</div>
  )
}
```

> If you're familiar with ES6 template variables, JSX variables are very similar, just without the `$`:

```tsx
//ES6
`Hello ${this.name}`

//JSX
Hello {this.name}
```


## Conditionals

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

**Please note:** Stencil reuses DOM elements for better performance. Consider the following code:

```tsx
{someCondition
  ? <my-counter initialValue={2} />
  : <my-counter initialValue={5} />
}
```

The above code behaves exactly the same as the following code:

```tsx
<my-counter initialValue={someCondition ? 2 : 5} />
```

Thus, if `someCondition` changes, the internal state of `<my-counter>` won't be reset and its lifecycle methods such as `componentWillLoad()` won't fire. Instead, the conditional merely triggers an update to the very same component.

If you want to destroy and recreate a component in a conditional, you can assign the `key` attribute. This tells Stencil that the components are actually different siblings:

```tsx
{someCondition
  ? <my-counter key="a" initialValue={2} />
  : <my-counter key="b" initialValue={5} />
}
```

This way, if `someCondition` changes, you get a new `<my-counter>` component with fresh internal state that also runs the lifecycle methods `componentWillLoad()` and `componentDidLoad()`.


## Slots

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

## Loops

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

If your list is dynamic, i. e., it's possible to change, add, remove or reorder items, you should assign a unique `key` to each element to give it a stable identity. This enables Stencil to reuse DOM elements for better performance. The best way to pick a key is to use a string that uniquely identifies that list item among its siblings (often your data will already have IDs).

```tsx
render() {
  return (
    <div>
      {this.todos.map((todo) =>
        <div key={todo.uid}>
          <div>{todo.taskName}</div>
          <div>{todo.isCompleted}</div>
          <button onClick={() => this.remove(todo)}>X</button>
        </div>
      )}
    </div>
  )
}
```

Keys used within arrays should be unique among their siblings. However they don’t need to be globally unique.

## Handling User Input

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


## Complex Template Content

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

## Getting a reference to a dom element

In cases where you need to get a direct reference to an element, like you would normally do with `document.querySelector`, you might want to use a `ref` in JSX. Lets look at an example of using a `ref` in a form:

```tsx
@Component({
  tag: 'app-home',
})
export class AppHome {

  textInput!: HTMLInputElement;

  handleSubmit = (ev: Event) => {
    ev.preventDefault();
    console.log(this.textInput.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(el) => this.textInput = el as HTMLInputElement} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

In this example we are using `ref` to get a reference to our input `ref={(el) => this.textInput = el as HTMLInputElement}`. We can then use that ref to do things such as grab the value from the text input directly `this.textInput.value`.


## Avoid Shared JSX Nodes

The renderer caches element lookups in order to improve performance. However, a side effect from this is that the exact same JSX node should not be shared within the same renderer.

In the example below, the `sharedNode` variable is resued multiple times within the `render()` function. The renderer is able to optimize its DOM element lookups by caching the reference, however, this causes issues when nodes are reused. Instead it's recommended to always generate unique nodes like the changed example below.

```diff
@Component({
  tag: 'my-cmp',
})
export class MyCmp {

  render() {
-    const sharedNode = <div>Text</div>;
    return (
      <div>
-        {sharedNode}
-        {sharedNode}
+        <div>Text</div>
+        <div>Text</div>
      </div>
    );
  }
}
```

Alternatively, creating a factory function to return a common JSX node could be used instead since the returned value would be a unique instance. For example:

```
```tsx
@Component({
  tag: 'my-cmp',
})
export class MyCmp {

  getText() {
    return <div>Text</div>;
  }

  render() {
    return (
      <div>
        {this.getText()}
        {this.getText()}
      </div>
    );
  }
}
```
