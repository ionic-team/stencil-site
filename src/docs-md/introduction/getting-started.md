# Getting Started

## Starting a new project

Stencil requires a recent LTS version of [NodeJS](https://nodejs.org/) and npm. Make sure you've installed and/or updated Node before continuing.

### Reusable Components

Stencil can be used to create standalone components, or entire apps.

To build standalone components, such as a reusable UI element or library, you can use the component starter:

> Note that you will need to use npm 6 or higher.

```bash
npm init stencil component my-components
```

Then, to start a live-reload server complete with HMR for development, run:

```bash
npm start
```

### Building an app

Stencil is also a great option for building entire apps! To build an app with Stencil, we recommend using our App Starter:

```bash
npm init stencil app my-app
```

Then, to start a live-reload server complete with HMR for development, run:

```bash
npm start
```

This will give you a project with everything needed to build a fast, modern web app using Web Components. This project comes with the [stencil-router](/docs/routing) pre-installed.


### Updating Stencil

To get the latest version of @stencil/core you can run `npm install @stencil/core@latest --save-exact`.

<stencil-route-link url="/docs/introduction" router="#router" custom="true">
  <button class="pull-left btn btn--secondary">
    Back
  </button>
</stencil-route-link>

<stencil-route-link url="/docs/my-first-component" custom="true">
  <button class="pull-right btn btn--primary">
    Next
  </button>
</stencil-route-link>
