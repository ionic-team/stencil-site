import { Component, State } from '@stencil/core';

@Component({
  tag: 'demos-page',
  styleUrl: 'demos-page.scss'
})
export class DemosPage {
  @State() demos = [
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
    ];
  render() {
    return (
      <div>
        <h1>Demos</h1>
        <h4>Awesome demos of apps built using Stencil and Ionic</h4>
        {this.demos.map(demo => {
          return [
            <h4>{demo.title}</h4>,
            <p>{demo.description}</p>,
            <p><a target="_blank" href={demo.url}>Demo</a></p>
          ];
        })}
      </div>
    );
  }
}
