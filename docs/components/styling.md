---
title: Styling Components
sidebar_label: Styling
description: Styling Components
slug: /styling
contributors:
  - jthoms1
  - shreeshbhat
  - a-giuliano
---

# Styling Components

## Shadow DOM

### What is the Shadow DOM?

The [shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) is an API built into the browser that allows for DOM encapsulation and style encapsulation. It is a core aspect of the Web Component standards. The shadow DOM shields a component’s styles, markup, and behavior from its surrounding environment. This means that we do not need to be concerned about scoping our CSS to our component, nor worry about a component’s internal DOM being interfered with by anything outside the component.

When talking about the shadow DOM, we use the term "light DOM" to refer to the “regular” DOM. The light DOM encompasses any part of the DOM that does not use the shadow DOM.

### Shadow DOM in Stencil

The shadow DOM hides and separates the DOM of a component in order to prevent clashing styles or unwanted side effects. We can use the shadow DOM in our Stencil components to ensure our components won’t be affected by the applications in which they are used.

To use the Shadow DOM in a Stencil component, you can set the `shadow` option to `true` in the component decorator.

```tsx
@Component({
  tag: 'shadow-component',
  styleUrl: 'shadow-component.css',
  shadow: true,
})
export class ShadowComponent {}
```

If you'd like to learn more about enabling and configuring the shadow DOM, see the [shadow field of the component api](/docs/component#component-options).

By default, components created with the [`stencil generate` command](/docs/cli#stencil-generate-sub-folder) use the shadow DOM.

### Styling with the Shadow DOM

With the shadow DOM enabled, elements within the shadow root are scoped, and styles outside of the component do not apply. As a result, CSS selectors inside the component can be simplified, as they will only apply to elements within the component. We do not have to include any specific selectors to scope styles to the component.

```css
:host {
  color: black;
}

div {
  background: blue;
}
```

:::note
The `:host` pseudo-class selector is used to select the [`Host` element](/docs/host-element) of the component
:::

With the shadow DOM enabled, only these styles will be applied to the component. Even if a style in the light DOM uses a selector that matches an element in the component, those styles will not be applied.

### Shadow DOM QuerySelector

When you are using the shadow DOM and you want to query an element inside your web component, you must use `this.el.shadowRoot.querySelector()`. This is because all of the DOM inside your web component is in a shadowRoot that the shadow DOM creates.

### Shadow DOM Browser Support

The shadow DOM is currently natively supported in the following browsers:

- Chrome
- Firefox
- Safari
- Edge (v79+)
- Opera

In browsers which do not support the shadow DOM we fall back to scoped CSS. This gives you the style encapsulation that comes along with the shadow DOM but without loading in a huge shadow DOM polyfill.

### Scoped CSS

An alternative to using the shadow DOM is using scoped components. You can use scoped components by setting the `scoped` option to `true` in the component decorator.

```tsx
@Component({
  tag: 'scoped-component',
  styleUrl: 'scoped-component.css',
  scoped: true,
})
export class ScopedComponent {}
```

Scoped CSS is a proxy for style encapsulation. It works by appending a data attribute to your styles to make them unique and thereby scope them to your component. It does not, however, prevent styles from the light DOM from seeping into your component.

## CSS Custom Properties

CSS custom properties, also often referred to as CSS variables, are used to contain values that can then be used in multiple CSS declarations. For example, we can create a custom property called `--color-primary` and assign it a value of `blue`.

```css
:host {
  --color-primary: blue;
}
```

And then we can use that custom property to style different parts of our component

```css
h1 {
  color: var(--color-primary);
}
```

### Customizing Components with Custom Properties

CSS custom properties can allow the consumers of a component to customize a component’s styles from the light DOM. Consider a `shadow-card` component that uses a custom property for the color of the card heading.

```css
:host {
  --heading-color: black;
}

.heading {
  color: var(--heading-color);
}
```

:::note
CSS custom properties must be declared on the `Host` element (`:host`) in order for them to be exposed to the consuming application.
:::

The `shadow-card` heading will have a default color of `black`, but this can now be changed in the light DOM by selecting the `shadow-card` and changing the value of the `--heading-color` custom property.

```css
shadow-card {
  --heading-color: blue;
}
```

## CSS Parts

CSS custom properties can be helpful for customizing components from the light DOM, but they are still a little limiting as they only allow a user to modify specific properties. For situations where users require a higher degree of flexibility, we recommend using the [CSS `::part()` pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::part). You can define parts on elements of your component with the “part” attribute.

```tsx
@Component({
  tag: 'shadow-card',
  styleUrl: 'shadow-card.css',
  shadow: true,
})
export class ShadowCard {
  @Prop() heading: string;

  render() {
    return (
      <Host>
        <h1 part="heading">{this.heading}</h1>
        <slot></slot>
      </Host>
    );
  }
}
```

Then you can use the `::part()` pseudo-class on the host element to give any styles you want to the element with the corresponding part.

```css
shadow-card::part(heading) {
  text-transform: uppercase;
}
```

This allows for greater flexibility in styling as any styles can now be added to this element.

### Exportparts

If you have a Stencil component nested within another component, any `part` specified on elements of the child component will not be exposed through the parent component. In order to expose the `part`s of the child component, you need to use the `exportparts` attribute. Consider this `OuterComponent` which contains the `InnerComponent`.

```tsx
@Component({
  tag: 'outer-component',
  styleUrl: 'outer-component.css',
  shadow: true,
})
export class OuterComponent {
  render() {
    return (
      <Host>
        <h1>Outer Component</h1>
        <inner-component exportparts="inner-text" />
      </Host>
    );
  }
}

@Component({
  tag: 'inner-component',
  styleUrl: 'inner-component.css',
  shadow: true,
})
export class InnerComponent {
  render() {
    return (
      <Host>
        <h1 part="inner-text">Inner Component</h1>
      </Host>
    );
  }
}
```

By specifying "inner-text" as the value of the `exportparts` attribute, elements of the `InnerComponent` with a `part` of "inner-text" can now be styled in the light DOM. Even though the `InnerComponent` is not used directly, we can style its parts through the `OuterComponent`.

```html
<style>
  outer-component::part(inner-text) {
    color: blue;
  }
</style>

<outer-component />
```

## Global styles

While most styles are usually scoped to each component, sometimes it's useful to have styles that are available to all the components in your design system. To create styles that are globally available, start by creating a global stylesheet. For example, you can create a folder in your `src` directory called `global` and create a file called `global.css` within that. Most commonly, this file is used to declare CSS custom properties on the root element via the `:root` pseudo-class. This is because styles provided via the `:root` pseudo-class can pass through the shadow boundary. For example, you can define a primary color that all your components can use.

```css
:root {
  --color-primary: blue;
}
```

In addition to CSS custom properties, other use cases for a global stylesheet include

- Theming: defining CSS variables used across the app
- Load fonts with `@font-face`
- App wide font-family
- CSS resets

To make the global styles available to all the components in your design system, the `stencil.config.ts` file comes with an optional [`globalStyle` setting](https://stenciljs.com/docs/config#globalstyle) that accepts the path to your global stylesheet.

```tsx
export const config: Config = {
  namespace: 'app',
  globalStyle: 'src/global/global.css',
  outputTarget: [
    {
      type: 'www',
    },
  ],
};
```

The compiler will run the same minification, autoprefixing, and plugins over `global.css` and generate an output file for the [`www`](/docs/www) and [`dist`](/docs/distribution) output targets. The generated file will always have the `.css` extension and be named as the specified `namespace`.

In the example above, since the namespace is `app`, the generated global styles file will be located at: `./www/build/app.css`.

This file must be manually imported in the `index.html` of your application.

```html
<link rel="stylesheet" href="/build/app.css" />
```

## IE support

IE11 does not support CSS variables natively, Stencil does however provide a best-effort polyfill since it's impossible to polyfill CSS features in the same way JS can be polyfilled.

The stencil polyfill for CSS variables has plenty of limitations with respect to a browser supporting it natively, and incurs a heavy performance overhead.

- Global CSS variables can only be declared in `:root` or `html`, they can't be dynamic.
- Only the stylesheets of `shadow` or `scoped` components can have dynamic CSS variables.
- CSS variables within a component can be consumed (`var(--thing)`) in any selector.
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

The performance overhead of using CSS variables in IE11 is elevated in terms of CPU time and memory. This is because in order to "simulate" the dynamic nature of CSS variables, the polyfill needs to dynamically generate a different stylesheet PER instance. For example, if you have 200 `my-cmp` elements in the DOM, the polyfill will attach 200 analogous `<style>` tags to style each element.

The total amount of stylesheets to be handled by IE11 can quickly grow, consuming a lot of memory and requiring a lot of CPU for each Style Invalidation.
