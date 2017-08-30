import { Component, Prop, State } from '@stencil/core';
@Component({
  tag: 'app-marked',
})
export class AppMarked {

  @Prop() doc: any;
  @State() content: any;

  ionViewWillLoad() {
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
