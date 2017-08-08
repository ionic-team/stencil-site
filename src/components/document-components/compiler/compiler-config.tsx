import { Component } from '@stencil/core';

@Component({
  tag: 'compiler-config',
  styleUrl: 'compiler-config.scss'
})
export class CompilerConfig {

  render() {
    return [
      <docs-page>
        <app-marked doc='compiler/config.md'></app-marked>
      </docs-page>
    ]
  }
}
