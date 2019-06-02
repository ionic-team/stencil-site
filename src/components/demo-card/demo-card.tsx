import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'demo-card',
  styleUrl: 'demo-card.css'
})
export class DemoCard {

  @Prop() name?: string;
  @Prop() description?: string;
  @Prop() imgPath?: string;
  @Prop() demoUrl?: string;
  @Prop() sourceUrl?: string;
  @Prop() SourceBufferList?: string;

  render() {
    return (
      <div>
        <div class="demo-card__image">
          <a target="_blank" rel="noopener" href={this.demoUrl}>
            <img src={`${this.imgPath}.jpg`} srcSet={`${this.imgPath}.jpg 1x, ${this.imgPath}@2x.jpg 2x`} loading="lazy" />
          </a>
        </div>
        <h3>{this.name}</h3>
        <p>{this.description}</p>
        <p>
          <a target="_blank" rel="noopener" href={this.demoUrl} class="text-link text-link--primary">Demo</a>
          &nbsp;&nbsp;
          <a target="_blank" rel="noopener" href={this.sourceUrl} class="text-link text-link--secondary">Source</a>
        </p>
      </div>
    );
  }
}
