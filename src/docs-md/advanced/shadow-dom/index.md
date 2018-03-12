# Shadow DOM

### What is Shadow DOM

[Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) is an API built into the browser that allows for DOM encapsulation and style encapsulation. Shadow DOM shields our component from the outside world, meaning that we do not need to think about things such as scoping our css correctly, or worrying about our internal DOM being interfered with by the world outside our component.

### Browser Support

Shadow DOM is currently natively supported in the following browsers:

- Chrome
- Safari
- Opera
- Most Chromium based browsers

In browsers which do not support Shadow DOM we fall back to scoped css. This gives you the style encapsulation that comes along with Shadow DOM but without loading in a huge Shadow DOM polyfill.

> Confused about what scoped css is? Don't worry, we will explain this later in detail.

### Shadow DOM in Stencil

Shadow DOM is not currently turned on by default for web components built with Stencil. To turn on Shadow DOM in a web component built with Stencil, you can use the `shadow` param in the component decorator. Below is an example of this:

```
@Component({
  tag: 'shadow-component',
  styleUrl: 'shadow-component.scss',
  shadow: true
})
export class ShadowComponent {

}
```

### Things to remember with Shadow DOM

- QuerySelector: When using Shadow DOM and you want to query an element inside your web component you must use `this.el.shadowRoot.querySelector()`. This is because all of your DOM inside your web component is in a shadowRoot that Shadow DOM creates.

- Global Styles: To externally style a component with Shadow DOM you must use [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) or the proposed [CSS Shadow Parts](https://meowni.ca/posts/part-theme-explainer/).

- Normally you would wrap your styles in the tag name of the component like so:

```
my-element {
  div {
    background: blue;
  }
}
```

With Shadow DOM the css selector for the element is the `:host` selector. So, with Shadow DOM turned on in your component the above css would be:

```
:host {
  div {
    background: blue;
  }
}
```

### Scoped CSS

In browsers that do not currently support Shadow DOM, web components built with Stencil will fall back to using scoped CSS instead of loading a large Shadow DOM polyfill. Scoped CSS automatically scopes CSS to an element by appending each of your styles with a data attribute automatically at run time. 

<stencil-route-link url="/docs/service-workers" router="#router" custom="true">
  <button class="backButton">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/distribution" custom="true">
  <button class="nextButton">
    Next
  </button>
</stencil-route-link>
