# Shadow Dom

### What is Shadow Dom

[Shadow Dom](https://developers.google.com/web/fundamentals/web-components/shadowdom) is an API built into the browser that allows for DOM encapsulation and style encapsulation. Shadow Dom shields our component from the outside world, meaning that we do not need to think about things such as scoping our css correctly, or worrying about our internal DOM being interfered with by the world outside our component.

### Browser Support

Shadow Dom is currently natively supported in the following browsers:

- Chrome
- Safari
- Opera
- Most Chromium based browsers

In browsers which do not support Shadow Dom we fall back to scoped css. This gives you the style encapsulation that comes along with Shadow Dom but without loading in a huge Shadow Dom polyfill.

> Confused about what scoped css is? Don't worry, we will explain this later in detail.

### Shadow Dom in Stencil

Shadow Dom is not currently turned on by default for web components built with Stencil. To turn on Shadow Dom in a web component built with Stencil, you can use the `shadow` param in the component decorator. Below is an example of this:

```
@Component({
  tag: 'shadow-component',
  styleUrl: 'shadow-component.scss',
  shadow: true
})
export class ShadowComponent {

}
```

### Things to remember with Shadow Dom

- QuerySelector: When using Shadow Dom and you want to query an element inside your web component you must use `this.el.shadowRoot.querySelector()`. This is because all of your DOM inside your web component is in a shadowRoot that Shadow Dom creates.

- Global Styles: If you have any global styles in your project, they will not be able to style your component that uses Shadow Dom. All of your styles for a component must be local to that component.

- Normally you would wrap your styles in the tag name of the component like so:

```
my-element {
  div {
    background: blue;
  }
}
```

With Shadow Dom you do not need to do this as the css is scoped automatically to the element. So with Shadow Dom turned on in your component the above css would simply be:

```
div {
  background: blue;
}
```

### Scoped CSS

In browsers that do not currently support Shadow Dom, web components built with Stencil will fall back to using scoped CSS instead of loading a large Shadow Dom polyfill. Scoped CSS automatically scopes CSS to an element by appending each of your styles with a data attribute automatically at run time. 