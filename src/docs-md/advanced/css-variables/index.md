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

<stencil-route-link url="/docs/framework-integration" router="#router" custom="true">
  <button class='backButton'>
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/routing" custom="true">
  <button class='nextButton'>
    Next
  </button>
</stencil-route-link>