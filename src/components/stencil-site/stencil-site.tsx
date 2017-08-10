import { Component } from '@stencil/core';

@Component({
  tag: 'stencil-site',
  styleUrl: 'stencil-site.scss'
})
export class App {
  constructor() {}
  render() {
    return (
      <div class="app">
      <site-header />

        <stencil-router id="router">

            <stencil-route
              url="/"
              router="#router"
              component="docs-page"
              exact={true}
            />

            <stencil-route
              url="/demos"
              router="#router"
              component="demos-page"
            />
        </stencil-router>
      </div>
    );
  }
}
