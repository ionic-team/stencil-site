---
title: React Integration with Stencil
description: React Integration with Stencil
url: /docs/react
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
  - erikschierboom
---
# React

With an application built using the `create-react-app` script the easiest way to include the component library is to call `defineCustomElements(window)` from the `index.js` file.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// test-component is the name of our made up Web Component that we have
// published to npm:
import { defineCustomElements } from 'test-components/dist/loader';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
defineCustomElements(window);
```

## Usage Considerations

Note that React doesn't support custom properties and custom events by [nature](https://reactjs.org/docs/web-components.html).
So, consider adding [this react component]() into your project to enable web components in it.
After that, you can use any of your web components in your JSX markup passing custom properties to it.

```tsx
export const ExamplePage = (props) => {
  return (
    <WebComponent
      component="your-component-tag"
      myCustomProp={props.customProp}
      onMyCustomEvent={props.customEvent}
    >
  );
}
```

However, you can use webcomponents without that script. But note that all the custom properties need to be defined programmatically  `componentDidMount` and `componentDidUpdate`, accessing the component by a `ref` or getting the node by `document.querySelector`.

```tsx
import React, { Component } from 'react';

export class ExamplePage extends Component {
  myRef = React.createRef();
  
  componentDidMount() {
    this.myRef.current.myCustomProp = this.props.customProp;
    this.myRef.current.addEventListener('myCustomEvent', this.props.customEvent);
  }
  
  componentDidUpdate() {
    this.myRef.current.myCustomProp = this.props.customProp;
  }
  
  render() {
    return (
      <your-component-tag id="myComponent" ref={this.myRef} />
    );
  }
}
```
