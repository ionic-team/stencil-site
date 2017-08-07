import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'site-demo',
  styleUrl: 'site-demo.scss'
})
export class SiteDemo {

  @Prop() demo: any;

  render() {
    return (
      <ion-card>
        <ion-card-header>
          {this.demo.title}
        </ion-card-header>

        <ion-card-content>
          {this.demo.description}
        </ion-card-content>

        <ion-row>
          <ion-col>
            <ion-button clear>
              <a href={this.demo.url}>Try it out</a>
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-card>
    )
  }
}
