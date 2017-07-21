import { Component, h, Prop } from '@stencil/core';

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
            <stencil-route path="/" router="#router" component="landing-page" exact />
            <stencil-route path="/docs" router="#router" component="docs-page" />
            <stencil-route path="/demos" router="#router" component="demos-page" />
          </div>

        </stencil-router>
      </div>
    );
  }
}
