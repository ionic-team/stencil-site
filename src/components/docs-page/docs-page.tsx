import { Component } from '@stencil/core';


@Component({
  tag: 'docs-page',
  styleUrl: 'docs-page.scss'
})
export class DocsPage {

  render() {
    console.log('Rendering docs page')
    return (
      <div>
            <h2>Documentation</h2>
            {/* <site-menu></site-menu> */}
            {/* <stencil-route url="/docs/getting-started" component="getting-started" router="#router"/>
            <stencil-route url="/docs/what-is-stencil" component="what-is" router="#router"/>
            <stencil-route url="/docs/basics/components" component="basics-components" router="#router"/>
            <stencil-route url="/docs/basics/code-splitting" component="code-splitting" router="#router" />
            <stencil-route url="/docs/compiler/config" component="compiler-config" router="#router" />
            <stencil-route url="/docs/advanced/server-side-rendering" component="stencil-ssr" router="#router" /> */}
      </div>
    )
  }
}
