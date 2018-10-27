---
title: Stencil Router
description: Stencil Router
url: /docs/router
contributors:
  - jthoms1
---

# Stencil Router

The developer experience of the router is designed to be similar to [React Router](https://reacttraining.com/react-router/), and it should make it easy to build apps of all size, from the very simple to the very complex.

## Installation

In your project directory, run `npm install @stencil/router --save`.
Then add `import '@stencil/router'` to your root component (normally the `my-app` component if you are using one of the starters).

## Configuration

Applications built with Stencil should have one `stencil-router` element for the entire application. Make sure to specify an `id` attribute on it.

```tsx
<stencil-router>
...
</stencil-router>
```

Within the `stencil-router` element, we want to declare our set of `stencil-route`s. Each `stencil-route` needs to take a url, and then an HTML element tag name.

```tsx
<stencil-router>
  <stencil-route-switch>
    <stencil-route url="/" component="landing-page" exact={true}/>
    <stencil-route url="/demos" component="demos-page"/>
    <stencil-route url="/demos/rendering" component="fiber-demo"/>
    <stencil-route url="/docs" component="docs"/>
    <stencil-route url="/docs/getting-started" component="getting-started"/>
    <stencil-route url="/components" component="basics-components"/>
  <stencil-route-switch>
</stencil-router>
```

When navigating to `/demos/rendering` based on the above configuration, the `demos-page` component will be loaded with a child component `fiber-demo`. They will both be loaded as children of their corresponding stencil-routes but they are not related other than both match the route. Nested routes/components just work.

### Server configuration

Depending to the choice you made regarding the hosting of your Stencil app, you may want to configure your server accordingly to the followings.

#### Apache 2
```apache
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [L]
```

#### Nginx
```.vhost
location / {
  try_files $uri $uri/ /index.html;
}
```