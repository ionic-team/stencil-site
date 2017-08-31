import { Component, Prop, PropDidChange } from '@stencil/core';
@Component({
  tag: 'document-component',
  styleUrl: 'document-component.scss'
})
export class DocumentComponent {
  @Prop() pages: string[];

  @PropDidChange('pages')
  onDocChanged() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        {this.pages.map(page => <app-marked doc={page} />)}
      </div>
    );
  }
}
