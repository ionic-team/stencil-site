import { Component } from '@stencil/core';

@Component({
  tag: 'code-splitting',
  styleUrl: 'code-splitting.scss'
})
export class CodeSplitting {

  render() {
    return [
      <ion-grid>
        <ion-row>
          <ion-col>
            <site-menu></site-menu>
          </ion-col>
          <ion-col col-9>
            <app-marked doc='basics/code-splitting.md'></app-marked>
          </ion-col>
        </ion-row>
      </ion-grid>
    ]
  }
}
