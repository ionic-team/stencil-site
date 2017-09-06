import { Component, Prop, PropDidChange, State } from '@stencil/core';
@Component({
  tag: 'app-marked',
})
export class AppMarked {

  @Prop() doc: string;
  @State() content: string;

  ionViewWillLoad() {
    return this.fetchNewContent();
  }

  @PropDidChange('doc')
  fetchNewContent() {
    return fetch(`/docs-content/${this.doc}`)
      .then(response => response.text())
      .then(data => {
        this.content = data;

        const el = document.createElement('div');
        el.innerHTML = data;
        const headerEl = el.querySelector('h1');
        document.title = (headerEl && headerEl.textContent + ' - Stencil') || 'Stencil';
      });
  }

  render() {
    return (
      <div innerHTML={this.content}></div>
    )
  }
}
