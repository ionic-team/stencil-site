import { Component } from '@stencil/core';

@Component({
  tag: 'stencil-ssr',
  styleUrl: 'stencil-ssr.scss'
})
export class StencilSsr {

  render() {
    return [
      <ion-grid>
        <ion-row>
          <ion-col>
            <site-menu></site-menu>
          </ion-col>
          <ion-col col-9>
            <app-marked doc='advanced/ssr/index.md'></app-marked>
          </ion-col>
        </ion-row>
      </ion-grid>
    ]
  }
}
