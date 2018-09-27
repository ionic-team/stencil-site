import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.css'
})
export class LandingPage {

  @Element() el!: Element;

  @Prop({ context: 'isServer' }) private isServer: boolean;

  constructor() {
    document.title = `Stencil`;
  }

  componentDidLoad() {
    console.log('didLoad called on landing page');
    // unfortunately necessary hack because Edge
    // dont show the animated youtube video in Edge because
    // pointer-events: none; is broken in Edge
    // just link to the youtube video directly like we do on mobile
    if ((document as any).documentMode || /Edge/.test(navigator.userAgent)) {
      (this.el.querySelector('#youtube-video') as HTMLElement).style.display = 'none';
      (this.el.querySelector('#launch-video') as HTMLElement).style.display = 'none';
      (this.el.querySelector('#background') as HTMLElement).style.display = 'none';
      (this.el.querySelector('#mobile-video') as HTMLElement).style.display = 'flex';
    }
  }

  openYoutube() {
    const youtube = (this.el.querySelector('#youtube-video') as HTMLElement);
    const background = (this.el.querySelector('#background') as HTMLElement);

    youtube.classList.add('youtube-show');
    background.classList.add('background-show');
  }

  closeBackground() {
    const youtube = (this.el.querySelector('#youtube-video') as HTMLElement);
    const background = (this.el.querySelector('#background') as HTMLElement);

    youtube.classList.remove('youtube-show');
    background.classList.remove('background-show');
  }

  render() {
    return (
      <div>
        <div onClick={() => { this.closeBackground() }} id="background"></div>

        {!this.isServer && window.matchMedia('(min-width: 740px)').matches ? <div id="youtube-video" onClick={() => { this.closeBackground() }}>
          <lazy-iframe src="https://www.youtube.com/embed/UfD-k7aHkQE" width="700" height="450" title="Ionic team at Polymer Summit video" />
        </div>: null}

        <main>
          <section class="hero">
            <img id="logo" src="/assets/img/logo.png" alt="Stencil Logo"></img>
            <h1>The magical, reusable web component compiler</h1>
          </section>

          <section class="overview">
            <p>Stencil combines the best concepts of the most popular frontend frameworks and generates 100% standards-based Web Components that run in any modern browser.</p>
            <ul class="small list--unstyled list--icon">
              <li><app-icon name="checkmark"/> Typescript support</li>
              <li><app-icon name="checkmark"/> Asynchronous rendering pipeline</li>
              <li><app-icon name="checkmark"/> A tiny virtual DOM layer</li>
              <li><app-icon name="checkmark"/> One-way data binding</li>
              <li><app-icon name="checkmark"/> JSX support</li>
              <li><app-icon name="checkmark"/> Simple component lazy-loading</li>
            </ul>
          </section>

          <section class="cta">
            <div class="cta__primary">
              <h3>Start coding with Stencil in seconds</h3>
              <code>npm init stencil</code>
              <span>Requires NPM v6</span>
            </div>
            <p class="cta__secondary">Dive deeper with our <a href="/docs/getting-started">Getting Started</a> guide</p>
          </section>

          <section class="section section--small">
            <div class="section__body">
              <h4>Why Stencil?</h4>
              <ul class="feature-list list--unstyled">
                <li class="feature-list__item">
                  <app-icon name="simple"/>
                  <h3>Simple</h3>
                  <p>With intentionally small tooling, a tiny API, zero configuration, you're set.</p>
                </li>
                <li class="feature-list__item">
                  <app-icon name="performant"/>
                  <h3>Performant</h3>
                  <p>6kb min+gzip runtime, server side rendering, and the raw power of native Web Components.</p>
                </li>
                <li class="feature-list__item">
                  <app-icon name="futureproof"/>
                  <h3>Future proof</h3>
                  <p>Build versatile apps and components based 100% on web standards. Break free of Framework Churn.</p>
                </li>
              </ul>
            </div>
          </section>

          <section class="section">
            <div class="section__heading">
              <h2>Awesome developer experience out of the box</h2>
            </div>
            <div class="section__body">
              <ul class="list--icon list--unstyled">
                <li><app-icon name="checkmark"/> Built-in dev-server for hot module reloading</li>
                <li><app-icon name="checkmark"/> Screenshot visual UI diffs</li>
                <li><app-icon name="checkmark"/> Auto-generate component documentation <br/><span class="small muted">(including css variables)</span></li>
              </ul>
            </div>
          </section>

          <section class="section section--emphasize section--small section--centered">
            <div class="section__heading">
              <h2>Build one component library for all of your apps</h2>
            </div>
            <div class="section__body">
              <p class="measure-lg">Stencil components are just Web Components, so they work with any major framework or no framework at all.</p>
              <h6>Learn how Stencil seamlessly integrates with:</h6>
              <ul class="card-links list--unstyled">
                <li>
                  <stencil-route-link class="card-links__item" url="/docs/getting-started">
                    <i class="fw-icon fw-icon--react"></i>
                    React
                  </stencil-route-link>
                </li>
                <li>
                  <stencil-route-link class="card-links__item" url="/docs/angular">
                    <i class="fw-icon fw-icon--angular"></i>
                    Angular
                  </stencil-route-link>
                </li>
                <li>
                  <stencil-route-link class="card-links__item" url="/docs/vue">
                    <i class="fw-icon fw-icon--vue"></i>
                    Vue
                  </stencil-route-link>
                </li>
                <li>
                  <stencil-route-link class="card-links__item" url="/docs/ember">
                    <i class="fw-icon fw-icon--ember"></i>
                    Ember
                  </stencil-route-link>
                </li>
              </ul>
            </div>
          </section>

          <section class="section">
            <div class="section__heading">
              <h2>The ecosystem you need to build apps that scale</h2>
            </div>
            <div class="section__body">
              <p>We’re creating libraries to help you tackle the challenges of building large production applications with Web Components.</p>
              <ul class="link-list list--unstyled">
                <li>
                  <stencil-route-link anchorClass="btn btn--tertiary btn--small" url="/docs/router">
                    <app-icon name="docs"/>
                    stencil-router
                  </stencil-route-link>
                </li>
                <li>
                  <stencil-route-link anchorClass="btn btn--tertiary btn--small" url="/docs/stencil-state-tunnel">
                    <app-icon name="docs"/>
                    stencil-state-tunnel
                  </stencil-route-link>
                </li>
                <li>
                  <stencil-route-link anchorClass="btn btn--tertiary btn--small" url="/docs/stencil-redux">
                    <app-icon name="docs"/>
                    stencil-redux
                  </stencil-route-link>
                </li>
              </ul>
            </div>
          </section>

          <section class="section section--small section--centered">
            <div class="section__body">
              <h4>The Stencil story</h4>
              <p>Stencil was created to power the components for Ionic Framework - a cross-platform mobile development technology stack used by more than 5M developers worldwide.</p>
              <div class="video-trigger btn btn--tertiary btn--small ">
                <div onClick={() => { this.openYoutube() }} id="launch-video">
                  <img src="/assets/img/video-icon.png" alt="Icon for Video"></img><span>Watch launch video</span>
                </div>
                <a href="https://youtu.be/UfD-k7aHkQE" rel="noopener" id="mobile-video">
                  <img src="/assets/img/video-icon.png" alt="Icon for video link"></img><span>Watch launch video</span>
                </a>
              </div>
            </div>
          </section>

        </main>
      </div>
    );
  }
}
