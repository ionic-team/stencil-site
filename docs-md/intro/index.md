# Stencil: 一个为 Web 组件而生编译器

Stencil 是一个生成 Web 组件 ( 确切地说，是自定义元素 ) 的编译器。Stencil 结合了最流行框架的最佳概念，并将其转化为了简单的构建时 (build-time) 工具。

Stencil 支持如下特性

- Virtual DOM
- 异步渲染(受 React Fiber 启发)
- 响应式数据绑定
- TypeScript
- JSX

然后生成标准的 Web 组件。

因为 Stencil 生成的是符合标准的 web 组件。所以它们能和很多其他流行的框架在一起使用。也可以不使用任何框架，因为它们就是 web 组件。Stencil 同时在 web 组件之上，启用了一系列关键的能力，特别是支持服务端渲染 (SSR) 而不需要运行一个无头浏览器(headless browser)，预渲染，和对象作为组件的属性(而不仅仅是字符串)。

和直接使用自定义元素相比，Stencil 提供了额外的 API，使得编码更简单。诸如 VirtualDOM，JSX ，异步渲染这些 API，让编写快速而强大的组件工作更加容易，同时保持了与其他 web 组件的 100% 兼容。

内置到编译器的可自动重载的服务，使得开发体验同时得到改善。

### Why Stencil?

Stencil was created by the [Ionic Framework](http://ionicframework.com/) team to help build faster, more capable components that worked across all major frameworks.

While Ionic primarily targeted Cordova apps, the emergence of Progressive Web Apps as a rapidly growing target for web developers demanded a different approach to web app development performance. With Ionic's classic use of traditional frameworks and bundling techniques, the team was struggling to meet latency and code size demands for Progressive Web Apps that ran equally well on fast and slow networks, across a diversity of platforms and devices.

Additionally, framework fragmentation had created a web development interoperability nightmare, where components built for one framework didn't work with another framework.

Web Components offered a solution to both problems, pushing more work to the browser for better performance, and targeting a standards-based component model that all frameworks could use.

However, Web Components by themselves weren't enough. Building fast web apps required innovations that were previously locked up inside of traditional web frameworks. Stencil was built to pull these features out of traditional frameworks and bring them to the fast emerging Web Component standard.

<stencil-route-link url="/docs/getting-started" router="#router" custom="true">
  <button id="introButton">
    开始使用 Stencil
  </button>
</stencil-route-link>
