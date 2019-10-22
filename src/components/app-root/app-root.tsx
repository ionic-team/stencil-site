import { LocationSegments, RouterHistory } from '@stencil/router';
import { Component, Element, Listen, State } from '@stencil/core';
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
    '.root'
  ];

  @Element() el!: HTMLElement;

  @State() isLeftSidebarIn: boolean = false;

  @Listen('window:resize')
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
        <site-top-bar />
        <site-header />
        <div class="root">
          <div class="container">
            <stencil-router scrollTopOffset={0}>
              <stencil-route style={{ display: 'none' }} routeRender={this.setHistory}/>
              <stencil-route-switch>
                <stencil-route url="/" component="landing-page" exact={true} />
                <stencil-route url="/docs/:pageName" routeRender={({ match }) => (
                  <document-component page={match.url}></document-component>
                )}/>
                <stencil-route url="/demos" component="demos-page" />
                <stencil-route url="/pwa" component="pwas-page" />
                <stencil-route url="/resources" component="resources-page" />
                <stencil-route url="/design-systems" component="ds-page" />
                <stencil-route component='notfound-page'></stencil-route>
              </stencil-route-switch>
            </stencil-router>
          </div>
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

              <div class="footer__icons">
                <iframe
                  name='Github Star Count'
                  class='star-button'
                  src='https://ghbtns.com/github-btn.html?user=ionic-team&repo=stencil&type=star&count=true'
                  frameBorder='0'
                  scrolling='0'
                  width='100px'
                  height='20px'></iframe>
                <a
                  class="svg-button"
                  id="stencil-twitter"
                  href="https://twitter.com/stenciljs"
                  target="_blank"
                  rel="noopener"
                  title="Open the stencil account on twitter">
                  <app-icon name="twitter"></app-icon>
                </a>
                <a
                  class="svg-button"
                  id="ionic-forum"
                  href="https://stencil-worldwide.herokuapp.com"
                  target="_blank"
                  rel="noopener"
                  title="Join the stencil worldwide slack">
                  <app-icon name="slack"></app-icon>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </SiteProviderConsumer.Provider>
    );
  }
}
