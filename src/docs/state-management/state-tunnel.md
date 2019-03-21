---
title: Stencil State Tunnel
description:
url: /docs/state-tunnel
contributors:
  - jthoms1
  - danawoodman
---

# Stencil State Tunnel

This project was built to provide additional functionality to developers working with stencil
components and sharing state across components and through slots. The API was inspired by React's Context.

There are many cases within component library where you will want to drill state down through props to children and children's children and so on. This project was created in order to alleviate the need for passing props deep through an application's component structure.

There is one use case where this tool makes sense.

**Building a collection of components** that need to share state but have no direct 'line of sight' between the component relationships (ie most likely from using `slot`).

If you are building an application then you would be better served using [stencil-redux](./redux.md)


1. [Create a Tunnel.](#1-create-a-tunnel)
2. [Pass state to the Tunnel's Provider Component.](#2-pass-state-to-the-tunnls-provider-component)
3. [Place your state consumption points.](#3-place-your-state-consumption-points)


## 1. Create a tunnel.

Define the structure of data to be passed through the tunnel. The first argument of [createProviderConsumer](createProviderConsumer) is a default value.
The first argument is the default value and the second argument is how the consumer works.  Mostly you will just need
to copy and paste this. 'context-consumer' is a component that is included in this package.


```tsx
// Filename: './data/message.tsx'

import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
  message: string,
  increment?: () => void
}

export default createProviderConsumer<State>({
    message: 'Hello!'
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);
```
<br/>

## 2. Pass state to the tunnel Provider Component.
Usually this will be at the top of your component tree. Think of this as a way to take state from the parent
component and then make it available to components further down the tree. That is essentially what the [Provider Component](Provider-Component) does.

```tsx
// Filename: './components/my-app.tsx'

import Tunnel from './data/message'; // Import the Tunnel

@Component({
  tag: 'my-app',
})
export class MyApp {

  @Prop() intro: string = 'Hello!';
  @State() message: string = '';

  count: number = 0;

  componentWillLoad() {
    this.increment();
  }

  increment = () => {
    this.count = this.count + 1;
    this.message = `${this.intro} ${this.count}`;
  }

  render() {
    const tunnelState = {
      message: this.message,
      increment: this.increment
    };
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>
        <Tunnel.Provider state={tunnelState}>
          <some-child-component/>
        </Tunnel.Provider>
      </div>
    );
  }
}
```
<br/>

## 3. Place your state consumption points.
You can then create an exit point anywhere within your component tree that lives below the `Tunnel.Provider`. In this case we are accessing the state using a [Consumer Component](Consumer-Component). There are other approaches to consuming the information but in most cases within an application you will use a Consumer Component.

```tsx
// Filename: './components/way-down-child.tsx'

import { Component } from '@stencil/core';
import Tunnel from './data/message'; // Import the tunnel

@Component({
  tag: 'way-down-child',
})
export class WayDownChild {
  render() {
    return (
      <Tunnel.Consumer>
        {({ message, increment }) => (
          <div class='app-profile'>
            <button onClick={increment}>Increment Num</button>
            <p>{message}</p>
          </div>
        )}
      </Tunnel.Consumer>
    );
  }
}
```
