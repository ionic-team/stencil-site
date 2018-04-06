import { Component, Prop} from '@stencil/core';

@Component({
  tag: 'demo-card',
  styleUrl: 'demo-card.scss'
})
export class DemoCard {
  
  @Prop() title: string;
  @Prop() description: string;
  @Prop() imgPath: string;
  @Prop() demoUrl: string;
  @Prop() sourceUrl: string;

  render() {
    return (
      <div>
        <div class="demo-card__image">
          <a target="_blank" rel="noopener" href={this.demoUrl}>
            <img src={this.imgPath} />
          </a>
        </div>
        <h4>{this.title}</h4>
        <p>{this.description}</p>
        <p>
          <a target="_blank" rel="noopener" href={this.demoUrl}>Demo</a>
          &nbsp;&nbsp;
          <a target="_blank" rel="noopener" href={this.sourceUrl}>Source</a>
        </p>
      </div>
    );
  }
}
