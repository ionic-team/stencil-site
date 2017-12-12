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
          <stencil-route-link urlMatch="/docs" url="/docs/intro">
            文档
          </stencil-route-link>
          <stencil-route-link url="/demos"  exact={true}>
            Demos
          </stencil-route-link>
          <stencil-route-link url="/pwa" exact={true}>
            PWAs
          </stencil-route-link>
          <stencil-route-link url="/resources"  exact={true}>
            资源
          </stencil-route-link>
          <a href="https://github.com/ionic-team/stencil">
            GitHub
          </a>
        </div>
      </div>
    );
  }
}
