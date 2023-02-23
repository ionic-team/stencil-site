---
title: Getting Started
sidebar_label: Getting Started
description: Getting Started
slug: /getting-started
contributors:
  - jthoms1
  - rwaskiewicz
---

# Getting Started

## Starting a New Project

Stencil requires a recent LTS version of [NodeJS](https://nodejs.org/) and npm. 
Make sure you've installed and/or updated Node before continuing.

:::note
npm 6 or higher is required to proceed
:::

```bash npm2yarn
 npm init stencil
```

Stencil can be used to create standalone components, or entire apps. 
`npm init stencil`, will provide a prompt so that you can choose the type of project to start:

```text
? Select a starter project.

Starters marked as [community] are developed by the Stencil
Community, rather than Ionic. For more information on the 
Stencil Community, please see github.com/stencil-community
› - Use arrow-keys. Return to submit.

❯   component                Collection of web components that can be
                             used anywhere
    app [community]          Minimal starter for building a Stencil 
                             app or website
    ionic-pwa [community]    Ionic PWA starter with tabs layout and routes
```

Selecting the 'component' option will prompt you for the name of your project.

```bash
✔ Pick a starter › component
? Project name › my-first-stencil-project
```

Here, we've named our project 'my-first-stencil-project'.
After hitting `ENTER` to confirm your choices, the CLI will scaffold a Stencil project for us in a directory that matches the project name you provided.

Upon successfully creating our project, the CLI will print something similar to the following to the console:

```bash
✔ Project name › my-first-stencil-project
✔ All setup  in 26 ms

  We suggest that you begin by typing:

  $ cd my-first-stencil-project
  $ npm install
  $ npm start

  $ npm start
    Starts the development server.

  $ npm run build
    Builds your project in production mode.

  $ npm test
    Starts the test runner.

  Further reading:

   - https://github.com/ionic-team/stencil-component-starter

  Happy coding! 🎈
```

The first section describes a few commands required to finish getting your project bootstrapped.

```bash
    $ cd my-first-stencil-project
    $ npm install
    $ npm start
```

This will change your current directory to `my-first-stencil-project`, install your dependencies for you, and start the development server.

The second section of the output describes a few useful commands available during the development process:

- `npm start` starts a local development server. The development server will open a new browser tab containing your 
project's components. The dev-server uses hot-module reloading to update your components in the browser as you modify
them for a rapid feedback cycle.

- `npm run build` creates a production-ready version of your components. The components generated in this step are not
meant to be used in the local development server, but rather within a project that consumes your components.

- `npm test` runs your project's tests. The Stencil CLI has created both end-to-end and unit tests when scaffolding your project.

At this time, Stencil does not interact with any version control systems (VCS) when running `npm init stencil`. If you
wish to place your project under version control, we recommend initializing your VCS now. If you wish to use
git, run the following after changing your current directory to the root of your Stencil project:

```bash
$ git init
$ git add -A
$ git commit -m "initialize project using stencil cli" 
```

---
title: My First Component
sidebar_label: My First Component
description: My First Component
slug: /my-first-component
contributors:
- jthoms1
- simonhaenisch
---

# My First Component

Stencil components are created by adding a new file with a `.tsx` extension, such as `my-first-component.tsx`, and placing them in the `src/components` directory.
The `.tsx` extension is required since Stencil components are built using [JSX](https://reactjs.org/docs/introducing-jsx.html) and TypeScript.

Here is an example of what a Stencil component looks like:

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-first-component',
})
export class MyComponent {

  // Indicate that name should be a public property on the component
  @Prop() name: string;

  render() {
    return (
      <p>
        My name is {this.name}
      </p>
    );
  }
}
```

:::note
Don't fully understand what's going on? Don't worry, we'll explain each piece in detail later on.
:::


Once compiled, this component can be used in HTML just like any other tag.

```markup
<my-first-component name="Max"></my-first-component>
```

:::note
Web Components must have a - in the tag. `firstComponent` would not be a valid tag name.
:::

When rendered, the browser will display `My name is Max`.

## So what is really going on here?

Let's dive in.

The first piece we see is the `@Component` decorator.
This decorator provides metadata about our component to the Stencil compiler.
Information, such as the tag to use, and external styles, can be set here and picked up by the compiler.

Below the `@Component()` decorator, we have a standard JavaScript class.
This is where you'll write the bulk of your code to bring your Stencil component to life.
Here is where you'd write functions or provide business logic.

In order for the component to render something to the screen, we must declare a render function that returns JSX.
If you're not sure what JSX is, don't worry, we'll go over it in detail in the <stencil-route-link url="/docs/templating">Templating Docs</stencil-route-link>.

The quick idea is that our render function needs to return a representation of the HTML we want to push to the DOM.

The `name` property on the class also has a decorator applied to it, `@Prop()`.
This decorator tells the compiler that the property is public to the component, and the user should be setting it.
We set this property like so:

```markup
<my-first-component name="Max"></my-first-component>
```
Any property decorated with `@Prop()` is also automatically watched for changes.
If a user of our component were to change the element's `name` property, our component would fire its `render` function again, updating the displayed content.

## Component Generator

The Stencil CLI can generate new components for you. If you used one of the starters, you can simply run the `generate` npm script in your project, which will start the interactive generator.

```shell npm2yarn
npm run generate
```

Or you can invoke the Stencil CLI directly with the `generate` command (`g` for short). If you don't have `stencil` installed globally, prefix the command with `npx`.

```shell
stencil generate
```

You can optionally pass the component tag name directly to the command. Remember that the component tag name needs to be lowercase and contain at least one hyphen. In the second step, the generator will ask you which files to generate. This allows you to bootstrap a stylesheet as well as spec and e2e tests along with the component file.

All components will be generated within the `src/components` folder. Within that, a folder will be created with the same name as the component tag name you provided, and within that folder the files will be generated. It is also possible to specify one or multiple sub-folders to generate the component in.

For example, if you specify `pages/page-home` as the component tag name, the files will be generated in `src/components/pages/page-home`.

```shell
stencil generate pages/page-home
```

```plain
src
 |- components
     |- pages
         |- page-home
             |- page-home.css
             |- page-home.e2e.ts
             |- page-home.spec.ts
             |- page-home.tsx
```


## Updating Stencil

To get the latest version of @stencil/core you can run:

```bash npm2yarn
npm install @stencil/core@latest --save-exact
```
