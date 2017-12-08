# 装饰器

Stencil 使得构建富交互的组件更容易。让我们从基础开始吧。

## Component 装饰器

每一个 Stencil 组件必须使用来自 `@stencil/core` 包里的 `@Component()` 装饰器装饰。在这个简单的例子里，开发者必须为组件提供一个 HTML `tag` 。大多数情况， `styleUrl` 也会被使用，当你要使用多个不同的样式文件来满足不同的模式或主题时，可能会使用 `styleUrls` 。

使用相对路径的 url 来连接你的样式文件。

```typescript 
import { Component } from '@stencil/core';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.scss'
})
export class TodoList {
  ...
}
```

## Prop 装饰器
Prop 是自定义的用来暴露元素的公开属性，用于开发者为其提供值。子组件不应该知道或引用父组件，所以属性被用来从父组件向子组件传递数据。组件需要使用 `@Prop()` 装饰器来清楚地描述它所需要接收的属性。属性可以是 `number`, `string`, `boolean`, 甚至是 `Object` 或者 `Array` 。默认情况下，当一个 `@Prop()` 属性被设置值的时候，组件会高效地重新渲染。

```typescript 
import { Prop } from '@stencil/core';
...
export class TodoList {
  @Prop() color: string;
  @Prop() favoriteNumber: number;
  @Prop() isSelected: boolean;
  @Prop() myHttpService: MyHttpService;
}
```

在 `TodoList` 类中，可以使用 `this` 操作符来访问属性。

```typescript
logColor() {
  console.log(this.color)
}
```

属性由外部传入元素：

```typescript 
<todo-list color="blue" favoriteNumber="24" isSelected="true"></todo-list>
```

也可以通过 JS 来访问元素的属性。

```typescript 
const todoListElement = document.querySelector('todo-list');
console.log(todoListElement.myHttpService); // MyHttpService
console.log(todoListElement.color); // blue
```

需要注意的是，`@Prop` 在元素内部是不可改变的。一旦被用户设定了值，在内部是无法更新它的。

## PropWillChange 和 PropDidChange 装饰器

当用户更新了属性后，`PropDidChange` 和 `PropWillChange` 将会被触发。


```typescript
import { Prop, PropDidChange, PropWillChange } from '@stencil/core';

export class LoadingIndicator {
  @Prop() activated: boolean;

  @PropWillChange('activated')
  willChangeHandler(newValue: boolean) {
    console.log('The new value of activated is: ', newValue);
  }

  @PropDidChange('activated')
  didChangeHandler(newValue: boolean) {
    // 当`activated` 变化时，做某些事情
  }
}
```

# 管理组件状态

`@State()` 装饰器可以用来管理组件内部数据。这意味着用户无法从外部修改这些属性，但是组件可以自己管理。任何被 `@State()` 装饰的属性更改否会使得组件的渲染函数 (render) 再一次被调用。


```typescript 
import { State } from '@stencil/core';

...
export class TodoList {
  @State() completedTodos: Todo[];

  completeTodo(todo: Todo) {
    // 这会使得渲染函数 (render) 再次被调用。
    this.completedTodos = [...this.completedTodos, todo]; 
  }

  render() {
    //
  }
}
```

## Method 装饰器

`@Method()` 装饰器用来把方法向外部暴露成公开API。被 `@Method()` 装饰器装饰的函数可以直接从元素上调用。

```typescript 
import { Method } from '@stencil/core';

...
export class TodoList {

  @Method()
  showPrompt() {
    // 显示一个弹窗提示 (prompt)
  }
}
```

像这样调用方法：

```typescript 
const todoListElement = document.querySelector('todo-list');
todoListElement.showPrompt();
```

## Element 装饰器

`@Element()` 装饰器用来在类的实例内部访问元素。它将返回一个 `HTMLElement` 的实例，所以在这里可以使用标准的 DOM 的方法/事件。

```
import { Element } from '@stencil/core';

...
export class TodoList {

  @Element() todoListEl: HTMLElement;

  addClass(){
    this.todoListEl.classList.add('active');
  }
}
```


## Change 装饰器

Stencil 实际上并没有 Change 装饰器，为了触发高效的重新渲染，可以使用 `@State` 装饰器来更新当前状态和触发重新渲染。

下边的例子**不会**触发重新渲染：

```typescript
import { State } from '@stencil/core';

...
export class TodoList {
  @State() completedTodos: Todo[];

  completeTodo(todo: Todo) {
    this.completedTodos.push(todo);
  }
}
```

在上边的例子中，我们改变了 `completedTodos` 数组的内容。
重新渲染机制并没有执行，是因为 Stencil 并没有深度观察项目的改变。

为了触发重新渲染，值需要被设置为新的数组：

```typescript 
import { State } from '@stencil/core';

...
export class TodoList {
  @State() completedTodos: Todo[];

  completeTodo(todo: Todo) {
    this.completedTodos = [...this.completedTodos, todo];
  }
}
```

在上边的例子中，我们使用已存在的 `completedTodos` 和新的 `todo` 来生成一个新的数组赋值给 `this.completedTodos`。

这将调用 `completedTodos` 的 setter，以此来触发重新渲染。


## 嵌套的组件

组件可以非常容易地组合在一起，只需要把 HTML 标签添加到 JSX 代码中即可。因为组件就是 HTML 标签，因此在一个 Stencil 组件中使用另一个 Stencil 组件到时候并不需要导入什么东西。

这里有一个在一个组件中使用另一个组件的例子：

```typescript 
import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-embedded-component'
})
export class MyEmbeddedComponent {
  @Prop() color: string = 'blue';

  render() {
    return (
    <div>My favorite color is {this.color}</div>
    );
  }
}
```

```typescript 
import { Component } from '@stencil/core';

@Component({
  tag: 'my-parent-component'
})
export class MyParentComponent {

  render() {
    return (
      <div>
        <my-embedded-component color="red"></my-embedded-component>
      </div>
    );
  }
}
```

`my-parent-component` 组件在 `render()` 函数中引用了 `my-embedded-component` 。

<stencil-route-link url="/docs/templating" router="#router" custom="true">
  <button class="backButton">
    返回
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/events" custom="true">
  <button class="nextButton">
    继续
  </button>
</stencil-route-link>
