import { Component } from '@stencil/core';

@Component({
  tag: 'what-is',
  styleUrl: 'what-is.scss'
})
export class WhatIs {

  render() {
    return [
      <ion-grid>
        <ion-row>
          <ion-col>
            <site-menu></site-menu>
          </ion-col>
          <ion-col col-9>
            <app-marked doc='intro/index.md'></app-marked>
            <app-marked doc='intro/why.md'></app-marked>
            <app-marked doc='intro/history.md'></app-marked>
          </ion-col>
        </ion-row>
      </ion-grid>
    ]
  }
}
