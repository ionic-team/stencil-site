---
title: Functional Components
description: Functional Components
url: /docs/functional-components
contributors:
  - simonhaenisch
---

# Working with Functional Components

Functional components are quite different to normal Stencil web components because they are a part of Stencil's JSX compiler. A functional component is basically a function that takes an object of props and turns it into JSX.

```tsx
const Hello = props => <h1>Hello, {props.name}!</h1>;
```

When the JSX transpiler encounters such a component, it will take its attributes, pass them into the function as the `props` object, and replace the component with the JSX that is returned by the function.

```tsx
<Hello name="World" />
```

Functional components also accept a second argument `children`.

```tsx
const Hello = (props, children) => [
  <h1>Hello, {props.name}</h1>,
  children
];
```

The JSX transpiler passes all child elements of the component as an array into the function's `children` argument.

```tsx
<Hello name="World">
  <p>I'm a child element.</p>
</Hello>
```

Stencil provides a `FunctionalComponent` generic type that allows to specify an interface for the component's properties.

```tsx
// Hello.tsx

import { FunctionalComponent, h } from '@stencil/core';

interface HelloProps {
  name: string;
}

export const Hello: FunctionalComponent<HelloProps> = ({ name }) => (
  <h1>Hello, {name}!</h1>
);
```

> When using a functional component in JSX, its name must start with a capital letter. Therefore it makes sense to export it as such.

There are a few major differences between functional components and class components. Since functional components are just syntactic sugar within JSX, they...

* aren't compiled into web components,
* don't create a DOM node,
* don't have a Shadow DOM or scoped styles,
* don't have lifecycle hooks,
* are stateless.

When deciding whether to use functional components, one concept to keep in mind is that often the UI of your application can be a function of its state, i. e., given the same state, it always renders the same UI. If a component has to hold state, deal with events, etc, it should probably be a class component. If a component's purpose is to simply encapsulate some markup so it can be reused across your app, it can probably be a functional component (especially if you're using a component library and thus don't need to style it).
