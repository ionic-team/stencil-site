import { Component, h, Prop } from '@stencil/core';


@Component({
  tag: 'docs-page'
})
export class DocsPage {
  render() {
    console.log('Rendering docs page')
    return (
      <ion-grid>
        <ion-row>
          <ion-col>
            <h2>Documentation</h2>
            <ul>
              <li><stencil-route-link url="/docs/getting-started" router="#router">Getting Started</stencil-route-link></li>
            </ul>
          </ion-col>
          <ion-col>
            <stencil-route url="/docs/getting-started" component="getting-started" router="#router" />
          </ion-col>
        </ion-row>
      </ion-grid>
    )
  }
}
