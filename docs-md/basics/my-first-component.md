# 我的第一个组件

Stencil 组件的创建方式是创建一个以 `.tsx` 为后缀的新文件，例如 `my-first-component.tsx`， 存放在 `src/components` 路径下。 
因为 Stencil 组件使用了 [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) 和 TypeScript ，所以需要 `.tsx` 后缀名。

这里有一个简单的 Stencil 组件例子：

```jsx
import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-first-component',
  styleUrl: 'my-first-component.scss'
})
export class MyComponent {
  // 这表示 name 属性将会是这个组件的公开属性
  @Prop() name: string;

  render() {
    return (
      <p>
        My name is {this.name}
      </p>
    );
  }
}
```

> 未能够透彻理解发生了什么？ 不用担心， 之后我们会详细地解释每个部分。

当编译完成时，这个组件就能够像 HTML 里其他标签一样在 HTML 中使用。

```html
<my-first-component name="Max"></my-first-component>
```

> 注意 : Web 组件 必须包含一个 - 在标签中。`firstComponent` 不是一个有效的标签名称。

当渲染完成时，浏览器中将显示 `My name is Max` 。

## 所以到底发生了什么？

让我们深入理解一下。

第一行里我们能看到 `@Component` 装饰器。这个装饰器提供了我们的组件所需要的元数据给 Stencil 编译器。例如我们使用的标签这样的信息和外部样式，能够在这里设置和被编译器提取。

在 `@Component()` 装饰器下，我们定义了一个标准的 JavaScript 类。这是你即将编写的代码块和带给你的 Stencil 组件生命的地方。你将在这里编写方法或提供业务逻辑。

为了让组件渲染一些东西到屏幕上，我们必须声明一个返回 JSX 的渲染方法。如果你不知道 JSX 是什么，不用担心，我们将在 <stencil-route-link url="/docs/templating">使用 JSX</stencil-router-link> 中详细介绍它。

简单地说，我们的渲染方法需要返回一个我们想要插入 DOM 树的 HTML 的表达式。

类中的 `name` 属性也有一个装饰器，就是 `@Prop()` 。这个装饰器告诉编译器这个属性对组件外部是公开的，用户必须自己设定它。我们像这样设定这个属性：

```html
<my-first-component name="Max"></my-first-component>
```

任何属性被 `@Prop()` 修饰都会自动观察变更。 如果我们组件的一个用户改变了 `name` 属性，组件将再次调用它的 `render`，更新显示的内容。

<stencil-route-link url="/docs/getting-started" router="#router" custom="true">
  <button class="backButton">
    返回
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/templating" custom="true">
  <button class="nextButton">
    继续
  </button>
</stencil-route-link>
