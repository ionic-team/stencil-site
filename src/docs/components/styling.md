---
title: Styling Components
description: Styling Components
url: /docs/styling
contributors:
  - jthoms1
  - shreeshbhat
---

# Styling Components

## Shadow DOM

### What is Shadow DOM

[Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) is an API built into the browser that allows for DOM encapsulation and style encapsulation. Shadow DOM shields our component from its surrounding environment. This means that we do not need to be concerned about scoping our CSS correctly, nor worry about our internal DOM being interfered with by anything outside our component.

### Browser Support

Shadow DOM is currently natively supported in the following browsers:

- Chrome
- Firefox
- Safari
- Opera

In browsers which do not support Shadow DOM we fall back to scoped CSS. This gives you the style encapsulation that comes along with Shadow DOM but without loading in a huge Shadow DOM polyfill.

> Confused about what scoped CSS is? Don't worry, we will [explain this later](#scoped-css) in detail.

### Shadow DOM in Stencil

Shadow DOM is not currently turned on by default for web components built with Stencil. To turn on Shadow DOM in a web component built with Stencil, you can use the `shadow` param in the component decorator. Below is an example of this:

```tsx
@Component({
  tag: 'shadow-component',
  styleUrl: 'shadow-component.css',
  shadow: true
})
export class ShadowComponent {

}
```

### Things to remember with Shadow DOM

- QuerySelector: When using Shadow DOM and you want to query an element inside your web component, you must first use the [`@Element` decorator](/docs/host-element#element-decorator) to gain access to the host element, and then you can use the `shadowRoot` property to perform the query. This is because all of your DOM inside your web component is in a shadowRoot that Shadow DOM creates. For example:
  
```tsx
import { Component, Element } from '@stencil/core';

@Component({
  tag: 'shadow-component',
  styleUrl: 'shadow-component.css',
  shadow: true
})
export class ShadowComponent {

  @Element() el: HTMLElement;

  componentWillLoad() {
    const elementInShadowDom = this.el.shadowRoot.querySelector('.a-class-selector');

    ...
  }

}
```
  

- Global Styles: To externally style a component with Shadow DOM you must use [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) or the proposed [CSS Shadow Parts](https://meowni.ca/posts/part-theme-explainer/).

- Normally you would wrap your styles in the tag name of the component like so:

```css
my-element {
  color: black;
}
my-element div {
  background: blue;
}
```

With Shadow DOM enabled, elements within the shadow root are scoped, and styles outside of the component do not apply. As a result, CSS selectors inside the component can be simplified, and the above example could be:

```css
:host {
  color: black;
}
div {
  background: blue;
}
```

### Scoped CSS

In browsers that do not currently support Shadow DOM, web components built with Stencil will fall back to using scoped CSS instead of loading a large Shadow DOM polyfill. Scoped CSS automatically scopes CSS to an element by appending each of your styles with a data attribute at run time.


## Global styles

While Stencil encourages developers to write the styles scoped to each component, sometimes it's required to have global styles that apply to the whole document regardless of which components are used.

In order to do so, `stencil.config.ts` comes with an optional [`globalStyle` setting](https://stenciljs.com/docs/config#globalstyle) that points to a stylesheet path.

```tsx
export const config: Config = {
  namespace: 'app',
  globalStyle: 'src/global/global.css',
  outputTarget: [{
    type: 'www'
  }]
}
```

The compiler will run the same minification, autoprefixing and plugins over `global.css` and generate an output file for the [`www`](https://stenciljs.com/docs/www) and [`dist`](https://stenciljs.com/docs/distribution) output targets. The generated file will always have the `.css` extension and be named as the specified `namespace`.

In the example above, since the namespace is `app`, the generated global styles file will be located at: `./www/build/app.css`.

This file must be manually imported in the `index.html` of your application, which you can find in `src/index.html`:

```tsx
<link rel="stylesheet" href="/build/app.css">
```

Keep in mind that global styles should be reserved for **global** styles, ie, you should try to avoid styling your components with it, instead, some interesting use cases can be:

- Theming: defining CSS variables used across the app
- Load fonts with `@font-face`
- App wide font-family
- Style body background
- CSS resets


## CSS Variables

### What are CSS Variables?

[CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) are a lot like [Sass Variables](https://ionicframework.com/docs/theming/sass-variables/), but built into the browser. CSS Variables allow you to specify CSS properties that can be used across your app.

### Use Case

One use case for CSS Variables is colors. If your app has a primary brand color that is used across your app then instead of writing that same color out each place you need it in your app you can create a variable for it and then use that variable anywhere you need that color in your app. Also, if you ever need to change this color you will only have to change the variable and then it will be updated across your app.

### Using CSS Variables in Stencil

Here are the recommended steps to use CSS Variables in Stencil:

- Create a CSS file to hold your variable definitions. We normally recommend creating a `variables.css` file in `src/global/`
- You can then put this config `globalStyle: 'src/global/variables.css'` into your `stencil.config.ts` file.

That's it! Now you can start defining your variables.

### Defining CSS Variables

Here is an example of defining a CSS Variable:

```css
/* inside our src/global/variables.css file */

:root {
  --app-primary-color: #488aff;
}
```

In this example we have defined a CSS Variable called `--app-primary-color` that is set to the color `#488aff`. The `:root` selector in this example is a [CSS pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:root) that defines the variable on the root element of your project (usually `<html>`) so that the variable can be used across your app.

### Using a CSS Variable

Here is an example of using the CSS Variable that we defined above:

```css
h1 {
  color: var(--app-primary-color)
}
```

This will apply the color we defined in our CSS Variable, in this case `#488aff`, to our `h1` element.

### IE support

IE11 does not support CSS variables natively, stencil does however provide a best-effort polyfill since it's impossible to polyfill CSS features in the same way JS can be polyfilled.

The stencil polyfill for CSS variables has plenty of limitations with respect a browser supporting it natively, and incurs a heavy performance overhead.

- Global CSS variables can only be declared in `:root` or `html`, they can't be dynamic.
- Only the stylesheets of `shadow` or `scoped` components can have dynamic CSS variables.
- CSS variables within a component can ONLY be defined within a `:host(...)` selector.

```css
:host() {
  /* This works */
  --color: black;
}
:host(.white) {
  /* This works */
  --color: white;
}
.selector {
  /* This DOES NOT work in IE11 */
  --color: red;
}
```

- CSS variables within a component can be consumed (`var(--thing)`) in any selector.

The performance overhead of using CSS variables in IE11 is elevated in terms of CPU time and memory. This is because in order to "simulate" the dynamic nature of CSS variables, the polyfill needs to dynamically generate a different stylesheet PER instance. For example, if you have 200 `my-cmp` elements in the DOM, the polyfill will attach 200 analogous `<style>` tags to style each element.

The total amount of stylesheets to be handled by IE11 can quickly grow, consuming a lot of memory and requiring a lot of CPU for each Style Invalidation.
