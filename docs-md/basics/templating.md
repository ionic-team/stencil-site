# 使用 JSX

Stencil 组件使用 JSX 来渲染，这是一个流行的，声明式的模版语法。每一个组件都有一个 `render` 函数用来返回 JSX 内容。

### 基础

render 函数返回的东西和 HTML 很相似。

```typescript
render() {
  return (
    <div>Hello World</div>
  )
}
```

这里我们返回一个 `div` 的JSX 表达式，内部内容是 "Hello World"。


### 数据绑定

一个普遍需求是基于数据和属性来渲染组件。
就像很多流行的框架一样，我们可以使用 `{}`。

```typescript
render() {
  return (
    <div>Hello {this.name}</div>
  )
}
```

> 一个简单的技巧是，把 JSX 数据绑定操作符看成 JavaScript 字面量模版语法, 其区别仅仅是前边没有了 `$`。

```js
//ES6
`Hello ${this.name}`

//JSX
Hello {this.name}
```


### 条件渲染

如果我们想根据不同的情况，渲染不同的内容，我们可以简单地使用 JavaScript 的 if/else 语句：
这里, 如果 `name` 未定义, 我们就渲染一个不同的元素。

```jsx
render() {
  if (this.name) {
    return ( <div>Hello {this.name}</div> )
  } else {
    return ( <div>Hello, World</div> )
  }
}
```

一个更加复杂的关于使用 JSX 短路表达式的例子：

```jsx
render() {
  return (
    <div>
    {this.name
      ? <p>Hello {this.name}</p>
      : <p>Hello World</p>
    }
    </div>
  );
}
```
在这个例子里，我们需要根据条件渲染子组件。


### Slots

有些时候你想传递更多的 JSX/HTML 作为子元素。例如：

```jsx
render(){
  return(
    <my-component>
      <p>Child Element</p>
    </my-component>
  )
}
```

未来达到这个目的，你可以在你的 `my-component` 中使用 `slot` 标签。

```jsx
// my-component.tsx

render(){
  return <slot />
}

```

[Slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) 在 Web 组件中是一个特殊的标签，允许你在自定义元素中放置自由元素。
Slots 也可以欧 `name`，允许你在特定的地方渲染内容。

```jsx
// my-component.tsx

render(){
  return[
    <slot name="item-start"/>,
    <h1>Here is my main content</h1>,
    <slot name="item-end"/>
  ]
}
```

```jsx
render(){
  return(
    <my-component>
      <p slot="item-start">I'll be placed before the h1</p>
      <p slot="item-end">I'll be placed after the h1</p>
    </my-component>
  )
}
```

### 循环

循环/迭代同样适用，就像 JavaScript 中一样。

在下边的例子中，我们假设这个组件有一个本地的属性，名为 `todos` 数组，其包含了一组 todo 对象。我们在数组上使用 [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 函数来遍历每一个元素，并将其转化为一些别的东西 - 在这里我们转换为了 JSX 。

```jsx
render() {
  return (
    <div>
      {this.todos.map((todo) => 
        <div>
          <div>{todo.taskName}</div>
          <div>{todo.isCompleted}</div>
        </div>
      )}
    </div>
  )
}
```


### 处理用户输入

Stencil 适用原生的 [DOM 事件](https://developer.mozilla.org/en-US/docs/Web/Events).

这里有一个关于如何处理按钮点击的例子。注意 [箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 的用法。

```jsx
...
export class MyComponent {
  handleClick(event: UIEvent) {
    alert('Received the button click!');
  }

  render() {
    return (
      <button onClick={ (event: UIEvent) => this.handleClick(event)}>Click Me!</button>
    );
  }
}
```

另一种可选的语法如下：

```jsx
  handleClick(event: UIEvent) {
    alert('Received the button click!');
  }

  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>Click Me!</button>
    );
  }
```

两种选项都是有效的。



这里有另一个关于监听 input `change` 事件的例子。注意 [箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 的用法。

```jsx
...
export class MyComponent {
  inputChanged(event) {
    console.log('input changed: ', event.target.value);
  }

  render() {
    return (
      <input onChange={(event: UIEvent) => this.inputChanged(event)}>
    );
  }
}
```


### 复杂的模版内容

到目前为止我们看了很多如何返回只有一个根元素的例子。我们也可以在返回的根元素里嵌套其他的元素，就像正常的 HTMl 那样：

```jsx
render() {
  return (
  <div class="container">
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>
  );
}
```

当组件有多个“顶级”元素时，`render` 函数可以返回一个数组。
注意 `<div>` 之间的逗号。

```jsx
render() {
  return ([
  // 第一个顶级元素
  <div class="container">
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>,

  // 第二个顶级元素, 注意上方的都逗号(,)
  <div class="another-container">
    ... more html content ...
  </div>
  ]);
}
```

<stencil-route-link url="/docs/my-first-component" router="#router" custom="true">
  <button class="backButton">
    返回
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/decorators" custom="true">
  <button class="nextButton">
    继续
  </button>
</stencil-route-link>
