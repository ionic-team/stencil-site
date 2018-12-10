import { Component, Element, Prop, State, Listen } from '@stencil/core';
import copy from 'copy-text-to-clipboard';

const IS_EDGE = (document as any).documentMode || /Edge/.test(navigator.userAgent) ? true : false;

@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.css'
})
export class LandingPage {

  @Element() el!: Element;

  @Prop({ context: 'isServer' }) private isServer: boolean;
  @State() isModalOpen = false;
  @State() isCopied = false;

  constructor() {
    document.title = `Stencil`;
  }

  videoPlayer: any;

  componentDidLoad() {
    this.isModalOpen = false;

    // unfortunately necessary hack because Edge
    // dont show the animated youtube video in Edge because
    // pointer-events: none; is broken in Edge
    // just link to the youtube video directly like we do on mobile

    // attach youtube iframe api
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => {
      this.videoPlayer = new window['YT'].Player('youtube-embed', {});
    }
  }

  @Listen('window:keyup')
  handleKeyUp(ev: any) {
    if (ev.keyCode === 27 && this.isModalOpen) {
      this.closeModal();
      return;
    }
  }

  handleWatchVideo() {
    if (window.matchMedia('(min-width: 768px)').matches || IS_EDGE) {
      this.openModal();
    } else {
      window.location.href = 'https://youtu.be/UfD-k7aHkQE';
    }
  }

  openModal() {
    const bod = (document.querySelector('body') as HTMLElement);
    const modal = (document.querySelector('.modal') as HTMLElement);

    bod.classList.add('no-scroll');
    modal.style.display = "block";
    modal.classList.remove('modal--hide');
    modal.classList.add('modal--show');

    this.isModalOpen = true;
  }

  closeModal() {
    const bod = (document.querySelector('body') as HTMLElement);
    const modal = (document.querySelector('.modal') as HTMLElement);

    bod.classList.remove('no-scroll');
    modal.classList.remove('modal--show');
    modal.classList.add('modal--hide');
    setTimeout(() => { modal.style.display = "none"; }, 200)

    this.videoPlayer.pauseVideo();

    this.isModalOpen = false;
  }

  copyCommand = () => {
    copy('npm init stencil');
    this.isCopied = true;
    setTimeout(() => this.isCopied = false, 1500);
  }

  render() {
    return (
      <div>

        {!this.isServer
          ? <div class="modal">
              <div onClick={() => { this.closeModal() }} class="modal__background"></div>
                <div class="modal__content" onClick={() => { this.closeModal() }}>
                  <div class="video-wrapper">
                    <iframe
                      id="youtube-embed"
                      frameBorder="0"
                      title="Ionic team at Polymer Summit video"
                      allowFullScreen={true}
                      src="https://www.youtube.com/embed/UfD-k7aHkQE?enablejsapi=1"
                      width="700"
                      height="450">
                    </iframe>
                  </div>
                </div>
              </div>
          : null
        }

        <main>
          <section class="hero">
            <img id="logo" src="/assets/img/logo.png" alt="Stencil Logo"></img>
            <h1>The magical, reusable web component compiler</h1>
          </section>

          <section class="overview">
            <p>Stencil combines the best concepts of the most popular frontend frameworks and generates 100% standards-based Web Components that run in any modern browser. Built by the <a href="https://ionicframework.com/">Ionic Framework</a> team.</p>
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
                <div onClick={() => { this.handleWatchVideo() }} class="btn btn--tertiary btn--small">
                  <img src="/assets/img/video-icon.png" alt="Icon for Video"></img><span>Watch launch video</span>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    );
  }
}
