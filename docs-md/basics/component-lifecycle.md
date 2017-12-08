# 组件生命周期

组件在它们的生命周期中会收到事件，包括载入 (loading)，更新 (updating) 和卸载 (unloading)。在组件中收到这些事件，会调用相应的钩子函数让组件在适当的时间做适当的事。

下面简单地实现了其中的方法，Stencil 会自动调用它们：

```jsx
import { Component } from '@stencil/core';

@Component({
  tag: 'my-component'
})
export class MyComponent {

  /**
   * 组件被加载但是还没被渲染到屏幕上。
   * 
   * 这是在进行渲染前的进行某些更新操作的好地方。
   */
  componentWillLoad() {
    console.log('The component is about to be rendered');
  }

  /**
   * 组件被加载且被渲染到了屏幕上。
   * 
   * 在这里更新数据会导致组件的重新渲染。
   */
  componentDidLoad() {
    console.log('The component has been rendered');
  }

  /**
   * 组件将更新且重新渲染。
   *
   * 在组件的生命周期中，将被调用很多次，一旦数据更新就会被调用。
   */
  componentWillUpdate() {
    console.log('The component will update');
  }

  /**
   * 组件完成了更新。
   *
   * 在 componentWillUpdate 后被调用。
   */
  componentDidUpdate() {
    console.log('The component did update');
  }

  /**
   * 组件被卸载后，且元素将会被销毁。
   */
  componentDidUnload() {
    console.log('The view has been removed from the DOM');
  }
}
```

<stencil-route-link url="/docs/events" router="#router" custom="true">
  <button class="backButton">
    返回
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/forms" custom="true">
  <button class="nextButton">
    继续
  </button>
</stencil-route-link>