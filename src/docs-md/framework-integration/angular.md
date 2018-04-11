# Angular

Using a Stencil built web component collection within an Angular CLI project is a four-step process. We need to:

1. Get the component collection(s), for example from NPM
1. Include the CUSTOM_ELEMENTS_SCHEMA in the modules that use the components
1. Import the packages in `app.module.ts` (or some other appropriate place)
1. Copy the component collection(s) during the build

## Including the Custom Elements Schema

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

## Importing the Component Package(s)

A component collection built with Stencil includes a main script that is used to load the components in the collection. That script needs to be imported in your application as such (see full file listing above):

```ts
...
import 'test-components/testcomponents';
...
```

## Copying the Components

During the build, the components need to be copied to the build output directory. The easiest way to do this is to modify include the collection in the `assets` array of the `.angular-cli.json` file.

```
      "assets": [
        "assets",
        "favicon.ico",
        { "glob": "**/*", "input": "../node_modules/test-components/testcomponents", "output": "./testcomponents" }
      ],
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
