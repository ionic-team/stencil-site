import { Component } from '@stencil/core';


@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.scss'
})
export class LandingPage {

  constructor() {
    document.title = `Stencil`;
  }

  render() {
    return (
      <div>

        <main>
          <img id="logo" src="/assets/img/logo.png"></img>

          <h1 id="action-call">The magical, reusable web component compiler</h1>

          <section id="buttons">

            <stencil-route-link url="/docs/getting-started">
              <button id="get-started">
                Get Started
            </button>
            </stencil-route-link>

            <button id="learn-more">
              Learn More
          </button>

            <div id="launch-video">
              <img src="/assets/img/video-icon.png"></img><span>Watch launch video</span>
            </div>
          </section>
        </main>

        <section id="three-points">
          <div class="point-card simple">
            <h2>Simple</h2>

            <p>
              With intentionally small tooling,
                a tiny API, zero configuration, and
                TypeScript support, you're set.
              </p>
          </div>

          <div class="point-card performant">
            <h2>Performant</h2>

            <p>
              6kb min+gzip runtime, server side rendering,
                and the raw power of native Web Components.
              </p>
          </div>

          <div class="point-card future-proof">
            <h2>Future proof</h2>

            <p>
              Build versatile apps and components based 100%
                on web standards. Break free of Framework Churn.
              </p>
          </div>
        </section>

      </div>
    );
  }
}
