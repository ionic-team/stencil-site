import { Component, Prop, State, Watch, ComponentInterface } from '@stencil/core';
import { MarkdownContent } from '../../global/definitions';

@Component({
  tag: 'app-marked'
})
export class AppMarked implements ComponentInterface {

  @Prop() fetchPath?: string;
  @Prop() renderer?: (doc: MarkdownContent) => JSX.Element; 

  @State() docsContent: MarkdownContent = {};

  componentWillLoad() {
    return this.fetchNewContent(this.fetchPath);
  }

  @Watch('fetchPath')
  fetchNewContent(docPath: string, oldDocPath?: string) {
    if (docPath == null || docPath === oldDocPath) {
      return;
    }
    return fetch(this.fetchPath)
      .then(response => response.json())
      .then((data: MarkdownContent) => {
        if (data != null) {
          this.docsContent = data;
        }
      });
  }

  render() {
    return this.renderer(this.docsContent);
  }
}
