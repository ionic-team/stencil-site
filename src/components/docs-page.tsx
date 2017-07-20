import { Component, h, Prop } from '@stencil/core';


@Component({
  tag: 'docs-page'
})
export class DocsPage {
  render() {
    console.log('Rendering docs page')
    return [
      <ion-menu ssr="false" content="#menu-content">
        <ion-header>
          Documentation
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item>Getting Started</ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>,

      <ion-page id="menu-content">
      </ion-page>
    ];
  }
}
