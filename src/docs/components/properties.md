---
title: Properties
description: Properties
url: /docs/properties
contributors:
  - jthoms1
---

# Prop Decorator

Props are custom attribute/properties exposed publicly on the element that developers can provide values for. Children components should not know about or reference parent components, so Props should be used to pass data down from the parent to the child. Components need to explicitly declare the Props they expect to receive using the `@Prop()` decorator. Props can be a `number`, `string`, `boolean`, or even an `Object` or `Array`. By default, when a member decorated with a `@Prop()` decorator is set, the component will efficiently rerender.

```tsx
import { Prop } from '@stencil/core';

...
export class TodoList {
  @Prop() color: string;
  @Prop() favoriteNumber: number;
  @Prop() isSelected: boolean;
  @Prop() myHttpService: MyHttpService;
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

## Prop options

The `@Prop(opts?: PropOptions)` decorator accepts an optional argument to specify certain option, such as the `mutability`, the name of the DOM attribute or if the value of the property should or shouldn't be reflected into the DOM.

```tsx
export interface PropOptions {
  attribute?: string;
  mutable?: boolean;
  reflect?: boolean;
}
```

### Prop mutability

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

### Attribute Name

Properties and component attributes are strongly connected but not necessarily the same thing. While attributes are a HTML concept, properties are a JS one inherent from Object-Oriented Programming.

In Stencil, the `@Prop()` decorator applied to a **property** will instruct the Stencil compiler to also listen for changes in a DOM attribute.

Usually the name of a property is the same as the attribute, but this is not always the case. Take the following component as example:

```tsx
import { Component, Prop } from '@stencil/core';

@Component({ tag: 'my-cmp' })
class Component {
  @Prop() value: string;
  @Prop() isValid: boolean;
  @Prop() controller: MyController;
}
```

This component has **3 properties**, but the compiler will create **only 2** attributes: `value` and `is-valid`.

```markup
<my-cmp value="Hello" is-valid></my-cmp>
```

Notice that the `controller` type is not a primitive, since DOM attributes can ONLY be strings, it does not make sense to have an associated DOM attribute called "controller".

At the same time, the `isValid` property follows a _camelCase_ naming, but attributes are case-insensitive, so the attribute name will be `is-valid` by default.

Fortunately, this "default" behaviour can be changed using the `attribute` option of the `@Prop()` decorator:


```tsx
import { Component, Prop } from '@stencil/core';

@Component({ tag: 'my-cmp' })
class Component {
  @Prop() value: string;
  @Prop({ attribute: 'valid' }) isValid: boolean;
  @Prop({ attribute: 'controller' }) controller: MyController;
}
```

By using this option, we are being explicit about which properties have an associated DOM attribute and the name of it.


### Reflect Properties Values to Attributes

In some cases it may be useful to keep a Prop in sync with an attribute. In this case you can set the `reflect` option in the `@Prop()` decorator to `true`, since it defaults to `false`:

```tsx
@Prop({
  reflect: true
})
```

When a "prop" is set to "reflect", it means that their value will be rendered in the DOM as an HTML attribute:

Take the following component as example:

```tsx
@Component({ tag: 'my-cmp' })
class Cmp {
  @Prop({ reflect: true }) message = 'Hello';
  @Prop({ reflect: false }) value = 'The meaning of life...';
  @Prop({ reflect: true }) number = 42;
}
```

When rendered in the DOM, it will look like:

```markup
<my-cmp message="Hello" number="42"></my-cmp>
```
Notice that properties set to "reflect" (true) render as attributes, and properties not set to "reflect" do not.

While the properties not set to "reflect", such as 'value', are not rendered as attributes, it does not mean it's not there - the `value` property still contains the `The meaning of life...` value as assigned:

```tsx
const cmp = document.querySelector('my-cmp');
console.log(cmp.value); // it prints 'The meaning of life...'
```

## Prop default values and validation

Setting a default value on a Prop:

```tsx
import { Prop } from '@stencil/core';

...
export class NameElement {
  @Prop() name: string = 'Stencil';
}
```

To do validation of a Prop, you can use the [@Watch()](reactive-data/#watch-decorator) decorator:

```tsx
import { Prop, Watch } from '@stencil/core';

...
export class TodoList {
  @Prop() name: string = 'Stencil';

  @Watch('name')
  validateName(newValue: string, oldValue: string) {
    const isBlank = typeof newValue == null;
    const has2chars = typeof newValue === 'string' && newValue.length >= 2;
    if (isBlank) { throw new Error('name: required') };
    if (!has2chars) { throw new Error('name: has2chars') };
  }
}
```
