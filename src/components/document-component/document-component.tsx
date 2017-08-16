import { Component, Prop } from '@stencil/core';
@Component({
  tag: 'document-component'
})
export class DocumentComponent {
  @Prop() pages: string[];
  render() {
    return (
      <div>
        {this.pages.map(page => <app-marked doc={page} />)}
      </div>
    );
  }
}
