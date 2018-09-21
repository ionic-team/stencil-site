import { Component, Prop, State, Watch } from '@stencil/core';
import { MarkdownContent } from '../../global/definitions';

@Component({
  tag: 'app-marked',
  styleUrl: 'app-marked.css'
})
export class AppMarked {

  @Prop() doc?: string;

  @State() content?: string;

  componentWillLoad() {
    return this.fetchNewContent(this.doc);
  }

  @Watch('doc')
  fetchNewContent(newDoc: string) {
    if (newDoc == null) {
      return;
    }
    return fetch(`/docs-content/${newDoc}.json`)
      .then(response => response.json())
      .then((data: MarkdownContent) => {
        this.content = data.content;
        const doc = document;
        const el = doc.createElement('div');
        el.innerHTML = data.content;

        const headerEl = el.querySelector('h1');
        doc.title = (headerEl && headerEl.textContent + ' - Stencil') || 'Stencil';
      });
  }

  render() {
    return (
      <div class="measure-lg" innerHTML={this.content}></div>
    );
  }
}
