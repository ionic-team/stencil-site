---
title: React Intergration with Stencil
description: React Intergration with Stencil
url: /docs/react
contributors:
  - jthoms1
  - adamdbradley
---
# React

With an application built using the `create-react-app` script the easiest way to include the component library is to call `defineCustomElements(window)` from the `index.js` file.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { defineCustomElements } from 'test-components';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
defineCustomElements(window);
```
