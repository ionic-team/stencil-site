import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'document-component',
  styleUrl: 'document-component.css'
})
export class DocumentComponent {

  @Element() el!: HTMLElement;

  @Prop() pages: string[] = [];

  render() {
    return (
      <div>
        <site-menu />
        <app-burger />
        {this.pages.map(page => <app-marked doc={page} />)}
      </div>
    )
  }
}
