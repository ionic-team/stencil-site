import { Component } from '@stencil/core';

@Component({
  tag: 'compiler-config',
  styleUrl: 'compiler-config.scss'
})
export class CompilerConfig {

  render() {
    return [
      <ion-grid>
        <ion-row>
          <ion-col>
            <site-menu></site-menu>
          </ion-col>
          <ion-col col-9>
            <app-marked doc='compiler/config.md'></app-marked>
          </ion-col>
        </ion-row>
      </ion-grid>
    ]
  }
}
