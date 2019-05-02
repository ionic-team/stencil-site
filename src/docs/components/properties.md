---
title: Properties
description: Properties
url: /docs/properties
contributors:
  - jthoms1
---

# Prop Decorator

Props are custom attribute/properties exposed publicly on the element that developers can provide values for. Children components should not know about or reference parent components, so Props should be used to pass data down from the parent to the child. Components need to explicitly declare the Props they expect to receive using the `@Prop()` decorator. Props can be a `number`, `string`, `boolean`, or even an `Object` or `Array`. By default, when a member decorated with a `@Prop()` decorator is set, the component will efficiently re-render.

```tsx
import { Prop } from '@stencil/core';

...
export class TodoList {
|   @Prop() color: string;
|   @Prop() favoriteNumber: number;
|   @Prop() isSelected: boolean;
|   @Prop() myHttpService: MyHttpService;
}
```

Within the `TodoList` class, the Props are accessed via the `this` operator.

```tsx
logColor() {
  console.log(this.color)
}
```

Externally, Props are set on the element.

> In HTML, you must set attributes using dash-case:

```markup
<todo-list color="blue" favorite-number="24" is-selected="true"></todo-list>
```

in JSX you set an attribute using camelCase:

```markup
<todo-list color="blue" favoriteNumber={24} isSelected="true"></todo-list>
```

They can also be accessed via JS from the element.

```tsx
const todoListElement = document.querySelector('todo-list');
console.log(todoListElement.myHttpService); // MyHttpService
console.log(todoListElement.color); // blue
```

## Prop value mutability

It's important to know, that a Prop is _by default_ immutable from inside the component logic. Once a value is set by a user, the component cannot update it internally.

However, it's possible to explicitly allow a Prop to be mutated from inside the component, by declaring it as **mutable**, as in the example below:

```tsx
import { Prop } from '@stencil/core';

...
export class NameElement {
  @Prop({ mutable: true }) name: string = 'Stencil';

  componentDidLoad() {
    this.name = 'Stencil 0.7.0';
  }
}
```

## Prop default values and validation

Setting a default value on a Prop:

```tsx
import { Prop } from '@stencil/core';

...
export class NameElement {
|  @Prop() name: string = 'Stencil';
}
```

To do validation of a Prop, you can use the [@Watch()](#watch) decorator:

```tsx
import { Prop, Watch } from '@stencil/core';

...
export class TodoList {
  @Prop() name: string = 'Stencil';

| @Watch('name')
  validateName(newValue: string, oldValue: string) {
    const isBlank = typeof newValue == null;
    const has2chars = typeof newValue === 'string' && newValue.length >= 2;
    if (isBlank) { throw new Error('name: required') };
    if (!has2chars ) { throw new Error('name: has2chars') };
  }
}
```

## Reflect Properties to Attributes

In some cases it may be useful to keep a Prop in sync with an attribute. In this case you can set the `reflect` option in the `@Prop()` decorator to `true`, since it defaults to `false`:

```tsx
@Prop({
|  reflect: true
})
```

When a "prop" is set to "reflect", it means that their value will be rendered in the DOM as an HTML attribute:

Take the following component as example:

```tsx
@Component({tag: 'my-cmp'})
class Cmp {
  @Prop({reflect: true}) message = 'Hello';
  @Prop({reflect: false}) value = 'nothing';
  @Prop({reflect: true}) number = 42;
}
```

When rendered in the DOM, it will look like:

```html
<my-cmp message="Hello" number="42"></my-cmp>
```

Notice that the `value` property is not displayed in as an attribute, however it does not mean it's not there, the `number` property still contains the `42` value:

```tsx
const cmp = document.querySelector('my-cmp');
console.log(cmp.number); // it prints 42
```
