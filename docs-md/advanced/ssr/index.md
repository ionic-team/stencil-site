# 服务端渲染

使用 Stencil 的一个优点，是开启高效的服务端渲染(SSR)非常容易，不需要运行耗费资源的无头浏览器。此外，决定在服务端渲染每个页面之前，你最好看一下[预渲染](/docs/prerendering)的内容。

Stencil 支持 Node.js 服务，并且 SSR 渲染引擎已经内嵌到  `@stencil/core` 包里了。要查看完整的例子，请看 [Stencil SSR Starter](https://github.com/ionic-team/stencil-ssr-starter)。


## Stencil SSR Express 中间件

最简单的开启 SSR 的方法是使用 Express 中间件：

```javascript
const express = require('express');
const stencil = require('@stencil/core/server');

// 创建 express app
const app = express();

// 设置 express 端口
const port = 3030;

// 载入 stencil 设置
const config = stencil.loadConfig(__dirname);

// 服务端渲染 html 页面
app.use(stencil.ssrPathRegex, stencil.ssrMiddleware({ config }));

// 从 www 文件夹托管所有静态文件
app.use(express.static(config.wwwDir));

// 开启服务
app.listen(port, () => config.logger.info(`server started at http://localhost:${ port }`));

```


## Node.js 示例

```javascript
const express = require('express');
const fs = require('fs');
const stencil = require('@stencil/core/server');

// 载入 stencil 设置
const config = stencil.loadConfig(__dirname);

// 创建渲染器
const renderer = stencil.createRenderer(config);

let srcIndexHtml: string;
try {
  // 载入 index.html
  srcIndexHtml = fs.readFileSync(config.srcIndexHtml, 'utf-8');

} catch (e) {
  console.error(`error loading srcIndexHtml: ${e}`);
}

return function(req: any, res: any) {

  // hydrate level 4, please!
  renderer.hydrateToString({
    html: srcIndexHtml,
    req: req
  }).then(results => {

    // 记录诊断日志
    results.diagnostics.forEach(d => {
      console.log(d.messageText);
    });

    // respond with the hydrated html
    res.send(results.html);
  });
};
```

<stencil-route-link url="/docs/prerendering" router="#router" custom="true">
  <button class="backButton">
    返回
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/service-workers" custom="true">
  <button class="nextButton">
    继续
  </button>
</stencil-route-link>
