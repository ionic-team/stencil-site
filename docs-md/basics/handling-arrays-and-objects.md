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

// change the array
originalArray.push('awesomeness');

// trigger a view update
originalArray = originalArray.slice();
```

`Array.slice()` will return a new copy of the array, which will trigger a view update.

