# 处理 arrays 和 objects

Stencil 组件在属性 (props) 和状态 (state) 变化时会更新。为了高效和简单，Stencil 仅仅比较引用的变化，数组 (array) 和对象 (object) 内部发生数据变化时，不会重新渲染。

要更新数组 (array) 或者对象 (object) ，使用下边这些，即将成为现代 JavaScript toolbox 的核心部分的技巧吧。

### 更新 arrays

对于数组，这意味着标准的可变操作，诸如 `push()` 和 `unshift()` 都不会生效(译者注：不会使得引用改变进而引发重新渲染)。相对地，不可变(译者注：函数式)操作诸如`map()` 和 `filter()` ，以及 ES6 的展开语法，都会返回一个新的数组的拷贝。

例如，要把一个新的项目入栈数组，那么就用原来的数组创建一个新的数组，把新的值放在末尾。

```js
// 我们原本的数组
this.items = ['ionic', 'stencil', 'webcomponents'];

// 更新数组
this.items = [
  ...this.items,
  'awesomeness'
]
```

`...this.items` 语法是 JavaScript 的新特性，可以就地"展开"给定的对象。点击[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)阅读有更多关于展开操作符的内容。

### 跟新 object

展开操作符同样适用于对象 (object)。和数组一样，可变操作不会触发 Stencil 的视图更新，但是返回一个新的对象的拷贝会触发。下面是例子：

```js
// 我们原本的对象
let myCoolObject = {first: '1', second: '2'}

// 更新对象
myCoolObject = { ...myCoolObject, third: '3' }

```

<stencil-route-link url="/docs/forms" router="#router" custom="true">
  <button class="backButton">
    返回
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/testing" custom="true">
  <button class="nextButton">
    继续
  </button>
</stencil-route-link>
