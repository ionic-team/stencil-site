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
            <stencil-route url="/docs/getting-started" component="getting-started" router="#router"/>
            <stencil-route url="/docs/what-is-stencil" component="what-is" router="#router"/>
            <stencil-route url="/docs/basics/components" component="basics-components" router="#router"/>
            <stencil-route url="/docs/basics/code-splitting" component="code-splitting" router="#router" />
            <stencil-route url="/docs/compiler/config" component="compiler-config" router="#router" />
            <stencil-route url="/docs/advanced/server-side-rendering" component="stencil-ssr" router="#router" />
          </ion-col>
        </ion-row>
      </ion-grid>
    )
  }
}
