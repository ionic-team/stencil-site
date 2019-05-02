---
title: Events
description: Events
url: /docs/events
contributors:
  - jthoms1
  - mgalic
  - BDav24
  - mattcosta7
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

The `Listen()` decorator is for listening DOM events, including the ones dispatched from `@Events`.

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

### Listen's options

The `@Listen(eventName, opts?: ListenOptions)` includes a second optional argument that can be used to configure how the DOM event listener is attached.

```tsx
export interface ListenOptions {
  target?: 'parent' | 'body' | 'document' | 'window';
  capture?: boolean;
  passive?: boolean;
}
```

The available options are `target`, `capture` and `passive`:


#### target

Handlers can also be registered for an event other than the host itself.
The `target` option can be used to change where the event listener is attached, this is useful for listening to application-wide events.

In the example below, we're going to listen for the scroll event, emited from `window`:

```tsx
| @Listen('scroll', { target: 'window' })
  handleScroll(ev) {
    console.log('the body was scrolled', ev);
  }
```

### passive

By default, Stencil uses several heuristics to determine if it must attach a `passive` event listener or not. Using the `passive` option can be used to change the default behaviour.

Please check out [https://developers.google.com/web/updates/2016/06/passive-event-listeners](https://developers.google.com/web/updates/2016/06/passive-event-listeners) for further information.


### capture

Event listener attached with `@Listen` does not "capture" by default.
When a event listener is set to "capture", means the event will be dispatched during the "capture phase",
check out [https://www.quirksmode.org/js/events_order.html](https://www.quirksmode.org/js/events_order.html) for further information.


```tsx
| @Listen('click', { capture: true })
  handleClick(ev) {
    console.log('click');
  }
```

## Keyboard events

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
