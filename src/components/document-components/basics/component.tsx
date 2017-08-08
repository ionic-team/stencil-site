import { Component } from '@stencil/core';

@Component({
  tag: 'basics-components',
  styleUrl: 'component.scss'
})
export class BasicsComponents {

  render() {
    return [
      <docs-page>
        <app-marked doc='basics/components.md'></app-marked>
      </docs-page>
    ]
  }
}
