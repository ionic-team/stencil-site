# Getting Started

## Starting a new project

Before getting started with Stencil you need to install [NodeJS](https://nodejs.org/en/) and NPM. NodeJS is a JavaScript runtime that allows tools built with JavaScript, like Stencil, to be run from the terminal. Npm is a package manager for JavaScript. Visit [this link](https://nodejs.org/en/download/) to download and intstall Node and NPM.

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
