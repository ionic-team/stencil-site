import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'guide-callout',
  styleUrl: 'guide-callout.css'
})
export class GuideCallout {
  @Event() toggleModal!: EventEmitter;

  render() {
    return ([
      <section class="content">
        <div class="container">
          <img src="/assets/img/ds-guide-cover.png" alt="Design Systems guide cover"/>
          <hgroup>
            <h3>Interested in building Design Systems with Web Components?</h3>
            <p>Our new guide breaks down everything you need to know.</p>
            <a href="#" class="btn btn--secondary btn--small" onClick={(ev) => { ev.preventDefault(); this.toggleModal.emit(true); }}>Get the guide</a>
          </hgroup>
        </div>
      </section>
    ])
  }
}