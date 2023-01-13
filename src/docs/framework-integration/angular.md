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

**Supports: Angular 12+ • TypeScript 4.0+ • Stencil v2.9.0+**

Stencil can generate Angular component wrappers for your web components. This allows your Stencil components to be used within an Angular application. The benefits of using Stencil's component wrappers over the standard web components include:

- Angular component wrappers will be detached from change detection, preventing unnecessary repaints of your web component.
- Web component events will be converted to RxJS observables to align with Angular's `@Output()` and will not emit across component boundaries.
- Optionally, form control web components can be used as control value accessors with Angular's reactive forms or `[ngModel]`.

## Setup

### Project Structure

We recommend using a monorepo structure for your component library with component wrappers. Your project workspace should contain your Stencil component library and the library for the generated Angular component wrappers.

An example project set-up may look similar to:

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

#### Creating an Angular Component Library

> If you already have an Angular component library, skip this section.

The first time you want to create the component wrappers, you will need to have an Angular library package to write to.

Using Angular's CLI, generate a workspace and a library for your Angular component wrappers:

```bash
npx -p @angular/cli ng new angular-workspace --no-create-application
cd angular-workspace
npx -p @angular/cli ng generate library component-library
```

#### Creating a Stencil Component Library

> If you already have a Stencil component library, skip this section.

```bash
npm init stencil components stencil-library
cd stencil-library
# Install dependencies
npm install
# or if using yarn
yarn install
```

### Adding Angular Output Target

Install the `@stencil/angular-output-target` dependency to your Stencil component library package.

```bash
# Install dependency
npm install @stencil/angular-output-target --save-dev
# or if using yarn
yarn add @stencil/angular-output-target
```

In your project's `stencil.config.ts`, add the `angularOutputTarget` configuration to the `outputTargets` array:

```ts
import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'stencil-library',
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: 'your-stencil-library-package-name',
      directivesProxyFile: '../angular-workspace/projects/component-library/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../angular-workspace/projects/component-library/src/lib/stencil-generated/index.ts',
    }),
  ],
};
```

> The `directivesProxyFile` is the relative path to the file that will be generated with all of the Angular component wrappers. You will replace the file path to match your project's structure and respective names. You can generate any file name instead of `components.ts`.

> The `directivesArrayFile` is the relative path to the file that will be generated with a constant of all the Angular component wrappers. This constant can be used to easily declare and export all the wrappers.

You can now build your Stencil component library to generate the component wrappers.

```bash
# Build the library and wrappers
npm run build
# or if using yarn
yarn run build
```

If the build is successful, you will now have contents in the file specified in `directivesProxyFile` and `directivesArrayFile`.

You can now finally import and export the generated component wrappers for your component library. For example, in your library's main Angular module:

```ts
import { DIRECTIVES } from './stencil-generated';

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
})
export class ExampleLibraryModule {}
```

Any components that are included in the `exports` array should additionally be exported in your main entry point (either `public-api.ts` or `index.ts`). Skipping this step will lead to Angular Ivy errors when building for production.

```ts
export { DIRECTIVES } from './stencil-generated';
```

### Link your packages (optional)

> If you are using a monorepo tool (Lerna, Nx), skip this section.

Before you can successfully build a local version of your Angular component library, you will need to link the Stencil package to the Angular package.

From your Stencil project's directory, run the following command:

```bash
# Link the working directory
npm link
# or if using yarn
yarn link
```

From your Angular component library's directory, run the following command:

```bash
# Link the package name
npm link name-of-your-stencil-package
# or if using yarn
yarn link name-of-your-stencil-package
```

The name of your Stencil package should match the `name` property from the Stencil component library's `package.json`.

Your component libraries are now linked together. You can make changes in the Stencil component library and run `npm run build` to propagate the changes to the Angular component library.

> **NOTE**: As an alternative to `npm link` , you can also run `npm install` with a relative path to your Stencil component library. This strategy, however, will modify your `package.json` so it is important to make sure you do not commit those changes.

## Consumer Usage

This section covers how developers consuming your Angular component wrappers will use your package and component wrappers.

If you distributed your components through a primary `NgModule`, developers can simply import that module into their implementation to use your components.

```ts
import { ExampleLibraryModule } from 'your-angular-library-package-name';

@NgModule({
  imports: [ExampleLibraryModule],
})
export class FeatureModule {}
```

Alternatively, developers can individually import the components and declare them on a module:

```ts
import { MyComponent } from 'your-angular-library-package-name';

@NgModule({
  declarations: [MyComponent],
  exports: [MyComponent],
})
export class FeatureModule {}
```

Developers can now directly leverage your components in their template and take advantage of Angular template binding syntax.

```html
<my-component first="Your" last="Name"></my-component>
```

## FAQs

### What is the best format to write event names?

Event names shouldn’t include special characters when initially written in Stencil, try to lean on using camelCased event names for interoperability between frameworks.

### How do I bind input events directly to a value accessor?

You can configure how your input events can map directly to a value accessor, allowing two-way data-binding to be a built in feature of any of your components. Take a look at [valueAccessorConfig's option below]().

### How do I add IE11 or Edge support?

If you want your custom elements to be able to work on older browsers, you should add the `applyPolyfills()` that surround the `defineCustomElements()` function.

```ts
import { applyPolyfills, defineCustomElements } from 'test-components/loader';
...
applyPolyfills().then(() => {
  defineCustomElements();
});
```

### How do I access components with ViewChild or ViewChildren?

Once included, components could be referenced in your code using `ViewChild` and `ViewChildren` as in the following example:

```tsx
import { Component, ElementRef, ViewChild } from '@angular/core';

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
import { IonApp } from '@ionic/core/components/ion-app.js';
```

### directivesProxyFile

This parameter allows you to name the file that contains all the component wrapper definitions produced during the compilation process. This is the first file you should import in your Angular project.

### includeImportCustomElements

If `true`, Angular components will import and define elements from the `dist-custom-elements` build, rather than `dist`.

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
  namespace: 'stencil-library',
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
