import { Component, Prop, State, Watch } from '@stencil/core';
import { MarkdownContent } from '../../global/definitions';

@Component({
  tag: 'app-marked',
  styleUrl: 'app-marked.css'
})
export class AppMarked {

  @Prop() doc?: string;

  @State() docsContent: MarkdownContent = {};

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
        if (data != null) {
          this.docsContent = data;
        }
      });
  }

  render() {
    return [
      <stencil-route-title
        pageTitle={this.docsContent.title ? `${this.docsContent.title} - Stencil` : 'Stencil'}
      ></stencil-route-title>,
      <div class="measure-lg" innerHTML={this.docsContent.content}></div>
    ];
  }
}
