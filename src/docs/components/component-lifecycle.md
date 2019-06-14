---
title: Component Lifecycle Methods
description: Component Lifecycle Methods
url: /docs/component-lifecycle
contributors:
  - jthoms1
---

# Component Lifecycle Methods

Components have numerous lifecycle methods which can be used to know when the component "will" and "did" load, update, and unload. These methods can be added to a component to hook into operations at the right time.

Implement one of the following methods within a component class and Stencil will automatically call them in the right order:

## connectedCallback()

Called every time the component is connected to the DOM.
When the component is first connected, this method is called before `componentWillLoad`.

It's important to note that this method can be called more than once, everytime, the element is **attached** or **moved** in the DOM.

```tsx
const el = document.createElement('my-cmp');
document.body.appendChild(el);
// connectedCallback() called
// componentWillLoad() called (first time)

el.remove();
// disconnectedCallback()

document.body.appendChild(el);
// connectedCallback() called again, but `componentWillLoad` is not.
```

It's a good practice to use this hook


This `lifecycle` hook follows the same semantics as the one described by the [Custom Elements Spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)

## disconnectedCallback()

Called every time the component is disconnected to the DOM, ie, it call be dispatched more than once, DO not confuse with a "onDestroy" kind of event.

This `lifecycle` hook follows the same semantics as the one described by the [Custom Elements Spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

## componentWillLoad()

Called once just after the component is first connected to the DOM.
A promise can be returned, that can be used to wait for the first render.

## componentDidLoad()

Called once just after the component fully loaded and the first `render()` occurs.

## componentWillRender()

Called before every `render()`.

A promise can be returned, that can be used to wait for the upcoming render.


## componentDidRender()

Called after every `render()`.


## componentWillUpdate()

Called when the component is about to be updated because some `Prop()` or `State()` changed.
It's never called during the first `render()`.

A promise can be returned, that can be used to wait for the next render.


## componentDidUpdate()

Called just after the component updates.
It's never called during the first `render()`.


<svg viewBox="0 0 643 774" xmlns="http://www.w3.org/2000/svg" style="margin: 60px 0;">
  <g fill="none" fill-rule="evenodd">
    <path d="M552 576a90 90 0 0 0 90-90V165c0-58.5-47.2-106-105.5-106A105.8 105.8 0 0 0 431 165l.4 136.5v136" stroke="#B3B6C5" stroke-linecap="square"/>
    <path stroke="#B3B6C5" d="M437.6 432.3l-6.3 6.3-6.3-6.3"/>
    <path d="M126.4 19.5v419" stroke="#B3B6C5" stroke-linecap="square"/>
    <path stroke="#B3B6C5" d="M132.6 432.3l-6.3 6.3-6.3-6.3"/>
    <path d="M290.3 628.5v82" stroke="#B3B6C5" stroke-linecap="square"/>
    <path stroke="#B3B6C5" d="M296.6 704.3l-6.3 6.3-6.3-6.3"/>
    <rect fill="#FDF5E4" x="1" y="550" width="555" height="50" rx="4"/>
    <rect fill="#FDF5E4" x="1" y="611" width="555" height="50" rx="4"/>
    <rect fill="#FDF5E4" width="252" height="50" rx="4"/>
    <rect fill="#212431" y="452" width="252" height="49" rx="24.5"/>
    <rect fill="#212431" x="303" y="452" width="252" height="49" rx="24.5"/>
    <rect fill="#212431" x="303" y="229" width="252" height="49" rx="24.5"/>
    <rect fill="#212431" x="164" y="725" width="252" height="49" rx="24.5"/>
    <rect fill="#212431" x="303" y="169" width="252" height="49" rx="24.5"/>
    <text font-size="14" letter-spacing="-.2" fill="#9A6400">
      <tspan x="57" y="30">Component initialized</tspan>
    </text>
    <text font-family="SFMono-Regular, SF Mono, Lucida Console, monospace" font-size="15" fill="#FFF">
      <tspan x="43" y="482">componentDidLoad()</tspan>
    </text>
    <text font-family="SFMono-Regular, SF Mono, Lucida Console, monospace" font-size="15" fill="#FFF">
      <tspan x="336.3" y="482">componentDidUpdate()</tspan>
    </text>
    <text font-family="SFMono-Regular, SF Mono, Lucida Console, monospace" font-size="15" fill="#FFF">
      <tspan x="332.1" y="259">componentWillUpdate()</tspan>
    </text>
    <text font-family="SFMono-Regular, SF Mono, Lucida Console, monospace" font-size="15" fill="#FFF">
      <tspan x="198.3" y="754">componentDidUnload()</tspan>
    </text>
    <text font-family="SFMono-Regular, SF Mono, Lucida Console, monospace" font-size="15" fill="#FFF">
      <tspan x="346" y="198">@Watch(‘propName’)</tspan>
    </text>
    <text font-size="14" letter-spacing="-.2" fill="#9A6400">
      <tspan x="110.8" y="580">Change in a value of prop or state triggers re-render</tspan>
    </text>
    <text font-size="14" letter-spacing="-.2" fill="#9A6400">
      <tspan x="211.7" y="640">Component removed</tspan>
    </text>
    <rect fill="#39B54A" y="342" width="555" height="49" rx="24.5"/>
    <text font-family="SFMono-Regular, SF Mono, Lucida Console, monospace" font-size="15" fill="#FFF">
      <tspan x="240.4" y="371">render()</tspan>
    </text>
    <rect fill="#212431" y="63" width="252" height="49" rx="24.5"/>
    <text font-family="SFMono-Regular, SF Mono, Lucida Console, monospace" font-size="15" fill="#FFF">
      <tspan x="38.4" y="92">componentWillLoad()</tspan>
    </text>
  </g>
</svg>

## Rendering State

It's always recommended to make any rendered state updates within `componentWillLoad()` or `componentWillUpdate()`, since these are the methods which get called _before_ the `render()` method. Alternatively, updating rendered state with the `componentDidLoad()` or `componentDidUpdate()` methods will cause another re-render, which isn't ideal for performance.

If state _must_ be updated in `componentDidUpdate()`, it has the potential of getting components stuck in an infinite loop. If updating state within `componentDidUpdate()` is unavoidable, then the method should also come with a way to detect if the props or state is "dirty" or not (is the data actually different or is it the same as before). By doing a dirty check, `componentDidUpdate()` is able to avoid rendering the same data, and which in turn calls `componentDidUpdate()` again.


## Lifecycle Hierarchy

A useful feature of lifecycle methods is that they take their child component's lifecycle into consideration too. For example, if the parent component, `cmp-a`, has a child component, `cmp-b`, then `cmp-a` isn't considered "loaded" until `cmp-b` has finished loading. Another way to put it is that the deepest components finish loading first, then the `componentDidLoad()` calls bubble up.

It's also important to note that even though Stencil can lazy-load components, and has asynchronous rendering, the lifecycle methods are still called in the correct order. So while the top-level component could have already been loaded, all of its lifecycle methods are still called in the correct order, which means it'll wait for a child components to finish loading. The same goes for the exact opposite, where the child components may already be ready while the parent isn't.

In the example below we have a simple hierarchy of components. The numbered list shows the order of which the lifecycle methods will fire.

```markup
  <cmp-a>
    <cmp-b>
      <cmp-c></cmp-c>
    </cmp-b>
  </cmp-a>
```

1. `cmp-a` - `componentWillLoad()`
2. `cmp-b` - `componentWillLoad()`
3. `cmp-c` - `componentWillLoad()`
4. `cmp-c` - `componentDidLoad()`
5. `cmp-b` - `componentDidLoad()`
6. `cmp-a` - `componentDidLoad()`

Even if some components may or may not be already loaded, the entire component hierarchy waits on its child components to finish loading and rendering.


## Async Lifecycle Methods

Lifecycle methods can also return promises which allows the method to asynchronously retrieve data or perform any async tasks. A great example of this is fetching data to be rendered in a component. For example, this very site you're reading first fetches content data before rendering. But because `fetch()` is async, it's important that `componentWillLoad()` returns a `Promise` to ensure its parent component isn't considered "loaded" until all of its content has rendered.

Below is a quick example showing how `componentWillLoad()` is able to have its parent component wait on it to finish loading its data.

```tsx
componentWillLoad() {
  return fetch('/some-data.json')
    .then(response => response.json())
    .then(data => {
      this.content = data;
    });
}
```


## Example

This simple example shows a clock and updates the current time every second. Since `componentDidLoad` is only called once, we will only ever have one instance of the timer running. Once the component unloads, the timer is stopped.

```tsx
import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'custom-clock'
})
export class CustomClock {

  timer: number;

  @State() time: number = Date.now();

  componentDidLoad() {
    this.timer = window.setInterval(() => {
      this.time = Date.now();
    }, 1000);
  }

  componentDidUnload() {
    window.clearInterval(this.timer);
  }

  render() {
    const time = new Date(this.time).toLocaleTimeString();

    return (
      <span>{ time }</span>
    );
  }
}
```

> Here is the example running.  If you want to see it in action then just inspect it with dev tools.
> <custom-clock/>
