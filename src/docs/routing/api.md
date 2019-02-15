---
title: Stencil Router API
description: Stencil Router
url: /docs/router-api
contributors:
  - jthoms1
  - Kub4jz
  - dvelasquez
---

# Stencil Router API

## stencil-router

You should have one single `stencil-router` component in your project.  This component controls all interactions with the browser history and it aggregates updates through an event system.

| property            | type          | description                     |
|:------------------- |:-------------:| ------------------------------- |
| **root** | *string*      | The root path of that the router is responsible for. All routes and links will resolve from this root.
| **historyType** | 'browser' OR 'hash'      | The history type that you would like the router to use. default is **browser** (html5 pushState)
| **titleSuffix** | *string*      | A suffix to append to the page title whenever it's updated through RouteTitle

**Basic usage**

```tsx
<stencil-router titleSuffix=" - My App">
  <stencil-route-switch scrollTopOffset={0}>
    <stencil-route url="/" component="landing-page" exact={true} />
    <stencil-route url="/demos" component="demos-page" />
    <stencil-route url="/other" component="other-page" />
    <stencil-route component="page-not-found" />
  </stencil-route-switch>
</stencil-router>
```

## stencil-route

This component renders based on whether the supplied url matches the current location.

| property            | type          | description                     |
|:------------------- |:-------------:| ------------------------------- |
| **url**             | *string*, *array*      | the pathname to match on.  Accepts paths similar to expressjs.  So that you can define parameters in the url `/foo/:bar` where bar would be available in incoming props.
| **component**       | *string*      | the component name that you would like the route to render
| **componentProps**  | *key/value Object*  | a key value object(`{ 'red': true, 'blue': 'white'}`) containing props that should be passed to the defined component when rendered.
| **routeRender**     | *function*   | function that accepts props as an argument. If this exists it will be used in place of the component defined.
| **exact**           | *boolean*   | If true then only render this route when the url matches exactly to the location, if false it will render if the current url 'matches' the url defined.

**Basic usage**

```tsx
<stencil-route url="/" component="landing-page" exact={true} />
```

Match multiple known routes

```tsx
<stencil-route url={["/", "home"]} component="landing-page" exact={true} />
```

### Match unknown routes
It is possible that you might want to match based on any possible segment or have named captures
In that case you can specify these in the url prop. In this case these are available within your component
as props. More examples available in the [Route Params Tutorial](/docs/router-tutorials#route-params)

```tsx
<stencil-route url="/page/:pageNum(\\d+)" component="page-item" />
<stencil-route url="/user/:name?" component="user-page" />
<stencil-route url="/user*" component="user-page" />
```


### Passing props to the component

```tsx
<stencil-route url="/" component="landing-page"
  componentProps={{ firstName: 'Ellie' }} />
```

### Using a routeRender function

There are times where your route will not need an entire component.  For those occasions you can use
the `routeRender` prop. This allows you to supply a function that accepts props object as the argument and returns jsx.

```tsx
<stencil-route url="/" exact={true} routeRender={(props) => (
  <span>Hello {props.firstName}</span>;
)}/>
```

## stencil-route-switch

Use the `stencil-route-switch` anytime you have multiple routes that you would like to group together. This is useful for top level navigation of an app where you will only ever want one route to match. This is also required when you are defining default not found pages.

| property            | type          | description                     |
|:------------------- |:-------------:| ------------------------------- |
| **scrollTopOffset** | *number*      | scroll to a specific location on route change then set this property.  By default it does not scroll, but in most cases you will likely want to set it to `0` so that it scrolls back to the top of the content on page transition.

**Basic usage**
```tsx
<stencil-router>
  <stencil-route-switch scrollTopOffset={0}>
    <stencil-route url="/" component="landing-page" exact={true}/>
    <stencil-route url="/demos" component="demos-page" />
    <stencil-route component="catch-all" />
  </stencil-route-switch>
</stencil-router>
```

In the above example:
- If the route is `/` the first route would match and the `landing-page` component would be displayed
- If the route is `/demos` the second route would match and the `demos-page` component would be displayed
- If the route is `/something` the third route would match and the `catch-all` component would be displayed

**NOTE**: The third route does not have a `url` prop so it will match everything that was not caught by the previous 2.

## stencil-router-redirect

This component redirects the current location.

| property            | type          | description                     |
|:------------------- |:-------------:| ------------------------------- |
| **url**             | *string*      | the url to redirect to.

**Basic usage**

```tsx
<stencil-router-redirect url="/" />
```

## stencil-route-link

This component is used to render links to defined routes.  It applys a specific style based on whether the link matches the current location.

| property            | type          | description                     |
|:------------------- |:-------------:| ------------------------------- |
| **url**             | *string*      | the pathname to link to.
| **urlMatch**        | *string* OR *string[]* | If url match is provided then activeClass should be provided based on if the url matches it.  providing urlMatch allows you to define an alternative.  You can set activeClass based on a different url match.
| **exact**           | *boolean*     | If true then only apply the active class when the url matches exactly to the location.
| **activeClass**     | *string*      | The class to apply if the link matches the current location. This defaults to `link-active`.

**Basic usage**

```tsx
<stencil-route-link url="/" exact={true}>
  Home
</stencil-route-link>
<stencil-route-link url="/info" urlMatch="/info/*">
  Information
</stencil-route-link>
<stencil-route-link url="/info" activeClass="link-active">
  Information
</stencil-route-link>
```

### Anchor attributes
There are additional attributes that let you set specific attributes on the anchor tag that gets rendered rather than on the web component itself.

```tsx
<stencil-route-link
  url="/"
  anchorClass="site-link"
  anchorRole="link"
  anchorTitle="Home link"
  anchorTabIndex="2"
>
  Home
</stencil-route-link>
```

## stencil-route-title

Update the page title declaratively

| property                | type          | description                     |
|:----------------------- |:-------------:| ------------------------------- |
| **pageTitle**           | *string*      | Title that you would like to set on the page

**Basic usage**

```tsx
<stencil-route-title pageTitle="Home" />
```
