import { Component } from '@stencil/core';

@Component({
  tag: 'getting-started',
  styleUrl: 'getting-started.scss'
})
export class GettingStarted {

  render() {
    return [
      <docs-page>
        <app-marked doc='start/index.md'></app-marked>
      </docs-page>
    ]
  }
}
