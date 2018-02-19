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
   * 
   * Will only be called once 
   */
  componentWillLoad() {
    console.log('The component is about to be rendered');
  }

  /**
   * The component is loaded and has rendered.
   * 
   * Updating data in this event may cause the component to re-render.
   * 
   * Will only be called once
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
   * 
   * Called multiple times throughout the life of the component as it updates.
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

## Practicle Example

Lets build a classic example of a simple component that takes advantages of lifecycle events, a timer.

First lets look at the code for this component:

```jsx
import { Component, State } from '@stencil/core';


@Component({
  tag: 'custom-timer'
})
export class CustomTimer {
  
  timer: number;

  @State() time: number = Date.now();

  componentDidLoad() {
    this.timer = window.setInterval(() => {
      this.time = Date.now();
    }, 1000);
  }

  componentDidUnload() {
    clearInterval(this.timer);
  }

  render() {
    let time = new Date(this.time).toLocaleTimeString();

    return (
      <span>{ time }</span>
    );
  }
}
```

We create the timer once the component has loaded and rendered by using the `componentDidLoad` event. As noted above, this event only gets called once, so we do not have to worry about creating multiple timers. To make sure we stop our timer once this component has been un-loaded from the DOM, we clear our timer in the `componentDidUnload` event.


<stencil-route-link url="/docs/events" router="#router" custom="true">
  <button class="backButton">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/forms" custom="true">
  <button class="nextButton">
    Next
  </button>
</stencil-route-link>