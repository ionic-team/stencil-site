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
      <stencil-route-link url="/blog/stencil-roadmap-fall-2019" class="announcement">
        <strong class="announcement__pill">Blog</strong>
        Fall 2019 Stencil Roadmap
        <app-icon name="arrow-right"></app-icon>
      </stencil-route-link>
    ])
  }
}