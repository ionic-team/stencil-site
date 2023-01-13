---
title: 'Store'
description: Store
url: /docs/stencil-store
---

# @stencil/store

[Store](https://github.com/ionic-team/stencil-store) is a lightweight shared state library by the stencil core team. It implements a simple key/value map that efficiently re-renders components when necessary.

- Lightweight
- Zero dependencies
- Simple API, like a reactive Map
- Best performance

## Installation

```bash
npm install @stencil/store --save-dev
```

## Example

**store.ts:**

```tsx
import { createStore } from "@stencil/store";

const { state, onChange } = createStore({
  clicks: 0,
  seconds: 0,
  squaredClicks: 0
});

onChange('clicks', value => {
  state.squaredClicks = value ** 2;
});

export default state;
```

**component.tsx:**

```tsx
import { Component, h } from '@stencil/core';
import state from '../store';

@Component({
  tag: 'app-profile',
})
export class AppProfile {

  componentWillLoad() {
    setInterval(() => state.seconds++, 1000);
  }

  render() {
    return (
      <div>
        <p>
          <MyGlobalCounter />
          <p>
            Seconds: {state.seconds}
            <br />
            Squared Clicks: {state.squaredClicks}
          </p>
        </p>
      </div>
    );
  }
}

const MyGlobalCounter = () => {
  return (
    <button onClick={() => state.clicks++}>
      {state.clicks}
    </button>
  );
};
```

## API

### `createStore<T>(initialState)`

Create a new store with the given initial state. The type is inferred from `initialState`, or can be passed as the generic type `T`.

Returns a `store` object with the following properties.

### `store.state`

The state object is proxied, i. e. you can directly get and set properties and Store will automatically take care of component re-rendering when the state object is changed.

Note: [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) objects are not supported by IE11 (not even with a polyfill), so you need to use the `store.get` and `store.set` methods of the API if you wish to support IE11.

> As of Stencil v3, legacy browser support is deprecated, and will be removed in a future version major of Stencil.

### `store.on(event, listener)`

Add a listener to the store for a certain action.

### `store.onChange(propName, listener)`

Add a listener that is called when a specific property changes.

### `store.get(propName)`

Get a property's value from the store.

### `store.set(propName, value)`

Set a property's value in the store.

### `store.reset()`

Reset the store to its initial state.

### `store.use(...subscriptions)`

Use the given subscriptions in the store. A subscription is an object that defines one or more of the properties `get`, `set` or `reset`.


## Testing

Like any global state library, state should be reset between each spec test.
Use the `dispose()` API in the `beforeEach` hook.

```ts
import store from '../store';

beforeEach(() => {
  store.dispose();
});
```
