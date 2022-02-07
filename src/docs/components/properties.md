---
title: Properties
description: Properties
url: /docs/properties
contributors:
  - jthoms1
  - rwaskiewicz
---

# Properties

Props are custom attributes/properties exposed publicly on an HTML element. They allow developers to pass data to a
component to render or otherwise use.

## The Prop Decorator (`@Prop()`)

Props are declared on a component using Stencil's `@Prop()` decorator, like so:

```tsx
// First, we import Prop from '@stencil/core'
import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'todo-list',
})
export class TodoList {
    // Second, we decorate a class member with @Prop()
    @Prop() name: string;
    
    render() {
        // Within the component's class, its props are
        // accessed via `this`. This allows us to render
        // the value passed to `todo-list`
        return <div>To-Do List Name: {this.name}</div>
    }
}
```

In the example above, `@Prop()` is placed before (decorates) the `name` class member, which is a string. By adding
`@Prop()` to `name`, Stencil will expose `name` as an attribute on the element, which can be set wherever the component
is used:

```tsx
{/* Here we use the component in a TSX file */}
<todo-list name={"Tuesday's To-Do List"}></todo-list>
```
```html
<!-- Here we use the component in an HTML file -->
<todo-list name="Tuesday's To-Do List"></todo-list>
```

In the example above the `todo-list` component is used almost identically in TSX and HTML. The only difference between
the two is that in JSX, the value assigned to a prop (in this case, `name`) is wrapped in curly braces. In some cases
however, the way props are passed to a component differs slightly between HTML and TSX.

## Variable Casing

In the JavaScript ecosystem, it's common to use 'camelCase' when naming variables. The example component below has a
class member, `thingToDo` that is camelCased.

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'todo-list-item',
})
export class ToDoListItem {
    // thingToDo is 'camelCased'
    @Prop() thingToDo: string;

    render() {
        return <div>{this.thingToDo}</div>;
    }
}
```

Since `thingToDo` is a prop, so we can provide a value to it when we use our `todo-list-item` component. Providing a
value to a camelCased prop like `thingToDo` is nearly identical in TSX and HTML.

When we use our component in a TSX file, an attribute uses camelCase:

```tsx
<todo-list-item thingToDo={"Learn about Stencil Props"}></todo-list-item>
```

In HTML, the attribute must use 'dash-case' like so:

```html
<todo-list-item thing-to-do="Learn about Stencil Props"></todo-list-item>
```

## Data Flow

Props should be used to pass data down from a parent component to its child component(s).

The example below shows how a `todo-list` component uses three `todo-list-item` child components to render a ToDo list.

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'todo-list',
})
export class TodoList {
  render() {
    return (
      <div>
        <h1>To-Do List Name: Stencil To Do List</h1>
        <ul> 
           {/* Below are three Stencil components that are children of `todo-list`, each representing an item on our list */}
           <todo-list-item thingToDo={"Learn about Stencil Props"}></todo-list-item>
           <todo-list-item thingToDo={"Write some Stencil Code with Props"}></todo-list-item>
           <todo-list-item thingToDo={"Dance Party"}></todo-list-item>
        </ul>
      </div>
    )
  }
}
```
```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'todo-list-item',
})
export class ToDoListItem {
  @Prop() thingToDo: string;
  
  render() {
    return <li>{this.thingToDo}</li>;
  }
}
```

> Note: Children components should not know about or reference their parent components.  This allows Stencil to
> efficiently re-render your components. Passing a reference to a component as a prop may cause unintended side effects.

## Mutability

A Prop is by default immutable from inside the component logic. Once a value is set by a user, the component cannot
update it internally.

## Types

Props can be a `boolean`, `number`, `string`, or even an `Object` or `Array`.  The example below expands the 
`todo-list-item` to add a few more props with different types.

```tsx
import { Component, Prop, h } from '@stencil/core';
// `MyHttpService` is an `Object` in this example
import { MyHttpService } from '../some/local/directory/MyHttpService';

@Component({
    tag: 'todo-list-item',
})
export class ToDoListItem {
    @Prop() isComplete: boolean;
    @Prop() timesCompletedInPast: number;
    @Prop() thingToDo: string;
    @Prop() myHttpService: MyHttpService;
}
```

### Boolean Props

A property on a Stencil component that has a type of `boolean` may be declared as:

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'todo-list-item',
})
export class ToDoListItem {
    @Prop() isComplete: boolean;
}
```

To use this version of `todo-list-item` in HTML, we pass the string `"true"`/`"false"` to the component:
```html
<!-- Set isComplete to 'true' -->
<todo-list-item is-complete="true"></todo-list-item>
<!-- Set isComplete to 'false' -->
<todo-list-item is-complete="false"></todo-list-item>
```

To use this version of `todo-list-item` in TSX, `true`/`false` is used, surrounded by curly braces:
```tsx
// Set isComplete to 'true'
<todo-list-item isComplete={true}></todo-list-item>
// Set isComplete to 'false'
<todo-list-item isComplete={false}></todo-list-item>
```

There are a few ways in which Stencil treats props that are of type `boolean` that are worth noting:

1. The value of a boolean prop will be `false` if provided the string "false" in HTML
    ```html
    <!-- The 'todo-list-item' component will have an isComplete value of `false` -->
    <todo-list-item is-complete="false"></todo-list-item>
    ```
2. The value of a boolean prop will be `true` if provided a string that is not `"false"` in HTML
    ```html
    <!-- The 'todo-list-item' component will have an isComplete value of -->
    <!-- `true` for each of the following examples -->
    <todo-list-item is-complete=""></todo-list-item>
    <todo-list-item is-complete="0"></todo-list-item>
    <todo-list-item is-complete="False"></todo-list-item>
    ```
3. The value of a boolean prop will be `undefined` if it has no [default value](properties#default-values) and one of
the following applies:
   1. the prop is not included when using the component
   2. the prop is included when using the component, but is not given a value
    ```html
    <!-- Both examples using the 'todo-list-item' component will have an --> 
    <!-- isComplete value of `undefined` -->
    <todo-list-item></todo-list-item>
    <todo-list-item is-complete></todo-list-item>
    ```

### Number Props

A property on a Stencil component that has a type of `number` may be declared as:

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'todo-list-item',
})
export class ToDoListItem {
    @Prop() timesCompletedInPast: number;
}
```

To use this version of `todo-list-item` in HTML, we pass the numeric value as a string to the component:
```html
<!-- Set timesCompletedInPast to '0' -->
<todo-list-item times-completed-in-past="0"></todo-list-item>
<!-- Set timesCompletedInPast to '23' -->
<todo-list-item times-completed-in-past="23"></todo-list-item>
```

To use this version of `todo-list-item` in TSX, a number surrounded by curly braces is passed to the component:
```tsx
// Set timesCompletedInPast to '0'
<todo-list-item timesCompletedInPast={0}></todo-list-item>
// Set timesCompletedInPast to '23'
<todo-list-item timesCompletedInPast={23}></todo-list-item>
```

### String Props

A property on a Stencil component that has a type of `string` may be declared as:

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'todo-list-item',
})
export class ToDoListItem {
    @Prop() thingToDo: string;
}
```

To use this version of `todo-list-item` in HTML, we pass the value as a string to the component:
```html
<!-- Set thingToDo to 'Learn about Stencil Props' -->
<todo-list-item thing-to-do="Learn about Stencil Props"></todo-list-item>
<!-- Set thingToDo to 'Write some Stencil Code with Props' -->
<todo-list-item thing-to-do="Write some Stencil Code with Props"></todo-list-item>
```

To use this version of `todo-list-item` in TSX, we pass the value as a string to the component. Curly braces aren't
required when providing string values to props in TSX, but are permitted:
```tsx
// Set thingToDo to 'Learn about Stencil Props'
<todo-list-item thingToDo="Learn about Stencil Props"></todo-list-item>
// Set thingToDo to 'Write some Stencil Code with Props'
<todo-list-item thingToDo="Learn about Stencil Props"></todo-list-item>
// Set thingToDo to 'Write some Stencil Code with Props' with curly braces
<todo-list-item thingToDo={"Learn about Stencil Props"}></todo-list-item>
```

### Object Props

A property on a Stencil component that has a type of `Object` may be declared as:

```tsx
// TodoList.tsx
import { Component, Prop, h } from '@stencil/core';
import { MyHttpService } from '../path/to/MyHttpService';

@Component({
    tag: 'todo-list-item',
})
export class ToDoListItem {
    @Prop() myHttpService: MyHttpService;
}
```
```tsx
// MyHttpService.ts 
export class MyHttpService {
    // This implementation intentionally left blank
}
```

In TypeScript, `MyHttpService` is both an `Object` and a 'type'. When using user-defined types like `MyHttpService`, the
type must always be exported using the `export` keyword where it is declared. The reason for this is Stencil needs to
know what type the prop `myHttpService` is when passing an instance of `MyHttpService` to `TodoList` from a parent
component.

### Array Props

A property on a Stencil component that is an Array may be declared as:

```tsx
// TodoList.tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'todo-list-item',
})
export class ToDoListItem {
    @Prop() labels: string[];
}
```

### Advanced Prop Types

#### Union Types

Stencil allows props types be [union types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types),
which allows you as the developer to combine two or more pre-existing types to create a new one. The example below shows
a `todo-list-item` who accepts a `isComplete` prop that can be either a string or boolean.

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'todo-list-item',
})
export class ToDoListItem {
    @Prop() isComplete: string | boolean;
}
```

This component can be used in both HTML:
```html
<todo-list-item is-complete="true"></todo-list-item>
<todo-list-item is-complete="false"></todo-list-item>
```
and TSX:
```tsx
<todo-list-item isComplete={true}></todo-list-item>
<todo-list-item isComplete={false}></todo-list-item>
```

## Default Values

Stencil props can be given a default value as a fallback in the event a prop is not provided:

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'component-with-some-props',
})
export class ComponentWithSomeProps {
    @Prop() aNumber = 42;
    @Prop() aString = 'defaultValue';

    render() {
        return <div>The number is {this.aNumber} and the string is {this.aString}</div>
    }
}
```
Regardless of if we use this component in HTML or TSX, "The number is 42 and the string is defaultValue" is displayed
when no values are passed to out component:
```html
<component-with-some-props></component-with-some-props>
```

The default values on a component can be overridden by specifying a value for a prop with a default value. For the
example below, "The number is 7 and the string is defaultValue" is rendered. Note how the value provided to `aNumber`
overrides the default value, but the default value of `aString` remains the same:
```html
<component-with-some-props a-number="7"></component-with-some-props>
```

### Inferring Types from Default Values

When a default value is provided, Stencil is able to infer the type of the prop from the default value:

```tsx
import { Component, Prop, h } from '@stencil/core';
@Component({
    tag: 'component-with-many-props',
})
export class ComponentWithManyProps {
    // both props below are of type 'boolean'
    @Prop() boolean1: boolean;
    @Prop() boolean2 = true;

    // both props below are of type 'number'
    @Prop() number1: number;
    @Prop() number2 = 42;
    
    // both props below are of type 'string'
    @Prop() string1: string;
    @Prop() string2 = 'defaultValue';
}
```

## Required Properties

By placing a `!` after a prop name, Stencil mark that the attribute/property as required. This ensures that when the
component is used in TSX, the property is used:

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
   tag: 'todo-list-item',
})
export class ToDoListItem {
   // Note the '!' after the variable name.
   @Prop() thingToDo!: string;
}
```

## Prop Validation

To do validation of a Prop, you can use the [@Watch()](reactive-data/#watch-decorator) decorator:

```tsx
import { Component, Prop, Watch, h } from '@stencil/core';

@Component({
   tag: 'todo-list-item',
})
export class TodoList {
  // Mark the prop as required, to make sure it is provided when we use `todo-list-item`.
  // We want stricter guarantees around the contents of the string, so we'll use `@Watch` to perform additional validation.
  @Prop() thingToDo!: string;

  @Watch('thingToDo')
  validateName(newValue: string, _oldValue: string) {
    // don't allow `thingToDo` to be the empty string  
    const isBlank = typeof newValue !== 'string' || newValue === '';
    if (isBlank) { 
        throw new Error('thingToDo is a required property and cannot be empty') 
    };
    // don't allow `thingToDo` to be a string with a length of 1
    const has2chars = typeof newValue === 'string' && newValue.length >= 2;
    if (!has2chars) {
       throw new Error('thingToDo must have a length of more than 1 character')
    };
  }
}
```

## @Prop() Options

The `@Prop()` decorator accepts an optional argument to specify certain options to modify how a prop on a component
behaves. `@Prop()`'s optional argument is an object literal containing one or more of the following fields: 

```tsx
export interface PropOptions {
  attribute?: string;
  mutable?: boolean;
  reflect?: boolean;
}
```

### Attribute Name (`attribute`)

Properties and component attributes are strongly connected but not necessarily the same thing. While attributes are an
HTML concept, properties are a JavaScrip concept inherent to Object-Oriented Programming.

In Stencil, the `@Prop()` decorator applied to a **property** will instruct the Stencil compiler to also listen for
changes in a DOM attribute.

Usually, the name of a property is the same as the attribute, but this is not always the case. Take the following
component as example:

```tsx
import { Component, Prop, h } from '@stencil/core';
// `MyHttpService` is an `Object` in this example
import { MyHttpService } from '../some/local/directory/MyHttpService';

@Component({
   tag: 'todo-list-item',
})
export class ToDoListItem {
   @Prop() isComplete: boolean;
   @Prop() thingToDo: string;
   @Prop() myHttpService: MyHttpService;
}
```

This component has **3 properties**, but the compiler will create **only 2 attributes**: `is-complete` and
`thing-to-do`.

```html
<todo-list-item is-complete="false" thing-to-do="Read Attribute Naming Section of Stencil Docs"></my-cmp>
```

Notice that the `myHttpService` type is not a primitive (e.g. not a `number`, `boolean`, or `string`). Since DOM
attributes can only be strings, it does not make sense to have an associated DOM attribute called "my-http-service".

At the same time, the `isComplete` & `thingToDo` properties follow 'camelCase' naming, but attributes are 
case-insensitive, so the attribute names will be `is-complete` & `thingToDo` by default.

Fortunately, this "default" behaviour can be changed using the `attribute` option of the `@Prop()` decorator:

```tsx
import { Component, Prop, h } from '@stencil/core';
// `MyHttpService` is an `Object` in this example
import { MyHttpService } from '../some/local/directory/MyHttpService';

@Component({
   tag: 'todo-list-item',
})
export class ToDoListItem {
   @Prop({ attribute: 'complete' }) isComplete: boolean;
   @Prop({ attribute: 'thing' }) thingToDo: string;
   @Prop({ attribute: 'my-service' }) myHttpService: MyHttpService;
}
```

By using this option, we are being explicit about which properties have an associated DOM attribute and the name of it
when using the component in HTML.

```html
<todo-list-item complete="false" thing="Read Attribute Naming Section of Stencil Docs" my-service="{}"></my-cmp>
```

### Prop Mutability (`mutable`)

A Prop is by default immutable from inside the component logic. However, it's possible to explicitly allow a Prop to be
mutated from inside the component, by declaring it as mutable, as in the example below:

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
   tag: 'todo-list-item',
})
export class ToDoListItem {
   @Prop({ mutable: true }) thingToDo: string;

   componentDidLoad() {
      this.thingToDo = 'Ah! A new value!';
   }
}
```

### Reflect Properties Values to Attributes (`reflect`)

In some cases it may be useful to keep a Prop in sync with an attribute. In this case you can set the `reflect` option
in the `@Prop()` decorator to `true`. When a prop is reflected, its will be rendered in the DOM as an HTML attribute.

Take the following component as example:

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'todo-list-item',
})
export class ToDoListItem {
    @Prop({ reflect: false }) isComplete: boolean = false;
    @Prop({ reflect: true }) timesCompletedInPast: number = 2;
    @Prop({ reflect: true }) thingToDo: string = "Read Reflect Section of Stencil Docs";
}
```

The component in the example above uses [default values](properties#default-values), and can be used in HTML like so:
```html
<!-- Example of using todo-list-item in HTML -->
<todo-list-item></todo-list-item>
```

When rendered in the DOM, the properties configured with `reflect: true` will be reflected in the DOM:

```html
<todo-list-item times-completed-in-past="2" thing-to-do="Read Reflect Section of Stencil Docs" ></todo-list-item>
```

While the properties not set to "reflect", such as `isComplete`, are not rendered as attributes, it does not mean it's
not there - the `isComplete` property still contains the `false` value as assigned:

```tsx
const cmp = document.querySelector('todo-list-item');
console.log(cmp.isComplete); // it prints 'false'
```
