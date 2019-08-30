import { Component, State, h, Event, EventEmitter  } from '@stencil/core';

@Component({
  tag: 'announcement-bar',
  styleUrl: 'announcement-bar.css'
})
export class AnnouncementBar {
  @State() isModalOpen: boolean = false;
  @Event() toggleModal!: EventEmitter;

  render() {
    return ([
      <a onClick={() => { this.toggleModal.emit(true); }} class="announcement">
        <strong class="announcement__pill">New</strong>
        Guide to Building Design Systems with Web Components
        <app-icon name="arrow-right"></app-icon>
      </a>
    ])
  }
}