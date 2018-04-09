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

The `...this.items` syntax is a relatively new feature of JavaScript that "expands" the given object in place. Read more about the Spread operator [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).

### Updating an object

The spread operator should also be used to update objects. As with arrays, mutating an object will not trigger a view update in Stencil, but returning a new copy of the object will. Below is an example:

```
// our original object
let myCoolObject = {first: '1', second: '2'}

// update our object
myCoolObject = { ...myCoolObject, third: '3' }

```

<stencil-route-link url="/docs/forms" router="#router" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/testing" custom="true">
  <button class="pull-right btn btn--primary">
    Next
  </button>
</stencil-route-link>
