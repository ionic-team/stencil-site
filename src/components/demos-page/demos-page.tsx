import { Component, State } from '@stencil/core';

@Component({
  tag: 'demos-page',
  styleUrl: 'demos-page.scss'
})
export class DemosPage {

  @State() demos = [
    {
      title: 'Stenciljs.com',
      description: 'Yep, this site is also built with Stencil!',
      url: 'https://github.com/ionic-team/stencil-site'
    },
    {
      title: 'IonicHN',
      description: 'Hacker News PWA built with @stencil/core and @ionic/core',
      url: 'https://corehacker-10883.firebaseapp.com/'
    },
    {
      title: 'Stencil Fiber demo',
      description: 'This showcases the runtime performance of stencil using our async rendering',
      url: 'https://stencil-fiber-demo.firebaseapp.com/'
    },
    {
      title: 'StencilNews',
      description: 'Demo of how you could use @stencil/core to build a fast, modern News PWA',
      url: 'https://stencilnews.firebaseapp.com/'
    }
  ];

  constructor() {
    document.title = `Stencil Demos`;
  }

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
