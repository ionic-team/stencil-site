import { Component, Prop, ComponentInterface, Listen, State } from '@stencil/core';
import { MarkdownHeading } from '../../global/definitions';

interface ItemOffset {
  id: string,
  topOffset: number
}

@Component({
  tag: 'in-page-navigation',
  styleUrl: 'in-page-navigation.css'
})
export class InPageNavigtion implements ComponentInterface {

  @Listen('window:scroll')
  function() {
    const item = this.itemOffsets.find(item => item.topOffset > document.documentElement.scrollTop);
    if (item) {
      this.selectedId = item.id;
    }
  }

  @Prop() pageLinks: MarkdownHeading[] = [];
  @State() itemOffsets: ItemOffset[] = [];
  @State() selectedId: string = null;

  componentDidLoad() {
    this.itemOffsets = this.pageLinks.map((pl) => {
      const item = document.getElementById(pl.id);
      return {
        id: pl.id,
        topOffset: item.getBoundingClientRect().top
      };
    })
  }

  render() {
    if (this.pageLinks.length === 0) {
      return null;
    }
    return [
      <h5>Contents</h5>,
      <ul class="heading-links">
        { this.pageLinks.map(pl => (
        <li class={{
            'heading-link': true,
            [`size-h${pl.level}`]: true,
            'selected': this.selectedId === pl.id
          }}>
          <a href={`#${pl.id}`}>{pl.text}</a>
        </li>
        )) }
      </ul>,
      <p><ion-icon name="logo-github"></ion-icon>Submit an edit</p>
    ];
  }
}
