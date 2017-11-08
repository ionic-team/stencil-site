import { Component } from '@stencil/core';

@Component({
  tag: 'site-header',
  styleUrl: 'site-header.scss'
})
export class SiteHeader {
  render() {
    return (
      <div class="site-header">
        <stencil-route-link url="/" class="logo-link">
          <img class="logo" alt="Stencil" src="/assets/img/text-logo.svg" />
        </stencil-route-link>
        <div class="pull-right">
          <stencil-route-link url="/docs/intro"  exact={true}>
            Docs
          </stencil-route-link>
          <stencil-route-link url="/demos"  exact={true}>
            Demos
          </stencil-route-link>
          <stencil-route-link url="/pwa" exact={true}>
            PWAs
          </stencil-route-link>
          <stencil-route-link url="/resources"  exact={true}>
            Resources
          </stencil-route-link>
          <stencil-route-link url="https://github.com/ionic-team/stencil" exact={true}>
            GitHub
          </stencil-route-link>
        </div>
      </div>
    );
  }
}
