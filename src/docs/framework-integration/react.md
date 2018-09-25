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


<stencil-route-link url="/docs/distribution" router="#router" custom="true">
  <button class='pull-left btn btn--secondary'>
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/css-variables" custom="true">
  <button class='pull-right btn btn--primary'>
    Next
  </button>
</stencil-route-link>
