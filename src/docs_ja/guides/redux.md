---
title: Redux
description: Redux
url: /docs/stencil-redux
contributors:
  - jthoms1
  - adamdbradley
  - corysmc
  - bitflower
---
Want to skip the tutorial and just check out the code? 
https://github.com/corysmc/ionic-pwa-stencil-redux
## What is Redux?

Redux is a state management library that separates app state and business logic from your view, and makes that state available across any of your stencil components, which makes it a great addition to stencil when building a PWA with stencil. For more info on Redux, [check out their docs](https://redux.js.org)

Although redux may feel like "a lot of boilerplate code" in scalable applications the benefits can outweigh the cost.

1. Redux Store: backbone of redux, includes callback functions to getState and "dispatch" functions to change state.
2. Redux Reducers: reducers manage a global state object
3. Redux Actions: functions that are called to change state.
4. mapStateToProps: used to map your reducer state to your existing components
5. mapDispatchToProps: used to map your redux actions to your existing components.

For more info on Redux, [check out their docs](https://redux.js.org)

## 1. Install dependencies:

- init stencil project `npm init stencil`
- redux `npm i redux`
- stencil redux `npm i @stencil/redux`
- redux Devtools Extension (optional) `npm i redux-devtools-extension`
- redux thunk (optional) `npm i redux-thunk`

## 2. Type your Redux store

> Having a strongly typed reducer will really speed up development in the future, especially if and when your application structure changes. Here’s an example of how to set the types for your root reducer.

```tsx
// src/interfaces.d.ts

interface UserState {
  name: string;
}

interface MyAppState {
  user: UserState;
}
```

## 3. Create store

```tsx
// /src/store/index.ts

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

export const configureStore = (preloadedState: Partial<MyAppState>) =>
  createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  );
```

## 4. Create reducers

Reducers are a way to separate your app logic. Redux has a function to combine these separate states into one using 'combineReducers'. Your root reducer will look something like this:

```tsx
// /src/store/reducers/index.ts

import user from "./user";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  user
});

export default rootReducer;
```

Your user reducer might look something like this:

```tsx
// /src/store/reducers/user.ts

const getInitialState = (): UserState => {
  return {
    name: "StencilJS"
  };
};

const user = (
  state = getInitialState(),
  action: any /*for now...*/
): UserState => {
  switch (action.type) {
    // here's where we handle actions
  }
  return state;
};

export default user;
```

## 5. Initialize Store

Initialize the store from within your root component. The store can then be accessed from within other components, which will be shown in the next step.

```tsx
// /src/components/app-root/app-root.tsx
import "@stencil/redux";
import { Component, Prop, State, h } from "@stencil/core";
import { Store } from "@stencil/redux";
import { configureStore } from "../../store";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css"
})
export class MyApp {
  @State()
  name: MyAppState["user"]["name"];

  @Prop({ context: "store" })
  store: Store;

  async componentWillLoad() {
    this.store.setStore(configureStore({}));
    this.store.mapStateToProps(this, (state: MyAppState) => {
      const {
        user: { name }
      } = state;
      return {
        name
      };
    });
  }

  render() {
    return (
      <div>
        Hello, my name is {this.name}
        <p>
          <my-name-input-component />
        </p>
      </div>
    );
  }
}
```

You can now see `Hello, my name is StencilJS`, and that data is coming from your redux store!!
Next lets access that state from within a child component.

## 6. mapStateToProps within your components

To access the store from within any of your child components you need to use the context api to access the store.

> ⚠️ Warning the `context` api will be deprecated soon, at which point these docs will be updated... but for now this is the correct way to include the redux store in each component.

```tsx
// /src/components/my-name-input-component/my-name-input-component.tsx
import { Component, State, Prop, h } from "@stencil/core";
import { Store, Unsubscribe } from "@stencil/redux";

@Component({
  tag: "my-name-input-component",
  styleUrl: "name-input-component.css"
})
export class NameInputComponent {
  storeUnsubscribe: Unsubscribe;

  @State()
  name: MyAppState["user"]["name"];

  @Prop({ context: "store" })
  store: Store;

  componentWillLoad() {
    this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
      const {
        user: { name }
      } = state;
      return {
        name
      };
    });
  }

  componentDidUnload() {
    this.storeUnsubscribe();
  }

  render() {
    return <p>{this.name}</p>;
  }
}
```

Notice above we are:

1. Creating a state variable
2. Mapping that state variable to our redux store
3. Displaying it in the render function.
4. Unsubscribing to the state changes when the component unloads.

> Note that the order you return your variables **does** matter within the mapStateToProps function, they will be mapped in the order you return them.

Next we want to change the name `StencilJS` and update our state to reflect that new name across our app. Changing state happens via actions. First we're going to create types for our actions...

## 7. Type your actions

```tsx
// /src/store/actions/index.ts
import { SetUserName } from "./user";

export interface NullAction {
  type: TypeKeys.NULL;
}

// Keep this type updated with each known action
export type ActionTypes = NullAction | SetUserName;

export enum TypeKeys {
  // Won't match anything
  NULL = "NULL",
  ERROR = "ERROR",
  SET_USER_NAME = "SET_USER_NAME"
}
```

## 8. Create Actions

Typically you'll have an action file for each reducer, as shown below:

```tsx
// /src/store/actions/user.ts
import { TypeKeys } from "./index";

export interface SetUserName {
  type: TypeKeys.SET_USER_NAME;
  name: string;
}

export const setUserName = (name: string) => (dispatch, _getState) => {
  const action: SetUserName = {
    type: TypeKeys.SET_USER_NAME,
    name
  };
  dispatch(action);
};
```

## 9. mapDispatchToProps to call functions that change state

We can now call that action from within a component.

```tsx
// /src/components/pages/my-user-info-page.tsx
import { Component, State, Prop, h } from "@stencil/core";
import { Store } from "@stencil/redux";
import { setUserName } from "../../../store/actions/user";

@Component({
  tag: "my-name-input-component"
  // styleUrl: "name-input-component.css"
})
export class NameInputComponent {
  storeUnsubscribe: Unsubscribe;
  setUserName: typeof setUserName;

  @State()
  name: MyAppState["user"]["name"];

  @Prop({ context: "store" })
  store: Store;

  componentWillLoad() {
    this.store.mapDispatchToProps(this, { setUserName });
    this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
      const {
        user: { name }
      } = state;
      return {
        name
      };
    });
  }

  componentDidUnload() {
    this.storeUnsubscribe();
  }

  render() {
    return (
      <div>
        <p>{this.name}</p>
        <input
          value={this.name}
          onInput={e => this.setUserName((e.target as any).value)}
        />
      </div>
    );
  }
}
```

1. Import the action
2. Add the action and type it using `typeof`
3. Use mapDispatchToProps to map action to component class

If you're using redux devtools, you can now see that the action is being emitted each time you type into the input. The last step is to handle those actions to change your app state.

## 10. handling actions to mutate your app state

Back to our user reducer we'll import `ActionTypes` and handle the action.

```tsx
// /src/store/reducers/user.ts
import { ActionTypes, TypeKeys } from "./../actions/index";

const getInitialState = (): UserState => {
  return {
    name: "StencilJS"
  };
};

const user = (state = getInitialState(), action: ActionTypes): UserState => {
  switch (action.type) {
    case TypeKeys.SET_USER_NAME: {
      return { ...state, name: action.name };
    }
  }
  return state;
};

export default user;
```

With that you've create a store, set the default state, mapped that state to your view components, emitted an action, updated the redux store, which triggered a re-render!!! 

### Other Resources

- Intro to Redux by Josh Morony https://www.youtube.com/watch?v=BccpaouJuxA
- State Management with Redux in Ionic & StencilJS: Loading Data by Josh Morony https://www.joshmorony.com/state-management-with-redux-in-ionic-stenciljs-loading-data/
