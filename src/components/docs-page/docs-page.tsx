import { Component } from '@stencil/core';


@Component({
  tag: 'docs-page',
  styleUrl: 'docs-page.scss'
})
export class DocsPage {

  render() {
    console.log('Rendering docs page')
    return (
      <ion-grid>
        <ion-row>
          <ion-col>
            <h2>Documentation</h2>
            <site-menu></site-menu>
          </ion-col>
          <ion-col col-9>
            <stencil-route path="/docs/getting-started" component="getting-started" router="#router" />
          </ion-col>
        </ion-row>
      </ion-grid>
    )
  }
}
