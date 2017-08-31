import { Component, Prop, PropDidChange, State } from '@stencil/core';
@Component({
  tag: 'app-marked',
})
export class AppMarked {

  @Prop() doc: any;
  @State() content: any;

  ionViewWillLoad() {
    return this.fetchNewContent();
  }

  @PropDidChange('doc')
  fetchNewContent() {
    return fetch(`/docs-content/${this.doc}`)
      .then(response => response.text())
      .then(data => this.content = data);
  }

  render() {
    return (
      <div innerHTML={this.content}>
      </div>
    )
  }
}
