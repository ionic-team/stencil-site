---
title: Decorators
sidebar_label: Component
description: Decorators
slug: /component
contributors:
  - jthoms1
  - rwaskiewicz
---

# Component Decorator

Each Stencil Component must be decorated with a `@Component()` decorator from the `@stencil/core` package. In the simplest case, developers must provide an HTML `tag` name for the component. Often times, a `styleUrl` is used as well, or even `styleUrls`, where multiple different style sheets can be provided for different application modes/themes.

Use a relative url to the `.css` file for the styleUrl(s).

```tsx
import { Component } from '@stencil/core';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css'
})
export class TodoList {

}
```

## Component Options

The `@Component(opts: ComponentOptions)` takes a required object containing all the component-level features.
The `tag` name is the only required property, but there are plenty of them:

```tsx
export interface ComponentOptions {
  /**
   * Tag name of the web component. Ideally, the tag name must be globally unique,
   * so it's recommended to choose a unique prefix for all your components within the same collection.
   *
   * In addition, tag name must contain a '-'
   */
  tag: string;

  /**
   * If `true`, the component will use scoped stylesheets. Similar to shadow-dom,
   * but without native isolation. Defaults to `false`.
   */
  scoped?: boolean;

  /**
   * If `true`, the component will use native shadow-dom encapsulation, it will fallback to `scoped` if the browser
   * does not support shadow-dom natively. Defaults to `false`.
   * 
   * If an object literal containing `delegatesFocus` is provided, the component will use native shadow-dom
   * encapsulation. When `delegatesFocus` is set to `true`, the component will have `delegatesFocus: true` added to its
   * shadow DOM. When `delegatesFocus` is `true` and a non-focusable part of the component is clicked:
   * - the first focusable part of the component is given focus
   * - the component receives any available `focus` styling
   * Setting `delegatesFocus` to `false` will not add the `delegatesFocus` property to the shadow DOM and therefore
   * will have the focusing behavior described for `shadow: true`.
   */
  shadow?: boolean | { delegatesFocus: boolean };

  /**
   * Relative URL to some external stylesheet file. It should be a `.css` file unless some
   * external plugin is installed like `@stencil/sass`.
   */
  styleUrl?: string;

  /**
   * Similar as `styleUrl` but allows one to specify different stylesheets for different modes.
   */
  styleUrls?: string[] | d.ModeStyles;

  /**
   * String that contains inlined CSS instead of using an external stylesheet.
   * The performance characteristics of this feature are the same as using an external stylesheet.
   *
   * Notice, you can't use sass, or less, only `css` is allowed using `styles`, use `styleUrl` if you need more advanced features.
   */
  styles?: string;

  /**
   * Array of relative links to folders of assets required by the component.
   */
  assetsDirs?: string[];

  /**
   * @deprecated Use `assetsDirs` instead
   */
  assetsDir?: string;
}
```


## Embedding or Nesting Components

Components can be composed easily by adding the HTML tag to the JSX code. Since the components are just HTML tags, nothing needs to be imported to use a Stencil component within another Stencil component.

Here's an example of using a component within another component:

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-embedded-component'
})
export class MyEmbeddedComponent {
  @Prop() color: string = 'blue';

  render() {
    return (
      <div>My favorite color is {this.color}</div>
    );
  }
}
```

```tsx
import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-parent-component'
})
export class MyParentComponent {

  render() {
    return (
      <div>
        <my-embedded-component color="red"></my-embedded-component>
      </div>
    );
  }
}
```

The `my-parent-component` includes a reference to the `my-embedded-component` in the `render()` function.
