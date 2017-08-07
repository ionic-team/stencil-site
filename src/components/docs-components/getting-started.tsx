import { Component } from '@stencil/core';

@Component({
  tag: 'getting-started',
  styleUrl: 'getting-started.scss'
})
export class GettingStarted {
  render() {
    return [
      <app-marked doc='start/index.md'></app-marked>
    ]
  }
}
