# Shadow Dom

### What is Shadow Dom

Shadow Dom is an API built into the browser that allows for DOM encapsulation and style encapsulation. Shadow Dom shields our component from the outside world, meaning that we do not need to think about things such as scoping our css correctly, or worrying about our internal DOM being interfered with by the world outside our component.

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

### Things to remember

- QuerySelector: When using Shadow Dom and you want to query an element inside your web component you must use `this.el.shadowRoot.querySelector()`. This is because all of your DOM inside your web component is in a shadowRoot that Shadow Dom creates.

- Global Styles: If you have any global styles in your project, they will not be able to style your component that uses Shadow Dom. All of your styles for a component must be local to that component.


