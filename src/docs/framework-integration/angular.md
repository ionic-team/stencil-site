---
title: Angular Integration with Stencil
description: Learn how to wrap your components so that people can use them natively in Angular.
url: /docs/angular
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
  - peterpeterparker
  - jeanbenitez
  - mburger81
  - splitinfinities
---

## Usage

You're now able to import your components into an Angular app and use them directly. Here's how the consumers of your Angular Component Library will use this code. 

### Adding the components to a module

Your component library consumers will be able to import your Angular components into your app's module by writing: 

```tsx
import { MyComponent } from 'angular-component-library';
import { SomeComponent } from './some.component';

@NgModule({
  imports: [MyComponent],
  declarations: [SomeViewComponent],
  exports: [SomeComponent]
})
export class SomeViewModule {}
```

Which will automatically define and run your components! 

### Usage in your templates

```html
&lt;my-component first=&quot;Stencil&quot; last=&quot;Compiler&quot;&gt;&lt;/my-component&gt;
```

### Considerations

Please note, you can create your own NgModule that can export and define all of your components, and encourage your customers to use that module within the imports property of their NgModules. There is a [Github issue](https://github.com/ionic-team/stencil-ds-output-targets/issues/207) to expand on this feature to align to single component angular modules (or SCAM). 

## FAQs

### What is the best format to write event names?

Event names shouldn’t include special characters when initially written in Stencil, try to lean on using camelCased event names for interoperability between frameworks. 

### How do I bind input events directly to a value accessor?

You can configure how your input events can map directly to a value accessor, allowing two-way data-binding to be a built in feature of any of your components. Take a look at [valueAccessorConfig's option below](). 

### How do I add IE11 or Edge support?

If you want your custom elements to be able to work on older browsers, you should add the `applyPolyfills()` that surround the `defineCustomElements()` function.

```tsx
import { applyPolyfills, defineCustomElements } from 'test-components/loader';
...
applyPolyfills().then(() => {
  defineCustomElements()
})
```

### How do I access components with ViewChild or ViewChildren?

Once included, components could be referenced in your code using `ViewChild` and `ViewChildren` as in the following example:

```jsx
import {Component, ElementRef, ViewChild} from '@angular/core';

import { TestComponent } from 'test-components';

@Component({
    selector: 'app-home',
    template: `<test-components #test></test-components>`,
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

    @ViewChild(TestComponent) myTestComponent: ElementRef<TestComponent>;

    async onAction() {
        await this.myTestComponent.nativeElement.testComponentMethod();
    }
}
```

### Why aren't my custom interfaces exported from within the index.d.ts file?

Usually when beginning this process, you may bump into a situation where you find that some of the interfaces you've used in your Stencil component library aren't working in your Angular component library. You can resolve this issue by adding an `interfaces.d.ts` file located within the root of your Stencil component library's project folder, then manually exporting types from that file e.g. `export * from './components';`

When adding this file, it's also recommended to update your package.json's types property to be the distributed file, something like: `"types": "dist/types/interfaces.d.ts"`

## API

The angularOutputTarget method accepts 5 parameters:

### componentCorePackage

The title of the Stencil package where components are available for consumers. This is used during compilation to write the correct imports for components e.g.

```js
import { IonApp } from '@ionic/core/components/ion-app.js'
```

### directivesProxyFile

This parameter allows you to name the file that contains all the component wrapper definitions produced during the compilation process. This is the first file you should import in your Angular project.

### includeDefineCustomElement
If `true`, React components will import and define elements from the `dist-custom-elements` build, rather than `dist`. 

### directivesArrayFile

Used to provide a list of type Proxies to the Angular Component Library. [See Ionic Framework for a sample](https://github.com/ionic-team/ionic-framework/blob/main/angular/src/directives/proxies-list.txt). 

### directivesUtilsFile

This is the file where helper functions for the component wrappers are defined. 

### valueAccessorConfigs

This lets you define which components should be integrated with ngModel (I.e. form components). It lets you set what the target prop is (I.e. `value`), which event will cause the target prop to change, and more. 

```jsx
const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['my-input[type=text]'],
    event: 'myChange',
    targetAttr: 'value',
    type: 'text',
  },
]; 

export const config: Config = {
  namespace: 'component-library',
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: 'component-library',
      directivesProxyFile: '{path to your proxy file}',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
  ],
};
```

### excludeComponents

This lets you exclude wrapping certain Web Components. This is useful if you need to write framework-specific versions of components. In Ionic Framework, this is used for routing components - like tabs - so that Ionic Framework can integrate better with Angular's Router.
