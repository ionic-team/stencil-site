# Context

### What is Context?

Context is a global object which can be used to store global variables, singleton objects etc. and bind them in your components as props. You can see it as a dependency inspector for Stencil.

### How to Bind a Context Item

```
@Component({
  tag: 'my-component'
});
export class MyComponent {
  @Prop({ context: 'myObj' }) private myObj: any;
}
```

### How to Define a Context Item

Context items are defined by directly binding to the global `Context` object. As a best practice you can use `src/global` to store the definitions.

First you need to define the item:

```
// src/global/myObj.ts 

export default (function() {
  const privateInstance = ...
  
  return {
    call: () => {
      privateInstance.method();
    }
  };
})();
```

Then create a global script that will be used to reference all the context items:

```
// src/global/index.ts

import myObj from './myObj';

declare var Context: any;

Context.globalVar = '';
Context.myObj = myObj;
```

Finally just add the global script in config:

```
export.config = {
  // ...
  globalScript: 'src/global/index.ts'
};
```

<stencil-route-link url="/docs/css-variables" router="#router" custom="true">
  <button class='pull-left btn btn--secondary'>
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/style-guide" custom="true">
  <button class='pull-right btn btn--primary'>
    Next
  </button>
</stencil-route-link>
