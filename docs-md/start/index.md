# 现在开始

## 开始一个新项目

要想开始一个新的 Stencil 项目，只需从 GitHub 克隆 stencil-app-starter 这个项目：

```bash
git clone https://github.com/ionic-team/stencil-app-starter my-app
cd my-app
git remote rm origin
npm install
```

然后，要打开一个具有实时刷新 (live-reload) 功能的服务，只需要运行：

```bash
npm start
```

## 测试

为了测试组件，Stencil Application Starter 使用了 Jest 和一个小的用于测试的 API。
有两种方法可以运行单元测试。通过命令运行测试一次，或者在每次源码改变导致的实时刷新
(live-reload) 时运行。

通过命令运行测试一次：

```bash
npm test
```

在实时刷新 (live-reload) 时运行测试：

```bash
npm run test.watch
```

## 编写代码

源码的改变会被实时刷新服务监控到并反馈到页面上。现在让我们对组件做一个小的更改。在你的编辑器中打开`src/components/my-name/my-name.tsx`。

我们可以忽略大部分内容，直接看`render`方法。让我们更改一下 return 语句中的内容。

```jsx
render() {
    return (
      <p>
        Hello, my props are {this.first} and {this.last}
      </p>
    );
  }

```

保存文档的时候，组件就会随着我们的更改而更新。如欲了解更多关于组件里发生了什么，请查看<stencil-route-link url="/docs/my-first-component"> component docs</stencil-route-link>

## 生产环境部署

要部署一个生产环境的版本，运行下面的命令

```
npm run build
```

这将会生成一个你的 stencil 组件的最小化版本。

<stencil-route-link url="/docs/intro" router="#router" custom="true">
  <button class="backButton">
    返回
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/my-first-component" custom="true">
  <button class="nextButton">
    继续
  </button>
</stencil-route-link>
