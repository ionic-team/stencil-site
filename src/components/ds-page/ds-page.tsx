import { Component } from '@stencil/core';

@Component({
  tag: 'ds-page',
  styleUrl: 'ds-page.css'
})
export class DSPage {

  constructor() {
    document.title = `Stencil DS - Stencil for Production Design Systems`;
  }

  render() {
    return (
      <div class="ds-container measure-lg">
        <div class="ds-cta">
          <h1>Stencil DS</h1>
          <h2>Production-ready Design Systems at Scale</h2>
        </div>
        <p>
          Is your company struggling to build shared components across teams using a diverse set of frontend frameworks
          and technologies, all while enforcing brand guidelines and exceeding accessibility standards?
        </p>
        <p>
          The Stencil team is helping many large teams and enterprises build Design Systems at scale. Let us
          help make your Design System initiative successful.
        </p>
        <div class="ds-plans">
          <div class="ds-plan">
            <h2>Stencil OSS</h2>
            <h4>Free and OSS Forever</h4>
            <ul>
              <li>Web Component compiler</li>
              <li>Lazy-loading for Components</li>
              <li>Community support</li>
            </ul>
          </div>
          <div class="ds-plan">
            <h2>Stencil DS</h2>
            <h4>Custom pricing</h4>
            <ul>
              <li><i>Everything in Stencil OSS +</i></li>
              <li>Generate bindings for Angular, React, and Vue</li>
              <li>Documentation generation</li>
              <li>Visual UI testing tools</li>
              <li>Accessibility verification tools</li>
              <li>Premium support</li>
              <li>Expert advisory for your next Design System project</li>
            </ul>
            <button class="btn btn--primary">Get in touch</button>
          </div>
        </div>
      </div>
    );
  }
}
