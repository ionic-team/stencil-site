---
title: Stencil Redux
description: Stencil Redux is a simple connector for Stencil-built web components.
url: /docs/redux
contributors:
  - jthoms1
---

# Stencil Redux

A simple redux connector for Stencil-built web components inspired by react-redux.

## Usage

Stencil Redux uses the official redux library underneath, so much of the creation and configuration of the store, along with specifying reducers and middleware, is identical.

### Configure store

```tsx
// src/store/index.ts
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Add-on you might want
import logger from 'redux-logger'; // Add-on you might want
import rootReducer from '../reducers/index';

const configureStore = (preloadedState: any) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));

export { configureStore };
```

### Configure reducers

```tsx
// src/reducers/index.ts
import myReducer from './myReducer';

import { combineReducers } from 'redux';

const rootReducer = (combineReducers as any)({
  myReducer
});
  
export default rootReducer;
```

### Configure Store in Root Component

```tsx
import { Store } from '@stencil/redux';
import { configureStore } from '../../store/index'; // index required due to bug

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {
  @Prop({ context: 'store' }) store: Store;

  componentWillLoad() {
    this.store.setStore(configureStore({}));
  }
}
```

### Map state and dispatch to props
```tsx
import { Store, Action } from '@stencil/redux';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss'
})
export class MyComponent {
  @Prop({ context: 'store' }) store: Store;
 
  @State() name: string;
 
  changeName: Action;
  
  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      const {
        myReducer: { name }
      } = state;
      return {
        name
      }
    });
   
    this.store.mapDispatchToProps(this, {
      changeName
    })
  }
 
  doNameChange(newName: string) {
    this.changeName(newName);
  }
}
```
