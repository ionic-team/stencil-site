import { Component, Element, Listen, State } from '@stencil/core';

@Component({
  tag: 'site-header',
  styleUrl: 'site-header.scss'
})
export class SiteHeader {

  @Element() el: Element;

  @State() isMobileMenuShown: boolean;

  @Listen('window:resize')
  handleResize() {
    requestAnimationFrame(() => {
      if (window.innerWidth > 768) {
        const menu = (this.el.querySelector('.header-menu') as HTMLElement);
        menu.style.display = "";
        this.el.classList.remove('show-mobile-menu');
        document.body.classList.remove('no-scroll');
        this.isMobileMenuShown = false;
      }
    });
  }

  componentDidLoad() {
    this.isMobileMenuShown = false;
  }

  showNav () {
    if (this.isMobileMenuShown) return;
    this.isMobileMenuShown = true;

    const menu = (this.el.querySelector('.header-menu') as HTMLElement);

    menu.style.display = "flex";
    setTimeout(() => {
      this.el.classList.add('show-mobile-menu');
      document.body.classList.add('no-scroll');
    }, 1)
  }

  hideNav () {
    if (!this.isMobileMenuShown) return;
    this.isMobileMenuShown = false;

    const menu = (this.el.querySelector('.header-menu') as HTMLElement);

    this.el.classList.remove('show-mobile-menu');
    setTimeout(() => {
      menu.style.display = "none";
      document.body.classList.remove('no-scroll');
    }, 300)
  }

  render() {
    return (
      <div class="container">
        <stencil-route-link url="/" class="logo-link">
          <img class="logo" alt="Stencil" src="/assets/img/stencil-logo-new.svg" />
        </stencil-route-link>

        <div class="header-menu">
          <stencil-route-link urlMatch="/docs" url="/docs/introduction" onClick={() => { this.hideNav() }}>
            Docs
          </stencil-route-link>
          <stencil-route-link url="/demos"  exact={true} onClick={() => { this.hideNav() }}>
            Demos
          </stencil-route-link>
          <stencil-route-link url="/pwa" exact={true} onClick={() => { this.hideNav() }}>
            PWAs
          </stencil-route-link>
          <stencil-route-link url="/resources"  exact={true} onClick={() => { this.hideNav() }}>
            Resources
          </stencil-route-link>
          <a class="link--external" href="https://github.com/ionic-team/stencil">
            GitHub <app-icon name="targetblank"></app-icon>
          </a>

          <div class="header-close" onClick={() => { this.hideNav() }}>
            <app-icon name="close"></app-icon>
          </div>
        </div>

        <div class="header-overflow" onClick={() => { this.showNav() }}>
          <app-icon name="more"></app-icon>
        </div>
      </div>
    );
  }
}
