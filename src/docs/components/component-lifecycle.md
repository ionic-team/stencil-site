---
title: Component Lifecycle Methods
description: Component Lifecycle Methods
url: /docs/component-lifecycle
contributors:
  - jthoms1
---

# Component Lifecycle Methods

Components have numerous lifecycle methods which can be used to know when the component "will" and "did" load, update, and render. These methods can be added to a component to hook into operations at the right time.

Implement one of the following methods within a component class and Stencil will automatically call them in the right order:


<svg viewBox="0 0 643 922" xmlns="http://www.w3.org/2000/svg" style="margin: 60px 0;">
  <g fill-rule="evenodd">
    <path d="m552 743c49.706 0 90-40.294 90-90v-488c0-58.5-47.2-106-105.5-106-58.393 0.16547-105.61 47.607-105.5 106l0.4 74.5" fill="none" stroke="#7b83a6" stroke-linecap="square" />
    <path d="m437.7 600.3-6.3 6.3-6.3-6.3" fill="none" stroke="#b3b6c5" />
    <path d="m431.4 347.5v258" fill="none" stroke="#7b83a6" stroke-linecap="square" />
    <path d="m431.4 281.42v24.337" fill="none" stroke="#7b83a6" stroke-dasharray="1, 6" stroke-linecap="square" />
    <path d="m126.4 19.5v586" fill="none" stroke="#212431" stroke-linecap="square" />
    <path d="m132.7 600.3-6.3 6.3-6.3-6.3" fill="none" stroke="#212431" />
    <path d="m278 19.5v58.059" fill="none" stroke="#575e7f" stroke-linecap="square" />
    <path d="m284.3 71.993-6.3 6.3-6.3-6.3" fill="none" stroke="#575e7f" />
    <path d="m278.5 805v53.5" fill="none" stroke="#575e7f" stroke-linecap="square" />
    <path d="m284.8 852.3-6.3 6.3-6.3-6.3" fill="none" stroke="#575e7f" />
    <rect x="1" y="718" width="555" height="50" rx="4" ry="4" fill="#fdf5e4" />
    <rect x="1" y="779" width="555" height="50" rx="4" ry="4" fill="#fdf5e4" />
    <rect width="190" height="50" rx="4" ry="4" fill="#fdf5e4" />
    <rect x="215" width="190" height="50" rx="4" ry="4" fill="#fdf5e4" />
    <g font-family="SFMono-Regular, 'SF Mono', 'Lucida Console', monospace" font-size="15px">
      <g>
        <a href="#componentdidload">
          <rect y="620" width="252" height="49" rx="24.5" ry="24.5" fill="#212431" />
          <text x="2.2028809" y="166.83597" fill="#ffffff">
            <tspan x="45.202881" y="648.83594">componentDidLoad()</tspan>
          </text>
        </a>
      </g>
      <g>
        <a href="#componentdidupdate">
          <rect x="303" y="620" width="252" height="49" rx="24.5" ry="24.5" fill="#7b83a6" />
          <text x="2.8501587" y="166.83597" fill="#ffffff">
            <tspan x="339.15015" y="648.83594">componentDidUpdate()</tspan>
          </text>
        </a>
      </g>
      <g>
        <a href="#disconnectedcallback">
          <rect x="152.5" y="873" width="252" height="49" rx="24.5" ry="24.5" fill="#4b516e" />
          <text x="-18.570755" y="148.19852" fill="#ffffff">
            <tspan x="179.72925" y="902.19849">disconnectedCallback()</tspan>
          </text>
        </a>
      </g>
      <g>
        <a href="/docs/reactive-data#watch-decorator">
          <rect x="303" y="161" width="252" height="49" rx="24.5" ry="24.5" fill="#7b83a6" />
          <text x="2.5288086" y="-8" fill="#ffffff">
            <tspan x="348.52881" y="190">@Watch(‘propName’)</tspan>
          </text>
        </a>
      </g>
      <g>
        <a href="/docs/templating-jsx">
          <rect y="451" width="555" height="49" rx="24.5" ry="24.5" fill="#39b54a" />
          <text x="1.035553" y="109.1985" fill="#ffffff">
            <tspan x="241.43555" y="480.19852">render()</tspan>
          </text>
        </a>
      </g>
      <g>
        <a href="#connectedcallback">
          <rect x="65" y="89" width="275" height="49" rx="24.5" ry="24.5" fill="#4b516e" />
          <text x="78.77652" y="26.198486" fill="#ffffff">
            <tspan x="117.17651" y="118.19849">connectedCallback()</tspan>
          </text>
        </a>
      </g>
      <g>
        <a href="#componentshouldupdate">
          <rect x="303" y="233" width="252" height="49" rx="24.5" ry="24.5" fill="#7b83a6" />
          <text x="-6.5288005" y="2.8359385" fill="#ffffff">
            <tspan x="325.57117" y="261.83594">componentShouldUpdate()</tspan>
          </text>
        </a>
      </g>
      <g>
        <a href="#componentwillrender">
          <rect x="77.5" y="377" width="400" height="49" rx="24.5" ry="24.5" fill="#4b516e" />
          <text x="-148.97623" y="146.83594" fill="#ffffff">
            <tspan x="183.12378" y="405.83594">componentWillRender()</tspan>
          </text>
        </a>
      </g>
      <g>
        <a href="#componentwillupdate">
          <rect x="303" y="305" width="252" height="49" rx="24.5" ry="24.5" fill="#7b83a6" />
          <text x="2.5237732" y="74.835938" fill="#ffffff">
            <tspan x="334.62378" y="333.83594">componentWillUpdate()</tspan>
          </text>
        </a>
      </g>
      <g>
        <a href="#componentdidrender">
          <rect x="77.5" y="523" width="400" height="49" rx="24.5" ry="24.5" fill="#4b516e" />
          <text x="-144.44986" y="292.83597" fill="#ffffff">
            <tspan x="187.65015" y="551.83594">componentDidRender()</tspan>
          </text>
        </a>
      </g>
      <g>
        <a href="#componentwillload">
          <rect y="161" width="252" height="49" rx="24.5" ry="24.5" fill="#212431" />
          <text x="2.2765121" y="97.835938" fill="#ffffff">
            <tspan x="40.676514" y="189.83594">componentWillLoad()</tspan>
          </text>
        </a>
      </g>
    </g>
    <g fill="#9a6400" font-size="14px" letter-spacing="-.2" text-anchor="middle" text-align="center">
      <text x="111.24316" y="-1.0898438">
        <tspan x="95.239258" y="28.910156">Component initialized</tspan>
      </text>
      <text x="344.75723" y="166.90677">
        <tspan x="278.08643" y="746.90674">Change in a value of prop or state triggers rerender</tspan>
      </text>
      <text x="138.02324" y="167.91019">
        <tspan x="278.73926" y="807.91016">Component removed</tspan>
      </text>
      <text x="330.85489" y="-1.0898438">
        <tspan x="310.23926" y="28.910156">Component reattached</tspan>
      </text>
    </g>
  </g>
</svg>


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

Called every time the component is disconnected from the DOM, ie, it can be dispatched more than once, DO not confuse with a "onDestroy" kind of event.

This `lifecycle` hook follows the same semantics as the one described by the [Custom Elements Spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

## componentWillLoad()

Called once just after the component is first connected to the DOM. Since this method is only called once, it's a good place to load data asynchronously.

A promise can be returned, that can be used to wait for the first render.

## componentDidLoad()

Called once just after the component fully loaded and the first `render()` occurs.


## componentShouldUpdate()

This hook is called when a component's `Prop` or `State` property changes and a rerender is about to be requested. This hook receives three arguments: the new value, the old value and the name of the changed state. It should return a boolean to indicate if the component should rerender (`true`) or not (`false`).

A couple of things to notice is that this method will not be executed before the initial render, that is, when the component is first attached to the dom, nor when a rerender is already scheduled in the next frame.

Let’s say the following two props of a component change synchronously:

```tsx
component.somePropA = 42;
component.somePropB = 88;
```

The `componentShouldUpdate` will be first called with arguments: `42`, `undefined` and `somePropA`. If it does return `true`, the hook will not be called again since the rerender is already scheduled to happen. Instead, if the first hook returned `false`, then `componentShouldUpdate` will be called again with `88`, `undefined` and `somePropB` as arguments, triggered by the `component.somePropB = 88` mutation.

Since the execution of this hook might be conditioned, it's not good to rely on it to watch for prop changes, instead use the `@Watch` decorator for that.

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


## Rendering State

It's always recommended to make any rendered state updates within `componentWillRender()`, since these is the method which get called _before_ the `render()` method. Alternatively, updating rendered state with the `componentDidLoad()`, `componentDidUpdate()` and `componentDidRender()` methods will cause another rerender, which isn't ideal for performance.

If state _must_ be updated in `componentDidUpdate()` or `componentDidRender()`, it has the potential of getting components stuck in an infinite loop. If updating state within `componentDidUpdate()` is unavoidable, then the method should also come with a way to detect if the props or state is "dirty" or not (is the data actually different or is it the same as before). By doing a dirty check, `componentDidUpdate()` is able to avoid rendering the same data, and which in turn calls `componentDidUpdate()` again.


## Lifecycle Hierarchy

A useful feature of lifecycle methods is that they take their child component's lifecycle into consideration too. For example, if the parent component, `cmp-a`, has a child component, `cmp-b`, then `cmp-a` isn't considered "loaded" until `cmp-b` has finished loading. Another way to put it is that the deepest components finish loading first, then the `componentDidLoad()` calls bubble up.

It's also important to note that even though Stencil can [lazy-load components](/blog/how-lazy-loading-web-components-work), and has asynchronous rendering, the lifecycle methods are still called in the correct order. So while the top-level component could have already been loaded, all of its lifecycle methods are still called in the correct order, which means it'll wait for a child components to finish loading. The same goes for the exact opposite, where the child components may already be ready while the parent isn't.

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

This simple example shows a clock and updates the current time every second. The timer is started when the component is added to the DOM. Once it's removed from the DOM, the timer is stopped.

```tsx
import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'custom-clock'
})
export class CustomClock {

  timer: number;

  @State() time: number = Date.now();

  connectedCallback() {
    this.timer = window.setInterval(() => {
      this.time = Date.now();
    }, 1000);
  }

  disconnectedCallback() {
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
