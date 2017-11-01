# Using Webpack with web components built with Stencil

Many applications are built using Webpack. Stencil provides a Webpack plugin that makes it easy to include web components that have been built using Stencil in your Webpack built application.

## Using the Plugin

Using the Stencil Webpack Plugin is a two-step process. You must import the collections you are using into your project code at some appropriate location depending on the architecture of your application, and you must update the `webpack.config.js` file to call the plugin which will copy the required files to the output directory for your application.

### Importing the Collections

In order to use your component collections within an application, you generally have to import them in some manner. This will result in Webpack adding the appropriate Stencil loader scripting to the appropriate bundle.

#### Angular

In an Angular application, you should add the component collection imports to the `app.module.ts` file. You should also make sure you are using the `CUSTOM_ELEMENTS_SCHEMA` as in the following example.

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
 
import { AppComponent } from './app.component';
 
import 'accounting-components';
import 'payroll-components';
import 'purchasing-components';
import 'web-components';
 
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

### Updating `webpack.config.js`

Once you have the proper Stencil loader scripts bundling with your project, you need to have the collections copied to a known location in the build output so the Stencil loader can load them as needed. This is where the Stencil Webpack Plugin is used.

After installing the plugin, modify your `webpack.config.js` file as such:

```js
const stencil = require('@stencil/webpack');

...


  "plugins": [
    new stencil.StencilPlugin({
      collections: [
        'node-modules/accounting-components/dist/accountingcomponents',
        'node-modules/payroll-components/dist/payrollcomponents',
        'node-modules/purchasing-components/dist/purchasingcomponents',
        'node-modules/web-components/dist/webcomponents'
    ]}),

```

The plugin constructor takes a configuration object. At this time, the only property in this object is the `collections` property. A configuration object is used rather than a sipmle list of files in order to support the easy addition of options in the future.

The `collections` property contains an array of component collections you would like to use. If you only have one collection, you can specify just a string instead of an array of strings.

The component collections do not have to be installed in `node-modules` if you do not want to publish them to an NPM registry (though publishing them to either the public registry or to a private registry is suggested). You could, for example, install them in a `web-components` directory if you so desired. Manually copying the component collections as such is beyond the scope of this document.

Once you have this set up, a build (`npm run build` for example) will copy the components to a `build` directory under the output directory for the build following usual Stencil conventions.

**Important:** If you are in an Angular CLI project, you must first eject the project in order to modify the `webpack.config.js` file.


<stencil-route-link url="/docs/distribution" router="#router" custom="true" class="backButton">
  Back
</stencil-route-link>

<stencil-route-link url="/docs/routing" custom="true" class="nextButton">
  Next
</stencil-route-link>
