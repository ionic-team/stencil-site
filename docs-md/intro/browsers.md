# 浏览器支持

Stencil 构建的 Web 组件可以原生或接近原生地运行在所有被广泛使用了的浏览器中。

Web 组件是一组标准化的浏览器 API，Web 组件的核心是自定义元素 v1 标准 (Custom Elements v1 spec)。这个标准规定了如何跨浏览器实现定义和创建新的 HTML 标签。v1 标准是 v0 标准的继任者，v0 已经被废弃。

自定义元素被 Chrome 和 Safari 浏览器原生支持 ( 包括 iOS！) ，并且再 Firefox 和 EDGE 中也将得到支持。
实际上，Firefox 已经原生支持了这个特性，只需要打开一个标签开关(flag) 即可。

对于没有原生支持的浏览器，开发者可以使用补丁 (polyfill) 来无缝使用自定义元素，仅有微乎其微的性能损失。 

Stencil 使用动态加载器来加载自定义元素的补丁 (polyfill)，仅浏览器需要它们的时候才加载。算上补丁(polyfill)，Stencil 支持的浏览器涵盖了 Chrome (和所有以 Chrome 为核心的浏览器), Safari, Firefox, Edge, 和 IE11。

Web 组件以以上的方式在2017年被用于生产环境中。