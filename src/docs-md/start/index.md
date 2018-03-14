# Getting Started

## Starting a new project

Stencil requires a recent LTS version of [NodeJS](https://nodejs.org/) and npm. Make sure you've installed and/or updated Node before continuing.

### Reusable Components

Stencil can be used to create standalone components, or entire apps.

To build standalone components, such as a reusable UI element or library, clone the component starter and get to work:

```bash
git clone https://github.com/ionic-team/stencil-component-starter my-component
cd my-component
git remote rm origin
npm install
```

Then, to start a live-reload server for development, run:

```bash
npm start
```

### Building an app

Stencil is a great option for building entire apps! To build an app with Stencil, we recommend cloning our App Starter:

```bash
git clone https://github.com/ionic-team/stencil-app-starter my-app
cd my-app
git remote rm origin
npm install
```

Then, to start a live-reload server for development, run:

```bash
npm start
```

This will give you a project with everything needed to build a fast, modern web app using Web Components. This project comes with the [stencil-router](/docs/routing) pre-installed.


### Updating Stencil

To get the latest version of @stenil/core you can run `npm install @stencil/core@latest --save-exact`. 

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
