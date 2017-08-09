import { Component, Prop, State } from '@stencil/core';

declare var marked: any;

@Component({
  tag: 'app-marked',
})
export class AppMarked {

  @Prop() doc: any;
  @State() markup: any;

  ionViewWillLoad() {
    fetch(`/docs-md/${this.doc}`).then((response) => {
      return response.text()
    }).then((data) => {
      this.markup = marked(data);
    })
  }

  render() {
    return (
      <div innerHTML={this.markup}>
      </div>
    )
  }
}
