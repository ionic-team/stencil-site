---
title: Angular Integration with Stencil
description: Angular Integration with Stencil
url: /docs/angular
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
  - peterpeterparker
  - jeanbenitez
  - mburger81
---

# Angular

Using a Stencil built web component collection within an Angular CLI project is a two-step process. We need to:

1. Include the `CUSTOM_ELEMENTS_SCHEMA` in the modules that use the components.
2. Call `defineCustomElements(window)` from `main.ts` (or some other appropriate place).

## Including the Custom Elements Schema

Including the `CUSTOM_ELEMENTS_SCHEMA` in the module allows the use of the web components in the HTML markup without the compiler producing errors. This code should be added into the `AppModule` and in every other modules that use your custom elements.  
Here is an example of adding it to `AppModule`:

```tsx
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

The `CUSTOM_ELEMENTS_SCHEMA` needs to be included in any module that uses custom elements.

## Calling defineCustomElements

A component collection built with Stencil includes a main function that is used to load the components in the collection. That function is called `defineCustomElements()` and it needs to be called once during the bootstrapping of your application. One convenient place to do this is in `main.ts` as such:

```tsx
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Note: loader import location set using "esmLoaderPath" within the output target confg
import { defineCustomElements } from 'test-components/dist/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
defineCustomElements(window);
```

## Edge and IE11 polyfills

If you want your custom elements to be able to work on older browsers, you should add the `applyPolyfills()` that surround the `defineCustomElements()` function.

```tsx
import { applyPolyfills, defineCustomElements } from 'test-components/loader';
...
applyPolyfills().then(() => {
  defineCustomElements(window)
})

```

## Accessing components using ViewChild and ViewChildren

Once included, components could be referenced in your code using `ViewChild` and `ViewChildren` as in the following example:

```tsx
import {Component, ElementRef, ViewChild} from '@angular/core';

import 'test-components';

@Component({
    selector: 'app-home',
    template: `<test-components #test></test-components>`,
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

    @ViewChild('test') myTestComponent: ElementRef<HTMLTestComponentElement>;

    async onAction() {
        await this.myTestComponent.nativeElement.testComponentMethod();
    }
}

```
