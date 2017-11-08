import { Component, Element } from '@stencil/core';


@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.scss'
})
export class LandingPage {

  @Element() el: Element;

  constructor() {
    document.title = `Stencil`;
  }

  openYoutube() {
    const youtube = (this.el.querySelector('#youtube-video') as HTMLElement);
    const background = (this.el.querySelector('#background') as HTMLElement);

    youtube.classList.add('youtube-show');
    background.classList.add('background-show');
  }

  closeBackground() {
    console.log('hello world');
    const youtube = (this.el.querySelector('#youtube-video') as HTMLElement);
    const background = (this.el.querySelector('#background') as HTMLElement);

    youtube.classList.remove('youtube-show');
    background.classList.remove('background-show');
  }

  render() {
    return (
      <div>

        <div onClick={() => { this.closeBackground() }} id="background"></div>

        <main>
          <img id="logo" src="/assets/img/logo.png"></img>

          <h1 id="action-call">The magical, reusable web component compiler</h1>

          <section id="buttons">

            <stencil-route-link url="/docs/getting-started">
              <button id="get-started">
                Get Started
            </button>
            </stencil-route-link>

            <stencil-route-link url="/docs/intro">
              <button id="learn-more">
                Learn More
          </button>
            </stencil-route-link>

            <div onClick={() => { this.openYoutube() }} id="launch-video">
              <img src="/assets/img/video-icon.png"></img><span>Watch launch video</span>
            </div>

            <div id="background">
            </div>

            <div id="youtube-video">
              <lazy-iframe src="https://www.youtube.com/embed/UfD-k7aHkQE" title="Ionic team at Polymer Summit video" />
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
