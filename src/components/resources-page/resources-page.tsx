import { Component } from '@stencil/core';

@Component({
  tag: 'resources-page',
  styleUrl: 'resources-page.scss'
})
export class ResourcesPage {
  constructor() {
    document.title = `Stencil Resources`;
  }

  render() {
    return (
      <div>
        <h1>Resources</h1>
        <h4>Resources to help you get more out of Stencil</h4>
        <div>
          <h2>Present Stencil</h2>
          <p>
            A forkable presentation for your next meetup or conference
            talk on Stencil.
            Built with <a href="lab.hakim.se/reveal-js/">Reveal.js</a>
          </p>
          <a target="_blank" href="https://ionic-team.github.io/stencil-present/">Stencil Presentation</a>
          <br />
          <a target="_blank" href="https://github.com/ionic-team/stencil-present/">Source</a>
        </div>
      </div>
    );
  }
}
