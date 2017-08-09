import { Component } from '@stencil/core';

@Component({
  tag: 'code-splitting',
  styleUrl: 'code-splitting.scss'
})
export class CodeSplitting {

  render() {
    return [
      <app-marked doc='basics/code-splitting.md'></app-marked>
    ]
  }
}
