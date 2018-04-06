import { Component } from '@stencil/core';

@Component({
  tag: 'demos-page',
  styleUrl: 'demos-page.scss'
})
export class DemosPage {

  demos = [
    {
      title: 'Stenciljs.com',
      description: 'Yep, this site is also built with Stencil!',
      imgPath: '/assets/img/demos/demo-stenciljs.jpg',
      demoUrl: 'https://stenciljs.com/',
      sourceUrl: 'https://github.com/ionic-team/stencil-site',
    },
    {
      title: 'IonicHN',
      description: 'Hacker News PWA built with @stencil/core and @ionic/core',
      imgPath: '/assets/img/demos/demo-ionichn.jpg',
      demoUrl: 'https://corehacker-10883.firebaseapp.com/',
      sourceUrl: 'https://github.com/ionic-team/ionic-stencil-hn-app'
    },
    {
      title: 'Stencil Fiber demo',
      description: 'This showcases the runtime performance of stencil using our async rendering',
      imgPath: '/assets/img/demos/demo-fiber.jpg',
      demoUrl: 'https://stencil-fiber-demo.firebaseapp.com/',
      sourceUrl: 'https://github.com/ionic-team/stencil-fiber-demo'
    },
    {
      title: 'IonicBeer',
      description: 'Beer PWA built with @stencil/core and @ionic/core',
      imgPath: '/assets/img/demos/demo-ionicbeer.jpg',
      demoUrl: 'https://stencilbeer.firebaseapp.com/',
      sourceUrl: 'https://github.com/jgw96/stencil-beer'
    },
    {
      title: 'InstaMusic',
      description: 'A full featured music player built with @stencil/core and @ionic/core',
      imgPath: '/assets/img/demos/demo-instamusic.jpg',
      demoUrl: 'https://instamusic-c15fe.firebaseapp.com/',
      sourceUrl: 'https://github.com/jgw96/instamusic'
    }
  ];

  constructor() {
    document.title = `Stencil Demos`;
  }

  render() {
    return (
      <div>
        <h1 class="headline measure-md">Awesome demos of apps built using Stencil and Ionic</h1>
        <div class="demo-card-list">
          {this.demos.map(demo => {
            return (
              <demo-card
                title={demo.title}
                description={demo.description}
                imgPath={demo.imgPath}
                demoUrl={demo.demoUrl}
                sourceUrl={demo.sourceUrl}></demo-card>
            );
          })}
        </div>
      </div>
    );
  }
}
