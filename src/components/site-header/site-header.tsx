import { Component, Element, Listen, State, h } from '@stencil/core';

@Component({
  tag: 'site-header',
  styleUrl: 'site-header.css'
})
export class SiteHeader {
  @Element() el!: Element;

  @State() isMobileMenuShown: boolean = false;

  @Listen('resize', { target: 'window' })
  handleResize() {
    requestAnimationFrame(() => {
      if (window.innerWidth > 768) {
        const menu = (this.el.querySelector('.header-menu') as HTMLElement);
        menu.style.display = '';
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
        <stencil-route-link url="/" class="logo-link" anchorTitle="Stencil logo">
          <app-icon name="logo"/>
        </stencil-route-link>

        <div class="header-menu">
          <stencil-route-link urlMatch="/docs" url="/docs/introduction" onClick={() => { this.hideNav() }}>
            Docs
          </stencil-route-link>
          <stencil-route-link url="/resources" exact={true} onClick={() => { this.hideNav() }}>
            Resources
          </stencil-route-link>

          <stencil-route-link url="/blog" exact={true} onClick={() => { this.hideNav() }}>
            Blog
          </stencil-route-link>

          <stencil-route-link url="/design-systems" exact={true} onClick={() => { this.hideNav() }} class="stencil-ds">
            <svg width="21" height="14" viewBox="0 0 21 14" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.77264 4.60664L8.95159 1H13.9671L10.7921 4.60664H5.77264ZM4.42225 4.62637L8.5 0H16.1797L12.107 4.62637H20.25L16.0855 9.37363H16.0791L12 14H4.33337L8.37826 9.37363H0.25L4.41447 4.62637H4.42225ZM4.86748 5.62637L2.45748 8.37364H15.6325L18.0425 5.62637H4.86748ZM7.96391 11.3668L6.536 13H11.5485L14.6914 9.43542L7.96391 11.3668Z"/></svg>
            DS
          </stencil-route-link>

          <ul class="external-links list--unstyled">
            <li>
              <a rel="noopener" class="link--external" target="_blank" href="https://twitter.com/stenciljs">
                <app-icon name="twitter"></app-icon>
              </a>
            </li>
            <li>
              <a rel="noopener" class="link--external" target="_blank" href="https://stencil-worldwide.herokuapp.com">
                <app-icon name="slack"></app-icon>
              </a>
            </li>
            <li>
              <a rel="noopener" class="link--external" target="_blank" href="https://github.com/ionic-team/stencil">
                <app-icon name="github"></app-icon>
              </a>
            </li>
          </ul>

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
