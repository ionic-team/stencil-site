---
title: Integrated Dev Server
description: Stencil Integrated Dev Server
url: /docs/dev-server
contributors:
  - adamdbradley
---

# Integrated Dev Server

Stencil comes with an integrated dev server in order to simplify development. By integrating the build process and the dev server, Stencil is able to drastically improve the development experience without requiring complicated build scripts and configuration. As app builds and re-builds take place, the compiler is able to communicate with the dev server, and vise versa.


## Dev Server Features

- __Hot Module Replacement__: The compiler already provides a watch mode, but coupled with the dev server it's able to go one step farther by reloading only what has changed within the browser. Hot Module Replacement allows the app to keep its state within the browser, while switching out individual components with their updated logic after file saves.

- __Style Replacement__: Web components can come with their own css, can use shadow dom, and can have individual style tags. Traditionally, live-reload external css links usually does the trick, however, updating components with inline styles within shadow roots has been a challenge. With the integrated dev server, Stencil is able to dynamically update styles for all components, whether they're using shadow dom or not, without requiring a page refresh.

- __Development Errors__: When errors happen during development, such as printing an error for invalid syntax, Stencil will not only log the error and the source of the error in the console, but also overlay the app with the error so it's easier to read.

- __Open In Editor__: Links to the source files from development errors are clickable which will open up the source file in your IDE.
