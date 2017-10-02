# Handling arrays and objects

### Updating an array

JavaScript arrays can be mutated with the following methods:

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

These methods all change the original array, but do not return new arrays.
Mutating the original array will not trigger a view update in Stencil, as
explained in the previous documentation on change detection. But, returning a
new copy of the array will. Below is an example of our recommended way to append
an element to an array:

```
// our original array
let originalArray = ['ionic', 'stencil', 'webcomponents'];

// update the array
originalArray = [
  ...originalArray,
  'awesomeness'
]
```

This example will return a new array, consisting of all the elements of the
original Ray plus one additional element. Setting a `@State` field to such a new
array will trigger a view update.

If you have not seen the `...originalArray` syntax before, this is a relatively new JavaScript language feature, the spread operator. The spread operator was added in ES2015, and is documented in more detail [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).

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

You can also use the spread operator to update objects. As with arrays, mutating an object will not trigger a view update in Stencil, but returning a new copy of the object will. Below is an example:

```
// our original object
let myCoolObject = {first: '1', second: '2'}

// new object, like the old object but with a property added or changed
myCoolObject = { ...myCoolObject, third: '3' }

```
