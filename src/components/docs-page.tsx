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
          </ion-col>
        </ion-row>
      </ion-grid>
    )
  }
}
