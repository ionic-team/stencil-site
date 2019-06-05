import '@stencil/router';
import { LocationSegments, RouterHistory } from '@stencil/router';
import { Component, Element, Listen, State, h } from '@stencil/core';
import SiteProviderConsumer, { SiteState } from '../../global/site-provider-consumer';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  history: RouterHistory = null;
  elements = [
    'site-header',
    'site-menu',
    'app-burger',
    'main'
  ];

  @Element() el!: HTMLElement;

  @State() isLeftSidebarIn: boolean = false;

  @Listen('resize', { target: 'window' })
  handleResize() {
    requestAnimationFrame(() => {
      if (window.innerWidth > 768 && this.isLeftSidebarIn) {
        this.isLeftSidebarIn = false;
        document.body.classList.remove('no-scroll');
        this.elements.forEach((el) => {
          this.el.querySelector(el).classList.remove('left-sidebar-in');
        });
      }
    });
  }

  setHistory = ({ history }: { history: RouterHistory }) => {
    if (!this.history) {
      this.history = history;
      this.history.listen((location: LocationSegments) => {
        (window as any).gtag('config', 'UA-44023830-34', { 'page_path': location.pathname + location.search });
      });
    }
  }

  componentDidLoad() {
    this.isLeftSidebarIn = false;
  }

  toggleLeftSidebar = () => {
    if (window.innerWidth >= 768) {
      return;
    }
    if (this.isLeftSidebarIn) {
      this.isLeftSidebarIn = false;
      document.body.classList.remove('no-scroll');
      this.elements.forEach((el) => {
        this.el.querySelector(el).classList.remove('left-sidebar-in');
        this.el.querySelector(el).classList.add('left-sidebar-out');
      });
    } else {
      this.isLeftSidebarIn = true;
      document.body.classList.add('no-scroll');
      this.elements.forEach((el) => {
        this.el.querySelector(el).classList.add('left-sidebar-in');
        this.el.querySelector(el).classList.remove('left-sidebar-out');
      });
    }
  }

  render() {
    const siteState: SiteState = {
      isLeftSidebarIn: this.isLeftSidebarIn,
      toggleLeftSidebar: this.toggleLeftSidebar
    };

    return (
      <SiteProviderConsumer.Provider state={siteState}>
        <site-header />
        <main>
          <stencil-router scrollTopOffset={0}>
            <stencil-route style={{ display: 'none' }} routeRender={this.setHistory}/>
            <stencil-route-switch>
              <stencil-route url="/" component="landing-page" exact={true} />
              <stencil-route url="/docs/:pageName" routeRender={({ match }) => (
                <doc-component page={match.url}></doc-component>
              )}/>

              <stencil-route url="/blog/:pageName" routeRender={({ match }) => (
                <blog-component pageUrl={match.url}></blog-component>
              )}/>

              <stencil-route url="/blog" component="blog-component" />

              <stencil-route url="/pwa" component="pwas-page" />
              <stencil-route url="/resources" component="resources-page" />
              <stencil-route url="/design-systems" component="ds-page" />
              <stencil-route component='notfound-page'></stencil-route>
            </stencil-route-switch>
          </stencil-router>
          <footer>
            <div class="container">
              <div class="footer__open-source">
                <a
                  href="http://ionicframework.com/"
                  title="IonicFramework.com"
                  rel="noopener">
                  <img
                    src="/assets/img/ionic-os-logo.png"
                    alt="Ionic Open Source Logo" />
                </a>
                <p>
                  Released under <span id="mit">MIT License</span> | Copyright @ 2018
                </p>
              </div>
            </div>
          </footer>
        </main>
      </SiteProviderConsumer.Provider>
    );
  }
}
