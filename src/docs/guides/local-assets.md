---
title: Local Assets
description: Using Local Assets in your Components
contributors:
  - splitinfinities
---

# Local Assets

Components usually need assets, such as images, videos or any kind of data files, Stencil includes certain features, so make this task easy.

## Component's assetsDirs

Lets dive in and look at an example of how to use local assets:

Below is an example of your Component's folder structure containing the component, the stylesheet, and an assets directory. 

```bash
src/
  components/
    stencil-asset/
      assets/
        sunset.jpg
        beach.jpg
      stencil-asset.css
      stencil-asset.tsx
```

Below is the `stencil-asset.tsx` file which will correctly load the assets based on a property called `src`. 

```tsx
import { Component, Prop, getAssetPath, h } from '@stencil/core';

@Component({
  tag: 'stencil-asset',
  styleUrl: 'stencil-asset.css',
  assetsDirs: ['assets']
})
export class StencilAsset {

  @Prop() image = "sunset.jpg";

  render() {
    <img src={getAssetPath(`./assets/${this.image}`)} />
  }
}
```

As you can see from this example, the component decorator has the `assetsDirs` property, which points to the `./assets` folder, this instructs the Stencil compiler to copy that folder into the distribution folder (`dist` or `www`).

Then, within the component's logic, the `getAssetPath` function (imported from `@stencil/core`) is used to determine the absolute path from where the assets should be loaded from.

### Use Cases

Some use cases we have come up with are:

- Loading from a collection of SVGs
- Loading and applying fonts on demand
- Loading images or videos
