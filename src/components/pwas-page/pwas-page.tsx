import { Component, h } from '@stencil/core';

@Component({
  tag: 'pwas-page',
  styleUrl: 'pwas-page.css'
})
export class pwasPage {

  demos = [
    {
      title: 'Stenciljs.com',
      description: 'Yep, this site is built as a PWA!',
      imgPath: '/assets/img/demos/demo-stenciljs',
      demoUrl: '/',
      sourceUrl: 'https://github.com/ionic-team/stencil-site',
    },
    {
      title: 'IonicHN',
      description: 'Hacker News PWA built with @stencil/core and @ionic/core',
      imgPath: '/assets/img/demos/demo-ionichn',
      demoUrl: 'https://corehacker-10883.firebaseapp.com/',
      sourceUrl: 'https://github.com/ionic-team/ionic-stencil-hn-app'
    },
    {
      title: 'Stencil Fiber demo',
      description: 'This showcases the runtime performance of stencil using our async rendering',
      imgPath: '/assets/img/demos/demo-fiber',
      demoUrl: 'https://stencil-fiber-demo.firebaseapp.com/',
      sourceUrl: 'https://github.com/ionic-team/stencil-fiber-demo'
    },
  ];

  constructor() {
    document.title = `PWAs`;
  }

  render() {
    return (
      <div class="container">
        <div class="measure-xl">
          <img src="/assets/img/pwa-toolkit-logo.png" srcSet="/assets/img/pwa-toolkit-logo.png 1x, /assets/img/pwa-toolkit-logo@2x.png 2x" />
          <h1 >Everything you need to easily build fast, production ready Progressive Web Apps</h1>
        </div>
        <ul class="list--unstyled list--icon list--columns">
          <li><app-icon name="checkmark"></app-icon> Push notifications</li>
          <li><app-icon name="checkmark"></app-icon> Routing</li>
          <li><app-icon name="checkmark"></app-icon> prerendering</li>
          <li><app-icon name="checkmark"></app-icon> Update toasts</li>
          <li><app-icon name="checkmark"></app-icon> Unit Tests</li>
          <li><app-icon name="checkmark"></app-icon> Zero config lazy loading</li>
          <li><app-icon name="checkmark"></app-icon> Zero config code splitting</li>
          <li><app-icon name="checkmark"></app-icon> ES6 by default</li>
          <li><app-icon name="checkmark"></app-icon> Selective polyfills</li>
          <li><app-icon name="checkmark"></app-icon> Lazy image loading</li>
          <li><app-icon name="checkmark"></app-icon> Everything needed for an add to homescreen PWA</li>
        </ul>

        <div class="measure-lg">
          <h3>Getting started with the Ionic PWA Toolkit</h3>
          <ol class="list--numbered-badge">
            <li>
              <span>
                In your terminal, run: <br/>
                <code>git clone https://github.com/ionic-team/ionic-pwa-toolkit my-pwa</code>
              </span>
            </li>
            <li>
              <span>
                Run <code>npm install</code>
              </span>
            </li>
            <li>
              <span>
                Run <code>npm run build</code>
              </span>
            </li>
          </ol>

          <p>And with just those three commands you now have a great looking PWA that scores 100 on lighthouse right out of the box.</p>

          <img class="screenshot" src="/assets/img/pwa-lighthouse-score.png" srcSet="/assets/img/pwa-lighthouse-score.png 1x, /assets/img/pwa-lighthouse-score@2x.png 2x" loading="lazy" />

          <h3 class="push">Under the hood</h3>

          <h4>Ionic</h4>
          <p>
            The Ionic PWA Toolkit uses an early release of Ionic 4. Ionic 4 is built completely out of web components
            using Stencil. This means that you can use Ionic 4 just like any other Stencil collection and you will be able to use
            any of the Ionic components with minimal to no overhead.
          </p>

          <h4>Routing</h4>
          <p>
            The Ionic PWA Toolkit uses the Stencil Router.
            <stencil-route-link url="/docs/routing" class="block">
              Read more about the Stencil Router
            </stencil-route-link>
          </p>


          <h4>Service Worker</h4>
          <p>
            When you run <code>npm run build</code> we automatically generate a Service Worker for you using <a href="https://workboxjs.org/">Workbox</a> that handles pre-caching your assets.

            <stencil-route-link url="/docs/service-workers" class="block">
              Read more about Service Workers
            </stencil-route-link>
          </p>

          <h4>Web Manifest</h4>
          <p>
            By default we include a Web Manifest that has all the neccessary entries to get the Add to Homescreen prompt. You can see that
            web manifest <a href="https://github.com/ionic-team/ionic-pwa-toolkit/blob/master/src/manifest.json">here</a>.
          </p>
        </div>

        <h3 class="push">PWAs built with Stencil</h3>
        <div class="demo-card-list">
          {this.demos.map(demo => {
            return (
              <demo-card
                name={demo.title}
                description={demo.description}
                imgPath={demo.imgPath}
                demoUrl={demo.demoUrl}
                sourceUrl={demo.sourceUrl}></demo-card>
            );
          })}
        </div>

      </div>
    );
  }
}
