# Component Life Cycle

Each Stencil Component can optionally receive life cycle notifications for the `componentWillLoad`, `componentDidLoad` and `componentDidUnload` events. Simply implement the method and Stencil will automatically call it.

`componentWillLoad` is the ideal time to do any necessary DOM manipulations before the view is rendered in the DOM.

```
...
export class TodoList {

  componentWillLoad() {
    console.log('The view is about to be rendered');
  }

  componentDidLoad() {
    console.log('The view has been rendered');
  }

  componentDidUnload() {
    console.log('The view has been removed from the DOM');
  }
}
```