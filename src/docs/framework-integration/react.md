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
