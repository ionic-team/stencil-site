import { Component } from '@stencil/core';

@Component({
  tag: 'compiler-config',
  styleUrl: 'compiler-config.scss'
})
export class CompilerConfig {

  render() {
    return [
      <app-marked doc='compiler/config.md'></app-marked>
    ]
  }
}
