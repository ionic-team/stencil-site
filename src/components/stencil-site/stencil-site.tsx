import '@stencil/router';
import { Component, Element, Listen, State } from '@stencil/core';
import SiteProviderConsumer, { SiteState } from '../../global/site-provider-consumer';

@Component({
  tag: 'stencil-site',
  styleUrl: 'stencil-site.scss'
})
export class App {
  elements = [
    'site-header',
    'site-menu',
    'app-burger',
    '.root'
  ];

  @Element() el: HTMLElement;

  @State() isLeftSidebarIn: boolean;

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
        <div class="root">
          <div class="container">
            <stencil-router>
              <stencil-route-switch scrollTopOffset={0}>
                <stencil-route component="landing-page" exact={true} />
                <stencil-route
                  url="/docs/:pageName"
                  routeRender={(props: { [key: string]: any }) => {
                    const map = {
                      'introduction': 'introduction/why-stencil.html',
                      'getting-started': 'introduction/getting-started.html',
                      'my-first-component': 'introduction/my-first-component.html',
                      'reusable-components': 'introduction/reusable-components.html',
                      'building-an-app': 'introduction/building-an-app.html',
                      'faq': 'introduction/faq.html',

                      'component-lifecycle': 'reference/component-lifecycle.html',
                      'decorators': 'reference/decorators.html',
                      'events': 'reference/events.html',
                      'reactive-data': 'reference/reactive-data.html',
                      'templating-jsx': 'reference/templating-and-jsx.html',
                      'styling': 'reference/styling.html',
                      'forms': 'reference/forms.html',
                      'config': 'reference/config.html',

                      'distribution': 'guides/distribution.html',
                      'module-bundling': 'guides/module-bundling.html',
                      'prerendering': 'guides/prerendering.html',
                      'server-side-rendering': 'guides/server-side-rendering.html',
                      'service-workers': 'guides/service-workers.html',
                      'context': 'guides/context.html',
                      'performance': 'guides/performance.html',
                      'unit-testing': 'guides/unit-testing.html',
                      'dev-inspector': 'guides/service-worker.html',
                      'router': 'guides/router.html',
                      'framework-integration': 'guides/framework-integration.html',
                      'style-guide': 'guides/style-guide.html',
                      'handling-arrays': 'guides/handling-arrays.html',

                      'angular': 'framework-integration/angular.html',
                      'react': 'framework-integration/react.html',

                      'contributing': 'community/how-to-contribute.html',
                      'add-ons': 'community/add-ons.html'
                    };
                    return (
                      <document-component
                        pages={[map[props.match.params.pageName]]}
                      />
                    );
                  }}
                />
                <stencil-route url="/demos" component="demos-page" />
                <stencil-route url="/pwa" component="pwas-page" />
                <stencil-route url="/resources" component="resources-page" />

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
                <lazy-iframe
                  class='star-button'
                  src='https://ghbtns.com/github-btn.html?user=ionic-team&repo=stencil&type=star&count=true'
                  frameBorder='0'
                  scrolling='0'
                  width='100px'
                  height='20px'></lazy-iframe>
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
