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
  - **url** (*Array || string*): the pathnames to match on. Can also pass an array of paths so one stencil-route matches multiple paths. Accepts paths similar to expressjs so that you can define parameters in the url `/foo/:bar` where bar would be available in incoming props.
  - **component** (*string*): the component name that you would like the route to render.
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

When navigating to `/demos/rendering` based on the above configuration, the `demos-page` component will be loaded with a child component `fiber-demo`. They will both be loaded as children of their corresponding stencil-routes but they are not related other than both match the route. Nested routes/components just work.

## Navigating

To navigate around an app, use the `stencil-route-link` component.

```
<stencil-route-link url="/">
<stencil-route-link url="/demos">
<stencil-route-link url="/docs/getting-started">
```

If you would like to navigate programmatically you first need to pass the router history in as a Prop to your component. Below is an example of this:

```
import { RouterHistory } from '@stencil/router';

export class askPage {
  @Prop() history: RouterHistory;
}
```

You can then use the the `push` method on the history object to navigate to a new page:

```
this.history.push(`/demos`, {});
```

## URL Params

You may be familiar with the concept of URL params from [React Router](https://reacttraining.com/react-router/web/example/url-params). URL params allow you to pass data to a component through the route. To set this up in the Stencil router we first need to set up our route to take a param. Here is an example:

```
 <stencil-route url='/show/:pageNum' component='show-page' />
```

The key part in this route is the `:pageNum` syntax. This means that we can now pass data to that route and it will be accessible through the `pageNum` variable. Below is an example of how we would pass data to this route:

```
<stencil-route-link url={`/show/${someData}`} />
```

Now let's go over how to access this data from the `show-page` component we are routing too.


First, we need to pass the `match` prop to our `show-page` component:

```
export class ShowPage {
  @Prop() match: any;
}
```

Then we can use that `match` prop to access our data:

```
// myData is now the data we passed in our stencil-route-link above
const myData = this.match.params.pageNum
```

<stencil-route-link url="/docs/css-variables" router="#router" custom="true">
  <button class="backButton">
    Back
  </button>
</stencil-route-link>
