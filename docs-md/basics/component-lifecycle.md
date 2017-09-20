# Component Life Cycle

Components receive events during their lifecycle, including loading, updating, and unloading. These hooks can be handled in a component for performing operations at the right time.

Simply implement one of the following methods and Stencil will automatically call it:

```jsx
import { Component } from '@stencil/core';

@Component({
  tag: 'my-component'
})
export class MyComponent {

  /**
   * The component will load but has not rendered yet.
   * 
   * This is a good place to make any last minute updates before rendering. 
   */
  componentWillLoad() {
    console.log('The component is about to be rendered');
  }

  /**
   * The component is loaded and has rendered.
   * 
   * Updating data in this event may cause the component to re-render.
   */
  componentDidLoad() {
    console.log('The component has been rendered');
  }

  /**
   * The component will update and re-render.
   *
   * Called multiple times throughout the life of the component as it updates.
   */
  componentWillUpdate() {
    console.log('The component will update');
  }

  /**
   * The component finished updating.
   *
   * Called after componentWillUpdate
   */
  componentDidUpdate() {
    console.log('The component did update');
  }

  /**
   * The component did unload and the element will be destroyed.
   */
  componentDidUnload() {
    console.log('The view has been removed from the DOM');
  }
}
```

<stencil-route-link url="/docs/events" router="#router" custom="true" class="backButton">
  Back
</stencil-route-link>

<stencil-route-link url="/docs/stencil-config" custom="true" class="nextButton">
  Next
</stencil-route-link>