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

# Angular Integration

#### Support: __Angular 12+__ • __TypeScript 4.0+__ • __Stencil v2.9.0+__

Stencil provides a wrapper for your custom elements to be used as first-class Angular components. The goal of a wrapper is to smooth over how Stencil’s code works within a framework. Wrappers provide a function that you can use within Stencil’s Output Targets to automatically create components for the targeted framework that wrap the web components you author in a Stencil project.

One benefit of the wrapper pattern includes improved maintainability since you are writing code once, and reusing it across frameworks. Another benefit of this pattern is that you can have first-class integration with your framework of choice. For example, with the Angular wrapper, you can bind input events directly to a value accessor for seamless integration in Angular’s bi-directional data flow. 

## Setup

### Project Structure

To organize the generated component libraries for different frameworks, we recommend using a monorepo structure. This monorepo will contain your Stencil component library as well as the component libraries for whatever frameworks you choose. The overall structure of a monorepo with Stencil and Angular component libraries might look something like this:

```
top-most-directory/
├── stencil-library/
│   ├── stencil.config.js
│   └── src/components
└── angular-workspace/
    └── projects/
        └── component-library/
            └── src/
                ├── lib/
                └── public-api.ts
```

### Create an Angular Component Library

First, we’ll create an Angular component library next to your Stencil component library. If you already have an Angular component library prepared, you can skip this step.

In your CLI tool of choice, install Angular’s CLI tools:

```bash
npm install -g @angular/cli
```

Next, you will create your Angular workspace and project. Ideally, this should be placed next to your Stencil project, so a monorepo structure is encouraged. 

```bash
ng new angular-workspace --no-create-application
cd angular-workspace
ng generate library component-library
```

### Create a Stencil Component Library

Your Stencil library will be the location that you write your web components. 

```bash
npm init stencil components stencil-library
```

### Install the Angular Output Target in your Stencil Component Library

Now that the project structure is set up, we can install the Angular Output Target package. This package contains the Angular wrapper function that we will use to generate our Angular wrapped components. To install the Angular Output Target package, run the following command in your Stencil project directory

`npm i @stencil/angular-output-target`

or

`yarn add @stencil/angular-output-target`

### Add the Angular Wrapper Function to your Stencil Component Library
With the Angular Output Target package installed, we can now configure our Stencil Component Library to build our Angular wrapped components. In the `stencil.config.ts` file of your Stencil component library, add the Angular wrapper function. 

Within your Stencil’s config file, you can import the Angular wrapper function for use within the outputTargets array. If you copy and paste this, ensure you update the “my-workspace” and “my-lib” to coincide with what you named your component library, as well as to update the `componentCorePackage` to the name of your Stencil component library.

```tsx
import { angularOutputTarget as angular } from '@stencil/angular-output-target';
export const config: Config = {
  namespace: 'demo',
  outputTargets: [
    angular({
      componentCorePackage: `your-stencil-library-name`,
      directivesProxyFile: `../your-angular-workspace-name/projects/your-angular-library-name/src/lib/stencil-generated/components.ts`
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
  ],
};
```

Once you have added this and have `directivesProxyFile` pointing to the correct directory of your Angular component library, you can build Stencil. 

`npm run build`

Or

`yarn build`

Once the build is complete, you will see new files in your Angular component library's directory!


```
top-most-directory/
├── stencil-library/
│   ├── stencil.config.js
│   └── src/components
└── angular-workspace/
    └── projects/
        └── component-library/
            └── src/
                ├── lib/
                │   └── stencil-generated/components.ts
                └── public-api.ts
```

### Add the components to your Angular project’s entry file (public-api.ts)

In order to make the generated files available to your Angular component library and it’s consumers, you’ll need to export everything from within your entry file - commonly the `public-api.ts` file. To do this, you’ll write:

```tsx
export * from './lib/stencil-generated/components.ts';
```

### Link your packages (optional)

If you’re using a monorepo tool like Lerna or Nx, you can skip this step. Before you can successfully build a local version of your Angular component library, you will need to link the Stencil package to the Angular package.

**First, in your Stencil directory, run the following command:**

`npm link`

Or

`yarn link`

**Next, in your Angular component library, run the following command:**

`npm link {the name of your Stencil package}`

Or

`yarn link {the name of your Stencil package}`

To determine your Stencil’s package name, you can visit your Stencil Component Library's `package.json` file.

And with that, your component libraries are linked together. Now, you can make changes in your Stencil component library and run npm run build to propagate them through to the React component library.

> **NOTE**: As an alternative to `npm link` , you can also run `npm install` with a relative path to your Stencil component library. This strategy, however, will modify your `package.json` so it is important to make sure you do not commit those changes.

### All done!

At this point, once you build your Angular project and import this library into your app, you will have access to all of the wrapped Angular components.  You can visit the Angular package and run the following command to see the result.

`npm run build`

Or

`yarn build`

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

```tsx
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

```tsx
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
