import { Component, Element, State, h } from '@stencil/core';
import copy from 'copy-text-to-clipboard';

@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.css'
})
export class LandingPage {
  @Element() el!: Element;

  @State() isCopied = false;

  constructor() {
    document.title = `Stencil`;
  }

  copyCommand = () => {
    copy('npm init stencil');
    this.isCopied = true;
    setTimeout(() => this.isCopied = false, 1500);
  }

  render() {
    return (
      <div>
        <main>
          <section class="hero">
            <h1>Stencil</h1>
            <h3 class="subtitle">A toolchain for building Design Systems and Progressive Web Apps</h3>
          </section>

          <section class="overview">
            <p>
              Stencil builds reusable, scalable Design Systems by combining the best features from popular frontend frameworks but
              generating Web Components instead of a third-party component model.
              Stencil-built Web Components run in all modern browsers and popular frontend frameworks, and are free from framework-churn.
              <br /><br />
              Stencil was built to power the next generation of <a href="https://ionicframework.com/">Ionic Framework</a>, one of the most popular
              open source Design Systems in the world.
            </p>
            <ul class="small list--unstyled list--icon">
              <li><app-icon name="checkmark"/> Based on Web Components</li>
              <li><app-icon name="checkmark"/> Framework-free</li>
              <li><app-icon name="checkmark"/> TypeScript support</li>
              <li><app-icon name="checkmark"/> Asynchronous rendering pipeline</li>
              <li><app-icon name="checkmark"/> A tiny virtual DOM layer</li>
              <li><app-icon name="checkmark"/> One-way data binding</li>
              <li><app-icon name="checkmark"/> JSX support</li>
              <li><app-icon name="checkmark"/> Simple component lazy-loading</li>
              <li><app-icon name="checkmark"/> Component pre-rendering</li>
              <li><app-icon name="checkmark"/> Routing and state management</li>
            </ul>
          </section>

          <section class="cta">
            <div class="cta__primary">
              <h3>Start coding with Stencil in seconds</h3>
              <code class={{'copied': this.isCopied}} onClick={this.copyCommand}>{this.isCopied ? 'copied!' : 'npm init stencil'}</code>
              <span>Requires <stencil-route-link url="/docs/getting-started">NPM v6</stencil-route-link></span>
            </div>
            <p class="cta__secondary">Dive deeper with our <stencil-route-link url="/docs/getting-started">Getting Started</stencil-route-link> guide</p>
          </section>

          <section class="section section--small">
            <div class="section__body">
              <ul class="feature-list list--unstyled">
                <li class="feature-list__item">
                  <app-icon name="simple"/>
                  <h3>Simple</h3>
                  <p>With intentionally small tooling, a tiny API, zero configuration, you're set.</p>
                </li>
                <li class="feature-list__item">
                  <app-icon name="performant"/>
                  <h3>Performant</h3>
                  <p>6kb min+gzip runtime, pre-rendering, and the raw power of native Web Components.</p>
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
              <h2>The perfect tool for building a design system</h2>
            </div>
            <div class="section__body">
              <ul class="list--icon list--unstyled">
                <li><app-icon name="checkmark"/>Ensure consistent UX and brand experiences, at scale</li>
                <li><app-icon name="checkmark"/>Web components run on any platform or device</li>
                <li><app-icon name="checkmark"/>Build a custom UI library that works across teams and projects</li>
              </ul>
              <p>Interested in learning more about building design systems with Stencil?</p>
              <stencil-route-link class="btn btn--tertiary btn--small" url="/design-systems">Show me more</stencil-route-link>
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
                <li><app-icon name="checkmark"/> Auto-generate component documentation <br/><span class="small">(including css variables)</span></li>
              </ul>
            </div>
          </section>

          <section class="section">
            <div class="section__heading">
              <h2>Build one component library for all of your apps</h2>
            </div>
            <div class="section__body">
              <p>Stencil components are just Web Components, so they work with any major framework or no framework at all.</p>
              <p>Learn how Stencil seamlessly integrates with:</p>
              <ul class="card-links list--unstyled">
                <li>
                  <stencil-route-link class="card-links__item" url="/docs/react">
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
                  <a class="btn btn--tertiary btn--small" href="https://github.com/ionic-team/stencil-state-tunnel/">
                    <app-icon name="docs"/>
                    stencil-state-tunnel
                  </a>
                </li>
                <li>
                  <a class="btn btn--tertiary btn--small" href="https://github.com/ionic-team/stencil-redux/">
                    <app-icon name="docs"/>
                    stencil-redux
                  </a>
                </li>
                <li>
                  <a class="btn btn--tertiary btn--small" href="https://github.com/ionic-team/ionic/tree/master/core">
                    <app-icon name="docs"/>
                    ionic-core
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <section class="section section--small section--centered">
            <div class="section__body">
              <h4>The Stencil story</h4>
              <p>Stencil was created to power the components for Ionic Framework - a cross-platform mobile development technology stack used by more than 5M developers worldwide.</p>
              <div class="video-trigger ">
                <a href="https://youtu.be/UfD-k7aHkQE" class="btn btn--tertiary btn--small">
                  <img src="/assets/img/video-icon.png" alt="Icon for Video"></img><span>Watch launch video</span>
                </a>
              </div>
            </div>
          </section>

        </main>
      </div>
    );
  }
}
