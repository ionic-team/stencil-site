# Stencil Router

The developer experience of the router is designed to be similar to [React Router](https://reacttraining.com/react-router/), and it should make it easy to build apps of all size, from the very simple to the very complex.

## Adding the collection

First thing, ensure that the `collections` entry in `stencil.config.js` has the `@stencil/router` package. If it does not, please add it.

## Configuring the Router

Applications built with Stencil should have one `stencil-router` element for the entire application. Make sure to specify an `id` attribute on it.

```
<stencil-router id="router">
...
</stencil-router>
```

Within the `stencil-router` element, we want to declare our set of `stencil-route`s. Each `stencil-route` needs to take a reference to the router, a url, and then an HTML element tag name.

```
<stencil-router id="router">
  <stencil-route url="/" component="landing-page" router="#router" exact={true}/>
  <stencil-route url="/demos" router="#router" component="demos-page"/>
  <stencil-route url="/demos/rendering" router="#router" component="fiber-demo"/>
  <stencil-route url="/docs" router="#router" component="docs"/>
  <stencil-route url="/docs/getting-started" router="#router" component="getting-started"/>
  <stencil-route url="/components" router="#router" component="basics-components"/>
</stencil-router>
```

When navigating to `/demos/rendering` based on the above configuration, the `demos-page` component will be loaded with a child component `fiber-demo`. Nested routes/components just work.

## Navigating

To navigate around an app, use the `stencil-route-link` component.

```
<stencil-route-link router="#router" url="/">
<stencil-route-link router="#router" url="/demos">
<stencil-route-link router="#router" url="/docs/getting-started">
```
