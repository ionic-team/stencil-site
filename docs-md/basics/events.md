# Events

Components can emits data and events using the Event Emitter decorator.

To dispatch [Custom DOM events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) up for other components to handle, use the `@Event()` decorator.

```typescript
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

## Listening for Events

The `Listen()` decorator is for handling events dispatched from `@Events`.

In the example below, assume that a child component, `TodoList`, emits a `todoCompleted` event using the `EventEmitter`.

```typescript
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

```typescript
import { Listen } from '@stencil/core';

...
export class TodoList {

  @Listen('body:scroll')
  handleScroll(ev) {
    console.log('the body was scrolled', ev);
  }
}
```
