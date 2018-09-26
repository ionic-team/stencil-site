---
title: Prerendering
description: Stencil has a number of add-ons that you can use with the build process.
contributors:
  - adamdbradley
---
# Prerendering

One of the benefits of Stencil is that it allows for prerendering of your web components. Prerendering generates static html+css files at build time that can then be served to the browser and hydrated with your actual web components on the fly. For an example of what this looks like, right click on this page and hit the view source button.

Prerendering is built into the Stencil compiler itself and by default our [app starter](https://github.com/ionic-team/stencil-app-starter) has it turned on for production builds.

### Benefits

- Faster time to [first meaningful paint](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)
- Better SEO
- Still provides some functionality for users with JavaScript disabled


### Things to watch for

- Data that you are fetching from an api should not be prerendered as this data is dynamic and is going to change.

Stencil provides an `isServer` utility variable to tell prerendering to skip code. Here is an example of how to use this utility:

```tsx
@Prop({ context: 'isServer' }) private isServer: boolean;

componentWillLoad() {
  // isServer is false when running in the browser
  // and true when being prerendered

  if (this.isServer === false) {
    fetch('someUrl').then(...)
  }
}
```

<stencil-route-link url="/docs/hot-module-replacement" router="#router" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/typed-components" custom="true">
  <button class="pull-right btn btn--primary">
    Next
  </button>
</stencil-route-link>
