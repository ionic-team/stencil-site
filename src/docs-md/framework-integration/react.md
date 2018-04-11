# React

With an application built using the `create-react-app` script, there are two options available that could be used to integrate Stencil built component collections.

1. Eject the project ~OR~
1. [Use the `public` folder](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#using-the-public-folder)

In this guide, we opt for the latter of the two options. This is a three-step process:

1. Get the component collection(s), for example from NPM
1. Copy the collection(s) to `public/static/js`
1. Import the collection(s) in `index.js`

## Copying the Collection(s) to `public`

The React build process will automatically copy anything that is under the `public` folder to the `build` folder. The easiest way to copy the component collection(s) is to set up the npm `postinstall` script to do the copy after the packages are installed for the project.

**Note:** the default React webpack configuration results in webpack bundles being built in `build/static/js`, so the component collections need to be copied into `public/static/js`. You may want to pre-create this directory and create a `.gitkeep` file in it to make sure the path exists.

The following is a simple example of a `postinstall` script in the `package.json` file. It copies the components from a single collection that was obtained via NPM. This example only works on Unix-like operating systems such as Linux or MacOS. If you need to support multiple operating systems or do anything more complicated, then you can create a NodeJS script that performs the operations and call that as your `postinstall` script.

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "postinstall": "cp -R node_modules/my-components/mycomponents public/static/js"
  }
```

**Note:** for the above example, you may also want to add a `/public/static/js/mycomponents` line to your `.gitignore` file.

## Importing the Component Package(s)

A component collection built with Stencil includes a main script that is used to load the components in the collection. That script needs to be loaded in your application by importing it in your `index.js` file (or some other appropriate file) as such:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'test-components/testcomponents';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
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
