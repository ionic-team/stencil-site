import { Component } from '@stencil/core';

@Component({
  tag: 'getting-started',
  styleUrl: 'getting-started.scss'
})
export class GettingStarted {

  render() {
    return [
      <ion-grid>
        <ion-row>
          <ion-col>
            <site-menu></site-menu>
          </ion-col>
          <ion-col col-9>
            <app-marked doc='start/index.md'></app-marked>
          </ion-col>
        </ion-row>
      </ion-grid>
    ]
  }
}
