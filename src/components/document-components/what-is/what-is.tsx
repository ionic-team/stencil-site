import { Component } from '@stencil/core';

@Component({
  tag: 'what-is',
  styleUrl: 'what-is.scss'
})
export class WhatIs {

  render() {
    return [
      <docs-page>
        <app-marked doc='intro/index.md'></app-marked>
        <app-marked doc='intro/why.md'></app-marked>
        <app-marked doc='intro/history.md'></app-marked>
      </docs-page>
    ]
  }
}
