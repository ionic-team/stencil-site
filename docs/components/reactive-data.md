---
title: Reactive Data, Handling arrays and objects
sidebar_label: Reactive Data
description: Reactive Data, Handling arrays and objects
slug: /reactive-data
contributors:
  - jthoms1
---

# Reactive Data

Stencil components update when props or state on a component change. For performance and simplicity, Stencil only compares references for changes, and will not rerender when data inside of an array or object changes.


## Rendering methods

When a component updates because of a state change (props or state change), the [`render()`](templating-jsx) method is scheduled to run.


## Watch Decorator

`Watch` will fire the method it's attached to when a user updates a property, or when an internal state member changes. That method will receive the new value of the prop/state, along with the old value. `Watch` is useful for validation or the handling of side effects. The `Watch` decorator does not fire when a component initially loads.


```tsx
import { Prop, State, Watch } from '@stencil/core';

export class LoadingIndicator {
  @Prop() activated: boolean;
  @State() busy: boolean;

  @Watch('activated')
  watchPropHandler(newValue: boolean, oldValue: boolean) {
    console.log('The new value of activated is: ', newValue);
  }
  
  @Watch('busy')
  watchStateHandler(newValue: boolean, oldValue: boolean) {
    console.log('The new value of busy is: ', newValue);
  }
}
```


## Handling arrays and objects

To update array or object data, use the following techniques, which are fast-becoming a core part of the modern JavaScript  toolbox.

### Updating arrays

For arrays, the standard mutable array operations such as `push()` and `unshift()` won't trigger a component update. Instead, non-mutable array operators should be used as they return a copy of a new array. These include `map()` and `filter()`, and the ES6 spread operator syntax.

For example, to push a new item to an array, create a new array with the existing values and the new value at the end:

```tsx
@State() items: string[];

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

```tsx
@State() myCoolObject;

// our original object
this.myCoolObject = {first: '1', second: '2'}

// update our object
this.myCoolObject = { ...myCoolObject, third: '3' }
```
