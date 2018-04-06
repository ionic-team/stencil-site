import '@stencil/router';
import { Component } from '@stencil/core';

@Component({
  tag: 'stencil-site',
  styleUrl: 'stencil-site.scss'
})
export class App {
  render() {
    return [
      <div id="main-div">
        <site-header />
        <div class="app">
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
      </div>,

      <footer>
        <div id="open-source">
          <a
            href="http://ionicframework.com/"
            title="IonicFramework.com"
            rel="noopener"
          >
            <img
              src="/assets/img/ionic-os-logo.png"
              alt="Ionic Open Source Logo"
            />
          </a>
          <p>
            Released under <span id="mit">MIT License</span> | Copyright @ 2018
          </p>
        </div>

        <div id="footer-icons">
          <lazy-iframe class='star-button' src='https://ghbtns.com/github-btn.html?user=ionic-team&repo=stencil&type=star&count=true' frameBorder='0' scrolling='0' width='100px' height='20px'></lazy-iframe>
          <a
            class="svg-button"
            id="stencil-twitter"
            href="https://twitter.com/stenciljs"
            target="_blank"
            rel="noopener"
            title="Open the stencil account on twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 512 512"
            >
              <path d="M492 109.5c-17.4 7.7-36 13-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11-39.4 19.2-61.5 23.5-17.7-19-43-30.7-70.7-30.7-53.5 0-96.8 43.4-96.8 97 0 7.5.8 15 2.5 22-80.5-4-152-42.6-199.6-101.3-8.4 14.3-13.2 31-13.2 48.7C39.8 164 57 193.7 83 211c-16-.3-31-4.7-44-12v1.2c0 47 33.4 86 77.7 95-8 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48 66.5 90.5 67.3-33 26-75 41.6-120.3 41.6-7.8 0-15.5-.5-23-1.4C62.7 432 113.6 448 168 448 346.7 448 444 300.3 444 172.2c0-4.2 0-8.4-.3-12.5 19-13.7 35.3-30.7 48.3-50.2z" />
            </svg>
          </a>
          <a
            class="svg-button"
            id="ionic-forum"
            href="https://stencil-worldwide.herokuapp.com"
            target="_blank"
            rel="noopener"
            title="Join the stencil worldwide slack"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 512 512"
            >
              <path d="M213.6 236.2l64-21.4 20.7 61.8-64 21.4z" />
              <path d="M213.6 236.2l64-21.4 20.7 61.8-64 21.4z" />
              <path d="M476 190C426.3 25 355-13.4 190 36S-13.4 157 36 322s121 203.4 286 154 203.4-121 154-286zm-83.4 107l-31 10.5 10.6 32.2c4.2 13-2.7 27.2-15.7 31.5-2.7.8-5.8 1.5-8.4 1.2-10-.4-19.5-7-23-17l-10.6-32-64 21.4L261 377c4.2 13-2.7 27.2-15.7 31.5-2.7.8-5.8 1.5-8.4 1.2-10-.4-19.7-7-23-17l-11-32.3-31 10.3c-2.7.8-5.8 1.5-8.4 1.2-10-.5-19.6-7-23-17-4.2-13 2.7-27.2 15.7-31.5l31-10.4-20.6-61.7-31 10.4c-2.8.8-6 1.5-8.5 1.2-10-.5-19.6-7-23-17-4.2-13 2.7-27.2 15.7-31.5l31-10.4-11-32c-4-13 2.8-27.2 15.8-31.5 13-4.2 27.2 2.7 31.5 15.7l10.7 32.2 64-21.5-10.6-32.3c-4.2-13 2.7-27.2 15.7-31.5 13-4.2 27.3 2.7 31.6 15.7l10.7 32 31-10.3c13-4.2 27.3 2.7 31.6 15.7 4 13-2.8 27.2-15.8 31.5l-31 10.3 20.6 61.8 31-10.3c13-4.2 27.3 2.7 31.6 15.7 4.2 13.2-2.7 27.4-15.8 31.7z" />
            </svg>
          </a>
        </div>
      </footer>
    ];
  }
}
