import { Component } from '@stencil/core';


@Component({
  tag: 'docs-page',
  styleUrl: 'docs-page.scss'
})
export class DocsPage {

  render() {
    console.log('Rendering docs page')
    return (
      <ion-scroll>
        <ion-grid>
          <ion-row>
            <ion-col>
              <site-menu></site-menu>
            </ion-col>
            <ion-col col-9>
              <slot></slot>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-scroll>
    )
  }
}
