# Service Workers

[Service workers](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) 是一个非常强大的  api，作为 [PWAs](https://blog.ionic.io/what-is-a-progressive-web-app/) 的核心，但是却难于使用。为了帮助开发者使用它，我们决定在 Stencil 中使用 [Workbox](https://workboxjs.org/) 来支持 Service Workers。

### 使用方法

当使用 Stencil 构建一个生产环境的版本版本时候，Stencil 编译器会自动生成一个 service worker，并且在你的 index.html 里注入必要的代码来注册 service worker。此外，因为 Stencil 生存的文件是被哈希过的，每一次当你更新生产环境的版本时，service worker 都会更新，因此可以确保你的用户永远都不会卡在一个过时的版本上。

### 配置

Stencil 内使用 Workbox，因此支持全部的 [Workbox 配置选项](https://workboxjs.org/reference-docs/latest/module-workbox-build.html#.Configuration)。这里是 Stencil 所使用的默认的配置：

```
{
  skipWaiting: true,
  clientsClaim: true,
  globPatterns: [
    '**/*.{js,css,json,html,ico,png,svg}'
  ]
};
```

该配置会预先缓存你的 app 里所有的资源。

要修改这个配置，你可以在 Stencil 配置中使用 `serviceWorker` 参数。这里有一个例子：

```
exports.config = {
  bundles: [
    ...
  ],
  collections: [
    ...
  ],
  serviceWorker: {
    globPatterns: [
      '**/*.{js,css,json,html,ico,png}'
    ]
  }
};
```

### 使用自定义的 service worker

已经存在了一个 service worker 或者想要包含一些自定义的代码？我们同样支持。

让我们探索一下实现这个功能所需要的步骤：

- 首先，我们需要传递一个我们自定义的 service worker 的路径，在 serviceWorker 配置中使用 `swSrc` 参数。这里有一个例子：

```
exports.config = {
  bundles: [
    ...
  ],
  collections: [
    ...
  ],
  serviceWorker: {
    swSrc: 'src/sw.js'
  }
};
```

- 现在，我们需要在自定义的 service worker 包含一些模版代码：

```
importScripts('workbox-sw.prod.v2.1.0.js');

const workboxSW = new self.WorkboxSW();

// 你的自定义代码

workboxSW.precache([]);
```
这段代码引入了 workbox 库，创建了一个 service worker 的实例，并且告诉了 workbox 应该预先缓存的数组。



<stencil-route-link url="/docs/server-side-rendering" router="#router" custom="true">
  <button class="backButton">
    返回
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/distribution" custom="true">
  <button class="nextButton">
    继续
  </button>
</stencil-route-link>