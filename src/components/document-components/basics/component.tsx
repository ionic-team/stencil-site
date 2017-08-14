import { Component } from '@stencil/core';

@Component({
  tag: 'basics-components',
  styleUrl: 'component.scss'
})
export class BasicsComponents {

  render() {
    return [
      <app-marked doc='basics/components.html'></app-marked>
    ]
  }
}
