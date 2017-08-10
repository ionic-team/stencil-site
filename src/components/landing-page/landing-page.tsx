import { Component } from '@stencil/core';


@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.scss'
})
export class LandingPage {
  render() {
    return (
      <div>
        <h1>The magical, reusable web component generator.</h1>
        <h4>A tool chain for building modern Web Components</h4>
          <stencil-route-link router="#router" url="/docs" custom={true} class="button-docs">
            Get Started
        </stencil-route-link>

      </div>
    );
  }
}
