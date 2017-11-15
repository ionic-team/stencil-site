# Using Stencil Built Web Components with Angular

Using a Stencil built web component collection within an Angular CLI project is a three step process. We need to:

1. Include the CUSTOM_ELEMENTS_SCHEMA in the `AppModule`
1. Include the load script in `index.html`
1. Copy the component collection during the build

## Including the Custom Elements Schema

Including the CUSTOM_ELEMENTS_SCHEMA allows the use of the web components in the HTML markup without the compiler producing errors.

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

## Including the Load Script

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

## Copying the Components

During the build, the components need to be copied to the build output directory. The easiest way to do this is to modify include the collection in the `assets` array of the `.angular-cli.json` file.

```
      "assets": [
        "assets",
        "favicon.ico",
        { "glob": "**/*", "input": "../web-components/test-components", "output": "./test-components" }
      ],
```

<stencil-route-link url="/docs/distribution" router="#router" custom="true" class="backButton">
  Back
</stencil-route-link>

<stencil-route-link url="/docs/routing" custom="true" class="nextButton">
  Next
</stencil-route-link>
