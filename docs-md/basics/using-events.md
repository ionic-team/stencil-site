# Events

Stencil composed talk to eachother through DOM events.

## Event Decorator and Event Emitter

To dispatch [Custom DOM events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) up for other components to handle, use the `@Event()` decorator.

```
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

The `Listen()` decorator is for listening and responding to DOM events from a child.

In the example below, assume that a child component, `TodoList`, emits a `todoCompleted` event using the `EventEmitter`.

```
import { Listen } from '@stencil/core';

...
export class TodoApp {

  @Listen('todoCompleted')
  todoCompletedHandler(event: CustomEvent) {
    console.log('Received the custom todoCompleted event: ', event.detail);
  }
}
```

Handlers can also be registered for an event on a specific element. This is useful for listening to application-wide events. In the example below, we're going to listen for the escape key's keyup event.

```
import { Listen } from '@stencil/core';

...
export class TodoList {

  @Listen('body:keyup.escape')
  escapeKeyUp() {
    console.log('the escape key was clicked');
  }
}
```

There is another keyup events that can be registered such as

- Enter
- Escape
- Space
- Tab