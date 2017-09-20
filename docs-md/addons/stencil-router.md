# Stencil Router

`@stencil/router` is a package on NPM that contains a router that can be used in Stencil apps.

The developer experience of the router is designed to be similar to [React Router](https://reacttraining.com/react-router/), and it should make it easy to build apps of all size, from the very simple to the very complex.

## Installing

In your project directory, run `npm install @stencil/router`.

## Adding to Stencil Config Collection

First thing, ensure that the `collections` entry in `stencil.config.js` has the `@stencil/router` package. If it does not, please add it.

Open the project's `stencil.config.js` file, and look for the `config` export.

From there, add an object with a name of `@stencil/router` to the `collections` array if it's not already there.

```
exports.config = {
  publicPath: '/build',
  bundles: [
    { components: ['stencil-site', 'site-header', 'landing-page'] },
    { components: ['app-marked', 'site-menu'] },
    { components: ['demos-page', 'document-component'] }
  ],
  collections: [{ name: '@stencil/router' }]
};
```

## Included components

- **stencil-router**

  You should have one single stencil-router component in your project.  This component controls all interactions with the browser history and it aggregates updates through an event system.

- **stencil-route**
  
  This component renders based on whether the supplied url matches the current location.

  *properties*:
  - **url** (*string*): the pathname to match on.  Accepts paths similar to expressjs.  So that you can define parameters in the url `/foo/:bar` where bar would be available in incoming props.
  - **component** (*string*): the component name that you would like the route to render
  - **componentProps** (*key/value Object*): a key value object(`{ 'red': true, 'blue': 'white'}`) containing props that should be passed to the defined component when rendered.
  - **routeRender** (*function*): function that accepts props as an argument. If this exists it will be used in place of the component defined.
  - **exact** (*boolean*): If true then only render this route when the url matches exactly to the location, if false it will render if the current url 'matches' the url defined.

- **stencil-route-link**

  This component is used to render links to defined routes.  It applys a specific style based on whether the link matches the current location.

  *properties*:
  - **url** (*string*): the pathname to link to.
  - **exact** (*boolean*): If true then only apply the active class when the url matches exactly to the location.
  - **activeClass** (*string*): The class to apply if the link matches the current location. This defaults to 'link-active'.

- **stencil-route-redirect**

  This component redirects the current location.

  *properties*:
  - **url** (*string*): the url to redirect to.


## Configuring the Router

Applications built with Stencil should have one `stencil-router` element for the entire application. Make sure to specify an `id` attribute on it.

```
<stencil-router>
...
</stencil-router>
```

Within the `stencil-router` element, we want to declare our set of `stencil-route`s. Each `stencil-route` needs to take a reference to the router, a url, and then an HTML element tag name.

```
<stencil-router>
  <stencil-route url="/" component="landing-page" exact={true}/>
  <stencil-route url="/demos" component="demos-page"/>
  <stencil-route url="/demos/rendering" component="fiber-demo"/>
  <stencil-route url="/docs" component="docs"/>
  <stencil-route url="/docs/getting-started" component="getting-started"/>
  <stencil-route url="/components" component="basics-components"/>
</stencil-router>
```

When navigating to `/demos/rendering` based on the above configuration, the `demos-page` component will be loaded with a child component `fiber-demo`. They will both be loaded as children of their coresponding stencil-routes but they are not related other than both match the route. Nested routes/components just work.

## Navigating

To navigate around an app, use the `stencil-route-link` component.

```
<stencil-route-link url="/">
<stencil-route-link url="/demos">
<stencil-route-link url="/docs/getting-started">
```
