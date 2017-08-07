import { Component, State } from '@stencil/core';


@Component({
  tag: 'demos-page'
})
export class DemosPage {

  @State() demos: any[];

  ionViewWillLoad() {
    this.demos = [
      {
        title: 'IonicHN',
        description: 'Hacker News PWA built with @stencil/core and @ionic/core',
        url: 'https://corehacker-10883.firebaseapp.com/'
      },
      {
        title: 'StencilNews',
        description: 'Demo of how you could use @stencil/core to build a fast, modern News PWA',
        url: 'https://stencilnews.firebaseapp.com/'
      }
    ]
  }

  render() {
    const demoObjects = this.demos.map((demo) => {
      return (
        <site-demo demo={demo}></site-demo>
      )
    });

    return (
      <div>
        {demoObjects}
      </div>
    )
    
  }
}
