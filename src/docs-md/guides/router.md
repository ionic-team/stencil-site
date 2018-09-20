# Stencil Router

`@stencil/router` is a package on NPM that contains a router that can be used in Stencil apps.

The developer experience of the router is designed to be similar to [React Router](https://reacttraining.com/react-router/), and it should make it easy to build apps of all size, from the very simple to the very complex.

## Installing

In your project directory, run `npm install @stencil/router --save`. Then add `import '@stencil/router'` to your root component (normally the `my-app` component if you are using one of the starters).

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

  This component is used to render links to defined routes.  It applies a specific style based on whether the link matches the current location.

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

```markup
<stencil-router>
...
</stencil-router>
```

Within the `stencil-router` element, we want to declare our set of `stencil-route`s. Each `stencil-route` needs to take a reference to the router, a url, and then an HTML element tag name.

```markup
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

### Navigating Statically

To navigate around an app, use the `stencil-route-link` component.

```markup
<stencil-route-link url="/">
<stencil-route-link url="/demos">
<stencil-route-link url="/docs/getting-started">
```

### Navigating Programmatically

If you are in a routed component ( a component that has been included in a `stencil-route`) and would like to navigate programmatically you first need to pass the router history in as a Prop to your component. Below is an example of this:

```tsx
import { RouterHistory } from '@stencil/router';

export class askPage {
  @Prop() history: RouterHistory;
}
```

You can then use the following methods on the history object to navigate:

```tsx
// pushing a route (going forwards to a certain route)
this.history.push(`/demos`, {});

// navigate back as if the user hit the back button in the browser
this.history.goBack();

// navigate forwards as if the user hit the forwards button in the browser
this.history.goForward();

// replace the current nav history and reset to a certain route
this.history.replace('/', {});

// navigate through the history stack by `n` entries
this.history.go(n: number);
```

## URL Params

You may be familiar with the concept of URL params from [React Router](https://reacttraining.com/react-router/web/example/url-params). URL params allow you to pass data to a component through the route. To set this up in the Stencil router we first need to set up our route to take a param. Here is an example:

```markup
 <stencil-route url='/show/:pageNum' component='show-page' />
```

The key part in this route is the `:pageNum` syntax. This means that we can now pass data to that route and it will be accessible through the `pageNum` variable. Below is an example of how we would pass data to this route:

```markup
<stencil-route-link url={`/show/${someData}`} />
```

Now let's go over how to access this data from the `show-page` component we are routing to.


First, we need to pass the `match` prop to our `show-page` component:

```tsx
import { MatchResults } from '@stencil/router';
...
export class ShowPage {
  @Prop() match: MatchResults;
}
```

Then we can use that `match` prop to access our data:

```tsx
// myData is now the data we passed in our stencil-route-link above
const myData = this.match.params.pageNum;
```

<stencil-route-link url="/docs/unit-testing" router="#router" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/framework-integration" custom="true">
  <button class='pull-right btn btn--primary'>
    Next
  </button>
</stencil-route-link>
