---
title: Stencil Router Tutorials
description: Tutorials for how to use stencil-router in a variaty of different use cases.
url: /docs/router-tutorials
contributors:
  - jthoms1
---

# Tutorials

## Navigating Programmatically

If you are in a routed component ( a component that has been included in a stencil-route) and would like to navigate programmatically you first need to pass the router history in as a Prop to your component. Below is an example of this:

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

// popping a route (going back to a certain route)
this.history.pop('/home', {});

// navigate back as if the user hit the back button in the browser
this.history.goBack();

// navigate forwards as if the user hit the forwards button in the browser
this.history.goForward();

// replace the current nav history and reset to a certain route
this.history.replace('/', {});

// navigate through the history stack by `n` entries
this.history.go(n: number);
```

## Passing Data to Routes

There are multiple ways that you can pass data to routes and for routes to read that data. This page will provide you with info on each approach and try to help you answer which approach is best for your scenario.

**NOTE:** This does not include passing props directly to a route. Info on that can be found in the [`stencil-route`](api) component.


### Route Params
Url appearance: `/user/12345`


Route definition
```tsx
<stencil-route url="/user/:userId" component="user-detail" />
```

Consumption of the data with in the route
```tsx
@Component({
  tag: 'user-detail'
})
export class UserDetail {
  @Prop() history: RouterHistory;
  @Prop() match: MatchResults;

  render() {
    return (
      <div>{this.match.params.userId}</div>
    );
  }
}
```
<br/>

### Route Query Parameters
Url appearance: `/search?searchText='Madison'`


Programmatic Creation
```tsx
this.history.push({
  pathname: '/search',
  query: {
    searchText: 'Madison'
  }
});
```

Consumption of the data with in the route
```tsx
@Component({
  tag: 'search-results'
})
export class SearchResults {
  @Prop() history: RouterHistory;

  render() {
    return (
      <div>{this.history.location.query.searchText}</div>
    );
  }
}
```
<br/>

### Route State Data
Url appearance: `/detail`

Programmatic Creation (2 methods listed)
```tsx
this.history.push('/detail', { docname: docs });
this.history.push({
  pathname: '/detail',
  state: {
    detail_data: docs
  }
);
```

Consumption of the data with in the route
```tsx
@Component({
  tag: 'test-demo-three'
})
export class TestDemoThree {
  @Prop() history: RouterHistory;

  render() {
    return (
      <div>{history.location.state}</div>
    );
  }
}
```

## Create a Not Found route

It is a common scenario that you will want to have a Not Found page incase you have a broken link or if someone where to accidently type in an incorrect URL. Fortunately the approach to create this is straight forward.

We will make use of the [`stencil-route-switch`](stencil-route-switch). This component allows us to group multiple routes together in an ordered manor. If the first doesn't match it will try the next in the list.

The trick is to create a route at the end of the list that does not have a specified url.  This tells the route to match on any url. An example implementation can be seen below.
```tsx
<stencil-router>
  <stencil-route-switch scrollTopOffset={0}>
    <stencil-route url="/" component="landing-page" exact={true}/>
    <stencil-route url="/demos" component="demos-page" />
    <stencil-route component="catch-all" />
  </stencil-route-switch>
</stencil-router>
```

## Create a redirect

There are a few different approaches to creating a redirect using the [`stencil-router`](stencil-router).  We will cover these and try to identify which fits best for your use case.

### Reacting to application state
The following example shows a declarative redirect using [`stencil-route-redirect`](stencil-route-redirect). Most likely you would use this if there is an application or component state that would require a redirect.
```tsx
@Component({
  tag: 'test-demo-three'
})
export class TestDemoThree {
  @Prop() history: RouterHistory;
  @Prop() hasSeenInterstitial: boolean = false;

  render() {
    if (!hasSeenInterstitial) {
      <stencil-route-redirect url="/promo" />
    }
    return (
      <div>Welcome to App Corp</div>
    );
  }
}
```

### Responding to a user action
The following example shows the use of a redirect using the router history api.  This is useful if you want to react
to a user action.  In this case we are redirecting to a user detail page on a successful login.

```tsx
@Component({
  tag: 'test-demo-three'
})
export class TestDemoThree {
  @Prop() history: RouterHistory;

  async handleSubmit = (e) => {
    e.preventDefault();

    const isSuccessFul = await login();
    if (isSuccessFul) {
      this.history.replace('/user');
    } else {
      // Error logic
    }
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Username:
          <input type="text"/>
        </label>
        <label>
          Password:
          <input type="password"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

## Route Guards

There are some cases where you want to have certain routes that are only accessable to specific users or
if your application is in a certain state. This can be done by create Functional Components to wrap your
routes. There are other methods of solving this issue, but this is probably the most straight forward.

First we will create a fake auth service.

```tsx
const auth = {
  isAuthenticated: false,
  authenticate: function() {
    this.isAuthenticated = true;
  },
  logout: function() {
    this.isAuthenticated = false;
  }
}
const isAuthenticated = (): boolean => {
  return isUserLoggedIn;
}
```

Then we will create a Functional Component that accepts props and returns a [`stencil-route`](stencil-route).
This route itself has a [routeRender](stencil-route#using-a-routerender-function) that checks for auth.  If auth fails it redirects to 
a login page or whatever you supply as `failureRedirect`.

```tsx
  const PrivateRoute = ({ component, ...props }) => {
  const redirectUrl = props.failureRedirect || '/login';

  return (
    <stencil-route {...props} routeRender={(props) => {
      if (auth.isAuthenticated) {
        return <component {...props} {...props.componentProps}></component>;
      }
      return <stencil-router-redirect url={redirectUrl}></stencil-router-redirect>
    }} />
  );
};
```

Finally we will make use of this new Functional Component in place of a normal `stencil-route`.
```tsx
<stencil-router titleSuffix="My App - ">
  <stencil-route-switch scrollTopOffset={0}>
    <stencil-route url="/" component="landing-page" exact={true} />
    <PrivateRoute url="/user" component="user-info" />
    <PrivateRoute url="/org" component="org-info" />
  </stencil-route-switch>
</stencil-router>
```

## Inject History into a Deep Component

Sometimes you want to access history deep into a component tree.  Thankfully we have a way
for you to access history without need to drill the prop all the way down.  This is by using
`injectHistory`. This function accepts a component and then passes history as a prop.

Note that currently you **must** have an attribute with the `@Element()` decorator.

```tsx
import { Component, Element, Prop } from '@stencil/core';
import { RouterHistory, LocationSegments, injectHistory } from '@stencil/router';

@Component({
  tag: 'test-deep-component'
})
export class TestDeepComponent {

  @Element() el: HTMLStencilElement;
  @Prop() history: RouterHistory;
  @Prop() location: LocationSegments;

  @Watch('location')
  locationChanged(newValue: LocationSegments, oldValue: LocationSegments) {
    console.log('The new location info is: ', newValue);
    console.log('The old location info is: ', oldValue);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.history.push('/')}> Back Home</button>
      </div>
    );
  }
}

injectHistory(TestDeepComponent);
```
