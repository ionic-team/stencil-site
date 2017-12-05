# 我的第一个组件


Stencil 组件是由一个后缀名为 ` .tsx ` 的文件生成， 例如 ` my-first-component.tsx `， 存放在 ` src/components ` 路径下。 ` .tsx ` 后缀在Stencil 组件编译 [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) 和TypeScript 时所需要。
<!-- Stencil components are created by adding a new file with a `.tsx` extension, such as `my-first-component.tsx`, and placing them in the `src/components` directory.
The `.tsx` extension is required since Stencil components are built using [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) and TypeScript. -->

这里有一个简单的Stencil 组件例子：
<!-- Here is an example of what a Stencil component looks like: -->

```jsx
import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-first-component',
  styleUrl: 'my-first-component.scss'
})
export class MyComponent {

  // Indicate that name should be a public property on the component
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
<!-- > Don't fully understand what's going on? Don't worry, we'll explain each pieces in detail later on. -->

当编译完成时， 这个组件就能够像HTML里其他标签一样在HTML中使用。
<!-- Once compiled, this component can be used in HTML just like any other tag. -->

```html
<my-first-component name="Max"></my-first-component>
```
> 注意: Web 组件 必须包含一个 - 在标签中。` firstComponent ` 不是一个合法的标签名称。
<!-- > Note: Web Components must have a - in the tag. `firstComponent` would not be a valid tag name. -->

当渲染完成时， 浏览器中将显示 ` My name is Max ` 。
<!-- When rendered, the browser will display `My name is Max`. -->

## 所以到底发生了什么？
<!-- ## So what's really going on here? -->

让我们深入理解一下
<!-- Let's dive in. -->

第一行里我们能看到 ` @Component ` 修饰器。 这个修饰器提供了我们的组件所需要的元数据给Stencil 编译器。 例如我们使用的标签这样的信息和拓展样式， 能够在这里设置和被编译器提取。
<!-- The first piece we see is the `@Component` decorator.
This decorator provides metadata about our component to the Stencil compiler.
Information, such as the tag to use, and external styles, can be set here and picked up by the compiler. -->

在 ` @Component() ` 修饰器下， 我们定义了一个标准的JavaScript 类。 这是你即将编写的代码块和带给你的Stencil 组件生命的地方。 你将在这里编写方法或提供业务逻辑。
<!-- Below the `@Component()` decorator, we have a standard JavaScript class.
This is where you'll write the bulk of your code to bring your Stencil component to life.
Here is where you'd write functions or provide business logic. -->

为了让组件渲染一些东西到屏幕上， 我们必须声明一个返回JSX 的渲染方法。如果你不知道JSX 是什么， 不用担心， 我们将在 <stencil-route-link url="/docs/templating">Templating Docs</stencil-router-link> 详细介绍它。
<!-- In order for the component to render something to the screen, we must declare a render function that returns JSX.
If you're not sure what JSX is, don't worry, we'll go over it in detail in the <stencil-route-link url="/docs/templating">Templating Docs</stencil-router-link>. -->

能够快速想到的是， 我们的渲染方法需要返回一个我们想要插入DOM 树的HTML 的表达式。
<!-- The quick idea is that our render function needs to return a representation of the HTML we want to push to the DOM. -->

类中的 ` name ` 属性也有一个修饰器去实现它， 就是 ` @Prop() ` 。 这个修饰器告诉编译器这个属性对组件是公开的， 用户必须自己设定它。 我们像这样设定这个属性： 

<!-- The `name` property on the class also has a decorator applied to it, `@Prop()`.
This decorator tells the compiler that the property is public to the component, and the user should be setting it.
We set this property like so: -->

```html
<my-first-component name="Max"></my-first-component>
```

任何属性被 ` @Prop() ` 修饰都会自动设置变动观察。 如果我们组件的一个用户改变了 ` name ` 属性，组件将再次调用它的 ` render `， 更新显示的内容。
<!-- Any property decorated with `@Props()` is also automatically watched for changes.
If a user of our component were to change the element's `name` property, our component would fire it's `render` function again, updating the displayed content. -->

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
