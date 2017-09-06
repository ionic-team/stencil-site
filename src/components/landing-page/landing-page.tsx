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
        <h1>The magical, reusable web component generator.</h1>
        <h4>Stencil is a tool for building modern Web Components</h4>
        <p>
          Stencil combines some of the best features from traditional frameworks,
          but outputs 100% standards-compliant Custom Elements, part of the Web Component spec.
        </p>
        <p>
          Stencil was created by the
          <a href="http://ionicframework.com/">Ionic Framework</a> team to build
          faster, more powerful mobile and web apps. Stencil is the foundation for
          the next generation of Ionic Framework, but is completely independent of
          Ionic or any other UI framework.
        </p>
          <youtube-video video="UfD-k7aHkQE"/>
        <p>
          <stencil-route-link url="/docs/intro" custom="true" class="button">
            Learn More about Stencil
          </stencil-route-link>
        </p>
      </div>
    );
  }
}
