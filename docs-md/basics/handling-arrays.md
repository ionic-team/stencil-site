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

These methods all change the original array, but do not return new arrays. Mutating the original array will not trigger a view update in Stencil. But, returning a new copy of the array will. Below is an example of our recommended way to update an array:

```
// our original array
let originalArray = ['ionic', 'stencil', 'webcomponents'];

// update the array
originalArray = [
  ...originalArray,
  'awesomeness'
]
```

This example will return a new copy of the array with your updated field, which will trigger a view update. If you have not seen the `...originalArray` syntax before, this is a relatively new method called the spread operator added in ES2015 that you can read about [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).

### Updating an object

You can also use the spread operator to update objects. As with arrays, mutating an object will not trigger a view update in Stencil, but returning a new copy of the object will. Below is an example:

```
// our original object
let myCoolObject = {first: '1', second: '2'}

// update our object
myCoolObject = { ...myCoolObject, third: '3' }

```



