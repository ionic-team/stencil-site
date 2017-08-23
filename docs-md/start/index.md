# Getting Started

## Starting a new project

To start a new project, simply clone the app-base from Github:

```bash
git clone https://github.com/ionic-team/stencil.git my-app
cd my-app
git remote rm origin
npm install
```

Then, to start a live-reload server, run:

```bash
npm start
```

## Developing

Changes made while the live-reload server will automatically be reflected. Let's make a small edit to our component. Open `src/components/my-name/my-name.tsx` in your editor

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

When we save, we'll have our component updated with the new changes. To learn more about what's going on in this component, check out               <stencil-route-link url="/components" router="#router">component docs</stencil-route-link>

## Building for Production

To do a production build, run the following command

```
npm run build
```

This will generate a minified distribution of your stencil components.
