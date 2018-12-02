---
title: Events
description: Events
url: /docs/events
contributors:
  - jthoms1
---

# Events

There is **NOT** such a thing as *stencil events*, instead, Stencil encourages the use of [DOM events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events).
However, Stencil does provide an API to specify the events a component can emit, and the events a component listens to. It does so with the `Event()` and `Listen()` decorators.

## Event Decorator

Components can emit data and events using the Event Emitter decorator.

To dispatch [Custom DOM events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) for other components to handle, use the `@Event()` decorator.

```tsx
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  @Event() todoCompleted: EventEmitter;

  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}
```

The code above will dispatch a custom DOM event called `todoCompleted`.

The `Event()` decorator optionally accepts an options object to shape the behavior of dispatched events. The options and defaults are described below

```tsx
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  @Event({
    /*
     * A string custom event name to override the default
     */
    eventName: 'todoCompleted',
    /*
     * A Boolean value indicating whether or not the event can bubble across the boundary between the shadow DOM and the regular DOM.
     */
    composed: true,
    /*
     * A Boolean indicating whether the event is cancelable
     */
    cancelable: true,
    /*
     * A Boolean indicating whether the event bubbles up through the DOM or not.
     */
    bubbles: true,
  }) todoCompleted: EventEmitter;

  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}
```


## Listen Decorator

The `Listen()` decorator is for handling events dispatched from `@Events`.

In the example below, assume that a child component, `TodoList`, emits a `todoCompleted` event using the `EventEmitter`.

```tsx
import { Listen } from '@stencil/core';

...
export class TodoApp {

  @Listen('todoCompleted')
  todoCompletedHandler(event: CustomEvent) {
    console.log('Received the custom todoCompleted event: ', event.detail);
  }
}
```

Handlers can also be registered for an event on a specific element.
This is useful for listening to application-wide events.
In the example below, we're going to listen for the scroll event.

```tsx
import { Listen } from '@stencil/core';

...
export class TodoList {

  @Listen('body:scroll')
  handleScroll(ev) {
    console.log('the body was scrolled', ev);
  }
}
```

For keyboard events, you can use the standard `keydown` event in `@Listen()` and then figure out the key code, or some constants Stencil provides.

```tsx
@Listen('keydown')
handleKeyDown(ev: KeyboardEvent){
  if (ev.key === 'ArrowDown'){
    console.log('down arrow pressed')
  }
}
```
More info on event key strings can be found in the [w3c spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values);


## Using events in JSX

Within a stencil compiled application or component you can also bind listeners to events directly in JSX. This works very similar to normal DOM events such as `onClick`.

Lets use our TodoList component from above:

```tsx
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  @Event() todoCompleted: EventEmitter;

  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}
```

We can now listen to this event directly on the component in our JSX using the following syntax:

```tsx
<todo-list onTodoCompleted={ev => this.someMethod(ev)} />
```

## Listening events from a non-JSX element

```tsx
<todo-list></todo-list>
<script>
  const todoListElement = document.querySelector('todo-list');
  todoListElement.addEventListener('todoCompleted', event => { /* your listener */ })
</script>
```
