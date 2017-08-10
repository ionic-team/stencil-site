import { Component } from '@stencil/core';

@Component({
  tag: 'site-header',
  styleUrl: 'site-header.scss'
})
export class SiteHeader {
  render() {
    return (
      <div class="site-header">
        <img class="logo pull-left" src="img/text-logo.png" />
        <div class="pull-right">
          <stencil-route-link router="#router" url="/" custom={true}>
            Home
          </stencil-route-link>
          <stencil-route-link router="#router" url="/docs" custom={true}>
            Docs
          </stencil-route-link>
          <stencil-route-link router="#router" url="/demos" custom={true}>
            Demos
          </stencil-route-link>
        </div>
      </div>
    );
  }
}
