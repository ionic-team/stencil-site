# Getting Started

## Starting a new project

### Reusable Components

If you are building a component or group of components meant to be used across multiple projects you just need to run the following commands in your terminal:

```bash
git clone https://github.com/ionic-team/stencil-component-starter my-component
cd my-component
git remote rm origin
npm install
```

Then, to start a live-reload server, run:

```bash
npm start
```

This will give you a project with the proper setup to build standalone web components that can be easily shared across projects.

### Building an app

If you are looking to build an entire app using web components, you can use the app-starter. To use the app-starter you can run the following commands in your terminal:

```bash
git clone https://github.com/ionic-team/stencil-app-starter my-app
cd my-app
git remote rm origin
npm install
```

Then, to start a live-reload server, run:

```bash
npm start
```

This will give you a project with everything needed to build a fast, modern web app completely out of web components. It comes with the [stencil-router](/docs/routing) pre-installed.

## Testing

The Stencil Application Starter uses Jest and a small testing API in order to test the components. There are two ways to run the unit tests.
They can be run once on command, or they can be live-reloaded and run with each source change.

To run the tests once, run:

```bash
npm test
```

To run the tests and live-reload them, run:

```bash
npm run test.watch
```

## Developing

Changes made while the live-reload server is running will automatically be reflected. Let's make a small edit to our component. Open `src/components/my-name/my-name.tsx` in your editor

We can ignore most of the content here, but we'll look at our `render` method. Inside the return statement, let's modify what we have.

```jsx
render() {
    return (
      <p>
        Hello, my props are {this.first} and {this.last}
      </p>
    );
  }

```

When we save, we'll have our component updated with the new changes. To learn more about what's going on in this component, check out               <stencil-route-link url="/docs/my-first-component">component docs</stencil-route-link>

## Building for Production

To do a production build, run the following command

```
npm run build
```

This will generate a minified distribution of your stencil components.

<stencil-route-link url="/docs/intro" router="#router" custom="true">
  <button class="backButton">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/my-first-component" custom="true">
  <button class="nextButton">
    Next
  </button>
</stencil-route-link>
