import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.scss'
})
export class LandingPage {

  @Element() el: Element;

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
          <img id="logo" src="/assets/img/logo.png" alt="Stencil Logo"></img>

          <h1 id="action-call">The magical, reusable web component compiler</h1>

          <section id="buttons">
            <stencil-route-link url="/docs/getting-started">
              <button id="get-started"> Get Started </button>
            </stencil-route-link>

            <div onClick={() => { this.openYoutube() }} id="launch-video">
              <img src="/assets/img/video-icon.png" alt="Icon for Video"></img><span>Watch launch video</span>
            </div>

            <a href="https://youtu.be/UfD-k7aHkQE" rel="noopener" id="mobile-video">
              <img src="/assets/img/video-icon.png" alt="Icon for video link"></img><span>Watch launch video</span>
            </a>
          </section>
        </main>

        <section id="three-points">
          <div class="point-card simple">
            <h2>Simple</h2>
            <p>With intentionally small tooling, a tiny API, zero configuration, and TypeScript support, you're set.</p>
          </div>

          <div class="point-card performant">
            <h2>Performant</h2>
            <p>6kb min+gzip runtime, server side rendering, and the raw power of native Web Components.</p>
          </div>

          <div class="point-card future-proof">
            <h2>Future proof</h2>
            <p>Build versatile apps and components based 100% on web standards. Break free of Framework Churn.</p>
          </div>
        </section>

      </div>
    );
  }
}
