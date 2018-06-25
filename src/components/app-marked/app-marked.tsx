import { Component, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'app-marked',
  styleUrl: 'app-marked.scss'
})
export class AppMarked {

  @Prop() doc: string;
  @Prop({ context: 'isServer' }) private isServer: boolean;
  // @Prop({ context: 'document' }) document: any;

  @State() content: string;

  componentWillLoad() {
    return this.fetchNewContent();
  }

  @Watch('doc')
  fetchNewContent() {
    if (this.doc !== undefined) {
      const doc = document;
      return fetch(`/docs-content/${this.doc}`)
        .then(response => response.text())
        .then(data => {
          this.content = data;

          const el = doc.createElement('div');
          el.innerHTML = data;

          const headerEl = el.querySelector('h1');
          doc.title = (headerEl && headerEl.textContent + ' - Stencil') || 'Stencil';

          // requestAnimationFrame is not available for preRendering
          // or SSR, so only run this in the browser
          if (!this.isServer) {
            window.requestAnimationFrame(() => {
              window.scrollTo(0, 0);
            })
          }
        });
    }
  }

  render() {
    return [
      <app-burger></app-burger>,
      <div class="measure-lg" innerHTML={this.content}></div>
    ]
  }
}
