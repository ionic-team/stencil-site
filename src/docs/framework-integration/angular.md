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
<!-- 
### Why aren't my custom interfaces exported from within the index.d.ts file?

Usually when beginning this process, you may bump into a situation where you find that some of the interfaces you've used in your Stencil component library aren't working in your Angular component library. You can resolve this issue by adding an `interfaces.d.ts` file located within the root of your Stencil component library's project folder, then manually exporting types from that file e.g. `export * from './components';`

When adding this file, it's also recommended to update your package.json's types property to be the distributed file, something like: `"types": "dist/types/interfaces.d.ts"`

## API

The angularOutputTarget method accepts 5 parameters:

### componentCorePackage

The title of the Stencil package where components are available for consumers. This is used during compilation to write the correct imports for components e.g.

```js
import { IonApp } from '@ionic/core/components/ion-app.js'
``` -->