---
title: Testing
description: Stencil has a number of add-ons that you can use with the build process.
contributors:
  - jthoms1
---
# Testing

Stencil makes it easy to unit test your component using Jest and the Stencil unit testing framework.
The testing framework requires very little configuration and has a minimal API consisting of two functions:
`render()` and `flush()`. The Stencil unit testing framework can be used to test the rendering of the component
as well as the methods defined on the component class.

## Testing Config

Allowing a Stencil component project to run unit tests requires a small amount of configuration in the `package.json`
file. All of this configuration is included with the Stencil App Starter and the Stencil Component Starter so if you
use one of those templates to start your project, you should not have to add anything. This information is presented
here primarily for informational purposes.

Jest is installed as a development dependency:

```tsx
  "devDependencies": {
	  ...
	  "@types/jest": "^21.1.1",
	  "jest": "^21.2.1"
  },
```

NPM scripts are set up in order to run the tests:

```tsx
  "scripts": {
  	...
	  "test": "jest --no-cache",
	  "test.watch": "jest --watch --no-cache"
  },
```

Jest is configured to find test files and to use the Stencil preprocessor script to compile the sources:

```json
  "jest": {
	  "transform": {
  	  "^.+\\.(ts|tsx)$": "<rootDir>/node_modules/@stencil/core/testing/jest.preprocessor.js"
	  },
	  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(tsx?|jsx?)$",
	  "moduleFileExtensions": [
    	"ts",
    	"tsx",
  	  "js",
  	  "json",
  	  "jsx"
	  ]
  }
```

## Component Rendering Tests

The Stencil testing framework API contains two functions that are used to render components for testing:

- `render({ components: [], html: string })` - The `render()` function takes a list of components and an HTML snippet
and returns the promise of the rendered HTML element.

- `flush(element)` - The `flush()` function is used to refresh the rendering of an element after property changes are made.
This function returns a promise that is resolved when the flush is complete.

Both of these function operate asynchronously.

A common testing pattern when rendering is to `render()` the component in the `beforeEach()` for a suite of tests. Each
test case then modifies the element and uses `flush(element)` to refresh the node.

### Rendering a Component

Use the `render()` function to initially render a component.

This function takes a configuration object with two parameters:

- `components`: a list of components the renderer needs to know about. Generally, this only needs to contain the
component being tested. Child components can also be included if you need to have them rendered for your test
but this is not a requirement otherwise.

- `html`: an HTML snippet used to render the component. Usually this just looks like `<my-component></my-component>`.

This function returns a promise that is resolved with the rendered HTML element.

```tsx
beforeEach(async () => {
  element = await render({
    components: [MyName],
    html: '<my-name></my-name>'
  });
});
```

### Refreshing a Component

Use the `flush()` function to re-render the node as needed. This is typically done after changing property values
on the component.

```tsx
it('should work with both the first and the last name', async () => {
  element.first = 'Peter'
  element.last = 'Parker';
  await flush(element);
  expect(element.textContent).toEqual('Hello, my name is Peter Parker');
});
```

### Examining the Element

Since the rendered element is an HTMLElement, you can use methods and properties from the
[HTMLElement interface](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) in order to examine the
contents of the element.

Let's say that instead of printing the first and last names, our component had to split the names apart on spaces
and print a list of each part of the name. We could write a rendering test for that as such:

```tsx
    it('should least each part of the name breaking on spaces', async () => {
      element.first = 'Pasta Primavera';
      element.last = 'O Shea Buttersworth';
      await flush(element);
      const list = element.querySelector('ul');
      expect(list.children.length).toEqual(5);
      expect(list.children[0].textContent).toEqual('Pasta');
      expect(list.children[1].textContent).toEqual('Primavera');
      expect(list.children[2].textContent).toEqual('O');
      expect(list.children[3].textContent).toEqual('Shea');
      expect(list.children[4].textContent).toEqual('Buttersworth');
    });
```

Anything that you can use on an [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) you can use in the tests.

## Component Method Tests

To test the component's methods, instantiate an instance of the component and call the methods.

```tsx
it('should return an empty string if there is no first or last name', () => {
  const myName = new MyName();
  expect(myName.formatted()).toEqual('');
});
```

```tsx
it('should return a formatted string if there is no first or last name', () => {
  const myName = new MyName();
  myName.first = 'Lucas';
  myName.last = 'Kalrickson';
  expect(myName.formatted()).toEqual('Kalrickson, Lucas');
});
```

<stencil-route-link url="/docs/context" router="#router" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/router" custom="true">
  <button class="pull-right btn btn--primary">
    Next
  </button>
</stencil-route-link>
