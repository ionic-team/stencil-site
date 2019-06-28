---
title: Local Assets
description: Using Local Assets in your Components
contributors:
  - splitinfinities
---

# Local Assets

Referencing Assets in Stencil can be tricky, but if you follow this guide you'll have no problem. 

### Using Local Assets

Lets dive in and look at an example of how to use local assets:

Below is an example of your Component's folder structure containing the component, the stylesheet, and an assets directory. 

```bash
stencil-asset/
  assets/
    sunset.jpg
    beach.jpg
  stencil-asset.css
  stencil-asset.tsx
```

Below is the stencil-asset.tsx file which will correctly load the assets based on a property called `src`. 

```tsx
import { Component, Prop, getAssetPath, h } from '@stencil/core';

@Component({
  tag: 'stencil-asset',
  styleUrl: 'stencil-asset.css',
  assetsDirs: ['assets']
})
export class StencilAsset {

  @Prop() src: "sunset.jpg"|"beach.jpg" = "sunset.jpg";

  render() {
    <img src={`${getAssetPath('.')}assets/${this.asset}`} />
  }
}
```

As you can see from this example, we import `getAssetPath` and use it in the `src` property of the img tag in our render function. This function will help determine what path the asset should be loaded from. 

### Use Cases

Some use cases we have come up with are:

- Loading from a collection of SVGs
- Loading and applying fonts on demand
- Loading images or videos
