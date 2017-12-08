# 事件

使用事件装饰器，可以让组件可以发送数据和事件。

使用`@Event()`装饰器，可以给其他组件发送[自定义 DOM 事件](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)。

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

这段代码会发送一个名为 `todoCompleted` 的自定义 DOM 事件。

## 监听事件

`Listen()` 装饰器用来监听来自 `@Events` 的事件。

在下面的例子中，假设子组件 `TodoList` 使用 `EventEmitter` 发送了一个名为 `todoCompleted` 的事件。

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

监听器也可以被注册来专门处理特定元素的事件。
这对监听整个应用范围的事件很有用。
下面的例子，我们会监听 body 的滚动事件。

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

要处理键盘事件，你可以在 `@Listen()` 中使用 `keydown` 事件并分辨出是哪一个 keycode, Stencil 同时提供了一些 keycode 的常量。

```typescript
@Listen('keydown')
handleKeyDown(ev){
  if(ev.keyCode === 40){
    console.log('down arrow pressed')
  }
}

@Listen('keydown.up')
handleUpArrow(ev){
  console.log('will fire when up arrow is pressed');
}

```

Stencil 提供了如下的常量，可以通过 `keydown.<CONSTANT>` 的方式来访问

- enter
- escape
- space
- tab
- left
- up
- right
- down

<stencil-route-link url="/docs/decorators" router="#router" custom="true">
  <button class="backButton">
    返回
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/component-lifecycle" custom="true">
  <button class="nextButton">
    继续
  </button>
</stencil-route-link>
