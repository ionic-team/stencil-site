import { Component } from '@stencil/core';

@Component({
  tag: 'site-header',
  styleUrl: 'site-header.scss'
})
export class SiteHeader {
  render() {
    return (
      <div class="site-header">
        <img class="logo" src="img/text-logo.png" />
        <div class="pull-right">
          <stencil-route-link router="#router" url="/">
            Docs
          </stencil-route-link>
          <stencil-route-link router="#router" url="/demos">
            Demos
            </stencil-route-link>
          <a href="http://github.com/ionic-team/stencil-site" target="_blank" class="button">Stencil</a>
        </div>
      </div>
    );
  }
}
