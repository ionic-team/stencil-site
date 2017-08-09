import { Component } from '@stencil/core';

@Component({
  tag: 'stencil-ssr',
  styleUrl: 'stencil-ssr.scss'
})
export class StencilSsr {

  render() {
    return [
      <app-marked doc='advanced/ssr/index.md'></app-marked>
    ]
  }
}
