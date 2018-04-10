import '@stencil/router';
import { Component, Element, Listen, State } from '@stencil/core';

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

  @Listen('burgerClick')
  @Listen('leftSidebarClick')
  handleToggle() {
    if (window.innerWidth < 768) this.toggleLeftSidebar();
  }

  componentDidLoad() {
    this.isLeftSidebarIn = false;
  }

  toggleLeftSidebar() {
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
    return [
      <site-header />,
      <div class="root">
        <div class="container">
          <stencil-router>
            <stencil-route url="/" component="landing-page" exact={true} />
            <stencil-route
              url="/docs/:pageName"
              routeRender={(props: { [key: string]: any }) => {
                const map = {
                  'intro': 'intro/index.html',
                  'browser-support': 'intro/browsers.html',
                  'getting-started': 'start/index.html',
                  'my-first-component': 'basics/my-first-component.html',
                  'templating': 'basics/templating.html',
                  'decorators': 'basics/decorators.html',
                  'events': 'basics/events.html',
                  'component-lifecycle': 'basics/component-lifecycle.html',
                  'stencil-config': 'basics/stencil-config.html',
                  'forms': 'basics/forms.html',
                  'handling-arrays': 'basics/handling-arrays.html',
                  'testing': 'basics/testing.html',
                  'config': 'advanced/compiler/index.html',
                  'server-side-rendering': 'advanced/ssr/index.html',
                  'routing': 'addons/stencil-router.html',
                  'sass': 'addons/stencil-sass.html',
                  'service-workers': 'advanced/service-worker/index.html',
                  'distribution': 'advanced/distribution/index.html',
                  'framework-integration': 'advanced/framework-integration/index.html',
                  'prerendering': 'advanced/pre-rendering/index.html',
                  'shadow-dom': 'advanced/shadow-dom/index.html',
                  'css-variables': 'advanced/css-variables/index.html',
                  'context': 'advanced/context/index.html',
                  'style-guide': 'advanced/style-guide/index.html'
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
                  alt="Ionic Open Source Logo"/>
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
    ];
  }
}
