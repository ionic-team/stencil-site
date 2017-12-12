# 预渲染

一个使用 Stencil 的优点，就是它允许你对组件进行预渲染。在构建时预渲染生成静态的 html+css 文件，可以直接喂给浏览器，并与真正的 web 组件融合。举个例子，再这个页面右键查看源码，你能看到它是什么样子的。

预渲染功能内置在了 Stencil 编译器中，并且在 [app starter](https://github.com/ionic-team/stencil-app-starter) 中默认为生产模式开启。

### 优点

- 更快的 [首次有意义绘制](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)
- 对 SEO 友好
- 当 JavaScript 被用户禁用时，仍然提供某些功能(译者注：循序渐进，平稳退化)


### 需要注意的事项

- 通过 api 获取的数据不应该被预渲染，因为它们是动态的，随时会改变。

Stencil 提供了一个 `isServer` 实用变量来告诉预渲染跳过这部分代码。这里有一个例子展示了怎样使用它：

```
@Prop({ context: 'isServer' }) private isServer: boolean;

componentWillLoad() {
  // 在浏览器中 isServer 的值是 false
  // 在预渲染中的值是 true

  if (this.isServer === false) {
    fetch('someUrl').then(...)
  }
}
```

<stencil-route-link url="/docs/stencil-config" router="#router" custom="true">
  <button class="backButton">
    返回
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/server-side-rendering" custom="true">
  <button class="nextButton">
    继续
  </button>
</stencil-route-link>
