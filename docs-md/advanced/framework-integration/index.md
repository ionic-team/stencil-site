# Using Stencil Built Web Components with Frameworks

In this section, we will outline the easiest way to integrate Stencil built web components into applications written using various popular frameworks.

## Angular

Using a Stencil built web component collection within an Angular CLI project is a four-step process. We need to:

1. Get the component collection(s), for example from NPM
1. Include the CUSTOM_ELEMENTS_SCHEMA in the modules that use the components 
1. Include the load script(s) in `index.html`
1. Copy the component collection(s) during the build

### Including the Custom Elements Schema

Including the CUSTOM_ELEMENTS_SCHEMA in the nodule allows the use of the web components in the HTML markup without the compiler producing errors. Here is an example of adding it to `AppModule`:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
 
import { AppComponent } from './app.component';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
```

### Including the Load Script

A component collection built with Stencil includes a main script that is used to load the components in the collection. That script needs to be loaded in your application as such:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Test Component Usage</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <script src='test-components/testcomponents.js'></script>
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

### Copying the Components

During the build, the components need to be copied to the build output directory. The easiest way to do this is to modify include the collection in the `assets` array of the `.angular-cli.json` file.

```
      "assets": [
        "assets",
        "favicon.ico",
        { "glob": "**/*", "input": "../node_modules/test-components", "output": "./test-components" }
      ],
```

## React

With an application built using the `create-react-app` script, there are two options available that could be used to integrate Stencil built component collections.

1. Eject the project ~OR~
1. [Use the `public` folder](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#using-the-public-folder)

In this guide, we opt for the latter of the two options. This is a three-step process:

1. Get the component collection(s), for example from NPM
1. Copy the collection(s) to `public`
1. Include the load script(s) in `index.html`

### Copying the Collection(s) to `public`

The React build process will automatically copy anything that is under the `public` folder to the `build` folder. The easiest way to copy the component collection(s) is to set up the npm `postinstall` script to do the copy after the packages are installed for the project.

The following is a simple example of a `postinstall` script in the `package.jsom` file. It copies the components from a single collection that was obtained via NPM. This example only works on Unix-like operating systems such as Linux or MacOS. If you need to support multiple operating systems or do anything more complicated, then you can create a NodeJS script that performs the operations and call that as your `postinstall` script.

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "postinstall": "cp -R node_modules/my-components public"
  }
```

**Note:** for the above example, you may also want to add a `/public/my-components` line to your `.gitignore` file.

### Including the Load Script

A component collection built with Stencil includes a main script that is used to load the components in the collection. That script needs to be loaded in your application by including it in your `pubic/index.html` file as such:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <script src='%PUBLIC_URL%/my-components/mycomponents.js'></script>
    <title>Test Components in React</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
  </body>
</html>
```

<stencil-route-link url="/docs/distribution" router="#router" custom="true">
  <button class='backButton'>
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/css-variables" custom="true">
  <button class='nextButton'>
    Next
  </button>
</stencil-route-link>