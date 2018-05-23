# Using Stencil Built Web Components with Frameworks

In this section, we will outline the easiest way to integrate Stencil built web components into applications written using various popular frameworks.

## Angular

Using a Stencil built web component collection within an Angular CLI project is a four-step process. We need to:

1. Get the component collection(s), for example from NPM
1. Include the CUSTOM_ELEMENTS_SCHEMA in the modules that use the components
1. Import the packages in `app.module.ts` (or some other appropriate place)
1. Copy the component collection(s) during the build

### Including the Custom Elements Schema

Including the CUSTOM_ELEMENTS_SCHEMA in the module allows the use of the web components in the HTML markup without the compiler producing errors. Here is an example of adding it to `AppModule`:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import 'test-components/testcomponents';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

### Importing the Component Package(s)

A component collection built with Stencil includes a main script that is used to load the components in the collection. That script needs to be imported in your application as such (see full file listing above):

```ts
...
import 'test-components/testcomponents';
...
```

### Copying the Components

During the build, the components need to be copied to the build output directory. The easiest way to do this is to modify include the collection in the `assets` array of the `.angular-cli.json` file.

```
      "assets": [
        "assets",
        "favicon.ico",
        { "glob": "**/*", "input": "../node_modules/test-components/testcomponents", "output": "./testcomponents" }
      ],
```

## React

With an application built using the `create-react-app` script, there are two options available that could be used to integrate Stencil built component collections.

1. Eject the project ~OR~
1. [Use the `public` folder](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#using-the-public-folder)

In this guide, we opt for the latter of the two options. This is a three-step process:

1. Get the component collection(s), for example from NPM
1. Copy the collection(s) to `public/static/js`
1. Import the collection(s) in `index.js`

### Copying the Collection(s) to `public`

The React build process will automatically copy anything that is under the `public` folder to the `build` folder. The easiest way to copy the component collection(s) is to set up the npm `postinstall` script to do the copy after the packages are installed for the project.

> The default React webpack configuration results in webpack bundles being built in `build/static/js`, so the component collections need to be copied into `public/static/js`. You may want to pre-create this directory and create a `.gitkeep` file in it to make sure the path exists.

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

> For the above example, you may also want to add a `/public/static/js/mycomponents` line to your `.gitignore` file.

### Importing the Component Package(s)

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

<stencil-route-link url="/docs/router" router="#router" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/style-guide" custom="true">
  <button class='pull-right btn btn--primary'>
    Next
  </button>
</stencil-route-link>
