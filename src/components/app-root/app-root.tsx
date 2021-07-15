import '@stencil/router';
import { LocationSegments, RouterHistory } from '@stencil/router';
import { Component, Element, Listen, State, h } from '@stencil/core';
import SiteProviderConsumer, { SiteState } from '../../global/site-provider-consumer';
import { ResponsiveContainer } from '@ionic-internal/ionic-ds';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  private scrollY = 0;
  private history?: RouterHistory;
  elements = ['site-header', 'site-menu', 'app-burger', 'main'];

  @Element() el!: HTMLElement;

  @State() isLeftSidebarIn: boolean = false;
  @State() isModalOpen: boolean = false;

  @Listen('resize', { target: 'window' })
  handleResize() {
    requestAnimationFrame(() => {
      if (window.innerWidth > 768 && this.isLeftSidebarIn) {
        this.isLeftSidebarIn = false;
        document.body.classList.remove('no-scroll');
        this.elements.forEach(el => {
          this.el.querySelector(el)!.classList.remove('left-sidebar-in');
        });
      }
    });
  }

  @Listen('toggleModal')
  handleToggleModal(ev: CustomEvent) {
    this.isModalOpen = ev.detail;
  }

  private setHistory = ({ history }: { history: RouterHistory }) => {
    if (!this.history) {
      this.history = history;
      this.history.listen((_location: LocationSegments) => {
        // Hubspot
        // (window as any)._hsq.push(['setPath', location.pathname + location.search ]);
        // (window as any)._hsq.push(['trackPageView']);
      });
    }
  };

  componentDidLoad() {
    this.isLeftSidebarIn = false;
  }

  private toggleLeftSidebar = () => {
    if (window.innerWidth > 768) {
      return;
    }
    const elements = this.elements.map(el => this.el.querySelector(el)).filter(el => !!el) as Element[];

    this.scrollY = window.scrollY;

    if (this.isLeftSidebarIn) {
      this.isLeftSidebarIn = false;
      document.body.classList.remove('no-scroll');
      elements.forEach(el => {
        el.classList.remove('left-sidebar-in');
        el.classList.add('left-sidebar-out');
      });
      window.requestAnimationFrame(() => window.scrollTo(0, this.scrollY));
    } else {
      this.isLeftSidebarIn = true;
      document.body.classList.add('no-scroll');
      elements.forEach(el => {
        el.classList.add('left-sidebar-in');
        el.classList.remove('left-sidebar-out');
      });
      window.requestAnimationFrame(() => window.scrollTo(0, this.scrollY));
    }
  };

  render() {
    const siteState: SiteState = {
      isLeftSidebarIn: this.isLeftSidebarIn,
      toggleLeftSidebar: this.toggleLeftSidebar,
    };

    return (
      <SiteProviderConsumer.Provider state={siteState}>
        <site-root>
          <platform-bar productName="Stencil" />
          {/* <announcement-bar /> */}
          <site-header />
          <main>
            <stencil-router scrollTopOffset={0}>
              <stencil-route style={{ display: 'none' }} routeRender={this.setHistory} />
              <stencil-route-switch>
                <stencil-route url="/" component="landing-page" exact={true} />
                <stencil-route url="/docs/:pageName" routeRender={({ match }) => <doc-component page={match!.url}></doc-component>} />

                <stencil-route url="/blog" component="blog-list" exact={true} />

                <stencil-route url="/blog/:pageName" routeRender={({ match }) => <blog-component page={match!.url}></blog-component>} />

                {/* <stencil-route url="/design-systems" component="ds-page" /> */}
                <stencil-route url="/pwa" component="pwas-page" />
                <stencil-route url="/resources" component="resources-page" />
                <stencil-route component="notfound-page"></stencil-route>
              </stencil-route-switch>
            </stencil-router>
            <footer>
              <ResponsiveContainer>
                <div class="footer-col">
                  <app-icon name="logo" />
                  <p>© {(new Date().getFullYear())} StencilJS. Released under MIT License</p>
                  <ul class="external-links list--unstyled">
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
                </div>
              </ResponsiveContainer>
            </footer>
            <hubspot-modal active={this.isModalOpen} />
          </main>
        </site-root>
      </SiteProviderConsumer.Provider>
    );
  }
}
