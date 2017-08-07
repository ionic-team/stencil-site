import { Component } from '@stencil/core';

@Component({
  tag: 'basics-components',
  styleUrl: 'component.scss'
})
export class BasicsComponents {

  render() {
    return [
      <ion-grid>
        <ion-row>
          <ion-col>
            <site-menu></site-menu>
          </ion-col>
          <ion-col col-9>
            <app-marked doc='basics/components.md'></app-marked>
          </ion-col>
        </ion-row>
      </ion-grid>
    ]
  }
}
