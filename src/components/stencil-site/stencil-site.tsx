import { Component } from '@stencil/core';

@Component({
  tag: 'stencil-site',
  styleUrl: 'stencil-site.scss'
})
export class App {
  constructor() {
  }
  render() {
    return (
      <div class="app">
        <stencil-router id="router">

          <site-header />

          <div style={{
            margin: '100px 0 0 0'
          }}>
            <stencil-route url="/" router="#router" component="landing-page" />
            <stencil-route url="/docs" router="#router" component="docs-page" />
            <stencil-route url="/demos" router="#router" component="demos-page" />
            <stencil-route url="/docs/getting-started" component="getting-started" router="#router" />
          </div>

        </stencil-router>
      </div>
    );
  }
}
