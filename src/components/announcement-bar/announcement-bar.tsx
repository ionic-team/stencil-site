import { Component, State, h } from '@stencil/core';

// tell Typescript that hbspt exists on window
declare global {
  interface Window { hbspt: any; }
}
window.hbspt = window.hbspt || {};

@Component({
  tag: 'announcement-bar',
  styleUrl: 'announcement-bar.css'
})
export class AnnouncementBar {
  @State() active = false;
  
  // Hubspot Data
  hubspot = {
    jsSrc: 'https://js.hsforms.net/forms/v2.js',
    formOptions: {
      portalId: "3776657",
      formId: "8ac8655d-3f54-4844-8d7c-19fb01da1dd7"
    }
  }

  constructor() {
    // load hubspot JS immediately
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = this.hubspot.jsSrc;
    document.getElementsByTagName('head')[0].appendChild(script);
    // add form to (stil hidden) modal ASAP
    script.onload = () => this.addForm();
  }

  addForm() {
    window.hbspt.forms.create({
      ...this.hubspot.formOptions,
      target: '#modal__form-container'
    });
  }

  render() {
    return ([
      <a onClick={() => { this.active = true }} class="announcement">
        <strong class="announcement__pill">New</strong>
        Guide to Building Design Systems with Web Components
        <app-icon name="arrow-right"></app-icon>
      </a>,

      <div class={`modal ${this.active ? 'active' : ''}`}>
        <div class="modal__bg" onClick={() => { this.active = false }}></div>
        <div class="modal__body" onClick={e => e.stopPropagation()}>
          <button onClick={() => { this.active = false }}
                  class="modal__body__close">&#xd7;</button>
          <hgroup>
            <h2>Thanks for your interest in our whitepaper!</h2>
            <p>We just need some basic information so we can send the eBook your way.</p>
          </hgroup>

          <div id="modal__form-container"></div>
        </div>
      </div>
    ])
  }
}