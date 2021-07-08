import { Component, Element, Listen, State, h } from '@stencil/core';
import { ResponsiveContainer } from '@ionic-internal/ionic-ds';
import { Translation } from '../../icons';

@Component({
  tag: 'site-header',
  styleUrl: 'site-header.css',
})
export class SiteHeader {
  @Element() el!: Element;

  @State() isMobileMenuShown: boolean = false;

  @Listen('resize', { target: 'window' })
  handleResize() {
    requestAnimationFrame(() => {
      if (window.innerWidth > 768) {
        const menu = this.el.querySelector('.header-menu') as HTMLElement;
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

  showNav() {
    if (this.isMobileMenuShown) return;
    this.isMobileMenuShown = true;

    const menu = this.el.querySelector('.header-menu') as HTMLElement;

    menu.style.display = 'flex';
    setTimeout(() => {
      this.el.classList.add('show-mobile-menu');
      document.body.classList.add('no-scroll');
    }, 1);
  }

  hideNav() {
    if (!this.isMobileMenuShown) return;
    this.isMobileMenuShown = false;

    const menu = this.el.querySelector('.header-menu') as HTMLElement;

    this.el.classList.remove('show-mobile-menu');
    setTimeout(() => {
      menu.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }, 300);
  }

  render() {
    return (
      <ResponsiveContainer>
        <stencil-route class="burger-menu" url="/docs" component="app-burger" />
        <stencil-route-link url="/" class="logo-link" anchorTitle="Stencil logo">
          <app-icon name="logo" />
        </stencil-route-link>

        <div class="header-menu">
          <stencil-route-link
            urlMatch="/docs"
            url="/docs/introduction"
            onClick={() => {
              this.hideNav();
            }}
          >
            Docs
          </stencil-route-link>
          <stencil-route-link
            url="/resources"
            exact={true}
            onClick={() => {
              this.hideNav();
            }}
          >
            Resources
          </stencil-route-link>
          <a href="https://ionicframework.com/blog/tag/stencil/" aria-label="Blog" class="external-links">
            Blog
          </a>

          <a href="https://ionic.io/products/stencil" class="external-links">
            Enterprise
          </a>

          <ul class="external-links list--unstyled">
            <li>
              <docs-dropdown
                icon={Translation}
                align="right"
              >
                <section>
                  <a href="https://stenciljs.com/" class="link-active">
                    English
                    <svg viewBox="0 0 512 512" width="14">
                      <path d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z"></path>
                    </svg>
                  </a>
                  <a href="https://stenciljs.jp/" target="_blank">
                    日本語
                  </a>
                </section>
              </docs-dropdown>
            </li>
            <li>
              <a rel="noopener" class="link--external" target="_blank" href="https://twitter.com/stenciljs" aria-label="Twitter">
                <app-icon name="twitter"></app-icon>
              </a>
            </li>
            <li>
              <a rel="noopener" class="link--external" target="_blank" href="https://stencil-worldwide.herokuapp.com" aria-label="Slack">
                <app-icon name="slack"></app-icon>
              </a>
            </li>
            <li>
              <a rel="noopener" class="link--external" target="_blank" href="https://github.com/ionic-team/stencil" aria-label="Github">
                <app-icon name="github"></app-icon>
              </a>
            </li>
          </ul>

          <button
            class="header-close"
            onClick={() => {
              this.hideNav();
            }}
          >
            <app-icon name="close"></app-icon>
          </button>
        </div>

        <button
          class="header-overflow"
          onClick={() => {
            this.showNav();
          }}
          aria-label="Open menu"
        >
          <app-icon name="more"></app-icon>
        </button>
      </ResponsiveContainer>
    );
  }
}
