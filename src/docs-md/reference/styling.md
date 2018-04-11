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
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/distribution" custom="true">
  <button class="pull-right btn btn--primary">
    Next
  </button>
</stencil-route-link>


# CSS Variables

### What are CSS Variables?

[CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) are a lot like [Sass Variables](https://ionicframework.com/docs/theming/sass-variables/), but built into the browser. CSS Variables allow you to specify CSS properties that can be used across your app.

### Use Case

One use case for CSS Variables is colors. If your app has a primary brandy color that is used across your app then instead of writing that same color out each place you need it in your app you can create a variable for it and then use that variable anywhere you need that color in your app. Also, if you ever need to change this color you will only have to change the variable and then it will be updated across your app.

### Using CSS Variables in Stencil

Here are the recommended steps to use CSS Variables in Stencil:

- Create a css file to hold your variable definitions. We normally recommend creating a `variables.css` file in `src/global/`
- You can then put this config `globalStyle: 'src/global/variables.css'` into your `stencil.config.js` file.

That's it! Now you can start defining your variables.

### Defining CSS Variables

Here is an example of defining a CSS Variable:

```
// inside our src/global/variables.css file

:root {
  --app-primary-color: #488aff;
}
```

In this example we have defined a CSS Variable called `--app-primary-color` that is set to the color `#488aff`. The `:root` selector in this example is a CSS pseudo selector that defines the variable on the root element of your project (usually `<html>`) so that the variable can be used across your app.

### Using a CSS Variable

Here is an example of using our CSS Variable we defined above:

```
h1 {
  color: var(--app-primary-color)
}
```

This will apply the color we defined in our CSS Variable, in this case `#488aff`, to our `h1` element.

<stencil-route-link url="/docs/templating-jsx" router="#router" custom="true">
  <button class='pull-left btn btn--secondary'>
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/forms" custom="true">
  <button class='pull-right btn btn--primary'>
    Next
  </button>
</stencil-route-link>
