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
<!-- 
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
``` -->