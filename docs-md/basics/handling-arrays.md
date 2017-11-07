# Handling arrays and objects

Stencil components update when props or state on a component change. For performance and simplicity, Stencil only compares references for changes, and will not re-render when data inside of an array or object changes.

To update array or object data, use the following techniques which are fast-becoming a core part of the modern JavaScript  toolbox.

### Updating arrays

For arrays, this means that the standard mutable array operations such as `push()` and `unshift()` won't work. Instead, non-mutable array operators such as `map()` and `filter()`, and the ES6 spread operator syntax, should be used as they return a copy of a new array.

For example, to push a new item to an array, create a new array with the existing values and the new value at the end:

```
// our original array
this.items = ['ionic', 'stencil', 'webcomponents'];

// update the array
this.items = [
  ...this.items,
  'awesomeness'
]
```

This example will return a new array, consisting of all the elements of the
original Ray plus one additional element. Setting a `@State` field to such a new
array will trigger a view update.

The `...this.items` syntax is a relatively new feature of JavaScript that "expands" the given object in place. Read more about the Spread operator [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).

For removing elements from an array, consider using a combination of the array
`.slice()` method, potentially with the spread operator to build up a new array
with the desired element(s) omitted.

For updating an element of an array, consider a combination of array spread and
objects spread (described in the next section) to construct a new array which
contains mostly the same elements as the previous array, but with one element
replaced:

```typescript
    const todo =  // the one I want to change
    const newTodos = [...this.todos]; // shallow copy of the array
    const index = newTodos.indexOf(todo);
    newTodos[index] = { ...todo, completed: true };
    this.todos = newTodos; // re-render efficiently
```

### Updating an object

The spread operator should also be used to update objects. As with arrays, mutating an object will not trigger a view update in Stencil, but returning a new copy of the object will. Below is an example:

```
// our original object
let myCoolObject = {first: '1', second: '2'}

// new object, like the old object but with a property added or changed
myCoolObject = { ...myCoolObject, third: '3' }

```

<stencil-route-link url="/docs/forms" router="#router" custom="true" class="backButton">
  Back
</stencil-route-link>

<stencil-route-link url="/docs/testing" custom="true" class="nextButton">
  Next
</stencil-route-link>
