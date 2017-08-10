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
          <div>
            <stencil-route url="/" router="#router" component="landing-page" exact={true}/>
            <stencil-route url="/docs" router="#router" component="docs-page"/>
            <stencil-route url="/demos" router="#router" component="demos-page" />
          </div>
        </stencil-router>
      </div>
    );
  }
}
