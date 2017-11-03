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
          <img src="/assets/img/logo.png"></img>

          <h1 id="action-call">The magical, reusable web component compiler</h1>

          <div id="buttons">
            <button id="get-started">
              Get Started
          </button>

            <button id="learn-more">
              Learn More
          </button>
          </div>
        </main>

      </div>
    );
  }
}
