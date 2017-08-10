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
        <p>Explore the early access docs to see what stencil is all about</p>
      </div>
    );
  }
}
