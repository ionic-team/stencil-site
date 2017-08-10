import { Component } from '@stencil/core';

@Component({
  tag: 'docs-page',
  styleUrl: 'docs-page.scss'
})
export class DocsPage {
  render() {
    return (
      <div class="wrapper">
        <div class="pull-left">
          <h2>Documentation</h2>
          <site-menu />
        </div>
        <div class="pull-right">
          <stencil-router id="content-routes">
            <stencil-route url="/" component="landing-page" router="#content-routes"  exact={true} />
            <stencil-route url="/getting-started" component="getting-started" router="#content-routes"/>
            <stencil-route url="/what-is-stencil" component="what-is" router="#content-routes" />
            <stencil-route url="/components" component="basics-components" router="#content-routes" />
            <stencil-route url="/code-splitting" component="code-splitting" router="#content-routes" />
            <stencil-route url="/config" component="compiler-config" router="#content-routes" />
            <stencil-route url="/server-side-rendering" component="stencil-ssr" router="#content-routes" />
          </stencil-router>
        </div>
      </div>
    );
  }
}
