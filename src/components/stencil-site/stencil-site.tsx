import { Component } from '@stencil/core';

@Component({
  tag: 'stencil-site',
  styleUrl: 'stencil-site.scss'
})
export class App {
  constructor() { }
  render() {
    return (
      <div class="app">
        <site-header />
        <div class="wrapper">
          <div class="pull-left">
            <site-menu />
          </div>
          <div class="pull-right">
            <stencil-router id="router">
              <stencil-route url="/" component="landing-page" router="#router" exact={true} />
              <stencil-route url="/demos" router="#router" component="demos-page" />
              <stencil-route url="/docs/getting-started" component="getting-started" router="#router" />
              <stencil-route url="/docs/intro" component="what-is" router="#router" />
              <stencil-route url="/components" component="basics-components" router="#router" />
              <stencil-route url="/code-splitting" component="code-splitting" router="#router" />
              <stencil-route url="/config" component="compiler-config" router="#router" />
              <stencil-route url="/server-side-rendering" component="stencil-ssr" router="#router" />
            </stencil-router>
          </div>
        </div>
      </div>
    );
  }
}
