import { Component } from '@stencil/core';

@Component({
  tag: 'pwas-page',
  styleUrl: 'pwas-page.scss'
})
export class pwasPage {

  constructor() {
    document.title = `PWAs`;
  }

  render() {
    return (
      <div>
        <h1>Progressive Web Apps</h1>
        <h4>Building PWAs with Stencil + Ionic using the Ionic PWA Toolkit</h4>

        <p>
          The Ionic PWA Toolkit gives you everything you need to easily build fast, production ready PWAs:
        </p>

        <ul>
          <li>Stencil for easily building and loading standardized Web Components</li>
          <li>Ionic for awesome pre-built UI components</li>
          <li>Routing</li>
          <li>Push Notifications setup</li>
          <li>Showing a toast when a new version of the PWA is available</li>
          <li>Unit Tests</li>
          <li>Pre-rendering</li>
          <li>zero config lazy loading</li>
          <li>zero config code splitting</li>
          <li>Polyfills selectively loaded depending on the browser support</li>
          <li>ES6 by default for new browsers, ES5 for older browsers</li>
          <li>Everything needed for an add to homescreen PWA (service worker, web manifest and iOS meta tags)</li>
          <li>lazy-img component for lazy loading below the fold images</li>
        </ul>

        <h4>Getting started with the Ionic PWA Toolkit</h4>
        <ul>
          <li>
            Run <code>git clone https://github.com/ionic-team/ionic-pwa-toolkit my-pwa</code> in your terminal.
          </li>
          <li>
            Run <code>npm install</code>
          </li>
          <li>
            Run <code>npm run build</code>
          </li>
        </ul>

        And with just those three commands you now have a great looking PWA that scores 100 on lighthouse right out of the box.

        <img src="/assets/img/pwa.png"></img>

        <h4>Under the hood</h4>

        <h5>Ionic</h5>
        <p>
          The Ionic PWA Toolkit uses an early release of Ionic 4. Ionic 4 is built completely out of web components
          using Stencil. This means that you can use Ionic 4 just like any other Stencil collection and you will be able to use
          any of the Ionic components with minimal to no overhead.
        </p>

        <h5>Routing</h5>
        <p>
          The Ionic PWA Toolkit uses the Stencil Router.
        </p>

        <stencil-route-link url='docs/routing'>
          Read more about the Stencil Router here.
        </stencil-route-link>

        <h5>Service Worker</h5>
        <p>
          When your run <code>npm run build</code> we automatically generate a Service Worker for you using <a href="https://workboxjs.org/">Workbox</a> that handles pre-caching your assets.
        </p>

        <stencil-route-link url="/docs/service-workers">
          Read more about Service Workers here.
        </stencil-route-link>

        <h5>Web Manifest</h5>
        <p>
          By default we include a Web Manifest that has all the neccessary entries to get the Add to Homescreen prompt. You can see that
          web manifest <a href="https://github.com/ionic-team/ionic-pwa-toolkit/blob/master/src/manifest.json">here</a>.
        </p>

        <h4>PWAs built with Stencil</h4>

        <ul>
          <li>
            <a href="https://stenciljs.com/">This site! That's right, stenciljs.com is a PWA</a>
          </li>
          <li>
            <a href="https://corehacker-10883.firebaseapp.com/">Ionic Hacker News as featured on <a href="https://hnpwa.com">HNPWA</a></a>
          </li>
          <li>
            <a href="https://stencilpaint-8ba3c.firebaseapp.com/">StencilPaint</a>
          </li>
        </ul>
      </div>
    );
  }
}
