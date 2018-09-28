import { Component, Prop, ComponentInterface } from '@stencil/core';
import { MarkdownHeading } from '../../global/definitions';

@Component({
  tag: 'in-page-navigation',
})
export class InPageNavigtion implements ComponentInterface {

  @Prop() pageLinks: MarkdownHeading[] = [];

  render() {
    if (this.pageLinks.length === 0) {
      return null;
    }
    return (
      <ul>
         { this.pageLinks.map(pl => (
         <li><a href={`#${pl.id}`}>{pl.text}</a></li>
         )) }
      </ul>
    );
  }
}
