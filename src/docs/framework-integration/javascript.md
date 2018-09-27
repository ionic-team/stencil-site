---
title: Components without a Framework
description: Components without a Framework
contributors:
  - jthoms1
  - adamdbradley
---

# Components without a Framework

Integrating a component built with Stencil to a project without a JavaScript framework is straight forward. If you're using a simple HTML page, you can add your component via a script tag. For example, if we published a component to npm, we could load the component through unpkg like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://unpkg.com/test-components/latest/dist/test-components.js"></script>
</head>
<body>
  <test-component></test-component>
</body>
</html>
```

Alternatively, if you wanted to take advantage of ES Modules, you could include the components using an import statement.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script>
    import {defineCustomElements} from 'https://unpkg.com/test-components/latest/dist/esm/es2017/test-components.define.js';
    defineCustomElements(window);
  </script>
</head>
<body>
  <test-component></test-component>
</body>
</html>
```
