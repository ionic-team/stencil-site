# Shadow DOM

### 什么是 Shadow DOM

[Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) 是一个浏览器内建的 API ，允许包囊 DOM 和 样式。Shadow DOM 将我们的组件和外界隔绝开，这意味着我们不需要考虑诸如 css 正确的作用域，或者担心我们的 DOM 被外界其他的组件打扰。

### 浏览器支持情况

Shadow DOM 被下列浏览器原生支持：

- Chrome
- Safari
- Opera
- 大部分基于 Chromium 的浏览器

对于不支持 Shadow DOM 的浏览器，我们将回退到私有化(scoped) css。这同样让你可以像 Shadow DOM 一样包囊住样式文件，而不是选择加载庞大的补丁 (polyfill)。

> 对私有化(scoped) css 有疑惑？别担心，我们稍后将会详细解释。

###  Stencil 中到 Shadow DOM

使用 Stencil 构建 web 组件时候，Shadow DOM 并不是默认开启的。要在 web 组件中开启 Shadow DOM，可以在组件装饰器中使用 `shadow` 参数。  下面是一个例子：

```
@Component({
  tag: 'shadow-component',
  styleUrl: 'shadow-component.scss',
  shadow: true
})
export class ShadowComponent {

}
```

### 使用 Shadow DOM 时需要注意的事项

- 选择器 (QuerySelector)：使用 Shadow DOM 的时候，当你想在 web 组件内查询元素时，你必须使用 `this.el.shadowRoot.querySelector()`。 这是因为在所有在 Shadow DOM 的 web 组件中，所有的 DOM 都创建在 shadowRoot 里。

- 全局样式：要在 Shadow DOM 的组件外部定义一个组件的样式时，你必须使用 [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) 或者这个提案 [CSS Shadow Parts](https://tabatkins.github.io/specs/css-shadow-parts/)。

- 一般情况你只需要把你的样式用标签名包起来，就像这样：

```
my-element {
  div {
    background: blue;
  }
}
```

当使用 Shadow DOM 的时候，这个元素的 css 选择器是 `:host` 选择器. 所以, 在你的组件里开启 Shadow DOM 的时候，上边的代码会变成：

```
:host {
  div {
    background: blue;
  }
}
```

### 私有化 (Scoped) CSS

对于不支持 Shadow DOM 的浏览器，使用 Stencil 构建的 web 组件将会回退到使用私有化 (scoped) CSS ，而不是加载庞大的 Shadow DOM 补丁 (polyfill)。私有化 (Scoped) CSS 自动在运行时通过给你的每一个样式添加 data 属性来将其私有化到一个组件。
