import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

// tell Typescript that hbspt exists on window
declare global {
  interface Window { hbspt: any; }
}
window.hbspt = window.hbspt || {};

@Component({
  tag: 'hubspot-modal',
  styleUrl: 'hubspot-modal.css'
})
export class HubspotModal {
  @Prop() active = false;

  @Event() toggleModal!: EventEmitter;

  // Hubspot Data
  hubspot = {
    jsSrc: 'https://js.hsforms.net/forms/v2.js',
    formOptions: {
      portalId: '3776657',
      formId: '00343e47-6f40-4702-911d-f7fabdb72996'
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

  handleClose() {
    this.toggleModal.emit(false);
  }

  render() {
    const bod = document.querySelector('body');
    if (bod) {
      if ( this.active === true) {
        bod.classList.add('no-scroll');
      } else {
        bod.classList.remove('no-scroll');
      }
    }


    return ([
      <div class={`modal ${this.active ? 'active' : ''}`}>
        <div class="modal__bg" onClick={this.handleClose.bind(this)}></div>
        <div class="modal__body" onClick={e => e.stopPropagation()}>
          <button onClick={this.handleClose.bind(this)}
                  class="modal__body__close">&#xd7;</button>
          <hgroup>
            <h2>Thanks for your interest!</h2>
            <p>We just need some basic information so we can send the guide your way.</p>
          </hgroup>

          <div id="modal__form-container"></div>
        </div>
      </div>
    ])
  }
}